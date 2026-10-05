---
type: concept
name: "Stance pipeline integrity contract"
aliases: ["STANCE_PIPELINE_INTEGRITY", "Fixed stance band scale"]
description: "The 2026-07-15 production contract for Melange stance labels: one fixed ten-band scale for every domain, bounded exceptional rounding, General CU allocation, the A/V say-do rule, fail-closed identity joins and regeneration checks."
related_to:
  - "[[say-do-gate]]"
  - "[[2026-06-feature-moneyball-excel-model-build-category-stance-3d]]"
  - "[[melange-systems]]"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\STANCE_PIPELINE_INTEGRITY.md"
    sha256: "cee5858866bbd42c237e56d45404d66105a3ba285ef9d30e737a33cdc747fa20"
    as_of: "2026-10-04"
  - path: "C:\\Users\\pgoff\\Mentat\\STANCE_PIPELINE_INTEGRITY.md"
    sha256: "cf50b7414cb75d1ee3bd3482095fd8d0d06930efb1df52d439d74b62ede93732"
    as_of: "2026-10-04"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\stance\\stance_rules.py"
    sha256: "09e9e01b04d0dc16a463669f61fcb12bfca59eb2f03a646e18be002946ac576c"
    as_of: "2026-08-05"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\stance\\per_category_stance.py"
    sha256: "36bfca97e65ad9175d2f264feba03033463572e5acf25359c5d1961878525fa3"
    as_of: "2026-09-16"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\fec\\moneyball_core.py"
    sha256: "46b54d266e87bc87562bc680bee76e9f36b4f3972266d0f66e65175d9894b483"
    as_of: "2026-10-01"
updated_at: 2026-10-05
updated_by: "preserve@agent"
tags: ["type/concept", "domain/research"]
---

# Stance pipeline integrity contract

> The production rules for Melange stance labels, written down on 2026-07-14/15: one fixed score scale for every policy domain, bounded exceptional rounding, a fixed General CU allocation, the say-do rule, fail-closed identity joins and regeneration checks.

> [!info] Source and status
> Summary of `STANCE_PIPELINE_INTEGRITY.md` (99 lines) in the Melange repo root, committed in the 2026-07-15 snapshot `e3d2923d0` and unchanged since. The Mentat checkout holds the same text with CRLF line endings. Code read on 2026-10-04 has moved past the contract in four places (curved label domains, the overall crown, the cell gate's fail-closed rule, cross-post scoring); see the dated history.
> Dated note (2026-10-04): the contract now records its code divergence. Melange commit `97e5133` (2026-10-04, on `main`, mirror-pushed) added a section "Code divergence (2026-10-04)" with six items (Path J provenance, the crown and the aggregate say-do check, the curved label domains, the board crown and displayed labels, the fail-closed cell gate, cross-posts); the text after it is unchanged since `e3d2923d0`. The Mentat copy has the same text, applied but not committed on Mentat's working branch `codex/mentat-crypto`. The file now has 173 lines.

## Description

**Fixed scale.** Every policy domain uses the same bands, and no category median, IQR, percentile, positive rate or neutral-band tertile changes a label:

| Score | Offensive domain | Defensive domain |
|---:|---|---|
| ≥ 0.70 | Champion | Defender |
| ≥ 0.35 | Ally | Ally |
| ≥ 0.25 | Highly Persuadable | Highly Persuadable |
| ≥ 0.15 | Persuadable | Persuadable |
| ≥ 0.05 | Lean Persuadable | Lean Persuadable |
| ≥ −0.05 | True Neutral | True Neutral |
| ≥ −0.15 | Lean Skeptic | Lean Skeptic |
| ≥ −0.35 | Skeptic | Skeptic |
| ≥ −0.70 | Highly Skeptical | Highly Skeptical |
| < −0.70 | Opponent | Opponent |

No evidence displays as an em dash, not Neutral. Legislation uses one fixed square-root scale (2.0) and media one fixed blend scale (1.0); only sources present in a member-domain cell enter its weighted denominator, so incomplete press collection does not dilute sponsorship.

**Exceptional-performance rounding.** Other domains with an absolute raw score of at least 0.70 add 5% of their signed mean to a scored domain, capped at ±0.05; this can settle a near-boundary score but never creates a score where there is no evidence. The overall tier gets a bounded ±0.05 nudge from the balance of exceptional Champion/Defender versus Opponent domains. Raw scores and per-cell factors stay in `category_stance.json`.

**General Credit Union media.** After the shared subject-word rules, residual General CU evidence goes to at most four non-defensive domains in proportion to the member's subject profile; with no profile it splits across Examination & Supervision, NCUA Budget & Insurance, Charter Modernization and Field of Membership. The signed amount is conserved and the allocation ledger is embedded in `category_stance.json`.

**Say-do rule (contract wording).** A Champion/Defender domain needs sponsored or original-cosponsored legislation in that domain or a recorded CU-aligned final-passage vote; committee jurisdiction is not an action signal. An overall Champion also needs A/V evidence in at least two-thirds of at least six raw top-tier domains, and a follow-through check caps direct sponsors of at least 10 CU bills when no more than 20% advanced past introduction. Caps lower only to Ally, keep the raw tier and evidence denominator, and (in this wording) fail open when the authorship source is unavailable. The rule's later history is in [[say-do-gate]].

**Influence bonus.** The additive positional term goes only to current chamber or party elites listed in `formal_visibility_roles.json`; a listed elite who is also a committee or subcommittee Chair or Ranking Member gets no additive term, because the workbook's committee score already measures that authority.

**Identity and visibility.** Member joins accept an exact or normalized name, a unique first-initial plus last name, or a bioguide match; ambiguous surnames fail closed into the unmatched audit. Exact cross-post duplicates stay visible but are marked not scored (contract wording; superseded 2026-09-16, see the dated history). `dashboard_exclusion_reconciliation.json` requires every source row to be displayed or carry an explicit routing or exclusion reason; any unexplained difference stops dashboard generation.

**Regeneration safeguards.** The canonical order is media blend, stance, rank authority, workbook stance view, downstream engines, dashboards, with verified atomic replacement of generated files. Before the member desk is written, a preflight requires identical 533-member rosters across six artifacts and checks category width, stance-string width, bioguide non-conflict and General CU conservation; the postflight writes `dashboard_integrity_report.json`, and identical input fingerprints must reproduce the same semantic bundle hash.

## Dated history (newest wins)

| Date | Change | Evidence |
|---|---|---|
| 2026-06-26 | Category Stance 3D thresholds self-calibrated to each sub-category's own distribution. | [[2026-06-feature-moneyball-excel-model-build-category-stance-3d]] |
| 2026-07-14/15 | This contract fixed one scale for every domain (file dated 2026-07-14; committed 2026-07-15). | contract |
| 2026-07-16 onward | The overall "Champion" stopped being a score band: from commit `391a4a8b5` (2026-07-16) the aggregate say-do audit no longer vetoes the Tier-1 display crown, and since commit `e3e5ece7c` (2026-09-16) the crown is the active primacy board's top 13 with a qualifying action. | `fec/moneyball_core.py` (2026-10-01) |
| 2026-08-03 | Commit `b4801b172` (an agent safety checkpoint) declared four saturated domains whose labels come from a sign-preserving empirical curve (tie-aware midrank CDF, positive and negative evidence curved separately): Member Business Lending, Mortgage & Housing, Charter Modernization, Technology & Emerging. Raw and adjusted scores are unchanged, and the scale id is `fixed-bands-with-declared-signed-empirical-curves-v3`. The contract's "no percentile changes a label" therefore holds for every domain except these four. | `fec/stance/stance_rules.py`, `per_category_stance.py` |
| 2026-09-16 | Commit `742b68aec` (lane item B-1) removed the cell gate's fail-open fallback: an empty accepted-evidence map now caps every top cell without A or V, and `bill_corroboration()` raises on a missing, invalid or unadjudicated source; only the aggregate audit still fails open. | `fec/moneyball_core.py`, `fec/tests/run_tests.py` |
| 2026-09-16 | Commit `a0c45a709` (brain D-034; `CROSSPOST_DEDUP` default off): every social post scores under its own sign and the desk notes the cross-post twin instead of excluding it. | `fec/stance/build_media_blend.py` |

## Key Characteristics

- One ten-band scale in every domain; four declared domains have been curved for labels since 2026-08-03.
- Missing evidence is an em dash and missing sources leave the denominator; nothing is imputed as neutral.
- Exceptional rounding is bounded at ±0.05 and never creates a score.
- Ambiguous identities and unexplained row losses stop generation instead of guessing.

## Where it Applies

- [[melange-systems]] — the category-stance matrix (`category_stance.json`), the member desk and the dashboards.
- [[2026-06-feature-moneyball-excel-model-build-category-stance-3d]] — the June self-calibrating thresholds this contract replaced.

## Related Concepts

- [[say-do-gate]] — the say-do rule stated here, with its dated path history (A, V and J ratified 2026-07-08; A and V only since the 2026-07-15 snapshot).
