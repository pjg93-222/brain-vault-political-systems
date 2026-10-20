---
type: fleeting
title: "Wave1 refresh resilience (2026-10-20)"
aliases: ["wave1-refresh-resilience-2026-10-20"]
source: "session"
captured_at: 2026-10-20
created_at: 2026-10-20
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/wave1-refresh-resilience-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\wave1-refresh-resilience-2026-10-20.md", sha256: "f421f7081cbd9d284dfeed689e4577c4172f35a51580d77e8f9e5a04bfabf509"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Wave1 refresh resilience (2026-10-20)

> 2026-10-19/20 wave-1 lane — DE-043 media-before-repository, weekly repository rollback, per-step weekly logs; landed a4a484595, PR #16 stacked on #15; overlapped the pipeline-health lane

## Content

Wave 1 started from Paul's 2026-10-19 "remaining bugs/blockers" request and ran with a per-role roster (triage, deep debugger, fixer, reviewer, verifier, PR shepherd). Bright Data was excluded because it bypasses bot checks.

Landed on live Melange main as a fast-forward to a4a484595, and published as PR pjg93-222/Melange#16, stacked on #15 (ReleasePublish receipt AB, addendum 23):
- **Fix A (DE-043):** the congress pipeline now runs media before the repository and billstatus steps.
- **Fix B:** the weekly takes a before-image and calls rollback from `_hard_abort`.
- **Per-step logs:** `run_bounded(log_path)` writes per-step weekly logs.
- **Watcher:** shows INTERRUPTED when the owner process is dead.

Follow-ups landed on live main 4f381c570:
- writer-lease guard on the weekly rollback (a CodeRabbit finding)
- `restore_failed` label
- admissions mixed-outage guard; the threshold is Claude's implementation choice per D-251

PR #16 merged on GitHub as c2786637d. Round 3 is PR #17 (head bdbe8fa3e, addendum 27/AF), with a clean CodeRabbit review. PR #17 merged as fc74822df. Public main now matches live main for this work. Lane CLOSED.

**Why:** at the same time, a parallel session (pipeline-health, PR #15, D-251/D-252) fixed admissions, MS NOW, the rollback labels and the Stage5 pin. I dropped my duplicate branches (`claude/wave1-admissions-timeout`, `claude/wave1-msnow-incremental`). Lesson: before starting a fix lane, check `list_sessions` for running sessions on the same area.

**How to apply:**
- For anything in the refresh area, check the running sessions first: pipeline-integration (#15), membership-heal, admissions-followups, collector-followups and fec-sweep (#14).
- The ReleasePublish clone is shared by several sessions. Use a temporary index only, take the next free addendum number, and announce "done" to the other sessions.
- Paul's open decisions are listed in `audits/wave1_20261019/PAUL_DECISIONS.md`: refresh tasks die on sign-out or reboot, the stale Netlify desk, and the one-run behavioral lag.

Related: `pipeline-health-lane-2026-10-19`, `melange-public-repo-unfiltered-branches-2026-10-18`, `no-permission-prompts-pr-first-2026-10-19`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `wave1-refresh-resilience-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
