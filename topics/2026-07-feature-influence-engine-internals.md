---
type: topic
title: "Influence engine internals"
aliases: ["Influence engine internals"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "melange-fec-pipeline"
  - "moneyball-workbook"
objective: "Record the July 2026 build of the Melange influence-engine internals: the six-paper salience/press-SNA wave, the personality/incentive receptivity layer (PERSONA_W 0.30 ratified), GATE-2 with the say-do gate and pillar-weight change, the ChatGPT-lane landing, the Sub Layer off-by-one surgery, and the coalition-builder redesign (design verdicts plus implementation through 2026-08-01) still gated on Paul's APPLY/landing decisions."
created_at: 2026-07-01
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-coalition-builder-redesign-2026-07-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-coalition-builder-redesign-2026-07-30.md", sha256: "6de9c3e1f37e948cdca7a5c0f740343e3fe9eef844666fac95fec4e666753b26"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/chatgpt-lane-landed-2026-07-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\chatgpt-lane-landed-2026-07-16.md", sha256: "a2f66fb2d176812011d8d527d20ea640bceae00eb80a8447a8c21a23f7b82a65"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sublayer-surgery-2026-07-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sublayer-surgery-2026-07-17.md", sha256: "9f165d2f3d53c188074a75a1fa16f3b6eff9021fae80183fb72a1fb771998cf7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-receptivity-layer.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-receptivity-layer.md", sha256: "23c09724dffc61151615277b6b40e53a92b5f7a0acad9e6a08993bedaf74bce1"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-2026-07-07-gate2-round1.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-2026-07-07-gate2-round1.md", sha256: "620e375015bda9de9b470e08aaa01403aa0401385c4b12978c1a487f0338aac6"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-salience-sna-2026-07-01.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-salience-sna-2026-07-01.md", sha256: "760abadd0aed0a857fa458c3acba8c0b5a36735658edf5756a69180dca3ef555"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/competitiveness-multiplier-lane-2026-10-05.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\competitiveness-multiplier-lane-2026-10-05.md", sha256: "3ce429bcd2ab0ec5d8b4600fc321ea02b07250cc3ea72f91226c1719c0f174e3"}
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# Influence engine internals

> July 2026 engine-side build of the Melange / Moneyball influence model: receptivity layer, salience shock and press SNA, GATE-2 and say-do gate (with pillar weights), Sub Layer off-by-one surgery, ChatGPT lane landing, and the coalition-builder redesign awaiting Paul's landing decisions.

## Parts

- [[2026-07-feature-influence-engine-internals-salience-sna-wave]] — The six-paper salience and press-SNA wave of 2026-07-01 in the influence engine, including the media blend that went live on 2026-07-02.
- [[2026-07-feature-influence-engine-internals-receptivity-layer]] — The receptivity layer of the influence engine (2026-07-02 to 07-08): the original build, the hearing-transcript corpus, social edges, the 07-03 upgrades and campaign, and the N-channel exploration.
- [[2026-07-feature-influence-engine-internals-gate2-and-say-do]] — GATE-2 of 2026-07-07/08 in the influence engine, the C retest, the improvement rounds, the say-do gate and the pillar weights set in that session.
- [[2026-07-feature-influence-engine-internals-chatgpt-lane-and-sublayer-surgery]] — The ChatGPT laundry-list lane landing of 2026-07-16 and the Sub Layer off-by-one surgery of 2026-07-16/17, as recorded for the influence engine.
- [[2026-07-feature-influence-engine-internals-coalition-builder]] — The coalition-builder redesign and implementation of 2026-07-30 to 08-01, as recorded for the influence engine.
- [[2026-07-feature-influence-engine-internals-competitiveness-multiplier]] — The competitiveness multiplier lane of 2026-10-05 to 10-07: Paul's rulings on a PVI-based multiplier c that makes money to members in competitive races count more inside the money curves, its build and go-live behind the COMPET_MULT dial, the QME audit and Paul's follow-up rulings (brain D-104 to D-106).

## Context

- Engine = the `fec/` layer (flip, coalition, electoral, route, priming, money-response, scenario, optimizer, dashboard bundle) that reads the ranks plus the stance/psychology layers. This topic covers the July 2026 additions to it. The June build that created it is in `2026-06-feature-moneyball-excel-model-build`; the pipeline code root for the engine is Melange fec/ pipeline; the product/project umbrella is [[melange-systems]]; the ranked workbook that engine outputs are verified against is Moneyball Blended workbook.
- **System of record changed in Phase 2** (after the period covered by these July sources): `ranks_python.json` is the authority, the workbook is a view, and there is NO COM anywhere. Every July statement below and in [[2026-07-feature-influence-engine-internals-salience-sna-wave]] and [[2026-07-feature-influence-engine-internals-chatgpt-lane-and-sublayer-surgery]] about Excel COM recalcs (for example `CalculateFullRebuild`, the 2026-07-16 20:10 COM `CalculateFull`, `write_im_sheet.py`-style pushes) is historical and superseded by that rule (approved resolution 5); it is kept because it explains older commits and artifacts.
  - Dated correction (2026-10-04): no `write_im_sheet.py` push is recorded in this note or its parts. The push on record is the 2026-06-26 IM-sheet push (via COM, backup `PRE-IM-20260626.xlsx`), in Scenario-tool pre-flight, engine build and empirical calibration (06-26/27) (Moneyball Excel model build) and Melange model audits of 2026-06-26, with the IM sheet wiring in the June co-sponsor network plan and the action item in the Melange systems project.
- Two firewalls recur through the whole topic: the **rank-neutral rule** (engine/receptivity/display changes must NOT move ranks; verified each time by the chain, see Zero-rank-delta verification) and the **one-look pre-registered gate discipline** (each pre-registered test gets exactly one look, never re-run; see [[single-look-holdout-discipline]]).
- Governing authority: every dial default, weight and stance label is Paul's (Paul Goff) per the change-control working agreement; the sources record many "user's domain" boundaries (stance labels, press classification, CFPB classification, tier placements).
- Related primacy/tier work: Primacy and industry tier boards. The coalition-builder design session of 2026-07-30 has its own page: [[2026-07-30-coalition-builder-redesign-session]].

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| Melange fec/ pipeline | Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch |
| Moneyball Blended workbook | Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority). |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model
- Zero-rank-delta verification - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean
- [[say-do-gate]] — the say-do gate (Rule A cap) landed @18ce3b3 on 2026-07-07, the same session as GATE-2, and was generalized to the A/V/J costly-signal paths on 2026-07-08 (@2636444); Path J left the code with the 2026-07-15 snapshot `e3d2923d0`, and the cell gate has failed closed since 2026-09-16 (`742b68aec`)

## Related Topics

- Primacy and industry tier boards - Primacy tier board (factor-only purity, drift, 09-19 methodology lane) plus per-industry tier boards, valence/tensor, champion crown law

## Related Discussions

- [[2026-07-30-coalition-builder-redesign-session]] - 2026-07-30 design session: static-substrate/dynamic-eval verdict, 8 positions with critic verdicts, merge-main precondition

## History

| Date | Event |
|---|---|
| 2026-07-01 | Six-paper enhancement wave (Noble-Turner salience shock, HCoI communities, Fink press-mention influence layer, TWLGCN stance dynamics, Joo frame alignment); audit_full 40 checks (8 new), all clean; same-day integration wave (augmented network), classifier wave, gold-set wrap-up (audit 46 checks) |
| 2026-07-01/02 | Quorum corpus (45 exports, Quorum Master 43,038 rows) processed; Social Master built; Bluesky full sweep; classifier fix+augment (83.9% acc); MEDIA BLEND live 2026-07-02 (press pillar = 50% press + 50% social) |
| 2026-07-02 | Receptivity layer built (7 papers; report `PERSONALITY_RECEPTIVITY_LAYER_2026-07-02.md`): `fec/big5_traits.py`, `fec/receptivity_layer.py`, wired into all engines; transcript corpus (`fec/fetch_congressional_record.py`); stance-graded contingency gate; social edges (`fec/social_interaction_layer.py`) |
| 2026-07-03 | Empath + fitted SMOreg ACTIVE @ac86bca; RKH congressional calibration @6d267f9; Birkenmaier-Lechner cue layer v4 @fc2874b (not promoted); persona utilization @25f6e44 (desk) / @276f855 (gate); collector QA @ac72198 then round 2 @917a914 (interview corpus wiped and re-harvested); v5 campaign; v6 settled-corpus accuracy @53cfa45 (mean r 0.350); user's standing instructions |
| 2026-07-04 | Behavioral basis ratified for susceptibility; PERSONA_W = 0.30 USER-RATIFIED KEEP (run-4i) |
| 2026-07-07 | GATE-2 complete (19:04); interview-C retest PASSED (one look TAKEN) consequence @b6968fd; improvement round 1 all MISS (bars @a61820e); say-do gate landed @18ce3b3; pillar weights changed to 30/25/40/5; CFPB axis isolation; psychology round 3 and campaign close; audit + honesty pass @2145063 |
| 2026-07-08 | N-channel exploration (nothing shipped, N-swap unsupported); Nokken-drift gate MISS (bars locked @2c9524c, outcome @a061e33); defensive-champion corroboration (@2636444 gate, @99b3319 behavior tab); Velazquez label review CLOSED; Crapo = Ally |
| 2026-07-10 | Memory compaction: receptivity index-line detail moved verbatim from MEMORY.md |
| 2026-07-16 | ChatGPT (laundry-list) lane landed: 391a4a8 then e58a807 (+9d563c9); Barr #1; ranks 0/533 moved; same evening Sub Layer off-by-one visible after COM recalc (20:10, 522-move) |
| 2026-07-17 | main fast-forwarded e3d2923 to 7aa36d1 by Paul; Sub Layer surgery @c6dc6b2 (9,061 formulas); guard batch @a3174bc (campaign entry 015); Vought RT gold verified @b456b9d |
| 2026-07-30 | Coalition-builder redesign session (worktree `melange-coalition-builder-design-7babbe`, nothing implemented): see [[2026-07-30-coalition-builder-redesign-session]] |
| 2026-07-30/31 | Implementation on Paul's go; three branches shipped with double sign-off; 60/40 Big5 ruled; Phase 2 renormalization committed @6226a1f; Phase 3 "Commit and merge all" |
| 2026-07-31 | Big5 augmentation (O/C/E/A/N extractors) built and concluded; commits d0a2e34 and ffbf620 |
| 2026-08-01 | Go-sequence Phase 1 shipped: coalition builder v2 @3b712bb, answer-uptake channel @8b705fa, session branch @49a86c1; A-extension data-gated; T5 doting validated |

## Decisions

- **PERSONA_W = 0.30 USER-RATIFIED KEEP (2026-07-04, run-4i): DO NOT PROPOSE REMOVAL AGAIN.** The audit session recommended removal after two null tests; the user rejected it ("We aren't removing it, look at the research"). Why: the three source papers (B&L PA'25 agency/communion, RKH PSRM'16, Yang ISR'23) show both tests were scope-mismatched (details in the Receptivity section). Reopens only on a construct-appropriate failure: a multi-rater panel to B&L standards (3+ raters, codebook, consensus) failing to converge.
- **Behavioral basis for susceptibility since 2026-07-04**: susc = .40 x coop + .30 x N - .20 x dil - .10 x dom; seed = coop/breadth/visibility; `RECEPT_TRAITS=lexical` reverts; N stays text. ~~susc_z = .40A + .30N - .20C - .10E from lexical Big5~~ (2026-07-02) - superseded 2026-07-04 (lexical Big5 indicted); kept because earlier commits use it.
- **N STAYS LEXICAL, unchanged; engine contribution UNVERIFIED; do NOT drop it** (2026-07-08): theory-grounded Byrne channel; a noisy criterion cannot carry a drop verdict. N-swap affirmatively unsupported.
- **Pillar weights**: see the Weights ledger below (three sets, last ratified = 30/25/40/5 on 2026-07-07; the live set 45/10/40/5 since 2026-09-03 is UNRATIFIED pending code-review S-5).
  - Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and no ruling is outstanding here.
- Update 2026-10-30 (memory `moneyball-2026-07-07-gate2-round1`, sha256 620e375015bda9de9b470e08aaa01403aa0401385c4b12978c1a487f0338aac6): the same session's honesty pass (audit commit 2145063) retracted one of its own claims. P6 gated shrinkage was promoted on a split-half reliability gain (.748 to .831). The memory calls that gain double-shrink inflation (finding H-1). The change was kept on external-criterion grounds (C to votes, A to cooperation), and the split-half claim was withdrawn. The memory also records the psychology campaign closing after 11 pre-registered designs, one look each. This note does not otherwise mention P6.
- **Interview-C one look is TAKEN** (2026-07-07): never re-run `c_prereg_test` as a "look"; re-testing after data changes is a NEW test needing a NEW prereg. C aggregates INTERVIEW chunks at 2x (`C_INT_W=2.0`).
- **Improvement round 1 and round 2 (blue) ALL MISS, one look each TAKEN**: the shipped config (pink equal weights + blue v2) survives; do not attempt round 3 without a fundamentally different feature basis.
- **Say-do gate landed @18ce3b3** (user + boss ratified) and generalized 2026-07-08 to 3 costly-signal paths (A/V/J); `MC.GATEKEEP_JURIS` user-ratified. Correction (2026-10-04, document import): Path J left the code with the 2026-07-15 snapshot `e3d2923d0`; the gate has had paths A and V only since then (dated history in Say-do gate).
- **CFPB axis isolation landed (user: "run the CFPB split... get creative... NO SHORTCUTS")**; the CFPB axis is user-DIRECTED, not validated-more-accurate.
- **Crapo = Ally, not Champion**; user: HOLD. **Velazquez label review CLOSED** (do not re-flag).
- **N-genre transfer CLOSED WITH RECEIPTS** (2026-07-17): never reopen without a new genre/data.
- **Champion crown law = exactly the 12 Tier-1 members**; Paul's ratified 17-placement tier contract is machine-enforced in `audit_full`.
- **Coalition-builder implementation decisions (Paul, 2026-07-30 to 2026-08-01)**: live self-updating model is the END GOAL (static accepted for now); baked features rebuild the moment inputs change (watcher T6); competitive awareness unlocked by primary-bill beneficiary classes; shared splits 0.5/0.5; suggestions rank by expected value = P(join) x marginal coverage; **Big5 60/40 RULED** ("do not push back"), `SUSC_B5_W=0.60` default, revert = 0; renormalization over available traits user-ratified; letters count CU-side user-ratified 2026-07-31.
- **Agent coding/orchestration instruction at the time (2026-07-30/31, Paul): "reason through fable, work through chatgpt 5.6 sol, extra high fast"** (Codex executor lane). Scope: agent coding/orchestration; the newest model-tiering rule governs (as of 2026-10-01 code is written in Sonnet 5.5 at effort xhigh, Opus only reasons and reviews); this earlier instruction is kept as a dated bullet. The separate pipeline-API-call tiering rule (Fable only for the 533 paragraphs, Haiku elsewhere by default, escalate to Sonnet) is not touched by this.
- **LIVE LANDING HELD**: never merge over the 43 uncommitted tracked modifications on the live tree; Paul adjudicates ownership/landing order.
- **Dead ends not to re-propose** (Big5 augmentation, 2026-07-31): stress-reactivity v2/v3, affect volatility, bill reintroduction v1 and v2-billstatus; never re-propose without new basis. Hearing-antagonism pooling killed at probe: DO NOT pool.
- **Never pair Big5 candidates with criteria as an instrument look without a LOCKED prereg.**

## Next Steps

- [ ] Paul's APPLY/landing decision for the coalition-builder surface; resolve ownership/landing order against the foreign legislative-workbench/culling lane on the live tree (43 uncommitted tracked modifications); then deploy checklist: merge session to cfpb from live tree, kernel tests, chain, zero-rank-delta (engine outputs move by design; RANKS must not), audit tail, outcome_snapshot freeze decision.
- [x] Rule on code-review S-5: the live-but-unratified pillar weights 45/10/40/5.
  - Closed 2026-10-11 by D-141 (Paul's 2026-09-03 directive; carried into the vault 2026-10-18).
- [ ] Queue (2026-07-31/08-01): cxD template v2 (one-adjacency rule + expected-value ranking + chips; 12-step plan approved), T5 doting test + language backup, T6 watcher, T7 CFPB fill-rate count, witness retry pass (sweep about 78%+ at 100% alignment) then final artifact regen, LQ regen (CBP cache re-download is Paul's gate), A-extension prereg (draft, adversarial review, LOCK) only when the eligible pool justifies a round.
- [ ] Round-4 N: data-gate OPEN (reactivity_z 270 >= 250) but the criterion is E-contaminated; successor needs a redesigned criterion.
- [ ] Ratification of any nonzero `SEED_UPTAKE_W` (default 0; probe 0.10) is Paul's.
- [ ] Paul to populate `fec/retiring_members.txt` (hook; was empty, later 3 entries).
- [ ] Open data questions: unadjudicated deep legislative-input drift (old-vs-new leg basis); fec-rank-integrity audit Workflow `wf_73d7c183-627` result; CCM's exact position within T1.
- [ ] Adoption decisions for Paul from the salience wave: blend HCoI/engagement layers into the 9 cascade loaders? adjudicate the 307 imputation proposals?

## Weights ledger (pillar weights, three sets with status)

| Date | Weights | Status |
|---|---|---|
| 2026-06-29 | `.40/.30/.20/.10` | HISTORICAL (pillar order not stated in this topic's sources) |
| 2026-07-07 | `30/25/40/5` = leg .30 / press .25 / inf .40 / demo .05 (workbook AB2-5 typed cells; backup PRE-WEIGHTS-20260707; 493/533 ranks shifted mildly; top-3 Crapo/Scott/Hill held) | **LAST RATIFIED** (ratified 2026-07-07) |
| live in `ranks_python.json` since 2026-09-03 | `45/10/40/5` | **LIVE BUT UNRATIFIED**; code-review S-5 awaits Paul's ruling |

Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and no ruling is outstanding here.

The newest set must never be read as ratified. (June sets: see the June build topic's weights ledger.)

## Source sessions

`originSessionId` of the source memory files: `moneyball-salience-sna-2026-07-01` f14329a0-9969-4f53-9d0e-fd053c7d5cfc; `moneyball-receptivity-layer` (file `moneyball-receptivity-layer.md`) d146031d-b38a-4007-a30f-86576703ec73; `moneyball-2026-07-07-gate2-round1` db9a79b6-a853-471f-a0a7-229f3895289c; `chatgpt-lane-landed-2026-07-16` and `sublayer-surgery-2026-07-17` e9080d7f-2079-4d8b-89b5-eced95034ddb; `melange-coalition-builder-redesign-2026-07-30` 91e0bd44-0f0d-41ff-b36c-4dd1cf80badb (modified 2026-08-01T04:16:15.807Z).
