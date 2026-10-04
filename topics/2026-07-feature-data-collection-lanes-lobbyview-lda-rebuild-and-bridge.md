---
type: topic
title: "LobbyView lane: LDA rebuild, datasets and the FEC x LDA bridge looks (07-31 to 08-01) (Melange data-collection lanes)"
aliases: ["Melange data-collection lanes: LobbyView lane: LDA rebuild, datasets and the FEC x LDA bridge looks (07-31 to 08-01)"]
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

# LobbyView lane: LDA rebuild, datasets and the FEC x LDA bridge looks (07-31 to 08-01) (Melange data-collection lanes)

> The LobbyView lane of 2026-07-31 to 08-01: the positions dataset and network table acquired, the LDA rebuild, the FEC-bridge design, and the three FEC by LDA bridge rounds (round 1 void for coverage with its look not consumed, rounds 2 and 3 with their consumed looks). Part of [[2026-07-feature-data-collection-lanes]] (project [[melange-systems]]).

## LobbyView / LDA integration lane (2026-07-31 to 2026-08-12)

### POSITIONS DATASET ACQUIRED (2026-08-01)

Paul-supplied paper: Kim/Kim/Jeong/Oh/In-Song-Kim, PNAS draft 2025-04, "Measuring Interest Group Positions on Legislation".
- 279,104 positions x 12,032 SIGs x 42,475 bills, 111th-117th (2009-2022), keyed by `lob_id` - direct join to the whole pipeline; labels Support/Oppose/Amend/Monitor/Engage; LLM stage validated ~96% vs humans, GNN stage ~78%; downloaded from Harvard Dataverse doi:10.7910/DVN/D0QWM2 to `%LOCALAPPDATA%\Melange\lda_rebuild\raw\positions` (5 components including `human_validation`); replication code github.com/hikoseon12/lobbying-position (LLM prompts in `llm_bill_position_pipeline` - reusable via OUR Haiku lane for 2023-2026 on swept text).
- **THE COVERAGE TRUTH:** our pinned fintech/crypto 22 have 56 positions over 14 years, ONE directional (BECU 1 Support) - positionless-filer corpus CONFIRMED at validated grade (the 7%-verb probe was right for these orgs). Directional positions live with TRADE ASSOCIATIONS: CUNA 174S/12O, NAFCU 168S/23O, Michigan CU League 23S/8O (credit_union side 61% directional - most expressive sector); ICBA 215S/15O, ABA 178S/20O, MBA 128S. Finance sector total 1,753 directional.
- Product value independent of any correlation: member-level ally/adversary map from CU-association Support/Oppose bills x sponsors.
- ROUND-4 FAMILY (designed, NOT locked, Paul's pick pending): (a) within-member SPIKE design - monthly direct money x quarterly attention, member = own control, unclosed estimand; (b) position-conditioned TRADE-ASSOCIATION design - needs the 2023-26 position extension via their pipeline (their 2009-22 CUNA/ABA labels = free calibration gold); multiplicity-corrected single family lock when Paul picks.

### BRIDGE ROUND 3 - LOOK CONSUMED (2026-08-01 @36afda8/@4fddaa7): UNCORROBORATED, and DECISIVE

- N=213 pairs (fintech + crypto x two cycles; CU coverage-limited both cycles - only BECU + NavyFed harvestable, PenFed zero-harvest).
- Raw pooled rho = +0.153 with member-blocked exact p=.0146 - the raw money-attention association IS statistically real - but the four-control partial = -0.0002 (LITERALLY ZERO): party + chamber + volume-within-party + finance-committee jointly absorb ALL of it; even the committee-free three-control partial = .073 < .10, so overcontrol is NOT the story.
- THE FINDING: money and lobbying co-locate because both flow to the same structural targets; industry money adds NO member-level information about lobbying attention beyond WHO the member is. Round-2's +.26 was structure in a trench coat.
- Firewalled color: crypto 2025-26 rho=.293 p=.010; crypto 2023-24 NEGATIVE -.146; fintech 2023-24 nil. Battery PASS 4/4 with a NON-VACUOUS confound check (raw .47 refused at partial .079).
- Real-data catches en route (all fail-loud, all fixed via Codex): `client.client_id` is REGISTRANT-SCOPED (id=12 = Block AND Robinhood AND Coinbase AND Klarna AND Stripe - `client.id` is the global key; would have cross-blended five orgs silently); sweep pagination-drift duplicate (dedupe-first-occurrence); committee YAML inline-empty `HSBA01: []` parser shape; `legislators.csv` worktree copy (law-7 empty data plane) SHA-verified against lock pin.
- **CLOSURE BINDS:** the 2023-2026 window on this instrument is CLOSED; a different control set on this window is NOT a successor. **STANDING PRODUCT RULE (twice-locked now): FEC exposure is NEVER presented as a lobbying predictor;** the structural variables (party/chamber/committee - already core model pillars) ARE the attention predictors; current-period lobbying questions use the DIRECT sweep-based measurement (current to ~1 quarter). The FEC lane's real role = the money-relationship dimension itself. Future-legitimate: a change-on-change (first-difference) design on a later window = different estimand, new prereg, NOT now.

### BRIDGE ROUND 3 LOCKED (@bb8a034, 2026-08-01, pre-collection)

- 2023-2026 window; four controls (party, chamber, volume-WITHIN-party, finance-committee via TWO pinned upstream commit snapshots of `committee-membership-current.yaml` - no historical file exists); member-BLOCKED permutation (cross-cycle member duplication was anticonservative - caught by the 2-lens pre-lock panel, 17 findings ALL incorporated); fractional ranks; pivoted-QR/SVD dual projections; battery confound check through the REAL control span with VACUOUS-PASS clause; X (CE3136...) + `legislators.csv` (C5A6CBDB...) pinned at lock. Bars rho >= .20 / member-blocked p < .05 / 4-control partial >= .10.
- PRE-LOCK DIAGNOSTICS (2021-22-window sides, recorded): crypto X~party +0.87; total-attention~party -0.76; crypto Y~senate +0.46 - suppression pattern, design honestly disclosed as directionally favoring the hypothesis. Overcontrol clause pre-declared (committee = possible mediator; bar-1-pass + bar-2-fail-only-with-committee gets a fixed interpretation sentence, tier unchanged).
- Needed before the look (all later done): Codex builds (sweep-page ingestion + client_id harvest + committee-roster artifact + `fec_lda_bridge3_look.py` - script commit must precede COLLECTION RECORD), sweeps 2023-2026 completing (~17k pages, monitor armed), pinned 2023-24 delta fetch, COLLECTION RECORD, battery. Closure if UNCORROBORATED covers the WINDOW (de-gamed wording).

### BRIDGE ROUND 2 - LOOK CONSUMED (2026-08-01 @c9fc43a): UNCORROBORATED at p=.098

- Paul asked for the significance test; full discipline held: `fec_lda_bridge2_prereg.md` LOCKED pre-collection (Y = OUR strict rebuilt network 2021+2022), battery PASS 4/4, one look.
- Pooled Spearman +0.259 (above the .20 bar), volume partial +0.170 (above .10), but permutation p=.098 missed .05 at N=52 (credit_union coverage-limited in OUR strict table; fintech 30 + crypto 22 pairs only). Locked verdict wording binds: FEC exposure = target-side money prior ONLY, predictor framing BARRED. NOT disproven - told Paul honestly: right direction, right size, underpowered window.
- Firewalled secondaries (ground nothing): fintech .284/p .068; crypto ~0 (strict-network coverage thin); year-splits stable .27/.26. Route CLOSED for 2021-2022 on this instrument; successor = a window past 2022 via the 2024-2026 sweeps (key in hand: `LDA_API_KEY` at `%LOCALAPPDATA%\Melange\lda_rebuild\lda_api_key.txt`; per-ACCOUNT quota ~128 req/min - parallel workers DO NOT help, 8@45rpm optimal ~2/s; page_size hard-capped 25).
- Same session: forward-binding stale-citation rule shipped (115th BILLSTATUS on disk; a real dual-suffix filing was the forcing fixture); full finance rebuild 2021/2022 = 19,191/20,156 strict edges; sponsored-or-cosponsored label fix landed.
- NOTE for successor design: finance name-rule sets EXCLUDE most fintech/crypto (classify as 'other') - the union-worklist pattern (finance union pinned) is required; industry-set expansion (fintech/crypto name rules) would fix it properly and feed the dashboard chooser too.

### FEC x LDA BRIDGE PREREG (ROUND 1): VOID-FOR-COVERAGE (2026-08-01) - LOOK NOT CONSUMED

- Paul directed the correlation test (FEC donations vs lobbying attention, to become a predictor); full prereg discipline: `fec_lda_bridge_prereg.md` LOCKED @9a1e3a1 pre-pairing (org-exact 22-`lob_id` crosswalk, pooled within-industry ranks, integer-exact permutation exceedance - a 3-lens workflow review DEMONSTRATED the float-tie DEFECT-HALT hazard pre-lock and it was fixed before lock).
- `--simulate` gave VOID: network member linkage COLLAPSES after 2021 (rows/yr: 2020 = 1.21M, 2021 = 659k, 2022 = 2,101); only 8/22 pinned orgs have rows EVER, only 4 active 2021-22 (BECU, Block, Robinhood, Coinbase Inc.) - fintech/crypto ramped lobbying exactly where linkage dies. The FEC-vs-LDA overlap window is structurally EMPTY (FEC starts 2021, linkage ends 2021) - independently confirms the 42-month-lead thesis.
- ADDENDUM 1 recorded @d529605. BINDING until a successor look: FEC exposure = target-side money prior; the words "lobbying predictor" and projection framing are BARRED in every display. Successor prereg ONLY on a new LobbyView vintage extending network coverage past 2022 (fresh fingerprints, one look); relaxing entry/floor on this vintage is recorded as futile - never attempt. Told Paul plainly: untested is not disproven; FEC remains the only member-level signal for the current period.
- Successor trigger intel (Paul-supplied paper, arXiv 2503.11745 v2 Feb-2026, LobbyView team incl. In Song Kim): the paper analyzes 1999-2023 at full report volume - our 2022 = 2,101 cliff is likely export-processing lag, not a wall; their Fig-S9 legislator network runs to 2023 (CAVEAT: partly revolving-door edges, not proof the bill-linkage table extends). Replication data = anonymized OSF (osf.io/y2hnm, likely identifier-stripped). The actionable path: Paul emails the LobbyView data contact (contact email omitted) asking when a post-2024.10 bulk export with network coverage past 2022 ships; when the file lands, fresh fingerprints + successor prereg + one look.
- Network repository SHIPPED same session: the collector processes 10.9M dyads to 63,991 member-years @9d0b39a/@6448b03 (blank-bioguide 458 rows receipted-skipped, FEC unattributed convention); `lobby-network.html` DEPLOYED to live root (3 finance cards, YoY, coverage banner); review sheet 573 finance rows AWAITING Paul's ratification; dashboard header link staged in tpl - goes live on merge plus dashboard regen (live tree sits on cfpb branch, Paul's gate).

### LDA REBUILD LANE (2026-08-01, Paul "Apply for the surgical", committed @b12bbfc on the handoff branch)

We can now BUILD the network ourselves from the primary source. `fec/collect_lda_filings.py` + `fec/build_network_2021_rebuild.py` + a 15-test suite.
- **THE construction discovery, PROVEN set-identical: LobbyView network edges = sponsor + ALL COSPONSORS of each lobbied bill** (BECU 2021: 181 edges = exactly HR1996's 1+180 people, zero symmetric difference). The shipped `lobby-network.html` label "sponsored" needs the one-line "sponsored or cosponsored" fix (QUEUED; later landed).
- Bill linkage = formal identifiers (only 26/117 filings carry them) + TITLE matching (official/short/popular from BILLSTATUS-117 bulk, on disk at `%LOCALAPPDATA%\Melange\lda_rebuild\raw`).
- 2021 cross-comparison: 312/329 their edges reproduced (94.8%); BECU 181/181 + Block 32/32 EXACT; theirs_only 17 = Robinhood's stale-116th-number citations ("Inclusive Prosperity Act of 2019, S.1587/H.R.2923") that LobbyView resolves to 117th REINTRODUCTIONS (+1 Coinbase); ours_only 203 = the PINNED companion-bill fan-out policy (ambiguous titles credit all companions; HR4521 alone = 95 edges) vs their single-bill resolution.
- Senate API DOMAIN MOVED: lda.gov (`lda.senate.gov` serves HTML with HTTP 200 - fail-loud caught it). Review rounds killed phantom classes pre-run: possessive/U.S. bare-S parses ("the SBA's 7(a)" gives S.7!), cross-activity joins; dotless bare-S is diagnostics-only FOREVER.
- **PAUL RATIFIED ALL OF IT, verbatim "if you can confidently improve it, fuck them lets go" (2026-08-01): CANONICAL RULES SHIPPED @37d83ee** - stale citations ('of 20XX' segments) resolve to the ORIGINAL congress's bill (BILLSTATUS-116 hr+s on disk; never the filing-congress same-number accident - our first run's 21 "agreement" edges were mutual-bug agreement, deliberately dropped); titles credit current-congress reintroductions; DUAL EMIT generous + strict per year; multi-congress 116-119; collector has `--worklist` + `--sweep-year` (full-year pagination, `LDA_API_KEY`-ready).
- FINAL 2021 adjudication: common 308/329 (93.6%), BECU 181/181 + Block 32/32 EXACT, Coinbase 35/36, strict-mode 329 edges, 20/20 stale citations resolved, every remaining delta named per-edge (Robinhood 20 = their black-box cross-congress links, declined on principle; our 3 = their outright misses).
- IN FLIGHT then: finance-set fetch (7,717 filings, 281 lob_ids, worklist `finance_2021_2024_filings_worklist.json`) - ~8.6 h anonymous, RESUMABLE, jumps 8x if Paul registers a free LDA API key at lda.gov (HIS action - account creation; set `LDA_API_KEY` env). NEXT after the fetch: build the 2021-2023 finance network, dashboard feed switch to OUR table, 2024-2026 sweeps (key), THEN a fresh prereg for FEC x LDA on our instrument (real 2021-2026 overlap).

### NETWORK TABLE ACQUIRED (2026-07-31, late session)

Paul logged into lobbyview.org himself (Claude never touched credentials - a password appeared in chat, Paul advised to ROTATE it); Claude drove his Chrome via the Chrome lane to download `network_codebook.zip` (56.4 MB) from `/data-download/datasets/network_data`, extracted `network.csv` (571,056,869 bytes, md5 f8867b71c875a1f758f4d962407ade49) + `network_codebook.pdf` into raw.
- Vintage PROVEN identical to the 2024-10-25 bundle: the zip's `version.pdf` md5 == the on-disk provenance md5 (059E6A47...).
- Schema: `lob_id, bioguide_id, year, n_bills` - `n_bills` = bills SPONSORED by that member which the client's filings lobbied; an absent dyad MEANS zero and dyads disappear/reappear across years, so YoY aggregation MUST zero-fill, never treat as missing.
- Full-file receipts: 10,937,756 rows; years 2000-2022 (SAME cliff family as issue codes - network YoY runs only through 2022, FEC stays the sole fresh signal after; 42-month lead intact); 1,390 distinct bioguides (historical incl.); 16,003 distinct `lob_id`s; sum n_bills 81,340,354.
- Collector re-run: manifest `network` present:true processed:false (inventory-only, FUTURE_TABLE), data_rows + md5 match an independent scan; data CSVs byte-identical pre/post, JSON outputs re-hash per run (embedded provenance - expected). NEVER use the deprecated v2021 legacy zip (incompatible identifiers). Still missing as bulk: `issue_text` (texts), bills. NEXT (design presented, awaiting Paul's Apply): collector network-processing extension + industry x member x year repository artifact + dashboard drill-in (industries, most-lobbied members, YoY, honest label "member's sponsored bills lobbied").

### FEC-bridge design (proposed, awaiting Paul) and core data facts

- LDA issue-coded lane trustworthy through 2021 (+ the 2022 sliver); side-classified ALL-reports spend (no issue filter needed for HIGH-confidence adversary clients - ABA does not lobby non-finance) covers 2022-2023; FEC deviation-from-baseline covers 2024+ as target-side prior, calibrated on overlap years, confidence-tagged fec-bridge. FEC is not a stance predictor (reverse causality plus committee double-count); `congestion.json` frozen at the 2024 cycle, no live producer (rollover campaign owns).
- Material finding (standing): LobbyView `naics` is entity-linkage metadata, NOT an industry classifier; names decisive, NAICS suggestive only; 5221 to financial_other never bank; HIGH confidence = unambiguous name token (53 banks, 50 CUs), LOW = generic `\bBANK\b` or NAICS-only (191 banks) = review queue; adversary sets built from HIGH only, sets remain candidate status awaiting Paul's ratification. Regex, receipts, guards and API facts: see [[lobbyview-collector]].
- Related: `melange-coalition-builder-redesign-2026-07-30`, `mentat-trade-association-gap-2026-07-27` (the register's ~28% trade-$ coverage is why LDA carries targeting), `codex-executor-lane-2026-07-18` (this build: the Codex sandbox had no python, so edit-only dispatches; one MCP response lost after 30 min but the edit had landed on disk - check the file before redispatching), `ask-before-substantive-changes`.
