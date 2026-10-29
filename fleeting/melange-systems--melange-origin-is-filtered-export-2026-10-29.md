---
type: fleeting
title: "Melange origin is filtered export (2026-10-29)"
aliases: ["melange-origin-is-filtered-export-2026-10-29"]
source: "session"
captured_at: 2026-10-29
created_at: 2026-10-29
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-origin-is-filtered-export-2026-10-29.md", type: "claude-memory", synced_at: "2026-10-29", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-origin-is-filtered-export-2026-10-29.md", sha256: "9fcec57e18b3f15570655205748cd44303ac6f41b7f7ba7d17afc713b6b61678"}
updated_at: 2026-10-29
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Melange origin is filtered export (2026-10-29)

> NEVER push any local Melange branch raw to origin — origin/main is a filtered export with no shared history; publication goes through ops/release_lib/export.py and a PR, even when Paul says "push"

## Content

Origin for the Melange Systems repo is a filtered PUBLIC export built by `ops/release_lib/export.py`; it shares no history with the local repo. A raw `git push origin <local-branch>` would publish the full local history: `data/`, `source_data/`, `originals/`, `in use/`, `tmp/`, ledgers, `.mcp.json`, `keys.example.json`.

On 2026-10-28 the auto-mode classifier denied my push of lane/sna-health as publication; that denial was correct. On 2026-10-29 Paul ruled "push", the overseer stopped it with the two facts above, and `git ls-remote origin refs/heads/lane/sna-health*` confirmed nothing had reached origin. The SNA lane's work was already public via the export route as PR #105 (merged 0018eaae2, local main 38d0900e4).

**Why:** a "push" ruling from Paul assumes a normal remote; here the remote is a filtered mirror and the standing public-repo rule wins.
**How to apply:** land lane work on local main after Opus review and tell the overseer; the overseer publishes through the export. If a push ruling arrives, restate these two facts instead of pushing. See `melange-public-repo-unfiltered-branches-2026-10-18` `sna-health-lane-2026-10-28`.

## Possible Connections

- [[2026-10-troubleshooting-melange-main-reconcile]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-29 from the Claude Code memory file `melange-origin-is-filtered-export-2026-10-29.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
