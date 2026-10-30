---
type: concept
name: "Single-look holdout discipline"
aliases: ["one-look gate", "pre-registered look"]
description: "Working discipline across the Moneyball/Melange lanes: every confirmatory look (holdout score, pre-registered test, one-shot validator) is spent exactly once against criteria locked before the run, a consumed look is never re-run, and a single-shot holdout is not spent on a freeze already known to be non-certifiable."
related_to:
  - "[[2026-07-feature-audio-and-speech-lane]]"
  - "[[2026-07-feature-influence-engine-internals]]"
  - "[[2026-07-feature-personality-psychometrics]]"
  - "[[2026-09-feature-cu-geography-luna-and-row-framework]]"
  - "[[2026-09-feature-forecast-giving-redesign]]"
  - "[[2026-10-03-pac-accuracy-attempt2-rulings]]"
  - "[[cu-geography]]"
  - "[[quant-model-evaluation-skill]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-attempt2-lane-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-attempt2-lane-2026-10-03.md", sha256: "10cf0f215277dcb435746964245dfd6291be8f676bf9c981cdeed7015ac02cd4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/luna-stratified-scaling-review-2026-09-29.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\luna-stratified-scaling-review-2026-09-29.md", sha256: "fa047e83455b71681045d3bcee783f50bb00e230f3fc0b1e0ebc5d5b44dc0d7d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/gold-template-audio-2026-07-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\gold-template-audio-2026-07-16.md", sha256: "d1dce0771c2a722f3bf397dc4e0956a6dc3f887d659e421baad558bae2787948"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/n-slot-reanchor-2026-07-11.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\n-slot-reanchor-2026-07-11.md", sha256: "e45c60d71c2689672cec1494ff32a691eac421ffc384113239cd1dc6a2b6b0e4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-2026-07-07-gate2-round1.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-2026-07-07-gate2-round1.md", sha256: "620e375015bda9de9b470e08aaa01403aa0401385c4b12978c1a487f0338aac6"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pac-accuracy-six-year-lookback-directive-2026-10-03.md", type: "claude-memory", synced_at: "2026-10-07", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pac-accuracy-six-year-lookback-directive-2026-10-03.md", sha256: "df58a8d72c36127f4bfe1b204c69a5d1c67bc64fa8a4b935439291ceec49ce9b"}
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/concept", "domain/research"]
---

# Single-look holdout discipline

> A holdout or optimization "look" can be spent once: pre-register the gate before the run, never re-run a consumed look, and never spend a single-shot holdout on a known non-certifiable model.

## Parts

- [[single-look-holdout-discipline-look-ledger]] — Dated ledger of the looks and holdout uses that the single-look discipline records, one row each with lane and outcome, from the 2026-07-07 Big Five retest to the scheduled 2027-03-08 PAC scoring and the planned 2028 clean test.
- [[single-look-holdout-discipline-case-1-moneyball-gate2]] — Case 1 of the single-look discipline, the Moneyball session of 2026-07-07: the interview-C retest whose one look was taken, the improvement rounds that missed, the round-3 campaign and the audit and honesty pass, plus other outcomes.
- [[single-look-holdout-discipline-cases-2-3-n-slot-and-gold-template]] — Cases 2 and 3 of the single-look discipline: the N-slot re-anchor of 2026-07-11, whose pre-registered gate passed 5/5, and the gold-template Senate panels of 2026-07-16, whose two one-look rounds both missed, with the audio two-check design.
- [[single-look-holdout-discipline-cases-4-5-luna-and-pac]] — Cases 4 and 5 of the single-look discipline: the Luna CU-geography holdout of 2026-09-30, used twice, leaving no untouched labelled data, and PAC accuracy attempt 2 of 2026-10-03, whose UT-X holdout was sealed, then opened for development.

## Description

- The discipline recurs in every quantitative lane of the project: the Big Five psychometrics campaign (2026-07-07 to 2026-07-16), the N-slot re-anchor (2026-07-11), the Luna CU-geography holdouts (2026-09-29/30) and the PAC-to-candidate accuracy attempt 2 (2026-10-03).
- Core rule set:
  1. **Pre-register.** Pass/fail criteria are locked (hashes, commits, frozen METHOD_SPEC) before the look runs; this is the anti-basis-shopping device.
  2. **One look.** The look is consumed whether it passes or misses. Re-printing the same frozen numbers is fine; re-testing after data changes is a NEW test needing a NEW pre-registration.
  3. **Never re-run a consumed look.** "Never re-run" is written into the memory of each consumed look.
  4. **Do not spend a single-shot holdout on a known non-certifiable model.** "UT-X holdout can be scored once; spending it on a known non-certifiable freeze wastes it." (PAC attempt 2.)
  5. **No look-fragments.** A fresh instrument x criterion pairing computed before the lock (even by a subagent, even from shipped scores) is a look-fragment: VOID, never cite (2026-07-16 taint).
- Relationship to the model-evaluation tooling: the [[quant-model-evaluation-skill]] encodes confirmatory looks as separate-owner-authorization events (see its "confirmatory looks follow separate owner authorization" scope).
- Where it applies in the vault: [[2026-07-feature-influence-engine-internals]] (Big Five / receptivity gates), [[2026-07-feature-personality-psychometrics]] (Big Five panels), [[2026-07-feature-audio-and-speech-lane]] (audio identity gates), [[2026-09-feature-cu-geography-luna-and-row-framework]] and [[cu-geography]] (Luna holdout use), [[2026-09-feature-forecast-giving-redesign]] and [[2026-10-03-pac-accuracy-attempt2-rulings]] (UT-X sealed). Dated note (2026-10-04, all-sector phase rulings): Paul's E4 opened P&C/UT-X for development, superseding C1; holdout spent, never certifies.

## Key Characteristics

- A look has an owner-visible state: PRE-REGISTERED -> LOCKED (commit/hash) -> CONSUMED (PASS or MISS) -> terminal for that route. Each consumed look in [[single-look-holdout-discipline-look-ledger]], [[single-look-holdout-discipline-case-1-moneyball-gate2]], [[single-look-holdout-discipline-cases-2-3-n-slot-and-gold-template]] and [[single-look-holdout-discipline-cases-4-5-luna-and-pac]] is marked "never re-run".
- A MISS is evidence, not a failure to be retried: the 2026-07-16 MISSes became the evidence FOR the honest one-panel labels; the 2026-07-07 round-1 MISSes left the shipped config standing.
- Gates are about construct integrity and fresh reliability when no criterion exists (N-slot re-anchor: "No gold-standard N criterion exists (still) so the gate is construct-integrity + fresh reliability, NOT convergence-with-criterion").
- Estimators must be judged on an external criterion, not a metric the method itself inflates (2026-07-07 H-1: split-half reliability inflated by double shrinkage).
- Statistical sanity of "one more look": a joint-null false-pass simulation (pass-both-panels about 1.5-2%, plus dual dominance under 1%) showed exactly ONE more look per trait is defensible; more = basis-shopping (2026-07-16).
- A holdout used twice leaves no untouched labelled data; a further model change cannot then be validated honestly without new labels (Luna, 2026-09-30).
- Sealing is a ruling: opening a sealed holdout needs a new owner ruling (PAC attempt 2, C1).
- Update 2026-10-30: the 2026-07-07 memory `moneyball-2026-07-07-gate2-round1` (sha256 620e375015bda9de9b470e08aaa01403aa0401385c4b12978c1a487f0338aac6) records looks beyond the round-1 cases above. Round 2, a residualized A/C/O fit with v2-E kept (pre-registered at commit 54d0f7c), missed, and its look was taken. The psychology round-3 campaign, closed the same day, ran 11 pre-registered designs with one look each. One of them, P6 gated shrinkage, passed its bar and was promoted, but the memory records that the pass came from a split-half artifact (double-shrink inflation, finding H-1) and that the claim was retracted, with the change kept on external-criterion grounds. The rule above, that more than one further look per trait is basis-shopping, was written on 2026-07-16. The memory does not reconcile the campaign with that rule. Read the memory for the full look ledger.

## Where it Applies

- [[quant-model-evaluation-skill]] - General read-only skill for evaluating models, numbers and claims; merged to main c13f3a5d4 (2026-09-30); Melange gates in a binding.
- [[2026-07-feature-audio-and-speech-lane]] - Speech/audio lane: no shipped ASR, off-chain fail-closed, N audio route closed; audio layers complementary; four false mechanism claims.
- [[2026-07-feature-influence-engine-internals]] - July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder
- [[2026-07-feature-personality-psychometrics]] - Big Five psychometrics for Congress members: instruments, pre-registered looks, Senate-gold anchoring, N/A slots; O/C/E valid, A- grade.
- [[2026-09-feature-cu-geography-luna-and-row-framework]] - CU-geography: Luna RF/KNN review closed 09-30 (section 30 GPU model current) plus the 491,308-row framework in Paul's four groups (P0/P1).
- [[2026-09-feature-forecast-giving-redesign]] - Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD).
- [[cu-geography]] - Codex-run CU geography lane: Luna RF/KNN model (closed 09-30) and 491,308-row ranking framework in Paul's four groups.
- [[2026-10-03-pac-accuracy-attempt2-rulings]] - Paul's 2026-10-03 rulings on PAC accuracy attempt 2: B1-B3, then C1 (UT-X sealed) and C2 (FILED = lower bound).
- [[melange-systems]] — Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
- [[forecast-redesign]] — Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- [[2026-07-feature-audio-and-speech-lane-july-foundations]] — The July 2026 audio foundations: speaker verification and the ES cross-modal validation of 07-09 (superseded the same day as gender-confounded), the audio-side facts of the suggested-approach narratives, and the Senate gold and audio identity design of 07-16.
- [[2026-09-feature-cosponsor-first-signature-forecast-experiments]] — the 2026-09-05 cosponsorship experiments kept their prospective forecasts immutable and scorable only after the window closes (from 2026-10-06)

## Related Concepts

- [[gold-set-validation]] — A measure earns trust by scoring against a fixed, independently labelled, owner-ruled gold set held out from the pipeline under test.
