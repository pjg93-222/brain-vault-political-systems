---
type: discussion
title: "Primacy diagnostic adopted (2026-09-20)"
aliases: ["CLASS_DOCK_PRESS_GRADE_ALL adoption", "PRIMACY_METHOD diagnostic_v1"]
date: 2026-09-20
summary: "Paul ratified the primacy diagnostic CLASS_DOCK_PRESS_GRADE_ALL with within-chamber seating on 2026-09-20: a beneficiary-weighted legislative grade and CU-weighted press from a fixed 7,413-item ledger; PRIMACY_METHOD=legacy rolls it back."
conclusions:
  - "Adopted arm: CLASS_DOCK_PRESS_GRADE_ALL with within-chamber seating; the extra uncertainty dock defaults to zero; shrinkage toward the roster baseline (anchor 15) stays."
  - "Press = signed CU-weighted intensity divided by all admitted statement intensity, from the fixed 7,413-item classified ledger (483 members)."
  - "Rollback = PRIMACY_METHOD=legacy plus a full-chain regeneration; changing only PRIMACY_BOARD is not this rollback."
  - "This promotes a mechanism, not an instruction to pin selected members to seats; no new member override was introduced."
action_items:
  - "Open methodological questions named at adoption: neutral and unclassified media coverage, association-article attribution, signed vote semantics, amendment treatment in the grade (owner: unassigned in the source)."
  - "A future press-corpus refresh needs a complete classified generation and review; it must not relabel new speech or turn missing labels into neutral evidence (owner: unassigned in the source)."
related_topics:
  - "[[2026-07-feature-primacy-and-industry-tier-boards-methodology-lane]]"
related_actors: []
related_people:
  - "paul-goff"
related_projects:
  - "[[melange-systems]]"
related_teams: []
source: "teach"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\docs\\primacy_diagnostic_20260920.md"
    sha256: "f414d09c64e78b5a992a6f4109e04d1fbd45db685d0d27f7006c05d19fca8d70"
    as_of: "2026-09-20"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\engine\\primacy_method.py"
    sha256: "6ff8c8d811aa029983fad6492bf7a8810009dfc14944d43a7809d40235e6d8e3"
    as_of: "2026-09-20"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/discussion", "domain/data"]
---

# Primacy diagnostic adopted (2026-09-20)

> On 2026-09-20 Paul ratified the primacy diagnostic arm CLASS_DOCK_PRESS_GRADE_ALL with within-chamber seating as the live primacy method, with a beneficiary-weighted legislative grade, CU-weighted press from a fixed classified ledger, and a one-variable rollback.

> [!info] Source and status
> Decision record `fec/docs/primacy_diagnostic_20260920.md` (69 lines), committed with the promotion in `fd740c4a0` (2026-09-20). The live code default agrees: `PRIMACY_METHOD` defaults to `diagnostic_v1` and accepts only `diagnostic_v1` or `legacy`. A search of the brain's DECISIONS.md on 2026-10-04 for CLASS_DOCK, diagnostic_v1 and PRIMACY_METHOD found no entry for this adoption.

## Context

The primacy methodology lane of 2026-09-19/20 compared rebuilt primacy methods against the live board ([[2026-07-feature-primacy-and-industry-tier-boards-methodology-lane]]). Paul chose the diagnostic arm twice ("I am rocking with the diagnostic") and then authorized "Lets commit it, regenerate, and keep going."

## Participants

| Person | Role |
|---|---|
| Paul Goff | owner; selected and ratified the arm |

## Conclusions

- **Legislative grade.** Contributions keep their routed sign, role weight and tensor multiplier, multiplied by beneficiary magnitude: CU-primary 1, shared 0.5, bank/crypto/fintech 0.15, off-topic 0, oppose 1 (a magnitude, because routed actions already carry a sign). Unclassified acts contribute zero and are counted in the grade receipt. Votes, annualization, the 80/20 legislative/press split, chamber normalization, evidence floors, the conduct cap and adjudicated credits keep their existing rules.
- **Press.** Signed CU-weighted intensity divided by all admitted statement intensity, with class weights CU-direct 1, shared 0.5, other-industry 0 and off-topic 0; numerator and denominator are rounded to nine decimals before division, the five-observed-item gate stays, and repeated source IDs keep separate occurrence IDs so admitted cross-posts are preserved.
- **Classified media input.** `fec/config/primacy_press_v1.ndjson` is the complete adopted historical vintage: 7,413 classified items covering 483 members, bound by an adjacent JSON receipt; the loader fails loudly on missing or invalid evidence. It is not a continuously refreshed corpus: association articles and cross-posts are included, there is no time decay, and new neutral or unclassified items are absent. `fec/tools/import_primacy_press.py` rebuilds the vintage and refuses to write unless every approved aggregate matches.
- **External comparison only.** ACU champion annotations are not a scoring input; Paul's judgment that Barr and Daines are not champions stays distinct from ACU's characterizations.
- **Verification.** On the frozen 2026-09-19 inputs, the producers reproduce all 533 approved seats, tiers and grade percentiles exactly, and the media ledger reproduces all 483 amended member aggregates. `PRIMACY_METHOD=legacy` reproduces both pre-change producer artifacts byte for byte and all 533 old seats.
- **Result.** Approved Tier 1 order: Padilla, Gonzalez, Waters, Fitzpatrick, Sherman, Vargas, Tim Scott, Timmons, Fitzgerald, Huizenga, Young Kim, Cramer, Ciscomani. Barr ranks 15 before the conduct rule and 38 after it; Daines ranks 29. Against the prior live board the diagnostic changes 511 board ranks and 29 tiers.

## Action Items

- [ ] Resolve the follow-up questions named at adoption: neutral and unclassified media coverage, association-article attribution, signed vote semantics and amendment treatment in the grade (owner: unassigned in the source).
- [ ] Any press-corpus refresh: build a complete classified generation and review it; never relabel new speech silently or turn missing labels into neutral evidence (owner: unassigned in the source).

## Related Projects

- [[melange-systems]]

## Related Topics

- [[2026-07-feature-primacy-and-industry-tier-boards-methodology-lane]] — the lane whose diagnostic this record ratifies; that note stops before the ratification.
