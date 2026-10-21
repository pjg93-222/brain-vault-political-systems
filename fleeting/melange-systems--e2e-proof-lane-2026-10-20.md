---
type: fleeting
title: "E2e proof lane (2026-10-20)"
aliases: ["e2e-proof-lane-2026-10-20"]
source: "session"
captured_at: 2026-10-20
created_at: 2026-10-20
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/e2e-proof-lane-2026-10-20.md", type: "claude-memory", synced_at: "2026-10-20", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\e2e-proof-lane-2026-10-20.md", sha256: "79f92939f10fdbc493b397c368e55171dcc8c6496d99c91d0d760ea302563e59"}
updated_at: 2026-10-20
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# E2e proof lane (2026-10-20)

> 2026-10-20 E2E proof lane: fixes on live main 77af80941 + PR #22; media blocked by 10-17 audio deletion; non-media attempt 3; press/letters branches unlanded

## Content

On 2026-10-20 Paul approved a plan with three goals:
- resolve every open pipeline item;
- get a full end-to-end congress run with the rank delta observed;
- make the inflow (bills, cosponsors, sponsorships, letters) flood.

The plans are `C:\Users\pgoff\.claude\plans\go-into-melange-systems-staged-sutton.md` and `system-reminder-linked-sessions-now-sequential-unicorn.md`. Brain records: D-253..D-266, D-269..D-273, DE-071.

**Landed on live main by fast-forward** (8a641d9ab, then 77af80941):
- GovInfo USCODE statute fallback. House has been down since about 10-04; in the canary, deferrals went from 88% to 0%.
- Cliff guard for carries past 30 days (D-162).
- Hold parking.
- `MELANGE_SENTINEL_CALL_BUDGET` via `fec/admission_budget.py`. The key limit follows the budget.
- `CONGRESS_REDERIVE` behavioural steps after billstatus.
- WJ chromote startup retry.
- Invalid-category carry.
- Statute-source-switch reuse, keyed by the `classified_statute` map.

Published as pjg93-222/Melange#22 (merge f39ca5a40). That merge made PR #20, from the small-tooling session, CONFLICTING.

**E2E attempts:**
- **Attempt 1:** admissions FAIL on 119:hr:10082, an invalid category. Fixed.
- **Attempt 2:** admissions PASS (20 bills, up from 14; 61 memberships, up from 45). Votes PASS.
  - Media FAIL at the `all_intake` integrity gate. On 10-17 a Codex run of `cleanup-audio-cache.py --apply` deleted 2,194 WAVs (DE-071).
  - Axe and HouseLive need restore phases P7/P8 to produce byte-identical files (`C:\melange-data\longform_restore_20261020\restore_audio.py`).
- **Attempt 3:** non-media (`refresh_congress_pipeline.py` with no `--include-media`), approved by Paul. It waits for another session's backfill_attribution writers.

**Ready but not landed** (land after the E2E PASS):
- Press host routes, `fix/e2e-press-20261020` @ 204e139fc. Expected to take unavailable bodies from 633 to about 279. The next press run re-walks for about 10.5 h.
- Letters collector, `fix/e2e-letters-20261020` @ d9d094402. Gates E/C; dial `LETTERS_PROMOTE`.

**Rank attribution tool:** `side-session-notes\local_6ad43510-...\rank-attribution\attribute.py`. It does an exact pillar replay. Pass `--run-dir` explicitly. Never run it while the pipeline is live.

**Why:** Paul wants the proven run and the rank delta, not repo commits (`land-means-in-the-app-2026-10-15`).

**How to apply:**
- The auto-mode classifier blocks pipeline launches as "Production Deploy". Each launch shape needs Paul's explicit OK in chat.
- Never run heavy tests while a chain runs.
- After PASS:
  - land press and letters;
  - run the kernel tests and audit_full;
  - check the desk in the app;
  - register MelangeRefreshTick only after media passes too.

Related: `pipeline-health-lane-2026-10-19`, `wave1-refresh-resilience-2026-10-20`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-20 from the Claude Code memory file `e2e-proof-lane-2026-10-20.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
