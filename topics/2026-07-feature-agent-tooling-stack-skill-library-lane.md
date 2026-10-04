---
type: topic
title: "Moneyball skill library lane (Agent tooling stack)"
aliases: ["Agent tooling stack: Moneyball skill library lane"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-10
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/feature"]
part_of: "[[2026-07-feature-agent-tooling-stack]]"
---

# Moneyball skill library lane (Agent tooling stack)

> The Moneyball skill library: how the repo skills were built, merged into git and audited for stale facts. Part of [[2026-07-feature-agent-tooling-stack]] (project [[melange-systems]]).

## Moneyball skill library (sources: skills-library-2026-07-10, skill-library-stale-facts-lane-2026-09-30; see [[moneyball-skill-library]])

### 16-skill library, built 2026-07-09/10 (retirement handoff, Paul-directed)

- Lives at the LIVE tree `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\.claude\skills\` (durable copy) AND worktree nifty-cray-f6d053 `.claude/skills/` (authoring copy) + `README.md` index.
- Skills: change-control (the constitution, all 18 project laws embedded as written law per Paul), architecture-contract, build-and-env, run-and-operate, config-and-flags (about 88 dials), debugging-playbook, diagnostics-and-tooling (+3 shipped read-only scripts: rank_delta / artifact_freshness / env_dials), validation-and-qa, failure-archaeology, influence-modeling-reference, psychometrics-reference, research-methodology, proof-and-analysis-toolkit, docs-and-claims (owns the validated-claims ledger + live-branch-state statements), congress-rollover-campaign (+`rollover_gate_check.py`, has `--online`), research-frontier.
- **Why:** cheaper sessions (Sonnet-class) must maintain/advance the project; Paul's calibrations: audience assumes NEITHER domain nor stats; SOTA = methods rigor AND real-world capability; hardest live problem = 120th-Congress rollover (`congestion.json` has NO live producer - builders attic'd, FEC zips 2024-vintage).
- **How to apply:** load the relevant skill before working; change-control before ANY change. Build process: 14-map discovery workflow -> 16 parallel authors (ground-truth re-verification mandatory) -> factual/doctrine/usability reviewers (2 blocking + 11 important, all fixed) -> fixer -> orchestrator spot-checks + a coop_v2/round-6 freshness fix pass.
- ~~Gitignore caveat: `.claude/*` is ignored (line 28) - the library is ON DISK ONLY; to track add `!.claude/skills/` + `!.claude/skills/**` after the `!.claude/commands/*.md` block, then `git add`; Paul's call~~ - resolved 2026-07-10 afternoon (see next bullet).
- **Merge debt CLEARED + library IN GIT (2026-07-10 afternoon, Paul: "merge and integrate - do it"):** ALL branches fully merged into main - compassionate-ellis @5e63c97 (kill-ledger preregs), musing-swirles @4f7007d (9 parse fixes), magical-booth @2ce51c5 (7 HIGH fixes; conflicts resolved: `b5_behavioral_instrument` = main's version per documented rule, `audit_full` = BOTH check families, so **audit now 71**), clever-elbakyan @02a36ac (Vote Smart TIER-5 RESULT + a NEW user-directed MS NOW/ex-MSNBC transcript leg @9467fcc), with beautiful-hermann + audit/fixes-2026-07-10 merged earlier by a parallel session. Post-merge verification ALL GREEN: kernel 37/37, chain 9.8 min (coop_v2_candidate now in-chained), **ranks md5 UNCHANGED cce0c5a6 (0 moved)**, audit **71/71** twice. Library committed to main @b994d93 (gitignore keep rules added; 21 files tracked); all about 34 branch-caveat rows in the skills updated to merged-state. `git log main..<branch>` = empty for every branch. Related memories: `psych-audit-2026-07-09`, `dont-drop-context-anchor-memory`.

### Stale-fact lane 2026-09-30 (COMMITTED and LANDED in LIVE; main b7faf6344, mirror current)

- State (2026-09-30 about 15:35Z): lane commits 49c7f994e (lt_priming + tpl prime() read P[u][v]), 8bd27a991 (`outcome_snapshot --freeze` -> data\engine), 5ab841fd5 (scenario/optimize comments), 61325d2b8 (env_dials recursive + PLATFORM), e8aaecb5d (skill-library corrections), merge 2b2d72578 (main had gained Paul's c13f3a5d4 quant-model-evaluation skill mid-lane; README then listed 20 rows under "19"), b7faf6344 (README = 20 skills). LIVE main fast-forwarded c13f3a5d4 -> b7faf6344 (24 files, all already CRLF, LIVE copies clean first); mirror main + branch = b7faf6344.
- **Paul's rulings:** 2026-09-30 "Go ahead with your recommendations on D1-D4" / "Fix the defects" / "Commit it and run the protocol in LIVE". D5 (is Highly Persuadable 0.65 ratified?) still unanswered. D4 = stale line refs deferred to a spawned chip ("Refresh stale line refs in skill library"; its precondition, the batch on main, is now met).
- **LIVE protocol at b7faf6344 = PARTIAL:** kernel 256 passed / 4 FAILED in 52 min - standing reds `test_bill_collision_guards` + `test_make_staffer_network_html`, plus `test_per_area_board` (9 errors, all "sentinel admissions are outside their freshness window") and `audit_stale_imports` (5 hits in files this lane never touched: 3 UNTRACKED press-recovery files dated 2026-09-21 - `fec/collect/recover_press_refresh.py`, `fec/tests/collect/test_press_recovery_speed.py`, `test_press_source_extract.py` - and `fec/tests/surfaces/test_clean_workspace_loading.py` from 6702a5452). No lane-caused red.
- Chain NOT RUN: steps 12-14 fail-close on `data/legislation/sentinel_admissions.json` (mtime 2026-09-13, 8-day window, `sentinel_admissions.py:24,33-34`; refresh = PAID claude-cli step, Paul's spend + model ruling N19, script `refresh_sentinel_admissions.py`) and `official_membership_movements.json` (checked_at 2026-09-20T10:43:56Z, 8-day window at `official_membership_movements.py:69`). `audit_full` crashed at LIVE `audit_full.py:2022` `_SA.load(B)` after 187 OK / 7 FAIL (none lane-related). `ranks_python.json` md5 f97b0e2c... unchanged vs pre-landing (ranks untouched); `lt_priming.json` still the 2026-09-20 artifact (C1 not yet exercised by a chain).
- **Options put to Paul:** (A) authorize the admissions refresh (paid) + membership refresh (`update_bill_repository.py --rebuild-dashboard`, which runs the chain; DE-043), then finish the protocol - ranks will move from the input refresh, C1 cannot (no rank path); (B) zero-spend partial `run_pipeline.py --from lt_priming.py` (steps 43-74 statically LLM/network-free; `personal_texture_layer` runs `--refresh-local`) - regenerates `lt_priming.json` + dashboard but stops at the first stale-gate reader (`make_member_desk` step 74 at the latest); (C) wait for the next authorized chain. (Outcome: option A's refresh was authorized and completed 2026-10-01, see the QME lane in [[2026-07-feature-agent-tooling-stack-quant-model-evaluation-lane]].)
- **Report-only findings still open:** reversed-index reads in tpl flipRoute (about :968-970) / distToTarget (about :729) / `make_member_desk.py:2931` + desk tpl:451; `rollover_gate_check.py` reads root `congestion.json` (now data\engine\); `PRESS_BASELINE_FOLD=0` set at Paul's user level; root README.md still 84/136; `lt_priming.py:115` tiny-gap rounding vs audit gap>0; holistic_norm directed-config caveat for C1. W4 last-measured lines still cite 247/2 (09-20) and 559/9 (09-19) - update only after a clean full protocol run.
- Logs: session scratchpad `48f9a637-...\scratchpad\` (kernel_live.log, audit_live.log, rerun_new_reds.log, landing_merge.log, ranks_before.json). Related memories: `ask-before-substantive-changes`, `scout-census-traps-2026-09-13`, `review-in-fable-directive-2026-09-16`.
