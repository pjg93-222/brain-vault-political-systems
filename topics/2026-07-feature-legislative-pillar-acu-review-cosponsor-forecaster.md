---
type: topic
title: "Bill-lobbying regression lane: the cosponsor forecaster (09-04) (Legislative pillar and ACU review)"
aliases: ["Legislative pillar and ACU review: Bill-lobbying regression lane: the cosponsor forecaster (09-04)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-01
sources: []
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-legislative-pillar-acu-review]]"
---

# Bill-lobbying regression lane: the cosponsor forecaster (09-04) (Legislative pillar and ACU review)

> The bill-lobbying regression lane of 2026-09-04: Paul's ask to make the cosponsor forecaster self-updating, the finding that it is already a ridge logistic model, and the BILLSTATUS bulk refresh and hash-gated forecaster step applied to the live tree. Part of [[2026-07-feature-legislative-pillar-acu-review]] (project [[melange-systems]]).

## Bill-lobbying regression lane (2026-09-04): the cosponsor forecaster

Lane: branch `claude/bill-lobbying-regression-d38c1e` (zero commits vs main 8953e7181), worktree `employment-tenure-adjudication-e27de8`. Paul asked 2026-09-04: (1) make "the current linear regression regarding the likelihood of getting onto a new bill based on their lobbying" self-updating from "the excel sheet and sentinel collectors"; (2) would logistic be better.

**Facts that are not obvious from the code:**
- There is NO linear regression on sign-on anywhere. What Paul means is `fec/lobbying/cosponsor_forecast.py`: ridge logistic by IRLS, lambda pinned at 1.0 by a raise at :1676, isotonic calibration on the 117 -> 118 split, unit = (bill, member), real zeros for every same-chamber non-joiner. Base rate ~6.5%. 119th test AP 0.236 vs best baseline 0.176. The only linear fit near lobbying is `fec_lda_bridge2_look.py` (FEC x LDA slope), a different question and barred from predictor language.
- Lobbying is not a feature. It only selects the bill universe: 13 of 790 119th bills enter via the strict LD-2 arm, 785 via finance-committee referral. Report key `cosponsorship_is_lobbying_substrate_not_lobbying: true`. The 2026-08-19 circularity memory (`lobbying-member-link-is-circular-2026-08-19`) applies to any member-level "lobbied" variable, not to this forecaster.
- Frozen: BILLSTATUS zips at `%LOCALAPPDATA%\Melange\lda_rebuild\raw\billstatus119` are a one-time 2026-08-01 pull (8 zips, ~49 MB, no receipt); producer `run_billstatus_bulk_enrichment.py` is manual (--plan/--out-root), nothing schedules it. The forecaster last ran 2026-08-14 01:05 (report + 165 MB scores.csv, sha null in the manifest because > the 8 MB hash cap, D-015). The forecaster is outside `run_pipeline.py`; chain step `bill_lobbying_sidecar.py` (:176) re-reads the frozen scores every run, so the lobby-network "Chance they sign on" had not moved since Aug 1. No runtime instrumentation exists for a forecaster run.
- weekly_refresh step 3 `update_bill_repository.py` refreshes `bill_repository_live.json` (464 bills, per-bill XML via headless Chrome, includes cosponsors) - NOT the bulk zips, and a different universe. Press/hearing/interview sentinels never touch bills. The only bill-side "sentinel" is Codex's uncommitted live-tree Sentinel Bill Ledger.xlsx (464 repository bills, 196 verified joins, 14,009 pending, no full rosters) - see `sentinel-workbook-ingestion-lane-2026-09-04` and [[sentinel-collectors]].
- `--min-cosponsors 5` is selection: a brand-new bill with <5 cosponsors gets no forecast at all. That is the real limiter for "new bill" use; relaxing it for a display-only live universe is a panel-contract change, Paul's call.
- Trait-features route into this forecaster is RETIRED WITHOUT A LOOK (`audits/FORECAST_COLLINEARITY_2026-08-17.md:115`, successor predicate DeltaAP >= +0.010 plant). The core forecaster itself is not retired; `forecast_ledger` freezes `cosponsor_join` from it.

**Plan presented 2026-09-04 (nothing applied at the time):** (A) weekly BILLSTATUS-119 bulk refresh with sha256 receipt; (B) forecaster as a chain step before the sidecar, gated on the report's `provenance.every_input_sha256` so unchanged inputs skip, plus an audit_full freshness check; (C) optional ledger coupling, contract-gated by `DOWNSTREAM_RECOMPUTATION_CONTRACT.md`; (D) scheduler re-enable is Paul's.

**Paul 2026-09-04 (later): "Sentinel Bill Ledger, do the timed dry run / AND Blended Workbook / C".** DONE, scratch only, record at live-tree `audits/COSPONSOR_FORECAST_SELF_UPDATE_2026-09-04.md`:
- Dry run 16.1 min wall, 1.06 GB peak RSS, exit 0; `cosponsor_scores.csv` BYTE-IDENTICAL to the 08-14 production file; report differs only by two new provenance fields per archive (`observed_congress`, `vintage_witness`) = code vintage; `every_input_sha256` identical. So the hash-gated chain step is proven sound and no coefficient cache is needed.
- The forecaster writes only under its out-dir (temp spools included); no network. Safe to dry-run.
- Coupling numbers: repository 119th bills 142, overlap with the 790 modeled = 57 (118: 59/169); 74 of the 85 non-overlap bills sit under the 5-cosponsor floor. Verified 119th joins 188: 178 in the candidate pool, 166 actual=1, 12 actual=0 (all joined after 08-01); joiner rank median 122/436, only 5/188 in the sidecar's top-8. Repository rosters (original_cosponsors UNION cosponsors) are COMPLETE vs BILLSTATUS-08-01 and exceed it by 19 post-pull joins; the first "806 missing" figure was the brief's artifact (compared only the later-joiner list) plus an `.//cosponsors` XPath that swept amendment-level blocks (H.R.1 has 99 amendments, 0 bill-level cosponsors). 20 pre-08-01 label gaps = departed members excluded from the 119 candidate universe via `fec/legislators.csv` (`cosponsor_forecast.py:1138-1144`), policy not defect. The repository has NO committee/referral data; `areas` is the CU taxonomy.
- Design in the record: A+B buildable now; C-ledger = (1) repository roster as weekly `actual` feed, (2) display-only no-floor scoring universe over the 142 repository bills (needs a score-only mode + committees from the per-bill XML), (3) top-8 sheet in the ledger via artifact-tool; C-Blended = READ NOTHING, WRITE NOTHING (rank authority, formula-cache trap, contract).

**Paul 2026-09-04 evening: "Build A and B" -> "Flip and run / Apply, Keep, Accept" -> "FINISH IT UP".** APPLIED to the live tree (uncommitted, no git), record `audits/COSPONSOR_FORECAST_REFRESH_RUN_2026-09-04.md`:
- 3 new files + 4 insert-only hunks; the chain step was MOVED after apply to position 56, immediately before `make_lobby_network_html.py`, because that producer reads the forecast files directly and would otherwise lag one run (the design record's "before the sidecar" placement was wrong).
- Dials `BILLSTATUS_BULK_REFRESH=1` and `COSPONSOR_FORECAST_REFRESH=1` persisted with `setx` at user scope; the weekly task bakes no env, so it inherits them. `MoneyballWeeklyRefresh` is ENABLED again (the sentinel-finish lane re-enabled it today), next run Sat 2026-09-06 06:00.
- A first run: 8/8 zips changed, 37 s. B first run: RAN 768 s, 8 hashes differed; 119th panel 790 -> 815 bills, positives 18,048 -> 18,817, AP 0.2386; all 12 verified post-snapshot joins flipped to actual=1 (0 remain); sidecar bills_with_forecast 304 -> 306; ranks byte-identical.
- The "Chance they sign on" grid lives on `lobby-forecast.html`, NOT `lobby-network.html` (the landing page excludes the forecast section by design). 1,928 bills carry rows, top 10 per bill.
- `build_system_manifest.py` is NOT a chain step and takes ~29 min; the `[SYS]` gate hashes the billstatus source store, so any zip refresh needs a manifest rebuild before the audit is clean.
- Full chain runs are currently BLOCKED at step 2 by the press lane: `audit_collection` REJECTS `outputs/press_refresh_20260904` (62 press-delta bodies without an exhausted-retry receipt). Not this lane's; `--from refresh_cosponsor_forecast` completed the tail. Kernel in live 175/2, both failures pre-existing (staffer-lane bare imports; test_primacy_tier frozen-board pins).
- A session restart kills background wrapper shells AND their child step (the in-chain audit died at 120 s); re-run standalone rather than trusting a truncated tail.

**Build record (earlier the same evening; built + verified in the worktree, UNAPPLIED at that time)**, live-tree `audits/COSPONSOR_FORECAST_REFRESH_BUILD_2026-09-04.md`:
- New: `fec/legislation/refresh_billstatus_bulk.py` (dial `BILLSTATUS_BULK_REFRESH`, all-or-nothing 8-zip GovInfo pull, receipts in data/engine + beside the zips), `fec/lobbying/refresh_cosponsor_forecast.py` (dial `COSPONSOR_FORECAST_REFRESH`, gate re-hashes the report's 353 `every_input_sha256` entries in ~6.5 s, subprocess forecaster into staging, atomic promote), `fec/tests/lobbying/test_cosponsor_forecast_refresh.py` (24 tests, run_tests.py walks fec/tests recursively so the subdir is found).
- Modified insert-only: `run_pipeline.py` (+8, before the sidecar), `weekly_refresh.py` (+9, after step 3, hard=False, NOT in the deferred list), `audit_full.py` (+22, `[FCST] cosponsor_forecast_freshness`, shares compare_inputs with the gate, FAILS on absent report), `run_tests.py` (+4). Both dials default OFF = production unchanged.
- Verifier 11/11 PASS; live audit check passes (353/0/0/0). Full kernel/chain/audit NOT run in the worktree (empty data plane) - they run in live after apply.
- Apply = anchor insertion, never file copy: live `run_pipeline.py`/`weekly_refresh.py` hold Codex's uncommitted hunks and `weekly_refresh.py` is LF while others are CRLF. `build_ab\apply_ab.py` (`--what-if` default / `--apply` / `--revert manifest`) rehearsed in a sandbox incl. double-apply idempotence + byte-identical revert; what-if vs real live = READY, every anchor once. The builder's `orig/` copies were resynced to LIVE by the apply-script executor, so they no longer show the main-vs-worktree diff (VERIFY_REPORT already captured it).
- Open for Paul (at build time): apply now?; audit FAIL-on-absent vs skip; 8 sequential replaces vs dir swap; when to flip the dials (flip BOTH together; A without B turns the audit red by design). Apply and dial flip were subsequently done (above); FAIL-on-absent vs skip remains the audit as built.

**Why / how to apply (the memory's own note):** five scouts were needed to establish that the "linear regression" premise is wrong and that the model is frozen, so the next session should not redo that discovery. Answer "logistic vs linear" with "already logistic"; never describe lobbying as a predictor in this model; before any refresh work check whether the 08-01 zips have been re-pulled and whether MoneyballWeeklyRefresh is still Disabled. Related: `lobbying-member-link-is-circular-2026-08-19`, `ask-before-substantive-changes`, `no-git-plain-review-2026-09-01`, `lobbyview-integration-2026-07-31`.

Follow-on research of 2026-09-05 on first cosponsorships among 377 continuing members: [[2026-09-feature-cosponsor-first-signature-forecast-experiments]].
