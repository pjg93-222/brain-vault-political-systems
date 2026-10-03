---
type: concept
name: "Concurrent-service overlap edge rule"
aliases: ["OVERLAP rule"]
description: "OVERLAP is the only person-to-person edge rule of the staffer social network: no edge without actual temporal overlap in the same container; career sequence is trajectory; payroll-container co-tenure is a clique degree, not co-work."
related_to:
  - "[[2026-09-03-staffer-network-architecture]]"
  - "[[2026-09-feature-staffer-network-data-and-math]]"
  - "[[staffer-live-sidecar]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-cotenure-clique-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-cotenure-clique-2026-09-07.md", sha256: "2a33b944e2600e4a49aa955fceafdd731640da42df8bd4eaab06f4dcf369606d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-social-network-overlap-rule-2026-09-03.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-social-network-overlap-rule-2026-09-03.md", sha256: "de5f13a314b7571f09b00e67d11f208a1cc67e2cb78e5a6786d8d896c8aa34d4"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/concept", "domain/data"]
---

# Concurrent-service overlap edge rule

> In the staffer social network a person-to-person edge exists only when two people actually served at the same time in the same container; sequence (A then B) is a trajectory property, never an edge.

## Description

Rule of record (Paul, 2026-09-03, emphatic and repeated: "REMEMBER, OVERLAP"; stored as a `feedback` memory, `staffer-social-network-overlap-rule-2026-09-03`): in the staffer social network, **a person-to-person edge requires actual temporal overlap in the same container.** It sits inside the architecture ruled the same day (staffer network = its own social network a layer beneath members; see [[2026-09-03-staffer-network-architecture]]) and is carried through the build lane in [[2026-09-feature-staffer-network-data-and-math]].

- **Concurrent co-tenure IS the edge, and it is the strong one.** Paul's words: "if they are working together at the same time, they are pretty close; that's an immediate connection." Weight = guaranteed overlap duration x container proximity kappa (design section 6.2): same personal office 1.00, committee same side 0.75, side unknown 0.60, opposite side 0.40, leadership 0.75, admin/officer 0.50.
- **Non-overlapping same-office pairs get NO edge.** If A left in 2015 and B arrived in 2018 they never met. That is not a weak tie, it is not a tie.
- **Sequence is a property of a person's TRAJECTORY, not a person-person edge.** Person p served office A then office B: real data, kept, emitted as ordered stints plus derived directed office-to-office moves. It is the institutional pathway (Paul's "tunnel" in his ant-colony framing), never a claim that two strangers know each other.

**Why:** emitting edges for non-overlapping same-office pairs fabricates relationships that never existed and inflates density enormously: every office becomes a clique across its entire history, producing a graph that looks rich and is fiction.

**How to apply:** union intervals before intersection (duplicate payroll rows and overlapping quarterly observations must not inflate co-tenure; union shared calendars again across containers so simultaneous multi-office assignments do not double count). Always report the count of same-office pairs REJECTED for zero overlap; if that count is zero, the overlap test is not firing. Alumni who never overlapped may be connected in reality via introductions, but that is an INFERENCE and belongs only in a separate exploratory tier, never merged with observed edges (the same discipline that keeps predicted employment out of `employment_episodes`).

## Key Characteristics

- Edge predicate = same container + intersecting (half-open) printed payroll intervals; three independent date tests implement it (`build_staffer_social_network.py:1183-1186`, `employment_history.py:1965-1968`, `staffer_routing.py:230-232`); zero null dates in all 204,700 stints.
- Firing evidence (v5 era): 16,001,459 of 31,139,699 candidate pairs rejected for zero overlap (51.4%); 12,498,349 GUARANTEED co-tenure pairs kept; 2,639,891 POSSIBLE_ONLY (cores never intersect).
- Observed edges only; inferred introductions live in a separate exploratory tier.
- The edge weight is a strength factor tiered by corroboration level where a tier applies (UNTESTED dials; see the topic).

## Not the same as "co-work": the co-tenure clique finding (2026-09-07)

Paul, looking at the staffer views on 2026-09-07: "the number of people some people have served alongside seems ridiculous." He was right, and the magnitude was worse than the complaint. This is a separate memory (`staffer-cotenure-clique-2026-09-07`, session `aedc11fe-f89e-41f3-8ca0-94624e7186db`, Paul's OTHER session, the origin of the "foreign writer" in the live tree seen by the sorting lane).

**What the number is.** `co_tenure_degree`, rendered as "People served alongside" (`make_staffer_network_html_00.tpl:105`, filled `:218`, tooltip `:315`) and as `total_coworkers` in the 8841 sidecar, is a CLIQUE DEGREE over payroll containers. Two people get an edge if their printed payroll intervals intersect under the same office header. No size normalization, no team, no reporting line, no proximity. `build_staffer_network_section.py:568-579` only COPIES it from the node-scores artifact; the clique is written at `audits/staffer_network/build_staffer_social_network.py:1150` (`np.triu_indices(n,1)`) and `fec/staffer_network/employment_history.py:2117-2124` (`combinations(people,2)`).

**The overlap rule is NOT the bug; it fires correctly.** 16,001,459 of 31,139,699 candidate pairs rejected (51.4%); three independent date tests; zero null dates in all 204,700 stints. The overlap rule is honoured in LETTER. Its own rationale ("turns every office into a clique") is realised anyway WITHIN eras, because the container unit reaches 3,373 people.

**The actual defect: 54 `admin` containers carry 70.8% of every pair.** CAO of the House (2,551 people, 5,357,401 pairs), Office of Congressional Accessibility Services (3,373 / 3,164,184), Sergeant at Arms Senate (2,059 / 1,502,611), Clerk of the House (1,118 / 465,019). Pairs by kind: admin 70.8%, member_office 18.3%, committee 10.1%, leadership 0.8%. Pearson(degree, largest office size - 1) = **0.8694**. Nine of the top ten people owe their figure entirely to the SGT@ARMS family or Accessibility Services.

**Verification method that settled it (reuse this):** recompute the degree independently from `staffer_trajectories.ndjson.gz` using only "same container_id + half-open interval intersection". It reproduced the shipped value EXACTLY for 455/600 sampled people, Pearson 1.0000, residuals all stated <= recomputed (the recount is a strict superset because it skips the ACCEPTED/ACTIVE gates). Arithmetic proof: sum of co_tenure_degree over 144,693 nodes = 24,996,698 = 2 x 12,498,349 guaranteed pairs, exact to the unit.

**Distribution.** median 54, mean 172.8, p90 317, p99 2,283, max 4,321; 7,026 people >= 1,000. ON SCREEN across 533 member pages: 7,723 cells, median 193, **20.1% >= 1,000**, 415 of 533 pages carry a >= 1,000 cell, 287 carry >= 2,000. The median is defensible; the TAIL is not, and the tables sort by the tail so it lands at the top of every page.

**Second defect found the same way.** `SHARED EMPLOYEE` fills 2,686 of 7,723 Top-staff cells (34.8%) from only 359 people, median 1,064 coworkers; **360 of 515 member pages are topped by one**. thomas e anfinson is attached to 78 member offices at 4,321. Distinct from the known-wrong `top_staff` PageRank key (`staffer-sna-math-audit-2026-09-05`): even a correct key ranks a 78-office shared employee above a chief of staff.

**Paul's rulings 2026-09-07:**
1. RELABEL: the figure must state concurrent presence on the same payroll office, with container name and size beside it ("People served alongside").
2. EXCLUDE the 54 `admin` containers from the co-tenure layer (`CO_TENURE_KINDS` gate already exists at `employment_history.py:2106`; mirror at `build_staffer_social_network.py:1194` where `c_kind[cid]` is in scope).
3. EXCLUDE `SHARED EMPLOYEE` from `top_staff`: they stay in the graph, out of the ranking.

**Open, needs a source check:** `OFFICE OF CONGRESSIONAL ACCESSIBILITY SERVICES` holds 3,373 distinct people, 2,902 single-office, vs a real office of ~10 staff. Interval structure is internally consistent, so it is not a date bug; it looks like a catch-all bucket in the Senate SOD parse. Alone = 18.1% of all pairs. Settle by diffing parsed container assignment against the source Report-of-the-Secretary page headers for one semiannual period.

**Two smaller real bugs, independent:** (a) 2,639,891 `POSSIBLE_ONLY` edges (cores never intersect) are emitted with `layer:"co_tenure"` and read back by `staffer_graph_snapshot.py:241-245` with NO status filter, contradicting the overlap rule downstream; fix = filter `status=="GUARANTEED"` at the snapshot read. (b) 48,897 of 72,266 REPORT_PERIOD stints (67.7%) span longer than `periods_observed x 182.5` days; 672 bridge >1,000 days; worst 4,567 days from 4 observations (SENATOR SHELDON WHITEHOUSE); fix = make a stint the union of observed periods, not min-to-max.

Follow-through facts (shipping state, the v6 rebuild where admin exclusion took v5's 12,498,349 guaranteed pairs to 4,660,388, and the later landing of each fix) are recorded in [[2026-09-feature-staffer-network-data-and-math]].

## Where it Applies

- [[staffer-live-sidecar]] - Local sidecar on 127.0.0.1:8841: people-only staffer graph, Dijkstra office routes, self-healing identity loop; Codex-built.
- [[2026-09-feature-staffer-network-data-and-math]] - Staffer network lane 2026-09-01..08: adjudication, architecture, math audit, sorting rulings, clique fix, v7 spine and v6 ship.
- [[2026-09-03-staffer-network-architecture]] - Paul's 2026-09-03 ant-colony ruling: staffer network = own social network beneath members; member graph kept; OVERLAP is the only edge rule.

## Related notes

- Architecture this sits inside: [[2026-09-03-staffer-network-architecture]]; build lane and full state: [[2026-09-feature-staffer-network-data-and-math]]; the live service that implements the date tests in routing: [[staffer-live-sidecar]].
- Lane state memory of origin: `staffer-network-employment-tenure-adjudication-2026-09-01`.
