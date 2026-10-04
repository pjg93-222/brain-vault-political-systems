---
type: person
name: "Paul Goff"
aliases: ["Paul", "PAUL Goff"]
role: "Vault owner; owner and sole decision-maker for Melange Systems, Mentat, the forecast redesign and CU-geography (sets thresholds, weights and methodology rulings; holds the APPLY gate)"
team: ""
focal_points:
  - "[[draft-systems-r-pipeline]]"
  - "[[lg-gram-workstation]]"
  - "[[mentat-fec-pipeline]]"
  - "[[brain-vault-political-systems]]"
  - "[[brain-graph]]"
email: "336621699+pjg93-222@users.noreply.github.com"
github: ""
slack: ""
jira: ""
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/api-key-repository-2026-08-28.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\api-key-repository-2026-08-28.md", sha256: "f33fd855d4557d62c018aa8e6eb704337e0dd2be31b2bf7a6ac4ef023b3a77b3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/user-name-paul.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\user-name-paul.md", sha256: "31d96d7db8f1af09845e734883335e0ecba51caffbee6456832bb19d4d7e1bcf"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/user_r_environment.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\user_r_environment.md", sha256: "4b3db963331292e353d1e0be4ac6e238a7f81e451bc60a806719c97d3963316f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-github-migration-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-github-migration-2026-10-02.md", sha256: "1df4b9e5d59c94f40126fc2589fb000affbd73e13b77c8b8f30fef0398d56f78"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/person", "domain/agent-ops"]
---

# Paul Goff

> Owner of this vault and the sole decision-maker for the Melange Systems, Mentat, forecast-redesign and CU-geography work. Developer in R/RStudio and Python on Windows 11 (email 336621699+pjg93-222@users.noreply.github.com).

## Identity

- Name: **Paul Goff**, email 336621699+pjg93-222@users.noreply.github.com (the only email recorded for him in this vault).
- Source memory note `user-name-paul` (user memory, 2026-07-04) description: "The user's name is PAUL Goff — the repo's git config said "Patrick Goff" (now corrected); never infer his name from config fields".
- **Git-config correction (2026-07-04):** an agent addressed him as "Patrick" because the repo's `git config user.name` was set to "Patrick Goff". He corrected it ("he corrected me, and the config is now fixed to" "Paul Goff"). Past commit history still shows Patrick; it was left unrewritten.
- Verbatim source sentence: On 2026-07-04 I called him "Patrick" because the repo's `git config user.name` was set to "Patrick Goff" — he corrected me, and the config is now fixed to "Paul Goff" (past commit history still shows Patrick; left unrewritten).
- Raw description field of the note: `description: "The user's name is PAUL Goff — the repo's git config said \"Patrick Goff\" (now corrected); never infer his name from config fields"`.
- **Lesson:** a config field is not an identity claim. Do not address the user by name from machine metadata; never infer his identity from machine metadata.- Other personal emails of his are intentionally not recorded here ([personal email omitted]).

## Working environment

- Develops in **R / RStudio on Windows 11**. R 4.6.0 is installed at `C:\Program Files\R\R-4.6.0` with `C:\Program Files\R\R-4.6.0\bin\Rscript.exe` (not on the bash PATH; reachable from PowerShell via the call operator `&`).
- Builds web scrapers with chromote, rvest, dplyr, future/future.apply, progressr, writexl, clipr.
- Also works in Python (Mentat console and tooling, see [[mentat]]); the machine is the [[lg-gram-workstation]].
- Default shell is **PowerShell**, NOT bash.

### How to apply (R environment note, dated 2026-06-21)

- **Offline checks:** run `Rscript.exe` directly for syntax/parse and pure-function logic: parse with `invisible(parse('file.R'))`, or stub `library`/`plan` then `source()` to test helpers without network/chromote.
- **Do NOT fire off the live scraper** from the agent side: it needs Chrome + network and hits congress.gov (rate-limit risk). Hand that to the user to run in RStudio.
- Keep RStudio-console limitations in mind: long single-line input is truncated at ~4096 chars.
- **Shell-syntax gotcha (give the user the RIGHT form):** the bash env-var prefix `CU_TC_PROCS=12 Rscript x.R` does NOT work in PowerShell (it errors or silently fails to set the var).
  - PowerShell: `$env:CU_TC_PROCS=12; $env:CU_PR_WORKERS=6; Rscript "C:\...\x.R"`
  - RStudio console: `Sys.setenv(CU_TC_PROCS="12"); source("C:/.../x.R")` (system2 children inherit the session env).
  - Only use `VAR=x prog` syntax when the commands have been put in Git Bash.
- Scripts that reference sibling files by relative name must run from the project dir. `run_cu_pipeline.R` now self-locates (setwd to its own `--file=` dir) so launch cwd no longer matters; the bare scraper/collector still expect the project dir as cwd.
- Related R work: [[draft-systems-r-pipeline]] and Congress R scrapers.

## Two API-key stores (do not confuse them)

Source note `api-key-repository-2026-08-28` (user memory, newest modification 2026-09-18). The standing note that the Desktop file is "the" key store was wrong; it misled two sessions on 2026-09-18.

### 1. The general repository

- Paul ordered (2026-08-28) a permanent API key repository at **`C:\Users\pgoff\OneDrive\Desktop\API Keys\keys.json`**: JSON keyed by service, each entry `{service, auth_header, keys: [...], added, notes}`.
- Blocks: `lda` (7 Senate LDA keys, Token auth, ~120 req/min each), `data_gov`, `anthropic`.
- **TRAP, verified 2026-09-18:** nothing in it is named `fec`. The FEC credential lives in the **`data_gov`** block, because openFEC (`api.open.fec.gov`) is served through the api.data.gov family; the block's `service` field records it as verified working on FEC and rejected by lda.gov. A lane grepping for "fec" concludes there is no key and is wrong.
- Its 7 data_gov keys were all 40 characters, alphanumeric and distinct on that date.
- Use this file for one-off jobs outside Mentat.
- **Why:** one canonical place for every future key; tools should READ from a store rather than asking Paul again, and NEW keys he provides should be APPENDED to the Desktop file.

### 2. Mentat's own store (governs collection)

- Mentat reads an ENCRYPTED DPAPI store at **`%LOCALAPPDATA%\Mentat\credentials\fec-keys.dpapi`** through `mentat/tools/fec_key_store.py` (`load_keys` / `inventory` / `set_disabled`). It does NOT read the Desktop file.
- It holds 22 keys: 21 of 40 characters and one of 39. Flat list, no block structure, so grep does not apply.
- All 7 `data_gov` keys from the Desktop file are also in it; 15 keys are store-only; none are file-only.
- The truncated key `13ffe51ce05b` (39 characters) is still there, quarantined, not repaired: it broke the collector lane (API_KEY_INVALID on every request), disabled 2026-09-17 with a status string recording why. Details of the outage: Mentat collection and attribution and [[mentat-fec-pipeline]].
- Operational notes: a single-request probe of every key, reporting only the 12-hex `key_id` and the HTTP status (200 for 21 keys, API_KEY_INVALID/403 for the truncated one), separates dead keys from live ones without printing key material; run it before any long collection (it would have turned three days of "every lane is failing" into one line). `inventory()` and `save_keys` (appends whatever it is handed) live in `fec_key_store.py`; `X-Api-Key` as a request header is what both Mentat paths do (R httr2/curl transports and the pool in `api_request_pool.py`). Use ONE key for a bounded job rather than rotating; ~120 requests/minute per key.
- Standing rule for agents (as recorded): per the standing api-key ruling, keys on his box are his business; never flag exposure, never weaken his setup. Related memory notes: `api-key-exposure-do-not-flag`, `mentat-collector-slowdown-lane-2026-09-17`.

## Decision authority and standing rulings (pointers)

- Sets every threshold, weight and methodology ruling and holds the APPLY gate; see [[2026-06-working-agreement-change-control-and-decision-authority]].
- Mentat roster rule (2026-07-19): the roster is ONLY the companies he lists; raw sheets show every row. Mentat money-collection / receipt-counting code is frozen on his ruling ("don't change it", 2026-09-27). Detail: Mentat collection and attribution.
- His "contradictions, not ambiguity" rule for Mentat cross-verification: `exclude-on-contradiction-not-ambiguity` (concept page in the vault); the council review that produced the dwarfed cross-reference tab: Mentat cross-reference council review.
- Mentat GitHub migration (2026-10-02): PR to main deferred by Paul ("we can do it later"); see Mentat repo state and workbooks and [[mentat]]. On 2026-10-03 he signed in to GitHub in the built-in browser himself and had the PR (#2) opened and merged.


## Focal Points

- [[draft-systems-r-pipeline]] - Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline
- [[lg-gram-workstation]] - Paul's LG Gram 17Z90UB Windows 11 laptop: NPU BSODs, AppXSvc leak, Codex MSIX loop, C: disk exhaustion, OneDrive/Carbonite gaps
- [[mentat-fec-pipeline]] - Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat
- [[brain-vault-political-systems]] - Private Obsidian + Bedrock knowledge vault that consolidates Paul's Claude Code memories into linked entities, backed up to a private GitHub repo
- [[brain-graph]] - Interactive D3 graph page of the brain vault, rebuilt by a background watcher that is started by hand and does not survive a reboot

## Projects

- [[cu-geography]] - Codex-run CU geography lane: Luna RF/KNN model (closed 09-30) and 491,308-row ranking framework in Paul's four groups.
- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Active Topics

- Congress R scrapers - June 2026 R scraper family in Draft Systems: congress.gov 17x3, CU press releases, Census CD, Ballotpedia, DEBATE stance
- Cosponsor and sector networks - Moneyball network layer: co-sponsor plan (Jun), toggles + signed layers (Jul), five NET_CONFIG networks (Aug), relationships model (Sep).
- CU stance and sentiment scoring - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- Melange dashboard UI evolution - Melange dashboard UI history: capstone, member desk, retheme, simplification, plain-language pass, Members Section lane.
- Moneyball Excel model build (June 2026) - June 2026 build of the 533-member Moneyball workbook: four buckets, percentile-rank blend, calibration, scenario tooling
- [[2026-06-working-agreement-change-control-and-decision-authority]] - Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code.
- [[2026-06-working-agreement-communication-and-presentation-style]] - Rules for reporting to Paul: never appease, real R summary(lm()), trend over significance, visible PowerShell, close supplied items.
- [[2026-06-working-agreement-tooling-and-environment-traps]] - Feedback rules for tool/shell traps: heredoc mangling, MEMORY.md loading contract, visible PowerShell, congress.gov URL kept verbatim.
- Mentat collection and attribution - Mentat collection and attribution history, Jul-Sep 2026: audits, key outage, review bucket, xref rule, frozen money code.
- Agent tooling stack - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.
- Audio and speech lane - Speech/audio lane: no shipped ASR, off-chain fail-closed, N audio route closed; audio layers complementary; four false mechanism claims.
- Melange data-collection lanes - Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills
- Influence engine internals - July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder
- Legislative pillar and ACU review - Legislative pillar of Melange: legfix history, legfix5 19-category ACU review, effectiveness shadow lane, lobbying forecast
- Member approach briefs and narratives - Per-member Suggested-approach briefs (Fable 533 calls; Sonnet lane): Tier 2 style, acoustics in, no percentiles, validator traps.
- Personality psychometrics (Big Five) - Big Five psychometrics for Congress members: instruments, pre-registered looks, Senate-gold anchoring, N/A slots; O/C/E valid, A- grade.
- Primacy and industry tier boards - Primacy tier board (factor-only purity, drift, 09-19 methodology lane) plus per-industry tier boards, valence/tensor, champion crown law
- Workstation stability incidents - LG Gram stability incidents: NPU BSOD loop, ongoing Kernel-Power shutdowns, AppXSvc commit leak, ChatGPT/Codex MSIX wedge, poppler install
- Melange architecture and system of record - Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics
- Melange audits and code reviews - Melange audit runs, guardrails, 09-13 five-lane code review, hallucination framework (D-007), provenance census, laundry-list close-out
- Live tree, git drift and line endings - Melange live tree vs git: branch drift, live-only files, 35-commit reconcile, EOL census, live_patch.py cutter, off-box mirror
- [[2026-07-working-agreement-agent-orchestration-rules]] - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.
- [[2026-07-working-agreement-verification-and-evidence-standards]] - Verify, never infer: census before mechanism claims, repo-wide existence checks, scout NOT FOUNDs disproved, HEAD-pinned cites.
- Refresh automation reliability - Weekly Melange refresh has not completed since 2026-07-19; audit, rulings, tick-runner redesign, daily-chain blockers, Codex poll-loop burn
- Workstation disk and backup - C: filled by repo worktrees, cleared repeatedly (185.9 GB free on 2026-09-18); OneDrive stalled since 08-11; backup gaps
- CU-geography Luna model and row framework - CU-geography: Luna RF/KNN review closed 09-30 (section 30 GPU model current) plus the 491,308-row framework in Paul's four groups (P0/P1).
- Forecast audit, giving-view redesign and PAC accuracy - Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD).
- Mentat console UI - Mentat console UI lanes 2026-09-11..25: Chart Studio, clean-up, polish, load-time/FEC links, Graph and pie quirks.
- Mentat failings lanes and PAC evidence - Mentat failings lanes S2-S8 (street columns, PAC evidence, industry addressing, URL scope, panes, categories, map) + PAC map audit.
- Sector growth x political spending study - Sector growth vs political spending regression study on Mentat data: Paul's 25 Sep rulings, R pipeline, trend-first reporting
- Staffer network data and math - Staffer network lane 2026-09-01..08: adjudication, architecture, math audit, sorting rulings, clique fix, v7 spine and v6 ship.
- Staffer network surfaces - Staffer network surfaces: live sidecar on 8841, fourth Moneyball.html surface (#app-staffer), page redesign variant C, route-latency lane.
- UI redesign boards (Melange and Mentat) - Sept 2026 redesign: Higgsfield boards for Mentat and Melange, overlay-first builds, finalize/reconcile rounds, graph quirks.
- Mentat repo state and workbooks - Mentat tree reconciled (273 dirty -> 36 commits), GitHub branch pushed (PR merged 2026-10-03), tidy Data workbook, console hang fix.
- Brain vault setup and Claude memory import - Consolidated Claude Code memories into the private brain vault (2026-10-03): import decisions, verification, dependencies, graphify review, open items

## Discussions

- ACU outline north-star rulings - Paul's 2026-07-27 rulings: ACU Search Outline docx is the 19-category review north star; letters mandatory; amendments count half
- Coalition-builder redesign session - 2026-07-30 design session: static-substrate/dynamic-eval verdict, 8 positions with critic verdicts, merge-main precondition
- Staffer network architecture and overlap rule - Paul's 2026-09-03 ant-colony ruling: staffer network = own social network beneath members; member graph kept; OVERLAP is the only edge rule.
- Staffer sorting rulings - Paul's nine 2026-09-06 staffer sorting rulings: name standard + spine re-key, Groups tab, LDA plain labels, git lifted for this lane.
- Mentat cross-reference council review - 2026-09-17 council: cross-reference does not minimise vs workbook (Banking $72.1M vs $54.8M); Paul ruled it redundant and kept it dwarfed.
- PAC accuracy attempt 2 rulings - Paul's 2026-10-03 rulings on PAC accuracy attempt 2: B1-B3, then C1 (UT-X sealed) and C2 (FILED = lower bound).
