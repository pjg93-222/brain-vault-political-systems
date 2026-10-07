---
type: fleeting
title: "Claude obsidian readonly install (2026-10-06)"
aliases: ["claude-obsidian-readonly-install-2026-10-06"]
source: "session"
captured_at: 2026-10-06
created_at: 2026-10-06
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/claude-obsidian-readonly-install-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\claude-obsidian-readonly-install-2026-10-06.md", sha256: "415891f358d424e34bc5866bc4d9fbd96ea5cd884f80cb394917e74f30225055"}
updated_at: 2026-10-06
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Claude obsidian readonly install (2026-10-06)

> claude-obsidian 2.2.0 installed read-only beside Bedrock (Paul's option 1); its hooks still run (no per-plugin disable) but are silent; Bedrock owns vault writes

## Content

On 2026-10-06 Paul chose "option 1, install": the claude-obsidian plugin (github.com/AgriciDaniel/claude-obsidian, MIT, v2.2.0, marketplace `agricidaniel-claude-obsidian`) is installed at user scope next to Bedrock, READ-ONLY. Bedrock stays the only system that writes to the vault (C:\Users\pgoff\Documents\brain) and the only one whose hooks inject context.

Facts verified:
- Native Windows: claude-obsidian refuses vault writes (UNSUPPORTED_PLATFORM); writes need WSL, which is NOT installed. Installing WSL is Paul's system change, not mine.
- Its hooks (SessionStart + Stop, `python3 .../claude-obsidian.py hook ...`) still run every session. Claude Code 2.1.286 has no supported per-plugin hook disable (only disableAllHooks, which would kill Bedrock). They are silent: SessionStart emits nothing unless CLAUDE_OBSIDIAN_SESSION_CONTEXT=1 (unset everywhere); Stop only speaks when its own recovery state exists (it doesn't in the brain vault).
- `python3` resolves to the Windows Store alias (WindowsApps\python3.exe), i.e. the Python Manager package linked to the AppXSvc leak.
- No vault setup/adopt was run: no .claude-obsidian.json, wiki/, inbox/, .raw/, .vault-meta/ in the vault. settings.json backup: C:\Users\pgoff\.claude\settings.json.bak-20261006-claude-obsidian (diff = only enabledPlugins + extraKnownMarketplaces entries).

- Its linter only scans `<vault>/wiki/`. On this Bedrock layout `claude-obsidian.py lint` exits 0 with 0 pages scanned, a VACUOUS pass, never evidence of health. A remapped scratch-copy run (439 pages) found mostly convention-only noise (no created/updated keys) plus a few real dead links. Bedrock's own check.ts and healthcheck.ts stay the gate.

**Why:** Paul wants Obsidian "fundamentally integrated into Claude", but two systems writing one vault with different folder and frontmatter conventions would split it.
**How to apply:** use claude-obsidian's read-side skills (wiki-query, wiki-lint, obsidian-markdown, obsidian-bases, canvas, think) as helpers; never run its save/wiki-ingest/wiki-fold/wiki setup against the brain vault, and never set CLAUDE_OBSIDIAN_SESSION_CONTEXT=1. All vault writes go through Bedrock conventions. If AppXSvc memory climbs again, suspect the python3 alias launched by these hooks first.

Related: `appxsvc-leak-pythonmanager-2026-09-23`, `brainlink-knowledge-system-2026-10-05`, `terrier-multidistrict-lane-2026-10-06`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-06 from the Claude Code memory file `claude-obsidian-readonly-install-2026-10-06.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
