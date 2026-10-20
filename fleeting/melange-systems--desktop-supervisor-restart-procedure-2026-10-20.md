---
type: fleeting
title: "Desktop supervisor restart procedure (2026-10-20)"
aliases: ["desktop-supervisor-restart-procedure-2026-10-20"]
source: "session"
captured_at: 2026-10-20
created_at: 2026-10-20
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-supervisor-restart-procedure-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-supervisor-restart-procedure-2026-10-20.md", sha256: "2a0e81ea9df24f7c64e6fd8a2b6f76c9af2f9276da33fdfc5b068526af8b853f"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop supervisor restart procedure (2026-10-20)

> How to restart the desktop access login supervisor (Start-LanPublisherAtLogin.ps1) without a long outage; WMI and default-priority one-shot tasks fail

## Content

Restarting the desktop access supervisor (Paul's call each time) works ONLY this way, proven 2026-10-20:
1. `Stop-Process` the supervisor pwsh. Its job object (KILL_ON_JOB_CLOSE) takes the publisher, notifier and notifier children down within a second. Confirm 127.0.0.1:38443 has no listener.
2. Register a one-shot scheduled task: the Run-entry command (HKCU Run `MelangeDesktopPublisher`, WindowsApps pwsh alias + same args), `-LogonType Interactive -RunLevel Limited`, `ExecutionTimeLimit 0`, **`-Priority 4`**, then `Start-ScheduledTask` and `Unregister-ScheduledTask` once it runs. The supervisor survives unregistering. It reaches `starting` in about 40 s and `running` about 30 s later.
3. Verify `listener-status.json` (new supervisorPid, publisherPid and notifierPid), the listener on 127.0.0.1:38443, and HTTP 404 from `https://<tunnel-host>:<port>/`. Leave the tunnel task alone; it reconnects by itself.

Failed paths:
- A one-shot task at the default priority 7 hung at pwsh startup (0.16 s CPU after 2.5 minutes). The likely cause is very-low I/O priority on the busy OneDrive disk; this was not proven.
- WMI `Win32_Process.Create` rejects the WindowsApps alias (rc=8). With the real pwsh path, the process sits inside the WMI job, so `[MelangePublisherJob]::Assign` fails with "Access is denied" and the supervisor exits.
- `Start-Process` from a Claude tool shell would leave the supervisor inside the tool's process tree.

**Why:** the 10-20 merge-and-restart took about 13 minutes of outage while these failures were worked through. The 10-20 re-point session's one-shot task (desktop-port-to-main.md) worked but did not record its settings.
**How to apply:** use steps 1-3 directly. Expect an outage of about 1 minute. Related: `desktop-invite-code-lane-2026-10-20`, `desktop-releases-1-0-7-2026-10-19`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `desktop-supervisor-restart-procedure-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
