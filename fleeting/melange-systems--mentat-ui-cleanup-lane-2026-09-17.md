---
type: fleeting
title: "Mentat ui cleanup lane (2026-09-17)"
aliases: ["mentat-ui-cleanup-lane-2026-09-17"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[2026-09-feature-mentat-console-ui]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-ui-cleanup-lane-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-ui-cleanup-lane-2026-09-17.md", sha256: "c66638ad1a5f87989cc03073e0979a9e77a0b3d48c9d9be91ad9634eb7894f51"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat ui cleanup lane (2026-09-17)

> UI clean-up lane (UI1) for the Mentat console Graph and Chart Studio - Graph B + Chart Studio A built, patch UI1_graph_studio_cleanup.patch awaits Paul's commit; Board deferred with its contract v2 drafted; the three-lane shared-file discipline and the incomplete-patch trap

## Content

UI clean-up pass (UI1) after S5, 2026-09-17, same worktree session; code in
C:\Users\pgoff\Mentat on codex/mentat-crypto. Paul's brief: "the aim is ease of use,
conciseness, symmetry, de-cluttering, and depth of visualization". Four HTML mockups in the
ACU theme, rendered to PNG; Paul: "Graph B, Chart Studio A, the C Board can be used for
multiple charts together". Packet: `audits/mentat_failings_20260915/UI_CLEANUP_DESIGN_2026-09-17.md`
plus `UI_CLEANUP_MOCKUPS_2026-09-17.html`.

**State:** `patches/UI1_graph_studio_cleanup.patch` (16 files, +1854/-142) cut as bytes and
proven with `git apply --cached --check` against HEAD a9ed5c236. AWAITING PAUL'S COMMIT, then
the launcher on 8806. Built: Graph one filter row + gold "Open in Chart Studio" + overflow,
four Overview panels in one shared chrome with per-panel Top N, share-of-scope on every bar,
party dots, company sparklines, stacked employee-level bar; Chart Studio five chrome rows ->
two. Measured: studio 66 -> 47 controls, canvas top 787 -> 613px, Inspector 2 -> 1 scrollbar.
NOT built: the Board, `Split by`, the Show Me popover (ruled out). Board contract v2 is drafted
and UNAPPLIED at the session scratchpad's `studio_api_v2.py` (optional top-level `board`
{tiles, slots}); applying it reddens the python contract suite until `Console.save_view`
whitelists and validates `board`, so apply it only when that build starts. Brain D-041.

**Traps worth carrying:**
- **Cut the patch from the builder's own file list, never from the list you wrote before the
  build.** My first cut missed four files the builder had touched, including `acu-theme.css`
  (the party colour tokens) and a one-line `chart-comparison.js` fix without which the new
  segmented control loses a button. `git diff --stat` on a guessed list looks complete.
- **Three lanes edit `index.html` and `workspace.css` at once.** Classify every hunk by content
  and emit only your own; never write either file whole (a whole-file write dropped ~150 lines
  of another lane's rules). Whoever lands second re-runs `--check` against the new HEAD.
- **Do not "restore" lines another lane deleted.** I ordered a restore of evidence-CSV rules;
  their markup was retired, so restoring would have re-added dead code. Hunk-exact cutting is
  the protection, not restoration.
- **A red suite needs a negative control on pre-change bytes before you own it.**
  `test_console_browser.cjs` is red in the PAC evidence block on unmodified bytes too.
- **A design acceptance line can be wrong.** Four Overview panels do not fit 900px at the
  design's own default Top N of 10 (measured 1328px); they fit at 5.
- Graph's visible-control count ROSE, 26 -> 32, because option B shows four panels where there
  were two. Conciseness landed in Chart Studio; that trade is what option B is.

Related: `mentat-failings-lane-s5-2026-09-17`, `mentat-failings-lane-s4-2026-09-16`,
`higgsfield-connector-account-trap-2026-09-17`, `reasoning-in-fable-code-in-opus-2026-09-16`,
`go-faster-directive-2026-09-16`, `ui-simplification-2026-08-11`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): COMMITTED

## Possible Connections

- [[2026-09-feature-mentat-console-ui]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `mentat-ui-cleanup-lane-2026-09-17.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-09-feature-mentat-console-ui]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
