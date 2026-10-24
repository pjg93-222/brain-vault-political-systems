---
type: fleeting
title: "Brain vault sync mechanism (2026-10-07)"
aliases: ["brain-vault-sync-mechanism-2026-10-07"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[brain-vault-political-systems]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brain-vault-sync-mechanism-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brain-vault-sync-mechanism-2026-10-07.md", sha256: "f6cb0f88660946963911aed1ba4464f34e48add7bfdfaf12f15ff5960e381159"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Brain vault sync mechanism (2026-10-07)

> How the Obsidian/Bedrock brain vault actually syncs - nothing auto-commits; sessions commit + push via PR flow to private GitHub; not under OneDrive

## Content

The brain vault (C:\Users\pgoff\Documents\brain) has NO automatic sync. Verified 2026-10-07:
- The Stop/SessionEnd hook (`hook.ts sync`) only captures memory files into fleeting/; it "never commits or pushes" (.bedrock/recall/sync.ts:18, vault CLAUDE.md:66). No git hooks, no scheduled task.
- It is NOT under OneDrive: local Documents. The redirected Documents is OneDrive\Documents, which has no brain folder. The only off-machine copy is GitHub.
- The flow is ordinary commits plus a PR: .bedrock/config.json:16 `"strategy": "commit-push-pr"`. The remote is the private repo pjg93-222/brain-vault-political-systems. Sessions push a branch, open and merge a PR, then push main (PRs #1-#7; #7 merged 2026-10-07, main = 3e7c22c).
- bedrock:sync is a different thing: it re-fetches external sources (Confluence, Google Docs, GitHub).
- The six curated notes held since 10-05 ("no commit or push") were committed on 10-07 after Paul lifted the hold: feafff3, PR #8 merged.
- Graph page: the sync hook used to build brain-graph.html inline with a 20 s Bun.spawnSync timeout (sync.ts:53), which got killed under CPU load ("exited with code null" = Bun's timeout kill) or when the hook process died. Fixed in 8e1e5df: a detached `hook.ts graph` worker with a 120 s limit and one retry; final failures go to .bedrock/sync/graph-fail.txt and show on the next sync. The rest of sync still runs inside the hook and can exceed the 30 s limit under heavy load (unfixed).

**Why:** "Left for the vault's normal flow" silently meant never synced; tonight six session commits sat unpushed until Paul said "make sure it syncs".
**How to apply:** after any vault write, commit by explicit path AND push via the PR flow in the same session (secret-scan first). Don't assume a later process will do it.

Related: `bedrock-recall-silent-failures-2026-10-07`, `brainlink-knowledge-system-2026-10-05`, `backup-coverage-gap-2026-09-07`.

Superseded in part on 2026-10-15 by D-224 (`vault-integration-lane-2026-10-15`): generated and captured brain-vault files now auto-commit and push to main after a fail-closed secret scan; hand edits still go through the PR flow. Index hook until 2026-10-24, now stale: NOTHING auto-commits;commit+PR-push private GitHub same session

## Possible Connections

- [[brain-vault-political-systems]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `brain-vault-sync-mechanism-2026-10-07.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[brain-vault-political-systems]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
