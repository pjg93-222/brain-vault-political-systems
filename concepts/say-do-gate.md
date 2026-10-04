---
type: concept
name: "Say-do gate"
aliases: ["say-do Rule A"]
description: "A member is shown as Champion or Defender in a category only if the stated stance is backed by authored or original-cosponsored action there (Rule A cap); otherwise the cell displays Ally."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/research"]
---

# Say-do gate

> A member is shown as Champion or Defender in a category only if the stated stance is backed by authored or original-cosponsored action there (Rule A cap); otherwise the cell displays Ally.

## Description

Stated support is cheap; the gate asks whether a member's actions match the words. It landed on 2026-07-07 (@18ce3b3, ratified by the user and the boss) in the same session as GATE-2: a Champion or Defender cell of the category-stance matrix needs a sponsored or original-cosponsored bill in that category, else it displays Ally. The raw stance is preserved in `category_stance.json` (its `gate` block), so the cap changes what is displayed without destroying the measured stance. The gate is deliberately fail-OPEN when its evidence source is unreadable.

Later lanes keep the rule's exact wording: the ratified Rule A counts "authored or original-cosponsored" action, so a board that counts sponsored rows only is narrower than the gate, and letter signers recorded as original cosponsors satisfy the Champion path. Anything computed before the gate, such as the desk radar scores, must be masked with the gated matrix, or it silently re-promotes capped members.

## Key Characteristics

- Champion or Defender requires in-category action: a sponsored or original-cosponsored bill (Rule A, ratified 2026-07-07).
- Without that action the cell displays Ally; the raw stance stays in `category_stance.json`.
- Fail-OPEN by design when the evidence source cannot be read.
- Consumers of pre-gate scores mask with the gated matrix, or they undo the cap.
- It changes labels, not the influence rank: the related band-scale shift was recorded as a say-do calibration, not a blended-rank mover.

## Where it Applies

- [[2026-07-feature-influence-engine-internals]] — the gate landed @18ce3b3 on 2026-07-07, in the GATE-2 session
- [[melange-systems]] — the category-stance matrix and the member desk of the Melange model

## Related Concepts

- [[influence-vs-alignment-axes]] — the gate acts on the alignment axis (stance labels), not on the influence rank

## Evidence

Other notes that use the gate, by title (plain text, so their link budgets are unchanged):

- Single-look holdout discipline: the landing @18ce3b3 (Rule A cap, raw preserved, fail-OPEN on an unreadable source).
- Legislative pillar and ACU review: letter signers are original cosponsors (weight 2.0), which satisfies the say-do Champion A-path.
- Coalition-builder redesign session: the desk radar scores were written before the gate, so radar weighting must mask with the gated matrix.
- CU stance and sentiment scoring: the overall band-scale shift is a say-do calibration, not a blended-rank mover.
- Primacy and industry tier boards: the V1.1 board's "led" counts sponsored rows only, narrower than the ratified Rule A ("authored or original-cosponsored").
