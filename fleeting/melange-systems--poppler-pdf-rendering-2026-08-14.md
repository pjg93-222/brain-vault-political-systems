---
type: fleeting
title: "Poppler pdf rendering (2026-08-14)"
aliases: ["poppler-pdf-rendering-2026-08-14"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[claude-code-harness]]"
  - "[[2026-07-incident-workstation-stability]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/poppler-pdf-rendering-2026-08-14.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\poppler-pdf-rendering-2026-08-14.md", sha256: "e942409d24967882652dde7f0601b0b648ec9884d80fee408ea21b7d5598b581"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Poppler pdf rendering (2026-08-14)

> poppler 25.07.0 (pdftoppm) installed per-user via winget 2026-08-14 — Claude Read renders PDF pages ONLY in sessions started after the install; revert = winget uninstall oschwartz10612.Poppler

## Content

**poppler 25.07.0 is installed on this box** (2026-08-14, spawned-task session): `winget install --id oschwartz10612.Poppler --exact` — per-user portable zip, SHA256-verified by the winget manifest, MIT, VC++ x64 runtime dep was already present so nothing machine-wide changed. Winget put the package's `Library\bin` (under `%LOCALAPPDATA%\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\`) directly on the **user PATH**, exposing `pdftoppm`, `pdftotext`, `pdftocairo`, `pdfinfo` and the rest.

**Why:** the Read tool's PDF page rendering shells out to `pdftoppm`; its absence blocked a 5-agent PDF fan-out on 2026-08-14 (PyMuPDF text-extraction workaround loses figures/layout).

**How to apply:**
- Read on a .pdf works only in Claude Code sessions **started after** the install — the harness captures PATH at session launch. In a pre-install session the error is still "pdftoppm is not installed"; that is stale session PATH, not a broken install. Verify with a registry-refreshed shell (`$env:PATH = Machine+User from [Environment]::GetEnvironmentVariable`) before concluding anything is wrong.
- "Syntax Error: No display font for 'Symbol'/'ArialUnicode'" on stderr is a cosmetic glyph warning, common on Windows; the page still renders.
- Upgrade: `winget upgrade oschwartz10612.Poppler`. Full revert (files + PATH entry): `winget uninstall oschwartz10612.Poppler`. Winget's pin (25.07.0-0, Aug 2025) may trail the GitHub releases page.

Related: `live-tree-branch-state-2026-07-14` (this box's multi-lane environment), `project-brain-toolkit-2026-08-11`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): new sessions only

## Possible Connections

- [[claude-code-harness]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-07-incident-workstation-stability]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `poppler-pdf-rendering-2026-08-14.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[claude-code-harness]], [[2026-07-incident-workstation-stability]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
