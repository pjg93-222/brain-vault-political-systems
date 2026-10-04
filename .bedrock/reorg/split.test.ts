// Fixture tests for split.ts (plan section 10 batch 4 step 2, appendix A.7, S1-S11). Every fixture is a synthetic vault
// (a git repository for the conserve run) under os.tmpdir(), removed at the end; the real vault is never read or written.
// The four S10 matcher fixtures of plan S10 (the reviewers' cases: C4 "see Ledger corrections", moneyball-workbook
// "(Membership+Leadership)/2 scoring above" and "see consult rule", data-collection "see above") reproduce the real lines
// and headings verbatim. conserve.ts and check.ts run on the split fixture to prove that no text was lost and that the
// link model holds.
//   bun .bedrock/reorg/split.test.ts        exit 0 = every test passes
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { loadVault } from "./relink.ts";
import { TRIGGER, loadSplitSpec, rewriteProblem, shortName } from "./split.ts";

const HERE = import.meta.dir;
const SPLIT = join(HERE, "split.ts");
const CHECK = join(HERE, "check.ts");
const CONSERVE = join(HERE, "conserve.ts");
const ROOT = mkdtempSync(join(tmpdir(), "split-tests-"));
const sha = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");

let pass = 0;
let fail = 0;
const failed: string[] = [];
function t(name: string, ok: boolean, detail = "") {
  console.log((ok ? "PASS  " : "FAIL  ") + name + (ok ? "" : "   " + detail.slice(0, 1200)));
  if (ok) pass++;
  else {
    fail++;
    failed.push(name);
  }
}
const section = (s: string) => console.log(`\n== ${s} ==`);
function run(args: string[]) {
  const r = Bun.spawnSync([process.execPath, ...args], { stdout: "pipe", stderr: "pipe", env: { ...process.env } });
  return { code: r.exitCode, out: r.stdout.toString(), err: r.stderr.toString() };
}
function git(dir: string, ...args: string[]) {
  const r = Bun.spawnSync(["git", "-C", dir, ...args], { stdout: "pipe", stderr: "pipe", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
  if (r.exitCode !== 0) throw new Error(`git ${args.join(" ")}: ${r.stderr.toString()}`);
  return r.stdout.toString();
}
function snapshot(dir: string): Map<string, string> {
  const m = new Map<string, string>();
  const walk = (d: string, rel: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name === ".git") continue;
      const p = join(d, e.name);
      const r = rel ? rel + "/" + e.name : e.name;
      if (e.isDirectory()) walk(p, r);
      else m.set(r, sha(readFileSync(p)));
    }
  };
  walk(dir, "");
  return m;
}
const diffSnap = (a: Map<string, string>, b: Map<string, string>) => [...new Set([...a.keys(), ...b.keys()])].filter((k) => a.get(k) !== b.get(k)).sort();
const w = (dir: string, rel: string, text: string) => {
  const p = join(dir, ...rel.split("/"));
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, text);
};
const read = (dir: string, rel: string) => readFileSync(join(dir, ...rel.split("/")), "utf8");
const json = (o: unknown) => JSON.stringify(o, null, 2) + "\n";
const CLAUDE = "# Fixture\n\n## Domains\n\n- `domain/a` — the a rubric\n- `domain/b` — the b rubric\n";
const PROJ = (rows: string, actors = "") =>
  `---\ntype: project\nname: "Project One"\naliases: ["P one"]\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/project", "domain/a"]\n---\n\n# Project One\n\n> The fixture project.\n\n## Overview\n\nIndex note.\n\n## Map\n\nEvery note of this project by type, one line each; parts follow their parent.\n\n### Related Topics\n\n| Topic | Relation |\n|---|---|\n${rows}\n${actors ? `\n### Related Actors\n\n| Actor | Relation |\n|---|---|\n${actors}\n` : ""}`;
const topicFm = (title: string, extra = "") =>
  `---\ntype: topic\ntitle: "${title}"\naliases: ["${title}"]\ncategory: "feature"\nstatus: "in-progress"\npeople: []\nactors: []\n${extra}created_at: 2026-07-09\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/topic", "status/in-progress", "domain/a", "category/feature"]\n---\n`;
/** run split.ts --plan --json on a fixture and return the parsed JSON (flags with their automatic marks) */
function planJson(dir: string, specs: string[], extra: string[] = []) {
  const out = join(dir, "..", `plan-${Math.random().toString(36).slice(2)}.json`);
  const r = run([SPLIT, "--vault", dir, ...specs.flatMap((s) => ["--spec", s]), "--plan", "--date", "2026-10-04", "--json", out, ...extra]);
  const j = existsSync(out) ? JSON.parse(readFileSync(out, "utf8")) : null;
  return { r, j };
}

// =====================================================================================================================
section("S10 matcher fixtures (plan S10, the reviewers' cases)");

// ---- C4: "(see Ledger corrections)" in the hub's Decisions names ### LEDGER CORRECTIONS in -n-audio-route-and-measurements
{
  const D = join(ROOT, "m-c4");
  w(D, "CLAUDE.md", CLAUDE);
  w(D, "projects/p1.md", PROJ("| [[2026-07-feature-audio-and-speech-lane]] | The audio lane. |"));
  w(
    D,
    "topics/2026-07-feature-audio-and-speech-lane.md",
    topicFm("Audio and speech lane") +
      "\n# Audio and speech lane\n\n> The audio lane of project [[p1]].\n\n## Context\n\nContext text.\n\n## Decisions\n\n" +
      '- ~~Original ES/N prereg venue reading~~ and ~~"A is weakly validated"~~ - corrected (see Ledger corrections).\n\n' +
      "## Next Steps\n\n- [ ] One step.\n\n" +
      "## The N audio route: G1, G2, the look (2026-08-21 to 2026-08-25)\n\n" +
      "### TARGET ORIENTATION AMENDED (Paul 2026-08-24): the prereg validates N, not ES\n\nOrientation text.\n\n" +
      "### LEDGER CORRECTIONS (2026-08-24, after Paul's challenge; anchor to `gold-anchored-a-and-stance-curve-2026-07-18` and `psych-audit-2026-07-09`, do NOT conflate)\n\nLedger text.\n\n" +
      "## Venue, reliability and identity measurements\n\nVenue text.\n",
  );
  const spec = join(ROOT, "m-c4.json");
  writeFileSync(
    spec,
    json({
      id: "C4fx",
      parent: "topics/2026-07-feature-audio-and-speech-lane",
      home: "projects/p1",
      hub: { keep: ["## Context", "## Decisions", "## Next Steps"], links: [] },
      parts: [{ slug: "2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements", title: "The N audio route and its measurements", summary: "The N audio route with its venue, reliability and identity measurements", domain: "domain/a", home: "projects/p1", sections: ["## The N audio route: G1, G2, the look (2026-08-21 to 2026-08-25)", "## Venue, reliability and identity measurements"], keep: [] }],
    }),
  );
  const { j } = planJson(D, [spec]);
  const f = j?.flags?.find((x: any) => x.text.includes("see Ledger corrections"));
  t("C4 fixture: the Decisions line is flagged", !!f, JSON.stringify(j?.problems));
  t("C4 fixture: automatic mark is a rewrite naming ### LEDGER CORRECTIONS in -n-audio-route-and-measurements", f?.auto?.mark === "rewrite" && /LEDGER CORRECTIONS/.test(f?.auto?.why ?? "") && f?.auto?.referent === "2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements", JSON.stringify(f?.auto));
  t(
    "C4 fixture: the proposal inserts \"in [[part]]\" after the named referent and changes nothing else",
    f?.auto?.new === '- ~~Original ES/N prereg venue reading~~ and ~~"A is weakly validated"~~ - corrected (see Ledger corrections in [[2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements]]).',
    f?.auto?.new,
  );
}

// ---- moneyball-workbook: line 224 "(Membership+Leadership)/2 scoring above" and line 100 "(see consult rule)" -> ask
const MW224 =
  "The fix = **score restructured into 4 buckets, each min-max normalized then weighted by EDITABLE cells at `Rank & Allocation!S2:S5`: Press 0.40 / Legislative 0.20 / Committee 0.35 / Demographic 0.05** (user first said 40/40/15/5 but 40% legislative floats Durbin, so moved excess to committee). **Legislative is PRESS-GATED** at first (col D = leg_volume × sign(press_lean); anti-CU activity counts negative). Committee pillar = relevance-tiered (Full-member +4, ViceChair+3, SubChair+2.5, Financial-Institutions sub+4, SubRM+1.5), composite = 0.4·membership+0.6·leadership (later replaced by the reverse-engineered (Membership+Leadership)/2 scoring above). **REFINED (same session, later): press-gating was REMOVED** (see superseded). Bias audit also found: none.";
const MW100 = "- Credit Card & Consumer-Fee Mandates co-sponsor sub-weight = 0 (`Legislative Score - Normalized`!DG2) vs 0.0714 for all 17 other topics. Possibly intentional: ask before changing (see consult rule).";
{
  const D = join(ROOT, "m-mw");
  w(D, "CLAUDE.md", CLAUDE);
  w(D, "projects/p1.md", PROJ("| [[t-x]] | A topic. |", "| [[moneyball-workbook]] | The workbook. |"));
  w(D, "topics/t-x.md", topicFm("T x") + "\n# T x\n\n> Of [[p1]].\n\n## Context\n\nText.\n");
  w(
    D,
    "actors/moneyball-workbook.md",
    `---\ntype: actor\nname: "Moneyball Blended workbook"\naliases: ["Blended workbook"]\ncategory: "spreadsheet"\ndescription: "The workbook."\nstatus: "active"\nteam: ""\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/actor", "status/active", "domain/a"]\n---\n\n# Moneyball Blended workbook\n\n> The workbook of [[p1]].\n\n## Details\n\nDetails.\n\n## Known Issues\n\n${MW100}\n\n## Committee Data scoring (reference, 2026-07-01; \`moneyball-committee-scoring\`)\n\n**Formula (reverse-engineered, reproduces all 288 rows exactly):**\n\n- (Membership+Leadership)/2.\n\n## Standing rules\n\n- **Consult the user before treating apparent model errors as bugs** (feedback, 2026-06-25; \`feedback_spreadsheet_consult_on_errors\`).\n\n## Model lineage and files (project_moneyball_model, 2026-06-18 to 2026-06-22)\n\n${MW224}\n\n## Related Projects\n\n- [[p1]] - The project.\n`,
  );
  const spec = join(ROOT, "m-mw.json");
  writeFileSync(
    spec,
    json({
      id: "B6fx",
      parent: "actors/moneyball-workbook",
      home: "projects/p1",
      hub: { keep: ["## Details", "## Known Issues", "## Related Projects"], links: null },
      parts: [
        { slug: "moneyball-workbook-rules-scoring-and-sublayer-surgery", title: "Standing rules and committee-data scoring", summary: "Standing rules and the committee-data scoring of the fixture workbook", domain: "domain/a", home: "projects/p1", sections: ["## Committee Data scoring (reference, 2026-07-01; `moneyball-committee-scoring`)", "## Standing rules"], keep: [] },
        { slug: "moneyball-workbook-lineage-and-june-audit", title: "Model lineage and files", summary: "Model lineage and files of the fixture workbook in June 2026", domain: "domain/a", home: "projects/p1", sections: ["## Model lineage and files (project_moneyball_model, 2026-06-18 to 2026-06-22)"], keep: [] },
      ],
    }),
  );
  const { j } = planJson(D, [spec]);
  const f224 = j?.flags?.find((x: any) => x.text === MW224);
  const f100 = j?.flags?.find((x: any) => x.text === MW100);
  t("moneyball fixture: line 224 is flagged", !!f224, JSON.stringify(j?.problems));
  t("moneyball fixture: \"(Membership+Leadership)/2 scoring above\" is \"ask\" (the referent ## Committee Data scoring sits in the sibling part, not the nearest heading)", f224?.auto?.mark === "ask", JSON.stringify(f224?.auto));
  t("moneyball fixture: line 224 is never marked \"same note\" (B-N4)", f224?.auto?.mark !== "same note");
  t("moneyball fixture: line 100 is flagged", !!f100);
  t("moneyball fixture: \"(see consult rule)\" is \"ask\" (it names a bullet, not a heading)", f100?.auto?.mark === "ask", JSON.stringify(f100?.auto));
}

// ---- data-collection: line 396 "(L3 later shipped 2026-08-07, see above)" -> ask (referent in -lobbyview-org-mentions-and-efficiency)
const DC396 = "- Remaining ingredients (industry giving patterns per-company), L3 press/social mention measurement (L3 later shipped 2026-08-07, see above).";
{
  const D = join(ROOT, "m-dc");
  w(D, "CLAUDE.md", CLAUDE);
  w(D, "projects/p1.md", PROJ("| [[2026-07-feature-data-collection-lanes]] | Collection lanes. |"));
  w(
    D,
    "topics/2026-07-feature-data-collection-lanes.md",
    topicFm("Data collection lanes") +
      "\n# Data collection lanes\n\n> Collection lanes of [[p1]].\n\n## Context\n\nContext.\n\n" +
      "## LobbyView / LDA integration lane (2026-07-31 to 2026-08-12)\n\nContradiction note (kept, newest wins): own text stays in the hub.\n\n" +
      "### ORG-MENTIONS AUDIT + FIX ROUNDS (2026-08-07/08)\n\nL3 org-mention measurement shipped 2026-08-07.\n\n" +
      "### SCALE UPGRADE C4+A1+B1+C1 SHIPPED (2026-08-06, merged @e779727, codex-executed)\n\n" +
      DC396 +
      "\n",
  );
  const spec = join(ROOT, "m-dc.json");
  writeFileSync(
    spec,
    json({
      id: "C1fx",
      parent: "topics/2026-07-feature-data-collection-lanes",
      home: "projects/p1",
      hub: { keep: ["## Context", "## LobbyView / LDA integration lane (2026-07-31 to 2026-08-12)"], links: [] },
      parts: [
        { slug: "2026-07-feature-data-collection-lanes-lobbyview-org-mentions-and-efficiency", title: "LobbyView lane: org-mention measurement", summary: "The LobbyView org-mention measurement of the fixture collection lanes", domain: "domain/a", home: "projects/p1", sections: ["### ORG-MENTIONS AUDIT + FIX ROUNDS (2026-08-07/08)"], keep: [] },
        { slug: "2026-07-feature-data-collection-lanes-lobbyview-looks-and-scale-upgrade", title: "LobbyView lane: scale upgrade", summary: "The LobbyView scale upgrade of the fixture collection lanes", domain: "domain/a", home: "projects/p1", sections: ["### SCALE UPGRADE C4+A1+B1+C1 SHIPPED (2026-08-06, merged @e779727, codex-executed)"], keep: [] },
      ],
    }),
  );
  const { j } = planJson(D, [spec]);
  const f = j?.flags?.find((x: any) => x.text === DC396);
  t("data-collection fixture: line 396 is flagged", !!f, JSON.stringify(j?.problems));
  t("data-collection fixture: \"(L3 later shipped 2026-08-07, see above)\" is \"ask\"", f?.auto?.mark === "ask", JSON.stringify(f?.auto));
}

// =====================================================================================================================
section("unit: the trigger set, the decision 4(b) rewrite check, S4 short names");
{
  const hits = (s: string) => [...s.matchAll(TRIGGER)].map((m) => m[0].toLowerCase());
  t("trigger set: positional words, the table/list/section and every see", JSON.stringify(hits("see the table above; the list below, earlier and later, next, previous, following, this section")) === JSON.stringify(["see", "the table", "above", "the list", "below", "earlier", "later", "next", "previous", "following", "this section"]), JSON.stringify(hits("see the table above; the list below, earlier and later, next, previous, following, this section")));
  t("trigger set: a plain line has none", hits("Nothing to flag in this sentence.").length === 0);
  t("short name: up to the first \" (\" or \":\"", shortName("UI redesign boards (Melange and Mentat)") === "UI redesign boards" && shortName("Codex executor lane") === "Codex executor lane" && shortName("A: b (c)") === "A");
}

// =====================================================================================================================
section("the split fixture: a topic family, an actor family, K pair, D relation, R1/R2, Map rows, S10, fleeting guard");

const FX = join(ROOT, "fx");
const SRC_PAIR = '  - {url: "file:///m/a.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\\\m\\\\a.md", sha256: "aaaa000000000000000000000000000000000000000000000000000000000001"}';
function buildFixture(dir: string) {
  w(dir, "CLAUDE.md", CLAUDE);
  w(dir, "projects/p1.md", PROJ("| [[t-big]] | The big topic. |\n| [[t-other]] | Another topic. |", "| [[a1]] | Actor one. |\n| [[a2]] | Actor two. |\n| [[a-big]] | The big actor. |") + "\n### Related Concepts\n\n- [[c1]] - The concept.\n\n### Discussions\n\n- [[d1]] - The discussion.\n");
  w(
    dir,
    "topics/t-big.md",
    `---\ntype: topic\ntitle: "The big topic"\naliases: ["The big topic"]\ncategory: "feature"\nstatus: "in-progress"\npeople: []\nactors:\n  - "[[a1]]"\n  - "[[a2]]"\nobjective: "Hold everything."\ncreated_at: 2026-07-01\nsources:\n${SRC_PAIR}\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/topic", "status/in-progress", "domain/a", "category/feature"]\n---\n\n` +
      "# The big topic\n\n> A big topic of [[p1]] that needs splitting.\n\n" +
      "## Context\n\nThe system is [[a1]]; the rule is [[c1]]; discussed in [[d1]]; see also [[t-other]].\n\n" +
      "## Actors Involved\n\n| Actor | Relation |\n|---|---|\n| [[a1]] | main |\n| [[a2]] | side |\n\n" +
      "## Decisions\n\n- Lane B decided everything (see Lane B below).\n- The next review is in October.\n\n" +
      "## Next Steps\n\n- [ ] Finish.\n\n" +
      "## Lane A (2026-07)\n\nLane A own text.\n\n### A one\n\nThe history record is [[a-big]] here.\n\n### A two\n\nA two text only.\n\n" +
      "## Lane B (2026-08)\n\nLane B uses [[a2]] and [[a2|the second actor]] under the rule [[c1]]; see Lane A above.\n\n" +
      "## Lane C (2026-09)\n\nLane C text, later than B.\n",
  );
  w(dir, "topics/t-other.md", topicFm("T other title") + "\n# T other title\n\n> Another leaf of [[p1]].\n\n## Context\n\nMentions [[t-big]].\n");
  w(dir, "actors/a1.md", `---\ntype: actor\nname: "Actor one"\naliases: ["A one"]\ndescription: "Actor one."\nstatus: "active"\nteam: ""\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/actor", "status/active", "domain/a"]\n---\n\n# Actor one\n\n> Actor one.\n\n## Related Topics\n\n- [[t-big]] - The big topic.\n\n## Related Projects\n\n- [[p1]] - The project.\n`);
  w(dir, "actors/a2.md", `---\ntype: actor\nname: "Actor two"\naliases: ["A two"]\ndescription: "Actor two."\nstatus: "active"\nteam: ""\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/actor", "status/active", "domain/a"]\n---\n\n# Actor two\n\n> Actor two.\n\n## Related Topics\n\n- [[t-big]] - The big topic.\n\n## Related Projects\n\n- [[p1]] - The project.\n`);
  w(
    dir,
    "actors/a-big.md",
    `---\ntype: actor\nname: "Big actor"\naliases: ["The big actor"]\ncategory: "pipeline"\ndescription: "The big actor."\nrepository: "C:\\\\repo"\nstatus: "active"\nteam: ""\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/actor", "status/active", "domain/b"]\n---\n\n# Big actor\n\n> The big actor of [[p1]].\n\n## Details\n\nDetails of the actor.\n\n## History lane (2026-07)\n\nThe topic record is [[t-big]]; nothing is below.\n\n## Related Topics\n\n- [[t-big]] - The big topic.\n\n## Related Projects\n\n- [[p1]] - The project.\n`,
  );
  w(dir, "concepts/c1.md", `---\ntype: concept\nname: "Concept one"\naliases: ["C one"]\ndescription: "The concept."\nrelated_to: []\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/concept", "domain/a"]\n---\n\n# Concept one\n\n> The concept.\n\n## Where it Applies\n\n- [[t-big]] - The big topic.\n- [[p1]] - The project.\n`);
  w(dir, "discussions/d1.md", `---\ntype: discussion\ntitle: "D one"\naliases: ["D one"]\nrelated_topics:\n  - "[[t-big]]"\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "import@agent"\ntags: ["type/discussion", "domain/a"]\n---\n\n# D one\n\n> The session that ruled on [[t-big]] in [[p1]].\n\n## Notes\n\nContinues [[t-big]].\n`);
  w(dir, "fleeting/f1.md", "---\ntype: fleeting\n---\n\n# F one\n\n> A capture that mentions [[t-big]].\n");
}
buildFixture(FX);
git(FX, "init", "-q", "-b", "brain-reorg-2026-10-03");
git(FX, "config", "user.name", "Fixture");
git(FX, "config", "user.email", "fixture@example.invalid");
git(FX, "config", "core.autocrlf", "false");
git(FX, "add", "-A");
git(FX, "commit", "-q", "-m", "base");
const BASE = git(FX, "rev-parse", "HEAD").trim();
const pre = run([CHECK, "--vault", FX, "--strict", "--require", "b,c,d,g,j,k"]);
t("fixture: check.ts passes before the split (0 one-way, families clean)", pre.code === 0, pre.out.slice(-1500) + pre.err);

const SPEC_T = join(ROOT, "t-big.json");
const SPEC_A = join(ROOT, "a-big.json");
const tSpec = (s10: unknown[]) => ({
  id: "T1",
  parent: "topics/t-big",
  home: "projects/p1",
  hub: { keep: ["## Context", "## Actors Involved", "## Decisions", "## Next Steps"], links: ["actors/a1", "concepts/c1"] },
  parts: [
    { slug: "t-big-lane-a-one", title: "Lane A part one", summary: "Lane A of the big topic with its first sub-lane and the history record", domain: "domain/a", home: "projects/p1", sections: ["## Lane A (2026-07)", "### A one"], keep: [] },
    { slug: "t-big-lane-a-two", title: "Lane A part two", summary: "The second sub-lane of lane A of the big topic", domain: "domain/b", home: "projects/p1", sections: ["### A two"], keep: [] },
    { slug: "t-big-lanes-b-and-c", title: "Lanes B and C", summary: "Lanes B and C of the big topic with the second actor and the rule", domain: "domain/a", home: "projects/p1", sections: ["## Lane B (2026-08)", "## Lane C (2026-09)"], keep: ["concepts/c1", "actors/a2"] },
  ],
  named: [{ id: "KX", a: "topics/t-big-lane-a-one", b: "actors/a-big-history" }],
  relations: [{ id: "DX", part: "topics/t-big-lanes-b-and-c", with: "discussions/d1" }],
  retarget: [{ note: "discussions/d1", from: "topics/t-big", to: "topics/t-big-lanes-b-and-c", why: "DX (C4)" }],
  s10,
});
const aSpec = (s10: unknown[]) => ({
  id: "A1fx",
  parent: "actors/a-big",
  home: "projects/p1",
  hub: { keep: ["## Details", "## Related Topics", "## Related Projects"], links: null },
  parts: [{ slug: "a-big-history", title: "History lane", summary: "The history lane of the big actor in July 2026", domain: "domain/b", home: "projects/p1", sections: ["## History lane (2026-07)"], keep: [] }],
  named: [{ id: "KX", a: "actors/a-big-history", b: "topics/t-big-lane-a-one" }],
  s10,
});
writeFileSync(SPEC_T, json(tSpec([])));
writeFileSync(SPEC_A, json(aSpec([])));

// ---- plan with no S10 resolutions: unresolved flags, nothing written, draft written
{
  const before = snapshot(FX);
  const draft = join(ROOT, "draft.json");
  const { r, j } = planJson(FX, [SPEC_T, SPEC_A], ["--draft-s10", draft]);
  t("plan: exits 1 while S10 flags are unresolved", r.code === 1 && /unresolved S10 flag/.test(r.out), r.out.slice(-800));
  t("plan: writes nothing in the vault", diffSnap(before, snapshot(FX)).length === 0, diffSnap(before, snapshot(FX)).join(", "));
  const d = existsSync(draft) ? JSON.parse(readFileSync(draft, "utf8")) : {};
  t("plan: --draft-s10 lists every flagged line with the resolver's proposal", (d.T1 ?? []).length >= 4 && (d.A1fx ?? []).length >= 1, JSON.stringify(d).slice(0, 600));
  const fB = j?.flags?.find((x: any) => x.text.includes("see Lane B below"));
  t("plan: \"see Lane B below\" in the hub is proposed as a rewrite to the part holding ## Lane B", fB?.auto?.mark === "rewrite" && fB?.auto?.new === "- Lane B decided everything (see Lane B in [[t-big-lanes-b-and-c]]).", JSON.stringify(fB?.auto));
  const fA = j?.flags?.find((x: any) => x.text.includes("see Lane A above"));
  t("plan: \"see Lane A above\" in a part is proposed as a sibling rewrite", fA?.auto?.mark === "rewrite" && /in \[\[t-big-lane-a-one\]\]/.test(fA?.auto?.new ?? ""), JSON.stringify(fA?.auto));
  const fN = j?.flags?.find((x: any) => x.text.includes("The next review"));
  t("plan: a bare \"next\" is \"ask\", never an automatic mark", fN?.auto?.mark === "ask", JSON.stringify(fN?.auto));
  const apply = run([SPLIT, "--vault", FX, "--spec", SPEC_T, "--spec", SPEC_A, "--apply", "--date", "2026-10-04", "--manifest", join(FX, "manifest.txt")]);
  t("apply: refuses while S10 flags are unresolved, writing nothing", apply.code === 1 && /REFUSED/.test(apply.out) && diffSnap(before, snapshot(FX)).length === 0, apply.out.slice(-600));
}

// ---- spec refusals
{
  const bad = join(ROOT, "bad.json");
  const refuse = (mut: (s: any) => void, re: RegExp, name: string) => {
    const s = tSpec([]);
    mut(s);
    writeFileSync(bad, json(s));
    const r = run([SPLIT, "--vault", FX, "--spec", bad, "--plan"]);
    t(`spec refusal: ${name}`, r.code === 1 && re.test(r.err + r.out), (r.err + r.out).slice(-400));
  };
  refuse((s) => (s.parts[2].keep = ["concepts/c1", "actors/a2", "actors/a1", "actors/a-big"]), /more than 3/, "a keep list over 3 others");
  refuse((s) => ((s.parts[1].s11 = true), (s.parts[1].keep = ["actors/a1", "actors/a2", "concepts/c1"])), /S11/, "an S11 part with 3 others");
  refuse((s) => (s.parts[0].summary = "Too short"), /summary/, "a summary under 25 characters");
  refuse((s) => (s.parts[0].summary = "First sentence here. Second Sentence there"), /one sentence/, "a two-sentence summary");
  refuse((s) => (s.parts[0].slug = "t-other"), /already exists/, "a part slug that already exists");
  refuse((s) => (s.hub.links = null), /needs hub.links/, "a topic hub without hub.links");
  refuse((s) => (s.parts[0].pointers = ["no blockquote"]), /pointer line must start/, "a pointer line that is not a blockquote");
  refuse((s) => (s.s10 = [{ line: 3, old: "x", mark: "same-note" }]), /mark must be one of/, "an unknown S10 mark");
}
// ---- section coverage problems
{
  const bad = join(ROOT, "bad2.json");
  const s = tSpec([]);
  s.parts[2].sections = ["## Lane B (2026-08)"]; // Lane C neither kept nor moved
  writeFileSync(bad, json(s));
  const r1 = run([SPLIT, "--vault", FX, "--spec", bad, "--spec", SPEC_A, "--plan"]);
  t("coverage: a ## section neither kept nor moved is a problem", r1.code === 1 && /Lane C \(2026-09\)" is neither kept nor moved/.test(r1.out), r1.out.slice(-600));
  const s2 = tSpec([]);
  s2.parts[1].sections = ["### A two", "### A one"]; // A one assigned twice
  writeFileSync(bad, json(s2));
  const r2 = run([SPLIT, "--vault", FX, "--spec", bad, "--spec", SPEC_A, "--plan"]);
  t("coverage: a ### section assigned twice is a problem", r2.code === 1 && r2.out.includes('"### A one" (in ## Lane A (2026-07)) is assigned 2x'), r2.out.slice(-600));
}
// ---- size refusal at 50 KB
{
  const D = join(ROOT, "big");
  buildFixture(D);
  const t0 = read(D, "topics/t-big.md").replace("Lane C text, later than B.", "Lane C text.\n\n" + ("- padding line with words " + "x".repeat(200) + "\n").repeat(260));
  w(D, "topics/t-big.md", t0);
  const r = run([SPLIT, "--vault", D, "--spec", SPEC_T, "--spec", SPEC_A, "--plan"]);
  t("size: a part at or over 50 KB is refused", r.code === 1 && /at or over the 50 KB limit/.test(r.out), r.out.slice(-500));
}

// ---- the full resolution and --apply
const S10_T = [
  { line: 0, old: "- Lane B decided everything (see Lane B below).", mark: "rewrite", new: "- Lane B decided everything (see Lane B in [[t-big-lanes-b-and-c]]).", why: "names ## Lane B" },
  { line: 0, old: "- The next review is in October.", mark: "not positional", why: "time" },
  { line: 0, old: "## Next Steps", mark: "not positional", why: "heading" },
  { line: 0, old: "Lane B uses [[a2]] and [[a2|the second actor]] under the rule [[c1]]; see Lane A above.", mark: "rewrite", new: "Lane B uses [[a2]] and [[a2|the second actor]] under the rule [[c1]]; see Lane A in [[t-big-lane-a-one]].", why: "names ## Lane A" },
  { line: 0, old: "Lane C text, later than B.", mark: "not positional", why: "time" },
  { line: 0, old: "The system is [[a1]]; the rule is [[c1]]; discussed in [[d1]]; see also [[t-other]].", mark: "external", why: "names other notes" },
];
const S10_A = [{ line: 0, old: "The topic record is [[t-big]]; nothing is below.", mark: "not positional", why: "nothing is below: not a reference" }];
const fill = (rel: string, list: any[]) => {
  const lines = read(FX, rel + ".md").split("\n");
  return list.map((e) => ({ ...e, line: lines.indexOf(e.old) + 1 }));
};
writeFileSync(SPEC_T, json(tSpec(fill("topics/t-big", S10_T))));
writeFileSync(SPEC_A, json(aSpec(fill("actors/a-big", S10_A))));
{
  const { r, j } = planJson(FX, [SPEC_T, SPEC_A]);
  t("plan: clean once every flag is resolved (\"no problems\")", r.code === 0 && /no problems/.test(r.out), r.out.slice(-1500));
  t("plan: the 4.3 proposal for the lanes part is the concept first, then the actor by mention count", /t-big-lanes-b-and-c: proposed [^\n]*c1, a2/.test(r.out), r.out.match(/t-big-lanes-b-and-c: proposed[^\n]*/)?.[0] ?? "");
}
const MAN = join(FX, ".bedrock/reorg/ledger/batch-9-paths.txt");
const POS = join(FX, ".bedrock/reorg/ledger/batch-9-positional.md");
const ALLOW = join(FX, ".bedrock/reorg/ledger/batch-9-allow.txt");
const before = snapshot(FX);
const ap = run([SPLIT, "--vault", FX, "--spec", SPEC_T, "--spec", SPEC_A, "--apply", "--date", "2026-10-04", "--manifest", MAN, "--positional-log", POS, "--allow", ALLOW]);
t("apply: succeeds", ap.code === 0, ap.out.slice(-1500) + ap.err);
const changedPaths = diffSnap(before, snapshot(FX));
t("apply: the fleeting note is untouched", !changedPaths.some((p) => p.startsWith("fleeting/")), changedPaths.join(", "));
const part1 = read(FX, "topics/t-big-lane-a-one.md");
const part2 = read(FX, "topics/t-big-lane-a-two.md");
const part3 = read(FX, "topics/t-big-lanes-b-and-c.md");
const apart = read(FX, "actors/a-big-history.md");
const hub = read(FX, "topics/t-big.md");
const ahub = read(FX, "actors/a-big.md");
t("S4: topic part frontmatter = template keys + part_of, sources: [], parent's status/category/created_at", /^---\ntype: topic\ntitle: "Lane A part one \(The big topic\)"\naliases: \["The big topic: Lane A part one"\]\ncategory: "feature"\nstatus: "in-progress"\npeople: \[\]\nactors: \[\]\nobjective: ""\ncreated_at: 2026-07-01\nsources: \[\]\nupdated_at: 2026-10-04\nupdated_by: "reorg@agent"\ntags: \["type\/topic", "status\/in-progress", "domain\/a", "category\/feature"\]\npart_of: "\[\[t-big\]\]"\n---\n/.test(part1), part1.slice(0, 700));
t("S4: a part's own domain tag replaces the parent's", /tags: \["type\/topic", "status\/in-progress", "domain\/b", "category\/feature"\]/.test(part2));
t("S4: actor part = actor template keys, description = summary, the parent's team value, no created_at invented", /^---\ntype: actor\nname: "History lane \(Big actor\)"\naliases: \["Big actor: History lane"\]\ncategory: "pipeline"\ndescription: "The history lane of the big actor in July 2026\."\nrepository: ""\nstack: ""\nstatus: "active"\nteam: ""\ncriticality: ""\npci: false\nknown_issues: \[\]\nsources: \[\]\nlast_synced_at: ""\nlast_synced_sha: ""\nupdated_at: 2026-10-04\nupdated_by: "reorg@agent"\ntags: \["type\/actor", "status\/active", "domain\/b"\]\npart_of: "\[\[a-big\]\]"\n---\n/.test(apart), apart.slice(0, 700));
t("S5: part header = # title, summary blockquote with Part of [[parent]] (project [[home]])", part1.includes("\n# Lane A part one (The big topic)\n\n> Lane A of the big topic with its first sub-lane and the history record. Part of [[t-big]] (project [[p1]]).\n"), part1.slice(0, 900));
t("S1: the ## heading line and its own text go to the first part; a later part starts with a verbatim heading copy", part1.includes("## Lane A (2026-07)\n\nLane A own text.\n\n### A one") && part2.includes("## Lane A (2026-07)\n\n### A two\n\nA two text only."), part2);
t("S2: the hub gains ## Parts before its first ##, one line per part in table order", hub.includes("> A big topic of [[p1]] that needs splitting.\n\n## Parts\n\n- [[t-big-lane-a-one]] — Lane A of the big topic with its first sub-lane and the history record.\n- [[t-big-lane-a-two]] — The second sub-lane of lane A of the big topic.\n- [[t-big-lanes-b-and-c]] — Lanes B and C of the big topic with the second actor and the rule.\n\n## Context"), hub.slice(0, 1200));
t("S2: the hub keeps its frontmatter sources pair and loses the moved sections", hub.includes("aaaa000000000000000000000000000000000000000000000000000000000001") && !hub.includes("## Lane A") && !hub.includes("## Lane B"), hub);
t("topic hub: links outside its list become plain text (C1 body, C2 frontmatter)", hub.includes('  - "a2"') && hub.includes("| Actor two | side |") && hub.includes("see also T other title") && hub.includes("discussed in D one") && hub.includes("The system is [[a1]]") && hub.includes("the rule is [[c1]]"), hub);
t("S10: the hub's rewrite is applied verbatim", hub.includes("- Lane B decided everything (see Lane B in [[t-big-lanes-b-and-c]])."));
t("S10: the sibling rewrite is applied and R3 answers it in the sibling's ## Related Topics", part3.includes("see Lane A in [[t-big-lane-a-one]].") && /## Related Topics\n\n(- .*\n)*- \[\[t-big-lanes-b-and-c\]\] — /.test(part1), part1);
t("4.3 keep list: the part keeps the concept and the actor (both mentions of a2 kept)", part3.includes("Lane B uses [[a2]] and [[a2|the second actor]] under the rule [[c1]]"), part3);
t("C4 K pair: the part's link to the counterpart's parent is retargeted with the old title as display", part1.includes("The history record is [[a-big-history|Big actor]] here.") && apart.includes("The topic record is [[t-big-lane-a-one|The big topic]]; nothing is below."), part1 + "\n" + apart);
t("C4 D relation: the discussion's links to the parent move to the part (frontmatter and body)", read(FX, "discussions/d1.md").includes('  - "[[t-big-lanes-b-and-c]]"') && read(FX, "discussions/d1.md").includes("Continues [[t-big-lanes-b-and-c|The big topic]]."), read(FX, "discussions/d1.md"));
t("R3 D relation: the part that does not mention the discussion gets a C5 line for it", /## Related Topics\n\n- \[\[d1\]\] — /.test(part3), part3);
t("R1: an actor a part keeps gets a C5 line for the part in ## Related Topics", /- \[\[t-big-lanes-b-and-c\]\] — Lanes B and C of the big topic with the second actor and the rule\./.test(read(FX, "actors/a2.md")), read(FX, "actors/a2.md"));
t("R1: a concept a part keeps gets a C5 line in ## Where it Applies", /## Where it Applies\n\n- \[\[t-big\]\] - The big topic\.\n- \[\[p1\]\] - The project\.\n- \[\[t-big-lanes-b-and-c\]\] — /.test(read(FX, "concepts/c1.md")), read(FX, "concepts/c1.md"));
t("R2: an actor the hub does not keep loses its link to the hub (plain text)", read(FX, "actors/a2.md").includes("- The big topic - The big topic."), read(FX, "actors/a2.md"));
t("R2: a leaf linking the hub becomes plain text", read(FX, "topics/t-other.md").includes("Mentions The big topic."), read(FX, "topics/t-other.md"));
t("actor hub: keeps the hub-side link the R-rules allow; its link to the topic hub becomes plain text (R2)", ahub.includes("- The big topic - The big topic.") && ahub.includes("## Parts\n\n- [[a-big-history]] — "), ahub);
t("Map: each part gets a row right after its parent's row, in table order", read(FX, "projects/p1.md").includes("| [[t-big]] | The big topic. |\n| [[t-big-lane-a-one]] | part: Lane A of the big topic with its first sub-lane and the… |\n| [[t-big-lane-a-two]] | part: The second sub-lane of lane A of the big topic. |\n| [[t-big-lanes-b-and-c]] | part: Lanes B and C of the big topic with the second actor and… |\n| [[t-other]] |") && read(FX, "projects/p1.md").includes("| [[a-big]] | The big actor. |\n| [[a-big-history]] | part: The history lane of the big actor in July 2026. |"), read(FX, "projects/p1.md"));
t("stamps: touched notes get updated_at and updated_by reorg@agent", read(FX, "actors/a2.md").includes('updated_by: "reorg@agent"') && read(FX, "actors/a2.md").includes("updated_at: 2026-10-04"));
const man = existsSync(MAN) ? readFileSync(MAN, "utf8") : "";
t("manifest: every touched note, the new parts, the specs' log and allowlist (no fleeting path)", ["topics/t-big.md", "topics/t-big-lane-a-one.md", "actors/a-big-history.md", "projects/p1.md", "discussions/d1.md", ".bedrock/reorg/ledger/batch-9-positional.md", ".bedrock/reorg/ledger/batch-9-allow.txt"].every((p) => man.includes(p)) && !man.includes("fleeting/"), man);
const allow = existsSync(ALLOW) ? readFileSync(ALLOW, "utf8") : "";
t("allowlist: one old => new line per rewrite", allow.split("\n").filter(Boolean).length === 2 && allow.includes("- Lane B decided everything (see Lane B below). => - Lane B decided everything (see Lane B in [[t-big-lanes-b-and-c]])."), allow);
const pos = existsSync(POS) ? readFileSync(POS, "utf8") : "";
t("positional log: a row per resolved line with its mark", (pos.match(/^\| T1 \|/gm) ?? []).length === 6 && (pos.match(/^\| A1fx \|/gm) ?? []).length === 1 && pos.includes("not positional"), pos.slice(0, 600));
const cs = run([CONSERVE, "--vault", FX, "--base", BASE, "--allow", ALLOW]);
t("conserve.ts: no base text lost (the two S10 rewrites allowlisted)", cs.code === 0 && /missing body lines: 0/.test(cs.out), cs.out.slice(-1500));
const ck = run([CHECK, "--vault", FX, "--strict", "--require", "b,c,d,g,i,j,k", "--json", join(ROOT, "ck.json")]);
t("check.ts: b c d g i j k pass on the split fixture (0 one-way, families and budgets clean)", ck.code === 0, ck.out.slice(-2000));
const ckj = existsSync(join(ROOT, "ck.json")) ? JSON.parse(readFileSync(join(ROOT, "ck.json"), "utf8")) : null;
t("check.ts: 4 parts in 2 families", ckj?.families?.parts === 4 && ckj?.families?.families === 2, JSON.stringify(ckj?.families));
const vf = run([SPLIT, "--vault", FX, "--spec", SPEC_T, "--spec", SPEC_A, "--verify"]);
t("verify: the G-post re-detection accounts for every trigger line", vf.code === 0 && /verify: OK/.test(vf.out), vf.out);
w(FX, "topics/t-big-lanes-b-and-c.md", read(FX, "topics/t-big-lanes-b-and-c.md").replace("Lane C text, later than B.", "Lane C text, later than B.\n\nAn unlogged pointer to the table below."));
const vf2 = run([SPLIT, "--vault", FX, "--spec", SPEC_T, "--spec", SPEC_A, "--verify"]);
t("verify: an unresolved positional line in a written part fails the re-detection", vf2.code === 1 && /UNRESOLVED topics\/t-big-lanes-b-and-c/.test(vf2.out), vf2.out);

// =====================================================================================================================
section("unit: decision 4(b) rewrite check");
{
  const D = join(ROOT, "fx-unit");
  buildFixture(D);
  writeFileSync(join(ROOT, "t-unit.json"), json(tSpec([])));
  const v = loadVault(D);
  const spec = loadSplitSpec(join(ROOT, "t-unit.json"), v);
  const ok = (o: string, n: string, d = "hub") => rewriteProblem(v, o, n, spec, d);
  t("4(b): a positional word becoming \"in [[part]]\" passes", ok("(see Lane B below).", "(see Lane B in [[t-big-lanes-b-and-c]]).") === null);
  t("4(b): \"below and in [[part]]\" passes", ok("kept below as bullets", "kept below and in [[t-big-lanes-b-and-c]] as bullets") === null);
  t("4(b): \"in [[a]], [[b]] and [[c]]\" passes", ok("is in the sections below.", "is in the sections in [[t-big-lane-a-one]], [[t-big-lane-a-two]] and [[t-big-lanes-b-and-c]].") === null);
  t("4(b): a rewrite that changes another word is refused", /removes more than positional words|adds more than/.test(ok("(see Lane B below).", "(read Lane B in [[t-big-lanes-b-and-c]]).") ?? ""), String(ok("(see Lane B below).", "(read Lane B in [[t-big-lanes-b-and-c]]).")));
  t("4(b): a link outside the family is refused", /not a note of this family/.test(ok("(see below).", "(see in [[t-other]]).") ?? ""));
  t("4(b): a link to the note the line lands in is refused", /the note the line itself lands in/.test(ok("(see below).", "(see in [[t-big-lane-a-one]]).", "topics/t-big-lane-a-one") ?? ""));
  t("4(b): a rewrite without a link is refused", /adds no \[\[note\]\] link/.test(ok("(see below).", "(see).") ?? ""));
}

// =====================================================================================================================
section("K candidates (4.7 K12-K25)");
{
  const D = join(ROOT, "fx-k");
  buildFixture(D);
  // both parts name the same memory file: the candidate is created as C5 lines when both have a free slot
  w(D, "topics/t-big.md", read(D, "topics/t-big.md").replace("A two text only.", "A two text only (memory `shared-lane-2026-09-24`)."));
  w(D, "actors/a-big.md", read(D, "actors/a-big.md").replace("nothing is below.", "nothing is below. Memory `shared-lane-2026-09-24`."));
  const sT = tSpec([]) as any;
  sT.named = [];
  sT.candidates = [{ id: "K99", a: "topics/t-big-lane-a-two", b: "actors/a-big-history", event: "shared lane" }];
  const sA = aSpec([]) as any;
  sA.named = [];
  const fT = join(ROOT, "k-t.json");
  const fA = join(ROOT, "k-a.json");
  writeFileSync(fT, json(sT));
  writeFileSync(fA, json(sA));
  const r = run([SPLIT, "--vault", D, "--spec", fT, "--spec", fA, "--plan"]);
  t("K candidate: created when both moved texts name the same memory file and both sides have a free slot", /K99 t-big-lane-a-two <-> a-big-history: CREATED \(evidence: memory shared-lane-2026-09-24/.test(r.out), r.out.match(/K99[^\n]*/)?.[0] ?? r.out.slice(-600));
  sT.candidates = [{ id: "K98", a: "topics/t-big-lanes-b-and-c", b: "actors/a-big-history", event: "no evidence" }];
  writeFileSync(fT, json(sT));
  const r2 = run([SPLIT, "--vault", D, "--spec", fT, "--spec", fA, "--plan"]);
  t("K candidate: skipped (text unchanged) without shared evidence", /K98 t-big-lanes-b-and-c <-> a-big-history: skipped \(no shared memory file or session id/.test(r2.out), r2.out.match(/K98[^\n]*/)?.[0] ?? "");
  sT.candidates = [{ id: "K97", a: "topics/t-big-lane-a-one", b: "topics/later-batch-part", event: "later batch" }];
  writeFileSync(fT, json(sT));
  const r3 = run([SPLIT, "--vault", D, "--spec", fT, "--spec", fA, "--plan"]);
  t("K candidate: a counterpart of a later batch is deferred, with the slot it keeps free", /K97 t-big-lane-a-one <-> later-batch-part: deferred .* so a slot stays free/.test(r3.out), r3.out.match(/K97[^\n]*/)?.[0] ?? "");
}

// ---- a counterpart an earlier batch created (4.7 "4 -> 5", K16 in batch 5): evaluated, never "deferred"
{
  /** an earlier batch split a1: a1-earlier is its part (part_of, the hub's Parts line, a Map row) */
  const withEarlierPart = (dir: string, opts: { sharedMemory: boolean; earlierOthers?: string }) => {
    buildFixture(dir);
    w(dir, "actors/a1.md", read(dir, "actors/a1.md").replace("> Actor one.\n", "> Actor one.\n\n## Parts\n\n- [[a1-earlier]] — The lane record of actor one.\n"));
    w(
      dir,
      "actors/a1-earlier.md",
      `---\ntype: actor\nname: "Lane record (Actor one)"\naliases: ["Actor one: Lane record"]\ndescription: "The lane record of actor one."\nstatus: "active"\nteam: ""\nsources: []\nupdated_at: 2026-10-01\nupdated_by: "reorg@agent"\ntags: ["type/actor", "status/active", "domain/a"]\npart_of: "[[a1]]"\n---\n\n# Lane record (Actor one)\n\n> The lane record of actor one. Part of [[a1]] (project [[p1]]).\n\n## Lane record\n\nThe record of the shared lane${opts.earlierOthers ?? ""} (memory \`shared-lane-2026-09-24\`).\n`,
    );
    w(dir, "projects/p1.md", read(dir, "projects/p1.md").replace("| [[a1]] | Actor one. |\n", "| [[a1]] | Actor one. |\n| [[a1-earlier]] | part: The lane record of actor one. |\n"));
    if (opts.sharedMemory) w(dir, "topics/t-big.md", read(dir, "topics/t-big.md").replace("A two text only.", "A two text only (memory `shared-lane-2026-09-24`)."));
  };
  const D = join(ROOT, "fx-k-earlier");
  withEarlierPart(D, { sharedMemory: true });
  git(D, "init", "-q", "-b", "brain-reorg-2026-10-03");
  git(D, "config", "user.name", "Fixture");
  git(D, "config", "user.email", "fixture@example.invalid");
  git(D, "config", "core.autocrlf", "false");
  git(D, "add", "-A");
  git(D, "commit", "-q", "-m", "base");
  const base = git(D, "rev-parse", "HEAD").trim();
  const pre0 = run([CHECK, "--vault", D, "--strict", "--require", "b,c,d,g,j,k"]);
  t("earlier-batch K candidate: the fixture with an existing part passes check.ts before the split", pre0.code === 0, pre0.out.slice(-1200));
  const fillD = (rel: string, list: any[]) => {
    const lines = read(D, rel + ".md").split("\n");
    return list.map((e) => ({ ...e, line: lines.indexOf(e.old) + 1 }));
  };
  const sT = tSpec(fillD("topics/t-big", S10_T)) as any;
  sT.candidates = [{ id: "K96", a: "topics/t-big-lane-a-two", b: "actors/a1-earlier", event: "earlier batch" }];
  const fT = join(ROOT, "ke-t.json");
  const fA = join(ROOT, "ke-a.json");
  writeFileSync(fT, json(sT));
  writeFileSync(fA, json(aSpec(fillD("actors/a-big", S10_A))));
  const r = run([SPLIT, "--vault", D, "--spec", fT, "--spec", fA, "--plan"]);
  t("earlier-batch K candidate: created when both texts name the same memory file and both have a free slot", /K96 t-big-lane-a-two <-> a1-earlier: CREATED \(evidence: memory shared-lane-2026-09-24; free slots 3 and 3; a1-earlier was created by an earlier batch\)/.test(r.out) && r.code === 0, (r.out.match(/K96[^\n]*/)?.[0] ?? "") + r.out.slice(-800));
  const before = snapshot(D);
  const man = join(D, ".bedrock/reorg/ledger/batch-9-paths.txt");
  const ap = run([SPLIT, "--vault", D, "--spec", fT, "--spec", fA, "--apply", "--date", "2026-10-04", "--manifest", man, "--allow", join(D, ".bedrock/reorg/ledger/batch-9-allow.txt")]);
  t("earlier-batch K candidate: apply succeeds", ap.code === 0, ap.out.slice(-1200) + ap.err);
  const earlierText = read(D, "actors/a1-earlier.md");
  const partText = read(D, "topics/t-big-lane-a-two.md");
  t("earlier-batch K candidate: the existing part gets a C5 line for the new part in ## Related Topics, and a stamp", /## Related Topics\n\n- \[\[t-big-lane-a-two\]\] — The second sub-lane of lane A of the big topic\.\n/.test(earlierText) && earlierText.includes("updated_at: 2026-10-04"), earlierText);
  t("earlier-batch K candidate: the new part gets a C5 line for the existing part", partText.includes("- [[a1-earlier]] — The lane record of actor one."), partText);
  t("earlier-batch K candidate: the existing part is in the manifest", readFileSync(man, "utf8").includes("actors/a1-earlier.md"), readFileSync(man, "utf8"));
  t("earlier-batch K candidate: nothing else of the existing part changed", diffSnap(before, snapshot(D)).includes("actors/a1-earlier.md") && earlierText.includes("The record of the shared lane (memory `shared-lane-2026-09-24`)."));
  const ck2 = run([CHECK, "--vault", D, "--strict", "--require", "b,c,d,g,i,j,k"]);
  t("earlier-batch K candidate: check.ts b c d g i j k pass after the apply (0 one-way)", ck2.code === 0, ck2.out.slice(-1500));
  const cs2 = run([CONSERVE, "--vault", D, "--base", base, "--allow", join(D, ".bedrock/reorg/ledger/batch-9-allow.txt")]);
  t("earlier-batch K candidate: conserve.ts finds no base text lost", cs2.code === 0 && /missing body lines: 0/.test(cs2.out), cs2.out.slice(-800));
  // no shared evidence: skipped, named as an earlier-batch counterpart, never deferred
  const s2 = tSpec([]) as any;
  s2.candidates = [{ id: "K95", a: "topics/t-big-lane-a-two", b: "actors/a1-earlier", event: "no evidence" }];
  const f2 = join(ROOT, "ke2-t.json");
  writeFileSync(f2, json(s2));
  const D2 = join(ROOT, "fx-k-earlier-2");
  withEarlierPart(D2, { sharedMemory: false });
  const r2 = run([SPLIT, "--vault", D2, "--spec", f2, "--spec", fA, "--plan"]);
  t("earlier-batch K candidate: skipped without shared evidence (reported, not deferred)", /K95 t-big-lane-a-two <-> a1-earlier: skipped \(no shared memory file or session id in the moved texts; a1-earlier was created by an earlier batch\)/.test(r2.out) && !/K95[^\n]*deferred/.test(r2.out), r2.out.match(/K95[^\n]*/)?.[0] ?? r2.out.slice(-600));
  // shared evidence, but the existing part already spends its 3 other slots: skipped for want of a slot
  const D3 = join(ROOT, "fx-k-earlier-3");
  withEarlierPart(D3, { sharedMemory: true, earlierOthers: " with [[a2]], [[c1]] and [[t-other]]" });
  const r3 = run([SPLIT, "--vault", D3, "--spec", f2, "--spec", fA, "--plan"]);
  t("earlier-batch K candidate: skipped when the existing part has no free other slot", /K95 t-big-lane-a-two <-> a1-earlier: skipped \(no free other slot \(t-big-lane-a-two 3, a1-earlier 0\); a1-earlier was created by an earlier batch\)/.test(r3.out), r3.out.match(/K95[^\n]*/)?.[0] ?? r3.out.slice(-600));
}

// =====================================================================================================================
section("static guards (A.0)");
{
  const src = readFileSync(SPLIT, "utf8");
  t("split.ts spawns no git command at all (no push, fetch or pull possible)", !/spawnSync\(\s*\[\s*["']git/.test(src) && !/\bgit\s+(push|fetch|pull)\b/.test(src.replace(/^\s*\/\/.*$/gm, "")));
  t("split.ts never reads .bedrock/config.json", !src.includes("config.json"));
  t("split.ts refuses to write a fleeting note", /refusing to write the fleeting note/.test(src));
}

rmSync(ROOT, { recursive: true, force: true });
console.log(`\n${pass} passed, ${fail} failed${fail ? "\nFAILED: " + failed.join("; ") : ""}`);
process.exitCode = fail ? 1 : 0;
