---
type: fleeting
title: "Pac accuracy six year lookback directive (2026-10-03)"
aliases: ["pac-accuracy-six-year-lookback-directive-2026-10-03"]
source: "session"
captured_at: 2026-10-05
created_at: 2026-10-05
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[single-look-holdout-discipline]]"
  - "[[forecast-redesign]]"
  - "[[2026-09-feature-forecast-giving-redesign]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-six-year-lookback-directive-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-05", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-six-year-lookback-directive-2026-10-03.md", sha256: "df58a8d72c36127f4bfe1b204c69a5d1c67bc64fa8a4b935439291ceec49ce9b"}
updated_at: 2026-10-05
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Pac accuracy six year lookback directive (2026-10-03)

> Paul 2026-10-03 — PAC giving forecast accuracy work may look back only 6 years; gains must come from methodology, not more history; v4 (2008/2010 history) = regression

## Content

Paul, 2026-10-03, after the attempt-2 v4 RESCORE: "For further accuracy we should only be looking 6 years back from current, not more years, what needs to improve is methodology, I consider this overall a regression."

- Never propose adding older history (pre-2012 files, longer pace sets, more cycles) as an accuracy lever again.
- Accuracy proposals must change methodology (model form, selection, pace estimation, cohort handling, nowcast blending), within a 6-year lookback.
- The v4 branch (pas208/pas210 as history) is judged a regression; v3 stays the attempt-2 record.

**Why:** v4 added 2008/2010 and banks nowcasts got worse (m15 92.33→86.38), driven by the 2010 outlier cycle; Paul reads more history as noise, not signal.

**Ruled same day:** "6 years back" = ROLLING — each forecast uses only the 3 prior cycles (6 years) before its own issue date; the 2016–2024 backtests still run. The current v3 reads up to 4 cycles back in some pace sets, so a methodology attempt must trim that. March 2027 job: keep scoring BOTH v3 (record) and v4 (labelled post-hoc regression).

**v5 rulings (Paul, 2026-10-04, on strategy/V5_AMENDMENT.md):** D1 strict cap (Cap-W: whole information set inside the 3 prior cycles → no nested selection); D3/D4 primary = fixed rule: ORIGIN = B1, NOWCAST = equal-weight 3-cycle window pace blended 50/50 with B1 in remaining-period space (K1+K2), N2/N4/N5 and selection dropped; D6 YES add v5 2026 line to the March 2027 job (v3 stays reference); D8 YES prepare 2028 as first clean test and AUTHORISE the needed FEC downloads (method+plan frozen before 2027-01-31; each forecast frozen within 14 days of its issue date). Coordinator defaults (not objected): D2 exclude 2010, D5 three arms CAP_W/CAP_S/PA, D7 no on-time 2026 m21 line, D9 Sonnet builds (standing 10-01 rule).

**v5 run (2026-10-04):** V5-B (as V5B3 after a CLI re-login) → GATE_V5 PASS (F1: one-directional category test, code verified) → V5-R one pass → V5-V ACCEPT_WITH_NOTES. RESCORE (post hoc): banks nowcasts up (m12 89.32→92.34, m15 →94.58, m18 →94.53, L →97.44; m21 97.26→96.85); SchoolsFirst m21 91.38 FAIL_SUBGROUP → 93.19 RESCORE_OBSERVED_PASS; ORIGIN banks unchanged. The BLEND drives gains, the cap alone mostly costs accuracy. Fragile: banks m12 status change rests on outer 2016 (post-hoc target), SchoolsFirst m21 on 2024; 3 SchoolsFirst cells flip under leave-one-out. v3 stays the record. 2028 track: method/plan frozen; any code change after 2027-01-31 ends the clean series (so an F1 test fix must land before then).

**Banking 95% provenance (diagnostic rev 2, 2026-10-04, `Mentat Complete Files\DIAGNOSTIC_BANKING_ACCURACY_2026-10-04.md`; rev 1 was WRONG to call it post hoc / never told to Paul):** Paul WAS told on 2026-10-01 14:42 ET "about 95%. A fair range is 95–98%" for the banks blend forecast as of month 18 (pre-registered pace test; 95% = leave-one-out, 6 elections, unweighted log error, not time-valid; 98% = time-ordered; old look-ahead model inside the blend). Rescored with A on 10-02: m18 pace 95.86, blend 97.89. Attempt 2 m18 = 93.40 (2018–24) / 91.70 (2016–24). ~~Production blend (rebuilt model) backtests ~93–94%.~~ — superseded 2026-10-05: nothing from the 2026-10-01 model rebuild was published (Paul, 2026-10-05, ruling R3 of the brainlink migration); the live pointer mentat/app/data/giving-models-current.json is still refit-20260930-377f7324-c3f221343515 (switched_at_utc 2026-09-30T21:53:03Z) and the rebuild report is headed "scratch build, nothing published" (source: C:\Users\pgoff\Mentat\mentat\app\data\giving-models-current.json; C:\melange-data\forecast-redesign-20260930\phase20261001\refit\REPORT.md:1). The 93–94% appears to be the scratch candidate's backtest, not a production result (inferred; see the diagnostic's line 52 claim). Never ORIGIN or m12. Never argue with Paul's recollection of a figure — search transcripts first. Same measure in attempt 2 still ~95–97 (m21 97.26, L 96.30). m18 drop 95.86→91.70 = adding 2016 target (~−2.2) + N2 selection (~−1.7). Open for Paul: ~~retire D-079 BLEND?~~ — superseded 2026-10-05: no, BLEND stands. Paul said "We are improving the blended" on 2026-10-04 (E7, recorded in brain D-088) and confirmed on 2026-10-05 (ruling R1 of the brainlink migration; source: Paul's answer "Still stands", 2026-10-05T01:58:54.398Z, Claude Code session 2a1f8c4b-6c8d-4cc7-9241-449e010db5ef, transcript line 908) that BLEND still stands; the 10-01 BLEND ruling ("Lets use Blend", 2026-10-01T18:39:28Z) is brain D-099, ACTIVE (D-093, superseded by D-099 for source correction) (the brain's own earlier D-079 is the unrelated manifest rebuild) keep 2016? goal scope (ORIGIN/m12 in the bar?), ~~brain sync (10-01 forecast decisions never reached the Project Brain; Obsidian note `Documents\brain\projects\forecast-redesign.md` stale)~~ — superseded 2026-10-05: applied via brainctl (D-075..D-079 are now D-089..D-093, DE-054..DE-060 are now DE-058..DE-064; D-093, superseded by D-099 for source correction) and the Obsidian note was corrected by supersession marks on vault branch brainlink-golive-2026-10-05 (see `brainlink-knowledge-system-2026-10-05`).

**All-sector phase rulings (Paul, 2026-10-04, attempt 3; full verbatim receipt `C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt3-allsector-20261004/receipts/RULINGS_2026-10-04.md`):** E1 bar "subgroups can have a minimum of 75, sectors must be 90" (sector total A>=90, each phase subgroup A>=75). E2 "We have the giving history for all of them this should not be a problem, score them all". E3 identity "The mentat governs it" (Mentat's company-to-PAC mapping, not B2's name test). E4 P&C/UT-X "Open for development" (supersedes C1; holdout spent, never certifies). E5 products = ORIGIN and every nowcast (m12/15/18/21/L). E6 banking number "Whatever got us to the 95% in the first place" -> E9 clarified: build on the 10-01 blend METHOD, score with A, time-valid, rolling cap, time-valid model inside the blend. E7 D-079 blend "We are improving the blended" (not retired; brain's D-079 is a different entry, blend needs a new ID >= D-088; applied 2026-10-05 as D-093, now D-099; D-093, superseded by D-099 for source correction). E8 "2016 is optional, same with 2018" -> E10 scored elections 2018-2024 (2016 ungated extra cell; post-hoc label). E11 F1 fix folded into the new all-sector freeze before 2027-01-31; v5 2028 plan unchanged. E12 downloads = D8 + pas226 for the March 2027 job, nothing else. E13 banks = registry 19 IDs. E14 other sectors = Mentat report "Company PAC" list, frozen after a false-positive check Paul approves (credit arms keep parent PACs; Chubb = C00348938). E15 crypto/fintech/community banks UNSCORABLE now (no PAC giving before 2022), included in 2028 prospective track. E16 report = same artifact link (add v5 + all-sector sections); Project Brain commits via brainctl; Obsidian after the in-progress vault-cleanup branch is committed, local commit only. E17 Mentat's 28 non-bank PAC IDs approved as listed (GEICO for Berkshire, Toyota NA for Toyota Credit; Chubb C00348938). E18 missing PACs (Charter, Altice, Ford, CNH, Zurich, Kraken, Binance.US, Merchants, First Hawaiian, OceanFirst) NOT added: "Mentat governs", reported as a coverage gap. E19 v6 approved (ORIGIN B1; nowcast v5 blend + N/(N+1) cross-sector pace shrinkage; F1 fix; arms persistence/v5/v6/context phase; D-065 only between versions on clean 2028+ cells). E20 YES: FEC PAC summary files (webk) download authorised + one predeclared ORIGIN arm using receipts/cash on hand. E21 YES late-issued 2026 L/m18 lines for all sectors into the March 2027 job. E22 2028 track all sectors + L product + its pas228 download. STRAT3 found ORIGIN cannot reach 90 for banks/SchoolsFirst/P&C with any window-range rule (2022 common shock).

**How to apply:** In any PAC-accuracy strategy, predeclaration or review, cap every model input and pace set at the 3 cycles before the forecast's issue date, and frame every candidate improvement as a methodology change. Related: `pac-accuracy-attempt2-lane-2026-10-03`.

## Possible Connections

- [[single-look-holdout-discipline]] — holds an earlier version of this memory file; this note carries the newer text
- [[forecast-redesign]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-09-feature-forecast-giving-redesign]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-05 from the Claude Code memory file `pac-accuracy-six-year-lookback-directive-2026-10-03.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[single-look-holdout-discipline]], [[forecast-redesign]], [[2026-09-feature-forecast-giving-redesign]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
