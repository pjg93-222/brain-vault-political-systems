// The only commit path of the Phase 2 reorganisation (plan A.3). One local commit per batch, from an explicit manifest,
// built in a throwaway index; it never pushes, fetches or pulls (Owner decision 7) and ignores .bedrock/config.json's
// git.strategy, never stages a path under fleeting/ (Owner decision 1), and never stages hook output: log.md and index.md
// are built from HEAD's blobs and the staged tree, not from the working files.
//
//   bun .bedrock/reorg/commit.ts --batch N --expect-head <sha> --paths-file <f> --message <m> --log <text> --when <time>
//                                [--body-file <f>] [--export <dir>] [--rollback --base <sha>] [--vault <dir>]
//
//   --paths-file   the batch manifest: one vault-relative path per line (forward slashes), every created, modified and
//                  deleted path, including the manifest itself when it lives in the vault
//   --message      the commit subject (one line); --body-file adds the body; the trailer
//                  "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" ends every message
//   --log          "<what happened> | <notes touched>": becomes the log.md line "- <when> | reorg-batch-N | <log>"
//                  ("reorg-rollback-N" for a rollback)
//   --when         "YYYY-MM-DD HH:MM +HHMM" or "+HH:MM", set once per batch so the exported and the committed log.md blobs
//                  are identical; written as log.md's "+HH:MM" form
//   --export <dir> build everything, check out the would-be-committed tree into <dir> (missing or empty), and stop: no
//                  commit, no log.md append, the real index untouched
//   --rollback --base <BASE_N>   undo batch N (already committed): every manifest path that exists in BASE_N gets BASE_N's
//                  blob, every other manifest path is removed; then the working files are restored the same way, except
//                  that .bedrock/reorg/plan.md stays on disk (it leaves the tree only, as `git rm --cached` would)
//
// Refusals (before anything is staged): a branch other than brain-reorg-2026-10-03; HEAD != --expect-head; a directory,
// glob, absolute or ".." path; log.md or index.md in the manifest; any path under fleeting/; a duplicate path; a manifest
// inside the vault that does not list itself; a real index with staged changes (`git diff --cached --quiet` fails).
// During staging: a path that is neither on disk nor in HEAD; a staged set that differs from the manifest
// (`git diff --cached --name-only --no-renames`).
//
// The real .git/index is never written before the branch ref has moved: every staging step runs with GIT_INDEX_FILE set to
// a temporary index seeded by `git read-tree HEAD`, every read-only git call runs with GIT_OPTIONAL_LOCKS=0 (so nothing
// refreshes the real index on the side), the commit is `git commit-tree` + `git update-ref <ref> <new> <expect-head>`
// (atomic: it fails if the branch moved), and only then `git reset -q -- <committed paths> index.md log.md` syncs the real
// index. A failure at any earlier point leaves .git/index byte-identical, so a pre-commit rollback restores working files
// only.
import { closeSync, existsSync, fstatSync, mkdirSync, mkdtempSync, openSync, readFileSync, readSync, readdirSync, rmSync, statSync, unlinkSync, writeFileSync, writeSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve, sep } from "node:path";

export const BRANCH = "brain-reorg-2026-10-03";
const REF = "refs/heads/" + BRANCH;
export const TRAILER = "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>";
const PLAN_REL = ".bedrock/reorg/plan.md";
const THIS_VAULT = resolve(import.meta.dir, "..", "..");

class Refusal extends Error {}

// ---------------------------------------------------------------------------------------------------------------------
// git

type GitOpts = { index?: string; input?: string | Uint8Array; allowFail?: boolean; writeRealIndex?: boolean };
type GitResult = { code: number; out: string; err: string; raw: Buffer };

function makeGit(vault: string) {
  return function git(args: string[], o: GitOpts = {}): GitResult {
    const env: Record<string, string | undefined> = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
    delete env.GIT_INDEX_FILE;
    if (o.index) env.GIT_INDEX_FILE = o.index;
    if (!o.writeRealIndex) env.GIT_OPTIONAL_LOCKS = "0";
    const r = Bun.spawnSync(["git", "-C", vault, ...args], { stdin: o.input === undefined ? "ignore" : Buffer.from(o.input), stdout: "pipe", stderr: "pipe", env });
    const res = { code: r.exitCode ?? 1, out: r.stdout.toString(), err: r.stderr.toString(), raw: r.stdout as Buffer };
    if (res.code !== 0 && !o.allowFail) throw new Error(`git ${args.join(" ")} failed (${res.code}): ${res.err.trim().split("\n").slice(-3).join(" | ")}`);
    return res;
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// arguments

/** an MSYS drive path (/c/Users/...) becomes C:/Users/...; any other "/"-rooted path is refused on Windows */
function pathArg(name: string, v: string): string {
  if (process.platform === "win32") {
    const m = v.match(/^\/([a-zA-Z])(\/.*)?$/);
    if (m) return resolve(m[1].toUpperCase() + ":" + (m[2] ?? "/"));
    if (v.startsWith("/")) throw new Refusal(`${name} ${v}: a POSIX path cannot be mapped on Windows; pass a Windows path (cygpath -m)`);
  }
  return resolve(v);
}

/** "YYYY-MM-DD HH:MM +HHMM" or "+HH:MM" -> "YYYY-MM-DD HH:MM +HH:MM" (log.md's form) */
export function normalizeWhen(v: string): string {
  const m = v.trim().match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) ([+-])(\d{2}):?(\d{2})$/);
  if (!m) throw new Refusal(`--when "${v}" is not "YYYY-MM-DD HH:MM +HHMM" (or +HH:MM)`);
  const [, date, time, sign, hh, mm] = m;
  const d = new Date(date + "T00:00:00Z");
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== date) throw new Refusal(`--when: ${date} is not a calendar date`);
  if (+time.slice(0, 2) > 23 || +time.slice(3) > 59 || +hh > 14 || +mm > 59) throw new Refusal(`--when "${v}" has an impossible time or offset`);
  return `${date} ${time} ${sign}${hh}:${mm}`;
}

type Args = {
  vault: string;
  batch: number;
  expectHead: string;
  pathsFile: string;
  message: string;
  log: string;
  when: string;
  bodyFile: string | null;
  exportDir: string | null;
  rollback: boolean;
  base: string | null;
};

export function parseArgs(argv: string[]): Args {
  const v: Record<string, string> = {};
  const flags = new Set<string>();
  const VALUE = ["--batch", "--expect-head", "--paths-file", "--message", "--log", "--when", "--body-file", "--export", "--base", "--vault"];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.startsWith("--") ? a.indexOf("=") : -1;
    const name = eq > 0 ? a.slice(0, eq) : a;
    if (VALUE.includes(name)) {
      if (eq > 0) v[name] = a.slice(eq + 1);
      else {
        if (i + 1 >= argv.length) throw new Refusal(`${name} needs a value`);
        v[name] = argv[++i];
      }
    } else if (name === "--rollback") flags.add(name);
    else throw new Refusal(`unknown argument ${a}`);
  }
  const need = (k: string) => {
    if (v[k] === undefined || v[k] === "") throw new Refusal(`${k} is required`);
    return v[k];
  };
  const batchText = need("--batch");
  if (!/^[1-9]\d*$/.test(batchText)) throw new Refusal(`--batch must be a positive whole number, got "${batchText}"`);
  const message = need("--message");
  if (/[\r\n]/.test(message)) throw new Refusal("--message must be one line (the body goes in --body-file)");
  const log = need("--log");
  if (/[\r\n]/.test(log)) throw new Refusal("--log must be one line");
  if (!log.includes(" | ")) throw new Refusal('--log must be "<what happened> | <notes touched>" (log.md format)');
  const rollback = flags.has("--rollback");
  if (rollback && !v["--base"]) throw new Refusal("--rollback needs --base <BASE_N>");
  if (!rollback && v["--base"]) throw new Refusal("--base is only used with --rollback");
  if (rollback && v["--export"]) throw new Refusal("--export cannot be combined with --rollback");
  return {
    vault: v["--vault"] ? pathArg("--vault", v["--vault"]) : THIS_VAULT,
    batch: Number(batchText),
    expectHead: need("--expect-head"),
    pathsFile: pathArg("--paths-file", need("--paths-file")),
    message,
    log,
    when: normalizeWhen(need("--when")),
    bodyFile: v["--body-file"] ? pathArg("--body-file", v["--body-file"]) : null,
    exportDir: v["--export"] ? pathArg("--export", v["--export"]) : null,
    rollback,
    base: v["--base"] ?? null,
  };
}

/** the manifest: vault-relative paths, validated; every refusal names the offending line */
export function readManifest(file: string, vault: string, rollback: boolean): string[] {
  if (!existsSync(file)) throw new Refusal(`--paths-file ${file} does not exist`);
  const lines = readFileSync(file, "utf8").replace(/^\uFEFF/, "").split("\n");
  const paths: string[] = [];
  lines.forEach((raw, i) => {
    const p = raw.replace(/\r$/, "").trim();
    if (!p) return;
    const where = `manifest line ${i + 1} "${p}"`;
    if (/[*?\[\]{}]/.test(p)) throw new Refusal(`${where}: glob patterns are not allowed`);
    if (p.includes("\\")) throw new Refusal(`${where}: use forward slashes`);
    if (/^[A-Za-z]:/.test(p) || p.startsWith("/")) throw new Refusal(`${where}: absolute paths are not allowed`);
    if (p.endsWith("/") || p.split("/").some((s) => s === "" || s === "." || s === "..")) throw new Refusal(`${where}: not a plain file path`);
    const lower = p.toLowerCase();
    if (lower === "log.md" || lower === "index.md") throw new Refusal(`${where}: log.md and index.md are built by commit.ts, never listed`);
    if (lower.split("/")[0] === "fleeting") throw new Refusal(`${where}: fleeting notes are never staged (Owner decision 1)`);
    if (lower.split("/")[0] === ".git") throw new Refusal(`${where}: .git is not a vault path`);
    const abs = join(vault, ...p.split("/"));
    if (existsSync(abs) && statSync(abs).isDirectory()) throw new Refusal(`${where}: is a directory`);
    if (paths.includes(p)) throw new Refusal(`${where}: listed twice`);
    paths.push(p);
  });
  if (!paths.length) throw new Refusal(`--paths-file ${file} lists no path`);
  const rel = relative(vault, file);
  const inside = rel && !rel.startsWith("..") && !/^[A-Za-z]:/.test(rel);
  if (inside && !rollback) {
    const selfRel = rel.split(sep).join("/");
    if (!paths.includes(selfRel)) throw new Refusal(`the manifest ${selfRel} lives in the vault but does not list itself`);
  }
  return paths;
}

// ---------------------------------------------------------------------------------------------------------------------
// the work

/** HEAD's (or BASE's) tree as path -> {mode, oid} */
function treeMap(git: ReturnType<typeof makeGit>, commit: string): Map<string, { mode: string; oid: string }> {
  const m = new Map<string, { mode: string; oid: string }>();
  for (const e of git(["ls-tree", "-r", "-z", "--full-tree", commit]).out.split("\0").filter(Boolean)) {
    const tab = e.indexOf("\t");
    const [mode, type, oid] = e.slice(0, tab).split(" ");
    if (type === "blob") m.set(e.slice(tab + 1), { mode, oid });
  }
  return m;
}
const chunks = <T>(xs: T[], n: number) => Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));
const prefixOf = (dir: string) => dir.split(sep).join("/").replace(/\/?$/, "/");

/** append one line to a file with O_APPEND, adding a newline first if the file does not end with one */
function appendLine(path: string, line: string, fallbackContent: string) {
  if (!existsSync(path)) {
    writeFileSync(path, fallbackContent);
    return;
  }
  let needNl = false;
  const rfd = openSync(path, "r");
  try {
    const size = fstatSync(rfd).size;
    if (size > 0) {
      const b = Buffer.alloc(1);
      readSync(rfd, b, 0, 1, size - 1);
      needNl = b[0] !== 10;
    }
  } finally {
    closeSync(rfd);
  }
  const fd = openSync(path, "a");
  try {
    writeSync(fd, (needNl ? "\n" : "") + line + "\n");
  } finally {
    closeSync(fd);
  }
}

export async function run(a: Args): Promise<{ code: number; text: string }> {
  const out: string[] = [];
  const say = (s: string) => out.push(s);
  const git = makeGit(a.vault);

  // ---- refusals before anything is staged
  if (!existsSync(join(a.vault, ".git"))) throw new Refusal(`${a.vault} is not the root of a git repository`);
  const sym = git(["symbolic-ref", "--quiet", "HEAD"], { allowFail: true }).out.trim();
  if (sym !== REF) throw new Refusal(`HEAD is ${sym || "detached"}, not ${REF}`);
  const head = git(["rev-parse", "--verify", "HEAD^{commit}"]).out.trim();
  const expect = git(["rev-parse", "--verify", "--quiet", a.expectHead + "^{commit}"], { allowFail: true }).out.trim();
  if (!expect) throw new Refusal(`--expect-head ${a.expectHead} is not a commit`);
  if (head !== expect) throw new Refusal(`HEAD is ${head.slice(0, 7)}, not --expect-head ${a.expectHead} (${expect.slice(0, 7)}): the branch moved; restart the batch at G-pre`);
  if (git(["diff", "--cached", "--quiet"], { allowFail: true }).code !== 0) throw new Refusal("the real index has staged changes (git diff --cached --quiet fails); commit.ts never stages into it, so something else did");
  const paths = readManifest(a.pathsFile, a.vault, a.rollback);
  let body = "";
  if (a.bodyFile) {
    if (!existsSync(a.bodyFile)) throw new Refusal(`--body-file ${a.bodyFile} does not exist`);
    body = readFileSync(a.bodyFile, "utf8").replace(/\r\n/g, "\n").replace(/\s+$/, "");
  }
  let base: string | null = null;
  if (a.rollback) {
    base = git(["rev-parse", "--verify", "--quiet", a.base + "^{commit}"], { allowFail: true }).out.trim();
    if (!base) throw new Refusal(`--base ${a.base} is not a commit`);
    if (git(["merge-base", "--is-ancestor", base, head], { allowFail: true }).code !== 0) throw new Refusal(`--base ${a.base} is not an ancestor of HEAD`);
  }
  if (a.exportDir && existsSync(a.exportDir)) {
    if (!statSync(a.exportDir).isDirectory()) throw new Refusal(`--export ${a.exportDir} is not a directory`);
    if (readdirSync(a.exportDir).length) throw new Refusal(`--export ${a.exportDir} is not empty`);
  }

  // ---- the throwaway index
  const tmp = mkdtempSync(join(tmpdir(), "reorg-commit-"));
  const index = join(tmp, "index");
  const ix = { index };
  try {
    git(["read-tree", head], ix);
    const headTree = treeMap(git, head);
    const action = a.rollback ? `reorg-rollback-${a.batch}` : `reorg-batch-${a.batch}`;
    const restored: string[] = [];
    const removed: string[] = [];
    if (!a.rollback) {
      const add: string[] = [];
      for (const p of paths) {
        const abs = join(a.vault, ...p.split("/"));
        if (existsSync(abs)) add.push(p);
        else if (headTree.has(p)) removed.push(p);
        else throw new Refusal(`manifest path ${p} is neither on disk nor in HEAD`);
      }
      for (const c of chunks(add, 50)) git(["add", "--", ...c], ix);
      for (const c of chunks(removed, 50)) git(["rm", "--cached", "--quiet", "--", ...c], ix);
    } else {
      const baseTree = treeMap(git, base!);
      for (const p of paths) {
        const b = baseTree.get(p);
        if (b) {
          git(["update-index", "--add", "--cacheinfo", `${b.mode},${b.oid},${p}`], ix);
          restored.push(p);
        } else if (headTree.has(p)) removed.push(p);
        else throw new Refusal(`manifest path ${p} is in neither BASE nor HEAD`);
      }
      for (const c of chunks(removed, 50)) git(["rm", "--cached", "--quiet", "--", ...c], ix);
    }
    const staged = git(["diff", "--cached", "--name-only", "--no-renames", "-z"], ix).out.split("\0").filter(Boolean).sort();
    const want = [...paths].sort();
    const extra = staged.filter((p) => !want.includes(p));
    const absent = want.filter((p) => !staged.includes(p));
    if (extra.length || absent.length) throw new Refusal(`the staged set differs from the manifest: ${extra.length ? `staged but not listed: ${extra.join(", ")}; ` : ""}${absent.length ? `listed but unchanged against HEAD: ${absent.join(", ")}` : ""}`);

    // ---- index.md from the staged tree, log.md from HEAD's blob plus the batch line
    const treeDir = join(tmp, "tree");
    git(["checkout-index", "-a", "-f", "--prefix=" + prefixOf(treeDir)], ix);
    const { buildIndexData, catalogText } = await import("../recall/indexer.ts");
    const { statNotes } = await import("../recall/lib.ts");
    const catalog = catalogText(buildIndexData(statNotes(treeDir)));
    const headIndex = headTree.has("index.md") ? git(["cat-file", "blob", "HEAD:index.md"]).out : null;
    const indexChanged = headIndex !== catalog;
    if (indexChanged) {
      const oid = git(["hash-object", "-w", "--stdin"], { input: catalog }).out.trim();
      git(["update-index", "--add", "--cacheinfo", `100644,${oid},index.md`], ix);
    }
    const headLog = headTree.has("log.md") ? git(["cat-file", "blob", "HEAD:log.md"]).out : "";
    const line = `- ${a.when} | ${action} | ${a.log}`;
    const newLog = headLog + (headLog === "" || headLog.endsWith("\n") ? "" : "\n") + line + "\n";
    const logOid = git(["hash-object", "-w", "--stdin"], { input: newLog }).out.trim();
    git(["update-index", "--add", "--cacheinfo", `100644,${logOid},log.md`], ix);
    say(`${a.rollback ? "rollback of batch " + a.batch : "batch " + a.batch}: ${paths.length} manifest path(s) staged in a throwaway index (${removed.length} removed${a.rollback ? `, ${restored.length} restored from ${base!.slice(0, 7)}` : ""}); index.md ${indexChanged ? "regenerated and staged" : "unchanged (not staged)"}; log.md line: ${line}`);

    // ---- export: the would-be-committed tree, then stop
    if (a.exportDir) {
      mkdirSync(a.exportDir, { recursive: true });
      git(["checkout-index", "-a", "-f", "--prefix=" + prefixOf(a.exportDir)], ix);
      say(`exported the would-be-committed tree to ${a.exportDir}; no commit was made and the real index was not written`);
      return { code: 0, text: out.join("\n") };
    }

    // ---- commit: commit-tree + compare-and-set update-ref; the real index is written only after the ref moved
    const now = git(["rev-parse", "--verify", "HEAD^{commit}"]).out.trim();
    if (now !== head) throw new Refusal(`HEAD moved to ${now.slice(0, 7)} while the batch was being staged; restart at G-pre`);
    const tree = git(["write-tree"], ix).out.trim();
    const msgFile = join(tmp, "message.txt");
    writeFileSync(msgFile, a.message + "\n\n" + (body ? body + "\n\n" : "") + TRAILER + "\n");
    const commit = git(["commit-tree", tree, "-p", head, "-F", msgFile]).out.trim();
    const moved = git(["update-ref", "-m", a.rollback ? `reorg rollback of batch ${a.batch}` : `reorg batch ${a.batch}`, REF, commit, head], { allowFail: true });
    if (moved.code !== 0) throw new Refusal(`git update-ref refused to move ${BRANCH} (${moved.err.trim().split("\n").pop()}); nothing was committed and the real index was not written`);
    say(`committed ${commit} on ${BRANCH} (parent ${head.slice(0, 7)}); nothing was pushed`);
    try {
      return afterCommit(a, git, paths, restored, removed, line, newLog, out);
    } catch (e) {
      // the commit exists: never report "no commit was made" from here
      say(`WARNING: the commit ${commit} is made, but a step after it failed: ${(e as Error)?.message ?? e}`);
      return { code: 2, text: out.join("\n") };
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/** after the ref moved: sync the real index for exactly these paths, append the log line, restore files (rollback) */
function afterCommit(a: Args, git: ReturnType<typeof makeGit>, paths: string[], restored: string[], removed: string[], line: string, newLog: string, out: string[]): { code: number; text: string } {
  const say = (s: string) => out.push(s);
  {
    let code = 0;
    const sync = git(["reset", "-q", "--", ...paths, "index.md", "log.md"], { allowFail: true, writeRealIndex: true });
    if (sync.code !== 0) {
      code = 2;
      say(`WARNING: the commit is made but syncing the real index failed (${sync.err.trim()}); run: git reset -q -- <manifest paths> index.md log.md`);
    }
    try {
      appendLine(join(a.vault, "log.md"), line, newLog);
    } catch (e) {
      code = 2;
      say(`WARNING: the commit is made but appending to the working log.md failed: ${(e as Error).message}`);
    }
    if (a.rollback) {
      if (restored.length) {
        const r = git(["restore", "--source=HEAD", "--worktree", "--", ...restored], { allowFail: true, writeRealIndex: true });
        if (r.code !== 0) {
          code = 2;
          say(`WARNING: restoring the working files failed (${r.err.trim()})`);
        }
      }
      const self = resolve(import.meta.path);
      const order = [...removed.filter((p) => resolve(join(a.vault, ...p.split("/"))) !== self), ...removed.filter((p) => resolve(join(a.vault, ...p.split("/"))) === self)];
      for (const p of order) {
        if (p === PLAN_REL) {
          say(`kept ${p} on disk (it left the tree only, untracked again)`);
          continue;
        }
        const abs = join(a.vault, ...p.split("/"));
        try {
          if (existsSync(abs)) unlinkSync(abs);
        } catch (e) {
          code = 2;
          say(`WARNING: could not delete ${p}: ${(e as Error).message}${resolve(abs) === self ? " (commit.ts itself; delete it by hand)" : ""}`);
        }
      }
    }
    say("git status --porcelain:");
    say(git(["status", "--porcelain"], { allowFail: true, writeRealIndex: true }).out.replace(/\s+$/, "") || "(clean)");
    return { code, text: out.join("\n") };
  }
}

const USAGE =
  "usage: bun .bedrock/reorg/commit.ts --batch N --expect-head <sha> --paths-file <f> --message <m> --log <text> --when <time> [--body-file <f>] [--export <dir>] [--rollback --base <sha>] [--vault <dir>]";

if (import.meta.main) {
  try {
    const argv = process.argv.slice(2);
    if (argv.includes("--help") || argv.includes("-h")) {
      console.log(USAGE);
    } else {
      const r = await run(parseArgs(argv));
      console.log(r.text);
      process.exitCode = r.code;
    }
  } catch (e) {
    console.error(`commit.ts: ${e instanceof Refusal ? "REFUSED: " : "FAILED: "}${(e as Error)?.message ?? e}`);
    console.error("the real index was not written; no commit was made");
    process.exitCode = 1;
  }
}
