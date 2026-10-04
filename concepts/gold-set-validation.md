---
type: concept
name: "Gold-set validation"
aliases: ["gold-set gate"]
description: "A measure is trusted only after it scores against a fixed, independently labelled, owner-ruled gold set that the pipeline under test never sees."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/research"]
---

# Gold-set validation

> A measure is trusted only after it scores against a fixed, independently labelled, owner-ruled gold set that the pipeline under test never sees.

## Description

Across the Melange scoring lanes a reader, model or instrument earns trust by its score on a gold set: a frozen collection of labels made independently of the thing being tested and adjudicated by Paul. The Big Five instrument is anchored to the *Personality on the Hill* appendix panels (129 Senate insiders and 125 academics); the stance stack is measured against a human gold queue; the fine-tuned DEBATE stance model was deployed after scoring about 85% (kappa 0.76) on a member-grouped human-gold test. The pipeline under test runs blind to the gold labels, as Paul's "bullseye" ruling of 2026-08-28 requires.

Where no gold criterion exists, a lane says so and gates on what it can show instead (construct integrity and fresh reliability for the N slot), rather than claiming convergence with a criterion it does not have. A component that was never measured against human gold is recorded as unmeasured.

## Key Characteristics

- The gold set is fixed before the look and labelled independently of the pipeline; gold is Paul's adjudication.
- The pipeline under test runs blind to the gold labels.
- Validity is stated per axis or reader, at the strength the gold supports (for example both panels clearing the association and strict-discriminant gates).
- A gold look is a confirmatory look and follows the single-look discipline.
- No gold criterion means no criterion claim: the gate falls back to construct integrity and reliability, and says so.

## Where it Applies

- [[2026-07-feature-personality-psychometrics]] — E and A are ACTIVE_EXTERNAL_GOLD_ANCHORED: both Senate gold panels clear the association and strict-discriminant gates
- [[2026-06-feature-cu-stance-and-sentiment]] — the stance stack is measured against a human gold queue (312 items, 171 members); more gold labels on bill-naming releases is the open fix
- [[debate-stance-model]] — 54 billstatus rows still sit among the gold labels of the DEBATE retrain TRAIN split, an open follow-up since 2026-06-30
- [[melange-systems]] — the project whose scoring layers are validated this way

## Related Concepts

- [[two-hop-stance-decomposition]] — its valences were auto-typed by PMI on the gold human labels
- [[single-look-holdout-discipline]] — the frozen Senate gold (the "golden template") is spent under the one-look rule

## Evidence

Other notes that use the practice, by title (plain text, so their link budgets are unchanged):

- Melange data-collection lanes: the blind-pipeline ("bullseye") ruling, the inference pipeline runs blind to gold labels.
- Audio and speech lane: the two-panel Senate gold verdicts of 2026-07-16.
- Congress R scrapers: the fine-tuned DEBATE model was deployed on a member-grouped human-gold test.
- Staffer network architecture and overlap rule: the gold set (I-4) still gates arming.
- Change control and Paul's decision authority: the hand-labelled gold labels are his data; ask before touching them.
- quant-model-evaluation skill: its Melange binding fixes "gold = Paul's adjudication".
- Melange audio pipeline: never measured against human gold; the 150-clip annotation packet was never coded.
- Melange audits and code reviews: the stance-stack gold queue and its harness.
- Legislative pillar and ACU review: the desk's gold-anchored axes use the out-of-fold Senate gold.
