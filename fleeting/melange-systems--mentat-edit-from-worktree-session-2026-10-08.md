---
type: fleeting
title: "Mentat edit from worktree session (2026-10-08)"
aliases: ["mentat-edit-from-worktree-session-2026-10-08"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[2026-09-troubleshooting-mentat-repo-state-and-workbooks]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-edit-from-worktree-session-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-edit-from-worktree-session-2026-10-08.md", sha256: "4d9a11d4c2793c6a854a85d2340565cadc6f147ce4070033abc26089c528a4b5"}
updated_at: 2026-10-24
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

**2026-10-09 update (LDA deadline rule, commit cb0d4fb48):**
- The live tree's branch was then claude/mentat-data-presentation-fixes-20261009, not codex/mentat-crypto, so check `git branch --show-current` before you push.
- `git -c core.autocrlf=false apply` kept both the CRLF and the LF files byte-exact. `cmp` against the tested scratch copies confirmed it, so step 4's restore was not needed.
- Before applying, check that the live files are byte-equal to the patch base (`cmp`) and clean (`git status --short -- <paths>`).

Related: `mentat-studio-members-and-figure-strip-2026-10-08`, `ask-before-substantive-changes`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): git apply ONLY w/ per-change OK

## Possible Connections

- [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `mentat-edit-from-worktree-session-2026-10-08.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
