---
type: discussion
title: "PAC accuracy attempt 2 rulings"
aliases: ["PAC accuracy attempt 2 rulings"]
date: 2026-10-03
summary: "Two ruling rounds on 2026-10-03 governing the PAC-to-candidate giving accuracy attempt 2 (HOLD, scratch only): B1 the 1% rule applies to cycles the cell reads, B2 strict own-PAC P&C identity, B3 FILED = as-of-issue vintage rebuild; after the S2B gate HELD, C1 UT-X stays sealed with S3 dev-only and C2 FILED = disclosed amendment-loss lower bound."
conclusions:
  - "B1 (2026-10-03, binding amendment): the 1% rule applies to 'cycles the cell reads'; the threshold is unchanged."
  - "B2 (2026-10-03, binding amendment): P&C identity is strict own-PAC (drops GEICO PAC for Berkshire and SAFECO-PAC for Liberty Mutual; no judgment matches)."
  - "B3 (2026-10-03, binding amendment): FILED = as-of-issue vintage rebuild, all inputs cut."
  - "C1 (2026-10-03, second round): UT-X stays SEALED this attempt; S3 is dev-only (banks, SchoolsFirst); METHOD_SPEC stays frozen; opening UT-X needs a new owner ruling."
  - "C2 (2026-10-03, second round): FILED = disclosed amendment-loss lower bound; the no-downloads rule stands."
  - "Repair path after C1/C2: S2C narrow repair, then v3 freeze, then ONE Opus verifier gate (not 3)."
  - "Why: the UT-X holdout can be scored once; spending it on a known non-certifiable freeze wastes it."
action_items:
  - "Do not launch S3 without Paul's explicit OK and a fresh gate on the v2 freeze (owner: Paul / coordinator). Progress 2026-10-03: after the S2C gate PASSED on the v3 freeze, S3 ran dev-only, one pass, on Paul's 'finish'."
  - "Finish S2C narrow repair, produce the v3 freeze, run ONE Opus verifier gate (owner: coordinator; S2C launched ~06:2x UTC on 2026-10-03). Done 2026-10-03: S2C gate PASS."
  - "Run the Glass Box watcher code/glassbox/stage_watch.ps1 alongside every stage (owner: coordinator)."
  - "Opening UT-X requires a new owner ruling (owner: Paul). Progress 2026-10-03: the attempt finished ~08:45 UTC with UT-X SEALED_NOT_SCORED."
related_topics:
  - "[[2026-09-feature-forecast-giving-redesign]]"
related_actors: []
related_people:
  - "paul-goff"
related_projects:
  - "[[forecast-redesign]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-attempt2-lane-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-attempt2-lane-2026-10-03.md", sha256: "10cf0f215277dcb435746964245dfd6291be8f676bf9c981cdeed7015ac02cd4"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/discussion", "domain/research"]
---

# PAC accuracy attempt 2 rulings

> Two ruling rounds by Paul on 2026-10-03 (B1-B3, then C1-C2) that amend and constrain the PAC-to-candidate giving accuracy attempt 2: UT-X holdout stays sealed, FILED becomes a disclosed amendment-loss lower bound.

## Context

- Attempt 2 root: `C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt2-20261003T003312Z`.
- Coordinator brief = Paul's pasted prompt: stages S0-S7, Opus read-only review, Sonnet builds via `code/launch_stage.ps1`. HOLD stays; scratch only.
- This is the PAC-accuracy leg of [[2026-09-feature-forecast-giving-redesign]] and part of the program [[forecast-redesign]]; the holdout rules it leans on are in [[single-look-holdout-discipline]]. Rulings are by Paul Goff.
- Source memory file: `pac-accuracy-attempt2-lane-2026-10-03`, described as "PAC-to-candidate giving accuracy attempt 2 (scratch, HOLD) - stage state, Paul's B1-B3 rulings, gate history" (modified 2026-10-03T06:11:53Z; session id 13a17b30-2c5b-43ad-a902-b5ad3a1253cf). Dated note (2026-10-04): `sources:` holds the newer version of this file, modified 2026-10-03T19:46:53Z, since the fleeting pass of 2026-10-04.
- Related memory names: `forecast-audit-lane-2026-09-29`, `mentat-forecast-redesign-lane-2026-09-30`, `glassbox-everything-rule-2026-07-27`.

## Participants

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).

## Related Topics

- [[2026-09-feature-forecast-giving-redesign]] - Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD).

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model

## Conclusions

- **B1 (binding amendment, 2026-10-03):** the 1% rule applies to "cycles the cell reads"; threshold unchanged.
- **B2 (binding amendment, 2026-10-03):** P&C identity is strict own-PAC (drops GEICO PAC for Berkshire, SAFECO-PAC for Liberty Mutual; no judgment matches).
- **B3 (binding amendment, 2026-10-03):** FILED = as-of-issue vintage rebuild, all inputs cut.
- **C1 (second round, 2026-10-03):** UT-X stays SEALED this attempt; S3 dev-only (banks, SchoolsFirst); METHOD_SPEC still frozen; opening UT-X needs a new owner ruling.
- **C2 (second round, 2026-10-03):** FILED = disclosed amendment-loss lower bound; no-downloads stands.
- Consequence: S2C narrow repair -> v3 freeze -> ONE Opus verifier gate (not 3). S2C launched ~06:2x UTC.

## Action Items

- [x] Never launch S3 without Paul's OK and a fresh gate on the v2 freeze (owner: Paul / coordinator). Progress 2026-10-03 (source `pac-accuracy-attempt2-lane-2026-10-03`, newer version): after the S2C gate PASSED on the v3 freeze, S3 ran dev-only, one pass, on Paul's "finish".
- [x] Complete S2C narrow repair, v3 freeze, and the single Opus verifier gate (owner: coordinator). Done 2026-10-03: S2C gate PASS.
- [ ] Run the Glass Box watcher `code/glassbox/stage_watch.ps1` alongside every stage; S2's first 49 min were unwatched (owner: coordinator)
- [ ] Any opening of UT-X needs a new owner ruling (owner: Paul). Progress 2026-10-03: the attempt finished with UT-X SEALED_NOT_SCORED, so the single shot is still unspent.

## Gate and stage history (2026-10-03, UTC)

| Time | Event |
|---|---|
| ~04:20 | State: S2 done (all 12 artifacts). Coordinator gate BLOCKED (`receipts/GATE_S2_COORDINATOR.md`): gate verifier G1-G7 PASS (cent repro, hashes), but the MLE reviewer BLOCKED because UT-X CERTIFIED_PASS was unreachable (the 1% unparseable-receipt rule counted 2012/2014) and FILED only switched O_avail. |
| after the S2 gate | S2B pre-score repair launched (`strategy/S2B_PROMPT.md`) with Glass Box watcher `code/glassbox/stage_watch.ps1`. S3 needs Paul's explicit OK (UT-X is single-shot). |
| after the S2 gate | First round of rulings B1-B3 (binding amendments, see above). |
| ~05:46 | S2B done, v2 freeze; gate HELD (`receipts/GATE_S2B_COORDINATOR.md`): certification structurally unreachable (inner fold s=2016 reads 2012/2014 paper-era receipts; min n>=4), P&C cohort = Travelers + legacy Chubb Corp only, FEC bulk files keep only the latest report version so FILED cannot be truly as-of-issue. |
| after the S2B gate | Second round of rulings C1-C2. |
| ~06:2x | S2C narrow repair launched -> v3 freeze -> ONE Opus verifier gate (not 3). |
| ~08:45 | FINISHED (Paul: "finish"): S2C gate PASS -> S3 dev-only one pass -> S4 ACCEPT_WITH_REPAIRS -> S5 disclosure repairs -> S6 ACCEPT_WITH_NOTES -> S7 delivery. Goal NOT met, HOLD unchanged, UT-X SEALED_NOT_SCORED; results and the later v4 branch are in Forecast audit, giving-view redesign and PAC accuracy. |

## Rulings, verbatim wording as recorded

First round, "Paul's rulings 2026-10-03 (binding amendments)":

- "B1: 1% rule applies to "cycles the cell reads"; threshold unchanged."
- "B2: P&C identity strict own-PAC (drops GEICO PAC for Berkshire, SAFECO-PAC for Liberty Mutual; no judgment matches)."
- "B3: FILED = as-of-issue vintage rebuild, all inputs cut."

Second round, "Paul's rulings 2026-10-03 (second round)":

- "C1: UT-X stays SEALED this attempt; S3 dev-only (banks, SchoolsFirst), METHOD_SPEC still frozen; opening UT-X needs new owner ruling."
- "C2: FILED = disclosed amendment-loss lower bound; no-downloads stands."
- "S2C narrow repair -> v3 freeze -> ONE Opus verifier gate (not 3). S2C launched ~06:2x UTC."

## Why and how to apply

- **Why:** the UT-X holdout can be scored once; spending it on a known non-certifiable freeze wastes it.
- **How to apply:** never launch S3 without Paul's OK and a fresh gate on the v2 freeze. The Glass Box watcher must run alongside every stage (S2's first 49 min were unwatched).

## Reading notes (inference by the importer, not recorded rulings)

- B3 asked for a true as-of-issue vintage rebuild, but the S2B gate found FEC bulk files keep only the latest report version, so FILED cannot be truly as-of-issue; C2 resolves this by redefining FILED as a disclosed amendment-loss lower bound while the no-downloads rule stands (so older report versions cannot be fetched).
- B1 changed which cycles the 1% unparseable-receipt rule counts, yet certification stayed structurally unreachable at S2B (inner fold s=2016 reads paper-era receipts for 2012 and 2014; minimum n>=4); C1 therefore keeps UT-X sealed instead of spending the single shot.
