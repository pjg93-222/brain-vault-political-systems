---
type: topic
title: "Melange audits and code reviews"
aliases: ["Melange audits and code reviews"]
category: "troubleshooting"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[melange-fec-pipeline]]"
objective: "Keep one record of every Melange/Moneyball audit and code-review run (2026-07-01 to 2026-09-19): findings, fixes, binding refuted lists, guardrails, methods, and what still awaits Paul's rulings."
created_at: 2026-07-01
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/code-review-five-lanes-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\code-review-five-lanes-2026-09-13.md", sha256: "6954aafb52e2e2f4e5c7331227788b1d51a55ceb4f09b63f9e8b363428850622"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/laundry-list-closeout-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\laundry-list-closeout-2026-09-18.md", sha256: "025bab7c9a9ebb259e0b51ec2d75be03dd87243aceb6222720c2412879ed947f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/audit-history-2026-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\audit-history-2026-07.md", sha256: "102b95170dcfae720adcc05c73dad5ad2b82d7c3af9296608a4ed3abf9cb148c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/hallucination-framework-lane-2026-08-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\hallucination-framework-lane-2026-08-13.md", sha256: "308e66f8f40161777e4045bcdace8648c2a4337d7159037ae29533636675de29"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/data-rules-provenance-2026-07-10.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\data-rules-provenance-2026-07-10.md", sha256: "811bc4727b6ac03068bdd3b260c6e840b19bd3bf18046674b23ca3f131fe21c6"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-audit-run-guardrails.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-audit-run-guardrails.md", sha256: "fc314b1421f29d9b94eda9773284183ca5cefb0951cb6703f08410d424b9e0c0"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-data-audit-2026-07-01.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-data-audit-2026-07-01.md", sha256: "8ab886856dfc515964eb3a3e83ca2a67f3b2673dcd45d46ab061aaaed02e770b"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/troubleshooting"]
---

# Melange audits and code reviews

> Chronicle and standing-rule record for the Melange (Moneyball CU-influence model) audit series: July 2026 audit runs and their guardrails, the 2026-07-01 data-integrity audit, the 2026-07-08 data-integrity and network/vote/cycle audits, the 2026-07-10 provenance census, the 2026-08-13 findings-examination (hallucination) framework, the 2026-09-13 five-lane code review, and the 2026-09-18/19 laundry-list close-out.

## Parts

- [[2026-07-troubleshooting-melange-audits-and-reviews-guardrails]] — Guardrails for any autonomous Melange audit or review run, from the run-guardrails memory of 2026-07-02 as updated through 07-10.
- [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-1-3]] — The Melange audit runs of 2026-07-01 to 07-03: run 1, run 2, the deep audit of 07-02 and run 3.
- [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-4-5-and-integrity]] — The Melange audit runs of 2026-07-04 to 07-10: run 4, runs 5a and 5b, the data-integrity audit, the network, vote and new-cycle audit, and the extensive audit with a true run-through.
- [[2026-07-troubleshooting-melange-audits-and-reviews-data-integrity-and-provenance]] — The data-integrity audit of 2026-07-01 on the bills archive, the cosponsor network and the stance-stack plan, and the data-rules provenance census of 2026-07-10.
- [[2026-07-troubleshooting-melange-audits-and-reviews-later-reviews]] — Melange reviews of August and September 2026: the findings-examination (hallucination) framework lane of 08-13/14, the five-lane code review of 09-13 and the laundry-list close-out of 09-18/19.

## Context

- The audited system is the Python pipeline under `Melange Systems\fec` ([[melange-fec-pipeline]]) feeding the Moneyball CU-influence model ([[melange-systems]]). Audits are run autonomously by Claude sessions (mission variant: the `/fable-audit` project slash command, `.claude/commands/fable-audit.md`, commit 9adc4c1), and every audit's gates are the verification protocol of Verification and evidence standards: kernel tests, `py_compile` sweep, `audit_full.py`, a true pipeline run-through, ranks zero-delta (`ranks_python.json` byte-identical), determinism spot checks, UI smoke.
- Audit report file names follow `AUDIT_FINDINGS_<date>.md` in the repo root (and `DEEP_AUDIT_REPORT_2026-07-02.md`, `DEEP_AUDIT_MATH_LOGIC_2026-07-02.md`).
- Standing "binding refuted lists" exist for the 2026-07-08 network/vote/cycle audit (do not re-flag) and for the code-review packet (17 refuted or partly refuted findings in `FINDINGS_INDEX.md`).
- Three core operating rules emerged and are binding on any audit run: (1) NEVER hand-extend a generated JSON - extend the producer (the `category_stance.json` 18-category trap, 2026-07-02); (2) use port 8802 (launch config `moneyball-ui-audit`), never 8801 (Paul's long-running live-tree static server); (3) prove output deltas benign by the byte-match input-purity method (engine to `FRONTIER_OUT` temp must byte-match the chain's artifact).
- Pillar weights appear in several audit findings and exist in THREE sets (see "Pillar weights, three sets" below): `.40/.30/.20/.10` (2026-06-29, historical), `30/25/40/5` (ratified 2026-07-07: LAST RATIFIED), `45/10/40/5` (live in `ranks_python.json` since 2026-09-03: LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling). The newest set must never be read as ratified.
- Related memory notes (not vault entities): `moneyball-model-config` (config baseline; its IMP/BUDGET/defection notes are superseded by the 2026-07-01 audit), `moneyball-deep-audit-2026-07-02`, `moneyball-audit-run2-2026-07-02`, `moneyball-audit-run3-2026-07-03`, `moneyball-audit-run4-2026-07-04`, `moneyball-audit-run-guardrails`, `moneyball-receptivity-layer`, `moneyball-big5-campaign`, `moneyball-lt-priming-gates`, `press-classification-user-domain`, `psych-audit-2026-07-09`, `hearing-antagonism-2026-07-10`, `skills-library-2026-07-10`, `dashboard-preview-workflow`, `universal-lane-laws-2026-08-09`, `examination-lane-lessons-2026-08-14`, `verify-dont-infer-completion-2026-08-04`, `ask-before-substantive-changes`, `scout-census-traps-2026-09-13`, `committed-vs-live-drift-2026-09-13`, `live-tree-eol-census-2026-09-19`, `melange-live-tree-reconcile-2026-09-19`, `chatgpt-lane-landed-2026-07-16`, `spawned-task-premise-may-be-stale-2026-09-14`, `backup-coverage-gap-2026-09-07`, `live-tree-branch-state-2026-07-14`. Cross-topic: stance and sentiment redesign lives in CU stance and sentiment scoring.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[melange-fec-pipeline]] | Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[four-pillar-percentile-blend]] — pillar weights recur in the audit findings and exist in three sets; never let the newest read as ratified
- [[settled-findings-stay-settled]] — binding refuted lists (do not re-flag) for the 2026-07-08 network/vote/cycle audit and the code-review packet's refuted findings

## Related Topics

- CU stance and sentiment scoring - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- Verification and evidence standards - Verify, never infer: census before mechanism claims, repo-wide existence checks, scout NOT FOUNDs disproved, HEAD-pinned cites.

## History

| Date | Event |
|---|---|
| 2026-07-01 | Deep-dive audit phase 1 (math spec + audit notes + research papers; next phase data collection / sentiment rework). F1-F4 fixed; defection walks the FULL ladder; ABB26 IMP re-tier + CU Tax Status as 18th category; joint $2.5M optimizer + G-K bound; MC=20+CRN validated (100% seed overlap). |
| 2026-07-01 | Data-integrity audit of bills archive + cosponsor network: D1-D5 (D1, D2, D3 fixed that evening; D4 limitation; D5 latent). Sentiment redesign ("stance stack" S1-S5) brainstormed; S1 gold queue + harness built; API pre-label pass 312/312, $3.83 (night). |
| 2026-07-02 | Sanitized audit rubric handed to Paul for autonomous audit runs (replacing a generic Perplexity "NextToken" web-app rubric) - origin of the guardrails. Overnight deep audit ("be brutal"): 18th-category producer clobber fixed; split leak quantified; `run_pipeline.py` canonical runner. Audit II (math/logic/sourcing): W1 critical; "fix all that" ruled and applied same day (audit 48 checks). Run-2 audit + fix lane (branch unmerged at the time). Architecture refactor day (see [[melange-fec-pipeline]]). |
| 2026-07-03 | Run-2 MERGED to main ~02:30 (fast-forward, then 4 more ratified commits, main @ d0f1643). Autonomous audit post-personality-campaign (YouTube contamination fix @8f53387, MATTR). Full-scale re-audit (user trust check): R1/R2. Lummis-#4 receipt. Run-3 true run-through (state 3ca213d): ALL GATES GREEN. Paul pasted a live Anthropic key into chat (rotate reminder). |
| 2026-07-04 | Run-4 (~16:20-17:00, report @1747671): all gates green at the UNCOMMITTED live-tree state; main material risk = version control. PILOT-BEFORE-SPEND RULE written (after burning ~$60-65 on the Fable stance pass). STANDING COST AUTHORIZATION granted. Run-4b/4c/4e/4j/4k/4l/4m follow-ups (same day and after). |
| 2026-07-05 | Run-4n "Start the merges": S2-01 and S2-02 RESOLVED (@57e4cf9 to @0e131c0); Judiciary added to tracked committees. WAL mtime trap near-miss (social_media.db). Weekly-refresh task hardened (missed 06:00 wake). |
| 2026-07-06 | Run-5a+5b (mid-crawl true run-through) ALL GATES GREEN @962959d to @51f2f92; audit 59 then 62 checks. Run-5h desk pillar-display drift; run-5i CPU-liveness refinement; run-5j corpus exact-dup guard. |
| 2026-07-07 | Pre-GATE-2 deep audit @ce1482d: 7 bugs fixed pre-fire. Pillar weights `30/25/40/5` ratified (LAST RATIFIED set). |
| 2026-07-08 | Dataset fragment/parse audit (65 findings; 9 fixes on `claude/musing-swirles-f5e2de`, 604f786 later 4f7007d); network/vote/cycle audit (26 findings on `claude/magical-booth-f272da`); data repairs applied (Excel closed + collectors idle). |
| 2026-07-09 | All 7 HIGH network/vote/cycle findings fixed and committed @158d311; psych-audit adds the broader JS-mirror psych-blindness finding. |
| 2026-07-10 | Extensive audit + true run-through on post-merge main @aae62c9: ALL GATES GREEN; fix lane merged @b0f53e1; data-rules provenance census (branch `claude/data-collection-rules-audit-e240c0`); MEMORY.md index compaction moved the audit index lines into this record. |
| 2026-08-13 | Findings-examination (hallucination) framework ordered, ruled ADOPT (D-007), all follow-ons built; mirror-pushed at 8cdd18003, b52a2a582, 6e27bcb2c (lane ran 2026-08-13/14). |
| 2026-08-19 | Compaction note: the "8 code fixes ... (uncommitted)" line is superseded - the 07-08 sweep landed as 9 fixes @4f7007d. |
| 2026-09-03 | `ranks_python.json` pillar weights became 45/10/40/5 (LIVE BUT UNRATIFIED). |
| 2026-09-13 | Five-lane code review of the committed tree at HEAD 2f11d9490 (141 finding rows); committed-vs-live drift census. |
| 2026-09-14 | Review session applied 90/90 patches to LIVE at 05:58Z (71 files in one minute; byte-exact pre-images of 94 files taken 02:42Z in gitignored `backups\code_review_20260913\`). |
| 2026-09-18/19 | Laundry-list handoff close-out: six fixes landed, N12 interview turn-bleed repair v2 applied + landed (`ce0dc5b21`), membership file refreshed (checked_at 2026-09-19T19:46:30Z). |
| 2026-09-19 | Five-lane note updated ("UNAPPLIED" statements stale, verified by hunk match, see `melange-live-tree-reconcile-2026-09-19`). |

## Decisions

- **NEVER hand-extend a generated JSON; extend the producer.** Why: `category_stance.json` had been extended by hand to 18 categories (CU Tax Status) but the producer `per_category_stance.py` had a hard-coded 17-category list, so the next regeneration would silently drop the weight-3.0 flagship category (2026-07-02). The audit_full check `len(adv)>=18` caught it. Fix: `('CU Tax Status',16)` added to the producer (Normalized col 16).
- **Use port 8802 (launch config `moneyball-ui-audit`), not 8801.** Why: 8801 is Paul's long-running live-tree static server. Later note (2026-07-10): 8802 was Paul's long-running `http.server` (PID 50960) at that time and the worktree `.claude/launch.json` gained `moneyball-audit-8803` for preview-tool use; the 2026-09-18 laundry-list close-out again serves the live root read-only on 8802 via `moneyball-ui-audit`. Rule: never touch the user's own server; pick the launch config that is free.
- **Pilot-before-spend rule (2026-07-04).** No model/config change may spend more than $5 without FIRST measuring the new configuration on the gold slice. Why: ~$60-65 of Paul's money burned on the Fable stance pass that a $3 pre-flight would have prevented (Opus 0.779 > Fable 0.618 on identical goldeval inputs, measured only AFTER the $84 spend; Paul: "you just made me waste my own money"). Also multiply per-call cost estimates by 1.4x when quoting Paul (estimates ran 30-40% low: thinking tokens, long contexts) and ask him to reconcile against console actuals.
- **Standing cost authorization (2026-07-04, Paul: "Cost gate is fully open use as much as you need. For everything").** Scope: the ratified stance/persona/trait campaign (Fable stance chain ~$84, persona top-ups, referee passes); still print costs to transcript; NOT a license for new unproposed spends. Account blocker at grant time: console USAGE LIMIT reached (Settings, Limits), not just balance, so Paul must raise it.
- **Fix-lane scope for autonomous audit runs:** only changes that provably cannot alter computed numbers (unused imports, comment typos), on a branch, gated by `run_tests.py`; the fable-audit mission variant SANCTIONS the true pipeline run and output-affecting fixes may land IF followed by full pipeline + zero-rank-delta + audit-clean; otherwise report-only.
- **Audit-run execution allowlist** (2026-07-02 guardrails): only `python fec/tests/run_tests.py` and `python fec/audit_full.py` are verified read-only executables; everything else is import-unsafe or writes (see Guardrails in [[2026-07-troubleshooting-melange-audits-and-reviews-guardrails]]).
- **House rule from the 2026-07-10 provenance census:** quote the user verbatim in the commit message for any user-directed rule; anything unquoted is treated as a session choice until transcript-verified (transcript search is the arbitration tool).
- **Findings-examination framework ADOPTED, brain D-007** (Paul ruled ADOPT 2026-08-13): six-pass examination; reversal condition = a defect reaches Paul in a doc that RECORDS a completed six-pass exam. Causal-claims lint deliberately NARROW (causal verbs only), Paul's explicit narrow-scope selection.
- **Code review: do not re-review the five lanes; start from the packet** (`audits/code_review_20260913`, read from commit `77959ae74`). Adversarial verifier pass is mandatory (17 findings were refuted or partly refuted).
- **Laundry-list close-out:** apply gate (Paul's `ask-before-substantive-changes`, Paul Goff) still binds, so each step ran on an explicit GO and everything else is a one-line-answerable ruling sheet (`DECISIONS_FOR_PAUL.md`).
- ~~"Item 1 (bands/crown) of the 2026-07-16 laundry-list handoff"~~ (2026-07-16) - superseded by brain D-031; the handoff's statement "NOTHING has been applied" is false at HEAD (lane landed the same night as `391a4a8b5`, merged `e58a807da`).
- ~~Five-lane review "NOTHING APPLIED (ask-first)" / "All patches UNAPPLIED; worktree clean throughout"~~ (2026-09-13) - STALE, superseded 2026-09-19 (verified by hunk match): 90/90 patches were applied to LIVE on 2026-09-14T05:58Z; kept because it explains the original packet wording.
- ~~DE-040 "in-repo stopped matching LF-only hunks, outside-repo clean"~~ - not reproduced (see the laundry-list section in [[2026-07-troubleshooting-melange-audits-and-reviews-later-reviews]], lessons on `git apply`).

## Next Steps

- [ ] Paul: rule on S-5 (pillar-weight discrepancy: law 14 `30/25/40/5` vs live `45/10/40/5`) and on a commit pass of the live tree (partly done 2026-09-19 by the reconcile).
- [ ] Paul: rule on the three systemic findings S-1, S-3 (cumulative membership source for the desk is his architecture call), S-4; delete `%TEMP%\inspect.py`, fix the 3 stale assertions (S-2); apply class A with `.live.patch` variants where HEAD patches fail; rule on class B; design items (SCRAPEB-1 first).
- [ ] Paul rulings pending from the laundry-list sheet: R2, R3, R4, N3, N6 (PERS parity drift), N7, A6, R8, R9, D6, N13, N14, N17, N18, N19, N20.
- [ ] NEXT FAIL-CLOSED DATE 2026-09-21T03:41:10Z: clear `data/legislation/sentinel_admissions.json` (paid claude-cli step; Paul's spend + model ruling, N19) or the chain and desk stop.
- [ ] Membership file expires 2026-09-27T19:46:30Z (refresh unit in the laundry-list section).
- [ ] Score the receptivity outcome test around September 2026: `python fec/outcome_snapshot.py --score outcome_snapshot_2026-07-04.json` (scorer refuses under 60 days or under 150 movers).
- [ ] Paul items from the A-grade list (run-4c): 5 valence answers in `valence_family_review.csv`, 60 attribution labels, 30 persona ratings, $4.40 `--score --go` on 731 new uncached mentions, post-reingest disposition rebuild.
- [ ] Open items from the 07-08 audits (see the two 2026-07-08 audit sub-sections in [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-4-5-and-integrity]]): dead `interaction_features.agree` feature, workbook durable-fix choice, press date sentinels, JS-mirror psych parity, voteview producer, S3-05 disambiguation of the two "round 6"s.

## Pillar weights, three sets (resolution 3)

| Weights | Date | Status |
|---|---|---|
| `.40/.30/.20/.10` | 2026-06-29 | historical (not in the audit sources; recorded for completeness) |
| `30/25/40/5` | ratified 2026-07-07 | LAST RATIFIED (code-review S-5: "law 14 says 30/25/40/5"). Numerically the same as the audit baseline noted 2026-07-01: Leg 0.25 / Press 0.30 / Influence 0.40 / Demo 0.05 |
| `45/10/40/5` | live in `ranks_python.json` since 2026-09-03 | LIVE BUT UNRATIFIED; live-only `fec/engine/pillar_policy.py` (a fail-closed desk gate) encodes 45/10/40/5; byte-identical to the Codex f149 blob `d68ddcda6`; code-review S-5 awaits Paul's ruling |

- Also seen in audits: the desk once displayed pillar weights `0.40/0.20/0.35/0.05` from the stale workbook Blended Model sheet versus live `0.25/0.30/0.40/0.05` (run-5h, 2026-07-06, fixed to read `ranks_python.json`); media = 30% not 40% was "verified exact" in the 2026-07-02 Audit II (pillar weights 0.25/0.30/0.40/0.05).
- Per-cell press-weight row 535 for Interchange/CU Tax Status/CCM (W1) is a different thing: category weights inside the press pillar, see the 2026-07-02 deep audit in [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-1-3]].

## July 2026 audit-run history (merged memory `audit-history-2026-07`; binding refuted lists, never hand-extend JSON, byte-match input-purity method, port 8802 not 8801)

Source files of the merged record (memory file names): `audit-history-2026-07.md`, with embedded sections from `moneyball-audit-run2-2026-07-02.md`, `moneyball-audit-run3-2026-07-03.md`, `moneyball-audit-run4-2026-07-04.md`, `moneyball-audit-run-guardrails.md`, `data-integrity-audit-2026-07-08.md`, `audit-network-vote-cycle-2026-07-08.md`. Source note: this is the merged record of the 2026-07 Moneyball audit-run memories (07-01 through 07-10), each run kept as its own sub-section in [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-1-3]] and [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-4-5-and-integrity]], newest-wins applied only where one run explicitly supersedes another.

## Open questions and unresolved items (for Paul)

- Which pillar-weight set governs (S-5), see the three-set table.
- Whether to retrain the stance classifier (composed-tuned vs DEBATE retrain with attribution + valence + unrelated).
- Defender in PRO camps in `assemble_viz`; CU Tax Status DEFENSIVE vs OFFENSIVE scoring.
- Dead `interaction_features.agree` feature; workbook durable-fix choice; press date sentinels (#31-36).
- Miller & Sutherland hearing cutoff-RECEIVED exclusion and the `big5_llm` hearings exclusion (provenance census items 1 and 2).
- Whether merged branches (run-4n) are deleted.
