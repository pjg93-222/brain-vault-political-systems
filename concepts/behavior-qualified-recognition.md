---
type: concept
name: "Behavior-qualified recognition (rank honors)"
aliases: ["Rank honors", "field_rank_honors_v1"]
description: "Recognition labels: rule-G field honors from signed accepted actions (default since 2026-09-16) and a primacy-board standing whose top 13 with qualifying action hold the Champion crown; desk and dashboard show the analytic overall band."
related_to:
  - "[[2026-06-feature-melange-dashboard-ui-evolution-members-section-lane]]"
  - "[[2026-07-feature-primacy-and-industry-tier-boards-primacy-factor-drift-crown]]"
  - "[[melange-systems]]"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\stance\\RANK_HONORS.md"
    sha256: "c993a5a3477e8d57d7d4e0bc686335d84e1809b0c0bd0b83e5bd6e0101a383cd"
    as_of: "2026-09-18"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\stance\\rank_honors_policy.py"
    sha256: "1468fb31bd2c1bf2d3f0c9120ac0711298f1057d7b90b88ad90b901cfcedbfbb"
    as_of: "2026-09-16"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\stance\\build_rank_honors.py"
    sha256: "66dea2215141b1a9fbea27cc865e5dee23c649c5be258b8a190ef4fe55bb5f3e"
    as_of: "2026-09-17"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\stance\\overall_stance_policy.py"
    sha256: "3b6f54b9722a92eeed17fa8d50955a32e543ce538289fe786fbddb569b614a32"
    as_of: "2026-09-16"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\DECISIONS.md"
    sha256: "a2a92dbf985cf4a1e430f00c77e21b7f6635039be55ee77bf4bd5c6888fa9aec"
    as_of: "2026-10-04"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/concept", "domain/research"]
---

# Behavior-qualified recognition (rank honors)

> How Melange awards its recognition labels from recorded behaviour: field honors from signed accepted actions in each policy field, and an overall standing on the active primacy board whose top 13 members with a qualifying action hold the Champion crown; since 2026-09-16 the desk and dashboard show the analytic overall band below that crown.

> [!info] Source and status
> Summary of `fec/stance/RANK_HONORS.md` (added 2026-09-16 in `296f40e2b`, last changed 2026-09-18 in `11a34e215`). Its award rules predate rule G: commit `e3e5ece7c` (2026-09-16, later the same day) made rule G the default field ladder, and the doc was not updated for it. The rule-G section below comes from the code and brain decision D-031.

## Description

Two policies govern the labels: `field_rank_honors_v1` for each policy field and `overall_primacy_standing_v2` for the overall label on the existing primacy board. Both policies, the canonical evidence and every member record live in an immutable generation under `data/stance/rank_honors/<generation_id>/`, and `active.json` selects the current generation and binds the hashes of its three JSON files.

**Field honors (doc wording).** Only members with an accepted action in a field form that field's cohort. Accepted actions are source-reconciled sponsorship, original cosponsorship, cosponsorship, accepted letters, explicit neutral legislative records and actual final-passage Yea/Nay votes in Congresses 117 to 119; media mentions and inferred stances are not actions. The ranking value is the raw signed action sum (direction × role weight × Congress decay) with sponsor, original cosponsor and cosponsor weighted 3/2/1, votes 1, and Congress 119/118/117 decayed 1/0.8/0.64, with no percentile or min-max normalization. Ties on that value break on the raw signed CU tensor sum only when every tied member has full tensor coverage. Cumulative cutoffs are floor(5% × N) for Champion, floor(15% × N) for Ally and floor(20% × N) for Highly Persuadable; a whole residual tie must fit inside a cutoff, so small cohorts can leave awards unfilled.

**Rule G (default field ladder since 2026-09-16).** `HONORS_LADDER` defaults to `g`, which adds a ladder on top of the base policy: Persuadable to 50% and Lean Persuadable to 100% of the positive sub-cohort; Opponent 5%, Highly Skeptical 15%, Skeptic 30% and Lean Skeptic 100% of the negative sub-cohort; True Neutral for a zero record; "Defender" as the top label in the three defend fields (Interchange, Credit Card Mandates, CU Tax Status). It also changes the score to a signed per-service-year rate from 2021-01-03 (service years floored at 0.5 and capped at 6) without Congress decay, and weights votes 0.4. D-031 records the intent: one ladder on every surface, a label only where evidence exists, and scarce top bands.

**Overall standing (doc wording).** The existing primacy board stays the only overall order, with its Tier 1/2/3 memberships and ranks. Overall Champion is exactly the first 13 members of the active board, each with qualifying action evidence; a missing action stops publication. Positive bands are cumulative on board rank (Ally top 15%, Highly Persuadable 20%, Persuadable 50%, Lean Persuadable 75%) and need qualifying supportive action. Below them an observed member is Uncommitted unless there is opposition evidence; neutral-only records are True Neutral, and no recorded action is Insufficient evidence. Adverse-leadership evidence caps a rank-based label: core adverse sponsorship on at least two measures across at least two Congresses gives Opponent, at least two core adverse leadership measures in one Congress gives Highly Skeptical, one core adverse sponsorship or two core adverse measures gives Skeptic, and other opposing action with a nonpositive balance or primacy below the top 50% gives Lean Skeptic. No names, parties or member overrides enter these rules, and a Champion with severe opposition blocks publication. Since `e3e5ece7c` (2026-09-16; brain D-031) the dashboard and member desk display the analytic overall band instead (`OVERALL_LABEL=analytic`, the default; `legacy` restores this standing); only the Champion crown comes from the board, and this rank-based standing stays in the generation for audit and in the workbook's Overall Standing sheet.

**Contracts and rollback.** Public recognition is kept separate from the observed action record, and a low rank never implies opposition; older analytical stance values stay unchanged as model inputs. Excel shows Field Recognition, Recognition Detail and Overall Standing; dashboard, desk and combined HTML must carry one matching generation marker. Before a managed workbook update, `honors_workbook.py --prepare-model-update` reverts the publication; since 2026-09-18 the binding owns only its three sheets and two hidden label columns, so unrelated workbook edits no longer block it (`HONORS_WORKBOOK_SCOPE=legacy` restores the old whole-file rule). `HONORS_MODE=legacy` rebuilds with the legacy projections.

## Key Characteristics

- Labels come from accepted actions; silence never earns a label and missing tensor values are never zero.
- The overall order is the primacy board's order; recognition never creates a second ranking.
- Ties are kept as ties; cutoffs never split a tie.
- Every publication is an immutable, hash-bound generation with a rollback path.

## Where it Applies

- [[melange-systems]] — the dashboard `honors` and `overall_honors` records, the member desk and the three recognition sheets of the workbook.
- [[2026-06-feature-melange-dashboard-ui-evolution-members-section-lane]] — the lane that ruled one coherent ladder (2026-09-15), landed rule G and fixed the honors workbook binding (2026-09-18).
- [[2026-07-feature-primacy-and-industry-tier-boards-primacy-factor-drift-crown]] — the 2026-08-09 champion crown law (a crowned overall Champion is never shown as a threat); this policy now decides who holds the crown: the active board's top 13 with qualifying action.
