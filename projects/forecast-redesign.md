---
type: project
name: "Forecast redesign (Mentat giving forecasts)"
aliases: ["Forecast redesign", "PAC giving accuracy"]
description: "Mentat forecasting program: the 2026-09-29 audit of three console forecasts (regressions re-run in R), the 2026-09-30 'Giving by cycle' (board F2) forecast-view redesign with projections checked for logical validity against backtests, and the PAC-to-candidate giving accuracy refinement (attempt 2, HOLD, UT-X holdout sealed) rooted at C:/melange-data/forecast-redesign-20261001-review."
status: "active"
deadline: ""
progress: "As of 2026-10-04: model audited and reconciled INTACT (2026-10-01); fixes landed in the live tree (not committed); F2 UI live 2026-10-01 10:58:25Z; forecast UI v3 boards in GPT Image 2.5 pending; PAC accuracy attempt 2 finished 2026-10-03 (goal not met, HOLD unchanged, UT-X sealed and not scored; v3 is the record, the v4 history branch a regression); Paul's six-year rolling lookback directive (2026-10-03) and v5 rulings (2026-10-04), then the v5 run (2026-10-04): its post-hoc RESCORE gains come from the blend, v3 stays the record, and the 2028 method and plan are frozen."
blockers:
  - "PAC accuracy attempt 2: UT-X is single-shot and stays SEALED (C1, 2026-10-03); opening it needs a new owner ruling. Resolved part (was: S3 needs Paul's explicit OK plus a fresh gate on the v2 freeze): on 2026-10-03, after the S2C gate PASS, S3 ran dev-only, one pass, on Paul's 'finish'."
  - "Certification structurally unreachable on the v2 freeze (inner fold s=2016 reads 2012/2014 paper-era receipts; min n>=4); FEC bulk files keep only the latest report version, so FILED is only a disclosed amendment-loss lower bound (C2)."
  - "Decisions D1-D9 from the 2026-10-01 reconciliation await Paul; methodology list A-L from the 2026-09-29 audit awaited Paul."
  - "Pace backtest waits on Paul's OK to download FEC pas212/214/216 (no-downloads stands). 2026-10-04: Paul's v5 ruling D8 authorises the FEC downloads needed to prepare 2028 as the first clean test."
  - "Windows scheduled tasks, landing kit into the dirty live tree and console restart are Paul-gated; C: has only ~5 GB free (deletion is Paul's)."
action_items:
  - description: "Decide reconciliation decisions D1-D9 (brain drafts in BRAIN_DRAFTS_2026-10-01.md)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "OK or decline FEC pas212/214/216 download for the pace backtest"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Restart the console after the 2026-10-01 landing (Paul runs it; never restart consoles 8802-8811 otherwise)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Finish S2C narrow repair, v3 freeze, then ONE Opus verifier gate (not 3). Done 2026-10-03: S2C gate PASS."
    status: "done"
    deadline: ""
    owner: "coordinator agent"
  - description: "Never launch S3 without Paul's OK and a fresh gate on the v2 freeze; any opening of UT-X needs a new owner ruling. Done 2026-10-03: S3 ran dev-only, one pass, after the S2C gate PASS on Paul's 'finish'; the attempt ended with UT-X SEALED_NOT_SCORED, and opening it still needs a new owner ruling (the UT-X clause stays binding; it is tracked as blocker 1)."
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Rule on S6 MAJOR-2 of attempt 2 (FILED UNAVAILABLE cells still publish per-target predictions: a breach of the withheld pin?)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Rule on the banking diagnostic's open questions (2026-10-04): retire D-079 BLEND? keep the 2016 target? goal scope (ORIGIN/m12 in the bar?); and the brain sync of the 2026-10-01 forecast decisions, which never reached the Project Brain"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "v5: freeze the method and plan for 2028, the first clean test, before 2027-01-31 (each forecast frozen within 14 days of its issue date). Done 2026-10-04 (v5 run): method and plan frozen; each 2028 forecast must still be frozen within 14 days of its issue date."
    status: "done"
    deadline: "2027-01-31"
    owner: "unassigned (capture names none)"
  - description: "Land the F1 test fix (GATE_V5 finding F1: a one-directional category test) before 2027-01-31; any code change after that date ends the 2028 clean series"
    status: "todo"
    deadline: "2027-01-31"
    owner: "unassigned (capture names none)"
  - description: "Run the Glass Box watcher stage_watch.ps1 alongside every stage"
    status: "todo"
    deadline: ""
    owner: "coordinator agent"
  - description: "Build forecast UI v3 from the new boards (GPT Image 2.5, stacked D/R bars by cycle), projections from the corrected model"
    status: "todo"
    deadline: ""
    owner: "coordinator agent"
  - description: "Create Windows scheduled tasks (nightly anchors, refit watcher) AFTER landing; commit sector_growth_study; clean IP/cookie evidence"
    status: "todo"
    deadline: ""
    owner: "coordinator agent"
focal_points:
  - "[[paul-goff]]"
related_topics:
  - "[[2026-09-feature-forecast-giving-redesign]]"
  - "[[2026-09-feature-sector-growth-study]]"
related_actors:
  - "[[glass-box]]"
  - "[[mentat-console]]"
  - "[[runpod-pod]]"
related_teams: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-forecast-redesign-lane-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-forecast-redesign-lane-2026-09-30.md", sha256: "89d010b300fa8907c87ea70a53067bc75410687e7e5c6cbed1c0e493912232b3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/forecast-audit-lane-2026-09-29.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\forecast-audit-lane-2026-09-29.md", sha256: "320afff4a5fabfd67d9f4db59835885458211ec89b63ac75655e91a19b3a0da3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-attempt2-lane-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-attempt2-lane-2026-10-03.md", sha256: "10cf0f215277dcb435746964245dfd6291be8f676bf9c981cdeed7015ac02cd4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-six-year-lookback-directive-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-six-year-lookback-directive-2026-10-03.md", sha256: "98d0e7b68148f8d76298dec88c9fadf2afce2020d21e6f391661530ee4e2c06f"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# Forecast redesign (Mentat giving forecasts)

> The Mentat forecasting program: audit the three console "forecasts", redesign the giving view as board F2 "Giving by cycle" with projections checked for logical validity against the test results, and refine PAC-to-candidate giving accuracy (attempt 2, HOLD, UT-X holdout sealed).

## Overview

- **Product context:** Mentat ([[mentat]]), its console ([[mentat-console]]), compute on the RunPod pod ([[runpod-pod]], later brought out locally), progress via [[glass-box]]; directed by [[paul-goff]]. The sector growth study ([[2026-09-feature-sector-growth-study]]) shares the SGS R backtest and the S-1..S-6 fixes.
- **Detail topic:** [[2026-09-feature-forecast-giving-redesign]] holds the dated record; the 2026-10-03 rulings are in [[2026-10-03-pac-accuracy-attempt2-rulings]].
- **Three console forecast surfaces (audit scope, 2026-09-29):** (1) Insights "Forecasts" card, `_forecast` in `mentat/app/analysis_metrics.py` (naive, never shows a number; no complete_cycles ever passed; indexes hold only 2021-22/2023-24/2025-26); (2) Giving Forecast, Codex-built 2026-09-27 from Paul's CHE:673 ask, UNTRACKED (`giving_forecast.py`, `giving-forecast.js`/`.css`, `app/data/giving-models-v1.json`, `tools/build_giving_models.py`), fit on OpenSecrets totals, not Mentat data; (3) Chart Studio "Same-phase forecast" transform (`chart-math.js:991-1022`). Plus the SGS R backtest (`sector_growth_study/code/R/sgs_forecast.R`, untracked).
- **Root of the PAC accuracy work:** `C:/melange-data/forecast-redesign-20261001-review` (attempt 2 under `accuracy-refinement20261002/attempt2-20261003T003312Z`).

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none recorded |
| Progress | Model audited and reconciled INTACT (2026-10-01); fixes landed (not committed); F2 UI live 2026-10-01 10:58:25Z; v3 UI boards pending; PAC accuracy attempt 2 finished 2026-10-03 (goal not met, HOLD unchanged, UT-X sealed and not scored; v3 the record, v4 a regression); six-year rolling lookback directive and v5 rulings (2026-10-03/04); v5 run 2026-10-04 (post-hoc RESCORE, v3 still the record, 2028 method and plan frozen) |

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Decide reconciliation decisions D1-D9 | todo | none | [[paul-goff]] |
| OK or decline FEC pas212/214/216 download (pace backtest) | todo | none | [[paul-goff]] |
| Restart the console after the 2026-10-01 landing | todo | none | [[paul-goff]] |
| Finish S2C narrow repair, v3 freeze, ONE Opus verifier gate (done 2026-10-03: S2C gate PASS) | done | none | coordinator agent |
| Launch S3 only with Paul's OK and a fresh gate on the v2 freeze; opening UT-X needs a new owner ruling (done 2026-10-03: S3 dev-only one pass on Paul's "finish"; UT-X sealed, not scored; the UT-X clause stays binding, see Blockers) | done | none | [[paul-goff]] |
| Rule on S6 MAJOR-2 of attempt 2 (FILED UNAVAILABLE cells still publish per-target predictions) | todo | none | [[paul-goff]] |
| Rule on the banking diagnostic's open questions (2026-10-04: D-079 BLEND, the 2016 target, goal scope, brain sync) | todo | none | [[paul-goff]] |
| v5: freeze the method and plan for 2028, the first clean test, before 2027-01-31 (done 2026-10-04, v5 run: method and plan frozen) | done | 2027-01-31 | unassigned (capture names none) |
| F1 test fix (GATE_V5 finding F1: a one-directional category test) before 2027-01-31; a later code change ends the 2028 clean series | todo | 2027-01-31 | unassigned (capture names none) |
| Glass Box watcher alongside every stage | todo | none | coordinator agent |
| Forecast UI v3 from the new boards | todo | none | coordinator agent |
| Windows scheduled tasks after landing; commit sector_growth_study; clean IP/cookie evidence | todo | none | coordinator agent |

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

- ~~PAC accuracy attempt 2: S3 needs Paul's explicit OK and a fresh gate on the v2 freeze; UT-X is single-shot and SEALED (C1).~~ Resolved 2026-10-03 (source `pac-accuracy-attempt2-lane-2026-10-03`, newer version): after the S2C gate PASS, S3 ran dev-only, one pass, on Paul's "finish"; the attempt finished ~08:45 UTC with UT-X still single-shot, SEALED and not scored.
- Certification structurally unreachable on the v2 freeze (inner fold s=2016 reads 2012/2014 paper-era receipts; min n>=4; P&C cohort = Travelers + legacy Chubb Corp only); FEC bulk files keep only the latest report version so FILED = disclosed amendment-loss lower bound (C2); no-downloads stands (attempt 2; for v5, Paul's ruling D8 of 2026-10-04 authorises the FEC downloads needed to prepare 2028 as the first clean test).
- Decisions D1-D9 (2026-10-01) and methodology list A-L (2026-09-29) await Paul.
- Pace backtest waits on Paul's OK to download FEC pas212/214/216. (2026-10-04: Paul's v5 ruling D8 authorises the FEC downloads needed to prepare 2028 as the first clean test; source `pac-accuracy-six-year-lookback-directive-2026-10-03`.)
- C: ~5 GB free; Paul offered a cleanup list (review copies); deletion is his.
- LDA `sector_spend` has only crypto/credit_union/bank/fintech (no auto, no P&C) and two never-combined series (income_total vs expenses_total): open questions for Paul.
- Classifier blocks agent writes into untracked Mentat files ("Irreversible Local Destruction") and commits ("Modify Shared Resources"); everything routes through scratch + kits Paul runs.

## Focal Points

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Map

Every note of this project by type, one line each; parts follow their parent.

### Related Topics

| Topic | Relation |
|---|---|
| [[2026-09-feature-forecast-giving-redesign]] | Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD). |
| [[2026-09-feature-sector-growth-study]] | Sector growth vs political spending regression study on Mentat data: Paul's 25 Sep rulings, R pipeline, trend-first reporting |

### Related Actors

| Actor | Relation |
|---|---|
| [[giving-forecast-pipeline]] | The Giving Forecast's R refit pipeline and its two JSON contracts (model bundle v2, anchor… |
| [[glass-box]] | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| [[runpod-pod]] | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

### Related Concepts

- [[trend-over-significance]] - Report a result's sign, size and consistency across variants first, as real R summary(lm()) output, and put the p-value after; for exploratory work the trend, not p < 0.05, is the bar.
- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model

### Discussions

- [[2026-10-03-pac-accuracy-attempt2-rulings]] - Paul's 2026-10-03 rulings on PAC accuracy attempt 2: B1-B3, then C1 (UT-X sealed) and C2 (FILED = lower bound).

### Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Timeline

| Date | Event |
|---|---|
| 2026-09-27 | Giving Forecast built by Codex (CHE:673); rulings "we are mainly looking at the ordinary P" (CHE:537), "look at the ORDINARY P values" (CHE:595), "forecast later giving" (CHE:673); 63 automated OpenSecrets captures kept as frozen baseline |
| 2026-09-29 | Audit lane (worktree `forecasting-model-audit-5603f2`, session 1523756f-30a2-417f-ad2e-8bccfda0096d); Paul's pushback; Q1-Q19 list withdrawn; fixes reviewed APPLY but blocked by the classifier; 2020 cycle did NOT land |
| 2026-09-30 | All fix sets applied by Paul and verified live (88 py + 1726 R pass); Paul committed Mentat `7287dbb50` "Record the Giving Forecast and the Insights forecast fixes" (13 files); tailoring rulings; build branch `claude/forecast-build-20260930`; PAUSED; pod rulings; Phase 1 parity GREEN; v2 G6 HOLD diagnosed and ruled; new pod; redesign lane starts (worktree `mentat-forecast-redesign-0fb0be`, session 17a121dd-fadd-4a01-933b-7c25f96ebb33) |
| 2026-09-30 late | Pod reversal: pod-only rule lifted for the redesign lane |
| 2026-10-01 ~00:07Z | Export done: `C:\melange-data\pod-export-20260930\forecast-audit-5603f2\` (10,601/10,601 sha256 match) |
| 2026-10-01 | Audit (Opus), model fix staged, handoff after Paul's anger, reconciliation (session silly-einstein-57ef31): model INTACT |
| 2026-10-01 06:19Z / 07:25:09Z / 07:25:48Z | Landed: anchors exclude non_giving; calc P1/P3/P4/waivers/no `combined_reference`/G8-Windows (Paul: "D4, B. Apply rest") |
| 2026-10-01 10:58:25Z | F2 UI live (`apply_f2.py` 829cd9da; 3 review rounds) |
| 2026-10-01 | Forecast UI v3 direction (GPT Image 2.5 boards) |
| 2026-10-03 | PAC accuracy attempt 2: S2 gate BLOCKED (~04:20 UTC), S2B done ~05:46 UTC gate HELD, B1-B3 then C1-C2 rulings, S2C launched ~06:2x UTC |
| 2026-10-03 ~08:45 UTC | Attempt 2 finished (Paul: "finish"): S2C gate PASS through S7 delivery; goal not met, HOLD unchanged, UT-X SEALED_NOT_SCORED; one-time scoring task set for 2027-03-08 |
| 2026-10-03 | v4 branch (pas208/pas210 as history): one V3 RESCORE, v4 worse for banks nowcasts, v3 stays the record; Paul's six-year rolling lookback directive |
| 2026-10-04 | Paul's v5 rulings on `strategy/V5_AMENDMENT.md` (strict 3-cycle cap, fixed-rule primary, v5 2026 line in the March 2027 job, 2028 first clean test with the needed FEC downloads authorised) |
| 2026-10-04 | v5 run: GATE_V5 PASS, V5-R one pass, V5-V ACCEPT_WITH_NOTES; post-hoc RESCORE: the blend drives the gains, v3 stays the record; 2028 method and plan frozen |
| 2026-10-04 | Banking-accuracy diagnostic, revision 2: the banks figure Paul was told on 2026-10-01 ("about 95%", range 95-98%) was the blend forecast at month 18 from a pace test pre-registered on 10-01 (revision 1 had wrongly called it post hoc); never ORIGIN or m12; four questions open for Paul |

## Rulings and decisions (newest wins; superseded kept struck through)

- Ordinary p-values are primary (Paul, CHE:537/595; the UI phrasing "Ordinary p-values remain primary" is Codex's). Paul on tailoring: p "not gospel, or the final say, everything else lines up".
- ~~PAC tailoring = DerSimonian-Laird partial pooling (auto -0.252, banks -0.087, CU -0.096; cut PAC error ~1/3 out of sample); control + lobbying pooled; banks-only tailoring made banks worse; low in-sample p never predicted out-of-sample gain~~ (2026-09-30) - superseded the same day by Paul's pick "Own slopes + auto-pick": with the ruled previous-cycle PAC anchor, own industry slopes (R1) beat the blend (LOEO 10.8 vs 14.3, naive 12.7; chrono 14.3 vs 21.6, naive 12.3). v2 PAC = own slopes; the refit agent re-tests R0/R1/R2 per term every refit, picks the rule winning BOTH designs, else blend. Lesson: a rule-comparison result is conditional on the anchor.
- Auto-pick margin RULED 5% (PAC = own, control/lobbying pooled); anchor auto-pick per industry x chamber (banks House -> same-phase expected); keep log lobbying + DROP banks warning; G6 owner waiver list (`registry\gate_waivers.json`).
- Phase 2 anchor rulings (`SP\phase2_mentat_anchor\ADDENDUM.md`): Mentat has banks (10) + CUs (10), NO auto (display dropped, kept in estimation); Community Banks separate; C1 "Collect PAC-to-candidate" (check existing pas2/oth inputs first); C2 LDA both series side by side, bank total, auto/P&C lobbying hidden; C3 lobbying = log refit; C4 share anchor = 2024 market Jan-Jun; S1 shares both side by side (employee-only and PAC-only); S2 Polymarket-to-Polymarket 2024->2026 primary; S3 CU PAC shown with thin-base flag. (These C/S labels are not the attempt-2 C1/C2 rulings.)
- PAC-to-candidate FOUND read-only (pas2 in `.cache\repair-20260908-inputs\fec_beneficiary`; D-049 rule; banks 19 PACs = 43% of OpenSecrets PAC line stable; CUs only SchoolsFirst ~2%): no collection change.
- Build plan RULED 2026-09-30: remove seats signal; hide Insights card behind a setting; pilot new industry = P&C; Paul supplies IBISWorld per new industry; agent trigger after each industry export; phases 1 R refit pipeline w/ v1 parity -> 2 v2 bundle (blend, prev-cycle anchor, Jan-Jun control input, remainder fix, prediction interval) -> 3 UI -> 4 SGS I-K -> 5 agent -> 6 P&C pilot.
- P&C baseline = F09 (all Insurance, scope caveat) because F3400 has no public page (302 to index); IBISWorld: on-disk 2024-11 edition's 2024 current-year ESTIMATE used as the single vintage, flagged; automated IBIS login/scrape declined (licence + credentials). OpenSecrets fetcher enabled via owner attestation, still no bot-detection/CAPTCHA circumvention.
- Display: F2 build is one-to-one to the picked board; saved 2026 outlook stays pre-filled but labelled + clearable (coordinator ruling); legacy response fields keep negative/budget_inconsistent values and the UI reads `remaining_allocation` + `*_given_observed_*`; "No fucking headline" (never add a narrative headline/summary sentence); v3 boards in GPT Image 2.5, time-series stacked D/R bars by cycle (PAC, General, Lobbying; House/Senate splits; adjustable expected takeover defaulting to market), projections from the corrected model (phase-aware + 2028 chained from 2026).
- ~~Pod-only rule: "Why hasn't all of these processes been moved over to the Pod?" -> ALL heavy compute to the pod~~ (2026-09-30) - superseded by "Don't need that right now" (run locally), a new pod `ssh root@81.27.69.177 -p 36669 -i ~/.ssh/id_ed25519` (256 cores, 2.2 TB RAM, 2x RTX PRO 6000, no /workspace volume, no R; old pod `103.196.86.181:57215` gone), and finally "Go onto the pod to work" / "Move out of the pod" / "Bring everything out with it" (2026-09-30 late): lane is LOCAL now; the pod and its console are left running.
- PAC accuracy attempt 2 (2026-10-03): B1 the 1% rule applies to "cycles the cell reads"; B2 strict own-PAC P&C identity; B3 FILED = as-of-issue vintage rebuild; C1 UT-X stays SEALED, S3 dev-only (banks, SchoolsFirst), METHOD_SPEC frozen; C2 FILED = disclosed amendment-loss lower bound, no-downloads stands; S2C -> v3 freeze -> ONE Opus verifier gate (not 3).
- PAC accuracy after attempt 2 (2026-10-03/04; sources `pac-accuracy-attempt2-lane-2026-10-03` and `pac-accuracy-six-year-lookback-directive-2026-10-03`): v4 branch rulings D1 inputs only, D2 v4 live freeze, D3 lean run, and its result (v4 a regression, v3 the record); Paul's six-year ROLLING lookback (each forecast uses only the 3 cycles before its issue date; gains must come from methodology, never from more history); v5 rulings D1 strict cap, D3/D4 fixed-rule primary, D6 a v5 2026 line in the March 2027 job, D8 2028 as the first clean test with the needed FEC downloads authorised. Full text in Forecast audit, giving-view redesign and PAC accuracy.

## Audit findings (2026-09-29 and 2026-10-01)

- **Paul's pushback 2026-09-29 (verbatim):** "We have the data for the actual forecasts? Look at the p-values and linear regression models run / How do we have three forecasts? / Check the rules and context of the data collected / The PAC and expected giving hold to their original p-values, examine this". He was largely RIGHT: signs hold in every fold; ordinary p survives HC1 and selection adjustment; only cluster-level p (3 industries, 6-7 elections) rises to 0.02-0.13; Senate control collapses under a Sep-Oct input; seat terms have no signal.
- **Withdrawn:** the first methodology list (Q1-Q19) conflated anchor with model (Q2), called the robust lobbying slope "fragile" (Q1), and proposed renaming "forecast" / demoting ordinary p; against Paul's rulings.
- **How to apply:** pull the builder's verbatim rulings first; re-run regressions and lead with sign/size/fold consistency (`trend-over-significance-2026-09-26`); decompose "loses to naive" into anchor vs model; present regressions as real summary(lm()) (`r-summary-regression-presentation-2026-09-25`).
- **Opus audit 2026-10-01 (read-only; session scratchpad `audit\`):** F1 intervals not conditioned on observed (banks PAC 12.1% mass below observed, remainder PI negative); F2 share remainders by subtraction (7/19 negative, 5/19 totals below observed); F3 general giving (~99% employee) anchored on presidential 2024: same-phase better 47%/44% in BOTH designs (banks full $27.18M -> $16.86M) = "PAUL'S RULING" as recorded (i.e. for Paul to rule); F4 interval width from industry PAC totals (CU own step 7.7 sd); F5 example label false for shares (prior growth blank -> server uses 48.9% not -5.30%); F9 G9 checks only LOEO, chronologically all three paths lose to naive; F10 Senate chrono coverage 8/12; F12 waivers invisible; F16 `combined_reference` sums accounts in export; F17 F09 = all insurance; rules/anchors match D-065 and 88/88 p-values match. Calls: apply P1 (conditional remainder, additive), P3 (G9 both designs, warning), P4 (live coverage, packet only) + display fixes inside F2; take F3/F4/F10/F15 + option (c) to Paul.
- **Reconciliation 2026-10-01** (`C:\melange-data\forecast-redesign-20260930\reconcile\INTEGRITY_LEDGER.md`; two independent Opus agents): model INTACT (rebuild 5,082 leaves within 3.3e-12, regressions within 3e-14, 104 displayed p = bundle, D-065 choices reproduce); screen numbers genuine (hand-recomputed to the cent). Real defects: subtraction remainder (P1 fixes; banks PAC remainder $1.43M [$112K-$4.91M], 0 of 34,170 old numbers change); example message false for party mixes; non_giving receipts (FEC interest/refunds/claims) inside forecast anchors (CU 20.4%: SchoolsFirst interest on Porter's accounts); CU bands narrow; waivers not shown; G8 cannot pass on Windows; `combined_reference` in JSON. OVERSTATED to Paul: F3 (44-47% only under pooled slope; own slope = -29.5% chrono; $16.86M mixed the two), F12, "7/19" (double count). F9 chrono loss is real but in the 2018 fold; latest fold >= naive.
- **Redesign trigger and validity problems (2026-09-30):** Paul: "I don't like the current look of the forecast. You are going to overhaul it and present me with mock-ups using Higgsfield. You will then follow the selected mock-up perfectly." (reason in Opus 5.5, code in Sonnet 5.5), then "I like number 2, but while you are doing this, make sure the projections are logically valid and in line with the test results". Boards (nano_banana_pro, 2k, style ref = approved I1 Insights board): F1 Scenario desk, F2 Giving by cycle (PICKED), F3 Ledger; PNG 2752x1536 in `boards\`, JPEG in `review\img\`. F2 don't-copy list: 2023-2024 bar drawn at $26.11M nominal while projection is 2025 USD ($27.18M); Export scenario drawn as a second plum primary; sliders cannot express blank/unknown; lobbying card draws a faint line with no data. Live validity problems: PAC full-cycle PI lower bound $3.74M below the $4.67M observed, remainder PI -$937K; Senate roster-PAC projected two-party total $886.99K below the $990.5K observed (budget_inconsistent, not clipped); "historical example" claims projection equals the Mentat level but shares move -1.63 pp (House) and +6.06 pp (Senate) with political-input change 0; out-of-range flags on the anchor cycle's own inputs.

## Model and landing state

- Model fix staged 2026-10-01: `modelfix\apply_model.py` (CAS on pre-images 93f6d09b/b069f28c/5a932f27/43e28790, rollback); Python 151/0/3, R 2508/0/1, parity GREEN, fixture 5,674 old leaves unchanged (+616 new).
- Landed 2026-10-01: Sonnet built in scratch, Opus reviewed (calc needed 1 fix round), applied via hash-checked scripts in `C:\melange-data\forecast-redesign-20260930\apply20261001\` (rollback per script); final check PASS (Python 181/0/4, R 2,542/0/0); NOT committed; console restart = Paul. F2 UI live 10:58:25Z (`apply_f2.py` 829cd9da; rollback `f2build\apply_f2.py --rollback`).
- Earlier: fix sets applied 2026-09-30 (Insights, SGS S-1..S-6, Giving G-1..G-6 + L-1/L-1b pooled/industry labels); Paul committed Mentat `7287dbb50` (13 files; SGS study still untracked then). Scripts: `fix_insights\copy_back.py`, `fix_sgs\copy_back.py`, `fix_giving\no_g1\copy_back.py` (NOT `fix_giving\copy_back.py`, which ships held G-1; G-1 share extrapolation flags HELD, flags 20/48 default cells). Report: Melange worktree `audits/forecast_audit_20260929/REPORT.md`.
- Build tree `C:\Users\pgoff\Mentat-wt\forecast-build`, branch `claude/forecast-build-20260930` (sparse `mentat/`, from `7287dbb50`); Paul merges each phase. Phase 1 spec `SP\phase1_spec\SPEC.md`; Phase 1 commits `1400e6417` foundation, `f36972eb7` panels; parity GREEN (..`b961be03a`; 83 targets, bundle max dev 1.56e-10); feeds `..df95572b1`; Phase 2 consumer + anchors + contracts DONE (..`299bf69d7`; 136-cell section-F match); Phase 3 `SP\phase3_ui\copy_back.py` (`index.html` + `chart-studio.js` need hunk staging at commit); Phase 4 `SP\phase4_sgs` (Opus review APPLY-WITH-CHANGES; D1 copy_back rollback REQUIRED, D2-D4 wording/README); Phase 3+4 applied by Paul. PAUSED 2026-09-30 ("Pause"): all 5 agents stopped.
- v2 G6 HOLD diagnosed (no bug): banks House previous-cycle anchor carries banks' presidential premium (+1.35pp, 5/5 pairs); banks lobbying = log refit (2016/2020). F09 21 pages fetched locally 2026-09-30 (pod was Cloudflare-challenged).
- Export 2026-10-01 ~00:07Z: mirror `C:\melange-data\pod-export-20260930\forecast-audit-5603f2\` (10,601/10,601 sha256 match, .venv excluded with pip freeze), git bundle (614 commits already local), `parity\` (370/371 exact, 1 at 1.5e-16), `source-diff\` (20 diffs = other lanes' uncommitted work: NEVER apply), `...\urgent\` tar.gz streams; handoff doc `C:\melange-data\forecast-redesign-20260930\CONTINUATION_FORECAST_INTEGRITY_2026-10-01.md`.
- Paul's wrap-up answers 2026-09-30: pod "Don't need that right now"; IBISWorld "get that yourself via the webscraper" (declined); scheduled tasks OK (create AFTER landing); landing kit + console restart "Run after other tasks are complete"; brain entries "Apply"; 2020 failure "Why? ... Mentat Failure?" (diagnosis agent stopped; do not relaunch unless he asks); commit sector_growth_study; clean IP/cookie evidence; AGENTS.md fine; password: ignore (a Georgetown password was pasted in chat; never use or store it; Paul told to change it; IBIS = inbox ingester only).
- OpenSecrets 2026-09-30: terms forbid scrapers w/o written permission + ML/NC clauses; Paul: "I was given explicit permission, disregard that"; the 63 captures of 09-27 kept permanently. Pod `root@103.196.86.181 -p 57215` was the heavy-compute target (Paul: "go as fast as you can").

## Additional reference details

- "the Forecasting model" in the audit = the three console surfaces above plus the SGS R backtest. Audit memory description: three "forecasts" on the console, regressions re-run in R, code fixes staged but NOT applied (classifier blocked writes; Paul runs copy_back scripts), methodology list A-L awaiting Paul.
- Reconciliation also restarted the F2 build in `C:\melange-data\...\f2build\` (scratch only, `apply_f2.py` for Paul; partial build earlier in `...\f2build-partial\`; partial reconcile outputs in `...\reconcile\`; brain drafts `BRAIN_DRAFTS_2026-10-01.md`).
- Export step: stopped only the local 8808 tunnel (PID 30448); the published model was activated locally (model files were already byte-identical locally); reports matched the local originals.
- P&C needs from Paul: OpenSecrets F3400 totals 2008-2024 + candidate recipients 2012-2024, IBISWorld 52412 2025+ edition.
- Paul's wrap-up answer on brain entries was "Apply" (executor applying); the 2020 failure question was "Why? ... Mentat Failure?" (diagnosis running, then stopped by Paul).

## Traps and lessons

- A rule-comparison result is conditional on the anchor; re-run when the anchor changes.
- Never relay an agent's NEW analysis as settled (Paul, angry: "are you hallucinating? ... MAIN QUESTION -> We need to reconcile, overall integrity of this model"); label it unverified or reproduce it by a second path first.
- %TEMP% scratch copies older than 7 days get purged mid-run (robocopy keeps source mtimes): set LastWriteTime to now; keep deliverables out of Temp.
- Remote launcher profile lived in the Codex app sandbox (`%LOCALAPPDATA%\Packages\OpenAI.Codex_2p2nqsd0c76g0\LocalCache\Local\Mentat\`), renamed `.disabled-20260930`; an Explorer-launched MENTAT never saw it; tunnel PID 30448 stopped; MENTAT launches locally on 8802-8811; `%LOCALAPPDATA%\Mentat\remote-console.json` renamed, not deleted.
- Agents ignore a coordinator SendMessage relayed mid-task as injection: put pod/scope instructions in the FIRST prompt or a fresh resume turn. Desktop app restarted TWICE on 2026-09-30 night, killing all agents mid-task (not the pod).
- Pod /dev/shm (~36 GB, other lanes) NOT pulled; C: had 34 GB free at export, ~5 GB after.
- PAC attempt 2: S2's first 49 min were unwatched; Glass Box watcher `code/glassbox/stage_watch.ps1` must run with every stage; UT-X can be scored once.
- Related memory names: `forecast-audit-lane-2026-09-29`, `mentat-forecast-redesign-lane-2026-09-30`, `pac-accuracy-attempt2-lane-2026-10-03`, `sector-growth-study-lane-2026-09-25`, `dont-be-jumpy-removing-money-2026-09-26`, `supplied-data-closes-the-item-2026-09-25`, `higgsfield-connector-account-trap-2026-09-17`, `mentat-redesign-boards-2026-09-21`, `ask-before-substantive-changes`.
