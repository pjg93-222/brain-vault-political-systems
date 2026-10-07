---
type: fleeting
title: "Claude obsidian plugin (2026-10-07)"
aliases: ["claude-obsidian-plugin-2026-10-07"]
source: "session"
captured_at: 2026-10-06
created_at: 2026-10-06
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/claude-obsidian-plugin-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\claude-obsidian-plugin-2026-10-07.md", sha256: "f7562a98042dab8126fded15fb6c0b7cc0c2b78d898821dab76e23d2355c4bec"}
updated_at: 2026-10-06
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Claude obsidian plugin (2026-10-07)

> claude-obsidian plugin installed alongside Bedrock; read-only on Windows; its hooks stay ON by Paul's choice; Bedrock owns vault writes

## Content

claude-obsidian (github.com/AgriciDaniel/claude-obsidian, MIT, marketplace `agricidaniel-claude-obsidian`) was installed 2026-10-06 at user scope next to Bedrock. Settings backup: `C:\Users\pgoff\.claude\settings.json.bak-20261006-claude-obsidian` (the only diff is the enable line + marketplace entry).

Facts: native Windows = read-only; vault writes need WSL, which isn't installed. Its vault setup/adopt was NOT run: no `.claude-obsidian.json`, `wiki/`, `inbox/` or `.raw/` in `C:\Users\pgoff\Documents\brain`. Its hooks (SessionStart + Stop, `python3 ... claude-obsidian.py hook ...`, 5 s) are effectively no-ops: session-start injects context only if `CLAUDE_OBSIDIAN_SESSION_CONTEXT=1` (unset); stop only reports unfinished claude-obsidian transactions. `python3` resolves to the WindowsApps alias.

Claude Code has NO per-plugin hook disable; `disableAllHooks` would kill Bedrock's hooks too. Paul chose 2026-10-07: leave claude-obsidian's hooks ON (option 1), rather than a hook-less local copy.

**Why:** Paul wants Obsidian fundamentally integrated into Claude; Bedrock stays the writer, claude-obsidian adds read-only skills (wiki-query, wiki-lint, canvas, obsidian-bases, obsidian-markdown, think).
**How to apply:** never run claude-obsidian `wiki` init/adopt or `save`/`wiki-ingest` writes on the brain vault without Paul; vault writes go through Bedrock conventions. Never set `disableAllHooks`. If AppXSvc/python3 alias trouble appears, suspect these hooks (`appxsvc-leak-pythonmanager-2026-09-23`). Related: `brainlink-knowledge-system-2026-10-05`, `terrier-multidistrict-lane-2026-10-06`.

## Possible Connections

- [[brain-vault-political-systems]] — keyword match from recall, unverified
- [[2026-10-feature-brain-vault-setup]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-06 from the Claude Code memory file `claude-obsidian-plugin-2026-10-07.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
