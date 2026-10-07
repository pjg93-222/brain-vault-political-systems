---
type: fleeting
title: "Brain vault sync mechanism (2026-10-07)"
aliases: ["brain-vault-sync-mechanism-2026-10-07"]
source: "session"
captured_at: 2026-10-07
created_at: 2026-10-07
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brain-vault-sync-mechanism-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brain-vault-sync-mechanism-2026-10-07.md", sha256: "790ed4c43b2a21a9d11edfd78c8967839f48eb083dc00443bd8dd325c3bd9031"}
updated_at: 2026-10-07
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
- Six curated notes from 10-05 11:49 (behavior-qualified-recognition, demographic-potential-method, single-look-holdout-discipline-look-ledger, staffer-spine adjudication, forecast attempt3 v6 topic, sector-growth-study topic) stay uncommitted because their log.md lines say Paul approved them with "no commit or push". Ask Paul before committing them.

**Why:** "Left for the vault's normal flow" silently meant never synced; tonight six session commits sat unpushed until Paul said "make sure it syncs".
**How to apply:** after any vault write, commit by explicit path AND push via the PR flow in the same session (secret-scan first). Don't assume a later process will do it. Graph-page rebuild failed at 00:59/01:00 on 10-07 ("build exited with code null"), unresolved.

Related: `bedrock-recall-silent-failures-2026-10-07`, `brainlink-knowledge-system-2026-10-05`, `backup-coverage-gap-2026-09-07`.

## Possible Connections

- [[brain-vault-political-systems]] — keyword match from recall, unverified
- [[2026-10-feature-brain-vault-setup]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-07 from the Claude Code memory file `brain-vault-sync-mechanism-2026-10-07.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
