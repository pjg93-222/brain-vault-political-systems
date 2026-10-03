---
type: concept
name: "Zero-rank-delta verification"
aliases: ["byte-identical ranks protocol"]
description: "Verification protocol for Melange refactors and reorgs: kernel tests -> full pipeline -> rank delta vs the last ranks file must be ZERO (unless the change is meant to move ranks) -> audit clean; proven by ranks staying byte-identical (736A9564...) through the 2026-07-02 refactor and the 2026-08-04/05 REORG."
related_to:
  - "[[2026-07-feature-influence-engine-internals]]"
  - "[[2026-07-rfc-melange-architecture-system-of-record]]"
  - "[[melange-fec-pipeline]]"
  - "[[moneyball-workbook]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reorg-phase0-tripwires-2026-08-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reorg-phase0-tripwires-2026-08-04.md", sha256: "a554fe2a6df1883dad24aa1fb9b973f83ee9adf2a4418b32b516f46575fc430c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sublayer-surgery-2026-07-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sublayer-surgery-2026-07-17.md", sha256: "9f165d2f3d53c188074a75a1fa16f3b6eff9021fae80183fb72a1fb771998cf7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-architecture.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-architecture.md", sha256: "bb9bffef2af3af7152fdcf5bf852e8bef18952f37abaf7f978ae0b596ed25ee5"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/concept", "domain/backend"]
---

# Zero-rank-delta verification

> The canonical gate for any change that is supposed to be behavior-preserving in the Melange / Moneyball system: kernel tests, then the full pipeline, then the rank delta against the last ranks file must be ZERO (unless the change is SUPPOSED to move ranks), then the audit must be clean.

## Description

The protocol was recorded after the 2026-07-02 architecture refactor (review `ARCHITECTURE_REVIEW_2026-07-02.md`; user: "Proceed down list"), which was VERIFIED behavior-preserving by kernel tests 28/28 + pipeline + audit 50/50 + **zero rank delta** across 533 members.

**Verification protocol (canonical):** code change -> `python fec/tests/run_tests.py` (28 checks at the time; zero deps; run before any pipeline after code changes) -> `python fec/run_pipeline.py` -> rank delta vs last `ranks_*.json` = ZERO (unless the change is SUPPOSED to move ranks) -> audit 50/50 (later 52, then `audit_full`).

Because `ranks_python.json` is THE rank authority (system of record inverted in Phase 2, see [[2026-07-rfc-melange-architecture-system-of-record]]), "zero delta" can be checked as BYTE-IDENTICAL file content. During the 2026-08-04/05 REORG the ranks file hash `736A95644E37B4CC...` (shorthand `736A9564`) stayed byte-identical through ~18 gates.

## Key Characteristics

### The standing gate (as of 2026-08-04, REORG Phase 0)

All four must hold:

1. Kernel `run_tests.py` 89/0 (at that time; the count grew, see History below).
2. `test_lda_rebuild.py` full count.
3. Full chain to `audit_full` with no new failures.
4. **`ranks_python.json` byte-identical** (then `736A95644E37B4CC...`).

Per-batch gate during the reorg: kernel 149/0 + freshness 0 + ranks `736A9564` BYTE-IDENTICAL. Snapshot: tag `pre-reorg-20260804`, manifest plus backup in the session scratchpad `SNAPSHOT-pre-reorg`. Domain-move gate: kernel 149/0 + freshness (from the new tripwire location `fec/audit/audit_content_freshness.py`) + ranks `736A9564` byte-identical + `audit_full` through the resolver (199/1, crown-law pre-existing).

### When ranks are supposed to move

The protocol is "ZERO unless intended". Examples of intended moves, each with its own accounting:

- 2026-07-17 Sub Layer repair (below): 520/533 ranks moved, LEG-PILLAR-ONLY (press/inf/dem deltas exactly 0.0).
- Phase 2 refactor already verified snapshot-mode ranks == baseline EXACT 0/533 for the system-of-record inversion.
- Two-run convergence: the `bipartisan.json` feedback edge means bundle fixes need two runs (the bundle writes `bipartisan.json` LAST, so bp fixes always need two runs); run 2 delta 0 = a perfect fixed point. See [[melange-fec-pipeline]].

### Four read-only tripwires (Phase 0, committed @15560ea on `claude/cfpb-sentiment-recorrection`)

All `python fec\<name>.py`, `--json`, exit 1 on findings:

| file | result 2026-08-04 |
|---|---|
| `fec/audit_chain_steps.py` | 0 hard, 164 informational |
| `fec/audit_content_freshness.py` | 0 findings, 5 surfaces |
| `fec/audit_path_resolution.py` | 70 hard (~31 distinct artifacts), 32 info |
| `fec/audit_output_consumption.py` | 30 hard, 44 info |

The two failing ones report pre-existing residue, not regressions (inventory with suggested dispositions in `REORGANIZATION_PLAN.md`, "What Phase 0 found"). **THE number for scoping Phase 2 is ~300 DISTINCT ARTIFACTS, not the construction count**: successive scanners gave 102 -> 708 -> 1058 -> 2515 constructions while distinct artifacts held at 300 -> 300 -> 301; the construction count moved ~25x without the tree changing, so do not re-argue Phase 2 risk from it.

### Rank-delta methodology details

- **PERCENTRANK(...,5) truncates to 5 DECIMAL digits, NOT significant digits** (94 sub-0.1 members exposed this) - the empirical pin that made `compute_pillars.py` parity EXACT 533/533 ranks, scores < 1e-7, wired into `audit_full` as a formula-drift tripwire (audit = 52 checks, kernel tests = 30 then).
- **Two-run echo**: the `bipartisan.json` feedback edge makes some one-time diffs (see 2026-07-03/04 "bipartisan two-run echo" in the source history) settle after a byte-identical rewrite.
- Order-of-operations law (REORG): **producer edits BEFORE regens**; the ooxml receipt binds its own producer's source bytes, so editing the producer after regenerating invalidated the receipt.
- Sync-receipt law: every full-chain run re-drifts the live surfaces and STALES the presync receipts BY DESIGN; green presync suites need a receipt cycle after any chain run (decay -> rank -> downstream [new id -> behavior pin] -> behavior -> planning [new id -> presync-test pin] -> ooxml, ~10 min). This is re-attestation cadence, not damage.
- Artifacts that record paths are LAYOUT-BOUND (allowance registries, prerequisite sets, `inputs_sha256` keys, receipt bindings): every reorg batch must expect them; fix the DATA (or regenerate deterministically), never weaken the test.

## The 2026-07-17 Sub Layer repair as the worked "ranks SHOULD move" case (source `sublayer-surgery-2026-07-17`)

**Root cause of "ranks out of sorts" (2026-07-16/17):** the 07-15 Legislative-Normalized own-row repair shifted that sheet's member rows up one; every `Sub Layer - Raw` efficiency formula (AG:AW) kept pointing one row low, so EVERY member's legislative efficiency was computed from their alphabetical neighbor's record. Invisible while Excel caches stayed stale (`compute_pillars` served `pillar_inputs_snapshot`); materialized by the first COM CalculateFull (2026-07-16 20:10, the 522-move). Two additional slot bugs: AH numerator used Q (Sponsor Success) instead of P (CU-Cap Success Rate); AI used col AI instead of X (NCUA Success Rate) in 532/533 rows. Each formula's own Table1 minmax basis named the correct column (the repair anchor; a majority-vote canon would have locked in the bug).

Fix **@c6dc6b2** (cfpb branch): `fec/repair_sublayer_references.py` (`--plan` / `--apply`; plan = full 9,061-cell audit; apply = backup `PRE-SUBLAYER-REPAIR-20260717_010907.xlsx` + rewrite) -> COM recalc -> chain (written before the "NO COM anywhere" rule of [[2026-07-rfc-melange-architecture-system-of-record]]; see that note's superseded-guidance entry). **PROOF:** an independent Python re-derivation of the whole leg chain matches `compute_pillars` 533/533; rank delta 520/533 LEG-PILLAR-ONLY (press/inf/dem deltas exactly 0.0); audit ALL MODULES CLEAN; tier holds Barr No. 1 plus all 17 placements. Barr leg .897 -> .994, Scott .765 -> .914, CCM .778 -> .936 (Paul's intuition vindicated: the "stale" pre-recalc values were computed under the pre-07-15 ALIGNED layout and were closer to truth).

**N-genre question CLOSED WITH RECEIPTS (never reopen without new genre/data):** interview-based affective-N does NOT transfer to other collected text. floor+hearing pooled LOOK: FAIL rho=0.050 (bar .40, n=409); hearing-only LOOK: FAIL rho=0.161 (n=121; better direction, still far). Both one-look markers in `source_data/` (`speech_n_genre_result.json`, `hearing_n_genre_result.json`); the ~61 N-desert members are a COLLECTION-ONLY problem (Paul's 3-week interview cadence). Paul pushed back on the first FAIL ("I thought the N passed. Fix it"); held under law 13, ran the legitimate distinct hypothesis instead, giving honest sizing before each look. Also that night his Anthropic API credit ran out mid-study and was topped up.

**Lesson pair for future audits:** (1) a "stale cache" can be SHIELDING downstream consumers from an unrepaired reference plane, so refresh only after verifying the formula chain; (2) when repairing drifted formulas the majority pattern can BE the bug, so anchor on an internal self-consistency signal (the Table1 basis). Campaign log: `FIX_CAMPAIGN_LOG_2026-07-16.md` entries 010-015.

**UPDATE @a3174bc (guard batch, campaign entry 015, 2026-07-17)** fences every silent-failure class from the 07-16/17 incidents: (1) AB pillar dials fail loud (W1 class); (2) pillar snapshot stamped, stale-warn >7d, audit FAIL >14d (522-rank class); (3) audit no longer writes the snapshot (`PILLAR_SNAPSHOT_FREEZE`); (4) `apply_press_overrides` legacy re-flow retired behind hard guard (`--merge-only` keeps the ledger merge, desk UI repointed); (5) tier placements fail loud on unresolved names; (6) `config_overlay` fails closed; (7) audit check: channel inputs within 28d of corpus. Same commit: speech-channel per-event 1/n normalization (confirmed sibling drift, Ogles-class inflation removed) -> 230/533 ranks moved PRESS-ONLY (leg/inf/dem mean delta exactly 0), blend 2,024 cells, chain complete, audit ALL MODULES CLEAN incl. the new checks, kernel 72/72, tier holds Barr No. 1 plus all 17 placements. Also that day: Vought RT gold verified Positive for both retweeters @b456b9d; Wagner No. 3 explained = CFPB .927 efficiency + 97.7pct agenda hit rate, NOT volume.

## Gate history (kernel runner growth, REORG lane)

| Date | Event |
|---|---|
| 2026-07-02 | Refactor verified: kernel 28/28, pipeline, audit 50/50, ZERO rank delta over 533 members. Later that day: kernel 30/30 x2, pipeline x2, audit clean x2, zero rank delta x2. |
| 2026-08-04 | Phase 0 tripwires built @15560ea. `make_lobby_interactions_html.py` chained, `run_tests.py` kernel went from 14 of 118 suites to 17 (92 passed / 0 failed in 56 s) @a14543e (Paul: "Yeah lets chain in lobby-interactions / Fold test lda into one kernel runner"). |
| 2026-08-04 | Legislation/culling lane @5e87439: kernel 92 -> 131 passed / 0 failed, 56 s -> 75.8 s; 39 of 59 registered. |
| 2026-08-04 | Second pass (Paul: "fix all of those"), MERGED TO MAIN @4647555 (commits 97a65f8 re-attestation + 9499cef merge + 4647555 plan record; cfpb == main): 18 registered, kernel 149/0 in ~2.5 min. |
| 2026-08-04 | Phase 1 @fa66617 gate 149/0; Phase 2 A@923e75c, B@2c7766d, C@ec6e9ab, D@caba359, E@40cb28c, close-out @021bb9f (audit_full 199/1). |
| 2026-08-05 | Phase 3 complete @a05a8e4: kernel 150/0 (`audit_stale_imports.py` = kernel check No. 150), freshness 0, ranks BYTE-IDENTICAL through ~18 gates, full chain green, audit_full 199/1 (crown-law pre-existing). |

Kernel-runner facts: `run_tests.py` was pointed at 14 of 118 suites; its registration regex was case-sensitive and matched neither new suite (needs `re.I`, and any suite added must print `N passed, M failed` on stdout). It later reads FOUR native verdict shapes (`N passed, M failed`; unittest `Ran N tests` + OK/FAILED; reflective `PASS <name>` lines; `N BILLSTATUS ... tests passed`) from stdout AND stderr (unittest writes its summary to stderr), then FIVE (pytest shape E gated on the timed-summary signature). Unrecognised verdict = FAILURE by design, never a skip. pytest 9.1.1 installed (Paul-authorized); pytest lane runs `-p no:cacheprovider` (else `.pytest_cache` mutates the tree) with the PKG env (root+fec on PYTHONPATH). Parser negative-controlled 23/23.

### Lessons about verifying

- **Coverage != wiring**: `audit_content_freshness` PASSED on `make_lobby_interactions_html.py` the whole time (the deployed page carried the builder's honesty strings) although the builder was unbuildable (`_load_sector_roster` grew 3->5 return values and the builder raised on every run). No audit here can detect a builder that raises at runtime; the chain-step audit only parses producers (importing one executes work). Only being in the chain catches it.
- **Settle vacuity by TRACING, never by AST**: an AST scan wrongly flagged 10 suites because the house idiom invokes tests reflectively (`for name, value in globals().items(): value()`); `sys.settrace` counting executed `assert` lines found 3 fully vacuous + 1 at 6% (`article_cross_reference` defines 74 assertions and runs ZERO).
- **Correction of an earlier claim**: the orphan suites are NOT uniformly non-pytest; of 118 suites: 75 unittest, 25 self-running, 11 pytest, 5 bare-tests-no-runner (generalised wrongly from a 4-file sample). The runner's own unrecognised-verdict guard caught a lane misclassification of `test_legislation_culling_integration_contract` (a bare-tests file: exits 0 executing NOTHING under plain python).
- **Snapshot method that worked** (reuse it): a git tag is NOT sufficient (`*.json` / `*.csv` are gitignored, so code-only). Add a manifest (sha256 < 8MB, size+mtime above) over repo root + fec + tests + BOTH `%LOCALAPPDATA%\Melange\*\derived` roots, plus a physical copy of repo-root files < 2MB (~48MB). All 59 ran with 0 mutations, re-verified byte-identical twice.
- **`git check-ignore` SKIPS tracked files**: it cannot detect wrongly-tracked-ignored files; use parent-tree membership instead (batch D codex force-staged gitignored artifacts via `git add -f`, a 403k-line commit; fixed via parent-commit truth).
- `fec` has NO `__init__.py` (PEP 420 namespace package): suites using `from fec import ...` only work with the repo root on `sys.path`, not via `python fec/tests/x.py` (9 suites held on this).
- The presync pair (readiness 27/0, presync 37/0) PASSES but stays OUT of the kernel BY DESIGN (operational sync-time gates bound to live mutable receipts; the workbook drifts on every user edit; registering them = cries-wolf).
- `dump_atomic` leak check scoped to its own temp pattern; the global `%TEMP%` scan false-alarmed under concurrency.
- FLAKE, unresolved: `test_legislation_base_network` fails ~2/3 IN-KERNEL runs with bare AssertionError, passes EVERY standalone and sequence-replicated run. Opt-in trap armed: set `RUNTESTS_DUMP_DIR` to capture full output of any failing suite in the kernel.
- Still open (2026-08-04): `fec\tests\test_primacy_tier.py` writes `source.json` into the repo root.

## Where it Applies

- [[melange-fec-pipeline]] - Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch
- [[moneyball-workbook]] - Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority).
- [[2026-07-feature-influence-engine-internals]] - July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder
- [[2026-07-rfc-melange-architecture-system-of-record]] - Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics

## Applied in

- The refactor and Phase 2 inversion: [[2026-07-rfc-melange-architecture-system-of-record]] (also holds the full REORG history).
- Engine internals topic where the Sub Layer repair lives: [[2026-07-feature-influence-engine-internals]].
- Workbook the ranks used to be computed from: [[moneyball-workbook]]; pipeline entrypoints: [[melange-fec-pipeline]] (`run_pipeline.py`, `weekly_refresh.py`).
