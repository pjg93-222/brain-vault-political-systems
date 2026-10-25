---
type: fleeting
title: "Memory index is the loading contract (2026-09-18)"
aliases: ["memory-index-is-the-loading-contract-2026-09-18"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[claude-code-harness]]"
  - "[[2026-06-working-agreement-tooling-and-environment-traps]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/memory-index-is-the-loading-contract-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\memory-index-is-the-loading-contract-2026-09-18.md", sha256: "3c41dd58440c6ffcaf9936926e1ad40df02bf7f2031452a6f649d463ca1076be"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Memory index is the loading contract (2026-09-18)

> MEMORY.md's filename IS the session-start loading contract — splitting it or moving lines to a second file silently deletes those entries from every future session's context

## Content

2026-09-18: compacting the memory index, I proposed splitting it — `MEMORY.md` for the active lanes
plus a `MEMORY-ARCHIVE.md` for the July/August entries — because 146 index lines could not be
squeezed under a 17.1 KB target. Paul rejected it and named the thing I had missed: **`MEMORY.md`
is not merely the index, it is the loading contract.** That exact filename is what gets read into
context at session start. Nothing else in the directory is.

So the split would not have archived anything. Every line moved to a second file drops out of every
future session's context, while looking perfectly filed — the topic files still exist, the lines
still sit under a heading, and nothing errors. That is what makes it dangerous: a later session
simply reasons without facts it can no longer see, and never learns they were there.

**Why the target could not be met by compression:** the index's mass is structural, not verbose.
Measured at 146 entries (counts in chars; KB = chars/1024):

- filenames alone: ~5,300 chars (~5.2 KB) — exact strings, not compressible at all
- filenames + markdown syntax + section headings + the verbatim Standing directives: ~9,600 chars
  (~9.4 KB) incompressible before a single title or hook is written
- floor with every hook fact kept and titles crushed to ~8 chars average: 18,601 chars (18.17 KB)

Hooks averaged 75 chars and were already telegraphic ("hung console holds runtime.lock"). So a
target much under 18 KB does not buy tighter words, it buys deleted facts — commit SHAs, test
counts, reconciliation caveats. Landed at 18.66 KB with every entry and every ruling intact, which
is comfortable against the 24.4 KB read limit.

**Re-measured 2026-09-19 (Paul: "trim MEMORY.md"):** 152 entries, 19.89 -> 18.59 KB (chars/1024 - the unit the size hook reports; bytes run ~0.3 KB higher because of the em dashes). Every link kept, same order, same sections. What came out: commit SHAs, packet paths and date suffixes in titles (all still in the topic files), plus the seven closed `mentat-failings-lane-s2..s8` lines merged into ONE line carrying all seven links. The floor predicted above (18.17 KB at 146 entries + 6 entries x ~70 chars = 18.57) held to within 0.02 KB, so the hook's 17.1 KB target is about 1,500 chars BELOW what 152 entries can carry with their facts. Only fewer ENTRIES gets there: merging closed lanes' topic FILES (candidates: mentat failings S2-S8 -> 1 file; the staffer lanes; the July psychometrics notes). That is a consolidation job with cross-links to repair, Paul's to order - not a trim. Method that was safe: draft in scratchpad -> assert same links in same order, every target on disk, headings equal, no BOM/CR, sane size -> backup -> byte copy -> read back.

**How to apply:**
- Treat the filename `MEMORY.md` as the contract. Never split the index, and never relocate index
  lines into `MEMORY-ARCHIVE.md` or any other file, however tidy the result looks.
- When the index nears its read limit, do the two things that keep the facts inside the loaded
  file: compress the hooks, and consolidate stale *entries* into merged topic files (fewer, bigger
  memory files means fewer index lines). Merging entries is legitimate; relocating lines is not.
- Filenames run ~36 chars each and are irreducible, so entry count — not hook length — sets the
  floor. Reducing the number of entries is the only lever with real headroom.
- Merging index *lines* for one lane's consecutive sessions saves only ~25 chars per line, because
  the filenames dominate. It is worth doing for tidiness, not for bytes.
- When a size target collides with content, report the arithmetic and let Paul rule instead of
  paying the cost silently. Meaning beats bytes — his own rule is that a negation is "worth more
  than any byte saved."

Contrast with `memory-index-restore-incident-2026-07-26`, the other way this file has been
damaged: that was a **mangling** — MEMORY.md truncated to 3 bytes by one PowerShell command, loud,
obvious, and recoverable from the session-start system reminder. This would have been an
**invisible deletion** — the file intact, the entries apparently filed, and the context quietly
smaller in every session afterward. A mangling announces itself; this does not.

Related: `memory-index-restore-incident-2026-07-26`, `dont-drop-context-anchor-memory`,
`ask-before-substantive-changes`

**Compacted 2026-10-24 (22.94 -> 16.76 KB, chars/1024; 245 -> 247 links, none dropped):** the 09-19 floor above assumed every hook fact must stay in the index. It need not: each dropped hook was first appended verbatim to its own topic file (stamp 'Index hook moved here from MEMORY.md when the index was compacted (2026-10-24)'), titles lost their dates, and the link/hook separator went from ' — ' to ':' (saves ~2 chars each, zero meaning). Same order and sections; duplicates merged as '[A](a.md) + [B](b.md):hook'. Backup: MEMORY.md.bak-20261024.

## Possible Connections

- [[claude-code-harness]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-06-working-agreement-tooling-and-environment-traps]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `memory-index-is-the-loading-contract-2026-09-18.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[claude-code-harness]], [[2026-06-working-agreement-tooling-and-environment-traps]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
