---
type: topic
title: "GLASS BOX lane-lock hang and Grok balance (Agent tooling stack)"
aliases: ["Agent tooling stack: GLASS BOX lane-lock hang and Grok balance"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-10
sources: []
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/feature"]
part_of: "[[2026-07-feature-agent-tooling-stack]]"
---

# GLASS BOX lane-lock hang and Grok balance (Agent tooling stack)

> The GLASS BOX lane-lock hang that blocked metaloop starts, and the Grok lane taken down on 2026-08-06 by an exhausted Grok Build usage balance. Part of [[2026-07-feature-agent-tooling-stack]] (project [[melange-systems]]).

## GLASS BOX lane-lock hang and Grok balance (source: glassbox-lane-lock-hang-2026-08-06, last modified 2026-08-10; see [[glass-box]])

- **GLASSEYE (2026-08-09):** the settings.json hook mirror stopped being invoked in app sessions about 2026-08-06 - zero hook-sourced events since, zero `agent.*` / `task.*` ever; `mirror.ps1` itself verified healthy against synthetic payloads (the harness stopped calling it; all hook names remain canonical per docs, no documented schema change). Permanent metaloop.md section @18dab6b: the coordinator emits `agent.started` / `agent.completed` + `task.created` / `task.completed` pairs via `emit.ps1` around every fan-out and background task (`-Source coordinator`; `-RunId` only inside a Meta LOOP run - `emit.ps1` does NOT auto-attach runs by cwd, so runless emission is safe beside a live run). Emission path live-verified.
  - Correction 2026-10-03 (source `windows-hook-shell-git-bash`; noted here 2026-10-04): the harness did call the hooks; their commands failed, because hook commands run through Git Bash, which stripped the backslashes of their unquoted Windows paths, so the 16 `mirror.ps1` hooks were dead from about 2026-08-02 until 2026-10-03 (GLASS BOX; Tooling and environment traps, Rule 6).
- **Metaloop start failure mode:** `metaloop.ps1 -Action start` failed with `GLASS BOX launch incomplete: 4/5 views healthy`. Cause: a `console.ps1 -Lane <x>` process was alive but its heartbeat had frozen about 10 h earlier. It holds `state\lane-<x>.runtime.lock` with `FileShare::None`, so every newly spawned console hits the `catch [IO.IOException] { exit 0 }` path and dies instantly - the launcher's 10 s health deadline then fails the start.
- `launch.ps1` will **not** fix this on its own: `Stop-GlassboxOwnedProcess` is only called when the process is `-not $health.compatible`. A hung-but-compatible view is never killed, so it retries forever.
- **Remedy:** confirm the PID's command line is the expected `console.ps1 -Lane <x>`, `Stop-Process -Id <pid> -Force`, delete `state\lane-<x>.heartbeat.json`, then start again. The auto-mode classifier blocks `Stop-Process`, so this needs Paul's approval - ask once, with the PID and its start time. Killing a lane console is safe: it is a viewer, the event log is the source of truth. Likely trigger is a console frozen on QuickEdit text selection.
- **Grok lane down:** `grok -p` returned HTTP 402 `Grok Build usage balance exhausted` on 2026-08-06. The lane is a capability block, not a work failure - emit `flow.ps1 -Action skip` for it and reroute the independent review to a FRESH `mcp__codex__codex` thread (read-only sandbox, reviewer framing). That substitution worked well: the review found 11 real defect groups.
- **Codex MCP idle timeout:** a long `codex-reply` aborted with "sent no response or progress". The edits had partially landed. Never infer the outcome - `git status` + a byte-diff audit is the only truth. Set a per-server `timeout` in MCP settings or `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` to avoid it.
- Codex escalated **four** genuine contradictions in Claude-authored specs during this run (a freeze-list/substitution conflict, a data token being rethemed, bad count arithmetic, and an unused token that would inject a frozen literal). The escalation protocol is earning its keep - never treat a Codex stop as obstruction. See `melange-ui-retheme-2026-08-06`.
