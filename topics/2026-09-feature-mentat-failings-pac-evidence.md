---
type: topic
title: "Mentat failings lanes and PAC evidence"
aliases: ["Mentat failings lanes and PAC evidence"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[mentat-console]]"
  - "[[mentat-fec-pipeline]]"
objective: "Close the Mentat failings packet (S0 2026-09-15) lane by lane: contributor street columns (S2), PAC evidence ingestion and readers (S3), cross-industry addressing (S4), URL-scoped navigation (S5), PAC evidence panes (S6), committee categories (S7), district map (S8), then the 2026-09-25 PAC map downstream audit with boards 44-55 and the F/C/J fix lanes."
created_at: 2026-09-16
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-map-downstream-viz-lane-2026-09-25.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-map-downstream-viz-lane-2026-09-25.md", sha256: "0fcda1900a836706033872f85cb6e6351173f1e06695886b91908cb7c93db1e3"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-failings-lane-s8-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-failings-lane-s8-2026-09-18.md", sha256: "8a70ed9313cff21105ecc43c13d0d3669f4dd190ac52e730489cd759d2b27936"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-failings-lane-s3-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-failings-lane-s3-2026-09-16.md", sha256: "80395640a09ae3c0e092edd150fd03d861717f762ab248b6e7d2669b90f384fe"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-failings-lane-s4-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-failings-lane-s4-2026-09-16.md", sha256: "6bb6ba676282e8e7de9b86e37c5070284cf3e5d8b3d9d85e71f0ae04d9cd0282"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-failings-lane-s5-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-failings-lane-s5-2026-09-17.md", sha256: "69e234cdb3704644839f282943958253873f982588917f9d5dea6636ce9e02d2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-failings-lane-s6-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-failings-lane-s6-2026-09-17.md", sha256: "7b0862af83290e8c9365f2f6b7a4fe42925d28f93a25a69196c73435eae2f71a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-failings-lane-s7-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-failings-lane-s7-2026-09-17.md", sha256: "90809c5b0c1949689f353b8fab95bca8650020f34735b4158048131416d42103"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-failings-lane-s2-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-failings-lane-s2-2026-09-16.md", sha256: "3f92f6f68637d048e5f4c9de6d0aecc9219bb5abd0ec209f06ca6ce30b893a81"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/frontend", "category/feature"]
---

# Mentat failings lanes and PAC evidence

> One topic for the whole Mentat failings lane S2-S8 (2026-09-16 to 2026-09-18) and its sequel, the PAC map downstream-viz audit (2026-09-25 to 2026-09-27). Code lives in `C:\Users\pgoff\Mentat` on branch `codex/mentat-crypto` (the console is [[mentat-console]]; the collection side is [[mentat-fec-pipeline]]; project [[mentat]]; owner Paul Goff).

## Parts

- [[2026-09-feature-mentat-failings-pac-evidence-street-columns-addressing-navigation]] — Mentat failings lanes S2, S4 and S5 of 2026-09-16/17: contributor street columns, cross-industry addressing, and console navigation and linking.
- [[2026-09-feature-mentat-failings-pac-evidence-pac-evidence-ingestion]] — Mentat failings lane S3 of 2026-09-16/17: ingesting PAC evidence from FEC filings into the Mentat console, with its money rules and caps.
- [[2026-09-feature-mentat-failings-pac-evidence-pac-evidence-readers]] — Mentat failings lanes S6 to S8 of 2026-09-17/18: the PAC evidence v2 panes and compare view, committee categories, and the district map.
- [[2026-09-feature-mentat-failings-pac-evidence-pac-map-viz-lane]] — The PAC map downstream audit and visualisation lane of 2026-09-25 to 09-27 as recorded in the failings topic: boards, builders, rulings, fidelity and the money revert.

## Context

- Lane shape: a seven-session "Mentat failings" lane. The S0 packet is at `C:\Users\pgoff\Mentat\audits\mentat_failings_20260915\` (HANDOFF.md ledger, `patches\`, `receipts\`, `S4_DESIGN.md`, `S6_DESIGN.md`, `S6_MOCKUP_Main.dc.html`, `S6_MOCKUP_Map.dc.html`, `S7_DESIGN.md`). It was UNTRACKED at S2 start (precondition "committed by Paul" not met; Paul said continue); committed later as `11654f911` (Paul's own commit, 44 files incl. S2 receipts/patches/contract; needed `git add -f` because the root `.gitignore` eats `*.json`/`*.txt`). S1 = the collect lane (waived for S4 as disjoint files; S1's files `collect.R` / `fec_api.R` were routed separately).
- Working rules that bound every lane: sessions never commit unless Paul rules it ("Option 1, whole-file commit" for S2; "commit it, then go" for the packet); change control per `ask-before-substantive-changes`; model split per `reasoning-in-fable-code-in-opus-2026-09-16` (design and review by Fable, one Opus architect for code), `go-faster-directive-2026-09-16`, `review-in-fable-directive-2026-09-16`; ledger = HANDOFF.md per lane; patches cut hunk-exact (never whole file) because several lanes share one tree; Paul restarts consoles (8806 / 8802) and re-runs the launcher after commits; never bind 8802/8806/8808/8841.
- Tooling constraint recurring in every lane: from a Melange worktree session the Write/Edit tools REFUSE any path under `C:\Users\pgoff\Mentat` (outside the session worktree). Workarounds: raw-bytes Python patch scripts via Bash, scratch-copy + sha-receipted copy-back, or `cp` from the scratchpad; brief this in the FIRST prompt of an agent; never unquoted heredocs (`shell-heredoc-mangling-2026-08-19`).
- Other memories related to the lane (plain text): `mentat-tidy-workbook-lane-2026-09-14`, `committed-vs-live-drift-2026-09-13`, `verify-dont-infer-completion-2026-08-04`, `scout-census-traps-2026-09-13`, `mentat-system-debug-lane-2026-09-13`, `mentat-ui-cleanup-lane-2026-09-17`, `mentat-ui-polish-lane-2026-09-19`, `mentat-redesign-boards-2026-09-21`, `higgsfield-connector-account-trap-2026-09-17`, `ui-review-reconcile-2026-09-25`, `dont-be-jumpy-removing-money-2026-09-26`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| [[mentat-fec-pipeline]] | Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat |

## Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## History

Per-lane table (lane, date, commits, open patches, outcomes). Full detail for each lane is in the sections in [[2026-09-feature-mentat-failings-pac-evidence-street-columns-addressing-navigation]], [[2026-09-feature-mentat-failings-pac-evidence-pac-evidence-ingestion]], [[2026-09-feature-mentat-failings-pac-evidence-pac-evidence-readers]] and [[2026-09-feature-mentat-failings-pac-evidence-pac-map-viz-lane]].

| Lane | Date | Commits | Open patches | Outcomes |
|---|---|---|---|---|
| S0 packet | 2026-09-15 | `11654f911` (Paul's own, 44 files, committed 2026-09-16) | none | `audits/mentat_failings_20260915/` packet, design + HANDOFF ledger |
| S2 contributor street columns | 2026-09-16 | `d78cf0b8f` (16 files, 2884+/244-); packet `11654f911` | `patches/S2_street_columns.patch` (14 files), `S2_street_columns_collect.patch` (collect.R + fec_api.R) both committed via whole-file ruling; backfill `--apply` on production DBs awaits Paul | `contributor_street_1/2` added LAST to `contributions`, `bulk_candidates`, `corporate_giving`; exporters + workbook builder; `tools/backfill_contributor_street.py`; production dry run: S1 re-collect REQUIRED for repair DBs |
| S3 PAC evidence ingestion | 2026-09-16 | `303409192` (26 files, +8087/-103, 19:01 ET), `91fe7402a` (20:02 ET, 10 files), `21c9cab6d` (S3b, 16 files), browser-test follow-up commit (hash not recorded), `971d805fc` (S3c, 16 files), `a565216bf` (S3d), `522e3ad31` (S3e), `3fdfeae8f` (S3f, 6 files, +845/-3) | `S3_pac_evidence_fixes.patch` (9 files, applied); three proposed patches for unowned files (applied in `91fe7402a`); `patches/S3f_bulk_transaction_codes.patch` | on-disk evidence store, streaming upload, any file/path, Mentat workbook reader, HTTP/1.1 + calamine speed-up, lazy imports + launcher, FEC bulk TRANSACTION_TP ruling (table `verified: false`) |
| S4 cross-industry addressing | 2026-09-16 | none at memory time (UNCOMMITTED; Paul commits from the patch) | `patches/S4_cross_industry_contract.patch` | one `industry` parameter + registry + `build_stamp`; `GET /api/snapshots`; saved views persist `source.industry` |
| S5 navigation and linking | 2026-09-17 | `a7e09ed8c` (14 files, +2,506/-16); HANDOFF S5 section inside `522e3ad31`; `/scope.js` STATIC_ASSETS line inside `a565216bf` | none | URL query string carries the scope; `mentat/app/scope.js`; brain D-031 |
| S6 PAC evidence v2 (panes) | 2026-09-17 | none at memory time (UNCOMMITTED; Paul commits) | `S6_pac_evidence_panes.patch` (334,493 B, 17 file diffs; applies on HEAD `a9ed5c236`) | scope bar, up to 4 panes across industries, Compare strip; `evidence.js` replaces `evidence-csv.js`; Map button hidden until map landed |
| S7 PAC evidence categories | 2026-09-17 | `882f1f93f` (2026-09-17 12:59 ET, 18 files, +6,257/-75) | `S7_pac_evidence_categories.patch` (185,507 B, 15 diffs) applied hunk-exact | Fairshake was never excluded: 22 CORPORATE rows were unsupported; categories, type filter, search; Fairshake Receipts $177,980,393.39 |
| S8 PAC evidence district map | 2026-09-17/18 | `491570a0b` (27 files, +11,064); peer commit `965103db4` swallowed map markup/CSS | none | raised/spent heatmap by district, all spend reconciled to FEC summary; 2022 cycle = 118th vintage |
| PAC map downstream viz (D-049 and F/C/J lanes) | 2026-09-25 to 2026-09-27 | `814667ee8..fadd2c751` (six-commit kit), `0ce240d9e`, `72b65f2e4`, `4e6d04ad9`, `504d2cfd1`, `4f8f29610`, `d4ede9eef`, `0504124e3`, `034ace52e`, revert `7a31f8ae2`, `6225e6756`, `762eea6ce`, `533b4033e` | apply kit `outputs\pac-map-downstream-viz-20260926\` (executed) | boards 44-55 approved; GeoPandas + Census layers; Flow, Studio marks, maps; money-removal rules reverted by Paul 2026-09-27 |

## Decisions

- S2: street physically LAST in the table (not after occupation) because `merge_company_shards.ensure_schema_compatible` compares PRAGMA order and `ALTER TABLE` only appends; raw warehouse headers derive from PRAGMA order (option B), never a table rebuild; `fec_response_archive` (never deleted; checkpoints ARE deleted on store) is the durable record store.
- S2 commit ruling: Paul "Option 1, whole-file commit"; hunk-clean was impossible, so six files carry the contributor-id / evidence-archive lane's hunks in HEAD.
- S3: Paul "Apply all, and the cap should be way past 5 or even 50" -> MAX_BYTES 500_000_000, MAX_ROWS 5_000_000, KEEP_BYTES 1_000_000_000.
- S3f council ruling: FEC bulk TRANSACTION_TP -> channel table committed `verified: false` until Paul checks it on fec.gov; reusing the openFEC classifier REJECTED.
- S4: one `industry` parameter (label, slug accepted, echoed); slug rule = `contribution_data._slug` (underscores: `credit_union`); registry deliberately not memoized.
- S5 rulings (Paul: "Go with your recommendations on A, B and C, proceed", then "Commit and restart"): ruling C = replaceState only; ruling B = `graph_data.py` / `fec_beneficiary.R` carry foreign uncommitted hunks and are kept out.
- S6 rulings 1-7 (all the recommended options): one scope bar, chip row of panes, up to FOUR panes, Compare strip, `a.*`-`d.*` prefixed URL keys; Map button hidden until the map exists.
- S7 rulings (Paul, 2026-09-17): (1) CORPORATE folds into Receipts; (2) honour `Include in Analysis = No`; (3) FEC committee master fallback; (4) file category beats the master; (5) one type select plus a search box. Fable refinement: file value "Unclassified" is the absence of a classification.
- S8: 2022 cycle maps to the 118th vintage (not the 116th); `committee_state` needs the cycle; asset conversions match payee AND description.
- PAC map lane: Paul approved F1, F2, F4, F6, F7, F8, then C9, C10 (F11), F3, F5, F12 and "give Mentat its own venv" (lane V); 2026-09-26 afternoon "1. No 2. No 3. No 4. Yes 5. Yes" (H1-H3 No, S1/S2 Yes); standing rule "don't be jumpy removing money" (`dont-be-jumpy-removing-money-2026-09-26`); 2026-09-27 "The mentat money collection system is fucking perfect, don't change it" -> money-rule commits reverted.
- ~~Lane worked in the LIVE Mentat files for UI~~ (2026-09-26/27) - superseded 2026-09-27: UI lanes now work ONLY in worktree `C:\Users\pgoff\Mentat-wt\ui-finish-20260927` (junctions for `.cache` and `state`), landing by ff-merge, because G1 edited LIVE files while Paul's 8806 served them and broke his Flow.

## Next Steps

- [ ] Paul: verify `mentat/inputs/fec_transaction_types.json` against fec.gov and flip `verified` to true (S3f); next data rules: amended-filing de-duplication (AMNDT_IND/FILE_NUM, latest wins) and a reconciliation test against openFEC /totals.
- [ ] Paul: decide `backfill_contributor_street.py --apply` on the 10 run-lane DBs + banking-20260910; S1 re-collect REQUIRED for the repair DBs.
- [ ] Paul: commit S4 and S6 patches (receipts need `git add -f`), re-run the launcher after S6 (`evidence.js` new STATIC_ASSETS entry, `evidence-csv.js` gone).
- [ ] Paul: restart consoles 8806/8802 (S3 routes, S3f server code, S8, PAC map lane); re-run the launcher after S3e.
- [ ] S8 open: an all-cycles map draws nothing; the Compare strip has no "Top districts" row; S8b street-address geocoding lane with its Start button unbuilt.
- [ ] PAC map lane open for Paul: A1 Attributed Flow producer (new money logic); A2 rebuild the workbooks then restart 8806; A3 six stale `.pending` files (~27 GB); A4 H3 double-counts 236.207 BTC; A5 NON-CONTRIBUTION labels counted; A6 METHODOLOGY v6.
- [ ] Deferred polish: density curve, hexbin log colour scale, PAC map fit beside the Layer control, smaller layer menu; `/api/evidence-network` still 3-4 s for CULAC; `pac_evidence.receipt_role` perf (frozen money file = Paul's); #44 tooltip partly met.

## Corrections and superseded statements recorded in the sources

- ~~"S1 re-collect is NOT needed for street" (S2, 2026-09-16)~~ - corrected by the S2 production dry run: only true for the 2026-09-15 CU run; repair DBs need re-collect.
- ~~Evidence upload cap 50_000_000 bytes / 500,000 rows / KEEP_BYTES 250 MB (S3)~~ - superseded the same evening by Paul's "Apply all, and the cap should be way past 5 or even 50": 500_000_000 / 5_000_000 / 1_000_000_000 (`91fe7402a`).
- ~~S3b: non-CSV files refused by suffix~~ - replaced by the reader layer; the browser-test step 10 changed accordingly.
- ~~S3 evidence block in index.html with path box / Browse panel~~ - S3c restored the `91fe7402a` block with only the accept filter removed; path route and `/api/evidence-files` stay server-side, unused by the page.
- ~~Fairshake "excluded" from PAC evidence~~ (Paul's brief, S7) - false: its 22 CORPORATE rows were unsupported.
- ~~PAC evidence map 116th vintage for 2022~~ - 118th (S8).
- ~~Map button visible while map unbuilt~~ (S6 WIP) - hidden until the map landed.
- ~~J2 narrowed F13 to same-day parents~~ - reverted by J3 (the $15.5M memo text says "DISCLOSED ON LINE 11(A)").
- ~~Money-removal and NON-CONTRIBUTION fixes (`0ce240d9e`, `504d2cfd1`)~~ - reverted by Paul's 2026-09-27 ruling (`7a31f8ae2`).
- ~~UI lanes edit LIVE Mentat files~~ - worktree-only after 2026-09-27.
- Contradiction on H3: Paul's 09-26 "No" keeps FAIRSHAKE $5.175M/$6M bitcoin-proceeds rows as giving under D-040(c), while the assistant found H3's $11.175M counts 236.207 BTC twice (reported, not re-asked; open A4).
