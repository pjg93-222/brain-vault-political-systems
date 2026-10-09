---
type: fleeting
title: "Mentat edit from worktree session (2026-10-08)"
aliases: ["mentat-edit-from-worktree-session-2026-10-08"]
source: "session"
captured_at: 2026-10-08
created_at: 2026-10-08
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-edit-from-worktree-session-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-08", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-edit-from-worktree-session-2026-10-08.md", sha256: "4010de13ba1b64d5af81453e60a7f6b8ada27ac902f9f1728e2d95a23d9664a6"}
updated_at: 2026-10-08
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat edit from worktree session (2026-10-08)

> A session tied to a Melange claude\worktrees\ checkout cannot Edit Mentat (harness worktree guard); Paul approves a git-apply route per change

## Content

C:\Users\pgoff\Mentat is the live console tree: branch codex/mentat-crypto, serving 8806, and a linked worktree of the Melange Systems repo. When a session runs in a `.claude\worktrees\...` checkout, a PreToolUse guard refuses Edit/Write there. request_directory does not lift it, and change_directory is refused. Earlier in the same session edits did go through, so the guard can appear mid-session after a restart.

**Why:** On 2026-10-08 Paul chose "Shell git apply" for the figure-strip fix. A later follow-up write without fresh approval was blocked by the auto-mode classifier, and Paul then approved it explicitly ("go ahead, apply it, commit and push").

**How to apply:**
1. Ask Paul before each such change; approval is per change, not standing.
2. Build the patch from scratch copies with `git diff --no-index` and fix the headers to `a/mentat/...`.
3. Run `git apply --check`, then `git -C C:\Users\pgoff\Mentat apply`.
4. Under core.autocrlf=true, git apply rewrites LF working files as CRLF. Restore each file's original line endings with a byte-exact node script, not MSYS grep, which hides CR.
5. Commit only your own paths with `git commit -F msg -- <paths>`, because other sessions commit in the same tree.
6. Push with `git push origin HEAD:refs/heads/codex/mentat-crypto` (no upstream is set).

Related: `mentat-studio-members-and-figure-strip-2026-10-08`, `ask-before-substantive-changes`.

## Possible Connections

- [[mentat-console]] — keyword match from recall, unverified
- [[2026-09-feature-mentat-console-ui-load-time-and-graph-quirks]] — keyword match from recall, unverified
- [[mentat-console-chart-studio-and-system-debug]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-08 from the Claude Code memory file `mentat-edit-from-worktree-session-2026-10-08.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
