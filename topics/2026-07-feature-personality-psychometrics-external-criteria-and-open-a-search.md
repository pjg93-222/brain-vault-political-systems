---
type: topic
title: "Record 6: external criteria for N (RKH, the Danish correction) and the open A search (07-12) (Personality psychometrics)"
aliases: ["Personality psychometrics (Big Five): Record 6: external criteria for N (RKH, the Danish correction) and the open A search (07-12)"]
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

# Record 6: external criteria for N (RKH, the Danish correction) and the open A search (07-12) (Personality psychometrics)

> Record 6 of the Big Five program (2026-07-12): the RKH external validation of N, the Danish and European criterion correction, and Paul's standing open-ended A validation search. Part of [[2026-07-feature-personality-psychometrics]] (project [[melange-systems]]).
> Newest wins: the program's current state is kept in [[2026-07-feature-personality-psychometrics]] (Context, "Where the program stands"); where a record differs, that summary governs.

## Record 6: External criteria for N and the open A search, 2026-07-12

### RKH external validation (`rkh-external-validation-2026-07-12`; session 5de467cc-ab64-4d93-9b03-685e79741b10)

Paul pushed ("get that criterion validation — there should be at least one article with stored data"). There was: **Ramey/Klingler/Hollibaugh "Measuring Elite Personality Using Speech" replication data on Harvard Dataverse `doi:10.7910/DVN/JDH6KR`**: per-member Big Five estimates for US House, independent team/method, scale anchored to human-observer ratings. File `HouseNPATwithPers.tab` (real ICPSR; NOT `LifetimeMeansHouse.tab` whose "icpsr" col is a 1..916 row index: trap). Join: my member -> bioguide (`congestion.json`) -> icpsr (`votes/HSall_members.csv`) -> RKH. **n=147** current members overlap (served 1996-2014 House). Join verified by name (Sanders stable both; F. Wilson high-N both).

**THE RESULT (mixed, partly unfavorable; do not spin):**
- **`big5_v3_hybrid` text-N vs RKH Emotional-Stability: r = -0.22 (p<.01); -0.25 with E partialed from both.** Genuine, significant external N convergence, robust to E-removal, so not shared animation. Per `danish-external-criterion-2026-07-12` research, no one had shown text-vs-independent-benchmark N on US Congress before: first of its kind.
- **Promoted affective-N (Record 5) vs RKH-ES: r = -0.11 raw, -0.04 E-cleaned: ns.** The E-residualized affective-facet re-anchoring does NOT recover the external N estimate; the broader text-N does. Gap is confound-controlled (same join/era/genre), so real.
- RKH-ES is itself contaminated: internally +0.43 with RKH-E, +0.48 with RKH-A (desirability halo), an imperfect criterion that attenuates. Cross-era (scores 15-25 yrs old), cross-genre (floor speech vs interview), n=147 range-restricted. Overall diagonal weak (O,E ~ 0).

**BROAD-N SWAP: REJECTED, DEFINITIVELY (2026-07-12, after Paul probed "is Mike Johnson near the top? does he use pessimistic language?"):** I re-ran RKH CORRECTLY (canonical harness `fec/validate_big5.py` + `fec/liwc/rkh/congressbios.tab` `*_avg` cols; my first pass used the WRONG file `HouseNPATwithPers.tab`). Canonical: big5-ES vs RKH +0.23 (strongest of all traits; O=+0.00, C=.07, E=.14, A=.14), affective-N -0.03 (null). Built candidate `broad_n.json` (E-resid big5-N): passed 4/5 deterministic gates. THEN it collapsed: (1) Mike Johnson ranks #5 in broad-N but his LLM pessimism=15 and his "threat" language is STRATEGIC/POLICY ("dangerous time, global threat"), not personal affect; broad-N conflates threat-rhetoric with N; (2) a FRESH holistic big5-N scored on interview halves (split-half SB .95, highly reliable) correlates **r=+0.01 with `big5_v3_hybrid`-N**, so the base of broad-N DOESN'T REPRODUCE; (3) the fresh reliable holistic-N is face-valid (Fetterman #1, Higgins hi, Johnson #404 low), agrees with affective-N (r=+.32), and does NOT converge with RKH (-.03). CONCLUSION: two ORTHOGONAL N's: interview *personal-affect* N (affective-N + fresh holistic-N: reliable, face-valid, agree, no RKH) vs *speech-based political-negativity* N (`big5_v3_hybrid` + RKH: converge with each other via genre/construct match, conflate threat-rhetoric w/ N). The engine needs personal-affect, so affective-N STANDS, broad-N REJECTED. RKH is NOT a valid external benchmark for personal-affect N (measures a different construct), so "no external validation" is a construct-mismatch diagnosis, not a defect. Byproduct: the fresh holistic interview-N (SB .95) is arguably a cleaner N-slot than the 4-facet affective-N: the ONLY sanctioned future refinement direction; broad/speech-N is not. `emit_broad_n.py` + `broad_n.json` are rejected candidates (engine unchanged, RECEPT_N=affective).

**Why it matters / how to apply:** (1) "no obtainable criterion" is now FALSE for convergent validation: RKH data is open, same-population; use it. (2) SWAP-TO-BROAD-N QUESTION: RESOLVED, DO NOT SWAP (2026-07-12, Paul "make most optimal"): the head-to-head candidate test showed the E+party-residualized broad text-N ("C") IS externally RKH-convergent (-.24 sig) AND E-clean (-.04), BUT it is FACE-INVALID (ranks Speaker Mike Johnson #3 most-neurotic; top-N dominated by thin-data 2024 freshmen, noise amplified by z-scoring, no data-sufficiency filter) and ORTHOGONAL to affective-N (r=+.03, so at most one is valid N). So C's RKH convergence is ARTIFACTUAL (shared text-method/halo variance between two contaminated text measures; RKH-ES itself E+.43/A+.48 haloed), NOT N-validity. Affective-N STANDS as optimal: wins on every trustworthy criterion (face valid: Clay Higgins #1; robust >=800-word filter; reliable .91/.907; E/party-clean; PoliPers-convergent). Engine UNCHANGED. (3) The real lesson: convergence with a contaminated benchmark is only validity evidence if the measure is ALSO otherwise sensible; C isn't, so discount it. Affective-N's clean external validation remains UNACHIEVED because NO adequate same-population benchmark exists (RKH "validates" a face-invalid measure, so RKH is inadequate as N criterion), not because affective-N is wrong. (4) Grade: unchanged A- absolute / top-of-class; the external-validation box stays unchecked for the deployed measure, reason now diagnosed (no adequate benchmark). Data cached in scratchpad `HouseNPATwithPers.tab`.

### Danish / European external criterion: CORRECTION (`danish-external-criterion-2026-07-12`; session 5de467cc-ab64-4d93-9b03-685e79741b10; memory type feedback)

Paul (frustrated) pointed to Danish articles he'd given as an external criterion after I claimed twice that "no external N criterion exists / self-report is impossible for political elites." He was right; I was wrong on the general claim.

**The correction (durable):** external elite politician self-report Big Five / HEXACO data EXISTS, routinely, in European parliaments; it is *US Congress specifically* that lacks it (US culture + nonresponse-is-N-correlated), not political elites universally. Concretely:
- **Norgaard & Klemmensen (2019)**, *J. Personality* 87(2):267-275: NEO PI-R, **N=60 Danish MPs**, incl. Neuroticism. MPs higher on E/C/O than voters.
- **Schumacher & Zettler (2019)**, *PAID* 141:173-181, "House of Cards or West Wing?": Brief HEXACO, **N=24 Danish politicians**, incl. Emotionality/Emotional-Stability. Politicians score higher on all Big Five incl. ES.
- **Polipers systematic review** (Lechner, Aichholzer, Birkenmaier & Bluemke 2025, "Mapping the Political Personality," v0.1, GESIS) codes **~20** politician-personality studies: **16 self-report (PS-R), 4 expert-rated (EXR)**; countries US6/UK5/DE2/BE2/DK2/IL1/IT1/CA1. PDF: `~/Downloads/Lechner et al. (2025) - Polipers - v0.1.pdf`; full text dumped to scratchpad `polipers_full.txt`.

**Why it matters:** SUPERSEDES the audit record's "ES routes exhausted / no gold-standard N criterion" framing *as a universal statement*. Re-opens external validation via **cross-national method-transfer** (apply the text method to named European politicians' speech, correlate vs their self-report).

**Key caveat (cuts both ways):** elite self-report INFLATES emotional stability / desirable traits (social desirability; Schumacher & Zettler), so even the "gold" self-report criterion is biased for N/ES; a behavioral/text measure may be *less* biased, not more.

**Convergence already found (my data):** Polipers independently derived N-facets **"Pessimism & Doubt"** + **"Poise & Composure"** (neg-emotion/volatility under stress), which MATCH my affective-N facets (pessimism/anxiety/depression/volatility). My 4 facets cohere as one N domain: **Cronbach alpha .911, 1st PC = 79%, mean inter-facet r .72** (n=469). Split-half of the promoted measure **r_sb .907** (n=446 full sample, 95% CI .881-.928; a salvaged n=141 partial had read .931): the Record 5 measure is highly stable, not just internally consistent.

**How to apply:** never again say "no external criterion exists" flatly; say "none for US Congress; European self-report exists and transfers at the method level." Obtainability of the Danish data for an actual correlation was being chased in workflow wf_cf13e766 (Schumacher-Zettler OSF? named vs anonymized? Folketing speech linkage?); check that outcome before claiming a correlation is/isn't runnable. Relates to `psych-audit-2026-07-09`, `dont-drop-context-anchor-memory`.

### Open-ended A validation search: Paul's STANDING directive (`a-validation-open-search-2026-07-12`; session 518eaa09-18bb-4b49-a29f-f8f86498b199; memory type feedback)

Paul, 2026-07-12, angrily: "Stop this settling bullshit... You are going to look for a better validation of A, review the fucking corpus. You will look until I tell you to stop looking."

**Why:** I repeatedly "settle": cite the kill-ledger, call A routes CLOSED (assent MISS, NPAT underpowered), recommend keeping the status quo, and stop. Paul reads that as giving up. He is directing NEW, open-ended research on Agreeableness and it runs until HE ends it, not until I hit a documented "closed."

**How to apply:**
- The A-route "closures" in the kill-ledger (audit record, `big5_methods.md` section 18) do NOT bind this search; Paul (repo owner) explicitly reopened it. Do not reflexively re-close.
- Actually review the corpus language (INTERVIEW/CREC/CHRG in `social_media.db`) for genuine-agreeableness markers; test candidate criteria/constructions; keep generating avenues.
- Keep going across turns; only stop on Paul's word.

**Factual anchors (do NOT overclaim; Law 12):** current honest A state = "criterion-valid, NOT discriminant" (`big5_methods.md:389,430`): A predicts the cooperation criterion (Pink-A partial r +.10 controlling ES; supervised +.183 perm-p .0004). The "5/5" Paul remembers = **reliability 5/5** (all traits split-half solid, A .80/.60) and **known-groups 5/5** (party signs all consistent incl. A). The **discriminant/diagonal-dominance was 3/5 = O/C/E only**; A's halo (O-A r=.865 in Blue v2; A-ES .653 in Pink) is the discriminant failure. So "we had 5/5" is TRUE for reliability+known-groups, NOT for discriminant. Never say "5/5" unqualified.

**PROGRESS (2026-07-12, round 1 of the open search):** Built a purpose-designed genuine-warmth LLM instrument (5 facets: consideration/graciousness/warmth-to-nonallies/empathy/non-contempt; openness & extraversion rated separately to partial out), scored 2 independent ways on 177 RKH/NPAT-overlap members. RESULT: inter-method reliability r=**.936** (construct IS reliably recoverable, unlike big5-A which is incoherent with communion/antag), face-valid (Al Green 74, Andy Harris 34, Barr 37, Schiff 40-contempt-to-opponents), and distinct from big5-A (r=.13). BUT external convergence still weak: vs RKH-A +.087 (holistic +.12), vs NPAT-A +.11; resid-on-O vs RKH-A = **+.061** (big5-A resid-O was +.029: marginally better, still null at n=146). Diagnosis: the instrument works; the CRITERION is the problem: RKH-A & NPAT-A are themselves O-halo'd (NPAT-A x NPAT-O=+.35; big5-O predicts RKH-A +.138 >= big5-A's +.135). Parallel to affective-N: a clean measure need not converge with a contaminated benchmark. NEXT: find a non-O-halo'd A criterion (behavioral: reporter-cordiality, credit-to-opponents, casework-empathy counts from corpus; NOT cosponsorship). Also: PINK (`big5_llm_opus`) is uncorrelated with Blue (v2) at member level on EVERY trait (O r=-.044, A +.23, C +.16, E +.03, N +.06), 53% opposite-sign on O; the dashboard "overlap=✓agreement" framing is FALSE.

**MAJOR REVERSAL (2026-07-12, verified 3 ways): "Pink is noise / keep Blue drop Pink" was WRONG; validity is TRAIT-DEPENDENT.** External RKH convergence (human-anchored, n~147): O Pink +.111 / Blue -.03; C Pink +.174 / Blue +.046; E Pink +.044 / Blue +.123; A +.121 / +.128 tie; ES Pink +.041 / Blue +.233. **Pink wins O & C; Blue wins E & ES; A tie.** On OPENNESS specifically, THREE independent signals agree Pink>Blue: (1) blind text O-adjudication of 100 serious disagreements sided Pink 42 vs Blue 14, HIGH-conf 12-0 Pink; (2) Pink-O converges external RKH-O +.111 vs Blue-O -.03; (3) blind reader also converges RKH-O +.088. Face-valid: McClintock/Cotton/Crenshaw/Todd Young read high-O in text, Pink says high, Blue says LOW; Blue is wrong. MECHANISM: Blue's behavior-calibration DEGRADES O & C (no good behavioral proxy) vs raw Pink LLM item-read. So do NOT globally drop either; the earlier "drop Pink keep Blue" recommendation is RETRACTED. (Sig caveat: only Pink-C +.174 & Blue-ES +.233 individually sig at n~147; Pink-O +.111 ns alone but corroborated by blind adjudication.)

**Levers to try:** `agency_communion.json` (communion ~ warmth, could decorrelate O-A by construction; section 15 line 319-320 flagged this); a "genuine warmth vs performed courtesy" acting-vs-actuality cut analogous to affective-N/antagonism-v3; alternative behavioral A criteria beyond cosponsorship (gratitude/credit-giving, yielding, casework); RKH lifeAgree external (n=147). Supersedes the "A routes exhausted, never propose" line in the audit record, for THIS search only, under Paul's direction.

Memory file descriptions (kept as recorded): danish-external-criterion: "CORRECTION — external elite self-report politician-personality data EXISTS (Denmark/Europe); my \"no external N criterion / elites can't self-report\" was US-Congress-specific and wrong as a universal claim". rkh-external-validation: "FIRST real external criterion validation obtained (RKH Big Five of Congress, same population) — N construct converges modestly (r-.25, sig) BUT promoted affective-N does NOT; broad text-N does".

## Related Topics

- [[2026-07-feature-personality-psychometrics-audit-dependability-and-n-reanchor]] — Records 2, 3 and 5 of the Big Five program: the psych framework audit with augment rounds 1-6 and sweeps (2026-07-09 to 08-14), the disposition dependability audit and canceled expert panel, and the N-slot re-anchor to affective-N.
