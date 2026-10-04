---
type: topic
title: "Brain vault setup and Claude memory import"
aliases: ["Brain vault setup", "Claude memory import", "2026-10-03 Setup History"]
category: "feature"
status: "completed"
people:
  - "[[paul-goff]]"
actors:
  - "[[brain-vault-political-systems]]"
  - "[[brain-graph]]"
  - "[[claude-code-harness]]"
objective: "Consolidate all Claude Code memory files into a private, linked Obsidian brain vault with Bedrock conventions, a GitHub backup and a watcher-driven graph page"
created_at: 2026-10-03
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/platform", "category/feature"]
---

# Brain vault setup and Claude memory import

> Consolidated all of Paul's Claude Code project memories into a private Obsidian + Bedrock brain vault with a GitHub backup and a graph page driven by a live watcher.

## Context

- Paul's Claude Code auto-memory was spread across per-project memory folders. On 2026-10-03 it was consolidated into one linked knowledge base, [[brain-vault-political-systems]], following Bedrock's entity conventions. The vault's own purpose and rules are stated in its root `CLAUDE.md`.
- Source corpus: 212 memory files in 2 non-empty folders (Melange Systems and Draft Systems); 10 other memory folders were empty. The corpus was live (another session rewrote one memory file during planning), so every source was re-hashed before the import and the manifest was regenerated.
- Result: 74 entities built from 210 files; the 2 `MEMORY.md` index files were not imported. [[brain-graph]] visualises the result, and [[claude-code-harness]] documents the `MEMORY.md` loading contract that the source files came from.
- The brainctl toolkit `project-brain` is a different system and is not part of this topic.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner and sole decision-maker; confirmed the change proposals in chat and installed the graphify skill himself after the permission system blocked an agent-run install |

## Actors Involved

| Actor | Relation |
|---|---|
| [[brain-vault-political-systems]] | The vault itself: location, Bedrock config, Obsidian settings, git workflow and import provenance |
| [[brain-graph]] | Graph page and live watcher built the same day to visualise the vault |
| [[claude-code-harness]] | Where the memory files came from: Claude Code's per-project auto-memory and its `MEMORY.md` loading contract |

## History

| Date | Event |
|---|---|
| 2026-10-03 | **Setup choices:** vault at `Documents\brain`, Engineering preset, `commit-push-pr`, no example entities, `en-US`. |
| 2026-10-03 | **Four-role design review (PM, Architect, Developer, QA):** all four raised the same blocking questions: one-time import versus ongoing sync, secrets before any push, and how to map feedback memories. The Engineering preset's fit was a tension, resolved by adding the research and agent-ops domains. |
| 2026-10-03 | **Inventory:** 212 memory files in 2 non-empty folders; 10 memory folders were empty. |
| 2026-10-03 | **Dry-run plan:** 74 entities. Full secret scan: 89 matches, all false positives from `sk-` inside slugs such as ask-before-...; 0 redactions. No duplicates. |
| 2026-10-03 | **Build:** entity bodies merged from every source file by parallel authoring agents. |
| 2026-10-03 | **Verification:** see the Verification section below. |
| 2026-10-03 | **Git:** initialised with a first commit (`5510dd8`, 13:09 local, 91 files); the private GitHub repo was then created and pushed. |
| 2026-10-03 | **Dependencies:** see the Dependencies section below. |
| 2026-10-03 | **graphify skill security review:** verdict SAFE WITH CAVEATS (details below). |
| 2026-10-03 | **Graph page** built (first in a session scratchpad, then moved into the vault's `.bedrock/graph/` by `5da6a8d`, 16:48 local) and switched to a dark default. |
| 2026-10-03 | **Live watcher** built (chosen over a git hook, also in `5da6a8d`), then the fix for top-level notes and the folder-type fallback (`44caa3d`, 17:00 local). |
| 2026-10-03 | **Setup recorded in the vault** with `/bedrock:preserve` (this topic and the two actor notes). The state was re-checked while writing: no watcher was running and no autostart shortcut exists, so the watcher is started by hand. |

## Verification

Results from the setup session, with the ones that could be re-run while recording this marked as re-checked:

- 210 of 210 imported source files are listed in the notes' `sources` (re-checked: 210 distinct source paths across the notes equal the 210 imported files in the import manifest, none missing and none extra).
- 520 directed links (260 note pairs): 0 asymmetric, 0 orphans (re-checked: directed pairs are exactly twice the link pairs, with 0 unresolved wikilinks and 0 graph warnings).
- All 53 coverage-scanner misses were confirmed present as artifacts.
- Pillar weights 45/10/40/5 were never presented as ratified (re-checked: the melange-systems project note labels them LIVE BUT UNRATIFIED and keeps 30/25/40/5 as the last ratified set).
- 2 leftover build markers were removed.
- Templates are byte-identical to the Bedrock 1.2.0 templates (re-checked for all eight folders).
- Hash safety: all 210 source hashes were re-verified before the import and none had changed.

## Dependencies

- docling 2.133.0 and graphifyy 0.9.74 were already installed when the dependency check ran.
- GitHub CLI 2.102.0 and Obsidian 1.13.7 were installed with winget, with the installer hashes verified. Bun 1.4.2 (also from winget) runs the graph tooling.
- The graphify skill was installed by Paul after the permission system blocked an agent-run install.
- The Python user Scripts directory, where `docling.exe` and `graphify.exe` live, is on the user PATH (confirmed 2026-10-03), so the open question about it is closed.

## graphify skill security review

Verdict: SAFE WITH CAVEATS.

- **Fixed:** the over-broad auto-trigger description is narrowed to "/graphify, explicit request, or /bedrock:teach" (re-checked: the skill's description now says to use it only on those three triggers).
- **Fixed:** package upgrades overwriting the skill are prevented by the user environment variable `GRAPHIFY_NO_AUTO_REFRESH=1` (re-checked: set at user scope).
- **Remaining:** sub-agents with Write and Bash read untrusted documents, so teach only from trusted sources.
- **Remaining:** the package reads LLM API keys if any are set. None is set (re-checked: no `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GOOGLE_API_KEY`, `AZURE_OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `MOONSHOT_API_KEY`, `OLLAMA_API_KEY` or `GRAPHIFY_API_KEY` in the process, user or machine environment).
- **Remaining:** labelling may spawn `claude -p` (the package has a claude-cli backend that shells out to the Claude Code CLI).
- **Side effect:** `graphify install` added a 3-line /graphify pointer to the global Claude instructions.

## Decisions

- **One-time import with provenance, not ongoing sync.** `.bedrock/import-manifest.json` is the upsert key if a re-import is ever built.
- **Private remote only.**
- **Mapping rule:** user memories go to one person note; feedback memories are clustered into 5 working-agreement topics; project memories go to projects, topics and discussions; systems become actors; reusable methods become concepts.
- **The 10 import resolutions** (the notes tag them, for example "(resolution 3)"):
  1. Draft Systems is folded into melange-systems.
  2. Keep 4 projects.
  3. Record all three pillar-weight sets: `.40/.30/.20/.10` historical (2026-06-29), 30/25/40/5 last ratified (2026-07-07), and 45/10/40/5 live but unratified.
  4. Keep both model-tiering rules with their scopes.
  5. Superseded rules: newest wins, older kept as dated strike-through.
  6. Non-repo tools become actors.
  7. `sources` carry both schemas.
  8. New topic category `working-agreement`.
  9. Only the owner's primary address in the person note; other addresses masked or omitted.
  10. Mentat lanes form one topic.
- **Repo-local git identity:** "Paul Goff" is set in this repo only; the global git config has none.
- **Live watcher over a git hook** for rebuilding the graph page.
- **Folder-type fallback** for notes without a type, so hand-written notes still land in the right colour group.

## Next Steps

- [x] PATH: the Python user Scripts directory is on the user PATH (confirmed 2026-10-03).
- [ ] Optional: set Obsidian's default new-note folder to `fleeting/`.
- [x] Update the pinned counts in `snapshot.ts`; it fails now that these setup notes have grown the vault past 74 notes. (Done 2026-10-03 with the capture and recall work.)
- [ ] Re-check the importer-inference sections: the setup session counted 24 notes with such sections, but a 2026-10-03 re-scan for explicit labels such as "inference by the importer" found only one (in the PAC accuracy attempt 2 rulings discussion), so the count or the label wording needs settling.
- [ ] Consider an integrity (SRI) hash on the D3 script tag of the graph page.
- [x] Build a re-import script for new memory files using the manifest upsert key (none exists yet). (Done 2026-10-03: the capture hook's sync copies new and changed memory files into `fleeting/`, deduping on the `sources` path and sha256; see [[brain-vault-political-systems]].)
- [ ] Decide whether the graph watcher should autostart: no Startup shortcut is installed, so it must be started by hand after every reboot.
- [x] Correct the stale header comment in `watch.ts`, which describes a Startup shortcut that does not exist. (Done 2026-10-03.)
