---
type: project
name: "Terrier"
aliases: ["Terrier", "Terrier app", "cu-geography-v3", "Terrier voter canvass app"]
description: "Terrier: the renamed CU Geography voter-canvass and walk-list app (Codex project, not Melange; root outputs\\cu-geography-v3, Django/Waitress on 8767 plus React/MapLibre). Live for Colorado CD-05 (491,308 people, 343,000 households); 2026-10-06 lane adds Oregon OR-05 and Connecticut CT-01 under Paul's FLEXIBLE config-first ruling, with every data field shown and runs local. The Terrier brain exists only as vault notes (this note and its rulings discussion), not as a separate Project Brain."
status: "active"
deadline: ""
progress: "As of 2026-10-07: CO CD-05 live on 8767 (8 tabs including Walk list; live server restarted 2026-10-04 16:38). Multi-district lane started 2026-10-06: OR-05 (562,563 rows) and CT-01 (458,372 rows) source zips supplied and extracted, same 622-column vendor schema as Colorado; Paul answered the open-decision list O-1..O-13 and made three rulings (FLEXIBLE config-first, vault-only brain, per-district primary/general toggle), then approved the weights, street-plan formulas, 2025 Census files and skipping the GPU fill step on 2026-10-07. Build so far: Phase 0 (Colorado baseline gate, committed 609385d) DONE; Phase 2 (multi-district foundation: config, walk builder, one server process per district, geography tools, header district menu) DONE and merged on claude/walk-list, with the Colorado gate still passing after the builds; Phase 3 (filling the blank sci_* values per district with models trained on each district's own voters) DONE, committed bbebf92, scored once on frozen holdouts (OR-05 86.64% right against 77.89% for always guessing the most common answer; CT-01 87.39% against 77.91%). Next: Phase 3b (per-district score stores and area layers), then the Phase 4 features. Paul also ruled later on 2026-10-07 (one server per district, walk-list Abs wording, extra census.gov downloads, the model ruling, no stress tests on the laptop, overnight blanket permission); the lead made three Phase 3b rulings."
blockers: []
action_items:
  - description: "Extract the OR-05 and CT-01 zips to Downloads\\terrier-sources\\ (O-13, Paul said yes)"
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
  - description: "Add the per-district primary/general race-mode toggle; the support model switches with it and primary is never hidden; never hard-code the CT-01 candidate's race status (Phase 4)"
    status: "todo"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Add an optional scores toggle on the printed walk list, defaulting to raw (Phase 4 walk-list fields)"
    status: "todo"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Show every party code as itself instead of lumping Working Families (W) into other (O-10), and impute the missing geo-audit values with the model instead of a Not audited label (O-5); the lead's Phase 3b ruling gives party W a neutral lean like other minor parties"
    status: "todo"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Phase 3b: per-district score stores and area layers (Oregon and Connecticut are ready in the header district menu)"
    status: "todo"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Phase 4 features: industries as configuration, candidate support with the primary/general toggle, density, map overlays, the street ROI planner and the walk-list fields"
    status: "todo"
    deadline: ""
    owner: "Terrier build lane (Opus designs, Sonnet builds)"
  - description: "Approve the primary-mode specification for candidate support before it is built"
    status: "todo"
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
focal_points:
  - "Paul Goff (vault owner)"
related_topics: []
related_actors: []
related_teams: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/terrier-multidistrict-lane-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\terrier-multidistrict-lane-2026-10-06.md", sha256: "00ffe9920478cec27bfc89990e21ca1652efb94157eb39a7db808f820057116f"}
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/outputs/cu-geography-v3/WALK_LIST_HANDOFF_2026-10-02.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\outputs\\cu-geography-v3\\WALK_LIST_HANDOFF_2026-10-02.md", sha256: "b2831d1f72a975c0ea469fbcd319589ad82d4bfb38a43d5ef66b2f8e3194852b"}
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/outputs/cu-geography-v3/TERRIER_HANDOFF_2026-10-01.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\outputs\\cu-geography-v3\\TERRIER_HANDOFF_2026-10-01.md", sha256: "f74239bcca2e2c5c494f0320878cdbe19249e3e84cceb7f8ab0909dbf92a40b3"}
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/outputs/cu-geography-v3/ACTUAL_DATA_HANDOFF_2026-10-01.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\outputs\\cu-geography-v3\\ACTUAL_DATA_HANDOFF_2026-10-01.md", sha256: "a7eb4f4c12755a767f1f7e5346f85cd585f81a6a550cc527acdf92c078099383"}
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/outputs/cu-geography-v3/DATA_AUDIT_2026-10-01.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\outputs\\cu-geography-v3\\DATA_AUDIT_2026-10-01.md", sha256: "277a8f024691122e8f52eafd4df7e7ac0ca8b3115ad748b13a7a8c75334d3872"}
  - {url: "file:///C:/Users/pgoff/Documents/Codex/2026-09-27/we-are-going-to-have-an/outputs/cu-geography/CONVERSATION_REQUESTS.md", type: "markdown", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\Documents\\Codex\\2026-09-27\\we-are-going-to-have-an\\outputs\\cu-geography\\CONVERSATION_REQUESTS.md", sha256: "e0ff37ee922a7456073e514bf21495b0fb9bf1b43b1c63e58b22d79bce1d4f4b"}
updated_at: 2026-10-07
updated_by: "preserve@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# Terrier

> Terrier is the renamed CU Geography voter-canvass and walk-list app: a map, people, contact, criteria, source and walk-list workspace over a vendor voter file scored under Paul's four groups. Live for Colorado CD-05; being extended to Oregon OR-05 and Connecticut CT-01 as a flexible, config-first system.

## Overview

- **What it is.** The project formerly called CU Geography ([[cu-geography]]; the old names "CU Geography" and "cu-geography" stay on that note, and search for them lands there first) was renamed **Terrier** (the app, desktop shortcut and window title). It is a Codex project, not part of Melange. The Luna RF/KNN data-completion model and the CU row framework that feed it are documented on [[cu-geography]]; this note owns the app, the multi-district expansion and the 2026-10-06 rulings.
- **Paths.**
  - Terrier root (git, branch `claude/walk-list`, `main` fast-forwarded to it, no remote, nothing pushed): `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs\cu-geography-v3`.
  - Sibling Luna root, holding the locked Colorado RF/KNN code under `.local`: `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs\cu-geography`. Paul's request log with every definition below: `outputs\cu-geography\CONVERSATION_REQUESTS.md` (R001 onward).
  - Colorado source file: `C:\Users\pgoff\Downloads\<CO-05 vendor file>.csv` (dated 2026-09-04; file name and hash in the private notes).
  - Desktop shortcut: `C:\Users\pgoff\OneDrive\Desktop\Terrier.lnk`; launchers `Start-Terrier.ps1`, `Stop-TerrierServer.ps1`, `Install-TerrierDesktop.ps1` in the Terrier root.
- **Stack.** Django served by Waitress on loopback port 8767 (`CU_DEMO=0`, health at `/_terrier/health`, mode `recorded`), supervised by `Watch-TerrierServer.ps1` (1 MB log cap); React + TypeScript + Vite frontend with MapLibre; SQLite stores under `.local` (`scores`, `contacts`, `street`, `roads`, `walk`, `accounts`); the Walk list tab uses its own Dijkstra routing over a noded TIGER street network, jsPDF for printing. Higgsfield supplied the logo and loading animation (Mentat palette: plum, ivory, gold, teal). The older apps on 8765 (live CU Geography) and 8766 (V3 preview) are separate and untouched; browser checks never run against 8767.
- **One server process per district (Paul, 2026-10-07).** Colorado stays on 8767, Oregon OR-05 runs on 8775 and Connecticut CT-01 on 8777; a district menu in the header jumps between them.
- **Eight tabs.** Map, People, Contact sheet, Criteria audit, Data & sources, Team & snapshots, Method and Walk list. The Walk list builds door-to-door lists from picked streets or an uploaded street CSV, orders doors by shortest walking path, prints a PDF in the owner's reference layout with a CSV twin, and saves results (Supporter, Undecided, Opposed, Not home, Moved) locally.
- **Data scale for Colorado CD-05** (aggregates only): 491,308 people and 343,000 scored households; contact-channel counts are in the private notes; street coverage 436,057 registration people at 299,800 validated household locations; the walk store has 207,198 stops with 0 of 491,308 voters unplaced. Map areas withhold below 20 people or 10 households. The release validates the faithful display of stored data, not the vendor's accuracy or the models' predictive accuracy.
- **Privacy rule for this vault.** Notes here hold aggregates and paths only: no voter rows, names, addresses, voter IDs or other row-level personal data. The app itself shows all data (O-9) and runs locally.

## Paul's definitions

From `CONVERSATION_REQUESTS.md` R006-R019 and later rulings (full scoring and group history is on [[cu-geography]]):

- **Overall standing** = 40% Credit Union Alignment + 35% Participation + 25% Sphere of Influence. Numeric partisan and support layers are kept in the overall score (O-11). Printed walk lists default to raw data with no scores.
- **Participation Index** = the ten `sai_*` scores (activist, digital reachability, EVAV, EVAV timing, local voter, midterm general, non-presidential primary, off-year general, presidential general, presidential primary turnout).
- **Overall standing with a candidate** (approved 2026-10-07; applies to OR-05 and CT-01): Credit Union Alignment (industry) 30 / candidate support 25 / participation 25 / sphere of influence 20. A district without a candidate (Colorado) keeps 40 / 35 / 25 unchanged, so Colorado stays byte-identical. The weights live in a versioned per-district copy of the row framework, not in the Terrier app.
- **Street-plan presets** (names O-6, formulas approved 2026-10-07; s = a person's support chance, p = their voting chance; each preset ranks streets by value per 100 m walked): "Mixed-support streets" = sum over people of (1 - |2s - 1|) x p; "Supporter turnout" = sum over people of s x (1 - p); "Voter identification" = count of people with no clear support signal.
- **Sphere of Influence** = 45% giving, 45% volunteering, 10% household (ratified 2026-10-01).
- **Credit Union Alignment (CUA)** is inferred from exposure to the issues America's Credit Unions advocates on; partisan alignment is observed, not inferred. "Industries" means per-industry alignment like CUA (Paul confirmed 2026-10-06); only CUA exists today (O-12).
- **Political fields** stay categorical: registration, affiliation and outlook are shown separately, and conflicting or missing answers show as Multiple responses or Unknown, never as a middle position.
- **Walk list defaults** (owner decisions): raw data only, shortest-path routing, no time estimates, Even and Odd printed separately.

## Imputation and the Luna model

"Imputation" here means filling the missing measured values, the blank `sci_*` fields (blank per field, median 13-16% in each district; no row is blank on every field), with the Luna stratified RF/KNN model. It has nothing to do with other industries (O-4). The Colorado Luna code under `outputs\cu-geography\.local` is **locked** (its stage lock hashes the code): it is copied into a versioned per-district stage that takes per-district values instead of Colorado's exact row count and file hash (O-7, Paul confirmed this reading). The locked original is never edited. Applying the model is not a 12-hour job; a run that long means something is wrong (O-8). Geo-audit gaps are imputed by the same model, with no "Not audited" label (O-5, confirmed). Model history, accuracy and exports: [[cu-geography]].

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none set |
| Progress | CO CD-05 live; OR-05 and CT-01 sources supplied and answered into a config-first design (2026-10-06); blueprint reviewed 2026-10-06 and its three open items approved 2026-10-07; Phase 0 (Colorado baseline gate), Phase 2 (multi-district foundation) and Phase 3 (per-district fill of the blank values) done 2026-10-07; next Phase 3b, then the Phase 4 features |

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
- **Build status at the time of these approvals (earlier on 2026-10-07; superseded by the next section).** Phase 0 (Colorado baseline) and Phase 1 (sources census) were running; Census TIGER 2025 downloads were done (14 files, 255,206,750 bytes, census.gov only; manifest `work\geography\DOWNLOADS_2026-10-07.json`, which later grew to 20 files, 280,939,810 bytes, with the extra downloads Paul approved); the Python environment rebuild was running; no per-district code was built yet.

### Build progress 2026-10-07 (later; aggregates only)

All paths below are in the Terrier root unless noted. Phases 0, 2 and 3 are done; phase names follow [[2026-10-06-terrier-blueprint]].

- **Phase 0, Colorado baseline gate: done.** Committed `609385d` (`tools\co_baseline.py` plus its fixture under `tests\fixtures`). The baseline holds 6 Colorado stores (7,190,676 rows in all) and 43 API answers. Every later build step is checked against it.
- **Phase 2, multi-district foundation: done and merged on `claude/walk-list`.** Commits: `f4ebbe9` district config, `5684315` party check, `5ee9234` walk builder, `b9df41d` server, `866b724` geography tools, `3eddcae` header district menu.
  - OR-05 stores: 562,563 voters, 386,030 mapped households, 245 precincts, 68 cities. Every recorded Oregon vote is counted as a mail ballot (Oregon votes by mail).
  - CT-01 stores: 458,372 voters, 287,033 households, 134 precincts, 27 towns. The 2024 mail share is 7.8%.
  - The test-server check passed 15 of 15 for each district. The Colorado gate passed after the builds: the stores and the API answers are identical to the baseline.
- **Phase 3, filling the blank `sci_*` values per district: done.** Committed `bbebf92` (and `f59290e`, the log). The same RF/KNN model types and frozen settings were trained on each district's own voters; no Colorado-trained model is used for Oregon or Connecticut (Paul's model ruling, see [[2026-10-06-terrier-rulings]]). Each district was scored once on a frozen holdout (known values hidden, then filled by the model):

  | District | Filled right | Always guessing the most common answer | Gain | Expected on the real blanks | AUC range across fields |
  |---|---|---|---|---|---|
  | OR-05 | 86.64% | 77.89% | +8.75 points | 82.85% | 0.57 to 0.94 |
  | CT-01 | 87.39% | 77.91% | +9.48 points | 83.14% | 0.57 to 0.95 |

  Colorado, before its GPU step, scored 86.67%. Six fields show no real lift over the file default and are labelled as the file default, the same treatment Colorado has. AUC runs from 0.5 (a coin flip) to 1.0 (perfect). Reports: `.local\<district>\luna-v1\REPORT.md`.
- **Incidents (both worked around).** A Python 3.12 crash with exit code 0xC000070A (a Windows system-information, WMI, query timing out under heavy load). The laptop went to sleep when the lid was closed and froze a long step; the step timeouts now count awake time only.
- **Overnight change record.** Every change made under Paul's overnight permission is logged in plain English in `OVERNIGHT_CHANGES_2026-10-07.md` in the Terrier root.
- **Next.** Phase 3b (per-district score stores and area layers; Oregon and Connecticut are ready in the header menu), then the Phase 4 features: industries, candidate support with the primary/general toggle (Paul approves the primary-mode spec first), density, map overlays, the street ROI planner and the walk-list fields.
- **Lead's Phase 3b rulings** (the coordinating session's, not Paul's; wording on [[2026-10-06-terrier-rulings]]): an interim overall score is published and labelled; voters without registration geography get a residence block marked as estimated; party W (Working Families) gets a neutral lean like the other minor parties.

### Districts

| District | Candidate | Source | Rows | State |
|---|---|---|---|---|
| CO CD-05 | (existing Colorado config) | `<CO-05 vendor file>.csv` | 491,308 | live on 8767 |
| OR-05 | (in the private notes) | `Downloads\<OR-05 source zip>.zip` | 562,563 | stores built (386,030 mapped households, 245 precincts, 68 cities) and blanks filled; server port 8775 assigned; Oregon is all vote-by-mail |
| CT-01 | (in the private notes) | `Downloads\<CT-01 source zip>.zip` | 458,372 | stores built (287,033 households, 134 precincts, 27 towns) and blanks filled; server port 8777 assigned; primary/general mode is a per-district toggle, never hard-coded |

Both new files use the same 622-column vendor schema as Colorado. Extracted copies are in `Downloads\terrier-sources\` (`<OR-05 vendor file>.csv`, `<CT-01 vendor file>.csv`). Per-district score stores and area layers (Phase 3b) and the Phase 4 features are still to come.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Extract the OR-05 and CT-01 zips to Downloads\terrier-sources\ (O-13) | done | | Terrier build lane |
| Config-first districts, industries, candidates, layer combinations and ROI weights; Colorado byte-identical by default (district config done; the rest is Phase 4) | in-progress | | Terrier build lane |
| Versioned per-district copy of the Luna model; fill blank sci_* values (Phase 3, bbebf92) | done | | Terrier build lane |
| Real Oregon and Connecticut mail-ballot and absentee vote codes (O-3) | done | | Terrier build lane |
| Per-district primary/general race-mode toggle (Phase 4) | todo | | Terrier build lane |
| Optional scores toggle on the printed walk list, default raw (Phase 4) | todo | | Terrier build lane |
| Show every party code as itself; impute missing geo-audit values (O-10, O-5) | todo | | Terrier build lane |
| Phase 3b: per-district score stores and area layers | todo | | Terrier build lane |
| Phase 4 features: industries, candidate support, density, overlays, street ROI planner, walk-list fields | todo | | Terrier build lane |
| Approve the primary-mode specification for candidate support | todo | | Paul Goff |
| Define further industries beyond CUA (O-12) | todo | | Paul Goff |
| Uncertainty ranges on imputed values (O-4b, unanswered, default off) | todo | | Paul Goff |

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
- Hazards from the handoffs: never run tests against port 8767; never take full memory dumps of the Python processes (the heap holds voter names and phones; mini dumps only); keep `.local\.walk-salt`, which keys saved results across rebuilds; the agent-created worktrees use a `node_modules` junction that must be removed before the worktree is.

## Key facts

- **Rulings and answers of 2026-10-06** (FLEXIBLE config-first, vault-only brain, per-district race-mode toggle, and O-1..O-13): [[2026-10-06-terrier-rulings]]. They govern how everything below is built: configuration and toggles over hard-coding, with Colorado CD-05 outputs unchanged by default.
- **Where the Terrier brain lives.** Paul ruled on 2026-10-06 that the Terrier brain is subordinate to and subsumed by this vault: vault-native notes (this project note plus the rulings discussion), not a separate Project Brain, and no brainlink configuration for it. Terrier is outside the Melange brain, which holds only the Luna dead end DE-047. On 2026-10-07 Paul asked for the Terrier notes to sit in their own top-level `terrier/` folder, separate from Mentat and Melange and still inside this one vault; the folder holds this note, the rulings and the blueprint note.
- **Data policy.** O-9: never strip personal data; all data always shown; run on the full data locally; no de-identified Runpod run for this lane. This supersedes, for this lane, the earlier "pod only, de-identified" rule (see the runpod-pod note).
- **Paul's later rulings of 2026-10-07** (full wording on [[2026-10-06-terrier-rulings]]): one server process per district (CO 8767, OR 8775, CT 8777); walk-list "Abs" wording per state (Oregon: mail ballots, every recorded vote counts; Connecticut: absentee or mail ballots, codes A or M); extra census.gov downloads (state legislative district boundaries and ZIP-code areas for Oregon and Connecticut); the same model types and frozen settings trained on each district's own voters, never Colorado-fitted models; no stress tests on the laptop; blanket permission to keep going overnight, with the changes recorded in `OVERNIGHT_CHANGES_2026-10-07.md` in the Terrier root.
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

## Focal Points

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); owner and sole decision-maker for Terrier; defines the scoring groups and industries. |

## Map

Every note of this project by type, one line each. All of them sit in the `terrier/` folder.

### Related Topics

| Topic | Relation |
|---|---|
| [[2026-10-06-terrier-blueprint]] | The multi-district build blueprint: phases 0-6, the 2026-10-06 review's corrections, Paul's 2026-10-07 answers, the build status and the sources and inputs by path. |

### Discussions

| Discussion | Relation |
|---|---|
| [[2026-10-06-terrier-rulings]] | Paul's three rulings of 2026-10-06 (FLEXIBLE config-first, vault-only brain, per-district primary/general toggle) and his O-1..O-13 answers. |

### Related Projects

- [[cu-geography]] — the project Terrier was renamed from: the Luna RF/KNN completion model (closed 2026-09-30) and the CU row framework that feed the app.
