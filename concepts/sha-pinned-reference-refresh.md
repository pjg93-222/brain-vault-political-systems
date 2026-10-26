---
type: concept
name: "SHA-pinned reference refresh"
aliases: ["Roster refresh pinned to a commit", "Contents API pinned refresh"]
description: "Refresh of external reference data (the Congress member roster) by commit SHA through the GitHub contents API, with a warning when the snapshot is older than 14 days. Used because Python TLS to the raw file hosts is reset on the Windows workstation."
related_to: ["[[melange-systems]]"]
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/concept", "domain/data"]
---

<!-- Zettelkasten role: permanent note -->

# SHA-pinned reference refresh

> Fetch reference data by commit SHA through the GitHub API, and warn when the local snapshot is older than 14 days.

## Description

The roster refresh script `refresh_roster.py` used to fetch from raw GitHub and GitHub Pages hosts. On the Windows workstation, Python TLS connections to raw.githubusercontent.com and to *.github.io are reset, while curl and api.github.com work. The script now reads the GitHub contents API pinned to a commit SHA, which makes each snapshot reproducible. It warns when the snapshot is older than 14 days.

## Key Characteristics

- Pinned to a commit SHA, not a branch head.
- Staleness warning once the snapshot is more than 14 days old.
- Applied on 2026-10-26: snapshot 15530b7d, 535 members, 0 changes.

## Where it Applies

- [[melange-systems]] - the congress member roster behind the 535-member model.
