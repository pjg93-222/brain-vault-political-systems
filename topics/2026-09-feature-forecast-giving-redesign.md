---
type: topic
title: "Forecast audit, giving-view redesign and PAC accuracy"
aliases: ["Forecast audit, giving-view redesign and PAC accuracy"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "glass-box"
  - "[[mentat-console]]"
  - "runpod-pod"
objective: "Make the Mentat console forecasts both look better and be right: audit the three forecasts and their regressions, rebuild the giving view as board F2 'Giving by cycle' with projections checked for logical validity against the test results, and refine PAC-to-candidate giving accuracy (attempt 2, HOLD, UT-X sealed)."
created_at: 2026-09-29
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-attempt2-lane-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-attempt2-lane-2026-10-03.md", sha256: "10cf0f215277dcb435746964245dfd6291be8f676bf9c981cdeed7015ac02cd4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-forecast-redesign-lane-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-forecast-redesign-lane-2026-09-30.md", sha256: "89d010b300fa8907c87ea70a53067bc75410687e7e5c6cbed1c0e493912232b3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/forecast-audit-lane-2026-09-29.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\forecast-audit-lane-2026-09-29.md", sha256: "320afff4a5fabfd67d9f4db59835885458211ec89b63ac75655e91a19b3a0da3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-six-year-lookback-directive-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-six-year-lookback-directive-2026-10-03.md", sha256: "a2f018f3149d98c773c3253a2d406f4f902c542de1c1e7eb6f68ff5799202b43"}
updated_at: 2026-10-05
updated_by: "brainlink-migration@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
---

# Forecast audit, giving-view redesign and PAC accuracy

> Three connected workstreams on the Mentat forecasting stack, 2026-09-27 to 2026-10-03: the 09-29 forecasting-model audit, the 09-30 overhaul of the giving view (board F2 'Giving by cycle') with an integrity reconciliation, and PAC-to-candidate accuracy attempt 2 (HOLD, scratch only, UT-X holdout sealed).

Dated correction (2026-10-04, all-sector phase rulings; source `pac-accuracy-six-year-lookback-directive-2026-10-03`): "UT-X holdout sealed" in this tagline and "UT-X sealed" in the objective are attempt 2's state; on 2026-10-04 Paul's E4 opened P&C/UT-X for development, superseding C1 (holdout spent, never certifies).

## Parts

- [[2026-09-feature-forecast-giving-redesign-audit-lane]] — The forecasting-model audit lane of 2026-09-29 and its 2026-09-30 record: Paul's verbatim pushback and earlier rulings, the withdrawn methodology list, the fix sets Paul applied and committed, the build tree and phases, and the pod rulings.
- [[2026-09-feature-forecast-giving-redesign-redesign-lane]] — The giving-view redesign lane of 2026-09-30 to 2026-10-01: the Higgsfield boards and Paul's pick of F2, board and validity problems, the pod reversal and export, the Opus audit, the reconciliation finding the model intact, the landed fixes.
- [[2026-09-feature-forecast-giving-redesign-pac-accuracy-attempt2]] — PAC-to-candidate giving accuracy attempt 2 of 2026-10-02 and 2026-10-03: the stage chain and its gates, Paul's rulings B1-B3 and C1-C2, the finished results with UT-X not scored, the 2027-03-08 scoring task and the v4 history branch.
- [[2026-09-feature-forecast-giving-redesign-six-year-lookback-lane]] — Paul's six-year rolling lookback directive of 2026-10-03 and what followed in the same memory file: the v5 rulings and run, the banking 95% provenance and the all-sector phase rulings E1-E22 of attempt 3 (2026-10-04).

## Context

**Scope of "the Forecasting model" (audit, 2026-09-29): three console surfaces plus an R backtest.**

1. Insights "Forecasts" card: `_forecast` in `mentat/app/analysis_metrics.py`; naive; never shows a number (no complete_cycles ever passed; indexes hold only 2021-22 / 2023-24 / 2025-26).
2. Giving Forecast: Codex-built 2026-09-27 from Paul's CHE:673 ask, UNTRACKED (`giving_forecast.py`, `giving-forecast.js` / `giving-forecast.css`, `app/data/giving-models-v1.json`, `tools/build_giving_models.py`); fit on OpenSecrets totals, not Mentat data.
3. Chart Studio "Same-phase forecast" transform (`chart-math.js:991-1022`).
4. Plus the SGS R backtest (`sector_growth_study/code/R/sgs_forecast.R`, untracked); SGS = sector growth study (separate work; its R backtest is untracked). ~~untracked~~ — superseded 2026-10-05: the SGS source is committed as Mentat 04e2391e5 (2026-09-30T21:42:08Z, codex/mentat-crypto; source: git -C C:/Users/pgoff/Mentat log).

**Why this is one topic.** The audit established that the model's regressions are sound and the screens mostly genuine; the redesign asked Paul's question "make sure the projections are logically valid and in line with the test results"; the PAC accuracy attempt tries to improve how well PAC-to-candidate giving is predicted, under single-look holdout rules ([[single-look-holdout-discipline]]). Program-level tracking lives in [[forecast-redesign]]; the two 2026-10-03 ruling rounds are in [[2026-10-03-pac-accuracy-attempt2-rulings]].

**Systems touched.** The Mentat console ([[mentat-console]], product project Mentat (FEC contributions intelligence)); heavy compute was moved to the RunPod pod (RunPod math pod) and then brought back out (see History); progress is watched through GLASS BOX event stream. Work is directed by Paul Goff.

**Hard constraints that run through the whole topic.**
- Classifier behavior: writes into untracked Mentat files are blocked ("Irreversible Local Destruction"); commits are blocked ("Modify Shared Resources"). Route = scratch + `copy_back` / commit kits that Paul runs.
- Never restart Paul's consoles 8802-8811; console restart = Paul.
- Model-semantics fixes go to Paul as options and wait for his ruling (`ask-before-substantive-changes`); display fixes follow the board.
- Never relay an agent's NEW analysis as settled: label it unverified or reproduce it by a second path first.
- No narrative headline or summary sentence in the forecast UI (Paul: "No fucking headline").

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| GLASS BOX event stream | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| RunPod math pod | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

## Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- Mentat (FEC contributions intelligence) - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model

## Related Discussions

- [[2026-10-03-pac-accuracy-attempt2-rulings]] - Paul's 2026-10-03 rulings on PAC accuracy attempt 2: B1-B3, then C1 (UT-X sealed) and C2 (FILED = lower bound).

## History

| Date | Event |
|---|---|
| 2026-09-27 | Giving Forecast built by Codex from Paul's CHE:673 ask (untracked files); Codex CHE thread rulings: "we are mainly looking at the ordinary P" (CHE:537), "look at the ORDINARY P values" (CHE:595), "forecast later giving" (CHE:673). 63 automated OpenSecrets captures made 09-27, kept permanently as the frozen baseline. |
| 2026-09-29 | Forecast audit lane (worktree `forecasting-model-audit-5603f2`, session 1523756f-30a2-417f-ad2e-8bccfda0096d): regressions re-run in R. Paul's pushback: signs hold in every fold, he was largely RIGHT. First methodology list (Q1-Q19) withdrawn. Fixes reviewed APPLY (Opus) but not applied (classifier). 2020 cycle did NOT land. |
| 2026-09-30 | All fix sets applied by Paul and verified live (88 py + 1726 R pass); Paul committed Mentat `7287dbb50` "Record the Giving Forecast and the Insights forecast fixes" (13 files). Tailoring rulings (PAC partial pooling, then superseded by "Own slopes + auto-pick"). Build tree created; PAUSED by Paul ("Pause"). Pod rulings and reversals; new pod; v2 G6 HOLD diagnosed; build plan ruled; wrap-up answers. |
| 2026-09-30 | Redesign lane (worktree `mentat-forecast-redesign-0fb0be`): Paul via /taste-skill:gpt-taste: "I don't like the current look of the forecast." Boards F1/F2/F3 made with Higgsfield; Paul picked number 2 (F2 'Giving by cycle') and ordered the projections checked for logical validity. |
| 2026-09-30 late | POD REVERSAL (Paul: "Go onto the pod to work", "Move out of the pod", "Bring everything out with it"); pod-only rule LIFTED for this lane. |
| 2026-10-01 ~00:07Z | EXPORT DONE: mirror `C:\melange-data\pod-export-20260930\forecast-audit-5603f2\` (10,601/10,601 sha256 match). |
| 2026-10-01 | AUDIT DONE (Opus, read-only), MODEL FIX STAGED, HANDOFF (Paul angry at relayed unverified claims), RECONCILIATION DONE (model INTACT; session silly-einstein-57ef31). |
| 2026-10-01 06:19Z / 07:25:09Z / 07:25:48Z | Fixes LANDED (Paul: "D4, B. Apply rest"): anchors exclude non_giving (06:19Z + follow-up 07:25:09Z); calc P1/P3/P4/waivers/no `combined_reference`/G8-Windows (07:25:48Z). |
| 2026-10-01 10:58:25Z | F2 UI LIVE (`apply_f2.py` 829cd9da; 3 review rounds). |
| 2026-10-01 | Forecast UI v3 direction: Paul rejected the 3 Nano Banana boards; ~~next boards in GPT Image 2.5.~~ — superseded 2026-10-05: GPT Image 2.5 and GPT Image 2 both failed on Higgsfield; fallback Nano Banana Pro boards V4a/V4b/V4c were made but not reviewed or shown to Paul (source: C:/melange-data/forecast-redesign-20260930/HANDOFF_FORECAST_2026-10-01_EOD.md:61) |
| 2026-10-02 / 2026-10-03 | PAC-to-candidate accuracy refinement attempt 2 (S0-S7 stages); S2 gate BLOCKED, S2B repaired, gate HELD; Paul's B1-B3 then C1-C2 rulings; S2C launched ~06:2x UTC on 2026-10-03. |
| 2026-10-03 ~08:45 UTC | Attempt 2 FINISHED (Paul: "finish"): S2C gate PASS, S3 dev-only one pass, S4 ACCEPT_WITH_REPAIRS, S5 disclosure repairs, S6 ACCEPT_WITH_NOTES, S7 delivery; goal NOT met, HOLD unchanged, UT-X SEALED_NOT_SCORED; Paul OK'd the one-time scoring task for 2027-03-08. |
| 2026-10-03 | v4 branch (Paul: "use the pas208 and pas210 files as history"): one V3 RESCORE pass; v4 WORSE for banks nowcasts; v3 stays the record. Then Paul's directive: further accuracy work looks back only 6 years (ruled ROLLING the same day) and must come from methodology; v4 is a regression. |
| 2026-10-04 | Paul's v5 rulings on `strategy/V5_AMENDMENT.md`: strict 3-cycle cap, a fixed-rule primary, a v5 2026 line in the March 2027 job, and 2028 prepared as the first clean test with the needed FEC downloads authorised. |
| 2026-10-04 | v5 run: V5-B (as V5B3 after a CLI re-login), GATE_V5 PASS, V5-R one pass, V5-V ACCEPT_WITH_NOTES; the post-hoc RESCORE put banks nowcasts up at m12, m15, m18 and L (m21 slightly down) and lifted SchoolsFirst m21 to RESCORE_OBSERVED_PASS, with ORIGIN banks unchanged; v3 stays the record; the 2028 method and plan are frozen. |
| 2026-10-04 | Banking-accuracy diagnostic (revision 2; revision 1 wrongly called the figure post hoc and never told to Paul): on 2026-10-01 14:42 ET Paul was told "about 95%. A fair range is 95-98%" for the banks blend forecast as of month 18, from a pace test pre-registered on 10-01; never ORIGIN or m12; attempt 2 m18 = 93.40 (2018-24) / 91.70 (2016-24); four questions left open for Paul. |
| 2026-10-04 | All-sector phase rulings E1-E22 (attempt 3): every sector scored on ORIGIN and every nowcast, with crypto, fintech and community banks unscorable now and in the 2028 prospective track (E15); P&C/UT-X open for development, superseding C1; the blend improved, not retired; the banking diagnostic's four open questions ruled; Mentat's 28 non-bank PAC IDs and v6 approved (full text in Six-year lookback directive and v5 rulings). |

## Decisions

- Paul's rulings that govern the forecast model:
  - Ordinary p-values are primary ("we are mainly looking at the ordinary P"; "Ordinary p-values remain primary" in the UI is Codex's phrasing of that ruling). "forecast later giving" is Paul's own wording (CHE:673).
  - Paul on tailoring (2026-09-30): p "not gospel, or the final say, everything else lines up".
- ~~Tailoring ruled 2026-09-30: PAC = DerSimonian-Laird partial pooling (auto -0.252, banks -0.087, CU -0.096; cut PAC error ~1/3 out of sample); control + lobbying pooled (no rule beat pooled; banks-only tailoring made banks worse). Low in-sample p never predicted out-of-sample gain.~~ Superseded 2026-09-30 by Paul's pick "Own slopes + auto-pick" (see next); kept because it explains older artifacts.
- Own slopes + auto-pick (2026-09-30): with the ruled previous-cycle PAC anchor, own industry slopes (R1) beat the blend (LOEO 10.8 vs 14.3, naive 12.7; chrono 14.3 vs 21.6, naive 12.3). v2 PAC = own slopes; the refit agent re-tests R0/R1/R2 per term every refit and picks the rule winning BOTH designs, else blend. Lesson: a rule-comparison result is conditional on the anchor; re-run it when the anchor changes. Auto-pick margin RULED 5% (PAC = own, control/lobbying pooled).
- Anchor auto-pick per industry x chamber (5% margin, both designs; banks House -> same-phase expected); keep log lobbying and DROP the banks warning; G6 owner waiver list (`registry\gate_waivers.json`).
- Phase 2 anchor rulings (2026-09-30, `SP\phase2_mentat_anchor\ADDENDUM.md`): Mentat has banks (10) + CUs (10), NO auto (display dropped, kept in estimation); Community Banks separate. Naming collision: these "C1-C3" and "S1-S3" labels are NOT the attempt-2 C1/C2 rulings.
  - C1: Paul chose "Collect PAC-to-candidate" (Mentat only had employee->company-PAC money); first check existing pas2/oth inputs before any collection-code change (frozen; per-change OK).
  - C2: LDA both series side by side, bank total; auto/P&C lobbying hidden (no LDA sector).
  - C3: lobbying = log refit. C4: share anchor = 2024 market Jan-Jun.
  - S1 shares shown BOTH side by side (employee-only and PAC-only); S2 Polymarket-to-Polymarket 2024->2026 primary; S3 CU PAC shown with thin-base flag.
- PAC-to-candidate FOUND read-only (pas2 in `.cache\repair-20260908-inputs\fec_beneficiary`; D-049 rule; banks 19 PACs = 43% of OpenSecrets PAC line stable; CUs only SchoolsFirst ~2%): no collection change.
- Build plan RULED 2026-09-30: remove seats signal; hide Insights card behind a setting; pilot new industry = P&C; Paul supplies IBISWorld per new industry; agent trigger = after each industry export (watch receipts read-only), auto-publish when gates pass. Phases: 1 R refit pipeline w/ v1 parity -> 2 v2 bundle (blend, prev-cycle anchor, Jan-Jun control input, remainder fix, prediction interval) -> 3 UI -> 4 SGS I-K -> 5 agent -> 6 P&C pilot.
- P&C baseline = F09 (all Insurance, scope caveat): F3400 has NO public page (302 to index), so Paul ruled F09. IBISWorld: used the on-disk 2024-11 edition's 2024 current-year ESTIMATE as P&C's single vintage, flagged.
- Coordinator ruling (2026-10-01): saved 2026 outlook stays pre-filled but labelled + clearable.
- Paul's rulings on landing (2026-10-01): "D4, B. Apply rest" (anchors exclude non_giving; calc fixes).
- Display rule: "No fucking headline"; Paul rejected the 3 Nano Banana boards; ~~v3 boards use GPT Image 2.5~~ — superseded 2026-10-05: GPT Image 2.5 and GPT Image 2 both failed on Higgsfield; fallback Nano Banana Pro boards V4a/V4b/V4c were made but not reviewed or shown to Paul (source: C:/melange-data/forecast-redesign-20260930/HANDOFF_FORECAST_2026-10-01_EOD.md:61); time-series stacked D/R bars by cycle.
- PAC accuracy attempt 2 (2026-10-03): B1 the 1% rule applies to "cycles the cell reads" (threshold unchanged); B2 strict own-PAC P&C identity (dated note 2026-10-04: the all-sector phase takes identity from Mentat's company-to-PAC mapping instead, Paul's E3); B3 FILED = as-of-issue vintage rebuild; ~~C1 UT-X stays SEALED, S3 dev-only~~ (superseded 2026-10-04 by Paul's E4: P&C/UT-X "Open for development"; holdout spent, never certifies); C2 FILED = disclosed amendment-loss lower bound, no-downloads stands. Full text in [[2026-10-03-pac-accuracy-attempt2-rulings]].
- PAC accuracy attempt 2, v4 branch (Paul 2026-10-03, "use the pas208 and pas210 files as history"; source `pac-accuracy-attempt2-lane-2026-10-03`, newer version): D1 inputs only, D2 v4 live freeze, D3 lean run. Result: v4 is WORSE for banks nowcasts, so v3 stays the record (detail in PAC accuracy attempt 2).
- Six-year lookback directive (Paul 2026-10-03, ruled ROLLING the same day) and the v5 rulings (2026-10-04): accuracy work may look back only the 3 cycles (6 years) before each forecast's issue date, gains must come from methodology, and older history is never again proposed as an accuracy lever (detail in Six-year lookback directive and v5 rulings).
- All-sector phase rulings (Paul, 2026-10-04, attempt 3; source `pac-accuracy-six-year-lookback-directive-2026-10-03`, newer version): every sector scored against sector total A>=90 and each phase subgroup A>=75, on ORIGIN and every nowcast (E1, E2, E5), with crypto, fintech and community banks unscorable now and in the 2028 prospective track (E15); identity from Mentat's company-to-PAC mapping, its 28 non-bank PAC IDs approved as listed (E3, E17); P&C/UT-X open for development, superseding C1 (E4); the blend is improved, not retired (E7); v6 approved (E19); downloads = D8 + pas226 for the March 2027 job (E12), then also the FEC PAC summary files (webk) (E20) and pas228 for the 2028 track (E22) (detail in Six-year lookback directive and v5 rulings).
- ~~Pod rule (2026-09-30 angry): "Why hasn't all of these processes been moved over to the Pod?" -> ALL heavy compute goes to the pod; agents only edit locally.~~ Superseded the same day: pod "Don't need that right now" (run locally), then a new pod, then the late reversal ("Go onto the pod to work" / "Move out of the pod" / "Bring everything out with it") which lifted the pod-only rule for this lane; kept because it explains older artifacts.

## Next Steps

- [ ] Paul to rule on the methodology list A-L from the 2026-09-29 audit (awaiting Paul at that date)
- [x] ~~Paul to decide D1-D9 (reconciliation decisions awaiting him; brain drafts in `BRAIN_DRAFTS_2026-10-01.md`)~~ — superseded 2026-10-05: Paul ruled D1-D9 on 2026-10-01 at 04:29:43Z ('D4, B' / 'Apply rest'; source: Claude transcript 710de3dd-b15e-45e8-99c3-a35dcb0d4739.jsonl (silly-einstein-57ef31) line 2751; C:/melange-data/forecast-redesign-20260930/HANDOFF_FORECAST_2026-10-01_EOD.md:33); the brain drafts were applied to the brain 2026-10-05 as D-089..D-093 and DE-058..DE-064 ([[ledger/melange-systems-brain/D-089|D-089]] to [[ledger/melange-systems-brain/D-093|D-093]])
- [x] ~~Pace backtest waits on Paul's OK to download FEC pas212/214/216~~ — superseded 2026-10-05: Paul approved the FEC downloads at 2026-10-01T13:52:50Z ('2. Yes'), they were fetched 13:58:08-13:58:19Z and the pre-registered pace backtest ran (source: C:/melange-data/forecast-redesign-20260930/pace_test/DOWNLOADS.md:3,15 and RESULTS.md:9-11,57-58); see [[ledger/melange-systems-brain/D-093|D-093]]
- [ ] Windows scheduled tasks (nightly anchors, refit watcher): Paul said OK, create AFTER landing; landing kit into the dirty live tree
- [x] ~~Console restart (Paul)~~ — superseded 2026-10-05: the session restarted MENTAT on 8806 at Paul's order, about 2026-10-01T13:55Z, and verified the view (source: Claude transcript 710de3dd-b15e-45e8-99c3-a35dcb0d4739.jsonl (silly-einstein-57ef31) around 13:55Z; C:/melange-data/forecast-redesign-20260930/HANDOFF_FORECAST_2026-10-01_EOD.md:27)
- [ ] Open questions for Paul on LDA: `sector_spend` has only crypto/credit_union/bank/fintech (no auto, no P&C) and two never-combined series (income_total vs expenses_total)
- [ ] P&C needs from Paul: OpenSecrets F3400 totals 2008-2024 + candidate recipients 2012-2024, IBISWorld 52412 2025+ edition (see Decisions: F3400 has no public page; F09 used)
- [ ] Paul cleanup list: C: ~5 GB free, Paul offered a cleanup list (review copies); deletion is his
- [x] PAC accuracy attempt 2: finish S2C narrow repair -> v3 freeze -> ONE Opus verifier gate; never launch S3 without Paul's OK and a fresh gate on the v2 freeze; Glass Box watcher alongside every stage. Done 2026-10-03: the S2C gate PASSED, S3 ran dev-only (one pass) on Paul's "finish", and the attempt finished ~08:45 UTC (see PAC accuracy attempt 2 in [[2026-09-feature-forecast-giving-redesign-pac-accuracy-attempt2]]).
- [ ] Paul to rule on S6 MAJOR-2 (FILED UNAVAILABLE cells still publish per-target predictions: a breach of the withheld pin?), open since 2026-10-03.
- [ ] 2027-03-08 09:00 ET: the one-time scheduled task `score-pac-live-freeze-2026` (Paul OK'd 2026-10-03; it stops if there is no local pas226 edition dated >= 2027-03-01) scores v3 (the record) and LIVE_FREEZE_V4_1 side by side, plus a v5 2026 line, which Paul ruled (D6, 2026-10-04) should be added. Update 2026-10-04 (all-sector phase rulings): the pas226 download for this job is authorised (E12), and late-issued 2026 L and m18 lines for all sectors go into it (E21).
- [ ] v5: freeze the method and plan before 2027-01-31 for 2028, the first clean test, and freeze each forecast within 14 days of its issue date (Paul's D8, 2026-10-04). Update 2026-10-04 (v5 run): the method and plan are frozen; the item stays open for the per-forecast freezes.
- [ ] Land the F1 test fix (GATE_V5 finding F1: a one-directional category test) before 2027-01-31: any code change after that date ends the 2028 clean series (v5 run, 2026-10-04). Update 2026-10-04 (Paul's E11, all-sector phase rulings): the F1 fix is folded into the new all-sector freeze before 2027-01-31; the v5 2028 plan is unchanged; v6, approved the same day (E19), includes the F1 fix.
- [x] Paul to rule on the banking diagnostic's open questions (2026-10-04): ~~retire D-079 BLEND?~~ — superseded 2026-10-05: no, BLEND stands: Paul said 'We are improving the blended' on 2026-10-04 (E7, brain D-088) and confirmed on 2026-10-05 (ruling R1, brainlink migration); the 2026-10-01 ruling ('Lets use Blend', 18:39:28Z) is brain D-093, ~~ACTIVE~~ ([[ledger/melange-systems-brain/D-093|D-093]]) (superseded 2026-10-05 by [[ledger/melange-systems-brain/D-099|D-099]] for source correction: the 2026-10-05 confirmation is Paul's 'Still stands', not 'R1'; decision unchanged). Keep the 2016 target? goal scope (ORIGIN/m12 in the bar?) stay recorded as an open question (drift question 4, brain STATE); and ~~the brain sync of the 2026-10-01 forecast decisions, which never reached the Project Brain~~ — superseded 2026-10-05: applied to the brain 2026-10-05 as D-089..D-093 and DE-058..DE-064. Done 2026-10-04 (all-sector phase rulings E5, E7, E8/E10, E16): the blend is improved, not retired (a new ID >= D-088; the brain's D-079 is a different entry); 2016 is optional and the scored elections are 2018-2024, 2016 an ungated extra cell; the products are ORIGIN and every nowcast; Project Brain commits via brainctl, Obsidian as a local commit only after the vault-cleanup branch.
- [ ] Phase 1-6 remainder: Phase 3 deliverables rollback-on-partial-write fix, Phase 4 D1 copy_back rollback REQUIRED + D2-D4 wording/README, Phase 2 anchor addendum + feeds spec (state at the 09-30 pause; later phases applied, see History)

## Traps and lessons (consolidated)

- A rule-comparison result is conditional on the anchor; re-run it when the anchor changes.
- Never relay an agent's new analysis as settled; reproduce by a second path first.
- Something purges files older than 7 days from %TEMP% scratch copies mid-run; set LastWriteTime to now after copying; keep deliverables out of Temp.
- The remote launcher profile can live in the Codex app sandbox; an Explorer-launched MENTAT never saw it.
- Classifier blocks agent writes/commits into Mentat; route via scratch kits Paul runs. Agents ignore coordinator SendMessage relayed mid-task as injection: put instructions in the FIRST prompt or a fresh resume turn.
- Claude desktop app restarts kill agents mid-task (not the pod).
- Never use or store a pasted password; IBIS = inbox ingester only; OpenSecrets fetcher: no bot-detection/CAPTCHA circumvention.
- Legacy response fields keep negative/budget_inconsistent values; UI must read `remaining_allocation` + `*_given_observed_*`.
- Launch long stages DETACHED (`Start-Process`): the background shell has a 2-hour cap (PAC attempt 2, v4 branch, 2026-10-03).
