---
type: topic
title: "Melange main reconcile and live-tree move of 2026-10-16/17"
aliases: ["Melange main reconcile", "Public lineage port 2026-10-16", "Live-tree fast-forward 2026-10-17"]
category: "troubleshooting"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[melange-repo-mirror]]"
  - "[[melange-fec-pipeline]]"
objective: "Bring local main, the published origin/main lineage and the work done directly on the published lineage into one coherent state without losing any of it, move the live tree onto the result with a proven rollback, and record the process lessons."
created_at: 2026-10-17
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-28-0c1fea/memory/melange-origin-is-filtered-export.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-28-0c1fea\\memory\\melange-origin-is-filtered-export.md", sha256: "b23de206fa38a229fb05f4412623da800c330a7672ddb99fe9dba28a48df4af2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-origin-is-filtered-export-2026-10-29.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-origin-is-filtered-export-2026-10-29.md", sha256: "b5e90fcf0e1b808f409cd472ae3d9e5bef111ac7515018837843d85ade1ff63b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-public-repo-unfiltered-branches-2026-10-18.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-public-repo-unfiltered-branches-2026-10-18.md", sha256: "639024f95ea2e4b7926a3c8176e2c8a383518d865f463fcd9ed6484490ff3a6c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-main-sync-lane-2026-10-23.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-main-sync-lane-2026-10-23.md", sha256: "47cecf338cc66352dd2a7cfbafd470ae889614b264d7e2c0e69de8da120f4dc8"}
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/troubleshooting"]
---

# Melange main reconcile and live-tree move of 2026-10-16/17

> On 2026-10-16/17 Paul had the Melange repository's three unrelated histories reconciled: the GitHub default branch went back to `main`, the roughly 49 commits made directly on the published lineage were ported onto local main as one reviewed commit, and the live tree was moved onto the result with a snapshot and file backups taken first. Eleven commits of live-tree work then landed on main and were mirrored. Nothing was pushed to GitHub, and a republish of main would change nothing.

## Context

- Project: [[melange-systems]]; the repository and its history: [[melange-fec-pipeline]]; the off-box copy that holds every backup ref: [[melange-repo-mirror]]. This is the October continuation of the July to September family titled "Live tree, git drift and line endings", which records the earlier drift census, the 2026-09-19 reconcile and the line-ending census.
- Three lines of history exist by design. Local `main` is the source history. `origin/main` on GitHub is a curated, orphan publish lineage that `ops/release_lib/export.py` builds over `fec/`, `ops/` and `requirements.txt`. The branch GitHub used as its default until 2026-10-16 was a third, unrelated line. `DEVELOPMENT.md` (lines 3 to 13) states the rule: source history is not published, local `main` is never pushed as it stands, and changes are made on local `main`, then exported and fast-forwarded onto the published lineage.
- Local `main` could not be pushed in any case, because 28 of its blobs exceed 100 MB.
- After release 1.0.4 about 49 commits were made directly on the published lineage in the `ReleasePublish` checkout, contrary to the rule above: the G1 to G9 fixes, the desktop 1.0.4 and 1.0.5 builds, the Authenticode binding and the updater fixes. That work existed only on GitHub until this reconcile.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Approved the 2026-10-17 live-tree move; the seven reviewed conflict proposals were written after that approval. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[melange-repo-mirror]] | Holds every backup ref and the recreated integration branch; the only off-box copy of this work. |
| [[melange-fec-pipeline]] | The `fec/` code whose files were merged, plus the `ops/` desktop client and the publish tooling. |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## History

| Date | Event |
|---|---|
| 2026-10-16 | The GitHub default branch of the Melange repository was set back to `main` (it had pointed at a feature branch). `origin/HEAD` was refreshed in the live repository and in `C:\Users\pgoff\ReleasePublish\melange`. |
| 2026-10-16 | **Branch and worktree cleanup across repositories.** Terrier: 7 merged local branches deleted (three `claude/*-csv-guard`, four `codex/terrier*`), the `deploy/terrier-build` branch and worktree removed, and the `deploy/terrier-hosted` worktree (`C:\Users\pgoff\worktrees\dep-terrier`) removed with its remote branch kept; local `main` fast-forwarded from `8f50713` to `7d2dd10`. Mentat: `main` fast-forwarded to `8409d13`. Melange: three local branches deleted (`claude/mentat-app-updates-a31c96`, `claude/zen-feistel-e738aa`, `security/mentat-guards`). Melange still has about 44 worktrees and about 410 branches, mostly unmerged; they were not trimmed. |
| 2026-10-16 | **Backups before any reconcile step**, kept locally and on the mirror: `backup/main-pre-reconcile-20261016` (`c6b9494d6`), `backup/public-main-20261016` (`5a5d69d8c`), and further `backup/` branches dated 20261016 covering the other lines of history, with backup refs for the fetched pull-request heads. |
| 2026-10-16 | **Port.** Branch `port/public-lineage-20261016` (`76e2a857b`) is one commit on `integration/melange-20261016` that imports the 84 public-only paths (28 added, 56 modified) between `2c4eae9f5` and `5a5d69d8c`. There were zero conflicts, every path is blob-equal to `origin/main`, and the tests showed no regressions. |
| 2026-10-17 | **Live-tree move, with Paul's approval.** Snapshot ref `refs/backup/live-tree-pre-ff-20261017` (`a5dbab3e`, also on the mirror) and file backups with a sha256 manifest in `C:\Users\pgoff\melange-live-backup-20261017\` were made first. `main` then moved from `c6b9494d6` to `76e2a857b`. Of 208 changed paths, 147 were already equal, 33 were updated, 3 merged cleanly and 25 conflicted: 18 conflicts were line-ending only (the new version was taken) and 7 were real, so reviewed proposals were written after Paul's approval for `fec/daily_refresh.py`, `fec/engine/forecast_ledger.py`, `fec/surfaces/staffer_live_server.py`, `fec/tests/run_tests.py`, `fec/tests/engine/test_forecast_ledger_resolution.py`, `ops/desktop/client/main.cjs` and `ops/desktop/client/runtime.cjs` (with `ops/desktop/client/tests/profile.test.cjs` alongside). Tests afterwards: desktop client 183 of 183, forecast ledger 17 of 17. |
| 2026-10-17 | **Behaviour changes that came with the move.** The staffer-live index endpoints return 503 only when startup failed and the dashboard is not ready. `mlk-boot.js` receives the desktop storage prefix at serve time. The forecast ledger skips a non-prospective freeze with a note instead of raising. |
| 2026-10-17 | **Line endings.** 1,577 tracked files that differed from the committed bytes only by CRLF were rewritten to the committed (LF) bytes; 76 were skipped because they held real edits, a CR inside the blob, or were absent. |
| 2026-10-17 | **Republish check.** An export of `main` at `76e2a857` equals `origin/main` at `5a5d69d8c` on the export roots, so there is nothing to publish. |
| 2026-10-17 | **Live-tree work committed on `main`**, in seven groups: `241a51cd7` desktop district switching, portable mode and loading screen; `aa9774dd7` speech pipeline; `bcdeda403` legislation and legacy direction archive audit; `d636f8896` cosponsor research; `00cecb13e` approved network UI and bundle builder; `9dbd2ad51` core and collection; `0a58ee4b1` quant model evaluation skill. Then four data commits: `f9db884c6` retrained own-source stance model (sha256 verified); `497c3b806` vote source snapshot and LIWC calibration candidate; `376e49d50` collector sentinel markers; `5e7731f1c` removal of superseded holistic network manifests. `main` is `5e7731f1c` and equals mirror `main`. Nothing was pushed to GitHub. |
| 2026-10-17 | **Mirror.** The stale `integration/melange-20261016` branch (`3a0255784`, the superseded first attempt that handled CRLF only) was deleted and recreated from the local `31588848`; a temporary `-local` duplicate was removed; the old commit is kept at `refs/backup/mirror-integration-20261016`. |
| 2026-10-17 | **Publish tooling.** `ReleasePublish\_tools\export_copy.py` was synced to `main`'s `export.py` (the G8 exclusion of five research tests; backup `.bak-20261017`), and `filter_export.py` now remaps `ops/export.gitattributes` to the root `.gitattributes`. That remap is the only one: the `ops/github` workflows deliberately stay inert under `ops/github/`. `C:\Users\pgoff\ReleasePublish\NEXT_PUBLISH_NOTES.md` records the steps for the next republish: drop `ops/export.gitattributes`, add the root `.gitattributes` blob `cf82e8c3255c`, add a SOURCE_PROVENANCE addendum (28 to 27) and a new FILTER_REPORT addendum. |

## Lessons and rules

- Do release work on local `main`, then republish. Do not commit directly in `ReleasePublish`; that is how the 49 commits came to exist only on the published lineage.
- The Claude desktop app's git polling can leave stale 0-byte `.git/index.lock` files. They were moved aside only after checks and never while a git process was live.
- Edits made by tools running inside the Claude MSIX package to paths under `AppData\Local` are silently virtualised; verify such an edit from outside the package.
- A live-tree move onto a new `main` needs a snapshot ref, file backups with hashes, a per-path classification (equal, updated, clean merge, line-ending-only conflict, real conflict) and reviewed proposals for the real conflicts, which is the pattern this move followed.

## Open

- `origin/main` already contains some source-history commits (for example `8f44cb6a2`) that go against `DEVELOPMENT.md`'s linear-publication rule. Handle them at the next republish.
- Whether any of this belongs in the decision ledger has not been checked. The ledger mirror under `ledger/melange-systems-brain/` is generated; its source is the `melange-systems-brain` brain at `C:\Users\pgoff\OneDrive\Desktop\Project Brain\brains\melange-systems-brain\` (`DECISIONS.md`), edited through `brainctl`.

Update 2026-10-30: The published origin is a filtered public export with no shared history with local main, so no lane session pushes a local branch raw to origin (an agent was stopped before doing so on 2026-10-28 and again on 2026-10-29 with nothing reaching origin; when Paul reaffirmed that push later on 2026-10-29, the overseer session made it itself after a full-history secret and PII scan); work is otherwise published only through the ReleasePublish filtered route as a new branch plus a pull request into main. On 2026-10-23 a desktop main-sync lane sent the shipped inner-signing lineage to public main that way (Melange PR #63; confirm it merged before a desktop rebuild) and changed the release-signing census to detect signable binaries by their DOS MZ/PE header instead of file extension, skipping the NSIS Stubs templates because signing them makes makensis emit an installer that signtool refuses.
