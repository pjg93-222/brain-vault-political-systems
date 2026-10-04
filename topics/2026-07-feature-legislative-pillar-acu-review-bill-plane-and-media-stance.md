---
type: topic
title: "Corpus census, bill-plane audit and press media-stance display (Legislative pillar and ACU review)"
aliases: ["Legislative pillar and ACU review: Corpus census, bill-plane audit and press media-stance display"]
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

# Corpus census, bill-plane audit and press media-stance display (Legislative pillar and ACU review)

> The 2026-07-10 corpus census and the bill-plane audit and press media-stance display from 2026-07-19 on, through the crown and money rulings, tier weights and Codex-lane hardening. Part of [[2026-07-feature-legislative-pillar-acu-review]] (project [[melange-systems]]).

## Corpus coverage census (2026-07-10)

Answered "did we miss anything in congressional archive / floor transcripts / CNN?" - read-only query of `social_media.db` `speeches` table (2026-07-10). Feeds Melange data-collection lanes too.
- **FLOOR SPEECHES ARE NOT A GAP - fully backfilled.** `speeches` table = **259,569 rows, 2003-01-02 -> 2026-07-05, zero missing dates** (current to 5 days). By source: **INTERVIEW 142,064 (55%)**, **CREC (floor speeches) 104,632 (40%; House 63,550 + Senate 41,082)**, **CHRG 12,873 (5%)**. The collector `fetch_congressional_record.py` default `--since 2025-07-01` is only the INCREMENTAL floor - deep backfill already ran. The corpus is **interview-dominant** (good per the literature: spontaneous dialogic speech > staffed floor text). Pinned expectation `'speeches': 234827` (`b5_a_matrix.py:31`) is stale-low; actual grows with collection. posts=29,098 (matches pin).
- **Deliberate floor exclusions = CORRECT, not misses:** Extensions of Remarks (PgE) excluded (written inserts, never spoken); CHRG hearings are **finance-scoped only** (banking/CU/housing/securities/CFPB) - right for the CU model but a boundary if cross-committee behavioral signal is ever wanted.
- **Broadcast family is ~10 legs (under-listed before), all in `fetch_interviews.py` under `collector_supervisor.py` (relaunches every 10 min):** CNN, MTP, CBS (Face the Nation), ABC (This Week), PBS, NPR (4 programs), NPR podcast (1A/H&N - DEAD, see `psych-audit-2026-07-09`), Fox, Hugh Hewitt (~2005 -> present radio), MS NOW. All resumable via `iv_fetch_log`. **Fox ceiling sharpened: code says posting STOPPED ~2024-10** (archive back ~2018; volume already collapsed by 2023); post-2024-10 needs YouTube-caption diarization (doesn't exist). CNN fully walked + `cnn-deep` backfills below 2024-06 to CNN's own ~2023-05 publishing floor.
- **Congressional archive (legislative) = the real soft spots:** the bills archive is a **manual Excel export** (`congress_bills_archive_*.xlsx`, last 2026-06-24, ~2 weeks stale, no auto-refresh) - the softest link; votes = Voteview HS117-119 via `_get_votes.py` + **manual** `_finalize_drops.py` clean (raw re-downloadable; the CLEANED cu_rollcall is the severed/fragile artifact per `audit-network-vote-cycle-2026-07-08` - do not reverse that); Congress 120 uncollected (rollover, seats 2027-01-03, `skills-library-2026-07-10` rollover campaign).
- **Actionable misses ranked:** (1) C-SPAN Washington Journal - robots-blocked, needs UMN licensing, highest value (rank-and-file for the n>=250 gate); (2) CSIS + AEI - GO but unbuilt; (3) bills-archive auto-refresh; (4) Fox post-2024-10 diarization; (5) Congress 120. **Governing literature point: all of these buy member COVERAGE, not trait ACCURACY - none lifts the ~.42-.52 shared-method text-personality ceiling; the only outcome-changing target is pushing reactivity coverage past the 250 power gate (216 today).** See `psych-audit-2026-07-09`, `dispositions-dependability-2026-07-09`.


## Bill-plane audit and press media-stance display (2026-07-19 onward)

Paul's 2026-07-19 "/codex" check-in (bill coverage + press/social grading). Codex MCP dropped the dispatch twice; he said "most optimal path, this keeps happening" - so the work was done directly. Part 1 was read-only analysis, which the codex-executor skill excludes anyway ([[codex-executor]]). All work on `claude/bill-coverage-data-audit-48e69e`, initially UNCOMMITTED. Interview/hearing stance grading itself belongs to CU stance and sentiment scoring.

### Bill coverage: CLEAN, nothing orphaned

New `fec/bill_coverage_audit.py` (read-only, import-safe, `__main__`-guarded, ast-parses moneyball_core rather than importing it). Result: **7 pass / 0 FAIL / 5 WARN**.
- 11,283 source rows -> 11,283 ledger rows; `unknown-section = 0`; all 18 slots present; no `bill_key` collisions; 19 blocks -> 18 slots; dedup never kept a weaker role.
- WARNs all explained: 2 non-voting delegates (Plaskett/Moylan); 17 members with zero bill evidence (16 genuinely absent, **James Clyburn's 4 rows are all user-excluded bills** - correct zero); 1 "dead" config row (H.R.1181, a deliberate manual rescue).
- **The "data and privacy" answer**: the over-exclusion hypothesis was WRONG - all 580 exclusion rows (19 distinct bills) matched on TITLE, zero summary-only. The real finding is concentration: **14 of 19 excluded bills would have been Data Privacy & Cyber**. Upstream Quorum uses that section as a catch-all for consumer-privacy bills.
- Slot contents caveat: 68% of the Data Privacy slot's 377 scored events are one bill family (Homebuyers Privacy Protection Act x 4 congresses = trigger-leads).
- **Bills are multi-slot by design**: 103 of 446 scored bills sit in >1 category (max 5); the dedup key includes category, so a member gets credit in each. Not a bug.
- 5 bills carry truncated titles from the archive export (`H.R.4052`="2023"; S.919/S.2290/S.1494="21").
- Added 4 standing checks to `audit_full.py` (orphan slot, 18-category set, unmatched-member set, bill_key collision). Audit went 129 -> **133 passed, 0 FAILED**.

### Press and social: graded all along, just never displayed

Interviews (37 rows / 25 members, all gold) and hearings (775 rows / 72 members) were already stance-graded and already carried a ~500-char `cu_passages.py` window - and both already feed the press pillar. The desk showed none of it. Built the display behind **`DESK_MEDIA_STANCE`** (default 1, `=0` = exact revert, proven identical modulo `generated_at`/fingerprint). 407 graded rows now render across 91 members.

Three things that only surfaced by building it:
- **`hearing_antag` is NOT every speaker** - it is the antagonism pass. A committee chair (Crapo, Senate Banking 2019) speaks, is graded, and owns no antag row. 191 of 372 graded hearing keys had no footprint row; they are now emitted from the CU side.
- **The CU CSVs are row-aligned 1:1** with their stance CSVs (bioguide+member+date+categories agree on every row). So each passage pairs with ITS OWN grade. An earlier date-aggregating version synthesized `mixed`/`multi` labels that **do not exist in Paul's vocabulary** - caught in adversarial review, removed. Never aggregate stance across a date.
- Passages carry no package column; a 60-char text probe pins the package (775/775 hearing, 36/37 interview).

### Ops lessons (the expensive ones)

1. **`make_member_desk.py` can FAIL and still leave outputs behind.** It wrote `dashboard_exclusion_reconciliation.json` then raised, so the bundle/HTML stayed STALE from an earlier run. A stale artifact was read and numbers three builds old were "verified". **Always check the exit code; never trust an output file's contents without checking its mtime.**
2. **`dashboard_integrity.postflight` is fail-closed and reconciles every display row to a declared source** (`source_rows == sum(components)`), and it fingerprints the desk dials. Adding display rows trips `IntegrityError` unless you declare the new source; adding a dial trips the same-input determinism check unless you add it to the fingerprint. This guard is good - it caught a real accounting gap.
3. **The LIVE tree was edited by mistake** (it is a worktree on *another* session's branch, `claude/cfpb-sentiment-recorrection`). Verified the diff was a pure insertion before reverting. Confirms `live-tree-branch-state-2026-07-14`: always target the worktree path explicitly, and `MONEYBALL_ROOT=<live>` + `DESK_OUT=<scratch>` is the safe combo (worktrees DO isolate data - `codex-executor-lane-2026-07-18` is right, change-control law 7 is stale).

### SHIPPED (Paul said "Commit, and regenerate", then approved the merge)

3 commits, **MERGED to main @ca1585a**, live tree fast-forwarded to match (it was on `claude/cfpb-sentiment-recorrection` @50da219 == main, no divergence). Live desk + `Moneyball.html` regenerated. Merge debt zero.

Two more lessons from the regeneration itself:
4. **Regenerating live from WORKTREE code trips `dashboard_integrity` - correctly.** The fingerprint hashes `fec/make_member_desk.py` **as it exists in the live tree**, so running worktree code against live data means "declared inputs unchanged, output changed" -> `IntegrityError: same dashboard inputs produced a different semantic bundle`. It also leaves a landmine: the state file then maps live's OLD code to the new bundle, so the next chain run from live's own code fails too. **The code must be IN the live tree before regenerating it.** Merge first, then regenerate - the fingerprint changes honestly and the guard self-heals.
5. **`make_combined.py` does NOT check whether the desk build succeeded.** When the desk raised, `make_combined` cheerfully rebuilt `Moneyball.html` from the STALE desk HTML. Check the desk exit code before running it (same failure family as lesson 1).

Also caught in self-review after the first live regeneration: the index kept the LONGEST passage per package, which put *"This hearing is adjourned. [Whereupon...] [Prepared statements...]"* on Crapo's desk. `cu_passages` emits ~500-char windows and merges overlaps, so the longest passage is a merged blob - for a **chair** it is the transcript appendix absorbed into their final turn - and since the template clips to 400 chars, longest-wins showed the opening of the least representative passage. Now keeps the FIRST passage (earliest CU mention). Keyword-count and boilerplate-exclusion were both tried and measured worse.

**That appendix finding is now CLOSED - measured, immaterial** (@33b07a9). It had been flagged as "worth a look"; measuring says otherwise, and it was over-escalated. 27 of 775 graded hearing passages (3.5%) are appendix/QFR rather than speech, but only **5 of the 263 GOLD rows** - and gold is the only tier `build_media_blend.py` feeds into the pillar (`CU_HEARING_CHANNEL` is gold-only). 4 of the 5 change no outcome (the member's clean gold rows already agree); the 5th (Houchin) is a tie-break on a 1/1/1 split. The gold labels are Paul's own adjudications - law 1, not relabelled. Root cause (`cu_passages` merging overlapping windows so a chair's last turn absorbs the appendix) is NOT fixed: that would change extraction -> grading -> pillar -> ranks, i.e. a user-gated scoring change. Instead bounded with an audit_full tripwire (fails above 10 contaminated gold rows) so it cannot grow silently. Audit -> **134**.

Final verification (against live, post-merge): kernel 75/75, FULL-BODY AUDIT 133/133 ALL MODULES CLEAN, all 6 integrity reconciliations pass, coverage audit 7/0/5, **ranks md5 UNCHANGED** (`80fa70d5…` - chain never run, display-only), zero JS errors in the combined dashboard.

### Crown = Ally floor in the money math (@46df1de)

Paul: "if they are listed as champion, I think they should be promoted to ally in the math". His ruling SUPERSEDES @1856feb's immunity choice: the Leg+Press Tier-1 crown is a DISPLAY honor, so immunity overstates it - a crowned member enters the money math at the top of the EARNED ladder ('Ally') and stays MOVABLE. 6 of 12 promoted (Hagerty, Fitzpatrick, Hill, Britt, Williams, Emmer - all base Highly Persuadable); the other 6 were already Ally; 521 uncrowned untouched. Built as a genuine FLOOR (more-pro of {base, Ally} by ORDER index), not an assignment, so a future band change cannot silently demote someone whose base exceeds Ally - today equivalent since `overall_tier`'s ceiling IS Ally. Applied in **OV, not `defection()`**, because THREE sites gate on the label (`optimize.py:36`, `optimize.py:117`, `scenario.py:88`) and patching only `defection()` would desync them. Accepted: no member reads 'Champion' in the money math, so **Opponent is the only immune rung**, and all 12 are conversion candidates again. SPECIFIED divergence from col G (still shows Champion) - guarded by 3 checks incl. one that FAILS on an empty crowned list. Audit -> **141**.

### The money-defection mechanic is DORMANT in production - measured, and it is BY DESIGN

The decisive context for the defection commits: **0 of 378 allocated members cross DTHRESH=11.25** in the live optimizer. Largest single allocation is **$9,500** (Murkowski) -> lean **+3.11**, about a quarter of the threshold; $2.5M spread over 378 members averages ~$6.6k each. So `defection()` never fires in `optimize.py` at production budget - which is why `optimize_result.json` came back **byte-identical after BOTH** @1856feb and @46df1de. This is DOCUMENTED INTENT, not a defect: `money_response.py:29` says "only large scenario-level shocks convert", and MAXSHIFT was calibrated 40 -> 18 precisely because money buys access, not votes (Ansolabehere; Fowler-Garro-Spenkuch). **Consequence for future sessions: all three of that day's defection commits are correctness-only for the chain; the mechanic's real surface is `scenario.py` (NOT a chain step - interactive, arbitrary `--money`). Before claiming a money-engine change moves production numbers, check whether DTHRESH is reachable at the $2.5M budget - it is not.**

### Champion money-immunity restored (@1856feb) - superseded by the crown = Ally floor above

Paul: "Yeah fix it" after "go to an area you haven't given attention to". A logic check of the money/scenario engines found a REAL defect merged that same day. The gallant-gates merge swapped `money_response.OV` from col G to `MC.overall_tier(...)`, whose own docstring says **"Champion is deliberately absent; see overall_display_tier"**. Col G is written by `sync_stance_g.py:20-21` WITH the Tier-1 crown, so the replacement was not equivalent: all 12 Champions read as Ally/Highly Persuadable, and since `COMMITTED={'Champion','Opponent'}` exists so terminal rungs cannot be bought away, **all 12 silently lost money-defection immunity** ($500k competitor shock defected Fitzpatrick).

**Why nothing caught it: the existing immunity check INJECTS `OV[probe]='Opponent'`** - it passes regardless of whether real members reach that rung, and there was no Champion equivalent. Half of COMMITTED guarded, the half that broke unguarded. *A guard that tests the mechanism with synthetic input proves nothing about whether real data reaches it.*

Fix: money_response now uses sync_stance_g's exact recipe (`legislative_press_tiers(list(MAT))` + `overall_display_tier`), so engine and col G cannot diverge; missing-member default 'Neutral' -> none (a missing stance is not a neutral one - '-' no-position ontology; latent, 0/533 missing); + 2 audit checks - a REAL Champion-immunity check that FAILS on an empty Champion list, and an `OV[m] == overall_display_tier(...)` equivalence assertion. Audit -> **140**.

**The impact was OVERSTATED and the claim must not be repeated.** It was said the optimizer was being shown phantom conversion value. Measured after the fix: `optimize_result.json` is **BYTE-IDENTICAL**, because the optimizer allocates at most **$10k** to any Champion (Britt; lean +0.52) against `DTHRESH=11.25` - never within ~20x of crossing. The $500k used was the probe amount, not an allocation the model makes. Live pipeline impact was **ZERO**; ranks 0/533. The real exposure is **`scenario.py`** - NOT a chain step, an interactive what-if runner taking arbitrary `--money` amounts - where a modeled large shock would have wrongly defected a Champion. So: correctness/robustness fix, not a numbers fix. **Demonstrating reachability with a probe value is not evidence of live impact - check the actual operating regime before claiming distortion.**

### Tier weights 80/20 -> 84/16, all pins retired (@0efaa06)

Paul: "0.84/0.16 works, do it". He asked what 95/5 would do, CONDITIONAL on Fitzpatrick reaching Tier 1 AND Tim Scott staying. **The condition FAILED** - at 95/5 Fitzpatrick reaches T1 (slot 5, pure math) but **Scott falls to slot 26**, so nothing was changed on that. 95/5 nearly annihilates the press pillar and turns the tier into a cosponsorship count: it ejects every press-strong member (French Hill .862, Britt .653, Daines .474, Scott .429) and admits near-zero-press ones - including **Eleanor Norton (press .000), the DC delegate who cannot vote on the floor**, into the Champion ranks. A sweep of 0.50-0.99 found **only 0.83/0.84/0.85 satisfy both**; Paul chose 0.84. (These are the Tier-1 Leg/Press blend weights, not the pillar weights; for the three pillar-weight sets see Context. in [[2026-07-feature-legislative-pillar-acu-review]])

At 0.84/0.16 the whole manual apparatus becomes unnecessary and is GONE: Fitzpatrick's `position: 5` pin, his forced T1 placement, and Wagner's forced T2 demotion (that demotion was load-bearing at 80/20 - keeping it would now shove the math's No. 7 into T2). `load_tier_positions()` == {} - **zero pins repo-wide**, so Tier 1's within-bucket order is a true ranking again. Tier 1 is now identical with or without placements applied: 1 Barr, 2 Meuser, 3 Hill, 4 Williams, 5 Timmons, 6 Britt, 7 Wagner, 8 Kim, 9 Hagerty, 10 Fitzpatrick, 11 Scott, 12 Emmer. Only Daines dropped.

**The calibration guard fired correctly** - audit_full hard-pins ratified tier weights AND the exact placement list, so the first chain run failed 2 checks (Wagner was the single failing element). Re-pointed, not weakened, + 2 NEW checks: zero-pins, and "0.84/0.16 keeps Fitzpatrick and Scott both in T1" (the thing 95/5 would have broken). Audit 136 -> **138**.

**Rank delta RESOLVED as two-run convergence.** Run 1: 441 scores drifted ~1e-7 and ONE effectively-tied pair flipped (Jayapal/Fischbach, separated by 1.5e-07, at 163/164). Run 2: **0 ranks, 0 scores moved - a perfect fixed point**, confirming the `bipartisan.json` feedback edge, not a defect. Net vs the morning baseline: 2 members, that tied pair. Chain 9.1 min, ALL MODULES CLEAN. Also consumed the pre-documented money-plane delta from `dae256d`.

**Codex-lane limit found: its sandbox has NO python**, so it cannot compile-check its own work - it returned IndentationError twice (indented block emitted at column 0). Claude must py_compile every returned diff; a whitespace-only repair is faster done in review than via a third round-trip.

### Merge debt CLEARED + TODO.md ledger (@4d87fee)

Paul: "Merge, and do create todo list document". All three stranded lanes merged; **zero branches ahead of main** for the first time since tracking began. Resolutions that mattered: (1) data-collection lane's `fetch_hearings_antag.py` **v2 kept over main's v1** - v2 implements Paul's verbatim role-scope refinement AND the live DB's hearing_antag2 table was collected by v2, so main's v1 code was the stranded half; (2) cspan lane's loader+scraper were **superseded by main's 07-14 repair** (@d66da46) - kept main's, the lane contributes README + retires its cherry debt; (3) gallant-gates prereg ledger (MISS results, armed FROZEN preregs - looks NOT consumed by merging) + audio TDD now on main where the look-gates can grep committed text; its superseded pre-band-ladder test hunks resolved to HEAD's v6-ladder versions. Kernel 75 -> **84**, audit -> **136**, ranks UNCHANGED. Also: `git merge-tree` 3-arg probe said "0 conflicts" for branches that DID conflict - do not trust it, just merge and look. **TODO.md now at repo root** = the open-items ledger (owner + receipt + unblock per item; closed items move to its Closed section, never deleted).

### Doc-rot sweep @b706ec7 (Codex, 2 rounds) - the doc plane was lying about itself

**Change-control law 7 was FALSE and had metastasized.** It said "worktrees do NOT isolate data ... anything run in a worktree mutates real artifacts" - backwards, and copied into 6 skills plus commit 10a5f97. Truth (`fec/paths.py:7-8`): ROOT = parent of the paths.py ACTUALLY IMPORTED unless MONEYBALL_ROOT overrides, so a worktree run targets that worktree's EMPTY data plane. Corrected everywhere, caution preserved. (Note the 2026-07-19 Codex rule amendment in [[codex-executor]] records that `fec/paths.py` resolves ROOT to the live tree for Codex pipeline runs; both statements come from the sources as recorded.)

**Two verification recipes that CONFIRMED THE WRONG ANSWER** - the worst rot species, since running them "proves" the stale claim: (1) debugging-playbook:312 "audit_full always exits 0 ... expect NO hits" - it HAS `sys.exit(1)` at :1201. Had to be SPLIT not blanket-fixed: `audit.py`/`audit_frontier.py` genuinely still have zero.
(2) run-and-operate's collectors-during-chain answer rested on "no chain script opens social_media.db (zero hits)" - **three do** (entries 6/27/34). The answer is still YES but on WAL reader semantics. **Caught only because the claim was re-tested after Codex renumbered it** - renumbering alone would have laundered a false statement under a fresh date.

**The transferable lesson:** when updating a doc, verify the CLAIM, not just the NUMBER attached to it. Asked to self-audit for exactly that, Codex found 8 more and correctly RESTORED an older date on one it could not verify rather than stamping today's on it. Counts 37 -> 84 / 69 -> 136; chain "17 steps @19-35" -> **36 entries @25-67**.

### Codex-lane hardening batch @565136c (Paul: "keep going, work through codex, optimize")

**First fully-clean Codex round trip** after the morning's Connection-closed failures (thread 019f7cbd, one revision round). Ships the ops lessons as mechanisms: (A) `make_combined.py` now REFUSES a stale desk HTML (reconciliation mtime > HTML mtime+5s = the failed-postflight signature; bypass `COMBINED_STALE_OK=1`; success path proven byte-identical on live); (B) `interview_stance_stack.py` docstring corrected (the channel is default-ON, not "gated OFF, default 0"); (C) audit check 135: `archive_leg.json >= 516` members floor; (D) dial catalog gained section 1.8 (desk dials were entirely undocumented) and change-control's `--from` trap note corrected - **that trap is FIXED in code** (`start_index`, `run_pipeline.py:145-154`, rejects unknown/ambiguous prefixes loudly), the skill was stale. main == live @565136c, ranks unchanged all session.
