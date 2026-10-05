---
type: topic
title: "Forecast audit, giving-view redesign and PAC accuracy"
aliases: ["Forecast audit, giving-view redesign and PAC accuracy"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "glass-box"
  - "[[mentat-console]]"
  - "runpod-pod"
objective: "Make the Mentat console forecasts both look better and be right: audit the three forecasts and their regressions, rebuild the giving view as board F2 'Giving by cycle' with projections checked for logical validity against the test results, and refine PAC-to-candidate giving accuracy (attempt 2, HOLD, UT-X sealed)."
created_at: 2026-09-29
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-attempt2-lane-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-attempt2-lane-2026-10-03.md", sha256: "10cf0f215277dcb435746964245dfd6291be8f676bf9c981cdeed7015ac02cd4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-forecast-redesign-lane-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-forecast-redesign-lane-2026-09-30.md", sha256: "89d010b300fa8907c87ea70a53067bc75410687e7e5c6cbed1c0e493912232b3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/forecast-audit-lane-2026-09-29.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\forecast-audit-lane-2026-09-29.md", sha256: "320afff4a5fabfd67d9f4db59835885458211ec89b63ac75655e91a19b3a0da3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-six-year-lookback-directive-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-six-year-lookback-directive-2026-10-03.md", sha256: "0c82cc3b8d7834971e122d6428bdd49962e8f4976378729dc60af7453690130a"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
---

# Forecast audit, giving-view redesign and PAC accuracy

> Three connected workstreams on the Mentat forecasting stack, 2026-09-27 to 2026-10-03: the 09-29 forecasting-model audit, the 09-30 overhaul of the giving view (board F2 'Giving by cycle') with an integrity reconciliation, and PAC-to-candidate accuracy attempt 2 (HOLD, scratch only, UT-X holdout sealed).

## Context

**Scope of "the Forecasting model" (audit, 2026-09-29): three console surfaces plus an R backtest.**

1. Insights "Forecasts" card: `_forecast` in `mentat/app/analysis_metrics.py`; naive; never shows a number (no complete_cycles ever passed; indexes hold only 2021-22 / 2023-24 / 2025-26).
2. Giving Forecast: Codex-built 2026-09-27 from Paul's CHE:673 ask, UNTRACKED (`giving_forecast.py`, `giving-forecast.js` / `giving-forecast.css`, `app/data/giving-models-v1.json`, `tools/build_giving_models.py`); fit on OpenSecrets totals, not Mentat data.
3. Chart Studio "Same-phase forecast" transform (`chart-math.js:991-1022`).
4. Plus the SGS R backtest (`sector_growth_study/code/R/sgs_forecast.R`, untracked); SGS = sector growth study (separate work; its R backtest is untracked).

**Why this is one topic.** The audit established that the model's regressions are sound and the screens mostly genuine; the redesign asked Paul's question "make sure the projections are logically valid and in line with the test results"; the PAC accuracy attempt tries to improve how well PAC-to-candidate giving is predicted, under single-look holdout rules ([[single-look-holdout-discipline]]). Program-level tracking lives in [[forecast-redesign]]; the two 2026-10-03 ruling rounds are in [[2026-10-03-pac-accuracy-attempt2-rulings]].

**Systems touched.** The Mentat console ([[mentat-console]], product project Mentat (FEC contributions intelligence)); heavy compute was moved to the RunPod pod (RunPod math pod) and then brought back out (see History); progress is watched through GLASS BOX event stream. Work is directed by Paul Goff.

**Hard constraints that run through the whole topic.**
- Classifier behavior: writes into untracked Mentat files are blocked ("Irreversible Local Destruction"); commits are blocked ("Modify Shared Resources"). Route = scratch + `copy_back` / commit kits that Paul runs.
- Never restart Paul's consoles 8802-8811; console restart = Paul.
- Model-semantics fixes go to Paul as options and wait for his ruling (`ask-before-substantive-changes`); display fixes follow the board.
- Never relay an agent's NEW analysis as settled: label it unverified or reproduce it by a second path first.
- No narrative headline or summary sentence in the forecast UI (Paul: "No fucking headline").

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| GLASS BOX event stream | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| RunPod math pod | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

## Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- Mentat (FEC contributions intelligence) - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model

## Related Discussions

- [[2026-10-03-pac-accuracy-attempt2-rulings]] - Paul's 2026-10-03 rulings on PAC accuracy attempt 2: B1-B3, then C1 (UT-X sealed) and C2 (FILED = lower bound).

## History

| Date | Event |
|---|---|
| 2026-09-27 | Giving Forecast built by Codex from Paul's CHE:673 ask (untracked files); Codex CHE thread rulings: "we are mainly looking at the ordinary P" (CHE:537), "look at the ORDINARY P values" (CHE:595), "forecast later giving" (CHE:673). 63 automated OpenSecrets captures made 09-27, kept permanently as the frozen baseline. |
| 2026-09-29 | Forecast audit lane (worktree `forecasting-model-audit-5603f2`, session 1523756f-30a2-417f-ad2e-8bccfda0096d): regressions re-run in R. Paul's pushback: signs hold in every fold, he was largely RIGHT. First methodology list (Q1-Q19) withdrawn. Fixes reviewed APPLY (Opus) but not applied (classifier). 2020 cycle did NOT land. |
| 2026-09-30 | All fix sets applied by Paul and verified live (88 py + 1726 R pass); Paul committed Mentat `7287dbb50` "Record the Giving Forecast and the Insights forecast fixes" (13 files). Tailoring rulings (PAC partial pooling, then superseded by "Own slopes + auto-pick"). Build tree created; PAUSED by Paul ("Pause"). Pod rulings and reversals; new pod; v2 G6 HOLD diagnosed; build plan ruled; wrap-up answers. |
| 2026-09-30 | Redesign lane (worktree `mentat-forecast-redesign-0fb0be`): Paul via /taste-skill:gpt-taste: "I don't like the current look of the forecast." Boards F1/F2/F3 made with Higgsfield; Paul picked number 2 (F2 'Giving by cycle') and ordered the projections checked for logical validity. |
| 2026-09-30 late | POD REVERSAL (Paul: "Go onto the pod to work", "Move out of the pod", "Bring everything out with it"); pod-only rule LIFTED for this lane. |
| 2026-10-01 ~00:07Z | EXPORT DONE: mirror `C:\melange-data\pod-export-20260930\forecast-audit-5603f2\` (10,601/10,601 sha256 match). |
| 2026-10-01 | AUDIT DONE (Opus, read-only), MODEL FIX STAGED, HANDOFF (Paul angry at relayed unverified claims), RECONCILIATION DONE (model INTACT; session silly-einstein-57ef31). |
| 2026-10-01 06:19Z / 07:25:09Z / 07:25:48Z | Fixes LANDED (Paul: "D4, B. Apply rest"): anchors exclude non_giving (06:19Z + follow-up 07:25:09Z); calc P1/P3/P4/waivers/no `combined_reference`/G8-Windows (07:25:48Z). |
| 2026-10-01 10:58:25Z | F2 UI LIVE (`apply_f2.py` 829cd9da; 3 review rounds). |
| 2026-10-01 | Forecast UI v3 direction: Paul rejected the 3 Nano Banana boards; next boards in GPT Image 2.5. |
| 2026-10-02 / 2026-10-03 | PAC-to-candidate accuracy refinement attempt 2 (S0-S7 stages); S2 gate BLOCKED, S2B repaired, gate HELD; Paul's B1-B3 then C1-C2 rulings; S2C launched ~06:2x UTC on 2026-10-03. |
| 2026-10-03 ~08:45 UTC | Attempt 2 FINISHED (Paul: "finish"): S2C gate PASS, S3 dev-only one pass, S4 ACCEPT_WITH_REPAIRS, S5 disclosure repairs, S6 ACCEPT_WITH_NOTES, S7 delivery; goal NOT met, HOLD unchanged, UT-X SEALED_NOT_SCORED; Paul OK'd the one-time scoring task for 2027-03-08. |
| 2026-10-03 | v4 branch (Paul: "use the pas208 and pas210 files as history"): one V3 RESCORE pass; v4 WORSE for banks nowcasts; v3 stays the record. Then Paul's directive: further accuracy work looks back only 6 years (ruled ROLLING the same day) and must come from methodology; v4 is a regression. |
| 2026-10-04 | Paul's v5 rulings on `strategy/V5_AMENDMENT.md`: strict 3-cycle cap, a fixed-rule primary, a v5 2026 line in the March 2027 job, and 2028 prepared as the first clean test with the needed FEC downloads authorised. |
| 2026-10-04 | v5 run: V5-B (as V5B3 after a CLI re-login), GATE_V5 PASS, V5-R one pass, V5-V ACCEPT_WITH_NOTES; the post-hoc RESCORE put banks nowcasts up at m12, m15, m18 and L (m21 slightly down) and lifted SchoolsFirst m21 to RESCORE_OBSERVED_PASS, with ORIGIN banks unchanged; v3 stays the record; the 2028 method and plan are frozen. |
| 2026-10-04 | Banking-accuracy diagnostic: the 95-97% banks figure was a post-hoc NOWCAST m18/m21 result (2018-2024, n=4, pace backtest rescored in attempt 1), never ORIGIN or m12; four questions left open for Paul. |

## Decisions

- Paul's rulings that govern the forecast model:
  - Ordinary p-values are primary ("we are mainly looking at the ordinary P"; "Ordinary p-values remain primary" in the UI is Codex's phrasing of that ruling). "forecast later giving" is Paul's own wording (CHE:673).
  - Paul on tailoring (2026-09-30): p "not gospel, or the final say, everything else lines up".
- ~~Tailoring ruled 2026-09-30: PAC = DerSimonian-Laird partial pooling (auto -0.252, banks -0.087, CU -0.096; cut PAC error ~1/3 out of sample); control + lobbying pooled (no rule beat pooled; banks-only tailoring made banks worse). Low in-sample p never predicted out-of-sample gain.~~ Superseded 2026-09-30 by Paul's pick "Own slopes + auto-pick" (see next); kept because it explains older artifacts.
- Own slopes + auto-pick (2026-09-30): with the ruled previous-cycle PAC anchor, own industry slopes (R1) beat the blend (LOEO 10.8 vs 14.3, naive 12.7; chrono 14.3 vs 21.6, naive 12.3). v2 PAC = own slopes; the refit agent re-tests R0/R1/R2 per term every refit and picks the rule winning BOTH designs, else blend. Lesson: a rule-comparison result is conditional on the anchor; re-run it when the anchor changes. Auto-pick margin RULED 5% (PAC = own, control/lobbying pooled).
- Anchor auto-pick per industry x chamber (5% margin, both designs; banks House -> same-phase expected); keep log lobbying and DROP the banks warning; G6 owner waiver list (`registry\gate_waivers.json`).
- Phase 2 anchor rulings (2026-09-30, `SP\phase2_mentat_anchor\ADDENDUM.md`): Mentat has banks (10) + CUs (10), NO auto (display dropped, kept in estimation); Community Banks separate. Naming collision: these "C1-C3" and "S1-S3" labels are NOT the attempt-2 C1/C2 rulings.
  - C1: Paul chose "Collect PAC-to-candidate" (Mentat only had employee->company-PAC money); first check existing pas2/oth inputs before any collection-code change (frozen; per-change OK).
  - C2: LDA both series side by side, bank total; auto/P&C lobbying hidden (no LDA sector).
  - C3: lobbying = log refit. C4: share anchor = 2024 market Jan-Jun.
  - S1 shares shown BOTH side by side (employee-only and PAC-only); S2 Polymarket-to-Polymarket 2024->2026 primary; S3 CU PAC shown with thin-base flag.
- PAC-to-candidate FOUND read-only (pas2 in `.cache\repair-20260908-inputs\fec_beneficiary`; D-049 rule; banks 19 PACs = 43% of OpenSecrets PAC line stable; CUs only SchoolsFirst ~2%): no collection change.
- Build plan RULED 2026-09-30: remove seats signal; hide Insights card behind a setting; pilot new industry = P&C; Paul supplies IBISWorld per new industry; agent trigger = after each industry export (watch receipts read-only), auto-publish when gates pass. Phases: 1 R refit pipeline w/ v1 parity -> 2 v2 bundle (blend, prev-cycle anchor, Jan-Jun control input, remainder fix, prediction interval) -> 3 UI -> 4 SGS I-K -> 5 agent -> 6 P&C pilot.
- P&C baseline = F09 (all Insurance, scope caveat): F3400 has NO public page (302 to index), so Paul ruled F09. IBISWorld: used the on-disk 2024-11 edition's 2024 current-year ESTIMATE as P&C's single vintage, flagged.
- Coordinator ruling (2026-10-01): saved 2026 outlook stays pre-filled but labelled + clearable.
- Paul's rulings on landing (2026-10-01): "D4, B. Apply rest" (anchors exclude non_giving; calc fixes).
- Display rule: "No fucking headline"; Paul rejected the 3 Nano Banana boards; v3 boards use GPT Image 2.5, time-series stacked D/R bars by cycle.
- PAC accuracy attempt 2 (2026-10-03): B1 the 1% rule applies to "cycles the cell reads" (threshold unchanged); B2 strict own-PAC P&C identity; B3 FILED = as-of-issue vintage rebuild; C1 UT-X stays SEALED, S3 dev-only; C2 FILED = disclosed amendment-loss lower bound, no-downloads stands. Full text in [[2026-10-03-pac-accuracy-attempt2-rulings]].
- PAC accuracy attempt 2, v4 branch (Paul 2026-10-03, "use the pas208 and pas210 files as history"; source `pac-accuracy-attempt2-lane-2026-10-03`, newer version): D1 inputs only, D2 v4 live freeze, D3 lean run. Result: v4 is WORSE for banks nowcasts, so v3 stays the record (detail in PAC accuracy attempt 2).
- Six-year lookback directive (Paul 2026-10-03, ruled ROLLING the same day) and the v5 rulings (2026-10-04): accuracy work may look back only the 3 cycles (6 years) before each forecast's issue date, gains must come from methodology, and older history is never again proposed as an accuracy lever (detail in Six-year lookback directive and v5 rulings).
- ~~Pod rule (2026-09-30 angry): "Why hasn't all of these processes been moved over to the Pod?" -> ALL heavy compute goes to the pod; agents only edit locally.~~ Superseded the same day: pod "Don't need that right now" (run locally), then a new pod, then the late reversal ("Go onto the pod to work" / "Move out of the pod" / "Bring everything out with it") which lifted the pod-only rule for this lane; kept because it explains older artifacts.

## Next Steps

- [ ] Paul to rule on the methodology list A-L from the 2026-09-29 audit (awaiting Paul at that date)
- [ ] Paul to decide D1-D9 (reconciliation decisions awaiting him; brain drafts in `BRAIN_DRAFTS_2026-10-01.md`)
- [ ] Pace backtest waits on Paul's OK to download FEC pas212/214/216
- [ ] Windows scheduled tasks (nightly anchors, refit watcher): Paul said OK, create AFTER landing; landing kit into the dirty live tree
- [ ] Console restart (Paul)
- [ ] Open questions for Paul on LDA: `sector_spend` has only crypto/credit_union/bank/fintech (no auto, no P&C) and two never-combined series (income_total vs expenses_total)
- [ ] P&C needs from Paul: OpenSecrets F3400 totals 2008-2024 + candidate recipients 2012-2024, IBISWorld 52412 2025+ edition (see Decisions: F3400 has no public page; F09 used)
- [ ] Paul cleanup list: C: ~5 GB free, Paul offered a cleanup list (review copies); deletion is his
- [x] PAC accuracy attempt 2: finish S2C narrow repair -> v3 freeze -> ONE Opus verifier gate; never launch S3 without Paul's OK and a fresh gate on the v2 freeze; Glass Box watcher alongside every stage. Done 2026-10-03: the S2C gate PASSED, S3 ran dev-only (one pass) on Paul's "finish", and the attempt finished ~08:45 UTC (see PAC accuracy attempt 2).
- [ ] Paul to rule on S6 MAJOR-2 (FILED UNAVAILABLE cells still publish per-target predictions: a breach of the withheld pin?), open since 2026-10-03.
- [ ] 2027-03-08 09:00 ET: the one-time scheduled task `score-pac-live-freeze-2026` (Paul OK'd 2026-10-03; it stops if there is no local pas226 edition dated >= 2027-03-01) scores v3 (the record) and LIVE_FREEZE_V4_1 side by side, plus a v5 2026 line, which Paul ruled (D6, 2026-10-04) should be added.
- [ ] v5: freeze the method and plan before 2027-01-31 for 2028, the first clean test, and freeze each forecast within 14 days of its issue date (Paul's D8, 2026-10-04). Update 2026-10-04 (v5 run): the method and plan are frozen; the item stays open for the per-forecast freezes.
- [ ] Land the F1 test fix (GATE_V5 finding F1: a one-directional category test) before 2027-01-31: any code change after that date ends the 2028 clean series (v5 run, 2026-10-04).
- [ ] Paul to rule on the banking diagnostic's open questions (2026-10-04): retire D-079 BLEND? keep the 2016 target? goal scope (ORIGIN/m12 in the bar?); and the brain sync of the 2026-10-01 forecast decisions, which never reached the Project Brain.
- [ ] Phase 1-6 remainder: Phase 3 deliverables rollback-on-partial-write fix, Phase 4 D1 copy_back rollback REQUIRED + D2-D4 wording/README, Phase 2 anchor addendum + feeds spec (state at the 09-30 pause; later phases applied, see History)

## Audit lane, 2026-09-29 (worktree `forecasting-model-audit-5603f2`)

**Paul's pushback 2026-09-29 (verbatim):** "We have the data for the actual forecasts? Look at the p-values and linear regression models run / How do we have three forecasts? / Check the rules and context of the data collected / The PAC and expected giving hold to their original p-values, examine this". He was largely RIGHT: signs hold in every fold, ordinary p survives HC1 and selection adjustment; only cluster-level p (3 industries, 6-7 elections) rises to 0.02-0.13. Senate control collapses under a Sep-Oct input; seat terms have no signal.

**Rulings found (verbatim, Codex CHE thread 09-27):** "we are mainly looking at the ordinary P" (CHE:537); "look at the ORDINARY P values" (CHE:595); "forecast later giving" is Paul's own wording (CHE:673). "Ordinary p-values remain primary" in the UI is Codex's phrasing of that ruling.

**Why (lesson):** the first methodology list (Q1-Q19) conflated anchor with model (Q2), called the robust lobbying slope "fragile" (Q1), and proposed renaming "forecast" / demoting ordinary p; all against Paul's rulings. Withdrawn after checking.

**How to apply:** before listing methodology questions on a Paul-built model, (1) pull his verbatim rulings from the Codex/Claude transcripts that built it, (2) re-run the regressions and lead with sign/size/fold consistency (`trend-over-significance-2026-09-26`), (3) decompose any "loses to naive" into anchor vs model before blaming the model. Present regressions as real summary(lm()) (`r-summary-regression-presentation-2026-09-25`).

**State at close (2026-09-29, memory modified 2026-09-30T20:51:32.034Z):** fixes reviewed APPLY (Opus), NOT applied; classifier "Irreversible Local Destruction" blocked copy_back into untracked Mentat files. Scripts: scratchpad `fix_insights\copy_back.py`, `fix_sgs\copy_back.py`, `fix_giving\no_g1\copy_back.py` (NOT `fix_giving\copy_back.py`, which ships held G-1). G-1 share extrapolation flags HELD (flags 20/48 default cells). Report: Melange worktree `audits/forecast_audit_20260929/REPORT.md`. 2020 cycle did NOT land (4 industries fanout-failed, Telecom died, Banking never started). Scratchpad session 1523756f.

**Update 2026-09-30 (chronological record):**
- ALL fix sets applied by Paul (Insights, SGS S-1..S-6, Giving G-1..G-6 + L-1/L-1b pooled/industry labels) and verified live (88 py + 1726 R pass). Paul COMMITTED via the scratch commit kit: Mentat `7287dbb50` "Record the Giving Forecast and the Insights forecast fixes" (13 files; SGS study still untracked). Classifier blocks agent writes into Mentat (untracked overwrite = "Irreversible Local Destruction"; commit = "Modify Shared Resources"); route = scratch + copy_back/commit kit Paul runs.
- Build tree: `C:\Users\pgoff\Mentat-wt\forecast-build`, branch `claude/forecast-build-20260930` (sparse `mentat/`, from `7287dbb50`); session granted access (writes work, guard does not fire); Paul merges each phase. Phase 1 spec: `SP\phase1_spec\SPEC.md` (v1 rebuilds exactly from raw in R).
- P&C needs from Paul: OpenSecrets F3400 totals 2008-2024 + candidate recipients 2012-2024, IBISWorld 52412 2025+ edition.
- PAUSED 2026-09-30 by Paul ("Pause"): all 5 agents stopped. State: Phase 1 = 2 commits on the build branch (`1400e6417` foundation, `f36972eb7` panels) + uncommitted coefficient/bootstrap/validation tests; Phase 3 = `SP\phase3_ui` deliverables built, report never delivered, rollback-on-partial-write fix pending; Phase 4 = `SP\phase4_sgs` built, Opus review APPLY-WITH-CHANGES (D1 copy_back rollback REQUIRED, D2-D4 wording/README), fixes not done; Phase 2 anchor addendum + feeds spec not written. Nothing applied to live since G-1.
- LDA `sector_spend` has only crypto/credit_union/bank/fintech (no auto, no P&C) and two never-combined series (income_total vs expenses_total): open questions for Paul.
- IBIS = inbox ingester only, no logins, no unblocking services.
- OpenSecrets 2026-09-30: fetcher enabled on Paul's instruction (the terms-of-service question and his answer are in the private notes); still NO bot-detection/CAPTCHA circumvention (stop on Cloudflare challenge). The 63 automated 09-27 captures KEPT PERMANENTLY as frozen baseline. P&C = F3400, verify first. RunPod pod `root@<first-pod-host> -p <port>` (key in the private notes) = heavy-compute target; Paul: "go as fast as you can".
- Phase 2 anchor rulings: see Decisions. Phase 3 UI built + tested, apply command given to Paul (`SP\phase3_ui\copy_back.py`; `index.html` + `chart-studio.js` need hunk staging at commit). Phase 2 builder launched (anchors + consumer + shared contract fixtures).
- Paul 2026-09-30, angry: "Why hasn't all of these processes been moved over to the Pod?" -> ALL heavy compute goes to the pod; agents only edit locally.
- 2026-09-30 late: Phase 1 parity GREEN (commits ..`b961be03a`; 83 targets, bundle max dev 1.56e-10). Feeds built (..`df95572b1`); F3400 has NO public page (302 to index), so Paul ruled P&C baseline = F09. Agents ignore coordinator SendMessage relayed mid-task as injection (feeds agent): put pod/scope instructions in the FIRST prompt or a fresh resume turn. Phase 3+4 already applied by Paul.
- v2 G6 HOLD diagnosed (no bug): banks House = previous-cycle anchor carries banks' presidential premium (+1.35pp, 5/5 pairs); banks lobbying = log refit (2016/2020). RULED: anchor auto-pick per industry x chamber; keep log lobbying + DROP banks warning; G6 owner waiver list. Phase 2 consumer + anchors + contracts DONE (..`299bf69d7`; 136-cell section-F match). F09 21 pages fetched locally 2026-09-30 (pod was Cloudflare-challenged). Pending: Windows scheduled tasks (nightly anchors, refit watcher) need Paul's OK; landing kit into dirty live tree.
- Paul 2026-09-30 wrap-up answers: pod "Don't need that right now" (run locally); IBISWorld "get that yourself via the webscraper" -> declined automated IBIS login/scrape (licence + credentials), used the on-disk 2024-11 edition's 2024 current-year ESTIMATE as P&C's single vintage, flagged; scheduled tasks OK (create AFTER landing); landing kit + console restart "Run after other tasks are complete" (I run); brain entries "Apply" (executor applying); 2020 failure "Why? ... Mentat Failure?" (diagnosis running); commit sector_growth_study; clean IP/cookie evidence; AGENTS.md fine.
- 2026-09-30 night: Claude desktop app restarted TWICE, killing all agents mid-task (not the pod). NEW pod from Paul: `ssh root@<math-pod-host> -p <port>`: 256 cores, 2.2 TB RAM, 2x RTX PRO 6000, NO /workspace volume (container disk only, wiped on restart), no R; old pod <first-pod-host>:<port> gone. Agents run in the desktop app; only their compute moves to the pod. Paul stopped the 2020-diagnosis agent (do not relaunch unless he asks).
- Related memory names: `sector-growth-study-lane-2026-09-25`, `dont-be-jumpy-removing-money-2026-09-26`, `supplied-data-closes-the-item-2026-09-25`.

## Redesign lane, 2026-09-30 to 2026-10-01 (worktree `mentat-forecast-redesign-0fb0be`; session 17a121dd-fadd-4a01-933b-7c25f96ebb33; memory modified 2026-10-01T18:03:05.943Z)

**Paul, 2026-09-30 (via /taste-skill:gpt-taste):** "I don't like the current look of the forecast. You are going to overhaul it and present me with mock-ups using Higgsfield. You will then follow the selected mock-up perfectly." Parameters: reason in Opus 5.5, code in Sonnet 5.5. Then: "I like number 2, but while you are doing this, make sure the projections are logically valid and in line with the test results". Redesign build = one-to-one to F2, all compute on the pod (later lifted).

**Boards (nano_banana_pro, 2k, style ref = approved I1 Insights board):** F1 Scenario desk, F2 Giving by cycle (PICKED), F3 Ledger. Files: session scratchpad `boards\` (PNG 2752x1536) and `review\img\` (JPEG). Numbers on the boards come from the live console's labelled historical example for Commercial banks; bar proportions are drawn approximately.

**F2 don't-copy list (known board defects):**
- 2023-2024 bar drawn at $26.11M nominal while the projection is in 2025 USD ($27.18M), so a 0% scenario reads as growth.
- Export scenario drawn as a second plum primary (keep secondary).
- Sliders cannot express the required blank/unknown state.
- The lobbying card draws a faint line with no data.

**Validity problems seen live (to be confirmed by the audit):**
- PAC full-cycle prediction interval lower bound $3.74M below the $4.67M already observed; remainder PI negative (-$937K).
- Senate roster-PAC projected two-party total $886.99K below the $990.5K observed (budget_inconsistent, not clipped).
- The "historical example" claims the projection equals the Mentat level but shares move -1.63 pp (House) and +6.06 pp (Senate) with political-input change 0.
- Out-of-range flags on the anchor cycle's own inputs.

**POD REVERSAL, 2026-09-30 late (Paul, verbatim, in order):** "Go onto the pod to work", then "Move out of the pod", then "Bring everything out with it". The continuation doc's pod-only rule (all compute, console backend and git construction on the pod) is LIFTED for this lane. Both pod agents were stopped; one Opus agent exported `W=/workspace/forecast-audit-5603f2` (minus .venv) to `C:\melange-data\pod-export-20260930\` with sha256 verification, activated the published model locally, disabled `%LOCALAPPDATA%\Mentat\remote-console.json` (renamed, not deleted) and stopped only the local 8808 tunnel. The pod itself and its console are left running ("never stop the pod" still stands).

**EXPORT DONE 2026-10-01 ~00:07Z:** mirror `C:\melange-data\pod-export-20260930\forecast-audit-5603f2\` (10,601/10,601 sha256 match, .venv excluded with pip freeze; reports matched the local originals), git bundle (all 614 commits already local), `parity\` (local vs pod projection 370/371 exact, 1 at 1.5e-16), `source-diff\` (20 diffs = local uncommitted work by other lanes: NEVER apply). Model files were already byte-identical locally. My own urgent tar.gz streams are in `...\urgent\` (incl. other lanes' small /workspace dirs). TRAP: the remote launcher profile lived in the Codex app sandbox (`%LOCALAPPDATA%\Packages\OpenAI.Codex_2p2nqsd0c76g0\LocalCache\Local\Mentat\`), renamed `.disabled-20260930`; an Explorer-launched MENTAT never saw it. Tunnel PID 30448 stopped. MENTAT now launches locally on 8802-8811. Pod /dev/shm (~36 GB, other lanes) NOT pulled; C: had 34 GB free.

**AUDIT DONE 2026-10-01 (Opus, read-only; files in session scratchpad `audit\`):**
- F1: intervals not conditioned on observed (banks PAC 12.1% mass below observed, remainder PI negative).
- F2: share remainders by subtraction (7/19 negative, 5/19 totals below observed).
- F3: general giving (~99% employee) anchored on presidential 2024: same-phase better 47%/44% in BOTH designs (banks full $27.18M -> $16.86M) = PAUL'S RULING (as recorded; read with "take F3/F4/F10/F15 + option (c) to Paul" below, i.e. a question for Paul's ruling). Later reconciliation: OVERSTATED (see below).
- F4: interval width from industry PAC totals (CU own step 7.7 sd).
- F5: example label false for shares (prior growth blank -> server uses 48.9% not -5.30%).
- F9: G9 checks only LOEO; chronologically all three paths lose to naive.
- F10: Senate chrono coverage 8/12.
- F12: waivers invisible (G6 compared against already-waived bundle).
- F16: `combined_reference` sums accounts in export.
- F17: F09 = all insurance.
- Rules/anchors match D-065 and 88/88 p-values match.
- MY CALLS: apply P1 (conditional remainder, additive), P3 (G9 both designs, warning), P4 (live coverage, packet only) + display fixes inside F2; take F3/F4/F10/F15 + option (c) to Paul.

**MODEL FIX STAGED 2026-10-01:** scratchpad `modelfix\apply_model.py` (self-contained post-images, CAS on pre-images 93f6d09b/b069f28c/5a932f27/43e28790, rollback, NOT yet run). Python 151/0/3, R 2508/0/1, parity GREEN, fixture 5,674 old leaves unchanged (+616 new). Legacy response fields KEEP the negative/budget_inconsistent values: the UI must read `remaining_allocation` + `*_given_observed_*`. TRAP: something purges files older than 7 days from %TEMP% scratch copies mid-run (robocopy keeps source mtimes); after copying, set LastWriteTime to now; keep deliverables out of Temp.

**HANDOFF 2026-10-01:** Paul, angry at relayed unverified audit claims ("are you hallucinating? ... MAIN QUESTION -> We need to reconcile, overall integrity of this model"), ordered a fresh session. Handoff doc: `C:\melange-data\forecast-redesign-20260930\CONTINUATION_FORECAST_INTEGRITY_2026-10-01.md` (copy in Downloads). First action there = independent reconciliation ledger (partial outputs in `...\reconcile\`), then F2 (partial build in `...\f2build-partial\`). LESSON: never relay an agent's NEW analysis (e.g. F3 anchor backtest, F4 sigma test) as settled; label it unverified or verify first.

**RECONCILIATION DONE 2026-10-01 (session silly-einstein-57ef31, two independent Opus agents):** `C:\melange-data\forecast-redesign-20260930\reconcile\INTEGRITY_LEDGER.md`.
- Model INTACT: rebuild 5,082 leaves within 3.3e-12, regressions within 3e-14, 104 displayed p = bundle, D-065 choices reproduce. Screen numbers genuine (hand-recomputed to the cent).
- Real defects: subtraction remainder (P1 fixes, independently graded: banks PAC remainder $1.43M [$112K-$4.91M], 0 of 34,170 old numbers change); example message false for party mixes; non_giving receipts (FEC interest/refunds/claims) inside forecast anchors (CU 20.4%: SchoolsFirst interest on Porter's accounts); CU bands narrow; waivers not shown; G8 cannot pass on Windows; `combined_reference` in JSON.
- OVERSTATED to Paul: F3 (44-47% only under pooled slope; own slope = -29.5% chrono; $16.86M mixed the two), F12, "7/19" (double count). F9 chrono loss is real but sits in the 2018 fold; latest fold >= naive.
- Decisions D1-D9 await Paul; brain drafts in `BRAIN_DRAFTS_2026-10-01.md`. F2 build restarted in `C:\melange-data\...\f2build\` (scratch only, `apply_f2.py` for Paul).

**LANDED 2026-10-01 (Paul: "D4, B. Apply rest"):** anchors exclude non_giving (06:19Z + follow-up 07:25:09Z), calc P1/P3/P4/waivers/no `combined_reference`/G8-Windows (07:25:48Z). Sonnet built in scratch, Opus reviewed (calc needed 1 fix round), applied via hash-checked scripts in `C:\melange-data\forecast-redesign-20260930\apply20261001\` (rollback per script). Final check PASS (Python 181/0/4, R 2,542/0/0). NOT committed; console restart = Paul. Pace backtest waits on Paul's OK to download FEC pas212/214/216. F2 UI LIVE 10:58:25Z (`apply_f2.py` 829cd9da; 3 review rounds; rollback `f2build\apply_f2.py --rollback`). Coordinator ruling: saved 2026 outlook stays pre-filled but labelled + clearable. C: ~5 GB free: Paul offered a cleanup list (review copies), deletion is his.

**FORECAST UI v3 (2026-10-01):** Paul rejected the 3 Nano Banana boards; next boards in GPT Image 2.5, time-series stacked D/R bars by cycle (PAC, General, Lobbying; House/Senate splits; adjustable expected takeover defaulting to market), emphasis on ease of understanding. "No fucking headline": never add a narrative headline/summary sentence to the forecast UI. Projections in boards must come from the corrected model (phase-aware + 2028 chained from 2026), not placeholders.

**Why (redesign):** Paul wants the forecast to look better AND be right; a chart makes an unconditioned interval visibly impossible (whisker below the observed stack).

**How to apply (redesign):** model-semantics fixes go to Paul as options and wait for his ruling (`ask-before-substantive-changes`); display fixes follow the board. Work is LOCAL now (pod retired for this lane, 2026-09-30 late); never restart Paul's consoles 8802-8811. Never relay an agent's new analysis as settled: reproduce by a second path first. Related memory names: `forecast-audit-lane-2026-09-29`, `higgsfield-connector-account-trap-2026-09-17`, `mentat-redesign-boards-2026-09-21`.

## PAC accuracy attempt 2 (2026-10-02 to 2026-10-03)

- Memory file description: "PAC-to-candidate giving accuracy attempt 2 (scratch, HOLD) - stage state, Paul's B1-B3 rulings, gate history". Audit memory file description: Mentat forecasting audit 09-29 (worktree `forecasting-model-audit-5603f2`): three "forecasts" on the console, regressions re-run in R, code fixes staged but NOT applied (classifier blocked writes; Paul runs copy_back scripts), methodology list A-L awaiting Paul. Redesign memory description: forecast giving view redesign (worktree `mentat-forecast-redesign-0fb0be`): Paul picked board F2 'Giving by cycle' and ordered the projections checked for logical validity against the test results; build = one-to-one to F2, all compute on the pod.

- Attempt 2 root: `C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt2-20261003T003312Z`. Coordinator brief = Paul's pasted prompt (stages S0-S7, Opus read-only review, Sonnet builds via `code/launch_stage.ps1`). HOLD stays; scratch only.
- State 2026-10-03 ~04:20 UTC: S2 done (all 12 artifacts). Coordinator gate BLOCKED (`receipts/GATE_S2_COORDINATOR.md`): gate verifier G1-G7 PASS (cent repro, hashes), but MLE reviewer BLOCK; UT-X CERTIFIED_PASS unreachable (1% unparseable-receipt rule counted 2012/2014) and FILED only switched O_avail. S2B pre-score repair launched (`strategy/S2B_PROMPT.md`) with Glass Box watcher `code/glassbox/stage_watch.ps1`. S3 needs Paul's explicit OK (UT-X is single-shot).
- Paul's rulings 2026-10-03 (binding amendments): B1 the 1% rule applies to "cycles the cell reads", threshold unchanged; B2 P&C identity strict own-PAC (drops GEICO PAC for Berkshire, SAFECO-PAC for Liberty Mutual; no judgment matches); B3 FILED = as-of-issue vintage rebuild, all inputs cut.
- S2B done ~05:46 UTC, v2 freeze; gate HELD (`receipts/GATE_S2B_COORDINATOR.md`): certification structurally unreachable (inner fold s=2016 reads 2012/2014 paper-era receipts; min n>=4), P&C cohort = Travelers + legacy Chubb Corp only, FEC bulk files keep only latest report version so FILED can't be truly as-of-issue.
- Paul's rulings 2026-10-03 (second round): C1 UT-X stays SEALED this attempt; S3 dev-only (banks, SchoolsFirst), METHOD_SPEC still frozen; opening UT-X needs new owner ruling. C2 FILED = disclosed amendment-loss lower bound; no-downloads stands. S2C narrow repair -> v3 freeze -> ONE Opus verifier gate (not 3). S2C launched ~06:2x UTC.
- **Why:** UT-X holdout can be scored once; spending it on a known non-certifiable freeze wastes it. **How to apply:** never launch S3 without Paul's OK and a fresh gate on the v2 freeze. Glass Box watcher must run alongside every stage (S2's first 49 min were unwatched). Related memory names: `forecast-audit-lane-2026-09-29`, `mentat-forecast-redesign-lane-2026-09-30`, `glassbox-everything-rule-2026-07-27`.
- **FINISHED 2026-10-03 ~08:45 UTC** (Paul: "finish"; newer version of the source memory): S2C gate PASS -> S3 dev-only one pass -> S4 ACCEPT_WITH_REPAIRS -> S5 disclosure repairs -> S6 ACCEPT_WITH_NOTES -> S7 zip `delivery/attempt2_pac_accuracy_20261003.zip` plus an Artifact report (`https://claude.ai/artifact/FatsU6m8xyePv2QnTTdyCx`). Goal NOT met; HOLD unchanged.
  - Banks FC DUE (dev): ORIGIN 88.89 FAIL, m12 89.32 FAIL, m15 92.33 / m18 91.70 / m21 97.26 / L 96.30 OBSERVED_PASS (earliest m=15). SchoolsFirst FC: all FAIL (m21 91.38 FAIL_SUBGROUP, pres 88.87). UT-X SEALED_NOT_SCORED.
  - LIVE_FREEZE 2026 is frozen; scoring it (about March 2027) needed Paul's OK, given 2026-10-03: the one-time scheduled task `score-pac-live-freeze-2026` fires 2027-03-08 09:00 ET and stops if there is no local pas226 edition dated >= 2027-03-01.
  - Open for Paul: S6 MAJOR-2 (FILED UNAVAILABLE cells still publish per-target predictions: a breach of the withheld pin?).
- **v4 branch** (Paul 2026-10-03: "use the pas208 and pas210 files as history"; rulings D1 inputs only, D2 v4 live freeze, D3 lean run): V1 amendment -> V2A blocked (stale pre-S3 tests; coordinator ruling R-V2B deselect) -> V2B ready -> gate blocked (v3-tree check reference) -> V2R fix R-V2R plus the superseding freeze V4_1 -> re-gate PASS -> V3 RESCORE, one pass -> V4R ACCEPT_WITH_NOTES. Result: v4 is WORSE for banks nowcasts (m15 92.33 -> 86.38; earliest clearing m15 -> m21), driven by the 2010 pace ratio 2.36; ORIGIN unchanged. v3 stays the record; the March 2027 job now scores v3 and LIVE_FREEZE_V4_1 side by side. The report was republished as v2 at the same Artifact URL (page file `v4/report/report.html`; `delivery/report.html` untouched).

## Six-year lookback directive and v5 rulings (2026-10-03/04; source `pac-accuracy-six-year-lookback-directive-2026-10-03`)

Memory file description: "Paul 2026-10-03 - PAC giving forecast accuracy work may look back only 6 years; gains must come from methodology, not more history; v4 (2008/2010 history) = regression".

- **Paul, 2026-10-03, after the attempt-2 v4 RESCORE (verbatim):** "For further accuracy we should only be looking 6 years back from current, not more years, what needs to improve is methodology, I consider this overall a regression."
- Never propose adding older history (pre-2012 files, longer pace sets, more cycles) as an accuracy lever again.
- Accuracy proposals must change methodology (model form, selection, pace estimation, cohort handling, nowcast blending), within a 6-year lookback.
- The v4 branch (pas208/pas210 as history) is judged a regression; v3 stays the attempt-2 record.
- **Why:** v4 added 2008/2010 and banks nowcasts got worse (m15 92.33 -> 86.38), driven by the 2010 outlier cycle; Paul reads more history as noise, not signal.
- **Ruled the same day:** "6 years back" is ROLLING: each forecast uses only the 3 prior cycles (6 years) before its own issue date, and the 2016-2024 backtests still run. The current v3 reads up to 4 cycles back in some pace sets, so a methodology attempt must trim that. The March 2027 job keeps scoring BOTH v3 (the record) and v4 (labelled a post-hoc regression).
- **v5 rulings (Paul, 2026-10-04, on `strategy/V5_AMENDMENT.md`):** D1 strict cap (Cap-W: the whole information set inside the 3 prior cycles, so no nested selection); D3/D4 primary = a fixed rule: ORIGIN = B1, NOWCAST = an equal-weight 3-cycle window pace blended 50/50 with B1 in remaining-period space (K1+K2), with N2/N4/N5 and selection dropped; D6 YES, add a v5 2026 line to the March 2027 job (v3 stays the reference); D8 YES, prepare 2028 as the first clean test and AUTHORISE the needed FEC downloads (method and plan frozen before 2027-01-31; each forecast frozen within 14 days of its issue date). Coordinator defaults, not objected: D2 exclude 2010, D5 three arms CAP_W / CAP_S / PA, D7 no on-time 2026 m21 line, D9 Sonnet builds (the standing 2026-10-01 rule).
- **v5 run (2026-10-04; newer version of the source memory):** V5-B (as V5B3 after a CLI re-login) -> GATE_V5 PASS (F1: one-directional category test, code verified) -> V5-R one pass -> V5-V ACCEPT_WITH_NOTES. RESCORE (post hoc): banks nowcasts up (m12 89.32 -> 92.34, m15 -> 94.58, m18 -> 94.53, L -> 97.44; m21 97.26 -> 96.85); SchoolsFirst m21 91.38 FAIL_SUBGROUP -> 93.19 RESCORE_OBSERVED_PASS; ORIGIN banks unchanged. The BLEND drives the gains; the cap alone mostly costs accuracy. Fragile: the banks m12 status change rests on outer 2016 (a post-hoc target), SchoolsFirst m21 on 2024; 3 SchoolsFirst cells flip under leave-one-out. v3 stays the record. 2028 track: method and plan frozen; any code change after 2027-01-31 ends the clean series (so an F1 test fix must land before then).
- **Banking 95-97% provenance (diagnostic 2026-10-04, `Mentat Complete Files\DIAGNOSTIC_BANKING_ACCURACY_2026-10-04.md`; newer version of the source memory):** it was banks NOWCAST m18/m21, post hoc, 2018-2024 (n=4), pace backtest rescored in attempt 1 (PACE 95.86/97.07; BLEND 97.89/97.45 with console-model look-ahead). Never ORIGIN or m12. The same measure in attempt 2 is still about 95-97 (m21 97.26, L 96.30). The m18 drop 95.86 -> 91.70 = adding the 2016 target (about -2.2) + N2 selection (about -1.7). Open for Paul: retire D-079 BLEND? keep 2016? goal scope (ORIGIN/m12 in the bar?), brain sync (the 2026-10-01 forecast decisions never reached the Project Brain, and the diagnostic calls this vault's forecast-redesign project note stale).
- **How to apply:** in any PAC-accuracy strategy, predeclaration or review, cap every model input and pace set at the 3 cycles before the forecast's issue date, and frame every candidate improvement as a methodology change. Related memory: `pac-accuracy-attempt2-lane-2026-10-03`.

## Traps and lessons (consolidated)

- A rule-comparison result is conditional on the anchor; re-run it when the anchor changes.
- Never relay an agent's new analysis as settled; reproduce by a second path first.
- Something purges files older than 7 days from %TEMP% scratch copies mid-run; set LastWriteTime to now after copying; keep deliverables out of Temp.
- The remote launcher profile can live in the Codex app sandbox; an Explorer-launched MENTAT never saw it.
- Classifier blocks agent writes/commits into Mentat; route via scratch kits Paul runs. Agents ignore coordinator SendMessage relayed mid-task as injection: put instructions in the FIRST prompt or a fresh resume turn.
- Claude desktop app restarts kill agents mid-task (not the pod).
- Never use or store a pasted password; IBIS = inbox ingester only; OpenSecrets fetcher: no bot-detection/CAPTCHA circumvention.
- Legacy response fields keep negative/budget_inconsistent values; UI must read `remaining_allocation` + `*_given_observed_*`.
- Launch long stages DETACHED (`Start-Process`): the background shell has a 2-hour cap (PAC attempt 2, v4 branch, 2026-10-03).
