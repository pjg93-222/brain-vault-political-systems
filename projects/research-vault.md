---
type: project
name: "Research vault (empirical backbone)"
aliases: ["Research vault", "research-vault"]
description: "Separate Obsidian vault at C:/Users/pgoff/Documents/research (Bedrock name 'research') holding Paul's annotated bibliographies verbatim, his research notes and the academic literature on his computer, each paper related to the system components it supports or contradicts. This brain vault is the map of the systems; the research vault is the evidence behind them."
status: "active"
brain: "melange-systems-brain"
deadline: ""
progress: "Built 2026-10-09/10: 167 paper notes, 4 research notes (sector-growth study), 20 system hubs (127 components, one section each with an evidence table), 14 theme syntheses, framework.md. Bearing status VERIFIED / VERIFIED-SOFTENED / UNVERIFIED per DE-062. Local git only (latest 419854b); PDFs, extracted text and pipeline state are git-ignored. Correction 2026-10-10 (fleeting pass): the research vault's HEAD is now 8ad2cf4, not 419854b (`git -C C:/Users/pgoff/Documents/research log --oneline -4`: 8ad2cf4, 0262021, 3496f5e, 419854b, read 2026-10-10). A combined graph vault, `C:/Users/pgoff/Documents/linked`, joins the two vaults (see Linked vault below)."
blockers: []
action_items: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/research-vault-lane-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\research-vault-lane-2026-10-09.md", sha256: "1c9cc3c0e50150cd8e6134c2960c0accf95acf957fe10c40d4b60c1ee2bc0653"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/project", "status/active", "domain/research"]
---

# Research vault

The research vault is a second Obsidian vault beside this one. Open it: [research vault index](obsidian://open?vault=research&file=index). It links back here through `obsidian://open?vault=brain` URIs in every system hub.

- [Paul's research framework](obsidian://open?vault=research&file=framework): how the literature underwrites each system, revised against the evidence.
- [Missing works](obsidian://open?vault=research&file=missing) and [excluded files](obsidian://open?vault=research&file=excluded).
- Vault contract for future sessions: `C:/Users/pgoff/Documents/research/CLAUDE.md`.

## System evidence hubs

Melange and Moneyball ([[melange-systems]]):
- [Rank pillars](obsidian://open?vault=research&file=systems%2Fmoneyball-rank-pillars)
- [Stance and alignment](obsidian://open?vault=research&file=systems%2Fmelange-stance)
- [Labels and tiers](obsidian://open?vault=research&file=systems%2Fmelange-labels-and-tiers)
- [Influence engine](obsidian://open?vault=research&file=systems%2Fmelange-influence-engine)
- [Allocation](obsidian://open?vault=research&file=systems%2Fmelange-allocation)
- [Path-finding](obsidian://open?vault=research&file=systems%2Fmelange-pathfinding)
- [Social-network analysis](obsidian://open?vault=research&file=systems%2Fmelange-sna)
- [Staffer network](obsidian://open?vault=research&file=systems%2Fmelange-staffer-network)
- [Psychometrics](obsidian://open?vault=research&file=systems%2Fmelange-psychometrics)
- [Audio and speech](obsidian://open?vault=research&file=systems%2Fmelange-audio-speech)
- [Legislative data](obsidian://open?vault=research&file=systems%2Fmelange-legislative-data)
- [Lobbying](obsidian://open?vault=research&file=systems%2Fmelange-lobbying)
- [Demographic potential](obsidian://open?vault=research&file=systems%2Fmelange-demographic-potential)
- [Validation protocol](obsidian://open?vault=research&file=systems%2Fmelange-validation)

Mentat ([[mentat]]):
- [FEC attribution](obsidian://open?vault=research&file=systems%2Fmentat-fec-attribution)
- [Giving forecast](obsidian://open?vault=research&file=systems%2Fmentat-giving-forecast)
- [Sector-growth study](obsidian://open?vault=research&file=systems%2Fmentat-sector-growth-study)

Terrier ([[terrier]]):
- [Row scoring](obsidian://open?vault=research&file=systems%2Fterrier-row-scoring)
- [Imputation](obsidian://open?vault=research&file=systems%2Fterrier-imputation)
- [Canvass](obsidian://open?vault=research&file=systems%2Fterrier-canvass)

## Build record and lessons (memory `research-vault-lane-2026-10-09`, added 2026-10-10)

- **Ask (Paul, 2026-10-09):** a new Obsidian vault, separate from the brain vault, holding his annotated bibliographies, research notes and every academic article on the machine, each read and related to the system components it supports or contradicts. Built at `C:\Users\pgoff\Documents\research` (outside OneDrive, beside `Documents\brain`), registered in Bedrock `vaults.json` as `research` (brain stays the default). Local git only (first commit a97fcb9, no remote; PDFs, text and state git-ignored); brain STATE entry e030513.
- **Layout at the first build:** `papers/` (139 at that build; 167 paper notes by the later count in `progress` above), `notes/` (4: his sector-growth study plan, review, source check and request for review, pulled in as research notes at his ask), `systems/` (20 hubs, one `##` section per catalog component), `themes/` (14), `annotations/` (his bibliography docx verbatim, never edited), `_sources/` originals, `_text/` and `_annots/` (PDF highlights and notes = his markup), `_work/state/` (pipeline state: `phase1.json` catalog and framework, `items/<slug>.{ext,rel,ver}.json`, payloads). Evidence status per bearing: VERIFIED / VERIFIED-SOFTENED / UNVERIFIED (DE-062). Excluded files (IBISWorld and market reports, which are Mentat data inputs; coursework; admin) are listed in `excluded.md`.
- **Why:** the bibliography zip (Downloads, "Annotated Bibliographies & Literature Synthesis") is the basis of path-finding, SNA and allocation; Paul wants the empirical backbone mapped to the code as built.
- **Lessons from the build:**
  - Workflow resume cache keys are CHAINED by call order: editing any early prompt, a failed early agent, or concurrency reordering makes everything after it re-run live (about 1 h lost here). For multi-hour pipelines, persist each stage's output to disk and drive later workflows from disk state, not from resume.
  - Concurrency cap per workflow = CPUs - 2 = 6 on this 8-core box; run several workflows in parallel (shards) for throughput. CPU then pins at 100%, largely ECC hook node processes (about 30) per tool call.
  - Haiku StructuredOutput rejects big extractions as invalid JSON (backslashes, quotes, over 8 KB); have it write the file via a script with `json.dump` and reload it instead.
  - Brain boot: Paul declined it at first in that session, then asked for it explicitly; follow his current ask.

## Linked vault (2026-10-10)

- Combined graph vault `C:\Users\pgoff\Documents\linked` (Obsidian vault "linked"): folder JUNCTIONS `brain\` (to `Documents\brain`) and `research\` (to `Documents\research`), plus `bridges/<system>.md` (one per research system hub, 20 in all; wikilinks from each research hub to the brain notes, built by the scratchpad script `build_linked.py` from the phase-1 catalog `research/_work/state/phase1.json`) and `Home.md`. Its ignore filters hide `research/_raw`, `_text`, `_annots`, `_work` and `_sources`. This note is the brain vault's link back (vault PR #22).
- Trap: Obsidian's `%APPDATA%\obsidian\obsidian.json` must be written WITHOUT a BOM (PowerShell 5.1 `-Encoding utf8` adds one, and Obsidian then reports "vault not found" or an error); Obsidian reads that file only at startup.

<!-- brainlink:state:begin -->
## Brain state (generated)

> Generated by brainlink from melange-systems-brain. Edit the brain with brainctl, not this block; hand-written text outside the markers is never touched.

- Brain: [[ledger/melange-systems-brain/STATE|melange-systems-brain STATE]]
- STATE last verified: 2026-10-27 21:55
- Open questions in STATE: 41; active decisions: 385; dead ends: 82

### Recent decisions
- [[ledger/melange-systems-brain/D-410|D-410]] — SNA health check runs as its own session with Paul's three steps
- [[ledger/melange-systems-brain/D-409|D-409]] — Contact inference: top-lobbied-member precision folded into the existing v1 sess
- [[ledger/melange-systems-brain/D-408|D-408]] — Overseer seat runs on Fable
- [[ledger/melange-systems-brain/D-407|D-407]] — M7 attempt 10 authorized via 10b launcher after daytime headed Congress.gov walk
- [[ledger/melange-systems-brain/D-406|D-406]] — N14: merge disk-floor lane onto mentat-crypto, update collector pin, run batches
<!-- brainlink:state:end -->
