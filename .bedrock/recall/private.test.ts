// Test for capture-time redaction (secrets.ts compileRedactor, sync.ts loadRedactor). Synthetic vault and memory folder under
// os.tmpdir(); the real vault and the real private-patterns.json are never read.
//   bun test .bedrock/recall/private.test.ts
import { afterAll, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const HOOK = join(import.meta.dir, "hook.ts");
const ROOT = mkdtempSync(join(tmpdir(), "private-tests-"));
const VAULT = join(ROOT, "vault");
const MEM = join(ROOT, "projects", "C--demo", "memory");
const env = { ...process.env, BRAIN_VAULT: VAULT, BRAIN_PROJECTS_DIR: join(ROOT, "projects") };
const put = (abs: string, text: string) => {
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, text);
};
afterAll(() => rmSync(ROOT, { recursive: true, force: true }));
const sync = () => Bun.spawnSync([process.execPath, HOOK, "sync"], { stdin: "ignore", stdout: "pipe", stderr: "pipe", env }).stdout.toString();

put(join(VAULT, "topics", "alpha.md"), "---\ntype: topic\ntitle: Alpha\n---\n\n# Alpha\n");
put(
  join(VAULT, ".bedrock", "recall", "private-patterns.json"),
  JSON.stringify({ literal: [["Quokkaco", "[private — see knowledge vault]"], ["zebra.test:4242", "<tunnel-host>:<port>"]], regex: [["[a-z0-9._-]+@example\.test", "<email omitted>"]] }),
);
const body = "Mail pat@example.test or PAT@EXAMPLE.TEST, relay zebra.test:4242, vendor QUOKKACO.";
put(join(MEM, "ops-note.md"), `---\nname: ops-note\ndescription: relay for pat@example.test\n---\n\n${body}\n`);
put(join(MEM, "quokkaco-lane.md"), "---\nname: quokkaco-lane\ndescription: a private subject\n---\n\nAnything.\n");

test("private text is redacted in the note, its source sha stays the real one, and a second sync is idempotent", () => {
  sync();
  expect(readdirSync(join(VAULT, "fleeting"))).toEqual(["demo--ops-note.md"]); // the private-subject memory is not captured
  const note = readFileSync(join(VAULT, "fleeting", "demo--ops-note.md"), "utf8");
  expect(note).toContain("Mail <email omitted> or <email omitted>, relay <tunnel-host>:<port>, vendor [private — see knowledge vault].");
  expect(note).toContain("relay for <email omitted>");
  expect(note).not.toMatch(/example\.test|zebra|quokkaco/i);
  const sha = createHash("sha256").update(readFileSync(join(MEM, "ops-note.md"))).digest("hex");
  expect(note).toContain(`sha256: "${sha}"`);
  const again = sync();
  expect(again).toContain("wrote 0 note(s)");
  expect(again).toContain("1 already in the vault"); // the held note
  expect(again).toContain("1 dismissed"); // the private-subject memory
}, 60_000);
