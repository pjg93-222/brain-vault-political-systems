---
type: actor
name: "Standing rules, committee-data scoring and the Sub Layer surgery (Moneyball Blended workbook)"
aliases: ["Moneyball Blended workbook: Standing rules, committee-data scoring and the Sub Layer surgery"]
category: "tool"
description: "Standing rules of the Moneyball Blended workbook, the committee-data scoring reference of 2026-07-01 and the Sub Layer off-by-one surgery of 2026-07-16/17 that fixed the ranks."
repository: ""
stack: ""
status: "active"
team: ""
criticality: ""
pci: false
known_issues: []
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/data"]
part_of: "[[moneyball-workbook]]"
---

# Standing rules, committee-data scoring and the Sub Layer surgery (Moneyball Blended workbook)

> Standing rules of the Moneyball Blended workbook, the committee-data scoring reference of 2026-07-01 and the Sub Layer off-by-one surgery of 2026-07-16/17 that fixed the ranks. Part of [[moneyball-workbook]] (project [[melange-systems]]).

## Committee Data scoring (reference, 2026-07-01; `moneyball-committee-scoring`)

`Committee Data` sheet (A1:E~289) holds the committee pillar. Columns: A=Member, B=Committee score, C=Membership, D=Leadership, E="Seats held" text. **B/C/D are STATIC values; no Python builds them** (grep confirmed; `match_committees.py` is FEC-PAC matching, unrelated). `Seats held` encodes each seat as `Name (full) [Tier]` or `Parent - Sub [Tier/Role]`; Tier is Highly/Moderately/Slightly, Role is Chair/Ranking/Vice.

**Formula (reverse-engineered, reproduces all 288 rows exactly):**
- Seat is `sub` iff its name contains " - " (else `full`; note Joint Committees have no "(full)" but are full).
- Membership per seat = base[tier] × (1 if full else 1/6). base = {Highly: 3.0, Moderately: 1.8, Slightly: 0.9}, so subs = 0.5/0.3/0.15.
- Leadership per seat (only if role) = membership_weight × mult: Chair full ×2, sub ×5; Ranking full ×4/3, sub ×3; Vice full ×1, sub ×2.
- Membership(C) = Σ seat membership; Leadership(D) = Σ seat leadership; **Committee score(B) = (C+D)/2**.

Leadership multipliers as of 2026-06-30 (user applied chair/ranking ×1.5): **Chair full 3.0 / sub 7.5, Ranking full 2.0 / sub 4.5, Vice full 1.0 / sub 2.0**. Membership tier weights: Highly 3.0 / Moderately 1.8 / Slightly 0.9 (subcommittee = /6). ALL Small Business seats set to [Highly]. Reproduced 288/288.

To change chair/ranking weight or a committee's tier: edit the multipliers / the `Seats held` tier text, recompute B/C/D with the scorer, write back, recalc. Validator + scorer: session scratchpad `cmte_validate.py` (2026-06-30). See `moneyball-model-config`. Influence pillar R = E/MAX(E) (committee-fix / CMTEFIX, `fec/apply_committee_fix.py`, applied live 2026-06-30; was PERCENTRANK double-percentile).

## Standing rules

- **Consult the user before treating apparent model errors as bugs** (feedback, 2026-06-25; `feedback_spreadsheet_consult_on_errors`; also targeted by Change control and Paul's decision authority):
  - Rule: when working in the Moneyball / model spreadsheets (and similar), if something looks like a bug (an odd formula, a weight-0 column, a mismatched/short cell range, a missing column, a value that seems wrong), do NOT assume it's a mistake and fix it. Surface it and consult the user first.
  - **Why:** apparent errors are frequently intentional design. Confirmed example (2026-06-25): the legislative topic blocks' "Average" columns and "Success Rate" columns are deliberately **weight-0**: they're populated for reference but intentionally do NOT feed the score. Only Sponsor (0.286) / Original Co-Sponsor (0.143) / regular Co-Sponsor (0.0714) are weighted. I had flagged the zero weights as a "latent bug"; they are by design.
  - **How to apply:** describe what looks off, explain why, and ask before changing anything. Never silently "correct" model logic. Relates to `project_moneyball_integrated_scraper`, `project_committee_relevance_scoring`.
- **Weight choice is the user's domain** (do NOT relabel a set as "wrong"; read the weights LIVE).
- **Phase 2 rule (2026-07-02, user sign-off): NO COM anywhere.** The workbook is a self-refreshing VIEW; `ranks_python.json` is the authority (see History in [[moneyball-workbook]]). Never kill Excel; `sync_stance_g`'s openpyxl save PermissionErrors harmlessly if Excel is open.
- **Check constants against live code, not the spec** (see Known Issues in [[moneyball-workbook]]).
- **Press-pillar CATEGORY weights (row 535 of `Press Release - Normalized`) are TIERED as of 2026-07-02 (user-ratified):** literals sourced from the 'Topic Weights' sheet detailed table: Interchange/CU Tax Status/CCM 0.30, Charter/FOM 0.15, Exam/NCUA 0.10, medium 0.08, low 0.02-0.05. Before this they were flat 0.05 with THREE cells silently 0 via stray LET-formula remnants (audit-II W1). `audit_full` guards row 535 numeric-positive. Media blend dials live: `SOCIAL_SHRINK` on (thin-cat nz/15), `RT_W` 0.5.
- **Stance tier** (`Rank & Allocation` col G) = importance-weighted aggregate of the per-category stance matrix (`fec/sync_stance_clean.py`), a 10-tier ladder, NOT leg activity. The matrix aggregate is authoritative; **`apply_stance_guard.py` is SUPERSEDED**: it overwrites col G with an OLDER activity-based (D3/C3-vs-dials) 6-bucket formula that clobbers the per-category tiers; do NOT run it if honoring per-category stances. GOTCHA: **`category_stance.json` can be badly stale** (was 6/26 while the user's edits were 6/30); the user edits stances in the **`Category Stance` sheet** (A=member, B=General, C:S=17 categories): rebuild the json FROM that sheet before any stance-dependent step (`sync_stance_clean`, `apply_leg_stance`). Also `sync_stance_clean.py` starts by restoring a PRISTINE PRE-STANCEGUARD backup over the workbook (destructive); adapt it (write col G only) instead of running as-is.
- **Legislative pillar** (2026-06-30 eve): **leg-stance gating is now ON** (`fec/apply_leg_stance.py`): `Blended Model` col D overridden with static stance-signed leg raw = Σ IMP[topic]·activity·stanceMult; opponents go NEGATIVE (verified AOC -2.6, Welch -5.6, Marshall -5.9, bottom-decile Leg%), allies positive (Roger Williams +17). Reads `category_stance.json` (6/26, == Category Stance sheet, user-confirmed 2026-06-30). Previously OFF (activity-only `=R&A!D`, un-gated). The `Legislative Score - Normalized` sheet is a FROZEN curated snapshot.
- **Press pillar:** de-duped, bills OUT. Source of truth = `Draft Systems\cu_press_stance_tone.csv`, **regenerated 2026-06-30 (2388 rows, stance_src debate/human_label; NO `billstatus:` rows; bill cosponsorship already excluded upstream; `apply_press_dedup.py` filter now matches 0 to exclude, which is correct)**; de-dup total ≈ 16.6 / ~1030 nonzero (was ≈15.97/1012 on the Jun-24 3701-row csv). **2026-07-01 FIXED (user-approved):** (1) attribution: press counts ONLY own-domain rows (`*.senate.gov`/`*.house.gov`); dropped 819 third-party, 816 = `americascreditunions.org` (the CU lobby's own site, mis-attributed to the 243 members its articles mention; their pro-CU stance was counted as the member's; e.g. "Advocacy win: Marshall will not offer amendment" scored +support FOR Marshall). Own-domain press total ≈ 9.12. (2) Press% percentile-rank to signed `=C3/MAX($C$3:$C$535)` (mirror CMTEFIX). Result: Marshall #193 to #473 (Press% -0.07), Welch #188 to #374, AOC #184 to #344. Leg pillar: raw/max was TRIED on leg (J,P) 2026-07-01 and REVERTED: leg-stance raw is long-tailed (allies +17..+27), so value/MAX squashed the mid-board and floated disengaged skeptics UP (AOC #344 to #191, Welch to #279); back on PERCENTRANK. Leg-stance stays "muted" (AOC leg raw -2.58 gives Leg% 0.102 positive) but fine: the press fix already ranks opponents low (final: AOC #344 / Welch #374 / Marshall #473). A winsorized normalizer (÷ 90th-pct magnitude, not max) would make leg bite without compression if ever wanted. Durable code: `apply_press_dedup.py`, `apply_raw_max_norm.py`, `apply_committee_fix.py` (CMTEFIX), `apply_leg_stance.py`. See `cu-signflip-directionality` / `press-classification-user-domain`.
- **Allocator** (`Blended Model` col U): as of **2026-06-30 eve the live file is UNCAPPED: top-133 funded, flat $2.0M pot, NO $10k per-member cap** (user rewound to the pre-cap 6/29 version and chose to KEEP it; `apply_alloc_cap.py` NOT applied; max single alloc ≈ $25.8k). The $10k-cap / top-250 config exists only in the 6/30-final backup line (`apply_alloc_cap.py`, Cap=AB8=10000 / Fund-top-N=AB7=250 / fill-mult=AB14). Live-what-if sliders (in `fec/make_dashboard_html.py`, cusl/cosl) capped: CU money $20k, competitor/opposition $30k, both $1k steps.
- **Calibrated engine constants (verify in live `fec/*.py`, NOT the spec):** WM 0.35 / WP 0.65, MAXSHIFT 18, DTHRESH **11.25** (rescaled 2026-07-01), BSCALE 400k, edge half-sat +6, LELEV 0.8, optimize INC $500 / PMAX $10k, `cpf` = source-alignment (co-partisan 1.7 / out-partisan 0.5), receipts=0 imputed to MEDIAN (not floored), PERS_NONE **0.45** (user-ratified 2026-07-02, Ally parity), IMPUTE_IND0 median imputation now in ALL of flip/frontier/salience.
- **Phone-friendly (2026-06-29):** dashboard is responsive: `@media(max-width:640px)` in `make_member_desk.py` + `make_dashboard_html.py`; SNA canvas has touch pan/pinch/tap (was mouse-only); phones default to the member desk (controller `innerWidth<=700`). Mobile SNA is graph-first: `#left` (stats/budget/optimizer) hidden, canvas ~66vh on top, `#right` member details below (auto-scrolls into view on node tap). GOTCHA: `make_combined.scope_sna()` scopes SNA CSS under `#app-network` and is now `@media`-aware; it used to destroy `@media` blocks (split-on-`}`), silently killing the network's mobile CSS in the combined file. To preview: `.claude/launch.json` serves the dir; load `/Moneyball.html`, resize to mobile.
- **Regen:** `fec/run_pipeline.py [--recalc]` (canonical one-command chain incl. stance, recalc, advisory, exports, audit; expect **48/48**). Workbook edits (June guidance, RETIRED by Phase 2, see History in [[moneyball-workbook]]) went through Excel COM (win32com) and required Excel CLOSED (an open workbook locks the file: PermissionError; check before any COM/openpyxl write). See `moneyball-deep-audit-2026-07-02`, `press-classification-user-domain`.

## Sub Layer surgery (2026-07-16/17; `sublayer-surgery-2026-07-17`; THE rank fix)

Memory description: "THE rank fix: Sub Layer off-by-one repaired (9,061 formulas, every member scored on own row again), proven 533/533 by independent recompute, 520 ranks moved leg-only, audit clean; N-genre transfer CLOSED (speech 0.05, hearing 0.16 vs bar 0.40)". Memory last modified 2026-07-18.

**The root cause of "ranks out of sorts" (2026-07-16/17): the 07-15 Legislative-Normalized own-row repair shifted that sheet's member rows up one; every 'Sub Layer - Raw' efficiency formula (AG:AW) kept pointing one row low, so EVERY member's legislative efficiency was computed from their alphabetical neighbor's record.** Invisible while Excel caches stayed stale (`compute_pillars` served `pillar_inputs_snapshot`); materialized by the first COM `CalculateFull` (2026-07-16 20:10, the 522-move). Two additional slot bugs: AH numerator used Q(Sponsor Success) instead of P(CU-Cap Success Rate), AI used col AI instead of X(NCUA Success Rate) in 532/533 rows; each formula's own Table1 minmax basis named the correct column (the repair anchor; majority-vote canon would have locked in the bug).

Fix @c6dc6b2 (cfpb branch): `fec/repair_sublayer_references.py` (`--plan`/`--apply`; plan = full 9,061-cell audit; apply = backup `PRE-SUBLAYER-REPAIR-20260717_010907.xlsx` + rewrite) then COM recalc then chain. **PROOF: independent python re-derivation of the whole leg chain matches `compute_pillars` 533/533; rank delta 520/533 LEG-PILLAR-ONLY (press/inf/dem deltas exactly 0.0); audit ALL MODULES CLEAN; tier holds Barr #1 + all 17 placements.** Barr leg .897 to .994, Scott .765 to .914, CCM .778 to .936: Paul's intuition vindicated: the "stale" pre-recalc values were computed under the pre-07-15 ALIGNED layout and were closer to truth.

**N-genre question CLOSED WITH RECEIPTS (never reopen without new genre/data):** interview-based affective-N does NOT transfer to other collected text: floor+hearing pooled LOOK: FAIL rho=0.050 (bar .40, n=409); hearing-only LOOK: FAIL rho=0.161 (n=121; better direction, still far). Both one-look markers in `source_data/` (`speech_n_genre_result.json`, `hearing_n_genre_result.json`); the ~61 N-desert members are a COLLECTION-ONLY problem (Paul's 3-week interview cadence). Paul pushed back on the first FAIL ("I thought the N passed. Fix it"): held under law 13, ran the legitimate distinct hypothesis instead; he was given honest sizing before each look. Also that night: his Anthropic API credit ran out mid-study and was topped up.

**Lesson pair for future audits:** (1) a "stale cache" can be SHIELDING downstream consumers from an unrepaired reference plane: refresh only after verifying the formula chain; (2) when repairing drifted formulas, the majority pattern can BE the bug: anchor on an internal self-consistency signal (the Table1 basis) instead. Campaign log: `FIX_CAMPAIGN_LOG_2026-07-16.md` entries 010-015.

**UPDATE @a3174bc (guard batch, campaign entry 015, 2026-07-17):** fences every silent-failure class from the 07-16/17 incidents: (1) AB pillar dials fail loud (W1 class); (2) pillar snapshot stamped + stale-warn >7d + audit FAIL >14d (522-rank class); (3) audit no longer writes the snapshot (`PILLAR_SNAPSHOT_FREEZE`); (4) `apply_press_overrides` legacy re-flow retired behind hard guard (`--merge-only` keeps the ledger merge, desk UI repointed); (5) tier placements fail loud on unresolved names; (6) `config_overlay` fails closed; (7) audit check: channel inputs within 28d of corpus. Same commit: speech-channel per-event 1/n normalization (confirmed sibling drift, Ogles-class inflation removed) giving 230/533 ranks moved PRESS-ONLY (leg/inf/dem mean delta exactly 0), blend 2,024 cells, chain complete, audit ALL MODULES CLEAN incl. the new checks, kernel 72/72, tier holds Barr #1 + all 17 placements. Also that day: Vought RT gold verified Positive for both retweeters @b456b9d; Wagner #3 explained = CFPB .927 efficiency + 97.7pct agenda hit rate, NOT volume.

## Related Topics

- [[2026-07-feature-influence-engine-internals-chatgpt-lane-and-sublayer-surgery]] — The ChatGPT laundry-list lane landing of 2026-07-16 and the Sub Layer off-by-one surgery of 2026-07-16/17, as recorded for the influence engine.
- [[moneyball-workbook-lineage-and-june-audit]] — The Moneyball model lineage and files from 2026-06-18 to 06-22, and the audit and delivery of the Blended workbook on 2026-06-25.
