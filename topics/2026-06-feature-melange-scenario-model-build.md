---
type: topic
title: "Melange scenario model build (2026-06-26)"
aliases: ["Melange Systems (Moneyball CU-influence model): Melange scenario model build (2026-06-26)"]
category: "feature"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-10-04
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "category/feature", "domain/data"]
part_of: "[[melange-systems]]"
---

# Melange scenario model build (2026-06-26)

> The Melange scenario model build of 2026-06-26: the source timeline, the pre-flight pass, the budget what-if tool, the electoral model, money response and pathfinding, the step-3 finish with the reorg, the scenario runner, flip channels and the diminishing-returns reconciliation. Part of [[melange-systems]].

## Timeline of the source facts

| Date | Event |
|---|---|
| 2026-06-26 | Pre-flight fixes, scenario tooling, two independent adversarial audits, FEC data-quality assessment and HIGH-3 reversal; reorg to `Melange Systems` (details below and in [[2026-06-troubleshooting-melange-model-audits]]) |
| 2026-06-27 | Source memory `project_moneyball_scenario_prep` last written (it records the 2026-06-26 work) |
| 2026-06-29 | Source memory `project_member_desk_integration`: model, pillar weights `.40/.30/.20/.10` (historical), desk and SNA features, pipeline order |
| 2026-07-07 | Pillar weights 30/25/40/5 ratified (LAST RATIFIED) |
| 2026-09-03 | Pillar weights 45/10/40/5 live in `ranks_python.json` (LIVE BUT UNRATIFIED; S-5 awaits Paul) |

Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and nothing here awaits Paul.

## Pre-flight pass before scenario tools (2026-06-26)

Pre-flight pass before implementing scenario tools (budget/dial what-ifs + defection/money shocks). All in `fec/`. 22/22 integrity throughout.

**Core-model audit (frozen-sheet gap depth):** the Durbin-class frozen `Legislative Score - Normalized` gap did NOT corrupt the overall Rank & Allocation **stances**: they are press-anchored. Validated: Marshall & Reed have POSITIVE raw legislative (bipartisan cosponsorships) yet are correctly **Opponent** via press; ZERO members are Champion/Ally with strongly-negative press; Durbin Opponent. Frozen-leg (R&A col D) vs naive archive-sum: corr 0.08, 43 sign flips; but the naive archive sum is ALSO wrong (artifact: Durbin sums +26 from bipartisan bills). So **do NOT reconcile the core model to a naive archive**: it would be worse. Damage was contained to the per-category layer (already fixed). Decision: no risky refresh; the corrected per-category layer is the category-level truth, overall stances reliable.

**COALITION DETERMINISM BUG (big one):** `per_topic_coalition.py` was non-deterministic even at fixed `random.seed`: two same-seed runs differed $12.6M. Cause: cascade frontier built from **sets** (`dict.fromkeys(Aseeds,...)`), and Python per-process **hash randomization** varies set iteration order, so random draws were consumed in different order. Fix: `sorted(Aseeds)/sorted(Bseeds)` in cascade (line ~35) + **Common Random Numbers** (`random.seed(1000003*SEED+it)` per MC iteration in `spread()`, so base and every `spread({n})` share draws, so marginal isolates the true effect) + `SEED`/`MC` now env-configurable. Now same-seed = byte-identical ($0). **Scenario protocol: always run baseline + perturbed at the SAME seed, so deltas are exact with zero MC noise.** Residual cross-seed variance (about $13M between seed99/199 at MC=20) is baseline-credibility only (which seed picked), irrelevant to same-seed deltas; bump MC or seed-ensemble later if the baseline itself needs to be less arbitrary. `per_topic_flip` is already deterministic (greedy LT, no MC).

**Infra built:**
- `make_baseline.py` -> freezes current outputs to `Draft Systems/baseline/` + manifest (seed/MC/budget).
- `scenario_diff.py <cur> <base>` -> top per-member $ movers across topics.
- `data_confidence.py` -> `confidence.json` (0-100 per-member coverage: leg breadth 50 + press 30 + votes 20); 36 low-conf members, 22 with ZERO archive bills, single-pillar cats = CDFI (press-only) / TCPA (leg-only), votes cover only about 3 cats. Reports $50k cap saturation per topic (binding hard: Data Privacy 23/31, CU Capital 4/4). Confidence is surfaced in dashboard hover (`cf` field).

## Budget/dial what-if tool

Framed as "cautiously expand while retaining the core coalition." `budget_frontier.py` = **CELF lazy-greedy nested frontier**: pro champions are the free core, then add seeds by leverage-weighted marginal-spread-per-$ (deterministic cascade with CRN + sorted frontier), recording the path (budget -> spread), seed entry order, and the diminishing-returns **knee**. Nested by construction ($500K inside $1M inside $2M, so the core is retained). Validated on Interchange: core 11 (base 48) -> +45 seeds, knee $1.85M. The budget slider = live lookup of the precomputed path.

## Electoral model (user decisions)

- `build_electoral.py` -> `electoral.json` = competitiveness `1-security` from Ballotpedia `Election_Average` (Golden/Ossoff/Warnock most competitive, Schiff/Padilla safe; 503/533 matched). User chose **leverage-only** (no durability discount) and **directional**: agreeable -> support incumbent (defend), hostile -> support challenger (replace). `build_electoral_plays.py` -> `electoral_plays.json`.
- **NON-PARTISAN is a hard requirement (user: CUs stay non-partisan, don't bias against Democrats).** The data showed a real skew (D 17% hostile vs R 10%) AND mislabels (Warnock = Skeptic off just -0.16 press, not an adversary). Fixes keep the core stance model (real positions) and fix the ACTION layer: (1) **replace gated on OVERALL Opponent only** (drop Skeptic, so Warnock falls out); (2) **PRIMARY route** = replace a hostile incumbent with a friendlier SAME-PARTY member, benchmarked on **same-party average** (targets intra-party outliers, works in safe seats, never shifts party balance); cross-party "general" route kept as flagged partisan option. Result party-balanced **31 D / 22 R replace**, Hawley now "primary a friendlier R" not "fund a D". Defend (Champion/Defender/Ally, vs cross-party loss, x competitiveness) = 309, both parties.
- **Frontier integration (toggleable ELECTORAL mode):** `budget_frontier.py --electoral` (or env ELECTORAL=1) adds replace plays into the CELF greedy: a funded replace **converts that Opponent anti -> pro in the same cascade** (`spread()` does `anti-set(extra)`), so it is valued in the same spread units as a coalition seed, x REPFAC=0.6 (primary-win feasibility). Validated Interchange: coalition 112 -> electoral 142 (15 replace seeds enter, both parties: Merkley/Reed/Durbin/Tran D, Hamadeh/Budd/Thune R). Outputs `budget_frontier.json` (coalition) + `budget_frontier_electoral.json` with `defend_overview`. Dials: REPFAC, LELEV, LEV, MAXSEEDS, all env.
- **DEFEND folded into greedy + AUDIT (roadmap step 1, done):** defend is now a real cost-line, not a separate overview. Model: a competitive at-risk ally (pro on issue, EP defend, comp>=0.4) is only PROBABILISTICALLY pro in the baseline (held with probability 1-comp); defending forces them to hold, so marginal = expected spread recovered. Two-set CELF (S = coalition/replace additions, D = defended); `spread(extra,defended)` discounts at-risk allies. `audit_frontier.py` caught 3 real bugs, all fixed: (1) Allies double-listed in coalition+defend pools, so the coalition candidate pool = Neutrals only; (2) congestion `bx` draw broke CRN (only rolled for unseeded members, so adding a seed shifted the RNG sequence), now rolls for every member then filters; (3) display non-monotonicity (MC cascade-divergence noise CRN can't cancel), so path 'spread' is clamped non-decreasing, true `cur` kept for marginals. Re-audit **11/11 pass** (monotonic, submodular-tolerant, types, base-discount, party-balance, knee, nested).
- **Honest residual:** replace plays entering the frontier lean D (about 30D/14R) because adversaries cluster on contested issues (interchange/rate-caps); primary framing keeps each play non-partisan but the aggregate tilts D; open whether to actively balance optics.
- **Diminishing-returns status at that point:** flip = sqrt(money) yes; coalition = across-seed (submodular + cap + knee) yes but NOT within-seed (binary to cap); industry/bank congestion soft-capped 0.9, not smooth: a real per-$ response curve for BOTH CU + competitor money was to be added in roadmap step 2 (money shocks).
- **ROADMAP:** step 2 = defections + money shocks DONE; step 3 = scenario running under the two models (needs refresher); the dashboard LAST after everything is verified.
- **STEP 1 close:** "replace" -> "contest" rename (sed excluding errors='replace' / .replace()); re-audit 11/11 clean. Play type is now `contest` everywhere (electoral_plays.json, frontier files, audit).


## Step 2: money-response + defection mechanic (DONE)

`money_response.py`. User chose a **saturation-aware curve** and **money-triggered AND manual defections**.

- Key correction: the `saturation` field is PAC$ divided by receipts (<1% for most, e.g. Daines 0.82%), so it adds little; **receipts (capacity)** does the "flush member barely moves" work.
- Model: `shift_lean(m,source,amount)= ±MAXSHIFT·(r/(r+HALF))`, r = amount/max(receipts, 200k floor); concave, so diminishing returns, capacity-aware. Validated: $100k moves Daines (+9.2) / Golden (+4.5) / GluesenkampPerez (+3.1) by receipts size; Golden $250k -> +9.6 vs $500k -> +15.5 (concave).
- `defection(m,dlean)`: if |dlean| >= DTHRESH=15 and the member is persuadable (NOT Champion/Defender/Opponent), drag stance toward the money by int(|dlean|/DTHRESH) tiers along ORDER. comp +$250k defects Ally -> Neutral etc. Dials MAXSHIFT=40, HALF=0.10, DTHRESH=15.
- Watch: low/under-reported-receipt members hit the $200k floor, so they are maximally movable (data artifact). Other variables maybe to add: current-lean asymmetry (pulling back a captured member costs more), incumbency/seniority, chamber.
- NOT yet wired into the net_lean recompute -> flip/coalition re-run at that point (that is step 3, scenario running).

## Step 3: pathfinding from 2 papers (user attached, in Downloads)

1. RELINK / Closed-Network-IM CIKM25 = edge-activation influence maximization under a per-node out-degree budget (each member whips at most k colleagues); maps to co-sponsor campaigns.
2. Multi-Objective Path-Based D* Lite (MOPBD*) = incremental multi-objective shortest-path (reuse search when edge costs change, so real-time; Pareto over conflicting objectives).

User decisions: co-sponsor route = **Pareto multi-objective** (co-sponsors / money / risk, risk = cascade-failure probability); sheet connection = **incremental D* Lite** (edit a cell, replan only the affected slice; win32com available, no xlwings/watchdog).

**Co-sponsor route finder BUILT + validated** (`cosponsor_route.py`): seeds = champions, edge-activation greedy (tree-reach spread, edge cost = CEDGE/p so weak ties cost more), out-degree K=5, Pareto front via risk-aversion lambda sweep. Fixed a value-inversion bug (added positive-value guard `if -nval<=0: break`). Validated: Mortgage max-spread $419k / +5.6 / risk 0.59 vs low-risk $33k / +1.2 / risk 0.39 (distinct Pareto points); **Interchange has NO reliable routes** (champions weakly tied, all p about 0.10, so don't run a co-sponsor campaign there). LT-priming + sheet-sync + MC-upgrade + full audit + reorg were then DONE (next section). Caveat: tree-reach spread is first-order/conservative (ignores cascade reinforcement); it could be upgraded to MC cascade. Remaining step 3 at that time: LT-priming calc; incremental D* Lite replanning; live Moneyball-sheet tab (COM write-back + cell-change replan). Audits still clean (22/22 + 11/11).

**Bridge toggle:** `per_topic_flip.py --bridge` (or env BRIDGE=1) applies a direct bridge target-value boost `tgt*(1+GAMMA*bp)`, GAMMA=1.2, writes a separate `per_topic_alloc_bridge.json`. OFF by default. Gentle tilt (Mortgage $-wt bipartisan 23.9% -> 24.3%, gainers Cassidy/Kustoff/Cramer). Related memory: `project_category_stance_3d` (the bipartisanship metric + cross-party cascade amplifier, negligible effect, kept as a decision aid).

## Step-3 finish + REORG (2026-06-26; order: LT-priming, sheet, MC, audit, reorg)

- `lt_priming.py` -> `lt_priming.json`: per-target LT flip recipe, cheapest balance of network pressure (recruit which neighbors, each adds P[u][v]) + direct money (diminishing). theta by tier + net_lean resistance. Validated Mortgage: low-gap = money-only, Cassidy gap 1.15 = pressure (recruit Kennedy/Warren/Ossoff).
- `sheet_sync.py`: writes a `Melange - Live` tab to the workbook via COM (win32com), + **D*-Lite incremental**: md5 fingerprint per topic (stances + net_lean); diff vs `sheet_sync_snapshot.json`, so only CHANGED topics are flagged for recompute (validated: 0 on no-op, exactly 1 on a single Interchange edit).
- `cosponsor_route.py` MC upgrade: `MCMODE=1 MC=40` recomputes route reach via IC cascade on the induced subgraph (captures reinforcement) vs the default fast tree-reach. Validated higher + compounding ($75k tree 2.1 -> MC 2.8). CRN-deterministic.
- `audit_full.py`: consolidates integrity (22) + frontier (11) + new module checks (money concavity/capacity, electoral gating + balance, stance sanity, route Pareto + MC>=tree + determinism, priming validity) = **18/18 ALL CLEAN**. (3 initial fails were audit-script bugs: over-strict Durbin-CreditCard assertion [he is Skeptic now, not Opponent], route-front regex missing multi-space.)
- **REORG: canonical home is now `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\`** (189MB, self-contained, README.md maps it). Selective copy of working materials (fec/ 48 scripts, 26 json, 47 xlsx incl. workbook, votes/ members, baseline/, research/ 2 papers, dashboard). Paths updated (Draft Systems -> Melange Systems; workbook/dashboard now under Melange Systems). Verified 18/18 from the new location. **`Draft Systems` left INTACT** (NOT deleted): it holds 3.4GB raw/models (debate_finetuned safetensors 1.4GB, FEC itpas2.txt, press indexes) that are irreplaceable and only needed to regenerate base data; it is in OneDrive, so a full copy/delete was avoided. Future work: use `Melange Systems\fec` (the harness still resets cwd to Draft Systems, so cd to Melange). The user may clean up Draft Systems' redundant working-file duplicates at will.

## Scenario runner built + 2nd reorg bug found (2026-06-26)

- **Reorg bug found + fixed:** the Melange reorg sed silently FAILED on the workbook path: 34 scripts still pointed at `Desktop\Moneyball Main Version` (worked only because the Desktop original lingered). Fixed all 34 via python str.replace; they now point at `Desktop\Melange Systems\Moneyball Main Version`; the workbook copy IS in Melange; 19/19 against it. Melange is now truly self-contained.
- **Research corpus** (the user's library in Downloads, about 10 relevant): RELINK (closed-net edge-IM), MOPBD* (D*-Lite incremental multi-objective), **Adaptive Submodularity (Golovin-Krause, appears 3x)** = adaptive policy / observe-then-decide + lazy greedy guarantee, **Competitive IM (Bharathi-Kempe-Salek)** = viral-competitive, the foundation of our A/B cascade, Cosponsorship -> bill-passage (Sotoudeh-Porter-Krishnagopal 2406.19554), Lobbying-network dynamics (Bacik / In Song Kim 2503.11745), Signed-network coalitions (Aref-Neal x2, our hidden-coalition basis), IM-algo empirical (s41598-026 CELF++/RIS/IMM).
- **`scenario.py`** (end-to-end, grounded): `--money "Member:cu|comp:amount" --defect Member --stance "Member:Issue:Tier"`. Applies moves, then money_response shift_lean + defection (comp raises ind/B-pressure; defection = general disposition shift across the member's movable per-issue tiers via CTORD), then computes competitive-cascade CU spread per topic baseline vs scenario (deterministic CRN + sorted, MC=40), and reports per-topic + net influence delta + defections. `budget_frontier` got CONGEST/CATSTANCE env-overrides so scenarios can feed perturbed state. Validated: comp $300k Grijalva + $500k Golden + cu $200k Tim Scott -> both Dems defect (Ally -> Skeptic/Neutral), Scott absorbs, net -4.8 co-sponsors; deterministic. audit_full now **22/22** (added scenario end-to-end + determinism + sign checks).
- **HONEST LIMITATIONS:** (1) CU spends only act via conversion/defection: no gradual winnability in the coalition cascade (that is the FLIP model); a non-converting CU spend shows about 0 effect. (2) The 18 low-receipt floor members (incl. Grijalva) defect too easily (the receipts-floor artifact). (3) The runner is ONE-SHOT (apply, observe); the ADAPTIVE optimizer (Golovin-Krause: greedily CHOOSE the moves to maximize influence under budget, observing realized defections) is the natural next layer, NOT built at that point.

## Flip-channel wiring + adaptive optimizer (2026-06-26)

- **`flip_model.py`** (shared, faithful to per_topic_flip): `pflip(cu,ind,nA,nB,..)=a/(a+b)`, a = WM√(cu+1)/scale + WP·nA/mAt, b = WM√(ind+1)/scale + WP·nB/mBt; `flip_value(cat,MAT,cu,ind)=Σ tgt·pflip`; topic_setup cached per stance. Imported by scenario + optimize.
- `scenario.py` now reports BOTH channels: COALITION (cascade, camp/defection-driven) AND **FLIP (winnability, money-driven)**. CU spends finally register: gradual, diminishing (Wicker +$25k -> +0.040 ... +$400k -> +0.113). Validated: a comp shock drops both (coalition -4.8, flip -0.37 for Golden $500k); CU spends raise flip net.
- **`optimize.py`** = ADAPTIVE OPTIMIZER grounded in Golovin-Krause Adaptive Submodularity: lazy/CELF greedy allocates CU budget to maximize Σ flip_value (submodular √-curve, (1-1/e) guarantee). ADAPTIVE = when a member's cumulative CU crosses their money_response defection threshold they CONVERT (stance -> pro), we observe it, clear the cache, rebuild marginals, re-optimize. $2M -> +39.82 expected flips; 3 conversions (Patronis/Walkinshaw/Moody). Writes `optimize_result.json` (frontier + alloc + conversions). Deterministic.
- **HONEST CAVEAT:** the optimizer spreads THIN ($25k x about 80 members): math-optimal under the flip √-curve (first dollar everywhere > second dollar anywhere; money effect modest vs network proximity), but practically you would concentrate; no diminishing-returns knee within $2M. Conversions reflect the receipts-floor artifact (low-receipt members convert at $25k). Could add a min-chunk/concentration constraint or capacity-aware (money_response) money in pflip to reconcile the two diminishing-returns curves (flip √ vs money_response receipts-saturating).
- **audit_full now 26/26** (added flip-channel + optimizer runs/monotone/deterministic checks; fixed 2 stale regex from the renamed NET output: not system bugs).

## Diminishing-returns reconciliation + concentration (2026-06-26)

- Replaced the flip model's absolute-√ money term with a **capacity-aware saturating curve** (Michaelis-Menten): `a = WM*(cu+1)/((cu+1)+HALFF*R) + WP*nA/mAt` (HALFF=0.10, R = receipts floored 200k) in BOTH `flip_model.py` AND `per_topic_flip.py`: the same receipts-relative form as money_response, so the system now has ONE consistent diminishing-returns model (a $X check moves a big-receipts member less). Regenerated `per_topic_alloc.json`. Baseline winnability shifted 202.88 -> 215.92 (new curve).
- **Optimizer concentration:** min-chunk `INC=$100k` (a PAC doesn't micro-allocate $25k) + per-member cap `PMAX=$300k`. Now allocates about 20 members at $100k (realistic) vs the old $25k x 80 thin spread. Honest trade-off surfaced: the $25k spread gave +40.8 winnability (math-optimal but assumes $25k effective everywhere), $100k chunks give +17.3 (realistic/concentrated). INC/PMAX are dials. Conversions still fire (Hoeven/Hickenlooper convert at $100k, improve 10-12 issues).
- audit_full **26/26** clean after the change.
- **SYSTEM STATE at that point:** stance (3D) -> flip (LT, capacity-aware) + coalition (competitive IC) + electoral (contest/defend) + routes (RELINK Pareto) + priming (LT) + money-response (defections) + scenario runner (both models) + adaptive optimizer (Golovin-Krause), all in Melange Systems, 26/26. Only the DASHBOARD UI remained (the roadmap's last item; see Melange dashboard UI evolution and [[melange-dashboard]]).
