---
type: concept
name: "Demographic Potential method"
aliases: ["Demographic Potential score", "DEMOGRAPHIC_POTENTIAL_METHOD"]
description: "The district and state market score behind the desk's Demographic Potential label: v2.1 growth room (2026-07-25 doc, eight judgmental weights), replaced as default on 2026-09-16 by v3.0 credit-union footprint."
related_to:
  - "[[four-pillar-percentile-blend]]"
  - "[[2026-06-feature-melange-dashboard-ui-evolution-members-section-lane]]"
  - "[[melange-systems]]"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\DEMOGRAPHIC_POTENTIAL_METHOD.md"
    sha256: "00e26f86d8f5b6f9d1bdd58dd0d2d3306f60327d8efcac056e68aa4c2b9d6959"
    as_of: "2026-10-04"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\district\\demographic_potential.py"
    sha256: "c58ffaf1b9edb6af4dee094dbc3ecaee4cf5dbb1ae2413ee55acdcdd78f0bbf9"
    as_of: "2026-09-16"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\DECISIONS.md"
    sha256: "a2a92dbf985cf4a1e430f00c77e21b7f6635039be55ee77bf4bd5c6888fa9aec"
    as_of: "2026-10-04"
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/concept", "domain/data"]
---

# Demographic Potential method

> The market score behind the member desk's Demographic Potential label: version 2.1 scored growth room for credit unions in a member's district or state; since 2026-09-16 the default is version 3.0, which scores the existing credit-union footprint instead.

> [!info] Source and status
> Version 2.1 is summarized from `DEMOGRAPHIC_POTENTIAL_METHOD.md` (Melange repo root, last committed 2026-07-25). That file was not updated for version 3.0, which is taken from `fec/district/demographic_potential.py` (commit `73ebf18e6`, 2026-09-16) and brain decision D-035. The doc now describes the non-default mode.
> Dated note (2026-10-04): the doc now records its code divergence. Melange commit `97e5133` (2026-10-04, on `main`, mirror-pushed) added a section "Code divergence (2026-10-04)" saying that version 2.1 is no longer the default and recording version 3.0 (the `footprint` default since `73ebf18e6`, D-035), its four components and qualification rule, and which sections apply only to version 2.1; the text after that section is unchanged since 2026-07-25 (`ba25d8803`), so the doc's main text still describes version 2.1.

## Description

The score ranks congressional markets by economic and financial evidence of credit-union opportunity. It is a market-opportunity score, not a prediction of a legislator's support and not a causal forecast of credit-union growth. Switching its version does not by itself move the rank blend's `Demo%` input ([[four-pillar-percentile-blend]]): per D-035, that input (`Blended Model` column F) is formula-backed and edited by hand in Excel, and no Python producer writes it.

### Version 2.1, growth room (method doc of 2026-07-25)

- **Weights are judgmental policy weights**, not copied from a study, estimated or fitted to credit-union growth: LQ strength 20%, normalized competitive shift 20%, aligned sectors 15%, CU branch whitespace 15%, CU deposit/share whitespace 5%, LMI lending opportunity 10%, large-employer reach 8%, small-business reach 7%. The deposit proxy gets only 5% because NCUA shares and FDIC deposits come from different systems. The doc says weights cannot be called empirically optimal without a preregistered outcome such as later CU membership, shares, loans or branch growth, validated out of sample.
- **Qualification gate:** a district or state needs at least one CU-relevant constituency sector with two-digit LODES location quotient at least 1.25, positive shift-share competitive shift, current and base employment above 500 jobs, and a County Business Patterns cross-check that does not contradict the high LQ (NAICS 92 is marked `not_covered`). Finance (NAICS 52) is excluded. Members that fail the gate get no score or rank.
- **Formula:** score = 100 × Σ(weight × tie-aware percentile), with percentiles computed separately among House-district and state markets. LQ(r,s) = (local sector jobs share) / (U.S. sector jobs share); LQ strength = max over sectors of ln(LQ / 1.25). Shift-share splits growth into national growth, industry mix and competitive shift, audits the identity current = base + national + mix + shift, and scores max over sectors of competitive shift / base jobs. Whitespace components use 1 minus the penetration percentile.
- **Missing evidence** takes a neutral 0.50 percentile and lowers `evidence_coverage` by that component's weight; incomplete CBP employer-size cells are scored as missing, not as complete lower bounds.
- **Structural companion score:** a separately labelled score residualizes only the two reach counts on employment, population, density, income, age, rent-to-income, LODES vintage and Census region; district models are estimable, state models are not, so senators keep the baseline score.
- **Ranks and tiers:** competition rank on the rounded score; tiers by final-score percentile (90th and above Exceptional, 70th to 90th Very High, 40th to 70th High, below 40th Qualified). Each rerun records an equal-weight and leave-one-component-out sensitivity audit. Changing a weight or formula needs a score-version change, updated tests, a regenerated bundle and a passing full audit.

### Version 3.0, credit-union footprint (default since 2026-09-16)

- Paul ruled on 2026-09-15 that "the footprint should be the potential" (members-section lane, Q7); brain decision D-035 (2026-09-16) records the redefinition as commit `73ebf18e6` on main.
- Weights: CU employment LQ 0.30, CU establishment LQ 0.20, CU branch share 0.25, CU deposit share 0.25, using unrounded LQ inputs; a market qualifies only at employment LQ ≥ 1.0. Higher current footprint scores higher, the opposite direction from the retired growth-room measure.
- The dial `DEMO_POTENTIAL` defaults to `footprint` (score version 3.0); `DEMO_POTENTIAL=growth_room` restores version 2.1. D-035 reverses only if Paul reverses after seeing the activated board, or rules that the gate should not restrict the scored population.

## Key Characteristics

- A market score, not a member-stance or causal claim; weights are policy choices in both versions.
- Fail-visible on missing data: neutral percentiles reduce a stated evidence coverage rather than hiding gaps.
- Version-locked: any weight or formula change is a new score version.

## Where it Applies

- [[melange-systems]] — the member desk's Demographic Potential label, score, tier and rank for each district and state market.
- [[2026-06-feature-melange-dashboard-ui-evolution-members-section-lane]] — the 2026-09-15 ruling that redefined the score as footprint, and the worked Davis case.

## Related Concepts

- [[four-pillar-percentile-blend]] — the rank blend; its `Demo%` input is a formula-backed, hand-edited workbook column that the `DEMO_POTENTIAL` dial alone does not move (D-035).
