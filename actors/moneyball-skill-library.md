---
type: actor
name: "Moneyball skill library"
aliases: ["16-skill library"]
category: "tool"
description: "The Moneyball/Melange project skill library: 16 skills built 2026-07-09/10 for cheaper sessions to maintain the project, grown to 20 by 2026-09-30; locations, build provenance, gitignore/merge-debt history and the 2026-09-30 stale-fact refresh."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\.claude\\skills\\"
stack: "Claude Code skills (markdown SKILL.md per skill + README.md index), 3 shipped read-only scripts, rollover_gate_check.py"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "D5 unanswered: is Highly Persuadable 0.65 ratified?"
  - "D4: stale line refs deferred to a spawned chip (Refresh stale line refs in skill library); precondition met"
  - "W4 last-measured lines still cite 247/2 (09-20) and 559/9 (09-19); update only after a clean full protocol run"
  - "Report-only findings open: reversed-index reads, rollover_gate_check.py reads root congestion.json, PRESS_BASELINE_FOLD=0, root README.md still 84/136, lt_priming.py:115 rounding, holistic_norm directed-config caveat"
  - "LIVE protocol at b7faf6344 was PARTIAL (chain not run, audit crashed on stale sentinel-admissions gate); later completed by the 2026-10-01 refresh"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/skill-library-stale-facts-lane-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\skill-library-stale-facts-lane-2026-09-30.md", sha256: "968157b79dc19a455f99b02d216a70f1103481e87b842c22aa3fb778e3333469"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/skills-library-2026-07-10.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\skills-library-2026-07-10.md", sha256: "c0b2ca636cff6d9f41c8574737ca7e3c699a94ccba1742e0eedc57b231eb8b2d"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# Moneyball skill library

> The Melange project skill library: 16 skills built 2026-07-09/10 (retirement handoff, Paul-directed) so cheaper (Sonnet-class) sessions can maintain and advance [[melange-systems]]; `change-control` is the constitution. Stale-fact refresh landed on LIVE main b7faf6344 on 2026-09-30.

## Details

| Field | Value |
|---|---|
| Repository | LIVE tree `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\.claude\skills\` (durable copy) AND worktree nifty-cray-f6d053 `.claude/skills/` (authoring copy), + `README.md` index |
| Stack | Markdown skills (SKILL.md each), 3 shipped read-only scripts (rank_delta, artifact_freshness, env_dials) in diagnostics-and-tooling, `rollover_gate_check.py` (has `--online`) in congress-rollover-campaign |
| Status | active |
| Criticality | medium |
| PCI | false |
| Team | none |

## Dependencies

- Parent topic: [[2026-07-feature-agent-tooling-stack]]. Consumed by every Melange session (load the relevant skill before working; change-control before ANY change).
- Sibling: [[quant-model-evaluation-skill]] (the 20th skill, Paul's c13f3a5d4; used after moneyball-change-control for any model/number/claim evaluation; user-level junction `C:\Users\pgoff\.claude\skills\quant-model-evaluation` -> LIVE copy, so Melange sessions may list it twice).
- Depends on the LIVE tree and git state of [[melange-systems]] (branch/merge claims, ledgers, audit/kernel baselines are encoded in the skills and go stale).
- Related memories: `psych-audit-2026-07-09`, `dont-drop-context-anchor-memory`, `ask-before-substantive-changes`, `scout-census-traps-2026-09-13`, `review-in-fable-directive-2026-09-16`.

## Flows

- **Load before work:** the relevant skill first; `change-control` before ANY change.
- **Build process (2026-07-09/10):** 14-map discovery workflow -> 16 parallel authors (ground-truth re-verification mandatory) -> factual / doctrine / usability reviewers (2 blocking + 11 important findings, all fixed) -> fixer -> orchestrator spot-checks + a coop_v2 / round-6 freshness fix pass.
- **Why it exists:** cheaper sessions (Sonnet-class) must maintain/advance the project. Paul's calibrations: audience assumes NEITHER domain nor stats; SOTA = methods rigor AND real-world capability; hardest live problem = 120th-Congress rollover (`congestion.json` has NO live producer - builders attic'd, FEC zips 2024-vintage).

## Dev Commands

None recorded. (Only git operations are named: `git add` for tracking, `git log main..<branch>` = empty for every branch after the 2026-07-10 merge, `git diff` of LIVE vs mirror. The refresh protocol commands are in the stale-fact section below.)

## Known Issues

- D5 (is Highly Persuadable 0.65 ratified?) still unanswered by Paul.
- D4 = stale line refs deferred to a spawned chip ("Refresh stale line refs in skill library"); its precondition, the batch on main, is now met.
- Report-only findings still open (2026-09-30): reversed-index reads in tpl flipRoute (about :968-970) / distToTarget (about :729) / `make_member_desk.py:2931` + desk tpl:451; `rollover_gate_check.py` reads root `congestion.json` (now data\engine\); `PRESS_BASELINE_FOLD=0` set at Paul's user level; root README.md still 84/136; `lt_priming.py:115` tiny-gap rounding vs audit gap>0; holistic_norm directed-config caveat for C1.
- W4 last-measured lines still cite 247/2 (09-20) and 559/9 (09-19) - update only after a clean full protocol run.

## The 16 original skills (built 2026-07-09/10)

1. change-control (the constitution, all 18 project laws embedded as written law per Paul)
2. architecture-contract
3. build-and-env
4. run-and-operate
5. config-and-flags (about 88 dials)
6. debugging-playbook
7. diagnostics-and-tooling (+3 shipped read-only scripts: rank_delta / artifact_freshness / env_dials)
8. validation-and-qa
9. failure-archaeology
10. influence-modeling-reference
11. psychometrics-reference
12. research-methodology
13. proof-and-analysis-toolkit
14. docs-and-claims (owns the validated-claims ledger + live-branch-state statements)
15. congress-rollover-campaign (+`rollover_gate_check.py`, has `--online`)
16. research-frontier

By 2026-09-30 the README lists 20 skills (fixed from a mid-lane mismatch "20 rows under 19" after Paul's c13f3a5d4 quant-model-evaluation skill landed on main).

## History

- 2026-07-09/10: 16-skill library built (retirement handoff, Paul-directed). ~~Gitignore caveat: `.claude/*` is ignored (line 28), so the library was ON DISK ONLY; to track add `!.claude/skills/` + `!.claude/skills/**` after the `!.claude/commands/*.md` block, then `git add`; Paul's call.~~ Superseded the same afternoon.
- **2026-07-10 afternoon (Paul: "merge and integrate - do it"): merge debt CLEARED + library IN GIT.** ALL branches fully merged into main:
  - compassionate-ellis @5e63c97 (kill-ledger preregs)
  - musing-swirles @4f7007d (9 parse fixes)
  - magical-booth @2ce51c5 (7 HIGH fixes; conflicts resolved: `b5_behavioral_instrument` = main's version per documented rule, `audit_full` = BOTH check families, so **audit now 71**)
  - clever-elbakyan @02a36ac (Vote Smart TIER-5 RESULT + a NEW user-directed MS NOW/ex-MSNBC transcript leg @9467fcc)
  - beautiful-hermann + audit/fixes-2026-07-10 merged earlier by a parallel session
  - Post-merge verification ALL GREEN: kernel 37/37, chain 9.8 min (coop_v2_candidate now in-chained), **ranks md5 UNCHANGED cce0c5a6 (0 moved)**, audit **71/71** twice.
  - Library committed to main @b994d93 (gitignore keep rules added; 21 files tracked); all about 34 branch-caveat rows in the skills updated to merged-state. `git log main..<branch>` = empty for every branch.
- 2026-09-30: stale-fact lane (below).

## Stale-fact lane 2026-09-30 (COMMITTED and LANDED in LIVE: main b7faf6344, mirror current)

- **State (2026-09-30 about 15:35Z):** lane commits
  - 49c7f994e (lt_priming + tpl prime() read P[u][v])
  - 8bd27a991 (`outcome_snapshot --freeze` -> data\engine)
  - 5ab841fd5 (scenario/optimize comments)
  - 61325d2b8 (env_dials recursive + PLATFORM)
  - e8aaecb5d (skill-library corrections)
  - merge 2b2d72578 (main had gained Paul's c13f3a5d4 quant-model-evaluation skill mid-lane; README then listed 20 rows under "19")
  - b7faf6344 (README = 20 skills)
  - LIVE main fast-forwarded c13f3a5d4 -> b7faf6344 (24 files, all already CRLF, LIVE copies clean first); mirror main + branch = b7faf6344.
- **Paul's rulings:** 2026-09-30 "Go ahead with your recommendations on D1-D4" / "Fix the defects" / "Commit it and run the protocol in LIVE". D5 (is Highly Persuadable 0.65 ratified?) still unanswered. D4 = stale line refs deferred to a spawned chip ("Refresh stale line refs in skill library"; its precondition, the batch on main, is now met).
- **LIVE protocol at b7faf6344 = PARTIAL** (no lane-caused red):
  - Kernel 256 passed / 4 FAILED in 52 min: standing reds `test_bill_collision_guards` + `test_make_staffer_network_html`, plus `test_per_area_board` (9 errors, all "sentinel admissions are outside their freshness window") and `audit_stale_imports` (5 hits in files this lane never touched: 3 UNTRACKED press-recovery files dated 2026-09-21 - `fec/collect/recover_press_refresh.py`, `fec/tests/collect/test_press_recovery_speed.py`, `test_press_source_extract.py` - and `fec/tests/surfaces/test_clean_workspace_loading.py` from 6702a5452).
  - Chain NOT RUN: steps 12-14 fail-close on `data/legislation/sentinel_admissions.json` (mtime 2026-09-13, 8-day window, `sentinel_admissions.py:24,33-34`; refresh = PAID claude-cli step, Paul's spend + model ruling N19, script `refresh_sentinel_admissions.py`) and `official_membership_movements.json` (checked_at 2026-09-20T10:43:56Z, 8-day window at `official_membership_movements.py:69`).
  - `audit_full` crashed at LIVE `audit_full.py:2022` `_SA.load(B)` after 187 OK / 7 FAIL (none lane-related).
  - `ranks_python.json` md5 f97b0e2c... unchanged vs pre-landing (ranks untouched); `lt_priming.json` still the 2026-09-20 artifact (C1 not yet exercised by a chain).
- **Options put to Paul:** (A) authorize the admissions refresh (paid) + membership refresh (`update_bill_repository.py --rebuild-dashboard`, which runs the chain; DE-043), then finish the protocol - ranks will move from the input refresh, C1 cannot (no rank path); (B) zero-spend partial `run_pipeline.py --from lt_priming.py` (steps 43-74 statically LLM/network-free; `personal_texture_layer` runs `--refresh-local`) - regenerates `lt_priming.json` + dashboard but stops at the first stale-gate reader (`make_member_desk` step 74 at the latest); (C) wait for the next authorized chain. (Outcome per the QME lane: the refresh was authorized and completed 2026-10-01.)
- Logs: session scratchpad `48f9a637-...\scratchpad\` (kernel_live.log, audit_live.log, rerun_new_reds.log, landing_merge.log, ranks_before.json).

## Related Actors

- [[quant-model-evaluation-skill]] - General read-only skill for evaluating models, numbers and claims; merged to main c13f3a5d4 (2026-09-30); Melange gates in a binding.

## Related Topics

- [[2026-07-feature-agent-tooling-stack]] - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
