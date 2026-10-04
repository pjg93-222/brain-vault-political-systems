---
type: topic
title: "quant-model-evaluation skill lane (2026-09-30) (Agent tooling stack)"
aliases: ["Agent tooling stack: quant-model-evaluation skill lane (2026-09-30)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-10
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/feature"]
part_of: "[[2026-07-feature-agent-tooling-stack]]"
---

# quant-model-evaluation skill lane (2026-09-30) (Agent tooling stack)

> The quant-model-evaluation skill lane of 2026-09-30: findings F1 to F5, the N19 hold fix, the leakage fix and the production chain left pending. Part of [[2026-07-feature-agent-tooling-stack]] (project [[melange-systems]]).

## quant-model-evaluation skill lane (source: quant-model-evaluation-skill-lane-2026-09-30, last modified 2026-10-01; see [[quant-model-evaluation-skill]])

### Build and landing (2026-09-30)

- Built and landed in worktree melange-math-eval-skill-18e907: `.claude/skills/quant-model-evaluation/` - a GENERAL data-scientist evaluation / assumption-testing skill (Paul: "It will be more than just melange it is a general data scientist skill"), synthesized from K-Dense-AI scientific-agent-skills (MIT, NOTICE.md) + new finance/CSS/regulatory/citation research. Melange specifics live ONLY in `references/bindings/melange.md`.
- Commit c13f3a5d4, fast-forwarded into LIVE main on Paul's "Commit and merge to main". User-level junction `C:\Users\pgoff\.claude\skills\quant-model-evaluation` -> LIVE copy (Paul chose it; one copy, no drift; Melange sessions may list the skill twice).
- Paul's rulings in this lane: name quant-model-evaluation; "Ship read-only scripts" (11 scripts + 176 tests, Glass Box emission); "Install both sets" (R: sandwich lmtest strucchange fixest sensemakr rdrobust Benchmarking spdep; Python: linearmodels SALib libpysal esda arch - no existing version changed).

### Why it matters / how to apply

- Use this skill (after moneyball-change-control) for any model/number/claim evaluation; it is evaluation-only and the binding carries the house gates (ask-first, money frozen, gold = Paul's adjudication, never point mutation_check at fec/ code, look fragments prereg-gated).
- Install side effect: bs4 + matplotlib now importable by the production Python (`recover_press_refresh.py` now uses installed bs4). pip truststore crashed (used `--use-deprecated=legacy-certs`); CRAN over IPv6 resets about 75% (forced IPv4). Both proposed as DEADENDS for Paul.
- OpenAlex keyless daily budget gets exhausted by heavy agent fan-out; CrossRef alone suffices for currency (`cite_check` handles 429 as UNVERIFIED-HERE, `--no-openalex`).
- A research agent once put Paul's email in a CrossRef User-Agent; NEVER send his email to APIs (`cite_check --mailto` only when Paul supplies one).
- GateGuard blocks the first Write/Edit of each new file until 4 facts are stated (callers, no duplicate, data fields, Paul's verbatim instruction) - brief agents on it.
- Review artifacts (doctrine/code/factual/dry-run/consistency) live in the session scratchpad (temporary).

### Paul RULED 2026-09-30 ("F1. Yes F2. One PAC's F3. Ratify F4. Proceed F5. Yes F6. Proceed")

- **F1:** stance gate adopted; the optimizer had funded 10 Skeptic/Highly Skeptical/Opponent members $54,500.
- **F2:** the $2.5M pot is ONE PAC's budget.
- **F3:** R2 imputation ratified.
- **F4:** desk metric fixes.
- F1 + F4 LANDED in LIVE main b488a99fe (kernel 257/5, same 4 baseline reds + the test_refresh_tick timeout).
- **F5:** the original scoring attempt stopped UNDERPOWERED before H1/H2 correlations. Paul subsequently chose archive refresh and kept gap equal to Suggested. The pod refreshed all 468 frozen bill IDs from official GovInfo XML; 6,284 dated events, zero errors. Independent replay finds 72 new-event members among the original 511 eligible members (73 events), below 150; current-roster 77 is a different denominator. Role-row multiplicity changed between archives and H2 changed after the freeze. No new counting rule or association was applied; the look remains UNSPENT. Candidate and receipts: `/workspace/f5-check`; preserved local packet in the matching session scratchpad `f6apply/f5-pod-evidence-20260930.tar.gz`.
- **F6:** explicitly approved applying the brain drafts (original proposal line 15710, human ruling line 15721). The prior note claiming they were applied was not supported by the current brain. Recovery now appends D-070 to D-074 / DE-051 to DE-053 and scoped STATE notes, preserving the forecast lane and existing entries. The worktree binding is corrected; its landing is the coordinator's responsibility. F6 did not alter the managed brain boot rules.

### Regeneration rulings

- "A: refresh inputs, full run".
- N19 fix "Hold low-confidence + longer timeout" = a77bfb6db: a below-high decision becomes a hold for EVERY key, including admitted bills. 119:hr:9460/9514 drop out if the classifier is unsure again.
- The per-call bound is 480 s, and failures now carry stdout.
- The first N19 failure was the npm CLI OAuth session expiring; the error text was on stdout.
- PHASE 2 (land a77bfb6db + fdc201076 leakage CoW fix in LIVE, then N19, membership refresh, full chain, kernel + audit) was running at 20:10 on 09-30. Verify the LIVE log before trusting this line (historical per the recovery checkpoint below).
- Still standing: SUSC_B5_W 60/40 is NOT on main; D-006 contradicts CLAUDE.md on who commits the brain; SR 11-7 was superseded 2026-04-17 by SR 26-2.
- Related memories: `ask-before-substantive-changes`, `dont-be-jumpy-removing-money-2026-09-26`, `r-summary-regression-presentation-2026-09-25`, `trend-over-significance-2026-09-26`, `skills-library-2026-07-10`, `glassbox-everything-rule-2026-07-27`.

### Recovery checkpoint 2026-09-30

- N19 PASS 20:09:17Z, membership sidecar PASS 20:33:36Z and hash-bound; refresh publication PENDING.
- Pod QME suite 175 passed / 2 skipped.
- Full production chain, parity, final kernel/audit gates, output reconciliation and 8841 restart remain pending in the coordinator lane. Earlier PHASE 2 running statements are historical.

### Local refresh attempt, 2026-10-01 about 00:20Z

- The harness reaped the membership refresh for low memory. It died at slice step 14/68 (member_reference_layer).
- Collection had passed: receipt 00:10:16Z, 479/479, publication PENDING. Upstream inputs were rewritten, but ranks, plan and surfaces still date from 09-20, so LIVE is mixed-vintage. Nothing committed.
- Baselines and the read-only checkers (`capture.py`, `f1f4_check.py`, `roi_floor_impact.py`) are in `C:\Users\pgoff\Melange-Pod-Recovery\20260930\local_refresh\`.
- Free RAM was 7.8 of 31.5 GB, with no large process; this matches the AppXSvc leak.
- Paul ruled: "Reboot, then rerun". After the reboot, rerun step 3 in full, with PYTHONUNBUFFERED=1, then the full chain, kernel/audit, f1f4 and movers.
- ROI floor: "Measure first". Run `roi_floor_impact.py` after the rerun; the decision stays pending.
- MelangeStafferLiveSidecar stays disabled (Codex handoff).
- The 95 Linux portability files are NOT landed.
- Skill suite: 190 passed / 2 skipped, 6 files adopted in LIVE.

### REFRESH DONE 2026-10-01 (no reboot; the full-chain retry ran 09:09-09:55Z)

- **Mixed-direction admissions.** Paul chose "Hold both bills" and then "Hold before fetch". Landed in LIVE 15977a0fa, 862478165 and 3e0621922 (branch fc78aaf42, f130a7edc, 6611340b9). 119:hr:9461 and 9490 are held; admissions are now 08eab127, with 0 paid calls. The uscode.house.gov "Under Maintenance" outage forced the pre-fetch hold.
- **Chain:** 79/79, DE-044 shape. LIVE is ONE vintage on the 09-27 money (stale at 10-05T10:29Z). Ranks cde36ac1; honors restored; alias, source-to-dashboard and email PASS.
- **Kernel:** 261/3, all standing.
- **Audit:** 553/17. 2 standing, and 15 A2/A2b from the stale 09-18 system_manifest inventory.
- **F1/F4:** PASS. 19 gated, 0 funded; gap = Suggested for 533.
- **Movers vs 09-20:** 393 total (245 legislative percentile, 19 own admissions, 9 bill/membership, 102 press, 18 displacement). Money doesn't feed ranks.
- **ROI floor:** 10 members change at 4 dp, max Danny Davis 0.0092 vs 0.0115, top-20 identical. Ruling still open at that time; it looks cosmetic.
- **Open for Paul (at that time):** the publication verifier says INCOMPLETE: collection c0d29f11 FAIL, not PENDING, tolerated `build_descriptive_speech` (YouTube receipt stale since 08-31), and 10 novel audit names. A qualified attestation or clearing those inputs is his call. Whether to rebuild system_manifest. Acknowledge the system_manifest money-pin write and the email zip. 8841 restart vs the Codex handoff keeping the sidecar disabled. Hold-retry priority. The 10-04 weekly with uscode down. Brain drafts D-075/D-076/DE-054/DE-055 plus a STATE bullet (in the workflow journals wf_16f9bb4e-ecc and wf_5c713a80-fff).
- **Machine:** about 35 python 0xc000070a crashes 09-29..10-01; none during the retry.

### "Finish it all" 2026-10-01 (Paul ruled: ROI "Match backend"; publication "Qualified sign-off"; inventory "Rebuild + re-audit"; 8841 "Start once, task stays off")

- ROI landed in LIVE: 5504167447, plus bindings 9a7d66f44 and 5e92f304c.
- Brain D-075 to D-081 and DE-054/055 committed as 02de571; outcomes still PENDING.
- Chain No. 3 (16:04Z) crashed natively at `build_archive_legislative`: python 0xc000070a ntdll at 16:29Z, with 3.6 GB RAM free. The reboot was asked for again.
- STILL TO DO after the reboot: full chain; `runs\step6_build_system_manifest.cmd`, then audit_full, then the kernel; f1f4 checks and the ROI parity check (`roi_floor_impact.py` no longer works, since the old floor is gone; use `verify_finish\roi_verify.py`); write PUBLICATION_SIGNOFF_20261001 and land it; start 8841 once; write the brain outcomes; verify.
- Run the long waits from the MAIN session or Agent-tool agents, never workflow agents: their Monitor events die when their turn ends.

## Related Topics

- [[2026-07-feature-agent-tooling-stack-skill-library-lane]] — The Moneyball skill library: how the repo skills were built, merged into git and audited for stale facts.
