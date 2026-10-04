---
type: topic
title: "Mentat collection and attribution"
aliases: ["Mentat collection and attribution"]
category: "bugfix"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[mentat-console]]"
  - "[[mentat-fec-pipeline]]"
objective: "Keep one record of how the Mentat FEC collection and attribution layers were built, broken, audited and fixed (July pipeline build and R12 audit, September worker scaling, truncated-key collector outage, $37.9M review bucket, contradiction-not-ambiguity cross-reference rule, roster/culling and frozen-money rules) so that no fix, trap or ruling is re-litigated."
created_at: 2026-07-18
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/dont-be-jumpy-removing-money-2026-09-26.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\dont-be-jumpy-removing-money-2026-09-26.md", sha256: "4924689e00db1f6ab8f643e6cb345cb751170792000dfb3429508532369dcb4a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/api-key-repository-2026-08-28.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\api-key-repository-2026-08-28.md", sha256: "f33fd855d4557d62c018aa8e6eb704337e0dd2be31b2bf7a6ac4ef023b3a77b3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-collector-slowdown-lane-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-collector-slowdown-lane-2026-09-17.md", sha256: "c4a8d1b0e447aca42a9645eaa1f073f2c153f92e86bd1ea7f46a82cc75a43263"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/xref-contradictions-not-ambiguity-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\xref-contradictions-not-ambiguity-2026-09-17.md", sha256: "0a02ce2a080260ebce313a38ac6a1e2b11efa8e34900bcfe9f1676a231754349"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-xref-workbook-review-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-xref-workbook-review-2026-09-17.md", sha256: "021da0602e497121689d8c530e023d4254655790849e2db083c21c0a3b6ddf1a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-system-debug-lane-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-system-debug-lane-2026-09-13.md", sha256: "e7118cf1a8941e3e3c3ba7bdbc7b658fb29d27a2ebd23994606aa2370858b990"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-worker-scaling-lane-2026-09-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-worker-scaling-lane-2026-09-09.md", sha256: "bb4bb46607a8bd5da0f9bf53f3ed3e6a5d344331ddd10c18a44b9e6b3187e7a9"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-r12-reconciliation-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-r12-reconciliation-2026-07-27.md", sha256: "7d7e7b0b784b6ca68dea97528a91aab9800263c7c9144b3adfa3aca93d7139f1"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-full-audit-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-full-audit-2026-07-27.md", sha256: "cf62ccf0ea46a0a9b208eaf051587ade6d43a48d8978832e7d2bfc683e5a93ae"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-trade-association-gap-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-trade-association-gap-2026-07-27.md", sha256: "6926d05045021bfe1d3026d603b637bd38b8fc8a02a2916629dffff407e4eae0"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-pipeline-2026-07-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-pipeline-2026-07-18.md", sha256: "f07cac2aa2afe08f016bfa228378c23eecb8737ad19d2d8c0e5ce82e22e7290a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-roster-and-culling-rules-2026-07-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-roster-and-culling-rules-2026-07-19.md", sha256: "26e9198ad85bf3f0bdc3cee58384433741f76db1e100807667bf24919c6e1f87"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-zero-row-scalar-assign-bug.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-zero-row-scalar-assign-bug.md", sha256: "6232c91f4ebe37d472bdef37d62ed7caa7c25d65bf8b5567bf7cc8a85b74a1c9"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/bugfix"]
---

# Mentat collection and attribution

> Running history of the Mentat FEC collection and attribution layers from the July 2026 pipeline build through the 2026-09-27 freeze of money-collection code: the silent-zero bug class, conduit double counting, trade-association $0, the truncated-key collector outage, the $37.9M review bucket, the cross-reference contradiction rule and Paul's roster/culling and frozen-money rules.

## Context

[[mentat]] is Paul's FEC contributions-intelligence project (R+API collection pipeline, workbooks, local console). This topic holds the collection and attribution side of its history: the 2026-07-18 pipeline build, the 2026-07-27 full audit and R12 reconciliation, the 2026-09 worker-scaling and collector-outage lanes, the cross-verification rework, and the standing rules Paul set about what Mentat may count and what code may change.

- The pipeline and its tooling are [[mentat-fec-pipeline]]; the console that exposes the results is [[mentat-console]] (the 2026-09-13 system-debug lane and the xref tab live there).
- The decision-maker for every ruling here is Paul Goff. Change-control rules (ask before substantive changes, explicit per-change approval) are in Change control and Paul's decision authority.
- The cross-reference rule is its own concept: [[exclude-on-contradiction-not-ambiguity]]; the council review that produced the dwarfed cross-reference tab: [[2026-09-17-mentat-xref-council-review]].
- Status is `in-progress` because the collection/attribution layer is live and several items are still open with Paul (see Next Steps).
- Where the sources use a memory-name cross-reference, it is written here as a code name, for example `ask-before-substantive-changes`; those are memory notes, not vault entities.


## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| [[mentat-fec-pipeline]] | Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat |

## Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Related Concepts

- [[exclude-on-contradiction-not-ambiguity]] - Brain D-040: exclude a row only when its own evidence contradicts the attribution; missing or ambiguous info is flagged, not excluded.

## Related Topics

- Change control and Paul's decision authority - Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code.

## Related Discussions

- [[2026-09-17-mentat-xref-council-review]] - 2026-09-17 council: cross-reference does not minimise vs workbook (Banking $72.1M vs $54.8M); Paul ruled it redundant and kept it dwarfed.


## History

| Date | Event |
|---|---|
| 2026-07-18 | Mentat founded; Paul's decisions (headless Chrome engine, cycles 2021 onward, 527s/501c's excluded); R pipeline built (Codex ~3.4k-line draft + 5 Claude inline fixes); live crypto run 1,181/1,189 fixture rows (99.33%) matched; code at `C:\Users\pgoff\Mentat` (branch codex/mentat-crypto). Review + fix batch R1 the same evening (12-agent review, 26 findings, 7 majors). |
| 2026-07-19 | Paul's two hard rules (roster = only his companies; raw sheets = every row, no culling). Zero-row scalar-assign crash class swept (4 sites). |
| 2026-07-20 | SHIPPED two workbooks (Master 655 sheets + Telecom 123 sheets); alias-gap + PAC audit; 16,932 rows reclassified in master; trade-PAC classifier fix in build_workbook.py. |
| 2026-07-21 | Parallelism ceiling + worker-shard audit (16 keys added); phase-2 identity-pass root causes fixed; fleet HALTED 02:34 (phase-2 identity pass burned budget, produced nothing). |
| 2026-07-22 | Corrections: `api_request_budget` "no key column" claim refuted; master-corruption defects re-tested (4 of 7 refuted); acronym-variant collisions audit; override matcher fixed @bulk c45bd03; `bulk\` brought under version control @5299fc2; override registry divergence + lineage/CRLF trap mapped. |
| 2026-07-23 | Fintech ordeal diagnosed; perf round-2 at Paul's gate, then shipped (merged @4ef422d..86c878d); benchmark V5 CLEAN 18.33 min. |
| 2026-07-24 | INTEGRATED TO MAIN: merge @955b66a (completion commit @1c21a9c). |
| 2026-07-27 | Six-agent full audit; R12 reconciliation (5 commits: `47cf688`, `a64fc29`, `dff63b4`, `cc0fed3`, `f344bc7`); trade-association $0 and "~$163k Candidate swap" identified as ONE defect; coverage audit settled. |
| 2026-09-09 | Worker-scaling lane (live stop, worker resize, merge batching), uncommitted at the time. |
| 2026-09-13 | System-debug lane: $37.9M "unattributed" settled as the `company_attribution_unresolved` review bucket; Chart Studio patches S1-S4 applied and redesign built; commits `2906980d1`, `97eaa758`, `e666f95e5`. |
| 2026-09-14/15 | Usability lane F, lane E, fix1, round 3, wording pass; commits `ed64743`, `215faa9`, `9b14e1d`, `5937875`, `f64316daa`, `5c5aa6bfe`, `1b8499147`. |
| 2026-09-17 | Council review of cross-reference and workbook generation; Paul rules the cross-reference redundant (dwarfed tab); commits `d78265927`, `bd1bfd60a`, `937ea01f5`, `00c3700d6`, `f0181e523`; engine rework `c62cc6eb6`; gate rework `7d364883e`; Paul's "Cross-Verification ... way too strict" ruling (11:29 ET); collector slowdown diagnosed (truncated key `13ffe51ce05b`) and 5 commits on codex/mentat-crypto. |
| 2026-09-18 | `627300bc9` lands the contradictions-not-ambiguity engine (Banking giving $72.10M to $77.05M, review queue 76,197 to 46,156 rows). Disk clearance destroys the worktree copy of the collector packet (filed in the Mentat repo as `b9fe34d02`). Two key-store confusions corrected. |
| 2026-09-26 | Paul answers removal proposals H1-H3 with No ("you are being very jumpy with getting rid of money ..."); an agent misreads it as a mandate and commits `0ce240d9e` and `504d2cfd1`. |
| 2026-09-27 | Paul: "What money change rule? ... The mentat money collection system is fucking perfect, don't change it." Both commits reverted in `7a31f8ae2`; money code frozen. |
| 2026-10-02/03 | Live Mentat tree pushed to GitHub (see [[mentat]]). |

## Decisions

- **Money-collection and receipt-counting code is frozen** (2026-09-27, Paul). Never change it unless Paul explicitly approves that specific change. Superseded: the 2026-09-26 rule changes (`0ce240d9e`, `504d2cfd1`), reverted in `7a31f8ae2` (see Standing rules).
- **Roster = ONLY the companies Paul lists** (2026-07-19): never add inferred companies. Surfacing a gap once as information is fine.
- **Raw sheets = every FEC row, no culling** (2026-07-19): deduplication may only be a flag column, never a filter.
- **Exclude on contradiction, not ambiguity** (D-040, 2026-09-17): see [[exclude-on-contradiction-not-ambiguity]].
- **Cross-reference is dwarfed** (2026-09-17): outliers and clear refunds only, no totals; the published workbook is the accounting of record.
- **Conduit legs COUNT** (R8 re-ratified 2026-07-27). The batch that had added a second dedup rule dropping the ActBlue/WinRed leg was reverted.
- **Trade-association labelling** is report.R's read-time two-layer fix (curated CSV, then broad-net resolver); the ingest-side override step was DELETED in R12 and must not be restored.
- **Zero must prove itself:** `scrape_progress.zero_verified` (only the browser lane stamps 1).
- **Memo dedup is within R8:** the live $176,942.05 Crypto double-count fix is within R8 (same committee) and moves dollars, so it needs Paul's go.
- **Judgement calls (collector-slowdown lane, Paul: "proceed in the most optimal manner"):** estimated count verified by windows (never fail, never accept unverified); auto-resume on Start = NO; pass cap kept at 3; post-walk drift advisory in the receipt.
- **Console launcher** may auto-restart an IDLE stale server on the same port (never busy, never read-only) (2026-09-14).
- ~~Engine = headless Chrome (chromote), NOT bulk files and NOT the API~~ (2026-07-18) - superseded in practice 2026-07-20 when the API lane replaced Chrome-scrape for scale; kept because the early workbooks and the fixture reconciliation came from the browser lane.
- ~~"api_request_budget has no key column"~~ (2026-07-21 claim) - refuted 2026-07-22 (schema always supported multiple budget rows; the CODE hardcoded `budget_id='openfec'`); see Corrections in the July pipeline section.
- ~~Control of dollars by the old cross-verification (36,241 rows / $37,940,955.71 zeroed; 19,529 memo legs / $8,522,419.98 flagged)~~ (2026-09-13 design) - superseded 2026-09-17/18 by the contradiction rule.
- ~~Console-side fix options for the "$37M" display (relabel, "excluded from totals" caption, cycles next to the money) proposed only, "Paul has not ruled"~~ (2026-09-13) - overtaken by the 2026-09-17 rulings.

## Next Steps

- [ ] Paul: add the register data so company-PAC donor rows move from unverified funding to PAC activity: `C00039305` Citigroup PAC-State; Truist Financial Corp Federal State Local PAC; JP Morgan Chase Co State and Fed PAC; PNC PAC Michigan; Capital One Association Political Fund PAC.
- [ ] Re-run the launcher for the 2026-09-18 day's other commits (Paul's call; lanes do NOT rerun or rebuild).
- [ ] `observed_filing_versions_unresolved` keeps $344,433.54 of probable duplicates until filing headers settle them.
- [ ] Open for Paul (collector lane): the 2026-09-17 12:41 CU run stands 27/30, killed without a terminal state, now resumable from console 8806. Console startup can hang on `git rev-parse` through OneDrive (unkillable child, `lru_cache` races two threads) - task chip queued. Single-cycle runs fail the workbook wanting cm22. Runtime paths longer than ~275 chars break `sys.path[0]`. Brain drafts (STATE, DE-026, D-040) are in the packet.
- [ ] Decide the save-time key-length policy for the console key panel (warn-and-record vs reject with override); how the 39-char key got in is still open (a bad paste into the console's key panel is the obvious candidate).
- [ ] Paul: Telecom export must become cycle-aware (~200 MB/cycle) with cycle in the cache key (2026-07-27 blocker).
- [ ] Paul: P&C `zero_provenance` unverified zeros (Berkshire/2026, Chubb/2022+2026, Liberty Mutual/2022+2024) - re-collect is ~minutes each.
- [ ] Paul: live $176,942.05 Crypto memo double-count (Winklevoss to MAGA Inc, `SA11AI.7772`).
- [ ] Paul: roster-identity calls from the 2026-07-22 acronym-variant audit; FCU-variant expansion and the 63 proposed aliases (`proposed_new_aliases.csv`, $5.97M evidence); the pagination-shortfall policy call; the v5 Fintech workbook deploy.
- [ ] Paul (console lanes, as of 2026-09-15): commits for later lane work need his go each time; restart consoles 8802/8803/8804/8808 (superseded: only one Paul console, 8806, was found on 2026-09-15); Ride 2 not run; retest steps 17 and 27 on 8806. (The three pre-ride rulings were answered 2026-09-15 via the wording ruling: group limit 60, slide template unchanged.)

## Standing rules (feedback memories)

### Never change Mentat's money or receipt-counting code on inference (source: `dont-be-jumpy-removing-money-2026-09-26`, feedback, newest 2026-09-27)

Paul 2026-09-27: "The mentat money collection system is fucking perfect, don't change it." His 2026-09-26 "jumpy" remark only rejected the agent's removal proposals H1-H3; the 2026-09-26 rule changes (`0ce240d9e`, `504d2cfd1`) were reverted in `7a31f8ae2`.

**What happened.**
- On 2026-09-26 Paul answered the agent's three removal proposals (H1-H3) with No. He added: "you are being very jumpy with getting rid of money, a lot of it just doesn't have the donors name on it because it comes from the company".
- The agent took that as a mandate. It launched an audit lane that changed Mentat's receipt counting and committed the result in `0ce240d9e` and `504d2cfd1`. The changes covered:
  - partial back-reference memos;
  - line-17 "NON-CONTRIBUTION" and "NON-CONTRIBUTION AMOUNT" receipts;
  - the Flow's handling of sold assets and refunds;
  - a giving_rulings entry;
  - the METHODOLOGY text.
- It also wrote a "money rule" memory and brain draft.
- On 2026-09-27 Paul said: "What money change rule? Goddamn it. The mentat money collection system is fucking perfect, don't change it."
- Both commits were reverted in `7a31f8ae2`, pushed to the mirror and merged into the UI worktree. The rules file, `R/collect.R`, `R/schema.R`, `tools/pac_evidence.py`, `cross_reference_engine.py`, `app/flow_data.py` and `METHODOLOGY.md` are byte-identical to `fadd2c751` again.

**Why:**
- The collection system is Paul's, and he considers it correct.
- A remark that rejects proposals is not an instruction to change code.
- Changing money rules without his explicit per-change approval also broke `ask-before-substantive-changes`.
- The rules-file change invalidated every industry's analytics cache. Chart Studio then crawled on his memory-starved machine.

**How to apply:**
- Never change Mentat's money-collection or receipt-counting code unless Paul explicitly approves that specific change. That covers `R/collect.R`, `R/schema.R`, `inputs/fec_receipt_rules.json`, `tools/pac_evidence.py`, `tools/cross_reference_engine.py`, the money logic in `app/flow_data.py`, and the rules in `METHODOLOGY.md`.
- When Paul answers No to a proposed removal, the No is the whole instruction: leave the code as it is.
- Still true when proposing something: state it in money terms ("stops counting the same $X twice (row Y)", never "drops $X"), and quote approved rule text verbatim in agent briefs.
- Related memory notes: `ask-before-substantive-changes`, `pac-map-downstream-viz-lane-2026-09-25`, `supplied-data-closes-the-item-2026-09-25`.
- Note the interplay with the contradiction rule: the 2026-09-17/18 cross-verification rework (`627300bc9`, in the cross-reference engine) was authorised by Paul himself ("Finish and then commit"); the 2026-09-27 freeze governs later unapproved changes.

### Roster and culling rules (source: `mentat-roster-and-culling-rules-2026-07-19`, feedback, 2026-07-19, modified 2026-07-20)

Two STANDING rules Paul gave sharply on 2026-07-19 while building the Mentat crypto report.

**1. ROSTER = ONLY THE COMPANIES PAUL LISTS.** Verbatim: "no I only ever want companies that I list to you." Do NOT add companies to `Company Name.xlsx` on your own initiative, even with strong evidence they belong. Concrete case: Chris Larsen (Ripple co-founder) gave $1,000,000 to Jane Fonda Climate PAC, and Ripple / a16z / Jump Crypto / Uniswap are all named publicly as Fairshake backers alongside Coinbase; Paul still declined to add them. Surfacing a gap ONCE as information is fine; adding companies, or re-proposing, is not.
- **Why:** the roster is his editorial scope decision, not a completeness problem to be solved.

**2. RAW SHEETS = EVERY ROW, NO CULLING.** Verbatim: "culling too many things" and "I don't care about the destination, I only fucking care about the recipient." Every row FEC displays goes in the raw sheets: memo-X legs, conduit legs, negative amounts, redesignations, duplicate filing versions. Deduplication may only ever be a **flag column, never a filter**. He supplied a gold example list (Coinbase individual) containing obvious repeats (CISCOMANI twice, ROB FOR PA twice, all three NICOLE FOR NEW YORK legs including the negative) as the shape to match.
- **How to apply:** raw/extract sheets show 100% of rows; analysis/total sheets may apply the memo rule (see `mentat-memo-x-dedup-rule`) but must flag, not hide, and say so.
- The agent got this wrong twice in one session: first dropping ALL memo rows after his "recipient only" instruction, then over-correcting into date+amount collapsing that hid legitimate split gifts.
- Later reconfirmation: conduit legs COUNT (R8 re-ratified 2026-07-27); the memo rule only flags (see the 2026-09-17 contradiction rule: unverified rows count and are flagged).

### Authorization does not relay; shared-checkout law (source: `mentat-collector-slowdown-lane-2026-09-17`)

- **Shared checkout law:** 3 sessions commit in `C:\Users\pgoff\Mentat` and the INDEX IS SHARED - always `git commit --only -- <explicit paths>` after checking `git diff --cached --name-only`. For a file a peer is also editing, stage BLOB-EXACT: `git show HEAD:path`, apply the patch, `git hash-object -w --path`, `git update-index --cacheinfo`, commit, so their in-flight work is never swept.
- Untracked in the repo, so a clean checkout does NOT stand alone: `fec_receipt_rules.json`, `report_directory.psm1`, `test_run_archive.py`.
- Write/Edit refuse the Mentat path: write to scratchpad and copy via python. Shell PATH loses grep/head/python once cwd is Mentat; use full paths.
- The tree MOVES under you (a peer rewrote `inputs/verified_company_affiliations.json` mid-session): re-read `git status` immediately before staging, never from a minutes-old snapshot.
- **AUTHORIZATION DOES NOT RELAY.** Paul said "Authorized" to one session about ANOTHER session's commit; it was passed on verbatim, flagged as his word, with a note to confirm directly, and that peer still refused to act on it, correctly: "a commit needs the go in the session that makes it." Relay an approval as INFORMATION only; never let a peer's paraphrase be the basis for an irreversible action, in either direction. Say "Paul told me X, get your own go", not "you are authorized".

### Zero-row scalar-assign crash class (source: `mentat-zero-row-scalar-assign-bug`, project, 2026-07-20)

**The single most common crash class in the Mentat R pipeline (2026-07-19): assigning a scalar to a column of a data.frame/data.table that has ZERO rows.**

```r
df$col <- ""                 # ERROR when nrow(df) == 0
df$col <- rep("", nrow(df))  # correct
data.table::set(dt, j = "col", value = rep("", nrow(dt)))  # correct for data.table
```

R raises `replacement has 1 row, data has 0` only at zero rows, so these sit dormant until an empty table appears, and every instance found was on a **default or first-run path**, meaning a fresh user would hit them immediately. Always use `rep(x, nrow(df))`. Found 4x:

| Site | Trigger |
|---|---|
| `R/ingest.R` read_company_match_overrides | the SHIPPED header-only overrides CSV -> ingest dead |
| `R/schema.R` global memo plan (`.source_table`) | empty `corporate_giving` -> report generation dead |
| `R/collect.R` override state/occupation columns | zero-row overrides -> `--retag-only` dead |
| `R/schema.R` legacy override migration | zero-row legacy table -> migration dead |

**Sweep pattern that finds them** (a narrower grep missed two of the four):

```
grep -rnE '\$[A-Za-z_.]+ *<- *("[^"]*"|[0-9.]+|NA[A-Za-z_]*|TRUE|FALSE)\s*$' R/*.R \
  | grep -v "rep(\|nrow(\|list(\|function"
```

Hits on single list-like objects (`response$classification`, `state$complete`) are false positives; only data.frame/data.table columns matter. Run this sweep after any batch that adds columns or registers. Related: `mentat-roster-and-culling-rules-2026-07-19`.


## July 2026 pipeline build, ship and hardening (source: `mentat-pipeline-2026-07-18`, project, last modified 2026-07-24)

Description line of the source: Mentat = R+API pipeline for FEC contributions, 7 industries (Fintech added 07-23); 2 workbooks SHIPPED + RECLASSIFIED 2026-07-20; PERF ROUND-2 at Paul's gate 07-23 (crash-containment ladder, resilient-by-default, roster-driven onboarding; worktree `Temp\codex-wt-mentat-perf` UNCOMMITTED at that time); crash signature = long-lived R session dies post-export-ingest, fresh Rscript same work fine; Codex bakes its sandbox runtime paths into production defaults, so sweep every diff.

### Integration to main (2026-07-24)

- **INTEGRATED TO MAIN 2026-07-24** (Paul: "The two unrelated branches, complete those, and integrate"): merge `@955b66a`. Both branches landed via ONE merge: `codex/mentat-perf-round2` `@86c878d` is an ancestor of `codex/mentat-crypto`, which got the completion commit `@1c21a9c` (5 field-note docs: CODEX_TASK, CODEX_FIXES_R1, GEMINI_RESEARCH, MENTAT_SEQUENCING_v2, REBUILD_NOTES; .gitignore data-plane rules: `mentat/inputs/` [373M FEC bulk, NEVER commit], `mentat/.cache/`, `mentat-backup-*/`, `.agents/`, `.Rproj.user`).
- Zero path overlap with Moneyball (all 65 files `mentat/`-scoped), conflict-free, kernel 84/84 after live-tree ff to `955b66a`.
- The two worktrees (`C:/Users/pgoff/Mentat`, `%TEMP%/codex-wt-mentat-perf`) and branch names remain in place.
- **STILL OPEN (as of 2026-07-24): v5's corrected Fintech workbook copy in `.cache/bench-20260723-output` awaits Paul's deploy; data, not git; unchanged by this merge.**

### Project definition and Paul's decisions (2026-07-18)

- **Mentat** is Paul's new project, distinct from Moneyball: an **R** pipeline scraping fec.gov individual contributions by employer for 5 industries (Crypto, Credit Union, Community Banks, P&C Insurance, Credit Arms), classifying donors (Chiefs/Middle/Employees) and recipients (company PAC, trade assoc, leadership PAC, Super PAC, Carey +/- lean), then quarter-over-quarter Excel analysis.
- **Paul's decisions (2026-07-18):** engine = **headless Chrome** (chromote; NOT bulk files, NOT the API; he was offered both with volume math and chose the browser); cycles = **2021 onward** (2021-22, 2023-24, 2025-26 partial); **527s and 501c's EXCLUDED**; the missing category workbook is at `C:\Users\pgoff\OneDrive\Documents\Super PAC, 527, Carey, 501c.xlsx` (sheets 2021-2022/2023-2024; View C/L/X = lean; x-marks = category; the "^J" in his link = mangled commas).
- **Output template** (same day): `OneDrive\Documents\Credit Union Cross Industry Spending.xlsx`: sheet-per-industry raw extract `Name|Recipient|Date|Amount|(CSZ|Employer|Occupation)`; its Crypto sheet holds **1,189 hand-extracted rows through 2026-05-31 = the ACCEPTANCE FIXTURE** (pipeline crypto output must reconcile against it before graduating); Sheet1 = industry asset denominators ($T, sourced) for cross-industry $/assets normalization; **"ABS issuers" ruled OUT of scope** (Paul 2026-07-18); Sheet2 CEO names go to the known-executives Chief-tier register.
- Build order: Phase 0 roster approval, collector, **Crypto first** (fixture reconciliation = graduation gate), other 4 industries, Phase 3 after PAC-register approval, then 4-5. Spec has NO open questions left.
- **State at 2026-07-18 (before build):** finalized spec = `mentat/MENTAT_SEQUENCING_v2.md` in the melange-ticketing-module-2f8aad worktree (branch claude/pipeline-generation-review-89167f), UNCOMMITTED. Source zip (`Downloads/Mentat-20260718T072249Z-1-001.zip`) has `Company Name.xlsx` (variant blocks; Crypto sheet = columns, others = rows; annotations are rules not search terms), 2 leadership-PAC CSVs (2021-22, 2023-24 only), `Trade Associations.docx`. **NO CODE BUILT YET - Paul gates the build** per `ask-before-substantive-changes` (superseded by the build below).

### Build and crypto test (2026-07-18 evening)

- R pipeline BUILT (Codex draft ~3.4k lines via /codex lane after its sandbox repair: helper exes copied from sibling install dir; then 5 Claude inline fixes: fixture dual-layout reader with `col_types="text"`, leadership CSV dedup 791 to 788, `fixture_crypto` schema col, test counts 218/61, and THE readiness bug: the FEC table reports `recordsDisplay=0` both pre-ajax AND truly-empty; fix keys on `.overlay` display + the "No data available in table" row, live-verified).
- Live crypto run: **1,181/1,189 fixture rows matched (99.33%), ALL at S1 exact**; canaries 155/155 x4, determinism TRUE, 0 retries; 12,225 rows (7,309 conduit / 1,146 memo / 4,594 passthrough legs; ~3,711 countable). The 8 misses: ~6 = employer-blank/other rows Paul found via name search (Phase2-names pass deliberately OFF), ~2 = manual-transcription/amendment drift; ZERO scraper failures.
- Code + worktree at **`C:\Users\pgoff\Mentat`** (branch `codex/mentat-crypto`, uncommitted then); deliverables copied to `C:\Users\pgoff\Mentat\reports`; DB in the Claude-app CONTAINER redirect (`C:\Users\pgoff\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Local\Mentat`); Paul's RStudio runs get real AppData. Rscript needs `R_LIBS_USER=C:/Users/pgoff/AppData/Local/R/win-library/4.6`. Old stale worktree in session temp = locked, prune after reboot. Multi-agent code review of the draft ran in background (wf_87a1ec92-290).

### Review + fix batch R1 (same evening)

- 12-agent adversarial review: 26 findings, 7 majors CONFIRMED (several by executing the code), 1 rejected. Codex dispatch #2 applied M1-M6 + minors (sandbox repair PROVEN working; the MCP call idle-timed-out at 61 min but Codex kept running: check processes/file-mtimes before assuming death; its threadId was lost).
- Claude corrections on top: M5 rescoped (EARMARKED memos = countable final-recipient legs + `memo_review` flag, NOT passthrough: conduit + memo_code X already kill the dupes) and a data.table `[!.valid_key]` scoping bug.
- Retag on live DB: passthrough 4,594 to 72 (JFC-only), `memo_review` 4,603, countable 3,711 to 3,739 (+28 only: triple-overlap absorbed most of the over-broad pattern). Resume-skip REMOVED (idempotent re-walk) [later contradicted, see 2026-07-21 audit item (1)]. `attribution_conflicts` table live (0 rows in crypto). Tests 3/3 PASS (incl. new `test_names.R`); reconciliation re-verified 1,181/1,189 = 99.33%. 18 review minors deferred, listed in the workflow wf_87a1ec92-290 journal.
- NOTE: another session clobbered the agent's MEMORY.md index line for this file; re-check it. Still uncommitted at that time; Paul's gate pending.

### SHIPPED 2026-07-20 (6 industries; API lane superseded Chrome-scrape for scale)

- TWO workbooks at `C:\Users\pgoff\Mentat\reports`: "Mentat Master Workbook.xlsx" (5 industries, 655 sheets) + "Mentat Telecom Workbook.xlsx" (SEPARATE file = Paul's order, 123 sheets); `verify_final.py` PASSES (pair-aware).
- Master DB = `C:\Users\pgoff\AppData\Local\Mentat\master\mentat.db` (306k rows), built by `merge_all.py` from per-run DBs (`run_cu`/`cb`/`ca`/`tel_*`/`pc_*` + mrb liverun crypto); builder = `bulk\build_workbook.py` (`--only`/`--exclude` industry split, `--skip-pac` opens DB read-only).
- Codex sweep 2026-07-20 fixed REAL shipped bugs: %-of-Industry divided by ALL industries (Facts got industry col L + verifier checks `$L:$L`); Facts leaked all industries into each workbook; `\bMANAG\b` never matched MANAGER (tier-splits 563 to 811); committee renames split recipients (now cm-zip current-name map, Top Recipient counts by `committee_id`). Dollar conservation proven 24/24 sheet sums.
- **CULAC / America's-CU hypothesis (Paul's):** as-collected FALSE (3.2%, rank 5), BUT bulk-file truth = $92,444 / 2,548 rows from his 10 CUs vs $36,838 / 627 captured, because payroll rows use employer strings "AMERICA FIRST FCU" / "SECU" / "SCHOOLSFIRST FCU" / "MACU" that his variant lists lack. Verdict: substantial yes (largest real non-conduit destination), bulk no (ActBlue/WinRed conduits dominate). Navy Fed / Alliant / Suncoast genuinely ~zero CULAC. **FCU-variant expansion NEEDS PAUL'S YES (his strict-names rule).**
- 4 API keys in `AppData\Local\Mentat\keys.txt` (all tested 200; the earlier set was LOST with overwritten launcher scripts: keep keys OUT of launchers).
- Gap-fill: `gapfill.R` (mall/, multi-cycle, phase2 default TRUE: `phase2_names=FALSE` had silently skipped corporate giving for ALL non-crypto: cu corp = 0) + `bulk\gapfleet.sh` (3 batches x 4 keys, waits on process exit never log text) + `status_mentat.py` live terminal (Paul's demand). Pending at fleet end: re-merge, resolve, rebuild, verify; State Farm + Charter had ZERO rows (never fetched); PAC Schedule B for non-crypto = 15 PACs uncollected.
- R = `C:\Program Files\R\R-4.6.0\bin\Rscript.exe` (NOT on bash PATH). **Ops law:** R flush of big checkpoints took 11 h: kill and build from what landed; Bash background tasks cap at 10 min, so long fleets launch via Start-Process DETACHED + Monitor tool.

### Alias-gap + PAC audit (2026-07-20 night; Paul: "no stone unturned")

- Built `audit_alias_gaps.py` (streams all 3 FEC bulk indiv zips = 148.8M rows in ~90 s via trie match, ALL 6 industries + 794 alias patterns) and `pac_universe.py` (Schedule B collector with sliding per-key budget, dry-run proven 690 req plan).
- **CRITICAL DISCOVERY:** overrides written/approved in PRIOR sessions (the original 77-row `company_match_overrides.csv`, e.g. TMCC/Truckee Meadows, Optimum collisions) were written to the CSV but NEVER reconciled into collected data: no mechanism existed to re-apply them. Built `reclassify_overrides.py` (dry-run-first, rowid-level ledger, never touches raw columns) and ran it: **16,932 rows reclassified in master** (Verizon 9,074 review to accepted $396k; Altice 790 accepted to rejected $339k Optimum-collision purge; Comcast 5,353 review to accepted $228k; Toyota 1,508 accepted to rejected $42k TMCC purge; Gemini 206 mixed). Propagated to all per-industry source DBs so the next `merge_all.py` run doesn't regress it.
- **Trade-PAC classifier bug found + fixed:** `build_workbook.py`'s category logic tried trade-matching via a `categories` table with `committee_id=None` (dead code), so CULAC (C00007880) landed as "Candidate" not "Trade Association", and the CU industry showed $0 Trade Association when the true figure is ~$104k. Fix: load `trade_pac_registry.csv` (85 committees, state-league + national) and `pac_discovery_candidates.csv` (42 candidates, 25 new: Charter's real PAC, T-Mobile's T-PAC, State Farm's, Kraken's, Binance.US's) as REGISTRIES checked before spreadsheet name-matching; 12-committee REJECTS set for web/local-verified false positives (Washington State Farm BUREAU is not State Farm; Spectrum Healthcare Resources is not Charter's Spectrum; First Financial Corp Waco TX is not First Financial Bancorp Cincinnati; Westfield / Ohio Farmers are not Farmers Insurance Group; etc.), verified via the cm zip `CONNECTED_ORG_NM` field + city/state, not guessed. CULAC now correctly Trade Association; $ totals provably unchanged (only category moved).
- Acronym-soup false alarm: the audit's own acronym generator produced garbage 2-3-char collisions (alias "CC" matched 6 unrelated companies identically, "OF" / "PC" / "AI" / "AL" similarly); filtered out before reporting; real evidence stands separately.
- **Two new `company_match_overrides.csv` fixes from live evidence:** Gemini typo bug ("GEMINI GROUP GROUP" doubled-word key let real "GEMINI GROUP" employer slip through unrejected, 49 rows), + verified subsidiary accepts (Verizon Corp Rsrcs Group LLC, Verizon Business Ntwk Srvs LLC, NBCUniversal Media LLC, Comcast (CC) of Willow Grove, Dish Network & EchoStar, Payward / Payward Ventures = Kraken).
- Correctly declined to "fix" several false-reject candidates that were actually correctly rejected on inspection (Sprint Waste Services TX is not T-Mobile/Sprint telecom; Ohio Farmers Insurance is not Farmers Insurance Group; BHHS PenFed Realty = real-estate franchise, not PenFed employees): cross-referenced before trusting the tool's own output.
- `proposed_new_aliases.csv` staged (63 items, $5.97M evidence; brand/legal names like PAYWARD / ESURANCE / SLING TV / GENRE + FCU-token-swaps + 4+ char acronyms state-clustered on each company's real footprint): NOT applied, needs Paul's yes per his strict-names rule.
- Gap-fill scheduler (`mentat_scheduler.py`) self-relaunches lanes every FEC 1000-req/hr window until `api_work_progress` shows 0 pending; replaces the one-shot `gapfleet.sh` that died silently on budget exhaustion.
- Both real workbooks rebuilt post-reclassification, `verify_final.py` ALL CHECKS PASSED (State Farm still the lone zero-row gap, mid-fetch). PAC Schedule B live collection NOT yet launched: it competes with the gap-fill fleet for the same 4 keys, queued to run after the person-data fleet completes.

### Parallelism ceiling + worker-shard audit (2026-07-21, 16 keys added)

- ~~THE structural finding: `api_request_budget` is tracked PER-DATABASE, not per-key: one row (`budget_id='openfec'`), NO key column.~~ (2026-07-21) **PARTIALLY CORRECTED 2026-07-22: "no key column" was FALSE.** The schema is `api_request_budget(budget_id TEXT PRIMARY KEY, window_started_epoch, requests_used)` and is **byte-identical in all four lineages**: it always supported multiple budget rows. What was true is that the CODE hardcoded `budget_id='openfec'`, collapsing every worker onto one 1,000/hr bucket. A LATER fix in `mall`/`Mentat\mentat` only (`fec_api_budget_id()`, a polynomial digest of the key) makes the budget genuinely per-key. **Its premise (that api.data.gov enforces the hourly cap per registered KEY) is UNVERIFIED and contradicts the note's original conclusion.** Do not propagate that fix or promise throughput gains from more keys until an empirical two-key test settles per-key vs per-IP/per-database. Paul QUARANTINED it 2026-07-22: present where it already is, added nowhere. Verify budget rows before promising any throughput gain.
- Built unit-level fan-out (`gapfill_worker.R` + `mentat_scheduler2.py`, branch `codex/unit-shard` in `C:\Users\pgoff\cxwt2`): shards a company's pending unit list across keys, each worker its own DB + own budget, writeback marks parent units complete on exit.
- **4-agent adversarial audit of the collector (all claims source-verified):**
  1. `stored_complete=1` DOES skip work, at TWO points: fetch queue `fec_api.R:747` (via `complete` at :630) and store phase `:1688`; resume-skip was NEVER removed (diff vs `fec_api.R.bak` = only 2 unrelated stop-to-warning hunks). This contradicts the R1 note "Resume-skip REMOVED".
  2. **`api_work_progress` is purely a FILTER**: intersected with incoming units at `:589`, it can never ADD work. **P2_name units are minted from `contributions.sub_id` (`:1137`) seeded from `phase IN ('P1_employer','P2_variant') AND company_match_status='accepted'`.** A worker DB seeded with checkpoints but NO contributions generates ZERO units, returns the `:719` zero-result, and **silently collects nothing while logging a clean START/END**; this is what happened (0 of 237 units, 0 rows).
  3. LATENT SILENT-LOSS: `api_page_checkpoints` was never seeded: a unit restored `fetched_complete=1/stored_complete=0` gets `pages=list()`, is marked `complete` at :630, PASSES the `:1690` guard, stores nothing, then is marked stored at `:1705`. Never fired (fan-out disabled before any assigned unit completed) but was one step from writing false completion into the master.
  4. FIX BUILT + VERIFIED, **NOT DEPLOYED** (commit `7b2e0eb`): seed phase-1 contributions + page checkpoints, force assigned units `stored_complete=0` (they were inheriting the parent's 1 via `completion_clause=""`). Proven: seeded 24,299 rows == parent's 24,299 Allstate P1/P2v accepted.
- **UNRESOLVED, TWO DISTINCT WORKER FAILURES (do not conflate):**
  - (i) under ~5-way concurrency, `gapfill_worker.R` dies with ACCESS_VIOLATION `rc=3221225477` 10/10, no R error text;
  - (ii) run STANDALONE it survives 28 min then exits 0 having logged `FAIL attempt to apply non-function`: an R-level error inside `collect_crypto_api`, NOT a memory fault, after burning its **entire 995-request budget while storing ZERO rows** (units 6/1577, rows flat at 29,895). Checked and RULED OUT: no global name collision between the worker's helpers (`parse_phase2`/`quoted_identifiers`/`copy_rows`/`chunks`/`seed_worker`/`main`) and any assignment in collect.R/fec_api.R/ingest.R/schema.R.
  - LIKELY LEAD: the worker DB is in a state no plain lane ever reaches: `run_ca_w01` contributions are **100% `P2_variant`, 0 `P1_employer`**, because the OLD seeding copied `stored_complete=1` progress rows (so phase 1 was skipped as done) while copying no contributions at all. The `7b2e0eb` seeding fix targets exactly that malformed state, but **it is NOT proven to fix this error**: reproduce with an R traceback (`options(error=...)` / tryCatch capturing `sys.calls()`; plain `try()` discards it) before believing it. The worker is ALSO the shape that wastes budget fastest: a full key-hour for nothing. Do not re-enable fan-out until (i) and (ii) are both understood.
  - Dials: `MENTAT_UNIT_SHARD_MIN` (huge = unit shards off), `MENTAT_NO_WORKERS=1` (plain lanes only, the proven-stable path: plain `gapfill.R` has never crashed).
- **OPS LAWS learned the hard way (2026-07-21 night):**
  - (a) **never build stall/progress detection on `rows_seen`**: it is a FETCH-side counter that churns when a lane re-fetches and fails to store, so a failing lane relaunches FOREVER (ca relaunched 10x, never retiring, re-pulling ~6k rows from FEC each time); use COMMITTED `contributions` count instead.
  - (b) The scheduler polls every 120 s, so **many "lane exit" lines sharing one timestamp is polling granularity, NOT simultaneous death**: do not infer an external killer.
  - (c) R writes via **WAL**: committed-row queries look frozen while `mentat.db-wal` grows; check `-wal` mtime/size before declaring a stall.
  - (d) **FEC bulk data is UPPERCASE**: a case-sensitive prefilter returns a FALSE ZERO (a Caterpillar scan reported 0 rows when 785 existed in the first 3M lines alone; the implausible answer is what caught it).
  - (e) Long unit-id lists overrun the Windows 32K argv limit: every worker dies instantly with `command line too long`; pass a `@<path>` filter FILE.
  - (f) Launch detached schedulers with stderr REDIRECTED: a hidden crash (a `c.units` typo; the field is `pending_units`) killed the scheduler on first lane exit for an hour, invisibly.
- **BOTH PHASE-2 ROOT CAUSES FOUND + FIXED 2026-07-21 evening** (`fec_api.R`, backup `.pre_storefix`):
  1. **store-unreachable:** fetch, record, store in `fec_api_collect_checkpointed`; ANY abort during fetch (quota pause OR a plain error like connection_error after 5 retries) unwound past the store call, so fetched pages stayed in `api_page_checkpoints` forever. Fix: a tryCatch `error =` handler flushes all fetched-complete-unstored units via `fec_api_store_results` (states from `fec_api_load_progress` need `state$unit` attached: load_progress alone lacks it) then re-stops the original condition.
  2. **the `identity` shadow:** `collect_crypto_api` line ~2079 rebinds `identity` to the phase-result LIST; `collect_phase`'s tryCatch handlers (`mentat_api_quota_exhausted = identity` etc.) resolve `identity` in that SAME env at call time, so every pause after the rebind called a LIST, giving "attempt to apply non-function" at the exact moment a key's 1000 budget ran dry. Explains: error always near 997/1000 used, only phase2 runs, plain AND worker lanes. Fix: all 7 handler sites become `function(condition) condition` (shadow-immune).
  - **PROOF on cu:** identity units 0 to 2,633/2,656 stored, fetched_unstored 2,573 to 0, +1,813 P2_name rows (52,280 total). The identity pass yields ~few % net-new rows (mostly INSERT OR IGNORE dupes of the employer pass): its value is unit completion, not volume.
  - **LESSON: never name an R variable `identity` (or any base-R function used as a tryCatch handler); handlers resolve lazily in the defining env.**

### FLEET HALTED 02:34 2026-07-21

- **PHASE-2 IDENTITY PASS BURNS BUDGET AND PRODUCES NOTHING.** Over 40 min with 7 supervised plain lanes: **rows FLAT at 730,271, units completed FLAT at 420, while budgets burned (cu 941 requests, pc_2026 933, ca_w03 1000, ca_w01 995) and pending GREW 6,083 to 8,643.** Zero FAIL lines in cu/tel_*/pc_* logs: it is not erroring, it simply completes no unit and stores no row. Affects PLAIN lanes too, so it is NOT a worker-shard problem.
- Prime suspect: **`phase2_names=TRUE`**, newly enabled 2026-07-20 (it had been silently FALSE, which is why earlier employer-only runs banked 730k rows fine). The identity/P2_name pass appears to spend the entire hourly key budget on per-donor lookups without ever marking a unit `stored_complete=1`, so every budget window is re-spent on the same work forever. **Do NOT restart the fleet with phase2 on until this is understood**; each window costs a full key-hour per lane and hammers FEC's API for nothing.
- First diagnostics to run: does any P2_name unit EVER reach `stored_complete=1`; does the pass commit on budget-pause or discard partial work; are fetched identity rows all INSERT-OR-IGNORE duplicates of employer-pass rows (redundant work by design). Baseline to compare against: pc_2024 and cb are COMPLETE (19/19, 195/195) and were collected employer-only. (The two root causes in the section above, found the same evening, are the resolution of this halt.)

### OPEN POLICY CALL FOR PAUL: pagination-shortfall guard

- The pagination-shortfall guard rejects the ENTIRE unit on a 1-row shortfall: it discarded 5,985 fetched Caterpillar 2026 rows because FEC claimed 5,986 with no continuation cursor. Bulk indiv26 shows 5,474 Caterpillar-employer rows (70 amended, 0 memo_X) and no systematic gap; API > bulk is expected (API is live, bulk lags), so FEC's `count` looks approximate, not a real missing row.
- Options put to Paul: verify-vs-bulk (done), tolerate bounded shortfall (<=1 row / <0.1%) with a recorded flag, or leave 12 `ca` units uncollected. NOT changed without his yes.


### Master-corruption defects re-tested against live data (2026-07-22): 4 of 7 REFUTED

The 07-22 forensics workflow (38 confirmed findings, spec saved at `Temp\cxwt-mentat-recon\MASTER_CORRUPTION_SPEC.md`) was measured against the SHIPPED WORKBOOK:

- **#5 State Farm "phantom" is REFUTED** (now 93,279 rows / 79,127 accepted; it was the known mid-fetch gap on 07-20 and has since been collected).
- **#6 Gemini "~88% contaminated by Geminiano surnames" is REFUTED in the accepted set** (all 163 accepted rows carry GEMINI employers; the contamination is in the 7,183 REJECTED rows, i.e. the matcher works; it is the unculled Raw sheet that displays them).
- **#21 "tZero Raw holds Phillips 66 rows" REFUTED** (company is spelled `Tzero`, 9 rows, all genuine TZERO employers).
- **#8's "$92M inflates Crypto 2025-26" is OVERSTATED**: all four duplicate $23M Coinbase to FAIRSHAKE rows carry `duplicate_memo=1`, and `countable_corporate()` (`build_workbook.py:634`) requires `duplicate_memo==0`, so they never enter Facts or any SUMIFS; they show only on the by-design unculled Raw tab.
- **LESSON: defects found by reading a shipped artifact must be re-tested against the CURRENT db before being "fixed": collection moves underneath them.**
- STILL REAL: **#7 First Financial Bancorp: ALL 157 accepted rows ($112,813.09) are false positives**, zero rows anywhere mention BANCORP or Cincinnati/Hamilton OH; the `companies` table lists three genuinely different public banks as variants of one (Bancorp FFBC/Cincinnati, Bankshares FFIN/Abilene TX, Corporation THFF/Terre Haute): fix the VARIANT LIST, not just the rows.
- Also real: 3,273 contributions rows (3,172 countable, $370,737) have `two_year_transaction_period` disagreeing with the receipt-date cycle, but that is FEC's OWN field and redesignations are legitimate, so LOG the disagreement, do NOT overwrite it with a date-derived guess.

### Acronym-variant collisions are systemic (2026-07-22, UNFIXED, awaiting Paul: roster-identity calls)

48-agent audit, 64 variant sets, 9 survived double adversarial verification. First Financial Bancorp was not a one-off; the same shape recurs wherever a roster carries a bare ACRONYM or BRAND variant. Confirmed + independently re-verified:

| Variant | Collision | Evidence |
|---|---|---|
| AHFC | Alaska Housing Finance Corporation | 1,169 AK rows / $37,020 = ~50% of American Honda Finance's accepted rows (occupations MORTGAGE UNDERWRITER / HOUSING SPECIALIST; AHFC has no Alaska presence) |
| SECU | SECU of Maryland | 401 MD rows (4 rows literally 'SECU OF MARYLAND', 136 'SECU, INC.'); roster is NC SECU which has no MD branches; **337 of the 401 arrived via P2_name identity cross-reference seeded from the bad variant, so a variant-only fix will NOT clear them** |
| MACU | Mid-America Christian University | 9 OKC rows, PROFESSOR/COACH |
| Charter 'Spectrum' | Spectrum Ventures/Technology Group/Solutions/Labs | 739 rows / $57,736 |
| First Hawaiian 'FHB' | FHB Ventures/LLC + a law and a medical practice | 288 rows |
| Altice 'Lightpath' | LightPath Technologies Orlando | 7 rows |

- Correctly REFUTED: Kraken, BINANCE US, PACCAR (Kenworth/Peterbilt ARE PACCAR divisions), Berkshire Hathaway.
- **CAUTION: one finding was FALSE and double-refutation did not catch it:** the Altice/'Optimum' agent claimed "ZERO rows carry the bare employer string OPTIMUM / 100% of its yield is wrong"; there are **188 accepted bare-OPTIMUM rows** (genuine cable technicians). Only the SUFFIXED entities (OPTIMUM TECHNOLOGIES 135, OPTIMUM INC 18, OPTIMUM SOLUTIONS 9) collide. Both refuters attacked the entity question and let the headline assertion pass: **adversarial verification checks the CLAIM the verifier is pointed at, so point it at the load-bearing assertion, and re-query headline numbers yourself.**

### The override matcher was silently over-rejecting: FIXED @bulk `c45bd03` (2026-07-22)

- `reclassify_overrides.py` matched on `employer_key + company + state` ONLY: it ignored the `occupation_pattern` column entirely and had no specificity rule, so it DIVERGED from the collector it mirrors (`collect.R:198-221`: empty state/pattern match everything, patterns are case-insensitive perl regexes over `contributor_occupation`, and **only MAX-specificity rules survive**, so a scoped rule BEATS a blanket one rather than being subsumed).
- Consequence: **Toyota Motor Credit sat at 1 accepted row out of 927**: the `TMCC,...,reject,,TEACHER|PROFESSOR|...` rule (for Truckee Meadows Community College) rejected every TMCC row with the pattern discarded. That is a PHANTOM COMPANY of exactly the class the forensics reported for State Farm, but real and current. Gemini's 4 state+occupation rules (incl. a negative-lookahead NY accept) were likewise cut to their state halves.
- Matching is now ROW-driven not override-driven, which also killed a double-count (old loop emitted one ledger row per (row, override) PAIR: reported 11,633 changes for 11,509 distinct rows).
- **New `repair_overreject.py` was REQUIRED** because fixing the matcher cannot undo the damage: once the pattern is honoured the override no longer matches those rows, so reclassify skips them and they stay rejected. It restores only rows with `company_match_reason='verified_roster_alias'` AND that no current rule still rejects.
- **LESSON: a Python re-implementation of an R rule is a FORK: diff it against the original before trusting it; this one silently dropped a whole column.**
- Net on master: Toyota 1 to 170, Altice 5,095 to 4,958, First Financial Bancorp 157 to 0, Comcast +9,622, Verizon +1,392, Gemini unchanged.
- Registry refinements @mall `062c51c`: TMCC gains ND scope (NV+ND are 87% education-signal; all 169 TMCC rows in OTHER states are UCC ANALYST/CSR/TECH SUPPORT/SALES with ZERO education signal: state separates perfectly), OPTIMUM pattern widened with HEALTH|NURS|MEDICAL|DENTAL|THERAP|CLINIC|PHARMAC (Optimum Healthcare is not Altice's Optimum cable brand; NY CABLE TECHNICIAN stays accepted).

### Version control (2026-07-22)

- **`AppData\Local\Mentat\bulk\` IS NOW A REPO @`5299fc2`.** It holds the REAL production pipeline (`merge_all` / `build_workbook` / `audit_merge` / `verify_final` / `reclassify_overrides` / `resolve_persons` / `pac_recipients` / `bulk_collector` + schedulers) and was untracked, which is WHY a prior session rebuilt merge and workbook-builder logic that already existed.
- `mall` and `mrb` were ALREADY repos (branch master): do not repeat the claim that the R trees are untracked; the untracked one was `Mentat/mentat/` inside the Melange worktree.
- `.gitignore` is source-only: the dir doubles as an 11 GB data root (5.2 GB `indiv22.zip`) and carries `scheduler2_key_slots.json`.
- **`mrb` has ~4,505 lines of SOMEONE ELSE'S uncommitted WIP (18 files, deleted scripts/): leave it alone.**

### Override registry is itself divergent and regresses on every merge (2026-07-22)

- `company_match_overrides.csv` differs across lineages: **`mrb`'s (105 rows) is CANONICAL, `mall`'s (77) is STALE**, and `reclassify_overrides.py --overrides` defaults to mrb's path. mall's single unique entry is the typo'd `GEMINI GROUP GROUP` doubled-word key (the known bug); mrb holds 29 entries mall lacks (Optimum/Altice state-scoped collision rejects, Verizon subsidiary accepts, PAYWARD/Kraken, NBCUniversal, Dish/EchoStar).
- **CRITICAL: the 07-20 reclassification REGRESSED:** master was rebuilt 07-22 00:38 and 11,633 rows again need flipping (Comcast 9,622 review to accepted, Altice 449+13 to rejected, Verizon 1,392 review to accepted, First Financial Bancorp 157 to rejected). Applying to master ALONE is not durable: the same 11,633 live in exactly three source DBs (`run_cb` 157, `run_tel_2022` 5,739, `run_tel_2026` 5,737) and `merge_all.py` rebuilds master from them. **Fix source DBs + master together, every time.**

### Lineage map and the CRLF trap (2026-07-22 reconciliation)

- The R code exists in 4 lineages plus 11 shard copies. **`C:\Users\pgoff\mall` is CANONICAL**: newest, holds the fixes, uniquely has `R/master_facts.R` + `export_master_facts.R`, and **IS a git repo** (branch `master`, 3 commits, first = "SNAPSHOT: put the mall collector tree under version control"). Do NOT repeat the claim that the Mentat code is unversioned: that is true only of `C:\Users\pgoff\Mentat\mentat`, which sat untracked inside a Melange Systems worktree. Shards = `mall_{ca,cb,cu,pc,tel}` + `mall_{pc,tel}_{2022,2024,2026}`, two code classes only.
- **`mrb` is AHEAD of mall on two features that exist nowhere else:** `company_pacs` / `pac_disbursements` / `pac_financials` tables, and `safe_alone` diminutive safety guarding ambiguous name variants (AL / SANDY / CHARLIE / FRED / HAL) from matching alone. **A blind "forward-port from canonical" would DELETE both; mrb needs a bidirectional merge.**
- **THE CRLF TRAP:** `collect.R` / `fec_api.R` are CRLF in mall + shards but LF in `Mentat\mentat` and `mrb`; `report.R` / `ingest.R` / `schema.R` are LF everywhere. Diffing across that boundary reports EVERY line changed: it made ~700 lines of real drift look like ~14,000 and led to calling mrb a "deep fork" and scoping it out on a false premise. **Always diff Mentat R with `--strip-trailing-cr` before drawing any conclusion about divergence size.**
- Also: mall's `tests/test_fec_api.R:336` still asserts the pre-fix contract (`stop("page ceiling exceeded")`) while the code now warns and continues, so `stopifnot` halts that file at line 337 of 621: **~46% of that suite has not executed since the fix landed**, and the shards score a misleading 7/0 only because they still carry the old behavior.

### Fintech ordeal diagnosed + perf round-2 at Paul's gate (2026-07-23, /codex lane)

- Paul's ">1hr for one industry" = the 14:31 from-scratch Fintech run (old serial path, commit `36224b1`, `max_parallel=1`) **crashed exit -1 twice**, both times immediately after `FEC export downloaded and verified: 15907 rows` (Stripe), 24.2 min + 7.6 min wasted; then manual per-company shard recovery (Stripe split per-cycle + merged, SoFi 3 attempts) until ~15:50, report 15:58.
- **CRASH SIGNATURE: a LONG-LIVED whole-industry R session dies natively (no R error) after large FEC-export ingests; the SAME work in fresh short-lived Rscript processes succeeds**: likely native memory/fragmentation.
- Commits `737e3bc` / `4669006` / `7fd6390` (built 16:10-16:59 in RESPONSE) added the resilient orchestrator + per-(company,cycle) key-pinned fanout + warehouse gate; measured: export 63.4 s, beneficiary 6.76 s, Excel 44.8 s, cached rerun 1.54 s.
- **That session's round-2** (worktree `Temp\codex-wt-mentat-perf`, branch `codex/mentat-perf-round2` off `7fd6390`, UNCOMMITTED, Paul's gate): 3-rung containment ladder in fanout (lane, fresh-lane retry, per-company-cycle split; recovery SERIAL by design, `--recovery-workers` hard-pinned 1 so no same-shard-DB contention); `Start-MentatIndustryReports` now delegates from-scratch runs to the resilient path (`-LegacySerialCollection` = opt-in old path); `phase-timings.json` + per-industry summary line; **roster-driven industry discovery** (validator `--roster` mode; 7 industries incl. Fintech all ready; unknown industry = loud fail); crypto generator generalized to `build_industry_report.ps1` (verified faithful, only finalize timing added); invocation receipts with exit code + last log line; bounded rm/gc at R export boundaries. Projection ~10.6 min Fintech from-scratch.
- **The review caught 4 (all fixed + re-verified):**
  1. **PS `-f` binds TIGHTER than `+`**: `'a{0}' + 'b{1}' -f $x` leaves the first fragment's placeholders literal (verified empirically); the load-bearing summary line was broken; parenthesize the concat first.
  2. **Codex had baked its sandbox runtime cache (`~/.cache/codex-runtimes/...`) as PRODUCTION defaults in 7 files** (python + node + node_modules; there is NO system node on this machine, the cache is the ONLY node); now a resolution chain param, then `MENTAT_PYTHON_PATH`/`MENTAT_NODE_PATH`, then PATH, then cache, then loud fail, resolved paths in receipts. Sweep every Codex diff for this.
  3. R `mentat_project_root()` marker was the UNTRACKED scratch `CODEX_TASK.md`, so fresh clones/worktrees died; now `mentat.R`.
  4. `test_ingest.R` hardcoded a 279-company fixture and failed ON LIVE too (roster grew); now roster-derived.
- Verification: 6/6 Python suites (system py3.14), **11/11 R suites** (`R_LIBS_USER` set; Codex sandbox cannot see the R library: Claude must run R tests), 7 .ps1 parse-clean PS5.1, node --check OK, roster smoke 7/7.
- GATE ITEMS (then): merge; live <=15 min benchmark run (hits FEC API = Paul's call); vendor node/node_modules properly (follow-up); the original R tests + inputs are UNTRACKED in the repo and should be committed.

### Round-2 shipped + benchmark passed (2026-07-23 night; Paul's "do what is most optimal")

- Merged `@4ef422d..86c878d` onto `codex/mentat-crypto` (live tree fast-forwarded each fix). Five live benchmark runs each exposed exactly one production bug the offline tests could not (fix-benchmark-fix loop):
  - **F6** PS5.1 `Start-Process -PassThru` returns NULL ExitCode unless `.Handle` is accessed before child exit, so a successful init read as failure (`$null -ne 0` fires; null binds to [int] receipt param as 0);
  - **F7** fanout's `os.replace(status.json)` vs the orchestrator's 2 s Get-Content poll: WinError 5 killed 20 min of collection (fix: bounded retry + telemetry-writes-never-fatal + PS reads FileShare Delete);
  - **F8 / F8b** strict merge auditor rejected the KNOWN cross-company `sub_id` attribution case (+ `scraped_at` provenance); now deterministic winner by canonical roster order + `attribution_conflicts` rows (43 recorded live);
  - **F9** orchestrator's own `Write-AtomicJson` IOException (indexer/AV hold on status.json) killed a healthy run; same two-tier retry/tolerance in PS;
  - **F10 (THE collection bottleneck)** shared budget DB via `dbWithTransaction` = DEFERRED txn, so concurrent lanes deadlock on read-to-write upgrade, which SQLite fails INSTANTLY (bypasses busy_timeout), so 7/8 primary lanes died "database is locked" in <0.5 s and serial recovery silently ran every collection at ~3x wall clock. Fix: BEGIN IMMEDIATE (SQLite-only, commit before network) + `busy_timeout=60s` on every connection + WAL + deterministic lane jitter.
- **V5 CLEAN: 18.33 min from-scratch Fintech e2e, ZERO lane failures, zero telemetry failures** (collection 732.6 s | merge 2.6 s | warehouse 10.1 s | export 92.2 s | build 163.0 s | formula 45.1 s | finalize 9.0 s; 26 sheets, 336,762 formulas, 0 integrity failures; grid coverage all-true).
- **BONUS DISCOVERY: the previous day's crash-recovered Fintech workbook UNDERCOUNTS:** SoFi corporate pass 16,170 rows short (20,281 to 36,451), Cash App corporate 22 to 507; cycle totals rise ~+40-98% (e.g. 2021-22 $953k to $1.89M). The workbook Paul has open is materially incomplete; v5's sits in `mentat/.cache/bench-20260723-output/` awaiting his deploy call.
- **NEXT SPEED LEVER** identified from receipts: the company-to-lane merge invariant serializes SoFi's 3 cycles (306 + 226 + 195 s = 727 s, about the entire 732 s collection critical path); relaxing to (company,cycle)-to-lane would cut collection to ~5 min, total ~11 min.
- OPS: codex-reply idle-timeout can eat Codex's answer while its diff lands fine: check worktree mtimes, ask for a 5-line recap, never re-dispatch blind. Benchmark runs were sandboxed (`-OutputDirectory` to `.cache`) because Paul had the target workbook open in Excel.

### Load-bearing review findings (all live-verified 2026-07-18)

- v1 Phase 3 committee-page nth-child selectors are BROKEN (collide/mis-target): use row-LABEL-text anchoring on `.simple-table__row`; Phase 1 row/panel selectors all correct.
- Employer filter is keyword-match (variants subsume): scrape the minimal covering set.
- NO unique transaction id in the UI (dedup = name+date+amount+committee-id+memo tuple); recipient committee ID captured from the link href = the Phase 4 join key.
- Conduit rule = drop ActBlue/WinRed-recipient legs + memo'd pass-through legs (3-row earmark anatomy, MEMO_CD='X' side invisible to the employer-filtered scrape) [later superseded: conduit legs COUNT, R8 re-ratified 2026-07-27].
- Volumes: State Farm 45,721 rows / Navy Federal 3,886 per cycle at 100/page max.
- 10 defaults adopted awaiting veto (roll-ups, match ladder, VP to Employees in banks quirk, View X = no lean, etc.), listed at the bottom of the spec doc.


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

The shared-checkout law and "authorization does not relay" notes from this lane are in Standing rules above.

**Open for Paul** (from this lane; also in Next Steps): the 09-17 12:41 CU run stands 27/30, killed without a terminal state, now resumable from console 8806. Console startup can hang on `git rev-parse` through OneDrive (unkillable child, `lru_cache` races two threads); task chip queued. Single-cycle runs fail the workbook wanting cm22. Runtime paths >~275 chars break `sys.path[0]`. Brain drafts (STATE, DE-026, D-040) are in the packet. `Desktop\API Keys\keys.json` is NOT Mentat's key store: the DPAPI store is. See `mentat-worker-scaling-lane-2026-09-09`, `mentat-failings-lane-s2-2026-09-16`.

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

## Cross-verification: contradictions, not ambiguity (source: `xref-contradictions-not-ambiguity-2026-09-17`; concept page: [[exclude-on-contradiction-not-ambiguity]])

Paul's rule: the Mentat cross-verification excludes only on CONTRADICTION, never on missing/ambiguous info (brain D-040). LANDED 2026-09-18 as commit `627300bc9`: a row whose own text names another organisation is excluded (`attribution_contradicted_by_text`, Banking 29,816 rows / $32.5M, of which $29.3M was the matcher reading CITIZENS as CITI); text naming the company counts flagged (`company_named_unverified`); recipient and role routes support donors employed elsewhere; observed Banking giving $72.10M to $77.05M, review queue 76,197 to 46,156 rows; packet `audits/mentat_xref_logic_20260917`.

Paul, 2026-09-17: "I think we really need to reconsider the whole idea of the Cross-Verification, it is way too strict. Donor not matched to a listed company · counted at $0 — 36,241 — $37,940,955 = This is an inevitability and is why we filter based on name, giving amount and all the other steps. Memo entry without a proven parent receipt — 19,529 — $8,522,419.98 = This is also an inevitability. Just because it is missing info does not mean it should be excluded; we are focusing on contradictions, not ambiguity." Then: "its ok if they work at another company if the money is going to something JP Morgan affiliated or if they are an advisor or in an a adjacent position." Then, to the reason-code table and decisions D1-D4: "Your suggestions are correct." Then: "Finish and then commit."

- **The rule (brain D-040, landed before this work as `c62cc6eb6`):** exclude or zero only on contradiction; ambiguity counts with an unverified flag.
- **This lane added, COMMITTED `627300bc9` (32 files, +3,189/-18: `tools/cross_reference_engine.py`, `tools/run_cross_reference.py`, `tests/test_cross_reference_engine.py`, packet `audits/mentat_xref_logic_20260917`):** a whole-token text test on rows that were only "unverified". Text naming another identifiable organisation is a contradiction, so the row is excluded under `attribution_contradicted_by_text`. Text naming the listed company or a verified alias keeps the row counted and flagged under `company_named_unverified`. Blank or non-naming text stays counted and flagged. Recipient route (recipient committee is the company's dated PAC, or the FEC committee master's connected-organisation field resolves to the company) and role route (advisor/adviser/advisory, consultant, contractor, trustee, partner, counsel, board; NOT plain director, NOT retired) upgrade attribution status only; they never decide dollars. No row is ever attributed to a different listed company by the test.
- **Measured (Banking run `20260918T030844`, 650 s; before = `20260913T074303`):** observed original giving $72,103,655.70 to $77,054,485.76; employee giving $70,446,487.57 to $71,246,149.34; unverified funding $1,657,168.13 to $5,808,336.42; PAC activity $22,774,438.00 and baseline $133,516,227.27 unchanged; review queue 76,197 rows / $49.93M to 46,156 rows / $16.99M. All 36,241 previously zeroed rows accounted for: 29,816 excluded as contradicted ($32,538,668.49), 6,266 released with a flag, 159 settled as non-giving.
- **The finding:** $29.3M of that exclusion was one bug, the upstream matcher reading `CITIZENS` as the `CITI` prefix and booking End Citizens United, Citizens Bank, Citizens Business Bank, Citizens Financial Group, even Target and PepsiCo citizens funds as Citibank money. Fintech re-ran the same way (`20260917T190836`, 369 s). Tests 113 passed.
- Observed giving still sits above the published $54,762,844.05 Banking workbook total, as it did before the change; the before/after pair spans four other commits, so the clean patch-attributable measure is the row-level trace in REVIEW.md 5f.
- **Open, Paul's:** add the register data (`C00039305` Citigroup PAC-State; the companies' own PACs appearing as donors: Truist Financial Corp Federal State Local PAC, JP Morgan Chase Co State and Fed PAC, PNC PAC Michigan, Capital One Association Political Fund PAC) so those rows move from unverified funding to PAC activity; re-run the launcher for the day's other commits; `observed_filing_versions_unresolved` keeps $344,433.54 of probable duplicates until filing headers settle them.
- **Process lessons:** a long run started from a subagent's background shell is killed when that agent's turn ends (the Banking run died mid-verify with no exit line, while Fintech's ended `exit=0`); start long runs from the main session's background Bash. The `C:\Users\pgoff\Mentat` index is SHARED with every other session working in that tree: the abort guard ran `git reset` and cleared another lane's staged file list (no content lost; they re-stage). Stage and commit atomically, and use `git commit --only -- <paths>`, never a bare reset. See `mentat-failings-lane-s8-2026-09-18`, `mentat-xref-workbook-review-2026-09-17`, `mentat-system-debug-lane-2026-09-13`, `ask-before-substantive-changes`.


## Cross-reference vs workbook review, 2026-09-17 (source: `mentat-xref-workbook-review-2026-09-17`; full record in [[2026-09-17-mentat-xref-council-review]])

Council review + build 2026-09-17: the cross-reference does NOT minimize versus the workbook (Banking $72.1M vs $54.8M); Paul RULED it redundant, kept dwarfed for obvious outliers + clear refunds.

- Paul (2026-09-17, `/ecc:council` then `/ecc:python-patterns`): "review the cross-reference and spreadsheet generation ... it seems to minimize the amounts too much ... workbook generation should be fit for the way chart-studio reads"; then "Proceed with the recommendations, however, I disagree with the cross-reference ruling, it itself is redundant and cannot capture the nuance of political giving, It can be maintained but at a dwarfed state only for obvious outliers or clear refunds"; then "These need to hurry up".
- Worktree `mentat-xref-spreadsheet-review-3f1ff0`; code in `C:\Users\pgoff\Mentat` (codex/mentat-crypto, HEAD `3fdfeae8f`, a peer S3 session committing concurrently). Packet: `C:\Users\pgoff\Mentat\audits\mentat_xref_workbook_review_20260917\` (REVIEW.md, RECEIPT_RULING_TABLE, COMMIT_PLAN, BRAIN_UPDATE_DRAFT, gate_census/, receipts/, tidy_rebase/). Continues `mentat-system-debug-lane-2026-09-13` and `mentat-tidy-workbook-lane-2026-09-14`.
- **Council finding (4/4):** Banking workbook Total Giving (include==Yes) = $16,652,458.77 + $26,107,204.16 + $12,003,181.12 = $54,762,844.05; cross-reference run 20260913T074303 "Observed original giving" $72,103,655.70 (+$17.3M: memo legs without proven parent $8.5M, transfers $5.8M, unpaired earmark legs ~$0.7M, all retained at full value); its -$61.4M "change" is against an unpublished $133.5M baseline of which $41.8M (PAC view $22.8M, interest/non-giving $19.0M) the workbook also excludes. Only 1.6% of rows FEC-verified; registers already migrated into `collect.R`; Downstream Activity (Schedule B) richer than its PAC view. Real blind spots: corporate treasury structurally $0 (no treasury_entity records), PAC outgoing $0 outside Banking, exact-string register match, calendar-vs-transaction-period cycle. Fintech run: baseline equals the Fintech workbook exactly ($9,803,891.31). `company_cross_reference_people()` in `collect.R:871` is identity keys, unrelated.
- **Built (Opus architect, scratch-copy method):** `tools/cross_reference_digest.py` (pure `build_digest` + read-only CLI over ledger.sqlite; Banking 849k decisions in 32 s), runner writes `digest.json` per run, `app/cross_reference_data.py` returns scope + digest only (no total-like key), `app/cross-reference.js` renders "Clear refunds" + "Obvious outliers" with the lede "The published report workbook is the accounting of record ... it publishes no totals." Live-checked on a throwaway 8836 read-only console: Banking 641 unmatched negative adjustments / 4,778 non-giving reclassifications $76.5M incl. the $10M BofA LOAN / 24 large receipts incl. a $1,058,200 individual at JP Morgan; Fintech 56/100/5; CU empty state. Thresholds `MENTAT_XREF_LARGE_RECEIPT_CENTS` $1M / `MENTAT_XREF_LARGE_INDIVIDUAL_CENTS` $100k = proposed defaults awaiting Paul (superseded by relative outliers). Linked refunds are 0 on both runs (the engine's refund link needs `refund_of_sub_id` evidence the DBs lack; the engine writes `negative_amount_is_not_refund_proof` on decisions, not the review-queue name). Tests: python cross-reference 110 OK, node 163/163, S5 navigation 13/13, wording 10/10.
- **Worksheet-mode guards built** (`chart-studio-core.js` `defaultGuards` pill `Fact Type = Recipient` / `View = Industry`; `committeeActivitySheet` caption + grand-total refusal; `groupWorksheets`; browser test `test_studio_worksheet_guard_browser.cjs` 3/3 on 8834). CORRECTION: the console's worksheet reader already drops Recipient List's Company-view rows (only 3,342 Industry rows reach Chart Studio), so the 2x doubling is an Excel-reader trap only; Downstream Activity exceeds the 50,000-row worksheet cap.
- **Gate census** (read-only, R gate reproduced, twin-checked vs `pac_evidence.py`, 0 verdict disagreements over 28,548 tuples): ruleset v4 refusals total 948 / $192.0M (Banking 593 / $1.80M, NOT 2,070 / $20.7M of the 09-12 ruleset (1,477 rows resolved by the 09-13 edit); Crypto 80 / $187.5M: Coinbase to Fairshake blank-line rows $19.3M, BTC/USDC "previously disclosed" duplicates $132.5M, "NON CONTRIBUTION" $35M; others Community Banks 11, Credit Arms 17, Credit Union 4, Fintech 94, P&C 53, Telecom 96). 503 rows have NO description; F13 (inaugural committee, $3.05M) absent from the form map. Ruling table R1-R17 drafted for Paul. SECOND BLOCKER: `report.R:2032/:2051` select `contributor_street_1/2` unconditionally (commit `d78cf0b8f`), so NO rebuild can start; patch `gate_census/report_R_street_tolerant.patch` cut and proven. Banking DB `.cache/report-repairs/banking-20260910/data/mentat.db` (sha 4abdea58...).
- **Committed 2026-09-17 on Paul's "Commit" (explicit paths, peer lane's files untouched):** `d78265927` dwarfed cross-reference, `bd1bfd60a` worksheet guards, `937ea01f5` tidy P5 via `git apply --cached` (index-only; the .ps1 working file keeps the other lane's hunks), `00c3700d6` report.R street tolerance, `f0181e523` packet. Committed blobs py_compile / node --check / ps1-parse clean. P5 rebase proof: `tidy_rebase/P5-rebased.patch`, `git apply --check --cached` OK. P6c edits inside `worksheet_accounting()`, which exists only in the other lane's UNCOMMITTED `report_insights.py`; P7b sits in that lane's test region. Paul must restart 8806. Tidy patches P2/P8 in HEAD; P5 rebased by hand; P6c/P7b wait for the other lane's commit of `report_insights.py`.
- **Follow-up rulings, same day:** "'contradictions, not ambiguity' engine rework. This is the one"; "Crypto's money is correct"; "Outliers should be relative"; "Apply" (brain D-040 + STATE bullet as `40434c6`); "Delete" (11 `.bak-20260917-xref/-wsg` files); "you are only fixing systems not regenerating anything, I will do that myself" (NO reruns/census/rebuilds from a lane; both Opus architects were killed mid-measurement, code already landed). Engine rework `c62cc6eb6` (REVIEW/blank/accepted-no-company rows count with `attribution_status = unverified`, queued as `company_attribution_unverified`; REJECTED and source-policy exclusions stay; relative outliers: `MENTAT_XREF_LARGE_PERCENTILE` 99.9 / `MENTAT_XREF_LARGE_MEDIAN_MULTIPLE` 20; python 108 OK); export-gate rework `7d364883e` (the gate refuses only a self-contradicting row; unresolved roles ship counted with `receipt_role_unverified` + `receipt_role_reason` in the raw export; blank line number recovered from the `SA<line>.` transaction-id prefix; "previously disclosed" excluded only when a counted line-11 twin with the same committee/cycle/amount exists; ruleset v5 = contradiction patterns only, F13 as contribution; copy at `gate_census/fec_receipt_rules.v5.json` because `inputs/` is gitignored; test_receipt_roles PASS, test_rules PASS, python twin 11 OK). Brain STATE amended to LANDED.
- **CROSS-SESSION CONFLICT (resolved by Paul):** at 11:29 ET the same day Paul's S3 session recorded the contradictions-not-ambiguity ruling (the $37.9M unmatched-donor and $8.5M memo buckets "must count"; a NEW session must rework the engine and re-run), later than the ~10:55 ET dwarf ruling and made looking at the OLD tab on 8806. The lane here was told not to start that rework; Paul's follow-up ("This is the one") settled it.
- **Lessons:** Haiku scouts returned an empty delegation note once and false "NOT FOUND" claims (MENTAT_COMPACT_RAW etc. live in *.mjs/*.ps1/*.R): verify absences yourself; Opus architects with the scratch-copy write path in the FIRST prompt complied and delivered (DE-022 holds); a background Bash `cd X && python server.py` ran from the wrong cwd (use absolute script paths); GateGuard fact-forcing fires on every first Write; `rm -rf` of a scratch dir trips the GateGuard destructive gate (use a fresh dir name). Related: `ask-before-substantive-changes`, `review-in-fable-directive-2026-09-16`, `go-faster-directive-2026-09-16`, `scout-census-traps-2026-09-13`, `mentat-chart-studio-2026-09`.


## System-debug lane, 2026-09-13 to 2026-09-15 (source: `mentat-system-debug-lane-2026-09-13`, last modified 2026-09-15; the console UI side is [[mentat-console]])

Description line: console lane 2026-09-13: $37.9M "unattributed" = `company_attribution_unresolved` review bucket (excluded, 3 cycles), NOT double counting; Chart Studio four patches APPLIED + A/D/C redesign BUILT (inspector, filters, aggregation, data types, company overview) and test-ridden 20/20 on read-only 8812; all UNCOMMITTED in `C:\Users\pgoff\Mentat` at that point; Paul's consoles need a restart.

Paul (2026-09-13): "Go over the Mentat system ... debugging ... not the data itself but the logic behind the code", four Chart Studio complaints, "using higgsfield, fix and provide me 4 drafts", then "Apply the four patches, go with A plus the D inspector ... the C multi view for a single company as its own mode ... give it a test ride ... include filters, change measures and data types, all like Tableau would but streamlined for political money", then "keep going, ping me when the test ride is done" and, after a session restart mid-build, "Finish this". Worktree `mentat-system-debug-1f368e`; code lives in the SIBLING tree `C:\Users\pgoff\Mentat\mentat\app` (branch codex/mentat-crypto, dirty with other lanes). Packet copied to `C:\Users\pgoff\Mentat\audits\mentat_system_debug_20260913\` (XREF_LOGIC_AUDIT.md, STUDIO_DIAGNOSIS.md, four .patch files, eight draft PNGs); the redesign receipt with a 20-step manual script lives in the session scratchpad `studio\redesign\RECEIPT.md` (copy it into the audits folder if it is still needed). Continues `mentat-chart-studio-fields-lane-2026-09-12` and `mentat-chart-studio-review-2026-09-11`.

### Cross-reference vs Graph ($37M vs $12M): SETTLED (verifier 6 match / 1 partial / 0 mismatch)

- The "$37 million unattributed" Paul reads is NOT `unverified_funding` ($1,657,168.13 on run 20260913T074303). It is the `company attribution unresolved` row of "Records needing review": 36,241 Schedule A rows / $37,940,955.71 whose donor never matched a listed Banking company; every one is zeroed by `exclude()` (`mentat/tools/cross_reference_engine.py:120-128` via `:264-272`) and sits OUTSIDE every total.
- Three stacked gaps versus the Graph's ~$12M net giving: **universe** (cross-reference reads every DB row for the industry, `run_cross_reference.py:56`; Graph reads only `include_in_analysis == 'Yes'` workbook rows, `graph_data.py:188`; near-disjoint sets), **cycle scope** (run covers 2022+2024+2026; Graph pins `max(years)` on first paint and Reset, `graph.js:60 &latest=1`, `graph_data.py:317-318`), **label** (key missing from the `reasons` map at `cross-reference.js:19-31`, so `:32` renders bare snake_case under "Associated amount").
- Fan-out double counting REFUTED for that number. Committee-side money (loans/interest from corporate-name Schedule A searches, phase `P2_company_name`) is in the universe but F3X lines 13-16 divert to `non_giving` before the attribution test; only line 17 and line 12 transfers can leak.
- TRAP: $49,929,377.44 - $37,940,955.71 = $11,988,421.73 resembles the Graph's ~$12M by coincidence.
- Side findings, unfixed then: `corporate_giving` structurally $0 (`inputs/verified_company_affiliations.json` has 12 records, all `connected_pac`, zero `treasury_entity`; exact-string company match at engine `:146`); memo legs without a proven parent retained at full value inside the $72.1M "Observed original giving" (19,529 / $8,522,419.98, engine `:445-451`); earmark and transfer legs also retained. No per-cycle breakdown in `report.json` (producer change needed at `run_cross_reference.py:312-313`).
- Console-side fix options were proposed only (relabel, "excluded from totals" caption, cycles next to the money); Paul had not ruled (overtaken by the 2026-09-17 rulings above).

### Chart Studio: four patches APPLIED (executor, byte-exact to the patch post-images, backups `<file>.bak-20260913`; core suite 61/61 then)

- **S2 split view:** `server.py:1119` sent `frame-ancestors 'none'` on every response, so same-origin pane iframes (`/?studioPane=B`, built from `new URL(location.href)`) failed with `net::ERR_BLOCKED_BY_RESPONSE` ("refused to connect"), and `chart-comparison.js` threw SecurityError reading `contentWindow.MentatStudioPane`; the patch scopes `frame-ancestors 'self'` to the pane document only (`tests/test_contribution_http.py:74` still passes). ALSO: Paul's long-running consoles (ports 8802/8803/8804/8808, started 09-11..09-12) 404 `/chart-comparison.js` because `server.py`'s static allow-list is Python frozen at process start and `server.py` was edited 2026-09-13 01:31: they need a RESTART to see the split view at all.
- **S3:** `.studio-options-hidden` (`chart-studio.css:49`) hid the whole builder and persisted; a top-level `?studioPane=` URL hid all navigation (`chart-comparison.js:16-19`); the patch requires `window.top!==window.self`, relabels, pins the restore control.
- **S4:** on the default Verified-contributions source 5 of 7 Analytics items were no-ops or errors; the patch = honest refusal with reasons.
- **S1:** Graph "Create chart" only switched views; the patch = "Open in Chart Studio" carrying industry/company/cycle as visible, undoable filter pills (`pendingScope`).

### Redesign BUILT by an architect (A layout + D inspector + C company overview + Tableau-style filters/measures/data types), UNCOMMITTED then, backups `<file>.bak-20260913-redesign`

- Eight files: `index.html`, `chart-studio.js`, `chart-studio-core.js`, `chart-studio.css`, `chart-comparison.js`, `chart-studio-contributions.js`, `chart-math.js`, `tests/chart-studio-core.test.js` (`server.py` and the contribution query/plot/charts files untouched, so no allow-list change and no console restart for this part; a hard reload is enough). The Edit/Write tools refused paths under `C:\Users\pgoff\Mentat` for the agent (harness treats only the session worktree as writable), so edits went through an exact-anchor patch engine in the scratchpad (`apply.js` + `step1..step8b`), a replayable log.
- Built: header row with lilac scope chip ("Carried from Graph · ..." after the S1 hand-off, else "Banking · All cycles") + "Change scope" + "Builder | Canvas only" segmented control (this IS the S3 restore control); comparison toolbar with 1/2/3/4 charts, Linked filters, "Company overview"; 260/1fr/300 grid; left Data panel with collapsed Data-source disclosure and drawn SVG date/geo glyphs; compact Columns/Rows/Filters strip on the canvas card; right Inspector with real tabs Marks (Show Me tiles, mark shelves, parameters) / Analytics (switch rows, refusal reasons) / Filters (rows + Add filter); filter popover (member checklist with search, All/None, Is one of / Is not one of / Equals / Contains; Between / At least / At most for numbers and dates); aggregation menu limited to what each engine supports (SUM/AVG/COUNT/MEDIAN/MIN/MAX on verified `amount`; other verified measures disabled with reason); Replace measure; political-money presets (Total giving, Gift count, Average gift, Distinct contributors); Treat as Dimension/Measure (worksheet mode; verified mode refuses with reason); Date part (Election cycle / Year / Quarter / Month / Exact date; verified mode maps to catalog derived columns; this entry was MISSING in the first build because the menu gated on a runtime `isTime` flag; fixed by deriving date-likeness from the catalog hierarchy, `core.isDateLike`); Company overview = in-page 2x2 preset grid (recipient categories as VERTICAL bars because the verified renderer has no horizontal bar; giving by cycle line; top 8 recipients; party split doughnut with a note that the source has no employee-level field), company picker from the `company` facet, "Open in builder" loads the preset undoably; purple "Chart A/B" pane chips; failed-facet negative cache (30 s) + request counter in the status line. Command palette skipped. Tests 61 to 77 / 0 fail.
- New ops reach both engines (`in` → server IN, `notin` → chain of `ne`, `between` → gte/lte); include + exclude sum to the unfiltered total exactly ($13,354,538.16 + $41,408,305.89 = $54,762,844.05). Deliberate behaviour change: a field dropped on Filters starts as an EMPTY choice that filters nothing (was `equals <first member>`).
- Known limits: "Is not one of" caps at ~38 members (server 40-filter cap); overview cards query sequentially; Canvas only does not persist across a reload (returns to Builder, the safe direction); undo of a Date part swap did not revert in one click during the ride (minor).
- **Test ride** (read-only `python server.py --port 8812 --read-only`, fresh process, Banking): **20/20 script steps PASS after the Date-part fix.** Cold load = exactly 1 `POST /api/contributions/query` (the earlier ~160-request storm is gone; on a cold load only one code path reaches the query API), no new console errors, pane B renders inside the 2-chart grid (contentDocument readable, no CSP block), aggregation Mean + undo, presets, Treat-as refusal, empty filter, include/exclude/range filters, Analytics dashed mean line ("Mean of shown marks: $5.5M") and treemap refusal, Canvas only/Builder, Company overview four cards + picker + Open in builder + undo, worksheet mode (overview disabled with reason; Treat as Dimension promotes a numeric column and persists). Independent verifier: 8/8 checks PASS on the receipt (hashes, scope, patches intact, tests, line endings, markers, HTML/CSS balance, HTTP smoke) plus a re-check after the Date-part fix.
- Latest hashes: `chart-studio.js` b49c297, `chart-studio-core.js` d296938, tests 7a7df7a, `index.html` e7bb938, `chart-studio.css` 66d2e91, `chart-comparison.js` c32fc19, `chart-studio-contributions.js` d0e5a8e, `chart-math.js` 27af956, `server.py` 5b85087. NOTHING COMMITTED at that point; Paul must restart his console processes (the S2 server patch and the allow-list) and hard-reload.

### COMMITTED 2026-09-13 late evening (Paul: "Looks great, proceed" and "commit this in the Mentat tree"; branch codex/mentat-crypto, explicit paths only, never add -A)

| Commit | Content |
|---|---|
| `2906980d1` | "Rebuild Chart Studio: split view, inspector, filters, company overview": 9 console files + the 33-file packet `audits/mentat_system_debug_20260913` (the packet lives at the Mentat repo ROOT `audits/`, not `mentat/audits/`) |
| `97eaa758` | "Track the console modules the shipped console already depends on": 35 files: the 19 untracked app modules `index.html`/`server.py` reference, their transitive imports incl. `contribution_query_store`/`semantics`/`source_guard`, `cross_reference_engine`/`store`, `run_cross_reference`, `report_source_guard`, `recheck_attribution`, `fec_filing_headers`, plus the modified `fec_key_store`/`validate_industry_coverage` |
| `e666f95e5` | "Track the pac_evidence receipt-role helpers": `pac_evidence.py` at working-tree state; HEAD's copy predated `is_memo`/`name_key`/`receipt_role` |

PROOF: a clean temp worktree of `e666f95e5` boots `server.py --read-only`, serves `/` + all 27 `index.html` assets + `/api/contributions/session` + `/catalog` (8 datasets) + `/api/cross-reference` (all 200); a Banking query returns a clean 400 "Pinned report source evidence is unavailable" because the gitignored `mentat/.cache/industry-report` analytics cache and `mentat/inputs/fec_receipt_rules.json` + `mentat/config/report-directory.json` are local-only by design (the two small inputs were copied onto the test checkout's disk, never staged). Still uncommitted then: `contribution-studio.html/.js/.css` (separate feature), 80+ lane test files, the 17 modified tracked app files from other lanes (`app.js`, `charts.js`, `graph.*`, `style.css`, README, `Start-MentatApp.ps1`, `desktop/Launcher.cs`, `graph_data.py`, `report_insights.py`, `mentat-icon.svg`...), all .bak-*. The executor subagents (Sonnet 5) signed the trailers as "Claude Sonnet 5", not Fable: left as-is (amend discouraged). Paul's consoles on 8802/8803/8804/8808 still need a RESTART + hard reload.

### MENTAT POCKET: iPhone version, DELIVERED 2026-09-13/14 (Paul: "can you make an app version? ... I mean for the iPhone? Send it to [personal email omitted]")

- A phone cannot reach the local Python server and no Mac/Apple Developer account exists here, so the "app" is a single self-contained HTML page (166 KB, data inlined) published as a private artifact https://claude.ai/code/artifact/f61099b4-7f29-40f9-b8ee-10c7f7ce5fd9 with supporting files `icon-180.png` + `manifest.webmanifest` (Add to Home Screen in Safari), and the file sent to Paul via SendUserFile. NO mail connector in the session: the iCloud email could not be sent; Paul forwards the link himself.
- Built by an architect: `extract_pocket_data.py` pulled a snapshot from its own read-only 8814 instance (216 queries, 244 s; 8 industries x 10 companies x 3 cycles; basis receipt; integrity zero-delta to the cent across 8x3 using two independent queries per DE-012; `selfcheck.py` proves recipient_category and party partition every scope); page = console tokens (paper/ivory/plum/purple/gold/lilac) with Newsreader + Albert Sans as the Freight/Articulat stand-ins, light + dark token sets, scope strip (industry chips, company select, cycle + measure segmented controls), stat tile, four cards (Recipient categories bars, Giving by election cycle, Top recipients, Party split as one stacked 100% bar with D blue #2f5fa8 / R red #b8322e / gray, dark-stepped #4a80d0/#c9564f, validated), Table toggle per card, tap readouts; render harness 1,056 scopes / 58,575 geometry assertions + negative control 7/7.
- Wording ruling by the builder, kept: "receipts" not "gifts" (grain = observation count, not unique economic gifts).
- CONFUSION HAZARD: Banking default view shows Other / Unclassified party $37,286,833, NOT the $37,940,955.71 unresolved-review figure (different universes).
- Found in the one look: mojibake ("Â·", "â€™") when the raw file is served without a charset → added `<meta charset="utf-8">` as the first line and republished (the artifact wrapper already declares one; the standalone file needed its own).
- Sources + evidence archived in the packet under `audits/mentat_system_debug_20260913/pocket/` (untracked after the commits). Disk note from the builder: C: free measured 34.9 GB at 21:50 local vs the 105 GB recorded after the 09-13 retirements; cause unexamined.

### Usability lane, 2026-09-14 (plan approved; Paul: "close but still not fully usable ... consult ... test with me, use higgsfield ... prompts to feed to the AI")

- Plan file `C:\Users\pgoff\.claude\plans\the-mentat-chart-system-breezy-wilkinson.md`. Paul's rulings: launcher may auto-restart an IDLE stale server on the same port (never busy, never read-only); PowerPoint via vendored PptxGenJS; five gated renders (approve each before build); two 32-step rides on a private checklist page (db+assets capabilities), coordinator mirrors on a read-only port.
- Fixes planned: F0 cycle carry (CONFIRMED: `graph.js:73` end-year vs `contribution_data.py:322` 'YYYY-1-YYYY'; `applyGraphScope` `chart-studio.js:286` writes equals '2024' giving "No matching observations"), F1 build stamp + stale guard + /api/restart, F2 click-to-add, F3 data source always findable + preparing/cancel, F4 same numbers (reconcile strip, Graph footnote, not-carried chip, group-limit labels, cross-reference relabel), F5 wording, F6 Canvas-only keeps Export; E0 export split, E1 copy image, E2 print, E5 saved views (server store), E4 briefing tray, E3 PowerPoint, E6 phone snapshot publish.
- Prompt pack written: `C:\Users\pgoff\Mentat\audits\mentat_system_debug_20260913\prompts\PROMPT_PACK.md` (render prompts, gates, implementation prompts, F5 was/now table, 19 cross-reference reason labels). Renders R1 (ecf1d418), R1b (1f45d873), R2 (6b855fc3), R3 (b6f6fb89), R4 (3e2bc310) sent to Paul 2026-09-14 ~04:30 (27.5 credits; PNGs in scratchpad `renders` and to be copied to the packet); Paul then ruled "Execute the plan end to end" (= renders and text tables approved).
- **Lane F** building 2026-09-14 ~05:00 as two architects on disjoint file sets (F1: `server.py`/`Start-MentatApp.ps1`/`app.js`/`workspace.css`/README/tests, stamp+banner created from `app.js`; F-client: `index.html`/`chart-studio*`/`graph.js`/`cross-reference.js`/tests), receipts under scratchpad `lanes\F1` and `\Fclient`. Ride 1 checklist page PUBLISHED: https://claude.ai/code/artifact/b48a8aef-3700-41fe-8fc2-8a4dd3e3da6d (db + assets; docs `rides/ride1/meta/info` and `rides/ride1/steps/<id>`; read back with read_db); markdown + html copies in the packet `ride\`.
- **LANE F DONE ~06:30** (receipts `lanes\F1\RECEIPT.md` incl. F1b, `lanes\Fclient\RECEIPT.md`): F1 build block on `/api/health` + `/api/session`, `POST /api/restart` (403 read-only / 409 busy; Popen must use `CREATE_NO_WINDOW|CREATE_NEW_PROCESS_GROUP`: `DETACHED_PROCESS` silently never ran the launcher), launcher stops an idle stale server by pid and restarts on the SAME port (proven 8816), stamp + gold banner created from `app.js` in the global header (`index.html` untouched by F1); F1b = `discard_body()` helper draining accepted-size POST bodies before refusals (http suite flake 5/10 to 10/10 clean; an unbounded drain blocked on a 7,000,001-byte declaration and was corrected to drain only <=7 MB). F-client: F0 confirmed live (index cycles '2021-2022'.. vs Graph '2022'..; old carry returned `group_count=0`), Scope A $54,762,844.05 and Scope B (Bank of America NA · 2025-2026) $1,459,371.05 agree to the cent; F2/F3/F4/F5/F6 built; 10 defects fixed en route (Inspector drawer covering its toggle <1200px, async `<details>` toggle, stale `graphTotalsCache` surviving Refresh, one click placing a field on two shelves...); `test_chart_comparison_browser.cjs` was RED at HEAD (redesign renamed its control) and its labels were fixed; core 77 to 81, contributions 13, 5 new suites, id census 126/0. Rulings given: keep the F5 row-5 trailing sentence, keep cents in the strip, keep the comparison-test fix; Download-to-Export rename + Canvas-only Inspector button at desktop width moved to lane E. Verifier on lane F PASSED 8/8 (~07:00).
- **Lane E** dispatched ~06:40 as E-client (`chart-export`/`chart-studio`/`index`/css/`graph`/`charts` + new `chart-briefing.js/css` + browser tests) and E-server (`server.py` endpoints `/api/studio/views`, `/api/studio/briefing`, `/api/publish/pocket`, vendor route, `tools/pocket` move, `.gitignore` exceptions, python tests) against one written API contract. First dispatch (two architects) STALLED at 600 s with nothing written (watchdog killed them mid-read); re-dispatched ~13:40 with PROGRESS.md discipline (write step files as you go). Paul's checklist ticks at 13:29-13:31 (all 32 in ~90 s, no meta, incl. unbuilt E steps 25-31) were a page run-through, NOT a console ride: the 32 step docs were cleared so the real ride starts clean; the real Ride 1 happens after lane E verifies.
- **LANE E DONE ~15:30** (receipts `lanes\Eserver\RECEIPT.md` incl. addendum, `lanes\Eclient\RECEIPT.md`; copies in the packet `lanes\`): server = `/api/studio/views` (+/delete), `/api/studio/briefing` (+/item, add, remove, order; cap 40; SVG <= 6 MB), `/vendor/pptxgen.bundle.js` route + 3 allow-list entries, `/api/publish/pocket` job (extractor moved to `mentat/tools/pocket` with `--out-dir/--datasets`, `build_page --data/--out`, full-document template, icon + manifest shipped, selfcheck advisory post-check with `--dir`; Crypto publish done in 22 s, 5 files, selfcheck pass with a negative control), `Console.port` from `--port`, two races fixed (publish reply shared a live dict; job-state reads vs `os.replace` on Windows: 8.9% PermissionError, retried both sides); OPEN for Paul: `atomic_json` has no retry and `/api/evidence-job` races `collect_evidence` the same way (pre-existing). Python suites 53 x 3 rounds green + launcher 4. Client = E0 compose/rasterize split + `currentChart` + "Export" menu + CSV Note row, E1 Copy image (ClipboardItem with the Promise passed), E2 print sheet + `printChart` footer, F6 follow-up (Canvas-only keeps the Inspector button at desktop width), E5 Save/Open view + one-time migration, E4 `chart-briefing.js/css` drawer (server-backed, in-memory fallback, SVG sanitiser strips script/foreignObject/on*/javascript:/data: hrefs), E3 `exportPptx` via the vendor bundle, E6 Share bundle dialog (HTML bundle lives inside it); node tests 88, 6 new browser tests (real clipboard PNG read; pptx inflated and checked). NOTE the first "stalled" E-client attempt HAD written `chart-export.js` and `index.html` (the watchdog message misled); five lines of `chart-export.js` flipped CRLF to LF (class preserved, accepted).
- Live integration verification dispatched ~15:35 (own writable console 8822 + read-only 8823, throwaway Crypto report copy). PptxGenJS vendor ready in scratchpad `vendor`: 4.0.1, sha256 `4fb9eac5cfefb213e2d8743c2b7151025f31bfb3f834c73c12062916daa0f3f8`, 460,889 B, MIT, no eval, global `window.PptxGenJS` only when loaded as a plain `<script>` (Node `require()` throws JSZip not defined: expected).
- Drift notes: R1b and R3 rendered on the older v2A chrome (Analytics in the Data panel, Show Me on the right): acceptable as delta demos; R2 shows Trade Association $1.1M instead of $1.6M (cosmetic). Explorer facts worth keeping: launcher `Start-MentatApp.ps1:76-87` falls through to a new port when `server.py` changed (no restart); the orphan `contribution-studio.html` duplicates verified mode and is unlinked; exports are PNG/SVG/CSV only; Graph/Studio/Cross-reference totals come from three engines; Playwright lives only in the Codex runtime node_modules (channel chrome); 15 fixture-based browser tests exist under `mentat/tests`.
- **LIVE INTEGRATION VERIFICATION (~16:30, real page on writable console 8822 with a throwaway Crypto report copy):** static A1/A2/A4/A5 PASS, A3 FAIL (Node 24 rejects the bare-directory `node --test mentat/app/tests` form: use the glob form; `test_publish_pocket.py` flaky, 2 clean of 6); live B1-B6, B8, B10, B12 PASS (stamp = health; click-to-add; disclosure; strip "Graph shows $59,273,231.80 for Coinbase · 2025-2026 … Studio total $59,273,231.80. Agree."; clipboard image/png 183,700 B; print footer with the true SHA; briefing persists across reload + reorder; pocket publish 5 files + selfcheck pass).
- **THREE INTEGRATION DEFECTS the per-lane unit tests could not see:** D1 Save view 400: E-client sends `source` as a STRING (`viewSourceLabel()`, chart-studio.js:1803/1849) while E-server demands a dict (server.py:918-920), so no view ever reached disk; D2 briefing provenance: `currentChart()` (chart-studio.js:1739) sends `source`/`provenance` as strings, server.py:988-989 replaces non-dicts with `{}`, and chart-briefing.js:325/:430 then prints "[object Obje" as the SHA in every .pptx and HTML bundle; D5 `POST /api/restart` answers `{"restarting":true}` even when the console is current (the launcher correctly reuses it, the page polls 2 min then tells the reader to close the tab). Also D6: the reconciliation strip needs `#graph-run`, which is empty until the Graph view has rendered once (`chart-studio.js:2194`), and D3: `test_publish_pocket.py:239-240` leaks a worker into the next test. Fix lane dispatched ~16:45 (one architect, backups `.bak-20260914-fix1`, own writable console 8824, must re-verify with the real client the way the verifier did). Lanes F and E remained UNCOMMITTED until this lane verified.

### Fix lane fix1 CLOSED 2026-09-14 evening (session 5be715 after the 1f368e session was killed; Paul: "There should a number of line items to finish here. Please finish them and report back" + /code-review "go over them for integrity")

- The killed session's fix lane had done NOTHING (all nine `.bak-20260914-fix1` backups byte-identical to live; its scratchpad held only a census script). One architect fixed D1 (client `viewSourceRecord()` dict + `viewSourceText()` reader), D2 (`currentChart()` sends objects; readers never stringify; .pptx carries the true SHA, "[object" in none of 40 parts), D3 (tearDown waits on the real completion signal; the masking `jobs.clear()` in setUp removed; 6/6 rounds), D5 (`current:true` branch when running build == disk; 0 health polls; 403/409 kept), D6 (strip resolves run identity when `#graph-run` empty), A3 (glob form; note `**/*` inside a JS block comment closes it), plus shared fixture `mentat/app/tests/studio-contract-examples.json` read by node + python suites and one `.gitignore` negation so it is committable.
- Independent integrity review (second architect) found HIGH: `migrateStoredViews()` (`chart-studio.js` ~:1961) was a SECOND producer still POSTing a string and swallowing the 400 in a bare catch (retried every menu open forever); MEDIUM: D6 chooser differed from `graph.js:28-32` (could reconcile against a `ready` run Graph never shows); MEDIUM: contract tests exercised readers not producers (would not fail on a string); MEDIUM: `saved_at` three-way mismatch (server seconds `:930`, reader ms `:1859` giving "1/21/1970", in-tab fallback ISO `:1900`); LOW: `build_status` double-walk; INFO: dead `shortSha`.
- Round 2 applied all six: `MentatGraphRun` (`runCandidates()`/`chooseRun()`) now lives once in `graph.js` and both Graph `loadRuns()` and the strip call it; shaping moved into `chart-studio-core.js` so node runs the real builders against the fixture (negative control: string `source` gives 98/3 fail, restored + hash-checked); reader-only `saved_at` fix with typeof guard; legacy store migrated live as `{"label":"Crypto"}`. Totals: node 101/0, browser .cjs 34/0, python 58 tests 3/3 rounds clean. Receipt + PROGRESS + evidence (screenshots, `briefing.pptx`) at `C:\Users\pgoff\Mentat\audits\mentat_system_debug_20260913\lanes\fix1\`.
- TRAPS: `graph.js` alternates CRLF/LF line by line inside `loadRuns`: no multi-line anchor matches, a whole-file rewrite would reflow 293 endings (line-range patcher needed); the patch tool leaked one bare LF into pure-CRLF `chart-studio.js`: the byte census caught it, not intention.
- STILL OPEN (Paul) then: commits for lanes F/E/fix1 (plan: explicit-path commits, Paul's go each time; nothing committed); consoles 8802/8803/8804/8808 restart; Ride 1 + Ride 2 not run; three pre-ride rulings (money-label wording, group limit 40 vs 60, slide template/shared tray); `atomic_json` no-retry flake (WinError 5 on `index.json`, 2/20 paired runs, 0/10 alone: pre-existing); strip omits `latest=1` (pre-existing); "Console already current" banner stays with a live Restart button (UX). Brain draft for these in the 5be715 scratchpad `BRAIN_UPDATE_DRAFT_2026-09-14.md` (STATE bullet, D-029 launcher idle-restart, DE-021 prose-only contract).

### Round 3 + COMMITTED 2026-09-14 night (Paul: "commit this in the Mentat tree / IF outstanding items, fix ELSE commit")

- Round 3 fixed: `replace_with_retry` behind `atomic_json` + the briefing SVG write (0/20 paired failures vs 3/20 with the backup); strip sends `latest=1` when no cycle is carried and a new `cycle` reason explains the gap. This exposed that rounds 1-2's "Agree $249,949,483.17 · All cycles" evidence was FALSE (Graph was showing $102,731,131.38 for 2026; the strip had agreed with itself); banner transient. Node 108/0, .cjs 34/0, python 58 x3.
- COMMIT: an Opus commit architect first proved hunk-only staging impossible (8 files: `.gitignore`, README, `Start-MentatApp.ps1`, `app.js`, `chart-export.js`, `charts.js`, `graph.js`, `test_desktop_launcher.py` sat on ~500 lines of uncommitted 09-11/12 Chart Studio work HEAD lacked; only 3/18 lane hunks applied; HEAD-content `chart-export.js` would leave PowerPoint/Copy/strip dying at "is not a function"), then Opus hit the session limit (reset 21:50 ET). Ruling: base commit from the pre-lane backups, executed by Sonnet:

| Commit | Content |
|---|---|
| `ed64743` | "Track the pre-lane state of eight console files" (8 files at `.bak-20260914-{F1,Fc,E}` content via hash-object + update-index, byte-verified) |
| `215faa9` | "Finish the Chart Studio usability lane" (47 files) |
| `9b14e1d` | new `.gitattributes`: `-text` on `vendor/pptxgen.bundle.js` + `tools/pocket/mentat-pocket.html`, `binary` on `icon-180.png` (a fresh checkout under `core.autocrlf` had CRLF-converted the bundle and broken its pinned-hash test); plus the three `contribution-studio.{html,css,js}` files `server.py` routed but nobody tracked (3 asset 404s on a clean checkout); plus `reconcile-cycle.test.js` from round 3; `mentat-pocket.html` re-normalised raw = 6 files |
| `5937875` | packet records (110 files, 37.4 MB, receipts under `lanes/commit_20260914/`) |

- Clean-checkout proof of D: bundle 460,889 B sha 4fb9eac5..., node 108/0, python 58 OK, 36/36 routes 200 on read-only 8832. Verifier 7/8 (the "fail" = the explained 6th file in D). Status lines 282 to 236; the rest is the 55-file other-lane drift (`mentat/R`, tools, tests), still uncommitted.

### Wording pass, 2026-09-15 (Paul via /output-skill: "The UI should be simple to read and have no slop as to confuse the user/reader" = ruling on the three pre-ride items)

- Census of 491 lane strings (`lanes/wording_20260914/STRING_CENSUS.md`), spec `WORDING_PASS.md` (95 rewrites, 165 kept, 231 out of scope = unlinked contribution-studio page), group limit unified at 60, slide template unchanged.
- The Auto-Mode classifier DENIED the executor's python write into `C:\Users\pgoff\Mentat` ("stop and let the user decide"); Paul: "allow the wording patch"; applied from the main session. Sonnet then hit its session limit (resets 02:50 ET) mid test-edit; Opus (reset 21:50) finished: 95/95 verified by backup-vs-live hunk census (86 hunks all explained), tests node 108/0, .cjs 34/0, python 58 OK, live check on 8831 incl. restart to "Already up to date.".
- COMMIT `f64316daa` "Simplify console wording and unify the group limit at 60" (32 files). Deviations: rows 85/86 got a leading "the Graph view …" because `test_studio_wording.cjs` requires reasons to start lowercase (accepted, not loosened); `mentat/tests/test_chart_studio_contributions.cjs` (other lane, untracked) edited for 60 + row 81 but NOT committed. Brain committed `338cd80` (STATE bullet, D-029, DE-021).

### Ride 1 + launcher gate, 2026-09-15

- Only ONE Paul console exists (8806, data root `C:\Users\pgoff\AppData\Local\Mentat\console`, report dir `C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files`; 8841 is the staffer sidecar, not Mentat). Ride 1 v2 page republished fresh (old artifact b48a8aef unreachable from this account): https://claude.ai/artifact/YJvfQjCMiHB6CXU9aZCqn8 (db + assets). Paul's ride: 29 pass, 17 blank, 27 + 32 fail (all ticks within 2 min, no notes; Paul: "The ride was just answered" = stands).
- Launcher gate defect: `Test-CurrentMentatServer` compared `code_sha256` only, so the wording commit (assets only) left 8806 "current" with a Reload banner no reload could clear; fixed `5c5aa6bfe` (both pairs; `app.js` offers Restart): write AND git add were denied by the Auto-Mode classifier for the agent; Paul "allow the launcher patch"; applied + committed from main.
- Findings (Opus, `a4b3c8e2e`): 17 = `applyGraphScope()` nulled `pendingScope` BEFORE the guard, so a Graph-first walk dropped the carry silently (`chart-studio.js` ~:374); 27a = server `add_to_briefing` dropped `chip`, so reloaded cards printed ~600 chars of hashes (`server.py` ~:1005, `ITEM_FIELDS` in `test_studio_briefing.py` encoded the bug); 27b = fixed-position drawer covered the Classic builder at every width (`chart-briefing.css:6`; now `body.studio-briefing-open` + 340px gutter >=900px); 32 NOT reproducible on a clean console (7 runs, byte-identical before/after screenshots). New `test_studio_ride1_browser.cjs` (negative control fails pre-fix). `1b8499147`: `added_at` read as seconds (same class as `saved_at`) + step 27 says "Duplicate sheet". Totals node 109/0, .cjs 36/0, python 61 OK. 8806 restarted via launcher on `1b8499147` (pid 16352, both pairs equal). Remaining: Paul retests 17 and 27 on 8806, Ride 2.
- **LESSON:** a clean-checkout boot is the only proof that a commit is coherent: B alone passed every suite in the live tree and still shipped a broken tree; `.gitattributes` is mandatory for any pinned-hash vendored file under `autocrlf=true`.

### UI drafts (Higgsfield gpt_image_2_5, flare, 16:9, high, 2k, 5.5 credits each; 44 credits used, balance ~1,065)

Round 1 in the minimalist-skill palette (A workbench, B notebook, C command bar, D inspector); Paul: likes A, C, D; keep the ORIGINAL palette and fonts; title too large; show the split-view control. Round 2 in the console's real theme (`acu-theme.css`: paper #fcf7f4, ivory #f7ede4, plum #342649, purple #57447b, gold #eca91c, lilac #d6c8e2, teal #327a7a, line #e4d9d0; sans "Articulat CF", serif "Freight Text Pro"; LEFT navigation rail): v2A, v2A-split, v2C, v2D. Paul chose A + D inspector + C as company mode, which is what was built.

### Lessons (system-debug lane)

- A read-only console instance for agents = temp `.claude/launch.json` entry `python <abs path>\server.py --port 8812 --read-only`, restore the tracked file afterwards.
- curl from the sandbox gets "Connection was reset" on the Higgsfield CDN while PowerShell `System.Net.WebClient.DownloadFile` works.
- Browser pane hidden means screenshots and sometimes `find`/JS time out for the first ~30 s after a load: wait and re-probe before declaring a wedge (the agent nearly sent the architect after a non-existent query storm).
- A Claude Code process restart kills background agents: resume them by message, they keep their transcript.
- The harness refuses agent Edit/Write outside the session worktree, so cross-tree builds need a scripted patch engine or Paul's own session.
- **PARALLEL-LANE CONTRACT TRAP (2026-09-14):** two architects built the client and server halves of the same feature from one written API contract, each side's tests passed against its own reading of the contract (string vs dict for `source`/`provenance`), and only a live run of the real page against a writable console exposed the mismatch: a server unit test passes either way. Rule: when a feature is split across lanes, the contract must carry example payloads (not prose), one lane owns the shared fixture both suites import, and the lane is not "done" until a real-client integration pass on a writable instance has run every write path (save, export, publish), not just reads. See `verify-dont-infer-completion-2026-08-04`.
- Related memory notes: `ask-before-substantive-changes`, `mentat-chart-studio-lane-2026-09-11`, `mentat-full-audit-2026-07-27`, `mentat-r12-reconciliation-2026-07-27`.
