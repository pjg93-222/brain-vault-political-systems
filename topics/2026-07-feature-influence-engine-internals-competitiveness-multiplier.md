---
type: topic
title: "Competitiveness multiplier c (2026-10-05 to 10-07) (Influence engine internals)"
aliases: ["Influence engine internals: Competitiveness multiplier c (2026-10-05 to 10-07)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-10-10
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/competitiveness-multiplier-lane-2026-10-05.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\competitiveness-multiplier-lane-2026-10-05.md", sha256: "3ce429bcd2ab0ec5d8b4600fc321ea02b07250cc3ea72f91226c1719c0f174e3"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-influence-engine-internals]]"
---

# Competitiveness multiplier c (2026-10-05 to 10-07) (Influence engine internals)

> The competitiveness multiplier lane of 2026-10-05 to 10-07: Paul's rulings on a PVI-based multiplier c that makes money to members in competitive races count more inside the money curves, its build and go-live behind the COMPET_MULT dial, the QME audit and Paul's follow-up rulings (brain D-104 to D-106). Part of [[2026-07-feature-influence-engine-internals]] (project [[melange-systems]]).

## Lane record (memory `competitiveness-multiplier-lane-2026-10-05`)

Lane opened 2026-10-05. Paul wants donations to members in competitive races to count more (future reciprocity), integrated via the Member Desk efficiency work.

**Paul's rulings (2026-10-05, AskUserQuestion):**
- ENGINE integration (not display-only).
- Curve: lean = PVI_signed x (+1 R, -1 D); c = 1 + 1.0*exp(-max(lean,0)/5). Cap 2.0.
- Senators: Paul SUPPLIED a state PVI table (saved to the session scratchpad as `cook_pvi_states_supplied_20261005.csv`; it had to be ingested into the repo before the scratchpad died).
- Open seats / retirees: apply the boost anyway.
- House source: `C:\Users\pgoff\.codex\worktrees\c7bb\Melange Systems\outputs\cook_pvi_research_20261005\cook_pvi_2026_districts.csv` (435 rows, all UNVERIFIED-HERE boundaries).

**Architect plan (Opus, read-only):** effective dollars c*cu and c*ind inside the money curves (flip_model pflip, optimize, per_topic_flip, money_response.shift_lean, lt_priming, dashboard JS, desk_roi, audit H3), dial COMPET_MULT default 0, artifact `data/money/competitiveness_c.json(.candidate)`, builder `fec/engine/build_competitiveness.py`. RA_SCORE ranks do NOT move in either dial state (pillars run before consumers); eff_value unchanged; ROI, opt_alloc/gap, per_topic_alloc, lt_priming and salience move.

**Why:** the reciprocity hypothesis is Paul's judgment constant, uncalibrated; docs must not claim it validated.

**Second rulings (2026-10-05):** c on BOTH sides (CU and industry money); budget_frontier: REPLACE Ballotpedia lev with c when the dial is on; the House join uses Cook's incumbent placement first, district number as fallback; ~~defaults accepted (Kiley c=1 flag, PR c=1 flag, all senators get state PVI)~~ (corrected 2026-10-07: NO question/answer exists; Kiley/PR c=1 were "unless you say otherwise" agent defaults never answered; Calvert/Doggett c=1 were asked in prose, never answered, and the agent applied its own recommendation. Senators' state PVI IS Paul's: he pasted the table. Correction drafted as D-105 in `audits/competitiveness_c_20261005/BRAIN_DRAFT_D104_CORRECTION.md`). Paul authorized build + full pipeline (dial off) + a dial-on candidate run; NOT commit. Spec: session scratchpad `compet_mult_build_spec.md`.

**Status 2026-10-06 (FINAL):** LIVE, default ON, COMMITTED on Melange main `86742061c` (dial off) + `59986b0ff` (default ON); brain D-104 + STATE bullet (brain commits `bf34551`, `63d80cc`). The full chain with the dial on ran clean (audit 564/7, all A2/A2b sentinels); compute_pillars with COMPET_MULT=0 = authority parity CLEAN, so c moves no rank. COMPET_MULT=0 reverts byte-for-byte. The Excel "blocker" was only `Downloads\data-5vPn3.csv`, never a chain workbook. The commits staged lane-only hunks of `run_pipeline.py`/`run_tests.py` via the scratchpad script `stage_lane_hunks.py` (blob = HEAD LF + lane hunks). OPEN then: an Opus second review (subagents weekly-limited to 10-08 19:00 ET); reciprocity prereg = Paul.

**2026-10-06 later:** Paul VERIFIED the House boundaries, so the boundary flag was dropped (`ef74e3add`), c unchanged; rerun rank delta 0/533. Mentat money wiring PLAN committed `ed455bcef` (`audits/mentat_money_wiring_20261006/MENTAT_TO_MELANGE_WIRING.md`, design only; 6 rulings open, brain STATE). Brain `539d442`.

**2026-10-07 QME audit** (read-only, plan sha 158a57e2, scratchpad partA/partB of session 19af93a7): imputation A1-A6 + application B1-B4 all SURVIVE; 533/533 c re-derived exact at 6dp; surfaces 533/533 parity; no KILLED. Open questions for Paul (none ruled then): 6 members at c=2 because their seat was redrawn against their party (Al Green, J. Johnson, Cohen, Fields, Owens, Wasserman Schultz); Calvert/Doggett/Kiley/PR c=1 were AGENT defaults though a code comment and D-104 say ruling; Sanders/King=D a builder choice; c NOT applied to bystander activation ind/BSCALE (5 sites) nor lt_priming net_lean; possible double count with the pressure_mult Fouirnaies-Hall competitiveness term (Spearman .506); LEV=0 ignored when the dial is on (budget_frontier:63); per_topic_alloc/salience_advisory don't record the dial/sha.

**2026-10-07 PAUL RULED (brain D-106, supersedes D-105):** R1 c replaces the Fouirnaies-Hall term in pressure_mult when on; R2 Kiley=R (c=2); R3/R4 ballot-district PVI for members running elsewhere, Calvert/Doggett looked up, non-runners keep their row c; R5 Sanders/King D; R6 LEV=0 forces fac=1; R7 provenance record + check. NOT YET BUILT (as of the memory): architect plan in the scratchpad `rulings_plan.md`, research in the scratchpad `races2026/` (session 19af93a7). Open: bystander/net_lean scaling (Paul asked "more mathematically revealing?"); PR and DC delegates unasked.

**How to apply:** COMPET_MULT=0 is the revert; weight answer = zero rank effect, about 2.3% of the pot reallocated, max 2x marginal pull inside the 35% money arm. The D-104 to D-105 correction (an agent default recorded as a Paul ruling) is the example behind the rule that owner rulings come only from Paul (change-control working agreement, rule 13).
