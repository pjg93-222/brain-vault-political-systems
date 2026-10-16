---
type: fleeting
title: "Deployment lane (2026-10-11)"
aliases: ["deployment-lane-2026-10-11"]
source: "session"
captured_at: 2026-10-12
created_at: 2026-10-12
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/deployment-lane-2026-10-11.md", type: "claude-memory", synced_at: "2026-10-12", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\deployment-lane-2026-10-11.md", sha256: "7b10ebd8a1dc6a9fefa199d47532ec21d8cc3b909f4494d5a15dae8cf5e83fe9"}
updated_at: 2026-10-12
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Deployment lane (2026-10-11)

> Deployment + containerization lane for Melange/Mentat/Terrier — plan path, Paul's 10 rulings, worktrees, what stays Paul's

## Content

Plan (approved 2026-10-11): C:\Users\pgoff\.claude\plans\we-are-going-to-dapper-sunrise.md. Rulings live in the brain as D-entries (lane B records them); this file is only the pointer.

Shape: laptop keeps ALL compute; rented US VPS serves read-only snapshots behind Cloudflare Tunnel + Access (apps verify the Access JWT too). Invitees = campaign staff + collaborators, unpaid. Melange on server = static desk + lobby pages only (live staffer console stays local). Terrier opens walk lists + door knocks to district staff, so the SERVER is master for field results. LUKS auto-unlock (Paul's choice). Netlify desk kept for password holders (rotate password, delete old deploys, compress-before-encrypt if 148 MB rejected). Melange reaches GitHub only as source-only exports into new private pjg93-222/melange-platform; local history never pushed (D-139).

Status 2026-10-12: Melange main 9a905befe has all ops/ tooling + fec/access_gate.py + desk server + invited-build builder (kernel 514/0). Mentat deploy/mentat-hosted 8499e6e8a and Terrier deploy/terrier-hosted cb16c1d are READY, NOT landed (Mentat = Paul's per-change OK + ~2-3 GB index rebuild; Terrier = stop servers, back up 3 accounts DBs, ff-merge, migrate per district). Worktrees left: C:\Users\pgoff\worktrees\dep-mentat, dep-terrier. Brain D-164..D-172 + STATE bc7f629; vault PR #25 open (not merged). Full status = brain STATE "Deployment lane".

**Why:** Paul's 08-25 ask "containerize + secure the whole system, accessible yet guarded", revived 10-11 with "send an update once, every platform receives it".

**How to apply:** outward actions (pushes, Netlify publish/deletes, VPS changes, invites, Task Scheduler entries) need Paul's yes at the time; Paul enters every credential; live servers restart only by Paul; first data release blocked until the press-delta refresh failure is fixed and fec/ is clean. No invitee before the governance matrix rows are ruled (`security-baseline-lane-2026-10-10`, `ask-before-substantive-changes`).

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-12 from the Claude Code memory file `deployment-lane-2026-10-11.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
