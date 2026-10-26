---
type: concept
name: "Pinned source selection"
aliases: ["Source file selection without mtime", "Pin then timestamp then name"]
description: "Rule for choosing which input file a Melange reader loads: an explicit pin wins, then the timestamp in the filename, then the name. Newest-by-modification-time is not used, because base files written in the same second cannot be told apart by mtime."
related_to: ["[[melange-systems]]"]
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/concept", "domain/data"]
---

<!-- Zettelkasten role: permanent note -->

# Pinned source selection

> A reader picks its input by pin, then filename timestamp, then name. File modification time is not part of the rule.

## Description

Melange readers used to pick "the newest file by modification time". That rule is fragile: all seven base files share one modification second, so "newest" was not a stable choice. The replacement is `fec/source_select.py` in the Melange repository. It resolves a source in this order: an explicit pin, then the timestamp in the filename, then the name.

## Key Characteristics

- Order of precedence: pin, then filename timestamp, then name.
- Pins are stored in `data/engine/source_pins.json`.
- At the time of recording, the base network and the archive are pinned. The AUG base is not pinned.

## Where it Applies

- [[melange-systems]] - the Melange readers that load the base network, the bill archive and the other engine inputs.
