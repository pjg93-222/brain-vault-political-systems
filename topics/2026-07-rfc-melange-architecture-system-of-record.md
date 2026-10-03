---
type: topic
title: "Melange architecture and system of record"
aliases: ["Melange architecture and system of record"]
category: "rfc"
status: "completed"
people:
  - "[[paul-goff]]"
actors:
  - "[[melange-fec-pipeline]]"
  - "[[moneyball-workbook]]"
  - "[[sentinel-collectors]]"
objective: "Record how the Melange/Moneyball tree was refactored (paths.py, moneyball_core kernel, verification protocol), how the system of record was inverted so ranks_python.json is the rank authority and the workbook a self-refreshing view, the final model config and committee-pillar formula, the 3-phase REORG @a05a8e4, and the manifest/sentinel regeneration mechanics."
created_at: 2026-07-01
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/system-manifest-sentinel-lane-2026-09-06.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\system-manifest-sentinel-lane-2026-09-06.md", sha256: "b7c76107f8d14d2ec5f378df463bc8a2a967cd5dcb4b0d2797c74d6b0ba5b788"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reorg-phase0-tripwires-2026-08-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reorg-phase0-tripwires-2026-08-04.md", sha256: "a554fe2a6df1883dad24aa1fb9b973f83ee9adf2a4418b32b516f46575fc430c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-architecture.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-architecture.md", sha256: "bb9bffef2af3af7152fdcf5bf852e8bef18952f37abaf7f978ae0b596ed25ee5"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-model-config.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-model-config.md", sha256: "c03f7392e0186530056021fc752ad16ceccc0d652f6af1457ed31447e9527056"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-committee-scoring.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-committee-scoring.md", sha256: "1355480b1a6f9efc6320bbd4af506e14182257013cfb1237170fa29f75b8368c"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/topic", "status/completed", "domain/backend", "category/rfc"]
---

# Melange architecture and system of record

> Architecture history of the Moneyball CU-influence model (tree `C:\Users\pgoff\OneDrive\Desktop\Melange Systems`): the 2026-07-02 refactor, the Phase 2 inversion that made `ranks_python.json` the rank authority (workbook = view, NO COM anywhere), the final model config, the committee-pillar formula, the 2026-08-04/05 three-phase REORG (@a05a8e4) with stale-import tripwires, and the manifest/sentinel regeneration mechanics (2026-09-06).

## Context

- Moneyball = credit-union legislative-influence model at `C:\Users\pgoff\OneDrive\Desktop\Melange Systems` (workbook `Moneyball Main Version - Blended.xlsx`, dashboard `Moneyball.html`, engine in `fec/`). It is the code home of the project [[melange-systems]]; the engine lives in the pipeline actor [[melange-fec-pipeline]] and the workbook is [[moneyball-workbook]].
- Architecture review: `ARCHITECTURE_REVIEW_2026-07-02.md`; user "Proceed down list". Refactor executed 2026-07-02, VERIFIED behavior-preserving (kernel tests 28/28 + pipeline + audit 50/50 + **zero rank delta** across 533 members); see [[zero-rank-delta-verification]].
- Phase 2 (commits 23c48ea + fd9f3d6, user sign-off) INVERTED the system of record: `ranks_python.json` = THE rank authority; the workbook is a self-refreshing VIEW.
- Model dials of the pillar stack (weights, committee formula) are recorded below; the two axes the model distinguishes are in [[influence-vs-alignment-axes]]. Owner/decision authority: [[paul-goff]].
- **Superseded guidance (resolution 5):** the June / 2026-07-02 guidance that workbook writes go through Excel COM (win32com, Excel must be closed, `run_pipeline.py [--recalc]` with recalc step) is SUPERSEDED by "**NO COM anywhere**" (Phase 2, see Decisions). The older text is kept as a dated struck-through entry because it explains older commits/artifacts (`.PRE-*` / `BACKUP-*` workbook copies, COM-written columns).

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[melange-fec-pipeline]] | Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch |
| [[moneyball-workbook]] | Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority). |
| [[sentinel-collectors]] | Sentinel press/hearing collectors and bill ingestion feeding the Melange workbook; promotion and scheduler re-enable are Paul-gated |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[influence-vs-alignment-axes]] - Modeling principle: rank = INFLUENCE, per-category stance = ALIGNMENT; two separate axes, underdogs surface in a separate efficiency view.
- [[zero-rank-delta-verification]] - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean

## Related Topics

- [[2026-07-feature-data-collection-lanes]] - Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills

## History

| Date | Event |
|---|---|
| 2026-06-29 | Dashboard made phone-friendly (`@media(max-width:640px)` in `make_member_desk.py` + `make_dashboard_html.py`; SNA canvas touch pan/pinch/tap; phones default to the member desk, controller `innerWidth<=700`). Pillar weight sets oscillated all session (see Pillar weights). |
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
- **Pillar weights are the user's domain, never relabel as "wrong"** (see Pillar weights; also `press-classification-user-domain`).
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
- [ ] Manifest lane: decide whether to lift the D-015 cap on sentinel hashing (see Manifest section); rule on the audit_full self-written pinned sentinels risk; real remedy for the 8 `A2b` failures = exclude chain outputs from sentinel duty; commit the uncommitted `:966` fix.
- [x] Remaining Phase 3 domains (district, stance, members, legislation, lobbying, surfaces, core decision) all completed 2026-08-05.
- [ ] Optimization candidate: cache the frozen LegNorm sheet (no-COM pipeline took ~19 min on a cache-dead workbook due to slower parses).
- [ ] Windows task `MoneyballWeeklyRefresh` (Sat 6:00 AM) next run 2026-08-09 was expected to end Last Result 1 while the crown-law failure stands.

## Refactor of 2026-07-02: what moved where

- **Paths:** `fec/paths.py` = single source; env overrides `MONEYBALL_ROOT` + `MONEYBALL_DRAFT` (Draft Systems R-pipeline root). 193 literals across 95 files replaced with `MB_ROOT` / `MB_DRAFT`; every fec script has a one-line bootstrap header (sys.path insert + import). A file literally named `fec/NUL` (Windows reserved) once blocked `git add`; rm via Git Bash works.
- **Shared kernel `fec/moneyball_core.py`** (lazy + cached; no import-time IO): congestion / members / name2bio / bio2name, `party()`, `bpf()`, `receptivity()` / `rc()`, `load_network()` (mean-symmetrized; CONTRACT: every member has an entry, isolated = {}), **`cpf_diffusion` vs `cpf_pressure` (two named physics, never merge)**, sm64 CRN, `build_P()`, PERS (PERS_NONE dial), IMP (18 cats), blocks / BLOCKCAT / CATBLOCKS, SGATE / gate. Adopted in 10 live engines. NOT yet adopted at first (second wave): scenario, cosponsor_route, lt_priming, method_audit, assemble_viz, press_engagement_layer, press_hcoi, stance_dynamics, big5_traits (party loader).
- **Adoption gotchas (cost 3 pipeline failures, all caught by the gate):** (1) old per-file loaders were defaultdicts, so members with no edges returned {}; the core dict must setdefault every member; (2) blocks -> BLOCKCAT span replacements swallowed the `labels=` line between them in 3 files; (3) cascade engines use `MC` as the Monte-Carlo count var, so the core module alias is `MBC` there and `MC` elsewhere.
- **Layout:** `fec/attic/` = 36 dead one-shots (git mv, history preserved). `audit.py` is LIVE (an `audit_full` subprocess dependency; restored after a mis-attic). `sync_stance_clean.py` + `apply_stance_guard.py` are hard-guarded (`sys.exit` at top). Workbook backups -> `backups/` (blend + future writers point there). `fec/tests/run_tests.py` = 28 kernel checks, zero deps, run before any pipeline after code changes.
- **Spec:** `MATHEMATICAL_SPECIFICATION.md` rewritten as law-of-the-system (authoritative-code table + '-' ontology + composed-post formula + determinism/workbook contracts + dial registry). Old long-form spec: git commit 62a209e.
- **Verification protocol (canonical):** code change -> `python fec/tests/run_tests.py` (28) -> `python fec/run_pipeline.py` -> rank delta vs last `ranks_*.json` = ZERO (unless the change is SUPPOSED to move ranks) -> audit 50/50. See [[zero-rank-delta-verification]].
- **COMPLETED same day (commit e329e19):** second-wave adoption (scenario / cosponsor_route / lt_priming full; method_audit / assemble_viz network-only; scenario's cascade P deliberately KEPT LOCAL, it predates receptivity edge_mult and adding it = behavior change, a separate decision). Template extraction: `make_dashboard_html` 52KB -> 1KB, `make_member_desk` 89KB -> 29KB, to `fec/templates/*.tpl` via the `_tpl()` loader; VERIFIED by hash-identical regenerated HTML (all three outputs byte-deterministic). Still local by design: press_engagement_layer / press_hcoi in-function loaders, stance_dynamics, big5 numeric party map, assemble_viz legacy PERS.
- Heredoc transforms are BANNED: a heredoc-injected backspace control char in a glob path cost a debugging cycle; transforms go in scratchpad files.

## Phase 2: system of record inverted (commits 23c48ea + fd9f3d6)

`ranks_python.json` = THE rank authority (`compute_pillars --write`; engines read `MC.scores()` / `ranks()`); workbook = self-refreshing VIEW (all writers set `fullCalcOnLoad`); **NO COM anywhere** (`sync_stance_g` rewritten with openpyxl; RECALC step deleted; `--recalc` = retired no-op).

**CRITICAL FILE PHYSICS learned:**

1. **openpyxl saves STRIP cached formula values**: after sync / blend, `data_only` reads of FORMULA cells (Blended names / O / E / F, R&A col C, normalized cells) return None until the user opens Excel; TYPED cells survive (R&A names + col G, AB dials, Press Raw, row-535 weights). This was the dragon COM-recalc had been papering over.
2. **openpyxl `read_only` + random `.cell()` = O(sheet) per call** (640 s pathology) AND misreads openpyxl-saved files; never use `read_only` for random access.

Resolution: O / E / F via `pillar_inputs_snapshot.json` (refreshed while the cache is alive; fallback when dead, CORRECT since O/E/F change only via user Excel edits which revive caches; auto-bootstrap from the newest cache-alive `backups/` copy); roster from R&A col A; chain = authority BEFORE the cache-killing sync; `audit.py` view-aware (allocation checks skip when stale, ranks from authority); S2-04 repointed to R&A. VERIFIED: snapshot-mode ranks == baseline EXACT 0/533, pipeline end-to-end no-COM (~19 min on a cache-dead workbook, slower parses; optimization candidate: cache the frozen LegNorm sheet), audit 52/52, kernel 30/30. IM headline Moreno -> Tim Scott = known col-G two-pass convergence, not drift.

(Later consequence: the pillar-inputs snapshot staleness is invisible until a recalc; see the 2026-07-16/17 Sub Layer repair in [[zero-rank-delta-verification]] and `pillar_inputs_snapshot` stale-warn >7d / audit FAIL >14d guards.)

## Audit S2 remedies (commit bf4a703, 2026-07-02 evening)

- **S2-01** bipartisanship = COSPONSOR-ONLY again (see Decisions; `BP_SRC=aug` restores).
- **S2-02** loud guards on missing big5 / electoral_plays inputs.
- **S2-03** `MC.dump_atomic` (tmp + `os.replace`) at ALL 14 artifact writers; kernel tests now 30.
- **S2-04** audit check workbook-rows == roster.
- **S2-05** `rebuild_press_cache.py` (refuses post-blend sources via the Z1 check).
- **S3:** 58 unused imports pruned across 28 files.
- Verified: kernel 30/30 x2, pipeline x2 (run 2 propagates the corrected bp: the bundle writes `bipartisan.json` LAST, so bp fixes always need two runs), audit clean x2, zero rank delta x2.

## Roadmap No. 9 Phase 1 (commit 279f5e5)

`fec/compute_pillars.py` reproduces the ENTIRE workbook rank chain (raw -> pos/neg-max normalization -> SUMPRODUCT pillar -> Press% / Leg% / Infl% / Demo% -> score -> rank) in Python; **parity EXACT 533/533 ranks, scores < 1e-7**, wired into `audit_full` as a formula-drift tripwire (**audit = 52 checks**, kernel tests = 30). KEY EMPIRICAL PIN: Excel `PERCENTRANK(...,5)` truncates to 5 **DECIMAL** digits, NOT significant digits (94 sub-0.1 members exposed this). Remaining for full No. 9 was the write path (Python computes, workbook becomes a rendered view; retires the COM-recalc / OneDrive failure class), which needed user sign-off since it inverts the system of record (granted, Phase 2). Also this pass: README rewritten to post-refactor reality (S3-07; write-only artifacts designated diagnostics-only per user), gold queue party from roster not the stale bundle (S3-04), bare except narrowed (S3-02; the commit message of bf4a703 had over-claimed this), receptivity docstring now matches the graded-shrinkage code, spec dials +SOC_VOLFLOOR / SOC_MEN_W / BP_SRC.

## Staff directory + desk CRM (commit eaefc2f)

`fec/build_staff_directory.py` weaves Quorum staffer exports (Downloads 45-52; `STAFF_SRC` env) into `staff_directory.json`: 5,773 staffers matched to ALL 533 offices via 'Member Works For' with a never-guess ladder (quoted-nick strip, accent fold, NICKF nickname map in BOTH directions since the roster may hold the nickname e.g. 'Mike Kennedy', leadership prefixes Leader / Whip / Speaker / Commish with chamber inferred from the district token, surname + chamber-unique fallback, 'pablo jose hernandez' alias). Only AS / GU / VI delegates unmatched (not in roster, correct). Industry star = title regex; 'Financial Administrator' excluded (office ops). Member-desk Staff section renders per-staffer cards (gold outline = contacted toggle, star auto + toggle, notes, media links, meeting flag, filter box); 'In contact' nav panel groups meeting-flagged staffers by office with export / import; state in localStorage `mdesk_staffdir_v1` (data-act delegated handlers in `make_member_desk_00.tpl`). Desk `L()` helper RETURNS PARSED JSON (not a path); do not double-load. Browser-verified via preview (Tim Scott: 18 cards, Tax Counsel auto-star; gold / note / panel round-trip).

## Audit runbook + weekly automation (commit 9adc4c1)

- `/fable-audit` project slash command (`.claude/commands/fable-audit.md`) = the extensive audit + TRUE RUN-THROUGH mission for any future session: baselines (kernel 30 / audit 52 / compile sweep), run-through gates (all-OK chain, clean audit, ZERO unexplained rank delta, artifact-hash stability, determinism spot), P1-P5 sweeps incl. UI smoke, known-benign registry, verified fix-lane protocol.
- **Windows Task Scheduler task `MoneyballWeeklyRefresh`** (Sundays 06:00 at 2026-07-02; `schtasks /Delete /TN MoneyballWeeklyRefresh /F` to remove) runs `fec/weekly_refresh.py`: incremental CREC (14d) / CHRG (60d) -> big5 -> social edges -> network -> blend (Excel-lock tolerant) -> full pipeline + ALL dashboards -> rank-movement line, logging to `weekly_refresh.log`. Proof run 2026-07-02: all steps OK, 9 min total, rank movement 0/533. Manual-only collectors (Quorum exports, X/Truth keys, Bluesky discovery) stay outside unattended scope. `.gitignore` uses `.claude/*` (not `.claude/`) so `commands/` is versioned. (Updated by the REORG note: the task runs Sat 6:00 AM as of 2026-08-05; see below.)

## Final model configuration (as of 2026-06-30 eve, source `moneyball-model-config` dated 2026-07-02)

Source description line: "Moneyball CU-influence model - final config, key files, COM/lock gotcha, and the spec-is-stale lesson".

State: the user rewound to the 6/29 10AM version, then rebuilt with the bug fixes below.

### Pillar weights (resolution 3: ALL THREE sets with dates and status)

Score weights live in the Blended Model (labels col AA / values col AB; the "Influence" pillar = committee, AB12 = 1 / AB13 = 0). **READ LIVE: they oscillated all session.** Weight choice is the user's domain: do NOT relabel as "wrong".

| Weight set | Dates | Status |
|---|---|---|
| `.40/.30/.20/.10` | 2026-06-29 | HISTORICAL. (Source wording for the sets seen in June: 0.40/0.35/0.20/0.05 on 6/30 afternoon, 0.20/0.40/0.30/0.10 mid/late 6/29; ordering Press / Committee-Influence / Legislative / Demo as listed in the source.) |
| `30/25/40/5` | ratified 2026-07-07 | LAST RATIFIED. Matches the live reading in this source (2026-06-30 eve): Press 0.30 / Committee-Influence 0.40 / Legislative 0.25 / Demo 0.05 (sum 1). |
| `45/10/40/5` | live in `ranks_python.json` config since 2026-09-03 | LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling. Never read this newest set as ratified. |

(The mapping of the brief's compact notation to pillar order is taken from the 06-30 source reading: Press / Legislative / Influence / Demo for `30/25/40/5`; verify against the live config before quoting.)

### Committee pillar (score as of 2026-06-30)

- **Committee score = (Membership + Leadership) / 2.** Leadership multipliers as of 2026-06-30 (user applied chair/ranking x1.5): Chair full 3.0 / sub 7.5, Ranking full 2.0 / sub 4.5, Vice full 1.0 / sub 2.0. Membership tier weights: Highly 3.0 / Moderately 1.8 / Slightly 0.9 (subcommittee = /6). ALL Small Business seats set to [Highly]. Reproduced 288/288.
- Influence pillar R = E/MAX(E) (committee-fix / CMTEFIX, `fec/apply_committee_fix.py`, applied live 2026-06-30; was PERCENTRANK double-percentile).
- GAP: the committee re-weight (chair/ranking x1.5, SB -> Highly) was done by hand in Excel, NOT yet scripted.

### Stance tier

Rank & Allocation col G = importance-weighted aggregate of the per-category stance matrix (`fec/sync_stance_clean.py`), a 10-tier ladder; NOT leg activity. The matrix aggregate is authoritative; **`apply_stance_guard.py` is SUPERSEDED** (it overwrites col G with an OLDER activity-based D3/C3-vs-dials 6-bucket formula that clobbers the per-category tiers; do NOT run it if honoring per-category stances). GOTCHA: **`category_stance.json` can be badly stale** (was 6/26 while the user's edits were 6/30); the user edits stances in the `Category Stance` sheet (A = member, B = General, C:S = 17 categories); rebuild the json FROM that sheet before any stance-dependent step (`sync_stance_clean`, `apply_leg_stance`). Also `sync_stance_clean.py` starts by restoring a PRISTINE PRE-STANCEGUARD backup over the workbook (destructive; adapt it to write col G only instead of running as-is).

### Legislative pillar

Leg-stance gating is ON (2026-06-30 eve, `fec/apply_leg_stance.py`): Blended Model col D overridden with static stance-signed leg raw = Sum IMP[topic] x activity x stanceMult; opponents go NEGATIVE (verified AOC -2.6, Welch -5.6, Marshall -5.9 -> bottom-decile Leg%), allies positive (Roger Williams +17). Reads `category_stance.json` (6/26, == Category Stance sheet, user-confirmed 2026-06-30). Was previously OFF (activity-only `=R&A!D`, un-gated). The `Legislative Score - Normalized` sheet is a FROZEN curated snapshot.

### Press pillar

De-duped, bills OUT. Source of truth = `Draft Systems\cu_press_stance_tone.csv`, **regenerated 2026-06-30 (2,388 rows, stance_src debate / human_label; NO `billstatus:` rows; `apply_press_dedup.py` filter now matches 0 to exclude, which is correct)**; de-dup total ~16.6 / ~1,030 nonzero (was ~15.97 / 1,012 on the Jun-24 3,701-row csv).

**2026-07-01 FIXED (user-approved):**

1. Attribution: press counts ONLY own-domain rows (`*.senate.gov` / `*.house.gov`); dropped 819 third-party, 816 = `americascreditunions.org` (the CU lobby's own site, mis-attributed to the 243 members its articles mention, so their pro-CU stance was counted as the member's; e.g. "Advocacy win: Marshall will not offer amendment" scored +support FOR Marshall). Own-domain press total ~9.12.
2. Press% percentile-rank -> signed `=C3/MAX($C$3:$C$535)` (mirror CMTEFIX). Result: Marshall No. 193 -> 473 (Press% -0.07), Welch No. 188 -> 374, AOC No. 184 -> 344.

Leg pillar: raw/max was TRIED on leg (J, P) 2026-07-01 and REVERTED (leg-stance raw is long-tailed, allies +17..+27, so value/MAX squashed the mid-board and floated disengaged skeptics UP: AOC No. 344 -> 191, Welch -> 279); back on PERCENTRANK. Leg-stance stays "muted" (AOC leg raw -2.58 -> Leg% 0.102 positive) but fine, since the press fix already ranks opponents low (final: AOC No. 344 / Welch No. 374 / Marshall No. 473). A winsorized normalizer (divide by 90th-pct magnitude, not max) would make leg bite without compression if ever wanted.

**Durable code:** `apply_press_dedup.py` (own-domain attribution filter), `apply_raw_max_norm.py` (press + committee raw/max), `apply_committee_fix.py` (CMTEFIX), `apply_leg_stance.py`. See `2026-06-feature-cu-stance-and-sentiment` for the stance side of the press pillar.

### Allocator

Blended Model col U: as of **2026-06-30 eve the live file is UNCAPPED: top-133 funded, flat $2.0M pot, NO $10k per-member cap** (user rewound to the pre-cap 6/29 version and chose to KEEP it; `apply_alloc_cap.py` NOT applied; max single alloc ~$25.8k). The $10k-cap / top-250 config exists only in the 6/30-final backup line (`apply_alloc_cap.py`, Cap = AB8 = 10000 / Fund-top-N = AB7 = 250 / fill-mult = AB14). Live-what-if sliders (in `fec/make_dashboard_html.py`, cusl / cosl) capped: CU money $20k, competitor / opposition $30k, both $1k steps.

### Calibrated engine constants (verify in the live `fec/*.py`, NOT the spec)

WM 0.35 / WP 0.65, MAXSHIFT 18, DTHRESH **11.25** (rescaled 2026-07-01), BSCALE 400k, edge half-sat +6, LELEV 0.8, optimize INC $500 / PMAX $10k, `cpf` = source-alignment (co-partisan 1.7 / out-partisan 0.5), receipts = 0 imputed to MEDIAN (not floored), PERS_NONE **0.45** (user-ratified 2026-07-02, Ally parity), IMPUTE_IND0 median imputation now in ALL of flip / frontier / salience.

### Press-pillar CATEGORY weights (row 535 of Press Release - Normalized): TIERED as of 2026-07-02 (user-ratified)

Literals sourced from the 'Topic Weights' sheet detailed table: Interchange / CU Tax Status / CCM 0.30, Charter / FOM 0.15, Exam / NCUA 0.10, medium 0.08, low 0.02-0.05. Before this they were flat 0.05 with THREE cells silently 0 via stray LET-formula remnants (audit-II W1). `audit_full` guards row 535 numeric-positive. **Media blend dials live: SOCIAL_SHRINK on (thin-cat nz/15), RT_W 0.5.**

**Why/lesson:** `MATHEMATICAL_SPECIFICATION.md` was a full calibration BEHIND the code all session; always check constants against the live code. (Refreshed 2026-06-29; audit notes 5.A/7.A resolved.)

### Phone-friendly dashboard (2026-06-29)

Responsive: `@media(max-width:640px)` in `make_member_desk.py` + `make_dashboard_html.py`; SNA canvas has touch pan / pinch / tap (was mouse-only); phones default to the member desk (controller `innerWidth<=700`). Mobile SNA is graph-first: `#left` (stats / budget / optimizer) hidden, canvas ~66vh on top, `#right` member details below (auto-scrolls into view on node tap). GOTCHA: `make_combined.scope_sna()` scopes SNA CSS under `#app-network` and is now `@media`-aware (it used to destroy `@media` blocks by split-on-`}`, silently killing the network's mobile CSS in the combined file). To preview: `.claude/launch.json` serves the dir; load `/Moneyball.html`, resize to mobile.

### Superseded how-to (kept for history): COM and recalc

~~Workbook edits go through Excel COM (win32com) and require Excel to be CLOSED (an open workbook locks the file -> PermissionError; check before any COM/openpyxl write). Regen = `fec/run_pipeline.py [--recalc]` (canonical one-command chain incl. stance, recalc, advisory, exports, audit; expect 48/48). Its recalc zip-validates the workbook + retries once: on 2026-07-02 an Excel-save/OneDrive collision TRUNCATED the workbook to 2.2MB after "recalc ok"; recovery = restore newest `BACKUP-*.xlsx` (always created before writes) and rerun.~~ (2026-07-02) - superseded by "NO COM anywhere" (Phase 2). The recovery lesson (backups are created before writes; restore newest `BACKUP-*.xlsx`) and the OneDrive collision class remain useful. Related memory: `moneyball-deep-audit-2026-07-02`, `press-classification-user-domain`, `moneyball-receptivity-layer`.

## Committee-pillar scoring formula (source `moneyball-committee-scoring`, reference, 2026-07-01)

Moneyball `Committee Data` sheet (A1:E~289) holds the committee pillar. Columns: A = Member, B = Committee score, C = Membership, D = Leadership, E = "Seats held" text. **B / C / D are STATIC values; no Python builds them** (grep confirmed; `match_committees.py` is FEC-PAC matching, unrelated). `Seats held` encodes each seat as `Name (full) [Tier]` or `Parent - Sub [Tier/Role]`; Tier in Highly / Moderately / Slightly, Role in Chair / Ranking / Vice.

**Formula (reverse-engineered, reproduces all 288 rows exactly):**

- Seat is `sub` iff its name contains " - " (else `full`; note Joint Committees have no "(full)" but are full).
- Membership per seat = base[tier] x (1 if full else 1/6). base = {Highly: 3.0, Moderately: 1.8, Slightly: 0.9}, so subs = 0.5 / 0.3 / 0.15.
- Leadership per seat (only if role) = membership_weight x mult: Chair full x2, sub x5; Ranking full x4/3, sub x3; Vice full x1, sub x2.
- Membership (C) = Sum seat membership; Leadership (D) = Sum seat leadership; **Committee score (B) = (C + D) / 2**.
- Reconciliation with the 2026-06-30 multipliers above (inference, not stated in either source): applying the user's x1.5 to Chair and Ranking turns Chair 2 / 5 into 3.0 / 7.5 and Ranking 4/3 / 3 into 2.0 / 4.5 while Vice stays 1 / 2, matching the "as of 2026-06-30" list; the x2 / x5 / x4/3 / x3 set is the pre-x1.5 validation base.

**Flows into the model via LIVE formulas** (edit only Committee Data, then recalc): `Committee Data`!B -> `Rank & Allocation`!E (`=IFERROR(INDEX('Committee Data'!$B$2:$B$320,MATCH(name,...)),0)`) -> `Blended Model`!E -> col L Committee% / col Q Influence pillar -> col R Influence% -> Score. So recomputing B auto-propagates to Score / Rank. To change chair / ranking weight or a committee's tier: edit the multipliers / the `Seats held` tier text, recompute B / C / D with the scorer, write back, recalc (under the no-COM regime the recalc happens when the user opens Excel, `fullCalcOnLoad`, and the pillar snapshot refreshes). Validator + scorer: session scratchpad `cmte_validate.py` (2026-06-30). See `moneyball-model-config`.

## REORG: phases, tripwires and lessons (source `reorg-phase0-tripwires-2026-08-04`)

### Phase 0 (committed @15560ea on `claude/cfpb-sentiment-recorrection`, the live tree's branch; plan in `REORGANIZATION_PLAN.md`)

Four read-only tripwires (`python fec\<name>.py`, `--json`, exit 1 on findings): `fec/audit_chain_steps.py` (0 hard, 164 informational), `fec/audit_content_freshness.py` (0 findings, 5 surfaces), `fec/audit_path_resolution.py` (70 hard ~31 distinct artifacts, 32 info), `fec/audit_output_consumption.py` (30 hard, 44 info). The two failing ones report pre-existing residue, not regressions. The number for scoping Phase 2 is ~300 DISTINCT ARTIFACTS, not the construction count (102 -> 708 -> 1058 -> 2515 constructions while distinct artifacts held 300 -> 300 -> 301; ~25x without the tree changing). Standing gate: kernel `run_tests.py` 89/0 + `test_lda_rebuild.py` full count + full chain to `audit_full` with no new failures + `ranks_python.json` byte-identical (then `736A95644E37B4CC...`).

**Both prior open items CLOSED @a14543e on Paul's instruction ("Yeah lets chain in lobby-interactions / Fold test lda into one kernel runner"):**

- `make_lobby_interactions_html.py` is now a CHAIN step (after `make_lobby_network_html.py`; NO ordering constraint against `make_combined`, which deliberately does not merge it). Chaining it proved the surface was **unbuildable**, not just stale: bank-tier work grew `_load_sector_roster` 3 -> 5 return values and the builder raised on every run. **Coverage != wiring**: `audit_content_freshness` PASSED on it the whole time because the deployed page did carry the builder's honesty strings; no audit here can detect a builder that raises at runtime (the chain-step audit only parses producers, importing one executes work). Only being in the chain catches it. Its ledger producer `lobby_interactions.py` stays UNCHAINED on purpose (position classification, expensive): the ledger is a manual refresh.
- Kernel runner: `run_tests.py` was pointed at **14 of 118** suites; now 17 (`test_lda_rebuild`, `test_lobbyview_network`, `test_lobby_interactions`): **92 passed / 0 failed in 56 s**. Its registration regex was case-sensitive and matched neither new suite; needs `re.I`, and any suite added must print `N passed, M failed` on stdout.

**Legislation / culling lane DONE @5e87439: kernel 92 -> 131 passed / 0 failed, 56 s -> 75.8 s.** 39 of 59 registered. CORRECTION to an earlier claim: the orphans are NOT uniformly non-pytest (of 118 suites: 75 unittest, 25 self-running, **11 pytest**, 5 bare-tests-no-runner). Facts for the remaining ~63 orphans: `run_tests.py` now reads FOUR native verdict shapes (`N passed, M failed`; unittest `Ran N tests` + OK/FAILED; reflective `PASS <name>` lines; `N BILLSTATUS ... tests passed`) from stdout AND stderr; unrecognised verdict = FAILURE by design; **`fec` has NO `__init__.py`** (PEP 420 namespace package; suites using `from fec import ...` only work with the repo root on `sys.path`, 9 suites held on this); **settle vacuity by TRACING, never by AST** (3 fully vacuous + 1 at 6%: `article_cross_reference` defines 74 assertions and runs ZERO); snapshot method (git tag is NOT sufficient since `*.json` / `*.csv` are gitignored: add a manifest of sha256 < 8MB, size + mtime above, over repo root + fec + tests + BOTH `%LOCALAPPDATA%\Melange\*\derived` roots, plus a physical copy of repo-root files < 2MB, ~48MB); all 59 ran with **0 mutations**, re-verified byte-identical twice. This lane is NOT in the chain: 57 of 59 cover non-chain producers (runs manually); coupling is indirect but real, since its artifacts are read by `audit_full.py`, which IS a chain step.

**ALL 20 RESOLVED 2026-08-04 second pass (Paul: "fix all of those"), MERGED TO MAIN @4647555** (commits 97a65f8 re-attestation + 9499cef merge + 4647555 plan record; cfpb == main):

- **18 registered, kernel 149/0 in ~2.5 min.** pytest 9.1.1 installed (Paul-authorized). Runner reads FIVE verdict shapes (pytest shape E gated on the timed-summary signature, stdout + stderr); pytest lane runs `-p no:cacheprovider` (else `.pytest_cache` mutates the tree) with the PKG env (root + fec on PYTHONPATH). Parser negative-controlled 23/23. The runner's own unrecognised-verdict guard caught a lane misclassification of `test_legislation_culling_integration_contract` (a bare-tests file: exits 0 executing NOTHING under plain python). `dump_atomic` leak check scoped to its own temp pattern (the global `%TEMP%` scan false-alarmed under concurrency).
- **The presync pair now PASSES (readiness 27/0, presync 37/0) but stays OUT of the kernel BY DESIGN** (operational sync-time gates bound to live mutable receipts; the workbook drifts on every user edit; registering them = cries-wolf).
- **Receipt re-attestation, dependency-ordered** (decay -> rank-drift -> downstream -> behavior -> planning -> ooxml -> formula): downstream closure pin legitimately grew **20 -> 36 of 55** with per-file provenance (0 healed, exact closure retained); a stale semantic pin repaired (decay `production_baseline.passed` was decoupled from live drift during promotion prep; downstream still required the old coupling); workbook re-bound @sha `5001e7df`; twin isolated Excel recalcs -> identical ledgers `837d0f32` (the a == b identity IS the determinism proof); behavior trust pin + `EXPECTED_LIVE_SHA256` + all producer / test / fixture pins moved in lockstep (fixtures MODEL the closure, so they move with it).
- **Order-of-operations law: producer edits BEFORE regens** (the ooxml receipt binds its own producer's source bytes; editing the producer after regenerating invalidated the receipt).
- **NOT touched, deliberately:** manual policy approvals (human inputs, never synthesize), frozen 55-file baseline (immutable), external import / model receipts (no writer exists), search registry (high blast radius).
- OneDrive `WinError 5` hit twice on snapshot dir renames; orphan-removal + retry cleared both.
- Formula evidence dir `C:\tmp\legislation-formula-cache-freshness-20260804T155150Z` must be RETAINED (validation reopens the receipts).
- Codex lane law (Paul, permanent, in the metaloop skill): always xhigh + priority; max effort / full mode is the metaloop default.
- Still open then: `fec\tests\test_primacy_tier.py` writes `source.json` into the repo root. Related: `lobbyview-integration-2026-07-31` (the lane this sits in), `verify-dont-infer-completion-2026-08-04` (verification lessons) and see [[2026-07-feature-data-collection-lanes]].

### REORG execution state (2026-08-04 late, run `run-20260804T2021407173543Z-4d7c2d0d27`)

- **Phase 1 @fa66617**: 118 tests -> `fec/tests/{legislation 64, infra 15, members 11, engine 8, collect 8, lobbying 5, stance 4, district 3}`; 117 `__file__`-depth bumps; both runners use a recursive resolver that raises on dupes / missing. Gate 149/0.
- **Phase 2**: A@923e75c (network / district / lobbying / money, 29 files + 4 relocations after a classifier bug: 'sna' matched inside 'snapshot'); B@2c7766d (engine / legislation 14 moved, 15 SKIPPED: 5 baseline-bound, 9 receipt-bound, 1 script-bound, list in the commit msg); C@ec6e9ab (stance 68 moved, 5 receipt-bound skips, `.tmp` write / read pairing verified); D@caba359 (members 46 moved, 7 receipt-bound skips).
- **Then remaining**: batch E = misc domain (~50 files / 310 sites) via `reorg_worklists.json` in session scratchpad ac6ab6dd...; then full chain (`run_pipeline --from make_dashboard_html.py`) + `audit_full` (expect 199/1, crown-law failure pre-existing); then `REORGANIZATION_PLAN.md` update; then ff main at the `cxwt-main-merge` worktree; then metaloop finish.
- Gate per batch: kernel 149/0 + freshness 0 + ranks 736A9564 BYTE-IDENTICAL. Snapshot: tag `pre-reorg-20260804`, manifest + backup in scratchpad `SNAPSHOT-pre-reorg`.
- **LESSONS**: codex MCP times out ~30 min silent but its WORK COMPLETES (inspect the tree, never redo blindly). Codex force-staged gitignored artifacts (`git add -f`) in batch D -> 403k-line commit; fixed via parent-commit truth (tracked-at-root = legitimate rename stays tracked; else `rm --cached`). `git check-ignore` SKIPS tracked files, so it cannot detect wrongly-tracked-ignored files; use parent-tree membership instead. Keep-at-root set: deployed surfaces, workbook family, dbs, `ranks_python.json`, and every receipt / baseline-bound artifact.

### Final state (merged @0e19f1e)

- Batch E @40cb28c (misc, per-file routing; `.mcp.json` REVERSED to root since Claude Code config is root-discovered). Phase 2 close-out @021bb9f (full chain green: `audit_full` 199/1 after regenerating `behavioral_dispositions.json`, whose `inputs_sha256` KEYS are layout-bound). Phase 3 pilot @0e19f1e: 17 leaf collectors -> `fec/collect/`; 8 excluded (7 static imports + `collect_govinfo_bill_xml_versions` via DYNAMIC `__import__` that static grep cannot see; the kernel gate caught it).
- Phase 3 next sittings, in order: audit, district, stance, members, legislation, lobbying (late, most active), surfaces, core (last). Pilot recipe: exclude anything imported by outsiders, bump bootstrap `__file__` depth by one, update invocation sites (ps1 launchers, `weekly_refresh`, acceptance service), gate with kernel + the UNREGISTERED suites of that domain run directly.
- ARTIFACTS THAT RECORD PATHS ARE LAYOUT-BOUND: allowance registries, prerequisite sets, `inputs_sha256` keys, receipt bindings. Every reorg batch must expect them; fix the DATA (or regenerate deterministically), never weaken the test.

### Phase 3 progress (run `run-20260805T0217417406130Z-c599876b75`, merged @0fd69cb)

- **Chain resolver @4c79a3c**: `run_pipeline.py` + `weekly_refresh.py` resolve invoked scripts by recursive basename map (tests / attic / quarantine excluded) and RAISE on missing / duplicate. CHAIN entries are location-independent; domain moves cannot break chains by construction. 401 producers, 0 dupes.
- **audit/ domain @0fd69cb**: all 33 `audit_*` / `verify_*` / `dashboard_integrity` into `fec/audit/`. LANDMINE: `fec/audit.py` (legacy standalone workbook audit, EXECUTES 22 checks ON IMPORT) shadowed the namespace package; now `fec/audit/legacy_workbook_audit.py`. Import sweeps must cover FOUR forms: `import X` / `from X import` / `from fec import X` / dynamic strings (`__import__`, `import_module`, `spec_from_file_location`, test matrices).
- **Domain-move recipe (proven)**: `git mv` -> bootstrap `__file__` depth +1 -> rewrite all four import forms with aliasing -> invocation sites (ps1, runbooks) -> gate = kernel 149/0 + freshness (from the NEW tripwire location `fec/audit/audit_content_freshness.py`) + ranks 736A9564 byte-identical + `audit_full` through the resolver (199/1, crown-law pre-existing).
- REMAINING Phase 3 domains in order (at that time): district, stance, members, legislation, lobbying, surfaces, core (LAST: `moneyball_core` imported by 139).
- **FLAKE, unresolved**: `test_legislation_base_network` fails ~2/3 IN-KERNEL runs with bare AssertionError, passes EVERY standalone and sequence-replicated run. Opt-in trap armed: set `RUNTESTS_DUMP_DIR` to capture full output of any failing suite in the kernel.
- **Codex escalation protocol (Paul, permanent, in the metaloop skill)**: flaws / errors / obvious improvements -> ESCALATIONS section to Fable; POTENTIAL improvements -> Fable consults Paul FIRST. Two pending Paul decisions then: (1) static gate rejecting stale moved-basename imports repo-wide; (2) `main()` guard on `legacy_workbook_audit` so import cannot execute its 22 checks.

### Phase 3 COMPLETE (2026-08-05, merged @a05a8e4)

- All domains moved: collect 17, audit 36, district 7, stance 47, members 120, engine 30, legislation 87, lobbying 28, network 10, surfaces 11 + templates. `fec` root = 9 hubs + `run_pipeline` + `weekly_refresh` + 3 attic candidates (`repair_institutional_influence`, `repair_sublayer_categories`, `update_primacy_fixture`; Paul's call).
- CORE DECISION: hubs stay at `fec` root (paths 273 importers, moneyball_core 156; a `core/` dir = ~500 rewrites for zero gain). Revisit only if hub-and-spoke import enforcement is wanted.
- IDENTITY vs LOCATION law: the immutable baseline manifest keeps identity; `fec/audit/live_relocations.py` (27 entries) redirects live reads for decay / downstream / presync; planning inherits via drift-ledger rows; weekly-refresh closure compares on BASENAME (downstream identities carry `fec/` prefixes). Closure re-attested 36 -> 47/8, receipts regenerated (downstream `11d7b68a`, planning `4ff667a8`), behavior pin lockstep.
- `audit_stale_imports.py` = kernel check No. 150: dynamic 389-module ledger, four forms, `# stale-ok:` pragma, `spec_from_file_location` = name-not-path. `legacy_workbook_audit` import-inert (`main()` guard).
- Codex MCP timed out 4x ~30 min; work complete 3x, genuinely incomplete 1x (legislation): ALWAYS inspect. OneDrive rolled back 4 edits once (files resurrected with old content): verify persistence after edits. Dropped-`as ALIAS` was the recurring codex rewrite bug.
- Full chain green from the new layout: every producer resolved by basename, surfaces rebuilt, `audit_full` 199/1 (crown-law pre-existing). Kernel 150/0. Freshness 0. Ranks BYTE-IDENTICAL through ~18 gates.

### Post-completion (2026-08-05, merged @b6b61fc)

- Attic candidates RESOLVED (Paul: "attic those 3"): see Decisions.
- Closure constants CENTRALIZED: `fec/audit/drift_closure.py` = single source of `EXPECTED_CHANGED_NAMES` + 47/8/55 (counts derived, import-asserted); consumed by the downstream audit, presync module, and all three test suites incl. the infra fixture.
- **SYNC-RECEIPT LAW (learned twice that night)**: every full-chain run re-drifts the live surfaces and STALES the presync receipts BY DESIGN; green presync suites require a receipt cycle after any chain run: decay -> rank -> downstream (new id -> behavior pin) -> behavior -> planning (new id -> presync-test pin) -> ooxml, ~10 min. This is re-attestation cadence, not damage.
- **WEEKLY REFRESH**: Windows task `MoneyballWeeklyRefresh`, Sat 6:00 AM, invokes `fec/weekly_refresh.py` (still valid post-reorg). Last run 2026-08-02: all collectors + layers OK (tweets collected, `social_media.db` updated), ABORTED at the final FULL PIPELINE step on the culling-surface audit check; that cause has since been resolved by the promotion-era regens. The NEXT run (2026-08-09) will still end Last Result 1 while the pre-existing crown-law audit failure stands (`audit_full` 199/1); the refresh treats any `audit_full` failure as HARD FAILURE at its last step. Everything real completes; only the final gate reports red. Fix = resolve the crown-law workbook stance column mismatch (Paul's domain, separately tracked).
- Tweet collection healthy: `social_media.db` 2026-08-02 06:17 (refresh-driven), `x_catalog.jsonl` 2026-08-02 12:49 (Grok lane).

## System manifest + sentinel lane (2026-09-06, source `system-manifest-sentinel-lane-2026-09-06`; all UNCOMMITTED in the live tree)

- **The `:966` dedup defect is FIXED.** `fec/audit/build_system_manifest.py:966` appended `newest_file` with no membership test against `top`; because `pick_sentinels` truncates `by_size` to `SENTINEL_COUNT` at `:1073` *before* the `seen` dedup at `:1090`, a file that was both largest and newest ate a slot and evicted the true third-largest. The fix adds `and newest_file[0] not in {t[0] for t in top}` (rows are `(rel, size, mtime)`). Blast radius was **3 stores, not the 2 the brain listed**: `mdata.bicam_zips` 2 -> 3, `mdata.bicam_extracted` 2 -> 3, `repo.data_district` 2 -> 3. **`mdata.residual` was NOT affected** (it has 4 rows; that entry in the old note is stale). The worktree copy of the producer still carries the defect. See [[sentinel-collectors]] for the sentinel-workbook side.
- **Regenerating is riskier than it looks.** `dump_atomic` overwrites `data/system/system_manifest.json` unconditionally (**no backup, no hash gate**) and the prior manifest is uncommitted, so it is the only copy: copy it aside first. (The "manifests in backups/, hash-gated" memory belongs to the sentinel-workbook lane, a different apparatus: `sentinel-workbook-ingestion-lane-2026-09-04`.) Invoke the **live tree's** script by absolute path: `paths.py` is imported from the script's own tree (`:81-82`), so `MONEYBALL_ROOT` fixes `ROOT` but not which code runs, and the worktree's producer is a different file.
- **D-015 cost baseline, measured for the first time: ~147-167 s** (146.8 s / 166.9 s, 13.7% variance). The brain's uncaptured "~29 min" is not borne out on a warm cache. Scope if the cap is lifted: 71 sentinel rows across 25 stores / 79.46 GiB currently skipped, vs 81.37 MiB hashed, a ~1000x increase. `repo.git` has 3 sentinels, 0 hashed, all `git gc`-retirable.
- **Live-regen then live-audit is NOT the DE-012 vacuous pass.** `system_manifest_check.py:8-13` refuses any manifest that does not predate the checking process and asserts the producer is absent from `sys.modules`. But 582/0 straight after a regen is over-fit by construction (A2 / A2b cannot fail when the manifest is 78 s old). The meaningful test is the next chain-terminal audit.
- **The 8 `A2b … sentinels unchanged` failures return on every chain run.** Regeneration clears the instance, never the cause (DE-011). They are pattern-tolerated by `audit_failure_gate.py:69-72`, so they do not block publish. Real remedy is excluding chain outputs from sentinel duty.
- **Unruled risk:** `audit_full` writes its own pinned sentinels, `_audit_tmp_optimize.json` (`:161-162`) and `_audit_tmp_frontier.json` (`:197-198`), ~2,300 lines before checking them at `:2473`. They pass only because the rewrite is byte-identical and A2b compares size and sha256 but never mtime. If either output ever varies, `repo.data_lobbying` and `repo.data_money` fail on every run after the first and **regeneration cannot fix it**.
- **Why:** this lane's failure modes all look like data corruption and are not. Reading a red A2b as a regression, or regenerating to "fix" it, wastes a gate and hides the real defect.
- **How to apply:** before touching the manifest, back it up, run live's producer by absolute path, and verify `generator_sha256` against the on-disk producer. Never read a post-regen 582/0 as proof the data is healthy. Related memory: `moneyball-audit-run-guardrails`, `verify-dont-infer-completion-2026-08-04`.
