---
type: topic
title: "Workstation stability incidents"
aliases: ["Workstation stability incidents"]
category: "incident"
status: "completed"
people:
  - "paul-goff"
actors:
  - "[[claude-code-harness]]"
  - "[[lg-gram-workstation]]"
objective: "Record and resolve the recurring stability faults of Paul's LG Gram 17Z90UB: the Intel NPU driver BSOD loop (fixed 2026-08-17), the later unexplained Kernel-Power 41 shutdowns, the AppXSvc commit leak caused by the Python Install Manager update loop (fixed 2026-09-23), the ChatGPT/Codex (OpenAI.Codex MSIX) crash loop (root cause: oversized Codex sessions), and the poppler install that enables PDF rendering."
created_at: 2026-07-25
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/appxsvc-leak-pythonmanager-2026-09-23.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\appxsvc-leak-pythonmanager-2026-09-23.md", sha256: "cd04369fc08de4a2305dc131cad4d7e347064961c01bedb2ee8d3e6d1500237e"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/lg-gram-npu-crash-2026-08-17.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\lg-gram-npu-crash-2026-08-17.md", sha256: "d1025cb345b865d40de768fe30aa2be4375604e14c36ca41e3fbf46a3054792a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/chatgpt-msix-repair-2026-07-25.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\chatgpt-msix-repair-2026-07-25.md", sha256: "3d31cc7adeb6be1cf8c6944c478219a33329e000a379fdd5b8154233f044ca1d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/poppler-pdf-rendering-2026-08-14.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\poppler-pdf-rendering-2026-08-14.md", sha256: "e942409d24967882652dde7f0601b0b648ec9884d80fee408ea21b7d5598b581"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/python312-wmi-crash-0xc000070a-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\python312-wmi-crash-0xc000070a-2026-10-07.md", sha256: "89965bea62f825232cc3f16c3aa2e93ab588d1463c5f5512919386837c268b57"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/never-stress-test-the-machine-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\never-stress-test-the-machine-2026-10-07.md", sha256: "606ca425d6bfae731a657f2925646be27844dff01a0c67e8a6640b76b2e40bfb"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/orphaned-grep-slowdown-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\orphaned-grep-slowdown-2026-10-09.md", sha256: "ce1da5ceb0c351258265b0125f2cd4697e3321c9a6579eea4502c0d5e0876bb3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fast-startup-restart-check-2026-10-12.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fast-startup-restart-check-2026-10-12.md", sha256: "312a0799608e1027f0bf5366c49e9a0f157918eedf999b387a1816fd2ef0bd5d"}
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/topic", "status/completed", "domain/infra", "category/incident"]
---

# Workstation stability incidents

> Four incidents on the LG Gram workstation, July to September 2026: the Intel NPU driver BSOD loop, the AppXSvc commit leak from the Python Install Manager update-on-launch loop, the ChatGPT/Codex MSIX servicing wedge (really an oversized-session kill), and the per-user poppler install. The NPU loop, the AppXSvc leak and the Codex loop have recorded fixes; the post-NPU Kernel-Power 41 shutdowns remain an open class (owner-only steps listed below).

## Context

- Machine: the LG Gram 17Z90UB (Panther Lake, Windows 11 25H2 build 26200), actor [[lg-gram-workstation]]; owner Paul Goff. Session harness effects (PATH capture, Codex MCP lane) touch the [[claude-code-harness]].
- Status field is `completed` because each incident below has a recorded fix or workaround; the Kernel-Power class (2026-09-19 update) and the already-leaked AppXSvc commit (returned only by a reboot) are open follow-ups and are listed in Next Steps.
- Related memory notes (not vault entities): `melange-redesign-build-lane-2026-09-22`, `disk-cleanup-lane-2026-09-16`, `weekly-refresh-self-sufficiency-audit-2026-09-19`, `codex-executor-lane-2026-07-18`, `legfix4-residue-closeout-2026-07-25`, `live-tree-branch-state-2026-07-14`, `project-brain-toolkit-2026-08-11`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[claude-code-harness]] | Harness traps: MEMORY.md loading contract, heredoc mangling, SendMessage duplicates, GateGuard amend block, poppler PATH. |
| [[lg-gram-workstation]] | Paul's LG Gram 17Z90UB Windows 11 laptop: NPU BSODs, AppXSvc leak, Codex MSIX loop, C: disk exhaustion, OneDrive/Carbonite gaps |

## History

| Date | Event |
|---|---|
| 2026-07-12 | `OpenAI.Codex` package files at the 07-12 vintage (~9,400 files stayed here after the partial update); Codex sandbox accounts `CodexSandboxOffline`/`CodexSandboxOnline` (SIDs ...-1003/-1004) created. |
| 2026-07-23 | Unrelated older crash: 0x14F PDC_WATCHDOG. |
| 2026-07-24 | ChatGPT/Codex auto-update failed at 11:50 AM, 1:51 PM, 11:40 PM (`0x80073D02`, `OpenAI.Codex_26.715.10079.0` resident process). |
| 2026-07-25 | Update failed again 4:53 AM (4th failure); package flagged `Modified, NeedsRemediation`; app ran until 7:42:56 PM when an app-initiated `RegisterByPackageFamilyName ... ForceTargetApplicationShutdown` started the repair loop; fixed by forced msstore reinstall. |
| 2026-07-26 | Repeated re-flags (7:57 PM fix -> 11:06 PM, 11:57 PM fix -> 12:07 AM, 12:14 AM fix -> 12:15:25 AM; proven fix 12:20 AM; flagged again by 12:22 PM; 1:02 PM; 13:16, 13:19, 13:22, 13:28 kills); trigger identified 13:47 by Paul: oversized session; 19:23 recurrence at 16.07 MB. |
| 2026-07-27 | Unrelated older crash: 0xF5 FLTMGR (the 07-27 date as recorded). |
| 2026-07-28 | First of 23 Kernel-Power 41 events (range 2026-07-28..2026-09-15). |
| 2026-08-02 | `Kernel-Boot 29` failed fast startup 0xC0000411 (first of six: 08-02, 08-20, 08-31, 09-04, 09-08, 09-11). |
| 2026-08-11 to 2026-08-12 | NPU 141 storm begins the night of 08-11 to 08-12, same window as Aug-2026 cumulatives KB5123304 (08-11), KB5121003 + KB5120708 (08-12). |
| 2026-08-14 | poppler 25.07.0 installed per-user via winget. |
| 2026-08-16 23:46 (11:46 PM) to 2026-08-17 01:39 | Three 0x10E BSODs (08-16 11:46 PM, 08-17 1:36 AM + 1:39 AM). |
| 2026-08-17 | 01:45 diagnosis; 01:49 NPU disabled via pnputil (loop stopped); 01:58 driver 32.0.100.4841 installed; 02:16 Sentinel daemon live; 02:19 `C:\Windows\MEMORY.DMP` deleted (31.5 GB). |
| 2026-08-28 | Codex size-kill recurrence; 15 idle rollouts archived (about 23:10). |
| 2026-08-29 | `CodexSessionSentinel` installed. |
| 2026-09-04 | Crash dumps broken from here (17 x `volmgr 49`). |
| 2026-09-13 | AppXSvc commit at 67.6 GB (`MemoryError` in a smoke run). |
| 2026-09-19 | NPU-fix follow-up forensics: shutdowns are a different class now (see below); AppXSvc at 50 GB again three days after a reboot. |
| 2026-09-23 01:5x | AppXSvc 48 GB; root cause found and fixed (Python Install Manager auto-update removed). |
| 2026-09-12 to 2026-10-07 | Python 3.12 0xC000070A deaths (Incident 5): first seen 09-12; 166 in the 14 days before 10-06 (90 on 10-01); 52 on the night of 10-06/07. 2026-10-07: diagnosed (WMI query timeout, about 70%), FIX A (sitecustomize in both 3.12 bases) applied on Paul's approval, and Paul banned stress tests. |
| 2026-10-09 | An orphaned recursive grep (pid 32840, 225 GB read) slowed the 14:06 Mentat anchor build to 266 s while the laptop ran on battery; killed about 15:05 on Paul's word, with four idle orphaned grep filters (Incident 6). |

## Decisions

- NPU: disable the Intel NPU device as a stopgap, then install the updated driver, NOT touch the graphics driver (diagnosis: `npu_kmd.sys`, not `iigd_dch`).
- Sentinel daemon (Paul-ratified with consent-gate amendment): updates commit ONLY after sha256 verify AND Paul clicks Yes on a WScript popup (No = permanent decline via `declined_utc`; timeout 120 s = re-ask next run) - Paul's explicit protection-layer ruling.
- MEMORY.DMP deletion was Paul-requested (31.5 GB recovered, glassbox receipt emitted).
- AppXSvc: Paul: "I give you full permission to do whatever you need" - the assistant removed the Python Install Manager's auto-update settings (non-elevated). Consequence accepted: the manager no longer auto-updates from python.org; update manually if wanted.
- ChatGPT/Codex: re-register and `Reset-AppxPackage` are not fixes; forced msstore reinstall is the only package-state clear; the durable cure is keeping Codex sessions small. Paul ratified the sentinel install (2026-08-29: "install the sentinel task") and "fix as you see fit" for the 2026-08-28 archive (Paul out); working rule: archive >= 12 MB AND idle > 60 min; do NOT yank a lane's live session.
- ~~"The package/RestartManager/stale-bin/OneDrive-handle theories are the cause of the Codex crash loop"~~ (2026-07-25 and 2026-07-26 notes) - superseded 2026-07-26 13:47 by Paul's finding that an oversized session is the trigger (see Codex section for each retired theory).
- ~~"Threshold ~37 MB (one bad file)"~~ (2026-07-26 13:47) - refined 2026-07-26 19:23: it is SIZE, threshold about 16 MB (healthy sessions well under ~10 MB).
- ~~"The NPU fix ended the unexpected shutdowns"~~ (2026-08-17) - superseded 2026-09-19: 12 Kernel-Power 41 events since 2026-09-01 are a different class.
- Pagefile: leave system-managed. Never loop-restart AppXSvc.
- Python 3.12 0xC000070A (2026-10-07, Paul approved): FIX A, `Lib\sitecustomize.py` disabling `platform._wmi_query` in both 3.12 bases; re-apply after a Codex runtime update. Never stress test the machine (Paul, 2026-10-07): diagnose crashes from logs and code only.
- Orphaned processes (2026-10-09): ask Paul before killing a process that is not yours; he approved killing the orphaned grep processes of 2026-10-09.

## Next Steps

- [ ] Owner-only for the shutdown class (elevated / system settings, the assistant does not perform): small-memory-dump + pagefile check; `powercfg /sleepstudy`; turn off Fast Startup; BIOS/EC past P3ZK3080 (2026-01-22) + chipset/Wi-Fi; SSD SMART.
- [ ] Ask Paul whether he holds the power button on a hung machine (9 of 23 events carry `LongPowerButtonPressDetected=true`).
- [ ] Bump `ignoreBeforeUtc` (2026-08-17T05:58:44Z) in the sentinel `state.json` whenever a new NPU driver is applied.
- [ ] Reboot to reclaim AppXSvc's already-leaked commit; if AppXSvc commit climbs again read the event 603 package name first.
- [ ] Clean up `%LOCALAPPDATA%\OpenAI\Codex\bin.stale-20260726` and `runtimes.stale-20260726`.
- [ ] Hygiene (optional): exclude `~\.codex` and `%LOCALAPPDATA%\OpenAI\Codex` from Carbonite.
- [ ] Decide the durable executor-lane fix (have `codex-mcp.cmd` copy the selected bin dir to a private path, or use a standalone CLI install) - Paul's call.
- [ ] Fix OneDrive's handle leak (3,250,191 handles in 13.5 h) - a real bug independent of the Codex loop.
- [ ] Extend SystemSentinel to watch Kernel-Power 41, EventLog 6008, WHEA 17, volmgr 49, Kernel-Boot 29 (it only watches WER 1001 / LiveKernelEvents / `npu_kmd`).

## Incident 1: LG Gram NPU BSOD loop (2026-08-17; file `lg-gram-npu-crash-2026-08-17`)

2026-08-17 ~1:45 AM: Paul's laptop (LG Gram 17Z90UB, Panther Lake, Win 11 25H2 build 26200) blue-screened 3x in 2 hours (8/16 11:46 PM, 8/17 1:36 + 1:39 AM), all **0x10E VIDEO_MEMORY_MANAGEMENT_INTERNAL**, bucket `0x10e_37_dxgmms2!VIDMM_GLOBAL::EnsureLockedPages`.

- Root cause chain: Intel NPU driver `npu_kmd.sys` 32.0.100.4512 (Dec 2025, `oem192.inf`, PCI `DEV_B03E`) hangs -> LiveKernelEvent 141 buckets `LKD_0x141_Tdr:C_IMAGE_npu_kmd.sys` -> repeated hangs wedge the video memory manager -> fatal 0x10E. NOT the graphics driver (`iigd_dch` 32.0.101.8356 innocent). Trigger = Copilot+ background AI workloads (WSAIFabricSvc / WorkloadsSessionHost / mscopilot) dispatching to the NPU right after boot and overnight. The 141 storm began the night of 8/11 to 8/12, the same window the Aug-2026 cumulatives (KB5123304 8/11, KB5121003 + KB5120708 8/12) staged/installed - correlation noted, not proven. KB5120102 auto-removed 1:11 AM (CbsTask), did not help.
- Fix path given to Paul: (1) stopgap - disable "Intel(R) NPU" device in Device Manager (instance `PCI\VEN_8086&DEV_B03E&SUBSYS_05741854&REV_08\3&11583659&1&58`), reversible, kills the crash loop; (2) real fix - update Intel NPU driver (Intel download id 794734 "Intel NPU Driver - Windows" or LG Update & Recovery), then re-enable. Older 32.0.100.4509 also in DriverStore as rollback option.
- RESOLUTION 01:49 AM: NPU disabled via pnputil (UAC-approved) - loop stopped. PERMANENT FIX 01:58 AM: **Intel NPU driver 32.0.100.4841 installed** (`npu_win_32.0.100.4841.exe` from `downloadmirror.intel.com/925412/`, SHA256 `C0D17D3B...7444C9` verified against Intel's published hash), NPU re-enabled, Status OK, `oem136.inf`. Clean under live Copilot+ AI workload afterward (old driver hung within 2-5 min). If hangs return: disable again with `pnputil /disable-device "<instance above>"` from an admin shell.
- Stability: 4841 ran >10 min under live Copilot+ workload with ZERO hang events (old driver died in 2-5 min under the same load) - fix verified.
- SENTINEL DAEMON LIVE 02:16 AM (Paul-ratified with consent-gate amendment): scheduled task `ClaudeSystemSentinel`, elevated (RunLevel Highest, no UAC at runtime), triggers = at logon + every 30 min; lives in `~\.claude\sentinel\` (`sentinel.ps1`, `state.json`, `manifest.json`, `staged\`, `sentinel.log`). Behavior: detects bugchecks + LiveKernelEvents; AUTO-disables NPU on >= 2 `npu_kmd` hangs/60 min (floored by state `ignoreBeforeUtc=2026-08-17T05:58:44Z` - **bump this whenever a new NPU driver is applied** or stale hangs re-trigger); updates commit ONLY after sha256 verify AND Paul clicks Yes on a WScript popup (No = permanent decline via `declined_utc`; timeout 120 s = re-ask next run) - Paul's explicit protection-layer ruling. Everything emits to glassbox events, source=`system-sentinel`. Manifest seeded with the 4841 receipt; installer archived in `staged\`. Self-test (`-SelfTest` flag, 7-day lookback, dry-run) PASSED against the real crash data; false-positive guard caught in testing (pre-fix hangs inside the 60-min window would have re-disabled the healthy NPU - hence `ignoreBeforeUtc`). First real run: clean heartbeat, NPU stayed enabled, no popup with nothing staged. To stage a future update: add `{id, path, sha256, args}` to `manifest.json` `updates[]`.
- Unrelated older crashes: 7/23 0x14F PDC_WATCHDOG, 7/27 0xF5 FLTMGR - different signatures, do not conflate. `C:\Windows\MEMORY.DMP` DELETED 02:19 AM Paul-requested (31.5 GB recovered, glassbox receipt emitted); minidumps retained in `C:\Windows\Minidump`. WER `Report.wer` files under ReportArchive need admin to read; the same buckets are in the Application log (provider "Windows Error Reporting", id 1001).

### Update 2026-09-19 (newest): the NPU fix did NOT end the shutdowns; they are a different class now

Read-only forensics (Paul: "Investigate independently"; counts re-verified by the assistant from the System log):

- 23 Kernel-Power 41 events 07-28..09-15, TWELVE since 09-01. Only 3 are bugchecks (0x10E, all on/before 08-17 = the NPU era). 10 died MID POWER-TRANSITION (`SleepInProgress` nonzero; six `Kernel-Boot 29` "failed fast startup 0xC0000411" on 08-02/08-20/08-31/09-04/09-08/09-11), 9 carry `LongPowerButtonPressDetected=true` (a forced power-off - ASK PAUL whether he holds the button on a hung machine; it reclassifies 9 of 23 either way), 1 plain hang/power loss.
- Ranked causes: (1) Modern Standby / Fast Startup transition failure (S3 unavailable on this box); (2) marginal PCIe link to the boot NVMe - 59 CORRECTED `WHEA-Logger 17` errors, all on root port 0:6.0 (parent of the only NVMe), accelerating (~19 in Aug, ~40 in Sep 1-19), weak per-crash correlation; (3) Intel Wi-Fi in connected standby. NOT thermal, NOT battery exhaustion, NOT heavy jobs (0 Glass Box events in the last 5 min before any crash).
- CRASH DUMPS ARE BROKEN since 2026-09-04: 17 x `volmgr 49` (pagefile config for crash dump failed), no `MEMORY.DMP`, empty Minidump - so "not a bugcheck" is unprovable after that date.
- SystemSentinel watches the WRONG log: it queries WER 1001 / LiveKernelEvents / `npu_kmd` only, never Kernel-Power 41, EventLog 6008, WHEA 17, volmgr 49 or Kernel-Boot 29, so its `bugchecks=0` is true and uninformative; its NPU version advisory can never fire (installed == threshold 32.0.100.4841).
- Owner-only next steps (elevated / system settings - not performed by the assistant): small-memory-dump + pagefile check; `powercfg /sleepstudy`; turn off Fast Startup; BIOS/EC past P3ZK3080 (2026-01-22) + chipset/Wi-Fi; SSD SMART. Evidence: session scratchpad `crash_forensics\` (`kernelpower41_full.json`, `crash_timeline_realtime.csv`, `whea_logger.csv`).
- Consequence for the project: unattended jobs need CHECKPOINTS (see the Refresh automation reliability topic and `weekly-refresh-self-sufficiency-audit-2026-09-19`).

## Incident 2: AppXSvc commit leak from the Python Install Manager (2026-09-23; file `appxsvc-leak-pythonmanager-2026-09-23`)

2026-09-23 01:5x (session 5ab381bb). AppXSvc (svchost, PID 8568 that day) had grown to 48 GB of commit, which Windows backs by growing the system-managed pagefile onto C: (C: fell to 0.4 GB free once; commit limit 63 -> 95 GB). Recurrence series: 67 GB 09-13, 50 GB 09-19, 48 GB 09-23.

- Cause (measured): `Microsoft-Windows-AppXDeploymentServer/Operational` showed event 603 "Started deployment UpdateUsingAppInstallerOperation ... `PythonSoftwareFoundation.PythonManager_26.3.240.0_x64__3847v3x7pw1km`" 2,961 times in 52 minutes (~2/second). The Python Install Manager MSIX is side-loaded from an `.appinstaller` with an update check on every activation, and each activation of one of its aliases (`python3`, the WindowsApps `py`/`pymanager`, `%LOCALAPPDATA%\Python\bin\python.exe`) started an update operation that leaked. The builders' heavy python/node activity drove the rate. `python` itself resolves first to `%LOCALAPPDATA%\Programs\Python\Python312\python.exe` (not the alias), `python3` to the WindowsApps alias.
- Fix applied (Paul: "I give you full permission to do whatever you need"): `Remove-AppxPackageAutoUpdateSettings -PackageFamilyName PythonSoftwareFoundation.PythonManager_3847v3x7pw1km` (non-elevated works). Event 603 rate went to 0 and AppXSvc commit stayed flat. Consequence: the Python Install Manager no longer auto-updates from python.org; update it manually if wanted.
- What does NOT work: `Restart-Service` / `Stop-Service` AppXSvc even elevated (error 1051 while WSAIFabricSvc "Windows AI Components Host" depends on it; with that stopped, still "cannot be stopped"); `taskkill /F` on its svchost = Access denied (protected). The already-leaked commit is returned ONLY by a reboot.
- How to apply: if AppXSvc commit climbs again, read that log's event 603 package name first; remove that package's auto-update settings; plan a reboot to reclaim memory. Never loop-restart the service.
- Related: `melange-redesign-build-lane-2026-09-22`, `disk-cleanup-lane-2026-09-16`, `lg-gram-npu-crash-2026-08-17`.

## Incident 3: ChatGPT/Codex MSIX wedge (2026-07-25 to 2026-08-29; file `chatgpt-msix-repair-2026-07-25`)

Paul's Start-menu "ChatGPT" IS the MSIX package `OpenAI.Codex` (AppID `OpenAI.Codex_2p2nqsd0c76g0!App`, Store id `9PLM9XGG6VKS`). There is no separate ChatGPT desktop install on this box.

### 2026-07-25: partial MSIX update

- App would not open. Root cause = a **partial MSIX update**. Auto-update failed 4x (7/24 11:50 AM, 7/24 1:51 PM, 7/24 11:40 PM, 7/25 4:53 AM) with `0x80073D02: Unable to install because the following apps need to be closed OpenAI.Codex_26.715.10079.0` - a resident OLD-version process blocked the file swap. Only 118 of 9,547 files got replaced; the other ~9,400 stayed at the 07-12 vintage. Package then read version 26.721.4979.0 with mismatched hashes -> `Modified, NeedsRemediation`.
- The flag can sit dormant for hours: set at 4:53 AM, but the app kept running off already-registered files until 7:42:56 PM, when an app-initiated `RegisterByPackageFamilyName ... ForceTargetApplicationShutdown` fired and started a repair loop that killed every launch. "It worked 30 minutes ago" does NOT rule out a hours-old package fault.
- What does NOT work (both tried, both reported success, flag returned immediately): `Add-AppxPackage -Register AppxManifest.xml` re-registers the SAME wrong files, cannot fix a content mismatch; `Reset-AppxPackage` resets app data only, does not re-acquire the payload, and DOES wipe `%LOCALAPPDATA%\Packages\OpenAI.Codex_2p2nqsd0c76g0` (~350 MB) - costs data for nothing; waiting for the Store is useless (the manifest claims the new version, so `winget upgrade` does NOT list ChatGPT - Windows believes it is current and never re-downloads).
- What works (non-destructive, no uninstall): `winget install --id 9PLM9XGG6VKS --source msstore --accept-package-agreements --accept-source-agreements --force` - restored all 9,540 files, status -> `Ok`, app launched and stayed up.
- Data split when repairing: `~\.codex` (~1.7 GB: `auth.json`/login, `config.toml`, sessions, memories, skills, logs + state sqlite) lives OUTSIDE the package and survives everything. Only `%LOCALAPPDATA%\Packages\OpenAI.Codex_2p2nqsd0c76g0` (Electron/webview caches) is at risk - back it up with robocopy before any reset.
- Recurrence risk: the old version stayed resident across all four update windows. If the Codex executor lane keeps app instances alive, the next release wedges the same way. Fully close ChatGPT when an update is pending.

### 2026-07-26 "true root cause" theory for the "keeps crashing / needs restore" loop (RETIRED)

- ~~It was NOT the package: the poison lives outside it, the app-managed CLI extraction `%LOCALAPPDATA%\OpenAI\Codex\bin` + `\runtimes`, stale from the 4:53 AM failed update and held locked by the MCP-lane `codex.exe mcp-server` that every Claude session spawns via `~\.codex\bin\codex-mcp.cmd`.~~ winget reinstall alone re-broke three times in one night (7:57 PM fix -> re-flagged 11:06 PM; 11:57 PM fix -> 12:07 AM; 12:14 AM fix -> 12:15:25 AM); no log showed file corruption (AppxPackaging clean, Defender clean). Proposed mechanism: the app's post-launch primary-runtime-update task (`primary-runtime-update-jitter-ms` in `~\.codex\.codex-global-state.json`) hits the stale/locked dir, concludes its install is broken, flags its own package `Modified, NeedsRemediation` (machine-level; child spawns fail with 0x3CFC "error checking machine-level package status", AppModel-Runtime event 6), app dies ~30-90 s after launch, its Restore dialog does a full RuntimeBroker REMOVE + interactive 738 MB Store re-download, same stale dir still there -> loop. Secondary (real, not primary): during actual servicing ops RestartManager cannot shut down the alias-less CLI process -> event 10010 "Application SID does not match Conductor SID" + "Machine restart is required" -> op aborts half-done (11:30 PM pid 1916 in-package, 11:58 PM + 12:07 AM pid 12056 MCP-lane).
- The fix sequence proven 12:20 AM (all steps in order): (1) kill ALL `codex.exe` + `ChatGPT` processes; (2) rename `%LOCALAPPDATA%\OpenAI\Codex\bin` and `\runtimes` aside (e.g. `bin.stale-YYYYMMDD`, reversible; `~\.codex` auth/sessions never touched); (3) `winget install --id 9PLM9XGG6VKS --source msstore --force --accept-package-agreements --accept-source-agreements`; (4) launch - the app re-extracts bin+runtimes fresh within seconds (that re-extract SUCCEEDING is the tell) - and verify >6 min alive, Status `Ok`, app-server child spawned, zero 10010/event-6. Verified: survived 7+ min incl. an in-package `codex.exe app-server` spawn that had failed 5x before.

### 2026-07-26 midday correction: stale-bin theory NOT the whole story

After the 00:20 clean repair the app ran ~12 h, then was flagged again by 12:22 PM. Hard evidence:

- Nothing is actually corrupted: package dir had exactly **9,547 files / 1,858 MB** (the healthy baseline) with zero files modified since install; package-root ACLs normal with **0 deny ACEs**; Codex sandbox `deny_read_acl_state.json` = `{"principals":{}}` (empty); the app's own `logs_2.sqlite` shows only routine skills/plugins WARNs. So `Modified, NeedsRemediation` here is a **stale machine-level status latch, not file damage** - which is why the 738 MB "Restore" never helps.
- The flag flips with ZERO deployment activity: `Get-WinEvent -FilterHashtable` over the whole 12 h window returned **0** AppXDeploymentServer events for OpenAI (log verified NOT rolled - retains back to 07/21). The AppModel-Runtime tell is event 6 `0x3CFC` "error checking **machine-level** package status".
- `Add-AppxPackage -Register` still reports OK and the flag survives it. **Only `winget --force` msstore reinstall clears it** (then 3 for 3).
- **`CarboniteService.exe` is a RED HERRING - do not chase it.** It drives the RestartManager 10010 storm (every 10-30 min, all day) because it backs up `~\.codex` incl. live SQLite (`memories_1.sqlite-shm/-wal`) and calls RM only to *name* the lock-holder (`RmGetList`) - 4 busy files all day, it never terminates anything. The 10010 "Application SID does not match Conductor SID" is benign backup noise. (Still worth excluding `~\.codex` + `%LOCALAPPDATA%\OpenAI\Codex` from Carbonite as hygiene - 1.7 GB of live DBs + 670 MB of re-downloadable binaries do not belong in cloud backup.)
- A watcher was armed to catch the flip: `scratchpad\capture-codex-flip.ps1` + a persistent Monitor polling `(Get-AppxPackage -Name OpenAI.Codex).Status` every 60 s (and later `scratchpad\watch-codex-flip.ps1`, polls status 4 s; on flip dumps package files modified in the last 6 min, total file count, live codex/ChatGPT cmdlines, deployment events, sandbox-log tail). READ ITS CAPTURE before theorizing again - three theories died for lack of it.
- Untested prime suspect then: the MCP lane keeps a `codex.exe` alive ~24/7 (one per Claude session). Candidate durable fix (NOT applied - touches Paul's executor lane, needs his call): have `codex-mcp.cmd` COPY the selected bin dir to a private path and run from the copy.

### 2026-07-26 13:00-13:15 session: corrections + what is PROVEN

- Two earlier theories were WRONG and are retired: (a) RestartManager 10010 "SID does not match Conductor SID" is Carbonite's RmGetList only; (b) "stale locked %LOCALAPPDATA%\OpenAI\Codex\bin" is NOT the cause - bin+runtimes renamed aside, reinstalled, and it re-flagged twice more (12:21 PM, 1:02 PM).
- The MCP/CLI executor lane is UNAFFECTED: a real sandboxed command through `mcp__codex__codex` at 13:10 with status Ok: command succeeded, status stayed `Ok`, package file count 9547 unchanged, package-root SDDL byte-identical. Paul's Melange automation lane neither causes nor is broken by this bug.
- The GUI app and the CLI use DIFFERENT sandbox-setup spawn paths (sandbox log, `setup refresh: spawning ...`): GUI = `C:\Program Files\WindowsApps\OpenAI.Codex_*\app\resources\codex-windows-sandbox-setup.exe` with cwd INSIDE the package; CLI/MCP = `%LOCALAPPDATA%\OpenAI\Codex\bin\<hash>\codex-windows-sandbox-setup.exe`. Only the GUI spawns package-identity binaries per command.
- Causal order re-read: "crashes the second I execute a command" = SYMPTOM, not trigger. The flag flips first (silently, no deployment event); then the next command execution spawns a package binary, which fails with AppModel-Runtime event 6 `0x3CFC` "Cannot create the process for package <NULL> ... error checking machine-level package status" (fires 5x: 12:21:13 PM and 1:02:41 PM), and the app dies. Sandbox log shows commands SUCCEEDING right up to the flip (13:02:12/19/27/30/38 all SUCCESS, dead at 13:02:41).
- Codex's elevated Windows sandbox (`[windows] sandbox = "elevated"`) runs commands under real local accounts `CodexSandboxOffline`/`CodexSandboxOnline` (SIDs ...-1003/-1004, created 07-12). `CodexSandboxOffline` LastLogon tracks the last command exactly. Security-log logon auditing is OFF, so cross-user logon detail is unavailable without enabling it.
- Store has NO newer build: `--force` reinstall pulls the same 26.721.4979.0 (07-21), while the internal runtime updater has moved the CLI to 0.146.0-alpha.3.1 (07-26) - a standing app-vs-runtime version skew.
- Benign/longstanding noise, not the bug: `hide users: failed to hide current user profile dir (C:\Users\Default): Access is denied` on every command.

### 2026-07-26 afternoon: theories 4 and 5 also dead

- (4) OneDrive handle leak: NOT the cause. OneDrive had leaked 3,250,191 handles in 13.5 h (460x the next process; total system 3,404,006; paged pool 1.29 GB) - a real bug worth fixing, and restarting OneDrive dropped the system to 154,878 handles. The app still died 79 s after the next launch with handles at ~1,178. Resource exhaustion is NOT the trigger.
- (5) StateRepository `Error 0x15: misuse at line 185353` - chronic noise, not correlated: fires every ~10-30 min for 24 h+ through healthy periods, and there was NO such error at the 13:16 or 13:28 crashes.
- The app's OWN structured log (`~\.codex\logs_2.sqlite`, table `logs`, 175 k rows, cols ts/ts_nanos/level/target/feedback_log_body/file/line; query read-only with python from a COPY incl. -wal) shows the app working normally right up to the kill - mid-turn streaming `op.dispatch.user_input` at 13:28:35.9, killed 13:28:38, zero errors of its own. It is stopped externally; it does not crash.
- Event 6's real payload: `PackageFullName=<NULL>`, `ErrorCode=15612` (0x3CFC) - the generic MSIX "needs remediation, reinstall" spawn block. Downstream of the status, never the cause.
- Correlation observed BOTH directions: package stays `Ok` indefinitely while the app is CLOSED; goes bad 20-90 s after the app is LAUNCHED. Timings: launch 13:15 -> dead 13:16:31 (75 s); 13:18 -> 13:19:34 (74 s); 13:22 -> 13:22:49 (22 s); 13:27 -> 13:28:38 (79 s).
- Beware: a flip back to `Ok` with no action from Claude is Paul clicking Restore (Register/Stage events at 13:30:55-13:31:39) - check deployment events before calling anything self-healing.
- `C:\Program Files\WindowsApps` and `C:\ProgramData\Microsoft\Windows\AppRepository` ACLs are NOT readable without admin (`Get-Acl` -> unauthorized), so sandbox-ACL-tampering there is UNTESTED, not cleared.
- NOT yet run, and THE discriminating experiment then: launch the app and leave it completely idle, no commands (idle-flip => the app alone; survives-idle => command execution/sandbox required). Superseded by the next finding.
- Cleanup owed: `%LOCALAPPDATA%\OpenAI\Codex\bin.stale-20260726` and `runtimes.stale-20260726` (the live `bin` and `runtimes` were correctly re-extracted 07-26 00:20 and all `config.toml` paths resolve).
- Shipped for Paul: `C:\Users\pgoff\fix-codex.ps1` (kill procs -> try re-register -> fall back to winget msstore --force -> relaunch). Confirms re-register alone never clears it.

### 2026-07-26 13:47 - TRIGGER IDENTIFIED BY PAUL: an oversized session, not the package

Paul: "it all has to do with the session, 'this is an audit'". Confirmed by data: the legfix5 audit thread `019f9aac-4de7-7273-9ad2-e7f9720c6242` = `~\.codex\sessions\2026\07\25\rollout-2026-07-25T14-06-56-019f9aac-....jsonl` at **37 MB**, last written 13:47:25 - **4 seconds before** the 13:47:29 flip - and it is the same thread the app's own log caught mid-turn (`op.dispatch.user_input`) when it was killed at 13:28:38. Two independent crashes, same session.

- This retro-explains the "dies 20-90 s after launch" pattern that burned five theories: the app **auto-resumes the last thread on startup**, so every launch reloaded the 37 MB conversation and died once it was live. A 37 MB JSONL conversation expands to GBs once parsed; the app then fails to spawn helper processes and Windows reports the generic 0x3CFC/15612 "reinstall the app" block. Nothing was ever wrong with the MSIX - which is why 9,547 files always verified intact and every reinstall bought only minutes.
- 19:23 recurrence refines this - it is SIZE, not one bad file, and the threshold is ~16 MB not 37 MB: crashed again at 19:23:57 with the 37 MB thread NOT open. The active session was a thread Paul started FRESH that same day at 14:09 (`rollout-2026-07-26T14-09-57-019f9fd5-*.jsonl`) which had grown to **16.07 MB**, written 19:23:55 - 2 s before the kill. Package again 0 files modified / 9547 intact. A fresh session is not a cure by itself: audit work (reading large files into context) regrows a session past the threshold within hours. Sessions confirmed active at kills: 019f9aac/37 MB (13:28, 13:47), 019f9fd5/16 MB (19:23).
- Practical rule: during audit runs start a new thread roughly every couple of hours, watch `~\.codex\sessions` file sizes, and avoid dumping whole large files into the conversation (prefer targeted greps/slices). Re-register cleared it at 13:47 but NOT at 19:23 (needed the full reinstall) - the cheap path is not reliable.
- Other oversized sessions that will likely do the same: `rollout-2026-07-25T12-38-50-019f9a5b-...jsonl` (50.71 MB) and `rollout-2026-07-22T13-01-41-019f8afd-...jsonl` (50.62 MB). Healthy sessions are well under ~10 MB.
- REMEDY: do not reopen the giant thread - start a fresh session for audit work (Paul confirmed "it is working now" after switching). To stop auto-resume permanently, move the rollout file to `~\.codex\archived_sessions` (Paul's data - ask first). Split long audit runs across sessions rather than letting one thread grow past ~10 MB. `fix-codex.ps1` still clears the package state when it does happen - and once the giant session is out of the picture, plain re-register clears it with no 738 MB download.
- PREVENTION: the MCP lane locking the app's self-managed bin dir is a standing conflict - any future app/runtime update while a Claude session is open can re-wedge. Kill stray `codex` processes before app updates or Restore clicks. Durable fix candidates (Paul's call, lane redesign): have `codex-mcp.cmd` COPY the selected bin dir to a private location and run from the copy, or point the lane at a standalone CLI install. Recurrence signature = app dies ~30-90 s after launch + Status `Modified, NeedsRemediation` + AppModel-Runtime event 6 0x3CFC (self-flag path) or RestartManager 10010 naming `codex.exe` (servicing path). Diagnosis shortcuts: `(Get-AppxPackage -Name OpenAI.Codex).Status`; AppXDeploymentServer event 603 XML carries `CallingProcess`; check `%LOCALAPPDATA%\OpenAI\Codex\bin` mtimes - if older than the last app update, the extraction is stale.

### 2026-08-28 recurrence: same size mechanism, offenders archived

Paul reported "keeps crashing" again; package Status was `Ok` the whole time, zero AppModel event-6 / WER entries in 72 h - so these crashes were the pure size-kill, never the package latch. The supervisor-arc batch at 00:36-00:37 that night created FOUR sessions that all grew past threshold (37.17, 19.74, 17.62, 14.09 MB). Fix applied ~23:10 (Paul out, ratified "fix as you see fit"): archived 15 idle rollouts >= 12 MB - including the three July 41-51 MB giants that had sat in the active dir all along - to `~\.codex\archived_sessions` (now 96 files), zero move failures. The 37 MB thread was still OPEN (locked, being appended minutes before - an automation-lane `codex.exe`, likely the g1-ld203 collector in another worktree), so a session Monitor archives it once idle > 60 min; do NOT yank a lane's live session. Working rule: archive >= 12 MB AND idle > 60 min. The auto-mode classifier BLOCKED both the executor-agent dispatch for this fix and writing a sentinel `.ps1` into `~\.codex` (persistence-shaped) - parked in scratchpad.

### 2026-08-29: CodexSessionSentinel installed (user-ratified: Paul "install the sentinel task")

Script `C:\Users\pgoff\.codex\archive-oversized-sessions.ps1`; scheduled task `CodexSessionSentinel` runs it every 30 min as pgoff (no elevation). Archives `*.jsonl` >= 12 MB idle > 60 min from sessions -> `archived_sessions`, moves only, appends one line/run to `~\.codex\session-sentinel.log`, emits a glassbox event only when it moves something. Verified: task Last Result 0 and log line `scanned=0 moved=0` from both the task run and a direct run. Gotcha: a task run can take ~90 s to report (cold powershell under the task engine) - Last Result 267009 (0x41301) just means still running, do not diagnose before ~2 min. Uninstall: `schtasks /Delete /TN CodexSessionSentinel /F`. The 00:36 marathon session was STILL live and growing next day (38.9 MB at 08-29 13:00) - the sentinel sweeps it within ~90 min of its lane finally closing it. Related: `codex-executor-lane-2026-07-18`, `legfix4-residue-closeout-2026-07-25`.

## Incident 4: poppler PDF rendering (2026-08-14; file `poppler-pdf-rendering-2026-08-14`)

poppler 25.07.0 is installed on this box (2026-08-14, spawned-task session): `winget install --id oschwartz10612.Poppler --exact` - per-user portable zip, SHA256-verified by the winget manifest, MIT, VC++ x64 runtime dep was already present so nothing machine-wide changed. Winget put the package's `Library\bin` (under `%LOCALAPPDATA%\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\`) directly on the **user PATH**, exposing `pdftoppm`, `pdftotext`, `pdftocairo`, `pdfinfo` and the rest.

- Why: the Read tool's PDF page rendering shells out to `pdftoppm`; its absence blocked a 5-agent PDF fan-out on 2026-08-14 (PyMuPDF text-extraction workaround loses figures/layout).
- Read on a .pdf works only in Claude Code sessions started AFTER the install - the harness captures PATH at session launch ([[claude-code-harness]]). In a pre-install session the error is still "pdftoppm is not installed"; that is stale session PATH, not a broken install. Verify with a registry-refreshed shell (`$env:PATH = Machine+User from [Environment]::GetEnvironmentVariable`) before concluding anything is wrong.
- "Syntax Error: No display font for 'Symbol'/'ArialUnicode'" on stderr is a cosmetic glyph warning, common on Windows; the page still renders.
- Upgrade: `winget upgrade oschwartz10612.Poppler`. Full revert (files + PATH entry): `winget uninstall oschwartz10612.Poppler`. Winget's pin (25.07.0-0, Aug 2025) may trail the GitHub releases page.
- Related: `live-tree-branch-state-2026-07-14` (this box's multi-lane environment), `project-brain-toolkit-2026-08-11`.

## Incident 5: Python 3.12 dies with 0xC000070A (first seen 2026-09-12; file `python312-wmi-crash-0xc000070a-2026-10-07`; added 2026-10-10)

- **Symptom:** Python 3.12 processes (`C:\Users\pgoff\AppData\Local\Programs\Python\Python312` 3.12.10, and Codex's bundled 3.12.14, which is Terrier's `work\.venv` base) die with 0xC000070A, STATUS_THREADPOOL_HANDLE_EXCEPTION, in ntdll at offset 0xc87a4. That is exit code 3221227274, and stderr is empty. First seen 2026-09-12; 166 in the 14 days before 10-06 (90 on 10-01); 52 on the night of 10-06/07.
- **Diagnosis (about 70%, investigated 2026-10-07):** `import pandas` and `import scipy.stats` call `platform.machine()`, which on 3.12 runs a WMI query in a `_wmi.pyd` helper thread. Under heavy CPU load the query times out (the WMI log shows 0x80041032 cancelled); the abandoned helper later SetEvent/CloseHandle's through a stale pointer (CPython `PC/_wmimodule.cpp`). The process then dies in `random.seed`/`os.urandom` (bcrypt). The exact closed handle is unproven. The 9/9 Windows update may have enabled it. Ruled out: claude-obsidian (Python 3.14, zero crashes), AppXSvc, scheduled tasks. McAfee's DLL is present in all crashes but not in the stacks (low).
- **Victims:** Melange chain steps (`build_media_blend.py`, `build_vote_category.py`; the chain exits 1 with empty stderr), `test_lda_rebuild.py`, and Terrier `run_phase3.py` and its pandas probes.
- **FIX A APPLIED 2026-10-07 (Paul approved):** `Lib\sitecustomize.py` in BOTH 3.12 bases (Python312, and the Codex runtime `...\codex-runtimes\codex-primary-runtime\dependencies\python`), sha256 80b4b9c6...; it covers every venv built on them (Melange `.venv-politico`, Terrier `work\.venv`, `.venv-20261007`, model-study). It sets `platform._wmi_query` to raise OSError, so `platform` falls back to `sys.getwindowsversion()` and `cmd /c ver`; platform values were identical before and after. Only `python -S` skips it (no launcher uses -S). A Codex update can replace its runtime: re-apply by copying the same file to `<new base>\Lib\sitecustomize.py`, then check that `python -c "import platform; print(platform._wmi_query.__name__)"` prints `_wmi_disabled`. Roll back by deleting both files and the .pyc. Evidence: under load, 0/90 crashes patched vs 19/30 bypassed (that stress run happened before Paul banned stress tests; never repeat it). Patch body:

```python
try:
    import platform as _platform
    if hasattr(_platform, "_wmi_query"):
        def _wmi_disabled(*args, **kwargs):
            raise OSError("WMI query disabled by sitecustomize (0xC000070A workaround)")
        _platform._wmi_query = _wmi_disabled
    del _platform
except Exception:
    pass
```

- Not covered: other WMI users (one fastprox.dll 0xc0000409 crash was seen).
- **Why it matters:** a pipeline step that dies with an empty stderr and exit 3221227274 looks like a code bug but isn't.
- **How to apply:** on exit 3221227274, rerun once and reduce concurrent pandas-heavy jobs; don't debug the step's code. A per-process workaround is to set `platform._wmi_query` to raise OSError before importing pandas. A machine-wide fix (sitecustomize in the 3.12 installs) is Paul's call (FIX A above is that fix; Paul approved it on 2026-10-07). Side note: claude-obsidian's python3 hooks take 2.3-6.7 s against a 5 s limit (54 Stop hooks cancelled): harmless noise.
- Related memories: `claude-obsidian-readonly-install-2026-10-06`, `appxsvc-leak-pythonmanager-2026-09-23`, `terrier-multidistrict-lane-2026-10-06`.

### Standing rule from this incident: never stress test the machine (file `never-stress-test-the-machine-2026-10-07`, Paul 2026-10-07)

- Never run stress tests, load tests, launch-loop crash reproductions or any deliberate CPU/RAM load on Paul's machine. Paul, 2026-10-07: "Do not fucking stress test, that was just my computer dying." This came after a session ran `stress.py` (hundreds of back-to-back python launches) to reproduce the 0xC000070A crash while builds were running.
- **Why:** the laptop is already memory- and CPU-starved (often under 4 GB free; see Incident 5 and Incident 1). Extra load makes it die and stalls real work.
- **How to apply:** diagnose crashes from existing logs, crash records (`tools\Get-PythonCrashStats.ps1`, Event Log) and code reading only. When a job crashes, rerun it once; never loop launches to measure crash rates. Don't tell agents to run N-launch crash tests either.

## Incident 6: orphaned recursive grep slows a Mentat anchor build (2026-10-09; file `orphaned-grep-slowdown-2026-10-09`; added 2026-10-10)

- On 2026-10-09 `"C:\Program Files\Git\usr\bin\grep.exe" -rn deploy_lobby_pages --include=* -I .` ran from 11:46 local, as pid 32840. Its parent process was already gone, so it was orphaned, most likely by a session's shell tool call that timed out. By 15:03 it had read 225 GB, used 4,527 CPU-seconds and held 2.7 GB of RAM.
- It overlapped the Mentat anchor build of 14:06. That build took 266 s against the usual 36-73 s. Two stages took 226 s of it: mentat:commercial_banks (127 s) and mentat:telecom (99 s). Each runs SQL over about 1.5 GB of SQLite (a contribution-analytics index plus mentat.db), so it competed with grep for disk and file cache.
- The laptop was also on battery at roughly 20-25% charge. Kernel-Power 105 shows it unplugged at 12:32 and plugged back in at 14:23.
- Paul said "yes, kill it" and the process was killed at about 15:05; it was verified gone. Four other orphaned `grep --line-buffered` pipe filters, started 10-08 13:16, 13:17 and 21:44 and 10-09 02:47, were idle: 0 GB read and 1 MB of RAM each. They were killed on Paul's "kill those four too" and verified gone. Four `tail -f` processes that follow other sessions' task-output files were not touched.
- **Why:** a recursive search started from a broad working directory has no end, and the Bash tool's timeout does not kill the child process. It keeps evicting the file cache and draining the battery for hours.
- **How to apply:** when a build, console or test is unexpectedly slow, first list long-running grep.exe and rg.exe processes. The command is `Get-CimInstance Win32_Process -Filter "Name='grep.exe'"` with CommandLine, ReadTransferCount and the parent. Check Kernel-Power 105 for battery as well. Ask Paul before killing a process that is not yours. Never start `grep -r` or `rg` from a broad folder such as the home directory or `.`, when its location is unknown; give it an explicit path and a timeout. Glass Box events rotate at 5000 entries, so per-stage timings of an older run may already be gone.
- Related memories: `never-stress-test-the-machine-2026-10-07`, `mentat-lda-deadline-rule-2026-10-09` (the anchor build is recorded with the Giving Forecast pipeline).

Update 2026-10-30: On 2026-10-12 the workstation had Fast Startup enabled, so every Shut down route hibernated the kernel and only Start > Power > Restart (or shutdown /r /t 0) was a real reboot; when Paul says the machine restarted, check System events 27 and 1074 (0x0 cold boot, 0x1 Fast Startup, 0x2 hibernate resume) and the install artifacts, since that evening's Docker blocker was both a non-reboot and a missing WSL install, and only the event log separated the two.
