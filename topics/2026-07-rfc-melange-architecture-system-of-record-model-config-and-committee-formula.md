---
type: topic
title: "Final model configuration and the committee-pillar formula (Melange architecture and system of record)"
aliases: ["Melange architecture and system of record: Final model configuration and the committee-pillar formula"]
category: "rfc"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-07-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/backend", "category/rfc"]
part_of: "[[2026-07-rfc-melange-architecture-system-of-record]]"
---

# Final model configuration and the committee-pillar formula (Melange architecture and system of record)

> The final Moneyball model configuration as of 2026-06-30, pillar by pillar with the allocator, the engine constants, the press category weights and the superseded COM how-to, and the committee-pillar scoring formula of 2026-07-01. Part of [[2026-07-rfc-melange-architecture-system-of-record]] (project [[melange-systems]]).

## Final model configuration (as of 2026-06-30 eve, source `moneyball-model-config` dated 2026-07-02)

Source description line: "Moneyball CU-influence model - final config, key files, COM/lock gotcha, and the spec-is-stale lesson".

State: the user rewound to the 6/29 10AM version, then rebuilt with the bug fixes below.

### Pillar weights (resolution 3: ALL THREE sets with dates and status)

Score weights live in the Blended Model (labels col AA / values col AB; the "Influence" pillar = committee, AB12 = 1 / AB13 = 0). **READ LIVE: they oscillated all session.** Weight choice is the user's domain: do NOT relabel as "wrong".

| Weight set | Dates | Status |
|---|---|---|
| `.40/.30/.20/.10` | 2026-06-29 | HISTORICAL. (Source wording for the sets seen in June: 0.40/0.35/0.20/0.05 on 6/30 afternoon, 0.20/0.40/0.30/0.10 mid/late 6/29; ordering Press / Committee-Influence / Legislative / Demo as listed in the source.) |
| `30/25/40/5` | ratified 2026-07-07 | LAST RATIFIED. Matches the live reading in this source (2026-06-30 eve): Press 0.30 / Committee-Influence 0.40 / Legislative 0.25 / Demo 0.05 (sum 1). |
| `45/10/40/5` | live in `ranks_python.json` config since 2026-09-03 | LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling. Never read this newest set as ratified. |

Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and nothing here awaits Paul.

(The mapping of the brief's compact notation to pillar order is taken from the 06-30 source reading: Press / Legislative / Influence / Demo for `30/25/40/5`; verify against the live config before quoting.)

### Committee pillar (score as of 2026-06-30)

- **Committee score = (Membership + Leadership) / 2.** Leadership multipliers as of 2026-06-30 (user applied chair/ranking x1.5): Chair full 3.0 / sub 7.5, Ranking full 2.0 / sub 4.5, Vice full 1.0 / sub 2.0. Membership tier weights: Highly 3.0 / Moderately 1.8 / Slightly 0.9 (subcommittee = /6). ALL Small Business seats set to [Highly]. Reproduced 288/288.
- Influence pillar R = E/MAX(E) (committee-fix / CMTEFIX, `fec/apply_committee_fix.py`, applied live 2026-06-30; was PERCENTRANK double-percentile).
- GAP: the committee re-weight (chair/ranking x1.5, SB -> Highly) was done by hand in Excel, NOT yet scripted.

### Stance tier

Rank & Allocation col G = importance-weighted aggregate of the per-category stance matrix (`fec/sync_stance_clean.py`), a 10-tier ladder; NOT leg activity. The matrix aggregate is authoritative; **`apply_stance_guard.py` is SUPERSEDED** (it overwrites col G with an OLDER activity-based D3/C3-vs-dials 6-bucket formula that clobbers the per-category tiers; do NOT run it if honoring per-category stances). GOTCHA: **`category_stance.json` can be badly stale** (was 6/26 while the user's edits were 6/30); the user edits stances in the `Category Stance` sheet (A = member, B = General, C:S = 17 categories); rebuild the json FROM that sheet before any stance-dependent step (`sync_stance_clean`, `apply_leg_stance`). Also `sync_stance_clean.py` starts by restoring a PRISTINE PRE-STANCEGUARD backup over the workbook (destructive; adapt it to write col G only instead of running as-is).

### Legislative pillar

Leg-stance gating is ON (2026-06-30 eve, `fec/apply_leg_stance.py`): Blended Model col D overridden with static stance-signed leg raw = Sum IMP[topic] x activity x stanceMult; opponents go NEGATIVE (verified AOC -2.6, Welch -5.6, Marshall -5.9 -> bottom-decile Leg%), allies positive (Roger Williams +17). Reads `category_stance.json` (6/26, == Category Stance sheet, user-confirmed 2026-06-30). Was previously OFF (activity-only `=R&A!D`, un-gated). The `Legislative Score - Normalized` sheet is a FROZEN curated snapshot.

### Press pillar

De-duped, bills OUT. Source of truth = `Draft Systems\cu_press_stance_tone.csv`, **regenerated 2026-06-30 (2,388 rows, stance_src debate / human_label; NO `billstatus:` rows; `apply_press_dedup.py` filter now matches 0 to exclude, which is correct)**; de-dup total ~16.6 / ~1,030 nonzero (was ~15.97 / 1,012 on the Jun-24 3,701-row csv).

**2026-07-01 FIXED (user-approved):**

1. Attribution: press counts ONLY own-domain rows (`*.senate.gov` / `*.house.gov`); dropped 819 third-party, 816 = `americascreditunions.org` (the CU lobby's own site, mis-attributed to the 243 members its articles mention, so their pro-CU stance was counted as the member's; e.g. "Advocacy win: Marshall will not offer amendment" scored +support FOR Marshall). Own-domain press total ~9.12.
2. Press% percentile-rank -> signed `=C3/MAX($C$3:$C$535)` (mirror CMTEFIX). Result: Marshall No. 193 -> 473 (Press% -0.07), Welch No. 188 -> 374, AOC No. 184 -> 344.

Leg pillar: raw/max was TRIED on leg (J, P) 2026-07-01 and REVERTED (leg-stance raw is long-tailed, allies +17..+27, so value/MAX squashed the mid-board and floated disengaged skeptics UP: AOC No. 344 -> 191, Welch -> 279); back on PERCENTRANK. Leg-stance stays "muted" (AOC leg raw -2.58 -> Leg% 0.102 positive) but fine, since the press fix already ranks opponents low (final: AOC No. 344 / Welch No. 374 / Marshall No. 473). A winsorized normalizer (divide by 90th-pct magnitude, not max) would make leg bite without compression if ever wanted.

**Durable code:** `apply_press_dedup.py` (own-domain attribution filter), `apply_raw_max_norm.py` (press + committee raw/max), `apply_committee_fix.py` (CMTEFIX), `apply_leg_stance.py`. See `2026-06-feature-cu-stance-and-sentiment` for the stance side of the press pillar.

### Allocator

Blended Model col U: as of **2026-06-30 eve the live file is UNCAPPED: top-133 funded, flat $2.0M pot, NO $10k per-member cap** (user rewound to the pre-cap 6/29 version and chose to KEEP it; `apply_alloc_cap.py` NOT applied; max single alloc ~$25.8k). The $10k-cap / top-250 config exists only in the 6/30-final backup line (`apply_alloc_cap.py`, Cap = AB8 = 10000 / Fund-top-N = AB7 = 250 / fill-mult = AB14). Live-what-if sliders (in `fec/make_dashboard_html.py`, cusl / cosl) capped: CU money $20k, competitor / opposition $30k, both $1k steps.

### Calibrated engine constants (verify in the live `fec/*.py`, NOT the spec)

WM 0.35 / WP 0.65, MAXSHIFT 18, DTHRESH **11.25** (rescaled 2026-07-01), BSCALE 400k, edge half-sat +6, LELEV 0.8, optimize INC $500 / PMAX $10k, `cpf` = source-alignment (co-partisan 1.7 / out-partisan 0.5), receipts = 0 imputed to MEDIAN (not floored), PERS_NONE **0.45** (user-ratified 2026-07-02, Ally parity), IMPUTE_IND0 median imputation now in ALL of flip / frontier / salience.

Correction 2026-10-18 (evidence: ledger D-142, 2026-10-11): superseded. PERS_NONE's default moved from 0.45 to 0.40, equal to PERS[Ally], and the kernel pins PERS[—] <= PERS[Ally] (Melange 751f002f5); N6 is closed.

### Press-pillar CATEGORY weights (row 535 of Press Release - Normalized): TIERED as of 2026-07-02 (user-ratified)

Literals sourced from the 'Topic Weights' sheet detailed table: Interchange / CU Tax Status / CCM 0.30, Charter / FOM 0.15, Exam / NCUA 0.10, medium 0.08, low 0.02-0.05. Before this they were flat 0.05 with THREE cells silently 0 via stray LET-formula remnants (audit-II W1). `audit_full` guards row 535 numeric-positive. **Media blend dials live: SOCIAL_SHRINK on (thin-cat nz/15), RT_W 0.5.**

**Why/lesson:** `MATHEMATICAL_SPECIFICATION.md` was a full calibration BEHIND the code all session; always check constants against the live code. (Refreshed 2026-06-29; audit notes 5.A/7.A resolved.)

### Phone-friendly dashboard (2026-06-29)

Responsive: `@media(max-width:640px)` in `make_member_desk.py` + `make_dashboard_html.py`; SNA canvas has touch pan / pinch / tap (was mouse-only); phones default to the member desk (controller `innerWidth<=700`). Mobile SNA is graph-first: `#left` (stats / budget / optimizer) hidden, canvas ~66vh on top, `#right` member details below (auto-scrolls into view on node tap). GOTCHA: `make_combined.scope_sna()` scopes SNA CSS under `#app-network` and is now `@media`-aware (it used to destroy `@media` blocks by split-on-`}`, silently killing the network's mobile CSS in the combined file). To preview: `.claude/launch.json` serves the dir; load `/Moneyball.html`, resize to mobile.

### Superseded how-to (kept for history): COM and recalc

~~Workbook edits go through Excel COM (win32com) and require Excel to be CLOSED (an open workbook locks the file -> PermissionError; check before any COM/openpyxl write). Regen = `fec/run_pipeline.py [--recalc]` (canonical one-command chain incl. stance, recalc, advisory, exports, audit; expect 48/48). Its recalc zip-validates the workbook + retries once: on 2026-07-02 an Excel-save/OneDrive collision TRUNCATED the workbook to 2.2MB after "recalc ok"; recovery = restore newest `BACKUP-*.xlsx` (always created before writes) and rerun.~~ (2026-07-02) - superseded by "NO COM anywhere" (Phase 2). The recovery lesson (backups are created before writes; restore newest `BACKUP-*.xlsx`) and the OneDrive collision class remain useful. Related memory: `moneyball-deep-audit-2026-07-02`, `press-classification-user-domain`, `moneyball-receptivity-layer`.

## Committee-pillar scoring formula (source `moneyball-committee-scoring`, reference, 2026-07-01)

Moneyball `Committee Data` sheet (A1:E~289) holds the committee pillar. Columns: A = Member, B = Committee score, C = Membership, D = Leadership, E = "Seats held" text. **B / C / D are STATIC values; no Python builds them** (grep confirmed; `match_committees.py` is FEC-PAC matching, unrelated). `Seats held` encodes each seat as `Name (full) [Tier]` or `Parent - Sub [Tier/Role]`; Tier in Highly / Moderately / Slightly, Role in Chair / Ranking / Vice.

**Formula (reverse-engineered, reproduces all 288 rows exactly):**

- Seat is `sub` iff its name contains " - " (else `full`; note Joint Committees have no "(full)" but are full).
- Membership per seat = base[tier] x (1 if full else 1/6). base = {Highly: 3.0, Moderately: 1.8, Slightly: 0.9}, so subs = 0.5 / 0.3 / 0.15.
- Leadership per seat (only if role) = membership_weight x mult: Chair full x2, sub x5; Ranking full x4/3, sub x3; Vice full x1, sub x2.
- Membership (C) = Sum seat membership; Leadership (D) = Sum seat leadership; **Committee score (B) = (C + D) / 2**.
- Reconciliation with the 2026-06-30 multipliers above (inference, not stated in either source): applying the user's x1.5 to Chair and Ranking turns Chair 2 / 5 into 3.0 / 7.5 and Ranking 4/3 / 3 into 2.0 / 4.5 while Vice stays 1 / 2, matching the "as of 2026-06-30" list; the x2 / x5 / x4/3 / x3 set is the pre-x1.5 validation base.

**Flows into the model via LIVE formulas** (edit only Committee Data, then recalc): `Committee Data`!B -> `Rank & Allocation`!E (`=IFERROR(INDEX('Committee Data'!$B$2:$B$320,MATCH(name,...)),0)`) -> `Blended Model`!E -> col L Committee% / col Q Influence pillar -> col R Influence% -> Score. So recomputing B auto-propagates to Score / Rank. To change chair / ranking weight or a committee's tier: edit the multipliers / the `Seats held` tier text, recompute B / C / D with the scorer, write back, recalc (under the no-COM regime the recalc happens when the user opens Excel, `fullCalcOnLoad`, and the pillar snapshot refreshes). Validator + scorer: session scratchpad `cmte_validate.py` (2026-06-30). See `moneyball-model-config`.
