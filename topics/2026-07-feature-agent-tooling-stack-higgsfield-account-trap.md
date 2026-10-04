---
type: topic
title: "Higgsfield connector account trap (Agent tooling stack)"
aliases: ["Agent tooling stack: Higgsfield connector account trap"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-10
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/feature"]
part_of: "[[2026-07-feature-agent-tooling-stack]]"
---

# Higgsfield connector account trap (Agent tooling stack)

> The Higgsfield connector account trap: the connector bound to a free account, re-authorized by Paul on the plus plan on 2026-09-19, then back on a free account on 2026-09-30 and 2026-10-01. Part of [[2026-07-feature-agent-tooling-stack]] (project [[melange-systems]]).

## Higgsfield connector account trap (source: higgsfield-connector-account-trap-2026-09-17, last modified 2026-10-01; see [[higgsfield-connector]])

- Higgsfield MCP (connector "Higgsfield", 89 tools) on 2026-09-17 was bound to a free-plan account: one private workspace, 10 credits, `gpt_image_2_5` and `recraft_v4_1` refused with "Requires basic plan or higher", `z_image` accepted a 16:9 job, sat "queued" for many polls, then failed; a batch of four hit "429: rate_limit_reached" (one job at a time). Paul said the account [personal email omitted] has credits and asked Claude to log in with it.
- **Why:** the connector's account is set by the OAuth authorization in the desktop app (Settings > Connectors), not by anything the MCP tools expose; `list_workspaces` only lists workspaces of the authorized account, and `reconnect_session_connector` only re-dials a failed server. Entering a password to authenticate is off-limits for Claude in any case.
- **UPDATE 2026-09-19:** Paul re-authorized. `balance` returned plan `plus`, 1,069.9 credits; `list_workspaces` showed one private workspace on plus. `gpt_image_2_5` (reference images via role `image_references`, quality low..max, 1k/2k/4k) was available. The free-plan failure mode above is history unless `balance` says otherwise again.
- **UPDATE 2026-09-30:** the connector was back on a FREE account (one private workspace, 10 credits); `gpt_image_2_5` refused at submit ("Requires basic plan or higher") although `get_cost` priced it. Paul said "Higgsfield should have a subscription", then "I force you to proceed". `nano_banana_pro` (resolution 2k, 16:9, role `image_references`) IS accepted on free, costs 2 credits per board, runs 3 jobs concurrently, and renders dense UI text very well. The CloudFront download via .NET WebClient fails on the first call in a PowerShell process ("underlying connection was closed"); a fresh `powershell -NoProfile` with Invoke-WebRequest works.
- **UPDATE 2026-10-01:** `balance` again returned plan `free` with 4 credits, although Paul said "You should be connected to my higgsfield account under" [personal email omitted]. Claude told him to re-authorize the connector, and built HTML mock-ups rendered to PNG in the meantime.
- **How to apply:** when Higgsfield renders are wanted, check `balance` and `list_workspaces` first; if the plan is free, tell Paul the connector needs re-authorizing with the credited account (disconnect and reconnect in Settings > Connectors, sign in as the credited account [personal email omitted]) and deliver full-fidelity HTML mockups rendered to PNG through the Mentat tests' Playwright (`require.resolve('playwright', {paths: [~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules]})`, `chromium.launch({channel: 'chrome'})`) in the meantime. `jobs_wait` caps `timeout_seconds` at 15. Related memory: `mentat-ui-cleanup-lane-2026-09-17`.
