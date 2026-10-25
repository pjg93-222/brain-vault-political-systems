---
type: fleeting
title: "Mentat sankey zoom lane (2026-10-15)"
aliases: ["mentat-sankey-zoom-lane-2026-10-15"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-sankey-zoom-lane-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-25", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-sankey-zoom-lane-2026-10-15.md", sha256: "1fd3945dd93b32edf6269e496ffe3939081e9870c313de2295bd7df23be45856"}
updated_at: 2026-10-25
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat sankey zoom lane (2026-10-15)

> Mentat flow sankey focus zoom / unfold / pin + bug fixes LANDED on codex/mentat-crypto (abdbd5524, 6dc3dac91); not pushed; 8806 restart is Paul's

## Content

Paul approved 2026-10-15: keep the current sankey as the default view, add focus zoom (click a committee), expand in place (Other / Small transfers), and pin/link routes, and fix the bugs found. "Random code names" meant raw FEC committee IDs; they now show names from the local cm*.txt committee master (cycle-matched; "Unnamed committee" when absent, never invented).

Landed by cherry-pick onto C:\Users\pgoff\Mentat codex/mentat-crypto as abdbd5524 + 6dc3dac91 (built in worktree C:\Users\pgoff\Mentat-worktrees\sankey-zoom, branch claude/sankey-zoom-20261015). JS suite 757/0 in the live tree. NOT pushed. Paul restarts 8806 himself.

Integrity rule applied (my call, keep it): in reported mode a pin stops at the first pooling committee; that committee's onward spending is hatched and listed as "spending from its pool (all donors)". Never show a carried company-to-candidate total.

Known gaps: Banking "Other committees" / "Party committees" / "Other banking companies" refuse to unfold (the server buckets lack per-member links; fixing that needs a server change). The cold first industry read is 30-100 s in graph_data.py (not touched; it was dirty from another lane). Pins on a company with many recipients make the chart busy; the panel lists one chain. Mockups and screenshots: Melange audits/mentat_sankey_zoom_20261015.

**Why:** Paul wanted drill-down without the chart becoming incomprehensible.
**How to apply:** treat the pin pool-split as settled; build any follow-ups on these commits. See `mentat-chart-studio-2026-09` and `mentat-edit-from-worktree-session-2026-10-08`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): LANDED abdbd5524+6dc3dac91,unpushed;pins stop at pools;Banking Other unfold gap

**2026-10-25 correction (Haiku, Wave 5 verification):** "NOT pushed" is stale. In C:\Users\pgoff\Mentat, `git merge-base --is-ancestor` confirms abdbd5524 and 6dc3dac91 are ancestors of the origin tip ed68856457ba (`git ls-remote origin` on 2026-10-25 lists refs/heads/codex/mentat-crypto at that commit). The sankey commits are on origin.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-25 from the Claude Code memory file `mentat-sankey-zoom-lane-2026-10-15.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
