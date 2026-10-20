---
type: fleeting
title: "Statara provenance lane (2026-10-20)"
aliases: ["statara-provenance-lane-2026-10-20"]
source: "session"
captured_at: 2026-10-20
created_at: 2026-10-20
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/statara-provenance-lane-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\statara-provenance-lane-2026-10-20.md", sha256: "d6f9d5758b4a0082ac5f19ea7d9538bc5873af770281d263bbec90c871f2c3d9"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Statara provenance lane (2026-10-20)

> Statara voter-file provenance research (OR-05/CO-05 exports) — report location, key findings, scratchpad PII copies kept by Paul

## Content

Report: `audits/statara_provenance_20261020/REPORT.md` (untracked; repo is PUBLIC — never commit/push it, see `melange-public-repo-unfiltered-branches-2026-10-18`). Brain: D-164 governs Statara data visibility.

Key findings (verified by two Opus verifiers 2026-10-20): Statara export = TargetSmart VoterBase rebranded (my.statara.com is a TargetSmart multi-tenant app; sii_/svi_ fields in TargetSmart schema). Public codebook `statara_codebook_aug24.xlsx` in Harvard Gov 1347 student repos (AviAgarwal27/election-blog). Vote code = method + C/P (current/previous state). sei_ = national 2020 block-group table keyed to identity address; PVI = 0.3·earlier+0.7·later−national. Consumer = Ruf/Infutor (Huckle dict). Geocoder = Geocodio vocab in 2026. Issue scores ≈ partisan (R² ~0.87).

**Why:** Paul wanted to know where Statara got its data and how it was aggregated (Terrier OR-05/CO-05 context).
**How to apply:** Reuse report before re-researching. Paul chose 2026-10-20 to KEEP scratchpad voter-data copies (session 716dd668 scratchpad: bynum_zip CSV, rea_zip repack, forensics_geo/work + forensics_src/work parquet) — they're in %TEMP%, so Storage Sense may wipe them (`storage-sense-wipes-temp-2026-10-14`); originals remain in Downloads.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `statara-provenance-lane-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
