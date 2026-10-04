---
type: actor
name: "Melange repo mirror"
aliases: ["remote 'mirror'"]
category: "infra"
description: "Bare git remote 'mirror' at C:\\Users\\pgoff\\GitMirrors\\melange-systems.git, outside OneDrive and inside Carbonite's backup set; the only off-box copy of git-tracked Melange work."
repository: "C:\\Users\\pgoff\\GitMirrors\\melange-systems.git"
stack: "Bare git repo (remote named mirror); Carbonite for off-box carriage; post-commit and post-merge git hooks"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "GitHub (or any cloud remote) is IMPOSSIBLE without history surgery: tracked blobs up to 2.6 GB (audits/legfix5 packets) vs the 100 MB limit"
  - "The mirror path is on the same physical C: drive; it only protects because Carbonite carries it off-box"
  - "Hooks are unversioned (<live>\\.git\\hooks\\post-commit and post-merge): re-create after a re-clone"
  - "A rewritten (non-fast-forward) branch is never forced, so it stays stale on the mirror until someone decides"
  - "A failed hook push exits 0 and is only recorded in .git\\mirror-push-failures.log: check it at close-out"
  - "git update-ref / branch -f moves fire no hook"
  - "Scope limit: covers git-tracked work only; the glassbox runtime at ~\\.claude\\glassbox is UNTRACKED and single-disk"
  - "As of 2026-10-03 the mirror holds 3 refs that no longer exist locally (left alone): claude/loving-hugle-6ebcb4, claude/holistic-normalized and backup/melange-math-eval-skill-18e907-4d54uu (the ONLY copy of 4 QME commits); every local branch (339 of 339) is present and current. This replaces the older item: 2 mirror-only branches, and claude/wizardly-wilbur-e2d1a0 and claude/melange-data-expansion-958236 NOT on the mirror (2026-09-18)"
  - "Never git push --mirror to it: that would prune the mirror-only refs, including the only copy of 4 QME commits"
  - "The post-commit hook pushes only the branch just committed, so branches created without a commit (worktree branches) drift until a --all refresh"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/repo-mirror-2026-08-11.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\repo-mirror-2026-08-11.md", sha256: "7cfbd6eb35a782151a209c74bb3499efeeb44b9462dfcc4606da4eff5dd9ad09"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/infra"]
---

# Melange repo mirror

> Off-box mirror of the Melange Systems git repo: remote `mirror` pointing at a bare repo outside OneDrive, inside Carbonite's backup set. Set up by Paul's direction on 2026-08-11; since 2026-08-18 it carries every branch and tag, and since 2026-09-19 git hooks push committed or merged branches automatically.

## Details

Source note description (recorded as written): "Off-box git mirror (remote "mirror", Carbonite-covered); as of 2026-08-18 ALL branches+tags are mirrored, not just main; OneDrive fsck "missing objects" = dehydration, not corruption; GitHub blocked by 2.6GB blobs".

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\GitMirrors\melange-systems.git` (bare; remote name `mirror` in the working repo) |
| Stack | Bare git repo; Carbonite carries it off-box; `post-commit` / `post-merge` hooks push to it |
| Status | active |
| Criticality | high (the only off-box copy of git-tracked Melange work) |
| PCI | no |
| Team | none |

Set up and Carbonite badge confirmed 2026-08-11 (Paul-directed). The bare repo lives outside OneDrive and inside Carbonite's backup set; Carbonite is what carries it off-box (the mirror path itself is on the same physical C: drive and provides no protection on its own, see [[2026-08-incident-workstation-disk-and-backup]]). First push verified sha-identical `@b76d8807`, mirror `fsck` clean, 3.0 GB (repacked from the 6 GB working `.git`).

## Dependencies

- Depends on: the working Melange repo (`melange-systems`; its `.git` lives under OneDrive) as the push source; see [[melange-systems]] (project) and [[melange-fec-pipeline]] (the `fec/` code tree whose tracked work it protects).
- Depends on: Carbonite (off-box carriage of `GitMirrors\melange-systems.git`); coverage facts in [[2026-08-incident-workstation-disk-and-backup]].
- Host: [[lg-gram-workstation]] (single C: drive; no external drive attached).
- Depended on by: [[2026-07-troubleshooting-melange-live-tree-git-drift]] (live-tree branch state and lane close-outs rely on it being current).
- External, not in the vault: GitHub is NOT usable as a cloud remote (see Known Issues); `gh` CLI is not installed. Other memory notes referenced as context: `universal-lane-laws-2026-08-09`, `live-tree-branch-state-2026-07-14`, `project-brain-toolkit-2026-08-11` (the Project Brain repos' own mirror hook), `backup-coverage-gap-2026-09-07`.

## Flows

- Working repo -> `mirror`: `git -C "<repo>" push mirror main` (manual refresh after any merge to main; push mirror main at every merge gate).
- Full mirror: `git push mirror --all` + `--tags`.
- Automatic: `post-commit` and an identical `post-merge` hook push the branch just committed or merged (see Automatic push hooks).
- `mirror` -> Carbonite -> off-box (the only way the mirror becomes off-box).

## Dev Commands

```bash
# Refresh after any merge to main (not automatic for main-only; hooks cover committed/merged branch)
git -C "<repo>" push mirror main

# Full mirror (Paul-ordered 2026-08-18, 2026-09-19 and 2026-10-03), no force
git push mirror --all
git push mirror --tags
# never `git push mirror --mirror`: it would prune mirror-only refs (2026-10-03)

# Check what the mirror actually holds before claiming anything is unmirrored
git ls-remote --heads mirror
git ls-remote --heads mirror main   # compare against local main at close-out

# Corruption diagnosis on the OneDrive working repo: walk main's closure first, THEN fsck
git rev-list --objects main
git fsck
```

Failure log to check at close-out: `.git\mirror-push-failures.log` (in the working repo).

## Known Issues

- GitHub blocked: tracked blobs up to 2.6 GB (audits/legfix5 packets) vs the 100 MB limit, so a cloud remote is IMPOSSIBLE without history surgery. Never suggest a plain `git push` to GitHub as a quick option. `gh` CLI is not installed.
- Nobody pushes `main` automatically except via the hooks; lanes that commit to main kept forgetting before the hooks (see History).
- OneDrive `git fsck` "missing objects" is dehydration, not corruption (see below).
- Same physical C: drive: protective only because Carbonite carries the path off-box.
- Hooks are unversioned: re-create after a re-clone.
- Failed hook pushes are silent (exit 0); only the log and a Glass Box FAIL event show them.
- Rewritten (non-fast-forward) branches are never forced and stay stale on the mirror until someone decides.
- `git update-ref` / `branch -f` moves fire no hook.
- Scope limit: git-tracked work only. The glassbox runtime at `~\.claude\glassbox` is UNTRACKED and remains single-disk.
- 2 branches exist on the mirror that no longer exist locally (left alone). As of 2026-10-03 there are 3 such refs: `claude/loving-hugle-6ebcb4`, `claude/holistic-normalized` and `backup/melange-math-eval-skill-18e907-4d54uu`, the ONLY copy of 4 QME commits (source `repo-mirror-2026-08-11`, newer version).
- As of 2026-09-18 two local branches are NOT on the mirror: `claude/wizardly-wilbur-e2d1a0` and `claude/melange-data-expansion-958236` (the backup bundle that held them was cleared after verifying each head was identical to the local branch; see [[2026-08-incident-workstation-disk-and-backup]]). Superseded: the full refreshes of 2026-09-19 (292 of 292) and 2026-10-03 (339 of 339) verified every local branch present and current on the mirror.
- Never `git push --mirror` to it: it would prune the mirror-only refs, including the only copy of 4 QME commits (2026-10-03).
- The post-commit hook pushes only the branch just committed, so branches created without a commit (worktree branches) drift; refresh with `--all` at close-out (2026-10-03).

## Why it exists: OneDrive dehydration is not corruption

The working repo's `.git` lives under OneDrive. Files-on-demand dehydration makes `git fsck` report MISSING OBJECTS that are not real corruption. A full `git rev-list --objects main` walk hydrates them and fsck comes back clean. **Never diagnose corruption from a first fsck pass on this repo; walk main's closure first.** The mirror is immune to this class entirely.

## Standing rule: how to apply

- Push `mirror main` at every merge gate (it is not automatic for main by hand).
- Check `git ls-remote --heads mirror` before claiming anything is unmirrored (the old "only main is backed up" assumption is dead).
- A future cloud remote (GitHub) is IMPOSSIBLE without history surgery; tracked blobs up to 2.6 GB (audits/legfix5 packets) vs the 100 MB limit, so never suggest a plain `git push` to GitHub as a quick option. `gh` CLI is not installed.
- At lane close-out check `git ls-remote --heads mirror main` against local main, and check `.git\mirror-push-failures.log`.
- Refresh with `git push mirror --all` + `--tags` at close-out (no force): the hooks push only the branch just committed or merged, so worktree branches created without a commit drift. Never use `--mirror`, which would prune mirror-only refs such as `backup/melange-math-eval-skill-18e907-4d54uu`, the only copy of 4 QME commits (2026-10-03).

## History

| Date | Event |
|---|---|
| 2026-08-11 | Paul-directed setup. Remote `mirror` -> `C:\Users\pgoff\GitMirrors\melange-systems.git` (bare, outside OneDrive, in Carbonite's backup set); Carbonite badge confirmed. First push verified sha-identical `@b76d8807`, mirror fsck clean, 3.0 GB (repacked from the 6 GB working .git). Only `main` and one working branch mirrored at this point. |
| 2026-08-18 | Full mirror (Paul-ordered "push the mirror" then "Everything"): `git push mirror --all` + `--tags`; all **174** local branches and all 3 tags on the mirror, verified branch-by-branch present AND current (174 local == 174 remote, zero behind). Before this only `main` and one working branch were mirrored, so ~170 branches (including historically stranded ones and the then-active `codex/c1-2026-collector` and research-integration lanes) were single-disk on OneDrive. |
| 2026-09-07 | Backup-coverage measurement confirms `GitMirrors\melange-systems.git` is OUT of OneDrive, IN Carbonite, so Carbonite carries it off-box (3.0 GB, "never delete"); see [[2026-08-incident-workstation-disk-and-backup]]. |
| 2026-09-08 | Mirror `main` last updated here (`2049fea9f`); it then sat eleven days behind. |
| 2026-09-19 | Full mirror again (Paul: "push the mirror"). The mirror's `main` had sat at `2049fea9f` since 2026-09-08 (eleven days, every lane's commits behind) and 88 of 292 local branches were absent (among them `claude/melange-systems-code-review-859518`, the only home of the 09-13 code-review packet at `77959ae74`). `git push mirror main`, then `--all` and `--tags`, no force: 90 refs pushed, 0 rejected; verified 292 of 292 local branches present and current, tags 3 of 3, `main` = `a19c796d2`, mirror 3.1 GB. The mirror holds 2 branches that no longer exist locally (left alone). |
| 2026-09-19 | Same day: the Project Brain repos (which had no remote at all) got "set up the brain mirror" and now push themselves from a post-commit hook (see `project-brain-toolkit-2026-08-11`). Paul then ordered "add the hook to melange too" (brain D-059): hooks installed on melange (see below). Proven by a real empty commit `b99ba565d` on the session branch. |
| 2026-10-03 | Full mirror (Paul: "refresh the mirror with all branches"): `git push mirror --all` + `--tags`, no force, never `--mirror` (it would prune mirror-only refs, including `backup/melange-math-eval-skill-18e907-4d54uu`, the ONLY copy of 4 QME commits). 27 new branches pushed, 0 rejected; verified 339 of 339 local branches present AND current, tags 3 of 3, `main` = `3248a6a02` on both sides. Mirror-only, left alone: `claude/loving-hugle-6ebcb4`, `claude/holistic-normalized`, `backup/melange-math-eval-skill-18e907-4d54uu`. The post-commit hook pushes only the branch just committed, so branches created without a commit (worktree branches) still drift: refresh with `--all` at close-out. |

## Automatic push hooks (brain D-059, 2026-09-19)

- Locations: `<live>\.git\hooks\post-commit` and an identical `post-merge`. Each pushes the branch just committed or merged: ONE branch, never forced, synchronous (measured 0.2-1.2 s); tags are not pushed.
- The hooks dir is shared by all 16 linked worktrees, `C:\Users\pgoff\Mentat` included.
- A failed push exits 0, appends to `.git\mirror-push-failures.log` and emits one FAIL Glass Box event (source `melange-mirror-hook`). Check that log at close-out.
- A rewritten (non-fast-forward) branch is never forced, so it stays stale on the mirror until someone decides.
- Hooks are unversioned: re-create after a re-clone.
- `git update-ref` / `branch -f` moves fire no hook.
- Proven by a real empty commit `b99ba565d` on the session branch.
- Before the hooks, "nobody pushes it automatically: lanes that commit to main keep forgetting, so check `git ls-remote --heads mirror main` against local main at close-out" stays good practice.

## Backup context and coverage verdicts (from the 2026-09-07 backup measurement)

- `GitMirrors\melange-systems.git`: OUT of OneDrive, **IN Carbonite**, so Carbonite carries the mirror off-box; the mirror path is on the same physical C: drive and provides no protection on its own.
- Never delete the mirror (3.0 GB; "Carbonite off-box path" in the disk-clearance KEEP list). `C:\tmp\clone_probe` (6.65 GB, a 2026-09-06 mirror probe, unborn HEAD) shares the mirror's pack and is a separate clone, not the mirror.
- Scope limit: git-tracked work only; the glassbox runtime at `~\.claude\glassbox` is UNTRACKED and remains single-disk.

## Related Actors

- [[lg-gram-workstation]] - Paul's LG Gram 17Z90UB Windows 11 laptop: NPU BSODs, AppXSvc leak, Codex MSIX loop, C: disk exhaustion, OneDrive/Carbonite gaps
- [[melange-fec-pipeline]] - Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch

## Related Topics

- [[2026-07-troubleshooting-melange-live-tree-git-drift]] - Melange live tree vs git: branch drift, live-only files, 35-commit reconcile, EOL census, live_patch.py cutter, off-box mirror
- [[2026-08-incident-workstation-disk-and-backup]] - C: filled by repo worktrees, cleared repeatedly (185.9 GB free on 2026-09-18); OneDrive stalled since 08-11; backup gaps
- [[2026-08-incident-workstation-disk-and-backup-backup-gap-and-census]] — The workstation backup coverage gap measured on 2026-09-07 and the point-in-time disk census of 2026-09-11.
- [[melange-fec-pipeline-live-tree-drift-and-eol]] — Live tree versus committed tree drift of the fec/ pipeline: the 2026-09-13 census, the 09-19 reconcile, and the line-ending census with the shared line-wise patch cutter and its kernel results.
- [[2026-07-troubleshooting-melange-live-tree-git-drift-branch-state-and-mirror]] — The off-box git mirror of the Melange repository and the dated live tree branch state entries from 2026-07-14 to 08-14.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
