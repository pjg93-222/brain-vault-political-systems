---
type: topic
title: "Mentat collection and attribution"
aliases: ["Mentat collection and attribution"]
category: "bugfix"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "mentat-console"
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

## Parts

- [[2026-07-bugfix-mentat-collection-and-attribution-standing-rules]] — Paul's standing feedback rules for Mentat collection: never change money or receipt-counting code on inference, the roster and raw-sheet rules, the shared-checkout law and the zero-row crash class.
- [[2026-07-bugfix-mentat-collection-and-attribution-july-build-and-ship]] — How the Mentat FEC pipeline was defined, built, reviewed and shipped from 2026-07-18 to 2026-07-24, from Paul's founding decisions to the 07-21 fleet halt and the pagination-shortfall policy call.
- [[2026-07-bugfix-mentat-collection-and-attribution-july-hardening]] — The July 2026 hardening of the Mentat pipeline (07-22/23): corruption defects re-tested, acronym-variant collisions, the override matcher fix, lineages and the CRLF trap, the Fintech ordeal and perf round 2, plus the load-bearing review findings.
- [[2026-07-bugfix-mentat-collection-and-attribution-audit-r12-trade-association]] — The six-agent Mentat audit of 2026-07-27, the R12 reconciliation and the trade-association $0 gap, which turned out to be the same defect as the ~$163k Candidate swap and was fixed at read time in report.R.
- [[2026-07-bugfix-mentat-collection-and-attribution-september-collector-lanes]] — The September 2026 Mentat collector lanes: worker scaling (09-09), the every-lane-failing collector outage of 09-17/18, and the two API-key stores.
- [[2026-07-bugfix-mentat-collection-and-attribution-cross-verification]] — The contradictions-not-ambiguity rule for Mentat cross-verification (D-040, 2026-09-17) and the cross-reference versus workbook council review that left the cross-reference tab dwarfed.
- [[2026-07-bugfix-mentat-collection-and-attribution-system-debug-lane]] — The Mentat system-debug lane of 2026-09-13 to 09-15: the $37.9M unattributed figure settled as a review bucket, Chart Studio patches and redesign, and the usability lanes with their commits.

## Context

[[mentat]] is Paul's FEC contributions-intelligence project (R+API collection pipeline, workbooks, local console). This topic holds the collection and attribution side of its history: the 2026-07-18 pipeline build, the 2026-07-27 full audit and R12 reconciliation, the 2026-09 worker-scaling and collector-outage lanes, the cross-verification rework, and the standing rules Paul set about what Mentat may count and what code may change.

- The pipeline and its tooling are [[mentat-fec-pipeline]]; the console that exposes the results is Mentat console (the 2026-09-13 system-debug lane and the xref tab live there).
- The decision-maker for every ruling here is Paul Goff. Change-control rules (ask before substantive changes, explicit per-change approval) are in Change control and Paul's decision authority.
- The cross-reference rule is its own concept: [[exclude-on-contradiction-not-ambiguity]]; the council review that produced the dwarfed cross-reference tab: Mentat cross-reference council review.
- Status is `in-progress` because the collection/attribution layer is live and several items are still open with Paul (see Next Steps).
- Where the sources use a memory-name cross-reference, it is written here as a code name, for example `ask-before-substantive-changes`; those are memory notes, not vault entities.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| Mentat console | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| [[mentat-fec-pipeline]] | Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat |

## Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Related Concepts

- [[exclude-on-contradiction-not-ambiguity]] - Brain D-040: exclude a row only when its own evidence contradicts the attribution; missing or ambiguous info is flagged, not excluded.

## Related Topics

- Change control and Paul's decision authority - Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code.

## Related Discussions

- Mentat cross-reference council review - 2026-09-17 council: cross-reference does not minimise vs workbook (Banking $72.1M vs $54.8M); Paul ruled it redundant and kept it dwarfed.

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

- **Money-collection and receipt-counting code is frozen** (2026-09-27, Paul). Never change it unless Paul explicitly approves that specific change. Superseded: the 2026-09-26 rule changes (`0ce240d9e`, `504d2cfd1`), reverted in `7a31f8ae2` (see Standing rules in [[2026-07-bugfix-mentat-collection-and-attribution-standing-rules]]).
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
- ~~"api_request_budget has no key column"~~ (2026-07-21 claim) - refuted 2026-07-22 (schema always supported multiple budget rows; the CODE hardcoded `budget_id='openfec'`); see Corrections in the July pipeline section in [[2026-07-bugfix-mentat-collection-and-attribution-july-build-and-ship]].
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
