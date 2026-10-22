---
type: fleeting
title: "Installer signing rule"
aliases: ["installer-signing-rule"]
source: "session"
captured_at: 2026-10-22
created_at: 2026-10-22
status: "raw"
promoted_to: ""
project: "workspaces-scratch-2026-10-21-f6eb2f"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-21-f6eb2f/memory/installer-signing-rule.md", type: "claude-memory", synced_at: "2026-10-22", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-21-f6eb2f\\memory\\installer-signing-rule.md", sha256: "13ff740a64e442aafa0dfcdbdc59aeb669ae45f95465edde9b68afdf20b381bd"}
updated_at: 2026-10-22
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Installer signing rule

> Paul's rule that every Melange/Mentat/Terrier desktop installer handed out must be Authenticode-signed with thumbprint 0EBC9AD0…3D30; where signing happens, verified state on 2026-10-22, known gaps

## Content

Paul's rule (2026-10-22): desktop installers for Melange, Mentat and Terrier "should always be signed". Signer: `CN=Melange Systems Desktop Release (self-signed)`, SHA-1 thumbprint `0EBC9AD04E929CDD731EDB5D278A4143BC3D3D30`, valid 2026-10-16 to 2031-10-16, private key in Paul's `CurrentUser\My`, trusted only in his `CurrentUser\Root` (other PCs see untrusted publisher unless IT imports the .cer). Timestamp: DigiCert.

How it works: repo CI (`desktop-windows.yml`) builds UNSIGNED previews by design and throws if a build is signed; files are named `*-unsigned-installer.exe` and `desktop-preview-*` releases. Signing happens only on Paul's PC via `Documents\Desktop-Installers-<date>\sign_installers.ps1` (signtool by thumbprint, refuses already-signed input), then `publish_app.ps1` uploads and `verify_published.ps1` re-downloads and requires Valid + that thumbprint. Terrier releases live in `[private — see knowledge vault]`, not a Terrier repo. Client `github-source.cjs` only accepts non-draft, non-prerelease `desktop-v*` tags.

Verified 2026-10-22: every published `desktop-v*` asset (Melange/Mentat 1.0.9, 1.0.14, 1.0.15; Terrier 1.0.9, 1.0.14) matches a locally signed file with that thumbprint; 1.0.9 SHA-256s match Paul's reference list (Melange 34a72672…, Mentat 7723c5f1…, Terrier f442dbd9…). 0 files signed with a different cert.

Gaps to watch: (1) `ops\desktop\client\main.cjs:320` sets `verifyUpdateCodeSignature` to a no-op, so the installed app does not check Authenticode on downloaded updates; (2) 1.0.15 release bodies (Codex) dropped the "Signed with … thumbprint" line the 1.0.9 bodies carried; (3) `OneDrive\Desktop\Installers to send\` still holds unsigned Mentat 1.0.5 and Terrier 1.0.7 `unsigned-installer.exe`; (4) `Downloads\Mentat-1.0.5-win-x64-unsigned-installer.exe` is actually the signed Melange 1.0.5 binary (same hash).

**Why:** testers and IT verify by thumbprint and SHA-256; an unsigned or wrongly named installer reaching Eric breaks the rollout.
**How to apply:** before handing out or publishing any installer, run `Get-AuthenticodeSignature` and require Status Valid + this thumbprint + timestamp; never ship `unsigned-installer` or `desktop-preview-*` files; include the thumbprint and SHA-256 lines in release bodies and tester emails. See `desktop-readiness-2026-10-21`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-22 from the Claude Code memory file `installer-signing-rule.md` of project `workspaces-scratch-2026-10-21-f6eb2f` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
