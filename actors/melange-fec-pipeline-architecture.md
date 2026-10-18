---
type: actor
name: "Architecture (Melange fec/ pipeline)"
aliases: ["Melange fec/ pipeline: Architecture"]
category: "pipeline"
description: "Architecture of the Melange fec/ pipeline: paths and the shared kernel after the 2026-07-02 refactor, the audit guardrails, the inverted system of record, the staff directory and desk CRM, and the audit runbook with weekly automation."
repository: ""
stack: ""
status: "active"
team: ""
criticality: ""
pci: false
known_issues: []
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/backend"]
part_of: "[[melange-fec-pipeline]]"
---

# Architecture (Melange fec/ pipeline)

> Architecture of the Melange fec/ pipeline: paths and the shared kernel after the 2026-07-02 refactor, the audit guardrails, the inverted system of record, the staff directory and desk CRM, and the audit runbook with weekly automation. Part of [[melange-fec-pipeline]] (project [[melange-systems]]).

## Architecture

### Paths and shared kernel (refactor executed 2026-07-02; user: "Proceed down list")

VERIFIED behavior-preserving: kernel tests 28/28 + pipeline + audit 50/50 + zero rank delta across 533 members. Review: `ARCHITECTURE_REVIEW_2026-07-02.md`.

- **`fec/paths.py` = single source;** env overrides `MONEYBALL_ROOT` + `MONEYBALL_DRAFT` (Draft Systems R-pipeline root). 193 literals across 95 files replaced with `MB_ROOT` / `MB_DRAFT`; every fec script has a one-line bootstrap header (sys.path insert + import). Downloads one-shot refs left literal. `paths.py` defaults ROOT to the live tree, so scripts run from a `.claude` worktree still read/write LIVE data.
- **Shared kernel `fec/moneyball_core.py`** (lazy + cached; no import-time IO): congestion / members / name2bio / bio2name, `party()`, `bpf()`, `receptivity()` / `rc()`, `load_network()` (mean-symmetrized; CONTRACT: every member has an entry, isolated = {}), **`cpf_diffusion` vs `cpf_pressure` (two named physics - never merge)**, `sm64` CRN, `build_P()`, PERS (`PERS_NONE` dial), IMP (18 cats), blocks / BLOCKCAT / CATBLOCKS, SGATE / gate. Adopted in 10 live engines. Second wave NOT yet adopted at first: scenario, cosponsor_route, lt_priming, method_audit, assemble_viz, press_engagement_layer, press_hcoi, stance_dynamics, big5_traits (party loader).
- **Adoption gotchas (cost 3 pipeline failures, all caught by the gate):** (1) old per-file loaders were defaultdicts - members with no edges returned {}; the core dict must setdefault every member; (2) blocks to BLOCKCAT span replacements swallowed the `labels=` line between them in 3 files; (3) cascade engines use `MC` as the Monte-Carlo count var - core module alias is `MBC` there, `MC` elsewhere.
- **Layout (2026-07-02):** `fec/attic/` = 36 dead one-shots (git mv, history preserved). `audit.py` is LIVE (an `audit_full` subprocess dependency - restored after mis-attic; later renamed `fec/audit/legacy_workbook_audit.py`). `sync_stance_clean.py` + `apply_stance_guard.py` hard-guarded (sys.exit at top). Workbook backups go to `backups/` (blend + future writers point there). `fec/tests/run_tests.py` = 28 kernel checks (then 30), zero deps, run before any pipeline after code changes.
- **Import == execution** (guardrails 2026-07-02): only 3 of ~103 fec scripts have `__main__` guards (`per_topic_flip`, `money_response`, `make_member_desk`); import-safe: `paths`, `moneyball_core`, `flip_model`, `money_response`. 27 scripts write the live workbook or artifacts (all `apply_*`, `sync_*`, `write_*`, `build_media_blend`, `build_social_master`, `process_quorum`, `make_dashboard_html`, `run_pipeline`, plus 8 attic scripts). Attic scripts are NOT reliably hard-guarded (`attic/sheet_sync.py`, `attic/sync_stance.py` execute on import with hardcoded live paths): never run/import attic. `tweet_collector.py` hits the network. Run `audit_full` and kernel tests only as read-only executables (audit was 62 checks as of run-5b; zero write calls). RECALC force-killed all Excel processes then COM-saved (documented truncated-save incident); RECALC/COM is RETIRED: never kill Excel. Full audit-run guardrails: Melange audits and code reviews.
- **Verification protocol (canonical):** code change, then `python fec/tests/run_tests.py`, then `python fec/run_pipeline.py`, then rank delta vs the last `ranks_*.json` = ZERO (unless the change is SUPPOSED to move ranks), then audit clean (50/50 at that date). See [[zero-rank-delta-verification]].
- **Second-wave adoption COMPLETED same day (commit e329e19):** scenario / cosponsor_route / lt_priming full; method_audit / assemble_viz network-only; scenario's cascade P deliberately KEPT LOCAL (predates receptivity `edge_mult`; adding it = behavior change, separate decision). Template extraction: `make_dashboard_html` 52 KB to 1 KB, `make_member_desk` 89 KB to 29 KB, into `fec/templates/*.tpl` via the `_tpl()` loader; VERIFIED by hash-identical regenerated HTML (all three outputs byte-deterministic). Still local by design: press_engagement_layer / press_hcoi in-function loaders, stance_dynamics, big5 numeric party map, assemble_viz legacy PERS.

### Operational guardrails for audit/review runs touching the pipeline (full text on Melange audits and code reviews)

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

- **`ranks_python.json` = THE rank authority** (`compute_pillars --write`; engines read `MC.scores()` / `ranks()`); the workbook = self-refreshing VIEW (all writers set `fullCalcOnLoad`); **NO COM anywhere** (`sync_stance_g` rewritten with openpyxl; RECALC step deleted; `--recalc` = retired no-op). See Melange architecture and system of record and [[moneyball-workbook]].
- **CRITICAL FILE PHYSICS learned:** (1) **openpyxl saves STRIP cached formula values** - after sync/blend, data_only reads of FORMULA cells (Blended names / O / E / F, R&A col C, normalized cells) return None until Paul opens Excel; TYPED cells survive (R&A names + col G, AB dials, Press Raw, row-535 weights). This was the dragon COM-recalc had been papering over. (2) **openpyxl read_only + random `.cell()` = O(sheet) per call** (640 s pathology) AND misreads openpyxl-saved files - never use read_only for random access.
- Resolution: O/E/F via `pillar_inputs_snapshot.json` (refreshed while cache alive; fallback when dead - CORRECT since O/E/F change only via Paul's Excel edits which revive caches; auto-bootstrap from the newest cache-alive `backups/` copy); roster from R&A col A; chain = authority BEFORE the cache-killing sync; `audit.py` view-aware (allocation checks skip when stale, ranks from authority); S2-04 repointed to R&A.
- VERIFIED: snapshot-mode ranks == baseline EXACT 0/533; pipeline end-to-end no-COM (~19 min on a cache-dead workbook - slower parses; optimization candidate: cache the frozen LegNorm sheet); audit 52/52; kernel 30/30. IM headline Moreno to Tim Scott = known col-G two-pass convergence, not drift. Also: heredoc transforms are BANNED (a heredoc-injected backspace control char in a glob path cost a debugging cycle); transforms go in scratchpad files.
- **Audit S2 remedies applied (commit bf4a703, 2026-07-02 eve):** S2-01 bipartisanship = COSPONSOR-ONLY again (the bundle had silently computed it from the AUG graph - social/press edges leaked into `bpf` to `cpf_diffusion` / tgt / coalition feedback; `BP_SRC=aug` env restores the augmented definition if Paul ever ratifies; effect: 19 optimizer allocs shifted, 17/17 frontier paths, IM headline Hill to Moreno, RANKS UNTOUCHED). S2-02 loud guards on missing big5 / `electoral_plays` inputs. S2-03 `MC.dump_atomic` (tmp + `os.replace`) at ALL 14 artifact writers - kernel tests now 30. S2-04 audit check workbook-rows == roster. S2-05 `rebuild_press_cache.py` (refuses post-blend sources via Z1 check). S3: 58 unused imports pruned across 28 files. Verified: kernel 30/30 x2, pipeline x2 (run 2 propagates corrected `bp` - the bundle writes `bipartisan.json` LAST, so bp fixes always need two runs), audit clean x2, zero rank delta x2.
- **ROADMAP No. 9 PHASE 1 DONE (commit 279f5e5):** `fec/compute_pillars.py` reproduces the ENTIRE workbook rank chain (raw, pos/neg-max normalization, SUMPRODUCT pillar, Press% / Leg% / Infl% / Demo%, score, rank) in Python - **parity EXACT 533/533 ranks, scores <1e-7**, wired into `audit_full` as a formula-drift tripwire (**audit = 52 checks**, kernel tests = 30). KEY EMPIRICAL PIN: Excel `PERCENTRANK(...,5)` truncates to 5 **DECIMAL** digits, NOT significant digits (94 sub-0.1 members exposed this). The write path (Python computes, workbook becomes rendered view; retires the COM-recalc/OneDrive failure class) needed Paul's sign-off since it inverts the system of record (granted: see Phase 2 above). Also this pass: README rewritten to post-refactor reality (S3-07), gold queue party from roster not stale bundle (S3-04), bare except narrowed (S3-02 - bf4a703's message had over-claimed this), receptivity docstring now matches the graded-shrinkage code, spec dials +`SOC_VOLFLOOR` / `SOC_MEN_W` / `BP_SRC`.
- **Pillar weights (resolution 3):** the pillar-weight configuration `compute_pillars.py` / `ranks_python.json` uses has three recorded sets: `.40/.30/.20/.10` (2026-06-29, historical), `30/25/40/5` (ratified 2026-07-07: LAST RATIFIED), `45/10/40/5` (live in `ranks_python.json` since 2026-09-03: LIVE BUT UNRATIFIED; code-review S-5 awaits Paul's ruling; live-only `fec/engine/pillar_policy.py` is a fail-closed desk gate encoding it). See Melange audits and code reviews.
  - Correction 2026-10-18 (evidence: ledger D-141, 2026-10-11): superseded. In the 2026-10-11 queue clear-out Paul delegated his open rulings to Claude, and D-141 records 45/10/40/5 as Paul's own directive of 2026-09-03, effective that date, so code-review S-5 is closed. The set is not unratified, 30/25/40/5 is the previous set, and no ruling is outstanding here.

### Staff directory + desk CRM (commit eaefc2f)

`fec/build_staff_directory.py` weaves Quorum staffer exports (Downloads 45-52; `STAFF_SRC` env) into `staff_directory.json` - 5,773 staffers matched to ALL 533 offices via "Member Works For" with a never-guess ladder (quoted-nick strip, accent fold, NICKF nickname map BOTH directions - the roster may hold the nickname e.g. "Mike Kennedy", leadership prefixes Leader / Whip / Speaker / Commish with chamber inferred from the district token, surname+chamber-unique fallback, "pablo jose hernandez" alias). Only AS/GU/VI delegates unmatched (not in roster - correct). Industry star = title regex; "Financial Administrator" excluded (office ops). Member-desk Staff section renders per-staffer cards (gold outline = contacted toggle, star auto+toggle, notes, media links, meeting flag, filter box); "In contact" nav panel groups meeting-flagged staffers by office with export/import; state in localStorage `mdesk_staffdir_v1` (data-act delegated handlers in `make_member_desk_00.tpl`). Desk `L()` helper RETURNS PARSED JSON (not a path) - do not double-load. Browser-verified via preview (Tim Scott: 18 cards, Tax Counsel auto-star; gold / note / panel round-trip).

### Audit runbook + weekly automation (commit 9adc4c1)

- `/fable-audit` project slash command (`.claude/commands/fable-audit.md`) = the extensive audit + TRUE RUN-THROUGH mission for any future session - baselines (kernel 30 / audit 52 / compile sweep), run-through gates (all-OK chain, clean audit, ZERO unexplained rank delta, artifact-hash stability, determinism spot), P1-P5 sweeps incl. UI smoke, known-benign registry, verified fix-lane protocol.
- **Windows Task Scheduler task `MoneyballWeeklyRefresh`** (Sundays 06:00 as recorded 2026-07-02; `schtasks /Delete /TN MoneyballWeeklyRefresh /F` to remove) runs `fec/weekly_refresh.py`: incremental CREC(14d) / CHRG(60d), big5, social edges, network, blend (Excel-lock tolerant), full pipeline + ALL dashboards, rank-movement line, logging to `weekly_refresh.log`. Proof run 2026-07-02: all steps OK, 9 min total, rank movement 0/533. Manual-only collectors (Quorum exports, X/Truth keys, Bluesky discovery) stay outside unattended scope.
- ~~Task schedule "Sundays 06:00"~~ (2026-07-02) - superseded by the 2026-08-05 post-completion note: task is **Sat 6:00 AM**, invoking `fec/weekly_refresh.py` (still valid post-reorg). Hardened 2026-07-05 (WakeToRun, battery-start, no-battery-stop, 3x30 min restarts, 3 h limit).
- Last run 08-02: all collectors + layers OK (tweets collected, `social_media.db` updated), ABORTED at the final FULL PIPELINE step on the culling-surface audit check - since resolved by the promotion-era regens. The NEXT run (08-09) was expected to still end Last Result 1 while the crown-law audit failure stands. Tweet collection healthy: `social_media.db` 08-02 06:17 (refresh-driven), `x_catalog.jsonl` 08-02 12:49 (Grok lane).

## Related Topics

- [[melange-fec-pipeline-reorganization]] — The REORG of the Melange fec/ pipeline, completed at a05a8e4 on 2026-08-05: the phase-0 tripwires, the culling lane, the 20 resolved items, the execution and phase-3 states and the post-completion fixes.
