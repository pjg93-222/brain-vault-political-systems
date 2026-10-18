---
type: topic
title: "Melange model facts: pipeline, Blended Model, pillar weights, member desk"
aliases: ["Melange Systems (Moneyball CU-influence model): Melange model facts: pipeline, Blended Model, pillar weights, member desk"]
category: "feature"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-10-04
sources: []
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/topic", "status/completed", "category/feature", "domain/data"]
part_of: "[[melange-systems]]"
---

# Melange model facts: pipeline, Blended Model, pillar weights, member desk

> Melange model facts: the regeneration pipeline, the Blended Model and its pillar decisions, and the member desk and SNA features as recorded in June 2026, with the three pillar-weight sets of 2026-06-29 (historical), 2026-07-07 (previous) and 2026-09-03 (current: Paul's directive, D-141). Part of [[melange-systems]].

Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): the summary above was corrected in place (R63-R64). It said the 2026-09-03 set was "live but unratified" and the 2026-07-07 set "last ratified"; D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, which closes S-5 and supersedes that wording.

## Overview

### Pipeline (all in `Melange Systems/fec/`)

Source of truth = `Moneyball Main Version - Blended.xlsx`. Regenerate after any workbook change, IN ORDER: `build_dashboard_bundle.py` -> `make_dashboard_html.py` + `make_member_desk.py` -> `make_combined.py`.

- **Workbook writes go through Excel COM (win32com)** so formulas/tables recalc (openpyxl drops cached values). Excel must be CLOSED. Every model edit backs up to `backups/*.PRE-*.xlsx` first; restore + regenerate to revert. (Later superseded: the newest standing rule is "NO COM anywhere"; this COM-write rule is the older version, kept because it explains the 2026-06 backups and scripts. See Change control and Paul's decision authority for the working agreements.)
  - Dated correction (2026-10-04): the supersession dates from the Phase 2 inversion of 2026-07-02/03 (Paul's sign-off 2026-07-02), which made `ranks_python.json` the rank authority and the workbook a self-refreshing view; the rule is recorded in Melange architecture and system of record (Superseded guidance, resolution 5; Decisions) and in the Decisions of the Melange fec/ pipeline actor.
- `congress_cosponsor_network_*.xlsx` is **globbed (latest by mtime)** by `build_dashboard_bundle.py` and flip_model: DON'T move it.
- Generators write HTML with `const DATA=__DATA__` / `__BUNDLE__`; the combined file wraps each app's JS in its own IIFE, so in the preview `DATA` isn't global: drive controls via the DOM.
- Preview browser has a 0x0 viewport (network-canvas screenshots fail): verify with `preview_eval`, not screenshots. NFC-normalize accented names for joins.
- Surface actor: [[melange-dashboard]]. FEC pipeline actor: [[melange-fec-pipeline]].

### The model (Blended Model sheet)

Score = weighted blend of 4 pillar PERCENTILES (`AB2:AB5` weights). Pillars: **Press%** (col9), **Legislative%** (col16, weighted by `AB2`), **Influence/committee%** (col18, approximately Committee% since centrality weight=0, `AB4`), **Demo%** (col13, `AB5`). Rank = RANK(Score). The member-desk score reproduces exactly: `AB2·Leg% + AB3·Press% + AB4·Cmte% + AB5·Demo%` (so the AB order is Legislative, Press, Committee/Influence, Demographic).

#### Pillar weights: all three sets (resolution 3)

| Weights | Date | Status | Notes |
|---|---|---|---|
| `.40/.30/.20/.10` (Committee/Influence 0.40, Legislative 0.30, Press 0.20, Demo 0.10) | 2026-06-29 | HISTORICAL | Set by `apply_weights.py`; this is what `project_member_desk_integration` called "CURRENT weights = committee-weighted" |
| `30/25/40/5` | ratified 2026-07-07 | LAST RATIFIED | Constitution text and brain record still say this |
| `45/10/40/5` | live in `ranks_python.json` (`ab_weights`, `pillar_policy.py:11-16`) since 2026-09-03 | LIVE BUT UNRATIFIED | Code-review S-5 awaits Paul's ruling; moved 520/533 ranks vs the 08-26 baseline |

Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and no ruling is outstanding here.

Order of the 4 numbers in the two newer sets follows `AB2:AB5` (Legislative, Press, Committee/Influence, Demo): 45/10/40/5 = Leg 45, Press 10, Committee 40, Demo 5 (45/10 is about 81.8/18.2 of the leg+press share). Details of the later weight history are in Influence engine internals and Melange audits and code reviews.

- **Why committee-weighted at .40/.30/.20/.10 (2026-06-29):** press at 0.40 was an over-weighted **tone/visibility proxy** (press_value = LSD tone intensity x direction x topic-weight) that mis-ranked the real power players. Example: Tim Scott (Banking leader + Defender, committee 1.00) sat at No. 18 because his 47 measured CU articles scored about 0 press_value on low-weight topics. Committee = the truthful structural-CU-power signal, and committee-weighting suppresses active *opponents* (they lack CU committee power) where leg/press didn't. Tim Scott moved to about No. 3.
- **KEY PRINCIPLE (cost many rounds): rank = INFLUENCE; per-category stance = ALIGNMENT. Two separate axes** (see [[influence-vs-alignment-axes]]). A high-activity OPPONENT (e.g. AOC, Welch: prolific consumer-finance cosponsors, anti-CU) will rank decently on influence; that is fine: the stance layer is the friend/foe filter, and the optimizer won't fund opponents. Do NOT make the rank pure-influence-led as the ONLY view (user: "that does not reveal underdogs"): the **Moneyball point is undervaluation**. Underdogs surface in the SEPARATE undervaluation/efficiency view (Intrinsic/Visibility/Undervaluation/Underdog-rank columns + the optimizer), which the influence-weighted rank does not erase.

#### Pillar details and decisions

- **Press:** real CU press releases only (LSD tone x stance direction x per-category weight; Interchange/CU-Tax/Credit-Card weight 1, rest 0.05). The 1,310 `billstatus:` rows (synthetic "X cosponsored Y" one-liners) are DE-DUPED out of the pillar (`apply_press_dedup.py`) AND hidden from the display. About 319 members have 0 press, but press is only 0.20 weight (at that date) so the sparsity barely matters. (`apply_press_redup.py` re-adds them if ever wanted.)
- **Legislative:** STANCE-GATED / directional (`apply_leg_stance.py` -> Blended col4 = per-topic Sponsor+Co-Sponsorship activity x per-category stance sign [SM: Champion/Defender +1 ... Opponent -1] x importance). Active opponents go negative (AOC/Welch/Marshall sink); active allies stay positive. Earlier this churned when leg was a big driver, but committee 0.40 now anchors the board so it is well-behaved. (`apply_legstance_undo.py` reverts col4 to the un-gated `='Rank & Allocation'!D{r}` formula.)
- **Committee/Influence pillar:** `Blended Model!R` (col18, Influence%) = **committee_raw / MAX(committee_raw)** (`apply_committee_fix.py`), NOT the old double-percentile: percentile flattened a backbencher (score 2.5) to the 90th %ile next to chairs, so prolific juniors (Byron Donalds) ranked top-10. The normalized raw score distinguishes leadership: Crapo No. 1 (Banking+Finance+JCT), Tim Scott No. 2; Donalds No. 8 -> No. 14. Source = `Committee Data` relevance-tiered seats (Highly/Moderately/Slightly -> score; Small Business unified to Moderately).
- **Press DISPLAY corrections:** the DEBATE sentiment model (see Political DEBATE stance model) mislabels articles (reads "prohibit"/"disapproval" as anti-CU). `press_stance_overrides.json` (match by url/title_contains, stance=support|oppose|neutral) -> `make_member_desk` applies it to the DISPLAY (`_press_corr`). Pillar/rank correction needs the upstream press_value re-flowed.
- **WORKBOOK COLLISION (warning):** a parallel "other session" writes the same workbook and reverted a committee-fix COM write once (re-saved an older copy). Workbook edits (weights/pillars via COM) must be SEQUENCED with the other session, or they get clobbered. Generator-side changes (overrides, the .py edits) are safe from this.
  - Dated correction (2026-10-04): the COM write path named here was retired by the same Phase 2 inversion of 2026-07-02/03 (NO COM anywhere; the workbook became a self-refreshing view). Pipeline runs take a lock (`fec/pipeline_lock.py`), but the vault does not record whether non-COM workbook writes from a parallel session still need sequencing.
- **Stance:** per-category Champion -> Opponent 10-tier ladder + **Defender** (champion on a defensive flagship); overall = importance-weighted aggregate of the per-category tiers (`category_stance.json` matrix). Scoring detail: CU stance and sentiment scoring.

### Member desk + SNA features

- **Member desk:** General page (overall rank/stance/legislative radar/pillar bars/invested=FEC/electoral-vuln $), plus sections Staff, Bio, Relational, **Committee positions** (full seats with relevance badges), Demographics (PERCENTILE-normalized radar; min-max crushed it), Psychometrics (see Personality psychometrics (Big Five)), Legislative actions (DEDUPED: one row per (bill,congress), most-specific role, area tags), Press & social media (graded-sentiment filter, billstatus hidden).
- **Efficiency view** = Golovin-Krause optimizer (`optimize.py`, $500 increments, $10k FEC per-member cap). Coalition builder (see Coalition-builder redesign session).
- **SNA network:** **committee-cluster layout toggle** (Porter et al. 2005 normalized-interlock spring layout, Cosponsorship<->Committees in `make_dashboard_html`; stable `crc32` jitter seed). Bidirectional navigation with the member desk. Network detail: Cosponsor and sector networks.
