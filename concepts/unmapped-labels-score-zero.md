---
type: concept
name: "Unmapped labels score zero"
aliases: ["Silent zero credit for unmapped labels", "Unknown-label under-credit"]
description: "Failure pattern: a scorer that maps raw labels to credit and gives unmapped labels zero credit under-credits silently. In the Melange bill archive, raw Congress.gov action text left 372 rows unmapped, so they received no passage credit."
related_to: ["[[melange-systems]]", "[[fail-closed-gates]]", "[[2026-10-feature-bill-archive-rebuild-variant-b]]"]
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/concept", "domain/data"]
---

<!-- Zettelkasten role: permanent note -->

# Unmapped labels score zero

> A label the scorer does not recognize scores zero, and nothing in the run reports it.

## Description

In the Melange legislative pillar, passage credit depends on mapping each bill's LastAction to a category. The live 0825 archive stored raw Congress.gov action text for 119th Congress bills, and the mapping did not recognize it. 372 rows counted as unknown and received no passage credit. The scores were still produced and ranked. The fix was to rebuild the archive, see [[2026-10-feature-bill-archive-rebuild-variant-b]].

The session record shows no check that counted unknown labels before scoring. That gap is what let the failure stay silent.

## Key Characteristics

- An unknown label defaults to zero credit.
- The default is silent unless the run counts unknown labels and reports or blocks on them.
- Same family as [[fail-closed-gates]]: a case the mapping cannot classify should block or report, not produce a guessed output.

## Where it Applies

- [[melange-systems]] - the legislative pillar and its passage credit.
- [[2026-10-feature-bill-archive-rebuild-variant-b]] - the 372 unknown rows and their rebuild.
