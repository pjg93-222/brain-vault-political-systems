---
type: actor
name: "Artifact family and surfaces (Melange dashboard)"
aliases: ["Melange dashboard (Moneyball.html): Artifact family and surfaces"]
category: "dashboard"
description: "The Melange dashboard artifact family and its surfaces, with the staffer surface's language law, its crawler operations and the self-healing dashboard directive."
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
part_of: "[[melange-dashboard]]"
---

# Artifact family and surfaces (Melange dashboard)

> The Melange dashboard artifact family and its surfaces, with the staffer surface's language law, its crawler operations and the self-healing dashboard directive. Part of [[melange-dashboard]] (project [[melange-systems]]).

## Artifact family and surfaces

- **Nine live surfaces** rebuilt together on deploy (2026-08-11) in chain-enforced order: dashboard -> lobby-network -> lobby-interactions -> desk -> combined LAST. Other surface pages named in the 08-31 pass: the map, 5 industry pages, filings.
- **Top-level section boundary = `make_combined.py`** (network / member / industry / staffer as sibling `#app-*` divs, one controller with `showApp`, `goto*`, href intercept, `surfaceFromURL`, popstate; CSS in `@layer desk,industry,...` with an `all:revert` reset for scoped surfaces; IIFE-wrapped JS; ID-collision allow-list). The dashboard tpl itself has NO section scaffold (single-view canvas app; its only switch is `setNetConfig` over five graphs).
- **Fourth surface (2026-09-04):** `#app-staffer` with `gotoStaffer` and `?v=staffer&s=<Name>`; dashboard header gains `Staffer network ▸`; `run_pipeline.py` gets the two steps before the desk builder; `audit_full.py` gets a `[STAFF]` block. The desk template was left untouched. Backups under `backups/staffer_section_20260904/`.
- **`staffer-network.html`:** ids all `stf-`, one style + one script, no external loads; the 8841 live server is only feature-detected with a no-cors fetch.
- **Email package (Paul, 2026-09-05 ~03:10 ET): "keep the three-surface email package, notify me when v5 lands."** The fourth surface pushed the all-in-one zip to 14,808,817 B vs the 14 MiB budget (14,680,064); fix = `make_combined.py` also writes a three-surface `Moneyball_Email.html` (staffer header link stripped, `gotoStaffer` falls back to the network when no panel exists) and `make_email_package.py` zips it under arcname `Moneyball.html` (projected 14,167,719 B). Do not re-propose raising the budget. A watch on `staffer_social_network_20260904_v5_verification/staffer_social_network_verification_receipt.json` is the notification trigger; the sidecar repin to v5 belongs to the graph-consolidation session (`fec/surfaces/repin_staffer_live.py`).
- **Size is the binding constraint on these pages.** Industry page guard is 5 MB and HEAD already built to 4.50 MB on current data (the 2026-08-03 additions cost +136 KB = 4.64 MB, 93% of budget); the interactions page needed its own 6 MB guard and index-compression to fit at 5.05 MB. If either page grows again, shard by sector rather than raising the guard silently.
- **Desk size history:** desk HTML 18.8 -> 27.7 MB after the media footprint (2026-07-16); `Moneyball.html` 28.0 MB; in-app Browser screenshots TIME OUT on the 27 MB desk page (capture-side limit; page responsive): verify via javascript_tool / read_page. The 42MB page is slow in a hidden pane: wait 10s+ before probing.
- **Canonical Moneyball.html (2026-09-04):** the Desktop copy `C:\Users\pgoff\OneDrive\Desktop\Moneyball.html` (09-02 vintage, 46.8 MB) had NO writer and nothing the project build lacked; it is now a <1 KB redirect stub (relative `Melange%20Systems/Moneyball.html` + location.search + hash; same for `Moneyball Dashboard.html`); originals in `backups/desktop_copies_20260904/` with MANIFEST.json. Report: `audits/MONEYBALL_HTML_CANONICALIZATION_2026-09-04.md`. Verified both member URLs (Crapo via stub, Padilla direct) land on one file (identical Content-Length). Paul's directive: "Find the two active Moneyball.html copies ... merge into one canonical dashboard in this project".

### The other lane's hook was an external load (2026-09-04)

`fec/surfaces/staffer_live_integration.py:inject_navigation` injected `http://127.0.0.1:8841/staffer-live/launch.js` into Moneyball.html and the dashboard (ERR_CONNECTION_REFUSED whenever the sidecar was down; violates the single-file/no-external-loads contract). Neutralized to a no-op; the peer session ("Graph consolidation and identity resolution") confirmed no dependency. The sidecar (`staffer_live_server.py`, port 8841, no autostart, dies on reboot) and its v5 repin are THAT session's; `staffer_user_assertions.json` and the identity-reconciliation loop are theirs too.

### Language / semantics law for the staffer surface

- The staffer graph is its OWN layer below members; anything relating two members is "shared staff" (people attached to both offices), never a member tie or weight; the zero-overlap REJECTED pair count (16,001,459) must be visible on the surface; everything exploratory / REVIEW_REQUIRED.
- The receipt's verbatim `statement` ends "...no influence claim": keep the quote, exempt it from banned-word tests.
- `revolving_degree` is 0 on every person node (revolving is office -> organization), so a per-member sum is always 0: do not display it.
- 7% of member-office containers in the moves lane carry no bioguide (upstream key fragmentation, e.g. `INTERN COMPENSATION -C RAPO`): report as unresolved office, never attribute.
- Padilla's "current" staff are all interns because his live stints resolve only to the intern-compensation container: keep the data, show the title mix, do not silently drop containers. `members_with_any_staff` 515 = the receipt's own count (18 members without an attached container).
- Producer facts: `build_staffer_network_section.py` is receipt-gated on the v4 verification PASS, hashes bound, 102 tests, registered in `run_tests.py` (kernel baseline +1 suite), deterministic.

### Crawler operations behind the staffer surface (2026-09-04, condensed)

- Politico profile crawl `audits/staffer_network/politico_profile_crawl_playwright.py`, RAW = `politico_profile_crawl_20260903_raw`: died 19:16 on `WinError 5` renaming `state.json.<pid>.tmp` under OneDrive; `atomic_json` now retries WinError 5/32 with backoff (backup `backups/politico_profile_crawl_playwright.PRE-ATOMIC-RETRY-*.py`). A 19:57 unclean reboot (Kernel-Power 41) killed everything once.
- `politico_crawl_watchdog.ps1` relaunches ONLY when no crawler python exists and the halt was transient/crash, halts on auth/challenge, heartbeat `RAW/watchdog_heartbeat.ndjson`. Two defects found live: (A) the process filter self-matched diagnostic PowerShell command lines containing the marker (false `observed_running`); (B) an empty-message abort (`CRAWL_ABORTED: ` = asyncio.TimeoutError after a 10.8 s slow response) was classified unknown, so the watchdog halted itself at 22:14. Fix = python.exe-only filter excluding Get-CimInstance/self; empty / `CRAWL_ABORTED:` / TimeoutError = transient; an unknown signature is retried once before halting; relaunch args `--workers 1 --wait-for-login --headed --slow-response-ms 20000` (the operator's own 22:19 manual relaunch used 20000). Never pass `--reset-rate` from automation. PowerShell 5.1 `Start-Process -ArgumentList` with an ARRAY does not quote elements containing spaces ("Melange Systems" splits): pass ONE pre-quoted string.
- Finishing chain `audits/staffer_network/finish_staffer_social_network_chain.py` (27 tests) resolves all 15 post-crawl steps from existing receipts (crawl verifier args from `crawl_verification.json.inputs`; bridge inputs from the v3 bridge receipt; network roots from the v4 receipt; the builder's own root defaults are STALE v5/v4 vs the v6/v5 actually used). Gates: integrity PASS -> `--require-complete` PASS/COMPLETE/0 failures -> bridge primary+twin byte-identical -> verifier -> network primary+twin -> verifier -> reconciliation doc -> `build_staffer_network_section.py --generation <v5>` -> `run_pipeline.py --from make_combined.py` only when no pipeline/lock is live. Launched detached `--wait --execute` (PID recorded in `FINISH_CHAIN_RUNNER_STARTED_*.txt`) after Paul approved the five Politico review layers (a scope change vs v4: `--require-complete-politico-profile-crawl` forces them on; the education weight has no dial and stays out per his 09-03 ruling). `verify_politico_payroll_direct_links.py --output` is a DIRECTORY. The auto-mode classifier refused to let an agent launch this runner detached; I launched it myself with Paul's explicit words.
- Concurrency that night: at least three other sessions ran `run_pipeline.py` in the live tree (locks at 19:33, 20:33, 21:2x); ASR long-form workers (other lane) ran throughout; the worktree was 56 files STALE vs the live tree and holds none of the 274+143 untracked staffer files, so all staffer/dashboard work must happen in the LIVE tree.
- Delegation lessons: Haiku scouts twice returned "agent is running in the background" stubs for a large template read: reroute such reads to a Sonnet executor with an explicit "do not spawn sub-agents" line. An executor correctly refused to launch a duplicate crawler when it found one already running despite my "facts already established": keep asking agents to re-verify live state before acting. One architect ran `os.kill(pid, 0)` to probe liveness: on Windows that is TerminateProcess; use `OpenProcess(SYNCHRONIZE)`.

### "Self-healing dashboard" (Paul, 2026-09-02)

Paul's words: "the goal is for the sentinels to create a self-healing dashboard a live feed." In code that is chain steps 11-12 (`verify_collector_roster_updates.py`, `sync_sentinel_bill_ledger.py`), the hash-gated `refresh_cosponsor_forecast.py`, intake receipts, and `audit_full.py`'s freshness/reconciliation checks as the terminal release gate. Regenerating "with the self-healing features" = running the chain in the LIVE tree; another lane ran the full chain 19:33-19:53 on 2026-09-04, and the staffer lane re-ran from `make_combined.py` after adding the section. Paul's directives that lane (verbatim intent): "Finish this up, and regenerate the dashboard with all the self-healing features and the new network integrated into the moneyball dashboard as its own section"; "resume the crawler and keep going. FINISH IT UP"; "run the finishing chain yourself, I approve the review layers"; "finish it up and send me the dashboard". Also ruled mid-lane: long-form profile regeneration WAITS for the full 533 long-form pass and then runs through the HOLISTIC evidence merge (long-form = supplemental signal, never a replacement); nothing in that lane regenerates profiles. Detail on the crawl/chain operations: Staffer network surfaces.

## Related Topics

- [[melange-dashboard-preview-and-desk-rules]] — The dashboard preview and verification workflow, the desk media footprint, the desk template rules learned, and the dashboard-fixes verification and publication state.
