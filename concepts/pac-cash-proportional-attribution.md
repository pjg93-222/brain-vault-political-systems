---
type: concept
name: "PAC cash proportional attribution"
aliases: ["Dated PAC cash approximation", "pac_cash_model"]
description: "Mentat's rule for modeling company-funded PAC spending (2026-09-08): each payment takes the company's share of labeled cash just before it, transfers move balances instead of creating gifts, unverifiable inputs withhold it."
related_to:
  - "[[mentat-console-pac-map-viz-lane]]"
  - "[[mentat-fec-accounting-methodology]]"
  - "[[mentat]]"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\Mentat\\audits\\mentat_20260908\\PAC_CASH_APPROXIMATION.md"
    sha256: "e2903b87ec1f5b4e804263d2e6718b465c0b32b7753f93dbb48862fda001274f"
    as_of: "2026-09-08"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/concept", "domain/data"]
---

# PAC cash proportional attribution

> An accounting rule, not a finding: each PAC payment is credited to a company in proportion to that company's share of the committee's labeled cash just before the payment, so company funding is conserved through transfers and diluted by every other source.

> [!info] Source and status
> Summary of `audits/mentat_20260908/PAC_CASH_APPROXIMATION.md` (Mentat repo, committed 2026-09-08 with `mentat/tools/pac_cash_model.py`). The model code changed later (commits of 2026-09-18 and 2026-09-26 touch `pac_cash_model.py`), and the PAC map lane of 2026-09-25/26 records a cash-model rule change and a date-aware walk with carryover; read [[mentat-console-pac-map-viz-lane]] and the code before relying on details below.

## Description

**The rule.** For company c, committee p and payment time t, keep a labeled cash balance per funding source; a payment takes the fraction belonging to c just before it. An internal PAC transfer moves the same labeled balances to the receiving committee when its reciprocal receipt arrives; it is not a second donation. Every other funding source dilutes the company fraction, including identified funding from outside the selected sector. It answers "what company-funded amount would this payment represent if the committee mixed its cash proportionally?" and claims nothing about donor intent, earmarks, influence or causal effect; no accuracy or optimality claim is made for it.

**Worked illustration (not a real result).** A PAC holds $100 of company funding and $300 from other sources and transfers $200 to a second PAC, which carries $50 of modeled company funding. If the second PAC spends $150 on a candidate, $37.50 is modeled company funding and $12.50 stays there; if the first PAC spends $100 on operations, $25 is company-funded and $25 stays. Total company funding is conserved: $37.50 + $25 + $37.50 = $100.

**Controls (as built 2026-09-08).**
- Future receipts never pay for earlier spending; a transfer is unavailable at its destination until the matched receipt date; support and opposition stay separate.
- Same-day receipts and arriving transfers are ordered before outgoing payments, a disclosed assumption because dates do not fix the order within a day; same-day transfer cycles are refused.
- Operating costs, identified refunds, unspent cash and money leaving the selected network stay distinct from candidate spending; transfer sums are never added to terminal spending, and no hop-weight or influence multiplier is applied.
- Conservation is checked on unrounded Decimal balances, and each committee needs a closing-cash check within one cent.
- **Withhold rather than guess:** unresolved opening ownership, refunds the adapter cannot place, noncash gifts and asset sales, negative adjustments, unknown roles, missing payment dates, ambiguous transfer pairs and cash gaps all withhold the estimate. A withheld estimate has an empty allocation and issue codes, never a fabricated zero, a coverage percentage or a confidence interval.
- The generated `cash-estimates.json` sidecar is bound by SHA-256 to its snapshot and evidence files and to the estimator code hash; the server serves it only when those hashes match.

**First application (2026-09-08).** The three-PAC Fairshake snapshot did not pass the cash-attribution gate (8 outstanding check categories for 2024, 12 for 2026), so the console showed recorded spending beside "Awaiting reconciliation" for the company-funded estimate. Existing Crypto and consolidated workbooks kept their audited figures and were not rebuilt as cash-attribution workbooks.

## Key Characteristics

- Conserves company funding through transfers; never double-counts a transfer as spending.
- Order-aware: only cash already present can fund a payment.
- Refuses to estimate on any unverifiable input; a refusal is not zero.

## Where it Applies

- [[mentat-console-pac-map-viz-lane]] — the 2026-09-25/26 PAC map lane that changed the cash-model rule and added a date-aware walk with carryover.
- [[mentat]] — PAC evidence views of the Mentat console.

## Related Concepts

- [[mentat-fec-accounting-methodology]] — the accounting standard that lists these conditional cash estimates among its implemented controls.
