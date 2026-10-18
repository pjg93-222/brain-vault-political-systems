---
type: topic
title: "Cosponsor and sector networks"
aliases: ["Cosponsor and sector networks"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[lobbyview-collector]]"
  - "[[melange-dashboard]]"
objective: "Build and govern the network layer of the Moneyball/Melange model: the 3-phase co-sponsor network enhancement plan (success-weighted edges, signed coalitions, influence-maximization allocation), the requested layer toggles and signed cross-media reference layer, the NET_CONFIG networks (cu, holistic, holistic_norm, bank_reg, crypto; fintech dropped), the member personal-relationships model, and the finding that the lobbied-member link is circular."
created_at: 2026-06-26
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/member-relationships-lane-review-2026-09-10.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\member-relationships-lane-review-2026-09-10.md", sha256: "a45f22badcc16cd3ed3c076639e2f7b9eb4ab3ab982098e4c3b12d8be1399cd6"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/lobbying-member-link-is-circular-2026-08-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\lobbying-member-link-is-circular-2026-08-19.md", sha256: "a3b0c09adac890102ab3a88b17a2f8347e7775612945d2b72c01a73541e5338b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sector-networks-2026-08-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sector-networks-2026-08-18.md", sha256: "886a5144729d98f4e9d19356ffd7a13c8489580423bad01f49350f6a22d519bd"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/holistic-network-configs-2026-08-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\holistic-network-configs-2026-08-18.md", sha256: "424837f3392231942c750425a17527dc970514fc64f8261f1fd14059e1fa4d5f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-network-viz-requests.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-network-viz-requests.md", sha256: "b914b3def327c411bfb7106b668249169524d904a021f40306f9b0d8392bd5f6"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_network_enhancement.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_network_enhancement.md", sha256: "56e787ceb9e5884ed0aede95be8ae332f8f485e27b107a7faa57af08c3dcfb5e"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# Cosponsor and sector networks

> Rolling record (2026-06-25 to 2026-09-13) of the co-sponsorship network work behind [[melange-systems]]: the June 3-phase enhancement plan, the July layer-toggle and signed-reference requests shown on the [[melange-dashboard]], the August three-then-five `NET_CONFIG` networks (CU stays published; fintech dropped), the September member personal-relationships model, and the August 2026-08-19 finding that "lobbied member" is derived from cosponsorship (so lobbied-to-joined correlations are an identity).

## Parts

- [[2026-06-feature-cosponsor-and-sector-networks-june-network-plan]] — The June 2026 co-sponsor network plan of 06-25/26: legislative-success edge weights, signed-network coalitions, roll-call vote edges, the reversed legislative refresh, the committee-only influence vector, the congestion layer and the phase-3 adaptive allocation.
- [[2026-06-feature-cosponsor-and-sector-networks-layer-toggles-and-configs]] — Network layer toggles with the signed reference and co-appearance layers of 2026-07-04 to 07-06, and the three network configurations behind one dial of 2026-08-18.
- [[2026-06-feature-cosponsor-and-sector-networks-sector-networks]] — The bank_reg and crypto sector networks of 2026-08-18/19, promoted to full networks the same day, and the finding that the lobbied-member link is circular.
- [[2026-06-feature-cosponsor-and-sector-networks-member-relationships]] — The member personal relationships model lane of 2026-09-10 to 09-12 and its review.

## Context

- **Origin (2026-06-25, source: project_moneyball_network_enhancement):** Paul Goff supplied 5 papers to drive enhancement of the Moneyball co-sponsor network (the network inside `Moneyball Main Version - Blended.xlsx`), in 3 phases:
  - **Edge weights** = P4 Sotoudeh/Porter/Krishnagopal 2024 (success-weighted, decayed, size-normalized cosponsorship influence).
  - **Coalitions** = P3/P5 Aref & Neal 2020/2021 (globally-optimal partitioning of *signed* collaboration+opposition networks; "hidden 3rd coalition" of effective majority-aligned legislators).
  - **Allocation** = P1/P2 Chen/Kamarthi/Wilder/Tambe (influence maximization / contingency-aware seeding).
- **Later layers:** on 2026-07-04 (about 01:20, during the overnight Fable campaign) Paul requested (1) edge-layer toggles on the social-network viz and (2) a signed cross-media reference layer ("who references whom, positively or negatively"). Both shipped 2026-07-04; a co-appearance layer followed 2026-07-05.
- **Network configurations (2026-08-18):** three configurations (`cu` | `holistic` | `holistic_norm`) behind the `NET_CONFIG` dial with a live dashboard toggle, then (same day, Paul's ruling) bank regulation and crypto promoted to full networks, giving five (`cu` | `holistic` | `holistic_norm` | `bank_reg` | `crypto`). **CU remains the published network.**
- **Circularity finding (2026-08-19):** Paul asked on 2026-08-19, believing a significant lobbying-cosponsorship relationship had been found; the lobbied-member variable is manufactured from the cosponsor roster, so the number cannot carry that meaning (see the dedicated section in [[2026-06-feature-cosponsor-and-sector-networks-sector-networks]]).
- **Member personal relationships model (2026-09-10 to 2026-09-12):** friendship/friction between members, from original cosponsorship, personality, network and statements; Paul's spec = degrees of friendship AND friction vs ordinary chamber behaviour, estimate/evidence/confidence kept separate, original cosponsorship required.
- Related to the pillar weights recorded in this topic: three weight sets exist across the model's history; see "Pillar weights as they appear in these sources" below for the dated, status-labelled list (`.40/.30/.20/.10` 2026-06-29 historical; `30/25/40/5` ratified 2026-07-07, LAST RATIFIED; `45/10/40/5` live in `ranks_python.json` since 2026-09-03, LIVE BUT UNRATIFIED, code-review S-5 awaits Paul's ruling).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[lobbyview-collector]] | LobbyView LDA bulk-export collector (fec/collect_lobbyview.py @a126952, unmerged); NAICS unreliable, names decisive; 100 req/day API |
| [[melange-dashboard]] | Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network). |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## History

| Date | Event |
|---|---|
| 2026-06-25 | Enhancement started; Phase 1 (success-weighted edges) DEPLOYED x3 on the full network: `congress_cosponsor_network_20260625_184604.xlsx` (2390 edges), wired into the Blended Model `Centrality` sheet via Excel COM (0 errors, $2M, 494/533 coverage). Scraper backed up to `congress_member_scraper.BACKUP-20260625.R`, model to `...PRE-CENTRALITY-20260625.xlsx`. |
| 2026-06-25 | Base reproducibility gap RESOLVED (it was an artifact of a standalone archive-join rebuild; the scraper's own Stage 3 rebuilds the full 2390-edge / 636-node network offline). |
| 2026-06-25 | Phase 2 (signed-network coalitions to persuadables) DONE, deep-audited, 0 errors; backup `...PRE-PHASE2-20260625.xlsx`. Refinement (Ally cutoff 0.0575 to 0.034; persuadables split Flip-Neutral/Flip-Skeptic/Solidify; `pro_pull` bug fixed). |
| 2026-06-25 | Phase 2.5a: Voteview roll-call votes acquired (117th-119th); bill-set precision audit (38 false-positive bills dropped; 220 to 205 roll calls); `containsAll` root cause fixed in `congress_search_urls.R` (145 clauses field:metadata to field:title). |
| 2026-06-25 | Vote edges DONE (backbone, Option C party-controlled, cross-party POSITIVE only; `Vote Affinity` col I and `Priority` col J added; backup `...PRE-VOTES-20260625.xlsx`). |
| 2026-06-25 | Legislative refresh TRIED and REVERSED (restored `...PRE-LEG-CLEAN-20260625.xlsx`; failed attempt kept as `...POST-LEG-REFRESH-FAILED-20260625.xlsx`). |
| 2026-06-25 | Influence vector made COMMITTEE-ONLY (user decision): Blended Model `AB12` 0.35 to 1.0, `AB13` 0.65 to 0.0; backup `...PRE-COMMITTEEONLY-20260625.xlsx`. |
| 2026-06-26 | Congestion layer DONE (FEC 2024-cycle PAC contributions; `Congestion` sheet 533x17). Phase 3 IM BUILT (`fec/im_allocate2.py`; `IM Allocation` sheet; backup PRE-IM-20260626). FP bills cleaned from the legislative pillar surgically (backup PRE-FPCLEAN-20260626; 22-check audit `fec/audit.py` passed). |
| 2026-07-04 | Layer toggles + signed cross-media reference layer requested (about 01:20), authorized 01:35, BOTH SHIPPED same day (verified in browser, no console errors); desk relationship panel shipped. |
| 2026-07-05 | Co-appearance layer shipped @a693ae0 (user: "if they appear in public with someone"). |
| 2026-08-18 | Holistic configs shipped: holistic config @08d536b3a, dashboard toggle @c004b556b, normalized network @5f20525d9, banner correction @d57aaa5df, per-config layouts @b9ff46982 (Paul: "Option 1, with the animated transition"). Kernel 158/0; audit_full 202/1. |
| 2026-08-18 | Paul's ruling: crypto as a diagnostic, fintech DROPPED, community banks RESCOPED to bank regulation; then same day "promote bank reg to a full network then crypto". Diagnostics @232fb5dc6, then promoted @94ae92bc5 (five configs, registry). |
| 2026-08-18 to 2026-08-19 | Follow-ups: latent defects closed @eac247776; hub disclosure @d4bee058e; cleanup @188187398; path-4 kernel mirror all five configs @a04a17625; config audit + dial catalog @48560ae4f. |
| 2026-08-19 | Lobbied-member link found circular (`lobbying-member-link-is-circular`). Accidental write `holistic_network_AUG_20260819.xlsx` moved to `backups/accidental_20260819/`. |
| 2026-09-10 | Member relationships review lane: Paul answered yes to all seven review questions. |
| 2026-09-11 / 2026-09-12 | P0 1-4 built 09-11; P1 7/9/12 built 09-12; pair scoring done 09-12; structural check and fixes 09-12 (contract v1.2). |
| 2026-09-13 | Member-relationships memory last modified (2026-09-13T00:51Z); lane state as recorded in its section in [[2026-06-feature-cosponsor-and-sector-networks-member-relationships]]. |

## Decisions

- **Success = passed its RESPECTIVE BODY (originating chamber), NOT became law** (Phase 1, 2026-06-25). Why: became-law/cross-chamber is party-level, not attributable to the sponsor (matches P4's House-passage definition).
- **Rebuild via the scraper's own Stage 3, not a standalone archive-join** (2026-06-25). Why: Stage 3 uses Bills/cc alignment; a standalone rebuild reproduced only about 81% and that was my script's join mismatch, not a data gap.
- **Phase 2 edge construction = the BLEND (user's choice, "disciplined form")**: magnitude = enhanced cosponsorship weight (symmetrized), sign = stance alignment.
- **Vote edges: user rejected DW-NOMINATE; research (Aref & Neal) points to Neal's signed backbone**; user delegated weighting. Negative side DROPPED (it conflates maverickness); cross-party POSITIVE only kept.
- **Vote affinity weight:** `Priority = 0.70*z(Index) + 0.30*z(VoteAff)`: cosponsorship stays primary, votes a 30% corroborating booster.
- **Do NOT refresh the `Legislative Score - Normalized` sheet** (2026-06-25). Why: the topic-signed score rewards activity in CU topics, not CU SUPPORT; the "frozen"/"stale" sheet is CURATED. Reversed by restoring `...PRE-LEG-CLEAN-20260625.xlsx`.
- **Influence vector = committee-only (user decision 2026-06-25).** Why: centrality is direction-blind bill-leadership (propped up opponents who author anti-CU bills). Centrality data kept in the `Centrality` sheet, weight 0; user will show it in a separate SNA graph.
- **FP bills cleaned surgically, not by refresh (user, 2026-06-26)**: scale each FP-cosponsor's frozen Normalized by their FP share of the topic.
- **Layer toggles default OFF for references**; signed reference edges draw green (net>+0.15), red (net<-0.15), grey.
- **Interviews as a first-party stance SOURCE lane, not blended into third-party press coverage** was my recommendation on the open press question; awaiting Paul's call before touching stance inputs (his domain).
- **CU remains the published network** (2026-08-18). Holistic and normalized are exploratory; nothing published should be read off them.
- **Chamber normalization + per-member mass cap at 1.5x the median ADOPTED**; dropping regular cosponsorship and per-edge normalization REJECTED on measurement.
- **Per-config layouts (Paul: "Option 1, with the animated transition")**, reversing the earlier fixed-position choice.
- **Fintech DROPPED, crypto + bank_reg PROMOTED (Paul, 2026-08-18).** Fintech stays dropped and should not be re-proposed. Bank regulation was the one I flagged as possibly earning promotion; crypto I recommended AGAINST promoting, and Paul promoted both ("promote bank reg to a full network then crypto").
- **I did not re-argue the crypto ruling; the SURFACE carries the objection** (generated banners).
- **Registry, not more ternaries:** `moneyball_core.NETWORKS` holds per-config facts once; `symmetrize` is DECLARED per config.
- **Order early exits after refusals** (`NET_VALIDATE_ONLY=1` exits after the config verdict and writes nothing).
- **Member relationships rulings (Paul, 2026-09-10):** yes to all seven review questions: label the 180 blind; canonical = original-only strict-before; relatedBills companions allowed; staffer-layer covariate at analysis time; extend bills; visibility OUT of the estimate .
- **Paul, 2026-09-11/12:** "clear the space" (classifier blocks my deletes; he ran my script, 58 GB freed); "yes to both, download it, stop at the 115th" (re-grade the 73 v6 records blind; NOMINATE file; no 113-114); "1, fetch them" (fetch cited public pages for re-grade evidence).
- ~~Fixed per-config node positions~~ (2026-08-18 earlier choice) - superseded 2026-08-18 by Paul's "Option 1, with the animated transition" (per-config layouts @b9ff46982); the rationale was asserted in five places and had to be rewritten everywhere.
- ~~Recommend against promoting crypto to a full network~~ (2026-08-18, my recommendation) - superseded the same day by Paul's ruling to promote bank reg then crypto @94ae92bc5; kept because the finding (62.8% already in CU) lives in the crypto banner.
- ~~Sector networks as audit-only diagnostics @232fb5dc6~~ (2026-08-18) - superseded same day by promotion @94ae92bc5; "THE ARGUMENT FOR AUDIT-ONLY" is kept because it is why the banners read as they do.
- ~~Influence pillar = 0.35 committee + 0.65 centrality~~ (Blended Model AB12/AB13, 2026-06-25) - superseded 2026-06-25 by committee-only (AB12=1.0, AB13=0.0).
- ~~Ally cutoff 0.0575~~ (Rank & Allocation RA!L8) - superseded 2026-06-25 by 0.034 after Paul's "Neutral mislabeling" feedback.
- ~~SUCCESS_MULT 5.0~~ - set to 3.0 on 2026-06-25 (x5 made the offline InfluenceScore too top-heavy: 4 members >50, 77 zeros). Retunable at the top of Stage 3.

## Next Steps

- [ ] Paul to rule on press question: should interviews be added to the press as a first-party stance SOURCE lane (my recommendation) or not (2026-07-05, open).
- [ ] Paul's eyeball on the rendered per-config layouts (not verified: preview pane does not composite; layouts occupy the central ~45% of canvas) (2026-08-18).
- [ ] Phase 2.5b congestion reframe / Phase 3 follow-ups per the June plan (congestion layer was built 2026-06-26).
- [ ] Apply `bill_drop_final.csv` exclude in the scraper and re-run to clean the legislative pillar for currently cached data (still TODO as of 2026-06-25; the 36 FPs were then cleaned surgically on 2026-06-26).
- [ ] Score and write up (or do NOT write up) the frozen `cosponsor_join` forecast carefully: it is circular if framed as "predicted who joins lobbied bills" (265,396 predictions, unscored, resolvable NOW; hash changed).
- [ ] Member relationships: Paul adjudicates 31 + 38 items; rules on raw-vs-residual work channel; the 10 PDF-only links; the canonical universe (115-119?); the 13 pair-scoring design choices; then test registration and the `blind_grading` QWK guard fix; more labels needed before any presence-vs-ordinary AUC.
- [ ] Lane-level tracking: commit status of `fec/research/member_personal_relationships/` was never checked (no-git rule at the time).

## Pillar weights as they appear in these sources

The sources here quote pillar weights only for the June 2026 workbook; the full dated list across the model is:

| Weights (Press/Influence/Legislative/Demo or as labelled) | Date | Status |
|---|---|---|
| `.40/.30/.20/.10` | 2026-06-29 | historical |
| `30/25/40/5` | ratified 2026-07-07 | LAST RATIFIED |
| `45/10/40/5` | live in `ranks_python.json` since 2026-09-03 | LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling |

Weight sets quoted in this topic's source (June 2026, earlier than all three above and all superseded):

- 2026-06-25 enhancement doc: "Score pillars now: **Press 0.40 / Influence(=committee) 0.35 / Legislative 0.20 / Demo 0.05**" after the committee-only change (the original model's weights under percentile-rank).
- After Phase 1, the influence vector then in force was 0.35 committee + 0.65 centrality, changed to committee-only the same day.
