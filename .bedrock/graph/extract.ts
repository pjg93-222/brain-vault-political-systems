// Extracts the Bedrock vault link graph into a plain JSON structure.
// READ-ONLY on the vault. Exports buildGraph(); run directly (`bun extract.ts`) to print a short audit.
//
// Privacy: the `sources` frontmatter block (paths + sha256) is dropped before anything else touches the text, and every
// free-text value that reaches the output (title, tagline, status, category, domains, updated) goes through toPlain().
//
// Hand-written notes: nothing inside a note may break the build, and every .md note appears in the graph. Missing or
// malformed frontmatter, a missing or unknown `type`, a missing name, odd value types, duplicate file names, notes in the
// vault root and new top-level folders all degrade to a sensible default (see buildGraph). A note with no usable `type`
// takes the type of its top-level folder (actors -> actor, ...); outside those folders it is "other". The only thing that
// stops a publish is the privacy gate in checks.ts.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { VAULT, ROOT_NON_NOTES, oneLine } from "./common.ts";

export { VAULT };

// top-level folder -> entity type (order = canonical order used for sorting / reporting)
export const DIR_TYPE: Record<string, string> = {
  actors: "actor",
  concepts: "concept",
  discussions: "discussion",
  people: "person",
  projects: "project",
  topics: "topic",
  teams: "team",
  fleeting: "fleeting",
};
/** A note with an explicit but unrecognised `type`, or with no type that sits outside the entity folders (vault root, new folders). */
export const OTHER = "other";
export const KNOWN_TYPES: string[] = Object.values(DIR_TYPE);
export const ALL_TYPES: string[] = [...KNOWN_TYPES, OTHER];

/**
 * Notes sitting directly in the vault root are graph nodes too: Obsidian creates new notes there by default, and a note
 * written by hand must always appear. They show as "other" unless their frontmatter has a type. The exceptions are the
 * root files in ROOT_NON_NOTES (common.ts): CLAUDE.md (the vault's instructions for Claude Code) and the system notes
 * index.md (generated catalog) and log.md (append-only event log). Add other tool files there if they ever appear.
 */
export const INCLUDE_ROOT_NOTES = true;

/**
 * The top-level folder of notes generated from the Project Brain by `brainlink project` (ledger/<brain>/D-012.md ...).
 * Like fleeting/ it is outside the curated checks, but it is simpler than that: listNotes() does not return it at all
 * unless asked (recall's statNotes asks, so recall and index.md still see it). The graph, check.ts a-k, conserve.ts,
 * relink.ts and verify-plan.ts therefore never see generated notes.
 */
export const LEDGER_TOP = "ledger";

export type GNode = {
  id: string; // file name without .md; the vault-relative path (no .md) when several notes share a file name
  dir: string; // vault-relative folder, forward slashes ("" for a note in the vault root)
  type: string;
  title: string;
  status: string | null;
  domains: string[];
  category: string | null;
  updated: string | null;
  tagline: string;
  degree: number;
};
export type GLink = { source: string; target: string; weight: number };

const EMAIL = /[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)+/g;

/** Strip emails (and a leading "email"/"e-mail" label + empty brackets they leave behind). */
export function stripEmails(s: string): string {
  let t = s.replace(/\b(?:e-?mail(?:\s+address)?)\s*[:=]?\s*/gi, (m, off, all) => {
    // only drop the label when an address follows it
    const rest = all.slice(off + m.length);
    return new RegExp("^" + EMAIL.source).test(rest) ? "" : m;
  });
  t = t.replace(EMAIL, "");
  t = t.replace(/\(\s*[,;]?\s*\)/g, ""); // "()" left behind
  t = t.replace(/\s+([,.;:)])/g, "$1"); // space before punctuation
  t = t.replace(/\(\s+/g, "(");
  return t.replace(/\s{2,}/g, " ").trim();
}

/**
 * Absolute local paths leak the account name and folder layout. Drop the user-profile prefix
 * (C:\Users\<name>\ [OneDrive\] [Desktop\]) and keep the meaningful tail, e.g.
 *   C:\Users\pgoff\OneDrive\Desktop\Melange Systems  ->  Melange Systems
 *   C:\Users\pgoff\Mentat                            ->  Mentat
 * and drop a dangling path-separator backslash ("Draft Systems\ folder" -> "Draft Systems folder").
 * The same goes for /Users/<name>/ paths and for any other drive prefix ("D:\Backups" -> "Backups").
 */
export function stripLocalPaths(s: string): string {
  let t = s.replace(/(?:[A-Za-z]:)?[\\/]+Users[\\/]+[^\\/\s]+[\\/]+(?:OneDrive[\\/]+)?(?:Desktop[\\/]+)?/gi, "");
  t = t.replace(/(?<![A-Za-z0-9])[A-Za-z]:[\\/]+/g, "");
  t = t.replace(/([A-Za-z0-9_)])\\(?=[\s,.;:)]|$)/g, "$1");
  return t;
}

/** The page never links outside itself: a bare URL in a note keeps only its host name; file:// URLs vanish. */
export function stripUrls(s: string): string {
  return s
    .replace(/\b(?:https?|ftp):\/\/[^\s<>"')\]]+/gi, (u) => {
      const tail = u.match(/[.,;:!?]+$/)?.[0] ?? ""; // sentence punctuation after the URL is not part of it
      try {
        return new URL(tail ? u.slice(0, -tail.length) : u).hostname + tail;
      } catch {
        return tail;
      }
    })
    .replace(/\bfile:\/\/[^\s<>"')\]]*/gi, "");
}

/** wikilinks / inline markdown -> plain text, then strip urls, paths and emails, then collapse whitespace. */
export function toPlain(s: string): string {
  let t = s;
  t = t.replace(/!?\[\[([^\[\]\n]*?)\]\]/g, (_m, inner: string) => {
    const unescaped = inner.replace(/\\\|/g, "|");
    const pipe = unescaped.indexOf("|");
    if (pipe >= 0) return unescaped.slice(pipe + 1).trim(); // [[target|alias]] -> alias
    return unescaped.split("#")[0].split("/").pop()!.replace(/\.md$/i, "").trim() || unescaped; // [[target]] -> target
  });
  t = t.replace(/\[([^\]\n]+)\]\((?:[^)\n]*)\)/g, "$1"); // [text](url) -> text
  t = t.replace(/`+([^`\n]+)`+/g, "$1"); // `code` -> code
  t = t.replace(/\*\*([^*\n]+)\*\*/g, "$1").replace(/__([^_\n]+)__/g, "$1"); // bold
  t = t.replace(/(^|[\s(])\*([^\s*][^*\n]*?[^\s*]|\S)\*(?=[\s).,;:!?]|$)/g, "$1$2"); // *italic*
  t = t.replace(/(^|[\s(])_([^\s_][^_\n]*?[^\s_]|\S)_(?=[\s).,;:!?]|$)/g, "$1$2"); // _italic_
  t = t.replace(/\s+/g, " ").trim();
  t = stripUrls(t);
  t = stripLocalPaths(t); // after backticks are gone, so a trailing path separator is visible
  t = stripEmails(t);
  t = t.replace(/@(?=[A-Za-z0-9_])/g, ""); // leftover sigils such as "@a126952" (git short hash); emails are already gone
  t = t.replace(/(^|\s)@(?=\s|$)/g, "$1at"); // a bare "@" between spaces reads as "at" ("Standup @ 9am")
  t = t.replace(/@/g, ""); // nothing with an at-sign may reach the page
  return t.replace(/\s+/g, " ").trim();
}

/** truncate to at most `max` chars, preferring a word boundary, adding an ellipsis. */
export function truncate(s: string, max = 200): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  const base = sp > max * 0.7 ? cut.slice(0, sp) : cut;
  return base.replace(/[\s,;:.\-\u2013\u2014(\[]+$/, "") + "\u2026";
}

// ---------------------------------------------------------------------------------------------------------------------
// finding notes

export type NoteFile = {
  abs: string; // absolute path
  rel: string; // vault-relative path without ".md", forward slashes (e.g. "people/paul-goff")
  dir: string; // vault-relative folder, forward slashes ("" for a note in the vault root)
  slug: string; // file name without ".md"
  top: string; // top-level folder ("" for the vault root)
};

const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0); // code-unit order, same as Array.prototype.sort()
const isMd = (name: string) => /\.md$/i.test(name);
const isTemplate = (name: string) => /^_template\.md$/i.test(name);

function collect(abs: string, rel: string, out: string[]) {
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue; // hidden: .git .obsidian .bedrock .trash (and anything else a tool drops there)
    const r = rel ? rel + "/" + e.name : e.name;
    if (e.isDirectory()) collect(join(abs, e.name), r, out);
    else if (e.isFile() && isMd(e.name) && !isTemplate(e.name)) out.push(r);
  }
}

/**
 * Every note, in a stable order: the eight entity folders in DIR_TYPE order, then any other top-level folder
 * alphabetically; inside a folder by relative path (identical to the old flat `readdir().sort()` order); notes in the
 * vault root last (unless `rootNotes` is false), by name.
 * _template.md is skipped everywhere; hidden folders and hidden files are never entered.
 */
export function listNotes(vault: string = VAULT, rootNotes: boolean = INCLUDE_ROOT_NOTES, includeLedger = false): NoteFile[] {
  const entries = readdirSync(vault, { withFileTypes: true });
  const tops = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && (includeLedger || e.name.toLowerCase() !== LEDGER_TOP))
    .map((e) => e.name);
  const known = Object.keys(DIR_TYPE).filter((d) => tops.includes(d));
  const extra = tops.filter((d) => !Object.hasOwn(DIR_TYPE, d)).sort(cmp);
  const files: NoteFile[] = [];
  for (const top of [...known, ...extra]) {
    const rels: string[] = [];
    collect(join(vault, top), "", rels);
    rels.sort(cmp);
    for (const r of rels) {
      const slash = r.lastIndexOf("/");
      const name = r.slice(slash + 1);
      files.push({
        abs: join(vault, top, ...r.split("/")),
        rel: top + "/" + r.replace(/\.md$/i, ""),
        dir: slash < 0 ? top : top + "/" + r.slice(0, slash),
        slug: name.replace(/\.md$/i, ""),
        top,
      });
    }
  }
  if (rootNotes) {
    const names = entries
      .filter((e) => e.isFile() && isMd(e.name) && !e.name.startsWith(".") && !isTemplate(e.name) && !ROOT_NON_NOTES.has(e.name.toLowerCase()))
      .map((e) => e.name)
      .sort(cmp);
    for (const name of names) {
      const slug = name.replace(/\.md$/i, "");
      files.push({ abs: join(vault, name), rel: slug, dir: "", slug, top: "" });
    }
  }
  return files;
}

// ---------------------------------------------------------------------------------------------------------------------
// reading one note

type FmState = "ok" | "none" | "unterminated";
/** Split a note into its raw frontmatter text and body (BOM and CRLF normalised). Also used by the recall hook. */
export function splitFrontmatter(raw: string): { fm: string; body: string; state: FmState } {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const empty = text.match(/^---[ \t]*\n---[ \t]*(?:\n|$)/); // "---" immediately followed by "---"
  if (empty) return { fm: "", body: text.slice(empty[0].length), state: "ok" };
  const m = text.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  if (m) return { fm: m[1], body: text.slice(m[0].length), state: "ok" };
  return { fm: "", body: text, state: /^---[ \t]*(?:\n|$)/.test(text) ? "unterminated" : "none" };
}

/** drop the top-level `sources:` block (paths + hashes) from raw frontmatter text */
export function dropSources(fm: string): string {
  const out: string[] = [];
  let skipping = false;
  for (const line of fm.split("\n")) {
    if (/^sources\s*:/.test(line)) {
      skipping = true;
      continue;
    }
    if (skipping) {
      if (/^(\s+|-\s|-$)/.test(line) || line.trim() === "") continue;
      skipping = false;
    }
    out.push(line);
  }
  return out.join("\n");
}

function firstTagline(body: string): string | null {
  const lines = body.split("\n");
  const h1 = lines.findIndex((l) => /^#\s+\S/.test(l));
  if (h1 < 0) return null;
  for (let i = h1 + 1; i < lines.length; i++) {
    if (/^>\s?/.test(lines[i])) return lines[i].replace(/^>\s?/, "");
    if (/^#{1,6}\s/.test(lines[i])) return null; // next heading reached without a blockquote
  }
  return null;
}

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

/** a frontmatter value that is a plain, non-empty string or number, else null */
function scalar(v: unknown): string | null {
  return (typeof v === "string" || typeof v === "number") && String(v).trim() ? String(v) : null;
}
function tagList(v: unknown): string[] {
  const arr: unknown[] = Array.isArray(v) ? v : typeof v === "string" ? v.split(/[,\s]+/) : [];
  return arr.map((t) => String(t).trim().replace(/^#/, "")).filter(Boolean);
}

// ---------------------------------------------------------------------------------------------------------------------

export function buildGraph(vault: string = VAULT, opts: { rootNotes?: boolean } = {}) {
  type Raw = { node: Omit<GNode, "degree">; text: string; file: NoteFile };
  const raws: Raw[] = [];
  /** things worth fixing in a note: the watcher logs each one */
  const warnings: string[] = [];
  /** purely informational: printed by the build, never logged per item */
  const notices: string[] = [];
  let categoryFromTag = 0;
  let categoryFromField = 0;

  const files = listNotes(vault, opts.rootNotes ?? INCLUDE_ROOT_NOTES);
  const slugCount = new Map<string, number>();
  for (const f of files) slugCount.set(f.slug, (slugCount.get(f.slug) ?? 0) + 1);
  for (const [slug, n] of slugCount) {
    if (n > 1) {
      const where = files.filter((f) => f.slug === slug).map((f) => f.rel + ".md");
      warnings.push(`duplicate note name "${oneLine(slug, 60)}": ${where.map((w) => oneLine(w, 80)).join(", ")} (each is identified by its path)`);
    }
  }

  for (const f of files) {
    const where = oneLine(f.rel + ".md", 120);
    const { fm, body, state } = splitFrontmatter(readFileSync(f.abs, "utf8"));
    const fmClean = dropSources(fm);

    // what a note is when it does not state a usable type: its top-level folder's type, "other" outside those folders
    const folderType = Object.hasOwn(DIR_TYPE, f.top) ? DIR_TYPE[f.top] : OTHER;
    const fallback = folderType === OTHER ? `shown as "${OTHER}"` : `typed "${folderType}" from its folder`;

    // frontmatter -> y ({} whenever it is missing or unusable). Broken frontmatter is worth a warning; a note that simply
    // has none is normal for hand-written notes and only counts as a notice.
    let y: Record<string, unknown> = {};
    let fmOk = false;
    if (state === "none") notices.push(`no frontmatter: ${where} (${fallback}, titled by its file name)`);
    else if (state === "unterminated") warnings.push(`frontmatter is never closed with --- : ${where} (${fallback}, titled by its file name)`);
    else {
      try {
        const parsed: unknown = Bun.YAML.parse(fmClean);
        if (parsed == null) fmOk = true; // empty block
        else if (typeof parsed === "object" && !Array.isArray(parsed)) {
          y = parsed as Record<string, unknown>;
          fmOk = true;
        } else warnings.push(`frontmatter is not a key/value block: ${where} (${fallback}, titled by its file name)`);
      } catch (e) {
        warnings.push(`malformed YAML frontmatter: ${where}: ${oneLine((e as Error)?.message ?? e, 100)} (${fallback}, titled by its file name)`);
      }
    }

    // type: a recognised frontmatter `type` wins; an explicit but unrecognised one is "other"; a missing one (no key, empty
    // value, no frontmatter, or frontmatter that cannot be read) falls back to the folder's type
    let type = folderType;
    const typeVal = fmOk ? y.type : undefined;
    const stated = typeVal !== undefined && typeVal !== null && !(typeof typeVal === "string" && typeVal.trim() === "");
    if (stated) {
      const t = typeof typeVal === "string" ? typeVal.trim().toLowerCase() : "";
      if (KNOWN_TYPES.includes(t)) type = t;
      else {
        type = OTHER;
        const shown = typeof typeVal === "string" ? typeVal : JSON.stringify(typeVal);
        warnings.push(`unknown type ${JSON.stringify(oneLine(shown, 40))}: ${where} (shown as "${OTHER}")`);
      }
    } else if (fmOk) notices.push(`no type in frontmatter: ${where} (${fallback})`);
    if (type !== OTHER && Object.hasOwn(DIR_TYPE, f.top) && type !== DIR_TYPE[f.top]) {
      notices.push(`type mismatch ${where}: frontmatter "${type}" vs folder "${DIR_TYPE[f.top]}"`);
    }

    const rawTitle = scalar(y.name) ?? scalar(y.title);
    if (rawTitle == null) notices.push(`no name/title: ${where}`);
    const title = toPlain(rawTitle ?? f.slug) || toPlain(f.slug) || f.slug;

    const tags = tagList(y.tags);
    const domains = [...new Set(tags.filter((t) => t.startsWith("domain/")).map((t) => toPlain(t.slice(7))))].filter(Boolean);
    const catTag = tags.find((t) => t.startsWith("category/"));
    const statusTag = tags.find((t) => t.startsWith("status/"));
    let category: string | null = null;
    if (catTag) {
      category = toPlain(catTag.slice(9)) || null;
      categoryFromTag++;
    } else if (typeof y.category === "string" && y.category.trim()) {
      category = toPlain(y.category.trim()) || null;
      categoryFromField++;
    }
    const statusRaw = typeof y.status === "string" && y.status.trim() ? y.status.trim() : statusTag ? statusTag.slice(7) : null;
    const status = statusRaw == null ? null : toPlain(statusRaw) || null;
    const ua = y.updated_at;
    const updated =
      typeof ua === "string" || typeof ua === "number"
        ? toPlain(String(ua)).slice(0, 10) || null
        : ua instanceof Date && !Number.isNaN(ua.getTime())
          ? ua.toISOString().slice(0, 10)
          : null;

    const tl = firstTagline(body);
    if (tl == null) notices.push(`no tagline: ${where}`);
    const tagline = truncate(toPlain(tl ?? ""), 200);

    // a note whose file name is shared by others is identified by its path instead
    const id = (slugCount.get(f.slug) ?? 0) > 1 ? f.rel : f.slug;
    raws.push({
      node: { id, dir: f.dir, type, title, status, domains, category, updated, tagline },
      text: fmClean + "\n" + body, // frontmatter (minus sources) + body: wikilinks are counted in both
      file: f,
    });
  }

  // wikilink resolution: an exact vault-relative path first, then the bare file name (first note with that name)
  const idByRel = new Map<string, string>(raws.map((r) => [r.file.rel, r.node.id]));
  const idBySlug = new Map<string, string>();
  for (const r of raws) if (!idBySlug.has(r.file.slug)) idBySlug.set(r.file.slug, r.node.id);
  const resolveLink = (inner: string): string | null => {
    const p = wikiPath(inner);
    return idByRel.get(p) ?? idBySlug.get(p.split("/").pop()!) ?? null;
  };

  // directed mention counts, then fold to undirected pairs
  const directed = new Map<string, number>(); // "a\u0000b" -> count of a->b mentions
  let occurrences = 0;
  let unresolved = 0;
  let selfLinks = 0;
  for (const r of raws) {
    WIKI.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = WIKI.exec(r.text))) {
      occurrences++;
      const target = resolveLink(m[1]);
      if (target === null) {
        unresolved++;
        continue;
      }
      if (target === r.node.id) {
        selfLinks++;
        continue;
      }
      const k = r.node.id + "\u0000" + target;
      directed.set(k, (directed.get(k) ?? 0) + 1);
    }
  }
  const pair = new Map<string, number>();
  for (const [k, c] of directed) {
    const [a, b] = k.split("\u0000");
    const [s, t] = a < b ? [a, b] : [b, a];
    const key = s + "\u0000" + t;
    pair.set(key, (pair.get(key) ?? 0) + c);
  }
  const links: GLink[] = [...pair.entries()]
    .map(([k, weight]) => {
      const [source, target] = k.split("\u0000");
      return { source, target, weight };
    })
    .sort((p, q) => (p.source < q.source ? -1 : p.source > q.source ? 1 : p.target < q.target ? -1 : p.target > q.target ? 1 : 0));

  const nb = new Map<string, Set<string>>(raws.map((r) => [r.node.id, new Set<string>()]));
  for (const l of links) {
    nb.get(l.source)!.add(l.target);
    nb.get(l.target)!.add(l.source);
  }
  const nodes: GNode[] = raws.map((r) => ({ ...r.node, degree: nb.get(r.node.id)!.size }));

  return {
    nodes,
    links,
    stats: { occurrences, unresolved, selfLinks, directedPairs: directed.size, categoryFromTag, categoryFromField },
    warnings,
    notices,
  };
}

if (import.meta.main) {
  const { nodes, links, stats, warnings, notices } = buildGraph();
  console.log("nodes", nodes.length, "links", links.length, JSON.stringify(stats));
  console.log("per type:", JSON.stringify(Object.fromEntries(ALL_TYPES.map((t) => [t, nodes.filter((n) => n.type === t).length]))));
  console.log("warnings", warnings.length);
  for (const w of warnings) console.log("  warn  ", w);
  console.log("notices", notices.length);
  for (const w of notices.slice(0, 20)) console.log("  notice", w);
  if (notices.length > 20) console.log("  ... and", notices.length - 20, "more");
  const w = links.map((l) => l.weight).sort((a, b) => a - b);
  const q = (p: number) => w[Math.min(w.length - 1, Math.floor(p * w.length))];
  console.log("weight min/median/p90/max/sum:", w[0], q(0.5), q(0.9), w[w.length - 1], w.reduce((a, b) => a + b, 0));
  console.log("top 10 by degree:");
  for (const n of [...nodes].sort((a, b) => b.degree - a.degree || a.title.localeCompare(b.title)).slice(0, 10))
    console.log("  ", String(n.degree).padStart(3), n.type.padEnd(10), n.id);
}
