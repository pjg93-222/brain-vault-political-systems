---
type: concept
name: "Exclude on contradiction, not ambiguity"
aliases: ["xref contradiction rule", "D-040"]
description: "Paul's rule for Mentat cross-verification: a row is excluded or zeroed only on CONTRADICTION (its own text names another organisation); missing or ambiguous information keeps the row counted with an unverified flag."
related_to:
  - "[[2026-07-bugfix-mentat-collection-and-attribution]]"
  - "[[2026-09-17-mentat-xref-council-review]]"
  - "[[mentat-fec-pipeline]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/xref-contradictions-not-ambiguity-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\xref-contradictions-not-ambiguity-2026-09-17.md", sha256: "0a02ce2a080260ebce313a38ac6a1e2b11efa8e34900bcfe9f1676a231754349"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/concept", "domain/data"]
---

# Exclude on contradiction, not ambiguity

> Rule (brain D-040, Paul 2026-09-17): the Mentat cross-verification excludes or zeroes a row only when the row's own evidence CONTRADICTS the attribution; missing or ambiguous information counts and carries an "unverified" flag.

## Description

Paul's ruling, 2026-09-17, reacting to the cross-verification run on the old tab: "I think we really need to reconsider the whole idea of the Cross-Verification, it is way too strict. Donor not matched to a listed company · counted at $0 — 36,241 — $37,940,955 = This is an inevitability and is why we filter based on name, giving amount and all the other steps. Memo entry without a proven parent receipt — 19,529 — $8,522,419.98 = This is also an inevitability. Just because it is missing info does not mean it should be excluded; we are focusing on contradictions, not ambiguity."

Follow-up rulings the same day:
- "its ok if they work at another company if the money is going to something JP Morgan affiliated or if they are an advisor or in an a adjacent position."
- Then, to the reason-code table and decisions D1-D4 put to him: "Your suggestions are correct."
- Then: "Finish and then commit."

The rule itself is brain D-040, landed before the engine work as commit `c62cc6eb6`: exclude or zero only on contradiction; ambiguity counts with an unverified flag. The earlier "dwarfed cross-reference" ruling of the same day (see [[2026-09-17-mentat-xref-council-review]]) is consistent with it: Paul's follow-up there was "'contradictions, not ambiguity' engine rework. This is the one" (the S3 principle governs; the dwarfed tab stands, no totals).

## Key Characteristics

- **Exclude only on contradiction.** A row whose own text names another identifiable organisation is excluded under the reason code `attribution_contradicted_by_text`.
- **Ambiguity is flagged, not excluded.** Text naming the listed company or a verified alias keeps the row counted and flagged under `company_named_unverified`. Blank or non-naming text stays counted and flagged.
- **Whole-token text test** on rows that were previously only "unverified" (the ones the old logic zeroed as "Donor not matched to a listed company").
- **Recipient route:** the recipient committee is the company's dated PAC, or the FEC committee master's connected-organisation field resolves to the company. Upgrades attribution status only; never decides dollars.
- **Role route:** advisor / adviser / advisory, consultant, contractor, trustee, partner, counsel, board. NOT plain director, NOT retired. Upgrades attribution status only; never decides dollars. Together the routes support donors employed elsewhere (Paul's "its ok if they work at another company" ruling).
- **No cross-attribution:** no row is ever attributed to a different listed company by the test.
- Money-collection and receipt-counting code stays frozen under Paul's later ruling (2026-09-27, "don't change it"); see [[2026-07-bugfix-mentat-collection-and-attribution]] for the freeze and for the revert of the 2026-09-26 rule changes.

## Landing and measurements

Landed 2026-09-18 as commit `627300bc9` (32 files, +3,189/-18): `tools/cross_reference_engine.py`, `tools/run_cross_reference.py`, `tests/test_cross_reference_engine.py`, and the packet `audits/mentat_xref_logic_20260917`. Tests: 113 passed.

Measured on the Banking run `20260918T030844` (650 s); before = `20260913T074303`:

| Measure | Before | After |
|---|---|---|
| Observed original giving | $72,103,655.70 | $77,054,485.76 |
| Employee giving | $70,446,487.57 | $71,246,149.34 |
| Unverified funding | $1,657,168.13 | $5,808,336.42 |
| PAC activity | $22,774,438.00 | unchanged |
| Baseline | $133,516,227.27 | unchanged |
| Review queue | 76,197 rows / $49.93M | 46,156 rows / $16.99M |

All 36,241 previously zeroed rows are accounted for: 29,816 excluded as contradicted ($32,538,668.49), 6,266 released with a flag, 159 settled as non-giving. Observed Banking giving moved $72.10M to $77.05M. Fintech re-ran the same way (`20260917T190836`, 369 s).

**The finding:** $29.3M of the $32.5M exclusion was one bug: the upstream matcher read `CITIZENS` as the `CITI` prefix and booked End Citizens United, Citizens Bank, Citizens Business Bank, Citizens Financial Group, even Target and PepsiCo citizens funds as Citibank money. The contradiction test (text naming another organisation) is what caught it.

Observed giving still sits above the published $54,762,844.05 Banking workbook total, as it did before the change; the before/after pair spans four other commits, so the clean patch-attributable measure is the row-level trace in REVIEW.md 5f.

## Open items (Paul's)

- Add the register data so those rows move from unverified funding to PAC activity: `C00039305` Citigroup PAC-State; the companies' own PACs appearing as donors (Truist Financial Corp Federal State Local PAC, JP Morgan Chase Co State and Fed PAC, PNC PAC Michigan, Capital One Association Political Fund PAC).
- Re-run the launcher for the day's other commits.
- `observed_filing_versions_unresolved` keeps $344,433.54 of probable duplicates until filing headers settle them.

## Process lessons

- A long run started from a subagent's background shell is killed when that agent's turn ends: the Banking run died mid-verify with no exit line, while Fintech's ended `exit=0`. Start long runs from the main session's background Bash.
- The `C:\Users\pgoff\Mentat` git index is SHARED with every other session working in that tree: the abort guard ran `git reset` and cleared another lane's staged file list (no content lost; they re-stage). Stage and commit atomically, and use `git commit --only -- <paths>`, never a bare reset.
- Related memory notes: `mentat-failings-lane-s8-2026-09-18`, `mentat-xref-workbook-review-2026-09-17`, `mentat-system-debug-lane-2026-09-13`, `ask-before-substantive-changes`.


## Where it Applies

- [[mentat-fec-pipeline]] - Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat
- [[2026-07-bugfix-mentat-collection-and-attribution]] - Mentat collection and attribution history, Jul-Sep 2026: audits, key outage, review bucket, xref rule, frozen money code.
- [[2026-09-17-mentat-xref-council-review]] - 2026-09-17 council: cross-reference does not minimise vs workbook (Banking $72.1M vs $54.8M); Paul ruled it redundant and kept it dwarfed.
