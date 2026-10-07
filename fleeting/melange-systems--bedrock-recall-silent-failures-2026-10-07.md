---
type: fleeting
title: "Bedrock recall silent failures (2026-10-07)"
aliases: ["bedrock-recall-silent-failures-2026-10-07"]
source: "session"
captured_at: 2026-10-07
created_at: 2026-10-07
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/bedrock-recall-silent-failures-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\bedrock-recall-silent-failures-2026-10-07.md", sha256: "53df00e49920c8c8c2693e617aaabf7a25882ff4585ef45371ddb5185241ae49"}
updated_at: 2026-10-07
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Bedrock recall silent failures (2026-10-07)

> Why Bedrock "Brain recall" blocks go missing - hook timeouts (2-10 s vs old 5 s limit) and harness text diluting the 0.45 coverage gate; fixes applied 2026-10-07

## Content

A missing "Brain recall" block does NOT mean recall works or that nothing matched. Diagnosed 2026-10-07:

1. Timeouts (main cause). The UserPromptSubmit hook (`bun .bedrock/recall/hook.ts recall`) takes 2-10 s on this laptop (2 MB recall-index.json parse plus OneDrive CPU load). The old 5 s limit got it killed 15+ times across sessions, main repo included. Kills leave nothing in hook.log; they show only in session transcripts as hook_cancelled/timedOut. Paul raised the limit to 10 s in ~/.claude/settings.json on 2026-10-07 (Paul granted permission after auto mode denied the edit as Self-Modification).
2. Coverage dilution. The anchor gate needs coverage >= 0.45 (recall.ts:43). The desktop app's worktree system-reminder on a worktree session's first prompt, plus peer-message wrappers and long agent reports, add unmatched terms and push good matches under 0.45. Paul approved a recall.ts patch, stripHarness(), which removes system-reminder blocks and cross-session/agent-message tags before scoring.
- The worktree cwd itself is irrelevant: recall reads only payload.prompt, with no project or slug matching.
- graphify-out/graph.json MISSING is by design (vault CLAUDE.md:160). The vault graph is .bedrock/graph/build.ts, which writes brain-graph.html.

**Why:** Paul wants the Obsidian brain fundamentally integrated; silent recall loss made sessions run without vault context.
**How to apply:** when recall looks absent, check session transcripts for hook_cancelled before blaming matching. If timeouts persist at 10 s, the next lever is making recall cheaper (don't parse the 2 MB index per prompt) or starting the watchdog clock at process start.

Related: `brainlink-knowledge-system-2026-10-05`, `claude-obsidian-readonly-install-2026-10-06`.

## Possible Connections

- [[brain-vault-political-systems]] — keyword match from recall, unverified
- [[brain-graph]] — keyword match from recall, unverified
- [[2026-10-feature-brain-vault-setup]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-07 from the Claude Code memory file `bedrock-recall-silent-failures-2026-10-07.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
