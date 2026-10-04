---
type: topic
title: "Melange boards and build lane (09-22/23) (UI redesign boards)"
aliases: ["UI redesign boards (Melange and Mentat): Melange boards and build lane (09-22/23)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-09-21
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/frontend", "category/feature"]
part_of: "[[2026-09-feature-ui-redesign-boards]]"
---

# Melange boards and build lane (09-22/23) (UI redesign boards)

> The Melange dashboard redesign boards of 2026-09-22 and the Melange build lane of 09-22/23, with its method, traps and overlay-first architecture. Part of [[2026-09-feature-ui-redesign-boards]] (project [[melange-systems]]).

## Melange redesign boards (2026-09-22; `melange-redesign-boards-2026-09-22`)

Memory description: "Melange (`Moneyball.html`) redesign boards `#24`-`#43` for 14 sections + shared app bar, made 2026-09-22 in Higgsfield from a read-only census of the live page; review artifact `ACtbyuFUo5wbRDfoMJB3a5` records picks in its db; 15 picks + v2 recolour APPROVED; build prompts in `packet/prompts`; Figma file `q6BMpPjt2FccwNnJwFtIBe` on a Starter View seat = 20 MCP calls/MONTH". Memory last modified 2026-09-22T16:00Z; originSession 77716a2f.

**State:** 20 boards (`#24`-`#43`; numbered after the Mentat lane's B10-B23 so replies cannot collide; options named in words). Review page https://claude.ai/artifact/ACtbyuFUo5wbRDfoMJB3a5 shows today's screen, findings, boards, a Don't-copy line per board and a pick control per section. Picks save to the artifact db: collection `picks`, one doc per section id (shell, map, mappanel, members, profile, compare, bills, efficiency, coalition, industry, org, champions, cosponsor, filings, staffer), body `{choice, note, at}`; read with `ArtifactData`. Figma NOT used at first (plugin figma MCP unauthorized); offered a Design-canvas artboard per picked board instead.

**Files (session scratchpad 77716a2f.../`melange_ui_review/`):** `current/` 150 PNGs of 50 views + `census/SECTIONS.md`, `census.json`, `DATA.md`/`json` (real on-screen values, items 1-17), `TOKENS.md`; `boards/` full PNGs; `review/` page + `img/` JPEGs; `tools/` `capture.js`, `extract_data.js`, `to_jpeg.ps1`.

**Method that worked:** an architect agent captures + censuses the live page read-only (in-script Node static server on 127.0.0.1:8802, block the 8841 staffer probe), a second pass extracts the exact values each board needs; pilot board `#27` with today's Members list as `image_references`, then every later board uses the pilot's job id (`03f7e0ad-0d4e-4c3f-b085-6c5f27c6e35a`) as style reference; `gpt_image_2_5` high 2k 16:9 = 3 credits each (60 total per the transaction log, 13:39-14:19Z; balance read 107.9 after because another lane's 17 boards, 51 credits stamped 04:01-04:09Z, posted in between: balance deltas mislead, use `transactions`).

**Traps seen (put in each build prompt's Don't-copy list):** model copies a value from the row above (`#43` Monroe 1,194 vs 1,907); invents totals (`#37` bar tops); mislabels years (`#36` "2025 so far"); fills matrix cells wrongly (`#32` Vargas FOM); paints data bars gold (`#38`, `#41`) although gold is chrome; draws decorative network layouts (`#24`-`#26`).

**Live findings behind the boards (deployed page built 2026-09-20 16:01, main e9a68af18):** member sheet's Back/Print/Main dashboard buttons sit under the sticky tab bar at 1440x900; page behind the sheet still scrolls; industry roster organisation buttons do nothing inside `Moneyball.html`; Champions/Cosponsorship/Bills/CU×FT screen/Filings leave the app; map opens on Interchange (514 of 533 grey); one member's Filings page is 509,929 px; `Moneyball.html` 106.6 MB, median load 5.3 s. `make_combined.py` and `make_dashboard_html_00.tpl` had uncommitted edits newer than the deployed page.

**Picks 2026-09-22 (artifact db, no notes):** app bar adopt; map `#24`; map panel `#26`; members `#27`; profile `#29`; compare `#31`; bills `#33`; efficiency `#34`; coalition `#35`; industry `#37`; organization `#38`; champions `#39`; cosponsorship `#40`; filings both `#41`+`#42`; staffer `#43`.

**Recolour (Paul: "adjust the coloring to make sure it fits with the current color scheme, you are using the old one"):** the black/gold `:root` in the templates is the OLD scheme. CURRENT = `--ml-*` tokens in `fec/surfaces/approved/workspace.css` (page `#f7ede4`, surface `#fcf7f4`, alt `#eee3db`, rule `#d8cbbc`, ink/nav `#342649`, active `#57447b`, dark panel `#403153`, graph `#17131d`, accent `#eca91c`, selection `#e2d5e8`, muted `#6b5e73`, radius 4px, control 36px, row 44px, rail `clamp(150px,11.667vw,168px)`, fonts `articulat-cf` + `freight-text-pro`), as rendered by the research workspace on 8841 (left purple rail: Influence, Members, Industry, People / Research: Bills, Reported interactions, Champions, Forecasts, CU × fintech / Methods). All 15 picks redrawn as v2 (`boards_v2/`, review `img/b??v2.jpg`, artifact version 2): rail kept, app-bar parts (search, data chip, Compare) moved into each page head, flagged to Paul, his call. v2 style ref = pilot job `b817216c-c83a-4028-a13d-4fdf36d9bc15` (+ `445e0285` current Influence page for the dark map boards); 15 boards × 3 = 45 credits. Screenshot tool for the current theme: `tools/shoot_current.js <views> <waitms>` (views load slowly; 20000 ms).

**Recolour APPROVED 2026-09-22.** Paul: "#34, could be a calculation error but that is the suggest amount / Figma gets my authorization / I like the colors / I approve the the App Bar and Names / Go". So: keep `#34`'s Suggested column; v2 colours, rail plus page-head app bar and names approved; build prompts written to `packet/prompts/00-16`.

**Figma (claude.ai connector, NOT the plugin server; the plugin server needs OAuth this session can't run):**
- `whoami` = Paul Goff's team, Starter plan, **View seat = 20 MCP tool calls per MONTH**. Only `whoami`, `create_new_file` and `add_code_connect_map` are free. Figma account email [personal email omitted]; an Education plan would lift the cap to 200/day (his call).
- File `q6BMpPjt2FccwNnJwFtIBe`: https://www.figma.com/design/q6BMpPjt2FccwNnJwFtIBe (created 2026-09-22).
- Method to save calls: HTML mocks (`mock/`, contract `mock/CONTRACT.md`: flex-only subset) are verified locally; `figma/convert.js` turns the DOM into JSON; `figma/renderer.js` runs inside `use_figma`; payloads are <=48k chars with several screens per call; `await node.screenshot()` inside `use_figma` gives visual proof without a `get_screenshot` call.
- Agents never call Figma; only the main session spends the calls.

**Next (then):** build the mocks, then spend about 10 calls, then add Figma node links plus codemap sections to the prompts, then publish the packet. Nothing in the live tree changes until his go.

Related: `mentat-redesign-boards-2026-09-21`, `ui-simplification-2026-08-11`, `desk-plain-language-2026-08-31`, `melange-ui-retheme-2026-08-06`, `higgsfield-connector-account-trap-2026-09-17`, `ask-before-substantive-changes`.

## Melange build lane (2026-09-22 to 2026-09-23; `melange-redesign-build-lane-2026-09-22`)

Memory description: "Build lane for the Melange 09-22 boards (`#24`-`#43`, prompts 01-16): overlay-first in the v2 workspace, staged in session 5ab381bb scratchpad, Workflow per phase; Paul confirmed target 'Melange 09-22 boards' (not Mentat, not the 09-21 workspace)". Memory last modified 2026-09-23T04:36Z.

- Paul, 2026-09-22 (session 5ab381bb, worktree `melange-ui-redesign-372c43`): "Finish the interface according to the instructions, familiarize yourself, then finish", attaching `busy-kapitsa-3272db`. That worktree is the MENTAT console redesign lane (its session 8a67e999 scratchpad holds Mentat build01/01b/04/05); the Melange packet lives in the `nervous-hamilton-7e2d50` session 77716a2f scratchpad (`melange_ui_review\packet`). Asked; Paul picked "Melange 09-22 boards". Then "Switch to Ultracode".
- **Architecture decision (lead's, brain decision draft): OVERLAY-FIRST** (see Decisions in [[2026-09-feature-ui-redesign-boards]]).
- **Facts that bit or will bite:** the README's `--ml-*` tokens are NOT used by the served v2 shell (unprefixed `:root` in `approved/clean/app.css`, identical values); 8841 serves `Moneyball_Redesign.html` + `staffer_live/approved/*` (byte copies of `approved/clean/*` made by `build_clean_workspace.py`, which has no copy-only mode and regenerates all presentation data); the next chain run's `sync_live_dashboard_alias.py` would overwrite the v2 shell with `Moneyball.html` (pre-existing, flag to Paul).
- **Staging:** harness in `SP\` (SP = that session's scratchpad): `stage\base` reproduces LIVE's served v2 output byte-identically (564/564 files); tools `stage_server.js` (routes of 8841, /api GET proxy, ports 8820-8829 only), `capture.js` (Playwright from the Codex runtime + installed Chrome), `sbs.py`, `colormap_check.py` (`ranks_python.json` md5 `f97b0e2c7017ee026bf8f5dc19c3c440`), `new_stage.py`, `lane_share.py` (publish/sync owned files between lane stages), `gb_emit.py` (Glass Box events, run_id `melange-redesign-20260922`). Shared brief `SP\lane\BRIEF.md`; proofs `SP\proof\NN\`.
- **Plan:** Workflow 1 = build 01 (shell head, search, data chip, compare store/tray, `ui-kit.css`/`js`, routing + stub overlay files) + two Fable reviews + fix loop. Workflow 2 = four lanes (A 02,03,07,06; B 04,05,14,15; C 08,09,16,13; D 10,11,12), each build, Fable review, fix. Workflow 3 = integrate + completeness critic. Then apply to LIVE (hash-guarded; untracked v2 files; run LIVE `build_clean_workspace.py`); Paul reviews on 8841 and commits.
- **Progress 2026-09-22 21:30:** Melange 01 DONE (2 Fable reviews + 2 fix rounds; proof `SP\proof\01`, patch `build01.patch`). Paul then added: "finish the UI updates for the Mentat model ... the ones most recently, early afternoon" = Mentat packet README 11:44 + prep02 briefs (census `SP\mentat_census`). Mentat folder access was granted via `request_directory` (a brief that told agents to write via Python around tool refusals was DENIED as a bypass: never do that). Session crashed 21:24:57 (SlideToShutDown power-off event; machine did NOT reboot). AppXSvc leak ~26 GB commit; this session is NOT elevated, Paul must `Restart-Service AppXSvc -Force` as admin. Runs (resume with `Workflow` `scriptPath` + `resumeFromRunId`; scripts under the session's `workflows\scripts\`): Mentat finish `wf_3d48ae22-49b` (04 passed; 02/06 fixed), Melange lanes A+B `wf_2abebdcc-0e5`, lanes C+D `wf_a75fe011-cc8`. Base stage lost 10 `staffer_live` files at 20:08 (cause unknown; restored from LIVE, `INPUTS.sha256` verifies).
- **Disk 2026-09-22 23:3x:** C: hit 0.4 GB free (AppXSvc commit 37 GB led to pagefile growth). Paul: "clear 50 GB". Sparse-checkout `/*` + `!/audits/legfix5/` applied to `melange-ui-redesign-372c43`, `busy-kapitsa-3272db`, `nervous-hamilton-7e2d50`, giving 53 GB free, git status unchanged, undo = `sparse-checkout disable`. TRAP: from Git Bash the pattern MUST run with `MSYS_NO_PATHCONV=1`, else it is stored as `!C:/Program Files/Git/audits/legfix5/` and silently does nothing. AppXSvc cannot be stopped even elevated (1051 dependent WSAIFabricSvc; then "cannot be stopped"; taskkill access denied); only a reboot frees it (see `appxsvc-leak-pythonmanager-2026-09-23`).
- **Reboot + finalize plan (Paul 09-23 00:3x: "When it is ready to reboot, reboot"; earlier: "Once you are done building do a one-to-one, finalize, and then debug"):** the lean build run is `wf_de0fe38b-a24` (script `ui-finish-lean`). When it completes: reboot (`shutdown /r /t 120`), which frees AppXSvc (41.7 GB commit) and the grown pagefile. After restart (Paul reopens this session): Paul restarts 8841 (his), then launch the FINALIZE workflow: one-to-one audit of every Melange screen (integration stage `SP\stage\integration`, boards /1.867) and every Mentat screen (boards /1.25) by two Fable auditors each + debug sweep (console, interactions, data: Mentat Insights Recipients "-" and $0 new/no-longer bars; PAC maps nearly empty; Melange Influence Targets 7 rows vs board 12 (`build_clean_workspace` `ORD.slice 7`), Color default Field record vs Overall standing, Industry leftover Posture wording panel), then fix (one writer per product), re-audit until clean, apply Melange to LIVE hash-guarded (`APPLY_MANIFEST.md`; run LIVE `build_clean_workspace.py`), publish a report Artifact with side-by-sides + scores. No commits.
- Related: `melange-redesign-boards-2026-09-22`, `mentat-redesign-boards-2026-09-21`, `ask-before-substantive-changes`, `glassbox-everything-rule-2026-07-27`.
