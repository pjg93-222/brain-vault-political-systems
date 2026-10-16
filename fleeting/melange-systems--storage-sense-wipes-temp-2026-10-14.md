---
type: fleeting
title: "Storage sense wipes temp (2026-10-14)"
aliases: ["storage-sense-wipes-temp-2026-10-14"]
source: "session"
captured_at: 2026-10-14
created_at: 2026-10-14
status: "promoted"
promoted_to: "obsidian://open?vault=linked&file=knowledge%2Fcuration%2Fworkstation-data-preservation"
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/storage-sense-wipes-temp-2026-10-14.md", type: "claude-memory", synced_at: "2026-10-14", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\storage-sense-wipes-temp-2026-10-14.md", sha256: "491a92e8612c9b70c901090783ea07d1e9b58a14113973f79d30c7bd91f3797b"}
updated_at: 2026-10-14
updated_by: "codex/intake-curation"
tags: ["type/fleeting", "status/raw"]
curated_at: "2026-10-16"
---

# Storage sense wipes temp (2026-10-14)

> Windows Storage Sense deletes %TEMP% (incl. Claude scratchpads) when disk runs low; never freeze parity inputs there

## Content

Windows Storage Sense is ON for low-disk runs and deletes temp files (HKCU StorageSense\StoragePolicy: 01=1, 2048=0, 04=1). On 2026-10-13 14:27 -05:00, with C: at about 2.9 GB free, one sweep deleted 189 of 325 frozen Mentat parity inputs from the a7579cc4 session scratchpad under %TEMP%. It also partially emptied refit\inputs, reports_all and snap\S2/S3. No Claude tool call deleted them. Diagnosed 2026-10-14.

**Why:** Claude session scratchpads live under %LOCALAPPDATA%\Temp\claude\..., so any freeze, pristine copy or evidence kept there can vanish silently mid-docket.

**How to apply:**
- Put parity freezes, comparison copies and evidence outside %TEMP%, e.g. %LOCALAPPDATA%\Mentat\parity\<run> or an audits/ path.
- Re-hash a freeze before using it.
- Changing Storage Sense is a system setting, so it is Paul's call only.
- Related: `disk-cleanup-lane-2026-09-16`, `mentat-compute-and-money`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-14 from the Claude Code memory file `storage-sense-wipes-temp-2026-10-14.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
