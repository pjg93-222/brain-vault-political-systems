---
type: topic
title: "Staffer network data and math"
aliases: ["Staffer network data and math"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "staffer-live-sidecar"
objective: "Build and govern the staffer network (Hill payroll staffers, LDA lobbyists, Politico/Quorum people) as its own social network beneath members: employment-tenure adjudication, overlap-only edges, SNA math verdicts, name standard + spine re-key, Groups tab, co-tenure clique fix, v7 spine / v6 social network repoint and ship."
created_at: 2026-09-01
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-sorting-lane-2026-09-06.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-sorting-lane-2026-09-06.md", sha256: "59d8e0e9c17be38d759d7b3adac2f37fc990e0f2ab771975a7d5972360ad61c1"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-v7-repoint-closeout-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-v7-repoint-closeout-2026-09-07.md", sha256: "299e256856bbd4d2bf756793a88257e1bbc757d745f84c50ae070b74982e9cfe"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-cotenure-clique-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-cotenure-clique-2026-09-07.md", sha256: "2a33b944e2600e4a49aa955fceafdd731640da42df8bd4eaab06f4dcf369606d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-stale-imports-lane-2026-09-06.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-stale-imports-lane-2026-09-06.md", sha256: "32bc3515bc60d580863a93fd6f95be81c391a6fd8d65acd0fb316301491ab104"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-sna-math-audit-2026-09-05.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-sna-math-audit-2026-09-05.md", sha256: "6d85597eeff785b3841b064b182b26e7235e5f728509cc33604f91a8766cccd4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-network-employment-tenure-adjudication-2026-09-01.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-network-employment-tenure-adjudication-2026-09-01.md", sha256: "43992b1f71f2752d5422eab92d3f9fbdc31dd34ca0ee42b44a2523615abc8183"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-social-network-architecture-2026-09-03.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-social-network-architecture-2026-09-03.md", sha256: "369fa550046b0fc885dc8b5d86333520a61f5299769f1aa252812e68ccd9d586"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-social-network-overlap-rule-2026-09-03.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-social-network-overlap-rule-2026-09-03.md", sha256: "de5f13a314b7571f09b00e67d11f208a1cc67e2cb78e5a6786d8d896c8aa34d4"}
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# Staffer network data and math

> Rolling record of the staffer-network lane of [[melange-systems]] from the 2026-09-01 employment-tenure adjudication to the 2026-09-08 ship of the v6 social network on the v7 re-keyed spine. Edge rule: [[concurrent-service-overlap-edge-rule]]; architecture ruling: Staffer network architecture and overlap rule; nine sorting rulings: [[2026-09-06-staffer-sorting-rulings]]; the live service: Staffer live sidecar.

## Parts

- [[2026-09-feature-staffer-network-data-and-math-tenure-adjudication-and-architecture]] — The employment-tenure data adjudication of 2026-09-01 to 09-03, from the verdict and Paul's rulings to the play queue and the authoritative coverage metric, with the architecture and overlap rulings carried into the lane.
- [[2026-09-feature-staffer-network-data-and-math-sorting-lane]] — The staffer sorting lane of 2026-09-06 to 09-08: its rulings, the facts established, the stage plan and the dated state log through the shipped and committed lane.
- [[2026-09-feature-staffer-network-data-and-math-sna-math-and-clique-lane]] — The SNA math audit of 2026-09-05 and the co-tenure clique lane of 2026-09-07 with its shipping state, the groups-role defect, the open producer findings and the move tables.
- [[2026-09-feature-staffer-network-data-and-math-stale-imports-and-v7-spine]] — The stale-imports lane of 2026-09-06 and the closeout of the v6-to-v7 spine repoint on 2026-09-07.
- [[2026-09-feature-staffer-network-data-and-math-duration-ranking-and-v8-cutover]] — The staffer co-tenure ranking contract implemented and released on 2026-09-08: each overlap day counted once, edge mass split across workplaces by days supplied, shared-role cells damped rather than dropped, intern pools excluded, and the v8 graph cut over live.
- [[2026-09-feature-staffer-network-data-and-math-successor-design-and-release-gates]] — The 2026-09-08 successor design for the staffer network: Politico Pro and Quorum define the staffer population, LDA the lobbyist ecosystem, payroll is consulted only for a specific question, and release waits on frozen-holdout gates that are proposed, not measured.

## Context

- Scope: the staffer network is "one giant ant colony" (Paul): each member is its own station, staffers are nested in and between the stations, lobbyists are outsiders navigating by who they know best. The staffer network is its OWN social network a layer BELOW congress members; members are attachment points only; the ~535-node cosponsorship/media member graph stays independent and untouched. See Staffer network architecture and overlap rule.
- Only person-person edge rule: OVERLAP (concurrent service in the same container). See [[concurrent-service-overlap-edge-rule]].
- State on 2026-09-01 (evening): the staffer-network build (26 modules in `fec/staffer_network/`, 70 schemas, 72 scripts + ~1.5 GB of generations in `audits/staffer_network/`, 150+ reviews in `data/staffer_network/reviews/`, off-repo store `C:\Users\pgoff\AppData\Local\Melange\staffer_network\`) existed ONLY as untracked files in the live tree on main; no branch carried it (only the two 08-29 design/metrics docs are committed, on `claude/melange-data-expansion-958236`). Single-disk exposure the mirror does not cover. The design/metrics docs in Downloads are the v3 revisions dated 2026-08-31 despite their `20260829` filenames. (Later census, 2026-09-07: the store was 24.8 GB / 315 dirs, not 1.5 GB; see the registry in [[2026-09-feature-staffer-network-data-and-math-sorting-lane]].)
- Standing laws that bound the lane: nothing canonical, every row REVIEW_REQUIRED, promotion counters pinned 0, no dial freeze, no publication without Paul (`ask-before-substantive-changes`); NO git for agents until the 2026-09-06 lane-scoped lift; verify existence claims with a second method (`verify-dont-infer-completion-2026-08-04`); universal lane laws (`universal-lane-laws-2026-08-09`).
- Related memories (plain text, not vault entities): `staffer-sorting-lane-2026-09-06`, `staffer-v7-repoint-closeout-2026-09-07`, `staffer-cotenure-clique-2026-09-07`, `staffer-stale-imports-lane-2026-09-06`, `staffer-sna-math-audit-2026-09-05`, `staffer-network-employment-tenure-adjudication-2026-09-01`, `staffer-social-network-architecture-2026-09-03`, `staffer-social-network-overlap-rule-2026-09-03`, `staffer-network-redesign-2026-09-05`, `staffer-live-sidecar-2026-09-04`, `staffer-dashboard-section-lane-2026-09-04`, `backup-coverage-gap-2026-09-07`, `contact-inference-extraction-lane-2026-08-28`, `lobbying-member-link-is-circular-2026-08-19`, `no-git-plain-review-2026-09-01`, `live-tree-branch-state-2026-07-14`, `desk-media-footprint-2026-07-16`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| Staffer live sidecar | Local sidecar on 127.0.0.1:8841: people-only staffer graph, Dijkstra office routes, self-healing identity loop; Codex-built. |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[concurrent-service-overlap-edge-rule]] - Staffer social-network edge rule: a person-person edge needs real concurrent service in one container; sequence is trajectory, not an edge.

## Related Discussions

- Staffer network architecture and overlap rule - Paul's 2026-09-03 ant-colony ruling: staffer network = own social network beneath members; member graph kept; OVERLAP is the only edge rule.
- [[2026-09-06-staffer-sorting-rulings]] - Paul's nine 2026-09-06 staffer sorting rulings: name standard + spine re-key, Groups tab, LDA plain labels, git lifted for this lane.

## History

| Date | Event |
|---|---|
| 2026-09-01 (evening) | Fable adjudication of the employment-tenure data: lane untracked in live tree; v5 promotion prototype ruled NOT CANONICAL; Meta LOOP BLOCKED stands (E1-E7); T-1..T-7 decision menu handed to Paul. Session `b4908000-b7b6-4df6-92e9-96e07c3b29bc`. |
| 2026-09-01 (evening) | Confirmation ladder measured ("are you sure we cannot extract more confirmations, even partial?"): YES; doc `STAFFER_NETWORK_CONFIRMATION_LADDER_20260901.md`. Paul's directive (other session): NO git from the assistant or agents; plain review, not adversarial. |
| 2026-09-01 ~23:50 ET | Paul rules T-8 (tiered sidecar) approved, exploratory tier too (T-9); tier enters edge weight and eigenvector. Build run id `run-20260902T035500000000Z-t1e4d5c8`. |
| 2026-09-02 ~00:30 ET | Paul's source directive: three source families (expenditure reports, LDA, Personal Financial Disclosures); SOD archive "track and hunt"; Kiley 2025Q2 gold fixture. |
| 2026-09-02 ~01:10 ET | Paul: "Continue, lets get this shit all connected." = build the CONNECTION SPINE (Part C). |
| 2026-09-02 ~02:40 ET | Rate-limit wall (Sonnet + Opus session limit, resets 5:50am ET); Part A v1 sidecar, Part B code, Bright Data collector done; Part A v2, Part C architect, SOD workflow killed mid-flight. |
| 2026-09-02 | Built and verified: sidecar v1+v2, exploratory temporal tier v1, House personnel ledger v1, SOD census 67/67 periods. Identity ruling ("Split the same-name collisions apart..."). Paul's pending design task recorded (layering design reminder). Standing authorisation to work toward 95% coverage. |
| 2026-09-03 | Coverage metric + ceiling (RCR; hard cap 80.03%; 95% unattainable from corpora on disk). Paul's ant-colony architecture + OVERLAP rule rulings. |
| 2026-09-05 | SNA math audit: where v4 lives, payroll IN / LDA BLOCKED / Politico marginal, math verdicts M1-M7, pathfinder options; record `audits/STAFFER_NETWORK_SNA_AUDIT_2026-09-05.md` + `_APPENDIX.md`. |
| 2026-09-06 | Stale-imports lane (42 findings / 21 sites / 15 files): LIVE fixed by a different session at 15:54:07; regression suite applied at Paul's gate; lane CLOSED. |
| 2026-09-06 | Paul answers Q1-Q9 (sorting rulings; git lifted for this lane). Stage plan 0-6 of record. Brain D-018..D-022 written. |
| 2026-09-07 ~01:00 ET | Stage 0 done (Paul ran `delete_inactive_generations.py --execute`: 81 dirs / 8.78 GB deleted); name standard landed; Claude process exit killed three builders. |
| 2026-09-07 ~03:30-05:15 ET | Gold scored; name standard v1.1 rulings; v7 primary PASS; sidecar people index narrowed; social builder v6 built; foreign writer in live tree. |
| 2026-09-07 | Paul, on staffer views: "the number of people some people have served alongside seems ridiculous." Co-tenure clique lane (54 admin containers = 70.8% of pairs); rulings relabel/exclude admin/exclude SHARED EMPLOYEE; relabel + SHARED EMPLOYEE exclusion go LIVE ~05:16-05:18 local. |
| 2026-09-07 ~07:00 ET | Second process exit; foreign writer resolved = Paul's other session (clique lane). |
| 2026-09-07 ~15:40 ET | Third process exit (box also slept 09:52Z to 19:00Z); Paul's organisation rulings. |
| 2026-09-07 ~17:00 ET | v7 spine DONE (twin byte-identical, verifier 46/46). Sidecar v3 DONE 17:11 ET. D-023 (LDA employment) built. |
| 2026-09-07 ~19:00 ET | Social v6 DONE + VERIFIED; D-023 client half normalised (41,203 clients in 3,892,167 B). |
| 2026-09-07 | Commit `86750d822` closes v6-to-v7 spine repoint; fixed `repin_staffer_live.py` default (v5 generation that never existed). |
| 2026-09-08 ~03:40 ET | LANE SHIPPED AND COMMITTED: `86750d822`, `fccb993d4`, `57f993316`; sidecar 8841 DOWN after v6 repoint (diagnosis corrected the same day: loader never taught the two-artifact contract). |

## Decisions

- Own network beneath members, member graph kept, no member-member edges here, no `Â` import into staffer weights (Paul, 2026-09-03). See Staffer network architecture and overlap rule.
- OVERLAP is the only person-person edge rule; sequence is trajectory (Paul, 2026-09-03). See [[concurrent-service-overlap-edge-rule]].
- v5 promotion prototype NOT CANONICAL; keep it as an immutable prototype (recommended T-1); Paul 2026-09-06 Q8: "keep v5 pinned as exploratory until an org-quarantined v6 exists" (v6 now exists; v6 repointed as the default).
- T-8 tiered sidecar and T-9 exploratory tier APPROVED (Paul, 2026-09-01 ~23:50 ET); confirmation tier is an edge-weight strength factor; tier strengths are UNTESTED DIALS {L2 .25, L3 .50, L4 .75, L5 1.0; R0 .25, R1 .50, R2 1.0} with +/-50% sweep; S_STRENGTH 0.75/0.5/0.25 UNTESTED_DEFAULTS_PENDING_FREEZE.
- Education dropped (Paul 2026-09-03); `w_edu` kept at alpha=0.
- Identity ruling (Paul, 2026-09-02): a name is an identity only within an office; day-level service dates are the discriminator, not quarter overlap.
- Standing authorisation 2026-09-02 (late): keep building candidate-plane generations toward 95% of the reachable set without pausing; does NOT authorise canonical promotion. Superseded in effect by the 2026-09-03 measurement that 95% is unattainable from the corpora on disk (hard cap 80.03%).
- Nine sorting rulings 2026-09-06: see [[2026-09-06-staffer-sorting-rulings]].
- ~~No git from the assistant or agents~~ (Paul 2026-09-01) - superseded for this lane 2026-09-06 by "Commit" (ruling 6): code/tests/docs committed after verification; NEVER generation directories or the AppData store; kept because it explains why the whole build was untracked.
- Co-tenure clique rulings 2026-09-07: relabel, exclude 54 admin containers, exclude SHARED EMPLOYEE from top_staff. See [[concurrent-service-overlap-edge-rule]].
- Paul 2026-09-07 on admin exclusion rebuild: WAIT for the v7 spine to be verified and COORDINATE with the sorting lane before starting (the ~90 min primary+twin rebuild). HELD, then done in v6.
- Paul's organisation rulings 2026-09-07 (verbatim): "For the filer, you do what is chronologically the most recent"; "If it appears they are contract/mercenary they are tied to all those organizations as clients". Recorded as D-023.
- Paul ruled the 272 Senate prose divergences STAY divergent (office column "Charles Schumer", move tables "SENATOR CHARLES SCHUMER" / "INTERN COMPENSATION - SCHUMER").
- Paul ruled office label = MOST RECENT office/committee, payroll precedence then Politico.
- NORMALIZATION, never thresholding Paul's ruling away (client table, 41,203 clients).
- Brain decisions D-018..D-022 written 2026-09-06 (commit `c474563`); D-023 LDA employment ruling built 2026-09-07.

## Next Steps

- [ ] Paul: T-2 (I-4 gold owner = D-Q5), D-Q3 dial freeze, T-1 v5 disposition, T-3/T-4, D-Q2 LegiStorm licence (the decision that actually moves coverage), D-Q1 Politico crawl.
- [ ] Paul: register `fec/surfaces/test_repin_staffer_live.py` in `fec/tests/run_tests.py` (change control; still OPEN).
- [ ] Paul: LDA lobbyist names on the static page; `decay` and `container_size_normalisation` (`pending_rulings`, applied nowhere).
- [ ] Paul: Recycle Bin / `LIVE\backups\` (44.6 GB) decision; raise sidecar task priority to Normal.
- [ ] Settle `OFFICE OF CONGRESSIONAL ACCESSIBILITY SERVICES` catch-all (3,373 people) against one Report-of-the-Secretary period's page headers.
- [ ] Fix or decide the two producer findings (groups-binding strictness at `build_staffer_network_section.py:1613-1626`; `revolving_layer` zero fixture coverage).
- [ ] Open items from the v7 closeout: `audits/staffer_network/test_finish_staffer_social_network_chain.py:82-83` pins v6 spine under a foreign `C:\melange\` root; `generation_registry_20260906.{json,md}` still names v6 ACTIVE / newest_of_family and predates v7.
- [ ] Pathfinder first build (option A) and the pathfinder edge definition (concurrent-only vs any-time) await Paul's ruling.
- [ ] Remind Paul to design the layering of the networks once data collection is done (staffers nested underneath and in-between members).
- [ ] Bright Data collector: needs Paul's key and `gd_` dataset ids (`GET https://api.brightdata.com/datasets/list`) plus a ruling on LinkedIn as a source.

## Contradictions and corrections recorded in the sources

- ~~Sidecar `identity_basis` is a dead field~~ (2026-09-06) - corrected 2026-09-07: it IS assigned at `staffer_live_service.py:352`.
- ~~"Employer not on file" for R0~~ - corrected: R0 has a registrant, not corroborated; every lobbyist gets "Employer on file: <registrant>".
- ~~Coverage 46.9%~~ (2026-09-02) - superseded 2026-09-03: raw 56.87%, floor-corrected 52.03%, hard cap 80.03%.
- ~~Interns/detailees never appear on a disbursement line~~ - false: 46.7% of House people carry an INTERN title; real effect is a 2019 era break (5.91% -> 29.40%).
- ~~11,713 career-move candidates carried collision risk~~ - overstated: real split set is 23 of 60,136.
- ~~Part A max_tier misdiagnosis~~ - the real bug was Part B's assumption.
- ~~Exclusion counter predicted 2,713~~ - actual 3,559 (different quantity).
- ~~8841 sidecar coverage invariant broken~~ (2026-09-08 first diagnosis) - wrong: the v6 repoint broke the loader contract (groups artifact); invariant is sound.
- ~~8841 DOWN~~ (census) - false negative: UP since 08:48Z, ready 09:29Z.
- ~~v7 spine / `backups\` NOT FOUND~~ (scout, twice) - false negative.
- ~~Admin exclusion not live~~ (2026-09-07, clique lane) - applied in social v6 (verified 2026-09-07 ~19:00 ET), shipped 2026-09-08.
- ~~Store ~1.5 GB of generations~~ (2026-09-01) - the registry census found 24.8 GB / 315 dirs; AppData store separately 17.3 GB.
