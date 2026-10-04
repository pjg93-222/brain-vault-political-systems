---
type: concept
name: "Trend over significance"
aliases: ["trend-first reporting"]
description: "Report a result's sign, size and consistency across variants first, as real R summary(lm()) output, and put the p-value after; for exploratory work the trend, not p < 0.05, is the bar."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/research"]
---

# Trend over significance

> Report a result's sign, size and consistency across variants first, as real R `summary(lm())` output, and put the p-value after; for exploratory work the trend, not p < 0.05, is the bar.

## Description

Paul's rule of 2026-09-26 ("Doesn't matter if it is significant if the trend is there"), kept as the memory note `trend-over-significance-2026-09-26`. It arose in the sector-growth study, an exploratory regression lane feeding the Mentat Insights forecast upgrade, where what matters is whether a relationship's direction and size hold. Each result is reported trend-first: the sign, the size in plain units, and whether the sign holds across variants, sectors and folds; the p-value and confidence interval follow in one line, and no report opens with "not significant".

Honesty about noise stays in one short clause (a weak trend's sign can flip with a few more years, so a trend is never "confirmed"), and whether a trend is usable is tested with an out-of-sample forecast backtest against the current seasonal-naive forecast rather than argued from significance. The rule pairs with the companion rule of 2026-09-25: regressions are shown as real R `summary(lm())` output.

## Key Characteristics

- Lead with sign, size and fold or variant consistency; the p-value and CI follow in one line.
- Never open with "not significant"; never call a trend "confirmed".
- Test usefulness with an out-of-sample backtest against the seasonal-naive baseline.
- Present regressions as real R `summary(lm())` printouts.
- Model audits follow it too: re-run the regressions and lead with sign, size and fold consistency.

## Where it Applies

- [[2026-06-working-agreement-communication-and-presentation-style]] — the rule itself (2026-09-26), with its why and how to apply
- [[2026-09-feature-sector-growth-study]] — the lane where it was ruled; results are reported trend-first as real `summary(lm())` output
- [[quant-model-evaluation-skill]] — the evaluation skill lists `trend-over-significance-2026-09-26` among its related memory notes
- [[forecast-redesign]] — the 2026-09-29 forecast audit re-ran the regressions and led with sign, size and fold consistency

## Evidence

Other notes that use the rule, by title (plain text, so their link budgets are unchanged):

- Forecast audit, giving-view redesign and PAC accuracy: re-run the regressions and lead with sign/size/fold consistency.
- Single-look holdout discipline, CU-geography Luna model and row framework, Agent tooling stack: each lists `trend-over-significance-2026-09-26` among its related memory notes.
