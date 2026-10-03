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
  - "No re-import script exists yet; re-imports must upsert by source path using .bedrock/import-manifest.json"
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/agent-ops", "domain/platform"]
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
- **No re-import script yet.** New memory files can only be imported by hand until a script exists that uses the manifest upsert key.

## Related Actors

- [[brain-graph]] - Interactive D3 graph page of the brain vault, rebuilt by a background watcher that is started by hand and does not survive a reboot
- [[project-brain]] - Hardened brainctl external-brain kit (Desktop, own repo); NOT this vault, the two "brain" systems are distinct

## Related Topics

- [[2026-10-feature-brain-vault-setup]] - Brain vault setup and Claude memory import: setup choices, import decisions, verification, dependencies, graphify review and open items (2026-10-03)

## Related People

- [[paul-goff]] - Vault owner and sole decision-maker; the vault and its private GitHub repository are his
