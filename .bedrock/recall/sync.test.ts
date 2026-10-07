// Tests for the sync hook's handoff to the detached sync worker (hook.ts `sync` with a hook payload, sync.ts startSyncWorker /
// syncWorker) and for sync.lock recovery. The fixture is a synthetic vault and memory folder under os.tmpdir(), removed at
// the end; the real vault, its page and the real memory folder are never read or written.
//   bun test .bedrock/recall/sync.test.ts
import { afterAll, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const HOOK = join(import.meta.dir, "hook.ts");
const ROOT = mkdtempSync(join(tmpdir(), "sync-tests-"));
const VAULT = join(ROOT, "vault");
const MEM = join(ROOT, "projects", "C--demo", "memory"); // project slug "demo"
const LOG = join(VAULT, ".bedrock", "recall", "hook.log");
const LOCK = join(VAULT, ".bedrock", "sync", "sync.lock");
const WARN = join(VAULT, ".bedrock", "sync", "sync-warning.txt");
const FLEETING = join(VAULT, "fleeting");
const env = { ...process.env, BRAIN_VAULT: VAULT, BRAIN_PROJECTS_DIR: join(ROOT, "projects") }; // no BRAIN_GRAPH_OUT: no page
const STOP = JSON.stringify({ session_id: "t", transcript_path: "x.jsonl", cwd: ROOT, hook_event_name: "Stop", stop_hook_active: false });
const put = (abs: string, text: string) => {
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, text);
};
put(join(VAULT, "topics", "alpha.md"), "---\ntype: topic\ntitle: Alpha\n---\n\n# Alpha\n\nSee [[beta]].\n");
put(join(VAULT, "concepts", "beta.md"), "---\ntype: concept\ntitle: Beta\n---\n\n# Beta\n\nUsed by [[alpha]].\n");
mkdirSync(MEM, { recursive: true });
afterAll(() => rmSync(ROOT, { recursive: true, force: true }));

const memory = (name: string, body: string) => put(join(MEM, name), `---\nname: ${name.replace(/\.md$/, "")}\ndescription: test memory ${name}\n---\n\n${body}\n`);
const log = () => (existsSync(LOG) ? readFileSync(LOG, "utf8") : "");
const workersDone = () => (log().match(/ sync worker done /g) ?? []).length;
const fleeting = () => (existsSync(FLEETING) ? readdirSync(FLEETING).sort() : []);
/** the Stop hook as Claude Code runs it: payload on stdin; returns stdout and the wall time */
const stopHook = () => {
  const t0 = performance.now();
  const r = Bun.spawnSync([process.execPath, HOOK, "sync"], { stdin: new TextEncoder().encode(STOP), stdout: "pipe", stderr: "pipe", env });
  return { code: r.exitCode, out: r.stdout.toString().trim(), ms: performance.now() - t0 };
};
const until = async (what: () => boolean, ms = 60_000) => {
  for (const end = Date.now() + ms; !what() && Date.now() < end; ) await Bun.sleep(200);
  return what();
};

test("as a hook, sync returns at once and the detached worker captures, logs and releases the lock", async () => {
  memory("first-note.md", "The first memory body.");
  const r = stopHook();
  expect(r.code).toBe(0);
  expect(r.out).toBe(""); // nothing pending: the hook prints nothing, as before
  expect(await until(() => workersDone() === 1)).toBe(true);
  expect(fleeting()).toEqual(["demo--first-note.md"]);
  expect(log()).toMatch(/sync worker done in \d+ ms: 1 memory files, wrote 1, blocked 0, failed 0, index rebuilt/);
  expect(existsSync(LOCK)).toBe(false);
}, 90_000);

test("a lock held by a live process makes the worker wait its turn, then sync", async () => {
  memory("first-note.md", "The first memory body, edited.");
  put(LOCK, JSON.stringify({ pid: process.pid, at: new Date().toISOString() })); // this test runner: alive
  const before = readFileSync(join(FLEETING, "demo--first-note.md"), "utf8");
  stopHook();
  await Bun.sleep(3_000);
  expect(workersDone()).toBe(1); // still waiting
  expect(readFileSync(join(FLEETING, "demo--first-note.md"), "utf8")).toBe(before);
  unlinkSync(LOCK);
  expect(await until(() => workersDone() === 2)).toBe(true);
  expect(readFileSync(join(FLEETING, "demo--first-note.md"), "utf8")).toContain("edited");
  expect(log()).toMatch(/sync worker done in \d+ ms after waiting \d+ s for the lock/);
  expect(existsSync(LOCK)).toBe(false);
}, 90_000);

test("a lock left by a dead process is removed at once, however young", async () => {
  const dead = Bun.spawn([process.execPath, "-e", "0"]);
  await dead.exited;
  put(LOCK, JSON.stringify({ pid: dead.pid, at: new Date().toISOString() }));
  memory("second-note.md", "The second memory body.");
  stopHook();
  expect(await until(() => workersDone() === 3, 20_000)).toBe(true);
  expect(log()).toContain(`removed a stale sync.lock (its owner, pid ${dead.pid}, is gone)`);
  expect(fleeting()).toContain("demo--second-note.md");
  expect(existsSync(LOCK)).toBe(false);
}, 60_000);

test("a worker's warning is shown once, by the next hook", async () => {
  put(join(MEM, "huge.md"), "x".repeat(1024 * 1024 + 10)); // too large to capture: a warning on every sync
  stopHook();
  expect(await until(() => workersDone() === 4)).toBe(true);
  expect(readFileSync(WARN, "utf8")).toContain("huge.md (error: file too large");
  unlinkSync(join(MEM, "huge.md"));
  const shown = stopHook();
  expect(JSON.parse(shown.out).systemMessage).toContain("huge.md (error: file too large");
  expect(await until(() => workersDone() === 5)).toBe(true);
  expect(existsSync(WARN)).toBe(false); // a clean run leaves nothing
  expect(stopHook().out).toBe("");
  expect(await until(() => workersDone() === 6)).toBe(true);
}, 120_000);

test("sync --hook hands off without reading stdin at all", async () => {
  const r = Bun.spawnSync([process.execPath, HOOK, "sync", "--hook"], { stdin: "ignore", stdout: "pipe", stderr: "pipe", env });
  expect(r.exitCode).toBe(0);
  expect(r.stdout.toString().trim()).toBe(""); // hook mode (no readable report), nothing pending
  expect(await until(() => workersDone() === 7)).toBe(true);
}, 60_000);

test("two hooks at once: the workers run one after the other, both captures land once", async () => {
  memory("third-note.md", "The third memory body.");
  memory("fourth-note.md", "The fourth memory body.");
  const a = Bun.spawn([process.execPath, HOOK, "sync"], { stdin: new TextEncoder().encode(STOP), stdout: "pipe", env });
  const b = Bun.spawn([process.execPath, HOOK, "sync"], { stdin: new TextEncoder().encode(STOP), stdout: "pipe", env });
  expect([await a.exited, await b.exited]).toEqual([0, 0]);
  expect(await until(() => workersDone() === 9)).toBe(true);
  expect(fleeting()).toEqual(["demo--first-note.md", "demo--fourth-note.md", "demo--second-note.md", "demo--third-note.md"]);
  const state = JSON.parse(readFileSync(join(VAULT, ".bedrock", "sync", "state.json"), "utf8"));
  expect(Object.keys(state.written).sort()).toEqual(["fleeting/demo--first-note", "fleeting/demo--fourth-note", "fleeting/demo--second-note", "fleeting/demo--third-note"]);
  expect(existsSync(LOCK)).toBe(false);
}, 120_000);
