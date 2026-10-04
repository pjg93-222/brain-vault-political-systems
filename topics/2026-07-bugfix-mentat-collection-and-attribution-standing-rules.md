---
type: topic
title: "Standing rules (money code, roster, shared checkout, zero-row crash) (Mentat collection and attribution)"
aliases: ["Mentat collection and attribution: Standing rules (money code, roster, shared checkout, zero-row crash)"]
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

# Standing rules (money code, roster, shared checkout, zero-row crash) (Mentat collection and attribution)

> Paul's standing feedback rules for Mentat collection: never change money or receipt-counting code without his explicit approval of that specific change, the roster and raw-sheet rules, the shared-checkout law and the zero-row crash class. Part of [[2026-07-bugfix-mentat-collection-and-attribution]] (project [[mentat]]).

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
- Later reconfirmation: conduit legs COUNT (R8 re-ratified 2026-07-27); the memo rule only flags (see the 2026-09-17 contradiction rule in [[2026-07-bugfix-mentat-collection-and-attribution-cross-verification]]: unverified rows count and are flagged).

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

## Related Topics

- [[2026-07-bugfix-mentat-collection-and-attribution-september-collector-lanes]] — The September 2026 Mentat collector lanes: worker scaling (09-09), the every-lane-failing collector outage of 09-17/18, and the two API-key stores.
