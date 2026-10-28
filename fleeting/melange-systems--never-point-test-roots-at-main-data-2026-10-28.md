---
type: fleeting
title: "Never point test roots at main data (2026-10-28)"
aliases: ["never-point-test-roots-at-main-data-2026-10-28"]
source: "session"
captured_at: 2026-10-28
created_at: 2026-10-28
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/never-point-test-roots-at-main-data-2026-10-28.md", type: "claude-memory", synced_at: "2026-10-28", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\never-point-test-roots-at-main-data-2026-10-28.md", sha256: "d1ab411374dad08f715a672564e4243548a329b79382ff936e81b2fefb13ac28"}
updated_at: 2026-10-28
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Never point test roots at main data (2026-10-28)

> Never redirect test data paths (pytest plugin, monkeypatch, env root) at the main checkout's data/ — fixture-building tests write through it and clobber live files

## Content

Never run tests with data/content roots redirected at the main checkout (or any shared live tree). Copy the needed inputs into a scratch root instead and point the tests there.

**Why:** 2026-10-28 an agent ran `test_member_briefs_v3.py` with a scratch pytest plugin pointing content paths at main's `data/`. Tests that build their own temp inputs followed the redirect and overwrote five untracked live files (member_narrative_evidence_v4.json 8.26 MB -> 4 KB, member_desk_src.json, member_wikipedia_summaries.json, fec/legislators.csv, data/engine/congestion.json). Restored byte-for-byte from receipt-hashed copies, but a concurrent LDA run may have read fixtures. Untracked data has no git safety net.

**How to apply:** for "run the real-ledger test" style checks, copy live inputs to a scratch fake root (read-only source), add a write guard, and never let a test touch the main checkout. Also: validators that read files live (e.g. the exemplars JSON) change running workflows' results when edited mid-run — stage edits in scratch until the workflow ends. Related: `live-tree-branch-state-2026-07-14`, `storage-sense-wipes-temp-2026-10-14`.

## Possible Connections

- [[2026-07-troubleshooting-melange-live-tree-git-drift-drift-reconcile-eol]] — keyword match from recall, unverified
- [[melange-fec-pipeline-live-tree-drift-and-eol]] — keyword match from recall, unverified
- [[melange-fec-pipeline-reorganization]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-28 from the Claude Code memory file `never-point-test-roots-at-main-data-2026-10-28.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
