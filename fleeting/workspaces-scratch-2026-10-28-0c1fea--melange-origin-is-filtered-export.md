---
type: fleeting
title: "Melange origin is filtered export"
aliases: ["melange-origin-is-filtered-export"]
source: "session"
captured_at: 2026-10-28
created_at: 2026-10-28
status: "raw"
promoted_to: ""
project: "workspaces-scratch-2026-10-28-0c1fea"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-28-0c1fea/memory/melange-origin-is-filtered-export.md", type: "claude-memory", synced_at: "2026-10-28", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-28-0c1fea\\memory\\melange-origin-is-filtered-export.md", sha256: "b23de206fa38a229fb05f4412623da800c330a7672ddb99fe9dba28a48df4af2"}
updated_at: 2026-10-28
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Melange origin is filtered export

> Melange origin (public GitHub) is a filtered export with no shared history with the local repo; never push local branches, publish only via ops/release_lib/export.py publish/* branches

## Content

The public repo `pjg93-222/Melange` (origin) has **no merge base** with the local repo at `C:\Users\pgoff\OneDrive\Desktop\Melange Systems`. origin's root commit (2026-10-15, "Publish Melange application source") is a filtered copy of local main made with `ops/release_lib/export.py`: only `fec/`, `requirements.txt`, `ops/`, an extension allowlist, a 5 MB cap and excludes. Local main has ~1900 commits that carry `data/`, `source_data/`, `originals/`, `in use/`, `tmp/`, the ledgers, `.mcp.json` and `keys.example.json`.

**Why:** on 2026-10-28 an agent was told to `git push origin lane/sna-health`; it would have uploaded the whole unfiltered history to a public repo. It was stopped in time (ls-remote empty). The side session's permission classifier had refused the same push for this reason.

**How to apply:** never push `main`, `lane/*` or any local-history ref from that checkout to origin. To publish local work, build a `publish/<name>` branch on top of `origin/main` with `ops/release_lib/export.py` (as PR #63 `publish/desktop-main-sync-20261023` was), run gitleaks and the path/size checks on the export tree, push only that branch, open a PR. `origin/main` also can't be merged into local main (`refusing to merge unrelated histories`); origin-only code such as `ops/desktop/` lives in other checkouts (Codex work clones), not in local main. Mentat shares the Melange `.git` directory. See `paul-wants-execution-not-handoffs`.

## Possible Connections

- [[2026-10-troubleshooting-melange-main-reconcile]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-28 from the Claude Code memory file `melange-origin-is-filtered-export.md` of project `workspaces-scratch-2026-10-28-0c1fea` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
