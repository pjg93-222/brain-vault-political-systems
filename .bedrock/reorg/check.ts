// Vault health check for the Phase 2 reorganisation ("organize the brain"). READ-ONLY on the vault: it prints a human
// summary and, with --json <file>, writes the same numbers as JSON. The only files it ever writes are the --json target and,
// with --write-sources-baseline, .bedrock/reorg/sources-baseline.json.
//
//   bun .bedrock/reorg/check.ts [--json <file>] [--size-limit <KB>] [--max-out <n>] [--strict]
//   bun .bedrock/reorg/check.ts --write-sources-baseline      save every (path, sha256) now in a note's `sources:`
//
//   --size-limit <KB>   a note over this size (1 KB = 1024 bytes, default 30) with no `size_reason` is "unexplained"
//   --max-out <n>       list notes with more than n distinct outgoing link targets (default 3: "2-3 selective links")
//   --strict            exit 1 when one of the checks a, b, c, d, f, h fails (or the tool itself cannot run); without it the
//                       exit code is always 0, whatever the findings
//   --vault <dir>       check another vault root (a copy, a test fixture); default: the vault this file lives in
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
// reported as an internal inconsistency and counts as a failure under --strict.
//
// The checks:
//   a  sizes: notes per folder, size distribution, notes over --size-limit and whether each has a `size_reason`
//   b  unresolved wikilinks
//   c  one-way links (A links B, B does not link A)
//   d  notes with no incoming link from another note
//   e  distinct outgoing link targets per note (info only)
//   f  sources invariant: every (path, sha256) of the baseline is still held by a note, or some note holds another sha256
//      for the same path (hashes have no order, so any different one counts as the newer version: the capture hook
//      replaces a changed memory file's hash, it never goes back); the baseline is .bedrock/reorg/sources-baseline.json.
//      A path no note lists any more is MISSING.
//   g  domain tags: no domain/* tag, or one that is not in the vault CLAUDE.md "Domains" list (info only)
//   h  index.md equals what `bun .bedrock/recall/hook.ts index` would generate now (compared in memory, nothing written)
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { ROOT_NON_NOTES, VAULT as THIS_VAULT, argValue, oneLine } from "../graph/common.ts";
import { DIR_TYPE, buildGraph, dropSources, listNotes, splitFrontmatter, type NoteFile } from "../graph/extract.ts";

const KB = 1024;
const LIST_CAP = 200; // longest list the human summary prints (the JSON always has every row)
const STRICT_CHECKS = ["a", "b", "c", "d", "f", "h"] as const;
const BASELINE_REL = ".bedrock/reorg/sources-baseline.json";
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

// ---------------------------------------------------------------------------------------------------------------------
// reading the vault

type Pair = { path: string; sha256: string };
type NoteInfo = {
  file: NoteFile;
  /** the graph node id: file name, or the vault-relative path when several notes share a file name */
  id: string;
  type: string;
  bytes: number;
  /** null when the frontmatter parsed (or there is none); otherwise why it did not */
  yamlError: string | null;
  domainTags: string[];
  sizeReason: string | null;
  sources: Pair[];
  /** `sources:` entries that are not a {path, sha256} pair (a URL-only source, a malformed entry) */
  otherSources: number;
  /** frontmatter (minus sources) + body: what the graph scans for wikilinks */
  linkText: string;
};

const gitOut = (vault: string, ...args: string[]): string | null => {
  try {
    const r = Bun.spawnSync(["git", "-C", vault, ...args], { stdout: "pipe", stderr: "pipe" });
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
    return {
      file: f,
      id: (slugCount.get(f.slug) ?? 0) > 1 ? f.rel : f.slug,
      type: nodeTypes[i] ?? "other",
      bytes,
      yamlError,
      domainTags: tags.filter((t) => t.startsWith("domain/")),
      sizeReason: typeof sr === "string" && sr.trim() ? sr.trim() : null,
      sources,
      otherSources,
      linkText: dropSources(fm) + "\n" + body,
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

type Options = { vault: string; sizeLimitKB: number; maxOut: number; writeBaseline: boolean };
export type Report = Awaited<ReturnType<typeof analyze>>;

const quantile = (sorted: number[], p: number) => (sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] : 0);
const pairKey = (p: Pair) => p.path + "\u0000" + p.sha256;
/** the folder a note sits in, as printed ("(root)" for a note in the vault root) */
const folderOf = (n: NoteInfo) => n.file.dir || "(root)";
const sum = (xs: Iterable<number>) => {
  let t = 0;
  for (const x of xs) t += x;
  return t;
};

export async function analyze(opts: Options) {
  const { vault } = opts;
  const graph = buildGraph(vault);
  const notes = loadNotes(vault, graph.nodes.map((n) => n.type));

  // ---- the directed mention table, with buildGraph's resolution: exact vault-relative path first, then the first note with that file name
  const idByRel = new Map(notes.map((n) => [n.file.rel, n.id]));
  const idBySlug = new Map<string, string>();
  for (const n of notes) if (!idBySlug.has(n.file.slug)) idBySlug.set(n.file.slug, n.id);
  const noteById = new Map(notes.map((n) => [n.id, n]));
  const slugByLower = new Map<string, string>();
  for (const n of notes) if (!slugByLower.has(n.file.slug.toLowerCase())) slugByLower.set(n.file.slug.toLowerCase(), n.file.slug);
  const rootNonNoteSlugs = new Set([...ROOT_NON_NOTES].map((f) => f.replace(/\.md$/i, "")));

  const out = new Map<string, Map<string, number>>(notes.map((n) => [n.id, new Map()]));
  const inc = new Map<string, Map<string, number>>(notes.map((n) => [n.id, new Map()]));
  type Unresolved = { from: string; target: string; count: number; hint: string | null };
  const unresolvedMap = new Map<string, Unresolved>();
  const rootLinkMap = new Map<string, { from: string; target: string; count: number }>();
  let occurrences = 0;
  let selfMentions = 0;
  let unresolvedMentions = 0;
  let rootMentions = 0;
  for (const n of notes) {
    WIKI.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = WIKI.exec(n.linkText))) {
      occurrences++;
      const p = wikiPath(m[1]);
      const target = idByRel.get(p) ?? idBySlug.get(p.split("/").pop()!) ?? null;
      if (target === null) {
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
  expect("unresolved occurrences (links to index/log/CLAUDE included)", unresolvedMentions + rootMentions, graph.stats.unresolved);
  expect("self mentions", selfMentions, graph.stats.selfLinks);
  if (notes.some((n, i) => n.id !== graph.nodes[i]?.id)) problems.push("note order or ids differ from buildGraph");
  for (const l of graph.links) if ((undirected.get(ukey(l.source, l.target)) ?? -1) !== l.weight) problems.push(`link weight differs for ${l.source} - ${l.target}`);

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
  const overLimit = notes.filter((n) => n.bytes > limitBytes).sort((x, y) => y.bytes - x.bytes || cmp(x.file.rel, y.file.rel));
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
        unexplained: g.filter((n) => n.bytes > limitBytes && !n.sizeReason).length,
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
    overLimit: overLimit.map((n) => ({ note: n.file.rel, folder: folderOf(n), bytes: n.bytes, sizeReason: n.sizeReason })),
    unexplained: overLimit.filter((n) => !n.sizeReason).map((n) => ({ note: n.file.rel, folder: folderOf(n), bytes: n.bytes })),
  };

  // ---- b: unresolved wikilinks
  const byFromTarget = (x: { from: string; target: string }, y: { from: string; target: string }) => cmp(x.from, y.from) || cmp(x.target, y.target);
  const unresolved = {
    occurrences: unresolvedMentions,
    distinct: unresolvedMap.size,
    items: [...unresolvedMap.values()].sort(byFromTarget),
    rootNonNoteLinks: { occurrences: rootMentions, items: [...rootLinkMap.values()].sort(byFromTarget) },
  };

  // ---- c: one-way links
  const oneWayItems: { from: string; to: string; mentions: number }[] = [];
  for (const [a, m] of out) for (const [b, c] of m) if (!out.get(b)!.has(a)) oneWayItems.push({ from: relOf(a), to: relOf(b), mentions: c });
  oneWayItems.sort((x, y) => cmp(x.from, y.from) || cmp(x.to, y.to));
  const oneWay = {
    links: oneWayItems.length,
    mentions: sum(oneWayItems.map((i) => i.mentions)),
    directedLinks,
    reciprocatedDirectedLinks: directedLinks - oneWayItems.length,
    mutualPairs: (directedLinks - oneWayItems.length) / 2,
    undirectedLinks: undirected.size,
    items: oneWayItems,
  };

  // ---- d: no incoming link from another note (system notes are not notes here, so their links never count)
  const incLinks = (n: NoteInfo) => inc.get(n.id)!.size;
  const incMentions = (n: NoteInfo) => sum(inc.get(n.id)!.values());
  const zeroIn = notes.filter((n) => incLinks(n) === 0);
  const incSorted = notes.map(incLinks).sort((x, y) => x - y);
  const zeroIncoming = {
    notes: zeroIn.length,
    exactlyOneIncoming: notes.filter((n) => incLinks(n) === 1).length,
    incomingLinks: { min: incSorted[0] ?? 0, median: quantile(incSorted, 0.5), max: incSorted[incSorted.length - 1] ?? 0 },
    items: zeroIn.map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type, incomingLinks: 0, incomingMentions: incMentions(n), outgoingLinks: out.get(n.id)!.size })),
  };

  // ---- e: distinct outgoing link targets per note
  const outLinks = (n: NoteInfo) => out.get(n.id)!.size;
  const outMentions = (n: NoteInfo) => sum(out.get(n.id)!.values());
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

  // ---- f: the sources invariant
  const current = new Map<string, { pair: Pair; notes: string[] }>();
  const shasByPath = new Map<string, Set<string>>();
  let entries = 0;
  let otherSources = 0;
  let notesWithSources = 0;
  for (const n of notes) {
    if (n.sources.length) notesWithSources++;
    otherSources += n.otherSources;
    for (const p of n.sources) {
      entries++;
      const c = current.get(pairKey(p)) ?? { pair: p, notes: [] };
      if (!c.notes.includes(n.file.rel)) c.notes.push(n.file.rel);
      current.set(pairKey(p), c);
      shasByPath.set(p.path, (shasByPath.get(p.path) ?? new Set()).add(p.sha256));
    }
  }
  const currentPairs = [...current.values()].sort((x, y) => cmp(x.pair.path, y.pair.path) || cmp(x.pair.sha256, y.pair.sha256));
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
    written = { pairs: currentPairs.length, replaced: old.pairs ? { pairs: old.pairs.length, notHeldNow: old.pairs.filter((p) => !current.has(pairKey(p)) && !shasByPath.has(p.path)).length } : null };
  }
  const baseline = readBaseline(baselineFile);
  let covered = 0;
  const superseded: { path: string; sha256: string; newer: string[] }[] = [];
  const missing: { path: string; sha256: string; heldBy: string[] }[] = [];
  for (const p of baseline.pairs ?? []) {
    if (current.has(pairKey(p))) covered++;
    else {
      const newer = [...(shasByPath.get(p.path) ?? [])].filter((s) => s !== p.sha256).sort(cmp);
      if (newer.length) superseded.push({ path: p.path, sha256: p.sha256, newer });
      else missing.push({ path: p.path, sha256: p.sha256, heldBy: p.notes });
    }
  }
  const baselineKeys = new Set((baseline.pairs ?? []).map(pairKey));
  const sources = {
    baselineFile: BASELINE_REL,
    baseline: baseline.error ? { error: baseline.error } : { generatedAt: baseline.generatedAt, vaultHead: baseline.vaultHead, pairs: baseline.pairs!.length },
    written,
    now: { notes: notes.length, notesWithSources, entries, pairs: currentPairs.length, paths: shasByPath.size, otherSourceEntries: otherSources },
    coveredExactly: covered,
    coveredByNewerSha: superseded.length,
    missing: missing.length,
    notInBaseline: currentPairs.filter((c) => !baselineKeys.has(pairKey(c.pair))).length,
    supersededItems: superseded,
    missingItems: missing,
  };

  // ---- g: domain tags
  const allowed = allowedDomains(vault);
  const allowedSet = new Set(allowed.list);
  const tagUse: Record<string, number> = {};
  for (const n of notes) for (const t of n.domainTags) tagUse[t] = (tagUse[t] ?? 0) + 1;
  const domains = {
    allowed: allowed.list,
    allowedListError: allowed.error,
    inUse: Object.fromEntries(Object.entries(tagUse).sort((x, y) => y[1] - x[1] || cmp(x[0], y[0]))),
    allowedUnused: allowed.list.filter((t) => !tagUse[t]),
    noDomain: notes.filter((n) => !n.domainTags.length).map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type })),
    notAllowed: notes.filter((n) => n.domainTags.some((t) => !allowedSet.has(t))).map((n) => ({ note: n.file.rel, folder: folderOf(n), type: n.type, tags: n.domainTags.filter((t) => !allowedSet.has(t)) })),
  };

  // ---- h: index.md against the indexer's own generator (nothing is written)
  const index = await checkIndex(vault);

  // ---- strict: which of the failure checks fail
  const checks: Record<string, { ok: boolean; detail: string }> = {
    a: { ok: sizes.unexplained.length === 0, detail: `${sizes.unexplained.length} note(s) over ${opts.sizeLimitKB} KB without size_reason` },
    b: { ok: unresolved.occurrences === 0, detail: `${unresolved.distinct} unresolved wikilink(s) (${unresolved.occurrences} mention(s))` },
    c: { ok: oneWay.links === 0, detail: `${oneWay.links} one-way link(s) (${oneWay.mentions} mention(s))` },
    d: { ok: zeroIncoming.notes === 0, detail: `${zeroIncoming.notes} note(s) with no incoming link` },
    f: { ok: !baseline.error && missing.length === 0, detail: baseline.error ? `sources baseline unusable: ${baseline.error}` : `${missing.length} baseline source pair(s) missing` },
    h: { ok: index.state === "current", detail: index.summary },
  };
  const failed: string[] = STRICT_CHECKS.filter((k) => !checks[k].ok);
  if (problems.length) failed.push("consistency");

  return {
    tool: ".bedrock/reorg/check.ts",
    generatedAt: new Date().toISOString(),
    vault,
    git: { head, branch: gitOut(vault, "branch", "--show-current"), uncommittedMd: uncommittedMd(vault) },
    params: { sizeLimitKB: opts.sizeLimitKB, sizeLimitBytes: limitBytes, maxOut: opts.maxOut },
    definitions: {
      note: "an .md note per extract.ts listNotes(); index.md, log.md, CLAUDE.md, _template.md and hidden folders are not notes",
      mention: "one wikilink occurrence resolving to another note (the graph's mentions)",
      link: "directed A->B: A has at least one mention of B",
      undirectedLink: "unordered pair {A,B} with a link either way (the graph's links)",
    },
    graph: {
      notes: notes.length,
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
    sizes,
    unresolved,
    oneWay,
    zeroIncoming,
    outgoing,
    sources,
    domains,
    index,
    notes: notes.map((n) => ({
      note: n.file.rel,
      folder: folderOf(n),
      type: n.type,
      bytes: n.bytes,
      sizeReason: n.sizeReason,
      outgoingLinks: outLinks(n),
      outgoingMentions: outMentions(n),
      incomingLinks: incLinks(n),
      incomingMentions: incMentions(n),
      sourcePairs: n.sources.length,
      domainTags: n.domainTags,
    })),
    strict: { checks, failed, ok: failed.length === 0 },
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
  const mark = (ok: boolean) => (ok ? "OK  " : "FAIL");
  const head = (letter: string, title: string, status: string, detail: string) => L.push("", `[${letter}] ${title}${" ".repeat(Math.max(1, 52 - title.length))}${status}  ${detail}`);
  const g = r.graph;

  L.push(`Vault check: ${r.vault}  (git ${r.git.branch ?? "?"} @ ${r.git.head ?? "?"})  ${r.generatedAt}`);
  L.push(`${g.notes} notes | links: ${g.undirectedLinks} unordered pairs, ${g.directedLinks} directed (A->B) | mentions: ${g.mentions} | unresolved ${g.unresolvedOccurrences}, to index/log/CLAUDE ${g.rootNonNoteOccurrences}, self ${g.selfMentions}`);
  L.push(
    g.consistentWithBuildGraph
      ? "consistent with graph/extract.ts buildGraph (same notes, link pairs, mentions, directed pairs, unresolved, link weights); system notes excluded"
      : "INCONSISTENT with graph/extract.ts buildGraph: " + g.inconsistencies.join("; "),
  );
  if (r.git.uncommittedMd?.length) L.push(`uncommitted .md files in the vault (${r.git.uncommittedMd.length}; capture hooks or another session write here): ${r.git.uncommittedMd.join(", ")}`);
  for (const w of g.extractorWarnings) L.push("  extractor warning: " + w);
  for (const f of g.frontmatterProblems) L.push(`  frontmatter problem: ${f.note}: ${f.problem}`);

  // a
  const s = r.sizes;
  head("a", "Sizes", mark(r.strict.checks.a.ok), `${s.overLimit.length} note(s) over ${s.limitKB} KB (${s.limitBytes} bytes), ${s.unexplained.length} without size_reason`);
  L.push(...table([["  folder", "notes", "total KB", "median KB", "max KB", "over", "no reason"], ...s.perFolder.map((f) => ["  " + f.folder, f.notes, kb(f.bytes), kb(f.median), kb(f.max), f.overLimit, f.unexplained])], [false, true, true, true, true, true, true]));
  const d = s.distribution;
  L.push(`  all notes: total ${kb(d.totalBytes)} KB | min ${kb(d.min)} | p25 ${kb(d.p25)} | median ${kb(d.median)} | p75 ${kb(d.p75)} | p90 ${kb(d.p90)} | max ${kb(d.max)} KB`);
  L.push("  distribution: " + d.buckets.map((b) => `${b.label}: ${b.notes}`).join(" | "));
  if (s.overLimit.length) {
    L.push(`  over ${s.limitKB} KB:`);
    L.push(...cap(s.overLimit.map((n) => `    ${kb(n.bytes).padStart(7)} KB  ${n.note}${n.sizeReason ? `  [size_reason: ${oneLine(n.sizeReason, 60)}]` : ""}`)));
  }

  // b
  const u = r.unresolved;
  head("b", "Unresolved wikilinks", mark(r.strict.checks.b.ok), `${u.distinct} distinct, ${u.occurrences} mention(s) of ${g.wikilinkOccurrences}`);
  L.push(...cap(u.items.map((i) => `    ${i.from}  ->  [[${i.target}]]  x${i.count}${i.hint ? `  (${i.hint})` : ""}`)));
  if (u.rootNonNoteLinks.occurrences) {
    L.push(`  links to index, log or CLAUDE (not counted as unresolved): ${u.rootNonNoteLinks.occurrences}`);
    L.push(...cap(u.rootNonNoteLinks.items.map((i) => `    ${i.from}  ->  [[${i.target}]]  x${i.count}`)));
  }

  // c
  const o = r.oneWay;
  head("c", "One-way links (A links B, B does not link A)", mark(r.strict.checks.c.ok), `${o.links} of ${o.directedLinks} directed links, ${o.mentions} of ${g.mentions} mentions`);
  L.push(`  ${o.reciprocatedDirectedLinks} directed links are reciprocated (${o.mutualPairs} mutual pairs); ${o.undirectedLinks} unordered links = ${o.mutualPairs} mutual + ${o.links} one-way`);
  L.push(...cap(o.items.map((i) => `    ${i.from}  ->  ${i.to}   (${i.mentions} mention${i.mentions === 1 ? "" : "s"})`)));

  // d
  const z = r.zeroIncoming;
  head("d", "Notes with no incoming link (system notes ignored)", mark(r.strict.checks.d.ok), `${z.notes} of ${g.notes} notes`);
  L.push(`  incoming links per note: min ${z.incomingLinks.min}, median ${z.incomingLinks.median}, max ${z.incomingLinks.max}; notes with exactly 1: ${z.exactlyOneIncoming}`);
  L.push(...cap(z.items.map((i) => `    ${i.folder.padEnd(11)} ${i.note}   (incoming 0 links / ${i.incomingMentions} mentions; outgoing ${i.outgoingLinks} links)`)));

  // e
  const e = r.outgoing;
  head("e", "Distinct outgoing link targets per note", "info", `${e.overMax} of ${g.notes} notes have more than ${e.maxOut}`);
  const keys = Object.keys(e.histogram).map(Number).sort((x, y) => x - y);
  L.push(...table([["  targets", ...keys.map(String)], ["  notes", ...keys.map((k) => String(e.histogram[k]))]], [false, ...keys.map(() => true)]));
  L.push(`  links per note: min ${e.links.min} | median ${e.links.median} | p90 ${e.links.p90} | max ${e.links.max} | total ${e.links.total} directed`);
  L.push(`  mentions per note: min ${e.mentions.min} | median ${e.mentions.median} | p90 ${e.mentions.p90} | max ${e.mentions.max} | total ${e.mentions.total}`);
  L.push(`  per folder (notes with more than ${e.maxOut} / notes): ` + e.perFolder.map((f) => `${f.folder} ${f.overMax}/${f.notes}`).join(" | "));
  if (e.items.length) {
    L.push(`  notes with more than ${e.maxOut} distinct targets (links = distinct targets, mentions = wikilink occurrences):`);
    L.push(...cap(table([["    links", "mentions", "folder", "note"], ...e.items.map((i) => ["    " + i.links, i.mentions, i.folder, i.note])], [true, true, false, false])));
  }

  // f
  const f = r.sources;
  head("f", "Sources invariant (path, sha256)", mark(r.strict.checks.f.ok), "error" in f.baseline ? "no usable baseline" : `${f.missing} baseline pair(s) missing`);
  if (f.written) {
    L.push(`  baseline WRITTEN to ${f.baselineFile}: ${f.written.pairs} pairs${f.written.replaced ? ` (it replaced a baseline of ${f.written.replaced.pairs} pairs)` : ""}`);
    if (f.written.replaced?.notHeldNow) L.push(`  WARNING: ${f.written.replaced.notHeldNow} pair(s) of the replaced baseline are held by no note now`);
  }
  if ("error" in f.baseline) L.push(`  ${f.baseline.error}`);
  else L.push(`  baseline: ${f.baseline.pairs} pairs (written ${f.baseline.generatedAt ?? "?"} at ${f.baseline.vaultHead ?? "?"}) -> exactly held ${f.coveredExactly} | covered by a newer sha256 of the same path ${f.coveredByNewerSha} | MISSING ${f.missing}`);
  L.push(`  now: ${f.now.pairs} distinct pairs over ${f.now.paths} paths (${f.now.entries} entries in ${f.now.notesWithSources} of ${f.now.notes} notes${f.now.otherSourceEntries ? `, plus ${f.now.otherSourceEntries} entries without path+sha256` : ""}); pairs not in the baseline: ${f.notInBaseline}`);
  for (const m of f.missingItems) L.push(`    MISSING ${sha8(m.sha256)}  ${m.path}  (held by: ${m.heldBy.join(", ") || "?"})`);
  for (const m of f.supersededItems) L.push(`    newer sha  ${sha8(m.sha256)} -> ${m.newer.map(sha8).join(", ")}  ${m.path}`);

  // g
  const dm = r.domains;
  head("g", "Domain tags", "info", `${dm.noDomain.length} note(s) with no domain/* tag, ${dm.notAllowed.length} with a tag not in the CLAUDE.md list`);
  if (dm.allowedListError) L.push("  allowed list: " + dm.allowedListError);
  L.push(`  allowed (CLAUDE.md): ${dm.allowed.join(", ") || "(none)"}`);
  L.push(`  in use: ${Object.entries(dm.inUse).map(([t, n]) => `${t} ${n}`).join(" | ") || "(none)"}${dm.allowedUnused.length ? `; allowed but unused: ${dm.allowedUnused.join(", ")}` : ""}`);
  L.push(...cap(dm.noDomain.map((n) => `    no domain tag  ${n.folder.padEnd(11)} ${n.note}`)));
  L.push(...cap(dm.notAllowed.map((n) => `    not allowed    ${n.folder.padEnd(11)} ${n.note}   ${n.tags.join(", ")}`)));

  // h
  const ix = r.index;
  head("h", "index.md vs the generated catalog", mark(r.strict.checks.h.ok), ix.summary);
  if (ix.state === "stale" || ix.state === "not-generated") {
    if (ix.firstDifferingLine) L.push(`  first differing line: ${ix.firstDifferingLine}`);
    for (const x of ix.onlyInFile.slice(0, 8)) L.push(`    - only in index.md: ${x}`);
    for (const x of ix.onlyInGenerated.slice(0, 8)) L.push(`    + only in generated: ${x}`);
    if (ix.onlyInFile.length > 8 || ix.onlyInGenerated.length > 8) L.push("    ... (the JSON has every differing line)");
  }

  L.push("");
  const names: string[] = [...STRICT_CHECKS, ...(r.strict.failed.includes("consistency") ? ["consistency"] : [])];
  L.push("strict: " + names.map((k) => `${k} ${k === "consistency" ? "FAIL" : r.strict.checks[k].ok ? "ok" : "FAIL"}`).join(", ") + (r.strict.ok ? "  -> would pass" : `  -> would FAIL (${r.strict.failed.join(", ")})`));
  return L.join("\n");
}

// ---------------------------------------------------------------------------------------------------------------------

const USAGE = "usage: bun .bedrock/reorg/check.ts [--json <file>] [--size-limit <KB>] [--max-out <n>] [--strict] [--write-sources-baseline] [--vault <dir>]";
const VALUE_FLAGS = ["--json", "--size-limit", "--max-out", "--vault"];
const BOOL_FLAGS = ["--strict", "--write-sources-baseline", "--help", "-h"];

function numberFlag(argv: string[], name: string, dflt: number, kind: "positive" | "whole"): number {
  const v = argValue(name, argv);
  if (v === undefined) return dflt;
  const n = v.trim() === "" ? NaN : Number(v);
  const ok = kind === "positive" ? Number.isFinite(n) && n > 0 : Number.isInteger(n) && n >= 0;
  if (!ok) throw new Error(`${name} must be ${kind === "positive" ? "a number > 0" : "a whole number >= 0"}, got "${v}"`);
  return n;
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
  return {
    json: argValue("--json", argv),
    strict: argv.includes("--strict"),
    help: argv.includes("--help") || argv.includes("-h"),
    opts: {
      vault: resolve(argValue("--vault", argv) ?? THIS_VAULT),
      sizeLimitKB: numberFlag(argv, "--size-limit", 30, "positive"),
      maxOut: numberFlag(argv, "--max-out", 3, "whole"),
      writeBaseline: argv.includes("--write-sources-baseline"),
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
