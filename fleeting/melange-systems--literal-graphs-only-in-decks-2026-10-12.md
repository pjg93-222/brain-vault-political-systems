---
type: fleeting
title: "Literal graphs only in decks (2026-10-12)"
aliases: ["literal-graphs-only-in-decks-2026-10-12"]
source: "session"
captured_at: 2026-10-12
created_at: 2026-10-12
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/literal-graphs-only-in-decks-2026-10-12.md", type: "claude-memory", synced_at: "2026-10-12", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\literal-graphs-only-in-decks-2026-10-12.md", sha256: "6d018e0f57a0ef56c6c9cd636187436c55d70ac1bbb1a15e9e640b6bf3c92427"}
updated_at: 2026-10-12
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Literal graphs only in decks (2026-10-12)

> Paul 2026-10-12: decks built from his analysis use ONLY the code's own graph outputs, pasted unchanged - never redraw, restyle, frame, label or overlay them

## Content

When building a presentation from Paul's analysis (notebook/report), every graph on the slides must be
the literal output of his Python code, inserted as a plain picture. Do not redraw it as a native chart,
do not wrap it in cards or labels, and do not add callouts or markers on top of it. Graphs that are not
in the code (for example, a figure that only appears in the report PDF) stay out.

**Why:** On the Canterra deck I redrew his charts natively in the deck palette and then proposed exhibit
cards plus node callouts. He said: "include the exact graphs we used"; "only graphs from the actual python
code, nothing more, like you need to literally put them in there"; "Fuck styling and all that for those
graphs, literally just copy paste into there".

**How to apply:**
- Extract the notebook's image outputs bit-exact (verify by hash) and paste them with the aspect ratio
  preserved, crop 0 and no effects.
- Altair/vega charts are stored as specs, not PNGs. Render the saved spec unchanged (vl-convert) and tell
  him that is what you did.
- Styling the rest of the slide (text, tables, photos) is fine. Only the graphs are untouchable.
- Related: `canterra-attrition-deck-2026-10-12`, `ask-before-substantive-changes`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-12 from the Claude Code memory file `literal-graphs-only-in-decks-2026-10-12.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
