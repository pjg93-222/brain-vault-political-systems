---
type: topic
title: "Application control blocks installed apps (2026-10)"
aliases: ["Downloads-only app control", "Application control install block"]
category: troubleshooting
status: in-progress
people: []
actors: []
objective: "Keep the installed Melange desktop apps and their auto-updates runnable under the workstation's application-control rule."
created_at: 2026-10-26
sources: []
evidence_status: "SOURCE-REPORTED-NOT-INDEPENDENTLY-VALIDATED"
updated_at: 2026-10-26
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "category/troubleshooting", "domain/security"]
---

<!-- Zettelkasten role: bridge note -->

# Application control blocks installed apps (2026-10)

> The application-control rule allows the desktop apps only when they run from the user's Downloads folder. Installed copies and auto-updates outside Downloads are blocked. A design to install and update under Downloads is in progress.

## Context

All installed application binaries are signed and timestamped with the project's self-signed release certificate. On the workstation that certificate is trusted through the current-user Root store only. The signature satisfies the publisher gate in [[mandatory-desktop-release-signing]]. It does not decide recipient policy. The application-control rule (ThreatLocker) is that policy, and a valid signature does not establish that it allows execution.

## Rule as it stands

- Allows the apps only from the user's Downloads folder.
- Uses version wildcards of the form 1.x.
- Blocks installed apps and auto-updates outside Downloads.

## Status

- Applies to the desktop apps of [[melange-systems]].
- Design in progress: install and update the apps under Downloads.
- Not yet recorded: a test install and a test auto-update under Downloads that pass the rule.
- The IT contact and the rule's administrative details are kept out of this public brain. They are in the private curation collection.
