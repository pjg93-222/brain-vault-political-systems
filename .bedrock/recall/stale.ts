// Stale memory citations: finds curated notes (everything outside fleeting/) whose frontmatter `sources:` cite a Claude
// Code memory file (type "claude-memory") that has changed or disappeared since the note recorded its sha256.
//
// sync.ts keeps only fleeting/ copies current; nothing else notices when a cited memory file moves on. This module is the
// pure scan (no writes except writeStaleNote); hook.ts `stale` prints it and session-start mentions the count.
//   CURRENT  the file at `path` (or the path decoded from `url`) hashes to the recorded sha256
//   STALE    the file exists and hashes to something else
//   MISSING  there is no file at that path
//   NO_SHA   the entry records no sha256, so it cannot be compared
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { INCLUDE_ROOT_NOTES, listNotes, splitFrontmatter } from "../graph/extract.ts";
import { HOOK_ID, VAULT, localDate, parseYaml, sha256, str, writeAtomic } from "./lib.ts";

export type StaleStatus = "CURRENT" | "STALE" | "MISSING" | "NO_SHA";
export type StaleEntry = {
  entity: string; // vault-relative note path without .md ("projects/forecast-redesign")
  memoryFile: string; // absolute path of the cited memory file
  recordedSha: string; // "" when the entry has none
  currentSha: string; // "" when the file is missing
  syncedAt: string; // "" when absent
  status: StaleStatus;
};

type Raw = { path: string; url: string; sha: string; syncedAt: string };

/** Where a source entry points: its `path`, else the path decoded from its file:// `url`; "" when neither is usable. */
function entryPath(r: { path: string; url: string }): string {
  if (r.path) return r.path;
  if (r.url.toLowerCase().startsWith("file:")) {
    try {
      return fileURLToPath(r.url);
    } catch {
      /* malformed url */
    }
  }
  return "";
}

const scalar = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : (str(v) ?? ""));

/** The claude-memory entries of one note's frontmatter; a regex over the inline `{...}` entries covers unparsable YAML. */
export function memorySources(fm: string): Raw[] {
  if (!/claude-memory/.test(fm)) return [];
  const out: Raw[] = [];
  const y = parseYaml(fm);
  if (Array.isArray(y.sources)) {
    for (const s of y.sources as any[]) {
      if (s && typeof s === "object" && scalar(s.type) === "claude-memory") {
        out.push({ path: scalar(s.path), url: scalar(s.url), sha: scalar(s.sha256).toLowerCase(), syncedAt: scalar(s.synced_at) });
      }
    }
    if (out.length) return out;
  }
  for (const m of fm.matchAll(/\{[^{}]*type:\s*"?claude-memory"?[^{}]*\}/g)) {
    const field = (k: string) => {
      const q = m[0].match(new RegExp(k + ':\\s*"((?:[^"\\\\]|\\\\.)*)"'));
      if (q) {
        try {
          return JSON.parse('"' + q[1] + '"') as string;
        } catch {
          return q[1];
        }
      }
      return (m[0].match(new RegExp(k + ":\\s*([^,}\\s]+)")) ?? [])[1] ?? "";
    };
    out.push({ path: field("path"), url: field("url"), sha: field("sha256").toLowerCase(), syncedAt: field("synced_at") });
  }
  return out;
}

/**
 * Every claude-memory source entry of every note outside fleeting/ (hidden folders, _template.md, CLAUDE.md, index.md and
 * log.md are not notes, per the graph's own listing), with its status. Each memory file is hashed once per call.
 */
export function scanStale(vault: string = VAULT): StaleEntry[] {
  const hashes = new Map<string, string>(); // lower-case path -> sha256, "" when the file is missing
  const hashOf = (p: string): string => {
    const key = p.toLowerCase();
    let h = hashes.get(key);
    if (h === undefined) {
      try {
        h = existsSync(p) ? sha256(readFileSync(p)) : "";
      } catch {
        h = "";
      }
      hashes.set(key, h);
    }
    return h;
  };
  const out: StaleEntry[] = [];
  for (const n of listNotes(vault, INCLUDE_ROOT_NOTES, true)) {
    if (n.top === "fleeting") continue;
    let text: string;
    try {
      text = readFileSync(n.abs, "utf8");
    } catch {
      continue;
    }
    if (!text.includes("claude-memory")) continue; // cheap pre-filter: most notes cite no memory file
    for (const r of memorySources(splitFrontmatter(text).fm)) {
      const memoryFile = entryPath(r);
      const currentSha = memoryFile ? hashOf(memoryFile) : "";
      const status: StaleStatus = !currentSha ? "MISSING" : !r.sha ? "NO_SHA" : r.sha === currentSha ? "CURRENT" : "STALE";
      out.push({ entity: n.rel, memoryFile, recordedSha: r.sha, currentSha, syncedAt: r.syncedAt, status });
    }
  }
  return out;
}

export const staleOnly = (rows: StaleEntry[]) => rows.filter((r) => r.status !== "CURRENT");

/** Notes that have at least one entry that is not CURRENT. */
export function staleNoteCount(rows: StaleEntry[]): number {
  return new Set(staleOnly(rows).map((r) => r.entity)).size;
}

const group = (rows: StaleEntry[]) => {
  const by = new Map<string, StaleEntry[]>();
  for (const r of staleOnly(rows)) by.set(r.entity, [...(by.get(r.entity) ?? []), r]);
  return [...by.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
};

/** Compact report for the terminal: one block per note, one line per non-CURRENT entry. */
export function staleText(rows: StaleEntry[]): string {
  const bad = staleOnly(rows);
  if (!bad.length) return `all ${rows.length} claude-memory source entries are current`;
  const g = group(rows);
  const lines = [`${bad.length} stale or missing of ${rows.length} claude-memory source entries, in ${g.length} note(s):`];
  for (const [entity, es] of g) {
    lines.push(entity);
    for (const e of es) lines.push(`  ${e.status.padEnd(7)} ${basename(e.memoryFile) || "(no path)"}  synced ${e.syncedAt || "?"}`);
  }
  return lines.join("\n");
}

/** Vault-relative path of the daily note that lists the stale citations. */
export const staleNoteRel = (date = localDate()) => `fleeting/${date}-stale-memory-sources`;

/** Markdown of the fleeting note: frontmatter in the hook's own convention, a table, and how to refresh. */
export function staleNoteText(rows: StaleEntry[], date = localDate()): string {
  const bad = staleOnly(rows);
  const cell = (s: string) => s.replace(/\|/g, "\\|");
  const table = [
    "| note | memory file | synced_at | status |",
    "| --- | --- | --- | --- |",
    ...group(rows).flatMap(([entity, es]) =>
      es.map((e) => `| [[${entity}]] | \`${cell(basename(e.memoryFile) || "(no path)")}\` | ${e.syncedAt || "?"} | ${e.status} |`),
    ),
  ];
  const notes = new Set(bad.map((r) => r.entity)).size;
  return [
    "---",
    "type: fleeting",
    'title: "Stale memory sources"',
    'aliases: ["stale memory sources"]',
    'source: "session"',
    `captured_at: ${date}`,
    `created_at: ${date}`,
    'status: "raw"',
    'promoted_to: ""',
    "sources: []",
    `updated_at: ${date}`,
    `updated_by: "${HOOK_ID}"`,
    'tags: ["type/fleeting", "status/raw"]',
    "---",
    "",
    "# Stale memory sources",
    "",
    `> Written by \`bun .bedrock/recall/hook.ts stale\`: ${bad.length} source entr${bad.length === 1 ? "y" : "ies"} in ${notes} curated note${notes === 1 ? "" : "s"} cite a Claude Code memory file that changed or is gone since the note recorded its sha256. Regenerated each run; delete it once the list is empty.`,
    "",
    ...table,
    "",
    "To refresh a note, read the changed memory file (the fleeting note the sync hook wrote for it holds the new text), fold what is new into the curated note with `/bedrock:preserve`, and update that note's `sources` entry (new `sha256` and `synced_at`).",
    "",
  ].join("\n");
}

/** Writes (or overwrites) today's stale-sources note when anything is not CURRENT; returns its rel path, else null. */
export function writeStaleNote(rows: StaleEntry[], vault: string = VAULT, date = localDate()): string | null {
  if (!staleOnly(rows).length) return null;
  const rel = staleNoteRel(date);
  writeAtomic(join(vault, ...rel.split("/")) + ".md", staleNoteText(rows, date));
  return rel;
}
