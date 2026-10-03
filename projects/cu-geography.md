---
type: project
name: "CU-geography"
aliases: ["CU geography", "Luna RF/KNN"]
description: "Codex-run credit-union geography project (outputs dir cu-geography; V3 copy cu-geography-v3): Luna stratified RF/KNN data-completion model (closed 2026-09-30, current export = section 30 GPU model, holdout used twice) and the CU row framework assessing and ranking all 491,308 rows under Paul's four groups (P0 aggregate build done, P1 populated 2026-10-01, app wiring awaits his review)."
status: "active"
deadline: ""
progress: "Luna model lane CLOSED 2026-09-30 (section 30 current). Row framework: P0 aggregates DONE 2026-10-01; P1 parquet + no-floor area CSV + V3 backend DONE; V3 frontend PARTIAL; app wiring and swap-in await Paul's review."
blockers:
  - "Paul's review of the V3 app and framework before wiring (W1-W6, D8) and before swapping V3 in for the live app on 8765"
  - "Paul's action: confirm Runpod pod terminated and delete the /workspace network volume (bills until deleted)"
  - "Rust is not installed locally; installing it is Paul's call"
  - "No untouched labelled data remains (split-2 holdout used twice), so further model changes cannot be validated honestly without new labels"
action_items:
  - description: "Finish V3 frontend: spelling fixes, no-floor wiring, fidelity loop (up to 3 rounds against the approved renders) and checks"
    status: "in_progress"
    deadline: ""
    owner: "Codex lane (Sonnet xhigh builds, Opus high verifies)"
  - description: "Paul reviews the framework and V3 app; then integrate the framework with the Credit Union Geography app (wiring W1-W6, D8)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Decide whether to swap V3 (isolated copy on 8766) in for the live app on 8765"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Confirm in the Runpod console that the pod is terminated and delete the /workspace network volume"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Optional ruling on credit_card_user GPU fills (-0.14 pp blank-mix estimate; recommended: keep)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Pre-register the 3 Nov 2026 turnout check (council default)"
    status: "todo"
    deadline: "2026-11-03"
    owner: "Codex lane"
  - description: "Run P1 populate (rowfw_build.py --phase P1) once C: has >= 5 GB free; independent verify; docs addendum (superseded: P1 parquet reported DONE at end of 2026-10-01)"
    status: "done"
    deadline: ""
    owner: "Codex lane"
focal_points:
  - "[[paul-goff]]"
related_topics:
  - "[[2026-09-feature-cu-geography-luna-and-row-framework]]"
related_actors:
  - "[[quant-model-evaluation-skill]]"
  - "[[runpod-pod]]"
related_teams: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-row-framework-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-row-framework-2026-09-30.md", sha256: "d7f07745e795faa8dadec2fef7f0f193f6ad03914bd6a65b82c2bd6c28fd2e79"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/luna-stratified-scaling-review-2026-09-29.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\luna-stratified-scaling-review-2026-09-29.md", sha256: "fa047e83455b71681045d3bcee783f50bb00e230f3fc0b1e0ebc5d5b44dc0d7d"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# CU-geography

> Codex-run credit-union geography project: the Luna stratified RF/KNN data-completion model (closed 2026-09-30) and the CU row framework that assesses and ranks all 491,308 rows under Paul's four groups, feeding the Credit Union Geography app (Django + React/MapLibre).

## Overview

- Location: Luna root / ROOT = `C:\Users\pgoff\Documents\Codex\2026-09-27\we-are-going-to-have-an\outputs\cu-geography` (not covered by the Melange brain; only dead end DE-047 is in the brain). Isolated V3 copy: `outputs\cu-geography-v3` (own `.local`, previewed on 8766). Aliases: "CU geography", "Luna RF/KNN".
- The app is ROOT itself: Django + React/MapLibre on port 8765, launched by `Start.ps1`. It does not read model exports, and its bundle validator rejects modelled fields. Paul's live app on 8765 is never touched by the V3 build.
- Full lane detail, history, numbers and rulings: [[2026-09-feature-cu-geography-luna-and-row-framework]]. Evaluation method: [[quant-model-evaluation-skill]] (row framework run through `/quant-model-evaluation`, 2026-09-30). Holdout discipline: [[single-look-holdout-discipline]]. Heavy rounds ran on the [[runpod-pod]]; decision maker [[paul-goff]].
- Two sub-lanes:
  1. Luna RF/KNN data completion: CLOSED 2026-09-30. Current export `data-completion-gpu-model-20260930` (section 30, 851 columns, written by `.local\gpu-publish-20260930\gpu_publish.py`). Status mix: household-model 875,850 fills (13 fields); GPU model 449,343 (8 fields); household copy 0; majority-default 238,653 fills (79,551 in each of `sci_cpi_insurance_auto_index`, `sci_cpi_insurance_index`, `sci_cpi_online_pay_index`). Accuracy on the reused test check 80.975 to 81.001 (rare-code repair) to 85.698 (household copy) to 86.713 (household model) to 86.797% (GPU); holdout 86.673 to 86.760%. Holdout used twice, no untouched labelled data remains. Household information added about +3 pp, bigger models about +0.1 pp: the ceiling is information, not capacity.
  2. CU row framework: Paul's four groups (in `ROOT\CONVERSATION_REQUESTS.md`: Credit Union Alignment R013/R015/R017; Participation Index = 10 `sai_*` scores R018; Sphere of Influence R018/R019; Partisan Alignment = 11 fields R018). P0 = aggregate-only build (DONE 2026-10-01); P1 = per-row sidecar `row_scores` parquet keyed by `model_source_row` (Paul: "Go, populate", 2026-10-01; parquet DONE); app wiring W1-W6 waits for Paul's review (D8).
- Paul's request (2026-09-30, verbatim in part): "develop the framework used to assess and rank all of the rows within the dataset", then "once I have given you the go-ahead ... populate the dataset using the model we have developed", then "once I have given it a review, we will integrate the framework with the dataset within the Credit Union Geography app".
- Per-person scoring: requested in R004 and R026, authorised in R021 ("Proceed", after an assistant refusal). Never relitigate it. R016: Paul hates excluding his fields on theory.

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none set (pre-registered turnout check 3 Nov 2026 is a council default, unratified) |
| Progress | Luna lane closed 2026-09-30; P0 DONE 2026-10-01; P1 parquet, no-floor area CSV (D4, local-only) and V3 backend (8766) DONE; V3 frontend PARTIAL (agent stopped); fidelity loop, spelling fixes, no-floor wiring and checks pending |

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Finish V3 frontend: spelling fixes, no-floor wiring, fidelity loop (up to 3 rounds against the approved renders), checks | in_progress | | Codex lane (Sonnet xhigh builds, Opus high verifies) |
| Paul reviews framework + V3; then wire into the app (W1-W6, D8) | todo | | [[paul-goff]] |
| Decide whether to swap V3 (8766) in for the live app (8765) | todo | | [[paul-goff]] |
| Confirm Runpod pod terminated; delete the /workspace network volume | todo | | [[paul-goff]] |
| Optional ruling on `credit_card_user` GPU fills (-0.14 pp blank-mix estimate; recommended: keep) | todo | | [[paul-goff]] |
| Pre-register the 3 Nov 2026 turnout check (council default) | todo | 2026-11-03 | Codex lane |
| P1 populate (`rowfw_build.py --phase P1`) once C: has >= 5 GB free, verify, docs addendum | done | | Codex lane |

> Action items are defined in the frontmatter (`action_items` field) to enable Dataview queries. The table above is a visualization for readability.

**Dataview query — pending items for this project:**

```dataview
TABLE WITHOUT ID
  item.description AS "Item",
  item.status AS "Status",
  item.deadline AS "Deadline",
  item.owner AS "Owner"
FROM "projects"
WHERE file.name = this.file.name
FLATTEN action_items AS item
WHERE item.status != "done"
SORT item.deadline ASC
```

## Blockers

- Paul's review gates: P1 and app wiring follow `ask-before-substantive-changes` (Paul set the gates himself); wiring W1-W6 waits for his review (D8); swapping V3 in for the live app is his call.
- Open Paul action: confirm the Runpod pod is terminated and delete the `/workspace` network volume (it bills until deleted; holds the de-identified upload plus ~707 MB of non-chosen models). The runpod plugin MCP was never signed in. Paul said "drop the pod" on 2026-09-30, but the pod was already unreachable over SSH (timeout), so it could not be terminated by the lane. Later rule (2026-09-30 evening) for this lane: "Move on out of the pod" and "Bring everything out with it"; ask Paul before using any pod again; "never stop the pod" stands (see [[runpod-pod]]).
- Disk: C: fell to 3.56 GB against the 5 GB floor on 2026-10-01 (P1 writer stopped); later cleared (pod recovery 0.8 GB deduped; Codex disk-cleanup scan).
- Rust is not installed; installing it is Paul's call.
- No untouched labelled data remains (split-2 holdout used twice), so further model changes cannot be validated honestly without new labels.

## Key facts

### Machine and tooling
- Working python: `C:\Users\pgoff\AppData\Local\Programs\Python\Python312\python.exe` with PYTHONPATH UNSET and PYTHONNOUSERSITE=1 (the mixed venv PYTHONPATH was linked to a pandas crash). xgboost is not installed locally.
- Luna Git Bash runs need `PYTHONPATH = <ROOT>\.local\model-study\.venv\Lib\site-packages;<ROOT-parent>\work\.venv\Lib\site-packages` for sklearn 1.9.1 with the codex runtime python.exe; PowerShell runs worked without it.
- Handoffs: `LUNA_HANDOFF.md` ("Review findings and follow-up" section); `outputs\cu-geography-v3\HANDOFF_2026-10-01.md` (read first for V3).

### Luna stages and exports (sections)
| Section | Export / stage | Notes |
|---|---|---|
| 22 | FACTUAL "Updated 2026-09-29" (line 901) | its own date line, not a stale header |
| prior-corrected | `data-completion-prior-corrected-20260929` from `.local\prior-corrected-repair-20260929` (`prior_repair.py`) | 80.941 / 81.001 / 81.075% on B / test / stress; 1,154 fills reverted; majority-default marking of 13 fields (832,771 fills) |
| 28 | `data-completion-household-copy-20260929`, stage `.local\household-copy-20260929` | 15 fields, 498,794 copies, 92,667 changed a fill; superseded, no copies remain |
| 29 | `data-completion-household-model-20260930`, stage `.local\household-model-20260930\household_model.py` | 848 columns; 1,107,753 fills in 17 fields |
| 30 | `data-completion-gpu-model-20260930` (current) | 851 columns; 449,343 GPU fills; stage `.local\gpu-round-20260930`, remote `/workspace/luna-round3`; `GPU_MODEL_COMPLETION.md`, handoff item 9 |

- Stratified-scaling stage `.local\stratified-scaling-20260929` is locked; its lock hashes `revised.py` and `train_revised.py`: never edit them in place.
- Round 3: 69 MB de-identified upload, fields aliased `field_00..25` ("phone" in iphone hit the identifier check); 8 fields chosen (cpi_auto, cpi_donor, cpi_liberal, credit_card_user, partyaff_democrat, adults, owner_renter, dwelling); holdout (2nd use) +0.087 pp (95% +0.073..+0.100); B, test, stress about +0.08; reweighted blank estimate +0.098; deploy yes; pod re-scoring of 24k rows exact, own recheck 0 mismatches.
- Household model phase A holdout: 86.673% vs 85.664% (+1.009 pp, 95% +0.959..+1.060), legacy 80.935%; reused checks B +0.98, test +1.02, stress +1.14 pp; blank gain +0.88 pp reweighted (+1.01 unweighted); independent re-scoring of 51k rows max diff 8e-8; shuffled-household control within +/-0.6 pp of legacy.
- Household copy: expected gain on actual blanks about +2.1 pp (+2.138 reweighting, +2.058 calibration cross-check; always quote both, never the +4.7 alone); 20.9% of blanks sit in groups of 200+.
- Metadata: two `historical-notes` passes of `gpu_publish.py`; backups in `.local\gpu-publish-20260930\backup`; 28 dictionary paths plus 1 registry path amended; manifest 2 amendments, 21 entries match disk; verify PASS.
- Brain: Paul chose the Melange brain; DE-047 logged via `brainctl deadend`, commit 7e17617.

### Row framework layout and results
- Stage RF = `ROOT\.local\row-framework-20260930`: de-identified `cache\inputs.parquet` (sha cece066c..., 802 columns); `design\SPEC_DRAFT.md` (decisions D1-D9); `build\rowfw-1.0.0` (frozen PLAN, criteria, config; tests T00-T18; `docs\RESULTS_FOR_PAUL.md`, `METHODS.md`, `tests\SUMMARY.md`; `rowfw\populate.py`; `tools\p1_determinism.py`; `RULINGS.md`; DEVIATIONS D1/D2).
- P0 verdicts: SURVIVES T00-T02, T04, T10, T17; WOUNDED T05-T07, T13-T16; KILLED as written (second reader, no score defect) T03, T18, T09, T12; UNVERIFIED-HERE T11.
- P0 findings: overall top decile 42.1% registered R (27.4% of the file), 98.1% grade A; Sphere top decile 98.9% volunteers under 45/45/10; CUA rho 0.698 with CPI volume; recession sensitivity item-rest correlation -0.35.
- Disclosure fix: areas could be rebuilt by subtraction; DEVIATIONS D1 (cross-level suppression); with "Registration basis only" (D1 ratified, D2 logged) 6,031 of 9,017 registration blocks can be published (was 3,647).
- Paul's rulings: overall "40/35/25 lobbyist"; "Expected value + variant"; Sphere 45/45/10 (ratified 2026-10-01); recession + kept (ratified); "CO-05 is a republican district" (no skew warnings); "Lets use the estimated data"; "every person should have a profile in the dataset" (profiles parquet); UI via Higgsfield, "Use GPT Image 2", renders win ("follow the design verbatim, with the actual data imputed"). Council defaults (unratified): CUA credit theme .40 (cc .16, card .16, recession .08), other themes .20; Participation 1/4 per theme; counts and heatmaps use summed P(top10); suppression below 20 people or 10 households; standings within registration group; geometric mean and CU gate retired.
- Workflows: `wf_574dbb9a-61c` (P0 build re-launch after council), `wf_84324f95-f08` (baseline, P1 with profiles, latency audit S1-S3, profile design, HTML mock-ups, superseded), `wf_0e3d7640-c3d` (V3 build in `outputs\cu-geography-v3`, previewed on 8766, DEMO MODE screenshots with synthetic names and real scores). Council = data scientist, mathematician, lobbyist, policymaker; the Codex external critique was ABSENT (CLI 0.159.0 vs adapter 0.146.0).
- Higgsfield renders (plan plus; 21.65 credits before, 2.4 after; gpt_image_2_5 high 2k 16:9, 2.75 credits each) in `RF\ui\higgsfield\png\`: 01-map-overview-v2, 02-person-profile, 03-ranked-list, 04-area-detail, 05-household-street, 06-performance-states. Invented content to replace with real data: fake profile fields, "+12 Lean D" (should be Centre), generic range bars.
- Pod history for this project: first pod `root@103.196.86.181 -p 57215` (H200 141 GB, 192 cores, ~2 TB RAM) used for Luna round 3; later pod `root@81.27.69.177 -p 36669` (shared with `/workspace/forecast`, capped ~48 CPUs, ~468 GiB RAM, 30 GB disk) never received row-framework data. Codex was running the full recovery to `C:\Users\pgoff\Melange-Pod-Recovery\20260930` (32 parts, 38.7 GB raw; C: had ~33 GB free); the duplicate copy by this lane was stood down.

## Timeline

| Date | Event |
|---|---|
| 2026-09-29 | Stratified-scaling stage locked; prior-corrected repair; majority-default marking (13 fields); volunteer left unmarked; DE-047 logged (7e17617) |
| 2026-09-30 | Household copy (section 28), household model (section 29), GPU round 3 (section 30) published; lane closed; "drop the pod"; row framework requested; council; P0 launched; "Move on out of the pod" (evening) |
| 2026-10-01 | P0 DONE; "Go, populate"; P1 writer built then P1 parquet DONE; renders approved; V3 backend DONE, frontend PARTIAL; end-of-day handoff |

## Focal Points

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Related Topics

| Topic | Relation |
|---|---|
| [[2026-09-feature-cu-geography-luna-and-row-framework]] | CU-geography: Luna RF/KNN review closed 09-30 (section 30 GPU model current) plus the 491,308-row framework in Paul's four groups (P0/P1). |

## Related Actors

| Actor | Relation |
|---|---|
| [[quant-model-evaluation-skill]] | General read-only skill for evaluating models, numbers and claims; merged to main c13f3a5d4 (2026-09-30); Melange gates in a binding. |
| [[runpod-pod]] | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model
