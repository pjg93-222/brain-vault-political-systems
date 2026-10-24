---
type: fleeting
title: "Glassbox everything rule (2026-07-27)"
aliases: ["glassbox-everything-rule-2026-07-27"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[glass-box]]"
  - "[[2026-07-working-agreement-agent-orchestration-rules]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/glassbox-everything-rule-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\glassbox-everything-rule-2026-07-27.md", sha256: "100aad9df776eee1e5b06bd261a83a19211c64738188f331c4fe5e84efaa68c4"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Glassbox everything rule (2026-07-27)

> Paul's standing rule 2026-07-27 — every process must emit to the shared GLASS BOX event stream; nothing runs invisibly

## Content

Paul's STANDING RULE, given 2026-07-27: **everything runs through the Glass Box.**
Any process — collector, restore, audit, pipeline stage, background watcher —
must emit progress to the shared stream at `C:\Users\pgoff\.claude\glassbox\events`.
A job that runs without emitting there is not acceptable, even if it works.

**Why:** he cannot supervise what he cannot see. Two separate failures on
2026-07-27 came from invisible work — the R full-text collector wrote events only
to `<out_dir>/events` (so the viewer, which polls the shared directory, showed
nothing despite the lane being correctly tagged `lane: codex`), and a OneDrive
content restore ran for two hours with no emitter at all, which led me to
misdiagnose an in-progress sync as permanent data loss.

**How to apply:**
- The viewer (`fec/open_glassbox_process_matrix.ps1`) polls ONE directory and
  creates a row per lane/source/run automatically. Emitting to the shared stream
  is the whole integration — no registration step.
- Event shape: `{schema_version, timestamp_utc, lane, source, run_id, kind,
  status, stage, summary, detail, current, total}`. Lane is one of
  claude/codex/grok/gemini.
- Filenames must be unique per PROCESS (timestamp + PID), not per config —
  see `legfix5-recollection-lane-2026-07-27` for the collision this caused.
- Array params must be passed via `-Command`, never `-File`; `-File` silently
  fails to bind them and the window exits.
- Always verify what a viewer instance is actually reading:
  `Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'open_glassbox_process_matrix' }`
- Related: `desk-media-footprint-2026-07-16`, `codex-executor-lane-2026-07-18`

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): every process emits,else NOT OK

## Possible Connections

- [[glass-box]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-07-working-agreement-agent-orchestration-rules]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `glassbox-everything-rule-2026-07-27.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[glass-box]], [[2026-07-working-agreement-agent-orchestration-rules]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
