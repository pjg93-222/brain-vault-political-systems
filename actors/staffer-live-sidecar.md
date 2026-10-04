---
type: actor
name: "Staffer live sidecar"
aliases: ["staffer_live", "people network :8841"]
category: "api"
description: "The live staffer-network graph surface: fec/surfaces/staffer_live (UI) plus staffer_live_server.py and sibling modules, a people-only staffer graph with automatic duplicate-person consolidation, current-coworker cost-1 routing and a continuous self-healing identity pass, served on 127.0.0.1:8841."
repository: "fec/surfaces/staffer_live + fec/surfaces/staffer_live_server.py (live tree of Melange Systems; routing lane worktrees under C:\\Users\\pgoff\\Melange-wt)"
stack: "Python sidecar server and modules (staffer_live_*, staffer_routing*, staffer_identity_*), vanilla JS UI, PowerShell launcher/watchdog, SQLite indexes"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "Dies on reboot / hard reboot; autostart is only the watchdog scheduled task MelangeStafferLiveSidecar (logon +2 min and every 30 min)"
  - "Default office route is memory-unsafe: pair_cache grew the sidecar from 7.0 to 17.5 GB and host available RAM fell to 0.22 GB (2026-10-02 measurement); latency fix lane in progress"
  - "Route snapshots labelled A* are Dijkstra: every route path runs with heuristic 0 (staffer_routing.py:381)"
  - "Typeahead slow: people p95 8.4 s, office search max 41 s"
  - "Sidecar grows to 7-8 GB within hours of start (2026-09-25/26 restart) and starved a Mentat export"
  - "Identity consolidation self-applies on restart when the payroll-identity pin changed (2026-09-06 trap)"
  - "Gordon/Stephanie/Greg user statement hard-coded at staffer_routing_evidence.py:157-162, not in staffer_user_assertions.json, no UI to retract it"
  - "start_staffer_live.ps1 uses unbounded Get-NetTCPConnection/Invoke-RestMethod (latent hang)"
  - "Identity loop throughput about 2 checks/min, 134k queued of 185,893 people (weeks to cover); 0 automatic merges from web references so far"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/people-network-route-latency-lane-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\people-network-route-latency-lane-2026-10-02.md", sha256: "6cb20aaf4eebf4790245bcff1d50eee4f926ee00fd5c47f0a0ed75981baa366a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-live-sidecar-2026-09-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-live-sidecar-2026-09-04.md", sha256: "9ebbe9baa896071b4b81a5d1fb0bbf36a3aadc3caeb4df9de7097d1e8128a0bb"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-network-redesign-2026-09-05.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-network-redesign-2026-09-05.md", sha256: "7761fc40db8d6180eb138a80e1ffad67c27227a93aefab397b5fe4893cd6aa44"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/backend"]
---

# Staffer live sidecar

> Local HTTP sidecar (`127.0.0.1:8841`) serving the live staffer-network graph surface: people-only nodes, automatic duplicate-person consolidation, A*-labelled (actually Dijkstra) contact routes with a current-coworker cost of 1, and a continuous self-healing identity pass. Built by Codex/remote (no Claude transcript); runs from the live tree, uncommitted at the time of the 2026-09-04 note.

## Details

| Field | Value |
|---|---|
| Repository | `fec/surfaces/staffer_live/` (UI) + `fec/surfaces/staffer_live_server.py` and sibling `staffer_*` modules in the live tree; routing-latency worktrees under `C:\Users\pgoff\Melange-wt` |
| Stack | Python sidecar + modules, vanilla JS UI (`index.html`, `staffer-live.js`, `staffer-route.js`), PowerShell launcher and watchdog, SQLite (identity queue, LDA activity index) |
| Status | active |
| Criticality | medium |
| PCI | no |
| Team | none |
| Listener | `127.0.0.1:8841`, no autostart except the watchdog task; server PID recorded in `audits/staffer_live_runtime/server.json` |

## Dependencies

- **Consumes:** the sealed staffer data of the staffer-network lane (v4_primary static model pinned; payroll-identity evidence bundle; LDA activity index `lda_activity_v1.sqlite`, 654 MB sealed; Politico crawl outputs); modeled in [[2026-09-feature-staffer-network-data-and-math]] and the overlap edge semantics in [[concurrent-service-overlap-edge-rule]] (architecture record: [[2026-09-03-staffer-network-architecture]]).
- **Consumed by:** the dashboard as a feature-detected 8841 probe only: the staffer network page inside [[melange-dashboard]] (`#app-staffer`) fetches `http://127.0.0.1:8841/api/staffer-live?limit=1` with a no-cors fetch and works without it (single-file / no-external-loads contract). Part of the [[melange-systems]] project; surface history in [[2026-09-feature-staffer-network-surfaces]].
- **External:** Bing RSS (identity web-reference discovery returns 200 with the bot UA; downstream hosts such as imdb return 403 and are tolerated), Politico profile crawl, Windows Task Scheduler (`MelangeStafferLiveSidecar`), OneDrive-backed live tree.
- **Builders:** Codex/remote built it (handoff doc `audits/staffer_network/STAFFER_SOCIAL_NETWORK_USAGE_HANDOFF_20260904.md`). Ownership split agreed 2026-09-05: the sidecar repin, `staffer_user_assertions.json`, the identity loop and `staffer_routing.py` belong to the Claude session "Graph consolidation and identity resolution"; the finishing chain, crawl watchdog and dashboard `#app-staffer` section belong to the session "Melange long-form audio integration".

## Flows

- **Routing.** Route params are `origin` / `target` (NOT from/to) plus `include_*` flags; raw `lda:lobbyist:N` ids canonicalize to the hill node. The snapshot labels routes "A*" but every route path runs with heuristic 0 (`staffer_routing.py:381`), i.e. Dijkstra. The default UI route (settings `work_time`, `route_count=3`, `distinct`) reaches `ClosenessRoutes.search` (`staffer_closeness_routes.py:110-138`), a one-direction search from the requester to a virtual sink; the bidirectional/backward-frontier design exists in `route_many` (Ecosystem path, `:528-530`) and `OverlapRoutes` only. Details and the 2026-10-02/03 latency lane are in "Route latency lane" below.
- **Identity consolidation.** Production reads a hand-written pin `fec/surfaces/staffer_payroll_identity.json` (238 B) naming a payroll-evidence `.gz`; `staffer_payroll_identity.load_payroll_identity()` hash-verifies it and RAISES on missing/mismatch; `staffer_live_service.py` loads it ONCE per process (`_payroll_identity_loaded`); only a restart applies a new pin (see the TRAP below).
- **Self-healing identity loop.** Continuous pass via web references (queue `identity_reference_v1.sqlite`): Bing RSS discovery; measured throughput ~2 checks/min, 134k queued of 185,893 people (weeks to cover); web references have produced 0 automatic merges so far (automatic groups come from verified records). Design observation for Paul, not a bug. 2026-10-03 ruling: the identity loop keeps running at its current pace.
- **Startup.** Launch-to-Ready is normally ~5 min (measured 2026-09-06 20:21:43Z -> 20:26Z, identity receipt written at 20:23:54Z); `stage='Indexing date-overlap routes'` is progress, not a hang. The one 56-min startup on 2026-09-06 was cold-cache and is NOT the baseline.
- **User assertions.** Confirming an identity in the UI writes POST-MERGE canonical ids permanently into `fec/surfaces/staffer_user_assertions.json` (1.5 KB). User-asserted "currently work together" statements stand from their date until a later dated statement supersedes them (fix landed 2026-09-05); observations still support only their observed day.

## Dev Commands

```bash
# Start (from the live-tree root; refuses to replace another listener, hidden, writes server.json)
& '.\fec\surfaces\start_staffer_live.ps1'

# Health
GET http://127.0.0.1:8841/api/staffer-live?limit=5
# fields: ready, stage, verification_status, identity_resolution, crawl, coverage, sources

# Restart = Paul's call: stop the PID in audits/staffer_live_runtime/server.json, then run the launcher
#   (the auto-mode classifier blocks any Stop-Process/taskkill from the agent or its subagents;
#    in bypass mode on 2026-09-26 Stop-Process was NOT blocked)

# What is a viewer/listener really running (verification pattern)
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'open_glassbox_process_matrix' }

# v5 repin runner (dry run default; Paul launches it, the classifier blocks the agent)
python fec/surfaces/repin_staffer_live.py            # dry run
python fec/surfaces/repin_staffer_live.py --wait --execute

# Autostart watchdog (scheduled task MelangeStafferLiveSidecar runs this)
fec/surfaces/staffer_live_watchdog.ps1

# Live-route memory guard for the latency panel (rule from the 2026-10-02 lane)
# abort if available RAM falls below 400 MB or the sidecar grows by more than 1.5 GB
python fec/tools/live_patch.py    # cuts ONE patch; APPLY and the 8841 restart are Paul's
```

## Known Issues

- Dies on reboot / hard reboot (2026-09-04 19:57 hard reboot, Kernel-Power 41, killed the sidecar silently; restarted 21:17). Autostart exists only via the watchdog task (below).
- Default office route memory blow-up: `pair_cache` keeps a full evidence dict for every checked pair (about 1 KB per check); one default office route grew the sidecar from 7.0 to 17.5 GB and dropped host available RAM to 0.22 GB. Never fire a default office route at the live sidecar without a memory guard (that was the agent's own measurement request on 2026-10-02).
- If no staffer has an office anchor, the search scans the whole component before giving up.
- Typeahead slow: people p95 8.4 s; office search max 41 s. Page load is not the problem (11 requests, 110-300 ms).
- Sidecar PID 23992 grew to 7-8 GB within ~5 h of its 2026-09-25 19:25 watchdog start and starved the Mentat 2020 export (restarted 2026-09-26 00:40).
- Statement hard-coded at `staffer_routing_evidence.py:157-162` (Gordon/Stephanie/Greg "currently work together", 2026-09-04), not in `staffer_user_assertions.json`, and there is no UI to retract it (OPEN).
- `start_staffer_live.ps1`: `Get-NetTCPConnection` / `Invoke-RestMethod` are unbounded (latent); on 2026-09-26 the launcher's shell hung for more than 3 min after the start (harmless).
- Task Scheduler Operational log is DISABLED on the host.
- Untracked People page `fec/surfaces/staffer_live/approved/` (the redesign People page) may belong to another lane; not edited without Paul.
- Glassbox emit defect in `audits/staffer_network/build_staffer_social_network.py` fixed (was calling `emit.ps1` with `-Event`/`-Payload`, which do not exist; now `-Kind`/`-Summary`/`-MetadataJson`; sha256 `cb6319c7...`); do not touch that file again until `v5_verification` exists (twin byte-identity).

## Architecture

The "graph consolidation / identity" feature Paul described on 2026-09-04: people-only nodes, automatic duplicate-person consolidation (including Kathleen Coulombe, LDA 154321 + 68016), A* contact routing with a current-coworker cost of 1, zoom/focus-only name labels, Politico-validated name auto-ingest, and a continuous self-healing identity pass via web references. It lives in the LIVE tree, uncommitted at the 2026-09-04 note.

- UI: `fec/surfaces/staffer_live/` (`index.html`, `staffer-live.js`, `staffer-route.js`, `README.md` = the spec).
- Sidecar modules: `fec/surfaces/staffer_live_server.py`, `staffer_live_service.py`, `staffer_identity_web.py`, `staffer_identity_auto.py`, `staffer_identity_resolution.py`, `staffer_routing.py`, `staffer_routing_evidence.py`, `staffer_graph_snapshot.py`, `staffer_activity_index.py`, `install_staffer_live.py`; plus `staffer_closeness_routes.py`, `staffer_payroll_identity.py`, `repin_staffer_live.py`, `start_staffer_live.ps1`, `staffer_live_watchdog.ps1`.
- Runtime state: `audits/staffer_live_runtime/` (`server.json` PID, stdout/stderr logs, `identity_reference_v1.sqlite` queue, `identity_resolution_receipt.json`, `lda_activity_v1.sqlite` 654 MB sealed index, `watchdog.log`, `backups/`).
- No Claude transcript mentions it at the 2026-09-04 note (Coulombe/self-healing/coworker searches hit only the agent's own session); built by Codex.
- Static model pinned to `v4_primary`; Politico crawl was ~47% (8,784/18,618) on 2026-09-05 01:30Z (later 17,683/18,618 at 2026-09-05 06:14Z, 95%).

## Autostart and ops history

- **Autostart LIVE 2026-09-05 (Paul-ordered):** scheduled task `MelangeStafferLiveSidecar` (user pgoff, logon +2 min AND every 30 min, Priority 4, ExecutionTimeLimit 10 min, IgnoreNew) runs `fec/surfaces/staffer_live_watchdog.ps1`, which logs to `audits/staffer_live_runtime/watchdog.log`, probes 8841 with a proxy-free HttpWebRequest, calls `start_staffer_live.ps1` only when nothing listens, exits 2 on a foreign port owner, 3 on an unresponsive sidecar, 9 on its own 120 s self-watchdog, and NEVER stops anything. LESSON: the default task Priority 7 (BelowNormal) on this ~90%-CPU box starved `powershell.exe` engine startup for 10+ min (no script line ran); Priority 4 fixed it.
- **Fix landed 2026-09-05 (uncommitted, backups in `audits/staffer_live_runtime/backups/fec/surfaces/*.20260905T020225Z.bak`):** user-asserted "currently work together" statements were encoded as a one-day window and compared to a UTC today, so the 2026-09-04 Gordon/Stephanie/Greg statement lapsed within hours and the cost-1 `current_coworker` hop never fired (cost 2 lobbying edge won; checkbox was a no-op). `staffer_routing.py` now lets a user statement stand from its date until a later dated statement supersedes it; observations still support only their observed day. Full 8-file suite 81 passed; negative control: old code fails the new tests. Needed a sidecar restart to go live.
- **v5 repin runner built:** `fec/surfaces/repin_staffer_live.py` (+14 tests). Dry run default; `--wait --execute` polls for `staffer_social_network_20260904_v5_verification` PASS, rewrites the two constants (backup), runs the suite, restarts only the confirmed sidecar PID, verifies live, writes `repin_<stamp>.json`; rolls back on any gate failure. Paul launches it (classifier blocks the agent).
- **TRAP, 2026-09-06: the identity consolidation SELF-APPLIES on sidecar restart.** A pin written 02:30 sat inert until the long-lived sidecar died ~14:30 and the watchdog relaunched it; the consolidation then applied itself unattended (185,893 -> 179,999 people, aliases 4,504 -> 5,895) and wrote the 39 MB `identity_resolution_receipt.json` at 14:57. Nobody approved it. A missing bundle bricks startup into `stage='Verified model unavailable'`; `_rebuild_identity` copies the flag forward so NO in-process rebuild re-reads the pin. When a pin changes, the live question is always "ratify or revert", never "apply or not".
- **Ratified 2026-09-06 (Paul's call).** Bundle moved out of the dated audit dir to the stable `audits/staffer_network/payroll_identity_current/payroll_identity_evidence.json.gz` (sha256 `64b0050f...44080`) and the pin atomically repointed; old bundle + dated dir retained untouched. Record-pair title threshold tightened `>= 6` -> `>= 8` in the producer (matches `staffer_identity_auto.py:148`): record_pairs 254 -> 231, EXACT_PAYROLL_ACCOUNT_CORRECTION held at 72, VERIFIED_PAYROLL_ACCOUNT_SERVICE_MATCH 182 -> 159, the 23 removals ALL bare-'counsel' (7 chars). Episodes (425,826) and source bindings byte-identical. WENT LIVE 2026-09-06 20:21 on a Paul-ordered restart (PID 38444 -> 74496): receipt provenance now names `payroll_identity_current` with sha `64b0050f...44080` (MATCH = proof the live service consumed the new pin), deltas exactly -23 as predicted: automatic_resolved_groups 5,861 -> 5,838, new_aliases 5,894 -> 5,871, unresolved_candidate_pairs 68,554 -> 68,577, evidenced_pairs 95 -> 72 (= the 72 corrections), searchable_person_nodes 179,999 -> **180,022**. Fewer merges must move the person count UP; a DOWNWARD move would mean the threshold reasoning was wrong. Backup + rollback pin: `backups/staffer_identity_ratify_20260906/` (21 files). NOTE: `Get-FileHash`/`Copy-Item` CANNOT open `identity_reference_v1.sqlite` while the sidecar holds it; Python `open()` can, use it for backups.
- **ONE-WAY DOOR:** confirming an identity in the sidecar UI writes POST-MERGE canonical ids permanently into `fec/surfaces/staffer_user_assertions.json` (1.5 KB); those survive any pin revert, and `_apply_inventory` HARD-FAILS at startup if a recorded primary later fails to resolve. Back that file up before any UI session on an unratified graph.
- **Stale imports fixed 2026-09-06:** all 42 bare sibling imports across 15 `fec/surfaces/staffer_*` files converted to relative-with-fallback; kernel 180/2 -> 181/1 (only the standing `test_primacy_tier` remains). The fallback MUST insert the repo root into `sys.path` before `from fec.surfaces...`: `start_staffer_live.ps1` launches the server by absolute path, so `sys.path[0]` is `fec/surfaces` and there are no `__init__.py` under `fec/`; a bare qualified fallback raises ModuleNotFoundError and kills the sidecar on the watchdog's next relaunch. Do NOT fix this by copying the `staffer-network-stale-imports-2e9e82` worktree's files: its copies predate the 2026-09-06 02:27-02:30 production rewrite and would clobber it.
- **Restart 2026-09-26 00:40, Paul-ordered ("restart the sidecar"), done by the agent:** Stop-Process on the server.json PID 23992 (grown to 7-8 GB within ~5 h of its 19:25 watchdog start; starved the Mentat 2020 export), then `& '.\fec\surfaces\start_staffer_live.ps1'` from the live-tree root. New PID 15996, Ready at 00:46 (6 min). The payroll pin was unchanged since 2026-09-08, so there was no self-apply. Stop-Process was NOT blocked in bypass mode. The launcher's shell hung for more than 3 min after the start (the latent unbounded Get-NetTCPConnection/Invoke-RestMethod), harmless.
- **External-load hook neutralized (2026-09-04):** `fec/surfaces/staffer_live_integration.py:inject_navigation` injected `http://127.0.0.1:8841/staffer-live/launch.js` into `Moneyball.html` and the dashboard (ERR_CONNECTION_REFUSED whenever the sidecar was down; violates the single-file / no-external-loads contract). It is now a no-op; the peer session confirmed no dependency. Hence the dashboard staffer page only probes 8841 (pin: the string `fetch('http://127.0.0.1:8841/api/staffer-live?limit=1'` must be present and `launch.js` absent).
- Dashboard-facing notes: the page `staffer-network.html` (variant C redesign, built and pin-tested 2026-09-05, apply is Paul's) and `#app-staffer` in `Moneyball.html` are documented in [[2026-09-feature-staffer-network-surfaces]]; person-to-person paths need a compact people index in the section payload because the name policy forbids person names there (a design-audit leftover).

## Route latency lane (2026-10-02/03; source `people-network-route-latency-lane-2026-10-02`, last modified 2026-10-03)

Paul opened the lane on 2026-10-02: the people network was "almost not useable"; he proposed Bidirectional A* for office searches, with everyone currently in the office searching back toward the requester.

**Diagnosis**

- The heuristic premise was false: every route path runs with heuristic 0 (`staffer_routing.py:381`); the snapshot's "A*" label is Dijkstra.
- Paul's backward-frontier design already exists but not on the default path: in `route_many` (the Ecosystem path, `:528-530`) and in `OverlapRoutes`.
- The default UI route (`work_time`, `route_count=3`, `distinct`) reaches `ClosenessRoutes.search` (`staffer_closeness_routes.py:110-138`), which runs ONE direction from the requester to a virtual sink. Office staff are only arcs into the sink, each with a positive terminal cost. If no staffer has an office anchor, the search scans the whole component before giving up.
- Memory blow-up: `pair_cache` keeps a full evidence dict for every checked pair, about 1 KB per check; one default office route grew the sidecar from 7.0 to 17.5 GB and dropped host available RAM to 0.22 GB.
- Page load is not the problem (11 requests, 110-300 ms). Typeahead is slow: people p95 8.4 s; office search max 41 s.
- Packet: session scratchpad `staffer_route_latency_packet.md` (session 4f30368b): eval spec, optimized build prompt, brain update drafts.

**Paul's rulings, 2026-10-02**

- Scope: core exact fix, plus responsiveness (cancel abandoned searches, show route 1 early), plus typeahead and lock contention.
- Real-data check: a live panel after he restarts 8841.
- ALT landmarks: deferred until the bidirectional search is measured.
- Ties: cost and steps must match exactly; equal-score paths may swap, and each swap is listed.

**Paul's rulings, 2026-10-03** ("b on ties, fix the uuid match, keep identity loop")

- Ties: routes whose exact costs are within 1e-12 relative of the minimum are ties; fewer steps wins, then lower exact cost. Reported cost is still the forward-order float sum.
- Typeahead never matches fragments of machine identifiers (`politico:<uuid>`, uuids, source ids, hashes). An exact full id still finds its node.
- Identity loop keeps running at its current pace.
- Builder branches (both from integration tip `970e8c6d7`): `claude/staffer-route-ties-20261003` in worktree route-core, and `claude/staffer-search-uuid-20261003` in worktree route-search.
- Brain drafts: D-082 (ties), D-083 (identifier fragments), D-084 (identity loop) are drafted in the packet. D-025 freezes coefficients and evidence boundaries.

**Build layout**

- WP-A, core search: branch `claude/staffer-route-core-20261002`, worktree `C:\Users\pgoff\Melange-wt\route-core`. Sparse checkout of `fec/` from main `3248a6a02`, placed outside OneDrive so `git worktree add` stays fast.
- WP-B, cancellation and progressive results: branch `claude/staffer-route-jobs-20261002`, worktree `C:\Users\pgoff\Melange-wt\route-jobs`.
- Shared file: both create the identical `fec/surfaces/staffer_route_cancel.py`.
- WP-C, typeahead diagnosis: read-only; its fix comes after WP-B, because both touch `staffer_live_service.py`.
- Next: merge WP-A and WP-B, add the WP-C fix, run an Opus verifier; cut ONE patch with `fec/tools/live_patch.py`; APPLY and the 8841 restart are Paul's; then run the live panel with a memory guard (abort if available RAM falls below 400 MB or the sidecar grows by more than 1.5 GB).
- Why: Paul wants the people network usable, with the same routes. Related rules: ask-before-substantive-changes, the model tiering rules (Opus reasons; code in Sonnet 5.5 from 2026-10-01), go-faster directive.

## Related Actors

- [[melange-dashboard]] - Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network).

## Related Topics

- [[2026-09-feature-staffer-network-data-and-math]] - Staffer network lane 2026-09-01..08: adjudication, architecture, math audit, sorting rulings, clique fix, v7 spine and v6 ship.
- [[2026-09-feature-staffer-network-surfaces]] - Staffer network surfaces: live sidecar on 8841, fourth Moneyball.html surface (#app-staffer), page redesign variant C, route-latency lane.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[concurrent-service-overlap-edge-rule]] - Staffer social-network edge rule: a person-person edge needs real concurrent service in one container; sequence is trajectory, not an edge.
- [[live-tree-patch-discipline]] — The Melange live tree changes only through one line-wise patch cut with fec/tools/live_patch.py and applied with core.autocrlf=false; never check out or merge into LIVE, and APPLY is Paul's.

## Discussions

- [[2026-09-03-staffer-network-architecture]] - Paul's 2026-09-03 ant-colony ruling: staffer network = own social network beneath members; member graph kept; OVERLAP is the only edge rule.
