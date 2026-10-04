---
type: concept
name: "Settled findings stay settled"
aliases: ["do not re-flag rule"]
description: "A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, and is not re-litigated unless Paul reopens it or new evidence meets the reopen condition recorded with the settlement."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/agent-ops"]
---

# Settled findings stay settled

> A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, and is not re-litigated unless Paul reopens it or new evidence meets the reopen condition recorded with the settlement.

## Description

Audits, code reviews and scout fan-outs keep rediscovering the same "defects": a deliberate design choice, a residual that was accepted, or a claim an adversarial check already refuted. Each re-flag costs a round and erodes trust in the next finding. The practice is to record the settlement once, where the next reviewer will look: a binding refuted list (the 2026-07-08 network/vote/cycle audit; the refuted or partly refuted findings of the code-review packet), a "SETTLED, do not re-litigate" heading over a measured audit, or a "never re-flag" line next to Paul's stated intent (purity over volume on the primacy board).

The rule binds agents, not Paul. A question Paul reopens is open again: the old closures do not bind the new search, and an agent does not reflexively close it again.

## Key Characteristics

- Settled means measured (refuted with evidence) or ruled (Paul declared it intentional); the record says which.
- The settlement is written once, at the place the finding would be raised again, in words a reviewer can match ("do not re-flag", "SETTLED, do not re-litigate").
- Before raising a finding, check the note's refuted lists and decisions.
- Accepted residuals are documented with the change that accepted them.
- Paul can reopen a settled question, and so can new evidence that meets the reopen condition recorded with the settlement (new data, a new basis); a search Paul reopened is not bound by the earlier closures.

## Where it Applies

- [[2026-07-working-agreement-verification-and-evidence-standards]] — R7 anchors claims to the recorded state instead of contradicting it; R9: a search Paul reopened is not bound by the old closures
- [[2026-07-troubleshooting-melange-audits-and-reviews]] — binding refuted lists for the 2026-07-08 audit and the code-review packet (do not re-flag)
- [[mentat-fec-pipeline]] — the 2026-07-27 coverage audit: SETTLED, do not re-litigate
- [[lobbyview-collector]] — accepted residuals documented in the commit; do not re-flag
- [[melange-systems]] — the project whose audits and reviews keep refuted lists and settled intents
- [[mentat]] — the project whose collection audits are recorded as settled

## Evidence

Other notes that use the rule, by title (plain text, so their link budgets are unchanged):

- Mentat collection and attribution: the 2026-07-27 coverage audit is SETTLED; the register absence was verified five ways after Paul pushed back (do not re-litigate).
- Primacy and industry tier boards: purity over volume is standing intent; never re-flag it as a defect.
- Influence engine internals and Single-look holdout discipline: the Velazquez label review is closed (do not re-flag).
- Legislative pillar and ACU review: the category in the dedup key is design, not a defect; do not re-flag it as a bug.
- Staffer network data and math: declaration-directed matching is a structural law; do not re-litigate.
- Agent orchestration and model tiering rules: Paul ruled for ultracode; do not re-litigate it.
- Audio and speech lane: the N audio route did not fail for lack of power; do not let anyone re-litigate it as underpowered.
- CU-geography and CU-geography Luna model and row framework: per-person scoring was authorised in R021; never relitigate it.
- Change control and Paul's decision authority: the ask-first gate is about not applying unasked, not about re-litigating his ratifications.
