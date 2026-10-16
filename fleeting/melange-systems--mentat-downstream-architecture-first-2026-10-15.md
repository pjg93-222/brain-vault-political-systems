---
type: fleeting
title: "Mentat downstream architecture first (2026-10-15)"
aliases: ["mentat-downstream-architecture-first-2026-10-15"]
source: "session"
captured_at: 2026-10-15
created_at: 2026-10-15
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-downstream-architecture-first-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-15", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-downstream-architecture-first-2026-10-15.md", sha256: "a12079d1125dd9131baf28042201904415fc74ea786d079807c1e4b6733a3759"}
updated_at: 2026-10-15
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat downstream architecture first (2026-10-15)

> Paul 10-15 — Mentat downstream spending lane: finish architecture + correctness first; data collection runs later, on his call

## Content

Paul, 2026-10-15 ~16:30 CDT: "I want to focus more on finishing the architecture and making sure everything runs properly, I can run the data collection later." Barr/campaign-spending batch also deferred ("run that later").

**Why:** batch03 exposed superlinear ledger growth (245 MB to 4.3 GB in ~2.1k attempts) and throughput decay; D069/D070/D071/D072 were landing piecemeal.

**How to apply:** no new live batches (batch04+, priority/Barr) until Paul says. Build ONE integrated, reviewed collector release on production base a7790c96: D073 (origin-storage growth fix) then D071 (concurrency + crash recovery) then D072 (totals, candidate-to-committee mapping, priority, read_campaign_spending reader, append-only intent re-bind) plus D070 seeds, validator v6 and the generalized observer. Opus review, then a single owner-applied production patch (the auto-mode classifier blocks Claude's production apply; Paul applies). Workspace C:/Users/pgoff/Documents/Codex/2026-10-14/so; handoff outputs/MENTAT_FIXES_HANDOFF_2026-10-15.md §16. Higgsfield session owns the campaign-spending UI against the D072 fixture contract. Related: `verify-dont-infer-completion-2026-08-04`, `ask-before-substantive-changes`.

## Possible Connections

- [[mentat-console-pac-map-viz-lane]] — keyword match from recall, unverified
- [[2026-09-feature-mentat-failings-pac-evidence-pac-map-viz-lane]] — keyword match from recall, unverified
- [[2026-07-feature-data-collection-lanes-contact-inference]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-15 from the Claude Code memory file `mentat-downstream-architecture-first-2026-10-15.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
