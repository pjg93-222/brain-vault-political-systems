---
type: concept
name: "Look ledger (Single-look holdout discipline)"
aliases: ["Single-look holdout discipline: Look ledger"]
description: "Dated ledger of the looks and holdout uses that the single-look discipline records, one row each with lane and outcome, from the 2026-07-07 Big Five retest to the scheduled 2027-03-08 PAC scoring and the planned 2028 clean test."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/research"]
part_of: "[[single-look-holdout-discipline]]"
---

# Look ledger (Single-look holdout discipline)

> Dated ledger of the looks and holdout uses that the single-look discipline records, one row each with lane and outcome, from the 2026-07-07 Big Five retest to the scheduled 2027-03-08 PAC scoring and the planned 2028 clean test. Part of [[single-look-holdout-discipline]] (project [[melange-systems]]).

## Look ledger (all dates absolute)

| Date | Lane | Look | Outcome |
|---|---|---|---|
| 2026-07-07 | Big Five interview-C retest | pre-registered `c_prereg_test`, ONE look | PASSED, look TAKEN; consequence wired @b6968fd |
| 2026-07-07 | Improvement round 1 (bars @a61820e) | P1, P2, P4, B5 one look each | ALL MISS; shipped config survives |
| 2026-07-07 | Round 2 blue (prereg @54d0f7c) | composed resid-A/C/O + v2-E | MISS (look TAKEN same day) |
| 2026-07-07 | Psychology round-3 | 11 pre-registered designs total, one look each | zero bars moved; P6 gated shrinkage PASSED and PROMOTED (claim later retracted, change kept); P5, P7, B6, V3P, CT-CM MISS |
| 2026-07-11 | N-slot re-anchor (round-7) | pre-registered 5-criterion gate (`fec/affective_n_validate.py`) | PASSED 5/5; RECEPT_N=affective promoted @94dc579 |
| 2026-07-16 | Personality gold, RESULT-OW (@0aab1f4) | O criterion-weighting look | MISS - terminal |
| 2026-07-16 | Personality gold, RESULT-NV (@0ab1368) | N variant-parity look | MISS - terminal |
| 2026-07-16 | Same session | subagent fresh pairing pre-lock | VOID look-fragment, never cite |
| 2026-09-30 | Luna household model | holdout (split-2 labelled rows outside the 20k test sample) scored ONCE | +1.009 pp, deploy |
| 2026-09-30 | Luna round 3 (GPU) | same holdout, SECOND use, disclosed | +0.087 pp, deploy; no untouched labelled data remains |
| 2026-10-03 | PAC accuracy attempt 2 | UT-X single-shot holdout | sealed for the attempt (ruling C1); S3 dev-only; after the S2C gate PASS, S3 ran one dev-only pass and the attempt ended ~08:45 UTC with UT-X SEALED_NOT_SCORED (unspent). Update (all-sector phase rulings, Paul's E4, 2026-10-04): P&C/UT-X opened for development, superseding C1; holdout spent, never certifies |
| 2026-10-03 | PAC attempt 2, v4 branch | V3 RESCORE on the superseding freeze V4_1, one pass | v4 WORSE for banks nowcasts (m15 92.33 -> 86.38); v3 stays the record; v4 labelled a post-hoc regression (2026-10-03) |
| 2026-10-04 | PAC v5 run | V5-R one pass; RESCORE labelled post hoc | banks nowcasts up except m21 (97.26 -> 96.85), SchoolsFirst m21 to RESCORE_OBSERVED_PASS, ORIGIN banks unchanged; 3 SchoolsFirst cells flip under leave-one-out; v3 stays the record |
| 2027-03-08 (scheduled) | PAC live freezes | one-time task `score-pac-live-freeze-2026` (Paul OK'd 2026-10-03; stops without a local pas226 edition dated >= 2027-03-01) | scores v3 and LIVE_FREEZE_V4_1 side by side, plus a v5 2026 line (Paul, 2026-10-04). Update (all-sector phase rulings, 2026-10-04): the pas226 download for this job is authorised (E12), and late-issued 2026 L and m18 lines for all sectors go into it (E21) |
| 2028 (planned) | PAC v5 | first clean test (Paul, 2026-10-04) | method and plan frozen before 2027-01-31; each forecast frozen within 14 days of its issue date. Update (v5 run, 2026-10-04): method and plan frozen; any code change after 2027-01-31 ends the clean series. Update (all-sector phase rulings, 2026-10-04): the F1 fix is folded into the new all-sector freeze before 2027-01-31 and the v5 2028 plan is unchanged (E11); crypto, fintech and community banks, unscorable now (no PAC giving before 2022), are included in the 2028 prospective track (E15); v6 is approved, with D-065 only between versions on clean 2028+ cells (E19), and the 2028 track takes all sectors and the L product, with its pas228 download (E22) |

## Related Concepts

- [[single-look-holdout-discipline-cases-4-5-luna-and-pac]] — Cases 4 and 5 of the single-look discipline: the Luna CU-geography holdout of 2026-09-30, used twice, leaving no untouched labelled data, and PAC accuracy attempt 2 of 2026-10-03, whose UT-X holdout was sealed, then opened for development.
