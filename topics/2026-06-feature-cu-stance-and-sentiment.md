---
type: topic
title: "CU stance and sentiment scoring"
aliases: ["CU stance and sentiment scoring"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[debate-stance-model]]"
  - "draft-systems-r-pipeline"
objective: "Score each member's stance toward credit-union interests from press releases and tweets (plus gated speech/hearing/interview/Bluesky channels) with a trustworthy stance stack, keep CFPB directionality right, preserve Paul's gold labels as the authority, and feed the media pillar of the Moneyball model."
created_at: 2026-06-22
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cfpb-sentiment-recorrection-2026-07-15.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cfpb-sentiment-recorrection-2026-07-15.md", sha256: "c1d7b946354d0a0274a0997e431e36cb7b9c18e8ac1da8d3fbfa3efc1022bcc8"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/kim-position-classification-2026-08-03.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\kim-position-classification-2026-08-03.md", sha256: "d44d1824026efc41ff9b63419701a401d1b38a3f49ef2d55c8d4dbc8261b00b5"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/bill-coverage-and-media-stance-2026-07-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\bill-coverage-and-media-stance-2026-07-19.md", sha256: "1da688547f3da7df29b21e33f260cb890cd71d06f0276cd4fa2b8e82b5de31b4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/press-fix-incidents-2026-07-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\press-fix-incidents-2026-07-16.md", sha256: "cb8f56eec9edac2d4701de4932bead016ca5d4c30aa44bfe43b802d92a7ce4c3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-sentiment-coverage-2026-07-15.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-sentiment-coverage-2026-07-15.md", sha256: "df2d30406056abfffb62e40571aeba5d438211b37908d408fd5a5cc43dbc5503"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-lt-priming-gates.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-lt-priming-gates.md", sha256: "78fa8b34c594f1f9ffb951f5fb13128c426eef58335193deacbc7ccd540104c9"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-stance-decomposition.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-stance-decomposition.md", sha256: "7f9b966172345c4606ba4d3e1366846e48edcf9c2580c21e44589b22430e2e1c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-signflip-directionality.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-signflip-directionality.md", sha256: "a3c3dcd8629796ac6042805cd6db7bc5470be899f9524ad8500771730c17b455"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-data-audit-2026-07-01.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-data-audit-2026-07-01.md", sha256: "8ab886856dfc515964eb3a3e83ca2a67f3b2673dcd45d46ab061aaaed02e770b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-sentiment-template-location.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-sentiment-template-location.md", sha256: "8973640817f243c384c213c1ec60a2d913de304d5882a76db12b7e51f58da3e6"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/press-classification-user-domain.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\press-classification-user-domain.md", sha256: "6e1310392195fbe49609bc3192fa03bdb2d7efeb3cde41785469cb2843eab86a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_cfpb_directional_split.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_cfpb_directional_split.md", sha256: "5fc9fa475539871976b414bc873272b3da3f530c75a67a961291a55cd1ef0f1a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_stance_sentiment_overhaul.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_stance_sentiment_overhaul.md", sha256: "990a30a6744244ca03cabb88df52a0d057efc8f6e91804833ce50bc6e36ba1a1"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
---

# CU stance and sentiment scoring

> The stance/sentiment layer of the Moneyball (Melange) model: fine-tuned Political DEBATE + Lexicoder LSD (June 2026), the two-hop stance stacks for tweets and press (July 2026), the 2026-07-15 CFPB re-correction, the gated floor-speech / hearing / interview / Bluesky channels, the lt_priming gates, and the 2026-08-03 Kim bill-position benchmark. Press-release stance classification is the user's (Paul's) domain.

## Parts

- [[2026-06-feature-cu-stance-and-sentiment-stance-stack-design-and-accuracy]] — How the CU stance stack was designed and made accurate: sign-flip directionality fixes, the 2026-07-01 data audit, the two-hop stance stacks of the 07-04 campaign, the lt_priming integrity gates and the Kim position-classification benchmark.
- [[2026-06-feature-cu-stance-and-sentiment-june-stage5-template-and-cfpb-split]] — June 2026 stance work: the labeling template and re-run recipe, the CFPB directional split in the workbook, and the Stage 5 overhaul and deploy.
- [[2026-06-feature-cu-stance-and-sentiment-july-recorrection-channels-incidents]] — CU sentiment work of 2026-07-15/16: the CFPB sentiment re-correction, what is scored versus only collected, the channels built and audited, and the press-fix incidents.
- [[2026-06-feature-cu-stance-and-sentiment-press-and-social-display]] — Press and social display of 2026-07-19: graded press and social scores shown for the first time, the expensive ops lessons, the shipped state and the bill-coverage cross-reference.

## Context

- **What it scores (verified 2026-07-15):** only TWO channels in production: (1) Quorum tweets (`quorum_member_tweets.csv`, 9,465 rows, CU-topic-FILTERED, has a `cu_relevant` col; 28% literally mention "cfpb"; 485/533 members) -> `tweet_stance_stack.py` -> `tweet_stance_final.csv`; (2) CU-relevant press (Draft `cu_press_stance_tone.csv`, 2,388 rows; 385 members; 1,569 own-.gov + 819 trade) -> `press_stance_stack.py` -> `press_stance_final.csv`. Both feed `build_media_blend.py` -> workbook `Press Release - Raw` -> the media pillar of [[melange-systems]]. Gated channels (floor speeches, hearings, interviews, Bluesky) were built later (see Channels in [[2026-06-feature-cu-stance-and-sentiment-july-recorrection-channels-incidents]]).
- **Origin (June 2026):** Stage 5 of the CU press scraper was redesigned into Stage 5a STANCE = Political DEBATE (fine-tuned, CPU) and Stage 5b TONE = Lexicoder LSD, replacing a regex/graded scorer: see [[debate-stance-model]] and Draft Systems R pipeline (R pipeline code root, also the home of `cu_stance_label_set.csv`).
- **Conceptual model:** CU alignment = stance hop x valence hop: [[two-hop-stance-decomposition]]. Accuracy ceiling lives in the valence hop (0.689 vs 0.915 stance), fixed with a curated per-target valence registry (`cu_valence_registry.json`), not more model spend.
- **Authority:** press labels / stance direction on contested issues (especially CFPB) are Paul's domain. Rule recorded in the working-agreement topic Change control and Paul's decision authority; see Decisions. Owner: Paul Goff.
- Related topics: scrapers that collect the corpus Congress R scrapers; the Excel model build the CFPB directional split belongs to Moneyball Excel model build (June 2026); the bill/legislative side Legislative pillar and ACU review; audit history Melange audits and code reviews.
- Newest source touched 2026-09-14 (`cfpb-sentiment-recorrection-2026-07-15`, last_modified).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[debate-stance-model]] | Fine-tuned Political DEBATE NLI stance model (CPU) plus Lexicoder LSD tone; replaced the regex scorer in Stage 5 of the CU press pipeline |
| Draft Systems R pipeline | Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[two-hop-stance-decomposition]] - CU alignment = stance hop (speaker to target) x valence hop (target to CUs); the ceiling is the valence hop, fixed by a curated registry
- [[gold-set-validation]] — the stance readers are scored on Paul's gold labels (the 400 tweet golds and the 760-row press gold frame); re-enabling the bill-sign override needs an aboutness guard and more gold labels on bill-naming releases

## Related Topics

- Congress R scrapers - June 2026 R scraper family in Draft Systems: congress.gov 17x3, CU press releases, Census CD, Ballotpedia, DEBATE stance
- Moneyball Excel model build (June 2026) - June 2026 build of the 533-member Moneyball workbook: four buckets, percentile-rank blend, calibration, scenario tooling
- Change control and Paul's decision authority - Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code.
- Legislative pillar and ACU review - Legislative pillar of Melange: legfix history, legfix5 19-category ACU review, effectiveness shadow lane, lobbying forecast
- Melange audits and code reviews - Melange audit runs, guardrails, 09-13 five-lane code review, hallucination framework (D-007), provenance census, laundry-list close-out

## History

| Date | Event |
|---|---|
| 2026-06-21 | Stage 5 overhaul (DEBATE stance + LSD tone). quanteda unusable on R 4.6.0 (RcppParallel segfault), LSD done on stringi; no CUDA GPU, DEBATE on CPU. First validation: DEBATE acc 0.667 / F1 0.578 / kappa 0.339 vs regex 0.444 / 0.413 / 0.167 (45 releases, Claude as stand-in labeler). Hybrid + accuracy push to 88-90% planned. |
| 2026-06-22 | Fine-tuned BASE DEBATE: 87.2% acc / macro-F1 0.833 / kappa 0.771 vs the Claude reference (156-row held-out test). Standalone `CU_Press_Stance_Tone.xlsx` deliverable (530 members). |
| 2026-06-24 | Fine-tuned DEBATE deployed to the full pipeline: 3,701 releases rescored (support 2,323 / neutral 1,151 / oppose 224). |
| 2026-06-25 | CFPB legislative topic split into directional Restrain (+0.5) / Reach (-1.0) blocks in the workbook (driven by Paul's `CFPB Bills` tab). |
| 2026-06-30 | `billstatus:` rows removed (1,310 of 3,698); bill-sign override built then REJECTED/disabled on held-out; human-label overlay (497 of 552) wired; `CFPB Accountability Act` (S4521) added to the BILLS table; template location recorded; press labels declared Paul's domain. |
| 2026-07-01 | ACU speaker-mode planned; sign-flip analysis; data audit D1-D5 + stance-stack S1-S5 design; gold queue built (312 items, 171 members) and API pre-labeled ($3.83, 312/312). Press pillar own-domain attribution fix (see the architecture note `2026-07-rfc-melange-architecture-system-of-record`). |
| 2026-07-04 | Two-hop decomposition finding; tweet stack 0.855 (@f8cc8ee), registry derived from Paul's valence judgments 0.782 (@449ec19); press stack campaign v1-v4, press stack wired; tweet stack wired (@0ad4848 + @e5451dd), 494/533 ranks moved (intended); Warren regression resolved as structural channel bias; PRESS_THIRD_W dial; intensity clip bug; 79-row re-adjudication round complete (56 gold changes). lt_priming stance-integrity gates (@285e604). |
| 2026-07-05 | lt_priming merged to main @b66c1f3 (with @1894b65 fixes-03 and the campaign @57e4cf9). |
| 2026-07-07 | `policy_force` CFPB neutral-pin added to the registry/stacks (later found to overshoot). |
| 2026-07-10 | Source date of the lt_priming gates note (compaction). |
| 2026-07-15 | CFPB re-correction (branch `claude/cfpb-sentiment-recorrection`): Paul's 41 gold tone corrections; tweet gold 0.540 -> 0.809 (0.825 at 82138c9); overall band scale shifted UP; coverage gap identified; floor-speech/hearing/interview/Bluesky channels built, gated OFF. |
| 2026-07-16 | Scott sentiment fix incident: `apply_press_overrides.py` superseded; leg pillar stale until COM recalc (522 ranks moved); tweet stack rerun hazard. `cfpb_stance_review_queue_2026-07-16.csv` (94 rows) delivered. |
| 2026-07-19 | Bill plane audited CLEAN; interview + hearing stance/snippet display for the Press tab (`DESK_MEDIA_STANCE`), MERGED to main @ca1585a; Crown = Ally floor @46df1de; tier weights 80/20 -> 84/16 @0efaa06. |
| 2026-08-03 | Kim bill-position benchmark: shipped prompt too conservative; `kim_llm4` reproduces Kim's Support count exactly (42/42); full corpus classified (22,617/22,660). |

## Decisions

- **Press classification is Paul's domain.** On the Moneyball/CU project Claude is NOT to relabel press-release stances using its own judgment. Paul reacted strongly ("disregard your judgement") when CFPB-related press labels were "corrected": **Credit Unions OPPOSE the CFPB**, so a member defending/expanding the CFPB is correctly `oppose`; those edits were wrong and reverted. **Why:** stance direction on contested issues (especially CFPB) is a domain call Paul owns; Claude's political-sentiment judgment is not trusted here and churns his labels. **How to apply:** build/maintain the *mechanism* that lets Paul set stances (the in-dashboard manual-override dropdown in `fec/make_member_desk.py`, which writes to `press_stance_overrides.json` and re-flows the pillar; ~~via `fec/apply_press_overrides.py`~~ superseded, see Press-fix incidents in [[2026-06-feature-cu-stance-and-sentiment-july-recorrection-channels-incidents]]); never bake in Claude's own stance opinions. His labels go to exact-ID ledgers; NEVER blanket rules.
- **No API spend for stance** (Paul 2026-07-15: **"I am not paying for an API, if you need stance labels, let me label"**; reinforced 2026-07-04 "not funding anything else... wire in the most accurate stack", NO-SPEND standing; credit watcher auto-fire DISARMED, Big5 v2 pilot parked): use local DEBATE + `cu_valence_registry` compose + Paul's hand labels.
- **New gold wins over older gold** (Paul explicit, 2026-07-15), e.g. No. 15 "Judge vacates CFPB late fee rule" support -> neutral, No. 35 "credit unions are the original consumer protectors" support -> oppose (his call).
- **Do NOT re-pin CFPB to neutral.** ~~2026-07-07 `policy_force` CFPB neutral-pin: forced any support/oppose on `cfpb_institution` and `cfpb_general` families to `neutral`~~ (2026-07-07) - superseded 2026-07-15 by the relaxed pin (trust the composed direction); kept because it explains the 1,582 destroyed tweet directions and the `.PRE-CFPBFIX-*` backups.
- **Overall band scale: SHIFTED UP, Paul-directed, do not revert** (final cutoff -1.10; see CFPB band shift in [[2026-06-feature-cu-stance-and-sentiment-july-recorrection-channels-incidents]]). ~~`OVERALL_OPPONENT_CUTOFF=-1.60` (user-directed 2026-07-15 via codex, manufactured >= 1 Opponent)~~ superseded; ~~-1.20 in c11ca08~~ was BROKEN (Skeptic swallowed Highly Skeptical).
- **Per-target valence is curated, not automated**; the registry is derived from Paul's own `gold_target_cu_valence` judgments. DON'T hand-tune match phrases against the same 400 golds beyond the derived registry (eval-overfit).
- **Validate on HELD-OUT only**, never a pool that includes train; a metric move needs a mechanistic explanation (lesson of the 2026-06-30 bill override).
- **Paul is overcorrection-sensitive: apply the MINIMUM he asked, do not bundle extra "improvements"** (round-3 revert 2026-07-15, "you overcorrected"); autonomous substantive fixes were rightly called out, ask first (see `ask-before-substantive-changes`).
- **Channel gating:** speech channel `CU_SPEECH_CHANNEL` default OFF (heuristic misfires on Republican anti-CFPB speeches); hearings channel KEEP (Paul ratified via "Add 1 for the margin"); interview channel default-ON by 2026-07-19 (docstring correction in `interview_stance_stack.py`); `CU_BLUESKY_CHANNEL` exposed but NOT injected (double-count).
- **Crown = Ally floor in the money math (@46df1de, Paul: "if they are listed as champion, I think they should be promoted to ally in the math")**, SUPERSEDES the @1856feb immunity choice. Details in the bill-coverage section.
- **Tier weights 80/20 -> 84/16 (@0efaa06, Paul: "0.84/0.16 works, do it")**, all pins retired (zero pins repo-wide).
- **Five-class bill-position label ships on the page** (Paul 2026-08-03: "the 5 class matters and is more useful"); follow In Song Kim's inferential format (Paul: "You should be following the same format as In Song Kim when classifying, remember you were far too conservative whereas he was inferential").
- **Pillar weights context** (resolution 3): the media/press pillar sits inside a score whose pillar weights changed three times; the sets are recorded with dates and status in `2026-07-rfc-melange-architecture-system-of-record` (`.40/.30/.20/.10` 2026-06-29 historical; `30/25/40/5` ratified 2026-07-07 LAST RATIFIED; `45/10/40/5` live since 2026-09-03 UNRATIFIED, code-review S-5 awaits Paul's ruling). The tier-weights 80/20 and 84/16 above are a DIFFERENT dial (Leg+Press Tier-1 crown weights).

## Next Steps

- [ ] Paul labels the open gold queues: hearing 253 (263 after rebalance) BLANK and interview 34 BLANK (as of 2026-07-15 audit); `speech_gold_queue.csv` was 217/217 filled and bluesky 16/16 filled (both by Paul); the speech channel stays gated until the heuristic is validated against gold.
- [ ] Paul finishes the ACU-signal labels (`cu_stance_label_set_v3.xlsx`) so ACU speaker-mode Phase 1/2/3 can proceed.
- [ ] Paul's 5-question review of the 5 skipped valence-registry families (interchange, big_banks, cu_tax, defense_cu, reg_relief) and registry maintenance for new targets (`apply_two_hop_stance.py --uncovered`).
- [ ] Paul fills the `direction` column of `bill_direction_queue.csv` (216 corpus-cited bills; 9 prefilled from the CFPB sheet).
- [ ] Paul's adjudication of `cfpb_stance_review_queue_2026-07-16.csv` (94 rows: 64 meta-overrule tweets, 23 suspect `gold_cu_alignment=support` CFPB training rows, 7 press sibling member-rows incl. the 2024 twin article).
- [ ] Decide the `OVERALL_OPPONENT_CUTOFF` / overall-Opponent audit relationship (audit_full:42 "overall Opponent rung populated"): re-tuning that cutoff is Paul's dial decision.
- [ ] Retire the stale desk export README pointer to `apply_press_overrides.py` (flagged to Paul 2026-07-16).
- [ ] Deferred bug (commit c11ca08): "S2 tweet meta train/serve skew (needs Quorum-ID plumbing + retrain)"; do not re-run `tweet_stance_stack --score` except in coordination with the lane holding the WIP code.
- [ ] Deferred package D: CREC near-dup collapse (5 pairs, labeled corpus, low value/risk).
- [ ] Re-enable the bill-sign override only with an aboutness/prominence guard (bill in title / single-topic) and more gold labels on bill-naming releases (confidence LOW).
- [ ] Address the 54 `billstatus:` rows still in `cu_stance_label_set.csv` (DEBATE retrain TRAIN split; flagged, untouched).
- [ ] ACU speaker-mode Phase 2 retrain (and any large DEBATE fine-tune) only after the ACU labels land; a retrain is no longer urgent (live accuracy already exceeds the "good" thresholds per Paul's explicit yes/no confirmation).
- [ ] Paul may eyeball the 9 interview fan-out gold rows (interview-level label on passage rows).
- [ ] Hearing/appendix root cause (cu_passages merging overlapping windows so a chair's last turn absorbs the appendix) is a user-gated scoring change; only bounded by an audit_full tripwire (fails above 10 contaminated gold rows).
