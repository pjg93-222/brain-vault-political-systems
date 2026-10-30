---
type: actor
name: "Project Brain toolkit"
aliases: ["Project Brain", "melange brain"]
category: "tool"
description: "Project Brain toolkit: Paul's hardened brainctl starter kit giving disposable AI sessions durable per-project memory (STATE/CONSTRAINTS/DECISIONS/DEADENDS), outside the Melange repo, with nested brain repos and post-commit mirrors."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain"
stack: "Python brainctl.py (brainctl starter kit) + markdown brain files, git (toolkit repo + nested brain repos under brains\\), bare mirrors in C:\\Users\\pgoff\\GitMirrors"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "boot-protocol-framework_3-DRAFT.md: v3 is DRAFT, v2 governs until Paul ratifies via DECISIONS"
  - "Post-commit mirror hooks are NOT versioned; re-create after any re-clone"
  - "Mechanical receipt-presence gate for Codex dispatches still only recommended"
  - "Cosmetic nits: Restore from git message on git-less brains; on-a-file says folder does not exist; status double-message when STATE absent; orphan-brain path if a toolkit template file is missing"
  - "Evaluation pilot (5-10 scorecarded sessions) defined in EVALUATION.md but not started"
  - "Carbonite coverage of the four new mirror folders unconfirmed (Paul to check green badge)"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/project-brain-toolkit-2026-08-11.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\project-brain-toolkit-2026-08-11.md", sha256: "426022161f53e4a6aecc7d7472449fde76a6aad9c364e0bff2ad7449ba129f02"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brains-on-every-session-2026-10-13.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brains-on-every-session-2026-10-13.md", sha256: "4252b6a61408f01bb1fd15e9a57853bfdf9fc29bbda6bd7502a674422b40f8db"}
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\DECISIONS.md"
    sha256: "03465b2f4d8dcc939859ac25f58b0ffbc1e3fb0ef0d98bf4beb85988ac1a92ec"
    as_of: "2026-10-05"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\DEADENDS.md"
    sha256: "eab24d528c5c44e80e882d069b9189ea11d9ae40442ce6f8ac5750cdea189f1a"
    as_of: "2026-10-05"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\CONSTRAINTS.md"
    sha256: "159b4a20292bc63474b824fc13711b8ea618deadce6b76a73cba1a6bd14dc3af"
    as_of: "2026-10-05"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brainctl.py"
    sha256: "24183aa183e80817eb36ed371f7a900c26ad4c6b33db1114921a24a1f94c68e5"
    as_of: "2026-08-11"
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# Project Brain toolkit

> The brainctl starter kit (from Paul's project-brain.zip), hardened with every Part-3 amendment of `boot-protocol-framework.md`, living at `C:\Users\pgoff\OneDrive\Desktop\Project Brain` as its own git repo fully outside Melange. The melange-systems brain is seeded and boots via CLAUDE.md; brains record decisions D-### and dead ends DE-###.

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\OneDrive\Desktop\Project Brain` (own git repo, fully outside Melange; built 2026-08-11, run run-20260811T2032536926854Z-9504fd764f, toolkit commit 34a773a) |
| Stack | brainctl (`python brainctl.py ...`), markdown brain files, nested git repos under `brains\` |
| Status | active |
| Criticality | medium |
| PCI | false |
| Team | none |

## Dependencies

- Serves [[melange-systems]] (the `melange-systems-brain` is seeded and boots via CLAUDE.md) and the parent topic Agent tooling stack.
- Depends on: the framework document `boot-protocol-framework.md` (copy lives in the repo), git, Python, the mirror bare repos at `C:\Users\pgoff\GitMirrors\<name>.git` (outside OneDrive, beside the Melange and glassbox-runtime mirrors), and OneDrive/Carbonite for backup (Carbonite coverage of the four new folders is Paul's to confirm).
- Codex lane coupling: the Codex receipt-omission class (5-for-the-day on 2026-08-11) led to the receipt-first preamble amendment; related memory `universal-lane-laws-2026-08-09`.

## Flows

- **What the hardening adds:** D-###/DE-### entry schemas with reversal conditions; supersession-never-deletion (`decide --supersedes` flips Status); 7-day `Last verified` staleness; boot confirmation that must cite a decision ID + dead-end ID; conflict precedence CONSTRAINTS > DECISIONS > STATE (contradictions halt); 500-line ARCHIVE/ compaction (manual only); protocol self-governance via DECISIONS.md; plus an EVALUATION.md scorecard/audit instrument (never read at boot).
- **Folder toggle (Paul-ratified 2026-08-11, commit a3ac26b):** `python brainctl.py on <folder>` / `off <folder>` writes/removes a managed block (exact markers `PROJECT-BRAIN:BEGIN/END`) in that folder's CLAUDE.md so Claude Code sessions there auto-boot from the brain; one sticky brain per folder (`.origin` provenance, sha256-8 collision fallback), auto-created under `brains\`; `off` removes only the block, byte-preserving the rest.
- **Writing to a brain (current rule, from 2026-08-12):** Claude may write into a brain's files and commit directly (brainctl `decide` / `deadend` / `skill` / `flush`, or editing STATE/CONSTRAINTS then `flush`). Entries must be accurate, sourced and reversible-by-supersession (never delete an entry, flip its Status); anything genuinely contentious goes to Paul as a question rather than into the file as a fact.
  - Dated correction (2026-10-05): brain D-095 restates the rule as "rulings are written to the brain at once": when Paul rules in any lane, the session records it immediately with `brainctl decide`, with his quote and a transcript reference, and drafts carry provisional keys, never D-numbers. Boot text or older notes that say sessions only "draft" for Paul's commit are stale (D-006 and D-095 govern).
- **Mirroring (2026-09-19):** after every commit, each repo's `.git/hooks/post-commit` pushes `--all` and `--tags` to its `mirror` remote (`|| true`, exit 0, so it can never fail or delay a brainctl commit).

## Dev Commands

```bash
python brainctl.py on <folder>      # write managed PROJECT-BRAIN:BEGIN/END block into the folder's CLAUDE.md
python brainctl.py off <folder>     # remove only the managed block
# brainctl subcommands named in the sources: decide (with --supersedes), deadend, skill, flush, scorecard
# Hook write recipe (BOM-less LF): [IO.File]::WriteAllText(..., UTF8Encoding($false))
```

## Known Issues

- `boot-protocol-framework_3-DRAFT.md` (commit 8f6cef9): **v3 is DRAFT, v2 governs until Paul ratifies via DECISIONS.**
- The post-commit mirror hook is NOT versioned - re-create it after any re-clone (BOM-less LF file written with `[IO.File]::WriteAllText(..., UTF8Encoding($false))`).
- Codex receipt-omission class hit 5-for-the-day (2026-08-11) and recurred twice in this build (ledger evts 189/190): the receipt-first preamble amendment landed on live main 14cde015d + user copy md5-synced, but prose is demonstrably weak; the durable fix is a MECHANICAL receipt-presence gate (recommend at next lane-law review).
- An adversarial review round adjudicated 13 fixes into a3ac26b (staleness robustness, output fidelity, fresh-brain "none yet" citation, etc.). Deferred nits from that round: missing-file tracebacks, the framework's inverted update-drafts ratio (Paul's call), init-on-file crash, EVALUATION exempt from line-count check, `on` against a nonexistent folder, deep-path git "Filename too long". The same-day close-out commit 33ffb02 (see History) then corrected the evaluation ratio and added the nonexistent-folder guard, friendly missing-file errors, the init-on-file error, an EVALUATION status row and `core.longpaths`; the cosmetic nits below remain.
- Remaining cosmetic nits after the close-out: "Restore from git" message on git-less brains, on-a-file says "folder does not exist", status double-message when STATE absent, orphan-brain path if a toolkit template file is missing.
- The evaluation pilot (5-10 scorecarded sessions, audits, pre-committed kill criteria) is defined in EVALUATION.md but not started.
- Whether Carbonite covers the four new folders is Paul's to confirm (green badge).

## The melange-systems brain's decision log (pointer; counts as of 2026-10-05)

The brain at `C:\Users\pgoff\OneDrive\Desktop\Project Brain\brains\melange-systems-brain\` is its own git repository (as of 2026-10-05: 220 commits, tip `27f3b4c` of 2026-10-04 22:56; on 2026-10-04 at 15:37: 218 commits, tip `81f6c99`; mirrored to `C:\Users\pgoff\GitMirrors`). Three of its files are the decision record this vault cites as D-### and DE-###; their entries are not copied here.

| File | Size and count | Entry format |
|---|---|---|
| `DECISIONS.md` | As of 2026-10-05: 752 lines; 87 entries D-001 to D-088 (D-044 absent), 86 ACTIVE and 1 SUPERSEDED, dated 2026-08-11 to 2026-10-04 (at tip `81f6c99`: 744 lines; 86 entries D-001 to D-087, 85 ACTIVE and 1 SUPERSEDED, dated to 2026-10-03) | `## D-### — Title`, then Date, Status, Decision, Context, Rationale, Reversal condition; append-only, and a reversal only flips Status |
| `DEADENDS.md` | 501 lines; 57 entries DE-001 to DE-057 (DE-028 and DE-029 have colon headings and no Date line), dated 2026-08-12 to 2026-10-03 | `## DE-### — Title`, then Date, Approach, Failure mode, Root cause, Would reconsider if |
| `CONSTRAINTS.md` | 199 lines; sourced invariants in six groups: Data, Definitions, Tooling, Audience, Claims, Never do | one constraint per bullet, each ending with its source |

Dated recount (2026-10-05, after the attempt-3 PAC accuracy records; counts read from the files on disk): `DECISIONS.md` 872 lines, 102 entries D-001 to D-103 (D-044 absent), 100 ACTIVE and 2 SUPERSEDED (D-026 by D-028 and D-093 by D-099), dated 2026-08-11 to 2026-10-05; `DEADENDS.md` 572 lines, 67 entries DE-001 to DE-67, dated 2026-08-12 to 2026-10-05; `CONSTRAINTS.md` 214 lines. The repository has 251 commits, tip `eb1de83` of 2026-10-05 10:35. The entries added since the counts above include D-088 (attempt-3 rulings E1-E18), D-089 to D-092 and D-099 (the 2026-10-01 forecast decisions applied on 2026-10-05, D-099 being the blend, which an earlier draft numbered D-079), D-094 to D-098 (brainlink and brain-mirror decisions), D-100 and D-101 (PAC accuracy attempt 2, and attempt 3's v6 method and results), D-102 and D-103 (folder-brain and pilot-brain retired), DE-058 to DE-065 (forecast-lane and brain-practice dead ends), DE-066 (the PAC giving ORIGIN dead end) and DE-067 (which narrows DE-066). The recount of uncited entries below was not redone after this batch; the forecast notes now cite D-088, D-099, D-100, D-101, DE-066 and DE-067.

**How to query it.** brainctl has no search command. `python brainctl.py boot <brain>` prints the whole boot bundle (BOOT, STATE, CONSTRAINTS, DECISIONS, DEADENDS and the skills index) to stdout, and `python brainctl.py status <brain>` reports the `Last verified` age (warning after 7 days), each core file's line count (warning above 500 lines) and uncommitted changes. To read one entry, search its heading in the brain folder, for example `rg -n -A8 "^## D-042 " DECISIONS.md` or `rg -n -A6 "^## DE-021 " DEADENDS.md`. `decide` and `deadend` append new entries.

**Entries no vault note cites (checked 2026-10-04, before the document import of that date).** 51 of 143: decisions D-001, D-002, D-003, D-004, D-008, D-009, D-011, D-012, D-014, D-016, D-017, D-020, D-021, D-024, D-035, D-045, D-046, D-053, D-054, D-055, D-056, D-066, D-067, D-068, D-069, D-071, D-072, D-073, D-077, D-078, D-079 (31), and dead ends DE-002, DE-003, DE-005, DE-006, DE-007, DE-008, DE-009, DE-010, DE-013, DE-014, DE-017, DE-019, DE-025, DE-027, DE-031, DE-037, DE-038, DE-049, DE-050, DE-052 (20). Some are covered by paraphrase without the ID (for example the forecast decisions D-066 to D-069 in the forecast-redesign project). The other notes added by the 2026-10-04 import cite D-020, D-024, D-035 and D-068; the remaining 47 appear in this vault only in this list. Recount 2026-10-05 (same method: explicit IDs in the notes other than this one; the brain now has D-001 to D-088 without D-044 and DE-001 to DE-057, 144 entries): 46 are cited by no other note, 26 decisions and the same 20 dead ends. D-079 is now cited (by the forecast-redesign project, the forecast topic and its six-year-lookback part), so the decisions above lose D-020, D-024, D-035, D-068 and D-079; D-088 counts as cited, because those three notes name it as the lowest new ID.

Dated correction (2026-10-05): the notes cited "D-079" and "D-088 or later" for the blend. The blend is brain D-099 (first applied as D-093, superseded by D-099 for a source correction), and the 2026-10-04 handoff's "D-079 BLEND" label collides with the brain's own D-079, the system manifest inventory; D-088 holds Paul's attempt-3 rulings E1-E18 (E19-E24 are in D-101). The brain's DE-065 records the cause: numbers hard-coded into drafts from a boot snapshot collide with entries other lanes write, because brainctl allocates the next number only at write time.

## Standing rules and decisions

- **Why Project Brain exists:** Paul wants durable per-project memory for disposable AI sessions, with himself as sole owner.
- **Ratified 2026-08-11:** location = Desktop; toolkit + empty pilot brain (`brains\pilot-brain`, commit 1ce7347, project unnamed - Paul seeds STATE/CONSTRAINTS); brainctl scope = full hardening incl. `scorecard`.
- ~~Original rule (2026-08-11): sessions DRAFT updates; only Paul runs brainctl and commits - draft text and hand it to Paul, never write.~~ **SUPERSEDED 2026-08-12, Paul: "yes that override stands going forward" (brain D-006).** The original rule is RETIRED; do not re-propose it or ask permission per-commit. First exercise of the override: the melange-systems brain seed, commit 2026-08-12 12:09. (Still-standing contradiction noted in the QME lane: D-006 contradicts CLAUDE.md on who commits the brain.)
- Brains are nested git repos under `brains\`; the toolkit's .gitignore keeps them out of the toolkit repo - don't "fix" that.
- Framework Phase-1 backfill (a Melange-seeded brain) was offered, not chosen - don't re-propose unprompted.

## History

| Date | Event |
|---|---|
| 2026-08-11 | Built (run run-20260811T2032536926854Z-9504fd764f, toolkit commit 34a773a); pilot brain commit 1ce7347; folder toggle a3ac26b with 13 adjudicated review fixes. |
| 2026-08-11 | One-shot close-out (Paul: "Finish it all"): 33ffb02 (evaluation ratio corrected to drafts / events + 5 robustness fixes: nonexistent-folder guard, friendly missing-file errors, init-on-file error, EVALUATION status row, `core.longpaths`) and 8f6cef9 (`boot-protocol-framework_3-DRAFT.md`). Receipt-first preamble amendment on live main 14cde015d. |
| 2026-08-12 | Direct-commit override stands ("yes that override stands going forward"); melange-systems brain seed commit 12:09. |
| 2026-09-19 | MIRRORED (Paul: "set up the brain mirror", brain D-058): the toolkit and all three brains (`melange-systems-brain`, `folder-brain`, `pilot-brain`) each have remote `mirror` -> `C:\Users\pgoff\GitMirrors\<name>.git` (toolkit = `project-brain.git`), bare, outside OneDrive. Verified: heads equal and fsck clean on all four, and a live brainctl commit moved the mirror's master by itself. |
| 2026-10-05 | Brain records for PAC accuracy: D-100 (attempt 2), D-101 (attempt 3, v6 method and results), DE-066 and DE-067 (the ORIGIN dead end and its narrowed successor), and a STATE bullet; D-102 and D-103 retire folder-brain and pilot-brain (their repos and mirrors are kept). The History row of 2026-09-19 above lists all three brains as mirrored: that was true then. |
| 2026-09-30 / 2026-10-01 | QME lane appends brain entries: D-070 to D-074 / DE-051 to DE-053 (F6 recovery), D-075 to D-081 and DE-054/055 committed as 02de571 (outcomes PENDING). |

## Related Actors

- [[brain-vault-political-systems]] - Separate Obsidian + Bedrock knowledge vault (not the brainctl toolkit); the two "brain" systems are distinct

## Related Topics

- Agent tooling stack - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.
- [[2026-07-feature-agent-tooling-stack-project-brain-toolkit]] — The Project Brain toolkit: durable per-project memory for disposable AI sessions, where since Paul's 2026-08-12 override (brain D-006) Claude may run brainctl and commit brain entries directly; the draft-only rule is retired.

## Related Concepts

- [[boot-protocol-evaluation-framework]] — the governing v2 framework this toolkit implements: entry schemas, staleness and compaction, the session scorecard, four integrity audits and the kill criteria.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
- [[brainlink]] - the project that links this brain (the ledger) with the vault (the map) and Claude memory; generated `ledger/melange-systems-brain/` notes mirror its entries one way.

Update 2026-10-30: On 2026-10-13 Paul made booting the project brain the first action of every session (brainctl boot, then confirming the Obsidian vault is live and its SessionStart brainlink line does not say FAILED), with any boot failure reported in the first reply instead of being skipped.
