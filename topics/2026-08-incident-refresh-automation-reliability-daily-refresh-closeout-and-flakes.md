---
type: topic
title: "Daily congress refresh close-out and the suite flake lane (Refresh automation reliability)"
aliases: ["Refresh automation reliability: Daily congress refresh close-out and the suite flake lane"]
category: "incident"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-08-09
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/infra", "category/incident"]
part_of: "[[2026-08-incident-refresh-automation-reliability]]"
---

# Daily congress refresh close-out and the suite flake lane (Refresh automation reliability)

> The daily congress refresh close-out of 2026-09-19 and the daily-refresh test-suite flake lane closed on 2026-09-20. Part of [[2026-08-incident-refresh-automation-reliability]] (project [[melange-systems]]).

## Daily congress refresh: close-out 2026-09-19 (file `daily-refresh-lane-closeout-2026-09-19`)

Lane: Paul's 2026-09-13 order after the Codex burn: make the Windows-scheduled congress refresh (`fec/daily_refresh.py` + `fec/legislation/refresh_congress_pipeline.py`) independent of AI, give him a screen, run it ONCE on a small segment. Subsystem was COMMITTED by `melange-live-tree-reconcile-2026-09-19` (see the git-drift topic). Both daily tasks (`MoneyballCongressRefresh`, `MoneyballDailyRefreshRetry`) are Disabled. The scheduler-owned Python process works through every collection step with zero AI, but a FULL chain PASS is blocked at step 3.

### Smoke history (`refresh_congress_pipeline.py --smoke`, zero model calls every time)

| When | Result |
|---|---|
| 2026-09-13 17:00 | Collection PASS; chain died step 17: the Codex session's `extract_cu_bluesky.py` registry gate unbound 5 of Paul's bluesky gold rows. Paul ruled "Revert"; done 2026-09-13 23:00 via `git checkout` after clearing a stale 0-byte `.git/index.lock`. |
| 2026-09-13 23:00 | `MemoryError` in 1.2 s. Machine commit exhausted: AppXSvc svchost leaking (67.6 GB then; 50 GB again on 2026-09-19 three days after a reboot; root cause in the topic `2026-07-incident-workstation-stability`, see `lg-gram-workstation`). Restart needs elevation, which a session does not have. |
| 2026-09-14 00:24 | Collection PASS, bluesky gold 15/15, chain passed step 17, ran 46 min into `member_reference_layer.py --rebuild`, then `run_pipeline.py` was killed externally (exit 0xFFFFFFFF = .NET `Process.Kill`; actor unknown). |
| 2026-09-19 18:40 | Run dir `audits/congress_pipeline/20260919T224030Z`: collection PASS; chain REJECTED at step 3. |

- Why the full chain cannot pass as of 2026-09-19 15:38: the intake gate `fec/audit_collection.py:448-456` rejects "4 exact duplicate interview-turn groups". All four were created by the laundry-list lane's Paul-approved N12 v2 truncation (`laundry-list-closeout-2026-09-18`): a truncated row became byte-identical to a sibling (rowids 193060/193063, 190575/190576, 189055/189056, 103937/103939). That lane never saw it because its chain run started `--from verify_collector_roster_updates.py` (step 11). Brain: STATE top bullet + DE-045, commit `e783813`. Two more blockers owned elsewhere: six un-ratified audit reds make `audit_full.py` exit 1 (brain DE-044) and the admissions freshness deadline 2026-09-21T03:41:10Z (N19, a paid claude-cli step).
- Damage the smoke caused and the reusable repair: the wrapper's `repository` step rewrites root `bill_repository_live.json`; if the chain stops before step 11 the sidecar `data/legislation/official_membership_movements.json` stays bound to the old sha and `official_membership_movements.load` raises (brain DE-043), killing the desk and archive builders. Repair = copy `bill_repository_live.json` and `data/engine/congress_bill_refresh_receipt.json` back from `<run_dir>/before/` (the wrapper snapshots both), then prove it with `python -c "import sys; sys.path[:0]=['fec','fec/legislation']; import official_membership_movements as OM; OM.load('.')"` from the live root. Check this after ANY wrapper run that fails before step 11.
- Wrapper defects found, NOT fixed (presented to Paul, his apply gate): W1 no rollback of the fetched repository on early chain failure (automate the repair above). W2 `daily_refresh.py` has no per-day attempt cap, so an unpassable day reruns the multi-hour chain hourly forever. W3 `fec/legislation/open_congress_pipeline_monitor.ps1` passes `$watcher` and `$Root` unquoted to `Start-Process`; "Melange Systems" has a space, so the window dies instantly. The watcher works when launched with both paths wrapped in quotes.
- How to apply: a session bound to a `.claude/worktrees/*` worktree CANNOT write the live tree (the Edit/Write guard refuses; the auto-mode classifier refuses shell writes and `Remove-Item` there); `git checkout -- <file>` went through only after Paul's explicit word - hand Paul the exact command or fix. `Start-Process -ArgumentList @(...)` never quotes array items: wrap every path that may contain a space: `('"{0}"' -f $path)`. Verify a launched window by the WindowsTerminal `MainWindowTitle` and CPU delta, not by the launcher's "Opened" message (`melange-ui-retheme-2026-08-06`: building is not delivering). A chain run that starts at step 11 proves nothing about steps 1-10. After any `social_media.db` migration run the intake gate itself. One background `until` loop on `congress_pipeline_status.json` gave exactly one wake-up at the end of a 38-minute run: that is the supervision pattern; never poll turns.

## Daily-refresh suite flake lane (file `daily-refresh-suite-flake-lane-2026-09-19`) - CLOSED 2026-09-20

Lane: `fec/tests/infra/test_daily_refresh.py` fails at random on main `61be75ddc`, which made kernel comparisons between commits unreliable. Session worktree `busy-kapitsa-3272db`. Sibling of the daily-refresh closeout above.

- ~~As of 2026-09-20 00:10 local NOTHING is applied; the fix is presented and waits on Paul.~~ SUPERSEDED: Paul instructed "Finish this up". The exact recommended four-comparison candidate and five regression cases are applied, committed and landed at `203a69812893e09c718a5bcafeaab8e9c686fc4d` (LIVE main; mirror matches). 30/30 normal and 40/40 amplified suite runs (56 tests each), 3,000/3,000 replayed launches each on Python 3.12 and 3.14 (6,000 cross-version launches), 97 related tests, deterministic baseline-red and clause-deletion controls all behaved as expected. LIVE kernel: 247 passed / 2 FAILED, exactly the standing bill-collision and staffer-HTML reds; daily-refresh suite clean. The kernel overlapped a parallel landing; the four affected suites then passed 153/153 on stable main `a7a11b5df`. D-063, DE-046. Both daily scheduled tasks remain Disabled. Report: `C:\Users\pgoff\Documents\Codex\2026-09-20\temp-claude-c-users-pgoff-onedrive\outputs\flake-completion.md`.
- The task's hypothesis was half wrong: it said `time.time()` is precise and file stamps are coarse. Under Python 3.12.10 (what `python`, the kernel and both Disabled scheduled tasks (`Python312\pythonw.exe`) run) `time.time()` is `GetSystemTimeAsFileTime`, the SAME coarse tick NTFS stamps with: the file's nanosecond stamp was never below the clock's in 3,000 writes. The inversion lives in floats: `time.time()` is `ns/1e9`, `st_mtime` is `sec + 1e-9*nsec`, and for one instant they differ by exactly one float step (2.384e-07 s) in 13.4% of instants each way. Under 3.14.5 (the `py` launcher default here) `time.time()` is `GetSystemTimePreciseAsFileTime` and the hypothesis holds: stamps up to 9.5 ms older, 4 of 1,500 replayed launches failed. Coarse-behind-precise lag: median 4.4 ms, p99 15.3 ms, max 19.33 ms.
- A fourth comparison nobody listed: line 194. `started_at` comes from `datetime.now()`, floored to the microsecond, and reads 0.24 to 0.95 microseconds below `started_epoch` in the same tick. A three-clause fix (file times only) was green 30 of 30 with real fsync and is still WRONG; timing amplification exposed it (17 of 23 amplified failures were the line 194 message). Fix = one-second tolerance on all four completion checks.
- Why the rate swings (2.5% for the assistant, 42% for Paul): the receipt must land in the same tick as `started_epoch`; the durable writes in between take about 13 ms; the system timer flips between 1.0 ms and 15.625 ms depending on what else is running. Inference, not measured during his runs.
- Production cannot hit it: `verified_completion` runs only after the child exits 0 or in `reconcile`; the receipts come from a separate process after media plus chain (media alone 1,227 s on 2026-09-19). A fast failing child returns before any receipt check.
- Also found: no test pins the three file-time clauses (51 of 51 green with them deleted). The repo already fixed this class once in `fec/legislation/refresh_congress_pipeline.py:197-203` (`st_mtime <= started - 1`, with a deterministic 20 ms test) and `daily_refresh.py` never got it. Closest an earlier attempt ever came to the next: 19 s (14 FAILED/BUSY attempts, all 2026-09-13).
- How to apply: read `NEXT_STEPS.md` in the evidence folder first: `%TEMP%\claude\C--Users-pgoff-OneDrive-Desktop-Melange-Systems--claude-worktrees-busy-kapitsa-3272db\fb2333e3-5291-496d-a7ad-6aa0c3419c2b\scratchpad\flake\` (holds the diff, the test block `proposed_tests_block.txt`, the validated module `variants_v2\candidate_slack\daily_refresh.py`, the apply and landing steps, and the brain drafts). A flaky timing test on Windows: make the race deterministic with `os.utime` instead of looping, and amplify by shrinking the interval (no-op `os.fsync`, timing only) rather than by more runs (60 plain runs caught 0 failures; 40 amplified runs caught 23). Before trusting "the clock is precise" or "the clock is coarse", read `time.get_clock_info('time')` for the interpreter that actually runs the code (three Pythons are installed here and only 3.12 has pytest). A candidate that goes green is not proven complete: enumerate EVERY comparison against the same reading and test each one on its own. Kernel runs only from the LIVE root (DE-039); a worktree session cannot write LIVE, so the fast-forward needs Paul's word.

## Related Topics

- [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]] — The weekly Melange refresh as of 2026-09-19: measured state, sandbox run, the abandoned orchestrator, the tick-runner ruling and build, the corrected press facts and the inactive weekly email.
- [[2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn]] — The Codex overnight poll-loop burn of 2026-09-12/13 as recorded in the refresh incident: the 30 s poll loop, the quota loss and the repair lane.
