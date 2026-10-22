---
type: fleeting
title: "Terrier district download (2026-10-21)"
aliases: ["terrier-district-download-2026-10-21"]
source: "session"
captured_at: 2026-10-21
created_at: 2026-10-21
status: "raw"
promoted_to: ""
project: "scratch-2026-10-19-bad9b3"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-19-bad9b3/memory/terrier-district-download-2026-10-21.md", type: "claude-memory", synced_at: "2026-10-21", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-19-bad9b3\\memory\\terrier-district-download-2026-10-21.md", sha256: "8a03d41d2c5c4619dc886c7d185348aea2ab558693f5bc65625391958b5d49da"}
updated_at: 2026-10-21
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Terrier district download (2026-10-21)

> State of the Terrier desktop private district-download feature and the 1.0.10 startup fix as of 2026-10-21, plus what remains before release

## Content

As of 2026-10-21, Melange repo local `main` (C:\Users\pgoff\OneDrive\Desktop\Melange Systems) holds two unpushed desktop commits:
- `cc5f286b9` — Terrier owner-root startup fix, updates always on (no release-cert gate), no folder/district prompts. Terrier 1.0.10 built+installed on Paul's PC from it (installer in Documents\Desktop-Installers-2026-10-20\dist-1.0.10, not published).
- `6f3defd8c` — private district download: signed per-district packs served from the access server (`/v1/data/*`, `pack-build`/`pack-publish`, packs in %LOCALAPPDATA%\MelangeDesktopAdmin\packs), client downloads/verifies/activates into %LOCALAPPDATA%\MelangeData\terrier, backend imports bundle on first start, revocation deletes data. E2E passed with real co-05/or-05/ct-01 packs (3.0 GB gz, 6.45 GB raw); test copies deleted.

Access server: public mode, reachable via <tunnel-host>:<port> (Tailscale Funnel was blocked: tailnet is <email omitted>, Funnel not enabled). Trust descriptor url updated accordingly.

**Why:** Paul's requirements for testers: open straight into the app, all districts pre-loaded, no folder choice, automatic updates; voter PII must never ship in the public installer.

**How to apply:** Before release 1.0.11: (1) make `main` the single source of the Terrier backend `desktop_backend.py` (installed runtime uses the tooling-branch variant with --owner-root but without `import_district_bundle`); (2) publish real packs on the live server and restart it; (3) run the bore.pub throughput test; (4) update `SOURCE_SHA256` in district_packs.py whenever a district is rebuilt from a new voter file; (5) 1.0.7 installs need a manual install once (cert gate baked in). Keeper (campus app control) blocks installers on managed laptops — IT contacts Darnell and LaMarcus; keep code-signing for allowlisting. Related: `melange-desktop-access-server`

## Possible Connections

- [[terrier]] — keyword match from recall, unverified
- [[2026-10-06-terrier-build-progress]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-21 from the Claude Code memory file `terrier-district-download-2026-10-21.md` of project `scratch-2026-10-19-bad9b3` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
