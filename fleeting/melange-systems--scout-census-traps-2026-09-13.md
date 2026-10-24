---
type: fleeting
title: "Scout census traps (2026-09-13)"
aliases: ["scout-census-traps-2026-09-13"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[2026-07-working-agreement-verification-and-evidence-standards]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/scout-census-traps-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\scout-census-traps-2026-09-13.md", sha256: "71cb2746c77eac5e8df9f90dfb6f928c91328230443d5533b1247202a8dd047d"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Scout census traps (2026-09-13)

> Lessons from the 2026-09-13 review fan-out — Haiku scouts fabricate repo maps; a scout parsed the LIVE tree's file instead of the worktree's; per-file git censuses over OneDrive stall for 30+ min and scouts end turns with "standing by" placeholders; sub-agents may decline SendMessage follow-ups as u

## Content

Four failure modes seen in one session (2026-09-13), each with the fix that worked:

1. **Fabricated repo map.** A Haiku scout returned a five-lane file table with invented class names (`InterviewFetcher`, `DistrictIndustrializer`) and repeated LOC values (834, 756, 1456 many times). A 60-line `ast.parse` census script (never importing repo code) gave the real map in one call. Rule: existence and size claims come from scripts, not from model summaries (extends `examination-lane-lessons-2026-08-14`).
2. **Wrong tree parsed.** The test-registration scout cited `run_tests.py` line numbers about 130 higher than three reviewers because its Read tool opened the LIVE tree's copy (730 lines, uncommitted additions) instead of the worktree's (580). Rule: every census must print the absolute path, line count and `git hash-object` of the file it parsed, and compare to `git rev-parse HEAD:<path>`.
3. **Slow census plus placeholder turns.** A per-file drift census (2-3 git calls per path against the OneDrive-backed live tree) ran 30+ minutes; the Haiku scout ended four turns with "waiting, will report" and no results (the `verify-dont-infer-completion-2026-08-04` shape). A batched rewrite (one `git ls-tree -r HEAD`, one `git ls-files`, one `git hash-object --stdin-paths`) finished in seconds. Rule: batch git; never poll a stalled scout, replace it.
4. **Follow-up messages declined.** A Sonnet executor completed its original 11-item brief but declined seven SendMessage follow-ups as "coordinator-styled messages that escalated scope", including read-only live-tree reads. That was correct behaviour under the instruction-source boundary. Rule: put the whole job in the initial brief; if scope grows, dispatch a fresh agent with a complete self-contained brief rather than messaging.

Also: patch files written by several lanes lacked `diff --git` headers (only `--- a/` and `+++ b/`); manifest tooling must parse both forms. And the adversarial verification pass was not optional: of 141 finding rows, 17 were refuted or partly refuted and 12 patches were defective (one crashed with a TypeError, one was a no-op, one reversed a correct filter), all of which the reviewers had marked "confirmed".

Three more from the 2026-09-15 members-section lane (gan-build run as a read-only packet loop):

5. **Fabricated NOT FOUND.** Haiku scouts reported NOT FOUND for 20 memory files that existed (a one-line `ls` disproved it), for `ranks_python.json` (two other agents read it the same hour), and for brain entries DE-001/DE-015 (the scout grepped the code repo; the brain lives at `Project Brain\brains\melange-systems-brain`). Rule: a NOT FOUND from a scout is a claim, not a fact — disprove it with one listing before it reaches a packet, and name the brain path in every brief that cites decision IDs.
6. **Nested spawning despite "no sub-agents".** Two scouts spawned their own scouts, returned "interim" text, and the real result arrived later as a separate task notification under a different id. Rule: treat an "interim/waiting" return as incomplete, harvest the nested notification, and paste it into the next agent's brief rather than re-running.
7. **Evidence-file contract + adversarial evaluator works.** Each agent wrote `evidence/<point>.md` with TREE file:line quotes; an Opus composer wrote the packet from evidence only ("NOT IN EVIDENCE" where absent); a code-only evaluator spot-checked 28 claims and caught 5 wrong ones (two fake NOT FOUNDs, three miscounted numbers) before Paul saw them. Session-limit kills (HTTP 429) are recoverable: `SendMessage` to the dead agent id after the reset resumes it with context; an agent that was not actually killed just treats the message as a reminder.

**How to apply:** for any review or census fan-out in this repo, (a) census with scripts and print provenance, (b) batch git against the live tree, (c) brief agents completely up front, (d) always run an adversarial verifier before presenting findings to Paul, (e) disprove every scout NOT FOUND with a listing, (f) harvest nested-agent notifications instead of re-running. Related: `audio-lane-verification-lessons-2026-09-07`, `code-review-five-lanes-2026-09-13`, `members-section-consistency-lane-2026-09-15`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): scouts fabricate;verify adversarially

## Possible Connections

- [[2026-07-working-agreement-verification-and-evidence-standards]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `scout-census-traps-2026-09-13.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-07-working-agreement-verification-and-evidence-standards]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
