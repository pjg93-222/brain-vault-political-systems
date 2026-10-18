---
type: project
name: "Terrier"
aliases: ["Terrier", "Terrier app", "cu-geography-v3", "Terrier voter canvass app"]
description: "Terrier: the renamed CU Geography voter-canvass and walk-list app (Codex project, not Melange; root Documents\\Terrier\\outputs\\cu-geography-v3, Django/Waitress on 8767 plus React/MapLibre). Live for Colorado CD-05 (491,308 people, 343,000 households); 2026-10-06 lane adds Oregon OR-05 (Bynum) and Connecticut CT-01 (Bronin) under Paul's FLEXIBLE config-first ruling, with every data field shown and runs local. The Terrier brain exists only as vault notes (this note and its rulings discussion), not as a separate Project Brain."
status: "active"
deadline: ""
progress: "As of 2026-10-07: CO CD-05 live on 8767 (8 tabs including Walk list; live server restarted 2026-10-04 16:38). Multi-district lane started 2026-10-06: OR-05 (562,563 rows) and CT-01 (458,372 rows) source zips supplied and extracted, same 622-column statara schema as Colorado; Paul answered the open-decision list O-1..O-13 and made three rulings (FLEXIBLE config-first, vault-only brain, per-district primary/general toggle), then approved the weights, street-plan formulas, 2025 Census files and skipping the GPU fill step on 2026-10-07. Build so far: Phase 0 (Colorado baseline gate, committed 609385d) DONE; Phase 2 (multi-district foundation: config, walk builder, one server process per district, geography tools, header district menu) DONE and merged on claude/walk-list, with the Colorado gate still passing after the builds; Phase 3 (filling the blank sci_* values per district with models trained on each district's own voters) DONE, committed bbebf92, scored once on frozen holdouts (OR-05 86.64% right against 77.89% for always guessing the most common answer; CT-01 87.39% against 77.91%). Next: Phase 3b (per-district score stores and area layers), then the Phase 4 features. Paul also ruled later on 2026-10-07 (one server per district, walk-list Abs wording, extra census.gov downloads, the model ruling, no stress tests on the laptop, overnight blanket permission); the lead made three Phase 3b rulings. As of 2026-10-08: Paul ruled that nothing is ever withheld (the under-20-people/10-households area suppression is gone in every district, Colorado included) and set \"Needs a push\" as the default street plan; Phase 3b is built for OR-05 and CT-01 (30/25/25/20 frameworks, every area shown, candidate support, density, street plan) and both passed their local smoke checks; the nothing-withheld Colorado data was staged beside the live files and passed its gate. As of 2026-10-08 evening: Paul swapped the nothing-withheld Colorado data live at 19:16 and the build was complete at 19:30, with all three servers running (CO 8767, OR-05 8775, CT-01 8777; OR-05 and CT-01 with the 30/25/25/20 weights, candidate support and \"Needs a push\" as the default street plan); the street planner with Print scores is built and live for candidate districts; the map side panel's Registration mix shows every party code (O-10); the Connecticut density gap is fixed (12 blocks still have no density: 5 have no land and 7 hold 15 people the file cannot place); the server crash (exit code 0xC000070A) is fixed by a WMI patch in manage.py; the latest Terrier commit is 8f50713, on claude/walk-list and main in the private GitHub repo pjg93-222/Geo. As of 2026-10-09: Paul approved the spec for the Untapped map layer and the one-click Plan walk list (rulings R1-R4), which replaces the \"Needs a push\" definition with one potential formula; both went live the same day on OR-05 (port 8775) and CT-01 (port 8777), latest Terrier commit 6f56299, with Colorado (8767) not restarted and its server output byte-identical (it shows a one-line \"Untapped needs a candidate\" note on its next page load). On the afternoon of 2026-10-09 Paul answered yes to both Untapped questions (1. Yes 2. Yes) and the calibrated chance of voting and the trimmed one-click list went live on OR-05 and CT-01 (latest Terrier commit 0f89362; Colorado untouched). As of 2026-10-09 evening: the project folder moved to Documents\\Terrier (the old path stays as a junction); walk-list caps lifted (one-click lists 1 to 1,000 doors; whole-precinct and street-pick lists up to a 10,000-voter ceiling, where before a 1,500-voter limit refused 183 of 326 CO, 128 of 245 OR and 122 of 134 CT precincts); one-click turf retries up to 5 seeds; warm walk requests down from 1.5-3 s to 0.02-0.3 s after an index fix; the map is shaded by Democratic-minus-Republican registration margin instead of largest party; all three servers restarted from the new path on the new code (OR-05 and CT-01 now have hidden starts and watchdogs); latest Terrier commit aa21b52 on claude/walk-list (pushed to origin later that evening; 411 Python walk/untapped tests, 228 frontend unit tests, tsc clean at merge). As of 2026-10-09 late evening: Paul ruled that the People Political outlook column collapses neighbouring vendor flags (commit 40fa052, pushed to origin and live on all three servers), accepted the slow first Colorado list after a restart, and the two stale worktrees were removed. Open for Paul: the primary-mode choice (Default, A, B or C) and how to treat unaffiliated voters per state."
blockers: []
action_items:
  - description: "Extract the OR-05 and CT-01 zips to Downloads\\terrier-sources\\ (O-13, Paul said yes; on 2026-10-09 the extracted CSVs moved to Documents\\Terrier\\sources\\ and Downloads\\terrier-sources is now a junction to it)"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Make the district list, industries, candidate per district, layer combinations and ROI weights configuration rather than code; keep Colorado CD-05 outputs byte-identical by default (Phase 2 district configuration done and merged 2026-10-07, Colorado gate passed; industries, layer combinations and ROI weights come with Phase 4)"
    status: "in-progress"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Copy the Luna RF/KNN model into a versioned per-district stage that takes per-district values (row count and file hash) and fills the blank sci_* values for OR-05 and CT-01; the locked Colorado original stays untouched (Phase 3 done 2026-10-07, commit bbebf92)"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Find the real Oregon and Connecticut mail-ballot and absentee vote codes (O-3); Oregon is all vote-by-mail; no n/a column (built into the Phase 2 stores and the walk-list Abs wording 2026-10-07)"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Add the per-district primary/general race-mode toggle; the support model switches with it and primary is never hidden; never hard-code Bronin's race status (Phase 4)"
    status: "todo"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Add an optional scores toggle on the printed walk list, defaulting to raw (built as the Print scores box, off by default, commit 2419afc; Colorado prints overall and participation only)"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Show every party code as itself instead of lumping Working Families (W) into other (O-10): done for the walk overview (11e3fd5) and the map side panel's Registration mix (85b5656) in every district; still to confirm: imputing the missing geo-audit values with the model instead of a Not audited label (O-5), and the lead's Phase 3b ruling that party W gets a neutral lean like other minor parties"
    status: "in-progress"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Phase 3b: per-district score stores and area layers (Oregon and Connecticut are ready in the header district menu; built and smoke-checked 2026-10-08)"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Swap the staged nothing-withheld Colorado data onto the live server on 8767 with _build\\swap_co_live.ps1, then start the Oregon (8775) and Connecticut (8777) servers (Paul swapped Colorado at 19:16 on 2026-10-08; all three servers running at 19:30; backup and rollback exist)"
    status: "done"
    deadline: ""
    owner: "Paul Goff"
  - description: "Phase 4 features: candidate support, density, map overlay modes and the street planner with Print scores are built (2026-10-07 and 2026-10-08, live for OR-05 and CT-01); industries as configuration and the primary/general toggle remain"
    status: "in-progress"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Build the Untapped map layer and the one-click Plan walk list (Paul's rulings R1-R4 of 2026-10-08, spec approved 2026-10-09; wording on the rulings note); built and live 2026-10-09 on OR-05 (port 8775) and CT-01 (port 8777), Terrier commit 6f56299; where to click is under Paul's definitions"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Approve the primary-mode specification for candidate support before it is built (the choice of Default, A, B or C, and how to treat unaffiliated voters per state)"
    status: "todo"
    deadline: ""
    owner: "Paul Goff"
  - description: "Answer two Untapped questions raised by the live check: (a) calibrate the chance of voting (t) per district against people's own general-election record (ranking unchanged); (b) trim the one-click list to the door count; Paul answered yes to both on 2026-10-09 (1. Yes 2. Yes); built and live the same afternoon on OR-05 and CT-01, Terrier commit 0f89362; wording on the rulings note"
    status: "done"
    deadline: ""
    owner: "Paul Goff"
  - description: "Define any further industries beyond Credit Union Alignment (CUA); the config will support them once defined (O-12)"
    status: "todo"
    deadline: ""
    owner: "Paul Goff"
  - description: "Uncertainty ranges on the imputed values were not answered (O-4b); the default stays off until Paul says otherwise"
    status: "todo"
    deadline: ""
    owner: "Paul Goff"
  - description: "Walk-list generator that 'didn't work': remove the one-click door limits and the 1,500-voter refusal, retry isolated turf seeds, speed up walk requests (2026-10-09 evening: one-click 1 to 1,000 doors by Paul's ruling, other lists up to 10,000 voters, 5-seed retry, area-index fix; commits 836e367, 6a568e7, 53de471, f944357, c5ffccd; latest aa21b52)"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Map shading by registration margin: replace the largest-party shading (Unaffiliated is the largest group nearly everywhere) with a Democratic-minus-Republican margin in 5 steps (2026-10-09 evening, 8759191, legend labels aa21b52)"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Move the Terrier project to Documents\\Terrier and repoint the old paths, shortcut and source and walk-list folders (done 2026-10-09 evening; old Codex path kept as a junction)"
    status: "done"
    deadline: ""
    owner: "Paul Goff"
  - description: "Decide the People 'Political outlook' column (it skewed 'Somewhat conservative' with the vendor flags): Paul ruled 2026-10-09 late evening to collapse neighbouring flags at serve time (scoresdb.collapse_outlook, commit 40fa052, pushed and live); wording and CO-05 counts on the rulings note"
    status: "done"
    deadline: ""
    owner: "Paul Goff"
  - description: "First Colorado whole-precinct walk list after a server restart takes about 6 s (cold scores lookups): Paul accepted it as fine on 2026-10-09 late evening, no work planned; revisit walk_store._area if the walk build changes, since the combo table must hold the (ss, sh, precinct) of every person with a stop"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Removed the two stale git worktrees (the locked agent worktree .claude/worktrees/agent-a519024670b5cf945 and the cu-geography-v3-csv-guard worktree, branch claude/walk-list-csv-guards) with their branches, both fully merged and clean (2026-10-09 late evening); only the main checkout remains"
    status: "done"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Pushed: origin main and claude/walk-list fast-forwarded from 9854be4 to aa21b52 (the nine evening commits, 836e367 through aa21b52) on the late evening of 2026-10-09; the later commit 40fa052 followed, also fast-forwarded to both branches, and is live on all three servers (ls-remote showed origin main at 40fa052)"
    status: "done"
    deadline: ""
    owner: "Paul Goff"
focal_points:
  - "Paul Goff (vault owner)"
related_topics: []
related_actors: []
related_teams: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/terrier-multidistrict-lane-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\terrier-multidistrict-lane-2026-10-06.md", sha256: "bebd31824eaf01aaa7aa52d0657acc6354f575065238162e9755f0f9ee94847b"}
  - {url: "file:///C:/Users/pgoff/Documents/Terrier/outputs/cu-geography-v3/WALK_LIST_HANDOFF_2026-10-02.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Terrier\\outputs\\cu-geography-v3\\WALK_LIST_HANDOFF_2026-10-02.md", sha256: "b2831d1f72a975c0ea469fbcd319589ad82d4bfb38a43d5ef66b2f8e3194852b"}
  - {url: "file:///C:/Users/pgoff/Documents/Terrier/outputs/cu-geography-v3/TERRIER_HANDOFF_2026-10-01.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Terrier\\outputs\\cu-geography-v3\\TERRIER_HANDOFF_2026-10-01.md", sha256: "f74239bcca2e2c5c494f0320878cdbe19249e3e84cceb7f8ab0909dbf92a40b3"}
  - {url: "file:///C:/Users/pgoff/Documents/Terrier/outputs/cu-geography-v3/ACTUAL_DATA_HANDOFF_2026-10-01.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Terrier\\outputs\\cu-geography-v3\\ACTUAL_DATA_HANDOFF_2026-10-01.md", sha256: "a7eb4f4c12755a767f1f7e5346f85cd585f81a6a550cc527acdf92c078099383"}
  - {url: "file:///C:/Users/pgoff/Documents/Terrier/outputs/cu-geography-v3/DATA_AUDIT_2026-10-01.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Terrier\\outputs\\cu-geography-v3\\DATA_AUDIT_2026-10-01.md", sha256: "277a8f024691122e8f52eafd4df7e7ac0ca8b3115ad748b13a7a8c75334d3872"}
  - {url: "file:///C:/Users/pgoff/Documents/Terrier/outputs/cu-geography/CONVERSATION_REQUESTS.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Terrier\\outputs\\cu-geography\\CONVERSATION_REQUESTS.md", sha256: "e0ff37ee922a7456073e514bf21495b0fb9bf1b43b1c63e58b22d79bce1d4f4b"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# Terrier

> Terrier is the renamed CU Geography voter-canvass and walk-list app: a map, people, contact, criteria, source and walk-list workspace over a vendor voter file scored under Paul's four groups. Live for Colorado CD-05; being extended to Oregon OR-05 and Connecticut CT-01 as a flexible, config-first system.

## Parts

- [[2026-10-06-terrier-build-progress]] — The dated build record of the Terrier multi-district lane from 2026-10-07 to the evening of 2026-10-09: phases 0, 2 and 3, the nothing-withheld Colorado swap, the registration mix by party code, the Untapped map and one-click walk plan, the calibrated chance of voting, the evening's walk-list caps, generator and speed fixes, map shading and folder move, and the late-evening Political outlook collapse.

## Overview

- **What it is.** The project formerly called CU Geography ([[cu-geography]]; the old names "CU Geography" and "cu-geography" stay on that note, and search for them lands there first) was renamed **Terrier** (the app, desktop shortcut and window title). It is a Codex project, not part of Melange. The Luna RF/KNN data-completion model and the CU row framework that feed it are documented on [[cu-geography]]; this note owns the app, the multi-district expansion and the 2026-10-06 rulings.
- **Paths.**
  - Project folder `C:\Users\pgoff\Documents\Terrier` (moved there on the evening of 2026-10-09 from `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an`, which held only `outputs\` and `work\`). The old path is now a directory junction to the new one, so old absolute paths, git worktree links and Codex threads still resolve. Subfolders: `outputs\`, `work\` (Python venv at `work\.venv`, Census and other work files), `sources\` (the Oregon and Connecticut voter CSVs) and `walk-lists\` (walk-list outputs).
  - Terrier root (git, branch `claude/walk-list`; remote = the private GitHub repo `pjg93-222/Geo`; origin `main` and `claude/walk-list` are identical at `40fa052` (fast-forwarded from `9854be4` to `aa21b52`, then to `40fa052`, late on 2026-10-09; confirmed with `ls-remote`), local `claude/walk-list` is at the same commit, and the local `main` branch still sits at `8f50713`): `C:\Users\pgoff\Documents\Terrier\outputs\cu-geography-v3`. Earlier pushed states: `8f50713` on the evening of 2026-10-08, `6f56299` after the Untapped build and `0f89362` after the calibration and trimmed list on 2026-10-09, `aa21b52` after the evening work and `9854be4` just before its push.
  - Sibling Luna root, holding the locked Colorado RF/KNN code under `.local`: `C:\Users\pgoff\Documents\Terrier\outputs\cu-geography`. Paul's request log with every definition below: `outputs\cu-geography\CONVERSATION_REQUESTS.md` (R001 onward).
  - Colorado source file: `C:\Users\pgoff\Downloads\statara_co_cd005_20260904.csv` (dated 2026-09-04, SHA256 `4c48800b8c21870e6e2b6242810bbbe917d8169e529b440efb662f71c464239f`); it stayed in Downloads because the build tools hardcode that path, as did the Oregon and Connecticut zips. The extracted Oregon and Connecticut CSVs now live in `C:\Users\pgoff\Documents\Terrier\sources\`, and `Downloads\terrier-sources` is a junction to it (the build tools hardcode that path too).
  - Walk-list outputs (a Walk Lists folder, Walk Lists.zip, Walklist Streets.xlsx and three walk-list PDFs) moved from Downloads to `C:\Users\pgoff\Documents\Terrier\walk-lists\`.
  - Desktop shortcut: `C:\Users\pgoff\OneDrive\Desktop\Terrier.lnk` (repointed on 2026-10-09 to the new `Start-Terrier.ps1`); launchers `Start-Terrier.ps1`, `Stop-TerrierServer.ps1`, `Install-TerrierDesktop.ps1` in the Terrier root.
  - Server scripts (Terrier root): Colorado `Start-TerrierServer.ps1`, `Stop-TerrierServer.ps1` and the watchdog `Watch-TerrierServer.ps1`; Oregon and Connecticut `Start-DistrictServer.ps1`, `Stop-DistrictServer.ps1` and `Watch-DistrictServer.ps1` with `-District or-05|ct-01 -Port 8775|8777` (hidden start plus watchdog, copied from Colorado's scripts, commit `9854be4`; they refuse `co-05` and port 8767; readiness is `/api/v3/meta` within 180 s; logs, pid records and stop flags under `_build\district-<id>-*`, for example `_build\district-or-05-server.out.log`; the cookie prefixes are distinct: `or05_`, `ct01_`, `cu_terrier_`). The earlier windowless `_build\start_district.ps1` (commit `0718b91`) is retired (renamed `.old`).
  - **Colorado restart rule.** Restart Colorado with `Stop-TerrierServer.ps1` then `Start-Terrier.ps1 -NoBrowser` (it calls `Start-TerrierServer.ps1`, a hidden start with the Colorado environment and cookie prefix, and `Watch-TerrierServer.ps1` relaunches the server within 5 seconds unless the stop flag exists). Never start Colorado with `start_district.ps1` or the district scripts: the cookie prefix and the watchdog would race.
- **Stack.** Django served by Waitress on loopback port 8767 (`CU_DEMO=0`, health at `/_terrier/health`, mode `recorded`), supervised by `Watch-TerrierServer.ps1` (1 MB log cap); React + TypeScript + Vite frontend with MapLibre; SQLite stores under `.local` (`scores`, `contacts`, `street`, `roads`, `walk`, `accounts`); the Walk list tab uses its own Dijkstra routing over a noded TIGER street network, jsPDF for printing. Higgsfield supplied the logo and loading animation (Mentat palette: plum, ivory, gold, teal). The older apps on 8765 (live CU Geography) and 8766 (V3 preview) are separate and untouched; browser checks never run against 8767.
- **One server process per district (Paul, 2026-10-07).** Colorado stays on 8767, Oregon OR-05 runs on 8775 and Connecticut CT-01 on 8777; a district menu in the header jumps between them.
- **Eight tabs.** Map, People, Contact sheet, Criteria audit, Data & sources, Team & snapshots, Method and Walk list. The Walk list builds door-to-door lists from picked streets or an uploaded street CSV, orders doors by shortest walking path, prints a PDF in the owner's reference layout with a CSV twin, and saves results (Supporter, Undecided, Opposed, Not home, Moved) locally.
- **Data scale for Colorado CD-05** (aggregates only): 491,308 people and 343,000 scored households; contact records 359,486 email, 146,938 phone, 349,132 wireless and 65,987 with no channel; street coverage 436,057 registration people at 299,800 validated household locations; the walk store has 207,198 stops with 0 of 491,308 voters unplaced. Until Paul's swap at 19:16 on 2026-10-08 the live Colorado map withheld areas below 20 people or 10 households; since then nothing is withheld in any district and a small area carries a "Small area: N people" note instead (Paul's 2026-10-08 ruling). The release validates the faithful display of stored data, not the vendor's accuracy or the models' predictive accuracy.
- **Privacy rule for this vault.** Notes here hold aggregates and paths only: no voter rows, names, addresses, voter IDs or other row-level personal data. The app itself shows all data (O-9) and runs locally.

## Paul's definitions

From `CONVERSATION_REQUESTS.md` R006-R019 and later rulings (full scoring and group history is on [[cu-geography]]):

- **Overall standing** = 40% Credit Union Alignment + 35% Participation + 25% Sphere of Influence. Numeric partisan and support layers are kept in the overall score (O-11). Printed walk lists default to raw data with no scores.
- **Participation Index** = the ten `sai_*` scores (activist, digital reachability, EVAV, EVAV timing, local voter, midterm general, non-presidential primary, off-year general, presidential general, presidential primary turnout).
- **Overall standing with a candidate** (approved 2026-10-07; applies to OR-05 and CT-01): Credit Union Alignment (industry) 30 / candidate support 25 / participation 25 / sphere of influence 20. A district without a candidate (Colorado) keeps 40 / 35 / 25 unchanged, so Colorado stays byte-identical. The weights live in a versioned per-district copy of the row framework, not in the Terrier app.
- **Street-plan presets** (names O-6, formulas approved 2026-10-07; s = a person's support chance, p = their voting chance; each preset ranks streets by value per 100 m walked): "Mixed-support streets" = sum over people of (1 - |2s - 1|) x p; "Supporter turnout" = sum over people of s x (1 - p); "Voter identification" = count of people with no clear support signal.
- **Untapped potential** (Paul's rulings R1-R4 of 2026-10-08, spec approved 2026-10-09, live 2026-10-09 on OR-05 and CT-01; full wording and the reasons on [[2026-10-06-terrier-rulings]]). For each person not already knocked: persuade = (1 - |2s - 1|) x t, remind = s x (1 - t), potential = (wP x persuade + wR x remind) x (1 + wI x i), where s is candidate support on the absolute 0 to 1 scale (undecided 0.5), t is the chance of voting (mean of the five turnout-only participation scores / 100, not a percentile; from the afternoon of 2026-10-09 calibrated per district against people's own general-election record, ranking unchanged) and i is sphere-of-influence standing (0 to 1). Agent defaults, labelled as defaults in the app: wP = wR = 0.5, wI = 0.5, door target 60, 400 m fallback. It replaces the earlier "Needs a push" definition (which used the support and participation percentiles), so the street-plan preset, the People column, the profile and the printed column all use this one formula.
- **How to plan a walk with Untapped** (OR-05 and CT-01; Colorado has no candidate and shows the note "Untapped needs a candidate"). Open the Map, which opens on the Untapped layer; pick a precinct in the "Most untapped" list or on the map; click "Plan walk list"; the Walk tab builds the list at once. The "Doors" box sets the list size (1 to 1,000 since 2026-10-09 evening), and the one-click list stops at that number; the sliders set the balance between undecided voters and supporters and the influence weight. The earlier Street plan is still there, collapsed as "Adjust plan".
- **Sphere of Influence** = 45% giving, 45% volunteering, 10% household (ratified 2026-10-01).
- **Credit Union Alignment (CUA)** is inferred from exposure to the issues America's Credit Unions advocates on; partisan alignment is observed, not inferred. "Industries" means per-industry alignment like CUA (Paul confirmed 2026-10-06); only CUA exists today (O-12).
- **Political fields** stay categorical: registration, affiliation and outlook are shown separately, and conflicting or missing answers show as Multiple responses or Unknown, never as a middle position. The one exception: neighbouring vendor flags in the People Political outlook column collapse to the run's most extreme flag (Paul, late evening of 2026-10-09; runs spanning both sides of middle, or with gaps, stay Multiple responses; wording on [[2026-10-06-terrier-rulings]]).
- **Walk list defaults** (owner decisions): raw data only, shortest-path routing, no time estimates, Even and Odd printed separately.

## Imputation and the Luna model

"Imputation" here means filling the missing measured values, the blank `sci_*` fields (blank per field, median 13-16% in each district; no row is blank on every field), with the Luna stratified RF/KNN model. It has nothing to do with other industries (O-4). The Colorado Luna code under `outputs\cu-geography\.local` is **locked** (its stage lock hashes the code): it is copied into a versioned per-district stage that takes per-district values instead of Colorado's exact row count and file hash (O-7, Paul confirmed this reading). The locked original is never edited. Applying the model is not a 12-hour job; a run that long means something is wrong (O-8). Geo-audit gaps are imputed by the same model, with no "Not audited" label (O-5, confirmed). Model history, accuracy and exports: [[cu-geography]].

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none set |
| Progress | CO CD-05 live; OR-05 and CT-01 sources supplied and answered into a config-first design (2026-10-06); blueprint reviewed 2026-10-06 and its three open items approved 2026-10-07; Phase 0 (Colorado baseline gate), Phase 2 (multi-district foundation) and Phase 3 (per-district fill of the blank values) done 2026-10-07; Phase 3b (per-district score stores and area layers) built and smoke-checked for OR-05 and CT-01 on 2026-10-08, with nothing withheld in any district; Paul swapped the nothing-withheld Colorado data live at 19:16 on 2026-10-08 and all three servers (8767, 8775, 8777) were running by 19:30; the Untapped map and one-click walk plan were approved by Paul on 2026-10-09 and went live the same day on OR-05 and CT-01; the calibrated chance of voting and the trimmed one-click list followed on the afternoon of 2026-10-09; on the evening of 2026-10-09 the project moved to Documents\Terrier, the walk-list caps were lifted (one-click 1 to 1,000 doors), the one-click turf retries isolated seeds, walk requests were sped up and the map moved to Democratic-minus-Republican shading, with all three servers restarted from the new path (Terrier at `aa21b52`, pushed to origin); late that evening Paul ruled that the People Political outlook column collapses neighbouring vendor flags (`40fa052`, pushed and live on all three servers), accepted the slow first Colorado list after a restart, and the two stale worktrees were removed |

The dated build-progress sections (2026-10-07 through the late evening of 2026-10-09, newest last) are on [[2026-10-06-terrier-build-progress]]; the project-level facts, definitions, districts, action items and timeline stay on this note.

### Blueprint review 2026-10-06 (aggregates only)

The build blueprint (`cu-geography-v3\TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md`) was checked against the Terrier code (HEAD `8c7a817`), the Luna stages and the two source files before construction. No code was edited and nothing was run.

- **Corrected facts.** Two hard-code line numbers were wrong (the district-label check is `bundles.py:213`, the snapshot pattern `bundle_v4.py:24`), and about 25 more Colorado-specific code sites were listed. Colorado's current filled data is the section 30 export (household model, then a GPU step, then majority default; 86.8% on the reused test check), not the superseded household-copy stage. Blank `sci_*` values are per field, not whole rows: median blank rate 14.8% in OR-05, 13.0% in CT-01 and 16.2% in CO; no row is blank on every `sci_*` column, and 10 `sci_*` columns are empty in all three files. No 12-hour Luna run is recorded; the grid search took about 2.2 hours.
- **Verified.** Row counts (562,563 and 458,372), the identical 622-column header, the store names, the 311 Django and 151 frontend test counts, the 26 locked models and selections, and the TIGER origin of Colorado's street network.
- **Gaps closed in the plan.** The selection files do not hold the feature list, encoder, forest settings or partitions, so the per-district copy must rebuild the feature inputs; the overall score is computed in the row framework, which needs its own per-district copy; Connecticut block ids use the newer planning-region county codes; the walk network is projected in Colorado's map zone and needs a per-district zone; Oregon votes are coded as ordinary ballots rather than mail, so the mail rule must be per state; a Colorado baseline of API responses and store contents is captured before any change and gates every phase.
- **Open for Paul (all three answered 2026-10-07, see the next section).** Approve the proposed weights and street-plan formulas; allow the 2025 edition of the Census block file plus district boundary files; agree to skip the GPU fill step for the new districts.

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

### Approvals and build status 2026-10-07

Paul answered the three open items and one more request on 2026-10-07 (full wording and the plan itself: [[2026-10-06-terrier-blueprint]]; his answers as rulings: [[2026-10-06-terrier-rulings]]).

- **Weights approved.** With a candidate: industry 30, candidate support 25, participation 25, sphere of influence 20. Without a candidate (Colorado): 40 / 35 / 25 unchanged.
- **Street-plan formulas approved**, with one change: "Mixed-support streets" gained the voting-chance factor (see Paul's definitions above). "Supporter turnout" and "Voter identification" are as proposed.
- **Census approved.** The TIGER 2025 edition of the block file plus the district boundary files for Oregon and Connecticut, from census.gov only. Finding: the 2025 block file still uses Connecticut's old county codes (09001-09015), while the voter file and the road files use the planning-region codes (09110-09190); blocks are re-coded by location during the build.
- **Colorado's GPU fill step is skipped** for Oregon and Connecticut (needs a new package and a GPU; no pod under O-9).
- **Parallel build lanes** use Claude Code's built-in background agents, one worktree per lane; the agent-manager skill and DevFleet are not used.
- **Python environment rebuild approved** and running.
- **Folder request.** Paul asked for a separate top-level `terrier/` folder in this vault, apart from the Mentat and Melange notes, holding every Terrier note; this note, the rulings and the blueprint note live there.
- **Build status at the time of these approvals (earlier on 2026-10-07; superseded by the first Build progress section on [[2026-10-06-terrier-build-progress]]).** Phase 0 (Colorado baseline) and Phase 1 (sources census) were running; Census TIGER 2025 downloads were done (14 files, 255,206,750 bytes, census.gov only; manifest `work\geography\DOWNLOADS_2026-10-07.json`, which later grew to 20 files, 280,939,810 bytes, with the extra downloads Paul approved); the Python environment rebuild was running; no per-district code was built yet.

### Districts

| District | Candidate | Source | Rows | State |
|---|---|---|---|---|
| CO CD-05 | (existing Colorado config) | `statara_co_cd005_20260904.csv` | 491,308 | live on 8767; nothing withheld since the swap at 19:16 on 2026-10-08; no candidate, so no Untapped layer (server not restarted for Untapped; it shows the one-line note "Untapped needs a candidate" on its next page load); restarted from `Documents\Terrier` on the new code on the evening of 2026-10-09 |
| OR-05 | Janelle Bynum | `Downloads\Janelle Bynum (OR-05).zip` | 562,563 | stores built (386,030 mapped households, 245 precincts, 68 cities) and blanks filled; score store, area layers and density built 2026-10-08 and smoke-checked; live on 8775 since the evening of 2026-10-08; Untapped map and Plan walk list live since 2026-10-09; hidden start with a watchdog since 15:40 on 2026-10-09 and restarted from the new path that evening; Oregon is all vote-by-mail |
| CT-01 | Luke Bronin | `Downloads\Luke Bronin (CT-01).zip` | 458,372 | stores built (287,033 households, 134 precincts, 27 towns) and blanks filled; score store, area layers and density built 2026-10-08 and smoke-checked; live on 8777 since the evening of 2026-10-08 (density gap fixed, `09d49be`); Untapped map and Plan walk list live since 2026-10-09; hidden start with a watchdog since 15:40 on 2026-10-09 and restarted from the new path that evening; primary/general mode is a per-district toggle, never hard-coded |

Both new files use the same 622-column statara schema as Colorado. Extracted copies are in `Documents\Terrier\sources\` (`statara_or_cd005_20260904.csv`, `statara_ct_cd001_20260904.csv`; moved there on the evening of 2026-10-09, and `Downloads\terrier-sources\` is a junction to it). Phase 3b (score stores and area layers) is built for both and both servers are live; the remaining Phase 4 features are listed in the action items.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Extract the OR-05 and CT-01 zips to Downloads\terrier-sources\ (O-13; the CSVs moved to Documents\Terrier\sources\ on 2026-10-09, with a junction left behind) | done | | Terrier build lane |
| Config-first districts, industries, candidates, layer combinations and ROI weights; Colorado byte-identical by default (district config done; the rest is Phase 4) | in-progress | | Terrier build lane |
| Versioned per-district copy of the Luna model; fill blank sci_* values (Phase 3, bbebf92) | done | | Terrier build lane |
| Real Oregon and Connecticut mail-ballot and absentee vote codes (O-3) | done | | Terrier build lane |
| Per-district primary/general race-mode toggle (Phase 4) | todo | | Terrier build lane |
| Optional scores toggle on the printed walk list, default raw (the Print scores box, `2419afc`) | done | | Terrier build lane |
| Show every party code as itself (done: walk overview `11e3fd5`, side panel Registration mix `85b5656`); impute missing geo-audit values (O-5) and party W neutral lean (still to confirm) | in-progress | | Terrier build lane |
| Phase 3b: per-district score stores and area layers (built and smoke-checked 2026-10-08) | done | | Terrier build lane |
| Swap the staged nothing-withheld Colorado data live on 8767, then start the Oregon and Connecticut servers (done by Paul at 19:16 on 2026-10-08; all three running by 19:30) | done | | Paul Goff |
| Phase 4 features: candidate support, density, overlay modes and the street planner with Print scores are built and live for OR-05 and CT-01; industries as configuration remain | in-progress | | Terrier build lane |
| Untapped map layer and one-click Plan walk list (Paul's rulings R1-R4, spec approved 2026-10-09); live 2026-10-09 on OR-05 and CT-01, `6f56299` (where to click: Paul's definitions) | done | | Terrier build lane |
| Approve the primary-mode specification for candidate support (choice of Default, A, B or C; unaffiliated voters per state) | todo | | Paul Goff |
| Two Untapped questions, Paul: "1. Yes 2. Yes" (2026-10-09): calibrate t per district against people's own general-election record (ranking unchanged); trim the one-click list to the door count; live that afternoon, `0f89362` | done | | Paul Goff |
| Define further industries beyond CUA (O-12) | todo | | Paul Goff |
| Uncertainty ranges on imputed values (O-4b, unanswered, default off) | todo | | Paul Goff |
| Walk-list generator fixes (2026-10-09 evening): door and voter limits lifted (one-click 1 to 1,000 doors, other lists up to 10,000 voters), 5-seed turf retry, area-index speed fix; `836e367` to `aa21b52` | done | | Terrier build lane |
| Map shaded by Democratic-minus-Republican registration margin instead of largest party (`8759191`, legend `aa21b52`) | done | | Terrier build lane |
| Move the project to Documents\Terrier and repoint paths, shortcut, sources and walk-list folders (old path kept as a junction) | done | | Paul Goff |
| Decide the People Political outlook column: Paul ruled 2026-10-09 late evening to collapse neighbouring vendor flags at serve time (`40fa052`, pushed and live; CO-05 Multiple responses 74,822 to 2,522) | done | | Paul Goff |
| First Colorado whole-precinct list after a restart takes about 6 s (cold scores lookups): accepted as fine by Paul, no work planned | done | | Terrier build lane |
| Removed the two stale git worktrees (the locked agent worktree and `cu-geography-v3-csv-guard`) with their branches, both merged and clean; only the main checkout remains | done | | Terrier build lane |
| Pushed the nine evening commits: origin `main` and `claude/walk-list` fast-forwarded `9854be4` to `aa21b52`, then to `40fa052` (live on all three servers) | done | | Paul Goff |

> Action items are defined in the frontmatter (`action_items` field) to enable Dataview queries. The table above is a visualization for readability.

**Dataview query — pending items for this project:**

```dataview
TABLE WITHOUT ID
  item.description AS "Item",
  item.status AS "Status",
  item.deadline AS "Deadline",
  item.owner AS "Owner"
FROM "terrier"
WHERE file.name = this.file.name
FLATTEN action_items AS item
WHERE item.status != "done"
SORT item.deadline ASC
```

## Blockers

- None recorded. Open items needing Paul are listed in the action items above (further industries, uncertainty ranges); he rejected jargon-heavy open items (O-7, O-10, O-12), so each is explained in plain words.
- Hazards from the handoffs: never run tests against port 8767; never take full memory dumps of the Python processes (the heap holds voter names and phones; mini dumps only); keep `.local\.walk-salt`, which keys saved results across rebuilds; the agent-created worktrees use a `node_modules` junction that must be removed before the worktree is; the Oregon and Connecticut servers used to be hosted in Windows Terminal (closing it stopped both) but since 2026-10-09 start hidden under watchdogs; restart Colorado only with `Stop-TerrierServer.ps1` then `Start-Terrier.ps1 -NoBrowser`, and Oregon and Connecticut only with the `-DistrictServer.ps1` scripts; the old Codex folder path is a junction, so do not delete it.

## Key facts

- **Rulings and answers of 2026-10-06** (FLEXIBLE config-first, vault-only brain, per-district race-mode toggle, and O-1..O-13): [[2026-10-06-terrier-rulings]]. They govern how everything below is built: configuration and toggles over hard-coding, with Colorado CD-05 outputs unchanged by default.
- **Where the Terrier brain lives.** Paul ruled on 2026-10-06 that the Terrier brain is subordinate to and subsumed by this vault: vault-native notes (this project note plus the rulings discussion), not a separate Project Brain, and no brainlink configuration for it. Terrier is outside the Melange brain, which holds only the Luna dead end DE-047. On 2026-10-07 Paul asked for the Terrier notes to sit in their own top-level `terrier/` folder, separate from Mentat and Melange and still inside this one vault; the folder holds this note, the rulings and the blueprint note.
- **Data policy.** O-9: never strip personal data; all data always shown; run on the full data locally; no de-identified Runpod run for this lane. This supersedes, for this lane, the earlier "pod only, de-identified" rule (see the runpod-pod note).
- **Paul's later rulings of 2026-10-07** (full wording on [[2026-10-06-terrier-rulings]]): one server process per district (CO 8767, OR 8775, CT 8777); walk-list "Abs" wording per state (Oregon: mail ballots, every recorded vote counts; Connecticut: absentee or mail ballots, codes A or M); extra census.gov downloads (state legislative district boundaries and ZIP-code areas for Oregon and Connecticut); the same model types and frozen settings trained on each district's own voters, never Colorado-fitted models; no stress tests on the laptop; blanket permission to keep going overnight, with the changes recorded in `OVERNIGHT_CHANGES_2026-10-07.md` in the Terrier root.
- **Paul's rulings of 2026-10-08/09** (full wording on [[2026-10-06-terrier-rulings]]): nothing is ever withheld in any district; canvass the people who need a reminder or push, which the Untapped potential formula now defines; the registration mix shows every party code; the repo is the private GitHub repo `pjg93-222/Geo`; lanes work in parallel without waiting; never stress-test the laptop; and the Untapped map and one-click walk plan (R1-R4); on 2026-10-09 he answered yes to calibrating the chance of voting per district and to trimming the one-click list to the door count.
- **Paul's rulings of the evening of 2026-10-09** (full wording on [[2026-10-06-terrier-rulings]]): one-click walk lists are capped at about 1,000 houses (one-click only; whole-precinct and street-pick lists have a separate 10,000-voter size ceiling); the Terrier project folder is `C:\Users\pgoff\Documents\Terrier`.
- **Paul's rulings of the late evening of 2026-10-09** (full wording and the CO-05 counts on [[2026-10-06-terrier-rulings]]): the People Political outlook column collapses neighbouring vendor flags (computed at serve time, `40fa052`, no store change); the slow first Colorado list after a restart is accepted as fine.
- **Server operations.** Colorado, Oregon and Connecticut all run hidden under watchdogs; the restart commands are under Paths. The slow first Colorado whole-precinct list after a restart (about 6 s, cold scores lookups) is accepted as fine; no work is planned.
- **Colorado history.** Synthetic preview (109,150 dummy people) replaced by actual data on 2026-10-01 (branch `codex/terrier-actual-data`); the walk-list feature, refused-mark persistence, deterministic and faster routing and the supervised live server followed through 2026-10-04. Test counts at the last recorded run (2026-10-04, `0c484fb`): 151 frontend unit tests, 311 Django tests, 121 walk tests, all passing.

## Timeline

| Date | Event |
|---|---|
| 2026-09-28 | Paul's definitions given in the CU Geography thread (R006-R019): Participation, Sphere of Influence, CUA, partisan fields |
| 2026-10-01 | Renamed Terrier; Higgsfield identity and loader; actual Colorado data connected (491,308 people); desktop app installed |
| 2026-10-02 | Walk list tab built (rush deliverable for Colorado streets) |
| 2026-10-04 | Live server restarted at 16:38 with deterministic, faster routing and refused-mark persistence |
| 2026-10-06 | Multi-district lane: OR-05 and CT-01 sources supplied; Paul answered O-1..O-13 and made three rulings; Terrier brain set as vault notes only |
| 2026-10-06 | Build blueprint reviewed before construction: facts corrected, plan gaps closed, three items sent to Paul |
| 2026-10-07 | Paul approved the weights, the street-plan formulas (one change), the 2025 Census files, skipping the GPU fill step and the Python environment rebuild; Census downloads done; Phase 0 and Phase 1 running; notes moved into the `terrier/` folder |
| 2026-10-07 | Phase 0 Colorado baseline gate committed (`609385d`; 6 stores, 7,190,676 rows, 43 API answers) |
| 2026-10-07 | Paul ruled: one server per district (8767, 8775, 8777), walk-list Abs wording, extra census.gov downloads, the per-district model rule, no laptop stress tests, overnight blanket permission |
| 2026-10-07 | Phase 2 done and merged on `claude/walk-list`: OR-05 and CT-01 stores built, header district menu, Colorado gate passed |
| 2026-10-07 | Phase 3 done (`bbebf92`): blank values filled per district, OR-05 86.64% and CT-01 87.39% right on frozen holdouts; lead's Phase 3b rulings recorded |
| 2026-10-08 | Paul ruled nothing is ever withheld (all districts, Colorado included) and set "Needs a push" as the default street plan; code pushed to the private GitHub repo `pjg93-222/Geo` |
| 2026-10-08 | Phase 3b built for OR-05 and CT-01 and smoke-checked; nothing-withheld Colorado data staged and gate passed (`d95f9f4`) |
| 2026-10-08 | Evening: Paul swapped the nothing-withheld Colorado data live (19:16); build complete at 19:30 with Colorado 8767, OR-05 8775 and CT-01 8777 running; registration mix by party code (`85b5656`), Connecticut density gap fixed (`09d49be`), server crash fix (`8f50713`) |
| 2026-10-09 | Paul approved the spec for the Untapped map layer and one-click Plan walk list (rulings R1-R4); it replaces "Needs a push" with one potential formula (build started) |
| 2026-10-09 | Untapped map layer and one-click Plan walk list live on OR-05 (8775) and CT-01 (8777), Terrier repo at `6f56299`; Colorado (8767) not restarted, its output byte-identical; two Untapped questions raised for Paul |
| 2026-10-09 | Afternoon: Paul answered yes to both Untapped questions ("1. Yes 2. Yes"); calibrated chance of voting and trimmed one-click list live on OR-05 (8775) and CT-01 (8777), Terrier repo at `0f89362`; Colorado (8767) untouched |
| 2026-10-09 | Windowless restart of OR-05 and CT-01 at 14:01 (`0718b91`); at 15:40 Paul approved watchdogs for both, repo-root `Start-/Watch-/Stop-DistrictServer.ps1` (`9854be4`, pushed) |
| 2026-10-09 | Evening: project folder moved to `Documents\Terrier` (old Codex path kept as a junction); sources and walk-list outputs moved with it; shortcut repointed |
| 2026-10-09 | Evening: walk-list caps lifted (one-click 1 to 1,000 doors by Paul's ruling; other lists up to 10,000 voters), one-click turf retries up to 5 seeds, walk requests sped up (area-index fix), map shaded by D-minus-R margin; all three servers restarted from the new path; Terrier at `aa21b52`, 9 commits ahead of the pushed `9854be4` |
| 2026-10-09 | Late evening: Paul ruled that the People Political outlook column collapses neighbouring vendor flags (`40fa052`, CO-05 Multiple responses 74,822 to 2,522) and accepted the slow first Colorado list; origin `main` and `claude/walk-list` fast-forwarded `9854be4` to `aa21b52`, then to `40fa052`; all three servers restarted on it and the live Colorado People API matches; the two stale worktrees removed |

## Focal Points

| Person | Role |
|---|---|
| Paul Goff | Vault owner; owner and sole decision-maker for Terrier; defines the scoring groups and industries. |

## Map

Every note of this project by type, one line each. All of them sit in the `terrier/` folder.

### Related Topics

| Topic | Relation |
|---|---|
| [[2026-10-06-terrier-blueprint]] | The multi-district build blueprint: phases 0-6, the 2026-10-06 review's corrections, Paul's 2026-10-07 answers, the build status and the sources and inputs by path. |
| [[2026-10-06-terrier-build-progress]] | part: The dated build record of the Terrier lane, 2026-10-07 to the evening of 2026-10-09: phases, swaps, Untapped, calibration, walk-list caps and folder move |

### Discussions

| Discussion | Relation |
|---|---|
| [[2026-10-06-terrier-rulings]] | Paul's three rulings of 2026-10-06 (FLEXIBLE config-first, vault-only brain, per-district primary/general toggle), his O-1..O-13 answers, and his rulings of 2026-10-08/09 (nothing withheld, Needs a push, the Untapped map and one-click walk plan), then the lead's 2026-10-09 defaults, the two Untapped questions Paul answered yes to that afternoon, and how the chance of voting is calibrated. |

### Related Projects

- [[cu-geography]] — the project Terrier was renamed from: the Luna RF/KNN completion model (closed 2026-09-30) and the CU row framework that feed the app.

## Research evidence

The literature behind this system lives in the research vault: [[research-vault]]. Evidence hubs: [terrier-row-scoring](obsidian://open?vault=research&file=systems%2Fterrier-row-scoring) · [terrier-imputation](obsidian://open?vault=research&file=systems%2Fterrier-imputation) · [terrier-canvass](obsidian://open?vault=research&file=systems%2Fterrier-canvass).
