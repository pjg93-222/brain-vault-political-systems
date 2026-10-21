---
type: fleeting
title: "D157 residual lane (2026-10-20)"
aliases: ["d157-residual-lane-2026-10-20"]
source: "session"
captured_at: 2026-10-20
created_at: 2026-10-20
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/d157-residual-lane-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\d157-residual-lane-2026-10-20.md", sha256: "ad19939253d92a1f404254c82654ed59b726cbf01ef35d29f6c766f903dc2897"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# D157 residual lane (2026-10-20)

> D-157 held items F-13/14/15/17/18/20/22 built on branch d157-residual-20261020, published as PR #25; local main ff + in-app landing pending

## Content

D-157 held items lane (2026-10-20): F-13, F-14, F-15, F-17, F-18, F-20 and F-22 are done in source on the private branch `d157-residual-20261020` (tip 08a383da4). They are published through ReleaseLanes as PR #25 (publish/d157-residual-20261020), CodeRabbit-clean with 6/6 threads resolved; receipt section AR, FILTER_REPORT Addendum 35. The deferred list is in Melange `audits/d157_residual_20261020/PAUL_DECISIONS.md`.

**Why:** these were ratified on 10-11 but held as "one at a time" display and hygiene work. `queue-clearout-delegated-rulings-2026-10-11`

**How to apply:**
- Local main was NOT fast-forwarded. The live refresh_congress_pipeline run (pid 57432) has now exited, but another session's UNCOMMITTED v3 meeting-brief edit in the live tree's `fec/surfaces/templates/make_member_desk_00.tpl` (written 19:44) overlaps this branch, so never clobber it. Once it is committed: `git merge --ff-only d157-residual-20261020` in the live tree, or a normal merge if main has moved.
- Display items count as landed only after a chain run plus an app rebuild (`land-means-in-the-app-2026-10-15`). After that run, check rank_delta 0/533 and audit_full's "champions threat boards fresh vs live crown set".
- F-20: champions_v2 and industry_tiers now fail closed without a fresh active rank_honors generation, so a `--from champions_v2.py` resume needs `build_rank_honors.py --publish` first.
- F-22: IV_NAME_MATCH defaults to `full`. Turns refused on fetched pages are recoverable only through `data/members/interview_surname_refusals.ndjson` plus an iv_fetch_log reset.
- The public filter exports only fec/, ops/ and requirements.txt (fec/attic excluded), so a test must not read attic or audits files.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `d157-residual-lane-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
