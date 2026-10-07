// Tests for the graph page worker (sync.ts startGraphBuild / graphWorker, the hook.ts `graph` subcommand). The fixture is a
// synthetic vault under os.tmpdir(), removed at the end; the real vault, its page and the real memory folder are never
// read or written.
//   bun test .bedrock/recall/graph.test.ts
import { afterAll, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const HOOK = join(import.meta.dir, "hook.ts");
const ROOT = mkdtempSync(join(tmpdir(), "graph-tests-"));
const VAULT = join(ROOT, "vault");
const PAGE = join(ROOT, "page.html");
const LOG = join(VAULT, ".bedrock", "recall", "hook.log");
const FAIL = join(VAULT, ".bedrock", "sync", "graph-fail.txt");
const env = { ...process.env, BRAIN_VAULT: VAULT, BRAIN_PROJECTS_DIR: join(ROOT, "projects"), BRAIN_GRAPH_OUT: PAGE };
const put = (abs: string, text: string) => {
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, text);
};
put(join(VAULT, "topics", "alpha.md"), "---\ntype: topic\ntitle: Alpha\n---\n\n# Alpha\n\nSee [[beta]].\n");
put(join(VAULT, "concepts", "beta.md"), "---\ntype: concept\ntitle: Beta\n---\n\n# Beta\n\nUsed by [[alpha]].\n");
mkdirSync(join(ROOT, "projects"));
afterAll(() => rmSync(ROOT, { recursive: true, force: true }));

const sync = () => Bun.spawnSync([process.execPath, HOOK, "sync"], { stdin: "ignore", stdout: "pipe", stderr: "pipe", env }).stdout.toString();
const log = () => (existsSync(LOG) ? readFileSync(LOG, "utf8") : "");

test("sync hands the page build to a detached worker, which publishes the page and logs it", async () => {
  expect(sync()).toContain("graph page: rebuild started in the background");
  for (let i = 0; i < 120 && !log().includes("graph page rebuilt"); i++) await Bun.sleep(500);
  expect(log()).toContain("graph page rebuilt: 2 notes, 1 links");
  expect(readFileSync(PAGE, "utf8")).toContain('"id":"alpha"');
}, 90_000);

test("a worker failure is shown once by the next sync", () => {
  put(FAIL, "build exited with code null");
  expect(sync()).toContain("PROBLEM graph page not rebuilt: build exited with code null");
  expect(existsSync(FAIL)).toBe(false);
  expect(sync()).not.toContain("PROBLEM");
}, 60_000);
