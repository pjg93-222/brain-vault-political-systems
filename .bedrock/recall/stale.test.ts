// Tests for stale.ts and the hook.ts `stale` subcommand. Every fixture is a synthetic vault under os.tmpdir(), removed at
// the end; the real vault and the real memory folder are never read or written.
//   bun test .bedrock/recall/stale.test.ts
import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { scanStale, staleNoteCount, staleNoteText, staleText, writeStaleNote } from "./stale.ts";
import { sha256 as sha } from "./lib.ts";

const HOOK = join(import.meta.dir, "hook.ts");
const ROOT = mkdtempSync(join(tmpdir(), "stale-tests-"));
const VAULT = join(ROOT, "vault");
const MEM = join(ROOT, "memory");
const memFile = (n: string) => join(MEM, n);
const entry = (path: string, sha256v: string, synced = "2026-10-01", extra = "") =>
  `  - {url: ${JSON.stringify(pathToFileURL(path).href)}, type: "claude-memory", synced_at: ${synced}, path: ${JSON.stringify(path)}, sha256: ${JSON.stringify(sha256v)}${extra}}`;
const note = (rel: string, sources: string[]) => {
  const abs = join(VAULT, ...rel.split("/")) + ".md";
  mkdirSync(join(abs, ".."), { recursive: true });
  writeFileSync(abs, ["---", "type: topic", `title: ${JSON.stringify(rel)}`, "sources:", ...sources, "updated_at: 2026-10-01", "---", "", "# body", ""].join("\n"));
};

beforeAll(() => {
  mkdirSync(MEM, { recursive: true });
  writeFileSync(memFile("current.md"), "current text");
  writeFileSync(memFile("changed.md"), "version one");
  const hashedChanged = sha("version one");
  writeFileSync(memFile("changed.md"), "version two, edited after the note recorded its hash");
  writeFileSync(memFile("other.md"), "other text");

  note("topics/ok", [entry(memFile("current.md"), sha("current text"))]);
  note("projects/stale-one", [entry(memFile("changed.md"), hashedChanged, "2026-09-30")]);
  // several entries in one note: current + stale + missing + a non-memory source that must be ignored
  note("concepts/mixed", [
    entry(memFile("current.md"), sha("current text")),
    entry(memFile("changed.md"), hashedChanged),
    entry(memFile("gone.md"), sha("whatever")),
    '  - {url: "https://example.com/x", type: "confluence", synced_at: 2026-10-01}',
  ]);
  // path missing from the entry: the url is decoded instead; an upper-cased recorded sha still matches
  note("people/url-only", [`  - {url: ${JSON.stringify(pathToFileURL(memFile("other.md")).href)}, type: "claude-memory", synced_at: 2026-10-01, sha256: ${JSON.stringify(sha("other text").toUpperCase())}}`]);
  note("actors/no-sha", [`  - {url: ${JSON.stringify(pathToFileURL(memFile("other.md")).href)}, type: "claude-memory", synced_at: 2026-10-01, path: ${JSON.stringify(memFile("other.md"))}}`]);
  // fleeting/ copies are the sync hook's job: a stale one there must be ignored
  note("fleeting/captured-copy", [entry(memFile("changed.md"), hashedChanged)]);
  // hidden folders and templates are not notes
  note(".obsidian/hidden", [entry(memFile("changed.md"), hashedChanged)]);
  note("topics/_template", [entry(memFile("changed.md"), hashedChanged)]);
});

afterAll(() => rmSync(ROOT, { recursive: true, force: true }));

describe("scanStale", () => {
  const rows = () => scanStale(VAULT);
  const find = (entity: string, file: string) => rows().filter((r) => r.entity === entity && r.memoryFile === memFile(file));

  test("a CURRENT entry", () => {
    const [r] = find("topics/ok", "current.md");
    expect(r.status).toBe("CURRENT");
    expect(r.recordedSha).toBe(r.currentSha);
    expect(r.syncedAt).toBe("2026-10-01");
  });

  test("a planted STALE entry carries both hashes and synced_at", () => {
    const [r] = find("projects/stale-one", "changed.md");
    expect(r.status).toBe("STALE");
    expect(r.recordedSha).toBe(sha("version one"));
    expect(r.currentSha).toBe(sha(readFileSync(memFile("changed.md"))));
    expect(r.syncedAt).toBe("2026-09-30");
  });

  test("a MISSING path", () => {
    const [r] = find("concepts/mixed", "gone.md");
    expect(r.status).toBe("MISSING");
    expect(r.currentSha).toBe("");
  });

  test("several entries in one note are all reported, non-memory sources are not", () => {
    const mixed = rows().filter((r) => r.entity === "concepts/mixed");
    expect(mixed.map((r) => r.status).sort()).toEqual(["CURRENT", "MISSING", "STALE"]);
  });

  test("fleeting/, hidden folders and _template.md are ignored", () => {
    const entities = new Set(rows().map((r) => r.entity));
    expect([...entities].some((e) => e.startsWith("fleeting/"))).toBe(false);
    expect([...entities].some((e) => e.includes("hidden") || e.includes("_template"))).toBe(false);
  });

  test("falls back to the url when there is no path, and compares the sha case-insensitively", () => {
    const [r] = find("people/url-only", "other.md");
    expect(r.status).toBe("CURRENT");
  });

  test("an entry without a sha is NO_SHA", () => {
    const [r] = find("actors/no-sha", "other.md");
    expect(r.status).toBe("NO_SHA");
  });

  test("counts notes, not entries", () => {
    expect(staleNoteCount(rows())).toBe(3); // stale-one, mixed, no-sha
  });
});

describe("report and note", () => {
  test("staleText groups by note and omits CURRENT entries", () => {
    const text = staleText(scanStale(VAULT));
    expect(text).toContain("projects/stale-one");
    expect(text).toContain("MISSING gone.md");
    expect(text).not.toContain("topics/ok");
  });

  test("the fleeting note has the hook's frontmatter convention, a table and the refresh line", () => {
    const text = staleNoteText(scanStale(VAULT), "2026-10-06");
    expect(text).toMatch(/^---\ntype: fleeting\n/);
    expect(text).toContain('status: "raw"');
    expect(text).toContain('updated_by: "brain-sync@hook"');
    expect(text).toContain('tags: ["type/fleeting", "status/raw"]');
    expect(text).toContain("| note | memory file | synced_at | status |");
    expect(text).toContain("| [[projects/stale-one]] | `changed.md` | 2026-09-30 | STALE |");
    expect(text).toContain("/bedrock:preserve");
  });
});

describe("hook.ts stale", () => {
  const run = (...args: string[]) =>
    Bun.spawnSync([process.execPath, HOOK, "stale", ...args], { stdout: "pipe", stderr: "pipe", env: { ...process.env, BRAIN_VAULT: VAULT } });
  // `bun test` forces TZ=UTC in this process, so the hook (a child on local time) can name the file for another date
  const target = () => {
    const f = existsSync(join(VAULT, "fleeting")) ? readdirSync(join(VAULT, "fleeting")).find((n) => /^\d{4}-\d{2}-\d{2}-stale-memory-sources\.md$/.test(n)) : undefined;
    return join(VAULT, "fleeting", f ?? "none-stale-memory-sources.md");
  };

  test("--dry-run prints the list and writes nothing", () => {
    const r = run("--dry-run");
    expect(r.exitCode).toBe(0);
    expect(r.stdout.toString()).toContain("projects/stale-one");
    expect(r.stdout.toString()).toContain("dry run");
    expect(existsSync(target())).toBe(false);
  });

  test("without --dry-run it writes (and overwrites) the dated fleeting note", () => {
    expect(run().exitCode).toBe(0);
    expect(existsSync(target())).toBe(true);
    writeFileSync(target(), "tampered");
    expect(run().exitCode).toBe(0);
    expect(readFileSync(target(), "utf8")).toContain("| [[concepts/mixed]] |");
  });

  test("when every entry is CURRENT nothing is written", () => {
    const clean = mkdtempSync(join(ROOT, "clean-"));
    mkdirSync(join(clean, "topics"), { recursive: true });
    writeFileSync(join(clean, "topics", "ok.md"), ["---", "type: topic", "sources:", entry(memFile("current.md"), sha("current text")), "---", "", "x", ""].join("\n"));
    const r = Bun.spawnSync([process.execPath, HOOK, "stale"], { stdout: "pipe", stderr: "pipe", env: { ...process.env, BRAIN_VAULT: clean } });
    expect(r.exitCode).toBe(0);
    expect(r.stdout.toString()).toContain("current");
    expect(existsSync(join(clean, "fleeting"))).toBe(false);
    expect(writeStaleNote(scanStale(clean), clean)).toBeNull();
  });

  test("session-start adds the clause only when something is stale", () => {
    const ctx = (vault: string) => {
      const r = Bun.spawnSync([process.execPath, HOOK, "session-start"], { stdout: "pipe", stderr: "pipe", env: { ...process.env, BRAIN_VAULT: vault } });
      return JSON.parse(r.stdout.toString()).hookSpecificOutput.additionalContext as string;
    };
    expect(ctx(VAULT)).toMatch(/\d+ notes cite changed memory: run hook\.ts stale\.$/);
    const clean = readdirSync(ROOT).find((n) => n.startsWith("clean-"))!;
    expect(ctx(join(ROOT, clean))).not.toContain("cite");
  });

  test("session-start never throws on a vault it cannot scan", () => {
    const r = Bun.spawnSync([process.execPath, HOOK, "session-start"], { stdout: "pipe", stderr: "pipe", env: { ...process.env, BRAIN_VAULT: join(ROOT, "does-not-exist") } });
    expect(r.exitCode).toBe(0);
    expect(JSON.parse(r.stdout.toString()).hookSpecificOutput.additionalContext).toContain("Brain vault");
  });
});
