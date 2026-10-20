---
type: fleeting
title: "Desktop invite code lane (2026-10-20)"
aliases: ["desktop-invite-code-lane-2026-10-20"]
source: "session"
captured_at: 2026-10-20
created_at: 2026-10-20
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-invite-code-lane-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-invite-code-lane-2026-10-20.md", sha256: "1f1c287e3352d1f032f0ecf8903ca56cff5fae51cd8d4f42fef8655acac56b5a"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop invite code lane (2026-10-20)

> Desktop access invite-code gate committed 7a7132608 on claude/desktop-invite-code-181993; unpushed; server must restart before clients ship

## Content

Invite-code gate for desktop admin-access requests (follow-up to the CodeRabbit Major on Melange #13, access_store.py:301). Committed 7a7132608 on worktree branch claude/desktop-invite-code-181993 (base 672f9888b, desktop 1.0.8). Not pushed, no PR. Publishing needs the ReleasePublish filtered route and Paul's OK. See `desktop-releases-1-0-7-2026-10-19`, `melange-public-repo-unfiltered-branches-2026-10-18`.

Design: 80-bit Crockford codes, sha256 stored, compare_digest across all usable rows. The check runs inside BEGIN IMMEDIATE, before caps, and the use is consumed in the same transaction. Errors return 403 invite_invalid. Codes are issued and revoked in the admin dashboard Invites view. The invites table is created via CREATE TABLE IF NOT EXISTS on connect.

**Why:** the relay makes every client 127.0.0.1, so per-source quotas are useless; anonymous callers could fill MAX_PENDING and the 100/hour cap.

**How to apply:** rollout order matters. Restart the access server on the new code BEFORE releasing new clients. An old server refuses the unknown inviteCode field, and keeps admitting code-less requests until restarted. The shared 600/min relay rate-limit bucket is still a 429 DoS lever; this gate does not fix it.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `desktop-invite-code-lane-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
