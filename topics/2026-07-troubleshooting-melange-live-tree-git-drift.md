---
type: topic
title: "Live tree, git drift and line endings"
aliases: ["Live tree, git drift and line endings"]
category: "troubleshooting"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[melange-fec-pipeline]]"
  - "[[melange-repo-mirror]]"
objective: "Keep the Melange live tree, committed main and the off-box mirror coherent: know which branch the live tree is on, make committed HEAD runnable on its own, record live-only content without silently ratifying it, patch live files without corrupting line endings, and keep every branch mirrored off-box."
created_at: 2026-07-14
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/live-tree-eol-census-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\live-tree-eol-census-2026-09-19.md", sha256: "8d1bd8b910e194fd59a3663aed40a3c0dca3626eccc843e2a0fc49fef2ca19c7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-live-tree-reconcile-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-live-tree-reconcile-2026-09-19.md", sha256: "466edb2a5c5a32457c4af1ef3b484372f128200f061a8751d654f8a6f5f286b2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/repo-mirror-2026-08-11.md", type: "claude-memory", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\repo-mirror-2026-08-11.md", sha256: "7cfbd6eb35a782151a209c74bb3499efeeb44b9462dfcc4606da4eff5dd9ad09"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/committed-vs-live-drift-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\committed-vs-live-drift-2026-09-13.md", sha256: "656f0a2e07d94186aa64d8bdf71bf498d76cd84759b30d6f5caae27543483dff"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/live-tree-branch-state-2026-07-14.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\live-tree-branch-state-2026-07-14.md", sha256: "0e48531d5dfbc92496fa4ea2e3cd48c25b2e2536236a96c6d0db35a557fa4d66"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/data-presentation-fixes-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\data-presentation-fixes-2026-10-09.md", sha256: "7eead6e6d9bb735454e3f7e594d690ff3205a807b8938cf9be2c08fd7520733d"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/troubleshooting"]
---

# Live tree, git drift and line endings

> The canonical live tree (`C:\Users\pgoff\OneDrive\Desktop\Melange Systems`) can sit on another session's branch; committed HEAD is not runnable alone (live-only files); the 2026-09-19 reconcile committed 35 whole-file commits (rulings R1/R2/R3 still open); the EOL census produced the line-wise cutter `fec/tools/live_patch.py` (apply with `-c core.autocrlf=false`, never normalise LIVE); an off-box git mirror carries every branch.

## Parts

- [[2026-07-troubleshooting-melange-live-tree-git-drift-branch-state-and-mirror]] — The off-box git mirror of the Melange repository and the dated live tree branch state entries from 2026-07-14 to 08-14.
- [[2026-07-troubleshooting-melange-live-tree-git-drift-drift-reconcile-eol]] — Committed versus live drift of 2026-09-13, the reconcile of 09-19 with the findings that overturn recorded beliefs, and the line-ending census with the shared patch cutter.

## Context

- Project: [[melange-systems]]; code: [[melange-fec-pipeline]] (the `fec/` tree and its chain `run_pipeline.py`); off-box copy: [[melange-repo-mirror]]; disk/backup context: Workstation disk and backup; owner: Paul Goff.
- Operating convention that created the gap: "work in the live tree, commit later"; the commit gap grew until main was not a working system and worktree reviews saw stale code. The live tree is what runs; main is a partial record of it.
- Git is Paul's under `no-git-plain-review-2026-09-01` (as cited by the disk-census note); commits and merges in these lanes happened only on Paul's explicit words (the 2026-09-06 per-lane lifting of the git ban is recorded in the working-agreement topics).
- Memory notes referenced (not vault entities): `ask-before-substantive-changes`, `laundry-list-closeout-2026-09-18`, `code-review-five-lanes-2026-09-13`, `mentat-uncommitted-reconcile-2026-09-18`, `verify-dont-infer-completion-2026-08-04`, `go-faster-directive-2026-09-16`, `scout-census-traps-2026-09-13`, `receipt-line-pins-vs-live-tree-2026-09-18`, `spawned-task-premise-may-be-stale-2026-09-14`, `universal-lane-laws-2026-08-09`, `project-brain-toolkit-2026-08-11`, `moneyball-architecture`, `moneyball-network-viz-requests`, `psych-audit-2026-07-09`, `staffer-stale-imports-lane-2026-09-06`, `backup-coverage-gap-2026-09-07`, `glassbox-everything-rule-2026-07-27`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[melange-fec-pipeline]] | Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch |
| [[melange-repo-mirror]] | Off-box bare git mirror (remote mirror, Carbonite-covered) of Melange Systems; all branches+tags, hook auto-push since 2026-09-19 |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[live-tree-patch-discipline]] — the 2026-09-19 EOL census lane landed fec/tools/live_patch.py; changes to a drifted LIVE go in as a patch applied with core.autocrlf=false, never through a checkout that normalises its line endings

## Related Topics

- Workstation disk and backup - C: filled by repo worktrees, cleared repeatedly (185.9 GB free on 2026-09-18); OneDrive stalled since 08-11; backup gaps

## History

| Date | Event |
|---|---|
| 2026-07-14 | Live tree found on `codex/official-persona-target-tone` @ `479e737` with uncommitted edits to `fec/audit_full.py`, `fec/make_member_desk.py`, `fec/templates/make_member_desk_00.tpl` (14 worktrees existed). |
| 2026-07-15 | Live tree back on `main` @ `d66da46` carrying a large uncommitted codex/ChatGPT WIP (113 tracked changes: 80 M / 22 A / 11 D, +24k lines, ~12 new source files; 15k untracked `outputs/`). Captured byte-faithfully into commit `e3d2923` (branch `snapshot/chatgpt-wip-2026-07-15`, branch `claude/melange-system-integration-95b6cd` 1 ahead); `main` advanced `d66da46` -> `e3d2923` via `git -C <live> reset e3d2923` (mixed). |
| 2026-07-27 | Live tree found CONCURRENTLY WRITTEN (lane_file_io campaign set grew 23 -> 26 producers); the other session committed it as `e09db5e` (59 files). |
| 2026-08-09 | Fix `a1436f9` merged: main took it, live branch merged main @ `7bc1168`. |
| 2026-08-11 | Off-box mirror set up (remote `mirror`, `C:\Users\pgoff\GitMirrors\melange-systems.git`); first push sha-identical @ `b76d8807`, fsck clean, 3.0 GB (repacked from the 6 GB working .git). |
| 2026-08-14 | Big worktree sweep: registered worktrees 40 -> 20, admin dirs 90 -> 19; later 10 trees relocated to `C:\melange-worktrees\<name>`; CPU-pegging incident (97.7% of 8 cores -> ~35%); loving-payne landed @ `846d90ae3`; sharp-kapitsa discarded; glasseye amendment to `.claude/commands/metaloop.md` left alone. |
| 2026-08-18 | Full mirror: `git push mirror --all` + `--tags`; 174 local branches + 3 tags verified present and current. |
| 2026-09-08 | Mirror `main` last at `2049fea9f` (until 09-19). |
| 2026-09-13 | Committed-vs-live drift census (main `2f11d9490`): four live-only files back committed callers; 53 files differ in content. |
| 2026-09-15 | Mentat addendum verified (second checkout `C:\Users\pgoff\Mentat`, branch `codex/mentat-crypto`). |
| 2026-09-19 | Reconcile: 35 whole-file commits `d97e775ae`..`a19c796d2` (first `109249aaa` baseline); EOL census; `fec/tools/live_patch.py` landed `423820d76`; test timeout fixes `99caafa95`, `624e593eb`; mirror pushed twice (main `a19c796d2`, then `423820d76`); brain post-commit/post-merge hook for melange (D-059). |
| 2026-10-03 | Full mirror again (Paul: "refresh the mirror with all branches"): `git push mirror --all` + `--tags`, no force, never `--mirror` (it would prune mirror-only refs, incl. `backup/melange-math-eval-skill-18e907-4d54uu`, the only copy of 4 QME commits); 27 new branches pushed, 0 rejected; 339 of 339 local branches present and current, tags 3/3, main `3248a6a02` both sides. |

## Decisions

- Record, not ratify (brain D-051): the reconcile commits record live content; each commit message says "records the live state, does not ratify". R1/R2/R3 stay Paul's.
- Line-wise patch contract (brain D-060): majority terminator, ONE shared helper `fec/tools/live_patch.py`, no `.gitattributes`, files never normalised; census extended to untracked files; brain drafts applied. Paul answered "Reconcile those loose ends and apply" (2026-09-19) - read as a go-ahead for the leaned recommendation on each ruling; it does not generalise to other lanes.
- Reconcile direction decided by CONTENT, never by commit date vs mtime (DE-028); the mtime cluster is not lane evidence (DE-036).
- "Do whatever is most optical, there should be no caps" (Paul 2026-09-19) authorised the reconcile plan; also answered R5: `DESK_MEDIA_CAP=0` means no cap ("default 50, 0=all") and live already had it. Does NOT generalise to other lanes.
- Mirror policy: push after every merge gate; Paul ordered "push the mirror" then "Everything" (2026-08-18), "push the mirror" (2026-09-19), "refresh the mirror with all branches" (2026-10-03), "set up the brain mirror", "add the hook to melange too" (D-059).
- GitHub as remote is IMPOSSIBLE without history surgery (tracked blobs up to 2.6 GB vs 100 MB limit); `gh` CLI not installed.
- Worktrees: move, don't delete (2026-08-14: 9 trees held uncommitted source edits, 6 held untracked design docs). Never remove a junction with `Remove-Item -Recurse` (use `cmd /c rmdir <link>` or `[System.IO.Directory]::Delete($p,$false)`).
- Paul's directive 2026-07-15: "whatever ChatGPT did, that is the version you should use, don't mess up."; "merge trees so everything is synced" -> canonical sync.
- ~~"Part of the modified count is CRLF-only" (close-out packet)~~ - false: 0 of 149 (reconcile 2026-09-19); then corrected the same day: `git status` CAN show a pure-EOL change as ` M` (it flags on size, without comparing content), though the 0/149 result stands.
- ~~"Code-review five lanes: nothing applied"~~ (`code-review-five-lanes-2026-09-13`) - stale: the review session applied 90/90 patches to LIVE on 2026-09-14T05:58Z.
- ~~"ROOT resolves to the live tree for DATA regardless of which worktree's CODE you run"~~ (2026-07-14) - corrected 2026-07-15: only true when `MONEYBALL_ROOT` is exported to the live tree.
- ~~"Mirror only has main and one working branch"~~ (2026-08-11) - superseded 2026-08-18 (all 174 branches), 2026-09-19 (292/292) and 2026-10-03 (339/339).

## Next Steps

- [ ] Paul: rulings R1 (class-B/E code-review hunks), R2 (2026-09-08 engine imputation rule), R3 (644-acts re-pin) - output-affecting, recorded as live, NOT ratified; also the weights ruling (S-5 of `code-review-five-lanes-2026-09-13`) first.
- [ ] Paul: R6 untrack the runtime/generated tracked files; R7 the regenerated manifest JSON (not committed: generated); R10 the 10 MB congress-legislators YAML (data-plane input); R11 ignore rules for `outputs/`, `tmp/`, evidence stores; R12 `fec/stance/api_stance_layer.py` (IndentationError, pre-existing).
- [ ] Commit-pass of the rest of the live tree (11 HELD modified files; the highest-value action Paul can take).
- [ ] Apply the unapplied scipy-freeze risk reduction if wanted: lazy-import scipy in `member_context.py`, `OPENBLAS_NUM_THREADS=1` (unproven; never reproduced).
- [ ] Register `fec/tests/infra/test_process_liveness.py` in a runner (found, not touched).
- [ ] Check `git ls-remote --heads mirror main` against local main at every close-out; read `.git\mirror-push-failures.log`. The hook pushes only the branch just committed, so branches created without a commit (worktree branches) still drift: refresh with `--all` + `--tags` at close-out, never `--mirror`; mirror-only refs left alone: `claude/loving-hugle-6ebcb4`, `claude/holistic-normalized`, `backup/melange-math-eval-skill-18e907-4d54uu`.
- [ ] Re-create the mirror hooks after any re-clone (unversioned).
- [ ] Residual shells: delete the 4 deregistered shells under `.claude/worktrees` after settle/reboot.
