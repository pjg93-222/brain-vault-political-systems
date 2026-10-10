---
type: fleeting
title: "Model tiering code read reason"
aliases: ["model-tiering-code-read-reason"]
source: "session"
captured_at: 2026-10-09
created_at: 2026-10-09
status: "raw"
promoted_to: ""
project: "scratch-2026-10-09-e85ae3"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-09-e85ae3/memory/model-tiering-code-read-reason.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-09-e85ae3\\memory\\model-tiering-code-read-reason.md", sha256: "146a3b0165655bf43cbe3a3acf2bac082d61eedf5a00f5fc0524cb6223cbc999"}
updated_at: 2026-10-09
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Model tiering code read reason

> User's model routing rule for subagents - code in Sonnet, read/extract in Haiku, reasoning in Opus (all "fast")

## Content

Route subagent work by kind: coding/implementation in Sonnet 5.5, reading/extraction/discovery in Haiku 5.5, reasoning/diagnosis/review in Opus 5.5. User asked for the "fast" variants of each.

**Why:** User stated it explicitly on 2026-10-09 during the Terrier walk-list work, to cut cost and latency.

**How to apply:** Pass `model: "sonnet"` for executor-style coding agents, `model: "haiku"` for scout/extract agents, `model: "opus"` for diagnosis/design/review. Fast mode is a session toggle (/fast) and can't be set per subagent; say so if it matters.

## Possible Connections

- [[2026-07-working-agreement-agent-orchestration-rules]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `model-tiering-code-read-reason.md` of project `scratch-2026-10-09-e85ae3` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
