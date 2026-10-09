// Leaf module of the capture/recall hook: locations and the hook log, using node: built-ins only. hook.ts imports nothing
// else statically, so a broken edit anywhere else (including the graph tooling it shares code with) is caught by its
// try/catch and the hook still exits 0.
//
// Environment overrides exist only so tests can run against a copy of the vault without touching the real one:
//   BRAIN_VAULT         vault root                      (default: two levels up from this folder)
//   BRAIN_PROJECTS_DIR  Claude Code projects folder      (default: ~/.claude/projects)
//   BRAIN_GRAPH_OUT     graph page for a BRAIN_VAULT test (with BRAIN_VAULT set and this unset, no page is built)
import { appendFileSync, mkdirSync, readFileSync, renameSync, statSync, unlinkSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";

export const RECALL_DIR = resolve(import.meta.dir);
export const GRAPH_DIR = resolve(RECALL_DIR, "..", "graph");
export const VAULT = resolve(process.env.BRAIN_VAULT || join(RECALL_DIR, "..", ".."));
export const VAULT_IS_OVERRIDE = Boolean(process.env.BRAIN_VAULT);
export const BEDROCK_DIR = join(VAULT, ".bedrock");
export const INDEX_FILE = join(BEDROCK_DIR, "recall-index.json");
/** per-note parse cache behind the index, so a rebuild re-parses only changed notes (indexer.ts); derived, gitignored */
export const INDEX_CACHE_FILE = join(BEDROCK_DIR, "recall-cache.json");
/** marker of a recall-path rebuild that ran out of time: {sig, at}; recall then serves the old index for a while */
export const INDEX_SLOW_FILE = join(BEDROCK_DIR, "recall", "index-slow.json");
export const HOOK_LOG = join(BEDROCK_DIR, "recall", "hook.log");
export const SYNC_DIR = join(BEDROCK_DIR, "sync");
export const STATE_FILE = join(SYNC_DIR, "state.json");
export const LOCK_FILE = join(SYNC_DIR, "sync.lock");
/** the last sync worker's warning or failure; the next sync hook shows it once */
export const SYNC_WARN_FILE = join(SYNC_DIR, "sync-warning.txt");
export const CATALOG_FILE = join(VAULT, "index.md");
export const LOG_MD = join(VAULT, "log.md");
export const PROJECTS_DIR = resolve(process.env.BRAIN_PROJECTS_DIR || join(homedir(), ".claude", "projects"));
/** Who the hook is, in updated_by fields. */
export const HOOK_ID = "brain-sync@hook";

const LOG_MAX_BYTES = 256 * 1024;

// control characters plus U+2028/2029, built from code points so this source stays ASCII
const BREAKS = new RegExp("[\\u0000-\\u001f\\u007f" + String.fromCharCode(0x2028, 0x2029) + "]+", "g");
/** Collapse any text to one printable line. */
export function oneLine(s: unknown, max = 200): string {
  const t = String(s).replace(BREAKS, " ").replace(/\s{2,}/g, " ").trim();
  return t.length > max ? t.slice(0, max - 3) + "..." : t;
}

/** Local time with offset: "2026-10-03 19:42 -04:00" (log.md), with seconds for hook.log. */
export function localStamp(d = new Date(), seconds = false): string {
  const p = (n: number) => String(n).padStart(2, "0");
  const off = -d.getTimezoneOffset();
  const a = Math.abs(off);
  const time = `${p(d.getHours())}:${p(d.getMinutes())}${seconds ? ":" + p(d.getSeconds()) : ""}`;
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${time} ${off >= 0 ? "+" : "-"}${p(Math.floor(a / 60))}:${p(a % 60)}`;
}

/** Local calendar date "YYYY-MM-DD" (frontmatter dates). */
export function localDate(d = new Date()): string {
  return localStamp(d).slice(0, 10);
}

/** One line in hook.log (size-capped: rotated to hook.log.old at 256 KB). Never throws. */
export function logLine(kind: string, msg: string) {
  try {
    mkdirSync(dirname(HOOK_LOG), { recursive: true });
    try {
      if (statSync(HOOK_LOG).size >= LOG_MAX_BYTES) {
        try {
          unlinkSync(HOOK_LOG + ".old");
        } catch {
          /* no previous .old */
        }
        renameSync(HOOK_LOG, HOOK_LOG + ".old");
      }
    } catch {
      /* no log yet */
    }
    appendFileSync(HOOK_LOG, `${localStamp(new Date(), true)} ${kind} ${oneLine(msg, 1500)}\n`);
  } catch {
    /* logging must never break a hook */
  }
}

export function errText(e: unknown): string {
  return oneLine((e as Error)?.stack ?? (e as Error)?.message ?? e, 1200);
}

/**
 * `hook.ts <sub>` as a detached process: no inherited pipes (a hook runner waiting for EOF is not held up), its own
 * process group, and a cwd inside the vault (never the session's folder, which a worktree cleanup may want to delete).
 * Here, not in sync.ts, so the sync hook starts its worker without loading the sync, index and graph modules: on a
 * machine at 100% CPU that import alone took up to 7 s.
 */
export function startWorker(sub: string, cwd: string = RECALL_DIR) {
  const args = [process.execPath, join(RECALL_DIR, "hook.ts"), sub];
  Bun.spawn(args, { cwd, detached: true, stdin: "ignore", stdout: "ignore", stderr: "ignore", windowsHide: true }).unref();
}

/** The last sync worker's warning, claimed (renamed away first) so that two hooks at once show it only once; or null. */
export function takeSyncWarning(): string | null {
  const claimed = `${SYNC_WARN_FILE}.shown-${process.pid}`;
  try {
    renameSync(SYNC_WARN_FILE, claimed);
  } catch {
    return null; // nothing pending
  }
  try {
    return oneLine(readFileSync(claimed, "utf8"), 900) || null;
  } catch {
    return null;
  } finally {
    try {
      unlinkSync(claimed);
    } catch {
      /* already gone */
    }
  }
}
