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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-admin-launcher-applied-2026-10-22.md", type: "claude-memory", synced_at: "2026-10-22", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-admin-launcher-applied-2026-10-22.md", sha256: "bcff614975a0b4e1628a25e19f4c751218bc202a6b4d4066d8f478ffdf05c660"}
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
- Since 2026-10-22 the installer itself throws when run from a `\.claude\worktrees\` path (`-Uninstall` is exempt). Local main f45c49c55, test `ops/desktop/server/test_install_admin_launcher.py`, public PR pjg93-222/Melange#45 (publish commit 07c1ab7ca, receipt AX). The PR was left unmerged, and CodeRabbit had no actionable comments.
- UPDATE 2026-10-22 ~03:10 CDT: the local stack is wired up.
  - Docker Desktop is up. `ops\.env` exists (gitignored, no secret) with the v2026.10.19.1 digests, verified as the newest passing release.
  - The Terrier key lives in `AppData\Local\MelangeLocal\secrets\terrier-local.env` (pgoff-only ACL).
  - All three data dirs are EMPTY placeholders in `AppData\Local\MelangeLocal\placeholder\`. Six `melange-local` containers have been created.
  - Desk is running and healthy (/healthz 200). Mentat crash-loops on empty data (missing `inputs/fec_receipt_rules.json`), so it was stopped. Terrier was never started.
  - The Apps handler lists all three correctly.
  - The real-data mounts are decisions D1-D4, waiting on Paul (side-session-notes `local-stack-env-2026-10-22.md`). The recommendations:
    - an invited build into MelangeLocal\data;
    - a Mentat snapshot-lite copy (inputs+forecast+app/data, about 0.47 GB; the live tree is 131.7 GB);
    - Terrier stays off.
  - Paul declined Edge screen access. The auto-mode classifier blocks scripted page actions that use a stub audit.

Related: `land-means-in-the-app-2026-10-15`, `desktop-invite-code-lane-2026-10-20`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-22 from the Claude Code memory file `melange-admin-launcher-applied-2026-10-22.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
