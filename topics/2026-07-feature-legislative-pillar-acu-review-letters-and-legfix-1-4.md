---
type: topic
title: "Letters integration and legfix 1-4 (07-17 to 07-25) (Legislative pillar and ACU review)"
aliases: ["Legislative pillar and ACU review: Letters integration and legfix 1-4 (07-17 to 07-25)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-legislative-pillar-acu-review]]"
---

# Letters integration and legfix 1-4 (07-17 to 07-25) (Legislative pillar and ACU review)

> The legislative pillar from 2026-07-17 to 07-25: integration of the 7 letters, the read-only data-plane audit, the legfix and LEGFIX2 bundles, the Tier-1 wiring deploy and the legfix4 residue close-out. Part of [[2026-07-feature-legislative-pillar-acu-review]] (project [[melange-systems]]).

## Pillar integration of the 7 letters (2026-07-17)

Paul's directive 2026-07-17: add the RE_ E-Meet zips' 7 letters (all POSITIVE pro-CU/CDFI) to the legislative column. Creators = **sponsor**, other signers = **original-cosponsor** (weight 2.0, satisfies say-do Champion A-path). L1 (Warner/Crapo): BOTH sponsors. L4: Blunt Rochester sole sponsor. Departed/no-row signers filtered silently. (See `legislative-letters-2026-07-17`; the memory header line: 7 congressional sign-on letters (2 zips) ingested as LTR- rows in `manual_bill_evidence.csv`; sponsors/original-cosponsors per Paul; stance layer regenerated + proven; workbook pillar counts staged for Paul's Excel step.)

**Mechanism:** letters = `LTR-<congress>-<cat>-<LEAD>` rows in `manual_bill_evidence.csv` (the Direction cell is authoritative since `bill_key` returns None for LTR ids). L1-L4 were already ingested by an earlier lane the same day but with Role=co-sponsor (1.0); Paul ordered the retrofit to original-cosponsor + L1 Crapo -> sponsor (32 role changes). Claude added L5 (Kim+Crapo CDFI support, 104 rows), L6 (Ciscomani+Magaziner CU Tax Status, 34), L7 (Waters+Foster CDFI-RIFs, 121); the CSV is now 297 rows. Dropped (not in the 533 roster despite sitting): **LaMalfa, Swalwell, David Scott**, plus delegate Pablo Hernandez - possible roster gaps worth flagging if it recurs.

**Proof run:** backup `_backup_letters_20260717_141249/` (7 files + MD5 manifest; ranks snapshot in TEMP). Ran live `build_archive_legislative.py` + `per_category_stance.py` ONLY. archive_leg delta = 279 cells, **exactly** matching the role-weight math (0 mismatches). Stance: 1,399 score cells / 292 tier cells / 244 members (CDFI 225 tier moves incl. 149 "-" -> Champion; CU Tax 34). Ranks/dashboard/workbook byte-unchanged (within approved scope).

**Learned mechanics:**
- Direction=+1 overrides the NEG-category sign flip (Tim Scott CCM +3.0 confirmed end-to-end).
- First-ever legislation in an empty domain moves composed stance a lot (sqrt_units 2.0, missing-source-out-of-denominator): Al Green CDFI Opponent -> True Neutral off one letter.
- `exceptional_rounding` recompute causes +-0.008 drifts in untouched categories; boundary-sitters can flip tiers (**Steil CFPB 0.701 -> 0.699 lost Champion by 0.002**; Valadao MBL same) - legitimate but surprising, reported to Paul.

**Pillar integration EXECUTED:**
1. CU Tax Status 8-col block ADDED to `Legislative Score - Raw` cols 153-160 (std 2/7-1/7-0.5/7 weights; outside Table1 A1:EM535-on-LegNorm and Table7 A1:EV535-on-Raw - safe); all 7 letters' counts pasted (284 cells; CDFI 91/93, CFPB-Restrain 99/101 per Paul, CCM 107/109, CUTax 153/155); LegNorm literals re-materialized (7,462 cells - LegNorm is LITERALS since the 07-15 repair, Python owns Raw -> LegNorm).
2. **Agenda formula B shipped:** `apply_leg_stance.py` now includes Original-Co-Sponsor counts (revert `LEGSTANCE_ORIGCO=0`); the old filter zeroed origco while counting plain cosponsor, incoherent with bill_rules 3/2/1 + grid 4:2:1 + say-do gate. col4 was 16 DAYS STALE (last PRE-LEGSTANCE 2026-07-01) - most of the 503/533 rank movement = stance-vintage catch-up, the letters' direct term small (A: 10 leads only; B: 249 signers, CU-Tax/CCM IMP-3.0 flagships dominate; CDFI IMP-0.1).
3. COM write via a scratch runner (the classifier blocked it; Paul picked Option 1 which cleared it; first run ABORTED SAFELY with 0 rows - Blended col-1 names are formulas, dead pre-calc, so match on R&A col A literals instead, rows mirror).
4. `compute_pillars --write`: **top-12 = old top-9 held, Tillis <-> Cruz swap at 10/11, Lummis 12; Crapo #1**; acceptance vs python sim 530/533 exact (3 mismatches = 0.0005-spread near-tie band 487-489, actual ordering correct by actual scores; the sim's K-decomposition wiggle). Kernel 72/72.

**KEY WIRING FACTS:** score path = col4 agenda (0.7) + AG:AW efficiency (0.3) via Primary-E only; Sub Layer C:U per-category SUMPRODUCTs feed ONLY Primary c7-c13 display - and C:U was STILL one-row-shifted post-07-15 (Bean reads Hamadeh + Bean's-own-row-as-weights; Lofgren reads empty 536) - rank-safe, REPORTED to Paul, surgery-pattern fix available (then done, see below). Crapo CDFI leg_raw 6.0 / CCM 2.0 - `cfpb-recorrection-band-shift-2026-07-15` Crapo-CCM watch.

**CLOSED GREEN:** full chain 13.5 min ALL MODULES CLEAN (letters state); then Paul's tier directive "adjust to the true tier 1s": `tier_overrides.json` rebuilt - T1 pins REMOVED (Fitzpatrick/Williams/Hagerty/Scott/Torres/Cortez-Masto/Timmons/Nunn + Hill's T2 pin), kept Barr+Kim anchors + 6 T2 pins; `audit_full._required_tiers` mirror + Hill-crown clause flipped in lockstep; **Tier 1 == pure 80/20 top-12: Barr, Hill, Meuser, Britt, Wagner, Daines, R.Williams, Kim, Timmons, Hagerty, Emmer, Scott** (Emmer = the letters' one mathematical T1 entrant, no pin; Cortez-Masto -> 51/T3); display rebuild `--from sync_stance_g` (col-G crowns re-synced) -> audit ALL MODULES CLEAN again.

**Commits and merge:** @ebbee29 (letters + agenda-B) + @7853b56 (tier) on `claude/legislative-letters-import-be42f9`. **MERGE DONE 2026-07-17 evening: main fast-forwarded 7aa36d1 -> 9aa9677, live tree ff-merged (cfpb branch == main), zero tracked dirt left.**

**Follow-up batch @9aa9677 (Paul: 'Fix all that... get rid of all the math notes, don't ask questions'):**
- (a) SubLayer C:U REPAIRED - 9,594 cells (own-row r-1, weight row $2 not $3, CFPB window CU:CY) + Tax slot col 14 gained the legislative SUMPRODUCT (EW:FA, block 153-160) alongside press; col 16 press-only; ranks md5 byte-identical (rank-safe proven; blast radius = exhaustive raw-XML census, C:U terminal at Primary-Normalized).
- (b) desk math notes STRIPPED (32 tpl removals: channels, split-half, r=.16, covered-stratum, panel-clearing, methnote ROI block, citations, 2 internal-name leaks) keeping 'Gold-validated: gold-anchored axes use the OOF Senate-gold composites.' + functional legends (say-do tooltips, CU-frame, integrity bar); builder/bundle provenance untouched.
- (c) 5 audit display-pins updated in lockstep (gold line now machine-pinned); stale 'Big Five axes unavailable' regression assertion fixed (it was broken by @2133640, another lane); desk rebuilt 27469KB, audit ALL MODULES CLEAN, kernel 72/72.
- Anomaly: `b5_gold_multitrait_validate` ran 7910 s (vs 23 s) with identical outputs - latency only.
- CU Tax Status treatment: IMP 3.0 flagship, DEFENSIVE set (labels=Defender, press-heavy .55/.70/.20 blend); SubLayer Tax slot col 14 NOW carries leg+press (wired in the @9aa9677 C:U repair); its user-owned row-3 weight (-0.5) untouched - if Paul ever finds the Tax display aggregate inverted, that weight is the dial.

## Legislative data-plane audit 2026-07-24 (read-only)

Full audit of the Moneyball legislative plane, 2026-07-24 (24 Opus subagents + Grok critique). **Read-only - nothing was changed; every correction awaited Paul.** Report: scratchpad `LEGISLATIVE_AUDIT_2026-07-24.md`.

Load-bearing facts that change how future claims must be worded:
- **`archive_leg.json` does NOT feed the rank.** `archive_leg` appears 0x in `compute_pillars.py`; the rank's legislative percentile reads workbook `Bill Model` col O via `_read_OEF`. archive_leg feeds only the 18-category stance matrix (`per_category_stance.py`). Two unreconciled legislative measures exist (rho=0.912, tail disagreements up to 430 rank positions). **Never state an archive_leg weight-share as a rank impact.**
- **The bill archive has no producer script** - 16 readers, 0 writers, no bill collector in any branch of git history. The same uncommitted collector also made `congress_cosponsor_network_*` (13 files) + `congress_centrality_*` (3). Executed Congress.gov queries survive in the `hl=` param of 8,520 DetailLink values - the spec is recoverable from the artifact.
- **Category in the dedup key is DESIGN, not a defect** (`build_archive_legislative.py:113`, comment says "effective-domain"). It produces breadth across the 18-domain matrix, not a 5x payout. 1,463/5,466 triples multi-filed. Do not re-flag as a bug.
- **`cu_bill_directions.json` (63 bills, ACU's real tracker positions) has ZERO code consumers**; `bill_direction_queue_FILLED.csv` has 57 more adjudicated directions, also unused. Meanwhile 82% of legislative weight is signed by the `sign = -1 if cat in NEG else 1` code default. The fix is already on disk.
- **CDFI Fund sheet is empty (0 rows); CU Tax Status has no sheet.** Both categories are manual-letter-only. `audit_full.py:474`'s 18-category guard is **vacuous** - hand rows satisfy it.
- **Interchange was scraped with ONE search term** vs 17-72 for other categories -> 36 rows, 1 act.
- **`press_text_cache.jsonl` is 97.7% paywall-truncated** ("LOG IN FOR ACCESS", median 1,927 chars). Any bill/entity count from ACU article text is a FLOOR, never a count.
- **ACU letter corpus starts 2024-01-07** but the bill corpus spans 2021-2026. Absence of an ACU letter proves nothing for 117th/118th bills - this killed a Fable finding. See `dont-drop-context-anchor-memory`.
- ACU live site now lists **23 issues vs the model's 18**; 5 have no home (Rate Caps and Fees, CU-Bank Mergers, Bank Attacks, Appropriations, State Level). ACU GraphQL at `/graphql` (operationName `search` + `AdvocacyQuery`) returns all 533 letters with issue tags - reusable for future diffs.
- The `'disapproval'` guard in the Credit Card Mandates sign rule **never fires** (0/11,283); the 119th style is "Disapproving".
- Standing constraints honored: press stance stayed untouched per `press-classification-user-domain`.

## Fix bundle SHIPPED @9c2bf41 (branch `codex/legfix-20260724`, worktree `cxwt-legfix`) - NOT merged to main

Paul said "keep going, under fable" 2026-07-24; treated as authorization for **behaviour-neutral work only**. Five fixes landed via Codex (2 rounds), reviewed by an independent Codex thread + a 4-lane adversarial sweep (8 agents):
1. `'disapproval'` substring -> `DISAPPROVAL_RE = disapprov(?:al|ing)` + `BR.is_disapproval()`, shared by production and console. **Neutral now, but deliberately flips future CRA resolutions -1 -> +1** - say this, never call it flatly neutral.
2. `bill_key()` left UNCHANGED; additive `bill_type_key()` + `key_collisions()` guard.
3. `bill_audit_console.resolved()` now mirrors production - a title exclusion is terminal, an override cannot rescue it.
4. New `bill_coverage_audit` check **C12** (archive-vs-manual provenance) - mirrors production routing and WARNs on a stale allowlist.
5. New suites `test_bill_rules_routing` (9) + `test_bill_audit_console_resolution` (4).

**Verification method worth reusing:** ran old and new code against a scratch data root with `MONEYBALL_ROOT` redirected away from live, then byte-compared. `archive_leg.json` md5 `1D0BBC3CB51D5F2256DD64FBEFA640B1` and `legislation_routing_audit.json` md5 `7856A14C0B23BE828DCBF3A90F6C2472` identical across base/new/live. This proves zero rank delta **without** running the live 36-step chain. Kernel 86 passed / 0 FAILED (84 at base).

Review caught a real defect in Fable's own spec: C12 first counted only `Section`, so it called CDFI Fund a zero-archive slot when 18 rows reach it via `BUILTIN_OVERRIDES`. Fixed; the allowlist is now `{'CU Tax Status'}` alone.

Ops gotchas hit: PowerShell 5.1 strips quotes passing JSON to native commands - use `--%`; `Set-Content -Encoding utf8` writes a **BOM** that lands in the commit subject - use `[IO.File]::WriteAllText` with `UTF8Encoding($false)`; Codex's patch utility cannot preserve CRLF (accept mixed endings, git normalizes on commit).

STILL USER-GATED at that point (later cleared by the 2026-07-25 gates below): wiring `cu_bill_directions.json`, re-routing S.J.Res.18/H.J.Res.59/H.R.6955, and everything in Tier 3/4 of the report.

## LEGFIX2 expansion @5619691 (branch `codex/legfix2-20260725`, stacked on 9c2bf41) - NOT merged; 2026-07-25 Meta LOOP

Paul's directive: "expand corrections + collision guards + recompute deltas + averages/success rates line up + integrity audit, flawless." Codex authored everything (edit-only - the sandbox has NO python; Claude executed); 9 revision rounds, independent review (14 findings, 13 accepted), 7-agent verifier fleet, audit_full 141/0. Grok counsel DOWN (402 quota) both passes - Paul said ignore and keep going.

**Errata to the 07-24 report** (full list in `audits/legfix2/LEGISLATIVE_AUDIT_2026-07-24_ERRATA.md`):
- "448 SAFE pairs" was H.R.2891 alone (family=472 vs BASE net, 108 vs production AUG - different UNITS and ARTIFACTS).
- 1,416 weight NOT-REPRODUCED (real 12.59% = 1231.84).
- Efficiency-empty is 91.23% / 8 cats (CU Tax missed).
- "63 (54/6/1)" sums to 61 - HR8398 + HR8413 have BLANK positions (adjudicate before wiring!).
- 296 was LTR-any-role (284 orig-cosponsor; all 297 pass).
- median-1927 is definition-sensitive (1894-1940.5), the floor claim is robust.
- CCM disapproval 0-firings CONFIRMED on-branch (228 corpus-wide literals = context).

**Provenance SOLVED:** Paul hand-drove the congress.gov API browser - ONE query per category sheet pasted across its rows (16 queries recovered from 8,520 hl= params, reconciled exactly); Interchange = 1 atom; CDFI/CU-Tax never configured. Standing guards C13 (query provenance), C14 (S.919 cross-Congress trap + Con.Res-unkeyable + informal-S.R. + vacuous-PASS), C15 (vendor category disagreement 13/112). `bill_directions.with_congress.csv.candidate`: 58 unique + H.J.Res.50 (real dual-bill) + H.R.166 (same bill reintroduced - decay differs) - ADOPTION was USER-GATED.

**Workbook conventions learned (E19, 138/142 identified):** per-role success rates = count-based pct ROUNDED 1DP; generic Success Rate = mean of the sheet's OWN rounded sibling columns; averages rounded 2dp; Blended O/E/F caches DEAD -> `pillar_inputs_snapshot.json` is authority; "Bill Model" in audit = 'Blended Model' col O(15)/E(5)/F(6). NEW inert findings: DP2/EF2 raw-0-vs-normalized-null weights; EK1/EL1/EM1 header drift. OPENS at the time: CU/CW unidentified at one-bill-unit (suspect: hand-tagged CFPB block membership), AV/DX 0.05pp near-miss, E16 1416 unreproduced (CU/CW and AV/DX were then closed 2026-07-25 by dissolution, below).

Ops: Codex MCP threads DIE on glassbox window reopen (Session not found) - a fresh thread + self-contained contract works; evidence packs go STALE when later dispatches touch the generator or add readers of scanned files (E17 scans worktree code - the one non-manifest input, now fingerprinted); scratch-root audits need code-from-`__file__` not `MONEYBALL_ROOT\fec` (fixed in `bill_coverage_audit`).

## Tier-1 wiring DEPLOYED LIVE @71a5fdb, merged @dd60333 (Paul "Run 1-5" + "Approve, execute 2, 3, and 4", 2026-07-25)

ALL FIVE GATES EXECUTED. main == live == dd60333.
- Registry `bill_directions.csv` is now v2: 126 rows (Bill, Congress, Category, Direction, Note), Congress-aware type-key lookup in `build_archive_legislative` (legacy billkey type-collapsing RETIRED for the registry); revert dial `LEGDIR_V1=1` reads `backups/bill_directions.PRE-LEGFIX3.csv` (sha256 b7a1e0f8...) with legacy keying.
- Re-routes live: S.J.Res.18/119 + H.J.Res.59/119 -> CFPB, H.R.6955/119 -> CU Capital Requirements (`bill_overrides.csv`, 8 rows).
- 7 S.919-class quarantines wired NOTHING (S.919 only as the 119th GENIUS instance; S.2704/117, HR2392/119, queue HR4479/HR4763/HR6955/S394 quarantined by the fail-closed title matcher). 47 conflicts resolved keep-earlier. MONITOR + BLANK (HR8398, HR8413) remain UNWIRED - no letter/tracker evidence.
- **CHAIN RECEIPTS (3 live runs):** archive delta exactly as scratch-predicted (162 cells, 54 members, only the 4 re-route categories; 50 bills newly covered 45+/5-; 0 sign flips - adjudications CONFIRM category defaults). Rank delta run1: 11/533 adjacent swaps, attributed 100% to fresh press media-blend (pcts.leg changed for ZERO members; press pcts moved 441 - input-driven, known-benign class). Run2: ranks 0/533, bipartisan settled; run3: ALL SEVEN engine artifacts byte-identical (per_topic_alloc, optimize, dashboard needed the documented bipartisan one-more-shift). audit_full ALL MODULES CLEAN x3.
- **ACU refetch:** `fec/fetch_acu_letters.py` (GraphQL shapes captured live via browser intercept, archived `audits/legfix3/acu_graphql_shapes.md`); snapshot `source_data/acu_letters_snapshot_20260725.json`; corpus BYTE-STABLE vs 07-24 (all multipliers delta +0.00x) -> E18 cached-constant caveat RETIRED.
- Ops: the auto-mode classifier can block codex dispatches + live copies mid-campaign - split commands, retry transient stage-2 errors, STOP for Paul on repeated content blocks (he approved the pins-file route). Codex MCP threads die on window reopen. `bill_directions.csv` / `bill_overrides.csv` are GITIGNORED data-plane: deploy by copy with hash-verified backups, never via git.
- **HR8398/HR8413 closure refinement (2026-07-25):** both are ABSENT from the bills archive entirely - scoring-INERT even if positioned; ACU site search cannot resolve them (quoted queries ignored); closed UNRESOLVABLE-PUBLICLY, revisit only at the next archive refresh.

## legfix4 residue close-out (2026-07-25)

Workbook residues CU/CW + AV/DX CLOSED by dissolution (Legislative Score sheets contain ZERO formulas); CU Tax Status is an honest zero; the congress.gov API has no keyword search. 2026-07-25: Paul gated open the three items the prior session had deliberately left untouched (see `legislative-audit-2026-07-24`).

**CU/CW + AV/DX residues: CLOSED BY DISSOLUTION - the premise was wrong.** A full census of the live workbook proves `Legislative Score - Raw` (85,056 non-empty cells) and `Legislative Score - Normalized` (82,390) contain **ZERO formula cells**. Both are pure VALUE grids; `data_only=False` == `data_only=True` everywhere. There was never a formula to recover, which is why every candidate formula missed. Do NOT reopen this as a formula-recovery problem.
- CU (col 99) / CW (col 101) = **hand-pasted SIGN-ON LETTER units**, not bills, discounted by `CONGRESS_DECAY_FACTOR = 0.8` per Congress back. Every value is an integer combination of {1, 0.8, 0.64}. Confirmed by `fec/add_cutax_block.py` ("paste ALL 7 letters' Sponsor/Original-Co counts ... CFPB Restrain 99/101") and `fec/repair_letter_decay.py`. `leg_evidence_recompute.py` brute-forced BILL-inclusion masks against a LETTER-denominated column - the "within one bill-unit" residual IS that unit mismatch, not a near miss.
- AV/DX Success Rates are stored to ONE decimal place; max representation error = half the last digit = **0.05pp**, exactly the reported residue. Stored precision, not a formula gap. Rounding is not uniformly half-up (16.6 where 1/6 -> 16.7), so the grid is not reproducible from any single rounding rule. Treat as authored-and-stored values.
- Errata correction: these columns are on the **Legislative Score** sheets (160 cols), NOT `Blended Model` (28 cols). The real hand-built Excel formula blocks live on `Sub Layer - Raw/Normalized` (Table1 min-max), `Demographic - Normalized` (Table4), and `Press Release - Normalized` (_xlfn.LET). Those READ the Legislative Score grids.
- NEW: **CV and CX (the "- Average" siblings of CU/CW) are constant zero across all 533 rows on both sheets** - dead columns. Reported, never modified (column membership is Paul's).
- Written up in `audits/legfix4/RESIDUE_CLOSEOUT.md` (append-only beside the legfix2 errata).

**Tier-3 collection: RAN, landed as `.candidate`, wired into nothing.** `fec/fetch_congress_tier3.py` on branch `codex/tier3-collection`. Hard API facts learned:
- congress.gov REST API has **NO keyword-search endpoint**. Paul's original archive came from the congress.gov **website** search UI - that is what the `hl=` params in `DetailLink` are. Title matching is a coverage FLOOR, never a reproduction. Say so in any claim.
- `/summaries/{congress}` is **NOT a bulk corpus** (returns ~11 records for the 119th) - do not build summary-matching on it.
- `/bill/{congress}` LIST items do NOT carry `introducedDate`; the per-bill DETAIL endpoint does, plus `policyArea` and `subjects`.
- Result over 55,040 titles (117/118/119): 6 on-topic Interchange (Credit Card Competition Act, 3 vintages x 2 chambers), 11 on-topic CDFI Fund (previously ZERO rows, never configured), 6 off-topic flagged REVIEW-REQUIRED by policyArea and deliberately NOT dropped.
- **CU Tax Status = 0 is an HONEST ZERO, independently verified**: of 55,040 titles only 21 contain "credit union" and NONE carries a tax term. The empty CU Tax Status sheet likely reflects the legislative record, not a collection gap - the fight lives in letters/hearings/press, not named bills. Consistent with it being a constant-zero category.

**11 press swaps: verified standing, unchanged.** Amo/Krishnamoorthi 175-176, Hoeven/Casten 283-284, Fleischmann/Cotton 360-361, Mast/Deluzio 418-419, Strong/H.Rogers/Tiffany 437-439. Real press-refresh data; the correct action was none.

**Chain receipts 2026-07-25:** kernel 88/88, PIPELINE COMPLETE 14.3 min, ranks **0/533** (md5 byte-identical to baseline), audit **157 passed / 0 FAILED, ALL MODULES CLEAN**.

**OPS HAZARD OBSERVED:** another session ran `run_pipeline.py --from make_member_desk` against the SAME live tree while the audit was reading it (law 5, live). Ranks were safe only because their resume point is after `compute_pillars`. Always re-check `Get-CimInstance Win32_Process -Filter "Name='python.exe'"` for the COMMAND LINE, not just process presence - mtimes newer than your own run are the tell. See `live-tree-branch-state-2026-07-14`.
