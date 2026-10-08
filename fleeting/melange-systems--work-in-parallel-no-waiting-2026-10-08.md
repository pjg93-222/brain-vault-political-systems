---
type: fleeting
title: "Work in parallel no waiting (2026-10-08)"
aliases: ["work-in-parallel-no-waiting-2026-10-08"]
source: "session"
captured_at: 2026-10-08
created_at: 2026-10-08
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/work-in-parallel-no-waiting-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-08", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\work-in-parallel-no-waiting-2026-10-08.md", sha256: "27b0a55f7dc90de655561300c07c442fa513773357f6784e0cd5598e280b7451"}
updated_at: 2026-10-08
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Work in parallel no waiting (2026-10-08)

> Paul wants lanes and data runs to proceed in parallel; never gate merges on a running job or on other lanes

## Content

Paul, 2026-10-08 (Terrier build): "Nothing should be waiting on each other, keep going and work in parallel." He asked after seeing finished lanes sit idle behind a long data runner (a "don't merge while run_*.ps1 is alive" rule) and a slow, RAM-starved draws step.

**Why:** waiting chains turned minutes of work into hours; Paul measures progress by things landing.
**How to apply:** let code lanes merge as soon as their own gates pass (rebase on whatever landed); make later steps tolerate missing pieces (fail soft, rerun later) instead of blocking; a data runner picks up merged code at its next step or is simply rerun. Still keep one heavy data process at a time on the laptop (`never-stress-test-the-machine-2026-10-07`): only CPU/RAM-heavy steps take turns; merges, tests and planning never wait. Related: `terrier-multidistrict-lane-2026-10-06`, `go-faster-directive-2026-09-16`.

## Possible Connections

- [[2026-07-working-agreement-agent-orchestration-rules]] — keyword match from recall, unverified
- [[staffer-live-sidecar]] — keyword match from recall, unverified
- [[terrier]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-08 from the Claude Code memory file `work-in-parallel-no-waiting-2026-10-08.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
