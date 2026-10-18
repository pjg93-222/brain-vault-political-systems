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

## Parts

- [[2026-06-feature-moneyball-excel-model-build-lineage-and-phases]] — Workbook lineage and file inventory and the June 2026 build phases A to C (2026-06-18 to 06-22): the original bugs and repairs, the committee and caucus rebuild, the main version with coalition profiles and the four-bucket redesign, and the agenda re-weighting.
- [[2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits]] — Scoring refinements of 2026-06-24/25: press raw alignment, the CFPB directional split, relevance-tiered committee influence scoring, the presentation audit with the percentile-rank 4-pillar blend, and the Blended workbook audit.
- [[2026-06-feature-moneyball-excel-model-build-category-stance-3d]] — The Category Stance 3D sheet of the Moneyball workbook, built on 2026-06-26.
- [[2026-06-feature-moneyball-excel-model-build-scenario-tools-and-calibration]] — The scenario tools of 2026-06-26/27: the pre-flight audit and engine build (coalition determinism, what-if and electoral models, money response, pathfinding, scenario runner, optimizer, independent audits, FEC data quality) and the empirical calibration.

## Context

- The model ranks all 533 members of the 119th Congress by a weighted score so credit-union lobbying resources can be allocated (Moneyball = find undervalued targets). It is a sibling of `project_ballotpedia_cu_influence` and the press work in `project_congress_press_fallbacks`.
- Starting point: `Moneyball (version 1).xlsb.xlsx` (in Downloads), built as an .xlsb converted to .xlsx. The live file had **11 sheets with a combined `Rank & Allocation` sheet** (pandas once mis-reported a 12-sheet split because the file was being edited in Excel during analysis; always work on a copy).
- Scope of this topic: every June 2026 build step of the workbook and of the engines that read it (flip, coalition, electoral, route, priming, money-response, scenario runner, optimizer). It was an Excel-workbook-centred build: the June guidance wrote through Excel COM and openpyxl. **That system of record was later inverted**: Phase 2 made `ranks_python.json` the authority and the workbook a view, with NO COM anywhere (see Superseded guidance below and [[melange-systems]]).
- Cascade architecture (formula-driven, recalcs in Excel): Legislative Score Raw to Normalized, Press Release Raw to Normalized and Demographic Raw to Normalized feed the **Sub Layer**, which feeds the **Primary Layer** (11 weighted dimensions), which feeds **Rank & Allocation** Score (`SUMPRODUCT(Table6 dims x Primary weights)`) and Rank (`RANK.EQ`). Each Sub Layer policy dimension = `legislative_part + press_part`; legislative sub-weights (Legislative Normalized row 2) summed about 0.7, press weight (Press Normalized row 535) was a flat 0.3. Sub Layer demographic cols V:AF are **hardcoded** (not formulas), so demographic fixes must be written there too.
- The R-side data pipeline that regenerated base data is [[draft-systems-r-pipeline]]; the stance layer that the per-category work feeds is CU stance and sentiment scoring. Decision authority over every numeric multiplier/weight/threshold is Paul's (Paul Goff; see Change control and Paul's decision authority).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

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

- CU stance and sentiment scoring - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
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
- ~~Excel COM / openpyxl as the write path for model edits~~ (June 2026) - superseded by Phase 2: `ranks_python.json` is the system of record, the workbook is a view, NO COM anywhere (resolution 5). The COM-era recipes below and in [[2026-06-feature-moneyball-excel-model-build-lineage-and-phases]], [[2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits]] and [[2026-06-feature-moneyball-excel-model-build-scenario-tools-and-calibration]] are kept as history only.

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

## Consult rule: multipliers, weights and thresholds are Paul's decision

Source feedback `feedback_consult_multipliers_thresholds` (2026-06-25):
- For the Moneyball / congress model, any numeric **multiplier, weight, or threshold** is the USER's call: success-stage multipliers, edge-weight knobs (size-normalization, role weights), stance thresholds, decay factors, allocation cutoffs, topic/legislative weights, etc. Present the structure, options, ranges and trade-offs, then let the user set the actual values.
- **Why:** these parameters encode strategy and value judgments (what "influence" or "success" means, who counts as an opponent, how hard to penalize popular bills, which legislative goals to optimize), not technical defaults, and the model allocates real money. The user has corrected parameters before (Opponent press cutoff -0.60 to -0.40 via a named-opponents list).
- **How to apply:** when a build needs a number, surface it as an explicit decision and wait for the user's value, but DO give options AND a recommendation with reasoning (the user wants the expert recommendation; they make the final call). Mark the recommended pick "(Recommended)". Default to the *current/existing* value when told to keep it. Related: `feedback_spreadsheet_consult_on_errors`, `project_moneyball_network_enhancement`.
- Governing page: Change control and Paul's decision authority.

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

Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and no ruling is outstanding here.

Never read the newest set as ratified.

## Superseded guidance: Excel COM as the write path

- ~~"Writes go through Excel COM"; recalc via `New-Object -ComObject Excel.Application; $xl.CalculateFull()`; `write_im_sheet.py` and `sheet_sync.py` push to the workbook via COM/win32com; recalc on a LOCAL copy outside OneDrive~~ (June 2026, all sections above and in [[2026-06-feature-moneyball-excel-model-build-lineage-and-phases]], [[2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits]], [[2026-06-feature-moneyball-excel-model-build-category-stance-3d]] and [[2026-06-feature-moneyball-excel-model-build-scenario-tools-and-calibration]]) - superseded by Phase 2 (system-of-record inversion): `ranks_python.json` is the authority, the workbook is a view, **NO COM anywhere** (approved resolution 5). Kept because it explains older commits/artifacts (backups, `Melange - Live` tab, PRE-IM-20260626.xlsx) and the COM gotchas (numeric `.Value2` InvalidCastException, OneDrive race, autorecover rollback).
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
