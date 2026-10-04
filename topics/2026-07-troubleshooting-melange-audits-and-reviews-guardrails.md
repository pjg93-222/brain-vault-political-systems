---
type: topic
title: "Guardrails for any autonomous audit or review run (Melange audits and code reviews)"
aliases: ["Melange audits and code reviews: Guardrails for any autonomous audit or review run"]
category: "troubleshooting"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/agent-ops", "category/troubleshooting"]
part_of: "[[2026-07-troubleshooting-melange-audits-and-reviews]]"
---

# Guardrails for any autonomous audit or review run (Melange audits and code reviews)

> Guardrails for any autonomous Melange audit or review run, from the run-guardrails memory of 2026-07-02 as updated through 07-10. Part of [[2026-07-troubleshooting-melange-audits-and-reviews]] (project [[melange-systems]]).

## Guardrails for any autonomous audit/review run (`moneyball-audit-run-guardrails.md`, 2026-07-02, updated through 2026-07-10)

On 2026-07-02 Paul was handed a sanitized audit rubric (replacing a generic Perplexity "NextToken" web-app rubric) for an autonomous Claude Code audit run on this repo. Facts any such run must respect (the pipeline-side facts are also recorded on [[melange-fec-pipeline]]):

- **Import == execution.** Only 3 of ~103 fec scripts have `__main__` guards (`per_topic_flip`, `money_response`, `make_member_desk`). Importing any other fec script runs it top-to-bottom. Known import-safe modules: `paths`, `moneyball_core`, `flip_model`, `money_response`.
- **27 scripts write** the live workbook or artifacts (all `apply_*`, `sync_*`, `write_*`, `build_media_blend`, `build_social_master`, `process_quorum`, `make_dashboard_html`, `run_pipeline`, plus 8 attic scripts). `run_pipeline.py` RECALC force-killed all Excel processes then COM-saved; documented truncated-save incident from Excel/OneDrive contention. `tweet_collector.py` hits the network.
- **Read-only verified executables:** `python fec/tests/run_tests.py` (then 30 checks) and `python fec/audit_full.py` (then 62 checks as of run-5b 2026-07-06: 56 + 3 psych/media schema guards; zero write calls confirmed by grep). Stale note: RECALC/COM/Excel-kill is RETIRED since phase 2 - `run_pipeline` has no COM step; the only workbook write is `sync_stance_g`'s openpyxl save, which PermissionErrors harmlessly if Excel is open. Never kill Excel.
- **Index-line original (moved verbatim from MEMORY.md, 2026-07-10 compaction):** "Audit-run guardrails 2026-07-02 - autonomous audit allowlist: only run_tests.py (30) + audit_full.py (52) are read-only-safe; import==execution (3/103 have __main__ guards); 27 writers; COM/Excel-kill RETIRED (sync save just PermissionErrors if Excel open); check for live user jobs before baselining, run baselines serially; worktree doesn't isolate data (paths.py to live tree); attic NOT reliably guarded".
- **Check for LIVE user jobs before baselining** (run-3 lesson, 2026-07-03): Paul runs pipelines and corpus jobs concurrently (observed: full pipeline finishing ~19:27 + a `big5_traits.py` loop writing mid-audit). The first `audit_full` returned a spurious 51/52 from read contention. Protocol: `Get-CimInstance Win32_Process` for python + artifact mtime scan FIRST; run baselines serially; expect gate-d engine deltas whenever the corpus moved - prove them benign via determinism double-run + input-purity rerun (engine to `FRONTIER_OUT` temp must byte-match the chain's artifact).
- **All data artifacts are gitignored** (`*.json/csv/xlsx/db/txt/html`), so overwrites are unrecoverable via git.
- **Worktree isolation is an illusion for data:** `paths.py` defaults ROOT to the live tree (`C:\Users\pgoff\OneDrive\Desktop\Melange Systems`), so scripts run from a `.claude` worktree still read/write LIVE data.
- **Attic scripts are NOT reliably hard-guarded:** `attic/sheet_sync.py` and `attic/sync_stance.py` execute on import with hardcoded live paths (the "hard-guard 2 destructive scripts" commit covered other files). Never run/import attic.
- **WAL mtime trap (2026-07-05, near-miss):** `social_media.db` runs WAL, so the MAIN file's mtime freezes until checkpoint; "db untouched for 15h + live process" does NOT mean hung. Judge collector liveness by `iv_fetch_log`/`fetch_log` latest ts (stored UTC) or the `-wal` file mtime, never the .db mtime. A healthy `fetch_interviews` shows near-zero CPU (network wait) with multi-hour backoff stalls between dates - do not kill it on those signals ALONE. Interviews live in the `speeches` table (source=INTERVIEW), NOT `posts` (posts = bluesky only).
- **CPU-liveness refined (run-5i, 2026-07-06):** 0 CPU can be a momentary network-wait/enumeration pause (fine) OR a wedged socket (dead). Discriminate by PROGRESS over a LONGER window (20-60 s CPU delta + turn/log growth), not one 6 s sample. Fox sat 0-CPU for HOURS on a hung request the per-call `urlopen(timeout=60)` never fired on, frozen while cnn-deep carried the crawl and the supervisor's process-EXISTS check read it "alive". FIX: `socket.setdefaulttimeout(90)` at `fetch_interviews` module load forces every socket op to time out, so no indefinite wedge can recur; a genuinely stuck collector IS safe to kill+relaunch (resumable). Supervisor liveness = process-exists, NOT progress; a longer-window CPU/progress check is the real health signal.
- **Corpus exact-dup guard (run-5j, 2026-07-06):** the CREC 4-year backfill re-inserted 1,142 exact-full-text dup rows (CREC 922 / INTERVIEW 180 / CHRG 40) - the CREC/CHRG legs had no pre-insert dedup, only the fetch-log skip, so a committed-but-unmarked date got re-processed. Deduped to MIN(rowid) per (member, package, text) (backup: `backups/social_media.PRE-DEDUP-*`); `run_crec`/`run_chrg` now carry a stored-package guard (skip+mark any package already in speeches); audit guard added (corpus exact-dup-free, audit = 62). When measuring dups use FULL text, not a substring (substr over-counts shared procedural boilerplate such as "Mr. Speaker, I rise..." as false dups).
- **Weekly-refresh task hardened 2026-07-05** (missed 06:00 wake, 8:24 catch-up killed by re-sleep, 0x8007042B, zero log lines): WakeToRun + battery-start + no-battery-stop + 3x30min restarts + 3h limit now set via `Set-ScheduledTask`.
- **Desk pillar-display drift (run-5h, 2026-07-06, Paul caught it via "why is Crapo #1"):** the member desk showed pillar percentile bars + weights from the STALE workbook Blended Model sheet, not from `ranks_python.json`; they diverged from and INVERTED the authority (Crapo influence 1.000 displayed as 0.222; weights 0.40/0.20/0.35/0.05 vs live 0.25/0.30/0.40/0.05), making the #1 rank look unjustified on-screen while the rank itself was correct. The 2026-07-03 R2 fix had corrected rank/score to the authority but left the pillars behind. FIXED: desk pcts/weights/raw all from `ranks_python.json` (pcts keys leg/press/inf/dem to desk leg_n/press_n/comm_n/demo_n; ab_weights 2/3/4/5 to leg/press/comm/demo). Audit now guards it (2 checks, audit = 61): desk pillars == authority pcts, and displayed weights x pillars reconstruct the displayed score. LESSON: when an artifact becomes the authority, grep EVERY consumer for the OLD source - a partial cutover leaves displays lying while the number is right.
- **New-collector-leg checklist (run-5a lesson, 2026-07-06):** after any new fetch leg's first run verify (1) date coverage - `select count(*) ... where date=''` (both fox and hewitt shipped 100% dateless on day one: hardcoded sitemap range / slug-only date source; dateless rows silently vanish from co_appearance and lose recency in the reference dyad cap); (2) member breadth vs expectation (hewitt pass 1: 17 members = full-name-title rule too strict); (3) `iv_fetch_log` "ok" conflates stored with fetched-and-dropped, so improving attribution rules requires clearing zero-yield markers (delete hh:-style keys with no matching speeches package), never blind re-runs (duplicate rows).
- **Pre-GATE-2 deep audit (2026-07-07 @ce1482d, 7 bugs fixed pre-fire):**
  1. Content-keyed caches: `big5_llm`'s cache key omitted the chunk TEXT; after corpus growth, re-sampled chunks hit stale judgments, so the approved "re-score" would have been a silent no-op and the ONE prereg C-retest look would have burned on stale data. Any cache over a mutable corpus must hash the content (fix: +md5(text)[:16]; fresh spend 4,214 chunks / 509 members, ~$158 batch).
  2. Lock heartbeats must outlive the longest step: the supervisor heartbeat only fired BETWEEN gate steps, so any >90-min step (batch re-score) went stale mid-step, the next tick stole the lock, and a concurrent gate would double-spend; fixed with a 60 s daemon-thread heartbeat.
  3. cwd=fec launch paths: `c_prereg_test.py` (repo ROOT) was FE-joined, so the retest silently skipped; validate's artifact arg was fec-relative, giving FileNotFoundError. `gate_step` now takes absolute paths.
  4. Unattended spend: fail-CLOSED spend guards parse each script's own "est ~$X" line (`B5_GATE_CAP=200` / `REF_GATE_CAP=100`); re-score runs `--batch` (50% off) with `B5_FAST=0` (fast-mode premium never unattended); GATE-2 aborts before the retest if the artifact is not fresh.
  5. PowerShell `-f` floats are locale-formatted (comma decimals on non-US): emit raw integers, divide in Python.
  6. Agent-review calibration held: 2 of the fan-out findings were over-claims (`cf.write` already lock-guarded; `SetThreadExecutionState` auto-clears on exit); always re-verify against code before fixing.
  7. Fox source pages can embed the whole transcript body TWICE (`store()` now dedups intra-page on member + exact text, commit 0ab0b26; 50 legacy surplus rows deleted with WAL-safe backup).
- Related notes: `moneyball-architecture`, `moneyball-deep-audit-2026-07-02`, `press-classification-user-domain`, `moneyball-model-config`.

## Related Topics

- [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-1-3]] — The Melange audit runs of 2026-07-01 to 07-03: run 1, run 2, the deep audit of 07-02 and run 3.
- [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-4-5-and-integrity]] — The Melange audit runs of 2026-07-04 to 07-10: run 4, runs 5a and 5b, the data-integrity audit, the network, vote and new-cycle audit, and the extensive audit with a true run-through.
