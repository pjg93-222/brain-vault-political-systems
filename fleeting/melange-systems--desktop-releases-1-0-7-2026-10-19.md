---
type: fleeting
title: "Desktop releases 1 0 7 (2026-10-19)"
aliases: ["desktop-releases-1-0-7-2026-10-19"]
source: "session"
captured_at: 2026-10-19
created_at: 2026-10-19
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-releases-1-0-7-2026-10-19.md", type: "claude-memory", synced_at: "2026-10-19", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-releases-1-0-7-2026-10-19.md", sha256: "1dd72cff7512282973c1e3456f8766554ce5b1d8716f78705c6d8b3705ae5f23"}
updated_at: 2026-10-19
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop releases 1 0 7 (2026-10-19)

> Melange/Mentat/Terrier desktop apps signed + published as desktop-v1.0.7 on 2026-10-19; how to rebuild/sign/publish fast

## Content

On 2026-10-19 all three Electron desktop apps were signed and published as `desktop-v1.0.6` then `desktop-v1.0.7` on pjg93-222/Melange, pjg93-222/Mentat and pjg93-222/Geo (ledger sequence 3). Signed with the self-signed TPM cert `CN=Melange Systems Desktop Release (self-signed)`, thumbprint 0EBC9AD04E929CDD731EDB5D278A4143BC3D3D30 (CA:false, code-signing EKU only).

Client source: branch `desktop/one-click-trust-silent-update` (worktree .claude/worktrees/one-click-trust-silent-update), 1.0.7 = 76906c4d6 (+ c6182ef69 uninstall cleanup, not yet in a build). Source PRs: Melange #13, Mentat #2 (Paul merges).

**Why:** Paul wanted installers that update across other PCs with zero intervention; work PCs block self-signed apps, so an IT package (Desktop\For IT - Melange apps: installers, .cer, turn-on-updates.cmd, README) was made for IT to trust the cert.

**How to apply:** Fast release path = `Documents\Desktop-Installers-2026-10-19`: `node inject.cjs <app> <commit> --package` reuses the already-built runtimes and swaps only the client (bump VERSION in inject.cjs; let one app export first to avoid a shared-folder race), sign with Windows Kits x64 signtool `/sha1 <thumb> /s My /fd sha256 /tr http://timestamp.digicert.com /td sha256`, `python prepare_release.py` (bump VERSION/SEQUENCE/CLIENT_COMMIT), `publish_app.ps1 -App <app>` (use a fresh verify-download dir per version). Inner app exes are still unsigned; Smart App Control / managed PCs need IT trust or Microsoft Artifact Signing. Hosted/VPS path not provisioned. See `public-github-releases-ruling-2026-10-15`, `melange-public-repo-unfiltered-branches-2026-10-18`.

## Possible Connections

- [[terrier]] — keyword match from recall, unverified
- [[2026-10-troubleshooting-melange-main-reconcile]] — keyword match from recall, unverified
- [[2026-10-06-terrier-blueprint]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-19 from the Claude Code memory file `desktop-releases-1-0-7-2026-10-19.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
