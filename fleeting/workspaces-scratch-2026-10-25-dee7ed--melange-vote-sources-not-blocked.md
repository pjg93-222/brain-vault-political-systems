---
type: fleeting
title: "Melange vote sources not blocked"
aliases: ["melange-vote-sources-not-blocked"]
source: "session"
captured_at: 2026-10-26
created_at: 2026-10-26
status: "raw"
promoted_to: ""
project: "workspaces-scratch-2026-10-25-dee7ed"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-25-dee7ed/memory/melange-vote-sources-not-blocked.md", type: "claude-memory", synced_at: "2026-10-26", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-25-dee7ed\\memory\\melange-vote-sources-not-blocked.md", sha256: "cefa6f3f3d9465af124c29c89731fae05ef92fb2bf988f6d905fc990411b276a"}
updated_at: 2026-10-26
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Melange vote sources not blocked

> Melange vote snapshot staleness (Oct 2026) was upstream data, not a fetch block; senate.gov 403s all scripted clients; clerk returns 200 for missing rolls

## Content

Diagnosed 2026-10-26. The Melange vote snapshot feed is Voteview via `fec/legislation/refresh_vote_sources.py` (urllib); it never regressed and PASSed 2026-10-25. Snapshot end (House roll 314 on 2026-09-16, Senate vote 256 on 2026-09-30) matches upstream: Voteview files Last-Modified 2026-10-01, and clerk confirms no House roll 315 (pre-election recess, pro forma sessions only).

- senate.gov LIS XML: Akamai 403 to python, curl, PowerShell, IPv4 and IPv6 from Paul's machine. Not a code change; do not evade. Browser test decides IP block vs scripted-client block.
- clerk.house.gov evs: missing roll = HTTP 200 + 65-byte "Error sanitizing file" body.
- Schannel "revocation offline" = flaky IPv6 to Let's Encrypt CRL host; Python unaffected. IT cert is Intune MDM, not TLS inspection.

**Why:** Paul read the stale snapshot as "blocked"; the next stale-vote report should check upstream dates first.
**How to apply:** before debugging fetch code for vote staleness, compare Voteview Last-Modified and clerk roll existence. Full table: side-session-notes VOTEFETCH-report.md.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-26 from the Claude Code memory file `melange-vote-sources-not-blocked.md` of project `workspaces-scratch-2026-10-25-dee7ed` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
