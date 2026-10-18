---
type: discussion
title: "Terrier rulings 2026-10-06"
aliases: ["Terrier rulings 2026-10-06", "Terrier O-1..O-13 answers", "Terrier FLEXIBLE ruling", "Terrier Untapped map rulings R1-R4", "Terrier one-click walk plan", "Terrier Needs a push replaced", "Terrier chance of voting calibration", "Terrier trimmed one-click list", "Terrier one-click 1,000 door cap", "Terrier folder Documents\\Terrier"]
date: 2026-10-06
summary: "Paul's rulings of 2026-10-06 for the Terrier multi-district lane (OR-05 Bynum and CT-01 Bronin added to Colorado CD-05): the system must be FLEXIBLE with config and toggles over hard-coding, the Terrier brain exists only as vault notes, race mode is a per-district primary/general toggle, plus his answers O-1 to O-13 on support model, vote codes, imputation, preset names, personal-data handling, party codes, scoring layers, industries and source extraction."
conclusions:
  - "Ruling 1 (2026-10-06): the system is FLEXIBLE. Districts, industries, candidate per district, layer combinations and ROI weights are configuration, not code. The printed walk list gets an optional scores toggle defaulting to raw. Luna is copied into a versioned per-district stage; the locked original is untouched."
  - "Ruling 2 (2026-10-06): the Terrier brain exists only as notes in this vault (terrier/terrier plus this discussion; moved with the other Terrier notes into the top-level terrier/ folder on 2026-10-07), subordinate to and subsumed by the vault, not a separate Project Brain."
  - "Ruling 3 (2026-10-06): primary versus general race mode is a per-district toggle ('on flex'); Bronin's race status is never hard-coded."
  - "O-9 (2026-10-06): never strip personal data; all data always shown; run locally on the full data; no de-identified pod run."
  - "O-5, O-7 and O-10 (2026-10-06): Paul confirmed the agent readings recorded below."
  - "O-11 and O-12 (2026-10-06): numeric partisan and support layers stay in the overall score; there is no second industry (only CUA)."
  - "Answers of 2026-10-07: weights approved (with a candidate industry 30 / candidate support 25 / participation 25 / sphere 20; Colorado without a candidate 40 / 35 / 25 unchanged); street-plan formulas approved with the voting-chance factor added to 'Mixed-support streets'; Census TIGER 2025 block file plus district boundary files from census.gov only; Colorado's GPU fill step skipped for Oregon and Connecticut; parallel build lanes use Claude Code's built-in background agents; Python environment rebuild approved."
  - "Later rulings of 2026-10-07 (Paul): one server process per district (CO 8767, OR 8775, CT 8777); walk-list Abs wording per state (Oregon: mail ballots, every recorded vote counts; Connecticut: absentee or mail ballots, A or M); extra census.gov downloads (state legislative districts and ZIP-code areas); the same RF/KNN model types and frozen settings trained on each district's own voters, never Colorado-fitted models; no stress tests on the laptop; overnight blanket permission with the change record in the Terrier repo's OVERNIGHT_CHANGES_2026-10-07.md."
  - "Lead's Phase 3b rulings (2026-10-07, the coordinating session's, not Paul's): the interim overall score is published and labelled; voters without registration geography get a residence block marked as estimated; party W gets a neutral lean like other minor parties."
  - "Rulings of 2026-10-08 (Paul): nothing is ever withheld in any district, Colorado included; canvass the people who need a reminder or push, not the sure voters who are sure to vote our way; the registration mix shows every party code as itself; the Terrier repo is the private GitHub repo pjg93-222/Geo; lanes work in parallel with no waiting; never stress-test the laptop."
  - "Untapped map and one-click walk plan (Paul's rulings R1-R4 of 2026-10-08, spec approved by Paul 2026-10-09): R1 map first, highlighting the most untapped areas (total untapped people); R2 doors already worked in saved walk lists are excluded; R3 walk-list size is adjustable; R4 shading is by total untapped potential alone. The potential formula (persuade, remind, influence) replaces the earlier 'Needs a push' definition everywhere. The weights 0.5 / 0.5 / 0.5, the 60-door target and the 400 m fallback are agent defaults, not Paul's rulings."
  - "Untapped live and lead rulings 2026-10-09 (agent defaults, Paul may overrule): the map and one-click walk plan went live on OR-05 (8775) and CT-01 (8777). The lead set i = soi_pct/100; t from the spec's five turnout scores; Not home and Moved count as knocked; the mixed and turnout presets kept, now using t; the people list, profile and print use the default weights; State House and Senate shaded on the map; Colorado gets a one-line note; the API keys are named undecided and supporter. Its two open questions were answered yes by Paul on 2026-10-09 (next conclusion)."
  - "Paul's answers and the calibration ruling, afternoon of 2026-10-09: Paul answered '1. Yes 2. Yes' to the two Untapped questions. (a) Calibrate the chance of voting against people's own general-election record, per district, keeping the ranking. (b) Trim the one-click list to the door count, keeping the doors with the most untapped people from the last block. Lead ruling (agent default, Paul may overrule): the calibration method is a monotone curve (weighted pool-adjacent-violators on the vote rate by distinct turnout-score value, linearly interpolated), which replaced a logistic fit that missed the lowest deciles by up to 0.12 (Oregon) and 0.075 (Connecticut). Live on OR-05 and CT-01 (Terrier commit 0f89362); results table in the body."
  - "Paul's rulings of the evening of 2026-10-09: (1) one-click walk lists are capped at about 1,000 houses, for one-click lists only (the door ask is now 1 to 1,000; whole-precinct and street-pick lists keep a separate 10,000-voter size ceiling, set by the lead as an agent default); (2) the Terrier project lives in the folder Documents\\Terrier (moved from the old Codex path, which stays as a junction). Earlier that day Paul also said yes to windowless Oregon and Connecticut servers (14:01) and to watchdogs for both (15:40). Details in the body."
  - "Paul's rulings of the late evening of 2026-10-09: (1) the People Political outlook column collapses neighbouring vendor flags: set vendor flags forming one contiguous run on the five-point scale that does not extend to both sides of middle collapse to the run's most extreme flag (very plus somewhat conservative shows as very conservative; somewhat conservative plus middle as somewhat conservative; middle plus somewhat liberal plus very liberal as very liberal); runs spanning both sides of middle, or with gaps, stay Multiple responses; no flags stays Unknown (computed at serve time by scoresdb.collapse_outlook, commit 40fa052, no store change); (2) the slow first Colorado whole-precinct list after a restart (about 6 s, cold score lookups) is accepted as fine, with no work planned."
action_items:
  - "Terrier build lane: build to these rulings, config-first, with Colorado CD-05 outputs byte-identical by default (owner: Terrier build lane)."
  - "Approve the primary-mode specification for candidate support before it is built (owner: Paul)."
  - "Define any further industries beyond CUA when wanted; the config supports them (owner: Paul)."
  - "Answer O-4b (uncertainty ranges on imputed values) if wanted; default stays off (owner: Paul)."
  - "Built and live 2026-10-09 on OR-05 and CT-01 (Terrier commit 6f56299): the Untapped map layer and the one-click 'Plan walk list' to R1-R4 and the potential formula; where to click is on the terrier note (owner: Terrier build lane)."
  - "Done 2026-10-09 evening: the one-click door ask now runs 1 to 1,000 doors (Paul's cap of about 1,000 houses) and the project folder is Documents\\Terrier; commits and the rest of the evening work are on the terrier note (owner: Terrier build lane)."
  - "Done: Paul answered yes to both Untapped questions on 2026-10-09 ('1. Yes 2. Yes'): (a) calibrate t per district against people's own general-election record, ranking unchanged; (b) trim the one-click list to the door count; built and live the same afternoon, Terrier commit 0f89362 (owner: Paul)."
  - "Done 2026-10-09 late evening: Paul ruled that the People Political outlook column collapses neighbouring vendor flags (commit 40fa052); the slow first Colorado list after a restart is accepted (owner: Paul)."
related_topics: []
related_actors: []
related_people: []
related_projects:
  - "[[terrier]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/terrier-multidistrict-lane-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\terrier-multidistrict-lane-2026-10-06.md", sha256: "bebd31824eaf01aaa7aa52d0657acc6354f575065238162e9755f0f9ee94847b"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/discussion", "domain/data"]
---

# Terrier rulings 2026-10-06

> Paul's three rulings and his answers O-1 to O-13 for the Terrier multi-district lane, given in the 2026-10-06 coordinator session: a flexible, config-first system for OR-05, CT-01 and Colorado CD-05, with the Terrier brain kept only in this vault.

## Context

- The lane adds Oregon OR-05 (Janelle Bynum, 562,563 rows) and Connecticut CT-01 (Luke Bronin, 458,372 rows) to the live Colorado CD-05 app; both files use the same 622-column statara schema as Colorado, and some of their `sci_*` values are blank from unmatched consumer-file records, as in Colorado. The blanks are per field, not whole rows: the median blank rate across the `sci_*` fields is 14.8% in OR-05, 13.0% in CT-01 and 16.2% in Colorado, and no row is blank on every `sci_*` field (10 `sci_*` fields are empty in all three files). Project note: [[terrier]].
- The open-decision list O-1..O-13 lived only in an earlier chat (no document on disk). The answers below are Paul's, as recorded in the coordinator's memory file of 2026-10-06; the readings marked "agent reading" are the agent's interpretation, and Paul confirmed O-5, O-7 and O-10 the same day. Paul rejected jargon-heavy open items (O-7, O-10, O-12), so open items are explained in plain words.
- These rulings are Paul Goff's. They do not change the locked Colorado Luna code, the Colorado outputs (byte-identical by default) or the Melange brain.

## Participants

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Terrier. |

## Conclusions

### The three rulings

1. **FLEXIBLE, config-first.** The system must be flexible: configuration and toggles over hard-coding. Districts, industries, the candidate per district, layer combinations and ROI weights are all configurable. The printed walk list gets an optional scores toggle that defaults to raw (this keeps the earlier "raw data only" decision as the default). The Luna model is copied into a versioned per-district stage; the locked original is untouched.
2. **The brain is vault-only.** The Terrier brain exists only as a subordinate of, and subsumed by, this Obsidian vault: vault-native notes (`terrier/terrier`, this discussion), not a separate Project Brain. Nothing for Terrier is created under the Project Brain folder and brainlink configuration is not touched.
3. **Race mode is a per-district toggle.** Primary versus general mode is a toggle per district ("on flex"); never hard-code Bronin's race status.

### The O-1..O-13 answers

- **O-1.** "Ideology position" means party membership (Bronin = his party). The support model switches between general and primary per district; primary is not hidden.
- **O-1b.** No door-result calibration.
- **O-2.** Race mode is a toggle (on or off), per district.
- **O-3.** Get the real Oregon and Connecticut mail-ballot and absentee vote codes; no "n/a" column. (Oregon is all vote-by-mail.)
- **O-4 and O-4b.** "Imputation" means filling the missing measured values (the blank `sci_*` values from unmatched consumer-file records) with the Luna RF/KNN model; it has nothing to do with other industries. Uncertainty ranges: not answered, so the default stays off.
- **O-5.** "Same as 5": missing geo-audit values are imputed by the model too, with no "Not audited" label. Paul confirmed this reading on 2026-10-06.
- **O-6.** Preset names approved: "Mixed-support streets", "Supporter turnout", "Voter identification".
- **O-7.** Paul did not understand the question. Agent reading, confirmed by Paul 2026-10-06: the copied Luna code checks for Colorado's exact row count and file hash, so the copy must take per-district values. Covered by the FLEXIBLE ruling; the locked original is untouched.
- **O-8.** No 12-hour Colorado rerun. Imputation is applying the model, not a 12-hour job; a run that long means something is wrong.
- **O-9.** Never strip personal data. All data always shown. Run locally on the full data; no de-identified pod run. This supersedes the earlier "pod only, de-identified" note for this lane.
- **O-10.** Lumping party W (Working Families) into "other" "makes no sense": show every party code as itself (agent reading, confirmed by Paul 2026-10-06).
- **O-11.** The numeric partisan and support layers are kept in the overall score.
- **O-12.** There is no second industry; the question is dropped. Only Credit Union Alignment (CUA) exists; the config supports more when Paul defines them.
- **O-13.** Yes: extract the two source zips to `Downloads\terrier-sources\` (on 2026-10-09 the extracted CSVs moved to `Documents\Terrier\sources\`, and `Downloads\terrier-sources` is now a junction to it).

### Dead ends

None are named in the Terrier sources, so no dead-end note was written. (The Luna lane's one brain dead end, DE-047, is recorded in the Melange brain and summarized on the cu-geography project note.)

## Answers of 2026-10-07

Paul's answers to the three items the blueprint review sent him, plus two build decisions, given in the coordinator session of 2026-10-07 (recorded in the blueprint as "Answered by Paul 2026-10-07"; the plan and build status are in [[2026-10-06-terrier-blueprint]]).

- **Overall weights approved.** In a district with a candidate: industry 30, candidate support 25, participation 25, sphere of influence 20. In a district without a candidate (Colorado): 40 / 35 / 25 unchanged.
- **Street-plan formulas approved.** (s = a person's support chance, p = their voting chance.) "Mixed-support streets" = sum over people of (1 - |2s - 1|) x p. "Supporter turnout" = sum over people of s x (1 - p). "Voter identification" = count of people with no clear support signal. The voting-chance factor p in "Mixed-support streets" is Paul's change to the proposal; the other two are as proposed.
- **Census approved.** The TIGER 2025 edition of the block file plus the district boundary files, census.gov only. Finding: the 2025 block file still uses Connecticut's old county codes (09001-09015), while the voter file and the road files use the planning-region codes (09110-09190). Blocks are re-coded by location during the build.
- **Colorado's GPU fill step is skipped** for Oregon and Connecticut.
- **Parallel build lanes** use Claude Code's built-in background agents (the agent-manager skill and DevFleet are not used).
- **Python environment rebuild approved.**
- **Folder.** Paul asked for a separate top-level `terrier/` folder, apart from the Mentat and Melange notes and inside this vault, holding all Terrier notes; this note, [[terrier]] and the blueprint note were moved or created there on 2026-10-07.

## Later rulings of 2026-10-07

Paul's rulings given after the answers above, while the build was running (Phases 0, 2 and 3 are now done; progress is on [[terrier]]). Quotation marks below are the wording he approved.

- **One server process per district.** Colorado stays on port 8767, Oregon OR-05 gets 8775 and Connecticut CT-01 gets 8777. A district menu in the app header jumps between them.
- **Walk-list "Abs" wording.** The walk list has an "Abs" label whose meaning is stated per state. Oregon: "Abs = mail ballots (Oregon votes by mail; every recorded vote counts)". Connecticut: "Abs = absentee or mail ballots (A or M)", where A and M are the vendor's vote-method letters.
- **Extra census.gov downloads approved.** On top of the 2025 block, boundary and road files: state legislative district boundaries (lower and upper chambers) for Oregon and Connecticut, and ZIP-code areas (ZCTA) for both. census.gov only. The download manifest grew from 14 to 20 files (280,939,810 bytes).
- **Model ruling.** The Oregon and Connecticut blank values are filled by the same RF/KNN model types with the same frozen settings, trained on each district's own voters. Colorado-fitted models are never used for them.
- **No stress tests on the laptop.** No load experiments or launch stress tests on Paul's laptop; crashes are diagnosed from logs only.
- **Overnight blanket permission.** While Paul is away, the build may proceed on any task in this lane that would otherwise need his guidance, as long as every change is recorded in plain English. The change record is `OVERNIGHT_CHANGES_2026-10-07.md` in the Terrier repo root (`C:\Users\pgoff\Documents\Terrier\outputs\cu-geography-v3`, its path since the 2026-10-09 folder move).
### Lead's Phase 3b rulings (2026-10-07)

These are the lead's (the coordinating session's) rulings on build details, not Paul's; Paul can overturn any of them.

- **Interim overall.** An interim overall score is published and labelled as interim.
- **Residence block.** Voters who have no registration geography get a residence block (the Census block where they live), and it is marked as estimated.
- **Party W.** Working Families (W) voters get a neutral party lean, the same as the other minor parties.

## Rulings of 2026-10-08

Paul's rulings and standing orders from the Terrier build of 2026-10-08, recorded here because this note did not hold them yet (the project note [[terrier]] summarises the first two). Aggregates only.

- **Nothing is ever withheld.** Paul: "nothing should ever be withheld". The old rule that hid an area with fewer than 20 people or 10 households (hatched map fill, empty density, "withheld" flags) is gone in every district, Colorado included; this is the one Colorado change Paul ruled as intended. Every area now shows its values. An area with few people carries a "Small area: N people" note beside its numbers; an area with no registered people is a plain pale fill labelled "No registered people". Live in all three districts since Paul swapped the Colorado data in on the evening of 2026-10-08.
- **Target the people who need a push.** Paul wants the canvass aimed at the people who need a reminder or push, in his words: "find the people who need a reminder or push, not those who we are sure are going to vote and are sure that they are going to vote our way". It was built the same day as the street-plan preset "Needs a push", the default for districts with a candidate, plus a People column and sort, the profile and a printed column; the overall score did not change. That definition (it used the support and participation percentiles) is replaced on 2026-10-09 by the potential formula in the next section.
- **Registration mix shows every party code.** Paul's O-10 ruling (every party code as itself) now also covers the side panel's Registration mix, in every district: D, R and U first, then each other code present, most people first, with "No code" for blank. Display only: scores, standings, the People filter and the Registration map layer are unchanged. Before this the panel lumped the minor parties into "Other".
- **Repository.** The Terrier code lives in the private GitHub repo `pjg93-222/Geo` (Paul: the repo should be named for the folder). Every landed commit is pushed.
- **Work in parallel, no waiting.** Paul: "Nothing should be waiting on each other, keep going and work in parallel." Build lanes merge as soon as their own checks pass; only the heavy CPU or memory steps take turns.
- **Never stress-test the laptop.** The 2026-10-07 order stands: no load, launch-loop or many-process tests; crashes are diagnosed from logs and code. The Python 3.12 crash (exit code 0xC000070A) was fixed on 2026-10-08 in `manage.py`, which now switches off the Windows system-information (WMI) query before Django loads; it covers all three servers.

## Rulings of 2026-10-08/09: Untapped map and one-click walk plan

Paul's rulings R1 to R4, relayed by his "Model decisions and configuration questions" session on 2026-10-08, and the build spec that follows from them, which Paul approved on 2026-10-09 ("Approve"). Status on 2026-10-09: built and live on OR-05 (port 8775) and CT-01 (port 8777); the Colorado server (8767) was not restarted and its output is byte-identical because Colorado has no candidate. Commits and live checks are on [[terrier]].

### Paul's rulings

- **R1, map first.** Highlight the most untapped areas, meaning the total number of untapped people. The score balances persuadability, sphere of influence and likelihood of voting; likelihood of voting "is what we are aiming to change".
- **R2, only unworked doors.** Exclude doors that already have a recorded result in saved walk lists, so the map shows unworked potential and updates as lists come back.
- **R3, adjustable list size.** The walk-list size is adjustable.
- **R4, shade by potential alone.** Shading is by total untapped potential per area (not per door), with no other layer mixed in.

### The formula

One formula on every surface (map, list, people, profile, print, street plan). For each person not already knocked (R2):

- **s**, candidate support on the absolute 0 to 1 scale, not the district percentile; undecided counts as 0.5.
- **t**, chance of voting: the mean of the five turnout-only participation (`sai_*`) scores divided by 100, not a percentile. When those are missing it falls back to the person's own general-election record (the share of eligible general elections voted). From the afternoon of 2026-10-09 it is calibrated per district against that record, ranking unchanged (see "Open for Paul", resolved).
- **i**, sphere-of-influence standing from 0 to 1 (the existing measure: 45% giving, 45% volunteering, 10% household).
- **persuade** = (1 - |2s - 1|) x t. Highest for people near the middle who will vote.
- **remind** = s x (1 - t). Highest for likely supporters who may not vote.
- **potential** = (wP x persuade + wR x remind) x (1 + wI x i).

Agent defaults, not Paul's rulings (Paul can change them; the app labels them as defaults): wP = wR = 0.5, wI = 0.5 (the top influence standing counts 1.5 times), a door target of 60 and a 400 m fallback for the walk plan. Two sliders: the persuade-versus-remind balance (wP + wR = 1) and the influence weight wI.

### What it replaces and why

"Needs a push" (the people list, profile, print column and street-plan preset) is redefined as this potential, so the app has one formula. Every earlier "chance of voting" wording that meant the old participation percentile is replaced. A read-only evaluation of the street plan at Terrier commit `b10a6ab` found its arithmetic exact but four problems:

1. **Scattered turfs.** Plans of 750 to 850 doors came as 25 to 29 disconnected pieces, and the walking between pieces, at least 0.8 times the street length, was not counted.
2. **Not a voting chance.** The old p was a percentile of a composite that is half activism and digital reach; it averaged 0.53 in Oregon where observed turnout was 0.84.
3. **Centred on the median.** The old push used the support percentile, so it centred on the district median (69% in Connecticut) instead of on 50%.
4. **Blocks called streets.** Its rows were blocks but were labelled "streets".

### The map

- A new **Untapped** layer, on by default in OR-05 and CT-01, shades each area (precinct, State House district, State Senate district) by the sum of its people's potential, by potential alone.
- A ranked **Most untapped** list beside the map gives each area's total potential plus persuadable and reminder sub-counts. The spec leaves one detail for the build to state: whether those are the sums of the two terms or the number of people where each term dominates.
- Colorado has no candidate, so it gets no layer, only a short note pointing to Oregon and Connecticut.

### One click

- A **Plan walk list** button on an area (in the map side panel and on each list row) opens the Walk tab with that precinct and builds the list at once. One click works at the precinct level only.
- **Turf.** Start at the block with the most untapped potential; grow along connected streets (blocks that share a road node); when nothing connected remains, take the best block within 400 m; stop at the door target (adjustable, default 60). The build exposes each block's end nodes from the street plan for this.
- The result shows doors, people and routed walking metres.
- The existing Street plan panel stays, collapsed as "Adjust plan", with its rows labelled "blocks".

### Build rules

Opus designs and reviews; Sonnet 5.5 builds. The live Colorado API check stays byte-identical. Nothing is tested against the live Colorado server on 8767. No stress, load or many-process tests. Each verified lane is committed and pushed to the private GitHub repo, then made live, and Paul is told in plain words where to click.

### Lead rulings 2026-10-09 (agent defaults, Paul may overrule)

Decisions the lead (the coordinating session) made while building the Untapped layer. They are the lead's, not Paul's, and Paul can overturn any of them.

- **i, influence standing.** `soi_pct / 100`, the existing sphere-of-influence standing on the 0 to 1 scale.
- **t, chance of voting.** Taken from the spec's five turnout scores (their mean divided by 100), as in the formula above; calibrated per district later the same day (see "Lead ruling 2026-10-09 afternoon").
- **Knocked.** Not home and Moved results count as knocked, like the other recorded results, so those doors are excluded under R2.
- **Presets.** The "Mixed-support streets" and "Supporter turnout" presets are kept, now using t as the voting chance.
- **People list, profile and print.** They use the default weights (wP = wR = 0.5, wI = 0.5).
- **State House and Senate.** Both are shaded on the map, alongside precincts.
- **Colorado.** It gets the one-line note "Untapped needs a candidate" instead of a layer.
- **API keys.** The keys are named `undecided` and `supporter`.

### Open for Paul (both resolved 2026-10-09)

Both came out of the live check on 2026-10-09 (counts only, no voter rows). Paul, 2026-10-09: "1. Yes 2. Yes". Both were built and went live that afternoon on OR-05 and CT-01 (Terrier commit `0f89362`; commits and live checks on [[terrier]]).

- **(a) t is not a calibrated chance of voting. Resolved: yes, calibrate.** The district mean t is 0.55 in OR against 0.84 from people's own general-election record, and people with t between 0.2 and 0.4 voted in 74% of the general elections they were eligible for. The agent proposed calibrating t per district against people's own record; the ranking would not change. Paul: calibrate the chance of voting against people's own general-election record, per district, keeping the ranking.
- **(b) The one-click turf is often a single large block. Resolved: yes, trim.** It is 144 to 200 doors, because blocks are indivisible. The agent offered trimming to the door count. Paul: trim the one-click list to the door count, keeping the doors with the most untapped people from the last block. Example: OR precinct 41005-421 has a 429-door block, and 60 doors are kept.

### Lead ruling 2026-10-09 afternoon: how t is calibrated (agent default, Paul may overrule)

The lead chose the calibration method. It is a monotone curve: weighted pool-adjacent-violators on the vote rate by distinct turnout-score value, linearly interpolated between the points. It replaced a logistic fit that missed the lowest deciles by up to 0.12 (Oregon) and 0.075 (Connecticut). Results, counts and rates only ("worst decile miss" is the largest gap between the calibrated chance and the actual vote rate in any decile):

| | Oregon | Connecticut |
|---|---|---|
| fit people | 522,171 | 441,359 |
| points | 142 | 156 |
| mean chance of voting | 0.58 → 0.83 | 0.48 → 0.74 |
| record (people's own general-election record) | 0.89 | 0.78 |
| worst decile miss | 0.016 | 0.012 |
| split-half worst miss | 0.016 | 0.008 |

The ranking is unchanged, with no decreasing pair. Ties occur only in the flat ends, which hold 0.01% (OR) and 0.07% (CT) of people.

## Rulings of 2026-10-09 evening: walk-list cap and folder

Paul's requests in a Claude session on the evening of 2026-10-09, with the two afternoon approvals that led into them. Aggregates only; the build record and commits are on [[terrier]].

- **One-click walk lists are capped at about 1,000 houses.** Paul: cap about 1,000 houses, one-click lists only. The one-click door ask is now 1 to 1,000 doors (it was 10-500). Why it came up: a separate 1,500-voter limit refused 183 of 326 Colorado precincts, 128 of 245 Oregon and 122 of 134 Connecticut, which is the main reason the walk-list generator "didn't work". The limit is now only a 10,000-voter size ceiling on whole-precinct and street-pick lists (agent default, Paul may overrule); the scores lookup batch stays at 1,500 ids and the routing guards are unchanged.
- **The Terrier folder is `C:\Users\pgoff\Documents\Terrier`.** The project moved there from the old Codex path, which now points to it as a directory junction so old paths, worktree links and Codex threads still resolve. The voter CSVs and the walk-list outputs moved with it (`sources\` and `walk-lists\`), and the old Downloads folder for the sources is a junction too, because the build tools hardcode that path.
- **Windowless servers and watchdogs (approvals earlier on 2026-10-09).** At 14:01 Paul said yes to starting the Oregon and Connecticut servers with no console window, after closing the Windows Terminal that hosted them had stopped both; at 15:40 he said yes to watchdogs for both. Standing operating rule: restart Colorado only with `Stop-TerrierServer.ps1` then `Start-Terrier.ps1 -NoBrowser`, never with the district scripts (the cookie prefix and the watchdog would race); Oregon and Connecticut use `Start-`, `Watch-` and `Stop-DistrictServer.ps1` with `-District or-05|ct-01 -Port 8775|8777`, which refuse Colorado.
- **Open.** No canvass results are recorded yet (0 rows in all three districts). The outlook question that stood open here was ruled later that night (next section).

## Rulings of 2026-10-09 late evening: Political outlook and the slow first list

Paul's answers in a Claude session late on 2026-10-09, closing two items left open by the evening. Aggregates only; the build record is on [[2026-10-06-terrier-build-progress]].

- **The People "Political outlook" column collapses neighbouring vendor flags.** Rule: set vendor flags forming one contiguous run on the five-point scale that does not extend to both sides of middle collapse to the run's most extreme flag (very plus somewhat conservative shows as very conservative; somewhat conservative plus middle as somewhat conservative; middle plus somewhat liberal plus very liberal as very liberal); runs spanning both sides of middle, or with gaps, stay Multiple responses; no flags stays Unknown. Why: the column skewed "Somewhat conservative" and most of its "Multiple responses" people carried neighbouring flags (74,822 down to 2,522 in CO-05). The remaining skew toward "Somewhat conservative" is in the vendor data, not the app. It is computed at serve time by `scoresdb.collapse_outlook`, cached per server process, with no change to any store (commit `40fa052`, pushed and live on all three servers). This settles the open question above, which had held the column unchanged.

| CO-05 outlook | Before | After |
|---|---|---|
| Very conservative | 6,958 | 41,853 |
| Somewhat conservative | 77,948 | 87,341 |
| Middle | 48,354 | 48,354 |
| Somewhat liberal | 21,584 | 23,937 |
| Very liberal | 16,242 | 41,901 |
| Multiple responses | 74,822 | 2,522 |
| Unknown | 245,400 | 245,400 |

- **The slow first Colorado list is accepted.** The first whole-precinct walk list after a restart takes about 6 s (cold score lookups); Paul said that is fine, so no work is planned.

## Action Items

- [x] Build the Untapped map layer and the one-click "Plan walk list" to R1-R4 and the potential formula — owner: Terrier build lane (live 2026-10-09 on OR-05 and CT-01, commit `6f56299`; where to click is on [[terrier]])
- [x] Answer the two Untapped questions: calibrate t per district against people's own record (ranking unchanged), and trim the one-click list to the door count — owner: Paul Goff (answered "1. Yes 2. Yes" on 2026-10-09; built and live that afternoon, commit `0f89362`)
- [x] Raise the walk-list limits and move the project folder to Documents\Terrier — owner: Terrier build lane (done 2026-10-09 evening, Terrier commit `aa21b52`)
- [x] Decide the People Political outlook column — owner: Paul Goff (ruled 2026-10-09 late evening: collapse neighbouring vendor flags, commit `40fa052`)
- [ ] Build config-first to these rulings; Colorado CD-05 outputs stay byte-identical by default — owner: Terrier build lane
- [ ] Approve the primary-mode specification for candidate support (Phase 4) — owner: Paul Goff
- [ ] Define any further industries beyond CUA when wanted — owner: Paul Goff
- [ ] Decide whether imputed values need uncertainty ranges (O-4b, default off) — owner: Paul Goff

## Related Projects

- [[terrier]]
- [[2026-10-06-terrier-build-progress]] — the dated build record that carries these rulings into the Terrier app.
