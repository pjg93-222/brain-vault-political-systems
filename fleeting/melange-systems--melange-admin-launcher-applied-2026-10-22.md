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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-admin-launcher-applied-2026-10-22.md", type: "claude-memory", synced_at: "2026-10-25", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-admin-launcher-applied-2026-10-22.md", sha256: "56ea3f89662fed575ba5e1c69a2910bb383fc75700a98dfa2c272aab23c961dd"}
updated_at: 2026-10-25
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
- APPLIED 2026-10-22 ~11:50: Paul ruled D1 invited desk, D2 option A, D3 Terrier off, D4 desk+Mentat running.
  - Desk is mounted from `AppData\Local\MelangeLocal\data\melange-invited` (116 MB, governance pending).
  - Mentat is mounted from `...\data\mentat-20261022` (inputs+forecast+app/data, 451 MB; state and .cache empty).
  - Both are healthy, /healthz 200 on 18080/18802. Terrier remains created and stopped.
  - C: free was only about 2.5 GB at 11:50, down from 19.5 GB at 08:00. The cause is not ours and was not investigated.
- 2026-10-22/24: Apps Start fixed and landed, signed.
  - What was broken: the dashboard died at 8 h while its Edge window lived on; a synchronous Docker pre-check timed out on the loaded laptop; the UI hid the server's messages.
  - Added a Start Docker Desktop button and auto-retries.
  - Main commits: 0eea16e30..d6cad7d0b, c7ce0485f, 049d6f01c, 2a257733e.
  - PR pjg93-222/Melange#58: OPEN, 0 unresolved threads; merging is Paul's.
- Latest Mentat in the stack (2026-10-24):
  - mentat-console `sha256:3cff1245…`, from platform release v2026.10.22.3 (4ce907b31 = Melange 29f5b8b09 + Mentat b7b4022de, the public Mentat port).
  - It renders `index.html.j2`; fixed 767e84655 via export `extra_paths`. Before that, the container served the golden fallback page.
- Release-tool lessons:
  - Mentat source for releases is local `codex/mentat-crypto`. Port public Mentat main into it first (D-230 import commit; ae4ce8b35).
  - Global `tag.gpgsign` breaks the old lightweight Geo tag. Fixed in 29f5b8b09 (signed annotated tag via `terrier_tagger`; `remote_tag` peels).
  - In the 19.6 GB checkout, commit with `merge-tree`/`commit-tree -S`, because a plain commit hangs on index refresh.
  - CI rescans every compute image on every tag, so new advisories fail unrelated releases (.1 certifi/chromium, .3 brotli/pypdf); .4 fixes them.
- Terrier was found running (restored by Docker), contrary to D3. Left as is. Updated 10-24 to the .4 image `71c9ba69…` on Paul's "finish it all up".
- 2026-10-25, Paul approved: Docker Desktop starts at login.
  - `settings-store.json` has AutoStart=true (backup `.bak-20261025`).
  - The HKCU Run entry is quoted.
  - StartupApproved is `02…`.
  - Once Docker is up, all six melange-local containers return on their own (`restart: unless-stopped`).

Related: `land-means-in-the-app-2026-10-15`, `desktop-invite-code-lane-2026-10-20`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-25 from the Claude Code memory file `melange-admin-launcher-applied-2026-10-22.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
