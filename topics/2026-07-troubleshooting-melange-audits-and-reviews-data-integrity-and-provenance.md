---
type: topic
title: "Data-integrity audit (07-01) and the data-rules provenance census (07-10) (Melange audits and code reviews)"
aliases: ["Melange audits and code reviews: Data-integrity audit (07-01) and the data-rules provenance census (07-10)"]
category: "troubleshooting"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/troubleshooting"]
part_of: "[[2026-07-troubleshooting-melange-audits-and-reviews]]"
---

# Data-integrity audit (07-01) and the data-rules provenance census (07-10) (Melange audits and code reviews)

> The data-integrity audit of 2026-07-01 on the bills archive, the cosponsor network and the stance-stack plan, and the data-rules provenance census of 2026-07-10. Part of [[2026-07-troubleshooting-melange-audits-and-reviews]] (project [[melange-systems]]).

## Data-integrity audit 2026-07-01: bills archive + cosponsor network, and stance-stack plan (`moneyball-data-audit-2026-07-01`)

Data-collection audit 2026-07-01 (bills + cosponsor network; sentiment redesign brainstormed, implementation pending Paul's approval). The stance-stack design continues in CU stance and sentiment scoring.

**Verified clean:** bill-to-member names 10,974/10,986 exact (10 unmatched = Stacey Plaskett VI delegate, correct; 0 ambiguous picks); CFPB directions 43/43 archive bills covered by `cfpb_bill_directions.csv` (49 pro / 6 neu / 5 anti); network 0 self-loops / 0 exact dups, weights 0.03-6.34 median 0.20 (consistent with +6 half-sat); 340 dropped edge rows = 139 departed-member bioguides (correct); coverage 511/533 leg, 492/533 network.

**Findings (ALL Paul-approved and FIXED 2026-07-01 evening):**

- **D1 FIXED:** bills archive copied into the Melange root (`congress_bills_archive_20260624_115822.xlsx`); the builder glob works again.
- **D2 FIXED:** 41 reverse-dup edge pairs had DIFFERENT directed weights (up to 3x); mean-symmetrize patch applied to ALL NINE loaders (7 live + `assemble_viz` + `method_audit` - identical load line). Pipeline regenerated; optimize base moved 119.95 to 119.80 (tiny, as expected); audit 32/32 clean.
- **D3 FIXED:** `bill_directions.csv` created (all-category per-bill direction registry, seeded with the 60 CFPB entries; Direction 1/-1/0). `build_archive_legislative.py` consults it FIRST (any category), then falls back to section defaults. **Bonus bug fixed: "0"-direction bills were mis-signed -1** (6 CFPB bills; Lummis/Tim Scott CFPB +7.8 to +9.7, Omar/Craig phantom-negatives removed). The registry is bill-level (applies in every section a bill appears - 31 cells changed). `archive_leg.json` rebuilt (backup `archive_leg.PRE-D3.json`); NOT consumed live - effects flow at the next stance-matrix/leg-raw rebuild. **CAVEAT: `billkey` ignores the Congress number (pre-existing) - add a Congress column when data collection re-pulls.**
- **D4 (limitation):** isolated-41 = LEADERSHIP (Hoyer, Clyburn, Scalise, Jordan, Jason Smith) + freshmen - leadership does not cosponsor by norm, so it is invisible to the network channel. Future: a 2nd graph layer from Committee Data co-membership.
- **D5 (latent):** `seccat` first-match substring could misroute hybrid section names; `matchmember` ambiguous fallback returns `c[0]` arbitrarily (0 hits today) - tighten to None.

**Sentiment redesign ("stance stack") - brainstorm delivered, refs verified:** PSRM 2024.35 = Burnham "Stance detection: a practical guide" (NLI/entailment, hypothesis templates, PoliBERTweet domain models, sentiment != stance, synonymous-hypothesis validation, avoid proprietary-LLM-as-primary); arXiv 2410.07083 = Stanceformer (target-aware attention matrix, needs target spans + labels, github.com/kgarg8/Stanceformer); ICCK RoBERTa-vs-classical article 403-blocked (ask Paul for the PDF).

**S1 v2 + API PRE-LABEL (2026-07-01 night, Paul-directed):** queue REBALANCED per Paul's spec ("many members, all issues, all stances"): `build_gold_queue.py` v2 gives **312 items, 171 members (cap 3/member), all 19 press categories** (incl. Credit Union Tax Status - 190 rows exist in the press source - and CU-Bank Competitive Dynamics), stances 56 opp / 139 sup / 117 neu, regression cases forced in. `fec/api_prelabel.py` = Claude API pre-label pass (claude-opus-4-8, adaptive thinking, effort medium, structured JSON via `output_config.format`, 8 workers, resume-safe): **312/312 labeled, 0 errors, $3.83**. Fills api_* cols + pre-seeds gold_* for correction-in-place; `debate_vs_api=DISAGREE` flag. **RESULT: DEBATE disagrees with the API on 153/312 (49%)** - incl. 20 full sign-flips (e.g. Barr "void CFPB late-fee rule": DEBATE oppose to API support via valence; Kim "defend CFPB": DEBATE support to API oppose), 48 "unrelated" (a class DEBATE lacks), ACU third-party-voice correctly de-attributed (Foster/Moore tax-status, Loudermilk/Hauptman). API distribution: 125 sup / 104 neu / 35 opp / 48 unrel; conf 102 hi / 116 med / 94 lo; attribution 212 member-own / 35 reported-action / 65 third-party. Paul now adjudicates `gold_*` (priority: DISAGREE + low-confidence rows), then `stance_eval.py model_stance` vs `stance_eval.py api_cu_alignment`. NOTE: Paul's API key was pasted in chat 2026-07-01 - remind to ROTATE at console.anthropic.com (key material not recorded).

**S1 BUILT (2026-07-01 evening, the first queue):** `fec/build_gold_queue.py` writes `gold_label_queue.csv` (Melange root): 533 items = FULL oppose census (194) + 174 support + 165 neutral; slices cfpb 80 / interchange 60 / creditcard 60 / bigbank 60 / acu 120 / lowconf 80 / regression 23 (from `CU_Confusion_Articles.xlsx`). Richer gold schema: `gold_target`, `gold_stance_toward_target` (support/oppose/neutral/UNRELATED), `gold_target_cu_valence`, `gold_cu_alignment`, `gold_attribution` (member-own / reported-action / third-party-voice). Paul adjudicates the `gold_*` columns. `fec/stance_eval.py [pred_col]` = harness: per-class P/R/F1 + macro-F1 + per-channel/per-slice + confusion; scores any prediction column (append nli/stanceformer/llm cols later). ICCK paper actual identity: Khan et al., IECE TACS 2025 - Roman Urdu tweets, Agree/Disagree/UNRELATED, classical ML <=94% vs fine-tuned RoBERTa 97% on balanced clean labels; takeaways adopted: "unrelated" as first-class label, macro-F1 headline, fine-tune only after labels are clean.

**Design:** factorize member-alignment = stance(actor to target) x valence(target to CU). Layers: (1) target-valence registry csv (Paul-owned; fixes the CFPB / big-bank inversion + transitive stances; merges with D3); (2) NLI zero-shot stance core with hypothesis templates; (3) LLM CoT attribution extractor (actor, action, target triples - fixes ACU articles; recovers the 819 dropped third-party rows as a separate "reported actions" evidence channel, press pillar stays own-domain); (4) Stanceformer fine-tuned sublayer once gold labels exist; cascade = valence-lexicon, NLI, LLM arbiter, human overrides, provenance via `stance_src`. Labels: richer schema (target, stance-toward-target, valence, alignment, attribution), stratified gold set oversampling CFPB / Interchange / CCM / implicit cases, macro-F1 + per-slice confusion, sign-flip regression suite from `stance_audit`. Phases: S1 gold + harness; S2 valence registry (+D3); S3 NLI benchmark; S4 attribution extractor; S5 Stanceformer + cascade + reflow.

## Data-rules provenance census (2026-07-10, `data-rules-provenance-2026-07-10`)

Provenance census of collection/processing rules (audit session 2026-07-10, branch `claude/data-collection-rules-audit-e240c0`). Method: git archaeology over all branches + CCD transcript search (`search_session_transcripts`) to verify claimed user quotes. **Transcript search is the arbitration tool when "did Paul ask for this?" is disputed; commit-message attribution alone is NOT evidence** (every commit is authored "Paul Goff" with a Claude co-author; only verbatim `user: '...'` quotes correlate with real directives, and even an unquoted "user directive" claim can be TRUE - 063a47a was verified true via transcript).

**VERBATIM-VERIFIED user directives:** interviews campaign c6cd80d (B&L "see where they source the interviews"), Fox c6c1d8a, Hewitt 8077d4b, co-appearance a693ae0, CHRG window 60 to 400 d 850f129, coverage sweep 30bd671, supervisor delegation a3d7cce ("Do whatever is best for the data collection"), dedup guard e29ad25, MS NOW 9467fcc ("Get MS NOW, more data the better"), hearings-antag 063a47a + DW-NOMINATE a7ab015 (see `hearing-antagonism-2026-07-10`), Vote Smart (prereg user-gated), Quorum spec 07-01, `C_INT_W=2` (GATE-2 ratified).

**NOT asked for (session choices, disclosed but never user-requested):**

1. **Miller & Sutherland hearing cutoff-RECEIVED exclusion**, `interaction_features.py` - THE rule Paul flagged; entered 07-04 via 57e4cf9 umbrella; his call whether it stays.
2. **`big5_llm` `GENRES=CREC,INTERVIEW`** - hearings TEXT excluded from the LLM instrument (lexical `big5_traits` DOES include CHRG by default) - a second hearings-don't-count rule, never surfaced to Paul before.
3. nprfeed leg 50c56db (merged to main, no attribution, recorded dead end).
4. NPR/CBS/ABC/PBS legs 10fd375 + 22cb921 (arguably covered by the B&L mapping directive).
5. PBS/NPR backfill 5a7bd29.
6. `retiring_members.txt` exclusions 3e03ac7 (Plaskett, Armstrong).
7. Recon-GO institutional legs (Axe / CSIS / CFR / AEI / Aspen, Cato excluded) - stranded, unmerged.
8. FINRX finance-only CHRG filter = baseline 62a209e (project domain scope).
9. All engineering floors (150-char CREC, 8-word interview, 1500-token lowconf, 2000-word LLM min, dedup keys, drop-never-guess attribution) = session craft, disclosed in docstrings.

**Standing risk this audit names:** commit messages sometimes narrate authorization ("user correctly flagged", unquoted "user directive"). House rule going forward: quote the user verbatim in the commit message for any user-directed rule; anything unquoted = treat as a session choice until transcript-verified.
