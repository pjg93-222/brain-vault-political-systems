---
type: concept
name: "CDP-attached headed browser clearance"
aliases: ["Headed CDP attach", "Persistent-profile clearance reuse"]
description: "Scraping pattern for challenge-protected public pages: attach over CDP to a real headed Chrome on a persistent profile, reuse the clearance cookie with the matching user agent, pace requests, and re-harvest on challenge. Headless Chrome does not clear the challenge."
related_to: ["[[melange-systems]]", "[[draft-systems-r-pipeline]]", "[[2026-10-troubleshooting-congress-discovery-cloudflare]]"]
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/concept", "domain/data"]
---

<!-- Zettelkasten role: permanent note -->

# CDP-attached headed browser clearance

> Attach to a real headed browser, not a headless one, when a site challenges automated clients.

## Description

The Draft Systems R scraper fetched challenge-protected congress.gov pages by attaching over the Chrome DevTools Protocol to a headed Chrome instance on a persistent profile. The browser handled the site's challenge itself. The scraper then reused the resulting clearance cookie with the browser's real user agent, and re-harvested the cookie when a challenge reappeared. Requests were paced at 5 per second or fewer.

Headless Chrome did not clear the challenge. A discovery pass that forced headless mode returned zero queries in 30 straight weekly runs before the cause was found.

## Key Characteristics

- A real headed browser on a persistent profile, attached over CDP (Playwright, in the 2026-10 restore).
- The clearance cookie is reused with the matching user agent, refreshed proactively and re-harvested on challenge.
- Pacing: 5 requests per second or fewer in the June scraper. The 2026-10 restore uses one shared context with 12 workers, a 10 s backoff and an adaptive governor.
- Headed mode needs an interactive logon, so scheduled runs execute only while the user is logged on.

## Where it Applies

- [[draft-systems-r-pipeline]] - the congress.gov discovery and member scrapers; the 2026-10 restore is recorded in [[2026-10-troubleshooting-congress-discovery-cloudflare]].
- [[melange-systems]] - the scheduled weekly discovery that depends on this pattern.
