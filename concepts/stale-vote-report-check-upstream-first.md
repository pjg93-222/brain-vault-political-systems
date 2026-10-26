---
type: concept
name: "Stale vote reports: check upstream first"
aliases: ["vote staleness is upstream", "check Voteview dates before fetch code"]
description: "When Melange's vote snapshot looks stale, compare the upstream publication date and whether the chamber is voting before debugging any fetch code."
related_to: ["[[melange-systems]]", "[[melange-fec-pipeline]]", "[[census-before-claims]]", "[[2026-10-troubleshooting-official-roll-call-endpoints]]"]
sources: []
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/concept", "domain/data"]
---

# Stale vote reports: check upstream first

> When the Melange vote snapshot looks stale, compare the upstream publication date and whether the chamber is actually voting before debugging any fetch code.

## Description

A "stale votes" report has two very different causes: the fetch is broken or blocked, or the source has nothing newer to give. The 2026-10 report was read as a block. The diagnosis of 2026-10-26 found the second cause. Voteview is the vote source, and the Melange vote refresh (Voteview fetcher) never changed and passed on 2026-10-25. The snapshot ended at House roll 314 (2026-09-16) and Senate vote 256 (2026-09-30), which were exactly the last votes cast.

The upstream side agreed with the snapshot at every point:

- Voteview's files were last modified on 2026-10-01.
- The House clerk confirms there is no House roll 315: the House was in its pre-election recess, holding pro forma sessions only.
- Public trackers show no Senate roll call after 9/30.

A snapshot that ends at the last cast vote is complete, not stale. The same logic sits behind the vote freshness gate of D-299 (a chamber is stale only when the archive cites floor votes newer than its latest roll call on file).

## Key Characteristics

- Order of checks: the source's own publication date, then whether the chamber has voted since, then the fetch code.
- A recess or pro forma period produces a frozen snapshot with a healthy fetcher.
- A fetcher that passed on its last run and has not changed is evidence against a fetch fault, not proof of one.
- An official-endpoint failure seen along the way is a separate finding, not the cause of the staleness; see [[2026-10-troubleshooting-official-roll-call-endpoints]].

## Where it Applies

- [[melange-systems]] - the vote snapshot feeds the legislative pillar, so a stale-vote report is a project-level question.
- [[melange-fec-pipeline]] - lists Voteview among its external sources; the refresh that reads it is the thing not to debug first.
- [[census-before-claims]] - the same rule applied to vote data: measure the upstream dates before stating a mechanism such as "blocked".

## Related Concepts

- [[census-before-claims]] - measure first, then name the mechanism.
