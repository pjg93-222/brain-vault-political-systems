---
type: fleeting
title: "Mentat forecast overnight (2026-10-07)"
aliases: ["mentat-forecast-overnight-2026-10-07"]
source: "session"
captured_at: 2026-10-07
created_at: 2026-10-07
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-forecast-overnight-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-forecast-overnight-2026-10-07.md", sha256: "4c3528dd1b1ce0c6fbd7d34f2725488a37b08c2579b38811b962e58cd6b9abd7"}
updated_at: 2026-10-09
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Mentat forecast overnight (2026-10-07)

> Giving by cycle forecast 2026-10-07/08: Board A + cycle-aware 50/50 ~~LIVE on 8806~~ (superseded 2026-10-08: LIVE on 8807, COMMITTED+PUSHED; superseded 2026-10-09: LIVE on 8806 again, restarted 02:56, with Telecom general giving and company PACs, nominal default and the lobbying card) (bundle d516db

## Content

**Status (2026-10-08 ~13:40):** ~~LIVE on 8806 (pid 27944, restarted 12:36), UNCOMMITTED in C:\Users\pgoff\Mentat~~ — superseded 2026-10-08 ~19:30: LIVE on the console served on 8807 (the entry-15 build started there 14:31:48; as read ~19:25 both 8806 pid 73124 and 8807 pid 69696 listen, each started 18:56:08 from the same server.py; 8806 is treated as stale until Paul closes it), COMMITTED and PUSHED on codex/mentat-crypto (origin = 3aea84195); factor change first committed in 8e3a85c10; vault PR #12 refreshed to head 7450cb5 (ledger STATE, D-119..D-122 and QUESTIONS re-projected; brain STATE commit 3c6ec0b). ~~Status (2026-10-07 ~15:30): LIVE on 8806 (pid 58720)~~ — superseded 2026-10-08: restarts since: 10-08 11:46 (pid 65296) and 12:36 (pid 27944).
**Status (2026-10-09 ~15:05):** LIVE on console 8806 (restarted 2026-10-09 02:56, pid 63180), COMMITTED and PUSHED on codex/mentat-crypto (origin = 111c417e7). Telecom general giving and company PACs (6acedee5d, 20d6e532f; pointer refit-20261009-e1ba2513-74f0e0a24143); the Telecom party split on the pooled share models (6d03e4b4d, D-125); nominal dollars by default with a 2025-dollars toggle (1855e6511, D-127); the lobbying Melange card (b54728386, wording fix cde5eb4c0); and the calendar fix (d28db1234, D-128) are all live. Use 8806, not 8807. Brain D-125 to D-128 are recorded (STATE commit 8911c02fd); vault PR #21 (open, unmerged) carries the ledger notes. Source: CHANGES.md entries 24 to 29; git log codex/mentat-crypto; gh pr view 12 and 21.

- Board A layout: one chart + Assumptions rail, Party split, one Methods fold; auto-recalc, no Calculate.
- Cycle-aware 50/50 model: pointer to bundle d516dba6… (refit-20261007-d861bf29-79211caa154e, switched 2026-10-07T17:38:26Z); previous 7bc7bcf1 kept.
- Company PACs: 2025-26 on the PAC panel's nowcast R8, no 50/50 (D-116, entry 12; replaces D-099 BLEND for company PACs only; general giving keeps the 50/50). Credit unions use the panel's 16 PACs (D-117, entry 13), not SchoolsFirst alone.
- Banks at defaults (2025 USD): general giving 2025-26 $13.86M (was $30.2M with no midterm discount), 2027-28 $22.87M; ~~company PACs $6.28M~~ — superseded 2026-10-08: company PACs $6.06M (nowcast; BLEND was $6.28M) and $5.44M. Credit-union company PACs on 16 PACs: $2.55M and $2.29M. ~~Banks general 2025-26 $13.86M and 2027-28 $22.87M; company PACs 2027-28 $5.44M; credit-union company PACs 2027-28 $2.29M~~ — superseded 2026-10-08 (D-121 factors live): banks general $14.47M / $21.15M, banks company PACs $6.06M / $6.08M; credit unions general $0.44M / $0.68M, company PACs (16 PACs) $2.55M / $2.56M; P&C general $4.65M / $7.13M (source: CHANGES.md entry 16).
- ~~NOT built yet: presidential uplift.~~ — superseded 2026-10-08: BUILT, LIVE and COMMITTED (CHANGES.md entry 15; factor constants in mentat/app/giving_forecast.py, first committed in 8e3a85c10). D-118 (Paul's rule: a presidential cycle always projects higher); entry 14 stopped at step 1 (national real-dollar ratio u = 0.9812, break-even 1.0853); then D-119: Paul ruled +9% ("use +9% and restart 8806"); then D-120 (x1.80 company PACs, OpenSecrets total cost) was ruled and SUPERSEDED by D-121, the final: general giving x1.8635 both ways (OpenSecrets presidential avg $12.56bn vs midterm avg $6.74bn) and company PACs x1.09 on the 2027-28 step. ~~Build = entry 15, restart pending (as of 13:31 no entry 15, 8806 still pid 27944).~~ — superseded 2026-10-08: entry 16 restarted; the new build serves on 8807.

**Change log is the source of truth:** `C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\FORECAST_OVERNIGHT_2026-10-07\CHANGES.md` (README.md beside it is the one-page status).
- ~~Entries 1-11~~ — superseded 2026-10-08: ~~entries 1-14~~ — superseded again 2026-10-08: entries 1-20 (15 factors, 16 restart, 17-18 commits and pushes, 19 two test fixes, 20 geo test isolation); superseded 2026-10-09: entries 1-29 (21 PR #12 merged, 22 credit-union party split, 24 Telecom forecast, 25 lobbying card, 27 Telecom party split and nominal default, 28 calendar fix, 29 coordinator judgment; entry 30 is being added by another agent) list every file, its sha256 before -> after, and its undo; backups are in `backups\<entry>\`.
- Model rollback: `apply3\APPLY.ps1 -Rollback`, then restore the page by hand (entry 7). Never use the entry 2 or 4 undo lines alone: that puts the old page in front of the new calculator. Entries 11-13 have their own undo lines (reverse order 13, 12, 11).
- Rulings: brain D-113 (publish a-d), D-114 (UI), D-115 (attempt-4 PAC panel), D-116 (company PACs on the panel nowcast), D-117 (credit unions 16 PACs), D-118 (presidential rule), ~~D-119 (+9%)~~ — superseded 2026-10-08: D-119 (+9%) was superseded by D-120 (x1.80), which D-121 superseded in turn (final: general x1.8635, company PACs x1.09; D-120 is not in force). ~~Vault PR pjg93-222/brain-vault-political-systems#10 is open, unmerged (the classifier blocked the merge).~~ — superseded 2026-10-08: PR #10 is closed; its replacement is #12 (branch brain-sync-2026-10-08-forecast, D-109..D-119 + corrected notes), unmerged: Paul merges. ~~D-109..D-119~~ — superseded 2026-10-08: PR #12 head is now 7450cb5 (pushed 2026-10-08 ~19:31, no force): ledger STATE, D-119..D-122 and QUESTIONS re-projected to brain commit 3c6ec0b; ~~still OPEN, unmerged~~ — superseded 2026-10-09: PR #12 merged 2026-10-08T23:35:20Z; vault PR #21 (brain-sync-2026-10-09-forecast, eba94af2) is OPEN and unmerged, carrying D-125 to D-128.

**Key model facts (verified by an independent Opus re-fit):**
- Growth input = average annual IBIS revenue growth over the lag window (2026 <- 2023-25; 2028 <- 2025-27). IBIS growth is REAL.
- The page sends `growth_basis: "ibis_window_avg"`; the server refuses unmarked growth (stale-page guard).
- phi_gen 0.738 (the midterm is lower); company-PAC phi is about 0 (-0.025), which is why D-118/D-119 add an uplift.
- Senate presidential term is kept by owner waiver: Senate MAE is 1.32-1.76x worse, inside the 1.25-2.23x range Paul was told.

**Blind results (blind\RESULTS.md, blind\panel_RESULTS.md):** panel nowcast passes 19 of 20 sector x cut cells; P&C month 12 (89.36) fails. Banks company PACs month 18: nowcast 97.8, BLEND 90.2, pace 96.0, model without 50/50 92.6. The 50/50 overlay lowered the blind score in 12 of 16 comparisons. Credit unions: one PAC 70.5, 16-PAC cohort 94.9 (about 90% one trade association).

**Open items:**
- Banks general-giving pace (2022/2024 shares 67%/59%) implies $16.9-19.4M vs the P1 $13.9M. D-099 BLEND for general giving needs a 2020 cycle that Mentat lacks; the 2020 collection check was still running.
- G9: House/Senate share models lose to naive in the chronological design (warning only).
- The model refuses as-of dates from 2027-01-01 until the anchors are rebuilt.
- ~~Real vs nominal dollars: D-092 says nominal default, the page shows real 2025 dollars; Paul never answered (brain STATE open question).~~ — superseded 2026-10-09: nominal by default with a 2025-dollars toggle (D-127; Paul, 2026-10-09: "4. Align").
- ~~Nothing is committed~~ — superseded 2026-10-08: COMMITTED + PUSHED on Paul's "commit it all and push". The 3 commits on codex/mentat-crypto are 47b05d88d (PAC panel deps), 8e3a85c10 (cycle model + refit), 4235704dd (Board A UI); ~~origin is at 4235704dd~~ — superseded 2026-10-08: origin/codex/mentat-crypto = 3aea84195 (later commits: 966b1b6b3 ... 3e80fe811 other lanes, 0be3d3862 and e829576bb test fixes, 7f13e9247 lobbying nowcast + Telecom, 3aea84195 geo test isolation); as a new branch carrying the full 615-commit history (Paul's push covers it). A clean checkout passes. Live factors: general x1.8635, company PACs x1.09 (D-121). The new build serves on 8807; ~~old 8806 (pid 27944) is stale and Paul closes it~~ — superseded 2026-10-08 ~19:30: pid 27944 is gone; 8806 is now pid 73124 (started 18:56:08, same time as 8807 pid 69696) and ~~still treated as stale until Paul closes it~~ — superseded 2026-10-09: 8806 restarted 2026-10-09 02:56 (pid 63180) and serves the live calculator. pac-flow-catalog / pac_flow_access.py were left uncommitted for the evidence lane.

**Why:** Paul (2026-10-07) found growth changes had no visible effect, there were no industry defaults, the layout was messy, and the cycle type was ignored ("look through memory"). It was all decided earlier: D-092, D-099, R12.
**How to apply:** start from CHANGES.md. Re-hash before any edit; ~~the files are uncommitted and shared with other lanes~~ — superseded 2026-10-08: the forecast files are committed and pushed (git log on codex/mentat-crypto), other lanes still share the tree. Related: `search-rulings-before-asking-2026-10-07`, `mentat-forecast-redesign-lane-2026-09-30`, `pac-accuracy-attempt3-lane-2026-10-05`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `mentat-forecast-overnight-2026-10-07.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
