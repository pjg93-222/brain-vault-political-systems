---
type: topic
title: "CU-geography Luna model and row framework"
aliases: ["CU-geography Luna model and row framework"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[quant-model-evaluation-skill]]"
  - "[[runpod-pod]]"
objective: "Record the Luna stratified RF/KNN data-completion lane (closed 2026-09-30; current export = section 30 GPU model, holdout used twice) and the CU row framework that assesses and ranks all 491,308 rows under Paul's four groups (P0 aggregate build done; P1 populated; app wiring awaits his review)."
created_at: 2026-09-29
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-row-framework-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-row-framework-2026-09-30.md", sha256: "d7f07745e795faa8dadec2fef7f0f193f6ad03914bd6a65b82c2bd6c28fd2e79"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/luna-stratified-scaling-review-2026-09-29.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\luna-stratified-scaling-review-2026-09-29.md", sha256: "fa047e83455b71681045d3bcee783f50bb00e230f3fc0b1e0ebc5d5b44dc0d7d"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# CU-geography Luna model and row framework

> Two linked lanes in the Codex-run credit-union geography project: the Luna stratified RF/KNN data-completion model review (CLOSED 2026-09-30, current export = section 30 GPU model) and the CU row framework that assesses and ranks all 491,308 rows with Paul's four groups (P0 aggregate-only build DONE, P1 populate done 2026-10-01 but the V3 app frontend is partial).

## Context

- Project: [[cu-geography]]. Luna root (also called ROOT): `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs\cu-geography`. It is NOT covered by the Melange brain (only dead end DE-047 lives there). The handoff `LUNA_HANDOFF.md` has a "Review findings and follow-up" section.
  - Correction 2026-10-18 (checked on disk 2026-10-18): the Luna root moved on 2026-10-09 with the Terrier project and is now `C:\Users\pgoff\Documents\Terrier\outputs\cu-geography`. The old `Documents\Codex\2026-09-27\we-are-going-to-have-an` path is a directory junction to `Documents\Terrier`, so this path still resolves.
- The app is ROOT itself: Django + React/MapLibre on port 8765, launched by `Start.ps1`. It does not read model exports, and its bundle validator rejects modelled fields.
- Decision maker: Paul Goff approved each change explicitly in chat (an earlier executor dispatch was blocked by the auto-mode classifier until he did). The row-framework work was run through the [[quant-model-evaluation-skill]] (`/quant-model-evaluation`, 2026-09-30).
- Heavy modelling rounds used the [[runpod-pod]] (RunPod H200 pod) under approved de-identified-data scope; the row-ranking lane then moved off it ("Move on out of the pod", 2026-09-30 evening) and works locally.
- The discipline that governs the holdout (used twice, no untouched labelled data remains) is [[single-look-holdout-discipline]].
- Related memory notes (not vault entities): `luna-stratified-scaling-review-2026-09-29`, `cu-row-framework-2026-09-30`, `pod-for-memory-heavy-tasks-2026-09-30`, `runpod-claude-sessions-2026-09-30`, `ask-before-substantive-changes`, `trend-over-significance-2026-09-26`, `verify-dont-infer-completion-2026-08-04`, `codex-overnight-poll-loop-burn-2026-09-13`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[quant-model-evaluation-skill]] | General read-only skill for evaluating models, numbers and claims; merged to main c13f3a5d4 (2026-09-30); Melange gates in a binding. |
| [[runpod-pod]] | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

## Related Projects

- [[cu-geography]] - Codex-run CU geography lane: Luna RF/KNN model (closed 09-30) and 491,308-row ranking framework in Paul's four groups.

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model

## History

| Date | Event |
|---|---|
| 2026-09-29 | Stratified-scaling stage (`.local\stratified-scaling-20260929`) is locked and unchanged; its lock hashes `revised.py` and `train_revised.py` (never edit in place). Export then current: `data-completion-prior-corrected-20260929` (stage `.local\prior-corrected-repair-20260929`, `prior_repair.py`, report `PRIOR_CORRECTED_REPAIR.md`). |
| 2026-09-29 | Paul decision 1 (prior-corrected repair): legacy balanced-weight RF mass for children D and dwelling G multiplied by training prevalence before restore; fills equal the accuracy-correction export (1,154 fills reverted); deployed accuracy 80.941 / 81.001 / 81.075% on B / test / stress. |
| 2026-09-29 | Majority-default marking, Paul "option one": 13 fields with lift < 0.5 pp on all three checks; 832,771 majority-code fills got status `estimated_majority_default`. `sci_ct_volunteer_chtyorg` split (+0.69 / +0.335 / +0.14 pp), NOT marked. |
| 2026-09-29 | Metadata fixes (decision 2): `technical-repairs.json` corrected and added to the stratified manifest; backups in `.local\stratified-scaling-20260929\review\backup`; review evidence scripts and receipts in `review\`. Next-stage fixes drafted in `.local\next-stage-fixes-20260929\fixes.py`. |
| 2026-09-29 | Later: Paul ruled volunteer stays unmarked (handoff item 6); wording regenerated via `reword` and `refresh-manifest` modes of `prior_repair.py`; verify re-ran and PASSED; manifest carries an amendment note; stale `sign_check.py` docstrings fixed. |
| 2026-09-29 | Brain: Paul chose the Melange brain; entry logged as DE-047 via `brainctl deadend`, auto-committed as commit 7e17617. |
| 2026-09-29 | Household copy stage (`.local\household-copy-20260929`) built; published 2026-09-30 as FACTUAL section 28 (Paul's "option 1"). |
| 2026-09-30 | RunPod + round 3: pod set up, de-identified upload approved, round 3 (RF 500 trees, GPU XGBoost) run; 8 fields chosen; holdout second use +0.087 pp; PUBLISHED as section 30. |
| 2026-09-30 | Household model (option 2 + true household ID + untouched holdout): phase A done; phase B PUBLISHED as section 29 (1,107,753 fills in 17 fields). |
| 2026-09-30 | Paul said "drop the pod"; the pod was unreachable by SSH (timeout). Lane CLOSED: current export = section 30; every export note is current or marked historical (independently verified). |
| 2026-09-30 | Row framework requested by Paul via `/quant-model-evaluation`; stage RF built; P0 build workflow launched; council of four voices and Paul's rulings (late evening); build re-launched as `wf_574dbb9a-61c`. |
| 2026-09-30 evening | Paul: "Move on out of the pod" for the row-ranking lane; ranking framework built and tested locally. |
| 2026-10-01 | P0 DONE (aggregates only). Paul: "Go, populate"; P1 writer built but not yet run (disk floor); later P1 parquet DONE. Renders approved, V3 build started; END OF DAY handoff `outputs\cu-geography-v3\HANDOFF_2026-10-01.md`. |

## Decisions

- Luna lane closed 2026-09-30: the current export is `data-completion-gpu-model-20260930` (section 30, 851 columns); further model change cannot be validated honestly without new labels (holdout used twice).
- Prior-corrected repair (Paul decision 1, 2026-09-29): multiply the legacy balanced-weight RF mass for children D and dwelling G by training prevalence before restoring it.
- Majority-default marking (Paul "option one", 2026-09-29): mark fills on the 13 fields with lift < 0.5 pp on all three checks as `estimated_majority_default`.
- Volunteer unmarked (Paul, 2026-09-29): `sci_ct_volunteer_chtyorg` stays unmarked (item 6 of the handoff).
- Metadata fix (decision 2): technical-repairs.json corrected and added to the stratified manifest.
- Household copy (Paul "option 1", 2026-09-30) -- ~~published as the current completion~~ superseded the same day by the household model (section 29) and then the GPU model (section 30); no copies remain (kept because the sections 28 notes and `historical-notes` markings refer to it).
- Household model design: option 2 + true household ID + untouched holdout (Paul, 2026-09-30).
- Paul answered "Yes" to a DE-IDENTIFIED upload to the pod (model inputs, labels, splits, household features; no names, emails, addresses or IDs) and "All of it, get it done" to round 3. The raw source CSV stays local.
- Never stop or terminate the pod without Paul (standing; see [[runpod-pod]]).
- Row framework, Paul's requests (2026-09-30, verbatim in part): "develop the framework used to assess and rank all of the rows within the dataset"; then "once I have given you the go-ahead ... populate the dataset using the model we have developed"; then "once I have given it a review, we will integrate the framework with the dataset within the Credit Union Geography app".
- Per-person scoring was requested in R004 and R026 and authorised in R021 ("Proceed", after an assistant refusal). Never relitigate it. R016: Paul hates excluding his fields on theory.
- Council + Paul rulings (2026-09-30 late):
  - overall "40/35/25 lobbyist" (CUA/Participation/Sphere standings);
  - "Expected value + variant" (store the available-case and MAR variants);
  - Sphere, "leaning toward Give 45/ Vol 45/ House 10" (his reason: volunteers engage members of Congress and stick around). RATIFIED 2026-10-01: "Sphere 45/45/10 kept".
- Paul rulings 2026-10-01: "Go, populate"; recession + kept (ratified); "Registration basis only" for blocks (D1 ratified; D2 logged).
- Paul words 2026-10-01 (later): "CO-05 is a republican district" (R-heavy top list expected: add no skew warnings); "Lets use the estimated data" (no "insufficient evidence" display and no CPI-blank hatching; grade and % measured stay as plain columns); "every person should have a profile in the dataset" (P1 adds a profiles parquet; a profile page is in the mock-ups); UI review "using higgsfield" (reduce latency, enhance presentation, mock-ups, present systems).
- UI: Paul "Use GPT Image 2" (gpt_image_2_5 high 2k 16:9 at 2.75 credits each); "Those renders are beautiful, lets make sure to follow the design verbatim, with the actual data imputed" -- the renders WIN; the earlier HTML mock-ups from `wf_84324f95-f08` are superseded by the renders.
- Model rule for the V3 build: build Sonnet xhigh, verify Opus high.
- Pod: Paul said "Move on out of the pod" and "Bring everything out with it". Codex was already running the full recovery to `C:\Users\pgoff\Melange-Pod-Recovery\20260930` (32 parts, 38.7 GB raw, with disk guards; C: had ~33 GB free); the duplicate copy by this lane was stood down. That recovery belongs to the other lane.
- Retired from the framework: the geometric mean and the CU gate.
- Council defaults (UNRATIFIED): see "Council defaults" below.
- ~~Use the pod hard for memory/RAM tasks~~ (2026-09-30, Paul: "go hard on it") -- superseded for this lane the same evening by "Move on out of the pod"; ask Paul before using any pod again.

## Next Steps

- [ ] Paul's open action: confirm in the Runpod console that the pod is terminated and delete the `/workspace` network volume (it bills until deleted; holds the de-identified upload plus ~707 MB of non-chosen models). The runpod plugin MCP was never signed in. (Status of the volume after later pod work is not stated; note the later rule "never stop the pod" in [[runpod-pod]].)
- [ ] Optional ruling: `credit_card_user` GPU fills pass the gate but have a -0.14 pp blank-mix estimate (disclosed; recommendation: keep).
- [ ] Optional: DE-048 brain entry ("model capacity is not the bottleneck") was offered, not drafted.
- [ ] Housekeeping noted: a 1.1 GB rehearsal folder sits in the session scratchpad (never delete scratchpads unasked); the caveman-init rule files are untracked in the Melange worktree `codex-websocket-error-468fa9`.
- [ ] Any follow-up to the current export is a code change in the stage script (`gpu_publish.py`) followed by a regeneration (see Rules).
- [ ] Row framework: apply the D1 cross-level suppression decision (DEVIATIONS D1 awaited Paul; D1 later ratified: "Registration basis only").
- [ ] P1: resume once C: has >= 5 GB free: a fresh agent runs `rowfw_build.py --phase P1` (draws rerun about 1.5 h, deterministic), then the independent verify, then the docs addendum (superseded by "P1 parquet DONE" at end of 2026-10-01; kept as the recorded resume procedure).
- [ ] V3 frontend (PARTIAL, agent stopped): spelling fixes, no-floor wiring, fidelity loop (up to 3 rounds against the renders) and checks are pending.
- [ ] Swapping the isolated V3 copy in for the live app is Paul's call. App wiring (W1-W6) waits for his review (D8).
- [ ] Rust is not installed; installing it is Paul's call.
- [ ] On resume: read `build\rowfw-1.0.0\tests\SUMMARY.md` and `docs\RESULTS_FOR_PAUL.md`; present the D1-D9 defaults and their measured consequences; write no row-level file until Paul says go (P1 go was given 2026-10-01).

## Luna stratified RF/KNN lane

### Environment
- Git Bash runs need `PYTHONPATH = <ROOT>\.local\model-study\.venv\Lib\site-packages;<ROOT-parent>\work\.venv\Lib\site-packages` for sklearn 1.9.1 with the codex runtime python.exe. PowerShell runs worked without it.

### CLOSE-OUT 2026-09-30 (read this first)
- Current export: `data-completion-gpu-model-20260930` (section 30, 851 columns), written by `.local\gpu-publish-20260930\gpu_publish.py`.
  - Status mix: household-model 875,850 fills (13 fields); GPU model 449,343 (8 fields); household copy 0.
  - Majority-default 238,653 fills, 79,551 in each of `sci_cpi_insurance_auto_index`, `sci_cpi_insurance_index` and `sci_cpi_online_pay_index`.
- Accuracy on the reused test check: 80.975 to 81.001 (rare-code repair) to 85.698 (household copy) to 86.713 (household model) to 86.797% (GPU). Holdout: 86.673 to 86.760%.
- The holdout has been used twice and no untouched labelled data remains, so a further model change cannot be validated honestly without new labels.
- Household information added about +3 pp and bigger models about +0.1 pp: the ceiling is information in the data, not model capacity.
- Metadata: two `historical-notes` passes of `gpu_publish.py`.
  - Backups `*.pre-historical-notes.json` and `*.pre-historical-notes-2.json` are in `.local\gpu-publish-20260930\backup`.
  - Pristine to final = 28 dictionary paths (current_completion_source 8, household_model_note 4, household_copy_note 15, calibration_coverage_note 1) plus 1 registry path (sii_dwelling_type calibration_coverage_note).
  - The manifest carries 2 amendments and its 21 entries match disk. Verify PASS; a rerun writes nothing.
- Independent check (scratchpad `check_notes.py`, stdlib only) confirmed:
  - All 15 household_copy_note entries are prefixed "Historical (section 28): " exactly once.
  - The 10 lift notes on fields with 0 majority-default rows end with "Since sections 29-30 this field is filled by a household-aware model and has no majority-default rows"; the 3 live majority-default fields' notes do not.
  - FACTUAL "Updated 2026-09-29" at line 901 is section 22's own date line, not a stale header.
  - The registry's household_copy.rule (15) and household_model.selection.current_decision (13) stay unmarked by design, because they sit inside their own stage blocks as records.
- Open, Paul's action: confirm in the Runpod console that the pod is terminated, and delete the `/workspace` network volume.
  - The volume bills until deleted. It holds the de-identified upload plus ~707 MB of non-chosen models.
  - The runpod plugin MCP was never signed in.
  - The same pod hosted the lane in `runpod-claude-sessions-2026-09-30`.
- Open, optional: `credit_card_user` GPU fills pass the gate but have a -0.14 pp blank-mix estimate (disclosed; recommended keeping them); the 1.1 GB rehearsal folder in the session scratchpad (never delete scratchpads unasked); the DE-048 entry offered but not drafted; caveman-init rule files untracked in worktree `codex-websocket-error-468fa9`.

### State at end of the 2026-09-29 session (verified by the stage's own verify and an independent check script)
- Stratified-scaling stage `.local\stratified-scaling-20260929`: locked and unchanged; lock hashes `revised.py` and `train_revised.py`, so never edit them in place.
- Export current at the time: `data-completion-prior-corrected-20260929`, from stage `.local\prior-corrected-repair-20260929` (`prior_repair.py`). Report `PRIOR_CORRECTED_REPAIR.md`.
- Prior-corrected repair (Paul decision 1): legacy balanced-weight RF mass for children D and dwelling G multiplied by training prevalence before restoration.
  - Fills equal the accuracy-correction export (1,154 fills reverted).
  - Deployed accuracy 80.941 / 81.001 / 81.075% on B / test / stress.
  - The rare-code probability is exactly 0 on about 90% of children and 83% of dwelling blank rows.
- Majority-default marking, Paul "option one": 13 fields with lift < 0.5 pp on all three checks; 832,771 majority-code fills got status `estimated_majority_default`. `sci_ct_volunteer_chtyorg` is split (+0.69 / +0.335 / +0.14 pp) and is NOT marked.
- Metadata fixes, decision 2: `technical-repairs.json` corrected and added to the stratified manifest; backups in `.local\stratified-scaling-20260929\review\backup`; the review evidence scripts and receipts are in `review\`.
- Next-stage fixes: `.local\next-stage-fixes-20260929\fixes.py` holds three changes:
  - the cached stance read;
  - a `fit_calibration` whose retry is never stricter and which returns its method;
  - `promote_on_development` requiring A1 gain >= 0.001.
- The sign-only A1 rule failed its negative control (donor A1 +0.020 pp). `sign_check.py` shows donor is blocked and dwelling kept; the rule is provisional, based on 2 cases.

### Closed later on 2026-09-29
- Paul ruled that volunteer stays unmarked. The handoff records it as item 6.
- The wording now reads "less than 0.5 pp above the majority baseline, or below it". It was regenerated through the `reword` and `refresh-manifest` modes of `prior_repair.py`; verify re-ran and PASSED, and the manifest carries an amendment note. The stale `sign_check.py` docstrings were fixed too.
- Brain: Paul chose the Melange brain. The entry was logged as DE-047 via `brainctl deadend`, which auto-committed it (commit 7e17617).

### Round 3 on the pod (2026-09-30)
- Setup:
  - The runpod@runpod plugin is installed, but its MCP still needs Paul's OAuth sign-in (needs_auth).
  - An SSH key was generated on the workstation (path and fingerprint in the private notes).
  - Pod: H200 141 GB, 192 cores, ~2 TB RAM, `/workspace` volume. Direct SSH: `root@<first-pod-host> -p <port>`; the ssh.runpod.io proxy is interactive only.
- Paul said "Yes" to a DE-IDENTIFIED upload (model inputs, labels, splits, household features; no names, emails, addresses or IDs) and "All of it, get it done" to the round. The raw source CSV stays local. Never stop or terminate the pod without Paul.
- Round 3 (full training pool, RF 500 trees, GPU XGBoost; stage `.local\gpu-round-20260930`, remote `/workspace/luna-round3`) was dispatched to a Sonnet executor.
  - Design: selection on A1/A2 with a lock; the holdout's SECOND use is disclosed; same deploy gate as before.
  - The executor stopped before local export; publish waited for household-model phase B plus review.
- RESULT: ran on the pod with a 69 MB de-identified upload. Fields were aliased `field_00..25` because "phone" in iphone hit the identifier check.
  - The lock held, and 8 fields were chosen (cpi_auto, cpi_donor, cpi_liberal, credit_card_user, partyaff_democrat, adults, owner_renter, dwelling).
  - Holdout (2nd use): +0.087 pp (95% +0.073..+0.100). B, test and stress all about +0.08. Reweighted blank estimate +0.098. Deploy = yes.
  - Flag: `credit_card_user` has a blank-mix estimate of -0.14 pp.
  - Returns are diminishing: household information gave about +3 pp; bigger models about +0.1 pp.
- PUBLISHED as section 30 (`data-completion-gpu-model-20260930`, 851 columns; `GPU_MODEL_COMPLETION.md`; handoff item 9).
  - 449,343 GPU fills.
  - Pod re-scoring of 24k rows was exact, and the lane's own recheck found 0 mismatches.
  - Historical-notes amendments: done (see CLOSE-OUT).
- The split-2 holdout has now been used twice; no untouched labeled data remains.
- 2026-09-30: Paul said "drop the pod". The pod was already unreachable over SSH (timeout), so the lane could not terminate it itself.
  - Everything needed is saved locally: results, the 8 chosen models, predictions, pod-raw, the upload pack and the published export.
  - Lost if the volume is gone: only the non-chosen candidate models (~707 MB).
  - If `/workspace` was a network volume, the de-identified data may still sit in Runpod storage.

### Household model (option 2 + true household ID + untouched holdout; Paul, 2026-09-30)
- Stage `.local\household-model-20260930\household_model.py`.
- Phase A is DONE and reviewed:
  - Holdout = split-2 labeled rows outside the 20k test sample, frozen with a receipt and scored ONCE. The "dry run" used the reused test sample, not the holdout.
  - Leakage audit passed. The shuffled-household control stays at legacy level.
  - 17 fields chosen on A1/A2.
  - Holdout: new lineup 86.673% vs current 85.664% (+1.009 pp, 95% +0.959..+1.060); legacy 80.935%.
  - Reused checks: B +0.98, test +1.02, stress +1.14 pp.
  - Blank-gain estimate: +0.88 pp reweighted (+1.01 unweighted).
  - The deployment current at the time scored 85.66% on the holdout vs 85.70% on test, so the reused checks were not optimistic.
- Phase B was PUBLISHED as section 29:
  - Export `data-completion-household-model-20260930`, 848 columns; 1,107,753 household-model fills in 17 fields.
  - Verified by the stage's independent re-scoring of 51k rows (max diff 8e-8) and by the lane's own recheck (0 mismatches).
  - The global shuffled-household control stays within +/-0.6 pp of legacy.
- Stale metadata found at section 29 (all RESOLVED by section 30, verified 2026-09-30): children's prior-corrected notes, lift notes on fields without majority-default rows, the handoff "holdout untouched" bullet, and the FACTUAL date.
- The earlier session died mid phase A, and that agent never returned a report.

### Household copy (published 2026-09-30; Paul's "option 1"; superseded by sections 29-30, no copies remain)
- Stage `.local\household-copy-20260929`; export `data-completion-household-copy-20260929`; report `HOUSEHOLD_COPY_COMPLETION.md`; FACTUAL section 28.
- 15 fields chosen on A1/A2 with the promotion gate. 498,794 copies with status `estimated_household_copy`; 92,667 changed a fill.
- Reused-check accuracy 85.589 / 85.698 / 85.660%, up from 80.941 / 81.001 / 81.075.
- Expected gain on actual blanks was only about +2.1 pp, because blanks are less covered and sit in huge address groups (20.9% are in groups of 200+).
  - Two methods agree: household-pattern reweighting +2.138 and calibration cross-check +2.058.
  - Always quote both figures, never the +4.7 alone.
- `__estimate_probability` for copies = training-partition leave-one-out copy accuracy by group-size bucket (2, 3, 4, 5-9, 10-49, 50-199, 200+).
- In groups of 200+, copying was worse than the model for 8/13 fields; a size cap would have added < 0.1 pp.

### Why and how to apply (Luna lane rules)
- **Why:** Paul approved each change explicitly in chat. An earlier executor dispatch was blocked by the auto-mode classifier until he did.
- **How to apply:**
  - Any follow-up is a code change in the stage script (`gpu_publish.py` for the current export) followed by a regeneration.
  - The publish modes refuse to re-add a section, so a follow-up needs a new section or an amend mode; never hand-edit published docs.
  - Rerun scratchpad-style independent checks after every publish.

## CU row framework

Paul's request (2026-09-30, verbatim in part, via `/quant-model-evaluation`): "develop the framework used to assess and rank all of the rows within the dataset", then "once I have given you the go-ahead ... populate the dataset using the model we have developed", then "once I have given it a review, we will integrate the framework with the dataset within the Credit Union Geography app".

### The framework: Paul's four groups (in `ROOT\CONVERSATION_REQUESTS.md`)
| Group | Fields / requests |
|---|---|
| Credit Union Alignment (CUA) | R013 / R015 / R017 |
| Participation Index | 10 `sai_*` scores, R018 |
| Sphere of Influence | R018 / R019 |
| Partisan Alignment | 11 fields, R018 |

- Per-person scoring requested in R004 and R026, authorised in R021 ("Proceed", after an assistant refusal). Never relitigate it. R016: Paul hates excluding his fields on theory.

### Facts and layout
- ROOT = `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs\cu-geography`.
  - Correction 2026-10-18 (checked on disk 2026-10-18): the Luna root moved on 2026-10-09 with the Terrier project and is now `C:\Users\pgoff\Documents\Terrier\outputs\cu-geography`. The old `Documents\Codex\2026-09-27\we-are-going-to-have-an` path is a directory junction to `Documents\Terrier`, so this path still resolves.
- The app is ROOT itself (Django + React/MapLibre, port 8765, `Start.ps1`); it does not read model exports; its bundle validator rejects modelled fields.
- Stage RF = `ROOT\.local\row-framework-20260930`:
  - de-identified `cache\inputs.parquet` (sha cece066c..., 802 columns);
  - `design\SPEC_DRAFT.md` (judge synthesis of the rigor, clarity and wiring specs; decisions D1-D9 with defaults);
  - `build\rowfw-1.0.0` (frozen PLAN, criteria and config; tests T00-T18).
- Working python: `C:\Users\pgoff\AppData\Local\Programs\Python\Python312\python.exe` with PYTHONPATH UNSET and PYTHONNOUSERSITE=1. The mixed venv PYTHONPATH was linked to a pandas crash. xgboost is not installed locally.
- Row count: 491,308 rows assessed and ranked.

### Status 2026-09-30 evening
- The P0 build workflow (freeze -> build + independent reference -> release -> second reader + code review -> fix -> docs) was launched. It writes aggregates only.
- P1 (the per-row sidecar `row_scores` parquet, keyed by `model_source_row`) waits for Paul's go.
- App wiring (W1-W6) waits for his review (D8).

### Council + Paul rulings (2026-09-30 late; build re-launched as run `wf_574dbb9a-61c`)
- Council of four voices (data scientist, mathematician, lobbyist, policymaker); the Codex external critique was ABSENT (CLI 0.159.0 vs the adapter's 0.146.0).
- Paul's rulings:
  - overall "40/35/25 lobbyist" (CUA/Participation/Sphere standings);
  - "Expected value + variant" (store the available-case and MAR variants);
  - Sphere, "leaning toward Give 45/ Vol 45/ House 10". His reason: volunteers engage members of Congress and stick around.

### Council defaults (UNRATIFIED unless stated)
- CUA credit theme .40 (cc .16, card .16, recession .08), other themes .20;
- Participation at 1/4 per theme;
- counts and heatmaps use summed P(top10);
- suppression below 20 people or 10 households;
- standings within registration group;
- pre-register the 3 Nov 2026 turnout check.
- Retired: the geometric mean and the CU gate.

### P0 DONE (2026-10-01; aggregates only; no row-level file)
- Results are in `build\rowfw-1.0.0\docs\RESULTS_FOR_PAUL.md`, `METHODS.md` and `tests\SUMMARY.md`.
- Verdicts:
  - SURVIVES: T00-T02, T04, T10, T17.
  - WOUNDED: T05-T07, T13-T16.
  - KILLED as written, confirmed by the second reader with no score defect: T03 and T18 (test design), T09 (part D-R near zero; Sphere tract 0.894), T12 (conservative tag among D).
  - UNVERIFIED-HERE: T11.
- Findings:
  - The overall top decile is 42.1% registered R (27.4% of the file), and 98.1% of it is grade A.
  - Under Paul's 45/45/10 ruling, the Sphere top decile is 98.9% volunteers.
  - CUA rho 0.698 with CPI volume.
  - Recession sensitivity's item-rest correlation is -0.35.
- The review found a P0 disclosure: areas could be rebuilt by subtraction. It was fixed via DEVIATIONS D1 (cross-level suppression), which awaited Paul. Only 3,647 of 9,017 registration blocks can be published; publishing one basis at block level would keep more.
- Next at that point: Paul's go for P1 (the sidecar), then his review, then app wiring.

### P1 (2026-10-01)
- Paul answered: "Go, populate"; Sphere 45/45/10 kept (ratified); recession + kept (ratified); "Registration basis only" for blocks (D1 ratified; D2 logged). Under D2, 6,031 of 9,017 registration blocks can be published (was 3,647).
- The P1 writer was BUILT but had NOT RUN at the time: it stopped at the 5 GB disk floor (C: at 3.56 GB, still falling). The pod recovery was complete (0.8 GB, deduped); Codex was running a disk-cleanup scan at the time.
- `RULINGS.md`, DEVIATIONS D2, `rowfw\populate.py` and `tools\p1_determinism.py` are ready.
- Resume: once C: has >= 5 GB free, a fresh agent runs `rowfw_build.py --phase P1` (draws rerun about 1.5 h, deterministic), then the independent verify, then the docs addendum.

### 2026-10-01 later
- Paul's words: "CO-05 is a republican district" (R-heavy top list expected: no skew warnings); "Lets use the estimated data" (no "insufficient evidence" display, no CPI-blank hatching; grade and % measured stay as plain columns); "every person should have a profile in the dataset" (P1 adds a profiles parquet; a profile page is in the mock-ups); UI review "using higgsfield": reduce latency, enhance presentation, mock-ups, present systems.
- Workflow `wf_84324f95-f08` runs: the baseline, then in parallel P1 (with profiles) and the latency audit (systems S1-S3), the profile design, and HTML mock-ups in `RF\ui`.
- Rust is not installed; installing it is Paul's call.

### UI (2026-10-01)
- Higgsfield connected (plan plus; 21.65 credits before the run, 2.4 after). Paul: "Use GPT Image 2", which is gpt_image_2_5 high 2k 16:9 at 2.75 credits each.
- Approved renders in `RF\ui\higgsfield\png\`: 01-map-overview-v2, 02-person-profile, 03-ranked-list, 04-area-detail, 05-household-street, 06-performance-states.
- Paul: "Those renders are beautiful, lets make sure to follow the design verbatim, with the actual data imputed". The renders WIN.
- Known invented content to replace with real data: fake profile fields, "+12 Lean D" (should be Centre), and generic range bars.
- Build workflow `wf_0e3d7640-c3d`:
  - works in an isolated copy `outputs\cu-geography-v3` with its own `.local`, previewed on 8766; Paul's live app on 8765 is never touched;
  - all agent screenshots are in DEMO MODE (synthetic names; real scores);
  - the fidelity loop runs up to 3 rounds against the renders;
  - swapping it in for the live app is Paul's call.
- The HTML mock-ups from `wf_84324f95-f08` are superseded by the renders.

### END OF DAY 2026-10-01
- The handoff is `outputs\cu-geography-v3\HANDOFF_2026-10-01.md`; read it first.
- State: P1 parquet DONE; no-floor area CSV DONE (D4, local-only); V3 backend DONE on 8766; V3 frontend PARTIAL (agent stopped); spelling fixes, no-floor wiring, fidelity loop and checks are pending.
- Model rule: build Sonnet xhigh, verify Opus high.

### Pod, row-framework lane
- Paul said "Move on out of the pod" and "Bring everything out with it". Codex was already running the full recovery to `C:\Users\pgoff\Melange-Pod-Recovery\20260930` (32 parts, 38.7 GB raw, with disk guards; C: had ~33 GB free). This lane stood its duplicate copy down. That recovery belongs to the other lane.
- Pod at that time: `root@<math-pod-host> -p <port>`; shared with another session (`/workspace/forecast`); container capped at ~48 CPUs, ~468 GiB RAM and 30 GB disk. Nothing from the row-ranking lane was uploaded to it. Ask Paul before using any pod again.

### Why and how to apply (row framework)
- **Why:** Paul set the gates himself. `ask-before-substantive-changes` applies to P1 and to the wiring.
- **How to apply:**
  - On resume, read `build\rowfw-1.0.0\tests\SUMMARY.md` and `docs\RESULTS_FOR_PAUL.md`.
  - Present the D1-D9 defaults and their measured consequences.
  - Write no row-level file until Paul says go.

## Open questions
- Is the Runpod pod terminated and the `/workspace` network volume deleted? (Paul's action; the pod was unreachable by SSH on 2026-09-30.)
- `credit_card_user` GPU fills: keep (recommended) or drop? (optional ruling)
- Swap V3 in for the live app on 8765, and approve app wiring W1-W6 (D8): Paul's call after his review.
- Rust install: Paul's call.
