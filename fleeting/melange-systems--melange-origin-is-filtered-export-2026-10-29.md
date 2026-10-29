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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-origin-is-filtered-export-2026-10-29.md", type: "claude-memory", synced_at: "2026-10-29", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-origin-is-filtered-export-2026-10-29.md", sha256: "b5e90fcf0e1b808f409cd472ae3d9e5bef111ac7515018837843d85ade1ff63b"}
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
Later on 2026-10-29 Paul reaffirmed verbatim "Push it. The SNA I told to push, push it." after hearing both facts; the overseer session then did the push itself, by an Opus agent, after a full-history secret/PII scan.

**How to apply:** never push from a lane session; land on local main after Opus review and tell the overseer. If Paul rules a raw push, restate the two facts once, then the overseer session pushes after a history scan (one writer per ref). See `melange-public-repo-unfiltered-branches-2026-10-18` `sna-health-lane-2026-10-28`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-29 from the Claude Code memory file `melange-origin-is-filtered-export-2026-10-29.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
