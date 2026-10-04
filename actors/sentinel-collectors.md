---
type: actor
name: "Sentinel collectors"
aliases: ["Sentinel", "press/hearing collectors"]
category: "collector"
description: "Melange press/hearing collection and sentinel-to-workbook bill ingestion layer (Codex-built, Claude-finished) with system-manifest regeneration and self-falsifying audit sentinels; merged to main 313eaaad1 for the ingestion part, press promotion still Paul's gate."
repository: ""
stack: "Python (fec/ chain: run_pipeline.py, weekly_refresh.py, press_stream.py, fetch_hearings_seq.py, sync_sentinel_bill_ledger.py), Node artifact-tool/Playwright runtime in the Codex cache, PowerShell apply/revert scripts, Excel workbooks, SQLite hearings_seq.db"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "Press promotion, fold, pipeline, dashboard and scheduler re-enable are Paul's gate (both schedulers Disabled, PRESS_BASELINE_FOLD=0, DASHBOARD_PASSWORD_FILE unset at pass end 2026-09-02)"
  - "Live feed receipt (single-run 20260828) is REJECTED by repaired press_stream.py; nothing reads press until the cumulative candidate is promoted"
  - "@oai/artifact-tool and Playwright live only in the Codex runtime cache (out-of-repo runtime dependency)"
  - "Branch sentinel-collectors-progress-f7de7d merge into the live tree halted twice (concurrent lanes, stale .git/index.lock, ChatGPT.exe polling git status)"
  - "hearings_seq.db built 2026-07-11 pre chamber-scope fix, never rebuilt, no provenance until the 2026-09-01 repair"
  - "The 8 A2b sentinels-unchanged audit failures return on every chain run (pattern-tolerated); audit_full pinned-sentinel risk unruled"
  - "Legislative pillar refresh is contract-gated (DOWNSTREAM_RECOMPUTATION_CONTRACT.md); never wire recompute_legislative_workbook.py into the weekly chain"
  - "Sunday weekly_refresh can HARD_ABORT before publish_dashboard.py if non-gated audit failures exist"
  - "Live ranks_python.json ab_weights = 45/10/40/5 UNRATIFIED (S-5 awaits Paul); last ratified 30/25/40/5"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/system-manifest-sentinel-lane-2026-09-06.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\system-manifest-sentinel-lane-2026-09-06.md", sha256: "b7c76107f8d14d2ec5f378df463bc8a2a967cd5dcb4b0d2797c74d6b0ba5b788"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sentinel-workbook-ingestion-lane-2026-09-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sentinel-workbook-ingestion-lane-2026-09-04.md", sha256: "23bfc15111a25b587229f9ef053b41927b1f61ee9593d994622fc99e9c23c58b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sentinel-collectors-lane-2026-09-01.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sentinel-collectors-lane-2026-09-01.md", sha256: "2a3947e9515ff137189392290aee180dfb3877f38aaa8de4d5f4839b0011f3ea"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Sentinel collectors

> The press/hearing collection and bill-ingestion layer (the "Sentinel" lanes) that feeds the Melange workbook, plus the system-manifest regeneration and self-falsifying audit sentinels; promotion, fold and scheduler re-enable are Paul-gated.

## Details

| Field | Value |
|---|---|
| Repository | none dedicated; Melange repo, `fec/` tree. Branches: `claude/sentinel-collectors-progress-f7de7d` (press/hearing repair, worktree `sentinel-collectors-progress-f7de7d`), `claude/legislative-workbook-ingestion-bbb3e1` (workbook ingestion, worktree `hungry-edison-77305f`) |
| Stack | Python chain (`run_pipeline.py`, `weekly_refresh.py`, `collector_supervisor.py`), Codex-cache Node runtime (`@oai/artifact-tool`, Playwright), PowerShell apply/revert scripts, Excel workbooks (`Sentinel Bill Ledger.xlsx`) |
| Status | Active |
| Criticality | High (writes to the workbook feeding ranks; silent-wrong-number and silent-halt failure classes) |
| PCI | No |
| Team | none |

## Dependencies

- **Depends on:** the Melange refresh chain and scheduler [[melange-refresh-scheduler]] (`MoneyballWeeklyRefresh`, Sun 06:00; both schedulers Disabled at the 2026-09-02 production hold, `MoneyballWeeklyRefresh` ENABLED 2026-09-04 after Paul's "Apply, Pass all, enable"); the FEC/legislation pipeline [[melange-fec-pipeline]] (`fec/` tree, `sync_sentinel_bill_ledger.py`, `build_archive_legislative.py`, `compute_pillars`); Congress.gov scrape (6-hour); the Codex runtime cache `~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/` (`@oai/artifact-tool`, Playwright; created 09-03 21:43) pinned via `data/engine/artifact_tool_runtime.json`; the speech lane (`build_descriptive_speech.py`, `canonical_source_lineage_v1.receipt.json`).
- **Depended on by:** the legislative pillar [[2026-07-feature-legislative-pillar-acu-review]] (contract-gated), the system-of-record architecture [[2026-07-rfc-melange-architecture-system-of-record]], the dashboard publish step (`publish_dashboard.py`), stance cells (`archive_leg` feeds stance, not ranks), hearing antagonism (`hearing_antagonism_build.py`), press stream (`press_stream.py`), the Mentat/Melange project [[melange-systems]].
- **External:** Codex/ChatGPT app (ChatGPT.exe polls `git status` on the live tree continuously), Codex MCP threads, Windows Task Scheduler.
- Lane context and full chronicle: [[2026-07-feature-data-collection-lanes]].

## Flows

- **Press/hearing repair lane (2026-09-01):** press receipt timestamps, press-only audit + immutable accepted-receipt archive, cumulative accepted-run-ledger promotion, fold after promotion (`fold_promoted_press_runs.py`), password-file dashboard locking, fail-closed hearing display. Hearing corpus chain: `fetch_hearings_seq.py --rebuild --db` then `<db>.receipt.json` then `build_hearing_display_feed.py`.
- **Workbook bill ingestion:** Sentinel bill collection yields `Sentinel Bill Ledger.xlsx` (18,803 rows + 31/170 interaction rows originally; 18,828 rows after restore) via `fec/legislation/sync_sentinel_bill_ledger.py` + `fec/sync_sentinel_bill_ledger_artifact.cjs`; chain step 9 runs before `compute_pillars`; `build_archive_legislative.py` appends eligible rows onto ~10,181 legacy rows with strongest-role dedup; decay via `congress_decay` (119 = 1.0, 118 = 0.8, 117 = 0.64, 116 = 0.512).
- **Manifest lane:** `fec/audit/build_system_manifest.py` regenerates `data/system/system_manifest.json` (`dump_atomic`, no backup, no hash gate); `system_manifest_check.py` checks it; `audit_full` A2/A2b sentinel checks.

## Dev Commands

```bash
python fec/speech/build_canonical_source_lineage.py          # fixes stale canonical_source_lineage_v1.receipt.json (speech lane)
run_pipeline.py --from sync_sentinel_bill_ledger              # restore run (expect ledger 18,806 rows, receipt 199/204; got 18,828 rows with discovery candidates); Paul's gate
run_pipeline.py --from coop_v2_candidate                      # resumed chain after the 2026-09-04 patch apply
fetch_hearings_seq.py --rebuild --db                          # hearing corpus rebuild with provenance receipt
build_hearing_display_feed.py                                 # hearing display feed producer
fold_promoted_press_runs.py                                   # skips already-folded roots via the fold receipt history
apply_sentinel_finish.ps1 -WhatIf                             # show drift from the reviewed bytes before touching the lane
revert_sentinel_finish.ps1                                    # restores from its manifest
verify_local_youtube_exact_windows.py --write                 # NEVER run generically (speech lane's procedure only)
git update-ref / git reset (index only) / guarded git checkout -- <own paths>   # planned fast-forward merge of the press branch (halted twice)
diff --strip-trailing-cr <live fec/> <main fec/>              # Codex flipped line endings
```

## Known Issues

- Press promotion / fold / pipeline / dashboard / scheduler re-enable remain Paul's gate; at the end of the 2026-09-01 pass both schedulers were Disabled, `PRESS_BASELINE_FOLD=0`, `DASHBOARD_PASSWORD_FILE` unset, live tree data unchanged (snapshot 0/0/0).
- The live feed receipt (single-run 20260828) is REJECTED by the repaired `press_stream.py`; after merge nothing reads press until the cumulative candidate is promoted.
- Merge of the press branch halted twice (2026-09-02 ~00:45 local and 16:37Z); another lane's worktree `.git/worktrees/moneyball-dashboard-simplify-2efa95/MERGE_HEAD` is parked in an unresolved merge (unrelated, open).
- Out-of-repo runtime dependency on the Codex cache (a first scout wrongly said "not installed"; search Codex caches before concluding absence).
- Sunday caveat: non-gated audit failures make `weekly_refresh` HARD_ABORT before `publish_dashboard.py` (after the 2026-09-05 gate ratification Sunday should publish; the runner's 800-char audit tail truncates long failure lists and the gate then fails closed by design).
- The 8 `A2b … sentinels unchanged` failures return on every chain run; `audit_full` writes its own pinned sentinels (unruled risk).
- Pillar weights (flag): `.40/.30/.20/.10` (2026-06-29, historical); `30/25/40/5` (ratified 2026-07-07, LAST RATIFIED); `45/10/40/5` (live in `ranks_python.json` since 2026-09-03, LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling). The ingestion lane treated 45/10/40/5 as ratified on 2026-09-05 pending reversal; Paul has not ratified it in the vault record.

## Press/hearing repair lane (2026-09-01 / 2026-09-02)

- The 2026-09-01 "Sentinel Collectors Repair" existed ONLY as uncommitted live-tree edits; copied byte-identically into worktree `sentinel-collectors-progress-f7de7d` and committed: `7e1cb0e66` (repair, 16 files), `dbdac0ca1` (`audit_collection` rejects a partial run dir with `PRESS_SOURCE_MISSING: <file>` instead of crashing), `8d21605bc` (hearing display feed producer + corpus provenance chain). Status doc + runbook `SENTINEL_COLLECTORS_PROGRESS_20260901.md` on the branch; evidence in `audits/sentinel_collectors_20260901/`.
- Live tree edited concurrently by other lanes (narratives v2, speech profile, staffer network): `make_member_desk.py` / `build_dashboard_bundle.py` in the live tree mix their hunks with the hearing hunks; the branch carries only the hearing hunks.
- Staging rehearsal (junctions onto the real run dirs, `MONEYBALL_ROOT` at scratch): runs 0828/0830/0831/0901 ACCEPTED; 0829 is a partial dir (discovery only), never promotable. Cumulative candidate = dedup union = tone 294 / fulltext 294 / mentions 22,243; active minus candidate = 0; +39/+39/+2,682 new rows; deterministic (rolling-receipt sequence reproduced identical sha256s); independent recount confirmed. The production build must reproduce the staged sha256s (tone cd8e935d..., fulltext 4d13b1a2..., mentions ca7a203e...).
- Hearing corpus `hearings_seq.db` was built 2026-07-11 PRE chamber-scope fix and never rebuilt (collector incremental, skips `seq_log` ok/nopage); `hearing_antagonism_build.py` reads the corpus only at the conventional path (`SEQDB` constant), so a rebuilt corpus must be renamed into place.
- Merge attempts: see the lane section in [[2026-07-feature-data-collection-lanes]] (plan = pure fast-forward from main at ade12ee22 via `git update-ref` + index-only `git reset` + guarded `checkout --` of own paths; never `update-ref` without the index sync while other sessions use the tree; second attempt halted by LATENCY - a quiet observation older than a few minutes is not evidence about now; relative-path processes evade command-line matching on the tree path; `audits/` is UNTRACKED so `git status` looks calm).
- **Why:** Paul asked to "finish the work" in the progress doc; the ask-first directive still gates production mutation, and the live tree was in concurrent use, so production-mutating work was rehearsed in staging and handed back as a runbook.
- **How to apply:** before promotion, merge the branch (live tree must first commit/set aside the other lanes' edits and delete its 8 untracked repair modules); measure kernel + `audit_full` in the LIVE tree (worktree gate figures are void, DE-012); `fold_promoted_press_runs.py` skips already-folded roots (20260828 FOLDED 2026-09-01 06:57 UTC is safe).

## Workbook bill ingestion lane (2026-09-04 / 2026-09-05)

- Codex built the bill-sentinel integration 2026-09-03 evening, UNCOMMITTED (handoff `USAGE_1_PERCENT_HANDOFF_20260903.md`, session died at 1% usage): `Sentinel Bill Ledger.xlsx` (18,803 rows + 31/170 interaction rows), `fec/legislation/sync_sentinel_bill_ledger.py`, `fec/sync_sentinel_bill_ledger_artifact.cjs`, `refresh_legislation_discovery.py`, edits to `run_pipeline.py`, `weekly_refresh.py`, `build_archive_legislative.py`, `dashboard_integrity.py`, `moneyball_core.py`. The Blended workbook export was attempted, corrupted formulas, and was rolled back byte-exactly (sha `f9a2208a…` = PRE-SENTINEL backup).
- `@oai/artifact-tool` and Playwright live ONLY in `~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/` (created 09-03 21:43); not in the repo, global node_modules or requirements.
- Handoff claim "archive reads ONLY scoring-eligible ledger rows" is FALSE (APPENDS 201 rows onto ~10,181 legacy rows); decay defect (sentinel rows `DecayWeight` 1.0 regardless of Congress; 13 of 201 eligible rows inflated: 8 x 118th, 5 x 117th); unattended-safety verdict (Opus): S1 runtime-absent hard abort at chain step 9 before `compute_pillars`, S1 6-hour Congress.gov scrape deferred-hard-aborts the refresh, S1 out-of-repo runtime dependency.
- Patch set F1-F7 built in scratch `…\scratchpad\finish\` (clean skip + `SKIPPED_RUNTIME_ABSENT` receipt, `data/engine/artifact_tool_runtime.json`, `--workbook` basename lock, decay via `congress_decay`, discovery tolerant, kernel pad narrowed to `len(r)==12`, `audit_full` check `sentinel_ledger_freshness` (11 synthetic cases, 6 negative controls), 8/8 tests); `apply_sentinel_finish.ps1` refuses on live jobs, open Excel, or any drift from the reviewed bytes. APPLIED 16:48Z 2026-09-04 (manifest `backups/sentinel_finish_apply_20260904T164802Z.json`).
- Period-2 oscillation in the second cycle (verifier diff-only vs previous bundle, `already_present` 5,208; ledger rebuilt from the delta, 201 verified rows fell to 3; archive lost 119:hr:1181 (128 rows, sentinel-only bill); 88 Data Privacy & Cyber stance cells flipped; ranks/tiers untouched). Durable-history fix (history ndjson 199/204, hash-bound, monotone) by a Codex agent 19:11-20:08Z; defects D1 (new audit check rejects `SKIPPED_RUNTIME_ABSENT`), D2, D4, D5 built by Codex author thread `01a06e1f`, reviewer `01a06e36` ACCEPT WITH FIXES (F1-F5 applied); D-fix APPLIED 22:26Z (manifest `backups/sentinel_dfix_apply_20260904T222649Z.json`); 28/28 tests; restore run `--from sync_sentinel_bill_ledger` 22:28-23:32Z: receipt 199/204, ledger 18,828 rows (+22 discovery candidates from `congress_advanced_current`), decay 0.64/0.8/1.0 by Congress verified, stance cells changed 12 (trough 113), ranks 2 (press swap), oscillation CLOSED, audit 568/11 (was 545/30). D3 (append-only history vs withdrawals) = Paul's policy, closed 2026-09-05 (history append-only; withdrawals mark rows non-scoring).
- 2026-09-05: step 6 `build_descriptive_speech.py` made TOLERANT (applied 06:16Z, manifest `backups/tolerant_step_apply_20260905T061628Z.json`; receipt `data/engine/chain_tolerated_failures.json`, audit check `chain_tolerated_failures` ages it at 21 days, weekly status field `tolerated_display_steps`); `fec/audit_failure_gate.py` ratified (applied 16:47Z, manifest `backups/gate_ratify_apply_20260905T164717Z.json`; tolerates personal-texture check, press refresh feed check, `[SYS]` A2/A2b store rows via `KNOWN_GATED_PATTERNS`; A1 and the rest of [SYS] stay hard); COMMITTED live main `96358240c` (20 files), lane branch `2e8346fac` + `0327e9878`, MERGED to main `313eaaad1` and PUSHED to mirror (Paul: "Merge to main, and push to mirror"), the one-time lift of the 09-01 no-git directive after "finish the remaining items and commit".
- `weekly_refresh_status.json` `RUNNING` since 2026-09-01 13:56:36 is a corpse (supervisor tick ended with result 267014 SCHED_S_TASK_TERMINATED, killing the child before step 1 and bypassing atexit): check the log tail + scheduler last result before believing any `RUNNING`.
- Legislative pillar refresh is contract-gated: `DOWNSTREAM_RECOMPUTATION_CONTRACT.md` lines 3-5/100-114 forbid syncing collected legislation to workbook/rank authority until the 16-step shadow order passes and Paul approves; readiness frozen 07-26 (24/33 gates false), approval files absent, 63,947 memberships undecided.
- Lessons: a single-cycle "rank delta 0, integrity PASS" proves nothing about cross-cycle idempotency (run two cycles); Codex-app editors do not read repo notes unprompted and MCP threads are separate instances (Paul must relay); read directive bodies before dispatching scouts (a read-only git run happened before the no-git memory body was read); "stop using git" (09-01) beats "commit on a branch before merging".
- Full detail and rulings with exact quotes: [[2026-07-feature-data-collection-lanes]].

## System manifest lane (2026-09-06; all UNCOMMITTED in the live tree)

- `:966` dedup defect FIXED in `fec/audit/build_system_manifest.py` (adds `and newest_file[0] not in {t[0] for t in top}`); `pick_sentinels` truncates `by_size` to `SENTINEL_COUNT` at `:1073` before the `seen` dedup at `:1090`. Blast radius 3 stores: `mdata.bicam_zips` 2 to 3, `mdata.bicam_extracted` 2 to 3, `repo.data_district` 2 to 3 (`mdata.residual` NOT affected, 4 rows). The worktree copy of the producer still carries the defect.
- Regeneration: `dump_atomic` overwrites `data/system/system_manifest.json` unconditionally (no backup, no hash gate; prior manifest uncommitted = only copy) - copy aside first; invoke the LIVE tree's script by absolute path (`paths.py` imported from the script's own tree `:81-82`; `MONEYBALL_ROOT` fixes `ROOT` but not which code runs); verify `generator_sha256` against the on-disk producer.
- D-015 cost baseline measured: ~147-167 s (146.8 s / 166.9 s, 13.7% variance), not ~29 min; scope if the cap is lifted: 71 sentinel rows across 25 stores / 79.46 GiB currently skipped vs 81.37 MiB hashed (~1000x); `repo.git` 3 sentinels, 0 hashed, all `git gc`-retirable.
- Live-regen then live-audit is NOT the DE-012 vacuous pass (`system_manifest_check.py:8-13` refuses a manifest that does not predate the checking process and asserts the producer is absent from `sys.modules`) but 582/0 straight after regen is over-fit by construction (A2/A2b cannot fail when the manifest is 78 s old); the meaningful test is the next chain-terminal audit.
- The 8 `A2b … sentinels unchanged` failures return every chain run (regeneration clears the instance, never the cause, DE-011); pattern-tolerated by `audit_failure_gate.py:69-72`; real remedy = exclude chain outputs from sentinel duty. Unruled risk: `audit_full` writes its own pinned sentinels `_audit_tmp_optimize.json` (`:161-162`) and `_audit_tmp_frontier.json` (`:197-198`) ~2,300 lines before checking them at `:2473`; they pass only because the rewrite is byte-identical and A2b compares size and sha256 but never mtime; if either output varies, `repo.data_lobbying` and `repo.data_money` fail every run after the first and regeneration cannot fix it.
- **Why / How to apply:** failure modes look like data corruption and are not; before touching the manifest back it up, run live's producer by absolute path, verify `generator_sha256`; never read a post-regen 582/0 as proof of healthy data. See `moneyball-audit-run-guardrails`, `verify-dont-infer-completion-2026-08-04`. The "manifests in backups/, hash-gated" memory belongs to the workbook-ingestion apparatus, a different mechanism.

## Standing rules and traps

- Ask-first directive gates production mutation; related `ask-before-substantive-changes`, `no-git-plain-review-2026-09-01`.
- Search Codex caches before concluding a runtime is absent.
- Never present absence without checking: a process launched with RELATIVE paths evades command-line matching; `audits/` is untracked so `git status` looks calm while busy.
- Never run `verify_local_youtube_exact_windows.py --write` generically.
- Never propose wiring `recompute_legislative_workbook.py` into the weekly chain.
- Swapping `audit_failure_gate.py` is safe while `run_pipeline` runs (only `weekly_refresh` and `collector_supervisor` import it).
- Stranded `.git/index.lock` (0 bytes) is removed only in a zero-git window per CONSTRAINTS (`CONSTRAINTS.md:81-86` forbids removing while any git.exe is alive).

## Related Actors

- [[melange-fec-pipeline]] - Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch
- [[melange-refresh-scheduler]] - Unattended Melange refresh jobs: weekly refresh, congress daily chain, report email; weekly not COMPLETE since 2026-07-19

## Related Concepts

- [[fail-closed-gates]] — When a check cannot be satisfied, the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call.

## Related Topics

- [[2026-07-feature-data-collection-lanes]] - Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills
- [[2026-07-feature-legislative-pillar-acu-review]] - Legislative pillar of Melange: legfix history, legfix5 19-category ACU review, effectiveness shadow lane, lobbying forecast
- [[2026-07-rfc-melange-architecture-system-of-record]] - Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics
- [[2026-07-feature-legislative-pillar-acu-review-cosponsor-forecaster]] — The bill-lobbying regression lane of 2026-09-04: making the cosponsor forecaster self-updating from the workbook and the sentinel collectors, and whether a logistic model fits better.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
