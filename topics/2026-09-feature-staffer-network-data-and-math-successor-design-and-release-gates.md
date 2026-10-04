---
type: topic
title: "Successor design: populations, data contracts and proposed release gates (09-08) (Staffer network data and math)"
aliases: ["Staffer network data and math: Successor design: populations, data contracts and proposed release gates (09-08)", "Staffer network implementation and evaluation framework"]
category: "feature"
status: "open"
people: []
actors: []
objective: "Record the 2026-09-08 successor design for the staffer network: source precedence, separate populations over shared identities, minimum data contracts, the two-dimension work-connection measure, the frozen evaluation protocol and the proposed (unmeasured) release gates."
created_at: 2026-09-08
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\STAFFER_NETWORK_IMPLEMENTATION_EVALUATION_FRAMEWORK_20260908.md"
    sha256: "496686c1b2da34cc3c91052cc32303c2c345d13f93be36ac2ceeac2b9273ebf4"
    as_of: "2026-09-19"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/open", "domain/data", "category/feature"]
part_of: "[[2026-09-feature-staffer-network-data-and-math]]"
---

# Successor design: populations, data contracts and proposed release gates (09-08) (Staffer network data and math)

> The 2026-09-08 successor design for the staffer network: Politico Pro and Quorum define the staffer population, LDA the lobbyist ecosystem, payroll is consulted only for a specific question, and release waits on frozen-holdout gates that are proposed, not measured. Part of [[2026-09-feature-staffer-network-data-and-math]] (project [[melange-systems]]).

> [!info] Source and status
> Summary of `STAFFER_NETWORK_IMPLEMENTATION_EVALUATION_FRAMEWORK_20260908.md` (repo root, dated 2026-09-08, committed 2026-09-19). Its own status line: candidate spine rebuilt and population-only evaluation completed; new identity and relationship adjudication and live release still pending. All gate thresholds are proposed engineering targets, not measured results.

## Scope and source precedence

- Politico and Quorum establish the staffer population; LDA establishes the lobbyist population in the ecosystem and never establishes staffer status; LittleSis supplies typed relationships and wider context.
- **Source precedence (confirmed 2026-09-08):** when Quorum and Politico disagree on a person's staff role, title or office, defer to verified Politico Pro content, keep Quorum as complementary evidence, and use payroll only for targeted reconciliation. A Politico value is a sourced profile claim, not proof of present-day employment or permission to merge ambiguous people; empty Politico profiles do not override substantive Quorum evidence.
- **Payroll only when needed:** a payroll evidence request needs a concrete question (same-name records, a missing career interval, a proposed office overlap, a specific missing connection), records its trigger and scope, and returns SUPPORTED, CONTRADICTED, UNRESOLVED or NO_RELEVANT_RECORD; a missing record is not proof of absence. Payroll people are never preloaded into either network.
- Success means fewer unsupported connections, recovered supported ones and explicit explanations for gaps; a smaller node count, higher degree or shorter route is not itself evidence of improvement.

## Target architecture

- One shared identity registry and dated affiliations feed separate projections: the operational staffer network, the lobbying and organizational ecosystem, an explicit cross-network route mode, bridge-only people and a reconciliation workspace.
- Interns do not count in the operational population, do not serve as route intermediaries during an internship, and contribute zero exposure, overlap, degree or ranking weight.
- Bridge admission needs an established identity, the relevant affiliations and at least one independently qualified connection to an admitted person; no recursive expansion from shared employer names.
- **Minimum data contracts** for source record, payroll evidence request, person, identity decision, organization or office, affiliation, relationship, population membership and graph build. Identity acceptance, fact acceptance, temporal eligibility and route eligibility stay separate fields, and merges are reversible with preserved IDs and split histories.
- **Two-dimension work connection:** proximity in work and time worked together, with diminishing returns and no recency decay. One shadow candidate, `work_score = 1 − exp(−effective_days / tau)` with `effective_days` summing interval days times proximity, is an evaluation candidate, not an implemented or calibrated change.

## Evaluation and proposed release gates

- A locked holdout is separated from development cases before tuning, split by person cluster; starting sizes are suggested (for example 300 accepted automatic identity decisions and 100 hard negatives). Two reviewers label independently, and insufficient evidence is NOT_EVALUATED, never PASS.
- Proposed gates include: 100% evidence conservation and population traceability; zero intern-derived weight; automatic identity precision with a one-sided 95% lower bound of at least 99%; identity recovery at least 90%; container correctness lower bound at least 95%; qualified tie precision lower bound at least 95% per enabled class; zero temporal-integrity violations; and no unexplained p95 latency or peak-memory regression above 20%. Thresholds are frozen before the holdout opens and are not lowered to pass a failed candidate.
- Four builds are compared on the same inputs (baseline, population separation, identity and container cleanup, full candidate) to separate scope effects from real identity or relationship gains.
- Release is an atomic manifest switch with the previous manifest retained; a critical identity collision, unexplained evidence loss, invalid temporal edge, stale assertion or policy mismatch blocks the candidate and rolls back a live release.
- First increment: Phase 0, an inventory and tie-origin audit with 50 high-degree and 50 sparse review profiles. The framework itself creates no recurring job.

## Related

- [[staffer-live-sidecar]] — the live router and sidecar whose consumers this design would re-scope; the design records that the live router defaulted `include_review` to true at the time.
- [[2026-08-29-politico-pro-access-and-permission-rulings]] — the 2026-08-29 rulings that govern acquiring Politico Pro directory data, the source this design prefers for staff role, title and office.
