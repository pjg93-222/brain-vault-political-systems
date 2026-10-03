---
type: topic
title: "Refresh automation reliability"
aliases: ["Refresh automation reliability"]
category: "incident"
status: "in-progress"
people:
  - "[[paul-goff]]"
actors:
  - "[[codex-executor]]"
  - "[[glass-box]]"
  - "[[melange-refresh-scheduler]]"
objective: "Make the unattended Melange refresh (weekly fec/weekly_refresh.py plus the congress daily-refresh chain) self-sufficient and independent of AI: it must reach a published COMPLETE state, resume after crashes, never fail blind, and never be supervised by a model poll loop."
created_at: 2026-08-09
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/daily-refresh-suite-flake-lane-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\daily-refresh-suite-flake-lane-2026-09-19.md", sha256: "45afc27467423245590c9f3fe6a5fa554d7d1ab47c3b151271aeef409dfab48f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/weekly-refresh-self-sufficiency-audit-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\weekly-refresh-self-sufficiency-audit-2026-09-19.md", sha256: "5525846f07a85e2dc3a5cb87a385e086316365aff4a1008157c1553b54f76a1a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/daily-refresh-lane-closeout-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\daily-refresh-lane-closeout-2026-09-19.md", sha256: "acbca8cd3aba1e0d1eee6ee888e3d72e8c9e5af51a3340a65e4fa24db1c850ef"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/codex-overnight-poll-loop-burn-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\codex-overnight-poll-loop-burn-2026-09-13.md", sha256: "f4674518cac30842e12c700511711b0e769e6f69c91a3b784592b5413423dc5e"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/weekly-refresh-email-not-active-2026-08-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\weekly-refresh-email-not-active-2026-08-09.md", sha256: "14b3930e5f5f1f93732ee3b65af53471d1d9250b699899a025e8552c5c3489f3"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/topic", "status/in-progress", "domain/infra", "category/incident"]
---

# Refresh automation reliability

> The weekly refresh (`fec/weekly_refresh.py`, Windows task `MoneyballWeeklyRefresh`) has NOT completed since 2026-07-19 06:53; the weekly email has never been sent; the daily congress chain is blocked at step 3; the Codex poll-loop incident of 2026-09-12/13 burned a whole weekly quota. Current state is the 2026-09-19 weekly-refresh self-sufficiency audit (newest source) plus its 2026-09-20 addenda.

## Context

- Scope: the unattended refresh automation of [[melange-systems]], implemented by the actor [[melange-refresh-scheduler]] (weekly refresh, daily congress chain, `refresh_email.py`). Owner and decision maker: [[paul-goff]].
- Newest-wins note: the 2026-09-19 audit (file `weekly-refresh-self-sufficiency-audit-2026-09-19`, last modified 2026-09-20) is the current state and corrects, in place, several earlier press claims made earlier the same day in that same audit; the older claims are kept below as dated struck-through bullets.
- Never tell Paul the refresh "runs weekly": check the last `WEEKLY REFRESH COMPLETE` line in `data\engine\weekly_refresh.log` first. 6 `WEEKLY REFRESH COMPLETE` lines exist; the last is 2026-07-19 06:53.
- The refresh-email recipient is a personal iCloud address: `[personal email omitted]`.
- Related lanes (not vault entities): `laundry-list-closeout-2026-09-18`, `sentinel-collectors-lane-2026-09-01`, `lg-gram-npu-crash-2026-08-17` (machine crashes; documented in the LG Gram workstation actor, `lg-gram-workstation`), `glassbox-everything-rule-2026-07-27` (every action emits Glass Box events; see [[glass-box]]), `verify-dont-infer-completion-2026-08-04`, `codex-executor-lane-2026-07-18`, `ultracode-orchestration-standing-2026-08-18`, `melange-ui-retheme-2026-08-06`, `moneyball-audit-run-guardrails`, `ask-before-substantive-changes`.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[codex-executor]] | Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17 |
| [[glass-box]] | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| [[melange-refresh-scheduler]] | Unattended Melange refresh jobs: weekly refresh, congress daily chain, report email; weekly not COMPLETE since 2026-07-19 |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Topics

- [[2026-07-working-agreement-agent-orchestration-rules]] - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.

## History

| Date | Event |
|---|---|
| 2026-07-19 06:53 | Last `WEEKLY REFRESH COMPLETE` line in `data\engine\weekly_refresh.log` (6 such lines exist in total). Every attempt since has failed. |
| 2026-07-26 | Sunday run failed; fixed via `89b6219`. |
| 2026-08-02 | Sunday run failed; fixed via the 2026-08-03 13:11 promotion. |
| 2026-08-05 | `fec/refresh_email.py` committed (`2857c99`): emails the report via atexit after every weekly refresh. Never sent. |
| 2026-08-09 | 06:00 Sunday trigger never fired: laptop in lid-closed deep DRIPS Modern Standby on AC (WakeToRun not honored, unlike the 4 prior Sundays). StartWhenAvailable queued it; catch-up launched 11:52:45 at lid-open (Kernel-Power 507 second-match) as a VISIBLE console (task LogonType=InteractiveToken); the console was closed by hand, CTRL_CLOSE_EVENT gave exit 0xC000013A, atexit bypassed, zero log lines. metaloop run `run-20260809T2331205425533Z-a0cc20e9e7`, HIGH confidence. |
| 2026-08-09 ~21:24 | F1+F2 crash-visibility fix `codex/refresh-crash-vis2` @ `a1436f9` deployed via Paul's clicks (classifier denied the assistant `git merge` 4 times; Paul ran the commands). Main took `a1436f9`; live branch merged main @ `7bc1168`. First live-tree merge attempt 21:19:59 failed silently (transient OneDrive write-lock: ORIG_HEAD written, no reflog/MERGE_HEAD, clean backout); retry succeeded. |
| 2026-08-09 (evening) | Paul's parallel session merged CHAMPION CROWN LAW into main (@ `a0e4409`, "a champion cannot be a threat"; +29 lines in `audit_full.py` incl. a new champions-boards check reading `%LOCALAPPDATA%\Melange\lda_rebuild\derived\champions_v2\boards.json`); its receipt `audits/champion_crown_law_20260809/tests_post.txt` showed KERNEL TESTS 144 passed 6 FAILED + `test_legislation_shadow_recompute` 12 failed; it then launched a live chain run (~21:25, `.pipeline_run.lock` pid 31056). |
| 2026-08-09 (end of session) | Email activation (credentials file) and the 2026-08-16 crown-law question TABLED by Paul. |
| 2026-08-09, 2026-08-16, 2026-08-30 | Three Sunday fires left no trace at all with the machine awake (see audit item 5). |
| 2026-08-28 | `ABC done: 0 member turns` killed the week 11 consecutive times (agent finding). |
| 2026-08-30 to 2026-09-01 | 4 press failures "without a valid live-network receipt" (timestamp-format mismatch); fixed both sides 2026-09-01 (`646fd2b62`, `7e1cb0e66`). |
| 2026-09-01 | Press baseline folded once (+7,454 rows, 257,223 after; `data/engine/press_baseline_fold_receipt.json`). `MoneyballCollectorSupervisor` DISABLED since this date. |
| 2026-09-06 | Weekly run died silently inside the press walk (standby-for-shutdown 14:30, crash 00:04). |
| 2026-09-08 | `weekly_refresh_status.json` last written, BY HAND (`INTERRUPTED_PREVIOUS_RUN`). |
| 2026-09-12 23:29 to 2026-09-13 10:58 | Codex Desktop thread `01a098ce-d021-7d42-9383-5affc2a0bdfb` burns the weekly Codex quota in a 30 s poll loop (see section below). |
| 2026-09-13 | Last weekly log line `[2026-09-13 06:00:02] WEEKLY REFRESH BLOCKED - Moneyball pipeline is already running (pid 31516, owner congress_pipeline)`: exit 75 in 2 s, zero steps, no retry. Daily-refresh repair lane (Fable session, live tree): see section below. Press run `press_refresh_20260913` is `PARTIAL`, `pending_body_urls=2200`. |
| 2026-09-19 | Weekly-refresh self-sufficiency audit; launcher bounding landed (`62aea2f76`); B1 blocker fixed on LIVE main (`61be75ddc`, 18:22 local); orchestrator WIP `352a5e495` built, reviewed by council, sandbox-tested, then ABANDONED for the tick runner (ruled ~19:30); tick runner built and reviewed ~23:30 on branch `claude/refresh-tick-20260919`; daily-refresh lane closeout (full chain blocked at step 3). |
| 2026-09-20 | Daily-refresh clock flake CLOSED: landed on LIVE main `203a69812` (D-063, DE-046). Planned: tomorrow's (2026-09-20) 06:00 weekly run uses the OLD orchestrator + bounded launcher + the B1 fix. |

## Decisions

- Resume rule (Paul 2026-09-19): resume plus retry, but a checkpoint/fail-safe for one worker must not apply to all and stop the whole process (see Paul's rulings below).
- Lease collision: the weekly must poll continuously and verify/retry (2026-09-19).
- Publish password: the publish step must become skip-when-not-configured, never a failure (2026-09-19, "Don't need to do that that").
- Crash/infrastructure: checkpoints are necessary because the laptop crashes (2026-09-19).
- Press (second batch of rulings 2026-09-19): write-back ON, unfetchable bodies filed and retried then stop blocking, known member site with zero rows goes to a REVIEW LIST flagged for Paul.
- AI independence: AI steps must DEGRADE (file, continue on cached classifications, flag), never block. The policy file was NOT flipped.
- 2026-09-19 ~19:30 TICK RUNNER ruled ("Yeah go forward"): supersedes the 49-step resume-orchestrator target.
- ~~Resume-orchestrator WIP `352a5e495` as the landing target~~ (2026-09-19 early evening) - superseded ~19:30 the same evening by the tick runner; WIP stays on branch `claude/vibrant-sammet-a549a5` for reference only; do NOT land it.
- ~~Old press claim: baseline frozen since 2026-06-24, 2,200 unfetchable bodies, 36 h walk as runtime~~ (2026-09-19 earlier text) - corrected ~20:20 the same evening (see Press facts corrected).
- Never weaken the audit or `weekly_refresh.py`'s `hard=True` to make Sundays green (rule recorded 2026-08-09; the 09-19 audit repeats that the gates are DELIBERATE fail-closed rulings and loosening is Paul's call).
- Never run or import `fec/weekly_refresh.py` to test it: it executes the whole refresh at module level; test `step()` by lifting its source with `ast` into a sandbox.
- Never supervise long jobs from an AI turn: launch detached, then ONE background `until` loop or one Monitor on the status file (Codex burn lesson).
- Do not create Codex heartbeat automations as a scheduler; flag, do not flip, paused ones.
- Email credentials: creating the local SMTP credential file is PAUL'S action (password entry). TABLED 2026-08-09: do not nag or re-raise unprompted.

## Next Steps

- [ ] Paul: confirm the press fold ruling at landing (rank-affecting via tone-supplement composition) - commit `a66b39850` is droppable.
- [ ] Paul: decide FAIL-CLOSED vs LABEL-CLOSED publication (council disagreement, below).
- [ ] Paul: teach/accept status for the supervisor: `collector_supervisor.py:472-486` must learn `refresh_tick_status.json` before `MoneyballCollectorSupervisor` is re-enabled (GATE-2 is Paul-gated; never fake its inputs).
- [ ] Paul: run `wevtutil sl Microsoft-Windows-TaskScheduler/Operational /e:true` (elevated) to enable the TaskScheduler Operational log (system setting).
- [ ] Paul: provide a mail credential if email is wanted (key store has none): create the local SMTP credential file.
- [ ] Owner-only: switch task principal to "run whether logged on or not" + start-on-boot trigger (prove first with a logged-out smoke task); flip `MoneyballWeeklyRefresh` to launch `fec\refresh_tick.py` when Paul decides.
- [ ] Ratify or fix the six un-ratified audit reds (publication blocked until then).
- [ ] Design the Excel dependency (pillar snapshot vintage); not started as of 2026-09-19.
- [ ] Register the logon-triggered `--resume-only` task (only if the orchestrator route is kept; the tick runner replaces it) and a scheduled status check as the alert channel.
- [ ] Daily job launcher (`refresh_congress_pipeline.py:262/265`) bounding: not in scope yet.
- [ ] Paul to delete the ~93 GB of build exports in scratchpad `tick_runner\build\` (2 tars + 3 exports); C: free fell to 24 GB.
- [ ] Paul: wrapper defects W1-W3 of the daily lane (below) await his apply gate.
- [ ] Verify before the weekly Excel/live-pillar parity run: cell types of Blended cols 5/6/15 and that the live pillar is not shadow-only, then a zero-rank-delta parity run.
- [ ] After the fixed `--since 14d/21d` collector window question is checked (unverified): does a long outage leave a permanent gap unless the daily job covered it? Off-box collection = Paul's call.

## Measured state 2026-09-19 (current; verified by the assistant unless marked agent)

Lane: worktree `vibrant-sammet-a549a5`, 2026-09-19, after Paul's "Yeah bound it, we just gotta make sure it is self-sufficient, what are the main problems that are plaguing it?". Two read-only Opus audits (run history + scheduler/power; code) plus the assistant's own checks of their load-bearing claims. APPROVED at that moment: bounding the refresh's own step launcher through `fec/bounded_subprocess.py` (module described in `live-tree-eol-census-2026-09-19`, topic `2026-07-troubleshooting-melange-live-tree-git-drift`). Everything else was PRESENTED, not applied (`ask-before-substantive-changes`).

- `data\engine\weekly_refresh.log`: 6 `WEEKLY REFRESH COMPLETE` lines, last 2026-07-19 06:53; since then every attempt failed (agent: 42 runs parsed, 30 HARD FAILURE lines, 16 timeouts, 5 runs with no terminal line, 2 blocked).
- Last line: `[2026-09-13 06:00:02] WEEKLY REFRESH BLOCKED - Moneyball pipeline is already running (pid 31516, owner congress_pipeline)` = exit 75 in 2 s, zero steps, no retry.
- Status marker `weekly_refresh_status.json` last written 2026-09-08 BY HAND (`INTERRUPTED_PREVIOUS_RUN`).
- Task `MoneyballWeeklyRefresh`: Sunday 06:00, `python.exe weekly_refresh.py` direct (no wrapper, no WorkingDirectory), InteractiveToken, ExecutionTimeLimit none, WakeToRun, RestartOnFailure 3 x PT30M (did not fire on 2026-09-13; why not determined: the TaskScheduler Operational log is DISABLED).
- Daily tasks `MoneyballCongressRefresh` / `MoneyballDailyRefreshRetry` and `MoneyballCollectorSupervisor` are DISABLED (agent).
- the local SMTP credential file absent; 29 identical `EMAIL REPORT SKIPPED` lines in the log.

### What plagues it, ranked

1. ALL-OR-NOTHING, NO RESUME: 28 of 49 steps are fatal (10 `hard=True` + 18 collection legs that defer and then `_hard_abort` at `:425-427`); worst-path step budget 275,100 s = 76.4 h; every retry restarts from step 1. One `ABC done: 0 member turns` kills the week (11 consecutive times on 2026-08-28, agent). These gates are DELIBERATE fail-closed rulings (comments at `:409-424`): the fix is resume + retry, not loosening them; loosening is Paul's call.
2. `press delta refresh` (`:418`): hard, runs after every collector, budget 129600 s (36 h); 5 OK / 4 FAILED (`press refresh exited successfully without a valid live-network receipt`, `refresh_press_stream.py:140`) / 3 TIMEOUT at the old 14400 s (agent).
3. THE MACHINE: Kernel-Power 41 unexpected shutdowns = 23 between 2026-07-28 and 2026-09-15, TWELVE since 2026-09-01 (so the 2026-08-17 NPU fix did not end them; see `lg-gram-workstation`). About one per 2 days against a 76 h budget. The 2026-09-06 run died silently inside the press walk. `SetThreadExecutionState` blocks idle sleep only.
4. LEASE COLLISION: `weekly_refresh.py:69-74` takes `.pipeline_run.lock` at module scope and `sys.exit(75)` on contention - no wait, no retry - while `daily_refresh.py` may hold it up to 72 h and retries hourly. Structural; dormant only while the daily tasks stay Disabled.
5. BLIND: both exit-75 paths (`:50`, `:74`) run BEFORE the Glass Box import, `_write_status` and the atexit registrations, so a blocked run leaves no status, no event, no email. Email has never been sent (29 identical `EMAIL REPORT SKIPPED` lines; the local SMTP credential file absent). Glass Box holds exactly ONE event ever from the weekly refresh (agent). Three Sunday fires (2026-08-09, 2026-08-16, 2026-08-30) left no trace at all with the machine awake.
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
- KERNEL FROM A BYTE-EXACT EXPORT IS NOT 246/2: an export lacks untracked runtime data, so main gives 220 passed / 29 FAILED there; tip = 222/30 with the IDENTICAL 29 + three new suites OK + `test_daily_refresh`, a PRE-EXISTING timing flake (5/12 runs fail on main's export; spawned task; see the flake lane below). Real gate = kernel from LIVE after landing (expect 249 passed / 2 baseline reds).
- NEVER `git archive` the tree for tests again: each export is 18.2 GB (tracked `audits/legfix5` etc.); the build left 93 GB in scratchpad `tick_runner\build\` (2 tars + 3 exports), disk fell to 24 GB - deleting them is Paul's step.
- CUTOVER FACTS: scheduled tasks on 2026-09-19: `MoneyballWeeklyRefresh` Ready (weekly 06:00, Interactive = only while logged on, last result 75), `MoneyballCollectorSupervisor` DISABLED since 2026-09-01, `MoneyballCongressRefresh` + `MoneyballDailyRefreshRetry` DISABLED. `collector_supervisor.py:472-486` GATE-1 relaunches the WHOLE `weekly_refresh.py` and accepts only `weekly_refresh_status.json` `last_outcome` in {COMPLETE, COMPLETE_WITH_KNOWN_GATED_FAILURES}; the tick writes NO legacy status, so the supervisor must learn `refresh_tick_status.json` before it is ever re-enabled (GATE-2 is Paul-gated: never fake its inputs).
- Launch = `python.exe "<ROOT>\fec\refresh_tick.py"` (no args; cwd `fec`; exit 0 PUBLISHED/PUBLISHED_DEGRADED/NOTHING_DUE, 1 COLLECTED_NOT_PUBLISHED/COMPUTE_FAILED/FATAL_PRESTEP, 75 BLOCKED).
- AFTER CUTOVER PUBLICATION STAYS BLOCKED, LOUDLY, until: (a) two more sealed press walks tombstone the 9 stuck members (press rows are evidence: "has never succeeded" blocks), (b) the six un-ratified audit reds are ratified or fixed (chain exit 1 novel = COMPUTE_FAILED), (c) the other lanes' chain blockers (N12 interview dups at chain step 3; `sentinel_admissions` paid step from 2026-09-21T03:41Z).
- Known limits: `C:\melange-data\*` audio outputs unwatched; a legit permanent zero-row file blocks until Paul intervenes (no `--accept` flag yet); ~7 MB pre-snapshot per step = ~350 MB OneDrive churn per full tick (persist one + deltas later); reference-layer step still calls the AI (peer session owns the degrade).

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

## Weekly refresh email: not active (file `weekly-refresh-email-not-active-2026-08-09`)

- Email feature: `fec/refresh_email.py` (commit `2857c99`, 2026-08-05) emails the report to `[personal email omitted]` via atexit after every weekly refresh. NEVER sent as of 2026-08-09 (and still never, per the 2026-09-19 audit): the local SMTP credential file (format in the private notes) does not exist. Gitignore-safe (`.gitignore:21` `*.txt`, no re-including negation, verified). Creating it is PAUL'S action (password entry). Post-fill test command delivered 2026-08-09 (`python -c` import `refresh_email`; `send_report`): that module alone is import-safe, stdlib-only at module level, the exception to import==execution.
- 2026-08-09 crash (metaloop `run-20260809T2331205425533Z-a0cc20e9e7`, HIGH confidence): see History. Ruled out: Ctrl+C, shutdown, 3 h limit, alternate log paths. TaskScheduler Operational event log is DISABLED on this machine (evidence gap).
- Fix F1+F2: `codex/refresh-crash-vis2` @ `a1436f9`: banner + `log()` + atexit email hook moved before the producer `os.walk` scan (walk wrapped: FATAL pre-step failure logged + re-raised); SIGBREAK handler logs KILLED line + `sys.exit(1)` so atexit fires on console-close/logoff/shutdown. Verified: py_compile clean, counts 1/1/1, order banner(27) -> hook(37) -> handler(42) -> walk(44), moved blocks token-identical vs `0a3d26d`, dual review (Codex xhigh executed; inline Fable adversarial second pass; codex MCP disconnected + CLI absent that night). Deployed 2026-08-09 ~21:24 (see History): live `weekly_refresh.py` content-identical to the fix (`git diff a1436f9 HEAD -- <file>` empty; raw-MD5 delta = CRLF rewrite by merge, benign).
- Residual limitations: a 3 h ExecutionTimeLimit hard-kill still bypasses atexit silently; a banner-write failure on a broken install dies pre-registration (these prevent misreading post-fix silences).
- 2026-08-16 forecast: now UNKNOWN (was FAIL). Prior Sunday failures FIXED (2026-07-26 via `89b6219`; 2026-08-02 via the 2026-08-03 13:11 promotion). The old standing crown-law red's fate changed the night of 2026-08-09 (see History: the crown-law merge and its kernel receipt); Sunday's outcome depended on how THAT lane's cycle landed - their lane, not adjudicated here. NEVER weaken the audit or `weekly_refresh.py`'s `hard=True` to make Sundays green. The live tree also had ` M data/stance/own_source_stance_model.joblib` (mid-run churn) - not this lane's, do not clean.
- TABLED by Paul 2026-08-09 (end of session): activation (the credentials file) and the 2026-08-16 crown-law question are consciously deferred - do not nag or re-raise unprompted; pick up only when Paul brings it back or a weekly run surfaces new evidence.
- How to apply: before re-answering "is the email working / did the refresh run": check `data/engine/weekly_refresh.log` tail, whether `a1436f9` reached main AND the live branch, and whether the local SMTP credential file exists now. If Paul asks to deploy: merge `a1436f9` -> main, then `git -C live merge --ff-only main`. Related: `melange-ui-retheme-2026-08-06` (local merge = PR-equivalent precedent), `moneyball-audit-run-guardrails`.

## Codex overnight poll-loop burn 2026-09-12/13 (file `codex-overnight-poll-loop-burn-2026-09-13`, a feedback rule)

Incident (2026-09-12 23:29 to 2026-09-13 10:58 local, Codex Desktop thread `01a098ce-d021-7d42-9383-5affc2a0bdfb`; see [[codex-executor]]):

- Paul asked for an end-to-end recurring congress.gov bills -> sponsors -> media -> Excel -> dashboard refresh that "triggers every time I open my laptop", and said explicitly: "No not an AI process, something in my windows, like a Python process." Codex built the right artifact (`fec/legislation/refresh_congress_pipeline.py` + `fec/daily_refresh.py` + two Windows scheduled tasks `MoneyballCongressRefresh` / `MoneyballDailyRefreshRetry`), then stayed in the loop itself: 542 empty `write_stdin({chars:"", yield_time_ms:30000})` polls on its own background shell (03:36Z to 14:57Z), 280 `wait_agent` blocks, 4 spawned agents each doing the same, and 27 `approvals_reviewer: auto_review` guardian threads that made zero tool calls yet consumed ~59M tokens re-reading context.
- Session family total: 673,856,790 tokens (674M) across 32 rollout files; ended with `usage_limit_exceeded`, next window 2026-09-19 23:50. Quota was already at 89% when the thread started. Nothing external re-invoked Codex: no scheduler, no wrapper, no `codex exec` loop; the Python code never calls OpenAI/Codex.
- Why it matters: the job was correct and Windows-owned; the waste was 100% supervision. Paul's verdict: "that is unacceptable." Related: the brain's DE-018 (a Codex usage-limit error does not mean the subprocess stopped - inspect outputs before re-dispatching). Governing rules live in [[2026-07-working-agreement-agent-orchestration-rules]].
- How to apply: a long-running Python job is finished when its receipt/status file says so, not when a model has watched it finish. Launch it detached (Task Scheduler, `Start-Process`), then use ONE Bash `run_in_background` `until` loop or one `Monitor` on the status file. Never a per-turn poll loop, never `wait`/`sleep` turns, never spawn helper agents to "watch". Do not create Codex heartbeat automations as a scheduler. Three PAUSED heartbeats still exist in `C:\Users\pgoff\.codex\automations\` (`finish-collection-integrity-overnight` hourly, `finish-staffer-lda-reconciliation` every MINUTE, `legislation-acceptance-continuation` every 10 min); any of them flipping ACTIVE is a recurring burner. Flag, don't flip. `approvals_reviewer: auto_review` in Codex thread settings fans out guardian threads that bill against the same weekly limit: treat it as a cost multiplier on long threads. "Independent of AI" is not fully true of the chain yet: step 3 `fec/legislation/refresh_sentinel_admissions.py:288-290` calls `api.anthropic.com` with `fec/anthropic_key.txt` (fingerprint-cached; pre-existing sentinel-lane code). That is Paul's call to keep or remove, never the assistant's. Related: `verify-dont-infer-completion-2026-08-04`, `glassbox-everything-rule-2026-07-27`, `codex-executor-lane-2026-07-18`, `ultracode-orchestration-standing-2026-08-18`.
- Repair lane 2026-09-13 afternoon (Fable session, live tree, UNCOMMITTED at the time and the whole subsystem UNTRACKED in git): the real reason the Windows job never finished was three collectors treated as fatal: (1) press collector exits 3 BY DESIGN when body backlog remains (`refresh_press_delta.R:843`; 2,200 pending, `JS_MEMBER_BUDGET 600` in Draft Systems R, fold OFF) - now PARTIAL, not FAIL, and the press_intake/press_feed/press_baseline_fold steps plus `all_intake` are PARKED (`SKIPPED_PARTIAL`) because `build_press_engine_feed.py:99-101` (ratified partial-run rejection) would refuse the incomplete generation; the gate itself was NOT touched; `run_pipeline.py:52` already skips refused runs and uses the last complete press generation. (2) discovery dies when Playwright cannot launch Chrome (`launchPersistentContext` 180 s timeout, not the Cloudflare cooldown, so the GovInfo fallback never fires) - wrapper now retries discovery once after 300 s, then DEFERS it (`deferred_steps`) and continues. (3) calibration budget 120 s was too tight under disk load (71-107 s measured) - now 900 s.
- Plus: `--smoke` (skip discovery, admissions `--limit 1 --no-llm --no-install`, media crec/chrg/bluesky only, full `run_pipeline.py` because it cannot be shortened), `--no-llm` in admissions (carry forward old decisions with OLD fingerprint; never seal a hold), glassbox `current`/`total` + heartbeats + `data/engine/congress_pipeline_live.log`, before-snapshot hashes the two 98 MB HTML files (11 min -> 0.4 s), watcher `fec/legislation/watch_congress_pipeline.ps1` + `open_congress_pipeline_monitor.ps1`, exit-75 reasons, 4 pytest suites registered in `_LANE_PYTEST` (160 tests). The auto-mode classifier BLOCKED `taskkill` + `Disable-ScheduledTask`; a scheduler-launched run then took the lock the same second as the first smoke launch - launch races with the :39 retry are real. Smoke run PID 81500 (17:00 local): every collection step PASS with zero model calls; `run_pipeline.py` died at step 17 because the Codex session's UNCOMMITTED `fec/stance/extract_cu_bluesky.py` change (handle-registry UNVERIFIED gate) drops four House members' posts and 5 of Paul's bluesky gold rows no longer bind - first executed by the smoke; nothing of his touched; fix = Paul confirms the handles or reverts that change (he later ruled "Revert", see the smoke table). Also found+fixed: writers lost `os.replace` races with readers (`WinError 5/32/33`) - `fec/lane_file_io.replace_atomic()` 40-attempt jittered retry now used by all daily writers; watcher reads with FileShare Delete. No `PIPELINE COMPLETE` line exists on disk after 2026-07-28 (chain unproven for 7 weeks by any launcher). Scheduler ran on its own 17:39/18:39/19:39 with discovery DEFERRED working in production.
- OPEN for Paul (2026-09-13): admissions `transport claude-cli` (24 `claude.exe` calls per pass on his Claude subscription), press backlog budget/fold, committing the untracked subsystem (done later by the 2026-09-19 reconcile), retry task `ExecutionTimeLimit PT0S`.

## Reference data

- Evidence packets (session scratchpad, not in the repo): `scratchpad\weekly_refresh\forensics\` (`runs.txt` = 42-run ledger, live task XML exports, `power_state.txt`) and `scratchpad\weekly_refresh\code_audit\`; sandbox harnesses `scratchpad\weekly_refresh\sandbox\` and `sandbox3\`; `scratchpad\press_format\EVIDENCE.txt`; `scratchpad\crash_forensics\`; `scratchpad\tick_runner\CONTRACT.md`.
- A stale reassuring-looking status marker is the norm here; read `weekly_refresh.log` tail + `Get-ScheduledTaskInfo` instead.
- Why this matters (audit): Paul wants the refresh self-sufficient; the launcher bound alone does not get it to COMPLETE.
