// Builds the recall index (.bedrock/recall-index.json, gitignored, derived) and the generated catalog index.md (vault root,
// written only when its content changes) from every note. System notes (index.md, log.md), CLAUDE.md, .bedrock/,
// .obsidian/ and every other hidden folder are excluded (statNotes / listNotes).
//
// Scoring model (used by recall.ts): BM25F over the content fields with per-field length normalisation, plus a name match
// on title / aliases / file name and a phrase match on multi-word titles and aliases.
//   content fields and weights: title 3, aliases 2, summary 3, headings 2, tags 1, body 1
//   per (term, note) the index stores tf~ = sum_f w_f * tf_f / (1 - b_f + b_f * len_f / avglen_f)
import { readFileSync } from "node:fs";
import { DIR_TYPE, KNOWN_TYPES, OTHER, splitFrontmatter, dropSources } from "../graph/extract.ts";
import { CATALOG_FILE, INDEX_FILE, VAULT, logLine, oneLine, parseYaml, signature, statNotes, str, strList, writeAtomic, type NoteStat } from "./lib.ts";
import { clip, plainMarkdown, terms } from "./text.ts";

export const INDEX_VERSION = 2;

export type IndexNote = {
  /** vault-relative path with .md, forward slashes */
  p: string;
  /** file name without .md (the wikilink target) */
  slug: string;
  /** title */
  t: string;
  /** one-line summary */
  s: string;
  /** entity type (actor, concept, ..., other) */
  k: string;
};

export type RecallIndex = {
  v: number;
  builtAt: string;
  /** signature of the note set the index was built from (lib.ts signature) */
  sig: string;
  notes: IndexNote[];
  /** content term -> flat [noteIndex, tf~, noteIndex, tf~, ...] */
  post: Record<string, number[]>;
  /** name term (title, aliases, file name) -> [noteIndex, ...] */
  name: Record<string, number[]>;
  /** multi-term titles / aliases / file names: [noteIndex, terms] */
  phrases: [number, string[]][];
};

type FieldName = "title" | "alias" | "summary" | "head" | "tags" | "body";
const FIELDS: { f: FieldName; w: number; b: number }[] = [
  { f: "title", w: 3, b: 0.5 },
  { f: "alias", w: 2, b: 0.5 },
  { f: "summary", w: 3, b: 0.5 },
  { f: "head", w: 2, b: 0.6 },
  { f: "tags", w: 1, b: 0.3 },
  { f: "body", w: 1, b: 0.75 },
];

const TYPE_LABEL: Record<string, string> = {
  actor: "Actors",
  concept: "Concepts",
  discussion: "Discussions",
  person: "People",
  project: "Projects",
  topic: "Topics",
  team: "Teams",
  fleeting: "Fleeting",
  [OTHER]: "Other",
};

/** First sentence of the first prose paragraph (the tagline blockquote in Bedrock notes). */
export function firstSentence(body: string): string {
  const para: string[] = [];
  let fence = false;
  for (const raw of body.replace(/<!--[\s\S]{0,5000}?-->/g, "").split("\n")) {
    const l = raw.trim();
    if (/^(```|~~~)/.test(l)) {
      if (para.length) break;
      fence = !fence;
      continue;
    }
    if (fence) continue;
    const skip = !l || /^#{1,6}(\s|$)/.test(l) || /^(-{3,}|\*{3,}|_{3,})$/.test(l) || l.startsWith("|");
    if (skip) {
      if (para.length) break;
      continue;
    }
    para.push(l.replace(/^>\s?/, "").replace(/^\[![\w-]+\][+-]?\s*/, "").replace(/^(?:[-*+]|\d+\.)\s+/, ""));
  }
  const text = plainMarkdown(para.join(" ").slice(0, 2000)).replace(/\s+/g, " ").trim();
  const m = text.match(/^(.+?[.!?])(?=\s+[A-Z0-9"'(\[]|$)/);
  return m && m[1].length >= 25 ? m[1] : text;
}

type Parsed = {
  note: IndexNote;
  fields: Record<FieldName, string[]>;
  nameText: string[];
};

function parseNote(n: NoteStat): Parsed {
  const raw = readFileSync(n.abs, "utf8");
  const { fm, body } = splitFrontmatter(raw);
  const y = parseYaml(dropSources(fm)); // sources (paths + hashes) never reach the index
  const folderType = Object.hasOwn(DIR_TYPE, n.top) ? DIR_TYPE[n.top] : OTHER;
  const ty = str(y.type)?.toLowerCase();
  const k = ty ? (KNOWN_TYPES.includes(ty) ? ty : OTHER) : folderType;
  const h1 = body.match(/^#\s+(.+)$/m)?.[1];
  const title = clip(plainMarkdown(str(y.title) ?? str(y.name) ?? h1 ?? n.slug), 120) || n.slug;
  const aliases = strList(y.aliases).map((a) => plainMarkdown(a));
  const tags = strList(y.tags).map((t) => t.replace(/^#/, "").split("/").pop()!);
  const summary = clip(plainMarkdown(str(y.description) ?? str(y.summary) ?? firstSentence(body)), 240);
  const lines = body.split("\n");
  const heads = lines.filter((l) => /^#{1,6}\s/.test(l)).map((l) => l.replace(/^#+\s*/, ""));
  const prose = lines.filter((l) => !/^#{1,6}\s/.test(l)).join("\n");
  const slugText = n.slug.replace(/^\d{4}-\d{2}(?:-\d{2})?-/, "").replace(/[-_]+/g, " ");
  return {
    note: { p: n.rel + ".md", slug: n.slug, t: title, s: summary, k },
    fields: {
      title: terms(title),
      alias: terms([...aliases, slugText].join(" \n ")),
      summary: terms(summary),
      head: terms(plainMarkdown(heads.join("\n"))),
      tags: terms(tags.join(" ")),
      body: terms(plainMarkdown(prose)),
    },
    nameText: [title, ...aliases, slugText],
  };
}

/**
 * Build the index from the vault as it is now. Pure apart from reading notes; does not write anything.
 * A note that cannot be read (locked, vanished) is skipped AND left out of the signature, so the next check sees a
 * difference and retries it. With `deadline` (a performance.now() value) the build throws once it runs past it.
 */
export function buildIndexData(notes: NoteStat[] = statNotes(VAULT), deadline = Infinity): RecallIndex & { skipped: number } {
  const parsed: Parsed[] = [];
  const ok: NoteStat[] = [];
  for (const n of notes) {
    if (performance.now() > deadline) throw new Error("index rebuild ran out of time");
    try {
      parsed.push(parseNote(n));
      ok.push(n);
    } catch (e) {
      logLine("index", `skipped unreadable note ${n.rel}.md: ${oneLine((e as Error)?.message ?? e, 200)}`);
    }
  }
  const sig = signature(ok);
  const N = parsed.length;
  const avg: Record<string, number> = {};
  for (const { f } of FIELDS) avg[f] = Math.max(1, parsed.reduce((a, p) => a + p.fields[f].length, 0) / Math.max(1, N));

  // null-prototype maps: a term such as "constructor" must not hit Object.prototype
  const post: Record<string, number[]> = Object.create(null);
  const name: Record<string, number[]> = Object.create(null);
  const phrases: [number, string[]][] = [];
  parsed.forEach((p, i) => {
    const tf = new Map<string, number>();
    for (const { f, w, b } of FIELDS) {
      const toks = p.fields[f];
      if (!toks.length) continue;
      const norm = 1 - b + (b * toks.length) / avg[f];
      const counts = new Map<string, number>();
      for (const t of toks) counts.set(t, (counts.get(t) ?? 0) + 1);
      for (const [t, c] of counts) tf.set(t, (tf.get(t) ?? 0) + (w * c) / norm);
    }
    for (const [t, v] of tf) (post[t] ??= []).push(i, Math.round(v * 100) / 100);
    const nameTerms = new Set<string>();
    const seenPhrase = new Set<string>();
    for (const text of p.nameText) {
      const ts = terms(text);
      for (const t of ts) nameTerms.add(t);
      const key = ts.join(" ");
      if (ts.length >= 2 && !seenPhrase.has(key)) {
        seenPhrase.add(key);
        phrases.push([i, ts]);
      }
    }
    for (const t of nameTerms) (name[t] ??= []).push(i);
  });
  return { v: INDEX_VERSION, builtAt: new Date().toISOString(), sig, notes: parsed.map((p) => p.note), post, name, phrases, skipped: notes.length - ok.length };
}

/** The first line every generated catalog starts with; index.md is only ever overwritten when it starts with these. */
const CATALOG_HEAD = "# Index\n\n> Generated catalog of every note in this vault";

/** The catalog text for index.md. Deterministic: no timestamps, so unchanged notes give byte-identical output. */
export function catalogText(idx: RecallIndex): string {
  const slugCount = new Map<string, number>();
  for (const n of idx.notes) slugCount.set(n.slug, (slugCount.get(n.slug) ?? 0) + 1);
  const order = [...Object.values(DIR_TYPE), OTHER];
  const out: string[] = [
    CATALOG_HEAD + ", grouped by entity type, one line per note: `[[note]] — summary`. Do not edit it by hand: `bun .bedrock/recall/hook.ts index` rewrites it whenever notes change (the capture hook and the graph watcher run it), so hand edits are lost. It is a system note: not a graph node, and not part of recall, orphan or incoming-link checks.",
    "",
    `${idx.notes.length} notes.`,
  ];
  for (const k of order) {
    const group = idx.notes.filter((n) => n.k === k).sort((a, b) => (a.p < b.p ? -1 : a.p > b.p ? 1 : 0));
    if (!group.length) continue;
    out.push("", `## ${TYPE_LABEL[k] ?? k} (${group.length})`, "");
    for (const n of group) {
      const target = (slugCount.get(n.slug) ?? 0) > 1 ? n.p.replace(/\.md$/i, "") : n.slug;
      const summary = n.s.replace(/\[\[|\]\]/g, "");
      out.push(`- [[${target}]]${summary ? " — " + summary : ""}`);
    }
  }
  return out.join("\n") + "\n";
}

export type IndexResult = {
  notes: number;
  terms: number;
  /** "rewritten" | "unchanged" | "kept: not generated" (a hand-written index.md is never overwritten) */
  catalog: string;
  catalogChanged: boolean;
  skipped: number;
  ms: number;
  idx: RecallIndex;
};

/** Rebuild .bedrock/recall-index.json and, when its content changed, index.md. `deadline` as in buildIndexData. */
export function rebuildIndex(notes: NoteStat[] = statNotes(VAULT), deadline = Infinity): IndexResult {
  const t0 = performance.now();
  const { skipped, ...idx } = buildIndexData(notes, deadline);
  writeAtomic(INDEX_FILE, JSON.stringify(idx));
  const text = catalogText(idx);
  let current: string | null = null;
  try {
    current = readFileSync(CATALOG_FILE, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  } catch {
    /* no catalog yet */
  }
  let catalog = "unchanged";
  if (current !== text) {
    if (current === null || current.startsWith(CATALOG_HEAD)) {
      writeAtomic(CATALOG_FILE, text);
      catalog = "rewritten";
    } else {
      catalog = "kept: not generated";
      logLine("index", "index.md exists but was not written by the hook (no generated header): left untouched");
    }
  }
  return { notes: idx.notes.length, terms: Object.keys(idx.post).length, catalog, catalogChanged: catalog === "rewritten", skipped, ms: Math.round(performance.now() - t0), idx };
}
