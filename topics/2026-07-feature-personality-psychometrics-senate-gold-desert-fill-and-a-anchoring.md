---
type: topic
title: "Records 7-10: Senate gold template, desert fill, gold-anchored A and E, cooperation probe (07-16 to 07-18) (Personality psychometrics)"
aliases: ["Personality psychometrics (Big Five): Records 7-10: Senate gold template, desert fill, gold-anchored A and E, cooperation probe (07-16 to 07-18)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-09
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
part_of: "[[2026-07-feature-personality-psychometrics]]"
---

# Records 7-10: Senate gold template, desert fill, gold-anchored A and E, cooperation probe (07-16 to 07-18) (Personality psychometrics)

> Records 7 to 10 of the Big Five program (2026-07-16 to 07-18): the two-panel Senate gold template and audio identity design, the desert-fill campaign, gold-anchored A and E with the stance curve, and the cooperation-vs-A sector probe. Part of [[2026-07-feature-personality-psychometrics]] (project [[melange-systems]]).
> Newest wins: the program's current state is kept in [[2026-07-feature-personality-psychometrics]] (Context, "Where the program stands"); where a record differs, that summary governs.

## Record 7: Two-panel Senate gold ("golden template") and audio identity design, 2026-07-16 (`gold-template-audio-2026-07-16`; session 9c0ceea0-eef3-4eca-926f-d6168049b4d4)

Verdicts and design were PRESENTED to Paul 2026-07-16, awaiting his decisions; then EXECUTED the same day (see below). Worktree loving-payne, branch `claude/gallant-gates-982203`; the live tree was on `claude/cfpb-sentiment-recorrection` @35b8a09; the analysis read the live tree read-only, NOTHING applied.

**The "golden template"** = the frozen *Personality on the Hill* appendix gold (`big5_senate_expert_gold.json`, 129 Senate-insider + 125 academic-expert senator rows, 1-7 O/C/E/A/ES; methods section 40, 2026-07-15). Two validators: `b5_external_gold_validate.py` (fixed no-gold-fitted E control axis) + `b5_gold_multitrait_validate.py` (LOO-OOF v2). E and A pass BOTH panels; O academics-only (.492/.192), N insiders-only (.374/.123, N = -ES), C insider-association-only (.262 p=.040, NO diagonal dominance, academics -.039). Statuses `ACTIVE_ONE_PANEL_ASSOCIATION_SUPPORTED` per Paul's 2026-07-15 activation rule.

**Provenance:** `Downloads/Eran.pdf` = Amsalem et al. 2018 media-visibility paper (Belgian/Canadian/Israeli MPs): NOT the gold source, hash-mismatches the repo pin. The TRUE pinned gold PDF is `Downloads/online_appendix.pdf` (SHA-256 verified = 43c98926...).

**Verdicts (workflow + constraint audit; presented not applied):** NOT fundamentally incongruent for any of N/O/C: one mechanism (trait-observability x rater vantage + single-rater criterion noise) explains all 7 trait x panel outcomes. N=RECONFIGURABLE, O/C=PARTIALLY_RECONFIGURABLE. Key criterion-side probe (legal, look-free): cross-panel agreement stratified by insider ratings_n: k=1 rows are noise (roster O -.05, C .14, E -.04), k>=2 rows agree strongly (O .49, C .48, E .59, A .69, ES .48, n~29), so the NOISE branch of the noise-vs-facet fork; reliability-weighting the criterion (ratings_n) is the strongest lever and is PAUL'S criterion-side call. Joint-null false-pass sim: pass-both-panels ~1.5-2%, +dual dominance <1%, so exactly ONE more look per trait is defensible; more = basis-shopping. Range restriction negligible. **MEM_N ~ 270** (turns>=30 non-null cutoff) vs round-4 DATA-GATE 250, so the N successor prereg is likely UNLOCKED (confirm Sec-17-roster intersection with the pinned constructor first).

**Taint recorded:** a subagent computed a fresh instrument x criterion pairing pre-lock (Steiger z=1.00/p=.317 on 38 shared senators from shipped fitted scores, scratchpad `n_ceiling.py`): ruled a look-fragment by the constraint audit; VOID, never cite; no prereg contaminated. Also do NOT compute criterion-reweighted E/A panel r outside a locked prereg (same class). Citable N numbers remain the shipped .374/.123 + gate math + cross-panel agreements.

**Audio (Task 2):** production blocked at 0 profiles solely by the two-independent-reviews identity gate (`b5_audio_reviews_v2.json` empty); hearings have NO audio path at all (govinfo text only). NO acoustic voiceprint system exists: the remembered "voiceprint verification" is caption-text+Haiku (`b5_audio_verify.json`; now 2,192 clips/1,761 keep/148 MISMATCH negatives). Design presented (workflow judge, verification-first backbone): CHECK-T transcript/caption alignment x CHECK-A ECAPA-TDNN verification vs an enrollment bank, AND-rule fail-closed, verification-never-identification, witnesses as in-situ negative controls (member-match on a witness turn = whole hearing excluded), pilot P0-P5 with EER<=5%/0-of-100 listen-check bars, MODE B default (machine dual-check only PRE-FILTERS the two human reviews), 12 Paul-gated decisions (D1-D12: contract mode, venue amendment, thresholds, topic dictionary, second-source rule, legacy write-off, hearings scope, Senate source, storage, 60s-vs-180s floor, enrollment ratification, promotion). Enrollment feedstock coverage counted: **354 members** clear >=3 kept clips/>=2 events/>=180s (301 MATCH-only). Fidelity honesty: ECAPA/EER bars/faster-whisper-primary are engineering adaptations NOT from the two papers (Mestre & Ryan 2026 validated aeneas; Dietrich 2019 used caption timestamps + metadata only); within-speaker F0 z, >=50-word floor, embeddings-over-MFCC, forced-align-over-ASR ARE paper methods. Audio-as-Big-5 stays closed (Records 2 and 5); this quantity = topic-conditioned emotional intensity only.

**EXECUTED 2026-07-16 (Paul: "Optimize according to your recommendations, Test-Driven Design")** on branch `claude/gallant-gates-982203` (based on live 35b8a09): TWO one-look rounds locked @66f9772 (adversarially reviewed pre-lock; the reviewer caught an ungated `--rederive` look-leak, a ~6%-pass miscalibrated battery, and that `congestion.json` has NO party field, so covariates must come from `legislators.csv` 'Republican'/gender). **BOTH LOOKS CONSUMED, BOTH MISS; never re-run:**
- **RESULT-OW** (@0aab1f4): O criterion-weighting MISS on the insider confound partial (weighted insider r=.247 p=.051 dominant, academics .525 dominant, but partial|female,party = .028 vs academics' .231), so the insider O association is gender/party-shared variance; criterion-weighting route CLOSED under this gold (any rho1/sqrt(k)/subsetting/pooling), terminal.
- **RESULT-NV** (@0ab1368): N variant-parity MISS on the academic gate (selected 30% affective/70% pink improved BOTH panels: insiders .374->.416 p=.003 dominant, academics .123->.147 but <.20, not dominant); N-composite variant space over {affective, pink, reactivity} FROZEN under this gold, terminal. Firewalled suppression note: academic partial .389 > raw .147.
- C = documentation path only; methods **section 41** records the campaign (@c6b7837). O/C/N labels stand as `ACTIVE_ONE_PANEL_ASSOCIATION_SUPPORTED`: the two MISSes are now the evidence FOR the honest one-panel labels. Round-4 N successor (reactivity criterion) remains available at Paul's initiative (gate ~270 >= 250).

**Paul's usage ruling (2026-07-16, post-MISS):** "they are still fully usable, with no explanation needed": all five Big 5 composites stay ACTIVE in the canonical profile exactly as his 07-15 activation rule provides; the two MISSes changed no status. Interpretation boundary that still binds: the status labels (`ACTIVE_ONE_PANEL_ASSOCIATION_SUPPORTED` etc.) ride in the artifact and remain mandatory in any EXTERNAL/published claim per the docs-and-claims ledger (never "5/5 validated").

**Audio identity layer:** built TDD in the same worktree branch (`b5_audio_embed`/`enroll`/`verify2`/`diarize`/`align_turns`/`attrib` + `fetch_hearings_media` + tests + DRAFT `big5_audio_identity_prereg.md`; draft NOT locked; blocked on Paul's D1/D2/D7/D9 decisions incl. model downloads). Everything else awaits Paul per `ask-before-substantive-changes`. Workflow artifacts + probe scripts in session scratchpad (wf_ed916531-747, wf_0577fa55-ee4).

## Record 8: Desert-fill campaign, 2026-07-17 (`desert-fill-2026-07-17`; session e9080d7f-2079-4d8b-89b5-eced95034ddb)

Paul's 2026-07-17 late-night directives: "fill them" (personalities, e.g. Angie Craig) -> "fill all the deserts" -> "Start now". State landed on branch `claude/cfpb-sentiment-recorrection`.

**Shipped** (@2133640, @4b9370f; audit 127/0 after each):
1. Guarded-fallback Big-Five estimate layer: gold-anchored primary, labeled estimates fill the rest (E/O/C blue instrument; A validated-inverse-antagonism else text-A + O-halo caveat; N ONLY affective-content N; **face-invalid broad text-N never displayed**, ledger law); 0 empty panels (was 24); dial `DESK_B5_FALLBACK=0`; +2 audit guards.
2. Affective-N coverage 469->472 via `fec/extend_affective_n_coverage.py`: VERBATIM round-7b rubric recovered from workflow `interview-n-affective-facets-wf_d283ae83-8a9.js` (session clever-elbakyan); **facet source rescued from deletable temp scratchpad -> `source_data/interview_n_affective.json`, now git-tracked**; desk N-fallback reads canonical `affective_n.json` (blue's N is a lagging copy).
3. Hearing-antagonism line in the desk A-section: 456 members, fills 174/211 interview-A gaps as ITS OWN facet (label carries the r=0.16 convergence caveat; never presented as interview-A).

**Instrument-eligibility lesson (correction on record):** the "46 fillable N" conflated floor-speech words into an interview-only instrument; true eligibility (>=6 substantive interview turns) = 3 (Carter/Johnson/Correa). Always re-derive eligibility from the instrument's own code before promising coverage.

**In flight:** `fec/speech_n_genre_study.py`: speech-genre (CREC+CHRG) affective-N for ~47 desert members, bar PRE-DECLARED in FIX_CAMPAIGN_LOG entry 009 (Spearman rho>=0.40 vs interview-based affective_n on dual-coverage members; one-look guard; ships labeled estimates ONLY on PASS).

**Standing facts:** interview collectors refresh on a **3-week cadence** (Paul; last corpus 2026-07-11 = in-cycle; never assume staleness = neglect, and don't run manual collections). Locked walls honored, NOT bypassed: round-9 A facet emit hard-pins its source sha (extension = amendment + re-measured reliability + Paul's new fingerprint); comm-style v1 = `LOCKED_ACCEPTED_MEASUREMENTS_DO_NOT_REFIT`; roles v2 = prereg+battery-gated. Conversational dominance/comm facets are structurally unfillable without recorded conversations (construct needs an interlocutor); future option = hearing-based interaction instrument (hearings have turns). Subagent spend limit HIT that night: workflows/agents unavailable; everything ran inline. Campaign log: `FIX_CAMPAIGN_LOG_2026-07-16.md` (entries 004-009).

## Record 9: A and E are the two Senate-gold-anchored top-tier traits; stance curve awaiting gate, 2026-07-18 (`gold-anchored-a-and-stance-curve-2026-07-18`; session b43517bc-e66d-4d1f-bd1b-74f40f639a4d)

**THE INSTRUMENT ANSWER (Paul asked "which is senate gold validated and most accurate?"):** `big5_gold_anchored.json` (schema big5-gold-anchored-v2), anchored to the published expert panel *Personality on the Hill* (129 Senate insiders + 125 academics, in `big5_senate_expert_gold.json`), leave-one-member-out channel-weight selection. Per-trait activation differs and it is LOAD-BEARING:
- **E and A = `ACTIVE_EXTERNAL_GOLD_ANCHORED`**: both panels clear association AND strict-discriminant gates. These are the two best-validated traits in the system.
- O, C, N = `ACTIVE_ONE_PANEL_ASSOCIATION_SUPPORTED` (single panel; strict_discriminant may be empty).
- A's selected channels = `blue_low_antagonism_a` 0.1 + **`pink_observer_a` 0.9**; coverage 317/533. `cross_party_cooperation` WAS a candidate A channel and the LOO validation DECLINED it: direct evidence that coop is not a good A indicator.

**MY ERROR TO NOT REPEAT:** I first told Paul Klobuchar's high A was "one instrument's opinion / LLM outlier, behavior-calibrated instruments put her mid-pack." WRONG. Gold-anchored A = 1.299, rank 23/317, **93rd pct**: his premise was right. The pink/LLM channel carries 90% weight *because gold validation selected it*. Do NOT reflexively discount pink for A. (Distinct from the audit record's "instrument 3/5 (O/C/E)": that is the SEPARATE Blue behavioral instrument look, not this multitrait gold anchor. Don't conflate them.)

Klobuchar reconciliation (coop low, A high) stands on: `coop_v2` is CU-bill-scoped and thin (n_m=16 joins, 95% CI [3.5%, 36%]); `c3_recip` rank 13/290 = high BONDING, low BRIDGING, and c3 is excluded from the composite by design; old volume-entangled `cooperation_z` put her 60th pct vs `coop_v2` 13th.

**WORK PENDING PAUL'S GATE** (branch `codex/stance-curve-gold-tier`, worktree `C:/Users/pgoff/AppData/Local/Temp/claude/cxwt-stance-gold`, UNCOMMITTED, nothing regenerated):
1. `stance_rules.py`: `LEGISLATION_SQRT_SCALE_BY_DOMAIN = {MBL: 3.5, Mortgage & Housing: 3.0}` + `legislation_scale()` + `STANCE_LEG_SCALE=legacy` revert dial. Root cause of champion bloat: uniform sqrt scale 2.0 saturates the legislative channel in the two highest-volume domains (79 bills/1517 joins; 62/1091), and `combine_evidence` renormalizes over present sources so legislation-only members hit 1.0.
2. `per_category_stance.py`: one edit: `SR.legislation_scale(lab)`.
3. NEW `fec/stance_scale_sweep.py`: advisory read-only sweep with parity self-check.
4. `make_member_desk_00.tpl`: renders gold validation TIER (diamond-filled two-panel vs diamond-outline association) from the already-shipped `gold_trait_status`, which the tpl previously ignored; that display gap is why "extremely high A" looked unvalidated.

Measured effect if regenerated: MBL champions 282->114, Mortgage 159->68, total champion cells 1269->992 (audit bar <2000), 481/9594 cells change, 73 of them OUTSIDE the two domains via the anti/gen fixed-point cascade. Kernel tests 72/72.

**FALSE ALARM TO NOT RE-RAISE:** curving does NOT break `audit_full`'s "proven cells must be Champion/Defender". `moneyball_core.cap_uncorroborated` (~line 400) only appends to `proven` when the tier is ALREADY Champion/Defender, so proven is a subset of C/D and is recomputed every run. Comparing candidate matrices to the PUBLISHED gate sets is the error. Empirically verified: 397 recomputed proven cells, 0 violations.

Sweep fidelity bound: at the published scale it reproduces 9,593/9,594 cells; the one gap (Glenn Ivey, Mortgage) is the global gen fixed point settling differently outside the producer; raw scores match exactly. Champion counts are exact, so it is sound for picking scales, but `per_category_stance.py` is the authority.

## Record 10: Cooperation-vs-A sector probe (Codex lane), 2026-07-18 (`coop-sector-probe-2026-07-18`; last modified 2026-07-19; session b43517bc-e66d-4d1f-bd1b-74f40f639a4d)

Paul's /codex task 2026-07-18: "analyze cross-party cooperation, is it aligned with agreeableness? Or dependent on the policy sector?" Ran the full `codex-executor-lane-2026-07-18` protocol (spec -> Codex build -> 2 revision rounds -> Claude review -> live-tree read-only runs).

**Deliverable:** `fec/coop_sector_probe.py` (932 lines): criterion-side ONLY (no instrument loaded -> NO look consumed/risked, coop_v2 precedent class), allowlisted inputs, `--selftest` (4-world plant battery: PERSON/SECTOR/INTERACTION/MIXED, 13/13 PASS), `--run` gated, atomic `--out`. **UNCOMMITTED** on branch `codex/coop-sector-probe`, worktree `C:/Users/pgoff/AppData/Local/Temp/claude/cxwt-coop-sector`. Reports in session scratchpad (`coop_sector_probe_report*.json`). Paul's gate: keep/commit vs discard, NOT decided at time of writing.

**Results** (archive 20260624, congresses 117-119, 4,345 deduped qualifying joins, 172 members >=10 joins; CU-relevant bill universe only):
- Parity anchor: recomputed c2 vs shipped `coop_v2` `c2_xshare_z` r=1.000000 (n=315).
- Sector base rates: massive heterogeneity: Interchange .60, NCUA B&I .485, Mortgage .38 ... CFPB .056, Credit Card Mandates .011, Payments .000. Party x sector FLIPS: NCUA B&I R .76/D .22; CU Capital D .51/R .17; Tech D .39/R .10 (who crosses depends on sector agenda composition).
- Variance decomposition (floor-5 grid, 45 members x 7 sectors): person eta^2 .61 DOMINANT, sector .26 (perm p=.006), interaction/resid .13 (p=.71 n.s.).
- S6 crux (200 seeded reps, identical join pools): sector-split SB .363 vs item-split SB .562 -> ratio ~ .65: **a member's bridging standing is ~2/3 sector-general, ~1/3 sector-specific.** Selftest calibration: pure-person ratio ~1.0, pure-interaction ~0.
- Sector-mix-adjusted x_m vs raw r=.85; volume r~-.12 (volume-free holds); c3 bonding anticorrelation -.25 replicates.
- S5 sector-pair correlations VOID-for-coverage (no pair >=25 common members even at floor 5): coverage limit, not evidence.

**A-answer** (ledger unchanged, per the audit record + the A open-search record): text-A vs coop = +.183 criterion-valid NOT discriminant, stands. The probe adds: the criterion itself is mostly-general-disposition + real sector mains, consistent with a partly dispositional (A-role bridging) core, but sector context is a genuine moderator. Any sector-resolved A instrument x criterion look stays behind round-5 DIAGNOSTIC-GATE + round-6 anti-basis-shopping + fresh prereg. Follow-up options offered (all Paul-gated): super-domain grouping to power S5/S6 pairs, committee-referral sector axis, `coop_v3` sector-adjusted criterion candidate.

**Ops lessons (codex lane):** (1) the first mcp codex call idle-timed-out at 3600s but Codex HAD FINISHED: artifact on disk, response lost; check worktree file mtimes before re-dispatch; a fresh thread is fine for revisions when threadId is lost. (2) `git worktree add` into the deep scratchpad path fails Windows MAX_PATH on `.claude/skills/...`: use short `C:/Users/pgoff/AppData/Local/Temp/claude/<name>`. (3) My original SECTOR-world selftest assertion was theoretically wrong (equal-mix worlds carry no person variance, so the SB ratio is undefined); the battery caught it; the INTERACTION world is the right construct for the SB-ratio test.
