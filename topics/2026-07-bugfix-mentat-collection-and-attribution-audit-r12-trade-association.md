---
type: topic
title: "2026-07-27 audit, R12 reconciliation and the trade-association $0 fix (Mentat collection and attribution)"
aliases: ["Mentat collection and attribution: 2026-07-27 audit, R12 reconciliation and the trade-association $0 fix"]
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

# 2026-07-27 audit, R12 reconciliation and the trade-association $0 fix (Mentat collection and attribution)

> The six-agent Mentat audit of 2026-07-27, the R12 reconciliation and the trade-association $0 gap, which turned out to be the same defect as the ~$163k Candidate swap and was fixed at read time in report.R. Part of [[2026-07-bugfix-mentat-collection-and-attribution]] (project [[mentat]]).

## Full-codebase audit, 2026-07-27 (source: `mentat-full-audit-2026-07-27`)

Six parallel agents audited every Mentat source file 2026-07-27. Continues the trade-association gap work below.

**The organising insight:** the REPORTING layer is sound; the COLLECTION layer produces silent, plausible wrong answers. Independently verified correct: cross-sheet reconciliation exact 54/54, workbook column-offset mapping exact, both employer matchers agree on 113,077 tuples with 0 divergences, union-find order-independent over 1,500 permutation trials, no bridge/downstream double counting.

**But `spending_assert_category_reconciliation` (`report.R:2554`) is a TAUTOLOGY:** it re-sums the rows that produced the total. "Categories sum exactly" and "tiers sum exactly" are true BY CONSTRUCTION and are NOT evidence that any assignment is correct. Do not cite them as validation again.

### Worst findings (verified, not just agent-claimed)

1. **Beneficiary Summary is 89% inverted.** Direction is a text label, never a sign. Of $2,768,528,861: oppose $2,462,639,232 (89.0%), support $178,901,560. $1,868,481,242 of anti-REPUBLICAN spending sits in the "Republican Activity" column. A sheet titled Congressional Beneficiary reports money spent AGAINST people as benefiting them. (CU trade PACs specifically have $0 oppose, so the Tester/Kim/Bacon figures and the ~50/50 split are unaffected.)
2. **Farmers Insurance $0.00 x3 cycles is a collector bug, not a real zero.** FEC has 16,432 rows for that employer. `fec_results_ready` (`fec_page.R:158`) accepted `recordsTotal===0` if ANY schedule_a resource entry existed: a 429/500/504 creates one exactly like a 200. 24 variant sets "completed" in 16.4 s vs 8 min for Chubb, minutes after FEC said "exceeded your maximum downloads for the hour". The `records_total_stable` canary compares the payload against itself.
3. **Conduit double-count:** earmarked gifts recorded twice (leg to ActBlue/WinRed + leg to the real recipient). `memo_key` includes `committee_id` so it cannot pair them; FEC's `conduit_committee_id` is null on 460,824/460,824 rows (NOT a field-name bug: FEC just doesn't populate it). Target is recoverable from `receipt_type_full` "EARMARKED FOR X (C00…)".
4. **Candidate <-> Leadership PAC swap in 2023-24 in ALL SIX books** (~$163k; P&C $77,152.77). Recipient List and Spending Overview classify via different paths; the swaps offset exactly, which is why total-level checks passed. (REFUTED later the same day: see the trade-association section, F6 and F8 are one defect.)
5. **70.6% of beneficiary dates corrupted:** `fread` infers FEC MMDDYYYY as integer, stripping leading zeros. No Jan-Sep date survives anywhere.
6. **Partisan Split rests on 2.26% of dollars:** the FEC fallback classifier assigns a category but never a party. Shipped "20% R" = $750 of $403,103.
7. **`registered_conduit` hardcode** routes 38% of CU giving to "Super PAC" (98.6% of that column is ActBlue/WinRed) while the code's own FEC type rule says Carey; actual Super PACs land in Carey. Inverted.
8. **API lane can mark a failed unit permanently complete with 0 rows** (`expected_count` overwritten by what was collected); the progress table then skips it forever. `sort(NULL, method="radix")` hard-crashes 6 single-variant companies on the first 504. Coverage gate never asserts `rows_seen > 0`.

### Fixed and verified this session (11)

Trade-association labeling (0 to 102, $47,297.91); matcher variant subset (6 to 0); identity false splits (8 merged, 0 fragmented); `report.R:1554` unguarded `mentat_input_dir()` (THE crash site, misdiagnosed once as `ingest.R`); destructive override wipe; conduit dedup (-$12,756.91, 1.21%); browser-lane silent zero (8/8 cases); export cache fingerprint (was omitting `report.R` / identity / override CSV, which would have republished pre-fix output as a cache hit); stale build lock.

New helper `mentat_input_dir_or_na()` in `paths.R`: use it on the report path; plain `mentat_input_dir()` throws from any foreign cwd and kills the export.

### My own bugs written and caught by testing (do not skip the test step)

- `key` as a variable name shadows data.table's `by=` resolution and silently corrupts grouping.
- Suppressing evidence FRAGMENTS union-find (only ever ADD edges).
- Merging on name+company alone over-merged HART MATTHEW (Racine WI CNH executive) with a Washington DC government-affairs manager; it now requires a corroborating state/employer/occupation.
- `performance.getEntriesByType` accumulates for page lifetime, so a stale 429 would have hung every later scrape.

### Data state

NOTHING was published. All six shipped workbooks byte-identical to session start (Trade Association still $0); all DBs opened `mode=ro`; 9 files changed, all in git.

## R12 reconciliation, 2026-07-27 (source: `mentat-r12-reconciliation-2026-07-27`, last modified 2026-07-28)

The folder held 12 uncommitted files from an audit batch that crashed `write_reports()` and had reached no workbook. Reconciled, committed, rebuilt: all 6 books rebuilt, Farmers collected ($511k, never a real zero); F6 REOPENED; Telecom blocked by a V8 512 MB string cap; memo double-count still open.

Commits on `codex/mentat-crypto` (ancestor of main, merges clean): `47cf688` R12 reconciliation, `a64fc29` false direction invariant, `dff63b4` zero_verified + G3, `cc0fed3` four-bucket party attribution + Master Overview averages, `f344bc7` zero_verified lane fix + `tools/collect_company.R`. Suite 12/12 throughout.

### Rulings and reversals (binding)

- **Conduit legs COUNT: R8 re-ratified 07-27.** The batch had added a second dedup rule dropping the ActBlue/WinRed leg; reverted. `schema.R` is now a 6-line comment from baseline. Guard G3 (conduit) was deleted: under recipient-as-shown it could only ever fire on correct data.
- ~~F6 is the audit's "~$163k Candidate/Leadership, identical in all six books" = the trade money ($162,458.32)~~ - that claim by the R12 session is **WITHDRAWN**: $162,458 is a sum ACROSS books, per-book-identical would total ~$975k, and trade money is book-specific and **$0.00 in Fintech**. **F6 was REOPENED, not solved.** What IS established: classifier and registers are clean (Candidate 4x-14x Leadership every cycle, zero candidate committees in the leadership lookup), builder is transposition-free, neither changed after those books were built. G6 is the standing detector. (Final resolution, later the same day: F6 and F8 are one defect, the trade-PAC defect below; the $162,458.32 figure does match the national trade PACs measured read-only on the 07-23 snapshots.)

### F3: a shipped regression the audit caught

First attempt made party columns count `Support Activity` (24E/24F) only. Wrong: **24K, 24Z, 24C, 24P, 24R, 24H are all money FOR the candidate** and are the ordinary corporate-PAC case. That stripped **$151.4M** out of party columns (Perdue 2022 Bakkt: $2,995,566 to $0, coverage 100% to 0%), turned `Other / Unclassified` into a **$1.99B/$2.55B opposition dump**, and left two different coverage denominators in one workbook (Sherrod Brown 100.0% vs 0.6%, 3 rows >100%).

**Shipped design = four buckets summing to the total:** Dem/Rep = `Downstream − Oppose` for that party; Oppose gets its own column; Other/Unclassified means genuinely non-D/R; Party Coverage divides by the mixed total on BOTH the summary and focused sheets. Integrity asserts `Downstream − Dem − Rep − Other − Oppose = 0`: a real check (Oppose from R, Downstream from an Excel SUMIFS). Focused sheets subtract opposition via a **Section-guarded** SUMIFS; without the guard every beneficiary row reports CHECK (74 on Crypto).

**Also NOT an invariant:** `Support + Oppose <= Downstream`. FEC correction/refund rows are negative and carry neither direction code, so they pull the unsigned total below the components. 272/2,979 CU rows, all residuals negative, to -$735,710. Don't re-add that assertion.

### Numbers that bite

- **Opposition is NOT $11.6B.** Beneficiary Summary repeats each committee's activity per COMPANY view (~10x), by design ("repeat committee activity for context"). Industry-view only = $4.06B; cross-book de-duplicated = **$1.78B** over 3 cycles, 484 candidate-cycles. And it is **committee activity, not industry money**. Never sum that column across all rows.
- **Trade Association $0 to $129,321.44** across five books, all from `Unclassified`.
- **Farmers Insurance was never a real zero:** 19,289 rows / **$511,399.24** accepted (9,516 / 7,601 / 2,172 by cycle), collected in **140 seconds** via the export lane, not the ~7 h the Chrome page-walk estimate suggested. Six shipped P&C books published it as $0.00.

### New machinery

- `scrape_progress.zero_verified`: a zero must prove itself. Only the **browser** lane stamps 1 (its readiness gate requires DataTables' confirmed-empty row); the **API lane leaves 0** because a double-504 becomes an `unservable_query`, gets decomposed, and can synthesise count=0. Upsert uses `MAX(existing, incoming)` so a later unverified write can't downgrade. Migration does NOT backfill legacy rows to 1. Guard **G3 zero_provenance** reports unverified zeros (warn). Timing cannot substitute: Farmers' poisoned zero ran 0.68 s/set, Bitnomial's real zero 0.65 s.
- **`tools/collect_company.R`**: exposes `collect_crypto()`'s `company_filter`, which the CLI never surfaced. Connect to the DB **file** directly, NOT via `db_connect()` (it takes a data ROOT and will try to mkdir at the path). Always run against a COPY.
- **Master Overview Average row**, every column, every cycle block. Sits BELOW the table and **outside the ListObject**: mandatory, because the finalizer assigns one formula per whole table column, and its reconciliation sums every non-"Industry Total" row and would throw. Writes must also be **outside `if (!deferFormulas)`**: production always sets `MENTAT_DEFER_FORMULAS=1`, so that block is dead code and anything inside ships blank. Blocks now end at row 48 (was 45).

### Still open (as of 2026-07-27/28)

1. **Telecom is BLOCKED by a hard limit**, not data: payload **591,338,574 bytes** vs V8's max string **536,870,888**. Validator (`Test-JsonFile`) and builder both `readFileSync(...,'utf8')`. `-CycleLabel` does NOT help: the exporter ignores `MENTAT_CYCLE_FILTER` (set AFTER the export). Fix = make the EXPORT cycle-aware (~200 MB/cycle) + cycle in the cache key. The merged DB is ready and verified: `tmp/raw-warehouse-source/telecom-reconciled.db`, 988,833 rows = exact union, 10/10 companies. Do NOT re-run the merge; shards a and d are provably redundant.
2. **Live $176,942.05 double-count** in Crypto: memo dedup keys on amount, so a memo leg one cent off its parent is never flagged even when FEC prints the parent transaction id in the memo (Winklevoss to MAGA Inc, `SA11AI.7772`). Within R8 to fix (same committee); moves dollars.
3. P&C `zero_provenance` flags Berkshire/2026, Chubb/2022+2026, Liberty Mutual/2022+2024 as unverified zeros: likely more silent $0.00s; re-collect is ~minutes each.
4. **Nothing promoted.** Rebuilds staged in `reports/r12-regen/`; originals untouched in `reports/`.

Community Banks having no Company PAC money is CORRECT (Paul confirmed). Fintech Trade Association $0 is an honest zero: none of the 12 verified fintech trade PACs appear in its data; FTA has no federal PAC at all. Trap: `CRYPTO INNOVATION` C00804732 is a SUPER PAC, not Crypto Council for Innovation (C00942318). See `ask-before-substantive-changes`, `mentat-full-audit-2026-07-27`.

## Trade-association $0 gap = the "~$163k Candidate swap" (source: `mentat-trade-association-gap-2026-07-27`, SOLVED)

Description line of the source (raw frontmatter): `SOLVED — Mentat \"Trade Association $0\" AND the audit's \"~$163k Candidate swap\" are ONE defect`. Readable form: SOLVED — Mentat "Trade Association $0" AND the audit's "~$163k Candidate swap" are ONE defect: trade PACs are type Q/desig B-U, hit no fallback, stay Unclassified, and Unclassified folds into the Candidate column; fixed by curated CSV + broad-net name resolver.

The `Trade Association` recipient category is assigned **zero times across all six** industry spending workbooks (Credit Union, Community Banks, Credit Arms, Crypto, Fintech, P&C Insurance). Every trade-association dollar sits in `Unclassified`.

**Root cause (the dominant one):** `resolve_registers` in `mentat/R/ingest.R:1118` matches association to PAC by **exact normalized name equality** only (`normalize_register_key`, `ingest.R:43`). PAC names essentially never equal their association's name, so every trade row keeps `committee_id = NA, resolution_status = "unresolved"` (`ingest.R:794`); `trade_match` (`report.R:2226`) is always NA and the Trade Association branch (`report.R:2358`) never fires. `MENTAT_SEQUENCING_v2.md:105` had specified connected-organization/sponsor search (its own example: NAR to RPAC): that was never built.

**Paul was right that America's Credit Unions is on the register** (`inputs/Trade Associations.txt:100`). C00007880 is purely a resolver failure, not a coverage gap: FEC `CONNECTED_ORG_NM` is the legal name "CREDIT UNION NATIONAL ASSOCIATION, INC." while the register carries the post-2024 brand "America's Credit Unions". Do not re-report ACU as a coverage problem.

### Register coverage (Paul was right; the agent over-generalized)

- Audited against the local FEC committee master (`mentat/inputs/fec_committee_master/cm{22,24,26}/cm.txt`, carries ORG_TP + CONNECTED_ORG_NM), verified by eye against all 338 register entries including predecessor names (no PCI/AIA, no AALU/GAMA: those really are absent). The register is **national-by-design** (its "State and local" tail is 22 arbitrary entries, one credit-union league).
- Once state/regional affiliates are set aside as out of scope, coverage by book: **Credit Union 93.1% / Community Banks 85.3% / Crypto 100% / Credit Arms 55.8% / P&C Insurance 10.3%** (all-books 33.7%).
- So **CU-book coverage is fine**: ACU, American Credit Union Mortgage Assn and Ohio CU System are all on it; only NAFCU ($3k, merged into ACU 2024) and IIA ($500) miss. The headline "~28%" first reported was an all-books aggregate dominated entirely by the P&C book: do not repeat it as a general coverage figure.
- Genuine national-level absences, concentrated outside credit unions: American Property Casualty Insurance Assn $138k and National Assn of Insurance & Financial Advisors $123k (both P&C, both first-tier), National Assn of Manufacturers $11.5k (Credit Arms). State/regional absences (in-scope only if Paul wants them): League of Southeastern CUs $66k, Texas Bankers $31k, Carolinas CU League $900.
- Absence verified 5 ways after Paul pushed back hard (do not re-litigate): line accounting 338+19=357 with 0 blanks; the original `Trade Associations.docx` has the same 357 paragraphs and the same zero hits; all 21 disk copies reduce to 2 hashes (the odd one is the same list pre-bulletization); the categories workbook supplies none; positive controls hit 1/1.

### FRAMING CORRECTION

This is NOT a "coverage gap" and calling it one was wrong. The register does not gate collection. All $556,742 of trade-association money is already captured in the workbooks, attributed to the right companies, with downstream paths traced and correctly marked "not attributed" (see any `<Company> View` sheet, Source Committee / Path column). The register only assigns a LABEL. So the register gap changes whether ~$265k of P&C money reads `Trade Association` vs `Unclassified` in one rollup row: a presentation defect. No dollar total, company total, or member ranking is affected. Paul was right.

Caution for any resolver work: FEC `CONNECTED_ORG_NM` is unreliable: NJ Bankers and Louisiana Bankers both list "AMERICAN BANKERS ASSOCIATION PAC" as their connected org. **Do not "just use FEC ORG_TP='T'":** NAR's PAC (the spec's own example) files as ORG_TP='M', not 'T', and 'M' also contains NRA/AIPAC/Dallas Safari Club. Correct design is ORG_TP in {T,M} as a *candidate filter*, register keyed by *committee ID* as the decider.

### This is ALSO the audit's "~$163k CANDIDATE SWAP": one defect, not two

**F6 and F8 are the same bug. There is no Candidate <-> Leadership swap.** A trade PAC is `committee_type='Q'` with `designation='B'`/`'U'`, which matches NO fallback rule in `spending_recipient_classification` (not H/S/P or A/P to Candidate, not D to Leadership, not X/Y/Z to Party), so it keeps the DEFAULT `Unclassified`, and `Unclassified` folds into the **Candidate** Stats column (`spending_stats_category_groups`). So unresolved trade money silently inflates **Candidate**.

Measured read-only on the 07-23 snapshots: NRA, NAB, NAR, ABA BankPAC, NAHB BUILDPAC, Consumer Bankers, AFSA, USTelecom, AEM, NSSGA = **$162,458.32**, ~ the audited "~$163k", identical across books because they are the same NATIONAL PACs in every industry. Fixing the register moves it: Candidate down ~$163k, Trade Association up ~$163k.

**Do NOT re-hunt F6 as a swap.** A faithful classifier re-implementation found Candidate/Leadership perfectly consistent (Candidate exceeds Leadership 4x-14x every cycle; zero candidate committees in the leadership lookup), and the workbook builder is provably transposition-free (every category cell is a literal-string SUMIFS; Master Overview headers and formulas iterate the same array in lockstep).

### FIX SHIPPED 2026-07-27 (R12), two layers, curated first

Both on `report.R`'s read-time path: the exporter opens the DB `SQLITE_RO` and never calls the ingest resolver.
1. `inputs/trade_committee_overrides.csv`: 102 curated rows (auto-generated `source=auto:exact_token_set`, names verified against the register).
2. `trade_resolve_broad_net()` in `R/report.R`: Paul's **broad net**: match the association's full normalized name ANYWHERE inside the committee name after stripping trailing committee suffixes (PAC / POLITICAL ACTION COMMITTEE / FUND...). Guards: names <10 chars are never netted (acronym collisions); >1 matching `committee_id` is left unresolved, never guessed. Full-name (not acronym) matching is what keeps American Bankers Assn and American Bar Assn apart. Beyond the CSV it adds AMA to AMA PAC and American Pharmacists to APhA PAC, with 0 false positives.

**STALE: the earlier ingest-side override step was DELETED in R12.** It referenced `trade_overrides` / `trade_override_applied`, neither ever assigned, and hard-crashed `write_reports()` on all three callers with `object 'trade_overrides' not found`. Do not restore it; `report.R` is the single implementation. Workbooks still showed $0 until a regen (not run: Paul's call).

### Coverage audit 2026-07-27: SETTLED, do not re-litigate

- Each shipped workbook declares its source DB SHA in a header note. All six located and hash-matched (they are NOT in `%TEMP%\mentat-build`, which is a different, older 07-21 build; `%LOCALAPPDATA%\Mentat` does not exist at that time): CU + Community Banks + Fintech to `mentat/.cache/industry-report-runs/<ts>/...`; P&C + Credit Arms to `Mentat/tmp/live-snapshots/`; Crypto to `Mentat/.tmp/mentat_r13_final_*`. **Always resolve the declared SHA before comparing a workbook to any DB.**
- PROVEN (rule-independent): the P&C workbook publishes 6 company-cycle cells as $0.00 for which its own source DB holds ZERO rows of any status: Farmers Insurance x3 cycles (absent from that DB entirely; it has 9 companies, not 10), Liberty Mutual 21-22, Berkshire 25-26, Chubb 25-26. The 07-21 build has 48,441 rows / $3.46M (any status) for those same cells. Nothing in the workbook distinguishes "never collected" from "gave nothing".
- VERIFIED CLEAN: cross-sheet reconciliation exact to the cent 54/54; Cycle Exceptions 100% legitimate pre-2021 with $0 leaked; all Integrity/Logic cells OK; Credit Union's `review` pile is CORRECT rejection (SECU+"RITAS"=SECURITAS, SECU+"RITIES..."=SIFMA, MACU+"CH STEEL"); Crypto's 4 "missing" companies are internal-name differences (BINANCE US / Coinlist / Foris Dax Inc / Tzero), NOT a gap.
- **WITHDRAWN: asserted and did not survive:** "$2,484,046 published as $0" (computed against the wrong DB); "the workbook was built from a run logged as failed" (later runs exist; `started` rows with end=NULL are not proof); per-cell dollar deltas vs a `company_match_status='accepted'` filter (that filter is NOT the export rule: the workbook shows MORE than it for Chubb/Binance, so the reconstruction is wrong); the agent's `scrape_progress records_total=0` evidence (State Farm/Allstate/USAA have many 0 rows too: they are per-variant_set checkpoints, not failure signals).
- **UNPROVEN, not to be repeated as fact:** that `observed_employers` / `bulk_candidates` being 0 in every build DB cost any measurable coverage (the bulk superset `indiv%02d_crypto_superset.psv` genuinely does not exist on the box, but no impact was demonstrated). Confirmed in code but impact unquantified: `collect.R:1442` passes the phase variant subset to `flatten_fec_rows` while `fec_api.R:1670` passes the full roster (browser lane only).
- **METHOD LESSON:** verify which artifact is authoritative BEFORE comparing, and do not report a finding until the comparison basis is proven. Three claims here were retracted for exactly that failure. See `ask-before-substantive-changes`.

## Related Topics

- [[mentat-fec-pipeline-history-audit-r12]] — History of the six-agent audit of 2026-07-27, the trade-association $0 fix and the R12 reconciliation, as recorded on the Mentat FEC pipeline.
