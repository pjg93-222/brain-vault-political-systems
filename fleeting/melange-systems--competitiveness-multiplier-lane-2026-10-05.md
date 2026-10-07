---
type: fleeting
title: "Competitiveness multiplier lane (2026-10-05)"
aliases: ["competitiveness-multiplier-lane-2026-10-05"]
source: "session"
captured_at: 2026-10-05
created_at: 2026-10-05
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/competitiveness-multiplier-lane-2026-10-05.md", type: "claude-memory", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\competitiveness-multiplier-lane-2026-10-05.md", sha256: "3ce429bcd2ab0ec5d8b4600fc321ea02b07250cc3ea72f91226c1719c0f174e3"}
updated_at: 2026-10-06
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Competitiveness multiplier lane (2026-10-05)

> Cook PVI election-competitiveness multiplier c for the engine money curves; Paul's 2026-10-05 rulings and plan status

## Content

Lane opened 2026-10-05. Paul wants donations to members in competitive races to count more (future reciprocity), integrated via the Member Desk efficiency work.

Paul's rulings (2026-10-05, AskUserQuestion):
- ENGINE integration (not display-only).
- Curve: lean = PVI_signed x (+1 R, -1 D); c = 1 + 1.0*exp(-max(lean,0)/5). Cap 2.0.
- Senators: Paul SUPPLIED a state PVI table (saved to session scratchpad cook_pvi_states_supplied_20261005.csv; must be ingested into repo before scratchpad dies).
- Open seats / retirees: apply the boost anyway.
- House source: C:\Users\pgoff\.codex\worktrees\c7bb\Melange Systems\outputs\cook_pvi_research_20261005\cook_pvi_2026_districts.csv (435 rows, all UNVERIFIED-HERE boundaries).

Architect plan (Opus, read-only): effective dollars c*cu and c*ind inside the money curves (flip_model pflip, optimize, per_topic_flip, money_response.shift_lean, lt_priming, dashboard JS, desk_roi, audit H3), dial COMPET_MULT default 0, artifact data/money/competitiveness_c.json(.candidate), builder fec/engine/build_competitiveness.py. RA_SCORE ranks do NOT move in either dial state (pillars run before consumers); eff_value unchanged; ROI, opt_alloc/gap, per_topic_alloc, lt_priming, salience move.

**Why:** reciprocity hypothesis is Paul's judgment constant, uncalibrated; docs must not claim it validated.
Second rulings (2026-10-05): c on BOTH sides (CU and industry money); budget_frontier: REPLACE Ballotpedia lev with c when dial on; House join uses Cook's incumbent placement first, district number fallback; ~~defaults accepted (Kiley c=1 flag, PR c=1 flag, all senators get state PVI)~~ (corrected 2026-10-07: NO question/answer exists; Kiley/PR c=1 were "unless you say otherwise" agent defaults never answered; Calvert/Doggett c=1 asked in prose, never answered, agent applied own rec. Senators' state PVI IS Paul's — he pasted the table. Correction drafted as D-105 in audits/competitiveness_c_20261005/BRAIN_DRAFT_D104_CORRECTION.md). Paul authorized build + full pipeline (dial off) + dial-on candidate run; NOT commit. Spec: session scratchpad compet_mult_build_spec.md.
Status 2026-10-06 (FINAL): LIVE, default ON, COMMITTED on Melange main 86742061c (dial off) + 59986b0ff (default ON); brain D-104 + STATE bullet (brain commits bf34551, 63d80cc). Full chain with dial on ran clean (audit 564/7, all A2/A2b sentinels); compute_pillars with COMPET_MULT=0 = authority parity CLEAN -> c moves no rank. COMPET_MULT=0 reverts byte-for-byte. Excel 'blocker' was only Downloads\data-5vPn3.csv, never a chain workbook. Commits staged lane-only hunks of run_pipeline.py/run_tests.py via scratchpad stage_lane_hunks.py (blob = HEAD LF + lane hunks). OPEN: Opus second review (subagents weekly-limited to 10-08 19:00 ET); reciprocity prereg = Paul.
2026-10-06 later: Paul VERIFIED House boundaries -> boundary flag dropped (ef74e3add), c unchanged; rerun rank delta 0/533. Mentat money wiring PLAN committed ed455bcef (audits/mentat_money_wiring_20261006/MENTAT_TO_MELANGE_WIRING.md, design only; 6 rulings open, brain STATE). Brain 539d442.
2026-10-07 QME audit (read-only, plan sha 158a57e2, scratchpad partA/partB of session 19af93a7): imputation A1-A6 + application B1-B4 all SURVIVE; 533/533 c re-derived exact at 6dp; surfaces 533/533 parity; no KILLED. Open Qs for Paul (none ruled): 6 members c=2 because seat redrawn against party (Al Green, J. Johnson, Cohen, Fields, Owens, Wasserman Schultz); Calvert/Doggett/Kiley/PR c=1 were AGENT defaults though code comment + D-104 say ruling; Sanders/King=D builder choice; c NOT applied to bystander activation ind/BSCALE (5 sites) nor lt_priming net_lean; possible double count with pressure_mult Fouirnaies-Hall comp term (Spearman .506); LEV=0 ignored when dial on (budget_frontier:63); per_topic_alloc/salience_advisory don't record dial/sha.
2026-10-07 PAUL RULED (brain D-106, supersedes D-105): R1 c replaces Fouirnaies-Hall term in pressure_mult when on; R2 Kiley=R (c=2); R3/R4 ballot-district PVI for members running elsewhere, Calvert/Doggett looked up, non-runners keep row c; R5 Sanders/King D; R6 LEV=0 forces fac=1; R7 provenance record+check. NOT YET BUILT: architect plan -> scratchpad rulings_plan.md, research -> scratchpad races2026/ (session 19af93a7). Open: bystander/net_lean scaling (Paul asked "more mathematically revealing?"), PR+DC delegates unasked.
**How to apply:** COMPET_MULT=0 is the revert; weight answer = zero rank effect, ~2.3% of pot reallocated, max 2x marginal pull inside the 35% money arm.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-06 from the Claude Code memory file `competitiveness-multiplier-lane-2026-10-05.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
