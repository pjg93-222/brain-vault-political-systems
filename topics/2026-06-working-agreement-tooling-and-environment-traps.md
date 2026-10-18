---
type: topic
title: "Tooling and environment traps"
aliases: ["Tooling and environment traps"]
category: "working-agreement"
status: "open"
people:
  - "[[paul-goff]]"
actors:
  - "[[claude-code-harness]]"
  - "draft-systems-r-pipeline"
objective: "Keep the standing rules that prevent silent damage from tooling and environment traps: write scripts to files (heredocs mangle), never split or relocate MEMORY.md lines, avoid PowerShell -like with [, do file writes through visible PowerShell (with honest exceptions), and keep the congress.gov advanced-search URL verbatim."
created_at: 2026-06-03
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/memory-index-is-the-loading-contract-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\memory-index-is-the-loading-contract-2026-09-18.md", sha256: "5b4425e1fb079ec4863441d812eff877c3b5bd902dacd03330f59ee6c93797eb"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/shell-heredoc-mangling-2026-08-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\shell-heredoc-mangling-2026-08-19.md", sha256: "945c64c11c006486b39fd74d3324d7ac7dc2d2290a6ea813fd0d3f8f20a83c0b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/memory-index-restore-incident-2026-07-26.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\memory-index-restore-incident-2026-07-26.md", sha256: "b5dec0466c8f3694a00d8775d611e6278aada3d5d7d0ac88fa2a005717ad1c18"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/powershell-visible-work.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\powershell-visible-work.md", sha256: "b58c86a319024dea28f54e3d5471d13cdbfe62c770215dcd33bcc1a83077c171"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/feedback_congress_url_no_json.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\feedback_congress_url_no_json.md", sha256: "f748020965e473c03ac4133372c594ffbf3ba95b47d04a9c01f7f1d1d5f3a379"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-03-35774e/memory/windows-hook-shell-git-bash.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-03-35774e\\memory\\windows-hook-shell-git-bash.md", sha256: "a239f75054598a3e26fa33f532b3a325b6501c3277add53d25908a2055522138"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/topic", "status/open", "domain/agent-ops", "category/working-agreement"]
---

# Tooling and environment traps

> Working-agreement topic of feedback rules about shell, harness and scraper-URL traps, each with its Why and How to apply: Bash heredocs halve backslashes and strip `$` sigils (write scripts to files); MEMORY.md truncation incident and the rule that MEMORY.md's filename is the loading contract; visible-PowerShell work and the Glass Box rig; the congress.gov advanced-search URL must be kept verbatim (no JSON rebuild).

## Context

- Owner of the rules: [[paul-goff]]. The harness behaviors behind them are recorded in [[claude-code-harness]]; the presentation/communication side of the PowerShell rule is in Communication and presentation style. The congress.gov URL rule serves Congress R scrapers (code in the R pipeline Draft Systems R pipeline).
- Each rule below is a bullet block: the rule, its **Why**, and **How to apply**. Memory-note sources (not vault entities): `shell-heredoc-mangling-2026-08-19`, `memory-index-restore-incident-2026-07-26`, `memory-index-is-the-loading-contract-2026-09-18`, `powershell-visible-work`, `feedback-congress-url-no-json`, `windows-hook-shell-git-bash` (2026-10-03, Rule 6 and the Rule 1 extension).
- The two MEMORY.md notes are COMPLEMENTARY: the 2026-07-26 incident (a mangling: loud, recoverable) and the 2026-09-18 rule (an invisible deletion by splitting/relocating lines). The newer rule adds: never split or relocate MEMORY.md lines.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[claude-code-harness]] | Harness traps: MEMORY.md loading contract, heredoc mangling, SendMessage duplicates, GateGuard amend block, poppler PATH. |
| Draft Systems R pipeline | Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline |

## Related Topics

- Congress R scrapers - June 2026 R scraper family in Draft Systems: congress.gov 17x3, CU press releases, Census CD, Ballotpedia, DEBATE stance
- Communication and presentation style - Rules for reporting to Paul: never appease, real R summary(lm()), trend over significance, visible PowerShell, close supplied items.

## History

| Date | Event |
|---|---|
| 2026-06-02 | congress.gov scraper: placeholder-mismatch bug fixed (`%22_MEMBER_%22` single underscores vs `__MEMBER__`), `build_member_url()` now `stop()`s without `__MEMBER__`; accented-name encoding fixed (`URLencode(enc2utf8(...), reserved=TRUE)`); `get_roster_119` strips "(Nick)" parentheticals |
| 2026-06-03 | Rule recorded (feedback_congress_url_no_json): keep the verbatim chunked URL, no JSON rebuild |
| 2026-07-24 | Paul: visible PowerShell for writes and data extraction; `/ps` shipped (@7e548f5); merged same day; Glass Box desktop rig built, lane-aware, hooks installed 23:42 |
| 2026-07-26 | MEMORY.md truncated 21.1 KB to 3 bytes by a PowerShell `-like` pattern containing `[`; restored from the session-start reminder |
| 2026-08-19 | Heredoc mangling nearly ships a one-backslash `'\b'` regex (backspace U+0008) defect |
| 2026-09-18 | Paul rejects splitting MEMORY.md (loading contract) |
| 2026-09-19 | MEMORY.md re-measured/trimmed 19.89 to 18.59 KB (152 entries), memory-file modified 2026-09-19 |
| 2026-10-03 | The 16 glassbox `mirror.ps1` hooks in `~/.claude/settings.json`, dead since about 2026-08-02, fixed: hook commands run through Git Bash, which stripped the backslashes of their unquoted Windows paths; forward slashes fixed them (Rule 6). The Bash tool's backslash collapse in command text recorded (Rule 1 extension) |

## Decisions

### Rule 1: Bash heredocs corrupt script text; write scripts to files (2026-08-19)
- In this Claude Code environment, passing script text through the Bash tool corrupts it even with a quoted delimiter (`<<'EOF'`): backslashes are HALVED (Python `"\\\\b"` reaches the interpreter as `"\\b"` and writes `\b` to disk instead of `\\b`); PowerShell `$` sigils are STRIPPED when PowerShell is invoked via the Bash tool (`$deadline` / `$n` vanish, parse error in under a second); apostrophes BREAK the heredoc (`Children and Teens' Online Privacy` killed one).
- **Why:** on 2026-08-19 this nearly shipped a real defect: a word-boundary fix wrote `new RegExp('\b'+w+'\b')` with ONE backslash; in JavaScript `'\b'` is the backspace character U+0008, not a word-boundary escape, so the matcher would have silently matched nothing on every bill while looking correct in review. `git diff` rendered it identically to the correct form; only a byte-level check (`ord()` / `chr(92)` comparison) caught it.
- **How to apply:**
  - Write scripts with the Write tool, then run them by path; do not pipe multi-line script text through a heredoc.
  - When a backslash must appear in written output, build it as `chr(92)` in Python, never as a literal in shell-transported text.
  - For PowerShell with variables, use the PowerShell tool directly, never `powershell -Command` through Bash.
  - Never trust `git diff` to reveal an escaping error: verify escape-sensitive edits by reading the bytes back, and pin the correct form in a test (assert the two-backslash sequence AND assert `chr(8)` is absent).
  - Related: `powershell-visible-work`, `verify-dont-infer-completion-2026-08-04`.
- **Extension (2026-10-03, source `windows-hook-shell-git-bash`):** the Bash tool also collapses `\\` to `\` in ordinary command text, not only in heredocs, and even inside single quotes, so a grep for a JSON-escaped path silently returns 0. Two agents got false zero counts from this before it was diagnosed. Build a backslash with `bs=$(printf '\134')`, or use `\u005c` inside jq strings.

### Rule 2: PowerShell `-like` with a literal `[` empties files (2026-07-26 incident)
- 2026-07-26: while compacting the memory index, `$_ -like '- [Codex executor lane 2026-07-18]*'` was run. In PowerShell wildcards `[...]` is a character-class, so the pattern is invalid, raising `WildcardPatternException` on EVERY line; `ForEach-Object` produced nothing and `Set-Content` wrote an empty file. MEMORY.md went from 21.1 KB to 3 bytes (BOM only) in one command. All 67 topic .md files were untouched; only the index died.
- Recovered by rebuilding the index from the copy of MEMORY.md that ships in the session-start system reminder, re-applying that session's edits, and compacting the three longest entries (codex-executor-lane 3472 chars, mentat-pipeline 1337, legislative-audit 1119) whose detail already lived in their topic files. Net 21.1 KB to ~13 KB.
- **Why:** a destructive whole-file write was gated on a filter that could fail open to empty. `Set-Content` happily writes nothing; there is no built-in "refuse to truncate" guard, and there is no backup of MEMORY.md anywhere on disk.
- **How to apply:**
  - Never use `-like` with a literal `[`: use `-match` (regex, escape as `\[`) or `.StartsWith()`.
  - Prefer the Write/Edit tools for memory-file writes. Paul's visible-PowerShell rule (Rule 4) is about showing data extraction and content in the transcript, not about routing risky whole-file rewrites through shell quoting.
  - Before any whole-file rewrite driven by a filter, assert the result is non-empty and roughly the expected line count first; only then write.
  - The session-start system reminder is the de-facto backup of MEMORY.md; if the index is lost mid-session, rebuild from there before the context is gone.

### Rule 3: MEMORY.md is the session-start loading contract; never split or relocate its lines (2026-09-18, newer; extends Rule 2)
- 2026-09-18: compacting the memory index, a split was proposed (`MEMORY.md` for active lanes plus `MEMORY-ARCHIVE.md` for July/August entries) because 146 index lines could not be squeezed under a 17.1 KB target. Paul rejected it: **`MEMORY.md` is not merely the index, it is the loading contract.** That exact filename is what gets read into context at session start; nothing else in the directory is. Every line moved to a second file drops out of every future session's context while looking perfectly filed (topic files exist, lines under a heading, nothing errors): later sessions reason without facts they can no longer see.
- **Why the target could not be met by compression** (146 entries; chars, KB = chars/1024): filenames alone ~5,300 chars (~5.2 KB, exact strings); filenames + markdown syntax + headings + verbatim Standing directives ~9,600 chars (~9.4 KB) incompressible; floor with every hook fact kept and titles crushed to ~8 chars average 18,601 chars (18.17 KB). Hooks averaged 75 chars and were already telegraphic ("hung console holds runtime.lock"). A target much under 18 KB deletes facts (commit SHAs, test counts, reconciliation caveats). Landed at 18.66 KB with every entry and ruling intact, comfortable against the 24.4 KB read limit.
- **Re-measured 2026-09-19** (Paul: "trim MEMORY.md"): 152 entries, 19.89 to 18.59 KB (chars/1024, the unit the size hook reports; bytes run ~0.3 KB higher because of em dashes). Every link kept, same order, same sections. Removed: commit SHAs, packet paths and date suffixes in titles (still in topic files), plus the seven closed `mentat-failings-lane-s2..s8` lines merged into ONE line carrying all seven links. The predicted floor (18.17 KB at 146 entries + 6 entries x ~70 chars = 18.57) held to within 0.02 KB, so the hook's 17.1 KB target is about 1,500 chars BELOW what 152 entries can carry with their facts. Only fewer ENTRIES gets there: merging closed lanes' topic FILES (candidates: mentat failings S2-S8 to 1 file; the staffer lanes; the July psychometrics notes), a consolidation job with cross-links to repair, Paul's to order, not a trim. Safe method: draft in scratchpad, assert same links in same order, every target on disk, headings equal, no BOM/CR, sane size, backup, byte copy, read back.
- **How to apply:**
  - Treat the filename `MEMORY.md` as the contract. Never split the index, and never relocate index lines into `MEMORY-ARCHIVE.md` or any other file, however tidy it looks.
  - When the index nears its read limit: compress the hooks, and consolidate stale ENTRIES into merged topic files (fewer, bigger memory files means fewer index lines). Merging entries is legitimate; relocating lines is not.
  - Filenames run ~36 chars each and are irreducible, so entry count, not hook length, sets the floor; reducing entries is the only lever with real headroom.
  - Merging index lines for one lane's consecutive sessions saves only ~25 chars per line (filenames dominate): worth it for tidiness, not bytes.
  - When a size target collides with content, report the arithmetic and let Paul rule instead of paying the cost silently. Meaning beats bytes: a negation is "worth more than any byte saved."
- Contrast: Rule 2's incident was a **mangling** (loud, obvious, recoverable from the session-start reminder); Rule 3's split would have been an **invisible deletion**. A mangling announces itself; this does not. Related: `dont-drop-context-anchor-memory`, `ask-before-substantive-changes`.

### Rule 4: Work through visible PowerShell (Paul, 2026-07-24; the glass-box rig details are below)
- Paul (2026-07-24): "whenever I give you a prompt you give me a powershell(s) that show the code being written and data being extracted." Clarified via explicit choice: **work through visible PowerShell**: perform writes and extractions as PowerShell commands he can watch live, instead of the built-in Write/Edit/Read tools. (The communication-side statement is in Communication and presentation style.)
- **Why:** live visibility into exactly what touches his machine: every code write and data read appears as a shell command in the transcript that he can see and re-run. He explicitly accepted "slower and noisier" over a passive recap block.
- **How to apply:**
  - Writing code/files: PowerShell tool with single-quoted here-strings (`@'...'@`, closing `'@` at column 0) piped to `Set-Content -Encoding utf8` / `Out-File`. Full file content appears inside the command, never hidden.
  - Reading/extracting data: `Get-Content`, `Select-String`, `Import-Csv`, `ConvertFrom-Json` etc. as visible commands.
  - Codex-lane work writes out-of-band: after a dispatch, surface the result with visible PowerShell (`git -C <tree> diff`, file previews).
  - Genuine exceptions (images, .ipynb, Excel workbook writes needing openpyxl, files too large for a transcript command): say so explicitly, then show the closest PowerShell inspection of the result (before/after extraction of the changed region).
  - This overrides the harness default of preferring Write/Edit/Read tools. Related: `codex-executor-lane-2026-07-18`, `ask-before-substantive-changes`.
- Tension recorded: Rule 2's note says the visible-PowerShell rule does not mean routing risky whole-file rewrites through shell quoting; Rule 1 says scripts with `$` go through the PowerShell tool directly, not Bash.
- /ps command SHIPPED 2026-07-24: repo copy committed @7e548f5 on `claude/powershell-smoke-screen-0436a3`; user-scope copy live at `~/.claude/commands/ps.md`, md5-verified identical (E9C67889). Paul chose KEEP ALWAYS-ON: the rule applies to every prompt regardless; `/ps` is an explicit, portable reinforcer (works in other projects), NOT the gate. Sandbox permission prompts on shell writes are expected under this mode (the confirmation step, not a failure); a denied prompt means stop and ask.
- MERGED 2026-07-24: main ff'd 46b17b9 to 7e548f5; live tree branch (`claude/cfpb-sentiment-recorrection`) ff'd to the same: main == live == 7e548f5 verified. User-scope copy re-synced from the live CRLF checkout; canonical md5 is now FF653C7E (the earlier E9C67889 was the pre-checkout LF bytes; do not treat that delta as drift). NO open items on /ps.

### Rule 5: congress.gov advanced-search URL: keep it verbatim, no JSON rebuild (2026-06-03; code fixes 2026-06-02)
- For the congress.gov advanced-search scraper, build the results URL from Paul's EXACT known-good encoded link, stored as a character vector of short chunks reassembled with `paste0(collapse = "")`. Only the cosponsor name varies, via a `__MEMBER__` placeholder swapped with `sub(..., fixed = TRUE)`.
- **Why:** Paul reported two failures: (1) rebuilding the `raw=` query from JSON (`jsonlite::toJSON` + custom encoder) "does not seem to work" and produced a run with zero results; (2) the RStudio **console** truncates any single input line (~4096 chars), so a one-line ~6,900-char URL literal gets silently cut off and is "rendered useless." Chunked `paste0` dodges both: no long physical line, no JSON round-trip that could fail to reproduce the exact query.
- **How to apply:** whenever editing the query for `project-congress-scraper`, keep the chunked verbatim approach. Each chunk decodes to one `{"op":...,"inputs":{...}}` condition; conditions after the first start with `%2C`. Verified offline: assembled URL is 6942 chars, decodes to valid JSON with 3 blocks and 31 keyword conditions. Don't reintroduce jsonlite for URL building.
- **Placeholder gotcha (fixed 2026-06-02):** the encoded placeholder in the original-cosponsor chunk and the `sub()` pattern in `build_member_url()` MUST be byte-identical. A run produced zero results because the chunk had `%22_MEMBER_%22` (single underscores) while `sub("__MEMBER__", ..., fixed=TRUE)` looked for double underscores, so `sub` matched nothing and every URL carried the literal placeholder as the cosponsor value. Canonical token is `__MEMBER__` (double). `build_member_url()` now `stop()`s if the template lacks `__MEMBER__`. `check_url.R` confirms the assembled+substituted URL == `expected_url.txt` (6922 chars, "Ann+Wagner"): run it after any URL/placeholder edit.
- **Accented-name encoding (fixed 2026-06-02):** first full 119th-roster run: the HTTP cookie-replay path WORKED (no Cloudflare challenges; 536 members, 1773 bill rows), but 8 members with non-ASCII names (André Carson, Ben Luján, Linda Sánchez, Nydia Velázquez, Nanette Barragán, Chuy García, Mónica De La Cruz, Pablo José Hernández Rivera) failed with `read_html` "'' does not exist in current working directory" = empty server response. Cause: `build_member_url` only did space->'+', sending raw multibyte bytes (malformed URL). Fix: `gsub("%20","+",URLencode(enc2utf8(trimws(name)),reserved=TRUE))` (é->%C3%A9, space->+, hyphen/ASCII untouched; "Ann Wagner"->"Ann+Wagner" still byte-identical). `get_roster_119` also strips "(Nick)" parentheticals (CSV first_name "James (Jim)" to "James Moylan"). Transient HTTP/2 "Stream error"/"Timeout" are normal flakiness and auto-recover on the driver's retry rounds.

### Rule 6: Claude Code hook commands run through Git Bash on this machine; use forward-slash paths (2026-10-03)
- Claude Code on this Windows machine runs hook commands through Git Bash. Bash strips the backslashes from an unquoted Windows path in a hook command (for example `-File C:\Users\pgoff\...\x.ps1`), so the command fails. Use forward slashes (`C:/Users/pgoff/...`) in hook commands.
- The 16 glassbox `mirror.ps1` hooks in `~/.claude/settings.json` were dead from about 2026-08-02 until 2026-10-03 for this reason. They were fixed with forward slashes, and the original file is backed up at `settings.json.bak-glassbox-2026-10-03`. Edits to `settings.json` hooks hot-reload: live sessions began emitting glassbox events within about 46 seconds. (The Glass Box side, including the retention restart, is recorded in the GLASS BOX actor.)
- **Why:** async hook failures are silent, so the breakage went unnoticed for two months.
- **How to apply:** when writing or debugging hooks here, use forward-slash paths. To test a hook, extract its exact command with `jq -j ... | tr -d '\r'` (jq.exe emits CRLF), then run it through `bash -c "$cmd"` with a JSON payload on stdin. Source: `windows-hook-shell-git-bash` (scratch project `scratch-2026-10-03-35774e`).

## Next Steps

- [ ] Any future MEMORY.md size reduction: report the arithmetic to Paul; consolidation of closed lanes' topic FILES (mentat failings S2-S8 to 1 file; staffer lanes; July psychometrics notes) is his to order.
- [ ] After any URL/placeholder edit in the congress scraper, run `check_url.R`.
- [ ] Glass-box allow-rule/hook settings were hand-applied by Paul; if a dispatch is blocked again, suspect rule-prefix syntax (C: colon parsing) and iterate WITH Paul applying edits (see Glass Box rig).

## Glass Box rig and PowerShell-environment traps (from `powershell-visible-work`, 2026-07-24)

- Paul wants glass-box commands running in a REAL desktop terminal window, not only the transcript. Rig BUILT at `C:\Users\pgoff\.claude\glassbox\`: `console.ps1` (visible window, polls `inbox\*.ps1`, echoes + runs + writes `outbox\<id>.out`) + `dispatch.ps1` (queues command, auto-starts window titled "GLASS BOX*", waits, returns output). Usage: `& C:\Users\pgoff\.claude\glassbox\dispatch.ps1 '<command>' [-TimeoutSec n]`.
- Paul MANUALLY applied the allow rules to `~/.claude/settings.json` (the classifier refused every Claude-side grant path: dispatch exec, the update-config skill, allowed-tools command rewrite; do NOT retry those in-session; the grant had to be human-performed). Rules present but the old session could not hot-load them. NEXT-SESSION first action = test dispatch (expect the GLASS BOX window to pop); if STILL blocked, suspect rule-prefix syntax (C: colon parsing) and iterate WITH Paul applying edits.
- Cleanup owed then: `~/.claude/commands/glassbox.md` was BROKEN (UTF-8 BOM killed its frontmatter, shows description "---") and its auto-apply design obsolete; rewrite as a simple ensure-window-open command (no allowed-tools grant), BOM-less via `[IO.File]::WriteAllText` with `UTF8Encoding($false)`. NOTE: PS5.1 `Set-Content -Encoding utf8` writes a BOM; never use it for files needing frontmatter. Settings backup: `settings.json.bak`.
- LANE UPGRADE 2026-07-24 (Paul: keep claude/codex/grok/gemini SEPARATE, different colors; chose FOUR WINDOWS): `dispatch.ps1` takes `-Lane claude|codex|grok|gemini` (default claude) routing `inbox\<lane>\` / `outbox\<lane>\`; `console.ps1` takes `-Lane`, window title "GLASS BOX - <LANE>", single-instance `<lane>.lock` (PID-checked), auto-opens on that lane's FIRST dispatch. Colors: Claude=Cyan, Codex=Green, Gemini=Yellow, Grok=Red (command text in lane color, output White, headers DarkGray). Paul's existing allow rule covers `-Lane` args (same dispatcher prefix).
- LANE SEMANTICS (be honest): Grok/Gemini CLI calls (`grok` headless `-p`, `agy`) should literally EXECUTE inside their lane window via dispatch `-Lane`; Codex executes out-of-band via MCP, so its GREEN window carries spec-file writes, worktree git diffs and verification reads. NEVER claim Codex internal edits stream live. STILL PENDING at that point: a fresh session for the allow rule to load; the grant-free BOM-less `glassbox.md` rewrite (do NOT recreate the allowed-tools auto-apply form: that exact write was classifier-blocked).
- RIG LIVE 2026-07-24: all four lanes VERIFIED round-trip in the original session (the allow rule DID hot-load after Paul's manual settings apply, no restart needed after all). `/glassbox` REWRITTEN grant-free + BOM-less (first bytes 45,45,45,10): it dispatches a hello through each lane to open all windows. NO open items on the rig itself; route lane work per LANE SEMANTICS.
- CORRECTION 2026-07-24 (supersedes the "RIG LIVE" claim about the allow rule): `settings.json` mtime 7/7 + 38 bytes PROVES the allow rules were NEVER on disk (Paul's Copy-Item never landed; he saw the DEFAULT json and reasonably called it applied). Dispatch calls succeed on CLASSIFIER GOODWILL (user approval on record), not on any rule: do not claim otherwise, and expect occasional blocks. MIRROR LAYER BUILT: console v3 renders `*.txt` display-only mirror records; `mirror.ps1` (PostToolUse hook target) routes Write/Edit/NotebookEdit/PS/Bash to claude (grok/agy-gemini sniffed to their lanes), `mcp__codex__*` to codex with prompt + response, 8000-char explicit truncation, always exit 0; skips `dispatch.ps1` calls (already live). Hook config STILL NOT INSTALLED then: the classifier blocks Claude staging ANY hooks file; Paul must hand-author `settings.json` (notepad) with permissions+hooks JSON and VERIFY (`Get-Content` must show "hooks"); hooks only fire in sessions started AFTER the save. Windows all reopened on v3.
- HOOKS INSTALLED + PROVEN 2026-07-24 23:42: Paul hand-authored `settings.json` (3rd attempt; 1st never saved, 2nd had paste debris), now PARSE-VERIFIED: 2 dispatch allow rules + PostToolUse hook (Write|Edit|NotebookEdit|PowerShell|Bash|mcp codex tools -> `mirror.ps1`, timeout 15). Mirror path PROVEN end-to-end: fake `mcp__codex__codex` JSON piped through `mirror.ps1` displayed in the GREEN window and was consumed (inbox 0 pending). Hook fires only in sessions started AFTER the save (the glassbox build session itself never mirrors). (Dated note 2026-10-04: on 2026-10-03 an edit to these hooks hot-reloaded within about 46 seconds (Rule 6); this observation was made at the first install, and no record says whether running sessions pick up a newly added hook.) Full-visibility architecture: transcript = visible PowerShell commands (always-on rule); desktop = 4 lane windows fed by (a) `dispatch.ps1` live execution and (b) harness-enforced PostToolUse mirrors across ALL sessions/projects. VERIFY-BEFORE-CLAIMING lesson recorded: never accept "looks like a json"; re-read the artifact. See also [[claude-code-harness]] and the GLASS BOX actor.
- CORRECTION 2026-10-03 (source `windows-hook-shell-git-bash`; supersedes "harness-enforced PostToolUse mirrors across ALL sessions/projects" for the period): these `mirror.ps1` hooks were dead from about 2026-08-02 until 2026-10-03, because Claude Code runs hook commands through Git Bash, which stripped the backslashes from their unquoted Windows paths. Fixed with forward slashes (Rule 6); live sessions began emitting glassbox events again within about 46 seconds.
