---
type: fleeting
title: "Melange admin launcher applied (2026-10-22)"
aliases: ["melange-admin-launcher-applied-2026-10-22"]
source: "session"
captured_at: 2026-10-22
created_at: 2026-10-22
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-admin-launcher-applied-2026-10-22.md", type: "claude-memory", synced_at: "2026-10-22", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-admin-launcher-applied-2026-10-22.md", sha256: "6f4163ab7d6ec9075e94ba4e3df3959a2846321715a64cd8da248712582338c7"}
updated_at: 2026-10-22
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Melange admin launcher applied (2026-10-22)

> Melange Admin shortcuts re-pointed to the main checkout 2026-10-22 (were on a dead worktree without the Apps section); local compose stack for the Apps page still NOT configured

## Content

2026-10-22 ~02:12 CDT: the "Melange Admin" Desktop and Start-menu shortcuts were re-installed from `Melange Systems\ops\desktop\server\Install-AdminLauncher.ps1` on main. Since 2026-10-18 they had pointed at the worktree `.claude\worktrees\agitated-perlman-698985`. Git no longer lists that worktree, and it has no `apps_admin.py`, so clicking the icon opened an old console without the Apps section. A test launch through explorer ran pythonw `desktop_admin.py ... access-dashboard` from main and opened an Edge app window on 127.0.0.1 only, with no errors. The older "Application Access Admin.lnk" already pointed at main and was left alone.

**Why:** the installer bakes `$PSScriptRoot` into the shortcut, so running it from a session worktree breaks the launcher once that worktree is pruned.

**How to apply:**
- Only ever run Install-AdminLauncher.ps1 from the main checkout. Re-run it there whenever the shortcuts look stale (read their Arguments with WScript.Shell).
- The Apps page shows "Docker is not running" until the local stack is set up. That needs Docker Desktop and an `ops\.env`, which is missing and has no template.
- The images for `ops\.env` can be the v2026.10.19.1 digests.json values. A KEY=value secret file is still needed for Terrier.
- The data mounts are not ready:
  - The Melange desk needs an invited build at `outputs\invited_build`, which does not exist.
  - Mentat needs a copy of its data (none exists; the live `C:\Users\pgoff\Mentat\mentat` could be mounted read-only instead).
  - Terrier co-05 mounts the whole `.local` root, which exposes the or-05/ct-01 stores, `accounts.sqlite3` and `.secret` to the container (read-only). The mount choice is Paul's.

Related: `land-means-in-the-app-2026-10-15`, `desktop-invite-code-lane-2026-10-20`.

## Possible Connections

- [[2026-07-bugfix-mentat-collection-and-attribution-system-debug-lane]] — keyword match from recall, unverified
- [[mentat-console-chart-studio-and-system-debug]] — keyword match from recall, unverified
- [[terrier]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-22 from the Claude Code memory file `melange-admin-launcher-applied-2026-10-22.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
