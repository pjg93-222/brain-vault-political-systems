---
type: fleeting
title: "Mentat github migration (2026-10-02)"
aliases: ["mentat-github-migration-2026-10-02"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[mentat-console]]"
  - "[[mentat-fec-pipeline]]"
  - "[[paul-goff]]"
  - "[[mentat]]"
  - "[[2026-09-troubleshooting-mentat-repo-state-and-workbooks]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-github-migration-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-github-migration-2026-10-02.md", sha256: "17257cc0da77ca1ef08b574851ed88d92f6435ea7c07e452d2235ba48b3e66cc"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat github migration (2026-10-02)

> Mentat tree pushed to GitHub branch claude/mentat-migration-onto-main; PR to main still unopened (Paul deferred); full local history unpublishable as-is

## Content

On 2026-10-02/03 the live Mentat tree (C:\Users\pgoff\Mentat\mentat, plus .claude/launch.mentat.json and a vendored snapshot of ~/.claude/plugins at .claude/vendored-plugins) was pushed to github.com/pjg93-222/Melange (private) on branch `claude/mentat-migration-onto-main`, tip 28c27a47. It is 19 plumbing-built commits on origin's main ce213058. mentat/state is included. Files over 50 MB and .cache stay local, listed in mentat/EXCLUDED_FROM_GIT.md. Verification passed (file lists identical, blob spot-checks match, remote equals tip).

PR OPENED 2026-10-03: https://github.com/pjg93-222/Melange/pull/2 (base claude/melange-math-eval-skill-18e907, head claude/mentat-migration-onto-main), opened from the built-in browser after Paul signed in to GitHub there himself; MERGED 2026-10-03 at Paul's request (merge commit 54433266 into claude/melange-math-eval-skill-18e907; the 19 commits kept); head branch claude/mentat-migration-onto-main then DELETED on origin (tip 28c27a47 is the merge's 2nd parent). No CI configured. gh still NOT installed. Also deleted on origin at Paul's request: claude/melange-math-eval-skill-18e907-4d54uu (4 UNMERGED commits, 10-01 QME apply script + handoff, tip 4e0aaa52) — saved first as branch backup/melange-math-eval-skill-18e907-4d54uu and pushed to remote `mirror` 2026-10-03 (Carbonite carries it off-box); the LOCAL copy was then deleted at Paul's request, so `mirror` holds the only copy. Origin now has only claude/melange-math-eval-skill-18e907.

STILL PENDING:
- DONE 2026-10-03 (Paul asked): partial ref claude/mentat-github-migration-b06195 (6f76c3415) DELETED on origin; still kept as a local branch and on remote `mirror`.
- Publishing full local history: origin main shares NO history with the local repo, and the local history has 28 blobs over 100 MB under audits/legfix5. Publishing it would need filter-repo or LFS, and a history rewrite is Paul's decision.

**Why:** pushes of the full history 500'd (3 GB single merge af1160dd8). The Mentat-only branch on ce213058 avoided both the size and the unrelated-history problems.

**How to apply:** Next session, offer to open the PR first. Never push from the worktree's own branch (it carries the oversized history). Pack files are read-only on Windows, so Remove-Item needs -Force. Related: `repo-mirror-2026-08-11`, `live-tree-eol-census-2026-09-19`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): PR #2 MERGED 10-03

## Possible Connections

- [[mentat-console]] — holds an earlier version of this memory file; this note carries the newer text
- [[mentat-fec-pipeline]] — holds an earlier version of this memory file; this note carries the newer text
- [[paul-goff]] — holds an earlier version of this memory file; this note carries the newer text
- [[mentat]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `mentat-github-migration-2026-10-02.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[mentat-console]], [[mentat-fec-pipeline]], [[paul-goff]], [[mentat]], [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
