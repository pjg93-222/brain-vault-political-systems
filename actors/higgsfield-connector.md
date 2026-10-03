---
type: actor
name: "Higgsfield connector"
aliases: ["Higgsfield MCP"]
category: "tool"
description: "Higgsfield MCP connector (connector name 'Higgsfield', 89 tools) used to generate Melange and Mentat redesign boards (gpt_image_2_5, nano_banana_pro); it is bound to whichever account authorized it in the desktop app (Settings > Connectors), so a plan or account switch needs Paul to re-authorize it; the assistant never logs in for him."
repository: ""
stack: "MCP connector 'Higgsfield' (89 tools), OAuth-authorized in the desktop app (Settings > Connectors); models gpt_image_2_5, recraft_v4_1, z_image, nano_banana_pro; credits-based plans (free / plus)"
status: "active"
team: ""
criticality: "low"
pci: false
known_issues:
  - "Connector is bound to the account that authorized it; it was found on a FREE plan (10 credits, then 4) on 2026-09-17, 2026-09-30 and 2026-10-01, even after Paul re-authorized on 2026-09-19"
  - "On free: gpt_image_2_5 and recraft_v4_1 refuse with 'Requires basic plan or higher'; z_image queues then fails; 429 rate_limit_reached on batches (one job at a time)"
  - "Switching accounts needs Paul to re-authorize; the assistant must never log in with a password"
  - "CloudFront download via .NET WebClient fails on the first call in a PowerShell process; Schannel curl fails with CRYPT_E_REVOCATION_OFFLINE; Node fetch got ECONNRESET"
  - "Paul cannot see the Higgsfield MCP gallery widget in the desktop Code tab: deliver via SendUserFile or an Artifact"
  - "Balance deltas mislead when two sessions spend at once; use the transactions log"
  - "Image boards invent numbers, names, sidebar items and copy values from neighbouring cells"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/higgsfield-connector-account-trap-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\higgsfield-connector-account-trap-2026-09-17.md", sha256: "4c6586f59c0b0e0ae0f9998b191e3c8427740f26941607e9c706683b1c88d102"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-redesign-boards-2026-09-22.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-redesign-boards-2026-09-22.md", sha256: "2b7d9f761beeed02ad734103878f763aac50962402282e1ba159ffc20ae75c3d"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# Higgsfield connector

> The Higgsfield MCP connector ("Higgsfield", 89 tools) that renders the UI mock-up boards for the [[mentat-console]] and the [[melange-dashboard]]; it acts as whichever Higgsfield account authorized it, which is why its plan and credit balance can change between sessions without any tool call changing it.

## Details

| Field | Value |
|---|---|
| Repository | none (MCP connector authorized in the desktop app: Settings > Connectors) |
| Stack | MCP connector "Higgsfield" (89 tools); models seen: `gpt_image_2_5` (reference images via role `image_references`, quality low..max, 1k/2k/4k), `recraft_v4_1`, `z_image`, `nano_banana_pro` |
| Status | active |
| Criticality | low |
| PCI | no |
| Team | none |

## Dependencies

- **Depends on:** the Higgsfield account that authorized the connector (a Georgetown address, [personal email omitted]); the desktop app's OAuth authorization (Settings > Connectors), which alone sets the account; the connector's session tools `balance`, `list_workspaces`, `get_cost`, `jobs_wait`, `transactions`, `media_upload`/`media_confirm`.
- **Does NOT control the account:** `list_workspaces` only lists workspaces of the authorized account; `reconnect_session_connector` only re-dials a failed server; entering a password to authenticate is off-limits for the assistant in any case.
- **Depended on by:** the redesign work in [[2026-09-feature-ui-redesign-boards]] (Mentat boards 2026-09-21/22 and Melange boards `#24`-`#43` of 2026-09-22, built for [[melange-systems]] and [[mentat-console]]), the Mentat console UI lane [[2026-09-feature-mentat-console-ui]], and the agent tooling stack [[2026-07-feature-agent-tooling-stack]]. Fallback when the plan is free: full-fidelity HTML mock-ups rendered to PNG through the Mentat tests' Playwright (see Dev Commands). Related memory: `mentat-ui-cleanup-lane-2026-09-17`.

## Flows

- `higgsfield-connector` <- board prompts (style block + per-screen spec carrying real numbers, `image_references`) from [[2026-09-feature-ui-redesign-boards]].
- `higgsfield-connector` -> board images (16:9, 2k) to the review pages (Artifacts) via download (.NET WebClient / fresh `powershell -NoProfile` with Invoke-WebRequest) and Artifact publication; `gpt_image_2_5` high 2k 16:9 = 3 credits per board, `nano_banana_pro` 2k 16:9 = 2 credits per board.

## Dev Commands

```bash
# Check the account first when renders are wanted
balance            # plan + credits (plus 1,069.9 credits on 2026-09-19; free 10 credits on 2026-09-17; free 4 credits on 2026-10-01)
list_workspaces    # one private workspace on the authorized account
get_cost           # prices a job (it priced gpt_image_2_5 on a free plan although submit refused it)
jobs_wait          # timeout_seconds is capped at 15
transactions       # authoritative credit log (use instead of balance deltas)
# Download that works: a fresh powershell -NoProfile with Invoke-WebRequest (CloudFront)
# Playwright fallback for HTML mock-ups rendered to PNG (Mentat tests' Playwright):
#   require.resolve('playwright', {paths: [~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules]})
#   chromium.launch({channel: 'chrome'})
```

Upload method used in the lanes: `media_upload` (presigned URL, Node fetch PUT works), then `media_confirm`; download = .NET WebClient from PowerShell (fresh process).

## Known Issues

- **Account trap (2026-09-17):** the connector was bound to a free-plan account: one private workspace, 10 credits, `gpt_image_2_5` and `recraft_v4_1` refused with "Requires basic plan or higher", `z_image` accepted a 16:9 job, sat "queued" for many polls, then failed; a batch of four hit "429: rate_limit_reached" (one job at a time). Paul said the account (a Georgetown address, [personal email omitted]) has credits and asked me to log in with it.
- **UPDATE 2026-09-19:** Paul re-authorized. `balance` returned plan `plus`, 1,069.9 credits; `list_workspaces` shows one private workspace on plus. `gpt_image_2_5` (reference images via role `image_references`, quality low..max, 1k/2k/4k) is available. The free-plan failure mode is history unless `balance` says otherwise again.
- **UPDATE 2026-09-30:** the connector was back on a FREE account (one private workspace, 10 credits); `gpt_image_2_5` refused at submit ("Requires basic plan or higher") although `get_cost` priced it. Paul said "Higgsfield should have a subscription", then "I force you to proceed". `nano_banana_pro` (resolution 2k, 16:9, role `image_references`) IS accepted on free, costs 2 credits per board, runs 3 jobs concurrently, and renders dense UI text very well. The CloudFront download via .NET WebClient fails on the first call in a PowerShell process ("underlying connection was closed"); a fresh `powershell -NoProfile` with Invoke-WebRequest works.
- **UPDATE 2026-10-01 (newest):** `balance` again returned plan `free` with 4 credits, although Paul said "You should be connected to my higgsfield account under [personal email omitted]" (the Georgetown address). I told him to re-authorize the connector, and built HTML mock-ups rendered to PNG in the meantime.
- Delivery traps (recorded in the 2026-09-19 Mentat polish lane, `mentat-ui-polish-lane-2026-09-19`): Paul cannot see the Higgsfield MCP gallery widget in the desktop Code tab; download outputs and send them with `SendUserFile`, or publish an Artifact with the images as supporting files. Schannel curl fails here with CRYPT_E_REVOCATION_OFFLINE and Node fetch got ECONNRESET from Higgsfield's CloudFront; `.NET WebClient` from PowerShell downloaded fine; Node fetch PUT to the S3 presigned upload URL worked. Image boards invent numbers, names and sidebar items: say so every time they are shown.

## Standing rules

- **Rule: when Higgsfield renders are wanted, check `balance` and `list_workspaces` first; if the plan is free, tell Paul the connector needs re-authorizing with the credited account (disconnect and reconnect in Settings > Connectors, sign in as the credited Georgetown account, [personal email omitted]) and deliver full-fidelity HTML mockups rendered to PNG through the Mentat tests' Playwright in the meantime.**
  - **Why:** the connector's account is set by the OAuth authorization in the desktop app (Settings > Connectors), not by anything the MCP tools expose; `list_workspaces` only lists workspaces of the authorized account, and `reconnect_session_connector` only re-dials a failed server. Entering a password to authenticate is off-limits for me in any case.
  - **How to apply:** run `balance` + `list_workspaces` at the start of any board lane; never attempt a login; hand the re-authorization to Paul; fall back to the Playwright PNG path; `jobs_wait` caps `timeout_seconds` at 15.
- **Switching to Paul's credited account needs Paul to re-authorize the connector, never a login by me** (the metadata description of the 2026-09-17 memory).
- **Use `transactions`, not balance deltas, when two sessions spend at once** (see credit log below).

## Board generation method and costs (from `melange-redesign-boards-2026-09-22`)

- Brief: Paul, 2026-09-22, via `/taste-skill:imagegen-frontend-web`: "Go over the Melange UI and examine for areas of improvement using higgsfield and figma, create mock-ups for each section. The overall purpose it to aim for ease of use, flexibility in information that is compared, little clutter", then after he picks, "an optimized and exacting prompt to create a one-to-one replica for each within the UI."
- **State:** 20 boards (`#24`-`#43`; numbered after the Mentat lane's B10-B23 so replies cannot collide; options named in words). Review artifact https://claude.ai/artifact/ACtbyuFUo5wbRDfoMJB3a5.
- **Method that worked:** pilot board `#27` with today's Members list as `image_references`, then every later board uses the pilot's job id (`03f7e0ad-0d4e-4c3f-b085-6c5f27c6e35a`) as style reference; `gpt_image_2_5` high 2k 16:9 = 3 credits each (60 total per the transaction log, 13:39-14:19Z; balance read 107.9 after because another lane's 17 boards, 51 credits stamped 04:01-04:09Z, posted in between: balance deltas mislead, use `transactions`).
- **v2 recolour (Paul: "adjust the coloring to make sure it fits with the current color scheme, you are using the old one"):** all 15 picks redrawn as v2; v2 style ref = pilot job `b817216c-c83a-4028-a13d-4fdf36d9bc15` (+ `445e0285` current Influence page for the dark map boards); 15 boards × 3 = 45 credits.
- **Traps seen (put in each build prompt's Don't-copy list):** the model copies a value from the row above (`#43` Monroe 1,194 vs 1,907); invents totals (`#37` bar tops); mislabels years (`#36` "2025 so far"); fills matrix cells wrongly (`#32` Vargas FOM); paints data bars gold (`#38`, `#41`) although gold is chrome; draws decorative network layouts (`#24`-`#26`).
- **Figma (a separate connector, same Georgetown account email written as [personal email omitted]):** claude.ai connector (NOT the plugin server, which needs OAuth this session can't run); `whoami` = Paul Goff's team, Starter plan, **View seat = 20 MCP tool calls per MONTH**; only `whoami`, `create_new_file` and `add_code_connect_map` are free; an Education plan would lift the cap to 200/day (his call); file `q6BMpPjt2FccwNnJwFtIBe` (https://www.figma.com/design/q6BMpPjt2FccwNnJwFtIBe, created 2026-09-22). Agents never call Figma; only the main session spends the calls. Detail in [[2026-09-feature-ui-redesign-boards]].

## Credit and usage log (cross-lane, with dates)

| Date | Lane | Use | Credits |
|---|---|---|---|
| 2026-09-17 | account trap | free plan: gpt_image_2_5 refused; z_image failed; 4-job batch hit 429 | 10 credits on account |
| 2026-09-19 | re-authorized | plan `plus` | 1,069.9 balance |
| 2026-09-22 | Melange boards `#24`-`#43` | 20 boards, `gpt_image_2_5` high 2k 16:9, log 13:39-14:19Z | 60 |
| 2026-09-22 | Melange v2 recolour | 15 boards × 3 | 45 |
| 2026-09-22 | parallel Mentat lane (17 boards, stamped 04:01-04:09Z) | gpt_image_2_5 | 51 |
| 2026-09-30 | free account again | `nano_banana_pro` 2k 16:9, 3 concurrent jobs | 2 per board |
| 2026-10-01 | free account, 4 credits | HTML mock-ups rendered to PNG instead | 0 |

Related Mentat-lane figures (from `mentat-redesign-boards-2026-09-21`, a source of the topic, summarized for the credit story): 14 Mentat boards (42 credits, 00:32-00:36Z 2026-09-22; balance left 266.9), the parallel M1-M13 lane of 16 boards (48 credits, 01:11-01:24Z; its "real ~5.6/board" came from a balance delta that included the other lane's 42), round two 17 boards (51 credits; balance 167.9).

## Related Actors

- [[melange-dashboard]] - Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network).
- [[mentat-console]] - Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812.

## Related Topics

- [[2026-07-feature-agent-tooling-stack]] - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.
- [[2026-09-feature-mentat-console-ui]] - Mentat console UI lanes 2026-09-11..25: Chart Studio, clean-up, polish, load-time/FEC links, Graph and pie quirks.
- [[2026-09-feature-ui-redesign-boards]] - Sept 2026 redesign: Higgsfield boards for Mentat and Melange, overlay-first builds, finalize/reconcile rounds, graph quirks.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
