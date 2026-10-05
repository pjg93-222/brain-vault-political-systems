---
type: topic
title: "Redesign lane, 2026-09-30 to 2026-10-01 (Forecast audit, giving-view redesign and PAC accuracy)"
aliases: ["Forecast audit, giving-view redesign and PAC accuracy: Redesign lane, 2026-09-30 to 2026-10-01"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-09-29
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/research", "category/feature"]
part_of: "[[2026-09-feature-forecast-giving-redesign]]"
---

# Redesign lane, 2026-09-30 to 2026-10-01 (Forecast audit, giving-view redesign and PAC accuracy)

> The giving-view redesign lane of 2026-09-30 to 2026-10-01: the Higgsfield boards and Paul's pick of F2, board and validity problems, the pod reversal and export, the Opus audit, the reconciliation finding the model intact, the landed fixes. Part of [[2026-09-feature-forecast-giving-redesign]] (project [[forecast-redesign]]).

## Redesign lane, 2026-09-30 to 2026-10-01 (worktree `mentat-forecast-redesign-0fb0be`; session 17a121dd-fadd-4a01-933b-7c25f96ebb33; memory modified 2026-10-01T18:03:05.943Z)

**Paul, 2026-09-30 (via /taste-skill:gpt-taste):** "I don't like the current look of the forecast. You are going to overhaul it and present me with mock-ups using Higgsfield. You will then follow the selected mock-up perfectly." Parameters: reason in Opus 5.5, code in Sonnet 5.5. Then: "I like number 2, but while you are doing this, make sure the projections are logically valid and in line with the test results". Redesign build = one-to-one to F2, all compute on the pod (later lifted).

**Boards (nano_banana_pro, 2k, style ref = approved I1 Insights board):** F1 Scenario desk, F2 Giving by cycle (PICKED), F3 Ledger. Files: session scratchpad `boards\` (PNG 2752x1536) and `review\img\` (JPEG). Numbers on the boards come from the live console's labelled historical example for Commercial banks; bar proportions are drawn approximately.

**F2 don't-copy list (known board defects):**
- 2023-2024 bar drawn at $26.11M nominal while the projection is in 2025 USD ($27.18M), so a 0% scenario reads as growth.
- Export scenario drawn as a second plum primary (keep secondary).
- Sliders cannot express the required blank/unknown state.
- The lobbying card draws a faint line with no data.

**Validity problems seen live (to be confirmed by the audit):**
- PAC full-cycle prediction interval lower bound $3.74M below the $4.67M already observed; remainder PI negative (-$937K).
- Senate roster-PAC projected two-party total $886.99K below the $990.5K observed (budget_inconsistent, not clipped).
- The "historical example" claims the projection equals the Mentat level but shares move -1.63 pp (House) and +6.06 pp (Senate) with political-input change 0.
- Out-of-range flags on the anchor cycle's own inputs.

**POD REVERSAL, 2026-09-30 late (Paul, verbatim, in order):** "Go onto the pod to work", then "Move out of the pod", then "Bring everything out with it". The continuation doc's pod-only rule (all compute, console backend and git construction on the pod) is LIFTED for this lane. Both pod agents were stopped; one Opus agent exported `W=/workspace/forecast-audit-5603f2` (minus .venv) to `C:\melange-data\pod-export-20260930\` with sha256 verification, activated the published model locally, disabled `%LOCALAPPDATA%\Mentat\remote-console.json` (renamed, not deleted) and stopped only the local 8808 tunnel. The pod itself and its console are left running ("never stop the pod" still stands).

**EXPORT DONE 2026-10-01 ~00:07Z:** mirror `C:\melange-data\pod-export-20260930\forecast-audit-5603f2\` (10,601/10,601 sha256 match, .venv excluded with pip freeze; reports matched the local originals), git bundle (all 614 commits already local), `parity\` (local vs pod projection 370/371 exact, 1 at 1.5e-16), `source-diff\` (20 diffs = local uncommitted work by other lanes: NEVER apply). Model files were already byte-identical locally. My own urgent tar.gz streams are in `...\urgent\` (incl. other lanes' small /workspace dirs). TRAP: the remote launcher profile lived in the Codex app sandbox (`%LOCALAPPDATA%\Packages\OpenAI.Codex_2p2nqsd0c76g0\LocalCache\Local\Mentat\`), renamed `.disabled-20260930`; an Explorer-launched MENTAT never saw it. Tunnel PID 30448 stopped. MENTAT now launches locally on 8802-8811. Pod /dev/shm (~36 GB, other lanes) NOT pulled; C: had 34 GB free.

**AUDIT DONE 2026-10-01 (Opus, read-only; files in session scratchpad `audit\`):**
- F1: intervals not conditioned on observed (banks PAC 12.1% mass below observed, remainder PI negative).
- F2: share remainders by subtraction (7/19 negative, 5/19 totals below observed).
- F3: general giving (~99% employee) anchored on presidential 2024: same-phase better 47%/44% in BOTH designs (banks full $27.18M -> $16.86M) = PAUL'S RULING (as recorded; read with "take F3/F4/F10/F15 + option (c) to Paul" below, i.e. a question for Paul's ruling). Later reconciliation: OVERSTATED (see below).
- F4: interval width from industry PAC totals (CU own step 7.7 sd).
- F5: example label false for shares (prior growth blank -> server uses 48.9% not -5.30%).
- F9: G9 checks only LOEO; chronologically all three paths lose to naive.
- F10: Senate chrono coverage 8/12.
- F12: waivers invisible (G6 compared against already-waived bundle).
- F16: `combined_reference` sums accounts in export.
- F17: F09 = all insurance.
- Rules/anchors match D-065 and 88/88 p-values match.
- MY CALLS: apply P1 (conditional remainder, additive), P3 (G9 both designs, warning), P4 (live coverage, packet only) + display fixes inside F2; take F3/F4/F10/F15 + option (c) to Paul.

**MODEL FIX STAGED 2026-10-01:** scratchpad `modelfix\apply_model.py` (self-contained post-images, CAS on pre-images 93f6d09b/b069f28c/5a932f27/43e28790, rollback, NOT yet run). Python 151/0/3, R 2508/0/1, parity GREEN, fixture 5,674 old leaves unchanged (+616 new). Legacy response fields KEEP the negative/budget_inconsistent values: the UI must read `remaining_allocation` + `*_given_observed_*`. TRAP: something purges files older than 7 days from %TEMP% scratch copies mid-run (robocopy keeps source mtimes); after copying, set LastWriteTime to now; keep deliverables out of Temp.

**HANDOFF 2026-10-01:** Paul, angry at relayed unverified audit claims ("are you hallucinating? ... MAIN QUESTION -> We need to reconcile, overall integrity of this model"), ordered a fresh session. Handoff doc: `C:\melange-data\forecast-redesign-20260930\CONTINUATION_FORECAST_INTEGRITY_2026-10-01.md` (copy in Downloads). First action there = independent reconciliation ledger (partial outputs in `...\reconcile\`), then F2 (partial build in `...\f2build-partial\`). LESSON: never relay an agent's NEW analysis (e.g. F3 anchor backtest, F4 sigma test) as settled; label it unverified or verify first.

**RECONCILIATION DONE 2026-10-01 (session silly-einstein-57ef31, two independent Opus agents):** `C:\melange-data\forecast-redesign-20260930\reconcile\INTEGRITY_LEDGER.md`.
- Model INTACT: rebuild 5,082 leaves within 3.3e-12, regressions within 3e-14, 104 displayed p = bundle, D-065 choices reproduce. Screen numbers genuine (hand-recomputed to the cent).
- Real defects: subtraction remainder (P1 fixes, independently graded: banks PAC remainder $1.43M [$112K-$4.91M], 0 of 34,170 old numbers change); example message false for party mixes; non_giving receipts (FEC interest/refunds/claims) inside forecast anchors (CU 20.4%: SchoolsFirst interest on Porter's accounts); CU bands narrow; waivers not shown; G8 cannot pass on Windows; `combined_reference` in JSON.
- OVERSTATED to Paul: F3 (44-47% only under pooled slope; own slope = -29.5% chrono; $16.86M mixed the two), F12, "7/19" (double count). F9 chrono loss is real but sits in the 2018 fold; latest fold >= naive.
- Decisions D1-D9 await Paul; brain drafts in `BRAIN_DRAFTS_2026-10-01.md`. F2 build restarted in `C:\melange-data\...\f2build\` (scratch only, `apply_f2.py` for Paul).

**LANDED 2026-10-01 (Paul: "D4, B. Apply rest"):** anchors exclude non_giving (06:19Z + follow-up 07:25:09Z), calc P1/P3/P4/waivers/no `combined_reference`/G8-Windows (07:25:48Z). Sonnet built in scratch, Opus reviewed (calc needed 1 fix round), applied via hash-checked scripts in `C:\melange-data\forecast-redesign-20260930\apply20261001\` (rollback per script). Final check PASS (Python 181/0/4, R 2,542/0/0). NOT committed; console restart = Paul. Pace backtest waits on Paul's OK to download FEC pas212/214/216. F2 UI LIVE 10:58:25Z (`apply_f2.py` 829cd9da; 3 review rounds; rollback `f2build\apply_f2.py --rollback`). Coordinator ruling: saved 2026 outlook stays pre-filled but labelled + clearable. C: ~5 GB free: Paul offered a cleanup list (review copies), deletion is his.

**FORECAST UI v3 (2026-10-01):** Paul rejected the 3 Nano Banana boards; next boards in GPT Image 2.5, time-series stacked D/R bars by cycle (PAC, General, Lobbying; House/Senate splits; adjustable expected takeover defaulting to market), emphasis on ease of understanding. "No fucking headline": never add a narrative headline/summary sentence to the forecast UI. Projections in boards must come from the corrected model (phase-aware + 2028 chained from 2026), not placeholders.

**Why (redesign):** Paul wants the forecast to look better AND be right; a chart makes an unconditioned interval visibly impossible (whisker below the observed stack).

**How to apply (redesign):** model-semantics fixes go to Paul as options and wait for his ruling (`ask-before-substantive-changes`); display fixes follow the board. Work is LOCAL now (pod retired for this lane, 2026-09-30 late); never restart Paul's consoles 8802-8811. Never relay an agent's new analysis as settled: reproduce by a second path first. Related memory names: `forecast-audit-lane-2026-09-29`, `higgsfield-connector-account-trap-2026-09-17`, `mentat-redesign-boards-2026-09-21`.
