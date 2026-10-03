---
type: topic
title: "Sector growth x political spending study"
aliases: ["Sector growth x political spending study"]
category: "feature"
status: "in-progress"
people:
  - "[[paul-goff]]"
actors:
  - "[[mentat-fec-pipeline]]"
objective: "Upgrade the Mentat Insights forecast by testing whether election timing, actual and predicted industry growth, and expected party control explain political spending, across nine sectors for the 2020-2026 cycles, with the study living in C:\\Users\\pgoff\\Mentat\\sector_growth_study\\ and Paul as final say."
created_at: 2026-09-25
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/r-summary-regression-presentation-2026-09-25.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\r-summary-regression-presentation-2026-09-25.md", sha256: "cec8d3d0a6c5b1a74d626a0fe910ecc2ecfafc8bbe65326ad29e7771786bac64"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sector-growth-study-lane-2026-09-25.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sector-growth-study-lane-2026-09-25.md", sha256: "83c5b7bb8159bb94d3993774a8cad534ee6602ee75a5dbda4be9f31df456af7c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/trend-over-significance-2026-09-26.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\trend-over-significance-2026-09-26.md", sha256: "57abe79649883dd148cc5f8b319ac769c70b8228cf8202306fe42b79f7d5b984"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
---

# Sector growth x political spending study

> Exploratory regression lane (worktree `sector-growth-political-spending-9cc0c8`) that upgrades the Mentat Insights forecast; Paul has final say and wants to be consulted at each step. Results are reported trend-first and as real R `summary(lm())` output.

## Context

**The lane:** it upgrades the Mentat Insights forecast. The current forecast is `_forecast()` at `mentat/app/analysis_metrics.py:674-767`. It is seasonal-naive and withholds without four consecutive complete cycles (`:696`). The upgrade tests election timing, actual and predicted industry growth, and expected party control against spending. Mentat context: [[mentat]], [[mentat-fec-pipeline]], [[forecast-redesign]]; owner and final authority [[paul-goff]]; presentation rules shared with [[2026-06-working-agreement-communication-and-presentation-style]].

- North star: `C:\Users\pgoff\Downloads\Sector_Growth_and_Political_Spending_Research_Plan.md`
- Paul has final say and wants to be consulted at each step.
- Study folder (R9): `C:\Users\pgoff\Mentat\sector_growth_study\`
- Worktree: `sector-growth-political-spending-9cc0c8` (path `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\.claude\worktrees\sector-growth-political-spending-9cc0c8` as encoded in the scratchpad path).
- Decision page: https://claude.ai/artifact/7pV5xv67tyHnzpVyDBufWw
- Evidence: session e55a3219 scratchpad `evidence\` (`census_spending.md`, `census_growth_controls.md`, `insights_forecast_code.md`, `codex_runner.md`).
- Codex Astra: `gpt-6-astra` at effort "ultra" is connected via the hardened `codex exec` runner in session scratchpad `codex\run` (75 features disabled). The ECC council adapter fails closed on its version pin.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[mentat-fec-pipeline]] | Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat |

## Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Related Topics

- [[2026-06-working-agreement-communication-and-presentation-style]] - Rules for reporting to Paul: never appease, real R summary(lm()), trend over significance, visible PowerShell, close supplied items.

## History

| Date | Event |
|---|---|
| 2026-09-25 | Paul's rulings R1-R9 (staged plan approved; own folder; 2020-2026 window; lobbying as-is; 6-year minimum else 10; collect through Mentat; I draft the predecessor-firm list; "general giving"; predicted growth from Paul's CSV); census facts recorded |
| 2026-09-25 evening | Nine-sector scope; champions = boards.json; race toughness = mean of Cook/Inside Elections/Sabato; collect cycle 2020 through Mentat now, 2016-2018 later; "approve all" for data rules A-F; expected control 2023-2025 = Polymarket + Kalshi; lobbying option (a) |
| 2026-09-25 night | Code in R ("We are conducting the regressions; let's have the code be in R"); rulings 1a, 2, 3, 4, 5, 6; the 538 outburst ("USING THE 538 DATA IN THE Markdown") |
| 2026-09-25 19:31 | Paul stopped all agents ("Finish"); state at stop recorded; 2020 Crypto Rscript export killed at 19:20:51 by a machine power-off |
| 2026-09-25 ~19:40 | Paul reverses 1a and 2 ("WE HAVE ALL THE FUCKING DATA ... CHECK MELANGE") |
| 2026-09-25 ~19:50 | Standing authorization ("We don't need to rebuild shit, all we have to do is link, finish it"); four Opus agents launched |
| 2026-09-25 20:37 | 2020 run root cause found; chain v2 pid 9948; 08 (sha 38ac779d) and 02 538 sheet (sha 79d05103) landed |
| 2026-09-25 21:21 | R pipeline DONE (parity 139/139); live run `analysis-R-20260926T012051Z` |
| 2026-09-25 22:41 | Chain v3 pid 4020 (replaces v2) |
| 2026-09-25 night | Pending for Paul: "show me the regressions when it's done" |
| 2026-09-26 ~01:50 | NEW Claude session (b82a832c); "Keep those recepits"; old scratchpad archived |
| 2026-09-26 ~03:10 | Run `analysis-R-20260926T070630Z`: SHIFT, TRENDS, forecast backtest |
| 2026-09-26 | Paul: "Doesn't matter if it is significant if the trend is there"; Codex methodology review (Paul-requested); seat-gain lane request |
| 2026-09-26 night | SEATS results, run `analysis-R-20260926T221444Z` |

## Decisions

Paul's rulings, 2026-09-25:
- **R1:** the staged plan is approved.
- **R9:** the study lives in its own folder, `C:\Users\pgoff\Mentat\sector_growth_study\`.
- **R7:** the window is the 2020-2026 cycles. New champions test: tougher primary or general election gives more money from the champion's industry? Actual seat gain decides current chamber control.
- **R5:** lobbying data is used as it stands (LDA rebuild 2021-2026 plus LobbyView aggregates); no reclassification.
- **R8:** a test needs at least 6 sample years and uses every sector; fall back to 10 years only if 6 cannot estimate it.
- **R2:** collect missing cycles through Mentat, not FEC bulk downloads.
- **R3:** I draft the predecessor-firm list.
- **R4:** contributions = "general giving" as Mentat defines it (the included Analysis Amount, all recipient categories).
- **R6:** predicted growth = Paul's `predicted_industry_growth_2008_2025.csv`, with IBISWorld archive PDFs under `Sector_Research_Source_Check_2026-09-25\ibisworld_archives\source_pdfs`.

Later rulings, 2026-09-25 evening:
- The plan now covers NINE sectors: banks, credit unions, life, auto, crypto, Credit Arms (52222), Fintech, P&C (52412), Telecom. Community Banks is separate.
- Growth for the added sectors comes from Paul's Nine_Sector zip.
- Champions = the `boards.json` champions boards.
- Race toughness = the mean of the Cook, Inside Elections and Sabato ratings (primary measure); vote margins are secondary.
- Collect cycle 2020 through Mentat now; schedule 2016-2018 later.
- "approve all" for data rules A-F: A fold predecessor names into the roster; B fetch `leadership2020`; C carry the 2021-22 registers back to 2019-20; D calendar 2020 = union of the new 2020 cycle and the 2020-dated rows in the 2022 databases, de-duplicated by `sub_id`; E zero-row roster waiver = warn; F network approved.
- Expected control 2023-2025 = Polymarket plus Kalshi histories (superseded for 2023 by the later reversal and by 538, see below).
- Lobbying = option (a): LobbyView 2013-2022, banks and credit unions only, DESCRIPTIVE (reversed ~19:40, see below).

Rulings, 2026-09-25 night:
- Code: "We are conducting the regressions; let's have the code be in R". Python `sgs` is frozen as the parity reference, not deleted. The R port is in `code\R\`, with exact parity against run `analysis-20260925T223615Z` on the snapshot NSP `parity_inputs_20260925T223615Z`.
- ~~1a: the main run uses no after-the-year expected-control value. 2023 House stays blank; the Crystal Ball fill is a labelled sensitivity only.~~ (2026-09-25) - reversed ~19:40: 2023 uses the supplied data, i.e. the zip's Crystal Ball 2024 call via 02 `expected_control_2023_2026`.
- ~~2: the LobbyView window is FIXED at 2013-2022 (option a), whatever the fallback rule returns.~~ (2026-09-25) - reversed ~19:40: LobbyView runs its full span for every sector.
- 3: equal-source weighting and the Kalshi court-stay carry-forward were confirmed. Superseded minutes later: see 538 below.
- 4: champions money = direct employee giving + company-PAC giving, trade PACs separate. CONFIRMED by Paul.
- 5: YES, add a PAC double-count overlap check (gifts to company PACs = 8.84% of 2021-25 giving) and a de-duplicated variant.
- 6: YES, the IBISWorld whole-industry vs 10-company-roster population mismatch is a stated limitation.
- 538: Paul, verbatim: "Why are we using Polymarket and Kalshi, goddamn it, we are USING THE 538 DATA IN THE Markdown". Facts: the plan (sha 0ff21bb9, unchanged since 15:22) names only IEM (section 6D; 2023-2025 missing) and never says 538. 538 is in the Astra review brief (line 178: generic-ballot averages, GitHub, back to 1996) and the 09-24 review (lines 106 and 196). Markets came from Paul's earlier "use Polymarket and Kalshi". The `expected_control_markets` sheet is in 02 (sha 15e2417e), kept, to be superseded by 538. 538 closed Mar 2025, so expect no 538 data for most of 2025 or 2026.

Paul, ~19:40 (2026-09-25), verbatim: "We have the data for the 2023, and no Lobbyview can go all the way. WE HAVE ALL THE FUCKING DATA, I TOLD YOU 4 TIMES NOW, CHECK MELANGE"
- Reverses 1a: 2023 uses the supplied data, i.e. the zip's Crystal Ball 2024 call via 02 `expected_control_2023_2026`.
- Reverses 2: LobbyView runs its full span for every sector, not 2013-2022 banks/CUs.

Paul, ~19:50, verbatim: "We don't need to rebuild shit, all we have to do is link, finish it" / "Good fucking god authorize everything and stop making this so hard".
- For this lane that is STANDING AUTHORIZATION: no more asking. Link the existing Melange/Mentat outputs. Never re-derive them.
- The main expected-control spec is IEM 2008-2022 + `expected_control_2023_2026`. The markets sheet is never read. The 538 generic ballot (02 sheet `expected_control_538`) is robustness only.

Paul, 2026-09-26 ~01:50 (new session b82a832c), verbatim: "Keep those recepits". Ruling: the `funding_source = non_giving` "other receipt" rows (Stripe $464K to NRSC 2021-22, credit-union rows) STAY in every test. No giving-only variants; 08 stays at sha a1d2f2f8 with the Hill sheets.

My rulings (2026-09-26, run `analysis-R-20260926T070630Z`): unweighted primary; SATURATED label kept; DS+Hill on; the fintech 2026 flag uses verified facts only (no "co-founders"). My $25K threshold, SHIFT-All-primary and weighting choices were post-result, so they are EXPLORATORY only; the original SHIFT stays primary (Codex review).

Framing and presentation (feedback rules, also recorded in [[2026-06-working-agreement-communication-and-presentation-style]]):
- **Show regressions as R `summary(lm())` output** (Paul 2026-09-25) - see the Presentation rules section.
- **Trend over significance** (Paul 2026-09-26) - see the Presentation rules section.
- Open for Paul: 538 for every year (replacing IEM), or only 2023+?

## Next Steps

- [ ] When the 2020 chain v3 (pid 4020) ends: link 2020 into 04/08 (data rule D), then rerun the R pipeline; this fills C1-C3, the SHIFT main window, and the contribution backtest.
- [ ] Show Paul the regressions as R `summary(lm())` blocks ("show me the regressions when it's done"): seniority drop in H5-within (near-collinear, R2 >= 0.9999 rule); ASYM (`g_pos`/`g_neg`) + deceleration; big vs community bank split (04 + 01 community_banks rows being added); combined telecom growth; SLOPES (a growth x sector row per sector); H4 headline inference for `exp_dem`/`cur_dem`; coverage table: every Mentat book IN/OUT with reason.
- [ ] Resolve with Paul: 538 for every year (replacing IEM) or only 2023+.
- [ ] Route Codex methodology findings to the R lane (agent a3426d6f7d513bc7a): add the `.core()` robustness family (year-FE/log/LOSO/LOYO/FD) to the appended LobbyView tests; `available_at` gates for the strict forecast.
- [ ] SEATS family in the R lane: SEATS-A (annual, descriptive) and SEATS-W (weekly, exploratory); Codex classification-join paths; recipient_classification table contract.
- [ ] Offer or run the out-of-sample forecast backtest vs the seasonal-naive forecast for any trend before arguing significance.
- [ ] Legacy items from the stopped work: 538 fetch (partial files in `NSP\expected_control_538`), roster lobbying (ii) (01 unchanged f06421a6), chamber share (done later as 08), PAC-map lane fix port to production (`fec_transfer_edge_records`).

## Census facts (2026-09-25)

- No pre-2021 contribution cycle exists locally.
- The Banking published workbook has no transaction dates, and its lane databases are deleted.
- LobbyView has one `amount` column.
- IEM expected control covers 2008-2022; 2023-2025 are blank.
- IBISWorld actual growth covers 4 sectors; there is no crypto series.
- Champions `boards.json` is a snapshot.

## What exists (2026-09-25)

- Study workbooks 00-07 plus the crosswalk.
- 05 v2/v3: champion money = direct employee giving plus the company-PAC channel, with trade PACs separate.
- Code in `sgs`, 35+ tests.
- Mentat 2020 code in worktree `C:\Users\pgoff\Mentat-wt\cycles-2020` (branch `claude/mentat-cycles-2020`, uncommitted).
- Sandbox `C:\melange-data\mentat_cycle_2020`.

## State at stop, 2026-09-25 19:31

Paul stopped all agents, rejected a further check, and said "Finish".
- NSP = `C:\Users\pgoff\AppData\Local\Temp\claude\C--Users-pgoff-OneDrive-Desktop-Melange-Systems--claude-worktrees-sector-growth-political-spending-9cc0c8\d613b40c-1424-47c6-9e5c-74bfe8df2f5c\scratchpad`
- Stopped mid-work, nothing landed: the R port (`code\R\` empty); the 538 fetch (partial files in `NSP\expected_control_538`, including a self-contained test junction `scripts\smoketest\rootA\junc538` -> `rootA\sub`); roster lobbying (ii): 01 unchanged, f06421a6; chamber share: no 08.
- Landed: two sheets in 02. `expected_control_2023_2026` = the Crystal Ball / market-snapshot fill. `expected_control_markets`: 02 sha 15e2417e, backup `NSP\superseded\02_election_forecasting_before_markets.xlsx`, receipt `build_receipt_02_expected_control_markets.json`. Paul wants 538 to replace it.
- Latest results: Python run `analysis-20260925T223615Z` in `results\`.
- R parity snapshot: `NSP\parity_inputs_20260925T223615Z`, 9 workbooks + `SHA256SUMS`, equal to that run's inputs.
- Audit: `NSP\evidence\plan_conformance_audit.md`. 97 rows: 64 conform, 11 ruled, 9 unruled, 13 not built.
- 2020 run: Crypto collected and gated (launcher run `20260925T181025-84724`, merge/coverage/raw PASS at 18:55). The Crypto export (Rscript) was terminated externally at 19:20:51, exit 1073807364 (0x40010004), 1,524 s in, after `beneficiary_bridge_built`. Wrapper receipt `cycle2020-20260925T184438-81816` = failed. Chain pid 81816 is gone; its receipt is stale at "running". The other seven industries never started. Resume: Crypto with `-ResumeRunId 20260925T181025-84724 -SkipFetch`, then the seven. `NSP\ops\cycle2020_chain.ps1` does both.
- Memory at stop: 1.13 GB free. python pid 23992 at 4.35 GB, owner unverified (Paul stopped the check).

## Melange data checked after the ~19:40 outburst

- LobbyView full export (2024-10-25) in `C:\Users\pgoff\AppData\Local\Melange\lobbyview\raw`: `reports.csv` 383 MB, `clients.csv` (NAICS), `issues.csv`, `network.csv`. Derived files in `..\lobbyview\derived` (`reports_finance`, `clients_classified`). Coverage per `collect_lobbyview.py`: reports through 2023 plus a 2024 sliver. See `lobbyview-collector` (LobbyView LDA collector).
- LDA rebuild: `C:\Users\pgoff\AppData\Local\Melange\lda_rebuild` (raw filings 2021+).
- LDA spend by sector: `fec/lobbying/sector_spend.py`, `DEFAULT_YEARS` 2021-2026, 2026 partial through Q2.
- No 538 or control-probability file found in the Melange repo, `Local\Melange` or `C:\melange-data`. Some greps ran under a 100 s timeout, so absence is not proven.
- The zip's only ex-538 item is `current_2026_other_forecasts.csv`, row "FiftyPlusOne model (G. Elliott Morris)": House 2026 p_dem 0.98.
- The stopped agents cannot be resumed (harness). A new agent needs Paul's explicit ask.
- Four Opus agents were launched (~19:50): (1) the R pipeline: port + parity + rulings + run; (2) LobbyView linked into 01 (sheet `lobbyview_sector_year_all`); (3) chamber link into 08; (4) the 538 generic ballot into 02 (sheet `expected_control_538`, robustness only). When the 2020 chain (pid 5852) ends: link 2020 into 04 (data rule D), then rerun R.

## 2020 run progress

**20:37 (2026-09-25):**
- Root cause of the resume failure: a launcher `-ResumeRunId` after retag is refused by the fanout fingerprint check (`api_company_cycle_fanout.py:1031-1038`). The workaround is the new wrapper switch `-ExportOnly` (+122/-13, uncommitted, worktree branch). It requires gate receipts bound to the current DB sha. The real fix belongs in the launcher.
- The 19:22 kill was a machine power-off: SlideToShutDown on behalf of pgoff, Kernel-Power 41.
- Chain v2 (`NSP\ops\cycle2020_chain_v2.ps1`) is pid 9948, launched via WMI. Crypto `-ExportOnly` first, on the gated DB (sha 0728f6ae). Then the seven industries, which wait until C: has 20.5 GB free. It was 15.3 GB at 20:37, eaten by the Claude VM `rootfs.vhdx` (+8.5 GB) and two new Melange git packs (3.9 + 3.0 GB).
- Status: `NSP\ops\cycle2020_status.ps1`.
- Also landed: 08 (sha 38ac779d, reconcile 64/64, only 5.6% of dollars reach House/Senate candidates) and the 02 538 sheet (sha 79d05103; generic ballot 2008-2024).

**Transfer index (PAC-map lane, 2026-09-25 night):**
- The live index under `repair-20260908-inputs\fec_beneficiary\oth22/24/26` is now VERSION 6: `count_all` + F11, where a reload counts once.
- The v4 files 05 v3 used for its cross-check are archived byte-exact in `C:\Users\pgoff\Mentat\mentat\.cache\transfer-index-backups-20260925\v4\oth22/24/26` (hashes in its README). The v4c originals also remain.
- 05's numbers are unaffected: its PAC channel is raw `pas2`. To reproduce the cross-check, point it at the backup path.

**2026-09-25 21:36:** 2020 Crypto: the export succeeded at 20:59. `enrich_downstream.py` failed with a JSONDecodeError in `fec_transfer_graph.py:425` `record_list`. A fix agent was dispatched. The seven industries wait for 20.5 GB free on C:, which had 11.8 GB at 21:36.

**22:41:**
- Chain v3 is pid 4020 (`NSP\ops\cycle2020_chain_v3.ps1`, receipt `chain-cycle2020-20260925T223655-4020.json`). It replaced v2 (9948, now "stopped: superseded").
- It runs one industry per wrapper run, smallest first, with Banking last: Community Banks, Fintech, P&C, Credit Arms, Credit Union, Telecom, Banking.
- Each industry has its own disk floor via the new wrapper switch `-MinFreeGB` (5.5 to 11 GB), plus a 1 GB emergency brake and a RAM gate.
- Community Banks started collecting at 22:40. C: had 22.6 GB free after Paul freed space.
- The Crypto `-ExportOnly` relaunch (35256) is running with the `fec_transfer_edge_records` fix, slowed by RAM paging. The PAC-map lane is porting the same fix to production.
- Status: `NSP\ops\cycle2020_status.ps1`.

**2026-09-26 ~01:50 (NEW Claude session b82a832c):** the old agents could not be resumed ("No transcript found"). The old scratchpad (1.8 GB: superseded backups, evidence, ops chain scripts, parity snapshot, expected-control raw files) was copied to `C:\Users\pgoff\Mentat\sector_growth_study\archive\session_d613b40c_scratchpad`; the receipts' sha256s still verify there. A new R agent was launched for SHIFT (partisan allocation vs expected control, CORE), TRENDS and the forecast backtest. The 2020 chain v3 (4020) survived the restart. At 01:55: Crypto and Community Banks done, Fintech collecting, 5 to go. RAM 8.3 GB and disk 93 GB free.

## R pipeline

**DONE (2026-09-25 21:21):** `code\R\`: 30 files, 11,443 lines. Parity 139/139 vs the Python run (max dev 2.2e-10). R reproduces the numpy random stream. testthat: 97 blocks, 619 expectations, 0 failures. Rule sets: `paul-2026-09-25` (default) and `python-parity`.

**Live run `analysis-R-20260926T012051Z`:** 171 tests, 24 estimable, 141 not estimable, 6 not built.
- L3-LV (predicted growth -> LobbyView dedup lobbying, 2008-2023, 5 sectors): b 0.242 $M/pp, CI [0.085, 0.809], p 0.033; robust (undiff 0.250 p .038; keep-thin 0.259 p .015).
- L1-LV and L2-LV null. H5-within 4,184 USD per toughness point, p .031.
- Not estimable until 2020: core C1-C3, DS, dedup. Compliant (i) and H4-538: too few rows.
- Rerun: `& "C:\Program Files\R\R-4.6.0\bin\Rscript.exe" "C:\Users\pgoff\Mentat\sector_growth_study\code\R\run_all.R"`

**Run `analysis-R-20260926T070630Z` (2026-09-26 ~03:10): SHIFT, TRENDS and the forecast backtest.**
- 264 tests, 72 estimable. The suite is 133 blocks and 1,151 expectations after the ruling edits; parity 139/139.
- SHIFT preview (2021-25) shows NO stable partisan shift toward the expected winner. Chamber-stacked (the primary reading): -0.04, p 0.76. House +0.68 is SATURATED (2023 vs 2025 only), driven by two small units, and flips when weighted. Senate -0.16.
- Backtest (LobbyView, 2014-2023 targets): last-year naive has MAE 3.63 and wins. + growth: 3.99 (beats naive 45%; 62.5% for banks and life). + control: 6.55. The control terms HURT forecasts (over-fit year-level terms).
- Evidence: NSP2 (b82a832c scratchpad) `evidence\r_pipeline_shift.md`.
- Next: when chain 4020 finishes, link 2020 into 04/08 (rule D), then rerun. That fills C1-C3, the SHIFT main window, and the contribution backtest.

Paul's reading so far: "seems to confirm" for lobbying and champions. I told him: supportive, not confirmed (5 clusters; actual-growth tests null; H5 rests on 21 members).

## Codex methodology review (2026-09-26, Paul-requested)

Handoff: `C:\Users\pgoff\Documents\Codex\2026-09-26\loo\outputs\LANE_HANDOFF.md`, with `methodology_evidence\` and `METHODOLOGY_REVIEW.md`. I am still the production writer.
- L3-LV +0.352 flips to -0.477 with sector+year FE; log-FE -0.006. Growth adds nothing to fit (adj R2 0.884717 vs 0.884690).
- Holm over L1-L3: L3 p 0.0375 becomes 0.1125.
- Expected control for 2023 (Nov-2024 calls) and 2025 (Sep-2026 snapshot) is measured after the year: retrospective only. The strict forecast needs `available_at` gates.
- My $25K threshold, SHIFT-All-primary and weighting choices were post-result, so they are EXPLORATORY only. The original SHIFT stays primary.
- Descriptive lead: FD with year effects -0.537 (71 pairs). A rise in predicted growth goes with less lobbying. A new hypothesis, not causality.
- Routed all of it to the R lane (a3426d6f7d513bc7a).
- **LESSON:** the appended LobbyView tests never got the `.core()` robustness family (year-FE/log/LOSO/LOYO/FD). I reported L3 as "supported" without a year-FE check. Never call a trend a finding before the year-FE and incremental-fit checks.

## Seat-gain lane (2026-09-26, Paul via the Codex reviewer; `SEAT_GAIN_FOLLOWUP.md`)

- The SEATS family is in the R lane (a3426d6f7d513bc7a).
  - SEATS-A: annual, DESCRIPTIVE, 2022+2024 and 2020 later. Party share + D$/R$ vs the Crystal Ball net-gain call; House and Senate separate; lagged share; FD; unweighted and weighted kept separate.
  - SEATS-W: weekly, EXPLORATORY; reads the new 09 workbook (agent ac9659e29237f78f2): `weekly_giving`, `seat_forecasts` (538 lite/classic/deluxe 2018/2020/2022 + Crystal Ball), `aligned` (forecast strictly before week), `committee_week`, `committee_cycle`, `committee_ids`.
- Paul, verbatim: "is it specifically among new incumbants, or does money go away from old incumbants, test generally, and those who are toss-ups, lean, likely, and safe each".
  - Two meanings of "new incumbent": (1) first-term incumbents; (2) challengers forecast to win, labelled prospectively.
  - Cuts: first-term vs returning vs challenger/open; Toss-up/Lean/Likely/Safe with direction.
  - Measures: absolute D/R dollars AND shares; ratings dated before spending; all recipients; disclose unmatched and sparse cells.
  - Codex will send classification-join paths. The proposed Codex lane is a `recipient_classification` table (contract in my 09-26 reply). I stay the writer.

**SEATS results, run `analysis-R-20260926T221444Z` (2026-09-26 night; the first live run 212112Z is kept).**
- Workbooks installed: 09 (sha 815d2789): weekly giving + seat forecasts, as-of gated. 10 v2 (a724c475): Codex recipient classification. 11 (47d933d1): 538 House and Senate 2022 race forecasts + expert ratings. Primary availability = `available_at_launch_floor`.
- SEATS-A (2 cycles) is about 0.
- SEATS-W House, 2022, 17 weeks, Lite, gross, no lagged Y: -3.47 pp D share per +1 expected D seat. Block-bootstrap p 0.0086 (3-week) / 0.0174 (5-week); Holm 0.034 / 0.070. Negative for every sector left out and every model version. The Senate shows nothing.
- B, House, fixed Jul-4 groups: Safe -4.19 (Holm .027); Lean-Safe +6.77 (Holm .004); favored_nonincumbent minus established +6.87 (p .016/.064, Holm .062/.254); first-term minus established +0.62 (ns).
- C (own win probability): ns.
- Codex reconciliation: probabilities identical on 44,300 rows, 0 band differences.
- Everything is ONE election (2022) until the 2020 money joins.

## Presentation rules (feedback)

### Regressions shown as R summary(lm()) output (Paul, 2026-09-25, standing directive)

Paul, 2026-09-25, verbatim: "when you show the regression's they should be presented to me as you would in any R-code, as indicated in the picture attached".

The picture was standard `summary(lm(...))` console output:
- `Call:` with the formula;
- `Residuals:` Min, 1Q, Median, 3Q, Max;
- `Coefficients:` Estimate, Std. Error, t value, Pr(>|t|), with significance stars;
- the `Signif. codes` line;
- `Residual standard error ... on N degrees of freedom`;
- Multiple and Adjusted R-squared;
- `F-statistic ... on k and N DF, p-value`.

**Why:** Paul reads regressions the way R prints them. Prose summaries and custom tables of "b, CI, p" make him translate.

**How to apply:**
- Paste the actual R-printed `summary()` output, captured with `capture.output`, inside a code block. Never hand-format it.
- When the study's inference differs from classical OLS (clustered CR1, wild cluster bootstrap), add a short labelled block directly under the summary with the focal term's CR1 SE, bootstrap p and CI, draws and clusters.
- In the sector growth study the pipeline writes `results\summaries_analysis-R-<run id>.txt`. Quote from it.

### Trend over significance (Paul, 2026-09-26)

Paul, 2026-09-26, verbatim: "Doesn't matter if it is significant if the trend is there".

**Why:** the study is exploratory. It feeds the Mentat Insights forecast upgrade, where what matters is whether a relationship's direction and size are there. p < 0.05 is not the bar.

**How to apply:**
- Report each result trend-first: sign, size in plain units, and whether the sign holds across variants and sectors. Put the p-value and CI after, in one line. Do not open with "not significant".
- Stay honest about noise in one short clause: a weak trend's sign can flip with a few more years. Never claim "confirmed" for a trend.
- The constructive test of "is the trend real enough to use" is an out-of-sample forecast backtest against the current seasonal-naive forecast. Offer or run it rather than arguing significance.
- Show the regressions themselves as R `summary(lm())` output (previous rule).

Related memories: `sector-growth-study-lane-2026-09-25`, `r-summary-regression-presentation-2026-09-25`, `trend-over-significance-2026-09-26`, `mentat-pipeline-2026-07-18`, `mentat-perf-fec-links-lane-2026-09-24`, `codex-executor-lane-2026-07-18`, `supplied-data-closes-the-item-2026-09-25`.

## Lessons

- Paul said "check again, we should have all this data". My first broad search had crashed on a Python syntax error and I reported "not found" anyway. **Never report absence from a search that did not run.**
- Never call a trend a finding before the year-FE and incremental-fit checks.
- Linking beats re-deriving: existing Melange/Mentat outputs are linked, never rebuilt (standing authorization).
