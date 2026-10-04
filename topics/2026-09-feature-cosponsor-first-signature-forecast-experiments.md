---
type: topic
title: "Cosponsor first-signature forecast experiments (2026-09-05)"
aliases: ["Cosponsorship universe experiments", "377 continuing-member cosponsorship benchmark"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors: []
objective: "Record the 2026-09-05 research series that forecast a member's first cosponsorship of a financial bill within 30 days among 377 continuing members: design, the 2023-selected winner, its 2024 development result, what did not help, and the prospective window that becomes scorable on 2026-10-06."
created_at: 2026-09-05
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\outputs\\cosponsor_universe_20260905\\REPORT.md"
    sha256: "b2d7e6cbc37b375a3071e3a96bfea546d432932f84ce7cf6cb709490665d2335"
    as_of: "2026-09-05"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\outputs\\cosponsor_universe_20260905\\BRAIN_UPDATE_DRAFT.md"
    sha256: "cca57f22bff02c8736d7fa8e994c0b72d2996af2a0a6ebf6f5745c01bd4106cb"
    as_of: "2026-09-05"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
---

# Cosponsor first-signature forecast experiments (2026-09-05)

> The 2026-09-05 research series that forecast which of 377 continuing members would make a first cosponsorship of a financial bill within 30 days: a tree model using all evidence won selection on 2023 and added 47 correct recommendations in 2024, no single new evidence family beat all four tree controls, and the results are development evidence only.

> [!warning] Untracked output
> Both sources sit in `outputs/cosponsor_universe_20260905/` of the Melange checkout, which git does not track (no copy in the repository). The series' brain update draft was not applied: a search on 2026-10-04 found no mention of it in the brain's STATE, DECISIONS, DEADENDS or CONSTRAINTS, or in this vault.

## Context

The series belongs to the same cosponsorship-forecasting work as the 2026-09-04 cosponsor forecaster lane ([[2026-07-feature-legislative-pillar-acu-review-cosponsor-forecaster]]). Its capstone report (generated 2026-09-05 21:37 UTC) builds on earlier same-day challenger and refinement experiments, whose reports it links.

## Design

- **Target:** an actual dated first cosponsorship within the next 30 days, for financial House and Senate bills admitted by the inherited finance-at-introduction filter, forecast at bill ages 0, 35, 70, 105, 140 and 175 days; existing cosponsors leave the risk set.
- **Cohort (user-directed):** 377 people present in both historical risk sets (Congresses 117 and 118) and the official September 2026 roster, 290 House and 87 Senate. This is a conditional continuing-member benchmark; it does not repair survivor selection or transport to freshmen. "Gold cohort" means the verified identity intersection, not gold-standard personality traits.
- **Data and protocol:** train on Congress 117 (214,132 sampled rows with all 6,529 positives and a 10% negative sample weighted by 10), select and calibrate on 2023, freeze, then assess 2024 (1,048,932 member-bill-date rows, 2,100 positive events). 24 refits: 16 challengers and 8 controls, all on the same rows; 79 contrasts with 100,000 whole-legislative-family resamples and Bonferroni intervals, separately for precision and Brier.
- **Excluded as historical inputs:** current Big Five, receptivity and influence-maximization scores, because they use later outcomes or current normalization.

## Results (development evidence, not confirmation)

- "All evidence: trees" (id `boosted_universe` in the draft) won the 2023 selection among 23 eligible models; in 2024 it made 366 correct top-eight recommendations of 38,128 (0.960%) against 319 (0.837%) for refitted dynamic trees, +47, adjusted precision change +0.016 to +0.245 percentage points.
- Against the public-coverage, network and context tree controls its adjusted intervals include zero; no challenger beat all four tree controls after adjustment.
- The strongest single addition in 2024 was recent legislative activity (+55 over dynamic trees, +41 over public-coverage trees); trees beat logistic regression on the full feature set by 61; language and media blocks showed no established incremental gain.
- Even perfect knowledge caps forced top-eight precision at 3.91%, because 4,148 bill-dates have no later joins. The selected model's probabilities underpredicted the 2024 event count by 30.86% (about 1,452 expected against 2,100 observed).
- The audit inventoried 402,142 artifacts in 323 path families across 80 declared stores; that is an inventory, not proof that every family was modeled.

## Decisions

- This is a forecasting comparison; it does not show that lobbying, psychological targeting, staff connections or media co-appearance cause a signature.
- Both 2023 and 2024 had been inspected in earlier research, so neither is an independent holdout.

## Next Steps

- [ ] Score the existing 2026-09-05 prospective forecasts no earlier than 2026-10-06 (their 30-day window ends 2026-10-05). They come from earlier issued models, not the new cohort refits, and must not be back-edited (owner: unassigned in the source).
- [ ] Any prospective test of a new cohort model needs its own source, feature, model and forecast receipts (owner: unassigned in the source).

## Related Projects

- [[melange-systems]] — the legislative pillar's cosponsorship forecasting work.

## Related

- [[single-look-holdout-discipline]] — the prospective forecasts are an immutable look, scorable once after their window closes.
