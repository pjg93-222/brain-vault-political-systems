---
type: fleeting
title: "Vault integration lane (2026-10-15)"
aliases: ["vault-integration-lane-2026-10-15"]
source: "session"
captured_at: 2026-10-15
created_at: 2026-10-15
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/vault-integration-lane-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-15", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\vault-integration-lane-2026-10-15.md", sha256: "9edc5910a5c8ceb657084d96f188b6508436fee679f27c3c3e39fa524e397cf8"}
updated_at: 2026-10-15
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Vault integration lane (2026-10-15)

> 2026-10-15 vault integration (D-223/D-224) + skill line-ref pass (D-225..D-227): brain PR #27 merged, research vault on GitHub, vaultlink bridge builder; open items

## Content

Paul 2026-10-15: three linked vaults (research, systems=brain, joint=linked) must all be reachable and receive everything automatically, "just like the project brain" (D-223). D-224 supersedes D-096: generated/captured brain-vault files (ledger/, fleeting/, projected state blocks, index, log) auto-commit and push to main after a fail-closed secret scan; curated notes still go via PR.

Done 2026-10-15:
- **Brain vault:** PR #27 merged (ab3b01c). The live vault was fast-forwarded with vault-backups\brain-20261015\ff_after_merge.py, then D-226/D-227 were pushed direct as fdfda7b.
- **Research vault:** now on GitHub as private repo pjg93-222/research-vault, plus a GitMirrors mirror. Its post-commit hook auto-pushes, and _work/state is now tracked. No external-drive copy of _sources/_raw (D-227).
- **Bridge builder:** now at Project Brain\vaultlink\build_linked.py (master 2e8d80c). It is idempotent and covers 163/243 brain notes with 0 dead links.
- **Outcome-contract work:** committed on Melange main as fd4914cc3 (Paul: "Commit both"). The run_tests.py registration line was left out because that file mixes other lanes' edits.

Still open:
- **Fix 4+6:** the research inbox, the vault_sync runner and the `vaultlink-sync` scheduled task. Paul approved the task (D-226/D-227), but the work was interrupted by a session restart.
- **Fix 5: DONE 2026-10-15.** vaultlink/brain_upload.py (Project Brain master 200ff94; exported to ~\.claude\hooks\brain-upload\) runs on the Stop and SessionStart hooks. GitHub confirmed 5825c1a (7 pending files) and 138f194 (new capture). Ineligible: .obsidian/graph.json, projects/_template.md, Untitled*.
- **Skill line-ref pass:** applied only in worktree claude/skill-lineref-pass. Group 2 is done; groups 1 and 3 were interrupted. Committing needs Paul's word.
- **.obsidian/graph.json:** whether it stays tracked is Paul's call.

**Why:** Paul asked repeatedly "is the obsidian brain updated?" and the answer kept being no. The manual PR flow left notes unpushed and local main 6 commits behind.
**How to apply:** after any session's work, get the brain vault current on GitHub before claiming done: generated files go direct to main (D-224), curated notes via PR. Write a curated vault note for each lane, not just a memory file.

Related: `brainlink-knowledge-system-2026-10-05`, `brain-vault-sync-mechanism-2026-10-07`, `research-vault-lane-2026-10-09`, `skill-library-stale-facts-lane-2026-09-30`.

2026-10-15: fix 5 (brain auto-upload) is implemented at C:\Users\pgoff\.claude\hooks\brain-upload\vaultlink\brain_upload.py (source: Project Brain vaultlink/brain_upload.py on master), hooks Stop and SessionStart; D-224 generated files only, secret scan fail-closed.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-15 from the Claude Code memory file `vault-integration-lane-2026-10-15.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
