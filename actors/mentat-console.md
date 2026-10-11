---
type: actor
name: "Mentat console"
aliases: ["Mentat console (8806/8812)", "Chart Studio"]
category: "dashboard"
description: "Local Python web console (stdlib HTTP server plus vanilla JS/CSS, Jinja2-rendered shell) that serves Mentat's published workbooks and contribution data: Chart Studio, Graph, Insights, Cross-reference, PAC evidence with district maps and Flow, Loading and Collection views."
repository: "C:\\Users\\pgoff\\Mentat"
stack: "Python (server.py stdlib HTTP, launcher Python 3.12.14 then own venv %LOCALAPPDATA%\\Mentat\\venv), vanilla JS/CSS in mentat/app, Jinja2 runtime templates, SQLite/JSON caches, node --test and browser .cjs suites, PowerShell launcher Start-MentatApp.ps1, offline GeoPandas/Census tools"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "/api/evidence-network still 3-4 s for CULAC; pac_evidence.receipt_role perf is a frozen money file (Paul's)"
  - "Console Python was reset by the Codex app (lost geopandas/jinja2/geopy); durable fix = own venv (lane V2, %LOCALAPPDATA%\\Mentat\\venv)"
  - "Editing server code or analysis_data.py / contribution_query_store.py makes running consoles refuse Insights and chart queries until restart"
  - "Alaska inset has a pre-existing 67% scale defect; Attributed estimate / Attributed Flow producer unbuilt"
  - "Banking workbook rebuild fails the receipt-evidence gate (2,070 rows) until Paul extends fec_receipt_rules.json (2026-09-12)"
  - "8812 'older build' banner shows while on 8812; 8806 restart is Paul's after server-side changes"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-map-downstream-viz-lane-2026-09-25.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-map-downstream-viz-lane-2026-09-25.md", sha256: "0fcda1900a836706033872f85cb6e6351173f1e06695886b91908cb7c93db1e3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-perf-fec-links-lane-2026-09-24.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-perf-fec-links-lane-2026-09-24.md", sha256: "2de8100bff9f833a33ac93e77ce67df77c36b4e281e1eff0e7bed154f6c3d446"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-redesign-boards-2026-09-21.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-redesign-boards-2026-09-21.md", sha256: "f6f7dec8e219f8c549b279aa4e9cc6f8fadc533ea1187ac22edfa4c9e9a36459"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-console-startup-hang-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-console-startup-hang-2026-09-18.md", sha256: "64f937877616a1ec94000d791831999bba8f53fab41a80e28b8a26a2dce04a9d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-system-debug-lane-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-system-debug-lane-2026-09-13.md", sha256: "e7118cf1a8941e3e3c3ba7bdbc7b658fb29d27a2ebd23994606aa2370858b990"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-chart-studio-2026-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-chart-studio-2026-09.md", sha256: "9a490f3f4b6f52f21581ea4df39b58ea59cc6035c9aa0186f3a65ab7e940695d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-github-migration-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-github-migration-2026-10-02.md", sha256: "1df4b9e5d59c94f40126fc2589fb000affbd73e13b77c8b8f30fef0398d56f78"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-forecast-overnight-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-forecast-overnight-2026-10-07.md", sha256: "4c3528dd1b1ce0c6fbd7d34f2725488a37b08c2579b38811b962e58cd6b9abd7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/data-presentation-fixes-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\data-presentation-fixes-2026-10-09.md", sha256: "7eead6e6d9bb735454e3f7e594d690ff3205a807b8938cf9be2c08fd7520733d"}
doc_sources:
  - path: "C:\\Users\\pgoff\\Mentat\\PRODUCT.md"
    sha256: "586e0f53c31a5beb168521db257fdbbb1e0c08bc67513e7ec75316b56f67efc3"
    as_of: "2026-09-20"
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/frontend"]
---

# Mentat console

> The local Python web console for the [[mentat]] project: Chart Studio, Graph, Insights, Cross-reference, PAC evidence (district maps, Flow), Loading and Collection views. Paul's console runs on port 8806; a read-only test instance runs on 8812. It reads the published industry workbooks and the contribution data that [[mentat-fec-pipeline]] produces.

## Parts

- [[mentat-console-chart-studio-and-system-debug]] — The Chart Studio tab of the Mentat console and the 2026-09-13 system-debug lane: the Tableau-style builder, its patches and redesign, and the read-only test ride.
- [[mentat-console-startup-and-polish-lanes]] — The Mentat console startup hang fix of 2026-09-18 and reference summaries of the polish, load-time and graph-quirks lanes of 09-19 to 09-25.
- [[mentat-console-redesign-boards]] — The Mentat console redesign boards of 2026-09-21/22: the Higgsfield board set, the build-01 shell and its open review items.
- [[mentat-console-pac-map-viz-lane]] — The PAC map and downstream visualisation lane on the Mentat console (2026-09-25 to 09-27): Higgsfield boards, Opus builders, Paul's rulings, fidelity rounds and the money revert.

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\Mentat` (branch `codex/mentat-crypto`, console code in `mentat\app`, tools in `mentat\tools`, tests in `mentat\tests` and `mentat\app\tests`); also reachable as sibling worktree `Mentat\.git` -> `Melange Systems\.git\worktrees\Mentat`; mirror pushed after commits |
| Stack | Python stdlib HTTP server (`mentat/app/server.py`), vanilla JS/CSS, Jinja2 runtime templates (since 2026-09-19), SQLite/JSON caches, Node tests, PowerShell launcher |
| Status | active |
| Criticality | high |
| PCI | no |
| Team | none |

### Instances and ports

| Port / name | What it is |
|---|---|
| 8806 | Paul's only console (data root `C:\Users\pgoff\AppData\Local\Mentat\console`, report dir `C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files`); launched by `Start-MentatApp.ps1`; restart is Paul's (or via its own `/api/restart` route while idle) |
| 8812 | read-only test instance (`python server.py --port 8812 --read-only`, via a temp `.claude/launch.json` entry; restore the tracked file afterwards). Also the build-01 server on 2026-09-22 |
| 8802 / 8803 / 8804 / 8808 | Paul's older long-running consoles (started 2026-09-11..12); 404 `/chart-comparison.js` until restarted because server.py's static allow-list is frozen at process start |
| 8813-8819 | build ports of the 2026-09-22 redesign packet (01 = 8812, 02 = 8813, 04 = 8814, 05 = 8815, 06 = 8816, 03 = 8817, 07 = 8818, 08 = 8819) |
| 8814 | also the read-only instance the Pocket extractor used |
| 8816 | proven target of the launcher's idle-stale restart on the SAME port (2026-09-14) |
| 8821 | Melange stage proxy (not Mentat) |
| 8822 | Mentat stage proxy to 8812; also the writable verification console of 2026-09-14 and the 8822/8823 pair |
| 8823 / 8824 | read-only integration verifier / fix-lane console (2026-09-14) |
| 8831 / 8832 | verification consoles (wording pass, clean-checkout proof of commit D) |
| 8841 | NOT Mentat: the Melange staffer sidecar (7.4-7.7 GB RAM); killed on Paul's order 2026-09-27 |

## Dependencies

- Depends on: published industry workbooks (`C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files`) and the pinned report analytics cache (`mentat/.cache/industry-report`), produced by [[mentat-fec-pipeline]] (R export, `crypto_workbook_builder.mjs`, `build_industry_report.ps1`); pinned `mentat.db` snapshots (e.g. `...\.cache\report-repairs\banking-20260910\data\mentat.db`, 783,808 rows); `mentat/inputs/` (gitignored: `fec_receipt_rules.json`, `verified_company_affiliations.json`) and `mentat/config/report-directory.json`; Census files in `mentat/.cache/geo`; Higgsfield boards via the [[higgsfield-connector]]; Windows host resources (Defender, OneDrive worktrees, ~2.6-3.3 GB free RAM under load).
- Depended on by: the [[mentat]] project's reporting and review work (Paul reads Chart Studio, Graph, Insights, Cross-reference and PAC evidence here), the forecast views ([[forecast-redesign]]), and peer sessions ("Mentat load times and FEC filing links", "Melange UI redesign", "Mentat console redesign build packet", sector-growth peer running a frozen copy under `C:\melange-data\mentat_cycle_2020`).
- Not in the vault: Higgsfield result CDN `d8j0ntlcm91z4.cloudfront.net`, FEC site (docquery.fec.gov forms pages, WAF 403s curl), Census cartographic boundary files, PyPI, PptxGenJS 4.0.1 vendor bundle, Codex runtime (resets console Python).

## Flows

- `mentat-console` <- published workbooks / pinned report cache from [[mentat-fec-pipeline]] (the console only sees workbook columns, never raw FEC rows, except the pinned `mentat.db` for Source-ID FEC links and the contribution query store).
- `mentat-console` -> FEC filing pages (Source ID -> pinned `mentat.db` link; ActBlue/WinRed -> `docquery.fec.gov/cgi-bin/forms/<committee>/<file_num>/` "FEC report").
- `mentat-console` -> Chart Studio exports (PNG/SVG/CSV, Copy image, print sheet, PowerPoint via vendored PptxGenJS, Share bundle), saved views and briefing tray server stores, Pocket publish job (iPhone snapshot artifact).
- Graph -> Chart Studio hand-off ("Open in Chart Studio" carrying industry/company/cycle as undoable filter pills via `pendingScope`).
- Higgsfield boards ([[higgsfield-connector]]) -> binding visual spec for the redesign build prompts ([[2026-09-feature-ui-redesign-boards]]).

## Dev Commands

Recorded commands from the source notes (run only when asked; these are history, not instructions):

```bash
# read-only console for agents (temp .claude/launch.json entry; restore the tracked file afterwards)
python <abs path>\server.py --port 8812 --read-only
# Jinja2 shell: edit mentat/app/templates/*.html, then regenerate the GOLDEN mentat/app/index.html
python mentat/tools/render_console.py --write
python mentat/tools/render_console.py --check
# tests: python suites must run from INSIDE mentat/tests; node: use the glob form (Node 24 rejects the bare-directory form)
node --test mentat/app/tests/*.test.js
node --check <file>
# git hygiene recorded in the lanes
git rev-parse --short HEAD
git -c core.autocrlf=false archive HEAD ... | tar -x
git check-ignore -v <new file>
git apply --cached --check <patch>
git update-index --cacheinfo <mode>,<HEAD sha>,<path>
git hash-object <file>
# FEC-doc / Higgsfield downloads: PowerShell WebClient and Node fetch fail on the CloudFront CDN; this works
curl --http1.1 --ssl-no-revoke --retry 8 --retry-all-errors <url>
# pre-warm harness (never run against Paul's real state without his go)
python mentat/app/prewarm.py run
# Banking report build (publishes and advances the source-guard pointer)
build_industry_report.ps1 -Industry Banking
# six-commit apply kit (2026-09-26)
apply_plan.ps1 -Execute        # check mode passes vs repo; no hooks -> push mirror after
# env vars
MENTAT_COMPACT_RAW=1  MENTAT_FORMULA_FACTS=1  MENTAT_DETAIL_ROW_CAP  MENTAT_INDUSTRY  MENTAT_UI_OUTPUT  __PYVENV_LAUNCHER__
```

## Known Issues

- 2026-09-27: `/api/evidence-network` still 3-4 s for CULAC; `pac_evidence.receipt_role` perf is a frozen money file (Paul's); #44 tooltip partly met; Attributed estimate unbuilt (A1: Attributed Flow producer = new money logic).
- Console Python is RESET BY THE CODEX APP: after the 2026-09-25 reboot the codex-runtime python lost geopandas/jinja2/geopy (J1 "/" then served the golden `index.html`). GeoPandas was reinstalled into SYSTEM Python 3.12 (persistent); rule: the console never imports geopandas (offline tools only). Own venv `%LOCALAPPDATA%\Mentat\venv` (one process via `__PYVENV_LAUNCHER__`, lane V2, 2026-09-26) is the durable fix.
- Editing `analysis_data.py` (or `contribution_query_store.py`, whose LOADED_SHA is in every response key) makes EVERY running console refuse Insights ("Insights code changed. Restart Mentat...", `analysis_data.py:323`) until restart.
- "Console already current" banner stays with a live Restart button (UX); `POST /api/restart` branch fixed 2026-09-14.
- Stale `.pending` builds: six stale `.pending` files (~27 GB) open for Paul (A3, 2026-09-27); 12.84 GB of 09-21 builds sent to the Recycle Bin 2026-09-24; stale 1.44 GB `industry_data-4abdea58....json.pending-22944` in `.cache\industry-report\banking`.
- Alaska inset pre-existing 67% scale defect; deferred polish: density curve, hexbin log colour scale, PAC map fit beside the Layer control, smaller layer menu.
- Open (2026-09-27): A2 rebuild the workbooks (only Community Banks was rebuilt; other 7 untouched, backups `outputs\workbook-backups-20260926`) then restart 8806; A4 H3 double-counts 236.207 BTC; A5 NON-CONTRIBUTION labels counted; A6 METHODOLOGY v6; stripped browser suite leaves empty `%TEMP%\mentat-strip-reports-*`; `mentat/README.md:151` stale "index v5/parser v6" and METHODOLOGY header "Version 5" (lane L2 was to fix).
- See the per-lane sections in [[mentat-console-chart-studio-and-system-debug]], [[mentat-console-startup-and-polish-lanes]], [[mentat-console-redesign-boards]] and [[mentat-console-pac-map-viz-lane]] for lane-specific open items.

## Product definition and principles (PRODUCT.md, 2026-09-20; untracked)

Confirmed by Paul during the Impeccable initialization on 2026-09-20 as the product purpose and refinement scope of the console in `mentat/app`:
- **Users and purpose:** the user's local research workspace for collecting and comparing political giving, following downstream PAC activity and inspecting the supporting evidence; it should make giving and downstream spending understandable with source context and financial distinctions kept, and let the user move between scope selection, comparison, charts and evidence without losing context.
- **Operating context:** a local Python-served web interface (HTML, CSS, JavaScript) that reads saved collection data and report workbooks; its workflows and visual identity are preserved during refinement.
- **Constraints:** donor receipts, PAC transfers, observed candidate activity and modeled attribution keep separate meanings, and shared routes or company associations must not create additive spending claims; unknown or incomplete evidence stays visible and never becomes a reported zero; full names, exact values, sources and coverage limits stay reachable when labels are shortened; refinements are simple changes to the existing UI under YAGNI (no speculative features, validation layers or abstractions); the report-directory and evidence rules of `mentat/AGENTS.md` apply.
- **Principles:** make the scope and meaning of each number clear; prefer familiar, consistent controls and readable density; keep primary tasks visible and detail on demand; preserve evidence and financial behaviour during presentation changes.
- Saved coverage is limited and does not certify complete FEC filing coverage.

## Architecture and standing facts

- **Server and assets.** `mentat/app/server.py` serves a static allow-list that is Python frozen at process start (a new static file needs a `STATIC_ASSETS` line in `server.py` and a console restart, otherwise 404). CSP: `img-src 'self' blob:` (canvas heat OK); `frame-ancestors 'none'` on every response except the Chart Studio pane document (`'self'`, 2026-09-13 patch S2). `PROJECT` in `server.py` is `<checkout>/mentat` (`parents[1]`), NOT the checkout root. Build stamp: `#build-stamp` keeps "up since" (test contract); `/api/health` + `/api/session` carry a build block; `code_sha256` vs `on_disk_code_sha256_now` is D-029's restart gate (never the git sha).
- **Templates (Jinja2 runtime, J1 `991b06568` + `8db5cff94`).** Markup lives in `mentat/app/templates/` (flat folder, unique basenames because the build-stamp hash folds in basename only); `index.html` is a test-pinned GOLDEN render (14 tests read it from disk) regenerated with `render_console.py --write` and committed with the templates; `--check` fails on drift. Repo root `.gitignore` has `*.html`, `*.txt`, `*.json` (index.html force-added; fix `!mentat/app/templates/*.html`; packet `.md` files via `!*.md`).
- **Theme.** `acu-theme.css` tokens: paper #fcf7f4, ivory #f7ede4, plum #342649, purple #57447b, gold #eca91c, lilac #d6c8e2, teal #327a7a, line #e4d9d0; sans "Articulat CF", serif "Freight Text Pro" (not installed: pages render in Arial/Georgia, no 500 weight; D-050 bars web fonts); left navigation rail. Party colours D blue #2f5fa8 / R red #b8322e / gray (Pocket); categorical chart palette of 12 (see the console UI topic).
- **Views.** Chart Studio (fifth tab; classic `#graph-builder` dialog kept via "Classic builder"), Graph (single-instance, 83 fixed ids), Insights (ONE pool worker, `analysis_data.py:40`), Cross-reference, PAC evidence, Loading, Collection. Collection already has per-worker checkpoints (company, cycle, search, rows fetched), ETA and elapsed time. Back exits the console (D-039 ruling C): in-app Back only.
- **Caches and warm paths.** `response_cache.py`, `drawer_sidecars.py`, `view_cache.py`, `comparison_data.py`, `downstream.py`, `native_scan.py`, `analysis_*.py`, `prewarm.py`, `access_stats.py`, `contribution_query_store.py` (cap 1024 files / 512 MB). Details in the performance section and in [[2026-09-feature-mentat-console-ui]].
- **Geo.** Offline GeoPandas/Census tooling only (county 3,235 / place 32,612 / tract 85,184 / ZCTA 33,791 / place gazetteer 32,333 in `mentat/.cache/geo`); geo v2 staged in `mentat/.cache/geo_build/v2` (866 files); `app/geocode.py` implements the Census batch geocoder; Nominatim = 1 req/s, no bulk; GeoPy returns coordinates only.
- **Console is local-only** (no internet map tiles) by design; NOT D-050 (D-050 = the report-build network-fallback decision; corrected 2026-09-24).
- **Other-lane ownership (2026-09-24 peer split):** the Melange UI peer owned `graph.js`, `graph.css`, `graph_data.py`, `scope.js`, `comparison.js`, `chart-studio*.js/.css`, `contribution-*.js`, `chart-math.js`, `grouped-chart.js`, `charts.js`, polish/theme CSS, `page_shell`/`page_head`, `cross-reference.*`, `evidence.js/.css`, `evidence-map.js`, `graph-explorer.js`, `insights.js/.css`, `app.js`, `coverage-view.js`, templates, `index.html` (r5 = `20f3805e8`); the load-time lane owned the cache/prewarm/server files.

## Data-presentation fixes (2026-10-09; memory `data-presentation-fixes-2026-10-09`; added 2026-10-10)

Paul's brief: "Fix data-presentation bugs in two local repos", FIX 1-7. State at close (the Melange side, whose LIVE tree now sits on `claude/lda-series-fixes-20261009`, is in the Melange live-tree branch-state part):
- **Mentat:** PR https://github.com/pjg93-222/Melange/pull/4 MERGED into `codex/mentat-crypto` as `111c417e7` (`a11e8b186` fixes, `cb0d4fb48` the parallel session's LD-2 quarter rule, `9a13f5057` Conduit in R/builder plus leftovers). The Mentat checkout is back on `codex/mentat-crypto`. Consoles restarted by hand on this code: 8806 pid 32616, 8807 pid 38192 (base Python312, not venv, as before).
- **Rulings (Paul, 2026-10-09):** ActBlue C00401224 / WinRed C00694323 = "Conduit" category (the console relabels at read time; future workbooks get their own Conduit row/channel: "Add a Conduit row"). "Leave the books as they are": six served books built before 2026-09-08 (Telecom, Credit Arms, Credit Union, Crypto, Fintech, P&C) still say Super PAC in their Excel cells. "keep the dark slate colour" = #1f242b. LDA `through_quarter` counts a quarter only once its LD-2 deadline has passed by the producer's sweep date (`fullscope_receipts.json`).
- **Acceptance confirmed on screen:** Telecom 2025 $102.4M in-house / $37.0M outside-firm fees, "2025: 24 organizations · 532 named lobbyists"; Conduit/ACTBLUE $1,594,803.86, Super PAC $50,202.51, total $7,256,093.45; Comcast 2025-26 "77% of FEC-reported records"; downstream title + direct amounts (Hagerty $349,744 reached · $100 direct once FIX 6 traces transfers); transfer note "first 10,000 of 230,075 rows"; Telecom own ratio ×1.44.
- **Why the books stay:** the served Telecom book is the 2026-07-29 build made before `4f6a6f564` moved conduits to Carey; rebuilding would move totals under newer rules and stop the forecast (anchor_stale), so Paul kept the books.
- **How to apply:**
  - Editing `app/contribution_semantics.py` makes running consoles refuse queries ("Field definitions changed") until restart. Editing `contribution_data.py` changes the facts-store token and rebuilds every industry's store: avoid it.
  - Static JS/CSS ETags are latched until restart (browsers get 304s), so restart after asset edits.
  - Audited transfer paths feed the Graph only (`report_transfers(audited=True)`); Flow is unchanged by design.
  - `fec/deploy_lobby_pages.ps1` is restored; `-SkipLedger` now forces the ledger rebuild off.
  - `tools/verify_repaired_reports.py` now expects Conduit, so books built before this ruling fail it by design.
  - Republishing any book stops its forecast until the console index and the anchors are rebuilt.
- Related memories: `mentat-lda-deadline-rule-2026-10-09` (the LD-2 rule, in the Giving Forecast pipeline actor), `bug-report-regressions-six-fixed-2026-10-09`, `mentat-pdf-export-and-worksheet-cache-2026-10-08`, `dont-be-jumpy-removing-money-2026-09-26`, `live-tree-branch-state-2026-07-14`.

## History

| Date | Event |
|---|---|
| 2026-09-11 | Chart Studio v1 built and committed `090879ad8`; 52-finding review |
| 2026-09-12 | P1s fixed (`108e407db`), fine-grain worksheets (`b44fcef7a`), Banking rebuild failed 18:00 ET |
| 2026-09-13 | System-debug lane: four Chart Studio patches, A+D+C redesign committed `2906980d1`, `97eaa758`, `e666f95e5`; Mentat Pocket iPhone page delivered |
| 2026-09-14 | Usability lane F/E, fix1; commits `ed64743`, `215faa9`, `9b14e1d`, `5937875` |
| 2026-09-15 | Wording pass `f64316daa`; launcher gate `5c5aa6bfe`; ride-1 findings `a4b3c8e2e`; `1b8499147`; 8806 restarted (pid 16352) |
| 2026-09-17 | UI1 cleanup patch cut (HEAD a9ed5c236) |
| 2026-09-18 | Startup hang fixed `0ad366e01`; evidence-suite re-homes `aa8a3f884` |
| 2026-09-19 | Polish lane commits `53efc2c4a`..`862a6c46a`; 8806 restarted onto `8db5cff` |
| 2026-09-21/22 | Redesign boards, packet of 8 prompts, build 01 done, wave 2 parallel builders |
| 2026-09-24 | Load-time/FEC-link lane Phases 1-4 committed; Graph quirks lane |
| 2026-09-25 | PAC map downstream lane: GeoPandas + Census layers installed, audit, reboot 19:23 |
| 2026-09-26 | All build lanes done, six-commit kit `814667ee8`..`fadd2c751`, afternoon rulings H1-H3/S1-S2, commits C7-C9 |
| 2026-09-27 | Fidelity 54% -> 88%, money revert `7a31f8ae2`, load-time fix `6225e6756`, UI fixes `762eea6ce` + `533b4033e` |
| 2026-10-07 | Giving by cycle view: Board A layout built (no Calculate button, IBIS growth defaults); the cycle-aware 50/50 model published and applied (pointer switched 17:38:26Z); 8806 restarted with the console's own Restart button at 14:10 (pid 32372) and 15:19 (pid 58720, page fix and the `growth_basis` stale-page guard). Uncommitted (see [[2026-10-feature-forecast-giving-redesign-giving-by-cycle-live-model]]) |
| 2026-10-08 | Company PACs on the PAC panel's nowcast (D-116) and credit-union company PACs on the panel's 16 PACs (D-117); 8806 restarted at 11:46 (pid 65296) and 12:36 (pid 27944, the current listener). Uncommitted. Superseded (added 2026-10-10, memory `mentat-forecast-overnight-2026-10-07`): committed and pushed on `codex/mentat-crypto` later on 2026-10-08; as of 2026-10-09 ~15:05 the calculator is live on 8806 (restarted 2026-10-09 02:56, pid 63180). |

## Related Actors

- [[higgsfield-connector]] - Higgsfield MCP connector (89 tools) used to render UI boards; bound to whichever account authorized it; Paul must re-authorize to switch.
- [[mentat-fec-pipeline]] - Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat
- [[giving-forecast-pipeline]] - Giving Forecast R refit pipeline and its two JSON contracts; the console's `giving_forecast.py` is the calculator that consumes the published bundle and anchor snapshot.

## Related Topics

- Mentat collection and attribution - Mentat collection and attribution history, Jul-Sep 2026: audits, key outage, review bucket, xref rule, frozen money code.
- [[2026-09-feature-forecast-giving-redesign]] - Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD).
- [[2026-10-feature-forecast-giving-redesign-giving-by-cycle-live-model]] - The Giving by cycle view as it runs on 8806 after 2026-10-07/08: Board A, the cycle-aware 50/50, the panel nowcast for company PACs, the blind results.
- [[2026-09-feature-mentat-console-ui]] - Mentat console UI lanes 2026-09-11..25: Chart Studio, clean-up, polish, load-time/FEC links, Graph and pie quirks.
- [[2026-09-feature-mentat-failings-pac-evidence]] - Mentat failings lanes S2-S8 (street columns, PAC evidence, industry addressing, URL scope, panes, categories, map) + PAC map audit.
- [[2026-09-feature-ui-redesign-boards]] - Sept 2026 redesign: Higgsfield boards for Mentat and Melange, overlay-first builds, finalize/reconcile rounds, graph quirks.
- [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]] - Mentat tree reconciled (273 dirty -> 36 commits), GitHub branch pushed (PR merged 2026-10-03), tidy Data workbook, console hang fix.

## Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Discussions

- [[2026-09-17-mentat-xref-council-review]] - 2026-09-17 council: cross-reference does not minimise vs workbook (Banking $72.1M vs $54.8M); Paul ruled it redundant and kept it dwarfed.
