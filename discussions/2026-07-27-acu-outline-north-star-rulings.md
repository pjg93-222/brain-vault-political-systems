---
type: discussion
title: "ACU outline north-star rulings"
aliases: ["ACU outline north-star rulings"]
date: 2026-07-27
summary: "On 2026-07-27 (evening) Paul ruled that the Moneyball ACU Search Outline docx is the north star and adjudication contract for the legfix5 19-category review (TITLE, then SUMMARY, then BILL TEXT precedence), that the Quorum 44-row xlsx is the recall floor/template, that GovInfo counts as summary evidence of record, that the 7 sign-on letters are mandatory in the corpus, and that amendments count for half of what a bill does."
conclusions:
  - "North star = source_data/legislation/Moneyball_ACU_Search_Outline.docx; it resolves to exactly 19 categories across 7 Layer-1 sections, matching the contract's required 19 category_evidence rows."
  - "Matching precedence: TITLE first, then SUMMARY, then BILL TEXT (Paul: 'this is the most important part'); ~term = search identifier; \"phrase\"~N = proximity operator (N words approximately around each other)."
  - "Floor/template = search-results-generated-by-quorum (55).xlsx (Downloads), 44 bills; discovery must clear 44/44; output shape Stance / Issues / Priority / Notes (+ Official Summary, AI Summary, Source Link)."
  - "Summary provenance DECIDED: GovInfo counts as summary evidence of record (reverses the congress.gov-only rule for summaries; unblocks the 10,732 available_pending_congress_gov_fetch); does NOT automatically extend to full text."
  - "Letters are MANDATORY: 'those letters are very important, they need to be in there' (7 letters, 296 member-rows, 251 of 533 members = 47%); the corpus must UNION letters with the legfix5 candidates and assert preservation in a terminal gate."
  - "Amendments count half: 'amendments count for half of what a bill does' (weight 0.5 vs 1.0); affects 3,703 of 18,557 = exactly 20.0% of the corpus; a NEW rule, no amendment weighting exists today."
  - "Also decided: collect the 15 historical probes (598 ids), pre-clearing the 95 uncovered offline against the rehydrated GovInfo BILLSTATUS sitemaps first; keep the 1,771/454 edges and all ledgers; outline 'move this elsewhere' notes are FLAGGED, not re-filed."
  - "NDAA parentage of an amendment is not disqualifying (Paul's ruling): judge the amendment's own content, never the vehicle."
action_items:
  - "Build the 19-category review (title -> summary -> bill text) against the outline docx with the Quorum 44-row xlsx as the discovery floor (owner: Claude / Codex lane)"
  - "Amend the culling/integration contract so GovInfo summaries count as summary evidence of record (contract amendment, not a fetch job) (owner: Claude / Codex lane)"
  - "Design the accepted generation to UNION (never replace) the corpus with the 7 letters and add a terminal gate asserting all 7 letters / 251 members are preserved (owner: Claude / Codex lane)"
  - "Implement amendment weight 0.5 (vs 1.0 for bills) as a new rule over 3,703 amendments (samdt 2,424 + hamdt 1,279) (owner: Claude / Codex lane)"
  - "Collect the 15 historical probes (598 ids) after offline pre-clear of the 95 uncovered candidates against the rehydrated GovInfo BILLSTATUS sitemaps; phantom-citation policy still needs Paul (owner: Paul decision, then Codex lane)"
  - "Flag (do not re-file) the outline's 'move this elsewhere' notes such as the CRA overdraft resolution S.J.Res.18/H.J.Res.59 (owner: Claude)"
related_topics:
  - "[[2026-07-feature-legislative-pillar-acu-review]]"
related_actors: []
related_people:
  - "paul-goff"
related_projects:
  - "[[melange-systems]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/acu-outline-northstar-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\acu-outline-northstar-2026-07-27.md", sha256: "57e514181f5b7a31dd47613f27469d213e4736e9e7d2e18b7ef3fe708ad596d5"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/discussion", "domain/data"]
---

# ACU outline north-star rulings

> Paul's 2026-07-27 evening rulings that make the Moneyball ACU Search Outline docx the north star and adjudication contract for the legfix5 19-category review, with the Quorum 44-row xlsx as floor, GovInfo accepted for summaries, letters mandatory and amendments weighted at half.

## Context

Rulings given by Paul on 2026-07-27 (evening; source memory last modified 2026-07-28) while the legfix5 six-year legislation lane was blocked on the never-performed 19-category review (see [[2026-07-feature-legislative-pillar-acu-review]] for the legfix5 collection and culling state). They form the adjudication contract for that review in [[melange-systems]]. Paul is Paul Goff. Related memories: `legfix5-collection-complete-2026-07-27`, `ask-before-substantive-changes`, `codex-executor-lane-2026-07-18`, `legfix4-residue-closeout-2026-07-25`, `legislative-letters-2026-07-17`.

## Participants

| Person | Role |
|---|---|
| Paul Goff | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Topics

- [[2026-07-feature-legislative-pillar-acu-review]] - Legislative pillar of Melange: legfix history, legfix5 19-category ACU review, effectiveness shadow lane, lobbying forecast
- [[2026-07-feature-legislative-pillar-acu-review-legfix5-full-text-and-culling]] — legfix5 of 2026-07-27: the six-year full-text collection, the GovInfo official-text lane and culling engine, and the acu-outline rulings carried into it.

## Conclusions

1. **North star = `source_data/legislation/Moneyball_ACU_Search_Outline.docx`.** It resolves to EXACTLY 19 categories across 7 Layer-1 sections, matching the contract's required 19 `category_evidence` rows:
   - Examination & Supervision: Exam&Supervision, CU Capital Requirements, NCUA Budget & SIF
   - Payment & Technology: Interchange, Payments, Technology & Emerging Issues
   - Information Security: Fraud Prevention, Data Privacy & Cybersecurity
   - CU Powers & Charter: Charter Modernization, Defense CU, Field of Membership
   - Tax/Budget/Bank Attacks: CU Tax Status, CDFI Fund, CU-Bank Competitive Dynamics
   - Consumer Protection: CFPB Reform, Credit Card & Consumer-Fee Mandates, TCPA
   - Lending: Member Business Lending, Mortgage Lending & Housing
2. **Matching rules (Paul, verbatim intent):** cross-reference each document against the words in each section. `~term` = search identifier. `"phrase"~N` = **proximity operator, N words approximately around each other**. **Order of precedence: TITLE first, then SUMMARY, then BILL TEXT - "this is the most important part."** Plain-text entries are bills with numbers + ACU position (SUPPORT / OPPOSE / PASSED / MONITOR); statuses reflect the Feb 2026 ACU Bill Tracker, verify against the live tracker each run.
3. **Floor/template = `search-results-generated-by-quorum (55).xlsx`** (Downloads), 44 bills = the Quorum recall floor. Output shape: Stance / Issues / Priority / Notes (+ Official Summary, AI Summary, Source Link). Discovery must clear 44/44.
4. **Summary provenance: DECIDED - GovInfo counts as summary evidence of record.** Reverses the congress.gov-only rule for summaries; unblocks the 10,732 `available_pending_congress_gov_fetch`. It is a contract amendment, not a fetch job. It does NOT automatically extend to full text - that remains a separate open question.
5. **LETTERS ARE MANDATORY - "those letters are very important, they need to be in there."** 7 letters, 296 member-rows, **251 of 533 members (47%)**, in `manual_bill_evidence.csv` with Role/Direction/DecayWeight already applied.
6. **AMENDMENTS COUNT HALF - "amendments count for half of what a bill does."** Weight 0.5 vs 1.0 for bills.
7. **Also decided:** collect the 15 historical probes (598 ids), pre-clearing the 95 uncovered offline against the now-REHYDRATED GovInfo BILLSTATUS sitemaps (32 files, `cloudOnly=False` as of 2026-07-27 evening) before any network dispatch, "as long as it doesn't harm the system". Keep the 1,771/454 edges - keep all ledgers. The outline's "move this elsewhere" notes (e.g. the CRA overdraft resolution S.J.Res.18/H.J.Res.59): FLAG, do not re-file (Paul left it to Claude's discretion; preserving his authored placement).
8. **NDAA parentage is NOT disqualifying (Paul's ruling, verified):** judge the amendment's OWN content, never the vehicle (details below).

## Action Items

- [ ] Run the 19-category review (title -> summary -> bill text) against the outline docx, with the Quorum 44-row xlsx as the discovery floor (owner: Claude / Codex lane)
- [ ] Amend the contract so GovInfo summaries count as evidence of record (owner: Claude / Codex lane)
- [ ] Union (never replace) the letters into the accepted generation and assert preservation in a terminal gate (owner: Claude / Codex lane)
- [ ] Implement the amendment weight 0.5 rule over 3,703 amendments (owner: Claude / Codex lane)
- [ ] Collect the 15 historical probes (598 ids) after the offline pre-clear of the 95; phantom-citation policy needs Paul first (owner: Paul, then Codex lane)
- [ ] Flag, do not re-file, the outline's "move this elsewhere" notes (owner: Claude)

## Ruling detail: the 19-category outline

- The outline docx is a RULEBOOK, not a collection: 243 spec lines (181 identifiers + 24 bare terms + 38 bill entries / 55 numbers).
- The outline itself marks CU Tax Status "CAN'T FIND ANYTHING" and CU-Bank Competitive Dynamics "NOTHING" - for those categories the letters ARE the evidence.

## Ruling detail: letters are mandatory

The 7 letters in `manual_bill_evidence.csv` (296 member-rows, 251 of 533 members, 47%):

| Letter id | Members |
|---|---|
| LTR-119-CDFI-WATERS | 121 (decay 1.0) |
| LTR-119-CDFI-KIMCRAPO | 104 |
| LTR-119-CUTAX-CISCOMANI | 34 |
| LTR-118-CFPB-SCOTT | 18 |
| LTR-117-CDFI-BLUNTROCHESTER | 15 |
| LTR-118-CDFI-WARNER | 2 |
| LTR-117-CDFI-BARR | 2 |

Categories touched: CDFI Fund 244 rows, CU Tax Status 34, CFPB 9, Credit Card Mandates 9.

**THE HAZARD:** `LTR-117-CDFI-BARR` **fails `CANONICAL_KEY_RE`** - letters are not congress.gov measures and can never be legfix5 candidates. If the accepted generation ever REPLACES rather than UNIONS the corpus, all 7 letters and 251 members' credit silently vanish. Design must union + assert preservation in a terminal gate. **This matters MOST where there are no bills**: for CU Tax Status and CU-Bank Competitive Dynamics the letters are the evidence. Ties to `legfix4-residue-closeout-2026-07-25` (CU Tax Status = honest zero on BILLS) and `legislative-letters-2026-07-17`.

## Ruling detail: amendments count half

- Weight 0.5 vs 1.0 for bills. Affects **3,703 of 18,557 = exactly 20.0%** of the corpus (samdt 2,424 + hamdt 1,279).
- Verified 2026-07-27: NO amendment weighting exists anywhere today (grep of `apply_leg_stance.py` / `bill_rules.py` / `build_legislation_workbook_numeric_plan.py` finds nothing) - so this is a NEW rule, not a change to an existing one, and it re-weights a fifth of the corpus.
- The contract already treats amendments specially elsewhere: `relationship_required = measure_kind not in {"hamdt","samdt"}`.

## Amendment text recovered from disk (night of 2026-07-27)

**3,393 of 3,703 (91.6%) recovered with ZERO network.** The blocker looked fatal: discovery records give amendments NO title (0/3,703) and 2,148 of 2,424 "purpose" fields are the literal placeholder `"Purpose displays after an amendment is proposed. | View Text"` - only 276 (7.5%) usable. **But all 3,703 amendment PAGES were already collected** in `text_relevance_httr_full_20260727z/accepted_html/<congress>/<hamdt|samdt>/<n>/page.html.gz` (1,279 + 2,424 = 3,703 exactly); the placeholder came from the SEARCH-RESULTS page, while the amendment PAGE has full Congressional Record text. Extractor: `fec/extract_amendment_text.py` in worktree `codex/acu-19cat-registry`.

- **Senate = trivial**: the CR block is self-delimiting; anchor on the page's OWN number `SA <n>.` then the next `SA \d+.`; 2,389/2,424 = 98.6%.
- **House = the hard one, SOLVED via SPONSOR not number.** A hamdt page embeds an ENTIRE DAY of floor debate with 2-17 amendments, and the CR's "Amendment No. N" is the HOUSE REPORT number, NOT the H.Amdt number (hamdt/100-104 all return the same "Amendment No. 3 Offered by Mr. Raskin"). **Every hamdt record has a populated `sponsor` field**, so match `Amendment No. \d+ Offered by (Mr|Mrs|Ms|Miss)\. <SURNAME>` with STATE as tie-break ("of Georgia"). Result: 1,004/1,279 = 78.5% text + **1,116 floor_remarks** (the sponsor's own CR explanation = the richest direction signal available, better than the Senate's bare text).
- Text clause is delimited by `"The text of the amendment is as follows:"` to `"The (Acting) CHAIR|Pursuant to House Resolution"`. Median House text 448 chars versus the 20,000 chars of unrelated debate a naive grab produces (that first attempt had a **35% false-positive rate** - never grab the whole CR block).
- 310 still unresolved: house_sponsor_block_not_found 156, house_block_found_no_text_clause 112, senate_sa_anchor 35, house_text_on_actions_tab 7.
- **NDAA parentage is NOT disqualifying (Paul's ruling, verified):** `119:samdt:3834` = CLF agent-membership amendment to the Federal Credit Union Act riding on the NDAA; `116:samdt:2170` / `117:samdt:3989` = credit unions on military installations; `116:hamdt:260` = CFPB advisory board incl. credit unions. Judge the amendment's OWN content, never the vehicle. 50.5% of amendments hang off NDAA/approps and only 274 distinct parent bills carry all 3,703 (top 50 = 82%).
- Amendment OUTCOME is recoverable from `latest_action` for 1,517/3,703 (agreed 1,182, rejected 307, withdrawn 28); it also carries the ACTION DATE, which is the join key to the 267,742-row CREC `speeches` table.
- **Hazard hit twice that night (git/PowerShell):** writing `\b` into a Python file via heredoc produced a literal 0x08 BACKSPACE byte inside a regex, silently matching nothing (0 results). Check `grep -c $'\x08'` when a regex mysteriously matches nothing.

## Original query document found

**`C:\Users\pgoff\Downloads\congress_search_urls.R`** (497 lines) is the authoritative record of Paul's congress.gov Advanced Search queries.

- Structure: 4 AND-ed blocks = `congress multi=[119,118,117]` (NO 116th) + OR'd terms + **`sponsor = "__MEMBER__"` per-member switch** + subject-area filter.
- **All 17 templates use `"source":"legislation"` (284 occurrences, nothing else) - on congress.gov AMENDMENTS ARE A SEPARATE SOURCE, so the original queries could NEVER return an amendment.** That is why the workbook has 25 resolutions and 0 amendments.
- **Only 17 templates for 19 categories - `credit_union_tax_status` and `cu_bank_competitive` have NO QUERY AT ALL** (the file header claims cu_bank_competitive exists; the header is stale), matching the outline's own "(CAN'T FIND ANYTHING)" / "(NOTHING)" - the third independent confirmation that those two categories rest entirely on the LETTERS.
- `cdfi_fund_url_parts` fails JSON parse (line 310, char 2464) and uniquely uses `contains` not `phrase` for the member switch - a possible defect.

## Collection tiers (do not confuse again)

| Tier | Size |
|---|---|
| Outline docx | 243 SPEC LINES (181 identifiers + 24 bare terms + 38 bill entries / 55 numbers) - a rulebook, not a collection |
| Workbook | **465 distinct bills** / 10,991 interaction rows (= the legacy 465-bill, 10,986-edge universe) |
| legfix5 | **18,557 candidates** / 64,004 memberships |

- Outline vocabulary literally applied catches only **147/465 = 31.6%** of the legacy bills (after fixing 3 matcher bugs: no plural stemming, named-bill titles unused, titles cut at first `(` destroying `(TRAPS)`/`(CLF)`). The legacy bills' median outline-vocab hit count is **0.0 - identical to non-legacy**, so KEYWORDS CANNOT FIND WHAT PAUL CURATED.
- Wide sets must be SEEDED (legacy 442-in-corpus + outline-named -> 485, + 896 precise-category fill = **1,381 = 297% of 465**, matching Paul's own 200-300% instinct), never ranked: a rarity-SUM ranker crowns omnibus bills ("For the People Act") and made amendments 81% of the top 465.
- Two discovery queries are the noise source: `defense_credit_union_issues` 9,250 and `credit_union_tax_status` 8,948 of 18,557 (vs `interchange` 82).
- **23 of the legacy 465 are ABSENT from the new corpus** (16 are Member Business Lending small-business bills) and the new corpus reaches the 116th Congress, which the originals could not.
- Resolutions: 754 in corpus vs 25 in workbook - legitimately in scope under `source=legislation`.

## Open questions

- Whether GovInfo-as-evidence extends to full text (explicitly NOT decided by the summary ruling).
- Phantom-citation policy for the 95 historical-probe candidates (see the topic note); not part of today's rulings.
