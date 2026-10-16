---
type: fleeting
title: "Fast startup restart check (2026-10-12)"
aliases: ["fast-startup-restart-check-2026-10-12"]
source: "session"
captured_at: 2026-10-12
created_at: 2026-10-12
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "reference"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fast-startup-restart-check-2026-10-12.md", type: "claude-memory", synced_at: "2026-10-13", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fast-startup-restart-check-2026-10-12.md", sha256: "312a0799608e1027f0bf5366c49e9a0f157918eedf999b387a1816fd2ef0bd5d"}
updated_at: 2026-10-13
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Fast startup restart check (2026-10-12)

> PAULCOMPUTER has Fast Startup on, so 'Shut down' is a hibernate, not a restart; verify any claimed restart via Kernel-Boot event 27 plus install artifacts before acting

## Content

PAULCOMPUTER has Fast Startup enabled (HiberbootEnabled=1). "Shut down" by any route (Start menu, power button, SlideToShutDown) hibernates the kernel. LastBootUpTime does not change and pending feature installs do not complete. Only Start > Power > Restart or `shutdown /r /t 0` is a real reboot.

2026-10-12: Paul repeatedly reported "restarted" while Docker was blocked on WSL. The event log showed:
- two Fast Startup cycles, at 15:55 (SlideToShutDown power off) and 18:05, each with Kernel-Boot 27 "boot type 0x1";
- the last real boot at 2026-10-07 12:34;
- WSL never installed: no `C:\Program Files\WSL`, no WSL appx, no WslService, no MsiInstaller or Setup events;
- vmcompute and hns running, so Virtual Machine Platform was already on.

Fixed the same evening. At Paul's "you do this for me", Claude ran `wsl --install --no-distribution` through an elevated `Start-Process -Verb RunAs`, and Paul clicked the UAC prompt. That installed WSL 3.0.1 in 40 s with no reboot needed, because VMP was already on. Docker Desktop 4.95.0 is a per-user install at `%LOCALAPPDATA%\Programs\DockerDesktop\Docker Desktop.exe`, not Program Files. Its engine came up within 4 min of starting.

2026-10-13 00:39: Docker "crashed". The cause was Docker Desktop's Resource Saver: it stopped the idle VM at 00:28, then waking it failed with `Wsl/Service/CreateInstance/CreateVm/ERROR_TIMEOUT`. The fix was `wsl --shutdown` plus a Docker Desktop restart. Claude then set `UseResourceSaver: false` in `%APPDATA%\Docker\settings-store.json` (backup `.bak-20261013`) and wrote `%USERPROFILE%\.wslconfig` (memory=12GB, processors=6, swap=8GB, autoMemoryReclaim=dropCache). Agent briefs must forbid broad kills (`taskkill` by image name): a lander killed unrelated python processes that night.

**Why:** a restart claim plus a still-failing tool cost several turns. The cause was both a non-reboot and a missing install, and only the event log separates the two.

**How to apply:**
- When Paul says the machine restarted, check `Get-WinEvent System Id 27,1074` (0x0 = cold boot, 0x1 = Fast Startup, 0x2 = hibernate resume) and the install artifacts.
- Tell Paul plainly which piece is missing.
- System installs (WSL, features) need Paul's admin shell, not Claude's.

Related: `deployment-lane-2026-10-11`, `lg-gram-npu-crash-2026-08-17`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-13 from the Claude Code memory file `fast-startup-restart-check-2026-10-12.md` of project `melange-systems` (memory type: reference). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
