---
type: fleeting
title: "Melange public repo unfiltered branches (2026-10-18)"
aliases: ["melange-public-repo-unfiltered-branches-2026-10-18"]
source: "session"
captured_at: 2026-10-18
created_at: 2026-10-18
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-public-repo-unfiltered-branches-2026-10-18.md", type: "claude-memory", synced_at: "2026-10-18", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-public-repo-unfiltered-branches-2026-10-18.md", sha256: "639024f95ea2e4b7926a3c8176e2c8a383518d865f463fcd9ed6484490ff3a6c"}
updated_at: 2026-10-18
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Melange public repo unfiltered branches (2026-10-18)

> NEVER git push any local branch to origin (pjg93-222/Melange, PUBLIC): six branches there already expose unfiltered data; only the ReleasePublish filtered route publishes

## Content

On 2026-10-18 a publish-lane check found that pjg93-222/Melange is public and six of its branches carry unfiltered local source and data. The branches are codex/mentat-crypto, security/baseline-2026-10-10, security/mentat-guards, claude/melange-math-eval-skill and claude/mentat-data-presentation-fixes, plus the heads of PRs 2-6. The data includes real FEC contributor names (memo_redisclosure_cases.json), per-member data (communication_style_v1.locked), licensed IBISWorld CSVs and FEC bulk zips.

The same day I pushed Mentat ed6885645 to origin codex/mentat-crypto with Paul's OK. It added code only (server.py and one test). The flagged files were already public there at c62ec1231, pushed 2026-10-17. ReleasePublish/mentat/DEVELOPMENT.md:24-26 already said not to push Mentat from C:\Users\pgoff\Mentat, because its origin is the Melange remote.

**Why:** origin is the public Melange repo. Any raw branch pushed there publishes unfiltered local history: data, licensed files, person-level records. D-230 and D-167 allow only filtered exports.

**How to apply:**
- Never `git push origin <branch>` from the Melange repo or any of its worktrees, C:\Users\pgoff\Mentat included, even when a branch tracks origin and has been pushed before.
- Publish only through C:\Users\pgoff\ReleasePublish: filter_export.py, then one fast-forward commit, then manual gitleaks, then Paul's yes. Since 2026-10-18 Paul's route is to push that filtered commit to a new branch and open a PR into main (Melange PR #10, Mentat PR #1). main and release/melange are not pushed directly.
- Containment is CLOSED. On 2026-10-18 a containment plan was put to Paul, offering to make the repo private and rebuild it, or to delete the branches and ask GitHub Support. He declined: "I don't care about the privacy". That reaffirms his 2026-10-16 leave-as-is decision (D-236). Do not re-propose cleanup, visibility changes, branch deletion or Support requests unless Paul raises it. Don't delete anything there without his explicit yes either. The plan is in side-session-notes/local_1d8997a6-84fe-45d7-8116-797cb2633f40/melange-public-exposure-containment-plan-2026-10-18.md.

Related: `public-github-releases-ruling-2026-10-15`, `d-230-never-push-local-main`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-18 from the Claude Code memory file `melange-public-repo-unfiltered-branches-2026-10-18.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
