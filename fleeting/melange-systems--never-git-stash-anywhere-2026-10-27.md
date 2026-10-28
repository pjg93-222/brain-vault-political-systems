---
type: fleeting
title: "Never git stash anywhere (2026-10-27)"
aliases: ["never-git-stash-anywhere-2026-10-27"]
source: "session"
captured_at: 2026-10-27
created_at: 2026-10-27
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/never-git-stash-anywhere-2026-10-27.md", type: "claude-memory", synced_at: "2026-10-27", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\never-git-stash-anywhere-2026-10-27.md", sha256: "00cc7f05e4fc5cbeabe9135eefc58c413842495e79f71034941ee453f375d383"}
updated_at: 2026-10-27
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Never git stash anywhere (2026-10-27)

> Standing rule - no agent may run git stash in any Melange checkout, worktrees included; use a temp commit or a diff file

## Content

Never run `git stash` (push, pop, apply, drop) in any Melange checkout, lane worktrees included. Use a temp commit on the lane branch or write a diff file instead.

**Why:** stash has caused past work losses in this repo (7 old stashes still sit there). On 2026-10-27 a Sonnet executor in the member-briefs-v3 worktree ran `git stash -q` while self-checking, then popped it back; no loss, but Paul's consult relay restated the rule as standing (alongside D-371).

**How to apply:** put "NEVER run git stash, reset or checkout anywhere, worktrees included" in every coding-agent brief. Related: `live-tree-branch-state-2026-07-14`, `melange-public-repo-unfiltered-branches-2026-10-18`.

## Possible Connections

- [[2026-07-bugfix-mentat-collection-and-attribution-standing-rules]] — keyword match from recall, unverified
- [[2026-07-troubleshooting-melange-live-tree-git-drift-drift-reconcile-eol]] — keyword match from recall, unverified
- [[2026-07-feature-agent-tooling-stack-codex-executor-lane]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-27 from the Claude Code memory file `never-git-stash-anywhere-2026-10-27.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
