---
type: actor
name: "Claude Code harness"
aliases: ["Claude Code tooling"]
category: "tool"
description: "Harness-level behaviors of Claude Code on this workstation that cause silent damage: MEMORY.md is the session-start loading contract, Bash heredocs mangle backslashes/$/apostrophes, SendMessage to a running Workflow agent spawns a duplicate, GateGuard blocks git commit --amend, Read renders PDFs only in sessions started after the poppler install."
repository: ""
stack: "Claude Code (CLI/desktop app), Bash and PowerShell tools, ECC GateGuard hook, Workflow/Agent/SendMessage tools, winget-installed poppler 25.07.0"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "MEMORY.md is the loading contract: never split it or move its lines to another file (silent deletion from every future session's context)"
  - "Bash-tool heredocs halve backslashes, strip PowerShell $ sigils and break on apostrophes, even with a quoted delimiter"
  - "SendMessage to a running Workflow subagent spawns a DUPLICATE resume that writes the same files"
  - "ECC GateGuard pre:bash:gateguard-fact-force refuses git commit --amend; delegated executor subagents rewrite the Co-Authored-By trailer"
  - "Read renders PDFs only in sessions started after the poppler install (PATH captured at session launch)"
  - "PowerShell -like with a literal [ throws on every line; a filter that fails open to empty plus Set-Content truncates a file"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sendmessage-workflow-agent-duplicates-2026-09-24.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sendmessage-workflow-agent-duplicates-2026-09-24.md", sha256: "19c341994124a526ee1d0facc683ce13bea8a2144ec1bebfc21fb2ab7b82ae79"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/memory-index-is-the-loading-contract-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\memory-index-is-the-loading-contract-2026-09-18.md", sha256: "5b4425e1fb079ec4863441d812eff877c3b5bd902dacd03330f59ee6c93797eb"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/receipt-line-pins-vs-live-tree-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\receipt-line-pins-vs-live-tree-2026-09-18.md", sha256: "a93396fc6bd5d4cc9a1e248fcb6613f4d1b087fdb274366af24734af56fec4b4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/shell-heredoc-mangling-2026-08-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\shell-heredoc-mangling-2026-08-19.md", sha256: "945c64c11c006486b39fd74d3324d7ac7dc2d2290a6ea813fd0d3f8f20a83c0b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/poppler-pdf-rendering-2026-08-14.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\poppler-pdf-rendering-2026-08-14.md", sha256: "923256f4944de593fb9cddb76f585f1194e0d4bbcd2ba561d09c14bf461cf3b4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/memory-index-restore-incident-2026-07-26.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\memory-index-restore-incident-2026-07-26.md", sha256: "b5dec0466c8f3694a00d8775d611e6278aada3d5d7d0ac88fa2a005717ad1c18"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# Claude Code harness

> Harness-level behaviors that bite lanes: MEMORY.md is the session-start loading contract, Bash heredocs mangle backslashes/`$`/apostrophes, SendMessage to a running Workflow agent spawns a duplicate, GateGuard blocks `git commit --amend`, Read renders PDFs only in sessions started after the poppler install.

## Details

| Field | Value |
|---|---|
| Repository | none (tooling; memory directory holds `MEMORY.md` and topic files) |
| Stack | Claude Code harness; Bash (Git Bash) and PowerShell tools; Workflow/Agent/SendMessage; ECC GateGuard hook; poppler 25.07.0 via winget |
| Status | active |
| Criticality | high |
| PCI | no |
| Team | none |

## Dependencies

- Depends on: the memory directory (the exact filename `MEMORY.md` is read into context at session start; nothing else in the directory is), the session-start system reminder (de-facto backup of MEMORY.md), the harness PATH captured at session launch, the ECC GateGuard hook, and the PowerShell/Bash tool quoting layer.
- Depended on by: every lane that reads memory or runs scripts. Related actors: [[codex-executor]] (Codex executor lane), [[lg-gram-workstation]] (the machine; AppX/PATH issues are in [[2026-07-incident-workstation-stability]]). Related topics: [[2026-06-working-agreement-tooling-and-environment-traps]] (the rules), Agent orchestration and model tiering rules (SendMessage rule), Verification and evidence standards (committed-vs-live receipts).
- Related memory notes: `powershell-visible-work`, `dont-drop-context-anchor-memory`, `ask-before-substantive-changes`, `verify-dont-infer-completion-2026-08-04`, `spawned-task-premise-may-be-stale-2026-09-14`, `committed-vs-live-drift-2026-09-13`, `go-faster-directive-2026-09-16`, `ui-finalize-after-reboot-2026-09-23`, `live-tree-branch-state-2026-07-14`, `project-brain-toolkit-2026-08-11`.

## Flows

- Session start: the harness reads `MEMORY.md` (exact filename) into context; topic files are loaded only on demand.
- Shell: scripts are written with the Write tool then run by path; PowerShell with variables uses the PowerShell tool directly.
- Workflow subagents: course changes are made by TaskStop and relaunch/finish with a fresh Agent, never by SendMessage.
- Commits: get the message right the FIRST time (GateGuard blocks `--amend`).

## Dev Commands

```bash
# verify a committed receipt's file:line against the committed tree, never the working copy
git show HEAD:<path> | wc -l
git show HEAD:<path> | grep -n "<call>"

# winget (poppler for Read PDF rendering)
winget install --id oschwartz10612.Poppler --exact
winget upgrade oschwartz10612.Poppler
winget uninstall oschwartz10612.Poppler        # full revert (files + PATH entry)

# refresh PATH in a shell to verify the install in a pre-install session
$env:PATH = [Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [Environment]::GetEnvironmentVariable('PATH','User')

# unsafe PowerShell pattern (do not use; wildcard [ is a character class)
$_ -like '- [Codex executor lane 2026-07-18]*'     # use -match (escape \[) or .StartsWith() instead

# byte-level verification of escape-sensitive edits (Python): build backslash as chr(92); assert chr(8) is absent
```

## Known Issues

1. **MEMORY.md is the session-start loading contract (2026-09-18).** See "MEMORY.md" below. Never split the index or relocate lines.
2. **Bash heredocs mangle script text (2026-08-19).** Backslashes are halved, PowerShell `$` sigils stripped, apostrophes break the heredoc, even with `<<'EOF'`.
3. **SendMessage to a running Workflow agent spawns a duplicate (2026-09-24).**
4. **GateGuard blocks `git commit --amend`; executor subagents rewrite the co-author trailer (2026-09-18).**
5. **Read renders PDF pages only in sessions started after the poppler install (2026-08-14).**
6. **PowerShell `-like` with a literal `[` truncated MEMORY.md to a BOM (2026-07-26).**

## MEMORY.md: the loading contract

### Restore incident, 2026-07-26 (older; complementary to the 2026-09-18 rule)
- While compacting the memory index, a PowerShell filter `$_ -like '- [Codex executor lane 2026-07-18]*'` was run. In PowerShell wildcards `[...]` is a character-class, so the pattern is invalid and raises `WildcardPatternException` on EVERY line; the `ForEach-Object` produced nothing and `Set-Content` wrote an empty file. MEMORY.md went from 21.1 KB to 3 bytes (BOM only) in one command. All 67 topic .md files were untouched; only the index died.
- Recovered by rebuilding the index from the copy of MEMORY.md that ships in the session-start system reminder, re-applying that session's edits, and compacting the three longest entries (codex-executor-lane 3472 chars, mentat-pipeline 1337, legislative-audit 1119) whose detail already lived in their topic files. Net 21.1 KB to ~13 KB.
- **Why:** a destructive whole-file write was gated on a filter that could fail open to empty. `Set-Content` happily writes nothing; there is no built-in "refuse to truncate" guard, and there is no backup of MEMORY.md anywhere on disk.
- **How to apply:**
  - Never use `-like` with a literal `[`: use `-match` (regex, escape as `\[`) or `.StartsWith()`.
  - Prefer the Write/Edit tools for memory-file writes. Paul's visible-PowerShell rule (`powershell-visible-work`) is about showing data extraction and content in the transcript, not about routing risky whole-file rewrites through shell quoting.
  - Before any whole-file rewrite driven by a filter, assert the result is non-empty and roughly the expected line count first; only then write.
  - The session-start system reminder is the de-facto backup of MEMORY.md: if the index is ever lost mid-session, rebuild from there before the context is gone.

### Loading-contract rule, 2026-09-18 (newer; adds: never split or relocate MEMORY.md lines)
- 2026-09-18: compacting the memory index, a split was proposed: `MEMORY.md` for the active lanes plus a `MEMORY-ARCHIVE.md` for the July/August entries, because 146 index lines could not be squeezed under a 17.1 KB target. Paul rejected it and named the thing missed: **`MEMORY.md` is not merely the index, it is the loading contract.** That exact filename is what gets read into context at session start. Nothing else in the directory is.
- So the split would not have archived anything: every line moved to a second file drops out of every future session's context while looking perfectly filed (topic files still exist, lines still sit under a heading, nothing errors). A later session simply reasons without facts it can no longer see, and never learns they were there.
- **Why the target could not be met by compression** (146 entries; chars, KB = chars/1024): the index's mass is structural, not verbose.
  - filenames alone: ~5,300 chars (~5.2 KB), exact strings, not compressible;
  - filenames + markdown syntax + section headings + the verbatim Standing directives: ~9,600 chars (~9.4 KB) incompressible before any title or hook;
  - floor with every hook fact kept and titles crushed to ~8 chars average: 18,601 chars (18.17 KB).
  - Hooks averaged 75 chars and were already telegraphic ("hung console holds runtime.lock"). A target much under 18 KB would delete facts (commit SHAs, test counts, reconciliation caveats). Landed at 18.66 KB with every entry and every ruling intact, comfortable against the 24.4 KB read limit.
- **Re-measured 2026-09-19** (Paul: "trim MEMORY.md"): 152 entries, 19.89 to 18.59 KB (chars/1024, the unit the size hook reports; bytes run ~0.3 KB higher because of the em dashes). Every link kept, same order, same sections. Removed: commit SHAs, packet paths and date suffixes in titles (all still in the topic files), plus the seven closed `mentat-failings-lane-s2..s8` lines merged into ONE line carrying all seven links. The floor predicted above (18.17 KB at 146 entries + 6 entries x ~70 chars = 18.57) held to within 0.02 KB, so the hook's 17.1 KB target is about 1,500 chars BELOW what 152 entries can carry with their facts. Only fewer ENTRIES gets there: merging closed lanes' topic FILES (candidates: mentat failings S2-S8 to 1 file; the staffer lanes; the July psychometrics notes). That is a consolidation job with cross-links to repair, Paul's to order, not a trim. Safe method: draft in scratchpad, assert same links in same order, every target on disk, headings equal, no BOM/CR, sane size, backup, byte copy, read back.
- **How to apply:**
  - Treat the filename `MEMORY.md` as the contract. Never split the index, and never relocate index lines into `MEMORY-ARCHIVE.md` or any other file, however tidy the result looks.
  - When the index nears its read limit, do the two things that keep the facts inside the loaded file: compress the hooks, and consolidate stale ENTRIES into merged topic files (fewer, bigger memory files means fewer index lines). Merging entries is legitimate; relocating lines is not.
  - Filenames run ~36 chars each and are irreducible, so entry count, not hook length, sets the floor. Reducing the number of entries is the only lever with real headroom.
  - Merging index lines for one lane's consecutive sessions saves only ~25 chars per line, because the filenames dominate. Worth doing for tidiness, not for bytes.
  - When a size target collides with content, report the arithmetic and let Paul rule instead of paying the cost silently. Meaning beats bytes: his own rule is that a negation is "worth more than any byte saved."
- Contrast: the 2026-07-26 incident was a **mangling** (MEMORY.md truncated to 3 bytes by one PowerShell command: loud, obvious, recoverable from the session-start system reminder). The 09-18 split would have been an **invisible deletion** (file intact, entries apparently filed, context quietly smaller in every session afterward). A mangling announces itself; this does not.
- Related notes: `memory-index-restore-incident-2026-07-26`, `dont-drop-context-anchor-memory`, `ask-before-substantive-changes`.

## Bash heredoc mangling (2026-08-19)

In this environment, passing script text through the Bash tool corrupts it even with a quoted heredoc delimiter (`<<'EOF'`):
- **Backslashes are halved.** Python source `"\\\\b"` reaches the interpreter as `"\\b"` and writes `\b` to disk instead of `\\b`.
- **PowerShell `$` sigils are stripped** when PowerShell is invoked via the Bash tool: `$deadline` / `$n` vanish and the script dies on a parse error in under a second.
- **Apostrophes break the heredoc** (`Children and Teens' Online Privacy` killed one).
- **Why:** on 2026-08-19 this nearly shipped a real defect. A word-boundary fix wrote `new RegExp('\b'+w+'\b')` with ONE backslash; in JavaScript `'\b'` is the backspace character U+0008, not a word-boundary escape, so the matcher would have silently matched nothing on every bill while looking correct in review. `git diff` rendered it identically to the correct form; only a byte-level check (`ord()` / `chr(92)` comparison) caught it.
- **How to apply:** write scripts with the Write tool, then run them by path (no multi-line script text through a heredoc); build a needed backslash as `chr(92)` in Python; for PowerShell with variables use the PowerShell tool directly, never `powershell -Command` through Bash; never trust `git diff` to reveal an escaping error: read the bytes back and pin the correct form in a test (assert the two-backslash sequence AND assert `chr(8)` is absent). Related: `powershell-visible-work`, `verify-dont-infer-completion-2026-08-04`.

## SendMessage to a running Workflow agent duplicates it (2026-09-24)

- On 2026-09-24 (session 5ab381bb, r5 fix run), SendMessage was sent to two workflow subagents (fix2-men, fix2-mel) by agent id. Both times the tool said "Resuming agent ...". It started a second copy from the transcript while the workflow's original kept running. The two fix2-mel copies overwrote each other's apply scripts and logs in the same lane folder, and one LIVE apply was refused. The workflow never saw the wrap-up order, because its own agent ran on unchanged.
- **Why:** workflow agents are not addressable mailboxes. A send to a live workflow agent id spawns a parallel resume, doubling the writers on the same files. Paul's LIVE tree nearly got two concurrent applies.
- **How to apply:** never SendMessage a workflow subagent that is still running. To change a running workflow's course, stop it (TaskStop), then relaunch or finish with a fresh Agent carrying the new instruction, or wait for it to finish. Put coordination facts (e.g. a peer session's file list) into the NEXT agent's prompt, not a message. SendMessage is fine for Agent-tool background agents and for other sessions. Related: `go-faster-directive-2026-09-16`, `ui-finalize-after-reboot-2026-09-23`.
- Also (from the quant-skill lane, 2026-10-01): run long waits from the MAIN session or Agent-tool agents, never workflow agents, because their Monitor events die when their turn ends.

## Receipt line pins vs the live tree; GateGuard and co-author trailer (2026-09-18)

- Paul ruled on 2026-09-18 that a `file:line` citation living inside committed source pins to COMMITTED source, not the live tree. The `repo.workbook` producer text in `fec/audit/build_system_manifest.py` cited `build_media_blend.py:479`; at HEAD that file is 467 lines with `save_workbook_atomic` at `:466`. 479 was read off the live tree's dirty working copy (480 lines, 13 lines of unlanded work). History: `:451` was right until `a0c45a709` moved it to `:466`, so the correct re-pin was 451->466, not 451->479. Landed as `a84842eb7` on `claude/amazing-lewin-409893`.
- **Why:** a receipt verified against one machine's scratch state describes that scratch state, not the repository, and silently rots for everyone else. Same defect class the commit it corrected was written to fix, which is how it slipped through twice.
- **How to apply:** before editing ANY `file:line` inside `build_system_manifest.py` (or any other committed receipt), verify with `git show HEAD:<path> | wc -l` and `git show HEAD:<path> | grep -n "<call>"`. Never read the number out of the working copy. Sweep EVERY citation in the block, not just the ones asked about (per `dont-drop-context-anchor-memory` and the brain's DE-004: fixing a headline without sweeping the body).
- Two session traps found the same day:
  1. The ECC GateGuard `pre:bash:gateguard-fact-force` hook refuses `git commit --amend` even after the facts are presented (three attempts): do not fight it, and do not disable the gate to push a cosmetic change through; get the message right the FIRST time.
  2. A delegated `fable-baton:executor` subagent will REWRITE the `Co-Authored-By:` trailer to its own model name (Sonnet 5) instead of the session's (Opus 5): state in the delegation prompt that the trailer is verbatim and not to be second-guessed.
- Related: `verify-dont-infer-completion-2026-08-04`, `spawned-task-premise-may-be-stale-2026-09-14`, `committed-vs-live-drift-2026-09-13`.

## poppler / PDF rendering in Read (2026-08-14)

- **poppler 25.07.0 is installed** (2026-08-14, spawned-task session): `winget install --id oschwartz10612.Poppler --exact`: per-user portable zip, SHA256-verified by the winget manifest, MIT; the VC++ x64 runtime dep was already present so nothing machine-wide changed. Winget put the package's `Library\bin` (under `%LOCALAPPDATA%\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\`) directly on the user PATH, exposing `pdftoppm`, `pdftotext`, `pdftocairo`, `pdfinfo` and the rest.
- **Why:** the Read tool's PDF page rendering shells out to `pdftoppm`; its absence blocked a 5-agent PDF fan-out on 2026-08-14 (PyMuPDF text extraction loses figures/layout).
- **How to apply:**
  - Read on a .pdf works only in Claude Code sessions STARTED AFTER the install (the harness captures PATH at session launch). In a pre-install session the error is still "pdftoppm is not installed": that is stale session PATH, not a broken install. Verify with a registry-refreshed shell (`$env:PATH` = Machine + User from `[Environment]::GetEnvironmentVariable`) before concluding anything is wrong.
  - "Syntax Error: No display font for 'Symbol'/'ArialUnicode'" on stderr is a cosmetic glyph warning, common on Windows; the page still renders.
  - Upgrade: `winget upgrade oschwartz10612.Poppler`. Full revert (files + PATH entry): `winget uninstall oschwartz10612.Poppler`. Winget's pin (25.07.0-0, Aug 2025) may trail the GitHub releases page.
- Related: `live-tree-branch-state-2026-07-14` (this box's multi-lane environment), `project-brain-toolkit-2026-08-11`.

## Decisions / history

- ~~Memory index may be compacted by relocating old entries to an archive file~~ (proposed 2026-09-18) - rejected by Paul the same day; the loading-contract rule stands (kept because the proposal explains why index lines must never be relocated). The 2026-07-26 incident rules (use `-match`/`.StartsWith()`, assert non-empty before a whole-file rewrite, rebuild from the session-start reminder) remain valid and complementary.
- Receipt line-pin practice (2026-09-18 ruling by Paul): `file:line` citations pin to COMMITTED source, verified with `git show HEAD:<path>`; the earlier reading of numbers off the live working tree (479 vs 466) was the defect.

## Timeline

| Date | Event |
|---|---|
| 2026-07-26 | MEMORY.md truncated to 3 bytes by a PowerShell `-like` with `[`; restored from the session-start reminder |
| 2026-08-14 | poppler 25.07.0 installed via winget; Read renders PDFs only in later sessions |
| 2026-08-19 | Heredoc mangling nearly ships a `\b` backspace regex defect |
| 2026-09-18 | Paul rejects MEMORY.md split (loading contract); receipt line-pin ruling; GateGuard/trailer traps |
| 2026-09-19 | MEMORY.md re-measured and trimmed 19.89 to 18.59 KB (152 entries) |
| 2026-09-24 | SendMessage to Workflow agents fix2-men / fix2-mel spawned duplicates |

## Related Actors

- [[codex-executor]] - Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17
- [[lg-gram-workstation]] - Paul's LG Gram 17Z90UB Windows 11 laptop: NPU BSODs, AppXSvc leak, Codex MSIX loop, C: disk exhaustion, OneDrive/Carbonite gaps
- [[brain-vault-political-systems]] - Private Obsidian + Bedrock knowledge vault; this harness's per-project auto-memory files were imported into it on 2026-10-03

## Related Topics

- [[2026-06-working-agreement-tooling-and-environment-traps]] - Feedback rules for tool/shell traps: heredoc mangling, MEMORY.md loading contract, visible PowerShell, congress.gov URL kept verbatim.
- [[2026-07-incident-workstation-stability]] - LG Gram stability incidents: NPU BSOD loop, ongoing Kernel-Power shutdowns, AppXSvc commit leak, ChatGPT/Codex MSIX wedge, poppler install
- Agent orchestration and model tiering rules - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.
- Verification and evidence standards - Verify, never infer: census before mechanism claims, repo-wide existence checks, scout NOT FOUNDs disproved, HEAD-pinned cites.
- [[2026-10-feature-brain-vault-setup]] - Brain vault setup and Claude memory import: this harness's memory files were consolidated into the private brain vault (2026-10-03)
