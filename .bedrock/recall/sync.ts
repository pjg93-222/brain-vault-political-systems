// Memory capture (Stop and SessionEnd hooks): copies Claude Code memory files that the vault does not hold yet into
// fleeting/ as raw fleeting notes. Curated notes are never written.
//
// Sources: <projects>/*/memory/*.md except MEMORY.md (the index Claude Code keeps). The dedupe authority is the vault
// itself: the frontmatter `sources: [{path, sha256}]` of every note, fleeting/ included. A memory file is in the vault
// when some note lists its path with its current sha256.
//   - new source (no note lists the path)        -> create fleeting/<project-slug>--<file-slug>.md
//   - changed source (path listed, sha differs)  -> create or update that file's fleeting note with the new text, with
//                                                   `updates:` linking the notes that hold the earlier version
// Ownership: a fleeting note is updated in place only while the hook provably owns it: state.json records the sha256 of
// the exact bytes the hook wrote (saved right after each write), and the file still has those bytes. Anything else (an
// edited note, a note the hook did not write, a lost state.json) is left alone and a new sibling (-2, -3, ...) is written.
// Deleting a fleeting note the hook wrote dismisses that version of its memory file: it is not captured again until the
// memory file changes.
// Before any text is copied it is scanned for secrets (secrets.ts); a hit skips the file and warns on every sync until it
// is fixed. Only when notes were written does the sync append to log.md; whenever the note set changed (by this sync or by
// anything else) it refreshes the recall index, index.md and the graph page (watch.ts's command and output path; a
// failed page build is retried once, then left until the vault changes again). It never commits or pushes.
// Caches (sha256 per memory file, sources per note, keyed by mtime + size) live in .bedrock/sync/state.json;
// .bedrock/sync/sync.lock keeps two sessions from syncing at once (stale after 60 s).
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { userInfo } from "node:os";
import { pathToFileURL } from "node:url";
import { splitFrontmatter, toPlain } from "../graph/extract.ts";
import { LEAK_GUARDS } from "../graph/checks.ts";
import {
  GRAPH_DIR,
  HOOK_ID,
  LOCK_FILE,
  LOG_MD,
  PROJECTS_DIR,
  STATE_FILE,
  SYNC_DIR,
  VAULT,
  VAULT_IS_OVERRIDE,
  localDate,
  localStamp,
  logLine,
  oneLine,
  parseYaml,
  sha256,
  signature,
  statNotes,
  str,
  writeAtomic,
} from "./lib.ts";
import { scanSecrets } from "./secrets.ts";
import { firstSentence, rebuildIndex } from "./indexer.ts";
import { loadIndex, rank } from "./recall.ts";

const LOCK_STALE_MS = 60_000;
const GRAPH_TIMEOUT_MS = 20_000;
/** Memory files are a few KB; anything this large is not a memory note and is reported instead of copied. */
const MAX_MEMORY_BYTES = 1024 * 1024;

export const LOG_HEADER = [
  "# Log",
  "",
  "> Append-only event log of this vault, **oldest first**: new events go at the bottom, one line each, and existing lines are never edited or reordered. Format: `- YYYY-MM-DD HH:MM ±HH:MM | action | what happened | notes touched`. The capture hook appends a line for every sync that writes notes; agents and people append one whenever they create, update, promote or delete notes. It is a system note: not a graph node, and not part of recall, orphan or incoming-link checks.",
  "",
].join("\n");

// ------------------------------------------------------------------------------------------------------------- state
type Written = { sha: string; src: string; srcSha: string }; // bytes the hook wrote; the memory file (key) and version
type State = {
  v: 2;
  /** memory file key (lower-case path) -> cached hash */
  files: Record<string, { mtimeMs: number; size: number; sha256: string }>;
  /** note rel path -> cached [path, sha256] pairs from its frontmatter sources */
  notes: Record<string, { mtimeMs: number; size: number; sources: [string, string][] }>;
  /** fleeting note rel path -> what the hook wrote there */
  written: Record<string, Written>;
  /** memory file key -> sha256 of the version whose fleeting note was deleted (not captured again) */
  dismissed: Record<string, string>;
  /** note-set signature the graph page and index were last refreshed for */
  lastVaultSig?: string;
  /** a page build that failed for this signature (retried once) */
  graphFail?: { sig: string };
};

let stateText = ""; // state.json as loaded or last saved: rewritten only when the state differs
function loadState(): State {
  try {
    stateText = readFileSync(STATE_FILE, "utf8");
    const s = JSON.parse(stateText);
    if (s && s.v === 2 && s.files && s.notes && s.written && s.dismissed) return s as State;
  } catch {
    /* missing or unreadable */
  }
  // a fresh start only costs re-hashing; without ownership records, existing fleeting notes are never overwritten
  return { v: 2, files: {}, notes: {}, written: {}, dismissed: {} };
}

function saveState(state: State) {
  const next = JSON.stringify(state);
  if (next === stateText) return;
  writeAtomic(STATE_FILE, next);
  stateText = next;
}

// -------------------------------------------------------------------------------------------------------------- lock
let lockHeld = false;
const BUSY = ["EPERM", "EBUSY", "EACCES"];

function acquireLock(): boolean {
  mkdirSync(SYNC_DIR, { recursive: true });
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      writeFileSync(LOCK_FILE, JSON.stringify({ pid: process.pid, at: new Date().toISOString() }), { flag: "wx" });
      lockHeld = true;
      return true;
    } catch (e: any) {
      if (BUSY.includes(e?.code)) return false; // being deleted or held open: treat as locked
      if (e?.code !== "EEXIST") throw e;
    }
    let seen: number;
    try {
      seen = statSync(LOCK_FILE).mtimeMs;
    } catch (e: any) {
      if (e?.code === "ENOENT") continue;
      return false;
    }
    if (Date.now() - seen <= LOCK_STALE_MS) return false; // another session is syncing
    // stale (its owner died): move it aside, which only one process can do, and make sure it was the stale one
    const aside = `${LOCK_FILE}.stale-${process.pid}`;
    try {
      renameSync(LOCK_FILE, aside);
    } catch {
      continue; // someone else took it first
    }
    try {
      if (statSync(aside).mtimeMs !== seen) {
        // a fresh lock replaced the stale one in between: put it back and stand down
        try {
          renameSync(aside, LOCK_FILE);
        } catch {
          /* its owner will notice nothing; ours is the losing side either way */
        }
        return false;
      }
      unlinkSync(aside);
    } catch {
      /* already gone */
    }
    logLine("sync", "removed a stale sync.lock (older than 60 s)");
  }
  return false;
}

export function releaseLock() {
  if (!lockHeld) return;
  try {
    const held = JSON.parse(readFileSync(LOCK_FILE, "utf8"));
    if (held?.pid === process.pid) unlinkSync(LOCK_FILE);
  } catch {
    /* already gone */
  }
  lockHeld = false;
}

// ---------------------------------------------------------------------------------------------------- memory files
type MemFile = { path: string; key: string; project: string; file: string; mtimeMs: number; size: number; sha: string; text?: string };
const keyOf = (p: string) => p.replace(/\//g, "\\").toLowerCase();

function listMemoryFiles(): { path: string; project: string; file: string }[] {
  const out: { path: string; project: string; file: string }[] = [];
  let projects;
  try {
    projects = readdirSync(PROJECTS_DIR, { withFileTypes: true });
  } catch (e: any) {
    if (e?.code === "ENOENT") return out;
    throw e;
  }
  for (const d of projects) {
    if (!d.isDirectory()) continue;
    const dir = join(PROJECTS_DIR, d.name, "memory");
    let files;
    try {
      files = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue; // no memory folder
    }
    for (const f of files) {
      if (f.isFile() && /\.md$/i.test(f.name) && f.name.toLowerCase() !== "memory.md") out.push({ path: join(dir, f.name), project: d.name, file: f.name });
    }
  }
  return out;
}

// --------------------------------------------------------------------------------------------------- vault sources
/** [path, sha256] pairs of a note's frontmatter `sources`; a regex fallback covers frontmatter that YAML cannot parse. */
export function readSources(abs: string): [string, string][] {
  const { fm } = splitFrontmatter(readFileSync(abs, "utf8"));
  if (!/^sources\s*:/m.test(fm)) return [];
  const out: [string, string][] = [];
  const y = parseYaml(fm);
  if (Array.isArray(y.sources)) {
    for (const s of y.sources as any[]) if (s && typeof s.path === "string") out.push([s.path, typeof s.sha256 === "string" ? s.sha256.toLowerCase() : ""]);
    if (out.length) return out;
  }
  for (const m of fm.matchAll(/path:\s*"((?:[^"\\]|\\.){1,1000})"[^\n}]{0,400}?sha256:\s*"([0-9a-fA-F]{64})"/g)) {
    try {
      out.push([JSON.parse('"' + m[1] + '"'), m[2].toLowerCase()]);
    } catch {
      /* not a JSON-style string: skip */
    }
  }
  return out;
}

// ------------------------------------------------------------------------------------------------------------ naming
const USER = (() => {
  try {
    return userInfo().username.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  } catch {
    return "";
  }
})();

/** "C--Users-<you>-OneDrive-Desktop-Melange-Systems" -> "melange-systems"; scratch workspaces -> "scratch-<date>-<id>". */
export function projectSlug(folder: string): string {
  let s = folder.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  s = s.replace(/^[a-z]-+/, ""); // drive letter
  if (USER) s = s.replace(new RegExp(`^users-${USER}(?:-|$)`), "");
  s = s.replace(/^users-[a-z0-9]+-/, "");
  s = s.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-?/g, ""); // session / workspace UUIDs
  s = s.replace(/^(?:onedrive-)?(?:desktop-|documents-)?/, "");
  s = s.replace(/^appdata-(?:roaming|local)-/, "").replace(/^claude-scratch-workspaces-/, "");
  s = s.replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (s.length > 40) s = s.slice(-40).replace(/^[^-]*-/, "");
  return s || "project";
}

/** "mentat_GitHub Migration.md" -> "mentat-github-migration" (ASCII, max 80 characters, no long hex runs). */
export function fileSlug(file: string): string {
  let s = file.replace(/\.md$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (USER) s = s.replace(new RegExp(`(^|-)${USER}(?=-|$)`, "g"), "$1user");
  s = s.replace(/[0-9a-f]{32,}/g, (h) => h.slice(0, 8));
  return s.slice(0, 80).replace(/-$/, "") || "memory";
}

/** "mentat-github-migration-2026-10-02" -> "Mentat github migration (2026-10-02)" */
function humanize(name: string): string {
  const date = name.match(/[-_](\d{4}-\d{2}-\d{2})$/)?.[1];
  let base = (date ? name.slice(0, -(date.length + 1)) : name).replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  base = base.charAt(0).toUpperCase() + base.slice(1);
  return (date ? `${base} (${date})` : base) || name;
}

/** A string as build.ts embeds it in the page: JSON-encoded, then <, >, &, U+2028 and U+2029 escaped. */
const pageForm = (s: string) =>
  JSON.stringify(s)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

/**
 * The graph page shows a note's title and tagline; its publish gate refuses emails, hashes, ".claude" and local paths,
 * and it checks the final, escaped bytes: "HEAD:<path>" is embedded as "HEAD:\u003cpath" and reads as a drive path.
 * Make a text that passes the same guards after the extractor's own cleaning and that escaping, or fall back. The input
 * is clipped first (the page shows 200 characters at most), which also keeps every regex here linear.
 */
export function graphSafe(text: string, fallback: string): string {
  const trips = (s: string) => {
    const plain = toPlain(s);
    const page = pageForm(plain);
    return LEAK_GUARDS.some(([, re]) => re.test(plain) || re.test(page));
  };
  let t = text.slice(0, 300).replace(/\s+/g, " ").trim();
  if (!trips(t)) return t;
  t = t
    .replace(/[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)+/g, "(email)")
    .replace(/\b[0-9a-f]{64}\b/gi, "(hash)")
    .replace(/sha-?256/gi, "hash")
    .replace(/\bfile:\/\/\S*/gi, "")
    .replace(/~?[\\/]?\.claude\b/gi, " claude")
    .replace(/(?:[A-Za-z]:)?[\\/]+Users[\\/]+[^\\/\s]+[\\/]*/gi, "")
    .replace(/[A-Za-z]:\\/g, "")
    .replace(/"sources"/g, "sources")
    .replace(/@/g, " at ")
    .replace(/([A-Za-z]):(?=[<>&"\\])/g, "$1: ") // a colon the page would follow with an escape sequence
    .replace(/\s+/g, " ")
    .trim();
  return t && !trips(t) ? t : fallback;
}

/**
 * Memory text as a note body: headings demoted two levels (the note keeps its own ## sections), and [[memory-name]]
 * references that are not vault notes written as `memory-name` code (the import's convention), so they make no ghost
 * links. Code blocks and inline code are left untouched.
 */
function vaultBody(body: string, isNote: (slug: string) => boolean): string {
  const out: string[] = [];
  let fence = false;
  for (const line of body.replace(/\r\n/g, "\n").split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      fence = !fence;
      out.push(line);
      continue;
    }
    if (fence) {
      out.push(line);
      continue;
    }
    const demoted = line.replace(/^(#{1,4})(?=\s)/, "##$1");
    const parts = demoted.split(/(`+[^`]*`+)/);
    for (let k = 0; k < parts.length; k += 2) {
      parts[k] = parts[k].replace(/!?\[\[([^\[\]\n]{0,300}?)\]\]/g, (all, inner: string) => {
        const t = inner.replace(/\\\|/g, "|");
        const target = t.split("|")[0].split("#")[0].trim();
        if (isNote(target.split("/").pop()!.replace(/\.md$/i, ""))) return all;
        const label = (t.includes("|") ? t.slice(t.indexOf("|") + 1) : target).replace(/`/g, "").trim();
        return label ? "`" + label + "`" : "";
      });
    }
    out.push(parts.join(""));
  }
  return out.join("\n").trim();
}

const yq = (s: string) => JSON.stringify(s); // JSON strings are valid YAML double-quoted scalars

/**
 * name / description / memory type of a memory file. Claude Code writes this frontmatter loosely: a description such as
 * `"Lobbied-member" is DERIVED from ...` is not valid YAML, so each field falls back to its raw line.
 */
export function memoryMeta(text: string): { name: string | null; description: string | null; type: string | null; body: string } {
  const { fm, body } = splitFrontmatter(text);
  const y = parseYaml(fm);
  const meta = y.metadata && typeof y.metadata === "object" ? (y.metadata as Record<string, unknown>) : {};
  const line = (re: RegExp) => {
    const v = fm.match(re)?.[1]?.trim();
    if (!v) return null;
    return /^"[^"]*"$|^'[^']*'$/.test(v) ? v.slice(1, -1).trim() || null : v;
  };
  return {
    name: str(y.name) ?? line(/^name:[ \t]*(.+)$/m),
    description: str(y.description) ?? line(/^description:[ \t]*(.+)$/m),
    type: str(meta.type) ?? str(y.type) ?? line(/^[ \t]+type:[ \t]*(.+)$/m) ?? line(/^type:[ \t]*(.+)$/m),
    body,
  };
}

type Compose = {
  m: MemFile;
  kind: "new" | "changed";
  updates: string[]; // wikilink targets of the notes holding the earlier version
  suggestions: string[]; // wikilink targets suggested by recall (new sources only)
  captured: string; // captured_at / created_at to keep (the first capture's date)
  isNote: (slug: string) => boolean;
};

function composeNote(c: Compose): string {
  const { m } = c;
  const today = localDate();
  const mm = memoryMeta(m.text ?? "");
  const body = mm.body;
  const name = mm.name ?? m.file.replace(/\.md$/i, "");
  const memType = mm.type ?? "";
  const project = projectSlug(m.project);
  const title = graphSafe(humanize(name), humanize(fileSlug(m.file)));
  const description = mm.description ?? firstSentence(body);
  const tagline = graphSafe(description, `Claude Code memory captured from project ${project}.`);
  const url = pathToFileURL(m.path).href;
  const fmLines = [
    "---",
    "type: fleeting",
    `title: ${yq(title)}`,
    `aliases: [${yq(name.slice(0, 200))}]`,
    'source: "session"',
    `captured_at: ${c.captured}`,
    `created_at: ${c.captured}`,
    'status: "raw"',
    'promoted_to: ""',
    `project: ${yq(project)}`,
    ...(memType ? [`memory_type: ${yq(memType.slice(0, 40))}`] : []),
    ...(c.updates.length ? ["updates:", ...c.updates.map((u) => `  - ${yq(`[[${u}]]`)}`)] : []),
    "sources:",
    `  - {url: ${yq(url)}, type: "claude-memory", synced_at: ${yq(today)}, path: ${yq(m.path)}, sha256: ${yq(m.sha)}}`,
    `updated_at: ${today}`,
    `updated_by: ${yq(HOOK_ID)}`,
    'tags: ["type/fleeting", "status/raw"]',
    "---",
  ];
  const links = [
    ...c.updates.map((u) => `- [[${u}]] — holds an earlier version of this memory file; this note carries the newer text`),
    ...c.suggestions.map((s) => `- [[${s}]] — keyword match from recall, unverified`),
  ];
  const where = `the Claude Code memory file \`${m.file}\` of project \`${project}\`${memType ? ` (memory type: ${memType.slice(0, 40)})` : ""}`;
  const why =
    c.kind === "changed" && c.updates.length
      ? `Changed source: an earlier version of this file was imported into ${c.updates.map((u) => `[[${u}]]`).join(", ")}, and those notes were not modified. To promote, fold what is new into them with \`/bedrock:preserve\`, then set \`status: promoted\` and \`promoted_to\` here.`
      : "New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.";
  return [
    ...fmLines,
    "",
    `# ${title}`,
    "",
    `> ${tagline}`,
    "",
    "## Content",
    "",
    vaultBody(body, c.isNote) || "_(the memory file has no body text)_",
    "",
    "## Possible Connections",
    "",
    ...(links.length ? links : ["- none found yet"]),
    "",
    "## Capture Context",
    "",
    `Captured by the brain capture hook (\`.bedrock/recall/hook.ts sync\`, run on Stop and SessionEnd) on ${today} from ${where}. The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set \`status: archived\` or delete the note; a deleted note comes back only when the memory file changes. ${why}`,
    "",
  ].join("\n");
}

// -------------------------------------------------------------------------------------------------------- graph page
export type GraphResult = { ok: boolean; skipped?: boolean; notes?: number; links?: number; reason?: string; ms: number };

/** `bun build.ts` in .bedrock/graph: the watcher's command, so the page lands at its usual place beside the vault. */
export function buildGraphPage(): GraphResult {
  const t0 = performance.now();
  if (VAULT_IS_OVERRIDE && !process.env.BRAIN_GRAPH_OUT) return { ok: true, skipped: true, ms: 0 };
  const args = [process.execPath, "build.ts"];
  if (VAULT_IS_OVERRIDE) args.push("--vault", VAULT, "--out", resolve(process.env.BRAIN_GRAPH_OUT!));
  const r = Bun.spawnSync(args, { cwd: GRAPH_DIR, stdin: "ignore", stdout: "pipe", stderr: "pipe", windowsHide: true, timeout: GRAPH_TIMEOUT_MS });
  const ms = Math.round(performance.now() - t0);
  const line = r.stdout.toString().split(/\r?\n/).reverse().find((l) => l.startsWith("BUILD_RESULT "));
  if (line) {
    try {
      const j = JSON.parse(line.slice("BUILD_RESULT ".length));
      if (j.ok && r.exitCode === 0) return { ok: true, notes: j.notes, links: j.links, ms };
      return { ok: false, reason: oneLine(j.reason ?? "build failed", 300), ms };
    } catch {
      /* fall through */
    }
  }
  const tail = r.stderr.toString().split(/\r?\n/).filter(Boolean).pop() ?? "";
  return { ok: false, reason: `build exited with code ${r.exitCode}${tail ? ": " + oneLine(tail, 200) : ""}`, ms };
}

// --------------------------------------------------------------------------------------------------------------- sync
export type Planned = { rel: string; kind: "new" | "changed"; source: string; updates: string[]; action: "create" | "update" };
export type SyncReport = {
  dryRun: boolean;
  locked: boolean;
  scanned: number;
  inVault: number;
  dismissed: number;
  newSources: number;
  changedSources: number;
  written: Planned[];
  blocked: { source: string; patterns: string[] }[];
  failed: { source: string; error: string }[];
  /** problems after the capture itself (log, index, graph page): reported, never fatal to the capture */
  problems: string[];
  index?: { rebuilt: boolean; catalog: string; notes: number };
  graph?: GraphResult;
  ms: number;
};

const slugOfRel = (rel: string) => rel.split("/").pop()!;
const noteAbs = (rel: string) => join(VAULT, ...rel.split("/")) + ".md";

export function sync(opts: { dryRun?: boolean } = {}): SyncReport {
  const t0 = performance.now();
  const dryRun = Boolean(opts.dryRun);
  const report: SyncReport = {
    dryRun,
    locked: false,
    scanned: 0,
    inVault: 0,
    dismissed: 0,
    newSources: 0,
    changedSources: 0,
    written: [],
    blocked: [],
    failed: [],
    problems: [],
    ms: 0,
  };
  if (!dryRun && !acquireLock()) {
    report.locked = true;
    report.ms = Math.round(performance.now() - t0);
    return report;
  }
  try {
    const state = loadState();

    // 1. memory files, hashed (cached by mtime + size); one unreadable file is reported, the rest go on
    const files: State["files"] = {};
    const mems: MemFile[] = [];
    for (const f of listMemoryFiles()) {
      const key = keyOf(f.path);
      try {
        const st = statSync(f.path);
        const c = state.files[key];
        let sha: string;
        let text: string | undefined;
        if (c && c.mtimeMs === st.mtimeMs && c.size === st.size) sha = c.sha256;
        else {
          const buf = readFileSync(f.path);
          sha = sha256(buf);
          if (buf.length <= MAX_MEMORY_BYTES) text = buf.toString("utf8");
        }
        files[key] = { mtimeMs: st.mtimeMs, size: st.size, sha256: sha };
        mems.push({ ...f, key, mtimeMs: st.mtimeMs, size: st.size, sha, text });
      } catch (e: any) {
        if (e?.code === "ENOENT") continue; // vanished
        report.failed.push({ source: f.path, error: oneLine(e?.message ?? e, 200) });
        logLine("error", `sync: cannot read ${f.path}: ${oneLine(e?.message ?? e, 300)}`);
      }
    }
    state.files = files;
    report.scanned = mems.length + report.failed.length;
    const current = new Map(mems.map((m) => [m.key, m.sha]));

    // 2. what the vault holds: sources of every note (cached by mtime + size)
    let notes = statNotes(VAULT);
    const noteCache: State["notes"] = {};
    const held = new Map<string, { notes: Set<string>; shas: Set<string> }>();
    for (const n of notes) {
      const c = state.notes[n.rel];
      let entry = c;
      if (!(c && c.mtimeMs === n.mtimeMs && c.size === n.size)) {
        try {
          entry = { mtimeMs: n.mtimeMs, size: n.size, sources: readSources(n.abs) };
        } catch (e) {
          // guessing what an unreadable note holds could duplicate it in fleeting/: use the last known sources, or stop
          if (!c) throw new Error(`cannot read ${n.rel}.md to learn which memory files it holds: ${oneLine((e as Error)?.message ?? e, 160)}`);
          logLine("error", `sync: cannot read ${n.rel}.md, using its last known sources: ${oneLine((e as Error)?.message ?? e, 200)}`);
        }
      }
      noteCache[n.rel] = entry!;
      for (const [p, s] of entry!.sources) {
        const k = keyOf(p);
        const h = held.get(k) ?? { notes: new Set<string>(), shas: new Set<string>() };
        h.notes.add(n.rel);
        if (s) h.shas.add(s);
        held.set(k, h);
      }
    }
    state.notes = noteCache;
    const relSet = new Set(notes.map((n) => n.rel));
    const slugCount = new Map<string, number>();
    for (const n of notes) slugCount.set(n.slug, (slugCount.get(n.slug) ?? 0) + 1);
    const linkTarget = (rel: string) => ((slugCount.get(slugOfRel(rel)) ?? 0) > 1 ? rel : slugOfRel(rel));
    const isNote = (slug: string) => slugCount.has(slug) || relSet.has(slug);

    // 3. fleeting notes the hook wrote that are gone were dismissed; a dismissal lasts while that version is current
    for (const [rel, w] of Object.entries(state.written)) {
      if (relSet.has(rel) || existsSync(noteAbs(rel))) continue;
      if (w.src && w.srcSha) state.dismissed[w.src] = w.srcSha;
      delete state.written[rel];
    }
    for (const [k, s] of Object.entries(state.dismissed)) if (current.get(k) !== s) delete state.dismissed[k];

    // 4. every memory file that is not in the vault at its current hash
    const idx = loadIndex();
    const reserved = new Set<string>(); // names given out in this run (dry runs included)
    const writtenNow: string[] = [];
    for (const m of mems) {
      const h = held.get(m.key);
      if (h?.shas.has(m.sha)) {
        report.inVault++;
        continue;
      }
      if (state.dismissed[m.key] === m.sha) {
        report.dismissed++;
        continue;
      }
      const kind: "new" | "changed" = h ? "changed" : "new";
      if (kind === "new") report.newSources++;
      else report.changedSources++;
      try {
        if (m.size > MAX_MEMORY_BYTES) throw new Error(`file too large to capture (${Math.round(m.size / 1024)} KB)`);
        m.text ??= readFileSync(m.path, "utf8");
        if (m.text.includes("\u0000")) throw new Error("binary or UTF-16 text (NUL bytes); save it as UTF-8 to capture it");
        const hits = scanSecrets(m.text);
        if (hits.length) {
          const patterns = [...new Set(hits.map((x) => `${x.pattern} (line ${x.line})`))];
          report.blocked.push({ source: m.path, patterns });
          logLine("secret", `${m.path}: not copied into the vault: ${patterns.join("; ")}`);
          continue;
        }

        // the fleeting note to write: one the hook provably still owns, else a new file under a free name
        const citing = [...(h?.notes ?? [])].sort();
        let target: string | null = null;
        let captured = localDate();
        for (const rel of citing.filter((r) => r.startsWith("fleeting/"))) {
          const w = state.written[rel];
          if (!w) continue; // not written by the hook, or its record is lost: never overwritten
          const bytes = readFileSync(noteAbs(rel), "utf8");
          if (w.sha !== sha256(bytes)) continue; // edited since the hook wrote it
          target = rel;
          const cap = str(parseYaml(splitFrontmatter(bytes).fm).captured_at);
          if (cap && /^\d{4}-\d{2}-\d{2}$/.test(cap)) captured = cap;
          break;
        }
        const action: "create" | "update" = target ? "update" : "create";
        if (!target) {
          const base = `fleeting/${projectSlug(m.project)}--${fileSlug(m.file)}`;
          target = base;
          for (let k = 2; relSet.has(target) || reserved.has(target) || existsSync(noteAbs(target)); k++) target = `${base}-${k}`;
        }
        if (!target.startsWith("fleeting/")) throw new Error("refusing to write outside fleeting/: " + target); // never a curated note
        reserved.add(target);
        const updates = citing.filter((r) => r !== target).map(linkTarget);
        let suggestions: string[] = [];
        if (kind === "new" && idx) {
          const mm = memoryMeta(m.text);
          const probe = [mm.name ?? m.file, mm.description ?? "", firstSentence(mm.body)].join(" ").replace(/[-_]+/g, " ").slice(0, 1000);
          suggestions = rank(idx, probe)
            .hits.map((x) => idx.notes[x.i])
            .filter((n) => n.k !== "fleeting" && relSet.has(n.p.replace(/\.md$/i, "")))
            .slice(0, 3)
            .map((n) => linkTarget(n.p.replace(/\.md$/i, "")));
        }
        const text = composeNote({ m, kind, updates, suggestions, captured, isNote });
        const planned: Planned = { rel: target, kind, source: m.path, updates, action };
        if (dryRun) {
          report.written.push(planned);
          continue;
        }
        writeAtomic(noteAbs(target), text);
        state.written[target] = { sha: sha256(text), src: m.key, srcSha: m.sha };
        saveState(state); // ownership is on disk before anything else can fail
        report.written.push(planned);
        writtenNow.push(target);
        const hh = held.get(m.key) ?? { notes: new Set<string>(), shas: new Set<string>() };
        hh.notes.add(target);
        hh.shas.add(m.sha);
        held.set(m.key, hh);
        relSet.add(target);
      } catch (e) {
        report.failed.push({ source: m.path, error: oneLine((e as Error)?.message ?? e, 300) });
        logLine("error", `sync ${m.path}: ${oneLine((e as Error)?.stack ?? e, 1000)}`);
      }
    }
    if (dryRun) return report;

    // 5. log.md, recall index + index.md, graph page: problems here are reported but never undo the capture
    try {
      if (writtenNow.length) {
        const nNew = report.written.filter((w) => w.kind === "new").length;
        const nChanged = report.written.length - nNew;
        if (!existsSync(LOG_MD)) writeFileSync(LOG_MD, LOG_HEADER + "\n", "utf8");
        const sep = readFileSync(LOG_MD, "utf8").endsWith("\n") ? "" : "\n";
        appendFileSync(
          LOG_MD,
          `${sep}- ${localStamp()} | sync | captured ${writtenNow.length} memory file(s) into fleeting/ (new ${nNew}, changed ${nChanged}) | ${writtenNow.map((r) => `[[${linkTarget(r)}]]`).join(", ")}\n`,
        );
        logLine("sync", `wrote ${writtenNow.join(", ")}`);
      }
      notes = statNotes(VAULT);
      const sig = signature(notes);
      if (writtenNow.length || sig !== state.lastVaultSig) {
        const cur = loadIndex();
        if (!cur || cur.sig !== sig) {
          const r = rebuildIndex(notes);
          report.index = { rebuilt: true, catalog: r.catalog, notes: r.notes };
        } else report.index = { rebuilt: false, catalog: "unchanged", notes: cur.notes.length };
        report.graph = buildGraphPage();
        if (report.graph.ok) {
          state.lastVaultSig = sig;
          delete state.graphFail;
        } else if (state.graphFail?.sig === sig) {
          state.lastVaultSig = sig; // failed twice for this vault state: wait for the next change
          logLine("graph", `page not rebuilt again (giving up until the vault changes): ${report.graph.reason}`);
        } else {
          state.graphFail = { sig };
          report.problems.push(`graph page not rebuilt: ${report.graph.reason}`);
          logLine("graph", `page not rebuilt (retried at the next sync): ${report.graph.reason}`);
        }
      }
    } catch (e) {
      report.problems.push(oneLine((e as Error)?.message ?? e, 200));
      logLine("error", `sync after capture: ${oneLine((e as Error)?.stack ?? e, 1000)}`);
    }
    saveState(state);
    return report;
  } finally {
    releaseLock();
    report.ms = Math.round(performance.now() - t0);
  }
}

/** The systemMessage for the user, or null: every memory file that is still not in the vault and why, plus problems. */
export function syncWarning(r: SyncReport): string | null {
  const name = (p: string) => p.split(/[\\/]/).pop();
  const items = [
    ...r.blocked.map((b) => `${name(b.source)} (secret: ${b.patterns.map((p) => p.replace(/ \(line \d+\)$/, "")).join(", ")})`),
    ...r.failed.map((f) => `${name(f.source)} (error: ${oneLine(f.error, 80)})`),
  ];
  const parts: string[] = [];
  if (items.length)
    parts.push(
      `${items.length} memory file(s) are not in the vault: ${items.slice(0, 6).join("; ")}${items.length > 6 ? `; +${items.length - 6} more` : ""}. Remove the secret or fix the error and the next sync retries`,
    );
  if (r.problems.length) parts.push(r.problems.slice(0, 2).join("; "));
  if (!parts.length) return null;
  return oneLine(`Brain sync: ${parts.join(". ")}. Details in ${join(VAULT, ".bedrock", "recall", "hook.log")}`, 900);
}

/** Human-readable report for manual runs. */
export function syncText(r: SyncReport): string {
  if (r.locked) return "brain sync: skipped, another session holds .bedrock/sync/sync.lock";
  const lines = [
    `brain sync${r.dryRun ? " (dry run, nothing written)" : ""}: ${r.scanned} memory files, ${r.inVault} already in the vault, ${r.newSources} new, ${r.changedSources} changed${r.dismissed ? `, ${r.dismissed} dismissed` : ""}; ${r.dryRun ? "would write" : "wrote"} ${r.written.length} note(s), blocked ${r.blocked.length}, failed ${r.failed.length} (${r.ms} ms)`,
  ];
  for (const w of r.written) lines.push(`  ${w.kind.padEnd(7)} ${w.action} ${w.rel}.md${w.updates.length ? `  updates: ${w.updates.join(", ")}` : ""}  <- ${w.source.split(/[\\/]/).pop()}`);
  for (const b of r.blocked) lines.push(`  BLOCKED ${b.source}: ${b.patterns.join("; ")}`);
  for (const f of r.failed) lines.push(`  FAILED  ${f.source}: ${f.error}`);
  for (const p of r.problems) lines.push(`  PROBLEM ${p}`);
  if (r.index) lines.push(`  index: ${r.index.rebuilt ? "rebuilt" : "current"} (${r.index.notes} notes), index.md ${r.index.catalog}`);
  if (r.graph) lines.push(`  graph page: ${r.graph.skipped ? "skipped (test vault without BRAIN_GRAPH_OUT)" : r.graph.ok ? `rebuilt, ${r.graph.notes} notes, ${r.graph.links} links (${r.graph.ms} ms)` : `NOT rebuilt: ${r.graph.reason}`}`);
  return lines.join("\n");
}
