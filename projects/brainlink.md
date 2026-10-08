---
type: project
name: "Brainlink (Project Brain, vault and Claude memory link)"
aliases: ["Brainlink", "brainlink"]
description: "Brainlink links the three record systems: the Project Brain is the ledger (constraints, decisions, dead ends, state), this vault is the map (people, actors, concepts, topics, discussions, links) and Claude memory holds pointers and working context. A standalone tool projects brain entries one-way into generated ledger/ notes and checks drift. First migration: the forecast / PAC accuracy records, 2026-10-05."
status: "active"
brain: "melange-systems-brain"
deadline: ""
progress: "As of 2026-10-05: design approved by Paul and the toolkit merged into the Project Brain repo (master 0bf2271; later merges fdaf012, 80a7638 and 08a2f55, master tip 08a2f55). First migration applied 2026-10-05: the 2026-10-01 forecast drafts are Project Brain entries D-089..D-092, D-093 (superseded by D-099, the blend) and DE-058..DE-064, the brainlink decisions are D-094..D-098 and DE-065, the brain STATE forecast bullet is corrected and five drift questions are recorded as open questions (the sixth item, the scheduled-task action, was superseded 2026-10-05). Folder-brain and pilot-brain are retired (D-102, D-103). The vault side (ledger/ exemption commit 2efd606 and the migration) is merged into the live vault as 59d1a9e (2026-10-05 10:46 -04:00); the Claude Code hooks (SessionStart sync, Stop throttled to one run per 600 s) and the daily task brainlink-daily (06:30) are wired. ~~The deferred second batch (this note, the forecast topic marks, the project-brain backlink) is on branch brainlink-batch2-2026-10-05 and is not merged.~~ Update 2026-10-08: batch 2 was merged into the live vault as 5d61224 (2026-10-05 11:03 -04:00) and batch 3 as e2d6e4d (12:14 -04:00) (source: git log of the live vault); the toolkit master tip is now 43da87f (git log of the Project Brain repo). The ledger notes for D-109..D-118 and the corrected hand-written forecast notes travel on branch brain-sync-2026-10-08-forecast, which replaces the earlier ledger PR #10; both await Paul's merge."
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
  - description: "Merge the vault PR from branch brain-sync-2026-10-08-forecast (ledger notes D-109..D-118, DE-068, DE-069, STATE, QUESTIONS and the corrected hand-written forecast notes); it replaces the earlier ledger PR #10; brainlink never runs git in the vault"
    status: "todo"
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
  - {url: "file:///C:/Users/pgoff/AppData/Roaming/Claude/scratch-workspaces/006ff0a7-6dcc-4dda-b723-6b48b4193c76/c655b422-2b14-405c-8ced-bbf2cd9c6822/scratch-2026-10-05-6c2408/brainlink-design.md", type: "markdown", synced_at: "2026-10-05", path: "C:\\Users\\pgoff\\AppData\\Roaming\\Claude\\scratch-workspaces\\006ff0a7-6dcc-4dda-b723-6b48b4193c76\\c655b422-2b14-405c-8ced-bbf2cd9c6822\\scratch-2026-10-05-6c2408\\brainlink-design.md", sha256: "93bba5ce0d7e38c449d8aa31bc9ac0278c4629eba45900fc0d34839babfc96da"}
updated_at: 2026-10-08
updated_by: "records-repair@agent"
tags: ["type/project", "status/active", "domain/platform"]
---

# Brainlink (Project Brain, vault and Claude memory link)

> Brainlink makes one knowledge system out of the Project Brain, this vault and Claude memory. A fact has exactly one owner; everywhere else it is a link or a generated mirror. The tool projects brain entries into `ledger/` notes one way, checks the three systems for drift and compiles the questions for Paul.

## Overview

- **Why:** the 2026-10-04 drift audit of the forecast / PAC accuracy records (34 facts compared with primary evidence) found stale, missing and contradictory records across the three systems, and nothing that checked them against each other. Its root causes include drafts numbered from a stale boot snapshot, memory that was appended to and never re-baselined, and a one-way paragraph copy of memory into this vault.
- **Design:** `brainlink-design.md` (design A, "the brain is the ledger, the vault is the map, memory holds pointers"; alternatives B and C were weighed and not chosen). Recorded in the Project Brain as [[ledger/melange-systems-brain/D-094|D-094]].
- **Where it lives:** the Project Brain toolkit repo `C:\Users\pgoff\OneDrive\Desktop\Project Brain`, folder `brainlink\` (toolkit master merge `0bf2271`; later merges `fdaf012`, `80a7638` and `08a2f55`, master tip `08a2f55`); machine-local settings in the git-ignored `brainlink\config.local.json`; the run log and latest findings in `brainlink\var\` (log_path `brainlink\var\brainlink.log`). `brainctl.py`, the brain entry schema and boot are unchanged.
- **Commands:** `brainlink.py project` writes the generated `ledger/<brain>/` notes and the project "Brain state" blocks; `check` is the read-only drift detector; `questions` writes `ledger/QUESTIONS.md`; `status` and `hook` serve the Claude Code hooks.

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
| Progress | design approved and toolkit merged; first migration (forecast / PAC) applied 2026-10-05 in the Project Brain, memory and the vault; the go-live is merged as `59d1a9e`, hooks and the daily task are wired; ~~the second batch (`brainlink-batch2-2026-10-05`) awaits Paul's merge~~ (merged 2026-10-05 as `5d61224`, batch 3 as `e2d6e4d`; the 2026-10-08 sync branch `brain-sync-2026-10-08-forecast` awaits Paul's merge) |

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Merge branch `brainlink-golive-2026-10-05` through the normal vault PR flow (merged 2026-10-05 as `59d1a9e`) | done | none | Paul Goff |
| ~~Merge branch `brainlink-batch2-2026-10-05` (deferred second batch), then run the recall index~~ — superseded 2026-10-08: merged as `5d61224` (batch 3 as `e2d6e4d`) | done | none | Paul Goff |
| Answer open drift questions ~~3,~~ 4, 5, 7, 8 (brain STATE, `ledger/QUESTIONS.md`; question 3 closed 2026-10-07 by D-113) | todo | none | Paul Goff |
| Merge the vault PR from branch `brain-sync-2026-10-08-forecast` (replaces PR #10) | todo | none | Paul Goff |
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

## Open items (recorded as questions, not facts)

- Drift questions ~~3,~~ 4, 5, 7 and 8 of the design (section 6) are open; their wording and sources are in the brain STATE Open questions. Dated note (2026-10-08): question 3 is closed: Paul answered its four parts on 2026-10-07 (brain D-113).
- ~~Whether the scheduled task `score-pac-live-freeze-2026` is to gain the D6 v5 line is open (recorded, not executed).~~ - superseded 2026-10-05: the task now scores v3, v4, v5 and v6 (brain STATE, commit `a7c193c`).

<!-- brainlink:state:begin -->
## Brain state (generated)

> Generated by brainlink from melange-systems-brain. Edit the brain with brainctl, not this block; hand-written text outside the markers is never touched.

- Brain: [[ledger/melange-systems-brain/STATE|melange-systems-brain STATE]]
- STATE last verified: 2026-10-08 13:32
- Open questions in STATE: 22; active decisions: 112; dead ends: 69

### Recent decisions
- [[ledger/melange-systems-brain/D-119|D-119]] — Company-PAC presidential uplift = +9%
- [[ledger/melange-systems-brain/D-118|D-118]] — Presidential-cycle uplift is a rule (company PACs included)
- [[ledger/melange-systems-brain/D-117|D-117]] — Giving by cycle: credit-union company PACs = panel's 16 PACs
- [[ledger/melange-systems-brain/D-116|D-116]] — Giving by cycle: company PACs on the panel nowcast, no 50/50
- [[ledger/melange-systems-brain/D-115|D-115]] — PAC panel: one-year IBIS lag, IBIS for ORIGIN only, 50/50, deploy
<!-- brainlink:state:end -->
