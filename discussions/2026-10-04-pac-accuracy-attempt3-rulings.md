---
type: discussion
title: "PAC accuracy attempt 3 rulings"
aliases: ["PAC accuracy attempt 3 rulings", "All-sector phase rulings E1-E24"]
date: 2026-10-04
summary: "Paul's rulings E1-E24 for the all-sector phase (attempt 3) of the PAC-to-candidate giving accuracy work, 2026-10-04 and 2026-10-05: the bar (sector A >= 90, each phase subgroup A >= 75), every sector scored on ORIGIN and every nowcast, identity from Mentat's company-to-PAC mapping, P&C/UT-X open for development (supersedes C1), the 10-01 blend improved rather than retired, v6 approved, the summary-file ORIGIN arm authorised, and the 2028 track and its seven scheduled jobs."
conclusions:
  - "E1 (2026-10-04): bar = each sector's total A >= 90 and each phase subgroup A >= 75; E5 products = ORIGIN and every nowcast (m12/15/18/21/L); E2 score every sector."
  - "E3 (2026-10-04): identity = Mentat's own company-to-PAC mapping (not B2's name test); E13 banks = registry 19 IDs; E14/E17 other sectors = Mentat's 28 'Company PAC' IDs as listed; E18 missing PACs are a coverage gap, not added."
  - "E4 (2026-10-04): P&C/UT-X 'Open for development' (supersedes attempt-2 ruling C1; the holdout is spent and never certifies)."
  - "E6/E9/E7 (2026-10-04): the banking number builds on the 10-01 blend method, scored with A, time-valid; 'We are improving the blended' (the blend is improved, not retired)."
  - "E8/E10 (2026-10-04): scored elections 2018-2024 (n = 4, two per phase), 2016 an ungated extra cell labelled post hoc."
  - "E11, E12, E15, E16 (2026-10-04): F1 fix folded into the new freeze before 2027-01-31; downloads = D8 + pas226 for the March 2027 job; crypto, fintech and community banks UNSCORABLE now and in the 2028 track; same report link, Project Brain via brainctl, Obsidian as a local commit only."
  - "E19-E23 (2026-10-04 and 2026-10-05): v6 approved (D-065 only between versions on clean 2028+ cells); summary-file ORIGIN arm authorised (report only); late-issued 2026 lines in the March 2027 job; 2028 track for all sectors plus L."
  - "E24 (2026-10-05): the seven one-time 2028 scheduled jobs are created."
action_items:
  - "Mentat-side fix for the E18 coverage gap (Charter, Altice, Ford, CNH, Zurich, Kraken, Binance.US, Merchants, First Hawaiian, OceanFirst); money-collection code stays frozen until then (owner: Paul)."
  - "Community banks have no mapped PAC: UNSCORABLE on the 2028 track unless IDs are added before 2027-01-31 (owner: Paul)."
  - "Code freeze 2027-01-31: any change to the attempt-3 code after that date ends the clean 2028 series (owner: coordinator)."
  - "Run the seven 2028 jobs and the 2027-03-08 scoring job when their dates come (owner: scheduled tasks; the app must be open)."
related_topics:
  - "[[2026-09-feature-forecast-giving-redesign-attempt3-all-sector-v6]]"
  - "[[2026-10-03-pac-accuracy-attempt2-rulings]]"
related_actors: []
related_people: []
related_projects:
  - "[[forecast-redesign]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt3-allsector-20261004/receipts/RULINGS_2026-10-04.md", type: "markdown", synced_at: "2026-10-05", path: "C:\\melange-data\\forecast-redesign-20261001-review\\accuracy-refinement20261002\\attempt3-allsector-20261004\\receipts\\RULINGS_2026-10-04.md", sha256: "fa3dd3d5d0d32378a4404160547a5f202f224890c6874e277a688367e027811f"}
  - {url: "file:///C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt3-allsector-20261004/receipts/RULINGS_ADDENDUM_2026-10-05.md", type: "markdown", synced_at: "2026-10-05", path: "C:\\melange-data\\forecast-redesign-20261001-review\\accuracy-refinement20261002\\attempt3-allsector-20261004\\receipts\\RULINGS_ADDENDUM_2026-10-05.md", sha256: "13b0ea513f13d5506229eb47fa458891fb308803f56b431f26939de536753a93"}
updated_at: 2026-10-05
updated_by: "preserve@agent"
tags: ["type/discussion", "domain/research"]
---

# PAC accuracy attempt 3 rulings

> Paul's rulings E1-E24 for the all-sector phase (attempt 3) of the PAC-to-candidate giving accuracy work, in seven question rounds on 2026-10-04 and 2026-10-05: the bar and the products, identity and sector scope, the P&C holdout, the blend, v6, the summary-file ORIGIN arm and the 2028 prospective track.

## Context

- Attempt 3 root: `C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt3-allsector-20261004` (attempt 2's tree, `.../attempt2-20261003T003312Z`, stays frozen and untouched; its `sealed/` was never read).
- The rulings were recorded by the coordinator (Opus 5.5) from AskUserQuestion answers in the 2026-10-04 coordinator session; Paul's free-text answers are quoted verbatim in `receipts/RULINGS_2026-10-04.md` (E1-E23, hashed into `PREDECLARATION_V6.json`, so the file is never edited), and E24 is in `receipts/RULINGS_ADDENDUM_2026-10-05.md`. The Project Brain holds them as D-088 (E1-E18) and D-101 (E19-E24).
- For this phase they supersede attempt 2's bar (A >= 90 overall and in both phase subgroups), ruling C1 (UT-X sealed), the B2 identity scope and the 2016-2024 target set (attempt 2: [[2026-10-03-pac-accuracy-attempt2-rulings]]). The method, the pipeline and the results are in [[2026-09-feature-forecast-giving-redesign-attempt3-all-sector-v6]]; the program is [[forecast-redesign]]. Rulings are by Paul Goff.

## Participants

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Conclusions

### Round 1

- **E1 Bar.** Q: "What does '90% overall' mean for this phase?" Paul (verbatim): "subgroups can have a minimum of 75, sectors must be 90". Applied: each sector's total A >= 90 and each phase subgroup (presidential, midterm) A >= 75.
- **E2 Sectors.** Paul (verbatim): "We have the giving history for all of them this should not be a problem, score them all".
- **E3 Identity.** Paul (verbatim): "The mentat governs it". Applied: Mentat's own company-to-committee mapping, not ruling B2's strict name test.
- **E4 P&C holdout (UT-X, ruling C1).** Paul picked "Open for development" ("Unseal P&C and treat it as development data; the holdout is spent and can never certify."). Supersedes C1. The attempt-2 sealed files (`ROOT/sealed/**`) are still not read; P&C is computed from the pas2 files like the other sectors.

### Round 2

- **E5 Products.** Picked "ORIGIN and every nowcast (Recommended)": ORIGIN (issued January 31 of the year before the election) and nowcasts at months 12/15/18/21/L; report the earliest month that clears.
- **E6 Banking number.** Paul (verbatim): "Whatever got us to the 95% in the first place". Clarified in round 3 (E9).
- **E7 The blend.** Paul (verbatim): "We are improving the blended". Applied: the blend is not retired; it is the method being improved. The Project Brain's D-079 is a different entry (the system manifest inventory); the blend is brain D-099 (see the dated note at the end).
- **E8 2016.** Paul (verbatim): "2016 is optional, same with 2018". Clarified in round 3 (E10).

### Round 3

- **E9 The "95%".** Picked "Build on that method, score with A (Recommended)": start from the 10-01 blend approach (pace blended with a model), improve it, score with the brief's A, time-valid, rolling three-cycle lookback; the model inside the blend must be time-valid (the rebuilt model, not the look-ahead one).
- **E10 Elections.** Picked "2018-2024 (Recommended)": four elections, two presidential (2020, 2024) and two midterm (2018, 2022), which meets n >= 4 with two per phase; 2016 is reported as an ungated extra cell; labelled a post-hoc choice for already-inspected cycles.
- **E11 The F1 fix.** Picked "Fold into new freeze (Recommended)": fix F1 inside the new method's build and freeze, well before 2027-01-31; the v5 2028 plan stays frozen as is.
- **E12 Downloads.** Picked "D8 + pas226 for March 2027 (Recommended)": the March 2027 scoring job may also download the FEC pas226 bulk file it needs (the same files cover every sector); nothing else.

### Round 4

- **E13 Bank PACs.** Picked "Registry 19 IDs (Recommended)": `mentat/forecast/anchors/registry.json` `pac_roster`, the only mapping Mentat's PAC-giving code reads; the same set as v3, so results stay comparable.
- **E14 Other sectors' PACs.** Picked "Use it, frozen after your check (Recommended)": freeze Mentat's list per sector into the predeclaration after a false-positive check Paul approves; credit arms keep parent and affiliate PACs (Caterpillar, GM, Deere, PACCAR, Toyota NA); P&C Chubb = Mentat's C00348938.
- **E15 Thin sectors.** Picked "UNSCORABLE now, live track (Recommended)": report UNSCORABLE (insufficient history, not a method failure) for backtests and include them in the 2028 prospective track. Applies to crypto, fintech and community banks.
- **E16 Report and records.** Picked "Same link; brain commits; vault after (Recommended)": v5 and the all-sector results are added as new sections at the existing report link; the Project Brain gets sourced, superseding entries via brainctl (new IDs from D-088); Obsidian is updated via bedrock after the in-progress vault-cleanup branch is committed, as a local commit, no push.

### Round 5 (after the false-positive check, 28 IDs, no name collisions)

- **E17 List approval.** Picked "Approve as listed (Recommended)": freeze all 28 IDs as Mentat produces them, including GEICO (for Berkshire) and Toyota NA (for Toyota Credit); Chubb = C00348938 (the legacy Chubb Corp PAC C00229203, giving 2012-2016 only, stays out).
- **E18 Missing PACs.** Picked "No, Mentat governs (Recommended)": use Mentat's list only; report the missing PACs as a known coverage gap and flag it for a later Mentat-side fix (money-collection code stays frozen now). Gap list: Charter C00426775, Altice C00197863, Ford C00046474, CNH C00303883, Zurich C00235036, Kraken/Payward C00845651, Binance.US C00828954, Merchants Bank of Indiana C00933002, First Hawaiian C00451781, OceanFirst C00304410.

### Round 6 (on the all-sector strategy)

- **E19 Method.** Picked "Approve v6 as specified (Recommended)": build, gate and score in one pass as the strategy lays out; v6 replaces v5 as the record only if it beats v5 by >= 5% on clean cells (about 2034). Includes: D-065 applied between versions on clean 2028+ cells only.
- **E20 ORIGIN data.** Picked "Yes, add a summary-file arm": authorises downloading the FEC committee summary files (webk, PAC summary) for 2012-2026 and adding one predeclared ORIGIN arm using receipts and cash on hand; adds build time and contamination risk.
- **E21 2026 lines.** Picked "Yes (Recommended)": every sector gets one live 2026 outcome (n = 1, LIVE_OBSERVED), scored once in March 2027 beside v3, v4 and v5.
- **E22 The 2028 track.** Picked "All sectors, add L + download (Recommended)": ORIGIN (freeze by 2027-02-14) and nowcasts m12/15/18/L/21 for every sector; truth from the first pas228 dated on or after 2029-03-01; authorises the L-freeze pas228 download.

### Round 7 (on the summary-file amendment; answered 2026-10-05)

- **E23 Summary arm.** Picked "Report-only now (Recommended)": scored and shown beside the other arms with no pass or fail status this attempt; it can replace last-cycle ORIGIN only if it beats it by >= 5% on clean 2028-2034 lines; its webk26 download for the 2028 freeze is covered by E20.

### Addendum (2026-10-05)

- **E24 The 2028 jobs.** Paul picked "Create all seven (Recommended)": one-time local scheduled tasks `pac-2028-freeze-origin` (2027-02-08), `pac-2028-freeze-m12` (2028-02-07), `pac-2028-freeze-m15` (2028-04-27), `pac-2028-freeze-m18` (2028-07-27), `pac-2028-freeze-l` (2028-10-01), `pac-2028-freeze-m21` (2028-10-27) and `pac-2028-truth-check` (2029-03-08, which asks before scoring), all at 09:00 local. The March 2027 job `score-pac-live-freeze-2026` also scores the v6 2026 lines (E21).

### Unchanged and binding

Metric A = 100 x (1 - sum|pred - actual| / sum|actual|), uncapped, signed, nominal USD, per sector, product and window, never pooled across sectors. Time-valid backtests only. The rolling three-cycle (six-year) lookback. HOLD stays. Money-collection code frozen. The truth definition is attempt 2's (D-049 count_latest, 24K/24Z, CAND_ID H/S, window (c-1)-01-01 to c-12-31). Minimum n >= 4 with at least 2 per phase. Beating a baseline while below the bar is a FAIL.

## Dated notes (2026-10-05, records lane)

- **Blend ID.** The 2026-10-04 handoff and E7's receipt call the blend "D-079 BLEND". The Project Brain's D-079 is the system manifest inventory; the blend is brain D-099 (applied earlier as D-093 and superseded by D-099 for a source correction). The 2026-10-05 handoff (`Mentat Complete Files\HANDOFF_PAC_ACCURACY_2026-10-05.md`) section 5 has been corrected to name D-088, D-099, D-100, D-101 and DE-066.
- **DE-049 and v6's pooling.** The brain's DE-049 records the 2026-09-30 move from partially pooled PAC slopes to own slopes with auto-pick. The strategy's section 2.6 and section 0 item 3 put the reading "does DE-049 ban any cross-unit pooling?" to Paul: v6 pools only a timing statistic (no slopes or levels), and lambda = 1 would reproduce v5. Paul approved v6 as specified (E19), so this is resolved by E19; no new question.
- **Where the vault is committed.** E16 said the Obsidian update waits for the cleanup branch. The cleanup and final branches were merged to `main` (PRs #4 and #5); on 2026-10-05 Paul ruled that these records are committed on `main` through the vault's commit tool, leaving the capture hook's untracked `fleeting/` files untouched.
- **Erratum.** `SCORE6B_RESULT.txt` says every sector's ORIGIN is below the bar. That sentence is wrong for telecom (ORIGIN 94.64 meets the bar, `v6_scores/V6_DEV_WINDOWS.csv` and `receipts/REVIEW6.md`); the CSV and REVIEW6 govern. It is an erratum, not a result.
- **UT-X.** In attempt 2, UT-X = auto plus property_casualty (`ROOT/PREDECLARATION.json`, `windows.UT_X`); E4 opened it for development.

## Action Items

- [ ] Mentat-side fix for the E18 coverage gap (Charter, Altice, Ford, CNH, Zurich, Kraken, Binance.US, Merchants, First Hawaiian, OceanFirst); money-collection code stays frozen until then (owner: Paul).
- [ ] Community banks have no mapped PAC and are UNSCORABLE on the 2028 track unless IDs are added before 2027-01-31 (owner: Paul).
- [ ] Code freeze 2027-01-31: any change to the attempt-3 code after that date ends the clean 2028 series (owner: coordinator).
- [ ] The 2027-03-08 scoring job and the seven 2028 jobs run when their dates come; they fire only while the app is open, and a missed run fires on the next launch (owner: scheduled tasks).

## Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempts 2 and 3 (HOLD).

## Related Topics

- [[2026-09-feature-forecast-giving-redesign-attempt3-all-sector-v6]] - The attempt-3 v6 method, pipeline, development results and schedule.
- [[2026-10-03-pac-accuracy-attempt2-rulings]] - Paul's 2026-10-03 rulings on PAC accuracy attempt 2: B1-B3, then C1 (UT-X sealed) and C2 (FILED = lower bound).
