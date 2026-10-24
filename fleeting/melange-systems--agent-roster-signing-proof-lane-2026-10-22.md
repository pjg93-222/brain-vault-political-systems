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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/agent-roster-signing-proof-lane-2026-10-22.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\agent-roster-signing-proof-lane-2026-10-22.md", sha256: "a93022c03ef3f1de642ec8e82874e451ff22ec287584ddcd86e77815a0957a2f"}
updated_at: 2026-10-24
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

Update 2026-10-23: `audits/agent_roster_20261022/RELEASE_GATE_MATRIX.md` (commit 5eeeb3b07) grades every gate for the three releases. Signing all PASS (1,195 payload PEs Valid, vendor signatures intact). Owner PC upgraded in place: Melange 1.0.16 and Mentat 1.0.16 by Paul's manual silent install, Terrier 1.0.15 by its own updater; data preserved. NOT TESTED: fresh install, recipient approval-to-data on the delivered build, ThreatLocker. Data releases data-melange/data-mentat-2026-10-21 still Draft. P0 REGRESSION: main lacks shipped commits 3958bc60 (fix/melange-1.0.16-inner-signing) and 19d1f686 (fix/desktop-inner-signing-20261022): inner-signing hook plus ~5.4k lines of 1.0.16 module code; a build from main ships unsigned inner binaries. Session card proposed to land them. Mentat in-app update recorded phase failed at 03:33Z before the manual install. Release NOT marked ready.

Closeout 2026-10-24 (commit af140502d, brain 4b9dd22): the shipped-code gap is on the PRIVATE local main only; public origin/main already holds 3958bc60, and PR pjg93-222/Melange#63 (publish/desktop-main-sync-20261023) adds the hardened PE-header signing hook superseding 19d1f686 (two independent supersession checks, zero unexplained hunks). PR #63 CLEAN, CodeRabbit resolved, client 630/630 server 257. Mentat "failed" update record = APP_STARTUP_FAILED stamp (updater.cjs:306) after "Protected access storage timed out" at first 1.0.16 launch, not an installer failure. Classifier refuses agent merges (PR #63, brain PR 33) and installer runs: those are Paul's clicks. Sync private local main from public main after the merge.

**Why:** the roster existed only by convention; agents could not load skills they were told to load, and no lane produced a durable proof artifact.

**How to apply:** spawn `scout`/`verifier` by subagent_type; a lane is not done while any receipt is missing. Follow-up: `.claude/workflows/folder-debug.js` should spawn by agentType (file was dirty from another lane). Doc contradiction to fix in Melange: `ops/desktop/GITHUB_RELEASES.md:32-59` vs `client/README.md:36` on certificate trust for updates.

Related: `agent-roster-2026-10-21`, `installer-signing-rule`, `terrier-voter-profile-lane-2026-10-21`, `melange-public-repo-unfiltered-branches-2026-10-18`, `no-permission-prompts-pr-first-2026-10-19`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): published installers Valid 0EBC..3D30;owner installs NotSigned stale,upgrade cmds in receipt (Paul runs);agents got Skill/skills/scout/verifier/receipts d610c6c+36df741 unpushed;END_PROOF.md

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `agent-roster-signing-proof-lane-2026-10-22.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
