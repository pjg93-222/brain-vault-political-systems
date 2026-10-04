---
type: topic
title: "Capstone, member desk, network features and desk media (06-26 to 07-16) (Melange dashboard UI evolution)"
aliases: ["Melange dashboard UI evolution: Capstone, member desk, network features and desk media (06-26 to 07-16)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-06-27
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/frontend", "category/feature"]
part_of: "[[2026-06-feature-melange-dashboard-ui-evolution]]"
---

# Capstone, member desk, network features and desk media (06-26 to 07-16) (Melange dashboard UI evolution)

> Dashboard UI from the June 2026 capstone and member desk through the network features of 07-04/05, the Frank Lucas defend resolution and the desk media footprint of 07-16. Part of [[2026-06-feature-melange-dashboard-ui-evolution]] (project [[melange-systems]]).

## June 2026 capstone and member desk (2026-06-26 to 06-29)

Condensed here; the engine, pathfinder, mode and formula detail is recorded in [[melange-dashboard]] (section "June 2026 capstone dashboard: spec and engine") and the model side in [[melange-systems]].

- **Spec:** `build_dashboard_bundle.py` -> `dashboard_data.json` (issues 18, name/x/y/party/gen/rank/nl/bp/cf/stance 533 each, edges top 420, flip/coal, stats 18; extended with `play`, `epval`, `frontier` 17 of 18, `opt`); `make_dashboard_html.py` preserves the dark `#0d1117` GitHub theme (header; Issue dropdown / Mode Coalition|Flip / Color / Find; 3-col grid; hover tooltip; legend; zoom/pan) and adds the budget-frontier slider, Electoral colour mode (contest orange / defend cyan / none dim) and the adaptive-optimizer card.
- **Engine:** in-browser port of the flip model (reproduces Python refflip to max diff 0.0513 across all 18 issues), `prime`, `spread` (splitmix64 CRN), member panel (Flip this member, Scenario sliders, `engchk` badge); head-to-head tug-of-war + break-even; Cheapest to flip toggle (`rtog`).
- **Feedback fixes 2026-06-26:** the hardcoded "contest (primary)" bug (data was right: 43 primary / 10 general; generals Fetterman/Tillis/Baldwin/Budd) fixed with c/g/d/n encoding and fuchsia `#d946ef` general; node sizing cap; "Cascade" button replaced by the co-sponsor pathfinder; v2 sponsor -> target path (Williams -> Hill 3 mbrs $109k; Barr -> Van Hollen 4 mbrs $373k).
- **Research-grounded modes:** Path / Best / Multi / Budget (GCOMB (1-1/e) greedy with locality), realistic spending `recruitCost(p)=1000+9000*(1-p)`, 19th "Overall CU stance" issue, system shocks (members drop out, executive branch none/opposes/supports with execMode 1.6x / 0.6x); path-to-majority SCRAPPED per user ("insane").
- **Chain-hold (2026-06-27):** `activeP(p)=p/(p+(1-p)*ASKM)`, ASKM=0.07 (about 14x odds shift, an unestimated dial, told to the user per `feedback_never_appease`); display `chainHold` (about 17% for the example, not the flattering 55% geometric mean).
- **Member desk integration (2026-06-29):** ONE deliverable `Melange Systems/Moneyball.html`, dark theme, merged by `make_combined.py`; map of files in `Melange Systems/INDEX.md`. Desk sections: General page (overall rank/stance/legislative radar/pillar bars/invested = FEC/electoral-vuln $), Staff, Bio, Relational, Committee positions (relevance badges), Demographics (PERCENTILE-normalized radar), Psychometrics, Legislative actions (DEDUPED one row per (bill,congress)), Press & social media (graded-sentiment filter, billstatus hidden); Efficiency view = Golovin-Krause optimizer (`optimize.py`, $500 increments, $10k FEC per-member cap); coalition builder; committee-cluster layout toggle (Porter et al. 2005, `crc32` jitter seed). Weights then: `.40/.30/.20/.10` (HISTORICAL; see Context in [[2026-06-feature-melange-dashboard-ui-evolution]]). Full model facts (pillars, WHY committee-weighted, workbook collision) are in [[melange-systems]].

## Network features shipped 2026-07-04/05 (overlaps with the cosponsor/sector network topic)

Layer toggles (cosponsor / social / committee / engagement / references±; `elay` 420-char per-edge provenance c/s/h/e/m, top-420 mix c=337 s=1 e=17 m=65), the signed cross-media reference layer (1,437 signed dyads, `refs` [ia,ib,net,n], n_scored>=2; refs default OFF; green net>+0.15 / red net<-0.15 / grey), the desk relationship panel (Khanna -> Massie +1 n=9, Graham -0.4, Collins -1; desk 5650KB) and the co-appearance layer (1,151 pairs / 605 bipartisan 52% / 111 repeat; key `coap`; Jeffries<->Johnson 176 -> 7 with the substantial-appearance floor). Full detail in [[melange-dashboard]] section "Network viz requests shipped"; Press question still OPEN (interviews as a first-party stance SOURCE lane); AUTHORIZED 2026-07-04 01:35 ("Once created, go ahead with it. Once you get everything done audit") with a $230 balance, about $185 committed.

## Frank Lucas electoral 'defend' resolution (2026-07-10)

Paul authorized the re-run ("Re-Run", confirmed via an explicit gate question). `build_electoral_plays.py` produced a BYTE-IDENTICAL artifact (md5 9f240552... unchanged; Lucas already play=none / overall=Highly Persuadable; 5 contest / 41 defend / 487 none): the 47-member reclassification had already landed in an earlier regeneration; the surviving 07-09 flag was mtime-ordering only. Downstream regen skipped (that day's post-merge chain had already built all display artifacts from this exact content). Lesson: an mtime-stale flag is a lead, not proof of content drift. The re-run gate (law 11) stands for future episodes.

## Desk media footprint (2026-07-16)

Paul directed (2026-07-16): "interviews, hearings, and bluesky to be included in the press and social media section for each member" (Dashboard UI = the member desk section, tpl line about 520). Built on branch `claude/dashboard-press-media-expansion-6112b4` (worktree of the same name), 3 files:

- `fec/make_member_desk.py`: footprint loader reading `social_media.db`: INTERVIEW episodes grouped member x date x package, `hearing_antag` x `hearing_meta` appearances, bluesky posts.
- `fec/dashboard_integrity.py`: 3 new exclusion-reconciliation ledgers + DESK_OUT-aware writes + `social_media.db` (+wal) + env-dial fingerprints.
- `fec/templates/make_member_desk_00.tpl`: source filter select, footprint disclosure line, footprint cards without the CU-stance override UI.

Key decisions (presented to Paul, his to re-dial): items are DISPLAY-ONLY and **unscored** (no CU stance manufactured; memory `press-classification-user-domain`); recency cap **DESK_MEDIA_CAP=50** per member per source (0 = uncapped), full totals disclosed in-UI; **DESK_FOOTPRINT=0** = revert switch (verified: articles back to exactly press 2,389 + social 7,575 = 9,964); bluesky = **verified handles only** (34 verified / 180 UNVERIFIED withheld = 21,732 posts excluded and disclosed per member as "handle pending verification"; confirming handles in `social_media.db` `members.bluesky` unlocks them); scored CU-relevant bluesky (74) still flows via Social Master, deduped from footprint, unified under the Bluesky filter option.

The source memory description at that time read: "Interviews+hearings+bluesky added to the desk \"Press & social media\" section (branch dashboard-press-media-expansion), verified in preview, AWAITING Paul's ship decision" (superseded by the same-evening ship below).

Preview verified 2026-07-16 (zero console errors, filters + cards + links correct, integrity postflight PASS): 15,592 interview / 16,455 hearing / 1,549 bluesky items; desk HTML 18.8 -> 27.7 MB. In-app Browser screenshots TIME OUT on the 27 MB desk page (capture-side limit; page responsive): verify via javascript_tool / read_page instead.

**SHIPPED same evening (Paul: "Ship now"):** feature commit @087938f, merged to the live branch `claude/cfpb-sentiment-recorrection` @0fef713 (no overlap with the other lane's WIP files), chain rerun regenerated live `cu-member-desk.html` (27.7 MB) + `Moneyball.html` (28.0 MB), audit 102 ALL MODULES CLEAN, desk validation pass. The other lane is concurrently building CU-stance SCORING for the same channels (`hearing_stance_stack.py` / `interview_stance_stack.py` / `bluesky_stance_stack.py` + blend refactor, uncommitted WIP): footprint cards can graduate from "visible, not scored" to scored evidence when that lands. Open: 180 UNVERIFIED bluesky handles (about 21.7k posts withheld; Paul's confirmation unlocks), dial-catalog docs pass for DESK_FOOTPRINT / DESK_MEDIA_CAP / DESK_OUT / DASH_OUT. Same-evening sentiment-fix incidents: memory `press-fix-incidents-2026-07-16`.
