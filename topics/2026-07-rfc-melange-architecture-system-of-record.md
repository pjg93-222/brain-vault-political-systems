---
type: topic
title: "Melange architecture and system of record"
aliases: ["Melange architecture and system of record"]
category: "rfc"
status: "completed"
people:
  - "paul-goff"
actors:
  - "[[melange-fec-pipeline]]"
  - "[[moneyball-workbook]]"
  - "sentinel-collectors"
objective: "Record how the Melange/Moneyball tree was refactored (paths.py, moneyball_core kernel, verification protocol), how the system of record was inverted so ranks_python.json is the rank authority and the workbook a self-refreshing view, the final model config and committee-pillar formula, the 3-phase REORG @a05a8e4, and the manifest/sentinel regeneration mechanics."
created_at: 2026-07-01
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/system-manifest-sentinel-lane-2026-09-06.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\system-manifest-sentinel-lane-2026-09-06.md", sha256: "b7c76107f8d14d2ec5f378df463bc8a2a967cd5dcb4b0d2797c74d6b0ba5b788"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reorg-phase0-tripwires-2026-08-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reorg-phase0-tripwires-2026-08-04.md", sha256: "a554fe2a6df1883dad24aa1fb9b973f83ee9adf2a4418b32b516f46575fc430c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-architecture.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-architecture.md", sha256: "bb9bffef2af3af7152fdcf5bf852e8bef18952f37abaf7f978ae0b596ed25ee5"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-model-config.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-model-config.md", sha256: "c03f7392e0186530056021fc752ad16ceccc0d652f6af1457ed31447e9527056"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-committee-scoring.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-committee-scoring.md", sha256: "1355480b1a6f9efc6320bbd4af506e14182257013cfb1237170fa29f75b8368c"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/backend", "category/rfc"]
---

# Melange architecture and system of record

> Architecture history of the Moneyball CU-influence model (tree `C:\Users\pgoff\OneDrive\Desktop\Melange Systems`): the 2026-07-02 refactor, the Phase 2 inversion that made `ranks_python.json` the rank authority (workbook = view, NO COM anywhere), the final model config, the committee-pillar formula, the 2026-08-04/05 three-phase REORG (@a05a8e4) with stale-import tripwires, and the manifest/sentinel regeneration mechanics (2026-09-06).

## Parts

- [[2026-07-rfc-melange-architecture-system-of-record-refactor-and-inversion]] — The July 2026 refactor and the inversion of the system of record: what moved where, the phase-2 inversion, the audit S2 remedies, roadmap item 9 phase 1, the staff directory and desk CRM, and the audit runbook.
- [[2026-07-rfc-melange-architecture-system-of-record-model-config-and-committee-formula]] — The final Moneyball model configuration as of 2026-06-30, pillar by pillar with the allocator, the engine constants, the press category weights and the superseded COM how-to, and the committee-pillar scoring formula of 2026-07-01.
- [[2026-07-rfc-melange-architecture-system-of-record-reorg-and-manifest]] — The REORG phases, tripwires and lessons of 2026-08-04/05, and the system manifest and sentinel lane of 2026-09-06.

## Context

- Moneyball = credit-union legislative-influence model at `C:\Users\pgoff\OneDrive\Desktop\Melange Systems` (workbook `Moneyball Main Version - Blended.xlsx`, dashboard `Moneyball.html`, engine in `fec/`). It is the code home of the project [[melange-systems]]; the engine lives in the pipeline actor [[melange-fec-pipeline]] and the workbook is [[moneyball-workbook]].
- Architecture review: `ARCHITECTURE_REVIEW_2026-07-02.md`; user "Proceed down list". Refactor executed 2026-07-02, VERIFIED behavior-preserving (kernel tests 28/28 + pipeline + audit 50/50 + **zero rank delta** across 533 members); see [[zero-rank-delta-verification]].
- Phase 2 (commits 23c48ea + fd9f3d6, user sign-off) INVERTED the system of record: `ranks_python.json` = THE rank authority; the workbook is a self-refreshing VIEW.
- Model dials of the pillar stack (weights, committee formula) are recorded in [[2026-07-rfc-melange-architecture-system-of-record-model-config-and-committee-formula]]; the two axes the model distinguishes are in Influence vs alignment axes. Owner/decision authority: Paul Goff.
- **Superseded guidance (resolution 5):** the June / 2026-07-02 guidance that workbook writes go through Excel COM (win32com, Excel must be closed, `run_pipeline.py [--recalc]` with recalc step) is SUPERSEDED by "**NO COM anywhere**" (Phase 2, see Decisions). The older text is kept as a dated struck-through entry because it explains older commits/artifacts (`.PRE-*` / `BACKUP-*` workbook copies, COM-written columns).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[melange-fec-pipeline]] | Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch |
| [[moneyball-workbook]] | Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority). |
| Sentinel collectors | Sentinel press/hearing collectors and bill ingestion feeding the Melange workbook; promotion and scheduler re-enable are Paul-gated |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- Influence vs alignment axes - Modeling principle: rank = INFLUENCE, per-category stance = ALIGNMENT; two separate axes, underdogs surface in a separate efficiency view.
- [[zero-rank-delta-verification]] - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean

## Related Topics

- Melange data-collection lanes - Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills

## History

| Date | Event |
|---|---|
| 2026-06-29 | Dashboard made phone-friendly (`@media(max-width:640px)` in `make_member_desk.py` + `make_dashboard_html.py`; SNA canvas touch pan/pinch/tap; phones default to the member desk, controller `innerWidth<=700`). Pillar weight sets oscillated all session (see Pillar weights in [[2026-07-rfc-melange-architecture-system-of-record-model-config-and-committee-formula]]). |
| 2026-06-30 eve | Model state rewound by the user to the 6/29 10AM version, then rebuilt with bug fixes: leg-stance gating ON (`fec/apply_leg_stance.py`), committee chair/ranking x1.5 applied by hand, allocator UNCAPPED. |
| 2026-07-01 | Press attribution + Press% normalization fixed (user-approved): own-domain-only press (drops 819 third-party rows, 816 `americascreditunions.org`), Press% -> signed `=C3/MAX($C$3:$C$535)`. Leg raw/max TRIED and REVERTED. Committee-pillar formula reverse-engineered (288/288). |
| 2026-07-02 | **Architecture refactor executed**: git repo, `fec/paths.py`, `fec/moneyball_core.py` kernel, 28 kernel tests, verification protocol. Tiered press category weights ratified (row 535). PERS_NONE 0.45 ratified. Workbook TRUNCATION incident (Excel-save/OneDrive collision, 2.2 MB). Audit S2 remedies @bf4a703 that evening. |
| 2026-07-02 | Roadmap No. 9 Phase 1 @279f5e5: `fec/compute_pillars.py` reproduces the entire workbook rank chain in Python, parity EXACT 533/533 ranks, scores < 1e-7, wired into `audit_full` (audit = 52 checks, kernel = 30). Staff directory + desk CRM @eaefc2f. `/fable-audit` runbook + weekly automation @9adc4c1 (proof run: all steps OK, 9 min, 0/533 rank movement). |
| 2026-07-02/03 | Second-wave adoption + template extraction (commit e329e19); **Phase 2 COMPLETE** (23c48ea + fd9f3d6): system of record inverted, NO COM anywhere. |
| 2026-08-04 | REORG Phase 0 tripwires @15560ea; Phase 1 @fa66617; Phase 2 batches A-E (@923e75c, @2c7766d, @ec6e9ab, @caba359, @40cb28c), close-out @021bb9f; Phase 3 pilot @0e19f1e; chain resolver @4c79a3c; audit/ domain @0fd69cb. Both Phase 0 open items closed @a14543e; legislation/culling lane @5e87439; all 20 orphans resolved, MERGED TO MAIN @4647555. |
| 2026-08-05 | **REORG COMPLETE @a05a8e4** (all 3 phases done + merged: 9 code domains, 9 data domains, 8 test domains, core = fec root with 9 hubs + 2 entrances). Post-completion @b6b61fc: 3 attic candidates attic'd, closure constants centralized. |
| 2026-09-06 | System manifest lane: `:966` dedup defect FIXED (UNCOMMITTED in the live tree), D-015 cost baseline measured (~147-167 s), self-falsifying sentinel behavior documented. |

## Decisions

- **Project is a git repo** (branch main; `.gitignore` excludes all data artifacts + `fec/govinfo_key.txt` secret; `backups/` excluded). Commits at each phase: use `git log` / `git diff`, not `.PRE-*` file copies.
- **`fec/paths.py` is the single path source** (env overrides `MONEYBALL_ROOT` + `MONEYBALL_DRAFT`, the Draft Systems R-pipeline root; see `draft-systems-r-pipeline`). 193 literals across 95 files replaced with `MB_ROOT` / `MB_DRAFT`; every fec script has a one-line bootstrap header (sys.path insert + import). Downloads one-shot refs left literal.
- **Shared kernel `fec/moneyball_core.py`** (lazy + cached; no import-time IO). **`cpf_diffusion` vs `cpf_pressure` are two named physics, never merge.**
- **System of record INVERTED (Phase 2, user sign-off):** `ranks_python.json` = THE rank authority (`compute_pillars --write`; engines read `MC.scores()` / `ranks()`); the workbook is a self-refreshing VIEW (all writers set `fullCalcOnLoad`); **NO COM anywhere** (`sync_stance_g` rewritten with openpyxl; RECALC step deleted; `--recalc` = retired no-op).
- ~~Workbook edits go through Excel COM (win32com) and require Excel to be CLOSED (an open workbook locks the file, PermissionError); regen = `fec/run_pipeline.py [--recalc]` with COM recalc, expect 48/48. Recalc zip-validates the workbook and retries once.~~ (2026-07-02, source `moneyball-model-config`) - superseded 2026-07-02/03 by Phase 2 "NO COM anywhere" (resolution 5); kept because it explains the `BACKUP-*.xlsx` files, the Excel-lock handling in `weekly_refresh`, and COM-era commits.
- Also from the same superseded era (June 2026): the workbook CFPB split / directional edits were done through "Excel COM (PowerShell win32com)" with the InvalidCastException workaround (write numbers as invariant-culture numeric STRINGS via `.Formula`); no longer the way writes are done.
- **Bipartisanship is COSPONSOR-ONLY again (S2-01, @bf4a703):** the bundle had silently computed it from the AUG graph (social/press edges leaked into bpf -> cpf_diffusion / tgt / coalition feedback); `BP_SRC=aug` env restores the augmented definition if the user ever ratifies. Effect: 19 optimizer allocs shifted, 17/17 frontier paths, IM headline Hill -> Moreno, RANKS UNTOUCHED.
- **Pillar weights are the user's domain, never relabel as "wrong"** (see Pillar weights in [[2026-07-rfc-melange-architecture-system-of-record-model-config-and-committee-formula]]; also `press-classification-user-domain`).
- **Hubs stay at fec root** (REORG core decision): `paths` has 273 importers and `moneyball_core` 156; a `core/` dir = ~500 rewrites for zero gain. Revisit only if hub-and-spoke import enforcement is wanted.
- **IDENTITY vs LOCATION law (REORG)**: the immutable baseline manifest keeps identity; `fec/audit/live_relocations.py` (27 entries) redirects live reads for decay / downstream / presync; planning inherits via drift-ledger rows; weekly-refresh closure compares on BASENAME (downstream identities carry `fec/` prefixes).
- **Codex lane laws (Paul, permanent, in the metaloop skill):** always xhigh + priority (never pass a lower effort override; global config already sets both); max effort / full mode is the metaloop default. **Codex escalation protocol:** flaws / errors / obvious improvements -> ESCALATIONS section to Fable; POTENTIAL improvements -> Fable consults Paul FIRST.
- Attic decision (Paul: "attic those 3"): `repair_institutional_influence`, `repair_sublayer_categories`, `update_primacy_fixture` now in `fec/attic/` (all three scanners verified to exclude attic).
- Manifest regeneration: before touching the manifest, BACK IT UP, run the **live tree's** producer by absolute path, and verify `generator_sha256` against the on-disk producer; never read a post-regen 582/0 as proof the data is healthy (details in the Manifest section).

## Next Steps

- [ ] Paul decision pending: static gate rejecting stale moved-basename imports repo-wide (decision 1 of the Codex escalation protocol).
- [x] Paul decision 2 (`main()` guard on `legacy_workbook_audit` so import cannot execute its 22 checks): done by Phase 3 completion ("legacy_workbook_audit import-inert (main() guard)"); decision 1 (static gate) was met by `audit_stale_imports.py` = kernel check No. 150.
- [ ] Resolve the crown-law workbook stance column mismatch (Paul's domain, separately tracked) so `audit_full` goes 199/0 and the Saturday weekly refresh stops ending Last Result 1.
- [ ] Open: `fec\tests\test_primacy_tier.py` writes `source.json` into the repo root.
- [ ] Open: unresolved flake `test_legislation_base_network` (fails ~2/3 in-kernel runs; arm `RUNTESTS_DUMP_DIR`).
- [ ] Gap: the committee re-weight (chair/ranking x1.5, Small Business -> Highly) was done by hand in Excel and is NOT yet scripted.
- [ ] Manifest lane: decide whether to lift the D-015 cap on sentinel hashing (see Manifest section in [[2026-07-rfc-melange-architecture-system-of-record-reorg-and-manifest]]); rule on the audit_full self-written pinned sentinels risk; real remedy for the 8 `A2b` failures = exclude chain outputs from sentinel duty; commit the uncommitted `:966` fix.
- [x] Remaining Phase 3 domains (district, stance, members, legislation, lobbying, surfaces, core decision) all completed 2026-08-05.
- [ ] Optimization candidate: cache the frozen LegNorm sheet (no-COM pipeline took ~19 min on a cache-dead workbook due to slower parses).
- [ ] Windows task `MoneyballWeeklyRefresh` (Sat 6:00 AM) next run 2026-08-09 was expected to end Last Result 1 while the crown-law failure stands.
