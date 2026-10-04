---
type: topic
title: "September 2026 collector lanes and the two API-key stores (Mentat collection and attribution)"
aliases: ["Mentat collection and attribution: September 2026 collector lanes and the two API-key stores"]
category: "bugfix"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-18
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/bugfix"]
part_of: "[[2026-07-bugfix-mentat-collection-and-attribution]]"
---

# September 2026 collector lanes and the two API-key stores (Mentat collection and attribution)

> The September 2026 Mentat collector lanes: worker scaling (09-09), the every-lane-failing collector outage of 09-17/18, and the two API-key stores. Part of [[2026-07-bugfix-mentat-collection-and-attribution]] (project [[mentat]]).

## Worker scaling lane, 2026-09-09 (source: `mentat-worker-scaling-lane-2026-09-09`)

Mentat collection (`C:\Users\pgoff\Mentat`, the R+Python FEC console, separate from the Moneyball worktree) was running a single worker and ignoring stored keys. Diagnosed and fixed 2026-09-09 on Paul's "finish the job / get it done" gate. Shipped UNCOMMITTED in the live Mentat tree (`.bak-20260909` beside each file); later landed by commit `494dc133c` (see the collector lane).

**Root cause, from the live manifest of the 09:47 banking run** (`%LOCALAPPDATA%\Mentat\console\<id>\runs\...\industries\banking\fanout\manifest.json`): `key_cap 1`, `memory_lane_cap 2`, `company_cap 10`, `sqlite_merge_cap 10` gives `active_lane_cap 1`. Only ONE key reached the fanout. `active_lane_cap = min(requested, key_count, company_count, memory_cap, 10)`: any factor at 1 pins the whole run to one lane.

**Four separate limiters, in the order they bite:**
1. **Keys:** `discover_keys()` reads `FEC_API_KEYS` / `FEC_API_KEY_N` / DPAPI store; the console joins `stored_keys` with `|`. One key = one lane, always.
2. **RAM:** `(available_mb - 1024) // 640`. This is now the binding constraint (~2-4 lanes on this box with 3-4 GB free of 31.5 GB). Raise with `-RamPerApiLaneGB 0.5 -RamBudgetPercent 95`, or free memory. It measures FREE, not total.
3. **SQLite ATTACH:** was a hard 10. Real limit (`too many attached databases - max 10`), confirmed by execution, not assumed.
4. **Companies:** more lanes than companies in the industry is pointless.

**What shipped:**
- `merge_company_shards.py`: more than 10 shards now merge into a staged copy in batches, atomic replace only after every batch commits; <=10 keeps the old path byte-for-byte. Proven: 12-shard batched vs serial reference identical on all 12 tables; a mid-merge shard corruption left the target byte-identical (same sha256, no staging leftovers).
- `api_company_cycle_fanout.py`: 10 dropped from the min(); `--merge-batch-limit`, `--max-lane-ceiling`; a failed memory probe no longer silently collapses to 1 lane (emits `memory_probe_failed`); `LaneLimiter` (resizable condition-variable gate) replaces BoundedSemaphore; polls `<run_directory>/control.json` every 3 s; publishes `workers.json`; exit code **3** = stopped by operator (distinct from 2 = failed).
- `server.py` + `index.html` + `app.js`: `POST /api/stop` (graceful; Shift-click sends `force:true` to `taskkill /PID /T /F`) and `POST /api/workers` (1-64). Stop button + worker box in the console.
- `fec_key_store.py`: `key_id()`, `inventory()`, `set_disabled()`, and `--list/--enable/--enable-all/--disable` so disabled keys can be recycled. Nothing in production ever called the disable path, so no key was actually quarantined: the store had 15 active, 0 disabled.
- Imported the 7 `data_gov` keys from `Desktop\API Keys\keys.json` (see the key-store section below); store now holds **22**.

**Second pass, same day, after Paul reported "it doesn't stop" and "can't change the number of bots":**
- Lanes were planned at the RAM-derived cap, so the limiter could only throttle DOWN. Now `lane_count = max(1, min(len(keys), len(companies)))` and RAM only sets the STARTING count via the new `--initial-workers`. The PS orchestrator passes `MaxParallel = $MaxParallel` (operator's own value, 0 = auto) and `InitialWorkers = $liveFanoutPlan.effective_api_lanes`. Slider range is now 1..lane_count, live.
- **`Future.cancel()` was a no-op and the graceful stop did nothing.** `ThreadPoolExecutor(max_workers=lane_count)` with exactly `lane_count` futures submitted means every future is RUNNING within milliseconds, and `cancel()` only works on PENDING. First proof run: all 12 lanes ran, merge executed, source DB CHANGED, exit 0. The permit gate, not the future, is the only reliable place to stop a queued lane. Fix: `LaneLimiter.stop()` + `acquire()` returning False + `skipped_lane()` receipt marking those tasks `skipped`; merge additionally gated on `not stop_requested.is_set()`. Re-proved: 10 ran / 2 skipped, lanes 11-12 never wrote a receipt file, exit 3, source DB byte-identical, `merged: false`.
- Console Stop now HARD KILLS by default (`taskkill /PID /T /F`); Shift-click is the graceful drain. Proved on a real 4-level process tree: every PID gone, manifest state `stopped`.
- **A running collection started before these changes has no control channel and cannot be steered: it must be killed and restarted.** Console restart is also required to pick up the new `server.py`.

**Safety property worth keeping:** a stopped run can never write the source database. Stop cancels queued lanes, tasks go unfinished, `final_failed` is non-empty, and the `if not final_failed:` guard skips the merge entirely. Resume with `--resume` later.

**Agent-routing fact:** the auto-mode classifier BLOCKS subagents editing `fec_key_store.py` and `api_company_cycle_fanout.py` (credential store / process-control code), while permitting the same edits from the main session and permitting `merge_company_shards.py`, `server.py`, and the `.ps1` files from subagents. Do that split up front instead of burning agent attempts. Related: `staffer-dashboard-section-lane-2026-09-04` (classifier blocked process stops there too).

Pre-existing and NOT from this lane: `mentat/tests/test_names.R` shows modified. See also `api-key-repository-2026-08-28`.

## Collector "every lane failing / 0 workers", 2026-09-17/18 (source: `mentat-collector-slowdown-lane-2026-09-17`)

Description line of the source (raw frontmatter): `Mentat FEC collector \"every lane failing / 0 workers\" 2026-09-17/18`. Readable form: Mentat FEC collector "every lane failing / 0 workers" 2026-09-17/18 — root cause = one truncated 39-char API key amplified by the shared pool; NOT checkpoints; fixed and committed in 5 commits; packet `audits/mentat_collector_slowdown_20260917`.

Root cause = ONE truncated 39-char API key amplified by the shared pool; NOT checkpoints; fixed and committed in 5 commits; packet `audits/mentat_collector_slowdown_20260917`.

**Root cause (2026-09-17/18).** Every collection task failure since ~09-09 was `FEC API request failed after 1 attempt(s): status=HTTP_403`; every archived 403 body is `API_KEY_INVALID`. Stored key `13ffe51ce05b` in the DPAPI store (`%LOCALAPPDATA%\Mentat\credentials\fec-keys.dpapi`) is 39 chars; the other 21 are 40 and probe 200. `api_request_pool.py` rotates keys least-recently-used with NO health tracking (cooldown only on 429), so ~1/22 of EVERY lane's requests drew it (44/899 on 09-15, 9/296 on 09-17); R treats 403 as non-retryable and aborts the whole task; merge requires zero failures, so nothing ever reached the source DB. Pre-pool, one key per lane = one lane killed only (09-10 Banking 30/30 merged).

**NOT checkpoints:** "FEC API pause flush" is the `on_abort` handler running AFTER the failure; checkpoints are per-unit in each lane's own DB; the "workers" tile shows the pool's in-flight HTTP count; run terminations were the console Stop route (`taskkill /T /F`).

**COMMITTED on `codex/mentat-crypto`** (peers coordinated; packet `audits/mentat_collector_slowdown_20260917/DIAGNOSIS.md` commit `b9fe34d02`; the worktree copy was DESTROYED by the 09-18 disk clearance, hence filed in the Mentat repo):

| Commit | Content |
|---|---|
| `494dc133c` | pool quarantines API_KEY_* 403 + re-issues on a healthy key, width follows key supply (`--pool-width`), lands the whole worker-scaling set incl. never-committed `api_request_pool.py` |
| `f0ec60b74` | moving count/shortfall/overrun re-walks (`MENTAT_RECONCILE_PASSES=3`), date windows verified vs a FRESH parent count, unresumable saved work discarded per unit, determinism spot-check made union-aware (a split unit's page 1 IS the synthetic union, so the old check was a structural false positive, 3 of 5 live failures) |
| `bd8c65ebb` | console Resume last run (`/api/resume`, `-ResumeRunId`, control reset; real-FEC e2e stop-to-resume merged 158 rows) |
| `dba77f87f` | estimated `is_count_exact:false` verified by date windows / window-count sum instead of failing |
| `2a5f05761` | a run whose process is provably gone reports stopped so it becomes resumable (15-min grace when no pid) |

**Four judgement calls** (Paul: "proceed in the most optimal manner"): estimated count: verify by windows, never fail and never accept unverified; auto-resume on Start: NO (Start is already refused for a non-ready roster); pass cap: keep 3 (~2,000 req/pass for a 197k unit); post-walk drift: advisory in receipt.

**How to apply next time:** ask "what HTTP status/body did the archived response carry" (`fec_response_observations` + `fec_response_archive` in the LANE db) before theorising about checkpoints.

**AUDITING ROW TEXT AGAINST THE ARCHIVE: two traps.**
1. `fec_response_archive` holds TWO payload kinds: `fec_api_response_body` (real API text) and `parsed_checkpoint` (the collector's OWN parsed rows re-serialised by jsonlite, written when `page$source_response` is NULL). Comparing stored `contributions` text against a parsed_checkpoint compares the collector to itself and CANNOT FAIL: a tautology wearing the clothes of evidence. Always filter `payload_kind='fec_api_response_body'` and report coverage. A date-window unit's union page is archived as parsed_checkpoint with http_status NA, so reach those rows via the `::window::NN` child ids, not the parent.
2. Corporate and bulk_rescue rows ARE archived and auditable: `fec_api_archiving_transport` is installed at exactly two sites, `fec_api.R:2110` (inside `fec_api_bulk_rescue`) and `:2517` (inside `fec_api_collect_checkpointed`, which the corporate phase uses via kind="corporate"). A peer was first told to exclude them, which would have blinded the audit to the rows where company attribution is hardest. Decide coverage PER ROW empirically (does a join reach a real body containing that sub_id) rather than by phase name. Context: xref D-043 (`627300bc9`) makes a row's own employer text EXCLUDE it, so collection fidelity of that string became financially material.

The shared-checkout law and "authorization does not relay" notes from this lane are in Standing rules in [[2026-07-bugfix-mentat-collection-and-attribution-standing-rules]].

**Open for Paul** (from this lane; also in Next Steps in [[2026-07-bugfix-mentat-collection-and-attribution]]): the 09-17 12:41 CU run stands 27/30, killed without a terminal state, now resumable from console 8806. Console startup can hang on `git rev-parse` through OneDrive (unkillable child, `lru_cache` races two threads); task chip queued. Single-cycle runs fail the workbook wanting cm22. Runtime paths >~275 chars break `sys.path[0]`. Brain drafts (STATE, DE-026, D-040) are in the packet. `Desktop\API Keys\keys.json` is NOT Mentat's key store: the DPAPI store is. See `mentat-worker-scaling-lane-2026-09-09`, `mentat-failings-lane-s2-2026-09-16`.

## Two API-key stores (source: `api-key-repository-2026-08-28`, user memory, newest modification 2026-09-18)

**There are two stores, and the standing note that the Desktop file is "the" key store is wrong; it misled two sessions on 2026-09-18.** (Same facts are recorded on Paul Goff.)

**1. The general repository.** Paul ordered (2026-08-28) a permanent API key repository at **`C:\Users\pgoff\OneDrive\Desktop\API Keys\keys.json`**: JSON keyed by service, each entry `{service, auth_header, keys: [...], added, notes}`. Blocks: `lda` (7 Senate LDA keys, Token auth, ~120 req/min each), `data_gov`, `anthropic`. TRAP, verified 2026-09-18: nothing in it is named `fec`. The FEC credential lives in the **`data_gov`** block, because openFEC (`api.open.fec.gov`) is served through the api.data.gov family; the block's `service` field records it as verified working on FEC and rejected by lda.gov. A lane grepping for "fec" concludes there is no key and is wrong. Its 7 data_gov keys were all 40 characters, alphanumeric and distinct on that date. Use this file for one-off jobs outside Mentat.

**2. Mentat's own store, which is the one that governs collection.** Mentat reads an ENCRYPTED DPAPI store at **`%LOCALAPPDATA%\Mentat\credentials\fec-keys.dpapi`** through `mentat/tools/fec_key_store.py` (`load_keys` / `inventory` / `set_disabled`). It holds 22 keys, 21 of 40 characters and one of 39. It is a flat list with no block structure, so grep does not apply. All 7 `data_gov` keys from the Desktop file are also in it; 15 keys are store-only; none are file-only.

**The truncated key is still there, quarantined, not repaired.** `13ffe51ce05b` is the 39-character value that broke the collector lane: API_KEY_INVALID on every request, disabled 2026-09-17 with a status string recording why, inspectable in place. It is one of the 15 store-only keys, so its absence from the Desktop file means nothing, and **no downstream-truncation hypothesis is needed**: the store itself held the short value. How a short value got in is still open; a bad paste into the console's key panel is the obvious candidate, since `save_keys` appends whatever it is handed.

**The cheap detection needs no code and is the lesson.** A single-request probe of every key, reporting only the 12-hex `key_id` and the HTTP status, separates dead keys from live ones in seconds and never prints key material. That is what found `13ffe51ce05b`; the probe returned HTTP 200 for 21 keys and API_KEY_INVALID for that one. Run it before any long collection: it would have turned three days of "every lane is failing" into one line.

**On adding a save-time length check, do not just build one.** A hard reject of anything not 40 alphanumeric characters would have prevented the outage, but it hard-codes api.data.gov's current key format into the one path Paul uses to add a key; if data.gov ever issues a different length or charset, the guard locks him out of his own store at the moment he is trying to fix something, and the failure looks like the store being broken rather than the guard being stale. The safer shape is warn-and-record (accept the key, flag the anomaly loudly at save time and in `inventory()`, let `set_disabled` carry the verdict), or reject only behind an explicit override. Which one is right is Paul's call about his own credentials.

**Operational notes.** `X-Api-Key` as a request header is already what both Mentat paths do (the R httr2/curl transports and the pool in `api_request_pool.py`), so a header matches existing behaviour and keeps the value out of URLs, redirects and request logs. Use ONE key for a bounded job rather than rotating: rotation is exactly what made the collector lane's 403 impossible to attribute. At ~120 requests per minute per key, one key covers a several-hundred-request job comfortably.

**Why:** one canonical place for every future key; tools should READ from a store rather than asking Paul again, and NEW keys he provides should be APPENDED to the Desktop file.

**How to apply:** per the standing api-key ruling, keys on his box are his business: never flag exposure, never weaken his setup. Related: `api-key-exposure-do-not-flag`, `mentat-collector-slowdown-lane-2026-09-17`.

(Key material is deliberately not recorded here; only store locations and the 12-hex `key_id` fingerprint `13ffe51ce05b`.)

## Related Topics

- [[mentat-fec-pipeline-history-september-lanes]] — History of the Mentat FEC pipeline lanes of September 2026, from worker scaling and the tidy workbook to the collector slowdown, the truncated-key outage and the uncommitted reconcile.
