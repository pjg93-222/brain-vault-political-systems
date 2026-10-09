---
type: fleeting
title: "Data presentation fixes (2026-10-09)"
aliases: ["data-presentation-fixes-2026-10-09"]
source: "session"
captured_at: 2026-10-09
created_at: 2026-10-09
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/data-presentation-fixes-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\data-presentation-fixes-2026-10-09.md", sha256: "7eead6e6d9bb735454e3f7e594d690ff3205a807b8938cf9be2c08fd7520733d"}
updated_at: 2026-10-09
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Data presentation fixes (2026-10-09)

> Seven data-presentation fixes (LDA never summed, roster year, Conduit, coverage gaps, downstream labels, transfer paths, own ratio); Mentat PR #4 merged (111c417e7); Melange local-only; published books left stale by ruling

## Content

2026-10-09 lane (Paul's brief: "Fix data-presentation bugs in two local repos", FIX 1-7). State at close:

- **Mentat:** PR https://github.com/pjg93-222/Melange/pull/4 MERGED into codex/mentat-crypto as 111c417e7 (a11e8b186 fixes, cb0d4fb48 the parallel session's LD-2 quarter rule, 9a13f5057 Conduit in R/builder plus leftovers). The Mentat checkout is back on codex/mentat-crypto. Consoles restarted by hand on this code: 8806 pid 32616, 8807 pid 38192 (base Python312, not venv, as before).
- **Melange:** branch claude/lda-series-fixes-20261009 (914623152 LDA fix, 8ce0de303 + d2954e8cf from the parallel regression-test session, 34710299f deploy script + filings-page quarter). Local + local mirror only. GitHub can't take it: origin has no main, so a push carries 638 commits / 2.94 GiB with audits/legfix5 files up to 2.76 GB (over GitHub's 100 MB limit). Paul: "Keep it local". The LIVE tree is now ON THAT BRANCH, not main, so other sessions' commits land on it.
- **Rulings (Paul, 2026-10-09):** ActBlue C00401224 / WinRed C00694323 = "Conduit" category (console relabels at read time; future workbooks get their own Conduit row/channel: "Add a Conduit row"). "Leave the books as they are": six served books built before 2026-09-08 (Telecom, Credit Arms, Credit Union, Crypto, Fintech, P&C) still say Super PAC in their Excel cells. "keep the dark slate colour" = #1f242b. LDA through_quarter counts a quarter only once its LD-2 deadline has passed by the producer's sweep date (fullscope_receipts.json).
- **Acceptance confirmed on screen:** Telecom 2025 $102.4M in-house / $37.0M outside-firm fees, "2025: 24 organizations · 532 named lobbyists"; Conduit/ACTBLUE $1,594,803.86, Super PAC $50,202.51, total $7,256,093.45; Comcast 2025-26 "77% of FEC-reported records"; downstream title + direct amounts (Hagerty $349,744 reached · $100 direct once FIX 6 traces transfers); transfer note "first 10,000 of 230,075 rows"; Telecom own ratio ×1.44.

**Why:** the served Telecom book is the 2026-07-29 build made before 4f6a6f564 moved conduits to Carey; rebuilding would move totals under newer rules and stop the forecast (anchor_stale), so Paul kept the books.

**How to apply:**
- Editing app/contribution_semantics.py makes running consoles refuse queries ("Field definitions changed") until restart. Editing contribution_data.py changes the facts-store token and rebuilds every industry's store: avoid it.
- Static JS/CSS ETags are latched until restart (browsers get 304s), so restart after asset edits.
- Audited transfer paths feed the Graph only (report_transfers(audited=True)); Flow is unchanged by design.
- fec/deploy_lobby_pages.ps1 is restored; -SkipLedger now forces the ledger rebuild off.
- tools/verify_repaired_reports.py now expects Conduit, so books built before this ruling fail it by design.
- Republishing any book stops its forecast until the console index and the anchors are rebuilt.

Related: `mentat-lda-deadline-rule-2026-10-09`, `bug-report-regressions-six-fixed-2026-10-09`, `mentat-pdf-export-and-worksheet-cache-2026-10-08`, `dont-be-jumpy-removing-money-2026-09-26`, `live-tree-branch-state-2026-07-14`.

## Possible Connections

- [[2026-07-bugfix-mentat-collection-and-attribution-audit-r12-trade-association]] — keyword match from recall, unverified
- [[mentat-fec-pipeline-history-audit-r12]] — keyword match from recall, unverified
- [[mentat-console-pac-map-viz-lane]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `data-presentation-fixes-2026-10-09.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
