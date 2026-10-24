---
type: fleeting
title: "Primacy board factor only (2026-07-29)"
aliases: ["primacy-board-factor-only-2026-07-29"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[2026-07-feature-primacy-and-industry-tier-boards]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/primacy-board-factor-only-2026-07-29.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\primacy-board-factor-only-2026-07-29.md", sha256: "b241383361befeebdc5ecb251d5c4ae85e64bb93bffc7afc80a032dbda62b18f"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Primacy board factor only (2026-07-29)

> Primacy tier board scores on the beneficiary factor ALONE (2026-07-29, @89b6219); purity-over-volume is Paul's INTENT, never re-flag it as a defect

## Content

The Moneyball **primacy tier board** (Tier 1/2/3 = 13/24/48, `fec/tier_util.py`
`primacy_scores()`) scores on the **shrunk beneficiary-primacy factor ALONE**.
The Legislative percentile no longer multiplies it. Shipped and committed
2026-07-29 @89b6219 — which was also the **first time the primacy board was ever
committed**; it had been running production from uncommitted working-tree state.

**Paul's ratification, verbatim:** *"we want people who are PURE in credit unions
not spread thin."* The factor is a RATIO (numerator/denominator), so it is
volume-blind BY DESIGN. **This is intent, not a bug — do NOT re-flag it.** I
raised it three times (Kim/Huizenga penalized for bank/crypto breadth; Barr at
slot 41 on the chamber's largest portfolio of 36.75 credits; Tier 3 full of 1–4
credit members) and recommended against factor-only twice. Paul overrode both
times. Settled.

**Consequences accepted with the directive — also not bugs:**
- The grievance/delivery **conduct ladder is INERT**. Nobody scores high enough
  for a ceiling to bite (it previously held Barr 18→38, Rose 38→37), so a
  grievance cure now earns nothing back. Its `(9.0, 6.0, 3.0)` thresholds were
  calibrated against the old score scale.
- The 2026-07-29 five-member adjudication no longer seats two of five in Tier 1
  (**Huizenga → 18, Kim → 14**). All five keep their +1.0 `cu_primary` credit in
  the factor math; only seating changed. Tests/audit re-pinned to the new seats
  EXACTLY, never relaxed.

**EVIDENCE FLOOR added same day @cae6c58** — Paul ratified my "purity ranks,
evidence qualifies" design ("Lets go with this, conduct as you most see
optimal"): `PRIMACY_MIN_CUPRIM=0.75` cu_primary role-credit required to OCCUPY
a tier seat; ranking among the qualified stays pure factor. 14 thin-evidence
members dropped (Magaziner 86, Maloy 88), T1 untouched, McClain/Smith/Foster
seated. It is an ELIGIBILITY gate, never a volume score term. Placements are
exempt; absent factors file stands the gate DOWN (fail-open); gate is
factor-mode only. Chain receipts: kernel 89/0, audit 192/2 (same 2
pre-existing), rank delta 0/533 with all four pillars byte-stable.

**UNCERTAINTY PENALTY added same day @99739ec** — Paul's own insight (thin-sample
estimates "should be taken into account within the formula", rejecting my
per-member ledger fix). Board ranks on `factor_ranked = factor_shrunk −
K·(1−λ)·|factor_raw − baseline|`, **K=0.25** (`PRIMACY_UNCERT_K`). λ=1 members
untouched; thin estimates can't outrank measurements at a boundary. Chosen over
raising `PRIMACY_SHRINK` (that dilutes certainty instead of discounting
uncertainty). **K=0.25 not higher BECAUSE Paul's binding constraint is "Vargas
needs to be in"** — pinned in 3 places (audit check, receipt gate, exact test).
Effect: Kim 14→13 T1 on her OWN measurement (no ledger re-size), Rounds 13→15
(organic path back as credits accrue), Huizenga stays 16 (structural bank/crypto
ballast ≠ noise), Nunn 191→73 T3, Magaziner 86→290. Receipts: kernel 89/0, audit
194/2, rank delta 0/533.

**AMENDMENTS = 0.5 MEASURE WEIGHT @68f1fbe** — Paul found it by asking how the
dashboard covers amendments. `AMENDMENT_MEASURE_WEIGHT=0.5` was ALREADY law
(`legislation_measure_key.py`; the shadow ranker RAISES if violated) but the desk
bundle carries **no measure type** and `primacy_factors` read only `role`, so all
173 amendments arrived as `role='sponsor'` at full 1.0 — a one-line floor
amendment counted as much as a whole bill. Weight multiplies the ROLE term
(half an act in numerator AND denominator); applying it to the act weight
instead rewards off-topic amendments (priced: Mike Lee +185). Bridge lives in
`legislation_measure_key.display_measure_weight` — ONE definition, fails OPEN to
bill weight, audit asserts no amendment-shaped id escapes. Effect: baseline
0.5075→0.5126, Kim →T2/14, Crapo →T1/13, Vargas holds T1/12. Revert
`PRIMACY_AMENDMENT_W=1.0`. Receipts: kernel 89/0, audit **200/0 ALL CLEAN**,
verifier 38/0, rank delta 0/533.

**The four layers are now distinct — don't conflate:** measure weight governs
ACT SIZE, evidence floor governs QUALIFICATION, shrinkage governs ESTIMATION,
uncertainty penalty governs RANKING.

**Revert dials:** `PRIMACY_BOARD=legxfactor` restores the entire pre-directive
board exactly, floor and penalty included (verified all 533: Waters 101, Nunn 45,
Barr 38, Kim 11). `PRIMACY_MIN_CUPRIM=0` disables the gate; `PRIMACY_UNCERT_K=0`
disables the penalty. No git revert.

**WHY factor-only:** `Leg%` = 0.7·agenda-percentile + 0.3·legislative-efficiency,
and that efficiency term is **unreconstructible**. 203 of 533 members hold
all-zero success rates in BOTH Legislative Score sheets and must tie in any
success-rate measure, yet the workbook spreads them across 151 distinct values —
and **113 zero-data members outscored Maxine Waters, who has real data**. Proven
NOT a stale snapshot: `pillar_inputs_snapshot.json` and the cache-alive
2026-07-28 backup demand byte-identical efficiency vectors.

**HOW TO APPLY:** treat the board as purity-scored. Never propose re-adding a
volume/throughput term, re-tuning shrinkage to favor high-credit members, or
"fixing" the ratio — all were considered and rejected. Below ~slot 13 the band is
0.052 wide on a 0.5075 baseline, so read Tier 2/3 as SETS, not rankings.

**OPEN, deliberately untouched (both feed the four-pillar rank, not the board):**
- `Blended Model!G` provenance — what the efficiency term actually measures is
  unknown; it still feeds the reporting rank.
- **`press%` goes NEGATIVE for 135 of 533** (Durbin −0.743, Warren −0.396). It is
  `pillar/max`, not a percentile, in a 25%-weight pillar where leg/inf/dem are
  bounded [0,1].
- Committee scores look inverted for a CU model: Markey 5.55 (Commerce, Small
  Business) > Waters 4.50 (Financial Services Ranking) > Barr 3.85.

Two audit failures were PRE-EXISTING and unrelated: 4 departed members (Mooney,
Perlmutter, Rubio, Burgess) in the legislation archive, and culling stuck at
`phase=staged`. Receipts: kernel 89/0, audit 190/2, rank delta 239/533 fully
attributed to `build_media_blend` (only `pcts[press]` moved; leg/inf/dem all 0).

**CULLING PROMOTION ENACTED 2026-08-03** (live tree, branch
`claude/cfpb-sentiment-recorrection`) via `promote_greenlit_primacy_integration.py
--greenlight GREENLIGHT_INTEGRATION`. `legislation_culling_status.json` now reads
`status=PASS_PRODUCTION_CULLING_INTEGRATED`, `phase=production`. Kernel 89/0
unchanged. The `phase=staged` failure above is CLOSED.

**REGENERATION DELIBERATELY DEFERRED — still open as of 2026-08-03.** Audit sits
at **198/2**, the two FAILs being stale derived artifacts ('desk pillar bars match
rank authority', 'workbook stance column exactly matches shared crown law'). The
promotion installed a new workbook + `ranks_python.json`, but
`member_desk_bundle.json` / `cu-member-desk.html` / `dashboard_data.json` were
built pre-promotion. Fix per the promotion receipt: `build_primacy_surfaces.py`,
then tests + audit (expect 200/0, 89/0).

**WHY it was not run — the load-bearing lesson:** `build_primacy_surfaces.py` is a
**DEPLOYMENT action, not a cleanup step**. It runs `make_member_desk.py` TWICE
(engine-inputs + surfaces) plus `make_dashboard_html.py`, and every step imports
`moneyball_core` — so it ships whatever the working tree currently holds into the
33 MB public surfaces. On 2026-08-03 the live tree held TWO un-gated lanes
(coalition-builder: `moneyball_core`/`budget_frontier`/`flip_model`/`lt_priming`/
`per_topic_coalition`/`run_pipeline` + new `coalition_pricing.py`,
`cosponsor_selectivity.py`; and a desk redesign: `make_member_desk.py` + both
`.tpl`s, one written 3 min before the check). **Always check `git status` AND
producer mtimes before running it, not just for a quiet python process.**

**TRAP — promoted files carry SOURCE mtimes.** The promoter copies with `copy2`,
so `ranks_python.json`, `tier_overrides.json` and the workbook show **7/29**
timestamps after an 8/03 promotion. That looks like the promotion skipped them.
It did not — check `legislation_culling_status.json` and the backup dir name
(`backups\pre-greenlight-primacy-<UTC>\`) for the real promotion time.

**tier_overrides.json `_README` REGRESSED by the promotion — awaiting Paul.**
`weights` / `placements` / `_conduct_mirror` verified byte-identical, but the
promoted `_README` is an OLDER revision that DROPS the amendment-weight clause
documented above. Worse than a gap: its surviving clause still asserts *"seated
Young Kim in Tier 1 (slot 13)"*, which the amendment fix superseded — live
`primacy_factors.json` confirms `roster_baseline=0.512613`,
`amendment_measure_weight=0.5`, and `factor_ranked` Vargas .587197 > Crapo .582896
> Kim .581250. So the file misdocuments the shipped board. No dial or seat moved.
Intact text preserved at
`backups\pre-greenlight-primacy-20260803T171109Z\tier_overrides.json`. Both
revisions share a pre-existing wart: the opening says "SIX deliberate things"
while listing nine.

Related: `ask-before-substantive-changes`, `legislative-audit-2026-07-24`,
`bill-coverage-and-media-stance-2026-07-19`, `moneyball-model-config`

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): factor only;volume-blindness=INTENT

## Possible Connections

- [[2026-07-feature-primacy-and-industry-tier-boards]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `primacy-board-factor-only-2026-07-29.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-07-feature-primacy-and-industry-tier-boards]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
