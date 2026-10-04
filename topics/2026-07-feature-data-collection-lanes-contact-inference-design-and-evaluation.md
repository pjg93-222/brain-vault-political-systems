---
type: topic
title: "Contact-inference layer design and evaluation plan (08-27/28) (Melange data-collection lanes)"
aliases: ["Melange data-collection lanes: Contact-inference layer design and evaluation plan (08-27/28)", "CONTACT_INFERENCE_DESIGN"]
category: "feature"
status: "open"
people: []
actors: []
objective: "Record the contact-inference layer's design (what it overrides, its evidence channels, the ten-feature fusion budget, hard constraints and decision gates) and its evaluation plan (claim, gold set, Gate E1, power check, frozen bars, battery and claims discipline), both DRAFT for Paul's review as of 2026-08-28."
created_at: 2026-08-27
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\.claude\\worktrees\\mentat-systems-production-file-53552c\\fec\\lobbying\\CONTACT_INFERENCE_DESIGN.md"
    sha256: "925d8c0ebca0ad15498c270dcbfb6a0239e6aad2093fc3e247836875f89607b3"
    as_of: "2026-08-28"
  - path: "C:\\Users\\pgoff\\Downloads\\CONTACT_INFERENCE_DESIGN.md"
    sha256: "925d8c0ebca0ad15498c270dcbfb6a0239e6aad2093fc3e247836875f89607b3"
    as_of: "2026-08-28"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\.claude\\worktrees\\mentat-systems-production-file-53552c\\fec\\lobbying\\CONTACT_INFERENCE_EVALUATION.md"
    sha256: "53328006614aac7d57220abbd185c69e59a8559af4ce6fb0251c4283dfad08ac"
    as_of: "2026-08-28"
  - path: "C:\\Users\\pgoff\\Downloads\\CONTACT_INFERENCE_EVALUATION.md"
    sha256: "53328006614aac7d57220abbd185c69e59a8559af4ce6fb0251c4283dfad08ac"
    as_of: "2026-08-28"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/open", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-data-collection-lanes]]"
---

# Contact-inference layer design and evaluation plan (08-27/28) (Melange data-collection lanes)

> The design and the evaluation plan for a contact-plausibility layer that annotates, without replacing, the structural lobbying-organization-to-member join: six evidence channels, a hard budget of ten fused features, abstention as a first-class output, and one pre-registered look against disclosed lobbying targets. Part of [[2026-07-feature-data-collection-lanes]] (project [[melange-systems]]).

> [!warning] Branch-only drafts
> Both documents exist only on the unmerged branch `claude/contact-inference-extraction-e4c881` (commit `055b9fccc`, mirror-pushed; merging is Paul's gate) and as byte-identical loose copies in Downloads; no main-checkout copy exists. Each marks itself "DRAFT for Paul's review" (dated 2026-08-27, revised 2026-08-28 after an adversarial review). Paul's later 2026-08-28 rulings act on these drafts and are recorded in the lane note [[2026-07-feature-data-collection-lanes-contact-inference]]: the gold set was ruled (resolving G6), and channels C2, C4 and C5 were ordered fired.

## Design (CONTACT_INFERENCE_DESIGN.md)

- **What it overrides.** Today `build_dyad_bill_sets` credits every sponsor and cosponsor of every bill an organization's filings cite, which can reach 623 members for one organization in one year; the join answers "whose bills did this org lobby on", not "whom did it plausibly contact". No structured member field exists in the disclosures (LD-2 line 17 names chambers and agencies), member names appear in 0.44% of activity descriptions (an upper bound), and lobbyists' covered-position histories name a specific legislator in 60.1% of populated positions.
- **Override semantics.** A separate artifact `contact_plausibility.json`, scored per (organization `lob_id`, member bioguide, filing quarter), annotates the join; the structural join, the ledger and its equality gate are untouched; every score carries per-channel receipts or an explicit ABSTAIN; every surface must label it "inferred contact plausibility", never "lobbied" or "contacted".
- **Model.** Gating runs eligibility (member in office, organization filed that quarter), then channels, fusion, calibration and abstain-or-score. Fusion is a logistic combination of at most 10 features with weights fit on the gold set; until then the layer ships receipts-only.
- **Channels.** C1 revolving-door employment from `covered_position` text, time-bounded and max (not sum) over positions; C2 dated committee activity on cited bills as venue relevance, with no roster meaning no channel (the 117th and earlier rosters were missing, Gate G2); C3 donation co-occurrence as affinity evidence only, a zero meaning no evidence, and never worded as donations predicting or causing contact; C4 prior-Congress interaction history under a hard circularity ban against the current-Congress bill set; C5 sign-agnostic alignment and salience (antagonism is not negative evidence of contact); C6 direct named-target anchors reserved as gold labels and excluded from features.
- **Fused feature budget (hard cap 10):** `c1_employment`, `c1_former_member`, `c2_committee_venue`, `c2_role`, `c3_org_money_quarter`, `c3_org_money_cycle`, `c3_lobbyist_money` (needs the LD-203 collector, Gate G1; without it the budget is 9), `c4_prior_interaction_rate`, `c5_prior_affinity`, `c5_receptivity`.
- **Hard-constraint registry H1-H10** and **decision gates G1-G6** (LD-203 collector; historical rosters; gold-set adjudication ownership; prereg entry; the BILLSTATUS parser extension, which needs a byte-match proof; gold-set scope). Phases 0-4 each land behind Paul's APPLY gate and must emit Glass Box events.

## Evaluation plan (CONTACT_INFERENCE_EVALUATION.md)

- **Claim under test:** fused scores rank disclosed targets above matched non-targets better than B1 (`n_bills`, the deployed ordering) and B2 (an employment-only prior), with usable calibration; a ranking and calibration claim, not a causal one.
- **Gate E1 (scope).** The 4,549 pattern-hit activities are corpus-wide, but the scored universe is the 770-organization financial scope, where about 36 in-scope hits across 6 organizations were measured (generous ceiling 248) against bars of at least 600 rows and 40 organizations. Options: E1-a in-scope only (expected NO-GO), E1-b corpus-wide validation with a declared transport assumption (the plan's working assumption), E1-c defer.
- **Protocol.** Adjudicate hits into TARGET-member, TARGET-staff, SPONSOR-mention, VENUE-committee or false positive; split 50/50 by organization; draw matched negatives from the same organization's quarterly roster join; estimate negative contamination from a 100-description recall sample.
- **Power check first** (200-item pilot): at least 600 resolved target rows and at least 40 organizations, or NO-GO and receipts-only indefinitely.
- **Frozen bars, one look on the holdout:** block-averaged AUC at least B1 + 0.10 and B2 + 0.05 with an organization-level bootstrap; Brier skill above zero with no reliability bin off by more than 0.15. Outcomes PASS, COVERAGE (a success outcome), MISS or RETIRED.
- **Battery before the look:** scrambled quarters, scrambled organizations, a sponsor-separation probe, an automated provenance audit over (feature, candidate set), chronology assertions and planted synthetic positives that must score at chance.
- **Claims discipline:** a mandatory caveat that the LDA does not require disclosure of contacts and scores are inferences; "lobbied member" or "contacted member" for inferred rows, donation-predicts-lobbying wording and LobbyView-as-validation are barred.

## Related

- [[gold-set-validation]] — the evaluation is a frozen-gold-set, one-look test; the disclosed-target gold set is its ground truth.
