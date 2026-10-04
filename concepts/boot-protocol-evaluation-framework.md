---
type: concept
name: "BOOT protocol evaluation framework"
aliases: ["boot-protocol-framework v2", "Project Brain evaluation framework"]
description: "The governing (v2, 2026-08-11) framework for the Project Brain external-memory protocol: entry schemas, supersession, staleness and compaction rules, a per-session scorecard, four integrity audits and pre-committed kill criteria."
related_to:
  - "[[project-brain]]"
  - "[[2026-07-feature-agent-tooling-stack-project-brain-toolkit]]"
  - "[[melange-systems]]"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\boot-protocol-framework.md"
    sha256: "a12f33b82ca75581218eab4a13bb79a55b56fb3d68ad3297863e70339baca08c"
    as_of: "2026-08-11"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/concept", "domain/platform"]
---

# BOOT protocol evaluation framework

> How the Project Brain external-memory protocol is implemented and judged: auditable entry schemas, never-delete supersession, automatic staleness, a size-triggered archive, a five-minute per-session scorecard, four integrity audits and kill criteria fixed in advance.

> [!info] Source and status
> Summary of `boot-protocol-framework.md` in the Project Brain toolkit repo (version 2, committed 2026-08-11 in `34a773a`, unchanged since). Version 2 governs; the separate version 3 file is an unratified draft. The vault's toolkit actor records that the evaluation pilot defined here has not started.

## Description

**Phase 0, harden the protocol.** Every entry must be auditable:
- DECISIONS entries `D-###` carry Date, Status (ACTIVE or SUPERSEDED by D-0XX), a one-sentence Decision, Context, Rationale and a Reversal condition; a session may reopen a decision only by showing the reversal condition has been met, otherwise the challenge fails on procedure.
- DEADENDS entries `DE-###` carry Date, Approach (specific enough to recognize a paraphrase), Failure mode, Root cause ("Unknown" is legal) and Would reconsider if.
- CONSTRAINTS are one line each with a source; a constraint without a source is an assumption.
- STATE has fixed sections (Current position, Next action, Open questions, `Last verified: YYYY-MM-DD`) and is rewritten, never appended.
- Entries are never deleted: a reversed decision is marked superseded and the superseding entry says why.
- Staleness is automatic (the boot prompt defines the threshold, for example 7 days on `Last verified`), and a file over a size budget (for example 500 lines) moves old superseded entries to an `ARCHIVE/` directory not read at boot, leaving a one-line index.

**Phases 1 to 3.** Seed from a live project and record only what can be dated and sourced (reconstructed rationale is marked low confidence); pilot for 5 to 10 sessions with a scorecard after each and a strict boot confirmation that cites one relevant decision ID and one dead-end ID; then a steady state with a monthly compaction check, an integrity audit about every five sessions, and protocol changes only through DECISIONS itself.

**Effectiveness scorecard (per session).** Rehydration cost (target 3 turns or fewer by session 5), re-explanation count (0 to 1), dead-end recurrence (0), relitigation attempts (0), boot accuracy (pass with correct citations), and an update-drafts metric written as material events ÷ drafts offered (target at least 80%). An overhead ledger sets time saved against maintenance and boot cost; three consecutive negative sessions make the compaction policy the first suspect.

**Integrity audits.** (1) Ground-truth drift: every ~5 sessions, check STATE and DECISIONS against the code, data and the client's latest word, with zero false entries as the target. (2) Provenance spot-check of three random entries. (3) Planted-error red team: insert one plausible false entry and pass only if the boot flags the contradiction. (4) Amnesia test: ask for the top constraint and most relevant dead end before showing the task.

**Conflict precedence and kill criteria.** When files contradict, CONSTRAINTS outrank DECISIONS, which outrank STATE, which outranks session improvisation, and any contradiction halts work until the user resolves it. After the pilot, drop or overhaul the protocol if the overhead ledger is negative, the planted-error test fails twice, or re-explanation counts have not fallen below baseline.

## Dated notes

- The scorecard's update-drafts ratio as written in v2 (events ÷ drafts) is the inverted form; the toolkit close-out commit `33ffb02` of 2026-08-11 corrected the evaluation ratio to drafts ÷ events, per the toolkit actor.
- The metric assumes sessions draft updates for Paul to commit; since Paul's 2026-08-12 override (brain D-006, recorded 2026-08-13) Claude may write and commit brain entries directly, so the metric's premise predates that override.

## Key Characteristics

- Integrity and effectiveness are judged separately; a fast, confident, wrong brain counts as worse than no brain.
- Failure conditions are fixed before the pilot so sunk cost cannot argue later.
- The brain governs its own changes through its DECISIONS file.

## Where it Applies

- [[project-brain]] — the brainctl toolkit that implements these schemas and the staleness, compaction and scorecard mechanics.
- [[2026-07-feature-agent-tooling-stack-project-brain-toolkit]] — the toolkit's build history and the 2026-08-12 direct-commit override.
- [[melange-systems]] — the project whose brain was seeded under this framework.
