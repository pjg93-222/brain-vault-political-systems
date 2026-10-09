---
type: fleeting
title: "Orphaned grep slowdown (2026-10-09)"
aliases: ["orphaned-grep-slowdown-2026-10-09"]
source: "session"
captured_at: 2026-10-09
created_at: 2026-10-09
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/orphaned-grep-slowdown-2026-10-09.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\orphaned-grep-slowdown-2026-10-09.md", sha256: "ce1da5ceb0c351258265b0125f2cd4697e3321c9a6579eea4502c0d5e0876bb3"}
updated_at: 2026-10-09
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Orphaned grep slowdown (2026-10-09)

> A grep -r left behind by a session (parent gone) ran 3h17m, read 225 GB and slowed the Mentat anchor build 57 s -> 266 s; killed on Paul's OK. When the machine is slow, look for long-running grep/rg first

## Content

On 2026-10-09 `"C:\Program Files\Git\usr\bin\grep.exe" -rn deploy_lobby_pages --include=* -I .` ran from 11:46 local, as pid 32840. Its parent process was already gone, so it was orphaned, most likely by a session's shell tool call that timed out. By 15:03 it had read 225 GB, used 4,527 CPU-seconds and held 2.7 GB of RAM.

It overlapped the Mentat anchor build of 14:06. That build took 266 s against the usual 36–73 s. Two stages took 226 s of it: mentat:commercial_banks (127 s) and mentat:telecom (99 s). Each runs SQL over about 1.5 GB of SQLite (a contribution-analytics index plus mentat.db), so it competed with grep for disk and file cache.

The laptop was also on battery at roughly 20–25% charge. Kernel-Power 105 shows it unplugged at 12:32 and plugged back in at 14:23.

Paul said "yes, kill it" and the process was killed at about 15:05; it was verified gone. Four other orphaned `grep --line-buffered` pipe filters, started 10-08 13:16, 13:17 and 21:44 and 10-09 02:47, were idle: 0 GB read and 1 MB of RAM each. They were killed on Paul's "kill those four too" and verified gone. Four `tail -f` processes that follow other sessions' task-output files were not touched.

**Why:** a recursive search started from a broad working directory has no end, and the Bash tool's timeout does not kill the child process. It keeps evicting the file cache and draining the battery for hours.

**How to apply:** when a build, console or test is unexpectedly slow, first list long-running grep.exe and rg.exe processes. The command is `Get-CimInstance Win32_Process -Filter "Name='grep.exe'"` with CommandLine, ReadTransferCount and the parent. Check Kernel-Power 105 for battery as well. Ask Paul before killing a process that is not yours. Never start `grep -r` or `rg` from a broad folder such as the home directory or `.`, when its location is unknown; give it an explicit path and a timeout. Glass Box events rotate at 5000 entries, so per-stage timings of an older run may already be gone.

Related: `never-stress-test-the-machine-2026-10-07`, `mentat-lda-deadline-rule-2026-10-09`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `orphaned-grep-slowdown-2026-10-09.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
