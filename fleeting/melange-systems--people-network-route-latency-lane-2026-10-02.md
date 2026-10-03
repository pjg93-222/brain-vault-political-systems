---
type: fleeting
title: "People network route latency lane (2026-10-02)"
aliases: ["people-network-route-latency-lane-2026-10-02"]
source: "session"
captured_at: 2026-10-03
created_at: 2026-10-03
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[staffer-live-sidecar]]"
  - "[[2026-09-feature-staffer-network-surfaces]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/people-network-route-latency-lane-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\people-network-route-latency-lane-2026-10-02.md", sha256: "be89a737b07fc2f7ddd9c037e14c70eab87965484bcb19c913bec54bc358fd14"}
updated_at: 2026-10-03
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# People network route latency lane (2026-10-02)

> People-network (staffer sidecar 8841) latency lane 2026-10-02: default office route = one-directional work_time Dijkstra to a sink (no heuristic anywhere); Paul ruled full scope (bidirectional core + cancel/progressive + typeahead), live panel after restart, ALT deferred, ties may differ; WP-A/WP-B

## Content

Paul opened this lane on 2026-10-02. He said the people network was "almost not useable" and proposed
Bidirectional A* for office searches, with everyone currently in the office searching back toward the requester.

**Diagnosis**

- **The heuristic premise was false.** Every route path runs with heuristic 0 (`staffer_routing.py:381`). The snapshot's 'A*' label is Dijkstra.
- **Paul's backward-frontier design already exists, but not on the default path.** It is in `route_many` (the Ecosystem path, `:528-530`) and in `OverlapRoutes`.
- **The default UI route goes elsewhere.** Its settings are `work_time`, `route_count=3`, `distinct`. It reaches `ClosenessRoutes.search` (`staffer_closeness_routes.py:110-138`), which runs ONE direction from the requester to a virtual sink.
  - Office staff are only arcs into the sink, each with a positive terminal cost.
  - If no staffer has an office anchor, the search scans the whole component before giving up.
- **Memory blow-up:**
  - `pair_cache` keeps a full evidence dict for every checked pair, about 1 KB per check.
  - One default office route grew the sidecar from 7.0 to 17.5 GB and dropped host available RAM to 0.22 GB.
  - That was MY measurement request, so never fire a default office route at the live sidecar without a memory guard.
- **Page load is not the problem:** 11 requests, 110-300 ms.
- **Typeahead is slow:** people p95 8.4 s; office search max 41 s.
- **Packet:** session scratchpad `staffer_route_latency_packet.md` (session 4f30368b). It holds the eval spec, the optimized build prompt and the brain update drafts.

**Paul's rulings, 2026-10-02**

- **Scope:** core exact fix, plus responsiveness (cancel abandoned searches, show route 1 early), plus typeahead and lock contention.
- **Real-data check:** a live panel after he restarts 8841.
- **ALT landmarks:** deferred until the bidirectional search is measured.
- **Ties:** cost and steps must match exactly; equal-score paths may swap, and each swap is listed.

**Paul's rulings, 2026-10-03** ("b on ties, fix the uuid match, keep identity loop")

- **Ties:** routes whose exact costs are within 1e-12 relative of the minimum are ties; fewer steps wins, then lower exact cost. Reported cost is still the forward-order float sum.
- **Typeahead:** it never matches fragments of machine identifiers (politico:<uuid>, uuids, source ids, hashes). An exact full id still finds its node.
- **Identity loop:** keeps running at its current pace.
- **Builder branches** (both from integration tip 970e8c6d7): `claude/staffer-route-ties-20261003` in worktree route-core, and `claude/staffer-search-uuid-20261003` in worktree route-search.
- **Brain drafts:** D-082 (ties), D-083 (identifier fragments), D-084 (identity loop) are drafted in the packet.

**Landing, ruled 2026-10-03** (Paul: "stop, apply, start once the check passes")

- **Tip:** `claude/staffer-route-latency-20261002` at 86631c454.
- **Patch:** `scratchpad/landing_v2` (`route_latency.patch` sha256 0b5db04b…3076, 28 files).
- **Order once the independent Opus check passes:**
  1. Stop the 8841 PID from server.json.
  2. Run `landing_v2/scripts/apply_landing.py --apply`.
  3. Run `fec/surfaces/start_staffer_live.ps1`; the scheduled task stays disabled (D-080).
  4. Wait about 5 min for Ready.
  5. Run the live panel with a memory guard.
- **Follow-up:** `landing_v3_ids` (D-083 JS gaps, static files only, no restart) is cut against the landing_v2 post-images.
  - It now also carries the LOW-1 ranked-alternatives doc clause (README plus docstring).
  - Paul, 2026-10-03: "apply v3 once the check passes too".
  - Apply it after the live panel finishes.
- **landing_v2 applied:** 2026-10-03 14:59:02 local.
  - Sidecar stopped at 14:58:58 (old PID 10876) and started as PID 35320, Ready/PASS at 15:02:36.
  - Payroll pin unchanged since 09-08, so there was no identity self-apply.

**Unreachable message, Paul 2026-10-03** ("show the unreachable message, suggest Ecosystem")

- **Branch:** `claude/staffer-unreachable-hint-20261003` (worktree route-core, from f23a40aee).
- **Server:** adds `unreachable_reason`, `message` and `suggested_objective` to Staffer-model unreachable results. Status values do not change.
- **UI:** shows the message and a "Search Ecosystem" button that re-submits the search.
- **Needs a restart.** Paul sees the message strings before landing.

**landing_v3 and the next-round rulings, 2026-10-03**

- **landing_v3_ids applied 16:24:41.** Patch sha 1d408991…; static files plus a docstring, no restart.
- **Next round, ruled by Paul via questions:**
  - Speed options 1, 2 and 3: cache payroll_people and index contact_group; prewarm the work index and the network index after each router publish; skip zero-overlap pairs with a row-only pair(), which gives bit-identical rows.
  - NOT the full pre-score of every co-worker list (options 4+5).
  - Office search routes to the covered staff and reports how many were left out (until now, one uncovered staffer failed the whole office).
  - Land everything on ONE restart after the Opus check (stop, apply, start), then a short panel.
- **Committee names searchable again.** My D-083 follow-up over-reached by treating committee ids, which embed the committee name, as opaque.
- **Branches:**
  - claude/staffer-unreachable-hint-20261003 (route-core): the message; the office-coverage rule goes here next.
  - claude/staffer-coldpath-20261003 (route-jobs).
  - claude/staffer-search-committee-names-20261003 (route-search).

**Commit, ruled by Paul 2026-10-03:** "commit everything on main after the panel passes".

- **What it covers:** this lane's files only, i.e. the landing_v2, v3 and v4 manifests. Commit them with git add on those exact paths, then commit.
- **Leave alone:** other lanes' uncommitted LIVE changes and the untracked `staffer_live/approved/`.
- **Never** merge or check out a branch into LIVE, because a checkout rewrites EOLs (D-060).
- The post-commit hook pushes to the mirror.

**Brain, applied 2026-10-03** (Paul: "apply the brain drafts too")

- **Commit:** 686044f, pushed to the mirror.
- **Contents:** D-082 to D-087 added, the D-080 Outcome executed line, a STATE top bullet, and Last verified 2026-10-03.
- **Post-landing brain update must:**
  - set the D-083, D-085, D-086 and D-087 Outcomes to LANDED;
  - switch the six new headings from " - " to the em dash used by D-064 to D-081 (Paul: "fix the heading dashes in the same update");
  - fix the STATE 10-01 QME bullet, which still lists the 8841 start as pending;
  - refresh the STATE bullet.

**Record browser stays first-committee-only** (Paul 2026-10-03: "leave it first-committee only")

- The record browser searches only each person's first member, committee and policy id; the map filter searches all of them. This is documented in the README.
- Do not re-propose a change to the row contract.
- Committee names: commit 6a198d600 on claude/staffer-search-committee-names-20261003.

**Build layout**

- **WP-A, core search:** branch `claude/staffer-route-core-20261002`, worktree `C:\Users\pgoff\Melange-wt\route-core`. Sparse checkout of `fec/` from main 3248a6a02, placed outside OneDrive so `git worktree add` stays fast.
- **WP-B, cancellation and progressive results:** branch `claude/staffer-route-jobs-20261002`, worktree `C:\Users\pgoff\Melange-wt\route-jobs`.
- **Shared file:** both create the identical `fec/surfaces/staffer_route_cancel.py`.
- **WP-C, typeahead diagnosis:** read-only. Its fix comes after WP-B, because both touch `staffer_live_service.py`.
- **Untracked People page:** `fec/surfaces/staffer_live/approved/` is the redesign People page. It may belong to another lane, so it is not edited without Paul.

**Why:** Paul wants the people network usable, with the same routes; D-025 freezes coefficients and evidence boundaries.

**How to apply:**
- Merge WP-A and WP-B, add the WP-C fix, and run an Opus verifier.
- Cut ONE patch with `fec/tools/live_patch.py`; APPLY and the 8841 restart are Paul's.
- Then run the live panel with a memory guard: abort if available RAM falls below 400 MB or the sidecar grows by more than 1.5 GB.

Related: `staffer-live-sidecar-2026-09-04`, `ask-before-substantive-changes`, `reasoning-in-fable-code-in-opus-2026-09-16`, `go-faster-directive-2026-09-16`.

## Possible Connections

- [[staffer-live-sidecar]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-09-feature-staffer-network-surfaces]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-03 from the Claude Code memory file `people-network-route-latency-lane-2026-10-02.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[staffer-live-sidecar]], [[2026-09-feature-staffer-network-surfaces]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
