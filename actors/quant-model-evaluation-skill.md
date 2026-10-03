---
type: actor
name: "quant-model-evaluation skill"
aliases: ["/quant-model-evaluation"]
category: "tool"
description: "quant-model-evaluation: a GENERAL data-scientist evaluation / assumption-testing skill (read-only scripts, house gates in references/bindings/melange.md), built and fast-forwarded into LIVE main as c13f3a5d4 on 2026-09-30, user-level junction in ~/.claude/skills."
repository: "C:\\Users\\pgoff\\.claude\\skills\\quant-model-evaluation"
stack: "Claude Code skill (SKILL.md + references/bindings/melange.md); 11 read-only Python/R scripts + 176 tests (suite later 190 passed / 2 skipped); Glass Box emission"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "Install side effect: bs4 + matplotlib now importable by the production Python (recover_press_refresh.py now uses installed bs4); pip truststore crashed (used --use-deprecated=legacy-certs); CRAN over IPv6 resets ~75% (forced IPv4); both proposed as DEADENDS for Paul"
  - "OpenAlex keyless daily budget gets exhausted by heavy agent fan-out; use CrossRef alone (cite_check handles 429 as UNVERIFIED-HERE, --no-openalex)"
  - "A research agent once put Paul's email in a CrossRef User-Agent; never send his email to APIs (cite_check --mailto only when Paul supplies one)"
  - "GateGuard blocks the first Write/Edit of each new file until 4 facts are stated; brief agents on it"
  - "Melange sessions may list the skill twice (user-level junction + LIVE copy)"
  - "SUSC_B5_W 60/40 is NOT on main; D-006 contradicts CLAUDE.md on who commits the brain; SR 11-7 was superseded 2026-04-17 by SR 26-2"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-row-framework-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-row-framework-2026-09-30.md", sha256: "d7f07745e795faa8dadec2fef7f0f193f6ad03914bd6a65b82c2bd6c28fd2e79"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/quant-model-evaluation-skill-lane-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\quant-model-evaluation-skill-lane-2026-09-30.md", sha256: "4a3dbc28397c5529127d6a1943bdedc8e9d6ea1607f1e586168e6d095be4f34f"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# quant-model-evaluation skill

> Read-only quantitative model evaluation skill (`/quant-model-evaluation`): a GENERAL data-scientist evaluation and assumption-testing skill, built and merged to main c13f3a5d4 on 2026-09-30, used for the CU-geography row framework.

## Details

| Field | Value |
|---|---|
| Repository | none (skill files); LIVE copy `.claude/skills/quant-model-evaluation/` in the Melange repo; built in worktree `melange-math-eval-skill-18e907`; user-level junction `C:\Users\pgoff\.claude\skills\quant-model-evaluation` -> LIVE copy |
| Stack | Claude Code skill; 11 read-only scripts + 176 tests; Glass Box emission; R and Python helper packages |
| Status | active |
| Criticality | medium |
| PCI | no |
| Team | none |

## Dependencies

- Synthesized from K-Dense-AI scientific-agent-skills (MIT, `NOTICE.md`) plus new finance / computational-social-science / regulatory / citation research.
- Melange specifics live ONLY in `references/bindings/melange.md`; the skill is used after `moneyball-change-control` for any model/number/claim evaluation. The binding carries the house gates: ask-first, money frozen, gold = Paul's adjudication, never point `mutation_check` at `fec/` code, look fragments prereg-gated. Related projects/actors: [[melange-systems]], [[moneyball-skill-library]], [[cu-geography]] (row framework run through this skill), [[single-look-holdout-discipline]], [[2026-07-feature-agent-tooling-stack]], [[2026-09-feature-cu-geography-luna-and-row-framework]].
- Emits to the GLASS BOX stream (see the Glass Box rule in the agent-tooling topic).
- Installed packages (Paul: "Install both sets"; no existing version changed): R = sandwich lmtest strucchange fixest sensemakr rdrobust Benchmarking spdep; Python = linearmodels SALib libpysal esda arch.
- External: CrossRef (and OpenAlex, keyless, daily budget gets exhausted) for citation currency checks; `cite_check` handles 429 as UNVERIFIED-HERE, `--no-openalex`.
- Related memory notes: `ask-before-substantive-changes`, `dont-be-jumpy-removing-money-2026-09-26`, `r-summary-regression-presentation-2026-09-25`, `trend-over-significance-2026-09-26`, `skills-library-2026-07-10`, `glassbox-everything-rule-2026-07-27`.

## Flows

- Built and landed 2026-09-30 in worktree `melange-math-eval-skill-18e907` as `.claude/skills/quant-model-evaluation/`; commit c13f3a5d4 fast-forwarded into LIVE main on Paul's "Commit and merge to main". The user-level junction was Paul's choice (one copy, no drift).
- Paul's framing: "It will be more than just melange it is a general data scientist skill".
- Usage: invoke for any model/number/claim evaluation (after `moneyball-change-control`); it is evaluation-only. Used 2026-09-30 for Paul's CU row framework request (see [[cu-geography]]).
- Long waits: run from the MAIN session or Agent-tool agents, never workflow agents: their Monitor events die when their turn ends.

## Dev Commands

```bash
# cite_check options recorded in the sources
cite_check --no-openalex        # CrossRef alone suffices; 429 handled as UNVERIFIED-HERE
cite_check --mailto <address>   # only when Paul supplies one; never his email
# pip install used the legacy-certs flag because pip truststore crashed
pip install ... --use-deprecated=legacy-certs
# CRAN installs forced to IPv4 (IPv6 resets ~75%)
# the skill suite: 190 passed / 2 skipped (6 files adopted in LIVE); the pod QME suite was 175 passed / 2 skipped
```

## Known Issues

- Install side effect: bs4 + matplotlib are now importable by the production Python (`recover_press_refresh.py` now uses installed bs4). pip truststore crashed (used `--use-deprecated=legacy-certs`); CRAN over IPv6 resets ~75% (forced IPv4). Both proposed as DEADENDS for Paul.
- OpenAlex keyless daily budget gets exhausted by heavy agent fan-out; CrossRef alone suffices for currency (`cite_check` handles 429 as UNVERIFIED-HERE, `--no-openalex`).
- A research agent once put Paul's email in a CrossRef User-Agent; NEVER send his email to APIs (`cite_check --mailto` only when Paul supplies one).
- GateGuard blocks the first Write/Edit of each new file until 4 facts are stated (callers, no duplicate, data fields, Paul's verbatim instruction): brief agents on it.
- Melange sessions may list the skill twice (user-level junction + LIVE copy).
- Review artifacts (doctrine/code/factual/dry-run/consistency) live in the session scratchpad (temporary).
- Still standing: SUSC_B5_W 60/40 is NOT on main; D-006 contradicts CLAUDE.md on who commits the brain; SR 11-7 was superseded 2026-04-17 by SR 26-2.

## Paul's rulings in this lane

- Name: quant-model-evaluation.
- "Ship read-only scripts" (11 scripts + 176 tests, Glass Box emission).
- "Install both sets" (R: sandwich lmtest strucchange fixest sensemakr rdrobust Benchmarking spdep; Python: linearmodels SALib libpysal esda arch; no existing version changed).
- **Why it matters / how to apply:** use this skill (after `moneyball-change-control`) for any model/number/claim evaluation; it is evaluation-only and the binding carries the house gates.

### Rulings 2026-09-30 ("F1. Yes F2. One PAC's F3. Ratify F4. Proceed F5. Yes F6. Proceed")
- **F1:** stance gate adopted; the optimizer had funded 10 Skeptic/Highly Skeptical/Opponent members $54,500.
- **F2:** the $2.5M pot is ONE PAC's budget.
- **F3:** R2 imputation ratified.
- **F4:** desk metric fixes.
- F1+F4 LANDED in LIVE main b488a99fe (kernel 257/5, same 4 baseline reds + the test_refresh_tick timeout).
- **F5:** the original scoring attempt stopped UNDERPOWERED before H1/H2 correlations. Paul subsequently chose archive refresh and kept gap equal to Suggested. The pod refreshed all 468 frozen bill IDs from official GovInfo XML; 6,284 dated events, zero errors. Independent replay finds 72 new-event members among the original 511 eligible members (73 events), below 150; current-roster 77 is a different denominator. Role-row multiplicity changed between archives and H2 changed after the freeze. No new counting rule or association was applied; the look remains UNSPENT. Candidate and receipts: `/workspace/f5-check`; preserved local packet in the matching session scratchpad `f6apply/f5-pod-evidence-20260930.tar.gz`.
- **F6:** explicitly approved applying the brain drafts (original proposal line 15710, human ruling line 15721). The prior note claiming they were applied was not supported by the current brain. Recovery now appends D-070 to D-074 / DE-051 to DE-053 and scoped STATE notes, preserving the forecast lane and existing entries. The worktree binding is corrected; its landing is the coordinator's responsibility.

### Regeneration rulings
- "A: refresh inputs, full run".
- N19 fix "Hold low-confidence + longer timeout" = a77bfb6db: a below-high decision becomes a hold for EVERY key, including admitted bills. `119:hr:9460/9514` drop out if the classifier is unsure again.
- The per-call bound is 480 s, and failures now carry stdout.
- The first N19 failure was the npm CLI OAuth session expiring; the error text was on stdout.
- PHASE 2 (land a77bfb6db + fdc201076 leakage CoW fix in LIVE, then N19, membership refresh, full chain, kernel + audit) was running at 20:10 on 2026-09-30. Verify the LIVE log before trusting this line.

## Recovery checkpoint 2026-09-30

- N19 PASS 20:09:17Z; membership sidecar PASS 20:33:36Z and hash-bound; refresh publication PENDING.
- Pod QME suite 175 passed / 2 skipped.
- Full production chain, parity, final kernel/audit gates, output reconciliation and 8841 restart remained pending in the coordinator lane. Earlier PHASE 2 running statements are historical. F6 did not alter the managed brain boot rules.

## Local refresh attempt, 2026-10-01 ~00:20Z

- The harness reaped the membership refresh for low memory; it died at slice step 14/68 (`member_reference_layer`).
- Collection had passed: receipt 00:10:16Z, 479/479, publication PENDING. Upstream inputs were rewritten, but ranks, plan and surfaces still date from 09-20, so LIVE was mixed-vintage. Nothing committed.
- Baselines and the read-only checkers (`capture.py`, `f1f4_check.py`, `roi_floor_impact.py`) are in `C:\Users\pgoff\Melange-Pod-Recovery\20260930\local_refresh\`.
- Free RAM was 7.8 of 31.5 GB, with no large process; this matches the AppXSvc leak.
- Paul ruled: "Reboot, then rerun" (after the reboot rerun step 3 in full, with PYTHONUNBUFFERED=1, then the full chain, kernel/audit, f1f4 and movers); ROI floor "Measure first" (run `roi_floor_impact.py` after the rerun; decision pending); `MelangeStafferLiveSidecar` stays disabled (Codex handoff); the 95 Linux portability files are NOT landed; skill suite 190 passed / 2 skipped, 6 files adopted in LIVE.

## REFRESH DONE 2026-10-01 (no reboot; the full-chain retry ran 09:09 to 09:55Z)

- **Mixed-direction admissions.** Paul chose "Hold both bills" and then "Hold before fetch". Landed in LIVE 15977a0fa, 862478165 and 3e0621922 (branch fc78aaf42, f130a7edc, 6611340b9). `119:hr:9461` and `9490` are held; admissions are now 08eab127, with 0 paid calls. The uscode.house.gov "Under Maintenance" outage forced the pre-fetch hold.
- **Chain:** 79/79, DE-044 shape. LIVE is ONE vintage on the 09-27 money (stale at 10-05T10:29Z). Ranks cde36ac1; honors restored; alias, source-to-dashboard and email PASS.
- **Kernel:** 261/3, all standing.
- **Audit:** 553/17. 2 standing, and 15 A2/A2b from the stale 09-18 `system_manifest` inventory.
- **F1/F4:** PASS. 19 gated, 0 funded; gap = Suggested for 533.
- **Movers vs 09-20:** 393 total (245 legislative percentile, 19 own admissions, 9 bill/membership, 102 press, 18 displacement). Money doesn't feed ranks.
- **ROI floor:** 10 members change at 4 dp, max Danny Davis 0.0092 vs 0.0115, top-20 identical. Ruling still open at that point; it looks cosmetic.
- **Open for Paul:**
  - The publication verifier says INCOMPLETE: collection c0d29f11 FAIL not PENDING, tolerated `build_descriptive_speech` (YouTube receipt stale since 08-31), and 10 novel audit names. A qualified attestation or clearing those inputs is his call.
  - Whether to rebuild `system_manifest`.
  - Acknowledge the `system_manifest` money-pin write and the email zip.
  - 8841 restart vs the Codex handoff keeping the sidecar disabled.
  - Hold-retry priority.
  - The 10-04 weekly with uscode down.
  - Brain drafts D-075 / D-076 / DE-054 / DE-055 plus a STATE bullet (in the workflow journals `wf_16f9bb4e-ecc` and `wf_5c713a80-fff`).
- **Machine:** about 35 python 0xc000070a crashes 09-29 to 10-01; none during the retry.

## "Finish it all" 2026-10-01

- Paul ruled: ROI "Match backend"; publication "Qualified sign-off"; inventory "Rebuild + re-audit"; 8841 "Start once, task stays off".
- ROI landed in LIVE: 5504167447, plus bindings 9a7d66f44 and 5e92f304c.
- Brain D-075 to D-081 and DE-054/055 committed as 02de571; outcomes still PENDING.
- Chain #3 (16:04Z) crashed natively at `build_archive_legislative`: python 0xc000070a ntdll at 16:29Z, with 3.6 GB RAM free. The reboot was asked for again.
- STILL TO DO after the reboot:
  - full chain;
  - `runs\step6_build_system_manifest.cmd`, then `audit_full`, then the kernel;
  - f1f4 checks and the ROI parity check (`roi_floor_impact.py` no longer works, since the old floor is gone; use `verify_finish\roi_verify.py`);
  - write `PUBLICATION_SIGNOFF_20261001` and land it;
  - start 8841 once;
  - write the brain outcomes;
  - verify.

## Use in CU-geography (2026-09-30)

- Paul's row-framework request came via `/quant-model-evaluation` on 2026-09-30: "develop the framework used to assess and rank all of the rows within the dataset" (four groups; P0 aggregate-only build on defaults; P1 populate waits for Paul's go; app wiring after his review). Detail: [[2026-09-feature-cu-geography-luna-and-row-framework]].
- The row-framework council used four voices (data scientist, mathematician, lobbyist, policymaker); the Codex external critique was ABSENT (CLI 0.159.0 vs the adapter's 0.146.0). Model rule for the V3 build: build Sonnet xhigh, verify Opus high.

## Related Actors

- [[moneyball-skill-library]] - Melange project skill library (16 built 2026-07, 20 by 2026-09-30); change-control = constitution; refreshed on main b7faf6344.

## Related Topics

- [[2026-07-feature-agent-tooling-stack]] - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.
- [[2026-09-feature-cu-geography-luna-and-row-framework]] - CU-geography: Luna RF/KNN review closed 09-30 (section 30 GPU model current) plus the 491,308-row framework in Paul's four groups (P0/P1).

## Related Projects

- [[cu-geography]] - Codex-run CU geography lane: Luna RF/KNN model (closed 09-30) and 491,308-row ranking framework in Paul's four groups.
- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model
