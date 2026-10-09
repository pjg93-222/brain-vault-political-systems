// Brain vault capture and recall: the one entry point for the Claude Code hooks and for manual runs.
//
//   bun .bedrock/recall/hook.ts session-start      SessionStart: short context about the vault (<= ~400 chars)
//   bun .bedrock/recall/hook.ts recall             UserPromptSubmit: "Brain recall" block for the prompt, or nothing
//   bun .bedrock/recall/hook.ts sync [--dry-run]   Stop / SessionEnd: capture new or changed memory files into fleeting/
//                                                  (as a hook: starts sync-worker and returns; manual runs sync inline)
//   bun .bedrock/recall/hook.ts sync-worker        the full sync, detached from the hook (sync.ts syncWorker)
//   bun .bedrock/recall/hook.ts stale [--dry-run]  list curated notes that cite a changed or missing memory file; unless
//                                                  --dry-run, write fleeting/YYYY-MM-DD-stale-memory-sources.md
//   bun .bedrock/recall/hook.ts index              rebuild .bedrock/recall-index.json and index.md
//   bun .bedrock/recall/hook.ts graph              rebuild the graph page (sync starts this as a detached worker)
//
// Hook input is the JSON Claude Code writes to stdin (read only when stdin is not a terminal). Hook output is JSON on
// stdout: hookSpecificOutput.additionalContext for session-start and recall, systemMessage for sync warnings.
// Contract: it ALWAYS exits 0 and never blocks or alters a prompt. Every error is caught and written to
// .bedrock/recall/hook.log; on error recall prints nothing and sync prints a one-line warning. Only base.ts (node:
// built-ins only) is imported statically; everything else loads inside the try, so even a broken edit elsewhere exits 0.
// A watchdog ends the process before Claude Code's hook timeout would (recall 4 s of 5 s, sync 25 s of 30 s), but it is a
// timer: it cannot interrupt synchronous work. So the slow parts are budgeted (recall's index rebuild) or kept out of the
// hook: the sync hook only starts a detached sync worker (which starts the graph page worker) and shows the previous
// worker's warning, if any. Run inline, a sync took 33-36 s on a busy machine and was killed mid-way.
// Without a hook payload (manual runs) sync runs inline and prints a readable report instead of JSON.
import { mkdirSync, writeFileSync } from "node:fs";
import { SYNC_DIR, SYNC_WARN_FILE, VAULT, errText, logLine, oneLine, startWorker, takeSyncWarning } from "./base.ts";

const sub = process.argv[2] ?? "";
const flags = new Set(process.argv.slice(3));
// graph: at most 4 builds of 120 s plus one 60 s retry pause (sync.ts graphWorker)
// sync-worker: up to 4 min waiting for another sync (sync.ts WORKER_WAIT_MS), then the sync itself
const WATCHDOG_MS: Record<string, number> = { "session-start": 4_000, recall: 4_000, sync: 25_000, "sync-worker": 300_000, stale: 25_000, index: 120_000, graph: 600_000 };
/** stdin that stays open without sending anything (no hook payload is coming) is abandoned after this long */
const STDIN_FIRST_BYTE_MS = 1_500;
/** session-start skips the stale scan when the process is already this old (ms): it takes ~0.2-0.7 s and cannot be interrupted */
const STALE_SKIP_AFTER_MS = 1_500;
const HOOK_LOG_HINT = ".bedrock/recall/hook.log";

let hookMode = false;
let finishing: Promise<never> | null = null;

/** Print `text` (if any) and exit 0. Every exit goes through here once; later callers wait for the first. */
function finish(text?: string): Promise<never> {
  finishing ??= (async () => {
    try {
      if (text) await Bun.write(Bun.stdout, text.endsWith("\n") ? text : text + "\n");
    } catch {
      /* nowhere left to report */
    }
    process.exit(0);
  })();
  return finishing;
}

/** On any failure: log it; sync alone tells the user (one line), everything else stays silent. */
async function fail(e: unknown): Promise<never> {
  logLine("error", `${sub || "(none)"}: ${errText(e)}`);
  if (sub === "sync" || sub === "sync-worker") {
    try {
      (await import("./sync.ts")).releaseLock();
    } catch {
      /* the module itself failed to load */
    }
    const msg = `Brain sync failed: ${oneLine((e as Error)?.message ?? e, 200)} (details: ${HOOK_LOG_HINT})`;
    if (sub === "sync-worker") {
      try {
        mkdirSync(SYNC_DIR, { recursive: true });
        writeFileSync(SYNC_WARN_FILE, msg, "utf8"); // the next sync hook shows it
      } catch {
        /* hook.log has it */
      }
      return finish();
    }
    return finish(hookMode ? JSON.stringify({ systemMessage: msg }) : msg);
  }
  if (sub === "index") return finish(`index FAILED: ${oneLine((e as Error)?.message ?? e, 300)}`);
  return finish();
}

/** A JSON object, or null while `text` is not (yet) one. */
function tryObject(text: string): Record<string, unknown> | null {
  if (!text.trim()) return null;
  try {
    const p = JSON.parse(text);
    return p && typeof p === "object" && !Array.isArray(p) ? p : null;
  } catch {
    return null;
  }
}

/**
 * The hook payload: {} for a terminal, empty input or invalid JSON. Stops as soon as the input is a complete JSON object
 * (a writer that never closes the pipe cannot stall it) and gives up when stdin stays silent.
 */
async function readPayload(): Promise<Record<string, unknown>> {
  if (process.stdin.isTTY) return {};
  const reader = Bun.stdin.stream().getReader();
  const decoder = new TextDecoder();
  let text = "";
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const silent = new Promise<"silent">((res) => (timer = setTimeout(() => res("silent"), STDIN_FIRST_BYTE_MS)));
    let r = await Promise.race([reader.read(), silent]);
    clearTimeout(timer);
    if (r === "silent") {
      hookMode = true; // only a hook runner leaves a pipe open without writing to it
      return {};
    }
    for (;;) {
      if (r.value) text += decoder.decode(r.value, { stream: true });
      if (r.done) break;
      const done = tryObject(text);
      if (done) return done;
      r = await reader.read();
    }
    text += decoder.decode();
  } finally {
    clearTimeout(timer);
    try {
      reader.releaseLock();
    } catch {
      /* stream already closed */
    }
  }
  return tryObject(text) ?? {};
}

export function sessionContext(vault = VAULT): string {
  return [
    `Brain vault (Obsidian + Bedrock): ${vault}.`,
    `Prompts may carry a "Brain recall" block listing matching notes; read one only if it helps.`,
    `Deeper vault questions: /bedrock:ask. Save durable knowledge: /bedrock:preserve.`,
    `Memory files auto-sync into fleeting/ at each stop. index.md is the catalog of all notes.`,
  ].join(" ");
}

/**
 * " N notes cite changed memory - run hook.ts stale", or "" when nothing is stale. Never throws: any failure (a bad note,
 * an unreadable file, a broken module) adds nothing to the session context. The scan reads only notes that mention
 * claude-memory and hashes each cited file once.
 */
export async function staleClause(vault?: string): Promise<string> {
  try {
    if (performance.now() > STALE_SKIP_AFTER_MS) return ""; // the scan is synchronous: never risk the 4 s watchdog on a slow start
    const s = await import("./stale.ts");
    const n = s.staleNoteCount(s.scanStale(vault));
    return n > 0 ? ` ${n} note${n === 1 ? "" : "s"} cite${n === 1 ? "s" : ""} changed memory: run hook.ts stale.` : "";
  } catch (e) {
    logLine("error", `session-start stale scan: ${errText(e)}`);
    return "";
  }
}

async function main(): Promise<never> {
  // session-start and index never need the payload; reading it would only risk waiting on a silent pipe. `sync --hook`
  // says it is a hook outright: on a machine at 100% CPU reading the payload took seconds.
  const payload = sub === "recall" || (sub === "sync" && !flags.has("--hook")) ? await readPayload() : {};
  hookMode ||= flags.has("--hook") || typeof payload.hook_event_name === "string";
  switch (sub) {
    case "session-start":
      return finish(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: sessionContext() + (await staleClause()) } }));
    case "recall": {
      const { recallContext } = await import("./recall.ts");
      const ctx = recallContext(typeof payload.prompt === "string" ? payload.prompt : "");
      return finish(ctx ? JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: ctx } }) : undefined);
    }
    case "sync": {
      if (hookMode && !flags.has("--dry-run")) {
        const pending = takeSyncWarning();
        startWorker("sync-worker");
        return finish(pending ? JSON.stringify({ systemMessage: pending }) : undefined);
      }
      const s = await import("./sync.ts");
      const r = s.sync({ dryRun: flags.has("--dry-run") });
      if (!hookMode) return finish(s.syncText(r));
      const warning = s.syncWarning(r);
      return finish(warning ? JSON.stringify({ systemMessage: warning }) : undefined);
    }
    case "sync-worker": {
      const r = await (await import("./sync.ts")).syncWorker();
      return finish(r.locked ? "sync worker: gave up waiting for the lock" : `sync worker: wrote ${r.written.length} note(s) (${r.ms} ms)`);
    }
    case "stale": {
      const st = await import("./stale.ts");
      const rows = st.scanStale();
      const dry = flags.has("--dry-run");
      const wrote = dry ? null : st.writeStaleNote(rows);
      const tail = wrote ? `wrote ${wrote}.md` : dry && st.staleOnly(rows).length ? "(dry run: nothing written)" : "";
      return finish(tail ? `${st.staleText(rows)}\n${tail}` : st.staleText(rows));
    }
    case "index": {
      const { rebuildIndex } = await import("./indexer.ts");
      const r = rebuildIndex();
      return finish(`index ok: ${r.notes} notes (${r.parsed} parsed, the rest cached), ${r.terms} terms, index.md ${r.catalog}${r.skipped ? `, ${r.skipped} unreadable note(s) skipped` : ""} (${r.ms} ms)`);
    }
    case "graph": {
      const r = (await import("./sync.ts")).graphWorker();
      return finish(r.skipped ? "graph page: skipped (test vault without BRAIN_GRAPH_OUT)" : r.ok ? `graph page rebuilt: ${r.notes} notes, ${r.links} links (${r.ms} ms)` : `graph page NOT rebuilt: ${r.reason}`);
    }
    default:
      process.stderr.write("usage: bun .bedrock/recall/hook.ts <session-start|recall|sync [--dry-run]|sync-worker|stale [--dry-run]|index|graph>\n");
      return finish();
  }
}

if (import.meta.main) {
  process.on("uncaughtException", (e) => void fail(e));
  process.on("unhandledRejection", (e) => void fail(e));
  const limit = WATCHDOG_MS[sub] ?? 4_000;
  setTimeout(() => void fail(new Error(`stopped by the watchdog after ${limit / 1000}s`)), limit).unref?.();
  main().catch((e) => fail(e));
}
