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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-22-ddfeb0/memory/always-sign-with-release-certificate.md", type: "claude-memory", synced_at: "2026-10-22", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-22-ddfeb0\\memory\\always-sign-with-release-certificate.md", sha256: "26b4a27d427093618b6cebb887946ef4e41fa2d3af6817bee451f21a461da241"}
updated_at: 2026-10-22
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Always sign with release certificate

> User wants every commit signed with the Melange Systems Desktop Release certificate (thumbprint [private — see knowledge vault]), always

## Content

User (2026-10-22, Terrier area-street work) said: "You need to add the signing certificate, always." The certificate is `CN=Melange Systems Desktop Release (self-signed)`, SHA-1 thumbprint [private — see knowledge vault], in CurrentUser\My (private key present, TPM-backed per release notes, Code Signing EKU only, expires 2031-10-16). It also signs the Melange/Mentat/Terrier installers.

**Why:** the user treats this certificate as the one allowed signing identity; an SSH-key signature alone was not accepted.

**How to apply:** sign every commit (and release artifact) with this certificate. Git needs an X.509 helper (smimesign) for it; as of 2026-10-22 none was installed and global git signed with SSH key id_ed25519 via ~/.ssh/allowed_signers as an interim. Check `git config --global gpg.format` before committing. GitHub will not show self-signed X.509 commits as Verified.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-22 from the Claude Code memory file `always-sign-with-release-certificate.md` of project `workspaces-scratch-2026-10-22-ddfeb0` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
