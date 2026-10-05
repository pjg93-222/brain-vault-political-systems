---
type: project
name: "Forecast redesign (Mentat giving forecasts)"
aliases: ["Forecast redesign", "PAC giving accuracy"]
description: "Mentat forecasting program: the 2026-09-29 audit of three console forecasts (regressions re-run in R), the 2026-09-30 'Giving by cycle' (board F2) forecast-view redesign with projections checked for logical validity against backtests, and the PAC-to-candidate giving accuracy refinement (attempt 2, HOLD, UT-X holdout sealed) rooted at C:/melange-data/forecast-redesign-20261001-review."
status: "active"
brain: "melange-systems-brain"
deadline: ""
progress: "As of 2026-10-04: model audited and reconciled INTACT (2026-10-01); fixes landed in the live tree (~~not committed~~ — superseded 2026-10-05: committed f340dc84e, 2026-10-01 13:18 -04:00 (Mentat git log)); F2 UI live 2026-10-01 10:58:25Z; forecast UI v3 boards in GPT Image 2.5 pending; PAC accuracy attempt 2 finished 2026-10-03 (goal not met, HOLD unchanged, UT-X sealed and not scored; v3 is the record, the v4 history branch a regression); Paul's six-year rolling lookback directive (2026-10-03) and v5 rulings (2026-10-04), then the v5 run (2026-10-04): its post-hoc RESCORE gains come from the blend, v3 stays the record, and the 2028 method and plan are frozen. Then Paul's all-sector phase rulings (attempt 3, 2026-10-04): every sector scored on ORIGIN and every nowcast, with crypto, fintech and community banks unscorable now and in the 2028 prospective track (E15), P&C/UT-X open for development (C1 superseded), the blend improved rather than retired, and v6 approved."
blockers:
  - "PAC accuracy attempt 2: UT-X is single-shot and stays SEALED (C1, 2026-10-03); opening it needs a new owner ruling. Resolved part (was: S3 needs Paul's explicit OK plus a fresh gate on the v2 freeze): on 2026-10-03, after the S2C gate PASS, S3 ran dev-only, one pass, on Paul's 'finish'. Resolved 2026-10-04: Paul's all-sector phase ruling E4 is the new owner ruling, P&C/UT-X 'Open for development' (supersedes C1; holdout spent, never certifies)."
  - "Certification structurally unreachable on the v2 freeze (inner fold s=2016 reads 2012/2014 paper-era receipts; min n>=4); FEC bulk files keep only the latest report version, so FILED is only a disclosed amendment-loss lower bound (C2)."
  - "~~Decisions D1-D9 from the 2026-10-01 reconciliation await Paul~~ — superseded 2026-10-05: ruled 2026-10-01 04:29:43Z ('D4, B' / 'Apply rest'; TX L2751; EOD:33); methodology list A-L from the 2026-09-29 audit awaited Paul."
  - "~~Pace backtest waits on Paul's OK to download FEC pas212/214/216~~ — superseded 2026-10-05: approved 2026-10-01T13:52:50Z ('2. Yes'), fetched 13:58Z, backtest ran (PT/DOWNLOADS.md:3,15; PT/RESULTS.md:9-11); D-093 (no-downloads stands: scope is open question 8 in the brain STATE). 2026-10-04: Paul's v5 ruling D8 authorises the FEC downloads needed to prepare 2028 as the first clean test. 2026-10-04, all-sector phase rulings: downloads = D8 + pas226 for the March 2027 job (E12), then also the FEC PAC summary files (webk) (E20) and pas228 for the 2028 track (E22)."
  - "Windows scheduled tasks, landing kit into the dirty live tree and console restart are Paul-gated; C: has only ~5 GB free (deletion is Paul's)."
action_items:
  - description: "~~Decide reconciliation decisions D1-D9 (brain drafts in BRAIN_DRAFTS_2026-10-01.md)~~ — superseded 2026-10-05: ruled 2026-10-01 04:29:43Z ('D4, B' / 'Apply rest'; TX L2751; EOD:33); drafts applied as D-089..D-093, DE-058..DE-064"
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "~~OK or decline FEC pas212/214/216 download for the pace backtest~~ — superseded 2026-10-05: approved 2026-10-01T13:52:50Z ('2. Yes'), fetched 13:58Z, backtest ran (PT/DOWNLOADS.md:3,15; PT/RESULTS.md:9-11)"
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "~~Restart the console after the 2026-10-01 landing (Paul runs it; never restart consoles 8802-8811 otherwise)~~ — superseded 2026-10-05: restarted by the session at Paul's order, about 13:55Z (TX; EOD:27)"
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Finish S2C narrow repair, v3 freeze, then ONE Opus verifier gate (not 3). Done 2026-10-03: S2C gate PASS."
    status: "done"
    deadline: ""
    owner: "coordinator agent"
  - description: "Never launch S3 without Paul's OK and a fresh gate on the v2 freeze; any opening of UT-X needs a new owner ruling. Done 2026-10-03: S3 ran dev-only, one pass, after the S2C gate PASS on Paul's 'finish'; the attempt ended with UT-X SEALED_NOT_SCORED, and opening it still needs a new owner ruling (the UT-X clause stays binding; it is tracked as blocker 1). Update 2026-10-04: Paul's all-sector phase ruling E4, the new owner ruling the clause required, opened P&C/UT-X for development (supersedes C1; holdout spent, never certifies)."
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Rule on S6 MAJOR-2 of attempt 2 (FILED UNAVAILABLE cells still publish per-target predictions: a breach of the withheld pin?)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Rule on the banking diagnostic's open questions (2026-10-04): ~~retire D-079 BLEND?~~ — superseded 2026-10-05: no, BLEND stands (Paul 2026-10-04 E7 in D-088; 2026-10-05 R1), the 2026-10-01 ruling is D-093 keep the 2016 target? goal scope (ORIGIN/m12 in the bar?) (open question 4, brain STATE); and ~~the brain sync of the 2026-10-01 forecast decisions, which never reached the Project Brain~~ — superseded 2026-10-05: applied as D-089..D-093, DE-058..DE-064. Done 2026-10-04 (all-sector phase rulings): E7 the blend is improved, not retired (the brain's D-079 is a different entry; the blend needs a new ID >= D-088; now D-093); E8/E10 2016 optional, scored elections 2018-2024 with 2016 an ungated extra cell (post-hoc label); E5 products = ORIGIN and every nowcast (m12/15/18/21/L), with E1's bar (sector total A>=90, each phase subgroup A>=75); E16 Project Brain commits via brainctl, Obsidian after the vault-cleanup branch is committed, local commit only."
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "v5: freeze the method and plan for 2028, the first clean test, before 2027-01-31 (each forecast frozen within 14 days of its issue date). Done 2026-10-04 (v5 run): method and plan frozen; each 2028 forecast must still be frozen within 14 days of its issue date."
    status: "done"
    deadline: "2027-01-31"
    owner: "unassigned (capture names none)"
  - description: "Land the F1 test fix (GATE_V5 finding F1: a one-directional category test) before 2027-01-31; any code change after that date ends the 2028 clean series. Update 2026-10-04 (Paul's E11): folded into the new all-sector freeze before 2027-01-31; the v5 2028 plan is unchanged; v6 (E19, approved the same day) includes the F1 fix."
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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-six-year-lookback-directive-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-six-year-lookback-directive-2026-10-03.md", sha256: "a2f018f3149d98c773c3253a2d406f4f902c542de1c1e7eb6f68ff5799202b43"}
  - {type: "project-brain", synced_at: "2026-10-05", path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\DECISIONS.md", sha256: "46fa52a2143df5bbb9549a7debd2857380bfa9597816a7b08ed6fa6cb63bc9db", commit: "5d486d31d241bad3e9e24ee497456b48666d0e78"}
updated_at: 2026-10-05
updated_by: "brainlink-migration@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# Forecast redesign (Mentat giving forecasts)

> The Mentat forecasting program: audit the three console "forecasts", redesign the giving view as board F2 "Giving by cycle" with projections checked for logical validity against the test results, and refine PAC-to-candidate giving accuracy (attempt 2, HOLD, UT-X holdout sealed).

Dated correction (2026-10-04, all-sector phase rulings; source `pac-accuracy-six-year-lookback-directive-2026-10-03`): "UT-X holdout sealed" in this tagline and in the description is attempt 2's state; on 2026-10-04 Paul's E4 opened P&C/UT-X for development, superseding C1 (holdout spent, never certifies).

Dated correction (2026-10-05, brainlink migration, [[brainlink]]): the 2026-10-01 forecast drafts reached the Project Brain only now, as [[ledger/melange-systems-brain/D-089|D-089]] (lane works locally), [[ledger/melange-systems-brain/D-090|D-090]] (non-giving excluded), [[ledger/melange-systems-brain/D-091|D-091]] (integrity fixes), [[ledger/melange-systems-brain/D-092|D-092]] (phase, trajectory, inflation), [[ledger/melange-systems-brain/D-093|D-093]] (BLEND, stands: Paul 2026-10-05, R1) and DE-058..DE-064. Nothing from the 2026-10-01 rebuild was published (R3): the live pointer is still refit-20260930-377f7324-c3f221343515. Struck-through lines are superseded, not deleted. Source keys: TX = Claude transcript 710de3dd-b15e-45e8-99c3-a35dcb0d4739.jsonl (worktree silly-einstein-57ef31); EOD = C:/melange-data/forecast-redesign-20260930/HANDOFF_FORECAST_2026-10-01_EOD.md; PT = pace_test/ in the same folder.

## Overview

- **Product context:** Mentat ([[mentat]]), its console ([[mentat-console]]), compute on the RunPod pod ([[runpod-pod]], later brought out locally), progress via [[glass-box]]; directed by [[paul-goff]]. The sector growth study ([[2026-09-feature-sector-growth-study]]) shares the SGS R backtest and the S-1..S-6 fixes.
- **Detail topic:** [[2026-09-feature-forecast-giving-redesign]] holds the dated record (History, Decisions, Next Steps) and, in its four lane parts (listed in the Map), the full text of each lane; the 2026-10-03 rulings are in [[2026-10-03-pac-accuracy-attempt2-rulings]].
- **Three console forecast surfaces (audit scope, 2026-09-29):** (1) Insights "Forecasts" card, `_forecast` in `mentat/app/analysis_metrics.py` (naive, never shows a number; no complete_cycles ever passed; indexes hold only 2021-22/2023-24/2025-26); (2) Giving Forecast, Codex-built 2026-09-27 from Paul's CHE:673 ask, UNTRACKED (`giving_forecast.py`, `giving-forecast.js`/`.css`, `app/data/giving-models-v1.json`, `tools/build_giving_models.py`), fit on OpenSecrets totals, not Mentat data; (3) Chart Studio "Same-phase forecast" transform (`chart-math.js:991-1022`). Plus the SGS R backtest (`sector_growth_study/code/R/sgs_forecast.R`, untracked).
- **Root of the PAC accuracy work:** `C:/melange-data/forecast-redesign-20261001-review` (attempt 2 under `accuracy-refinement20261002/attempt2-20261003T003312Z`).

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none recorded |
| Progress | Model audited and reconciled INTACT (2026-10-01); fixes landed (~~not committed~~ — superseded 2026-10-05: committed f340dc84e, 2026-10-01 13:18 -04:00 (Mentat git log)); F2 UI live 2026-10-01 10:58:25Z; v3 UI boards pending; PAC accuracy attempt 2 finished 2026-10-03 (goal not met, HOLD unchanged, UT-X sealed and not scored; v3 the record, v4 a regression); six-year rolling lookback directive and v5 rulings (2026-10-03/04); v5 run 2026-10-04 (post-hoc RESCORE, v3 still the record, 2028 method and plan frozen); all-sector phase rulings 2026-10-04 (attempt 3: every sector scored, with crypto, fintech and community banks unscorable now and in the 2028 prospective track (E15), P&C/UT-X open for development, C1 superseded, v6 approved) |

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| ~~Decide reconciliation decisions D1-D9~~ — superseded 2026-10-05: ruled 2026-10-01 04:29:43Z ('D4, B' / 'Apply rest'; TX L2751; EOD:33) | done | none | [[paul-goff]] |
| ~~OK or decline FEC pas212/214/216 download (pace backtest)~~ — superseded 2026-10-05: approved 2026-10-01T13:52:50Z ('2. Yes'), fetched 13:58Z, backtest ran (PT/DOWNLOADS.md:3,15; PT/RESULTS.md:9-11) | done | none | [[paul-goff]] |
| ~~Restart the console after the 2026-10-01 landing~~ — superseded 2026-10-05: restarted by the session at Paul's order, about 13:55Z (TX; EOD:27) | done | none | [[paul-goff]] |
| Finish S2C narrow repair, v3 freeze, ONE Opus verifier gate (done 2026-10-03: S2C gate PASS) | done | none | coordinator agent |
| Launch S3 only with Paul's OK and a fresh gate on the v2 freeze; opening UT-X needs a new owner ruling (done 2026-10-03: S3 dev-only one pass on Paul's "finish"; UT-X sealed, not scored; the UT-X clause stays binding, see Blockers; 2026-10-04: Paul's E4 opened P&C/UT-X for development, superseding C1) | done | none | [[paul-goff]] |
| Rule on S6 MAJOR-2 of attempt 2 (FILED UNAVAILABLE cells still publish per-target predictions) | todo | none | [[paul-goff]] |
| Rule on the banking diagnostic's open questions (2026-10-04: ~~D-079 BLEND~~ — superseded 2026-10-05: BLEND stands (Paul 2026-10-04 E7 in D-088; 2026-10-05 R1), the 2026-10-01 ruling is D-093, the 2016 target, goal scope, brain sync; done 2026-10-04, all-sector phase rulings E5, E7, E8/E10, E16) | done | none | [[paul-goff]] |
| v5: freeze the method and plan for 2028, the first clean test, before 2027-01-31 (done 2026-10-04, v5 run: method and plan frozen) | done | 2027-01-31 | unassigned (capture names none) |
| F1 test fix (GATE_V5 finding F1: a one-directional category test) before 2027-01-31; a later code change ends the 2028 clean series; 2026-10-04 (E11): folded into the new all-sector freeze before 2027-01-31, the v5 2028 plan unchanged; v6 (E19) includes it | todo | 2027-01-31 | unassigned (capture names none) |
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

- ~~PAC accuracy attempt 2: S3 needs Paul's explicit OK and a fresh gate on the v2 freeze; UT-X is single-shot and SEALED (C1).~~ Resolved 2026-10-03 (source `pac-accuracy-attempt2-lane-2026-10-03`, newer version): after the S2C gate PASS, S3 ran dev-only, one pass, on Paul's "finish"; the attempt finished ~08:45 UTC with UT-X still single-shot, SEALED and not scored. Superseded 2026-10-04: Paul's all-sector phase ruling E4 opened P&C/UT-X for development (supersedes C1; holdout spent, never certifies).
- Certification structurally unreachable on the v2 freeze (inner fold s=2016 reads 2012/2014 paper-era receipts; min n>=4; P&C cohort = Travelers + legacy Chubb Corp only); FEC bulk files keep only the latest report version so FILED = disclosed amendment-loss lower bound (C2); no-downloads stands (attempt 2; for v5, Paul's ruling D8 of 2026-10-04 authorises the FEC downloads needed to prepare 2028 as the first clean test; for the all-sector phase (2026-10-04): downloads = D8 + pas226 for the March 2027 job (E12), then also the FEC PAC summary files (webk) (E20) and pas228 for the 2028 track (E22)).
- ~~Decisions D1-D9 (2026-10-01)~~ — superseded 2026-10-05: ruled 2026-10-01 04:29:43Z ('D4, B' / 'Apply rest'; TX L2751; EOD:33); and methodology list A-L (2026-09-29) await Paul (open question 5, brain STATE).
- ~~Pace backtest waits on Paul's OK to download FEC pas212/214/216.~~ — superseded 2026-10-05: approved 2026-10-01T13:52:50Z ('2. Yes'), fetched 13:58Z, backtest ran (PT/DOWNLOADS.md:3,15; PT/RESULTS.md:9-11); Paul then ruled BLEND, [[ledger/melange-systems-brain/D-093|D-093]] (2026-10-04: Paul's v5 ruling D8 authorises the FEC downloads needed to prepare 2028 as the first clean test; source `pac-accuracy-six-year-lookback-directive-2026-10-03`.) (2026-10-04, all-sector phase rulings: downloads = D8 + pas226 for the March 2027 job (E12), then also the FEC PAC summary files (webk) (E20) and pas228 for the 2028 track (E22).)
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
| [[2026-09-feature-forecast-giving-redesign-audit-lane]] | part: The forecasting-model audit lane of 2026-09-29 and its… |
| [[2026-09-feature-forecast-giving-redesign-redesign-lane]] | part: The giving-view redesign lane of 2026-09-30 to 2026-10-01… |
| [[2026-09-feature-forecast-giving-redesign-pac-accuracy-attempt2]] | part: PAC-to-candidate giving accuracy attempt 2 of 2026-10-02… |
| [[2026-09-feature-forecast-giving-redesign-six-year-lookback-lane]] | part: Paul's six-year rolling lookback directive of 2026-10-03… |
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
| 2026-10-04 | Paul's all-sector phase rulings E1-E22 (attempt 3): every sector scored on ORIGIN and every nowcast (sector total A>=90, each phase subgroup A>=75), with crypto, fintech and community banks unscorable now and in the 2028 prospective track (E15); P&C/UT-X open for development (supersedes C1); the blend improved, not retired; the banking diagnostic's four open questions ruled; Mentat's 28 non-bank PAC IDs and v6 approved; STRAT3: ORIGIN cannot reach 90 for banks, SchoolsFirst or P&C with any window-range rule |

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
- PAC accuracy attempt 2 (2026-10-03): B1 the 1% rule applies to "cycles the cell reads"; B2 strict own-PAC P&C identity (the all-sector phase takes identity from Mentat's company-to-PAC mapping instead: E3, 2026-10-04); B3 FILED = as-of-issue vintage rebuild; ~~C1 UT-X stays SEALED, S3 dev-only (banks, SchoolsFirst), METHOD_SPEC frozen~~ (superseded 2026-10-04 by Paul's E4: P&C/UT-X "Open for development"; holdout spent, never certifies); C2 FILED = disclosed amendment-loss lower bound, no-downloads stands; S2C -> v3 freeze -> ONE Opus verifier gate (not 3).
- PAC accuracy after attempt 2 (2026-10-03/04; sources `pac-accuracy-attempt2-lane-2026-10-03` and `pac-accuracy-six-year-lookback-directive-2026-10-03`): v4 branch rulings D1 inputs only, D2 v4 live freeze, D3 lean run, and its result (v4 a regression, v3 the record); Paul's six-year ROLLING lookback (each forecast uses only the 3 cycles before its issue date; gains must come from methodology, never from more history); v5 rulings D1 strict cap, D3/D4 fixed-rule primary, D6 a v5 2026 line in the March 2027 job, D8 2028 as the first clean test with the needed FEC downloads authorised. Full text in PAC accuracy attempt 2 (Forecast audit, giving-view redesign and PAC accuracy) for the v4 branch, and in Six-year lookback directive and v5 rulings (Forecast audit, giving-view redesign and PAC accuracy) for the rolling lookback and the v5 rulings.
- PAC accuracy all-sector phase, attempt 3 (Paul, 2026-10-04; source `pac-accuracy-six-year-lookback-directive-2026-10-03`, newer version): E1 bar sector total A>=90 and each phase subgroup A>=75; E2 score every sector; E3 identity = Mentat's company-to-PAC mapping, not B2's name test; E4 P&C/UT-X "Open for development" (supersedes C1; holdout spent, never certifies); E5 products = ORIGIN and every nowcast; E6 and E9 the banking number builds on the 10-01 blend method, scored with A, time-valid, with the rolling cap and a time-valid model inside the blend; E7 the blend is improved, not retired (new ID >= D-088, now D-093); E8 and E10 scored elections 2018-2024, 2016 an ungated extra cell (post-hoc label); E11 the F1 fix folds into the new all-sector freeze before 2027-01-31, the v5 2028 plan unchanged; E12 downloads = D8 + pas226 for the March 2027 job, nothing else (extended by E20 and E22); E13 to E15 banks = registry 19 IDs, other sectors = the Mentat report's "Company PAC" list, frozen after a false-positive check Paul approves, and crypto, fintech and community banks unscorable now (in the 2028 prospective track); E16 report at the same artifact link, Project Brain via brainctl, Obsidian as a local commit only; E17 Mentat's 28 non-bank PAC IDs approved as listed (GEICO for Berkshire, Toyota NA for Toyota Credit; Chubb C00348938); E18 missing PACs not added ("Mentat governs"), reported as a coverage gap; E19 v6 approved (ORIGIN B1; nowcast v5 blend + N/(N+1) cross-sector pace shrinkage; F1 fix; arms persistence/v5/v6/context phase; D-065 only between versions on clean 2028+ cells); E20 the FEC PAC summary files (webk) download authorised, plus one predeclared ORIGIN arm using receipts and cash on hand; E21 late-issued 2026 L and m18 lines for all sectors in the March 2027 job; E22 the 2028 track takes all sectors and the L product, with its pas228 download. STRAT3 found that ORIGIN cannot reach 90 for banks, SchoolsFirst or P&C with any window-range rule (2022 common shock). Full text in Six-year lookback directive and v5 rulings (Forecast audit, giving-view redesign and PAC accuracy).

## Audit findings (2026-09-29 and 2026-10-01)

- **Paul's pushback 2026-09-29 (verbatim):** "We have the data for the actual forecasts? Look at the p-values and linear regression models run / How do we have three forecasts? / Check the rules and context of the data collected / The PAC and expected giving hold to their original p-values, examine this". He was largely RIGHT: signs hold in every fold; ordinary p survives HC1 and selection adjustment; only cluster-level p (3 industries, 6-7 elections) rises to 0.02-0.13; Senate control collapses under a Sep-Oct input; seat terms have no signal.
- **Withdrawn:** the first methodology list (Q1-Q19) conflated anchor with model (Q2), called the robust lobbying slope "fragile" (Q1), and proposed renaming "forecast" / demoting ordinary p; against Paul's rulings.
- **How to apply:** pull the builder's verbatim rulings first; re-run regressions and lead with sign/size/fold consistency (`trend-over-significance-2026-09-26`); decompose "loses to naive" into anchor vs model; present regressions as real summary(lm()) (`r-summary-regression-presentation-2026-09-25`).
- **Opus audit 2026-10-01 (read-only; session scratchpad `audit\`):** F1 intervals not conditioned on observed (banks PAC 12.1% mass below observed, remainder PI negative); F2 share remainders by subtraction (7/19 negative, 5/19 totals below observed); F3 general giving (~99% employee) anchored on presidential 2024: same-phase better 47%/44% in BOTH designs (banks full $27.18M -> $16.86M) = "PAUL'S RULING" as recorded (i.e. for Paul to rule); F4 interval width from industry PAC totals (CU own step 7.7 sd); F5 example label false for shares (prior growth blank -> server uses 48.9% not -5.30%); F9 G9 checks only LOEO, chronologically all three paths lose to naive; F10 Senate chrono coverage 8/12; F12 waivers invisible; F16 `combined_reference` sums accounts in export; F17 F09 = all insurance; rules/anchors match D-065 and 88/88 p-values match. Calls: apply P1 (conditional remainder, additive), P3 (G9 both designs, warning), P4 (live coverage, packet only) + display fixes inside F2; take F3/F4/F10/F15 + option (c) to Paul.
- **Reconciliation 2026-10-01** (`C:\melange-data\forecast-redesign-20260930\reconcile\INTEGRITY_LEDGER.md`; two independent Opus agents): model INTACT (rebuild 5,082 leaves within 3.3e-12, regressions within 3e-14, 104 displayed p = bundle, D-065 choices reproduce); screen numbers genuine (hand-recomputed to the cent). Real defects: subtraction remainder (P1 fixes; banks PAC remainder $1.43M [$112K-$4.91M], 0 of 34,170 old numbers change); example message false for party mixes; non_giving receipts (FEC interest/refunds/claims) inside forecast anchors (CU 20.4%: SchoolsFirst interest on Porter's accounts); CU bands narrow; waivers not shown; G8 cannot pass on Windows; `combined_reference` in JSON. OVERSTATED to Paul: F3 (44-47% only under pooled slope; own slope = -29.5% chrono; $16.86M mixed the two), F12, "7/19" (double count). F9 chrono loss is real but in the 2018 fold; latest fold >= naive.
- **Redesign trigger and validity problems (2026-09-30):** Paul: "I don't like the current look of the forecast. You are going to overhaul it and present me with mock-ups using Higgsfield. You will then follow the selected mock-up perfectly." (reason in Opus 5.5, code in Sonnet 5.5), then "I like number 2, but while you are doing this, make sure the projections are logically valid and in line with the test results". Boards (nano_banana_pro, 2k, style ref = approved I1 Insights board): F1 Scenario desk, F2 Giving by cycle (PICKED), F3 Ledger; PNG 2752x1536 in `boards\`, JPEG in `review\img\`. F2 don't-copy list: 2023-2024 bar drawn at $26.11M nominal while projection is 2025 USD ($27.18M); Export scenario drawn as a second plum primary; sliders cannot express blank/unknown; lobbying card draws a faint line with no data. Live validity problems: PAC full-cycle PI lower bound $3.74M below the $4.67M observed, remainder PI -$937K; Senate roster-PAC projected two-party total $886.99K below the $990.5K observed (budget_inconsistent, not clipped); "historical example" claims projection equals the Mentat level but shares move -1.63 pp (House) and +6.06 pp (Senate) with political-input change 0; out-of-range flags on the anchor cycle's own inputs.

## Model and landing state

- Model fix staged 2026-10-01: `modelfix\apply_model.py` (CAS on pre-images 93f6d09b/b069f28c/5a932f27/43e28790, rollback); Python 151/0/3, R 2508/0/1, parity GREEN, fixture 5,674 old leaves unchanged (+616 new).
- Landed 2026-10-01: Sonnet built in scratch, Opus reviewed (calc needed 1 fix round), applied via hash-checked scripts in `C:\melange-data\forecast-redesign-20260930\apply20261001\` (rollback per script); final check PASS (Python 181/0/4, R 2,542/0/0); ~~NOT committed~~ — superseded 2026-10-05: committed f340dc84e, 2026-10-01 13:18 -04:00 (Mentat git log); ~~console restart = Paul~~ — superseded 2026-10-05: restarted by the session at Paul's order, about 13:55Z (TX; EOD:27). F2 UI live 10:58:25Z (`apply_f2.py` 829cd9da; rollback `f2build\apply_f2.py --rollback`).
- Earlier: fix sets applied 2026-09-30 (Insights, SGS S-1..S-6, Giving G-1..G-6 + L-1/L-1b pooled/industry labels); Paul committed Mentat `7287dbb50` (13 files; SGS study still untracked then). Scripts: `fix_insights\copy_back.py`, `fix_sgs\copy_back.py`, `fix_giving\no_g1\copy_back.py` (NOT `fix_giving\copy_back.py`, which ships held G-1; G-1 share extrapolation flags HELD, flags 20/48 default cells). Report: Melange worktree `audits/forecast_audit_20260929/REPORT.md`.
- Build tree `C:\Users\pgoff\Mentat-wt\forecast-build`, branch `claude/forecast-build-20260930` (sparse `mentat/`, from `7287dbb50`); Paul merges each phase. Phase 1 spec `SP\phase1_spec\SPEC.md`; Phase 1 commits `1400e6417` foundation, `f36972eb7` panels; parity GREEN (..`b961be03a`; 83 targets, bundle max dev 1.56e-10); feeds `..df95572b1`; Phase 2 consumer + anchors + contracts DONE (..`299bf69d7`; 136-cell section-F match); Phase 3 `SP\phase3_ui\copy_back.py` (`index.html` + `chart-studio.js` need hunk staging at commit); Phase 4 `SP\phase4_sgs` (Opus review APPLY-WITH-CHANGES; D1 copy_back rollback REQUIRED, D2-D4 wording/README); Phase 3+4 applied by Paul. PAUSED 2026-09-30 ("Pause"): all 5 agents stopped.
- v2 G6 HOLD diagnosed (no bug): banks House previous-cycle anchor carries banks' presidential premium (+1.35pp, 5/5 pairs); banks lobbying = log refit (2016/2020). F09 21 pages fetched locally 2026-09-30 (pod was Cloudflare-challenged).
- Export 2026-10-01 ~00:07Z: mirror `C:\melange-data\pod-export-20260930\forecast-audit-5603f2\` (10,601/10,601 sha256 match, .venv excluded with pip freeze), git bundle (614 commits already local), `parity\` (370/371 exact, 1 at 1.5e-16), `source-diff\` (20 diffs = other lanes' uncommitted work: NEVER apply), `...\urgent\` tar.gz streams; handoff doc `C:\melange-data\forecast-redesign-20260930\CONTINUATION_FORECAST_INTEGRITY_2026-10-01.md`.
- Paul's wrap-up answers 2026-09-30: pod "Don't need that right now"; IBISWorld "get that yourself via the webscraper" (declined); scheduled tasks OK (create AFTER landing); landing kit + console restart "Run after other tasks are complete"; brain entries "Apply"; 2020 failure "Why? ... Mentat Failure?" (diagnosis agent stopped; do not relaunch unless he asks); commit sector_growth_study; clean IP/cookie evidence; AGENTS.md fine; password: ignore (a Georgetown password was pasted in chat; never use or store it; Paul told to change it; IBIS = inbox ingester only).
- OpenSecrets 2026-09-30: terms forbid scrapers w/o written permission + ML/NC clauses; Paul: "I was given explicit permission, disregard that"; the 63 captures of 09-27 kept permanently. Pod `root@103.196.86.181 -p 57215` was the heavy-compute target (Paul: "go as fast as you can").

## Additional reference details

- "the Forecasting model" in the audit = the three console surfaces above plus the SGS R backtest. Audit memory description: three "forecasts" on the console, regressions re-run in R, code fixes staged but NOT applied (classifier blocked writes; Paul runs copy_back scripts), methodology list A-L awaiting Paul.
- Reconciliation also restarted the F2 build in `C:\melange-data\...\f2build\` (scratch only, `apply_f2.py` for Paul; partial build earlier in `...\f2build-partial\`; partial reconcile outputs in `...\reconcile\`; brain drafts `BRAIN_DRAFTS_2026-10-01.md`, now D-089..D-093 and DE-058..DE-064).
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
- PAC attempt 2: S2's first 49 min were unwatched; Glass Box watcher `code/glassbox/stage_watch.ps1` must run with every stage; UT-X can be scored once (2026-10-04: Paul's E4 opened P&C/UT-X for development; holdout spent, never certifies).
- Related memory names: `forecast-audit-lane-2026-09-29`, `mentat-forecast-redesign-lane-2026-09-30`, `pac-accuracy-attempt2-lane-2026-10-03`, `sector-growth-study-lane-2026-09-25`, `dont-be-jumpy-removing-money-2026-09-26`, `supplied-data-closes-the-item-2026-09-25`, `higgsfield-connector-account-trap-2026-09-17`, `mentat-redesign-boards-2026-09-21`, `ask-before-substantive-changes`.

<!-- brainlink:state:begin -->
## Brain state (generated)

> Generated by brainlink from melange-systems-brain. Edit the brain with brainctl, not this block; hand-written text outside the markers is never touched.

- Brain: [[ledger/melange-systems-brain/STATE|melange-systems-brain]]
- STATE last verified: 2026-10-05 01:46

### Current position
- PEOPLE-NETWORK LATENCY (2026-10-02 to 10-04, people-network latency lane): LANDED and COMMITTED on LIVE main 3366a7840 and 4a81d5022 (mirror current); audit packet in audits/staffer_route_latenc ...
- QME FULL-CHAIN RETRY + 10-01 RULINGS (2026-10-01, math-evaluation lane, worktree melange-math-eval-skill-18e907; from the retry report and its independent verifier, workflow wf_5c713a80-fff): 20 ...
- QUANT MODEL EVALUATION / FIX ROUND (2026-09-30, math-evaluation lane; only this bullet verified): skill merged as c13f3a5d4 and linked into user skills. F1 shared optimizer stance gate and F4 de ...
- QME F6 RECORD OF PRIOR RESEARCH AND INSTALLATION (2026-09-30, scope limited to the cited artifacts): the adopted skill's references/sources.md lines 499-516 and references/regulatory.md retain t ...
- MENTAT GIVING FORECAST (2026-09-30, forecast lane, worktree forecasting-model-audit-5603f2): Audit fixes to the Giving Forecast and the Insights forecast are applied and committed as Mentat 7287 ...
- DAILY-REFRESH CLOCK FLAKE CLOSED (2026-09-20, Codex): Fix 203a69812 is on LIVE main (now a7a11b5df), mirror current. One-second slack covers all four verified_completion() lower bounds: ISO star ...
- FULL CHAIN BLOCKED AT STEP 3 + DAILY-REFRESH SMOKE RESULT (2026-09-19 evening, daily-refresh lane, session 92c2b25c; read-only findings plus one byte-exact repair, NOTHING else applied): the cha ...
- CHAIN DEADLINES + 2026-09-19 REFRESH (laundry-list lane, packet audits/laundry_list_closeout_20260918, DECISIONS_FOR_PAUL.md last section): NEXT FAIL-CLOSED DATE 2026-09-21T03:41:10Z - data/legi ...
- LIVE-TREE EOL CENSUS + LINE-WISE CUTTER (2026-09-19, worktree vibrant-sammet-a549a5, Claude Fable 5.1): a spawned task reported ONE bare-LF line in LIVE fec/audit/dashboard_integrity.py that mad ...
- LAUNDRY-LIST CLOSE-OUT + LANDING (2026-09-18/19, worktree unfinished-work-handoff-a3bbad; packet audits/laundry_list_closeout_20260918 on main): the 2026-07-16 handoff's 'NOTHING has been applie ...
- LIVE-TREE RECONCILE (2026-09-19, worktree objective-booth-56caf1, Claude Fable 5.1): the Melange LIVE tree's uncommitted drift is committed. On Paul's word (he answered the presented inventory, ...
- MENTAT RECONCILE, SECOND PASS (2026-09-19, worktree mentat-uncommitted-reconcile-4089f1; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): Paul answered the first pass's six open items with ...
... 99 more line(s) in [[ledger/melange-systems-brain/STATE]]

### Next action
- STAFFER SORTING LANE next action: v6 + v3 receipts → deploy pass → Paul restarts 8841 → commit (never generations).
- STAFFER DASHBOARD LANE, Paul's calls: (a) RULED 2026-09-05 ~03:10 ET by Paul: email package STAYS three-surface (Moneyball_Email.html zipped as Moneyball.html), budget unchanged; he wants notice ...
REWRITTEN 2026-08-27. This block had gone stale to the point of misdirection: it still pointed the next
session at 2026-08-17 research-integration work while eleven days of containerization sat 1,400 lines
below in a log the boot sequence never says to read to the end. BOOT rule 4 sends every session here
first, so a stale Next action does not merely age — it actively routes work wrongly.

- Paul rules T-1..T-7 in STAFFER_NETWORK_EMPLOYMENT_TENURE_DATA_ADJUDICATION_20260901.md. Then E6: fold the House 2016Q1-2026Q1 lane into a new immutable adjudication overlay (zero promotion, twin ...
- Bill-lobbying lane (2026-09-04): (1) intake gate CLEARED (ACCEPTED 09-04 22:56 and again 09-05 12:17); the full chain now stops at step 44 `build_dashboard_bundle.py` on the narratives lane's st ...

1. RE-MEASURE THE GATE AT `022c3c728`, in the LIVE TREE. Kernel + `audit_full`. The post-fix figure is
   currently UNVERIFIED; the brain's "566/2, 333/0" was a worktree measurement and is void ([[ledger/melange-systems-brain/DE-012|DE-012]]).
... 34 more line(s) in [[ledger/melange-systems-brain/STATE]]

### Open questions
- The ENTIRE glassbox runtime is UNTRACKED. common.ps1, metaloop.ps1, flow.ps1, launch.ps1, health.ps1,
  mirror.ps1, console.ps1, dashboard.ps1, fanout.ps1 and agentwatch.ps1 exist only at
  ~/.claude/glassbox with no git history and no backup beyond *.bak-* files beside them.
  Everything built 2026-08-14 sits in exactly one place on one disk. OPEN: whether to version-control
  it and where - it is user-scope tooling used across projects, so the Melange repo may be the wrong home.
- The hook mirror is dead and undiagnosed ([[ledger/melange-systems-brain/DE-005|DE-005]]). The override routes around it; it does not fix it.
  A sentinel-gated payload capture sits inert in mirror.ps1, re-armed by creating glassbox\hookcap\ARM.
- Change-report review (2026-08-14, review lane) found two committed defects on the research branch at
  9648ec443. (a) OPEN, Paul-gated: the effectiveness sheet's measurement log has the PR7/MEM_N row and the
  M1/F2/B0-builds row concatenated on ONE physical line (a `||` join — malformed as a markdown table; the
  sheet's own convention says corrections are new rows, never edits). (b) HEALED @3254eced8: the rulings
  row's "section 7" evidence pointer no longer dangles — the appendix is committed. Also: the PDF report's
... 35 more line(s) in [[ledger/melange-systems-brain/STATE]]

### Recent decisions
- [[ledger/melange-systems-brain/D-098|D-098]] — Brain post-commit mirror push failures are logged and emitted to Glass Box
- [[ledger/melange-systems-brain/D-097|D-097]] — Vault tooling treats ledger/ as generated, like fleeting/
- [[ledger/melange-systems-brain/D-096|D-096]] — Ledger notes go out through Paul's vault PR flow; brainlink never runs git in the vault
- [[ledger/melange-systems-brain/D-095|D-095]] — Paul's rulings are written to the brain at once; drafts carry provisional keys, never D-numbers
- [[ledger/melange-systems-brain/D-094|D-094]] — Brainlink design A: the brain is the ledger, the vault is the map, memory holds pointers
- [[ledger/melange-systems-brain/D-093|D-093]] — The current-cycle roster PAC projection blends the model with this cycle's pace
- [[ledger/melange-systems-brain/D-092|D-092]] — The Giving Forecast accounts for cycle phase, trajectory and inflation
- [[ledger/melange-systems-brain/D-091|D-091]] — Integrity-ledger fixes: conditioned remainder, two-design naive warning, drawn-interval coverage, waiver display, G8 on Windows, no summed reference
- [[ledger/melange-systems-brain/D-090|D-090]] — The Giving Forecast excludes receipts Mentat's engine marks non-giving
- [[ledger/melange-systems-brain/D-089|D-089]] — The Giving Forecast lane works locally; the pod is retired for it
<!-- brainlink:state:end -->
