---
type: concept
name: "Fail-closed gates"
aliases: ["fail-closed rule"]
description: "When a check cannot be satisfied, the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/platform"]
---

# Fail-closed gates

> When a check cannot be satisfied, the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call.

## Description

A design rule that recurs across the Melange pipeline, its refresh jobs and the agent tooling: a gate that cannot verify its input stops instead of producing a plausible-looking result. A tripped guard exits with zero artifacts, a layer with no accepted input publishes nothing, and an expired admission makes the chain and the desk stop. The 2026-09-19 refresh audit repeated the standing rule recorded on 2026-08-09: the refresh gates are deliberate fail-closed rulings, the audit and `weekly_refresh.py`'s `hard=True` are never weakened to make a Sunday run green, and loosening a gate is Paul's call.

The rule is about missing or unverifiable evidence, not only wrong answers: a coordination evaluator refuses a verdict on missing or self-generated evidence, and a review loop stops for review on a safety flag instead of rewording and retrying. Where a gate is deliberately fail-open, the record says so at the gate: the say-do gate was landed (2026-07-07, kept in the 2026-07-08 generalization) to fail OPEN when its evidence source is unreadable, though the 2026-09-12 kernel run reported its "missing evidence source fails OPEN" check failing as a pre-existing defect.

## Key Characteristics

- On a failed or unverifiable check the gate emits nothing or halts the run; it never substitutes a guess or a default.
- Loosening a gate, or choosing fail-closed versus label-closed publication, is Paul's ruling; an agent does not weaken a gate to make a run pass.
- A gate must also fail on empty input: the production audio guard passes vacuously because its per-clip loops iterate zero times, which hides the gap instead of blocking it.
- A guard is trusted once a fixture proves it (exit 2, zero artifacts).
- A deliberate fail-open choice is written down next to the gate.

## Where it Applies

- [[2026-08-incident-refresh-automation-reliability]] — the refresh gates are deliberate fail-closed rulings (2026-09-19 audit); the fail-closed versus label-closed publication call waits for Paul
- [[2026-07-feature-audio-and-speech-lane]] — the audio lane is off-chain and fail-closed at 0 accepted clips
- [[codex-executor]] — the bounded Fable-to-Sol retry controller has FAIL-CLOSED review handling: a flag stops the loop for review
- [[metaloop]] — the dynamic-coordination evaluator is fail-closed on missing or self-generated evidence
- [[melange-refresh-scheduler]] — the congress daily-refresh chain is scheduler-owned Python, fail-closed, zero AI; Paul decides every gate
- [[melange-audio-pipeline]] — off-chain and fail-closed; its vacuously passing production guard is the known gap
- [[lobbyview-collector]] — fail-closed guards, all fixture-proven (exit 2, zero artifacts)
- [[sentinel-collectors]] — the 2026-09-01 press and hearing repair made the hearing display fail-closed
- [[melange-systems]] — the project whose pipeline, desk and refresh jobs carry these gates

## Evidence

Other notes that use the rule, by title (plain text, so their link budgets are unchanged):

- Melange fec/ pipeline and Moneyball Blended workbook: the live-only pillar policy is a fail-closed desk gate.
- Melange audits and code reviews: a fail-closed date that stops the chain and the desk; fail-closed spend guards for unattended runs.
- Agent tooling stack: the retry controller's zero-flag gate is fail-closed; the coordination evaluator.
- Single-look holdout discipline: the audio two-check design is an AND-rule fail-closed check.
- Coalition-builder redesign session and Influence engine internals: three fail-closed mirrors (the `receptivity_sensitivity` stage-1 gate among them) weigh against the Big Five 80/20 position.
- Cosponsor and sector networks: `NET_CONFIG` is fail-closed.
- CU stance and sentiment scoring: `dashboard_integrity.postflight` is fail-closed and reconciles every display row to a declared source.
- Melange data-collection lanes: a permanent fail-closed guard on the per-cycle summary; the fail-closed hearing display.
- Legislative pillar and ACU review: the fail-closed title matcher quarantines bills; the coverage merge stops on one phantom citation.
- Personality psychometrics (Big Five): audio production stays blocked at 0 profiles by the two-review identity gate.
- Live tree, git drift and line endings: a fail-closed monotonicity validator; fail-closed identity joins.
- Staffer network data and math: a field shim that fails closed when neither field exists; a fail-closed hash protocol for negative controls.
