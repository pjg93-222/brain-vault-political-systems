---
type: concept
name: "Influence vs alignment axes"
aliases: ["rank = influence, stance = alignment"]
description: "Moneyball modeling principle (2026-06-29, cost many rounds): rank measures INFLUENCE while per-category stance measures ALIGNMENT; keep them as separate axes so active opponents can rank on influence while the stance layer and optimizer filter friend/foe, and undervalued underdogs surface in the separate undervaluation/efficiency view."
related_to:
  - "[[2026-06-feature-melange-dashboard-ui-evolution]]"
  - "2026-07-rfc-melange-architecture-system-of-record"
  - "[[melange-dashboard]]"
  - "[[melange-systems]]"
  - "[[moneyball-workbook]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-model-config.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-model-config.md", sha256: "c03f7392e0186530056021fc752ad16ceccc0d652f6af1457ed31447e9527056"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_member_desk_integration.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_member_desk_integration.md", sha256: "77b0312aa6bcd56f96361ddcdb9e881aafc90eae83297e75efeadeccfda060e2"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/concept", "domain/research"]
---

# Influence vs alignment axes

> Rank measures INFLUENCE; per-category stance measures ALIGNMENT. Keep them as two separate axes.

## Description

The KEY PRINCIPLE of the Moneyball credit-union legislative-influence model, written down 2026-06-29 (it "cost us many rounds"): **rank = INFLUENCE; per-category stance = ALIGNMENT. Two separate axes.**

- A high-activity OPPONENT (for example AOC or Welch: prolific consumer-finance cosponsors, anti-CU) will rank decently on influence. That is fine: the stance layer is the friend/foe filter, and the optimizer will not fund opponents.
- Do NOT make the rank pure-influence-led as the ONLY view. Paul's words: "that does not reveal underdogs". The Moneyball point is undervaluation: underdogs surface in the SEPARATE undervaluation / efficiency view (Intrinsic / Visibility / Undervaluation / Underdog-rank columns plus the optimizer), which the influence-weighted rank does not erase.
- Source: `project_member_desk_integration` (2026-06-29) and `moneyball-model-config` (2026-07-02), the project memory notes for the Moneyball dashboard (`Melange Systems/Moneyball.html`, the Blended workbook).

## Key Characteristics

- Two axes: **influence** (rank; pillars Press / Legislative / Committee-Influence / Demo) and **alignment** (stance: per-category Champion to Opponent 10-tier ladder plus Defender; overall = importance-weighted aggregate of the per-category tiers, the `category_stance.json` matrix).
- Stance is NOT leg activity. The stance-matrix aggregate (`fec/sync_stance_clean.py`) is authoritative; `apply_stance_guard.py` is SUPERSEDED (it overwrites col G with an older activity-based D3/C3-vs-dials 6-bucket formula that clobbers per-category tiers; do NOT run it if honoring per-category stances).
- Active opponents can rank on influence; the friend/foe filter is the stance layer and the optimizer (it funds no opponents).
- Underdogs are found in the separate undervaluation/efficiency view, not in the rank.
- The Legislative pillar is stance-gated/directional so opponents go negative while allies stay positive (see below); that is alignment entering the influence rank only through the leg pillar's sign, with committee 0.40 anchoring the board.

## Where the principle shows up in the model

### Pillar weights (influence rank): ALL THREE sets with status
Weight choice is Paul's domain: do NOT relabel his choices as "wrong" (see `press-classification-user-domain`). The weights oscillated all session on 2026-06-29/30; always READ LIVE from the workbook.

| Set | Pillars (as the source orders them) | Date | Status |
|---|---|---|---|
| .40/.30/.20/.10 | Committee/Influence 0.40 / Legislative 0.30 / Press 0.20 / Demo 0.10 (`apply_weights.py`, committee-weighted) | 2026-06-29 | HISTORICAL |
| 30/25/40/5 | Press 0.30 / Committee-Influence 0.40 / Legislative 0.25 / Demo 0.05 (sum 1; "current LIVE" in the 2026-07-02 note) | ratified 2026-07-07 | LAST RATIFIED |
| 45/10/40/5 | pillar order per `ranks_python.json` (not given in these sources) | live in `ranks_python.json` since 2026-09-03 | LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling |

- Other sets seen on 2026-06-29/30 (oscillation record): 0.40/0.35/0.20/0.05 (6/30 afternoon), 0.20/0.40/0.30/0.10 (mid/late 6/29).
- WHY committee-weighted (2026-06-29): press at 0.40 was an over-weighted tone/visibility proxy (press_value = LSD tone intensity x direction x topic-weight) that mis-ranked the real power players; Tim Scott (Banking leader + Defender, committee 1.00) sat at #18 because his 47 measured CU articles scored ~0 press_value on low-weight topics. Committee is the truthful structural-CU-power signal, and committee-weighting suppresses active opponents (they lack CU committee power) where leg/press did not. Tim Scott goes to about #3.
- Score = weighted blend of 4 pillar PERCENTILES (`AB2:AB5`); Rank = RANK(Score). Member-desk score reproduces exactly: `AB2*Leg% + AB3*Press% + AB4*Cmte% + AB5*Demo%`. Pillars: Press% (col9), Legislative% (col16, weighted by AB2), Influence/committee% (col18, approximately Committee% since centrality weight=0, AB4), Demo% (col13, AB5). In the 2026-07-02 note the Blended Model weights sit at labels col AA / values col AB ("Influence" pillar = committee, AB12=1 / AB13=0).

### Committee / Influence pillar
- Committee score = (Membership + Leadership)/2. Leadership multipliers as of 2026-06-30 (Paul applied chair/ranking x1.5): Chair full 3.0 / sub 7.5, Ranking full 2.0 / sub 4.5, Vice full 1.0 / sub 2.0. Membership tier weights: Highly 3.0 / Moderately 1.8 / Slightly 0.9 (subcommittee = /6). ALL Small Business seats set to [Highly] (earlier note 2026-06-29: Small Business unified to Moderately). Reproduced 288/288.
- Influence pillar R (`Blended Model!R`, col18, Influence%) = E/MAX(E) = committee_raw / MAX(committee_raw) (committee-fix / CMTEFIX, `fec/apply_committee_fix.py`, applied live 2026-06-30), NOT the old PERCENTRANK double-percentile: percentile flattened a backbencher (score 2.5) to the 90th percentile next to chairs, so prolific juniors (Byron Donalds) ranked top-10. Normalized raw score distinguishes leadership: Crapo #1 (Banking + Finance + JCT), Tim Scott #2; Donalds #8 to #14. Source: `Committee Data` relevance-tiered seats (Highly/Moderately/Slightly to score).
- GAP: the committee re-weight (chair/ranking x1.5, SB to Highly) was done by hand in Excel, NOT yet scripted.

### Legislative pillar (stance-gated, directional)
- Leg-stance gating ON since 2026-06-30 eve (`fec/apply_leg_stance.py`): Blended Model col D overridden with static stance-signed leg raw = sum IMP[topic] x activity x stanceMult (stance sign: Champion/Defender +1 ... Opponent -1) x importance. Opponents go NEGATIVE (verified AOC -2.6, Welch -5.6, Marshall -5.9 to bottom-decile Leg%), allies positive (Roger Williams +17). Reads `category_stance.json` (6/26, == Category Stance sheet, user-confirmed 2026-06-30). Previously OFF (activity-only `='Rank & Allocation'!D{r}`, un-gated). `apply_legstance_undo.py` reverts col4 to the un-gated formula. The `Legislative Score - Normalized` sheet is a FROZEN curated snapshot.
- Earlier this churned when leg was a big driver, but committee 0.40 now anchors the board so it is well-behaved.
- raw/max normalization was TRIED on leg (J,P) 2026-07-01 and REVERTED: leg-stance raw is long-tailed (allies +17..+27), so value/MAX squashed the mid-board and floated disengaged skeptics UP (AOC #344 to #191, Welch to #279); back on PERCENTRANK. Leg-stance stays "muted" (AOC leg raw -2.58 gives Leg% 0.102, positive) but fine because the press fix already ranks opponents low (final AOC #344 / Welch #374 / Marshall #473). A winsorized normalizer (divide by 90th-pct magnitude, not max) would make leg bite without compression if ever wanted.

### Press pillar
- Real CU press releases only (LSD tone x stance direction x per-category weight). The 1,310 `billstatus:` rows (synthetic "X cosponsored Y" one-liners) are DE-DUPED out of the pillar (`apply_press_dedup.py`) and hidden from display; ~319 members have 0 press, but with press at 0.20 the sparsity barely matters (`apply_press_redup.py` re-adds them if ever wanted).
- Source of truth `Draft Systems\cu_press_stance_tone.csv`, regenerated 2026-06-30 (2388 rows, stance_src debate/human_label; no `billstatus:` rows; the dedup filter now matches 0, which is correct); de-dup total about 16.6 / ~1030 nonzero (was about 15.97/1012 on the Jun-24 3701-row csv).
- 2026-07-01 FIXED (user-approved): (1) attribution: press counts ONLY own-domain rows (*.senate.gov/*.house.gov); dropped 819 third-party rows, 816 of them `americascreditunions.org` (the CU lobby's own site, mis-attributed to the 243 members its articles mention, so their pro-CU stance was counted as the member's; e.g. "Advocacy win: Marshall will not offer amendment" scored +support FOR Marshall). Own-domain press total about 9.12. (2) Press% percentile-rank became signed `=C3/MAX($C$3:$C$535)` (mirror CMTEFIX). Result: Marshall #193 to #473 (Press% -0.07), Welch #188 to #374, AOC #184 to #344.
- Press category weights (row 535 of Press Release - Normalized) TIERED as of 2026-07-02 (user-ratified), from the 'Topic Weights' sheet detailed table: Interchange / CU Tax Status / CCM 0.30, Charter/FOM 0.15, Exam/NCUA 0.10, medium 0.08, low 0.02-0.05. Before this: flat 0.05 with THREE cells silently 0 via stray LET-formula remnants (audit-II W1); earlier 06-29 note: Interchange/CU-Tax/Credit-Card weight 1, rest 0.05. `audit_full` guards row 535 numeric-positive. Media blend dials live: SOCIAL_SHRINK on (thin-cat nz/15), RT_W 0.5.
- Press DISPLAY corrections: the DEBATE sentiment model mislabels articles (reads "prohibit"/"disapproval" as anti-CU); `press_stance_overrides.json` (match by url/title_contains, stance support|oppose|neutral) is applied by `make_member_desk` to the DISPLAY (`_press_corr`); pillar/rank correction needs the upstream press_value re-flowed.
- Durable code: `apply_press_dedup.py`, `apply_raw_max_norm.py` (press + committee raw/max), `apply_committee_fix.py`, `apply_leg_stance.py`. See `cu-signflip-directionality`, `press-classification-user-domain`.

### Stance gotchas
- `category_stance.json` can be badly stale (was 6/26 while Paul's edits were 6/30); Paul edits stances in the `Category Stance` sheet (A=member, B=General, C:S=17 categories); rebuild the json FROM that sheet before any stance-dependent step (`sync_stance_clean`, `apply_leg_stance`).
- `sync_stance_clean.py` starts by restoring a PRISTINE PRE-STANCEGUARD backup over the workbook: destructive; adapt it (write col G only) rather than running as-is.
- Stance tier lives in Rank & Allocation col G (10-tier ladder).

### Allocator and efficiency view (where underdogs surface)
- Allocator (Blended Model col U) as of 2026-06-30 eve: live file UNCAPPED, top-133 funded, flat $2.0M pot, NO $10k per-member cap (Paul rewound to the pre-cap 6/29 version and chose to KEEP it; `apply_alloc_cap.py` NOT applied; max single alloc about $25.8k). The $10k-cap / top-250 config exists only in the 6/30-final backup line (Cap=AB8=10000 / Fund-top-N=AB7=250 / fill-mult=AB14). Live-what-if sliders (`fec/make_dashboard_html.py`, cusl/cosl) capped: CU money $20k, competitor/opposition $30k, both $1k steps.
- Efficiency view = Golovin-Krause optimizer (`optimize.py`, $500 increments, $10k FEC per-member cap); coalition builder.
- Calibrated engine constants (verify in the live `fec/*.py`, NOT the spec): WM 0.35 / WP 0.65, MAXSHIFT 18, DTHRESH 11.25 (rescaled 2026-07-01), BSCALE 400k, edge half-sat +6, LELEV 0.8, optimize INC $500 / PMAX $10k, `cpf` = source-alignment (co-partisan 1.7 / out-partisan 0.5), receipts=0 imputed to MEDIAN (not floored), PERS_NONE 0.45 (user-ratified 2026-07-02, Ally parity), IMPUTE_IND0 median imputation in ALL of flip/frontier/salience.
- **Lesson:** `MATHEMATICAL_SPECIFICATION.md` was a full calibration BEHIND the code all session; always check constants against live code (refreshed 2026-06-29; audit notes 5.A/7.A resolved).

### Dashboard and workflow facts that go with it
- ONE deliverable: `Melange Systems/Moneyball.html` (SNA cosponsorship network + per-member "member desk", dark theme, merged by `make_combined.py`); map of every file/pipeline/live config in `Melange Systems/INDEX.md` (read first). Moneyball workbook `Moneyball Main Version - Blended.xlsx` at `C:\Users\pgoff\OneDrive\Desktop\Melange Systems`; engine in `fec/`; state as of 2026-06-30 eve (Paul rewound to the 6/29 10AM version, then rebuilt with the bug-fixes).
- Pipeline (in `fec/`), regenerate after any workbook change IN ORDER: `build_dashboard_bundle.py` then `make_dashboard_html.py` + `make_member_desk.py` then `make_combined.py`. Canonical one-command chain: `fec/run_pipeline.py [--recalc]` (incl. stance, recalc, advisory, exports, audit; expect 48/48). Its recalc zip-validates the workbook and retries once: on 2026-07-02 an Excel-save/OneDrive collision TRUNCATED the workbook to 2.2MB after "recalc ok"; recovery = restore newest `BACKUP-*.xlsx` (always created before writes) and rerun.
- Workbook writes go through Excel COM (win32com) so formulas/tables recalc (openpyxl drops cached values); Excel must be CLOSED (an open workbook locks the file: PermissionError). Every model edit backs up to `backups/*.PRE-*.xlsx`. (Later superseded elsewhere by the "NO COM anywhere" rule; kept as the source's then-current statement.)
- WORKBOOK COLLISION: a parallel "other session" writes the same workbook and once reverted a committee-fix COM write (re-saved an older copy); sequence workbook edits with the other session; generator-side changes (overrides, `.py` edits) are safe.
  - Dated correction (2026-10-04): the Phase 2 inversion of 2026-07-02/03 deleted the RECALC step (`--recalc` is a retired no-op) and retired the COM write path (NO COM anywhere; the workbook became a self-refreshing view of `ranks_python.json`), so the `--recalc` chain and the COM write in the three preceding bullets are history; whether non-COM workbook writes from a parallel session still need sequencing is not recorded in the vault.
- `congress_cosponsor_network_*.xlsx` is globbed (latest by mtime) by `build_dashboard_bundle` and `flip_model`: DON'T move it. Generators write HTML with `const DATA=__DATA__`/`__BUNDLE__`; the combined file wraps each app's JS in its own IIFE, so `DATA` is not global in preview (drive controls via the DOM). Preview browser has a 0x0 viewport (network-canvas screenshots fail): verify with `preview_eval`. NFC-normalize accented names for joins.
- Member desk: General page (overall rank/stance/legislative radar/pillar bars/invested=FEC/electoral-vuln $) plus Staff, Bio, Relational, Committee positions (full seats with relevance badges), Demographics (PERCENTILE-normalized radar; min-max crushed it), Psychometrics, Legislative actions (DEDUPED: one row per (bill,congress), most-specific role, area tags), Press & social media (graded-sentiment filter, billstatus hidden). SNA network: committee-cluster layout toggle (Porter et al. 2005 normalized-interlock spring layout; Cosponsorship <-> Committees in `make_dashboard_html`; stable `crc32` jitter seed); bidirectional navigation with the member desk.
- Phone-friendly (2026-06-29): `@media(max-width:640px)` in `make_member_desk.py` + `make_dashboard_html.py`; SNA canvas touch pan/pinch/tap; phones default to the member desk (controller `innerWidth<=700`); mobile SNA graph-first (`#left` hidden, canvas ~66vh, `#right` details auto-scroll). GOTCHA: `make_combined.scope_sna()` scopes SNA CSS under `#app-network` and is now `@media`-aware (it used to destroy `@media` blocks, split-on-`}`). Preview: `.claude/launch.json` serves the dir; load `/Moneyball.html`, resize to mobile.

### How Paul works (from the source's working-style section)
- Run everything yourself (scripts, rebuilds, recalcs); Paul sets metrics/thresholds. Unvarnished assessments, own mistakes plainly, don't appease (see the communication-style topic). Weights/multipliers are Paul's to set, but when delegated ("make the decisions") make the truthful call and apply it. Verify every change with real numbers; don't claim done without proof. Related notes: `feedback_never_appease`, `feedback_run_everything`, `feedback_ask_before_changes`, `feedback_consult_multipliers_thresholds`.

## Where it Applies

- [[melange-dashboard]] - Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network).
- [[moneyball-workbook]] - Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority).
- [[2026-06-feature-melange-dashboard-ui-evolution]] - Melange dashboard UI history: capstone, member desk, retheme, simplification, plain-language pass, Members Section lane.
- Melange architecture and system of record - Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics
- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
- [[2026-06-feature-melange-model-facts]] — Melange model facts: the regeneration pipeline, the Blended Model and its pillar decisions, and the member desk and SNA features as recorded in June 2026, with the three pillar-weight sets of 2026-06-29 (historical), 2026-07-07 (last ratified) and 2026-09-03 (live but unratified).

## Related Concepts

- [[four-pillar-percentile-blend]] — The Moneyball rank is a weighted blend of four pillar scores (committee/influence, legislative, press, demographic), built as percentile ranks on 2026-06-25, with the committee/influence pillar moved to raw/max on 2026-06-30 and press to signed raw/max on 2026-07-01; resolution 3 records three weight sets (historical, last ratified, live but unratified), only Paul ratifies one, and the live set is read where it is kept.
- [[say-do-gate]] — A Champion or Defender cell in the category-stance matrix stands only if the stated stance is backed by a recorded action there: an authored or original-cosponsored bill (Path A) or a CU-aligned final-passage vote (Path V); otherwise Ally.
