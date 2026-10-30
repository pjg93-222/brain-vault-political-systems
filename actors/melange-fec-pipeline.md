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
  - "R1 (class B/E code-review hunks), R2 (engine imputation rule), R3 (644-acts re-pin) committed 2026-09-19 as live state but NOT ratified (Paul's rulings open). Correction 2026-10-18 (ledger D-143, D-144, 2026-10-11): R1 and R3 are ratified; R2 stays open"
  - "api_stance_layer.py has a pre-existing IndentationError; fec/tests/infra/test_process_liveness.py is registered in no runner"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/live-tree-eol-census-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\live-tree-eol-census-2026-09-19.md", sha256: "8d1bd8b910e194fd59a3663aed40a3c0dca3626eccc843e2a0fc49fef2ca19c7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/melange-live-tree-reconcile-2026-09-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\melange-live-tree-reconcile-2026-09-19.md", sha256: "466edb2a5c5a32457c4af1ef3b484372f128200f061a8751d654f8a6f5f286b2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/committed-vs-live-drift-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\committed-vs-live-drift-2026-09-13.md", sha256: "656f0a2e07d94186aa64d8bdf71bf498d76cd84759b30d6f5caae27543483dff"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reorg-phase0-tripwires-2026-08-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reorg-phase0-tripwires-2026-08-04.md", sha256: "a554fe2a6df1883dad24aa1fb9b973f83ee9adf2a4418b32b516f46575fc430c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-audit-run-guardrails.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-audit-run-guardrails.md", sha256: "fc314b1421f29d9b94eda9773284183ca5cefb0951cb6703f08410d424b9e0c0"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-architecture.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-architecture.md", sha256: "bb9bffef2af3af7152fdcf5bf852e8bef18952f37abaf7f978ae0b596ed25ee5"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/people-network-route-latency-lane-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\people-network-route-latency-lane-2026-10-02.md", sha256: "99922dedbe7aeb3b6468f2b075fc99f2b1b26ad7fd4b5a495118ede957f8295f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fec-folder-debug-sweep-2026-10-13.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fec-folder-debug-sweep-2026-10-13.md", sha256: "fa90f480528a9e0d5b6c19fe0f92474263db311d3c8d53e992f51b054aaa0fb5"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/backend"]
---

# Melange fec/ pipeline

> The Python pipeline under `Melange Systems\fec` that computes the Moneyball CU-influence ranks: shared kernel `moneyball_core`, the `run_pipeline.py` chain, `compute_pillars.py` writing `ranks_python.json` (THE rank authority since Phase 2, 2026-07-02), the kernel test runner `fec/tests/run_tests.py`, `audit_full`, and the line-wise patch cutter `fec/tools/live_patch.py`.

> [!warning] The live tree is the real system
> The live tree (`C:\Users\pgoff\OneDrive\Desktop\Melange Systems`, a worktree on main) is what runs; main is a partial record of it (2026-09-19). The committed tree can drift from live; see "Live tree vs committed tree" in [[melange-fec-pipeline-live-tree-drift-and-eol]].

## Parts

- [[melange-fec-pipeline-architecture]] — Architecture of the Melange fec/ pipeline: paths and the shared kernel after the 2026-07-02 refactor, the audit guardrails, the inverted system of record, the staff directory and desk CRM, and the audit runbook with weekly automation.
- [[melange-fec-pipeline-reorganization]] — The REORG of the Melange fec/ pipeline, completed at a05a8e4 on 2026-08-05: the phase-0 tripwires, the culling lane, the 20 resolved items, the execution and phase-3 states and the post-completion fixes.
- [[melange-fec-pipeline-live-tree-drift-and-eol]] — Live tree versus committed tree drift of the fec/ pipeline: the 2026-09-13 census, the 09-19 reconcile, and the line-ending census with the shared line-wise patch cutter and its kernel results.

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

- **Committed-vs-live drift** (2026-09-13 to 2026-09-19): main was NOT runnable alone (4 chain producers untracked; `run_pipeline.py:452-453` validates producers at import so a clean checkout died before step 1; 248 unresolvable references). Reconciled 2026-09-19 (35 whole-file commits `109249aaa`..`a19c796d2`); status 498 to 279, 28 unresolved references remain (all name the generated `cu-member-desk-profiles.js`). Detail in [[melange-fec-pipeline-live-tree-drift-and-eol]].
- **Mixed line endings:** 312 of 2,892 tracked text files MIXED (working-tree-only). Detail in [[melange-fec-pipeline-live-tree-drift-and-eol]].
- **Kernel baseline reds** at `624e593eb`: 246 passed / 2 FAILED in 7.6 min = `test_bill_collision_guards` (missing `backups\bill_directions.PRE-LEGFIX3.csv`) and `test_make_staffer_network_html` (unrecognised verdict). Flakes: `test_press_baseline_fold` (errors=1 in-kernel, 21/21 OK alone), `test_legislation_base_network` (failed ~2/3 IN-KERNEL runs with bare AssertionError in the Phase 3 window, passes standalone and in sequence replay; unresolved; opt-in trap `RUNTESTS_DUMP_DIR`).
- **scipy-import freeze** on Windows (see hang diagnosis in [[melange-fec-pipeline-live-tree-drift-and-eol]]): `member_context.py` imports scipy at module scope; proposed (not applied): lazy import and `OPENBLAS_NUM_THREADS=1`.
- **`fec/weekly_refresh.py`** own launcher NOT bounded: `:279 communicate(timeout=)`, `:312` unbounded `proc.wait()` after kill; whole-chain bound 7200 s at `:464` is below the 261.6 min the chain once took; per-producer atomicity under a kill unaudited.
- **Unregistered suites:** `fec/tests/infra/test_process_liveness.py` registered in no runner; `fec/tests/test_primacy_tier.py` writes `source.json` into the repo root (open, 2026-08-04); kernel gate reaches 105 of 265 tracked suites (S-2 of the 2026-09-13 code review: 92 unreachable in both trees).
- **Pre-existing:** `fec/stance/api_stance_layer.py` IndentationError; `main`'s `pipeline_lock.py` and `audit_full.py` used `os.kill(pid, 0)` for liveness, which on Windows TERMINATES the process (fix `fec/process_liveness.py` existed only in live before the reconcile).
- **Audit state:** `audit_full` standing reds: 199/1 (crown-law, 2026-08), later 559/9 (laundry-list 2026-09-19, step table + FAILURES list vs previous run); with standing reds exit 0 is unattainable and PIPELINE COMPLETE never prints (DE-044).
- **Layout-bound artifacts:** artifacts that record paths are layout-bound (allowance registries, prerequisite sets, `inputs_sha256` keys, receipt bindings); every reorg batch must expect them.
- **WEEKLY REFRESH:** 2026-08-05 note: next run ends Last Result 1 while the pre-existing crown-law audit failure stands (the refresh treats any `audit_full` failure as HARD FAILURE at its last step; everything real completes, only the final gate reports red; fix = resolve the crown-law workbook stance column mismatch, Paul's domain).

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
  - Correction 2026-10-18 (evidence: ledger D-233, 2026-10-17; the Melange main reconcile topic): superseded in part. On 2026-10-17, with Paul's approval, LIVE moved onto `main` by a fast-forward after a snapshot ref and file backups, and D-233 normalised the 1,577 tracked files that differed from the committed bytes only by CRLF line endings (76 were skipped). D-060 stays in force for patches cut against live bytes; D-233 amends only its 'never normalise' clause, for those CRLF-only differences.
- Reconcile commits "record the live state, do not ratify" (D-051): R1/R2/R3 stay Paul's.
- Timeouts are constants, no env dial; sized from Glass Box `pipeline.step` history.
- ~~Excel COM writes / RECALC step~~ (until 2026-07-02) - superseded 2026-07-02 by "NO COM anywhere"; kept because older commits and artifacts reference it.
- ~~"Sundays 06:00" weekly refresh~~ (2026-07-02) - superseded by "Sat 6:00 AM" (2026-08-05).

## Next Steps

- [ ] Paul: rulings R1, R2, R3, R6, R7, R10, R11, R12 from the reconcile; weights ruling S-5.
  - Correction 2026-10-18 (evidence: ledger D-141, D-143 and D-144, 2026-10-11): superseded in part. The weights ruling S-5 is closed by D-141 (45/10/40/5 is Paul's 2026-09-03 directive), R1 is ratified by D-143 and R3 by D-144. R2, R6, R7, R10, R11 and R12 are not named by those entries and stay open here.
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
- [[2026-10-troubleshooting-melange-main-reconcile]] - Melange main reconcile 2026-10-16/17: default branch back to main, 49 published-lineage commits ported, live tree moved with backups, main and mirror in step
- [[2026-07-troubleshooting-melange-audits-and-reviews-guardrails]] — Guardrails for any autonomous Melange audit or review run, from the run-guardrails memory of 2026-07-02 as updated through 07-10.
- [[2026-07-troubleshooting-melange-audits-and-reviews-later-reviews]] — Melange reviews of August and September 2026: the findings-examination (hallucination) framework lane of 08-13/14, the five-lane code review of 09-13 and the laundry-list close-out of 09-18/19.
- [[2026-06-feature-melange-model-facts]] — Melange model facts: the regeneration pipeline, the Blended Model and its pillar decisions, and the member desk and SNA features as recorded in June 2026, with the three pillar-weight sets of 2026-06-29 (historical), 2026-07-07 (previous) and 2026-09-03 (current: Paul's directive, D-141).
- [[2026-06-troubleshooting-melange-model-audits]] — The Melange model audits of 2026-06-26: the brutal internal audit, two independent adversarial audits with their fixes, and the FEC data-quality assessment with the HIGH-3 reversal.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[zero-rank-delta-verification]] - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean
- [[live-tree-patch-discipline]] — Changes to a drifted Melange live tree go in as one line-wise patch cut against LIVE bytes with fec/tools/live_patch.py, applied with core.autocrlf=false, never normalising LIVE: no merge or checkout (D-060; partly amended 2026-10-17 by D-233, which normalised CRLF-only differences); applying needs Paul's go.
- [[census-before-claims]] — Measure first (a census, the live file, git status plus a byte diff) before stating a mechanism, a number or a completion; never infer it.
- [[four-pillar-percentile-blend]] — The Moneyball rank is a weighted blend of four pillar scores (committee/influence, legislative, press, demographic), built as percentile ranks on 2026-06-25, with the committee/influence pillar moved to raw/max on 2026-06-30 and press to signed raw/max on 2026-07-01; resolution 3 records three weight sets (historical, previous, and current: Paul's 2026-09-03 directive per D-141), only Paul ratifies one, and the live set is read where it is kept.
- [[stale-vote-report-check-upstream-first]] — A stale vote snapshot is checked against Voteview's publication date and whether the chamber is voting before any fetch code is debugged.

Update 2026-10-30: The fec/ folder-by-folder debug sweep of 2026-10-13 to 2026-10-20 closed with every folder committed on local main and published through the filtered route as public PR #14 (merged 2026-10-20 after every CodeRabbit thread was resolved); fec/research stays local-only because the export filter excludes it, and as of 2026-10-21 the surfaces folder was left half-swept.
