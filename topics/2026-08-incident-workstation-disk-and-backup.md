---
type: topic
title: "Workstation disk and backup"
aliases: ["Workstation disk and backup"]
category: "incident"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[lg-gram-workstation]]"
  - "[[melange-repo-mirror]]"
objective: "Keep the LG Gram's single C: drive from filling (every new session worktree costs ~18 GB via tracked audits/legfix5) and close the backup gaps: OneDrive stopped ingesting on ~2026-08-11, Carbonite does not cover melange-data, and ~48 GB of audio is unrecoverable if C: dies."
created_at: 2026-08-11
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/repo-mirror-2026-08-11.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\repo-mirror-2026-08-11.md", sha256: "d344e91e5b143e36a8846cbd15ea7bc1b0d65cd3f448a0b623bbeddf921803d1"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/disk-cleanup-lane-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\disk-cleanup-lane-2026-09-16.md", sha256: "8a4846eaf6cbb47d9096e3340c8987a7d3b07d75edd9c6bc5f8b8c919d54b1cc"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/disk-census-2026-09-11.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\disk-census-2026-09-11.md", sha256: "a60c04e092cb6a9de1332fc0c52b98fac2d1c0b481506063cdccd3dd5ef4687f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/backup-coverage-gap-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\backup-coverage-gap-2026-09-07.md", sha256: "7338b06f727216529838a57ea43fa60ca3e94f42420f8346d5014aad1a5db1d0"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/infra", "category/incident"]
---

# Workstation disk and backup

> The LG Gram's one C: drive keeps hitting 0 GB free because every checkout of Melange Systems materialises 17.46 GB of tracked `audits/legfix5`; four clearances (2026-09-11, 09-13/15, 09-16, 09-18) freed hundreds of GB, and the backup picture (OneDrive stalled since ~2026-08-11, Carbonite partial, git mirror) is incomplete.

> [!warning] Free-space figures: newest wins
> The census figures from 2026-09-11 (949.8 GB used / 2.7 GB free) are point-in-time and are SUPERSEDED by the cleanup lane: the latest measured state is **185.9 GB free on 2026-09-18 evening** (after about 212 GB cleared; two new session worktrees took 36 GB back while the lane ran). The census figures are kept below and in [[2026-08-incident-workstation-disk-and-backup-backup-gap-and-census]] as dated bullets. Re-run the census before quoting any number.

## Parts

- [[2026-08-incident-workstation-disk-and-backup-backup-gap-and-census]] — The workstation backup coverage gap measured on 2026-09-07 and the point-in-time disk census of 2026-09-11.
- [[2026-08-incident-workstation-disk-and-backup-clearances-and-retirements]] — The disk clearances and worktree retirements of 2026-09-11 to 09-18, with the brain updates of the disk lane.

## Context

- Host: [[lg-gram-workstation]] (only C: and WinRE exist; no external drive is attached). Code tree: Melange Systems under OneDrive (`C:\Users\pgoff\OneDrive\Desktop\Melange Systems`), see [[melange-systems]]; the off-box git mirror is [[melange-repo-mirror]]; live-tree/git-drift context in Live tree, git drift and line endings. Owner: Paul Goff.
- **Structural cause (not derivable from code):** one checkout of Melange Systems is ~18 GB because `audits\legfix5` is tracked. Every checkout materialises 17.46 GB / 38,905 files of it (one 2.57 GB `packets.ndjson`, two 0.6 GB queue snapshots). `.ndjson` alone = 305 GB on disk (2026-09-11). Each new session worktree costs ~18 GB until `audits/legfix5` is untracked or a post-checkout hook applies the sparse pattern to new session worktrees (both Paul's; a hook is persistent configuration, so never install it unasked).
- **Backup structure:** OneDrive (consumer account, active to 2027-05-25, 144.61 GB already stored) silently stopped ingesting new files in the code tree on ~2026-08-11; Carbonite (`Personal Plus`) covers ~420-440 GB of the profile but not `C:\melange-data`; the git mirror is Carbonite-covered. See "Backup coverage gap" in [[2026-08-incident-workstation-disk-and-backup-backup-gap-and-census]].
- Paul's prompts for the four clearances: 2026-09-11 "clear 100 GB without destroying essential systems" (census; "Apply the disk cleanup"); 2026-09-13 "Free 100 GB", "You don't need to ask, just remove", "just get rid of 50 gigabytes of finished trees right now", "We are not compressing we are removing"; 2026-09-15 "we need to clear 100 GB of space, nothing less" then "Show me the list and just remove the finished worktrees"; 2026-09-16 evening "Clear 100+ GB's of Space without destroying systems", "Show me the list and just remove the finished worktrees", "Don't remove the lane coordination worktree", "Keep the scratchpads"; 2026-09-18 "Go clear 100 GB's and then finish"; 2026-09-18 evening "You need to clear 200 gigabytes on this computer. There are certain branches that have been tabled, such as the friendship network, audio, lobbying inference, among other things that should be saved ... Do whatever is necessary to clear the space, and regenerate the scratchpads that were deleted".

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[lg-gram-workstation]] | Paul's LG Gram 17Z90UB Windows 11 laptop: NPU BSODs, AppXSvc leak, Codex MSIX loop, C: disk exhaustion, OneDrive/Carbonite gaps |
| [[melange-repo-mirror]] | Off-box bare git mirror (remote mirror, Carbonite-covered) of Melange Systems; all branches+tags, hook auto-push since 2026-09-19 |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[census-before-claims]] — the census figures of 2026-09-11 are point-in-time: re-run the census before quoting any number

## Related Topics

- Live tree, git drift and line endings - Melange live tree vs git: branch drift, live-only files, 35-commit reconcile, EOL census, live_patch.py cutter, off-box mirror

## History

| Date | Event |
|---|---|
| 2026-08-06 | Last day directories were created with OneDrive cloud-placeholder reparse tags (`0x431`/`0x411`, tag `0x9000601a`); everything from 2026-08-11 on is plain NTFS (`0x10`) the cloud filter never claimed. |
| 2026-08-11 | OneDrive stops ingesting new files in the code tree (`LastDAUEventTimestamp_Upload` = 2026-08-11 04:37 UTC) yet reports healthy. Same day the off-box git mirror is set up ([[melange-repo-mirror]]). |
| 2026-08-18 | All 174 local branches + 3 tags pushed to the mirror ([[melange-repo-mirror]]). |
| ~2026-08-24 | Carbonite's coverage of `Melange Systems\backups\` stops. |
| 2026-08-26 | `backups\offbox_rescue_20260826` created (39.58 GB, 2,354 files): in neither OneDrive nor Carbonite; duplicates `C:\melange-data` on the same drive. |
| 2026-09-05 | Carbonite tray state logged `backupfailed`. |
| 2026-09-07 | Backup-coverage gap measured from the services' own databases (228.50 GB never taken by OneDrive; Carbonite set ~420-440 GB; ~48 GB audio unrecoverable). |
| 2026-09-11 03:40 | Disk hit 0 bytes (during the member-relationships lane; see `member-relationships-lane-review-2026-09-10`). |
| 2026-09-11 | Census (read-only; 20 min, 659,182 dirs / 2,299,071 files): C: 949.8 GB used / 2.7 GB free (superseded). Between the census (18:54) and 19:18 free space rose 2.7 -> 59.6 GB with no action from this session. 20:33 report results. 22:55 Paul's "Apply the disk cleanup": run A freed 70.0 GB (16.9 -> 81.1 GB free). 23:09-23:36 elevated run: DISM StartComponentCleanup ~15 GB (80.4 -> 95.5 GB). 23:41-23:43 two clean worktrees retired (94.8 -> 125.3 GB). Day total 2.7 -> 125 GB free. |
| 2026-09-13 | Retirement of six finished worktrees (session cc617a6c): C: 0.09 -> 105.1 GB free. |
| 2026-09-15 | Retirement of 23 entries (session mentat-excel-tableau-format-8ac097): C: 0.3 -> 228.2 GB free. |
| 2026-09-16 | Four clean worktrees removed: 6.5 -> 24.8 -> 42.5 -> 61 -> 79.4 GB free. 2026-09-17 ~00:15 own-tree removal and brain update `247ce10` / `d2a5aff` (see Brain updates in [[2026-08-incident-workstation-disk-and-backup-clearances-and-retirements]]). |
| 2026-09-18 (first) | "Second clearance": C: at 0.1 GB free of 952.3 GB used -> 108.4 GB free (108.3 GB recovered) by deleting orphaned scratchpads plus two retired worktrees. |
| 2026-09-18 15:30 | Read-only census: C: at 3.00 GB free of 952.70 GB (105 GB consumed since the morning clearance). |
| 2026-09-18 evening | "Third clearance" (session clear-storage-space-d8b0a5): 10.2 -> 119.8 GB free with nothing unique deleted, -> 178.6 GB after Paul approved three groups of program-irrelevant files, -> 185.9 GB after the clean-house pass (about 212 GB cleared; two new session worktrees took 36 GB back during the lane). Brain applied as commit `be33c78`. **Latest measured free space: 185.9 GB.** |
| 2026-09-19 | Mirror brought current and hook auto-push installed ([[melange-repo-mirror]]). |

## Decisions

Newest first within each topic; superseded rulings are struck through and kept because they explain earlier artifacts.

- **Per-worktree sparse-checkout of `audits/legfix5` is the first lever** (brain D-047, 2026-09-18; "sparse-checkout-before-removal and relevance-from-the-running-program"). Why: frees 17.5 GB in 16-19 s without removing any worktree, branch, session cwd or uncommitted file, leaves `git status` identical outside legfix5, is reversible (`sparse-checkout disable`, needs 17.5 GB free). Right tool for TABLED lanes ("saved", literally) and idle Mentat-lane session trees.
- **Relevance is read from the running program's code**, not from size or age (Paul's redirect 2026-09-18: "Did you clear irrelevant trees? Look at the main state of the program, and then compare irrelevant files for both mentat and melange other than what I have specified as off limits"); brain DE-030 "code-grep-as-relevance-test" records that a grep over code is NOT a relevance test on its own (see Near miss in [[2026-08-incident-workstation-disk-and-backup-clearances-and-retirements]]).
- **Never delete a scratchpad on size or on the orphan test alone.** A scratchpad stays untouched even when it is a byte-duplicate; D-038 makes naming one Paul's. A broad phrase ("clean house") does not reopen a declined item.
- **Do NOT slim a Melange-lane tree without asking:** 123 files under `fec/` reference `audits/legfix5` (403 occurrences: legislation producers and audits), so a Melange-lane session's pipeline or audit run needs those files. Classify a tree's lane from its transcript's first prompt (`Repo: C:\Users\pgoff\Mentat` = Mentat lane), never from its name or from what its scratchpad holds.
- **Worktree retirement rule and protected trees** (brain D-038, 2026-09-17). "Finished worktree" (Paul, 2026-09-16) = session not running, git status clean (tracked + untracked + ignored), zero commits ahead of main; those are removed on his word without archiving. Others are archived first with a SHA-256 manifest (`archive_worktree.ps1`) or held for Paul.
- **Standing KEEP rulings of Paul (2026-09-16):** `mentat-failings-lane-a615fa` = the Mentat failings lane-coordination worktree (session title "Mentat failings lane coordination"): NEVER remove it even when idle and clean. ~~Session scratchpads under `C:\Users\pgoff\AppData\Local\Temp\claude\` are KEPT, even the closed tidy-workbook session's 64.9 GB one and the S2 session's 9.0 GB one; do not propose them again as a lever unless Paul reopens it.~~ (2026-09-16) - the 64.9 GB `...mentat-excel-tableau-format-8ac097` scratchpad was DELETED on 2026-09-18 by the clearing session overriding the ruling (see 2026-09-18 first clearance in [[2026-08-incident-workstation-disk-and-backup-clearances-and-retirements]]); the S2 9.0 GB scratchpad was kept. The session says it should have asked rather than judge the ruling reopened by phrasing; if Paul wants the ruling restored verbatim, treat that deletion as the exception and ask next time.
- **Compression rejected** (Paul, 2026-09-13: "We are not compressing we are removing"): LZNT1 gets only ~1.8:1 on the ndjson and files carry OneDrive reparse points, ruling out WOF; six big live-tree legfix5 files were left transparently compressed (hashes verified).
- ~~Census plan (2026-09-11): per `ask-before-substantive-changes` nothing was deleted; "Retiring worktrees is Paul's action (git is his under `no-git-plain-review-2026-09-01`)".~~ (2026-09-11) - superseded by Paul's direct words in later lanes ("Apply the disk cleanup" 2026-09-11, "You don't need to ask, just remove" 2026-09-13, "Show me the list and just remove the finished worktrees" 2026-09-15/16); sub-agents still refuse destructive steps on relayed authorization, so worktree removal runs in the main session on Paul's direct word.
- ~~Census claim: pagefile 21.5 GB auto-managed with "peak use 0.7 GB"~~ (2026-09-11) - corrected the same day: pagefile left system-managed ON PURPOSE because commit charge hit 60 GB of 71 GB during DISM (pagefile grew to 39.7 GB); `Win32_PageFileUsage` measures pages written, not commit demand, so a fixed 8 GB pagefile would have been unsafe.
- **Hibernate/pagefile are system-settings changes the assistant must not perform** (prohibited list); `powercfg /h off` elevated = Paul's. The 2026-09-11 elevated window waiting for his typed YES never received it; hiberfil.sys was still present at 23:41.
- **Do not bulk-hardlink duplicated FEC inputs across console rosters**: an in-place re-download would rewrite every roster's inputs, and run directories are evidence.
- Paul DECLINED (2026-09-18 evening) the three items first offered: the 43 GB duplicate state copy inside the `charming-chatterjee-d81c90` scratchpad, slimming the failings-lane tree, and `C:\tmp\clone_probe`; he redirected to relevance-against-the-running-program.
- Paul took the whole disk question himself at the 2026-09-18 15:30 census ("Paul took the whole disk question himself rather than have me delete anything"), then ordered the evening clearance.

## Mirror state (summary; detail in the mirror entity)

Remote `mirror` = `C:\Users\pgoff\GitMirrors\melange-systems.git` (Carbonite-covered; first push sha-identical `@b76d8807`). 2026-08-18: all 174 branches + 3 tags pushed. 2026-09-19: mirror `main` had sat at `2049fea9f` since 2026-09-08 and 88 of 292 local branches were absent (incl. `claude/melange-systems-code-review-859518`, only home of the 09-13 packet at `77959ae74`); `git push mirror main` then `--all` and `--tags`: 90 refs pushed, 0 rejected, 292 of 292 present, `main` = `a19c796d2`, 3.1 GB; `post-commit` / `post-merge` hooks (brain D-059, `<live>\.git\hooks\`) push the branch just committed (failures in `.git\mirror-push-failures.log`, Glass Box source `melange-mirror-hook`, proven by commit `b99ba565d`). GitHub is blocked by 2.6 GB blobs; see [[melange-repo-mirror]].

## Next Steps

- [ ] Paul to decide: untrack `audits/legfix5` or have a post-checkout hook apply the sparse pattern to new session worktrees (the structural fix; a hook is persistent configuration, never install unasked).
- [ ] Paul to decide the items found and left for him (see "Left for Paul"): 43.17 GB `charming-chatterjee-d81c90` scratchpad `temp_console_old_code\state`; slim `mentat-failings-lane-a615fa` (17.5 GB); `C:\tmp\clone_probe` (6.65 GB); a reboot to shrink `pagefile.sys` (84.5 GB); `powercfg /h off` for hiberfil.sys (12.6 GB).
- [ ] Mirror the two branches not on the mirror: `claude/wizardly-wilbur-e2d1a0`, `claude/melange-data-expansion-958236` ([[melange-repo-mirror]]).
- [ ] Re-census (100 s) before quoting any free-space number; always diff a second census to find new session worktrees.
- [ ] Close the backup gaps: bring `C:\melange-data` (167.3 GB) and `AppData\Local\Melange` (21.7 GB) into a backup; find why OneDrive stopped (item count 563,215 vs ~300k ceiling and/or quota, unconfirmed); get an external drive for the ~48 GB unrecoverable audio.
- [ ] Held worktrees still awaiting a Paul decision: `mentat-systems-production-file-53552c`, `melange-coalition-builder-design-7babbe`, Codex `4f35`, `melange-members-section-fixes-6613db` (live lane).
- [ ] Brain repo has NO `.gitignore`: every `flush` re-adds `STATE.md.PRE-STAFFER-DASHBOARD-20260905.bak`; fix = Paul deletes it, adds `*.bak` to a `.gitignore`, or `flush` moves to an explicit pathspec.
- [ ] Console UI follow-ups not in this topic; see the Mentat topics.

## Left for Paul (open, 2026-09-18)

Each needs his word:
- The 43.17 GB `charming-chatterjee-d81c90` scratchpad: `temp_console_old_code\state`, a copy of the live `Mentat\mentat\state` made 13:07-13:13 for the console-hang reproduction; 5,582 of 5,583 files are identical by size+mtime (43.15 GB), the odd one a 160-byte `cross-reference\latest.json`; D-038 makes it his to name (same shape as the 64.9 GB one wrongly deleted that morning). It is NOT an orphan (that name IS in `git worktree list`, legfix5 lane): size alone never licenses removing it (15:30 census mapping).
- `mentat-failings-lane-a615fa` would slim for 17.5 GB (a Mentat coordination lane; Paul's standing never-remove rule is about removal, slimming was declined).
- `C:\tmp\clone_probe` 6.65 GB (09-06 mirror probe, unborn HEAD, its pack is the GitMirrors pack).
- ~30 GB of duplicated FEC inputs: five console rosters plus the Codex package's private copy plus `.cache\repair-20260908-inputs` each hold the same FEC inputs (6.0 GB per roster `runtime\mentat`); hardlinking is NOT safe (in-place re-download rewrites every roster's inputs) and run directories are evidence. Eleven cross-reference run ledgers = 37.1 GB under `mentat\state\cross-reference`.
- `pagefile.sys` 84.5 GB (87.3 GB allocated / 21.36 GB used at the 15:30 census; shrinks at reboot; a SYSTEM SETTING, never the assistant's to change), `hiberfil.sys` 12.6 GB.
- Still open after the clean-house pass, all Paul's: `self_update_20260908\production_before` 2.00 GB (holds the cited 15-row `bluesky_cu.csv`); six `label_correction_20260913` activation snapshots 3.22 GB; `audits\congress_pipeline` 19 run dirs 4.06 GB (the thirteen failed 09-13 attempts carry a 0.28 GB `before` snapshot each); stale `contribution-analytics` generations plus `<hash>.<uuid>` partial builds and 09-12/13 `contribution-query-cache` entries (an estimated 5-7 GB; naming the dead ones needs `_token(source)` for the 8 live sources, since partly addressed by `clean_mentat_caches.py`); the three declined items above.
- McAfee `wps\log` ~16.4 GB (145 files, growing ~0.13 GB/hour) is undeletable without turning off McAfee self-protection or uninstalling McAfee.
- 09-18 15:30 census mapping for the standing KEEP: the "S2 9 GB scratchpad" is `Temp\claude\C--Users-pgoff-OneDrive-Desktop-Melange-Systems--claude-worktrees-contributor-street-columns-0a1726` (9.00 GB, ORPHANED by the `git worktree list` test but KEPT, may be the last copy of the S2 packet). The other orphans that day were `mentat-collector-slowdown-dfbf5b` (0.51 GB) and `mentat-xref-spreadsheet-review-3f1ff0` (0.06 GB), so clean orphan space was only ~0.57 GB.

## Never touch list (consolidated)

`C:\melange-data` (167.3 GB; bicam_snapshot 60.1, audio ~95 = unrecoverable); `GitMirrors` (3.0 GB; Carbonite off-box path, [[melange-repo-mirror]]); `~\.cache\codex-runtimes` (only python/node the Mentat build has); `mentat-failings-lane-a615fa` worktree; the Mentat tree `C:\Users\pgoff\Mentat`; `mentat/state/accepted-report-sources` + `cross-reference` (durable state, not cache); live-session worktrees; run directories under `%LOCALAPPDATA%\Mentat\console\<roster-id>\runs\` (audit evidence); the S2 9.0 GB scratchpad; the 43.17 GB charming-chatterjee scratchpad until Paul names it; `bash-edit-diff` (live handles).

Numbers here are point-in-time; re-run the census before quoting them. Related notes (plain text): `ask-before-substantive-changes`, `go-faster-directive-2026-09-16`, `member-relationships-lane-review-2026-09-10`, `mentat-failings-lane-s2-2026-09-16`, `mentat-collector-slowdown-lane-2026-09-17`.
