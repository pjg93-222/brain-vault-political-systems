---
type: fleeting
title: "Terrier multidistrict lane (2026-10-06)"
aliases: ["terrier-multidistrict-lane-2026-10-06"]
source: "session"
captured_at: 2026-10-06
created_at: 2026-10-06
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[2026-10-06-terrier-rulings]]"
  - "[[terrier]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/terrier-multidistrict-lane-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-08", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\terrier-multidistrict-lane-2026-10-06.md", sha256: "b944c5e8306c1ec42e747d3c93f2042d3340b34021fa60e60005b149be1bb065"}
updated_at: 2026-10-08
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Terrier multidistrict lane (2026-10-06)

> Terrier (renamed cu-geography voter canvass app) expansion to OR-05 Bynum + CT-01 Bronin; paths, Paul's rulings (FLEXIBLE, vault-only brain, race toggle)

## Content

Terrier = renamed CU Geography app (Codex project, NOT Melange). Root: C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs\cu-geography-v3 (git, branch claude/walk-list, no remote, Django/Waitress :8767 + React/MapLibre). Colorado RF/KNN = the Luna lane in sibling ...\outputs\cu-geography\.local\ (LOCKED code). Source CO file: Downloads\statara_co_cd005_20260904.csv.

2026-10-06 lane: add OR-05 (Downloads\Janelle Bynum (OR-05).zip, 562,563 rows) and CT-01 (Downloads\Luke Bronin (CT-01).zip, 458,372 rows). Both are the same 622-column statara schema as CO. Gaps are per field, not whole rows (median sci_* blank rate OR 14.8%, CT 13.0%, CO 16.2%; children ~40%); no row is blank on every field.

Paul's definitions (cu-geography\CONVERSATION_REQUESTS.md R006-R019): overall = 40% alignment + 35% Participation (10 sai_* turnout) + 25% Sphere of Influence (45% giving, 45% volunteering, 10% household). Partisan observed, not inferred. "Industries" = per-industry alignment like CUA (Paul confirmed 2026-10-06).

Paul's rulings 2026-10-06:
1. System must be FLEXIBLE: config/toggles over hard-coding. Districts, industries, candidate per district, layer combos, ROI weights all configurable. Printed walk list gets an optional scores toggle defaulting to raw (keeps the old "raw only" decision as default). Luna copied into a versioned per-district stage; locked original untouched.
2. Terrier brain ONLY as subordinate to and subsumed by the Obsidian vault: vault-native project notes (projects/terrier.md + decisions/dead ends), NOT a separate Project Brain.
3. Primary/general race mode is a per-district toggle ("on flex"); never hard-code Bronin's race status.

Paul's answers to the O-1..O-13 open-decision list (2026-10-06; the list lived only in a prior chat, no doc on disk):
- O-1: "ideology position" means party membership (Bronin = his party). Support model switches between general and primary per district; primary is NOT hidden.
- O-1b: No door-result calibration.
- O-2: Race mode is a toggle (on/off), per district.
- O-3: Get the real OR/CT mail-ballot/absentee vote codes; no "n/a" column. (OR is all vote-by-mail.)
- O-4/4b: "Imputation" = fill the missing measured values (blank sci_* rows from unmatched consumer-file records) with the Luna RF/KNN model. Nothing to do with other industries. Uncertainty ranges: not answered, default stays off.
- O-5: "Same as 5" — missing geo-audit values are imputed by the model too; no "Not audited" label (Paul CONFIRMED readings O-5, O-7, O-10 on 2026-10-06).
- O-6: Preset names approved ("Mixed-support streets", "Supporter turnout", "Voter identification").
- O-7: Paul did not understand it. Agent reading: the copied Luna code checks for Colorado's exact row count/file hash; the copy must take per-district values. Covered by the FLEXIBLE ruling; locked original untouched.
- O-8: No 12-hour Colorado rerun. Imputation is applying the model, not a 12-hour job; a run that long means something is wrong.
- O-9: NEVER strip personal data. ALL DATA ALWAYS SHOWN. Run locally on full data; no de-identified pod run.
- O-10: Lumping party W (Working Families) into "other" "makes no sense" — show every party code as itself (agent reading).
- O-11: Numeric partisan and support layers ARE kept in the overall score.
- O-12: There is no second industry; drop the question. Only CUA exists; the config supports more when Paul defines them.
- O-13: Yes, extract the zips to Downloads\terrier-sources\.

2026-10-06 later: Paul APPROVED Census downloads (TIGER 2020 tabblock20 for OR/CT/CO + street files for OR-05/CT-01 counties). 2026-10-07: Paul APPROVED (a) the weights below and "Mixed-support streets" = sum over voters of (1 - |2s - 1|) x voting chance; (b) Census 2025 edition block + boundary files (CT planning-region codes), census.gov only; (c) skip CO's GPU fill step for OR/CT. The blueprint review session (2026-10-06) edited the blueprint in place (changelog + "Open for Paul" at bottom; Phase 0 CO baseline gate; real line numbers bundles.py:213, bundle_v4.py:24). Paul also asked for a top-level terrier/ folder in the Obsidian vault holding all Terrier notes. 2026-10-08 19:30 BUILD COMPLETE: live CO 8767 (nothing withheld, swapped by Paul 19:16; backup .local\backups\pre-unmask-20261008T191642; rollback _build\swap_co_live.ps1 -Rollback, old code 7d1874e), OR-05 8775 and CT-01 8777 running (30/25/25/20 with candidate support, Needs-a-push default street plan, every area shown). CO baseline re-recorded and committed c452df2; origin main = claude/walk-list = c452df2. OPEN for Paul: primary-mode choice (Default/A/B/C) + unaffiliated voters per state; the map side panel's "Registration mix" still lumps minor parties as Other (follow-up). 2026-10-08 Paul NO-WITHHOLDING RULING: "nothing should ever be withheld": remove the under-20-people/10-households area suppression (hatch, null density, withheld flags) in EVERY district incl. Colorado (Paul-ruled intended CO diff). Plan at session scratchpad nowithhold/PLAN.md. Terrier remote = PRIVATE https://github.com/pjg93-222/Geo (Paul: "The repo should be the folder name geo"); claude/walk-list pushed 2026-10-08 at 1ab8d2c after a full-history privacy scan (clean), default branch claude/walk-list; remote main is a one-commit "# Geo" placeholder (not force-pushed; ask Paul). Push after each landed commit. 2026-10-08 Paul TARGETING RULING: canvass "the people who need a reminder or push, not those who we are sure are going to vote and are sure that they are going to vote our way". Built as "Needs a push" = (1 - |2s - 1|) x p + s x (1 - p) per person (s = support, p = participation; 0-1), the DEFAULT street-plan preset for candidate districts, plus a people-list column/sort and print column; the overall score is unchanged. 2026-10-07 overnight: Paul away; blanket permission for this lane: "keep going, I give you permission to proceed on any task that needs my guidance, just keep a simple repository on any changes you make". Change record = TER\OVERNIGHT_CHANGES_2026-10-07.md. Phase 3 model ruling (Paul): SAME RF/KNN types + frozen settings TRAINED ON EACH DISTRICT'S OWN DATA; never Colorado-fitted models for OR/CT; refit sped up with RF n_jobs=4 (proven identical trees). Phase 2 DONE (OR/CT stores built, R7 CO gate passed). Phase 3 runner: TER\_build\run_fast.ps1 (detached; status run_fast.status.jsonl); first run failed at or-05 hmfit (timeout), being fixed. 2026-10-07 later: Paul APPROVED one server process per district (CO 8767, OR 8775, CT 8777; header menu jumps between them), walk-list Abs wording (OR "Abs = mail ballots (Oregon votes by mail; every recorded vote counts)", CT "Abs = absentee or mail ballots (A or M)"), and the extra census.gov downloads (OR/CT SLDL+SLDU, TIGERweb ZCTA). Build state: Phase 0 CO gate committed 609385d (tools/co_baseline.py, tests/fixtures/co_baseline.json); vault terrier/ folder bba3940; venv NOT broken (crash 0xC000070A = Py3.12 WMI query timeout under load, see `python312-wmi-crash-0xc000070a-2026-10-07`; Terrier entry scripts disable the WMI query; spare work\.venv-20261007, no swap). Phase 3 DONE, committed bbebf92: OR 86.64% vs 77.89% most-common, CT 87.39% vs 77.91%. Vault updated (vault PR #11). Phase 3b in progress (plan scratchpad phase3b/PHASE3B_PLAN.md; Lane 0 merged 99664d5); plans in session scratchpad phase2/PHASE2_PLAN.md and phase3/PHASE3_PLAN.md (lead rulings R-1..R-10 appended). Earlier: agent PROPOSED overall weights for districts with a candidate: Industry alignment 30 / Candidate support 25 / Participation 25 / Sphere 20; districts without a candidate (CO) keep 40/35/25. Blueprint: cu-geography-v3\TERRIER_MULTIDISTRICT_BLUEPRINT_2026-10-06.md. Vault notes committed 8d5e768 (projects/terrier.md, discussions/2026-10-06-terrier-rulings.md).

**Why:** Paul wants one system that handles any district/industry/candidate without rebuilds, and no data hidden or stripped.
**How to apply:** design and code everything config-first; CO CD-05 outputs must stay byte-identical by default; run locally with all data shown (O-9 supersedes the old "pod only de-identified" note for this lane). Explain any open item in plain words; Paul rejected jargon-heavy items (O-7, O-10, O-12). Opus designs, Sonnet builds.

Related: `luna-stratified-scaling-review-2026-09-29`, `cu-row-framework-2026-09-30`, `pod-for-memory-heavy-tasks-2026-09-30`, `ask-before-substantive-changes`, `brainlink-knowledge-system-2026-10-05`.

## Possible Connections

- [[2026-10-06-terrier-rulings]] — holds an earlier version of this memory file; this note carries the newer text
- [[terrier]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-08 from the Claude Code memory file `terrier-multidistrict-lane-2026-10-06.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-10-06-terrier-rulings]], [[terrier]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
