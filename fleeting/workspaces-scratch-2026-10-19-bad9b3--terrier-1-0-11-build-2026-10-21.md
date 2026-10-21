---
type: fleeting
title: "Terrier 1 0 11 build (2026-10-21)"
aliases: ["terrier-1-0-11-build-2026-10-21"]
source: "session"
captured_at: 2026-10-21
created_at: 2026-10-21
status: "raw"
promoted_to: ""
project: "workspaces-scratch-2026-10-19-bad9b3"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-19-bad9b3/memory/terrier-1-0-11-build-2026-10-21.md", type: "claude-memory", synced_at: "2026-10-21", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-19-bad9b3\\memory\\terrier-1-0-11-build-2026-10-21.md", sha256: "6739a831f5d04a97f9e6fc0af780a601a16250eb27128e92139e951ebdc5d6b6"}
updated_at: 2026-10-21
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Terrier 1 0 11 build (2026-10-21)

> How Terrier desktop 1.0.11 was built locally on 2026-10-21 (runtime bootstrap patched in place, not rebuilt), what is verified, and what still waits on Paul

## Content

Terrier desktop 1.0.11 was built, signed and installed locally on 2026-10-21; nothing was pushed or published. Facts not derivable from the repo:

- The Terrier runtime (python + Geo sources, built by a Geo CI run on 2026-10-19) lives prebuilt at `C:\Users\pgoff\Documents\Desktop-Installers-2026-10-20\work\terrier\app\resources\runtime\terrier`. Its `bootstrap\desktop_backend.py` is a loose file outside app.asar and no integrity check covers it, so a backend fix ships by copying main's `ops/desktop/packaging/desktop_backend.py` over it and re-running `inject.cjs` + `--package`; no CI rebuild needed. Backup of the old tooling variant: `work\terrier\desktop_backend.py.tooling-170c002e.bak`.
- Build recipe that worked (same as 1.0.10): set `release-config.json` version (inject.cjs reads it, no env override); `node inject.cjs terrier <sha>`; node --test + pytest (`test_github_release.py`, `test_authenticode_binding.py`, `test_desktop_backend.py`) from the export; `DIST_ROOT=...\dist-1.0.11 node inject.cjs terrier <sha> --package`; `sign_installers.ps1 -Version 1.0.11 -DistRoot ...\dist-1.0.11 -Apps terrier`. `prepare_release.py` is skipped for Terrier-only builds (hard-codes 1.0.9 evidence and needs all three apps). Silent install: `Terrier-1.0.11-win-x64.exe /S` upgrades in place at `Documents\MelangeApplications\Terrier`.
- Client commit aba57f7e5 (local main only, also on mirror/main). Local main is 1621 ahead / 144 behind origin/main; origin/main carries its own desktop commits (PRs #27, #28), so publishing source means a cherry-pick branch + PR, never a push of main.
- The live access server (desktop_admin.py serve, started 2026-10-20 16:34) predates the `/v1/data/*` pack code; district download needs a serve restart plus `pack-build`/`pack-publish`. Both wait on Paul, as do the source push, the desktop-v1.0.11 GitHub release, and the bore.pub throughput probe. Checklist with the open decisions: side-session notes folder of local_c519d008, `terrier-1.0.11-go-live-checklist.md` (copy at `Desktop-Installers-2026-10-20\RUNBOOK-1.0.11.md`).

**Why:** the installed 1.0.10 ran a backend from the tooling branch, not main; main is now the single source and this records how the shipped file is kept in sync.

**How to apply:** for the next Terrier desktop release, patch the runtime bootstrap from main and follow the recipe above; before any public step, check the checklist for Paul's recorded decisions. Related: `terrier-district-download-2026-10-21`.

## Possible Connections

- [[2026-10-06-terrier-rulings]] — keyword match from recall, unverified
- [[2026-10-06-terrier-build-progress]] — keyword match from recall, unverified
- [[2026-10-06-terrier-blueprint]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-21 from the Claude Code memory file `terrier-1-0-11-build-2026-10-21.md` of project `workspaces-scratch-2026-10-19-bad9b3` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
