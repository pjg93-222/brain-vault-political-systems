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
  - url: "https://github.com/pjg93-222/Melange/pull/102"
    type: github-repo
    synced_at: 2026-10-30
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
evidence_status: "SUPERSEDED-ZIP-PROTOTYPE; NATIVE-26-FEEDS-LIVE; WINDOWS-SESSION-SIGN-IN; 684-SOURCE-CASES-THREE-NATIVE-CHECKS-PASSED; TERRIER-NATIVE-STARTUP-PASSED; WORK-PC-UPDATE-UNTESTED"
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: [type/topic, status/superseded, category/feature, domain/platform, domain/security]
superseded_at: 2026-10-27
active_scope: "Native installer without uninstaller; existing Windows sign-in without an extra app password; direct signed GitHub updates and visible launch status."
current_source_commit: "fefc786a495be893f31415bde8860a1e36169ffd"
current_source_pr: "https://github.com/pjg93-222/Melange/pull/102"
current_delivery_status: "Stable 1.0.26 installers and complete signed feeds are published at sequence 17, retaining 1.0.25 recovery sequence 16. Packaged Terrier native startup passed twice; work-PC update/recovery and physical lock/unlock acceptance remain open."
selected_desktop_reserve_gib: 16
desktop_reserve_default_gib: 32
desktop_reserve_minimum_gib: 16
final_two_inspection_reserve: "Explicit one-run 4 GiB budget for Mentat/Terrier 1.0.23 only; production reserve defaults and all integrity checks unchanged."
prior_cleanup_request: "Withdrawn; DE-076 Congress transaction rule was misapplied."
current_application_payload_source: "Published 1.0.26 client/bootstrap: fefc786a495be893f31415bde8860a1e36169ffd. App backends/vendor files retain prior verified source pins. Subsequent documentation changes do not change shipped source."
current_compiler_source: "fefc786a495be893f31415bde8860a1e36169ffd"
current_builder_source: "fefc786a495be893f31415bde8860a1e36169ffd"
---

# Installer-free desktop ZIP migration (2026-10)

> [!warning] Superseded — user scope correction, 2026-10-27
> Keep the original NSIS installer, remove only the application uninstaller, and retain the GitHub update receiver. The directory ZIP migration and 1.0.20 migration instructions below are historical evidence, not the active release plan. The dated scope correction at the end of this note governs subsequent work; it does not claim a native release or recipient approval has completed.
> Current delivery: all three stable 1.0.26 installers and complete signed feeds are published with existing Windows sign-in. Source/native checks, actual packaged-client public-feed checks and two real Terrier backend starts passed. The documented staged-catalogue repeat-download limitation remains unfixed; recipient work-PC update/recovery and physical lock/unlock acceptance remain open.

> The three 1.0.20 directory ZIP candidates passed local package verification and isolated startup tests. Source review, owner testing, public release, signed-feed activation and recipient policy approval remain separate stages.

## Context

[[melange-systems]], [[mentat]] and [[terrier]] share the new desktop client and ZIP update machinery while retaining their own backend source, identity, profile, credentials, access approval and data. This migration removes the NSIS installer and extraction-plugin dependency that complicated application-control approval. It does not bypass ThreatLocker or establish recipient policy acceptance.

## Migration and future releases

- Quit the old app through its tray/menu, extract the complete ZIP under `Downloads/MelangeApplications/<Product>-1.0.20`, then run `<Product>.exe`. Closing a window can leave the old process running. Preserve the existing profile and data; manual uninstallation is unnecessary.
- The old NSIS channel cannot consume directory ZIP updates. The legacy Terrier folder-portable marker also describes a separate manual-replacement mode. Default `release_from_main.py` and `desktop-windows.yml` output remains NSIS; pushing source does not enable the ZIP channel.
- Directory releases require `<app>-<version>-win32-x64.zip`, the signed `<app>-win32-x64-directory-zip.manifest.json`, format `windows-directory-zip-v1`, exact executable entrypoint and minimum updater implementation version `2.0.0`.
- Publish the exact current 1.0.20 ZIP and its authorized signed manifest as the recovery baseline before higher automatic updates, after release gates and authorization. Private draft delivery for owner testing is not public release or signed-feed activation.
- Manifest authorization and hashes, the independent whole-ZIP publisher proof and executable signer checks remain mandatory. The fixed certificate thumbprint is `[thumbprint redacted - see private notes]`; subject text alone is insufficient. These pinned checks do not require importing a Windows root certificate. The standing [[mandatory-desktop-release-signing]] contract still governs final-byte signing and release evidence.
- Inventory comes from the authenticated archive. Activation verifies the complete version folder, respects normal close and readiness, and retains protected current/previous program versions for rollback. It preserves application authentication, enrollment, writable data and profiles.

## Frozen candidate and source evidence

[Application PR #96](https://github.com/pjg93-222/Melange/pull/96) is a draft source PR at `f49266bfbae19f4153dcb1559b7781b53ebee35e`; this is not a claim that it has merged or deployed. Its [engineering handoff](https://github.com/pjg93-222/Melange/blob/f49266bfbae19f4153dcb1559b7781b53ebee35e/ops/desktop/INSTALLER_FREE_HANDOFF.md) records the candidate and release contract.

The final shared client/tooling is `9ef9eb75219d9ad122f13538d51c5bec853ad7e7`. Backend refs are separate:

| App | Backend repository | Frozen source commit |
|---|---|---|
| Melange | `pjg93-222/Melange` | `6461fb489dec83569c673511889ba7e9f5f959f8` |
| Mentat | `pjg93-222/Mentat` | `b817d6c0f11500ca6b7d0190ededf8f3077dcbcf` |
| Terrier | the Terrier repository | `d6cf452bf688086c37e796d350399bae47865d72` |

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

> Current native source: `5f5451441265b0f6d0c83fcb706639241158fe94`, draft PR #99. The first native Melange build is running with a selected 16 GiB reserve. No native packages are published. The prior fixed-32-GiB blocker and 12 GiB cleanup request were withdrawn after correcting DE-076 scope.

The previous disk-blocker account above applied a saved rule outside its original scope. **DE-076 concerns the Congress `chain_transaction` pipeline, not desktop releases.** Its 30 GB transaction floor and `-MinFreeGB 32` relaunch check addressed that Congress/data transaction. They do not establish a mandatory 32 GiB desktop release reserve. The task coordinator misapplied that ledger entry, corrected the mistake and withdrew the request for 12 GiB of cleanup or another drive. No data files were deleted to satisfy that withdrawn request. Saved rules retain their original system, operation, date and authority; check that scope before applying them to another workflow.

Current native source is committed and pushed as `5f5451441265b0f6d0c83fcb706639241158fe94` on `codex/installer-without-uninstaller`, still under [draft Melange PR #99](https://github.com/pjg93-222/Melange/pull/99). Commit `06c7f3d972a29fcaa035da9906c0e146e3ab76f9` is the preceding source checkpoint. The [current desktop release guide](https://github.com/pjg93-222/Melange/blob/5f5451441265b0f6d0c83fcb706639241158fe94/ops/desktop/GITHUB_RELEASES.md) states the corrected contract: `--free-floor-gib` is selectable with a **16 GiB minimum** and an unchanged **32 GiB default**. The chosen reserve applies consistently to actual per-phase workspace projections and both final-artifact extraction verifiers. A selected 16 GiB reserve is supported desktop behavior; it is not an exception to a Congress transaction rule.

The stale PowerShell preflight assumption was corrected to match the existing signing-hook behavior. The release task reports an actual read-only signature probe returning **Valid** under **Restricted**, with the host/user execution policy unchanged. This does not waive signing, recipient application control, or other release gates. The follow-up passed **9 focused release-driver tests** and **32 verifier tests**; these are the reported follow-up results, separate from the earlier checkpoint's tests.

The **first native Melange build is now running** with a **16 GiB selected reserve** and exact shared source `5f5451441265b0f6d0c83fcb706639241158fe94`. Backend references are Mentat `2b623be182881039e974940b652fab7d39a87ce6` and Terrier `d6cf452bf688086c37e796d350399bae47865d72`. No native packages are published. Build completion, exact final-byte signing/inventory evidence, hosted readback, actual update/recovery and work-PC acceptance remain unclaimed until verified; the earlier fixed-32-GiB blocker and cleanup request are superseded.

Provenance: DE-076 was read from the generated `ledger/melange-systems-brain/DE-076.md` projection of `melange-systems-brain/DEADENDS.md`, source brain commit `39c66f5f34d032700c9b528beb32fd662aae41f2`, entry SHA-256 `a63df716e03f1e21dafe42a1130506969a70ce9e64f03549511b4d3e888f7606`. Its source scope is explicit in that content; the generated ledger was not edited. The new PR head and committed release-guide changes were checked directly. Test/probe results, withdrawal and active build status are reported by the release task. This memory update sends no new Claude message and asserts no acknowledgment, integration or deployment.

Reserve-scope correction recorded at 2026-10-28T03:28:01.2429120Z.

## Native installer compilation and private verification (2026-10-28)

The current implementation branch `codex/installer-without-uninstaller` is pushed at `f78cf22ab916bbda22a17463c156d2875f7bfd2f` under draft PR #99. This follow-up is a packaging-only correction: it removes the unused `handleUninstallResult` helper closure whose NSIS warning 6010 caused the original compile to fail with warnings treated as errors. The `-WX` compiler gate remains enforced. The already signed application/backend payload is preserved at source `5f5451441265b0f6d0c83fcb706639241158fe94`; implementation tip and payload source must be recorded separately.

The release task reports **7/7 full `-WX` compiler checks** and the helper security check passing. GitHub's `focused-unit` check passed at `f78cf22ab916bbda22a17463c156d2875f7bfd2f` on 2026-10-28. The actual **Melange 1.0.21 outer installer EXE has now compiled and been signed**, the prior signed application payload remains unchanged, and the packaged backend smoke passed. Independent native/source verification is still running at this snapshot, so compilation, signing and the smoke are not represented as completion of all release gates.

The native `desktop-v1.0.21` release is being staged as a **private draft**. Upload progress is not public publication, hosted-byte acceptance, feed activation or work-PC ThreatLocker acceptance. No native public release or work-PC acceptance is claimed in this progress record. Final publication facts remain pending a separate exact-artifact result. The preceding fixed-disk blocker and first-build-started descriptions are historical; the corrected DE-076 scope and selectable desktop reserve remain in force.

This updates the existing shared coordination record without sending another message to Claude or claiming acknowledgment, routing, integration or deployment. The source tip and CI result were checked directly; compilation, signing, unchanged-payload, smoke and in-progress verifier/draft status are reported by the active release task. The two newer privacy edits already present in the canonical topic are preserved in the review branch as well.

Compilation-progress snapshot recorded at 2026-10-28T04:37:06.6435258Z.

## Installer plug-in blocks and pending 1.0.22 delivery (2026-10-28)

The latest user report names ThreatLocker denials for `StdUtils.dll`, `nsis7z.dll`, `System.dll` and `UAC.dll`. These are reported blocked installer plug-ins; the report does not establish that every application or bundled dependency is allowed. The corrected scope still retains the Windows installer and GitHub update receiver and removes the uninstaller. The directory ZIP approach remains superseded.

The release task reports a built-in-only NSIS packager at `327dbfad747d378431319b017248118adfca4945`, followed by owned main-executable/ASAR version overlays, helper documentation and version 1.0.22 at `dcd7b0068c7881fffdd3f1105ad8c4e28d411c97`, pushed on `codex/installer-without-uninstaller` under Melange PR #99. Its intended installer path avoids the four named plug-ins. At this snapshot, Melange 1.0.22 is compiling from the retained signed 1.0.21 program plus two signed 1.0.22 overlays, as reported by the release owner. Final asset identity and publication are pending; no equivalent Mentat or Terrier 1.0.22 artifact is asserted.

Removing installer plug-ins does not grant recipient application-control permission. IT coverage must include the actual installer, installed app executable, bundled runtime executables and native libraries, relevant vendor-signed dependencies, the Windows-login update receiver, and subsequent downloaded installers in their versioned update paths. Process, file, registry and network restrictions remain part of the actual policy. Keep approval scoped to the identified applications and dependencies; do not infer a blanket Downloads permit or endpoint acceptance from this packaging change. The private IT request is a draft, not a sent message or confirmation that policy reached the devices.

The user explicitly requested skipping verification for this delivery. Record this as a dated, delivery-specific instruction: no new test, independent final-artifact verification, installation/update acceptance or work-PC ThreatLocker pass is claimed for 1.0.22. Prior 1.0.21 results and retained signing provenance do not become 1.0.22 verification results. This instruction is not a standing waiver for later releases and does not establish IT policy approval or permit changes to the approved publisher. Existing public certificate redactions remain intact.

Provenance: the active release task supplied the user report, scoped skip instruction, implementation status and pending build status; the two source commit identities were resolved locally. This documentation task ran no release verification. Private component evidence separates retained original payload provenance from the new main-executable overlay; it is not represented as a fresh final-package census. Local knowledge coordination does not establish a Claude message, acknowledgment, integration or publication.

Historical 1.0.21 summary retained verbatim:
> Current packaging source: `f78cf22ab916bbda22a17463c156d2875f7bfd2f`; signed application/backend payload source: `5f5451441265b0f6d0c83fcb706639241158fe94`. The Melange 1.0.21 installer is compiled and signed; independent verification and private-draft staging are in progress. Public publication and work-PC acceptance remain unclaimed.

Pending documentation snapshot recorded at 2026-10-28T08:14:24.8369951+00:00.

## Published native 1.0.22 prereleases (2026-10-28)

The release owner published the signed Melange, Mentat and Terrier 1.0.22 Windows installers as public manual-download prereleases under `desktop-v1.0.22-test`. The retained publication records report successful signing command completion (exit 0), final local file identities and GitHub release/asset identifiers. This supersedes the pending-compilation snapshot above. Melange 1.0.21 had already been published separately as `desktop-v1.0.21-test`, after which the user reported the four installer DLL blocks; the former private-draft description is historical.

| Application | Published at (UTC, 2026-10-28) | Installer bytes | SHA-256 |
|---|---|---:|---|
| Melange 1.0.22 | 08:51:12 | 750,998,704 | `fd4612fb143d22e00f0d4e27a08178991931e0abf8a210ab77fa9fc79cfa480e` |
| Mentat 1.0.22 | 08:50:35 | 483,696,120 | `fa9f61705d6ab593042245c0b990207d8a8539342cdd16a5dee068e28300798c` |
| Terrier 1.0.22 | 08:45:01 | 305,728,456 | `325d693894c7378457554896141e504d2dfca131ec6892c70f6ac36fdd94edf2` |

All three records name builder source `83cac457683f46a6c1378cf6a288aa79a1b8ec21` and retained common client source `5f5451441265b0f6d0c83fcb706639241158fe94`. Their backend sources are Melange `5f5451441265b0f6d0c83fcb706639241158fe94`, Mentat `2b623be182881039e974940b652fab7d39a87ce6`, and Terrier `d6cf452bf688086c37e796d350399bae47865d72`. The release task reports the built-in, per-file NSIS/zlib compiler follow-up at `f76be3dddcf8e74889e441488f3f8dd5deb73b76`; this is separate from retained application sources and subsequent documentation. The installer and GitHub update receiver remain; the uninstaller and four reported installer plug-ins are removed by the packaging implementation.

**Verification was skipped at the user's explicit request for this delivery.** No new test, independent final-installer extraction/signature pass, hosted-download readback, installation/update acceptance or work-PC ThreatLocker pass is asserted. The records explicitly say hosted readback was not performed and work-PC acceptance was not demonstrated. Earlier test counts apply only to the older source commits named in their dated sections. Publication and a successful signing command are not substitutes for those missing checks. The stable automatic-update feed remains unchanged for all three applications; these prereleases provide immediate manual downloads. The skip instruction remains scoped to this delivery, not future releases.

The generic public [ThreatLocker deployment guide](https://github.com/pjg93-222/Melange/blob/be8d1ad8f0ad032ffdec0dadd792c3c3f5941d0c/ops/desktop/client/THREATLOCKER-DEPLOYMENT.md) is committed and pushed under Melange PR #99 at `be8d1ad8f0ad032ffdec0dadd792c3c3f5941d0c`. It distinguishes removing the installer plug-ins from IT policy coverage for each application, runtime dependency and update stage. No IT message or actual recipient policy change is asserted. Existing certificate redactions are preserved.

Provenance: the three existing private publication records supply the exact artifact identities above; the active release owner confirms public repository visibility and publication. This knowledge update reads those small records and does not independently verify packages or hosted bytes. Claude coordination remains local records only, without a sent message or acknowledgment. Repository publication, documentation publication, stable-feed activation and work-PC acceptance remain separate facts.

Historical pending-delivery summary retained verbatim:
> Current delivery preparation: Melange 1.0.22 at source `dcd7b0068c7881fffdd3f1105ad8c4e28d411c97`, using built-in NSIS operations to remove the reported installer plug-ins. Compilation/publication are pending; verification is skipped at the user's explicit request for this delivery. Work-PC acceptance is unconfirmed. See the dated 1.0.22 update below.

Publication documentation recorded at 2026-10-28T08:56:11.7955069Z.

## Final signed native feeds — 2026-10-28

All three stable signed feeds are published. Stable `desktop-v1.0.22` (sequence 13, identical to the existing preview installer bytes) supplies recovery metadata for installed 1.0.22 clients; `desktop-v1.0.23` (sequence 14) is latest. The older `desktop-v1.0.22-test` links remain separate. Each app checks its signed GitHub release manifest at startup, every 15 minutes and after resume/unlock. Verified updates activate after a normal close or before the next launch; the login receiver and profiles remain. New source commits become updates only after a release is built and published.

- [Melange 1.0.23](https://github.com/pjg93-222/Melange/releases/download/desktop-v1.0.23/melange-1.0.23-win32-x64.exe)
- [Mentat 1.0.23](https://github.com/pjg93-222/Mentat/releases/download/desktop-v1.0.23/mentat-1.0.23-win32-x64.exe)
- Terrier 1.0.23 installer (Terrier repository release; link omitted)

| App | Installer bytes | SHA-256 |
|---|---:|---|
| Melange | 750,998,864 | `4ea779552a3cbcf901ee0cdf6581d57d7c1dfb7f401700c8b522f8f5700b8d78` |
| Mentat | 483,696,272 | `924295fa2824f45e1214ccc29ece533a1a12ce73c53fa07426f97741dbf7a23d` |
| Terrier | 305,728,600 | `2dc54ae07748c4bd1b7aecbac5a98fdc22be8b4ef33f992de0aca5352010a690` |

The shipped 1.0.23 installers retain client/runtime source `5f5451441265b0f6d0c83fcb706639241158fe94`, Melange backend at that same commit, Mentat backend `2b623be182881039e974940b652fab7d39a87ce6`, and Terrier backend `d6cf452bf688086c37e796d350399bae47865d72`. Versioned main/ASAR overlays and installer build inputs use frozen basis `8c0d350361a65027c43baf76b1895ef7f1d2a9cc`. Later main and production-wrapper changes are not retroactively included in those runtime bytes.

All six exact 1.0.22/1.0.23 native inspections passed complete payload/source, ASAR-integrity, native-signature and preserved-vendor-byte checks, with zero installer plug-ins or uninstallers. The actual shipped clients also passed anonymous GitHub manifest/trust, 1.0.22 recovery, 1.0.23 discovery/recovery and current-version checks. Signed local originals and GitHub asset SHA-256 digests match the fetched manifests; these hosted checks did not download the binaries again or execute installation. Focused Windows integration [CI passed](https://github.com/pjg93-222/Melange/actions/runs/40747217760) on merged implementation `22de8c248`; this refers to the review branch, not a merge of PR #99 into main.

Normal Windows `npm run build -- --win --x64 --publish never` now uses the shared `build-native.cjs` directory/signing/built-in-installer pipeline. The installer shows concise extraction phases instead of listing every file; no install-speed benchmark is claimed. The existing private signing protections, user data and vendor signatures remain.

The user reports that the app now launches under ThreatLocker, following the Melange 1.0.22 launch-block conversation. This is a user-reported result for the tested case, not all-three or all-device acceptance. The work-PC automatic-update/recovery cycle and full authenticated workflows remain untested. The release owner reports matching approval-service linkage and a healthy route at the time checked, with intermittent relay outages observed; the work-PC path remains unresolved. No private service addresses or recipient details are included here.

The final two inspections used an explicitly accounted 4 GiB reserve for their bounded payloads; the production 32 GiB default/16 GiB minimum and all native/source checks are unchanged. Existing title, original ZIP history, certificate redactions and review gates are preserved. No Claude message or acknowledgment, PR merge, work-PC update installation or service-uptime guarantee is asserted by this knowledge update.

Publication and hosted-receipt facts recorded at 2026-10-28T19:40:05.983054+00:00; source records remain private.

## Local access and launch update status — 1.0.24

All three 1.0.24 installers and complete stable signed feeds are published as sequence 15, superseding 1.0.23 as latest. The shared client/bootstrap is frozen at `9845710e8edbaa8348a47807bb8f9c4bcbd6107c`, on [PR102](https://github.com/pjg93-222/Melange/pull/102), stacked on PR99. App backends and vendor dependencies retain their exact verified 1.0.23 bytes and the source pins above. Test-only fixture repairs on the review branch do not change those packaged production bytes.

- [Melange 1.0.24 installer](https://github.com/pjg93-222/Melange/releases/download/desktop-v1.0.24/melange-1.0.24-win32-x64.exe)
- [Mentat 1.0.24 installer](https://github.com/pjg93-222/Mentat/releases/download/desktop-v1.0.24/mentat-1.0.24-win32-x64.exe)
- Terrier 1.0.24 installer (Terrier repository release; link omitted)

All three actual packaged 1.0.24 clients passed anonymous discovery, signed manifest/trust, 1.0.23 recovery and hosted-installer size/hash checks. These metadata checks did not download or install the binaries again. The review PRs are not merged.

New builds default to local sign-in without the remote administrator approval service. Melange/Mentat retain local password/device protection; Terrier retains real Django passwords and roles. Existing verified password records migrate separately from preserved managed records and user data. Corporate execution controls are unchanged, and no private-server grant or bearer permission is fabricated.

Each application checks its own public GitHub Releases directly. Launch, sign-in and settings show the installed version and actual update state, with a persistent main-window title. Cached results, API delays and failed checks are distinguished from a fresh current-version result. Source commits become updates only after a release is published. Discovery starts independently of sign-in and initial dataset preparation; a not-yet-confirmed running version can discover a corrective release while keeping its previous confirmed recovery baseline. Already-stuck 1.0.23 installations may need one manual upgrade.

Validation covers 252 distinct focused client cases, 10 real local Django/protected-storage cases, fresh export-security and production-dependency checks, and three complete native artifact inspections. Failed fixture runs remain in the private record; their specific repairs passed, and no production code or security exception changed to hide them. These checks do not establish installation or automatic-update acceptance on the recipient work PC.

The existing Terrier district-test release is public again after owner authorization, preserving its assets, signed catalogue and non-latest prerelease classification. Public data manifests for all three apps are available and signature-checked. First-time data downloads remain separate from binary updates and can be substantial. No private cache was published. Private receipts retain the exact source, build, publication and transport provenance.

## Windows sign-in request and pending 1.0.25 — 2026-10-28

The user explicitly clarified that all three apps should open through the existing Windows sign-in, with no separate app password or remote administrator approval. This supersedes the extra local password prompt introduced in 1.0.24. It changes application sign-in, not corporate execution controls or private-server authorization. The signed GitHub update path remains independent of local sign-in and continues to require a built, published release.

The new shared client/bootstrap is frozen at `3e25fc7185464492abe74122359fca4c11bbac4f`, pushed on [PR102](https://github.com/pjg93-222/Melange/pull/102), still stacked on unmerged PR99. The frozen archive SHA-256 is `800e92fb928c38785bd773b462a47fb7a74f0efef58f3c6ccf368922960640cc`. At this snapshot the 1.0.25 installers are building; **1.0.24 remains the published stable release and is unchanged**. Source completion is not publication or recipient acceptance.

Windows identity is obtained from the native process access token rather than environment usernames or renderer claims. A protected binding connects the current Windows SID to the existing local app profile; lock/resume handling requires a fresh native session check. No additional application password is required in this explicit Windows mode. Existing local password, managed-account and user-data records are preserved for rollback; no managed grant or remote permission is manufactured.

Terrier uses a dedicated real local Django account for the verified Windows identity. It does not impersonate an old account or change existing account roles/passwords. Existing local saved views are copied into that account once while their original rows and owners remain intact. A protected pending record and transactional recovery marker prevent duplicate users/views after interruption. No private-server role or data permission is created by this mapping.

Frozen-source evidence passed **366 client tests and 32 Python tests, with zero failures or skips**. Python coverage includes actual Windows-token/DPAPI checks, modeled lock/disconnection denial, real Django auto-authentication and view-copy recovery, legacy password behavior, and inventory/CLI boundaries. Checked source inputs remained unchanged and matched the frozen archive. Export-security and production-dependency checks passed without new security exceptions. These are source gates, not a physical screen-lock exercise, installed-artifact acceptance, hosted publication, or a work-PC upgrade result. Final package and publication receipts are still pending.

The earlier current-delivery callout is preserved as history:

> Current delivery: all three stable 1.0.22 recovery feeds and latest 1.0.23 feeds are published. Six native inspections and actual shipped-client anonymous feed checks passed. The user reports successful app launch; work-PC automatic-update/recovery acceptance remains open. The final dated section below governs; earlier skip and unchanged-feed statements remain historical.

This update preserves the original ZIP history, approved-publisher and review gates, and prior user-reported ThreatLocker result. It sends no message to Claude, claims no acknowledgment or PR merge, and asserts no private Git synchronization.

## Windows sign-in delivered — 1.0.25

All three signed native installers and complete stable update feeds are public as sequence 16, superseding 1.0.24 as latest while retaining its sequence 15 recovery metadata. Actual packaged 1.0.25 clients passed anonymous GitHub trust/discovery, signed manifest validation, 1.0.24 and fresh 1.0.25 recovery metadata, hosted installer size/SHA-256 checks, and a current-version check. The final hosted checks completed at 2026-10-28T22:30:32Z.

- [Melange 1.0.25 installer](https://github.com/pjg93-222/Melange/releases/download/desktop-v1.0.25/melange-1.0.25-win32-x64.exe)
- [Mentat 1.0.25 installer](https://github.com/pjg93-222/Mentat/releases/download/desktop-v1.0.25/mentat-1.0.25-win32-x64.exe)
- Terrier 1.0.25 installer (Terrier repository release; link omitted)

Each build uses the existing Windows session, with no separate application password or remote administrator approval. The native identity/profile binding, fresh lock/resume check and real Terrier account/view preservation described above are in the shipped client/bootstrap frozen at `3e25fc7185464492abe74122359fca4c11bbac4f`. Backend/vendor bytes retain the verified source baselines. The subsequent README-only commit `407cbf292` documents delivery without changing these packaged bytes. [PR102](https://github.com/pjg93-222/Melange/pull/102) remains the source review, stacked on PR99; publication does not imply either is merged.

The retained evidence totals 366 client plus 32 Python cases (**398 passes**, zero skips) and successful native signature/payload/source inspections for all three exact installers. Hosted checks fetched public metadata; they did not download the binaries again or execute installation. Work-PC launch/update/recovery and a physical Windows lock/unlock cycle remain untested. Existing corporate execution policies, private-server permissions, old account passwords/roles and original saved-view rows remain unchanged. The direct signed GitHub update path remains integrated and independent of the old approval service.

The earlier pending current-delivery snapshot is preserved as history; the published result above supersedes it:

> Current delivery: stable 1.0.24 installers and signed feeds remain published. Version 1.0.25 is being built from frozen Windows-session sign-in source; it is not published at this snapshot. The latest dated section governs current scope. Work-PC installation and automatic-update acceptance remain open.

Shared knowledge now records the explicit Windows sign-in request and the published result. This records no Claude acknowledgment, PR merge or private Git synchronization.


## Public district data and signed update delivered - 1.0.26

All three stable 1.0.26 native installers and complete signed update feeds are published at sequence 17, retaining 1.0.25 recovery sequence 16. The shared desktop client/bootstrap is frozen at `fefc786a495be893f31415bde8860a1e36169ffd` on [PR102](https://github.com/pjg93-222/Melange/pull/102), stacked on unmerged PR99. Existing Windows sign-in, visible GitHub status, accounts and saved views remain. Backend/vendor payloads retain their earlier verified source pins; later main-branch backend changes are not claimed.

- [Melange 1.0.26 installer](https://github.com/pjg93-222/Melange/releases/download/desktop-v1.0.26/melange-1.0.26-win32-x64.exe)
- [Mentat 1.0.26 installer](https://github.com/pjg93-222/Mentat/releases/download/desktop-v1.0.26/mentat-1.0.26-win32-x64.exe)
- Terrier 1.0.26 installer (Terrier repository release; link omitted)

Terrier now loads the signed public snapshot members required by its real row-framework summary, validates the selected district and score-store area-table hash and activates a real backend record. Successful startup/switch cleanup stops inactive backends before retiring verified inactive public caches, preserves unknown/changed files and private state, and defers updates when shutdown is not confirmed.

Bounded 4 MiB reads reduce local public-data and package verification overhead while preserving signatures, hashes, size limits and cancellation. A local 303 MB Mentat cache check measured 4.9 seconds versus earlier 26-52 second observations without OS-cache flushing; this is not a controlled end-to-end install benchmark or work-PC guarantee. Binary updates still download complete installers. Mentat's public feed supplies official FEC tables; industry reports and forecasts require their separate local inputs.

The frozen-source gates passed 611 Node and 73 Python cases (684 total), with zero failures or skips; source export-security, inventory and production-dependency checks passed without new exceptions. All three exact installers passed native signature, payload, source and preserved-vendor checks. The freshly extracted Terrier backend started twice with actual Windows sign-in and signed public data: session and metadata endpoints returned HTTP 200, the store reported ok and the expected snapshot was active. The repeat start was idempotent; public and execution inputs were unchanged. Electron UI, physical Windows lock/unlock and recipient work-PC installation/update/recovery were not acceptance-tested.

Actual packaged 1.0.26 clients passed anonymous GitHub trust/discovery, signed 1.0.25 recovery (sequence 16), update/fresh-1.0.26 recovery (sequence 17), current-version checks and hosted installer size/SHA-256 comparison. These checks fetched metadata, not another full binary download, and did not execute installation.

Known follow-up, still unfixed in 1.0.26: reopening an already-running older workspace can retire a staged newer public catalogue, causing one repeat download on the next fresh start. A focused reproduction used the actual frozen provider and startup function with signed test fixtures, without app/backend launch or network access. Unchanged current sequence 1 data cannot trigger this condition.

To test the actual 25-to-26 update, keep 25 installed and wait for its displayed next-discovery deadline, then choose Check for updates. Its six-hour cache plus up to 30 minutes of jitter also applies to manual checks. Wait for the verified update, save and close, then open the refreshed Desktop or Start Menu shortcut. An old version-specific taskbar pin can reopen 25 and incorrectly report a failed installation. No protected state should be cleared and no manual 26 installation should be substituted for this test.

Existing Opus/Paul review and recipient acceptance gates remain open. This records no PR merge, Claude acknowledgment or private Git synchronization.

Packaging lesson: Python probes using `-E` or `-I` need explicit `-B`, because those modes ignore `PYTHONDONTWRITEBYTECODE`. Compare the entire retained vendor inventory before compilation, not just added files or signed executables. The unpublished Mentat candidate was rebuilt after restoring probe-modified bytecode; all 13,025 vendor files in the replacement exactly match the verified 1.0.23 baseline. Frozen client/bootstrap source and its 684 source checks remain unchanged; the earlier candidate and failure evidence are retained.

Previous current-delivery metadata and callout, retained as historical context:

```yaml
evidence_status: "SUPERSEDED-ZIP-PROTOTYPE; NATIVE-25-FEEDS-LIVE; WINDOWS-SESSION-SIGN-IN; 398-SOURCE-CASES-THREE-NATIVE-CHECKS-PASSED; WORK-PC-UPDATE-UNTESTED"
current_source_commit: "3e25fc7185464492abe74122359fca4c11bbac4f"
current_delivery_status: "Stable 1.0.25 installers and complete signed feeds are published at sequence 16, retaining 1.0.24 recovery sequence 15. Work-PC installation, physical Windows lock/unlock and automatic-update acceptance remain open."
current_application_payload_source: "Published 1.0.25 client/bootstrap: 3e25fc7185464492abe74122359fca4c11bbac4f. App backends/vendor files retain prior verified source pins. Later README-only commit 407cbf292 does not change shipped source."
current_compiler_source: "3e25fc7185464492abe74122359fca4c11bbac4f"
current_builder_source: "3e25fc7185464492abe74122359fca4c11bbac4f"
```

> Current delivery: all three stable 1.0.25 installers and signed update feeds are published. These builds use existing Windows sign-in with no extra app password or remote approval requirement. The source gates, all three native packages and actual packaged-client public-feed metadata checks passed. Recipient work-PC installation/update and physical lock/unlock acceptance remain open.

## Signed 1.0.30 feeds and update-attempt correlation - 1.0.30 (synced 2026-10-30)

Source: [Melange PR #102](https://github.com/pjg93-222/Melange/pull/102), draft and open, stacked on unmerged [PR #99](https://github.com/pjg93-222/Melange/pull/99). Head `2122c40544a575fa70c5d69c09150d1062bfbccf`, last updated 2026-10-30T16:02Z, titled "Use Windows sign-in, repair data loading, and refresh desktop updates". The facts below come from the PR body as read by the coordinating agent on 2026-10-30. The writer did not re-verify the PR.

- **Update attempts.** 1.0.30 ties each activation to its exact installer attempt and to that attempt's completion progress. It reports the installing and awaiting-relaunch states truthfully. An update is still confirmed only after signed package verification and a healthy startup of the target version. The PR says this protects updates that 1.0.30 itself initiates. It cannot retrofit an already-running 1.0.28 or 1.0.29 receiver.
- **Update checks.** "Check for updates" requests fresh metadata, and successful requests made within 60 seconds of each other are coalesced. Automatic discovery keeps its 14-minute cache and its 15-minute timer. A failed refresh cannot be reported as a fresh "no newer release".
- **Feeds.** All three stable 1.0.30 feeds are published at sequence 21. Signed 1.0.28 recovery stays at sequence 19. The frozen shared client is `0d0132663e30cb8d92d911680b08943e13ea7d73`.
- **Validation.** The frozen-source checks passed 658 Node and 77 Python cases, 735 in total. Export-security, inventory and dependency checks also passed.
- **Real runs.** A real local Mentat update from 28 to 30 durably confirmed that 30 was installed, with no pending transaction. A real Terrier run reopened 29 before the 30 installer finished. That left a legacy failed 30 transaction, and local reconciliation is in progress.
- **Not established.** Full real Melange activation, the work-PC update and recovery cycle, and physical Windows lock/unlock acceptance have not been shown. An older-workspace case can retire a staged newer public catalogue, which causes one repeat data download. This is the limitation recorded in the 1.0.26 section above. No new cache-performance or install-time improvement is claimed.
- **Versions 1.0.27 to 1.0.29.** The PR body does not document these individually beyond the 1.0.28 recovery baseline at sequence 19 and the 28 and 29 receivers.
- **Gate.** The Opus and Paul review gate remains open. Publishing the PR is not a merge.
