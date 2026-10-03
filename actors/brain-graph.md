---
type: actor
name: "brain-graph"
aliases: ["Brain Graph", "Brain Graph Watcher", "brain-graph.html", "Brain Graph Page & Live Watcher"]
category: "dashboard"
description: "Interactive D3 graph page of the brain vault, rebuilt by a background watcher whenever notes change (the watcher is started by hand and does not survive a reboot)"
repository: "https://github.com/pjg93-222/brain-vault-political-systems"
stack: "Bun 1.4.2 · TypeScript · D3 7.9.0 (cdnjs) · HTML/CSS"
status: "active"
team: ""
criticality: "low"
pci: false
known_issues:
  - "The watcher does NOT persist across reboots: no autostart is installed, so start it by hand from the vault root with `bun .bedrock/graph/watch.ts`; until then brain-graph.html goes stale"
  - "snapshot.ts pins the counts of its last deliberate update and fails once notes are added or relinked; update SNAPSHOT when the vault has legitimately grown"
  - "Light-mode contrast is low for some type colours (discussion yellow is about 1.6:1 on the light surface); the dark default mitigates this"
  - "The D3 script tag has no integrity (SRI) hash"
  - "Not tested in Firefox or Safari"
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "capture-recall@agent"
tags: ["type/actor", "status/active", "domain/frontend", "domain/agent-ops"]
---

# brain-graph

> Self-contained interactive graph page of the brain vault, rebuilt by a manually started background watcher whenever notes are added, changed or removed.

## Details

| Field | Value |
|---|---|
| Repository | tooling is tracked in the vault repo [brain-vault-political-systems](https://github.com/pjg93-222/brain-vault-political-systems) under `.bedrock/graph/` |
| Output | `C:\Users\pgoff\Documents\brain-graph.html`: one self-contained file, written beside the vault and never inside it |
| Stack | Bun 1.4.2 (winget install) · TypeScript · D3 7.9.0 from cdnjs · HTML/CSS |
| Status | active |
| Criticality | low |
| PCI | no |
| Team | none |

## Dependencies

- Depends on [[brain-vault-political-systems]]: the page is built from that vault's notes, which the tooling only reads. It lives inside that vault's repo, in the hidden `.bedrock/graph/` folder that Obsidian, the graph and the watcher all skip.
- Needs network access to `cdnjs.cloudflare.com` when the page is opened, because D3 7.9.0 is its only external request (the publish gate rejects any other URL).
- Runs on Bun 1.4.2; the watcher's pid check also calls `powershell.exe`.

## Tooling

- Files in `.bedrock/graph/`: `common.ts`, `extract.ts`, `checks.ts`, `build.ts`, `verify.ts`, `snapshot.ts`, `watch.ts`, `template.html`, `style.css`, `app.js`. They are tracked in git (`5da6a8d`, `44caa3d`); `watch.log` and `watch.pid` are git-ignored.
- All paths derive from where the scripts live, so moving or renaming the vault does not break them. By default the page goes to `<vault's parent>\brain-graph.html`, and `build.ts` refuses to write inside the vault.

## Dev Commands

Run these in `.bedrock/graph`:

```bash
bun build.ts       # rebuild the page now (exactly what the watcher runs); the last output line is BUILD_RESULT {json}
bun verify.ts      # full report on the built page, ending with the publish gate (exit 1 if the gate fails)
bun snapshot.ts    # asserts the pinned counts (notes, links, mentions, per type); EXPECTED TO FAIL once notes are added
bun extract.ts     # read-only audit of the vault graph: counts, warnings, notices, top notes by degree
```

Test builds of another vault need `--vault <dir> --out <file>` together, so a test never overwrites the live page.

## Watcher (`watch.ts`)

Start it by hand after every reboot or logon. Nothing starts it automatically:

```bash
cd /c/Users/pgoff/Documents/brain && bun .bedrock/graph/watch.ts
```

The scripts resolve their paths from their own location, so the working directory does not change what it does.

- **Polling:** every 15 s it walks the vault (hidden folders such as `.git`, `.obsidian`, `.bedrock` and `.trash` are skipped) and builds a signature from the sorted path, size and mtime of every `.md` file.
- **Settling:** when the signature differs from the one the page was last built from, it waits until the vault has been unchanged for 3 s (an editor autosaving, a git pull or a sync still writing), then runs `bun build.ts` as a hidden child process with a 120 s timeout.
- **Startup and retry:** it also builds once when it starts, so the page is current after a start even if notes changed while it was not running. After a failed build it retries once, 60 s later, then waits for the next change.
- **Never edits notes:** it only lists and stats `.md` files (root `CLAUDE.md`, `index.md` and `log.md` are not part of its signature). It writes `watch.pid` and `watch.log` in `.bedrock/graph/` and, through `build.ts`, the page (atomically).
- **Recall index:** since 2026-10-03, after every rebuild it also runs `bun ../recall/hook.ts index`. That refreshes the recall index and the generated `index.md`, rewritten only when its content changes, and logs one `recall-index` line.
- **Single instance:** `watch.pid` holds the running watcher's id. A second start exits quietly and logs "start ignored" when the first is alive. A stale pid file (for example after a reboot, when the number may belong to any process) is only trusted if that process's command line names `watch.ts`.
- **Log:** `watch.log` gets one line per event (timestamp, trigger, what changed, result, duration, note and link counts), rotated at 1 MB with one `.old` kept. The last recorded rebuild on 2026-10-03 (16:58) reported 74 notes, 260 links, 0 warnings.
- **State on 2026-10-03:** no watcher process was running and no autostart shortcut is installed, so the page on disk reflects the vault as of that last rebuild until the watcher is started or `bun build.ts` is run.
- **Idle cost** reported when it was set up: about 0.05% of one core and about 29 MB of RAM (not re-measured, since no watcher is running now).

To stop it, check that the pid file is not stale before killing anything:

```powershell
$p = Get-Content 'C:\Users\pgoff\Documents\brain\.bedrock\graph\watch.pid'
(Get-CimInstance Win32_Process -Filter "ProcessId=$p").CommandLine    # must name watch.ts; if not, the pid file is stale: stop nothing
Stop-Process -Id $p
```

Autostart: none is installed. If it is wanted, a Startup-folder shortcut that launches `bun .bedrock/graph/watch.ts` hidden would start it at every logon. Without the watcher, the capture hook's sync still rebuilds the page whenever it changes the vault.

## Build rules

- The extractor includes notes from all eight entity folders, any other top-level folder, and notes in the vault root, except the root `CLAUDE.md` and the system notes `index.md` and `log.md` (the `ROOT_NON_NOTES` list in `common.ts`). It skips `_template.md` everywhere and every hidden folder.
- Type: a recognised frontmatter `type` wins; a missing type falls back to the folder's type; an unknown explicit type, or an untyped note outside the entity folders, becomes "other" (grey `#757575`). Malformed YAML or an unclosed frontmatter block is logged as a warning, and the note still appears.
- Only these fields reach the page for each note: id, folder, type, title, status, domains, category, updated date, tagline and degree. The `sources` block is dropped before anything else reads the note.
- A link is an undirected pair of notes joined by at least one resolved wikilink (frontmatter and body); its weight is the number of mentions. Unresolved wikilinks are counted but drawn nowhere.

## Privacy gate

- `build.ts` writes the page to a temporary file beside the output and checks that file before it may replace the live page. Emails, URLs (shortened to their host) and local paths are sanitised out of every text value first.
- The gate then blocks publishing if any email, 64-character hex hash, `sha256` text, `sources` key, `.claude` text, `file://` URL, drive path or `/Users/` path remains, if the structure or counts disagree, or if the CSP check fails. On failure the previous page is kept and the reason is reported.
- The page ships a CSP whose `script-src` pins the two inline scripts by SHA-384 hash, with no `unsafe-inline` or `unsafe-eval`.
- **Rule for note authors:** the first `>` blockquote line after the H1 (the tagline), together with the name or title, status, category and domain tags, is what the page shows. Keep taglines free of file paths, hex hashes, commit SHAs, `.claude` and emails; bodies may contain them.

## Page features

- Dark by default, with a Light/Dark toggle whose choice is remembered in `localStorage`.
- Type chips double as the legend, and Shift+click isolates one type. There is also a domain filter, search, Fit, Reset, zoom buttons, a Table view and a Shapes toggle (a shape per type as a second cue besides colour).
- Hover shows a tooltip. Clicking a note highlights its neighbours and opens a side panel with an "Open in Obsidian" link (`obsidian://open?vault=brain&file=...`).
- Keyboard navigation is supported.

## Known Issues

- **Watcher does not persist across reboots.** Start it by hand (command above). Until then the page goes stale.
- **`snapshot.ts` fails after any vault growth.** It pins the counts of its last deliberate update on purpose and is deliberately not run by the watcher. `verify.ts` and the publish gate are the checks that stay valid for any vault.
- **Light-mode contrast.** Some type colours are weak on the light surface (discussion yellow `#F1C40F` is about 1.6:1); the dark default mitigates this.
- **No SRI on D3.** The script tag for D3 has no `integrity` attribute.
- **Browsers.** Not tested in Firefox or Safari.

## Related Actors

- [[brain-vault-political-systems]] - Private Obsidian + Bedrock knowledge vault that this page visualises; the tooling is tracked in its repo

## Related Topics

- [[2026-10-feature-brain-vault-setup]] - Brain vault setup and Claude memory import: setup choices, import decisions, verification, dependencies, graphify review and open items (2026-10-03)

## Related People

- [[paul-goff]] - Vault owner; the graph page and watcher are his tooling (the watcher is started by hand)
