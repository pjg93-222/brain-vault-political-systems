---
type: actor
name: "Overnight poll-loop burn and the legislative shadow-lane failure (Codex executor lane)"
aliases: ["Codex executor lane: Overnight poll-loop burn and the legislative shadow-lane failure"]
category: "tool"
description: "Two Codex incidents: the overnight poll-loop burn of 2026-09-12/13 that drained the weekly quota, and the legislative-effectiveness shadow lane Codex built and then lost on 2026-09-10/11."
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
tags: ["type/actor", "status/active", "domain/platform"]
part_of: "[[codex-executor]]"
---

# Overnight poll-loop burn and the legislative shadow-lane failure (Codex executor lane)

> Two Codex incidents: the overnight poll-loop burn of 2026-09-12/13 that drained the weekly quota, and the legislative-effectiveness shadow lane Codex built and then lost on 2026-09-10/11. Part of [[codex-executor]] (project [[melange-systems]]).

## Incident: Codex overnight poll-loop burn (2026-09-12 23:29 to 2026-09-13 10:58 local)

Codex Desktop thread `01a098ce-d021-7d42-9383-5affc2a0bdfb` burned the ENTIRE weekly Codex quota (674M tokens) by babysitting a Windows Python job in a 30 s poll loop for 11 h; Paul's goal was a Python process INDEPENDENT of AI.
- Paul asked for an end-to-end recurring congress.gov bills -> sponsors -> media -> Excel -> dashboard refresh that "triggers every time I open my laptop", and said explicitly: "No not an AI process, something in my windows, like a Python process." Codex built the right artifact (`fec/legislation/refresh_congress_pipeline.py` + `fec/daily_refresh.py` + two Windows scheduled tasks `MoneyballCongressRefresh` / `MoneyballDailyRefreshRetry`), then stayed in the loop itself: 542 empty `write_stdin({chars:"", yield_time_ms:30000})` polls on its own background shell (03:36Z -> 14:57Z), 280 `wait_agent` blocks, 4 spawned agents each doing the same, and 27 `approvals_reviewer: auto_review` guardian threads that made zero tool calls yet consumed ~59M tokens re-reading context.
- Session family total: 673,856,790 tokens across 32 rollout files; ended with `usage_limit_exceeded`, next window 2026-09-19 23:50. Quota was already at 89% when the thread started. Nothing external re-invoked Codex: no scheduler, no wrapper, no `codex exec` loop; the Python code never calls OpenAI/Codex.
- **Why it matters:** the job was correct and Windows-owned; the waste was 100% supervision. Paul's verdict: "that is unacceptable." Related: the brain's DE-018 (see in [[codex-executor]]).
- "Independent of AI" is not fully true of the chain yet: step 3 `fec/legislation/refresh_sentinel_admissions.py:288-290` calls `api.anthropic.com` with `fec/anthropic_key.txt` (fingerprint-cached; pre-existing sentinel-lane code). That is Paul's call to keep or remove, never Claude's. Related memories: `verify-dont-infer-completion-2026-08-04`, `glassbox-everything-rule-2026-07-27`, `ultracode-orchestration-standing-2026-08-18`.
- **Repair lane 2026-09-13 afternoon (Fable session, live tree, UNCOMMITTED, the whole subsystem UNTRACKED in git):** the real reason the Windows job never finished was three collectors treated as fatal: (1) the press collector exits 3 BY DESIGN when body backlog remains (`refresh_press_delta.R:843`; 2,200 pending, `JS_MEMBER_BUDGET 600` in Draft Systems R, fold OFF) - now PARTIAL, not FAIL, and the press_intake/press_feed/press_baseline_fold steps plus `all_intake` are PARKED (`SKIPPED_PARTIAL`) because `build_press_engine_feed.py:99-101` (ratified partial-run rejection) would refuse the incomplete generation; the gate itself was NOT touched; `run_pipeline.py:52` already skips refused runs and uses the last complete press generation. (2) discovery dies when Playwright cannot launch Chrome (`launchPersistentContext` 180 s timeout, not the Cloudflare cooldown, so the GovInfo fallback never fires) - the wrapper now retries discovery once after 300 s, then DEFERS it (`deferred_steps`) and continues. (3) calibration budget 120 s was too tight under disk load (71-107 s measured) - now 900 s.
- Plus `--smoke` (skip discovery, admissions `--limit 1 --no-llm --no-install`, media crec/chrg/bluesky only, full `run_pipeline.py` because it cannot be shortened), `--no-llm` in admissions (carry forward old decisions with OLD fingerprint; never seal a hold), glassbox `current`/`total` + heartbeats + `data/engine/congress_pipeline_live.log`, before-snapshot hashes the two 98 MB HTML files (11 min -> 0.4 s), watcher `fec/legislation/watch_congress_pipeline.ps1` + `open_congress_pipeline_monitor.ps1`, exit-75 reasons, 4 pytest suites registered in `_LANE_PYTEST` (160 tests).
- The auto-mode classifier BLOCKED `taskkill` + `Disable-ScheduledTask`; a scheduler-launched run then took the lock the same second as the first smoke launch - launch races with the :39 retry are real. Smoke run PID 81500 (17:00 local): every collection step PASS with zero model calls; `run_pipeline.py` died at step 17 because the Codex session's UNCOMMITTED `fec/stance/extract_cu_bluesky.py` change (handle-registry UNVERIFIED gate) drops four House members' posts and 5 of Paul's bluesky gold rows no longer bind - first executed by the smoke; nothing of his touched; fix = Paul confirms the handles or reverts that change.
- Also found + fixed: writers lost `os.replace` races with readers (`WinError 5/32/33`) - `fec/lane_file_io.replace_atomic()` 40-attempt jittered retry now used by all daily writers; the watcher reads with FileShare Delete. No `PIPELINE COMPLETE` line exists on disk after 2026-07-28 (chain unproven for 7 weeks by any launcher). The scheduler ran on its own 17:39/18:39/19:39 with discovery DEFERRED working in production.
- OPEN for Paul: admissions `transport claude-cli` (24 `claude.exe` calls per pass on his Claude subscription), press backlog budget/fold, committing the untracked subsystem, retry task `ExecutionTimeLimit PT0S`.

## Legislative-effectiveness shadow lane: how Codex built it and died (2026-09-10/11)

Paul commissioned (Codex Desktop, 2026-09-10 23:03 ET) a Bucchianeri/Volden/Wiseman-style five-stage legislative effectiveness score. Codex built it in worktree `C:\Users\pgoff\.codex\worktrees\f149\Melange Systems` (detached HEAD `d68ddcda6` on top of `2f11d9490`): 11 tracked files modified (+193/-18) and 37 untracked files (9 modules, 6 unittest suites = 77 tests); its sandbox had no pytest (unittest: 68 tests OK at the time). Coordinator thread + 3 sub-agents hit `usage_limit_exceeded` at 04:07Z 2026-09-11 ("try again at Sep 17th, 2026 1:16 PM"); the `integrations` sub-agent produced nothing and the coordinator wrote the integrations itself; the final `--verify-reproducible` re-run COMPLETED on disk at 04:09Z after the error but no turn ever read it, so the validation report and the "show me the diff" step were never produced. Claude then verified read-only (46/50 outputs byte-identical on an independent re-run; `verify_effectiveness_shadow.py` PASS; inputs 20/20 and code 14/14 unchanged), and after the 2026-09-11 ~23:16 ET apply the live six suites passed 77/77. The unfinished code edits (activation, `run_tests.py` `_LANE_MODULES` registration, re-pin of `run_legislation_pillars_and_ranks.py` source literals) queue for Codex after 2026-09-17; the validated contract + ledger dispatch is run-id `legeff-runtests-20260911`, trigger `legeff-register-suites-dispatch`, evidence in f149 `audits/legislative_effectiveness_shadow_20260911/evidence/{contract.json,prompt.txt}`. Full lane in Legislative pillar and ACU review.

## Related Topics

- [[2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn]] — The Codex overnight poll-loop burn of 2026-09-12/13 as recorded in the refresh incident: the 30 s poll loop, the quota loss and the repair lane.
- [[2026-07-feature-legislative-pillar-acu-review-effectiveness-shadow-lane]] — The legislative-effectiveness shadow lane of 2026-09-10 to 09-12: a Volden-Wiseman five-stage score that Codex built, Claude verified read-only and Paul applied.
