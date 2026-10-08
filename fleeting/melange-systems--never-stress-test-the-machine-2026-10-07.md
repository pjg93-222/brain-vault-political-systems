---
type: fleeting
title: "Never stress test the machine (2026-10-07)"
aliases: ["never-stress-test-the-machine-2026-10-07"]
source: "session"
captured_at: 2026-10-07
created_at: 2026-10-07
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/never-stress-test-the-machine-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\never-stress-test-the-machine-2026-10-07.md", sha256: "606ca425d6bfae731a657f2925646be27844dff01a0c67e8a6640b76b2e40bfb"}
updated_at: 2026-10-07
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Never stress test the machine (2026-10-07)

> Paul forbids CPU/launch stress tests or load experiments on his laptop; diagnose crashes from logs only

## Content

Never run stress tests, load tests, launch-loop crash reproductions or any deliberate CPU/RAM load on Paul's machine. Paul, 2026-10-07: "Do not fucking stress test, that was just my computer dying." This came after a session ran `stress.py` (hundreds of back-to-back python launches) to reproduce the 0xC000070A crash while builds were running.

**Why:** the laptop is already memory- and CPU-starved (often <4 GB free; see `python312-wmi-crash-0xc000070a-2026-10-07`, `lg-gram-npu-crash-2026-08-17`). Extra load makes it die and stalls real work.
**How to apply:** diagnose crashes from existing logs, crash records (tools\Get-PythonCrashStats.ps1, Event Log) and code reading only. When a job crashes, rerun it once; never loop launches to measure crash rates. Don't tell agents to run N-launch crash tests either.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-07 from the Claude Code memory file `never-stress-test-the-machine-2026-10-07.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
