---
type: concept
name: "Mandatory desktop release signing"
aliases: ["Desktop signing release contract", "Required publisher certificate", "Melange Mentat Terrier signing rule"]
description: "Mandatory release gate for Melange, Mentat and Terrier: approved publisher signatures, complete native payload verification, preserved vendor signatures and exact distributed-byte evidence before publication."
related_to: ["[[melange-systems]]", "[[mentat]]", "[[terrier]]"]
sources: []
authority: "Explicit user instruction, 2026-10-22"
evidence_status: "NORMATIVE-USER-INSTRUCTION"
updated_at: 2026-10-22
updated_by: "preserve@agent"
tags: ["type/concept", "domain/security"]
---

# Mandatory desktop release signing

> [!danger] Mandatory publication blocker — effective 2026-10-22
> Every distributed Melange, Mentat and Terrier Windows build MUST satisfy this contract. Stop publication, delivery and update promotion if any required signature or final-artifact check fails or lacks evidence. An outer installer signature alone is insufficient. Do not waive this gate for a deadline, test build, preview or apparently working local installation.

## Approved application publisher

| Identity | Required value |
|---|---|
| Certificate SHA-1 thumbprint | `[private — see knowledge vault]` |
| Certificate subject | `CN=Melange Systems Desktop Release (self-signed)` |
| Ownership | Application-owned and newly signed native binaries use this exact publisher certificate |

The thumbprint identifies the approved public certificate; it is not an artifact checksum. Use SHA-256 for each distributed file. A matching display name without the exact thumbprint does not satisfy the publisher rule. Certificate replacement or rotation requires an explicit user decision and a dated contract update; do not silently generate or substitute another publisher.

## Required release gates

1. **Enumerate the complete final executable payload.** Inspect the finished installer and every nested archive or packed application that can supply native code. Include the outer installer, generated uninstaller, updater executables, main application, elevation helper, child processes, embedded installer plugins, bundled runtimes and native libraries. Detect Windows PE files by their headers, including `.exe`, `.dll`, `.pyd`, `.node`, `.ocx` and files without a conventional suffix. Do not rely on filename extensions or the packager's signing log as the entire census.
2. **Verify every native binary.** Every PE must have a valid Windows signature in the recorded verification environment. Application-owned binaries, including outer installer, uninstaller, updater, main executable and helpers, require the exact approved publisher above and a valid trusted timestamp. Previously unsigned bundled native binaries must be signed with that publisher and timestamp before packaging. An unsigned file, invalid signature, unexpected application publisher, missing required timestamp or uninspected native file blocks the release.
3. **Preserve valid vendor signatures.** Previously valid third-party binaries retain their original bytes and signer; do not replace valid Microsoft, Python or other vendor signatures with the application publisher. Bind the vendor baseline and candidate with SHA-256. Record whether validation used an embedded Authenticode signature or a Windows catalog. Catalog validation on the build PC is environment-specific and does not prove that a recipient has the same catalog or policy.
4. **Verify the final distributed bytes independently.** After all signing, version-resource edits, compression and packaging, hash the final installer, extract it without running it, and verify the complete native census and expected file set. Bind the evidence to the installer SHA-256, bytes, application/version, source commits, build result and verifier implementation. A previous build's receipt or a successful signing subprocess is insufficient. Check source, configuration and non-native payload integrity; permit only explicitly reviewed version, integrity-resource and Authenticode changes in a signing-only rebuild.
5. **Keep delivery and publication evidence separate.** Perform the required isolated packaged-app smoke check and verify update metadata against the same final bytes. For hosted assets, download/read back and verify their SHA-256 before making the release public or promoting an update channel. Any mutation after verification invalidates the evidence and requires a fresh check. Release new immutable versions; do not overwrite an already distributed asset with different bytes.
6. **Fail closed.** Build and publication tooling must enforce these gates and produce retained evidence. Missing tools, unavailable signing material, failed timestamping, incomplete extraction, unexplained differences or ambiguous results are failures. Never publish an unsigned fallback or promote a preview to the stable `Latest` release. A private draft may be used for upload verification, but it must remain private until all release gates pass.

## Recipient policy and key custody

A valid signature and matching certificate establish publisher and byte-integrity evidence. They do not establish that ThreatLocker, Windows application control, SmartScreen or another recipient policy allows execution. IT approval of a certificate must not be restated as proof that a particular file, child binary, application rule, endpoint group or deployed policy is allowed. Record the exact denied path and artifact SHA-256 when available; distinguish a confirmed outer-installer denial from an unconfirmed child-process cause. Do not disable security controls or weaken trust to obtain a passing result.

Only the public certificate and its public identifiers may be distributed or stored in this public brain. Never place private keys, PFX/P12 bundles, signing passwords or credentials in notes, source repositories, installers, release assets or reports. Keep signing material in the authorized protected signing environment.

## Authority and scope

On 2026-10-22, the user instructed: **“The signing certificate needs to be an imposing rule in the obsidian brain.”** This is a newly issued standing release constraint, recorded directly from the current user instruction. It is not inferred from old release memories and is not evidence that a build or deployment has passed.

This rule constrains work on the three applications; it does not by itself grant permission to publish an unrelated release, change repository visibility, rotate certificates, change a recipient's policy or export private signing material. Existing task authorization and the other project integrity contracts still apply.

## Where it applies

- [[melange-systems]] — all Windows desktop installers, updates and their packaged native runtime.
- [[mentat]] — all Windows desktop installers, updates and their packaged native runtime.
- [[terrier]] — all Windows desktop installers, updates and their packaged native runtime.
