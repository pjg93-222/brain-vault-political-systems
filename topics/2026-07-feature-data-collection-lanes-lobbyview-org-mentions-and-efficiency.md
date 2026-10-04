---
type: topic
title: "LobbyView lane: org-mention measurement, industry-family UI, efficiency layers (08-07/08) (Melange data-collection lanes)"
aliases: ["Melange data-collection lanes: LobbyView lane: org-mention measurement, industry-family UI, efficiency layers (08-07/08)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-10
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-data-collection-lanes]]"
---

# LobbyView lane: org-mention measurement, industry-family UI, efficiency layers (08-07/08) (Melange data-collection lanes)

> The LobbyView lane of 2026-08-07/08: the org-mentions audit and fix rounds, the shipped org-mention measurement, the industry-family UI cleanup, the efficiency layers, and the CU-set ruling with the round-4 overnight run. Part of [[2026-07-feature-data-collection-lanes]] (project [[melange-systems]]).

## LobbyView / LDA integration lane (2026-07-31 to 2026-08-12)

### ORG-MENTIONS AUDIT + FIX ROUNDS (2026-08-07/08)

Paul: "check integrity, false positives, coverage gaps, tonality".
- 4-lane audit found the v1 artifact was 79% noise from ONE class: `_alias_variants` slash-split minted bare Tier-A aliases (CALIFORNIA 4,136 docs / STRATEGY 1,957 / MARYLAND 996), tier-B self-qualification void, and qualifier-gate leakage in a financial corpus.
- THREE fix rounds plus a perf round (the corroboration re-scan made the producer 68+ CPU-min; two-pass in-memory resolution restored ~6 min - KILL a grinding chained producer, do not wait).
- Final state measured by full re-audit: ~96%+ document precision, FN 4.8%, zero genuine loss among killed orgs; VISA's Mastercard-anchor risers all genuine.
- `STRICT_TIER_B` = {BLOCK, LEDGER, WISE, BETTERMENT, PARADIGM, SQUARE}: same-family NON-STRICT-alias corroboration only (two bare strict tokens NEVER corroborate each other - the family merge briefly let block+square mutual-vouch, 21 fake floor docs, caught by an alias-attribution probe).
- Org FAMILY merge by suffix-stripped key plus explicit map (Coinbase 3 rows to 1, Block trio to 1) also fixed same-doc DOUBLE-CREDIT; coined slash tokens re-admitted (MICROSTRATEGY/OKX/A16Z).
- Receipts added: press `universe_note` (CU-culled corpus = 0.63% of the 249,769-release index, 242/533 members zero press - THE big silent gap, now disclosed), bluesky 33/533, tweet vintage, `runtime_seconds` dropped (determinism).
- **TONALITY LAW for consumers: mention volume is not rapport** - on the genuine residue, high volume is ATTACK/OVERSIGHT speech (Warren 100% adversarial in 55 tweet docs; Durbin/Marshall/Welch x Visa/Mastercard = CCCA war speech, the densest member-org-bill structure); supportive cells are the LOW-volume courtesy/endorsement ones (Barr, Emmer, Young Kim). Gooden's speech profile corroborates his CU-threat routing. Dominant bills: fintech = CCCA/interchange, crypto = CBDC/GENIUS/CLARITY, bank = overdraft-CRA, CU = overdraft.
- Paul-gate items presented not applied: ACU-vs-CUNA/NAFCU attribution window around the merger; press-corpus text expansion campaign (249k index has no text); the `residual_precision` receipt carries CIRCLE 1/5 / DAVE 1/4 / AFFIRM 2/3 / RIPPLE 4/5 accepted noise (~10 docs).

### ORG-MENTION MEASUREMENT SHIPPED (2026-08-07, Paul "build the press release and social media mention measurement")

- `fec/lobbying/org_mentions.py` writes `derived\org_mentions\mentions.json` (org-mentions-v1), chained before `make_lobby_network_html.py`; surface = "Public mentions" landing table (top-15 per sector, per-channel columns) plus company-view subsection.
- LAW: volume-only, no stance reads, moves no rank, CHANNELS NEVER SUMMED (schema has per-channel counts only, surface gate enforces no total fields), counting unit = DOCUMENTS naming, not occurrences.
- Six channels: press (member.gov ONLY - 1,569 rows), tweet (Quorum `Processed.xlsx` Members ALL-TOPIC sheet, NOT the CU-filtered csv), floor (CREC), interview (2022 floor), bluesky (verified handles only, 7,366; unverified 21,732 = aggregate receipt), x (`x_catalog` at `data\stance\`, 10-day window receipted).
- Matching: `sector_spend.ROSTERS` + `entity_identity.RESEARCHED_ENTITIES` + bridge3 CROSSWALK pins imported (never copied), tier A bare / tier B qualifier-required (common-word names) / generics never run, candidates DEDUPED across authorities by normalized name (entity wins).
- **THREE TRAPS KILLED, remember them:** (1) the ACU paywall stub contains "America's Credit Unions" - count without stripping and you fabricate ~850 mentions; (2) trade-press (americascreditunions.org, 816 rows) is ORG-AUTHORED coverage of members, NOT member speech - entity-ACU press was 2,262 before the .gov-only gate, 54 after; (3) tone-CSV dates are M/D/YYYY with 244 literal 'NA' rows (tolerate-skip plus receipt).
- Validation: ABA press = 71 exactly matched the discovery agent's independent probe; top mention members = Warren/Reed/Waters (face-valid).
- Codex ops: TWO MCP timeouts this lane - the 62-min fix-round timeout produced NOTHING on disk (inspect-not-redo has a counterexample now: always verify the diff before assuming completion); root cause = asking codex to verify against the 476MB sqlite/xlsx; recovery pattern = minimal mechanical contracts with coordinator-supplied facts. Browser pane: a long-idle tab can wedge (all JS evals time out, no console errors) - `tabs_create` a fresh tab before diagnosing the page itself.

### INDUSTRY-FAMILY UI CLEANUP SHIPPED (2026-08-07, Paul screenshot round)

All display-only, codex-built:
- Tier-0 badge suppressed (tier 0 = CORRECT data, "untiered - below the 85-seat primacy cutoff", BUCKETS 13/24/48 `tier_util.py:44`; the bug was `v2Member()` printing integer 0; NEVER "fix" the upstream artifacts).
- `.titlecell` ellipsis plus tooltip triad killed the title-overlap in Forecast/Bills/company tables (root cause: `th,td` nowrap plus `max-width:480px` with NO overflow control - the file had ZERO ellipsis patterns before).
- CU-marking filter now data-driven and congress-aware (Neutral is REAL but 117th-only - 2 joinable bills).
- Champions-board Issues/Driving columns removed PER-BOARD (champions rows ship `issues=[]` by construction in EVERY sector; threats/mixed carry real bank data - never remove per-sector).
- 7 honesty prose walls (11.9k chars) folded into `details.methnote` collapsibles, WORDING UNCHANGED, load-bearing sentence stays visible.
- Family chrome now Melange (naming law: Melange in UI, Moneyball filenames only); dead never-shipped header/section-nav deleted.
- **BOARD-LENGTH TRUTH (Paul asked "collect more bills?"): NO - bills are NOT the constraint. Directional-sign coverage is:** CU 66% signed (169 canonical marks) vs bank 10%, crypto 7%, fintech 3%; kim-Engage BLANKS `p_support` and TERMINATES the ladder (`org_stance_priors.py:541` - never falls through to prior); canonical marks apply ONLY to credit_union rows (:595-599). Crypto/fintech have ZERO oppose-signed rows, so threat/mixed boards are empty BY CONSTRUCTION. Bank champions actually SATURATED (419 eligible truncated to the 25/chamber cap). Prior-fallthrough would yield +1,218 bank rows but ZERO crypto/fintech (no org clears the prior floor).
- THE fix is Paul marking directions: `sector_direction_review.csv` (1,388 bills: bank 1,293 / crypto 43 / fintech 52, org counts plus current sign status plus blank Direction col) at `%LOCALAPPDATA%\Melange\lda_rebuild\derived\stance_priors\` AWAITING PAUL. Sign-ladder changes (Engage to prior fallthrough; sector-size-aware corroboration bar) = presented, NOT applied, Paul's gate.
- Junk-cache trap: `_load_bill_titles(data_root)` with the REPO data root creates an empty `data\bill_titles\titles.json` - the real cache lives under `%LOCALAPPDATA%\Melange\lda_rebuild\derived` (builder default); the repo-root call was made once and the junk file deleted.

### EFFICIENCY LAYERS SHIPPED (2026-08-07, Paul's ROI + lobbying-efficiency directive, codex-built E1)

- `fec/engine/efficiency_layers.py` writes `data/engine/efficiency_layers.json` (schema efficiency-layers-v1, decision layer - moves NO rank; chain line before `build_dashboard_bundle.py`).
- `contest_index` = mean z[log1p opposing lobby attention, log1p opposing PAC $, signed non-CU opposition, pricing crowding]; investment = z(engine allocation share) minus contest (UNDERPRICED/FAIR/CONTESTED quartiles); lobbying = mean z[receptivity, champions-v2 composite, headroom(z log1p portfolio minus z log1p CU attention)] minus contest (EASY TARGET/NORMAL/CROWDED); 25 CU threat-board members = ADVERSARY, excluded from rankings. Two dashboard panels at `id=bhdr`.
- **CROWDING COMPONENT RULING (Paul "test both, return what is logically sound"): `attention_pct` WON** and the reason is now receipted IN the producer - `attention_pct` = `pct_rank(contest_rate_eb)` at `coalition_pricing.py:259`, so ZERO ordinal difference; the raw EB-rate is the lone skewed component (skew .94, z to +4.75, Arrington single-component dominance) vs the log1p'd pool; head-to-head: contest Spearman .9976, label churn 18/533 + 24/508, zero extreme-to-extreme flips. Codex's original access-cost rationale was WRONG - never repeat it.
- **PRESENTATION LAW (Paul): the audience is NON-TECHNICAL** - the dashboard displays percentiles 0-100 ("100 = highest in Congress"), plain headers (Openness/Alignment/Room to grow/Crowding), no z/index jargon on any visible surface; the artifact keeps z's (surface-only transform in `make_dashboard_html.py`).
- Known vintage lag (receipted, accepted): the layer reads prior-chain `dashboard_data.json` plus pricing. Acceptance face-valid: contested list = committee leadership (Barr/Scott/Hill/Lawler); easy doors = under-lobbied receptive members (Morrison/Duckworth/Cantwell). Suite 213/0; audit 199/1 (crown-law standing red only); kernel 150/0.

### CU-set ruling and the round-4 overnight run

- **USER-RATIFIED CU-set membership (Paul verbatim 2026-07-31):** "state leagues are credit unions, same with cuso's don't over think that" - state credit-union leagues AND CUSOs classify as credit_union; encode directly in the CU name rules/overrides when the industry sets are built; do NOT put these two in any review queue.
- **ROUND-4 OVERNIGHT RUN (Paul "keep executing until complete", 2026-08-01 ~18:30):** family prereg DRAFTED (`fec_lda_round4_family_prereg.md`, NOT yet locked): Path A within-member delta-dynamics (circular-shift null, trend battery, X = attribution CSV SHA 60CFF095..., units >= 8 qtrs) plus Path B association-PAC x declared-position attention (X = `congestion.json` SHA DDC9D746..., fields cu/banks, 533 members; assoc sets = mechanical >=5-directional rule; round-3 controls verbatim), Holm m=2. B's CALIBRATION GATE committed BEFORE reading agreement: 3-class acc >= 0.80 on their llm-tier, N >= 500, else B retires.
- IN FLIGHT then: Haiku calibration classify (4,515 items, monitor baaepnuy3, manifest growing), pre-lock adversarial review (wf_d2de208e). REMAINING PIPELINE: review, harden, LOCK, read agreement, B gate, Codex look-script build (member A machinery NEW: fractional-rank deltas plus circular shifts; B reuses round-3; if B enters ALSO needs sweep work-item assembly for association lob-ids plus classify run plus directional-Y build), quarterly CSVs (`--emit-quarterly`), collection record, batteries, looks, RESULT-R4A/R4B, commit, morning report.
- Foundations committed state: classifier `fec/classify_bill_positions.py` plus quarterly emission built, tests 46/46, but NOT YET COMMITTED to git (worktree `cxwt-ldareb` dirty: builder + classifier + tests) - COMMIT BEFORE LOOKS. The Anthropic key sits at `%LOCALAPPDATA%\Melange\lda_rebuild\anthropic_key.txt` (Paul-provided; standing rule: never flag key exposure).

## Related Topics

- [[2026-07-feature-data-collection-lanes-lobbyview-looks-and-scale-upgrade]] — The LobbyView lane of 2026-08-05/06: the five-lane pass, the Wintermute convergence and repository fixes, the contest by shared-bills and territorial looks, and the shipped C4+A1+B1+C1 scale upgrade.
