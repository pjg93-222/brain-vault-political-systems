---
type: fleeting
title: "Public github releases ruling (2026-10-15)"
aliases: ["public-github-releases-ruling-2026-10-15"]
source: "session"
captured_at: 2026-10-15
created_at: 2026-10-15
status: "promoted"
promoted_to: "obsidian://open?vault=linked&file=knowledge%2Fcuration%2Fdelivery-and-release-evidence"
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/public-github-releases-ruling-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-15", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\public-github-releases-ruling-2026-10-15.md", sha256: "29f777102c3a67d5a0ecb08cb87b9d3638977cf2b431a60e08f8bccf911bab56"}
updated_at: 2026-10-15
updated_by: "codex/intake-curation"
tags: ["type/fleeting", "status/raw"]
curated_at: "2026-10-16"
---

# Public github releases ruling (2026-10-15)

> Paul 2026-10-15 chose public GitHub Releases + making the repo public for Mentat app updates; supersedes private-repo stance of D-139/D-148 for that purpose

## Content

Paul, 2026-10-15, verbatim: "Yes, I chose public GitHub Releases and making the repo public for app updates." This answered a question I raised after a Codex courier claimed he had chosen it. Codex is building the Electron updater: ops/desktop/client github-source/updater/trust .cjs plus packaging/github_release.py. The wiring session (local_4044bfbb, branch claude/mentat-app-updates-main) adds the commit-SHA stamp and an end-to-end proof on top of it.

**Why:** one update should reach every client ("send an update once, every platform receives it").

**How to apply:**
- Earlier private-repo rulings (D-139 no public history, D-148 no history rewrite because the repo is private) are superseded for the app-update repo. Draft a brain DECISIONS entry to record it.
- Before the visibility flip, a full-history secret scan must pass. Older commits may hold credentials, e.g. the probe-lock password literal noted in brain STATE.
- ~~The flip, pushes, releases and signing stay Paul's actions at the time.~~ Superseded 2026-10-15. Paul gave a standing yes for the app-update lane: "You have my yes no matter what it brings". That covers the visibility flip, pushes, GitHub Releases and real-key signing. Still run the secret scan and report its findings, so he can rotate keys; it does not block the flip. Note: when I tried to relay this blanket yes to the wiring session, the permission classifier blocked it as data exfiltration. Paul has to give it directly in the session that does the publishing, or do the flip himself. Do not route it through peers.
- Related: `land-means-in-the-app-2026-10-15`, `deployment-lane-2026-10-11`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-15 from the Claude Code memory file `public-github-releases-ruling-2026-10-15.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
