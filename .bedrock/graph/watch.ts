// Live watcher: rebuilds brain-graph.html (beside the vault) whenever notes are added, changed or deleted, including notes
// written by hand in Obsidian. Started at logon by the shortcut "Brain Graph Watcher.lnk" in the Startup folder.
//
// It is READ-ONLY on the vault: it only lists and stats *.md files. It writes just two files in this folder (watch.pid,
// watch.log) and, through build.ts, brain-graph.html (atomically: a failed build leaves the previous page in place).
//
//   - Every 15 s it walks the vault (hidden folders such as .git .obsidian .bedrock .trash are skipped) and builds a
//     signature from the sorted path + size + mtime of every *.md file.
//   - When the signature differs from the one the page was last built from, it waits until the vault has been stable for
//     3 s (an editor autosaving, a git pull or a sync still writing) and then runs `bun build.ts` as a hidden child process.
//   - It also builds once when it starts, so the page is current after a logon even if notes changed while it was not running.
//   - After a failed build it retries once, 60 s later; after that it waits for the next change.
//   - One instance only: watch.pid holds the PID, and a second start exits quietly when the first is still alive.
//   - watch.log gets one line per event (timestamp, what changed, build result and duration), rotated at 1 MB (one .old kept).
//
// Stop it:  Stop-Process -Id (Get-Content "<this folder>\watch.pid")     Remove autostart: delete the .lnk in the Startup folder.
// Test flags (never needed normally): --vault <dir> --out <file> --state <dir> --poll <ms> --settle <ms>
import { appendFileSync, readFileSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve } from "node:path";
import { GRAPH_DIR, VAULT, argValue, oneLine } from "./common.ts";

const vaultArg = argValue("--vault");
const outArg = argValue("--out");
const vault = resolve(vaultArg ?? VAULT);
const stateDir = resolve(argValue("--state") ?? GRAPH_DIR);
const POLL_MS = Number(argValue("--poll") ?? 15_000);
const SETTLE_MS = Number(argValue("--settle") ?? 3_000);
const SETTLE_TICK_MS = Math.max(100, Math.min(1_000, Math.floor(SETTLE_MS / 3)));
const SETTLE_MAX_MS = 60_000; // build anyway if the vault never goes quiet
const BUILD_TIMEOUT_MS = 120_000;
const RETRY_AFTER_FAIL_MS = 60_000;
const LOG_MAX_BYTES = 1024 * 1024;
const PID_FILE = join(stateDir, "watch.pid");
const LOG_FILE = join(stateDir, "watch.log");
const LOG_OLD = LOG_FILE + ".old";

// ---------------------------------------------------------------------------------------------------------------- log
function stamp(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  const off = -d.getTimezoneOffset();
  const a = Math.abs(off);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}${off >= 0 ? "+" : "-"}${p(Math.floor(a / 60))}:${p(a % 60)}`;
}

function log(msg: string) {
  try {
    try {
      if (statSync(LOG_FILE).size >= LOG_MAX_BYTES) {
        try {
          unlinkSync(LOG_OLD);
        } catch {
          /* no previous .old */
        }
        renameSync(LOG_FILE, LOG_OLD);
      }
    } catch (e: any) {
      if (e?.code !== "ENOENT") throw e;
    }
    appendFileSync(LOG_FILE, `${stamp()} ${msg}\n`);
  } catch {
    /* logging must never take the watcher down */
  }
}

// ----------------------------------------------------------------------------------------------------- single instance
const readPid = (): number | null => {
  try {
    const t = readFileSync(PID_FILE, "utf8").trim();
    return /^\d+$/.test(t) ? Number(t) : null;
  } catch {
    return null;
  }
};

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0); // signal 0: existence check only
    return true;
  } catch (e: any) {
    return e?.code === "EPERM"; // exists, but not ours to signal
  }
}

/**
 * Is `pid` really a running watcher? After a reboot the number in a stale watch.pid may belong to any process, so being
 * alive is not enough: its command line must name this watch.ts (full path, or the bare relative name). When that cannot
 * be established the file is treated as stale (a watcher that always runs beats a strict single instance when the
 * verification itself fails).
 */
function isWatcher(pid: number): boolean {
  if (!isAlive(pid)) return false;
  try {
    const r = Bun.spawnSync(
      ["powershell.exe", "-NoProfile", "-NonInteractive", "-Command", `(Get-CimInstance Win32_Process -Filter 'ProcessId=${pid}').CommandLine`],
      { stdin: "ignore", stdout: "pipe", stderr: "ignore", windowsHide: true, timeout: 20_000 },
    );
    const cmd = r.stdout.toString().toLowerCase();
    return r.exitCode === 0 && (cmd.includes(join(GRAPH_DIR, "watch.ts").toLowerCase()) || /(^|[\s"'])watch\.ts(["'\s]|$)/.test(cmd));
  } catch {
    return false;
  }
}

/** Claim watch.pid. Returns the holder's PID when a live watcher already has it, or null when we now own it. */
async function acquire(): Promise<number | null> {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      writeFileSync(PID_FILE, process.pid + "\n", { flag: "wx" }); // atomic create: only one starter can win
      return null;
    } catch (e: any) {
      if (e?.code !== "EEXIST") throw e;
    }
    let held = readPid();
    if (held === null) {
      await Bun.sleep(300); // an empty file means another instance is in the middle of writing it
      held = readPid();
    }
    if (held === process.pid) return null;
    if (held !== null && isWatcher(held)) return held;
    if (readPid() === held) {
      try {
        unlinkSync(PID_FILE); // stale: dead PID, a PID reused by something else, or garbage
      } catch {
        /* someone else removed it first */
      }
    }
  }
  throw new Error("could not claim " + PID_FILE);
}

function releasePid() {
  try {
    if (readPid() === process.pid) unlinkSync(PID_FILE);
  } catch {
    /* best effort */
  }
}

// ---------------------------------------------------------------------------------------------------------------- scan
type Snap = Map<string, string>; // vault-relative path -> "size:mtimeMs"
type Diff = { added: number; changed: number; removed: number };
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

function walk(abs: string, rel: string, out: Snap) {
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue; // .git .obsidian .bedrock .trash and every other hidden entry
    const r = rel ? rel + "/" + e.name : e.name;
    if (e.isDirectory()) walk(join(abs, e.name), r, out);
    else if (e.isFile() && /\.md$/i.test(e.name)) {
      try {
        const st = statSync(join(abs, e.name));
        out.set(r, st.size + ":" + st.mtimeMs);
      } catch (err: any) {
        if (err?.code !== "ENOENT") throw err; // vanished between listing and stat: it is simply gone
      }
    }
  }
}

/** null when the vault cannot be read right now (the caller keeps its baseline: an unreadable vault is not "all notes deleted") */
let lastScanError = "";
function tryScan(): Snap | null {
  try {
    const s: Snap = new Map();
    walk(vault, "", s);
    lastScanError = "";
    return s;
  } catch (e) {
    const msg = oneLine((e as Error)?.message ?? e, 160);
    if (msg !== lastScanError) log(`scan error: ${msg} (keeping the last known state, will retry)`);
    lastScanError = msg;
    return null;
  }
}

/** signature of the whole set: sorted path + size + mtimeMs */
function signature(s: Snap): string {
  const lines = [...s].sort(([a], [b]) => cmp(a, b)).map(([p, v]) => p + "|" + v);
  return createHash("sha1").update(lines.join("\n")).digest("hex").slice(0, 12);
}

function diff(prev: Snap, cur: Snap): Diff {
  let added = 0;
  let changed = 0;
  let removed = 0;
  for (const [k, v] of cur) {
    const p = prev.get(k);
    if (p === undefined) added++;
    else if (p !== v) changed++;
  }
  for (const k of prev.keys()) if (!cur.has(k)) removed++;
  return { added, changed, removed };
}

// ---------------------------------------------------------------------------------------------------------------- build
type Outcome = { ok: true; notes: number; links: number; warnings: string[] } | { ok: false; reason: string; where: string[] };

/** `bun build.ts` in this folder, hidden. build.ts prints a final "BUILD_RESULT {json}" line; exit code 0 = published. */
async function runBuild(): Promise<Outcome> {
  const args = [process.execPath, "build.ts"];
  if (vaultArg) args.push("--vault", vault);
  if (outArg) args.push("--out", resolve(outArg));
  let proc: ReturnType<typeof Bun.spawn>;
  try {
    proc = Bun.spawn(args, { cwd: GRAPH_DIR, stdin: "ignore", stdout: "pipe", stderr: "pipe", windowsHide: true });
  } catch (e) {
    return { ok: false, reason: "could not start the build: " + oneLine((e as Error)?.message ?? e), where: [] };
  }
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, BUILD_TIMEOUT_MS);
  const [stdout, stderr] = await Promise.all([new Response(proc.stdout as ReadableStream).text(), new Response(proc.stderr as ReadableStream).text()]);
  const code = await proc.exited;
  clearTimeout(timer);
  if (timedOut) return { ok: false, reason: `build timed out after ${BUILD_TIMEOUT_MS / 1000}s and was stopped`, where: [] };
  const line = stdout.split(/\r?\n/).reverse().find((l) => l.startsWith("BUILD_RESULT "));
  if (line) {
    try {
      const j = JSON.parse(line.slice("BUILD_RESULT ".length));
      if (j.ok && code === 0) return { ok: true, notes: j.notes, links: j.links, warnings: Array.isArray(j.warnings) ? j.warnings.map(String) : [] };
      if (!j.ok) return { ok: false, reason: oneLine(j.reason, 400), where: Array.isArray(j.where) ? j.where.map((w: unknown) => oneLine(w, 120)) : [] };
    } catch {
      /* fall through to the generic message */
    }
  }
  const tail = stderr.split(/\r?\n/).filter(Boolean).pop() ?? "";
  return { ok: false, reason: `build exited with code ${code} and no result${tail ? ": " + oneLine(tail, 200) : ""}`, where: [] };
}

let reported = new Set<string>(); // warnings already logged for the page as it stands
async function rebuild(trigger: string, d: Diff, extra = ""): Promise<boolean> {
  const t0 = performance.now();
  const r = await runBuild();
  const dur = ((performance.now() - t0) / 1000).toFixed(2);
  const head = `rebuild trigger=${trigger} added=${d.added} changed=${d.changed} removed=${d.removed}${extra}`;
  if (r.ok) {
    log(`${head} result=ok duration=${dur}s notes=${r.notes} links=${r.links} warnings=${r.warnings.length}`);
    for (const w of r.warnings) if (!reported.has(w)) log("warn " + oneLine(w, 300)); // only what is new since the last good build
    reported = new Set(r.warnings);
  } else {
    log(`${head} result=FAILED duration=${dur}s reason="${r.reason}"${r.where.length ? ` where=[${r.where.join("; ")}]` : ""} (previous page kept)`);
  }
  return r.ok;
}

// ----------------------------------------------------------------------------------------------------------------- main
/** wait until the vault has been unchanged for SETTLE_MS (re-scanning every second or so); returns the settled state */
async function settle(first: Snap): Promise<{ snap: Snap; waitedMs: number }> {
  const t0 = Date.now();
  let latest = first;
  let latestSig = signature(first);
  let stableSince = Date.now();
  while (Date.now() - stableSince < SETTLE_MS && Date.now() - t0 < SETTLE_MAX_MS) {
    await Bun.sleep(SETTLE_TICK_MS);
    const s = tryScan();
    if (!s) continue;
    const sig = signature(s);
    if (sig !== latestSig) {
      latest = s;
      latestSig = sig;
      stableSince = Date.now();
    }
  }
  return { snap: latest, waitedMs: Date.now() - t0 };
}

async function main() {
  if (vaultArg && !outArg) {
    log("not started: --vault needs --out as well (a test watcher must never write to the live page)");
    return;
  }
  const holder = await acquire();
  if (holder !== null) {
    log(`start ignored: a watcher is already running (pid ${holder})`);
    return;
  }
  process.on("exit", releasePid);
  for (const sig of ["SIGINT", "SIGTERM", "SIGBREAK", "SIGHUP"] as const) {
    try {
      process.on(sig, () => {
        log(`stop (${sig}) pid=${process.pid}`);
        process.exit(0);
      });
    } catch {
      /* this signal is not available on this platform */
    }
  }
  process.on("uncaughtException", (e) => {
    log(`fatal: ${oneLine((e as Error)?.stack ?? e, 400)}`);
    process.exit(1);
  });
  log(`start pid=${process.pid} vault=${vault} poll=${POLL_MS / 1000}s settle=${SETTLE_MS / 1000}s`);

  let baseline: Snap | null = null; // the vault state the page was last built from (or attempted from)
  let failedAt = 0; // when the last build failed; 0 = it did not
  let retried = false;
  let lastError = "";
  for (;;) {
    try {
      const cur = tryScan();
      if (cur) {
        if (baseline === null) {
          baseline = cur;
          const ok = await rebuild("startup", { added: 0, changed: 0, removed: 0 }, ` md_files=${cur.size}`);
          failedAt = ok ? 0 : Date.now();
          retried = false;
        } else if (signature(cur) !== signature(baseline)) {
          const { snap, waitedMs } = await settle(cur);
          const d = diff(baseline, snap);
          baseline = snap;
          const ok = await rebuild("change", d, ` settled_after=${(waitedMs / 1000).toFixed(1)}s`);
          failedAt = ok ? 0 : Date.now();
          retried = false;
        } else if (failedAt && !retried && Date.now() - failedAt >= RETRY_AFTER_FAIL_MS) {
          retried = true;
          const ok = await rebuild("retry", { added: 0, changed: 0, removed: 0 });
          failedAt = ok ? 0 : Date.now();
        }
      }
      lastError = "";
    } catch (e) {
      const msg = oneLine((e as Error)?.stack ?? e, 400);
      if (msg !== lastError) log(`error: ${msg} (carrying on)`);
      lastError = msg;
    }
    await Bun.sleep(POLL_MS);
  }
}

main().catch((e) => {
  log(`fatal: ${oneLine((e as Error)?.stack ?? e, 400)}`);
  process.exit(1);
});
