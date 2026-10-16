---
type: fleeting
title: "Brains on every session (2026-10-13)"
aliases: ["brains-on-every-session-2026-10-13"]
source: "session"
captured_at: 2026-10-13
created_at: 2026-10-13
status: "promoted"
promoted_to: "obsidian://open?vault=linked&file=knowledge%2Fcuration%2Fknowledge-and-agent-workflow"
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brains-on-every-session-2026-10-13.md", type: "claude-memory", synced_at: "2026-10-13", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brains-on-every-session-2026-10-13.md", sha256: "4252b6a61408f01bb1fd15e9a57853bfdf9fc29bbda6bd7502a674422b40f8db"}
updated_at: 2026-10-13
updated_by: "codex/intake-curation"
tags: ["type/fleeting", "status/raw"]
curated_at: "2026-10-16"
---

# Brains on every session (2026-10-13)

> STANDING: at the start of EVERY session, boot the project brain (brainctl boot per CLAUDE.md) and confirm the Obsidian vault (C:\Users\pgoff\Documents\brain) recall and brainlink are live — before any work

## Content

Paul, 2026-10-13: "make sure that the obsidian brain and project brains are properly wired in, Memory should always be turning those on for every session at the start of every session".

At the start of every session, before any other work:
1. Run the project-brain boot that CLAUDE.md names:
   `python "C:\Users\pgoff\OneDrive\Desktop\Project Brain\brainctl.py" boot "C:\Users\pgoff\OneDrive\Desktop\Project Brain\brains\melange-systems-brain"`
   Follow the BOOT contract: read order, a boot confirmation citing decision and dead-end IDs, conflict precedence, and the staleness rule.
2. Confirm the Obsidian vault (C:\Users\pgoff\Documents\brain) is live. The SessionStart brainlink line must not say FAILED, and per-prompt "Brain recall" blocks should appear. If brainlink reports FAILED, fix or report it first. Don't silently continue.
3. Rulings go into the brain through brainctl (see `brain-updates-apply-automatically-2026-10-07`). Vault changes reach GitHub only by commit plus PR (see `brain-vault-sync-mechanism-2026-10-07`).

**Why:** Paul wants both knowledge systems on in every session, so decisions, dead ends and state are never re-derived or contradicted. On 2026-10-12/13 the brainlink SessionStart hook failed silently for a day, with "budget exceeded (20s) during project".

**How to apply:** the boot is the first action of every session, and a boot failure is reported to Paul in the first reply.

Related: `project-brain-toolkit-2026-08-11`, `brainlink-knowledge-system-2026-10-05`, `claude-obsidian-readonly-install-2026-10-06`, `bedrock-recall-silent-failures-2026-10-07`.

## Possible Connections

- [[brainlink]] — keyword match from recall, unverified
- [[brain-vault-political-systems]] — keyword match from recall, unverified
- [[project-brain]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-13 from the Claude Code memory file `brains-on-every-session-2026-10-13.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
