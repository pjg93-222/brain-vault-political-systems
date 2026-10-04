---
type: discussion
title: "Coalition-builder redesign session"
aliases: ["Coalition-builder redesign session"]
date: 2026-07-30
summary: "Design session (worktree melange-coalition-builder-design-7babbe, 9-agent ultracode research + 2 critics) on the dashboard coalition builder: static weekly-baked substrate plus client-side set-aware evaluation, eight positions P1-P8 with outcomes, merge-main precondition; nothing implemented at session time, all awaiting Paul's APPLY gate; implementation followed 2026-07-30 to 2026-08-01."
conclusions:
  - "Architecture: graph = STATIC substrate (weekly-baked, self-contained HTML, no live fetch) + DYNAMIC set-aware evaluation in JS; member-only facts baked, coalition-set quantities computed client-side with the dashboard's proven deterministic cascade JS (sm() hash-CRN, SEED/MC in engine.const)."
  - "Desk bundle must ship the RAW engine block (<0.5MB on 33MB) and REPLACE the derived ADJ: baked ADJ pre-folds emult while build_P applies em(v) again, so mixing = emult SQUARED."
  - "Precondition: MERGE main first (branch predates the primacy board; primacy_factors.json not read by any desk producer)."
  - "P1 AMEND, P2 SUSTAIN, P3 REJECTED as specced (salvage ships now), P4 AMEND, P5 SUSTAIN+AMEND, P6 AMEND, P7 CONTESTED, P8 AMEND."
  - "All outcomes awaited Paul's APPLY gate (ask-before-substantive-changes); dial defaults are Paul's."
action_items:
  - "Paul to give the APPLY ruling on the design verdicts (ask-before-substantive-changes gate)"
  - "Merge main into the design branch first (step 0) before any implementation"
  - "Paul to decide the Big5 basis question (P7): characterization diff behind SUSC_B5_W dial default 0 (later ruled 60/40 on 2026-07-30/31)"
  - "Add primacy_factors.json read + bundle fields (factor_ranked, qualified-at-build vs PRIMACY_MIN_CUPRIM, tier_detail)"
  - "Measure cu_press_stance_tone.csv categories fill-rate before the CFPB mute (P6)"
  - "Emit true CU LQ (NAICS 522130) via fetch_cbp_4digit.py cu_benchmark extension (P8); CBP cache re-download is Paul's gate"
related_topics:
  - "[[2026-07-feature-influence-engine-internals]]"
related_actors:
  - "[[melange-dashboard]]"
related_people:
  - "paul-goff"
related_projects:
  - "[[melange-systems]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-coalition-builder-redesign-2026-07-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-coalition-builder-redesign-2026-07-30.md", sha256: "6de9c3e1f37e948cdca7a5c0f740343e3fe9eef844666fac95fec4e666753b26"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/discussion", "domain/data"]
---

# Coalition-builder redesign session

> 2026-07-30 design session on the Melange dashboard coalition builder: a static-substrate / dynamic-evaluation architecture verdict, eight positions (P1-P8) with critic outcomes, and a merge-main precondition, all awaiting Paul's APPLY gate; implementation followed through 2026-08-01.

## Context

- Date: 2026-07-30 (source file last modified 2026-08-01). Held in worktree `melange-coalition-builder-design-7babbe`. NOTHING implemented at session time: the `ask-before-substantive-changes` gate was pending. Method: 9-agent ultracode research + 2 critics; per-agent reports in the session scratchpad.
- Subject: the coalition builder on the dashboard / member desk ([[melange-dashboard]]); the engine layer it reads is part of [[melange-systems]]; the longer engine record is the topic [[2026-07-feature-influence-engine-internals]].
- Paul (Paul Goff) asked the lead question: where should the graph live (static vs live)?

## Participants

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Discussed Actors

| Actor | Context |
|---|---|
| [[melange-dashboard]] | Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network). |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Topics

- [[2026-07-feature-influence-engine-internals]] - July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder
- [[2026-07-feature-influence-engine-internals-coalition-builder]] — The coalition-builder redesign and implementation of 2026-07-30 to 08-01, as recorded for the influence engine.

## Conclusions

### Architecture verdict (Paul's lead question)

- Graph = STATIC substrate (weekly-baked, self-contained HTML, no live fetch) + DYNAMIC set-aware evaluation in JS.
- Rule: member-only facts baked, coalition-set quantities computed client-side with the dashboard's proven deterministic cascade JS (`sm()` hash-CRN, SEED/MC in `engine.const`).
- The desk bundle must ship the RAW engine block (< 0.5MB on 33MB) and REPLACE the derived ADJ: the baked ADJ pre-folds emult (`make_member_desk.py:1744-1746`) while `build_P` applies `em(v)` again, so mixing = emult SQUARED.
- Ship SGATE (missing from `engine.const`); add a refflip-style Python-JS parity self-check that fails visibly; CELF + one-hop prefilter in a Worker for perf.

### Preconditions

1. MERGE main first: this branch predates the primacy board entirely (zero PRIMACY_* hits; worktree tier = pre-primacy 80/20 leg + press, 12/24/48 vs live 13/24/48 factor-only); the legfix5 lane is also on other branches.
2. `primacy_factors.json` is NOT read by any desk producer: needs a new read + bundle fields (factor_ranked, qualified-at-build vs `PRIMACY_MIN_CUPRIM`, tier_detail).

### Position outcomes (each with critic verdict)

| Position | Outcome | Substance |
|---|---|---|
| P1 static/dynamic | AMEND | As the architecture verdict above |
| P2 seeding | SUSTAIN | Seed-from-issue via gated-matrix PRO letters (client-side); per-issue seeds need `per_topic_coalition.json` added to the bundle; optimizer allocs are FLIP TARGETS, never coalition seeds (semantic inversion; surface as a separate Targets panel); marginal-gain greedy must run through `gate(n,cs)` contingent seeding |
| P3 sector-affinity ("who are they doting over") | REJECTED as specced; SALVAGE ships now | CU-conditioned corpus makes shares anti-correlated with the bank/crypto attention they are meant to detect; `legislativeSubjects` populated only 8,730/14,854 (staged-only, `scoring_authority:false`); 19-cat review never performed; no crypto FEC bucket; congestion producer retired to attic. SALVAGE: CU-attention profile from `bills[].areas` (fractional attribution, role weights, min-N floor + shrinkage, N on chip) + cu/banks/finserv money-mix chip; B-side prior rides money ONLY |
| P4 primacy + tiers as primary chips | AMEND | Yes swap, rank to hover, BUT add an explicit capacity chip (`committee_score` + `formal_role` fields already bundled; rank's AB4 = 0.40 pillar IS committee capacity); "unqualified" rendered as an eligibility label, not a low score |
| P5 issue gate | SUSTAIN + AMEND | `lt_priming` law verbatim (BLOCK sets, Lean Skeptic carve-out; dashboard BLOCKOV JS is the port template); HARD gate auto-suggestions, SOFT (greyed-visible + reason) for roster; CRITICAL: desk radar = `CS['scores']` written PRE-say-do-gate, so any radar weighting must mask with the gated matrix/gcap or it silently re-promotes say-do-capped members; overall from `overall_capped`. Bill-anchored mode via `bills[].areas` category mix (26.8% multi-listed; surface the mix; 11.6% vendor-inconsistent caveat) |
| P6 CFPB mute | AMEND | Pin to the blend accumulation loop (`build_media_blend.py:335-385`, `PRESS_CAT_MUTE` dial, Paul's default); measure `cu_press_stance_tone.csv` categories fill-rate FIRST; declare planes (mutes press pillar/rank, NOT CFPB radar cell, NOT engagement/HCoI edges); volume-scoped symmetric, does NOT revert the 07-15 directional re-adjudication; zero-code alt = w535 CFPB literal |
| P7 Big5 80/20 | CONTESTED | Modeling critic rejects: A halo 322/533, N 469/533, so about 40% of the roster degenerates to the -C/-E design-prior dampeners; O contributes nothing under Byrne signs; re-inverts the ratified 2026-07-04 behavioral-basis decision; no external criterion, so a look cannot show "better"; three fail-closed mirrors (`receptivity_sensitivity` stage-1 gate, `behavioral_roles_v2_study` sha pin, dashboard JS); `outcome_snapshot` H1/H2 freeze contamination. Counter: the 07-04 indictment targeted LEXICAL `big5_traits`; `big5_blue_validated` is promotion-gated and the only all-533 O/C/E z-source. Proposed to Paul: run as a CHARACTERIZATION diff (not a validity look) behind a `SUSC_B5_W` dial default 0, per-member weight renormalization over available traits + coverage flag + stratified report; the basis decision is his |
| P8 LQ | AMEND | Emit TRUE CU LQ (NAICS 522130) via `fetch_cbp_4digit.py` cu_benchmark extension (US denominators already parsed in-memory; ZERO new collection); skip the bank-contaminated 5221 proxy; senators currently have NO path (need state rows); apply ONCE at final suggestion ranking, small dial, never inside edge/seed probs; raw axes only, no tiers/composite (do not reconstitute excluded `demographic_potential`); `pct_finance` is closer to B-side stakes (sign caution); audit workbook col F provenance before claiming no demo double-count |

### Why and how to apply (source)

- **Why:** these verdicts came from adversarial verification against the live artifacts, not the spec; the pre-gate radar bypass, emult-squaring, and CU-conditioned-denominator findings would each have silently corrupted the rebuild.
- **How to apply:** treat merge-main as step 0; implement via `codex-executor-lane-2026-07-18` after Paul ratifies; dial defaults are Paul's; related `primacy-board-factor-only-2026-07-29`, `legfix5-collection-complete-2026-07-27`, `psych-audit-2026-07-09`, `dispositions-dependability-2026-07-09`, `ask-before-substantive-changes`.

## Action Items

- [ ] Paul's APPLY ruling on the design verdicts (gate `ask-before-substantive-changes`) (owner: Paul, Paul Goff) (status at session: pending; implementation began on his go 2026-07-30/31, see below)
- [ ] Merge main first, step 0 (owner: coordinator / implementation lane; done on the session branch @2aea383 by 2026-07-31)
- [ ] Add `primacy_factors.json` read + bundle fields (factor_ranked, qualified-at-build vs `PRIMACY_MIN_CUPRIM`, tier_detail) (owner: implementation lane)
- [ ] Measure `cu_press_stance_tone.csv` categories fill-rate before the P6 CFPB mute (T7) (owner: implementation lane)
- [ ] True CU LQ via `fetch_cbp_4digit.py`; CBP caches (`%LOCALAPPDATA%\Melange\demographics`) absent: re-download = Paul's gate (owner: Paul)
- [ ] Live landing of everything held on the foreign legislative-workbench/culling surface (owner: Paul adjudicates ownership/landing order)
- [ ] Nonzero `SEED_UPTAKE_W` ratification (owner: Paul)

## Follow-through after the session (2026-07-30 to 2026-08-01)

Condensed; the full record is in [[2026-07-feature-influence-engine-internals]].

- **IMPLEMENTATION 2026-07-30/31 (Paul's go: "reason through fable, work through chatgpt 5.6 sol, extra high fast")**: Paul's amendments: live self-updating model is the END GOAL (static accepted for now); baked features must rebuild the moment inputs change (watcher T6); competitive awareness UNLOCKED by primary-bill beneficiary classes (primacy mix cu_primary / shared / bank_primary / crypto_primary / fintech = the classification; the P3 reject is superseded), shared splits 0.5/0.5, language as backup; capacity members are MORE persuasion-resistant, so suggestions must rank by expected value = P(join) x marginal coverage; **Big5 60/40 RULED** (Paul: all five fully validated internally + externally, behavior is domain-specific; "do not push back"), `SUSC_B5_W=0.60` default, revert = 0 (this resolves P7 in Paul's favor of 60/40, superseding the 80/20 proposal and the dial-default-0 characterization proposal).
- SHIPPED with double sign-off on three branches (merge of `claude/cfpb-sentiment-recorrection` into the session branch @2aea383 first, primacy lineage): `codex/desk-data-contract` (engine block + SGATE + primacy/doting/money_mix/issue_seeds + DI fingerprint), `codex/recept-6040` (blend + sensitivity mirror reads artifact b5_w + audit guard; W = 0 revert exact 533/533; 519/533 pressure moved sd .037, top20 overlap 13/20, Ossoff -.295 max; 64 members lack BOTH A and N), `codex/cu-lq` (522130/522110 LQs district + state + national, schema v2, v1/v2 gates; PROBE BLOCKED: `%LOCALAPPDATA%\Melange\demographics` caches ABSENT, re-download = Paul's gate). UNCOMMITTED then. Flagged to Paul: renormalization-over-available-traits augmentation (preserves 60/40), `outcome_snapshot` freeze contamination on deploy, `audit_full` edited in two branches (disjoint hunks). QUEUE: cxD template v2 (one-adjacency rule + expected-value ranking + chips), T5 doting test + language backup, T6 watcher, T7 CFPB fill-rate count.
- **PHASE 2 (2026-07-31)**: renormalization user-ratified + COMMITTED @6226a1f on `codex/recept-6040` and merged to the session branch (Paul: "report back, if good commit"; 322/322 full-coverage bit-identical via the IEEE-754 fast path CODEX CAUGHT in the coordinator's spec; 64/64 both-missing to pure behavioral `b5_w_eff=0`; partial = 147 renormalized mass 0.60; fresh review zero findings). LETTERS COUNT CU-SIDE user-ratified 2026-07-31: `cu_doting = (cu_primary + letter + 0.5 x shared)/D`, D includes letter; landed on `codex/desk-data-contract` (uncommitted then). Template-v2 12-step plan approved (thread `019fb627-...02c0e`), gated on committing `codex/desk-data-contract` into `codex/template-v2`'s base. MCP codex threads can be LOST on server restart ("Session not found"): recover with fresh revision threads per the skill's recovery section; the Codex sandbox cannot execute python (coordinator runs all compiles/characterizations in the worktrees).
- **PHASE 3 (2026-07-31, Paul: "Commit and merge all")**: ALL COMMITTED + MERGED at session level: 2fe9a2a (desk data contract incl. letters), 283e57a (CU LQ), 6226a1f (60/40 + renorm); session branch `claude/melange-coalition-builder-design-7babbe` @1768e3f is the integration point; `codex/template-v2` fast-forwarded. **LIVE LANDING HELD**: the live tree (`claude/cfpb-sentiment-recorrection`) carries 43 uncommitted tracked modifications from ANOTHER in-flight surface (legislative-workbench/culling lane: imports `demographic_normalization`, `dashboard_legislative_workbench`, `district_cu_metrics`, `legislation_culling_status`; `DASHBOARD_DATA_PATH` / `CATEGORY_STANCE_PATH` env redirects) overlapping `make_member_desk.py` / `build_dashboard_bundle.py` / `dashboard_integrity.py` (236 insertions across those three). NEVER merge over it; Paul adjudicates ownership/landing order. That surface already wires `district_cu_metrics`: coordinate before building more LQ display. Benign: python 23132 = `glassbox_app_server:8823`. Ranks baseline at `%TEMP%\ranks_before_6040.json` + `artifact_baseline_6040.json` (7 md5s). Deploy checklist when cleared: merge session to cfpb from the live tree, kernel tests, chain, zero-rank-delta (engine outputs move by design; RANKS must not), audit tail, `outcome_snapshot` freeze decision.
- **BIG5 AUGMENTATION (2026-07-31; Paul: O = hearing answer-uptake with ideology control; C = +persistence with party control; E = no change; A = extend coverage; N = stress-reactivity + volatility composite)** built, run and CONCLUDED the same day under Paul's triage rule "worse→remove, could-be-better→investigate, dead-end→remove": COMMITTED d0a2e34 (`hearing_features_candidate.py`) + ffbf620 (`fetch_hearings_witness.py`) @ session df79d9d. Dead ends removed (never re-propose without new basis): stress-reactivity v2/v3, affect volatility, bill reintroduction v1 + v2-billstatus. FINAL O VERDICT: answer-uptake is RELIABLE (SB .77/.71) but NOT O; `followup_share` (SB .77, not C) kept as inert candidates; N stays affective-content; E unchanged; A-coverage-extension = next locked prereg round. Facts: `hearings_seq.db` 7174 hearings / 679k member turns / 463 members; `hearings_wit.db` 4,433+ packages, alignment 100% + consumer MD5 gate 4433/4433; first hygiene numbers (no looks consumed): `stress_raw` E +.08, orthogonal to affective/blue N (-.04); `volatility_raw` weak-N (+.07/+.09), E-clean (-.01), level-entangled (+.64), small-months SD artifact (-.22); uptake null vs O (-.01/.00), ideology gradient -.21 (gone after partial); `mean_chain` volume/E proxy (+.33/+.34); `return_rate` weak-negative; leg `reintro_rate` coverage-dead 14/152. NEVER pair candidates with criteria as an instrument look without a LOCKED prereg.
- **GO SEQUENCE PHASE 1 SHIPPED (2026-08-01)**: coalition builder v2 COMMITTED @3b712bb (set-aware EV builder: one engine-derived directed graph replaces `bundle['adj']` everywhere incl. the postrefresh planning audit now validating `engine.adj`; CRN keys IDENTICAL to dashboard `spread()`, review caught a SEED*MC offset divergence; `gcap` say-do mask in the radar multiplier; two-probe Python-JS selfcheck banner at 0.15%; gates/panels/chips per contract) + answer-uptake `seed_prob` channel @8b705fa (`SEED_UPTAKE_W` default 0 with explicit skip; W = 0 bit-identity vs live proven 0/533; probe W = 0.10: 437/533 move sd .086, co-equal with the cooperation channel; malformed-candidate inert at default; ratification of a nonzero weight = Paul's). Session branch @49a86c1. ROUND-4 N DATA-GATE NOW OPEN (reactivity_z 270 >= 250) but the criterion is E-contaminated; the successor needs a redesigned criterion. QUEUED NEXT: A-extension prereg (draft, adversarial review, LOCK), T5 doting test + language backup, witness retry pass (sweep about 78%+ at 100% alignment), watcher, CFPB fill-rate, LQ regen (CBP cache re-download), LIVE LANDING. Deploy of everything = full protocol on live (chain, zero-rank-delta, audit; ranks must NOT move: receptivity/desk changes are engine/display side).
- **A-EXTENSION + T5 DISPOSED (2026-08-01)**: A-coverage extension DATA-GATED with probe evidence, NO prereg burned: hearing-antagonism pooling killed at probe (r = +.16 convergence with interview-A on n = 282, volume-clean; construct-mixed, anti-basis-shopping adjacent, DO NOT pool); native rubric re-run yields only +6 (eligible 328 vs scored 322; floors `MIN_PACKAGES=3` / `MIN_WORDS=1000` in `interview_antagonism_score.py`; read-only no-arg mode reports the roster; `--go` = Haiku cost gate). RE-CHECK eligibility each collector cycle. T5 doting VALIDATED for display: 516/533 coverage (17 null to the language-backup tail), face-valid comp extremes (Warren .76, Hawley .75, Tuberville .74, G.Thompson .86 with bank-money .88-1.00; Riley Moore comp 1.00 / money 0 = attention-without-money), money corroboration +.14 correct-sign-weak, comp deciles .25-.75. Blue A instrument = INVERSE INTERVIEW-ANTAGONISM (multimethod prereg LOCKED 2026-07-12: LSA O/C/E vs breadth/diligence/visibility; A halves; N = affective; missing A never imputed).
- Additional Big5-augmentation details (kept here for completeness): member turns in `hearings_seq.db` are FIVE fields [name, party, dash, text, 'M'|'C' chair-flag]; `hearing_meta` has NO contentiousness despite its docstring; `mean_chain` needs a shares-not-counts redesign per the `coop_v2` lesson; witness-collector alignment fingerprints were checked against the 2026-07-10 cache; stress-reactivity v3 had SB .57 but only 140/463 coverage with wrong-signed N; the decisive O null was n = 384-393 (neutral-answer-conditioned, ideology partialed).
