---
type: concept
name: "Census before claims"
aliases: ["verify, don't infer"]
description: "Measure first (a census, the live file, git status plus a byte diff) before stating a mechanism, a number or a completion; never infer it."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/agent-ops"]
---

# Census before claims

> Measure first (a census, the live file, `git status` plus a byte diff) before stating a mechanism, a number or a completion; never infer it.

## Description

An agent-practice rule built from Paul's feedback after agents were measured wrong: a claim that something is complete, that a mechanism works a certain way, or that a quantity has a certain size is made only after it has been measured. Completion is verified, not inferred from a tool's silence; a mechanism claim ("X is dropped because Y") gets a census or a negative control before it is repeated to Paul; and point-in-time numbers, such as disk free space, are measured again before they are quoted. After an interrupted tool call the truth is `git status` and a byte-diff audit, never the assumed outcome. Identity is not inferred from machine metadata either: a git config field once named the wrong person.

## Key Characteristics

- Completion is verified (files, tests, git state), never inferred.
- Before repeating a mechanism claim, run a census or a negative control that could show it false.
- Numbers are point-in-time: re-run the census before quoting them.
- After an aborted or timed-out lane, `git status` plus a byte diff is the only truth about what landed.
- A scout's "not found" is a claim to check with one listing, not a fact.

## Where it Applies

- [[2026-07-working-agreement-verification-and-evidence-standards]] — R1 (verify, do not infer completion) and R2 (demand a census before repeating a mechanism claim) of the agreement
- [[2026-08-incident-workstation-disk-and-backup]] — the 2026-09-11 census figures are point-in-time; re-run the census before quoting any number
- [[lg-gram-workstation]] — the disk census numbers are point-in-time; re-run the census before quoting them
- [[glass-box]] — a Codex MCP idle timeout left edits partially landed: never infer the outcome, `git status` plus a byte-diff audit is the only truth
- [[metaloop]] — the same idle-timeout lesson in the lane hierarchy: never infer the outcome
- [[melange-fec-pipeline]] — run the batched drift census first; a behind-HEAD census before any whole-file commit from a shared dirty checkout

## Evidence

Other notes that use the rule, by title (plain text, so their link budgets are unchanged):

- Audio and speech lane: four false mechanism claims, three of them repeated to Paul before they were checked; the origin of R2.
- Agent tooling stack: never infer the outcome of an aborted Codex reply.
- Mentat failings lanes and PAC evidence: verify, don't infer.
- Paul Goff: never infer his name from config fields.
- Live tree, git drift and line endings: a lane census misattributed a chain producer, and the proof run after it caught the error.
- Staffer network data and math: census the disk before re-launching builders; a census scout's false "not found".
- Mentat collection and attribution: do not infer an external killer from polling granularity.
