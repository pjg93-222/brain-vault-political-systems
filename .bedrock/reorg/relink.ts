// Link-model tool of the Phase 2 reorganisation (plan A.5, sections 4-6). It trims curated notes to the link model of
// keep.json, writes the reciprocal lines, wraps each project's Related sections in a `## Map`, adds the Map rows and the C6
// back-links, and reconciles one-way links. It never touches a fleeting note, log.md or index.md, runs no git command that
// writes, and never pushes (Owner decisions 1 and 7).
//
//   bun .bedrock/reorg/relink.ts --spec <keep.json> (--pending <pending-splits.txt> | --no-pending)
//                                (--dry-run [--out <dir>] | --apply | --maps | --reconcile)
//                                [--manifest <file>] [--date YYYY-MM-DD] [--vault <dir>] [--json <file>]
//
//   --dry-run     simulate --apply, --maps and --reconcile in memory and print, per note, every conversion, insertion and
//                 the resulting out-links, then the predicted check.ts numbers of the simulated tree; writes nothing in the
//                 vault (--out <dir> also saves the predicted text of every note that would change, for diffing)
//   --apply       the link trim: C1/C2 conversions for the keep lists (4.7), people/paul-goff (4.6) and R2, the concept lines
//                 of section 6 (C5) and any R1/R3 line a keep list needs
//   --maps        section 5: the `## Map` wrapper of every project, the Map rows of keep.json concepts, the C6 back-links
//   --reconcile   loops on check.ts output: every one-way link between curated notes is resolved by R1-R4 (or the C5
//                 reciprocal of a keep.json concept); a one-way link no rule covers is a spec error (exit 1)
//   --pending     the notes waiting for their split batch: such a note is only touched as plan 4.7 / A.5 allow (its Paul
//                 links, R2 on links to the keep.json leaves that do not keep it, the section-6 concept lines; a pending
//                 project also gets its Map wrapper and the keep.json concept rows); any other planned edit is refused.
//                 Required: without it relink.ts refuses to run, unless --no-pending says the split batches are over
//   --manifest    the batch manifest: every touched note path is appended once (required by --apply, --maps, --reconcile)
//   --date        the updated_at value stamped on every touched note (default: today, local time)
//
// keep.json (plan A.5):
//   { "leaves":   { "<rel>": { "home": "<project rel>" | null, "keep": ["<rel>", ...] } },   the non-split leaves (4.7)
//     "paul":     ["<rel>", ...],                                                            people/paul-goff keeps (4.6)
//     "named":    [["<rel>", "<rel>"], ...],                                                 named leaf pairs (D1-D6)
//     "concepts": { "<slug>": { "leaves": [...], "hubs": [...], "projects": [...],          section 6 links, C6 back-links
//                               "why": { "<rel>": "<text>" } } } }                           optional reciprocal-line text
//   Paths are vault-relative, ".md" optional.
//
// The rules (plan 4.4-4.5): C1 body [[x|y]] -> y, [[x]] -> the title of x (title, else name, else the slug; exactly what
// conserve.ts normalises to); C2 frontmatter "[[x]]" -> "x"; C3 sources: and part_of are never converted; C5 reciprocal
// lines `- [[x]] — <text>` (a missing section is created before `## Related Topics`, or at the end); C6 a concept or actor in
// a Map links the project back; R1 a hub a leaf keeps links the leaf; R2 a note links a leaf that does not keep it: the
// link becomes plain text; R3 named pairs link both ways; R4 every Map row has its back-link. Mentions and links mean what
// graph/extract.ts and check.ts mean (frontmatter minus sources, plus body; first note with that file name; no self links).
// Every touched note gets updated_at and updated_by "reorg@agent"; notes are written atomically and with LF line endings.
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { listNotes } from "../graph/extract.ts";

const THIS_VAULT = resolve(import.meta.dir, "..", "..");
export const PAUL = "people/paul-goff";
const FLEETING_TOP = "fleeting";
const HUB_TOPS = new Set(["projects", "concepts", "actors", "people", "teams"]);
const LEAF_TOPS = new Set(["topics", "discussions"]);
export const MAP_SECTIONS = ["Related Topics", "Discussions", "Related Actors", "Related Concepts", "Related Projects", "Related Teams"];
export const MAP_INTRO = "Every note of this project by type, one line each; parts follow their parent.";
const UPDATED_BY = "reorg@agent";
const TABLE_SUMMARY_MAX = 100;
const WIKI = /!?\[\[([^\[\]\n]*?)\]\]/g;
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export class Refusal extends Error {}

// =====================================================================================================================
// notes

export type Note = {
  rel: string; // "topics/x"
  path: string; // "topics/x.md"
  abs: string;
  slug: string;
  top: string;
  fleeting: boolean;
  bom: boolean;
  finalNewline: boolean;
  /** the text as first read, line endings normalised to LF (change detection) */
  origText: string;
  /** the working lines (LF, no CR) */
  lines: string[];
};
export type Vault = { root: string; notes: Note[]; byRel: Map<string, Note>; relBySlug: Map<string, string> };

export function loadVault(root: string): Vault {
  const notes: Note[] = listNotes(root).map((f) => {
    const raw = readFileSync(f.abs, "utf8");
    const bom = raw.charCodeAt(0) === 0xfeff;
    const text = (bom ? raw.slice(1) : raw).replace(/\r\n/g, "\n");
    const finalNewline = text.endsWith("\n");
    const lines = text.split("\n");
    if (finalNewline) lines.pop();
    return { rel: f.rel, path: f.rel + ".md", abs: f.abs, slug: f.slug, top: f.top, fleeting: f.top === FLEETING_TOP, bom, finalNewline, origText: lines.join("\n"), lines };
  });
  const byRel = new Map(notes.map((n) => [n.rel, n]));
  const relBySlug = new Map<string, string>();
  for (const n of notes) if (!relBySlug.has(n.slug)) relBySlug.set(n.slug, n.rel);
  return { root, notes, byRel, relBySlug };
}
export const noteText = (n: Note) => (n.bom ? "\uFEFF" : "") + n.lines.join("\n") + (n.finalNewline ? "\n" : "");
export const changed = (n: Note) => n.lines.join("\n") !== n.origText;

/** index of the closing "---" of the frontmatter, or -1 (no frontmatter, or never closed); the same rule as splitFrontmatter */
export function fmEnd(lines: string[]): number {
  if (!lines.length || !/^---[ \t]*$/.test(lines[0])) return -1;
  for (let i = 1; i < lines.length; i++) if (/^---[ \t]*$/.test(lines[i])) return i;
  return -1;
}
export function yamlOf(n: Note): Record<string, unknown> {
  const e = fmEnd(n.lines);
  if (e < 0) return {};
  try {
    const y: unknown = Bun.YAML.parse(n.lines.slice(1, e).join("\n"));
    return y && typeof y === "object" && !Array.isArray(y) ? (y as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
const scalar = (v: unknown): string | null => ((typeof v === "string" || typeof v === "number") && String(v).trim() ? String(v).trim() : null);
/** C1 title: title, else name, else the slug (trimmed), as conserve.ts titleIndex */
export function titleOf(n: Note): string {
  const y = yamlOf(n);
  return scalar(y.title) ?? scalar(y.name) ?? n.slug;
}
export const bodyStart = (n: Note) => fmEnd(n.lines) + 1;
export const isLeafNote = (n: Note) => !n.fleeting && (LEAF_TOPS.has(n.top) || hasPartOf(n));
export const isHubNote = (n: Note) => !n.fleeting && HUB_TOPS.has(n.top) && !hasPartOf(n);
/** part_of holds a value (check.ts rawKeyBlock + hasValue: the key's line plus its indented or "- " continuation lines) */
export function hasPartOf(n: Note): boolean {
  const e = fmEnd(n.lines);
  if (e < 0) return false;
  for (let i = 1; i < e; i++) {
    if (!/^part_of\s*:/.test(n.lines[i])) continue;
    const block = [n.lines[i].replace(/^part_of\s*:/, "")];
    for (let j = i + 1; j < e && (/^\s/.test(n.lines[j]) || /^-(\s|$)/.test(n.lines[j])); j++) block.push(n.lines[j]);
    return block.join("\n").replace(/null|~|["'\[\]\s]/g, "") !== "";
  }
  return false;
}

// =====================================================================================================================
// links (the graph's rule: frontmatter minus sources, plus body; exact path first, then the first note with that name)

/** "folder/name#heading|alias" -> "folder/name" (no extension, forward slashes) */
export function wikiPath(inner: string): string {
  let t = inner.replace(/\\\|/g, "|");
  const pipe = t.indexOf("|");
  if (pipe >= 0) t = t.slice(0, pipe);
  const hash = t.indexOf("#");
  if (hash >= 0) t = t.slice(0, hash);
  return t.trim().replace(/\\/g, "/").replace(/\.md$/i, "");
}
export function resolveInner(v: Vault, inner: string): string | null {
  const p = wikiPath(inner);
  if (v.byRel.has(p)) return p;
  return v.relBySlug.get(p.split("/").pop()!) ?? null;
}
export type LineKind = { fm: boolean; key: string | null; scanned: boolean };
/** per line: frontmatter or body, its top-level key, and whether the graph scans it (not the sources: block) */
export function lineKinds(n: Note): LineKind[] {
  const e = fmEnd(n.lines);
  const kinds: LineKind[] = [];
  let key: string | null = null;
  let inSources = false;
  n.lines.forEach((l, i) => {
    if (e < 0 || i > e) return kinds.push({ fm: false, key: null, scanned: true });
    if (i === 0 || i === e) return kinds.push({ fm: true, key: null, scanned: false });
    const k = l.match(/^([A-Za-z0-9_][A-Za-z0-9_.\-]*)\s*:/);
    if (k) {
      key = k[1];
      inSources = key === "sources";
    } else if (inSources && !(/^(\s+|-\s|-$)/.test(l) || l.trim() === "")) inSources = false;
    kinds.push({ fm: true, key, scanned: !inSources });
  });
  return kinds;
}
export type Mention = { line: number; target: string; fm: boolean; key: string | null; raw: string };
export function mentionsOf(v: Vault, n: Note): Mention[] {
  const out: Mention[] = [];
  const kinds = lineKinds(n);
  n.lines.forEach((l, i) => {
    if (!kinds[i].scanned) return;
    for (const m of l.matchAll(WIKI)) {
      const t = resolveInner(v, m[1]);
      if (t === null || t === n.rel) continue;
      out.push({ line: i, target: t, fm: kinds[i].fm, key: kinds[i].key, raw: m[0] });
    }
  });
  return out;
}
export function outTargets(v: Vault, n: Note): Map<string, number> {
  const m = new Map<string, number>();
  for (const x of mentionsOf(v, n)) m.set(x.target, (m.get(x.target) ?? 0) + 1);
  return m;
}
/** curated one-way links (pairs with a fleeting end are exempt), computed from the in-memory notes */
export function oneWayLinks(v: Vault): { from: string; to: string }[] {
  const out = new Map(v.notes.map((n) => [n.rel, outTargets(v, n)]));
  const res: { from: string; to: string }[] = [];
  for (const n of v.notes) {
    if (n.fleeting) continue;
    for (const t of out.get(n.rel)!.keys()) if (!v.byRel.get(t)!.fleeting && !out.get(t)!.has(n.rel)) res.push({ from: n.rel, to: t });
  }
  return res.sort((a, b) => cmp(a.from, b.from) || cmp(a.to, b.to));
}

// =====================================================================================================================
// sections

export type Heading = { idx: number; level: number; text: string };
export function headingsOf(n: Note): Heading[] {
  const res: Heading[] = [];
  let fence = false;
  for (let i = bodyStart(n); i < n.lines.length; i++) {
    const l = n.lines[i];
    if (/^\s*(```|~~~)/.test(l)) fence = !fence;
    if (fence) continue;
    const h = l.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (h) res.push({ idx: i, level: h[1].length, text: h[2].trim() });
  }
  return res;
}
export type Section = { head: number; end: number; level: number; text: string };
export function findSection(n: Note, text: string, level: number | null = 2, within?: Section): Section | null {
  const hs = headingsOf(n);
  for (let k = 0; k < hs.length; k++) {
    const h = hs[k];
    if (within && (h.idx <= within.head || h.idx >= within.end)) continue;
    if ((level !== null && h.level !== level) || h.text.toLowerCase() !== text.toLowerCase()) continue;
    const next = hs.slice(k + 1).find((x) => x.level <= h.level);
    return { head: h.idx, end: next ? next.idx : n.lines.length, level: h.level, text: h.text };
  }
  return null;
}
export const isItem = (l: string) => /^\s{0,3}[-*+]\s/.test(l);
export const isRow = (l: string) => /^\s*\|/.test(l);
/** the index after the last list item (with its indented continuation lines) or table row of the section, or -1 */
export function afterLastItem(n: Note, s: Section, row: boolean): number {
  let last = -1;
  for (let i = s.head + 1; i < s.end; i++) if (row ? isRow(n.lines[i]) : isItem(n.lines[i])) last = i;
  if (last < 0) return -1;
  let j = last + 1;
  if (!row) while (j < s.end && n.lines[j].trim() !== "" && /^\s+\S/.test(n.lines[j]) && !isItem(n.lines[j])) j++;
  return j;
}

// =====================================================================================================================
// summaries: the one-line summary the vault already uses for a note in its link lists, else its description

const ECHO_BULLET = /^\s*[-*]\s+\[\[([^\[\]\n]+?)\]\]\s+[-\u2014\u2013]\s+(.+?)\s*$/;
export function harvestSummaries(v: Vault): Map<string, string> {
  const counts = new Map<string, Map<string, number>>();
  const add = (inner: string, text: string) => {
    const t = resolveInner(v, inner);
    if (!t) return;
    const s = text.trim();
    if (!s || s.includes("[[") || s.length < 8) return;
    const m = counts.get(t) ?? new Map<string, number>();
    m.set(s, (m.get(s) ?? 0) + 1); // insertion order = first seen: the tie-break
    counts.set(t, m);
  };
  for (const n of v.notes) {
    if (n.fleeting) continue;
    for (let i = bodyStart(n); i < n.lines.length; i++) {
      const l = n.lines[i];
      const b = l.match(ECHO_BULLET);
      if (b) {
        add(b[1], b[2]);
        continue;
      }
      if (isRow(l)) {
        const cells = l.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim());
        const link = cells[0]?.match(/^\[\[([^\[\]\n]+?)\]\]$/);
        if (link && cells.length >= 2) add(link[1], cells[1]);
      }
    }
  }
  const res = new Map<string, string>();
  for (const [t, m] of counts) {
    let best = "";
    let bc = 0;
    for (const [s, c] of m) if (c > bc) [best, bc] = [s, c];
    res.set(t, best);
  }
  return res;
}
function taglineOf(n: Note): string | null {
  const ls = n.lines.slice(bodyStart(n));
  const h1 = ls.findIndex((l) => /^#\s+\S/.test(l));
  if (h1 < 0) return null;
  for (let i = h1 + 1; i < ls.length; i++) {
    if (/^>\s?/.test(ls[i])) return ls[i].replace(/^>\s?/, "");
    if (/^#{1,6}\s/.test(ls[i])) return null;
  }
  return null;
}
/** index of the tagline line (the first blockquote after the H1), or -1 */
export function taglineIdx(n: Note): number {
  let h1 = -1;
  for (let i = bodyStart(n); i < n.lines.length; i++) {
    if (h1 < 0) {
      if (/^#\s+\S/.test(n.lines[i])) h1 = i;
      continue;
    }
    if (/^>\s?/.test(n.lines[i])) return i;
    if (/^#{1,6}\s/.test(n.lines[i])) return -1;
  }
  return -1;
}
export function plainOf(v: Vault, s: string): string {
  return s.replace(WIKI, (_m, inner: string) => {
    const u = inner.replace(/\\\|/g, "|");
    const p = u.indexOf("|");
    if (p >= 0) return u.slice(p + 1);
    const t = resolveInner(v, inner);
    return t ? titleOf(v.byRel.get(t)!) : wikiPath(inner);
  });
}
export function summaryOf(v: Vault, harvest: Map<string, string>, rel: string): string {
  const h = harvest.get(rel);
  if (h) return h;
  const n = v.byRel.get(rel)!;
  const y = yamlOf(n);
  const d = scalar(y.description) ?? scalar(y.summary);
  if (d) return plainOf(v, d).replace(/\s+/g, " ");
  const tl = taglineOf(n);
  if (tl) {
    const t = plainOf(v, tl).replace(/\s+/g, " ").trim();
    const m = t.match(/^(.+?[.!?])(\s|$)/);
    return m ? m[1] : t;
  }
  return titleOf(n);
}
export function clip(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,;:.\-]+$/, "") + "\u2026";
}

// =====================================================================================================================
// the spec

export type Spec = {
  leaves: Map<string, { home: string | null; keep: string[] }>;
  paul: string[];
  named: [string, string][];
  concepts: Map<string, { rel: string; leaves: string[]; hubs: string[]; projects: string[]; why: Map<string, string> }>;
};
const relArg = (p: string) => p.trim().replace(/\\/g, "/").replace(/^\.\//, "").replace(/\.md$/i, "");

export function loadSpec(file: string, v: Vault, pending: Set<string>): Spec {
  if (!existsSync(file)) throw new Refusal(`--spec ${file} does not exist`);
  let j: any;
  try {
    j = JSON.parse(readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
  } catch (e) {
    throw new Refusal(`--spec ${file} is not valid JSON: ${(e as Error).message}`);
  }
  const errors: string[] = [];
  const curated = (rel: string, what: string): boolean => {
    const n = v.byRel.get(rel);
    if (!n) return errors.push(`${what}: ${rel} is not a note of the vault`), false;
    if (n.fleeting) return errors.push(`${what}: ${rel} is a fleeting note (no batch links to or from fleeting notes, Owner decision 1)`), false;
    return true;
  };
  const leaves = new Map<string, { home: string | null; keep: string[] }>();
  for (const [k, val] of Object.entries<any>(j.leaves ?? {})) {
    const rel = relArg(k);
    if (!curated(rel, "leaves")) continue;
    const n = v.byRel.get(rel)!;
    if (!isLeafNote(n)) errors.push(`leaves: ${rel} is not a leaf (topics/, discussions/ or part_of)`);
    if (pending.has(rel)) errors.push(`leaves: ${rel} is pending split; its links are trimmed at its split, not from keep.json`);
    const home = val?.home == null ? null : relArg(String(val.home));
    if (home !== null && curated(home, `leaves.${rel}.home`) && v.byRel.get(home)!.top !== "projects") errors.push(`leaves.${rel}.home: ${home} is not a projects/ note`);
    const keep = (Array.isArray(val?.keep) ? val.keep : []).map((x: unknown) => relArg(String(x)));
    for (const x of keep) {
      curated(x, `leaves.${rel}.keep`);
      if (x === rel) errors.push(`leaves.${rel}.keep lists the leaf itself`);
      if (x === home) errors.push(`leaves.${rel}.keep repeats its home ${home}`);
    }
    if (new Set(keep).size !== keep.length) errors.push(`leaves.${rel}.keep lists a target twice`);
    leaves.set(rel, { home, keep });
  }
  const paul = (Array.isArray(j.paul) ? j.paul : []).map((x: unknown) => relArg(String(x)));
  if (!v.byRel.has(PAUL)) errors.push(`${PAUL} is not a note of the vault`);
  for (const x of paul) curated(x, "paul");
  const named: [string, string][] = [];
  for (const p of Array.isArray(j.named) ? j.named : []) {
    if (!Array.isArray(p) || p.length !== 2) {
      errors.push(`named: ${JSON.stringify(p)} is not a pair`);
      continue;
    }
    const [a, b] = p.map((x: unknown) => relArg(String(x)));
    if (curated(a, "named") && curated(b, "named")) {
      for (const x of [a, b]) if (!isLeafNote(v.byRel.get(x)!)) errors.push(`named: ${x} is not a leaf`);
      named.push([a, b]);
    }
  }
  const concepts = new Map<string, { rel: string; leaves: string[]; hubs: string[]; projects: string[]; why: Map<string, string> }>();
  for (const [slug, val] of Object.entries<any>(j.concepts ?? {})) {
    const rel = "concepts/" + slug;
    if (!curated(rel, "concepts")) continue;
    const list = (k: string) => (Array.isArray(val?.[k]) ? val[k] : []).map((x: unknown) => relArg(String(x)));
    const c = { rel, leaves: list("leaves"), hubs: list("hubs"), projects: list("projects"), why: new Map<string, string>() };
    for (const x of c.leaves) if (curated(x, `concepts.${slug}.leaves`) && !isLeafNote(v.byRel.get(x)!)) errors.push(`concepts.${slug}.leaves: ${x} is not a leaf`);
    for (const x of c.hubs) if (curated(x, `concepts.${slug}.hubs`) && (!isHubNote(v.byRel.get(x)!) || v.byRel.get(x)!.top === "projects")) errors.push(`concepts.${slug}.hubs: ${x} is not an actor, concept, person or team hub`);
    for (const x of c.projects) if (curated(x, `concepts.${slug}.projects`) && v.byRel.get(x)!.top !== "projects") errors.push(`concepts.${slug}.projects: ${x} is not a projects/ note`);
    for (const [k, t] of Object.entries<any>(val?.why ?? {})) c.why.set(relArg(k), String(t));
    for (const k of c.why.keys()) if (![...c.leaves, ...c.hubs, ...c.projects].includes(k)) errors.push(`concepts.${slug}.why: ${k} is not one of its leaves, hubs or projects`);
    concepts.set(slug, c);
  }
  // keep lists, the Paul list and the named pairs must agree with each other (the link model is bidirectional)
  const keeps = (rel: string): Set<string> | null => {
    const l = leaves.get(rel);
    return l ? new Set([...(l.home ? [l.home] : []), ...l.keep]) : null;
  };
  for (const [a, b] of named) {
    if (keeps(a) && !keeps(a)!.has(b)) errors.push(`named pair ${a} <-> ${b}: ${a} does not keep ${b}`);
    if (keeps(b) && !keeps(b)!.has(a)) errors.push(`named pair ${a} <-> ${b}: ${b} does not keep ${a}`);
  }
  for (const [rel, l] of leaves) {
    if (l.keep.includes(PAUL) && !paul.includes(rel)) errors.push(`leaves.${rel} keeps ${PAUL}, but the paul list does not keep ${rel}`);
    for (const t of l.keep) {
      const k = keeps(t);
      if (k && !k.has(rel)) errors.push(`leaves.${rel} keeps ${t}, but ${t} does not keep ${rel} (a one-way link)`);
    }
  }
  for (const x of paul) if (keeps(x) && !keeps(x)!.has(PAUL)) errors.push(`paul keeps ${x}, but ${x} does not keep ${PAUL}`);
  for (const [slug, c] of concepts) for (const L of c.leaves) if (keeps(L) && !keeps(L)!.has(c.rel)) errors.push(`concepts.${slug}.leaves lists ${L}, whose keep list does not keep ${c.rel}`);
  if (errors.length) throw new Refusal(`keep.json has ${errors.length} problem(s):\n  ` + errors.join("\n  "));
  return { leaves, paul, named, concepts };
}

// =====================================================================================================================
// edits

export type Phase = "apply" | "maps" | "reconcile" | "split";
export type Edit = { phase: Phase; note: string; kind: "convert" | "insert" | "create-section" | "wrap" | "demote" | "stamp"; rule: string; line?: number; old?: string; new?: string; section?: string; tagline?: boolean };

export type Ctx = { v: Vault; spec: Spec; pending: Set<string>; harvest: Map<string, string>; date: string; edits: Edit[]; phase: Phase };
const slugOf = (ctx: Ctx, rel: string) => ctx.v.byRel.get(rel)!.slug;
/** the wikilink text for a target: its slug, or its path when the slug is shared or resolves elsewhere */
export function linkName(ctx: Ctx, rel: string): string {
  const s = slugOf(ctx, rel);
  return ctx.v.relBySlug.get(s) === rel ? s : rel;
}

/** C1 / C2: turn every mention of a target in `targets` into plain text; returns the number of mentions converted */
export function convertMentions(ctx: Ctx, n: Note, targets: Map<string, string>): number {
  if (n.fleeting) throw new Error(`internal: a conversion was planned in the fleeting note ${n.rel}`);
  const kinds = lineKinds(n);
  const tl = taglineIdx(n);
  let count = 0;
  n.lines.forEach((l, i) => {
    if (!kinds[i].scanned) return;
    if (kinds[i].fm && kinds[i].key === "part_of") return; // C3
    const out = l.replace(WIKI, (m, inner: string) => {
      const t = resolveInner(ctx.v, inner);
      if (t === null || !targets.has(t)) return m;
      count++;
      let rep: string;
      if (kinds[i].fm) rep = wikiPath(inner); // C2: "[[x]]" -> "x"
      else {
        const u = inner.replace(/\\\|/g, "|");
        const p = u.indexOf("|");
        rep = p >= 0 ? u.slice(p + 1) : titleOf(ctx.v.byRel.get(t)!); // C1
      }
      ctx.edits.push({ phase: ctx.phase, note: n.path, kind: "convert", rule: targets.get(t)!, line: i + 1, old: m, new: rep, section: kinds[i].fm ? `frontmatter ${kinds[i].key}` : undefined, tagline: i === tl });
      return rep;
    });
    n.lines[i] = out;
  });
  return count;
}

export type Where = { section: string; level: number; within?: { text: string; level: number }; create: "before-related-topics" | "after-related-actors" };
/** insert one line into a section (created where the plan says when missing), keeping the section's list or table form */
export function insertLine(ctx: Ctx, n: Note, w: Where, line: string, rule: string, rowLine?: string) {
  if (n.fleeting) throw new Error(`internal: an insertion was planned in the fleeting note ${n.rel}`);
  const within = w.within ? findSection(n, w.within.text, w.within.level) ?? undefined : undefined;
  if (w.within && !within) throw new Error(`internal: ${n.rel} has no "${"#".repeat(w.within.level)} ${w.within.text}" section`);
  const s = findSection(n, w.section, w.level, within);
  const headText = "#".repeat(w.level) + " " + w.section;
  if (s) {
    const tableSection = afterLastItem(n, s, true) >= 0 && afterLastItem(n, s, false) < 0;
    const text = tableSection && rowLine ? rowLine : line;
    let at = afterLastItem(n, s, isRow(text));
    if (at < 0) {
      // an empty section: the line goes right under the heading, with a blank line around it
      at = s.head + 1;
      const block = ["", text];
      if (n.lines[at] !== undefined && n.lines[at].trim() !== "") block.push("");
      n.lines.splice(at, 0, ...block);
      ctx.edits.push({ phase: ctx.phase, note: n.path, kind: "insert", rule, line: at + 2, new: text, section: headText });
      return;
    }
    n.lines.splice(at, 0, text);
    ctx.edits.push({ phase: ctx.phase, note: n.path, kind: "insert", rule, line: at + 1, new: text, section: headText });
    return;
  }
  // a missing section
  let at: number;
  let where: string;
  if (w.create === "after-related-actors" && within) {
    const actors = findSection(n, "Related Actors", w.level, within) ?? findSection(n, "Related Topics", w.level, within);
    at = actors ? actors.end : within.end;
    where = actors ? `after "${"#".repeat(w.level)} ${actors.text}"` : "at the end of the Map";
  } else {
    const rt = findSection(n, "Related Topics", 2);
    at = rt ? rt.head : n.lines.length;
    where = rt ? 'before "## Related Topics"' : "at the end of the note";
  }
  const block: string[] = [];
  if (at > 0 && n.lines[at - 1] !== undefined && n.lines[at - 1].trim() !== "") block.push("");
  block.push(headText, "", line);
  if (at < n.lines.length) block.push("");
  n.lines.splice(at, 0, ...block);
  ctx.edits.push({ phase: ctx.phase, note: n.path, kind: "create-section", rule, line: at + block.indexOf(headText) + 1, new: headText, section: where });
  ctx.edits.push({ phase: ctx.phase, note: n.path, kind: "insert", rule, line: at + block.lastIndexOf(line) + 1, new: line, section: headText });
}

/** the C5 receiving section of `receiver` for a line about `about` */
export function receivingSection(ctx: Ctx, receiver: Note, about: Note): Where {
  if (receiver.top === "concepts") return about.top === "concepts" ? { section: "Related Concepts", level: 2, create: "before-related-topics" } : { section: "Where it Applies", level: 2, create: "before-related-topics" };
  if (about.top === "concepts") return { section: "Related Concepts", level: 2, create: "before-related-topics" };
  if (receiver.top === "actors" && about.top === "projects") return { section: "Related Projects", level: 2, create: "before-related-topics" };
  if (about.top === "discussions" && (receiver.top === "actors" || receiver.top === "people" || receiver.top === "teams")) return { section: "Discussions", level: 2, create: "before-related-topics" };
  return { section: "Related Topics", level: 2, create: "before-related-topics" };
}
/** a project's Map section for a note of a type */
export function mapSectionFor(about: Note): string {
  return about.top === "topics" ? "Related Topics" : about.top === "discussions" ? "Discussions" : about.top === "actors" ? "Related Actors" : about.top === "concepts" ? "Related Concepts" : about.top === "projects" ? "Related Projects" : "Related Topics";
}

export function stamp(ctx: Ctx, n: Note) {
  if (fmEnd(n.lines) < 0) return;
  const set = (key: string, value: string) => {
    const e = fmEnd(n.lines);
    const i = n.lines.slice(0, e).findIndex((l) => new RegExp("^" + key + "\\s*:").test(l));
    const line = `${key}: ${value}`;
    if (i >= 0) {
      if (n.lines[i] !== line) {
        ctx.edits.push({ phase: ctx.phase, note: n.path, kind: "stamp", rule: "updated (section 10)", line: i + 1, old: n.lines[i], new: line });
        n.lines[i] = line;
      }
    } else {
      const tags = n.lines.slice(0, e).findIndex((l) => /^tags\s*:/.test(l));
      const at = tags >= 0 ? tags : fmEnd(n.lines);
      n.lines.splice(at, 0, line);
      ctx.edits.push({ phase: ctx.phase, note: n.path, kind: "stamp", rule: "updated (section 10)", line: at + 1, new: line });
    }
  };
  set("updated_at", ctx.date);
  set("updated_by", JSON.stringify(UPDATED_BY));
}

// =====================================================================================================================
// the model: what each note keeps

const isPending = (ctx: Ctx, rel: string) => ctx.pending.has(rel);
/** K(L) for a keep.json leaf */
function keepSet(ctx: Ctx, rel: string): Set<string> | null {
  const l = ctx.spec.leaves.get(rel);
  return l ? new Set([...(l.home ? [l.home] : []), ...l.keep]) : null;
}
/** does `leaf` keep `t`? keep.json leaves: their list; pending and other leaves keep what they link (minus the 4.6 / R2 drops) */
function keeps(ctx: Ctx, leaf: string, t: string, current: Map<string, Map<string, number>>): boolean {
  const k = keepSet(ctx, leaf);
  if (k) return k.has(t);
  if (t === PAUL && leaf !== PAUL && !ctx.spec.paul.includes(leaf)) return false;
  return current.get(leaf)?.has(t) ?? false;
}

function allOut(v: Vault) {
  return new Map(v.notes.map((n) => [n.rel, outTargets(v, n)]));
}

/** --apply: the 4.7 keep lists, 4.6 Paul, R2, the section-6 concept lines, R1/R3 lines a keep list needs */
export function planApply(ctx: Ctx) {
  ctx.phase = "apply";
  const { v, spec } = ctx;
  const cur = allOut(v);
  const drops = new Map<string, Map<string, string>>(); // note -> target -> rule
  const drop = (a: string, t: string, rule: string) => {
    const m = drops.get(a) ?? new Map<string, string>();
    if (!m.has(t)) m.set(t, rule);
    drops.set(a, m);
  };
  // (1) keep.json leaves: everything outside home + keep becomes plain text
  for (const [L] of spec.leaves) {
    const K = keepSet(ctx, L)!;
    for (const t of cur.get(L)!.keys()) if (!K.has(t) && !v.byRel.get(t)!.fleeting) drop(L, t, "keep list (4.7)");
  }
  // (2) people/paul-goff (4.6) and the R2 side of it in every other note
  if (v.byRel.has(PAUL)) {
    for (const t of cur.get(PAUL)!.keys()) if (!spec.paul.includes(t)) drop(PAUL, t, "Paul 50 -> 14 (4.6)");
    for (const n of v.notes) if (!n.fleeting && n.rel !== PAUL && cur.get(n.rel)!.has(PAUL) && !spec.paul.includes(n.rel)) drop(n.rel, PAUL, "Paul 4.6 (R2)");
  }
  // (3) R2: a note links a keep.json leaf that does not keep it
  for (const n of v.notes) {
    if (n.fleeting || spec.leaves.has(n.rel) || n.rel === PAUL) continue;
    for (const t of cur.get(n.rel)!.keys()) if (spec.leaves.has(t) && !keepSet(ctx, t)!.has(n.rel)) drop(n.rel, t, "R2");
  }
  for (const n of v.notes) {
    const d = drops.get(n.rel);
    if (d) convertMentions(ctx, n, d);
  }
  // (4) the section-6 concept lines (C5), both sides
  const now = () => allOut(v);
  for (const [slug, c] of spec.concepts) {
    const C = v.byRel.get(c.rel)!;
    for (const x of [...c.leaves, ...c.hubs]) {
      const X = v.byRel.get(x)!;
      const out = now();
      if (!out.get(x)!.has(c.rel)) insertLine(ctx, X, receivingSection(ctx, X, C), `- [[${linkName(ctx, c.rel)}]] \u2014 ${c.why.get(x) ?? summaryOf(v, ctx.harvest, c.rel)}`, `C5 concept line (section 6, ${slug})`);
      if (!now().get(c.rel)!.has(x)) insertLine(ctx, C, receivingSection(ctx, C, X), `- [[${linkName(ctx, x)}]] \u2014 ${summaryOf(v, ctx.harvest, x)}`, `C5 concept side (section 6, ${slug})`);
    }
  }
  // (5) a keep.json leaf keeps what it does not link yet, or keeps a note that does not link it back (R1 / R3)
  for (const [L, l] of spec.leaves) {
    const Ln = v.byRel.get(L)!;
    for (const t of [...(l.home ? [l.home] : []), ...l.keep]) {
      const out = now();
      if (!out.get(L)!.has(t)) throw new Refusal(`${L} keeps ${t} but does not link it, and ${t} is not a keep.json concept that wires it: the plan adds no other link (spec error)`);
      if (out.get(t)!.has(L)) continue;
      const T = v.byRel.get(t)!;
      if (t === PAUL) continue; // the paul list is checked against the keep lists in loadSpec
      if (T.top === "projects") insertMapRow(ctx, T, Ln, isLeafNote(T) ? "R3" : "R1 (Map row)");
      else insertLine(ctx, T, receivingSection(ctx, T, Ln), `- [[${linkName(ctx, L)}]] \u2014 ${summaryOf(v, ctx.harvest, L)}`, isLeafNote(T) ? "R3 named pair" : "R1");
    }
  }
}

/** a row for `about` in project P's Map (section 5 formats) */
function insertMapRow(ctx: Ctx, P: Note, about: Note, rule: string) {
  ensureMap(ctx, P);
  const sec = mapSectionFor(about);
  const sum = summaryOf(ctx.v, ctx.harvest, about.rel);
  const bullet = `- [[${linkName(ctx, about.rel)}]] - ${sum}`;
  const row = `| [[${linkName(ctx, about.rel)}]] | ${clip(sum, TABLE_SUMMARY_MAX)} |`;
  const table = sec === "Related Topics" || sec === "Related Actors";
  insertLine(ctx, P, { section: sec, level: 3, within: { text: "Map", level: 2 }, create: "after-related-actors" }, table ? row : bullet, rule, table ? row : undefined);
}

/** section 5: `## Map` + the intro sentence before the project's Related sections, each demoted one level */
export function ensureMap(ctx: Ctx, P: Note) {
  if (findSection(P, "Map", 2)) return;
  const hs = headingsOf(P);
  const isMapSec = (h: Heading) => h.level === 2 && MAP_SECTIONS.some((s) => s.toLowerCase() === h.text.toLowerCase());
  const first = hs.findIndex(isMapSec);
  if (first < 0) throw new Refusal(`${P.rel} has no Related section to wrap in a Map`);
  const block: Heading[] = [];
  for (let k = first; k < hs.length; k++) {
    if (hs[k].level > 2) continue;
    if (!isMapSec(hs[k])) break;
    block.push(hs[k]);
  }
  const later = hs.slice(first).filter((h) => isMapSec(h) && !block.includes(h));
  if (later.length) throw new Refusal(`${P.rel}: its Related sections are not contiguous (${later.map((h) => h.text).join(", ")} after another ## section); the Map wrapper would have to move lines`);
  for (const h of block) {
    const old = P.lines[h.idx];
    P.lines[h.idx] = "#" + old;
    ctx.edits.push({ phase: ctx.phase, note: P.path, kind: "demote", rule: "Map (section 5)", line: h.idx + 1, old, new: P.lines[h.idx] });
  }
  const at = hs[first].idx;
  const ins = ["## Map", "", MAP_INTRO, ""];
  if (at > 0 && P.lines[at - 1].trim() !== "") ins.unshift("");
  P.lines.splice(at, 0, ...ins);
  ctx.edits.push({ phase: ctx.phase, note: P.path, kind: "wrap", rule: "Map (section 5)", line: at + ins.indexOf("## Map") + 1, new: `## Map + "${MAP_INTRO}"`, section: `before "${block[0].text}"; demoted: ${block.map((h) => h.text).join(", ")}` });
}

/** --maps: the Map wrapper of every project, the keep.json concept rows, the C6 back-links */
export function planMaps(ctx: Ctx) {
  ctx.phase = "maps";
  const { v, spec } = ctx;
  for (const P of v.notes.filter((n) => n.top === "projects" && !n.fleeting)) ensureMap(ctx, P);
  for (const [slug, c] of spec.concepts) {
    for (const p of c.projects) {
      const P = v.byRel.get(p)!;
      const C = v.byRel.get(c.rel)!;
      if (!allOut(v).get(p)!.has(c.rel)) insertMapRow(ctx, P, C, `Map row (section 5, ${slug})`);
      if (!allOut(v).get(c.rel)!.has(p)) insertLine(ctx, C, { section: "Where it Applies", level: 2, create: "before-related-topics" }, `- [[${linkName(ctx, p)}]] \u2014 ${c.why.get(p) ?? summaryOf(v, ctx.harvest, p)}`, `C6 back-link (section 5, ${slug})`);
    }
  }
}

/** one reconcile pass over a list of one-way links: returns what it changed and what no rule covers */
export function reconcileStep(ctx: Ctx, oneWay: { from: string; to: string }[]): { fixed: number; errors: string[] } {
  ctx.phase = "reconcile";
  const { v, spec } = ctx;
  const errors: string[] = [];
  let fixed = 0;
  for (const { from, to } of oneWay) {
    const cur = allOut(v);
    if (!cur.get(from)?.has(to) || cur.get(to)?.has(from)) continue; // already resolved by an earlier step
    const A = v.byRel.get(from)!;
    const B = v.byRel.get(to)!;
    const named = spec.named.some(([a, b]) => (a === from && b === to) || (a === to && b === from));
    const concept = [...spec.concepts.values()].find((c) => c.rel === from && [...c.hubs, ...c.leaves].includes(to));
    if (isLeafNote(B) && !named && !keeps(ctx, to, from, cur)) {
      convertMentions(ctx, A, new Map([[to, "R2 (reconcile)"]]));
      fixed++;
    } else if (named) {
      insertLine(ctx, B, receivingSection(ctx, B, A), `- [[${linkName(ctx, from)}]] \u2014 ${summaryOf(v, ctx.harvest, from)}`, "R3 (reconcile)");
      fixed++;
    } else if (concept) {
      insertLine(ctx, B, receivingSection(ctx, B, A), `- [[${linkName(ctx, from)}]] \u2014 ${concept.why.get(to) ?? summaryOf(v, ctx.harvest, from)}`, "C5 concept line (reconcile)");
      fixed++;
    } else if (A.top === "projects" && (B.top === "concepts" || B.top === "actors")) {
      insertLine(ctx, B, receivingSection(ctx, B, A), `- [[${linkName(ctx, from)}]] \u2014 ${summaryOf(v, ctx.harvest, from)}`, "R4 / C6 back-link (reconcile)");
      fixed++;
    } else if (B.top === "projects" && (isLeafNote(A) ? keeps(ctx, from, to, cur) : true)) {
      insertMapRow(ctx, B, A, "R1 Map row (reconcile)");
      fixed++;
    } else if (isHubNote(B) && isLeafNote(A) && keeps(ctx, from, to, cur)) {
      insertLine(ctx, B, receivingSection(ctx, B, A), `- [[${linkName(ctx, from)}]] \u2014 ${summaryOf(v, ctx.harvest, from)}`, "R1 (reconcile)");
      fixed++;
    } else errors.push(`${from} -> ${to}: no rule of R1-R4 covers it (spec error, not a reason to add an unplanned link)`);
  }
  return { fixed, errors };
}

/** every planned edit on a pending note must be one the plan allows in this batch (4.7, A.5) */
export function pendingViolations(ctx: Ctx): string[] {
  const bad: string[] = [];
  for (const e of ctx.edits) {
    const rel = e.note.replace(/\.md$/, "");
    if (!isPending(ctx, rel)) continue;
    const n = ctx.v.byRel.get(rel)!;
    const ok =
      e.kind === "stamp" ||
      (e.kind === "convert" && (e.rule.startsWith("Paul") || e.rule.startsWith("R2"))) ||
      ((e.kind === "insert" || e.kind === "create-section") && e.rule.startsWith("C5 concept line")) ||
      (n.top === "projects" && (e.kind === "wrap" || e.kind === "demote" || ((e.kind === "insert" || e.kind === "create-section") && e.rule.startsWith("Map row (section 5"))));
    if (!ok) bad.push(`${e.note}: ${e.kind} (${e.rule})${e.old ? ` ${e.old}` : ""}${e.new ? ` -> ${e.new}` : ""}`);
  }
  return bad;
}

// =====================================================================================================================
// running

export type RunOpts = { vault: string; spec: string; pending: string | null; mode: "dry-run" | "apply" | "maps" | "reconcile"; manifest: string | null; date: string; out: string | null; json: string | null };

function readPending(file: string, v: Vault): Set<string> {
  if (!existsSync(file)) throw new Refusal(`--pending ${file} does not exist`);
  const rels = readFileSync(file, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).map(relArg).filter(Boolean);
  const unknown = rels.filter((r) => !v.byRel.has(r) || v.byRel.get(r)!.fleeting);
  if (unknown.length) throw new Refusal(`--pending lists ${unknown.length} path(s) that are not curated notes: ${unknown.slice(0, 5).join(", ")}`);
  return new Set(rels);
}

/** the notes the run changed, written atomically (LF) and appended to the manifest */
function writeChanges(ctx: Ctx, manifest: string | null): string[] {
  const touched = ctx.v.notes.filter(changed);
  for (const n of touched) {
    if (n.fleeting) throw new Error(`internal: refusing to write the fleeting note ${n.path}`);
    stamp(ctx, n);
  }
  for (const n of touched) writeAtomicFile(n.abs, noteText(n));
  if (manifest && touched.length) {
    const have = existsSync(manifest) ? readFileSync(manifest, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean) : [];
    const add = touched.map((n) => n.path).filter((p) => !have.includes(p));
    if (add.length) {
      const text = existsSync(manifest) ? readFileSync(manifest, "utf8") : "";
      writeAtomicFile(manifest, text + (text === "" || text.endsWith("\n") ? "" : "\n") + add.join("\n") + "\n");
    }
  }
  for (const n of touched) n.origText = n.lines.join("\n");
  return touched.map((n) => n.path);
}
export function writeAtomicFile(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = join(dirname(path), "." + path.split(/[\\/]/).pop() + ".tmp-" + process.pid);
  writeFileSync(tmp, content, { encoding: "utf8" });
  let last: unknown;
  for (let i = 0; i < 10; i++) {
    try {
      renameSync(tmp, path);
      return;
    } catch (e: any) {
      last = e;
      if (!["EPERM", "EBUSY", "EACCES"].includes(e?.code)) break;
      Bun.sleepSync(100);
    }
  }
  try {
    unlinkSync(tmp);
  } catch {
    /* gone */
  }
  throw last;
}

/** budget of a leaf in check.ts terms (plan 4.1): home = the project with the most mentions (ties by path) */
function budgetOf(v: Vault, n: Note) {
  const out = outTargets(v, n);
  const targets = [...out.keys()];
  const projects = targets.filter((t) => v.byRel.get(t)!.top === "projects");
  const home = [...projects].sort((x, y) => out.get(y)! - out.get(x)! || cmp(x, y))[0] ?? null;
  const others = targets.filter((t) => t !== home).sort(cmp);
  return { home, others };
}

function render(ctx: Ctx, before: Map<string, Map<string, number>>, reconcileErrors: string[], predicted: any | null): string {
  const L: string[] = [];
  const { v, spec } = ctx;
  const byNote = new Map<string, Edit[]>();
  for (const e of ctx.edits) byNote.set(e.note, [...(byNote.get(e.note) ?? []), e]);
  const order = v.notes.map((n) => n.path).filter((p) => byNote.has(p));
  for (const p of order) {
    const n = v.byRel.get(p.replace(/\.md$/, ""))!;
    const role = spec.leaves.has(n.rel) ? "keep.json leaf" : ctx.pending.has(n.rel) ? "PENDING split" : isLeafNote(n) ? "leaf" : isHubNote(n) ? "hub" : "other";
    L.push("", `== ${p}  [${role}]`);
    for (const e of byNote.get(p)!) {
      const at = e.line ? `L${e.line}` : "";
      if (e.kind === "convert") L.push(`   convert  ${at.padEnd(5)} ${e.section ?? "body"}: ${e.old} -> ${JSON.stringify(e.new)}  [${e.rule}]${e.tagline ? "  (TAGLINE LINE)" : ""}`);
      else if (e.kind === "insert") L.push(`   insert   ${at.padEnd(5)} in "${e.section}": ${e.new}  [${e.rule}]`);
      else if (e.kind === "create-section") L.push(`   section  ${at.padEnd(5)} ${e.new} (new, ${e.section})  [${e.rule}]`);
      else if (e.kind === "wrap") L.push(`   map      ${at.padEnd(5)} ${e.new} ${e.section}  [${e.rule}]`);
      else if (e.kind === "demote") L.push(`   demote   ${at.padEnd(5)} ${e.old} -> ${e.new}`);
      else if (e.kind === "stamp") L.push(`   stamp    ${at.padEnd(5)} ${e.old ?? "(new key)"} -> ${e.new}`);
    }
    const outNow = outTargets(v, n);
    const b = before.get(n.rel)!;
    const lost = [...b.keys()].filter((t) => !outNow.has(t)).sort(cmp);
    const gained = [...outNow.keys()].filter((t) => !b.has(t)).sort(cmp);
    let line = `   out-links ${b.size} -> ${outNow.size}`;
    if (isLeafNote(n)) {
      const bu = budgetOf(v, n);
      line += `; home ${bu.home ?? "-"}; others ${bu.others.length}: ${bu.others.join(", ") || "-"}`;
    }
    L.push(line);
    if (lost.length) L.push(`   dropped: ${lost.join(", ")}`);
    if (gained.length) L.push(`   gained:  ${gained.join(", ")}`);
  }
  // summary
  const count = (f: (e: Edit) => boolean) => ctx.edits.filter(f).length;
  const touched = new Set(ctx.edits.filter((e) => e.kind !== "stamp").map((e) => e.note));
  L.push("", "== summary ==");
  L.push(`notes touched: ${touched.size} (${[...touched].filter((p) => ctx.pending.has(p.replace(/\.md$/, ""))).length} pending split); fleeting notes touched: ${[...touched].filter((p) => p.startsWith(FLEETING_TOP + "/")).length}`);
  L.push(`conversions: ${count((e) => e.kind === "convert")} (body ${count((e) => e.kind === "convert" && !e.section)}, frontmatter ${count((e) => e.kind === "convert" && !!e.section)}; on a tagline line: ${count((e) => e.kind === "convert" && !!e.tagline)})`);
  for (const r of [...new Set(ctx.edits.filter((e) => e.kind === "convert").map((e) => e.rule))].sort()) L.push(`   ${r}: ${count((e) => e.kind === "convert" && e.rule === r)}`);
  L.push(`insertions: ${count((e) => e.kind === "insert")}; sections created: ${count((e) => e.kind === "create-section")}; Map wrappers: ${count((e) => e.kind === "wrap")} (headings demoted ${count((e) => e.kind === "demote")})`);
  for (const r of [...new Set(ctx.edits.filter((e) => e.kind === "insert").map((e) => e.rule.replace(/ \(section \d+, .*\)$/, "").replace(/ \(.*\)$/, "")))].sort()) L.push(`   ${r}: ${count((e) => e.kind === "insert" && e.rule.replace(/ \(section \d+, .*\)$/, "").replace(/ \(.*\)$/, "") === r)}`);
  if (v.byRel.has(PAUL)) L.push(`${PAUL} out-links: ${before.get(PAUL)!.size} -> ${outTargets(v, v.byRel.get(PAUL)!).size} (keep list ${spec.paul.length})`);
  L.push("keep.json leaves (check i: others = targets - home project):");
  for (const [rel] of spec.leaves) {
    const bu = budgetOf(v, v.byRel.get(rel)!);
    L.push(`   ${String(bu.others.length).padStart(2)} others  ${rel}  home ${bu.home ?? "-"}${bu.others.length > 3 ? "  OVER BUDGET" : ""}`);
  }
  const ow = oneWayLinks(v);
  L.push(`one-way links between curated notes after the run: ${ow.length}`);
  for (const o of ow) L.push(`   ${o.from} -> ${o.to}`);
  for (const e of reconcileErrors) L.push(`   SPEC ERROR ${e}`);
  const viol = pendingViolations(ctx);
  L.push(`pending-split notes: edits outside what 4.7 allows: ${viol.length}`);
  for (const x of viol) L.push(`   NOT ALLOWED ${x}`);
  if (predicted) {
    const g = predicted.graph;
    L.push(`predicted check.ts on the simulated tree: ${g.notes} notes (${g.curated} curated); links ${g.undirectedLinks} / directed ${g.directedLinks} / mentions ${g.mentions}; unresolved ${predicted.unresolved.occurrences}; one-way ${predicted.oneWay.links}; zero-incoming ${predicted.zeroIncoming.notes}; leaves over budget ${predicted.budget.over.length} (+${predicted.budget.pendingOver.length} pending); check i ${predicted.strict.checks.i.ok ? "ok" : "FAIL"}; ${PAUL} outgoing ${predicted.notes.find((x: any) => x.note === PAUL)?.outgoingLinks}`);
  }
  return L.join("\n");
}

async function predictedCheck(ctx: Ctx, pendingFile: string | null): Promise<any> {
  const dir = mkdtempSync(join(tmpdir(), "relink-dry-"));
  try {
    for (const n of ctx.v.notes) {
      const p = join(dir, ...n.path.split("/"));
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, noteText(n));
    }
    for (const f of ["CLAUDE.md", ".bedrock/reorg/sources-baseline.json"]) {
      const src = join(ctx.v.root, ...f.split("/"));
      if (existsSync(src)) {
        mkdirSync(dirname(join(dir, ...f.split("/"))), { recursive: true });
        copyFileSync(src, join(dir, ...f.split("/")));
      }
    }
    const { analyze } = await import("./check.ts");
    return await analyze({ vault: dir, sizeLimitKB: 50, maxOut: 3, writeBaseline: false, pendingFile, require: null });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export async function run(o: RunOpts): Promise<{ code: number; text: string }> {
  const v = loadVault(o.vault);
  const pending = o.pending ? readPending(o.pending, v) : new Set<string>();
  const spec = loadSpec(o.spec, v, pending);
  if (o.mode !== "dry-run" && !o.manifest) throw new Refusal(`--${o.mode} needs --manifest <batch manifest>`);
  const ctx: Ctx = { v, spec, pending, harvest: harvestSummaries(v), date: o.date, edits: [], phase: "apply" };
  const before = allOut(v);
  const out: string[] = [];
  let code = 0;
  let reconcileErrors: string[] = [];
  if (o.mode === "dry-run") {
    planApply(ctx);
    planMaps(ctx);
    for (let k = 0; k < 5; k++) {
      const ow = oneWayLinks(v);
      if (!ow.length) break;
      const r = reconcileStep(ctx, ow);
      reconcileErrors = r.errors;
      if (!r.fixed) break;
    }
    for (const n of v.notes.filter(changed)) stamp(ctx, n);
    const viol = pendingViolations(ctx);
    const predicted = await predictedCheck(ctx, o.pending);
    out.push(`relink.ts --dry-run (nothing written in the vault): ${o.vault}`);
    out.push(render(ctx, before, reconcileErrors, predicted));
    if (o.out) {
      for (const n of v.notes.filter(changed)) {
        const p = join(o.out, ...n.path.split("/"));
        mkdirSync(dirname(p), { recursive: true });
        writeFileSync(p, noteText(n));
      }
      out.push(`predicted text of ${v.notes.filter(changed).length} changed note(s) saved under ${o.out}`);
    }
    if (viol.length || reconcileErrors.length || oneWayLinks(v).length) code = 1;
  } else if (o.mode === "apply" || o.mode === "maps") {
    if (o.mode === "apply") planApply(ctx);
    else planMaps(ctx);
    const viol = pendingViolations(ctx);
    if (viol.length) throw new Refusal(`planned edits on pending-split notes that plan 4.7 does not allow (nothing was written):\n  ${viol.join("\n  ")}`);
    const written = writeChanges(ctx, o.manifest);
    out.push(render(ctx, before, [], null));
    out.push("", `relink.ts --${o.mode}: wrote ${written.length} note(s) atomically (LF); manifest ${o.manifest}`);
  } else {
    const { analyze } = await import("./check.ts");
    let last: { from: string; to: string }[] = [];
    for (let k = 1; k <= 10; k++) {
      const r = await analyze({ vault: o.vault, sizeLimitKB: 50, maxOut: 3, writeBaseline: false, pendingFile: o.pending, require: null });
      last = r.oneWay.items.map((i: any) => ({ from: i.from, to: i.to }));
      out.push(`reconcile pass ${k}: check.ts reports ${last.length} one-way link(s) between curated notes`);
      if (!last.length) break;
      const fresh = loadVault(o.vault);
      ctx.v = fresh;
      const step = reconcileStep(ctx, last);
      reconcileErrors = step.errors;
      const viol = pendingViolations(ctx);
      if (viol.length) throw new Refusal(`reconcile would edit pending-split notes beyond plan 4.7 (nothing more was written):\n  ${viol.join("\n  ")}`);
      const written = writeChanges(ctx, o.manifest);
      out.push(`   fixed ${step.fixed}; wrote ${written.length} note(s)${written.length ? ": " + written.join(", ") : ""}`);
      for (const e of step.errors) out.push(`   SPEC ERROR ${e}`);
      if (!step.fixed) break;
    }
    if (last.length) {
      const r = await analyze({ vault: o.vault, sizeLimitKB: 50, maxOut: 3, writeBaseline: false, pendingFile: o.pending, require: null });
      if (r.oneWay.items.length) {
        code = 1;
        out.push(`reconcile: ${r.oneWay.items.length} one-way link(s) left: ${r.oneWay.items.map((i: any) => `${i.from} -> ${i.to}`).join("; ")}`);
      } else out.push("reconcile: 0 one-way links between curated notes");
    } else out.push("reconcile: 0 one-way links between curated notes");
  }
  if (o.json) {
    mkdirSync(dirname(o.json), { recursive: true });
    writeFileSync(o.json, JSON.stringify({ tool: ".bedrock/reorg/relink.ts", mode: o.mode, vault: o.vault, date: o.date, edits: ctx.edits, reconcileErrors }, null, 2) + "\n");
  }
  return { code, text: out.join("\n") };
}

// =====================================================================================================================

const USAGE =
  "usage: bun .bedrock/reorg/relink.ts --spec <keep.json> (--pending <pending-splits.txt> | --no-pending) (--dry-run [--out <dir>] | --apply | --maps | --reconcile) [--manifest <file>] [--date YYYY-MM-DD] [--vault <dir>] [--json <file>]";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
/** an MSYS drive path (/c/Users/...) becomes C:/Users/... on Windows */
function pathArg(v: string): string {
  if (process.platform === "win32") {
    const m = v.match(/^\/([a-zA-Z])(\/.*)?$/);
    if (m) return resolve(m[1].toUpperCase() + ":" + (m[2] ?? "/"));
  }
  return resolve(v);
}

export function parseArgs(argv: string[]): RunOpts | "help" {
  const VALUE = ["--spec", "--pending", "--manifest", "--date", "--vault", "--json", "--out"];
  const MODES = ["--dry-run", "--apply", "--maps", "--reconcile"];
  const val: Record<string, string> = {};
  const flags = new Set<string>();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.startsWith("--") ? a.indexOf("=") : -1;
    const name = eq > 0 ? a.slice(0, eq) : a;
    if (name === "--help" || name === "-h") return "help";
    if (VALUE.includes(name)) {
      if (eq > 0) val[name] = a.slice(eq + 1);
      else {
        if (i + 1 >= argv.length || argv[i + 1].startsWith("--")) throw new Refusal(`${name} needs a value`);
        val[name] = argv[++i];
      }
    } else if (MODES.includes(name) || name === "--no-pending") flags.add(name);
    else throw new Refusal(`unknown argument ${a}`);
  }
  const modes = MODES.filter((m) => flags.has(m));
  if (modes.length !== 1) throw new Refusal("give exactly one of --dry-run, --apply, --maps, --reconcile");
  if (!val["--spec"]) throw new Refusal("--spec <keep.json> is required");
  if (!val["--pending"] && !flags.has("--no-pending")) throw new Refusal("--pending <pending-splits.txt> is required while notes wait for their split (plan A.5); pass --no-pending only after the last split batch");
  if (val["--pending"] && flags.has("--no-pending")) throw new Refusal("--pending and --no-pending exclude each other");
  if (val["--out"] && modes[0] !== "--dry-run") throw new Refusal("--out is only used with --dry-run");
  const date = val["--date"] ?? todayLocal();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Refusal(`--date ${date} is not YYYY-MM-DD`);
  return {
    vault: val["--vault"] ? pathArg(val["--vault"]) : THIS_VAULT,
    spec: pathArg(val["--spec"]),
    pending: val["--pending"] ? pathArg(val["--pending"]) : null,
    mode: modes[0].slice(2) as RunOpts["mode"],
    manifest: val["--manifest"] ? pathArg(val["--manifest"]) : null,
    date,
    out: val["--out"] ? pathArg(val["--out"]) : null,
    json: val["--json"] ? pathArg(val["--json"]) : null,
  };
}

if (import.meta.main) {
  try {
    const a = parseArgs(process.argv.slice(2));
    if (a === "help") console.log(USAGE);
    else {
      const r = await run(a);
      console.log(r.text);
      process.exitCode = r.code;
    }
  } catch (e) {
    console.error(`relink.ts: ${e instanceof Refusal ? "REFUSED: " : "FAILED: "}${(e as Error)?.message ?? e}`);
    if (!(e instanceof Refusal)) console.error((e as Error)?.stack ?? "");
    console.error(USAGE);
    process.exitCode = 1;
  }
}
