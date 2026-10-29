---
type: fleeting
title: "Sna health lane (2026-10-28)"
aliases: ["sna-health-lane-2026-10-28"]
source: "session"
captured_at: 2026-10-28
created_at: 2026-10-28
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sna-health-lane-2026-10-28.md", type: "claude-memory", synced_at: "2026-10-28", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sna-health-lane-2026-10-28.md", sha256: "b7446cc4df3a11bb4e07df1730b440c5710cb12fc0919b3c106000b775efc24f"}
updated_at: 2026-10-28
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Sna health lane (2026-10-28)

> SNA health check (D-410) landed 2026-10-28 — live_sync audit block, edge-file re-hash, chain-tail guard; what stayed open and what the premise got wrong

## Content

SNA health lane (D-410) ran 2026-10-28 in its own session; report at `C:\Users\pgoff\OneDrive\Desktop\SNA-HEALTH-REPORT-2026-10-28.md`.

Landed on local main 9a857f7a1 (lane/sna-health: 9b35a8198 build, 9a857f7a1 review fixes), NOT pushed: the auto-mode classifier denied `git push origin lane/sna-health` as publication. Research vault systems-note fixes committed locally at b1e11fc33 (branch master), not pushed.

What landed: `fec/audit/live_sync.py` + audit_full `[SYNC] Live sync` block with five `live_sync_*` checks (chain journal closed for THIS root, sentinel xlsx sha, staffer inputs incl. edge file, press body-attempt ledger sha, status files); audit_full `[STAFF]` loop no longer skips the `not_recomputed` edge role (re-hashes the 574 MB file, ~2.7 s); producer writes `meta.bound_against`; chain-tail guard in weekly_refresh.py AND refresh_tick.py requires the literal `live_sync_chain_journal_closed` in audit_full.py.

Premise corrections: the pinned 09-08 edge file is 573.6 MB (1.5 GB files are v3-v5 generations); `meta.bound_against` was null, not []; `build_press_engine_feed.py` lives under `fec/collect/`, not `fec/surfaces/`.

Still open (Paul's rulings, listed in the report): route search (`cosponsor_route.py`) stays audit-only, not a chain step; staffer generation pinned at 09-08, canonical_eligible false (D-021); chain floor 30 GB vs ~16 GB free; classifier weekly quota; weekly refresh proof is Sunday 11-01; groups loop keeps its own not_recomputed exemption.

**Why:** avoid re-deriving the lane state or re-attempting the denied push next session.
**How to apply:** treat the push as blocked until Paul pushes or rules; the live_sync FAILs are hard (not on the ratified dissent list). See `melange-public-repo-unfiltered-branches-2026-10-18` `no-redesign-of-working-components-2026-10-27`.

## Possible Connections

- [[2026-09-feature-staffer-network-data-and-math-sna-math-and-clique-lane]] — keyword match from recall, unverified
- [[2026-10-troubleshooting-melange-main-reconcile]] — keyword match from recall, unverified
- [[research-vault]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-28 from the Claude Code memory file `sna-health-lane-2026-10-28.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
