// Text-conservation gate for the Phase 2 reorganisation (plan A.2). READ-ONLY: it reads notes from a base commit and from
// the working tree (or the index), prints what it finds and exits 1 on any failure. It writes nothing but --json.
//
//   bun .bedrock/reorg/conserve.ts --base <commit> [--allow <file>]... [--staged] [--vault <dir>] [--json <file>]
//
// Notes are what graph/extract.ts listNotes means (every .md file outside hidden folders, except _template.md and the root
// files CLAUDE.md, index.md and log.md). Notes under fleeting/ are ignored on both sides (Owner decision 1: no batch touches
// them, and the capture hook may rewrite or remove them at any time); G-commit separately proves no fleeting path is
// committed. Every other note is "curated".
//
// Body rule (a line multiset over all curated notes): every body line of every base note, normalised, must occur at least
// as often across all current curated notes. Normalisation: skip blank lines; drop CR and trailing whitespace; compare a
// heading line without its "#" run (so a demoted heading still matches); turn every wikilink into plain text by the link
// model's rule C1 ([[x|y]] -> y, [[x]] -> the title of x: `title`, else `name`, else the slug; titles from the base tree,
// falling back to the current tree, then to the link text itself); collapse internal whitespace. A line that moved to
// another note, gained a demoted heading level or had a wikilink converted to plain text therefore still counts.
//
// Allow files (--allow, repeatable): one entry per non-blank line, each covering ONE missing occurrence.
//   old           an exact duplicate the split itself created and removed (S8)
//   old => new    a logged S10 rewrite: accepted only when `new` (normalised the same way) exists in the current tree
// Body lines can contain " => " themselves, so every reading of an entry is tried: each " => " split as old => new first
// (it needs the new line as evidence), then the whole entry as an old line. An entry that matches no missing line is
// reported as unused (a warning, not a failure).
//
// Frontmatter rule: for every curated note in both trees, no top-level frontmatter key of the base is missing, and the
// base `sources:` (path, sha256) pairs are a subset of the current ones. A curated note of the base that is gone from the
// current tree fails as well (no Phase 2 batch deletes or renames a curated note).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { mkdirSync } from "node:fs";
import { ROOT_NON_NOTES, VAULT as THIS_VAULT, oneLine } from "../graph/common.ts";
import { listNotes, splitFrontmatter } from "../graph/extract.ts";

const FLEETING_TOP = "fleeting";
const LIST_CAP = 200;
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

// ---------------------------------------------------------------------------------------------------------------------
// git plumbing (read-only; GIT_OPTIONAL_LOCKS=0 so no command refreshes and rewrites the index)

function git(vault: string, args: string[], input?: Uint8Array | string): Buffer {
  const r = Bun.spawnSync(["git", "-C", vault, ...args], { stdin: input === undefined ? "ignore" : Buffer.from(input), stdout: "pipe", stderr: "pipe", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
  if (r.exitCode !== 0) throw new Error(`git ${args.join(" ")} failed: ${oneLine(r.stderr.toString(), 300)}`);
  return r.stdout as Buffer;
}

/** read many blobs in one `git cat-file --batch` call: oid -> content */
function readBlobs(vault: string, oids: string[]): Map<string, string> {
  const outMap = new Map<string, string>();
  const unique = [...new Set(oids)];
  if (!unique.length) return outMap;
  const buf = git(vault, ["cat-file", "--batch"], unique.join("\n") + "\n");
  let pos = 0;
  for (const oid of unique) {
    const nl = buf.indexOf(10, pos);
    const header = buf.subarray(pos, nl).toString("utf8");
    const [got, type, sizeText] = header.split(" ");
    if (got !== oid || type !== "blob") throw new Error(`git cat-file --batch: unexpected header "${header}" for ${oid}`);
    const size = Number(sizeText);
    outMap.set(oid, buf.subarray(nl + 1, nl + 1 + size).toString("utf8"));
    pos = nl + 1 + size + 1; // content, then one LF
  }
  return outMap;
}

/** a vault-relative path (forward slashes) that listNotes would return as a note */
export function isNotePath(p: string): boolean {
  const parts = p.split("/");
  if (parts.some((s) => s.startsWith("."))) return false;
  const name = parts[parts.length - 1];
  if (!/\.md$/i.test(name) || /^_template\.md$/i.test(name)) return false;
  if (parts.length === 1 && ROOT_NON_NOTES.has(name.toLowerCase())) return false;
  return true;
}
const isFleetingPath = (p: string) => p.split("/")[0] === FLEETING_TOP;

type Note = { path: string; rel: string; slug: string; text: string };
const toNote = (path: string, text: string): Note => {
  const rel = path.replace(/\.md$/i, "");
  return { path, rel, slug: rel.split("/").pop()!, text };
};

/** curated notes of a commit: `git ls-tree -r -z <commit>` + one cat-file batch */
function notesAtCommit(vault: string, commit: string): Note[] {
  const entries = git(vault, ["ls-tree", "-r", "-z", "--full-tree", commit]).toString("utf8").split("\0").filter(Boolean);
  const blobs: { path: string; oid: string }[] = [];
  for (const e of entries) {
    const tab = e.indexOf("\t");
    const [, type, oid] = e.slice(0, tab).split(" ");
    const path = e.slice(tab + 1);
    if (type === "blob" && isNotePath(path) && !isFleetingPath(path)) blobs.push({ path, oid });
  }
  const content = readBlobs(vault, blobs.map((b) => b.oid));
  return blobs.map((b) => toNote(b.path, content.get(b.oid)!)).sort((x, y) => cmp(x.path, y.path));
}

/** curated notes of the index (stage 0): `git ls-files -s -z` + one cat-file batch */
function notesInIndex(vault: string): Note[] {
  const entries = git(vault, ["ls-files", "-s", "-z"]).toString("utf8").split("\0").filter(Boolean);
  const blobs: { path: string; oid: string }[] = [];
  for (const e of entries) {
    const tab = e.indexOf("\t");
    const [, oid, stage] = e.slice(0, tab).split(" ");
    const path = e.slice(tab + 1);
    if (stage === "0" && isNotePath(path) && !isFleetingPath(path)) blobs.push({ path, oid });
  }
  const content = readBlobs(vault, blobs.map((b) => b.oid));
  return blobs.map((b) => toNote(b.path, content.get(b.oid)!)).sort((x, y) => cmp(x.path, y.path));
}

/** curated notes of the working tree (listNotes, fleeting/ skipped) */
function notesInWorkingTree(vault: string): Note[] {
  return listNotes(vault)
    .filter((f) => f.top !== FLEETING_TOP)
    .map((f) => toNote(f.rel + ".md", readFileSync(f.abs, "utf8")));
}

// ---------------------------------------------------------------------------------------------------------------------
// normalisation

const WIKI = /!?\[\[([^\[\]\n]*?)\]\]/g;
/** "folder/name#heading|alias" -> "folder/name" (no extension, forward slashes), as extract.ts */
function wikiPath(inner: string): string {
  let t = inner.replace(/\\\|/g, "|");
  const pipe = t.indexOf("|");
  if (pipe >= 0) t = t.slice(0, pipe);
  const hash = t.indexOf("#");
  if (hash >= 0) t = t.slice(0, hash);
  return t.trim().replace(/\\/g, "/").replace(/\.md$/i, "");
}
const scalar = (v: unknown): string | null => ((typeof v === "string" || typeof v === "number") && String(v).trim() ? String(v).trim() : null);

function parseFm(text: string): { fm: string; body: string; y: Record<string, unknown> | null; error: string | null } {
  const { fm, body, state } = splitFrontmatter(text);
  if (state !== "ok") return { fm, body, y: state === "none" ? {} : null, error: state === "unterminated" ? "frontmatter is never closed" : null };
  try {
    const p: unknown = Bun.YAML.parse(fm);
    if (p == null) return { fm, body, y: {}, error: null };
    if (typeof p === "object" && !Array.isArray(p)) return { fm, body, y: p as Record<string, unknown>, error: null };
    return { fm, body, y: null, error: "frontmatter is not a key/value block" };
  } catch (e) {
    return { fm, body, y: null, error: "malformed YAML: " + oneLine((e as Error)?.message ?? e, 100) };
  }
}

/** title lookup for C1: by vault-relative path, then by file name (first note), in the base tree, then the current tree */
export type Titles = (target: string) => string;
function titleIndex(...trees: Note[][]): Titles {
  const maps = trees.map((notes) => {
    const byRel = new Map<string, string>();
    const bySlug = new Map<string, string>();
    for (const n of notes) {
      const { y } = parseFm(n.text);
      const t = scalar(y?.title) ?? scalar(y?.name) ?? n.slug;
      byRel.set(n.rel, t);
      if (!bySlug.has(n.slug)) bySlug.set(n.slug, t);
    }
    return { byRel, bySlug };
  });
  return (target: string) => {
    for (const m of maps) {
      const t = m.byRel.get(target) ?? m.bySlug.get(target.split("/").pop()!);
      if (t !== undefined) return t;
    }
    return target.split("/").pop() || target;
  };
}

/** one body line -> its normalised form, or null for a blank line */
export function normLine(line: string, titleOf: Titles): string | null {
  let t = line.replace(/\r/g, "").replace(/\s+$/, "");
  if (!t.trim()) return null;
  t = t.replace(/^#{1,6}(?:\s+|$)/, "");
  t = t.replace(WIKI, (_m, inner: string) => {
    const unescaped = inner.replace(/\\\|/g, "|");
    const pipe = unescaped.indexOf("|");
    if (pipe >= 0) return unescaped.slice(pipe + 1);
    return titleOf(wikiPath(inner));
  });
  t = t.replace(/\s+/g, " ").trim();
  return t || null;
}

/** top-level frontmatter keys, read from the raw text (independent of whether the YAML parses) */
const fmKeys = (fm: string) => [...new Set(fm.split("\n").map((l) => l.match(/^([A-Za-z0-9_][A-Za-z0-9_.\-]*)\s*:/)?.[1]).filter((k): k is string => !!k))];
function sourcePairs(y: Record<string, unknown>): string[] {
  const entries: unknown[] = Array.isArray(y.sources) ? y.sources : y.sources == null ? [] : [y.sources];
  const out: string[] = [];
  for (const s of entries) {
    const o = s && typeof s === "object" ? (s as Record<string, unknown>) : null;
    if (o && typeof o.path === "string" && typeof o.sha256 === "string") out.push(o.path + "\u0000" + o.sha256.trim().toLowerCase());
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------

export type ConserveOptions = { vault: string; base: string; allowFiles: string[]; staged: boolean };

export function conserve(opts: ConserveOptions) {
  const { vault } = opts;
  let baseCommit: string;
  try {
    baseCommit = git(vault, ["rev-parse", "--verify", "--quiet", opts.base + "^{commit}"]).toString("utf8").trim();
  } catch {
    throw new Error(`--base ${opts.base} is not a commit of the repository at ${vault}`);
  }
  const baseNotes = notesAtCommit(vault, baseCommit);
  const curNotes = opts.staged ? notesInIndex(vault) : notesInWorkingTree(vault);
  const titleOf = titleIndex(baseNotes, curNotes);

  // ---- body multiset
  const baseCount = new Map<string, number>();
  const baseWhere = new Map<string, Map<string, number>>();
  const curCount = new Map<string, number>();
  let baseLines = 0;
  let curLines = 0;
  for (const n of baseNotes) {
    for (const raw of parseFm(n.text).body.split("\n")) {
      const l = normLine(raw, titleOf);
      if (l === null) continue;
      baseLines++;
      baseCount.set(l, (baseCount.get(l) ?? 0) + 1);
      const w = baseWhere.get(l) ?? new Map<string, number>();
      w.set(n.rel, (w.get(n.rel) ?? 0) + 1);
      baseWhere.set(l, w);
    }
  }
  for (const n of curNotes) {
    for (const raw of parseFm(n.text).body.split("\n")) {
      const l = normLine(raw, titleOf);
      if (l === null) continue;
      curLines++;
      curCount.set(l, (curCount.get(l) ?? 0) + 1);
    }
  }
  const deficit = new Map<string, number>();
  for (const [l, c] of baseCount) {
    const d = c - (curCount.get(l) ?? 0);
    if (d > 0) deficit.set(l, d);
  }

  // ---- allow entries
  type Entry = { file: string; line: number; text: string; status: "rewrite" | "duplicate" | "unused"; old?: string; new?: string; why?: string };
  const entries: Entry[] = [];
  for (const file of opts.allowFiles) {
    if (!existsSync(file)) throw new Error(`allow file ${file} does not exist`);
    readFileSync(file, "utf8")
      .replace(/^﻿/, "")
      .split("\n")
      .forEach((rawLine, i) => {
        const text = rawLine.replace(/\r$/, "").replace(/\s+$/, "");
        if (text.trim()) entries.push({ file, line: i + 1, text, status: "unused" });
      });
  }
  const allowed: { line: string; entry: string; kind: "rewrite" | "duplicate"; new?: string }[] = [];
  for (const e of entries) {
    const take = (l: string) => {
      const d = deficit.get(l) ?? 0;
      if (d <= 0) return false;
      if (d === 1) deficit.delete(l);
      else deficit.set(l, d - 1);
      return true;
    };
    let done = false;
    let why = "matches no missing line";
    for (let at = e.text.indexOf(" => "); at >= 0 && !done; at = e.text.indexOf(" => ", at + 1)) {
      const o = normLine(e.text.slice(0, at), titleOf);
      const nw = normLine(e.text.slice(at + 4), titleOf);
      if (o === null || nw === null) continue;
      if (!(deficit.get(o) ?? 0)) continue;
      if (!(curCount.get(nw) ?? 0)) {
        why = "its new line does not exist in the current tree";
        continue;
      }
      take(o);
      Object.assign(e, { status: "rewrite", old: o, new: nw });
      allowed.push({ line: o, entry: `${e.file}:${e.line}`, kind: "rewrite", new: nw });
      done = true;
    }
    if (!done) {
      const whole = normLine(e.text, titleOf);
      if (whole !== null && take(whole)) {
        Object.assign(e, { status: "duplicate", old: whole });
        allowed.push({ line: whole, entry: `${e.file}:${e.line}`, kind: "duplicate" });
        done = true;
      }
    }
    if (!done) e.why = why;
  }
  const missing = [...deficit.entries()]
    .map(([line, count]) => ({ line, count, baseNotes: [...(baseWhere.get(line) ?? new Map()).entries()].map(([note, c]) => (c > 1 ? `${note} (x${c})` : note)) }))
    .sort((x, y) => cmp(x.baseNotes[0] ?? "", y.baseNotes[0] ?? "") || cmp(x.line, y.line));

  // ---- frontmatter rule and removed notes
  const curByPath = new Map(curNotes.map((n) => [n.path, n]));
  const frontmatter: { note: string; problem: string }[] = [];
  const removed: string[] = [];
  for (const b of baseNotes) {
    const c = curByPath.get(b.path);
    if (!c) {
      removed.push(b.rel);
      continue;
    }
    const pb = parseFm(b.text);
    const pc = parseFm(c.text);
    const curKeys = new Set(fmKeys(pc.fm));
    const lost = fmKeys(pb.fm).filter((k) => !curKeys.has(k));
    if (lost.length) frontmatter.push({ note: b.rel, problem: `frontmatter key(s) removed: ${lost.join(", ")}` });
    if (pb.y === null) {
      frontmatter.push({ note: b.rel, problem: `base frontmatter cannot be read (${pb.error}); its sources pairs cannot be verified` });
      continue;
    }
    if (pc.y === null) {
      frontmatter.push({ note: b.rel, problem: `current frontmatter cannot be read (${pc.error})` });
      continue;
    }
    const curPairs = new Set(sourcePairs(pc.y));
    const lostPairs = sourcePairs(pb.y).filter((p) => !curPairs.has(p));
    if (lostPairs.length) frontmatter.push({ note: b.rel, problem: `${lostPairs.length} sources pair(s) removed: ${lostPairs.slice(0, 3).map((p) => p.split("\u0000")[0]).join(", ")}` });
  }

  const ok = missing.length === 0 && frontmatter.length === 0 && removed.length === 0;
  return {
    tool: ".bedrock/reorg/conserve.ts",
    vault,
    base: { ref: opts.base, commit: baseCommit, notes: baseNotes.length, lines: baseLines, distinctLines: baseCount.size },
    current: { source: opts.staged ? "index" : "working tree", notes: curNotes.length, lines: curLines, distinctLines: curCount.size },
    allowFiles: opts.allowFiles,
    allowEntries: entries.length,
    allowed,
    unusedAllowEntries: entries.filter((e) => e.status === "unused").map((e) => ({ entry: `${e.file}:${e.line}`, text: e.text, why: e.why })),
    missingLines: missing.reduce((a, m) => a + m.count, 0),
    missing,
    frontmatter,
    removedNotes: removed,
    ok,
  };
}

export function render(r: ReturnType<typeof conserve>): string {
  const L: string[] = [];
  L.push(`conserve: base ${r.base.ref} (${r.base.commit.slice(0, 7)}): ${r.base.notes} curated notes, ${r.base.lines} body lines (${r.base.distinctLines} distinct); ${r.current.source}: ${r.current.notes} curated notes, ${r.current.lines} body lines (fleeting/ ignored on both sides)`);
  L.push(`allow entries: ${r.allowEntries} from ${r.allowFiles.length} file(s); accepted ${r.allowed.length} (${r.allowed.filter((a) => a.kind === "rewrite").length} rewrites, ${r.allowed.filter((a) => a.kind === "duplicate").length} duplicates); unused ${r.unusedAllowEntries.length}`);
  for (const a of r.allowed.slice(0, LIST_CAP)) L.push(`  allowed ${a.kind.padEnd(9)} ${a.entry}: ${oneLine(a.line, 140)}${a.new ? `  =>  ${oneLine(a.new, 100)}` : ""}`);
  for (const u of r.unusedAllowEntries.slice(0, LIST_CAP)) L.push(`  unused  ${u.entry} (${u.why}): ${oneLine(u.text, 140)}`);
  L.push(`missing body lines: ${r.missingLines}${r.missing.length ? ` (${r.missing.length} distinct)` : ""}`);
  for (const m of r.missing.slice(0, LIST_CAP)) L.push(`  MISSING${m.count > 1 ? ` x${m.count}` : ""}  [${m.baseNotes.slice(0, 3).join(", ")}${m.baseNotes.length > 3 ? ", ..." : ""}]  ${oneLine(m.line, 160)}`);
  if (r.missing.length > LIST_CAP) L.push(`  ... and ${r.missing.length - LIST_CAP} more`);
  L.push(`frontmatter problems: ${r.frontmatter.length}`);
  for (const f of r.frontmatter) L.push(`  FRONTMATTER ${f.note}: ${f.problem}`);
  L.push(`curated notes removed since the base: ${r.removedNotes.length}`);
  for (const n of r.removedNotes) L.push(`  REMOVED ${n}`);
  L.push(r.ok ? "conserve: OK (no base text lost)" : "conserve: FAIL");
  return L.join("\n");
}

const USAGE = "usage: bun .bedrock/reorg/conserve.ts --base <commit> [--allow <file>]... [--staged] [--vault <dir>] [--json <file>]";

function parseArgs(argv: string[]) {
  const allowFiles: string[] = [];
  let base: string | null = null;
  let vault = THIS_VAULT;
  let json: string | null = null;
  let staged = false;
  let help = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const [name, inline] = a.startsWith("--") && a.includes("=") ? [a.slice(0, a.indexOf("=")), a.slice(a.indexOf("=") + 1)] : [a, undefined];
    const value = () => {
      if (inline !== undefined) return inline;
      if (i + 1 >= argv.length || argv[i + 1].startsWith("--")) throw new Error(`${name} needs a value`);
      return argv[++i];
    };
    if (name === "--base") base = value();
    else if (name === "--allow") allowFiles.push(resolve(value()));
    else if (name === "--vault") vault = resolve(value());
    else if (name === "--json") json = resolve(value());
    else if (name === "--staged") staged = true;
    else if (name === "--help" || name === "-h") help = true;
    else throw new Error(`unknown argument ${a}`);
  }
  if (!help && !base) throw new Error("--base <commit> is required");
  return { opts: { vault, base: base ?? "", allowFiles, staged }, json, help };
}

if (import.meta.main) {
  try {
    const a = parseArgs(process.argv.slice(2));
    if (a.help) console.log(USAGE);
    else {
      const r = conserve(a.opts);
      console.log(render(r));
      if (a.json) {
        mkdirSync(dirname(a.json), { recursive: true });
        writeFileSync(a.json, JSON.stringify(r, null, 2) + "\n");
      }
      process.exitCode = r.ok ? 0 : 1;
    }
  } catch (e) {
    console.error("conserve.ts: " + oneLine((e as Error)?.message ?? e, 400));
    console.error(USAGE);
    process.exitCode = 1;
  }
}
