# Brain — CLAUDE.md

> This vault is powered by the [Bedrock plugin](https://github.com/iurykrieger/claude-bedrock).
> Plugin-level instructions (entity types, writing rules, tags, git workflow) are loaded automatically.
> This file describes what is specific to THIS vault.

## Purpose

Personal engineering brain: consolidates Claude Code memory files from all projects (systems, projects, decisions, working preferences) into one linked knowledge base.

## Language

All content in this vault is written in **English (en-US)**.
When creating or updating entities, use English for all text content.
Frontmatter keys remain in English. Technical terms in English are acceptable.

## Domains

This vault uses the following domain tags:

- `domain/backend`
- `domain/frontend`
- `domain/infra`
- `domain/data`
- `domain/platform`
- `domain/security`
- `domain/research`
- `domain/agent-ops`

When creating entities, use `domain/<name>` tags from this list.
New domains can be added as the vault grows.

## Quick Reference

| Action | Skill |
|---|---|
| Search and query the vault | `/bedrock:ask` |
| Ingest external sources (Confluence, Google Docs, GitHub repositories, remote URLs, and any docling-supported file format — DOCX, PPTX, XLSX, PDF, HTML, EPUB, images, and more) | `/bedrock:teach` |
| Create or update entities manually | `/bedrock:preserve` |
| Deduplicate and check vault health | `/bedrock:compress` |
| Re-sync entities with external sources | `/bedrock:sync` |

## Import provenance

Entities imported from Claude Code memory files list each source in `sources:` as `{path, sha256}`. Re-imports upsert by source path; never duplicate.

## Note rules

- **One idea per note.** When a note grows a second subject, split it.
- **2–3 selective links.** Link only where A changes how you see B; no link lists or "see also" dumps.
- **Update `log.md` on changes.** Append one line at the bottom for every note created, updated, promoted or deleted (format in its header); never edit past lines.
- **`index.md` is generated.** Never edit it by hand; `bun .bedrock/recall/hook.ts index` rewrites it.
- `index.md` and `log.md` are system notes: not graph nodes, and not part of recall, orphan or incoming-link checks (`/bedrock:healthcheck`, `/bedrock:compress` and any link analysis included).

## Capture and recall

Four global Claude Code hooks (`~/.claude/settings.json`) run `bun .bedrock/recall/hook.ts <subcommand>` with absolute paths. The hook always exits 0 and never blocks or changes a prompt; errors go to `.bedrock/recall/hook.log`.

| Hook | Subcommand | What it does |
|---|---|---|
| SessionStart | `session-start` | Adds a few lines of context: the vault path, recall, `/bedrock:ask`, `/bedrock:preserve`, fleeting intake, `index.md`. |
| UserPromptSubmit | `recall` | When the prompt names something in the vault, adds a "Brain recall" block: up to 5 notes (path, title, one-line summary, about 800 characters). Trivial and off-topic prompts get nothing. BM25 over `.bedrock/recall-index.json`, rebuilt first whenever a note changed. |
| Stop, SessionEnd | `sync` | Captures Claude Code memory files (`~/.claude/projects/*/memory/*.md` except `MEMORY.md`) that the vault does not hold yet into `fleeting/`, then appends to `log.md` and refreshes the recall index, `index.md` and the graph page. Never commits or pushes. |

**`fleeting/` is the intake.** A memory file is in the vault when some note's `sources` lists its path with its current sha256. A new file becomes `fleeting/<project>--<file>.md` (`status: raw`). A changed one becomes, or updates, that note, with `updates:` linking the notes that hold the earlier version. The hook never writes curated notes. It updates a fleeting note in place only while it can prove the note is still exactly what it wrote; otherwise (edited, or not written by the hook) it writes a `-2` sibling. Deleting a fleeting note dismisses that version, which comes back only when its memory file changes. A file that matches a secret pattern is skipped, and every sync warns about it until it is fixed. To promote, fold the note into a permanent or bridge note with `/bedrock:preserve`, then set `status: promoted` and `promoted_to`. Hook output is committed with the normal git workflow.

Manual commands, from the vault root:

```bash
bun .bedrock/recall/hook.ts index              # rebuild the recall index and index.md
bun .bedrock/recall/hook.ts sync --dry-run     # what a sync would write
bun .bedrock/recall/hook.ts sync               # capture now
echo '{"prompt":"..."}' | bun .bedrock/recall/hook.ts recall
bun .bedrock/recall/selftest.ts --timing       # payload tests, recall quality table, timings
bun .bedrock/graph/watch.ts                    # optional live graph watcher, started by hand
```

**Rollback:** delete the four hook entries whose command runs `.bedrock/recall/hook.ts` from `~/.claude/settings.json` (`settings.json.bak-brain-20261003` is the file as it was before). Delete `.bedrock/recall-index.json` and `.bedrock/sync/`, and revert the commits if the tooling should go too. Fleeting notes are ordinary notes: archive or delete them as needed.
