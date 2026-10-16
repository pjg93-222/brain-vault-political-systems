---
type: fleeting
title: "Land means in the app (2026-10-15)"
aliases: ["land-means-in-the-app-2026-10-15"]
source: "session"
captured_at: 2026-10-15
created_at: 2026-10-15
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/land-means-in-the-app-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-15", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\land-means-in-the-app-2026-10-15.md", sha256: "c607b4bdc518128ca5b31b2116db0b99b1d6c32fa46f2f568de79edd29b83fe7"}
updated_at: 2026-10-15
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Land means in the app (2026-10-15)

> Paul 2026-10-15 — "committed" means in the containerized app he runs, never just the source repo or a browser tab; source repo must feed the app so updates reach all clients

## Content

On 2026-10-15 I reported the Mentat sankey work as "landed" because it was committed on codex/mentat-crypto in C:\Users\pgoff\Mentat and checked in a browser tab on localhost. Paul, verbatim: "It has NOT been committeed to the app, what are you committing too? I noticed when you opened it opened in google, and not the containerized app, that is what needs to be committeed too, always". Then: "The source repo needs to be directly tied to the app, that way updates can be sent out across all clients".

**Why:** Paul uses the containerized/packaged app, not a localhost page. A commit that never reaches the app is not delivered (same lesson as `melange-retheme-2026-08-06`: building is not delivering).

**How to apply:**
- "Land" or "commit to the app" means the change is running in the containerized app Paul uses. Verify it there: the app's own window or build stamp, not a Chrome or browser-pane tab.
- Never report "landed" from a source-repo commit alone. Say "in source, not yet in the app".
- Paul's goal: one source repo wired to the app so a single update reaches every client ("send an update once, every platform receives it"; see `deployment-lane-2026-10-11`).
- Outward steps (pushes, VPS, publishing) and live server restarts still need Paul's yes at the time.

## Possible Connections

- [[mentat-console-pac-map-viz-lane]] — keyword match from recall, unverified
- [[2026-09-feature-mentat-failings-pac-evidence-pac-map-viz-lane]] — keyword match from recall, unverified
- [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-15 from the Claude Code memory file `land-means-in-the-app-2026-10-15.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
