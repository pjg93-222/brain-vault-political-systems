---
type: topic
title: "Moneyball Excel model build (June 2026)"
aliases: ["Moneyball Excel model build (June 2026)"]
category: "feature"
status: "completed"
people:
  - "paul-goff"
actors:
  - "[[draft-systems-r-pipeline]]"
  - "[[moneyball-workbook]]"
objective: "Build and audit the 533-member credit-union (CU) influence scoring and allocation workbook in June 2026: four-bucket redesign, Blended vs Presentation audits, percentile-rank 4-pillar blend, CFPB Restrain/Reach split, relevance-tiered committee scoring, press raw alignment, per-category stance third dimension, scenario-tool pre-flight and engine audits, and empirical calibration."
created_at: 2026-06-22
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_empirical_calibration.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_empirical_calibration.md", sha256: "4a820f2cb89862df8b3b545757001283ccbe065f4a35143b83063c7311b30373"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_scenario_prep.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_scenario_prep.md", sha256: "0807b23ec2688652c69dff061882d9c68fcb518a7c6c18682a8f910964d23a35"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_category_stance_3d.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_category_stance_3d.md", sha256: "614a306331f4b86c09257a136d113ac3d067cea5eab8eacc019b55fa1a92f271"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/feedback_consult_multipliers_thresholds.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\feedback_consult_multipliers_thresholds.md", sha256: "584df5a0aba3f5bc78caf3ea059c654c1456fbcc10e93b2bb8d0153e9235e9ca"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_cfpb_directional_split.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_cfpb_directional_split.md", sha256: "5fc9fa475539871976b414bc873272b3da3f530c75a67a961291a55cd1ef0f1a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_committee_relevance_scoring.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_committee_relevance_scoring.md", sha256: "909d30987b76c50c74cb582ed2ad2e84c16174b2634445514679c511241b8ab7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_blended_audit.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_blended_audit.md", sha256: "6d69eda275039e1db26fe8b48a1f7f083b03564f2256821ca68903d9c0ef4eea"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_presentation_audit.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_presentation_audit.md", sha256: "22c59f496f4c19149f5a99f72aac1ae93c8245dd7332f31976e39698414ae68e"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_press_raw_alignment.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_press_raw_alignment.md", sha256: "824813de9d6536f92753ee1d4070932f406f08e703e8014a7891b97af06683e4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_model.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_model.md", sha256: "65b55eb6397fb71ac07d19b63535dcc7c974494aaaa39aae953b1412a07da3de"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/data", "category/feature"]
---

# Moneyball Excel model build (June 2026)

> June 2026 build history of the 533-member CU-influence scoring and allocation workbook (`Moneyball Main Version - Blended.xlsx` lineage) and the `fec/` engine layer built around it, from the first bug audits (2026-06-18) to the empirical calibration (2026-06-27).

## Context

- The model ranks all 533 members of the 119th Congress by a weighted score so credit-union lobbying resources can be allocated (Moneyball = find undervalued targets). It is a sibling of `project_ballotpedia_cu_influence` and the press work in `project_congress_press_fallbacks`.
- Starting point: `Moneyball (version 1).xlsb.xlsx` (in Downloads), built as an .xlsb converted to .xlsx. The live file had **11 sheets with a combined `Rank & Allocation` sheet** (pandas once mis-reported a 12-sheet split because the file was being edited in Excel during analysis; always work on a copy).
- Scope of this topic: every June 2026 build step of the workbook and of the engines that read it (flip, coalition, electoral, route, priming, money-response, scenario runner, optimizer). It was an Excel-workbook-centred build: the June guidance wrote through Excel COM and openpyxl. **That system of record was later inverted**: Phase 2 made `ranks_python.json` the authority and the workbook a view, with NO COM anywhere (see Superseded guidance below and [[melange-systems]]).
- Cascade architecture (formula-driven, recalcs in Excel): Legislative Score Raw to Normalized, Press Release Raw to Normalized and Demographic Raw to Normalized feed the **Sub Layer**, which feeds the **Primary Layer** (11 weighted dimensions), which feeds **Rank & Allocation** Score (`SUMPRODUCT(Table6 dims x Primary weights)`) and Rank (`RANK.EQ`). Each Sub Layer policy dimension = `legislative_part + press_part`; legislative sub-weights (Legislative Normalized row 2) summed about 0.7, press weight (Press Normalized row 535) was a flat 0.3. Sub Layer demographic cols V:AF are **hardcoded** (not formulas), so demographic fixes must be written there too.
- The R-side data pipeline that regenerated base data is [[draft-systems-r-pipeline]]; the stance layer that the per-category work feeds is [[2026-06-feature-cu-stance-and-sentiment]]. Decision authority over every numeric multiplier/weight/threshold is Paul's (Paul Goff; see Change control and Paul's decision authority).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[draft-systems-r-pipeline]] | Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline |
| [[moneyball-workbook]] | Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority). |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[four-pillar-percentile-blend]] — the June build delivered the Blended workbook with the percentile-rank 4-pillar blend after the 2026-06-25 Presentation audit

## Related Topics

- [[2026-06-feature-cu-stance-and-sentiment]] - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- Change control and Paul's decision authority - Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code.

## History

| Date | Event |
|---|---|
| (date not given; before 2026-06-18) | First pass: `Moneyball (version 2 - corrected).xlsx` delivered with 3 bugs fixed (Electoral Integrity scale/weight, member-district misalignment, Demographic off-by-one) and a 50/50 legislative/press reweight |
| 2026-06-18 | SECOND PASS edited `Moneyball (version 2 - corrected).xlsx` in place (backup `...BACKUP <ts>.xlsx`; script `Downloads/repair_moneyball.py`): Legislative Efficiency block rebuilt, CFPB Q widened, Press-Normalized IFERROR + status-quo categories press-only, collation alignment fixed, ACU-salience issue weights |
| 2026-06-18 | COMMITTEE/CAUCUS REBUILD (`Downloads/merge_committee_caucus.py`): 533/533 matched by bioguide from the Ballotpedia output; party-leadership last-name bug fixed in Moneyball file and in `ballotpedia_119th_cu_scraper.R` |
| 2026-06-21 | User identifies `Moneyball.xlsx` ("Main Version") as the accurate lineage (Durbin near bottom); `C:\Users\pgoff\OneDrive\Desktop\Moneyball Main Version.xlsx` becomes the active working file; `Coalition Profiles` enriched, `Coalition Demographics` added |
| 2026-06-21 (session 2) | FOUR-BUCKET REDESIGN delivered as `C:\Users\pgoff\OneDrive\Desktop\Moneyball Main Version - FIXED.xlsx` (backup `...BACKUP 20260621-214805.xlsx`); press-gating added then removed the same session |
| 2026-06-22 | AGENDA RE-WEIGHTING of all 19 topics to America's Credit Unions' 2026 advocacy agenda; `Topic Weights` control sheet and `Ranking Chart` landing sheet added |
| 2026-06-24 | Press raw alignment: `cu_press_value_by_category_RAW_aligned.xlsx` (sheet `Mapped`, 533 rows) built for the `Press Release - Raw` sheet of the Presentation workbook |
| 2026-06-25 | CFPB directional split (Restrain +0.5 / Reach -1.0); relevance-tiered committee scoring integrated; Presentation audit then `Moneyball Main Version - Blended.xlsx` delivered (percentile-rank 4-pillar blend); Blended audit (4 findings); consult-on-multipliers feedback recorded |
| 2026-06-26 | Category Stance 3D sheet built (533 x 17), then major data-fix after Durbin mislabel, per-category/self-calibrating thresholds, Defender tier, bipartisanship metric, dashboard; scenario pre-flight (determinism bug, infra, budget frontier, electoral, money-response, pathfinding, scenario runner, flip-channel, optimizer, reconciliation), two independent adversarial audits, FEC data-quality assessment and HIGH-3 reversal; Melange Systems reorg |
| 2026-06-27 | Empirical calibration of model parameters to the literature (4 research agents, user-approved fork by fork) |

## Decisions

- **Every numeric multiplier, weight and threshold is Paul's decision** (feedback `feedback_consult_multipliers_thresholds`): present structure, options, ranges and trade-offs, give a recommendation marked "(Recommended)", let him set values (details in the Consult rule section below). The calibration on 2026-06-27 followed this ("tastefully calibrate... consult on changes", each fork approved through AskUserQuestion).
- **Score restructured into 4 buckets** (2026-06-21): Press 0.40 / Legislative 0.20 / Committee 0.35 / Demographic 0.05, min-max normalized, editable at `Rank & Allocation!S2:S5`. ~~First request 40/40/15/5~~ (2026-06-21) - changed because 40% legislative floated Durbin; excess moved to committee.
- **Press-gating of legislative REMOVED** (2026-06-21, same session): user flagged it as imposed bias; replaced with intrinsic topic direction (interchange -2.0, credit-card -3.0 legislative; press up-weighted to 0.30). ~~Legislative = leg_volume x sign(press_lean)~~ - superseded, kept because it explains the `...FIXED` file history.
- **Final pillar weights of the percentile-rank Blended Model (2026-06-25, user: "really accurate")**: Legislative 0.20 / Press 0.40 / Influence 0.35 / Demographic 0.05 at `Blended!AB2:AB5`. ~~Legislative 0.40 / Influence 0.30 / Press 0.20 / Demographic 0.10~~ (first delivery, 2026-06-25) - superseded the same day. (The three later ratification-status weight sets are in the Weights ledger below.)
- **Committee composite = 0.5 x membership + 0.5 x leadership** (2026-06-25, user-approved; leadership dropped from 0.6). ~~0.4 x membership + 0.6 x leadership~~ (four-bucket rubric, 2026-06-21) - superseded.
- **Sub membership base +0.5** (user pick, 2026-06-25, stops multi-sub stackers like Troy Downing out-scoring ranking members). ~~+1~~ - superseded.
- **Do NOT reconcile the core model to a naive bills-archive sum** (2026-06-26): the frozen-leg vs naive archive-sum comparison (corr 0.08, 43 sign flips) shows the naive sum is also wrong (Durbin sums +26 from bipartisan bills); damage was contained to the per-category layer, which was already fixed; corrected per-category layer is the category-level truth and overall stances are reliable.
- **Leverage-only electoral model, directional, NON-PARTISAN as a hard requirement** (2026-06-26, user): CUs stay non-partisan, do not bias against Democrats; stance model kept, ACTION layer fixed (replace gated on OVERALL Opponent only; PRIMARY route benchmarked on same-party average).
- **Saturation-aware money curve; money-triggered AND manual defections; co-sponsor route = Pareto multi-objective; sheet connection = incremental D* Lite** (2026-06-26, user decisions on money_response, cosponsor_route, sheet_sync).
- **Champion/Ally/Skeptic thresholds self-calibrating** from each sub-category's own distribution, "shaped, with sanity bounds" (user choice 2026-06-26); champions tightened three times at the user's request (36% too large).
- **Tier name Defender** (user renamed from Champion for defensive categories).
- **Empirical calibration changes** (2026-06-27, each user-approved): PERS compressed ~10:1 to ~3:1, MAXSHIFT 40 to 18, DTHRESH 25 to 15 (user chose "money CAN still rarely flip the most-movable" over "never"), WM/WP 0.6/0.4 to 0.35/0.65, cross-party flipped from amplifier to damping in the diffusion channel, source-alignment added to flip persuasion, edge-prob half-saturation +4 to +6, LELEV 0.6 to 0.8, BSCALE 350k to 400k, THETA widened.
- **Allocation is intentional, do not "fix"** (user, 2026-06-18, version 2 file): top ~25% funded, 1/rank inverse weighting, $10k cap, only about $834k of the $2M multiplier distributes BY DESIGN. Primary-Layer weights kept as-is (Electoral weight stays 0). (Superseded for the FIXED/Blended lineage, where allocation distributes the full $2M score-proportionally among the top 133.)
- **Warren and Waters ARE CU-supportive** (user correction 2026-06-21): anti-big-bank aligns with CUs; do NOT push them down; their high committee-leader rank is correct.
- **Melange Systems is the canonical home** from 2026-06-26 (`C:\Users\pgoff\OneDrive\Desktop\Melange Systems\`, 189MB, self-contained, README.md maps it); `Draft Systems` left INTACT (not deleted).
- **Source cross-checks**: the "version 2 - corrected" series (Durbin rank 201-242, 219 in the current file) was REJECTED by the user as wrong; the Main Version family (Durbin 530/532/533) is the accepted lineage.
- ~~Excel COM / openpyxl as the write path for model edits~~ (June 2026) - superseded by Phase 2: `ranks_python.json` is the system of record, the workbook is a view, NO COM anywhere (resolution 5). The COM-era recipes below are kept as history only.

## Next Steps

The June build is complete; items below were still open when it ended (as recorded in the sources).

- [ ] Source-data gaps: Marshall's credit-card press mis-scored +0.9 (co-author read pro-CU; scraper stance error; his articles absent from the 192-member Articles sheet); credit-card and TCPA co-sponsor legislative columns are dead `[1]!` external links (data lost); David Scott (D-GA) and the N. Mariana delegate not in the 533 list (David Scott committee credit lost); tax committees (Ways&Means/Finance) not yet added at that time (later added via relevance scoring).
- [ ] `congress_member_scraper.R` (`project_moneyball_integrated_scraper`) needs the same CFPB Restrain/Reach split or a re-run overwrites the workbook-only split.
- [ ] Open Blended-audit findings 1-4 (stale Topic Weights, CCM co-sponsor sub-weight 0, legacy K/L/M ranking on first tab, centrality gap for 39 members): all surfaced, none yet fixed at 2026-06-25.
- [ ] Open audit items M1-M5, L4 and MEDIUM-1, LOW-1, LOW-3, LOW-4 (listed in the engine audit section).
- [ ] Open lever: whether to actively balance the D-leaning aggregate of electoral contest plays (optics).
- [ ] Optional: wire per-topic coalition mode into the IM sheet (sheet still showed per-topic flip only); mode-aware topic columns.
- [ ] SB Contracting and SB Innovation subcommittees still unscored (deprioritized).
- [ ] Possible: MC upgrade of the tree-reach route spread, adding `_sm` to `budget_frontier.py` per-topic deltas, optimizer min-chunk/capacity concentration constraints (INC/PMAX were added later the same day), seed-ensemble for baseline credibility, current-lean asymmetry/incumbency/seniority/chamber variables for money response.
- [ ] Workbook IM sheet refresh via `write_im_sheet.py` after any `im_allocation.json` regeneration (on-sheet cells lag until pushed; COM-era step, superseded by Phase 2).

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

User ruling: allocation is INTENTIONAL (see Decisions). Bugs found and fixed:
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
- Added a **`Topic Weights` control sheet** (editable press+leg weight + tier per topic), but composites were still computed VALUES so editing needed a Python re-run; user may want them wired fully live next. (Later audit: this sheet became stale/decorative, see Blended audit.)
- Added a **`Ranking Chart` landing sheet** (first sheet): top-30 table (Rank/Member/District/Score/Allocation) + native openpyxl horizontal BarChart of the top 30 by score (static snapshot).
- GOTCHA that bit twice: `openpyxl.load_workbook(F)` (data_only=False) + `.save()` **strips ALL cached formula values** workbook-wide, so after any openpyxl edit you must COM-recalc to restore them, and to READ rank/score you must either recalc first or compute from the static composite columns (C/D/E/F survive; formula cols K/L/M do not).
- **Agenda board**: #1 French Hill (HFSC chair + lead tax-exemption defender, rose from #2 once tax counted), #2 Tim Scott, #6 Barr, #16 Britt, #19 Steil, #31 Lummis; Durbin #508, Marshall #513, Gooden #525, Welch #480, Lofgren #268. Zero errors, $2M/133.

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

Split the single "CFPB Issues & Structural Reform" legislative topic into two directional topics (also feeds [[2026-06-feature-cu-stance-and-sentiment]]). Driven by the user-tagged `CFPB Bills` tab: Direction +1 Reduce (49 bills) / 0 Neutral (6) / -1 Expand (5).

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

## Category Stance 3D sheet (2026-06-26)

Built the **Category Stance** sheet (533 members x 17 categories) in `Moneyball Main Version - Blended.xlsx`, placed after `Signed Coalitions`. Turns stance from one general tier per member into a member x category matrix: champion/ally/neutral/skeptic/opponent *per legislative category*. Backup PRE-CATSTANCE-20260626. (This is the "third dimension"; consumer stance semantics are in [[2026-06-feature-cu-stance-and-sentiment]].)

**Method (user chose "confirmatory overlay"):** combined = `0.55 x legislative + 0.35 x press + 0.10 x votes (if n>=5)`, renormalized to leg+press where votes absent. Per-category legislative = signed engagement (topic-direction sign); press = the signed per-category Press Release - Normalized value; votes = per-category CU-aligned passage-vote lean. Robust 80th-percentile normalization per category; tier cutoffs +/-0.40 (Champion/Opponent) / +/-0.12 (Ally/Skeptic), tunable dials (initial; superseded by the self-calibrating thresholds below). Scripts: `fec/per_category_stance.py`, `fec/vote_by_category.py`, `fec/write_category_stance.py`. Outputs `category_stance.json`, `vote_category_lean.json`.

**Votes tagged by area** via the bills archive `Section` column (bill to category, matched on Name+Congress) + `cfpb_bill_directions.csv` for CFPB direction; restricted to **final-passage votes** (drop "On Agreeing to the Amendment" = 66% of rows, NDAA noise that had inflated Defense to 43k).

**HONEST finding (told to the user):** votes do NOT decompose cleanly by CU category. 8 of 17 categories have ZERO floor votes (Interchange, Field of Membership, CU Capital, Credit Card, NCUA, Payments, CDFI, TCPA; they die in committee); where present, n = 1-3 per member. So votes are only a light confirmatory overlay, not a co-equal pillar. Cosponsorship works per-category because it was deliberately curated; floor votes are whatever reached the floor. See `feedback_consult_multipliers_thresholds`.

**Caveat:** on the 15 positive categories, legislative engagement reads as pro-CU by construction; press carries any cross-direction opposition, so the matrix finds category-champions more readily than category-opponents. Same topic-sign assumption the overall model already uses.

**MAJOR DATA-FIX (2026-06-26, after the user caught Durbin mislabeled):**
- The per-category LEGISLATIVE pillar was being read from the FROZEN `Legislative Score - Normalized` sheet, which is **disconnected from the actual bill record**: it dropped Durbin's Interchange authorship (Credit Card Competition Act, of which he is the sponsor; showed 0.000 so Neutral) and carried PHANTOM Payments cosponsorships (no Payments bills exist for him; showed Champion).
- Rebuilt the legislative pillar **directly from the bills archive** (`fec/build_archive_legislative.py` to `archive_leg.json`): role-weighted (sponsor 3 / original-cosponsor 2 / cosponsor 1) x DecayWeight, signed by section, with **per-bill direction** for CFPB (cfpb_bill_directions.csv) AND Credit Card (CRA "disapproval" resolutions = pro-CU since they overturn the fee rule; rate/fee-cap bills = anti-CU). Member match 511/533 (last-name+initial).
- Then **overall-stance prior** (user-chosen): demote uncorroborated positive scores (no positive category press) for overall-anti members; anti_strength = max(overall-press-lean normalized, {Opponent:1.0, Skeptic:0.5}), PRIOR = 0.70.
- Validated: Durbin to Interchange & Credit Card Opponent, Payments blank, Fraud demoted Champion to Neutral; Tim Scott/Barr/Wagner to Credit Card Champion (CRA disapproval). Interchange opponents = the real CCCA cosponsors (Durbin/Marshall/Welch/Lofgren). `per_category_stance.py` now reads `archive_leg.json` (NOT the Normalized sheet).
- Honest residual limit: opponents still concentrate on the 3 contested issues (Interchange/Credit Card/CFPB); opposition on friendly issues is not in cosponsorship data. Re-ran flip + coalition + dashboard + sheet; 22/22 integrity.

**PER-CATEGORY THRESHOLDS + DEFENDER tier (2026-06-26):** deep connectedness audit (`fec/per_category_deep_audit.py`) showed champion rates swung 0% to 53% under one global 0.40 cutoff (Mortgage 53%, MBL 39% vs Interchange/CDFI/Payments about 0%). Fix: **per-category percentile thresholds** for OFFENSIVE categories (Champion = score >= p75 of that category's positive scores, floor 0.22; Ally >= p35; Opponent <= p25 of negatives), so rates became 1-23%. **DEFENSIVE categories** {Interchange, Credit Card Mandates}, where absence-of-legislation is pro-CU, use a **direct rule** (NOT percentile): leg <= -2.0 (sponsors the mandate) gives Opponent; leg >= 2.0 (CRA disapproval) OR press >= 0.03 (public defense) gives **Defender** (new tier, renamed from Champion per user); press weight boosted (additive 0.55 leg + 0.70 press; leg keeps mandate-pushers negative). Validated: Durbin to Interchange Opponent; Interchange Defenders = Barr/Crapo/Britt/Daines/Cruz (Republicans who fight the Durbin bill); Tim Scott to Credit Card Defender (CRA disapproval). New tier 'Defender' propagated to PRO sets (per_topic_flip/coalition PERS 0.20), sheet color (teal), dashboard code 'F'/teal. DLEG = 2.0, CHAMP_P = 0.75 tunable dials. 22/22 integrity.

**SELF-CALIBRATING THRESHOLDS (2026-06-26, data-hygiene pass):** user wanted thresholds to auto-adjust to each sub-category's own median/range/percentiles instead of global floors. Replaced ALL hardcoded cutoffs with a distribution-derived engine: `shaped_cut(vals,hi)` = median +/- K x IQR (K = 0.75), then the implied RATE is clamped to a sane band [RFLOOR = 0.10, RCAP = 0.40] and the cut set at that quantile ("shaped, with sanity bounds", user's choice). Offensive cats: Champion = >= shaped cut of positives, Ally = >= positive-median, Neutral = weakly positive; mirror for Opponent/Skeptic via negative-median. Defensive cats (Interchange, Credit Card): Opponent cut from the negative-LEG distribution, Defender cut from the positive-PRESS distribution (and CRA positive-leg); all derived, no hardcoded 2.0/0.03. Guards: MINN = 8 min-sample then pooled empirical fallback (POOLp/POOLn across offensive cats) for thin categories; IQR floored at 1e-9 for degenerate. Result: champion rates 6-36% (each from its own shape) vs old 0-53%; champ cuts span +0.31 to +0.96. Durbin still Interchange/Credit-Card Opponent; Interchange Defenders Barr/Walkinshaw/Williams/Fong/Timmons. Dials: K, RFLOOR, RCAP, MINN. 22/22 integrity.

**TIGHTEN + lower-tier calibration + saturation fix (2026-06-26):** user found the 36% champion rate too large and wanted skeptics/persuadable treated too. Champions tightened: K = 1.0, champion rate band [0.05, 0.20] (was 0.40 cap), rates now 5-20% (mostly 5-15%). Ally AND Skeptic boundaries now also shaped+bounded (Ally = top 30-60% of positives via shaped_cut; Skeptic via opp+skep band of negatives) instead of plain median, so all four tiers self-calibrated. Persuadable zone (Neutral+Skeptic) reported. Data hygiene: leg pillar is heavy-tailed (Warren +24 vs typical 1-5); `p80+clip` saturated the top 20% at the ceiling, so applied **sign-preserving sqrt compression** `copysign(sqrt(abs(leg)),leg)` before normalizing; reduced ceiling saturation (Skeptics 66 to 84, smoother). Final distribution at that step: Champion 425 / Defender 25 / Ally 689 / Neutral 2319 / Skeptic 84 / Opponent 100. Durbin still Interchange/Credit-Card Opponent; Interchange Defenders Barr/Walkinshaw/Williams/Fong/Timmons. 22/22.

**TIGHTER + NEUTRAL SPLIT + BIPARTISANSHIP (2026-06-26):** champions tightened again (K = 1.25, champ band [0.03, 0.12]), rates 3-10%, 331 champions. Neutral band split per-category into **Highly Persuadable / True Neutral / Lean Skeptic** by its OWN tertiles of lean (post-pass on Neutral cells; about 808/791/720). PERS updated at the time: Highly Persuadable 1.0, True Neutral 0.95, Lean Skeptic 0.85, Skeptic 0.70 (compressed on 2026-06-27, see calibration). New tiers propagated to sheet colors (blue/gray/peach), dashboard codes H/T/L.
- **Bipartisanship metric NEW** (`build_dashboard_bundle.py` to `bipartisan.json`): weighted fraction of a member's cosponsorship ties crossing party, **shrunk toward the global rate (prior about 0.24, ALPHA = 6)** so low-degree members are not 0/100. Validated: Fitzpatrick No. 2 (59%), Emmer/Kennedy bottom (3-4%); range 3-62%, median 24%. Surfaced in dashboard hover.
- Fed into BOTH IM engines as the user's described mechanic: flip nbrA/nbrB cross-party ties amplified by `1+1.5 x sqrt(bp[n] x bp[u])` (per_topic_flip cpf); coalition cascade cross-party edge-probs amplified the same way + seed-$ boost (per_topic_coalition). (Amplifier later flipped to damping, see calibration.)
- **HONEST FINDING (measured): the tilt is negligible**: flip-$ and coalition seeds both land at about 24% bipartisan = chamber median. Why: cross-party cosponsorship ties are a MINORITY of the network (members mostly cosponsor within party), so amplifying them barely moves the proximity sums, and allocation is dominated by topic-engagement + money/marginal-spread + the $50k cap. Bipartisanship's real value is as a **decision aid (dashboard hover) + tie-breaker**, not an allocation driver. To genuinely steer money would require a DIRECT target-value factor (prioritize bridges outright, tunable weight), offered to the user; built as the bridge toggle (see scenario section).

**Payoff:** 26 mixed-profile members (champion on some categories, opponent on others), e.g. Richard Hudson champions Examination/CU-Capital but opposes Interchange/Credit-Card.

**WIRED into the per-sub-category IM (2026-06-26):** `per_topic_flip.py` now derives camp, network proximity (nbrA/nbrB) and persuadability per topic from the category matrix (BLOCKCAT maps the 18 legislative blocks to 17 matrix cats; CFPB Restrain+Reach share the combined CFPB stance). PERS adds '—': 0.55. Each issue now has its own pro/anti split (Interchange 0 pro / 18 anti, Credit Card 0/63, MBL 399/0), which fixes the audit flaw that per-sub-category IM used overall stance. Re-wired IM sheet, all 22 integrity checks pass, each topic sums to $2M. `category_audit.py` = 10-check logic audit (recompute match, direction, vote-overlay 18% tier-change, Spearman 0.51 vs general stance, 62% of opponent-but-champion cells are cosponsorship-only). The OVERALL flip/coalition (`im_allocate2.py`) still uses overall stance (correct, it is the global allocation).

**Per-topic COALITION mode built** (`per_topic_coalition.py`): competitive IC per issue using per-category pro/anti seeds + congestion B-pressure (MC = 20, BSCALE = 350k, top-45 candidates, cap $50k) to `per_topic_coalition.json`. Shows issue contrast (Interchange base 0 to 319 since no pro champions to seed; Payments +4.9 saturated).

**Interactive dashboard** (`fec/build_dashboard_bundle.py` to `dashboard_data.json` columnar 71KB; `fec/make_dashboard_html.py` to standalone `C:\Users\pgoff\OneDrive\Desktop\Moneyball Dashboard.html`, 81KB): canvas network (533 nodes, spring_layout, 420 top edges), issue dropdown (18), mode toggle (coalition/flip), color-by (issue stance / party / overall), hover tooltip, top-targets panel, search-to-zoom. Party from voteview HSxxx_members.csv (party_code). NOT YET wired per-topic coalition into the IM sheet (sheet still shows per-topic flip only; mode-aware topic columns optional next). Relates to `project_moneyball_network_enhancement` and `project_stance_sentiment_overhaul`.

**Also (IM method fixes):** flip mode now uses a common money scale (removed the implicit 1.43x CU premium); coalition mode (competitive IC) now seeds congestion B-pressure with `BSCALE=350000` (congested neutrals lean opposition), giving coalition spend $1.63M / 51 seeds, +31.3 spread. `method_audit.py` added (calibration / MC-stability / OpenSecrets cross-check).

## Consult rule: multipliers, weights and thresholds are Paul's decision

Source feedback `feedback_consult_multipliers_thresholds` (2026-06-25):
- For the Moneyball / congress model, any numeric **multiplier, weight, or threshold** is the USER's call: success-stage multipliers, edge-weight knobs (size-normalization, role weights), stance thresholds, decay factors, allocation cutoffs, topic/legislative weights, etc. Present the structure, options, ranges and trade-offs, then let the user set the actual values.
- **Why:** these parameters encode strategy and value judgments (what "influence" or "success" means, who counts as an opponent, how hard to penalize popular bills, which legislative goals to optimize), not technical defaults, and the model allocates real money. The user has corrected parameters before (Opponent press cutoff -0.60 to -0.40 via a named-opponents list).
- **How to apply:** when a build needs a number, surface it as an explicit decision and wait for the user's value, but DO give options AND a recommendation with reasoning (the user wants the expert recommendation; they make the final call). Mark the recommended pick "(Recommended)". Default to the *current/existing* value when told to keep it. Related: `feedback_spreadsheet_consult_on_errors`, `project_moneyball_network_enhancement`.
- Governing page: Change control and Paul's decision authority.

## Scenario-tool pre-flight and engine build (2026-06-26)

Pre-flight pass before implementing scenario tools (budget/dial what-ifs + defection/money shocks). All in `fec/`. 22/22 integrity throughout (counts below move to 31/31 by the end).

### Core-model audit (frozen-sheet gap depth)

The Durbin-class frozen `Legislative Score - Normalized` gap did NOT corrupt the overall Rank & Allocation **stances**; they are press-anchored. Validated: Marshall & Reed have POSITIVE raw legislative (bipartisan cosponsorships) yet are correctly **Opponent** via press; ZERO members are Champion/Ally with strongly-negative press; Durbin Opponent. Frozen-leg (R&A col D) vs naive archive-sum: corr 0.08, 43 sign flips, but the naive archive sum is ALSO wrong (artifact: Durbin sums +26 from bipartisan bills). So **do NOT reconcile the core model to a naive archive**; it would be worse. Damage was contained to the per-category layer (already fixed). Decision: no risky refresh; the corrected per-category layer is the category-level truth, overall stances reliable.

### Coalition determinism bug (the big one)

- `per_topic_coalition.py` was non-deterministic even at fixed `random.seed`: two same-seed runs differed $12.6M. Cause: the cascade frontier was built from **sets** (`dict.fromkeys(Aseeds,...)`), and Python per-process **hash randomization** varies set iteration order, so random draws were consumed in a different order.
- Fix: `sorted(Aseeds)/sorted(Bseeds)` in cascade (line ~35) + **Common Random Numbers** (`random.seed(1000003*SEED+it)` per MC iteration in `spread()`, so base and every `spread({n})` share draws, so the marginal isolates the true effect) + `SEED`/`MC` now env-configurable. Now same-seed = byte-identical ($0).
- **Scenario protocol: always run baseline + perturbed at the SAME seed, so deltas are exact with zero MC noise.** Residual cross-seed variance (about $13M between seed99/199 at MC = 20) is baseline-credibility only (which seed picked), irrelevant to same-seed deltas; bump MC or seed-ensemble later if the baseline itself needs to be less arbitrary. `per_topic_flip` is already deterministic (greedy LT, no MC).

### Infra built

- `make_baseline.py` freezes current outputs to `Draft Systems/baseline/` + manifest (seed/MC/budget).
- `scenario_diff.py <cur> <base>` = top per-member $ movers across topics.
- `data_confidence.py` to `confidence.json` (0-100 per-member coverage: leg breadth 50 + press 30 + votes 20); 36 low-conf members, 22 with ZERO archive bills, single-pillar cats = CDFI (press-only) / TCPA (leg-only), votes cover only about 3 cats. Reports $50k cap saturation per topic (binding hard: Data Privacy 23/31, CU Capital 4/4). Confidence surfaced in dashboard hover (`cf` field).

### Budget/dial what-if tool

Framed as "cautiously expand while retaining the core coalition." `budget_frontier.py` = **CELF lazy-greedy nested frontier**: pro champions are the free core, then add seeds by leverage-weighted marginal-spread-per-$ (deterministic cascade with CRN + sorted frontier), recording the path (budget to spread), seed entry order, and the diminishing-returns **knee**. Nested by construction ($500K inside $1M inside $2M, so the core is retained). Validated on Interchange: core 11 (base 48), +45 seeds, knee $1.85M. The budget slider = live lookup of the precomputed path.

### Electoral model (user decisions)

- `build_electoral.py` to `electoral.json` = competitiveness `1-security` from Ballotpedia `Election_Average` (Golden/Ossoff/Warnock most competitive, Schiff/Padilla safe; 503/533 matched). User chose **leverage-only** (no durability discount) and **directional**: agreeable supports the incumbent (defend), hostile supports the challenger (replace). `build_electoral_plays.py` to `electoral_plays.json`.
- **NON-PARTISAN is a hard requirement (user: CUs stay non-partisan, do not bias against Democrats).** Data showed a real skew (D 17% hostile vs R 10%) AND mislabels (Warnock = Skeptic off just -0.16 press, not an adversary). Fixes kept the core stance model (real positions) and fixed the ACTION layer: (1) **replace gated on OVERALL Opponent only** (drop Skeptic, so Warnock falls out); (2) **PRIMARY route** = replace a hostile incumbent with a friendlier SAME-PARTY member, benchmarked on **same-party average** (targets intra-party outliers, works in safe seats, never shifts party balance); the cross-party "general" route kept as a flagged partisan option. Result party-balanced **31 D / 22 R replace**; Hawley now "primary a friendlier R" not "fund a D". Defend (Champion/Defender/Ally, vs cross-party loss, x competitiveness) = 309, both parties.
- **Frontier integration (toggleable ELECTORAL mode):** `budget_frontier.py --electoral` (or env ELECTORAL=1) adds replace plays into the CELF greedy; a funded replace **converts that Opponent anti to pro in the same cascade** (`spread()` does `anti-set(extra)`), so it is valued in the same spread units as a coalition seed, x REPFAC = 0.6 (primary-win feasibility). Validated Interchange: coalition 112 to electoral 142 (15 replace seeds enter, both parties: Merkley/Reed/Durbin/Tran D, Hamadeh/Budd/Thune R). Outputs `budget_frontier.json` (coalition) + `budget_frontier_electoral.json` with `defend_overview`. Dials: REPFAC, LELEV, LEV, MAXSEEDS, all env.
- **DEFEND folded into greedy + AUDIT (roadmap step 1, done):** defend is a real cost-line. Model: a competitive at-risk ally (pro on issue, EP defend, comp >= 0.4) is only PROBABILISTICALLY pro in the baseline (held w.p. 1-comp); defending forces them to hold, so marginal = expected spread recovered. Two-set CELF (S = coalition/replace additions, D = defended); spread(extra, defended) discounts at-risk allies. `audit_frontier.py` caught 3 real bugs, all fixed: (1) Allies double-listed in coalition+defend pools, so coalition cand = Neutrals only; (2) congestion `bx` draw broke CRN (only rolled for unseeded members, so adding a seed shifted the RNG sequence), now rolls for every member then filters; (3) display non-monotonicity (MC cascade-divergence noise CRN cannot cancel), path 'spread' clamped non-decreasing, true `cur` kept for marginals. Re-audit **11/11 pass** (monotonic, submodular-tolerant, types, base-discount, party-balance, knee, nested).
- Honest residual: replace plays entering the frontier lean D (about 30 D / 14 R) because adversaries cluster on contested issues (interchange/rate-caps); the primary framing keeps each play non-partisan but the aggregate tilts D; open whether to actively balance optics.
- **Diminishing returns status:** flip = sqrt(money) yes; coalition = across-seed (submodular + cap + knee) yes but NOT within-seed (binary to cap); industry/bank congestion soft-capped 0.9, not smooth, so add a real per-$ response curve for BOTH CU+competitor money in roadmap step 2 (money shocks). ROADMAP: step 2 = defections + money shocks DONE; step 3 = scenario running under the two models (needs refresher); dashboard LAST after all verified.
- **STEP 1 close:** "replace" renamed "contest" (sed excluding errors='replace'/.replace()); re-audit 11/11 clean. Play type is now `contest` everywhere (electoral_plays.json, frontier files, audit).

### Step 2: money-response + defection mechanic (DONE; `money_response.py`)

- User chose **saturation-aware curve** + **money-triggered AND manual defections**. Key correction: the `saturation` field is PAC$ divided by receipts (<1% for most, e.g. Daines 0.82%) so it adds little; **receipts (capacity)** does the "flush member barely moves" work.
- Model: `shift_lean(m,source,amount) = +/-MAXSHIFT x (r/(r+HALF))`, r = amount/max(receipts, 200k floor); concave so diminishing returns, capacity-aware. Validated: $100k moves Daines (+9.2) / Golden (+4.5) / GluesenkampPerez (+3.1) by receipts size; Golden $250k gives +9.6 vs $500k gives +15.5 (concave).
- `defection(m,dlean)`: if |dlean| >= DTHRESH = 15 and the member is persuadable (NOT Champion/Defender/Opponent), drag stance toward the money by int(|dlean|/DTHRESH) tiers along ORDER. comp + $250k defects Ally to Neutral etc. Dials MAXSHIFT = 40, HALF = 0.10, DTHRESH = 15 (as of this step; MAXSHIFT later 18 per calibration; the calibration note records DTHRESH 25 to 15, a discrepancy with this step's DTHRESH = 15 that the sources do not reconcile).
- Watch: low/under-reported-receipt members hit the $200k floor, so they are maximally movable (data artifact; fixed later by HIGH-2). Other variables to maybe add: current-lean asymmetry (pulling back a captured member costs more), incumbency/seniority, chamber. NOT yet wired into net_lean recompute, flip/coalition re-run (that is step 3 scenario running).

### Step 3: pathfinding from 2 papers (user attached, in Downloads)

- (1) RELINK / Closed-Network-IM CIKM25 = edge-activation IM under a per-node out-degree budget (each member whips <= k colleagues), maps to co-sponsor campaigns. (2) Multi-Objective Path-Based D* Lite (MOPBD*) = incremental multi-objective shortest-path (reuse search when edge costs change so real-time; Pareto over conflicting objectives).
- User decisions: co-sponsor route = **Pareto multi-objective** (co-sponsors / money / risk, risk = cascade-failure prob); sheet connection = **incremental D* Lite** (edit a cell, replan only the affected slice; win32com available, no xlwings/watchdog).
- **Co-sponsor route finder BUILT + validated** (`cosponsor_route.py`): seeds = champions, edge-activation greedy (tree-reach spread, edge cost = CEDGE/p so weak ties cost more), out-degree K = 5, Pareto front via risk-aversion lambda sweep. Fixed a value-inversion bug (added positive-value guard `if -nval<=0: break`). Validated: Mortgage max-spread $419k / +5.6 / risk 0.59 vs low-risk $33k / +1.2 / risk 0.39 (distinct Pareto points); **Interchange has NO reliable routes** (champions weakly tied, all p about 0.10, so do not run a co-sponsor campaign there). Caveat: tree-reach spread is first-order/conservative (ignores cascade reinforcement), could upgrade to MC cascade. Audits still clean (22/22 + 11/11).

### Step-3 finish + reorg (order: LT-priming, sheet, MC, audit, reorg)

- `lt_priming.py` to `lt_priming.json`: per-target LT flip recipe, cheapest balance of network pressure (recruit which neighbors, each adds P[u][v]) + direct money (diminishing). theta by tier + net_lean resistance. Validated Mortgage: low-gap = money-only, Cassidy gap 1.15 = pressure (recruit Kennedy/Warren/Ossoff).
- `sheet_sync.py`: writes `Melange - Live` tab to the workbook via COM (win32com), + **D*-Lite incremental**: md5 fingerprint per topic (stances + net_lean); diff vs `sheet_sync_snapshot.json`, only CHANGED topics flagged for recompute (validated: 0 on no-op, exactly 1 on a single Interchange edit). (COM-era mechanism, superseded by Phase 2 "NO COM anywhere".)
- `cosponsor_route.py` MC upgrade: `MCMODE=1 MC=40` recomputes route reach via IC cascade on the induced subgraph (captures reinforcement) vs the default fast tree-reach. Validated higher + compounding ($75k tree 2.1 to MC 2.8). CRN-deterministic.
- `audit_full.py`: consolidates integrity (22) + frontier (11) + new module checks (money concavity/capacity, electoral gating+balance, stance sanity, route Pareto + MC >= tree + determinism, priming validity) = **18/18 ALL CLEAN**. (3 initial fails were audit-script bugs: over-strict Durbin-CreditCard assertion [he is Skeptic now not Opponent], route-front regex missing multi-space.)
- **REORG: canonical home is now `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\`** (189MB, self-contained, README.md maps it). Selective copy of working materials (fec/ 48 scripts, 26 json, 47 xlsx incl workbook, votes/ members, baseline/, research/ 2 papers, dashboard). Paths updated (Draft Systems to Melange Systems; workbook/dashboard now under Melange Systems). Verified 18/18 from the new location. **`Draft Systems` left INTACT** (NOT deleted): holds 3.4GB raw/models (debate_finetuned safetensors 1.4GB, FEC itpas2.txt, press indexes) that are irreplaceable and only needed to regenerate base data; in OneDrive, so a full copy/delete was avoided. Future work: use Melange Systems\fec (the harness still resets cwd to Draft Systems, so cd to Melange). The user may clean up Draft Systems' redundant working-file duplicates at will. (Draft Systems is folded into [[melange-systems]]; its R code root is [[draft-systems-r-pipeline]].)

### Brutal internal audit (2026-06-26, from canonical Melange Systems)

- **BUG FOUND+FIXED**: `money_response.py` defection `ORDER` list mixed taxonomies: it used per-category tier names (Defender/Highly Persuadable/True Neutral/Lean Skeptic) but operates on OVERALL stances (Champion/Ally/Neutral/Skeptic/Opponent/Unengaged). Result: 111 members defected to the invalid "Lean Skeptic" overall tier; 39 Unengaged could never defect. Fixed: ORDER = ['Champion','Ally','Neutral','Skeptic','Opponent'], COMMITTED = {'Champion','Opponent'}, Unengaged to Neutral. Now only valid tiers.
- **Weak self-check fixed**: the audit_full defection check was a tautology (`... or True`); replaced with a real validity check. audit_full now **19/19**.
- **False alarm resolved**: electoral primary value re-derivation mismatched, but the stored value is CORRECT; primary intentionally omits competitiveness (primaries are not gated by general margin); the re-derivation wrongly added comp.
- **Clean (verified)**: money-model invariants (pcts to 100, net_lean = cu_adj - industry_adj, industry_adj = banks + finserv, 0 violations); member-set consistency (533 all files, archive_leg 511 = 22 no-bills); stance scores in [-1,1], no all-champ/all-opp; frontier monotonic + no degenerate + seed-accounting exact; electoral security in [0,1], leverage in [1,1.6]; bipartisan in [3,62]; route edge-prob in [0.008,0.613]; coalition determinism byte-identical; 0 NaN/Inf in all JSON; all 146 LT-priming recipes close their gap; route Pareto 0 dominated points.
- **Data-quality flags (not bugs)**: 63 members (12%) zero PAC-money (mostly legit PAC-refusers e.g. AOC; 14 unmatched in FEC with receipts = 0); 18 members <= $200k receipts hit the money_response floor and are max-movable; net_lean = None leaks into 2 VIZ scripts only (assemble_viz, sna_layout), not the model.
- **DOES IT RUN SCENARIOS? NO end-to-end runner.** Pieces existed (money_response computes shift+defection; scenario_diff compares; make_baseline freezes; sheet_sync detects changed topics) but NOTHING applied a shock, propagated net_lean, regenerated data, re-ran flip/coalition and diffed in one command. money_response was a calculator/demo, writing nothing. The missing piece = a scenario runner (OFFERED to build).

### Scenario runner built + 2nd reorg bug found

- **Reorg bug found+fixed**: the Melange reorg sed silently FAILED on the workbook path: 34 scripts still pointed at `Desktop\Moneyball Main Version` (worked only because the Desktop original lingered). Fixed all 34 via python str.replace to `Desktop\Melange Systems\Moneyball Main Version`; the workbook copy IS in Melange; 19/19 against it. Melange now truly self-contained.
- **Research corpus** (user's library in Downloads, about 10 relevant): RELINK (closed-net edge-IM), MOPBD* (D*-Lite incr multi-obj), **Adaptive Submodularity (Golovin-Krause, appears 3x)** = adaptive policy/observe-then-decide + lazy greedy guarantee, **Competitive IM (Bharathi-Kempe-Salek) = viral-competitive** = the foundation of the A/B cascade, Cosponsorship to bill-passage (Sotoudeh-Porter-Krishnagopal 2406.19554), Lobbying-network dynamics (Bacik / In Song Kim 2503.11745), Signed-network coalitions (Aref-Neal x2 = basis of hidden coalition), IM-algo empirical (s41598-026 CELF++/RIS/IMM).
- **`scenario.py`** (end-to-end, grounded): `--money "Member:cu|comp:amount" --defect Member --stance "Member:Issue:Tier"`. Applies moves, then money_response shift_lean + defection (comp raises ind/B-pressure; defection = general disposition shift across the member's movable per-issue tiers via CTORD), then computes competitive-cascade CU spread per topic baseline vs scenario (deterministic CRN + sorted, MC = 40), then reports per-topic + net influence delta + defections. `budget_frontier` got CONGEST/CATSTANCE env-overrides so scenarios can feed perturbed state. Validated: comp $300k Grijalva + $500k Golden + cu $200k Tim Scott gives both Dems defecting (Ally to Skeptic/Neutral), Scott absorbs, net -4.8 co-sponsors; deterministic. audit_full now **22/22** (scenario end-to-end + determinism + sign checks added).
- **HONEST LIMITATIONS**: (1) CU spends only act via conversion/defection, no gradual winnability in the coalition cascade (that is the FLIP model); a non-converting CU spend shows about 0 effect. (2) 18 low-receipt floor members (incl Grijalva) defect too easily (the receipts-floor artifact). (3) The runner is ONE-SHOT (apply then observe); the ADAPTIVE optimizer (Golovin-Krause: greedily CHOOSE the moves to max influence under budget, observing realized defections) is the natural next layer, NOT built at that point.

### Flip-channel wiring + adaptive optimizer

- **`flip_model.py`** (shared, faithful to per_topic_flip): `pflip(cu,ind,nA,nB,..) = a/(a+b)`, a = WM x sqrt(cu+1)/scale + WP x nA/mAt, b = WM x sqrt(ind+1)/scale + WP x nB/mBt; `flip_value(cat,MAT,cu,ind) = sum tgt x pflip`; topic_setup cached per stance. Imported by scenario + optimize.
- **scenario.py** now reports BOTH channels: COALITION (cascade, camp/defection-driven) AND **FLIP (winnability, money-driven)**. CU spends finally register: gradual, diminishing (Wicker +$25k gives +0.040 ... +$400k gives +0.113). Validated comp shock drops both (coalition -4.8, flip -0.37 for Golden $500k); CU spends raise flip net.
- **`optimize.py`** = ADAPTIVE OPTIMIZER grounded in Golovin-Krause Adaptive Submodularity: lazy/CELF greedy allocates CU budget to maximize sum flip_value (submodular sqrt-curve gives (1-1/e)); ADAPTIVE = when a member's cumulative CU crosses their money_response defection threshold they CONVERT (stance to pro), we observe it, clear cache, rebuild marginals, re-optimize. $2M gives +39.82 expected flips; 3 conversions (Patronis/Walkinshaw/Moody). Writes `optimize_result.json` (frontier + alloc + conversions). Deterministic.
- **HONEST CAVEAT**: the optimizer spreads THIN ($25k x about 80 members), math-optimal under the flip sqrt-curve (first dollar everywhere > second dollar anywhere; money effect modest vs network proximity), but practically you would concentrate; no diminishing-returns knee within $2M. Conversions reflect the receipts-floor artifact (low-receipt members convert at $25k). Could add a min-chunk/concentration constraint or capacity-aware (money_response) money in pflip to reconcile the two diminishing-returns curves (flip sqrt vs money_response receipts-saturating).
- **audit_full now 26/26** (flip-channel + optimizer runs/monotone/deterministic checks added; fixed 2 stale regex from the renamed NET output, not system bugs).

### Diminishing-returns reconciliation + concentration

- Replaced the flip model's absolute-sqrt money term with a **capacity-aware saturating curve** (Michaelis-Menten): `a = WM*(cu+1)/((cu+1)+HALFF*R) + WP*nA/mAt` (HALFF = 0.10, R = receipts floored 200k) in BOTH `flip_model.py` AND `per_topic_flip.py`: the same receipts-relative form as money_response, so the system has ONE consistent diminishing-returns model (a $X check moves a big-receipts member less). Regenerated `per_topic_alloc.json`. Baseline winnability shifted 202.88 to 215.92 (new curve).
- **Optimizer concentration**: min-chunk `INC=$100k` (a PAC does not micro-allocate $25k) + per-member cap `PMAX=$300k`. Now allocates about 20 members at $100k (realistic) vs the old $25k x 80 thin spread. Honest trade-off surfaced: $25k spread gave +40.8 winnability (math-optimal but assumes $25k effective everywhere), $100k chunks give +17.3 (realistic/concentrated). INC/PMAX are dials. Conversions still fire (Hoeven/Hickenlooper convert at $100k, improve 10-12 issues).
- audit_full **26/26** clean after the change. SYSTEM STATE: stance(3D) to flip(LT, capacity-aware) + coalition(competitive IC) + electoral(contest/defend) + routes(RELINK Pareto) + priming(LT) + money-response(defections) + scenario runner(both models) + adaptive optimizer(Golovin-Krause), all in Melange Systems, 26/26. Only the DASHBOARD UI remained (roadmap's last item).

### Independent adversarial audit + fixes (separate cold agent)

A cold general-purpose agent (no investment in the code) re-audited. It found REAL bugs the self-written audits were structurally blind to (the "26/26" only checked NET aggregates + headline signs). It ALSO verified the core spine is sound (pflip identical across modules 1360/1360; money_response and flip reconciliation real same Michaelis-Menten; CELF lazy-greedy provably correct = exhaustive; determinism byte-identical; structure 533/range(3,536) clean; lt_priming 146/146; Pareto 0 violations).
- **H1 (FIXED)**: the optimizer scored WINNING a member as a LOSS (shift_pro lowers their PERS, which lowers flip_value, so the conversion delta was negative). Fix: `won` set + `secured` accumulator in `optimize.py`; a conversion banks m's flip at certainty (sum tgt) into `secured` and removes m from the flippable pool. Path now MONOTONE (0 drops, verified).
- **H2 (FIXED)**: scenario per-topic rows were below the MC noise floor (std about 0.75-1.05 vs 0.3 threshold), giving impossible "competitor money helped CU" signs. Root cause: the cascade drew `random.random()` in activation order, so changing one member desynced the whole stream (CRN failure). Fix: splitmix64 `_sm(it,u,v)` edge-keyed draws = true CRN, so baseline vs scenario differ ONLY by the real perturbation. Comp shock now clean: coalition -3.2, only same-sign rows. (`budget_frontier.py` had the same latent order-dependence, patched there only by non-monotone clamping; apply `_sm` there too if its per-topic deltas ever matter; done later in HIGH-1.)
- **H3 (FIXED, later REVERSED)**: members with NO FEC data had ind = 0, b about 0, pflip about 1 ("missing" misread as "no industry opposition"); 11 of 63 ranked top-50 winnability, inflating the base (215.92). Fix: impute industry baseline (median of members WITH data) for zero-`total` members in `flip_model.py` + `per_topic_flip.py`; `fm.nodata` flags them. Base now realistic 186.50; 0 data-less in top-20. CAUGHT a follow-on: the scenario flip channel mixed imputed `fm.ind0` (baseline) with raw local `ind` (scenario), so the comp shock showed +28 winnability; fixed via `ind_flip = fm.ind0 + (ind-ind0_raw)` (one footing).
- **L3 (FIXED)**: `per_topic_flip.py` had no `__name__` guard, so importing it overwrote `per_topic_alloc.json`. Wrapped main(). **L1 (FIXED)**: removed dead `moneyscale` (flip_model + per_topic_flip).
- audit_full now **29/29** (added comp-shock flip-channel sign, optimizer path-monotone, no-data-not-top-20).
- **STILL OPEN (modeling knobs / presentation, user's call)**: M1 defection over-sensitive (35% convert on one $100k, tune DTHRESH/MAXSHIFT); M2 overall-spectrum step count applied to per-category CTORD (direction right, magnitude a simplification); M3 CFPB-Reach block 145 dropped from the flip channel (17 vs 18 grain; stance still combined-correct, only the eng signal omits 145); M4 stale `im_allocation.json` (old `im_allocate.py`, no Defender) still in the workbook IM sheet, regenerate or remove; M5 `—`/no-position PERS = 0.55 drives 59.8% of cells (sensitivity-test); L4 diffusion kernel cpf-amplified in coalition/scenario but not cosponsor_route/lt_priming (document or unify).

### Second independent audit (math + formula article + data integrity) + fixes

A second cold agent (opus) wrote `MATHEMATICAL_SPECIFICATION.md` (every formula, 30+ constants with values/units/sources, worked pflip example, research citations), independently re-audited the math and checked data integrity. VERDICT: "core mathematics is sound and the data is clean": pflip identical across modules, CELF == exhaustive greedy, path monotone, Pareto non-dominated, all 148 priming recipes close, money curve reconciles, clean 533-member set everywhere, BLOCKCAT identical across 4 modules. Found NO wrong-output/wrong-sign/out-of-range bugs in core scoring. Real findings (all FIXED):
- **HIGH-1 (FIXED)**: scenario.py's edge-keyed CRN (`_sm` splitmix64) was NOT in `budget_frontier.py` / `per_topic_coalition.py`; they still drew random.random() in activation order (residual marginal noise about 0.01-0.1 at MC = 20). Ported `_sm` + `cascade(...,it)` into both. Audit now guards it (budget_frontier single-topic determinism check).
- **HIGH-2 (FIXED)**: receipts = 0/null floored to $200k made a $100k chunk look like 50% of fundraising, giving instant conversion (34 members, 18 no-data). `money_response.receipts()` now imputes the MEDIAN receipts ($2.28M) for no-data members. Instant-convert on $100k: 35% to 2.3%.
- **HIGH-3 (FIXED then reversed below)**: the H3 imputation only fired for total = 0; 43 members had a FEC record but ind = 0 (zero captured bank/finserv), 6 ranked top-20 winnability. Extended imputation to EVERY ind = 0 member (median industry money), `ind_imputed` set, env-tunable IMPUTE_IND0=0 to trust raw zeros. Conservative (only lowers inflated winnability). Base winnability 171.76 to 154.57.
- **MEDIUM-2 (FIXED)**: optimizer knee always = full budget (thin spread keeps marginals flat); now reports "no diminishing-returns knee within budget" honestly instead of implying a knee at $2M.
- **LOW-2 (FIXED)**: stale README "18 passed" to 29 (now 31).
- **STILL OPEN (documented, low)**: MEDIUM-1 optimizer banks conversion `contrib=Sum tgt` at pre-conversion PERS not champion weight (net jump small positive, monotonicity intact, defensible "bank what you converted"); LOW-1 `per_category_stance` defl `<neg> and 2.0` idiom brittle; LOW-3 41 network-isolated members (5 PRO seed but spread nowhere; coverage limit, correct behavior); LOW-4 bpf[n] vs bpf.get (latent, bpf 533/533 so not live).
- audit_full now **31/31** (added ind = 0-imputation-applied + frontier-CRN-determinism checks). NOTE: the workbook IM sheet should be refreshed via `write_im_sheet.py` (COM, needs Excel closed) to push the regenerated `im_allocation.json`; the JSON is consistent (G2 passes) but on-sheet cells lag until pushed.

### FEC data-quality assessment + HIGH-3 reversal

Pushed the workbook IM sheet (`write_im_sheet.py` via COM, 533 x 22, backup PRE-IM-20260626.xlsx). Then assessed FEC data quality and re-verified suspect members on FEC per the examined industries.
- **FEC method** (`full_congestion.py`): industry money = FEC bulk `itpas2.txt` (PAC to candidate, types 24K/24Z) aggregated from a HARDCODED set of 33 major industry PAC committee IDs (BANKS = 23: ABA/Citi/Wells/JPM/BofA/PNC/USBancorp/ICBA/TD/Regions/Truist; FINSERV = 10: AFSA/Amex/CapOne/Visa/MC/Discover/Ally/Synchrony), joined name to bioguide to FEC-candidate via legislators.csv; receipts from weball24.txt. Source files (122MB itpas2.txt, cm.txt, weball24, legislators.csv) present in fec/.
- **GAP TEST** (scratch `fec_verify.py`): for the 43 total > 0 / ind = 0 suspects, scanned ALL their 24K/24Z PAC money named via cm.txt. RESULT: ind = 0 is **VERIFIED REAL**, not a tracking gap. 80% of all 533 have tracked industry money (list works broadly). The 43 are 39 D / 4 R, many no-corporate-PAC (Tlaib $86k total PAC). Their "untracked industry" money is almost entirely INSURANCE PACs (life/health/crop/P&C, a different industry) + false-positives (END CITIZENS UNITED matched "citi"); genuine untracked bank/finserv is negligible (Bread Financial $5k, FSI $5k).
- **THEREFORE REVERSED HIGH-3**: the ind = 0 imputation FABRICATED bank opposition these members verifiably do not have. Corrected the trigger to **receipts = 0** (no FEC fundraising record at all = truly blind: 18 new/special-election winners like Grijalva/Moody). The 91 members who raised money but show ind = 0 are TRUSTED (real zero = "not captured by the banking industry", legit signal). The old total = 0 trigger wrongly imputed 49 genuine no-PAC members. Env IMPUTE_IND0=0 disables. Base winnability 154.57 to 191.46 (real zeros correctly un-depressed); 0 blind members in top-50; top targets sane (Tim Scott / Andy Biggs / Ro Khanna). audit_full check rewritten to "impute only no-FEC-record; trust verified-real zeros", so **31/31**. Updated `MATHEMATICAL_SPECIFICATION.md` sec 4.3 + data-integrity table.
- **DATA-QUALITY VERDICT**: the FEC industry-money method is sound; `ind` measures "money from the 33 major bank/finserv PACs" (a curated competitor signal, not all-industry). ind = 0 = not funded by major banks (real). Only the 18 receipts = 0 members are genuinely data-blind. Caveat for the user: `ind` excludes INSURANCE and minor/regional finance PACs by design.

### Bridge toggle

`per_topic_flip.py --bridge` (or env BRIDGE=1) applies a direct bridge target-value boost `tgt*(1+GAMMA*bp)`, GAMMA = 1.2, writes a separate `per_topic_alloc_bridge.json`. OFF by default. Gentle tilt (Mortgage $-weight bipartisan 23.9% to 24.3%, gainers Cassidy/Kustoff/Cramer). See the bipartisanship metric and cross-party cascade amplifier (negligible effect, kept as decision aid) in the Category Stance section.

## Empirical calibration (2026-06-27)

Calibrated the Moneyball model parameters to empirical effect sizes (user: "tastefully calibrate... consult on changes"). Spawned 4 opus research agents (money to behavior, legislative-network diffusion, persuasion/cues, electoral money) that web-searched about 40 papers with effect sizes; Claude synthesized and consulted via AskUserQuestion; the user approved each fork. Backups of the 11 pre-calibration files in scratchpad/calib_backup.

**THE EVIDENCE (key anchors):** money buys ACCESS/EFFORT, not votes (about 75% of contribution-to-vote studies null: Ansolabehere-deFigueiredo-Snyder; Fowler-Garro-Spenkuch reject corporate returns > 0.3%; Kalla-Broockman 3-4x access). Influence diffuses LESS cross-party (Harmon cross-cut about 1/10 homophilous; Andris cooperators < 1.5% of dyads); the pro-bipartisan result (Volden-Wiseman +8-14% advancement) is PASSAGE-level, not tie-level. Persuasion is small/compressed/parallel (Coppock about 5pp / 0.1SD; Kalla-Broockman general-election persuasion about 0). Electoral leverage is real where voters are not locked in (Sides-Vavreck-Warshaw ads 2.5-19x down-ballot); persuasion works in primaries, not safe generals.

**CHANGES APPLIED (user-approved):**
- PERS compressed about 10:1 to about 3:1 (flip_model + per_topic_flip): Champion .20 to .10, Defender .20 to .12, Ally .45 to .40, HiPersuad 1.0 to .55, TrueNeutral .95 to .50, LeanSkeptic .85 to .40, Skeptic .70 to .25, Opponent .10 to .08; '—' .45 to .50 (a blank = uncommitted/movable about TrueNeutral, not Ally). (The Category Stance section recorded '—' PERS = 0.55 and the audit note M5 also says 0.55; the calibration note says the pre-change value was .45. The sources do not reconcile this; the post-calibration value is .50.)
- MAXSHIFT 40 to 18 (money_response + lt_priming): money moves positions little.
- DTHRESH 25 to 15: money CAN still rarely flip the most-movable (user chose this over "never"); MAXSHIFT 18 means flips need a near-max donation, so rare/niche.
- WM/WP 0.6/0.4 to 0.35/0.65 (flip): money the minority partner to network.
- CROSS-PARTY: cpf flipped from AMPLIFIER (1+1.5 x sqrt, up to 2.5x) to DAMPING (0.4+0.6 x sqrt, 0.4-1.0x) in the DIFFUSION channel (cascade/recruitment/path: per_topic_coalition, scenario, budget_frontier, lt_priming, cosponsor_route, dashboard PE). The bipartisan BONUS moved to PASSAGE: tgt x (1+0.3 x bpf) in flip (Volden-Wiseman) + the existing BETA_C coalition-seed boost.
- SOURCE-ALIGNMENT (new, decision 4): the FLIP persuasion proximity (flip_model/per_topic_flip nA/nB + dashboard flipModel) now uses `align` = co-partisan x1.7 / out-partisan x0.5 (Furnas/Bakker: who delivers the ask). DISTINCT from cpf-damping (which is diffusion); flip uses align, cascade/path use cpf-damping.
- Edge-prob half-saturation +4 to +6 (all P = (w*cpf)/(w*cpf+6)): P = 0.5 now needs a top-decile tie (TERGM per-tie probs about 0.05-0.12).
- LELEV 0.6 to 0.8 (build_electoral): competitive seats up to 1.8x.
- BSCALE 350k to 400k (cascade mobilization; Senate ideally higher, left as dial).
- THETA widened (lt_priming + bundle): LeanSkeptic 1.3 to 1.5, Skeptic 1.6 to 2.0, +Opponent 3.0.
- Recruitment $ already FEC-bounded ($1-10k/person) from the prior realism pass.

**CORE before/after (flip+money only, shown to the user):** total winnability 191.5 to 186.3 (-2.7%, spread compressed but blanks rose); $100k money-defection 2.3% to 0% (now rare via DTHRESH 15); top-10 reshuffled, party-balanced 13R/12D. Full propagation + regenerate + re-audit followed approval.

**HONEST STANCE told to the user:** the papers ground the model METHODOLOGICALLY (strong) but EMPIRICALLY only partially; these are evidence-anchored magnitudes, not a fitted forecast. All judgment params remain env-overridable.

## Weights ledger (pillar weights, all sets with status)

Order of the four June buckets as recorded: Press / Legislative / Committee (Influence) / Demographic unless stated.

| Date | Weights | Status |
|---|---|---|
| 2026-06-18 | 50/50 legislative/press (legislative weights x5/7 sum 0.5, press 0.5) | version 2 file, superseded |
| 2026-06-21 | Press 0.40 / Legislative 0.20 / Committee 0.35 / Demographic 0.05 (`Rank & Allocation!S2:S5`) (user first said 40/40/15/5) | four-bucket FIXED file, min-max |
| 2026-06-25 first delivery | Legislative 0.40 / Influence 0.30 / Press 0.20 / Demographic 0.10 (`Blended!AB2:AB5`) | superseded same day |
| 2026-06-25 FINAL (user "really accurate") | Legislative 0.20 / Press 0.40 / Influence 0.35 / Demographic 0.05 | the Blended Model weights as of the end of this build |
| `.40/.30/.20/.10` (2026-06-29) | historical set (pillar order not stated in this topic's sources) | HISTORICAL, recorded per ruling 3 |
| `30/25/40/5` (leg .30 / press .25 / inf .40 / demo .05, user-changed 2026-07-07, backup PRE-WEIGHTS-20260707) | **LAST RATIFIED** (ratified 2026-07-07) | see the influence engine internals topic (`2026-07-feature-influence-engine-internals`) |
| `45/10/40/5` (live in `ranks_python.json` since 2026-09-03) | **LIVE BUT UNRATIFIED**; code-review S-5 awaits Paul's ruling | later phases |

Never read the newest set as ratified.

## Superseded guidance: Excel COM as the write path

- ~~"Writes go through Excel COM"; recalc via `New-Object -ComObject Excel.Application; $xl.CalculateFull()`; `write_im_sheet.py` and `sheet_sync.py` push to the workbook via COM/win32com; recalc on a LOCAL copy outside OneDrive~~ (June 2026, all sections above) - superseded by Phase 2 (system-of-record inversion): `ranks_python.json` is the authority, the workbook is a view, **NO COM anywhere** (approved resolution 5). Kept because it explains older commits/artifacts (backups, `Melange - Live` tab, PRE-IM-20260626.xlsx) and the COM gotchas (numeric `.Value2` InvalidCastException, OneDrive race, autorecover rollback).
- ~~openpyxl save then recalc requirement (cached formula values stripped)~~ - same supersession; the workbook no longer carries authority.

## Source sessions

Source memory files and their `originSessionId`: `project_moneyball_model` d279fcfc-26d5-4f6e-afc3-96a463c8444d; `project_moneyball_presentation_audit` fbbefbbc-a8d0-4421-b130-55a37f8b2d78; `project_moneyball_blended_audit` 28614cf6-2bb1-4390-b277-8f4655bea221; `project_cfpb_directional_split` 44bf79e7-b840-4e4c-aa29-904d228cede7; `project_committee_relevance_scoring` 96ebdbf6-296f-423c-a755-2306210f9c92; `project_press_raw_alignment` a2fc3da2-d870-4629-a38f-9bb1270daf2c; `feedback_consult_multipliers_thresholds` 322a8841-5e05-44a4-898b-337889b01d14; `project_category_stance_3d` and `project_moneyball_scenario_prep` 7bb75aca-e051-434f-834a-fe8861e901f5; `project_moneyball_empirical_calibration` (no session id recorded; type project).

## Verbatim formula spellings and source descriptions

Formula spellings as written in the sources (kept exactly for searchability):
- Money response: `shift_lean(m,source,amount)= ±MAXSHIFT·(r/(r+HALF))`, r = amount/max(receipts,200k floor).
- Flip model: `pflip(cu,ind,nA,nB,..)=a/(a+b)`; `flip_value(cat,MAT,cu,ind)=Σ tgt·pflip`.
- Optimizer banking (MEDIUM-1): `contrib=Σtgt`.
- Category stance combination: `0.55·legislative + 0.35·press + 0.10·votes(if n≥5)`.
- Bipartisan cross-party amplifier (superseded 2026-06-27): `1+1.5·sqrt(bp[n]·bp[u])`.
- Original score cascade: `SUMPRODUCT(Table6 dims × Primary weights)`.
- Electoral replace result wording: "route kept as flagged partisan option. Result party-balanced **31 D / 22 R replace**, Hawley now" a primary on a friendlier R.

Memory-file descriptions (the source `description` lines, abbreviated where long):
- `project_category_stance_3d`: "Per-category stance matrix (member×17 topics) — the "third dimension" added 2026-06-26; honest finding that votes don't decompose cleanly by category."
- `project_moneyball_blended_audit`: "Audit of "Moneyball Main Version - Blended.xlsx" — Blended Model is canonical; Topic Weights sheet is stale; legacy R&A ranking still on first tab."
- `project_moneyball_presentation_audit`: "Audit of "Moneyball Main Version - Presentation.xlsx" + decision to move final score to percentile-rank, committee 0.20, hierarchical 4-pillar/Primary-Layer blend." (Note: the "committee 0.20" in this description reflects the first-stage decision; the final delivered Influence weight was 0.35, see Weights ledger.)
- `project_press_raw_alignment`: "Mapping new by-category press values onto the Moneyball "Press Release - Raw" sheet — column order, NA→0, and known member/category gaps."

Raw escaped description fragments (as stored in the memory-file frontmatter, kept for token fidelity): `description: "Per-category stance matrix (member×17 topics) — the \"third dimension\" added 2026-06-26`; `description: "Audit of \"Moneyball Main Version - Blended.xlsx\"`; `description: "Audit of \"Moneyball Main Version - Presentation.xlsx\"`; `description: "Mapping new by-category press values onto the Moneyball \"Press Release - Raw\" sheet — column order, NA→0, and known member/category gaps."`.
