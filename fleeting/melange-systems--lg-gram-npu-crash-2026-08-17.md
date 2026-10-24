---
type: fleeting
title: "Lg gram npu crash (2026-08-17)"
aliases: ["lg-gram-npu-crash-2026-08-17"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "reference"
updates:
  - "[[lg-gram-workstation]]"
  - "[[2026-07-incident-workstation-stability]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/lg-gram-npu-crash-2026-08-17.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\lg-gram-npu-crash-2026-08-17.md", sha256: "d1025cb345b865d40de768fe30aa2be4375604e14c36ca41e3fbf46a3054792a"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Lg gram npu crash (2026-08-17)

> Paul's LG Gram 17Z90UB BSOD loop diagnosed 2026-08-17 — Intel NPU driver (npu_kmd.sys) hangs escalate to 0x10E video-memory bugchecks; fix = update/disable NPU driver, NOT the graphics driver

## Content

**UPDATE 2026-09-19 - THE NPU FIX DID NOT END THE SHUTDOWNS; they are a different class now.** Read-only forensics (Paul: "Investigate independently"; counts re-verified by me from the System log): 23 Kernel-Power 41 events 07-28..09-15, TWELVE since 09-01. Only 3 are bugchecks (0x10E, all on/before 08-17 = the NPU era below). 10 died MID POWER-TRANSITION (`SleepInProgress` nonzero; six `Kernel-Boot 29` "failed fast startup 0xC0000411" on 08-02/08-20/08-31/09-04/09-08/09-11), 9 carry `LongPowerButtonPressDetected=true` (a forced power-off - ASK PAUL whether he holds the button on a hung machine; it reclassifies 9 of 23 either way), 1 plain hang/power loss. Ranked causes: (1) Modern Standby / Fast Startup transition failure (S3 unavailable on this box); (2) marginal PCIe link to the boot NVMe - 59 CORRECTED `WHEA-Logger 17` errors, all on root port 0:6.0 (parent of the only NVMe), accelerating (~19 in Aug, ~40 in Sep 1-19), weak per-crash correlation; (3) Intel Wi-Fi in connected standby. NOT thermal, NOT battery exhaustion, NOT heavy jobs (0 Glass Box events in the last 5 min before any crash). CRASH DUMPS ARE BROKEN since 2026-09-04: 17 x `volmgr 49` (pagefile config for crash dump failed), no MEMORY.DMP, empty Minidump - so "not a bugcheck" is unprovable after that date. SystemSentinel watches the WRONG log: it queries WER 1001 / LiveKernelEvents / `npu_kmd` only, never Kernel-Power 41, EventLog 6008, WHEA 17, volmgr 49 or Kernel-Boot 29, so its `bugchecks=0` is true and uninformative; its NPU version advisory can never fire (installed == threshold 32.0.100.4841). Owner-only next steps (elevated / system settings - I do not perform these): small-memory-dump + pagefile check; `powercfg /sleepstudy`; turn off Fast Startup; BIOS/EC past P3ZK3080 (2026-01-22) + chipset/Wi-Fi; SSD SMART. Evidence: session scratchpad `crash_forensics\` (kernelpower41_full.json, crash_timeline_realtime.csv, whea_logger.csv). Consequence for the project: unattended jobs need CHECKPOINTS - see `weekly-refresh-self-sufficiency-audit-2026-09-19`.

2026-08-17 ~1:45 AM: Paul's laptop (LG Gram 17Z90UB, Panther Lake, Win 11 25H2 build 26200) blue-screened 3x in 2 hours (8/16 11:46 PM, 8/17 1:36 + 1:39 AM), all **0x10E VIDEO_MEMORY_MANAGEMENT_INTERNAL**, bucket `0x10e_37_dxgmms2!VIDMM_GLOBAL::EnsureLockedPages`.

Root cause chain: **Intel NPU driver `npu_kmd.sys` 32.0.100.4512 (Dec 2025, oem192.inf, PCI DEV_B03E)** hangs → LiveKernelEvent 141 buckets `LKD_0x141_Tdr:C_IMAGE_npu_kmd.sys` → repeated hangs wedge the video memory manager → fatal 0x10E. NOT the graphics driver (iigd_dch 32.0.101.8356 was innocent). Trigger = Copilot+ background AI workloads (WSAIFabricSvc / WorkloadsSessionHost / mscopilot) dispatching to the NPU right after boot and overnight. 141 storm began night of 8/11→8/12, same window the Aug-2026 cumulatives (KB5123304 8/11, KB5121003+KB5120708 8/12) staged/installed — correlation noted, not proven. KB5120102 auto-removed 1:11 AM (CbsTask), didn't help.

Fix path given to Paul: (1) stopgap — disable "Intel(R) NPU" device in Device Manager (instance `PCI\VEN_8086&DEV_B03E&SUBSYS_05741854&REV_08\3&11583659&1&58`), reversible, kills the crash loop; (2) real fix — update Intel NPU driver (Intel download id 794734 "Intel NPU Driver – Windows" or LG Update & Recovery), then re-enable. Older 32.0.100.4509 also in DriverStore as rollback option.

RESOLUTION 01:49 AM: NPU disabled via pnputil (UAC-approved) — loop stopped. PERMANENT FIX 01:58 AM: **Intel NPU driver 32.0.100.4841 installed** (npu_win_32.0.100.4841.exe from downloadmirror.intel.com/925412/, SHA256 C0D17D3B…7444C9 verified against Intel's published hash), NPU re-enabled, Status OK, oem136.inf. Clean under live Copilot+ AI workload afterward (old driver hung within 2–5 min). If hangs return: disable again with `pnputil /disable-device "<instance above>"` from admin shell.

Stability: 4841 ran >10 min under live Copilot+ workload with ZERO hang events (old driver died in 2–5 min under same load) — fix verified.

SENTINEL DAEMON **LIVE 02:16 AM** (Paul-ratified with consent-gate amendment): scheduled task `ClaudeSystemSentinel`, elevated (RunLevel Highest, no UAC at runtime), triggers = at logon + every 30 min; lives in `~\.claude\sentinel\` (sentinel.ps1, state.json, manifest.json, staged\, sentinel.log). Behavior: detects bugchecks + LiveKernelEvents; AUTO-disables NPU on ≥2 npu_kmd hangs/60min (floored by state ignoreBeforeUtc=2026-08-17T05:58:44Z — **bump this whenever a new NPU driver is applied** or stale hangs re-trigger); updates commit ONLY after sha256 verify AND Paul clicks Yes on a WScript popup (No = permanent decline via declined_utc; timeout 120s = re-ask next run) — Paul's explicit protection-layer ruling. Everything emits to glassbox events, source=`system-sentinel`. Manifest seeded with the 4841 receipt; installer archived in staged\. Self-test (-SelfTest flag, 7-day lookback, dry-run) PASSED against the real crash data; false-positive guard caught in testing (pre-fix hangs inside the 60-min window would have re-disabled the healthy NPU — hence ignoreBeforeUtc). First real run: clean heartbeat, NPU stayed enabled, no popup with nothing staged. To stage a future update: add {id, path, sha256, args} to manifest.json updates[].

Unrelated older crashes: 7/23 0x14F PDC_WATCHDOG, 7/27 0xF5 FLTMGR — different signatures, don't conflate. C:\Windows\MEMORY.DMP DELETED 02:19 AM Paul-requested (31.5 GB recovered, glassbox receipt emitted); minidumps retained in C:\Windows\Minidump. WER Report.wer files under ReportArchive need admin to read; the same buckets are in the Application log (provider "Windows Error Reporting", id 1001).

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): NPU BSOD fixed;power-offs persist

## Possible Connections

- [[lg-gram-workstation]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-07-incident-workstation-stability]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `lg-gram-npu-crash-2026-08-17.md` of project `melange-systems` (memory type: reference). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[lg-gram-workstation]], [[2026-07-incident-workstation-stability]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
