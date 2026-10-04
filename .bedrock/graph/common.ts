// Shared locations and a tiny argument helper for the graph tooling.
// Everything is derived from where this file lives (<vault>/.bedrock/graph), so nothing is tied to a drive letter,
// a user name or a folder name: move or rename the vault and the tooling keeps working.
import { dirname, join, resolve } from "node:path";

/** <vault>/.bedrock/graph */
export const GRAPH_DIR = resolve(import.meta.dir);
/** The vault root: two levels up from this folder. */
export const VAULT = resolve(GRAPH_DIR, "..", "..");
/** The published page lives beside the vault (never inside it): <vault's parent>/brain-graph.html */
export const DEFAULT_OUT = join(dirname(VAULT), "brain-graph.html");

/**
 * System notes in the vault root, by lower-case file name. They are generated or append-only bookkeeping (index.md is the
 * catalog the recall hook writes, log.md the append-only event log); index.md links to every note, so counting them would
 * make every note look linked. They are never graph nodes or link sources, never recall results, and not part of orphan or
 * incoming-link checks.
 */
export const SYSTEM_NOTES: ReadonlySet<string> = new Set(["index.md", "log.md"]);
/** Files in the vault root that are not notes: the vault's instructions for Claude Code plus the system notes. */
export const ROOT_NON_NOTES: ReadonlySet<string> = new Set(["claude.md", ...SYSTEM_NOTES]);

/** Value of `--name <value>` or `--name=value` on the command line, if present. */
export function argValue(name: string, argv: string[] = process.argv.slice(2)): string | undefined {
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === name) return argv[i + 1];
    if (a.startsWith(name + "=")) return a.slice(name.length + 1);
  }
  return undefined;
}

// control characters plus the Unicode line / paragraph separators (built from code points so the source stays ASCII)
const BREAKS = new RegExp("[\\u0000-\\u001f\\u007f" + String.fromCharCode(0x2028, 0x2029) + "]+", "g");

/** Collapse any text to one printable line (for log lines and result messages). */
export function oneLine(s: unknown, max = 200): string {
  const t = String(s).replace(BREAKS, " ").replace(/\s{2,}/g, " ").trim();
  return t.length > max ? t.slice(0, max - 3) + "..." : t;
}
