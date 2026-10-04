---
type: concept
name: "Four-pillar percentile blend"
aliases: ["4-pillar percentile-rank blend"]
description: "The Moneyball rank is a weighted blend of four pillar scores (committee/influence, legislative, press, demographic), built as percentile ranks on 2026-06-25, with the committee/influence pillar moved to raw/max on 2026-06-30 and press to signed raw/max on 2026-07-01; resolution 3 records three weight sets (historical, last ratified, live but unratified), only Paul ratifies one, and the live set is read where it is kept."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/concept", "domain/data"]
---

# Four-pillar percentile blend

> The Moneyball rank is a weighted blend of four pillar scores (committee/influence, legislative, press, demographic), built as percentile ranks on 2026-06-25, with the committee/influence pillar moved to raw/max on 2026-06-30 and press to signed raw/max on 2026-07-01; resolution 3 records three weight sets (historical, last ratified, live but unratified), only Paul ratifies one, and the live set is read where it is kept.

## Description

The CU-influence rank of the 533 members combines four pillars: committee/influence, legislative, press and demographic. In the Blended workbook of 2026-06-25 each pillar was scored from its normalised components and then turned into a percentile rank across the members; the score is the weighted sum of the four pillar scores, and the rank orders the scores. The percentile form arrived with that workbook, after the Presentation audit found that min-max scaling let one outlier set each pillar's scale and handed committee about half of the effective variance; the influence pillar (2026-06-30) and the press pillar (2026-07-01) later moved to a raw/max score, while a raw/max legislative pillar was tried and reverted. Since the Phase 2 inversion of 2026-07-02, `fec/compute_pillars.py` reproduces the chain in Python, `ranks_python.json` is the rank authority, and the workbook is a view of it.

This is a pointer concept: it states the method and the rules, not the weights. Resolution 3 records three weight sets, each with its status (historical, last ratified, live but unratified), and the newest must never read as ratified. The weights are read live where they are kept (`ranks_python.json` and the workbook), never from a document; the "Pillar weights and score formula" section of the workbook note records every set with its status. Choosing or ratifying a set is Paul's domain; a set is never relabelled as wrong.

## Key Characteristics

- Four pillar scores across the 533 members (percentile ranks as delivered on 2026-06-25; influence and press moved to raw/max on 2026-06-30 and 2026-07-01); the score is their weighted sum.
- Weights live in the workbook (labels in column AA, values in column AB) and in `ranks_python.json` (`ab_weights`); read them live, never from a document.
- Resolution 3 records three sets with dates and status; only Paul ratifies a set, and the live set may be unratified.
- The four-pillar rank is not every board: Paul reads the overall primacy board for primacy questions, so ask which surface before decomposing a rank.
- The rank measures influence; per-category stance measures alignment, on a separate axis.

## Where it Applies

- [[2026-06-feature-moneyball-excel-model-build]] — the June build delivered the percentile-rank 4-pillar blend in the Blended workbook (2026-06-25)
- [[2026-07-feature-primacy-and-industry-tier-boards]] — Paul reads the overall primacy board, not `ranks_python.json` (the four-pillar rank)
- [[2026-07-troubleshooting-melange-audits-and-reviews]] — pillar weights recur in audit findings and exist in three sets
- [[moneyball-workbook]] — its Blended Model sheet was the canonical output of the blend until the Phase 2 inversion of 2026-07-02 made it a view of `ranks_python.json`; its "Pillar weights and score formula" section holds every set with its status
- [[melange-fec-pipeline]] — `compute_pillars.py` writes `ranks_python.json`, the rank authority since 2026-07-02
- [[melange-systems]] — the project's model and its record of the three weight sets

## Related Concepts

- [[influence-vs-alignment-axes]] — the blend is the influence axis; per-category stance is the separate alignment axis
- [[demographic-potential-method]] — the member desk's Demographic Potential market score; the `DEMO_POTENTIAL` dial alone does not move this blend's hand-edited `Demo%` input (brain D-035)

## Evidence

Other notes that record the blend or its weight sets, by title (plain text, so their link budgets are unchanged):

- Melange architecture and system of record: `compute_pillars.py` reproduces the workbook rank chain at exact parity; pillar weights are the user's domain, never relabelled as wrong.
- Cosponsor and sector networks, Melange dashboard UI evolution, CU stance and sentiment scoring, Melange data-collection lanes, Sentinel collectors: each records the three sets with dates and status.
- Influence engine internals and Single-look holdout discipline: the weight change of 2026-07-07, made in the GATE-2 session.
- Legislative pillar and ACU review: its Tier-1 legislative/press blend weights are kept apart from the pillar weights.
- Live tree, git drift and line endings: the live-only pillar policy file that encodes the live set.
- Brain vault setup and Claude memory import: the import kept the live set labelled unratified.
- Codex executor lane, Meta LOOP orchestration and Agent tooling stack: the retired `apply_weights.py` one-shot overwrites ratified pillar weights.
