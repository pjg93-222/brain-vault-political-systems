---
type: topic
title: "Congress speech and audio corpus data guide (08-31) (Audio and speech lane)"
aliases: ["Audio and speech lane: Congress speech and audio corpus data guide (08-31)", "CONGRESS_SPEECH_DATA_GUIDE"]
category: "feature"
status: "completed"
people: []
actors: []
objective: "Record how the Congress speech and audio corpus must be read as of 2026-08-31: its three products, readiness and identity tiers, the accuracy claim and its boundary, the fail-closed landmines, the authority files and the non-negotiable display-only contract."
created_at: 2026-08-31
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems\\data\\speech\\CONGRESS_SPEECH_DATA_GUIDE_20260831.md"
    sha256: "b90eea60046b6e8d52c4461f292c3b5c383e6cc459465f4979627537636a4de3"
    as_of: "2026-08-31"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/completed", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-audio-and-speech-lane]]"
---

# Congress speech and audio corpus data guide (08-31) (Audio and speech lane)

> How to read the Congress speech and audio corpus as of 2026-08-31: three separate products (coverage census, identity and provenance, descriptive measurement), what "verified" means, the one reportable accuracy number and its limits, and the rules that keep audio out of every engine. Part of [[2026-07-feature-audio-and-speech-lane]] (project [[melange-systems]]).

> [!info] Source and status
> Summary of `data/speech/CONGRESS_SPEECH_DATA_GUIDE_20260831.md` (351 lines, committed 2026-08-31). All counts are a dated snapshot; the guide itself warns that the descriptive snapshot was already 31 canonical rows behind the physical manifest when it was written.

## Three products, not one

1. **Coverage census:** does a member have enough verified audio for a general, strict-identity or non-floor profile?
2. **Identity and provenance layer:** why is an interval attributed to that member, and is its PCM, hash and lineage intact?
3. **Descriptive measurement layer:** what delivery measurements were observed in accepted clips, by setting, source and sometimes subject?

A title, thumbnail, channel, upload date, transcript package or large amount of text can route work but never establishes who is speaking in an audio interval.

## Snapshot of 2026-08-31

- 537 named members in the official universe; 500 (93.1%) with a general verified audio profile; 416 (77.5%) meeting the strict identity prerequisite (at least 3 events and 180 unique seconds); 244 (45.4%) with a verified non-floor descriptive profile (at least 5 non-House-floor exact windows); 37 in the general residual.
- The descriptive snapshot holds 8,708 prepared clips for 427 members; 274 members have a non-null interview headline and 231 have at least three headline clips and so receive percentiles. These counts are not additive across layers.

## Readiness and identity

- General profile: at least five verified 8-second-equivalent windows, counting the larger of anchor or canonical windows per member (`max`, never a sum).
- Identity tiers inside the descriptive snapshot are path-specific (turn-bound, receipt-verified turn, package-aligned, episode-aligned, exhaustive voice-verified); a calibration result for one path does not transfer to another.
- In the cold-start YouTube lane, identity comes from literal in-band naming of the first continuous target response; ECAPA voice comparison can only reject, never establish, an identity.

## Measurements

openSMILE 2.6.0 eGeMAPSv02 functionals feed six public channels: `pause` (mean unvoiced segment length, not hesitation), `pace` (voiced segments per second, not words per minute), `volume_dyn` (normalized loudness dispersion, not dB), `pitch_var` (normalized F0 dispersion), `strain` (local jitter, not a clinical measure) and `f0_mean` (mean F0 in semitones above 27.5 Hz). Only `pause`, `pace`, `volume_dyn` and `pitch_var` get interview-headline percentiles, which need at least three headline clips and are relative to that snapshot's eligible members. House-floor audio never enters the headline, and `podcast_interview` (90 clips, 13 members) is not a headline setting in the current builder.

## The accuracy claim and its boundary

The reportable number is 99.9995% calibrated wrong-speaker rejection, a one-sided 95% lower bound from zero false accepts in 650,160 wrong-claim sequences. It is specificity for that comparator, not corpus-wide speaker-label accuracy: the same calibration accepted only 23 of 1,473 genuine sequences (1.56%), and no blinded human audit across all sources exists yet. The guide's honest summary: 99.9995% identity-gate specificity, 93.1% member coverage, corpus-wide label accuracy not yet measured.

## Rules that stay fail-closed

- Never trust a filename containing "current" or a PASS receipt as proof of freshness; compare receipt times and input hashes.
- Never sum anchor and canonical windows, impute a 50th percentile for missing headlines, count superseded source intervals twice, or physically clean up source audio.
- A 536-member request from the 537-person universe needs one explicit named exclusion.
- Bulk WAVs, models and vectors live outside git under `C:\melange-data` (17,282 audio and video files, 58.852 GiB at the time) and need their own backup.
- **Non-negotiable contract:** the descriptive artifact is `DISPLAY_ONLY_NO_ENGINE_WIRING`; audio may not modify Big Five, rank, allocation, stance, persuasion or any other engine value, and any exception needs a new explicit contract, tests, audit evidence and receipt.

## Where things live

The primary coverage authority is `data/speech/congress_audio_profile_census_full_v1.jsonl` with its receipt; member measurements are read through the fail-closed loader `fec.speech.descriptive_contract.load_optional`; the guide lists the full authority table, rebuild order (descriptive build, census, three recovery-gap ledgers, speech tests) and pre-publication checklist.

## Related

- [[melange-audio-pipeline]] — the speaker-verification and speech system whose outputs this guide tells consumers how to read.
