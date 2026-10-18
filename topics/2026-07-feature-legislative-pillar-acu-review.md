---
type: topic
title: "Legislative pillar and ACU review"
aliases: ["Legislative pillar and ACU review"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[codex-executor]]"
  - "[[sentinel-collectors]]"
objective: "Keep the legislative plane (bill archive, letters, role/direction registries, legfix5 six-year corpus, legislative-effectiveness shadow lane, cosponsor forecast, press media-stance display) correct and auditable, and complete the legfix5 19-category ACU outline review that gates culling."
created_at: 2026-07-01
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/legfix-history-2026-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\legfix-history-2026-07.md", sha256: "68ef202d58f794fbf214918b093d36ef776fdf7c519874c524f7b25bcb723c4a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/legislative-effectiveness-shadow-lane-2026-09-11.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\legislative-effectiveness-shadow-lane-2026-09-11.md", sha256: "0bd3d7de82afae7eb8c94cb95a14807b5df2bf797345ca6271e14c9e8fce3dbb"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/bill-lobbying-regression-lane-2026-09-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\bill-lobbying-regression-lane-2026-09-04.md", sha256: "c35852efdfd29faba15baafdc8367dd103a989aa6cafec5de981217bcdc40246"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/acu-outline-northstar-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\acu-outline-northstar-2026-07-27.md", sha256: "57e514181f5b7a31dd47613f27469d213e4736e9e7d2e18b7ef3fe708ad596d5"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/bill-coverage-and-media-stance-2026-07-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\bill-coverage-and-media-stance-2026-07-19.md", sha256: "1da688547f3da7df29b21e33f260cb890cd71d06f0276cd4fa2b8e82b5de31b4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/corpus-coverage-2026-07-10.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\corpus-coverage-2026-07-10.md", sha256: "3e7274e4a21a03ce436192bb23f99426b96abbec928d9f44b4a4ccf12e753c60"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# Legislative pillar and ACU review

> Everything about the legislative data plane of [[melange-systems]]: letters, audits and fix bundles (legfix1-5), the ACU Search Outline as north star for the 19-category review, the Volden-Wiseman effectiveness shadow lane, the bill-lobbying (cosponsor) forecast, corpus coverage and the bill-plane audit with press media-stance display.

## Parts

- [[2026-07-feature-legislative-pillar-acu-review-letters-and-legfix-1-4]] — The legislative pillar from 2026-07-17 to 07-25: integration of the 7 letters, the read-only data-plane audit, the legfix and LEGFIX2 bundles, the Tier-1 wiring deploy and the legfix4 residue close-out.
- [[2026-07-feature-legislative-pillar-acu-review-legfix5-full-text-and-culling]] — legfix5 of 2026-07-27: the six-year full-text collection, the GovInfo official-text lane and culling engine, and the acu-outline rulings carried into it.
- [[2026-07-feature-legislative-pillar-acu-review-effectiveness-shadow-lane]] — The legislative-effectiveness shadow lane of 2026-09-10 to 09-12: a Volden-Wiseman five-stage score that Codex built and Claude verified read-only, applied to the live tree at Paul's request.
- [[2026-07-feature-legislative-pillar-acu-review-cosponsor-forecaster]] — The bill-lobbying regression lane of 2026-09-04: Paul's ask to make the cosponsor forecaster self-updating, the finding that it is already a ridge logistic model, and the BILLSTATUS bulk refresh and hash-gated forecaster step applied to the live tree.
- [[2026-07-feature-legislative-pillar-acu-review-bill-plane-and-media-stance]] — The 2026-07-10 corpus census and the bill-plane audit and press media-stance display from 2026-07-19 on, through the crown and money rulings, tier weights and Codex-lane hardening.

## Context

- Owner and decider on every user-gated item: Paul Goff. Code authorship is Codex's ([[codex-executor]]); Claude designs, specs, reviews. Press stance stays untouched per `press-classification-user-domain`.
- Time span of the sources: 2026-07-10 corpus census through 2026-09-14 (legfix history memory last modified 2026-09-14). Newest facts: the legislative-effectiveness shadow lane (2026-09-11/12, applied to live 2026-09-11 ~23:16 ET, rulings D-026/D-027/D-028 on 2026-09-12) and the bill-lobbying forecast refresh (2026-09-04).
  - Correction 2026-10-18 (evidence: ledger D-156, 2026-10-11; Melange audits/decisions_20261011/E_legislative_pillar.md): superseded. D-032 superseded D-028, and D-156 records that D-028's clause 'Leg% becomes L' lapsed with it: Leg% stays the legacy within-roster percentile, and L (LEG_MODE=delivery_blend_v1) was never built. The activation contract was never dispatched. Whether the shadow lane itself is retired has not been ruled; that stays Paul's call.
- Status snapshot: the legfix5 full-text collection is DONE (with a 2026-07-27 evening correction: 18,552 verified + 2 authoritative-no-text + 3 zero-filled, not 18,557 clean). The 19-category review has NEVER been performed, so `category_evidence` is empty on all 18,557 candidates and culling cannot finalize. Paul's 2026-07-27 rulings that govern that review are in [[2026-07-27-acu-outline-north-star-rulings]].
- Data-plane siblings: the collection lanes are in Melange data-collection lanes; the interview/hearing stance and press layer is in CU stance and sentiment scoring; the bill-side "sentinel" is [[sentinel-collectors]] (Codex's Sentinel Bill Ledger.xlsx, see below and in [[2026-07-feature-legislative-pillar-acu-review-cosponsor-forecaster]]).
- Pillar weight context (resolution 3, ALL THREE sets recorded wherever weights appear): `.40/.30/.20/.10` (2026-06-29, historical); `30/25/40/5` (ratified 2026-07-07: LAST RATIFIED); `45/10/40/5` (live in `ranks_python.json` since 2026-09-03: LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling). The newest set must never be read as ratified. The legislative pillar's own inner mix is a different thing: score path = col4 agenda (0.7) + AG:AW efficiency (0.3) via Primary-E only (2026-07-17).
  - Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and no ruling is outstanding here.
- Related memories (not vault entities): `legislative-audit-2026-07-24`, `legislative-letters-2026-07-17`, `legfix4-residue-closeout-2026-07-25`, `legfix5-collection-complete-2026-07-27`, `legfix5-govinfo-culling-2026-07-27`, `live-tree-branch-state-2026-07-14`, `ask-before-substantive-changes`, `no-git-plain-review-2026-09-01`, `dont-drop-context-anchor-memory`, `press-classification-user-domain`, `cfpb-recorrection-band-shift-2026-07-15`, `glassbox-everything-rule-2026-07-27`, `sentinel-workbook-ingestion-lane-2026-09-04`, `lobbying-member-link-is-circular-2026-08-19`, `lobbyview-integration-2026-07-31`, `primacy-board-factor-only-2026-07-29`, `psych-audit-2026-07-09`, `audit-network-vote-cycle-2026-07-08`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[codex-executor]] | Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17 |
| [[sentinel-collectors]] | Sentinel press/hearing collectors and bill ingestion feeding the Melange workbook; promotion and scheduler re-enable are Paul-gated |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Topics

- CU stance and sentiment scoring - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- Melange data-collection lanes - Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills

## Related Discussions

- [[2026-07-27-acu-outline-north-star-rulings]] - Paul's 2026-07-27 rulings: ACU Search Outline docx is the 19-category review north star; letters mandatory; amendments count half

## History

| Date | Event |
|---|---|
| 2026-07-10 | Corpus-coverage census (read-only query of `social_media.db`): floor speeches fully backfilled to 2003 (259,569 rows); real gaps are elsewhere (bills archive manual export, votes, Congress 120). |
| 2026-07-17 | Letters import: 7 sign-on letters (2 zips) ingested as LTR- rows (297 rows in `manual_bill_evidence.csv`); pillar integration executed (CU Tax Status 8-col block, agenda formula B); tier directive "adjust to the true tier 1s"; commits @ebbee29 + @7853b56 on `claude/legislative-letters-import-be42f9`; MERGE DONE evening: main ff 7aa36d1 -> 9aa9677; follow-up batch @9aa9677. |
| 2026-07-19 | Bill plane audited structurally CLEAN (7 pass / 0 FAIL / 5 WARN); interview + hearing stance display built (`DESK_MEDIA_STANCE`); 3 commits merged to main @ca1585a. Later the same lane: money-defection fixes @1856feb and @46df1de, tier weights 80/20 -> 84/16 @0efaa06, merge debt cleared + TODO.md @4d87fee, doc-rot sweep @b706ec7, Codex hardening batch @565136c. |
| 2026-07-24 | 24-Opus-subagent + Grok-critique audit of the legislative plane (read-only). Fix bundle SHIPPED @9c2bf41 on `codex/legfix-20260724` (not merged). |
| 2026-07-25 | LEGFIX2 expansion @5619691 (branch `codex/legfix2-20260725`, stacked on 9c2bf41; Meta LOOP). Tier-1 wiring deployed live @71a5fdb, merged @dd60333 (registry v2, 126 rows). HR8398/HR8413 closed UNRESOLVABLE-PUBLICLY. legfix4 residue close-out (CU/CW + AV/DX dissolved; tier-3 collection ran as `.candidate`; chain 14.3 min, ranks 0/533, audit 157/0). |
| 2026-07-26 | Continuation handoff `audits/legfix5/CLAUDE_CONTINUATION_HANDOFF_2026-07-26.md`; `_stage_20260726` evidence stage (2,886 receipts). |
| 2026-07-27 | GovInfo official-XML lane done (18,406/18,440); culling engine repaired and run over 64,004 memberships (all flagged); full-text collection reported complete 18,557/18,557; commits @e09db5e (59 files) + @852eb62 + @a719807; 8-agent pre-culling audit corrected the "complete" claim; `.pyc` conflict-copy scare closed; Paul's ACU outline rulings (evening), amendment text recovered from disk (night). |
| 2026-09-04 | Bill-lobbying regression lane: forecaster identified as ridge-LOGISTIC `fec/lobbying/cosponsor_forecast.py`; self-update A+B built, applied to live, dials persisted; first refresh run. |
| 2026-09-10/11 | Legislative-effectiveness (Volden-Wiseman) shadow lane commissioned 2026-09-10 23:03 ET and built by Codex in worktree f149; Codex hit `usage_limit_exceeded` at 04:07Z 2026-09-11; Claude verified 2026-09-11. |
| 2026-09-11 ~23:16 ET | Shadow lane code APPLIED to the live tree (26/26 sha256 match). |
| 2026-09-12 | Rulings D-026/D-027 (results-only headline Leg%, chamber-normalized board) at commit `f8ebdf7`, REVERSED same day by D-028 (f=0.80, Leg% = L); CU publications inventory lane opened. |
| 2026-09-14 | Last modification of the legfix-history memory. |

Correction 2026-10-18 (evidence: ledger D-156, 2026-10-11; Melange audits/decisions_20261011/E_legislative_pillar.md): superseded. D-032 superseded D-028, and D-156 records that D-028's clause 'Leg% becomes L' lapsed with it: Leg% stays the legacy within-roster percentile, and L (LEG_MODE=delivery_blend_v1) was never built. The activation contract was never dispatched. Whether the shadow lane itself is retired has not been ruled; that stays Paul's call.

## Decisions

- **Letters are sponsor / original-cosponsor rows (Paul 2026-07-17):** creators = sponsor, other signers = original-cosponsor (weight 2.0, satisfies say-do Champion A-path). Retrofit of L1-L4 from co-sponsor (1.0) to original-cosponsor + L1 Crapo -> sponsor (32 role changes). Executed.
- **Agenda formula B (Paul: "Add the block" + "whatever is most optimal" -> scenario B):** `apply_leg_stance.py` now includes Original-Co-Sponsor counts (revert dial `LEGSTANCE_ORIGCO=0`). Reason: the old filter zeroed origco while counting plain cosponsor, incoherent with bill_rules 3/2/1 + grid 4:2:1 + the say-do gate.
- **Tier directive 2026-07-17 ("adjust to the true tier 1s"):** T1 pins removed; Tier 1 == pure 80/20 top-12. Superseded by the 84/16 change below.
- **Tier weights 80/20 -> 84/16 (@0efaa06, Paul 2026-07-19: "0.84/0.16 works, do it").** All pins retired (see detail in [[2026-07-feature-legislative-pillar-acu-review-bill-plane-and-media-stance]]).
- **Crown = Ally floor in the money math (@46df1de, Paul 2026-07-19: "if they are listed as champion, I think they should be promoted to ally in the math").** SUPERSEDES the immunity choice at @1856feb.
- ~~Champion money-immunity restored (@1856feb, Paul: "Yeah fix it")~~ (2026-07-19) - superseded the same day by @46df1de (crown = Ally floor, movable); kept because it explains the @1856feb commit and the `COMMITTED={'Champion','Opponent'}` logic.
- ~~Tier 1 with manual pins at 80/20: Barr+Kim anchors + 6 T2 pins, Hill-crown clause, Fitzpatrick `position: 5`, Wagner forced T2~~ (2026-07-17 to 2026-07-19) - superseded 2026-07-19 by 84/16 which makes every pin unnecessary (`load_tier_positions()` == {}).
- **Behaviour-neutral only (2026-07-24, Paul: "keep going, under fable"):** authorized only behaviour-neutral work; everything in Tier 3/4 of the audit report and wiring of `cu_bill_directions.json` stayed user-gated, until the 2026-07-25 "Run 1-5" / "Approve, execute 2, 3, and 4" gates.
- **LEGFIX2 directive (Paul 2026-07-25):** "expand corrections + collision guards + recompute deltas + averages/success rates line up + integrity audit, flawless." Grok counsel DOWN (402 quota) both passes - Paul said ignore and keep going.
- **GovInfo summaries = evidence of record, letters mandatory, amendments half, keep all ledgers / edges, collect 15 historical probes (Paul 2026-07-27):** see [[2026-07-27-acu-outline-north-star-rulings]].
- **GovInfo format-variant exceptions (Paul 2026-07-27):** enrolled USLM docs are recorded as format-variant exceptions; the legacy `/xml/` sibling is evidence of record. `116:s:309` (GPO header typo): leave flagged, do not override.
- **Legislative-effectiveness lane (Paul 2026-09-10):** "Execute the legislative impact and progressive-effectiveness implementation plan, then show me the diff... Preserve the old policy/mode for comparison and rollback; do not silently replace production rankings."
- **Apply of the shadow lane (Paul 2026-09-12):** "apply the brain update draft. Fully implement the new parameters, lets see the overall changes and the new tier 1's" then "Do it for me" (applied ~23:16 ET 2026-09-11 per the memory's own timestamps).
- ~~D-026 results-only headline Leg% and D-027 board mode on results~~ (2026-09-12, "go with results-only, chamber-normalize the board", commit `f8ebdf7`) - D-026 SUPERSEDED the same day by **D-028** (Paul: f=0.80 and Leg% = L; "These ranks are horrible, it needs to be a combination of primacy, success, amount, and substance. The original rankings were better before" / "this is to determine champions"). **D-027 stays** (realized-results board ranks on within-chamber percentile). Kept because the rank artifacts, `evidence/CHAMBER_NORMALIZED_BOARD.md` and commit f8ebdf7 reflect the superseded step.
- **Bill-lobbying lane (Paul 2026-09-04):** "Sentinel Bill Ledger, do the timed dry run / AND Blended Workbook / C", then "Build A and B" -> "Flip and run / Apply, Keep, Accept" -> "FINISH IT UP".
- **Standing 2026-07-19 (Paul):** the Codex lane is the default executor for implementation work and merge decisions sit at Claude's preference ("Commit, and regenerate" then merge approved). Scoring/stance/user-gated items stay at Paul's gate.

## Next Steps

- [ ] Perform the 19-category review (title -> summary -> bill text) against the ACU Search Outline docx; Quorum 44/44 floor (see [[2026-07-27-acu-outline-north-star-rulings]]).
- [ ] Adjudicate the 63,947 undecided memberships (only 59 of 64,004 have a decision per the ledger) and populate `category_evidence`.
- [ ] Rule on the 1,771 / 454 membership-edge disagreement (owner unassigned in the evening handoff; Paul wants all edges kept).
- [ ] Close the historical-probe gate BEFORE the 19-category review (15 probes / 598 ids; 95 new candidates; needs Paul's phantom-citation policy; smoke-test ONE probe first).
- [ ] Recollect the 3 zero-filled receipts (`receipts/119/hr/{2393,2397,2401}`) by deleting the zeroed files so resume refetches.
- [ ] Rebuild evidence against the live generation (pin `evidence-20260727T202317` by name) and regenerate the pre-fix culling/plan/recon artifacts before binding them.
- [ ] Two user-owned approval files still absent: `role_weight_policy_approval.json` and `legislation_workbook_computation_policy_approval.json`; rank-drift tolerance and `authored_by:"human"` on shadow attributions are Paul's.
- [ ] Re-mint the capability receipt for `build_accepted_legislation_workbook.py` (self-pin broke after our edit).
- [ ] Adjudicate HR8398 and HR8413 blank positions only at the next archive refresh (scoring-inert).
- [ ] Wire `cu_bill_directions.json` / candidate registry adoption beyond what shipped (user-gated); decide on the 5 ACU issues with no model home.
- [ ] Rule on the shadow-lane activation (D-028 contract v2 `purity_delivery_v1`, `LEG_MODE=delivery_blend_v1`), the Tier-1 consequences, and the `test_run_legislation_pillars_and_ranks` source-literal re-pin plus `run_tests.py` `_LANE_MODULES` registration (Codex work after 2026-09-17).
  - Correction 2026-10-18 (evidence: ledger D-156, 2026-10-11; Melange audits/decisions_20261011/E_legislative_pillar.md): superseded. D-032 superseded D-028, and D-156 records that D-028's clause 'Leg% becomes L' lapsed with it: Leg% stays the legacy within-roster percentile, and L (LEG_MODE=delivery_blend_v1) was never built. The activation contract was never dispatched. Whether the shadow lane itself is retired has not been ruled; that stays Paul's call.
- [ ] Bill-lobbying lane open items: apply/audit FAIL-on-absent vs skip; dial flip timing; ledger coupling (C); relaxing `--min-cosponsors 5` is a panel-contract change, Paul's call.
- [ ] Paul's calls on the CU publications lane: CU Times / CUInsight / CU Today licensing or exclusion; ACU member-only content; NCUA counted or separate; Wayback for 2023 CUNA/NAFCU.
- [ ] Reconcile config.toml model dials with Paul before any Codex dispatch for this lane (see [[codex-executor]]).

## Open questions

- Which of the three pillar-weight sets governs: `30/25/40/5` is the LAST RATIFIED (2026-07-07); `45/10/40/5` is LIVE BUT UNRATIFIED (code-review S-5 awaits Paul's ruling); `.40/.30/.20/.10` (2026-06-29) is historical.
  - Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and no ruling is outstanding here.
- Whether the effectiveness-shadow activation (D-028 purity_delivery_v1 / delivery_blend_v1) goes live and which Tier-1 consequences Paul accepts.
  - Correction 2026-10-18 (evidence: ledger D-156, 2026-10-11; Melange audits/decisions_20261011/E_legislative_pillar.md): superseded. D-032 superseded D-028, and D-156 records that D-028's clause 'Leg% becomes L' lapsed with it: Leg% stays the legacy within-roster percentile, and L (LEG_MODE=delivery_blend_v1) was never built. The activation contract was never dispatched. Whether the shadow lane itself is retired has not been ruled; that stays Paul's call.
- Whether the 454 ledger-only edges are discovery under-coverage.
- Phantom-citation policy for the 95 historical-probe candidates.
- Whether the legislative 18-category matrix should absorb the 5 ACU issues with no home (Rate Caps and Fees, CU-Bank Mergers, Bank Attacks, Appropriations, State Level) now that the outline resolves to 19 categories.
- Whether GovInfo-as-evidence extends from summaries to full text.
