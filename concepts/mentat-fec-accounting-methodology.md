---
type: concept
name: "Mentat FEC accounting methodology"
aliases: ["Mentat six-step process", "Mentat METHODOLOGY v5"]
description: "Mentat's accounting standard (version 5, 2026-09-12): six steps from Define to Verify and report; original employee and corporate giving counted once, PAC outgoing separate; four accuracy measures, never one percentage."
related_to:
  - "[[mentat-fec-pipeline]]"
  - "[[exclude-on-contradiction-not-ambiguity]]"
  - "[[mentat]]"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\Mentat\\mentat\\METHODOLOGY.md"
    sha256: "2ff4500c357050f8cdc90bd04f1526aef327d9efa9ca4dde7da3492696276dba"
    as_of: "2026-09-27"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/concept", "domain/data"]
---

# Mentat FEC accounting methodology

> The standard every Mentat company, industry, cycle, collector and report must meet: a six-step process (Define, Collect, Identify, Connect, Count, Verify and report) that counts original employee and corporate giving once, shows PAC outgoing activity separately, and reports accuracy as four separate measures.

> [!info] Source and status
> Summary of `mentat/METHODOLOGY.md` (version 5, dated 2026-09-12) as committed in `7a31f8ae2` on 2026-09-27, the commit that restored the money rules to the morning of 2026-09-26 after Paul objected to changes made on the evening of 2026-09-26 and just after midnight (see the 2026-09-26/27 row of the Mentat project timeline). The document is a required standard plus a record of implementation limits, not a certification of historical totals.

## Description

**Accounting direction (approved 2026-09-10).** Count original employee and corporate giving once and report PAC outgoing spending separately. Example: an employee gives $100 to a company PAC, which gives $60 to a candidate; the original-giving view shows $100 and the PAC-outgoing view $60, never $160 of original giving. Company, recipient, funding and partisan views are different views of the same money and are not automatically additive.

**The six steps.**

| Step | Question | Required result |
|---|---|---|
| 1 Define | Which companies, dates and kinds of giving? | A dated scope: roster, affiliations, FEC sources, cutoff, accounting basis |
| 2 Collect | Do we have the evidence, and what is missing? | Preserved complete responses, verified query coverage, an explicit list of missing or failed scopes |
| 3 Identify | Who gave, who received, what is the transaction? | Evidence-backed identities and classifications; competing matches preserved |
| 4 Connect | Which records are the same gift or its later movement? | Links among gifts, amendments, intermediaries, conversions and refunds; unresolved links visible |
| 5 Count | What counts once, in which view? | Original giving once; gross, adjustments and net distinguishable; PAC outgoing separate |
| 6 Verify and report | Can we defend the number? | Reconciliation in cents, independent checks, meaningful denominators, visible unresolved exposure |

**Accuracy is four measures, never one percentage.** Record accuracy (reviewed records with correct identity, classification, amount and counting, included and excluded rows alike), dollar accuracy (absolute over- and understatement against adjudicated evidence, so errors cannot cancel), collection coverage (planned work completed, which does not prove the roster or disclosures are complete) and unresolved exposure (undecided gross dollars by cause, a review exposure rather than an error rate). Paul clarified that "99.9%" was metaphorical: the requirement is a thorough, coherent and accurate system, not a numerical certification target.

**Rules that apply everywhere** (one line each): preserve original FEC rows and queries; prove collection coverage per company, alias and cycle; search every literal roster spelling; require exact, stable FEC result counts; pin the source database and rule fingerprints; classify a receipt from form, line and transaction evidence, never from a name, memo flag, size or intermediary alone; keep individual, corporate-treasury and PAC giving separate; deduplicate only with a retained counterpart and an explicit evidence rule; keep uncertainty visible (unresolved never becomes zero); reconcile every change in cents, additions as strictly as reductions; never add funding and recipient tables together; test decisions with original-filing examples and counterexamples, not two users of one predicate.

**Other standing points.** An "other receipts" line (Form 3X line 17) is not a blanket exclusion. Resolve what the evidence can answer without demanding whole-system completeness, and use exact approved aliases before prefix heuristics. OpenSecrets and other summaries are external comparisons, never targets to tune toward; FEC is the source of record. Lobbying is outside this system's task.

**Implementation status (as recorded).** Source and dollar guards, literal query contracts with exact stable counts, shared R and Python receipt rules, conditional PAC cash estimates, OTH index v6 and PAS2 parser v9 defaulting to `count_all`, bounded evidence recovery and the September 17 contradiction rule are in place. Open limits: complete unique-dollar linkage across filings and routes, legacy workbook Stats labels and percentage edge cases, and retroactive certification of historical rows. Since the September 17 ruling the console's Cross-reference tab publishes no totals; the published workbook is the accounting of record.

## Key Characteristics

- One coherent account of the money, viewed several ways; views are never summed.
- Evidence is preserved once and decisions are recomputed; nothing silently becomes zero.
- Every change names the step it affects and reconciles to the cent.
- Accuracy claims name their measure, scope and cutoff.

## Where it Applies

- [[mentat-fec-pipeline]] — the R and Python collector, cross-reference engine and workbook builder that implement the standard (operating details in its runbook part).
- [[mentat]] — every Mentat report and console view.

## Related Concepts

- [[exclude-on-contradiction-not-ambiguity]] — the 2026-09-17 rule the methodology applies: a row loses its amount only when evidence contradicts it.
- [[pac-cash-proportional-attribution]] — the conditional PAC cash estimate listed under implementation status.
