---
type: discussion
title: "Politico Pro access and permission rulings (2026-08-29)"
aliases: ["Politico Pro access ruling", "Politico Pro permission supplement"]
date: 2026-08-29
summary: "Two 2026-08-29 records on the Politico Pro staff directory: a terms-based ruling prohibited automated extraction; a supplement on Paul's attested permission letter authorized a rate-limited, contact-free crawl, kept off for canonical use."
conclusions:
  - "Access ruling: automated extraction PROHIBITED under the reviewed Terms of Service; source QUARANTINED and disabled; no profile or contact data acquired."
  - "Supplement: extraction authorized on Paul's attestation of a physical permission letter (not independently verified), read narrowly; crawl envelope of 2 to 4 requests in flight and at most 60 page requests per minute, with a circuit break on 429, auth loss, warning, CAPTCHA or schema change."
  - "No contact fields retained; names and source UUIDs restricted and local; only public-safe aggregates, opaque IDs, support digests and permitted derived fields may leave restricted storage."
  - "Acquisition accepted and sealed (188 of 188 requests, 18,618 of 18,618 rows reconciled); canonical source enablement NOT yet enabled."
action_items:
  - "Keep enabled=false until P-1, the source-native normalizer, identity-resolution pilots and redistribution-safe output contracts pass (owner: unassigned in the source)."
related_topics:
  - "[[2026-09-feature-staffer-network-data-and-math-successor-design-and-release-gates]]"
related_actors:
  - "[[staffer-live-sidecar]]"
related_people:
  - "paul-goff"
related_projects:
  - "[[melange-systems]]"
related_teams: []
source: "teach"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\audits\\POLITICO_PRO_ACCESS_RULING_20260829.md"
    sha256: "cb4c7d0678ad2cf7fbfeb6fb251918c32ebfd4ee73cd73daaf5c43f06e6c53cf"
    as_of: "2026-09-19"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\audits\\POLITICO_PRO_PERMISSION_SUPPLEMENT_20260829.md"
    sha256: "715196f5881bf1760ce043f9216707e27152a1d7b6ee4c71ef9c5f985802c300"
    as_of: "2026-09-19"
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/discussion", "domain/data"]
---

# Politico Pro access and permission rulings (2026-08-29)

> Two records from 2026-08-29 on using the Politico Pro staff directory as a staffer-network source: a terms-based ruling that prohibited automated extraction, then a supplement that authorized a narrow, rate-limited, contact-free crawl on Paul's attestation of a permission letter.

> [!info] Source and status
> Summaries of `audits/POLITICO_PRO_ACCESS_RULING_20260829.md` and `audits/POLITICO_PRO_PERMISSION_SUPPLEMENT_20260829.md` (both committed 2026-09-19). Neither file holds contact values. The permission rests on Paul's first-party attestation; the supplement states that the letter's letterhead, signature, date and sender authority were not independently verified.

## Context

The records evaluate automated extraction from the Politico Pro staff directory for the staffer-network corpus. Paul logged in himself in the Codex in-app browser; the authenticated directory showed 18,618 results and also displayed contact information, none of which was copied.

## Participants

| Person | Role |
|---|---|
| Paul Goff | logged in; attested the permission letter; owner |

## Conclusions

- **Access ruling (terms only).** The Politico Terms of Service reviewed on 2026-08-29 prohibit automated programs or processes that access, monitor or copy the services, so an authenticated seat alone did not authorize a crawl. Disposition: automated extraction PROHIBITED, source QUARANTINED and disabled, manual attended viewing only, nothing acquired or retained. Ingestion could move to review only with a Politico export or API whose terms permit the use, or written Politico authorization covering automated extraction, retention and the derived outputs.
- **Permission supplement (same day).** Paul attests to a physical letter from the Politico team granting permission for data extraction subject to the site's rate limits; the record reads it narrowly: authenticated, rate-limited collection of directory records for the staffer-network evidence corpus, no credential extraction, no forwarding or republication, no retained email, phone, address or other direct-contact fields, names and source UUIDs restricted and local until a separate public-output ruling. The earlier ruling is kept as history and superseded for extraction authority only.
- **Crawler conduct.** With no published numeric ceiling, the contract was adaptive concurrency from 2 up to 4 requests in flight, at most 60 directory page requests per minute, backoff with jitter, and an immediate circuit break on HTTP 429, authentication loss, an access warning, a CAPTCHA or a pagination or schema change, resuming only after attended review.
- **Outcome.** The directory returned no results past offset 10,000, so the completed crawl used four mutually exclusive Party-filter partitions summing to 18,618. Production run: 188 of 188 requests succeeded, at most 4 in flight and 28 in any rolling minute; 18,618 of 18,618 rows and UUIDs reconciled with zero duplicates; retained fields limited to issue areas, name, partition, partition ordinal, profile UUID and roles; an earlier stopped exploratory checkpoint is quarantined and referenced by nothing.
- **Disposition.** Restricted acquisition accepted and sealed; canonical source enablement not yet enabled; redistribution restricted local and public-safe derived only.

## Later (dated, from other records)

- Early September (raw folder dated 2026-09-03): the vault records a later Politico profile crawl (`politico_profile_crawl_playwright.py`) at about 47% (8,784 of 18,618) on 2026-09-05 01:30Z and 17,683 of 18,618 at 06:14Z (see [[staffer-live-sidecar]]).
- 2026-09-08: the staffer successor design confirmed Politico Pro as the preferred source for role, title and office when it disagrees with Quorum ([[2026-09-feature-staffer-network-data-and-math-successor-design-and-release-gates]]).
- 2026-09-08: the staffer spine identity adjudication records that the staffer graph's Politico bridge was bound to the v6 spine, so its rebuild uses the direct v6-to-v8 map, and that 7,712 native Politico IDs were checked with none missing (Staffer spine identity adjudication (2026-09-08)).
- When, or whether, the canonical enablement switch changed after 2026-08-29 is not recorded in these sources.

## Action Items

- [ ] Keep `enabled=false` until P-1, the source-native normalizer, identity-resolution pilots and redistribution-safe output contracts pass (owner: unassigned in the source).

## Related Projects

- [[melange-systems]]

## Related Topics

- [[2026-09-feature-staffer-network-data-and-math-successor-design-and-release-gates]] — the design that made Politico Pro the preferred role source on 2026-09-08.
