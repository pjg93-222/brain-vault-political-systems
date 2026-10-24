---
type: fleeting
title: "Sendmessage workflow agent duplicates (2026-09-24)"
aliases: ["sendmessage-workflow-agent-duplicates-2026-09-24"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[claude-code-harness]]"
  - "[[2026-07-working-agreement-agent-orchestration-rules]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sendmessage-workflow-agent-duplicates-2026-09-24.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sendmessage-workflow-agent-duplicates-2026-09-24.md", sha256: "8e0e568e21bbcd9099df94b87c7373ea0dec91422af3738a9c5de6999be948dd"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Sendmessage workflow agent duplicates (2026-09-24)

> SendMessage to a running Workflow subagent does NOT reach it; it resumes a DUPLICATE copy from the transcript that runs concurrently and writes the same files

## Content

On 2026-09-24 (session 5ab381bb, r5 fix run), I sent SendMessage to two workflow subagents (fix2-men, fix2-mel) by their agent id. Both times the tool said "Resuming agent ...". It started a second copy from the transcript while the workflow's original kept running. The two fix2-mel copies then overwrote each other's apply scripts and logs in the same lane folder, and one LIVE apply was refused. The workflow never saw the wrap-up order, because its own agent ran on unchanged.

**Why:** workflow agents are not addressable mailboxes. A send to a live workflow agent id spawns a parallel resume, which doubles the writers on the same files. Paul's LIVE tree nearly got two concurrent applies.

**How to apply:** never SendMessage a workflow subagent that is still running. To change a running workflow's course, either stop it (TaskStop), then relaunch or finish with a fresh Agent that carries the new instruction, or wait for it to finish. Put coordination facts (for example a peer session's file list) into the NEXT agent's prompt, not into a message. SendMessage is fine for Agent-tool background agents and for other sessions. Related: `go-faster-directive-2026-09-16`, `ui-finalize-after-reboot-2026-09-23`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): stop+relaunch instead

## Possible Connections

- [[claude-code-harness]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-07-working-agreement-agent-orchestration-rules]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `sendmessage-workflow-agent-duplicates-2026-09-24.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[claude-code-harness]], [[2026-07-working-agreement-agent-orchestration-rules]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
