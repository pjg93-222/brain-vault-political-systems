---
type: fleeting
title: "Review in fable directive (2026-09-16)"
aliases: ["review-in-fable-directive-2026-09-16"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[2026-07-working-agreement-agent-orchestration-rules]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/review-in-fable-directive-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\review-in-fable-directive-2026-09-16.md", sha256: "ac06855aa2293b64bcba04ee5ac985cc73d25a2138f1c92541de3083490772a5"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Review in fable directive (2026-09-16)

> Paul 2026-09-16 "You should review in Fable" - code reviews are done by the session model itself, not delegated to reviewer subagents; the S4 case where three subagent reviews missed a user-visible regression

## Content

Paul, 2026-09-16, when a delegated /ecc:code-review was launched on the S4 commits:
"You should review in Fable."

**Why:** In the S4 lane the python-reviewer, typescript-reviewer and code-reviewer
subagents all passed the committed code, and 118 tests were green, yet every
report-worksheet saved view was failing with a 400 (`createSheet()` defaulted
`industry: ''`, which the new save gate rightly refuses). The Fable review found it in
minutes by probing the real route with a fresh worksheet sheet instead of trusting the
fixtures. Subagent reviews check the diff against the checklist; the session model
reads the diff against the whole intent and reproduces.

**How to apply:** When Paul asks for a review, or invokes /ecc:code-review, do the
review inline as the session model: read the diff of the actual change set (a commit
range if already committed, not `git diff HEAD` which returns other lanes' drift),
reproduce suspected defects against the real server or builder, run the validation
suites, write the report into the lane packet, and fix what is found. Delegate only
the mechanical validation runs. This overrides the fable-baton delegation policy for
review work. Related: `go-faster-directive-2026-09-16`, `mentat-failings-lane-s4-2026-09-16`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): reviews inline vs real route

## Possible Connections

- [[2026-07-working-agreement-agent-orchestration-rules]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `review-in-fable-directive-2026-09-16.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-07-working-agreement-agent-orchestration-rules]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
