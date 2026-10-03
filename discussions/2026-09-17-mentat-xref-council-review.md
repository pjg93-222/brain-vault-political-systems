---
type: discussion
title: "Mentat cross-reference council review"
aliases: ["Mentat cross-reference council review"]
date: 2026-09-17
summary: "Council review of Mentat cross-reference and workbook generation (4/4 finding): the cross-reference does NOT minimise versus the workbook (Banking $72.1M vs $54.8M). Paul ruled the cross-reference redundant, kept as a dwarfed tab for obvious outliers and clear refunds; the dwarfed tab, worksheet guards and a gate census were built and committed the same day, followed by Paul's contradictions-not-ambiguity engine rework and export-gate rework."
conclusions:
  - "Council (4/4): Banking workbook Total Giving (include==Yes) is $54,762,844.05 while cross-reference run 20260913T074303 'Observed original giving' is $72,103,655.70 (+$17.3M); the cross-reference does not minimise versus the workbook."
  - "Paul ruled the cross-reference redundant: it cannot capture the nuance of political giving; it may be maintained but at a dwarfed state only for obvious outliers or clear refunds (no totals)."
  - "Dwarfed tab built: digest.json per run, 'Clear refunds' + 'Obvious outliers', lede 'The published report workbook is the accounting of record ... it publishes no totals.'"
  - "Worksheet-mode guards built (Fact Type / View pills, committee-activity captions and grand-total refusal)."
  - "Gate census: 948 refusals / $192.0M under ruleset v4 (Crypto $187.5M); second blocker report.R:2032/:2051 street columns patched."
  - "Follow-up rulings: contradictions-not-ambiguity engine rework 'is the one'; 'Crypto's money is correct'; outliers should be relative; Apply (brain D-040); Delete (11 .bak files); NO reruns, census or rebuilds from a lane."
  - "Cross-session conflict with the 11:29 ET S3 ruling was resolved by Paul in favour of the contradictions-not-ambiguity principle; the dwarfed tab stands."
action_items:
  - "Paul to restart console 8806 (assets changed)."
  - "Paul to decide thresholds MENTAT_XREF_LARGE_RECEIPT_CENTS ($1M) and MENTAT_XREF_LARGE_INDIVIDUAL_CENTS ($100k): proposed defaults awaiting him (later superseded by relative outliers, see Follow-up rulings)."
  - "Paul to rule on the drafted ruling table R1-R17 for the export gate."
  - "Tidy patches P6c and P7b wait for the other lane's commit of report_insights.py (not rebaseable now)."
  - "README still describes the old cross-reference tab (dirty by another lane)."
related_topics:
  - "[[2026-07-bugfix-mentat-collection-and-attribution]]"
related_actors:
  - "[[mentat-console]]"
related_people:
  - "[[paul-goff]]"
related_projects:
  - "[[mentat]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-xref-workbook-review-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-xref-workbook-review-2026-09-17.md", sha256: "021da0602e497121689d8c530e023d4254655790849e2db083c21c0a3b6ddf1a"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/discussion", "domain/data"]
---

# Mentat cross-reference council review

> Council review and build, 2026-09-17: the Mentat cross-reference does NOT minimise versus the workbook (Banking $72.1M vs $54.8M); Paul ruled it redundant, kept dwarfed for obvious outliers and clear refunds.

## Context

Paul (2026-09-17, `/ecc:council` then `/ecc:python-patterns`): "review the cross-reference and spreadsheet generation ... it seems to minimize the amounts too much ... workbook generation should be fit for the way chart-studio reads"; then "Proceed with the recommendations, however, I disagree with the cross-reference ruling, it itself is redundant and cannot capture the nuance of political giving, It can be maintained but at a dwarfed state only for obvious outliers or clear refunds"; then "These need to hurry up".

- Worktree: `mentat-xref-spreadsheet-review-3f1ff0`; code in `C:\Users\pgoff\Mentat` (codex/mentat-crypto, HEAD `3fdfeae8f`, a peer S3 session committing concurrently).
- Packet: `C:\Users\pgoff\Mentat\audits\mentat_xref_workbook_review_20260917\` (REVIEW.md, RECEIPT_RULING_TABLE, COMMIT_PLAN, BRAIN_UPDATE_DRAFT, gate_census/, receipts/, tidy_rebase/).
- Continues `mentat-system-debug-lane-2026-09-13` (the $37.9M versus $12M settlement, see [[2026-07-bugfix-mentat-collection-and-attribution]]) and `mentat-tidy-workbook-lane-2026-09-14`.
- Project: [[mentat]]; the console that renders the tab: [[mentat-console]]; decision-maker: [[paul-goff]].

## Participants

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Discussed Actors

| Actor | Context |
|---|---|
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |

## Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Related Topics

- [[2026-07-bugfix-mentat-collection-and-attribution]] - Mentat collection and attribution history, Jul-Sep 2026: audits, key outage, review bucket, xref rule, frozen money code.

## Related Concepts

- [[exclude-on-contradiction-not-ambiguity]] - Brain D-040: exclude a row only when its own evidence contradicts the attribution; missing or ambiguous info is flagged, not excluded.

## Council finding (4/4)

- Banking workbook Total Giving (include==Yes) = $16,652,458.77 + $26,107,204.16 + $12,003,181.12 = **$54,762,844.05**.
- Cross-reference run 20260913T074303 "Observed original giving" = **$72,103,655.70** (+$17.3M). Components retained at full value: memo legs without proven parent $8.5M, transfers $5.8M, unpaired earmark legs ~$0.7M.
- Its -$61.4M "change" is against an unpublished $133.5M baseline, of which $41.8M (PAC view $22.8M, interest/non-giving $19.0M) the workbook also excludes.
- Only 1.6% of rows are FEC-verified; registers are already migrated into collect.R; Downstream Activity (Schedule B) is richer than its PAC view.
- Real blind spots: corporate treasury structurally $0 (no treasury_entity records), PAC outgoing $0 outside Banking, exact-string register match, calendar-vs-transaction-period cycle.
- Fintech run: baseline equals the Fintech workbook exactly ($9,803,891.31).
- `company_cross_reference_people()` in collect.R:871 is identity keys, unrelated to the cross-reference.

## Paul's ruling and what was BUILT

Built by an Opus architect, scratch-copy method, receipts in the packet.

**Dwarfed cross-reference tab**
- `tools/cross_reference_digest.py`: pure `build_digest` plus a read-only CLI over ledger.sqlite (Banking 849k decisions scanned in 32 s). The runner writes `digest.json` per run.
- `app/cross_reference_data.py` returns scope + digest only (no total-like key anywhere). Live-checked on a throwaway 8836 read-only console: Banking 641 unmatched negative adjustments / 4,778 non-giving reclassifications $76.5M (including the $10M BofA LOAN) / 24 large receipts (including a $1,058,200 individual at JP Morgan); Fintech 56/100/5; CU empty state; pointer path OK.
- `app/cross-reference.js` renders "Clear refunds" + "Obvious outliers" with the lede "The published report workbook is the accounting of record ... it publishes no totals."
- Thresholds `MENTAT_XREF_LARGE_RECEIPT_CENTS` $1M and `MENTAT_XREF_LARGE_INDIVIDUAL_CENTS` $100k were proposed defaults awaiting Paul (superseded by the relative-outlier rule below).
- Linked refunds are 0 on both runs (the engine's refund link needs `refund_of_sub_id` evidence the DBs lack); the engine writes `negative_amount_is_not_refund_proof` on decisions, not the review-queue name.
- Tests: python cross-reference 110 OK, node 163/163, S5 navigation 13/13, wording 10/10; three foreign tests lost one old-wording assertion each. README still describes the old tab (dirty by another lane).

**Worksheet-mode guards**
- `chart-studio-core.js` `defaultGuards`: pill `Fact Type = Recipient` / `View = Industry`, both require the value to exist. The hardening caught Banking's `Cycle Exceptions` sheet, whose Fact Type holds only `Exception`.
- `committeeActivitySheet` caption + grand-total refusal for Downstream Activity / Beneficiary Summary / Beneficiary Bridge / Transfer Paths.
- `groupWorksheets` (Data workbook listed first, hint when none published).
- Browser test `test_studio_worksheet_guard_browser.cjs` 3/3 on 8834 against the real Banking book.
- CORRECTION: the console's worksheet reader already drops Recipient List's Company-view rows (only 3,342 Industry rows reach Chart Studio), so the 2x doubling is an Excel-reader trap only. Downstream Activity exceeds the 50,000-row worksheet cap and cannot be opened in worksheet mode at all.

**Gate census** (read-only; R gate reproduced; twin-checked against pac_evidence.py, 0 verdict disagreements over 28,548 tuples)
- Refusals under today's ruleset v4: Banking 593 / $1.80M (NOT 2,070 / $20.7M, which was the 09-12 ruleset; 1,477 rows resolved by the 09-13 edit), Community Banks 11, Credit Arms 17, Credit Union 4, Crypto 80 / $187.5M, Fintech 94, P&C 53, Telecom 96; total **948 / $192.0M**.
- Crypto $187.5M breakdown: Coinbase to Fairshake blank-line rows $19.3M; BTC/USDC "previously disclosed" duplicates $132.5M; "NON CONTRIBUTION" $35M.
- 503 rows have NO description (form + line only); F13 (inaugural committee, $3.05M) is absent from the form map.
- Ruling table R1-R17 drafted for Paul.
- SECOND BLOCKER: `report.R:2032/:2051` select `contributor_street_1/2` unconditionally (commit d78cf0b8f) and no snapshot DB has them, so NO rebuild can start. Patch `gate_census/report_R_street_tolerant.patch` cut and proven: `git apply --check` clean; Crypto census identical through the real loader; real street values preserved on a live-run DB that has them.
- Banking DB lives at `.cache/report-repairs/banking-20260910/data/mentat.db` (sha 4abdea58...), not in the repair-20260910 set.

## Commits (2026-09-17, on Paul's "Commit", codex/mentat-crypto, explicit paths, peer lane's files untouched)

| Commit | Content |
|---|---|
| `d78265927` | dwarfed cross-reference (10 files) |
| `bd1bfd60a` | worksheet guards (4 files) |
| `937ea01f5` | tidy P5 via `git apply --cached` (index-only; the .ps1 working file keeps the other lane's hunks, so it still shows ` M`) |
| `00c3700d6` | report.R street tolerance |
| `f0181e523` | packet (markdown/patches/scripts/aggregate CSVs; row-level refused CSVs untracked) |

Committed blobs were py_compile / node --check / ps1-parse clean. Paul must restart 8806 (assets changed).

**Tidy patches P2/P5/P6c/P7b:** P2 and P8 are in HEAD. P5 was rebased onto HEAD by hand (`tidy_rebase/P5-rebased.patch`, `git apply --check --cached` OK, ps1 parse 0 errors) and is enough for a rebuild to write the companion. P6c and P7b are NOT rebaseable: P6c edits inside `worksheet_accounting()`, which exists only in the other lane's UNCOMMITTED report_insights.py (absent from HEAD); P7b sits in that lane's test region; they wait for that lane's commit. The Sonnet executor sent to rebase them made no progress in 80 minutes (rebased copies equal HEAD); the coordinator finished it in three commands. `rm -rf` of a scratch dir trips the GateGuard destructive gate: use a fresh dir name instead.

## Follow-up rulings (same day, after the commits)

- "'contradictions, not ambiguity' engine rework. This is the one" (the S3 principle governs; the dwarfed tab stands, no totals). See [[exclude-on-contradiction-not-ambiguity]].
- "Crypto's money is correct" (the Coinbase to Fairshake/CLF blank-line rows count).
- "Outliers should be relative" (percentile + median multiple per entity class, not absolute dollars).
- "Apply" (brain D-040 + STATE bullet committed in the brain repo as `40434c6`).
- "Delete" (the 11 `.bak-20260917-xref/-wsg` files removed).
- "you are only fixing systems not regenerating anything, I will do that myself": NO reruns, NO census, NO rebuilds from a lane. Both Opus architects were killed mid-measurement and their code was already landed.

**Engine rework COMMITTED `c62cc6eb6`:** REVIEW / blank / accepted-no-company rows count with `attribution_status = unverified`, queued as `company_attribution_unverified`; REJECTED and source-policy exclusions stay. Relative outliers: top (100-P)% of the entity class and >= M x its median, with `MENTAT_XREF_LARGE_PERCENTILE` 99.9 and `MENTAT_XREF_LARGE_MEDIAN_MULTIPLE` 20. Python 108 OK.

**Export-gate rework COMMITTED `7d364883e`:** the gate refuses only a self-contradicting row; unresolved roles ship counted with `receipt_role_unverified` + `receipt_role_reason` in the raw export; blank line number recovered from the `SA<line>.` transaction-id prefix; "previously disclosed" excluded only when a counted line-11 twin with the same committee/cycle/amount exists; ruleset v5 = contradiction patterns only, F13 as contribution, special-account names. A copy is in the packet as `gate_census/fec_receipt_rules.v5.json` because `inputs/` is gitignored. test_receipt_roles PASS, test_rules PASS, python twin 11 OK.

Brain STATE amended to LANDED.

## CROSS-SESSION CONFLICT (resolved by Paul, above)

At 11:29 ET the same day, Paul's S3 session recorded the xref-contradictions ruling: the cross-verification is "way too strict", may exclude only on CONTRADICTION, the $37.9M unmatched-donor and $8.5M memo buckets "must count", and a NEW session must rework the engine logic and re-run. That ruling is later than the dwarf ruling here (~10:55 ET) and was made looking at the OLD tab on 8806. The dwarfed build removes the display he objected to and its outlier rule is contradiction-based (explicit LOAN/INTEREST descriptions), but the engine's zeroing logic was untouched at that point; whether he still wanted the engine reworked (and totals back) was his call. The lane here was told not to start that rework; Paul's follow-up rulings above ("This is the one") then settled it, and the rework landed in `c62cc6eb6` and later `627300bc9`.

## Conclusions

- The cross-reference does not minimise versus the workbook; the workbook is the accounting of record (Banking $54,762,844.05).
- Paul: the cross-reference is redundant and cannot capture the nuance of political giving; keep it dwarfed, outliers and clear refunds only, no totals.
- Contradictions, not ambiguity, governs the engine; Crypto's money is correct; outliers are relative.
- Systems only: no reruns, census or rebuilds from a lane.

## Action Items

- [ ] Restart console 8806 (assets changed). (owner: [[paul-goff]])
- [ ] Rule on the gate ruling table R1-R17 (drafted in the packet). (owner: [[paul-goff]])
- [ ] Land tidy patches P6c and P7b after the other lane commits report_insights.py. (owner: other lane)
- [ ] Update README, which still describes the old cross-reference tab. (owner: other lane, file dirty there)

## Lessons

- Haiku scouts returned an empty delegation note once and false "NOT FOUND" claims (MENTAT_COMPACT_RAW etc. live in *.mjs/*.ps1/*.R): verify absences yourself.
- Opus architects with the scratch-copy write path in the FIRST prompt complied and delivered (DE-022 holds).
- A background Bash `cd X && python server.py` ran from the wrong cwd: use absolute script paths.
- GateGuard fact-forcing fires on every first Write: state the facts in the reply and retry.
- Related memory notes: `ask-before-substantive-changes`, `review-in-fable-directive-2026-09-16`, `go-faster-directive-2026-09-16`, `scout-census-traps-2026-09-13`, `mentat-chart-studio-2026-09`.
