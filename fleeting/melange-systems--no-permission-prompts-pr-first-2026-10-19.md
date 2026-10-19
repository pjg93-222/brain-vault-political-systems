---
type: fleeting
title: "No permission prompts pr first (2026-10-19)"
aliases: ["no-permission-prompts-pr-first-2026-10-19"]
source: "session"
captured_at: 2026-10-19
created_at: 2026-10-19
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/no-permission-prompts-pr-first-2026-10-19.md", type: "claude-memory", synced_at: "2026-10-19", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\no-permission-prompts-pr-first-2026-10-19.md", sha256: "cc75eb8d15137b813be0d9010bfb346c3aea9e5f15dd8a4ce0ffa7f0de95cec1"}
updated_at: 2026-10-19
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# No permission prompts pr first (2026-10-19)

> Paul 2026-10-19: stop asking permission; execute. Upload work to GitHub with a PR as the first action (non-negotiable), via the ReleasePublish filtered route only

## Content

Paul, 2026-10-19, after repeated plan-approval prompts during the fec debug sweep: "stop asking for my fucking permission." He followed it with "Make sure... this is all uploaded to GitHub (this is non-negotiable, you need to upload this and make sure the first thing you do is create a PR)." He also asked that every plan give a concise workflow for each agent and sub-agent, built on ECC debugging patterns (silent-failure-hunter, python-reviewer, tdd-workflow, verification-loop, santa-method, quality-gate).

**Why:** Prompting stalled overnight work and burned his time. He wants the work to be visible on GitHub and reviewable in a PR.

**How to apply:**
- Execute without AskUserQuestion or approval prompts.
- Hard-bar items (money counting, prereg/one-look, paid spend, live data/DB/receipt writes, server restarts) are still never fixed on my own. Put them in a ranked decisions list (the PR body plus audits/.../PAUL_DECISIONS.md) and don't ask about them in chat.
- Publishing to GitHub still has to use the filtered route, because origin is public. Never push a raw branch (`melange-public-repo-unfiltered-branches-2026-10-18`). The route is ReleasePublish filter_export, then a fast-forward commit on a new branch, then gitleaks, then push that branch only, then a PR into main.
- Open the PR first, then keep adding fast-forward commits to the same branch as work lands.
- Read CodeRabbit on every PR (`always-read-coderabbit-2026-10-18`).
- This supersedes the "present+WAIT" part of `ask-before-substantive-changes` for execution steps. Paul's domain rulings stay his.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-19 from the Claude Code memory file `no-permission-prompts-pr-first-2026-10-19.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
