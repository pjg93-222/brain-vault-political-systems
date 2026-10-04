---
type: topic
title: "Complementary layers lane and verification lessons (09-07) (Audio and speech lane)"
aliases: ["Audio and speech lane: Complementary layers lane and verification lessons (09-07)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-07-09
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-audio-and-speech-lane]]"
---

# Complementary layers lane and verification lessons (09-07) (Audio and speech lane)

> The complementary layers lane of 2026-09-07 and its verification lessons on four confident wrong agent claims. Part of [[2026-07-feature-audio-and-speech-lane]] (project [[melange-systems]]).

## Complementary layers lane (2026-09-07)

- Member-profile speech section lane. Paul opened furious that Mike Crapo's profile read "Accepted audio: 0 clips · n/a min" with an empty channel table and prose denying he had any audio.
- **Governing ruling:** "this data is not meant to override each other but be complementary." Every member shows every layer they have, each labeled with its own scale and caveat; overrides the `if descriptive / else cache` design.
- **The bug:** `build_member_narrative_ledger.py` emitted two incompatible dict shapes. Descriptive layer (427 members) has `clips` / `minutes` / `channels`; the cache fallback has `seconds` / `standardized_channels`. `standardized_channels` was read by exactly 2 places repo-wide - the producer and one test assertion; zero renderers. So 74 members shipped real voiceprints and rendered zero, and 332 more had their base layer discarded entirely before reaching the artifact.
- **Population: 332 both / 95 descriptive-only / 74 voiceprint-only / 32 neither.** (Earlier 334/93 was wrong - Lindsey Graham is not `verified_audio_profile`; Maggie Goodlander is in neither source.)
- **Paul's other rulings this lane:** promote the long-form recordings - "equal to other recordings, just a different flavor"; merge base + descriptive; floor audio: DO NOT STRIP, label carefully; rebuild `b5_audio_cache` after further adjudication; word count does not matter; commit authorized for this lane (lifts `no-git-plain-review-2026-09-01` here only).
- **Unverified-supply rule has CODE TEETH, not just doc text:** `fec/audit_collection.py:889-891` errors on any accepted-manifest row inside `audio_pilot` -> receipt REJECTED -> `build_descriptive_speech.py:465` stops. But the base corpus is not one population: 1,410 of 2,192 clips are already SOLO_TARGET+MATCH+keep and ARE the audio_pilot half of the anchor vault under a PASS receipt. The rule gates on PATH, not evidence. 2,192/2,192 pass PCM (mono/16k/PCM16).
- **Long-form promotion is NOT a flag flip.** `profile_effect` is write-only - `FULL_PROMOTION` has zero production readers, only test assertions. Real promotion is a five-stage verification chain that DIED 2026-09-03 on an Anthropic API credit exhaustion (the single row in `member_longform_full_turn_candidates_v1.jsonl` is that error). Transcripts complete (533); diarization entirely absent. Measured yield n=1 (Scalise): 35 min -> 1 qualified turn, 0.533 min, about 2.6%. That n=1 was a degraded case (`anchored_member: False`) - do NOT commit days of compute on it; run a 10-member pilot first. 30 members have no voice reference at all and cannot be promoted by any local compute.
- **Do not trust `speaker_anchor_vault_all_verified_v3`'s persisted `target_eligible`** - its receipt contradicts `voice_first_recovery.py:464-467`; `build_full_audio_profile_census.py:5-12` already recomputes.
- **Code landed UNCOMMITTED in the LIVE tree** (14 files; commit blocked for Claude by the auto-mode classifier - Paul commits): `general_audio_habits` (`raw_clip_means`) and `verified_voiceprint_baseline` (`within_source_z`) are now siblings, each null when absent, rendered in separate blocks with separate column sets so z-scores never share a "Comparison" column with raw means. Floor labeled in three states: `floor_only` share 1.0 (149 members), `floor_dominant` >0.5 (29), else present/none. `MAX_WORDS` 250 -> 400, `OVER_BUDGET` 250 -> 320. **The fix is INERT until the ledger re-runs** - `verified_voiceprint_baseline` is absent from the on-disk artifact, so the 74 still read the false sentence until `build_member_narrative_ledger.py` -> `regenerate_descriptive_profiles.py --activate` -> desk rebuild.
- **`regenerate_descriptive_profiles.py` imports two UNTRACKED siblings** (`descriptive_profile_overrides.py:23`, `descriptive_public_accounts.py:24`) - committing without them leaves the producer un-importable.
- The audit gate built in this lane was validated with one negative control (pre-fix state -> FAIL x3) plus four planted defects, each failing only its own check - the standard to hold agents to.

## Verification lessons (feedback rule, 2026-09-07): four confident wrong agent claims in one lane

Demand a census before repeating a mechanism claim to Paul. Three of the four were repeated to Paul before they were checked.

1. **"Members are dropped when `nonfloor_exact_windows_total == 0`."** False. Measured 2x2: 156 members with zero non-floor windows ARE in the descriptive artifact. The real discriminator is presence in the accepted clip manifest.
2. **"Chip Roy loses a verbatim quote to the composer budget."** False. The branch is unreachable - 0 of 529 composed members trip it; `build_rows` at 250 vs 100000 gives zero differences. A fix was recommended to Paul for a defect that did not exist.
3. **"Line-ending churn will conflict with other lanes."** False. `core.autocrlf=true`, no `.gitattributes`; `git diff --numstat` is identical with and without `--ignore-cr-at-eol`. Paul was warned about a non-issue.
4. **"The promotion markers are load-bearing."** False. The agent's own evidence showed all three readers are test files asserting a written literal. No production code branches on `profile_effect`.

- Also: population counts 334/93 were wrong (actual 332/95), and a first-draft regression test drew its expectation from the artifact it was validating, so a replanted bug passed it.
- **Why:** every one of these was a claim about MECHANISM ("X is dropped because Y", "this branch fires") stated without a census or a negative control. Mechanism claims are exactly where plausible reasoning survives unchecked, because the code genuinely contains the branch being described - it just never executes.
- **How to apply:** before repeating an agent's mechanism claim to Paul, demand the census or the counterfactual - how many rows actually satisfy the predicate, and does flipping the constant change the output? "This code path causes X" is not evidence until someone counts the rows that take it. Same family as `examination-lane-lessons-2026-08-14` (existence claims need repo-wide grep) and `verify-dont-infer-completion-2026-08-04`. Corollary that DID work: negative control + planted defects (above).
