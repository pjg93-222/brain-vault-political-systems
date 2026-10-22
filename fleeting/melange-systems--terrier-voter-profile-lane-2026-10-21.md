---
type: fleeting
title: "Terrier voter profile lane (2026-10-21)"
aliases: ["terrier-voter-profile-lane-2026-10-21"]
source: "session"
captured_at: 2026-10-21
created_at: 2026-10-21
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/terrier-voter-profile-lane-2026-10-21.md", type: "claude-memory", synced_at: "2026-10-21", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\terrier-voter-profile-lane-2026-10-21.md", sha256: "c65b84ebd3595855b667e269e7bff31b27ef19e9ce8492c7dd7576111da813f1"}
updated_at: 2026-10-21
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Terrier voter profile lane (2026-10-21)

> Terrier 'Supporters and persuadables' voter profile (inverse of 'Crank'): Geo PR #13 on feat/coalition-profile off main; thresholds pending Paul; client's Happy Valley streets are mostly OR-03

## Content

2026-10-21 Paul relayed a client request: walk lists for new streets with "the opposite of Crank": supportive D, U, persuadable R. Paul: "It needs to be an option within the app, in the meantime use this" (Downloads\Portland OR OR.05 Streets.xlsx, 61 rows / 59 distinct Happy Valley street names in 6 groups).

Facts established: "Crank" is NOT a Terrier profile (zero hits in Geo repo, vault, sources); it is Jeff Crank, R, CO-05. Terrier had registration (svi_party_registration) feeding support s in tools/support.py:32-46 but no party-mix selector; the four presets only rank streets.

Built: Geo PR #13 https://github.com/[private — see knowledge vault]/pull/13, branch feat/coalition-profile off main ea0c826 (shipped lineage per Paul's 10-21 ruling), worktree C:\Users\pgoff\Documents\Terrier\worktrees\coalition-profile, 8 commits 253a5d2..68a9299. `profile` query key (all | coalition) on list/plan/trim/save; rule in tools/profiles.py, constants tools/field_labels.py:105-107 (SUPPORT_MIN 2/3, PERSUADE_MIN 1/3, PERSUADE_MAX 2/3, placeholders). Frontend "Voter profile" select. Suite: same 40 pre-existing failures as main on a clean worktree (missing gitignored co-cd005 zip, pyarrow, desktop principal DB, golden digest red on main). Proof + per-group CSVs (PII, outside git): C:\Users\pgoff\Documents\Terrier\outputs\walk-lists-or05-happy-valley-20261021\.

OPEN for Paul: thresholds; keep all U or only s>=1/3; OR-03 voter file purchase (only 4 of 59 names are in the OR-05 store; Census puts the rest in CD-3); CSV matcher ignores city (pre-existing). CodeRabbit threads on PR #13 must be read and resolved before "done". Live district servers 8767/8775/8777 had no listener during the 10-21 evening run (not touched).

**Why:** the client's targeting ask is a universe filter, orthogonal to street ranking; coverage, not the profile, limits the Happy Valley result.
**How to apply:** do not merge PR #13 until Paul rules thresholds; never source OR-03 data without his go; cite the proof folder for "it works". Related: `terrier-multidistrict-lane-2026-10-06`, `desktop-no-password-lane-2026-10-21`, `always-read-coderabbit-2026-10-18`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-21 from the Claude Code memory file `terrier-voter-profile-lane-2026-10-21.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
