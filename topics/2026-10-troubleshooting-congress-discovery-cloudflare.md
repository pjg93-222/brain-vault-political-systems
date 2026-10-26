---
type: topic
title: "Congress discovery Cloudflare challenge and CDP restore (2026-10)"
aliases: ["Congress.gov discovery Cloudflare restore", "Weekly discovery zero-query outage"]
category: troubleshooting
status: in-progress
people: []
actors: ["[[draft-systems-r-pipeline]]"]
objective: "Restore Congress.gov query discovery, which has collected zero queries in 30 straight weekly runs since 2026-09-04."
created_at: 2026-10-26
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "category/troubleshooting", "domain/data"]
---

<!-- Zettelkasten role: bridge note -->

# Congress discovery Cloudflare challenge and CDP restore (2026-10)

> The weekly Congress.gov discovery run forced headless Chrome, which never clears the Cloudflare challenge. It collected zero queries in 30 straight runs since 2026-09-04. A restore that reattaches to a real headed Chrome over CDP passed a supervised smoke test: 16 records, no challenge.

## Context

The Draft Systems R pipeline ([[draft-systems-r-pipeline]], part of [[melange-systems]]) runs a weekly discovery pass against congress.gov. The original June 2026 scraper worked. It attached over CDP to a real headed Chrome on a persistent profile, harvested and reused the clearance cookie with the real user agent, re-harvested on challenge, and paced requests at 5 per second or fewer. The pattern is recorded in [[cdp-attached-headed-browser-clearance]].

The weekly run regressed when discovery forced headless Chrome. Headless Chrome never cleared the challenge, so the runs returned nothing.

## History

| Date | Event |
|---|---|
| 2026-06 | Original scraper works: CDP attach to headed Chrome on a persistent profile, clearance reuse, pacing at 5 requests per second or fewer. |
| 2026-09-04 onward | 0 queries collected in 30 straight weekly runs under forced headless Chrome. |
| 2026-10-26 | Restore: attach over CDP via Playwright, one shared context with 12 workers, a 10 s backoff, an adaptive governor and proactive clearance refresh. Supervised smoke test: 16 records, no challenge. |

## Scheduling constraint

Headed Chrome needs an interactive logon. All seven Moneyball/Melange scheduled tasks already run only when the user is logged on (D-296). A restored discovery run therefore depends on a logged-on session.

## Status and open items

- Status stays in progress until a scheduled run after the restore collects queries. The record so far holds only the supervised smoke test.
- The restore re-harvests clearance when a challenge appears. The forecast lane's rule for a different site is to stop on a Cloudflare challenge. The owner should confirm which rule governs congress.gov before scheduled runs are trusted.

## Source

Reported in the owner's session brief of 2026-10-26. The preserve agent did not re-run the scraper or the smoke test.
