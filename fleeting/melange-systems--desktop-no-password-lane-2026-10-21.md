---
type: fleeting
title: "Desktop no password lane (2026-10-21)"
aliases: ["desktop-no-password-lane-2026-10-21"]
source: "session"
captured_at: 2026-10-21
created_at: 2026-10-21
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-no-password-lane-2026-10-21.md", type: "claude-memory", synced_at: "2026-10-21", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-no-password-lane-2026-10-21.md", sha256: "40003d05d31cc101f2a1b6197c6e9b695fba80e15bf3f1cb06d2329d7cbae576"}
updated_at: 2026-10-21
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop no password lane (2026-10-21)

> 10-21 Paul asked to drop the Terrier password and make Melange/Mentat a one-time verification; Melange PR #27 open, Terrier commit local-only (Geo repo is PUBLIC)

## Content

Paul (2026-10-21): "get rid of the password option for terrier? And Mentat and Melange, just a one time verification?"

What was built:
- Terrier repo (`Documents\Terrier\outputs\cu-geography-v3`), branch `desktop-no-password`, commit `8d448fd` on `a290240` (= `claude/walk-list`). `password_lock_disabled()` in `server/research/desktop_access.py` is now the default for the bound existing-owner; the `.desktop-password-lock-disabled` flag file and setting are removed. Invited recipient accounts still use their own passwords. Hosted CU_LOCAL_ADMIN refusal unchanged.
- Melange: `ops/desktop/client` device-trust record (`access-device` credential scope), bound to grantId+deviceId. Asks once per computer; Lock workspace forgets it. Commits `a6213ee6d` + `ac0b7d18e` (F1 lock-race guard, F2 README) in worktree `agent-a088ae1dc78c6b259`. Published via ReleasePublish as PR #27 (`publish/desktop-no-password-20261021`, 704420ada).
- Opus security review: safe to ship; F1/F2 fixed.

Paul (10-21): "Finish it up, Fable oversees." Both halves MERGED:
- Melange PR #27 merged `9c1c94890` on origin/main (CodeRabbit: one valid lock/epoch race fixed in `1eca83442`, thread resolved; docstring + "durable revoke on failed delete" declined — the latter is Paul's design call). Receipt AT in PUBLISH_RECEIPT.md.
- Terrier: pjg93-222/Geo is PUBLIC (10-08 note said private) but `claude/walk-list` was already public, so pushed code-only branch; PR Geo#2 merged `505c2d7a` into `claude/walk-list`, gitleaks clean, no CodeRabbit findings.
- Release: 1.0.8 AND 1.0.9 already shipped 10-20 (ledger seq 5); next is **1.0.10 seq 6**. 1.0.9 client came from branch `desktop/one-click-trust-silent-update` (78c94a31b, `Melange-wt\one-click-trust-1.0.9`), NOT main. Release tooling in `Documents\Desktop-Installers-2026-10-19` has stale worktree paths. Release run delegated 10-21 (see session).

**How to apply:** landing needs a full rebuild of all 3 apps with runtimes and a version bump (an inject.cjs repackage leaves Melange/Mentat prompting every launch). Ship the Terrier server change with or before the client. Related: `desktop-invite-code-lane-2026-10-20`, `melange-public-repo-unfiltered-branches-2026-10-18`, `always-read-coderabbit-2026-10-18`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-21 from the Claude Code memory file `desktop-no-password-lane-2026-10-21.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
