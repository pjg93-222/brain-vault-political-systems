---
type: topic
title: "Terrier build progress 2026-10-07 to 2026-10-09"
aliases: ["Terrier build progress 2026-10-07 to 2026-10-09", "Terrier: build progress", "Terrier build log"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-10-07
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/terrier-multidistrict-lane-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\terrier-multidistrict-lane-2026-10-06.md", sha256: "bebd31824eaf01aaa7aa52d0657acc6354f575065238162e9755f0f9ee94847b"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "category/feature", "domain/data"]
part_of: "[[terrier]]"
---

# Terrier build progress 2026-10-07 to 2026-10-09

> The dated build record of the Terrier multi-district lane from 2026-10-07 to the evening of 2026-10-09: phases 0, 2 and 3, the nothing-withheld Colorado swap, the registration mix by party code, the Untapped map and one-click walk plan, the calibrated chance of voting, and the evening's walk-list caps, generator and speed fixes, map shading and folder move, and the late-evening Political outlook collapse. Part of [[terrier]].

## Status

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

### Build progress 2026-10-08 (aggregates only)

All paths are in the Terrier root. Change record: `OVERNIGHT_CHANGES_2026-10-07.md`; hand-off for Paul: `_build\FINISH.md`.

- **Two rulings (Paul, 2026-10-08).** (1) "Nothing should ever be withheld": the under-20-people / 10-households area suppression (hatch, empty density, withheld flags) is removed in every district, Colorado included; an area under those lines shows its values with a small-area note, and an area with no registered people is a plain pale fill. (2) Canvass "the people who need a reminder or push": the street-plan preset "Needs a push" is the default for candidate districts (the overall score is unchanged).
- **Final frameworks pinned.** OR-05 and CT-01 use the 30 / 25 / 25 / 20 overall weights (industry, candidate support, participation, sphere of influence) with no interim note; their freeze hashes are pinned in `tools/area_layers.py` and the pin check passes for both.
- **Colorado staged, not live (superseded the same evening: Paul swapped it live at 19:16, see the next section).** The nothing-withheld Colorado score store, density file and map bundle were built beside the live files and passed the Colorado gate on a copy: 3,172 areas newly shown, 89 areas with no registered people, 54,045 standings moved in shown areas, 6 summary rows shown; everything else matches the baseline. The earlier gate failure was only SQLite's own planner-statistics table (`sqlite_stat1`), which the gate now accepts. The live files were unchanged by the run. Paul runs the swap (about 10 minutes down; a dry run and a rollback exist).
- **OR-05 and CT-01 built in place** and smoke-checked on a spare port (not the live ports): every area shown (OR-05: 12,070 blocks, 24 empty; CT-01: 8,056 blocks, 16 empty), small blocks carry values (5,013 and 2,213), candidate support layer, density join rates 99.999% and 99.5%, street plan and walk overview working, no summary row suppressed.
- **Commits.** `d95f9f4` (pins, gate fix, change record) on `claude/walk-list` and `main`, pushed to the private GitHub repo. Tests at that commit: Django 430, tools 88, Colorado gate unit tests 47, all passing.
- **Left for Paul (done the same evening, see the next section).** Run the Colorado swap, then start Oregon on 8775 and Connecticut on 8777.

### Build progress 2026-10-08 evening and 2026-10-09 (aggregates only)

All paths are in the Terrier root. Newest wins over the 2026-10-08 section above.

- **Live in all three districts.** Paul swapped the nothing-withheld Colorado data in at 19:16 on 2026-10-08 (backup under `.local\backups\pre-unmask-20261008T191642`; rollback `_build\swap_co_live.ps1 -Rollback`); the build was complete at 19:30 with Colorado on 8767, OR-05 on 8775 and CT-01 on 8777 all running. OR-05 and CT-01 use the 30 / 25 / 25 / 20 weights with candidate support, "Needs a push" as the default street plan, and every area shown. The Colorado baseline was re-recorded after the swap (`c452df2`) and again after the registration-mix change (`b10a6ab`).
- **Registration mix by code (`85b5656`, Paul's O-10).** The map side panel lists every party code as itself in every district: D, R and U first, then each other code present, most people first ("W Working Families", "Code T" for an unnamed code, "No code" for blank). Display only: scores, the People filter and the Registration map layer are unchanged.
- **Connecticut density gap fixed (`09d49be`).** 2,084 people in 344 blocks registered outside the district matched no block, which left 348 blocks, 100 tracts and 3 ZIP codes with people but no density. The old-to-new county-code re-coding is now built from the state block file itself: the join rate went from 0.9955 to 0.99997 and the blocks with people but no density from 348 to 12. Those 12 are 5 blocks with no land (water) and 7 blocks holding 15 people the Connecticut file cannot place (Virginia ids and two region-code mismatches). Oregon and Colorado rebuild byte-identical.
- **Server crash fixed (`8f50713`).** The Python 3.12 crash with exit code 0xC000070A (the Windows system-information, WMI, query timing out under load) is stopped at the source: `manage.py` switches that query off as its first statement, before Django, pandas and numpy load, so it covers all three servers, the tests and the management commands. A new test fails if the switch-off is lost.
- **Street planner shipped.** Built in `847f04e` (server) and `2419afc` (screen), commit dates 2026-10-07, and live for OR-05 and CT-01 from 2026-10-08. A Street plan panel ranks an area's road blocks (at least 5 doors, length floored at 50 m) by the value per 100 m walked of a preset ("Mixed-support streets", "Supporter turnout", "Voter identification", later "Needs a push" as the default), with optional density weights; ticked blocks go into the walk list as `spans=` (up to 200 blocks, kept in saved lists); a Print scores box (off by default) adds overall, candidate support and participation to the printed PDF and CSV (Colorado: overall and participation only). Candidate districts only; Colorado answers that no candidate is set. A read-only evaluation found scattered turfs and a percentile standing in for a voting chance, which the Untapped work fixes.
- **Untapped map and one-click walk plan, approved 2026-10-09 and then built and made live (see the next section).** Paul's rulings R1-R4 of 2026-10-08 (map first, only unworked doors, adjustable list size, shading by potential alone) and the spec built from them were approved by Paul on 2026-10-09. One potential formula replaces "Needs a push" on every surface; the existing Street plan stays, collapsed as "Adjust plan". Colorado has no candidate and gets no layer. Wording, formula and defaults: [[2026-10-06-terrier-rulings]].
- **Latest commit as of the evening of 2026-10-08.** `8f50713` on `claude/walk-list` and `main`, pushed to the private GitHub repo (superseded by `6f56299`, see the next section).
- **Open for Paul.** The primary-mode choice (Default, A, B or C) and how to treat unaffiliated voters per state.

### Build progress 2026-10-09: Untapped live (aggregates only)

All paths are in the Terrier root. Newest wins over the sections above.

- **Live on OR-05 (port 8775) and CT-01 (port 8777).** The Untapped map layer and the one-click Plan walk list (Paul's rulings R1-R4; how to use them is under Paul's definitions on [[terrier]]) went live on 2026-10-09. The Colorado server (8767) was not restarted: its server output is byte-identical (the Colorado gate printed CHECK PASSED). It shares the rebuilt screens, so it shows the one-line note "Untapped needs a candidate" on its next page load.
- **Terrier repo commits** (origin `main` = `claude/walk-list` = `6f56299`):
  - S1 `ad3ab56`: server core, potential, doors already knocked, `/api/v3/untapped`, State House and Senate.
  - S2 `4ed0109`, `64085f9`, `7013771`: walk plan with potential, one-click turf, `fresh=1` lists.
  - F1 `64a3ad3`, `6848715`: map layer, sliders, "Most untapped" list, Plan walk list.
  - F2 `3c1edc9`, `25d6bb4`, `b1c8572`: walk tab one-click, Doors box, "Adjust plan", blocks wording, profile sentence.
  - Gate `e1a0741`: new lazily built cache files count as intended.
  - Change log `6f56299`.
- **Live verification.** The existing checks pass 69 of 71 per district; the same 2 are the known null densities. All Untapped checks pass: features, 6 levels, sums, ETag, hand formula, walk plan, fresh list totals, refusals, people sort 0-75, and the profile parts adding up. The block, tract and ZIP views miss the few people who have no block, tract or ZIP code on file (OR-05: 2 at block and tract, 157 at ZIP; CT-01: 3 at block, 3 at tract, 2 at ZIP); the existing map is the same, and the precinct view has everyone.
- **Lead's defaults** (agent defaults, Paul may overrule; wording on [[2026-10-06-terrier-rulings]]): influence standing, turnout score, knocked results, presets, weights on the people list, State House and Senate shading, the Colorado note and the API key names.
- **Open for Paul, both answered yes that afternoon and built** (wording on the rulings note; see the next section): (a) t was not a calibrated chance of voting (the district mean t was 0.55 in OR-05 against 0.84 from people's own general-election record), so it is now calibrated per district against that record, ranking unchanged. (b) The one-click turf was often a single large block of 144 to 200 doors, because blocks are indivisible, so it is now trimmed to the door count. The primary-mode choice (Default, A, B or C) is still open.

### Build progress 2026-10-09 afternoon: calibrated chance of voting + trimmed one-click list, live (aggregates only)

All paths are in the Terrier root. Newest wins over the sections above. Paul answered both Untapped questions of the previous section with "1. Yes 2. Yes"; his wording and the calibration results table are on [[2026-10-06-terrier-rulings]].

- **Live on OR-05 (port 8775) and CT-01 (port 8777); Colorado (8767) untouched.**
- **Terrier repo commits** (origin `main` = `claude/walk-list` = `0f89362`): F4 `dffb415`, S3 `90d04ee`, S4 `c7238f9`, change log `0f89362`.
- **Calibrated chance of voting (t).** Per district, against people's own general-election record, ranking unchanged. The method is a monotone curve (weighted pool-adjacent-violators on the vote rate by distinct turnout-score value, linearly interpolated). It replaced a logistic fit that missed the lowest deciles by up to 0.12 (Oregon) and 0.075 (Connecticut); the worst decile miss is now 0.016 (OR) and 0.012 (CT).
- **Trimmed one-click list.** The one-click list now stops at the Doors number, keeping the doors with the most untapped people from the last block. Example: OR precinct 41005-421 has a 429-door block, and 60 doors are kept.
- **Live verification.** The existing checks pass 69 of 71 per district; the same 2 are the known null densities.
- **Operational note.** The OR and CT server consoles are hosted in Windows Terminal. The first restart on 2026-10-09 died about a minute in when that console got Ctrl+C or was closed. Closing that terminal window stops the servers. (Superseded the same day: the Oregon and Connecticut servers now start hidden under watchdogs, see the next section.)
- **Open items done.** Both Untapped questions. Still open for Paul: the primary-mode choice (Default, A, B or C) and how to treat unaffiliated voters per state.

### Build progress 2026-10-09 evening: walk caps, generator, speed, map shading, folder move (aggregates only)

All paths are in the Terrier root, which is now `C:\Users\pgoff\Documents\Terrier\outputs\cu-geography-v3` (see Paths on [[terrier]]). Newest wins over the sections above. Latest commit `aa21b52` on `claude/walk-list`. Paul asked for all of this in a Claude session that evening; his two rulings (one-click lists capped at about 1,000 houses; the Terrier folder at `Documents\Terrier`) are on [[2026-10-06-terrier-rulings]].

- **Folder move.** The project folder moved from the old Codex path to `Documents\Terrier` (old path kept as a directory junction); the voter CSVs went to `Documents\Terrier\sources\` (with a `Downloads\terrier-sources` junction), the walk-list outputs to `Documents\Terrier\walk-lists\`, and the desktop shortcut was repointed. Full paths are under Paths on [[terrier]]. The Colorado CSV and the Oregon and Connecticut zips stayed in Downloads. The 8 `wt-untapped-*` worktrees and branches no longer exist (all were merged into `claude/walk-list` earlier and cleaned up by another session).
- **Walk list caps.** Before: a one-click list was limited to 10-500 doors (`walk_views.py` `MIN_DOORS`/`MAX_DOORS`) and any list was refused above 1,500 voters (`MAX_VOTERS`), which refused 183 of 326 Colorado precincts, 128 of 245 Oregon and 122 of 134 Connecticut, the main reason the generator "didn't work". Now: the one-click door ask is 1 to 1,000 doors (Paul's ruling: cap about 1,000 houses, one-click lists only); whole-precinct and street-pick lists go up to a 10,000-voter size ceiling; the scores lookup batch separately stays at 1,500 ids; the routing guards (`MAX_SEGMENTS` 1200, `MAX_GROUP_RUNS` 400) are unchanged and now report "too spread out to route as one walk list, split it". One-click still stops at 200 blocks (`MAX_PICK_SPANS`), which rarely binds at 1,000 doors. Commits `6a568e7`, `53de471`, `692a973` (turf note wording).
- **Generator fixes.** One-click turf used to seed only from the single best block and stopped short when that block was isolated (example: Oregon precinct 41047-981 got 4 of 60 doors, its best block sitting 10.8 km from the rest; 7 of 75 sampled precincts came up short). It now retries up to 5 seeds and keeps the turf with the most doors (43 of 60 doors in that precinct), and skips a seed bigger than the people ceiling (`836e367`). Turf growth uses a grid index of block ends, with identical results; sparse cases went from 34-68 s to 0.06-0.17 s (`f944357`).
- **Walk speed.** Root cause: precinct-only area queries could not use the `person_area(ss, sh, precinct)` index on a WITHOUT ROWID table, so each request scanned about 560,000 entries (4.09 s against 0.006 s with the index). `walk_store._area` now fills the missing leading columns from the combo table (`c5ffccd`; bench `59987b2`). Warm requests went from 1.5-3 s to 0.02-0.3 s; one-click (plan plus list) from about 3.5-7 s warm and 10-25 s cold to about 0.1-0.5 s. The first Colorado whole-precinct list after a restart is still about 6 s (cold scores lookups). Invariant: the combo table must hold the (ss, sh, precinct) of every person with a stop; revisit `_area` if the walk build changes.
- **Map shading.** The Registration layer and the walk-map party key used the largest party per area, but Unaffiliated is the largest group nearly everywhere (CO-05: 53.6% Unaffiliated; the largest group in 79% of blocks and 96% of precincts), so the map read as mostly grey and "uncommitted". It is now shaded by the Democratic-minus-Republican registration margin in 5 steps (R 15+, R 5-15, within 5, D 5-15, D 15+), with shorter legend labels so they stop overlapping (`8759191`, `aa21b52`); the walk-map key is "Party lean per block". The People "Political outlook" column was left as it was: it skews "Somewhat conservative" because the vendor flags do (65.2% Unknown or Multiple), and collapsing neighbouring flags would conflict with the documented method. That was an open question for Paul and was ruled later that night (see the next section). No canvass results are recorded yet: `research_disposition` has 0 rows in all three districts.
- **Oregon and Connecticut servers, hidden start and watchdog** (folded from the 2026-10-09 capture of the lane memory). After the console-hosted servers died, Paul said yes to windowless: at 14:01 on 2026-10-09 both were restarted through a hidden-window script (`0718b91`); at 15:40 he said yes to watchdogs, and the repo-root `Start-/Watch-/Stop-DistrictServer.ps1` (`-District or-05|ct-01 -Port 8775|8777`, copies of Colorado's scripts, Colorado's scripts hash-identical) went in as `9854be4`. The capture noted a slow warm-up at the time (about 163 s for Oregon, 63 s for Connecticut). Colorado's restart rule is under Paths on [[terrier]].
- **Servers.** All three were restarted from the new path on the new code (commands under Paths on [[terrier]]; logs `_build\district-<id>-server.out.log`).
- **Commits on `claude/walk-list`** (this session did not push them; they were pushed later that night, see the next section): `0718b91` (log the windowless Oregon and Connecticut restart), `9854be4` (hidden start and watchdog for Oregon and Connecticut), then the fixes `836e367` (turf seed retry), `6a568e7` (remove the door and voter caps), `8759191` (D-minus-R shading), `f944357` (turf grid index), `53de471` (one-click 1,000-door cap), `692a973` (turf note wording), performance `c5ffccd` and `59987b2` (bench), and legend `aa21b52`. Tests at the merge: 411 Python walk and Untapped tests passed, 228 frontend unit tests passed, `tsc` clean.
- **Open at the time.** The Political outlook column question (above), the slow first Colorado list after a restart, two stale git worktrees still registered (the locked agent worktree `.claude/worktrees/agent-a519024670b5cf945` and the `cu-geography-v3-csv-guard` worktree), the unpushed commits, and the older primary-mode and unaffiliated-voter questions. All but the last were closed later that night (next section).

### Build progress 2026-10-09 late evening: outlook collapse, pushes, worktree cleanup (aggregates only)

Paul's answers in a Claude session late on 2026-10-09; the rulings are on [[2026-10-06-terrier-rulings]]. Terrier root as above.

- **Political outlook collapse.** The People "Political outlook" column now collapses neighbouring vendor flags: set vendor flags forming one contiguous run on the five-point scale that does not extend to both sides of middle collapse to the run's most extreme flag (very plus somewhat conservative shows as very conservative; somewhat conservative plus middle as somewhat conservative; middle plus somewhat liberal plus very liberal as very liberal); runs spanning both sides of middle, or with gaps, stay Multiple responses; no flags stays Unknown. Computed at serve time by `scoresdb.collapse_outlook` and cached per server process; no store changed. Commit `40fa052`. Tests: 435 Python, all OK; 230 frontend, all passing. CO-05 counts, before to after: very conservative 6,958 to 41,853; somewhat conservative 77,948 to 87,341; middle 48,354 unchanged; somewhat liberal 21,584 to 23,937; very liberal 16,242 to 41,901; Multiple responses 74,822 to 2,522; Unknown 245,400 unchanged. The remaining skew toward "Somewhat conservative" is the vendor data, not the app.
- **Slow first Colorado list accepted.** About 6 s for the first whole-precinct list after a restart (cold score lookups); Paul said that is fine. No work planned.
- **Pushes.** origin `main` and `claude/walk-list` were fast-forwarded from `9854be4` to `aa21b52` (the nine evening commits; remote the private GitHub repo). `40fa052` was then fast-forwarded onto both branches too (`git ls-remote origin` shows `40fa052` on `main` and `claude/walk-list`). The local `main` branch still sits at `8f50713`.
- **Worktrees disposed.** The `cu-geography-v3-csv-guard` worktree and the locked agent worktree were removed together with their branches (both fully merged and clean). Only the main checkout remains. The older branches `claude/contacts-csv-guard`, `claude/criteria-csv-guard`, `claude/summaries-csv-guard` and `codex/terrier*` are untouched.
  - Correction 2026-10-18 (evidence: the Melange main reconcile topic, 2026-10-16; `git branch -a` on 2026-10-18 shows none of them): superseded. The `claude/*-csv-guard` and `codex/terrier*` branches were deleted on 2026-10-16.
- **Live.** All three servers (CO 8767, OR-05 8775, CT-01 8777) were restarted on `40fa052` and the frontend dist was rebuilt from it. The live Colorado CD-05 People API outlook totals match the counts above exactly (very conservative 41,853; somewhat conservative 87,341; middle 48,354; somewhat liberal 23,937; very liberal 41,901; and 247,922 in its Unknown bucket, which equals Unknown 245,400 plus Multiple responses 2,522).
- **Open.** Paul's primary-mode choice (Default, A, B or C) and how to treat unaffiliated voters per state.

### Details from the lane memory not recorded above (added 2026-10-10; memory `terrier-multidistrict-lane-2026-10-06`, aggregates only)

- **Phase 3 refit speed.** The per-district refit was sped up with RF `n_jobs=4`, proven to give identical trees.
- **First GitHub push.** `claude/walk-list` was first pushed to the private repo on 2026-10-08 at `1ab8d2c`, after a full-history privacy scan (clean). At that time the remote `main` was a one-commit "# Geo" placeholder, not force-pushed (ask Paul); it was later fast-forwarded with `claude/walk-list` (Pushes, above).
- **Street plan evaluation (2026-10-08, read-only).** Before the Untapped build, the existing Street plan (`847f04e`/`2419afc`, a hidden collapsed panel on OR 8775 and CT 8777) was evaluated: its arithmetic was exact, but turfs were scattered and its old p was a percentile, not a chance of voting (KILLED by a second reader). The build then went to the construction (fork) session.
- **Windowless start.** The first hidden-window launcher, `start_district.ps1`, used `Win32_Process.Create` with ShowWindow=0, because CREATE_NO_WINDOW is rejected by WMI (return 21); it refused port 8767. It was renamed to `.old` once the watchdog scripts replaced it. Never restart Colorado through the Oregon and Connecticut scripts (cookie prefix and watchdog race); Colorado's restart rule is under Paths on [[terrier]].
