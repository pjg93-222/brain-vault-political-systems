// Fixture tests for the Phase 2 reorganisation tools (plan section 10, batch 1 steps 2, 3 and 7): check.ts, conserve.ts,
// commit.ts, healthcheck.ts and verify-plan.ts. Every fixture is a synthetic vault or git repository under os.tmpdir(),
// removed at the end; the real vault is never read or written (the tools are only run from this folder).
//   bun .bedrock/reorg/check.test.ts        exit 0 = every test passes
// Tests tagged [review ...] are the fixtures the plan reviews asked for (santa rounds 1-3); [decision N] tags an Owner
// decision the test proves.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const HERE = import.meta.dir;
const CHECK = join(HERE, "check.ts");
const CONSERVE = join(HERE, "conserve.ts");
const COMMIT = join(HERE, "commit.ts");
const HEALTH = join(HERE, "healthcheck.ts");
const VERIFY = join(HERE, "verify-plan.ts");
const HOOK = join(HERE, "..", "recall", "hook.ts");
const ROOT = mkdtempSync(join(tmpdir(), "reorg-tests-"));
const sha = (s: string) => createHash("sha256").update(s).digest("hex");

let pass = 0;
let fail = 0;
const failed: string[] = [];
function t(name: string, ok: boolean, detail = "") {
  console.log((ok ? "PASS  " : "FAIL  ") + name + (ok ? "" : "   " + detail.slice(0, 600)));
  if (ok) pass++;
  else {
    fail++;
    failed.push(name);
  }
}
const section = (s: string) => console.log(`\n== ${s} ==`);
const writer = (root: string) => (rel: string, text: string) => {
  const p = join(root, ...rel.split("/"));
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, text);
};
function run(args: string[], env: Record<string, string> = {}) {
  const r = Bun.spawnSync([process.execPath, ...args], { stdout: "pipe", stderr: "pipe", env: { ...process.env, ...env } });
  return { code: r.exitCode, out: r.stdout.toString(), err: r.stderr.toString() };
}
function gitTry(dir: string, ...args: string[]) {
  const r = Bun.spawnSync(["git", "-C", dir, ...args], { stdout: "pipe", stderr: "pipe", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
  return { code: r.exitCode, out: r.stdout.toString(), err: r.stderr.toString() };
}
function git(dir: string, ...args: string[]) {
  const r = gitTry(dir, ...args);
  if (r.code !== 0) throw new Error(`git ${args.join(" ")} in ${dir}: ${r.err}`);
  return r.out;
}
const filler = (kb: number) => ("lorem ipsum dolor sit amet consectetur ".repeat(Math.ceil((kb * 1024) / 39)) + "\n").slice(0, kb * 1024);
const src = (path: string, h: string) => `  - {url: "file:///x", type: "claude-memory", synced_at: "2026-10-03", path: ${JSON.stringify(path)}, sha256: "${h}"}`;
const buildIndex = (vault: string) => run([HOOK, "index"], { BRAIN_VAULT: vault });
function initRepo(dir: string) {
  mkdirSync(dir, { recursive: true });
  git(dir, "init", "-q", "-b", "brain-reorg-2026-10-03");
  git(dir, "config", "user.name", "Fixture");
  git(dir, "config", "user.email", "fixture@example.invalid");
  git(dir, "config", "commit.gpgsign", "false");
}

// =====================================================================================================================
// check.ts
// =====================================================================================================================

const FX = join(ROOT, "fx-vault");
const w = writer(FX);
const checkJson = (vault: string, args: string[] = []) => {
  const jf = join(ROOT, "check-out.json");
  rmSync(jf, { force: true });
  const r = run([CHECK, "--vault", vault, "--json", jf, ...args]);
  return { ...r, j: existsSync(jf) ? JSON.parse(readFileSync(jf, "utf8")) : null };
};

section("check.ts 1: a vault with known defects (the prototype fixture, extended with fleeting notes)");
mkdirSync(join(FX, "people"), { recursive: true }); // an entity folder with no notes
w("CLAUDE.md", "# Fixture\n\n## Domains\n\n- `domain/a` — the a rubric (definition text after the tag)\n- `domain/b` — the b rubric\n\n## Other\n\n- `domain/ignored`\n");
w("log.md", "# Log\n\n- 2026-10-03 | x | y | [[zeta]], [[loose]], [[alpha]]\n");
const alpha = (two: string) =>
  `---\ntype: actor\nname: Alpha\ntags: [type/actor, domain/a]\nrelated: ["[[beta]]"]\nsources:\n${src("C:\\mem\\one.md", sha("1"))}\n${src("C:\\mem\\two.md", sha(two))}\n---\n\n# Alpha\n\n> tagline\n\nLinks: [[beta]] [[actors/gamma]] [[delta|the delta]] [[epsilon#Section]] and self [[alpha]].\n`;
w("actors/alpha.md", alpha("2"));
const beta = (srcs: string[]) => `---\ntype: actor\nname: Beta\ntags: [type/actor, domain/a]\nsources:${srcs.length ? "\n" + srcs.join("\n") : " []"}\n---\n\n# Beta\n\n> t\n\n[[alpha]] and [[dup]].\n`;
w("actors/beta.md", beta([src("C:\\mem\\three.md", sha("3")), src("C:\\mem\\six.md", sha("6"))]));
w("actors/gamma.md", `---\ntype: actor\nname: Gamma\ntags: [type/actor, domain/b, domain/a]\nsources: []\n---\n\n# Gamma\n\n> t\n\n[[alpha]] and [[topics/dup]].\n`);
w("actors/dup.md", `---\ntype: actor\nname: Dup actor\ntags: [type/actor, domain/a]\n---\n\n# Dup actor\n\n> t\n\n[[beta]]\n`);
w("topics/dup.md", `---\ntype: topic\nname: Dup topic\ntags: [type/topic, domain/b]\n---\n\n# Dup topic\n\n> t\n\n[[gamma]]\n`);
w("topics/delta.md", `---\ntype: topic\nname: Delta\ntags: [type/topic, domain/zzz]\n---\n\n# Delta\n\n> t\n\n[[alpha]]\n\n${filler(55)}`);
w("topics/epsilon.md", `---\ntype: topic\nname: Epsilon\ntags: [type/topic, domain/a]\nsize_reason: "verbatim archive"\n---\n\n# Epsilon\n\n> t\n\n[[alpha]] [[Missing Note]] [[ALPHA]] [[index]]\n\n${filler(52)}`);
w("concepts/zeta.md", `---\ntype: concept\nname: Zeta\ntags: [type/concept]\n---\n\n# Zeta\n\n> t\n\n[[alpha]]\n`);
w("concepts/omega.md", `---\ntype: concept\nname: Omega\ntags: [type/concept, domain/a]\n---\n\n# Omega\n\n> t\n\nno links here\n`);
w("loose.md", `just a loose root note with no frontmatter [[alpha]]\n`);
w("broken-yaml.md", `---\ntype: [unclosed\n---\n\nbody [[alpha]]\n`);
w("unterminated.md", `---\ntype: topic\nno closing fence here\n`);
const cap1 = (srcs: string[]) =>
  `---\ntype: fleeting\ntitle: Capture one\nstatus: raw\nsources:\n${srcs.join("\n")}\n---\n\n# Capture one\n\n> captured\n\n[[alpha]] [[Ghost Note]] [[omega]]\n\n${filler(60)}`;
w("fleeting/cap1.md", cap1([src("C:\\mem\\five.md", sha("5")), src("C:\\mem\\six.md", sha("6"))]));
w("index.md", "# Index\n\n> Generated catalog of every note in this vault, grouped by entity type. hand made\n\n5 notes.\n");

let { code, out, j } = checkJson(FX);
t("1.0 exits 0 without --strict even with failures", code === 0, String(code));
t("1.1 13 notes: 12 curated + 1 fleeting (system notes and CLAUDE.md excluded)", j.graph.notes === 13 && j.graph.curated === 12 && j.graph.fleeting === 1, JSON.stringify([j.graph.notes, j.graph.curated, j.graph.fleeting]));
t("1.2 [review] buildGraph cross-check holds on tricky links (path-qualified, alias, heading, self, duplicate slug, fleeting)", j.graph.consistentWithBuildGraph === true, JSON.stringify(j.graph.inconsistencies));
t("1.3 self mention counted separately (1)", j.graph.selfMentions === 1, String(j.graph.selfMentions));
const unr = j.unresolved;
t("1.4 b: curated unresolved = Missing Note + ALPHA (2); [[Ghost Note]] in the fleeting note is exempt [decision 10]", unr.occurrences === 2 && unr.distinct === 2 && unr.fleetingExempt.distinct === 1 && !unr.items.some((i: any) => i.target === "Ghost Note"), JSON.stringify(unr));
t("1.5 unresolved hint for a case mismatch", unr.items.some((i: any) => i.target === "ALPHA" && /only the case differs from alpha/.test(i.hint ?? "")), JSON.stringify(unr.items));
t("1.6 a link to [[index]] is a root non-note link, not unresolved", unr.rootNonNoteLinks.occurrences === 1 && !unr.items.some((i: any) => i.target === "index"));
const ow = j.oneWay.items.map((i: any) => `${i.from}>${i.to}`);
t("1.7 c: curated one-way is exactly zeta>alpha, loose>alpha, broken-yaml>alpha", ow.length === 3 && ["concepts/zeta>actors/alpha", "loose>actors/alpha", "broken-yaml>actors/alpha"].every((x) => ow.includes(x)), ow.join(" | "));
const fow = j.fleeting.oneWay.map((i: any) => `${i.from}>${i.to}`);
t("1.8 c: one-way pairs with a fleeting end are exempt and listed in the fleeting block [decision 1]", j.oneWay.fleetingExempt === 2 && fow.includes("fleeting/cap1>actors/alpha") && fow.includes("fleeting/cap1>concepts/omega"), fow.join(" | "));
t("1.9 mutual pairs: 6; reciprocated + one-way (curated + fleeting) = directed", j.oneWay.mutualPairs === 6 && j.oneWay.reciprocatedDirectedLinks + j.oneWay.links + j.oneWay.fleetingExempt === j.oneWay.directedLinks, JSON.stringify(j.oneWay));
const zi = j.zeroIncoming.items.map((i: any) => i.note);
t("1.10 d: zeta, loose, broken-yaml, unterminated and omega have no curated incoming link (log.md and index.md ignored)", zi.length === 5 && ["concepts/zeta", "loose", "broken-yaml", "unterminated", "concepts/omega"].every((x) => zi.includes(x)), zi.join(","));
t("1.11 d: an incoming link from a fleeting note does not count (omega) [decision 1]", j.zeroIncoming.items.find((i: any) => i.note === "concepts/omega")?.incomingFromFleeting === 1 && j.fleeting.curatedIncomingOnlyFromFleeting.includes("concepts/omega"));
t("1.12 d: the fleeting note itself is exempt", !zi.includes("fleeting/cap1"));
t("1.13 e: only alpha has more than 3 targets (4)", j.outgoing.items.length === 1 && j.outgoing.items[0].note === "actors/alpha" && j.outgoing.items[0].links === 4, JSON.stringify(j.outgoing.items));
t("1.14 alpha mentions: beta twice (frontmatter + body)", j.notes.find((n: any) => n.note === "actors/alpha").outgoingMentions === 5);
t("1.15 duplicate slug: [[dup]] resolves to actors/dup, [[topics/dup]] to topics/dup", j.notes.find((n: any) => n.note === "actors/dup").incomingLinks === 1 && j.notes.find((n: any) => n.note === "topics/dup").incomingLinks === 1);
const failingSizes = j.sizes.failing.map((x: any) => x.note).sort();
t("1.16 a: default limit 50 KB; delta (55 KB) and epsilon (52 KB) fail; size_reason does not exempt", j.sizes.limitKB === 50 && JSON.stringify(failingSizes) === JSON.stringify(["topics/delta", "topics/epsilon"]), JSON.stringify(j.sizes.failing));
t("1.17 a: a curated size_reason is itself a finding (Phase 2 grants none)", j.sizes.withSizeReason.length === 1 && j.sizes.withSizeReason[0].note === "topics/epsilon");
t("1.18 a: the 60 KB fleeting note is exempt and listed [decision 1]", j.sizes.fleetingExempt.length === 1 && j.sizes.fleetingExempt[0].note === "fleeting/cap1" && !failingSizes.includes("fleeting/cap1"));
t("1.19 an empty entity folder (people) has a row with 0 notes", j.sizes.perFolder.some((f: any) => f.folder === "people" && f.notes === 0));
t("1.20 g: allowed list parsed from the Domains bullets only, definitions after the tag ignored", JSON.stringify(j.domains.allowed) === JSON.stringify(["domain/a", "domain/b"]), JSON.stringify(j.domains.allowed));
t("1.21 g: delta has a tag that is not allowed", j.domains.notAllowed.length === 1 && j.domains.notAllowed[0].note === "topics/delta");
t("1.22 g: gamma has several domain tags", j.domains.several.length === 1 && j.domains.several[0].note === "actors/gamma");
t("1.23 g: notes with no tag are curated only (zeta, loose, broken-yaml, unterminated; not the fleeting note)", ["concepts/zeta", "loose", "broken-yaml", "unterminated"].every((x) => j.domains.noDomain.some((n: any) => n.note === x)) && !j.domains.noDomain.some((n: any) => n.note === "fleeting/cap1"));
t("1.24 frontmatter problems reported (broken yaml, unterminated)", j.graph.frontmatterProblems.length >= 2);
t("1.25 h: index.md stale", j.index.state === "stale" && j.index.generatedNotes === 13 && j.index.fileNotes === 5, JSON.stringify([j.index.state, j.index.generatedNotes, j.index.fileNotes]));
t("1.26 f: no baseline yet, f fails", j.strict.checks.f.ok === false && "error" in j.sources.baseline);
t("1.27 strict (all checks required): failed = a b c d f g h; i j k pass", JSON.stringify(j.strict.failed) === JSON.stringify(["a", "b", "c", "d", "f", "g", "h"]), JSON.stringify(j.strict.failed));
const fl = j.fleeting.items.find((x: any) => x.note === "fleeting/cap1");
t("1.28 fleeting block: size, outgoing targets, unresolved links and incoming count [decisions 1, 10]", j.fleeting.notes === 1 && fl.bytes > 60000 && JSON.stringify(fl.outgoingTargets) === JSON.stringify(["actors/alpha", "concepts/omega"]) && fl.unresolved[0]?.target === "Ghost Note" && fl.incomingLinks === 0, JSON.stringify(fl));
t("1.29 human summary prints every block", ["[a] Sizes", "[b] Unresolved", "[c] One-way", "[d] Curated notes with no", "[e] Distinct outgoing", "[f] Sources", "[g] Domain", "[h] index.md", "[i] Leaf link budget", "[j] Split families", "[k] Name collisions", "[fleeting] Awaiting organization"].every((s) => out.includes(s)));

section("check.ts 2: strict exit code and options");
let r = run([CHECK, "--vault", FX, "--strict"]);
t("2.1 --strict exits 1 when required checks fail", r.code === 1, String(r.code));
r = run([CHECK, "--vault", FX, "--size-limit", "0.5", "--max-out", "10"]);
t("2.2 options accepted, exit 0 without --strict", r.code === 0, r.err);
({ j } = checkJson(FX, ["--size-limit", "100", "--max-out", "4"]));
t("2.3 --size-limit 100: nothing over; a still fails on epsilon's size_reason; --max-out 4: alpha (4) is not above", j.sizes.overLimit.length === 0 && j.sizes.failing.length === 0 && !j.strict.checks.a.ok && j.outgoing.items.length === 0);
r = run([CHECK, "--vault", FX, "--strict", "--require", "e"]);
t("2.4 --require rejects a letter that is not a strict check (e is info), strict exit 1", r.code === 1 && /not a strict check/.test(r.err), r.err);
r = run([CHECK, "--vault", FX, "--strict", "--require", "ij"]);
t("2.5 --require ij (letters without commas): i and j pass here, so --strict exits 0 despite a b c d f g h", r.code === 0 && /would pass \(required: i,j\)/.test(r.out), r.out.split("\n").slice(-2).join(" | "));
r = run([CHECK, "--vault", FX, "--strict", "--require", "a,b"]);
t("2.6 --require a,b: exit 1, failed list holds only the required failures", r.code === 1 && /would FAIL \(a, b; required: a,b\)/.test(r.out) && /c fail \(not required\)/.test(r.out), r.out.split("\n").slice(-2).join(" | "));

section("check.ts 3: sources baseline and decision 14 (fleeting-only pairs reported, not enforced)");
r = run([CHECK, "--vault", FX, "--write-sources-baseline"]);
t("3.1 baseline written (exit 0)", r.code === 0 && /baseline WRITTEN/.test(r.out), r.out.slice(0, 300));
const bl = JSON.parse(readFileSync(join(FX, ".bedrock/reorg/sources-baseline.json"), "utf8"));
const holders = Object.fromEntries(bl.pairs.map((p: any) => [p.path.split("\\").pop(), p.notes.join("+")]));
t("3.2 baseline: 5 pairs with their holders (six held by a curated and a fleeting note, five by the fleeting note only)", bl.pairs.length === 5 && holders["six.md"] === "actors/beta+fleeting/cap1" && holders["five.md"] === "fleeting/cap1", JSON.stringify(holders));
({ j } = checkJson(FX));
t("3.3 enforced = 4 (a curated note held them), all held exactly; five.md reported as fleeting-only [decision 14]", j.sources.enforced === 4 && j.sources.coveredExactly === 4 && j.sources.missing === 0 && j.sources.fleetingOnly === 1 && j.strict.checks.f.ok, JSON.stringify([j.sources.enforced, j.sources.coveredExactly, j.sources.fleetingOnly]));
// break it: beta loses three and six (six is still held by the fleeting note, which does not count); alpha's two.md gets a
// new sha; gamma gains four.md; the owner dismisses the capture (deletes cap1)
w("actors/beta.md", beta([]));
w("actors/alpha.md", alpha("2-new"));
w("actors/gamma.md", `---\ntype: actor\nname: Gamma\ntags: [type/actor, domain/b]\nsources:\n${src("C:\\mem\\four.md", sha("4"))}\n---\n\n# Gamma\n\n> t\n\n[[alpha]] and [[topics/dup]].\n`);
({ j, code } = checkJson(FX, ["--strict"]));
const miss = j.sources.missingItems.map((m: any) => m.path.split("\\").pop()).sort();
t("3.4 missing = three.md and six.md: a pair a curated note held must still be held by a curated note [decision 14]", JSON.stringify(miss) === JSON.stringify(["six.md", "three.md"]), JSON.stringify(j.sources.missingItems));
t("3.5 superseded = 1 (two.md has another sha256), not missing", j.sources.coveredByNewerSha === 1 && j.sources.supersededItems[0].path.endsWith("two.md"));
t("3.6 held exactly = 1 (one.md); f fails; strict exit 1", j.sources.coveredExactly === 1 && j.strict.checks.f.ok === false && code === 1);
w("actors/beta.md", beta([src("C:\\mem\\three.md", sha("3")), src("C:\\mem\\six.md", sha("6"))]));
unlinkSync(join(FX, "fleeting/cap1.md"));
({ j } = checkJson(FX));
const five = j.fleeting.sourcesOnlyFleeting.find((x: any) => x.path.endsWith("five.md"));
t("3.7 the capture is dismissed (deleted): f still passes; five.md is reported as held by no note [review A-N10, B-N2]", j.strict.checks.f.ok && five?.now === "held by no note", JSON.stringify(five));
r = run([CHECK, "--vault", FX, "--write-sources-baseline"]);
t("3.8 re-writing the baseline warns about pairs of the old one that no note holds now", /replaced a baseline of 5 pairs/.test(r.out) && /WARNING: 1 pair/.test(r.out), r.out.split("\n").filter((l) => /baseline WRITTEN|WARNING/.test(l)).join(" | "));
w(".bedrock/reorg/sources-baseline.json", "{ not json");
({ j } = checkJson(FX));
t("3.9 an unreadable baseline fails f with a message", j.strict.checks.f.ok === false && /unusable/.test(JSON.stringify(j.sources.baseline)));
r = run([CHECK, "--vault", FX, "--write-sources-baseline"]);
t("3.10 the baseline can be re-written over a corrupt one", r.code === 0 && /baseline WRITTEN/.test(r.out));

section("check.ts 4: index.md against the real generator (run on the fixture only)");
const gi = buildIndex(FX);
t("4.1 the real indexer ran against the fixture", gi.code === 0 && /index ok: 12 notes/.test(gi.out), gi.out + gi.err);
({ j } = checkJson(FX));
t("4.2 index.md current -> h ok", j.index.state === "current" && j.strict.checks.h.ok, j.index.summary);
writeFileSync(join(FX, "index.md"), readFileSync(join(FX, "index.md"), "utf8").replace("- [[alpha]]", "- [[alpha-renamed]]"));
({ j } = checkJson(FX));
t("4.3 a changed line is detected with the differing lines", j.index.state === "stale" && j.index.onlyInFile.some((l: string) => l.includes("alpha-renamed")));
writeFileSync(join(FX, "index.md"), "# my own index\n");
({ j } = checkJson(FX));
t("4.4 a hand-written index.md is reported as not generated", j.index.state === "not-generated");
rmSync(join(FX, "index.md"));
({ j } = checkJson(FX));
t("4.5 missing index.md fails h", j.index.state === "missing" && !j.strict.checks.h.ok);

section("check.ts 5: a clean vault passes every strict check (a b c d f g h i j k)");
const CL = join(ROOT, "fx-clean");
const wcl = writer(CL);
wcl("CLAUDE.md", "## Domains\n\n- `domain/a` — a\n");
wcl("actors/one.md", `---\ntype: actor\nname: One\ntags: [type/actor, domain/a]\nsources:\n${src("C:\\m\\a.md", sha("a"))}\n---\n\n# One\n\n> t\n\n[[two]]\n`);
wcl("actors/two.md", `---\ntype: actor\nname: Two\ntags: [type/actor, domain/a]\n---\n\n# Two\n\n> t\n\n[[one]]\n`);
buildIndex(CL);
run([CHECK, "--vault", CL, "--write-sources-baseline"]);
r = run([CHECK, "--vault", CL, "--strict"]);
t("5.1 clean vault: --strict exits 0", r.code === 0 && /would pass \(required: a,b,c,d,f,g,h,i,j,k\)/.test(r.out), r.out.split("\n").slice(-2).join(" | "));
writeFileSync(join(CL, "index.md"), String.fromCharCode(0xfeff) + readFileSync(join(CL, "index.md"), "utf8").replace(/\n/g, "\r\n"));
r = run([CHECK, "--vault", CL, "--strict"]);
t("5.2 index.md with a BOM and CRLF still counts as current", r.code === 0 && /index.md is current/.test(r.out));

section("check.ts 6: argument handling");
r = run([CHECK, "--bogus"]);
t("6.1 unknown argument: message, exit 0", r.code === 0 && /unknown argument --bogus/.test(r.err), r.err);
r = run([CHECK, "--bogus", "--strict"]);
t("6.2 unknown argument with --strict: exit 1", r.code === 1);
r = run([CHECK, "--size-limit", "abc"]);
t("6.3 bad --size-limit: message", /--size-limit must be a number > 0/.test(r.err), r.err);
r = run([CHECK, "--json"]);
t("6.4 --json without a value: message", /--json needs a value/.test(r.err), r.err);
r = run([CHECK, "--vault", join(ROOT, "no-such-vault"), "--strict"]);
t("6.5 a vault that does not exist: error, strict exit 1", r.code === 1 && r.err.length > 0, r.err);
r = run([CHECK, "--help"]);
t("6.6 --help prints usage", /usage:/.test(r.out) && r.code === 0);
r = run([CHECK, "--max-out=2", "--size-limit=1", "--vault", CL]);
t("6.7 --name=value form works", r.code === 0 && /curated note\(s\) over 1 KB/.test(r.out) && /have more than 2/.test(r.out), r.out.slice(0, 400));
r = run([CHECK, "--vault", CL, "--pending-splits"]);
t("6.8 --pending-splits without a value: message", /--pending-splits needs a value/.test(r.err), r.err);

// ---------------------------------------------------------------------------------------------------------------------
section("check.ts 7: leaf budget (i), families (j), collisions (k), --pending-splits and --require");
const FB = join(ROOT, "fam-vault");
const wb = writer(FB);
wb("CLAUDE.md", "## Domains\n\n- `domain/a` — a\n");
type N = { rel: string; title: string; key?: "title" | "name"; aliases?: string[]; partOf?: string; links: string[]; extra?: string };
const famNotes: N[] = [
  { rel: "projects/p1", title: "Project One", aliases: ["Hub One Thing"], links: [] },
  { rel: "projects/p2", title: "Project Two", links: [] },
  { rel: "actors/h1", title: "Hub One Thing", key: "name", links: [] },
  { rel: "actors/h2", title: "Hub Two", key: "name", links: [] },
  { rel: "actors/h3", title: "Hub Three", key: "name", links: [] },
  { rel: "actors/h4", title: "Hub Four", key: "name", links: [] },
  { rel: "actors/h5", title: "Hub Five", key: "name", links: [] },
  { rel: "actors/widget-lane", title: "Widget actor", key: "name", links: [] },
  { rel: "topics/2026-07-widget-lane", title: "Widget lane record", links: ["widget-lane", "p1"] },
  { rel: "topics/leaf-ok", title: "Leaf ok", links: ["p1", "h1", "h2", "h3"] },
  { rel: "topics/leaf-over", title: "Leaf over", links: ["p1", "h1", "h2", "h3", "h4"] },
  { rel: "topics/leaf-two-projects", title: "Leaf two projects", links: ["p1", "p2", "h1", "h2", "h3"] },
  { rel: "topics/leaf-pending", title: "Leaf pending", links: ["p1", "h1", "h2", "h3", "h4", "h5"], extra: filler(60) },
  { rel: "topics/big", title: "Big hub topic", links: ["p1", "h1", "h2", "h3"] },
  { rel: "topics/big-part-a", title: "Part A (Big)", partOf: "big", links: ["big-part-b", "p1", "h1", "h2", "h3"] },
  { rel: "topics/big-part-b", title: "Part B (Big)", partOf: "big", links: ["big-part-a", "h4"] },
  { rel: "actors/h1-part", title: "Hub One Thing part", key: "name", partOf: "h1", links: ["h2", "h3", "h4", "h5"] },
];
// make every link reciprocal: a target that is not linked back gets a back-link (hubs absorb them; leaves list theirs)
const slugOf = (rel: string) => rel.split("/").pop()!;
const bySlug = new Map(famNotes.map((n) => [slugOf(n.rel), n]));
for (const n of famNotes) for (const target of [...n.links, ...(n.partOf ? [n.partOf] : [])]) {
  const b = bySlug.get(target)!;
  if (!b.links.includes(slugOf(n.rel)) && b.partOf !== slugOf(n.rel)) b.links.push(slugOf(n.rel));
}
for (const n of famNotes) {
  const type = n.rel.split("/")[0].replace(/s$/, "");
  const fm = [`type: ${type}`, `${n.key ?? "title"}: "${n.title}"`, `tags: [type/${type}, domain/a]`];
  if (n.aliases) fm.push(`aliases: [${n.aliases.map((a) => JSON.stringify(a)).join(", ")}]`);
  if (n.partOf) fm.push(`part_of: "[[${n.partOf}]]"`);
  wb(n.rel + ".md", `---\n${fm.join("\n")}\n---\n\n# ${n.title}\n\n> ${n.title} summary.\n\nLinks: ${n.links.map((l) => `[[${l}]]`).join(" ")}\n${n.extra ? "\n" + n.extra : ""}`);
}
buildIndex(FB);
run([CHECK, "--vault", FB, "--write-sources-baseline"]);
const PEND = join(ROOT, "pending.txt");
writeFileSync(PEND, "topics/leaf-pending.md\n\n");
({ j } = checkJson(FB));
t("7.1 fixture sanity: a b c d f g h j pass (every link reciprocal, every note tagged, index current)", ["b", "c", "d", "f", "g", "h", "j"].every((k) => j.strict.checks[k].ok), JSON.stringify(Object.fromEntries(Object.entries(j.strict.checks).map(([k, v]: any) => [k, v.ok]))));
const overB = j.budget.over.map((b: any) => b.note).sort();
t("7.2 i: without a pending file, leaf-over, leaf-two-projects, leaf-pending and the actor part h1-part are over budget", JSON.stringify(overB) === JSON.stringify(["actors/h1-part", "topics/leaf-over", "topics/leaf-pending", "topics/leaf-two-projects"]), JSON.stringify(overB));
const item = (note: string) => j.budget.items.find((b: any) => b.note === note);
t("7.3 i: leaf-ok has 3 others (home project p1 is structural)", item("topics/leaf-ok").othersCount === 3 && item("topics/leaf-ok").home === "projects/p1");
t("7.4 i: a second project link counts as an other (leaf-two-projects: home p1, others include p2)", item("topics/leaf-two-projects").othersCount === 4 && item("topics/leaf-two-projects").others.includes("projects/p2"), JSON.stringify(item("topics/leaf-two-projects")));
t("7.5 i: family links (parent, sibling) are structural: big-part-a has 3 others", item("topics/big-part-a").othersCount === 3 && JSON.stringify(item("topics/big-part-a").family) === JSON.stringify(["topics/big", "topics/big-part-b"]), JSON.stringify(item("topics/big-part-a")));
t("7.6 i: a split hub's links to its own parts are structural: big has 3 others", item("topics/big").othersCount === 3 && item("topics/big").family.length === 2, JSON.stringify(item("topics/big")));
t("7.7 i: a part in actors/ is a leaf; hubs are not budgeted", j.budget.items.some((b: any) => b.note === "actors/h1-part") && !j.budget.items.some((b: any) => b.note === "actors/h1"));
t("7.8 a: without a pending file the 60 KB leaf-pending fails a", j.sizes.failing.some((x: any) => x.note === "topics/leaf-pending"));
({ j } = checkJson(FB, ["--pending-splits", PEND]));
t("7.9 --pending-splits: leaf-pending is reported (pendingOver), not failed, for i", !j.budget.over.some((b: any) => b.note === "topics/leaf-pending") && j.budget.pendingOver.some((b: any) => b.note === "topics/leaf-pending"));
t("7.10 --pending-splits: leaf-pending over 50 KB is reported, not failed, for a", j.strict.checks.a.ok && j.sizes.pendingSplit.some((x: any) => x.note === "topics/leaf-pending"));
t("7.11 j: 3 parts in 2 families, no problems", j.families.parts === 3 && j.families.families === 2 && j.strict.checks.j.ok && JSON.stringify(j.families.items.find((x: any) => x.parent === "topics/big")?.parts) === JSON.stringify(["topics/big-part-a", "topics/big-part-b"]));
const keys = j.collisions.items.map((c: any) => c.key).sort();
t("7.12 k: an alias equal to another note's name, and two slugs equal once the date prefix is removed, collide", JSON.stringify(keys) === JSON.stringify(["hubonething", "widgetlane"]), JSON.stringify(j.collisions.items));
r = run([CHECK, "--vault", FB, "--strict", "--pending-splits", PEND]);
t("7.13 --strict with every check required: exit 1 (i, k)", r.code === 1 && /would FAIL \(i, k;/.test(r.out), r.out.split("\n").slice(-2).join(" | "));
r = run([CHECK, "--vault", FB, "--strict", "--require", "a,b,c,d,f,h,j", "--pending-splits", PEND]);
t("7.14 --require a,b,c,d,f,h,j (the batch-1 REQ): exit 0 while i and k fail as not required", r.code === 0 && /i fail \(not required\)/.test(r.out) && /k fail \(not required\)/.test(r.out), r.out.split("\n").slice(-2).join(" | "));
r = run([CHECK, "--vault", FB, "--strict", "--require", "a,b,c,d,f,h,i,j", "--pending-splits", PEND]);
t("7.15 --require including i: exit 1", r.code === 1 && /would FAIL \(i;/.test(r.out));
writeFileSync(join(ROOT, "pending-bad.txt"), "topics/leaf-pending\ntopics/not-a-note\n");
r = run([CHECK, "--vault", FB, "--strict", "--pending-splits", join(ROOT, "pending-bad.txt")]);
t("7.16 a pending path that is not a curated note stops the run (strict exit 1)", r.code === 1 && /not curated notes/.test(r.err), r.err);
writeFileSync(join(ROOT, "pending-dupe.txt"), "topics/leaf-pending\ntopics/leaf-pending.md\n");
r = run([CHECK, "--vault", FB, "--strict", "--pending-splits", join(ROOT, "pending-dupe.txt")]);
t("7.17 a pending path listed twice stops the run", r.code === 1 && /twice/.test(r.err), r.err);

section("check.ts 8: broken split families fail j");
const FJ = join(ROOT, "fam-broken");
const wj = writer(FJ);
wj("CLAUDE.md", "## Domains\n\n- `domain/a` — a\n");
const tn = (rel: string, fm: string, links: string) => wj(rel + ".md", `---\ntype: ${rel.startsWith("fleeting") ? "fleeting" : "topic"}\ntitle: "${rel}"\ntags: [type/topic, domain/a]\n${fm}---\n\n# ${rel}\n\n> s\n\n${links}\n`);
wj("projects/p.md", `---\ntype: project\ntitle: P\ntags: [type/project, domain/a]\n---\n\n# P\n\n> s\n\n[[parent]]\n`);
tn("topics/parent", `sources:\n${src("C:\\m\\p.md", sha("p"))}\n`, "[[p]] [[good-part]] [[extra-sources]]");
tn("topics/good-part", `part_of: "[[parent]]"\nsources:\n${src("C:\\m\\p.md", sha("p"))}\n`, "[[p]]");
tn("topics/no-backlink", `part_of: "[[parent]]"\n`, "");
tn("topics/two-links", `part_of: "[[parent]] [[p]]"\n`, "");
tn("topics/dangling-parent", `part_of: "[[nowhere]]"\n`, "");
tn("topics/nested", `part_of: "[[good-part]]"\n`, "");
tn("topics/extra-sources", `part_of: "[[parent]]"\nsources:\n${src("C:\\m\\x.md", sha("x"))}\n`, "");
tn("fleeting/fl", ``, "[[fleeting-parent]]");
tn("topics/fleeting-parent", `part_of: "[[fl]]"\n`, "");
tn("fleeting/fl-part", `part_of: "[[nowhere-else]]"\n`, "");
tn("topics/self-part", `part_of: "[[self-part]]"\n`, "");
tn("topics/empty-part", `part_of: ""\n`, "[[p]]");
({ j } = checkJson(FJ));
const probs = j.families.problemItems.map((x: any) => `${x.part}: ${x.problem}`);
const hasProb = (part: string, re: RegExp) => j.families.problemItems.some((x: any) => x.part === part && re.test(x.problem));
t("8.1 j fails", j.strict.checks.j.ok === false);
t("8.2 j: the parent must link the part", hasProb("topics/no-backlink", /does not link it/), probs.join(" | "));
t("8.3 j: part_of must hold exactly one wikilink", hasProb("topics/two-links", /holds 2 wikilinks/));
t("8.4 j: part_of must resolve to a note", hasProb("topics/dangling-parent", /does not resolve/));
t("8.5 j: the parent must not have part_of itself", hasProb("topics/nested", /has part_of itself/));
t("8.6 j: the part's source pairs must be a subset of the parent's", hasProb("topics/extra-sources", /source pair/));
t("8.7 j: the parent must be curated, not fleeting", hasProb("topics/fleeting-parent", /fleeting note/));
t("8.8 j applies to every note, fleeting notes included", hasProb("fleeting/fl-part", /does not resolve/));
t("8.9 j: a part cannot be its own parent", hasProb("topics/self-part", /itself/));
t("8.10 j: a well-formed part and an empty part_of raise no problem", !j.families.problemItems.some((x: any) => x.part === "topics/good-part" || x.part === "topics/empty-part"));

// =====================================================================================================================
// conserve.ts
// =====================================================================================================================

section("conserve.ts: text conservation against a base commit");
const CV = join(ROOT, "conserve-repo");
initRepo(CV);
const wv = writer(CV);
wv(".gitattributes", "* text=auto eol=lf\n");
wv("CLAUDE.md", "# rules\n");
const noteA = `---\ntitle: Topic A\nsources:\n${src("C:\\m\\a.md", sha("a"))}\n---\n\n# Topic A\n\n> A tagline.\n\n## Context\n\nLine one with [[b|the B]] link.\nLine two mentions [[b]].\n\n## Related Topics\n\n- [[b]] — b summary\n\nDuplicate line.\nDuplicate line.\nA line with arrows a => b inside.\n`;
const noteB = `---\nname: Bee Actor\n---\n\n# B\n\nText of B.\n`;
wv("topics/a.md", noteA);
wv("actors/b.md", noteB);
wv("fleeting/f.md", "---\ntitle: F\n---\n\nfleeting body line\n");
wv("index.md", "# Index\n");
wv("log.md", "# Log\n");
git(CV, "add", "-A");
git(CV, "commit", "-q", "-m", "base");
const consRun = (...args: string[]) => run([CONSERVE, "--vault", CV, "--base", "HEAD", ...args]);
const allowFile = (name: string, text: string) => {
  const p = join(ROOT, name);
  writeFileSync(p, text);
  return p;
};
r = consRun();
t("C.1 unchanged tree: OK, exit 0", r.code === 0 && /conserve: OK/.test(r.out), r.out);
// a verbatim move, C1 link conversions, a demoted heading, CRLF and trailing spaces
wv("topics/a.md", noteA.replace("Line one with [[b|the B]] link.\n", "").replace("Line two mentions [[b]].", "Line two mentions Bee Actor.   ").replace("## Related Topics", "### Related Topics").replace(/\n/g, "\r\n"));
wv("topics/a-part.md", `---\ntitle: A part\npart_of: "[[a]]"\nsources: []\n---\n\n# A part\n\n> Part of [[a]].\n\nLine one with the B link.\n`);
r = consRun();
t("C.2 a verbatim move, [[x|y]] -> y, [[x]] -> title, a demoted heading, CRLF and trailing spaces all pass", r.code === 0, r.out);
wv("topics/a.md", noteA.replace("Line two mentions [[b]].\n", ""));
r = consRun();
t("C.3 a deleted line fails and is reported with its base note", r.code === 1 && /MISSING\s+\[topics\/a\]\s+Line two mentions Bee Actor\./.test(r.out), r.out);
wv("topics/a.md", noteA.replace("Line two mentions [[b]].", "Line two mentions [[b]] in [[a-part]]."));
r = consRun();
t("C.4 an S10 rewrite without an allow entry fails", r.code === 1 && /Line two mentions Bee Actor\./.test(r.out));
r = consRun("--allow", allowFile("allow1.txt", "Line two mentions [[b]]. => Line two mentions [[b]] in [[a-part]].\n"));
t("C.5 the same rewrite with an `old => new` entry passes (new exists in the current tree)", r.code === 0 && /allowed rewrite/.test(r.out), r.out);
r = consRun("--allow", allowFile("allow2.txt", "Line two mentions [[b]]. => A line that exists nowhere.\n"));
t("C.6 an `old => new` entry whose new line does not exist is not accepted (fails, entry reported unused)", r.code === 1 && /unused .*new line does not exist/.test(r.out), r.out);
wv("topics/a.md", noteA.replace("Duplicate line.\n", ""));
r = consRun();
t("C.7 one of two identical lines removed: the multiset catches it (x1)", r.code === 1 && /MISSING\s+\[topics\/a \(x2\)\]\s+Duplicate line\./.test(r.out), r.out);
r = consRun("--allow", allowFile("allow3.txt", "Duplicate line.\n"));
t("C.8 an `old` entry (an exact split duplicate) accepts one missing occurrence", r.code === 0 && /allowed duplicate/.test(r.out), r.out);
wv("topics/a.md", noteA.replace("A line with arrows a => b inside.\n", ""));
r = consRun("--allow", allowFile("allow4.txt", "A line with arrows a => b inside.\n"));
t("C.9 a body line that itself contains ' => ' can be allowed whole", r.code === 0, r.out);
wv("topics/a.md", noteA);
wv("actors/b.md", noteB.replace("name: Bee Actor\n", ""));
r = consRun();
t("C.10 a removed frontmatter key fails", r.code === 1 && /frontmatter key\(s\) removed: name/.test(r.out), r.out);
wv("actors/b.md", noteB);
wv("topics/a.md", noteA.replace(/sources:\n.*\n/, "sources: []\n"));
r = consRun();
t("C.11 a removed sources pair fails (the hub keeps every pair) [decision 9]", r.code === 1 && /sources pair\(s\) removed/.test(r.out), r.out);
wv("topics/a.md", noteA.replace("sources:\n", `sources:\n${src("C:\\m\\new.md", sha("n"))}\n`));
r = consRun();
t("C.12 an added sources pair passes", r.code === 0, r.out);
wv("topics/a.md", noteA);
wv("fleeting/f.md", "---\ntitle: F2\n---\n\nrewritten by the hook\n");
r = consRun();
const fleetingEdited = r.code === 0;
unlinkSync(join(CV, "fleeting/f.md"));
r = consRun();
t("C.13 fleeting notes are ignored on both sides (edited, then deleted) [decision 1]", fleetingEdited && r.code === 0, r.out);
unlinkSync(join(CV, "actors/b.md"));
r = consRun();
t("C.14 a curated note removed since the base fails", r.code === 1 && /REMOVED actors\/b/.test(r.out), r.out);
wv("actors/b.md", noteB);
wv("topics/a.md", noteA.replace("Line two mentions [[b]].\n", ""));
git(CV, "add", "topics/a.md");
wv("topics/a.md", noteA);
const staged = consRun("--staged");
const worktree = consRun();
git(CV, "reset", "-q", "--", "topics/a.md");
t("C.15 --staged reads the index (a line deleted there fails although the working file still has it)", staged.code === 1 && /Line two mentions/.test(staged.out) && worktree.code === 0, staged.out);
r = run([CONSERVE, "--vault", CV, "--base", "no-such-ref"]);
t("C.16 an unknown base is an error (exit 1)", r.code === 1 && /not a commit/.test(r.err), r.err);
r = run([CONSERVE, "--vault", CV, "--base", "HEAD", "--allow", join(ROOT, "no-such-allow.txt")]);
t("C.17 a missing allow file is an error (exit 1)", r.code === 1 && /does not exist/.test(r.err), r.err);
r = run([CONSERVE, "--vault", CV]);
t("C.18 --base is required", r.code === 1 && /--base <commit> is required/.test(r.err), r.err);

// =====================================================================================================================
// commit.ts
// =====================================================================================================================

section("commit.ts: throwaway index, export, commit, rollback [review A-B4]");
const CR = join(ROOT, "commit-repo");
initRepo(CR);
const wr = writer(CR);
wr(".gitattributes", "* text=auto eol=lf\n");
wr(".gitignore", ".bedrock/recall-index.json\n.bedrock/recall/hook.log*\n");
wr("CLAUDE.md", "# Fixture rules\n\n## Domains\n\n- `domain/a`\n");
wr("actors/a.md", `---\ntype: actor\nname: Actor A\ntags: [type/actor, domain/a]\n---\n\n# Actor A\n\n> The first actor of the fixture.\n\n[[t]]\n`);
wr("topics/t.md", `---\ntype: topic\ntitle: Topic T\ntags: [type/topic, domain/a]\n---\n\n# Topic T\n\n> The original summary of topic T.\n\n[[a]]\n`);
wr("fleeting/f.md", `---\ntype: fleeting\ntitle: Capture F\nstatus: raw\n---\n\n# Capture F\n\n> A capture.\n`);
wr("old.txt", "to be deleted by batch 1\n");
wr("log.md", "# Log\n\n> Append-only.\n\n- 2026-10-03 10:00 -04:00 | init | fixture created | none\n");
buildIndex(CR);
git(CR, "add", "-A");
git(CR, "commit", "-q", "-m", "base");
const BASE = git(CR, "rev-parse", "HEAD").trim();
const headLog = readFileSync(join(CR, "log.md"), "utf8");
const headIndexMd = readFileSync(join(CR, "index.md"), "utf8");
// hook output arrives in the working tree; commit.ts must never stage it
const HOOK_LINE = "- 2026-10-04 04:00 -04:00 | sync | captured 1 memory file(s) into fleeting/ | [[new]]\n";
writeFileSync(join(CR, "log.md"), headLog + HOOK_LINE);
writeFileSync(join(CR, "index.md"), headIndexMd + "- a line the hook added\n");
wr("fleeting/f.md", `---\ntype: fleeting\ntitle: Capture F\nstatus: raw\n---\n\n# Capture F\n\n> A capture, re-captured by the hook.\n`);
wr("fleeting/new.md", `---\ntype: fleeting\ntitle: New capture\n---\n\n# New\n\n> untracked capture\n`);
// batch 1's work
wr("CLAUDE.md", "# Fixture rules\n\n## Domains\n\n- `domain/a` — with a definition\n\n## Tooling\n\nnew section\n");
wr(".bedrock/reorg/tool.ts", "// a new tool\n");
wr(".bedrock/reorg/plan.md", "# the plan\n");
wr(".bedrock/reorg/spec/x.txt", "spec\n");
unlinkSync(join(CR, "old.txt"));
const M1 = ".bedrock/reorg/ledger/batch-1-paths.txt";
const m1Paths = ["CLAUDE.md", ".bedrock/reorg/tool.ts", ".bedrock/reorg/plan.md", ".bedrock/reorg/spec/x.txt", "old.txt", M1];
wr(M1, m1Paths.join("\n") + "\n");
const idx = () => readFileSync(join(CR, ".git", "index"));
const headNow = () => git(CR, "rev-parse", "HEAD").trim();
const WHEN = "2026-10-04 05:00 -0400";
const LINE1 = "- 2026-10-04 05:00 -04:00 | reorg-batch-1 | tooling for the fixture | none (tooling only)";
const commitArgs = (extra: string[] = [], paths = join(CR, M1)) => [COMMIT, "--vault", CR, "--batch", "1", "--expect-head", BASE, "--paths-file", paths, "--message", "reorg batch 1: fixture tooling", "--log", "tooling for the fixture | none (tooling only)", "--when", WHEN, ...extra];
/** a refused or failed run must leave .git/index byte-identical, HEAD unmoved and the working log.md untouched */
function untouched(name: string, args: string[], expect: RegExp) {
  const before = idx();
  const logBefore = readFileSync(join(CR, "log.md"), "utf8");
  const res = run(args);
  const same = Buffer.compare(before, idx()) === 0;
  t(name, res.code === 1 && expect.test(res.err) && same && headNow() === BASE && readFileSync(join(CR, "log.md"), "utf8") === logBefore, `code ${res.code}; index identical ${same}; ${res.err.trim()}`);
}
const outsideManifest = (name: string, lines: string[]) => {
  const p = join(ROOT, name);
  writeFileSync(p, lines.join("\n") + "\n");
  return p;
};
git(CR, "branch", "other");
git(CR, "symbolic-ref", "HEAD", "refs/heads/other");
untouched("K.1 refuses another branch", commitArgs(), /not refs\/heads\/brain-reorg-2026-10-03/);
git(CR, "symbolic-ref", "HEAD", "refs/heads/brain-reorg-2026-10-03");
const loose = git(CR, "commit-tree", git(CR, "rev-parse", "HEAD^{tree}").trim(), "-m", "unrelated").trim();
untouched("K.2 refuses when HEAD is not --expect-head", [...commitArgs().map((a) => (a === BASE ? loose : a))], /the branch moved/);
untouched("K.3 refuses an --expect-head that is not a commit", [...commitArgs().map((a) => (a === BASE ? "0000000" : a))], /is not a commit/);
git(CR, "add", "CLAUDE.md");
untouched("K.4 refuses a real index with staged changes", commitArgs(), /staged changes/);
git(CR, "reset", "-q", "--", "CLAUDE.md");
untouched("K.5 refuses a fleeting path [decision 1]", commitArgs([], outsideManifest("m-fleet.txt", ["CLAUDE.md", "fleeting/f.md"])), /fleeting notes are never staged/);
untouched("K.6 refuses log.md in the manifest", commitArgs([], outsideManifest("m-log.txt", ["CLAUDE.md", "log.md"])), /built by commit.ts/);
untouched("K.7 refuses index.md in the manifest", commitArgs([], outsideManifest("m-index.txt", ["index.md"])), /built by commit.ts/);
untouched("K.8 refuses a directory", commitArgs([], outsideManifest("m-dir.txt", [".bedrock/reorg"])), /is a directory/);
untouched("K.9 refuses a glob", commitArgs([], outsideManifest("m-glob.txt", ["*.md"])), /glob/);
untouched("K.10 refuses an absolute path", commitArgs([], outsideManifest("m-abs.txt", ["C:/x/y.md"])), /absolute/);
untouched("K.11 refuses a '..' path", commitArgs([], outsideManifest("m-dots.txt", ["../outside.md"])), /not a plain file path/);
untouched("K.12 refuses a duplicate path", commitArgs([], outsideManifest("m-dup.txt", ["CLAUDE.md", "CLAUDE.md"])), /listed twice/);
untouched("K.13 refuses an empty manifest", commitArgs([], outsideManifest("m-empty.txt", [""])), /lists no path/);
untouched("K.14 refuses backslashes", commitArgs([], outsideManifest("m-bs.txt", [".bedrock\\reorg\\tool.ts"])), /forward slashes/);
writeFileSync(join(CR, ".bedrock/reorg/ledger/batch-9-paths.txt"), "CLAUDE.md\n");
untouched("K.15 refuses a manifest in the vault that does not list itself", commitArgs([], join(CR, ".bedrock/reorg/ledger/batch-9-paths.txt")), /does not list itself/);
unlinkSync(join(CR, ".bedrock/reorg/ledger/batch-9-paths.txt"));
untouched("K.16 a failing --export (a path neither on disk nor in HEAD, found while staging) leaves .git/index byte-identical [review A-B4]", commitArgs(["--export", join(ROOT, "x-fail")], outsideManifest("m-ghost.txt", ["CLAUDE.md", "ghost.txt"])), /neither on disk nor in HEAD/);
untouched("K.17 refuses a listed path that is unchanged against HEAD (staged set != manifest)", commitArgs([], outsideManifest("m-same.txt", ["CLAUDE.md", "actors/a.md"])), /listed but unchanged against HEAD: actors\/a.md/);
untouched("K.18 refuses a bad --when", commitArgs().map((a) => (a === WHEN ? "2026-10-04 5pm" : a)), /--when/);
untouched("K.19 refuses a --log without the ' | ' separator", commitArgs().map((a) => (a === "tooling for the fixture | none (tooling only)" ? "just text" : a)), /log.md format/);
untouched("K.20 refuses a two-line --message", commitArgs().map((a) => (a === "reorg batch 1: fixture tooling" ? "line one\nline two" : a)), /one line/);
mkdirSync(join(ROOT, "x-busy"), { recursive: true });
writeFileSync(join(ROOT, "x-busy", "occupied.txt"), "x");
untouched("K.21 refuses an --export directory that is not empty", commitArgs(["--export", join(ROOT, "x-busy")]), /not empty/);
untouched("K.22 refuses --base without --rollback", commitArgs(["--base", BASE]), /only used with --rollback/);
// a failing commit: the branch ref is locked, so update-ref fails after commit-tree
const lock = join(CR, ".git", "refs", "heads", "brain-reorg-2026-10-03.lock");
writeFileSync(lock, "");
untouched("K.23 a failing commit (update-ref cannot move the branch) leaves .git/index byte-identical and appends nothing [review A-B4]", commitArgs(), /update-ref refused/);
unlinkSync(lock);
t("K.24 the throwaway indexes were removed (no reorg-commit-* directory left in the temp folder)", !readdirSync(tmpdir()).some((d) => d.startsWith("reorg-commit-") && existsSync(join(tmpdir(), d, "index"))));

// the export
const X1 = join(ROOT, "x1");
let before = idx();
r = run(commitArgs(["--export", X1]));
t("K.25 --export succeeds without committing; .git/index byte-identical; HEAD unmoved; working log.md untouched", r.code === 0 && Buffer.compare(before, idx()) === 0 && headNow() === BASE && readFileSync(join(CR, "log.md"), "utf8") === headLog + HOOK_LINE, r.out + r.err);
t("K.26 export: manifest files at their new content, the deleted path absent", readFileSync(join(X1, "CLAUDE.md"), "utf8").includes("new section") && existsSync(join(X1, ".bedrock/reorg/tool.ts")) && !existsSync(join(X1, "old.txt")));
t("K.27 export: fleeting notes as committed in HEAD, never the hook's working copies [decision 1]", readFileSync(join(X1, "fleeting/f.md"), "utf8").includes("> A capture.") && !existsSync(join(X1, "fleeting/new.md")));
t("K.28 export: log.md = HEAD's log.md + the batch line (--when written as +HH:MM); the hook's line is not in it", readFileSync(join(X1, "log.md"), "utf8") === headLog + LINE1 + "\n", JSON.stringify(readFileSync(join(X1, "log.md"), "utf8").slice(-160)));
t("K.29 export: index.md generated from the staged tree (unchanged here, so HEAD's), not the hook's working copy", readFileSync(join(X1, "index.md"), "utf8") === headIndexMd && /index.md unchanged \(not staged\)/.test(r.out));

// the commit
const BODY = join(ROOT, "body1.txt");
writeFileSync(BODY, "Body line one.\nsha256(plan.md) = abc\n");
before = idx();
r = run(commitArgs(["--body-file", BODY]));
const C1 = headNow();
t("K.30 the commit succeeds: HEAD moved, parent is BASE, nothing pushed", r.code === 0 && C1 !== BASE && git(CR, "rev-parse", "HEAD^").trim() === BASE && /nothing was pushed/.test(r.out), r.out + r.err);
const files1 = git(CR, "show", "--name-only", "--format=", "HEAD").trim().split("\n").sort();
t("K.31 the commit holds exactly the manifest + log.md (index.md unchanged, so not staged); no fleeting path [G-commit]", JSON.stringify(files1) === JSON.stringify([...m1Paths, "log.md"].sort()), JSON.stringify(files1));
const msg1 = git(CR, "log", "-1", "--format=%B");
t("K.32 message: subject, body, then the Co-Authored-By trailer", msg1.startsWith("reorg batch 1: fixture tooling\n\nBody line one.\nsha256(plan.md) = abc\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"), JSON.stringify(msg1));
t("K.33 the real index matches the new HEAD (git diff --cached --quiet)", gitTry(CR, "diff", "--cached", "--quiet").code === 0);
t("K.34 the working log.md = its previous content (hook line kept) + the batch line appended at the end", readFileSync(join(CR, "log.md"), "utf8") === headLog + HOOK_LINE + LINE1 + "\n");
t("K.35 the committed log.md blob equals the exported one (same --when)", git(CR, "show", "HEAD:log.md") === readFileSync(join(X1, "log.md"), "utf8"));
const st1 = git(CR, "status", "--porcelain").replace(/\s+$/, "").split("\n").map((l) => l.slice(3)).sort();
t("K.36 only hook output is left dirty (fleeting/*, log.md, index.md), untouched and unstaged", JSON.stringify(st1) === JSON.stringify(["fleeting/f.md", "fleeting/new.md", "index.md", "log.md"]) && readFileSync(join(CR, "index.md"), "utf8").includes("a line the hook added"), JSON.stringify(st1));
// batch 2 changes a note's summary: index.md must be regenerated and staged
const BASE2 = C1;
wr("topics/t.md", readFileSync(join(CR, "topics/t.md"), "utf8").replace("The original summary of topic T.", "A new summary of topic T."));
const M2 = ".bedrock/reorg/ledger/batch-2-paths.txt";
wr(M2, ["topics/t.md", M2].join("\n") + "\n");
r = run([COMMIT, "--vault", CR, "--batch", "2", "--expect-head", BASE2, "--paths-file", join(CR, M2), "--message", "reorg batch 2: fixture", "--log", "summary change | [[t]]", "--when", "2026-10-04 06:00 -04:00"]);
const files2 = git(CR, "show", "--name-only", "--format=", "HEAD").trim().split("\n").sort();
const TREE = join(ROOT, "tree-b2");
const ti = join(ROOT, "tree-b2.index");
Bun.spawnSync(["git", "-C", CR, "read-tree", "HEAD"], { env: { ...process.env, GIT_INDEX_FILE: ti } });
Bun.spawnSync(["git", "-C", CR, "checkout-index", "-a", "-f", "--prefix=" + TREE.replace(/\\/g, "/") + "/"], { env: { ...process.env, GIT_INDEX_FILE: ti } });
const { buildIndexData, catalogText } = await import("../recall/indexer.ts");
const { statNotes } = await import("../recall/lib.ts");
t("K.37 a summary change regenerates index.md: it is staged, and it equals the generator's output for the committed tree", r.code === 0 && files2.includes("index.md") && git(CR, "show", "HEAD:index.md") === catalogText(buildIndexData(statNotes(TREE))), r.out + r.err + JSON.stringify(files2));
// rollback of batch 2, then of batch 1 (newest first), from copies of the manifests outside the vault
const M2copy = join(ROOT, "M-2.txt");
writeFileSync(M2copy, readFileSync(join(CR, M2)));
const C2 = headNow();
r = run([COMMIT, "--vault", CR, "--batch", "2", "--expect-head", C2, "--paths-file", M2copy, "--message", "reorg rollback of batch 2", "--log", "rollback of batch 2 | [[t]]", "--when", "2026-10-04 07:00 -04:00", "--rollback", "--base", BASE2]);
t("K.38 rollback of batch 2: a new commit restores topics/t.md (committed and on disk) and removes the batch-2 manifest", r.code === 0 && headNow() !== C2 && git(CR, "show", "HEAD:topics/t.md").includes("The original summary") && readFileSync(join(CR, "topics/t.md"), "utf8").includes("The original summary") && !existsSync(join(CR, M2)), r.out + r.err);
t("K.39 rollback: log.md gains the rollback line (committed and working) and keeps the batch's own line", git(CR, "show", "HEAD:log.md").includes("| reorg-rollback-2 | rollback of batch 2 | [[t]]") && git(CR, "show", "HEAD:log.md").includes("| reorg-batch-2 |") && readFileSync(join(CR, "log.md"), "utf8").trimEnd().endsWith("| reorg-rollback-2 | rollback of batch 2 | [[t]]"));
t("K.40 rollback: the real index matches HEAD", gitTry(CR, "diff", "--cached", "--quiet").code === 0);
const M1copy = join(ROOT, "M-1.txt");
writeFileSync(M1copy, readFileSync(join(CR, M1)));
r = run([COMMIT, "--vault", CR, "--batch", "1", "--expect-head", headNow(), "--paths-file", M1copy, "--message", "reorg rollback of batch 1", "--log", "rollback of batch 1 | none", "--when", "2026-10-04 08:00 -04:00", "--rollback", "--base", BASE]);
t("K.41 rollback of batch 1: CLAUDE.md and old.txt restored, new files deleted", r.code === 0 && readFileSync(join(CR, "CLAUDE.md"), "utf8") === "# Fixture rules\n\n## Domains\n\n- `domain/a`\n" && existsSync(join(CR, "old.txt")) && !existsSync(join(CR, ".bedrock/reorg/tool.ts")) && !existsSync(join(CR, M1)), r.out + r.err);
t("K.42 rollback of batch 1: plan.md leaves the tree but stays on disk, untracked again", existsSync(join(CR, ".bedrock/reorg/plan.md")) && gitTry(CR, "ls-files", "--error-unmatch", ".bedrock/reorg/plan.md").code !== 0 && gitTry(CR, "cat-file", "-e", "HEAD:.bedrock/reorg/plan.md").code !== 0);
t("K.43 nothing was ever pushed: the fixture has no remote and no remote-tracking ref", git(CR, "remote").trim() === "" && !existsSync(join(CR, ".git", "refs", "remotes")));
r = run([COMMIT, "--vault", CR, "--batch", "1", "--expect-head", headNow(), "--paths-file", M1copy, "--message", "m", "--log", "a | b", "--when", WHEN, "--rollback", "--base", loose]);
t("K.44 --rollback refuses a --base that is not an ancestor of HEAD", r.code === 1 && /not an ancestor/.test(r.err), r.err);

// =====================================================================================================================
// healthcheck.ts
// =====================================================================================================================

section("healthcheck.ts: the /bedrock:healthcheck port with the vault's fleeting rules");
const HV = join(ROOT, "hc-vault");
const PL = join(ROOT, "hc-plugin");
const wh = writer(HV);
const wp = writer(PL);
wp(".claude-plugin/plugin.json", '{"name": "bedrock", "version": "1.2.0"}\n');
for (const f of ["actor.md", "person.md", "team.md", "concept.md", "topic.md", "discussion.md", "project.md", "fleeting.md"]) wp("entities/" + f, "# definition\n");
wp("vaults.json", JSON.stringify({ vaults: [{ name: "fxvault", path: HV, default: true }] }));
for (const d of ["actors", "people", "teams", "concepts", "topics", "discussions", "projects", "fleeting"]) wh(d + "/_template.md", "---\ntype: x\nrelated: [\"[[entity-name]]\"]\n---\n");
const hn = (rel: string, fm: string, body: string) => wh(rel + ".md", `---\n${fm}updated_at: 2026-10-01\n---\n\n# ${rel}\n\n${body}\n`);
hn("actors/a", "type: actor\n", "[[b]] [[t]]");
hn("actors/b", "type: actor\n", "[[a]]");
hn("projects/m", 'type: project\naliases: ["Alias Target"]\n', "[[t]]");
hn("topics/t", "type: topic\n", "[[Alias Target]] [[a]]");
hn("concepts/lonely-curated", "type: concept\n", "no links at all");
hn("concepts/only-fleeting-inbound", "type: concept\n", "[[a]]");
hn("fleeting/cap", "type: fleeting\n", "[[only-fleeting-inbound]] [[Nowhere At All]]");
hn("fleeting/empty", "type: fleeting\n", "nothing");
hn("actors/folder-entity/note", "type: actor\n", "[[a]]");
hn("actors/folder-entity/nodes/code-node", "type: actor\n", "[[a]]");
const hcRun = (...args: string[]) => {
  const jf = join(ROOT, "hc.json");
  rmSync(jf, { force: true });
  const res = run([HEALTH, "--vault", HV, "--plugin", PL, "--date", "2026-10-04", "--json", jf, ...args]);
  return { ...res, j: existsSync(jf) ? JSON.parse(readFileSync(jf, "utf8")) : null };
};
let h = hcRun("--strict");
const orph = h.j.check3_orphans.items.map((x: any) => x.id).sort();
t("H.1 curated orphans fail --strict: lonely-curated and only-fleeting-inbound (plus the two folder entities nobody links)", h.code === 1 && ["concepts/lonely-curated", "concepts/only-fleeting-inbound"].every((x) => orph.includes(x)), JSON.stringify(orph));
t("H.2 an inbound link from a fleeting note never rescues a curated note from orphan status [decisions 1, 10, 14]", h.j.check3_orphans.items.find((x: any) => x.id === "concepts/only-fleeting-inbound")?.inboundFromFleeting === 1);
t("H.3 dangling (orphan, no outbound, no frontmatter relation): lonely-curated only", JSON.stringify(h.j.check4_dangling.items.map((x: any) => x.id)) === JSON.stringify(["concepts/lonely-curated"]));
t("H.4 the skill's alias rule: projects/m is linked through its alias, so it is no orphan", !orph.includes("projects/m") && h.j.check3_orphans.aliasOnlyInbound.some((x: any) => x.target === "projects/m"));
const fc = h.j.fleeting.items.find((x: any) => x.id === "fleeting/cap");
const fe = h.j.fleeting.items.find((x: any) => x.id === "fleeting/empty");
t("H.5 fleeting notes are reported apart: orphans, a dangling note and a broken link, none in the curated lists [decision 10]", fc.orphan && JSON.stringify(fc.brokenLinks) === JSON.stringify(["Nowhere At All"]) && fe.orphan && fe.dangling && !orph.some((x: string) => x.startsWith("fleeting/")));
t("H.6 actors/<x>/*.md and actors/<x>/nodes/*.md are enumerated as the skill says (4 actors: a, b and the two folder entities)", h.j.scan.perDir.actors === 4 && orph.includes("actors/note") && orph.includes("actors/code-node"), JSON.stringify(h.j.scan.perDir));
hn("concepts/lonely-curated", "type: concept\n", "[[a]]");
hn("actors/a", "type: actor\n", "[[b]] [[t]] [[lonely-curated]] [[only-fleeting-inbound]] [[note]] [[code-node]]");
h = hcRun("--strict");
t("H.7 with every curated note linked, --strict exits 0 (CLEAN) while the fleeting orphans and the broken link remain", h.code === 0 && h.j.clean && /CLEAN/.test(h.out) && h.j.fleeting.orphans === 2, h.out);
h = hcRun("--strict", "--date", "2026-12-31");
t("H.8 old content (>15 days) is reported, never failed [decision 3]", h.code === 0 && h.j.check5_old.count > 0);
t("H.9 graphify-out MISSING is reported as N/A, never failed [decision 3]", h.j.check1_graphify.status === "MISSING" && h.code === 0);
unlinkSync(join(HV, "teams/_template.md"));
h = hcRun("--strict");
t("H.10 a missing _template.md is a setup issue (exit 1)", h.code === 1 && h.j.check2_setup.issues.includes("missing teams/_template.md"));
wh("teams/_template.md", "---\ntype: team\n---\n");
unlinkSync(join(PL, "entities/fleeting.md"));
h = hcRun("--strict");
t("H.11 a missing entity definition in the plugin is a setup issue", h.code === 1 && h.j.check2_setup.issues.includes("missing entity definition fleeting.md"));
wp("entities/fleeting.md", "# definition\n");
writeFileSync(join(PL, ".claude-plugin/plugin.json"), "{ not json");
h = hcRun("--strict");
t("H.12 an invalid plugin manifest is a setup issue", h.code === 1 && h.j.check2_setup.pluginManifest === "INVALID");
wp(".claude-plugin/plugin.json", '{"name": "bedrock"}\n');
r = run([HEALTH, "--vault", HV, "--plugin", join(ROOT, "no-plugin"), "--strict"]);
t("H.13 a plugin directory that is not accessible is a setup issue", r.code === 1 && /plugin directory not accessible/.test(r.out), r.out);
r = run([HEALTH, "--vault", "fxvault", "--plugin", PL, "--strict"]);
t("H.14 --vault <name> resolves through the plugin registry", r.code === 0 && /\(--vault fxvault \(registry\)\)/.test(r.out), r.out.split("\n")[0]);
r = run([HEALTH, "--vault", "unknown-vault", "--plugin", PL, "--strict"]);
t("H.15 an unknown vault name is an error (strict exit 1)", r.code === 1 && /neither a directory nor registered/.test(r.err), r.err);
r = run([HEALTH, "--vault", HV, "--plugin", PL, "--date", "10/04/2026"]);
t("H.16 a malformed --date is an error", /--date must be YYYY-MM-DD/.test(r.err), r.err);

// =====================================================================================================================
// verify-plan.ts
// =====================================================================================================================

section("verify-plan.ts: split tables against the notes (G-split)");
const VV = join(ROOT, "vp-vault");
const wvv = writer(VV);
wvv("topics/t1.md", [
  "---", "type: topic", "title: T1", "---", "", "# T1", "", "> tagline", "",
  "## Context", "", "context text", "",
  "## Keep me", "", "kept text", "- ~~old blend weight 0.35~~ superseded by the new weights", "(see Keep me)", "",
  "## Alpha", "", "Correction: the alpha claim is wrong.", "0.35 was corrected here", "",
  "## Beta", "", "beta own text", "", "### B1", "", "b1 text", "", "### B2", "", "b2 text", "", "### B3", "", "b3 text", "",
  "## Gamma", "", "see the table above", "the blend is 0.35 now", "",
].join("\n"));
wvv("projects/p1.md", ["---", "type: project", "title: P1", "---", "", "# P1", "", "## Overview", "", "o", "", "## Map", "", "### Related Topics", "", "| [[t1]] | x |", "", "## Detail", "", "detail text", ""].join("\n"));
wvv("topics/t2.md", ["---", "type: topic", "title: T2", "---", "", "# T2", "", "## Big", "", filler(52), "## Mid", "", filler(46), "## Small", "", "s", ""].join("\n"));
wvv("topics/t3.md", ["---", "type: topic", "title: T3", "---", "", "# T3", "", "## Context", "", filler(52), "## Small", "", "s", ""].join("\n"));
wvv("topics/existing-slug.md", "---\ntitle: E\n---\n\n# E\n");
const A1 = [
  "**A1 `topics/t1`** (test). Hub keeps the summary layer plus `## Keep me`.",
  "",
  "| Suffix | Title | Headings moved | KB |",
  "|---|---|---|---|",
  "| `-alpha` | Alpha part | `## Alpha` | 1 |",
  "| `-beta-1-2` | Beta one and two | `## Beta` + own text + `### B1` ... `### B2` | 1 |",
  "| `-beta-3-gamma` | Beta three and gamma | `### B3`, `## Gamma` | 1 |",
].join("\n");
const A2 = ["**A2 `projects/p1`** (test). Hub keeps the summary layer.", "", "| Full slug | Title | Headings moved | KB |", "|---|---|---|---|", "| `2026-06-feature-detail-part` | Detail | `## Detail` | 1 |"].join("\n");
const planText = (blocks: string, total: number, tail = "") => `# plan\n\n### 3.2 Split table\n\n#### Batch 4 (splits A): test\n\n${blocks}\n\nTotals: ${total} + 0 + 0 = **${total} parts**.\n${tail}`;
const vpRun = (plan: string, ...args: string[]) => {
  const pf = join(ROOT, "vp-plan.md");
  writeFileSync(pf, plan);
  return run([VERIFY, "--vault", VV, "--plan", pf, ...args]);
};
r = vpRun(planText(A1 + "\n\n" + A2, 4));
t("V.1 every section kept or moved exactly once: 'no problems', exit 0 (incl. '## X + own text', '### a ... ### b' ranges)", r.code === 0 && /no problems/.test(r.out) && /parts: 4 \(A 4, B 0, C 0/.test(r.out), r.out);
t("V.2 a project's ## Map (with its demoted ### Related Topics) is summary layer kept by the hub [review B-N7]", r.code === 0 && !/Map/.test(r.out.split("PROBLEMS")[1] ?? ""));
r = vpRun(planText(A1.replace(", `## Gamma`", "") + "\n\n" + A2, 4));
t("V.3 a section neither kept nor moved is a problem (exit 1)", r.code === 1 && /"## Gamma" neither kept nor moved/.test(r.out), r.out.slice(-400));
r = vpRun(planText(A1.replace("`### B3`, `## Gamma`", "`### B3`, `## Gamma`, `## Alpha`") + "\n\n" + A2, 4));
t("V.4 a section moved by two parts is a problem", r.code === 1 && /"## Alpha" moved by/.test(r.out), r.out.slice(-400));
const A3 = ["**A3 `topics/t2`** (test).", "", "| Suffix | Title | Headings moved | KB |", "|---|---|---|---|", "| `-big` | Big | `## Big` | 52 |", "| `-mid` | Mid | `## Mid` | 46 |", "| `-small` | Small | `## Small` | 1 |"].join("\n");
r = vpRun(planText(A3, 3), "--only", "A3");
t("V.5 a part at or over 50 KB is a problem; one over 45 KB is a warning", r.code === 1 && /-big: \d+\.\d KB is at or over the 50 KB limit/.test(r.out) && /-mid: \d+\.\d KB is over the 45 KB part target/.test(r.out), r.out.slice(-500));
const A4 = ["**A4 `topics/t3`** (test).", "", "| Suffix | Title | Headings moved | KB |", "|---|---|---|---|", "| `-small` | Small | `## Small` | 1 |"].join("\n");
r = vpRun(planText(A4, 1), "--only", "A4");
t("V.6 a hub at or over 50 KB (its summary layer stays) is a problem", r.code === 1 && /A4 hub: \d+\.\d KB \(with its Parts list\) is at or over 50 KB/.test(r.out), r.out.slice(-400));
const t1sha = createHash("sha256").update(readFileSync(join(VV, "topics/t1.md"))).digest("hex").slice(0, 12);
writeFileSync(join(ROOT, "vp-fp.txt"), `${t1sha} 1 topics/t1\n000000000000 1 projects/p1\n`);
r = vpRun(planText(A1 + "\n\n" + A2, 4), "--fingerprints", join(ROOT, "vp-fp.txt"));
t("V.7 --fingerprints: an unchanged note and a CHANGED one are told apart", r.code === 0 && /changed since the plan's fingerprints: A2$/m.test(r.out) && / unchanged /.test(r.out), r.out);
const A1bad = A1.replace(", `## Gamma`", "");
r = vpRun(planText(A1bad + "\n\n" + A2, 4, `\n## Amendments\n\n${A1}\n`));
t("V.8 an appended amendment for the same id replaces the original (latest table wins; no duplicate slugs) [review B-N7]", r.code === 0 && /no problems/.test(r.out) && /new slugs: 4, duplicates: 0/.test(r.out), r.out.slice(-500));
r = vpRun(planText(A1 + "\n\n" + A2, 4), "--s1");
t("V.9 --s1 lists marker lines with their destination (a hub line and a part line; 'corrected' is not a marker word)", /S1 marker lines \(2\)/.test(r.out) && /A1\s+L\d+\s+HUB\s+.*superseded/.test(r.out) && /A1\s+L\d+\s+-alpha\s+.*Correction: the alpha claim/.test(r.out), r.out.slice(-900));
r = vpRun(planText(A1 + "\n\n" + A2, 4), "--s1-cross");
t("V.10 --s1-cross: a struck hub claim's token recurring unmarked in a part is a candidate; a marked line is not", /S1 cross candidates: .* \(1\)/.test(r.out) && /\[0\.35\] \| the blend is 0\.35 now/.test(r.out) && !/0\.35 was corrected here/.test(r.out.split("S1 cross candidates")[1] ?? ""), r.out.slice(-600));
r = vpRun(planText(A1 + "\n\n" + A2, 4), "--positional");
t("V.11 --positional lists positional words and '(see ...)' section-name references", /positional trigger lines \(1\)/.test(r.out) && /see the table above/.test(r.out) && /section-name references "\(see \.\.\.\)" without a positional word \(1\)/.test(r.out), r.out.slice(-600));
r = vpRun(planText(A1 + "\n\n" + A2, 5));
t("V.12 a Totals line that disagrees with the tables is a problem", r.code === 1 && /Totals line says 5 parts, tables hold 4/.test(r.out));
r = vpRun(planText(A1 + "\n\n" + A2.replace("2026-06-feature-detail-part", "existing-slug"), 4));
t("V.13 a part slug that clashes with an existing note is a problem", r.code === 1 && /clashes with existing notes: existing-slug/.test(r.out));
r = vpRun(planText(A1 + "\n\n" + A2 + "\n\n**A5 `topics/nope`** (test).\n\n| Suffix | Title | Headings moved | KB |\n|---|---|---|---|\n| `-x` | X | `## X` | 1 |", 5));
t("V.14 a split note that does not exist is a problem", r.code === 1 && /A5: missing note topics\/nope/.test(r.out));
r = vpRun(planText(A1 + "\n\n" + A2, 4), "--only", "A2");
t("V.15 --only limits the run to the named ids", r.code === 0 && /^A2 /m.test(r.out) && !/^A1 /m.test(r.out));
r = vpRun(planText(A1, 3), "--bogus");
t("V.16 an unknown argument is an error (exit 1)", r.code === 1 && /unknown argument --bogus/.test(r.err));
r = run([VERIFY, "--vault", VV, "--plan", join(ROOT, "no-plan.md")]);
t("V.17 a --plan that does not exist is an error (exit 1)", r.code === 1 && /does not exist/.test(r.err));

// =====================================================================================================================
// static guards: no tool runs a remote git command or reads .bedrock/config.json (Owner decision 7, plan A.0)
// =====================================================================================================================

section("static guards [decision 7]");
const TOOLS = ["check.ts", "conserve.ts", "commit.ts", "healthcheck.ts", "verify-plan.ts"];
for (const f of TOOLS) {
  const code = readFileSync(join(HERE, f), "utf8")
    .split("\n")
    .filter((l) => !l.trim().startsWith("//"))
    .join("\n");
  const remote = code.match(/(["'`])(push|fetch|pull|remote|ls-remote|clone|send-pack)\1/);
  t(`S.${TOOLS.indexOf(f) + 1} ${f}: no remote git command, no --no-verify, no read of .bedrock/config.json`, !remote && !/--no-verify/.test(code) && !/config\.json/.test(code), remote ? remote[0] : "");
}

// ---------------------------------------------------------------------------------------------------------------------
rmSync(ROOT, { recursive: true, force: true });
console.log(`\n${pass} passed, ${fail} failed${fail ? "\nfailed: " + failed.join("\n        ") : ""}`);
process.exit(fail ? 1 : 0);
