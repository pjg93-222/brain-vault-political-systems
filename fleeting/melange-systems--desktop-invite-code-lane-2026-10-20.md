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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-invite-code-lane-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-invite-code-lane-2026-10-20.md", sha256: "96384be8a0e29ba76bdb53f39267420f756baa0f0f2cc4c0559488873e6eebb0"}
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
**Code COMMITTED, deploy still BLOCKED 2026-10-20 ~23:50 (nothing restarted, env var NOT set):** local main 15081aa9a (parent cc5f286b9) syncs ops/desktop/server to origin/main PRs #21+#24, keeping local-only bd24a0740 (notifierPid) + 2894aa69c (survive failed notifier launch) via 3-way merge; built with a temp index, only that folder changed. Local main has NO merge-base with origin/main. Restart blocked because another session was writing uncommitted "district packs" WIP into the LIVE runtime folder (MAIN\ops\desktop\server access_http.py, desktop_admin.py, new district_packs.py; packaging\desktop_backend.py; client dataset-*.cjs) 23:33-23:41; a restart would have deployed it. Next: once that WIP is committed or moved off the main checkout, run the restart procedure (`desktop-supervisor-restart-procedure-2026-10-20`) with User env MELANGE_ACCESS_REQUIRE_INVITE=1, restart MelangeDesktopTunnel (task priority 5, End/Start is fine), confirm inviteRequired:true. Script with a dirty-runtime guard: session cd9c18b9 scratchpad restart.ps1. Public repo also needs bd24a0740+2894aa69c published (a ReleaseLanes supervisor-fixes branch was being prepared 10-20 23:30).
Follow-up lane PR #24 MERGED 2026-10-20 22:59 (13ca95326). It removes the people caps (approved testers unlimited, per-address limits gone, lifetime rows gone), keeps 100 new requests per hour, and queues excess connections. The relay now uses per-connection waiter threads. It adds a crash-dummy test. Expired requests are pruned after 30 days; denied rows are kept because the client re-submits unknown ids on launch. Activity is capped at 10,000 rows per device.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `desktop-invite-code-lane-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
