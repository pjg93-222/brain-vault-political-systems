---
type: fleeting
title: "Desktop readiness (2026-10-21)"
aliases: ["desktop-readiness-2026-10-21"]
source: "session"
captured_at: 2026-10-21
created_at: 2026-10-21
status: "raw"
promoted_to: ""
project: "workspaces-scratch-2026-10-21-f6eb2f"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-21-f6eb2f/memory/desktop-readiness-2026-10-21.md", type: "claude-memory", synced_at: "2026-10-22", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-21-f6eb2f\\memory\\desktop-readiness-2026-10-21.md", sha256: "0a634a33fcb2a2da62195b7d233c09248b16337cc6336148a83060b5f9fd5944"}
updated_at: 2026-10-22
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop readiness (2026-10-21)

> State of the Melange/Mentat/Terrier desktop rollout after the 2026-10-21 overnight session; artifact paths, PR, data releases, who owns what

## Content

Desktop rollout state at the end of 2026-10-21 (about 02:00Z on 10-22):

- Live tester auth through `https://<tunnel-host>:<port>` proven by a scripted round trip (about 1 s per call). Invite enforcement OFF until testers are on Melange/Mentat 1.0.10+ and Terrier 1.0.13 (Paul's ruling). Flip = set `MELANGE_ACCESS_REQUIRE_INVITE=1`, restart the login supervisor, check `inviteRequired` in listener-status.json; Paul's call.
- Installers verified: Melange 1.0.10, Mentat 1.0.10, Terrier 1.0.13 (signer thumbprint 0EBC9AD04E929CDD731EDB5D278A4143BC3D3D30). Never hand out `desktop-preview-*` prereleases (unsigned).
- Melange and Mentat installers ship no data. Built the GitHub data-release path: builder `ops/desktop/server/tools/data_release.py`, reader `ops/desktop/packaging/data_release_fetch.py` (hook in desktop_backend.py for melange/mentat; env `DESKTOP_DATA_RELEASE[_REPO|_API]`; marker `.melange-data-release.json`; `__state__/` members go to the state root), runbook `ops/desktop/DATA_RELEASES.md`. Data releases published as prereleases: `data-melange-2026-10-21` (5 zips, 3.49 GiB) and `data-mentat-2026-10-21` (218 MB). E2E reader runs passed against both. Installed clients need a new app release to get the reader (Codex lane).
- PR pjg93-222/Melange#41 (branch `publish/desktop-data-release-20261021`, via ReleasePublish filtered route, receipt entry AV) merged 2026-10-22T05:06Z on Paul's go, merge commit b5d28a2fc (origin main). Next: Codex cuts Melange and Mentat app releases from main so installed clients get the data reader. Source worktree `C:\Users\pgoff\Melange-wt\auth-test-20261021`.
- Superseded 05:52Z: Codex's PR #43 removed the first-run downloader from production (empty compiled-plan registry, no switch re-enables it) and hardened extraction (mkstemp temps, no-overwrite hard-link publish, denylist of .html/.js/.py/etc. and `__state__/`). Valid critique: our data release shipped Moneyball.html (HTML+JS dashboard) unsigned from a public repo. Codex's replacement is open PR #40 (signed module data). The two published data releases are consumed by nothing. A 1.0.14 app build from b5d28a2fc was signed but NOT published (contains the removed downloader; `Documents\Desktop-Installers-2026-10-22\dist`, DO NOT PUBLISH). Then on Paul's go (02:45 CDT) Melange 1.0.14 and Mentat 1.0.14 were rebuilt from 0f37ddece and published as Latest at 07:04Z and 07:08Z (sequence 7, exe sha256 Melange ecb54da0…, Mentat 66c3a638…), independently verified; runbook `Documents\Desktop-Installers-2026-10-22\RUNBOOK-1.0.14.md`. Codex's signed module-data route already ships a Mentat data prerelease (06:55Z). Remaining decisions (data route, dashboard into program distribution, re-cut or delete the two data releases, cleanup) are in the overnight handoff. Terrier 1.0.14 published by Codex 00:13Z (seq 8).
- Local `main` and `origin/main` match under ops/desktop after the invite-client port fast-forwarded onto live main (e8dbde691). Codex owns live-main desktop commits and Terrier releases; Codex also merged PRs #35-#39 (GitHub district provider for Terrier).
- Geo draft release `district-testsets-2026-10-21` holds real voter data for three districts; Fable declined to publish or assist and left it untouched. Paul's decision.
- Permission classifier in auto mode blocked the packaging tool as "data exfiltration"; Paul switched to bypass at 15:55 CDT.
- 2026-10-22 afternoon: access server died silently twice; likely cause is a reader of `listener-status.json` during its atomic replace (old script treated the failed replace as fatal). Never poll that file. Hardening PR pjg93-222/Melange#57 (supervisor.log, child output capture, exit codes, `Register-LanPublisherStartup.ps1 -AsScheduledTask` with a one-minute repeating trigger because Task Scheduler restart-on-failure did not fire) merged 20:22Z as 34bfb2213 (receipt AY). This PC runs the server under task `MelangeDesktopPublisher` since 18:54Z (Run entry removed; stop = Disable then Stop). Live main still carries the old script until synced. Staffer graph change = Congress attempt 8 half-rewrite of `fec\surfaces\staffer_live\approved` outside rollback (DE-078); attempt 9 also failed; restore pending "chain done". Codex's 1.0.15 ships a signed GitHub module-data reader gated to existing-owner installs; testers get no data yet; Paul disputes, empirical install check pending.
- Docs on Desktop: `AGENT-ROLES.md`, `DEPLOY-READINESS-2026-10-21.md`, `EMAIL-Eric-auth-test-2026-10-21.md`, `HANDOFF-desktop-overnight-2026-10-21.md`.

**Why:** three handoffs were stale within hours; this is the verified baseline for the next session.
**How to apply:** re-verify GitHub and live state first; coordinate live-tree writes with the Congress pipeline session ("chain done" protocol); never push raw branches to origin. See `desktop-invite-code-lane-2026-10-20`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-22 from the Claude Code memory file `desktop-readiness-2026-10-21.md` of project `workspaces-scratch-2026-10-21-f6eb2f` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
