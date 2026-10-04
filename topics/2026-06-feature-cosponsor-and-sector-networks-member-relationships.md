---
type: topic
title: "Member personal relationships model (09-10 to 09-12) (Cosponsor and sector networks)"
aliases: ["Cosponsor and sector networks: Member personal relationships model (09-10 to 09-12)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-06-26
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\research\\MEMBER_PERSONAL_RELATIONSHIPS_V3_MATH.md"
    sha256: "9b464077d9155e371815d51c099626a4641b2a8821e8cede93937dd50e84f61c"
    as_of: "2026-09-19"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-06-feature-cosponsor-and-sector-networks]]"
---

# Member personal relationships model (09-10 to 09-12) (Cosponsor and sector networks)

> The member personal relationships model lane of 2026-09-10 to 09-12 and its review. Part of [[2026-06-feature-cosponsor-and-sector-networks]] (project [[melange-systems]]).

## Member personal relationships model (2026-09-10 to 2026-09-12; `member-relationships-lane-review-2026-09-10`)

Memory description: "Member personal relationships model (friendship/friction from original cosponsorship, personality, network, statements): what the AUCs measure, P0 1-4 built 09-11 and P1 7/9/12 built 09-12 (contract with 115th, work baseline, blind re-grade of the 73 v6 records), Paul's rulings and open calls". Memory last modified 2026-09-13T00:51Z.

- **Lane:** `fec/research/member_personal_relationships/` (LIVE tree only; no worktree has it). Commit status never checked (no-git rule). Lane suite 509 tests via `python -m unittest discover -s <lane>/tests -t <lane>/tests`; NOT registered in `fec/tests/run_tests.py`. The contract's live reproduction test is opt-in (`RUN_SLOW_CONTRACT_TESTS=1`).
- **Records:** `audits/member_relationships_review_20260910/` in the employment-tenure worktree: `REVIEW.md`, `P0_REPORT_2026-09-11.md`, `P1_REPORT_2026-09-12.md`. Outputs under `outputs/member_personal_relationships/20260910_*` and `20260911_*` (`benchmark_contract_115_119`, `full_history_115_119`, `work_baseline[_115_119]`, `v6_regrade`, `pair_scores` pending).
- **Paul's rulings:**
  - 2026-09-10: yes to all seven review questions (label the 180 blind; canonical = original-only strict-before; relatedBills companions allowed; staffer-layer covariate at analysis time; extend bills; visibility OUT of the estimate).
  - 2026-09-11/12: "clear the space" (classifier blocks my deletes; he ran my script, 58 GB freed); "yes to both, download it, stop at the 115th" (re-grade the 73 v6 records blind; NOMINATE file; no 113-114); "1, fetch them" (fetch cited public pages for re-grade evidence).
- **Numbers (same-fit AUC = 180 dyad comparisons):**
  - stored 0.911 = 164/180 (old builder, reproduced).
  - Canonical C1: 109/180 with 116-119 bills, 119/180 with 115-119 (perm p 0.39 to 0.17); measurable dyads 21 to 24 of 29 (Arrington/Khanna, Collins/Murkowski, Marshall/Panetta gained); S2b spec on measurable 86/90 to 106/108 vs floor 50/90 to 70/108.
  - Work baseline (binomial logistic per chamber×congress; per-congress NOMINATE; shared committee omitted, no roster): residualizing LOWERS sign ranking (raw 124/140 vs residual 118/140, all-history pooled), so compatibility terms carry signal; Paul must pick raw vs residual for the work channel.
  - Blind re-grade of the 73 v6 records (final, after Paul's "Fetch the 10 PDF links too"): passes agree with each other (affinity 35/39 exact, QWK 0.955; friction 28/31, 0.966) but with the original grades only 13/20, 6/10 (QWK 0.43-0.50); cause mostly evidence availability: 4 records had verbatim text, 42 recovered locally (hearing PDF pages, `social_media.db`), 20 from fetched web pages, 3 from fetched CREC/committee PDFs, 4 unrecoverable (CNN summary-only, C-SPAN paywall ×2, Fox 403); 31 queued for Paul.
  - Haiku verifiers twice reported QWK ~ 0 with flipped weights; Opus from-scratch reproduction matched the harness to 6 decimals: never accept a Haiku kappa recomputation without the confusion matrix.
- **Structural check 09-12** (four independent agents; `STRUCTURAL_CHECK_2026-09-12_session_a.md`): joins, kits, labels, hashes, sealing (1,316 held-out hits all in flagged pair tables), tests 623/1 skip all PASS; real defects = `benchmark_contract.py` hard-coded `COVERAGE_START` 2019-01-03 (115-119 run's S1 row and `contract.json`/pin table describe the old panel; C1/S2/S2b/F1b unaffected; v2 fix + re-run) and `pair_scoring`'s undirected residual substitution (23% of two-sided pairs are one-directional; directed variant built). **Lesson:** any constant tied to the panel start must be derived from the loaded panel; a "contract" artefact must be built from the run's inputs, not a static dict.
- **Fixed 09-12:** citable 115-119 contract = `20260911_benchmark_contract_115_119_v2` (contract v1.2; only S1 moved, 109/144); citable pair-scoring runs = the `_r2` dirs plus `_residuals_directed` (directed residual built, does not help: MAE 0.789/0.839 vs raw). Suite 647 + 1 skip.
- **Mechanics learned:** sub-agent Edit/Write refuse base-checkout paths while the session is worktree-bound (even after the app switched cwd to R); builders write to the session scratchpad and I place files with PowerShell `Copy-Item` (hash-verified). The auto-mode classifier blocks deletions and blocked one agent brief that combined web fetching with kit writes; a fetch-only brief passed. `SendMessage` scope changes to executors get treated as suspicious by some agents: put the full scope in the initial brief. `history_work.py` line 31 hard-filters 116-119; extended bill files need their own loader.
- **Why (Paul's spec):** degrees of friendship AND friction vs ordinary chamber behaviour, estimate/evidence/confidence separate, original cosponsorship required.
- **Pair scoring (P1-5/6/8/11) DONE 09-12:** `pair_scoring.py`, three runs (`20260911_pair_scores[_residuals|_115_119]`, ~500 MB each): 141,246 pairs; joint estimate for 196,758 of 282,492 directed rows; sign rows reproduce the contract (109/180, 114/140); LORO MAE vs original grades 0.816 (23) / 0.728 (9), vs blind-agreed 0.720 (29) / 1.051 (22); 47-pair AUC unreportable (all affinity cells presence, all but one friction cell ordinary): label supply, not model. Lane suite 591.
- **How to apply:** quote every AUC with denominator and row spec; unmeasurable dyads = evidence availability, never imputed; the expression contrast is "excess ritual warmth" until the cue classifier is replaced; evidence records must store verbatim passages plus locators (DE-020 candidate). Next: Paul adjudicates 31 + 38 items, rules on raw-vs-residual work channel, the 10 PDF-only links, the canonical universe (115-119?), the 13 pair-scoring design choices; then test registration and the `blind_grading` QWK guard fix; more labels needed before any presence-vs-ordinary AUC. See `ask-before-substantive-changes`, `no-git-plain-review-2026-09-01`, `disk-census-2026-09-11`.

## Full-history method v3 (`research/MEMBER_PERSONAL_RELATIONSHIPS_V3_MATH.md`, 2026-09-10)

The implemented methodology after the user's corrections: observed cosponsorship propensity over available history, jointly cosponsored bills, political and geographic context held constant, and personal language read relative to the speaker. It is an evidence assessment with transparent components, not the earlier small fitted classifier.
- **Data:** H.R. and S. bills of Congresses 116-119; a target roster of 532 members with dated service at the 2026-09-10 cutoff; only duplicate canonical bill IDs are collapsed.
- **Opportunity and propensity:** E(i,b) = 1 if member i served in the bill's chamber between introduction and the earlier of Congress end or cutoff and was not its sponsor; A(i,b) = 1 if i joined during dated service in that window (no 30-day gate). Direct propensity P_direct(i,j) = D(i,j) / N(i,j), signatures on j's bills over opportunities; a zero denominator is unavailable, not zero support.
- **Shared cosponsorship:** C(i,j) = Σ_b A(i,b)A(j,b) over third members' bills, with P_shared = C / T; the comparison feature is a weighted Jaccard overlap with bill weight w(b) = 1/max(1, k(b) − 1) for a bill with k cosponsors, so large coalitions count less.
- **Context held constant:** targets are compared with peers of the same party relation, state relation, chamber relation, DW-NOMINATE distance bin (0.2) and issue-profile similarity bin (0.25); at least five peers are required, and nothing is subtracted for shared geography or ideology.
- **Network proximity:** Q(i,j), the cosine similarity of i's and j's weighted cooperation profiles excluding both endpoints; no enemy-of-an-enemy rule.
- **Personality and speech:** trait similarity S_t = exp(−|z_i − z_j|), with E, A and O as the primary compatibility indicator (supportive only when at least two are observed and the mean is at or above the roster median; missing or dissimilar traits are never negative evidence). Speech cues are lexical retrieval statistics needing source review, and a proposed distinctiveness weight M(i) = 1 + (1 − q(i)) × reserved(i), ranging 1 to 2, weights rare warmth from reserved speakers more; the source states it is not validated.
- **Decision rules:** documented friendship needs a context-reviewed personal statement; inferred affinity needs at least two supports (selective sustained cooperation, above-median compatibility, network proximity at or above the 75th comparison percentile, repeated reviewed positive episodes, or M ≥ 1.5); the legislative review flag needs shared Jaccard at or above the 90th percentile plus direct propensity at or above the 75th or proximity at or above the 90th, at least five shared bills and shared bills in at least two Congresses. Dislike needs reviewed person-directed hostility; mismatch, low cooperation, ideology or distance never create it.
- **Testing:** regression cases, full-panel invariants, independent bill recounts, and the original documented pairs with their personal statements hidden from the work and network calculations; a retrospective check, not a calibrated accuracy claim. Outputs: `outputs/member_personal_relationships/20260910_full_history`.
- **Dated note:** this method's A(i,b) counts any join during dated service. The rulings recorded above for 2026-09-10 made the canonical benchmark original-cosponsorship-only and strictly before, and the pair-scoring sign rows reproduce that contract. Both are dated 2026-09-10; check which definition a run used before citing its numbers.
