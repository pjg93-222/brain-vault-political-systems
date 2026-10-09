---
type: fleeting
title: "Bug report regressions six fixed (2026-10-09)"
aliases: ["bug-report-regressions-six-fixed-2026-10-09"]
source: "session"
captured_at: 2026-10-09
created_at: 2026-10-09
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/bug-report-regressions-six-fixed-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\bug-report-regressions-six-fixed-2026-10-09.md", sha256: "5340f4c291157dcbdc6733c12d9e2963b935ee0534a98156795d2ff85b93064d"}
updated_at: 2026-10-09
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Bug report regressions six fixed (2026-10-09)

> Six long-red checks in fec/tests/infra/test_bug_report_regressions.py fixed 2026-10-09 on Paul's go (brain D-129); applied UNCOMMITTED in the live tree; the module is not in the kernel runner, so its reds go unseen

## Content

On 2026-10-09 Paul approved fixes for the six failing tests in `fec/tests/infra/test_bug_report_regressions.py` ("Go with your proposal, option (a), plus the README fix"); the ruling is brain D-129 (brain commit ada6529). The suite went from 60/66 to 66/66 in the live tree, re-run independently.

**State:** COMMITTED on Paul's word ("Commit the four files and fix the manifest cites") in the LIVE tree on branch claude/lda-series-fixes-20261009: `8ce0de303` (the test file, `fec/collect/fetch_hearings_antag.py`, `fec/surfaces/templates/make_member_desk_00.tpl`, `README.md`; cut with `fec/tools/live_patch.py`, EOL classes unchanged) and `d2954e8cf` (the five social_media.db producer cites in `fec/audit/build_system_manifest.py`, four of which had already drifted). Both reached the mirror through the post-commit hook. After "push it", the same two diffs were rebuilt byte-identical on the GitHub default branch with plumbing (the live history cannot go to GitHub) and pushed as `claude/bug-report-regressions-20261009` (`5f27cdb07`, also on the mirror). There is NO PR: the in-app browser was signed out, and Paul said "Its fine, just commit it locally". On his "delete the GitHub branch" the GitHub copy was deleted the same day (lease-checked at `5f27cdb07`); the local branch was deleted too on his word, so only the mirror copy (`5f27cdb07`) remains.

**Why the reds lasted months:** `fec/tests/run_tests.py` does not run this module, so the kernel gate never saw them, and agents kept labelling them "pre-existing".

**Lesson, merge-resolution losses:** default `git log -S` does not diff merges. The antag regression (merge 290b4b930 resolved a conflict to the lane side and silently dropped 02bc13ffd's X-Api-Key header) only showed by comparing `<merge>^1:<path>` with `<merge>:<path>`. Check merges explicitly when a pickaxe finds an add but no remove.

**Left open:** `data/system/system_manifest.json` still carries the old cites. It is generated (never hand-edit) and its working copy is another session's uncommitted 2026-10-08 rebuild, so it picks the fixed cites up at its next rebuild (a rebuild re-baselines the A2/A2b drift checks, brain D-079). The desk template change reaches the built HTML at the next chain run, and it only renders in legacy rollback mode (no visible change while HONORS is on).

Related: `ask-before-substantive-changes`, `live-tree-eol-census-2026-09-19`, `search-rulings-before-asking-2026-10-07`, `brainlink-knowledge-system-2026-10-05`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `bug-report-regressions-six-fixed-2026-10-09.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
