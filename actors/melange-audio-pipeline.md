---
type: actor
name: "Melange audio pipeline"
aliases: ["speech/audio lane", "faster-whisper"]
category: "pipeline"
description: "The Melange audio/speech pipeline: speaker verification (captions + Haiku identity check), eGeMAPS/openSMILE prosody, pinned faster-whisper quirk producer, descriptive speech profiles and voiceprint baselines; off-chain and fail-closed at 0 accepted v2 clips; audio layers are complementary, not overriding."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems (fec/members/b5_audio_*.py, fec/audio_rules.py; data in C:\\melange-data)"
stack: "Python: yt-dlp captions, Haiku 4.5 verification, openSMILE eGeMAPS v02, librosa/soundfile/torch/transformers, faster-whisper 1.2.1 (ctranslate2 4.8.1, Systran/faster-whisper-small), Gemini via agy (MP4 only), ffmpeg"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "Off-chain and fail-closed: b5_audio_descriptors_v2.json ACTIVE_FAIL_CLOSED, accepted_clip_n 0; blocked by the two-independent-human-review gate"
  - "faster-whisper installed and pinned 2026-08-20 but consumed by no shipped pipeline"
  - "15 wrong-member clips (13 members) still in b5_audio_cache.json; apply is Paul's gate"
  - "Complementary-layers fix is INERT until build_member_narrative_ledger.py -> regenerate_descriptive_profiles.py --activate -> desk rebuild; 14 files uncommitted in LIVE"
  - "Stale hearings_seq.db (resolver fixed 2026-08-18, DB never rebuilt) feeds hearing_antagonism for 456/533 members"
  - "test_cspan_identity.py and test_big5_gold_audio_tdd.py registered in no runner; audit_full.py:1163-1182 audio guard passes vacuously"
  - "C-SPAN chyron OCR leak: any speaker-ID number from video-bearing C-SPAN clips is worthless"
  - "pitch_variability_raw was sex-confounded (fixed in 4193f0140); windows Application Control blocks PyAV (av stub needed)"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/audio-complementary-layers-lane-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\audio-complementary-layers-lane-2026-09-07.md", sha256: "588eaed2b4c6f6cf71d99e71bcb4a0983cbcde5e4213824f888f15839ee30b64"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/speech-recognition-lane-state-2026-08-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\speech-recognition-lane-state-2026-08-19.md", sha256: "fdc20a6db2da838a6d06174e931a2e82e9908ef12ff4f4b97032dbf42887a755"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-audio-narratives-2026-07-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-audio-narratives-2026-07-09.md", sha256: "79e8d71ad2a5aeba6c35fd4d8359c40c9ecede3fbe35ed027ed87f862aa16958"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Melange audio pipeline

> The audio speaker-verification and speech layers of [[melange-systems]]: yt-dlp captions + a Haiku identity check gate which clips get featurized (eGeMAPS/openSMILE), a pinned faster-whisper quirk producer exists but is consumed by nothing, the v2 descriptor artifact is off-chain and fail-closed, and the profile-facing audio layers are COMPLEMENTARY, never overriding (audio exists for 533/533 members). It feeds the Fable narrative paragraphs ([[2026-07-feature-member-approach-briefs]]). Also known as "speech/audio lane" and "faster-whisper".

## Details

| Field | Value |
|---|---|
| Repository | Melange tree `fec/members/b5_audio_*.py`, `fec/audio_rules.py`, `fec/members/b5_speech_quirks.py`; data off-repo at `C:\melange-data` (167.3 GB, 69,373 files); branch `claude/melange-speech-recognition-cfa049` (commits `4193f0140` + `1b2055b81`, merge is Paul's) |
| Stack | yt-dlp, Haiku 4.5, openSMILE eGeMAPS v02, faster-whisper 1.2.1 + ctranslate2 4.8.1, librosa, soundfile, torch, transformers, ffmpeg |
| Status | active (but off-chain: `grep -c b5_audio fec/run_pipeline.py` = 0) |
| Criticality | medium (display-only layers; engine and ranks never read audio) |
| PCI | false |
| Team | none |

## Dependencies

- Lane record and rulings: [[2026-07-feature-audio-and-speech-lane]]. Consumers: the member desk narrative slot via [[2026-07-feature-member-approach-briefs]]; the Big Five instrument context in [[2026-07-feature-personality-psychometrics]]. Project: [[melange-systems]].
- Inputs: C-SPAN (closed captions, HLS media via yt-dlp program-page extractor), `social_media.db:speeches` (268,327 rows / 532 of 533 members / 57.6M words), `member_desk_bundle.json` identity cards, `profile_basis_v2.json`, `fec/legislators.csv` (gender, 'Republican' covariate), NPR/Sunday-show podcast RSS audio, WJ clips (`C:\melange-data\wj_audio\turns\`, `turns_v2\`), `member_longform_audio_v1` (655 WAVs / 38.26 GB / 285.03 hours).
- External: Anthropic API (Haiku 4.5 verification; credits exhausted 2026-09-03 killed the long-form chain), Gemini via `agy` (MP4 containers only), Google YouTube auto-captions (ASR), TollBit-gated C-SPAN, ffmpeg.
- Depended on by: desk "Suggested approach" narratives, descriptive speech profiles, speech reaction profiles (display-only).

## Flows

1. **Speaker verification (shipped 2026-07-09):** `fec/b5_audio_verify.py` - per clip yt-dlp auto-captions (`b5_caption_cache.json`) + Haiku 4.5 two-field classification: speaker structure SOLO/MULTI/NOT_SPEAKING and identity vs a per-member identity card (title/state/district/party/committees). Identity from a HARD signal only (self-naming, "the gentlewoman from X", chair recognition, "my bill the __ Act"); topic is nuance, NEVER MATCH/MISMATCH; NONE -> NEUTRAL; keep = SOLO & identity != MISMATCH; evidence phrase stored. Output `b5_audio_verify.json` {clip:{speaker,identity,evidence,keep}}.
2. **Featurization gate:** `fec/b5_audio_build.py` featurizes only keep=true clips -> `b5_audio_cache.json` (88 eGeMAPS v02 features). 2026-07-09 result: 395/445 members with >=180 s verified-clean audio, 142 wrong-member clips caught, median about 17 min/member. Later state: 2,192 clips -> 1,761 keep / 431 drop / 448 members; 147 clips have no captions; `b5_audio_cache.json` = 88 features for 410 members (research scripts only).
3. **Research consumers only:** `b5_audio_eval`, `b5_c_valid`, `b5_audio_ctcm`, `b5_audio_faithful`; `b5_es_crossmodal.py` supersedes the mis-signed `b5_audio_ctcm` / `b5_audio_eval` composites (do not trust their signs).
4. **V2 descriptor artifact:** `b5_audio_descriptors_v2.json` = `ACTIVE_FAIL_CLOSED`, `accepted_clip_n: 0`, `members: {}`; contract `on_air_interviews_only: true`; needs two independent human reviews (`b5_audio_reviews_v2.json` empty). `profile_basis_v2.json` has 0 non-null `verified_audio_v2`.
5. **Descriptive/complementary layers (2026-09-07 lane):** `build_member_narrative_ledger.py` -> `regenerate_descriptive_profiles.py --activate` -> desk rebuild. `general_audio_habits` (`raw_clip_means`, 427 descriptive members) and `verified_voiceprint_baseline` (`within_source_z`, cache fallback) are SIBLINGS, each null when absent, rendered in separate blocks with separate column sets (z-scores never share a "Comparison" column with raw means). Population 332 both / 95 descriptive-only / 74 voiceprint-only / 32 neither. Floor labeled in three states: `floor_only` share 1.0 (149 members), `floor_dominant` >0.5 (29), else present/none. `MAX_WORDS` 250 -> 400, `OVER_BUDGET` 250 -> 320.
6. **Whisper quirk producer:** `fec/members/b5_speech_quirks.py` (pinned-whisper hesitation/discourse/stutter, dual plain+prompted decode, 0.85 coverage anomaly guard, `.candidate` output, `test_speech_quirks` in the kernel gate). Engine hook: `asr_words_from_whisper()` at `fec/members/b5_audio_align_turns.py:249` (greedy pinned, `local_files_only=True`, hard-refuses None / '' / a bad dir).
7. **Narrative feed:** clean-audio eGeMAPS vocal descriptors enter the de-identified profile that Fable turns into three paragraphs (`fec/b5_narratives.py` -> `member_narratives.json`, 533/533).

## Dev Commands

```bash
# Production path for the complementary layers (re-run to make the 2026-09-07 fix active)
python build_member_narrative_ledger.py
python regenerate_descriptive_profiles.py --activate
# then rebuild the member desk (make_member_desk.py)

# Dataset checks named in the sources
grep -c b5_audio fec/run_pipeline.py        # = 0: lane is off-chain
python -c "..."                              # (faster-whisper must be preceded by the av stub; see below)

# C-SPAN audio fetch (working recipe, 2026-08-23): yt-dlp native C-SPAN extractor on the PROGRAM PAGE URL
yt-dlp --download-sections ... -f 466 -x --audio-format wav --ffmpeg-location <ffmpeg> ...   # then ffmpeg -ac 1 -ar 16000

# Gemini audio routing (agy 1.1.11): WAV refused; stage an MP4 (black 160x120 video + AAC audio) with ffmpeg
```

## Known Issues

- Off-chain + fail-closed; the v2 artifact is empty; the production audio guard at `audit_full.py:1163-1182` passes VACUOUSLY (all three per-clip loops iterate zero times); zero C-SPAN checks across all 37 `fec/audit/*.py` files.
- `test_cspan_identity.py` (13 tests) and `test_big5_gold_audio_tdd.py` (13 tests) are in no runner (`_LANE_MODULES`, `fec/tests/run_tests.py:304-306`).
- `fetch_hearings_seq.py:74-79`: 65,912 of 679,221 attributed turns (9.7%) cross-chamber mis-assigned from a senate-first surname guess; resolver fixed 2026-08-18; `hearings_seq.db` never rebuilt, so the stale DB feeds `hearing_antagonism` -> member desk for 456/533 members.
- Weak identity evidence in the shipped verify artifact (found 2026-08-19): of 1,410 `identity==MATCH & keep=true` clips only 26.5% name the member exactly (+1.8% spelling variant), 38.1% geography only, 32.0% no name and no geography, 24 clips (1.7%) MATCH on evidence literally `NONE` -> about 33.7% admitted on evidence with no identifying content (example: Jodey Arrington TX-19 clip `AgbQBG0OzXs`, evidence `"i rise today to recognize`).
- 15 wrong-member clips (13 members) in `b5_audio_cache.json` (list in the lane record); APPLY is Paul's gate.
- The unverified-supply rule gates on PATH, not evidence: `fec/audit_collection.py:889-891` errors on any accepted-manifest row inside `audio_pilot` -> receipt REJECTED -> `build_descriptive_speech.py:465` stops; yet 1,410 of 2,192 clips ARE SOLO_TARGET+MATCH+keep and are the audio_pilot half of the anchor vault under a PASS receipt. 2,192/2,192 pass PCM (mono/16k/PCM16).
- `speaker_anchor_vault_all_verified_v3`'s persisted `target_eligible` is untrustworthy (its receipt contradicts `voice_first_recovery.py:464-467`); `build_full_audio_profile_census.py:5-12` recomputes.
- `regenerate_descriptive_profiles.py` imports two UNTRACKED siblings (`descriptive_profile_overrides.py:23`, `descriptive_public_accounts.py:24`).
- Long-form promotion: `profile_effect` is write-only (`FULL_PROMOTION` has zero production readers); five-stage chain died 2026-09-03 on API credit exhaustion; transcripts complete (533), diarization absent; yield n=1 (Scalise): 35 min -> 1 qualified turn, 0.533 min (about 2.6%, degraded case `anchored_member: False`); 30 members have no voice reference.
- **Windows Application Control blocks PyAV's DLL (since 2026-08-23):** every faster-whisper script needs the `av` stub (stub `av`, `av.audio`, `av.error` with `InvalidDataError` in `sys.modules` before importing faster_whisper; decode via ffmpeg + soundfile; pass float32 ndarrays to `transcribe()`, never file paths); `faster_whisper/audio.py:15` imports av at module level but only uses it for file decode. speechbrain/ECAPA unaffected.
- `npr_segment.py:95` carries the defective `condition_on_previous_text=True` (its `hes_1k` values are suppressed; openSMILE features not affected).
- Never measured against human gold: WER/CER, alignment quality (0.80/0.70 `word_match` bars in `fec/audio_rules.py:38-39` asserted, never calibrated), diarization accuracy; the 150-clip human-annotation packet (built 2026-07-26) was never coded.

## Technical reference (measured facts)

### Whisper
- Installed 2026-08-20 (Paul granted permission): `faster-whisper 1.2.1` + ctranslate2 4.8.1; weights `Systran/faster-whisper-small` off-repo at `C:\melange-data\models\faster-whisper-small` (model.bin 483,546,902 B, sha256 3e305921506d8872...). `preprocessor_config.json` 404s (CT2 models have none; repo needs only `model.bin`). Still absent: speechbrain, torchaudio, aeneas; present: torch, transformers, opensmile, librosa, soundfile, yt_dlp. `big5_methods.md:1227` recorded no-download as deliberate; Paul's 2026-08-20 grant lifted it for whisper only. Whisper's design role: independent word-recovery cross-check against Aeneas boundaries, never the transcript source.
- Deletes disfluencies by default (0.0 uh+um per 1k on every clip at n=10). Filler-prompt trick `initial_prompt='Um, uh, so, you know, I mean, like...'`: 37.1 per 1k mean, 26x per-member spread (Takano 121.4, Chu 73.9, Rose 60.5, Schneider 42.4, Green 23.8, Pocan 21.3, Fulcher 10.6, Curtis 7.7, LaHood 5.0, Norton 4.7); content cost delta -0.030 (coverage 0.729 -> 0.699); Gemini independently 36.14/1k; C-SPAN captions 0.00.
- **Corrected instrument (2026-08-24):** independent ~100 s chunks, `initial_prompt` per chunk, `condition_on_previous_text=False` (chunk-local re-priming 12.15/1k vs whole-file 0.00 on identical Face the Nation audio). Positive control: live WJ 25.81/1k vs 26/1k `quirk_sweep` reference. Venue ladder: live WJ about 26/1k | Sunday shows 2.60/1k (n=6 eps, 21.5k words) | NPR 0.22/1k (n=2); NPR suppression about 100x (older 8x understated).
- Deterministic: 3/3 byte-identical SHA default and prompted; one unexplained repetition-loop anomaly (S03 prompted, coverage 0.775 -> 0.020, not reproduced in 10+ runs); mitigation: plain AND prompted decode, reject on coverage drop.

### Prosody (openSMILE on the raw waveform, never whisper tokens)
- Interview tranche (150 turns / 101 members, 25 with >=2 clips): pause_length ICC .684, pace .546, volume_dynamics .533, voice_strain .380, inflection_rise -0.023, inflection_fall .072 (F0 slopes carry no between-member signal). Floor-speech clipcache (169 members, >=5 clips): pitch_variability ICC .245, volume_dynamics .178; both under 0.70 at k=5; 97 members have >=17 qualifying turns (SB about .85 at k=17). Channel (studio/remote/telephone) uncontrolled.
- Final vocal-signature ranking: pause .92 > pace .86 > volume .85 > quirk rate .79 (ICC(1) .435/clip, SB@5 .794; 14 members x 2 clips, 90 s prompted whisper) > strain .75 >> pitch marginal >> F0 slopes zero. Certified static channels at n=81: pause SB@5 .799, volume_dyn .708, pitch_var .707.
- `pitch_variability_raw`: r(sex=F) = -0.266, Cohen d = -0.944 (1,324 clips / 309 members); denominator (`stddevNorm`) carries about 75%; de-normalised r -0.065 while r(sex=F, F0 amean) +0.551; fixed in `4193f0140` to plain semitone SD (stddevNorm*amean). `topic_emotional_intensity` sign-determined by construction (two-topic floor `MIN_MEMBER_DISTINCT_TOPICS = 2`): fixed with a within-member permutation null (seed 7, 2000 relabelings; sign claims require `sign_informative=true`). Producer self-test 17/17; kernel gate 152/9 (same 9 failing at HEAD).
- Pad convention: `wj_audio\turns\` (751, July scrape) UNPADDED; only `turns_v2\` carry the ~20 s pad; featurizer anchors per family (+217 minutes recovered); 232 turns in both families -> keep the longer-duration capture, value-blind.
- Salam 2022 test: pace and volume_dynamics sex-clean (r(F) = +.06 / -.05); sex-conditioning matters only where signal IS sex (pitch_variability r=-.266, 26% of ICC; jitter r=-.260, 18%).

### Speaker ID and identity evidence
- Acoustic speaker-ID closed: raw cosine 11/30; linear head EER .317 / unit acceptance .100; fresh-21 neural EER .226 / acceptance .095; all `FAILED_WEAK_LABEL_SMOKE`, `production_consumers: 0`.
- C-SPAN chyron OCR leak: names ON 30/30 = 100%; names OFF 2 of 7 completed (both from self-identifying content), voice-based 0/7; wrong confident answer (Takano -> Denis McDonough); content-determinacy stratum required.
- Chyron pilot (`64caa87d8`): 30/30 windows named, 0/90 wrong; 82/90 frames carry the name; B-roll carries no chyron; phone guests get a static portrait card. Face verification only via an embedding tool, never an LLM.
- 475 no-evidence clips re-adjudicated (`1d9dad0a5`): 336 CONFIRMED (70.7%), 15 CONTRADICT (3.2%), 122 NO_TEXT, 2 unfetchable; evidence classes across 1,410 keeps: NAME 398, GEO 537, CONFIRMED 336, RESIDUAL 124, CONTRADICT 15; coverage at floor (>=60 s & >=2 clips): STRICT 230 (223 at 180 s), MID 345, legacy 389-410.
- Gemini transcription agreement (2026-08-19; 30 fresh members + 3 silent controls, SEED=7): 0.945 vs YouTube captions (median 0.955, range 0.813-0.994; 25/30 >=.90, 30/30 >=.80), 0.745 vs whole C-SPAN program, 0.695 vs target turn; all silent controls NO with zero fabricated words. Scorer must strip `[00:06 - 00:08]` timestamps and inline `speaker male/female` tags (v1 scored 0.609 where truth was 0.945). Dispatch gotcha: Gemini reaches for `ffprobe`, the shell denial aborts the run with no report. 2026-07-26 AV pilots NO-GO (7 of 30 MP4s had no audio stream, Flash fabricated; M002 mislabeled synchronized lag_ms 0 confidence 0.95; hidden-mismatch detection 1/2).

### Sources and venues
- 17 outlets, 5 reference families (`SOURCE_INVENTORY.md`); interview corpus about 60 outlet codes / 152k rows / 501 members on >=2 outlets (482 on >=3). Tier 1 captured+timed = C-SPAN only (858/858 programs with HLS `media_url` + offsets); Tier 2 rederivable (Axe Files, NPR 1A/Here&Now, NPR core); Tier 3 PBS NewsHour, CBS FTN, MTP, msnow, Fox archive; Tier 4 none (CNN about 45k rows, current Fox, CNBC absent).
- C-SPAN: independence gate (`MIN_INDEPENDENT_PROGRAMS = 2`, >=12 members per cohort; `fec/audio_rules.py:17-18`, `b5_audio_descriptors_candidate.py:267-268`) cannot be met by C-SPAN (513 programs all single-member); now TollBit-gated; PBS TLS-reset IP block. NPR exhausted: 677 episodes, 201 members, G2 = 99/140 (22 zero-row episodes fail alignment legitimately); Sunday date-join four-feed union 158 members (face 511/279/126; meet 1382/205/133; sotu 422/271/154; this 60/25/47).
- NPR audio edited clean: 93% of segments zero fillers (403/434) vs 21.8/1k live; paired 16.7 -> 2.1/1k; r(live,NPR) -.22; quirk channel live-audio-only.

## Audio layer rule (Paul 2026-09-07)

"this data is not meant to override each other but be complementary." Every member shows every layer they have, labeled with its own scale and caveat. This overrides the `if descriptive / else cache` design (bug: two incompatible dict shapes - descriptive `clips`/`minutes`/`channels` vs cache `seconds`/`standardized_channels`; `standardized_channels` was read by only the producer and one test; 74 members rendered zero voiceprints and 332 had their base layer discarded). Floor audio: do not strip, label carefully. Long-form recordings: "equal to other recordings, just a different flavor".

## History

| Date | Event |
|---|---|
| 2026-07-09 | Audio speaker-verification + narratives shipped; contamination of search-fetched floor audio (about 38%) fixed. |
| 2026-08-19/21 | Speech-lane audit, whisper install, rulings, chyron pilot, re-adjudication, commits `4193f0140` + `1b2055b81`. |
| 2026-08-24/25 | G1 terminal, N look spent/missed 2026-08-25 (route closed), WJ featurizer corrections. |
| 2026-09-07 | Complementary-layers lane; four false mechanism claims; `C:\melange-data` confirmed to exist. |

## Related Topics

- [[2026-07-feature-audio-and-speech-lane]] - Speech/audio lane: no shipped ASR, off-chain fail-closed, N audio route closed; audio layers complementary; four false mechanism claims.
- [[2026-07-feature-member-approach-briefs]] - Per-member Suggested-approach briefs (Fable 533 calls; Sonnet lane): Tier 2 style, acoustics in, no percentiles, validator traps.
- [[2026-07-feature-personality-psychometrics]] - Big Five psychometrics for Congress members: instruments, pre-registered looks, Senate-gold anchoring, N/A slots; O/C/E valid, A- grade.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
