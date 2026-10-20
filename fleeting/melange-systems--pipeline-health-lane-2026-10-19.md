---
type: fleeting
title: "Pipeline health lane (2026-10-19)"
aliases: ["pipeline-health-lane-2026-10-19"]
source: "session"
captured_at: 2026-10-19
created_at: 2026-10-19
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pipeline-health-lane-2026-10-19.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pipeline-health-lane-2026-10-19.md", sha256: "493f770cd4bcf9fae836cec000c66a717eaedf050641e974bc165148ad5ee8f8"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Pipeline health lane (2026-10-19)

> 2026-10-19 pipeline-health lane — 6 root-cause fixes on fix/pipeline-health-20261019, PR #15, D-251/D-252; landing on live main waits for the daily run to exit

## Content

On 2026-10-19 Paul asked for a check of Melange pipeline integration (build-up, dead or erroring processes, any failure), with a PR for every change, then left it to run unattended ("proceed, without my oversight").

Findings: no congress pipeline run had fully passed since 10-12, and the weekly refresh hit HARD_FAILURE five Sundays in a row. Root causes and fixes:
1. The Stage 5 weights in `Draft Systems\debate_finetuned` were OneDrive online-only, which caused Errno 22 at press_stage5.py:132. Fix: folder pinned (D-252) and a Stage5Refused guard.
2. The 10-16 run died without its handler, leaving the membership file permanently out of step with the repository. Rollback then crashed while reporting "verified". Fix: rollback now records unhealable_drift.
3. An admissions classifier timeout on a new key failed the whole pipeline. Fix: such keys are deferred (D-251, R1), with a guard that fails the run on a systemic outage (≥2 deferred and no call succeeded).
4. MS NOW re-walked a 215-page archive every run and hit the 3600 s timeout. Fix: walk newest-first, stop early (receipt COMPLETE plus known_ok_posts), 3000 s budget.
5. The Washington Journal R error was being swallowed. Fix: it is now surfaced. The cause is unconfirmed; a manual run passed.
6. Collector sentinels and lock files are now gitignored, and the sentinels untracked.

Status: Melange branch fix/pipeline-health-20261019 (worktree C:\Users\pgoff\Melange-wt\pipeline-health-20261019), 8 commits on main 11db3ad91. PR pjg93-222/Melange#15 is open via the ReleasePublish filtered export (head 94de8609a); every CodeRabbit thread was replied to and resolved. Brain: D-251, D-252 and a STATE block (5b7fd86).

**UPDATE 2026-10-20: landed.**
- Live main was fast-forwarded to a787d3cc0: 16 commits, including the follow-up sessions' work, rebased onto 57165fc85.
- PR #15's publish head is 115870056. All CodeRabbit threads are resolved.
- A machine crash at 22:32 on 10-19 killed the daily run during media.
- The membership sidecar was healed by running roster-verify only, and it now binds 08870bad64f5.
- The kernel suite aborts at flip_model because the competitiveness artifact is stale: cook_pvi was rewritten on 10-17, after the 10-13 build. The next chain step build_competitiveness (run_pipeline.py:88) fixes it.
- Disk is at 85.5 GB free, after a legfix5 sparse-exclude on 4 idle trees.
- The wave-1 session is stacking a PR on #15.

**Why:** the next weekly (2026-10-25) and daily runs are the real proof.

**How to apply:**
- Land on live main only after daily_refresh (pid 28628, started 16:56) exits. Use ff-only.
- The merge untracks collector_sentinels/*.done. In the live tree 6 of them are dirty (merge refuses) and msnow.done would be deleted. Copy them aside first, then `git checkout --` them, merge, and restore the copies.
- PR #14 (fec sweep) and PR #15 conflict only on the metadata files (FILTER_REPORT.txt, README_RELEASE.md, SOURCE_PROVENANCE.json).
- Open follow-ups for Paul:
  - a hold after repeated timeouts on the same key;
  - is_error non-quota envelope;
  - MS NOW resume cursor and key-set digest;
  - WJ tryCatch retry;
  - membership heal;
  - disk: C: about 16 GB free, after two worktrees C:\Users\pgoff\wt\melange-wave1 and melange-wave1-adm wrote about 31 GB of legfix5 copies.

Related: `melange-public-repo-unfiltered-branches-2026-10-18`, `fec-folder-debug-sweep-2026-10-13`, `land-means-in-the-app-2026-10-15`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `pipeline-health-lane-2026-10-19.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
