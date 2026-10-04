---
type: concept
name: "Say-do gate"
aliases: ["say-do Rule A"]
description: "A member is shown as Champion or Defender in a category only if the stated stance is backed by a costly signal there: an authored or original-cosponsored bill (Path A, the 2026-07-07 Rule A) or, since 2026-07-08, a recorded CU-aligned final-passage vote (Path V) or a Chair or Ranking seat on a committee of jurisdiction over a gatekeep category (Path J); otherwise the cell displays Ally."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/research"]
---

# Say-do gate

> A member is shown as Champion or Defender in a category only if the stated stance is backed by a costly signal there: an authored or original-cosponsored bill (Path A, the 2026-07-07 Rule A) or, since 2026-07-08, a recorded CU-aligned final-passage vote (Path V) or a Chair or Ranking seat on a committee of jurisdiction over a gatekeep category (Path J); otherwise the cell displays Ally.

## Description

Stated support is cheap; the gate asks whether a member's actions match the words. It landed on 2026-07-07 as Rule A (@18ce3b3, ratified by the user and the boss), in the same session as GATE-2: a Champion or Defender cell of the category-stance matrix needed a sponsored or original-cosponsored bill in that category, else it displayed Ally (58 cells capped across 48 members). On 2026-07-08 (@2636444, user-ratified scope) the gate was generalized to three costly-signal paths, because crediting only authored bills wrongly capped defensive champions who gatekeep rather than author: A, an authored or original-cosponsored bill; V, a recorded CU-aligned final-passage vote; J, a Chair or Ranking seat on a committee of jurisdiction over a GATEKEEP category (`MC.GATEKEEP_JURIS`, user-ratified: CU Tax Status, Interchange, Credit Card Mandates). Caps fell from 58 to 44 and four overalls rose: Crapo Highly Persuadable to Ally through Path J, Britt Ally to Champion, J.Smith to Ally, Lynch to Persuadable. The raw stance is preserved in `category_stance.json` (its `gate` block, which gained `corrob` and `gatekeep` on 2026-07-08), so the cap changes what is displayed without destroying the measured stance. The gate is deliberately fail-OPEN when an evidence source is unreadable, though the 2026-09-12 kernel run reported its "missing evidence source fails OPEN" check failing, attributed there as a pre-existing defect.

Later lanes cite the A path by its ratified Rule A wording, "authored or original-cosponsored": a board that counts sponsored rows only is narrower than Rule A, and letter signers recorded as original cosponsors satisfy the gate's A path. Scores written before the gate, such as the desk radar scores, must be masked with the gated matrix whenever they are weighted, or they silently re-promote capped members.

## Key Characteristics

- Champion or Defender needs a costly signal in the category through one of three paths (since 2026-07-08): A, a sponsored or original-cosponsored bill (Rule A, ratified 2026-07-07); V, a recorded CU-aligned final-passage vote; J, a Chair or Ranking seat on a committee of jurisdiction over a GATEKEEP category (`MC.GATEKEEP_JURIS`, user-ratified).
- Without any of the three the cell displays Ally; the raw stance stays in `category_stance.json`.
- Fail-OPEN by design when an evidence source cannot be read.
- Consumers of pre-gate scores mask with the gated matrix, or they undo the cap.
- It changes labels, not the influence rank: the related band-scale shift was recorded as a say-do calibration, not a blended-rank mover.

## Where it Applies

- [[2026-07-feature-influence-engine-internals]] — the gate landed @18ce3b3 on 2026-07-07, in the GATE-2 session, and was generalized to the A/V/J paths on 2026-07-08 (@2636444)
- [[melange-systems]] — the category-stance matrix and the member desk of the Melange model

## Related Concepts

- [[influence-vs-alignment-axes]] — the gate acts on the alignment axis (stance labels), not on the influence rank

## Evidence

Other notes that use the gate, by title (plain text, so their link budgets are unchanged):

- Single-look holdout discipline: the landing @18ce3b3 (Rule A cap, raw preserved, fail-OPEN on an unreadable source) and the 2026-07-08 generalization to the A/V/J paths (caps 58 to 44; Crapo to Ally through Path J).
- Legislative pillar and ACU review: letter signers are original cosponsors (weight 2.0), which satisfies the say-do Champion A-path.
- Coalition-builder redesign session: the desk radar scores were written before the gate, so radar weighting must mask with the gated matrix.
- CU stance and sentiment scoring: the overall band-scale shift is a say-do calibration, not a blended-rank mover.
- Primacy and industry tier boards: the V1.1 board's "led" counts sponsored rows only, narrower than the ratified Rule A ("authored or original-cosponsored").
