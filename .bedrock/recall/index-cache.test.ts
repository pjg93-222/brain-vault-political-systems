// Equivalence of the incremental index rebuild (indexer.ts parse cache) with a rebuild from scratch. The fixture is a copy
// of the notes of the vault this file lives in, under os.tmpdir() and removed at the end: the vault itself is only read,
// never written. After every change below, `hook.ts index` (the incremental path the watcher, sync and recall use) must
// write the same recall-index.json, byte for byte apart from builtAt, and the same index.md as buildIndexData without a
// cache, and must have parsed only the notes it had to. Takes about a minute: about 15 sequential rebuilds of the copy.
//   bun test ./.bedrock/recall/index-cache.test.ts      (the ./ is needed: bun skips hidden folders in a bare filter)
import { afterAll, expect, test } from "bun:test";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, statSync, unlinkSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { listNotes } from "../graph/extract.ts";
import { statNotes } from "./lib.ts";
import { buildIndexData, catalogText } from "./indexer.ts";

const HOOK = join(import.meta.dir, "hook.ts");
const SRC = resolve(import.meta.dir, "..", "..");
const ROOT = mkdtempSync(join(tmpdir(), "index-cache-tests-"));
const VAULT = join(ROOT, "vault");
const INDEX = join(VAULT, ".bedrock", "recall-index.json");
const CACHE = join(VAULT, ".bedrock", "recall-cache.json");
const env = { ...process.env, BRAIN_VAULT: VAULT };
for (const f of listNotes(SRC, true, true)) {
  const to = join(VAULT, relative(SRC, f.abs));
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(f.abs, to);
}
afterAll(() => rmSync(ROOT, { recursive: true, force: true }));

const T = 180_000; // the first rebuild reads every freshly copied note (an antivirus scan can take ~20 s)
const noBuiltAt = (json: string) => json.replace(/"builtAt":"[^"]*"/, '"builtAt":""');
const notes = () => statNotes(VAULT);

/** a rebuild from scratch of the test vault as it is now: no cache read or written */
function full() {
  const { skipped, parsed, ...idx } = buildIndexData(notes());
  return { json: noBuiltAt(JSON.stringify(idx)), catalog: catalogText(idx), count: idx.notes.length };
}

/** `hook.ts index` on the test vault (incremental) must give what full() gives; returns how many notes it parsed */
function rebuildMatchesFull(): number {
  const r = Bun.spawnSync([process.execPath, HOOK, "index"], { env, stdin: "ignore", stdout: "pipe", stderr: "pipe", windowsHide: true });
  const out = r.stdout.toString();
  expect(r.exitCode).toBe(0);
  expect(out).toStartWith("index ok");
  const want = full();
  const got = noBuiltAt(readFileSync(INDEX, "utf8"));
  if (got !== want.json) throw new Error(`index differs from a full rebuild (${got.length} vs ${want.json.length} chars): ${out}`);
  expect(readFileSync(join(VAULT, "index.md"), "utf8")).toBe(want.catalog);
  const parsed = Number(out.match(/\((\d+) parsed/)?.[1]);
  return parsed === want.count ? -1 : parsed; // -1: every note was parsed
}

const pick = (k: number) => notes()[k];

test("no cache yet: every note is parsed, and the cache is written", () => {
  expect(existsSync(CACHE)).toBe(false);
  expect(rebuildMatchesFull()).toBe(-1);
  expect(existsSync(CACHE)).toBe(true);
}, T);

test("(a) nothing changed: nothing is parsed and the cache is not rewritten", () => {
  const before = statSync(CACHE).mtimeMs;
  expect(rebuildMatchesFull()).toBe(0);
  expect(statSync(CACHE).mtimeMs).toBe(before);
}, T);

test("(b) one note edited: only it is parsed (field averages and every tf~ still move)", () => {
  const n = pick(3);
  writeFileSync(n.abs, readFileSync(n.abs, "utf8") + "\n\nAn added paragraph about turbines, quarantine logistics and seventeen zebras.\n");
  expect(rebuildMatchesFull()).toBe(1);
}, T);

test("(b2) touched, then edited at the same size with the exact same mtime: the ctime in the key catches it", () => {
  const n = pick(5);
  const MT = 1_700_000_000; // a whole second, which utimes restores exactly
  utimesSync(n.abs, MT, MT);
  expect(rebuildMatchesFull()).toBe(1); // a touch alone re-parses the note: same content, same index
  const text = readFileSync(n.abs, "utf8");
  const at = text.lastIndexOf("e");
  writeFileSync(n.abs, text.slice(0, at) + "x" + text.slice(at + 1));
  utimesSync(n.abs, MT, MT);
  const st = statSync(n.abs);
  expect([st.size, st.mtimeMs]).toEqual([Buffer.byteLength(text), MT * 1000]);
  expect(rebuildMatchesFull()).toBe(1);
}, T);

test("(c) a note added (new folder, BOM, CRLF, prototype-like terms, numbers)", () => {
  const abs = join(VAULT, "scratch-folder", "added-note.md");
  mkdirSync(dirname(abs), { recursive: true });
  const text = "---\ntitle: Constructor toString proto\naliases: [__proto__ hasOwnProperty, valueOf 2026]\ntags: [domain/test]\n---\n\n# Added note\n\n> constructor __proto__ toString 8806 2026 17 scrapers scraping.\n\n## Heading two\n\nBody text with [[wikilinks|labels]] and `code`.\n";
  writeFileSync(abs, "﻿" + text.replace(/\n/g, "\r\n"));
  expect(rebuildMatchesFull()).toBe(1);
}, T);

test("(d) a note deleted: nothing is parsed and its cache entry is dropped", () => {
  const n = pick(7);
  unlinkSync(n.abs);
  expect(rebuildMatchesFull()).toBe(0);
  const cached = JSON.parse(readFileSync(CACHE, "utf8")).notes.map((e: { note: { p: string } }) => e.note.p);
  expect(cached).not.toContain(n.rel + ".md");
  expect(cached.length).toBe(notes().length);
}, T);

test("(e) a note renamed and moved to another folder: only it is parsed", () => {
  const n = notes().find((x) => x.top === "concepts") ?? pick(9);
  const to = join(VAULT, "topics", "moved-" + n.slug + ".md");
  mkdirSync(dirname(to), { recursive: true });
  renameSync(n.abs, to);
  expect(rebuildMatchesFull()).toBe(1);
}, T);

test("(f) cache missing: full parse", () => {
  unlinkSync(CACHE);
  expect(rebuildMatchesFull()).toBe(-1);
}, T);

test("(f) cache not JSON: full parse", () => {
  writeFileSync(CACHE, "{not json");
  expect(rebuildMatchesFull()).toBe(-1);
}, T);

test("(f) cache truncated: full parse", () => {
  const text = readFileSync(CACHE, "utf8");
  writeFileSync(CACHE, text.slice(0, Math.floor(text.length / 2)));
  expect(rebuildMatchesFull()).toBe(-1);
}, T);

test("(f) cache from other parsing code: full parse", () => {
  const c = JSON.parse(readFileSync(CACHE, "utf8"));
  c.code = "0".repeat(64);
  writeFileSync(CACHE, JSON.stringify(c));
  expect(rebuildMatchesFull()).toBe(-1);
}, T);

test("(f) one malformed cache entry: only that note is parsed", () => {
  const c = JSON.parse(readFileSync(CACHE, "utf8"));
  c.notes[2].fields.body = "garbage";
  writeFileSync(CACHE, JSON.stringify(c));
  expect(rebuildMatchesFull()).toBe(1);
}, T);
