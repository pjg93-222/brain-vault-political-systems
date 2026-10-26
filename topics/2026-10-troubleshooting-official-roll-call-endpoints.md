---
type: topic
title: "Official roll-call endpoints and script access (2026-10)"
aliases: ["clerk and senate.gov roll-call endpoints", "Voteview stays the Senate source"]
category: troubleshooting
status: completed
people: []
actors: []
objective: "Record how the official House and Senate roll-call endpoints answer scripted clients, and the ruling to keep Voteview as the Melange vote source."
created_at: 2026-10-26
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/topic", "status/completed", "category/troubleshooting", "domain/data"]
---

<!-- Zettelkasten role: bridge note -->

# Official roll-call endpoints and script access (2026-10)

> The House clerk's roll-call XML answers HTTP 200 with an error body for a roll that does not exist, and the Senate's roll-call XML sits behind bot management that blocks scripted clients. Paul ruled on 2026-10-26 to keep Voteview as the vote source and not to evade the bot management.

## Context

Found during the 2026-10-26 diagnosis of the stale vote snapshot (cause: no newer votes upstream, see [[stale-vote-report-check-upstream-first]]). The official endpoints (the ones the official roll-call collector reads) were checked for a block that could explain the staleness. The Senate endpoint does block scripts, but that is not why the snapshot was stale, because the snapshot is fed by Voteview. Two behaviors are worth recording.

## House clerk: 200 with an error body

For a roll that does not exist, the clerk's roll-call XML returns HTTP 200 with a 65-byte body reading "Error sanitizing file". Check the body, not the status code. A status-only check reads a missing roll as a success.

## Senate: bot management on the roll-call XML

The Senate's roll-call XML (the LIS feed on senate.gov) sits behind Akamai bot management. Scripted clients (Python, curl, PowerShell) get a 403 or a challenge page, while a normal user's browser loads the file. This is bot management against scripts, not a block of one network address.

## Ruling (Paul, 2026-10-26)

- No headed-browser automation and no other evasion of the bot management.
- Keep Voteview as the Senate vote source. It lags the official feed by a few days.
- Rejected alternatives: a manual drop-folder import, asking the Senate webmaster to allowlist the project, and third-party feeds.

## Related

- [[melange-systems]] - the project whose vote data this covers.
- [[stale-vote-report-check-upstream-first]] - why the snapshot was stale: upstream, not a fetch block.
- [[2026-10-troubleshooting-windows-revocation-offline-errors]] - the curl certificate errors seen in the same diagnosis, which also looked like a block and were not.
