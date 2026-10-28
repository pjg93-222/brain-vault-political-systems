---
type: fleeting
title: "No redesign of working components (2026-10-27)"
aliases: ["no-redesign-of-working-components-2026-10-27"]
source: "session"
captured_at: 2026-10-27
created_at: 2026-10-27
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/no-redesign-of-working-components-2026-10-27.md", type: "claude-memory", synced_at: "2026-10-27", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\no-redesign-of-working-components-2026-10-27.md", sha256: "4b62fbd611ad3449f4d2ccf86c6a589e0c046b5fb9127120754976ac85159391"}
updated_at: 2026-10-27
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# No redesign of working components (2026-10-27)

> Never change HOW a working collector or pipeline step operates without Paul's explicit OK; changes must prove parity against the last known-good real run

## Content

Never replace or redesign the mechanism of a component that already works: its source, transport, browser approach, pages visited, or wait and fallback logic. This needs Paul's explicit go-ahead. Efficiency changes are allowed only if behaviour is identical.

**Why:** on 2026-10-27 Paul found that a Claude lane had rebuilt the Congress.gov bill-discovery collector away from his original web-scraping design, which worked ("we had this down to an art"). The new version timed out on Cloudflare and silently fell back to GovInfo bulk data while reporting success. It was merged on unit tests and agent summaries, with no comparison against a real run. The D-330 gate exception had the same pattern: it waived far more than the ruling allowed.

**How to apply:**
- Before merging any collector or pipeline change, show on a real run the same source, the same pages or policy areas, and record counts within 10% of the last known-good run. Unit tests alone are not enough.
- A fallback must report DEGRADED and name the source it used, never PASS or complete. Same principle as `press-backlog-media-status-are-bugs-2026-10-15`.
- When reviewing agent reports, check the evidence against the last good run. Don't accept the summary on its own.
- Run fewer parallel lanes on shared, working code.

Related: `verify-dont-infer-completion-2026-08-04`, `melange-vote-sources-not-blocked-2026-10-26`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-27 from the Claude Code memory file `no-redesign-of-working-components-2026-10-27.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
