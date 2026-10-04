---
type: actor
name: "Reorganization: REORG COMPLETE @a05a8e4 (2026-08-05) (Melange fec/ pipeline)"
aliases: ["Melange fec/ pipeline: Reorganization: REORG COMPLETE @a05a8e4 (2026-08-05)"]
category: "pipeline"
description: "The REORG of the Melange fec/ pipeline, completed at a05a8e4 on 2026-08-05: the phase-0 tripwires, the culling lane, the 20 resolved items, the execution and phase-3 states and the post-completion fixes."
repository: ""
stack: ""
status: "active"
team: ""
criticality: ""
pci: false
known_issues: []
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/backend"]
part_of: "[[melange-fec-pipeline]]"
---

# Reorganization: REORG COMPLETE @a05a8e4 (2026-08-05) (Melange fec/ pipeline)

> The REORG of the Melange fec/ pipeline, completed at a05a8e4 on 2026-08-05: the phase-0 tripwires, the culling lane, the 20 resolved items, the execution and phase-3 states and the post-completion fixes. Part of [[melange-fec-pipeline]] (project [[melange-systems]]).

## Reorganization (REORG COMPLETE @a05a8e4, 2026-08-05): 9 code domains / 9 data domains / 8 test domains

Memory `reorg-phase0-tripwires-2026-08-04` (plan: `REORGANIZATION_PLAN.md`; relevant to [[zero-rank-delta-verification]] gates and Melange architecture and system of record). Summary: all 3 phases done + merged - 9 code domains, 9 data domains, 8 test domains, core = fec root (9 hubs + 2 entrances); chains resolve by basename; receipts relocation-aware via `fec/audit/live_relocations.py`, closure 47/8; stale-import tripwire = kernel check 150; ranks `736A9564` byte-identical throughout.

### Phase 0: four read-only tripwires (built and committed @15560ea on `claude/cfpb-sentiment-recorrection`, the live tree's branch; nothing had moved yet)

All `python fec\<name>.py`, `--json`, exit 1 on findings:

| file | result 2026-08-04 |
|---|---|
| `fec/audit_chain_steps.py` | 0 hard, 164 informational |
| `fec/audit_content_freshness.py` | 0 findings, 5 surfaces |
| `fec/audit_path_resolution.py` | 70 hard (~31 distinct artifacts), 32 info |
| `fec/audit_output_consumption.py` | 30 hard, 44 info |

The two failing ones report **pre-existing residue**, not regressions. Inventory with suggested dispositions is in `REORGANIZATION_PLAN.md` under "What Phase 0 found".

**THE number for scoping Phase 2 is ~300 DISTINCT ARTIFACTS, not the construction count.** Successive scanners gave 102, 708, 1058, 2515 constructions while distinct artifacts held at 300, 300, 301. The construction count is an artifact of what you choose to count and moved ~25x without the tree changing. Do not re-argue Phase 2 risk from it.

**Standing gate (all four must hold):** kernel `run_tests.py` 89/0; `test_lda_rebuild.py` full count; full chain to `audit_full` with no new failures; **`ranks_python.json` byte-identical** (then `736A95644E37B4CC...`).

### Open items closed @a14543e (Paul: "Yeah lets chain in lobby-interactions / Fold test lda into one kernel runner")

- `make_lobby_interactions_html.py` is now a CHAIN step (after `make_lobby_network_html.py`; NO ordering constraint against `make_combined`, which deliberately does not merge it). Chaining it proved the surface was **unbuildable**, not just stale - bank-tier work grew `_load_sector_roster` 3 to 5 return values and the builder raised on every run. **Coverage != wiring: `audit_content_freshness` PASSED on it the whole time**, because the deployed page did carry the builder's honesty strings. No audit here can detect a builder that raises at runtime - the chain-step audit only parses producers (importing one executes work). Only being in the chain catches it. Its ledger producer `lobby_interactions.py` stays UNCHAINED on purpose (position classification, expensive) - the ledger is a manual refresh.
- Kernel runner: `run_tests.py` was pointed at **14 of 118** suites. Now 17 - `test_lda_rebuild`, `test_lobbyview_network`, `test_lobby_interactions`. **92 passed / 0 failed in 56 s.** Its registration regex was case-sensitive and matched neither new suite; needs `re.I`, and any suite added must print `N passed, M failed` on stdout.

### Legislation/culling lane DONE @5e87439: kernel 92 to 131 passed / 0 failed, 56 s to 75.8 s

39 of 59 registered. **CORRECTION to an earlier claim:** the orphans are NOT uniformly non-pytest - that was generalised from a 4-file sample. Of 118 suites: 75 unittest, 25 self-running, **11 pytest**, 5 bare-tests-no-runner. Key facts for the remaining ~63 orphans:

- **`run_tests.py` now reads FOUR native verdict shapes** (`N passed, M failed`; unittest `Ran N tests` + OK/FAILED; reflective `PASS <name>` lines; `N BILLSTATUS ... tests passed`), from **stdout AND stderr** (unittest writes its summary to stderr). So a suite usually needs NO edit to be registered. Unrecognised verdict = FAILURE by design, never a skip.
- **`fec` has NO `__init__.py`** - it resolves as a PEP 420 namespace package. Suites using `from fec import ...` only work with the repo root on `sys.path`, not via `python fec/tests/x.py`. 9 suites are held on this.
- **Settle vacuity by TRACING, never by AST.** An AST scan wrongly flagged 10 suites because the house idiom invokes tests reflectively (`for name, value in globals().items(): value()`). `sys.settrace` counting executed `assert` lines found the truth: 3 fully vacuous + 1 at 6% (`article_cross_reference` defines 74 assertions and runs ZERO).
- **Snapshot method that worked** (reuse it): a git tag is NOT sufficient - `*.json` / `*.csv` are gitignored, so code-only. Add a manifest (sha256 <8 MB, size+mtime above) over repo root + fec + tests + BOTH `%LOCALAPPDATA%\Melange\*\derived` roots, plus a physical copy of repo-root files <2 MB (~48 MB). All 59 ran with **0 mutations**, re-verified byte-identical twice.
- **This lane is NOT in the chain:** 57 of 59 cover non-chain producers (it runs manually). Coupling is indirect but real - its artifacts are read by `audit_full.py`, which IS a chain step.

### ALL 20 RESOLVED 2026-08-04 second pass (Paul: "fix all of those"), MERGED TO MAIN @4647555

Commits 97a65f8 (re-attestation) + 9499cef (merge) + 4647555 (plan record); cfpb == main.

- **18 registered, kernel 149/0 in ~2.5 min.** pytest 9.1.1 installed (Paul-authorized). Runner reads FIVE verdict shapes (pytest shape E gated on the timed-summary signature, stdout+stderr); the pytest lane runs `-p no:cacheprovider` (else `.pytest_cache` mutates the tree) with the PKG env (root + fec on PYTHONPATH). Parser negative-controlled 23/23. The runner's own unrecognised-verdict guard caught a lane misclassification of `test_legislation_culling_integration_contract` (a bare-tests file: exits 0 executing NOTHING under plain python). `dump_atomic` leak check scoped to its own temp pattern - the global `%TEMP%` scan false-alarmed under concurrency.
- **The presync pair now PASSES (readiness 27/0, presync 37/0) but stays OUT of the kernel BY DESIGN** - operational sync-time gates bound to live mutable receipts; the workbook drifts on every user edit; registering them = cries-wolf.
- **Receipt re-attestation, dependency-ordered** (decay, rank-drift, downstream, behavior, planning, ooxml, formula): the downstream closure pin legitimately grew **20 to 36 of 55** with per-file provenance (0 healed, exact closure retained); a stale semantic pin repaired (decay `production_baseline.passed` was decoupled from live drift during promotion prep - downstream still required the old coupling); workbook re-bound @sha `5001e7df`; twin isolated Excel recalcs gave identical ledgers `837d0f32` (the a==b identity IS the determinism proof); behavior trust pin + `EXPECTED_LIVE_SHA256` + all producer/test/fixture pins moved in lockstep (fixtures MODEL the closure, so they move with it).
- **Order-of-operations law: producer edits BEFORE regens** - the ooxml receipt binds its own producer's source bytes; editing the producer after regenerating invalidated the receipt.
- **NOT touched, deliberately:** manual policy approvals (human inputs, never synthesize), the frozen 55-file baseline (immutable), external import/model receipts (no writer exists), the search registry (high blast radius).
- OneDrive `WinError 5` hit twice on snapshot dir renames - orphan-removal + retry cleared both.
- Formula evidence dir `C:\tmp\legislation-formula-cache-freshness-20260804T155150Z` must be RETAINED (validation reopens the receipts).
- Codex lane law (Paul, permanent, in the metaloop skill): always xhigh + priority (never pass a lower effort override - the global config already sets both); max effort / full mode is the metaloop default.
- Still open then: `fec\tests\test_primacy_tier.py` writes `source.json` into the repo root.

See `lobbyview-integration-2026-07-31` for the lane this sits in, and `verify-dont-infer-completion-2026-08-04` for the verification lessons that came out of it.

### REORG EXECUTION STATE (2026-08-04 late, run `run-20260804T2021407173543Z-4d7c2d0d27`)

- **Phase 1 @fa66617:** 118 tests moved to `fec/tests/{legislation 64, infra 15, members 11, engine 8, collect 8, lobbying 5, stance 4, district 3}`; 117 `__file__`-depth bumps; both runners use a recursive resolver that raises on dupes/missing. Gate 149/0.
- **Phase 2:** A@923e75c (network / district / lobbying / money, 29 files + 4 relocations after a classifier bug: "sna" matched inside "snapshot"); B@2c7766d (engine / legislation 14 moved, 15 SKIPPED: 5 baseline-bound, 9 receipt-bound, 1 script-bound - list in the commit message); C@ec6e9ab (stance 68 moved, 5 receipt-bound skips, `.tmp` write/read pairing verified); D@caba359 (members 46 moved, 7 receipt-bound skips).
- **REMAINING at that point:** batch E = misc domain (~50 files / 310 sites) via `reorg_worklists.json` in session scratchpad `ac6ab6dd...`; then full chain (`run_pipeline --from make_dashboard_html.py`) + `audit_full` (expect 199/1, crown-law failure pre-existing); then `REORGANIZATION_PLAN.md` update; then ff main at the `cxwt-main-merge` worktree; then metaloop finish.
- Gate per batch: kernel 149/0 + freshness 0 + ranks `736A9564` BYTE-IDENTICAL. Snapshot: tag `pre-reorg-20260804`, manifest + backup in scratchpad `SNAPSHOT-pre-reorg`.
- **LESSONS:** codex MCP times out ~30 min silent but its WORK COMPLETES - inspect the tree, never redo blindly. Codex force-staged gitignored artifacts (`git add -f`) in batch D - a 403k-line commit; fixed via parent-commit truth (tracked-at-root = legitimate rename stays tracked; else `rm --cached`). `git check-ignore` SKIPS tracked files - it cannot detect wrongly-tracked-ignored files; use parent-tree membership instead. Keep-at-root set: deployed surfaces, workbook family, dbs, `ranks_python.json`, and every receipt/baseline-bound artifact.

### FINAL STATE (run `run-20260804T2021407173543Z-4d7c2d0d27`, merged @0e19f1e)

- Batch E @40cb28c (misc, per-file routing; `.mcp.json` REVERSED to root - Claude Code config is root-discovered). Phase 2 close-out @021bb9f (full chain green: `audit_full` 199/1 after regenerating `behavioral_dispositions.json`, whose `inputs_sha256` KEYS are layout-bound). Phase 3 pilot @0e19f1e: 17 leaf collectors to `fec/collect/`; 8 excluded (7 static imports + `collect_govinfo_bill_xml_versions` via DYNAMIC `__import__` that static grep cannot see - the kernel gate caught it).
- Phase 3 next sittings (as planned then), in order: audit, district, stance, members, legislation, lobbying (late - most active), surfaces, core (last). Pilot recipe: exclude anything imported by outsiders, bump bootstrap `__file__` depth by one, update invocation sites (ps1 launchers, `weekly_refresh`, acceptance service), gate with kernel + the UNREGISTERED suites of that domain run directly.
- ARTIFACTS THAT RECORD PATHS ARE LAYOUT-BOUND: allowance registries, prerequisite sets, `inputs_sha256` keys, receipt bindings. Every reorg batch must expect them; fix the DATA (or regenerate deterministically), never weaken the test.

### PHASE 3 PROGRESS (run `run-20260805T0217417406130Z-c599876b75`, merged @0fd69cb)

- **Chain resolver @4c79a3c:** `run_pipeline.py` + `weekly_refresh.py` resolve invoked scripts by recursive basename map (tests / attic / quarantine excluded), RAISE on missing/duplicate. CHAIN entries are location-independent - domain moves cannot break chains by construction. 401 producers, 0 dupes.
- **audit/ domain @0fd69cb:** all 33 `audit_*` / `verify_*` / `dashboard_integrity` into `fec/audit/`. LANDMINE: `fec/audit.py` (legacy standalone workbook audit, EXECUTES 22 checks ON IMPORT) shadowed the namespace package - now `fec/audit/legacy_workbook_audit.py`. Import sweeps must cover FOUR forms: `import X` / `from X import` / `from fec import X` / dynamic strings (`__import__`, `import_module`, `spec_from_file_location`, test matrices).
- **Domain-move recipe (proven):** `git mv`, bootstrap `__file__` depth +1, rewrite all four import forms with aliasing, invocation sites (ps1, runbooks), gate = kernel 149/0 + freshness (from the NEW tripwire location `fec/audit/audit_content_freshness.py`) + ranks `736A9564` byte-identical + `audit_full` through the resolver (199/1 crown-law pre-existing).
- **REMAINING Phase 3 domains in order (at that point):** district, stance, members, legislation, lobbying (late - most active), surfaces, core (LAST - `moneyball_core` imported by 139).
- **FLAKE, unresolved:** `test_legislation_base_network` fails ~2/3 IN-KERNEL runs with a bare AssertionError, passes EVERY standalone and sequence-replicated run. Opt-in trap armed: set `RUNTESTS_DUMP_DIR` to capture full output of any failing suite in the kernel.
- **Codex escalation protocol (Paul, permanent, in the metaloop skill):** flaws / errors / obvious improvements go into an ESCALATIONS section to Fable; POTENTIAL improvements: Fable consults Paul FIRST. Two pending Paul decisions then: (1) a static gate rejecting stale moved-basename imports repo-wide; (2) a `main()` guard on `legacy_workbook_audit` so import cannot execute its 22 checks (both subsequently done: see below).

### PHASE 3 COMPLETE (2026-08-05, merged @a05a8e4)

- All domains moved: collect 17, audit 36, district 7, stance 47, members 120, engine 30, legislation 87, lobbying 28, network 10, surfaces 11 + templates. fec root = 9 hubs + `run_pipeline` + `weekly_refresh` + 3 attic candidates (`repair_institutional_influence`, `repair_sublayer_categories`, `update_primacy_fixture` - Paul's call).
- **CORE DECISION:** hubs stay at the fec root (`paths` 273 importers, `moneyball_core` 156 - a `core/` dir = ~500 rewrites for zero gain). Revisit only if hub-and-spoke import enforcement is wanted.
- **IDENTITY vs LOCATION law:** the immutable baseline manifest keeps identity; `fec/audit/live_relocations.py` (27 entries) redirects live reads for decay / downstream / presync; planning inherits via drift-ledger rows; the weekly-refresh closure compares on BASENAME (downstream identities carry `fec/` prefixes). Closure re-attested 36 to 47/8, receipts regenerated (downstream `11d7b68a`, planning `4ff667a8`), behavior pin lockstep.
- `audit_stale_imports.py` = kernel check No. 150: dynamic 389-module ledger, four forms, `# stale-ok:` pragma, `spec_from_file_location` = name-not-path. `legacy_workbook_audit` import-inert (`main()` guard).
- Codex MCP timed out 4x ~30 min; work complete 3x, genuinely incomplete 1x (legislation) - ALWAYS inspect. OneDrive rolled back 4 edits once (files resurrected with old content) - verify persistence after edits. Dropped `as ALIAS` was the recurring codex rewrite bug.
- Full chain green from the new layout: every producer resolved by basename, surfaces rebuilt, `audit_full` 199/1 (crown-law pre-existing). Kernel 150/0. Freshness 0. Ranks BYTE-IDENTICAL through ~18 gates.

### POST-COMPLETION (2026-08-05, merged @b6b61fc)

- Attic candidates RESOLVED (Paul: "attic those 3"): `repair_institutional_influence`, `repair_sublayer_categories`, `update_primacy_fixture` now in `fec/attic/` (all three scanners verified to exclude attic).
- Closure constants CENTRALIZED: `fec/audit/drift_closure.py` = single source of `EXPECTED_CHANGED_NAMES` + 47/8/55 (counts derived, import-asserted); consumed by the downstream audit, the presync module, and all three test suites incl. the infra fixture.
- **SYNC-RECEIPT LAW (learned twice that night):** every full-chain run re-drifts the live surfaces and STALES the presync receipts BY DESIGN. Green presync suites require a receipt cycle after any chain run: decay, rank, downstream (new id, then behavior pin), behavior, planning (new id, then presync-test pin), ooxml. ~10 min. This is re-attestation cadence, not damage.
- WEEKLY REFRESH facts: see the Architecture section in [[melange-fec-pipeline-architecture]] (task is Sat 6:00 AM; last run 08-02; crown-law failure keeps Last Result 1).

## Related Topics

- [[2026-07-rfc-melange-architecture-system-of-record-reorg-and-manifest]] — The REORG phases, tripwires and lessons of 2026-08-04/05, and the system manifest and sentinel lane of 2026-09-06.
