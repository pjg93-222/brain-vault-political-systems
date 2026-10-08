---
type: topic
title: "Giving by cycle live model, 2026-10-07/08: Board A, the cycle-aware 50/50, the panel nowcast for company PACs and the blind results (Forecast audit, giving-view redesign and PAC accuracy)"
aliases: ["Forecast audit, giving-view redesign and PAC accuracy: Giving by cycle live model, 2026-10-07/08"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-10-08
sources: []
updated_at: 2026-10-08
updated_by: "records-repair@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
part_of: "[[2026-09-feature-forecast-giving-redesign]]"
---

# Giving by cycle live model, 2026-10-07/08: Board A, the cycle-aware 50/50, the panel nowcast for company PACs and the blind results (Forecast audit, giving-view redesign and PAC accuracy)

> Part of [[2026-09-feature-forecast-giving-redesign]] (project [[forecast-redesign]]). The overnight and next-day work of 2026-10-07/08 on the Giving by cycle view: the Board A layout, the cycle-aware 50/50 model that replaced the 2026-09-30 bundle, the move of company PACs to the PAC panel's nowcast, the credit-union cohort, the blind accuracy checks and the PAC panel's attempt 4 rulings (brain D-113 to D-118).

## Where it stands (2026-10-08)

- Everything below is LIVE on the console ([[mentat-console]], port 8806) and UNCOMMITTED in `C:\Users\pgoff\Mentat` (branch `codex/mentat-crypto`, HEAD `f340dc84e`). 8806 was restarted on 2026-10-07 at 14:10 (pid 32372) and 15:19 (pid 58720) and on 2026-10-08 at 11:46 (pid 65296) and 12:36 (pid 27944, the current listener).
- The full record, with file hashes, backups and an undo for every change, is `C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\FORECAST_OVERNIGHT_2026-10-07\CHANGES.md` (entries 1-14; entry 14, the presidential-cycle uplift of D-118, stopped at step 1 with nothing applied). Blind results: `...\blind\RESULTS.md` (the cycle model) and `...\blind\panel_RESULTS.md` (the panel nowcast).
- Brain records: [[ledger/melange-systems-brain/D-113|D-113]] to [[ledger/melange-systems-brain/D-118|D-118]]; the ledger notes reach GitHub through Paul's vault PR flow.

## What is live

- **Layout and inputs ([[ledger/melange-systems-brain/D-114|D-114]]).** Paul asked that the growth inputs always open on the industry defaults and that nothing wait for a Calculate button; he picked Board A of three mock-ups (A, B, C in `mockups\`). One chart with a fixed axis, an Assumptions rail that recalculates as you type (300 ms pause), a party split for the selected industry, and everything else in one "Methods, tests and all populations" fold. The chart's PAC tab reads "Company PACs".
- **Cycle-aware 50/50 model ([[ledger/melange-systems-brain/D-113|D-113]]).** Published on 2026-10-07: the pointer `giving-models-current.json` now names bundle `d516dba6...` (model `refit-20261007-d861bf29-79211caa154e`, switched 2026-10-07T17:38:26Z); the previous bundle `7bc7bcf1...` (`refit-20260930-377f7324-c3f221343515`) stays for rollback. Paul's four answers of 2026-10-07T09:25:19Z: publish; adopt the PAC spec despite the auto leave-one-election-out conflict; keep the Senate presidential-year term; growth enters through the 50/50 (half the prior cycle, half the IBISWorld budget, with the one-year lag). The model accounts for presidential versus midterm cycles, trajectory and inflation ([[ledger/melange-systems-brain/D-092|D-092]]) and builds 2027-28 on top of 2025-26.
- **Gates of the publish.** Decision PUBLISH with G4, G6 and G9 at WARN. G4: auto lobbying withheld. G6: 14 cells no worse than the published calculator; two owner waivers cover what failed (the auto PAC cell, "1. Yes", and the Senate control cells in all four industries, "2. Keep senate in"). G9: House and Senate party-mix models lose to a naive forecast in the chronological backtest (and log lobbying does not beat naive). The Senate presidential term worsens the Senate error by 1.32 to 1.76 times, not the 2% the spec quoted; CHANGES.md 3.4 flags this for Paul to re-confirm.
- **Stale-page guard.** The page sends a `growth_basis` marker; an old page gets HTTP 400 ("This page is out of date. Reload the page...").
- **Company PACs on the panel nowcast ([[ledger/melange-systems-brain/D-116|D-116]], CHANGES entry 12).** Paul, 2026-10-08: "use the panel's nowcast for company PACs, drop the 50/50". For the open cycle 2025-26 the D-099 BLEND is replaced by the PAC panel's R8 nowcast, nowcast = O + (1 - s) x B (O = giving observed to the pace month, B = the 2023-24 total of the same roster, s = geometric-mean share of the same cut in 2020, 2022 and 2024); the range is the three prior cycles' pace, not a 95% interval. No 50/50 for company PACs on either horizon. General giving keeps the 50/50 and P1 conditioning. The bundle still says BLEND for company PACs; the app overrides it in code.
- **Credit unions on 16 PACs ([[ledger/melange-systems-brain/D-117|D-117]], CHANGES entry 13).** Paul: "restart 8806 and use the 16 credit union PACs". The credit-union company-PAC measure uses the published panel's current frame (16 PACs, cut 2026-09-26) instead of the single SchoolsFirst PAC, and equals the panel's own published nowcast to the cent. The credit-union party split stays on the earlier single-PAC roster and says so.
- **Presidential-cycle uplift ([[ledger/melange-systems-brain/D-118|D-118]], CHANGES entry 14, stopped at step 1).** Paul's rule: a presidential cycle always projects higher than the preceding midterm; company PACs 2027-28 get an uplift instead of the fitted near-zero cycle effect (-0.025); lobbying stays excluded. The size was to come from data: the national all-PAC ratio of a presidential cycle to its preceding midterm, in real 2025 dollars, is u = 0.9812 (2016/2014 0.9969, 2020/2018 0.9640, 2024/2022 0.9829; nominal geometric mean 1.0295), below 1, and 2027-28 exceeds 2025-26 only when u is above 1.0853. Nothing was applied and the calculator is unchanged; step 2 waits for Paul's size or basis.
- **Banks at the defaults, 2025 dollars (entries 10 and 12; unchanged by entry 14).** General giving $13.86M (2025-26) and $22.87M (2027-28); company PACs $6.06M (panel nowcast; BLEND had $6.28M) and $5.44M. Credit-union company PACs on the 16-PAC cohort: $2.55M and $2.29M (single PAC: $72.9K and $65.5K).

## Blind accuracy

- **Cycle model (`blind\RESULTS.md`, 2026-10-07; chronological, issue-date, 2018-2024).** Only one live number had a passing blind record: banks company PACs at month 18 under BLEND, 90.2 on the PAC lane's metric A. The 50/50 overlay lowered the blind score in 12 of 16 comparisons, raised it in 2 and was neutral in 2. Banks general giving under P1 was biased high in the cycles that can be checked, yet 2026 is the opposite case (the model sits below the money already given); the pace implies $16.9M to $19.4M against P1's $13.86M, a two-cycle inference and not a scored result.
- **Panel nowcast (`blind\panel_RESULTS.md`, 2026-10-08).** 80 forecasts (5 cohorts x 4 cuts x 4 targets) rebuilt from the panel's pinned ledgers: blind A equals in-sample A in every cell to 1e-6, and the nowcast passes the bar (overall at least 90, each phase at least 75) in 19 of 20 sector x cut cells. P&C at month 12 (89.36) fails. For credit unions the nowcast loses to repeating the last cycle at months 12 and 15 (91.2 and 92.5 against 94.1).
- **Banks company PACs at month 18 (CHANGES entry 12).** Panel nowcast 97.8, BLEND 90.2, pace alone 96.0, model without the 50/50 92.6. Credit unions: the one-PAC roster scored 70.5 (2024 miss -49%); the 16-PAC cohort scores 94.9, but about 90% of its 2024 dollars are one trade association's two committees, so widening changes what is measured more than it fixes the method.
- **Caveats.** The method was chosen by the owner after the BLEND scores were known, so this compares two chosen layers and does not validate either; rosters are today's lists; the FEC files include later amendments; four targets per cell.

## PAC panel, attempt 4 ([[ledger/melange-systems-brain/D-115|D-115]])

The 2026-10-05/06 Codex-lane rulings never reached the brain until 2026-10-07. The published PAC-to-candidate panel (R9 to R13): IBIS growth enters with a one-year lag; IBIS enters ORIGIN only (the nowcasts stay R8); ORIGIN is 50% of the prior-cycle PAC giving and 50% of the IBIS budget; deployed as `pac-r12-origin-half-r8-nowcast-v1` (Paul, 2026-10-06T02:33:40Z, "Lets deploy it, don't make any not of the fail, its good enough"). Sources are named in D-115. The panel is what the console's company-PAC nowcast now reads (see [[giving-forecast-pipeline]] for the bundle mechanics).

## Open items

- The D-118 uplift size or basis: the data show no real-dollar uplift (u = 0.9812; break-even 1.0853); Paul must rule a size, a nominal basis or another population (open question in the brain STATE).
- Real versus nominal dollars: D-092 says projections are shown in nominal dollars by default; the page shows real 2025 dollars; Paul never answered (open question in the brain STATE).
- Nothing is committed. `giving_forecast.py` now imports the untracked `pac_giving_forecast` module, so that module and the PAC bundle files must be committed with the change.
- Banks general giving may be low (see the pace remark above); the model refuses as-of dates from 2027-01-01 until the anchors are rebuilt.
- Full rollback of the 2026-10-07 publish: `apply3\APPLY.ps1 -Rollback`, restore the page from `backups\3\js\`, press Restart in the console (CHANGES.md, "Full rollback").
