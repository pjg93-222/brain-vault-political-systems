---
type: discussion
title: "Staffer spine identity adjudication (2026-09-08)"
aliases: ["Staffer spine v8 adjudication", "Spine identity v8 ruling"]
date: 2026-09-08
summary: "The 2026-09-08 adjudication, on Paul's instruction, of the staffer spine identity audit: bounded name repairs plus a fail-closed merge guard instead of automatic merging; title matches are review candidates only; v8 spine verified 50/50."
conclusions:
  - "Adopt bounded name repairs plus a fail-closed merge guard; the Senate title rule only yields source-linked review candidates and is not extended across chambers."
  - "Missing service dates never authorize a same-office, same-period variant merge (either chamber); day-disjoint House merges stay allowed."
  - "Consumers join on generation-scoped person IDs and exact source rows, never on name_key."
  - "The audit's 37,684 of 144,690 records on shared name keys is not an error rate; automatic title-based merges and canonical promotions: 0 and 0."
action_items:
  - "Graph scores must be rebuilt on v8, never copied or summed through an ID map (owner: the concurrent ranking task, per the record). Done 2026-09-08: the v8 graph was rebuilt and cut over."
  - "Residual title-only identities, suffix conflicts and suspect parses stay in their review queues (owner: unassigned in the source)."
related_topics:
  - "[[2026-09-feature-staffer-network-data-and-math-stale-imports-and-v7-spine]]"
  - "[[2026-09-feature-staffer-network-data-and-math-duration-ranking-and-v8-cutover]]"
related_actors: []
related_people:
  - "paul-goff"
related_projects:
  - "[[melange-systems]]"
related_teams: []
source: "teach"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\audits\\STAFFER_SPINE_IDENTITY_ADJUDICATION_2026-09-08.md"
    sha256: "5558e8b6646e8526b9abf20a99465cd37578399c48c28748bf82c85a3672e3fb"
    as_of: "2026-09-08"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\DECISIONS.md"
    sha256: "ae67fa84e2d8fb05364ce264b4c9e5a3c31bec5c1c9f6620229ddf08c7f21f34"
    as_of: "2026-10-05"
updated_at: 2026-10-05
updated_by: "preserve@agent"
tags: ["type/discussion", "domain/data"]
---

# Staffer spine identity adjudication (2026-09-08)

> The 2026-09-08 adjudication, made on Paul's instruction, of the staffer payroll spine's identity audit: repair two observed name-header forms and two name particles, block merges that missing dates cannot support, and keep title coincidences as review candidates; the resulting v8 spine passed independent verification.

> [!info] Source and status
> Decision record `audits/STAFFER_SPINE_IDENTITY_ADJUDICATION_2026-09-08.md` (status COMPLETE), which supersedes the recommendation of the same day's DECISION and AUDIT documents without editing them. The brain records it as D-024 (2026-09-08, ACTIVE), adopted by Codex on Paul's explicit instruction. Names of individual staffers in the record's examples are left out here.

## Context

Paul asked for the two 2026-09-08 spine documents (an identity decision and an audit) to be examined, their recommendations adjudicated, the most accurate corpus/spine approach implemented, and the result committed. The audit had proposed automatic merging (its options A+B); the adjudication found no independently labelled identity set or precision measurement that validates that general rule. Brain D-020 requires evidence for cross-office identity, and D-019 governs employment overlap separately.

## Participants

| Person | Role |
|---|---|
| Paul Goff | requested the adjudication; owner |

## Conclusions

- **Decision.** Bounded name repairs plus a fail-closed merge guard. The proposed Senate title rule generates source-linked review candidates, not mergers, and is not extended across chambers; the House cross-office rule and uncertain-date semantics stay, and a candidate identity link never creates service dates or a co-tenure edge.
- **Claims adjudicated.** "26.05% of the v7 spine is incorrectly split" is rejected as an error rate: it counts 37,684 of 144,690 records sharing 16,151 name keys. "No people are incorrectly merged" is not established. Missing dates do not authorize same-office variant merges. Identical annotated Senate titles are candidate evidence only, and the review queue groups exact title strings within their own report period. Two observed header prefixes (`SENATE STEERING COMMITTEE`, `OF THE SENATE`) and the DE LOS / DE LAS particles are repaired; conflicting suffixes are emitted for review, not split automatically; joins on `name_key` are rejected.
- **Implementation.** Name standard 1.2 keeps raw strings; builder and independent verifier both block `same_period_variant_no_day_dates`; `rebuild_spine_identity.py` rebuilds primary and twin v8 from the audited, hash-checked inputs. The v7-to-v8 relation allows multiple targets, so such a source ID needs a source-row lookup. Generated directories stay local and uncommitted (D-022).
- **Verification.** Independent verification 50 of 50 PASS with seven byte-identical primary/twin files; 144,692 v8 records, 204,699 office spans, all 1,351,415 admitted observations conserved; 144,647 v7 IDs unchanged, 41 rekeyed, 2 split into two targets each; 3,605 Senate title review groups; 57 suffix-conflict and 87 name-parse review records; 7,712 native Politico IDs checked with none missing.
- **Handoff to ranking.** The graph's Politico bridge was bound to v6, so its rebuild uses the direct v6-to-v8 map (144,693 rows); consumers holding merged v7 IDs use the split-aware v7 map. No live graph or surface selector changed with this identity release.

## Action Items

- [x] Rebuild graph weights and ranks on v8 and never copy or sum old scores through either map (owner: the concurrent ranking task, per the record). Done 2026-09-08: see [[2026-09-feature-staffer-network-data-and-math-duration-ranking-and-v8-cutover]].
- [ ] Keep residual title-only identities, suffix conflicts and suspect parses in their review queues (owner: unassigned in the source).

## Related Projects

- [[melange-systems]]

## Related Topics

- [[2026-09-feature-staffer-network-data-and-math-stale-imports-and-v7-spine]] — the v7 spine that this ruling replaced with v8.
- [[2026-09-feature-staffer-network-data-and-math-duration-ranking-and-v8-cutover]] — the ranking math rebuilt on the v8 spine and cut over the same day.
