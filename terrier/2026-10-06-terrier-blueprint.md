---
type: topic
title: "Terrier multi-district build blueprint"
aliases: ["Terrier blueprint", "Terrier multi-district blueprint", "TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06", "OR-05 and CT-01 build plan"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors: []
objective: "Add Oregon OR-05 and Connecticut CT-01 to the Colorado CD-05 Terrier app as a config-first multi-district system, with Colorado outputs unchanged by default"
created_at: 2026-10-06
sources:
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/outputs/cu-geography-v3/TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md", type: "markdown", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\outputs\\cu-geography-v3\\TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md", sha256: "c76fe5e7a9d5d4c1e89696daf9f5905b809f6fbce9bed4a09b7d0c3eed94d48f"}
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/work/geography/DOWNLOADS_2026-10-07.json", type: "json", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\work\\geography\\DOWNLOADS_2026-10-07.json", sha256: "0b902c237c8394bffd0f72aa3ce55cb30c6af6db0f44388f58be6714c5168a7d"}
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

Paul's later rulings of the same day (one server process per district on ports 8767, 8775 and 8777; walk-list Abs wording; extra census.gov downloads; the per-district model rule; no stress tests on the laptop; overnight blanket permission) and the lead's Phase 3b rulings are on [[2026-10-06-terrier-rulings]].

## Current build status (2026-10-07)

Aggregates only. Commit hashes are in the Terrier repo (branch `claude/walk-list`); counts are from the built stores and reports.

| Phase | State | Result |
|---|---|---|
| 0, Colorado baseline | done | Gate committed `609385d` (`tools\co_baseline.py`): 6 stores, 7,190,676 rows, 43 API answers. Passed again after the Phase 2 builds (stores and answers identical). |
| 1, sources census | last recorded as running | Phases 2 and 3 were built from the same two source files; no separate completion is recorded. |
| 2, multi-district foundation | done, merged on `claude/walk-list` | `f4ebbe9` config, `5684315` party check, `5ee9234` walk builder, `b9df41d` server, `866b724` geography tools, `3eddcae` header district menu. Test-server check 15 of 15 per district. |
| 3, fill per district | done | `bbebf92` (log `f59290e`). Scored once on frozen holdouts. |
| 3b, row framework per district | next | Per-district score stores and area layers; Oregon and Connecticut are already in the header menu. |
| 4, features | not started | Industries, candidate support with the primary/general toggle (Paul approves the primary-mode spec first), density, overlays, street ROI planner, walk-list fields. |
| 5 and 6, verify and land | not started | |

- **Phase 2 stores.** OR-05: 562,563 voters, 386,030 mapped households, 245 precincts, 68 cities; every recorded vote is counted as a mail ballot. CT-01: 458,372 voters, 287,033 households, 134 precincts, 27 towns; the 2024 mail share is 7.8%.
- **Phase 3 results.** OR-05 filled 86.64% right against 77.89% for always guessing the most common answer (+8.75 points; 82.85% expected on the real blanks; AUC 0.57 to 0.94 across fields). CT-01 87.39% against 77.91% (+9.48 points; 83.14% expected; AUC 0.57 to 0.95). Colorado before its GPU step: 86.67%. Six fields show no real lift and are labelled as the file default, as in Colorado. No Colorado-trained model is used. Reports: `.local\<district>\luna-v1\REPORT.md` in the Terrier root.
- **Incidents.** A Python 3.12 crash with exit code 0xC000070A (a Windows WMI query timing out under load; worked around). The laptop went to sleep with the lid closed and froze a step; step timeouts now count awake time only.
- **Census TIGER 2025 downloads: done.** First 14 files (255,206,750 bytes), census.gov only: for Oregon the block file, the district boundary file and six county road files; for Connecticut the block file, the district boundary file and four planning-region road files. Paul then approved state legislative district boundaries (lower and upper chambers) and ZIP-code areas for both states: 6 more files, 20 in all (280,939,810 bytes). Manifest: `work\geography\DOWNLOADS_2026-10-07.json` (path below).
- **Python environment:** rebuild approved; its outcome is not recorded here.
- **Source files:** both extracted to `Downloads\terrier-sources\`.
- **Change record:** every overnight change is logged in `OVERNIGHT_CHANGES_2026-10-07.md` in the Terrier root.
- **Not started:** the row-framework copies (Phase 3b) and every Phase 4 lane.

## Sources and inputs

All paths are on Paul's workstation. `<outputs>` is `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs`.

- **Blueprint:** `<outputs>\cu-geography-v3\TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md`.
- **Handoff files** (Terrier root `<outputs>\cu-geography-v3\`): `WALK_LIST_HANDOFF_2026-10-02.md`, `TERRIER_HANDOFF_2026-10-01.md`, `ACTUAL_DATA_HANDOFF_2026-10-01.md`, `DATA_AUDIT_2026-10-01.md`. Paul's request log with every definition: `<outputs>\cu-geography\CONVERSATION_REQUESTS.md`.
- **Source files as supplied:** Colorado `C:\Users\pgoff\Downloads\<CO-05 vendor file>.csv` (491,308 rows); Oregon `C:\Users\pgoff\Downloads\<OR-05 source zip>.zip`; Connecticut `C:\Users\pgoff\Downloads\<CT-01 source zip>.zip`.
- **Extracted source files:** `C:\Users\pgoff\Downloads\terrier-sources\<OR-05 vendor file>.csv` (562,563 rows, 1,074,173,461 bytes) and `C:\Users\pgoff\Downloads\terrier-sources\<CT-01 vendor file>.csv` (458,372 rows, 831,664,503 bytes). Same 622-column schema as Colorado.
- **Census manifest:** `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\work\geography\DOWNLOADS_2026-10-07.json` (20 entries: file, source URL, size in bytes, download time; the first 14 are the block, boundary and road files, the last 6 the state legislative and ZIP-code area files). The downloaded files are under `work\geography\or-05\` and `work\geography\ct-01\` (`blocks.zip`, `districts.zip`, `roads\`).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner and sole decision-maker for Terrier; gave the 2026-10-07 answers above. |
