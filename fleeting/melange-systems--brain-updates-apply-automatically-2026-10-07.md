---
type: fleeting
title: "Brain updates apply automatically (2026-10-07)"
aliases: ["brain-updates-apply-automatically-2026-10-07"]
source: "session"
captured_at: 2026-10-06
created_at: 2026-10-06
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brain-updates-apply-automatically-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brain-updates-apply-automatically-2026-10-07.md", sha256: "c94de519ef9ef853a07b4fc3cdcab9900a87a95930f9650adec41619f4b437a7"}
updated_at: 2026-10-06
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Brain updates apply automatically (2026-10-07)

> Paul 2026-10-07 - brain (melange-systems-brain) updates are always applied by Claude via brainctl and committed; never leave them as drafts for Paul

## Content

Paul, 2026-10-07, asked whether to apply a drafted brain correction (D-105): "It always should apply automatically."

Overrides the project CLAUDE.md line "draft brain updates for Paul to apply and commit". Apply brain updates directly: `brainctl decide ... --supersedes` for decisions (it commits), `brainctl deadend` for dead ends, STATE.md edits then `brainctl flush -m`. Still draft the text in an audit file first for provenance.

**Why:** Paul doesn't want brain drafts piling up waiting on him; drafts left unapplied go stale and the brain then contradicts reality.
**How to apply:** Only the brain bookkeeping is automatic. Owner RULINGS still come from Paul — never record an agent default as a Paul ruling (the D-104 to D-105 correction was exactly that error). Code, data, and model changes still follow `ask-before-substantive-changes`. Related: `brainlink-knowledge-system-2026-10-05`, `competitiveness-multiplier-lane-2026-10-05`.

## Possible Connections

- [[brainlink]] — keyword match from recall, unverified
- [[project-brain]] — keyword match from recall, unverified
- [[brain-vault-political-systems]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-06 from the Claude Code memory file `brain-updates-apply-automatically-2026-10-07.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
