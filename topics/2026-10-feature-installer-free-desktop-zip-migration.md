---
type: topic
title: "Installer-free desktop ZIP migration (2026-10)"
aliases: ["Signed directory ZIP updates", "Installer-free Melange Mentat Terrier", "Native installer without uninstaller", "Keep installer and GitHub updates"]
category: feature
status: superseded
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
  - url: "https://github.com/pjg93-222/Melange/pull/99"
    type: github-repo
    synced_at: 2026-10-27
  - url: "https://github.com/pjg93-222/Melange/blob/5f5451441265b0f6d0c83fcb706639241158fe94/ops/desktop/GITHUB_RELEASES.md"
    type: markdown
    synced_at: 2026-10-27
evidence_status: "SUPERSEDED-ZIP-PROTOTYPE; NATIVE-SOURCE-COMMITTED; FIRST-BUILD-IN-PROGRESS; UNPUBLISHED"
updated_at: 2026-10-27
updated_by: "preserve@agent"
tags: [type/topic, status/superseded, category/feature, domain/platform, domain/security]
superseded_at: 2026-10-27
active_scope: "Retain NSIS installer; remove only uninstaller; retain GitHub update receiver."
current_source_commit: "5f5451441265b0f6d0c83fcb706639241158fe94"
current_source_pr: "https://github.com/pjg93-222/Melange/pull/99"
current_delivery_status: "First native Melange build running with selected 16 GiB reserve; no native packages published."
selected_desktop_reserve_gib: 16
desktop_reserve_default_gib: 32
desktop_reserve_minimum_gib: 16
prior_cleanup_request: "Withdrawn; DE-076 Congress transaction rule was misapplied."
---

# Installer-free desktop ZIP migration (2026-10)

> [!warning] Superseded — user scope correction, 2026-10-27
> Keep the original NSIS installer, remove only the application uninstaller, and retain the GitHub update receiver. The directory ZIP migration and 1.0.20 migration instructions below are historical evidence, not the active release plan. The dated scope correction at the end of this note governs subsequent work; it does not claim a native release or recipient approval has completed.
> Current native source: `5f5451441265b0f6d0c83fcb706639241158fe94`, draft PR #99. The first native Melange build is running with a selected 16 GiB reserve. No native packages are published. The prior fixed-32-GiB blocker and 12 GiB cleanup request were withdrawn after correcting DE-076 scope.

> The three 1.0.20 directory ZIP candidates passed local package verification and isolated startup tests. Source review, owner testing, public release, signed-feed activation and recipient policy approval remain separate stages.

## Context

[[melange-systems]], [[mentat]] and [[terrier]] share the new desktop client and ZIP update machinery while retaining their own backend source, identity, profile, credentials, access approval and data. This migration removes the NSIS installer and extraction-plugin dependency that complicated application-control approval. It does not bypass ThreatLocker or establish recipient policy acceptance.

## Migration and future releases

- Quit the old app through its tray/menu, extract the complete ZIP under `Downloads/MelangeApplications/<Product>-1.0.20`, then run `<Product>.exe`. Closing a window can leave the old process running. Preserve the existing profile and data; manual uninstallation is unnecessary.
- The old NSIS channel cannot consume directory ZIP updates. The legacy Terrier folder-portable marker also describes a separate manual-replacement mode. Default `release_from_main.py` and `desktop-windows.yml` output remains NSIS; pushing source does not enable the ZIP channel.
- Directory releases require `<app>-<version>-win32-x64.zip`, the signed `<app>-win32-x64-directory-zip.manifest.json`, format `windows-directory-zip-v1`, exact executable entrypoint and minimum updater implementation version `2.0.0`.
- Publish the exact current 1.0.20 ZIP and its authorized signed manifest as the recovery baseline before higher automatic updates, after release gates and authorization. Private draft delivery for owner testing is not public release or signed-feed activation.
- Manifest authorization and hashes, the independent whole-ZIP publisher proof and executable signer checks remain mandatory. The fixed certificate thumbprint is `[private — see knowledge vault]`; subject text alone is insufficient. These pinned checks do not require importing a Windows root certificate. The standing [[mandatory-desktop-release-signing]] contract still governs final-byte signing and release evidence.
- Inventory comes from the authenticated archive. Activation verifies the complete version folder, respects normal close and readiness, and retains protected current/previous program versions for rollback. It preserves application authentication, enrollment, writable data and profiles.

## Frozen candidate and source evidence

[Application PR #96](https://github.com/pjg93-222/Melange/pull/96) is a draft source PR at `f49266bfbae19f4153dcb1559b7781b53ebee35e`; this is not a claim that it has merged or deployed. Its [engineering handoff](https://github.com/pjg93-222/Melange/blob/f49266bfbae19f4153dcb1559b7781b53ebee35e/ops/desktop/INSTALLER_FREE_HANDOFF.md) records the candidate and release contract.

The final shared client/tooling is `9ef9eb75219d9ad122f13538d51c5bec853ad7e7`. Backend refs are separate:

| App | Backend repository | Frozen source commit |
|---|---|---|
| Melange | `pjg93-222/Melange` | `6461fb489dec83569c673511889ba7e9f5f959f8` |
| Mentat | `pjg93-222/Mentat` | `b817d6c0f11500ca6b7d0190ededf8f3077dcbcf` |
| Terrier | `[private — see knowledge vault]` | `d6cf452bf688086c37e796d350399bae47865d72` |

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

## Scope correction: retain installer, remove only uninstaller

The user corrected the scope on 2026-10-27: retain the original Windows installer, remove only the uninstaller, and add or keep the GitHub update receiver for Melange, Mentat and Terrier. Pursuing an installer-free ZIP migration was a scope error. This correction supersedes the migration instructions, recovery-baseline publication plan and outstanding ZIP-channel checklist above; the old candidate hashes and receipts remain historical evidence.

The existing native GitHub update receiver already provided the update path. The corrected work keeps that native installer/update channel. It does not require a one-time ZIP migration, publish a directory ZIP manifest, remove the installer, change application data or imply recipient application-control approval.

### Implementation snapshot

At the recorded coordination snapshot, the active branch is `codex/installer-without-uninstaller`, based on Melange commit `3f0c30c5817c65ad91a094f2c05bdf76c58946e7`. The 1.0.21 native changes are uncommitted and under test; the base commit alone does not contain them. Source inspection finds the following changes in progress:

- The NSIS build uses pinned, reviewed template adaptations that skip the uninstaller generation/build pass, omit the installed uninstaller and do not invoke a previous uninstaller during an update.
- Installation and updates select versioned application folders. After successful extraction and registration, the per-user `HKCU` Run entry points to the current version's update receiver. Previous program folders and application profiles/data are retained.
- The native receiver remains in place. The publisher pin becomes enforced after the 1.0.19 warning release, and failed-startup update handling retains an authorized last-good recovery baseline while allowing a corrected release to be received.

These are source-state observations, not final-package evidence. No new native installer has been built or published at this snapshot. Passing tests, a source commit, a signed package, hosted readback, real update/recovery acceptance and work-PC ThreatLocker acceptance must be reported separately. Existing mandatory final-payload signing, approved publisher, timestamp, source/inventory and exact-byte evidence requirements still apply to every executable that remains in the installer and runtime. Removing the uninstaller does not relax those gates or prove the original Windows access error is resolved.

### Superseded artifacts and coordination

[Melange PR #96](https://github.com/pjg93-222/Melange/pull/96) was closed as superseded at `2026-10-28T02:20:08Z`. Its historical ZIP branch remains pushed at `f7752d6060a5b8fc1393fbdf7af66e4d9e1284ff`. Private ZIP drafts remain retained, but no ZIP release or signed ZIP update feed was made public. Do not promote those prototypes as the corrected deliverable.

The local coordination handoff is corrected to this native-installer scope. This memory update is not a new message to Claude and does not establish acknowledgment, routing, integration or deployment. The earlier interrupted ZIP coordination record remains historical; downstream work should use this scope correction and fresh package-bound evidence.

Snapshot recorded at 2026-10-28T02:47:07.3744110Z. User scope and release/coordination status are recorded from the active task; implementation details were checked against the local uncommitted source, and the PR closure/tip were read from GitHub.

## Native source freeze and build blocker (2026-10-27)

> Current native source: `06c7f3d972a29fcaa035da9906c0e146e3ab76f9`, draft PR #99. Native installers remain unbuilt and unpublished; see the source-freeze update at the end of this note.

This update supersedes the earlier uncommitted-source snapshot while preserving that snapshot as history. The corrected native 1.0.21 implementation is committed and pushed as `06c7f3d972a29fcaa035da9906c0e146e3ab76f9` on `codex/installer-without-uninstaller`, with [draft Melange PR #99](https://github.com/pjg93-222/Melange/pull/99), **Retain Windows installers while removing uninstallers**. The worktree is clean. The source retains the installer and GitHub update receiver while removing the uninstaller; the ZIP prototype remains superseded.

Local validation reported by the release work for this source: changed-source security **PASS**; **742 distinct client tests passed** across the full run and targeted rerun after correcting obsolete assertions; **93 release-driver tests**, **3 smoke-helper tests**, and **31 verifier-contract tests** passed. These results describe source/test evidence, not newly built installer bytes or recipient acceptance.

Native installers are **not built or published**. The reported C: free space is about **28.6 GiB**, below the **32 GiB reserve plus build space**. Automatic approval review rejected deletion-based cleanup. The user was asked to free **12 GiB** or connect another drive. Source review can proceed, but package signing/inventory, actual installation/update/recovery and work-PC ThreatLocker acceptance still require exact built artifacts and their own evidence.

No new Claude message, acknowledgment, routing, integration or deployment is asserted by this memory update. GitHub PR/head and the clean local source worktree were checked directly; test counts, the security result and the build blocker are recorded from the active release task.

Source-freeze status recorded at 2026-10-28T03:11:26.8802882Z.

## Reserve-rule scope correction and active native build (2026-10-27)

The previous disk-blocker account above applied a saved rule outside its original scope. **DE-076 concerns the Congress `chain_transaction` pipeline, not desktop releases.** Its 30 GB transaction floor and `-MinFreeGB 32` relaunch check addressed that Congress/data transaction. They do not establish a mandatory 32 GiB desktop release reserve. The task coordinator misapplied that ledger entry, corrected the mistake and withdrew the request for 12 GiB of cleanup or another drive. No data files were deleted to satisfy that withdrawn request. Saved rules retain their original system, operation, date and authority; check that scope before applying them to another workflow.

Current native source is committed and pushed as `5f5451441265b0f6d0c83fcb706639241158fe94` on `codex/installer-without-uninstaller`, still under [draft Melange PR #99](https://github.com/pjg93-222/Melange/pull/99). Commit `06c7f3d972a29fcaa035da9906c0e146e3ab76f9` is the preceding source checkpoint. The [current desktop release guide](https://github.com/pjg93-222/Melange/blob/5f5451441265b0f6d0c83fcb706639241158fe94/ops/desktop/GITHUB_RELEASES.md) states the corrected contract: `--free-floor-gib` is selectable with a **16 GiB minimum** and an unchanged **32 GiB default**. The chosen reserve applies consistently to actual per-phase workspace projections and both final-artifact extraction verifiers. A selected 16 GiB reserve is supported desktop behavior; it is not an exception to a Congress transaction rule.

The stale PowerShell preflight assumption was corrected to match the existing signing-hook behavior. The release task reports an actual read-only signature probe returning **Valid** under **Restricted**, with the host/user execution policy unchanged. This does not waive signing, recipient application control, or other release gates. The follow-up passed **9 focused release-driver tests** and **32 verifier tests**; these are the reported follow-up results, separate from the earlier checkpoint's tests.

The **first native Melange build is now running** with a **16 GiB selected reserve** and exact shared source `5f5451441265b0f6d0c83fcb706639241158fe94`. Backend references are Mentat `2b623be182881039e974940b652fab7d39a87ce6` and Terrier `d6cf452bf688086c37e796d350399bae47865d72`. No native packages are published. Build completion, exact final-byte signing/inventory evidence, hosted readback, actual update/recovery and work-PC acceptance remain unclaimed until verified; the earlier fixed-32-GiB blocker and cleanup request are superseded.

Provenance: DE-076 was read from the generated `ledger/melange-systems-brain/DE-076.md` projection of `melange-systems-brain/DEADENDS.md`, source brain commit `39c66f5f34d032700c9b528beb32fd662aae41f2`, entry SHA-256 `a63df716e03f1e21dafe42a1130506969a70ce9e64f03549511b4d3e888f7606`. Its source scope is explicit in that content; the generated ledger was not edited. The new PR head and committed release-guide changes were checked directly. Test/probe results, withdrawal and active build status are reported by the release task. This memory update sends no new Claude message and asserts no acknowledgment, integration or deployment.

Reserve-scope correction recorded at 2026-10-28T03:28:01.2429120Z.
