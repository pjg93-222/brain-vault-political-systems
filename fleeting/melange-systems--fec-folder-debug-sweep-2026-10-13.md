---
type: fleeting
title: "Fec folder debug sweep (2026-10-13)"
aliases: ["fec-folder-debug-sweep-2026-10-13"]
source: "session"
captured_at: 2026-10-13
created_at: 2026-10-13
status: "promoted"
promoted_to: "obsidian://open?vault=linked&file=knowledge%2Fcuration%2Fknowledge-and-agent-workflow"
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fec-folder-debug-sweep-2026-10-13.md", type: "claude-memory", synced_at: "2026-10-13", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fec-folder-debug-sweep-2026-10-13.md", sha256: "6e68c37943aecbe0773480af6ccc416afa2ab0e06f2715b31722817945c5043b"}
updated_at: 2026-10-13
updated_by: "codex/intake-curation"
tags: ["type/fleeting", "status/raw"]
curated_at: "2026-10-16"
---

# Fec folder debug sweep (2026-10-13)

> Line-by-line debug sweep of every fec/ subfolder via claude/workflows/folder-debug.js; Paul's scope/landing rulings and collect pass-2 rulings

## Content

Paul started a mass debug sweep 2026-10-13: every folder under fec/, one workflow per folder, chain of command Sonnet 5.5 fixer -> Opus 5.5 gate -> Fable 5.1 gate (Fable only for red bugs, cross-file changes, send-backs). Script: `.claude/workflows/folder-debug.js` (args folder, groups ~4k lines, preDirty, optional presetFindings). Reports: `audits/fec_sweep_20261013/<folder>.md`. Plan with groups per folder: session scratchpad sweep_plan.json (regenerate if lost).

Rulings (Paul, 2026-10-13):
- Scope: skip fec/tests, _quarantine_paulcomputer_20260727, attic; include fec/ root .py files (preDirty for root = fec/run_pipeline.py only).
- Severity: fix bugs+risks; nits listed only.
- Landing: one commit per folder ON MAIN, pathspec commit; files with pre-existing uncommitted edits (Paul's WIP) are fixed but NOT committed, flagged.
- Concurrency: 2 folders at a time. Order: engine, stance, members, legislation, lobbying, district, network, staffer_network, surfaces, speech, root, audit, research, tools, desktop.
- collect: pass 1 done uncommitted (audits/collect_fix_20261013/collect_pass1.diff); pass 2 = RULINGS_PASS2 (GATE-2 fix fully; mentat Giving per-book status; press timeout 72000 s; tombstone counts persist; no-body pages terminal after 3; UNRESOLVED stale money out of pool/totals; FEC receipt unmapped-committee fields + multi-cycle counter redefinition) — Paul gave per-change OK for the money items.

**Why:** Paul wants speed + chain of command; old 2-workflow collect pass took 2h40m.
**How to apply:** launch next folders from the plan as each pair finishes; route "paul"-tagged findings to Paul in batches. Related: `dont-be-jumpy-removing-money-2026-09-26`, `ask-before-substantive-changes`.

## Possible Connections

- [[2026-07-bugfix-mentat-collection-and-attribution-system-debug-lane]] — keyword match from recall, unverified
- [[mentat-console-chart-studio-and-system-debug]] — keyword match from recall, unverified
- [[melange-dashboard-v2-redesign-overlay]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-13 from the Claude Code memory file `fec-folder-debug-sweep-2026-10-13.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
