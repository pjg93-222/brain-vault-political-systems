// Fixture tests for relink.ts (plan section 10 batch 3 step 2, appendix A.5). Every fixture is a synthetic vault (a git
// repository) under os.tmpdir(), removed at the end; the real vault is never read or written. conserve.ts and check.ts are
// run on the fixture after relink.ts to prove that no text was lost and that the link model holds.
//   bun .bedrock/reorg/relink.test.ts        exit 0 = every test passes
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const HERE = import.meta.dir;
const RELINK = join(HERE, "relink.ts");
const CHECK = join(HERE, "check.ts");
const CONSERVE = join(HERE, "conserve.ts");
const ROOT = mkdtempSync(join(tmpdir(), "relink-tests-"));
const sha = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");

let pass = 0;
let fail = 0;
const failed: string[] = [];
function t(name: string, ok: boolean, detail = "") {
  console.log((ok ? "PASS  " : "FAIL  ") + name + (ok ? "" : "   " + detail.slice(0, 900)));
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
/** every file of a directory tree (relative path -> sha256), .git excluded */
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

// ---------------------------------------------------------------------------------------------------------------------
// the fixture vault

const fm = (o: Record<string, string>) => "---\n" + Object.entries(o).map(([k, v]) => `${k}: ${v}`).join("\n") + "\n---\n";
const STAMP = { updated_at: "2026-10-01", updated_by: '"import@agent"' };
function buildVault(dir: string) {
  const w = (rel: string, text: string) => {
    const p = join(dir, ...rel.split("/"));
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, text);
  };
  w("CLAUDE.md", "# Fixture\n\n## Domains\n\n- `domain/a` — the a rubric\n");
  w(
    "people/paul-goff.md",
    fm({ type: "person", name: '"Paul Goff"', focal_points: '\n  - "[[a1]]"', ...STAMP, tags: '["type/person", "domain/a"]' }) +
      "\n# Paul Goff\n\n> Owner of the fixture.\n\n## Working environment\n\n- Works on [[t-pend]] and [[p1]] daily.\n\n## Focal Points\n\n- [[a1]] - The a1 actor summary.\n\n## Projects\n\n- [[p1]] - P one summary.\n- [[p2]] - P two summary.\n\n## Active Topics\n\n- [[t-keep]] - T keep summary.\n- [[t-agree]] - T agree summary.\n- [[t-pend]] - T pend summary.\n\n## Discussions\n\n- [[d1]] - D one summary.\n",
  );
  w(
    "projects/p1.md",
    fm({ type: "project", name: '"Project One"', focal_points: '\n  - "[[paul-goff]]"', related_topics: '\n  - "[[t-keep]]"\n  - "[[t-pend]]"\n  - "[[t-other]]"', related_actors: '\n  - "[[a1]]"\n  - "[[a2]]"', ...STAMP, tags: '["type/project", "domain/a"]' }) +
      "\n# Project One\n\n> The first project.\n\n## Overview\n\nIndex note.\n\n## Focal Points\n\n| Person | Role |\n|---|---|\n| [[paul-goff]] | Owner. |\n\n## Related Topics\n\n| Topic | Relation |\n|---|---|\n| [[t-keep]] | T keep summary. |\n| [[t-pend]] | T pend summary. |\n| [[t-other]] | T other summary. |\n\n## Related Actors\n\n| Actor | Relation |\n|---|---|\n| [[a1]] | The a1 actor summary. |\n| [[a2]] | The a2 actor summary. |\n\n## Discussions\n\n- [[d1]] - D one summary.\n\n## Related Projects\n\n- [[p2]] - P two summary.\n",
  );
  w(
    "projects/p2.md",
    fm({ type: "project", name: '"Project Two"', focal_points: '\n  - "[[paul-goff]]"', ...STAMP, tags: '["type/project", "domain/a"]' }) +
      "\n# Project Two\n\n> The second project.\n\n## Focal Points\n\n| Person | Role |\n|---|---|\n| [[paul-goff]] | Owner. |\n\n## Related Topics\n\n| Topic | Relation |\n|---|---|\n| [[t-agree]] | T agree summary. |\n\n## Related Projects\n\n- [[p1]] - P one summary.\n\n## Timeline\n\nAfter the Map: stays a level-2 section.\n",
  );
  w(
    "topics/t-keep.md",
    fm({ type: "topic", title: '"T keep title"', people: '\n  - "[[paul-goff]]"', actors: '\n  - "[[a1]]"\n  - "[[a2]]"', ...STAMP, tags: '["type/topic", "domain/a"]' }) +
      "\n# T keep title\n\n> Rolling record that mentions [[a2]] in its tagline and [[p1]].\n\n## Context\n\nProse links [[a2|the a2 actor]] and [[a1]].\n\n## People Involved\n\n| Person | Role |\n|---|---|\n| [[paul-goff]] | owner |\n\n## Actors Involved\n\n| Actor | Relation |\n|---|---|\n| [[a1]] | main |\n| [[a2\\|A two]] | side |\n\n## Related Topics\n\n- [[t-pend]] - T pend summary.\n- [[t-other]] - T other summary.\n",
  );
  w(
    "topics/t-agree.md",
    fm({ type: "topic", title: '"T agree title"', people: '\n  - "[[paul-goff]]"', actors: '\n  - "[[a1]]"', ...STAMP, tags: '["type/topic", "domain/a"]' }) +
      "\n# T agree title\n\n> A working agreement of project [[p2]].\n\n## Context\n\nUses [[a1]] heavily; owned by [[paul-goff]].\n",
  );
  w(
    "topics/t-pend.md",
    fm({ type: "topic", title: '"T pend title"', people: '\n  - "[[paul-goff]]"', actors: '\n  - "[[a2]]"', ...STAMP, tags: '["type/topic", "domain/a"]' }) +
      "\n# T pend title\n\n> A topic waiting for its split, home [[p1]].\n\n## Context\n\nSee [[t-keep]] and [[t-other]]; discussed in [[d1]]; owner [[paul-goff]].\n\n## People Involved\n\n| Person | Role |\n|---|---|\n| [[paul-goff]] | owner |\n\n## Related Concepts\n\n- [[c-old]] - The old concept summary.\n\n## Related Topics\n\n- [[t-keep]] - T keep summary.\n",
  );
  // t-other is written with CRLF line endings: relink.ts writes LF
  w(
    "topics/t-other.md",
    (fm({ type: "topic", title: '"T other title"', ...STAMP, tags: '["type/topic", "domain/a"]' }) + "\n# T other title\n\n> Another leaf of [[p1]].\n\n## Context\n\nMentions [[t-keep]] and [[t-pend]].\n").replace(/\n/g, "\r\n"),
  );
  w(
    "discussions/d1.md",
    fm({ type: "discussion", title: '"D one title"', related_people: '\n  - "[[paul-goff]]"', related_projects: '\n  - "[[p1]]"', ...STAMP, tags: '["type/discussion", "domain/a"]' }) +
      "\n# D one title\n\n> The session that ruled on [[t-pend]].\n\n## Participants\n\n| Person | Role |\n|---|---|\n| [[paul-goff]] | owner |\n\nAlso [[a1]] was used.\n",
  );
  w(
    "actors/a1.md",
    fm({ type: "actor", name: '"A one"', description: '"The a1 actor."', ...STAMP, tags: '["type/actor", "domain/a"]' }) +
      "\n# A one\n\n> The a1 actor.\n\n## Details\n\nWorks with [[a3]].\n\n## Related Topics\n\n- [[t-keep]] - T keep summary.\n- [[t-agree]] - T agree summary.\n\n## Discussions\n\n- [[d1]] - D one summary.\n\n## Related Projects\n\n- [[p1]] - P one summary.\n\n## Related People\n\n- [[paul-goff]] - Owner.\n",
  );
  w(
    "actors/a2.md",
    fm({ type: "actor", name: '"A two"', description: '"The a2 actor."', ...STAMP, tags: '["type/actor", "domain/a"]' }) +
      "\n# A two\n\n> The a2 actor.\n\n## Related Topics\n\n- [[t-keep]] - T keep summary.\n- [[t-pend]] - T pend summary.\n\n## Related Projects\n\n- [[p1]] - P one summary.\n\n## Related Concepts\n\n- [[c-old]] - The old concept summary.\n",
  );
  w("actors/a3.md", fm({ type: "actor", name: '"A three"', ...STAMP, tags: '["type/actor", "domain/a"]' }) + "\n# A three\n\n> Untouched.\n\n## Details\n\nPaired with [[a1]].\n");
  w(
    "concepts/c-old.md",
    fm({ type: "concept", name: '"Old concept"', description: '"The old concept."', related_to: '\n  - "[[t-pend]]"', ...STAMP, tags: '["type/concept", "domain/a"]' }) +
      "\n# Old concept\n\n> The old concept.\n\n## Description\n\nOld.\n\n## Where it Applies\n\n- [[t-pend]] - T pend summary.\n- [[a2]] - The a2 actor summary.\n\n## Applied in\n\nNotes.\n",
  );
  w(
    "concepts/c-new.md",
    fm({ type: "concept", name: '"New concept"', aliases: '["the new concept"]', description: '"A new concept promoted by the batch."', related_to: "[]", sources: "[]", updated_at: "2026-10-04", updated_by: '"reorg@agent"', tags: '["type/concept", "domain/a"]' }) +
      "\n# New concept\n\n> A new concept promoted by the batch.\n\n## Description\n\nNew.\n\n## Where it Applies\n\n- [[t-keep]] — how it applies to t-keep\n- [[a1]] — how it applies to a1\n\n## Evidence\n\n- T agree title (plain title)\n",
  );
  w(
    "fleeting/f1.md",
    fm({ type: "fleeting", title: '"Capture"', status: "raw" }) + "\n# Capture\n\n> captured\n\n[[t-keep]] [[paul-goff]] [[t-pend]]\n",
  );
  w("index.md", "# Index\n");
  w("log.md", "# Log\n");
}
const SPEC = {
  leaves: {
    "topics/t-keep": { home: "projects/p1", keep: ["people/paul-goff", "actors/a1", "concepts/c-new"] },
    "topics/t-agree": { home: "projects/p2", keep: ["people/paul-goff"] },
    "topics/t-other": { home: "projects/p1", keep: ["concepts/c-new"] },
    "discussions/d1": { home: "projects/p1", keep: ["topics/t-pend"] },
  },
  paul: ["projects/p1", "projects/p2", "actors/a1", "topics/t-keep", "topics/t-agree"],
  named: [["discussions/d1", "topics/t-pend"]],
  concepts: {
    "c-new": { leaves: ["topics/t-keep", "topics/t-pend", "topics/t-other"], hubs: ["actors/a1", "actors/a2", "concepts/c-old"], projects: ["projects/p2"], why: { "topics/t-keep": "why the new concept matters to t-keep" } },
    "c-old": { projects: ["projects/p1"] },
  },
};

const FX = join(ROOT, "fx");
buildVault(FX);
git(FX, "init", "-q", "-b", "brain-reorg-2026-10-03");
git(FX, "config", "user.name", "Fixture");
git(FX, "config", "user.email", "fixture@example.invalid");
git(FX, "config", "core.autocrlf", "false");
git(FX, "add", "-A");
git(FX, "commit", "-q", "-m", "base");
const BASE = git(FX, "rev-parse", "HEAD").trim();
const specFile = join(ROOT, "keep.json");
writeFileSync(specFile, JSON.stringify(SPEC, null, 2));
const pendingFile = join(ROOT, "pending.txt");
writeFileSync(pendingFile, "topics/t-pend\n");
const manifest = join(ROOT, "manifest.txt");
writeFileSync(manifest, ".bedrock/reorg/ledger/batch-3-paths.txt\n");
const R = (...a: string[]) => run([RELINK, "--vault", FX, "--spec", specFile, ...a]);
const read = (rel: string) => readFileSync(join(FX, ...rel.split("/")), "utf8");

// ---------------------------------------------------------------------------------------------------------------------
section("relink 1: argument refusals");
{
  let r = R("--dry-run");
  t("1.1 refuses without --pending (plan A.5: batch 3 needs the pending file)", r.code === 1 && /--pending <pending-splits.txt> is required/.test(r.err), r.err);
  r = R("--pending", pendingFile, "--apply");
  t("1.2 --apply refuses without --manifest", r.code === 1 && /needs --manifest/.test(r.err), r.err);
  r = R("--pending", pendingFile, "--apply", "--maps", "--manifest", manifest);
  t("1.3 refuses two modes at once", r.code === 1 && /exactly one of/.test(r.err), r.err);
  r = R("--pending", pendingFile, "--no-pending", "--dry-run");
  t("1.4 refuses --pending together with --no-pending", r.code === 1 && /exclude each other/.test(r.err), r.err);
  const bad = (mut: (s: any) => void) => {
    const s = JSON.parse(JSON.stringify(SPEC));
    mut(s);
    const f = join(ROOT, "bad.json");
    writeFileSync(f, JSON.stringify(s));
    return run([RELINK, "--vault", FX, "--spec", f, "--pending", pendingFile, "--dry-run"]);
  };
  r = bad((s) => (s.leaves["topics/t-keep"].keep = ["people/paul-goff", "actors/a1", "concepts/c-new", "fleeting/f1"]));
  t("1.5 a keep target that is a fleeting note is refused [decision 1]", r.code === 1 && /fleeting note/.test(r.err), r.err);
  r = bad((s) => (s.leaves["topics/t-pend"] = { home: "projects/p1", keep: [] }));
  t("1.6 a keep.json leaf that is pending split is refused", r.code === 1 && /pending split/.test(r.err), r.err);
  r = bad((s) => (s.leaves["discussions/d1"].keep = []));
  t("1.7 a named pair whose keep.json side does not keep the other is refused (bidirectional model)", r.code === 1 && /does not keep topics\/t-pend/.test(r.err), r.err);
  r = bad((s) => (s.leaves["topics/t-keep"].keep = ["people/paul-goff", "actors/a1", "concepts/c-new", "topics/nope"]));
  t("1.8 a keep target that is not a note is refused", r.code === 1 && /topics\/nope is not a note/.test(r.err), r.err);
  r = bad((s) => (s.paul = ["projects/p1", "projects/p2", "actors/a1", "topics/t-keep"]));
  t("1.9 a leaf that keeps people/paul-goff while the paul list drops it is refused", r.code === 1 && /keeps people\/paul-goff, but the paul list does not keep topics\/t-agree/.test(r.err), r.err);
  r = bad((s) => (s.leaves["topics/t-other"].keep = []));
  t("1.10 a concept leaf whose keep list drops the concept is refused", r.code === 1 && /whose keep list does not keep concepts\/c-new/.test(r.err), r.err);
}

// ---------------------------------------------------------------------------------------------------------------------
section("relink 2: --dry-run writes nothing and predicts the whole batch");
const snap0 = snapshot(FX);
const outDir = join(ROOT, "predicted");
const dry = R("--pending", pendingFile, "--dry-run", "--date", "2026-10-04", "--out", outDir);
t("2.1 dry-run exits 0 (no spec error, no one-way link left, no disallowed pending edit)", dry.code === 0, dry.out + dry.err);
t("2.2 dry-run leaves every file of the vault byte-identical", diffSnap(snap0, snapshot(FX)).length === 0, diffSnap(snap0, snapshot(FX)).join(", "));
t("2.3 dry-run reports Paul 7 -> 5 out-links", /people\/paul-goff out-links: 7 -> 5 \(keep list 5\)/.test(dry.out), dry.out.slice(-3000));
t("2.4 dry-run reports 0 one-way links and 0 disallowed pending edits", /one-way links between curated notes after the run: 0/.test(dry.out) && /edits outside what 4.7 allows: 0/.test(dry.out), dry.out.slice(-2000));
t("2.5 dry-run flags the conversion on a tagline line", /\(TAGLINE LINE\)/.test(dry.out) && /on a tagline line: 1\)/.test(dry.out), dry.out.slice(-3000));
t("2.6 dry-run predicts check.ts numbers on the simulated tree (one-way 0, zero-incoming 0, check i ok with the pending t-pend reported, Paul outgoing 5)", /one-way 0; zero-incoming 0; leaves over budget 0 \(\+1 pending\); check i ok; people\/paul-goff outgoing 5/.test(dry.out), dry.out.slice(-1500));
t("2.7 dry-run --out saves the predicted text of the changed notes (and never a fleeting note)", existsSync(join(outDir, "topics", "t-keep.md")) && !existsSync(join(outDir, "fleeting")), readdirSync(outDir).join(","));
t("2.8 dry-run lists every touched note with its out-links", /== topics\/t-keep\.md  \[keep\.json leaf\]/.test(dry.out) && /== topics\/t-pend\.md  \[PENDING split\]/.test(dry.out) && /out-links 6 -> 4; home projects\/p1; others 3: actors\/a1, concepts\/c-new, people\/paul-goff/.test(dry.out), dry.out.slice(0, 3000));

// ---------------------------------------------------------------------------------------------------------------------
section("relink 3: --apply (keep lists, Paul, R2, concept lines)");
const ap = R("--pending", pendingFile, "--apply", "--manifest", manifest, "--date", "2026-10-04");
t("3.1 --apply exits 0", ap.code === 0, ap.out + ap.err);
const paul = read("people/paul-goff.md");
t("3.2 Paul: dropped links become titles (C1), kept links stay", paul.includes("- T pend title - T pend summary.") && paul.includes("- D one title - D one summary.") && paul.includes("- Works on T pend title and [[p1]] daily.") && paul.includes("- [[t-keep]] - T keep summary.") && paul.includes("- [[a1]] - The a1 actor summary."), paul);
t("3.3 Paul's frontmatter is unchanged apart from the stamp (focal point kept)", paul.includes('focal_points: \n  - "[[a1]]"') || paul.includes('  - "[[a1]]"'), paul.slice(0, 400));
const tk = read("topics/t-keep.md");
t("3.4 keep.json leaf: frontmatter C2 \"[[a2]]\" -> \"a2\", kept \"[[a1]]\" and Paul stay", tk.includes('  - "a2"') && tk.includes('  - "[[a1]]"') && tk.includes('  - "[[paul-goff]]"'), tk.slice(0, 500));
t("3.5 keep.json leaf: body C1 [[a2|the a2 actor]] -> display text, [[a2\\|A two]] in a table -> display text, [[t-pend]] -> its title", tk.includes("Prose links the a2 actor and [[a1]].") && tk.includes("| A two | side |") && tk.includes("- T pend title - T pend summary.") && tk.includes("- T other title - T other summary."), tk);
t("3.6 keep.json leaf: tagline wikilink converted, nothing else on the line changes", tk.includes("> Rolling record that mentions A two in its tagline and [[p1]]."), tk);
t("3.7 keep.json leaf: the concept line goes in a new ## Related Concepts before ## Related Topics, with the keep.json why", /## Related Concepts\n\n- \[\[c-new\]\] — why the new concept matters to t-keep\n\n## Related Topics/.test(tk), tk);
t("3.8 keep.json leaf: updated_at and updated_by stamped", tk.includes("updated_at: 2026-10-04") && tk.includes('updated_by: "reorg@agent"'), tk.slice(0, 600));
const tp = read("topics/t-pend.md");
t("3.9 pending topic: Paul links become plain text (people C2, table and prose C1)", tp.includes('  - "paul-goff"') && tp.includes("| Paul Goff | owner |") && tp.includes("owner Paul Goff."), tp);
t("3.10 pending topic: R2 on links to keep.json leaves that do not keep it (t-keep, t-other) ...", tp.includes("See T keep title and T other title;") && tp.includes("- T keep title - T keep summary."), tp);
t("3.11 ... while its other links stay (p1, a2, the named pair d1, c-old) and the concept line appends to its existing ## Related Concepts", tp.includes("home [[p1]]") && tp.includes('  - "[[a2]]"') && tp.includes("discussed in [[d1]]") && /- \[\[c-old\]\] - The old concept summary\.\n- \[\[c-new\]\] — A new concept promoted by the batch\.\n/.test(tp), tp);
const to = read("topics/t-other.md");
t("3.12 a CRLF note is written with LF endings", !to.includes("\r"), JSON.stringify(to.slice(0, 80)));
t("3.13 a leaf with no ## Related Topics gets its ## Related Concepts at the end", /Mentions T keep title and T pend title\.\n\n## Related Concepts\n\n- \[\[c-new\]\] — A new concept promoted by the batch\.\n$/.test(to), JSON.stringify(to.slice(-200)));
const d1 = read("discussions/d1.md");
t("3.14 keep.json discussion: drops Paul (related_people C2, participants C1) and a1, keeps the named pair", d1.includes('  - "paul-goff"') && d1.includes("| Paul Goff | owner |") && d1.includes("Also A one was used.") && d1.includes("ruled on [[t-pend]]"), d1);
const a1 = read("actors/a1.md");
t("3.15 hub R2: a1's links to t-agree and d1 (leaves that do not keep a1) become titles; t-keep and Paul stay", a1.includes("- T agree title - T agree summary.") && a1.includes("- D one title - D one summary.") && a1.includes("- [[t-keep]] - T keep summary.") && a1.includes("- [[paul-goff]] - Owner."), a1);
t("3.16 hub: the concept line goes in a new ## Related Concepts before ## Related Topics", /## Related Concepts\n\n- \[\[c-new\]\] — A new concept promoted by the batch\.\n\n## Related Topics/.test(a1), a1);
const a2 = read("actors/a2.md");
t("3.17 hub with an existing ## Related Concepts: the line is appended after the last item", /- \[\[c-old\]\] - The old concept summary\.\n- \[\[c-new\]\] — A new concept promoted by the batch\.\n$/.test(a2) && a2.includes("- T keep title - T keep summary."), a2);
const cn = read("concepts/c-new.md");
t("3.18 concept side: missing Where it Applies lines are added (t-pend, t-other, a2), the hub concept goes in a new ## Related Concepts at the end", cn.includes("- [[t-pend]] — T pend summary.") && cn.includes("- [[t-other]] — T other summary.") && cn.includes("- [[a2]] — The a2 actor summary.") && /## Related Concepts\n\n- \[\[c-old\]\] — The old concept summary\.\n$/.test(cn), cn);
const co = read("concepts/c-old.md");
t("3.19 the existing concept gets the reciprocal ## Related Concepts line (created at the end: no ## Related Topics)", /## Related Concepts\n\n- \[\[c-new\]\] — A new concept promoted by the batch\.\n$/.test(co), co);
t("3.20 the fleeting note is byte-identical [decision 1]", snap0.get("fleeting/f1.md") === sha(readFileSync(join(FX, "fleeting", "f1.md"))));
t("3.21 an untouched note (a3) is byte-identical (only notes that change are written)", snap0.get("actors/a3.md") === sha(readFileSync(join(FX, "actors", "a3.md"))));
t("3.22 log.md and index.md untouched", snap0.get("log.md") === sha(readFileSync(join(FX, "log.md"))) && snap0.get("index.md") === sha(readFileSync(join(FX, "index.md"))));
const man1 = readFileSync(manifest, "utf8").trim().split("\n");
t("3.23 the manifest gained every touched note once, never a fleeting path", man1.includes("topics/t-keep.md") && man1.includes("people/paul-goff.md") && man1.includes("topics/t-pend.md") && !man1.some((l) => l.startsWith("fleeting/")) && new Set(man1).size === man1.length && !man1.includes("actors/a3.md"), man1.join(" | "));

// ---------------------------------------------------------------------------------------------------------------------
section("relink 4: --maps (wrapper, rows, C6) and --reconcile");
const mp = R("--pending", pendingFile, "--maps", "--manifest", manifest, "--date", "2026-10-04");
t("4.1 --maps exits 0", mp.code === 0, mp.out + mp.err);
const p1 = read("projects/p1.md");
t("4.2 Map wrapper: ## Map + the intro sentence before the first Related section, Focal Points stays outside", /## Focal Points\n\n\| Person \| Role \|\n\|---\|---\|\n\| \[\[paul-goff\]\] \| Owner\. \|\n\n## Map\n\nEvery note of this project by type, one line each; parts follow their parent\.\n\n### Related Topics/.test(p1), p1);
t("4.3 Map: Related sections demoted one level, rows unchanged", p1.includes("### Related Actors") && p1.includes("### Discussions") && p1.includes("### Related Projects") && !/^## Related/m.test(p1) && p1.includes("| [[t-keep]] | T keep summary. |"), p1);
t("4.4 Map: a missing ### Related Concepts is created after ### Related Actors with the concept row (bullet format)", /\| \[\[a2\]\] \| The a2 actor summary\. \|\n\n### Related Concepts\n\n- \[\[c-old\]\] - The old concept summary\.\n\n### Discussions/.test(p1), p1);
const p2 = read("projects/p2.md");
t("4.5 Map in a project without Related Actors: ### Related Concepts after ### Related Topics; ## Timeline after the Map stays level 2", /\| \[\[t-agree\]\] \| T agree summary\. \|\n\n### Related Concepts\n\n- \[\[c-new\]\] - A new concept promoted by the batch\.\n\n### Related Projects/.test(p2) && /\n## Timeline\n/.test(p2), p2);
const co2 = read("concepts/c-old.md");
t("4.6 C6 back-link: the existing concept links its Map project under ## Where it Applies", /- \[\[a2\]\] - The a2 actor summary\.\n- \[\[p1\]\] — P one summary\.\n/.test(co2), co2);
const cn2 = read("concepts/c-new.md");
t("4.7 C6 back-link for the new concept's project", cn2.includes("- [[p2]] — P two summary."), cn2);
const rc = R("--pending", pendingFile, "--reconcile", "--manifest", manifest, "--date", "2026-10-04");
t("4.8 --reconcile finds 0 one-way links after --apply and --maps", rc.code === 0 && /reconcile pass 1: check.ts reports 0 one-way/.test(rc.out), rc.out + rc.err);
const ap2 = R("--pending", pendingFile, "--apply", "--manifest", manifest, "--date", "2026-10-04");
const mp2 = R("--pending", pendingFile, "--maps", "--manifest", manifest, "--date", "2026-10-04");
t("4.9 idempotent: a second --apply and --maps write nothing", /wrote 0 note\(s\)/.test(ap2.out) && /wrote 0 note\(s\)/.test(mp2.out), ap2.out.slice(-300) + mp2.out.slice(-300));

// ---------------------------------------------------------------------------------------------------------------------
section("relink 5: the result passes check.ts and conserve.ts");
const ck = run([CHECK, "--vault", FX, "--strict", "--require", "b,c,d,g,i,j,k", "--pending-splits", pendingFile, "--json", join(ROOT, "ck.json")]);
const cj = JSON.parse(readFileSync(join(ROOT, "ck.json"), "utf8"));
t("5.1 check.ts --strict (b c d g i j k) passes on the relinked fixture", ck.code === 0, ck.out.slice(-1500) + ck.err);
t("5.2 check c: 0 curated one-way links; the fleeting note's links are exempt", cj.oneWay.links === 0 && cj.oneWay.fleetingExempt >= 1, JSON.stringify(cj.oneWay));
t("5.3 check i: every keep.json leaf within budget; Paul has 5 outgoing links", cj.budget.over.length === 0 && cj.notes.find((n: any) => n.note === "people/paul-goff").outgoingLinks === 5, JSON.stringify(cj.budget.items));
t("5.4 check d: no curated note without a curated incoming link", cj.zeroIncoming.notes === 0, JSON.stringify(cj.zeroIncoming.items));
const cs = run([CONSERVE, "--vault", FX, "--base", BASE]);
t("5.5 conserve.ts: no base body line lost (C1 conversions, demoted headings, LF rewrite), no frontmatter key lost", cs.code === 0 && /conserve: OK/.test(cs.out), cs.out.slice(-1500) + cs.err);

// ---------------------------------------------------------------------------------------------------------------------
section("relink 6: reconcile resolves planted one-way links by R2 and R4 and reports the rest as spec errors");
{
  const co3 = read("concepts/c-old.md");
  writeFileSync(join(FX, "concepts", "c-old.md"), co3.replace("## Applied in\n\nNotes.", "## Applied in\n\nNotes; also [[t-agree]]."));
  const p2b = read("projects/p2.md");
  writeFileSync(join(FX, "projects", "p2.md"), p2b.replace("### Related Projects\n", "### Related Actors\n\n| Actor | Relation |\n|---|---|\n| [[a2]] | The a2 actor summary. |\n\n### Related Projects\n"));
  const r1 = R("--pending", pendingFile, "--reconcile", "--manifest", manifest, "--date", "2026-10-04");
  t("6.1 reconcile exits 0 after fixing both", r1.code === 0, r1.out + r1.err);
  t("6.2 R2: the concept's link to a keep.json leaf that does not keep it becomes its title", read("concepts/c-old.md").includes("Notes; also T agree title."), read("concepts/c-old.md"));
  t("6.3 R4: the actor listed in a Map links the project back under ## Related Projects", /- \[\[p1\]\] - P one summary\.\n- \[\[p2\]\] — P two summary\.\n/.test(read("actors/a2.md")), read("actors/a2.md"));
  const a1b = read("actors/a1.md");
  writeFileSync(join(FX, "actors", "a1.md"), a1b.replace("Works with [[a3]].", "Works with [[a3]] and [[a2]]."));
  const r2 = R("--pending", pendingFile, "--reconcile", "--manifest", manifest, "--date", "2026-10-04");
  t("6.4 a hub-to-hub one-way link no rule covers is a spec error: exit 1, nothing invented", r2.code === 1 && /actors\/a1 -> actors\/a2: no rule of R1-R4 covers it/.test(r2.out) && !read("actors/a2.md").includes("[[a1]]"), r2.out + r2.err);
  writeFileSync(join(FX, "actors", "a1.md"), a1b);
}

// ---------------------------------------------------------------------------------------------------------------------
section("relink 7: an edit outside plan 4.7 on a pending note is refused before anything is written");
{
  const FX2 = join(ROOT, "fx2");
  buildVault(FX2);
  // t-agree links and keeps the pending t-pend, which does not link it back: R3 would add a line to a pending note
  const ta = join(FX2, "topics", "t-agree.md");
  writeFileSync(ta, readFileSync(ta, "utf8").replace("owned by [[paul-goff]].", "owned by [[paul-goff]]; see [[t-pend]]."));
  const s = JSON.parse(JSON.stringify(SPEC));
  s.leaves["topics/t-agree"].keep = ["people/paul-goff", "topics/t-pend"];
  s.named.push(["topics/t-agree", "topics/t-pend"]);
  const f = join(ROOT, "pend-bad.json");
  writeFileSync(f, JSON.stringify(s));
  const before = snapshot(FX2);
  const r = run([RELINK, "--vault", FX2, "--spec", f, "--pending", pendingFile, "--apply", "--manifest", join(ROOT, "m2.txt")]);
  t("7.1 --apply refuses: an R3 line in a pending note is outside what 4.7 allows", r.code === 1 && /pending-split notes that plan 4\.7 does not allow/.test(r.err) && /topics\/t-pend\.md: (insert|create-section) \(R3/.test(r.err), r.err + r.out);
  t("7.2 nothing was written", diffSnap(before, snapshot(FX2)).length === 0, diffSnap(before, snapshot(FX2)).join(", "));
  const sp2 = JSON.parse(JSON.stringify(SPEC));
  sp2.leaves["topics/t-agree"].keep = ["people/paul-goff", "actors/a3"];
  const f2 = join(ROOT, "nolink.json");
  writeFileSync(f2, JSON.stringify(sp2));
  const r2 = run([RELINK, "--vault", FX2, "--spec", f2, "--pending", pendingFile, "--dry-run"]);
  t("7.3 a keep target the leaf does not link (and no concept wires) is a spec error: the plan adds no other link", r2.code === 1 && /keeps actors\/a3 but does not link it/.test(r2.err), r2.err + r2.out);
}

// ---------------------------------------------------------------------------------------------------------------------
section("relink 8: static guards (never push, never git-write, never touch fleeting/)");
{
  const src = readFileSync(RELINK, "utf8");
  t("8.1 relink.ts runs no git command at all", !/spawnSync\(\s*\[\s*"git"/.test(src) && !/"git"/.test(src));
  t("8.2 relink.ts never mentions push, fetch or pull as a command", !/\b(git\s+push|"push"|"fetch"|"pull")\b/.test(src));
  t("8.3 relink.ts refuses to write a fleeting note (guard present)", /refusing to write the fleeting note/.test(src));
}

rmSync(ROOT, { recursive: true, force: true });
console.log(`\n${pass} passed, ${fail} failed${fail ? ": " + failed.join("; ") : ""}`);
process.exit(fail ? 1 : 0);
