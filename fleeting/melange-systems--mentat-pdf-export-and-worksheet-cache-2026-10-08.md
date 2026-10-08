---
type: fleeting
title: "Mentat pdf export and worksheet cache (2026-10-08)"
aliases: ["mentat-pdf-export-and-worksheet-cache-2026-10-08"]
source: "session"
captured_at: 2026-10-08
created_at: 2026-10-08
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-pdf-export-and-worksheet-cache-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-08", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-pdf-export-and-worksheet-cache-2026-10-08.md", sha256: "a24be0fe6e7d6dcee6b6f612504870acd077340304c3630d0d6eab9e37401fe5"}
updated_at: 2026-10-08
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat pdf export and worksheet cache (2026-10-08)

> Mentat 2026-10-08: one-click figure PDF (headless Edge) + /api/report-data response cache (F1), one scan per request (F3), worksheets prewarm; LIVE on 8806 pid 34612, UNCOMMITTED; 8807 console still stale

## Content

Paul (2026-10-08): "screenshot any visualization and save it as a pdf" (PAC Evidence, Graph, Chart Studio, Insights) + "latency for the graph studio is incredibly bad" (= Chart Studio). Chose: F1+F3, prewarm INSTEAD of F2 (native Rust reader dropped), one-click .pdf download (not print dialog).

**Built, verified, LIVE, UNCOMMITTED** in C:\Users\pgoff\Mentat\mentat (the 17 `.bak-20261008` backups were moved to the Recycle Bin on Paul's ask, 2026-10-08; note a .bak inside templates\ breaks test_console_templates):
- PDF: new app\figure_pdf.py + app\figure-pdf.js; POST /api/export/pdf (behind token/Origin gate, allowed in --read-only, 40 MB cap, CSP meta first, all <style>/<script> dropped from client markup after Opus found an <svg><style> breakout, stale mentat-pdf-* temp dirs swept at 10 min). Per-figure buttons only (no export-menu items). ~1.3-2 s click-to-file. Cosmetic open: forecast PDF duplicates the title + blank space below.
- F1: report_insights.worksheet_entry via response_cache (memory+disk, single-flight, ETag/304, refusals cached; deps include audit manifest). Beneficiary Bridge warm 0.22 s -> 0.016 s; >50k refusal 4 s -> 0.02 s on repeat.
- F3: `sources=` threaded so verified queries scan the report folder once (3 -> 1); `_json`/`_payload_metadata` memoised by stamp; `changed_since_scan` keeps the replaced-report guard.
- Prewarm: `worksheets` kind in prewarm.py (rank 9). Known low gap: corrupt workbook fails the industry task instead of skipping.
- Tests: test_report_data_cache (13), test_contribution_scan_once (7), test_figure_pdf (3). test_records_sidecar.test_one_build_across_threads is FLAKY under load (identical code passes in scratch copy) — not this lane.

**Restart:** 8806 restarted by hand (pid 34612) — NOT via Start-MentatApp.ps1 or /api/restart, because the launcher tries saved port 8807 first and would have killed the OTHER console there. 8807 (same data root, desktop port receipt points there) restarted the same way on Paul's "restart 8807 too" -> pid 37340, new code, smoke PASS. Relaunch gotcha: quote "C:\Program Files\R\R-4.6.0\bin\Rscript.exe" or argparse exits and nothing listens.

**Later 2026-10-08 (all committed + pushed, live on 8806 pid 73124 / 8807 pid 69696, cwd "Mentat Complete Files"):** PDF title-once fix 5efd65bb7; Paul: "saved as images" -> export is now 2x PNG via Edge --screenshot (b814fb317; route still /api/export/pdf). Lobbying projection replaced by LDA quarterly NOWCAST (7f13e9247), Paul's rulings "1 yes, 2 remaining, 3 up-to-3, 4 yes, 5 b": pred = O + (1-s)B, s = geo-mean same-quarter share over up to 3 prior years; 80% band = pooled blind errors (bank/CU/telecom/fintech, n=32; log half-widths Q1 .132 Q2 .099 Q3 .041); "~95%" = largest blind miss, labelled n=32; 2027-28 chained with LobbyView persistence in quadrature. Telecom offered LOBBYING-ONLY (giving withheld: no OpenSecrets scope / IBIS path — option (a) B08/B09 proxy + wireless+cable IBIS = Paul's ruling, open). Explicit `lobbying_only` bundle flag gates the cycle-model check skip. Live bundle refit-20261008-d861bf29-1cda1631d7d7 (bundles gitignored). Paul's standing ask: every industry with data should be added to the forecast. Paul was told plainly: cycle-ahead general giving blind A = 66.1 for banks (biased high); the 97.8 is the in-cycle PAC nowcast — never conflate them.

Related: `mentat-chart-studio-2026-09`, `ask-before-substantive-changes`, `mentat-forecast-overnight-2026-10-07`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-08 from the Claude Code memory file `mentat-pdf-export-and-worksheet-cache-2026-10-08.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
