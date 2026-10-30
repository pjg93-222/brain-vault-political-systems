---
type: topic
title: "Figure export, worksheet cache and Chart Studio fixes (2026-10-08) (Mentat console UI)"
aliases: ["Mentat console UI: Figure export, worksheet cache and Chart Studio fixes (2026-10-08)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-10-10
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-pdf-export-and-worksheet-cache-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-pdf-export-and-worksheet-cache-2026-10-08.md", sha256: "e15296e09b9f319075ca6816fca7c3371c39f8af6a748e71e923b6e3148aafa7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-studio-members-and-figure-strip-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-studio-members-and-figure-strip-2026-10-08.md", sha256: "e77e79c1b2dd9426d7f26d746598f323a8dec0e8af9e03e76684e6c2bacd286c"}
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/frontend", "category/feature"]
part_of: "[[2026-09-feature-mentat-console-ui]]"
---

# Figure export, worksheet cache and Chart Studio fixes (2026-10-08) (Mentat console UI)

> The Mentat console lane of 2026-10-08: one-click figure export (first PDF, then PNG), the worksheet response cache and single-scan fixes for Chart Studio latency, the uncapped Chart Studio members() list and the figure export button strip. Part of [[2026-09-feature-mentat-console-ui]] (project [[mentat]]).

## Figure export and worksheet cache (memory `mentat-pdf-export-and-worksheet-cache-2026-10-08`)

Paul (2026-10-08): "screenshot any visualization and save it as a pdf" (PAC Evidence, Graph, Chart Studio, Insights) + "latency for the graph studio is incredibly bad" (= Chart Studio). Chose: F1+F3, prewarm INSTEAD of F2 (native Rust reader dropped), one-click .pdf download (not print dialog).

**Built, verified, LIVE, UNCOMMITTED** (as first recorded on 2026-10-08; committed later the same day, see below) in `C:\Users\pgoff\Mentat\mentat` (the 17 `.bak-20261008` backups were moved to the Recycle Bin on Paul's ask, 2026-10-08; note a .bak inside `templates\` breaks test_console_templates):
- PDF: new `app\figure_pdf.py` + `app\figure-pdf.js`; POST `/api/export/pdf` (behind the token/Origin gate, allowed in `--read-only`, 40 MB cap, CSP meta first, all `<style>`/`<script>` dropped from client markup after Opus found an `<svg><style>` breakout, stale `mentat-pdf-*` temp dirs swept at 10 min). Per-figure buttons only (no export-menu items). About 1.3-2 s click-to-file. Cosmetic open: the forecast PDF duplicated the title + blank space below (fixed later the same day, below).
- F1: `report_insights.worksheet_entry` via `response_cache` (memory+disk, single-flight, ETag/304, refusals cached; deps include the audit manifest). Beneficiary Bridge warm 0.22 s -> 0.016 s; >50k refusal 4 s -> 0.02 s on repeat.
- F3: `sources=` threaded so verified queries scan the report folder once (3 -> 1); `_json`/`_payload_metadata` memoised by stamp; `changed_since_scan` keeps the replaced-report guard.
- Prewarm: `worksheets` kind in `prewarm.py` (rank 9). Known low gap: a corrupt workbook fails the industry task instead of skipping.
- Tests: test_report_data_cache (13), test_contribution_scan_once (7), test_figure_pdf (3). `test_records_sidecar.test_one_build_across_threads` is FLAKY under load (identical code passes in a scratch copy); not this lane.

**Restart:** 8806 restarted by hand (pid 34612), NOT via `Start-MentatApp.ps1` or `/api/restart`, because the launcher tries saved port 8807 first and would have killed the OTHER console there. 8807 (same data root; the desktop port receipt points there) restarted the same way on Paul's "restart 8807 too" -> pid 37340, new code, smoke PASS. Relaunch gotcha: quote `"C:\Program Files\R\R-4.6.0\bin\Rscript.exe"` or argparse exits and nothing listens.

**Later 2026-10-08 (all committed + pushed, live on 8806 pid 73124 / 8807 pid 69696, cwd "Mentat Complete Files"):** PDF title-once fix `5efd65bb7`; Paul: "saved as images" -> export is now 2x PNG via Edge `--screenshot` (`b814fb317`; the route is still `/api/export/pdf`). The same memory's forecast items (the LDA quarterly lobbying nowcast `7f13e9247` and the Telecom giving rulings of 2026-10-09) are recorded in the Giving by cycle live model part of the forecast topic. Related memories: `mentat-chart-studio-2026-09`, `ask-before-substantive-changes`, `mentat-forecast-overnight-2026-10-07`.

## Chart Studio members() cap and the figure export button strip (memory `mentat-studio-members-and-figure-strip-2026-10-08`)

- **members() cap (Chart Studio worksheet mode, `chart-studio.js` ~1412-1438).** The function stopped at 500 distinct values and sorted after the cut. That broke Pages ("1 of 500"), the filter checklist and its search, Select all (it wrote an `in` filter of only 500 values, silently giving wrong totals), the filter count, and the Subject and Overview selects. Paul's go was "go ahead with the members() fix and the test". The fix uses a Set and `Intl.Collator(undefined,{numeric:true}).compare`, which gives the same order as localeCompare (about 50 ms vs 1.5-2.1 s on 20k strings). The test is in `mentat/app/tests/chart-studio-core.test.js` and cuts members() out of the source with vm. Another process's batch commit swept it into `fd6c2d520`; Paul: "leave it as is". Live check: Downstream Activity 2024 Candidate pages "1 of 1382", and Select all gives "1382 of 1382 values" with totals unchanged.
- **Figure export button strip.** Paul asked to "fix the pdf buttons so it doesn't overlap on anything". The button reads "Image" (PNG export) after `b814fb317`. The fix gives every host `.figure-pdf-strip{padding-top:30px!important}`, set by `figure-pdf.js` attach(), and moves the button to top:4px. build() uses stripOf() to leave the strip out of the export; a PNG A/B check was pixel-identical. Chart Studio's `roomHeight()` fits the chart to the canvas content box. Commit `38fca2b65`. Follow-up `60e1f8a5b`: `.worksheet-comparison button{min-height:36px}` had overridden the button, so the rule now also matches `body .figure-pdf-strip>.figure-pdf-btn`. Both are pushed to origin `codex/mentat-crypto`. Verified live: every host type on Graph, Insights, Forecast giving, Chart Studio and PAC evidence, with the checker validated against the old overlaps. Brain record: D-123.
- **Open (not fixed):** the filter "N more values" note counts values that don't match the search; members() rescans the rows on every call; the verified-mode facet is still capped at 100000; "Create chart" now opens Chart Studio, and the classic dialog is reachable only via Advanced comparison; `#evidence-add` is dead UI.
- **How to apply:** for the editing route from a worktree session, see the memory `mentat-edit-from-worktree-session-2026-10-08` (recorded in the Mentat repo-state topic). In a hidden browser pane, rAF stalls, so figure-pdf attach() won't run; call `MentatPdf.attach()` before checking. Related memories: `mentat-pdf-export-and-worksheet-cache-2026-10-08`, `mentat-chart-studio-2026-09`.
