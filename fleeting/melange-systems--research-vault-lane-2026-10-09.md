---
type: fleeting
title: "Research vault lane (2026-10-09)"
aliases: ["research-vault-lane-2026-10-09"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[research-vault]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/research-vault-lane-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\research-vault-lane-2026-10-09.md", sha256: "2f1ca0f670a6512a8c004eea47d1cf6b6c1f7d4ed6c087142574b4548fa1794b"}
updated_at: 2026-10-24
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
- 2026-10-10: combined graph vault `C:\Users\pgoff\Documents\linked` (Obsidian vault "linked") = folder JUNCTIONS `brain\` and `research\` + `bridges/<system>.md` (wikilinks research hub ↔ brain notes, built by scratchpad build_linked.py from phase1 catalog) + `Home.md`; ignore filters hide research/_raw,_text,_annots,_work,_sources. Brain vault links back via projects/research-vault.md (PR #22). Obsidian's `%APPDATA%\obsidian\obsidian.json` must be written WITHOUT a BOM (PowerShell 5.1 `-Encoding utf8` adds one → Obsidian "vault not found"/Error); Obsidian reads it only at startup.
Related: `reasoning-in-fable-code-in-opus-2026-09-16`, `brain-vault-sync-mechanism-2026-10-07`, `work-in-parallel-no-waiting-2026-10-08`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): Documents\research,git 419854b;167 papers->20 hubs

## Possible Connections

- [[research-vault]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `research-vault-lane-2026-10-09.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[research-vault]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
