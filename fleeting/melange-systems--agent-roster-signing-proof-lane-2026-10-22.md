---
type: fleeting
title: "Agent roster signing proof lane (2026-10-22)"
aliases: ["agent-roster-signing-proof-lane-2026-10-22"]
source: "session"
captured_at: 2026-10-22
created_at: 2026-10-22
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/agent-roster-signing-proof-lane-2026-10-22.md", type: "claude-memory", synced_at: "2026-10-22", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\agent-roster-signing-proof-lane-2026-10-22.md", sha256: "f098ceeecdcb1209f9a7d85b916cc0a375807a5d246972460943b825bd8e762c"}
updated_at: 2026-10-22
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Agent roster signing proof lane (2026-10-22)

> 2026-10-22 lane - signature census (published installers Valid, owner installs NotSigned stale), agent files gained Skill/skills/scout/verifier/receipt contract, END_PROOF + Terrier assignment ledger; installs and brain PR 33 merge are Paul's

## Content

Paul asked (2026-10-22): "Make sure everything has its proper certificate signature, that every agent has its proper task, defined skills, and end proof", with the Terrier 22-Oct read-only audit pasted.

What is now true:
- Required publisher thumbprint `[private — see knowledge vault]` (CN=Melange Systems Desktop Release, self-signed, in CurrentUser\My + Root, expires 2031-10-16). Every published installer (Melange 1.0.16, Mentat 1.0.16, Terrier 1.0.15) and 19 local build/readback copies are Valid under it, digests matching GitHub. The owner-installed copies in `Documents\MelangeApplications` (Melange.exe 1.0.15, Mentat.exe 1.0.15, Terrier.exe 1.0.14) are NotSigned stale builds.
- Upgrade assessed read-only: Melange and Mentat READY via `/S /D=<existing dir>` (NSIS per-user, state in `MelangeApplicationState` kept); Terrier HELD (running; own 1.0.15 update queued for close). The Claude Code auto-mode classifier refused running installers (production deploy) and merging brain PR 33 (merge without review). Both are Paul's steps; exact commands in `audits/agent_roster_20261022/receipts/architect_owner_install_assessment_20261023T012215Z.md`.
- Agent files `.claude/agents/{coder,manager,overseer,scout,verifier}.md`: Skill tool + `skills:` frontmatter, scout (Haiku read-only) and verifier (Opus effort high, thumbprint rule) added, ECC pattern per agent, receipt contract (`audits/<lane>/receipts/<agent>_<UTC>.md`, last line of every agent message). Commits d610c6ccd and 36df741f2 on local main, NOT pushed (public repo rule). `ecc:quality-gate` is a formatting command, not a skill; dropped.
- Ledger: `audits/agent_roster_20261022/END_PROOF.md` and `TERRIER_WORK_ASSIGNMENT.md` (every Terrier audit item mapped to agent, skills, proof, Paul-only decisions).

**Why:** the roster existed only by convention; agents could not load skills they were told to load, and no lane produced a durable proof artifact.

**How to apply:** spawn `scout`/`verifier` by subagent_type; a lane is not done while any receipt is missing. Follow-up: `.claude/workflows/folder-debug.js` should spawn by agentType (file was dirty from another lane). Doc contradiction to fix in Melange: `ops/desktop/GITHUB_RELEASES.md:32-59` vs `client/README.md:36` on certificate trust for updates.

Related: `agent-roster-2026-10-21`, `installer-signing-rule`, `terrier-voter-profile-lane-2026-10-21`, `melange-public-repo-unfiltered-branches-2026-10-18`, `no-permission-prompts-pr-first-2026-10-19`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-22 from the Claude Code memory file `agent-roster-signing-proof-lane-2026-10-22.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
