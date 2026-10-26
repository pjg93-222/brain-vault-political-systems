---
type: topic
title: "Cosponsor network R-faithful rebuild (2026-10)"
aliases: ["R-faithful cosponsor network", "Cosponsor network 2,271-edge rebuild"]
category: feature
status: in-progress
people: []
actors: []
objective: "Rebuild the cosponsor network so it matches the R pipeline's edge rules and explain every difference from the 0625 network."
created_at: 2026-10-26
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "category/feature", "domain/data"]
---

<!-- Zettelkasten role: bridge note -->

# Cosponsor network R-faithful rebuild (2026-10)

> The Python port reproduces the R network's 2,214 edges exactly. The R-faithful rebuild has 2,271 edges, and every difference is accounted for. Two method differences found along the way are kept off by ruling.

## Context

The cosponsor network is one input to the Melange allocation engines. Before this rebuild, the Python port was checked against the R network of 2026-06-25 (the "0625" network). The port matched it edge for edge.

## Differences from the 0625 network

| Change | Count | Detail |
|---|---|---|
| Real cosponsorships added | +66 | Cosponsorships present in the source data and missing from 0625. |
| Misattributed edges removed | -9 | Bills of former Sen. Bob Menendez (M000639) had been credited to Rep. Rob Menendez (M001226). |
| Drift reweights | 646 | Edge weights that moved with the source drift. |

Net: 2,214 + 66 - 9 = 2,271 edges.

## Method differences kept off

Two differences were found and kept off by ruling D-298:

- Using the full archive bill set.
- Counting once per bill versus once per section.

## Effect on ranks

None. The network feeds only the post-rank allocation engines. The rank effect of the archive change that ships with it is in [[2026-10-feature-bill-archive-rebuild-variant-b]].

## Status

Rebuilt for [[melange-systems]]. Promotion is manual under D-298 and is not recorded as done.
