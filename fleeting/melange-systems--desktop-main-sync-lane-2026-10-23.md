---
type: fleeting
title: "Desktop main sync lane (2026-10-23)"
aliases: ["desktop-main-sync-lane-2026-10-23"]
source: "session"
captured_at: 2026-10-23
created_at: 2026-10-23
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-main-sync-lane-2026-10-23.md", type: "claude-memory", synced_at: "2026-10-23", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-main-sync-lane-2026-10-23.md", sha256: "9813a8e58f5558f1be97e8ab1d554f7638c11319b8b1304a06e409c301dc4b1a"}
updated_at: 2026-10-23
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop main sync lane (2026-10-23)

> 2026-10-23 lane landing the shipped inner-signing lineage on PUBLIC main via PR #63 plus a PE-header signing census; route facts and traps for future publishes

## Content

Lane desktop_main_sync_20261023 (worktree ecstatic-morse-1e4ca8, branch claude/eloquent-haslett-ffa2d9). PR https://github.com/pjg93-222/Melange/pull/63 (head c164fb9b1, filtered via ReleasePublish) merges 19d1f68 + 3958bc6 lineage with origin/main and changes `ops/desktop/client/release-signing.cjs` to census signing targets by DOS `MZ` + `PE\0\0` at e_lfanew instead of extension, excluding NSIS `Stubs\*`. Receipt: `audits/desktop_main_sync_20261023/receipts/` (local branch only; `audits/` is outside the filter roots).

Facts worth keeping:
- Target lineage ruling: both shipped commits base on public PR merges (#39, #54), so the sync landed on PUBLIC main (origin/main), not private local main 5eeeb3b07.
- origin/main had already merged 3958bc6 via PR #59 and PR #60 (187ccd569 dropped `-ExecutionPolicy Bypass`; its own test forbids the flag). On this box Windows PowerShell policy is Undefined in all scopes, so `tests/release-signing.test.cjs` "actual Windows subprocess" test fails unless run with env `PSExecutionPolicyPreference=Bypass`. Pre-existing on main; not a regression.
- Signing NSIS `Stubs\*` exehead templates (they are MZ/PE) makes makensis emit an installer signtool refuses with 0x800700C1. Any header-based census must skip them.
- ReleasePublish route: `_tools/filter_export.py <worktree> <sha> out rep melange melange`, temp-index plumbing in `C:\Users\pgoff\ReleasePublish\melange` (commit-tree -S, author Paul, committer Melange Release), gitleaks with+without baseline, single refspec push to `publish/<name>-<date>`, `gh pr create --base main`. Append a PUBLISH_RECEIPT.md section (BD, BE used here). Other sessions share that clone: never touch its index/HEAD, use GIT_INDEX_FILE only.
- Trap: gitleaks default git mode skips a merge commit's own diff; on merge-shaped filtered commits rerun with `--log-opts=-m` or `gitleaks stdin` over the diff.
- `district-packs.test.cjs` can flake with EPERM renames in %TEMP%; rerun alone.

**Why:** Paul's rules: installers build only from main; PRs only via the filtered route; CodeRabbit read on every PR.
**How to apply:** before a desktop rebuild, confirm PR #63 merged; run client tests with the Bypass env var; reuse the route steps above. Related: `reliability-2026-10-implementation-lane-2026-10-23`, `melange-public-repo-unfiltered-branches-2026-10-18`, `always-read-coderabbit-2026-10-18`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-23 from the Claude Code memory file `desktop-main-sync-lane-2026-10-23.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
