---
type: discussion
title: "Staffer network architecture and overlap rule"
aliases: ["Staffer network architecture and overlap rule"]
date: 2026-09-03
summary: "Paul's ant-colony architecture: the staffer network is its own social network a layer beneath members (the cosponsorship/media member graph stays independent and is KEPT), no member-member edges here, no cosponsorship Â imported into staffer weights, education dropped, and OVERLAP (concurrent service) is the only person-person edge rule."
conclusions:
  - "The staffer network is its own social network, a layer BELOW congress members; members are attachment points, not nodes; no member-member edges are computed here."
  - "The ~535-node member graphs built on cosponsorship and media references stay independent and untouched (KEEP THIS x2)."
  - "Do not import the cosponsorship adjacency Â into staffer weights (design 6.4 w_x); layers combine at analysis time in the multiplex."
  - "Education dropped: keep w_edu in code at alpha=0; C-8b stops being a blocker; D-Q3 and I-4 still gate arming."
  - "exploratory_temporal_tier_20260902_v1 IS this architecture; its defect is population (fed from the LDA sidecar, not payroll); rebuild over the full payroll population."
  - "PARTIAL_NULL eigenvector is probably diagnostic of fragmentation: compute centrality per connected component and report component sizes."
  - "OVERLAP is the edge rule: no person-person edge without concurrent service in the same container; sequence is trajectory, not friendship."
action_items:
  - "Rebuild the exploratory temporal tier over the full payroll population (done later as social network v4..v6; see the topic)."
  - "Compute eigenvector centrality per connected component and report component sizes."
  - "Keep w_edu in code at alpha=0 rather than deleting."
related_topics:
  - "[[2026-09-feature-staffer-network-data-and-math]]"
related_actors:
  - "[[staffer-live-sidecar]]"
related_people:
  - "[[paul-goff]]"
related_projects:
  - "[[melange-systems]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-social-network-architecture-2026-09-03.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-social-network-architecture-2026-09-03.md", sha256: "369fa550046b0fc885dc8b5d86333520a61f5299769f1aa252812e68ccd9d586"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-social-network-overlap-rule-2026-09-03.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-social-network-overlap-rule-2026-09-03.md", sha256: "de5f13a314b7571f09b00e67d11f208a1cc67e2cb78e5a6786d8d896c8aa34d4"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/discussion", "domain/data"]
---

# Staffer network architecture and overlap rule

> Paul's 2026-09-03 rulings: the staffer network is its own social network a layer beneath congress members (an ant colony), the member graph is kept independent, and OVERLAP (concurrent service) is the only person-person edge rule.

## Context

Paul's rulings, 2026-09-03, on the staffer network shape (stored as memories `staffer-social-network-architecture-2026-09-03`, type project, session `42c66666-074f-4037-b357-bdaedfd31eb1`, and `staffer-social-network-overlap-rule-2026-09-03`, type feedback, same session). Guiding docs: `STAFFER_NETWORK_EXPANSION_DESIGN_20260829.md` and `STAFFER_NETWORK_METRICS_20260829.md` (both in Downloads; dated 2026-08-31 revisions of 2026-08-29 drafts). The lane these rulings feed is [[2026-09-feature-staffer-network-data-and-math]] in the project [[melange-systems]]; the live service that later serves the network is [[staffer-live-sidecar]].

**The metaphor, his words:** one giant ant colony. Each member is its own station. Staffers are nested in and between the stations. Lobbyists are outsiders entering the colony, navigating by who they know best.

**Final architecture ruling** (reached after two intermediate framings were discarded): the staffer network is **its own social network, a layer BELOW congress members**. NOT a member-member projection. Members are attachment points for staffer nodes, not nodes in this graph. No member-member edges are computed here.

## Participants

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Discussed Actors

| Actor | Context |
|---|---|
| [[staffer-live-sidecar]] | Local sidecar on 127.0.0.1:8841: people-only staffer graph, Dijkstra office routes, self-healing identity loop; Codex-built. |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Topics

- [[2026-09-feature-staffer-network-data-and-math]] - Staffer network lane 2026-09-01..08: adjudication, architecture, math audit, sorting rulings, clique fix, v7 spine and v6 ship.

## Related Concepts

- [[concurrent-service-overlap-edge-rule]] - Staffer social-network edge rule: a person-person edge needs real concurrent service in one container; sequence is trajectory, not an edge.

## Conclusions

1. **Own network, beneath members.** As above; members are attachment points only.
2. **"KEEP THIS" x2: the congress layer stays independent and untouched.** The ~535-node member graphs built on cosponsorship (published CU config, plus holistic BASE/AUG/NBASE/NORM and the bank_reg/crypto diagnostics) remain as they are. Cosponsor and media references are *central* to his model. The "wrong tie" framing was the assistant's own error: bills are a legitimate tie, just a different one from people.
3. **Do not import `Â` into staffer weights. Design §6.4's** `w_x = kappa_x * Â(m_i,m_j) * O^gamma * delta(Delta)` would multiply the cosponsorship adjacency into staffer edges, double-counting it (cosponsorship is already its own layer) and contaminating the D-Q7 comparability bar, since the two graphs would then correlate by construction. Same failure class as the LD-2 circularity. Layers combine at ANALYSIS time in the multiplex, not inside each other's weights.
4. **Education: dropped.** Paul: "Fuck the education, if we have it, nice cherry on top." Keep `w_edu` in code at alpha=0 rather than deleting, so it slots back if Politico profiles are ever crawled. C-8b stops being a blocker; D-Q3 (dial freeze) and I-4 (gold set) still gate arming.
5. **OVERLAP is the edge rule** ("REMEMBER, OVERLAP", emphatic and repeated). Rule detail, weights, why and how-to-apply: [[concurrent-service-overlap-edge-rule]]. Summary: a person-to-person edge requires actual temporal overlap in the same container; concurrent co-tenure is the strong edge ("if they are working together at the same time, they are pretty close; that's an immediate connection"), weighted by guaranteed overlap duration x container proximity kappa (same personal office 1.00, committee same side 0.75, side unknown 0.60, opposite side 0.40, leadership 0.75, admin/officer 0.50); non-overlapping same-office pairs get NO edge (A left 2015, B arrived 2018: never met; not a weak tie, not a tie); sequence is trajectory (ordered stints plus derived directed office-to-office moves; Paul's "tunnel"), never a person-person claim. Why: edges for non-overlapping pairs fabricate relationships and make every office a clique across its whole history. How: union intervals before intersection, union shared calendars again across containers, always report the count of same-office pairs REJECTED for zero overlap (zero = the test is not firing), alumni connections by introduction are inference and belong only in a separate exploratory tier, never merged with observed edges.

## What already exists

`exploratory_temporal_tier_20260902_v1` IS this architecture: 14,415 person nodes, 73,268 weighted time-scoped edges, layers `co_tenure` / `revolving` / `membership`, verification PASS. Its defect is POPULATION, not design: it was fed from the LDA-corroborated sidecar (18,206 person-office records), never from payroll, so it covers ~1/10 of the people held (House ledger 77,666; spine 141,241). Rebuilding it over the full payroll population is the work.

## PARTIAL_NULL is probably diagnostic

Eigenvector centrality is marked PARTIAL_NULL at tiers L3/L4 while L2 converged. PageRank always converges (damping); eigenvector does not on a disconnected or reducible graph. So non-convergence likely signals FRAGMENTATION, not an iteration limit. Fix by computing centrality per connected component and reporting component sizes, which also answers "how many separate colonies are there".

## Action Items

- [ ] Rebuild the temporal tier over the full payroll population (owner: assistant; later realised as the v4/v5/v6 social network builds, see the topic)
- [ ] Compute eigenvector centrality per connected component and report component sizes (owner: assistant)
- [ ] Keep `w_edu` in code at alpha=0 rather than deleting it (owner: assistant)

## Related lane state

Lane state memory: `staffer-network-employment-tenure-adjudication-2026-09-01` (carried in the topic).
