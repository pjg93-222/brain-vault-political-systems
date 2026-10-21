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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-21-f6eb2f/memory/desktop-readiness-2026-10-21.md", type: "claude-memory", synced_at: "2026-10-21", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Local-Claude-Data-claude-pzs8sxrjxfjjc-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-21-f6eb2f\\memory\\desktop-readiness-2026-10-21.md", sha256: "8b70ffd465674858bbcb73342e748d297e244b8dc30bc2768fdea053c20e6950"}
updated_at: 2026-10-21
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop readiness (2026-10-21)

> State of the Melange/Mentat/Terrier desktop rollout as of 2026-10-21 evening, where the artifacts live, and who owns what

## Content

Desktop rollout state on 2026-10-21 (about 19:45Z):

- Live tester auth through the public relay `https://<tunnel-host>:<port>` works end to end (request, approve, activate, status, revoke; about 1 s per call). Invite enforcement is OFF and stays off until testers are on Melange/Mentat 1.0.10+ and Terrier 1.0.12 (Paul's ruling).
- Terrier `desktop-v1.0.12` published on [private — see knowledge vault] 18:30Z by Codex, built locally (no CI run maps to it); signature and hashes verified from `C:\Users\pgoff\Downloads\terrier-1.0.12-verify-20261021`. The `desktop-preview-v1.0.12` prerelease is unsigned; do not give it to testers.
- Codex owns the Terrier release lane and the "desktop: ... Terrier" commits on the live Melange `main`; no CCD session does.
- Auth harness: `ops/desktop/server/tools/auth_roundtrip.py` on branch `auth-test-20261021`, worktree `C:\Users\pgoff\Melange-wt\auth-test-20261021` (commit d45249ec8, not pushed). Refuses the live server without `--allow-live`.
- Parity gap: local Melange `main` client lacks the invite-code field and device record that `origin/main` has (19 files under ops/desktop/client and packaging); server trees identical. Port is a cherry-pick (no merge base). Blocked until the Congress pipeline session says "chain done".
- Docs on Desktop: `AGENT-ROLES.md`, `DEPLOY-READINESS-2026-10-21.md`, `EMAIL-Eric-auth-test-2026-10-21.md`.

**Why:** three handoffs were stale within hours; this is the verified baseline.
**How to apply:** re-verify GitHub and live state before trusting any of it; keep hands off the live checkout and ReleasePublish until "chain done". See `desktop-invite-code-lane-2026-10-20`.

## Possible Connections

- [[terrier]] — keyword match from recall, unverified
- [[2026-09-feature-forecast-giving-redesign-audit-lane]] — keyword match from recall, unverified
- [[2026-07-incident-workstation-stability]] — keyword match from recall, unverified

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-21 from the Claude Code memory file `desktop-readiness-2026-10-21.md` of project `workspaces-scratch-2026-10-21-f6eb2f` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
