---
type: topic
title: "ChatGPT lane landing and the Sub Layer surgery (07-16/17) (Influence engine internals)"
aliases: ["Influence engine internals: ChatGPT lane landing and the Sub Layer surgery (07-16/17)"]
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
part_of: "[[2026-07-feature-influence-engine-internals]]"
---

# ChatGPT lane landing and the Sub Layer surgery (07-16/17) (Influence engine internals)

> The ChatGPT laundry-list lane landing of 2026-07-16 and the Sub Layer off-by-one surgery of 2026-07-16/17, as recorded for the influence engine. Part of [[2026-07-feature-influence-engine-internals]] (project [[melange-systems]]).

## 2026-07-16: ChatGPT (laundry-list) lane landed (source `chatgpt-lane-landed-2026-07-16`)

- Paul ("finish it for ChatGPT" + "Do it", 2026-07-16 late evening): the laundry-list lane's uncommitted 54-file implementation (worktree `moneyball-tier-option-b0ff84`) was captured @391a4a8 on `claude/laundry-list-updates-a832c2` and merged to the live branch `claude/cfpb-sentiment-recorrection` @e58a807 (+9d563c9 audit-contract extension; chain 391a4a8, e58a807, 9d563c9 on the cfpb branch).
- Content: speech/hearing/interview stance channels DEFAULT-ON feeding the Press side (revert dials `CU_SPEECH_CHANNEL` / `CU_HEARING_CHANNEL` / `CU_INTERVIEW_CHANNEL` = 0; hearings gold-only; bluesky single-counted via Social), shared `fec/own_source_stance_model.py` reader stack, 80/20 display-tier policy in source-controlled `tier_overrides.json`, **Champion crown law = exactly the 12 Tier-1 members**, their RUN1-5 completion reports + `HANDOFF_LAUNDRY_LIST` committed at the repo root.
- **Paul's ratified 17-placement tier contract** (`tier_overrides.json` + machine-enforced in `audit_full`): forced T1 = Barr, Young Kim, Roger Williams, Tim Scott (answers RUN5's open roster question), Fitzpatrick, Torres, Hagerty, Cortez Masto, Timmons, Nunn; forced T2 = Waters, Vargas, Velazquez, French Hill, Crapo, Scott Fitzgerald, Tim Moore. Landed tier: **Barr #1**, Meuser #2 + Ricketts #6 organic, 10/10 of Paul's list in T1. (Tier boards: Primacy and industry tier boards.)
- Landing verification: kernel 72/72 (their expanded suite), full chain all-OK (about 16 min), **ranks 0/533 moved vs pre-landing** (display/tier/crown rework is rank-neutral as designed), audit **125 passed 0 FAILED ALL MODULES CLEAN**, Scott's 6 corrected cards hold, media footprint intact (desk 27.1MB). Union ledger: 55 tweet corrections (their 53 + my 2 Scott). Their stale 13:3x live-tree partial copies preserved in git stash ("stale partial copies (superseded by 391a4a8)"); the old own_source copy renamed `.stale-1336`. One merge conflict total (tweet ledger, union-resolved).
- OPEN after landing: the unadjudicated deep legislative-input drift (the COM recalc refreshed `pillar_inputs_snapshot` at 20:12; the `press-fix-incidents-2026-07-16` 522-move; ranks now stable on that refreshed basis and Paul's tier is pin-protected, but the old-vs-new leg basis question was never formally adjudicated); the fec-rank-integrity audit Workflow (`wf_73d7c183-627`) running at memory-write time; CCM's exact #8 position emerges only from channel evidence, currently #12 by score within T1 (membership pinned).
- **UPDATE 2026-07-17 morning: main FAST-FORWARDED e3d2923 to 7aa36d1 by Paul; merge debt zero; the live tree stays checked out on the cfpb branch (== main).** Later same-day commits (ebbee29 / 7853b56 / 9aa9677) continued and merged on that lineage; see `legislative-letters-2026-07-17` for the end state (main == live @9aa9677).

## 2026-07-16/17: Sub Layer off-by-one surgery (source `sublayer-surgery-2026-07-17`)

- **Root cause of "ranks out of sorts" (2026-07-16/17):** the 07-15 Legislative-Normalized own-row repair shifted that sheet's member rows up one; every `Sub Layer - Raw` efficiency formula (AG:AW) kept pointing one row low, so EVERY member's legislative efficiency was computed from their alphabetical neighbor's record. Invisible while Excel caches stayed stale (`compute_pillars` served `pillar_inputs_snapshot`); materialized by the first COM CalculateFull (2026-07-16 20:10, the 522-move). Two additional slot bugs: AH numerator used Q (Sponsor Success) instead of P (CU-Cap Success Rate), AI used col AI instead of X (NCUA Success Rate) in 532/533 rows; each formula's own Table1 minmax basis named the correct column (the repair anchor; majority-vote canon would have locked in the bug).
- Fix @c6dc6b2 (cfpb branch): `fec/repair_sublayer_references.py` (--plan / --apply; plan = full 9,061-cell audit; apply = backup `PRE-SUBLAYER-REPAIR-20260717_010907.xlsx` + rewrite), then COM recalc, then chain. **PROOF: independent python re-derivation of the whole leg chain matches `compute_pillars` 533/533; rank delta 520/533 LEG-PILLAR-ONLY (press/inf/dem deltas exactly 0.0); audit ALL MODULES CLEAN; tier holds Barr #1 + all 17 placements.** Barr leg .897 to .994, Scott .765 to .914, CCM .778 to .936: Paul's intuition vindicated, the "stale" pre-recalc values were computed under the pre-07-15 ALIGNED layout and were closer to truth. (The COM recalc step is historical; superseded by Phase 2 "NO COM anywhere".) This fix is a zero-rank-delta-style verification case: see [[zero-rank-delta-verification]].
- **N-genre question CLOSED WITH RECEIPTS (never reopen without a new genre/data):** interview-based affective-N does NOT transfer to other collected text: floor + hearing pooled LOOK: FAIL rho = 0.050 (bar .40, n = 409); hearing-only LOOK: FAIL rho = 0.161 (n = 121; better direction, still far). Both one-look markers in `source_data/` (`speech_n_genre_result.json`, `hearing_n_genre_result.json`); the about 61 N-desert members are a COLLECTION-ONLY problem (Paul's 3-week interview cadence). Paul pushed back on the first FAIL ("I thought the N passed. Fix it"); held under law 13, ran the legitimate distinct hypothesis instead; he was given honest sizing before each look. Also that night: his Anthropic API credit ran out mid-study and was topped up.
- Lesson pair for future audits: (1) a "stale cache" can be SHIELDING downstream consumers from an unrepaired reference plane, so refresh only after verifying the formula chain; (2) when repairing drifted formulas, the majority pattern can BE the bug, so anchor on an internal self-consistency signal (the Table1 basis) instead. Campaign log: `FIX_CAMPAIGN_LOG_2026-07-16.md` entries 010-015.
- **UPDATE @a3174bc (guard batch, campaign entry 015, 2026-07-17)**: fences every silent-failure class from the 07-16/17 incidents: (1) AB pillar dials fail loud (W1 class); (2) pillar snapshot stamped + stale-warn > 7d + audit FAIL > 14d (522-rank class); (3) audit no longer writes the snapshot (`PILLAR_SNAPSHOT_FREEZE`); (4) `apply_press_overrides` legacy re-flow retired behind a hard guard, `--merge-only` keeps the ledger merge, desk UI repointed; (5) tier placements fail loud on unresolved names; (6) `config_overlay` fails closed; (7) audit check: channel inputs within 28d of corpus. Same commit: speech-channel per-event 1/n normalization (confirmed sibling drift, Ogles-class inflation removed), giving 230/533 ranks moved PRESS-ONLY (leg/inf/dem mean delta exactly 0), blend 2,024 cells, chain complete, audit ALL MODULES CLEAN incl. the new checks, kernel 72/72, tier holds Barr #1 + all 17 placements. Also that day: Vought RT gold verified Positive for both retweeters @b456b9d; Wagner #3 explained = CFPB .927 efficiency + 97.7pct agenda hit rate, NOT volume.

## Related Topics

- [[moneyball-workbook-rules-scoring-and-sublayer-surgery]] — Standing rules of the Moneyball Blended workbook, the committee-data scoring reference of 2026-07-01 and the Sub Layer off-by-one surgery of 2026-07-16/17 that fixed the ranks.
