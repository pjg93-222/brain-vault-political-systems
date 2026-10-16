---
type: fleeting
title: "Mentat lda deadline rule (2026-10-09)"
aliases: ["mentat-lda-deadline-rule-2026-10-09"]
source: "session"
captured_at: 2026-10-11
created_at: 2026-10-11
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[giving-forecast-pipeline]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-lda-deadline-rule-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-11", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-lda-deadline-rule-2026-10-09.md", sha256: "8b83fc7f1728f6fa4dab3b4bee736193b72b8cc22dd6f9c9ea291f9c71625597"}
updated_at: 2026-10-11
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat lda deadline rule (2026-10-09)

> Mentat LDA anchors count a quarter only after its LD-2 deadline by Melange's sweep date (brain D-130); commit cb0d4fb48, on origin; anchors rebuilt 2026-10-09T18:10Z under the rule (LDA blocks unchanged)

## Content

Ruling and rule: brain D-130 (Paul, 2026-10-09, "go ahead, apply it and commit"). Do not restate it here; read D-130.

**State (2026-10-09):** Mentat commit cb0d4fb48 on branch claude/mentat-data-presentation-fixes-20261009 (C:\Users\pgoff\Mentat). It is on GitHub: origin's branch head 9a13f5057 (a later commit by another session) contains it, checked 2026-10-09 with ls-remote and merge-base. It touches 5 files: lda.py, build_giving_anchors.py, anchors README, test_giving_anchors.py, test_giving_lda_history.py. 267 tests OK in the live tree. No console restart was needed, because the console never imports lda.py. On Paul's ask ("rebuild the anchors"), the anchors were rebuilt at 2026-10-09T18:10:32Z: one full build, exit 0, 265.65 s against 56.55 s for the previous build. The slowdown came from an orphaned grep competing for disk while the laptop ran on battery; see `orphaned-grep-slowdown-2026-10-09`.
- Versus the 04:17Z snapshot, only three things changed: built_at_utc, builder.code_sha256, and credit_unions.mentat.index_token. The credit-union index file was rewritten at 13:35 -0400 with identical values.
- The LDA blocks and lda_nowcast_errors are identical, all through Q2.
- The receipt now records fullscope_receipts.json as an input (role lda_receipts).
- `--check` reports all fresh.
- 8806 and 8807 both serve the new snapshot with no restart. The pre-rebuild snapshot and receipt are backed up in session 36662ddb's scratchpad\anchors-rebuild\before.
- At 14:04 another session switched the live tree to codex/mentat-crypto (111c417e7). That branch contains cb0d4fb48.

**Watch:** Q3's LD-2 deadline is 2026-10-20. Once Melange re-sweeps past that date (scope_sweeps.2026.sweep_through_dt_posted >= 2026-10-20), the next anchor build moves every sector to Q3, together with the Q3 nowcast cut and bands. Nothing schedules anchor builds: no task or endpoint was found, although the contracts README claims they run "nightly". ~~(stale)~~ **Superseded 2026-10-11:** Windows tasks now exist (FC-1, queue clear-out): `MentatNightlyAnchors` daily 03:30 (build_giving_anchors.py, 45 min cap) and `MentatRefitWatcher` daily 04:00 (run_refit.R --mode detect, 20 min cap); user, logged-on only, Limited; wrapper `%LOCALAPPDATA%\Mentat\scheduled\run_logged.ps1`, logs `%LOCALAPPDATA%\Mentat\logs\scheduled\`. So once the sweep passes 10-20, the next nightly build moves every sector to Q3 on its own.

**Why:** an early $0 crypto Q3 filing made the old filings>0 rule report "through Q3" and nowcast with Q3 observed as $0.

**How to apply:** if someone asks why a sector shows Q2 while it has Q3 filings, check the sweep date against the deadline first. If fullscope_receipts.json is missing, the LDA block is unavailable by design (fail closed). Scratch evidence (patch, impact.txt): session 36662ddb's scratchpad\lda-deadline.

Related: `mentat-pdf-export-and-worksheet-cache-2026-10-08` (nowcast rulings), `mentat-edit-from-worktree-session-2026-10-08`, `brainlink-knowledge-system-2026-10-05`.

## Possible Connections

- [[giving-forecast-pipeline]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-11 from the Claude Code memory file `mentat-lda-deadline-rule-2026-10-09.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[giving-forecast-pipeline]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
