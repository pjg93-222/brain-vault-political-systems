---
type: fleeting
title: "Brainlink knowledge system (2026-10-05)"
aliases: ["brainlink-knowledge-system-2026-10-05"]
source: "session"
captured_at: 2026-10-05
created_at: 2026-10-05
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/brainlink-knowledge-system-2026-10-05.md", type: "claude-memory", synced_at: "2026-10-05", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\brainlink-knowledge-system-2026-10-05.md", sha256: "ef4790fc0f31cacb17c13e4d01161adf8537dc3c4b9fceaffdc24b6869eef957"}
updated_at: 2026-10-05
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Brainlink knowledge system (2026-10-05)

> Brainlink (approved 2026-10-05): the Project Brain is the ledger, the vault is the map, memory holds pointers; ownership table, where the tool lives, rulings-written-at-once rule, the forecast/PAC migration's new brain IDs (D-089..D-098, DE-058..DE-065) and the open items

## Content

**What:** Brainlink makes one knowledge system out of the Project Brain, the Obsidian vault and Claude memory. A fact has exactly one owner; everywhere else it is a link or a generated mirror. The tool (`brainlink.py`, stdlib Python, separate from `brainctl.py`) projects brain entries ONE WAY into generated vault `ledger/` notes, checks the three systems for drift, and compiles questions for Paul in `ledger/QUESTIONS.md`. Designed 2026-10-04, approved by Paul 2026-10-05 (design file: the scratch workspace's `brainlink-design.md`; brain D-094).

**Who owns what:**
- Project Brain (`melange-systems-brain`): CONSTRAINTS, DECISIONS (Paul's rulings, with quote + transcript reference), DEADENDS, STATE (position, next action, open questions for Paul).
- Obsidian vault: people, actors, concepts, topics, discussions and the link graph; generated `ledger/<brain>/D-xxx.md` mirror notes.
- Claude memory: pointers and working context only. It may say "BLEND adopted, see D-099" (D-093, superseded by D-099 for source correction; the decision is unchanged); it may not restate a decision as its own fact, and may not claim "waits on Paul" without a brain open-question reference.
- Results and metrics: the primary artefact file (cited by path and sha256), not any of the three.

**Where it lives:** `C:\Users\pgoff\OneDrive\Desktop\Project Brain\brainlink\` in the toolkit repo (master merge `0bf2271`, later commits on master); machine-local settings in the git-ignored `brainlink\config.local.json`; run log and latest findings in `brainlink\var\` (`brainlink.log`, `check-latest.json`). Run it from an exported copy (`git archive master brainlink`), not the live tree, because another agent may be switching branches there. Commands: `project`, `check [--json]`, `questions`, `status`, `hook stop|session-start`. brainctl, brain files and memory are never written by it; it never runs git in the vault and never deletes.

**Rule: rulings are written to the brain at once (D-095).** When Paul rules in any lane, record it immediately with `brainctl decide`, quoting him and giving a transcript reference; brainctl assigns the ID at write time. Drafts NEVER carry D-/DE- numbers (use provisional keys such as `P-2026-10-05-<slug>`); hand-numbered drafts collided with other lanes on 2026-10-01 (DE-065). Ledger notes reach GitHub only through Paul's normal vault PR flow (D-096). Corrections are supersession marks (`~~old~~ - superseded <date>: <correct fact> (source: ...)`), never deletions; MEMORY.md lines are edited in place only.

**Forecast / PAC migration, 2026-10-05 (Paul's rulings R1-R4):** the 2026-10-01 forecast drafts were applied under new IDs: old D-075 -> D-089 (the lane works locally), D-076 -> D-090 (non-giving receipts excluded), D-077 -> D-091 (integrity-ledger fixes), D-078 -> D-092 (cycle phase, trajectory, inflation), D-079 -> D-093 (BLEND; D-093, superseded by D-099 for source correction); old DE-054..DE-060 -> DE-058..DE-064. The brain's own D-079 is the unrelated system-manifest rebuild, so any "D-079 BLEND" in older notes means D-099 (D-093, superseded by D-099 for source correction). R1: BLEND still stands, ACTIVE (source: Paul's answer "Still stands", 2026-10-05T01:58:54.398Z, Claude Code session 2a1f8c4b-6c8d-4cc7-9241-449e010db5ef, transcript line 908; D-093 cited it as "task brief, this session"; corrected in D-099). R3: nothing from the 2026-10-01 model rebuild was published; the live pointer is still refit-20260930-377f7324-c3f221343515, so "the blend now in production uses the rebuilt model" was wrong and is marked superseded where it appeared. Brainlink's own entries: D-094 (design), D-095 (rulings at once), D-096 (ledger via the PR flow), D-097 (vault tooling treats `ledger/` as generated; vault commit `2efd606` on branch `brainlink-golive-2026-10-05`, pending merge), D-098 (mirror push failures are logged and emitted to Glass Box), DE-065 (hard-coded draft IDs), D-099 (restates D-093 verbatim to correct its source citation; D-093 marked SUPERSEDED; the decision is unchanged). The brain STATE forecast bullet was corrected (v2 published 2026-09-30T21:53:03Z, Mentat `e48c25b42`; the console clean-up and Sector Growth Study committed as `56519c628` and `04e2391e5`).

**Open items (questions for Paul, not facts):** drift questions 3, 4, 5, 7 and 8 (the four 10-01 rebuild decisions a-d; the canonical banking accuracy number, 2016 and the 90 bar; the methodology list A-L; the P&C/auto PAC rosters; the scope of each download authorisation) are in the brain STATE Open questions; whether the scheduled task `score-pac-live-freeze-2026` should gain the D6 v5 line (recorded, not executed); the vault branch `brainlink-golive-2026-10-05` is not merged into the live vault. Not yet marked in memory: `forecast-audit-lane-2026-09-29` still says the Sector Growth Study is untracked and to commit it (it was committed as `04e2391e5`).

**Why:** the 2026-10-04 drift audit of the forecast records found stale, missing and contradictory lines in all three systems (BLEND absent from the brain for four days, "waits on Paul" lines for things already done, a wrong production-blend claim copied from a diagnostic into memory and the vault).

**How to apply:** record Paul's rulings in the brain at once and cite the ID here instead of restating the decision; check a status claim against the brain STATE and primary evidence (git, pointer file, transcript) before copying it (`verify-dont-infer-completion-2026-08-04`); never run anthropic-skills:consolidate-memory over ledger-derived content (it merges and deletes). Related: `project-brain-toolkit-2026-08-11`, `forecast-audit-lane-2026-09-29`, `mentat-forecast-redesign-lane-2026-09-30`, `pac-accuracy-attempt2-lane-2026-10-03`, `pac-accuracy-six-year-lookback-directive-2026-10-03`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-05 from the Claude Code memory file `brainlink-knowledge-system-2026-10-05.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
