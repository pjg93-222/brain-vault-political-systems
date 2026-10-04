---
type: actor
name: "Mentat FEC pipeline"
aliases: ["Mentat collector", "Mentat R pipeline"]
category: "pipeline"
description: "Mentat's R+API pipeline for FEC individual contributions by employer: shared API-request pool over an encrypted DPAPI key store (22 keys), per-(company,cycle) fanout lanes, workbook builder; roster = only companies Paul lists, raw sheets = every FEC row, cross-reference exclusion only on contradiction."
repository: "C:\\Users\\pgoff\\Mentat"
stack: "R 4.6.0 (Rscript, data.table, chromote in the early lane), Python 3.14 (server.py console, api_request_pool.py, fanout, openpyxl write_only), PowerShell 5.1 orchestrators, Node (workbook builder, no system node: codex-runtimes cache), SQLite (mentat.db per lane / merged / warehouse)"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "Transfer index v3 was never built: every report build 2026-09-10..09-18 published Conditional Non-opposition/Opposition/Estimate as 0.00 (fixed in index VERSION 4, 12a880dc9; Paul must rebuild workbooks)"
  - "Telecom workbook BLOCKED by V8 max string 536,870,888 vs payload 591,338,574 bytes (export must become cycle-aware)"
  - "Live $176,942.05 Crypto memo double-count (memo dedup keys on amount; Winklevoss -> MAGA Inc, SA11AI.7772)"
  - "Console startup can hang on git rev-parse through OneDrive (unkillable child, lru_cache races two threads)"
  - "Single-cycle runs fail the workbook wanting cm22; runtime paths longer than ~275 chars break sys.path[0]"
  - "09-17 12:41 CU run stands 27/30, killed without a terminal state, resumable from console 8806"
  - "Console UI does not expose the two xref switches; console drops board on save until server.py restarts"
  - "Truncated 39-char key 13ffe51ce05b is quarantined (disabled) in the DPAPI store; how it got in is open"
  - "Roster-identity calls awaiting Paul: acronym-variant collisions (AHFC, SECU, MACU, Spectrum, FHB, Lightpath), FCU-variant expansion, 63 proposed aliases"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-uncommitted-reconcile-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-uncommitted-reconcile-2026-09-18.md", sha256: "a35561613ba5e4bd3ee27565ed8e97717aa311f7d0c0d9ac708dd549b1a3cf3b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/api-key-repository-2026-08-28.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\api-key-repository-2026-08-28.md", sha256: "f33fd855d4557d62c018aa8e6eb704337e0dd2be31b2bf7a6ac4ef023b3a77b3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-collector-slowdown-lane-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-collector-slowdown-lane-2026-09-17.md", sha256: "c4a8d1b0e447aca42a9645eaa1f073f2c153f92e86bd1ea7f46a82cc75a43263"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-tidy-workbook-lane-2026-09-14.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-tidy-workbook-lane-2026-09-14.md", sha256: "677e56dbeec24480b98de0f8d6e355e198c46cbc0c12604b717e6c5ded4b5a5f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-worker-scaling-lane-2026-09-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-worker-scaling-lane-2026-09-09.md", sha256: "bb4bb46607a8bd5da0f9bf53f3ed3e6a5d344331ddd10c18a44b9e6b3187e7a9"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-r12-reconciliation-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-r12-reconciliation-2026-07-27.md", sha256: "7d7e7b0b784b6ca68dea97528a91aab9800263c7c9144b3adfa3aca93d7139f1"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-full-audit-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-full-audit-2026-07-27.md", sha256: "cf62ccf0ea46a0a9b208eaf051587ade6d43a48d8978832e7d2bfc683e5a93ae"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-trade-association-gap-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-trade-association-gap-2026-07-27.md", sha256: "6926d05045021bfe1d3026d603b637bd38b8fc8a02a2916629dffff407e4eae0"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-pipeline-2026-07-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-pipeline-2026-07-18.md", sha256: "f07cac2aa2afe08f016bfa228378c23eecb8737ad19d2d8c0e5ce82e22e7290a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-zero-row-scalar-assign-bug.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-zero-row-scalar-assign-bug.md", sha256: "6232c91f4ebe37d472bdef37d62ed7caa7c25d65bf8b5567bf7cc8a85b74a1c9"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-github-migration-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-github-migration-2026-10-02.md", sha256: "1df4b9e5d59c94f40126fc2589fb000affbd73e13b77c8b8f30fef0398d56f78"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Mentat FEC pipeline

> Mentat's R + Python pipeline that collects FEC individual contributions by employer for 7 industries (Crypto, Credit Union, Community Banks, P&C Insurance, Credit Arms, Telecom, Fintech), classifies donors and recipients, and builds the per-industry Excel workbooks; collection runs through a shared API-request pool over an encrypted DPAPI key store.

Code root: `C:\Users\pgoff\Mentat` (a registered worktree of the Melange repo on branch `codex/mentat-crypto`; 70.9 GB, the live Mentat tree). Operator UI: [[mentat-console]]. Project: [[mentat]]. Owner: [[paul-goff]].

## Parts

- [[mentat-fec-pipeline-key-stores]] — Where the Mentat FEC API keys are stored (the encrypted DPAPI store Mentat collects from and the shared key repository), recorded as locations, counts and fingerprints only, never key material.
- [[mentat-fec-pipeline-history-build-and-ship]] — History of the Mentat FEC pipeline from the 2026-07-18 build to its integration on main on 07-24: timeline, crypto test, review fixes, the six-industry ship, the alias-gap audit and the worker-shard audit.
- [[mentat-fec-pipeline-history-hardening]] — History of the Mentat FEC pipeline hardening on 2026-07-22/23: corruption defects re-tested, acronym-variant collisions, the override matcher fix, version control and lineages, the Fintech ordeal and perf round 2.
- [[mentat-fec-pipeline-history-audit-r12]] — History of the six-agent audit of 2026-07-27, the trade-association $0 fix and the R12 reconciliation, as recorded on the Mentat FEC pipeline.
- [[mentat-fec-pipeline-history-september-lanes]] — History of the Mentat FEC pipeline lanes of September 2026, from worker scaling and the tidy workbook to the collector slowdown, the truncated-key outage and the uncommitted reconcile.

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\Mentat` (branch `codex/mentat-crypto`; registered worktree of Melange; mirrored, see below) |
| Stack | R 4.6.0 + Python (system py3.14) + PowerShell 5.1 + Node (codex-runtimes cache) + SQLite |
| Status | active |
| Criticality | high |
| PCI | no |
| Team | none |
| Console | `server.py` console on port 8806 (staffer sidecar 8841 is a separate lane) |
| Key store | `%LOCALAPPDATA%\Mentat\credentials\fec-keys.dpapi` via `mentat/tools/fec_key_store.py` (22 keys) |
| Data roots | `%LOCALAPPDATA%\Mentat\console\<roster-id>\runs\<run-id>\...`; `mentat/.cache/`; `mentat/state/`; `mentat/inputs/` |

## Dependencies

- Depends on: the openFEC API (`api.open.fec.gov`, served via the api.data.gov key family; ~120 req/min/key, 1,000 req/hr budget per key window), FEC bulk files (`mentat/inputs/fec_committee_master/cm{22,24,26}/cm.txt`, indiv zips), the DPAPI key store (Key stores in [[mentat-fec-pipeline-key-stores]]).
- Depends on runtime: R at `C:\Program Files\R\R-4.6.0\bin\Rscript.exe` (NOT on bash PATH; set `R_LIBS_USER=C:/Users/pgoff/AppData/Local/R/win-library/4.6`); system Python 3.14; Node ONLY from `~\.cache\codex-runtimes\...` (there is NO system node; never delete that cache, 1.8 GB); resolution chain param -> `MENTAT_PYTHON_PATH`/`MENTAT_NODE_PATH` -> PATH -> cache -> loud fail.
- Depended on by: [[mentat-console]] (reads reports, starts runs, Stop/Resume routes), the workbook consumers (published `Mentat Complete Files`; the console globs that folder), and the failings/PAC-evidence lanes ([[2026-09-feature-mentat-failings-pac-evidence]]), the sector study ([[2026-09-feature-sector-growth-study]]).
- Related decisions/concepts: [[exclude-on-contradiction-not-ambiguity]] (cross-reference exclusion fires only on a contradiction, never on ambiguity; brain D-043 makes a row's own employer text exclude it).
- Related topics: [[2026-07-bugfix-mentat-collection-and-attribution]] (collection and attribution bug history), [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]] (repo state and workbook lanes).
- Backup: code is git-tracked and pushed to the Melange repo mirror (`melange-repo-mirror`) (mirror verified sha-identical for `codex/mentat-crypto` and `main` at the 2026-09-19 close-out; the mirror's post-commit hook covers `C:\Users\pgoff\Mentat`).
- External/not in vault: Codex executor runs (Codex baked its sandbox runtime paths into production defaults 2026-07-23: sweep every diff), Glass Box events, brain repo D-/DE- ledgers (D-040, D-043, D-049, D-050, D-061, DE-012, DE-026, DE-032..DE-035).

## Flows

- Collector: roster (only companies Paul lists) -> per-(company,cycle) key-pinned fanout lanes -> per-lane `mentat.db` (with `fec_response_archive`, `fec_response_observations`, per-unit checkpoints) -> `merge_company_shards.py` (>10 shards batched; SQLite ATTACH hard limit 10) -> merged source DB -> warehouse gate -> R exporter (`export_crypto_spending_data.R`) -> payload JSON -> Node workbook builder -> formula/finalize -> published workbook (`<Industry> Industry Spending Overview.xlsx`).
- Resilient orchestrator (`build_industry_report.ps1`, `Start-MentatIndustryReports`): lane -> fresh-lane retry -> per-company-cycle split containment ladder; `phase-timings.json`; roster-driven industry discovery (validator `--roster`).
- Pool: `api_request_pool.py` rotates keys least-recently-used; quarantines API_KEY_* 403 and re-issues on a healthy key; width follows key supply (`--pool-width`).
- Console: Start / Stop (`POST /api/stop`) / Workers (`POST /api/workers`, 1-64) / Resume last run (`POST /api/resume`, `-ResumeRunId`); `GET /api/cross-reference?industry=...`, `/api/session?light=1`, `/api/snapshots`.
- Cross-reference (xref): per-industry run ledgers under `mentat\state\cross-reference`; xref plumbing D-050 (switches reach every launcher + worker spec; online failure -> one offline retry -> `cross_reference_mode=offline_fallback`).
- Tidy companion workbook: R exporter writes a staging SQLite (`R/tidy_stage.R`, 6th positional arg) -> `enrich_downstream.py --staging` -> `tools/build_tidy_workbook.py` (openpyxl write_only) -> `<Industry> Industry Spending Data.xlsx`.

## Dev Commands

```bash
# Rscript (not on bash PATH); R libs
"C:\Program Files\R\R-4.6.0\bin\Rscript.exe"
R_LIBS_USER=C:/Users/pgoff/AppData/Local/R/win-library/4.6

# Key store (mentat/tools/fec_key_store.py): list / enable / disable keys (never prints key material)
python mentat/tools/fec_key_store.py --list
python mentat/tools/fec_key_store.py --enable <key_id>
python mentat/tools/fec_key_store.py --enable-all
python mentat/tools/fec_key_store.py --disable <key_id>
#   Python API: load_keys / inventory / set_disabled / key_id / save_keys

# Probe every key before a long collection (one request per key; report ONLY the 12-hex key_id + HTTP status; X-Api-Key header)

# Fanout flags
#   --pool-width  --initial-workers  --merge-batch-limit  --max-lane-ceiling  --resume  -ResumeRunId
#   RAM: -RamPerApiLaneGB 0.5 -RamBudgetPercent 95
#   env: MENTAT_RECONCILE_PASSES=3  MENTAT_UNIT_SHARD_MIN (huge = unit shards off)  MENTAT_NO_WORKERS=1
#        MENTAT_DEFER_FORMULAS=1 (production)  MENTAT_REPORT_DIRECTORY (isolation lever)  MENTAT_DATA_SPLIT_ROWS (=50,000)
#   publish: sourceGuard prepare / check / accept (tools/report_source_guard.py)

# Refresh FEC sources (transfer index v4, filing-header directory)
python mentat/tools/refresh_fec_sources.py --filing-header-directory <dir>

# Prove HEAD without the dirty tree (plain git archive emits CRLF for LF blobs here)
git -c core.autocrlf=false -c core.eol=lf archive <sha> mentat audits/.../contracts | tar -x
#   then hash every file against `git cat-file blob`, run every suite, classify EXPORT-ONLY / BOTH / FLAKE

# Shared-index commit discipline (3 sessions commit in C:\Users\pgoff\Mentat)
git diff --cached --name-only
git commit --only -- <explicit paths>
#   blob-exact staging for a file a peer is editing:
#   git show HEAD:path -> apply patch -> git hash-object -w --path -> git update-index --cacheinfo -> commit

# Revert applied patches from the packet audits\mentat_tidy_workbook_20260914\patches
git apply -R <P2|P5|P6c|P7b>        # and git apply --check before applying
git apply -R P6a                    # (app/server.py; never the .bak) while it was uncommitted

# Sweep for the zero-row scalar-assign crash class
grep -rnE '\$[A-Za-z_.]+ *<- *("[^"]*"|[0-9.]+|NA[A-Za-z_]*|TRUE|FALSE)\s*$' R/*.R | grep -v "rep(\|nrow(\|list(\|function"

# Diff Mentat R across lineages with CR stripped
diff --strip-trailing-cr <a> <b>

# Detached long runs: Start-Process DETACHED + Monitor tool (Bash background tasks cap at 10 min); redirect stderr
# Collector status: bulk\status_mentat.py   Gap-fill: gapfill.R, bulk\gapfleet.sh, mentat_scheduler.py / mentat_scheduler2.py
# Bulk/audit tools: audit_alias_gaps.py, pac_universe.py, reclassify_overrides.py, repair_overreject.py, merge_all.py, build_workbook.py, verify_final.py
```

Practical: Write/Edit refuse `C:\Users\pgoff\Mentat` from a Melange worktree session: write to scratchpad + copy via python (bytes-level, exact-once replacement); shell PATH loses grep/head/python once cwd is Mentat, so use full paths; GateGuard wants four facts on first touch of every new file.

## Known Issues

- **Transfer index never built at v3 (found 2026-09-18/19):** R refuses any index but the current version, nothing rebuilds a stale one, `refresh_fec_sources.py` has no production caller, so every report build since 09-10 published Conditional Non-opposition / Opposition / Estimate as 0.00 behind a `warn` (brain DE-034). Fixed by index VERSION 4 (`12a880dc9`); Paul rebuilds workbooks himself (first rebuild reparses PAS2 ~3 min and is the first since 09-10 with real Conditional estimates).
- **Telecom BLOCKED by a hard limit**, not data: payload 591,338,574 bytes vs V8 max string 536,870,888 (validator `Test-JsonFile` and builder both `readFileSync(...,'utf8')`); `-CycleLabel` does not help (exporter ignores `MENTAT_CYCLE_FILTER`, set AFTER the export). Fix = make the EXPORT cycle-aware (~200 MB/cycle) + cycle in the cache key. Merged DB ready: `tmp/raw-warehouse-source/telecom-reconciled.db`, 988,833 rows = exact union, 10/10 companies; do NOT re-run the merge (shards a and d provably redundant).
- **Live $176,942.05 double-count in Crypto:** memo dedup keys on amount, so a memo leg one cent off its parent is never flagged even when FEC prints the parent transaction id in the memo (Winklevoss -> MAGA Inc, `SA11AI.7772`). Within R8 to fix (same committee); moves dollars.
- P&C `zero_provenance` flags Berkshire/2026, Chubb/2022+2026, Liberty Mutual/2022+2024 as unverified zeros (likely more silent $0.00s; re-collect is ~minutes each).
- Console startup can hang on `git rev-parse` through OneDrive (unkillable child, `lru_cache` races two threads); task chip queued.
- Single-cycle runs fail the workbook wanting cm22. Runtime paths >~275 chars break `sys.path[0]`.
- 09-17 12:41 CU run stands 27/30, killed without a terminal state, resumable from console 8806.
- Console UI does not expose the two xref switches; console serves the new Board client at once but drops `board` on save until the launcher restarts `server.py`.
- `test_industry_routes.py:445` had an unconditional skipTest that could never run (pre-existing; resolved `c2822afd6`); six visible skips remain in a clean export (no FEC bulk folders / no `.cache`).
- Roster-identity calls awaiting Paul (UNFIXED): acronym-variant collisions (AHFC, SECU, MACU, Spectrum, FHB, Lightpath), FCU-variant expansion, 63 proposed aliases (`proposed_new_aliases.csv`), the pagination-shortfall policy (see 2026-07-21 history in [[mentat-fec-pipeline-history-build-and-ship]]), and the tidy-workbook open questions (see tidy lane in [[mentat-fec-pipeline-history-september-lanes]]).
- Untracked at one point so a clean checkout did not stand alone: `fec_receipt_rules.json`, `report_directory.psm1`, `test_run_archive.py` (since force-tracked/committed 2026-09-18/19).
- Dormant crash class: zero-row scalar assign (see below).
- `mentat/tests/test_names.R` showed modified before the worker-scaling lane (pre-existing, not from that lane).
- Cross-reference run directories under `%LOCALAPPDATA%\Mentat\console` are AUDIT EVIDENCE (the verbatim FEC response bodies); Banking 09-09/10's ten lane DBs are gone (the workstation disk and backup topic (`2026-08-incident-workstation-disk-and-backup`)).

## Pipeline design and standing rules (as recorded)

- **Strict names / roster:** the roster contains only the companies Paul lists; variant expansion needs Paul's yes ("his strict-names rule"). Raw sheets carry every FEC row (unculled by design; the Raw tab shows rejected/duplicate rows; analysis sheets only count accepted rows). Cross-reference exclusion only on contradiction, never ambiguity ([[exclude-on-contradiction-not-ambiguity]]; brain D-043 excludes a row on its own employer text).
- **Decisions of Paul at the build (2026-07-18):** engine = headless Chrome (chromote; NOT bulk files, NOT the API: he was offered both with volume math and chose the browser) - later superseded by the API lane for scale (2026-07-20); cycles = 2021 onward (2021-22, 2023-24, 2025-26 partial); 527s and 501c's EXCLUDED; missing category workbook at `C:\Users\pgoff\OneDrive\Documents\Super PAC, 527, Carey, 501c.xlsx` (sheets 2021-2022/2023-2024; View C/L/X = lean; x-marks = category; the "^J" in his link = mangled commas).
- **Output template (2026-07-18):** `OneDrive\Documents\Credit Union Cross Industry Spending.xlsx`: sheet-per-industry raw extract `Name|Recipient|Date|Amount|(CSZ|Employer|Occupation)`; its Crypto sheet holds **1,189 hand-extracted rows through 2026-05-31 = the ACCEPTANCE FIXTURE** (pipeline crypto output must reconcile against it before graduating); Sheet1 = industry asset denominators ($T, sourced) for cross-industry $/assets normalization; **"ABS issuers" ruled OUT of scope** (Paul 2026-07-18); Sheet2 CEO names -> known-executives Chief-tier register. Build order: Phase 0 roster approval -> collector -> Crypto first (fixture reconciliation = graduation gate) -> other 4 industries -> Phase 3 after PAC-register approval -> 4-5. Spec had NO open questions left.
- **Conduit legs COUNT: R8 re-ratified 2026-07-27.** Reverted the batch's second dedup rule that dropped the ActBlue/WinRed leg; `schema.R` is now a 6-line comment from baseline; guard G3 (conduit) was deleted (under recipient-as-shown it could only fire on correct data).
- Conduit rule as first designed: drop ActBlue/WinRed-recipient legs + memo'd pass-through legs (3-row earmark anatomy, MEMO_CD='X' side invisible to employer-filtered scrape); dedup tuple name+date+amount+committee-id+memo (no unique transaction id in the UI); recipient committee ID from the link href = Phase 4 join key.
- Community Banks having no Company PAC money is CORRECT (Paul confirmed). Fintech Trade Association $0 is an honest zero (none of the 12 verified fintech trade PACs appear in its data; FTA has no federal PAC at all). Trap: `CRYPTO INNOVATION` C00804732 is a SUPER PAC, not Crypto Council for Innovation (C00942318).
- **Model/runtime and ops laws:** never name an R variable `identity` (or any base-R function used as a tryCatch handler); `data.table(key = ...)` swallows a column named `key` and `key` as a variable name shadows data.table's `by=` resolution; FEC bulk data is UPPERCASE (case-sensitive prefilter = false zero); WAL: check `mentat.db-wal` mtime/size before declaring a stall; never build stall detection on `rows_seen` (use committed `contributions` count); the scheduler's 120 s poll granularity makes many "lane exit" lines share one timestamp; long unit-id lists overrun the Windows 32K argv limit (pass an `@<path>` filter FILE); launch detached schedulers with stderr REDIRECTED.
- **Zero-row scalar assign (the single most common crash class, 2026-07-19):** `df$col <- ""` ERRORS when `nrow(df) == 0` (R: `replacement has 1 row, data has 0`); correct: `df$col <- rep("", nrow(df))` or `data.table::set(dt, j = "col", value = rep("", nrow(dt)))`. Dormant until an empty table appears, and every instance was on a default or first-run path (a fresh user hits them immediately): `R/ingest.R` read_company_match_overrides (the SHIPPED header-only overrides CSV -> ingest dead), `R/schema.R` global memo plan (`.source_table`; empty `corporate_giving` -> report generation dead), `R/collect.R` override state/occupation columns (zero-row overrides -> `--retag-only` dead), `R/schema.R` legacy override migration (zero-row legacy table -> migration dead). The grep sweep (Dev Commands) found them (a narrower grep missed two of the four); hits on single list-like objects (`response$classification`, `state$complete`) are false positives. Run it after any batch that adds columns or registers. Related: `mentat-roster-and-culling-rules-2026-07-19`.

## Related Actors

- [[mentat-console]] - Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812.

## Related Topics

- [[2026-07-bugfix-mentat-collection-and-attribution]] - Mentat collection and attribution history, Jul-Sep 2026: audits, key outage, review bucket, xref rule, frozen money code.
- [[2026-09-feature-mentat-failings-pac-evidence]] - Mentat failings lanes S2-S8 (street columns, PAC evidence, industry addressing, URL scope, panes, categories, map) + PAC map audit.
- [[2026-09-feature-sector-growth-study]] - Sector growth vs political spending regression study on Mentat data: Paul's 25 Sep rulings, R pipeline, trend-first reporting
- [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]] - Mentat tree reconciled (273 dirty -> 36 commits), GitHub branch pushed (PR merged 2026-10-03), tidy Data workbook, console hang fix.
- [[mentat-console-startup-and-polish-lanes]] — The Mentat console startup hang fix of 2026-09-18 and reference summaries of the polish, load-time and graph-quirks lanes of 09-19 to 09-25.

## Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Related Concepts

- [[exclude-on-contradiction-not-ambiguity]] - Brain D-040: exclude a row only when its own evidence contradicts the attribution; missing or ambiguous info is flagged, not excluded.
- [[settled-findings-stay-settled]] — A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, and is not re-litigated unless Paul reopens it or new evidence meets the reopen condition recorded with the settlement.

## Related People

- [[paul-goff]] - Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11.
