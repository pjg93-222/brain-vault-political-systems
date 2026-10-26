---
type: concept
name: "Vote freshness from the archive cutoff"
aliases: ["Vote freshness gate", "D-299 vote staleness rule"]
description: "Vote freshness gate for Melange: a chamber's votes are stale only when the bill archive cites floor votes newer than the latest roll call on file for that chamber. The cutoff comes from archive data, never from file modification time."
related_to: ["[[melange-systems]]"]
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/concept", "domain/data"]
---

<!-- Zettelkasten role: permanent note -->

# Vote freshness from the archive cutoff

> A chamber's votes are stale only if the archive cites a floor vote newer than the latest roll call on file.

## Description

The earlier gate compared file modification time minus 30 days against the vote data. That rule failed every recess. Ruling D-299 replaces it: votes are stale only when the archive cites floor votes newer than the latest roll call on file for that chamber. The cutoff comes from archive data, not from file mtime.

## Key Characteristics

- Staleness test: the archive cites a floor vote newer than the latest roll call on file for the chamber.
- The cutoff is read from archive data, never from file modification time.
- Check on 2026-10-26: the House clerk's latest roll is 314, dated 2026-09-16, which matches the snapshot.

## Where it Applies

- [[melange-systems]] - the vote freshness gate in the refresh and audit chain, under D-299.
