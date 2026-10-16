---
type: fleeting
title: "Canterra attrition deck (2026-10-12)"
aliases: ["canterra-attrition-deck-2026-10-12"]
source: "session"
captured_at: 2026-10-12
created_at: 2026-10-12
status: "promoted"
promoted_to: "obsidian://open?vault=linked&file=knowledge%2Fcuration%2Fanalytics-presentations"
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/canterra-attrition-deck-2026-10-12.md", type: "claude-memory", synced_at: "2026-10-12", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\canterra-attrition-deck-2026-10-12.md", sha256: "e751d4a4667441c13c90fb534fa1a71c6f17f032bcba03679f1ac669f50b55d1"}
updated_at: 2026-10-12
updated_by: "codex/intake-curation"
tags: ["type/fleeting", "status/raw"]
curated_at: "2026-10-16"
---

# Canterra attrition deck (2026-10-12)

> NOT Melange - Paul's MBA Team Project 3 (Canterra employee attrition) 8-min Zoom deck; delivered Downloads\Canterra_Attrition_Presentation.pptx; report errors + Q4 ruling recorded

## Content

School project, unrelated to Melange. Inputs: `Downloads\Final report (2).pdf` (7-page body with no cover
or appendix), `Downloads\updated_final_(1) (1).ipynb` (Colab) and `Downloads\Employee_Data_Project.csv`.

**Delivered 2026-10-12:** `C:\Users\pgoff\Downloads\Canterra_Attrition_Presentation.pptx` (3.1 MB). It has
12 slides plus an appendix and 5 presenter labels, with names as placeholders. Full speaker scripts in the
notes run about 7:35. It was built with python-pptx (Georgia + Aptos, ink/paper/amber palette). Higgsfield
nano_banana_pro supplied the 11 design comps and 5 text-free photos (about 32 credits; the account was
plus, 1,173 credits). The 7 graphs are the notebook's own outputs, pasted unchanged per
`literal-graphs-only-in-decks-2026-10-12`. The build scripts live in the session scratchpad, which is
ephemeral, so rebuilding means re-deriving them.

**Later the same day (REV5):** Paul asked for "more emphasis on the business application side, use the
document as a north star". The north star is the live Google Doc, not the PDF. Each slide now pairs a
finding with a management action and the doc's $ figures. S5 has a driver-to-lever table, S7 has
profile-to-action pairs, S11 has a "When" column, and S12 has payoff chips. The deck was re-delivered to the
same Downloads path. The build workspace moved to session scratchpad 3e427598-...\canterra\build, which is
also ephemeral. Doc status: the team half-applied the typo list and wrongly changed "retrain and re-test the
model" to "retain"; I told Paul.

**Rulings and facts:**
- Q4 (which model to present): FINAL ruling is the DECISION TREE. Paul picked it after the live Google
  Doc ("Final report", owner pm1376, in the team folder) turned out to differ from the PDF: its executive
  summary calls the tree "our firm's model". Logistic regression stays as the model that explains the
  drivers. Slide 9 wording is Paul's: "Best-scoring model on test data: Decision tree (AUC 0.94; re-test on
  new data)". Paul then wanted only the PowerPoint: no Google Slides, and no Chrome or in-app sign-in for
  Doc edits. I gave him a Ctrl+H list of Doc typos to fix himself. The live Doc had already dropped the false
  100% sentence.
- Report error: "every single early-career employee who traveled frequently left" is FALSE. The full data
  gives 47/65 (72%). 100% holds only for early-career SINGLE frequent travelers in the training-set tree
  (25/25). The deck uses the correct version; I told Paul.
- Report typos: the intro's "$22.7-$91.0" is missing "M"; "retrain talent" should be "retain". The notebook's
  markdown in cells 69/71 is stale (it says manager continuity avoids 80-95 departures; the correct
  figure is 33).
- Data: 4,332 of 4,337 rows duplicate another row; 845 of 868 test rows have an identical training twin,
  which explains the tree's 0.942 AUC; income values mostly occur exactly 3 times. These are only optional
  lines in the speaker notes, because they are not in the report.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-12 from the Claude Code memory file `canterra-attrition-deck-2026-10-12.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
