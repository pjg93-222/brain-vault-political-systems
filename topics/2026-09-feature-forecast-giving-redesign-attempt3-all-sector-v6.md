---
type: topic
title: "PAC accuracy attempt 3: all-sector v6 method, results and schedule (Forecast audit, giving-view redesign and PAC accuracy)"
aliases: ["Forecast audit, giving-view redesign and PAC accuracy: PAC accuracy attempt 3, all-sector v6"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-10-04
sources: []
updated_at: 2026-10-05
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
part_of: "[[2026-09-feature-forecast-giving-redesign]]"
---

# PAC accuracy attempt 3: all-sector v6 method, results and schedule (Forecast audit, giving-view redesign and PAC accuracy)

> The all-sector phase of the PAC-to-candidate giving accuracy work: the v6 method, the gated build and one-pass development scoring of 2026-10-04/05, the results by sector and product against the E1 bar, the ORIGIN dead end, the labels and the scheduled jobs. Part of [[2026-09-feature-forecast-giving-redesign]] (project [[forecast-redesign]]); Paul's rulings E1-E24 are in [[2026-10-04-pac-accuracy-attempt3-rulings]].

## Where it stands (handoff of 2026-10-05)

Source of record: `C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\HANDOFF_PAC_ACCURACY_2026-10-05.md` (it supersedes the 2026-10-04 handoff for current state; that file stays as the attempt-2 record). Development results were scored once; the bar is met in some sector and product cells and not in others. Nothing certifies and HOLD is unchanged.

- Attempt 3 root (NEWROOT): `C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt3-allsector-20261004`. Attempt 2's root (frozen, untouched, `sealed/` never read): `.../attempt2-20261003T003312Z`.
- Report (same link, version 3): https://claude.ai/artifact/FatsU6m8xyePv2QnTTdyCx (page file `NEWROOT/report/report.html`; sections 12 v5 RESCORE, 13 all sectors v6, 14 schedule).
- Records: Project Brain D-088 (rulings E1-E18), D-100 (attempt 2), D-101 (v6 method and results), DE-066 and its narrowed successor DE-067 (the ORIGIN dead end) and the brain STATE bullet "MENTAT PAC GIVING FORECAST ACCURACY"; receipt `NEWROOT/receipts/RECORDS_2026-10-05.md`. The blend is brain D-099, not D-079 (the manifest inventory).

## Method v6 (`PREDECLARATION_V6.json`; `strategy/STRATEGY_ALLSECTOR.md`; `strategy/STRATEGY_AMENDMENT_ORIGIN_SUMMARY.md`)

- **ORIGIN** = the last cycle's total (B1).
- **NOWCAST** = the v5 remaining-period blend (3-cycle pace and B1, 50/50) with each sector's 3-cycle pace shrunk toward the five-sector median pace by lambda = N/(N+1), N = 1/HHI. No tuning and no selection. Only a timing statistic is pooled across sectors, with a fixed prior weight; no slope or level is pooled.
- **Arms:** BASELINE (persistence), REF_V5, PRIMARY_V6, CONTEXT_PT (context only), ORIGIN_SUMMARY (report only, E23: B1 x sqrt(rho), rho = net fundraising over net spending of cycle t-2, capped to [1/2, 2]).
- **Rules kept:** metric A, rolling three-cycle lookback and time-valid backtests are unchanged (see the rulings note); D-065 applies only between versions, on clean 2028+ cells (E19); v6 replaces v5 as the record only if it beats v5 by 5% or more on clean cells (about 2034).

## Pipeline run (receipts in `NEWROOT/receipts`)

STRAT3 (Opus) -> STRAT3B (Opus) -> BUILD6 (died in turn 1, an OAuth clash) -> BUILD6B (built, 64/64 tests) -> GATE6 BLOCKED (gate-receipt format, two labels) -> BUILD6R -> GATE6B PASS -> SCORE6 crashed before output (summary parser, '.12') -> BUILD6R2 -> GATE6C PASS -> SCORE6B (one FIRST_LOOK pass, lock engaged) -> REVIEW6 ACCEPT_WITH_NOTES (17 cells recomputed, all match). Every frozen 2026 prediction stayed byte-identical through both repairs, and the attempt-2 tree was unchanged throughout.

## Results (PRIMARY_V6, A overall with presidential/midterm subgroups where the bar's margin matters; development, inspected window; nothing certifies)

The E1 bar: sector total A >= 90 and each phase subgroup A >= 75.

| Sector (label) | ORIGIN | m12 | m15 | m18 | m21 | L |
|---|---|---|---|---|---|---|
| Banks (RESCORE) | 86.11 FAIL | 93.65 meets | 96.01 meets | 96.41 meets | 97.01 meets | 98.00 meets |
| SchoolsFirst (RESCORE) | 66.00 FAIL | 69.78 FAIL | 66.48 FAIL | 70.33 FAIL | 92.53 meets (89.20/97.00) | 71.08 FAIL |
| P&C (FIRST_LOOK_DEV) | 85.16 FAIL | 89.02 FAIL | 90.31 meets (86.18/93.85) | 94.59 meets | 95.77 meets | 94.92 meets |
| Credit arms (FIRST_LOOK_DEV) | 89.67 FAIL | 91.67 meets (94.81/88.31) | 93.90 meets | 97.09 meets | 98.96 meets | 97.69 meets |
| Telecom (FIRST_LOOK_DEV) | 94.64 meets | 92.67 meets (-1.97 vs baseline) | 94.48 meets (-0.15) | 95.72 meets | 97.33 meets | 96.31 meets |
| Crypto, fintech, community banks | UNSCORABLE (no PAC giving before 2022, or no mapped PAC) | | | | | |

- Only telecom meets the bar in every product.
- ORIGIN misses for banks, P&C and credit arms come from the common 2022 drop (banks -25.5%, P&C -23.8%, credit arms -17.8% against 2020), invisible on 2021-01-31. SchoolsFirst is one PAC whose 2024 surge is visible only at m21.
- Fragile under leave-one-target-out: P&C m12 and m15, credit arms m12; banks ORIGIN would meet the bar without 2022.
- ORIGIN_SUMMARY (report only): banks 83.18, SchoolsFirst 67.07, P&C 85.08, credit arms 91.74, telecom 94.71; it could not foresee 2022.
- Labels: banks and SchoolsFirst RESCORE; P&C, credit arms and telecom FIRST_LOOK_DEV; 2016 is an ungated extra cell. The v5 RESCORE of attempt 2 (post hoc) is in report section 12; v3 stays the attempt-2 record.
- **Erratum (2026-10-05):** `SCORE6B_RESULT.txt` says every sector's ORIGIN is below the bar. That is wrong for telecom (94.64, FIRST_LOOK_DEV_OBSERVED_PASS in `v6_scores/V6_DEV_WINDOWS.csv` and in REVIEW6); the CSV and REVIEW6 govern.

## The ORIGIN dead end (brain DE-066, narrowed by DE-067)

STRATEGY_ALLSECTOR.md section 1.2 proves that a rule that never predicts outside its window's lowest-to-highest level cannot reach A >= 90 for banks, SchoolsFirst or P&C at ORIGIN. After Paul's review the claim was narrowed to what the proof covers: "PAC giving ORIGIN from giving-history window-range rules (and the summary-file arm) cannot reach A >= 90 for banks, SchoolsFirst, P&C under the six-year rolling lookback (2018-2024)". Not covered: an extrapolating predictor, credit arms (89.67, 0.33 below the bar) and telecom (meets with B1).

## Scheduled (local Claude scheduled tasks; they fire only while the app is open, and missed runs fire on the next launch)

- `score-pac-live-freeze-2026`, 2027-03-08 09:00: scores the v3, v4, v5 and v6 2026 lines (m18 and L, all sectors) against the first pas226 dated on or after 2027-03-01 (it may download that file, E12). LIVE_OBSERVED, n = 1.
- `pac-2028-freeze-origin` 2027-02-08 (deadline 2027-02-14; pas226 and webk26), `pac-2028-freeze-m12` 2028-02-07, `pac-2028-freeze-m15` 2028-04-27, `pac-2028-freeze-m18` 2028-07-27, `pac-2028-freeze-l` 2028-10-01, `pac-2028-freeze-m21` 2028-10-27, `pac-2028-truth-check` 2029-03-08 (prepares and asks before scoring). Each re-arms daily until its deadline if FEC has not posted the edition.
- **Code freeze 2027-01-31:** any change to the NEWROOT code after that date ends the clean 2028 series. The first clean status needs 2028 to 2034 (about March 2035).

## Open items (handoff section 7)

- Two stray `claude auth login` processes (PIDs 65904 and 66672) probably caused the BUILD6 OAuth clash; Paul may close them.
- A stray file in NEWROOT literally named `'Read,Glob,Grep,Edit,Write,Bash'` (2,865 bytes, from a launcher call); harmless, left in place.
- The stages wrote notes to a Claude memory folder for the attempt-3 path (outside NEWROOT); disclosed (REVIEW6 N2).
- Mentat coverage gap (E18) for a later Mentat-side fix; money collection stays frozen.
- Community banks have no mapped PAC: UNSCORABLE on the 2028 track unless IDs are added before 2027-01-31.
- Brain D-065 against v5 D1 is resolved by E19 only for this lane.

## Operating notes

- Launcher `NEWROOT/code/launch_stage.ps1`: `-Effort high` only; `-AllowedTools` is one quoted string; pass deny-glob arrays through `-Command`, not `-File`; Opus stages need `-ReadOnly` and `-ResultTextFile`. The watcher can race the wrapper: judge by artifacts and `<STAGE>_RESULT.json`.
- `RULINGS_2026-10-04.md` is hashed into `PREDECLARATION_V6.json`: never edit it; add addenda.
- GateGuard asks for facts on each first write; answer and retry.


## Look-ledger cross-reference (2026-10-05)

The [[single-look-holdout-discipline-look-ledger]] now records the SCORE6B development look, preserving its FIRST_LOOK run mode, sector evidence labels and non-certifying status.
