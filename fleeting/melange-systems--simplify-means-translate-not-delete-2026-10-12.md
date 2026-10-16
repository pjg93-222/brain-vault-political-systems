---
type: fleeting
title: "Simplify means translate not delete (2026-10-12)"
aliases: ["simplify-means-translate-not-delete-2026-10-12"]
source: "session"
captured_at: 2026-10-12
created_at: 2026-10-12
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/simplify-means-translate-not-delete-2026-10-12.md", type: "claude-memory", synced_at: "2026-10-12", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\simplify-means-translate-not-delete-2026-10-12.md", sha256: "18d1c5d6173fe2979d76fb9631a25d42b352b56be040d6072efaa9f9de77e3c2"}
updated_at: 2026-10-12
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Simplify means translate not delete (2026-10-12)

> Paul 2026-10-12: 'no jargon' / 'simplify' = roughly a 30% cut that TRANSLATES technical terms (plain label + real term + precise number), never a 70% cut that deletes the analysis

## Content

When Paul asks to drop jargon or simplify analytical material (decks, reports, dashboards), keep the
analysis. Cut by roughly 30%: pair each plain-language label with the technical term and the precise
number, for example "Catch rate (recall) 55.0%" or "Ranking accuracy (AUC) 0.733". Keep the model-fit and
tuning facts in compact form. Remove only the genuinely redundant detail.

**Why:** On the Canterra deck, "No jargon, and make it more visually compelling" led me to delete pseudo
R², VIF, cross-validation, F1, precise metrics and the scoring definitions. Paul replied "Too simple ...
you reduced it by 70% when it should have been a 30% reduction". The deck is graded on depth of analysis
too.

**Clarified the same day:** "No it was the labels that were fine, the details". Plain-language LABELS are
right. What must not be cut is the DETAIL: precise numbers, data steps, comparisons, fit and tuning facts,
and supporting specifics.

**How to apply:**
- Plain labels, full details. Don't move technical terms back into labels. Put details in plain sentences.
- Translate, don't delete. A plain name goes first and the real term follows in parentheses.
- Keep the exact numbers from the source document instead of rounding them away.
- Visual simplification (bigger numbers, cards, fewer words per line) is fine. Content simplification is
  capped at about 30%.
- Related: `canterra-attrition-deck-2026-10-12`, `desk-plain-language-2026-08-31`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-12 from the Claude Code memory file `simplify-means-translate-not-delete-2026-10-12.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
