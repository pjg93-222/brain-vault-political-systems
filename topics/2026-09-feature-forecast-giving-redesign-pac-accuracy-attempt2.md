---
type: topic
title: "PAC accuracy attempt 2 (Forecast audit, giving-view redesign and PAC accuracy)"
aliases: ["Forecast audit, giving-view redesign and PAC accuracy: PAC accuracy attempt 2"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-09-29
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
part_of: "[[2026-09-feature-forecast-giving-redesign]]"
---

# PAC accuracy attempt 2 (Forecast audit, giving-view redesign and PAC accuracy)

> PAC-to-candidate giving accuracy attempt 2 of 2026-10-02 and 2026-10-03: the stage chain and its gates, Paul's rulings B1-B3 and C1-C2, the finished results with UT-X not scored, the 2027-03-08 scoring task and the v4 history branch. Part of [[2026-09-feature-forecast-giving-redesign]] (project [[forecast-redesign]]).

## PAC accuracy attempt 2 (2026-10-02 to 2026-10-03)

- Memory file description: "PAC-to-candidate giving accuracy attempt 2 (scratch, HOLD) - stage state, Paul's B1-B3 rulings, gate history". Audit memory file description: Mentat forecasting audit 09-29 (worktree `forecasting-model-audit-5603f2`): three "forecasts" on the console, regressions re-run in R, code fixes staged but NOT applied (classifier blocked writes; Paul runs copy_back scripts), methodology list A-L awaiting Paul. Redesign memory description: forecast giving view redesign (worktree `mentat-forecast-redesign-0fb0be`): Paul picked board F2 'Giving by cycle' and ordered the projections checked for logical validity against the test results; build = one-to-one to F2, all compute on the pod.

- Attempt 2 root: `C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt2-20261003T003312Z`. Coordinator brief = Paul's pasted prompt (stages S0-S7, Opus read-only review, Sonnet builds via `code/launch_stage.ps1`). HOLD stays; scratch only.
- State 2026-10-03 ~04:20 UTC: S2 done (all 12 artifacts). Coordinator gate BLOCKED (`receipts/GATE_S2_COORDINATOR.md`): gate verifier G1-G7 PASS (cent repro, hashes), but MLE reviewer BLOCK; UT-X CERTIFIED_PASS unreachable (1% unparseable-receipt rule counted 2012/2014) and FILED only switched O_avail. S2B pre-score repair launched (`strategy/S2B_PROMPT.md`) with Glass Box watcher `code/glassbox/stage_watch.ps1`. S3 needs Paul's explicit OK (UT-X is single-shot).
- Paul's rulings 2026-10-03 (binding amendments): B1 the 1% rule applies to "cycles the cell reads", threshold unchanged; B2 P&C identity strict own-PAC (drops GEICO PAC for Berkshire, SAFECO-PAC for Liberty Mutual; no judgment matches); B3 FILED = as-of-issue vintage rebuild, all inputs cut.
  - Dated note (2026-10-04): B2 governed attempt 2; the all-sector phase (attempt 3) takes P&C identity from Mentat's company-to-PAC mapping instead of B2's name test (Paul's E3), and E17 approves Mentat's non-bank PAC IDs as listed, GEICO for Berkshire included (six-year lookback lane).
- S2B done ~05:46 UTC, v2 freeze; gate HELD (`receipts/GATE_S2B_COORDINATOR.md`): certification structurally unreachable (inner fold s=2016 reads 2012/2014 paper-era receipts; min n>=4), P&C cohort = Travelers + legacy Chubb Corp only, FEC bulk files keep only latest report version so FILED can't be truly as-of-issue.
- Paul's rulings 2026-10-03 (second round): C1 UT-X stays SEALED this attempt; S3 dev-only (banks, SchoolsFirst), METHOD_SPEC still frozen; opening UT-X needs new owner ruling. C2 FILED = disclosed amendment-loss lower bound; no-downloads stands. S2C narrow repair -> v3 freeze -> ONE Opus verifier gate (not 3). S2C launched ~06:2x UTC.
  - Dated note (2026-10-04): Paul's all-sector phase ruling E4 superseded C1: P&C/UT-X "Open for development"; holdout spent, never certifies. The no-downloads rule of C2 gave way to D8 (the FEC downloads needed to prepare 2028) and, for the all-sector phase, to E12, E20 and E22 (D8 + pas226, the webk files and pas228) (six-year lookback lane).
- **Why:** UT-X holdout can be scored once; spending it on a known non-certifiable freeze wastes it. **How to apply:** never launch S3 without Paul's OK and a fresh gate on the v2 freeze. Glass Box watcher must run alongside every stage (S2's first 49 min were unwatched). Related memory names: `forecast-audit-lane-2026-09-29`, `mentat-forecast-redesign-lane-2026-09-30`, `glassbox-everything-rule-2026-07-27`.
- **FINISHED 2026-10-03 ~08:45 UTC** (Paul: "finish"; newer version of the source memory): S2C gate PASS -> S3 dev-only one pass -> S4 ACCEPT_WITH_REPAIRS -> S5 disclosure repairs -> S6 ACCEPT_WITH_NOTES -> S7 zip `delivery/attempt2_pac_accuracy_20261003.zip` plus an Artifact report (`https://claude.ai/artifact/FatsU6m8xyePv2QnTTdyCx`). Goal NOT met; HOLD unchanged.
  - Banks FC DUE (dev): ORIGIN 88.89 FAIL, m12 89.32 FAIL, m15 92.33 / m18 91.70 / m21 97.26 / L 96.30 OBSERVED_PASS (earliest m=15). SchoolsFirst FC: all FAIL (m21 91.38 FAIL_SUBGROUP, pres 88.87). UT-X SEALED_NOT_SCORED.
  - LIVE_FREEZE 2026 is frozen; scoring it (about March 2027) needed Paul's OK, given 2026-10-03: the one-time scheduled task `score-pac-live-freeze-2026` fires 2027-03-08 09:00 ET and stops if there is no local pas226 edition dated >= 2027-03-01.
  - Open for Paul: S6 MAJOR-2 (FILED UNAVAILABLE cells still publish per-target predictions: a breach of the withheld pin?).
- **v4 branch** (Paul 2026-10-03: "use the pas208 and pas210 files as history"; rulings D1 inputs only, D2 v4 live freeze, D3 lean run): V1 amendment -> V2A blocked (stale pre-S3 tests; coordinator ruling R-V2B deselect) -> V2B ready -> gate blocked (v3-tree check reference) -> V2R fix R-V2R plus the superseding freeze V4_1 -> re-gate PASS -> V3 RESCORE, one pass -> V4R ACCEPT_WITH_NOTES. Result: v4 is WORSE for banks nowcasts (m15 92.33 -> 86.38; earliest clearing m15 -> m21), driven by the 2010 pace ratio 2.36; ORIGIN unchanged. v3 stays the record; the March 2027 job now scores v3 and LIVE_FREEZE_V4_1 side by side. The report was republished as v2 at the same Artifact URL (page file `v4/report/report.html`; `delivery/report.html` untouched).
