---
type: fleeting
title: "Forecast lit and lobby yearly lane (2026-10-13)"
aliases: ["forecast-lit-and-lobby-yearly-lane-2026-10-13"]
source: "session"
captured_at: 2026-10-13
created_at: 2026-10-13
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/forecast-lit-and-lobby-yearly-lane-2026-10-13.md", type: "claude-memory", synced_at: "2026-10-13", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\forecast-lit-and-lobby-yearly-lane-2026-10-13.md", sha256: "3d9dc29c13e934f10276c228a5e9accc9fbbaf081d3503e9f2ed0ed4cd5d1816"}
updated_at: 2026-10-13
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Forecast lit and lobby yearly lane (2026-10-13)

> Lit research + lobbying forecast lane 2026-10-12/13; PAUSED by Paul, resume Thu 2026-10-15 with the firm-level build (stopped right after hash check, no partial work); all work in Mentat Complete Files\RESEARCH_FORECAST_LIT_2026-10-12

## Content

Root folder: `C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\RESEARCH_FORECAST_LIT_2026-10-12\`. Nothing in Mentat or Melange has been changed. Every run is DEV, with a plan hashed before it ran.

- **Literature.** REPORT.md v2 and BIBLIOGRAPHY.md cover 140 entries, CrossRef-checked, with no retractions. LIBRARY_QUEUE.md lists 59 papers. Paul's Georgetown login is not active in the browser pane: it stops at the NetID page, which Paul must fill in himself (never type his credentials). Wiley shows a Cloudflare check.
- **P1 PAC nowcast rescore.** Benktander and BF-with-ORIGIN-prior both FAIL. The verdict is in `p1_rescore\P1_VERDICT.md`. Live R8 stays.
- **Lobbying Benktander.**
  - Historical backtest 2009-2025: A 97.1 vs 96.5. The gain is marginal but consistent (14 of 17 years, 8 of 8 series). See `lobby_bk_historical\`.
  - Prospective test registered (`lobby_bk_prospective\`, prereg 5c2fdb27). It is blocked: the LDA data is stale (last sweep 2026-08-01) and the freeze is due after Oct 20. Re-sweeping takes 3 manual steps, and that is Paul's OK. Paul, 2026-10-13: "You do not need to do a 2026 Q3 re-sweep as of this moment". Do not re-sweep or keep asking. The freeze tool will log STALE_INPUT.
  - Stage-2 downloads were explained to Paul on 10-13 and he has not approved them. They are the Hassan et al. PRisk firm-quarter file from firmlevelrisk.com (filename, size and terms still unverified; check read-only first) and EDGAR XBRL company-facts revenue for public clients.
  - The Benktander switch diff draft did not finish. Restart it if Paul wants it.
- **Start-of-year lobbying (`lobby_yearly\`).**
  - Naive A is 94.26. The live yearly regression scores 92.66, which is worse; the plan says retire it.
  - Part A regression: no single cycle or control term is reliable. All four political terms together give p = 0.012.
  - Nothing beat naive by the 0.5 bar: Part B, gain-survive v1 and v2 all failed. Damped drift was closest at +0.40, and is worth a prospective test.
- **Next (Thursday).**
  1. Run the firm-level build per `lobby_yearly\PLAN_FIRM_LEVEL.md` (sha256 4eb00d9e). The agent was stopped on 10-13 right after verifying the hash, so nothing was built.
  2. Stage 2, firm pressure: the Hassan PRisk download needs Paul's OK, after confirming the file and its size.
  3. Then the rulemaking signal (Federal Register proposed rules by agency).
  4. The Part C1 bill/hearing regressions were never completed.

- **2026-10-14 (Thu) results, all DEV, plans hashed, second R path PASS every time.** Folders are under RESEARCH_FORECAST_LIT_2026-10-12.
  - `hassan_prisk\` (Hassan PRisk; Paul approved downloading firmquarter_2022q1.csv; data ends 2022Q1):
    - Banks, annual: flat.
    - Lagged quarterly (q−1..q−4), banks and fintech: bank income +6.8%/SD, not significant.
    - The forecast fails in every case.
  - `rulemaking\` (Federal Register shocks): proposed rules show no reaction. Final rules are +4.2%/SD, p 0.03, which is a lead only.
  - `REVIEW_FABLE.md` (Fable 5.1 review): no verdict flips. Through-origin β biased results toward the null. 2012-25 is a burned window. Only 3 of 10 lane agents could be reached.
  - `firm_scramble\` (firm level; income vs expenses; salience D plus market-scramble M using the Ken French data, download approved by Paul): no reaction, Δ ≈ 0. The firm bottom-up forecast scores 90.9-92.1 vs naive 94.26. The final-rule lead repeats at +4.6/+5.6% with QT.
  - `uncertainty_exposure\` (election/EPU uncertainty × pre-2009 PRisk exposure; EPU download approved by Paul): no support. Significant results have the WRONG sign: exposed firms cut hired lobbying before contestable elections, consistent with a wait-and-see reading (inference). The forecast scores 93.52.
  - **External data:** `external_data\epu`, `external_data\french`.
  - **Open:** whether to register a final-rule and wait-and-see prospective plan; Paul's rulings on the telecom map (T-Mobile→DT, Lumen split) and the seat date.

**Why:** Paul's framework is that lobbying reacts to pressure: "what can I gain / what do I need to survive". Sector-level inputs showed no skill, so the next step is the firm level, following In Song Kim's dynamics work (Huneeus & Kim ρ = 0.922; Bacik et al. 2025 on churn).

**How to apply:** read the plan files and their hashes before running anything. Count every new model family as one more look at the 2012-2025 window. Follow D-064 (never sum income and expenses) and the LobbyView rules in `lobbyview-integration-2026-07-31`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-13 from the Claude Code memory file `forecast-lit-and-lobby-yearly-lane-2026-10-13.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
