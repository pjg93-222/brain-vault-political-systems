---
type: topic
title: "SNA math audit and the co-tenure clique lane (09-05 to 09-07) (Staffer network data and math)"
aliases: ["Staffer network data and math: SNA math audit and the co-tenure clique lane (09-05 to 09-07)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-09-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-09-feature-staffer-network-data-and-math]]"
---

# SNA math audit and the co-tenure clique lane (09-05 to 09-07) (Staffer network data and math)

> The SNA math audit of 2026-09-05 and the co-tenure clique lane of 2026-09-07 with its shipping state, the groups-role defect, the open producer findings and the move tables. Part of [[2026-09-feature-staffer-network-data-and-math]] (project [[melange-systems]]).

## SNA math audit (Paul, 2026-09-05)

Source memory `staffer-sna-math-audit-2026-09-05` (session `94a84f69-a79e-4cc7-ad96-f361d543f7b8`). Paul, 2026-09-05, after seeing variant C: "I still want the pathfinder and social network analysis. How are we incorporating all the LDA and payroll data into this? Where is the Social Network? Also look over the math for it." Then: "Once done with the audit, create a markdown." Record: `audits/STAFFER_NETWORK_SNA_AUDIT_2026-09-05.md` + `_APPENDIX.md` (worktree `melange-dashboard-fixes-83c994`; four-agent read-only workflow, edge file never opened).

**Facts worth not re-deriving**

- **Where:** `audits/staffer_network/staffer_social_network_20260903_v4_primary/` (edges 1,516,576,940 B; node scores 20 MB; 148,334 nodes; 12,498,349 guaranteed co-tenure edges; 16,001,459 zero-overlap pairs rejected of 31,139,699 candidates). The builder on disk (`cb6319c7…`) postdates the v4 receipt (`41b49d16…`); delta = the Politico review-layer overlay. The dashboard section shows per-member summaries only; no graph, no path, no names.
- **Data:** House payroll 68 quarters 2009Q3-2026Q2 + Senate 30 half-years 2011-04..2026-03 make every person and every co-tenure edge. LDA enters ONLY as 5,999 office->registrant revolving edges + 1,772 nameless org nodes; employment "NOT ESTABLISHED for any of the 25,340 sealed LDA identities" (adjudication 09-01), gates E1/E2/E3 OPEN, v5 NOT CANONICAL. Politico = 11,525 person->policy-area edges (1,677 persons); employment, committee, education records are v5 review overlays with `operator_included: False`. Members = attachment points only (1,589 member-office containers), zero member-member edges by ruling.
- **Math verdicts** (ranked by lobbyist impact):
  - M1: `top_staff` ranked by PageRank(0.85) whose kind-balanced teleport gives 36 policy nodes the same restart mass as 144,693 persons -> persons with a Politico policy edge average 11.6x the pagerank of the rest (66/100 top persons carry one) = WRONG as a ranking key.
  - M2: edge predicate SOUND (0/2,000 mismatches) but no container-size normalization (largest container 3,373; max degree 4,321; intern pools kappa 1.0 form cliques).
  - M3: no time decay (design section 6.3 half-life 12y never implemented; w_lower saturates after ~3 years).
  - M4: `bridging_diversity` = Simpson index over node KINDS, three values on persons -> mislabeled.
  - M5: eigenvector per-component-normalized, incomparable; tolerance 1e-9 > 101,672/144,693 values.
  - M6: S_STRENGTH 0.75/0.5/0.25 UNTESTED_DEFAULTS_PENDING_FREEZE and the +/-50% sweep cannot test it (uniform scale cancels).
  - M7: layer balancing gives 16k policy+revolving edges parity with 12.5M co-tenure edges.
- **Pathfinder:** exists ONLY in the 8841 sidecar (`fec/surfaces/staffer_routing.py`, "A*" with heuristic 0 = Dijkstra over persons, hop costs 1/3/2/5/8, loads only the first 10,000 co-tenure edge rows, enumerates tenure neighbours from `by_employer`). Member-network RELINK/MOPBD* is a different layer. Options A/B/C sizes: office-level graph 106,337 office pairs = 1.40 MB JSON / 366 KB gzip; per-person top-5 ~ 10.1 MB JSON. Recommended first build: option A, office-level Dijkstra in the page over CONCURRENT shared-people edges (needs one pass over the 1.5 GB edge file), no names; pushes the section past the 5 MB cap -> Paul's ruling.
- **Open rulings (Paul only):** T-1..T-7, D-Q3 dial freeze, name policy, section size cap, v5 repoint, every edge-weighting choice, and the pathfinder edge definition (concurrent-only vs any-time).

**Why:** the network's headline rankings are currently an artefact of the teleport design and the Politico directory, and LDA is not in the graph at all despite the plan's wording; a later session must not present "Top staff" or LDA coverage as established.

**How to apply:** before any SNA surface work, read the record's section 3 and get Paul's picks on the ranking key, decay, size normalization and the pathfinder edge definition; never claim LDA employment is in the network until E1-E3 close. Related memories: `staffer-network-redesign-2026-09-05`, `ask-before-substantive-changes`.

(Later effect: v6 replaced `ranking_controls` with `policy_link_pagerank_control`, inflation 11.6x -> 1.74x, and `office_diversity` replaced `bridging_diversity`; decay and container-size normalisation stayed `pending_rulings`.)

## Co-tenure clique lane (Paul, 2026-09-07)

Source memory `staffer-cotenure-clique-2026-09-07` (session `aedc11fe-f89e-41f3-8ca0-94624e7186db`, Paul's other session). Analysis, distribution, defects and the three rulings are written out in [[concurrent-service-overlap-edge-rule]] (Paul: "the number of people some people have served alongside seems ridiculous"; `co_tenure_degree` is a clique degree; 54 `admin` containers carry 70.8% of pairs; CAO of the House 2,551 people / 5,357,401 pairs, Congressional Accessibility Services 3,373 / 3,164,184, Sergeant at Arms Senate 2,059 / 1,502,611, Clerk of the House 1,118 / 465,019; Pearson 0.8694; median 54, mean 172.8, p90 317, p99 2,283, max 4,321; SHARED EMPLOYEE fills 2,686 of 7,723 Top-staff cells; rulings relabel / exclude admin / exclude SHARED EMPLOYEE from top_staff; open check on the Accessibility Services catch-all; bugs: POSSIBLE_ONLY edges unfiltered at `staffer_graph_snapshot.py:241-245`, REPORT_PERIOD stints 48,897 of 72,266 (67.7%) too long). Shipping and follow-up facts continue here.

### Shipping state at the end of the 2026-09-07 session

- **LIVE on the page** (producers run 05:16-05:18, all exit 0; `ranks_python.json` sha256 UNCHANGED `05FCC893...5B87`): the relabel (0 "served alongside" left on the staffer surface; new wording byte-identical in `staffer-network.html` and the `#app-staffer` embed) and the SHARED EMPLOYEE exclusion (0 of 7,720 top_staff rows carry an excluded title). `staffer-network.html` 4,432,226 -> 4,462,648 B; `Moneyball.html` 80,412,705 -> 80,443,127 B. Sidecar relabel live too, served sha256 == disk sha256.
- **COUNT CORRECTION:** the exclusion counter reads **3,559**, not the 2,713 predicted. Different quantities: 2,713 = SHARED EMPLOYEE cells VISIBLE in the old capped top-15 lists; 3,559 = every attached person dropped from the RANKING POOL. 3,559 recomputed independently from `staffer_trajectories.ndjson.gz` (exact; per-member spot checks match). 3,507 `SHARED EMPLOYEE` + 52 `(OTHER COMPENSATION)`, 701 distinct people. `SHARED EMPLOYEE/SCHEDULER` (1 stint) correctly RETAINED (different title).
- **DO NOT "FIX" THESE:** `Moneyball.html` legitimately contains ~13 "served alongside" and 9 "coworkers" hits inside the desk member payload: CREC floor speeches and Bluesky posts (John Lewis condolences, Afghan interpreters, radiation-exposure bills). Corpus text, not UI. Also KEEP the sidecar label `Include coworkers you confirmed`: it refers to Paul's OWN asserted relationships, where "coworkers" is the honest word.
- **Preview constraint learned the hard way:** never hand Paul an 80 MB Moneyball.html copy to look at (four such mockups crashed his browser 2026-09-07); `cu-member-desk-profiles.js` is 61.5 MB of the 80 MB. Preview from `Moneyball Dashboard.html` (2.96 MB) or `staffer-network.html` (4.43 MB). Localhost preview links may not reach him if he is on another device: confirm, or send files directly.
- **ADMIN EXCLUSION NOT LIVE at that time.** Code applied, needs the ~90 min (primary + twin) network rebuild. Paul 2026-09-07 ruled: WAIT for the v7 spine to be verified, and COORDINATE with the staffer sorting lane before starting. HELD. (Then built into social v6, verified 2026-09-07 ~19:00 ET and shipped 2026-09-08: co-tenure GUARANTEED 12,498,349 -> 4,660,388.)
- **BLOCKERS CLEARED by the sorting lane's own work (verified 09-07):** `bridging_diversity_exploratory` is out of `required`; `DIVERSITY_FIELDS` shim picks whichever field is present, fail-closed if neither; `office_revolving_edge_count` returns an HONEST LABELLED NULL under v6 (`has_container_rows` recorded as fact, not inferred from a zero), though it never renders on the page in either generation; layer-filename renames have ZERO stale readers repo-wide; the spine id map is NOT needed on the v6 path (both bridge receipts bind the v6 spine, on-disk hashes verified identical).
- **NEW BLOCKER (one string), later FIXED:** `build_staffer_network_section.py:1113` looked up receipt role `'staffer_social_groups'` (the filename stem); the builder emits `'groups'` (`build_staffer_social_network.py:3350`). On a v6 rebuild the groups file was silently unbound and `meta.co_tenure_office_size_source` published the FALSE claim that the file is absent. Sibling `build_staffer_groups_section.py:174` has it right (`GROUPS_ROLE = 'groups'`).
- **TRAPS for any future rebuild:** `GENERATION` still pinned to v5 at `build_staffer_network_section.py:79` (a bare run silently rebuilds the OLD generation: always pass `--generation`). The chain runner `finish_staffer_social_network_chain.py:437-442` hard-codes `_v5`/`_v4` output names and passes a v3 `--config-name`, so it would MISLABEL a v6 build: use the manual sequence. The builder's bare `--hill-spine-root` default now points at the UNVERIFIED `hill_personnel_spine_20260907_v7_primary` (appeared 15:48 on 09-07, no twin, no verification at that time): always pass it explicitly. `verify_staffer_social_network.py:880-881` currently fails `grouping_layer_missing` against EVERY generation on disk, so verification of a new build is untested (at that time).
- **SHELL OPTION A** (one shell header) applied to `fec/surfaces/make_combined.py` ONLY; the four templates are untouched, because `_product_header()` builds SIX pages and only `lobby-network.html` merges, so stripping it would strand five pages; and four kernel suites pin that chrome as one-way-trap guards. Standalone pages keep their own navigation. Backups + pre/post hashes in `backups\shell_option_a_20260907\`. Of the three sticky headers, only `#app-member thead th` actually sticks to the viewport; offsetting the industry ones pushed that header 78 px down and bought nothing.

### Groups-role defect and the test that agreed with it (fixed 2026-09-07)

`build_staffer_network_section.py:1614` looked the groups layer up by receipt role `'staffer_social_groups'` (the FILENAME STEM). The builder emits role `'groups'` (`build_staffer_social_network.py:3350`, `file_specs` -> `receipt["files"]`); the filename is a separate field. FIXED. Sibling `build_staffer_groups_section.py:174` always had it right.

**The real lesson: the test agreed with the bug.** `test_staffer_network_section.py`'s shared `make_tree()` helper minted the fixture receipt entry with the SAME wrong role, so block `[i4]` ("groups file takes priority over the fallback") passed for its whole life without ever exercising the contract. Proof it was vacuous: after fixing the fixture, `[i4]` FAILS against the buggy producer, where it used to pass. This is DE-012 one layer up: fixture and producer drew the wrong string from the same assumption, so the check could not fail. Blast radius was small: `make_tree` has 15 call sites, only 2 pass `groups=`. A status diff of all 210 assertions showed exactly 4 changes. With `groups=None` no entry is minted at all, so the v5-fallback greens in `[a]`/`[h]`/`[i]` were always honest. Final: **210 passed, 0 failed.** Two independent guards on the contract now (`[i4]` + `[m]`).

**Method worth reusing:** to prove a negative control, temporarily reinstall the OLD buggy producer under a fail-closed hash protocol, re-run, restore, and re-verify the hash at every step. Both agents did this; it is the difference between demonstrating a control and asserting one.

**A role-string audit was run across the builder/producer boundary: `groups` was the ONLY mismatch.** `staffer_social_node_scores`, `staffer_trajectories`, `staffer_office_moves`, `staffer_social_edges`, `revolving_layer`, `staffer_social_politico_review_layers` all agree, as does every filename constant.

### Two open producer findings (not fixed, Paul's call)

(a) **The groups binding is weaker than its siblings.** `build_staffer_network_section.py:1613-1626` binds with `'bound_against': ['generation_receipt.files']` only. The Politico (`:507-520`) and revolving (`:526-539`) layers additionally assert `declared['path'] == <filename constant>` AND cross-check `verification_receipt.primary_file_integrity`'s independently recomputed sha256. So a receipt naming any other filename under role `groups` is accepted silently, the independent hash is never consulted, and `groups_spec['path']` goes verbatim into `os.path.join(binding['base'],...)` so a `..` path escapes base. Low practical risk (the receipt is hash-bound upstream via `twin_byte_identity`) but `bind_inputs`' docstring at `:417` promises "every consumed byte is bound to both receipts" and that is false for this artifact.

(b) **`revolving_layer` has ZERO fixture coverage.** No fixture mints that role, so the binding branch and `read_revolving_layer()` are structurally unreachable in tests; `[i]`'s `office_revolving_edge_count` assertions exercise the FALLBACK, not the layer. That code was written by the sorting lane on 2026-09-07 at 18:24: new, untested, same defect class as the groups bug.

### Move tables + office label (shipped 2026-09-07)

Office label = MOST RECENT office/committee, payroll precedence then Politico (Paul's ruling), adopting the sidecar's own rule `staffer_connection_facts.latest_roles()` (newest `core_end_exclusive`, dated evidence only). Agreement 6,296/6,296 against that function. **Politico fires ZERO times**: all 6,296 published people have dated payroll; there are no Politico-without-payroll cases. Latest-end vs current-flag-first are IDENTICAL for all 6,296 (a current stint always carries max end date); latest-end vs latest-start differ for 277. Office column: 7,711 of 7,720 named, 9 honest absence, **0 raw container ids (was 1,247)**. Move tables: 1,483 of 1,514 named, 31 "Office name not in the records" (all vacant-seat headers). Verified by EXECUTING the shipped `containerLabel()` under Node against each page's own payload, not by grepping. Headroom 40,340 -> 26,433 B on the 5,000,000 cap; cap NOT raised. PAUL RULED: the 272 Senate prose divergences STAY divergent (office column "Charles Schumer", move tables "SENATOR CHARLES SCHUMER" / "INTERN COMPENSATION - SCHUMER"): one senator holds several payroll containers and collapsing them would make distinct move rows read identically. KNOWN: hovering a move row still shows the raw container_id in `title=` as provenance, matching the top-staff tooltip convention (`p.node_id`). Left deliberately.

Related memories of the clique lane: `staffer-social-network-overlap-rule-2026-09-03`, `staffer-sna-math-audit-2026-09-05`, `staffer-network-employment-tenure-adjudication-2026-09-01`, `staffer-social-network-architecture-2026-09-03`, `staffer-live-sidecar-2026-09-04`, `desk-media-footprint-2026-07-16`.

## Related Topics

- [[2026-09-feature-staffer-network-data-and-math-sorting-lane]] — The staffer sorting lane of 2026-09-06 to 09-08: its rulings, the facts established, the stage plan and the dated state log through the shipped and committed lane.
