---
type: actor
name: "GLASS BOX event stream"
aliases: ["glassbox"]
category: "tool"
description: "GLASS BOX: the shared observability event stream (C:\\Users\\pgoff\\.claude\\glassbox\\events) and lane-aware viewer/console rig for the claude/codex/grok/gemini lanes; Paul's standing rule (2026-07-27) is that every process emits to it."
repository: "C:\\Users\\pgoff\\.claude\\glassbox"
stack: "PowerShell (console.ps1, dispatch.ps1, emit.ps1, mirror.ps1, launch.ps1, flow.ps1, metaloop.ps1), JSON event files, fec/open_glassbox_process_matrix.ps1 viewer"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "A hung lane console (console.ps1 -Lane <x>) holds state\\lane-<x>.runtime.lock (FileShare::None) and blocks every metaloop start; launch.ps1 will not clear it: kill the PID"
  - "The auto-mode classifier blocks Stop-Process: killing the hung PID needs Paul's approval (ask once, with the PID and start time)"
  - "settings.json hook mirror stopped being invoked in app sessions ~2026-08-06 (zero hook-sourced events, zero agent.*/task.* ever); coordinator must emit agent.*/task.* pairs itself. Correction 2026-10-03: the 16 mirror.ps1 hooks were dead from about 2026-08-02 because hook commands run through Git Bash, which stripped the backslashes of their unquoted Windows paths; fixed 2026-10-03 with forward slashes"
  - "Grok lane down 2026-08-06: HTTP 402 Grok Build usage balance exhausted"
  - "Codex MCP idle timeout aborts long codex-reply ('sent no response or progress'); edits may have partially landed"
  - "Array params must be passed via -Command, never -File (silent bind failure)"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/glassbox-lane-lock-hang-2026-08-06.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\glassbox-lane-lock-hang-2026-08-06.md", sha256: "931cdc0deb8e18dce2c3b3f12415d5baca4fcfb57bf79d0e98089dd5fee3092b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/glassbox-everything-rule-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\glassbox-everything-rule-2026-07-27.md", sha256: "d803cdacd32e6f6d3fbac015ed401fa5898e1bf27a82dafa6d237bad6a85b787"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-03-35774e/memory/windows-hook-shell-git-bash.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-03-35774e\\memory\\windows-hook-shell-git-bash.md", sha256: "a239f75054598a3e26fa33f532b3a325b6501c3277add53d25908a2055522138"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# GLASS BOX event stream

> Shared observability event stream and dashboard for all lanes (claude / codex / grok / gemini); every process must emit to it. A hung lane console holds `runtime.lock` and blocks every metaloop start: kill the PID.

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\.claude\glassbox` (not a git repo; event stream at `C:\Users\pgoff\.claude\glassbox\events`; viewer script `fec/open_glassbox_process_matrix.ps1` in the Melange repo) |
| Stack | PowerShell scripts; JSON event files; per-lane console windows |
| Status | active |
| Criticality | medium |
| PCI | no |
| Team | none |

## Dependencies

- Depended on by: [[metaloop]] (`metaloop.ps1 -Action start` launches GLASS BOX and requires all views healthy), [[codex-executor]] (Codex lane window, mirrored via the `mcp__codex__*` hook), [[melange-refresh-scheduler]] and the refresh jobs (collector/restore/audit must emit), [[forecast-redesign]] / Forecast audit, giving-view redesign and PAC accuracy (lane work visible in the stream), [[2026-08-incident-refresh-automation-reliability]] (the invisible-restore failures of 2026-07-27), [[2026-07-feature-agent-tooling-stack]] and Agent orchestration and model tiering rules (the standing everything-through-Glass-Box rule).
- Depends on: Windows PowerShell 5.1, the Claude Code settings.json PostToolUse hook (`mirror.ps1`), Grok Build CLI (`grok -p`) and the Gemini CLI (`agy`) for their lanes, Codex via MCP (out-of-band).
- Related memory notes: `desk-media-footprint-2026-07-16`, `codex-executor-lane-2026-07-18`, `legfix5-recollection-lane-2026-07-27`, `melange-ui-retheme-2026-08-06`, `powershell-visible-work`.

## Flows

- Any process (collector, restore, audit, pipeline stage, background watcher) emits progress events to the shared directory `C:\Users\pgoff\.claude\glassbox\events`. The viewer (`fec/open_glassbox_process_matrix.ps1`) polls ONE directory and creates a row per lane/source/run automatically; emitting to the shared stream is the whole integration (no registration step).
- Coordinator emission (GLASSEYE, permanent metaloop.md section @18dab6b): the coordinator emits `agent.started` / `agent.completed` + `task.created` / `task.completed` pairs via `emit.ps1` around every fan-out and background task (`-Source coordinator`; `-RunId` only inside a Meta LOOP run; `emit.ps1` does NOT auto-attach runs by cwd, so runless emission is safe beside a live run). Emission path live-verified.
- Skipped/blocked lanes: emit `flow.ps1 -Action skip` for a lane that is a capability block (e.g. Grok out of balance) and reroute the review.
- Lane windows (rig of 2026-07-24, see below): `dispatch.ps1 '<command>' -Lane <lane> [-TimeoutSec n]` queues a command to that lane's console; PostToolUse `mirror.ps1` mirrors Write/Edit/NotebookEdit/PowerShell/Bash and `mcp__codex__*` calls to lane windows.

## Dev Commands

```bash
# event shape (one JSON file per event); lane is one of claude/codex/grok/gemini
# {schema_version, timestamp_utc, lane, source, run_id, kind, status, stage, summary, detail, current, total}

# which viewer instance is actually reading which directory
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'open_glassbox_process_matrix' }

# start Meta LOOP (launches GLASS BOX; fails if any view is unhealthy)
metaloop.ps1 -Action start

# clear a hung lane console: confirm the PID's command line is the expected `console.ps1 -Lane <x>`, then
Stop-Process -Id <pid> -Force
# delete state\lane-<x>.heartbeat.json, then start again

# coordinator emission
emit.ps1 ... -Source coordinator [-RunId <id>]     # agent.started/agent.completed, task.created/task.completed
flow.ps1 -Action skip                              # skip a lane that is a capability block

# dispatch to a lane window
& C:\Users\pgoff\.claude\glassbox\dispatch.ps1 '<command>' -Lane claude|codex|grok|gemini [-TimeoutSec n]

# pass array params via -Command, never -File (-File silently fails to bind them and the window exits)
```

## Known Issues

- **Hung lane console blocks every metaloop start (2026-08-06).** `metaloop.ps1 -Action start` failed with `GLASS BOX launch incomplete: 4/5 views healthy`. Cause: a `console.ps1 -Lane <x>` process was alive but its heartbeat had frozen ~10h earlier. It holds `state\lane-<x>.runtime.lock` with `FileShare::None`, so every newly spawned console hits the `catch [IO.IOException] { exit 0 }` path and dies instantly; the launcher's 10s health deadline then fails the start.
  - `launch.ps1` will NOT fix this on its own: `Stop-GlassboxOwnedProcess` is only called when the process is `-not $health.compatible`; a hung-but-compatible view is never killed, so it retries forever.
  - Remedy: confirm the PID's command line is the expected `console.ps1 -Lane <x>`, `Stop-Process -Id <pid> -Force`, delete `state\lane-<x>.heartbeat.json`, then start again. The auto-mode classifier blocks `Stop-Process`, so this needs Paul's approval: ask once, with the PID and its start time. Killing a lane console is safe: it is a viewer, the event log is the source of truth.
  - Likely trigger: a console frozen on QuickEdit text selection.
- **GLASSEYE (2026-08-09):** the settings.json hook mirror stopped being invoked in app sessions ~2026-08-06 (zero hook-sourced events since, zero `agent.*`/`task.*` ever); `mirror.ps1` itself verified healthy against synthetic payloads (the harness stopped calling it; all hook names remain canonical per docs, no documented schema change). Workaround: the coordinator emission section above.
  - **Correction 2026-10-03 (source `windows-hook-shell-git-bash`):** the harness did call the hooks; their commands failed. Claude Code on this machine runs hook commands through Git Bash, which strips the backslashes from an unquoted Windows path (`-File C:\...\x.ps1`), so the 16 `mirror.ps1` hooks in `~/.claude/settings.json` were dead from about 2026-08-02 until 2026-10-03, silently, because async hook failures are silent. Fixed with forward slashes (original backed up at `settings.json.bak-glassbox-2026-10-03`); the hooks hot-reload, and live sessions began emitting glassbox events within about 46 seconds. Rule and hook test recipe: Tooling and environment traps, Rule 6.
  - Reviving the hooks also restarts retention: `common.ps1` keeps the newest 5000 `*.json` files in `events/`, pruned about every 5 minutes.
- **Grok lane down.** `grok -p` returned HTTP 402 `Grok Build usage balance exhausted` on 2026-08-06. The lane is a capability block, not a work failure: emit `flow.ps1 -Action skip` for it and reroute the independent review to a FRESH `mcp__codex__codex` thread (read-only sandbox, reviewer framing). That substitution worked well: the review found 11 real defect groups.
- **Codex MCP idle timeout.** A long `codex-reply` aborted with "sent no response or progress"; the edits had partially landed. Never infer the outcome: `git status` + a byte-diff audit is the only truth. Set a per-server `timeout` in MCP settings or `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` to avoid it.
- Codex escalated FOUR genuine contradictions in Claude-authored specs during this run (a freeze-list/substitution conflict, a data token being rethemed, bad count arithmetic, and an unused token that would inject a frozen literal). The escalation protocol is earning its keep: never treat a Codex stop as obstruction. (See `melange-ui-retheme-2026-08-06`.)
- Event filenames must be unique per PROCESS (timestamp + PID), not per config (a collision occurred in `legfix5-recollection-lane-2026-07-27`).
- Array params must be passed via `-Command`, never `-File`; `-File` silently fails to bind them and the window exits.

## Standing rule: everything runs through the Glass Box (Paul, 2026-07-27)

Any process (collector, restore, audit, pipeline stage, background watcher) must emit progress to the shared stream at `C:\Users\pgoff\.claude\glassbox\events`. A job that runs without emitting there is not acceptable, even if it works.

- **Why:** Paul cannot supervise what he cannot see. Two separate failures on 2026-07-27 came from invisible work: the R full-text collector wrote events only to `<out_dir>/events` (so the viewer, which polls the shared directory, showed nothing despite the lane being correctly tagged `lane: codex`), and a OneDrive content restore ran for two hours with no emitter at all, which led to misdiagnosing an in-progress sync as permanent data loss.
- **How to apply:**
  - The viewer (`fec/open_glassbox_process_matrix.ps1`) polls ONE directory and creates a row per lane/source/run automatically; emitting to the shared stream is the whole integration.
  - Event shape: `{schema_version, timestamp_utc, lane, source, run_id, kind, status, stage, summary, detail, current, total}`. Lane is one of claude/codex/grok/gemini.
  - Filenames must be unique per PROCESS (timestamp + PID), not per config.
  - Array params must be passed via `-Command`, never `-File`.
  - Always verify what a viewer instance is actually reading with the `Get-CimInstance Win32_Process` command above.

## Desktop rig history (2026-07-24, from the PowerShell visible-work note)

- Paul wants glass-box commands running in a REAL desktop terminal window, not only the transcript. Rig built at `C:\Users\pgoff\.claude\glassbox\`: `console.ps1` (visible window, polls `inbox\*.ps1`, echoes + runs + writes `outbox\<id>.out`) + `dispatch.ps1` (queues command, auto-starts window titled "GLASS BOX*", waits, returns output).
- LANE UPGRADE (Paul: keep claude/codex/grok/gemini SEPARATE, different colors; chose FOUR WINDOWS): `dispatch.ps1` takes `-Lane claude|codex|grok|gemini` (default claude) and routes `inbox\<lane>\` / `outbox\<lane>\`; `console.ps1 -Lane`, window title "GLASS BOX - <LANE>", single-instance `<lane>.lock` (PID-checked), auto-opens on that lane's FIRST dispatch. Colors: Claude=Cyan, Codex=Green, Gemini=Yellow, Grok=Red (command text in lane color, output White, headers DarkGray).
- LANE SEMANTICS (be honest): Grok/Gemini CLI calls (`grok` headless `-p`, `agy`) should literally EXECUTE inside their lane window via dispatch `-Lane`; Codex executes out-of-band via MCP, so its GREEN window carries spec-file writes, worktree git diffs and verification reads. NEVER claim Codex internal edits stream live.
- Mirror layer: console v3 renders `*.txt` display-only mirror records; `mirror.ps1` (PostToolUse hook target) routes Write/Edit/NotebookEdit/PS/Bash to claude (grok/agy-gemini sniffed to their lanes), `mcp__codex__*` to codex with prompt + response, 8000-char explicit truncation, always exit 0; skips `dispatch.ps1` calls (already live).
- HOOKS INSTALLED + PROVEN 2026-07-24 23:42: Paul hand-authored `settings.json` (3rd attempt; 1st never saved, 2nd had paste debris), PARSE-VERIFIED: 2 dispatch allow rules + PostToolUse hook (Write|Edit|NotebookEdit|PowerShell|Bash|mcp codex tools -> `mirror.ps1`, timeout 15). Mirror path proven end-to-end (fake `mcp__codex__codex` JSON piped through `mirror.ps1` displayed in the GREEN window and consumed, inbox 0 pending). Hooks fire only in sessions started AFTER the save. (Dated note 2026-10-04: on 2026-10-03 an edit to these hooks in `settings.json` hot-reloaded, and live sessions emitted glassbox events within about 46 seconds (Tooling and environment traps, Rule 6); this 2026-07-24 observation was made at the first install, and no record says whether running sessions pick up a newly added hook.)
- CORRECTION 2026-07-24: `settings.json` mtime 7/7 + 38 bytes proved the allow rules were NEVER on disk at the earlier point (Paul's Copy-Item never landed); dispatch calls then succeeded on classifier goodwill (user approval on record), not on any rule.
- `/glassbox` slash command rewritten grant-free and BOM-less (first bytes 45,45,45,10): it dispatches a hello through each lane to open all windows. The earlier `~/.claude/commands/glassbox.md` was BROKEN (UTF-8 BOM killed its frontmatter); never recreate its allowed-tools auto-apply form (that exact write was classifier-blocked). PS5.1 `Set-Content -Encoding utf8` writes a BOM: never use it for files needing frontmatter (use `[IO.File]::WriteAllText` with `UTF8Encoding($false)`). `settings.json.bak` is the backup.
- Full-visibility architecture: transcript = visible PowerShell commands (always-on rule); desktop = 4 lane windows fed by (a) `dispatch.ps1` live execution and (b) harness-enforced PostToolUse mirrors across ALL sessions/projects. (Part (b) was dead from about 2026-08-02 to 2026-10-03; see the GLASSEYE correction.)

## Timeline

| Date | Event |
|---|---|
| 2026-07-24 | Desktop rig built, lane-aware four windows; mirror layer; hooks hand-installed and proven (23:42) |
| 2026-07-27 | Paul's standing everything-through-Glass-Box rule after two invisible-work failures |
| 2026-08-06 | Hung lane console blocks metaloop start; Grok balance exhausted (HTTP 402); Codex MCP idle timeout |
| 2026-08-06 | Hook mirror stops being invoked in app sessions (found 2026-08-09, GLASSEYE); corrected 2026-10-03: the hooks were called but their commands failed, dead from about 2026-08-02, because hook commands run through Git Bash, which stripped the backslashes of their unquoted Windows paths |
| 2026-08-09 | GLASSEYE: coordinator-side emission adopted (metaloop.md section @18dab6b) |
| 2026-10-03 | Hook mirror revived: the 16 `mirror.ps1` hooks rewritten with forward-slash paths; events flowed again within about 46 seconds; retention restarted |

## Related Actors

- [[codex-executor]] - Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17
- [[melange-refresh-scheduler]] - Unattended Melange refresh jobs: weekly refresh, congress daily chain, report email; weekly not COMPLETE since 2026-07-19
- [[metaloop]] - /metaloop (shipped @46b17b9): Fable decomposes/reviews, Codex executes, Gemini perceives, Grok critiques; UNIVERSAL LANE LAWS @86ba6ef.

## Related Concepts

- [[census-before-claims]] — Measure first (a census, the live file, git status plus a byte diff) before stating a mechanism, a number or a completion; never infer it.

## Related Topics

- [[2026-07-feature-agent-tooling-stack]] - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.
- Agent orchestration and model tiering rules - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.
- [[2026-08-incident-refresh-automation-reliability]] - Weekly Melange refresh has not completed since 2026-07-19; audit, rulings, tick-runner redesign, daily-chain blockers, Codex poll-loop burn
- Forecast audit, giving-view redesign and PAC accuracy - Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD).
- [[2026-07-feature-agent-tooling-stack-glass-box-lock-hang]] — The GLASS BOX lane-lock hang that blocked metaloop starts, and the Grok lane taken down on 2026-08-06 by an exhausted Grok Build usage balance.

## Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
