---
type: topic
title: "Corpus census, demographic expansion A-H and the five-paper research integration (Melange data-collection lanes)"
aliases: ["Melange data-collection lanes: Corpus census, demographic expansion A-H and the five-paper research integration"]
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

# Corpus census, demographic expansion A-H and the five-paper research integration (Melange data-collection lanes)

> Melange data-collection scope: the corpus coverage census of 2026-07-10, the demographic expansion A to H of 2026-07-24/25 and the five-paper research-integration lane of 2026-08-14. Part of [[2026-07-feature-data-collection-lanes]] (project [[melange-systems]]).

## Corpus coverage census (2026-07-10)

Question answered: "did we miss anything in congressional archive / floor transcripts / CNN?" via a read-only query of `social_media.db` table `speeches` (2026-07-10).

- **Floor speeches are NOT a gap - fully backfilled.** `speeches` = 259,569 rows, 2003-01-02 to 2026-07-05, zero missing dates (current to 5 days). By source: INTERVIEW 142,064 (55%); CREC (floor speeches) 104,632 (40%; House 63,550 + Senate 41,082); CHRG 12,873 (5%).
- The collector `fetch_congressional_record.py` default `--since 2025-07-01` is only the INCREMENTAL floor; deep backfill already ran. The corpus is interview-dominant (good per the literature: spontaneous dialogic speech beats staffed floor text).
- Pinned expectation `'speeches': 234827` (`b5_a_matrix.py:31`) is stale-low; actual grows with collection. `posts` = 29,098 (matches pin).
- Deliberate floor exclusions are CORRECT, not misses: Extensions of Remarks (PgE) excluded (written inserts, never spoken); CHRG hearings are finance-scoped only (banking/CU/housing/securities/CFPB) - right for the CU model but a boundary if cross-committee behavioral signal is ever wanted.
- The broadcast family is about 10 legs (under-listed before), all in `fetch_interviews.py` under `collector_supervisor.py` (relaunches every 10 min): CNN, MTP, CBS (Face the Nation), ABC (This Week), PBS, NPR (4 programs), NPR podcast (1A/H&N - DEAD, see `psych-audit-2026-07-09`), Fox, Hugh Hewitt (~2005 to present radio), MS NOW. All resumable via `iv_fetch_log`.
- Fox ceiling sharpened: code says posting STOPPED ~2024-10 (archive back ~2018; volume already collapsed by 2023); post-2024-10 needs YouTube-caption diarization (does not exist). CNN is fully walked and `cnn-deep` backfills below 2024-06 to CNN's own ~2023-05 publishing floor.
- **Congressional archive (legislative) = the real soft spots:** the bills archive is a manual Excel export (`congress_bills_archive_*.xlsx`, last 2026-06-24, about 2 weeks stale, no auto-refresh) - softest link; votes = Voteview HS117-119 via `_get_votes.py` plus manual `_finalize_drops.py` clean (raw re-downloadable; the CLEANED `cu_rollcall` is the severed/fragile artifact per `audit-network-vote-cycle-2026-07-08` - do not reverse that); Congress 120 uncollected (rollover, seats 2027-01-03, `skills-library-2026-07-10` rollover campaign).
- **Actionable misses ranked:** (1) C-SPAN Washington Journal - robots-blocked, needs UMN licensing, highest value (rank-and-file for the n>=250 gate); (2) CSIS + AEI - GO but unbuilt; (3) bills-archive auto-refresh; (4) Fox post-2024-10 diarization; (5) Congress 120.
- **Governing literature point:** all of these buy member COVERAGE, not trait ACCURACY - none lifts the ~.42-.52 shared-method text-personality ceiling; the only outcome-changing target is pushing reactivity coverage past the 250 power gate (216 today). Related: `psych-audit-2026-07-09`, `dispositions-dependability-2026-07-09`.

## Demographic expansion A-H (2026-07-24 / 2026-07-25)

Paul's Demographic Expansion outline (PDF, 2026-07-24) executed as a full /metaloop campaign; phases A-F all Codex-executed, double-signed, merged to `claude/melange-demographic-expansion-362136` (Phase F merge 3b7863c). Final state: "A-F + G employers + H financial ALL DEPLOYED (main @8b491fc, audit 148/0, G/H desk cards live); HMDA patient collector = the one open thread".

**Ratified up front:** scope A-F (G employers and H financial DEFERRED as follow-on campaigns, later fired); division by CD-count = display plus new artifacts ONLY (workbook Demo% pillar untouched - rank-moving, his gate); pie = all 20 NAICS in a 4-family palette; employers later = automate-tractable plus queue.

**New scripts (all standalone, none chained yet at first):**
- `fec/fetch_cd_geography.py` (Census BEF block to CD119/118, 57 redrawn districts in AL/GA/LA/NC/NY = Census's own list).
- `fec/fetch_lodes_wac.py` (LODES8 WAC JT01 2002-2023 mirror plus panel, swappable `LODES_XWALK` boundary dial).
- `fec/build_district_industry.py` (LQ national+state, growth quotient, shift-share with zero-error reconciliation across 486 geos; states carry `per_district_equiv` = raw / n_districts).
- `fec/fetch_cbp_4digit.py` (CBP2023 4-digit screen, LODES-block county-to-CD weights replacing Geocorr, CT planning-region bridge, MBL sub-20 counts, 522130-vs-522110).
- `fec/validate_district_industry.py` (5-bar battery).
- Desk UI: `pieSVG` primitive plus industry sub-block in `make_member_desk.py`/tpl plus `dashboard_integrity` fingerprint entry; 532/533 members (PR Resident Commissioner unresolved by design; DC delegate maps to DC state-kind).

**Raw data OUTSIDE OneDrive per mentat rule:** `%LOCALAPPDATA%\Melange\demographics` (geo/, lodes/, cbp/, validate/).

**Validation verdicts (`district_industry_validation.json`):** state-totals 43 pass / 8 FAIL STANDING HONESTLY (DC .175, MD/HI/DE/CA/VA/SD/ME .10-.11 - all positive, federal-security-universe undercoverage in LODES; file/job-type error ruled out - do NOT "fix" or relabel); census-CD cross-check median 3.74% validates the weight machinery; BEA higher 99.9% ratio 1.68; 61.9% of national estimate flows through split counties = declared largest error term.

**How to apply / data quirks:**
- Per-geo latest years differ (MI 2021, AK 2016 - LODES gaps recorded in `lodes_panel_manifest.json`).
- CBP quirks: emp flags G/H/J = published-with-noise (only D/S suppress); range sectors encoded `31----`/`44----`/`48----`; 'N' cells; CT keyed by planning regions 09110-09190 (bridge: CTData 2022blockcrosswalk, `block_fips_2020` to `ce_fips_2022`).
- QCEW: prefer `own_code` 0 rows (suppression-proof).
- BEA CAEMP25N: latin-1, footer rows, '(NA)' sentinels, lags to 2022, VA independent cities absent.

**G + H FIRED AND SHIPPED (Paul "Fire Phase G and H", 2026-07-25):**
- G employers @5961021 (`district_employers.json`): USAspending top-10 federal recipients per district FY2025 place-of-performance via `district_current` POST (plain-UA works); `recipient_id` kept; MULTIPLE RECIPIENTS bucket skipped display-side; CBP 500+/1000+ large-establishment with lower-bound complete flags; 52-row `employer_collection_queue.csv` (UT = dashboard-only, CA = TLS-broken, MD = county HTML).
- H financial @da644c4 (`district_financial.json`): FDIC SOD 2025 76,120 branches / $18.1T via api.fdic.gov paginated plus NCUA 2026-Q1 branch file; whole-county fast path plus BEA-name county resolution plus Census batch geocoder 4-wide 91.6/89.3; SOD HQ-deposits caveat (NY-12 JPM $777B is booking location).
- G/H desk cards @8b491fc: three per-artifact-OPTIONAL Demographics sub-blocks; senator state aggregates HHI-null; the mortgage card auto-surfaces when `district_hmda.json` lands plus a desk rebuild.
- **HMDA = open thread:** the CFPB WAF blocks plain UAs (browser headers worked once then IP-flagged) and ALL panel/institutions routes 403/auth-walled, so the lender split is DEFERRED (the outline only needs origination plus LMI shares). `fec/fetch_hmda_district.py` = patient collector, SHIPPED @743b619 (WAF-pending; 120s to 1800s backoff on 403, 15s spacing, per-state aggregate caches, tract-to-CD weights built clean including CT tract recode; failure gate BEFORE artifact write - blocked runs never clobber). Resume = rerun the script from the live tree (caches survive); spawn-chip task_66fb9896 queued for the rerun.
- NCUA parse pins: `SiteName`/`PhysicalAddress*`, `FS220.txt` exact, default csv dialect.
- Other sessions land on main concurrently (5185954 X-collector) - always re-check the main tip before merging.

**ALL A-F GATES CLOSED (Paul "Do all of them", 2026-07-24 late evening):** merged to main @5b6401a; live tree fast-forwarded d2c1086 to 5b6401a; 4 artifacts deployed to live root; desk plus `Moneyball.html` rebuilt on live; FULL-BODY AUDIT 148 passed 0 FAILED including 7/7 [IND]. Chain wiring live (`build_district_industry` after `build_electoral`, tuple OPTIONAL_INPUTS clean-skip); the `audit_full` [IND] section's 450-day staleness FAIL = THE annual-refresh cadence mechanism ("ANNUAL REFRESH DUE" message names the rerun sequence); Constituents relabeled "(poverty universe)" plus tooltip.

**BLS QCEW LQ audit (Paul "audit against the stats website"):** 963 state x sector pairs r=.984, median |d|=.026; 3 divergent sectors = ownership-universe artifacts with named causes (NE 100% public power, TVA, public universities, OK tribal gaming) - scratchpad `bls_lq_audit.json`.

GLASS BOX 4 lanes verified online the same evening. Codex threads: A 019f9653, B 019f9666, C 019f967f, D 019f9692, E 019f96b8, F 019f96f6; ledger run-ids `demoexp-A..F-20260724`. Worktrees `cxwt-demo-{geo,lodes,industry,cbp,validate,ui}` left as review surfaces. Related: `codex-executor-lane-2026-07-18`, `bill-coverage-and-media-stance-2026-07-19`.

## Research-integration lane, five papers (2026-08-14)

- Lane state (2026-08-14): Paul supplied five papers; the deliverable `RESEARCH_INTEGRATION_2026-08-14.md` is committed `208111500` on branch `claude/melange-research-integration-a31e20` (worktree `melange-research-integration-a31e20`); brain STATE updated and committed `5be2b6e` (per D-006 sessions commit the brain directly - the CLAUDE.md "draft for Paul" line predates D-006).
- Papers: FOLAR (NN 2025, FOL-CoT for the 0.689 valence hop), Zhan-Cai TWD consensus (ESWA 2025, trust-KNN imputation + CAP/LP triage), BICAM (Sci Data 2025, Bills-to-LDA linkage + rollover backbone), CampaignView (Sci Data 2025, campaign-site corpus), SNGDM survey (Info Fusion 2025, signed trust operators).
- 12 proposals / 3 tiers / 4 parked-rejected, each with dead-end adjacency. NOTHING authorized - every APPLY is Paul's section 8.4 menu.
- **Why:** future sessions must not re-digest the papers, re-propose the parked items (F3 multi-LLM fusion breaks the Haiku-only law; S2 third physics breaks the two-cpf invariant; E4 monotone trust; BICAM backbone swap churns legfix5), or miss the clock.
- **TIME-BOXED:** the 2026 general-election campaign-site collection (CampaignView protocol, ~870 House + Senate class) must run Sept-Oct 2026 - sites decay after the November election. If Paul says yes late, collect FIRST, polish later.
- Grounding facts found while writing: raw `reactivity_z` coverage is now 270 (the round-4 N-route gate value 250 binds on the uncounted MEM_N = MEM intersect reactivity intersection - counting is synthetic-side, risks no look); `outcome_snapshot_2026-07-04.json` moved to `data\engine\` (the research-frontier skill's root pointer is stale - post-reorg, verify skill provenance paths before citing), scoreable ~2026-09-02.
- **Fan-out lesson:** parallel PDF-reader subagents cross-contaminated a SHARED scratch file mid-extraction (two readers saw sibling papers' fragments; both self-recovered via re-extraction plus DOI/PII identity checks). Give parallel readers DISJOINT scratch filenames. Also: harness-reported PDF page counts ran ~2x the extracted counts on all five files - readers should verify completeness by content, not the briefed count.
- Related: `examination-lane-lessons-2026-08-14`, `hallucination-framework-lane-2026-08-13`, `universal-lane-laws-2026-08-09` (glasseye pairs were emitted for all five fan-outs).

## Related Topics

- [[2026-07-feature-legislative-pillar-acu-review-bill-plane-and-media-stance]] — The 2026-07-10 corpus census and the bill-plane audit and press media-stance display from 2026-07-19 on, through the crown and money rulings, tier weights and Codex-lane hardening.
