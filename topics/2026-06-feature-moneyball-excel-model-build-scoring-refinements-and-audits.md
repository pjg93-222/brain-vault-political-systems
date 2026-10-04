---
type: topic
title: "Press alignment, CFPB split, committee scoring and the June 25 audits (Moneyball Excel model build)"
aliases: ["Moneyball Excel model build (June 2026): Press alignment, CFPB split, committee scoring and the June 25 audits"]
category: "feature"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-06-22
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/data", "category/feature"]
part_of: "[[2026-06-feature-moneyball-excel-model-build]]"
---

# Press alignment, CFPB split, committee scoring and the June 25 audits (Moneyball Excel model build)

> Scoring refinements of 2026-06-24/25: press raw alignment, the CFPB directional split, relevance-tiered committee influence scoring, the presentation audit with the percentile-rank 4-pillar blend, and the Blended workbook audit. Part of [[2026-06-feature-moneyball-excel-model-build]] (project [[melange-systems]]).

## Press raw alignment (2026-06-24)

Reshaping `cu_press_value_by_category_wide.csv` (bioguide, member, 19 category cols) to drop onto the **Press Release - Raw** sheet of `Moneyball Main Version - Presentation.xlsx`. Output: `cu_press_value_by_category_RAW_aligned.xlsx`, single sheet `Mapped`, 533 rows aligned exactly to raw rows 2-534. The 2 CSV-only members (James Moylan M001219, Stacey Plaskett P000610) were explicitly dropped per user request (no row on the raw page).

Non-obvious alignment facts (likely to recur when press scores are re-mapped):
- **Raw page column order** (the canonical sequence to match): member, chamber, state, party, then Examination & Supervision, Credit Union Capital Requirements, NCUA Budget & Share Insurance Fund, Interchange, Payments, Technology & Emerging Issues, Fraud Prevention, Data Privacy & Cybersecurity, Charter Modernization & Governance, Defense Credit Union Issues, Field of Membership, Credit Union Tax Status, CDFI Fund, CU-Bank Competitive Dynamics, CFPB Issues & Structural Reform, Credit Card & Consumer-Fee Mandates, **Telephone Consumer Protection Act**, Member Business Lending, Mortgage Lending & Housing, General Credit Union (20 categories).
- **TCPA gotcha**: raw page has `Telephone Consumer Protection Act`; the by-category CSV does NOT. Fill 0 to preserve sequence, but it is "no data", not a real zero.
- **Member gaps**: raw page has 533 real members (row 535 = `Weights` footer, skip it). 40 raw members have no row in the press CSV, 0-filled. 2 CSV members are absent from the raw page entirely: James Moylan (M001219), Stacey Plaskett (P000610).
- **NA to 0 trap**: `pd.read_csv` turns literal `"NA"` into NaN by default, writing invalid cells. Use `keep_default_na=False` then map `''`/`NA` to 0.0; keep negatives and sci-notation as-is.
- Names match exactly across both (accents included), no duplicates, so name is a safe join key here.
- Relates to `project_moneyball_model`, `project_moneyball_integrated_scraper`.

## CFPB directional split (2026-06-25)

Split the single "CFPB Issues & Structural Reform" legislative topic into two directional topics (also feeds CU stance and sentiment scoring). Driven by the user-tagged `CFPB Bills` tab: Direction +1 Reduce (49 bills) / 0 Neutral (6) / -1 Expand (5).

- **Structure (uniform with the other 17 topics)**:
  - **CFPB Restrain** = +1 bills, reused the in-place block cols 99-106 (CU:DB), renamed; legislative weight **+0.5**. Extended its R&A!D formula range from 4-col `CU:CX` to 5-col `CU:CY` to include the regular Co-Sponsor column (was unlabeled/omitted; user confirmed the fix).
  - **CFPB Reach (-)** = -1 bills, NEW appended block cols 145-152 (EO:EV), outside the Excel Tables; legislative weight **-1.0** (user chose a heavier penalty on expansion).
  - Neutral excluded. Avg + Success-Rate columns deliberately 0 (weight-0 by design, see `feedback_spreadsheet_consult_on_errors`). Only Sponsor (0.286) / OrigCosp (0.143) / Cosp (0.0714) weighted.
  - Aggregation = sum of DecayWeight per member/role from Sponsor + Original Co-Sponsor + Co-Sponsor Interactions sheets, joined to CFPB Bills by bill number (Title col), filtered by direction. 100% join. Verified 3198 cells, 0 mismatches.
- **Result**: Reach members penalized (Al Green #119, McGarvey #142, Whitehouse #509); Restrain champions strong (R. Williams #4, Hill #7, Barr #16). Warren #14: Reach penalty on legislative but committee influence keeps her high (influence-not-alignment).
- **COM GOTCHA (historical, for future model edits in that era)**: the PowerShell-to-Excel COM environment threw InvalidCastException ("cast Double/Object[,] to String") on scalar AND 2D-array NUMERIC `.Value2` writes. Workaround: write numbers as invariant-culture numeric STRINGS via `.Formula` (Excel parses to number); strings/formulas via `.Value2`/`.Formula` fine. Also `Remove-Item $var` in a script gets blocked by a path guard, so avoid temp-file cleanup in COM scripts.
- **Open**: the Legislative Score - Raw matrix is regenerated by `congress_member_scraper.R` (`project_moneyball_integrated_scraper`); the split is workbook-only, so the R script needs the same Restrain/Reach split or a re-run overwrites it.

## Relevance-tiered committee influence scoring (2026-06-25)

Expansion of the committee bucket (from `project_moneyball_model`) into a relevance-tiered, both-chambers committee-influence scorer.

**Locked scoring spec (user-approved via consult):**
- Relevance tiers with multiplier: Highly 1.0 / Moderately 0.6 / Slightly 0.3.
- Committee score = **0.5 x membership + 0.5 x leadership** (leadership dropped from 0.6 to 0.5; this also resolved the "too much weight to chairs?" question, chairs no longer dominate as hard).
- Base points (x relevance): full-committee membership 3; leadership Chair +6 / Ranking +4 / Vice +3; **subcommittee** membership +1 (later set to +0.5, see below), Chair +2.5 / Ranking +1.5 / Vice +1.0. Summed across every seat.
- **Open lever (then resolved)**: sub membership base +1 let multi-subcommittee members stack (e.g. Troy Downing 7 seats gave 3.6 with zero leadership). Dropping to +0.5 tempers stackers without touching the leadership picture; user picked **+0.5** (final).

**Committees/relevance (34 to 36 nodes):** Highly = Sen Banking + FI&CP sub, Sen Finance + Taxation sub, House Fin Svcs + Fin Institutions sub, Ways&Means + Tax sub. Slightly = House Oversight (full) + Energy&Commerce (full) + most non-financial subs. Rest Moderately. THUD (the user listed it under Banking) is actually Senate Appropriations, left out. Senate Small Business (full) + House SB Economic-Growth/Tax/Capital-Access sub user-promoted to Highly.

**Data sourcing gotcha:** senate.gov committee_memberships pages fetch clean (full + all subs in one page). **All `*.house.gov` sites return 403 to WebFetch**; Wikipedia gives House full committees + sub leaders only (not rank-and-file). No Chrome extension was connected. The user hand-pasted the House subcommittee rank-and-file rosters to close the gap.

**Roster currency notes (use the user's pasted versions):** House Oversight roster updated: MTG + Summer Lee OFF; Rich McCormick (GA, not David McCormick PA-Sen), James Walkinshaw, Christian Menefee ON. HFSC has a Monetary Policy Task Force (Moderately) and SB has a Rural Development sub now scored.

**Output:** `Desktop/Committee Influence Scores.xlsx` (sheets: Committee Scores, Committee Index). Build script `C:\Users\pgoff\_committees_v2.py`.

**INTEGRATED into the model 2026-06-25** (Moneyball - Presentation): Committee Data sheet swapped to the 288-member relevance set (cols Member/CommitteeScore/Membership/Leadership/Seats); R&A committee formula (E3:E535) repointed to `=IFERROR(INDEX('Committee Data'!$B$2:$B$320,MATCH($A3,...)),0)` (direct lookup of the 0.5m+0.5L score, range widened past 200 to 320). Board re-ranked: Crapo #1, Tim Scott #2, Cantwell #3; **Brian Fitzpatrick #236 to #102**; enemies stayed bottom (Durbin #513, Marshall #504 despite Finance seat, Gooden #533). Name remaps applied: Bob Latta to Robert Latta, Buddy Carter to Earl Carter. **David Scott (GA-13) is MISSING from the model's 533**, so committee credit is lost (pre-existing roster gap). Done via COM on a local copy (formula-safe); backup BACKUP 20260625-132620.

Still open then: SB Contracting & SB Innovation subs (deprioritized); the CFPB directional split (separate `CFPB Bills` tab tagged +1/0/-1 in the Presentation file, awaiting user review before computing; computed later the same day, see above). Relates to `project_moneyball_model`.

## Presentation audit and the percentile-rank 4-pillar blend (2026-06-25)

Audit of `Moneyball Main Version - Presentation.xlsx` (24 sheets, 533 members). Live chain feeding the final Score: Legislative Score Raw to Normalized, Press Release - Normalized, Committee Data, Sub Layer Raw to Normalized, `Rank & Allocation` (cols C/D/E/F raw, G/H/I/J min-max norm, K score, L rank, M allocation), Coalition Profiles. 0 formula errors; allocation = top 133, sums to exactly $2,000,000.

Key findings:
- **Min-max distorts weights.** Score = 0.40 Press + 0.20 Leg + 0.35 Committee + 0.05 Demo, but the effective variance share is Press 40% / Leg 6% / **Committee 52%** / Demo 2%. One outlier sets each scale (Crapo committee 9.175; Gooden press -1.915 flattens everyone to about 0.9). Committee is a near-gate: 132/133 funded hold a seat; 244/400 unfunded have committee = 0.
- **`Primary Layer` + `Primary Layer - Normalized` are ORPHANED** (computed, referenced by nothing). They are the 11-theme decomposition. `Primary Layer - Normalized` weights are buggy: H2 = 0.8 (likely 0.08), row sums to 1.72, and disagree with `Primary Layer` raw weights. `Topic Weights` sheet is documentation-only (stale on CFPB, now split +0.5 Restrain / -1.0 Reach).

**DELIVERED 2026-06-25: `Moneyball Main Version - Blended.xlsx` (Desktop)** = original workbook + two new sheets `Centrality` and `Blended Model`. All percentile-rank (Excel PERCENTRANK, legacy = no _xlfn). First-delivery pillars/weights (live dials in `Blended!AB2:AB19`): **Legislative 0.40** (sub 0.70 agenda topic-signed [= R&A col D] + 0.30 Legislative Efficiency [= Primary Layer col E]), **Influence 0.30** (sub 0.35 Committee Data prestige + 0.65 network centrality), **Press 0.20** (standalone), **Demographic 0.10**. Centrality from `congress_centrality_*.xlsx` (InfluenceScore = 0.60 WtdOutDegree + 0.25 Betweenness + 0.15 Eigenvector, from the cosponsor net); joined by name, 494/533 match, 39 absent (mostly leadership: Scalise/Hoyer/Jordan/Clyburn), so Influence falls back to committee-only. Also added an **Undervaluation lens**: Intrinsic (0.5 Leg% + 0.5 Centrality%) minus Visibility (0.5 Press% + 0.5 Committee%) = "underdog" rank. Verified via Excel COM: 0 formula errors, 133 funded = exactly $2,000,000.

**FINAL weights (user confirmed "really accurate", 2026-06-25): Legislative 0.20 / Press 0.40 / Influence 0.35 / Demographic 0.05** (AB2/AB3/AB4/AB5) = the ORIGINAL model's weights, but under percentile-rank + centrality-blended Influence. Effective shares Press 47% / Influence 38% / Legislative 15%. Top of list = House Financial Services aligned members (Roger Williams #1, Andy Barr, Timmons, Sessions, French Hill, Emmer), NOT the Senate Banking chairs the old min-max floated up.

Key lesson: weights were NOT what made the original "feel right"; it was min-max letting committee dominate (52% via the Crapo outlier). Percentile-rank at the same weights correlates only 0.58 with the original and still drops adversarial Banking senators (Cantwell #468, Warren #300) because the legislative pillar is topic-SIGNED. Centrality + percentile-rank is what un-gates networked no-committee members while keeping press/committee leading; this is the version the user accepted. Original `Rank & Allocation` left intact for A/B. Relates to `project_moneyball_model`, `project_committee_relevance_scoring`, `feedback_spreadsheet_consult_on_errors`.

## Blended workbook audit (2026-06-25)

Audit of `Moneyball Main Version - Blended.xlsx` (25 sheets, 533 members). The percentile-rank/4-pillar plan is now realized in the **Blended Model** sheet, the canonical output (see also [[moneyball-workbook]]).

Blended scoring: raw pillars (Press, Legislative, Committee, Demographic from `Rank & Allocation` C/D/E/F; Efficiency from `Primary Layer`!E; Centrality from `Centrality`!C) to PERCENTRANK each; Leg pillar = .7 x agenda% + .3 x eff% and Influence = .35 x committee% + .65 x centrality% (each re-PERCENTRANKed); **Score = .20 x Leg% + .40 x Press% + .35 x Influence% + .05 x Demo%**; RANK; fund top 133 proportional from $2.0M. Double-rank on Leg/Influence is intentional (re-uniformizes pillars). Weights sum to 1; allocation sums exactly to $2M/133; 0 formula errors; perfect row alignment.

Audit findings (all surfaced, none yet fixed at the time):
1. `Topic Weights` sheet is stale/decorative: weights are hardcoded in the formulas, not read from it. Legislative matches EXCEPT CFPB (sheet shows unified 0.3; live model uses split CFPB Restrain +0.5 / CFPB Reach(-) -1.0). Press column (0.02-0.30) does NOT match live press weights (binary: Interchange/Tax/Credit-Card = 1.0, all others = 0.05, in `Press Release - Normalized` row 535).
2. Credit Card & Consumer-Fee Mandates co-sponsor sub-weight = 0 (`Legislative Score - Normalized`!DG2) vs 0.0714 for all 17 other topics. Possibly intentional; ask before changing per `feedback_spreadsheet_consult_on_errors`.
3. Legacy min-max Score/Rank/Allocation (cols K/L/M) still lives on first tab `Rank & Allocation` and disagrees sharply (legacy surfaces Crapo/Warren/Waters/Markey; Blended surfaces Williams/Barr/Timmons). Blended only uses R&A's raw C/D/E/F. Consider hiding K/L/M or reordering tabs.
4. Centrality gap: 39/533 members absent from the network (incl. Scalise, Schweikert), so centrality% falls back to committee%. 494 rows use IFERROR(PERCENTRANK,...,L#); the 39 have H blanked + N hardcoded `=L#` (static fallback, fragile to re-sort/new data).

Also: `Sub Layer - Raw` is a misnomer (data is 0-1 normalized). Bloc 2 holds 217/533; 117 members unclustered, so Coalition Profiles alloc totals about $1.866M (excludes unclustered).

## Related Topics

- [[2026-06-feature-moneyball-excel-model-build-lineage-and-phases]] — Workbook lineage and file inventory and the June 2026 build phases A to C (2026-06-18 to 06-22): the original bugs and repairs, the committee and caucus rebuild, the main version with coalition profiles and the four-bucket redesign, and the agenda re-weighting.
