---
type: actor
name: "brain-vault-political-systems"
aliases: ["Brain vault", "Obsidian brain vault", "Bedrock brain vault", "Vault System Setup"]
category: "tool"
description: "Private Obsidian + Bedrock knowledge vault that consolidates Paul's Claude Code memories into linked entities, backed up to a private GitHub repo"
repository: "https://github.com/pjg93-222/brain-vault-political-systems"
stack: "Obsidian 1.13.7 · Bedrock plugin 1.2.0 · Markdown/YAML · git + private GitHub repo"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "Naming trap: 'Brain' alone is ambiguous. The brainctl toolkit is the separate actor project-brain; this vault must not carry a bare 'Brain' alias"
  - "Obsidian creates new notes at the vault root by default; the graph includes them, and setting Obsidian's default new-note folder to fleeting/ is optional"
  - "/bedrock:teach runs graphify sub-agents that have Write and Bash over fetched content, so only teach from trusted sources"
  - "New and changed memory files are captured only into fleeting/ (by the sync hook); folding them into curated notes is still done by hand with /bedrock:preserve"
  - "No automatic sync (verified 2026-10-07): the Stop/SessionEnd hook never commits or pushes; after any vault write, commit by explicit path and push through the PR flow in the same session. Update 2026-10-30: superseded in part for generated and captured files (D-224, 2026-10-15); see Sync and push."
  - "A missing Brain recall block does not mean nothing matched: the recall hook was killed by timeouts (10 s limit since 2026-10-07) and long harness wrappers diluted coverage (stripped since 358bd1d)"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brain-vault-sync-mechanism-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brain-vault-sync-mechanism-2026-10-07.md", sha256: "f6cb0f88660946963911aed1ba4464f34e48add7bfdfaf12f15ff5960e381159"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/bedrock-recall-silent-failures-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\bedrock-recall-silent-failures-2026-10-07.md", sha256: "53df00e49920c8c8c2693e617aaabf7a25882ff4585ef45371ddb5185241ae49"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/claude-obsidian-readonly-install-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\claude-obsidian-readonly-install-2026-10-06.md", sha256: "415891f358d424e34bc5866bc4d9fbd96ea5cd884f80cb394917e74f30225055"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/claude-obsidian-plugin-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\claude-obsidian-plugin-2026-10-07.md", sha256: "f7562a98042dab8126fded15fb6c0b7cc0c2b78d898821dab76e23d2355c4bec"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# brain-vault-political-systems

> Private Obsidian + Bedrock knowledge vault holding Paul's consolidated Claude Code memories as linked entities, backed up to a private GitHub repo.

## Details

| Field | Value |
|---|---|
| Repository | [brain-vault-political-systems](https://github.com/pjg93-222/brain-vault-political-systems) (private, branch `main`, GitHub account `pjg93-222`) |
| Location | `C:\Users\pgoff\Documents\brain`; registered in Bedrock's vault registry as `brain` (the default vault) |
| Stack | Obsidian 1.13.7 (per-user install, 2026-10-03) · Bedrock plugin 1.2.0 · Markdown/YAML · git + GitHub CLI |
| Status | active |
| Criticality | medium |
| PCI | no |
| Team | none |

## Setup (2026-10-03, `/bedrock:setup`)

- Language `en-US`, preset `engineering`, no example entities, git strategy `commit-push-pr`. All of it is recorded in `.bedrock/config.json` (written by `init@agent`).
- Domains: backend, frontend, infra, data, platform and security from the preset, plus research and agent-ops, which were added to resolve the Engineering preset's fit tension for this material (see [[2026-10-feature-brain-vault-setup]]).
- Eight entity folders: `actors/`, `concepts/`, `discussions/`, `fleeting/`, `people/`, `projects/`, `teams/`, `topics/`. Each holds a `_template.md` that is byte-identical to the Bedrock 1.2.0 template (re-checked 2026-10-03).
- Vault-specific rules live in the root `CLAUDE.md`: purpose, language, domain list, skill quick reference and the import provenance rule.

## Obsidian

- Settings: wikilinks rather than Markdown links, shortest link format, frontmatter shown, built-in dark theme (`obsidian`). The only core plugin enabled is graph.
- Graph colour groups by `type/*` tag: actor `#4A90D9`, person `#50C878`, team `#E8913A`, topic `#9B59B6`, discussion `#F1C40F`, project `#E74C3C`, fleeting `#95A5A6`, concept `#1ABC9C`.
- Obsidian 1.13.7 was installed per user through winget on 2026-10-03.

## Git

- Branch `main`; remote `origin` is the private GitHub repository above. Privacy was checked on 2026-10-03: the repository page returns 404 without credentials, while an authenticated `git ls-remote` succeeds.
- Author identity "Paul Goff" is set repo-local only; the global git config has no user identity.
- `.gitignore` covers Obsidian's per-device workspace files, `.trash/`, OS junk files, and the graph watcher's log and pid files plus temporary build output. `.gitattributes` sets `* text=auto eol=lf`.
- GitHub CLI 2.102.0 is installed (winget) and `gh auth setup-git` is configured globally, so git uses the `gh` login for github.com and gist.github.com. Bedrock's `commit-push-pr` strategy depends on this: it branches as `vault/<date>-<slug>`, pushes, and opens a PR against `main` with `gh`.
- Key commits: `5510dd8` initial import (91 files), `5da6a8d` graph tooling and live watcher, `44caa3d` graph includes top-level notes with a folder-type fallback.

## Import provenance

- One-time import on 2026-10-03 of 210 Claude Code auto-memory files: 183 from the Melange Systems project memory and 27 from the Draft Systems project memory. The two `MEMORY.md` index files were not imported, and 10 other memory folders were empty. The manifest also lists 183 session-data files that were found and skipped (395 files found: 210 imported, 185 skipped).
- Result: 74 entities (1 person, 4 projects, 23 actors, 6 concepts, 34 topics, 6 discussions).
- Every imported note lists its source memory files in `sources` as `{url, type: claude-memory, synced_at, path, sha256}`. `.bedrock/import-manifest.json` is the upsert key: re-imports must upsert by source path and never duplicate.
- Checks recorded in the manifest: all 210 source hashes re-verified before the import (none changed), no duplicate groups, and a secret scan with 89 raw matches, all of an OpenAI-style `sk-` pattern inside kebab-case slugs, so 0 redactions.

## Dependencies

- Depends on [[claude-code-harness]]: the imported memory files came from Claude Code's per-project auto-memory, and that note records the `MEMORY.md` loading contract those files live under.
- Depended on by [[brain-graph]]: the graph page and its watcher read this vault's notes (read-only) and publish the page beside the vault.
- Tooling: Bedrock plugin 1.2.0; docling 2.133.0 and graphifyy 0.9.74 (Python user packages whose executables sit in the Python user Scripts directory, which is on the user PATH as of 2026-10-03); Bun 1.4.2 for the graph tooling; GitHub CLI 2.102.0; Obsidian 1.13.7.
- The user environment variable `GRAPHIFY_NO_AUTO_REFRESH=1` stops package upgrades from overwriting the graphify skill.

## Flows

- Read: `/bedrock:ask` searches and cross-references the vault.
- Write: `/bedrock:preserve` is the single write point (entity detection, matching, bidirectional links, git). `/bedrock:teach` ingests external sources and delegates to it.
- Hygiene: `/bedrock:compress` deduplicates and fixes links; `/bedrock:sync` re-syncs entities with external sources.
- Notes written by hand in Obsidian are allowed; the graph page includes them.

## Capture and recall

- Since 2026-10-03, four global Claude Code hooks run `.bedrock/recall/hook.ts`. SessionStart adds a short orientation. UserPromptSubmit adds a "Brain recall" block of up to 5 matching notes (BM25 over `.bedrock/recall-index.json`), and only when the prompt names something in the vault. Stop and SessionEnd sync memory files.
- Sync copies new or changed memory files into `fleeting/` as raw notes. It dedupes on the frontmatter `sources` path and sha256, scans for secrets first and never writes curated notes. It also appends to `log.md` and refreshes `index.md` and the graph page.
- `index.md` (generated catalog) and `log.md` (append-only event log) are system notes. Commands, rules and rollback are in the vault `CLAUDE.md`.
- Dated note 2026-10-10 (memory `brain-vault-sync-mechanism-2026-10-07`): the graph page is no longer rebuilt inline by the sync hook; since `8e1e5df` a detached `hook.ts graph` worker rebuilds it (see Sync and push below).

## Sync and push (verified 2026-10-07; memory `brain-vault-sync-mechanism-2026-10-07`)

Update 2026-10-30 (source: memory `brain-vault-sync-mechanism-2026-10-07`, sha256 `f6cb0f88…`, which records D-224 of 2026-10-15): the statement "NO automatic sync" below is superseded in part. Generated and captured brain-vault files now auto-commit and push to main after a fail-closed secret scan. Hand edits still go through the PR flow. The bullets below describe the state on 2026-10-07.

The brain vault (`C:\Users\pgoff\Documents\brain`) has NO automatic sync:
- The Stop/SessionEnd hook (`hook.ts sync`) only captures memory files into `fleeting/`; it "never commits or pushes" (`.bedrock/recall/sync.ts:18`, vault CLAUDE.md:66). No git hooks, no scheduled task.
- It is NOT under OneDrive: local Documents. The redirected Documents is `OneDrive\Documents`, which has no brain folder. The only off-machine copy is GitHub.
- The flow is ordinary commits plus a PR: `.bedrock/config.json:16` `"strategy": "commit-push-pr"`. The remote is the private repo `pjg93-222/brain-vault-political-systems`. Sessions push a branch, open and merge a PR, then push main (PRs #1-#7; #7 merged 2026-10-07, main = `3e7c22c`, as of that date).
- `bedrock:sync` is a different thing: it re-fetches external sources (Confluence, Google Docs, GitHub).
- The six curated notes held since 10-05 ("no commit or push") were committed on 10-07 after Paul lifted the hold: `feafff3`, PR #8 merged.
- Graph page: the sync hook used to build `brain-graph.html` inline with a 20 s `Bun.spawnSync` timeout (`sync.ts:53`), which got killed under CPU load ("exited with code null" = Bun's timeout kill) or when the hook process died. Fixed in `8e1e5df`: a detached `hook.ts graph` worker with a 120 s limit and one retry; final failures go to `.bedrock/sync/graph-fail.txt` and show on the next sync. The rest of sync still runs inside the hook and can exceed the 30 s limit under heavy load (unfixed as of 2026-10-07).
- **Why:** "Left for the vault's normal flow" silently meant never synced; that night six session commits sat unpushed until Paul said "make sure it syncs".
- **How to apply:** after any vault write, commit by explicit path AND push via the PR flow in the same session (secret-scan first). Don't assume a later process will do it. Related memories: `bedrock-recall-silent-failures-2026-10-07`, `brainlink-knowledge-system-2026-10-05`, `backup-coverage-gap-2026-09-07`.

## Recall failure modes (diagnosed 2026-10-07; memory `bedrock-recall-silent-failures-2026-10-07`)

A missing "Brain recall" block does NOT mean recall works or that nothing matched:
1. **Timeouts (main cause).** The UserPromptSubmit hook (`bun .bedrock/recall/hook.ts recall`) takes 2-10 s on this laptop (2 MB `recall-index.json` parse plus OneDrive CPU load). The old 5 s limit got it killed 15+ times across sessions, main repo included. Kills leave nothing in `hook.log`; they show only in session transcripts as `hook_cancelled`/`timedOut`. Paul raised the limit to 10 s in `~/.claude/settings.json` on 2026-10-07 (Paul granted permission after auto mode denied the edit as Self-Modification).
2. **Coverage dilution.** The anchor gate needs coverage >= 0.45 (`recall.ts:43`). The desktop app's worktree system-reminder on a worktree session's first prompt, plus peer-message wrappers and long agent reports, add unmatched terms and push good matches under 0.45. Paul approved a `recall.ts` patch, `stripHarness()`, which removes system-reminder blocks and cross-session/agent-message tags before scoring (in the vault since commit `358bd1d`, "Strip harness wrappers before recall scoring").
- The worktree cwd itself is irrelevant: recall reads only `payload.prompt`, with no project or slug matching.
- `graphify-out/graph.json` MISSING is by design (vault CLAUDE.md). The vault graph is `.bedrock/graph/build.ts`, which writes `brain-graph.html`.
- **Why:** Paul wants the Obsidian brain fundamentally integrated; silent recall loss made sessions run without vault context.
- **How to apply:** when recall looks absent, check session transcripts for `hook_cancelled` before blaming matching. If timeouts persist at 10 s, the next lever is making recall cheaper (don't parse the 2 MB index per prompt) or starting the watchdog clock at process start. Related memories: `brainlink-knowledge-system-2026-10-05`, `claude-obsidian-readonly-install-2026-10-06`.

## claude-obsidian plugin beside Bedrock, read-only (2026-10-06/07; memories `claude-obsidian-readonly-install-2026-10-06`, `claude-obsidian-plugin-2026-10-07`)

- **Install (Paul, 2026-10-06: "option 1, install"):** claude-obsidian (github.com/AgriciDaniel/claude-obsidian, MIT, v2.2.0, marketplace `agricidaniel-claude-obsidian`) is installed at user scope next to Bedrock, READ-ONLY. Bedrock stays the only system that writes to this vault and the only one whose hooks inject context. Settings backup: `C:\Users\pgoff\.claude\settings.json.bak-20261006-claude-obsidian` (the only diff is the `enabledPlugins` and `extraKnownMarketplaces` entries).
- **Facts verified:**
  - Native Windows: claude-obsidian refuses vault writes (UNSUPPORTED_PLATFORM); writes need WSL, which is NOT installed. Installing WSL is Paul's system change, not an agent's.
  - Its hooks (SessionStart + Stop, `python3 .../claude-obsidian.py hook ...`, 5 s) still run every session. Claude Code 2.1.286 has no supported per-plugin hook disable (only `disableAllHooks`, which would kill Bedrock's hooks too). They are silent: SessionStart emits nothing unless `CLAUDE_OBSIDIAN_SESSION_CONTEXT=1` (unset everywhere); Stop only speaks when its own recovery state (unfinished claude-obsidian transactions) exists, which it doesn't in the brain vault.
  - `python3` resolves to the Windows Store alias (`WindowsApps\python3.exe`), i.e. the Python Manager package linked to the AppXSvc leak.
  - No vault setup/adopt was run: no `.claude-obsidian.json`, `wiki/`, `inbox/`, `.raw/` or `.vault-meta/` in the vault.
  - Its linter only scans `<vault>/wiki/`. On this Bedrock layout `claude-obsidian.py lint` exits 0 with 0 pages scanned, a VACUOUS pass, never evidence of health. A remapped scratch-copy run (439 pages) found mostly convention-only noise (no created/updated keys) plus a few real dead links. Bedrock's own `check.ts` and `healthcheck.ts` stay the gate.
- **Hooks left on (Paul, 2026-10-07):** with no per-plugin hook disable, Paul chose to leave claude-obsidian's hooks ON (option 1) rather than a hook-less local copy. Side note from the 0xC000070A investigation (2026-10-07): these python3 hooks take 2.3-6.7 s against their 5 s limit (54 Stop hooks cancelled), harmless noise.
- **Why:** Paul wants Obsidian "fundamentally integrated into Claude", but two systems writing one vault with different folder and frontmatter conventions would split it; Bedrock stays the writer, claude-obsidian adds read-side skills (wiki-query, wiki-lint, canvas, obsidian-bases, obsidian-markdown, think).
- **How to apply:** use the read-side skills as helpers; never run its `wiki` init/adopt, `save`, `wiki-ingest` or `wiki-fold` writes against the brain vault without Paul, never set `CLAUDE_OBSIDIAN_SESSION_CONTEXT=1`, and never set `disableAllHooks`. All vault writes go through Bedrock conventions. If AppXSvc memory climbs again, or python3 alias trouble appears, suspect the python3 alias launched by these hooks first (`appxsvc-leak-pythonmanager-2026-09-23`). Related memories: `brainlink-knowledge-system-2026-10-05`, `terrier-multidistrict-lane-2026-10-06`.

## Dev Commands

```bash
# vault state
git -C /c/Users/pgoff/Documents/brain status --short --branch

# read-only audit of the link graph: note, link and warning counts
cd /c/Users/pgoff/Documents/brain/.bedrock/graph && bun extract.ts
```

## Known Issues

- **Naming trap.** "Brain" alone is ambiguous: [[project-brain]] is a separate brainctl-based memory toolkit with nested brain repos, not this vault. Keep the two "brain" systems distinct, and do not give this vault a bare "Brain" alias.
- **Default new-note location.** Obsidian creates new notes at the vault root. The graph includes them (typed by their frontmatter, else shown as "other"), and setting Obsidian's default new-note folder to `fleeting/` is optional.
- **Untrusted sources.** `/bedrock:teach` runs graphify sub-agents that have Write and Bash over the fetched content, so only teach from trusted sources. The review behind this caveat is in [[2026-10-feature-brain-vault-setup]].
- **Capture stops at fleeting/.** The sync hook captures new and changed memory files into `fleeting/` automatically (see Capture and recall), but folding them into curated notes is still done by hand with `/bedrock:preserve`.

## Related Actors

- [[brain-graph]] - Interactive D3 graph page of the brain vault, rebuilt by a background watcher that is started by hand and does not survive a reboot
- [[project-brain]] - Hardened brainctl external-brain kit (Desktop, own repo); NOT this vault, the two "brain" systems are distinct

## Related Topics

- [[2026-10-feature-brain-vault-setup]] - Brain vault setup and Claude memory import: setup choices, import decisions, verification, dependencies, graphify review and open items (2026-10-03)

## Related People

- [[paul-goff]] - Vault owner and sole decision-maker; the vault and its private GitHub repository are his
