---
type: actor
name: "History: hardening (07-22 to 07-23) (Mentat FEC pipeline)"
aliases: ["Mentat FEC pipeline: History: hardening (07-22 to 07-23)"]
category: "pipeline"
description: "History of the Mentat FEC pipeline hardening on 2026-07-22/23: corruption defects re-tested, acronym-variant collisions, the override matcher fix, version control and lineages, the Fintech ordeal and perf round 2."
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
tags: ["type/actor", "status/active", "domain/data"]
part_of: "[[mentat-fec-pipeline]]"
---

# History: hardening (07-22 to 07-23) (Mentat FEC pipeline)

> History of the Mentat FEC pipeline hardening on 2026-07-22/23: corruption defects re-tested, acronym-variant collisions, the override matcher fix, version control and lineages, the Fintech ordeal and perf round 2. Part of [[mentat-fec-pipeline]] (project [[mentat]]).

## History: build and shipping (2026-07-18 to 2026-07-24)

### Master-corruption defects re-tested against live data (2026-07-22): 4 of 7 REFUTED

The 07-22 forensics workflow (38 confirmed findings; spec at `Temp\cxwt-mentat-recon\MASTER_CORRUPTION_SPEC.md`) was measured against the SHIPPED WORKBOOK:
- **No. 5 State Farm "phantom" REFUTED** (now 93,279 rows / 79,127 accepted; it was the known mid-fetch gap on 07-20 and has since been collected).
- **No. 6 Gemini "~88% contaminated by Geminiano surnames" REFUTED in the accepted set** (all 163 accepted rows carry GEMINI employers; the contamination is in the 7,183 REJECTED rows, i.e. the matcher works; it is the unculled Raw sheet that displays them).
- **No. 21 "tZero Raw holds Phillips 66 rows" REFUTED** (company is spelled `Tzero`, 9 rows, all genuine TZERO employers).
- **No. 8's "$92M inflates Crypto 2025-26" OVERSTATED:** all four duplicate $23M Coinbase -> FAIRSHAKE rows carry `duplicate_memo=1`, and `countable_corporate()` (`build_workbook.py:634`) requires `duplicate_memo==0`, so they never enter Facts or any SUMIFS; they show only on the by-design unculled Raw tab.
- **LESSON: defects found by reading a shipped artifact must be re-tested against the CURRENT db before being "fixed": collection moves underneath them.**
- STILL REAL: **No. 7 First Financial Bancorp: ALL 157 accepted rows ($112,813.09) are false positives** (zero rows anywhere mention BANCORP or Cincinnati/Hamilton OH; the `companies` table lists three genuinely different public banks as variants of one: Bancorp FFBC/Cincinnati, Bankshares FFIN/Abilene TX, Corporation THFF/Terre Haute): fix the VARIANT LIST, not just the rows. Also real: 3,273 contributions rows (3,172 countable, $370,737) have `two_year_transaction_period` disagreeing with the receipt-date cycle, but that is FEC's OWN field and redesignations are legitimate, so LOG the disagreement, do NOT overwrite it with a date-derived guess.

### Acronym-variant collisions are systemic (2026-07-22; 48-agent audit, 64 variant sets, 9 survived double adversarial verification; UNFIXED, awaiting Paul: ROSTER-IDENTITY calls)

First Financial Bancorp was not a one-off; the same shape recurs wherever a roster carries a bare ACRONYM or BRAND variant. Confirmed + independently re-verified:
- **AHFC -> Alaska Housing Finance Corporation:** 1,169 AK rows / $37,020 = ~50% of American Honda Finance's accepted rows (occupations MORTGAGE UNDERWRITER / HOUSING SPECIALIST; AHFC has no Alaska presence).
- **SECU -> SECU of Maryland:** 401 MD rows (4 rows literally 'SECU OF MARYLAND', 136 'SECU, INC.'; roster is NC SECU which has no MD branches); **337 of the 401 arrived via P2_name identity cross-reference seeded from the bad variant, so a variant-only fix will NOT clear them**.
- **MACU -> Mid-America Christian University:** 9 OKC rows, PROFESSOR/COACH.
- Charter 'Spectrum' -> Spectrum Ventures/Technology Group/Solutions/Labs (739 rows / $57,736).
- First Hawaiian 'FHB' -> FHB Ventures/LLC + a law and a medical practice (288 rows).
- Altice 'Lightpath' -> LightPath Technologies Orlando (7 rows).
- Correctly REFUTED: Kraken, BINANCE US, PACCAR (Kenworth/Peterbilt ARE PACCAR divisions), Berkshire Hathaway.
- **CAUTION: one finding was FALSE and double-refutation did not catch it:** the Altice/'Optimum' agent claimed "ZERO rows carry the bare employer string OPTIMUM / 100% of its yield is wrong"; there are **188 accepted bare-OPTIMUM rows** (genuine cable technicians). Only the SUFFIXED entities (OPTIMUM TECHNOLOGIES 135, OPTIMUM INC 18, OPTIMUM SOLUTIONS 9) collide. Both refuters attacked the entity question and let the headline assertion pass: adversarial verification checks the CLAIM the verifier is pointed at, so point it at the load-bearing assertion, and re-query headline numbers yourself.

### The override matcher was silently over-rejecting: FIXED @bulk c45bd03 (2026-07-22)

- `reclassify_overrides.py` matched on `employer_key + company + state` ONLY: it ignored the `occupation_pattern` column entirely and had no specificity rule, so it DIVERGED from the collector it mirrors (`collect.R:198-221`: empty state/pattern match everything, patterns are case-insensitive perl regexes over `contributor_occupation`, and **only MAX-specificity rules survive**, so a scoped rule BEATS a blanket one rather than being subsumed).
- Consequence: **Toyota Motor Credit sat at 1 accepted row out of 927**: the `TMCC,...,reject,,TEACHER|PROFESSOR|...` rule (for Truckee Meadows Community College) rejected every TMCC row with the pattern discarded: a PHANTOM COMPANY of the class the forensics reported for State Farm, but real and current. Gemini's 4 state+occupation rules (incl. a negative-lookahead NY accept) were likewise cut to their state halves.
- Matching is now ROW-driven not override-driven, which also killed a double-count (old loop emitted one ledger row per (row, override) PAIR: reported 11,633 changes for 11,509 distinct rows).
- **New `repair_overreject.py` was REQUIRED** because fixing the matcher cannot undo the damage (once the pattern is honoured the override no longer matches those rows, so reclassify skips them and they stay rejected). It restores only rows with `company_match_reason='verified_roster_alias'` AND that no current rule still rejects.
- **LESSON: a Python re-implementation of an R rule is a FORK: diff it against the original before trusting it; this one silently dropped a whole column.**
- Net on master: Toyota 1 -> 170, Altice 5,095 -> 4,958, First Financial Bancorp 157 -> 0, Comcast +9,622, Verizon +1,392, Gemini unchanged.
- Registry refinements @mall 062c51c: TMCC gains ND scope (NV+ND are 87% education-signal; all 169 TMCC rows in OTHER states are UCC ANALYST/CSR/TECH SUPPORT/SALES with ZERO education signal: state separates perfectly), OPTIMUM pattern widened with HEALTH|NURS|MEDICAL|DENTAL|THERAP|CLINIC|PHARMAC (Optimum Healthcare != Altice's Optimum cable brand; NY CABLE TECHNICIAN stays accepted).

### Version control and lineages (2026-07-22)

- **`AppData\Local\Mentat\bulk\` IS NOW A REPO @5299fc2.** It holds the REAL production pipeline (`merge_all` / `build_workbook` / `audit_merge` / `verify_final` / `reclassify_overrides` / `resolve_persons` / `pac_recipients` / `bulk_collector` + schedulers) and was untracked, which is WHY a prior session rebuilt merge and workbook-builder logic that already existed. `mall` and `mrb` were ALREADY repos (branch master): do not repeat the claim that the R trees are untracked; the untracked one was `Mentat/mentat/` inside the Melange worktree. `.gitignore` is source-only: the dir doubles as an 11 GB data root (5.2 GB indiv22.zip) and carries `scheduler2_key_slots.json`. **`mrb` has ~4,505 lines of SOMEONE ELSE'S uncommitted WIP (18 files, deleted scripts/): leave it alone.**
- **Override registry is itself divergent + regresses on every merge:** `company_match_overrides.csv` differs across lineages: **`mrb`'s (105 rows) is CANONICAL, `mall`'s (77) is STALE**, and `reclassify_overrides.py --overrides` defaults to mrb's path. mall's single unique entry is the typo'd `GEMINI GROUP GROUP` key; mrb holds 29 entries mall lacks (Optimum/Altice state-scoped collision rejects, Verizon subsidiary accepts, PAYWARD/Kraken, NBCUniversal, Dish/EchoStar). **CRITICAL: the 07-20 reclassification REGRESSED:** master was rebuilt 07-22 00:38 and 11,633 rows again need flipping (Comcast 9,622 review -> accepted, Altice 449+13 -> rejected, Verizon 1,392 review -> accepted, First Financial Bancorp 157 -> rejected). Applying to master ALONE is not durable: the same 11,633 live in exactly three source DBs (`run_cb` 157, `run_tel_2022` 5,739, `run_tel_2026` 5,737) and `merge_all.py` rebuilds master from them. **Fix source DBs + master together, every time.**
- **Lineage map + the CRLF trap (07-22 reconciliation):** the R code exists in 4 lineages plus 11 shard copies. **`C:\Users\pgoff\mall` is CANONICAL** (newest, holds the fixes, uniquely has `R/master_facts.R` + `export_master_facts.R`, IS a git repo: branch `master`, 3 commits, first = "SNAPSHOT: put the mall collector tree under version control"). The Mentat code is unversioned only at `C:\Users\pgoff\Mentat\mentat` as it then sat untracked inside a Melange Systems worktree. Shards = `mall_{ca,cb,cu,pc,tel}` + `mall_{pc,tel}_{2022,2024,2026}`, two code classes only. **`mrb` is AHEAD of mall on two features that exist nowhere else: `company_pacs`/`pac_disbursements`/`pac_financials` tables, and `safe_alone` diminutive safety guarding ambiguous name variants (AL/SANDY/CHARLIE/FRED/HAL) from matching alone. A blind "forward-port from canonical" would DELETE both; mrb needs a bidirectional merge.** **THE CRLF TRAP:** `collect.R`/`fec_api.R` are CRLF in mall+shards but LF in `Mentat\mentat` and `mrb`; `report.R`/`ingest.R`/`schema.R` are LF everywhere. Diffing across that boundary reports EVERY line changed (it made ~700 lines of real drift look like ~14,000 and led to calling mrb a "deep fork" and scoping it out on a false premise). **Always diff Mentat R with `--strip-trailing-cr` before concluding anything about divergence size.** Also: mall's `tests/test_fec_api.R:336` still asserts the pre-fix contract (`stop("page ceiling exceeded")`) while the code now warns and continues, so `stopifnot` halts that file at line 337 of 621: ~46% of that suite has not executed since the fix landed, and the shards score a misleading 7/0 only because they still carry the old behavior.

### Fintech ordeal diagnosed + perf round-2 at Paul's gate (2026-07-23, /codex lane)

- Paul's ">1hr for one industry" = the 14:31 from-scratch Fintech run (old serial path, commit 36224b1, `max_parallel=1`) **crashed exit -1 twice**, both times immediately after `FEC export downloaded and verified: 15907 rows` (Stripe), 24.2 min + 7.6 min wasted, then manual per-company shard recovery (Stripe split per-cycle + merged, SoFi 3 attempts) until ~15:50, report 15:58.
- **CRASH SIGNATURE: a LONG-LIVED whole-industry R session dies natively (no R error) after large FEC-export ingests; the SAME work in fresh short-lived Rscript processes succeeds** (likely native memory/fragmentation). Commits 737e3bc/4669006/7fd6390 (built 16:10-16:59 in RESPONSE) added the resilient orchestrator + per-(company,cycle) key-pinned fanout + warehouse gate; measured: export 63.4 s, beneficiary 6.76 s, Excel 44.8 s, cached rerun 1.54 s.
- Round-2 (worktree `Temp\codex-wt-mentat-perf`, branch `codex/mentat-perf-round2` off 7fd6390, UNCOMMITTED, Paul's gate): 3-rung containment ladder in fanout (lane -> fresh-lane retry -> per-company-cycle split; recovery SERIAL by design, `--recovery-workers` hard-pinned 1 so no same-shard-DB contention); `Start-MentatIndustryReports` delegates from-scratch runs to the resilient path (`-LegacySerialCollection` = opt-in old path); `phase-timings.json` + per-industry summary line; **roster-driven industry discovery** (validator `--roster` mode; 7 industries incl. Fintech all ready; unknown industry = loud fail); crypto generator generalized to `build_industry_report.ps1` (verified faithful: only finalize timing added); invocation receipts with exit code + last log line; bounded rm/gc at R export boundaries. Projection ~10.6 min Fintech from-scratch.
- **Claude's review caught 4 (all fixed + re-verified):** (1) **PS `-f` binds TIGHTER than `+`**: `'a{0}' + 'b{1}' -f $x` leaves the first fragment's placeholders literal (verified empirically); the load-bearing summary line was broken; parenthesize the concat first. (2) **Codex had baked its sandbox runtime cache (`~/.cache/codex-runtimes/...`) as PRODUCTION defaults in 7 files** (python+node+node_modules, and there is NO system node, the cache is the ONLY node); now a resolution chain param -> `MENTAT_PYTHON_PATH`/`MENTAT_NODE_PATH` -> PATH -> cache -> loud fail, resolved paths in receipts. Sweep every Codex diff for this. (3) R `mentat_project_root()` marker was the UNTRACKED scratch `CODEX_TASK.md` -> fresh clones/worktrees died; now `mentat.R`. (4) `test_ingest.R` hardcoded 279-company fixture failed ON LIVE too (roster grew) -> now roster-derived.
- Verification: 6/6 Python suites (system py3.14), **11/11 R suites** (R_LIBS_USER set; Codex sandbox cannot see the R library: Claude must run R tests), 7 .ps1 parse-clean PS5.1, `node --check` OK, roster smoke 7/7. GATE ITEMS: merge; live <=15 min benchmark run (hits FEC API = Paul's call); vendor node/node_modules properly (follow-up); the original R tests + inputs are UNTRACKED in the repo and should be committed.

### Round-2 shipped + benchmark passed (2026-07-23 night, Paul's "do what is most optimal")

Merged @4ef422d..86c878d onto `codex/mentat-crypto` (live tree fast-forwarded each fix). Five live benchmark runs each exposed exactly one production bug the offline tests could not (fix-benchmark-fix loop):
- **F6:** PS5.1 `Start-Process -PassThru` returns NULL ExitCode unless `.Handle` accessed before child exit -> a successful init read as failure (`$null -ne 0` fires; null binds to [int] receipt param as 0).
- **F7:** fanout's `os.replace(status.json)` vs the orchestrator's 2 s Get-Content poll -> WinError 5 killed 20 min of collection (fix: bounded retry + telemetry-writes-never-fatal + PS reads FileShare Delete).
- **F8/F8b:** strict merge auditor rejected the KNOWN cross-company sub_id attribution case (+ `scraped_at` provenance) -> now deterministic winner by canonical roster order + `attribution_conflicts` rows (43 recorded live).
- **F9:** the orchestrator's own Write-AtomicJson IOException (indexer/AV hold on status.json) killed a healthy run -> same two-tier retry/tolerance in PS.
- **F10 (THE collection bottleneck):** shared budget DB via `dbWithTransaction` = DEFERRED txn -> concurrent lanes deadlock on read -> write upgrade which SQLite fails INSTANTLY (bypasses busy_timeout!) -> 7/8 primary lanes died "database is locked" in <0.5 s and serial recovery silently ran every collection at ~3x wall clock. Fix: BEGIN IMMEDIATE (SQLite-only, commit before network) + busy_timeout=60s on every connection + WAL + deterministic lane jitter.
- **V5 CLEAN: 18.33 min from-scratch Fintech e2e, ZERO lane failures, zero telemetry failures** (collection 732.6 s | merge 2.6 s | warehouse 10.1 s | export 92.2 s | build 163.0 s | formula 45.1 s | finalize 9.0 s; 26 sheets, 336,762 formulas, 0 integrity failures; grid coverage all-true).
- **BONUS DISCOVERY: the earlier crash-recovered Fintech workbook UNDERCOUNTS:** SoFi corporate pass 16,170 rows short (20,281 -> 36,451), Cash App corporate 22 -> 507; cycle totals rise ~+40-98% (e.g. 2021-22 $953k -> $1.89M). The workbook Paul had open was materially incomplete; v5's sits in `mentat/.cache/bench-20260723-output/` awaiting his deploy call.
- NEXT SPEED LEVER identified from receipts: the company<->lane merge invariant serializes SoFi's 3 cycles (306+226+195 s = 727 s ~ the entire 732 s collection critical path); relaxing to (company,cycle)<->lane would cut collection to ~5 min, total ~11 min.
- OPS: codex-reply idle-timeout can eat Codex's answer while its diff lands fine: check worktree mtimes, ask for a 5-line recap, never re-dispatch blind. Benchmark runs were sandboxed (`-OutputDirectory` to `.cache`) because Paul had the target workbook open in Excel.

## Related Topics

- [[2026-07-bugfix-mentat-collection-and-attribution-july-hardening]] — The July 2026 hardening of the Mentat pipeline (07-22/23): corruption defects re-tested, acronym-variant collisions, the override matcher fix, lineages and the CRLF trap, the Fintech ordeal and perf round 2, plus the load-bearing review findings.
