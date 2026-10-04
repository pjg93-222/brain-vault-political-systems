---
type: topic
title: "Audio and speech lane"
aliases: ["Audio and speech lane"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[melange-audio-pipeline]]"
objective: "Record the state, measurements, rulings and traps of the Melange speech/audio lane (speaker verification, ASR, prosody, quirk rates, the N-signature look, complementary audio layers in member profiles) so that no later session re-litigates settled results or repeats confident-but-false mechanism claims."
created_at: 2026-07-09
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/audio-complementary-layers-lane-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\audio-complementary-layers-lane-2026-09-07.md", sha256: "588eaed2b4c6f6cf71d99e71bcb4a0983cbcde5e4213824f888f15839ee30b64"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/audio-lane-verification-lessons-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\audio-lane-verification-lessons-2026-09-07.md", sha256: "51b04a40fd7e6d728012dc145e10d1ecfcf77c340ef8e343a43110a507037f88"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/speech-recognition-lane-state-2026-08-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\speech-recognition-lane-state-2026-08-19.md", sha256: "fdc20a6db2da838a6d06174e931a2e82e9908ef12ff4f4b97032dbf42887a755"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/gold-template-audio-2026-07-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\gold-template-audio-2026-07-16.md", sha256: "d1dce0771c2a722f3bf397dc4e0956a6dc3f887d659e421baad558bae2787948"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-audio-narratives-2026-07-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-audio-narratives-2026-07-09.md", sha256: "79e8d71ad2a5aeba6c35fd4d8359c40c9ecede3fbe35ed027ed87f862aa16958"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# Audio and speech lane

> The audio/speech work for [[melange-systems]]: no SHIPPED ASR (faster-whisper installed and pinned 2026-08-20 but consumed by nothing), audio lane off-chain and fail-closed at 0 accepted clips, chyron OCR leak, sex-confounded pitch variability, the N-signature audio look SPENT and MISSED (route closed), Paul's 2026-09-07 ruling that audio layers are COMPLEMENTARY not overriding (audio exists 533/533), and the verification lessons from four false mechanism claims. Newest source date 2026-09-08.

## Parts

- [[2026-07-feature-audio-and-speech-lane-july-foundations]] — The July 2026 audio foundations: speaker verification and the ES cross-modal validation of 07-09, the audio-side facts of the suggested-approach narratives, and the Senate gold and audio identity design of 07-16.
- [[2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements]] — The N audio route of 2026-08-21 to 08-25 from the ES prereg lock to the spent and missed look, with its ledger and venue corrections, the venue, reliability and identity measurements, and the Whisper, C-SPAN and Gemini facts.
- [[2026-07-feature-audio-and-speech-lane-complementary-layers-and-lessons]] — The complementary layers lane of 2026-09-07 and its verification lessons on four confident wrong agent claims.

## Context

- Actor: [[melange-audio-pipeline]] (the code and artifacts). Feeds the Fable narratives in Member approach briefs and narratives. Psychometric context: Personality psychometrics (Big Five) (Big Five instrument, the 2026-07-16 gold/audio session). Verification rules: Verification and evidence standards. Look discipline: [[single-look-holdout-discipline]]. Owner: Paul Goff.
- Source memories: `speech-recognition-lane-state-2026-08-19` (39.8 KB; last modified 2026-08-25), `audio-complementary-layers-lane-2026-09-07`, `audio-lane-verification-lessons-2026-09-07`, `gold-template-audio-2026-07-16`, `moneyball-audio-narratives-2026-07-09`.
- Corpus facts: every word the shipped system analyzes is third-party text (C-SPAN closed captions, GovInfo CHRG, Congressional Record, publisher transcripts CNN/MSNOW/PBS/Meet-the-Press/Face-the-Nation): 268,327 speech rows / 532 of 533 members / 57.6M words in `social_media.db:speeches`.
- `C:\melange-data` EXISTS (167.3 GB, 69,373 files): audio is 533/533 (`member_longform_audio_v1` = 655 WAVs / 38.26 GB / 285.03 hours, ledgered in `data/speech/member_longform_acquisition_v1.jsonl`, every wav path verified present). The "~48 GB audio unrecoverable" note in `backup-coverage-gap-2026-09-07` is WRONG.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[melange-audio-pipeline]] | Audio speaker verification + speech layers: faster-whisper pinned, unused; off-chain fail-closed; layers complementary; feeds narratives. |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model
- [[fail-closed-gates]] — the audio lane is off-chain and fail-closed: b5_audio_descriptors_v2.json is ACTIVE_FAIL_CLOSED at 0 accepted clips

## Related Topics

- Member approach briefs and narratives - Per-member Suggested-approach briefs (Fable 533 calls; Sonnet lane): Tier 2 style, acoustics in, no percentiles, validator traps.
- Personality psychometrics (Big Five) - Big Five psychometrics for Congress members: instruments, pre-registered looks, Senate-gold anchoring, N/A slots; O/C/E valid, A- grade.
- Verification and evidence standards - Verify, never infer: census before mechanism claims, repo-wide existence checks, scout NOT FOUNDs disproved, HEAD-pinned cites.

## History

| Date | Event |
|---|---|
| 2026-07-09 | Audio speaker-verification pipeline (`fec/b5_audio_verify.py`, Haiku 4.5 + captions) + 3-paragraph Fable narratives shipped (branch claude/epic-aryabhata-7aa1e1, display-only). ES cross-modal validation +0.208 recorded, then superseded same day as gender-confounded (locked robustness look @34bf7e4). A- re-grade ratified. |
| 2026-07-16 | Two-panel Senate gold verdicts + audio two-check design presented; TWO one-look rounds locked @66f9772, both consumed and MISSED (RESULT-OW @0aab1f4, RESULT-NV @0ab1368); methods section 41 @c6b7837; audio identity layer built TDD (DRAFT prereg not locked). |
| 2026-07-26 | Gemini AV pilots = NO-GO (fabrication receipts); 150-clip human-annotation packet fully built, never coded. |
| 2026-08-18 | `fetch_hearings_seq.py` resolver fixed (65,912 of 679,221 attributed turns = 9.7% cross-chamber mis-assignments); `hearings_seq.db` never rebuilt. |
| 2026-08-19 | Full speech-lane audit (16-agent read-only fan-out + first-hand verification); first transcription-AGREEMENT measurement (Gemini vs YouTube captions mean 0.945); Gemini audio found routable via MP4. |
| 2026-08-20 | Live experiments: Gemini 2x3 speaker-ID (chyron OCR leak), whisper install (faster-whisper 1.2.1 pinned, Paul-approved), filler-prompt trick, prosody ICCs, pitch_variability sex confound reproduced. |
| 2026-08-21 | Landed as commits `4193f0140` + `1b2055b81` on branch `claude/melange-speech-recognition-cfa049`; Paul's four rulings; source inventory; chyron pilot `64caa87d8`; 475 re-adjudication `1d9dad0a5`; venue ruling; quirk reliability; Salam 2022 test. |
| 2026-08-23 | C-SPAN fetch recipe re-derived (July recipe dead); Windows Application Control blocks PyAV (av stub needed). |
| 2026-08-24 | ES behavioral prereg LOCKED (`4604bd729`); G1 TERMINAL (N prereg retired-without-a-look, look never spent); NPR edited-clean finding; whisper decode defect; target orientation amended to N; G2 state and Sunday date-join; ledger corrections after Paul's challenge. |
| 2026-08-25 | N audio route CLOSED: the one look SPENT and MISSED (AMENDMENT 1 `213bd6e64`, RESULT `8bf113948`); WJ feature-layer corrections + profile pilot v1. |
| 2026-09-03 | Long-form promotion verification chain DIED on an Anthropic API credit exhaustion. |
| 2026-09-07 | Complementary-layers lane: Paul's governing ruling; four false mechanism claims measured. |

## Decisions

- **Audio layers are COMPLEMENTARY, never either/or** (Paul 2026-09-07: "this data is not meant to override each other but be complementary."). Every member shows every layer they have, each labeled with its own scale and caveat. This overrides the earlier `if descriptive / else cache` design.
- **Multi-outlet corpus is fair game** (Paul 2026-08-21): C-SPAN when necessary, plus Fox/CNN/NPR etc.; "anything where there is a match is fair game." This dissolves the single-source independence-gate blocker. ~~C-SPAN cannot satisfy the v2 independence gate; the "fetch 363 programs" plan is dead as designed (2026-08-20)~~ - the 2026-08-21 ruling changed the framing (bottleneck is AUDIO BINDINGS, not matches); the 2026-08-20 finding stays as the reason the gate could not be met by C-SPAN alone, and redefining `program_key` to evade it remains contract-gaming.
- **Interviews are the signal venue; floor measures the mask** (Paul 2026-08-21).
- **Gemini unavailable -> default to Claude** (2026-08-21): recorded in the repo `gemini-perception` SKILL.md; Claude = text/image; audio = local pinned stack (b5_speech_quirks + openSMILE).
- **ASR gets integrated, or worked toward** (2026-08-21): first shipped step `fec/members/b5_speech_quirks.py`.
- **Target orientation amended to N (2026-08-24):** the prereg validates N, not ES (zero bar/channel/gate changes).
- **Hold the look statements:** the N-signature look was spent 2026-08-25 and missed; route closed; instrument stays 3/5 (O/C/E).
- ~~Original ES/N prereg venue reading~~ and ~~"A is weakly validated"~~ - corrected (see Ledger corrections in [[2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements]]).
- **Model tiering for audio verification:** Haiku 4.5 for mechanical audio-clip verification; escalate to Sonnet, never Fable, if Haiku regresses (see Member approach briefs and narratives).
- Commit authorized for the 2026-09-07 lane (lifts `no-git-plain-review-2026-09-01` in this lane only).

## Next Steps

- [ ] Paul: APPLY the 15 wrong-member clip corrections (fold into `b5_audio_verify` / rebuild `b5_audio_cache`); not done.
- [ ] Re-run `build_member_narrative_ledger.py` -> `regenerate_descriptive_profiles.py --activate` -> desk rebuild so the complementary-layers fix becomes active (INERT until then; the 74 voiceprint-only members still read the false "Accepted audio: 0 clips" sentence).
- [ ] Commit the 14 uncommitted LIVE-tree files (commit blocked for Claude by the auto-mode classifier; Paul commits); include the two UNTRACKED siblings `descriptive_profile_overrides.py:23` and `descriptive_public_accounts.py:24`, or the producer is un-importable.
- [ ] Rebuild `hearings_seq.db` with the fixed resolver (stale DB still feeds `hearing_antagonism` and the member desk for 456/533 members).
- [ ] Register `test_cspan_identity.py` (13 tests) and `test_big5_gold_audio_tdd.py` (13 tests) in `_LANE_MODULES` (`fec/tests/run_tests.py:304-306`).
- [ ] Run a 10-member pilot of the long-form promotion chain before committing days of compute.
- [ ] Re-run the Gemini OFF condition (7/30 blind arm, zero verification arms) before quoting any OFF rate; quota resets about 2026-08-27 (individual tier account-level).
- [ ] Paul-gated: successor N prereg on the certified static timing/energy channels (locking is Paul's gate); venue amendment for Sunday audio (CERTIFY -> AMEND -> LOOK); MFCC voice-C fallback prereg; C-SPAN TollBit licensing decision; 150-clip human-annotation packet coding; fetching ~513 attributed WJ programs (~20 GB, Paul-gated sweep); Paul D1-D12 decisions for the audio identity layer.
- [ ] Post-merge regeneration of the empty v2 artifact to pick up the new contract text (branch `claude/melange-speech-recognition-cfa049` merge is Paul's).

## State at a glance (audit 2026-08-19/20, extended 2026-08-20, landed 2026-08-21)

- Landed as commits `4193f0140` + `1b2055b81` on branch `claude/melange-speech-recognition-cfa049` (merge is Paul's). Full audit = 16-agent read-only fan-out + first-hand verification, extended 2026-08-20 with live experiments (Gemini 2x3 speaker-ID, whisper install + probes, prosody ICCs).
- **No SHIPPED Melange pipeline does speech recognition.** (2026-08-20 session probes ran local whisper in the scratchpad; nothing in-repo consumes any ASR output.)
- **One ASR engine is coded into the repo; its runtime is now installed but wired to nothing.** `asr_words_from_whisper()` at `fec/members/b5_audio_align_turns.py:249` (faster-whisper, greedy pinned, `local_files_only=True`); it hard-refuses rather than downloading weights. As of 2026-08-19 nothing was installed; SUPERSEDED 2026-08-20 (install block in [[2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements]]). Still absent: `speechbrain`, `torchaudio`, `aeneas`. Already present: torch, transformers, opensmile, librosa, soundfile, yt_dlp. `big5_methods.md:1227` recorded the no-download state as a deliberate choice; Paul's 2026-08-20 grant lifted it for whisper only. In the design Whisper was only ever an independent word-recovery cross-check against Aeneas boundaries, never the transcript source.
- **But machine ASR IS in the loop, twice** (do not say "no ASR anywhere"): (1) `fec/members/b5_audio_verify.py:38` runs `yt-dlp --write-auto-subs` = Google's ASR; that caption text drives a Haiku identity check whose `b5_audio_verify.json` gates which clips get featurized (`b5_audio_build.py:60-69`): 2,192 clips -> 1,761 keep / 431 drop / 448 members; 147 clips have no captions at all. (2) Aspen Security Forum PDFs are self-labeled ASR-derived (`fec/members/fetch_interviews.py:1013-1014`), accepted for turn STRUCTURE only; 74 rows shipped.
- **The lane is off-chain and fail-closed.** `grep -c b5_audio fec/run_pipeline.py` = 0. `b5_audio_descriptors_v2.json` = `ACTIVE_FAIL_CLOSED`, `accepted_clip_n: 0`, `members: {}`. `profile_basis_v2.json` = 533 rows, 0 non-null `verified_audio_v2`. 17.24 GiB / 2,192 WAVs / about 161 hours / 448 members sit in `audio_pilot/` producing nothing. `b5_audio_cache.json` holds 88 eGeMAPS features for 410 members, consumed only by research scripts. Blocker is the two-independent-human-review gate (`b5_audio_reviews_v2.json` empty), not code.
- **Never measured against human gold:** WER/CER, alignment quality on real audio (the 0.80/0.70 `word_match` bars in `fec/audio_rules.py:38-39` are asserted, never calibrated), diarization accuracy on real audio. Recognizer-vs-recognizer AGREEMENT was measured (0.945 / 0.745 / 0.695, see in [[2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements]]) but no human-transcribed reference exists anywhere. The 150-clip human-annotation packet that would create one was fully built 2026-07-26 and never coded: it is the gate both Fable audits demand.
- **Lane is dormant IN-REPO (as of 2026-08-19):** last substantive commit `ef9e4c4dd` 2026-07-16; `3e01e9cca` 2026-08-05 was only a file-move refactor; the 2026-08-19/20 session activity landed nothing until the 2026-08-21 commits. Nothing on disk states whether the lane is parked or paused - that absence is itself the gap.

### Two live issues (as of 2026-08-19)

1. `test_cspan_identity.py` (13 tests, guards the SHIPPED C-SPAN attribution path) and `test_big5_gold_audio_tdd.py` (13 tests) are registered in NOTHING - absent from `_LANE_MODULES` in `fec/tests/run_tests.py:304-306`, no conftest, no pytest.ini, no CI. The runner's own comment says "a suite no runner invokes is indistinguishable from a deleted one." Also: zero C-SPAN checks across all 37 `fec/audit/*.py` files, and the production audio guard at `audit_full.py:1163-1182` passes VACUOUSLY (all three per-clip loops iterate zero times against empty artifacts).
2. `fetch_hearings_seq.py:74-79` measured 65,912 of 679,221 attributed turns (9.7%) as cross-chamber mis-assignments from a senate-first surname guess. The resolver was FIXED 2026-08-18, but `hearings_seq.db` was never rebuilt - the stale DB still feeds `hearing_antagonism` -> the member desk for 456/533 members.

### FIXED in commit 4193f0140 (no longer open)

- (a) `pitch_variability_raw` sex confound - now plain semitone SD (stddevNorm*amean), measured r(sex=F) -.065 vs -.266, contract text updated.
- (b) `topic_emotional_intensity` sign-determinism - within-member permutation null (seed 7, 2000 relabelings), sign claims require `sign_informative=true`.
- Both covered by the producer self-test (17/17). Kernel gate 152/9 with the SAME 9 failing at HEAD (stash-verified baseline; worktree data-plane + the known test_primacy_tier item). The empty v2 artifact still needs a post-merge regeneration to pick up the new contract text.

## PAUL'S RULINGS 2026-08-21 (session a279d144) - these change the lane's posture; the findings are the SPEC, not dead ends

1. **Multi-outlet corpus is fair game** - C-SPAN when necessary, plus Fox/CNN/NPR etc.; "anything where there is a match is fair game." This DISSOLVES the single-source independence-gate blocker: 501/533 members already have >=2 distinct INTERVIEW outlets on the transcript side (482 have >=3). The bottleneck is AUDIO BINDINGS, not matches.
2. **Commit the work** - done: `audits/speech_lane_20260820/` (FINDINGS.md + 237 receipt files, force-added per house audit convention past the blanket `*.json`/`*.txt` gitignore); media preserved off-repo at `C:\melange-data\speech_lane_20260820\` (65MB).
3. **Gemini unavailable -> default to Claude** - recorded in the repo `gemini-perception` SKILL.md (audio-routability block corrected there too). Claude = text/image; audio = local pinned stack (`b5_speech_quirks` + openSMILE). User-scope skill copy syncs AFTER merge.
4. **ASR gets integrated, or worked toward** - first shipped step: `fec/members/b5_speech_quirks.py` (pinned-whisper hesitation/discourse/stutter producer, dual plain+prompted decode, 0.85 coverage anomaly guard, `.candidate` output, `test_speech_quirks` registered in the kernel gate). Paul flagged PESSIMISM in the session framing - the corrective: findings are engineering items with fixes, and two were FIXED THE SAME DAY (above).
