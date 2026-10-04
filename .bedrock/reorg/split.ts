// Split tool of the Phase 2 reorganisation (plan A.7, sections 3.1-3.2, 4.3-4.5, S1-S11; Owner decisions 4, 8, 9, 11, 13
// and 15). It turns an over-limit note into a hub plus parts, moving text verbatim, and wires the family into the link
// model. It never touches a fleeting note, log.md or index.md, runs no git command, and never pushes (decisions 1 and 7).
//
//   bun .bedrock/reorg/split.ts --spec <splits/x.json> [--spec <y.json> ...] (--plan | --apply | --verify)
//                               [--draft-s10 <file>] [--keep <keep.json>] [--pending <pending-splits.txt>]
//                               [--manifest <file>] [--positional-log <file>] [--allow <file>] [--date YYYY-MM-DD]
//                               [--out <dir>] [--vault <dir>] [--json <file>]
//
//   --plan     read-only: every section assigned exactly once, hub and part sizes, the 4.3 link proposal per part next
//              to the spec's keep list, K pairs and K candidates (created or skipped, with the reason), every S10 flag
//              with its automatic mark or "ask" and the spec's resolution, the S1 marker lines and cross candidates, the
//              R1/R2/R3 effects outside the family, Map rows, and the predicted check.ts numbers of the simulated tree.
//              --draft-s10 <file> writes, per spec, the s10 entries the spec still lacks (automatic proposals filled,
//              "ask" left open) for the executor to sign off; --out <dir> saves the predicted text of every changed note.
//   --apply    the same plan, then refuses (writing nothing) while any S10 flag is unresolved, a section is unassigned or
//              assigned twice, a hub or part is at or over 50 KB, a planned link is impossible, or a one-way link
//              between curated notes is left; otherwise writes parts, hubs and every other touched note atomically
//              (LF), appends every path to --manifest, and writes the S10 log (--positional-log, markdown) and the
//              conserve allowlist lines (--allow, "old => new" per rewrite).
//   --verify   the G-post re-detection: reads each family (hub and parts) as written and fails on any positional trigger
//              line the spec's s10 resolutions do not account for, and on a part or hub at or over 50 KB.
//   Several --spec files run as one batch in one process: every spec is planned against the same vault state (phase 1,
//   structure), then the link model runs once over all families (phase 2), so no spec sees another's half-applied edits.
//
// Spec (plan A.7): { id, parent, home, hub: { keep: [heading lines], links: [rels] | null }, parts: [{ slug, title,
//   summary, domain, home, sections: [heading lines in order], keep: [rels], s11?, pointers?: ["> ..."] }],
//   named: [{ id, a, b }] (K pairs; a is this family's part), candidates: [{ id, a, b, event }] (K12-K25),
//   relations: [{ id, part, with }] (D relations of a part), retarget: [{ note, from, to, why }] (C4 outside the family),
//   s10: [{ line, old, mark: "rewrite" | "same note" | "external" | "not positional", new?, referent?, why }] }
// hub.links null = an actor hub (no link cap: it keeps every link the R-rules allow); a list = a topic hub, which keeps its
// home project, its parts and exactly those targets (3.2 "Hub links").
//
// The rules applied (plan 3.1, 4.3-4.5): S1 cuts only at ## / ### boundaries, a later part taking ### children of a ##
// whose own text lives elsewhere starts with a verbatim copy of the ## heading line; S2 the hub keeps its frontmatter,
// everything before its first ##, the kept sections, and gains `## Parts` before its first ##; S4 part frontmatter = the
// folder template with every key, part_of, sources: [], parent's status/category/created_at, tags = parent's type/status/
// category + one domain; S5 part body = # title, "> <summary>. Part of [[parent]] (project [[home]]).", pointer lines, the
// moved sections; S10 positional references (detection, resolver, rewrites, log); C1/C2 conversions, C4 retargets, C5
// reciprocal lines, R1-R3, section-5 Map rows ("| [[part]] | part: <summary, at most 60 characters> |" after the parent).
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import * as R from "./relink.ts";

const THIS_VAULT = resolve(import.meta.dir, "..", "..");
const KB = 1024;
export const LIMIT_BYTES = 50 * KB; // refused at or over (S7, decision 8)
const TARGET_BYTES = 45 * KB; // warned at or over
const UPDATED_BY = "reorg@agent";
const PART_ROW_MAX = 60;
const MARKS = ["rewrite", "same note", "external", "not positional"] as const;
type Mark = (typeof MARKS)[number];
const WIKI = /!?\[\[([^\[\]\n]*?)\]\]/g;
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export class Refusal extends Error {}

// =====================================================================================================================
// spec

export type PartSpec = { slug: string; rel: string; folder: string; type: "topic" | "actor"; title: string; summary: string; domain: string; home: string; sections: string[]; keep: string[]; s11: boolean; pointers: string[] };
export type S10Res = { line: number; old: string; mark: Mark; new?: string; referent?: string; why?: string };
export type Pair = { id: string; a: string; b: string; event?: string };
export type SplitSpec = {
  file: string;
  id: string;
  parent: string;
  home: string;
  hub: { keep: string[]; links: string[] | null };
  parts: PartSpec[];
  named: Pair[];
  candidates: Pair[];
  relations: { id: string; part: string; with: string }[];
  retarget: { note: string; from: string; to: string; why: string }[];
  s10: S10Res[];
};
const relArg = (p: string) => String(p).trim().replace(/\\/g, "/").replace(/^\.\//, "").replace(/\.md$/i, "");
const slugOfRel = (rel: string) => rel.split("/").pop()!;

export function loadSplitSpec(file: string, v: R.Vault, written = false): SplitSpec {
  if (!existsSync(file)) throw new Refusal(`--spec ${file} does not exist`);
  let j: any;
  try {
    j = JSON.parse(readFileSync(file, "utf8").replace(/^﻿/, ""));
  } catch (e) {
    throw new Refusal(`--spec ${file} is not valid JSON: ${(e as Error).message}`);
  }
  const errors: string[] = [];
  const parent = relArg(j.parent ?? "");
  const P = v.byRel.get(parent);
  if (!P) errors.push(`parent ${parent} is not a note of the vault`);
  else if (P.fleeting) errors.push(`parent ${parent} is a fleeting note (Owner decision 1)`);
  else if (R.hasPartOf(P)) errors.push(`parent ${parent} is itself a part`);
  const home = relArg(j.home ?? "");
  const isProject = (r: string) => v.byRel.get(r)?.top === "projects";
  if (!isProject(home)) errors.push(`home ${home} is not a projects/ note`);
  const strList = (x: unknown, what: string): string[] => {
    if (x == null) return [];
    if (!Array.isArray(x)) return errors.push(`${what} is not a list`), [];
    return x.map((s) => String(s));
  };
  const hubKeep = strList(j.hub?.keep, "hub.keep");
  const hubLinks = j.hub?.links === null || j.hub?.links === undefined ? null : strList(j.hub.links, "hub.links").map(relArg);
  if (P && P.top === "topics" && hubLinks === null) errors.push(`a topic hub needs hub.links (plan 3.2 "Hub links"); null is for actor hubs`);
  if (P && P.top !== "topics" && hubLinks !== null) errors.push(`hub.links is only for topic hubs (an actor hub has no link cap)`);
  for (const t of hubLinks ?? []) if (!v.byRel.has(t) || v.byRel.get(t)!.fleeting) errors.push(`hub.links: ${t} is not a curated note`);
  const folder = P ? (P.top === "projects" ? "topics" : P.top) : "topics";
  const type: "topic" | "actor" = folder === "actors" ? "actor" : "topic";
  const parts: PartSpec[] = [];
  const slugs = new Set<string>();
  for (const [k, p] of (Array.isArray(j.parts) ? j.parts : []).entries()) {
    const slug = String(p?.slug ?? "").trim();
    const what = `parts[${k}] ${slug}`;
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) errors.push(`${what}: slug must be lower-case kebab`);
    if (slugs.has(slug)) errors.push(`${what}: slug repeated`);
    slugs.add(slug);
    // before the split a part slug must be new; after it (--verify) the part must exist as a part of this parent
    if (!written && v.relBySlug.has(slug)) errors.push(`${what}: a note named ${slug} already exists (${v.relBySlug.get(slug)})`);
    if (written && !v.relBySlug.has(slug)) errors.push(`${what}: the written part ${slug} does not exist`);
    const title = String(p?.title ?? "").trim();
    const summary = String(p?.summary ?? "").trim().replace(/\.$/, "");
    if (!title) errors.push(`${what}: title missing`);
    if (summary.length < 25) errors.push(`${what}: summary missing or shorter than 25 characters (recall's firstSentence needs 25)`);
    if (/\.\s+[A-Z0-9"'(\[]/.test(summary)) errors.push(`${what}: the summary must be one sentence (it is the first sentence recall and index.md read)`);
    const domain = String(p?.domain ?? "");
    if (!/^domain\/[a-z0-9-]+$/.test(domain)) errors.push(`${what}: domain must be domain/<name>`);
    const phome = relArg(p?.home ?? home);
    if (!isProject(phome)) errors.push(`${what}: home ${phome} is not a projects/ note`);
    const sections = strList(p?.sections, `${what}.sections`);
    if (!sections.length) errors.push(`${what}: no sections`);
    const keep = strList(p?.keep, `${what}.keep`).map(relArg);
    const s11 = !!p?.s11;
    const cap = s11 ? 2 : 3;
    if (keep.length > cap) errors.push(`${what}: keep lists ${keep.length} others, more than ${cap}${s11 ? " (S11 reserves the third slot)" : ""}`);
    const pointers = strList(p?.pointers, `${what}.pointers`);
    for (const pl of pointers) if (!/^> \S/.test(pl)) errors.push(`${what}: pointer line must start with "> " (S5): ${pl.slice(0, 60)}`);
    parts.push({ slug, rel: folder + "/" + slug, folder, type, title, summary, domain, home: phome, sections, keep, s11, pointers });
  }
  if (!parts.length) errors.push("no parts");
  const partRels = new Set(parts.map((p) => p.rel));
  for (const p of parts)
    for (const t of p.keep) {
      if (partRels.has(t)) errors.push(`${p.slug}.keep lists its sibling ${t} (sibling links come only from S10 rewrites)`);
      else if (!v.byRel.has(t) && !/^[a-z]+\//.test(t)) errors.push(`${p.slug}.keep: ${t} is not a vault-relative path`);
    }
  const pairs = (x: unknown, what: string): Pair[] =>
    (Array.isArray(x) ? x : []).map((e: any, k: number) => {
      const pr = { id: String(e?.id ?? `${what}${k}`), a: relArg(e?.a ?? ""), b: relArg(e?.b ?? ""), event: e?.event ? String(e.event) : undefined };
      if (!partRels.has(pr.a)) errors.push(`${what} ${pr.id}: a = ${pr.a} is not a part of this spec`);
      return pr;
    });
  const named = pairs(j.named, "named");
  const candidates = pairs(j.candidates, "candidates");
  const relations = (Array.isArray(j.relations) ? j.relations : []).map((e: any) => {
    const r = { id: String(e?.id ?? ""), part: relArg(e?.part ?? ""), with: relArg(e?.with ?? "") };
    if (!partRels.has(r.part)) errors.push(`relations ${r.id}: ${r.part} is not a part of this spec`);
    if (!v.byRel.has(r.with)) errors.push(`relations ${r.id}: ${r.with} is not a note`);
    return r;
  });
  const retarget = (Array.isArray(j.retarget) ? j.retarget : []).map((e: any) => {
    const r = { note: relArg(e?.note ?? ""), from: relArg(e?.from ?? ""), to: relArg(e?.to ?? ""), why: String(e?.why ?? "") };
    if (!v.byRel.has(r.note) || v.byRel.get(r.note)!.fleeting) errors.push(`retarget: ${r.note} is not a curated note`);
    if (r.from !== parent) errors.push(`retarget: from must be the parent ${parent}`);
    if (!partRels.has(r.to)) errors.push(`retarget: to ${r.to} is not a part of this spec`);
    return r;
  });
  const s10: S10Res[] = [];
  for (const [k, e] of (Array.isArray(j.s10) ? j.s10 : []).entries()) {
    const what = `s10[${k}] line ${e?.line}`;
    const mark = String(e?.mark ?? "") as Mark;
    if (!MARKS.includes(mark)) {
      errors.push(`${what}: mark must be one of ${MARKS.join(", ")} (got ${JSON.stringify(e?.mark)})`);
      continue;
    }
    if (!Number.isInteger(e?.line) || typeof e?.old !== "string") {
      errors.push(`${what}: needs an integer line and the old line text`);
      continue;
    }
    if (mark === "rewrite" && typeof e?.new !== "string") errors.push(`${what}: a rewrite needs the new line text`);
    if (mark !== "rewrite" && e?.new !== undefined) errors.push(`${what}: only a rewrite carries a new line`);
    s10.push({ line: e.line, old: e.old, mark, new: e.new, referent: e.referent ? String(e.referent) : undefined, why: e.why ? String(e.why) : undefined });
  }
  const dupLines = s10.map((s) => s.line).filter((l, i, a) => a.indexOf(l) !== i);
  if (dupLines.length) errors.push(`s10 resolves line(s) ${[...new Set(dupLines)].join(", ")} twice`);
  if (errors.length) throw new Refusal(`${file}: ${errors.length} spec problem(s):\n  ` + errors.join("\n  "));
  return { file, id: String(j.id ?? slugOfRel(parent)), parent, home, hub: { keep: hubKeep, links: hubLinks }, parts, named, candidates, relations, retarget, s10 };
}

// =====================================================================================================================
// text helpers

/** C1 plain text of a line (wikilinks -> display text or title), the form conserve.ts compares */
export function plain(v: R.Vault, s: string): string {
  return s.replace(WIKI, (_m, inner: string) => {
    const u = inner.replace(/\\\|/g, "|");
    const p = u.indexOf("|");
    if (p >= 0) return u.slice(p + 1);
    const t = R.resolveInner(v, inner);
    return t ? R.titleOf(v.byRel.get(t)!) : R.wikiPath(inner).split("/").pop()!;
  });
}
/** a heading or label as a comparison key: plain text, no markup or quotes, lower case, single spaces */
export function key(v: R.Vault, s: string): string {
  return plain(v, s)
    .replace(/^#{1,6}\s+/, "")
    .replace(/[*`_"“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[:.\s]+$/, "")
    .toLowerCase();
}
/** the line form G-post compares: plain text, whitespace collapsed */
const lineKey = (v: R.Vault, s: string) => plain(v, s).replace(/\s+/g, " ").trim();
const bytesOf = (n: R.Note) => Buffer.byteLength(R.noteText(n), "utf8");
const fmtKB = (b: number) => (b / KB).toFixed(1) + " KB";

// =====================================================================================================================
// sections

type Sec3 = { idx: number; text: string; end: number };
type Sec2 = { idx: number; text: string; ownEnd: number; end: number; children: Sec3[] };
type Layout = { bs: number; firstH2: number; secs: Sec2[]; headings: { idx: number; level: number; text: string }[] };

export function layoutOf(n: R.Note): Layout {
  const bs = R.fmEnd(n.lines) + 1;
  const heads: { idx: number; level: number; text: string }[] = [];
  let fence = false;
  for (let i = bs; i < n.lines.length; i++) {
    const l = n.lines[i];
    if (/^\s*(```|~~~)/.test(l)) {
      fence = !fence;
      continue;
    }
    if (fence) continue;
    const m = l.match(/^(#{1,6})\s+(.*?)\s*$/);
    if (m) heads.push({ idx: i, level: m[1].length, text: m[2] });
  }
  const secs: Sec2[] = [];
  for (let k = 0; k < heads.length; k++) {
    if (heads[k].level !== 2) continue;
    let j = k + 1;
    while (j < heads.length && heads[j].level > 2) j++;
    const end = j < heads.length ? heads[j].idx : n.lines.length;
    const kids = heads.slice(k + 1, j);
    const firstKid = kids.find((h) => h.level === 3);
    const s: Sec2 = { idx: heads[k].idx, text: heads[k].text, ownEnd: firstKid ? firstKid.idx : end, end, children: [] };
    for (let c = k + 1; c < j; c++) {
      if (heads[c].level !== 3) continue;
      let e = c + 1;
      while (e < j && heads[e].level > 3) e++;
      s.children.push({ idx: heads[c].idx, text: heads[c].text, end: e < j ? heads[e].idx : end });
    }
    secs.push(s);
  }
  const h2 = heads.find((h) => h.level === 2);
  return { bs, firstH2: h2 ? h2.idx : n.lines.length, secs, headings: heads };
}

// =====================================================================================================================
// S10: positional references

/** the trigger set (S10): positional words, "the/this table|list|section", and every "see ..." */
export const TRIGGER = /\b(above|below|earlier|later|previous(?:ly)?|preceding|following|next|aforementioned|former|latter)\b|\b(?:the|this|that) (?:table|list|section|sub-?section)s?\b|\bsee\b/gi;
const BEFORE_WORDS = new Set(["above", "earlier", "previous", "previously", "preceding", "aforementioned", "former"]);
const AFTER_WORDS = new Set(["below", "later", "following", "next", "latter"]);
const STOP = new Set(["the", "a", "an", "in", "on", "of", "and", "or", "to", "at", "by", "for", "with", "see", "also", "this", "that", "is", "are", "was", "as", "it", "its"]);
const GENERIC_TAIL = /\s+(sections?|sub-?sections?|table|list|entry|block|paragraph|heading|part|note|record)$/i;

export type Flag = { line: number; idx: number; text: string; dest: string; matches: { word: string; col: number }[]; auto: { mark: Mark | "ask"; new?: string; referent?: string; why: string } };

type Target = { kind: "heading" | "label"; text: string; key: string; idx: number };

/** headings (## and ###, plus deeper) and **bold labels** of the source note, as the resolver's vocabulary */
function vocabulary(v: R.Vault, n: R.Note, lay: Layout): Target[] {
  const out: Target[] = [];
  for (const h of lay.headings) if (h.level >= 2) out.push({ kind: "heading", text: h.text, key: key(v, h.text), idx: h.idx });
  for (let i = lay.bs; i < n.lines.length; i++)
    for (const m of n.lines[i].matchAll(/\*\*([^*\n]{2,120}?)\*\*/g)) {
      const k = key(v, m[1]);
      if (k.length >= 3) out.push({ kind: "label", text: m[1], key: k, idx: i });
    }
  return out;
}
/**
 * does a candidate phrase name a target? Equal to the heading or label, or a whole-word prefix of it of at least two
 * words (a single word names only a heading or label that is that word: "see Decisions", never "rule" for "RULE AMENDED
 * ..."); anything weaker is left to the executor ("ask")
 */
function names(cand: string, t: Target): boolean {
  if (!cand || cand.length < 4 || STOP.has(cand)) return false;
  if (t.key === cand) return true;
  if (!/\s/.test(cand)) return false;
  if (!t.key.startsWith(cand)) return false;
  const rest = t.key.slice(cand.length);
  return /^[\s:(,\-—–/]/.test(rest);
}
/** candidate phrases a reference names: after "see" up to a delimiter, or the 1-6 words before a positional word */
function candidates(v: R.Vault, line: string, m: { word: string; col: number }): string[] {
  const out: string[] = [];
  const clean = (s: string) => {
    let t = key(v, s).replace(/^(the|also|see|in|at)\s+/, "").replace(/^(the)\s+/, "");
    t = t.replace(/\s+(above|below|earlier|later|previous|preceding|following|next)$/, "");
    return t;
  };
  const push = (s: string) => {
    const c = clean(s);
    if (c) out.push(c);
    const g = c.replace(GENERIC_TAIL, "");
    if (g && g !== c) out.push(g);
  };
  if (m.word.toLowerCase() === "see") {
    const after = line.slice(m.col + 3);
    const stop = after.search(/[);,]|\.(\s|$)|\s[-—–]\s|:\s/);
    const phrase = (stop >= 0 ? after.slice(0, stop) : after).trim();
    if (phrase) push(phrase);
  } else {
    const before = line.slice(0, m.col);
    const cut = Math.max(before.lastIndexOf("("), before.lastIndexOf(")"), before.lastIndexOf(";"), before.lastIndexOf(","), before.lastIndexOf(":"), before.lastIndexOf(". "), before.lastIndexOf(" - "), before.lastIndexOf(" — "));
    const clause = before.slice(cut + 1).trim();
    const words = clause.split(/\s+/).filter(Boolean);
    for (let k = 1; k <= Math.min(6, words.length); k++) push(words.slice(words.length - k).join(" "));
  }
  return [...new Set(out)];
}

// =====================================================================================================================
// phase 1: one spec -> hub text + part texts (verbatim moves, S10 rewrites, Parts list, headers)

type Built = {
  spec: SplitSpec;
  parent: R.Note;
  lay: Layout;
  /** destination of every body line index: "hub" or a part rel */
  dest: Map<number, string>;
  /** part rel -> its body lines (assembled), and the original line index of each body line (-1 = created) */
  partLines: Map<string, { lines: string[]; orig: number[] }>;
  hubLines: string[];
  hubOrig: number[];
  flags: Flag[];
  problems: string[];
  warnings: string[];
  rewrites: Map<number, string>;
  s1: string[];
  cross: string[];
};

function sectionRefs(v: R.Vault, spec: SplitSpec, P: R.Note, lay: Layout, problems: string[]) {
  type Ref = { kind: "own" | "whole" | "child"; s: Sec2; c?: Sec3 };
  const matchEntry = (entry: string, who: string): Ref | null => {
    const m = entry.match(/^(#{2,3})\s+(.*)$/);
    if (!m) {
      problems.push(`${who}: "${entry}" is not a ## or ### heading line`);
      return null;
    }
    const level = m[1].length;
    const want = key(v, m[2]);
    if (level === 2) {
      const hits = lay.secs.filter((s) => key(v, s.text) === want);
      if (hits.length !== 1) {
        problems.push(`${who}: "${entry}" matches ${hits.length} ## headings`);
        return null;
      }
      return { kind: "whole", s: hits[0] };
    }
    const hits: Ref[] = [];
    for (const s of lay.secs) for (const c of s.children) if (key(v, c.text) === want) hits.push({ kind: "child", s, c });
    if (hits.length !== 1) {
      problems.push(`${who}: "${entry}" matches ${hits.length} ### headings`);
      return null;
    }
    return hits[0];
  };
  const hubRefs = spec.hub.keep.map((e) => matchEntry(e, "hub.keep")).filter((x): x is Ref => !!x);
  const partRefs = new Map<string, Ref[]>();
  for (const p of spec.parts) partRefs.set(p.rel, p.sections.map((e) => matchEntry(e, p.slug)).filter((x): x is Ref => !!x));
  // a ## with any child named anywhere is cut at ### level: its entry then means its own text only
  const childMode = new Set<Sec2>();
  for (const refs of [hubRefs, ...partRefs.values()]) for (const r of refs) if (r.kind === "child") childMode.add(r.s);
  for (const refs of [hubRefs, ...partRefs.values()]) for (const r of refs) if (r.kind === "whole" && childMode.has(r.s)) r.kind = "own";
  return { hubRefs, partRefs, childMode };
}

function phase1(v: R.Vault, spec: SplitSpec): Built {
  const P = v.byRel.get(spec.parent)!;
  const lay = layoutOf(P);
  const problems: string[] = [];
  const warnings: string[] = [];
  const { hubRefs, partRefs, childMode } = sectionRefs(v, spec, P, lay, problems);
  // ---- assignment: every ## own text and every ### child exactly once
  const ownOf = new Map<Sec2, string[]>();
  const childOf = new Map<Sec3, string[]>();
  const add = <K>(m: Map<K, string[]>, k: K, d: string) => m.set(k, [...(m.get(k) ?? []), d]);
  const assign = (refs: { kind: string; s: Sec2; c?: Sec3 }[], d: string) => {
    for (const r of refs) {
      if (r.kind === "child") add(childOf, r.c!, d);
      else {
        add(ownOf, r.s, d);
        if (r.kind === "whole") for (const c of r.s.children) add(childOf, c, d);
      }
    }
  };
  assign(hubRefs, "hub");
  for (const [rel, refs] of partRefs) assign(refs, rel);
  const dest = new Map<number, string>();
  for (let i = lay.bs; i < lay.firstH2; i++) dest.set(i, "hub");
  for (const s of lay.secs) {
    const o = ownOf.get(s) ?? [];
    if (o.length !== 1) problems.push(`"## ${s.text.slice(0, 80)}"${childMode.has(s) ? " (own text)" : ""} is ${o.length ? "assigned " + o.length + "x: " + o.join(", ") : "neither kept nor moved"}`);
    for (let i = s.idx; i < s.ownEnd; i++) dest.set(i, o[0] ?? "hub");
    for (const c of s.children) {
      const d = childOf.get(c) ?? [];
      if (d.length !== 1) problems.push(`"### ${c.text.slice(0, 80)}" (in ## ${s.text.slice(0, 40)}) is ${d.length ? "assigned " + d.length + "x: " + d.join(", ") : "neither kept nor moved"}`);
      for (let i = c.idx; i < c.end; i++) dest.set(i, d[0] ?? "hub");
    }
  }
  // ---- S10 detection and the resolver
  const vocab = vocabulary(v, P, lay);
  const destOfIdx = (i: number) => dest.get(i) ?? "hub";
  const flags: Flag[] = [];
  for (let i = lay.bs; i < P.lines.length; i++) {
    const l = P.lines[i];
    const ms = [...l.matchAll(TRIGGER)].map((m) => ({ word: m[0], col: m.index! }));
    if (!ms.length) continue;
    flags.push({ line: i + 1, idx: i, text: l, dest: destOfIdx(i), matches: ms, auto: { mark: "ask", why: "" } });
  }
  // positions of every original line in its destination note (order within a part follows the table order)
  const posIn = new Map<number, number>();
  {
    let k = 0;
    for (const p of spec.parts) {
      for (const r of partRefs.get(p.rel) ?? []) {
        const [a, b] = r.kind === "child" ? [r.c!.idx, r.c!.end] : r.kind === "own" ? [r.s.idx, r.s.ownEnd] : [r.s.idx, r.s.end];
        for (let i = a; i < b; i++) posIn.set(i, k++);
      }
    }
    for (let i = lay.bs; i < P.lines.length; i++) if (destOfIdx(i) === "hub") posIn.set(i, k++);
  }
  const atomOf = (i: number): [number, number] => {
    if (i < lay.firstH2) return [lay.bs, lay.firstH2];
    for (const s of lay.secs) {
      for (const c of s.children) if (i >= c.idx && i < c.end) return [c.idx, c.end];
      if (i >= s.idx && i < s.ownEnd) return [s.idx, s.ownEnd];
    }
    return [i, i + 1];
  };
  const destLabel = (d: string) => (d === "hub" ? spec.parent : d);
  for (const f of flags) {
    const resolved: { m: { word: string; col: number }; how: "same" | "cross" | "ask"; target?: Target; dest?: string; why: string }[] = [];
    for (const m of f.matches) {
      const w = m.word.toLowerCase();
      // the table / list above / below, with that table or list in the same atomic section
      const tl = f.text.slice(m.col).match(/^(?:the|this|that) (table|list)s?\b/i);
      if (tl) {
        const after = f.text.slice(m.col + tl[0].length);
        const dir = after.match(/^\s+(above|below)\b/i)?.[1]?.toLowerCase();
        if (dir) {
          const [a, b] = atomOf(f.idx);
          const isTable = tl[1].toLowerCase() === "table";
          const hit = (j: number) => (isTable ? /^\s*\|/.test(P.lines[j]) : /^\s*([-*+]|\d+\.)\s/.test(P.lines[j]));
          let found = false;
          if (dir === "above") for (let j = a; j < f.idx; j++) found ||= hit(j);
          else for (let j = f.idx + 1; j < b; j++) found ||= hit(j);
          resolved.push(found ? { m, how: "same", why: `the ${tl[1].toLowerCase()} ${dir} is in the same section` } : { m, how: "ask", why: `no ${tl[1].toLowerCase()} ${dir} in the same section` });
          continue;
        }
        resolved.push({ m, how: "ask", why: `"${tl[0]}" without above/below` });
        continue;
      }
      // the positional word that follows "the table" was handled with it
      if ((w === "above" || w === "below") && /\b(?:the|this|that) (?:table|list)s?\s+$/i.test(f.text.slice(0, m.col))) continue;
      const cands = candidates(v, f.text, m);
      const hits = new Map<string, Target>();
      for (const c of cands) for (const t of vocab) if (t.idx !== f.idx && names(c, t)) hits.set(t.kind + ":" + t.idx, t);
      if (hits.size !== 1) {
        resolved.push({ m, how: "ask", why: hits.size ? `names ${hits.size} headings or labels (${[...hits.values()].slice(0, 3).map((t) => JSON.stringify(t.text.slice(0, 40))).join(", ")})` : w === "see" ? "names no heading or bold label" : "bare positional word (no named referent)" });
        continue;
      }
      const t = [...hits.values()][0];
      const td = destOfIdx(t.idx);
      if (td === f.dest) {
        const before = (posIn.get(t.idx) ?? 0) < (posIn.get(f.idx) ?? 0);
        if ((BEFORE_WORDS.has(w) && !before) || (AFTER_WORDS.has(w) && before)) {
          resolved.push({ m, how: "ask", target: t, why: `names ${JSON.stringify(t.text.slice(0, 50))} but the direction no longer holds in ${destLabel(td)}` });
          continue;
        }
        resolved.push({ m, how: "same", target: t, dest: td, why: `names ${t.kind} ${JSON.stringify(t.text.slice(0, 50))}, same note` });
      } else resolved.push({ m, how: "cross", target: t, dest: td, why: `names ${t.kind} ${JSON.stringify(t.text.slice(0, 50))}, now in ${destLabel(td)}` });
    }
    if (!resolved.length || resolved.some((r) => r.how === "ask")) {
      f.auto = { mark: "ask", why: resolved.filter((r) => r.how === "ask").map((r) => `${r.m.word}: ${r.why}`).join("; ") || "ask" };
      continue;
    }
    const cross = resolved.filter((r) => r.how === "cross");
    if (!cross.length) {
      f.auto = { mark: "same note", why: resolved.map((r) => `${r.m.word}: ${r.why}`).join("; ") };
      continue;
    }
    // build the rewrite: a positional word becomes "in [[note]]"; a "see X" without one gets " in [[note]]" after X
    let text = f.text;
    const edits: { at: number; del: number; ins: string }[] = [];
    const destsCovered = new Set<string>();
    for (const r of cross.filter((r) => r.m.word.toLowerCase() !== "see")) {
      edits.push({ at: r.m.col, del: r.m.word.length, ins: `in [[${slugOfRel(destLabel(r.dest!))}]]` });
      destsCovered.add(r.dest!);
    }
    for (const r of cross.filter((r) => r.m.word.toLowerCase() === "see")) {
      if (destsCovered.has(r.dest!)) continue;
      const after = f.text.slice(r.m.col + 3);
      const stop = after.search(/[);,]|\.(\s|$)|\s[-—–]\s|:\s/);
      const end = r.m.col + 3 + (stop >= 0 ? stop : after.length);
      let at = end;
      while (at > r.m.col && f.text[at - 1] === " ") at--;
      edits.push({ at, del: 0, ins: ` in [[${slugOfRel(destLabel(r.dest!))}]]` });
      destsCovered.add(r.dest!);
    }
    edits.sort((a, b) => b.at - a.at);
    for (const e of edits) text = text.slice(0, e.at) + e.ins + text.slice(e.at + e.del);
    f.auto = { mark: "rewrite", new: text, referent: [...destsCovered].map(slugOfRel).join(", "), why: resolved.map((r) => `${r.m.word}: ${r.why}`).join("; ") };
  }
  // ---- the spec's resolutions
  const byLine = new Map(spec.s10.map((s) => [s.line, s]));
  const rewrites = new Map<number, string>();
  const flagged = new Set(flags.map((f) => f.line));
  for (const s of spec.s10) {
    const i = s.line - 1;
    if (P.lines[i] !== s.old) {
      problems.push(`s10 line ${s.line}: the old text does not match the note (spec stale): ${JSON.stringify((P.lines[i] ?? "").slice(0, 80))}`);
      continue;
    }
    if (!flagged.has(s.line)) warnings.push(`s10 line ${s.line}: resolves a line the detector does not flag`);
    if (s.mark === "rewrite") {
      const err = rewriteProblem(v, s.old, s.new!, spec, destOfIdx(i));
      if (err) problems.push(`s10 line ${s.line}: ${err}`);
      else rewrites.set(i, s.new!);
    }
  }
  for (const f of flags) {
    const r = byLine.get(f.line);
    if (r && f.auto.mark !== "ask" && r.mark !== f.auto.mark) warnings.push(`s10 line ${f.line}: the spec marks "${r.mark}" where the resolver proposes "${f.auto.mark}" (${f.auto.why})`);
  }
  // ---- assemble the parts
  const partLines = new Map<string, { lines: string[]; orig: number[] }>();
  const lineAt = (i: number) => rewrites.get(i) ?? P.lines[i];
  for (const p of spec.parts) {
    const out: string[] = [];
    const orig: number[] = [];
    const push = (l: string, o: number) => {
      out.push(l);
      orig.push(o);
    };
    const gap = () => {
      if (out.length && out[out.length - 1].trim() !== "") push("", -1);
    };
    const copied = new Set<Sec2>();
    const ownHere = new Set((partRefs.get(p.rel) ?? []).filter((r) => r.kind !== "child").map((r) => r.s));
    for (const r of partRefs.get(p.rel) ?? []) {
      gap();
      if (r.kind === "child") {
        if (!ownHere.has(r.s) && !copied.has(r.s)) {
          push(P.lines[r.s.idx], -2); // S1: verbatim copy of the ## heading line
          push("", -1);
          copied.add(r.s);
        }
        for (let i = r.c!.idx; i < r.c!.end; i++) push(lineAt(i), i);
      } else {
        const end = r.kind === "own" ? r.s.ownEnd : r.s.end;
        for (let i = r.s.idx; i < end; i++) push(lineAt(i), i);
      }
    }
    while (out.length && out[out.length - 1].trim() === "") {
      out.pop();
      orig.pop();
    }
    partLines.set(p.rel, { lines: out, orig });
  }
  // ---- assemble the hub: frontmatter, preamble, ## Parts, kept sections in their original order
  const hubLines: string[] = [];
  const hubOrig: number[] = [];
  for (let i = 0; i < lay.bs; i++) {
    hubLines.push(P.lines[i]);
    hubOrig.push(i);
  }
  const pre: number[] = [];
  for (let i = lay.bs; i < lay.firstH2; i++) pre.push(i);
  while (pre.length && P.lines[pre[pre.length - 1]].trim() === "") pre.pop();
  for (const i of pre) {
    hubLines.push(lineAt(i));
    hubOrig.push(i);
  }
  hubLines.push("", "## Parts", "");
  hubOrig.push(-1, -1, -1);
  for (const p of spec.parts) {
    hubLines.push(`- [[${p.slug}]] — ${p.summary}.`);
    hubOrig.push(-1);
  }
  hubLines.push("");
  hubOrig.push(-1);
  let lastWasBlank = true;
  for (let i = lay.firstH2; i < P.lines.length; i++) {
    if (destOfIdx(i) !== "hub") continue;
    const l = lineAt(i);
    if (l.trim() === "" && lastWasBlank) continue; // a removal junction never leaves a double blank line
    if (l.trim() !== "" && !lastWasBlank && hubOrig.length && hubOrig[hubOrig.length - 1] !== i - 1 && /^#{1,6}\s/.test(l)) {
      hubLines.push("");
      hubOrig.push(-1);
    }
    hubLines.push(l);
    hubOrig.push(i);
    lastWasBlank = l.trim() === "";
  }
  while (hubLines.length && hubLines[hubLines.length - 1].trim() === "") {
    hubLines.pop();
    hubOrig.pop();
  }
  // ---- S1 listings (the verify-plan --s1 and --s1-cross rules)
  const S1_RE = /\bRESOLVED\b/;
  const S1_RE_CI = /\bcorrections?\b|newest[- ]wins|\bsuperseded\b|\bsupersedes\b|\bread before\b|\bcontradictions?\b|\bdo not use\b|\breplaced by\b/i;
  const s1: string[] = [];
  const cross: string[] = [];
  for (let i = lay.bs; i < P.lines.length; i++) if (S1_RE.test(P.lines[i]) || S1_RE_CI.test(P.lines[i])) s1.push(`L${String(i + 1).padEnd(4)} ${shortDest(spec, destOfIdx(i)).padEnd(36)} | ${P.lines[i].trim().slice(0, 140)}`);
  const MARKED = /~~|superseded|supersedes|corrected|correction|history|prior|reverted|retracted|withdrawn|overturned|stale|was wrong|no longer/i;
  for (let i = lay.bs; i < P.lines.length; i++) {
    if (destOfIdx(i) !== "hub" || !P.lines[i].includes("~~")) continue;
    const toks = new Set<string>();
    for (const s of [...P.lines[i].matchAll(/~~(.+?)~~/g)].map((x) => x[1])) {
      for (const t of s.matchAll(/`([^`]{4,})`/g)) toks.add(t[1]);
      for (const t of s.matchAll(/"([^"]{12,})"/g)) toks.add(t[1]);
      for (const t of s.matchAll(/(?<![\w.])(\$?\d[\d,]*\.\d+%?|\$\d[\d,.]*[kKmM]?|\d{2,}(?:\.\d+)?%|\d{3,}(?:,\d{3})+)(?![\w])/g)) toks.add(t[1]);
    }
    if (!toks.size) continue;
    for (let j = lay.bs; j < P.lines.length; j++) {
      if (destOfIdx(j) === "hub") continue;
      const hit = [...toks].filter((t) => P.lines[j].includes(t));
      if (hit.length && !MARKED.test(P.lines[j])) cross.push(`hub L${i + 1} -> ${shortDest(spec, destOfIdx(j))} L${j + 1} [${hit.join(" | ").slice(0, 50)}] | ${P.lines[j].trim().slice(0, 100)}`);
    }
  }
  return { spec, parent: P, lay, dest, partLines, hubLines, hubOrig, flags, problems, warnings, rewrites, s1, cross };
}
const shortDest = (spec: SplitSpec, d: string) => (d === "hub" ? "HUB" : d.startsWith(spec.parent) ? d.slice(spec.parent.length) : slugOfRel(d));

/** decision 4(b): a rewrite may only turn positional word(s) into "in [[note]]" (or add "in [[note]]" after a named referent) */
export function rewriteProblem(v: R.Vault, old: string, nw: string, spec: SplitSpec, lineDest: string): string | null {
  const tok = (s: string) => s.match(/\[\[[^\]\n]*\]\]|[A-Za-z0-9'’-]+|[^\sA-Za-z0-9]/g) ?? [];
  const a = tok(old);
  const b = tok(nw);
  // LCS table
  const n = a.length;
  const m = b.length;
  const L: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const del: string[] = [];
  const ins: string[] = [];
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) {
      i++;
      j++;
    } else if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) ins.push(b[j++]);
    else del.push(a[i++]);
  }
  const POS = /^(above|below|earlier|later|previous|previously|preceding|following|next|aforementioned|former|latter)$/i;
  const badDel = del.filter((t) => !POS.test(t));
  if (badDel.length) return `the rewrite removes more than positional words (decision 4b): ${badDel.slice(0, 5).join(" ")}`;
  const family = new Set([spec.parent, ...spec.parts.map((p) => p.rel)]);
  for (const t of ins) {
    if (/^\[\[/.test(t)) {
      const target = R.resolveInner(v, t.slice(2, -2));
      const rel = target ?? spec.parts.find((p) => p.slug === R.wikiPath(t.slice(2, -2)))?.rel ?? null;
      if (!rel || !family.has(rel)) return `the rewrite links ${t}, which is not a note of this family`;
      if (rel === lineDest || (lineDest === "hub" && rel === spec.parent)) return `the rewrite links ${t}, the note the line itself lands in`;
      continue;
    }
    if (!/^(in|and|,)$/i.test(t)) return `the rewrite adds more than "in [[note]]" (decision 4b): ${t}`;
  }
  if (!ins.some((t) => /^\[\[/.test(t))) return "the rewrite adds no [[note]] link";
  return null;
}

// =====================================================================================================================
// phase 2: the link model over all families

type Family = { b: Built; hub: R.Note; parts: R.Note[]; topicHub: boolean };
type Report = { lines: string[]; problems: string[]; warnings: string[] };

function yamlScalar(n: R.Note, k: string): string | null {
  const y = R.yamlOf(n);
  const x = y[k];
  return x == null ? null : String(x);
}
function fmRawValue(n: R.Note, k: string): string | null {
  const e = R.fmEnd(n.lines);
  for (let i = 1; i < e; i++) {
    const m = n.lines[i].match(new RegExp("^" + k + "\\s*:\\s*(.*)$"));
    if (m) return m[1].replace(/\s+#.*$/, "").trim();
  }
  return null;
}
const q = (s: string) => JSON.stringify(s);
/** short name of a parent: its title up to the first " (" or ":" (S4) */
export function shortName(title: string): string {
  const cut = [title.indexOf(" ("), title.indexOf(":")].filter((x) => x >= 0);
  return (cut.length ? title.slice(0, Math.min(...cut)) : title).trim();
}

function partFrontmatter(v: R.Vault, P: R.Note, p: PartSpec, date: string): string[] {
  const ptitle = R.titleOf(P);
  const title = `${p.title} (${shortName(ptitle)})`;
  const alias = `${ptitle}: ${p.title}`;
  const y = R.yamlOf(P);
  const ptags: string[] = Array.isArray(y.tags) ? y.tags.map(String) : [];
  const tags: string[] = [];
  let domainDone = false;
  for (const t of ptags) {
    if (/^domain\//.test(t)) {
      if (!domainDone) tags.push(p.domain);
      domainDone = true;
    } else if (/^(type|status|category)\//.test(t)) tags.push(t);
  }
  if (!domainDone) tags.push(p.domain);
  const status = yamlScalar(P, "status") ?? "";
  const category = yamlScalar(P, "category") ?? "";
  const tagText = "[" + tags.map(q).join(", ") + "]";
  if (p.type === "topic") {
    const created = fmRawValue(P, "created_at") ?? date;
    return ["---", "type: topic", `title: ${q(title)}`, `aliases: [${q(alias)}]`, `category: ${q(category)}`, `status: ${q(status)}`, "people: []", "actors: []", 'objective: ""', `created_at: ${created}`, "sources: []", `updated_at: ${date}`, `updated_by: ${q(UPDATED_BY)}`, `tags: ${tagText}`, `part_of: ${q("[[" + slugOfRel(P.rel) + "]]")}`, "---"];
  }
  const team = fmRawValue(P, "team") ?? '""';
  const created = fmRawValue(P, "created_at");
  return [
    "---",
    "type: actor",
    `name: ${q(title)}`,
    `aliases: [${q(alias)}]`,
    `category: ${q(category)}`,
    `description: ${q(p.summary + ".")}`,
    'repository: ""',
    'stack: ""',
    `status: ${q(status)}`,
    `team: ${team}`,
    'criticality: ""',
    "pci: false",
    "known_issues: []",
    ...(created ? [`created_at: ${created}`] : []),
    "sources: []",
    'last_synced_at: ""',
    'last_synced_sha: ""',
    `updated_at: ${date}`,
    `updated_by: ${q(UPDATED_BY)}`,
    `tags: ${tagText}`,
    `part_of: ${q("[[" + slugOfRel(P.rel) + "]]")}`,
    "---",
  ];
}

function newNote(v: R.Vault, rel: string, lines: string[]): R.Note {
  const n: R.Note = { rel, path: rel + ".md", abs: join(v.root, ...(rel + ".md").split("/")), slug: slugOfRel(rel), top: rel.split("/")[0], fleeting: false, bom: false, finalNewline: true, origText: "\u0000new", lines };
  v.notes.push(n);
  v.byRel.set(rel, n);
  if (!v.relBySlug.has(n.slug)) v.relBySlug.set(n.slug, rel);
  return n;
}

/** C4: every mention of `from` in a note becomes a link to `to` keeping its old display text (body) or "[[to]]" (frontmatter) */
function retargetMentions(ctx: R.Ctx, n: R.Note, from: string, to: string, rule: string): number {
  const kinds = R.lineKinds(n);
  const toName = R.linkName(ctx, to);
  const oldTitle = R.titleOf(ctx.v.byRel.get(from)!);
  let count = 0;
  n.lines.forEach((l, i) => {
    if (!kinds[i].scanned || (kinds[i].fm && kinds[i].key === "part_of")) return;
    n.lines[i] = l.replace(WIKI, (m, inner: string) => {
      if (R.resolveInner(ctx.v, inner) !== from) return m;
      count++;
      let rep: string;
      if (kinds[i].fm) rep = `[[${toName}]]`;
      else {
        const u = inner.replace(/\\\|/g, "|");
        const p = u.indexOf("|");
        const disp = p >= 0 ? u.slice(p + 1) : oldTitle;
        const esc = m.includes("\\|") ? "\\|" : "|";
        rep = `${m.startsWith("!") ? "!" : ""}[[${toName}${esc}${disp}]]`;
      }
      ctx.edits.push({ phase: "split", note: n.path, kind: "convert", rule, line: i + 1, old: m, new: rep, section: kinds[i].fm ? `frontmatter ${kinds[i].key}` : undefined });
      return rep;
    });
  });
  return count;
}

/** a part's row in its home project's Map, right after its parent's row (and the parent's earlier part rows) */
function insertPartRow(ctx: R.Ctx, proj: R.Note, parentRel: string, part: R.Note, summary: string, rule: string, lastRowFor: Map<string, number>) {
  R.ensureMap(ctx, proj);
  const map = R.findSection(proj, "Map", 2);
  if (!map) throw new Refusal(`${proj.rel} has no ## Map`);
  const secName = part.top === "actors" ? "Related Actors" : "Related Topics";
  const sec = R.findSection(proj, secName, 3, map);
  const row = `| [[${R.linkName(ctx, part.rel)}]] | part: ${R.clip(summary + ".", PART_ROW_MAX)} |`;
  const k = proj.rel + "\u0000" + parentRel;
  let at = -1;
  if (lastRowFor.has(k)) at = lastRowFor.get(k)! + 1;
  else if (sec) {
    for (let i = sec.head + 1; i < sec.end; i++) {
      const l = proj.lines[i];
      if (!/^\s*\|/.test(l)) continue;
      const first = l.trim().replace(/^\|/, "").split(/(?<!\\)\|/)[0] ?? "";
      for (const m of first.matchAll(WIKI)) if (R.resolveInner(ctx.v, m[1]) === parentRel) at = i + 1;
    }
  }
  if (at < 0) {
    R.insertLine(ctx, proj, { section: secName, level: 3, within: { text: "Map", level: 2 }, create: "after-related-actors" }, row, rule + " (parent has no row: appended)", row);
    const s2 = R.findSection(proj, secName, 3, R.findSection(proj, "Map", 2)!)!;
    let last = -1;
    for (let i = s2.head + 1; i < s2.end; i++) if (proj.lines[i] === row) last = i;
    lastRowFor.set(k, last);
    for (const [kk, vv] of lastRowFor) if (kk !== k && vv >= last && kk.startsWith(proj.rel + "\u0000")) lastRowFor.set(kk, vv + 1);
    return;
  }
  proj.lines.splice(at, 0, row);
  for (const [kk, vv] of lastRowFor) if (kk.startsWith(proj.rel + "\u0000") && vv >= at) lastRowFor.set(kk, vv + 1);
  lastRowFor.set(k, at);
  ctx.edits.push({ phase: "split", note: proj.path, kind: "insert", rule, line: at + 1, new: row, section: `### ${secName} (after ${slugOfRel(parentRel)})` });
}

type KeepJson = { leaves: Map<string, Set<string>>; named: [string, string][] };
function readKeepJson(file: string | null): KeepJson {
  const out: KeepJson = { leaves: new Map(), named: [] };
  if (!file) return out;
  if (!existsSync(file)) throw new Refusal(`--keep ${file} does not exist`);
  const j = JSON.parse(readFileSync(file, "utf8").replace(/^﻿/, ""));
  for (const [k, val] of Object.entries<any>(j.leaves ?? {})) out.leaves.set(relArg(k), new Set([...(val?.home ? [relArg(val.home)] : []), ...((val?.keep ?? []) as string[]).map(relArg)]));
  for (const p of j.named ?? []) if (Array.isArray(p) && p.length === 2) out.named.push([relArg(p[0]), relArg(p[1])]);
  return out;
}

export type RunOpts = { vault: string; specs: string[]; mode: "plan" | "apply" | "verify"; keep: string | null; pending: string | null; manifest: string | null; positionalLog: string | null; allow: string | null; date: string; out: string | null; json: string | null; draft: string | null };

export async function run(o: RunOpts): Promise<{ code: number; text: string }> {
  const v = R.loadVault(o.vault);
  const specs = o.specs.map((f) => loadSplitSpec(f, v, o.mode === "verify"));
  {
    const parents = specs.map((s) => s.parent);
    const dup = parents.filter((p, i) => parents.indexOf(p) !== i);
    if (dup.length) throw new Refusal(`two specs split the same parent: ${dup[0]}`);
    const slugs = specs.flatMap((s) => s.parts.map((p) => p.slug));
    const d2 = slugs.filter((p, i) => slugs.indexOf(p) !== i);
    if (d2.length) throw new Refusal(`two parts share the slug ${d2[0]}`);
  }
  if (o.mode === "verify") return verify(v, specs);
  const L: string[] = [];
  const problems: string[] = [];
  const warnings: string[] = [];
  const harvest = R.harvestSummaries(v);
  const keepJson = readKeepJson(o.keep);
  const ctx: R.Ctx = { v, spec: { leaves: new Map(), paul: [], named: [], concepts: new Map() }, pending: new Set(), harvest, date: o.date, edits: [], phase: "split" };
  const beforeOut = new Map(v.notes.map((n) => [n.rel, R.outTargets(v, n)]));
  const beforeText = new Map(v.notes.map((n) => [n.rel, n.lines.join("\n")]));

  // ---------------- phase 1 for every spec, against the same vault state
  const built = specs.map((s) => phase1(v, s));
  for (const b of built) {
    for (const p of b.problems) problems.push(`${b.spec.id}: ${p}`);
    for (const w of b.warnings) warnings.push(`${b.spec.id}: ${w}`);
  }
  // draft s10 entries the specs still lack
  if (o.draft) {
    const draft: Record<string, any[]> = {};
    for (const b of built) {
      const have = new Set(b.spec.s10.map((s) => s.line));
      draft[b.spec.id] = b.flags
        .filter((f) => !have.has(f.line))
        .map((f) => ({ line: f.line, dest: f.dest === "hub" ? "hub" : slugOfRel(f.dest), old: f.text, mark: f.auto.mark === "ask" ? null : f.auto.mark, ...(f.auto.new ? { new: f.auto.new } : {}), ...(f.auto.referent ? { referent: f.auto.referent } : {}), why: f.auto.why, words: f.matches.map((m) => m.word) }));
    }
    mkdirSync(dirname(o.draft), { recursive: true });
    writeFileSync(o.draft, JSON.stringify(draft, null, 1) + "\n");
  }

  // ---------------- materialise hubs and parts in memory
  const families: Family[] = [];
  for (const b of built) {
    const P = b.parent;
    const parts: R.Note[] = [];
    for (const p of b.spec.parts) {
      const body = b.partLines.get(p.rel)!;
      const title = `${p.title} (${shortName(R.titleOf(P))})`;
      const header = [`# ${title}`, "", `> ${p.summary}. Part of [[${slugOfRel(P.rel)}]] (project [[${slugOfRel(p.home)}]]).`, ...p.pointers, ""];
      parts.push(newNote(v, p.rel, [...partFrontmatter(v, P, p, o.date), "", ...header, ...body.lines]));
    }
    P.lines = [...b.hubLines];
    families.push({ b, hub: P, parts, topicHub: P.top === "topics" });
  }
  const partSpecOf = new Map<string, { f: Family; p: PartSpec }>();
  for (const f of families) for (const p of f.b.spec.parts) partSpecOf.set(p.rel, { f, p });
  const hubOf = new Map(families.map((f) => [f.hub.rel, f]));
  const batchLeaf = (rel: string) => partSpecOf.has(rel) || (hubOf.has(rel) && hubOf.get(rel)!.topicHub);

  // ---------------- named relations: K pairs (planned), D relations, K candidates
  const kPairs = new Map<string, Pair>();
  for (const f of families) for (const k of f.b.spec.named) if (!kPairs.has(k.id)) kPairs.set(k.id, k);
  for (const [id, k] of kPairs) {
    if (!partSpecOf.has(k.a) || !partSpecOf.has(k.b)) problems.push(`${id}: both ${k.a} and ${k.b} must be parts created in this run`);
  }
  const counterparts = new Map<string, Set<string>>();
  const addCp = (a: string, b: string) => counterparts.set(a, new Set([...(counterparts.get(a) ?? []), b]));
  for (const k of kPairs.values()) if (partSpecOf.has(k.a) && partSpecOf.has(k.b)) {
    addCp(k.a, k.b);
    addCp(k.b, k.a);
  }
  const relationOf = new Map<string, Set<string>>();
  for (const f of families) for (const r of f.b.spec.relations) relationOf.set(r.part, new Set([...(relationOf.get(r.part) ?? []), r.with]));
  // the keep set of every batch leaf
  const keepOf = new Map<string, Set<string>>();
  for (const [rel, { f, p }] of partSpecOf) {
    const s = new Set<string>([f.hub.rel, p.home, ...p.keep, ...(counterparts.get(rel) ?? []), ...(relationOf.get(rel) ?? [])]);
    for (const sib of f.parts) if (sib.rel !== rel) s.add(sib.rel); // sibling links (S10) are family links
    keepOf.set(rel, s);
  }
  for (const f of families) if (f.topicHub) keepOf.set(f.hub.rel, new Set([f.b.spec.home, ...f.parts.map((x) => x.rel), ...(f.b.spec.hub.links ?? [])]));
  // the K and D links each part spends (counted against the 3-other budget with its keep list)
  const othersOf = (rel: string) => {
    const { p } = partSpecOf.get(rel)!;
    return new Set([...p.keep, ...(counterparts.get(rel) ?? []), ...(relationOf.get(rel) ?? [])]);
  };
  for (const rel of partSpecOf.keys()) {
    const { p } = partSpecOf.get(rel)!;
    const cap = p.s11 ? 2 : 3;
    const o2 = othersOf(rel);
    if (o2.size > cap) problems.push(`${p.slug}: ${o2.size} other links (keep ${p.keep.length} + K/D ${o2.size - p.keep.length}) exceed ${cap}${p.s11 ? " (S11)" : ""}`);
  }
  // K candidates (4.7 K12-K25): evidence (same memory file or session id in both moved texts) and a free slot on both sides
  const candReport: string[] = [];
  const evidenceOf = (lines: string[]) => {
    const t = lines.join("\n");
    const mem = new Set([...t.matchAll(/`([a-z0-9][a-z0-9-]*-20\d\d-\d\d-\d\d)`/g)].map((m) => m[1]));
    const sess = new Set([...t.matchAll(/\b([0-9a-f]{8})-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/g)].map((m) => m[1]).concat([...t.matchAll(/\bsession\s+`?([0-9a-f]{8})\b/gi)].map((m) => m[1])));
    return { mem, sess };
  };
  const seenCand = new Set<string>();
  // candidates in id order (K12, K13, ...), so the free-slot test does not depend on the order of the --spec files
  const allCands = families.flatMap((f) => f.b.spec.candidates).sort((x, y) => Number(x.id.replace(/\D/g, "")) - Number(y.id.replace(/\D/g, "")) || cmp(x.id, y.id));
  {
    for (const c of allCands) {
      if (seenCand.has(c.id)) continue;
      seenCand.add(c.id);
      if (!partSpecOf.has(c.b)) {
        const o2 = othersOf(c.a);
        candReport.push(`${c.id} ${slugOfRel(c.a)} <-> ${slugOfRel(c.b)}: deferred (the counterpart is created in a later batch); ${slugOfRel(c.a)} has ${o2.size} planned other(s)${o2.size <= 2 ? ", so a slot stays free for it" : ": no free slot, the candidate cannot be created later"}`);
        continue;
      }
      const ea = evidenceOf(partSpecOf.get(c.a)!.f.b.partLines.get(c.a)!.lines);
      const eb = evidenceOf(partSpecOf.get(c.b)!.f.b.partLines.get(c.b)!.lines);
      const mem = [...ea.mem].filter((x) => eb.mem.has(x));
      const sess = [...ea.sess].filter((x) => eb.sess.has(x));
      const capA = partSpecOf.get(c.a)!.p.s11 ? 2 : 3;
      const capB = partSpecOf.get(c.b)!.p.s11 ? 2 : 3;
      const freeA = capA - othersOf(c.a).size;
      const freeB = capB - othersOf(c.b).size;
      const ev = mem.length || sess.length;
      if (ev && freeA > 0 && freeB > 0) {
        addCp(c.a, c.b);
        addCp(c.b, c.a);
        keepOf.get(c.a)!.add(c.b);
        keepOf.get(c.b)!.add(c.a);
        kPairs.set(c.id, { ...c });
        candReport.push(`${c.id} ${slugOfRel(c.a)} <-> ${slugOfRel(c.b)}: CREATED (evidence: ${[...mem.map((x) => "memory " + x), ...sess.map((x) => "session " + x)].join(", ")}; free slots ${freeA} and ${freeB})`);
      } else candReport.push(`${c.id} ${slugOfRel(c.a)} <-> ${slugOfRel(c.b)}: skipped (${!ev ? "no shared memory file or session id in the moved texts" : `no free other slot (${slugOfRel(c.a)} ${freeA}, ${slugOfRel(c.b)} ${freeB})`})`);
    }
  }
  const candidatePairs = new Set([...kPairs.values()].filter((k) => families.some((f) => f.b.spec.candidates.some((c) => c.id === k.id))).map((k) => k.id));

  // ---------------- 4.3 proposals (what split.ts would choose) next to the spec keep lists
  const proposals: string[] = [];
  for (const [rel, { f, p }] of partSpecOf) {
    const part = v.byRel.get(rel)!;
    const ms = R.mentionsOf(v, part).filter((m) => !m.fm);
    const fam = new Set([f.hub.rel, ...f.parts.map((x) => x.rel)]);
    const order: string[] = [];
    const count = new Map<string, number>();
    for (const m of ms) {
      if (!count.has(m.target)) order.push(m.target);
      count.set(m.target, (count.get(m.target) ?? 0) + 1);
    }
    const cap = p.s11 ? 2 : 3;
    const pairId = (x: string) => [...kPairs.values()].find((k) => (k.a === rel && k.b === x) || (k.b === rel && k.a === x))?.id ?? "";
    const plannedCps = [...(counterparts.get(rel) ?? [])].filter((x) => !candidatePairs.has(pairId(x)));
    const named = [...plannedCps, ...(relationOf.get(rel) ?? [])];
    const concepts = order.filter((t) => v.byRel.get(t)?.top === "concepts" && !fam.has(t));
    // actors: actor notes that are not parts (a part is a leaf, and other leaves are never chosen), by mention count
    const actors = order.filter((t) => v.byRel.get(t)?.top === "actors" && !fam.has(t) && !R.hasPartOf(v.byRel.get(t)!)).sort((x, y) => count.get(y)! - count.get(x)! || order.indexOf(x) - order.indexOf(y));
    // the counterpart's parent is retargeted to the counterpart (C4), so it is not an actor choice of its own
    const cpParents = new Set(plannedCps.map((c) => partSpecOf.get(c)?.f.hub.rel).filter(Boolean) as string[]);
    const pick: string[] = [];
    for (const t of [...named, ...concepts, ...actors.filter((a) => !cpParents.has(a))]) if (pick.length < cap && !pick.includes(t)) pick.push(t);
    const proposedOthers = pick.filter((t) => !named.includes(t));
    const specOthers = p.keep;
    const same = proposedOthers.length === specOthers.length && proposedOthers.every((t, k2) => t === specOthers[k2]);
    proposals.push(`${p.slug}: proposed ${pick.map(slugOfRel).join(", ") || "-"}${same ? "" : `  | SPEC keep ${specOthers.map(slugOfRel).join(", ") || "-"} (differs)`}  [mentions: ${order.filter((t) => !fam.has(t) && t !== p.home).map((t) => `${slugOfRel(t)}x${count.get(t)}`).join(" ") || "-"}]`);
  }

  // ---------------- Map rows for every part (located by the parent's link before any conversion)
  const lastRowFor = new Map<string, number>();
  for (const f of families)
    for (const p of f.b.spec.parts) {
      const proj = v.byRel.get(p.home)!;
      insertPartRow(ctx, proj, f.hub.rel, v.byRel.get(p.rel)!, p.summary, "Map part row (section 5)", lastRowFor);
    }

  // ---------------- C4 retargets: K pairs inside parts (the counterpart's parent -> the counterpart), spec retargets (D5)
  for (const [rel, cps] of counterparts) {
    for (const cp of cps) {
      const k = [...kPairs.values()].find((x) => (x.a === rel && x.b === cp) || (x.b === rel && x.a === cp))!;
      if (candidatePairs.has(k.id)) continue; // a candidate never displaces a planned link: C5 lines only
      const cpParent = partSpecOf.get(cp)!.f.hub.rel;
      retargetMentions(ctx, v.byRel.get(rel)!, cpParent, cp, `C4 retarget (${k.id})`);
    }
  }
  for (const f of families) for (const r of f.b.spec.retarget) retargetMentions(ctx, v.byRel.get(r.note)!, r.from, r.to, `C4 retarget (${r.why || "spec"})`);

  // ---------------- conversions (C1/C2): parts and topic hubs keep only their keep sets; R2 everywhere else
  const keepsLeaf = (leaf: string, t: string): boolean => {
    if (keepOf.has(leaf)) return keepOf.get(leaf)!.has(t);
    const kj = keepJson.leaves.get(leaf);
    if (kj) {
      // a spec retarget moves a keep.json link from the parent to the part
      for (const f of families) for (const r of f.b.spec.retarget) if (r.note === leaf && kj.has(r.from)) return t === r.to || (t !== r.from && kj.has(t));
      return kj.has(t);
    }
    return R.outTargets(v, v.byRel.get(leaf)!).has(t);
  };
  for (const [rel] of partSpecOf) {
    const n = v.byRel.get(rel)!;
    const drop = new Map<string, string>();
    for (const t of R.outTargets(v, n).keys()) if (!keepOf.get(rel)!.has(t) && !v.byRel.get(t)!.fleeting) drop.set(t, "part keep list (4.3)");
    if (drop.size) R.convertMentions(ctx, n, drop);
  }
  for (const f of families) {
    if (!f.topicHub) continue;
    const drop = new Map<string, string>();
    for (const t of R.outTargets(v, f.hub).keys()) if (!keepOf.get(f.hub.rel)!.has(t) && !v.byRel.get(t)!.fleeting) drop.set(t, "hub link list (3.2)");
    if (drop.size) R.convertMentions(ctx, f.hub, drop);
  }
  // R2: a note links a batch leaf that does not keep it; an actor hub links a leaf that does not keep it
  for (const n of v.notes) {
    if (n.fleeting || keepOf.has(n.rel)) continue;
    const drop = new Map<string, string>();
    for (const t of R.outTargets(v, n).keys()) {
      if (batchLeaf(t) && !keepOf.get(t)!.has(n.rel)) drop.set(t, "R2");
      else if (hubOf.has(n.rel) && !hubOf.get(n.rel)!.topicHub && R.isLeafNote(v.byRel.get(t)!) && !keepsLeaf(t, n.rel)) drop.set(t, "R2 (actor hub)");
    }
    if (drop.size) R.convertMentions(ctx, n, drop);
  }

  // ---------------- R1 / R3: every kept link is answered
  const summaryOf = (rel: string) => R.summaryOf(v, harvest, rel);
  const answer = (from: string, to: string, rule: string) => {
    const T = v.byRel.get(to)!;
    if (R.outTargets(v, T).has(from)) return;
    const F = v.byRel.get(from)!;
    if (T.top === "projects") {
      problems.push(`${from} keeps the project ${to}, which does not link it (only home projects of parts get Map rows)`);
      return;
    }
    R.insertLine(ctx, T, R.receivingSection(ctx, T, F), `- [[${R.linkName(ctx, from)}]] — ${summaryOf(from)}`, rule);
  };
  for (const [rel] of partSpecOf) {
    for (const t of keepOf.get(rel)!) {
      const T = v.byRel.get(t);
      if (!T) {
        problems.push(`${rel} keeps ${t}, which is not a note`);
        continue;
      }
      if (!R.outTargets(v, v.byRel.get(rel)!).has(t)) {
        // a keep target the part does not link: K / D links become C5 lines; anything else is a spec error
        const isK = counterparts.get(rel)?.has(t) || relationOf.get(rel)?.has(t);
        if (isK) R.insertLine(ctx, v.byRel.get(rel)!, R.receivingSection(ctx, v.byRel.get(rel)!, T), `- [[${R.linkName(ctx, t)}]] — ${summaryOf(t)}`, counterparts.get(rel)?.has(t) ? "R3 K pair (C5)" : "R3 D relation (C5)");
        else if (partSpecOf.get(rel)!.f.parts.some((x) => x.rel === t)) continue; // a sibling not linked: nothing to answer
        else if (t === partSpecOf.get(rel)!.f.hub.rel || t === partSpecOf.get(rel)!.p.home) continue;
        else {
          warnings.push(`${slugOfRel(rel)} keeps ${slugOfRel(t)} but its moved text does not link it (the keep entry has no effect)`);
          continue;
        }
      }
    }
  }
  for (const [rel] of partSpecOf) {
    for (const t of R.outTargets(v, v.byRel.get(rel)!).keys()) {
      const { f } = partSpecOf.get(rel)!;
      if (t === f.hub.rel || v.byRel.get(t)!.top === "projects") continue; // Parts list and Map rows answer these
      answer(rel, t, partSpecOf.has(t) ? (f.parts.some((x) => x.rel === t) ? "R3 sibling (S10)" : "R3 K pair") : R.isLeafNote(v.byRel.get(t)!) ? "R3 D relation" : "R1");
    }
  }
  for (const f of families) {
    if (!f.topicHub) continue;
    for (const t of R.outTargets(v, f.hub).keys()) {
      if (f.parts.some((x) => x.rel === t) || v.byRel.get(t)!.top === "projects") continue;
      answer(f.hub.rel, t, "R1 (hub link)");
    }
    for (const t of f.b.spec.hub.links ?? []) if (!R.outTargets(v, f.hub).has(t)) warnings.push(`${f.b.spec.id} hub: hub link ${slugOfRel(t)} is not mentioned in the kept text (no link to keep)`);
  }
  // actor hubs: a leaf that keeps the hub must be linked back (its back-link may have moved into a part)
  for (const f of families) {
    if (f.topicHub) continue;
    for (const n of v.notes) {
      if (n.fleeting || n.rel === f.hub.rel || !R.isLeafNote(n)) continue;
      if (!R.outTargets(v, n).has(f.hub.rel)) continue;
      if (!keepsLeaf(n.rel, f.hub.rel)) continue;
      answer(n.rel, f.hub.rel, "R1 (actor hub back-link)");
    }
  }

  // ---------------- stamps, one-way links, budgets, sizes
  for (const n of v.notes) if (!n.fleeting && n.origText !== "\u0000new" && R.changed(n)) R.stamp(ctx, n);
  const oneWay = R.oneWayLinks(v);
  for (const ow of oneWay) problems.push(`one-way link left: ${ow.from} -> ${ow.to}`);
  const sizes: string[] = [];
  for (const f of families) {
    for (const n of [f.hub, ...f.parts]) {
      const b = bytesOf(n);
      const tag = b >= LIMIT_BYTES ? "  REFUSED (at or over 50 KB)" : b >= TARGET_BYTES ? "  (over the 45 KB target)" : "";
      if (b >= LIMIT_BYTES) problems.push(`${n.rel}: ${b} bytes (${fmtKB(b)}) is at or over the 50 KB limit`);
      sizes.push(`${(n === f.hub ? "hub  " : "part ")}${fmtKB(b).padStart(8)} ${String(b).padStart(7)} B  ${n.rel}${tag}`);
    }
  }
  // fleeting notes untouched
  for (const n of v.notes) if (n.fleeting && n.lines.join("\n") !== beforeText.get(n.rel)) problems.push(`internal: a fleeting note would change: ${n.rel}`);

  // ---------------- report
  const changedNotes = v.notes.filter((n) => n.origText === "\u0000new" || R.changed(n));
  for (const b of built) {
    const sp = b.spec;
    L.push("", `==== ${sp.id} ${sp.parent} -> hub + ${sp.parts.length} parts (${sp.file})`);
    L.push(`sections: ${b.lay.secs.length} ##, ${b.lay.secs.reduce((a, s) => a + s.children.length, 0)} ###; problems ${b.problems.length}`);
    for (const p of sp.parts) {
      const refs = p.sections.join(" | ");
      L.push(`  ${p.slug}: ${refs.slice(0, 220)}`);
    }
    const unresolved = b.flags.filter((f) => !sp.s10.some((s) => s.line === f.line));
    const autoN = b.flags.filter((f) => f.auto.mark !== "ask").length;
    L.push(`S10: ${b.flags.length} flagged line(s) (${b.flags.reduce((a, f) => a + f.matches.length, 0)} trigger(s)); resolver: ${autoN} automatic, ${b.flags.length - autoN} ask; spec resolutions ${sp.s10.length} (rewrite ${sp.s10.filter((s) => s.mark === "rewrite").length}, same note ${sp.s10.filter((s) => s.mark === "same note").length}, external ${sp.s10.filter((s) => s.mark === "external").length}, not positional ${sp.s10.filter((s) => s.mark === "not positional").length}); UNRESOLVED ${unresolved.length}`);
    for (const f of unresolved.slice(0, 400)) L.push(`  UNRESOLVED L${f.line} [${shortDest(sp, f.dest)}] ${f.auto.mark}${f.auto.new ? " -> " + f.auto.new.slice(0, 160) : ""} (${f.auto.why.slice(0, 160)}) | ${f.text.trim().slice(0, 160)}`);
    if (unresolved.length) problems.push(`${sp.id}: ${unresolved.length} unresolved S10 flag(s) ("ask" and unsigned automatic marks count)`);
    L.push(`S1 marker lines (${b.s1.length}):`);
    for (const s of b.s1) L.push("  " + s);
    L.push(`S1 cross candidates (${b.cross.length}):`);
    for (const c of b.cross) L.push("  " + c);
  }
  L.push("", "==== links (4.3 proposals vs spec keep lists)");
  for (const pz of proposals) L.push("  " + pz);
  L.push("", "==== K pairs and candidates");
  for (const [id, k] of kPairs) if (!candidatePairs.has(id)) L.push(`  ${id} ${slugOfRel(k.a)} <-> ${slugOfRel(k.b)}: planned`);
  for (const c of candReport) L.push("  " + c);
  L.push("", "==== sizes (final, after the link model)");
  for (const s of sizes) L.push("  " + s);
  L.push("", "==== edits outside the families");
  const famRels = new Set(families.flatMap((f) => [f.hub.rel, ...f.parts.map((p) => p.rel)]));
  const byNote = new Map<string, R.Edit[]>();
  for (const e of ctx.edits) byNote.set(e.note, [...(byNote.get(e.note) ?? []), e]);
  for (const [note, es] of [...byNote].sort((a, b) => cmp(a[0], b[0]))) {
    const rel = note.replace(/\.md$/, "");
    const inFam = famRels.has(rel);
    L.push(`  ${inFam ? "[family] " : ""}${note}: ${es.filter((e) => e.kind === "convert").length} conversion(s), ${es.filter((e) => e.kind === "insert").length} insertion(s)${es.filter((e) => e.kind === "create-section").length ? `, ${es.filter((e) => e.kind === "create-section").length} section(s) created` : ""}`);
    for (const e of es) {
      if (e.kind === "stamp") continue;
      if (e.kind === "convert") L.push(`      convert L${e.line} ${e.section ?? "body"}: ${e.old} -> ${JSON.stringify(e.new)} [${e.rule}]`);
      else if (e.kind === "insert") L.push(`      insert  L${e.line} in "${e.section}": ${String(e.new).slice(0, 170)} [${e.rule}]`);
      else L.push(`      ${e.kind} L${e.line} ${e.new ?? ""} ${e.section ?? ""} [${e.rule}]`);
    }
  }
  L.push("", `==== out-links of the families`);
  for (const f of families)
    for (const n of [f.hub, ...f.parts]) {
      const out = [...R.outTargets(v, n).keys()].sort(cmp);
      L.push(`  ${n.rel}: ${out.length} -> ${out.map(slugOfRel).join(", ")}`);
    }
  let predicted: any = null;
  try {
    predicted = await predictedCheck(v, o.pending, families.map((f) => f.hub.rel));
    const g = predicted.graph;
    L.push("", `predicted check.ts (pending list minus this run's parents): ${g.notes} notes (${g.curated} curated); links ${g.undirectedLinks} / directed ${g.directedLinks} / mentions ${g.mentions}; unresolved ${predicted.unresolved.occurrences}; one-way ${predicted.oneWay.links}; zero-incoming ${predicted.zeroIncoming.notes}; check a ${predicted.strict.checks.a.ok ? "ok" : "FAIL"} (${predicted.strict.checks.a.detail}); check i ${predicted.strict.checks.i.ok ? "ok" : "FAIL"} (${predicted.strict.checks.i.detail}); j ${predicted.strict.checks.j.ok ? "ok" : "FAIL"} (${predicted.strict.checks.j.detail}); k ${predicted.strict.checks.k.ok ? "ok" : "FAIL"} (${predicted.strict.checks.k.detail}); g ${predicted.strict.checks.g.ok ? "ok" : "FAIL"}`);
    for (const b of predicted.budget.over) L.push(`  OVER BUDGET ${b.note}: ${b.othersCount} others: ${b.others.join(", ")}`);
    for (const z of predicted.zeroIncoming.items) L.push(`  ZERO INCOMING ${z.note}`);
    for (const c of predicted.collisions.items) L.push(`  COLLISION ${c.key}: ${c.names.map((x: any) => x.note).join(", ")}`);
    for (const p of predicted.families.problemItems) L.push(`  FAMILY ${p.part}: ${p.problem}`);
    if (!predicted.strict.checks.a.ok || !predicted.strict.checks.i.ok || !predicted.strict.checks.j.ok || !predicted.strict.checks.k.ok || !predicted.strict.checks.g.ok || predicted.oneWay.links || predicted.zeroIncoming.notes || predicted.unresolved.occurrences) problems.push("the predicted check.ts run fails a strict check (see above)");
  } catch (e) {
    warnings.push(`predicted check.ts could not run: ${(e as Error).message}`);
  }
  L.push("", `notes changed: ${changedNotes.length} (${changedNotes.filter((n) => n.origText === "\u0000new").length} new parts, ${families.length} hubs, ${changedNotes.length - families.length - changedNotes.filter((n) => n.origText === "\u0000new").length} other notes); fleeting notes touched: ${changedNotes.filter((n) => n.fleeting).length}`);
  if (o.out) {
    for (const n of changedNotes) {
      const p = join(o.out, ...n.path.split("/"));
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, R.noteText(n));
    }
    L.push(`predicted text of ${changedNotes.length} note(s) saved under ${o.out}`);
  }
  if (warnings.length) L.push("", `warnings (${warnings.length}):`, ...warnings.map((w) => "  " + w));
  L.push("", problems.length ? `PROBLEMS (${problems.length}):\n  ` + problems.join("\n  ") : "no problems");
  let code = problems.length ? 1 : 0;

  if (o.mode === "apply") {
    if (problems.length) {
      L.push("", "split.ts --apply: REFUSED, nothing was written");
      return { code: 1, text: L.join("\n") };
    }
    if (!o.manifest) throw new Refusal("--apply needs --manifest <batch manifest>");
    const written: string[] = [];
    for (const n of changedNotes) {
      if (n.fleeting) throw new Error(`internal: refusing to write the fleeting note ${n.path}`);
      R.writeAtomicFile(n.abs, R.noteText(n));
      written.push(n.path);
    }
    // S10 log and conserve allowlist
    const logRows: string[] = [];
    const allowLines: string[] = [];
    for (const b of built) {
      for (const s of [...b.spec.s10].sort((x, y) => x.line - y.line)) {
        const i = s.line - 1;
        const d = b.dest.get(i) ?? "hub";
        const where = d === "hub" ? b.spec.parent : d;
        let finalNew = "";
        if (s.mark === "rewrite") {
          const n = v.byRel.get(where)!;
          // the written line: find it by its plain text
          const want = lineKey(v, s.new!);
          finalNew = n.lines.find((l) => lineKey(v, l) === want) ?? s.new!;
          allowLines.push(`${s.old} => ${finalNew}`);
        }
        const cell = (x: string) => x.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
        logRows.push(`| ${b.spec.id} | ${where} | ${s.line} | ${cell(s.old)} | ${s.mark === "rewrite" ? cell(finalNew) : ""} | ${s.mark === "rewrite" ? cell(s.referent ?? "") : s.mark} | ${cell(s.why ?? "")} |`);
      }
    }
    if (o.positionalLog) {
      const head = ["# Batch positional references (S10, Owner decision 4b)", "", "Every line the split.ts detector flagged in the split notes, with the executor's resolution. `rewrite`: the positional word(s) became \"in [[note]]\" (decision 4b) because the referent moved to another note of the family; `same note`: the referent stays in the note the line lands in; `external`: the reference names something outside the family; `not positional`: the trigger word does not point at a place in the note (a date, an event order, a UI position, a spreadsheet layout, a heading such as Next Steps). Line numbers are the parent's file lines before the split.", "", "| Spec | Note (after the split) | Line | Old | New | Referent / mark | Why |", "|---|---|---|---|---|---|---|"];
      writeAtom(o.positionalLog, head.join("\n") + "\n" + logRows.join("\n") + "\n");
      written.push(relTo(o.vault, o.positionalLog));
    }
    if (o.allow) {
      writeAtom(o.allow, allowLines.length ? allowLines.join("\n") + "\n" : "");
      written.push(relTo(o.vault, o.allow));
    }
    const add = [...written, ...specs.map((s) => relTo(o.vault, s.file))].filter((p) => p && !p.startsWith(".."));
    appendManifest(o.manifest, add);
    L.push("", `split.ts --apply: wrote ${changedNotes.length} note(s) atomically (LF); S10 log ${o.positionalLog ?? "-"}; allowlist ${o.allow ?? "-"} (${allowLines.length} rewrite(s)); manifest ${o.manifest}`);
    code = 0;
  }
  if (o.json) {
    mkdirSync(dirname(o.json), { recursive: true });
    writeFileSync(o.json, JSON.stringify({ tool: ".bedrock/reorg/split.ts", mode: o.mode, date: o.date, specs: specs.map((s) => s.file), problems, warnings, edits: ctx.edits, flags: built.flatMap((b) => b.flags.map((f) => ({ spec: b.spec.id, ...f }))) }, null, 1) + "\n");
  }
  return { code, text: L.join("\n") };
}

function relTo(vault: string, p: string): string {
  const a = resolve(p).replace(/\\/g, "/");
  const b = resolve(vault).replace(/\\/g, "/").replace(/\/?$/, "/");
  return a.toLowerCase().startsWith(b.toLowerCase()) ? a.slice(b.length) : "../" + a;
}
function writeAtom(p: string, text: string) {
  R.writeAtomicFile(p, text);
}
function appendManifest(file: string, paths: string[]) {
  const have = existsSync(file) ? readFileSync(file, "utf8").replace(/^﻿/, "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean) : [];
  const add = [...new Set(paths)].filter((p) => !have.includes(p));
  if (!add.length) return;
  const text = existsSync(file) ? readFileSync(file, "utf8") : "";
  R.writeAtomicFile(file, text + (text === "" || text.endsWith("\n") ? "" : "\n") + add.join("\n") + "\n");
}

async function predictedCheck(v: R.Vault, pendingFile: string | null, splitParents: string[]): Promise<any> {
  const dir = mkdtempSync(join(tmpdir(), "split-plan-"));
  try {
    for (const n of v.notes) {
      const p = join(dir, ...n.path.split("/"));
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, R.noteText(n));
    }
    for (const f of ["CLAUDE.md", ".bedrock/reorg/sources-baseline.json"]) {
      const src = join(v.root, ...f.split("/"));
      if (existsSync(src)) {
        mkdirSync(dirname(join(dir, ...f.split("/"))), { recursive: true });
        copyFileSync(src, join(dir, ...f.split("/")));
      }
    }
    let pend: string | null = null;
    if (pendingFile && existsSync(pendingFile)) {
      const rest = readFileSync(pendingFile, "utf8").split(/\r?\n/).map(relArg).filter((r) => r && !splitParents.includes(r));
      pend = join(dir, "pending.txt");
      writeFileSync(pend, rest.join("\n") + "\n");
    }
    const { analyze } = await import("./check.ts");
    return await analyze({ vault: dir, sizeLimitKB: 50, maxOut: 3, writeBaseline: false, pendingFile: pend, require: null });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// =====================================================================================================================
// --verify: the G-post re-detection on the written families

function verify(v: R.Vault, specs: SplitSpec[]): { code: number; text: string } {
  const L: string[] = [];
  let bad = 0;
  for (const s of specs) {
    const notes = [s.parent, ...s.parts.map((p) => p.rel)];
    const okOld = new Set<string>();
    const okNew = new Set<string>();
    for (const r of s.s10) {
      if (r.mark === "rewrite") okNew.add(lineKey(v, r.new!));
      else okOld.add(lineKey(v, r.old));
    }
    let flaggedLines = 0;
    const unaccounted: string[] = [];
    for (const rel of notes) {
      const n = v.byRel.get(rel);
      if (!n) {
        unaccounted.push(`${rel}: missing`);
        continue;
      }
      if (!R.hasPartOf(n) && rel !== s.parent) unaccounted.push(`${rel}: has no part_of`);
      const b = bytesOf(n);
      if (b >= LIMIT_BYTES) unaccounted.push(`${rel}: ${b} bytes, at or over 50 KB`);
      const bs = R.fmEnd(n.lines) + 1;
      let inHeader = rel !== s.parent;
      for (let i = bs; i < n.lines.length; i++) {
        const l = n.lines[i];
        if (inHeader) {
          if (/^#\s/.test(l) || /^>\s/.test(l) || l.trim() === "") continue;
          inHeader = false;
        }
        TRIGGER.lastIndex = 0;
        if (!TRIGGER.test(l)) continue;
        TRIGGER.lastIndex = 0;
        flaggedLines++;
        if (/^\s*- \[\[[^\]]+\]\] — /.test(l)) continue; // a link-description line (Parts list, C5 line): never a positional reference
        const k = lineKey(v, l);
        if (okOld.has(k) || okNew.has(k)) continue;
        unaccounted.push(`${rel} L${i + 1}: ${l.trim().slice(0, 160)}`);
      }
    }
    bad += unaccounted.length;
    L.push(`${s.id} ${s.parent}: ${notes.length} notes, ${flaggedLines} trigger line(s), ${unaccounted.length} not accounted for by the s10 resolutions`);
    for (const u of unaccounted) L.push("  UNRESOLVED " + u);
  }
  L.push(bad ? `verify: FAIL (${bad})` : "verify: OK (every trigger line is resolved)");
  return { code: bad ? 1 : 0, text: L.join("\n") };
}

// =====================================================================================================================

const USAGE =
  "usage: bun .bedrock/reorg/split.ts --spec <splits/x.json> [--spec <y.json> ...] (--plan | --apply | --verify) [--draft-s10 <file>] [--keep <keep.json>] [--pending <pending-splits.txt>] [--manifest <file>] [--positional-log <file>] [--allow <file>] [--date YYYY-MM-DD] [--out <dir>] [--vault <dir>] [--json <file>]";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function pathArg(x: string): string {
  if (process.platform === "win32") {
    const m = x.match(/^\/([a-zA-Z])(\/.*)?$/);
    if (m) return resolve(m[1].toUpperCase() + ":" + (m[2] ?? "/"));
  }
  return resolve(x);
}
export function parseArgs(argv: string[]): RunOpts | "help" {
  const VALUE = ["--spec", "--keep", "--pending", "--manifest", "--positional-log", "--allow", "--date", "--out", "--vault", "--json", "--draft-s10"];
  const MODES = ["--plan", "--apply", "--verify"];
  const specs: string[] = [];
  const val: Record<string, string> = {};
  const flags = new Set<string>();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.startsWith("--") ? a.indexOf("=") : -1;
    const name = eq > 0 ? a.slice(0, eq) : a;
    if (name === "--help" || name === "-h") return "help";
    if (VALUE.includes(name)) {
      let x: string;
      if (eq > 0) x = a.slice(eq + 1);
      else {
        if (i + 1 >= argv.length || argv[i + 1].startsWith("--")) throw new Refusal(`${name} needs a value`);
        x = argv[++i];
      }
      if (name === "--spec") specs.push(pathArg(x));
      else val[name] = x;
    } else if (MODES.includes(name)) flags.add(name);
    else throw new Refusal(`unknown argument ${a}`);
  }
  const modes = MODES.filter((m) => flags.has(m));
  if (modes.length !== 1) throw new Refusal("give exactly one of --plan, --apply, --verify");
  if (!specs.length) throw new Refusal("--spec <file> is required");
  const date = val["--date"] ?? todayLocal();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Refusal(`--date ${date} is not YYYY-MM-DD`);
  if (modes[0] === "--apply" && !val["--manifest"]) throw new Refusal("--apply needs --manifest <batch manifest>");
  const vault = val["--vault"] ? pathArg(val["--vault"]) : THIS_VAULT;
  const dflt = (rel: string) => (existsSync(join(vault, rel)) ? join(vault, rel) : null);
  return {
    vault,
    specs,
    mode: modes[0].slice(2) as RunOpts["mode"],
    keep: val["--keep"] ? pathArg(val["--keep"]) : dflt(".bedrock/reorg/spec/keep.json"),
    pending: val["--pending"] ? pathArg(val["--pending"]) : dflt(".bedrock/reorg/spec/pending-splits.txt"),
    manifest: val["--manifest"] ? pathArg(val["--manifest"]) : null,
    positionalLog: val["--positional-log"] ? pathArg(val["--positional-log"]) : null,
    allow: val["--allow"] ? pathArg(val["--allow"]) : null,
    date,
    out: val["--out"] ? pathArg(val["--out"]) : null,
    json: val["--json"] ? pathArg(val["--json"]) : null,
    draft: val["--draft-s10"] ? pathArg(val["--draft-s10"]) : null,
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
    console.error(`split.ts: ${e instanceof Refusal || e instanceof R.Refusal ? "REFUSED: " : "FAILED: "}${(e as Error)?.message ?? e}`);
    if (!(e instanceof Refusal || e instanceof R.Refusal)) console.error((e as Error)?.stack ?? "");
    console.error(USAGE);
    process.exitCode = 1;
  }
}
