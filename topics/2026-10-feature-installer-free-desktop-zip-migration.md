---
type: topic
title: "Installer-free desktop ZIP migration (2026-10)"
aliases: ["Signed directory ZIP updates", "Installer-free Melange Mentat Terrier"]
category: feature
status: in-progress
people: []
actors: []
related_projects: ["[[melange-systems]]", "[[mentat]]", "[[terrier]]"]
objective: "Preserve the signed directory ZIP migration contract and exact tested candidate boundaries across all three desktop apps."
created_at: 2026-10-27
sources:
  - url: "https://github.com/pjg93-222/Melange/pull/96"
    type: github-repo
    synced_at: 2026-10-27
  - url: "https://github.com/pjg93-222/Melange/blob/f49266bfbae19f4153dcb1559b7781b53ebee35e/ops/desktop/INSTALLER_FREE_HANDOFF.md"
    type: markdown
    synced_at: 2026-10-27
evidence_status: "LOCAL-PACKAGE-VERIFIED; RECIPIENT-AND-UPDATE-ACCEPTANCE-PENDING"
updated_at: 2026-10-27
updated_by: "preserve@agent"
tags: [type/topic, status/in-progress, category/feature, domain/platform, domain/security]
---

# Installer-free desktop ZIP migration (2026-10)

> The three 1.0.20 directory ZIP candidates passed local package verification and isolated startup tests. Source review, owner testing, public release, signed-feed activation and recipient policy approval remain separate stages.

## Context

[[melange-systems]], [[mentat]] and [[terrier]] share the new desktop client and ZIP update machinery while retaining their own backend source, identity, profile, credentials, access approval and data. This migration removes the NSIS installer and extraction-plugin dependency that complicated application-control approval. It does not bypass ThreatLocker or establish recipient policy acceptance.

## Migration and future releases

- Quit the old app through its tray/menu, extract the complete ZIP under `Downloads/MelangeApplications/<Product>-1.0.20`, then run `<Product>.exe`. Closing a window can leave the old process running. Preserve the existing profile and data; manual uninstallation is unnecessary.
- The old NSIS channel cannot consume directory ZIP updates. The legacy Terrier folder-portable marker also describes a separate manual-replacement mode. Default `release_from_main.py` and `desktop-windows.yml` output remains NSIS; pushing source does not enable the ZIP channel.
- Directory releases require `<app>-<version>-win32-x64.zip`, the signed `<app>-win32-x64-directory-zip.manifest.json`, format `windows-directory-zip-v1`, exact executable entrypoint and minimum updater implementation version `2.0.0`.
- Publish the exact current 1.0.20 ZIP and its authorized signed manifest as the recovery baseline before higher automatic updates, after release gates and authorization. Private draft delivery for owner testing is not public release or signed-feed activation.
- Manifest authorization and hashes, the independent whole-ZIP publisher proof and executable signer checks remain mandatory. The fixed certificate thumbprint is `0EBC9AD04E929CDD731EDB5D278A4143BC3D3D30`; subject text alone is insufficient. These pinned checks do not require importing a Windows root certificate. The standing [[mandatory-desktop-release-signing]] contract still governs final-byte signing and release evidence.
- Inventory comes from the authenticated archive. Activation verifies the complete version folder, respects normal close and readiness, and retains protected current/previous program versions for rollback. It preserves application authentication, enrollment, writable data and profiles.

## Frozen candidate and source evidence

[Application PR #96](https://github.com/pjg93-222/Melange/pull/96) is a draft source PR at `f49266bfbae19f4153dcb1559b7781b53ebee35e`; this is not a claim that it has merged or deployed. Its [engineering handoff](https://github.com/pjg93-222/Melange/blob/f49266bfbae19f4153dcb1559b7781b53ebee35e/ops/desktop/INSTALLER_FREE_HANDOFF.md) records the candidate and release contract.

The final shared client/tooling is `9ef9eb75219d9ad122f13538d51c5bec853ad7e7`. Backend refs are separate:

| App | Backend repository | Frozen source commit |
|---|---|---|
| Melange | `pjg93-222/Melange` | `6461fb489dec83569c673511889ba7e9f5f959f8` |
| Mentat | `pjg93-222/Mentat` | `b817d6c0f11500ca6b7d0190ededf8f3077dcbcf` |
| Terrier | `pjg93-222/Geo` | `d6cf452bf688086c37e796d350399bae47865d72` |

Terrier dependency preparation additionally records reviewed constraint inputs at `79507944e6670b0e967896d586c6fcbceccec62b`; that does not change its final shared client ref. Later controller and documentation commits likewise do not change the frozen application bytes.

| Final 1.0.20 ZIP | SHA-256 |
|---|---|
| `melange-1.0.20-win32-x64.zip` | `b307a8b2e8eb8dc2ee20a3a6b2818ffcc9b91a54d214c6aa85f3f5df53854323` |
| `mentat-1.0.20-win32-x64.zip` | `ef1ca82d55335230be7374ead1eb3ba0007db1fcb1f6d1c3aca0ac9a0cf28e9b` |
| `terrier-1.0.20-win32-x64.zip` | `4ea628a9d044935376df3aca0796f28263fb721d31d29d9182e597e85d65474e` |

## Validation and remaining gates

The frozen client suite passed 803/803 tests. All three final candidates passed complete package/inventory/signature/source verification and isolated package startup smokes, including the settings shell and bundled backend interface with unauthorized requests refused. The smokes used temporary profiles and did not establish full authenticated business workflows or real automatic updates. Receipt evidence remains local; the linked source handoff summarizes its scope.

- [ ] Complete authenticated application acceptance and the actual upgrade, interruption and recovery cycle on exact built bytes.
- [ ] Complete remaining security, dependency, redistribution and hosted-asset readback gates before public release/feed activation.
- [ ] Obtain actual work-PC ThreatLocker acceptance through the organization's IT administrator.
- [ ] Confirm downstream coordination acknowledgment and integration. The coordination message was delivered but interrupted before acknowledgment/routing; unified integration is not claimed complete.

Concurrent development does not alter these immutable candidates. New source changes require a new frozen build, fresh package-bound evidence and a distinct release; do not replace candidate bytes or reuse their receipts for another build.
