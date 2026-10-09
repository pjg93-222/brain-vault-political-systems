---
type: fleeting
title: "Mentat studio members and figure strip (2026-10-08)"
aliases: ["mentat-studio-members-and-figure-strip-2026-10-08"]
source: "session"
captured_at: 2026-10-08
created_at: 2026-10-08
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-studio-members-and-figure-strip-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-08", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-studio-members-and-figure-strip-2026-10-08.md", sha256: "e9b8bbe651456e15b71ef4439315da6cf8ab376797f6b7e0e656ea5e9987ce0f"}
updated_at: 2026-10-08
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat studio members and figure strip (2026-10-08)

> Mentat 2026-10-08: Chart Studio members() 500-cap removed (fd6c2d520, left bundled per Paul) + figure export button strip (38fca2b65, 60e1f8a5b, pushed); verified live 8806 on every host

## Content

**members() cap (Chart Studio worksheet mode, chart-studio.js ~1412-1438).** The function stopped at 500 distinct values and sorted after the cut. That broke Pages ("1 of 500"), the filter checklist and its search, Select all (it wrote an `in` filter of only 500 values, silently giving wrong totals), the filter count, and the Subject and Overview selects. Paul's go was "go ahead with the members() fix and the test". The fix uses a Set and `Intl.Collator(undefined,{numeric:true}).compare`, which gives the same order as localeCompare (about 50 ms vs 1.5-2.1 s on 20k strings). The test is in mentat/app/tests/chart-studio-core.test.js and cuts members() out of the source with vm. Another process's batch commit swept it into fd6c2d520; Paul: "leave it as is". Live check: Downstream Activity 2024 Candidate pages "1 of 1382", and Select all gives "1382 of 1382 values" with totals unchanged.

**Figure export button strip.** Paul asked to "fix the pdf buttons so it doesn't overlap on anything". The button reads "Image" (PNG export) after b814fb317. The fix gives every host `.figure-pdf-strip{padding-top:30px!important}`, set by figure-pdf.js attach(), and moves the button to top:4px. build() uses stripOf() to leave the strip out of the export; a PNG A/B check was pixel-identical. Chart Studio's `roomHeight()` fits the chart to the canvas content box. Commit 38fca2b65. Follow-up 60e1f8a5b: `.worksheet-comparison button{min-height:36px}` had overridden the button, so the rule now also matches `body .figure-pdf-strip>.figure-pdf-btn`. Both are pushed to origin codex/mentat-crypto. Verified live: every host type on Graph, Insights, Forecast giving, Chart Studio and PAC evidence, with the checker validated against the old overlaps.

**Open (not fixed):**
- The filter "N more values" note counts values that don't match the search.
- members() rescans the rows on every call.
- The verified-mode facet is still capped at 100000.
- "Create chart" now opens Chart Studio; the classic dialog is reachable only via Advanced comparison.
- #evidence-add is dead UI.

**How to apply:** for the editing route from a worktree session, see `mentat-edit-from-worktree-session-2026-10-08`. In a hidden browser pane, rAF stalls, so figure-pdf attach() won't run; call `MentatPdf.attach()` before checking. Related: `mentat-pdf-export-and-worksheet-cache-2026-10-08`, `mentat-chart-studio-2026-09`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-08 from the Claude Code memory file `mentat-studio-members-and-figure-strip-2026-10-08.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
