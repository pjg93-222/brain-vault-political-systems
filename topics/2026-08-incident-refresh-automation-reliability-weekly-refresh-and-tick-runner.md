---
type: topic
title: "Weekly refresh: measured state, orchestrator, tick runner and the inactive email (Refresh automation reliability)"
aliases: ["Refresh automation reliability: Weekly refresh: measured state, orchestrator, tick runner and the inactive email"]
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

# Weekly refresh: measured state, orchestrator, tick runner and the inactive email (Refresh automation reliability)

> The weekly Melange refresh as of 2026-09-19: measured state, sandbox run, the abandoned orchestrator, the tick-runner ruling and build, the corrected press facts and the inactive weekly email. Part of [[2026-08-incident-refresh-automation-reliability]] (project [[melange-systems]]).

## Measured state 2026-09-19 (current; verified by the assistant unless marked agent)

Lane: worktree `vibrant-sammet-a549a5`, 2026-09-19, after Paul's "Yeah bound it, we just gotta make sure it is self-sufficient, what are the main problems that are plaguing it?". Two read-only Opus audits (run history + scheduler/power; code) plus the assistant's own checks of their load-bearing claims. APPROVED at that moment: bounding the refresh's own step launcher through `fec/bounded_subprocess.py` (module described in `live-tree-eol-census-2026-09-19`, topic `2026-07-troubleshooting-melange-live-tree-git-drift`). Everything else was PRESENTED, not applied (`ask-before-substantive-changes`).

- `data\engine\weekly_refresh.log`: 6 `WEEKLY REFRESH COMPLETE` lines, last 2026-07-19 06:53; since then every attempt failed (agent: 42 runs parsed, 30 HARD FAILURE lines, 16 timeouts, 5 runs with no terminal line, 2 blocked).
- Last line: `[2026-09-13 06:00:02] WEEKLY REFRESH BLOCKED - Moneyball pipeline is already running (pid 31516, owner congress_pipeline)` = exit 75 in 2 s, zero steps, no retry.
- Status marker `weekly_refresh_status.json` last written 2026-09-08 BY HAND (`INTERRUPTED_PREVIOUS_RUN`).
- Task `MoneyballWeeklyRefresh`: Sunday 06:00, `python.exe weekly_refresh.py` direct (no wrapper, no WorkingDirectory), InteractiveToken, ExecutionTimeLimit none, WakeToRun, RestartOnFailure 3 x PT30M (did not fire on 2026-09-13; why not determined: the TaskScheduler Operational log is DISABLED).
- Daily tasks `MoneyballCongressRefresh` / `MoneyballDailyRefreshRetry` and `MoneyballCollectorSupervisor` are DISABLED (agent).
- `fec\icloud_smtp.txt` absent; 29 identical `EMAIL REPORT SKIPPED` lines in the log.

### What plagues it, ranked

1. ALL-OR-NOTHING, NO RESUME: 28 of 49 steps are fatal (10 `hard=True` + 18 collection legs that defer and then `_hard_abort` at `:425-427`); worst-path step budget 275,100 s = 76.4 h; every retry restarts from step 1. One `ABC done: 0 member turns` kills the week (11 consecutive times on 2026-08-28, agent). These gates are DELIBERATE fail-closed rulings (comments at `:409-424`): the fix is resume + retry, not loosening them; loosening is Paul's call.
2. `press delta refresh` (`:418`): hard, runs after every collector, budget 129600 s (36 h); 5 OK / 4 FAILED (`press refresh exited successfully without a valid live-network receipt`, `refresh_press_stream.py:140`) / 3 TIMEOUT at the old 14400 s (agent).
3. THE MACHINE: Kernel-Power 41 unexpected shutdowns = 23 between 2026-07-28 and 2026-09-15, TWELVE since 2026-09-01 (so the 2026-08-17 NPU fix did not end them; see `lg-gram-workstation`). About one per 2 days against a 76 h budget. The 2026-09-06 run died silently inside the press walk. `SetThreadExecutionState` blocks idle sleep only.
4. LEASE COLLISION: `weekly_refresh.py:69-74` takes `.pipeline_run.lock` at module scope and `sys.exit(75)` on contention - no wait, no retry - while `daily_refresh.py` may hold it up to 72 h and retries hourly. Structural; dormant only while the daily tasks stay Disabled.
5. BLIND: both exit-75 paths (`:50`, `:74`) run BEFORE the Glass Box import, `_write_status` and the atexit registrations, so a blocked run leaves no status, no event, no email. Email has never been sent (29 identical `EMAIL REPORT SKIPPED` lines; `fec\icloud_smtp.txt` absent). Glass Box holds exactly ONE event ever from the weekly refresh (agent). Three Sunday fires (2026-08-09, 2026-08-16, 2026-08-30) left no trace at all with the machine awake.
6. CANNOT END `COMPLETE` TODAY even with perfect collection: (a) `audit_full` currently fails 7 checks and 6 are NOT on the ratified list in `fec\audit_failure_gate.py` (`pillar snapshot vintage <= 14 days` = needs Excel to recalc the workbook, a HUMAN step every 14 days; `personal-texture artifact precision/schema/provenance`; `A2b repo.data_legislation / data_engine / worktrees / git sentinels unchanged` = system manifest not rebuilt) -> HARD FAILURE at `FULL PIPELINE + dashboards`; every Glass Box `pipeline.run` terminal event since 2026-09-05 is `failed` for this reason (the laundry-list lane recorded the same as brain DE-044, "chain exit 1 = standing audit reds"). (b) the last hard step `surfaces/publish_dashboard.py` (`:482`) needs `DASHBOARD_PASSWORD_FILE`, unset at User and Machine scope; `dashboard_deployment_receipt.json` has never existed; `deploy\index.html` dates from 2026-08-24; no logged run ever reached this step.
7. UNBOUNDED WAITS after a timeout (`:308` taskkill, `:312` `proc.wait()`, `:187` in the atexit orphan guard): an unkillable child = the owner stays alive holding both locks, so the stale-lock logic (pid liveness only, `pipeline_lock.py:38-50`) refuses forever. Same shape in the daily child `refresh_congress_pipeline.py:262/265` (NOT in scope yet).
8. TIME BOMBS: `official_membership_movements.py:69` raises after 8 days; consumer `build_archive_legislative.py` loads it at module scope (not optional) while its only producer `verify_collector_roster_updates.py` IS optional and gets skipped when inputs are missing; refreshed 2026-09-19T19:46Z, so the next deadline is 2026-09-27T19:46Z. SEPARATELY, per the laundry-list lane's index entry (NOT verified by the assistant): the chain dies from 2026-09-21T03:41Z because `sentinel_admissions` needs a PAID step that is Paul's ruling (`laundry-list-closeout-2026-09-18`).
9. Smaller: outer chain bound 7200 s (`:464`) is below the inner 10800 s per-step bound, so the inner one can never fire under the weekly (but the chain inside the weekly has never exceeded 2,076 s; the 261.6 min figure quoted earlier came from Glass Box durations of FAILED manual runs and was called "healthy" without evidence); a timeout and a failure both write `HARD_FAILURE`; `save_workbook_atomic` (`moneyball_core.py:232`) has no PermissionError retry though `lane_file_io.replace_atomic` has one; daily-job run dirs grew 733 MB in 2 days with no pruning; PID reuse can wedge the lease; tasks need an interactive logon.

### Paul's rulings 2026-09-19 (verbatim) and what they started

1. Resume + retry: "Yes, just make sure that the checkpoint/fail-save for one worker doesn't apply to every single one and stop the whole process".
2. Lease: "Yes make the weekly poll that continuously updates"; also "The lock collision needs verification logic and retry".
3. Alerts: "You should have access to do that, and can use my API for that, and you have the data on file to set that up" - BUT the key store `Desktop\API Keys\keys.json` holds only blocks `lda`, `data_gov`, `anthropic` (names checked, values never printed): NO mail credential is on file, so iCloud SMTP still cannot send; enabling the TaskScheduler Operational log is a system setting = Paul runs it himself (`wevtutil sl Microsoft-Windows-TaskScheduler/Operational /e:true`, elevated).
4. Excel: "I think we should just automate the excel if that means turning it into a different format".
5. Publish password: "Don't need to do that that" -> the publish step must become skip-when-not-configured, never a failure.
6. Crashes: "Investigate independently".
7. Plus: "The press walk fails because it is not using the same format in which the data was originally derieved"; "The Laptop crashing, this is an infrastructure issue, thus checkpoints are necessary"; "The failures need to be recorded and more importantly saved so that they can be tried again ... if a fail is detected it is filed and then returned too once collection for that session is complete".

LANDED the same day: `62aea2f76` weekly steps launch through `bounded_subprocess.run_bounded` (timeouts unchanged, no wait without a timeout left; `test_bounded_subprocess` 36/36). IN FLIGHT at write time (worktree `vibrant-sammet-a549a5`, Opus architects): (a) resumable orchestrator: new `fec/refresh_orchestrator.py` (per-step Ledger at `data/engine/weekly_refresh_run.json`, 72 h resume window, failures FILED and retried after the collection session, dependency-aware skipping instead of whole-run abort, `--resume-only`), lease poll with live `WAITING_FOR_LEASE` status, status/Glass Box moved above the locks, recycled-pid verification in `pipeline_lock.py` via process start time, publish step skip-if-unconfigured; (b) read-only press-format investigation (`scratchpad\press_format\`); (c) read-only crash forensics (`scratchpad\crash_forensics\`). NOT started then: the Excel-dependency design (pillar snapshot vintage), the logon-triggered `--resume-only` scheduled task (to be registered after (a) lands), a scheduled status check as the alert channel, the daily job's launcher (`refresh_congress_pipeline.py:262/265`).

### Press walk (investigated 2026-09-19, read-only; `scratchpad\press_format\EVIDENCE.txt`)

- Paul's diagnosis ("not using the same format in which the data was originally derived") was RIGHT ABOUT THE CLASS and already fixed: the R collector wrote receipt timestamps as `YYYY-MM-DD HH:MM:SS UTC` while `build_press_engine_feed.py` parsed ISO 8601, a bare `except` turned the ValueError into None, and `refresh_press_stream.py:140` raised "without a valid live-network receipt" - the 4 failures of 2026-08-30..09-01; fixed both sides 2026-09-01 (`646fd2b62`, `7e1cb0e66`).
- Everything else IS the original format (the refresh `source()`s the original R scraper, same roster/site map/schema; URL identity agrees on 100% of existing rows).
- What fails now: run `press_refresh_20260913` is `PARTIAL` with `pending_body_urls=2200`, so the R leg quits 3 and the hard press step fails.
- ~~Why it is slow: the base index has been FROZEN since 2026-06-24 because the refresh never writes back; every run re-fetches the whole backlog (~34,700 URLs, ~6 h); `fold_promoted_press_runs.py` sits AFTER the press step so a failing press step blocks the fold = feedback loop.~~ (2026-09-19 earlier text; the frozen-baseline and ~34,700 URLs claims were wrong, see corrections below. The ordering fact, `fold_promoted_press_runs.py` after the press step, stands.)
- `PRESS_BASELINE_FOLD` defaults "0", and `refresh_press_stream.py:161-178` says verbatim it "ships COMPLETE, PROVEN, and OFF, pending one ruling from Paul" (rank-affecting: the tone supplement shrinks once the delta shrinks); folded exactly once (2026-09-01, the 2026-08-28 run, +7,454 rows).
- SILENT GAP: a member site whose listing shape is not recognised yields 0 rows and nothing pending, so PASS can be claimed over it.
- Open for Paul at that time: turn the fold on?; a policy for bodies that stay unfetchable (file + retry N times, then stop blocking?).

## Sandbox test run 2026-09-19 evening

Paul: "We will let it run, making sure it is independent of AI, but lets first have a test run and check for bugs". Harness at `scratchpad\weekly_refresh\sandbox\` runs the byte-exact landed `weekly_refresh.py` against STUB producers in an isolated root (re-runnable: `build_sandbox.py`, `drive_a/b/c.py`, `preflight.py`); 18 scenarios.

- BLOCKER B1 (verified in LIVE): the pre-step producer walk indexes every `.py` under `fec/` and raises on a duplicate basename; two `__init__.py` (`research\member_personal_relationships`, `staffer_network`; the pair exists since 2026-09-10) = `FATAL pre-step failure` 0.2 s in, before step 1. Fix cut line-wise against LIVE bytes (`scratchpad\weekly_refresh\fix_b1_cut.py`, `--apply` to land; index only basenames that `step()` calls name, `run_pipeline.py:431-441`'s rule; a duplicated REAL producer still aborts) - LANDED `61be75ddc` on LIVE main 2026-09-19 18:22 local (sandbox 6/6 on the patched bytes, `apply_to` byte-exact, one-path commit made IN LIVE because the worktree held the orchestrator build's uncommitted edits to the same file; mirror current). The worktree branch `claude/vibrant-sammet-a549a5` must MERGE main before its orchestrator commit can land (same file, walk block).
- NOT AI-INDEPENDENT: `data/engine/sentinel_admission_policy.json` transport `claude-cli`/sonnet; hard weekly step `reference layer (classify new evidence)` spawns `claude.exe` up to 128x/run via `fec/classifier_runtime.py` (which still uses the forbidden `subprocess.run(capture_output, timeout=180)` shape) and ANY model error exits 1 = hard abort before the chain; `refresh_sentinel_admissions.py` same transport (soft -> deferred abort). The CHAIN is AI-free.
- Other pre-existing bugs sent to the orchestrator build: SIGBREAK handler cannot preempt the child wait (fired 54 s late); producers inherit cp1252 stdout (U+2713 kills a producer; accents become U+FFFD) -> `PYTHONUTF8=1` in child env; COMPLETE possible with the status marker never written; missing `data\engine` = silent death at first `log()`; atexit runs the email before the orphan kill.
- Verified GOOD: tree kill incl. detached grandchild, 50 MB flood, no temp leak, dead-pid lease reclaimed.

### Paul's rulings, second batch (verbatim)

"Yeah I agree with all of those, however, some members may truly have NO action regarding a specific area of legislation, so it should be something flagged for me". The assistant's reading, stated to him: APPROVED - the B1 fix; the orchestrator additions; press (1) turn the write-back ON (`PRESS_BASELINE_FOLD=1`, rank-affecting, his call, now made), press (2) bodies that stay unfetchable are FILED and retried, and after N attempts stop blocking the press transaction; press (3) AMENDED BY HIM: a known member site yielding ZERO rows is neither a failure nor a silent pass - it goes on a REVIEW LIST FLAGGED FOR PAUL (a member may truly have no action in an area). AI independence = AI steps must DEGRADE (file + continue on cached classifications + flag), never block; the assistant did NOT flip his policy file. NOT YET BUILT then: the press changes; the Excel-dependency design; the logon `--resume-only` task.

## Orchestrator build state (2026-09-19 ~18:45 local) - ABANDONED

Built by an Opus architect, held as WIP commit `352a5e495` on `claude/vibrant-sammet-a549a5` - NOT REVIEWED INLINE, NOT LANDED, based on `62aea2f76` (must merge main's `61be75ddc`, same file, walk block).

- New `fec/refresh_orchestrator.py` (596 lines: Ledger/Spec/Result/Runner), `weekly_refresh.py` +607/-174 (`step` is REBOUND: the launcher keeps its name/body for tests 15/17, `_LAUNCH_STEP=step`, `step=_orchestrated_step`; `_hard_abort`'s SystemExit is caught at the Runner boundary; native SetConsoleCtrlHandler for CTRL_BREAK), `pipeline_lock.py`/`process_liveness.py` recycled-pid check, two superseded pins rewritten in `test_collection_stream_wiring.py`, suite `test_refresh_orchestrator` 34 tests.
- Architect-flagged risks: `COMPLETE_WITH_FILED_FAILURES` is NOT in `collector_supervisor.py:477-478`'s accepted set (fails GATE-1 closed - Paul's call); publication can proceed with legs still failing, protected only by `collection intake audit --scope all` (its gate logic NOT read); `PYTHONUTF8=1` also changes children's default `open()` encoding.
- A FULL SANDBOX PASS on `352a5e495` was requested (scenarios R1-R12 incl. crash+resume); LANDING GATE was that pass + inline review of the diff + merge of main. The 2026-09-20 06:00 run uses the OLD orchestrator + bounded launcher + the B1 fix (source: "Tomorrow's 06:00 run", written 2026-09-19).

### Council 2026-09-19 evening

Paul ran `/ecc:council-multi-model` on "structural cohesion, independence, simplicity, efficiency"; four Opus voices; external Codex critique ABSENT (`codex` CLI not on PATH, adapter needs exactly 0.146.0). DO NOT LAND WIP `352a5e495` AS-IS. Critic's defects (F1 and F2 were the assistant's own design errors):

- F1: the chain `requires` only the reference layer, NOT the press fold, so a failed press walk still publishes last week's press under a fresh stamp (the exact thing the file's own comment forbids).
- F2: new outcome `COMPLETE_WITH_FILED_FAILURES` is rejected by `collector_supervisor.py:477-478` -> relaunch loop from step 1 because the ledger was closed.
- F3: `RESUME_WINDOW_HOURS=72` < the 76.4 h worst path (press alone 36 h) - key the window to the run's `updated_at`.
- F4: recycled-pid rule uses a 5 s skew while `_CLOCK_SKEW_SECONDS`=3600 exists one module over - a backward clock step can delete a LIVE lease = two writers (compare against the lock file's own ctime instead).
- F5: `always=True` re-publishes on every resume and ledger vs status JSON are two truths (derive status from the ledger).
- The CTRL_BREAK handler covers a failure mode the 23 shutdowns never were; rebinding `step` keeps text-pinned tests green while certifying nothing.
- Skeptic + Pragmatist: resume is unsafe unless every step writes temp-then-rename and the ledger is proven by a kill-mid-write + byte-compare negative control.
- CONSENSUS: steps as a pure DATA TABLE + a small runner with a real `main()` (weekly and chain under one ledger); no human/Excel/AI/out-of-repo-R in a hard unattended step; Excel is probably a day not a redesign - `compute_pillars.py:71-82` already bypasses the formula cache when policy `live_legislative_pillar` is true (VERIFY: cell types of Blended cols 5/6/15, and that the live pillar is not shadow-only, then a zero-rank-delta parity run); tombstone the 2,200 pending bodies; Glass Box as one JSONL per run; OWNER-ONLY first step = task principal "run whether logged on or not" + start-on-boot trigger (resume never fires otherwise).
- STRONGEST DISAGREEMENT, Paul's call: FAIL-CLOSED (Critic: refuse publication when any evidence step is filed / vintages outside one window) vs LABEL-CLOSED (Skeptic: always publish, stamp per-source vintage on the artifact).
- Skeptic's claim "the 76 h job causes the crashes" is REFUTED (12 crashes since 2026-09-01, weekly ran only 2026-09-01 and 2026-09-06; 0 Glass Box events in the 5 min before any crash).

### Sandbox full pass on WIP `352a5e495` (28 bounded runs, stub producers, `scratchpad\weekly_refresh\sandbox3\`; LIVE log + real Glass Box proven untouched)

Resume, filed-failure retry, dependency recovery, lease poll, recycled/dead pid reclaim, second-instance withhold, CTRL_BREAK (0.8 s, was 54 s), unicode, missing `data\engine`, corrupt-ledger rotation all PASS; branch suite 34/34. NEW BUGS, unfixed, all landing blockers on top of Critic F1-F5:

- N1: an UNPUBLISHED run exits 0 (old build exited 1) - Task Scheduler would read success; fix `sys.exit(1)` in the `if not _PUBLISHED:` branch (`:802-815`).
- N2: a hard failure AFTER the chain (publish step exits 1) is erased: outcome COMPLETE, ledger CLOSED, never retried - `_PUBLISHED` (`:801`) ignores `_hard_failures`.
- N3: an unwritable status marker costs 6.2 s PER WRITE (`replace_atomic` 40 attempts): same work 321 s vs 6.6 s, while holding the writer lease, and the terminal outcome never reaches disk - pass a small `attempts` from `_write_status`.
- N4: `_hard_abort` writes terminal `HARD_FAILURE` while the run continues (supervisor GATE-1 can read it mid-run).
- N5: a BLOCKED fire overwrites the previous run's outcome and leaves no ledger.
- N6: `datetime.utcnow()` deprecated.
- Also: the 6 h lease poll holds the weekly msvcrt lock the whole time, and with press SKIPPED the only guard against a stale-corpus publish is `collection intake audit` (stubbed in the sandbox - READ its real gate logic).

## RULED 2026-09-19 ~19:30 - tick runner

Paul: "Yeah go forward" (to the assistant's recommendations after the Codex Astra critique, which refused sign-off on the resume design: no total budget, multi-file commits not transactional, "fresh" confused with "complete and consistent", Skeptic's decomposition suppressed). The 49-step resume run is ABANDONED as the target; WIP `352a5e495` stays on branch `claude/vibrant-sammet-a549a5` for reference only.

- NEW SHAPE: every fire is a short TICK that runs whatever step is due and not good (state per STEP, not per run), isolated + bounded, filed failures retried after the collection pass, one hard total budget (18 h), then compute+publish only if the publication contract passes: every evidence source has a last OK, is not TORN (failed/killed run that wrote files, detected by pre/post snapshot diff), coverage not SUSPECT (zero-floor only: a file that had >= 50 rows now empty/gone; other shrink ratios recorded, never block), age <= 14 d (the project's own vintage number).
- Outcomes: PUBLISHED / PUBLISHED_DEGRADED exit 0, NOTHING_DUE 0, COLLECTED_NOT_PUBLISHED / COMPUTE_FAILED exit 1, BLOCKED 75.
- Lock fix: lock body records the holder's OS process creation time (`proc_start`); identity compare, immune to wall-clock steps.
- STRANGLER: new files only (`fec/refresh_table.py`, `refresh_state.py`, `refresh_tick.py`, suite T1-T18), `weekly_refresh.py` untouched, scheduled task keeps the old orchestrator until Paul flips it. Contract = session scratchpad `tick_runner\CONTRACT.md` (commit it under `audits/` with the build); build branch `claude/refresh-tick-20260919` off main `61be75ddc`.
- MEASURED for the design: LIVE `data/` = 29,631 files / 3.2 GB, stat-walk 11 s; ZERO cloud-only OneDrive placeholders under `data/` and `fec/` (so a logged-out task can read the tree; still prove with a logged-out smoke task before changing the task principal).
- OPEN, flagged to Paul: fixed `--since 14d/21d` collector windows leave a permanent GAP after a long outage unless the daily job covered it (unverified); off-box collection = his call; peer session "Python process independence from AI" owns the AI-degrade work - do not collide.

## Press facts corrected 2026-09-19 ~20:20 (decisive lines re-read; supersedes earlier press claims)

SEVERAL EARLIER PRESS CLAIMS IN THE SAME AUDIT WERE WRONG. Current (newest) facts:

1. The baseline is NOT frozen since 2026-06-24: it was folded once on 2026-09-01 (+7,454 rows, 257,223 after; `data/engine/press_baseline_fold_receipt.json`).
2. 36 h is the step TIMEOUT, not the runtime: the 2026-09-13 walk ran 3 h 13 m (the "76.4 h" figure is a sum of timeouts = a bound, never an observed run).
3. The 2,200 are NOT unfetchable bodies: they are undated index rows in exactly 9 members (H001068 847, T000472 531, H001077 288, M000312 196, F000479 158, W000797 103, S001227 36, H001104 36, F000450 5), `attempts=0`, never attempted because the 600 s per-member JS/CDX budget (`Draft Systems/cu_press_release_scraper.R:199`) runs out; exit 3 = PARTIAL (ran to the end, URLs deferred).
4. Filing + retrying already exists in R: per-member ledger `data/engine/press_body_attempts/<BIOGUIDE>.rds`, effective N=1.
5. THE REAL DEADLOCK: `fec/collect/press_backlog.R:371` disables ALL maintenance retries while any pending row exists - 2026-09-13 receipt: `revisit_due_urls=11532, revisit_selected_urls=0`.
6. `PRESS_BASELINE_FOLD=1` alone changes nothing: `build_press_engine_feed.validate_body_completion:99-101` refuses any run with status != PASS or pending != 0, so no run since 2026-09-04 is promotable/foldable.
7. No residual R-vs-Python format mismatch (Paul's format diagnosis was true 2026-08-30..09-01, closed by `646fd2b62`/`7e1cb0e66`).
8. The daily lane already treats rc 3 as PARTIAL (`daily_media_refresh.py:410-417`); the weekly had it `hard=True`.
9. Landmine: `fold_promoted_press_runs.py:59-63` raises RuntimeError when a promoted run dir is pruned (20260829 and 20260906 are already 0/6 files).
10. Silent zero-row regression on 2026-09-13: C001118, F000462, W000802 yielded rows in every earlier run, zero then.

- Superseded earlier claims, kept: ~~baseline frozen since 2026-06-24~~; ~~76.4 h observed runtime / 36 h walk~~ (bound only); ~~2,200 unfetchable bodies~~; ~~~34,700 URLs re-fetched per run (~6 h)~~ (2026-09-19, earlier in the audit).
- DESIGN built on the tick branch: tombstone after 3 CONSECUTIVE deferrals (persistent `data/engine/press_pending_tombstones.json`, seeded from the 8 run dirs), feed gate accepts a PARTIAL run only when every pending row is tombstoned + hash matches; fold default ON as its OWN commit (rank-affecting via tone-supplement composition - Paul confirms at landing); fold skip-and-record instead of RuntimeError; zero-row review CSV (REGRESSED / NEVER_SEEN) as a tick-only step; the R one-liner at `:371` only if testable on a scratch harness, separate commit. `test_collection_stream_wiring.py` is registered in NO kernel lane.

## Tick runner built + reviewed 2026-09-19 ~23:30 (branch `claude/refresh-tick-20260919`, NOT yet landed at this writing)

- Files: `fec/refresh_table.py` (50 rows = main's 49 pinned by AST + tick-only `press zero-row review`), `fec/refresh_state.py`, `fec/refresh_tick.py` (real `main()`, `--dry-run`/`--status` take no lock and write nothing), suite `test_refresh_tick` 38 tests (T1-T19: crash at 5 internal points + external kill + CTRL_BREAK all converge to byte-identical output; lock negative control proves WIP `352a5e495`'s rule reclaims a LIVE holder after a 1 h backward clock step).
- Commits: `1b201d720` lock identity (`proc_start` in lock body; every reader tolerates the extra key), `326b672ed` runner, `6bff03e65` widened scan + 7 self-found fixes, `406e18e91` the assistant's review fix (root top-level scan = data-shaped files only; `~$` Office locks and SQLite -wal/-shm/-journal ignored everywhere - a human saving a note must never mark a failing collector TORN).
- Press commits on the same branch: `b7fa97dc4`, `a66b39850` (fold default ON, rank-affecting, droppable), `117788834`, `c1f0b0bb1`, `7b3b5270d` (gated R retries, droppable), `e8bda5d65` (Python-ledger -> R round-trip test, depends on `7b3b5270d`).
- KERNEL FROM A BYTE-EXACT EXPORT IS NOT 246/2: an export lacks untracked runtime data, so main gives 220 passed / 29 FAILED there; tip = 222/30 with the IDENTICAL 29 + three new suites OK + `test_daily_refresh`, a PRE-EXISTING timing flake (5/12 runs fail on main's export; spawned task; see the flake lane in [[2026-08-incident-refresh-automation-reliability-daily-refresh-closeout-and-flakes]]). Real gate = kernel from LIVE after landing (expect 249 passed / 2 baseline reds).
- NEVER `git archive` the tree for tests again: each export is 18.2 GB (tracked `audits/legfix5` etc.); the build left 93 GB in scratchpad `tick_runner\build\` (2 tars + 3 exports), disk fell to 24 GB - deleting them is Paul's step.
- CUTOVER FACTS: scheduled tasks on 2026-09-19: `MoneyballWeeklyRefresh` Ready (weekly 06:00, Interactive = only while logged on, last result 75), `MoneyballCollectorSupervisor` DISABLED since 2026-09-01, `MoneyballCongressRefresh` + `MoneyballDailyRefreshRetry` DISABLED. `collector_supervisor.py:472-486` GATE-1 relaunches the WHOLE `weekly_refresh.py` and accepts only `weekly_refresh_status.json` `last_outcome` in {COMPLETE, COMPLETE_WITH_KNOWN_GATED_FAILURES}; the tick writes NO legacy status, so the supervisor must learn `refresh_tick_status.json` before it is ever re-enabled (GATE-2 is Paul-gated: never fake its inputs).
- Launch = `python.exe "<ROOT>\fec\refresh_tick.py"` (no args; cwd `fec`; exit 0 PUBLISHED/PUBLISHED_DEGRADED/NOTHING_DUE, 1 COLLECTED_NOT_PUBLISHED/COMPUTE_FAILED/FATAL_PRESTEP, 75 BLOCKED).
- AFTER CUTOVER PUBLICATION STAYS BLOCKED, LOUDLY, until: (a) two more sealed press walks tombstone the 9 stuck members (press rows are evidence: "has never succeeded" blocks), (b) the six un-ratified audit reds are ratified or fixed (chain exit 1 novel = COMPUTE_FAILED), (c) the other lanes' chain blockers (N12 interview dups at chain step 3; `sentinel_admissions` paid step from 2026-09-21T03:41Z).
- Known limits: `C:\melange-data\*` audio outputs unwatched; a legit permanent zero-row file blocks until Paul intervenes (no `--accept` flag yet); ~7 MB pre-snapshot per step = ~350 MB OneDrive churn per full tick (persist one + deltas later); reference-layer step still calls the AI (peer session owns the degrade).

## Weekly refresh email: not active (file `weekly-refresh-email-not-active-2026-08-09`)

- Email feature: `fec/refresh_email.py` (commit `2857c99`, 2026-08-05) emails the report to `[personal email omitted]` via atexit after every weekly refresh. NEVER sent as of 2026-08-09 (and still never, per the 2026-09-19 audit): `fec/icloud_smtp.txt` (3 lines: apple-id / app-specific password / from-address, utf-8, no blank 4th line) does not exist. Gitignore-safe (`.gitignore:21` `*.txt`, no re-including negation, verified). Creating it is PAUL'S action (password entry). Post-fill test command delivered 2026-08-09 (`python -c` import `refresh_email`; `send_report`): that module alone is import-safe, stdlib-only at module level, the exception to import==execution.
- 2026-08-09 crash (metaloop `run-20260809T2331205425533Z-a0cc20e9e7`, HIGH confidence): see History in [[2026-08-incident-refresh-automation-reliability]]. Ruled out: Ctrl+C, shutdown, 3 h limit, alternate log paths. TaskScheduler Operational event log is DISABLED on this machine (evidence gap).
- Fix F1+F2: `codex/refresh-crash-vis2` @ `a1436f9`: banner + `log()` + atexit email hook moved before the producer `os.walk` scan (walk wrapped: FATAL pre-step failure logged + re-raised); SIGBREAK handler logs KILLED line + `sys.exit(1)` so atexit fires on console-close/logoff/shutdown. Verified: py_compile clean, counts 1/1/1, order banner(27) -> hook(37) -> handler(42) -> walk(44), moved blocks token-identical vs `0a3d26d`, dual review (Codex xhigh executed; inline Fable adversarial second pass; codex MCP disconnected + CLI absent that night). Deployed 2026-08-09 ~21:24 (see History in [[2026-08-incident-refresh-automation-reliability]]): live `weekly_refresh.py` content-identical to the fix (`git diff a1436f9 HEAD -- <file>` empty; raw-MD5 delta = CRLF rewrite by merge, benign).
- Residual limitations: a 3 h ExecutionTimeLimit hard-kill still bypasses atexit silently; a banner-write failure on a broken install dies pre-registration (these prevent misreading post-fix silences).
- 2026-08-16 forecast: now UNKNOWN (was FAIL). Prior Sunday failures FIXED (2026-07-26 via `89b6219`; 2026-08-02 via the 2026-08-03 13:11 promotion). The old standing crown-law red's fate changed the night of 2026-08-09 (see History in [[2026-08-incident-refresh-automation-reliability]]: the crown-law merge and its kernel receipt); Sunday's outcome depended on how THAT lane's cycle landed - their lane, not adjudicated here. NEVER weaken the audit or `weekly_refresh.py`'s `hard=True` to make Sundays green. The live tree also had ` M data/stance/own_source_stance_model.joblib` (mid-run churn) - not this lane's, do not clean.
- TABLED by Paul 2026-08-09 (end of session): activation (the credentials file) and the 2026-08-16 crown-law question are consciously deferred - do not nag or re-raise unprompted; pick up only when Paul brings it back or a weekly run surfaces new evidence.
- How to apply: before re-answering "is the email working / did the refresh run": check `data/engine/weekly_refresh.log` tail, whether `a1436f9` reached main AND the live branch, and whether `icloud_smtp.txt` exists now. If Paul asks to deploy: merge `a1436f9` -> main, then `git -C live merge --ff-only main`. Related: `melange-ui-retheme-2026-08-06` (local merge = PR-equivalent precedent), `moneyball-audit-run-guardrails`.
