---
type: actor
name: "Melange fec/ pipeline"
aliases: ["fec pipeline", "run_pipeline chain"]
category: "pipeline"
description: "Python rank/allocation pipeline under Melange Systems\\fec: paths.py roots, moneyball_core shared kernel, run_pipeline.py chain, compute_pillars.py producing ranks_python.json (rank authority), kernel tests, audit_full, live_patch.py; reorganised into 9 code / 9 data / 8 test domains."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems"
stack: "Python (stdlib-heavy; numpy, scipy, openpyxl, pytest 9.1.1, sqlite WAL social_media.db); JSON/CSV/xlsx artifacts; git (main + worktrees); Windows Task Scheduler; OneDrive-hosted"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "Live tree is a worktree on main that drifts from HEAD (see drift section); main was not runnable alone until the 2026-09-19 reconcile commits"
  - "paths.py defaults ROOT to the live tree, so scripts run from a worktree still read/write live data"
  - "Import == execution for most fec scripts; only a few have __main__ guards"
  - "Mixed line endings: 312 of 2,892 tracked text files MIXED (working-tree-only); plain git apply silently rewrites whole files under system autocrlf=true"
  - "Kernel baseline reds: test_bill_collision_guards and test_make_staffer_network_html (246 passed / 2 FAILED as of 624e593eb)"
  - "fec/weekly_refresh.py has its own unbounded launcher (:312 proc.wait() after kill; whole-chain bound 7200 s at :464 below the 261.6 min the chain once took)"
  - "scipy import can freeze on Windows under load (BLAS thread-pool start-up), not reproduced"
  - "R1 (class B/E code-review hunks), R2 (engine imputation rule), R3 (644-acts re-pin) committed 2026-09-19 as live state but NOT ratified (Paul's rulings open)"
  - "api_stance_layer.py has a pre-existing IndentationError; fec/tests/infra/test_process_liveness.py is registered in no runner"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/live-tree-eol-census-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\live-tree-eol-census-2026-09-19.md", sha256: "8d1bd8b910e194fd59a3663aed40a3c0dca3626eccc843e2a0fc49fef2ca19c7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-live-tree-reconcile-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-live-tree-reconcile-2026-09-19.md", sha256: "466edb2a5c5a32457c4af1ef3b484372f128200f061a8751d654f8a6f5f286b2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/committed-vs-live-drift-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\committed-vs-live-drift-2026-09-13.md", sha256: "656f0a2e07d94186aa64d8bdf71bf498d76cd84759b30d6f5caae27543483dff"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reorg-phase0-tripwires-2026-08-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reorg-phase0-tripwires-2026-08-04.md", sha256: "a554fe2a6df1883dad24aa1fb9b973f83ee9adf2a4418b32b516f46575fc430c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-audit-run-guardrails.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-audit-run-guardrails.md", sha256: "fc314b1421f29d9b94eda9773284183ca5cefb0951cb6703f08410d424b9e0c0"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-architecture.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-architecture.md", sha256: "bb9bffef2af3af7152fdcf5bf852e8bef18952f37abaf7f978ae0b596ed25ee5"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/backend"]
---

# Melange fec/ pipeline

> The Python pipeline under `Melange Systems\fec` that computes the Moneyball CU-influence ranks: shared kernel `moneyball_core`, the `run_pipeline.py` chain, `compute_pillars.py` writing `ranks_python.json` (THE rank authority since Phase 2, 2026-07-02), the kernel test runner `fec/tests/run_tests.py`, `audit_full`, and the line-wise patch cutter `fec/tools/live_patch.py`.

> [!warning] The live tree is the real system
> The live tree (`C:\Users\pgoff\OneDrive\Desktop\Melange Systems`, a worktree on main) is what runs; main is a partial record of it (2026-09-19). The committed tree can drift from live; see "Live tree vs committed tree" below.

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\OneDrive\Desktop\Melange Systems` (live tree; git repo since 2026-07-02, branch main; mirror repo via [[melange-repo-mirror]]) |
| Stack | Python (kernel stdlib, numpy/scipy, openpyxl), JSON/CSV/xlsx/sqlite artifacts, git worktrees, Windows Task Scheduler, OneDrive |
| Status | active |
| Criticality | high |
| PCI | no |
| Team | none |

- Part of the Melange Systems project ([[melange-systems]]); its R-side sibling is [[draft-systems-r-pipeline]] (`MONEYBALL_DRAFT` root).
- `.gitignore` excludes all data artifacts (`*.json/csv/xlsx/db/txt/html`) + `fec/govinfo_key.txt` (secret; key material is not recorded anywhere here); `backups/` excluded; `.gitignore` uses `.claude/*` (not `.claude/`) so `.claude/commands/` is versioned.
- A file literally named `fec/NUL` (Windows reserved) once blocked `git add` - remove via Git Bash.
- Commits at each phase: use `git log` / `git diff`, not `.PRE-*` file copies.
- Spec: `MATHEMATICAL_SPECIFICATION.md` rewritten 2026-07-02 as law-of-the-system (authoritative-code table + "-" ontology + composed-post formula + determinism/workbook contracts + dial registry). Old long-form spec: git commit 62a209e. README rewritten to post-refactor reality (S3-07; write-only artifacts designated diagnostics-only per Paul).

## Dependencies

- **Reads/writes:** `paths.py` roots (`MB_ROOT`, `MB_DRAFT`); data root artifacts under `data/` and the Melange root; `social_media.db` (WAL); the Moneyball Blended workbook ([[moneyball-workbook]], now a self-refreshing VIEW, not the authority); `ranks_python.json`.
- **Feeds:** the dashboard ([[melange-dashboard]], `Moneyball.html` via `make_dashboard_html`), the member desk (`make_member_desk.py`), the combined surfaces; [[melange-refresh-scheduler]] runs `fec/weekly_refresh.py` (Windows task `MoneyballWeeklyRefresh`); [[melange-repo-mirror]] mirrors main + branches + tags.
- **Collectors:** [[sentinel-collectors]] and the `fec/collect/` legs (17 leaf collectors moved there in Phase 3 pilot) feed the data plane the chain consumes.
- **Draft Systems:** [[draft-systems-r-pipeline]] (R pipeline, `MONEYBALL_DRAFT` root; `cu_press_release_scraper.R` etc.).
- **External:** Excel/OneDrive (workbook view), GovInfo (membership refresh fetch), Anthropic API (paid steps, spend-gated), Vote Smart, MEDSL, Voteview, R 4.6.0 at `C:\Program Files\R\R-4.6.0` (not on PATH).
- **Architecture/process context:** [[2026-07-rfc-melange-architecture-system-of-record]] (system-of-record inversion), Influence engine internals (engines), [[2026-07-troubleshooting-melange-audits-and-reviews]] (audit history, guardrails), [[2026-07-troubleshooting-melange-live-tree-git-drift]] (drift, line endings), [[zero-rank-delta-verification]] (the verification gate).

## Flows

- `fec/run_pipeline.py` chain (canonical order, as recorded 2026-07-02): per_category_stance, sync_stance_g, [COM RECALC - since deleted], flip, coalition, frontier, frontier --electoral, optimize, im_allocation, salience_shock --advise (advisory INSIDE the chain, before bundle), bundle, html, desk, combined, `audit_full`. Chain length over time: 16 steps (2026-07-02/03), 17 steps (after the `lt_priming` gates, 285e604), 18 steps (2026-07-10, `coop_v2_candidate` step first), ~80 chain producers named by `run_pipeline.py` by 2026-09-19 (all tracked after the reconcile). `--from <script>` resumes; `--recalc` is a retired no-op.
- Authority path: `compute_pillars.py --write` produces `ranks_python.json`; engines read `MC.scores()` / `ranks()`; the workbook is rendered view (all writers set `fullCalcOnLoad`).
- Chain read-set: the CHAIN READS NO `social_media.db` (only `audit_full`'s GOLD check + non-chain scripts touch it; WAL keeps reads consistent), so collectors may run during the chain.
- Weekly: Windows task `MoneyballWeeklyRefresh` invokes `fec/weekly_refresh.py` (collectors, layers, blend, full pipeline + dashboards, rank-movement line, post-chain diagnostics `signed_coalitions` / `kb_benchmark` / `lep_criterion`), logging to `weekly_refresh.log`.
- After 2026-08-05 the chain resolves invoked scripts by recursive basename map (`run_pipeline.py` + `weekly_refresh.py`; tests/attic/quarantine excluded; RAISES on missing/duplicate; 401 producers, 0 dupes at that point), so chain entries are location-independent.
- Chain step timeouts (2026-09-19): `fec/bounded_subprocess.py` `run_bounded(argv, timeout, env, cwd)`: chain step 10800 s, kernel suite 1800 s; a timeout returns 124, which is not the tolerated 2, so a timed-out step HALTS the chain even in `TOLERANT_STEPS`.

## Dev Commands

```bash
# kernel tests (zero deps; run before any pipeline after code changes). Not valid from a worktree (run_tests.py:8 resolves data root from __file__: 35 FALSE failures)
python fec/tests/run_tests.py
# audit harness (read-only; valid from a worktree; exits 1 on any red). Moved to fec/audit/ in the 2026-08-05 reorg
python fec/audit_full.py
python fec/audit/audit_full.py
# canonical pipeline run; resume
python fec/run_pipeline.py
python fec/run_pipeline.py --from per_topic_flip
python fec/run_pipeline.py --from make_dashboard_html.py
python fec/run_pipeline.py --recalc        # retired no-op
# Phase 0 tripwires (read-only, --json, exit 1 on findings); now live under fec/audit/
python fec\audit_chain_steps.py --json
python fec\audit_content_freshness.py --json
python fec\audit_path_resolution.py --json
python fec\audit_output_consumption.py --json
python fec/audit/audit_content_freshness.py
# rank authority
python fec/compute_pillars.py --write
# line-wise patch cutter (EOL class / drift; exits 0 IDENTICAL_BYTES, 1 EOL_ONLY, 2 CONTENT)
python fec/tools/live_patch.py eol <file>...
python fec/tools/live_patch.py drift <a> <b>
# safe patch apply under system autocrlf=true
git -c core.autocrlf=false apply <patch>
# lock-free live-tree snapshot (50 s total)
GIT_OPTIONAL_LOCKS=0 git status --porcelain=v1 -z
git ls-files --others --exclude-standard -z
git diff --cached --name-status -z
# batched drift census (never per-file git on the OneDrive tree)
git ls-tree -r HEAD ; git ls-files ; git hash-object --stdin-paths
# scoped grep (an unscoped one exceeds the 2-minute tool timeout because of audits/legfix5)
git grep <pattern> main -- fec audits
# clean-export flags (D-048)
git -c core.autocrlf=false -c core.eol=lf archive
# merge precondition check; commit message from file without BOM
git -C <LIVE> status --porcelain -- <paths the branch touches>
git commit -F <file>
# SHA-based command under Git Bash path mangling
MSYS_NO_PATHCONV=1 git <command using SHA:path>
# membership refresh unit (free GovInfo fetch + chain from verify_collector_roster_updates.py, zero LLM, ~28 min; rank-moving)
python fec\legislation\update_bill_repository.py --rebuild-dashboard
# interview turn-bleed repair restore (byte-exact from speeches_turn_split_ledger)
python fec\members\migrate_interview_turn_bleed.py --restore --db <path>
# receptivity outcome test (score ~Sept 2026; refuses <60 d or <150 movers)
python fec/outcome_snapshot.py --score outcome_snapshot_2026-07-04.json
# weekly task removal
schtasks /Delete /TN MoneyballWeeklyRefresh /F
# env: MONEYBALL_ROOT, MONEYBALL_DRAFT (paths.py overrides), BP_SRC=aug (restores augmented bipartisanship), RUNTESTS_DUMP_DIR (capture failing kernel suite output), OPENBLAS_NUM_THREADS=1 (proposed, not applied), IV_TURN_TAGS (2=repaired, 1=legacy), DESK_MEDIA_CAP=0 (no cap)
# liveness: python process tree
Get-CimInstance Win32_Process
# git status quirk in a dirty shared index: pass paths in batches (status does not take --pathspec-from-file)
git status --porcelain=v1 -- <paths...>
```

## Known Issues

- **Committed-vs-live drift** (2026-09-13 to 2026-09-19): main was NOT runnable alone (4 chain producers untracked; `run_pipeline.py:452-453` validates producers at import so a clean checkout died before step 1; 248 unresolvable references). Reconciled 2026-09-19 (35 whole-file commits `109249aaa`..`a19c796d2`); status 498 to 279, 28 unresolved references remain (all name the generated `cu-member-desk-profiles.js`). Detail below.
- **Mixed line endings:** 312 of 2,892 tracked text files MIXED (working-tree-only). Detail below.
- **Kernel baseline reds** at `624e593eb`: 246 passed / 2 FAILED in 7.6 min = `test_bill_collision_guards` (missing `backups\bill_directions.PRE-LEGFIX3.csv`) and `test_make_staffer_network_html` (unrecognised verdict). Flakes: `test_press_baseline_fold` (errors=1 in-kernel, 21/21 OK alone), `test_legislation_base_network` (failed ~2/3 IN-KERNEL runs with bare AssertionError in the Phase 3 window, passes standalone and in sequence replay; unresolved; opt-in trap `RUNTESTS_DUMP_DIR`).
- **scipy-import freeze** on Windows (see hang diagnosis): `member_context.py` imports scipy at module scope; proposed (not applied): lazy import and `OPENBLAS_NUM_THREADS=1`.
- **`fec/weekly_refresh.py`** own launcher NOT bounded: `:279 communicate(timeout=)`, `:312` unbounded `proc.wait()` after kill; whole-chain bound 7200 s at `:464` is below the 261.6 min the chain once took; per-producer atomicity under a kill unaudited.
- **Unregistered suites:** `fec/tests/infra/test_process_liveness.py` registered in no runner; `fec/tests/test_primacy_tier.py` writes `source.json` into the repo root (open, 2026-08-04); kernel gate reaches 105 of 265 tracked suites (S-2 of the 2026-09-13 code review: 92 unreachable in both trees).
- **Pre-existing:** `fec/stance/api_stance_layer.py` IndentationError; `main`'s `pipeline_lock.py` and `audit_full.py` used `os.kill(pid, 0)` for liveness, which on Windows TERMINATES the process (fix `fec/process_liveness.py` existed only in live before the reconcile).
- **Audit state:** `audit_full` standing reds: 199/1 (crown-law, 2026-08), later 559/9 (laundry-list 2026-09-19, step table + FAILURES list vs previous run); with standing reds exit 0 is unattainable and PIPELINE COMPLETE never prints (DE-044).
- **Layout-bound artifacts:** artifacts that record paths are layout-bound (allowance registries, prerequisite sets, `inputs_sha256` keys, receipt bindings); every reorg batch must expect them.
- **WEEKLY REFRESH:** 2026-08-05 note: next run ends Last Result 1 while the pre-existing crown-law audit failure stands (the refresh treats any `audit_full` failure as HARD FAILURE at its last step; everything real completes, only the final gate reports red; fix = resolve the crown-law workbook stance column mismatch, Paul's domain).

## Architecture

### Paths and shared kernel (refactor executed 2026-07-02; user: "Proceed down list")

VERIFIED behavior-preserving: kernel tests 28/28 + pipeline + audit 50/50 + zero rank delta across 533 members. Review: `ARCHITECTURE_REVIEW_2026-07-02.md`.

- **`fec/paths.py` = single source;** env overrides `MONEYBALL_ROOT` + `MONEYBALL_DRAFT` (Draft Systems R-pipeline root). 193 literals across 95 files replaced with `MB_ROOT` / `MB_DRAFT`; every fec script has a one-line bootstrap header (sys.path insert + import). Downloads one-shot refs left literal. `paths.py` defaults ROOT to the live tree, so scripts run from a `.claude` worktree still read/write LIVE data.
- **Shared kernel `fec/moneyball_core.py`** (lazy + cached; no import-time IO): congestion / members / name2bio / bio2name, `party()`, `bpf()`, `receptivity()` / `rc()`, `load_network()` (mean-symmetrized; CONTRACT: every member has an entry, isolated = {}), **`cpf_diffusion` vs `cpf_pressure` (two named physics - never merge)**, `sm64` CRN, `build_P()`, PERS (`PERS_NONE` dial), IMP (18 cats), blocks / BLOCKCAT / CATBLOCKS, SGATE / gate. Adopted in 10 live engines. Second wave NOT yet adopted at first: scenario, cosponsor_route, lt_priming, method_audit, assemble_viz, press_engagement_layer, press_hcoi, stance_dynamics, big5_traits (party loader).
- **Adoption gotchas (cost 3 pipeline failures, all caught by the gate):** (1) old per-file loaders were defaultdicts - members with no edges returned {}; the core dict must setdefault every member; (2) blocks to BLOCKCAT span replacements swallowed the `labels=` line between them in 3 files; (3) cascade engines use `MC` as the Monte-Carlo count var - core module alias is `MBC` there, `MC` elsewhere.
- **Layout (2026-07-02):** `fec/attic/` = 36 dead one-shots (git mv, history preserved). `audit.py` is LIVE (an `audit_full` subprocess dependency - restored after mis-attic; later renamed `fec/audit/legacy_workbook_audit.py`). `sync_stance_clean.py` + `apply_stance_guard.py` hard-guarded (sys.exit at top). Workbook backups go to `backups/` (blend + future writers point there). `fec/tests/run_tests.py` = 28 kernel checks (then 30), zero deps, run before any pipeline after code changes.
- **Import == execution** (guardrails 2026-07-02): only 3 of ~103 fec scripts have `__main__` guards (`per_topic_flip`, `money_response`, `make_member_desk`); import-safe: `paths`, `moneyball_core`, `flip_model`, `money_response`. 27 scripts write the live workbook or artifacts (all `apply_*`, `sync_*`, `write_*`, `build_media_blend`, `build_social_master`, `process_quorum`, `make_dashboard_html`, `run_pipeline`, plus 8 attic scripts). Attic scripts are NOT reliably hard-guarded (`attic/sheet_sync.py`, `attic/sync_stance.py` execute on import with hardcoded live paths): never run/import attic. `tweet_collector.py` hits the network. Run `audit_full` and kernel tests only as read-only executables (audit was 62 checks as of run-5b; zero write calls). RECALC force-killed all Excel processes then COM-saved (documented truncated-save incident); RECALC/COM is RETIRED: never kill Excel. Full audit-run guardrails: [[2026-07-troubleshooting-melange-audits-and-reviews]].
- **Verification protocol (canonical):** code change, then `python fec/tests/run_tests.py`, then `python fec/run_pipeline.py`, then rank delta vs the last `ranks_*.json` = ZERO (unless the change is SUPPOSED to move ranks), then audit clean (50/50 at that date). See [[zero-rank-delta-verification]].
- **Second-wave adoption COMPLETED same day (commit e329e19):** scenario / cosponsor_route / lt_priming full; method_audit / assemble_viz network-only; scenario's cascade P deliberately KEPT LOCAL (predates receptivity `edge_mult`; adding it = behavior change, separate decision). Template extraction: `make_dashboard_html` 52 KB to 1 KB, `make_member_desk` 89 KB to 29 KB, into `fec/templates/*.tpl` via the `_tpl()` loader; VERIFIED by hash-identical regenerated HTML (all three outputs byte-deterministic). Still local by design: press_engagement_layer / press_hcoi in-function loaders, stance_dynamics, big5 numeric party map, assemble_viz legacy PERS.

### Operational guardrails for audit/review runs touching the pipeline (full text on [[2026-07-troubleshooting-melange-audits-and-reviews]])

Memory `moneyball-audit-run-guardrails` (2026-07-02, "NextToken" rubric replaced by a sanitized one; updated through 2026-07-10). Pipeline-side facts, kept here as well:

- WAL mtime trap (2026-07-05): `social_media.db` main file mtime freezes until checkpoint; judge collector liveness by `iv_fetch_log` / `fetch_log` latest ts (UTC) or the `-wal` mtime; "db untouched for 15h + live process" is not hung. Interviews are in `speeches` (source=INTERVIEW), not `posts` (bluesky only). CPU-liveness is judged over a 20-60 s window; `fetch_interviews` got `socket.setdefaulttimeout(90)` at module load (run-5i, 2026-07-06).
- Corpus exact-dup guard (run-5j, 2026-07-06): 1,142 exact-full-text dup rows (CREC 922 / INTERVIEW 180 / CHRG 40) deduped to MIN(rowid); `run_crec` / `run_chrg` carry a stored-package guard; audit guard added (audit = 62).
- Desk pillar-display drift (run-5h, 2026-07-06): the desk showed workbook pillar percentiles/weights (Crapo influence 1.000 displayed as 0.222; weights 0.40/0.20/0.35/0.05 vs live 0.25/0.30/0.40/0.05); now read from `ranks_python.json` (pcts keys to `leg_n` / `press_n` / `comm_n` / `demo_n`; `ab_weights` 2/3/4/5), 2 audit checks (audit = 61).
- New-collector-leg checklist (run-5a): date coverage (`select count(*) ... where date=''`), member breadth, `iv_fetch_log` "ok" semantics; leg modules such as `co_appearance` / `big5_llm` / `member_references` have schema guards in `audit_full`.
- Pre-GATE-2 deep audit (2026-07-07 @ce1482d): `big5_llm` cache key now hashes chunk text (4,214 chunks, ~$158, `--batch` 50% off, "re-score"), 60 s heartbeat thread, `c_prereg_test.py` absolute paths via `gate_step`, spend caps `B5_GATE_CAP=200` / `REF_GATE_CAP=100`, `B5_FAST=0`; fox intra-page transcript dedup (0ab0b26).
- Frontier purity test: engine to `FRONTIER_OUT` temp must byte-match the chain's artifact; a `big5_traits.py` loop may write mid-audit (check live user jobs first; baselines serially).
- Attic scripts are not reliably guarded: the "hard-guard 2 destructive scripts" commit covered other files; `moneyball-audit-run-guardrails.md` records that all data artifacts are gitignored (100% of `*.json/csv/xlsx/db/txt/html`), so overwrites are unrecoverable via git.
- Weekly-refresh task hardened 2026-07-05 (WakeToRun, 3x30 min restarts, 3 h limit via `Set-ScheduledTask`).

### Phase 2 complete: system of record inverted (commits 23c48ea + fd9f3d6, Paul's sign-off, 2026-07-02)

- **`ranks_python.json` = THE rank authority** (`compute_pillars --write`; engines read `MC.scores()` / `ranks()`); the workbook = self-refreshing VIEW (all writers set `fullCalcOnLoad`); **NO COM anywhere** (`sync_stance_g` rewritten with openpyxl; RECALC step deleted; `--recalc` = retired no-op). See [[2026-07-rfc-melange-architecture-system-of-record]] and [[moneyball-workbook]].
- **CRITICAL FILE PHYSICS learned:** (1) **openpyxl saves STRIP cached formula values** - after sync/blend, data_only reads of FORMULA cells (Blended names / O / E / F, R&A col C, normalized cells) return None until Paul opens Excel; TYPED cells survive (R&A names + col G, AB dials, Press Raw, row-535 weights). This was the dragon COM-recalc had been papering over. (2) **openpyxl read_only + random `.cell()` = O(sheet) per call** (640 s pathology) AND misreads openpyxl-saved files - never use read_only for random access.
- Resolution: O/E/F via `pillar_inputs_snapshot.json` (refreshed while cache alive; fallback when dead - CORRECT since O/E/F change only via Paul's Excel edits which revive caches; auto-bootstrap from the newest cache-alive `backups/` copy); roster from R&A col A; chain = authority BEFORE the cache-killing sync; `audit.py` view-aware (allocation checks skip when stale, ranks from authority); S2-04 repointed to R&A.
- VERIFIED: snapshot-mode ranks == baseline EXACT 0/533; pipeline end-to-end no-COM (~19 min on a cache-dead workbook - slower parses; optimization candidate: cache the frozen LegNorm sheet); audit 52/52; kernel 30/30. IM headline Moreno to Tim Scott = known col-G two-pass convergence, not drift. Also: heredoc transforms are BANNED (a heredoc-injected backspace control char in a glob path cost a debugging cycle); transforms go in scratchpad files.
- **Audit S2 remedies applied (commit bf4a703, 2026-07-02 eve):** S2-01 bipartisanship = COSPONSOR-ONLY again (the bundle had silently computed it from the AUG graph - social/press edges leaked into `bpf` to `cpf_diffusion` / tgt / coalition feedback; `BP_SRC=aug` env restores the augmented definition if Paul ever ratifies; effect: 19 optimizer allocs shifted, 17/17 frontier paths, IM headline Hill to Moreno, RANKS UNTOUCHED). S2-02 loud guards on missing big5 / `electoral_plays` inputs. S2-03 `MC.dump_atomic` (tmp + `os.replace`) at ALL 14 artifact writers - kernel tests now 30. S2-04 audit check workbook-rows == roster. S2-05 `rebuild_press_cache.py` (refuses post-blend sources via Z1 check). S3: 58 unused imports pruned across 28 files. Verified: kernel 30/30 x2, pipeline x2 (run 2 propagates corrected `bp` - the bundle writes `bipartisan.json` LAST, so bp fixes always need two runs), audit clean x2, zero rank delta x2.
- **ROADMAP No. 9 PHASE 1 DONE (commit 279f5e5):** `fec/compute_pillars.py` reproduces the ENTIRE workbook rank chain (raw, pos/neg-max normalization, SUMPRODUCT pillar, Press% / Leg% / Infl% / Demo%, score, rank) in Python - **parity EXACT 533/533 ranks, scores <1e-7**, wired into `audit_full` as a formula-drift tripwire (**audit = 52 checks**, kernel tests = 30). KEY EMPIRICAL PIN: Excel `PERCENTRANK(...,5)` truncates to 5 **DECIMAL** digits, NOT significant digits (94 sub-0.1 members exposed this). The write path (Python computes, workbook becomes rendered view; retires the COM-recalc/OneDrive failure class) needed Paul's sign-off since it inverts the system of record (granted: see Phase 2 above). Also this pass: README rewritten to post-refactor reality (S3-07), gold queue party from roster not stale bundle (S3-04), bare except narrowed (S3-02 - bf4a703's message had over-claimed this), receptivity docstring now matches the graded-shrinkage code, spec dials +`SOC_VOLFLOOR` / `SOC_MEN_W` / `BP_SRC`.
- **Pillar weights (resolution 3):** the pillar-weight configuration `compute_pillars.py` / `ranks_python.json` uses has three recorded sets: `.40/.30/.20/.10` (2026-06-29, historical), `30/25/40/5` (ratified 2026-07-07: LAST RATIFIED), `45/10/40/5` (live in `ranks_python.json` since 2026-09-03: LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling; live-only `fec/engine/pillar_policy.py` is a fail-closed desk gate encoding it). See [[2026-07-troubleshooting-melange-audits-and-reviews]].

### Staff directory + desk CRM (commit eaefc2f)

`fec/build_staff_directory.py` weaves Quorum staffer exports (Downloads 45-52; `STAFF_SRC` env) into `staff_directory.json` - 5,773 staffers matched to ALL 533 offices via "Member Works For" with a never-guess ladder (quoted-nick strip, accent fold, NICKF nickname map BOTH directions - the roster may hold the nickname e.g. "Mike Kennedy", leadership prefixes Leader / Whip / Speaker / Commish with chamber inferred from the district token, surname+chamber-unique fallback, "pablo jose hernandez" alias). Only AS/GU/VI delegates unmatched (not in roster - correct). Industry star = title regex; "Financial Administrator" excluded (office ops). Member-desk Staff section renders per-staffer cards (gold outline = contacted toggle, star auto+toggle, notes, media links, meeting flag, filter box); "In contact" nav panel groups meeting-flagged staffers by office with export/import; state in localStorage `mdesk_staffdir_v1` (data-act delegated handlers in `make_member_desk_00.tpl`). Desk `L()` helper RETURNS PARSED JSON (not a path) - do not double-load. Browser-verified via preview (Tim Scott: 18 cards, Tax Counsel auto-star; gold / note / panel round-trip).

### Audit runbook + weekly automation (commit 9adc4c1)

- `/fable-audit` project slash command (`.claude/commands/fable-audit.md`) = the extensive audit + TRUE RUN-THROUGH mission for any future session - baselines (kernel 30 / audit 52 / compile sweep), run-through gates (all-OK chain, clean audit, ZERO unexplained rank delta, artifact-hash stability, determinism spot), P1-P5 sweeps incl. UI smoke, known-benign registry, verified fix-lane protocol.
- **Windows Task Scheduler task `MoneyballWeeklyRefresh`** (Sundays 06:00 as recorded 2026-07-02; `schtasks /Delete /TN MoneyballWeeklyRefresh /F` to remove) runs `fec/weekly_refresh.py`: incremental CREC(14d) / CHRG(60d), big5, social edges, network, blend (Excel-lock tolerant), full pipeline + ALL dashboards, rank-movement line, logging to `weekly_refresh.log`. Proof run 2026-07-02: all steps OK, 9 min total, rank movement 0/533. Manual-only collectors (Quorum exports, X/Truth keys, Bluesky discovery) stay outside unattended scope.
- ~~Task schedule "Sundays 06:00"~~ (2026-07-02) - superseded by the 2026-08-05 post-completion note: task is **Sat 6:00 AM**, invoking `fec/weekly_refresh.py` (still valid post-reorg). Hardened 2026-07-05 (WakeToRun, battery-start, no-battery-stop, 3x30 min restarts, 3 h limit).
- Last run 08-02: all collectors + layers OK (tweets collected, `social_media.db` updated), ABORTED at the final FULL PIPELINE step on the culling-surface audit check - since resolved by the promotion-era regens. The NEXT run (08-09) was expected to still end Last Result 1 while the crown-law audit failure stands. Tweet collection healthy: `social_media.db` 08-02 06:17 (refresh-driven), `x_catalog.jsonl` 08-02 12:49 (Grok lane).

## Reorganization (REORG COMPLETE @a05a8e4, 2026-08-05): 9 code domains / 9 data domains / 8 test domains

Memory `reorg-phase0-tripwires-2026-08-04` (plan: `REORGANIZATION_PLAN.md`; relevant to [[zero-rank-delta-verification]] gates and [[2026-07-rfc-melange-architecture-system-of-record]]). Summary: all 3 phases done + merged - 9 code domains, 9 data domains, 8 test domains, core = fec root (9 hubs + 2 entrances); chains resolve by basename; receipts relocation-aware via `fec/audit/live_relocations.py`, closure 47/8; stale-import tripwire = kernel check 150; ranks `736A9564` byte-identical throughout.

### Phase 0: four read-only tripwires (built and committed @15560ea on `claude/cfpb-sentiment-recorrection`, the live tree's branch; nothing had moved yet)

All `python fec\<name>.py`, `--json`, exit 1 on findings:

| file | result 2026-08-04 |
|---|---|
| `fec/audit_chain_steps.py` | 0 hard, 164 informational |
| `fec/audit_content_freshness.py` | 0 findings, 5 surfaces |
| `fec/audit_path_resolution.py` | 70 hard (~31 distinct artifacts), 32 info |
| `fec/audit_output_consumption.py` | 30 hard, 44 info |

The two failing ones report **pre-existing residue**, not regressions. Inventory with suggested dispositions is in `REORGANIZATION_PLAN.md` under "What Phase 0 found".

**THE number for scoping Phase 2 is ~300 DISTINCT ARTIFACTS, not the construction count.** Successive scanners gave 102, 708, 1058, 2515 constructions while distinct artifacts held at 300, 300, 301. The construction count is an artifact of what you choose to count and moved ~25x without the tree changing. Do not re-argue Phase 2 risk from it.

**Standing gate (all four must hold):** kernel `run_tests.py` 89/0; `test_lda_rebuild.py` full count; full chain to `audit_full` with no new failures; **`ranks_python.json` byte-identical** (then `736A95644E37B4CC...`).

### Open items closed @a14543e (Paul: "Yeah lets chain in lobby-interactions / Fold test lda into one kernel runner")

- `make_lobby_interactions_html.py` is now a CHAIN step (after `make_lobby_network_html.py`; NO ordering constraint against `make_combined`, which deliberately does not merge it). Chaining it proved the surface was **unbuildable**, not just stale - bank-tier work grew `_load_sector_roster` 3 to 5 return values and the builder raised on every run. **Coverage != wiring: `audit_content_freshness` PASSED on it the whole time**, because the deployed page did carry the builder's honesty strings. No audit here can detect a builder that raises at runtime - the chain-step audit only parses producers (importing one executes work). Only being in the chain catches it. Its ledger producer `lobby_interactions.py` stays UNCHAINED on purpose (position classification, expensive) - the ledger is a manual refresh.
- Kernel runner: `run_tests.py` was pointed at **14 of 118** suites. Now 17 - `test_lda_rebuild`, `test_lobbyview_network`, `test_lobby_interactions`. **92 passed / 0 failed in 56 s.** Its registration regex was case-sensitive and matched neither new suite; needs `re.I`, and any suite added must print `N passed, M failed` on stdout.

### Legislation/culling lane DONE @5e87439: kernel 92 to 131 passed / 0 failed, 56 s to 75.8 s

39 of 59 registered. **CORRECTION to an earlier claim:** the orphans are NOT uniformly non-pytest - that was generalised from a 4-file sample. Of 118 suites: 75 unittest, 25 self-running, **11 pytest**, 5 bare-tests-no-runner. Key facts for the remaining ~63 orphans:

- **`run_tests.py` now reads FOUR native verdict shapes** (`N passed, M failed`; unittest `Ran N tests` + OK/FAILED; reflective `PASS <name>` lines; `N BILLSTATUS ... tests passed`), from **stdout AND stderr** (unittest writes its summary to stderr). So a suite usually needs NO edit to be registered. Unrecognised verdict = FAILURE by design, never a skip.
- **`fec` has NO `__init__.py`** - it resolves as a PEP 420 namespace package. Suites using `from fec import ...` only work with the repo root on `sys.path`, not via `python fec/tests/x.py`. 9 suites are held on this.
- **Settle vacuity by TRACING, never by AST.** An AST scan wrongly flagged 10 suites because the house idiom invokes tests reflectively (`for name, value in globals().items(): value()`). `sys.settrace` counting executed `assert` lines found the truth: 3 fully vacuous + 1 at 6% (`article_cross_reference` defines 74 assertions and runs ZERO).
- **Snapshot method that worked** (reuse it): a git tag is NOT sufficient - `*.json` / `*.csv` are gitignored, so code-only. Add a manifest (sha256 <8 MB, size+mtime above) over repo root + fec + tests + BOTH `%LOCALAPPDATA%\Melange\*\derived` roots, plus a physical copy of repo-root files <2 MB (~48 MB). All 59 ran with **0 mutations**, re-verified byte-identical twice.
- **This lane is NOT in the chain:** 57 of 59 cover non-chain producers (it runs manually). Coupling is indirect but real - its artifacts are read by `audit_full.py`, which IS a chain step.

### ALL 20 RESOLVED 2026-08-04 second pass (Paul: "fix all of those"), MERGED TO MAIN @4647555

Commits 97a65f8 (re-attestation) + 9499cef (merge) + 4647555 (plan record); cfpb == main.

- **18 registered, kernel 149/0 in ~2.5 min.** pytest 9.1.1 installed (Paul-authorized). Runner reads FIVE verdict shapes (pytest shape E gated on the timed-summary signature, stdout+stderr); the pytest lane runs `-p no:cacheprovider` (else `.pytest_cache` mutates the tree) with the PKG env (root + fec on PYTHONPATH). Parser negative-controlled 23/23. The runner's own unrecognised-verdict guard caught a lane misclassification of `test_legislation_culling_integration_contract` (a bare-tests file: exits 0 executing NOTHING under plain python). `dump_atomic` leak check scoped to its own temp pattern - the global `%TEMP%` scan false-alarmed under concurrency.
- **The presync pair now PASSES (readiness 27/0, presync 37/0) but stays OUT of the kernel BY DESIGN** - operational sync-time gates bound to live mutable receipts; the workbook drifts on every user edit; registering them = cries-wolf.
- **Receipt re-attestation, dependency-ordered** (decay, rank-drift, downstream, behavior, planning, ooxml, formula): the downstream closure pin legitimately grew **20 to 36 of 55** with per-file provenance (0 healed, exact closure retained); a stale semantic pin repaired (decay `production_baseline.passed` was decoupled from live drift during promotion prep - downstream still required the old coupling); workbook re-bound @sha `5001e7df`; twin isolated Excel recalcs gave identical ledgers `837d0f32` (the a==b identity IS the determinism proof); behavior trust pin + `EXPECTED_LIVE_SHA256` + all producer/test/fixture pins moved in lockstep (fixtures MODEL the closure, so they move with it).
- **Order-of-operations law: producer edits BEFORE regens** - the ooxml receipt binds its own producer's source bytes; editing the producer after regenerating invalidated the receipt.
- **NOT touched, deliberately:** manual policy approvals (human inputs, never synthesize), the frozen 55-file baseline (immutable), external import/model receipts (no writer exists), the search registry (high blast radius).
- OneDrive `WinError 5` hit twice on snapshot dir renames - orphan-removal + retry cleared both.
- Formula evidence dir `C:\tmp\legislation-formula-cache-freshness-20260804T155150Z` must be RETAINED (validation reopens the receipts).
- Codex lane law (Paul, permanent, in the metaloop skill): always xhigh + priority (never pass a lower effort override - the global config already sets both); max effort / full mode is the metaloop default.
- Still open then: `fec\tests\test_primacy_tier.py` writes `source.json` into the repo root.

See `lobbyview-integration-2026-07-31` for the lane this sits in, and `verify-dont-infer-completion-2026-08-04` for the verification lessons that came out of it.

### REORG EXECUTION STATE (2026-08-04 late, run `run-20260804T2021407173543Z-4d7c2d0d27`)

- **Phase 1 @fa66617:** 118 tests moved to `fec/tests/{legislation 64, infra 15, members 11, engine 8, collect 8, lobbying 5, stance 4, district 3}`; 117 `__file__`-depth bumps; both runners use a recursive resolver that raises on dupes/missing. Gate 149/0.
- **Phase 2:** A@923e75c (network / district / lobbying / money, 29 files + 4 relocations after a classifier bug: "sna" matched inside "snapshot"); B@2c7766d (engine / legislation 14 moved, 15 SKIPPED: 5 baseline-bound, 9 receipt-bound, 1 script-bound - list in the commit message); C@ec6e9ab (stance 68 moved, 5 receipt-bound skips, `.tmp` write/read pairing verified); D@caba359 (members 46 moved, 7 receipt-bound skips).
- **REMAINING at that point:** batch E = misc domain (~50 files / 310 sites) via `reorg_worklists.json` in session scratchpad `ac6ab6dd...`; then full chain (`run_pipeline --from make_dashboard_html.py`) + `audit_full` (expect 199/1, crown-law failure pre-existing); then `REORGANIZATION_PLAN.md` update; then ff main at the `cxwt-main-merge` worktree; then metaloop finish.
- Gate per batch: kernel 149/0 + freshness 0 + ranks `736A9564` BYTE-IDENTICAL. Snapshot: tag `pre-reorg-20260804`, manifest + backup in scratchpad `SNAPSHOT-pre-reorg`.
- **LESSONS:** codex MCP times out ~30 min silent but its WORK COMPLETES - inspect the tree, never redo blindly. Codex force-staged gitignored artifacts (`git add -f`) in batch D - a 403k-line commit; fixed via parent-commit truth (tracked-at-root = legitimate rename stays tracked; else `rm --cached`). `git check-ignore` SKIPS tracked files - it cannot detect wrongly-tracked-ignored files; use parent-tree membership instead. Keep-at-root set: deployed surfaces, workbook family, dbs, `ranks_python.json`, and every receipt/baseline-bound artifact.

### FINAL STATE (run `run-20260804T2021407173543Z-4d7c2d0d27`, merged @0e19f1e)

- Batch E @40cb28c (misc, per-file routing; `.mcp.json` REVERSED to root - Claude Code config is root-discovered). Phase 2 close-out @021bb9f (full chain green: `audit_full` 199/1 after regenerating `behavioral_dispositions.json`, whose `inputs_sha256` KEYS are layout-bound). Phase 3 pilot @0e19f1e: 17 leaf collectors to `fec/collect/`; 8 excluded (7 static imports + `collect_govinfo_bill_xml_versions` via DYNAMIC `__import__` that static grep cannot see - the kernel gate caught it).
- Phase 3 next sittings (as planned then), in order: audit, district, stance, members, legislation, lobbying (late - most active), surfaces, core (last). Pilot recipe: exclude anything imported by outsiders, bump bootstrap `__file__` depth by one, update invocation sites (ps1 launchers, `weekly_refresh`, acceptance service), gate with kernel + the UNREGISTERED suites of that domain run directly.
- ARTIFACTS THAT RECORD PATHS ARE LAYOUT-BOUND: allowance registries, prerequisite sets, `inputs_sha256` keys, receipt bindings. Every reorg batch must expect them; fix the DATA (or regenerate deterministically), never weaken the test.

### PHASE 3 PROGRESS (run `run-20260805T0217417406130Z-c599876b75`, merged @0fd69cb)

- **Chain resolver @4c79a3c:** `run_pipeline.py` + `weekly_refresh.py` resolve invoked scripts by recursive basename map (tests / attic / quarantine excluded), RAISE on missing/duplicate. CHAIN entries are location-independent - domain moves cannot break chains by construction. 401 producers, 0 dupes.
- **audit/ domain @0fd69cb:** all 33 `audit_*` / `verify_*` / `dashboard_integrity` into `fec/audit/`. LANDMINE: `fec/audit.py` (legacy standalone workbook audit, EXECUTES 22 checks ON IMPORT) shadowed the namespace package - now `fec/audit/legacy_workbook_audit.py`. Import sweeps must cover FOUR forms: `import X` / `from X import` / `from fec import X` / dynamic strings (`__import__`, `import_module`, `spec_from_file_location`, test matrices).
- **Domain-move recipe (proven):** `git mv`, bootstrap `__file__` depth +1, rewrite all four import forms with aliasing, invocation sites (ps1, runbooks), gate = kernel 149/0 + freshness (from the NEW tripwire location `fec/audit/audit_content_freshness.py`) + ranks `736A9564` byte-identical + `audit_full` through the resolver (199/1 crown-law pre-existing).
- **REMAINING Phase 3 domains in order (at that point):** district, stance, members, legislation, lobbying (late - most active), surfaces, core (LAST - `moneyball_core` imported by 139).
- **FLAKE, unresolved:** `test_legislation_base_network` fails ~2/3 IN-KERNEL runs with a bare AssertionError, passes EVERY standalone and sequence-replicated run. Opt-in trap armed: set `RUNTESTS_DUMP_DIR` to capture full output of any failing suite in the kernel.
- **Codex escalation protocol (Paul, permanent, in the metaloop skill):** flaws / errors / obvious improvements go into an ESCALATIONS section to Fable; POTENTIAL improvements: Fable consults Paul FIRST. Two pending Paul decisions then: (1) a static gate rejecting stale moved-basename imports repo-wide; (2) a `main()` guard on `legacy_workbook_audit` so import cannot execute its 22 checks (both subsequently done: see below).

### PHASE 3 COMPLETE (2026-08-05, merged @a05a8e4)

- All domains moved: collect 17, audit 36, district 7, stance 47, members 120, engine 30, legislation 87, lobbying 28, network 10, surfaces 11 + templates. fec root = 9 hubs + `run_pipeline` + `weekly_refresh` + 3 attic candidates (`repair_institutional_influence`, `repair_sublayer_categories`, `update_primacy_fixture` - Paul's call).
- **CORE DECISION:** hubs stay at the fec root (`paths` 273 importers, `moneyball_core` 156 - a `core/` dir = ~500 rewrites for zero gain). Revisit only if hub-and-spoke import enforcement is wanted.
- **IDENTITY vs LOCATION law:** the immutable baseline manifest keeps identity; `fec/audit/live_relocations.py` (27 entries) redirects live reads for decay / downstream / presync; planning inherits via drift-ledger rows; the weekly-refresh closure compares on BASENAME (downstream identities carry `fec/` prefixes). Closure re-attested 36 to 47/8, receipts regenerated (downstream `11d7b68a`, planning `4ff667a8`), behavior pin lockstep.
- `audit_stale_imports.py` = kernel check No. 150: dynamic 389-module ledger, four forms, `# stale-ok:` pragma, `spec_from_file_location` = name-not-path. `legacy_workbook_audit` import-inert (`main()` guard).
- Codex MCP timed out 4x ~30 min; work complete 3x, genuinely incomplete 1x (legislation) - ALWAYS inspect. OneDrive rolled back 4 edits once (files resurrected with old content) - verify persistence after edits. Dropped `as ALIAS` was the recurring codex rewrite bug.
- Full chain green from the new layout: every producer resolved by basename, surfaces rebuilt, `audit_full` 199/1 (crown-law pre-existing). Kernel 150/0. Freshness 0. Ranks BYTE-IDENTICAL through ~18 gates.

### POST-COMPLETION (2026-08-05, merged @b6b61fc)

- Attic candidates RESOLVED (Paul: "attic those 3"): `repair_institutional_influence`, `repair_sublayer_categories`, `update_primacy_fixture` now in `fec/attic/` (all three scanners verified to exclude attic).
- Closure constants CENTRALIZED: `fec/audit/drift_closure.py` = single source of `EXPECTED_CHANGED_NAMES` + 47/8/55 (counts derived, import-asserted); consumed by the downstream audit, the presync module, and all three test suites incl. the infra fixture.
- **SYNC-RECEIPT LAW (learned twice that night):** every full-chain run re-drifts the live surfaces and STALES the presync receipts BY DESIGN. Green presync suites require a receipt cycle after any chain run: decay, rank, downstream (new id, then behavior pin), behavior, planning (new id, then presync-test pin), ooxml. ~10 min. This is re-attestation cadence, not damage.
- WEEKLY REFRESH facts: see the Architecture section (task is Sat 6:00 AM; last run 08-02; crown-law failure keeps Last Result 1).

## Live tree vs committed tree: drift (2026-09-13 census, reconciled 2026-09-19)

Memories `committed-vs-live-drift-2026-09-13`, `melange-live-tree-reconcile-2026-09-19` (detail on [[2026-07-troubleshooting-melange-live-tree-git-drift]]; code-review context on [[2026-07-troubleshooting-melange-audits-and-reviews]]).

### Census 2026-09-13 (batched blob-hash census, `census/live_drift2.md` in the code-review packet; main at the time `2f11d9490`)

- **Live-only, untracked, required by committed code:** `fec/engine/pillar_policy.py` (imported by `audit_full.py:107`, `dashboard_integrity.py:9`, and via it `make_member_desk.py:28`, so the committed desk producer and audit harness cannot import; encodes pillar weights 45/10/40/5; byte-identical to the Codex f149 blob `d68ddcda6`); `fec/members/wikipedia_biographies.py` (467 lines, network I/O; required by `weekly_refresh.py:353`) plus its untracked test; `fec/tests/members/test_email_package_variant.py` (registered at committed `run_tests.py:386`, so the committed kernel runner raises at import; the live runner tolerates missing names); `fec/surfaces/staffer_live/index.html` (`.gitignore:20 *.html`; the live `.gitignore` has the negation but the file is still untracked); also `audits/staffer_network/politico_crawl_watchdog.ps1`.
- **53 files cited in review findings differ in content (not line endings) between HEAD and live,** e.g. `run_tests.py` 580 vs 730 lines, `build_member_narrative_ledger.py` 586 vs 1,254, `make_member_desk.py` 2,539 vs 3,026, `verify_collector_roster_updates.py` 794 vs 954, `audit_full.py` 2,534 vs 2,711, `run_pipeline.py` 546 vs 619, `staffer_graph_snapshot.py` 341 vs 427.
- **Defects fixed ONLY in live (uncommitted):** POSSIBLE_ONLY co-tenure filter at the snapshot read; the live Groups tab route and allowlist; the CREC "no session" typed 404 check; the Fox `--strict` contract; the audio adapter/descriptor key handoff; the narrative ledger audio shapes (partly); the missing-suite tolerance in `run_tests.py`.
- The live tree is single-disk: OneDrive stopped ingesting it around 2026-08-11 (`backup-coverage-gap-2026-09-07`).
- **Mentat addendum (verified 2026-09-15):** the Mentat console (`mentat/app/`: `server.py` on 8802, Chart Studio, PAC evidence, `index.html`, `app.js`) exists ONLY in the second checkout `C:\Users\pgoff\Mentat` on branch `codex/mentat-crypto` (65 tracked files there; 24 commits ahead of main; merge-base `78ef3488f`). `main` and every worktree cut from main have NO `mentat/app/` directory and older `mentat/R/*` (e.g. `fec_api_fetch_with_retry` at line 392 on main, 412 at `codex/mentat-crypto` HEAD, 430 in the live working tree). The Mentat live tree also drifts from its own HEAD: 58 tracked-modified + 201 untracked files on 2026-09-15. A verifier that greps the session worktree instead of `C:\Users\pgoff\Mentat` returns "file not found" FAILs that are tree artifacts, not defects.
- **Why:** the repo's operating convention is "work in the live tree, commit later"; the commit gap grew until main was not a working system and worktree reviews saw stale code.
- **How to apply:** (1) A HEAD-only finding is provisional until the live file is read; run the batched drift census first (three git calls: `ls-tree -r HEAD`, `ls-files`, `hash-object --stdin-paths`; never per-file git on the OneDrive tree). (2) HEAD-based patches must be `git apply --check`ed against a scratch copy of the live file; expect failures in `run_tests.py`, `verify_collector_roster_updates.py`, the staffer surfaces. (3) The highest-value action Paul can take is a reviewed commit pass of the live tree (weights ruling first, see S-5 on [[2026-07-troubleshooting-melange-audits-and-reviews]]). Related: `live-tree-branch-state-2026-07-14`, `scout-census-traps-2026-09-13`.

### Reconcile 2026-09-19 (worktree `objective-booth-56caf1`; task raised by the laundry-list close-out N8-N10)

Paul's brief: read-only inventory, group by lane, PRESENT and WAIT; every group is a separate approval (`ask-before-substantive-changes`).

- **OUTCOME 2026-09-19 (supersedes "nothing committed").** Paul answered the presented plan with "Do whatever is most optical, there should be no caps" - a blanket go-ahead that does NOT generalise to other lanes. The session held until the laundry-list session finished its own landing in LIVE (it asked; ff-merge `776ce0d3a` to `333cafbf3` to `109249aaa` plus a chain run), then landed 35 whole-file commits `d97e775ae`..`a19c796d2` (an independent re-census of `da32d3016` took unresolvable references 248 to 34 and caught ONE gap introduced by the session - three committed fec/speech tools import `audits/longform_collection_20260904/audit_primary_transcript_quality.py`, which the candidate set had skipped because it only took `.md` from audits/; closed by `a19c796d2`; the 28 rows left all name the generated `cu-member-desk-profiles.js`; brain D-051 "record, not ratify", DE-036 "mtime cluster is not lane evidence", STATE committed abbd5e4). Phase 1 (`paths.py` roots, process/pipeline safety, the four chain producers), then the lanes, ten code-review commits by review lane, `audit_full.py`, research packages, docs, the manifest PRODUCER, two SKILL.md edits, and the laundry-list lane's five hook paths in one commit as it asked (the 35 commits are described as `109249aaa..a19c796d2` in the summary line). Every commit verified: holds exactly its group's paths, paths clean after, nothing left staged; a Glass Box event per commit (run_id `live-tree-reconcile-20260919`). Proof read from git objects only (`PLAN\proof_head.py`): chain producers untracked 4 to 0 of 80; 1,654 tracked .py blobs compile except the pre-existing `fec/stance/api_stance_layer.py` IndentationError. `git status` 498 to 279; modified 149 to 11, all HELD on purpose (7 `collector_sentinels/*.done`, `Moneyball_email.zip`, `own_source_stance_model.joblib`, `system_manifest.json`, `behavior_calibrated.json.candidate`); 0 untracked source under fec/. "No caps" also answered R5: `DESK_MEDIA_CAP=0` means no cap ("default 50, 0=all") and live already had it.
- **STILL PAUL'S:** R1 class-B/E code-review content, R2 the 2026-09-08 engine imputation rule, R3 the 644-acts re-pin - each commit message says "records the live state, does not ratify"; R6 untracking the runtime/generated tracked files; R7 the regenerated manifest JSON (not committed: generated); R10 the 10 MB congress-legislators YAML (data-plane input, not committed); R11 ignore rules for outputs/ tmp/ evidence stores (not done); R12 `api_stance_layer.py`. Mirror PUSHED 2026-09-19 on Paul's "push the mirror": main `a19c796d2` plus all 292 branches and 3 tags, 0 rejected (see `repo-mirror-2026-08-11`, [[melange-repo-mirror]]).
- **LESSON:** the lane census attributed files by mtime cluster and filed a CHAIN PRODUCER (`build_member_longform_turn_features.py`) plus 9 other paths under a research lane; the post-phase proof caught it (3 of 4 producers tracked). Run the proof after each phase and eyeball per-commit directory spread before executing.
- **LESSON:** a commit driver that takes NUL pathspec files, refuses on any staged path / `index.lock` / `.pipeline_run.lock` / size-or-mtime drift from a baseline, and post-verifies `git show --name-only` == the group, made 34 commits in a shared live index with zero sweep-in. `git status` does not take `--pathspec-from-file`; pass paths in batches.
- **Packet (session scratchpad, not in the repo):** `%LOCALAPPDATA%\Temp\claude\C--Users-pgoff-OneDrive-Desktop-Melange-Systems--claude-worktrees-objective-booth-56caf1\d1a34ab4-1d53-4ced-8036-7a2610ee4b7b\scratchpad\census\` - `PLAN\PLAN.md` (inventory + plan + rulings), `PLAN\PLAN_APPENDIX.md` (file list per group), `PLAN\plan_groups.csv` (544 rows), `A` dirty-path census + 147 normalised diffs, `B` HEAD-resolvability, `C` lane attribution + code-review hunk match, `D` behind-HEAD census.
- **Findings that overturn recorded beliefs:**
  - The close-out packet's "part of the modified count is CRLF-only" is FALSE: 0 of 149. `git diff` normalises before comparing. CORRECTED 2026-09-19 by `live-tree-eol-census-2026-09-19`: `git status` CAN show a pure-EOL change as ` M`, because it flags on on-disk size vs index-recorded size without comparing content; the 0/149 result still stands (LIVE's index sizes equal the working sizes, 0 phantom ` M` measured). All 147 text files are functional (+7,453/-2,281); 2 are tracked binaries.
  - main was broken in 248 places, not 2: FOUR chain producers named by `run_pipeline.py` were untracked (`:50 apply_fec_money_refresh.py`, `:123 build_vote_category.py`, `:190 build_member_longform_turn_features.py`, `:192 regenerate_member_profiles.py`) and `run_pipeline.py:452-453` validates producers at import, so a clean checkout died before step 1. Tests were committed WITHOUT their sources (`engine.money_observation`, `process_liveness`). 9 main-side symbol skews (e.g. `paths.STAFFER_NETWORK_*`, `audit_failure_gate.pipeline_failure_output`). 93 of 264 untracked `fec/` source files were load-bearing for main. The kernel registry itself is clean.
  - `code-review-five-lanes-2026-09-13` "nothing applied" is STALE: the review session applied 90/90 patches to LIVE on 2026-09-14T05:58Z (71 files in one minute; pre-images in gitignored `backups\code_review_20260913\`, taken 02:42Z; packet only at commit `77959ae74` on the retired review branch). 22 class-B (Paul-gated) patches fully present + 5 partial, 2 class-E full + 2 partial, all 3 class-C absent. Paul's authorising words were not found - ruling R1.
  - The brain's "bluesky pair breaks chain step 17" is stale: `extract_cu_bluesky.py` in live equals main; only `tweet_collector.py`'s `verified_bluesky_handle` filter remains.
  - main's `pipeline_lock.py` and `audit_full.py` probe liveness with `os.kill(pid, 0)`, which on Windows TERMINATES the process; the fix (`fec/process_liveness.py`) existed only in live.
  - Output-affecting and unratified as far as could be told: the 2026-09-08 engine imputation rule (`industry_money_missing()` replaces `receipts==0` in `flip_model` / `budget_frontier` / `per_topic_flip` / `salience_shock`) and `audit_full.py`'s 644-acts re-pin to "644 baseline + admissions".
- **Why:** the live tree is what runs; main is a partial record of it. **How to apply:**
  - Before any whole-file commit from a shared dirty checkout, run a BEHIND-HEAD census: commits staged with `git apply --cached` or from other worktrees put content in HEAD that the working file never received, and such a file shows ` M` exactly like new work. Decide direction by CONTENT (parent of the introducing commit vs HEAD vs live vs any pre-image), never by commit date vs mtime (DE-028). Result here: 0 behind, 0 diverged, 20 ambiguous deletions in 11 files to read before committing their groups.
  - Take ONE lock-free snapshot (`GIT_OPTIONAL_LOCKS=0 git status --porcelain=v1 -z`, `ls-files --others --exclude-standard -z`, `diff --cached --name-status -z`; 50 s total here) and have every agent consume it; forbid agents `status`, walks, and anything under `fec/`.
  - `git grep <pattern> main -- fec audits` exceeds the 2-minute tool timeout because of `audits/legfix5`; scope the pathspec.
  - GateGuard demands its four facts for every new file, scratchpad included, and its two facts before the first Bash call - state them and retry the identical call.
  - Opus architect agents with a full up-front brief, explicit forbidden-verb lists and mandatory positive/negative controls returned censuses that survived spot checks; the one weak signal (mtime vs commit date on `audit_full.py`) was caught by the next agent's content test.
- Related: `mentat-uncommitted-reconcile-2026-09-18`, `committed-vs-live-drift-2026-09-13`, `laundry-list-closeout-2026-09-18`, `verify-dont-infer-completion-2026-08-04`, `go-faster-directive-2026-09-16`.

## Line-ending census and the shared line-wise patch cutter (2026-09-19, `live-tree-eol-census-2026-09-19`)

Lane: worktree `vibrant-sammet-a549a5`, spawned task "mixed line endings break string-replacement patch cutting". The census was read-only and PRESENTED; Paul answered "Reconcile those loose ends and apply" (2026-09-19), read as go-ahead for the recommendation leaned to on each ruling: adopt the line-wise contract, majority terminator, build ONE shared helper, no `.gitattributes`, extend the census to untracked files, apply the brain drafts. That word does not generalise to other lanes (`ask-before-substantive-changes`).

**APPLIED:** `fec/tools/live_patch.py` + `fec/tests/infra/test_live_patch.py` (92 tests, synthetic bytes) + one `_LANE_MODULES` entry in `fec/tests/run_tests.py`; commit `423820d76`, fast-forwarded into LIVE main from `35521f9aa` in 6 s after read-only preconditions (LIVE on main at the parent, no `index.lock` / `MERGE_HEAD` / `.pipeline_run.lock`, three paths clean, nothing staged, 0 git processes). Design by the session itself, code by an Opus architect, reviewed inline (six fixes: absolute patch paths because `git -C root` resolves a relative patch against ROOT; atomic restore; UTF-16 refusal; sidecar manifest loading; patch-vs-manifest label agreement; pinned numbers), then reproduced on the real route: on LIVE `fec/stance/build_media_blend.py` lines 18/19 the CRLF-joined string anchor returns -1 and the line-wise anchor hits once, `prove()` ok, `git apply --check` rc 0, LIVE bytes unchanged. Brain (flushed `c9695ce`): D-060 (line-wise cutter, files never normalised), DE-041, three CONSTRAINTS bullets, a caveat on D-048. Glass Box run_id `eol-census-apply-20260919`. Nothing in LIVE was EOL-normalised. Mirror pushed on Paul's "push the mirror": main `423820d76` (the post-merge hook had already pushed it), 293/293 branches current, tags 3/3, no force.

**The tool (use it, do not re-invent a cutter):** `python fec/tools/live_patch.py eol <file>...` prints `size= crlf= lf= lone_cr= class=`; `... drift <a> <b>` exits 0 IDENTICAL_BYTES / 1 EOL_ONLY / 2 CONTENT. In a cutter script load it by file path (import == execution elsewhere in the repo; this module is import-safe): `LiveFile.read(root, rel)`, `insert_after / insert_before / replace / delete` with a one-line or multi-line anchor (matched per line, terminator stripped, exactly one hit or `AnchorError`), `PatchSet().add(f).write(path)` (also writes `<path>.manifest.json`), `prove(patch, {label: (before, after)})`, `check_against(LIVE, patch)`, then `apply_to(LIVE, patch)` or the argv from `apply_argv()`. Keep cut patches OUTSIDE the repo or under a `-text` attribute.

**Census (snapshot C, LIVE main `35521f9aa`; tracked code/markup/config/data-text, excluding non-code under `audits/legfix5` and non-code >5 MB; 2,892 files):** PURE_CRLF 949, PURE_LF 1,622, MIXED 312 (CODE 279, markup 31, data 2), NO_EOL 9. MIXED by dir: fec 268 (legislation 64, tests 40, members 39, stance 25, engine 24, lobbying 23, surfaces 19), audits 26, root 12. All 312 are content-identical to HEAD and every one of their blobs is pure LF, so each mix is working-tree-only and a fresh checkout renders uniform CRLF. The only blobs with CR are four `.patch` files stored `-text` on purpose (`audits/laundry_list_closeout_20260918/.gitattributes`, the one tracked attributes file). Untracked: 28,464 text files, 93.1% pure LF, 78 MIXED (mostly `before/` snapshots in audit packets), 11 UTF-16, 741 OneDrive placeholders skipped unread. Snapshots A `776ce0d3a` (2,228 files, 304 MIXED) and B `333cafbf3` (2,502, 300) are kept: main moved twice under the census. Independent byte recount 15/15.

**Premise corrections:** the spawned prompt said `fec/audit/dashboard_integrity.py` had ONE bare-LF line; it had 88 in 11 hunk-shaped runs (43,919 - 43,831 = 88 was the tell), and the laundry-list landing's merge then rewrote it uniform CRLF. "HEAD uniformly CRLF" is the wrong frame under `core.autocrlf=true`: blobs are LF. 216 of 300 mixed files were last written 2026-08-04/05 (reorg window) - a last-write date, not an origin (DE-036); git cannot date a mix because no CR was committed.

**Measured git behaviour (git 2.54.0.windows.1, throwaway repos):**

- A live-only mix is invisible to `git diff`, `git hash-object` and `git blame`, but `git status` reports ` M` whenever on-disk size != the non-zero index-recorded size, WITHOUT comparing content; sticky, `update-index --refresh` refuses it, only `git add` clears it. LIVE had 0 phantom ` M`; an LF-to-CRLF normalisation would create 1,934.
- `git checkout -- <path>` does not repair a content-identical mixed file; delete-then-checkout does; a merge that changes the path does.
- `core.autocrlf=true` lives in the SYSTEM gitconfig, so it is in force even outside a repository. `git apply` decides per FILE-PATCH: if no old line ends with CRLF it reads the target renormalised, matches even CRLF targets, and writes the WHOLE file back CRLF with rc 0 (`--check` gives no warning, `git diff --stat` shows one insertion); one CRLF old line anywhere in that file's patch makes it byte-exact. `-c core.autocrlf=false` is byte-exact always. A patch file that was itself CRLF-converted (committed as text) fails everywhere. DE-040's "in-repo stopped matching LF-only hunks, outside-repo clean" was NOT reproduced.
- Committed `* text=auto eol=crlf` rewrites no working file, clears nothing, and OVERRIDES D-048's clean-export flags (`-c core.autocrlf=false -c core.eol=lf archive` exported CRLF); `* text=auto` alone keeps the export LF.
- A patch cut against mixed bytes fails against the normalised file and against the index (`--cached`); `--ignore-whitespace` applies it but injects the patch's own terminators; `--whitespace=fix` does not help.
- `str.splitlines(keepends=True)` invents line boundaries at FF/VT/FS/GS/RS/NEL/U+2028/U+2029 and git rejects the patch; 0 of 2,228 tracked files held those separators, so `n1_cut_live_hook.py`'s weakness was latent.
- `dashboard_integrity.py` `_file_sha` hashes RAW bytes: an EOL change to a registered input changes `input_fingerprint`, which skips (not fails) the same-input check.

**How to apply:**

- Never claim "whole file is CRLF except line N" from a spot check; run the `eol` command first.
- LIVE is a moving target: stamp a census with HEAD and time and re-run before presenting (`eol_census.py` takes ~90 s with the untracked step).
- An Opus architect's numbers still need a second instrument; its first "0 CR blobs" was scope-limited and it corrected itself only after the `-text` patches landed.
- Found in passing, NOT touched: `fec/tests/infra/test_process_liveness.py` is registered in no runner.

**Packet (session scratchpad, not in the repo):** `%LOCALAPPDATA%\Temp\claude\C--Users-pgoff-OneDrive-Desktop-Melange-Systems--claude-worktrees-vibrant-sammet-a549a5\ff71778d-7ad2-47dd-ae12-dcda2b6b2d48\scratchpad\` - `eol_census\` (`eol_census.py`, snapshots A/B, `compare_abc.txt`, `eol_census_mixed.csv`, `eol_census_untracked*.csv`, `index_stat_vs_disk.csv`, `patch_blobs_cr.csv`, `brain_apply.py`, kernel log), `eol_lab\` (`results.json`, `results_e9.json`), `live_patch_probe\`.

### Kernel results and the bounded-launcher landings (same lane, 2026-09-19)

**KERNEL in LIVE at `423820d76`: 243 passed / 4 FAILED, 31.9 min; `test_live_patch` green in the runner.** Reds: the two baseline reds the laundry-list landing already carried (`test_bill_collision_guards` - missing `backups\bill_directions.PRE-LEGFIX3.csv`; `test_make_staffer_network_html` - unrecognised verdict); `test_staffer_network_section`, red ONLY because its producer child (`build_staffer_network_section.py --root %TEMP%\...\v6-groups-real-role`) sat 14 min with no CPU and no I/O - the test's `subprocess.run` has NO timeout, so one hung child stalls the whole kernel silently (its log is block-buffered and shows nothing) - that one child was killed; and `test_press_baseline_fold` (errors=1 in-kernel, 21/21 OK alone minutes later = flake under load). Lesson: when the kernel log stops growing, list the python process tree with CPU + Win32_Process I/O counters; a leaf with frozen counters is hung, not slow. A token-free local watchdog (kill idle LEAF descendants of the kernel pid after 240 s, log every kill) kept the run bounded; it made 0 kills.

**WHY THE PRODUCER HUNG (Paul: "find out why", diagnosed same day, brain STATE `7ca9f42`):** it never reached its own code - it froze inside `import scipy` (`build_staffer_network_section.py:69` to `fec/staffer_network/member_context.py:10-11`), while the Windows loader was bringing up SciPy's BLAS/LAPACK extension modules and a SECOND OpenBLAS thread pool (`numpy.libs` and `scipy.libs` each ship a 19 MB OpenBLAS). Pinned without a stack: the frozen process's I/O counters (946 reads / 9.2 MB) match the exact point an instrumented healthy run (`-X importtime` + `GetProcessIoCounters` every 40 ms) passes at `scipy.linalg._fblas/_flapack`; 15 threads = the BLAS pools at that instant. NOT reproduced (0 of 88 launches, incl. 72 six-way concurrent); load-dependent (producers ran 6x slower than idle that minute); native frame not determined; most probable = loader-lock race in OpenBLAS thread-pool start-up. The case name was irrelevant. Pre-existing, not caused by the lane's change.

**TEST FIXED** on Paul's "add the timeout to the staffer test": `99caafa95` LANDED in LIVE main (from `abb448a27`; mirror current) - `test_staffer_network_section.py` launches the producer with Popen + temp files + `wait(180)` + `kill()` (DE-026 shape), a timeout is its own named failure and `main()` keeps the `N passed, M failed` tail; healthy 210/0 in worktree and LIVE; forced-timeout controls 0/3, 209/2, 206/3 (monkeypatch `PRODUCER_TIMEOUT_SECONDS` from a driver that loads the test by path - no env dial added). The edit was cut with `live_patch.py` so the file stayed PURE_CRLF.

**LAUNCHERS FIXED** on Paul's "add the timeouts to run_pipeline and run_tests too" + "land it when the architect is done": `624e593eb` LANDED in LIVE main (mirror current) - `fec/bounded_subprocess.py` = THE shared bounded launcher (`run_bounded(argv, timeout, env, cwd)`: Popen + real temp files + `wait(timeout)` + process-TREE kill via bounded `taskkill /F /T`; any other exception during the wait also kills the tree before propagating, because unwinding releases `.pipeline_run.lock`); constants, NO env dial: chain step 10800 s (2.6x the slowest step on record, 4,148.7 s over 677 step-runs), kernel suite 1800 s; a timeout returns 124 + a note (pid, args) in stderr / step line / Glass Box summary; 124 != tolerated 2, so a timed-out step HALTS the chain even in `TOLERANT_STEPS`. `test_bounded_subprocess` 19/19. KERNEL in LIVE through it: 246 passed / 2 FAILED in 7.6 min = exactly the two baseline reds. NOT run: the real chain. NOT changed (flagged to Paul): `fec/weekly_refresh.py` own launcher (`:279 communicate(timeout=)`, `:312` unbounded `proc.wait()` after kill; whole-chain bound 7200 s at `:464` is below the 261.6 min the chain once took); per-producer atomicity under a kill unaudited. Review lesson: when replacing `subprocess.run`, keep its `except: kill(); raise` - an architect dropped it and only the inline read caught it. Size a timeout from the Glass Box `pipeline.step` history (`staffer_hang\chain_step_durations.py`), not taste. `Popen.wait(timeout)` on Win 8+ does not count sleep time.

**STILL PROPOSED, NOT APPLIED** (risk reduction for the scipy freeze itself, unproven because it never reproduced): `member_context.py` imports scipy at module scope though every fixture (and any run with no member network) builds a 0x0 matrix; `OPENBLAS_NUM_THREADS=1` would remove the pool. Method worth reusing: a scratch `sitecustomize.py` on PYTHONPATH calling `faulthandler.dump_traceback_later(45, repeat=True, file=...)` gives every Python process in a test tree periodic all-thread stack dumps with NO repo edit (Python frames only; at a 0.12 s cadence the shim itself crashed the child with 0xC0000005 - keep it slow). Evidence: scratchpad `staffer_hang\`.

Related: `melange-live-tree-reconcile-2026-09-19`, `laundry-list-closeout-2026-09-18`, `receipt-line-pins-vs-live-tree-2026-09-18`, `spawned-task-premise-may-be-stale-2026-09-14`, `committed-vs-live-drift-2026-09-13`, `scout-census-traps-2026-09-13`, `glassbox-everything-rule-2026-07-27`.

## History

| Date | Event |
|---|---|
| 2026-07-02 | Architecture refactor: git repo, `paths.py`, `moneyball_core`, kernel tests 28/28, zero rank delta; second wave e329e19; Phase 2 system-of-record inversion (23c48ea + fd9f3d6); S2 remedies bf4a703; `compute_pillars.py` parity 533/533 (279f5e5); staff directory (eaefc2f); `/fable-audit` + weekly task (9adc4c1). |
| 2026-07-03 | Architecture note written; `fec/` hardening via audit runs (see audit topic). |
| 2026-08-04 | REORG Phase 0 tripwires @15560ea; kernel 14/118 to 17 (@a14543e) to 131 (@5e87439) to 149 (@4647555 merged to main); Phase 1 @fa66617; Phase 2 batches A-E (923e75c, 2c7766d, ec6e9ab, caba359, 40cb28c); close-out @021bb9f; Phase 3 pilot @0e19f1e. |
| 2026-08-05 | Phase 3 resolver @4c79a3c, audit domain @0fd69cb, REORG COMPLETE @a05a8e4, post-completion @b6b61fc; kernel 150/0. |
| 2026-09-13 | Committed-vs-live drift census (main `2f11d9490`). |
| 2026-09-15 | Mentat addendum verified. |
| 2026-09-19 | Live-tree reconcile: 35 commits `d97e775ae`..`a19c796d2`, status 498 to 279, mirror pushed; EOL census + `live_patch.py` landed `423820d76`; staffer test timeout `99caafa95`; `fec/bounded_subprocess.py` `624e593eb`. |

## Decisions

- Hubs (`paths`, `moneyball_core`, 9 hubs) stay at the fec root (a `core/` dir = ~500 rewrites for zero gain) - 2026-08-05.
- `ranks_python.json` is the rank authority; workbook is a view; NO COM anywhere (Paul's sign-off, 2026-07-02).
- Line-wise patch contract with ONE shared helper; files never normalised; no `.gitattributes` (D-060, 2026-09-19); majority terminator.
- Reconcile commits "record the live state, do not ratify" (D-051): R1/R2/R3 stay Paul's.
- Timeouts are constants, no env dial; sized from Glass Box `pipeline.step` history.
- ~~Excel COM writes / RECALC step~~ (until 2026-07-02) - superseded 2026-07-02 by "NO COM anywhere"; kept because older commits and artifacts reference it.
- ~~"Sundays 06:00" weekly refresh~~ (2026-07-02) - superseded by "Sat 6:00 AM" (2026-08-05).

## Next Steps

- [ ] Paul: rulings R1, R2, R3, R6, R7, R10, R11, R12 from the reconcile; weights ruling S-5.
- [ ] Optional risk reduction for the scipy freeze: lazy `import scipy` in `member_context.py` / `OPENBLAS_NUM_THREADS=1` (proposed, not applied).
- [ ] Bound the `fec/weekly_refresh.py` launcher (`:279`, `:312`, `:464`) and audit per-producer atomicity under a kill.
- [ ] Register `fec/tests/infra/test_process_liveness.py`; fix `fec/tests/test_primacy_tier.py` writing `source.json` into repo root; resolve flake `test_legislation_base_network`.
- [ ] Kernel baseline reds: `test_bill_collision_guards`, `test_make_staffer_network_html`.

## Related Actors

- [[draft-systems-r-pipeline]] - Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline
- [[melange-dashboard]] - Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network).
- [[melange-refresh-scheduler]] - Unattended Melange refresh jobs: weekly refresh, congress daily chain, report email; weekly not COMPLETE since 2026-07-19
- [[melange-repo-mirror]] - Off-box bare git mirror (remote mirror, Carbonite-covered) of Melange Systems; all branches+tags, hook auto-push since 2026-09-19
- [[moneyball-workbook]] - Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority).
- [[sentinel-collectors]] - Sentinel press/hearing collectors and bill ingestion feeding the Melange workbook; promotion and scheduler re-enable are Paul-gated

## Related Topics

- Influence engine internals - July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder
- [[2026-07-rfc-melange-architecture-system-of-record]] - Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics
- [[2026-07-troubleshooting-melange-audits-and-reviews]] - Melange audit runs, guardrails, 09-13 five-lane code review, hallucination framework (D-007), provenance census, laundry-list close-out
- [[2026-07-troubleshooting-melange-live-tree-git-drift]] - Melange live tree vs git: branch drift, live-only files, 35-commit reconcile, EOL census, live_patch.py cutter, off-box mirror
- [[2026-07-troubleshooting-melange-audits-and-reviews-guardrails]] — Guardrails for any autonomous Melange audit or review run, from the run-guardrails memory of 2026-07-02 as updated through 07-10.
- [[2026-07-troubleshooting-melange-audits-and-reviews-later-reviews]] — Melange reviews of August and September 2026: the findings-examination (hallucination) framework lane of 08-13/14, the five-lane code review of 09-13 and the laundry-list close-out of 09-18/19.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[zero-rank-delta-verification]] - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean
- [[live-tree-patch-discipline]] — The Melange live tree changes only through one line-wise patch cut with fec/tools/live_patch.py and applied with core.autocrlf=false; never check out or merge into LIVE, and APPLY is Paul's.
- [[census-before-claims]] — Measure first (a census, the live file, git status plus a byte diff) before stating a mechanism, a number or a completion; never infer it.
- [[four-pillar-percentile-blend]] — The Moneyball rank is a weighted blend of four pillar percentile ranks (committee/influence, legislative, press, demographic); three weight sets are on record, only Paul ratifies one, and the live set is read where it is kept.
