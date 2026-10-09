// Shared plumbing for the capture/recall hook: everything in base.ts (locations, hook log) plus atomic writes and the
// vault's note set, which comes from the graph tooling's own note listing so recall and the graph agree on what a note is.
import { mkdirSync, renameSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import { INCLUDE_ROOT_NOTES, listNotes, type NoteFile } from "../graph/extract.ts";
import { VAULT } from "./base.ts";

export * from "./base.ts";

/**
 * Write a file atomically: a hidden temporary file next to it (".<name>.tmp-<pid>", which every vault walker skips and
 * .gitignore covers), then a rename over the target. A reader never sees a half-written file; a rename blocked for a
 * moment by a scanner or an editor holding the file is retried briefly.
 */
export function writeAtomic(path: string, content: string) {
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
    /* already gone */
  }
  throw last;
}

export const sha256 = (data: string | Uint8Array) => createHash("sha256").update(data).digest("hex");

/** A note plus the stat values that make up the vault signature (size, mtime) and the parse-cache key (all three). */
export type NoteStat = NoteFile & { size: number; mtimeMs: number; ctimeMs: number };

/**
 * Every note the graph sees (extract.ts listNotes: the entity folders, other top-level folders and root notes; hidden
 * folders, _template.md files, CLAUDE.md and the system notes index.md and log.md excluded), with size and mtime. A note
 * that vanishes between listing and stat is simply left out.
 */
export function statNotes(vault = VAULT): NoteStat[] {
  const out: NoteStat[] = [];
  for (const f of listNotes(vault, INCLUDE_ROOT_NOTES, true)) { // recall sees ledger/ too
    try {
      const st = statSync(f.abs);
      out.push({ ...f, size: st.size, mtimeMs: st.mtimeMs, ctimeMs: st.ctimeMs });
    } catch (e: any) {
      if (e?.code !== "ENOENT") throw e;
    }
  }
  return out;
}

/** Signature of the note set: sorted relative path + size + mtime. Changes on any add, edit, delete or rename. */
export function signature(notes: NoteStat[]): string {
  const lines = notes.map((n) => `${n.rel}|${n.size}|${Math.round(n.mtimeMs)}`).sort();
  return createHash("sha1").update(lines.join("\n")).digest("hex").slice(0, 16);
}

/** Parse YAML frontmatter text into an object; {} when it is empty, not a mapping, or does not parse. */
export function parseYaml(fm: string): Record<string, unknown> {
  if (!fm.trim()) return {};
  try {
    const y: unknown = Bun.YAML.parse(fm);
    return y && typeof y === "object" && !Array.isArray(y) ? (y as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** A frontmatter value as a non-empty trimmed string, else null. */
export function str(v: unknown): string | null {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (typeof v === "number") return String(v);
  return null;
}

/** A frontmatter list (or comma separated string) as trimmed strings. */
export function strList(v: unknown): string[] {
  const arr: unknown[] = Array.isArray(v) ? v : typeof v === "string" ? v.split(",") : [];
  return arr.map((x) => (typeof x === "string" || typeof x === "number" ? String(x).trim() : "")).filter(Boolean);
}
