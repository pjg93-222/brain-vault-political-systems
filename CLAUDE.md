# Brain — CLAUDE.md

> This vault is powered by the [Bedrock plugin](https://github.com/iurykrieger/claude-bedrock).
> Plugin-level instructions (entity types, writing rules, tags, git workflow) are loaded automatically.
> This file describes what is specific to THIS vault.

## Mandatory desktop release contract

Before building, packaging, distributing or promoting a Melange, Mentat or Terrier Windows release, read and enforce [[mandatory-desktop-release-signing]] (`concepts/mandatory-desktop-release-signing.md`). This is the user's explicit standing instruction of 2026-10-22: complete final-payload signatures and approved publisher `0EBC9AD04E929CDD731EDB5D278A4143BC3D3D30` are blocking release gates. Preserve valid vendor signatures, retain SHA-256 evidence for the exact distributed bytes, and never infer recipient policy acceptance from a certificate match. No private signing material belongs in the vault.

## Purpose

Personal engineering brain: consolidates Claude Code memory files from all projects (systems, projects, decisions, working preferences) into one linked knowledge base.

## Language

All content in this vault is written in **English (en-US)**.
When creating or updating entities, use English for all text content.
Frontmatter keys remain in English. Technical terms in English are acceptable.

## Domains

This vault uses the following domain tags:

- `domain/backend` — pipeline and server code structure
- `domain/frontend` — product UIs Paul reads (Melange dashboard, Mentat console)
- `domain/infra` — workstation, scheduling, disks, backups, pods, mirrors
- `domain/data` — collection, ETL, datasets, scoring artifacts
- `domain/platform` — tooling agents and developers run on (git practice, Claude Code harness, Codex lane, skills, connectors, this vault)
- `domain/security` — credentials and key handling
- `domain/research` — methodology, validation, models of behaviour
- `domain/agent-ops` — rules and practice for operating agents (working agreements, review discipline, the owner's standing instructions to agents)

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
- **Size limit 50 KB** (1 KB = 1024 bytes; `check.ts` default; applies to every curated note, not to `fleeting/`). A larger note is split along its sub-topics: the original stays as a short hub (summary sections plus `## Parts`) and keeps every `sources:` entry; each part carries `part_of: "[[hub]]"`, opens with "`Part of [[hub]]`", and holds moved text verbatim; positional words ("above", "below") and section-name references that would point across a part boundary are rewritten as a wikilink to the note now holding the referent. A correction, "newest wins" note or superseding decision stays in the same note as the text it governs; only where that would pass 50 KB, or where the owner ruled it, does the governed part carry an explicit pointer line to the correction instead. `size_reason:` only for irreducible references (none today).
- **Titles and summaries.** The titles and summaries of existing notes are never edited; aliases may be added to help recall. New notes (parts, concepts) get their own titles and summaries.
- **Hubs and leaves.** Hubs (`projects/`, `concepts/`, `actors/`, `people/`, `teams/`) have no link cap, but every link must be real. Leaves (`topics/`, `discussions/`, every note with `part_of`) keep their home project, their family links (split parent, parts, sibling parts) and at most 3 other links, chosen where A changes how you see B. Every link is bidirectional. A dropped link becomes plain text (`[[x|y]]` -> y, `[[x]]` -> x's title; frontmatter `"[[x]]"` -> `"x"`); this replaces Bedrock's "never remove wikilinks" in this vault, and `bun .bedrock/reorg/conserve.ts` proves no text was lost.
- **Project maps.** Each project's `## Map` lists its notes by type with a one-line summary; parts follow their parent; every concept or actor in a Map links back to the project.
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

**`fleeting/` is the intake.** A memory file is in the vault when some note's `sources` lists its path with its current sha256. A new file becomes `fleeting/<project>--<file>.md` (`status: raw`). A changed one becomes, or updates, that note, with `updates:` linking the notes that hold the earlier version. The hook never writes curated notes. It updates a fleeting note in place only while it can prove the note is still exactly what it wrote; otherwise (edited, or not written by the hook) it writes a `-2` sibling. Deleting a fleeting note dismisses that version, which comes back only when its memory file changes. A file that matches a secret pattern is skipped, and every sync warns about it until it is fixed. Private text is redacted before it is written: `.bedrock/recall/private-patterns.json` (git-ignored, it holds the private values; same replacements as the history scrub) rewrites matches in the note, and a memory whose file name or `name:` matches one is dismissed instead of captured; without that file the hook captures nothing. To promote, fold the note into a permanent or bridge note with `/bedrock:preserve`, then set `status: promoted` and `promoted_to`. Hook output is committed with the normal git workflow.

Fleeting notes are intake awaiting organization. The Phase 2 reorganisation leaves every one untouched (no edit, delete, move or staging); `check.ts` exempts them from the size, unresolved-link, one-way and no-incoming checks in every gate and lists them separately, a `sources` pair held only by fleeting notes is reported, not enforced, and an incoming link from a fleeting note never counts for a curated note. They are organized in a later, separate pass. (Dated 2026-10-18: that pass ran on 2026-10-18; the 23 captures it found were already curated privately and were dismissed by deletion.)

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

## Reorganisation tooling

> **Historical (dated 2026-10-18).** Phase 2 is complete: its batches, fix rounds and STOP gate ran on `brain-reorg-2026-10-03` and were merged, and later work (for example `16dd15c` and the D-224 auto-captures) is committed normally on `main`. The branch test in G-pre, the G-split/G-post/G-commit gates, "commit only through `commit.ts`" and "never run `git push`, `git fetch` or `git pull`" applied to Phase 2 batches only; they bind a future reorganisation batch, not ordinary vault changes. The tools themselves stay in use as general gates: `check.ts --strict`, `conserve.ts` and `healthcheck.ts --strict`. The fleeting pass that Phase 2 deferred was done on 2026-10-18.

Phase 2 ("organize the brain") ran in batches on the local branch `brain-reorg-2026-10-03`; the plan is `.bedrock/reorg/plan.md`. Every command runs from the vault root in Git Bash. `N` is the batch number, `BASE_N` the HEAD it started from, `REQ` its required checks, `SP` a scratch directory outside the vault.

| Tool | What it does |
|---|---|
| `bun .bedrock/reorg/check.ts` | The gate: checks a-k (size limit, unresolved links, one-way links, no incoming link, sources invariant, domain tags, index.md, leaf link budget, split families, name collisions). `--strict` exits 1 on a failed required check; `--require` picks the required checks; `--pending-splits` lists notes waiting for their split batch; `--vault` checks another tree. Fleeting notes are listed apart and never fail. |
| `bun .bedrock/reorg/conserve.ts --base <commit> [--allow <file>]...` | Proves no note text was lost since `<commit>` (body line multiset, frontmatter keys, `sources` pairs). |
| `bun .bedrock/reorg/healthcheck.ts --strict` | Read-only port of `/bedrock:healthcheck`. |
| `bun .bedrock/reorg/verify-plan.ts` | Checks the plan's split tables against the current notes (the G-split gate). |
| `bun .bedrock/reorg/relink.ts --spec .bedrock/reorg/spec/keep.json (--pending <file> \| --no-pending) (--dry-run \| --apply \| --maps \| --reconcile)` | The link-model tool: trims notes to the keep spec (plain-text conversions, concept lines), writes each project's `## Map` and its back-links, and reconciles one-way links. Fixture tests: `bun .bedrock/reorg/relink.test.ts`. |
| `bun .bedrock/reorg/split.ts --spec <splits/x.json>... (--plan \| --apply \| --verify)` | The split tool: turns an over-limit note into a hub plus parts from its spec, moving text verbatim (`--plan` read-only, `--apply` writes parts, `## Parts`, Map rows and the logged positional rewrites, `--verify` re-runs the positional-reference detection and the 50 KB check on the written families). Fixture tests: `bun .bedrock/reorg/split.test.ts`. |
| `bun .bedrock/reorg/commit.ts` | The only way a batch commits. |
| `bun .bedrock/reorg/check.test.ts` | Fixture tests of the tools above. |

G-pre (start of every batch):

```bash
test "$(git branch --show-current)" = brain-reorg-2026-10-03
BASE_N=$(git rev-parse HEAD)
git diff --cached --quiet  # the real index holds nothing staged
git status --porcelain     # dirty paths may only be hook output: fleeting/*, log.md, index.md
```

G-split (end of batch 2, start of the split batches; `ONLY` = the batch's ids):

```bash
bun .bedrock/reorg/verify-plan.ts --fingerprints .bedrock/reorg/spec/split-fingerprints.txt [--only $ONLY] --s1 --s1-cross --json "$SP/gsplit-bN.json"
```

G-post (before the commit; `MSG` and `LOG` are the batch's commit message and log text; `WHEN` is set once so the exported and the committed log.md blobs are equal):

```bash
WHEN=$(date "+%Y-%m-%d %H:%M %z")
bun .bedrock/recall/hook.ts index
bun .bedrock/reorg/check.ts --strict --require $REQ --pending-splits .bedrock/reorg/spec/pending-splits.txt --json "$SP/gate-bN.json"
bun .bedrock/reorg/conserve.ts --base $BASE_N --allow .bedrock/reorg/ledger/batch-N-allow.txt
bun .bedrock/reorg/healthcheck.ts --strict
bun .bedrock/graph/build.ts && bun .bedrock/graph/verify.ts
X=$(cygpath -m "$(mktemp -d)")
bun .bedrock/reorg/commit.ts --batch N --expect-head $BASE_N --paths-file .bedrock/reorg/ledger/batch-N-paths.txt \
  --message "$MSG" --log "$LOG" --when "$WHEN" --export "$X"   # throwaway index; the real index is not written
bun .bedrock/reorg/check.ts --vault "$X" --strict --require $REQ --pending-splits "$X/.bedrock/reorg/spec/pending-splits.txt"
BRAIN_VAULT="$X" bun .bedrock/recall/selftest.ts      # deciding run: the would-be-committed tree
bun .bedrock/recall/selftest.ts                        # working tree: informational
git diff --cached --quiet                              # still nothing staged in the real index
```

If check `h` fails because the hook wrote a fleeting note after `hook.ts index`, re-run both lines. Once the pending-splits file is gone (the last split batch deletes it), drop `--pending-splits`. A failure anywhere here is rolled back before the commit (plan section 12).

Commit and G-commit:

```bash
bun .bedrock/reorg/commit.ts --batch N --expect-head $BASE_N --paths-file .bedrock/reorg/ledger/batch-N-paths.txt \
  --message "$MSG" --body-file "$SP/bN-body.txt" --log "$LOG" --when "$WHEN"
git show --stat HEAD               # the manifest + log.md (+ index.md when its content changed); no fleeting/ path
git diff --cached --quiet          # the real index matches the new HEAD
git status --porcelain             # only hook output left
```

STOP gate (only on a committed HEAD: after the last split batch's commit, then after every fix round's commit):

```bash
bun .bedrock/recall/hook.ts index
bun .bedrock/reorg/check.ts --strict                         # a b c d f g h i j k, no pending file
bun .bedrock/reorg/conserve.ts --base e2077ed $(for f in .bedrock/reorg/ledger/batch-*-allow.txt; do printf -- '--allow %s ' "$f"; done)
bun .bedrock/reorg/healthcheck.ts --strict                   # then run /bedrock:healthcheck (read-only) once and compare
bun .bedrock/graph/build.ts && bun .bedrock/graph/verify.ts
git cat-file -e HEAD:.bedrock/reorg/stale-statements.md      # the list of stale statements is committed
X=$(cygpath -m "$(mktemp -d)"); git archive HEAD | tar -x -C "$X"
bun .bedrock/reorg/check.ts --vault "$X" --strict            # before the selftest, which rewrites "$X/index.md"
bun .bedrock/graph/build.ts --vault "$X" --out "$X-page.html" && bun .bedrock/graph/snapshot.ts --file "$X-page.html"
BRAIN_VAULT="$X" bun .bedrock/recall/selftest.ts
```

**Healthcheck "clean"** means: setup OK, and 0 orphans and 0 dangling notes among curated notes. graphify-out is not used (this vault's graph is `.bedrock/graph` + `brain-graph.html`), so its MISSING status is not a finding; old content is reported only; fleeting notes are reported separately and never fail.

**Stale statements.** Statements that predate Phase 2 and fall outside the split work are not edited; the final batch lists them in `.bedrock/reorg/stale-statements.md` for a later pass. (Dated 2026-10-18: after Phase 2, a stale statement keeps its wording and gets a dated correction; the 2026-10-18 prune applied that to the 2026-10-11 clear-out rulings.)

**Commits.** Commit through `bun .bedrock/reorg/commit.ts` only: explicit paths from the batch manifest, a throwaway index, never a fleeting path, never hook output (it builds the committed `log.md` and `index.md` itself). Commits stay local: never run `git push`, `git fetch` or `git pull` during the reorganisation, whatever `.bedrock/config.json` says; the orchestrator pushes the branch and opens the PR after STOP.

**Re-imports are not split-aware.** A re-import from `.bedrock/import-manifest.json` would upsert the pre-split full text into split hubs; the import tooling must learn `part_of` families before it runs again.
