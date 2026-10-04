---
type: actor
name: "Startup hang fix and the polish, load-time and graph-quirks lanes (09-18 to 09-25) (Mentat console)"
aliases: ["Mentat console: Startup hang fix and the polish, load-time and graph-quirks lanes (09-18 to 09-25)"]
category: "dashboard"
description: "The Mentat console startup hang fix of 2026-09-18 and reference summaries of the polish, load-time and graph-quirks lanes of 09-19 to 09-25."
repository: ""
stack: ""
status: "active"
team: ""
criticality: ""
pci: false
known_issues: []
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/frontend"]
part_of: "[[mentat-console]]"
---

# Startup hang fix and the polish, load-time and graph-quirks lanes (09-18 to 09-25) (Mentat console)

> The Mentat console startup hang fix of 2026-09-18 and reference summaries of the polish, load-time and graph-quirks lanes of 09-19 to 09-25. Part of [[mentat-console]] (project [[mentat]]).

## Startup hang fix (2026-09-18, session fba7b847; COMMITTED `0ad366e01` + `aa8a3f884`)

The console hung at startup because `/api/session?light=1` never answered: `build_status()` -> `git_sha_cached()` (`@lru_cache`) -> `git_sha()` ran `subprocess.run(['git','rev-parse','--short','HEAD'], capture_output=True, timeout=10)` on the HTTP request thread, in a linked worktree whose gitdir is under OneDrive. Related notes: `mentat-collector-slowdown-lane-2026-09-17` (its DIAGNOSIS.md holds the original thread dump), `committed-vs-live-drift-2026-09-13`, `mentat-failings-lane-s6-2026-09-17`.

**Two independent defects, both measured 2026-09-18 with a negative control:**
- `subprocess.run(capture_output=True, timeout=N)` is NOT a bounded call. On timeout it re-enters `communicate()` to drain and blocks forever joining pipe-reader threads of a child that will not die. Measured **10.11 s for a 1 s timeout** vs 1.03 s for `Popen` + stdout to a real file. Unbounded against a `git.exe` wedged on OneDrive placeholder I/O.
- `@lru_cache` does NOT serialise concurrent callers: **8 lookups for 8 callers**, so one page load spawned two git children. It is never a single-flight guard.

**Fix (3 parts, `mentat/app/server.py`, COMMITTED `0ad366e01`):** pure-Python `git_sha_from_gitdir()` (walks ancestors for `.git`, follows the `gitdir:` pointer, HEAD/commondir/loose-ref/packed-refs, 0.0000 s vs 0.42 s for git); `git_sha()` kept as fallback but `Popen` + `tempfile.TemporaryFile` + `wait(timeout)` + `kill()`, never `communicate()`; `git_sha_cached()` = non-blocking single-flight daemon-thread resolver returning `'unknown'` until resolved. Request path measured **0.016 s with the lookup blocked 30 s**. Tests `mentat/tests/test_console_build_stamp.py` 16/16, `test_collection_console.py` 37/37, `test_contribution_http.py` 22/22.

- **`PROJECT` in `server.py` is `<checkout>/mentat`, NOT the checkout root** (`parents[1]`). `PROJECT/'.git'` does not exist; the old subprocess only worked because git searches upward from cwd. Any direct reader of git metadata must walk ancestors or it is dead code. The first spec got this wrong and the architect caught it.
- Serving `'unknown'` is safe: `app.js:436` already falls back to `code_sha256`, and D-029's restart gate compares `on_disk_code_sha256_now` vs `code_sha256`, never the git sha.
- **S6 broke three browser suites, far past "stale values" - FIXED and COMMITTED `aa8a3f884`.** `487589584` **created** `mentat/app/evidence.js` and moved the evidence pane out of `app.js`; **14 element ids** the console smoke test drove no longer exist in `index.html`. So the failures were propositions about code that had left the file, not stale strings. Rule applied: **per-assertion census, never aggregate** - each deleted assertion is (a) asserted elsewhere, (b) behaviour S6 removed, or (c) still shipped and asserted nowhere -> **re-home it, never drop it**. 12 landed in (c), including the XSS one (`<img src=x onerror=alert(1)>`): `render()` writes the drawer via `innerHTML`, so `escapeHtml` is the only guard. Re-homes go into `test_evidence_panes_browser.cjs` as **additions only** (+126/-0) so its 28 existing steps stay byte-identical; every re-homed figure was measured against a live console, not ported on faith.
- `test_app_lazy_startup_browser.cjs` test 1 was narrowed, not retargeted: its claims were **false**, not stale - `start()` is bound to `mentat:view` with no view check and `app.js` dispatches on every view change, so the first navigation to ANY view fetches catalog + evidence together, and a source change requests `/api/evidence?id=<id>`, not the `/api/evidence` the test counted. Also fixed a real race: the 3 s `setInterval(poll)` at `app.js:406` refetches the mocked `/api/run?*` and can land after `render(stoppedRun)`, putting `'ready'` back.
- **`git update-index --force-remove` is the WRONG index rollback** - it marks the path deleted vs HEAD. Correct: capture HEAD's blob+mode first, roll back with `git update-index --cacheinfo <mode>,<HEAD sha>,<path>`. Also: `... | Select-Object -First 1` on a native command poisons `$LASTEXITCODE` (terminates the pipeline), which aborted a staging script mid-flight. See Mentat repo state and workbooks.

## Polish lane (2026-09-19), load-time lane (2026-09-24) and Graph quirks lane (2026-09-24/25), reference summary

Full lane records are in Mentat console UI; the console-relevant facts follow.

- **Polish lane (HEAD `2b1a62dea` start, packet `audits/mentat_ui_polish_20260919/`, review page https://claude.ai/artifact/FmMzhcCWNjXbWcrGevLYMH):** commits `53efc2c4a` (measured rows), `f6822818c` (true-width panels; root cause: `render()` painted while `#graph-results` was hidden so every panel drew at the 520 fallback, CSS then scaled the wide column 1.46x), `9e0ead6f0` (sort and labels never silently inert), `991b06568` J1 Jinja2 runtime + `8db5cff94` repair, `862a6c46a` P4a geography tools (105 files 14.4 MB, untracked on purpose). Root causes: `graph.js:294` 6.6 px/char budget vs ~8.5 for caps; sparkline at `graph.js:305` vs reserved column `:278`; `.panel-heading label{width:300px}` in `style.css:4`; PAC map opens on Spent (`evidence.js:902`); sort `none` aliased to `desc` at `chart-studio-contributions.js:126`; six truncators, only `contribution-plot.js:58-62` measures pixels. Rulings: rows A, downstream A (drawer), in-app Back only (D-039 ruling C), industry compare B (BOARD 8 two aligned columns), PAC map enlarge + layer control (region, state, congressional district, state legislative district, ZIP), Jinja2 runtime rendering, expressive motion, fully interactive map; binding ruling: "The UI should appear exactly as how it was depicted on the Higgsfield images, those were amazing, the amounts can vary obviously." (boards 1, 3, 5, 6, 7). Installed into launcher Python: jinja2 3.1.6, geopy 2.5.0; Census files in `mentat/.cache/geo`: ZCTA gazetteer, sldu, sldl. 8806 was restarted onto `8db5cff` via its own Restart button. Trap: `*.html` in the root `.gitignore` silently skipped nine partials in `991b06568`; Paul cannot see the Higgsfield gallery widget in the desktop Code tab.
- **Load-time lane (worktree `vibrant-khayyam-65f943`, build 862a6c4):** cold paths measured (Insights 18-34 s first open per day, Graph first-use query views 13-48 s, ~5 s restart re-hash of ~5.7 GB). Commits `5621958` perf+prewarm, `1b6fa0a` FEC links, `6954993` graph catalog (C3), `139601ada` warm only from the user's own data root, `4df809e80` drawer sidecars (Banking drawer 21-65 s -> ~5 s), `51f15e5cc` `response_cache.py` + ETag/304, `105a312e3` journal batching (Banking build 23.5 -> 11.9 s), `a8cd330d5` `access_stats.py` value ledger (query-store cap 1024 files / 512 MB), `e2b6f0deb` hot set top 20 / 60 s budget + `/api/prime-status` + launcher "Priming n/N" wait up to 120 s, `c03fd4fe7` deterministic drawer, `5f4eb3d92` revalidating fetch + parsed-view LRU + idle prefetch of 4 likely views. New modules: `source_memo.py`, `prewarm.py`, `glassbox_emit.py`, `fec_citation.py`, `drawer_sidecars.py`, `view_cache.py`, `access_stats.py`. FEC links: Source ID -> pinned `mentat.db` (CB 3,978/3,978, Crypto 6,343/6,343, CU 27,632 linked) and ActBlue/WinRed -> docquery forms "FEC report"; fault A = workbook builder drops `pdf_url`; fault B = ActBlue/WinRed fecimg pages "Error#1896: Image is not processed yet". Measurement traps: hidden browser pane throttles timers; PS 5.1 `Invoke-WebRequest` sends no gzip; curl 403 from FEC WAF. 8806 restarts 2026-09-24: PID 29452 at 14:20 (via `/api/restart`), PID 62016 at 14:28 (launcher), PID 66956 at ~16:00.
- **Graph quirks lane (session 6cce0269):** Melange Influence build 10 LIVE (3 sources `fec/surfaces/approved/clean/{ui-kit.css,network.css,network.js}` + 3 served copies in `fec/surfaces/staffer_live/approved/`; D-060 `live_patch.py`; backup `SP\melange_stage\live\backup_20260925T035014Z`); Mentat pie fit/title/12-colour palette (`MentatTheme.categorical` #327a7a #57447b #8b6984 #eca91c #de8aab #7d4b00 #3cb0a3 #83333e #99973f #a09eea #d88766 #509ecd; 9 modified files + `tests/chart-pie-fit.test.js`; backup + `ROLLBACK.py` in `SP\mentat_stage\backup_20260925T045940Z`; unit 449/449, browser 32/32); uncommitted at the time. Brain drafts D-064, D-065, DE-047, DE-048.
- **Fields and Banking facts:** see the Chart Studio section in [[mentat-console-chart-studio-and-system-debug]] and the topic note; Banking rebuild failure of 2026-09-12 (2,070 rows / $20,683,413.29 refused by `fec_assert_receipt_evidence` against `inputs\fec_receipt_rules.json`) is a pipeline matter for [[mentat-fec-pipeline]].

## Related Topics

- [[2026-09-feature-mentat-console-ui-load-time-and-graph-quirks]] — The Mentat console load-time and FEC-link lane and the Graph UI quirks and colouring lane, both of 2026-09-24.
- [[2026-09-feature-ui-redesign-boards-finalize-reconcile-graph-quirks]] — The UI finalize after the reboot (2026-09-23 to 09-25), the UI review reconcile of 09-25 and the Graph UI quirks and colouring lane.
