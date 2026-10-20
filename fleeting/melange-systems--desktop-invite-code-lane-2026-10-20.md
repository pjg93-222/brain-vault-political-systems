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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-invite-code-lane-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-invite-code-lane-2026-10-20.md", sha256: "13f23e3af970671b064a4ddf39eb6f047c3b79767cee95d93aad02299a3ecb9c"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop invite code lane (2026-10-20)

> Desktop invite-code gate MERGED via Melange PR

## Content

Invite-code gate for desktop admin-access requests. The original 7a7132608 / c1a11aef5 made inviteCode REQUIRED, which would have 403'd every released 1.0.9 client. It was re-ported with inviteCode OPTIONAL and merged 2026-10-20 through the ReleasePublish route: pjg93-222/Melange PR #21, merge commit b5680aa9c, publish branch publish/desktop-access-fixes-20261020, receipts AL/AM in ReleasePublish\PUBLISH_RECEIPT.md. The source is worktree branch claude/affectionate-babbage-19e2c4. See `desktop-releases-1-0-7-2026-10-19`, `melange-public-repo-unfiltered-branches-2026-10-18`.

The same PR also added:
- reminder balloons every 4 h for still-pending requests
- the balloon click always runs access-dashboard
- dashboard auto-refresh every 30 s
- the client auto-polls once on startup when a stored pending request has no server reply

Design is unchanged: 80-bit Crockford codes, sha256 stored, compare_digest. The check runs inside BEGIN IMMEDIATE before the caps, and the use is consumed in the same transaction. Errors return 403 invite_invalid. A re-POST of an existing request skips the check.

Enforcement comes from `serve --require-invite` or the User env var MELANGE_ACCESS_REQUIRE_INVITE. Accepted values are 1/true/yes/on and 0/false/no/off; junk makes serve refuse to start. The state shows as inviteRequired in listener-status.json.

**Why:** the relay makes every client 127.0.0.1, so per-source quotas are useless.

**How to apply:** rollout order.
1. Paul restarts the server on the new code with enforcement off.
2. Release clients with the optional invite field.
3. After testers update, set the env var, restart the login startup task or supervisor (killing only python keeps the old environment), and confirm inviteRequired:true.
A follow-up lane started 2026-10-20 removes the people caps (100 approved, per-source, peer table, lifetime rows) and queues excess connections instead of dropping them. It goes in a separate PR.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `desktop-invite-code-lane-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
