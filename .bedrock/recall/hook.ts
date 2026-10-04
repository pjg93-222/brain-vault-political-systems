// Brain vault capture and recall: the one entry point for the Claude Code hooks and for manual runs.
//
//   bun .bedrock/recall/hook.ts session-start      SessionStart: short context about the vault (<= ~400 chars)
//   bun .bedrock/recall/hook.ts recall             UserPromptSubmit: "Brain recall" block for the prompt, or nothing
//   bun .bedrock/recall/hook.ts sync [--dry-run]   Stop / SessionEnd: capture new or changed memory files into fleeting/
//   bun .bedrock/recall/hook.ts index              rebuild .bedrock/recall-index.json and index.md
//
// Hook input is the JSON Claude Code writes to stdin (read only when stdin is not a terminal). Hook output is JSON on
// stdout: hookSpecificOutput.additionalContext for session-start and recall, systemMessage for sync warnings.
// Contract: it ALWAYS exits 0 and never blocks or alters a prompt. Every error is caught and written to
// .bedrock/recall/hook.log; on error recall prints nothing and sync prints a one-line warning. Only base.ts (node:
// built-ins only) is imported statically; everything else loads inside the try, so even a broken edit elsewhere exits 0.
// A watchdog ends the process before Claude Code's hook timeout would (recall 4 s of 5 s, sync 25 s of 30 s), and the
// slow parts are budgeted (recall's index rebuild) or bounded by child-process timeouts (the graph build).
// Without a hook payload (manual runs) sync prints a readable report instead of JSON.
import { VAULT, errText, logLine, oneLine } from "./base.ts";

const sub = process.argv[2] ?? "";
const flags = new Set(process.argv.slice(3));
const WATCHDOG_MS: Record<string, number> = { "session-start": 4_000, recall: 4_000, sync: 25_000, index: 120_000 };
/** stdin that stays open without sending anything (no hook payload is coming) is abandoned after this long */
const STDIN_FIRST_BYTE_MS = 1_500;
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
  if (sub === "sync") {
    try {
      (await import("./sync.ts")).releaseLock();
    } catch {
      /* the module itself failed to load */
    }
    const msg = `Brain sync failed: ${oneLine((e as Error)?.message ?? e, 200)} (details: ${HOOK_LOG_HINT})`;
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

async function main(): Promise<never> {
  // session-start and index never need the payload; reading it would only risk waiting on a silent pipe
  const payload = sub === "recall" || sub === "sync" ? await readPayload() : {};
  hookMode ||= typeof payload.hook_event_name === "string";
  switch (sub) {
    case "session-start":
      return finish(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: sessionContext() } }));
    case "recall": {
      const { recallContext } = await import("./recall.ts");
      const ctx = recallContext(typeof payload.prompt === "string" ? payload.prompt : "");
      return finish(ctx ? JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: ctx } }) : undefined);
    }
    case "sync": {
      const s = await import("./sync.ts");
      const r = s.sync({ dryRun: flags.has("--dry-run") });
      if (!hookMode) return finish(s.syncText(r));
      const warning = s.syncWarning(r);
      return finish(warning ? JSON.stringify({ systemMessage: warning }) : undefined);
    }
    case "index": {
      const { rebuildIndex } = await import("./indexer.ts");
      const r = rebuildIndex();
      return finish(`index ok: ${r.notes} notes, ${r.terms} terms, index.md ${r.catalog}${r.skipped ? `, ${r.skipped} unreadable note(s) skipped` : ""} (${r.ms} ms)`);
    }
    default:
      process.stderr.write("usage: bun .bedrock/recall/hook.ts <session-start|recall|sync [--dry-run]|index>\n");
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
