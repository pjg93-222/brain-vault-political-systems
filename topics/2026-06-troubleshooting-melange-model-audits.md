---
type: topic
title: "Melange model audits of 2026-06-26"
aliases: ["Melange Systems (Moneyball CU-influence model): Melange model audits of 2026-06-26"]
category: "troubleshooting"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-10-04
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "category/troubleshooting", "domain/data"]
part_of: "[[melange-systems]]"
---

# Melange model audits of 2026-06-26

> The Melange model audits of 2026-06-26: the brutal internal audit, two independent adversarial audits with their fixes, and the FEC data-quality assessment with the HIGH-3 reversal. Part of [[melange-systems]].

## Brutal internal audit (2026-06-26, from canonical Melange Systems)

- **BUG FOUND + FIXED:** `money_response.py` defection `ORDER` list mixed taxonomies: it used per-category tier names (Defender / Highly Persuadable / True Neutral / Lean Skeptic) but operates on OVERALL stances (Champion / Ally / Neutral / Skeptic / Opponent / Unengaged). Result: 111 members defected to an invalid "Lean Skeptic" overall tier; 39 Unengaged could never defect. Fixed: ORDER=['Champion','Ally','Neutral','Skeptic','Opponent'], COMMITTED={'Champion','Opponent'}, Unengaged -> Neutral. Now only valid tiers.
- **Weak self-check fixed:** the audit_full defection check was a tautology (`... or True`); replaced with a real validity check. audit_full now **19/19**.
- **False alarm resolved:** the electoral primary value re-derivation mismatched, but the stored value is CORRECT: primary intentionally omits competitiveness (primaries aren't gated by general margin); my re-derivation wrongly added comp.
- **Clean (verified):** money-model invariants (pcts -> 100, net_lean = cu_adj - industry_adj, industry_adj = banks + finserv, 0 violations); member-set consistency (533 all files, archive_leg 511 = 22 no-bills); stance scores in [-1,1], no all-champ/all-opp; frontier monotonic + no degenerate + seed-accounting exact; electoral security in [0,1], leverage in [1,1.6]; bipartisan in [3,62]; route edge-prob in [0.008,0.613]; coalition determinism byte-identical; 0 NaN/Inf in all JSON; all 146 LT-priming recipes close their gap; route Pareto 0 dominated points.
- **Data-quality flags (not bugs):** 63 members (12%) have zero PAC-money (mostly legit PAC-refusers e.g. AOC; 14 unmatched in FEC with receipts=0); 18 members <= $200k receipts hit the money_response floor and so are max-movable; net_lean=None leaks into 2 VIZ scripts only (assemble_viz, sna_layout), not the model.
- **DOES IT RUN SCENARIOS? NO end-to-end runner.** Pieces existed (money_response computes shift + defection; scenario_diff compares; make_baseline freezes; sheet_sync detects changed topics) but NOTHING applied a shock, propagated net_lean, regenerated data, re-ran flip/coalition and diffed in one command. The missing piece = a scenario runner (OFFERED to build; built next).

## Independent adversarial audit + fixes (2026-06-26, separate cold agent)

Spawned a cold general-purpose agent (no investment in the code) to brutally re-audit. It found REAL bugs the self-written audits were structurally blind to (the "26/26" only checked NET aggregates + headline signs). The agent ALSO verified the core spine is genuinely sound: pflip identical across modules 1360/1360; money_response <-> flip reconciliation real (same Michaelis-Menten); CELF lazy-greedy provably correct = exhaustive; determinism byte-identical; structure 533/range(3,536) clean; lt_priming 146/146; Pareto 0 violations.

- **H1 (FIXED):** the optimizer scored WINNING a member as a LOSS: shift_pro lowers their PERS, which lowers flip_value, so the conversion delta was negative. Fix: `won` set + `secured` accumulator in optimize.py; a conversion banks m's flip at certainty (Σtgt) into `secured` and removes m from the flippable pool. Path now MONOTONE (0 drops, verified).
- **H2 (FIXED):** scenario per-topic rows were below the MC noise floor (std about 0.75-1.05 vs 0.3 threshold), giving impossible "competitor money helped CU" signs. Root cause: the cascade drew `random.random()` in activation order, so changing one member desynced the whole stream (CRN failure). Fix: splitmix64 `_sm(it,u,v)` edge-keyed draws, i.e. true CRN, so baseline vs scenario differ ONLY by the real perturbation. The comp shock is now clean: coalition -3.2, only same-sign rows. (budget_frontier.py had the same latent order-dependence, patched there only by non-monotone clamping; fixed later by HIGH-1.)
- **H3 (FIXED, later REVERSED, see below):** members with NO FEC data had ind=0, so b about 0 and pflip about 1 ("missing" misread as "no industry opposition"); 11 of 63 ranked top-50 winnability, inflating the base (215.92). Fix: impute the industry baseline (median of members WITH data) for zero-`total` members in flip_model.py + per_topic_flip.py; `fm.nodata` flags them. Base now realistic 186.50; 0 data-less in top-20. CAUGHT a follow-on: the scenario flip channel mixed imputed `fm.ind0` (baseline) with raw local `ind` (scenario), so the comp shock showed +28 winnability; fixed via `ind_flip = fm.ind0 + (ind-ind0_raw)` (one footing).
- **L3 (FIXED):** per_topic_flip.py had no `__name__` guard, so importing it overwrote per_topic_alloc.json. Wrapped main(). **L1 (FIXED):** removed dead `moneyscale` (flip_model + per_topic_flip).
- audit_full now **29/29** (added: comp-shock flip-channel sign, optimizer path-monotone, no-data-not-top-20).
- **STILL OPEN (modeling knobs / presentation, user's call):**
  - M1: defection over-sensitive (35% convert on one $100k; tune DTHRESH/MAXSHIFT).
  - M2: the overall-spectrum step count is applied to per-category CTORD (direction right, magnitude a simplification).
  - M3: CFPB-Reach block 145 dropped from the flip channel (17 vs 18 grain; stance still combined-correct, only the eng signal omits 145).
  - M4: stale `im_allocation.json` (old im_allocate.py, no Defender) still in the workbook IM sheet: regenerate or remove (later pushed, see FEC section).
  - M5: `—` / no-position PERS=0.55 drives 59.8% of cells (sensitivity-test).
  - L4: the diffusion kernel is cpf-amplified in coalition/scenario but not in cosponsor_route/lt_priming (document or unify).

## Second independent audit (math + formula article + data integrity) + fixes (2026-06-26)

A second cold agent (opus) wrote `MATHEMATICAL_SPECIFICATION.md` (every formula, 30+ constants with values/units/sources, worked pflip example, research citations), independently re-audited the math, and checked data integrity. VERDICT: "core mathematics is sound and the data is clean": pflip identical across modules, CELF == exhaustive greedy, path monotone, Pareto non-dominated, all 148 priming recipes close, money curve reconciles, clean 533-member set everywhere, BLOCKCAT identical across 4 modules. It found NO wrong-output / wrong-sign / out-of-range bugs in core scoring. Real findings (all now FIXED):

- **HIGH-1 (FIXED):** my scenario.py edge-keyed CRN (`_sm` splitmix64) was NOT in budget_frontier.py / per_topic_coalition.py: they still drew random.random() in activation order (residual marginal noise about 0.01-0.1 at MC=20). Ported `_sm` + `cascade(...,it)` into both. The audit now guards it (budget_frontier single-topic determinism check).
- **HIGH-2 (FIXED):** receipts=0/null floored to $200k made a $100k chunk look like 50% of fundraising, so instant conversion (34 members, 18 no-data). `money_response.receipts()` now imputes the MEDIAN receipts ($2.28M) for no-data members. Instant-convert on $100k: 35% -> 2.3%.
- **HIGH-3 (FIXED at that point, then REVERSED, see next section):** the H3 imputation only fired for total=0; 43 members had a FEC record but ind=0 (zero captured bank/finserv), 6 ranked top-20 winnability. Extended imputation to EVERY ind=0 member (median industry money), `ind_imputed` set, env-tunable IMPUTE_IND0=0 to trust raw zeros. Conservative (only lowers inflated winnability). Base winnability 171.76 -> 154.57.
- **MEDIUM-2 (FIXED):** the optimizer knee was always the full budget (thin spread keeps marginals flat); it now reports "no diminishing-returns knee within budget" honestly instead of implying a knee at $2M.
- **LOW-2 (FIXED):** stale README "18 passed" -> 29 (now 31).
- **STILL OPEN (documented, low):** MEDIUM-1 the optimizer banks conversion `contrib=Σtgt` at pre-conversion PERS, not champion weight (net jump small + positive, monotonicity intact; defensible "bank what you converted"); LOW-1 per_category_stance defl `<neg> and 2.0` idiom brittle; LOW-3 41 network-isolated members (5 PRO seed but spread nowhere: coverage limit, correct behavior); LOW-4 bpf[n] vs bpf.get (latent, bpf 533/533 so not live).
- audit_full now **31/31** (added ind=0-imputation-applied + frontier-CRN-determinism checks).
- NOTE: the workbook IM sheet should be refreshed via `write_im_sheet.py` (COM, needs Excel closed) to push the regenerated `im_allocation.json`; the JSON is consistent (G2 passes) but the on-sheet cells lag until pushed (pushed next).

## FEC data-quality assessment + HIGH-3 reversal (2026-06-26)

Pushed the workbook IM sheet (`write_im_sheet.py` via COM, 533x22, backup `PRE-IM-20260626.xlsx`). Then assessed FEC data quality and re-verified suspect members on FEC per the examined industries.

- **FEC method** (`full_congestion.py`): industry money = FEC bulk `itpas2.txt` (PAC -> candidate, types 24K/24Z) aggregated from a HARDCODED set of 33 major industry PAC committee IDs (BANKS=23: ABA/Citi/Wells/JPM/BofA/PNC/USBancorp/ICBA/TD/Regions/Truist; FINSERV=10: AFSA/Amex/CapOne/Visa/MC/Discover/Ally/Synchrony), joined name -> bioguide -> FEC-candidate via `legislators.csv`; receipts from `weball24.txt`. Source files (122MB itpas2.txt, cm.txt, weball24, legislators.csv) are present in fec/. (Later FEC pipeline: [[melange-fec-pipeline]].)
- **GAP TEST** (scratch `fec_verify.py`): for the 43 total>0 / ind=0 suspects, scanned ALL their 24K/24Z PAC money named via cm.txt. RESULT: ind=0 is **VERIFIED REAL**, not a tracking gap. 80% of all 533 have tracked industry money (the list works broadly). The 43 are 39D/4R, many no-corporate-PAC (Tlaib $86k total PAC). Their "untracked industry" money is almost entirely INSURANCE PACs (life/health/crop/P&C: a different industry) + false positives (END CITIZENS UNITED matched "citi"); genuine untracked bank/finserv is negligible (Bread Financial $5k, FSI $5k).
- **THEREFORE REVERSED HIGH-3:** my ind=0 imputation FABRICATED bank opposition these members verifiably don't have. The trigger was corrected to **receipts=0** (no FEC fundraising record at all = truly blind: 18 new/special-election winners like Grijalva/Moody). The 91 members who raised money but show ind=0 are TRUSTED (real zero = "not captured by the banking industry", a legit signal). The old total=0 trigger wrongly imputed 49 genuine no-PAC members. Env IMPUTE_IND0=0 disables. Base winnability 154.57 -> 191.46 (real zeros correctly un-depressed); 0 blind members in top-50; top targets sane (Tim Scott / Andy Biggs / Ro Khanna). The audit_full check was rewritten to "impute only no-FEC-record; trust verified-real zeros", **31/31**. Updated `MATHEMATICAL_SPECIFICATION.md` sec 4.3 + the data-integrity table.
- **DATA-QUALITY VERDICT:** the FEC industry-money method is sound; `ind` measures "money from the 33 major bank/finserv PACs" (a curated competitor signal, not all-industry). ind=0 = not funded by major banks (real). Only the 18 receipts=0 members are genuinely data-blind. Caveat for the user: `ind` excludes INSURANCE and minor/regional finance PACs by design.

## Related Topics

- [[2026-06-feature-melange-scenario-model-build]] — The Melange scenario model build of 2026-06-26: the source timeline, the pre-flight pass, the budget what-if tool, the electoral model, money response and pathfinding, the step-3 finish with the reorg, the scenario runner, flip channels and the diminishing-returns reconciliation.
