---
type: topic
title: "July refactor and the system-of-record inversion (Melange architecture and system of record)"
aliases: ["Melange architecture and system of record: July refactor and the system-of-record inversion"]
category: "rfc"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-07-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/backend", "category/rfc"]
part_of: "[[2026-07-rfc-melange-architecture-system-of-record]]"
---

# July refactor and the system-of-record inversion (Melange architecture and system of record)

> The July 2026 refactor and the inversion of the system of record: what moved where, the phase-2 inversion, the audit S2 remedies, roadmap item 9 phase 1, the staff directory and desk CRM, and the audit runbook. Part of [[2026-07-rfc-melange-architecture-system-of-record]] (project [[melange-systems]]).

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

- **S2-01** bipartisanship = COSPONSOR-ONLY again (see Decisions in [[2026-07-rfc-melange-architecture-system-of-record]]; `BP_SRC=aug` restores).
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
- **Windows Task Scheduler task `MoneyballWeeklyRefresh`** (Sundays 06:00 at 2026-07-02; `schtasks /Delete /TN MoneyballWeeklyRefresh /F` to remove) runs `fec/weekly_refresh.py`: incremental CREC (14d) / CHRG (60d) -> big5 -> social edges -> network -> blend (Excel-lock tolerant) -> full pipeline + ALL dashboards -> rank-movement line, logging to `weekly_refresh.log`. Proof run 2026-07-02: all steps OK, 9 min total, rank movement 0/533. Manual-only collectors (Quorum exports, X/Truth keys, Bluesky discovery) stay outside unattended scope. `.gitignore` uses `.claude/*` (not `.claude/`) so `commands/` is versioned. (Updated by the REORG note: the task runs Sat 6:00 AM as of 2026-08-05; see in [[2026-07-rfc-melange-architecture-system-of-record-reorg-and-manifest]].)
