---
type: fleeting
title: "Dashboard fixes verification lane (2026-09-05)"
aliases: ["dashboard-fixes-verification-lane-2026-09-05"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[2026-06-feature-melange-dashboard-ui-evolution]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/dashboard-fixes-verification-lane-2026-09-05.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\dashboard-fixes-verification-lane-2026-09-05.md", sha256: "ccbfa88aa21ab85834c2bcea2e44f5159b9ed24961beb167ca7ecbdaf6803b85"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Dashboard fixes verification lane (2026-09-05)

> Dashboard-fixes lane 2026-09-05 — bills/press/profiles all verified PASS in the live tree; publish BLOCKED on a password file only Paul can create; five chain attempts failed (audio-manifest intake rejection); personal-texture audit FAIL is schema-only (display_dedupe block); weights 45/10/40/5 move

## Content

Lane `claude/melange-dashboard-fixes-83c994` (worktree at main `8953e7181`, zero lane commits). Paul pasted a
"Melange Dashboard Fixes — Simple Update" handoff and said "Finish those next actions", later "publish the
snapshot". Record: `audits/DASHBOARD_FIXES_VERIFICATION_2026-09-05.md` in the worktree.

Facts not derivable from the repo:
- **Every claimed fix lives ONLY as uncommitted edits in the live tree** (~60 dirty files). The branch named
  for the lane carries none of it. Verify in the live tree (DE-012), never in the worktree.
- **Verified PASS 2026-09-05 01:00-01:30Z**: 18,140/18,140 discovery IDs in the cumulative ledger sheet;
  press uncapped (`MEDIA_CAP = 0` hardcoded at `fec/surfaces/make_member_desk.py:1613`, 274 member-source
  pairs over 50, rendered = bundle 533/533); Wikipedia bios 533/533 with Scalise revision 1364281533
  identical on all surfaces; 0 duplicate personal statements. The Wikipedia json has NO social-links field
  (handoff claim wrong); handles come from congress-legislators data.
- **Publish is blocked on the password file, Paul's step.** `publish_dashboard.py` reads the whole file
  stripped from `--password-file` or `DASHBOARD_PASSWORD_FILE`; the var is unset in every scope, no file
  exists anywhere on the box, no default path, auto-generation disabled (`lock_dashboard.py:72`).
  `deploy/DEPLOY.md` holds a plaintext password for the retired positional CLI; never copy it into a file.
  `lock_dashboard.py:85` replaces `deploy/index.html` with no backup: copy it to `backups/` first.
  `weekly_refresh.py:411` calls publish as a hard step and `MoneyballWeeklyRefresh` is ENABLED again
  (Sunday 06:00) with no env definition, so Sunday's run will die at the password read until the var is set.
- **No chain completed on 09-04/05**: five `run_pipeline.py` attempts failed (runs 1-2 at the terminal
  `audit_full.py`; 3 and 5 at step 2 on `audio_supply` "title-match-unverified YouTube audio entered the
  accepted manifest"; 4 at step 6 on a stale YouTube verification receipt). The 23:54Z `Moneyball.html`
  is run 2's uncertified output. Glass Box `pipeline.step` events truncate the tail to 200 chars, so the
  failure list is only obtainable from a standalone audit run.
- **Standalone `audit_full` 571/8** (404 s): the `personal-texture layer propagates exactly` FAIL (480) is
  schema-only, the desk adds a `display_dedupe` block and `audit_full.py:1341-1343` compares whole dicts;
  items are byte-identical. Other 7 are press/audio/manifest/standing items, none dashboard-fix related.
- **Ranks moved 520/533 vs the 08-26 baseline** (`backups/pre-billfix-20260826/ranks_python.json.pre`, the
  only retained prior copy; max 192, mean 15.75) under `ab_weights` 45/10/40/5; brain record still says
  30/25/40/5. The brain's "Tier 1 ends Sherman/Vargas/Rounds" is the CU PRIMACY board, not
  `ranks_python.json`; do not compare the two.
- `.pipeline_run.lock` holds `{pid, token, started_utc}`; a lock plus a live pid means a chain is running,
  and `audit_full` must not be run concurrently (read contention).

**Why:** the handoff's "publish once everything passes" cannot be finished by a session, because the one
missing input is a credential; and the artifacts being published come from a chain whose own gate failed
on other lanes' items, which Paul needs to see before publishing.

**How to apply:** when Paul supplies the password-file path, back up `deploy/index.html`, run
`python fec\surfaces\publish_dashboard.py --password-file <path>` from the live tree root with no chain
running, then verify `data/engine/dashboard_deployment_receipt.json` exists with
`password_material_recorded: false`. Related: `ask-before-substantive-changes`,
`no-git-plain-review-2026-09-01`, `sentinel-workbook-ingestion-lane-2026-09-04`,
`sentinel-collectors-lane-2026-09-01`, `verify-dont-infer-completion-2026-08-04`,
`dashboard-preview-workflow`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): BLOCKED pw file

## Possible Connections

- [[2026-06-feature-melange-dashboard-ui-evolution]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `dashboard-fixes-verification-lane-2026-09-05.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-06-feature-melange-dashboard-ui-evolution]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
