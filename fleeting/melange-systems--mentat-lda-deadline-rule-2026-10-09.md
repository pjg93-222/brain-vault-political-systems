---
type: fleeting
title: "Mentat lda deadline rule (2026-10-09)"
aliases: ["mentat-lda-deadline-rule-2026-10-09"]
source: "session"
captured_at: 2026-10-09
created_at: 2026-10-09
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-lda-deadline-rule-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-lda-deadline-rule-2026-10-09.md", sha256: "4864a24765314d5cbcc93bf30d11ccee3c3cf9e6df134e270d347cdb29dd1cd8"}
updated_at: 2026-10-09
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

**Watch:** Q3's LD-2 deadline is 2026-10-20. Once Melange re-sweeps past that date (scope_sweeps.2026.sweep_through_dt_posted >= 2026-10-20), the next anchor build moves every sector to Q3, together with the Q3 nowcast cut and bands. Nothing schedules anchor builds: no task or endpoint was found, although the contracts README claims they run "nightly".

**Why:** an early $0 crypto Q3 filing made the old filings>0 rule report "through Q3" and nowcast with Q3 observed as $0.

**How to apply:** if someone asks why a sector shows Q2 while it has Q3 filings, check the sweep date against the deadline first. If fullscope_receipts.json is missing, the LDA block is unavailable by design (fail closed). Scratch evidence (patch, impact.txt): session 36662ddb's scratchpad\lda-deadline.

Related: `mentat-pdf-export-and-worksheet-cache-2026-10-08` (nowcast rulings), `mentat-edit-from-worktree-session-2026-10-08`, `brainlink-knowledge-system-2026-10-05`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `mentat-lda-deadline-rule-2026-10-09.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
