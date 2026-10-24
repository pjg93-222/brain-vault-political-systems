---
type: fleeting
title: "Fable paragraphs only"
aliases: ["fable-paragraphs-only"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[2026-07-feature-member-approach-briefs]]"
  - "[[2026-07-working-agreement-agent-orchestration-rules]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fable-paragraphs-only.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fable-paragraphs-only.md", sha256: "0e6b9972455f5006e11bcfafd3a86fd697c68b8e537c1a8de1f1b76293902644"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Fable paragraphs only

> HARD cost rule — Fable is ONLY for the 533 per-member narrative paragraphs; every other LLM step uses Haiku

## Content

Model-selection cost discipline (Paul, stated firmly 2026-07-09, all caps): **Fable (`claude-fable-5`, $50/1M out) is ONLY for the per-member "Suggested approach" narrative paragraphs** — one call per member (~533 total). **Every other LLM step in the pipeline uses Haiku 4.5** (`claude-haiku-4-5`, ~10× cheaper). Mechanical tasks — audio-clip speaker verification from captions, classification, extraction, labeling — are Haiku, NEVER Fable.

**Why:** Paul caught me firing a Fable call per audio clip (~3,000 clips → ~$120–200) for a mechanical "is X the solo speaker?" classification. That is a fortune for a task Haiku does equally well. Fable's quality only earns its price on the generative narrative task — and even then it's one call per member, never per-item in an inner loop.

**How to apply:** Before ANY `messages.create`, ask "is this generating the member narrative paragraphs?" If no → `claude-haiku-4-5`. Never default to Fable for per-item loops. Per-clip / per-row / per-item work is always the cheap model. `moneyball-big5-campaign`

**Escalation rule (Paul, 2026-07-09):** if Haiku does *remarkably worse* than Fable on a mechanical task (validate by head-to-head agreement on a sample, adjudicating disagreements against the actual transcript), escalate that task to **Sonnet 5** (`claude-sonnet-5`) — NOT back to Fable. Order for mechanical work: Haiku → Sonnet if needed. Fable stays paragraphs-only regardless.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): 533 narratives ONLY;else Haiku 4.5

## Possible Connections

- [[2026-07-feature-member-approach-briefs]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-07-working-agreement-agent-orchestration-rules]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `fable-paragraphs-only.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-07-feature-member-approach-briefs]], [[2026-07-working-agreement-agent-orchestration-rules]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
