---
type: fleeting
title: "Research vault lane (2026-10-09)"
aliases: ["research-vault-lane-2026-10-09"]
source: "session"
captured_at: 2026-10-09
created_at: 2026-10-09
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/research-vault-lane-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\research-vault-lane-2026-10-09.md", sha256: "09f1dd50ea9aae2274382d509ed1e7086475b6733942768c7c9822110015f80f"}
updated_at: 2026-10-09
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Research vault lane (2026-10-09)

> Research vault (empirical backbone) built 2026-10-09 at C:\Users\pgoff\Documents\research, Bedrock name "research"; how it was built and the workflow lessons (resume cache, 6-agent cap, Haiku JSON)

## Content

Paul asked (2026-10-09) for a new Obsidian vault, separate from the brain vault, holding his annotated bibliographies, research notes and every academic article on the machine, each read and related to the system components it supports or contradicts. Built at `C:\Users\pgoff\Documents\research` (outside OneDrive, beside `Documents\brain`), registered in Bedrock `vaults.json` as `research` (brain stays default). Local git only (commit a97fcb9, no remote; PDFs/text/state git-ignored); brain STATE entry e030513.

Layout: `papers/` (139), `notes/` (4 = his sector-growth study plan, review, source check, request for review — he asked these be pulled in as research notes), `systems/` (20 hubs, one `##` section per catalog component), `themes/` (14), `annotations/` (his bibliography docx verbatim, never edited), `_sources/` originals, `_text/` + `_annots/` (PDF highlights/notes = his markup), `_work/state/` (pipeline state: phase1.json catalog/framework, items/<slug>.{ext,rel,ver}.json, payloads). Evidence status per bearing: VERIFIED / VERIFIED-SOFTENED / UNVERIFIED (DE-062). Excluded files (IBISWorld/market reports = Mentat data inputs, coursework, admin) listed in `excluded.md`.

**Why:** the bibliography zip (Downloads, "Annotated Bibliographies & Literature Synthesis") is the basis of path-finding, SNA and allocation; Paul wants the empirical backbone mapped to the code as built.

**How to apply / lessons:**
- Workflow resume cache keys are CHAINED by call order: editing any early prompt, a failed early agent, or concurrency reordering makes everything after it re-run live (cost ~1 h here). For multi-hour pipelines, persist each stage's output to disk and drive later workflows from disk state, not from resume.
- Concurrency cap per workflow = CPUs-2 = 6 on this 8-core box; run several workflows in parallel (shards) for throughput. CPU then pins at 100%, largely ECC hook node processes (~30) per tool call.
- Haiku StructuredOutput rejects big extractions as invalid JSON (backslashes, quotes, >8 KB); have it write the file via a script with json.dump and reload it instead.
- Brain boot: Paul declined it at first in this session, then asked for it explicitly; follow his current ask.
Related: `reasoning-in-fable-code-in-opus-2026-09-16`, `brain-vault-sync-mechanism-2026-10-07`, `work-in-parallel-no-waiting-2026-10-08`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `research-vault-lane-2026-10-09.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
