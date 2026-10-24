---
type: fleeting
title: "Desktop no password lane (2026-10-21)"
aliases: ["desktop-no-password-lane-2026-10-21"]
source: "session"
captured_at: 2026-10-21
created_at: 2026-10-21
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/desktop-no-password-lane-2026-10-21.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\desktop-no-password-lane-2026-10-21.md", sha256: "612e0ec1104eb323106852f5d8a510e2e7dd647569ea6f80d1f1af82ace7b0c1"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Desktop no password lane (2026-10-21)

> 10-21 Paul asked to drop the Terrier password and make Melange/Mentat a one-time verification; Melange+Mentat shipped as desktop 1.0.10, Terrier HELD on a lineage split Paul must rule on

## Content

Paul (2026-10-21): "get rid of the password option for terrier? And Mentat and Melange, just a one time verification?" then "Finish it up, Fable oversees."

**Shipped (Melange + Mentat):** desktop-v1.0.10, ledger seq 6, published 10-21 ~08:15Z. Device-trust record (`access-device` credential scope) bound to grantId+deviceId; password asked once per computer; "Lock workspace" forgets it. Melange PR #27 merged `9c1c94890` (CodeRabbit race fix `1eca83442`); client commit `59fc562cb`; runtime bootstrap helper `native_credentials.py` refreshed via a `REFRESH_BOOTSTRAP` step added to inject.cjs (inject-only would keep the prompt). Release folder `Documents\Desktop-Installers-2026-10-21`, `RUNBOOK-1.0.10.md`. 1.0.8 and 1.0.9 had already shipped 10-20 — the "Desktop 1.0.7" memory was stale. Paul lands it by open → close → reopen each app (updater), then one last password.

**Terrier HELD at 1.0.9 — why:** my change merged into Geo `claude/walk-list` (PR Geo#2, `505c2d7a`), but the shipped Terrier runtime's server is Geo **main** lineage (`78c45b710` = desktop-preview-v1.0.7, tip `ff7dee3`), diverged from walk-list (merge-base `a290240`; main 35 ahead, walk-list 2 ahead; walk-list lacks `desktop_owner.py`). Main lineage uses the D2 owner-password-store design; its bootstrap `desktop_backend.py` comes from Melange branch `tooling/terrier-1.0.6` (blob cf75ec3e, not on main). `ops/release_config.json` says `terrier_ref: claude/walk-list`; releases record Geo main. Three source designators in use. Also: shipped Terrier 1.0.9 owner launch likely broken (`desktop_backend.py:392` refuses `--legacy-owner` w/o `--owner-root`; origin/main `runtime.cjs:53` passes only the former). Paul's local-main `cc5f286b9` (10-20 23:01) fixes it; a signed unpublished Terrier 1.0.10 from it sits in `Desktop-Installers-2026-10-20\dist-1.0.10\terrier` (latest.yml hash ≠ signed exe). `cc5f286b9` not on origin.

**Why:** pushing more Terrier work on the wrong lineage wastes it; which lineage is canonical is Paul's ruling (voter PII app).

**How to apply:** Terrier passwordless needs (1) Paul's lineage ruling, (2) re-apply `password_lock_disabled` default on that lineage (D2 design if main), (3) land `cc5f286b9` via ReleasePublish PR, (4) Terrier 1.0.10 seq 6 build with runtime server refresh. Open: CodeRabbit's "durably revoke device record on failed Lock delete" (Paul's call); PR for version bump `desktop/release-1.0.10`. Related: `desktop-releases-1-0-7-2026-10-19`, `desktop-invite-code-lane-2026-10-20`, `melange-public-repo-unfiltered-branches-2026-10-18`, `land-means-in-the-app-2026-10-15`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): Melange+Mentat SHIPPED 1.0.10 seq 6 (verify once/computer);Terrier HELD: change on Geo walk-list but app ships Geo main lineage;lineage ruling=Paul;cc5f286b9 not on origin

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `desktop-no-password-lane-2026-10-21.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
