// Vault health check for the Phase 2 reorganisation ("organize the brain"). READ-ONLY on the vault: it prints a human
// summary and, with --json <file>, writes the same numbers as JSON. The only files it ever writes are the --json target and,
// with --write-sources-baseline, .bedrock/reorg/sources-baseline.json.
//
//   bun .bedrock/reorg/check.ts [--json <file>] [--size-limit <KB>] [--max-out <n>] [--strict] [--require <letters>]
//                               [--pending-splits <file>] [--vault <dir>]
//   bun .bedrock/reorg/check.ts --write-sources-baseline      save every (path, sha256) now in a note's `sources:`
//
//   --size-limit <KB>        a curated note over this size (1 KB = 1024 bytes, default 50) fails check a
//   --max-out <n>            list notes with more than n distinct outgoing link targets (check e, info only; default 3)
//   --strict                 exit 1 when a required check fails, when the tool itself cannot run, or when its numbers
//                            disagree with buildGraph; without it the exit code is always 0, whatever the findings
//   --require <letters>      the strict checks that decide the exit code, e.g. a,b,c,d,f,h,j (default: all of a b c d f g
//                            h i j k); the other checks still run and are printed, marked "not required"
//   --pending-splits <file>  one vault-relative note path per line (".md" optional): notes waiting for their split batch.
//                            Checks a and i report such a note instead of failing on it. A path that is not a curated note
//                            stops the run (a stale list would hide nothing, but it means the gate is misconfigured)
//   --vault <dir>            check another vault root (a copy, an export, a test fixture); default: the vault this file
//                            lives in
//
// Curated and fleeting notes (Owner decisions 1, 10 and 14). A fleeting note is any note under the top folder fleeting/
// (intake "awaiting organization"); every other note is curated. In every run, on every tree, fleeting notes are exempt
// from checks a (size), b (unresolved links), c (a one-way pair with a fleeting note at either end) and d (no incoming
// link), and are listed in their own "awaiting organization" block with their size, outgoing targets, unresolved links and
// incoming count; nothing in that block ever fails a run. Checks g and k consider curated notes only; h and j apply to every
// note. In d an incoming link from a fleeting note does not count: a curated note needs a curated incoming link.
//
// What "link" and "mention" mean is what the graph tooling means (graph/extract.ts buildGraph):
//   notes    listNotes(): every .md note; the system notes index.md and log.md (plus CLAUDE.md, _template.md and hidden
//            folders) are not notes, so they are never a link source, a link target, a counted note or a size-limit case;
//   mention  one wikilink occurrence ([[x]], [[x|alias]], [[x#h]], ![[x]]) in a note's frontmatter (minus `sources:`) or body
//            that resolves to ANOTHER note (a self-mention is not one);
//   link     A->B, "A links B": A has at least one mention of B. The graph page counts UNORDERED pairs {A,B} instead (its
//            "links"); both figures are reported, and its "mentions" is the sum of every mention.
// buildGraph does not expose the directed mention counts, so they are rebuilt here from the same primitives (listNotes,
// splitFrontmatter, dropSources), the same wikilink regex and the same resolution rule, then cross-checked against
// buildGraph (links, mentions, directed pairs, unresolved, self mentions, node order, every link weight). Any difference is
// reported as an internal inconsistency and always counts as a failure under --strict, whatever --require says.
//
// The checks (a b c d f g h i j k are the strict checks; e is info):
//   a  sizes: notes per folder and the size distribution. A curated note over --size-limit fails unless it is pending
//      split; a curated note carrying `size_reason` fails as well (Phase 2 grants none: plan sections 2 and 11.1)
//   b  unresolved wikilinks in curated notes (links to index/log/CLAUDE are reported apart and never count)
//   c  one-way links between curated notes (A links B, B does not link A)
//   d  curated notes with no incoming link from another curated note
//   e  distinct outgoing link targets per note (info only)
//   f  sources invariant (decision 14): a (path, sha256) of the baseline .bedrock/reorg/sources-baseline.json is enforced
//      only if some curated note held it in the baseline; it passes when a current curated note holds it, exactly or by
//      another sha256 of the same path (hashes have no order, so any different one counts as the newer version: the
//      capture hook replaces a changed memory file's hash, it never goes back). A path no curated note lists any more is
//      MISSING. A pair whose baseline holders were all fleeting notes is reported in the fleeting block, never enforced
//   g  domain tags: every curated note carries exactly one domain/* tag, and it is in the vault CLAUDE.md "Domains" list
//   h  index.md equals what `bun .bedrock/recall/hook.ts index` would generate now (compared in memory, nothing written)
//   i  leaf link budget (plan 4.1). Hubs are curated notes in projects/ concepts/ actors/ people/ teams/ with no
//      part_of; leaves are curated notes in topics/ or discussions/ and every curated note with part_of. For a leaf,
//      others = |outgoing targets| - |family links| - min(1, project links left) must be <= 3, where the family links are
//      the link to its part_of parent, the links to its own parts and the links to sibling parts (same part_of), and a
//      second project link counts as an "other". A pending-split leaf over budget is reported, not failed
//   j  split families: every part_of holds exactly one wikilink to an existing curated note P; P has no part_of; P links
//      the part; the part's (path, sha256) source pairs are a subset of P's
//   k  name collisions (port of the baseline alias.ts): the slug (date prefix removed), the title, the name and every
//      alias of each curated note, normalised to [a-z0-9]; keys of 4 or more characters; a key shared by two different
//      curated notes fails
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { ROOT_NON_NOTES, VAULT as THIS_VAULT, argValue, oneLine } from "../graph/common.ts";
import { DIR_TYPE, LEDGER_TOP, buildGraph, dropSources, listNotes, splitFrontmatter, type NoteFile } from "../graph/extract.ts";

const KB = 1024;
const LIST_CAP = 200; // longest list the human summary prints (the JSON always has every row)
export const STRICT_CHECKS = ["a", "b", "c", "d", "f", "g", "h", "i", "j", "k"] as const;
type Letter = (typeof STRICT_CHECKS)[number];
const BASELINE_REL = ".bedrock/reorg/sources-baseline.json";
const FLEETING_TOP = "fleeting";
const HUB_TOPS = new Set(["projects", "concepts", "actors", "people", "teams"]);
const LEAF_TOPS = new Set(["topics", "discussions"]);
const MAX_OTHERS = 3;
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

// ---------------------------------------------------------------------------------------------------------------------
// wikilinks: the same regex and resolution rule as extract.ts (which keeps them private)

const WIKI = /!?\[\[([^\[\]\n]*?)\]\]/g;
/** "folder/name#heading|alias" -> "folder/name" (no extension, forward slashes) */
function wikiPath(inner: string): string {
  let t = inner.replace(/\\\|/g, "|");
  const pipe = t.indexOf("|");
  if (pipe >= 0) t = t.slice(0, pipe);
  const hash = t.indexOf("#");
  if (hash >= 0) t = t.slice(0, hash);
  return t.trim().replace(/\\/g, "/").replace(/\.md$/i, "");
}
/** a frontmatter `tags` value as a list (list or comma/space separated string, leading # dropped) */
function tagList(v: unknown): string[] {
  const arr: unknown[] = Array.isArray(v) ? v : typeof v === "string" ? v.split(/[,\s]+/) : [];
  return arr.map((t) => String(t).trim().replace(/^#/, "")).filter(Boolean);
}
/** key of an unordered pair of note ids (the same order extract.ts uses for the graph's links) */
const ukey = (a: string, b: string) => (a < b ? a + "\u0000" + b : b + "\u0000" + a);
/** a scalar frontmatter value as a trimmed string, else null */
const scalarText = (v: unknown): string | null => ((typeof v === "string" || typeof v === "number") && String(v).trim() ? String(v).trim() : null);

/**
 * The raw text of a top-level frontmatter key (the rest of its line plus its indented or "- " continuation lines), or null
 * when the key is absent. part_of is read this way, as raw text, so its wikilinks are exactly the ones the graph sees.
 */
function rawKeyBlock(fm: string, key: string): string | null {
  const lines = fm.split("\n");
  const head = new RegExp("^" + key + "\\s*:");
  const i = lines.findIndex((l) => head.test(l));
  if (i < 0) return null;
  const out = [lines[i].replace(head, "")];
  for (let j = i + 1; j < lines.length && (/^\s/.test(lines[j]) || /^-(\s|$)/.test(lines[j])); j++) out.push(lines[j]);
  return out.join("\n");
}
/** a raw key block that holds a value (not empty, "", '', [], null or ~) */
const hasValue = (block: string | null) => block !== null && block.replace(/null|~|["'\[\]\s]/g, "") !== "";

// ---------------------------------------------------------------------------------------------------------------------
// reading the vault

type Pair = { path: string; sha256: string };
type NoteInfo = {
  file: NoteFile;
  /** the graph node id: file name, or the vault-relative path when several notes share a file name */
  id: string;
  type: string;
  bytes: number;
  /** a note under the top folder fleeting/ (Owner decision 1); every other note is curated */
  fleeting: boolean;
  /** null when the frontmatter parsed (or there is none); otherwise why it did not */
  yamlError: string | null;
  domainTags: string[];
  sizeReason: string | null;
  sources: Pair[];
  /** `sources:` entries that are not a {path, sha256} pair (a URL-only source, a malformed entry) */
  otherSources: number;
  /** frontmatter (minus sources) + body: what the graph scans for wikilinks */
  linkText: string;
  /** title and name values (k) */
  names: string[];
  aliases: string[];
  /** part_of: whether the key holds a value, and the inner text of every wikilink in it */
  partOf: { present: boolean; links: string[] };
};

const gitOut = (vault: string, ...args: string[]): string | null => {
  try {
    const r = Bun.spawnSync(["git", "-C", vault, ...args], { stdout: "pipe", stderr: "pipe", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
    return r.exitCode === 0 ? r.stdout.toString().replace(/\s+$/, "") : null;
  } catch {
    return null;
  }
};
/** .md files that differ from HEAD (modified, staged or untracked): who else is writing into the vault (null when git is unavailable) */
function uncommittedMd(vault: string): string[] | null {
  const s = gitOut(vault, "status", "--porcelain", "--untracked-files=all");
  if (s === null) return null;
  return s
    .split("\n")
    .map((l) => l.slice(3).replace(/^"|"$/g, ""))
    .filter((p) => /\.md$/i.test(p))
    .sort(cmp);
}

function loadNotes(vault: string, nodeTypes: string[]): NoteInfo[] {
  const files = listNotes(vault);
  const slugCount = new Map<string, number>();
  for (const f of files) slugCount.set(f.slug, (slugCount.get(f.slug) ?? 0) + 1);
  return files.map((f, i) => {
    const raw = readFileSync(f.abs, "utf8");
    const bytes = statSync(f.abs).size;
    const { fm, body, state } = splitFrontmatter(raw);
    let y: Record<string, unknown> = {};
    let yamlError: string | null = state === "unterminated" ? "frontmatter is never closed with ---" : null;
    if (state === "ok") {
      try {
        const p: unknown = Bun.YAML.parse(fm);
        if (p && typeof p === "object" && !Array.isArray(p)) y = p as Record<string, unknown>;
        else if (p != null) yamlError = "frontmatter is not a key/value block";
      } catch (e) {
        yamlError = "malformed YAML: " + oneLine((e as Error)?.message ?? e, 100);
      }
    }
    const tags = tagList(y.tags);
    const sources: Pair[] = [];
    let otherSources = 0;
    const entries: unknown[] = Array.isArray(y.sources) ? y.sources : y.sources == null ? [] : [y.sources];
    for (const s of entries) {
      const o = s && typeof s === "object" ? (s as Record<string, unknown>) : null;
      if (o && typeof o.path === "string" && o.path.trim() && typeof o.sha256 === "string" && o.sha256.trim()) sources.push({ path: o.path, sha256: o.sha256.trim().toLowerCase() });
      else otherSources++;
    }
    const sr = y.size_reason;
    const names = [...new Set([scalarText(y.title), scalarText(y.name)].filter((x): x is string => x !== null))];
    const aliasesRaw: unknown[] = Array.isArray(y.aliases) ? y.aliases : y.aliases == null ? [] : [y.aliases];
    const aliases = aliasesRaw.map(scalarText).filter((x): x is string => x !== null);
    const partBlock = state === "ok" ? rawKeyBlock(dropSources(fm), "part_of") : null;
    return {
      file: f,
      id: (slugCount.get(f.slug) ?? 0) > 1 ? f.rel : f.slug,
      type: nodeTypes[i] ?? "other",
      bytes,
      fleeting: f.top === FLEETING_TOP,
      yamlError,
      domainTags: [...new Set(tags.filter((t) => t.startsWith("domain/")))],
      sizeReason: typeof sr === "string" && sr.trim() ? sr.trim() : sr != null && typeof sr !== "string" ? String(sr) : null,
      sources,
      otherSources,
      linkText: dropSources(fm) + "\n" + body,
      names,
      aliases,
      partOf: { present: hasValue(partBlock), links: partBlock === null ? [] : [...partBlock.matchAll(WIKI)].map((m) => m[1]) },
    };
  });
}

/** The domain/* tags the vault CLAUDE.md allows: the `domain/<name>` bullets under its "## Domains" heading. */
function allowedDomains(vault: string): { list: string[]; error: string | null } {
  let text: string;
  try {
    text = readFileSync(join(vault, "CLAUDE.md"), "utf8").replace(/\r\n/g, "\n");
  } catch (e) {
    return { list: [], error: "cannot read CLAUDE.md: " + oneLine((e as Error)?.message ?? e, 100) };
  }
  const lines = text.split("\n");
  const start = lines.findIndex((l) => /^##\s+Domains\s*$/.test(l));
  if (start < 0) return { list: [], error: 'CLAUDE.md has no "## Domains" section' };
  const list: string[] = [];
  for (let i = start + 1; i < lines.length && !/^##\s/.test(lines[i]); i++) {
    if (!/^\s*[-*]\s/.test(lines[i])) continue;
    for (const m of lines[i].matchAll(/`(domain\/[a-z0-9][a-z0-9-]*)`/g)) if (!list.includes(m[1])) list.push(m[1]);
  }
  return { list, error: list.length ? null : 'the "## Domains" section of CLAUDE.md lists no domain/<name> tags' };
}

type Baseline = { pairs: (Pair & { notes: string[] })[] | null; generatedAt: string | null; vaultHead: string | null; error: string | null };
function readBaseline(file: string): Baseline {
  const none = { pairs: null, generatedAt: null, vaultHead: null };
  if (!existsSync(file)) return { ...none, error: `${BASELINE_REL} does not exist (run --write-sources-baseline)` };
  try {
    const j = JSON.parse(readFileSync(file, "utf8"));
    if (!j || !Array.isArray(j.pairs)) throw new Error("no pairs array");
    const pairs = j.pairs.map((p: any) => {
      if (!p || typeof p.path !== "string" || typeof p.sha256 !== "string") throw new Error("a pair has no path/sha256");
      return { path: p.path, sha256: String(p.sha256).toLowerCase(), notes: Array.isArray(p.notes) ? p.notes.map(String) : [] };
    });
    return { pairs, generatedAt: typeof j.generated_at === "string" ? j.generated_at : null, vaultHead: typeof j.vault_head === "string" ? j.vault_head : null, error: null };
  } catch (e) {
    return { ...none, error: `${BASELINE_REL} is unusable: ${oneLine((e as Error)?.message ?? e, 100)}` };
  }
}

/** The --pending-splits file: vault-relative note paths, one per line, ".md" optional, blank lines ignored. */
export function readPendingFile(file: string): string[] {
  const text = readFileSync(file, "utf8").replace(/^﻿/, "");
  return text
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/\\/g, "/").replace(/^\.\//, "").replace(/\.md$/i, ""))
    .filter(Boolean);
}

/** h: compare index.md with catalogText(buildIndexData(...)), exactly as recall/indexer.ts rebuildIndex decides "unchanged". */
async function checkIndex(vault: string) {
  type Index = {
    state: "current" | "stale" | "missing" | "not-generated" | "error";
    summary: string;
    generatedNotes: number | null;
    fileNotes: number | null;
    onlyInFile: string[];
    onlyInGenerated: string[];
    firstDifferingLine: number | null;
  };
  const base: Index = { state: "error", summary: "", generatedNotes: null, fileNotes: null, onlyInFile: [], onlyInGenerated: [], firstDifferingLine: null };
  try {
    let current: string;
    try {
      const text = readFileSync(join(vault, "index.md"), "utf8");
      current = (text.charCodeAt(0) === 0xfeff ? text.slice(1) : text).replace(/\r\n/g, "\n"); // as rebuildIndex reads it: no BOM, LF
    } catch {
      return { ...base, state: "missing" as const, summary: "index.md does not exist" };
    }
    // loaded here, not at the top: a broken recall module must not take the other checks down with it
    const { buildIndexData, catalogText } = await import("../recall/indexer.ts");
    const { statNotes } = await import("../recall/lib.ts");
    const want = catalogText(buildIndexData(statNotes(vault)));
    const count = (t: string) => Number(t.match(/^(\d+) notes\.$/m)?.[1] ?? NaN);
    const res: Index = { ...base, generatedNotes: count(want), fileNotes: count(current) };
    if (current === want) return { ...res, state: "current" as const, summary: `index.md is current (${res.generatedNotes} notes, byte-identical to the generated catalog)` };
    const a = current.split("\n");
    const b = want.split("\n");
    const bag = (lines: string[]) => lines.reduce((m, l) => m.set(l, (m.get(l) ?? 0) + 1), new Map<string, number>());
    const only = (x: string[], y: string[]) => {
      const m = bag(y);
      return x.filter((l) => {
        const c = m.get(l) ?? 0;
        if (c > 0) m.set(l, c - 1);
        return c === 0;
      });
    };
    res.onlyInFile = only(a, b).map((l) => oneLine(l, 160));
    res.onlyInGenerated = only(b, a).map((l) => oneLine(l, 160));
    const firstDiff = a.findIndex((l, i) => l !== b[i]);
    res.firstDifferingLine = (firstDiff < 0 ? Math.min(a.length, b.length) : firstDiff) + 1;
    // the generated catalog starts with the indexer's CATALOG_HEAD, which ends where its first comma is
    const generated = current.startsWith(want.slice(0, want.indexOf(",")));
    return {
      ...res,
      state: generated ? ("stale" as const) : ("not-generated" as const),
      summary: generated
        ? `index.md is stale: it says ${res.fileNotes} notes, the generator would say ${res.generatedNotes}; ${res.onlyInFile.length} line(s) only in index.md, ${res.onlyInGenerated.length} only in the generated catalog`
        : "index.md was not written by the indexer (no generated header); the indexer would leave it untouched",
    };
  } catch (e) {
    return { ...base, summary: "could not generate the catalog: " + oneLine((e as Error)?.message ?? e, 160) };
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// the report

export type Options = { vault: string; sizeLimitKB: number; maxOut: number; writeBaseline: boolean; pendingFile?: string | null; require?: Letter[] | null };
export type Report = Awaited<ReturnType<typeof analyze>>;

const quantile = (sorted: number[], p: number) => (sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] : 0);
const pairKey = (p: Pair) => p.path + "\u0000" + p.sha256;
/** the folder a note sits in, as printed ("(root)" for a note in the vault root) */
const folderOf = (n: NoteInfo) => n.file.dir || "(root)";
const isFleetingRel = (rel: string) => rel.replace(/\\/g, "/").split("/")[0] === FLEETING_TOP;
const sum = (xs: Iterable<number>) => {
  let t = 0;
  for (const x of xs) t += x;
  return t;
};
/** k: the normalised form of a name (lower case, ".md" dropped, only [a-z0-9] kept) */
export const nameKey = (s: string) => s.toLowerCase().replace(/\.md$/, "").replace(/[^a-z0-9]+/g, "");

export async function analyze(opts: Options) {
  const { vault } = opts;
  if (!existsSync(vault)) throw new Error(`vault ${vault} does not exist`);
  const graph = buildGraph(vault);
  const notes = loadNotes(vault, graph.nodes.map((n) => n.type));
  const curated = notes.filter((n) => !n.fleeting);
  const fleetingNotes = notes.filter((n) => n.fleeting);

  // ---- the pending-split list
  let pendingRels: string[] = [];
  if (opts.pendingFile) {
    pendingRels = readPendingFile(opts.pendingFile);
    const curatedRels = new Set(curated.map((n) => n.file.rel));
    const unknown = pendingRels.filter((r) => !curatedRels.has(r));
    if (unknown.length) throw new Error(`--pending-splits lists ${unknown.length} path(s) that are not curated notes of ${vault}: ${unknown.slice(0, 5).join(", ")}${unknown.length > 5 ? ", ..." : ""}`);
    const dupes = pendingRels.filter((r, i) => pendingRels.indexOf(r) !== i);
    if (dupes.length) throw new Error(`--pending-splits lists a path twice: ${dupes[0]}`);
  }
  const pending = new Set(pendingRels);

  // ---- the directed mention table, with buildGraph's resolution: exact vault-relative path first, then the first note with that file name
  const idByRel = new Map(notes.map((n) => [n.file.rel, n.id]));
  const idBySlug = new Map<string, string>();
  for (const n of notes) if (!idBySlug.has(n.file.slug)) idBySlug.set(n.file.slug, n.id);
  const noteById = new Map(notes.map((n) => [n.id, n]));
  const slugByLower = new Map<string, string>();
  for (const n of notes) if (!slugByLower.has(n.file.slug.toLowerCase())) slugByLower.set(n.file.slug.toLowerCase(), n.file.slug);
  const rootNonNoteSlugs = new Set([...ROOT_NON_NOTES].map((f) => f.replace(/\.md$/i, "")));
  const resolveInner = (inner: string): string | null => {
    const p = wikiPath(inner);
    return idByRel.get(p) ?? idBySlug.get(p.split("/").pop()!) ?? null;
  };

  const out = new Map<string, Map<string, number>>(notes.map((n) => [n.id, new Map()]));
  const inc = new Map<string, Map<string, number>>(notes.map((n) => [n.id, new Map()]));
  type Unresolved = { from: string; target: string; count: number; hint: string | null };
  const unresolvedMap = new Map<string, Unresolved>();
  const rootLinkMap = new Map<string, { from: string; target: string; count: number }>();
  let occurrences = 0;
  let selfMentions = 0;
  let unresolvedMentions = 0;
  let ledgerMentions = 0;
  let rootMentions = 0;
  for (const n of notes) {
    WIKI.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = WIKI.exec(n.linkText))) {
      occurrences++;
      const p = wikiPath(m[1]);
      const target = idByRel.get(p) ?? idBySlug.get(p.split("/").pop()!) ?? null;
      if (target === null) {
        if (p.split("/")[0].toLowerCase() === LEDGER_TOP) {
          ledgerMentions++; // a link into the generated ledger/: outside the note set, so not a dangling link (the graph still counts it unresolved)
          continue;
        }
        const last = p.split("/").pop()!;
        const key = n.file.rel + "\u0000" + m[1].trim();
        if (rootNonNoteSlugs.has(last.toLowerCase())) {
          // a link to index / log / CLAUDE: the graph drops it (counts it as unresolved), but it does not dangle
          rootMentions++;
          const r = rootLinkMap.get(key) ?? { from: n.file.rel, target: m[1].trim(), count: 0 };
          r.count++;
          rootLinkMap.set(key, r);
        } else {
          unresolvedMentions++;
          const known = slugByLower.get(last.toLowerCase());
          const u = unresolvedMap.get(key) ?? { from: n.file.rel, target: m[1].trim(), count: 0, hint: known ? `only the case differs from ${known}` : null };
          u.count++;
          unresolvedMap.set(key, u);
        }
        continue;
      }
      if (target === n.id) {
        selfMentions++;
        continue;
      }
      out.get(n.id)!.set(target, (out.get(n.id)!.get(target) ?? 0) + 1);
      inc.get(target)!.set(n.id, (inc.get(target)!.get(n.id) ?? 0) + 1);
    }
  }
  const relOf = (id: string) => noteById.get(id)!.file.rel;
  const isFleetingId = (id: string) => noteById.get(id)!.fleeting;
  let directedLinks = 0;
  let mentions = 0;
  const undirected = new Map<string, number>();
  for (const [a, m] of out)
    for (const [b, c] of m) {
      directedLinks++;
      mentions += c;
      undirected.set(ukey(a, b), (undirected.get(ukey(a, b)) ?? 0) + c);
    }

  // ---- cross-check against buildGraph: the two must mean the same thing by "link" and "mention"
  const problems: string[] = [];
  const expect = (what: string, mine: number, theirs: number) => {
    if (mine !== theirs) problems.push(`${what}: check.ts ${mine}, buildGraph ${theirs}`);
  };
  expect("notes", notes.length, graph.nodes.length);
  expect("undirected links", undirected.size, graph.links.length);
  expect("mentions", mentions, sum(graph.links.map((l) => l.weight)));
  expect("directed links", directedLinks, graph.stats.directedPairs);
  expect("wikilink occurrences", occurrences, graph.stats.occurrences);
  expect("unresolved occurrences (links to index/log/CLAUDE included)", unresolvedMentions + rootMentions + ledgerMentions, graph.stats.unresolved);
  expect("self mentions", selfMentions, graph.stats.selfLinks);
  if (notes.some((n, i) => n.id !== graph.nodes[i]?.id)) problems.push("note order or ids differ from buildGraph");
  for (const l of graph.links) if ((undirected.get(ukey(l.source, l.target)) ?? -1) !== l.weight) problems.push(`link weight differs for ${l.source} - ${l.target}`);

  const outLinks = (n: NoteInfo) => out.get(n.id)!.size;
  const outMentions = (n: NoteInfo) => sum(out.get(n.id)!.values());
  const incLinks = (n: NoteInfo) => inc.get(n.id)!.size;
  const incMentions = (n: NoteInfo) => sum(inc.get(n.id)!.values());
  /** incoming links from curated notes only (d) */
  const incCurated = (n: NoteInfo) => [...inc.get(n.id)!.keys()].filter((s) => !isFleetingId(s));

  // ---- a: sizes
  const limitBytes = Math.round(opts.sizeLimitKB * KB);
  const sizesSorted = notes.map((n) => n.bytes).sort((x, y) => x - y);
  const BUCKETS: [string, number, number][] = [["<5 KB", 0, 5], ["5-10 KB", 5, 10], ["10-20 KB", 10, 20], ["20-30 KB", 20, 30], ["30-50 KB", 30, 50], ["50-100 KB", 50, 100], [">=100 KB", 100, Infinity]];
  const perDir = new Map<string, NoteInfo[]>();
  for (const n of notes) perDir.set(n.file.dir, [...(perDir.get(n.file.dir) ?? []), n]);
  const known = Object.keys(DIR_TYPE);
  for (const d of known) if (!perDir.has(d) && existsSync(join(vault, d))) perDir.set(d, []); // an entity folder with no notes still gets its row
  const dirRank = (d: string) => (d === "" ? 100 : known.includes(d.split("/")[0]) ? known.indexOf(d.split("/")[0]) : 50);
  const dirs = [...perDir.keys()].sort((x, y) => dirRank(x) - dirRank(y) || cmp(x, y));
  const overLimit = curated.filter((n) => n.bytes > limitBytes).sort((x, y) => y.bytes - x.bytes || cmp(x.file.rel, y.file.rel));
  const failingSize = overLimit.filter((n) => !pending.has(n.file.rel));
  const withSizeReason = curated.filter((n) => n.sizeReason).sort((x, y) => cmp(x.file.rel, y.file.rel));
  const sizes = {
    limitKB: opts.sizeLimitKB,
    limitBytes,
    perFolder: dirs.map((d) => {
      const g = perDir.get(d)!;
      const s = g.map((n) => n.bytes).sort((x, y) => x - y);
      return {
        folder: d || "(root)",
        notes: g.length,
        bytes: sum(s),
        median: quantile(s, 0.5),
        max: s[s.length - 1] ?? 0,
        overLimit: g.filter((n) => n.bytes > limitBytes).length,
        exempt: g.length > 0 && g.every((n) => n.fleeting),
      };
    }),
    distribution: {
      totalBytes: sum(sizesSorted),
      min: sizesSorted[0] ?? 0,
      p25: quantile(sizesSorted, 0.25),
      median: quantile(sizesSorted, 0.5),
      p75: quantile(sizesSorted, 0.75),
      p90: quantile(sizesSorted, 0.9),
      max: sizesSorted[sizesSorted.length - 1] ?? 0,
      buckets: BUCKETS.map(([label, lo, hi]) => ({ label, notes: sizesSorted.filter((b) => b >= lo * KB && b < hi * KB).length })),
    },
    /** curated notes over the limit (pending-split ones included, marked) */
    overLimit: overLimit.map((n) => ({ note: n.file.rel, folder: folderOf(n), bytes: n.bytes, pendingSplit: pending.has(n.file.rel), sizeReason: n.sizeReason })),
    /** curated notes over the limit that fail a (not pending split; size_reason does not exempt) */
    failing: failingSize.map((n) => ({ note: n.file.rel, folder: folderOf(n), bytes: n.bytes })),
    pendingSplit: overLimit.filter((n) => pending.has(n.file.rel)).map((n) => ({ note: n.file.rel, bytes: n.bytes })),
    /** curated notes carrying size_reason (a fails on any: Phase 2 grants none) */
    withSizeReason: withSizeReason.map((n) => ({ note: n.file.rel, bytes: n.bytes, sizeReason: n.sizeReason })),
    fleetingExempt: fleetingNotes.filter((n) => n.bytes > limitBytes).map((n) => ({ note: n.file.rel, bytes: n.bytes })),
  };

  // ---- b: unresolved wikilinks (curated notes; fleeting ones go to the fleeting block)
  const byFromTarget = (x: { from: string; target: string }, y: { from: string; target: string }) => cmp(x.from, y.from) || cmp(x.target, y.target);
  const allUnresolved = [...unresolvedMap.values()].sort(byFromTarget);
  const curatedUnresolved = allUnresolved.filter((u) => !isFleetingRel(u.from));
  const unresolved = {
    occurrences: sum(curatedUnresolved.map((u) => u.count)),
    distinct: curatedUnresolved.length,
    items: curatedUnresolved,
    fleetingExempt: { occurrences: sum(allUnresolved.filter((u) => isFleetingRel(u.from)).map((u) => u.count)), distinct: allUnresolved.length - curatedUnresolved.length },
    rootNonNoteLinks: { occurrences: rootMentions, items: [...rootLinkMap.values()].sort(byFromTarget) },
  };

  // ---- c: one-way links (pairs with a fleeting note at either end are exempt and listed in the fleeting block)
  const oneWayAll: { from: string; to: string; mentions: number; fleetingEnd: boolean }[] = [];
  for (const [a, m] of out) for (const [b, c] of m) if (!out.get(b)!.has(a)) oneWayAll.push({ from: relOf(a), to: relOf(b), mentions: c, fleetingEnd: isFleetingId(a) || isFleetingId(b) });
  oneWayAll.sort((x, y) => cmp(x.from, y.from) || cmp(x.to, y.to));
  const oneWayItems = oneWayAll.filter((i) => !i.fleetingEnd).map(({ from, to, mentions }) => ({ from, to, mentions }));
  const oneWay = {
    links: oneWayItems.length,
    mentions: sum(oneWayItems.map((i) => i.mentions)),
    directedLinks,
    reciprocatedDirectedLinks: directedLinks - oneWayAll.length,
    mutualPairs: (directedLinks - oneWayAll.length) / 2,
    undirectedLinks: undirected.size,
    fleetingExempt: oneWayAll.length - oneWayItems.length,
    items: oneWayItems,
  };

  // ---- d: curated notes with no incoming link from another curated note (system notes are not notes here)
  const zeroIn = curated.filter((n) => incCurated(n).length === 0);
  const incSorted = curated.map((n) => incCurated(n).length).sort((x, y) => x - y);
  const zeroIncoming = {
    notes: zeroIn.length,
    exactlyOneIncoming: curated.filter((n) => incCurated(n).length === 1).length,
    incomingLinks: { min: incSorted[0] ?? 0, median: quantile(incSorted, 0.5), max: incSorted[incSorted.length - 1] ?? 0 },
    items: zeroIn.map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type, incomingLinks: 0, incomingFromFleeting: incLinks(n), incomingMentions: incMentions(n), outgoingLinks: outLinks(n) })),
  };

  // ---- e: distinct outgoing link targets per note
  const outSorted = notes.map(outLinks).sort((x, y) => x - y);
  const outMentionsSorted = notes.map(outMentions).sort((x, y) => x - y);
  const histogram: Record<string, number> = {};
  for (const v of outSorted) histogram[v] = (histogram[v] ?? 0) + 1;
  const many = notes.filter((n) => outLinks(n) > opts.maxOut).sort((x, y) => outLinks(y) - outLinks(x) || outMentions(y) - outMentions(x) || cmp(x.file.rel, y.file.rel));
  const outgoing = {
    maxOut: opts.maxOut,
    histogram, // distinct targets -> number of notes
    links: { min: outSorted[0] ?? 0, median: quantile(outSorted, 0.5), p90: quantile(outSorted, 0.9), max: outSorted[outSorted.length - 1] ?? 0, total: directedLinks },
    mentions: { min: outMentionsSorted[0] ?? 0, median: quantile(outMentionsSorted, 0.5), p90: quantile(outMentionsSorted, 0.9), max: outMentionsSorted[outMentionsSorted.length - 1] ?? 0, total: mentions },
    overMax: many.length,
    perFolder: dirs.map((d) => ({ folder: d || "(root)", notes: perDir.get(d)!.length, overMax: perDir.get(d)!.filter((n) => outLinks(n) > opts.maxOut).length })),
    items: many.map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type, links: outLinks(n), mentions: outMentions(n) })),
  };

  // ---- f: the sources invariant (decision 14)
  const currentAll = new Map<string, { pair: Pair; notes: string[] }>();
  const currentCurated = new Map<string, { pair: Pair; notes: string[] }>();
  const shasByPath = new Map<string, Set<string>>();
  const shasByPathCurated = new Map<string, Set<string>>();
  let entries = 0;
  let otherSources = 0;
  let notesWithSources = 0;
  for (const n of notes) {
    if (n.sources.length) notesWithSources++;
    otherSources += n.otherSources;
    for (const p of n.sources) {
      entries++;
      for (const [map, byPath, take] of [
        [currentAll, shasByPath, true],
        [currentCurated, shasByPathCurated, !n.fleeting],
      ] as const) {
        if (!take) continue;
        const c = map.get(pairKey(p)) ?? { pair: p, notes: [] };
        if (!c.notes.includes(n.file.rel)) c.notes.push(n.file.rel);
        map.set(pairKey(p), c);
        byPath.set(p.path, (byPath.get(p.path) ?? new Set()).add(p.sha256));
      }
    }
  }
  const currentPairs = [...currentAll.values()].sort((x, y) => cmp(x.pair.path, y.pair.path) || cmp(x.pair.sha256, y.pair.sha256));
  const baselineFile = join(vault, ...BASELINE_REL.split("/"));
  const head = gitOut(vault, "rev-parse", "--short", "HEAD");
  let written: { pairs: number; replaced: { pairs: number; notHeldNow: number } | null } | null = null;
  if (opts.writeBaseline) {
    const old = readBaseline(baselineFile);
    const lines = currentPairs.map((c) => "    " + JSON.stringify({ path: c.pair.path, sha256: c.pair.sha256, notes: [...c.notes].sort(cmp) }));
    const text =
      "{\n" +
      `  "schema": 1,\n` +
      `  "what": "Every (path, sha256) pair listed in a note's frontmatter sources: when the Phase 2 reorganisation started (notes = who held the pair then). .bedrock/reorg/check.ts, check f, fails when one of them is no longer held by any note, unless a note holds a newer sha256 for the same path.",\n` +
      `  "generated_at": ${JSON.stringify(new Date().toISOString())},\n` +
      `  "vault_head": ${JSON.stringify(head)},\n` +
      `  "vault_uncommitted_md": ${JSON.stringify(uncommittedMd(vault))},\n` +
      `  "counts": ${JSON.stringify({ notes: notes.length, notes_with_sources: notesWithSources, source_entries: entries, pairs: currentPairs.length, paths: shasByPath.size })},\n` +
      `  "pairs": [\n${lines.join(",\n")}\n  ]\n}\n`;
    mkdirSync(dirname(baselineFile), { recursive: true });
    writeFileSync(baselineFile, text);
    written = { pairs: currentPairs.length, replaced: old.pairs ? { pairs: old.pairs.length, notHeldNow: old.pairs.filter((p) => !currentAll.has(pairKey(p)) && !shasByPath.has(p.path)).length } : null };
  }
  const baseline = readBaseline(baselineFile);
  let covered = 0;
  const superseded: { path: string; sha256: string; newer: string[] }[] = [];
  const missing: { path: string; sha256: string; heldBy: string[] }[] = [];
  const fleetingOnly: { path: string; sha256: string; baselineHolders: string[]; now: string }[] = [];
  let enforced = 0;
  for (const p of baseline.pairs ?? []) {
    // a pair with no recorded holder is enforced (fail closed); one held only by fleeting notes is reported
    if (p.notes.length && p.notes.every(isFleetingRel)) {
      const exact = currentAll.get(pairKey(p))?.notes ?? [];
      const newer = [...(shasByPath.get(p.path) ?? [])].filter((s) => s !== p.sha256);
      fleetingOnly.push({ path: p.path, sha256: p.sha256, baselineHolders: p.notes, now: exact.length ? `held by ${exact.join(", ")}` : newer.length ? "a newer sha256 is held" : "held by no note" });
      continue;
    }
    enforced++;
    if (currentCurated.has(pairKey(p))) covered++;
    else {
      const newer = [...(shasByPathCurated.get(p.path) ?? [])].filter((s) => s !== p.sha256).sort(cmp);
      if (newer.length) superseded.push({ path: p.path, sha256: p.sha256, newer });
      else missing.push({ path: p.path, sha256: p.sha256, heldBy: p.notes });
    }
  }
  const baselineKeys = new Set((baseline.pairs ?? []).map(pairKey));
  const sources = {
    baselineFile: BASELINE_REL,
    baseline: baseline.error ? { error: baseline.error } : { generatedAt: baseline.generatedAt, vaultHead: baseline.vaultHead, pairs: baseline.pairs!.length },
    written,
    now: { notes: notes.length, notesWithSources, entries, pairs: currentPairs.length, paths: shasByPath.size, otherSourceEntries: otherSources, curatedPairs: currentCurated.size },
    enforced,
    coveredExactly: covered,
    coveredByNewerSha: superseded.length,
    missing: missing.length,
    fleetingOnly: fleetingOnly.length,
    notInBaseline: currentPairs.filter((c) => !baselineKeys.has(pairKey(c.pair))).length,
    supersededItems: superseded,
    missingItems: missing,
    fleetingOnlyItems: fleetingOnly,
  };

  // ---- g: domain tags (curated notes)
  const allowed = allowedDomains(vault);
  const allowedSet = new Set(allowed.list);
  const tagUse: Record<string, number> = {};
  for (const n of curated) for (const t of n.domainTags) tagUse[t] = (tagUse[t] ?? 0) + 1;
  const domains = {
    allowed: allowed.list,
    allowedListError: allowed.error,
    inUse: Object.fromEntries(Object.entries(tagUse).sort((x, y) => y[1] - x[1] || cmp(x[0], y[0]))),
    allowedUnused: allowed.list.filter((t) => !tagUse[t]),
    exactlyOne: curated.filter((n) => n.domainTags.length === 1 && allowedSet.has(n.domainTags[0])).length,
    noDomain: curated.filter((n) => !n.domainTags.length).map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type })),
    several: curated.filter((n) => n.domainTags.length > 1).map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type, tags: n.domainTags })),
    notAllowed: curated.filter((n) => n.domainTags.some((t) => !allowedSet.has(t))).map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type, tags: n.domainTags.filter((t) => !allowedSet.has(t)) })),
    fleetingSkipped: fleetingNotes.length,
  };

  // ---- h: index.md against the indexer's own generator (nothing is written)
  const index = await checkIndex(vault);

  // ---- j: split families (every note with part_of)
  const parentOf = new Map<string, string>(); // part id -> parent id, for well-formed part_of only
  const familyProblems: { part: string; problem: string }[] = [];
  const partsAll = notes.filter((n) => n.partOf.present);
  for (const p of partsAll) {
    const bad = (problem: string) => familyProblems.push({ part: p.file.rel, problem });
    if (p.partOf.links.length !== 1) {
      bad(`part_of holds ${p.partOf.links.length} wikilinks (exactly one is required)`);
      continue;
    }
    const target = resolveInner(p.partOf.links[0]);
    if (target === null) {
      bad(`part_of [[${p.partOf.links[0].trim()}]] does not resolve to a note`);
      continue;
    }
    if (target === p.id) {
      bad("part_of points at the part itself");
      continue;
    }
    parentOf.set(p.id, target);
    const P = noteById.get(target)!;
    if (P.fleeting) bad(`part_of points at a fleeting note (${P.file.rel})`);
    if (P.partOf.present) bad(`its parent ${P.file.rel} has part_of itself`);
    if (!out.get(P.id)!.has(p.id)) bad(`its parent ${P.file.rel} does not link it`);
    const parentPairs = new Set(P.sources.map(pairKey));
    const extra = p.sources.filter((s) => !parentPairs.has(pairKey(s)));
    if (extra.length) bad(`${extra.length} source pair(s) its parent ${P.file.rel} does not hold: ${extra.slice(0, 3).map((s) => s.path).join(", ")}`);
  }
  const childrenOf = new Map<string, string[]>();
  for (const [c, par] of parentOf) childrenOf.set(par, [...(childrenOf.get(par) ?? []), c]);
  const families = {
    parts: partsAll.length,
    families: childrenOf.size,
    problems: familyProblems.length,
    items: [...childrenOf.entries()].map(([par, kids]) => ({ parent: relOf(par), parts: kids.map(relOf).sort(cmp) })).sort((x, y) => cmp(x.parent, y.parent)),
    problemItems: familyProblems.sort((x, y) => cmp(x.part, y.part) || cmp(x.problem, y.problem)),
  };

  // ---- i: leaf link budget (plan 4.1)
  const roleOf = (n: NoteInfo): "hub" | "leaf" | "other" | "fleeting" => (n.fleeting ? "fleeting" : n.partOf.present || LEAF_TOPS.has(n.file.top) ? "leaf" : HUB_TOPS.has(n.file.top) ? "hub" : "other");
  const budgetItems = curated
    .filter((n) => roleOf(n) === "leaf")
    .map((n) => {
      const targets = [...out.get(n.id)!.keys()];
      const parent = parentOf.get(n.id) ?? null;
      const family = new Set<string>();
      if (parent) family.add(parent);
      for (const c of childrenOf.get(n.id) ?? []) family.add(c);
      if (parent) for (const s of childrenOf.get(parent) ?? []) if (s !== n.id) family.add(s);
      const fam = targets.filter((t) => family.has(t));
      const projects = targets.filter((t) => !family.has(t) && noteById.get(t)!.file.top === "projects");
      // the structural project: the one with the most mentions (ties: by path); any other project link is an "other"
      const home = [...projects].sort((x, y) => (out.get(n.id)!.get(y) ?? 0) - (out.get(n.id)!.get(x) ?? 0) || cmp(relOf(x), relOf(y)))[0] ?? null;
      const others = targets.filter((t) => !family.has(t) && t !== home);
      return {
        note: n.file.rel,
        pendingSplit: pending.has(n.file.rel),
        outgoing: targets.length,
        home: home ? relOf(home) : null,
        family: fam.map(relOf).sort(cmp),
        othersCount: others.length,
        others: others.map(relOf).sort(cmp),
      };
    })
    .sort((x, y) => y.othersCount - x.othersCount || cmp(x.note, y.note));
  const overBudget = budgetItems.filter((b) => b.othersCount > MAX_OTHERS);
  const budget = {
    maxOthers: MAX_OTHERS,
    hubs: curated.filter((n) => roleOf(n) === "hub").length,
    leaves: budgetItems.length,
    unclassified: curated.filter((n) => roleOf(n) === "other").map((n) => n.file.rel),
    over: overBudget.filter((b) => !b.pendingSplit),
    pendingOver: overBudget.filter((b) => b.pendingSplit),
    items: budgetItems,
  };

  // ---- k: name collisions between curated notes
  type Name = { note: string; kind: "slug" | "title" | "alias"; text: string };
  const byKey = new Map<string, Name[]>();
  for (const n of curated) {
    const add = (kind: Name["kind"], text: string) => {
      const key = nameKey(text);
      if (key.length >= 4) byKey.set(key, [...(byKey.get(key) ?? []), { note: n.file.rel, kind, text }]);
    };
    add("slug", n.file.slug.replace(/^\d{4}-\d{2}(-\d{2})?-/, ""));
    for (const t of n.names) add("title", t);
    for (const a of n.aliases) add("alias", a);
  }
  const collisionItems = [...byKey.entries()]
    .filter(([, list]) => new Set(list.map((x) => x.note)).size > 1)
    .map(([key, list]) => ({ key, names: list }))
    .sort((x, y) => cmp(x.key, y.key));
  const collisions = { keys: byKey.size, collisions: collisionItems.length, items: collisionItems };

  // ---- the fleeting block ("awaiting organization"): reported, never failing
  const fleeting = {
    notes: fleetingNotes.length,
    items: fleetingNotes.map((n) => ({
      note: n.file.rel,
      bytes: n.bytes,
      outgoingTargets: [...out.get(n.id)!.keys()].map(relOf).sort(cmp),
      unresolved: allUnresolved.filter((u) => u.from === n.file.rel).map((u) => ({ target: u.target, count: u.count })),
      incomingLinks: incLinks(n),
      incomingFrom: [...inc.get(n.id)!.keys()].map(relOf).sort(cmp),
    })),
    oneWay: oneWayAll.filter((i) => i.fleetingEnd).map(({ from, to, mentions }) => ({ from, to, mentions })),
    curatedIncomingOnlyFromFleeting: curated.filter((n) => incLinks(n) > 0 && incCurated(n).length === 0).map((n) => n.file.rel),
    sourcesOnlyFleeting: fleetingOnly,
  };

  // ---- strict: which checks fail, which of them decide the exit code
  const checks: Record<Letter, { ok: boolean; detail: string }> = {
    a: {
      ok: failingSize.length === 0 && withSizeReason.length === 0,
      detail: `${failingSize.length} curated note(s) over ${opts.sizeLimitKB} KB (${sizes.pendingSplit.length} more pending split), ${withSizeReason.length} with size_reason`,
    },
    b: { ok: unresolved.occurrences === 0, detail: `${unresolved.distinct} unresolved wikilink(s) in curated notes (${unresolved.occurrences} mention(s))` },
    c: { ok: oneWay.links === 0, detail: `${oneWay.links} one-way link(s) between curated notes (${oneWay.mentions} mention(s))` },
    d: { ok: zeroIncoming.notes === 0, detail: `${zeroIncoming.notes} curated note(s) with no curated incoming link` },
    f: { ok: !baseline.error && missing.length === 0, detail: baseline.error ? `sources baseline unusable: ${baseline.error}` : `${missing.length} enforced baseline source pair(s) missing` },
    g: {
      ok: !allowed.error && !domains.noDomain.length && !domains.several.length && !domains.notAllowed.length,
      detail: allowed.error ? allowed.error : `${domains.noDomain.length} curated note(s) with no domain tag, ${domains.several.length} with several, ${domains.notAllowed.length} with one not allowed`,
    },
    h: { ok: index.state === "current", detail: index.summary },
    i: { ok: budget.over.length === 0, detail: `${budget.over.length} leaf note(s) over the ${MAX_OTHERS}-link budget (${budget.pendingOver.length} more pending split)` },
    j: { ok: familyProblems.length === 0, detail: `${families.parts} part(s) in ${families.families} famil${families.families === 1 ? "y" : "ies"}, ${familyProblems.length} problem(s)` },
    k: { ok: collisionItems.length === 0, detail: `${collisionItems.length} name collision(s) between curated notes` },
  };
  const required: Letter[] = opts.require?.length ? [...opts.require] : [...STRICT_CHECKS];
  const failing: string[] = STRICT_CHECKS.filter((k) => !checks[k].ok);
  const failed: string[] = failing.filter((k) => required.includes(k as Letter));
  if (problems.length) {
    failed.push("consistency");
    failing.push("consistency");
  }

  return {
    tool: ".bedrock/reorg/check.ts",
    generatedAt: new Date().toISOString(),
    vault,
    git: { head, branch: gitOut(vault, "branch", "--show-current"), uncommittedMd: uncommittedMd(vault) },
    params: { sizeLimitKB: opts.sizeLimitKB, sizeLimitBytes: limitBytes, maxOut: opts.maxOut, pendingSplitsFile: opts.pendingFile ?? null, require: required },
    definitions: {
      note: "an .md note per extract.ts listNotes(); index.md, log.md, CLAUDE.md, _template.md and hidden folders are not notes",
      fleeting: "a note under the top folder fleeting/ (Owner decision 1); every other note is curated",
      mention: "one wikilink occurrence resolving to another note (the graph's mentions)",
      link: "directed A->B: A has at least one mention of B",
      undirectedLink: "unordered pair {A,B} with a link either way (the graph's links)",
    },
    graph: {
      notes: notes.length,
      curated: curated.length,
      fleeting: fleetingNotes.length,
      undirectedLinks: undirected.size,
      directedLinks,
      mentions,
      wikilinkOccurrences: occurrences,
      unresolvedOccurrences: unresolvedMentions,
      rootNonNoteOccurrences: rootMentions,
      selfMentions,
      extractorWarnings: graph.warnings,
      extractorNotices: graph.notices.length,
      consistentWithBuildGraph: problems.length === 0,
      inconsistencies: problems,
      frontmatterProblems: notes.filter((n) => n.yamlError).map((n) => ({ note: n.file.rel, problem: n.yamlError })),
    },
    pendingSplits: { file: opts.pendingFile ?? null, notes: pendingRels },
    sizes,
    unresolved,
    oneWay,
    zeroIncoming,
    outgoing,
    sources,
    domains,
    index,
    budget,
    families,
    collisions,
    fleeting,
    notes: notes.map((n) => ({
      note: n.file.rel,
      folder: folderOf(n),
      type: n.type,
      fleeting: n.fleeting,
      role: roleOf(n),
      pendingSplit: pending.has(n.file.rel),
      bytes: n.bytes,
      sizeReason: n.sizeReason,
      outgoingLinks: outLinks(n),
      outgoingMentions: outMentions(n),
      incomingLinks: incLinks(n),
      incomingCuratedLinks: incCurated(n).length,
      incomingMentions: incMentions(n),
      sourcePairs: n.sources.length,
      domainTags: n.domainTags,
      partOf: parentOf.has(n.id) ? relOf(parentOf.get(n.id)!) : null,
    })),
    strict: { checks, required, failing, failed, ok: failed.length === 0 },
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// the human summary

function table(rows: (string | number)[][], right: boolean[] = []): string[] {
  const w = rows[0].map((_, c) => Math.max(...rows.map((r) => String(r[c]).length)));
  return rows.map((r) => r.map((cell, c) => (right[c] ? String(cell).padStart(w[c]) : String(cell).padEnd(w[c]))).join("  ").trimEnd());
}
const kb = (n: number) => (n / KB).toFixed(1);
const cap = (lines: string[]) => (lines.length > LIST_CAP ? [...lines.slice(0, LIST_CAP), `    ... and ${lines.length - LIST_CAP} more (the JSON has every row)`] : lines);
const sha8 = (s: string) => s.slice(0, 8);

export function render(r: Report): string {
  const L: string[] = [];
  const status = (letter: Letter) => {
    const c = r.strict.checks[letter];
    return c.ok ? "OK  " : r.strict.required.includes(letter) ? "FAIL" : "fail";
  };
  const head = (letter: string, title: string, st: string, detail: string) => L.push("", `[${letter}] ${title}${" ".repeat(Math.max(1, 52 - title.length))}${st}  ${detail}`);
  const g = r.graph;

  L.push(`Vault check: ${r.vault}  (git ${r.git.branch ?? "?"} @ ${r.git.head ?? "?"})  ${r.generatedAt}`);
  L.push(`${g.notes} notes (${g.curated} curated, ${g.fleeting} fleeting) | links: ${g.undirectedLinks} unordered pairs, ${g.directedLinks} directed (A->B) | mentions: ${g.mentions} | unresolved ${g.unresolvedOccurrences}, to index/log/CLAUDE ${g.rootNonNoteOccurrences}, self ${g.selfMentions}`);
  L.push(
    g.consistentWithBuildGraph
      ? "consistent with graph/extract.ts buildGraph (same notes, link pairs, mentions, directed pairs, unresolved, link weights); system notes excluded"
      : "INCONSISTENT with graph/extract.ts buildGraph: " + g.inconsistencies.join("; "),
  );
  if (r.pendingSplits.file) L.push(`pending splits (${r.pendingSplits.notes.length} notes, from ${r.pendingSplits.file}): checks a and i report them instead of failing on them`);
  if (r.git.uncommittedMd?.length) L.push(`uncommitted .md files in the vault (${r.git.uncommittedMd.length}; capture hooks or another session write here): ${r.git.uncommittedMd.join(", ")}`);
  for (const w of g.extractorWarnings) L.push("  extractor warning: " + w);
  for (const f of g.frontmatterProblems) L.push(`  frontmatter problem: ${f.note}: ${f.problem}`);

  // a
  const s = r.sizes;
  head("a", "Sizes (curated notes; fleeting exempt)", status("a"), r.strict.checks.a.detail);
  L.push(...table([["  folder", "notes", "total KB", "median KB", "max KB", "over"], ...s.perFolder.map((f) => ["  " + f.folder + (f.exempt ? " (exempt)" : ""), f.notes, kb(f.bytes), kb(f.median), kb(f.max), f.overLimit])], [false, true, true, true, true, true]));
  const d = s.distribution;
  L.push(`  all notes: total ${kb(d.totalBytes)} KB | min ${kb(d.min)} | p25 ${kb(d.p25)} | median ${kb(d.median)} | p75 ${kb(d.p75)} | p90 ${kb(d.p90)} | max ${kb(d.max)} KB`);
  L.push("  distribution: " + d.buckets.map((b) => `${b.label}: ${b.notes}`).join(" | "));
  if (s.overLimit.length) {
    L.push(`  curated notes over ${s.limitKB} KB (${s.limitBytes} bytes):`);
    L.push(...cap(s.overLimit.map((n) => `    ${kb(n.bytes).padStart(7)} KB  ${n.note}${n.pendingSplit ? "  [pending split]" : "  [FAILS]"}${n.sizeReason ? `  [size_reason: ${oneLine(n.sizeReason, 60)}]` : ""}`)));
  }
  for (const n of s.withSizeReason) L.push(`    size_reason (none is granted in Phase 2): ${n.note}  ${oneLine(n.sizeReason, 80)}`);

  // b
  const u = r.unresolved;
  head("b", "Unresolved wikilinks (curated notes)", status("b"), `${u.distinct} distinct, ${u.occurrences} mention(s) of ${g.wikilinkOccurrences}${u.fleetingExempt.distinct ? `; ${u.fleetingExempt.distinct} more in fleeting notes (exempt, listed below)` : ""}`);
  L.push(...cap(u.items.map((i) => `    ${i.from}  ->  [[${i.target}]]  x${i.count}${i.hint ? `  (${i.hint})` : ""}`)));
  if (u.rootNonNoteLinks.occurrences) {
    L.push(`  links to index, log or CLAUDE (not counted as unresolved): ${u.rootNonNoteLinks.occurrences}`);
    L.push(...cap(u.rootNonNoteLinks.items.map((i) => `    ${i.from}  ->  [[${i.target}]]  x${i.count}`)));
  }

  // c
  const o = r.oneWay;
  head("c", "One-way links between curated notes", status("c"), `${o.links} of ${o.directedLinks} directed links${o.fleetingExempt ? `; ${o.fleetingExempt} more with a fleeting end (exempt, listed below)` : ""}`);
  L.push(`  ${o.reciprocatedDirectedLinks} directed links are reciprocated (${o.mutualPairs} mutual pairs); ${o.undirectedLinks} unordered links = ${o.mutualPairs} mutual + ${o.links + o.fleetingExempt} one-way`);
  L.push(...cap(o.items.map((i) => `    ${i.from}  ->  ${i.to}   (${i.mentions} mention${i.mentions === 1 ? "" : "s"})`)));

  // d
  const z = r.zeroIncoming;
  head("d", "Curated notes with no curated incoming link", status("d"), `${z.notes} of ${g.curated} curated notes`);
  L.push(`  curated incoming links per curated note: min ${z.incomingLinks.min}, median ${z.incomingLinks.median}, max ${z.incomingLinks.max}; notes with exactly 1: ${z.exactlyOneIncoming}`);
  L.push(...cap(z.items.map((i) => `    ${i.folder.padEnd(11)} ${i.note}   (incoming from fleeting notes ${i.incomingFromFleeting}; outgoing ${i.outgoingLinks} links)`)));

  // e
  const e = r.outgoing;
  head("e", "Distinct outgoing link targets per note", "info", `${e.overMax} of ${g.notes} notes have more than ${e.maxOut}`);
  const keys = Object.keys(e.histogram).map(Number).sort((x, y) => x - y);
  L.push(...table([["  targets", ...keys.map(String)], ["  notes", ...keys.map((k) => String(e.histogram[k]))]], [false, ...keys.map(() => true)]));
  L.push(`  links per note: min ${e.links.min} | median ${e.links.median} | p90 ${e.links.p90} | max ${e.links.max} | total ${e.links.total} directed`);
  L.push(`  mentions per note: min ${e.mentions.min} | median ${e.mentions.median} | p90 ${e.mentions.p90} | max ${e.mentions.max} | total ${e.mentions.total}`);
  L.push(`  per folder (notes with more than ${e.maxOut} / notes): ` + e.perFolder.map((f) => `${f.folder} ${f.overMax}/${f.notes}`).join(" | "));

  // f
  const f = r.sources;
  head("f", "Sources invariant (path, sha256)", status("f"), "error" in f.baseline ? "no usable baseline" : `${f.missing} enforced baseline pair(s) missing`);
  if (f.written) {
    L.push(`  baseline WRITTEN to ${f.baselineFile}: ${f.written.pairs} pairs${f.written.replaced ? ` (it replaced a baseline of ${f.written.replaced.pairs} pairs)` : ""}`);
    if (f.written.replaced?.notHeldNow) L.push(`  WARNING: ${f.written.replaced.notHeldNow} pair(s) of the replaced baseline are held by no note now`);
  }
  if ("error" in f.baseline) L.push(`  ${f.baseline.error}`);
  else
    L.push(
      `  baseline: ${f.baseline.pairs} pairs (written ${f.baseline.generatedAt ?? "?"} at ${f.baseline.vaultHead ?? "?"}); enforced (a curated note held it) ${f.enforced} -> held exactly by a curated note ${f.coveredExactly} | by a newer sha256 of the same path ${f.coveredByNewerSha} | MISSING ${f.missing}; held only by fleeting notes in the baseline ${f.fleetingOnly} (reported, not enforced)`,
    );
  L.push(`  now: ${f.now.pairs} distinct pairs over ${f.now.paths} paths (${f.now.entries} entries in ${f.now.notesWithSources} of ${f.now.notes} notes; ${f.now.curatedPairs} pairs in curated notes${f.now.otherSourceEntries ? `, plus ${f.now.otherSourceEntries} entries without path+sha256` : ""}); pairs not in the baseline: ${f.notInBaseline}`);
  for (const m of f.missingItems) L.push(`    MISSING ${sha8(m.sha256)}  ${m.path}  (held in the baseline by: ${m.heldBy.join(", ") || "?"})`);
  for (const m of f.supersededItems) L.push(`    newer sha  ${sha8(m.sha256)} -> ${m.newer.map(sha8).join(", ")}  ${m.path}`);

  // g
  const dm = r.domains;
  head("g", "Domain tags (curated notes: exactly one allowed)", status("g"), r.strict.checks.g.detail);
  if (dm.allowedListError) L.push("  allowed list: " + dm.allowedListError);
  L.push(`  allowed (CLAUDE.md): ${dm.allowed.join(", ") || "(none)"}`);
  L.push(`  in use: ${Object.entries(dm.inUse).map(([t, n]) => `${t} ${n}`).join(" | ") || "(none)"}${dm.allowedUnused.length ? `; allowed but unused: ${dm.allowedUnused.join(", ")}` : ""}; exactly one allowed tag: ${dm.exactlyOne} of ${g.curated}`);
  L.push(...cap(dm.noDomain.map((n) => `    no domain tag  ${n.folder.padEnd(11)} ${n.note}`)));
  L.push(...cap(dm.several.map((n) => `    several tags   ${n.folder.padEnd(11)} ${n.note}   ${n.tags.join(", ")}`)));
  L.push(...cap(dm.notAllowed.map((n) => `    not allowed    ${n.folder.padEnd(11)} ${n.note}   ${n.tags.join(", ")}`)));

  // h
  const ix = r.index;
  head("h", "index.md vs the generated catalog", status("h"), ix.summary);
  if (ix.state === "stale" || ix.state === "not-generated") {
    if (ix.firstDifferingLine) L.push(`  first differing line: ${ix.firstDifferingLine}`);
    for (const x of ix.onlyInFile.slice(0, 8)) L.push(`    - only in index.md: ${x}`);
    for (const x of ix.onlyInGenerated.slice(0, 8)) L.push(`    + only in generated: ${x}`);
    if (ix.onlyInFile.length > 8 || ix.onlyInGenerated.length > 8) L.push("    ... (the JSON has every differing line)");
  }

  // i
  const b = r.budget;
  head("i", `Leaf link budget (at most ${b.maxOthers} others)`, status("i"), `${b.leaves} leaves, ${b.hubs} hubs; ${r.strict.checks.i.detail}`);
  if (b.unclassified.length) L.push(`  curated notes that are neither hub nor leaf (not budgeted): ${b.unclassified.join(", ")}`);
  const budgetLine = (x: (typeof b.items)[number]) => `    ${String(x.othersCount).padStart(3)} others  ${x.note}${x.pendingSplit ? "  [pending split]" : ""}   home ${x.home ?? "-"}; others: ${x.others.join(", ")}`;
  L.push(...cap([...b.over, ...b.pendingOver].map(budgetLine)));

  // j
  const fm = r.families;
  head("j", "Split families (part_of)", status("j"), r.strict.checks.j.detail);
  L.push(...cap(fm.items.map((x) => `    ${x.parent}: ${x.parts.length} part(s): ${x.parts.join(", ")}`)));
  L.push(...cap(fm.problemItems.map((x) => `    PROBLEM ${x.part}: ${x.problem}`)));

  // k
  const k = r.collisions;
  head("k", "Name collisions (slug, title, name, aliases)", status("k"), r.strict.checks.k.detail);
  for (const c of k.items) L.push(`    "${c.key}": ` + c.names.map((x) => `${x.note} [${x.kind}] ${JSON.stringify(x.text)}`).join("  |  "));

  // fleeting
  const fl = r.fleeting;
  L.push("", `[fleeting] Awaiting organization (exempt from a, b, c and d; never fail): ${fl.notes} note(s)`);
  L.push(...cap(fl.items.map((x) => `    ${kb(x.bytes).padStart(6)} KB  ${x.note}   out ${x.outgoingTargets.length} (${x.outgoingTargets.join(", ") || "-"}); unresolved ${x.unresolved.length ? x.unresolved.map((y) => `[[${y.target}]] x${y.count}`).join(", ") : 0}; incoming ${x.incomingLinks}`)));
  if (fl.oneWay.length) {
    L.push(`  one-way links with a fleeting end (exempt from c): ${fl.oneWay.length}`);
    L.push(...cap(fl.oneWay.map((x) => `    ${x.from}  ->  ${x.to}   (${x.mentions} mention${x.mentions === 1 ? "" : "s"})`)));
  }
  if (fl.curatedIncomingOnlyFromFleeting.length) L.push(`  curated notes whose only incoming links come from fleeting notes (they fail d): ${fl.curatedIncomingOnlyFromFleeting.join(", ")}`);
  if (fl.sourcesOnlyFleeting.length) {
    L.push(`  baseline source pairs held only by fleeting notes (reported, not enforced; decision 14): ${fl.sourcesOnlyFleeting.length}`);
    L.push(...cap(fl.sourcesOnlyFleeting.map((x) => `    ${sha8(x.sha256)}  ${x.path}  (baseline: ${x.baselineHolders.join(", ")}; now ${x.now})`)));
  }

  L.push("");
  const names = [...STRICT_CHECKS];
  const word = (k: Letter) => (r.strict.checks[k].ok ? "ok" : r.strict.required.includes(k) ? "FAIL" : "fail (not required)");
  const consistency = r.strict.failed.includes("consistency") ? ", consistency FAIL" : "";
  L.push(
    "strict: " +
      names.map((k) => `${k} ${word(k)}`).join(", ") +
      consistency +
      (r.strict.ok ? `  -> would pass (required: ${r.strict.required.join(",")})` : `  -> would FAIL (${r.strict.failed.join(", ")}; required: ${r.strict.required.join(",")})`),
  );
  return L.join("\n");
}

// ---------------------------------------------------------------------------------------------------------------------

const USAGE =
  "usage: bun .bedrock/reorg/check.ts [--json <file>] [--size-limit <KB>] [--max-out <n>] [--strict] [--require <letters>] [--pending-splits <file>] [--write-sources-baseline] [--vault <dir>]";
const VALUE_FLAGS = ["--json", "--size-limit", "--max-out", "--vault", "--require", "--pending-splits"];
const BOOL_FLAGS = ["--strict", "--write-sources-baseline", "--help", "-h"];

function numberFlag(argv: string[], name: string, dflt: number, kind: "positive" | "whole"): number {
  const v = argValue(name, argv);
  if (v === undefined) return dflt;
  const n = v.trim() === "" ? NaN : Number(v);
  const ok = kind === "positive" ? Number.isFinite(n) && n > 0 : Number.isInteger(n) && n >= 0;
  if (!ok) throw new Error(`${name} must be ${kind === "positive" ? "a number > 0" : "a whole number >= 0"}, got "${v}"`);
  return n;
}

/** "a,b,c" or "abc" -> ["a","b","c"]; every letter must be a strict check */
export function parseRequire(v: string): Letter[] {
  const letters = v.includes(",") ? v.split(",").map((x) => x.trim()).filter(Boolean) : v.trim().split("");
  if (!letters.length) throw new Error("--require needs at least one check letter");
  for (const l of letters) if (!(STRICT_CHECKS as readonly string[]).includes(l)) throw new Error(`--require: "${l}" is not a strict check (strict checks: ${STRICT_CHECKS.join(" ")})`);
  return [...new Set(letters)] as Letter[];
}

function parseArgs(argv: string[]) {
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const name = a.includes("=") ? a.slice(0, a.indexOf("=")) : a;
    if (VALUE_FLAGS.includes(name)) {
      if (!a.includes("=")) {
        if (i + 1 >= argv.length || argv[i + 1].startsWith("--")) throw new Error(`${name} needs a value`);
        i++;
      }
    } else if (!BOOL_FLAGS.includes(a)) throw new Error(`unknown argument ${a}`);
  }
  const req = argValue("--require", argv);
  const pend = argValue("--pending-splits", argv);
  return {
    json: argValue("--json", argv),
    strict: argv.includes("--strict"),
    help: argv.includes("--help") || argv.includes("-h"),
    opts: {
      vault: resolve(argValue("--vault", argv) ?? THIS_VAULT),
      sizeLimitKB: numberFlag(argv, "--size-limit", 50, "positive"),
      maxOut: numberFlag(argv, "--max-out", 3, "whole"),
      writeBaseline: argv.includes("--write-sources-baseline"),
      pendingFile: pend === undefined ? null : resolve(pend),
      require: req === undefined ? null : parseRequire(req),
    } satisfies Options,
  };
}

if (import.meta.main) {
  const argv = process.argv.slice(2);
  try {
    const a = parseArgs(argv);
    if (a.help) {
      console.log(USAGE);
    } else {
      const report = await analyze(a.opts);
      console.log(render(report));
      if (a.json) {
        const target = resolve(a.json);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, JSON.stringify(report, null, 2) + "\n");
        console.log(`\nJSON written to ${target}`);
      }
      process.exitCode = a.strict && !report.strict.ok ? 1 : 0;
    }
  } catch (e) {
    // the tool could not run: say so; under --strict a check that cannot run has not passed
    console.error("check.ts: " + oneLine((e as Error)?.message ?? e, 300));
    console.error(USAGE);
    process.exitCode = argv.includes("--strict") ? 1 : 0;
  }
}
