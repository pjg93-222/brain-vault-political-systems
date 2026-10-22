---
type: fleeting
title: "Always sign with release certificate"
aliases: ["always-sign-with-release-certificate"]
source: "session"
captured_at: 2026-10-22
created_at: 2026-10-22
status: "raw"
promoted_to: ""
project: "workspaces-scratch-2026-10-22-ddfeb0"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-22-ddfeb0/memory/always-sign-with-release-certificate.md", type: "claude-memory", synced_at: "2026-10-22", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-22-ddfeb0\\memory\\always-sign-with-release-certificate.md", sha256: "dc777ac65fc5d3600eedb599bda56bcf94902e09175943a8834d377e895b0e13"}
updated_at: 2026-10-22
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Always sign with release certificate

> User wants every commit signed with the Melange Systems Desktop Release certificate (thumbprint 0EBC9AD0...), always

## Content

User (2026-10-22, Terrier area-street work) said: "You need to add the signing certificate, always." The certificate is `CN=Melange Systems Desktop Release (self-signed)`, SHA-1 thumbprint 0EBC9AD04E929CDD731EDB5D278A4143BC3D3D30, in CurrentUser\My (private key present, TPM-backed per release notes, Code Signing EKU only, expires 2031-10-16). It also signs the Melange/Mentat/Terrier installers.

**Why:** the user treats this certificate as the one allowed signing identity; an SSH-key signature alone was not accepted.

**How to apply:** sign every commit (and release artifact) with this certificate. Set up 2026-10-22: global git `gpg.format=x509`, `user.signingkey=<thumbprint>`, `commit.gpgsign=true`, `gpg.x509.program=C:/Users/pgoff/tools/smimesign/smimesign-git` (sh wrapper calling smimesign.exe v0.2.0-rc1 with `--include-certs=-1`; without it the self-signed cert is omitted and verify fails "no certificate found"). Check `git log --format=%G?` shows G before reporting commits as signed. GitHub will not show self-signed X.509 commits as Verified.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-22 from the Claude Code memory file `always-sign-with-release-certificate.md` of project `workspaces-scratch-2026-10-22-ddfeb0` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
