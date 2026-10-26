---
type: topic
title: "Windows curl revocation-offline errors (2026-10)"
aliases: ["Schannel revocation offline", "curl revocation offline"]
category: troubleshooting
status: completed
people: []
actors: []
objective: "Record the cause of the Windows curl certificate-revocation errors seen on 2026-10-26, so they are not mistaken for TLS inspection or a blocked site."
created_at: 2026-10-26
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/topic", "status/completed", "category/troubleshooting", "domain/infra"]
---

<!-- Zettelkasten role: bridge note -->

# Windows curl revocation-offline errors (2026-10)

> On Windows, curl (Schannel) "revocation offline" errors came from an intermittently unreachable Let's Encrypt CRL host over IPv6. Python's urllib does no revocation check and is unaffected. The IT-issued certificate is a device-management root, not TLS inspection.

## Context

Seen on 2026-10-26 while checking why the vote snapshot looked stale (see [[2026-10-troubleshooting-official-roll-call-endpoints]]). curl on Windows failed some HTTPS requests with a revocation-offline error, which looked like an inspecting proxy or a block.

## Findings

- Schannel checks certificate revocation by default. The check failed because the Let's Encrypt CRL host was intermittently unreachable over IPv6.
- Python urllib does no revocation check, so the Melange vote refresh (Voteview fetcher) never saw the error.
- The IT-issued certificate on the machine is an Intune device-management root, not a TLS-inspection root.
- There was no proxy and no inspection product in the path.

## Related

- [[melange-systems]] - the project whose vote-fetch diagnosis surfaced the errors.
- [[2026-10-troubleshooting-official-roll-call-endpoints]] - the other access finding from the same diagnosis.
