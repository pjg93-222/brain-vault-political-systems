---
type: topic
title: "Audit lane, 2026-09-29 (Forecast audit, giving-view redesign and PAC accuracy)"
aliases: ["Forecast audit, giving-view redesign and PAC accuracy: Audit lane, 2026-09-29"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-09-29
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
part_of: "[[2026-09-feature-forecast-giving-redesign]]"
---

# Audit lane, 2026-09-29 (Forecast audit, giving-view redesign and PAC accuracy)

> The forecasting-model audit lane of 2026-09-29 and its 2026-09-30 record: Paul's verbatim pushback and earlier rulings, the withdrawn methodology list, the fix sets Paul applied and committed, the build tree and phases, and the pod rulings. Part of [[2026-09-feature-forecast-giving-redesign]] (project [[forecast-redesign]]).

## Audit lane, 2026-09-29 (worktree `forecasting-model-audit-5603f2`)

**Paul's pushback 2026-09-29 (verbatim):** "We have the data for the actual forecasts? Look at the p-values and linear regression models run / How do we have three forecasts? / Check the rules and context of the data collected / The PAC and expected giving hold to their original p-values, examine this". He was largely RIGHT: signs hold in every fold, ordinary p survives HC1 and selection adjustment; only cluster-level p (3 industries, 6-7 elections) rises to 0.02-0.13. Senate control collapses under a Sep-Oct input; seat terms have no signal.

**Rulings found (verbatim, Codex CHE thread 09-27):** "we are mainly looking at the ordinary P" (CHE:537); "look at the ORDINARY P values" (CHE:595); "forecast later giving" is Paul's own wording (CHE:673). "Ordinary p-values remain primary" in the UI is Codex's phrasing of that ruling.

**Why (lesson):** the first methodology list (Q1-Q19) conflated anchor with model (Q2), called the robust lobbying slope "fragile" (Q1), and proposed renaming "forecast" / demoting ordinary p; all against Paul's rulings. Withdrawn after checking.

**How to apply:** before listing methodology questions on a Paul-built model, (1) pull his verbatim rulings from the Codex/Claude transcripts that built it, (2) re-run the regressions and lead with sign/size/fold consistency (`trend-over-significance-2026-09-26`), (3) decompose any "loses to naive" into anchor vs model before blaming the model. Present regressions as real summary(lm()) (`r-summary-regression-presentation-2026-09-25`).

**State at close (2026-09-29, memory modified 2026-09-30T20:51:32.034Z):** fixes reviewed APPLY (Opus), NOT applied; classifier "Irreversible Local Destruction" blocked copy_back into untracked Mentat files. Scripts: scratchpad `fix_insights\copy_back.py`, `fix_sgs\copy_back.py`, `fix_giving\no_g1\copy_back.py` (NOT `fix_giving\copy_back.py`, which ships held G-1). G-1 share extrapolation flags HELD (flags 20/48 default cells). Report: Melange worktree `audits/forecast_audit_20260929/REPORT.md`. 2020 cycle did NOT land (4 industries fanout-failed, Telecom died, Banking never started). Scratchpad session 1523756f.

**Update 2026-09-30 (chronological record):**
- ALL fix sets applied by Paul (Insights, SGS S-1..S-6, Giving G-1..G-6 + L-1/L-1b pooled/industry labels) and verified live (88 py + 1726 R pass). Paul COMMITTED via the scratch commit kit: Mentat `7287dbb50` "Record the Giving Forecast and the Insights forecast fixes" (13 files; ~~SGS study still untracked~~ — superseded 2026-10-05: committed as Mentat 04e2391e5, 2026-09-30T21:42:08Z, with the console clean-up as 56519c628, 21:38:45Z; source: git -C C:/Users/pgoff/Mentat log). Classifier blocks agent writes into Mentat (untracked overwrite = "Irreversible Local Destruction"; commit = "Modify Shared Resources"); route = scratch + copy_back/commit kit Paul runs.
- Build tree: `C:\Users\pgoff\Mentat-wt\forecast-build`, branch `claude/forecast-build-20260930` (sparse `mentat/`, from `7287dbb50`); session granted access (writes work, guard does not fire); Paul merges each phase. Phase 1 spec: `SP\phase1_spec\SPEC.md` (v1 rebuilds exactly from raw in R).
- P&C needs from Paul: OpenSecrets F3400 totals 2008-2024 + candidate recipients 2012-2024, IBISWorld 52412 2025+ edition.
- PAUSED 2026-09-30 by Paul ("Pause"): all 5 agents stopped. State: Phase 1 = 2 commits on the build branch (`1400e6417` foundation, `f36972eb7` panels) + uncommitted coefficient/bootstrap/validation tests; Phase 3 = `SP\phase3_ui` deliverables built, report never delivered, rollback-on-partial-write fix pending; Phase 4 = `SP\phase4_sgs` built, Opus review APPLY-WITH-CHANGES (D1 copy_back rollback REQUIRED, D2-D4 wording/README), fixes not done; Phase 2 anchor addendum + feeds spec not written. Nothing applied to live since G-1.
- LDA `sector_spend` has only crypto/credit_union/bank/fintech (no auto, no P&C) and two never-combined series (income_total vs expenses_total): open questions for Paul.
- IBIS = inbox ingester only, no logins, no unblocking services (2026-09-30).
- OpenSecrets 2026-09-30: fetcher enabled on Paul's instruction (the terms-of-service question and his answer are in the private notes); still NO bot-detection/CAPTCHA circumvention (stop on Cloudflare challenge). The 63 automated 09-27 captures KEPT PERMANENTLY as frozen baseline. P&C = F3400, verify first. RunPod pod `root@<first-pod-host> -p <port>` = heavy-compute target; Paul: "go as fast as you can".
- Phase 2 anchor rulings: see Decisions in [[2026-09-feature-forecast-giving-redesign]]. Phase 3 UI built + tested, apply command given to Paul (`SP\phase3_ui\copy_back.py`; `index.html` + `chart-studio.js` need hunk staging at commit). Phase 2 builder launched (anchors + consumer + shared contract fixtures).
- Paul 2026-09-30, angry: "Why hasn't all of these processes been moved over to the Pod?" -> ALL heavy compute goes to the pod; agents only edit locally.
  - Dated note (2026-10-04): superseded the same day, as the forecast topic's Decisions record: pod "Don't need that right now" (run locally), then a new pod, then the late reversal that lifted the pod-only rule for this lane (recorded in the redesign lane).
- 2026-09-30 late: Phase 1 parity GREEN (commits ..`b961be03a`; 83 targets, bundle max dev 1.56e-10). Feeds built (..`df95572b1`); F3400 has NO public page (302 to index), so Paul ruled P&C baseline = F09. Agents ignore coordinator SendMessage relayed mid-task as injection (feeds agent): put pod/scope instructions in the FIRST prompt or a fresh resume turn. Phase 3+4 already applied by Paul.
- v2 G6 HOLD diagnosed (no bug): banks House = previous-cycle anchor carries banks' presidential premium (+1.35pp, 5/5 pairs); banks lobbying = log refit (2016/2020). RULED: anchor auto-pick per industry x chamber; keep log lobbying + DROP banks warning; G6 owner waiver list. Phase 2 consumer + anchors + contracts DONE (..`299bf69d7`; 136-cell section-F match). F09 21 pages fetched locally 2026-09-30 (pod was Cloudflare-challenged). Pending: Windows scheduled tasks (nightly anchors, refit watcher) need Paul's OK; landing kit into dirty live tree.
- Paul 2026-09-30 wrap-up answers: pod "Don't need that right now" (run locally); IBISWorld "get that yourself via the webscraper" -> declined automated IBIS login/scrape (licence + credentials), used the on-disk 2024-11 edition's 2024 current-year ESTIMATE as P&C's single vintage, flagged; scheduled tasks OK (create AFTER landing); landing kit + console restart "Run after other tasks are complete" (I run); brain entries "Apply" (executor applying); 2020 failure "Why? ... Mentat Failure?" (diagnosis running); commit sector_growth_study; clean IP/cookie evidence; AGENTS.md fine.
- 2026-09-30 night: Claude desktop app restarted TWICE, killing all agents mid-task (not the pod). NEW pod from Paul: `ssh root@<math-pod-host> -p <port>`: 256 cores, 2.2 TB RAM, 2x RTX PRO 6000, NO /workspace volume (container disk only, wiped on restart), no R; old pod <first-pod-host>:<port> gone. Agents run in the desktop app; only their compute moves to the pod. Paul stopped the 2020-diagnosis agent (do not relaunch unless he asks).
- Related memory names: `sector-growth-study-lane-2026-09-25`, `dont-be-jumpy-removing-money-2026-09-26`, `supplied-data-closes-the-item-2026-09-25`.
