---
type: topic
title: "Industry-tab interactions and the per-industry boards build (08-03 to 08-10) (Primacy and industry tier boards)"
aliases: ["Primacy and industry tier boards: Industry-tab interactions and the per-industry boards build (08-03 to 08-10)"]
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

# Industry-tab interactions and the per-industry boards build (08-03 to 08-10) (Primacy and industry tier boards)

> Industry-tab interactions of 2026-08-03 and the per-industry tier boards build of 2026-08-09/10, from the deploy and the valence fix to the BNPL, bank, CU-axis and association-anchor work and Paul's uniformity ruling. Part of [[2026-07-feature-primacy-and-industry-tier-boards]] (project [[melange-systems]]).

## Industry-tab interactions (2026-08-03, `industry-tab-interactions-2026-08-03`)

Industry-tab UI round 2 (tabs, posture badge, interaction drill-down), built UNCOMMITTED on `claude/industry-network-ui-23cabd`; LDA has NO position field (measured); the ledger agrees with the shipped network EXACT on 78,244 dyads. (Also feeds Melange dashboard UI evolution.)

- Paul's 2026-08-03 request on the industry page: a tab back to the main dashboard; a cultivate/maintain/disengage indicator per (industry, member) and (org, member); and a click-through from a member to every interaction sorted by year with date, filing lobbyist, bill, position, and notes.
- **Two decisions he made at the gate (AskUserQuestion, 2026-08-03):**
  - POSITION -> "Both — ship column now, classify later." Column ships wired and empty; running `classify_bill_positions.py` is a SEPARATE gated step he had not authorized yet at that time.
  - POSTURE WORDING -> "Ship both — one badge, a toggle for wording", **defaulting to HIS wording** (Cultivating / Maintaining / Disengaging), neutral wording (Rising / Steady / Falling) behind the toggle.
- **THE MEASURED FACT that shapes feature 3: the LD-2 form has no position field.** 0 of 24,819 in-scope activity records carry any position key. So "position taken by lobbyist" has no disclosed source - it is the disclosure regime, not a collection gap. Never quietly fill this column; the honest substitute is the lobbyist's verbatim description, which the ledger carries on every row. `position` / `position_basis='not_disclosed'` is the wired-but-empty slot.
- **New files (all UNCOMMITTED on `claude/industry-network-ui-23cabd`):**
  - `fec/lobby_interactions.py` - per-activity ledger producer. Reuses `build_network_2021_rebuild` for attribution + bill resolution + sponsor map, so it agrees with the shipped network BY CONSTRUCTION. `verify_against_network` is a HARD GATE that refuses to write on any dyad disagreement - it passed **EXACT on all 78,244 dyads**. Output -> `%LOCALAPPDATA%\Melange\lda_rebuild\derived\interactions\`.
  - `fec/lobby_posture.py` - the posture rule. Complete-year windows only (2024-25 vs 2022-23), 25% band, 3-bill evidence floor; 2026 partial year is EXCLUDED from the trend (including it manufactures a decline everywhere) and enters only to rescue dormant -> returning. Dials `LOBBY_POSTURE_BAND` / `LOBBY_POSTURE_MIN`.
  - `fec/make_lobby_interactions_html.py` - the `lobby-interactions.html` surface, `?sector=<sector>&b=<bioguide>`.
  - `fec/tests/test_lobby_interactions.py` - 24 tests, all green.
- **Numbers worth not re-deriving:** 24,819 in-scope activities 2021-2026; 7,210 cite a bill (29%); 32,561 ledger rows = exactly the bill index's `sum(n_activities)` (independent cross-check); 4,031 distinct notes; 40,307 bill-member rows. Ledger build about 25 min (the BILLSTATUS sponsor-map load with `include_forecast_metadata=True` dominates).
- **Size is the binding constraint on these pages.** Industry page guard is 5 MB and HEAD already built to 4.50 MB on current data - my additions cost +136 KB (4.64 MB, 93% of budget). The interactions page needed its own 6 MB guard and index-compression to fit at 5.05 MB: posture verdicts ship as `[stateIdx, recent, prior, partial, delta]` with the words in one shared table (carrying the derivation sentence per row cost 3.4 MB), and channel / period / covered-positions / entities / notes are interned. If either page grows again, shard by sector rather than raising the guard silently.
- **Both builders are run MANUALLY - no chain script invokes them.** From the worktree, needs `MONEYBALL_ROOT` pointed at the main tree because `bills_audit.csv` is gitignored and not in worktree checkouts. `fec/deploy_lobby_pages.ps1` now wraps all of it.
- **THE 2026-08-03 DEPLOY FAILURE - the lesson.** I built both pages into a scratchpad preview dir, verified them there, and told Paul where they were. He opened his own tree and saw nothing: `lobby-network.html` was still the Aug 2 build with **zero outbound links of any kind**. Then the "rebuild" command I handed him (`python fec/make_lobby_interactions_html.py`) was a file-not-found, because that file only existed in the worktree. **Building is not delivering. Deploy to the artifact the user actually opens, then verify THERE.** Contributing cause since fixed: the interactions builder defaulted `--out` to a derived staging dir while its sibling defaulted to MB_ROOT - a builder that prints success while the page nobody can see stays stale. Both now default to the live tree.
- **POSITION CLASSIFICATION (Paul authorized "Run the haiku API" 2026-08-03):**
  - `fec/lobby_position_items.py` -> 22,660 work items (2,721 duplicate content-hashes collapsed), all bills present in BILLSTATUS. Reuses the SHIPPED `work_items_from_payload`, so the prompt and title resolution are the validated ones; only FORMALLY CITED bills get items, so title-only ledger rows stay `not_disclosed` by design.
  - **FEWSHOT IS REFUSED, NOT UNUSED.** All 5 cached exemplars in `raw/positions/exemplars.json` collide with this corpus on (lob_id, bill) - they are all one org's 117th-Congress bills - so the classifier's own leakage guard fires. Correct guard. Shipped ZEROSHOT instead: costs 0.5pp on the validated three-class primary (0.9419 vs 0.9466) and is leakage-free.
  - **`--workers 8` HANGS.** Dies at ~405 items with all 8 sockets established-but-silent; each worker then burns 90s timeout x 6 retries. API was verifiably fine throughout (0.6s/call, 10k req/min limit, nothing throttled) so it is a client concurrency fault, not rate limiting. **`--workers 4` is stable at 3.34 items/s (~201/min, ~110 min for the full corpus).** The manifest checkpoints every item so a kill/restart resumes losslessly.
  - **Only the THREE-CLASS collapse may be displayed.** Five-class agreement is 0.479 zeroshot and Amend F1 is 0.00 - not a distinction this classifier can make. The badge shows Support/Oppose/Engage, the raw five-class guess lives in the tooltip. Every inferred row wears an INFERRED tag: Support F1 0.548, Oppose F1 0.492 on n=30, against 0.971 for the majority Engage class that carries the 94.2% headline. Never let that headline travel alone.
- **Pre-existing test failures, NOT mine (verified identical on HEAD by stashing):** `test_bill_collision_guards` 25/3, `test_bug_report_regressions` 62/2 (README says "84 kernel", test wants "64 kernel"; govinfo `X-Api-Key` header), `test_lobbyview_network` (fixture passes a .json path as data_root). Do not re-diagnose these as regressions from this work.
- Related memory notes: `melange-coalition-builder-redesign-2026-07-30`, `lobbyview-integration-2026-07-31`, `ask-before-substantive-changes`.

## Per-industry tier boards (2026-08-09 onward, `industry-tier-recreation-2026-08-09`)

Per-industry desk-method tier boards shipped @6779716 / @d07eaea; Warren-champion mystery = bank-default-tab bug; CU parity gate exact-533; VALENCE RESOLVED 2026-08-10 (option A ledger @77a5293) - crypto board now direction-aware, Warren 533/533.

### Deploy @d07eaea (2026-08-09)

- Live tree branch `claude/cfpb-sentiment-recorrection`; main fast-forwarded 3881f1d..d07eaea via the `cxwt-main-merge` worktree. d07eaea completed a PARALLEL lane's in-flight `--no-commit` merge of my 6779716 plus their CHAMPION EXCLUSIVITY (crown supremacy, Paul 2026-08-09: a Tier-1 crown never sits on any sector's threat board - demote to mixed if `opposition_att >= 3` else omit + receipt `crown_threat_exclusions`; Waters is off the CU threats board).
- Coordinator fix: routing / `_assert_boards` use a desk-derived `crown_bioguides` set, NOT the row display tier (their `_integer(row tier)` crashed on the lawful `tier=None` non-CU rows).
- Deploy order that works: champions_v2 producer -> industry_tiers producer -> lobby family -> dashboard -> desk -> make_combined (the parallel lane's chain died twice building surfaces before producers - the freshness guard refused combine).
- Left in live tree, NOT mine: modified `data/stance/own_source_stance_model.joblib` (uncommitted) and stale `.pipeline_run.lock` (owner pid dead).

### Original branch record (superseded by the deploy above)

- **Warren-champion incident root cause**: `lobby-champions.html` opened on the BANK board (industries sorted alphabetically at `make_lobby_network_html.py` `_attention_payload`; the producer's CU-first `sector_order` was dead code on load). Warren was never a CU champion - she is on the CU threats board; Meuser is CU champion No. 1, Nunn No. 15. Fixed: CU-first hoist in `_attention_payload` AND `_industry_cards` (dot-index coupling).
- **"Weird font for bills and congress"** = thousands of unstyled default `<button>` elements (`.orgbutton` / `.billbutton` / `.sortbutton` had color-only CSS; the `gap:` property proved a lost flex reset). Fixed with a full chrome reset in the main style region.
- **Paul's tier law**: CU desk tiers NEVER display on other industries' boards (renderer guard + loader sanitizer with receipt `non_cu_tier_rows_sanitized` + producer gate `champions_v2.py:682`). BUT each industry gets its OWN tiers via the industry-tier machinery - the two rules coexist.
- **`fec/lobbying/industry_tiers.py`** = the member-desk tier methodology (primacy factor -> overrides -> evidence floor -> conduct ladder -> 13/24/48 buckets), industry-parameterized over the same 633-act universe by remapping ACT_W (X_primary=1.0, shared=0.5, foreign=0.15, oppose -> 0 for non-CU). Reuses `tier_util` + `engine/primacy_factors.compute` via scoped ACT_W rebinding. **Hard validation gate: the CU instance must match `member_desk_bundle` tier + tierrank 533/533 exactly or it refuses to write** (passed: exact-533, factor self-test 0.0, bundle sha e570cdf27353).

### Valence resolved 2026-08-10 (Paul: "Fix it, try A, see what happens"; option A DEPLOYED @77a5293, merged @4049267, full chain green)

- NEW ledger `data/lobbying/industry_valence_adjudication.ndjson` - 95 fable-signed rows (crypto 92: 52 anti / 22 neutral / 18 pro; bank 2 pro; fintech 1 pro), adjudicated from operative CR text (`amendment_content_v2.ndjson` 75/75 GENIUS amendments) + bill frameworks. Rows are fable-signed, NOT user-ratified item-by-item, row-level overridable (`status=inactive`), Paul may overrule any row.
- Axis: pro = expands industry market/clarity, anti = contracts scope/burdens actors, neutral = off-axis riders + non-industry targets (officeholder ethics, foreign-adversary bans).
- `industry_tiers.py` relabels IN MEMORY per industry (X_anti -1.0, X_neutral 0.0) inside the scoped ACT_W map - engine ACT_W untouched, tags file untouched, CU branch untouched (hard error on CU rows).
- **Evidence floor stays mix[primary] ONLY (desk semantics): hostiles sink, never seat** - primary+anti floor was tried and REJECTED (it seated Warren in tier 2 at rank 21 with a negative score).
- Result: crypto tier 1 = Boozman / Cruz / Lummis / Hagerty / Hill / Torres / Gillibrand / Davidson / Emmer / DJohnson / GThompson / TScott / Ricketts; Warren 533/533 (-0.277), Reed 532, Beyer 531, Hawley 530, Durbin 529; bank/fintech boards unchanged.
- Non-CU note now renders `receipts.oppose_handling` (the old hardcoded "No valence adjudication exists" sentence is GONE; pinned `tierOneTitle` ternary untouched).
- Loader guards: `status` in {active, inactive}, evidence required, `LTR-` rejected (signed-letter semantics undefined), `|` rejected. Revert switch = all rows inactive => baseline boards 0/533 x 4 (proven).
- Verification: CU parity exact-533, ranks 0/533, kernel 150/0, valence tests 16/16, lda 238/0, audit 202/1 (the 1 = pre-existing Paul-gated legfix5 culling promotion, `phase=staged` until the 19-category review).

### BNPL promotion 2026-08-10 (Paul: "promote the BNPL acts") @91f7749 / merge 15554d1, main synced

- 5 acts shared -> fintech via keyed tag edits (`L0:manual-adjudication` - lawful because `build_registry_anchor_backfill.py` only rewrites its 6 registry anchors, all other tag rows pass through verbatim) + 5 fintech valence rows (S.3561 / H.R.6891 anti, H.J.Res.190 / 195 pro, S.J.Res.134 anti - disapproving the rule's WITHDRAWAL reinstates the burden).
- Fintech primary universe 1 -> 6, floor-qualified 1 -> 4: board now Donalds No. 1 / Steil No. 2 / Hill No. 3 / Palmer No. 4 real-pro top, Tlaib 2 -> 12, Reed 533 (0.1625), Foushee 532.
- **Cross-board ripple is INTENT**: shared 0.5 -> cross-industry 0.15 in every map (Gillibrand crypto 7 -> 9, Donalds bank 1 -> 5). CU desk: 397 display-rank movers off baseline 0.512613 -> 0.511313, only 4 tier crossings (Williams 3 -> 0 direct H.R.6891 holder; Lieu takes her seat 0 -> 3; Klobuchar / Ezell swap the 2/3 line). `ranks_python` 0/533; chain green 202/1 (known culling gate).
- **DEPLOY LAW for tag-class changes: engine-inputs -> make_member_desk -> industry_tiers -> chain** - the parity gate correctly refuses fresh-factor vs stale-bundle (the roster_baseline self-test catches artifact staleness first).
- Codex MCP sandbox now write-blocked even in worktrees -> authored-lines pattern (Codex authors exact bytes on-thread, Fable materializes verbatim, acceptance-checked).

### Bank sweep + tier-1 floor 2026-08-10 @573cf9b / merge 27c6986, main synced at Paul's order

- 15 more acts promoted: bank 2 -> 10 (SVB Act x2 57+18 links anti, Stabilizing Vulnerable Banks anti, Critical Bank Review anti, Public Banking anti, Ensuring U.S. Authority x2 pro, Banking Regulator Accountability pro); crypto 92 -> 96 (STABLE Act 18-links + S.919 GENIUS-reported pro - House undercount fix - ECASH x2 neutral); fintech 6 -> 9 (CFPB-BNPL-study bar, PACE, FedNow-remittance access, all pro). Ledger 100 -> 115 rows.
- **Non-CU tier-1 floor rule** (`_apply_tier1_floor`: unqualified tier-1 slot-holders demote to tier 2; `INDUSTRY_TIERS_T1_FLOOR=0` reverts; CU exempt): fintech tier 1 = 6 real members, 7 demoted; bank/crypto 0 demotions, 13/13 qualified.
- Bank board: Loudermilk / De La Cruz / Williams / Barr top, SVB + public-banking bloc at bottom (Moulton 533, DeLauro 532, Warren 529).
- Deploy law held (engine-inputs -> desk -> industry_tiers -> chain); ranks 0/533; CU tier-1 MEMBERSHIP unchanged (Padilla No. 1 desk-factor list); 481 CU display movers, 12 tier crossings (SVB 57-cosponsor mass dominant). Backfill re-emission churn = CRLF phantom, dissolves via `git add` renormalize (twice proven).
- **Seat-guard conflict RESOLVED by Paul's INDEPENDENCE RULING 2026-08-10 ("if it checks out it checks out — don't hold the other industries to the CU gold standard; they are independent of each other") @e1cb66e:** the adjudicated-five pins re-ratified from exact-rank (633-act era) to TIER-MEMBERSHIP guards (T1 <= 13, T2 <= 37) - lawful cross-industry data changes no longer fire the check, tier eviction still does. Standing doctrine: CU-grade sanctity (ratified pins, parity gates) never vetoes independent industries' lawful data improvements. Lane note: the guard edit was applied directly by Fable (codex round classifier-blocked, deviation disclosed).

### CU AXIS shipped @c54ed56 (2026-08-10) and the axes spec @a4d2146

- `acu_position` floors the CU-map weight: SUPPORT >= 0.5, OPPOSE = -1.0; engine `ACU_RELEVANCE` + flag; non-CU scoped boards exempt via `_scoped_act_weights(acu_relevance=)`; pinned in `_constants.acu_position_relevance`; GENIUS/STABLE count for CU again per Paul's ruling; Huizenga restored.
- **INDUSTRY_AXES_DESIGN.md spec @a4d2146**: tensor = relevance x valence per act x industry; dim-3 fork recorded; phases 3-5 user-gated.

### Association-anchor campaign 2026-08-10 (Paul: "bulk up Bank... full throttle" then "same sweep for fintech and crypto trade associations"; sourcing = the trades' own highlighted bills: ABA / ICBA / BlockchainAssociation / AFC)

- `build_bank_anchor_backfill.py` (historical name, now 11 INDUSTRY anchors @1e3f103) = registry-backfill pattern for association bills; pinned govinfo BillStatus; **STRICT-BIOGUIDE resolution law** (the Resolver name-fallback false-matched departed Sen. Menendez -> House Menendez and Sherrod Brown -> SHONTEL-Brown-as-sponsor; caught live @444d119 - historical rosters resolve by bioguide ONLY); departed receipt-skipped; cardinality 633 -> 640 -> 644 (audit literals in lockstep).
- Anchors: bank 7 (clawback S.1045 / 1790 / 4050 anti; ILC S.3538 / 3734 pro ICBA; ACRE S.838 / H.R.1822 pro ABA-No. 1; S.2190 dropped zero-resolvable; FIRM already in-universe), crypto 3 (DAAMLA S.2669 anti 17-senator mass; BITCOIN S.954 / H.R.2032 pro) + Anti-CBDC H.R.1919 (133 links) / S.1124 promoted shared -> crypto_primary, fintech 1 (EWA H.R.9330 pro AFC).
- Loader relax: rows valid on oppose-class acts (CCCA 6 + S.Amdt.2229 - reclassed shared -> oppose - bank-anti per ICBA; rate-cap trio bank-anti AND fintech-anti). Ledger 115 -> 132 -> 141.
- **BOARDS: crypto tier-1 = Lummis No. 1 / Cruz / Hagerty / Boozman / Emmer - the session's opening complaint answered by evidence; bank all-qualified with Senate (Kennedy No. 3, Moran No. 4), anti tail Warren-533 / Fetterman / Hawley (own cosponsorship) / Durbin; fintech 6 real.**
- OPEN: fintech filler below 6; cross-primary valence (ILC-as-fintech-anti -0.15) = tensor phase 4; DAAMLA-119 reintro unverified. Counts: cu 61, bank 10, crypto 101, fintech 10.

### Paul ratified the boards and ordered uniformity: UNIFORM-CLEAN-V1 @7809e75 / merge 249a61a, main synced

- **PAUL RATIFIED the boards ("Those ranks are perfect")** and then ORDERED FULL UNIFORMITY ("run it identical for all 4").
- ALL FOUR boards now use identical machinery - adjudicated credits EXCLUDED from every board (desk-only refinement), `acu_position` axis kept for CU (its declared-position layer), 0.75 floor + tier-1 floor uniform; bundle-parity mirror / selftest / parity-refusal REMOVED; `validation.method="uniform-clean-v1"` (MLN gate + source-contract test repinned in lockstep).
- CU board clean tier-1 = Padilla No. 1 ... Hagerty No. 13 in, Huizenga t2 (his seat was the adjudicated credit - the desk still shows it); CU MEMBER DESK method untouched. Pre-measured clean-vs-desk: 12/13 identical, adjudication layer worth 2-19 ranks for the five.
- **The CU-method-validation TEST also PASSED first: ACU declared agenda (Board Modernization / Veterans MBL / FOM / CLF / CUGMA / CDFI / tax-letters) = 100% recall in-universe** - validates the association-sweep recipe against gold ground truth.

## Related Topics

- [[2026-06-feature-melange-dashboard-ui-evolution-august-redesigns]] — Dashboard UI in August 2026: the industry-tab round 2, the black and gold retheme, the rankings-and-data-only simplification and the preview workflow.
