---
type: concept
name: "Say-do gate"
aliases: ["say-do Rule A"]
description: "A Champion or Defender cell in the category-stance matrix stands only if the stated stance is backed by a recorded action there: an authored or original-cosponsored bill (Path A) or a CU-aligned final-passage vote (Path V); otherwise Ally."
related_to: ["[[stance-pipeline-integrity-contract]]"]
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\STANCE_PIPELINE_INTEGRITY.md"
    sha256: "d629241f000c78564fb95984aa029c3c92c0b9be3a643f7e0f07c9ceb3e4e2c0"
    as_of: "2026-07-15"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\moneyball_core.py"
    sha256: "46b54d266e87bc87562bc680bee76e9f36b4f3972266d0f66e65175d9894b483"
    as_of: "2026-10-01"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\stance\\per_category_stance.py"
    sha256: "36bfca97e65ad9175d2f264feba03033463572e5acf25359c5d1961878525fa3"
    as_of: "2026-09-16"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\tests\\run_tests.py"
    sha256: "c34dc1256eaf58dfa6340dc7fbeb27da4d7ad08a584f50eb62afa3857ed7c0b8"
    as_of: "2026-10-02"
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/concept", "domain/research"]
---

# Say-do gate

> A Champion or Defender cell in the category-stance matrix stands only if the stated stance is backed by a recorded action there: an authored or original-cosponsored bill (Path A) or a CU-aligned final-passage vote (Path V); otherwise Ally.

Dated correction (2026-10-04, document import; sources `STANCE_PIPELINE_INTEGRITY.md` and `fec/moneyball_core.py` of 2026-10-01): until this date this note's summary said that, since 2026-07-08, a Chair or Ranking seat on a committee of jurisdiction over a gatekeep category (Path J) also kept a top tier. That was the rule ratified on 2026-07-08. Path J left the code with the 2026-07-15 snapshot commit `e3d2923d0` and is not in the 2026-10-01 code; see "Path J and the overall gate: dated history" below.

## Description

Stated support is cheap; the gate asks whether a member's actions match the words. It landed on 2026-07-07 as Rule A (@18ce3b3, ratified by the user and the boss), in the same session as GATE-2: a Champion or Defender cell of the category-stance matrix needed a sponsored or original-cosponsored bill in that category, else it displayed Ally (58 cells capped across 48 members). On 2026-07-08 (@2636444, user-ratified scope) the gate was generalized to three costly-signal paths, because crediting only authored bills wrongly capped defensive champions who gatekeep rather than author: A, an authored or original-cosponsored bill; V, a recorded CU-aligned final-passage vote; J, a Chair or Ranking seat on a committee of jurisdiction over a GATEKEEP category (`MC.GATEKEEP_JURIS`, user-ratified: CU Tax Status, Interchange, Credit Card Mandates). Caps fell from 58 to 44 and four overalls rose: Crapo Highly Persuadable to Ally through Path J, Britt Ally to Champion, J.Smith to Ally, Lynch to Persuadable. The raw stance is preserved in `category_stance.json` (its `gate` block, which gained `corrob` and `gatekeep` on 2026-07-08), so the cap changes what is displayed without destroying the measured stance. The gate is deliberately fail-OPEN when an evidence source is unreadable, though the 2026-09-12 kernel run reported its "missing evidence source fails OPEN" check failing, attributed there as a pre-existing defect. Correction (2026-10-04): this paragraph describes the gate as of 2026-07-08; Path J left the code by 2026-07-15, and since 2026-09-16 the cell gate fails closed on missing authorship evidence (dated history below).

Later lanes cite the A path by its ratified Rule A wording, "authored or original-cosponsored": a board that counts sponsored rows only is narrower than Rule A, and letter signers recorded as original cosponsors satisfy the gate's A path. Scores written before the gate, such as the desk radar scores, must be masked with the gated matrix whenever they are weighted, or they silently re-promote capped members.

## Path J and the overall gate: dated history (correction, 2026-10-04)

- **Ratified 2026-07-08.** Three costly-signal paths: A (authored or original-cosponsored bill), V (recorded CU-aligned final-passage vote) and J (Chair or Ranking seat on a committee of jurisdiction over a GATEKEEP category). The GATEKEEP map carried the code comment "USER-RATIFIED 2026-07-08" (commit `2636444e6`).
- **Path J removed by 2026-07-15.** J is still in the committed code at `d66da46ac` (2026-07-14 17:10 -0500) and absent from the snapshot commit `e3d2923d0` (2026-07-15 14:51 -0500), whose message says it captured uncommitted codex/ChatGPT work in progress as the working base. That commit added the code comment "Committee office is deliberately NOT a say-do action" and the contract `STANCE_PIPELINE_INTEGRITY.md` ("Committee jurisdiction is not an action signal and cannot preserve a top tier"). The date of the working-tree change, and any ruling that dropped J, are unknown: no record of either was found in this vault, in the brain's DECISIONS, DEADENDS and CONSTRAINTS, or in the history of `fec/moneyball_core.py` beyond these two commits. `e3d2923d0` is an ancestor of Melange `main`, and no later commit on `main` re-adds `GATEKEEP_JURIS`.
- **Code as of 2026-10-01 (`fec/moneyball_core.py`, commit `5113ea527`).** The cell gate (`cap_uncorroborated`) has paths A and V only; the code says committee office is already represented in the Influence pillar. A Champion or Defender cell without A or V displays Ally, and the raw tiers stay in the `gate` block of `category_stance.json`. The test suite asserts that a committee title does not substitute for action.
- **The overall-Champion gate (in code since the same 2026-07-15 snapshot).** When bill evidence is available, `overall_say_do_gate` caps a raw overall Champion to Ally if it has fewer than six raw top-tier cells (`SAY_DO_MIN_TOP_CELLS` = 6), if fewer than two-thirds of them carry A/V evidence (`SAY_DO_OVERALL_RATIO` = 2/3), or if 10 or more direct sponsored bills (`SAY_DO_DIRECT_VOLUME_MIN`) show at most 20% advanced past introduction (`SAY_DO_MAX_ADVANCEMENT_RATE` = 0.20). The last check is waived for 20 or more direct sponsored bills (`SAY_DO_EXCEPTIONAL_AUTHORSHIP_MIN`) when every raw top-tier domain carries A/V evidence. Since commit `391a4a8b5` (2026-07-16) the gate no longer vetoes the Tier-1 display crown: the overall "Champion" shown is the active primacy board's top 13 with a qualifying action (since `e3e5ece7c`, 2026-09-16), and the gate's result is kept as an audit record (`gate.overall_capped`).
- **Fail-open, corrected.** The cell gate's `if not corr` fallback (landed with `18ce3b3cd` on 2026-07-07; later code comments call the case a missing authorship source) left the cells uncapped whenever the accepted-evidence map was empty, until commit `742b68aec` (2026-09-16, lane item B-1) removed it; a missing or invalid workbook has raised instead since the 2026-07-15 snapshot's "refusing to disable the say-do gate" guard. Since 2026-09-16 an empty accepted-evidence map caps every top cell that lacks A or V, while `bill_corroboration()` raises on a missing, invalid or unadjudicated source. Only the aggregate gate still fails open.
- **Displayed field labels (by 2026-09-16).** The dashboard and member desk show the rank-honors field labels (projection `296f40e2b`; rule G from `e3e5ece7c`, brain D-031), which do not apply this gate; the gated matrix stays the stance input in `category_stance.json` that the engines read, and it backs the hidden analytical workbook view.

## Key Characteristics

- Champion or Defender needs a costly signal in the category through one of three paths (since 2026-07-08): A, a sponsored or original-cosponsored bill (Rule A, ratified 2026-07-07); V, a recorded CU-aligned final-passage vote; J, a Chair or Ranking seat on a committee of jurisdiction over a GATEKEEP category (`MC.GATEKEEP_JURIS`, user-ratified). Correction (2026-10-04): A and V only since the 2026-07-15 snapshot; J is history (dated history above).
- Without any of the three the cell displays Ally; the raw stance stays in `category_stance.json`.
- Fail-OPEN by design when an evidence source cannot be read. Correction (2026-10-04): since 2026-09-16 only the aggregate gate fails open; the cell gate fails closed (dated history above).
- Consumers of pre-gate scores mask with the gated matrix, or they undo the cap.
- It changes labels, not the influence rank: the related band-scale shift was recorded as a say-do calibration, not a blended-rank mover.

## Where it Applies

- [[2026-07-feature-influence-engine-internals]] — the gate landed @18ce3b3 on 2026-07-07, in the GATE-2 session, and was generalized to the A/V/J paths on 2026-07-08 (@2636444); Path J was removed by the 2026-07-15 snapshot `e3d2923d0`
- [[melange-systems]] — the category-stance matrix and the member desk of the Melange model

## Related Concepts

- [[influence-vs-alignment-axes]] — the gate acts on the alignment axis (stance labels), not on the influence rank
- [[stance-pipeline-integrity-contract]] — the 2026-07-15 production contract that states the A/V rule, the overall-Champion check and the fixed stance scale

## Evidence

Other notes that use the gate, by title (plain text, so their link budgets are unchanged):

- Single-look holdout discipline: the landing @18ce3b3 (Rule A cap, raw preserved, fail-OPEN on an unreadable source) and the 2026-07-08 generalization to the A/V/J paths (caps 58 to 44; Crapo to Ally through Path J). (State of 2026-07-08; Path J was removed by 2026-07-15.)
- Legislative pillar and ACU review: letter signers are original cosponsors (weight 2.0), which satisfies the say-do Champion A-path.
- Coalition-builder redesign session: the desk radar scores were written before the gate, so radar weighting must mask with the gated matrix.
- CU stance and sentiment scoring: the overall band-scale shift is a say-do calibration, not a blended-rank mover.
- Primacy and industry tier boards: the V1.1 board's "led" counts sponsored rows only, narrower than the ratified Rule A ("authored or original-cosponsored").
