---
type: actor
name: "Melange refresh jobs"
aliases: ["weekly_refresh.py", "MoneyballWeeklyRefresh", "daily refresh"]
category: "pipeline"
description: "Windows-scheduled refresh automation for Melange Systems: the weekly fec/weekly_refresh.py (task MoneyballWeeklyRefresh), the congress daily-refresh chain (fec/daily_refresh.py + refresh_congress_pipeline.py, fail-closed, scheduler-owned Python), the atexit report mailer refresh_email.py, and the in-build tick runner that replaces the weekly orchestrator."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems"
stack: "Python 3.12 (fec/weekly_refresh.py, fec/daily_refresh.py, fec/legislation/refresh_congress_pipeline.py, fec/bounded_subprocess.py), R collectors (press), Windows Task Scheduler, PowerShell watcher, Glass Box events"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "Weekly refresh has NOT completed since 2026-07-19 06:53 (6 COMPLETE lines in weekly_refresh.log; 30 HARD FAILURE lines, 16 timeouts in 42 parsed runs)"
  - "All-or-nothing: 28 of 49 steps fatal, worst-path budget 275,100 s = 76.4 h, no resume (tick runner built on claude/refresh-tick-20260919, not landed)"
  - "Lease collision with the daily job: exit 75 in 2 s, no retry (weekly_refresh.py:69-74)"
  - "Blind failures: exit-75 paths run before Glass Box/status/atexit; weekly email never sent (fec/icloud_smtp.txt absent)"
  - "audit_full fails 7 checks, 6 not on the ratified list; publish_dashboard.py needs unset DASHBOARD_PASSWORD_FILE"
  - "Daily chain blocked at step 3 by 4 interview duplicates (N12 v2 truncation); admissions deadline 2026-09-21T03:41:10Z"
  - "Machine crashes about once per 2 days (23 Kernel-Power 41 events 2026-07-28..2026-09-15)"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/daily-refresh-suite-flake-lane-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\daily-refresh-suite-flake-lane-2026-09-19.md", sha256: "45afc27467423245590c9f3fe6a5fa554d7d1ab47c3b151271aeef409dfab48f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/weekly-refresh-self-sufficiency-audit-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\weekly-refresh-self-sufficiency-audit-2026-09-19.md", sha256: "5525846f07a85e2dc3a5cb87a385e086316365aff4a1008157c1553b54f76a1a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/daily-refresh-lane-closeout-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\daily-refresh-lane-closeout-2026-09-19.md", sha256: "acbca8cd3aba1e0d1eee6ee888e3d72e8c9e5af51a3340a65e4fa24db1c850ef"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/weekly-refresh-email-not-active-2026-08-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\weekly-refresh-email-not-active-2026-08-09.md", sha256: "14b3930e5f5f1f93732ee3b65af53471d1d9250b699899a025e8552c5c3489f3"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/infra"]
---

# Melange refresh jobs

> Unattended refresh automation of [[melange-systems]]: `fec/weekly_refresh.py` via Windows task `MoneyballWeeklyRefresh` (has not completed since 2026-07-19), the congress daily-refresh chain (scheduler-owned Python, fail-closed, zero AI), and `refresh_email.py` (never sent: the credentials file is a Paul-only step). Narrative, rulings and history: [[2026-08-incident-refresh-automation-reliability]].

Dated correction (2026-10-04): "zero AI" holds for the daily chain's collection steps. Its sentinel admissions step is a paid claude-cli step (N19; transport `claude-cli`, 24 `claude.exe` calls per admissions pass), which the `--smoke` runs skip with `--no-llm`, and its freshness deadline can block a full chain pass; the weekly refresh's reference layer also spawns `claude.exe` (Known Issues, item 12).

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\OneDrive\Desktop\Melange Systems` (live tree; `fec/weekly_refresh.py`, `fec/daily_refresh.py`, `fec/legislation/refresh_congress_pipeline.py`, `fec/refresh_email.py`); tick-runner branch `claude/refresh-tick-20260919` |
| Stack | Python 3.12 + R press collectors + Windows Task Scheduler + PowerShell watcher |
| Status | active (weekly job failing; daily tasks Disabled) |
| Criticality | high |
| PCI | no |
| Team | none |

### Scheduled tasks (state 2026-09-19)

| Task | State / config |
|---|---|
| `MoneyballWeeklyRefresh` | Ready; Sunday 06:00; `python.exe weekly_refresh.py` direct (no wrapper, no WorkingDirectory); InteractiveToken (runs only while logged on); ExecutionTimeLimit none; WakeToRun; RestartOnFailure 3 x PT30M (did not fire 2026-09-13, reason undetermined because the TaskScheduler Operational log is DISABLED); last result 75 |
| `MoneyballCongressRefresh` | DISABLED |
| `MoneyballDailyRefreshRetry` | DISABLED (retry task ExecutionTimeLimit proposed `PT0S`, open) |
| `MoneyballCollectorSupervisor` | DISABLED since 2026-09-01 |

Python for the Disabled tasks: `Python312\pythonw.exe` (the same 3.12.10 as `python` and the kernel).

## Dependencies

- Depends on: [[melange-fec-pipeline]] (the chain `run_pipeline.py` and its 80 producers; `weekly_refresh.py` launches 49 steps, then the chain); [[sentinel-collectors]] (collection legs, `collector_supervisor.py`, `MoneyballCollectorSupervisor`); [[glass-box]] (every run/step emits events; `pipeline.run` terminal events are `failed` since 2026-09-05); the R press scraper `Draft Systems/cu_press_release_scraper.R` and `fec/collect/press_backlog.R`; `fec/pipeline_lock.py` + `.pipeline_run.lock` (lease shared with `daily_refresh.py`); `fec/process_liveness.py`; `fec/lane_file_io.replace_atomic()`; `fec/bounded_subprocess.py` (`run_bounded`).
- External: congress.gov / GovInfo (discovery), Playwright + Chrome, `claude.exe` / `api.anthropic.com` (reference layer and sentinel admissions: NOT AI-independent), Excel (pillar snapshot recalc, a human step every 14 days), iCloud SMTP (never configured), the dashboard publish target (`DASHBOARD_PASSWORD_FILE`).
- Depended by: [[melange-systems]] (ranks/desk/dashboards need a published refresh); the supervisor GATE-1 (`collector_supervisor.py:472-486`).
- Owner: Paul Goff decides every gate (fail-closed rulings, fold, AI policy, credentials).

## Flows

- Weekly (Sunday 06:00): launcher `weekly_refresh.py` takes `.pipeline_run.lock` and the weekly lock at module scope (exit 75 on contention), walks producers, runs 49 steps (10 `hard=True`, 18 collection legs that defer then `_hard_abort`, rest soft), then the chain (`FULL PIPELINE + dashboards`), then `surfaces/publish_dashboard.py` (`:482`, last hard step). atexit sends `refresh_email.py` report.
- Daily (Disabled): `daily_refresh.py` retries hourly (:39) and may hold the lease up to 72 h; it runs `refresh_congress_pipeline.py` (collection legs, then full `run_pipeline.py`; 17 steps to the chain's step 17 `extract_cu_bluesky.py`; step 3 intake gate `audit_collection.py:448-456`; step 11 `verify_collector_roster_updates.py`).
- Tick runner (new, not landed): each fire = short TICK (`fec/refresh_tick.py`), state per step in `fec/refresh_state.py`, rows in `fec/refresh_table.py` (50 rows), one 18 h total budget, publication contract: last OK per source, not TORN, coverage not SUSPECT, age <= 14 d.

## Dev Commands

```bash
# Weekly task launch (old orchestrator)
python.exe weekly_refresh.py

# Tick runner launch (no args; cwd fec)
python.exe "<ROOT>\fec\refresh_tick.py"
# --dry-run and --status take no lock and write nothing
# exit: 0 PUBLISHED/PUBLISHED_DEGRADED/NOTHING_DUE, 1 COLLECTED_NOT_PUBLISHED/COMPUTE_FAILED/FATAL_PRESTEP, 75 BLOCKED

# Daily wrapper smoke (zero model calls)
refresh_congress_pipeline.py --smoke

# Enable the TaskScheduler Operational log (Paul, elevated; system setting)
wevtutil sl Microsoft-Windows-TaskScheduler/Operational /e:true

# Check state before answering "did it run?"
Get-ScheduledTaskInfo -TaskName MoneyballWeeklyRefresh
# tail data\engine\weekly_refresh.log ; data\engine\weekly_refresh_status.json is unreliable (last written by hand 2026-09-08)

# Prove the membership sidecar binding after a wrapper run that failed before step 11
python -c "import sys; sys.path[:0]=['fec','fec/legislation']; import official_membership_movements as OM; OM.load('.')"
# repair: copy bill_repository_live.json and data/engine/congress_bill_refresh_receipt.json back from <run_dir>/before/

# Email post-fill test (after Paul creates fec\icloud_smtp.txt)
python -c "import refresh_email; ..."   # then send_report (module is import-safe, stdlib-only)

# Merge/deploy of the crash-visibility fix (done 2026-08-09)
git -C live merge --ff-only main
# 2026-10-03: never merge or check out a branch into LIVE (D-060 as restated in the route-latency lane's commit ruling; Live-tree patch discipline); the merge above is history

# Kernel tests: only from the LIVE root (DE-039)
```

Option notes: `--smoke` skips discovery, runs admissions `--limit 1 --no-llm --no-install`, media crec/chrg/bluesky only, and the full `run_pipeline.py`. Never run or import `fec/weekly_refresh.py` to test it: it executes the whole refresh at module level; lift `step()` with `ast` into a sandbox. Never `git archive` the tree for tests (18.2 GB per export).

## Known Issues

1. Weekly has NOT completed since 2026-07-19 06:53 (6 `WEEKLY REFRESH COMPLETE` lines; 42 runs parsed: 30 HARD FAILURE, 16 timeouts, 5 with no terminal line, 2 blocked). Last line: `[2026-09-13 06:00:02] WEEKLY REFRESH BLOCKED - Moneyball pipeline is already running (pid 31516, owner congress_pipeline)` (exit 75 in 2 s). Status marker `weekly_refresh_status.json` last written 2026-09-08 BY HAND (`INTERRUPTED_PREVIOUS_RUN`).
2. ALL-OR-NOTHING: 28 of 49 steps fatal (10 `hard=True` + 18 collection legs deferring then `_hard_abort` at `:425-427`); worst-path budget 275,100 s = 76.4 h (a bound, never observed); every retry restarts from step 1; one `ABC done: 0 member turns` killed the week 11 consecutive times on 2026-08-28. The gates are DELIBERATE fail-closed rulings (comments `:409-424`): fix = resume + retry, never loosening (Paul's call).
3. `press delta refresh` (`:418`) hard, budget 129600 s (36 h): 5 OK / 4 FAILED (`press refresh exited successfully without a valid live-network receipt`, `refresh_press_stream.py:140`) / 3 TIMEOUT at old 14400 s.
4. Machine: 23 Kernel-Power 41 shutdowns 2026-07-28..2026-09-15, TWELVE since 2026-09-01; `SetThreadExecutionState` blocks idle sleep only (see `lg-gram-workstation`).
5. Lease collision: `weekly_refresh.py:69-74` `sys.exit(75)`, no wait/retry; `daily_refresh.py` may hold up to 72 h; PID reuse can wedge the lease.
6. Blind: both exit-75 paths (`:50`, `:74`) run before Glass Box import, `_write_status`, atexit; Glass Box holds ONE weekly event ever; 3 Sunday fires (2026-08-09, 2026-08-16, 2026-08-30) left no trace; 29 identical `EMAIL REPORT SKIPPED` lines.
7. Cannot end COMPLETE: `audit_full` fails 7 checks, 6 not in `fec\audit_failure_gate.py` ratified list (`pillar snapshot vintage <= 14 days` needs Excel recalc; `personal-texture artifact precision/schema/provenance`; `A2b repo.data_legislation / data_engine / worktrees / git sentinels unchanged` = manifest not rebuilt); `publish_dashboard.py` needs `DASHBOARD_PASSWORD_FILE` (unset at User and Machine scope), `dashboard_deployment_receipt.json` never existed, `deploy\index.html` dated 2026-08-24.
8. Unbounded waits after timeout (`:308` taskkill, `:312` `proc.wait()`, `:187` atexit orphan guard); stale-lock logic is pid liveness only (`pipeline_lock.py:38-50`); same shape in `refresh_congress_pipeline.py:262/265` (not yet bounded).
9. Time bombs: `official_membership_movements.py:69` raises after 8 days (consumer `build_archive_legislative.py` loads it at module scope; producer `verify_collector_roster_updates.py` is optional); refreshed 2026-09-19T19:46Z, next deadline 2026-09-27T19:46Z. Admissions freshness deadline 2026-09-21T03:41:10Z (N19, paid claude-cli step; `sentinel_admissions`; per `laundry-list-closeout-2026-09-18`, not verified).
10. Smaller: outer chain bound 7200 s (`:464`) < inner 10800 s per-step; chain inside the weekly never exceeded 2,076 s (the 261.6 min figure came from FAILED manual runs); timeout and failure both write `HARD_FAILURE`; `save_workbook_atomic` (`moneyball_core.py:232`) lacks PermissionError retry; daily run dirs grew 733 MB in 2 days, no pruning; tasks need an interactive logon.
11. Daily chain: full PASS blocked at step 3 by 4 exact duplicate interview-turn groups (rowids 193060/193063, 190575/190576, 189055/189056, 103937/103939) from the N12 v2 truncation (brain DE-045, `e783813`); wrapper defects W1 (no rollback of fetched repository), W2 (no per-day attempt cap), W3 (`open_congress_pipeline_monitor.ps1` unquoted `Start-Process` paths) await Paul.
12. AI independence: reference layer step spawns `claude.exe` up to 128x/run via `fec/classifier_runtime.py` (`subprocess.run(capture_output, timeout=180)`), any model error exits 1 = hard abort; `refresh_sentinel_admissions.py:288-290` calls `api.anthropic.com` with `fec/anthropic_key.txt`; policy `data/engine/sentinel_admission_policy.json` transport `claude-cli`/sonnet (24 `claude.exe` calls per admissions pass). The chain itself is AI-free. Paul's call; a peer session owns the degrade.
13. Email never sent: `fec/icloud_smtp.txt` (3 lines: apple-id / app-specific password / from-address, utf-8, no blank 4th line) missing; `.gitignore:21` `*.txt` ignores it. Recipient `[personal email omitted]`. Key store `Desktop\API Keys\keys.json` has only `lda`, `data_gov`, `anthropic` blocks.

## Architecture and standing facts

- `fec/refresh_email.py` (commit `2857c99`, 2026-08-05): atexit emailer; import-safe, stdlib-only at module level.
- `fec/bounded_subprocess.py` `run_bounded(argv, timeout, env, cwd)`: Popen + temp files + `wait(timeout)` + tree kill via bounded `taskkill /F /T`; chain step 10800 s, kernel suite 1800 s; timeout returns 124 (halts the chain even in TOLERANT_STEPS). Weekly steps use it since `62aea2f76` (36/36 tests).
- B1 fix `61be75ddc` (pre-step producer walk indexes only basenames that `step()` names, `run_pipeline.py:431-441`'s rule; a duplicated REAL producer still aborts); crash-visibility fix `a1436f9` (banner/log/atexit before the walk; SIGBREAK handler logs KILLED + exit 1).
- Tick runner commits (branch `claude/refresh-tick-20260919` off `61be75ddc`): `1b201d720` lock identity (`proc_start`), `326b672ed` runner, `6bff03e65` scan fixes, `406e18e91` review fix (root top-level scan data-shaped files only; ignore `~$` Office locks and SQLite -wal/-shm/-journal); press: `b7fa97dc4`, `a66b39850` (fold default ON, rank-affecting, droppable), `117788834`, `c1f0b0bb1`, `7b3b5270d` (gated R retries, droppable), `e8bda5d65`. Suite `test_refresh_tick` 38 tests (T1-T19). WIP orchestrator `352a5e495` (`fec/refresh_orchestrator.py`, 596 lines) abandoned; keep on `claude/vibrant-sammet-a549a5` for reference only. NOT landed; the scheduled task keeps the old orchestrator until Paul flips it.
- Tick outcomes: PUBLISHED / PUBLISHED_DEGRADED / NOTHING_DUE (exit 0), COLLECTED_NOT_PUBLISHED / COMPUTE_FAILED (1), BLOCKED (75). Publication stays BLOCKED, loudly, until two more sealed press walks tombstone the 9 stuck members, the six audit reds are ratified or fixed, and other lanes' chain blockers clear (N12 dups at step 3; `sentinel_admissions` from 2026-09-21T03:41Z). Supervisor must learn `refresh_tick_status.json` before re-enabling (GATE-1 accepts only `COMPLETE`, `COMPLETE_WITH_KNOWN_GATED_FAILURES` in `weekly_refresh_status.json` `last_outcome`; GATE-2 Paul-gated).
- Measured: LIVE `data/` = 29,631 files / 3.2 GB, stat-walk 11 s; zero cloud-only placeholders under `data/` and `fec/`.
- Press (current facts 2026-09-19 ~20:20): baseline folded once 2026-09-01 (+7,454 rows, 257,223 after); the 2,200 pending are undated index rows in 9 members (H001068 847, T000472 531, H001077 288, M000312 196, F000479 158, W000797 103, S001227 36, H001104 36, F000450 5), `attempts=0`, 600 s per-member budget (`Draft Systems/cu_press_release_scraper.R:199`); real deadlock `fec/collect/press_backlog.R:371` (`revisit_due_urls=11532, revisit_selected_urls=0` on the 2026-09-13 receipt); `build_press_engine_feed.validate_body_completion:99-101` refuses status != PASS or pending != 0; `fold_promoted_press_runs.py:59-63` RuntimeError on pruned run dirs (20260829, 20260906 are 0/6 files); zero-row regressions 2026-09-13: C001118, F000462, W000802; tombstone after 3 CONSECUTIVE deferrals (`data/engine/press_pending_tombstones.json`); `PRESS_BASELINE_FOLD` default "0" until the tick-branch commit; per-member ledger `data/engine/press_body_attempts/<BIOGUIDE>.rds`; exit 3 = PARTIAL (daily lane already tolerates rc 3, `daily_media_refresh.py:410-417`); earlier claims (frozen baseline since 2026-06-24, observed 76.4 h, unfetchable bodies, ~34,700 URLs re-fetched) were wrong and are superseded.
- Daily subsystem (committed by the 2026-09-19 reconcile): `fec/daily_refresh.py`, `fec/legislation/refresh_congress_pipeline.py`, watcher `fec/legislation/watch_congress_pipeline.ps1` + `open_congress_pipeline_monitor.ps1`, log `data/engine/congress_pipeline_live.log`, status `congress_pipeline_status.json`, run dirs `audits/congress_pipeline/<stamp>` (e.g. `20260919T224030Z`), 4 pytest suites in `_LANE_PYTEST` (160 tests). Wrapper settings: discovery retried once after 300 s then DEFERRED (`deferred_steps`), calibration budget 900 s (was 120 s), `--no-llm` admissions carries forward old decisions with the OLD fingerprint, before-snapshot hashes the two 98 MB HTML files (11 min -> 0.4 s), exit-75 reasons.
- Daily-refresh clock flake fixed: `203a69812893e09c718a5bcafeaab8e9c686fc4d` (D-063/DE-046): one-second tolerance on all four completion checks (three file-time clauses plus `started_at` line 194), five regression cases; 30/30 normal and 40/40 amplified runs of the 56-test suite; 3,000/3,000 replayed launches each on Python 3.12 and 3.14; LIVE kernel 247 passed / 2 standing failures (bill-collision, staffer-HTML); stable main `a7a11b5df` 153/153 on the four affected suites. Pattern: `fec/legislation/refresh_congress_pipeline.py:197-203` (`st_mtime <= started - 1`). Report `C:\Users\pgoff\Documents\Codex\2026-09-20\temp-claude-c-users-pgoff-onedrive\outputs\flake-completion.md`.
- Clock facts: Python 3.12.10 `time.time()` = `GetSystemTimeAsFileTime` (coarse, same tick as NTFS); 3.14.5 (`py` default) = `GetSystemTimePreciseAsFileTime` (stamps up to 9.5 ms older; 4 of 1,500 replayed launches failed); float step 2.384e-07 s differs in 13.4% of instants; lag median 4.4 ms, p99 15.3 ms, max 19.33 ms; failure rate 2.5% (assistant) vs 42% (Paul); `started_at` reads 0.24 to 0.95 microseconds below `started_epoch`; closest an earlier attempt came: 19 s (14 FAILED/BUSY attempts, 2026-09-13). Production cannot hit it (`verified_completion` runs after exit 0 or in `reconcile`; media alone took 1,227 s on 2026-09-19).

## Standing rules (recorded; Paul's)

- Never tell Paul the refresh "runs weekly" without checking the last COMPLETE line; never trust a status marker.
- Never weaken the audit or `weekly_refresh.py`'s `hard=True` to make Sundays green.
- Never supervise long jobs from an AI turn: launch detached, then ONE `run_in_background` `until` loop or one Monitor on the status file; no per-turn polls, no `wait`/`sleep` turns, no helper agents to watch; no Codex heartbeat automations as a scheduler (3 PAUSED in `C:\Users\pgoff\.codex\automations\`: `finish-collection-integrity-overnight` hourly, `finish-staffer-lda-reconciliation` every MINUTE, `legislation-acceptance-continuation` every 10 min; flag, do not flip); `approvals_reviewer: auto_review` multiplies cost. The 2026-09-12/13 Codex thread `01a098ce-d021-7d42-9383-5affc2a0bdfb` burned 673,856,790 tokens (674M) polling this job for 11 h.
- A session bound to a `.claude/worktrees/*` worktree cannot write the live tree; wrap space-containing paths for `Start-Process -ArgumentList`.
- Do not nag about the email credentials (TABLED 2026-08-09).
- Paul's rulings 2026-09-19 (verbatim in the topic): resume + retry without one worker's failure stopping all; lease poll + verification/retry; alerts via his API but no mail credential on file; automate Excel even if the format changes; publish step skip-when-not-configured; crashes are infrastructure so checkpoints; press fold ON, unfetchable bodies filed then stop blocking, zero-row member sites flagged for him; "Yeah go forward" to the tick runner.

## History

- 2026-07-19 06:53 last weekly COMPLETE; 2026-08-05 email module added; 2026-08-09 console-close crash and crash-visibility fix `a1436f9` (deployed ~21:24); 2026-09-01 press format fixes `646fd2b62`/`7e1cb0e66`; 2026-09-12/13 Codex built the daily subsystem and burned the quota; 2026-09-13 repair lane (press exit 3 now PARTIAL, discovery deferral, calibration 900 s; writers' `os.replace` races fixed with `lane_file_io.replace_atomic()`); 2026-09-19 audit, `62aea2f76`, `61be75ddc`, council, tick-runner ruling, tick runner built; 2026-09-20 flake fix `203a69812`.
- ~~Orchestrator WIP `352a5e495` as target (72 h resume window, `COMPLETE_WITH_FILED_FAILURES`)~~ (2026-09-19) - superseded the same evening by the tick runner; defects F1-F5 and N1-N6 recorded in the topic.
- Smoke runs (`--smoke`, zero model calls): 2026-09-13 17:00 PID 81500 (chain died step 17; Paul ruled "Revert", done 23:00); 2026-09-13 23:00 `MemoryError` in 1.2 s (AppXSvc commit leak, 67.6 GB; 50 GB again 2026-09-19); 2026-09-14 00:24 chain passed step 17 and ran 46 min into `member_reference_layer.py --rebuild` before an external kill (exit 0xFFFFFFFF); 2026-09-19 18:40 chain rejected at step 3. No `PIPELINE COMPLETE` line exists on disk after 2026-07-28.

## Related Actors

- [[glass-box]] - Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts.
- [[melange-fec-pipeline]] - Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch
- [[sentinel-collectors]] - Sentinel press/hearing collectors and bill ingestion feeding the Melange workbook; promotion and scheduler re-enable are Paul-gated

## Related Concepts

- [[fail-closed-gates]] — When a check cannot be satisfied, the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call.

## Related Topics

- [[2026-08-incident-refresh-automation-reliability]] - Weekly Melange refresh has not completed since 2026-07-19; audit, rulings, tick-runner redesign, daily-chain blockers, Codex poll-loop burn

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
