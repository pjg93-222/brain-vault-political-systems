---
type: fleeting
title: "Fec folder debug sweep (2026-10-13)"
aliases: ["fec-folder-debug-sweep-2026-10-13"]
source: "session"
captured_at: 2026-10-20
created_at: 2026-10-20
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fec-folder-debug-sweep-2026-10-13.md", type: "claude-memory", synced_at: "2026-10-21", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fec-folder-debug-sweep-2026-10-13.md", sha256: "fa90f480528a9e0d5b6c19fe0f92474263db311d3c8d53e992f51b054aaa0fb5"}
updated_at: 2026-10-21
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Fec folder debug sweep (2026-10-13)

> fec line-by-line debug sweep CLOSED 2026-10-20; all folders committed, public PR #14 merged 5f68fa2e5; research local-only; Paul decisions list open

## Content

The fec/ debug sweep (2026-10-13 to 2026-10-20) is CLOSED.
- **Code:** every fec folder was swept with `.claude/workflows/folder-debug.js` (Opus review, Sonnet fix, Opus gate, Fable gate, land) and committed on local main.
- **Publication:** public PR #14 (pjg93-222/Melange) went out through the ReleasePublish filtered route. Its receipts are PUBLISH_RECEIPT.md sections Z, AC, AE, AG, AH and AI. It merged as 5f68fa2e5 on 2026-10-20 after every CodeRabbit thread was resolved.
- **fec/research** is committed locally only. The export filter excludes it and its 6 dependent tests (MELANGE_RESEARCH_TESTS).
- **Records:** audits/fec_sweep_20261013/ holds HANDOFF.md, PAUL_DECISIONS.md and one fec_*.md report per folder.

Open items, all Paul's calls:
- the hash-bound research challengers files edited by 066a12c20: revert or accept
- 3 gate receipts that pin the old fec\audit_*.py paths: re-mint
- 3 audit files held uncommitted because of hash pins
- Johnson/Scalise review provenance
- the WJ capture rule
- paid-API cleanups

**Why:** so a later session doesn't redo the sweep or re-publish research.
**How to apply:**
- To sweep another folder tree, reuse folder-debug.js (now lean). Its args are {folder, groups (~4k lines each), preDirty}.
- Its hold list covers money, prereg, paid spend, live writes and files bound to a sealed manifest.
- Its land step commits the matching test changes.
- A session restart kills running workflows. Resume them with resumeFromRunId.
Related: `no-permission-prompts-pr-first-2026-10-19`, `melange-public-repo-unfiltered-branches-2026-10-18`, `always-read-coderabbit-2026-10-18`.

#### Update 2026-10-21

The surfaces folder was left half-swept: 11 files and about 21 findings are unfixed, and review groups g7 to g12 never ran. The args are in `audits/fec_sweep_20261013/remaining_args.json`.

The forecast_ledger cosponsor item was fixed in 76e2a857b.

`.claude/workflows/folder-debug.js` has uncommitted process edits: a TDD fixer, a silent-failure-hunter reviewer, and an adversarial Fable gate.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-21 from the Claude Code memory file `fec-folder-debug-sweep-2026-10-13.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
