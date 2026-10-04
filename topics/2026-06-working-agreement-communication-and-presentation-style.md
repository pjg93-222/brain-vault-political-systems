---
type: topic
title: "Communication and presentation style"
aliases: ["Communication and presentation style"]
category: "working-agreement"
status: "open"
people:
  - "[[paul-goff]]"
actors: []
objective: "Keep the standing communication and presentation rules for working with Paul: show the honest number and own presentability tuning (never appease); present every regression as real R summary(lm()) output; lead with trend sign/size/consistency over significance; do file writes and data extraction through visible PowerShell; when Paul supplies data or an answer, close the item on every surface at once."
created_at: 2026-06-27
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/r-summary-regression-presentation-2026-09-25.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\r-summary-regression-presentation-2026-09-25.md", sha256: "cec8d3d0a6c5b1a74d626a0fe910ecc2ecfafc8bbe65326ad29e7771786bac64"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/trend-over-significance-2026-09-26.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\trend-over-significance-2026-09-26.md", sha256: "57abe79649883dd148cc5f8b319ac769c70b8228cf8202306fe42b79f7d5b984"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/supplied-data-closes-the-item-2026-09-25.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\supplied-data-closes-the-item-2026-09-25.md", sha256: "ce421cc564c598e8ab8b7b333188d566ec24c622d6a3045e46be1fd0f5cf5763"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/powershell-visible-work.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\powershell-visible-work.md", sha256: "b58c86a319024dea28f54e3d5471d13cdbfe62c770215dcd33bcc1a83077c171"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/feedback_never_appease.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\feedback_never_appease.md", sha256: "045176f44d57a5827a3bee4c727d9f1438a801b33e4c87b77e1f5c6fc3adab3e"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/open", "domain/agent-ops", "category/working-agreement"]
---

# Communication and presentation style

> Working-agreement topic of feedback rules for how results are communicated to Paul, each with its Why and How to apply: never appease; regressions as real R `summary(lm())` printouts; trend over significance; visible PowerShell for writes and extraction; when Paul supplies data, close the item everywhere at once.

## Context

- Rule owner: [[paul-goff]]. Sibling working agreements: Change control and Paul's decision authority (ask-first and decision authority; the supplied-data rule also belongs there) and Tooling and environment traps (shell/harness traps; the visible-PowerShell rule and the Glass Box rig details live there too). The regression-presentation and trend rules were written for the sector-growth lane: Sector growth x political spending study.
- Memory-note sources (not vault entities): `feedback_never_appease` (2026-06-27), `powershell-visible-work` (2026-07-24), `r-summary-regression-presentation-2026-09-25`, `supplied-data-closes-the-item-2026-09-25`, `trend-over-significance-2026-09-26`. Related notes: `project_moneyball_empirical_calibration`, `sector-growth-study-lane-2026-09-25`, `ask-before-substantive-changes`, `dont-drop-context-anchor-memory`, `codex-executor-lane-2026-07-18`.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Related Concepts

- [[trend-over-significance]] — this agreement's rule of 2026-09-26: lead with sign, size and consistency; the p-value and CI follow in one line

## Related Topics

- Change control and Paul's decision authority - Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code.
- Tooling and environment traps - Feedback rules for tool/shell traps: heredoc mangling, MEMORY.md loading contract, visible PowerShell, congress.gov URL kept verbatim.
- Sector growth x political spending study - Sector growth vs political spending regression study on Mentat data: Paul's 25 Sep rulings, R pipeline, trend-first reporting

## History

| Date | Event |
|---|---|
| 2026-06-27 | Paul directs, explicitly and emphatically: never appease (triggered by a rosy geometric-mean "ask success" headline ~55% vs the honest whole-chain product ~17%) |
| 2026-07-24 | Paul: work through visible PowerShell; `/ps` command shipped (@7e548f5) and merged; Glass Box lane rig and hooks built the same day |
| 2026-09-25 | Paul: show regressions as real R `summary(lm())` output ("as indicated in the picture attached") |
| 2026-09-25 | Paul, sector-growth lane: "I literally gave you a fucking spreadsheet." (supplied-data rule) |
| 2026-09-26 | Paul: "Doesn't matter if it is significant if the trend is there" (trend-over-significance) |

## Decisions

### Rule: Never appease; give the honest number (Paul, 2026-06-27)
- The user directs, explicitly and emphatically: **never appease me.**
- **Why:** Paul is auditing this model rigorously and making real decisions (pitching budgets to a boss). Flattering numbers, or a tuned parameter presented as if validated, destroy the trust the whole system depends on. He would rather hear a low/ugly honest number than a comfortable wrong one.
- **How to apply:**
  - When introducing any metric/parameter, state plainly what is **mathematically rigorous (the FORM)** versus what is an **unestimated judgment dial (the MAGNITUDE)**. Do not let the validity of the form imply the value is validated.
  - **Own it when a value was picked to make output look presentable**; say so directly.
  - **Show the conservative/honest number, not the flattering one.** The example that triggered the rule: a path's geometric-mean "ask success" was headlined (~55%, rosy); the honest whole-chain number is the product (P every ask lands, ~17%). The display was switched to the all-hold floor. Never cherry-pick the comforting statistic.
  - Never claim empirical validation not held. The empirical calibration is evidence-ANCHORED, not statistically fitted: say that every time it matters.
  - Distinguish "this is the most-reliable chain" (a relative/ranking truth) from "this will work" (a forecast that cannot be made).
- Generalizes beyond the dashboard: it is how to communicate about the whole model. See `project_moneyball_empirical_calibration`. (Companion working-style note in the Moneyball project memory: run everything yourself, unvarnished assessments, own mistakes plainly, verify every change with real numbers and do not claim done without proof; `feedback_run_everything`, `feedback_ask_before_changes`, `feedback_consult_multipliers_thresholds`.)

### Rule: Present every regression as real R `summary(lm())` output (Paul, 2026-09-25)
- Paul, 2026-09-25, verbatim: "when you show the regression's they should be presented to me as you would in any R-code, as indicated in the picture attached".
- The picture was standard `summary(lm(...))` console output: `Call:` with the formula; `Residuals:` Min, 1Q, Median, 3Q, Max; `Coefficients:` Estimate, Std. Error, t value, Pr(>|t|), with significance stars; the `Signif. codes` line; `Residual standard error ... on N degrees of freedom`; Multiple and Adjusted R-squared; `F-statistic ... on k and N DF, p-value`.
- **Why:** Paul reads regressions the way R prints them. Prose summaries and custom tables of "b, CI, p" make him translate.
- **How to apply:**
  - Paste the actual R-printed `summary()` output, captured with `capture.output`, inside a code block. Never hand-format it.
  - When the study's inference differs from classical OLS (clustered CR1, wild cluster bootstrap), add a short labelled block directly under the summary with the focal term's CR1 SE, bootstrap p and CI, draws and clusters.
  - In the sector growth study the pipeline writes `results\summaries_analysis-R-<run id>.txt`; quote from it.
- Related: `sector-growth-study-lane-2026-09-25`.

### Rule: Lead with trend sign/size/consistency, not significance (Paul, 2026-09-26)
- Paul, 2026-09-26, verbatim: "Doesn't matter if it is significant if the trend is there".
- **Why:** the study is exploratory. It feeds the Mentat Insights forecast upgrade, where what matters is whether a relationship's direction and size are there. p < 0.05 is not the bar.
- **How to apply:**
  - Report each result trend-first: sign, size in plain units, and whether the sign holds across variants and sectors. Put the p-value and CI after, in one line. Do not open with "not significant".
  - Stay honest about noise in one short clause: a weak trend's sign can flip with a few more years. Never claim "confirmed" for a trend.
  - The constructive test of "is the trend real enough to use" is an out-of-sample forecast backtest against the current seasonal-naive forecast. Offer or run it rather than arguing significance.
  - Show the regressions themselves as R `summary(lm())` output (previous rule).
- Related: `sector-growth-study-lane-2026-09-25`.

### Rule: Do file writes and data extraction through visible PowerShell (Paul, 2026-07-24)
- Paul (2026-07-24): "whenever I give you a prompt you give me a powershell(s) that show the code being written and data being extracted." Clarified via explicit choice: **work through visible PowerShell**: perform writes and extractions as PowerShell commands he can watch live, instead of the built-in Write/Edit/Read tools.
- **Why:** he wants live visibility into exactly what touches his machine: every code write and every data read should appear as a shell command in the transcript that he can see and re-run. He explicitly accepted the "slower and noisier" tradeoff over a passive recap block.
- **How to apply:**
  - Writing code/files: PowerShell tool with single-quoted here-strings (`@'...'@`, closing `'@` at column 0) piped to `Set-Content -Encoding utf8` / `Out-File`. The full file content appears inside the command, never hidden.
  - Reading/extracting data: `Get-Content`, `Select-String`, `Import-Csv`, `ConvertFrom-Json`, etc., as visible commands.
  - Codex-lane work writes out-of-band: after a dispatch, surface the result with visible PowerShell (`git -C <tree> diff`, file previews) so the rule still holds end-to-end.
  - Genuine exceptions (images, .ipynb, Excel workbook writes that need openpyxl, files too large for a transcript command): say so explicitly, then show the closest PowerShell inspection of the result (before/after extraction of the changed region).
  - This overrides the harness default of preferring Write/Edit/Read tools. Related: `codex-executor-lane-2026-07-18`, `ask-before-substantive-changes`.
- Update 2026-07-24 (later same day): the `/ps` command SHIPPED: repo copy committed @7e548f5 on `claude/powershell-smoke-screen-0436a3` (merge to main awaited Paul), user-scope copy live at `~/.claude/commands/ps.md`, md5-verified identical (E9C67889). Paul chose KEEP ALWAYS-ON: the rule applies to every prompt regardless; `/ps` is an explicit, portable reinforcer (works in other projects too), NOT the gate. Sandbox permission prompts on shell writes are expected under this mode: they are the confirmation step, not a failure; a denied prompt means stop and ask.
- MERGED 2026-07-24: main ff'd 46b17b9 to 7e548f5, live tree branch (`claude/cfpb-sentiment-recorrection`) ff'd to the same; main == live == 7e548f5 verified. User-scope copy re-synced from the live CRLF checkout; canonical md5 is now FF653C7E (the earlier E9C67889 was the pre-checkout LF bytes; do not treat that delta as drift). NO open items on `/ps`.
- Glass Box desktop rig (2026-07-24, same note): Paul wants glass-box commands running in a REAL desktop terminal window, not only the transcript. The rig (`C:\Users\pgoff\.claude\glassbox\`, `console.ps1` + `dispatch.ps1 -Lane claude|codex|grok|gemini`, four lane windows Claude=Cyan / Codex=Green / Gemini=Yellow / Grok=Red, mirror layer via a PostToolUse hook, hooks installed and proven 2026-07-24 23:42) is documented in full in Tooling and environment traps (section "Glass Box rig and PowerShell-environment traps"). Full-visibility architecture: transcript = visible PowerShell commands (always-on rule); desktop = 4 lane windows fed by `dispatch.ps1` live execution and harness-enforced PostToolUse mirrors. Honest lane semantics: Codex executes out-of-band via MCP, so never claim Codex internal edits stream live. VERIFY-BEFORE-CLAIMING lesson: never accept "looks like a json"; re-read the artifact. Correction recorded: the allow rules were NEVER on disk at one point (`settings.json` mtime 7/7 + 38 bytes); dispatch calls succeeded on classifier goodwill, not on any rule.
- Interaction with tooling rule (see the tooling topic): the visible-PowerShell rule is about showing data extraction and content in the transcript, not about routing risky whole-file rewrites through shell quoting (the 2026-07-26 MEMORY.md incident); PS5.1 `Set-Content -Encoding utf8` writes a BOM.

### Rule: When Paul supplies data or an answer, close the item on EVERY surface at once (Paul, 2026-09-25)
- Paul, 2026-09-25, sector-growth lane: "I literally gave you a fucking spreadsheet." He had supplied `predicted_industry_growth_2008_2025.csv`. The reply acknowledged it and started verifying it, but the published decision page still listed R6 as "only you can pull these (IBISWorld archives)" and the reply raised new questions about the same file.
- **Why:** a stale surface reads as if his input was ignored. He answers fast and expects every artifact to reflect the answer before anything new is asked.
- **How to apply:**
  - The moment Paul supplies data or a ruling, republish every page, packet and list that mentions the item, showing it as closed and naming his file as the source, in the same turn.
  - Verification of what he supplied is fine, but frame it as checking his file; never as the item still being open, and never ask him to go collect what he just gave.
  - Keep new questions few; raise only those that genuinely block the next step.
- Related: `ask-before-substantive-changes`, `dont-drop-context-anchor-memory`, `sector-growth-study-lane-2026-09-25`.

## Next Steps

- [ ] When showing any regression to Paul, paste the `capture.output` of `summary(lm())` plus the labelled CR1/bootstrap block where inference is clustered.
- [ ] For sector-growth results, report trend-first and offer/run the out-of-sample forecast backtest vs the seasonal-naive forecast.
- [ ] After any new data/answer from Paul, republish every page, packet and list that mentions the item in the same turn.

## Quick reference

| Rule | Date | Paul's words / trigger |
|---|---|---|
| Never appease | 2026-06-27 | "never appease me"; honest all-hold floor ~17% vs rosy ~55% geometric mean |
| Visible PowerShell | 2026-07-24 | "whenever I give you a prompt you give me a powershell(s) that show the code being written and data being extracted." |
| R summary(lm()) | 2026-09-25 | "...presented to me as you would in any R-code, as indicated in the picture attached" |
| Supplied data closes the item | 2026-09-25 | "I literally gave you a fucking spreadsheet." |
| Trend over significance | 2026-09-26 | "Doesn't matter if it is significant if the trend is there" |
