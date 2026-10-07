---
type: topic
title: "Terrier multi-district build blueprint"
aliases: ["Terrier blueprint", "Terrier multi-district blueprint", "TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06", "OR-05 and CT-01 build plan"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors: []
objective: "Add Oregon OR-05 (Bynum) and Connecticut CT-01 (Bronin) to the Colorado CD-05 Terrier app as a config-first multi-district system, with Colorado outputs unchanged by default"
created_at: 2026-10-06
sources:
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/outputs/cu-geography-v3/TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md", type: "markdown", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\outputs\\cu-geography-v3\\TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md", sha256: "c76fe5e7a9d5d4c1e89696daf9f5905b809f6fbce9bed4a09b7d0c3eed94d48f"}
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/work/geography/DOWNLOADS_2026-10-07.json", type: "json", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\work\\geography\\DOWNLOADS_2026-10-07.json", sha256: "14e766324409b16191db74be79e4184e8629820eed95279d7ae124d8c0519666"}
updated_at: 2026-10-07
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# Terrier multi-district build blueprint

> The written plan for adding Oregon OR-05 and Connecticut CT-01 to the Colorado CD-05 Terrier app: its phases, what the 2026-10-06 review corrected, Paul's 2026-10-07 answers, how far the build has got and where every input lives. Project note: [[terrier]].

## Context

- **What the blueprint is.** A build prompt and plan written 2026-10-06 for a fresh coding session, reviewed the same day against the Terrier code (commit `8c7a817`), the Luna model stages and the two source files before any construction. It holds the verified context, Paul's binding rulings, phases 0 to 6, a "Review 2026-10-06" fact-check table with the changes it caused, and, at the bottom, "Answered by Paul 2026-10-07" and "Open for Paul".
- **Where it lives.** `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs\cu-geography-v3\TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md`, in the Terrier root, next to the handoff files. It was edited in place by the review session, so the file, not this note, is the plan of record.
- **How it relates to the other notes.** Paul's rulings and his O-1..O-13 answers are on [[2026-10-06-terrier-rulings]]; the app, its definitions and the status are on [[terrier]]. This note records the plan and the build status only.
- **Privacy.** This note holds aggregates and paths only: no voter rows, names, addresses or voter IDs. The plan itself keeps all data shown in the app and run locally (O-9).

## Phases

Each phase ends at a gate: the Colorado baseline from Phase 0 must still match, and the test suites must be green on a spare port (never the live 8767 server).

- **Phase 0, Colorado baseline.** Before any code change, run a non-live copy of the current app, record golden responses for a fixed list of pages and exports, and take a canonical content hash of every Colorado store; this baseline gates every later phase and lane.
- **Phase 1, sources and census.** Extract the two zips, then profile each district: rows, households, blank rate per field the Luna model fills (26), party codes, vote-method letters per election, precinct formats, rows outside the district and block county codes; find the vendor's vote-code dictionary; trace the geo-audit flag; list every Colorado hard-code with file and line.
- **Phase 2, multi-district foundation.** A districts configuration (state, candidate, race mode, vote codes, score weights, data folder, salts and more; the Colorado entry reproduces today's behaviour exactly), every hard-code replaced by a config read, a district selector, ingest and street networks for Oregon and Connecticut in each district's own map zone.
- **Phase 3, imputation per district.** Copy the Luna stages into versioned per-district stages (the locked originals untouched), refit on each district's own rows with the frozen settings and no search, run the household model stage, skip the GPU stage, score a frozen per-district holdout once, and mark every filled cell as estimated.
- **Phase 3b, row framework per district.** A versioned per-district copy of the row framework (where the overall score and its weights live), run on the completed data with the district weights, with the frozen-hash check made per district.
- **Phase 4, features in parallel lanes.** Industries as configuration (Credit Union Alignment first), a candidate-support score with a per-district primary/general toggle, population and voter density from Census blocks, a map overlay of any layer combination, a street planner ranking streets by the three presets, and walk-list fields (real vote codes per state, party codes shown as themselves, an optional scores toggle that defaults to raw).
- **Phase 5, verify.** Colorado baseline identical; suites and browser checks green; per district, row counts reconcile to the source, the imputation table, the density join rate and ten hand-checked top streets per preset; rank stability of the street ranking under 20% weight changes.
- **Phase 6, land.** Commit each verified lane on the local branch `claude/walk-list` (no remote); restarting the live server is Paul's; update the vault notes.
- **Never.** Edit the Luna or row-framework originals, change Colorado outputs, run a grid search, strip or hide personal data, put voter rows in the vault, a cloud or a pod, poll background jobs, invent definitions, test against 8767.

## Review of 2026-10-06: the main corrections

- **Wrong line numbers and an incomplete hard-code list.** Two line references pointed at the wrong code, and about 25 more Colorado-specific places were missing; the full set is now listed so the builder does not edit the wrong code.
- **Colorado's current filled data.** It is the section 30 export (a household model, then a GPU step, then a majority-default rule; 86.8% on the reused test check), not the superseded household-copy stage the draft described.
- **Blank values are per field, not per row.** The median blank rate across the `sci_*` fields is 14.8% in OR-05, 13.0% in CT-01 and 16.2% in Colorado, and no row is blank on every field; 10 fields are empty in all three files. The draft's "about 9-15% of rows are blank" was wrong.
- **A refit cannot start from the saved selections alone.** They hold the scaler, distance, neighbour count and weights, but not the feature list, encoder, forest settings, seed or data splits, which live elsewhere. The lock covers code, policy and selections, not the source file or row count, which are hard-coded in other stage files.
- **The overall score is computed in the row framework**, with its weights frozen there, so it needs its own per-district copy (Phase 3b) and a per-district frozen-hash check.
- **Connecticut block codes.** The voter file uses the newer planning-region county codes, so the 2020 edition of the Census block file would not join; this became the Census question to Paul.
- **Map zones.** The walk network is projected in Colorado's map zone; each district needs its own (Oregon EPSG:26910, Connecticut EPSG:26918).
- **Oregon votes** are coded as ordinary ballots (letter Y), not mail (M), so today's mail rule would show about 1% of Oregon votes as mail; the mail rule must be per state.
- **A Colorado baseline phase was added** (Phase 0) because nothing captured today's Colorado behaviour before changes.
- **Candidate support** no longer uses primary vote counts (they are turnout, already in Participation), and the primary universe is a config value; party codes were being lumped into "other" in three places.
- **Checked and correct:** the row counts (562,563 and 458,372), the identical 622-column header, the store names, the test counts, the 26 saved models and selections and the TIGER origin of Colorado's street network. **Not verifiable as stated:** a 12-hour Luna run (none is recorded; the longest is the roughly 2.2 hour grid search) and the encoding claim (the files are UTF-8 with a few invalid byte sequences).

## Paul's answers of 2026-10-07

Full wording on [[2026-10-06-terrier-rulings]]; the plan's marks "PROPOSED" are superseded by these.

- Weights approved: with a candidate, industry 30 / candidate support 25 / participation 25 / sphere 20; without a candidate (Colorado) 40 / 35 / 25 unchanged.
- Street-plan formulas approved. "Mixed-support streets" = sum over people of (1 - |2s - 1|) x p (s = support chance, p = voting chance); "Supporter turnout" = sum of s x (1 - p); "Voter identification" = count of people with no clear support signal.
- Census approved: the TIGER 2025 edition block file plus the district boundary files for Oregon and Connecticut, census.gov only. Finding: the 2025 block file still uses Connecticut's old county codes (09001-09015), while the voter file and the road files use the planning-region codes (09110-09190); blocks are re-coded by location during the build.
- Colorado's GPU fill step skipped for Oregon and Connecticut.
- Parallel lanes use Claude Code's built-in background agents (agent-manager and DevFleet not used).
- Python environment rebuild approved.

## Current build status (2026-10-07)

- **Phase 0 (Colorado baseline):** running.
- **Phase 1 (sources census):** running.
- **Census TIGER 2025 downloads: done.** 14 files, 255,206,750 bytes, census.gov only: for Oregon the block file, the district boundary file and six county road files; for Connecticut the block file, the district boundary file and four planning-region road files. Manifest: `work\geography\DOWNLOADS_2026-10-07.json` (path below).
- **Python environment rebuild:** approved and running.
- **Source files:** both extracted to `Downloads\terrier-sources\`.
- **Not started or not recorded as done:** per-district code, the Luna copies, the row-framework copies and every Phase 4 lane.

## Sources and inputs

All paths are on Paul's workstation. `<outputs>` is `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs`.

- **Blueprint:** `<outputs>\cu-geography-v3\TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md`.
- **Handoff files** (Terrier root `<outputs>\cu-geography-v3\`): `WALK_LIST_HANDOFF_2026-10-02.md`, `TERRIER_HANDOFF_2026-10-01.md`, `ACTUAL_DATA_HANDOFF_2026-10-01.md`, `DATA_AUDIT_2026-10-01.md`. Paul's request log with every definition: `<outputs>\cu-geography\CONVERSATION_REQUESTS.md`.
- **Source files as supplied:** Colorado `C:\Users\pgoff\Downloads\statara_co_cd005_20260904.csv` (491,308 rows); Oregon `C:\Users\pgoff\Downloads\Janelle Bynum (OR-05).zip`; Connecticut `C:\Users\pgoff\Downloads\Luke Bronin (CT-01).zip`.
- **Extracted source files:** `C:\Users\pgoff\Downloads\terrier-sources\statara_or_cd005_20260904.csv` (562,563 rows, 1,074,173,461 bytes) and `C:\Users\pgoff\Downloads\terrier-sources\statara_ct_cd001_20260904.csv` (458,372 rows, 831,664,503 bytes). Same 622-column schema as Colorado.
- **Census manifest:** `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\work\geography\DOWNLOADS_2026-10-07.json` (14 entries: file, source URL, size in bytes, download time). The downloaded files are under `work\geography\or-05\` and `work\geography\ct-01\` (`blocks.zip`, `districts.zip`, `roads\`).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner and sole decision-maker for Terrier; gave the 2026-10-07 answers above. |
