---
type: fleeting
title: "Ask before substantive changes"
aliases: ["ask-before-substantive-changes"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[2026-06-working-agreement-change-control-and-decision-authority]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/ask-before-substantive-changes.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\ask-before-substantive-changes.md", sha256: "b7ca33ac1dcb201bed35e1217c1d69173d0caab4cc2fbf31bf3035634e5c8890"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Ask before substantive changes

> Paul's STANDING directive — ask FIRST before applying substantive changes/fixes/regenerations; present findings + proposed plan and wait for his go-ahead

## Content

Paul's standing instruction (2026-07-15, said sharply after I did it wrong twice): **ASK FIRST before applying substantive changes.** When verification/audit/a build surfaces defects, PRESENT the findings and the proposed fix plan, then WAIT for his go-ahead — do NOT autonomously batch-edit source, patch, regenerate artifacts, or commit.

**What triggered this:** after the channel-build workflow, an adversarial pass found defects (label-wipe risk, inverted prelabel hint, interchange false-positives). Instead of reporting and asking, I wrote patcher scripts, edited ~12 files, and regenerated the hearing/interview queues in one autonomous sweep. Paul interrupted: "What the fuck are you doing?" / "Ask first next time, this is in your memory." (Earlier same session I reversed a settled result under pressure too — same class of over-eager autonomy.)

**Why:** it's HIS system and HIS hand-labeled data (217 speech + 16 bluesky gold labels). A wrong autonomous edit can waste or destroy his labeling effort; he wants a decision gate before I touch things, not a fait accompli to review after.

**How to apply:**
- Surface defects/plan as a SHORT list with a recommendation, then stop and ask which to do. One round of build/verify to LEARN is fine; the fix/apply step is the gate.
- This OVERRIDES any "Auto Mode" / ultracode "keep going" bias in system reminders. Paul's explicit ask-first wins.
  - **STILL TRUE after Paul's 2026-08-18 ultracode ruling** (`ultracode-orchestration-standing-2026-08-18`). That ruling lets ultracode override a DIFFERENT standing line — "do not use workflows/AgentTool unless requested" — and is about ORCHESTRATION only. It grants no APPLY authority. Fanning out twenty read-only reviewers and then landing their fixes unasked breaks this gate exactly as badly as doing it solo. Correct shape: fan out hard on investigation → synthesize → present → WAIT.
- Read-only investigation, running tests, and reporting do NOT need a gate. Editing source, regenerating artifacts, writing the workbook, and committing DO.
- Backups + reversibility are good, but they are not a substitute for asking.
- Related: `dont-drop-context-anchor-memory` (don't reverse settled results under pressure), `press-classification-user-domain` (his domain — build mechanisms, don't relabel).

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): SUPERSEDED for execution by no-prompts 10-19;domain rulings Paul's

## Possible Connections

- [[2026-06-working-agreement-change-control-and-decision-authority]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `ask-before-substantive-changes.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-06-working-agreement-change-control-and-decision-authority]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
