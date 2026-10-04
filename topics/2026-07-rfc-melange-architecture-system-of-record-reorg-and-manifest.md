---
type: topic
title: "REORG phases, tripwires and lessons; the system manifest lane (08-04 to 09-06) (Melange architecture and system of record)"
aliases: ["Melange architecture and system of record: REORG phases, tripwires and lessons; the system manifest lane (08-04 to 09-06)"]
category: "rfc"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-07-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/backend", "category/rfc"]
part_of: "[[2026-07-rfc-melange-architecture-system-of-record]]"
---

# REORG phases, tripwires and lessons; the system manifest lane (08-04 to 09-06) (Melange architecture and system of record)

> The REORG phases, tripwires and lessons of 2026-08-04/05, and the system manifest and sentinel lane of 2026-09-06. Part of [[2026-07-rfc-melange-architecture-system-of-record]] (project [[melange-systems]]).

## REORG: phases, tripwires and lessons (source `reorg-phase0-tripwires-2026-08-04`)

### Phase 0 (committed @15560ea on `claude/cfpb-sentiment-recorrection`, the live tree's branch; plan in `REORGANIZATION_PLAN.md`)

Four read-only tripwires (`python fec\<name>.py`, `--json`, exit 1 on findings): `fec/audit_chain_steps.py` (0 hard, 164 informational), `fec/audit_content_freshness.py` (0 findings, 5 surfaces), `fec/audit_path_resolution.py` (70 hard ~31 distinct artifacts, 32 info), `fec/audit_output_consumption.py` (30 hard, 44 info). The two failing ones report pre-existing residue, not regressions. The number for scoping Phase 2 is ~300 DISTINCT ARTIFACTS, not the construction count (102 -> 708 -> 1058 -> 2515 constructions while distinct artifacts held 300 -> 300 -> 301; ~25x without the tree changing). Standing gate: kernel `run_tests.py` 89/0 + `test_lda_rebuild.py` full count + full chain to `audit_full` with no new failures + `ranks_python.json` byte-identical (then `736A95644E37B4CC...`).

**Both prior open items CLOSED @a14543e on Paul's instruction ("Yeah lets chain in lobby-interactions / Fold test lda into one kernel runner"):**

- `make_lobby_interactions_html.py` is now a CHAIN step (after `make_lobby_network_html.py`; NO ordering constraint against `make_combined`, which deliberately does not merge it). Chaining it proved the surface was **unbuildable**, not just stale: bank-tier work grew `_load_sector_roster` 3 -> 5 return values and the builder raised on every run. **Coverage != wiring**: `audit_content_freshness` PASSED on it the whole time because the deployed page did carry the builder's honesty strings; no audit here can detect a builder that raises at runtime (the chain-step audit only parses producers, importing one executes work). Only being in the chain catches it. Its ledger producer `lobby_interactions.py` stays UNCHAINED on purpose (position classification, expensive): the ledger is a manual refresh.
- Kernel runner: `run_tests.py` was pointed at **14 of 118** suites; now 17 (`test_lda_rebuild`, `test_lobbyview_network`, `test_lobby_interactions`): **92 passed / 0 failed in 56 s**. Its registration regex was case-sensitive and matched neither new suite; needs `re.I`, and any suite added must print `N passed, M failed` on stdout.

**Legislation / culling lane DONE @5e87439: kernel 92 -> 131 passed / 0 failed, 56 s -> 75.8 s.** 39 of 59 registered. CORRECTION to an earlier claim: the orphans are NOT uniformly non-pytest (of 118 suites: 75 unittest, 25 self-running, **11 pytest**, 5 bare-tests-no-runner). Facts for the remaining ~63 orphans: `run_tests.py` now reads FOUR native verdict shapes (`N passed, M failed`; unittest `Ran N tests` + OK/FAILED; reflective `PASS <name>` lines; `N BILLSTATUS ... tests passed`) from stdout AND stderr; unrecognised verdict = FAILURE by design; **`fec` has NO `__init__.py`** (PEP 420 namespace package; suites using `from fec import ...` only work with the repo root on `sys.path`, 9 suites held on this); **settle vacuity by TRACING, never by AST** (3 fully vacuous + 1 at 6%: `article_cross_reference` defines 74 assertions and runs ZERO); snapshot method (git tag is NOT sufficient since `*.json` / `*.csv` are gitignored: add a manifest of sha256 < 8MB, size + mtime above, over repo root + fec + tests + BOTH `%LOCALAPPDATA%\Melange\*\derived` roots, plus a physical copy of repo-root files < 2MB, ~48MB); all 59 ran with **0 mutations**, re-verified byte-identical twice. This lane is NOT in the chain: 57 of 59 cover non-chain producers (runs manually); coupling is indirect but real, since its artifacts are read by `audit_full.py`, which IS a chain step.

**ALL 20 RESOLVED 2026-08-04 second pass (Paul: "fix all of those"), MERGED TO MAIN @4647555** (commits 97a65f8 re-attestation + 9499cef merge + 4647555 plan record; cfpb == main):

- **18 registered, kernel 149/0 in ~2.5 min.** pytest 9.1.1 installed (Paul-authorized). Runner reads FIVE verdict shapes (pytest shape E gated on the timed-summary signature, stdout + stderr); pytest lane runs `-p no:cacheprovider` (else `.pytest_cache` mutates the tree) with the PKG env (root + fec on PYTHONPATH). Parser negative-controlled 23/23. The runner's own unrecognised-verdict guard caught a lane misclassification of `test_legislation_culling_integration_contract` (a bare-tests file: exits 0 executing NOTHING under plain python). `dump_atomic` leak check scoped to its own temp pattern (the global `%TEMP%` scan false-alarmed under concurrency).
- **The presync pair now PASSES (readiness 27/0, presync 37/0) but stays OUT of the kernel BY DESIGN** (operational sync-time gates bound to live mutable receipts; the workbook drifts on every user edit; registering them = cries-wolf).
- **Receipt re-attestation, dependency-ordered** (decay -> rank-drift -> downstream -> behavior -> planning -> ooxml -> formula): downstream closure pin legitimately grew **20 -> 36 of 55** with per-file provenance (0 healed, exact closure retained); a stale semantic pin repaired (decay `production_baseline.passed` was decoupled from live drift during promotion prep; downstream still required the old coupling); workbook re-bound @sha `5001e7df`; twin isolated Excel recalcs -> identical ledgers `837d0f32` (the a == b identity IS the determinism proof); behavior trust pin + `EXPECTED_LIVE_SHA256` + all producer / test / fixture pins moved in lockstep (fixtures MODEL the closure, so they move with it).
- **Order-of-operations law: producer edits BEFORE regens** (the ooxml receipt binds its own producer's source bytes; editing the producer after regenerating invalidated the receipt).
- **NOT touched, deliberately:** manual policy approvals (human inputs, never synthesize), frozen 55-file baseline (immutable), external import / model receipts (no writer exists), search registry (high blast radius).
- OneDrive `WinError 5` hit twice on snapshot dir renames; orphan-removal + retry cleared both.
- Formula evidence dir `C:\tmp\legislation-formula-cache-freshness-20260804T155150Z` must be RETAINED (validation reopens the receipts).
- Codex lane law (Paul, permanent, in the metaloop skill): always xhigh + priority; max effort / full mode is the metaloop default.
- Still open then: `fec\tests\test_primacy_tier.py` writes `source.json` into the repo root. Related: `lobbyview-integration-2026-07-31` (the lane this sits in), `verify-dont-infer-completion-2026-08-04` (verification lessons) and see Melange data-collection lanes.

### REORG execution state (2026-08-04 late, run `run-20260804T2021407173543Z-4d7c2d0d27`)

- **Phase 1 @fa66617**: 118 tests -> `fec/tests/{legislation 64, infra 15, members 11, engine 8, collect 8, lobbying 5, stance 4, district 3}`; 117 `__file__`-depth bumps; both runners use a recursive resolver that raises on dupes / missing. Gate 149/0.
- **Phase 2**: A@923e75c (network / district / lobbying / money, 29 files + 4 relocations after a classifier bug: 'sna' matched inside 'snapshot'); B@2c7766d (engine / legislation 14 moved, 15 SKIPPED: 5 baseline-bound, 9 receipt-bound, 1 script-bound, list in the commit msg); C@ec6e9ab (stance 68 moved, 5 receipt-bound skips, `.tmp` write / read pairing verified); D@caba359 (members 46 moved, 7 receipt-bound skips).
- **Then remaining**: batch E = misc domain (~50 files / 310 sites) via `reorg_worklists.json` in session scratchpad ac6ab6dd...; then full chain (`run_pipeline --from make_dashboard_html.py`) + `audit_full` (expect 199/1, crown-law failure pre-existing); then `REORGANIZATION_PLAN.md` update; then ff main at the `cxwt-main-merge` worktree; then metaloop finish.
- Gate per batch: kernel 149/0 + freshness 0 + ranks 736A9564 BYTE-IDENTICAL. Snapshot: tag `pre-reorg-20260804`, manifest + backup in scratchpad `SNAPSHOT-pre-reorg`.
- **LESSONS**: codex MCP times out ~30 min silent but its WORK COMPLETES (inspect the tree, never redo blindly). Codex force-staged gitignored artifacts (`git add -f`) in batch D -> 403k-line commit; fixed via parent-commit truth (tracked-at-root = legitimate rename stays tracked; else `rm --cached`). `git check-ignore` SKIPS tracked files, so it cannot detect wrongly-tracked-ignored files; use parent-tree membership instead. Keep-at-root set: deployed surfaces, workbook family, dbs, `ranks_python.json`, and every receipt / baseline-bound artifact.

### Final state (merged @0e19f1e)

- Batch E @40cb28c (misc, per-file routing; `.mcp.json` REVERSED to root since Claude Code config is root-discovered). Phase 2 close-out @021bb9f (full chain green: `audit_full` 199/1 after regenerating `behavioral_dispositions.json`, whose `inputs_sha256` KEYS are layout-bound). Phase 3 pilot @0e19f1e: 17 leaf collectors -> `fec/collect/`; 8 excluded (7 static imports + `collect_govinfo_bill_xml_versions` via DYNAMIC `__import__` that static grep cannot see; the kernel gate caught it).
- Phase 3 next sittings, in order: audit, district, stance, members, legislation, lobbying (late, most active), surfaces, core (last). Pilot recipe: exclude anything imported by outsiders, bump bootstrap `__file__` depth by one, update invocation sites (ps1 launchers, `weekly_refresh`, acceptance service), gate with kernel + the UNREGISTERED suites of that domain run directly.
- ARTIFACTS THAT RECORD PATHS ARE LAYOUT-BOUND: allowance registries, prerequisite sets, `inputs_sha256` keys, receipt bindings. Every reorg batch must expect them; fix the DATA (or regenerate deterministically), never weaken the test.

### Phase 3 progress (run `run-20260805T0217417406130Z-c599876b75`, merged @0fd69cb)

- **Chain resolver @4c79a3c**: `run_pipeline.py` + `weekly_refresh.py` resolve invoked scripts by recursive basename map (tests / attic / quarantine excluded) and RAISE on missing / duplicate. CHAIN entries are location-independent; domain moves cannot break chains by construction. 401 producers, 0 dupes.
- **audit/ domain @0fd69cb**: all 33 `audit_*` / `verify_*` / `dashboard_integrity` into `fec/audit/`. LANDMINE: `fec/audit.py` (legacy standalone workbook audit, EXECUTES 22 checks ON IMPORT) shadowed the namespace package; now `fec/audit/legacy_workbook_audit.py`. Import sweeps must cover FOUR forms: `import X` / `from X import` / `from fec import X` / dynamic strings (`__import__`, `import_module`, `spec_from_file_location`, test matrices).
- **Domain-move recipe (proven)**: `git mv` -> bootstrap `__file__` depth +1 -> rewrite all four import forms with aliasing -> invocation sites (ps1, runbooks) -> gate = kernel 149/0 + freshness (from the NEW tripwire location `fec/audit/audit_content_freshness.py`) + ranks 736A9564 byte-identical + `audit_full` through the resolver (199/1, crown-law pre-existing).
- REMAINING Phase 3 domains in order (at that time): district, stance, members, legislation, lobbying, surfaces, core (LAST: `moneyball_core` imported by 139).
- **FLAKE, unresolved**: `test_legislation_base_network` fails ~2/3 IN-KERNEL runs with bare AssertionError, passes EVERY standalone and sequence-replicated run. Opt-in trap armed: set `RUNTESTS_DUMP_DIR` to capture full output of any failing suite in the kernel.
- **Codex escalation protocol (Paul, permanent, in the metaloop skill)**: flaws / errors / obvious improvements -> ESCALATIONS section to Fable; POTENTIAL improvements -> Fable consults Paul FIRST. Two pending Paul decisions then: (1) static gate rejecting stale moved-basename imports repo-wide; (2) `main()` guard on `legacy_workbook_audit` so import cannot execute its 22 checks.

### Phase 3 COMPLETE (2026-08-05, merged @a05a8e4)

- All domains moved: collect 17, audit 36, district 7, stance 47, members 120, engine 30, legislation 87, lobbying 28, network 10, surfaces 11 + templates. `fec` root = 9 hubs + `run_pipeline` + `weekly_refresh` + 3 attic candidates (`repair_institutional_influence`, `repair_sublayer_categories`, `update_primacy_fixture`; Paul's call).
- CORE DECISION: hubs stay at `fec` root (paths 273 importers, moneyball_core 156; a `core/` dir = ~500 rewrites for zero gain). Revisit only if hub-and-spoke import enforcement is wanted.
- IDENTITY vs LOCATION law: the immutable baseline manifest keeps identity; `fec/audit/live_relocations.py` (27 entries) redirects live reads for decay / downstream / presync; planning inherits via drift-ledger rows; weekly-refresh closure compares on BASENAME (downstream identities carry `fec/` prefixes). Closure re-attested 36 -> 47/8, receipts regenerated (downstream `11d7b68a`, planning `4ff667a8`), behavior pin lockstep.
- `audit_stale_imports.py` = kernel check No. 150: dynamic 389-module ledger, four forms, `# stale-ok:` pragma, `spec_from_file_location` = name-not-path. `legacy_workbook_audit` import-inert (`main()` guard).
- Codex MCP timed out 4x ~30 min; work complete 3x, genuinely incomplete 1x (legislation): ALWAYS inspect. OneDrive rolled back 4 edits once (files resurrected with old content): verify persistence after edits. Dropped-`as ALIAS` was the recurring codex rewrite bug.
- Full chain green from the new layout: every producer resolved by basename, surfaces rebuilt, `audit_full` 199/1 (crown-law pre-existing). Kernel 150/0. Freshness 0. Ranks BYTE-IDENTICAL through ~18 gates.

### Post-completion (2026-08-05, merged @b6b61fc)

- Attic candidates RESOLVED (Paul: "attic those 3"): see Decisions in [[2026-07-rfc-melange-architecture-system-of-record]].
- Closure constants CENTRALIZED: `fec/audit/drift_closure.py` = single source of `EXPECTED_CHANGED_NAMES` + 47/8/55 (counts derived, import-asserted); consumed by the downstream audit, presync module, and all three test suites incl. the infra fixture.
- **SYNC-RECEIPT LAW (learned twice that night)**: every full-chain run re-drifts the live surfaces and STALES the presync receipts BY DESIGN; green presync suites require a receipt cycle after any chain run: decay -> rank -> downstream (new id -> behavior pin) -> behavior -> planning (new id -> presync-test pin) -> ooxml, ~10 min. This is re-attestation cadence, not damage.
- **WEEKLY REFRESH**: Windows task `MoneyballWeeklyRefresh`, Sat 6:00 AM, invokes `fec/weekly_refresh.py` (still valid post-reorg). Last run 2026-08-02: all collectors + layers OK (tweets collected, `social_media.db` updated), ABORTED at the final FULL PIPELINE step on the culling-surface audit check; that cause has since been resolved by the promotion-era regens. The NEXT run (2026-08-09) will still end Last Result 1 while the pre-existing crown-law audit failure stands (`audit_full` 199/1); the refresh treats any `audit_full` failure as HARD FAILURE at its last step. Everything real completes; only the final gate reports red. Fix = resolve the crown-law workbook stance column mismatch (Paul's domain, separately tracked).
- Tweet collection healthy: `social_media.db` 2026-08-02 06:17 (refresh-driven), `x_catalog.jsonl` 2026-08-02 12:49 (Grok lane).

## System manifest + sentinel lane (2026-09-06, source `system-manifest-sentinel-lane-2026-09-06`; all UNCOMMITTED in the live tree)

- **The `:966` dedup defect is FIXED.** `fec/audit/build_system_manifest.py:966` appended `newest_file` with no membership test against `top`; because `pick_sentinels` truncates `by_size` to `SENTINEL_COUNT` at `:1073` *before* the `seen` dedup at `:1090`, a file that was both largest and newest ate a slot and evicted the true third-largest. The fix adds `and newest_file[0] not in {t[0] for t in top}` (rows are `(rel, size, mtime)`). Blast radius was **3 stores, not the 2 the brain listed**: `mdata.bicam_zips` 2 -> 3, `mdata.bicam_extracted` 2 -> 3, `repo.data_district` 2 -> 3. **`mdata.residual` was NOT affected** (it has 4 rows; that entry in the old note is stale). The worktree copy of the producer still carries the defect. See [[sentinel-collectors]] for the sentinel-workbook side.
- **Regenerating is riskier than it looks.** `dump_atomic` overwrites `data/system/system_manifest.json` unconditionally (**no backup, no hash gate**) and the prior manifest is uncommitted, so it is the only copy: copy it aside first. (The "manifests in backups/, hash-gated" memory belongs to the sentinel-workbook lane, a different apparatus: `sentinel-workbook-ingestion-lane-2026-09-04`.) Invoke the **live tree's** script by absolute path: `paths.py` is imported from the script's own tree (`:81-82`), so `MONEYBALL_ROOT` fixes `ROOT` but not which code runs, and the worktree's producer is a different file.
- **D-015 cost baseline, measured for the first time: ~147-167 s** (146.8 s / 166.9 s, 13.7% variance). The brain's uncaptured "~29 min" is not borne out on a warm cache. Scope if the cap is lifted: 71 sentinel rows across 25 stores / 79.46 GiB currently skipped, vs 81.37 MiB hashed, a ~1000x increase. `repo.git` has 3 sentinels, 0 hashed, all `git gc`-retirable.
- **Live-regen then live-audit is NOT the DE-012 vacuous pass.** `system_manifest_check.py:8-13` refuses any manifest that does not predate the checking process and asserts the producer is absent from `sys.modules`. But 582/0 straight after a regen is over-fit by construction (A2 / A2b cannot fail when the manifest is 78 s old). The meaningful test is the next chain-terminal audit.
- **The 8 `A2b … sentinels unchanged` failures return on every chain run.** Regeneration clears the instance, never the cause (DE-011). They are pattern-tolerated by `audit_failure_gate.py:69-72`, so they do not block publish. Real remedy is excluding chain outputs from sentinel duty.
- **Unruled risk:** `audit_full` writes its own pinned sentinels, `_audit_tmp_optimize.json` (`:161-162`) and `_audit_tmp_frontier.json` (`:197-198`), ~2,300 lines before checking them at `:2473`. They pass only because the rewrite is byte-identical and A2b compares size and sha256 but never mtime. If either output ever varies, `repo.data_lobbying` and `repo.data_money` fail on every run after the first and **regeneration cannot fix it**.
- **Why:** this lane's failure modes all look like data corruption and are not. Reading a red A2b as a regression, or regenerating to "fix" it, wastes a gate and hides the real defect.
- **How to apply:** before touching the manifest, back it up, run live's producer by absolute path, and verify `generator_sha256` against the on-disk producer. Never read a post-regen 582/0 as proof the data is healthy. Related memory: `moneyball-audit-run-guardrails`, `verify-dont-infer-completion-2026-08-04`.

## Related Topics

- [[melange-fec-pipeline-reorganization]] — The REORG of the Melange fec/ pipeline, completed at a05a8e4 on 2026-08-05: the phase-0 tripwires, the culling lane, the 20 resolved items, the execution and phase-3 states and the post-completion fixes.
- [[2026-07-feature-data-collection-lanes-sentinel-lanes]] — The September 2026 sentinel lanes: the press and hearing collector repair of 09-01/02, the workbook bill ingestion of 09-04/05 and the system manifest sentinel of 09-06.
- [[2026-07-rfc-melange-architecture-system-of-record-refactor-and-inversion]] — The July 2026 refactor and the inversion of the system of record: what moved where, the phase-2 inversion, the audit S2 remedies, roadmap item 9 phase 1, the staff directory and desk CRM, and the audit runbook.
