---
type: concept
name: "Gold-set validation"
aliases: ["gold-set gate"]
description: "A measure earns trust by scoring against a fixed, independently labelled, owner-ruled gold set held out from the pipeline under test."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/concept", "domain/research"]
---

# Gold-set validation

> A measure earns trust by scoring against a fixed, independently labelled, owner-ruled gold set held out from the pipeline under test.

## Description

Across the Melange scoring lanes a reader, model or instrument earns trust by its score on a gold set: a frozen collection of labels made independently of the thing being tested. The Big Five instrument is anchored to the *Personality on the Hill* appendix panels (129 Senate insiders and 125 academics); the stance stacks are measured against Paul's own gold labels; the fine-tuned DEBATE stance model was deployed after scoring about 85% (kappa 0.76) on a member-grouped human-gold test. The contact-inference pipeline runs blind to its gold labels, as Paul's "bullseye" ruling of 2026-08-28 requires.

Where no gold criterion exists, a lane says so and gates on what it can show instead (construct integrity and fresh reliability for the N-slot re-anchor of 2026-07-11, before the Senate gold), rather than claiming convergence with a criterion it does not have. A component that was never measured against human gold is recorded as unmeasured.

## Key Characteristics

- The gold set is fixed before the look and labelled independently of the pipeline; Paul rules on its use, and in the stance lanes the gold labels are his own adjudications.
- The pipeline is scored on gold it did not train on (a held-out, firewalled or member-grouped split); the contact-inference pipeline runs fully blind to its gold.
- Validity is stated per axis or reader, at the strength the gold supports (for example both panels clearing the association and strict-discriminant gates).
- A gold look is a confirmatory look and follows the single-look discipline.
- No gold criterion means no criterion claim: the gate falls back to construct integrity and reliability, and says so.

## Where it Applies

- [[2026-07-feature-personality-psychometrics]] — E and A are ACTIVE_EXTERNAL_GOLD_ANCHORED: both Senate gold panels clear the association and strict-discriminant gates
- [[2026-06-feature-cu-stance-and-sentiment]] — the stance stacks are measured against Paul's gold labels (the 400 tweet golds and the 760-row press gold frame); re-enabling the bill-sign override needs an aboutness guard and more gold labels on bill-naming releases
- [[debate-stance-model]] — 54 billstatus rows still sit among the gold labels of the DEBATE retrain TRAIN split, an open follow-up since 2026-06-30
- [[melange-systems]] — the project whose stance, Big Five and contact-inference lanes are scored against gold sets
- [[2026-07-feature-data-collection-lanes-contact-inference-design-and-evaluation]] — the contact-inference evaluation plan: disclosed lobbying targets as gold (Paul's 2026-08-28 ruling adds media clippings correlated chronologically with LDA filings), an organization-grouped split, bars frozen before one look

## Related Concepts

- [[two-hop-stance-decomposition]] — its valence registry is derived from Paul's own gold valence judgments under honest cross-validation; per-target valence is curated, not automated
- [[single-look-holdout-discipline]] — each look against the frozen Senate gold (the "golden template") is spent once under the one-look rule

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
