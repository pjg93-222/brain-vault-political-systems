---
type: project
name: "Brainlink (Project Brain, vault and Claude memory link)"
aliases: ["Brainlink", "brainlink"]
description: "Brainlink links the three record systems: the Project Brain is the ledger (constraints, decisions, dead ends, state), this vault is the map (people, actors, concepts, topics, discussions, links) and Claude memory holds pointers and working context. A standalone tool projects brain entries one-way into generated ledger/ notes and checks drift. First migration: the forecast / PAC accuracy records, 2026-10-05."
status: "active"
brain: "melange-systems-brain"
deadline: ""
progress: "As of 2026-10-05: design approved by Paul and the toolkit merged into the Project Brain repo (master 0bf2271; later merges fdaf012, 80a7638 and 08a2f55, master tip 08a2f55). First migration applied 2026-10-05: the 2026-10-01 forecast drafts are Project Brain entries D-089..D-092, D-093 (superseded by D-099, the blend) and DE-058..DE-064, the brainlink decisions are D-094..D-098 and DE-065, the brain STATE forecast bullet is corrected and five drift questions are recorded as open questions (the sixth item, the scheduled-task action, was superseded 2026-10-05). Folder-brain and pilot-brain are retired (D-102, D-103). The vault side (ledger/ exemption commit 2efd606 and the migration) is merged into the live vault as 59d1a9e (2026-10-05 10:46 -04:00); the Claude Code hooks (SessionStart sync, Stop throttled to one run per 600 s) and the daily task brainlink-daily (06:30) are wired. ~~The deferred second batch (this note, the forecast topic marks, the project-brain backlink) is on branch brainlink-batch2-2026-10-05 and is not merged.~~ Update 2026-10-08: batch 2 was merged into the live vault as 5d61224 (2026-10-05 11:03 -04:00) and batch 3 as e2d6e4d (12:14 -04:00) (source: git log of the live vault); the toolkit master tip is now 43da87f (git log of the Project Brain repo). The ledger notes for D-109..D-118 and the corrected hand-written forecast notes travel on branch brain-sync-2026-10-08-forecast, which replaces the earlier ledger PR #10; both await Paul's merge. Correction 2026-10-10: that branch was merged as vault PR #12 on 2026-10-08T23:35:20Z (merge commit 10d3fc4) and PR #10 is closed (gh pr view 12 and 10, read 2026-10-10)."
blockers: []
action_items:
  - description: "Merge branch brainlink-golive-2026-10-05 (vault commit 2efd606 ledger/ exemption and recall labels, then the 2026-10-05 migration commit) through Paul's normal vault PR flow; brainlink never runs git in the vault. Done 2026-10-05: merged into live main as 59d1a9e (Merge brainlink go-live, git log of the live vault)."
    status: "done"
    deadline: ""
    owner: "Paul Goff"
  - description: "~~Merge branch brainlink-batch2-2026-10-05 (deferred second batch: this project note, the forecast topic supersession marks, the project-brain backlink) with git merge --no-ff, then run the recall index; brainlink never runs git in the vault~~ — superseded 2026-10-08: merged as 5d61224 on 2026-10-05 11:03 -04:00 (batch 3 as e2d6e4d), per git log of the live vault"
    status: "done"
    deadline: ""
    owner: "Paul Goff"
  - description: "Answer the open drift questions ~~3,~~ 4, 5, 7 and 8 (listed in the brain STATE Open questions and in ledger/QUESTIONS.md). Dated note 2026-10-08: question 3 was closed by Paul's answers of 2026-10-07 (brain D-113); 4, 5, 7 and 8 stay open"
    status: "todo"
    deadline: ""
    owner: "Paul Goff"
  - description: "Merge the vault PR from branch brain-sync-2026-10-08-forecast (ledger notes D-109..D-118, DE-068, DE-069, STATE, QUESTIONS and the corrected hand-written forecast notes); it replaces the earlier ledger PR #10; brainlink never runs git in the vault. Done 2026-10-08: merged as vault PR #12 at 2026-10-08T23:35:20Z, merge commit 10d3fc4 (gh pr view 12, state MERGED, read 2026-10-10); PR #10 is closed."
    status: "done"
    deadline: ""
    owner: "Paul Goff"
  - description: "~~Decide whether the scheduled task score-pac-live-freeze-2026 (fires 2027-03-08T14:00Z) gains the D6 v5 scoring line; recorded in the brain STATE, not executed (F28 of the drift audit)~~ - superseded 2026-10-05: the task SKILL.md now scores the v3, v4, v5 and attempt 3 v6 lines (rulings D6 and E21), per the brain STATE supersession of F28 (brain commit a7c193c; source: the SKILL.md of score-pac-live-freeze-2026 and the 2026-10-05 PAC accuracy handoff section 6)"
    status: "done"
    deadline: "2027-03-08"
    owner: "Paul Goff"
focal_points:
  - "Paul Goff (vault owner)"
related_topics: []
related_actors:
  - "[[project-brain]]"
related_teams: []
sources:
  - {url: "file:///C:/Users/pgoff/OneDrive/Desktop/Project Brain/brainlink/README.md", type: "markdown", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brainlink\\README.md", sha256: "5042e7fdbe88166714f82123e677fd2e1c529ca42157bd6f426ff4f72c178a15"}
  - {url: "file:///C:/Users/pgoff/AppData/Roaming/Claude/scratch-workspaces/006ff0a7-6dcc-4dda-b723-6b48b4193c76/c655b422-2b14-405c-8ced-bbf2cd9c6822/scratch-2026-10-05-6c2408/brainlink-design.md", type: "manual", synced_at: "2026-10-05", path: "C:\\Users\\pgoff\\AppData\\Roaming\\Claude\\scratch-workspaces\\006ff0a7-6dcc-4dda-b723-6b48b4193c76\\c655b422-2b14-405c-8ced-bbf2cd9c6822\\scratch-2026-10-05-6c2408\\brainlink-design.md", sha256: "93bba5ce0d7e38c449d8aa31bc9ac0278c4629eba45900fc0d34839babfc96da"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brainlink-knowledge-system-2026-10-05.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brainlink-knowledge-system-2026-10-05.md", sha256: "ef4790fc0f31cacb17c13e4d01161adf8537dc3c4b9fceaffdc24b6869eef957"}
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/project", "status/active", "domain/platform"]
---

# Brainlink (Project Brain, vault and Claude memory link)

> Brainlink makes one knowledge system out of the Project Brain, this vault and Claude memory. A fact has exactly one owner; everywhere else it is a link or a generated mirror. The tool projects brain entries into `ledger/` notes one way, checks the three systems for drift and compiles the questions for Paul.

## Overview

- **Why:** the 2026-10-04 drift audit of the forecast / PAC accuracy records (34 facts compared with primary evidence) found stale, missing and contradictory records across the three systems, and nothing that checked them against each other. Its root causes include drafts numbered from a stale boot snapshot, memory that was appended to and never re-baselined, and a one-way paragraph copy of memory into this vault.
- **Design:** `brainlink-design.md` (design A, "the brain is the ledger, the vault is the map, memory holds pointers"; alternatives B and C were weighed and not chosen). Recorded in the Project Brain as [[ledger/melange-systems-brain/D-094|D-094]].
- **Where it lives:** the Project Brain toolkit repo `C:\Users\pgoff\OneDrive\Desktop\Project Brain`, folder `brainlink\` (toolkit master merge `0bf2271`; later merges `fdaf012`, `80a7638` and `08a2f55`, master tip `08a2f55`); machine-local settings in the git-ignored `brainlink\config.local.json`; the run log and latest findings in `brainlink\var\` (log_path `brainlink\var\brainlink.log`). `brainctl.py`, the brain entry schema and boot are unchanged.
- **Commands:** `brainlink.py project` writes the generated `ledger/<brain>/` notes and the project "Brain state" blocks; `check` is the read-only drift detector; `questions` writes `ledger/QUESTIONS.md`; `status` and `hook` serve the Claude Code hooks.

The original A/B/C design doc (brainlink-design.md) is lost; the README and brainlink.py are the current reference.

## Who owns what

| Record | Owner | Elsewhere |
|---|---|---|
| Constraints, decisions (including Paul's rulings), dead ends, project state and open questions | Project Brain (CONSTRAINTS, DECISIONS, DEADENDS, STATE) | generated `ledger/` note in this vault; memory may cite the ID only |
| People, actors, concepts, topics, discussions, the link graph | this vault | brain entries may name them, no copy |
| Results and metrics | the primary artefact file (cited by path and sha256) | the vault topic holds the narrative |
| Working context, feedback, user preferences, pointers | Claude memory | synced to `fleeting/` as before |
| Questions for Paul | `ledger/QUESTIONS.md` (generated) | answered in chat; the answer goes to the brain through brainctl |

## Decisions (Project Brain, recorded 2026-10-05)

- [[ledger/melange-systems-brain/D-094|D-094]]: design A, the ownership split above.
- [[ledger/melange-systems-brain/D-095|D-095]]: Paul's rulings are written to the brain at once through `brainctl decide` with his quote and a transcript reference; drafts never carry D-/DE- numbers (provisional keys such as `P-2026-10-05-<slug>`).
- [[ledger/melange-systems-brain/D-096|D-096]]: ledger notes reach GitHub only through Paul's normal vault PR flow (private repo `pjg93-222/brain-vault-political-systems`); brainlink never runs git in the vault; the secret scan fails closed.
- [[ledger/melange-systems-brain/D-097|D-097]]: vault tooling treats `ledger/` as generated, like `fleeting/` (vault commit `2efd606`, merged into the live vault in `59d1a9e`).
- [[ledger/melange-systems-brain/D-098|D-098]]: the brain repos' post-commit mirror push failures are logged to `.git/mirror-push-failures.log` and emitted to Glass Box (source `brainlink-mirror-hook`); push behaviour unchanged.
- Dead end [[ledger/melange-systems-brain/DE-065|DE-065]]: hard-coding D-/DE- numbers into drafts from a boot snapshot.
- [[ledger/melange-systems-brain/D-099|D-099]]: the current-cycle roster PAC projection blends the model with this cycle's pace (BLEND); it replaces D-093 (superseded 2026-10-05, source correction, decision unchanged); partially amended 2026-10-08 by [[ledger/melange-systems-brain/D-116|D-116]]: company PACs now use the panel nowcast R8 for the open cycle. [[ledger/melange-systems-brain/D-100|D-100]] and [[ledger/melange-systems-brain/D-101|D-101]] record PAC accuracy attempts 2 and 3; they belong to the accuracy lane, see [[forecast-redesign]].
- [[ledger/melange-systems-brain/D-102|D-102]] and [[ledger/melange-systems-brain/D-103|D-103]]: folder-brain and pilot-brain are retired (Paul, 2026-10-05T14:00:58Z, "Retire it (Recommended)"); brainlink ignores their staleness, their repos, mirrors and history are kept, nothing is deleted.
- Wiring (2026-10-05, from the wiring log and settings.json): a SessionStart hook runs `brainlink.py hook session-start`; a Stop hook runs `brainlink.py hook stop --min-interval-seconds 600` (the throttle is toolkit commit `8b27c3a`); the scheduled task `brainlink-daily` runs daily at 06:30. Brainlink never runs git in the vault and the vault Stop/session hooks are unchanged.
- The forecast / PAC records applied in the same migration: [[ledger/melange-systems-brain/D-089|D-089]], [[ledger/melange-systems-brain/D-090|D-090]], [[ledger/melange-systems-brain/D-091|D-091]], [[ledger/melange-systems-brain/D-092|D-092]], [[ledger/melange-systems-brain/D-093|D-093]] (BLEND; superseded 2026-10-05 by [[ledger/melange-systems-brain/D-099|D-099]] for source correction, decision unchanged) and DE-058..DE-064; see [[forecast-redesign]].

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none recorded |
| Progress | design approved and toolkit merged; first migration (forecast / PAC) applied 2026-10-05 in the Project Brain, memory and the vault; the go-live is merged as `59d1a9e`, hooks and the daily task are wired; ~~the second batch (`brainlink-batch2-2026-10-05`) awaits Paul's merge~~ (merged 2026-10-05 as `5d61224`, batch 3 as `e2d6e4d`; the 2026-10-08 sync branch `brain-sync-2026-10-08-forecast` awaits Paul's merge; correction 2026-10-10: it was merged as vault PR #12 on 2026-10-08T23:35:20Z, merge commit `10d3fc4`, per `gh pr view 12`) |

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Merge branch `brainlink-golive-2026-10-05` through the normal vault PR flow (merged 2026-10-05 as `59d1a9e`) | done | none | Paul Goff |
| ~~Merge branch `brainlink-batch2-2026-10-05` (deferred second batch), then run the recall index~~ — superseded 2026-10-08: merged as `5d61224` (batch 3 as `e2d6e4d`) | done | none | Paul Goff |
| Answer open drift questions ~~3,~~ 4, 5, 7, 8 (brain STATE, `ledger/QUESTIONS.md`; question 3 closed 2026-10-07 by D-113) | todo | none | Paul Goff |
| Merge the vault PR from branch `brain-sync-2026-10-08-forecast` (replaces PR #10). Done 2026-10-08: merged as vault PR #12 at 2026-10-08T23:35:20Z, merge commit `10d3fc4` (`gh pr view 12`: MERGED, read 2026-10-10) | done | none | Paul Goff |
| ~~Decide whether `score-pac-live-freeze-2026` gains the D6 v5 line (recorded, not executed)~~ - superseded 2026-10-05: its SKILL.md now scores v3, v4, v5 and v6 (brain commit `a7c193c`) | done | 2027-03-08 | Paul Goff |

> Action items are defined in the frontmatter (`action_items` field) to enable Dataview queries. The table above is a visualization for readability.

**Dataview query — pending items for this project:**

```dataview
TABLE WITHOUT ID
  item.description AS "Item",
  item.status AS "Status",
  item.deadline AS "Deadline",
  item.owner AS "Owner"
FROM "projects"
WHERE file.name = this.file.name
FLATTEN action_items AS item
WHERE item.status != "done"
SORT item.deadline ASC
```

## Focal Points

| Person | Role |
|---|---|
| Paul Goff | Vault owner; approved the design and the first migration; sole decision-maker. |

## Map

### Related Actors

| Actor | Relation |
|---|---|
| [[project-brain]] | The Project Brain toolkit and its `melange-systems-brain`: the ledger side of brainlink. |
| Glass Box (event stream) | Event sink: every brainlink run emits a Glass Box event. |

### Related Topics

- The forecast giving redesign topic and its lane parts (the forecast / PAC accuracy record) were the first migration; see [[forecast-redesign]].

### Related Projects

- [[forecast-redesign]] - the project whose stale lines were corrected by supersession in this migration.

## Timeline

| Date | Event |
|---|---|
| 2026-10-04 | Drift audit of the forecast / PAC records and the brainlink design written (`brainlink-design.md`) |
| 2026-10-05 | Design approved by Paul; toolkit merged into the Project Brain repo (`0bf2271`); first migration applied: brain entries D-089..D-098, DE-058..DE-065 and a corrected STATE, Claude memory supersession marks and the memory file `brainlink-knowledge-system-2026-10-05`, and this vault's supersession marks on branch `brainlink-golive-2026-10-05` |
| 2026-10-05 | Go-live merged into the live vault as `59d1a9e` (10:46 -04:00); Claude Code hooks wired (10:49 -04:00: SessionStart sync, Stop throttled to 600 s) and the daily task `brainlink-daily` created (10:50); folder-brain and pilot-brain retired (D-102, D-103); toolkit master now at `08a2f55` |
| 2026-10-05 | Batch 2 merged into the live vault as `5d61224` (11:03 -04:00) and batch 3 as `e2d6e4d` (12:14 -04:00) |
| 2026-10-07 | Ledger notes D-109..D-115 and the STATE ledger note committed on branch `brain-ledger-2026-10-07-forecast`; vault PR #10 opened, not merged |
| 2026-10-08 | Records repair: D-116..D-118 recorded, supersession marks on the brain STATE and DECISIONS (brain commit `19d7960`), the hand-written forecast notes corrected, the generated parts re-projected; branch `brain-sync-2026-10-08-forecast` replaces PR #10 |
| 2026-10-08 | Vault PR #12 (`brain-sync-2026-10-08-forecast`) merged at 23:35:20Z, merge commit `10d3fc4` (`gh pr view 12`; recorded 2026-10-10) |

Correction 2026-10-18 (`gh pr view 10`, 2026-10-18): vault PR #10 was closed without merging on 2026-10-08.

## Open items (recorded as questions, not facts)

- Drift questions ~~3,~~ 4, 5, 7 and 8 of the design (section 6) are open; their wording and sources are in the brain STATE Open questions. Dated note (2026-10-08): question 3 is closed: Paul answered its four parts on 2026-10-07 (brain D-113).
- ~~Whether the scheduled task `score-pac-live-freeze-2026` is to gain the D6 v5 line is open (recorded, not executed).~~ - superseded 2026-10-05: the task now scores v3, v4, v5 and v6 (brain STATE, commit `a7c193c`).
- Subjects of the drift questions (memory `brainlink-knowledge-system-2026-10-05`, added 2026-10-10): 3 = the four 2026-10-01 rebuild decisions a-d (closed 2026-10-07, see above); 4 = the canonical banking accuracy number, 2016 and the 90 bar; 5 = the methodology list A-L; 7 = the P&C/auto PAC rosters; 8 = the scope of each download authorisation.

## Operating rules and migration details (memory `brainlink-knowledge-system-2026-10-05`, added 2026-10-10)

- **Memory's role:** pointers and working context only. It may say "BLEND adopted, see D-099" (D-093, superseded by D-099 for source correction; the decision is unchanged); it may not restate a decision as its own fact, and may not claim "waits on Paul" without a brain open-question reference.
- **Running the tool:** run it from an exported copy (`git archive master brainlink`), not the live tree, because another agent may be switching branches there. Its run log and latest findings are `brainlink\var\brainlink.log` and `check-latest.json`; commands also include `hook stop|session-start`. brainctl, brain files and memory are never written by it; it never runs git in the vault and never deletes.
- **Corrections** are supersession marks (`~~old~~ - superseded <date>: <correct fact> (source: ...)`), never deletions; MEMORY.md lines are edited in place only.
- **Rulings at once (D-095):** when Paul rules in any lane, record it immediately with `brainctl decide`, quoting him and giving a transcript reference; brainctl assigns the ID at write time. Hand-numbered drafts collided with other lanes on 2026-10-01 (DE-065).
- **ID map of the forecast / PAC migration (Paul's rulings R1-R4, 2026-10-05):** old D-075 -> D-089 (the lane works locally), D-076 -> D-090 (non-giving receipts excluded), D-077 -> D-091 (integrity-ledger fixes), D-078 -> D-092 (cycle phase, trajectory, inflation), D-079 -> D-093 (BLEND; superseded by D-099 for source correction); old DE-054..DE-060 -> DE-058..DE-064. The brain's own D-079 is the unrelated system-manifest rebuild, so any "D-079 BLEND" in older notes means D-099.
- **R1:** BLEND still stands, ACTIVE (source: Paul's answer "Still stands", 2026-10-05T01:58:54.398Z, Claude Code session 2a1f8c4b-6c8d-4cc7-9241-449e010db5ef, transcript line 908; D-093 cited it as "task brief, this session"; corrected in D-099). **R3:** nothing from the 2026-10-01 model rebuild was published; the live pointer was then still refit-20260930-377f7324-c3f221343515, so "the blend now in production uses the rebuilt model" was wrong and is marked superseded where it appeared. The brain STATE forecast bullet was corrected (v2 published 2026-09-30T21:53:03Z, Mentat `e48c25b42`; the console clean-up and Sector Growth Study committed as `56519c628` and `04e2391e5`).
- **Why:** the 2026-10-04 drift audit of the forecast records found stale, missing and contradictory lines in all three systems (BLEND absent from the brain for four days, "waits on Paul" lines for things already done, a wrong production-blend claim copied from a diagnostic into memory and the vault).
- **How to apply:** record Paul's rulings in the brain at once and cite the ID instead of restating the decision; check a status claim against the brain STATE and primary evidence (git, pointer file, transcript) before copying it (`verify-dont-infer-completion-2026-08-04`); never run anthropic-skills:consolidate-memory over ledger-derived content (it merges and deletes). Brain bookkeeping itself is applied automatically since 2026-10-07 (rule 13 of the change-control working agreement).
- Not carried as current (superseded): the memory's "the vault branch `brainlink-golive-2026-10-05` is not merged" (merged as `59d1a9e`, see Action Items), its D6 v5 scheduled-task question (superseded 2026-10-05, above) and its "not yet marked in memory" note on `forecast-audit-lane-2026-09-29` (that memory now carries the 2026-10-05 supersession mark).

<!-- brainlink:state:begin -->
## Brain state (generated)

> Generated by brainlink from melange-systems-brain. Edit the brain with brainctl, not this block; hand-written text outside the markers is never touched.

- Brain: [[ledger/melange-systems-brain/STATE|melange-systems-brain STATE]]
- STATE last verified: 2026-10-27 21:55
- Open questions in STATE: 41; active decisions: 398; dead ends: 82

### Recent decisions
- [[ledger/melange-systems-brain/D-423|D-423]] — Contact inference v2: stopped at G1-top, line closed (2026-10-30)
- [[ledger/melange-systems-brain/D-422|D-422]] — Contact inference v2: amendment A4, waive A2 recall gate for G1 (Paul ruling 202
- [[ledger/melange-systems-brain/D-421|D-421]] — Briefs v3 review bar: block only unsupported claims and contradictions; keep it
- [[ledger/melange-systems-brain/D-420|D-420]] — Contact inference v2: amendment A3, extractor list/title fix plus stacked ensemb
- [[ledger/melange-systems-brain/D-419|D-419]] — Contact inference v2: amendment A2, tranche A pools in the 116th (proceed-on-def
<!-- brainlink:state:end -->
