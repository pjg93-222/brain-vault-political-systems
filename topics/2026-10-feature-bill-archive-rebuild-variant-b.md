---
type: topic
title: "Bill archive rebuild (variant B) and legislative credit (2026-10)"
aliases: ["Bill archive variant B", "Passage credit under-count fix"]
category: feature
status: in-progress
people: []
actors: []
objective: "Fix passage credit for 119th Congress bills that the live bill archive stored as raw action text."
created_at: 2026-10-26
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "category/feature", "domain/data"]
---

<!-- Zettelkasten role: bridge note -->

# Bill archive rebuild (variant B) and legislative credit (2026-10)

> The live bill archive stored raw Congress.gov action text, so 372 rows got no passage credit. The rebuilt archive (variant B) fixes this. In a sandboxed run it moves 489 of 535 ranks, all through the legislative-pillar efficiency score.

## Context

The legislative pillar credits members for bills that advance. The live 0825 archive stored the raw Congress.gov action text in the LastAction field for 119th Congress bills. The scorer did not recognize that text, so 372 rows counted as unknown and received no passage credit. The same failure pattern is recorded in [[unmapped-labels-score-zero]].

## Rebuilt archive

Variant B is the 0624 archive plus GovInfo BILLSTATUS records for the 119th Congress.

## Rank effect (sandboxed)

- 489 of 535 ranks move. All of the movement comes through the legislative-pillar efficiency score.
- Examples: Fetterman 487 to 366, Wyden 191 to 108, Roy 448 to 363.
- The cosponsor network has no rank effect. It feeds only the post-rank allocation engines ([[2026-10-feature-cosponsor-network-r-faithful-rebuild]]).
- This change is meant to move ranks, so the non-zero delta is intended. The verification method is in [[zero-rank-delta-verification]].

## Rulings

- D-297 is superseded by D-298: archive variant B, the R-faithful network, Methods A and B off, and promotion done manually.

## Status

Rebuilt and checked in the sandbox for [[melange-systems]]. Promotion is manual under D-298 and is not recorded as done.
