---
type: topic
title: "Backup coverage gap and the 2026-09-11 census (Workstation disk and backup)"
aliases: ["Workstation disk and backup: Backup coverage gap and the 2026-09-11 census"]
category: "incident"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-08-11
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/infra", "category/incident"]
part_of: "[[2026-08-incident-workstation-disk-and-backup]]"
---

# Backup coverage gap and the 2026-09-11 census (Workstation disk and backup)

> The workstation backup coverage gap measured on 2026-09-07 and the point-in-time disk census of 2026-09-11. Part of [[2026-08-incident-workstation-disk-and-backup]] (project [[melange-systems]]).

## Backup coverage gap (measured 2026-09-07)

Measured from the services' own databases, not from their UIs.

**OneDrive stopped ingesting new files in the code tree on ~2026-08-11 and still reports itself healthy.**
- `SyncEngineDatabase.db` holds 343,129 files / 140.33 GB for `Melange Systems` against 916,215 / 368.83 GB on disk: **573,086 files / 228.50 GB never taken**.
- The cutoff is visible in the filesystem: directories created through 2026-08-06 carry OneDrive cloud-placeholder reparse tags (`0x431`/`0x411`, tag `0x9000601a`); everything from 2026-08-11 on is plain NTFS (`0x10`).
- `LastDAUEventTimestamp_Upload` = 2026-08-11 04:37 UTC. `SyncDiagnostics.log` reports `FilesToUpload = 0`, `BytesToUpload = 0`, zero failures (it has no record the files exist). `od_SelectiveSync_Records` = 0 rows, so exclusions do not explain it.
- Suspected cause, UNCONFIRMED: `ItemCount = 563215` vs Microsoft's ~300k practical ceiling, and/or quota (144.61 GB already stored; consumer account, active to 2027-05-25).
- **Never trust OneDrive's "everything is synced" on this box: check the item count and quota.**

**Carbonite's real set is ~420-440 GB**, not the "498 MB" a session-window log counter suggests (`file counts last 3:01:23` = bytes moved since service start, not set size).
- Cumulative truth: `Carbonite.log` `All: 1342968 (439G bytes)`; registry `Stats.CurrentNativeMB = 450182`; UI log `TotalBackupSize=420 GB`.
- Policy `Personal Plus`, `$DefaultMaxFileSizeMB=102400`, roots include `C:\Users\pgoff\OneDrive\Desktop`.
- The 2026-05-24 installer line "scope: user chose to backup My Documents" describes a wizard click, NOT current scope.
- Coverage of `Melange Systems\backups\` stops ~2026-08-24; tray state logged `backupfailed` 2026-09-05.

**Coverage verdicts:**

| Path | Size | OneDrive | Carbonite |
|---|---|---|---|
| `C:\melange-data` | 167.3 GB | OUT (not under OneDrive) | OUT (absent from `CarboniteConfig.dat` roots) |
| `AppData\Local\Melange` | 21.7 GB | OUT | OUT |
| `GitMirrors\melange-systems.git` | 3.0 GB | OUT | **IN** (so [[melange-repo-mirror]] is right that Carbonite carries it off-box; the mirror path is on the same physical C: drive and gives no protection on its own) |
| Code tree | - | PARTIAL | PARTIAL |
| `backups\offbox_rescue_20260826` | 39.58 GB, 2,354 files | NEITHER (zero records in both databases, fully hydrated real bytes) | NEITHER |

`offbox_rescue_20260826` duplicates `C:\melange-data` on the same drive, so it is not redundancy against disk failure and deleting it costs no protection.

**Unrecoverable if C: dies** (no external drive attached; only C: and WinRE exist): ~48 GB of audio with no source manifest: `member_longform_audio_v1` 38.26 GB (655 wav), `member_clips` 8.84 GB (6,257 wav), `youtube_audio`; plus code-tree work since 08-11 that neither system took, plus every uncommitted lane.

**Re-derivable with effort (~120 GB):** `bicam_snapshot` 60 GB (GovInfo), `sunday_audio` 12 GB (Internet Archive, `ia_` filename prefixes), `npr_audio`/`source_audio` ~13 GB (podcast RSS), `models` 3.4 GB (Hugging Face).

**Method note worth reusing:** both services' coverage is readable without touching their UIs: OneDrive via a read-only copy of `SyncEngineDatabase.db`; Carbonite via `CarboniteConfig.dat` (root list at offset ~131683), `CarboniteFiles.dat`, `Carbonite.log`, and `HKLM:\SOFTWARE\Carbonite\CarboniteService`. Reading file ATTRIBUTES (not content) does not hydrate OneDrive placeholders.

Related memory notes (plain text): `repo-mirror-2026-08-11`, `live-tree-branch-state-2026-07-14`, `staffer-stale-imports-lane-2026-09-06`.

## Census 2026-09-11 (point-in-time; free-space figures superseded)

Paul asked (2026-09-11) to "clear 100 GB without destroying essential systems". C: was **949.8 GB used / 2.7 GB free** (superseded by the later figures in [[2026-08-incident-workstation-disk-and-backup]]). A READ-ONLY census (attribute-only walk, 659,182 dirs / 2,299,071 files, 20 min) presented a plan; per `ask-before-substantive-changes` nothing was deleted by the census.

**Biggest measured consumers (2026-09-11):**
- 17 Claude worktrees under `Melange Systems\.claude\worktrees` = 296.9 GB (~297 GB; 253 GB of it never taken by OneDrive); 2 Codex worktrees under `~\.codex\worktrees` (f149, 4f35) = 37.1 GB; throwaway clones `Desktop\test-clone-2` 21.1 GB + `C:\tmp\clone_probe` 6.7 GB. Retiring checkouts is the only lever that reaches 100 GB without touching data.
- `C:\melange-data` 167.3 (bicam_snapshot 60.1, audio ~95 = unrecoverable, never touch); `Mentat\tmp` 23.9 (all July 23-29); `Mentat\mentat\.cache` 33.5; `AppData\Local\Mentat\console` 21.2 (three runs, each with its own FEC input copy).
- McAfee `C:\ProgramData\McAfee\wps\log` 15.2 GB of rolling 0.13 GB `.etl` traces that nothing prunes (mc-fw-host running); pagefile 21.5 GB auto-managed; hiberfil 12.6 GB (Fast Startup on); two distinct 8.4 GB `rootfs.vhdx` Claude VM bundles (Roaming\Claude and the MSIX container copy, not hardlinked); `AppData\Local\Melange` 27.8 (live staffer lane, out of every backup); WinSxS 22.6.

**Deliverables** (in the tableau worktree, `tmp\disk_cleanup_20260911\`): `free_space_plan.ps1` (report-by-default; opt-in items; per-worktree `git status` with 300 s timeout; refuses dirty worktrees unless `-ForceDirty`; protected list; Glass Box emits; smoke-tested in report mode), `DISK_CLEANUP_PLAN_2026-09-11.md`, the census script `disk_audit.ps1` and its md/csv outputs. Note: `free_space_plan.ps1` from 09-11 no longer exists anywhere (per the 2026-09-16 session). Recommended first batch = the six August worktrees (mentat-systems-production-file-53552c, industry-spending-attribution-d809c2, trusting-hugle-7a369a, goofy-chaum-819f72, intelligent-grothendieck-2171e7, infallible-chebyshev-c1f6cd). KEEP: staffer-social-ranking-math-738a24 (variant A built), employment-tenure-adjudication-e27de8 (member-relationships records), staffer-network-stale-imports-2e9e82 (reopened), graph-consolidation-identity-d8d358 (active), the tableau worktree. The gate was later patched so `D`-only entries never block (Modified/Deleted/Untracked columns; `-AllowUntracked`).

**Mid-session anomaly, partly explained:** between the census (18:54) and 19:18, free space rose 2.7 -> 59.6 GB with no action from the census session. The report's `git status` shows the SAME five tracked files deleted (` D`) in every one of the 17 Claude worktrees: `audits/legfix5/opus_adjudication/packets/{10ddf7ef,2bc780e9,4a4aac99,510c3303,97a4cea6}/packets.ndjson` (~3.5 GB per worktree; 296.9 -> 240.7 GB). Tracked deletions lose nothing (blobs are in the repo) and the Codex worktrees outside OneDrive were untouched, so a local sweep over `.claude\worktrees\*` (another lane or Paul) is the likely cause, not OneDrive. Still unexplained: the live tree's `audits\legfix5` dropped 288,683 -> 273,091 files and `Melange Systems\tmp` 3.5 -> 0.7 GB. Paul has not said whether it was him. About 57 GB vanished from OneDrive paths mid-session by something else.

**Report results (2026-09-11 20:33, read-only):** every worktree resolves to a branch (fix: git prints forward-slash paths; keyed with `NormPath`). Each shows the 5 benign `D` entries; real work sits in: infallible-chebyshev (2 M system-manifest files), industry-spending-attribution (M launch.json + 304 untracked incl. big5 .candidate files), goofy-chaum (527 untracked), trusting-hugle (15 untracked), intelligent-grothendieck (UNMERGED branch + outputs/email_package), mentat-systems-production-file (UNMERGED, contact_extraction audit md), hungry-edison (UNMERGED govinfo review), melange-dashboard-fixes (2 M + 18 untracked), staffer-network-stale-imports (M run_tests + 66 untracked), staffer-social-ranking-math (M run_pipeline + 11), employment-tenure (member_relationships records), Codex 4f35/f149 (detached, real modifications). Clean by the strict rule: melange-audio-integration-9c7c56 and youthful-murdock-bb153d (14.6 GB each). Clone test-clone-2 clean (21.1 GB); clone_probe 44 dirty. Mentat tmp 23.9 + July caches 3.9 + console runs 15.2 GB reported as deletable (no R/python job running).
