---
type: topic
title: "Refresh automation reliability"
aliases: ["Refresh automation reliability"]
category: "incident"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "codex-executor"
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
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/infra", "category/incident"]
---

# Refresh automation reliability

> The weekly refresh (`fec/weekly_refresh.py`, Windows task `MoneyballWeeklyRefresh`) has NOT completed since 2026-07-19 06:53; the weekly email has never been sent; the daily congress chain is blocked at step 3; the Codex poll-loop incident of 2026-09-12/13 burned a whole weekly quota. Current state is the 2026-09-19 weekly-refresh self-sufficiency audit (newest source) plus its 2026-09-20 addenda.

## Parts

- [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]] — The weekly Melange refresh as of 2026-09-19: measured state, sandbox run, the abandoned orchestrator, the tick-runner ruling and build, the corrected press facts and the inactive weekly email.
- [[2026-08-incident-refresh-automation-reliability-daily-refresh-closeout-and-flakes]] — The daily congress refresh close-out of 2026-09-19 and the daily-refresh test-suite flake lane closed on 2026-09-20.
- [[2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn]] — The Codex overnight poll-loop burn of 2026-09-12/13 as recorded in the refresh incident: the 30 s poll loop, the quota loss and the repair lane.

## Context

- Scope: the unattended refresh automation of [[melange-systems]], implemented by the actor [[melange-refresh-scheduler]] (weekly refresh, daily congress chain, `refresh_email.py`). Owner and decision maker: Paul Goff.
- Newest-wins note: the 2026-09-19 audit (file `weekly-refresh-self-sufficiency-audit-2026-09-19`, last modified 2026-09-20) is the current state and corrects, in place, several earlier press claims made earlier the same day in that same audit; the older claims are kept below and in [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]] as dated struck-through bullets.
- Never tell Paul the refresh "runs weekly": check the last `WEEKLY REFRESH COMPLETE` line in `data\engine\weekly_refresh.log` first. 6 `WEEKLY REFRESH COMPLETE` lines exist; the last is 2026-07-19 06:53.
- The refresh-email recipient is a personal iCloud address: `[personal email omitted]`.
- Related lanes (not vault entities): `laundry-list-closeout-2026-09-18`, `sentinel-collectors-lane-2026-09-01`, `lg-gram-npu-crash-2026-08-17` (machine crashes; documented in the LG Gram workstation actor, `lg-gram-workstation`), `glassbox-everything-rule-2026-07-27` (every action emits Glass Box events; see [[glass-box]]), `verify-dont-infer-completion-2026-08-04`, `codex-executor-lane-2026-07-18`, `ultracode-orchestration-standing-2026-08-18`, `melange-ui-retheme-2026-08-06`, `moneyball-audit-run-guardrails`, `ask-before-substantive-changes`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| Codex executor lane | Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17 |
| [[glass-box]] | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| [[melange-refresh-scheduler]] | Unattended Melange refresh jobs: weekly refresh, congress daily chain, report email; weekly not COMPLETE since 2026-07-19 |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[fail-closed-gates]] — the refresh gates are deliberate fail-closed rulings: never weaken the audit or weekly_refresh.py's hard=True to make Sundays green; loosening is Paul's call

## Related Topics

- Agent orchestration and model tiering rules - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.

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
| 2026-08-09, 2026-08-16, 2026-08-30 | Three Sunday fires left no trace at all with the machine awake (see audit item 5 in [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]]). |
| 2026-08-28 | `ABC done: 0 member turns` killed the week 11 consecutive times (agent finding). |
| 2026-08-30 to 2026-09-01 | 4 press failures "without a valid live-network receipt" (timestamp-format mismatch); fixed both sides 2026-09-01 (`646fd2b62`, `7e1cb0e66`). |
| 2026-09-01 | Press baseline folded once (+7,454 rows, 257,223 after; `data/engine/press_baseline_fold_receipt.json`). `MoneyballCollectorSupervisor` DISABLED since this date. |
| 2026-09-06 | Weekly run died silently inside the press walk (standby-for-shutdown 14:30, crash 00:04). |
| 2026-09-08 | `weekly_refresh_status.json` last written, BY HAND (`INTERRUPTED_PREVIOUS_RUN`). |
| 2026-09-12 23:29 to 2026-09-13 10:58 | Codex Desktop thread `01a098ce-d021-7d42-9383-5affc2a0bdfb` burns the weekly Codex quota in a 30 s poll loop (see section in [[2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn]]). |
| 2026-09-13 | Last weekly log line `[2026-09-13 06:00:02] WEEKLY REFRESH BLOCKED - Moneyball pipeline is already running (pid 31516, owner congress_pipeline)`: exit 75 in 2 s, zero steps, no retry. Daily-refresh repair lane (Fable session, live tree): see section in [[2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn]]. Press run `press_refresh_20260913` is `PARTIAL`, `pending_body_urls=2200`. |
| 2026-09-19 | Weekly-refresh self-sufficiency audit; launcher bounding landed (`62aea2f76`); B1 blocker fixed on LIVE main (`61be75ddc`, 18:22 local); orchestrator WIP `352a5e495` built, reviewed by council, sandbox-tested, then ABANDONED for the tick runner (ruled ~19:30); tick runner built and reviewed ~23:30 on branch `claude/refresh-tick-20260919`; daily-refresh lane closeout (full chain blocked at step 3). |
| 2026-09-20 | Daily-refresh clock flake CLOSED: landed on LIVE main `203a69812` (D-063, DE-046). Planned: tomorrow's (2026-09-20) 06:00 weekly run uses the OLD orchestrator + bounded launcher + the B1 fix. |

## Decisions

- Resume rule (Paul 2026-09-19): resume plus retry, but a checkpoint/fail-safe for one worker must not apply to all and stop the whole process (see Paul's rulings in [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]]).
- Lease collision: the weekly must poll continuously and verify/retry (2026-09-19).
- Publish password: the publish step must become skip-when-not-configured, never a failure (2026-09-19, "Don't need to do that that").
- Crash/infrastructure: checkpoints are necessary because the laptop crashes (2026-09-19).
- Press (second batch of rulings 2026-09-19): write-back ON, unfetchable bodies filed and retried then stop blocking, known member site with zero rows goes to a REVIEW LIST flagged for Paul.
- AI independence: AI steps must DEGRADE (file, continue on cached classifications, flag), never block. The policy file was NOT flipped.
- 2026-09-19 ~19:30 TICK RUNNER ruled ("Yeah go forward"): supersedes the 49-step resume-orchestrator target.
- ~~Resume-orchestrator WIP `352a5e495` as the landing target~~ (2026-09-19 early evening) - superseded ~19:30 the same evening by the tick runner; WIP stays on branch `claude/vibrant-sammet-a549a5` for reference only; do NOT land it.
- ~~Old press claim: baseline frozen since 2026-06-24, 2,200 unfetchable bodies, 36 h walk as runtime~~ (2026-09-19 earlier text) - corrected ~20:20 the same evening (see Press facts corrected in [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]]).
- Never weaken the audit or `weekly_refresh.py`'s `hard=True` to make Sundays green (rule recorded 2026-08-09; the 09-19 audit repeats that the gates are DELIBERATE fail-closed rulings and loosening is Paul's call).
- Never run or import `fec/weekly_refresh.py` to test it: it executes the whole refresh at module level; test `step()` by lifting its source with `ast` into a sandbox.
- Never supervise long jobs from an AI turn: launch detached, then ONE background `until` loop or one Monitor on the status file (Codex burn lesson).
- Do not create Codex heartbeat automations as a scheduler; flag, do not flip, paused ones.
- Email credentials: creating the local SMTP credential file is PAUL'S action (password entry). TABLED 2026-08-09: do not nag or re-raise unprompted.

## Next Steps

- [ ] Paul: confirm the press fold ruling at landing (rank-affecting via tone-supplement composition) - commit `a66b39850` is droppable.
- [ ] Paul: decide FAIL-CLOSED vs LABEL-CLOSED publication (council disagreement, in [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]]).
- [ ] Paul: teach/accept status for the supervisor: `collector_supervisor.py:472-486` must learn `refresh_tick_status.json` before `MoneyballCollectorSupervisor` is re-enabled (GATE-2 is Paul-gated; never fake its inputs).
- [ ] Paul: run `wevtutil sl Microsoft-Windows-TaskScheduler/Operational /e:true` (elevated) to enable the TaskScheduler Operational log (system setting).
- [ ] Paul: provide a mail credential if email is wanted (key store has none): create the local SMTP credential file.
- [ ] Owner-only: switch task principal to "run whether logged on or not" + start-on-boot trigger (prove first with a logged-out smoke task); flip `MoneyballWeeklyRefresh` to launch `fec\refresh_tick.py` when Paul decides.
- [ ] Ratify or fix the six un-ratified audit reds (publication blocked until then).
- [ ] Design the Excel dependency (pillar snapshot vintage); not started as of 2026-09-19.
- [ ] Register the logon-triggered `--resume-only` task (only if the orchestrator route is kept; the tick runner replaces it) and a scheduled status check as the alert channel.
- [ ] Daily job launcher (`refresh_congress_pipeline.py:262/265`) bounding: not in scope yet.
- [ ] Paul to delete the ~93 GB of build exports in scratchpad `tick_runner\build\` (2 tars + 3 exports); C: free fell to 24 GB.
- [ ] Paul: wrapper defects W1-W3 of the daily lane (in [[2026-08-incident-refresh-automation-reliability-daily-refresh-closeout-and-flakes]]) await his apply gate.
- [ ] Verify before the weekly Excel/live-pillar parity run: cell types of Blended cols 5/6/15 and that the live pillar is not shadow-only, then a zero-rank-delta parity run.
- [ ] After the fixed `--since 14d/21d` collector window question is checked (unverified): does a long outage leave a permanent gap unless the daily job covered it? Off-box collection = Paul's call.

## Reference data

- Evidence packets (session scratchpad, not in the repo): `scratchpad\weekly_refresh\forensics\` (`runs.txt` = 42-run ledger, live task XML exports, `power_state.txt`) and `scratchpad\weekly_refresh\code_audit\`; sandbox harnesses `scratchpad\weekly_refresh\sandbox\` and `sandbox3\`; `scratchpad\press_format\EVIDENCE.txt`; `scratchpad\crash_forensics\`; `scratchpad\tick_runner\CONTRACT.md`.
- A stale reassuring-looking status marker is the norm here; read `weekly_refresh.log` tail + `Get-ScheduledTaskInfo` instead.
- Why this matters (audit): Paul wants the refresh self-sufficient; the launcher bound alone does not get it to COMPLETE.
