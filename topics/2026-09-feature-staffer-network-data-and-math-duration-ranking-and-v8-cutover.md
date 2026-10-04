---
type: topic
title: "Duration-attributed ranking math and the v8 cutover (09-08) (Staffer network data and math)"
aliases: ["Staffer network data and math: Duration-attributed ranking math and the v8 cutover (09-08)", "staffer-ranking-duration-v1"]
category: "feature"
status: "completed"
people: []
actors: []
objective: "Record the staffer co-tenure ranking contract implemented and released on 2026-09-08 (duration attribution, shared-role damping, intern-pool exclusion, ranking and tie rules), its verification, and what replaced parts of it on 2026-09-10."
created_at: 2026-09-08
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\audits\\staffer_ranking_math_20260908\\STAFFER_SOCIAL_NETWORK_MATH_20260908.md"
    sha256: "1b12a6c31b224199052cd924651742ffa1ddce3e8d38f5d28f8d7ffe348f24f9"
    as_of: "2026-09-08"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\audits\\staffer_ranking_math_20260910\\IMPLEMENTATION_REPORT.md"
    sha256: "7b0550f83ab79ec29080ebd131fd91c04b58fba2fc1122cd20fa6ba69afe0aae"
    as_of: "2026-09-19"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/completed", "domain/data", "category/feature"]
part_of: "[[2026-09-feature-staffer-network-data-and-math]]"
---

# Duration-attributed ranking math and the v8 cutover (09-08) (Staffer network data and math)

> The staffer co-tenure ranking contract implemented and released on 2026-09-08: each overlap day counted once, edge mass split across workplaces by days supplied, shared-role cells damped rather than dropped, intern pools excluded, and the v8 graph cut over live. Part of [[2026-09-feature-staffer-network-data-and-math]] (project [[melange-systems]]).

> [!info] Source and status
> Summary of `audits/staffer_ranking_math_20260908/STAFFER_SOCIAL_NETWORK_MATH_20260908.md`, lines 1-112 (the 2026-09-08 implementation) and its recovered pre-implementation audit, section 6 (Paul's rulings of 2026-09-08). Names of individual staffers in that audit are left out here. Part of this contract was revised on 2026-09-10 (last section).

## Paul's rulings that drove it (2026-09-08, binding on the lane)

- **R-1** `office_diversity` becomes days-proportional ("The time matters more than the breadth, remember we are thinking about connections"): an equal split per container had inflated a 3-day detail 375× against a 3,000-day tenure; 98,539 edges (2.1144%) were affected.
- **R-2** the tie-break becomes relative to the outreach (origin, candidate and target), because `co_tenure_degree` had broken 0 of 612 PageRank ties and the hash `node_id` decided list membership.
- **R-3** the 244 `INTERN COMPENSATION - <SENATOR>` payroll headers are excluded from the co-tenure operator.
- **R-4** the shared-employee and intern-pool exclusions extend to the global bridge list.
- **R-5** shared-employee edges are damped as a soft cap, not deleted, with the parameter chosen on measured evidence. The audit had found 99 of the top 100 by PageRank had held a SHARED EMPLOYEE title, against 1.06% of the 130,273 scored people.

## The contract (staffer-social-network-v5-duration-attributed / staffer-ranking-duration-v1)

- `D_ij` = days in the union of guaranteed overlap calendars across workplaces, so each calendar day counts once; the edge weight is `w_ij = kappa_max × min(S_i, S_j) × (1 − exp(−D_ij / 365.2425)) × A_ij`.
- Shared-role damping: `q = 0.05` in a workplace where either endpoint holds an exact shared-role title (`SHARED EMPLOYEE`, `SHARED EMPLOYEE (OTHER COMPENSATION)`), else 1; `A_ij` is the day-weighted mean of `q`. Five percent was the largest tested factor below a provisional concentration criterion of 20 shared-role people in the top 100 (it gave 18); the value stays an exploratory default, and it is not a cap on a person's total strength.
- Attribution: `f_ijc = d_ijc q_ijc / Σ_h d_ijh q_ijh` splits an edge's mass across workplaces without duplicating days; office strength `T_ic = Σ_j w_ij f_ijc`, and the diversity index is `B_i = (1 − Σ_c m_ic²) / (1 − 1/K)` with `m_ic = T_ic / s_i`.
- Admin containers and intern-compensation headers supply no scored co-tenure support; people and their records stay. No time-since-service decay, container-size normalization or new identity merge was introduced.
- Correction to the earlier audit: an isolate's PageRank is `(1 − α) / (N − α z)`, not `1/N`.
- Ranking: member lists by published PageRank, then member connection strength; bridges need positive connections to at least two eligible member workplaces and rank by strength beyond the strongest member office; ties stay explicit (`rank_tie_size`). `staffer_outreach_ranking.py` breaks equal PageRank by summed leg distances with edge cost `1/w`; the 8841 router kept its own objective.

## Results and verification

- Controlled comparison on the unchanged v7 spine: all 144,690 person IDs conserved, 4,546,099 positive edges, 120,993 people with positive co-tenure, 9,280 new isolates from pool exclusion, 13 of the original top 100 retained, Spearman 0.866294 over 130,273 previously scored people.
- Released v8 graph on `hill_personnel_spine_20260908_v8_primary`: primary and independent twin PASS with zero failures; 144,692 people, 23,699 isolates, 18 shared-role people in the top 100.
- Published section: 533 members, 7,675 ranked rows, 25 bridges; 888 rows carry tie metadata; 5,393,487 bytes, within the 6 MB limit.
- Guarded switch on port 8841 completed with `ready=true`; the broad `audit_full.py` stayed at 554 passed and 15 failed, classified in `audit_failure_classification.json`.

## Superseded in part on 2026-09-10 (newest wins)

`audits/staffer_ranking_math_20260910/IMPLEMENTATION_REPORT.md` (dated 2026-09-10, committed 2026-09-19) revised the connection-ranking model: fewer connections inferred from large workplaces, stronger House discounting of shared employment (shared-role q 0.02 House, 0.05 Senate), and static member lists sorted by direct office-anchor strength times a bounded member-context modifier from member eigenvector centrality. Global staff PageRank became a diagnostic, and the active Staffer UI requests the `work_time` model `staffer-closeness-exposure-v1`. The PageRank-first member-list order above is therefore the 2026-09-08 state.

## Related

- [[concurrent-service-overlap-edge-rule]] — the edge rule this math builds on; the 2026-09-07 shared-employee exclusion from `top_staff` became damping here.
- [[2026-09-08-staffer-spine-identity-adjudication]] — the v8 spine decision whose verified generation this graph was rebuilt on.
