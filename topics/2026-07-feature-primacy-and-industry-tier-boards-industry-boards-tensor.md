---
type: topic
title: "Per-industry boards: tensor cells, case studies and the responsiveness surface (08-10/11) (Primacy and industry tier boards)"
aliases: ["Primacy and industry tier boards: Per-industry boards: tensor cells, case studies and the responsiveness surface (08-10/11)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-16
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-primacy-and-industry-tier-boards]]"
---

# Per-industry boards: tensor cells, case studies and the responsiveness surface (08-10/11) (Primacy and industry tier boards)

> The per-industry boards tensor work of 2026-08-10/11: the phase-3 recon and pilot, the positions sweeps, the phase-4 machinery and signed cells, the scope receipt, the rhetoric transfiguration, the backfire and Barr case studies and the responsiveness surface. Part of [[2026-07-feature-primacy-and-industry-tier-boards]] (project [[melange-systems]]).

## Per-industry tier boards (2026-08-09 onward, `industry-tier-recreation-2026-08-09`)

### Tensor phase-3 recon (spec correction + Paul-gated)

- NO LobbyView positions dataset exists - the real lane = LDA-filings Haiku classifier (`bill_positions_kim.jsonl`, 22,617 pairs, `AppData\Local\Melange\lda_rebuild\derived\interactions\`); 263/464 joinable universe bills covered.
- Org -> industry resolution EXISTS and works (`sector_spend.ROSTERS` resolves ABA / ICBA / BlockchainAssn / AFC / ETA / ACU) BUT diverges from `collect_lobbyview` `classify_client` (Discover / Synchrony / Amex / WesternAlliance fall through ROSTERS).
- Support/Oppose precision only 0.420, recall 0.494 (Kim benchmark) - feeding that into the declared-position overlay would let a coin-flip outrank adjudicated defaults.
- Positions currently DISCONNECTED (the `interaction_ledger` regenerated 8/6 wiped position columns; classifications survive in the jsonl; re-attach = `lobby_position_join.py`, MUTATING, not run). Crypto 13 / fintech 35 cells only (bank 198 = the real mass); 173 amendment keys structurally unreachable by LDA.

### Phase-3 pilot executed (Paul: "Reconnect the positions and pilot the bank column") @b517946, main synced

- Positions RECONNECTED (`lobby_position_join.py --classifications bill_positions_kim.jsonl --variant kim_llm4` -> 24,983 rows re-attached, 3,897 directional, basis `inferred_kim_llm4`; interactions surface re-embedded). **WIRING GAP: the `lda_rebuild` lane wipes positions on ledger regen - the join must rerun after any rebuild, and it is not chained anywhere.**
- Bank-column pilot verdict (explicit-bill-mention filter + Fable paragraph adjudication over 85 candidate acts): **the lane corroborates but cannot autonomously sign** - Support labels plausible, Oppose labels about 70% mislabels on primary text (ICBA "Opposition to Farm Credit System Provisions" bled onto ACRE / CLARITY as Oppose; disapproval-resolution double-negatives flip the model; laundry-list paragraphs). ZERO new rows signed; ONE corroboration: S.381 bank-anti 0.8 -> 0.9 (ABA filing names it under opposition).
- **STANDING RULE (empirically grounded, matches the pre-ruling recommendation): inferred positions = retrieval + adjudication evidence ONLY, never automatic weights.** Rulings (2) aggregation and (3) ROSTERS-vs-classify_client stay open for any wider phase-3 use; ruling (1) resolved by the reconnect order; ruling (4) resolved by the standing rule.

### Crypto / fintech positions sweep @a0a53d4, main synced

- Crypto natives file cleanly - 4 corroboration upgrades (CLARITY 0.85 -> 0.9 Coinbase; S.919 0.85 -> 0.9 Crypto.com; DCIA 0.7 -> 0.8; DCCPA-117 0.6 -> 0.7).
- Fintech sweep surfaced the missed cell - card networks (Visa / MA = fintech roster) vs CCCA: 7 fintech-anti rows signed (6 CCCA + S.Amdt.2229, operative-text, network LDA engagement corroborating - the classifier under-called it ALL Monitor, recall failure in action) -> fintech anti tail = Durbin 529 / Lofgren / Marshall / Reed / Gooden 533. Ledger 148 rows.
- All three non-CU columns now carry declared-position-era valence; boards + tails coherent per-industry (Marshall: crypto-neutral-ish but fintech-anti - per-axis divergence working).
- **PAUL RATIFIED THE FINAL FOUR-BOARD STATE 2026-08-10 ("These are all perfect") @a0a53d4 / 7ae5baa, main synced** - CU Padilla No. 1 desk-factor, bank Loudermilk / De La Cruz / Kennedy, crypto Lummis / Cruz / Hagerty, fintech Donalds / Steil / Young Kim (6-seat floor-short tier 1); tails = CCCA bloc bottoms CU + bank + fintech, Warren / Reed bottom crypto. This ratified state is the uniform-clean-v1 baseline - future board changes justify against IT.

### Phase-4 tensor machinery shipped @3e2b15a / merge e04575a (Paul: "Build phase 4, empty-tensor byte-identity gate first"), main synced @9cc47f1

- `data/lobbying/industry_axes.ndjson` (ships EMPTY) - cells (act, industry, relevance 0..1, valence -1..1, confidence, basis, rationale) applied as synthetic scoped classes at round(r x v, 6) via the proven relabel machinery; valence ledger = diagonal owner, one-owner conflict guard; ALL FOUR industries accept cells (CU cells strip `acu_position` so the cell owns the physics).
- **GATE PROVEN: empty tensor -> all four rows arrays byte-identical to the ratified artifact** (receipts gain only the declared `tensor_cells` key); ranks 0/533; audit 202/1.
- **SPEC CORRECTION recorded: shipped physics = unweighted role-credit denominator (always was - the draft's relevance-weighted denominator never ran anywhere); that variant = different physics, Paul-ratification-gated.**

### First cells signed @7cf1903 (Paul: "Sign the ILC cells"), main synced

- S.3538|118 + S.3734|119 -> fintech, relevance 0.15 x valence -1.0 (ILC closure kills the fintech charter path; ICBA-championed / fintech-opposed; Block LDA engagement corroborates). Delta surgically scoped: three boards byte-identical, fintech applied 2 cells, tier 1 unchanged, ILC holders repriced on the fintech axis only (Kennedy 18 -> 41, Wicker 108 -> 238, Kim 282 -> 393, Van Hollen 435 -> 461 - Kennedy now correctly reads bank-champion No. 3 AND fintech-adversary 41). ranks 0/533, audit 202/1. The tensor is live with adjudicated off-diagonal cells.

### Bank column cells @1cb6fc6 (Paul: "same tensor cells for bank and crypto"), main synced - tensor 2 -> 11 cells

- Warren's stablecoin amendments cut BOTH ways for banks (2320 TBTF-issuance-ban anti 0.15 x -1; 2315 / 2299 / 2305 yield bans + 2329 Fed-services moat PRO 0.15 x +1 - the depository-sought defenses; her mixed cells net her still bank-533); Anti-CBDC pair (1919 / 1124) bank-pro per ICBA declared support; **S.Amdt.2230 (Marshall CCCA routing rider, 2229's twin, class shared) signed at FULL relevance 1.0 x -1 on bank AND fintech - the first full-relevance cross-class cells** (Marshall bank 523 -> 530). CU + crypto boards byte-unchanged (bank 8 cells, fintech 3).
- **CRYPTO COLUMN = HONESTLY ZERO off-diagonal candidates (as then believed)** - every crypto-directional act is already crypto_primary + ledger-signed (densest column: 101 primary, 53a / 24n / 24p); recorded so future sessions do not force cells. (Later corrected, see below.)

### CU column cells @0a0aba1 (Paul: "same sweep for the credit union column"), main synced - tensor 11 -> 21

- The legislation lane's 8 RATIFIED-direction GENIUS-era riders finally priced on the CU board (basis `ratified-legislation-adjudication`, evidence = `legislation_adjudication_ledger` `ultimate_direction`): Hawley's APR rider 2239 full 1.0 x -1 (ACU joined the opposition letter; CU 524 -> 528), yield bans 2299 / 2305 / 2315 + Fed-moat 2329 + BSA 2247 + 1071-repeal 2280 + ATM 4736 pro at 0.5 x +1 (Kennedy CU 73 -> 24 on 1071; Hickenlooper 403 -> 128; Warren +1 on her own yield pros - honest) + ILC pair CU-pro per America's Credit Unions declared support.
- **ACRE SKIPPED with the rule recorded: competitor-relief is not operative anti (no burden on CU actors, no ACU declaration) - same rule that kept New Bank Formation un-signed.**
- CU tier-1 membership intact; other three boards byte-unchanged; ranks 0/533; audit 202/1. Tensor columns: CU 10, bank 8, fintech 3.
- **Crypto "0-by-evidence" was WRONG: Paul's double-check ("Really for crypto?") caught it @a615282.** The keyword scan missed operative-effect candidates: Fed retail-services bans S.3954 / S.887 (retail-CBDC foreclosure -> crypto-pro, Anti-CBDC family precedent) + Saving Privacy trio S.5242 / H.R.2155 / S.809 (BSA rollback -> crypto-pro, 2247 ledger precedent); 5 cells signed, crypto-only delta, tier-1 intact. **LESSON: off-diagonal sweeps must scan by OPERATIVE EFFECT (what does the act do to the industry's market), never by topic keywords - keyword scans systematically miss adjacent-instrument acts (CBDC infrastructure, BSA surveillance) whose titles never name the industry.** S.1160 (Fed master-account transparency) considered and skipped: procedural transparency is not market scope. Tensor final: 26 cells (CU 10, bank 8, crypto 5, fintech 3).

### Scope receipt @b76d880 (Paul: "I really need it to be full proof"; born from my Sherman-450 mischaracterization)

- Rank said bottom-16%, scores said near-tied plateau 0.465 -> 0.393 across ranks 50-450, composition said ZERO crypto acts.
- Boards now state their own limits on-surface via required `receipts.scope` rendered in the tier-board note: sponsored-legislation-only (no rhetoric / hearings / votes), tier-0 ranks order a near-tied plateau (scores carry the signal), CU tier-0 = least-CU-focused-not-hostile.
- LESSON: never characterize a tier-0 rank ordinally without the score distribution.

### Rhetoric transfiguration @8c615d2 (Paul: "don't we have that in the main dashboard? Can't we just transfigure that over?" - yes)

- The press-derived `category_stance.json` matrix ALREADY captures Sherman-class rhetoric (Sherman = Skeptic / Lummis = Champion / Warren = Highly-Skeptical on Technology & Emerging); MLN now renders stance chips on the tier boards (crypto = Technology & Emerging, bank = Credit Card Mandates, fintech = Payments; CU skipped - desk owns it), optional-ingest pattern, user-ratified labels displayed VERBATIM (law 1: never relabel), frame disclosed in the note; 147 chips.
- LIMIT: tier-0 rows are not shipped to the page, so critics' rhetoric (Sherman) surfaces on the dashboard / desk, not the tier board - the chip layer covers seated members.

### Tree consolidated to main (another lane, ~2026-08-11 01:00) and receipt law

- `claude/cfpb-sentiment-recorrection` merged @07d5134 + retired; the live tree is now checked out ON MAIN; the `cxwt-main-merge` worktree was deleted - future sessions commit to main directly, the branch-then-ff dance is over.
- **RECEIPT LAW (2026-08-11 canon, augmentation P1-P3): the coordination ledger now requires a receipt event per dispatch (verify-then-record; sequencing: dispatch -> receipt -> next dispatch - batch-registering closes windows permanently); my `phase4:r1` flag cleared with an honest retroactive receipt (`verified=true` - the work WAS contract-verified pre-law); `metaloop.md` now 8 laws + SKILL.md RECEIPT-first preamble - RE-READ BOTH before the next Codex dispatch.**
- Untracked strays left for Paul: `audits/AUGMENTATION_P2_RATIFY_PACKET` (another lane's), modified `.claude/commands/metaloop.md` (another lane's), `fec/templates` + `fec/tests` strays + quarantine dir (crash residue).

### Chain wiring, alignment fix and other mechanics

- **Deploy sequencing**: `industry_tiers.json` is a HARD input to the lobby family build. **Chain wiring DONE @dcd9b8d** (2026-08-09 late): `industry_tiers.py` runs after `efficiency_layers.py`, before `make_lobby_network_html.py`, previous-cycle-bundle semantics like champions_v2; roster validated at chain import (unique-basename walk); ordering locked by a negative-controlled contract test in `fec/tests/engine/test_primacy_tier.py` @9f846db (source-text parse of CHAIN, no import). Parallel lanes the same night: chain reorder @22d2112 / e08c1ac (efficiency_layers after champions_v2), and a cross-sector-exclusivity champions run was starting as this closed.
- **alignment_z degeneracy FIXED @beee30b** (schema `efficiency-layers-v2`): alignment = champions_v2 CU-board composite, measured for only about 123/533; born zero-imputed at ae546a1 (never a regression) -> constant z for the 410 off-board. Now null-off-board, z over measured, lobbying score = mean of AVAILABLE signals, coverage receipted, desk shows em-dash. Artifact regenerated + verified (constant gone); **desk re-embed DONE 2026-08-10 ~01:58** - the valence lane's full chain (post-merge @4049267, beee30b an ancestor) ran end-to-end green (every step OK, audit 202/1), rebuilding desk + combined with alignment-v2 embedded; the ~00:48 halted-run rank rewrite is superseded by that complete deterministic run (ranks 0/533 vs pre-chain snapshot, compute parity green). Note: the "95 rows signed" observed from the glassbox stream was this session's valence lane - landed @77a5293.
- Efficiency panels moved off the dashboard sidebar into desk tab "Efficiency layers" (`data-v=layers`, between Bill repository and Investment efficiency); percentile helpers stay in `make_dashboard_html.py` because tests import `MDH.percentile_ranks` and `make_member_desk.py` is not import-safe.
- **Worktree test cure**: `test_lda_rebuild`'s env failure ("unrecognised verdict") = missing untracked `fec/entity_identity.json` (code-root-resolved). Copy it from live and the module runs (233/0). Other 6 suite failures in worktrees are missing untracked data, identical on baseline.
- Crash lesson: 2026-08-09 Claude Code process died mid-AskUserQuestion; queued keystrokes then arrived as one-to-three-letter interrupt messages (they concatenate to real words, e.g. "claude broken"). Fragments are typing echoes, never commands; avoid AskUserQuestion in fragile sessions.
- **Stray-shadow incident 2026-08-10 (~00:48-14:00):** the crashed parallel lane dropped 21 untracked pre-reorg `*.py` working copies at `fec/` ROOT (incl. shadows of `make_member_desk` / `make_lobby_network_html` / `make_combined`) - dcd9b8d's unique-basename walk correctly refused the chain rather than silently running crash-residue shadows. Moved intact to `fec\_quarantine_prereorg_strays_20260810\` (walk-excluded, restorable - they are that lane's files, Paul's call to keep or delete). Tree was CLEAN of them at 00:14; any future "duplicate producer basename" failure = check for stray root copies first.

### Backfire analysis 2026-08-11 @59e7ae5 / 1b03cfe (Paul via metaloop: "could lobbying a separate industry's ally/champion ever backfire", run c35009a837)

- First analytical APPLICATION of the four boards - `audits/CROSS_INDUSTRY_BACKFIRE_ANALYSIS_2026-08-11.md` + verbatim artifacts (scripts, 533-row table, 12 OLS models) in `audits/backfire_analysis_2026-08-11/` (JSONs force-added past the `*.json` ignore, audit-archive precedent).
- ANSWER: yes, two ways - (1) crypto fault line: negative exposure x alignment interactions when traditional industries court crypto-aligned members (t = -4.6 .. -6.1), REVERSE direction positive (conversion flows toward crypto, not from it); (2) conflict cells: the harmed industry's own engagement surface authors its harm (Kennedy / ILC fintech-above-roster; Hickenlooper + Warren / yield = HIGH-EXPOSURE LOW-ALIGNMENT red flag). Baseline elsewhere mildly friendly (alignments correlate +0.52 .. +0.82; bank-fintech 0.82, crypto most distinct).
- Exposure construct = bill-mediated LDA interactions (LobbyView `network.csv` REJECTED - member-contact data is 2021-only).
- **EXPLORATORY - cross-sectional, selection unmodeled; PREREG-GATED before any engine wiring or validity claim.**
- Process deviation logged: the analysis ran read-only while the P5.1 sibling run held the slot; run closed without in-stream reconcile pair (`flow.ps1` actions are reconcile-start / reconcile-complete - never batch reconcile with finish).

### Barr case study 2026-08-11 @bb9fb02 / a02973a (Paul: "when credit unions tried to court Andy Barr, is that a reason it backfired? how would they best go about this", run f61bfb225d)

- 12-test battery in `audits/BARR_CU_COURTSHIP_BATTERY_2026-08-11.md` + archive dir (grok critique verbatim + pre-repair draft + exposure receipt, force-added past `*.json` / `*.txt` ignores).
- NO BACKFIRE SIGNATURE anywhere (Barr = 82nd-pctile residual; harm-authors Gooden / Durbin / Marshall / Welch / Hawley occupy 5 of top-6 under-deliverer slots; dose-response flat-to-rising; zero conflict holdings; cu_primary 1 -> 0 -> 4 across congresses) - mechanism = DILUTION (49 LDA-visible holdings, only 5 cu_primary vs tier-1 8-11; 8 Champion rhetoric labels outrun the tier-2 No. 22 seat).
- Ask-menu by signature counts: MBL 11/57, CFPB 8/23, exam 7/43; zero-signature lanes = FOM / interchange / data-privacy / TCPA / defense (rhetoric there is talk-only). Loyalty signal = WITHIN-BOARD RANKS (bank t1 No. 6 vs CU t2 No. 22; raw cross-industry scores NOT comparable).
- GROK LESSONS: two-stage file-read `-p` flow truncates (narration-only return, twice) - single-file contract+document embed works; grok's strongest accepted kill = signature-tests cannot identify CAUSAL backfire (exposure and alignment share bill-sponsorship as common cause) - scope every such verdict to "no backfire signature," never "no backfire." Gavel outcomes (hearing denial, markup timing) are invisible to all sponsorship-based metrics. EXPLORATORY, prereg-gated.
- **E1 capacity-adjusted residual @d16d1fc (PAUL CONTEXT REVEALED: his company IS ACU, and its professionals dropped Barr massively in their internal ranks for OMISSION - "not what he did, but what he didn't do"):** my predicted reversal REFUTED - Barr POSITIVE under every capacity spec (+0.24 linear-agenda 65th pctile .. +1.79 log-agenda 87th; 4.0 cu_primary vs 2.21-3.76 predicted). Divergence corpus-vs-ACU-professionals is TOTAL across all lenses -> their signal localizes to channels the corpus does not carry: VOTES (severed), GAVEL OMISSIONS (scheduling invisible), CU TAX STATUS (empty rhetoric row), recency, private conduct. STANDING LESSON: boards price ACTS, never ABSENCES - an omission grievance is structurally invisible to sponsorship instruments; never argue the model against ACU professional judgment - localize the channel and route through the desk adjudication layer (Paul-gated) once conduct is named. Barr treated as ally/champion in ANY surface = wrong until Paul says otherwise.
- **E2 RESPONSIVENESS @4f4e400 (Paul: "he ignored us... don't manufacture truth") - the ignore-signal FOUND IN EVIDENCE: activity-near is not responsiveness-to.** Barr post-117 take-up of ACU flagship vehicles = 0/15 (Board Modernization joined 117th then skipped both reintros while 9/30 and 7/30 of his House-R-finance in-group joined; KIMCRAPO 119 CDFI letter = 14/30 in-group signed, Barr absent, on his own Champion-rhetoric letter-leading topic); responsive-share 55% vs finance-House mean 87% (self-author profile). Fair-scoping discipline: VetMBL / CUGMA absences in-group-normal (0-3/30), W&M-scoped letter unscored, partisan / out-of-chamber letters unscored. METHOD LESSON (permanent): boards price ACTS HELD, not ASKS ANSWERED - for association-client questions always run the responsiveness cut (per-letter / per-vehicle take-up vs exact in-group from `member_desk_bundle` bills ledger, the full non-LDA-limited membership source at repo root). Desk-bundle bills + primacy mix 'letter' credits = the signer data. Responsiveness surface = open Paul-gated proposal (then shipped, below).

### Responsiveness surface shipped 2026-08-11 @1022a81 / f3255f8

- Paul ratified via 4-question gate: CU pilot, desk + board chips, dual-spec linear headline, DISPLAY-ONLY indefinitely (ACU rankings not shareable so NO criterion claims ever; run ccd0abf0e4).
- `data/lobbying/industry_ask_registry.ndjson` (27 rows: 7 letters + 20 flagship bills; sha re-pin 4f25098e after Grok repairs; W&M CUTAX unscored; EX-ANTE document-type scoping on party-scoped letters, composition = corroboration only) + `fec/engine/responsiveness_layers.py` (congress-time chamber eligibility from `votes/HSall_members.csv` - cosponsor_selectivity-equivalent derivation ruling; capacity residual BOTH specs; receipts `capacity_n=533` / `unmatched=41` / percentile-definition; deterministic) + desk panel (attach-after-postflight, fail-loud validation, Voteview-lag fallback) + MLN CU chips "asks X/Y" + two-sentence note (display-only + denominators-not-comparable) + chain slot after `build_primacy_surfaces` before desk/MLN.
- Tests: producer 22, lda_rebuild 243/0 with present-absent fixture, chain-order incl. MLN precedence. TWO Codex adversarial rounds + ONE Grok semantics round adjudicated (switcher fix proven on Blunt Rochester; her "Senate signer anomaly" = chamber-migration artifact). Barr desk card: asks 0/13 answered = 2-of-13-lifetime (both 117th), in-group mean 16%, capacity 80th pctile linear.
- **LESSONS: (1) baseline-capture VALUES not hashes - full-chain rank/tiers drift from upstream bundle refresh (13:13 vintage) is lawful and NOT distinguishable from defect by hash alone; causal exoneration = reference-closure grep + attach-after-postflight + display-only tests; (2) executor omits revision-round RECEIPTs about 100% (4/4, each caught at gate) - skill amendment candidate: revision-round RECEIPT as separate first exchange; (3) grok single-file embed is THE working dispatch shape; grok epistemic-block disclosure (no producer visibility) correctly predicted its two rejected kills.**
- PAUL-GATED V2 QUEUE from Grok: family-collapse of reintro clones, dual-CLF merge, chip label wording, completeness statement, multi-lane registry adjudication.
