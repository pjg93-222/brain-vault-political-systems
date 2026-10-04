---
type: topic
title: "Workbook lineage and phases A-C (06-18 to 06-22) (Moneyball Excel model build)"
aliases: ["Moneyball Excel model build (June 2026): Workbook lineage and phases A-C (06-18 to 06-22)"]
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

# Workbook lineage and phases A-C (06-18 to 06-22) (Moneyball Excel model build)

> Workbook lineage and file inventory and the June 2026 build phases A to C (2026-06-18 to 06-22): the original bugs and repairs, the committee and caucus rebuild, the main version with coalition profiles and the four-bucket redesign, and the agenda re-weighting. Part of [[2026-06-feature-moneyball-excel-model-build]] (project [[melange-systems]]).
> Correction kept in [[2026-06-feature-moneyball-excel-model-build]] (Superseded guidance, "Excel COM as the write path"): the June Excel COM write path recorded here, including the COM recalc after openpyxl edits and the COM-era recalc tips, is superseded by Phase 2: ranks_python.json is the authority, the workbook is a view, and no COM is used anywhere.

## Workbook lineage and file inventory

| File / artifact | Facts |
|---|---|
| `Moneyball (version 1).xlsb.xlsx` (Downloads) | original; 119th-Congress CU influence scoring and allocation model; 11 sheets; version 1 Durbin rank 530 |
| `Moneyball - corrected ranking.csv` | Durbin rank 532 ("hostile-to-credit-union") |
| `Moneyball (version 2 - corrected).xlsx` | 3 bugs + second pass; rejected lineage (Durbin 201-242, 219 now); combined `Rank & Allocation` sheet |
| `Moneyball.xlsx` ("Main Version", Downloads) | user's preferred/"accurate" file (2026-06-21, user: "Found it... It is Moneyball Main Version"); pre-v2-correction lineage; SEPARATE `Rank` and `Allocation` sheets (10 sheets); computed Rank/Score cells are formulas with NO cached values; carries the district misalignment (Durbin labeled "Congressional District 9, North Carolina" not Illinois), old electoral scale and interchange handling |
| `C:\Users\pgoff\OneDrive\Desktop\Moneyball Main Version.xlsx` | ACTIVE WORKING FILE (2026-06-21): richer district-FIXED descendant; Durbin = "Illinois", Rank 533 / Score 0.062 (dead last, correctly hostile); Score/Rank cached; 14 sheets incl combined `Rank & Allocation`, `Coalition Profiles`, `Press Release Articles`, full Sub/Primary/Legislative/Demographic/Press Raw+Normalized; 133 members funded |
| `Moneyball Main Version - BACKUP <ts>.xlsx` (Desktop) | backup before enrichment |
| `C:\Users\pgoff\OneDrive\Desktop\Moneyball Main Version - FIXED.xlsx` | four-bucket redesign (2026-06-21); original untouched and was open in Excel (locked); backup `...BACKUP 20260621-214805.xlsx` |
| `Moneyball Main Version - Presentation.xlsx` | 24 sheets, 533 members (2026-06-25 audit); Press Release - Raw / Committee Data / `CFPB Bills` tab live here |
| `Moneyball Main Version - Blended.xlsx` (Desktop) | Presentation + new `Centrality` and `Blended Model` sheets; 25 sheets; canonical output; later also carries `Category Stance` sheet (after `Signed Coalitions`), `Melange - Live` tab, IM sheet |
| `Committee Influence Scores.xlsx` (Desktop) | sheets Committee Scores, Committee Index; build script `C:\Users\pgoff\_committees_v2.py` |
| `cu_press_value_by_category_RAW_aligned.xlsx` | sheet `Mapped`, 533 rows aligned to raw rows 2-534 |
| `Ballotpedia_119th_CU_Influence_20260618_010531.xlsx` | committee/caucus/party-leadership source (Members sheet: Committee_Positions, Committee_Leadership, Caucus_Positions, Caucus_Leadership, Party_Leadership; Detail sheet carries bioguide, row-parallel) |
| `congress_centrality_*.xlsx` | cosponsor-network centrality source |
| `Downloads/repair_moneyball.py`, `Downloads/merge_committee_caucus.py` | reproducible repair scripts |

## Phase A: original bugs and repairs (version 2 / 2026-06-18)

### First pass (delivered `Moneyball (version 2 - corrected).xlsx`)

1. **Electoral Integrity scale/weight**: raw 36-119 scale while all other dims are 0-1; at weight 0.05 it dominated the score and scrambled ranks (made Zoe Lofgren, clearly anti-CU, land at rank 107). Fix: weight set to **0** (user's choice).
2. **Member-district misalignment**: 333/533 members carried the WRONG district's District label, demographics and Electoral value (name/legislative/press data were correct; the district-traveling block was mis-joined). Fixed by re-pairing against the authoritative roster (`unitedstates.github.io/congress-legislators/legislators-current.csv`), matched by name+state; label sets matched exactly (clean permutation).
3. **Demographic Factors off-by-one**: Primary Layer col D referenced Sub Layer row r instead of r+1, so every member got the PREVIOUS member's demographics (the first member got weights x weights = constant 0.095). Formula fixed.
- Per user request: reweighted to **50/50 legislative/press** (legislative weights x5/7 to sum 0.5, press weights to 0.5). Validated: pro-CU coalition mean rank 114, hostile 451 (clean separation); Lofgren to 441/533. openpyxl round-trips this workbook safely (tables preserved); set `fullCalcOnLoad` since there is no LibreOffice locally.

### Second pass (2026-06-18, edited in place; backup `...BACKUP <ts>.xlsx`; script `Downloads/repair_moneyball.py`)

User ruling: allocation is INTENTIONAL (see Decisions in [[2026-06-feature-moneyball-excel-model-build]]). Bugs found and fixed:
1. **Legislative Efficiency block (Sub Layer AG:AV to Primary E, weight 0.10) was garbage**: hard-coded numerator column letters AG, AH, AI... landed on the WRONG Leg-Raw columns (Raw has 9 cols per category, not 1), AND every cell was off-by-one (referenced Leg-Raw row 3 for Aaron Bean who is at row 2; Leg-Normalized correctly uses row 2). Rebuilt all 16 x 533 cells: numerator = correct `<Category> Success Rate` col (H,P,X,AF,AN,AV,BD,BL,BT,CB,CJ,CR,DH,DP,DX,EF) at Leg-Raw row r-2, IFERROR-wrapped; denominators (Table1[name]) were already right.
2. **CFPB issue block** Sub Layer Q used `CU:CX` (4 cols), widened to `CU:CY` (restores the co-sponsor col).
3. **Phantom min-max + #DIV/0!**: wrapped all Press-Normalized E:X in IFERROR; status-quo(-) categories (Interchange H, CU Tax P, Credit-Card-Mandates T) switched from INVERTED to uniform NORMAL min-max (inversion-in-one-place), made PRESS-ONLY full-scale (weights H/P/T row 535 set to 1.0; Sub Layer F rewritten press-only) because legislative volume is stance-blind (Credit-Card leg=0 for all; only 15 members have any Interchange leg, several anti-CU e.g. Durbin/Welch/Gooden; a positive weight would mis-reward them). Verified direction: Durbin interchange raw -3.2 to norm 0.0 (lowest), neutral/no-data 0.615, pro-CU 1.0.
4. **Collation join misalignment**: Press sheets were sorted accent-insensitively vs byte-sort elsewhere, rotating 5 rows (Andre/Andrew cluster, Press rows 19-23) so those members got the wrong member's press scores (positional join). Reordered Press-Raw rows and Press-Normalized labels to canonical; alignment now 0 mismatches across ALL sheets.
5. **ACU-salience issue weights** (Sub Layer C3:U3, all positive, normalized to sum 1 per primary category): salience = number of search terms + 3 x number of tracked bills from the ACU outline. New weights e.g. Exam 0.636 / CapReq 0.145 / NCUA 0.218; CFPB 0.571 / TCPA 0.089 / CreditCard 0.339; etc.
- Primary-Layer weights kept exactly as-is (Electoral stays weight 0).

### Committee/caucus rebuild (2026-06-18, `Downloads/merge_committee_caucus.py`, another in-place backup)

- Source = the sibling `project-ballotpedia-cu-influence` output `Ballotpedia_119th_CU_Influence_20260618_010531.xlsx`. Sub Layer AW:BA map 1:1 to its 5 columns (Committee_Positions, Committee_Leadership, Caucus_Positions, Caucus_Leadership, Party_Leadership).
- The old "partial merge" was actually MIS-aligned (Tim Scott = Banking chair read 0; 81 members had another member's values). Re-merged keyed by bioguide via a name matcher (Moneyball display names "Katie Britt"/"French Hill" to BP full_names "Katie Boyd Britt"/"J. French Hill"; nickname + accent + prefix; Pablo Hernandez Rivera to H001103 manual): **533/533 matched, 0 ambiguous, 0 dup bioguides.**
- Normalized x/max (maxes 8 / 2.8 / 2 / 1.8 / 1; reproduces already-correct cells exactly: Aaron Bean 4/8 = 0.5, Crapo 1.8/2.8 = 0.643).
- Net: 81 zero to nonzero (Scott 0.75/0.71, Britt 0.5/0.57, Warner, Blunt Rochester), 81 spurious nonzero to 0 (Gary Peters / James Comer / Brian Mast, not on CU committees). Committee data is bioguide-clean (from committee-membership-current.yaml); 228 members have committee seats, 33 caucus, 10 party leadership.
- **BUG fixed in both places**: the BP party-leadership matcher keyed on LAST NAME only, so all 5 sitting "Johnson"s got Speaker Mike Johnson's 1.0; zeroed Dusty/Hank/Julie/Ron Johnson in the Moneyball file AND fixed the root cause in `ballotpedia_119th_cu_scraper.R` (`PARTY_LEADERSHIP` now carries bioguide, `party_caucus_for` matches on it).
- NOTE: openpyxl drops cached formula values on save, so the user MUST open in Excel to recalc (COM-era note).

## Phase B: Main Version, Coalition Profiles and the four-bucket redesign (2026-06-21)

### Active working file and Coalition Profiles enrichment

- Active file `C:\Users\pgoff\OneDrive\Desktop\Moneyball Main Version.xlsx` (see inventory). **Enriched `Coalition Profiles`** per user request: the blocs are press-clustering output (detect_coalitions/Ward), 9 blocs (Bloc 1-8 + Unaligned), ALL press-labeled "pro-credit-union", which mislabels e.g. Durbin's Bloc 1.
- Added per-bloc COMBINED columns joining overall score (Rank & Allocation) + legislative index (weighted Legislative-Normalized, 0-100, **engagement/volume, not stance-directional**) + press mean_lean into a min-max **Combined Index (0-1)** + Strength Tier. Re-ranks blocs honestly: Bloc 7 (French Hill/Barr/Lummis) 0.76 "CU Champions" down to Bloc 1 (Durbin) 0.42 "Soft/mixed".
- Added new **`Coalition Demographics`** sheet (per-bloc income/homeownership/cost-burden/%finance/age/poverty/CBP).
- CAVEATS: profile aggregates are STATIC snapshots (not live formulas); demographic means MIX senator (state) + rep (district) ACS geographies and "Total Constituents" double-counts (sums overlapping state+district pops); 3 territorial delegates (Radewagen/Moylan/Plaskett) do not join to overall. Built via openpyxl (formulas + Tables preserved, verified; cached values dropped, so recalc in Excel needed).

### Four-bucket redesign (session 2)

- **Trigger**: user asked why **Byron Donalds ranked #1**. Cause: a **weight typo**: `Primary Layer - Normalized` row 2 had Payment & Technology = 0.80 (vs 0.08-0.12 for all others; weights summed 1.72 not 1.0), and `Rank & Allocation` Score did `SUMPRODUCT(Table6 = RAW Primary Layer values, normalized-sheet weights)`, cross-wired. P&T alone = 73% of Byron's score.
- Tooling then: no local LibreOffice; recalc via Excel COM in PowerShell. **A Python reproduction of the whole cascade matched the workbook exactly and was the oracle.**
- Discoveries: (a) the Sub Layer to Legislative reference is **off-by-one for all 533** (Sub has 3 header rows, Legislative has 2, so same row number = next member; Byron read Carlos Gimenez), BUT "fixing" it alone made the board WRONG because (b) **legislative co-sponsorship is directionless VOLUME** (rewards prolific members like Durbin regardless of stance) and (c) **press is the only directional signal** (signed -1..+1, enemies negative) yet was wired at about 0.05 vs legislative about 1.0; (d) **committee data was incomplete** (Tim Scott = Banking CHAIR read 0); (e) **1,066 `#REF!`** in Legislative-Raw cols DG/DO = dead **external-workbook links `[1]!Table1`** (data lost, zeroed); (f) **Aaron Bean #1 phantom** = 5 entirely-empty Legislative cols (CDFI x3, Payments-CoSpon, FoM-CoSpon) produced a spurious 1.0 for the first data row via empty-column min-max.
- **The fix**: score restructured into 4 buckets, each min-max normalized then weighted by EDITABLE cells at `Rank & Allocation!S2:S5`: **Press 0.40 / Legislative 0.20 / Committee 0.35 / Demographic 0.05**. Composites written as VALUES (cols C/D/E/F); normalize/score/RANK/allocation + Coalition Profiles aggregates are LIVE formulas. Allocation now distributes the FULL $2M (score-proportional among top 133, no cap).
- **Committee data collected fresh from Wikipedia 119th-Congress rosters** (House Financial Services, Senate Banking, House+Senate Small Business; chairs/vice/ranking/subcommittee chairs) into new **`Committee Data`** sheet. Rubric: membership (Banking/FS = 3, SmallBiz = 1.5) + leadership (Chair +6, RM +4, ViceChair +3, SubChair +2.5, Financial-Institutions sub +4, SubRM +1.5); composite = 0.4 x membership + 0.6 x leadership (superseded 2026-06-25 by 0.5/0.5).
- **REFINED (same session, later): press-gating removed.** Legislative col D had been `leg_volume x sign(press_lean)` (anti-CU activity counts negative). User flagged it as imposed bias; a bias audit confirmed it: 457/533 members have near-zero press, so gating their legislative by press-sign was noise; it was overfit to push Durbin down. Replaced by **intrinsic topic-direction**: interchange and credit-card-mandate activity is anti-CU by nature (disrupts the CU-favorable status quo), so those LEGISLATIVE topic weights are strongly negative (interchange -2.0, credit-card -3.0 in the leg composite) AND those PRESS topics up-weighted to 0.30 each (vs about 0.05 flat) as CU's existential priority issues.
- **Bias audit findings**: **chamber bias** (Senators avg rank 196 vs House 283: more press/broader committees); **missing-data floor** (51 members with no press AND no committee sink to about #355 regardless of stance; the very bottom is now no-signal members like Richard Hudson/Roger Wicker, not enemies); mild **Democratic demographic tilt** (demo bucket D 0.52 vs R 0.34, at 5% weight); committee is the single strongest score driver (corr 0.89, defensible = objective position).
- **FINAL board (four-bucket)**: Tim Scott #1, French Hill #2, Roger Williams #3, Andy Barr #6, Britt #16, Steil #20, Lummis #27; enemies Durbin #490, Marshall #524, Welch #505, Gooden #523, Lofgren #326. Zero errors, $2M/133.
- Remaining SOURCE-DATA (not model) gaps then: Marshall's credit-card press mis-scored +0.9 (co-author read pro-CU; scraper stance error; his articles absent from the 192-member Articles sheet); credit-card & TCPA co-sponsor legislative columns dead `[1]!` links; David Scott (D-GA) + N. Mariana delegate not in the 533 list; tax committees (Ways&Means/Finance) not yet added.
- COM-era recalc tips (historical): force-killing a headless Excel orphan can trigger autorecover that silently rolls back the openpyxl write, so verify the header/values persisted on disk after recalc; prefer try/finally cleanup over Stop-Process. **OneDrive race confirmed**: the file lives in OneDrive\Desktop, so an openpyxl save immediately followed by a COM Open can race OneDrive sync and the COM crash reverts the file to a pre-write version. Workaround that worked: openpyxl write, verify it persisted by re-reading with openpyxl (NOT COM), then **recalc on a LOCAL copy outside OneDrive** (`Copy-Item $src $env:TEMP\mb_work.xlsx; COM recalc temp; Copy-Item temp $src`). Also independently compute the board in Python (composites, min-max, 0.40/0.20/0.35/0.05, rank) as source-of-truth verification rather than relying on COM-cached values.

## Phase C: agenda re-weighting (2026-06-22)

- All 19 topics re-tiered to America's Credit Unions' 2026 advocacy agenda (Advance/Empower/Protect; sources: americascreditunions.org/news-media 2026 priorities, cutoday, cutimes). Before this, only the 4 bucket weights + interchange/credit-card were intentional; the other about 30 topic weights were legacy salience values and the **CU tax exemption, the #1 existential 2026 priority, was the LOWEST weight in the whole model (press 0.019)**.
- New tiers: **TOP press 0.30** = Tax Status (defend exemption; press-only, defender = positive sign confirmed via French Hill +0.47), Interchange (leg -2.0), Credit-Card Mandates (leg -3.0); **HIGH 0.10-0.15** = Charter Modernization, Field of Membership, NCUA, Exam; **MEDIUM 0.08** = Tech/AI, Payments, Data Privacy, Mortgage/Housing, Fraud; **LOW 0.02-0.05** = CDFI (was 0.75, demoted; data empty), MBL (was 0.75), CFPB (was 0.75), TCPA, Defense CU, CU-Bank, CU Capital.
- Added a **`Topic Weights` control sheet** (editable press+leg weight + tier per topic), but composites were still computed VALUES so editing needed a Python re-run; user may want them wired fully live next. (Later audit: this sheet became stale/decorative, see Blended audit in [[2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits]].)
- Added a **`Ranking Chart` landing sheet** (first sheet): top-30 table (Rank/Member/District/Score/Allocation) + native openpyxl horizontal BarChart of the top 30 by score (static snapshot).
- GOTCHA that bit twice: `openpyxl.load_workbook(F)` (data_only=False) + `.save()` **strips ALL cached formula values** workbook-wide, so after any openpyxl edit you must COM-recalc to restore them, and to READ rank/score you must either recalc first or compute from the static composite columns (C/D/E/F survive; formula cols K/L/M do not).
- **Agenda board**: #1 French Hill (HFSC chair + lead tax-exemption defender, rose from #2 once tax counted), #2 Tim Scott, #6 Barr, #16 Britt, #19 Steil, #31 Lummis; Durbin #508, Marshall #513, Gooden #525, Welch #480, Lofgren #268. Zero errors, $2M/133.
