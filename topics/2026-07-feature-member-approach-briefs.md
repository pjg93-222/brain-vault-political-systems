---
type: topic
title: "Member approach briefs and narratives"
aliases: ["Member approach briefs and narratives"]
category: "feature"
status: "in-progress"
people:
  - "[[paul-goff]]"
actors:
  - "[[melange-audio-pipeline]]"
objective: "Record how the three-paragraph per-member approach briefs/narratives are generated, ruled and validated (Fable paragraphs 2026-07-09, Sonnet-API brief lane 2026-08-31), including Paul's style rulings, the handoff-doc corrections, the open cross-party field conflict and the validator false-failure bug class."
created_at: 2026-07-09
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/profile-briefs-lane-2026-08-31.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\profile-briefs-lane-2026-08-31.md", sha256: "b3c0d3f51daa8832eb37ec80676edd15c6b343f0a418383299a7396b9d360d33"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/approach-brief-authoring-rules-2026-08-31.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\approach-brief-authoring-rules-2026-08-31.md", sha256: "f60c1fdcc86b96247875e1b7aa0ca479cf30b2195727c7284a0639852bc08979"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fable-paragraphs-only.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fable-paragraphs-only.md", sha256: "608516924b815a01ab65ca51db3c117932f1ba61d1873c84b605fd038aa58ff4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-audio-narratives-2026-07-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-audio-narratives-2026-07-09.md", sha256: "79e8d71ad2a5aeba6c35fd4d8359c40c9ecede3fbe35ed027ed87f862aa16958"}
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
---

# Member approach briefs and narratives

> Three-paragraph per-member "Suggested approach" briefs (Overall personality / Manner of speech and landmines / Persuasive approach) for all 533 members. First shipped 2026-07-09 as Fable-written narratives (`fec/b5_narratives.py` -> `member_narratives.json`, 533/533); re-generated 2026-08-31 through the Anthropic Messages API (`claude-sonnet-5`) under Paul's Tier 2 style rulings. Newest source date 2026-09-01.

## Context

- Display slot: the desk's narrative slot in the member desk (`make_member_desk.py`, psych-view "Suggested approach" block). Project: [[melange-systems]]. Decider: [[paul-goff]].
- Acoustic inputs come from [[melange-audio-pipeline]] and the lane record [[2026-07-feature-audio-and-speech-lane]]. Model-tiering rules: [[2026-07-working-agreement-agent-orchestration-rules]] (and the cost rule recorded below).
- Source description of the rulings memory: "Paul's rulings for the 533 member approach briefs - Tier 2 style, corroborated acoustics IN, no percentiles in prose".
- Source memories: `profile-briefs-lane-2026-08-31` (last modified 2026-09-01), `approach-brief-authoring-rules-2026-08-31`, `fable-paragraphs-only` (2026-07-09, feedback), `moneyball-audio-narratives-2026-07-09`.
- Pipeline of the 2026-08-31 lane (built in a session scratchpad; **nothing written to the repo**): `profile_basis_v2.json` + `speech_descriptive_v1.json` + `member_desk_bundle.psy` + `hearing_antagonism.json` -> deterministic evidence ledger with precomputed plain-language bands -> Sonnet -> hard validator -> candidate artifact.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[melange-audio-pipeline]] | Audio speaker verification + speech layers: faster-whisper pinned, unused; off-chain fail-closed; layers complementary; feeds narratives. |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Topics

- [[2026-07-feature-audio-and-speech-lane]] - Speech/audio lane: no shipped ASR, off-chain fail-closed, N audio route closed; audio layers complementary; four false mechanism claims.
- [[2026-07-working-agreement-agent-orchestration-rules]] - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.


## History

| Date | Event |
|---|---|
| 2026-07-09 | Fable "Suggested approach" narratives shipped (`fec/b5_narratives.py` -> `member_narratives.json`, 533/533; branch claude/epic-aryabhata-7aa1e1, display-only, engine/ranks untouched; kernel 37/37, audit 63/64 with only the pre-existing electoral_plays staleness). |
| 2026-07-09 | Paul states the HARD cost rule: Fable only for the 533 narrative paragraphs; everything else Haiku 4.5; escalate to Sonnet 5, never Fable. (Caught a Fable call per audio clip, about 3,000 clips -> about $120-200.) |
| 2026-08-31 | Paul's rulings R1-R5 on the approach briefs (Tier 2 template, best data per member, guide names the speech files, acoustics in, no percentiles in prose). |
| 2026-08-31 | Sonnet-API brief lane built in a session scratchpad (`claude-sonnet-5`); handoff doc `PROFILE_GENERATION_HANDOFF.md` found WRONG on several points; four validator restarts traced to one bug class; Paul's tone rulings (direct character claims, no hedging, plain speech, length about 230-270, no repeated phrasing, narrative to top of "Who they are"). |
| 2026-09-01 | Source last modified (lane memory finalized). |

## Decisions

- **R1 - Tier 2 is the template** (Paul 2026-08-31): roughly 125-150 words, three labelled paragraphs. Tier 1 (about 210w) is too long, Tier 3 (about 75w) drops load-bearing content. Ratified after an adversarial pass independently named Tier 2 "the shortest tier that still lands it." ~~Length 125-150 words~~ - raised later the same lane (Paul's tone rulings) to about 230-270 words for depth; the Tier 2 style otherwise stands.
- **R2 - Best available data per member:** if a member has full audio, use it; cascade down when thin. Do not hold every brief to the strictest member's evidence level.
- **R3 - The markdown guide NAMES the speech files to use.** It is a pointer to the authoritative data, not a competing dataset. Read `CONGRESS_SPEECH_DATA_GUIDE_20260831.md`, then use the files it names. Do not treat guide-vs-data as a conflict needing adjudication.
- **R4 - Acoustic claims go in, and MAKING SENSE OF THE DATA IS THE JOB.** Not "audio only when percentile-eligible" and NOT a mechanical replicate-or-discard filter either. Paul explicitly overruled the first version of this rule (a channel had been excluded because it did not replicate across settings; he pointed out the exclusion was itself an inference): "Things can contradict, it is up to you as the API to make sense of the data." Contradictions are information about the person, not noise to be gated out. Read everything, form a coherent picture, write that.
  - Worked example (Al Green): pace, pause length and pitch variation are near-identical on the floor and in interview; volume dynamics are wide on the floor and middling in interview. The mechanical read discards the volume datum. The correct read USES it - the constant is an unhurried, spacious, level delivery, and the variable is projection. He has a floor voice and a room voice, and the difference is loudness, not speed or energy.
- **R5 - No percentiles in the prose.** Plain language: "He leaves long silences," never "91st percentile for pause length." Numbers live in the ledger, not the brief.
- **Why (R1-R5):** Paul was repeatedly slowed by Claude presenting computable facts as decisions for him and by gatekeeping data behind strict-eligibility rules he had not asked for. His words: "we should have all this fucking data, it's not hard" and "stop getting in my way."
- **How to apply:** compute the ladder and the comparison basis yourself instead of asking which rung a member sits on. Percentile eligibility (>=3 headline clips) gates a SHIPPED display number, not the ability to rank a member against the 427-member snapshot. See `speech-recognition-lane-state-2026-08-19` for corpus state and `ask-before-substantive-changes` - the APPLY gate still stands for code and artifacts, but NOT for reading and computing from data that already exists.
- **Paul's tone rulings 2026-08-31 (supersede earlier caution):**
  - Direct character claims ARE wanted: introverted/extroverted, open or hostile to new ideas, conscientious. Overrules the `extrovert`/`introvert` ban in the forbidden-claims assertion in `fec/members/b5_narratives_local_candidate.py` (that renderer is not on this path).
  - No hedging. Insider panels rated these people, so state traits flat: "He's conscientious", never "he reads as conscientious".
  - Plain speech, "like explaining to a friend the personality of someone you're about to meet".
  - Length raised from the ratified Tier 2 (125-150w) to about 230-270 for depth.
  - Do not repeat phrasing across briefs.
  - Narrative promoted to the TOP of the "Who they are" group, bare, no `sub()` wrapper.
- **Model-tiering rule (a), pipeline API calls - HARD cost rule (Paul, stated firmly 2026-07-09, all caps):** **Fable (`claude-fable-5`, $50/1M out) is ONLY for the per-member "Suggested approach" narrative paragraphs** - one call per member (about 533 total). **Every other LLM step in the pipeline uses Haiku 4.5** (`claude-haiku-4-5`, about 10x cheaper). Mechanical tasks - audio-clip speaker verification from captions, classification, extraction, labeling - are Haiku, NEVER Fable.
  - **Why:** Paul caught a Fable call per audio clip (about 3,000 clips -> about $120-200) for a mechanical "is X the solo speaker?" classification. Fable's quality only earns its price on the generative narrative task - and even then one call per member, never per-item in an inner loop.
  - **How to apply:** before ANY `messages.create`, ask "is this generating the member narrative paragraphs?" If no -> `claude-haiku-4-5`. Never default to Fable for per-item loops. Per-clip / per-row / per-item work is always the cheap model. Related: `moneyball-big5-campaign`.
  - **Escalation rule (Paul, 2026-07-09):** if Haiku does *remarkably worse* than Fable on a mechanical task (validate by head-to-head agreement on a sample, adjudicating disagreements against the actual transcript), escalate that task to **Sonnet 5** (`claude-sonnet-5`) - NOT back to Fable. Order for mechanical work: Haiku -> Sonnet if needed. Fable stays paragraphs-only regardless.
  - Observation (not a rule change): the 2026-08-31 brief lane generated the briefs with `claude-sonnet-5` through the Messages API (Paul authorized API generation by supplying the key); the 2026-07-09 narratives were Fable with an Opus 4.8 fallback (below).

## Next Steps

- [ ] Paul's call on the cross-party cooperation field conflict (below): which source (`profile_basis_v2.behavioral_record.cooperation_z` vs desk bundle `behav_pct` cross-party) governs; affects all 533 briefs.
- [ ] Paul to record the amendment implied by his 2026-08-31 rulings to the 2026-08-11 CONSTRAINTS line "no advisory copy, no recommendations" (it contradicts paragraph 3 "Persuasive approach" existing at all).
- [ ] Decide on em-dashes (taste-skill bans them absolutely; the ratified template uses five).
- [ ] Open template defect: escape model output (`${NAR.p1/p2/p3}` is interpolated RAW at `make_member_desk_00.tpl` while neighbours use the house `esc()` helper at `:1399`).
- [ ] Let the desk render gate accept an honest new status value for API-generated narratives (currently a literal-status + sha gate; see below).

## Corrections to `PROFILE_GENERATION_HANDOFF.md` (Paul's Desktop) - the doc is WRONG on these

- The artifact is **repo-root `member_narratives_v2.json`**, NOT `data\members\`.
- Keyed by **display name**, not bioguide. Entry shape `{ok, p1, p2, p3, measurement_note}` (`fec/surfaces/make_member_desk.py:509-517`).
- The render gate is **THREE conditions**, not one (`make_member_desk.py:397-399`): schema `member-narratives-v2-local` AND status `ACTIVE_LOCAL_ZERO_API` AND `basis_sha256` == sha256 of `data/members/profile_basis_v2.json`. An honest status value alone will not open it. (Open at time of writing: API-generated narratives will not display until that gate accepts an honest new status value; Paul authorized API generation by supplying the key.)
- `profile_basis_v2.json` (533, `ACTIVE_CONSTRUCT_GUARDED`) is the better primary input than the desk bundle: it is what the gate's sha binds to and it reproduces the ratified Al Green numbers exactly (O .967, C .890, warmth .955, excitement .285, activity .326, assertiveness .742, words-per-turn .889, all four floor and interview acoustics).
- **The desk template already emits the three headings itself**, `make_member_desk_00.tpl:966-968`, as styled divs, no trailing periods, `&amp;` entity. Briefs must ship BODY PROSE ONLY or every heading doubles. `${NAR.p1/p2/p3}` is interpolated RAW while neighbours use the house `esc()` helper (`:1399`) - so model output goes unescaped into innerHTML. Open template defect.

## OPEN - Paul's call, do not resolve by model judgment

- **Cross-party cooperation disagrees between sources.** `profile_basis_v2.behavioral_record.cooperation_z` (Green 0.091, about median) vs the desk bundle's `behav_pct` cross-party (Green 0.358, below most). The ratified Green brief used the desk-bundle field ("crosses the aisle less than most"); the ledger says the opposite. Affects all 533.
- The CONSTRAINTS line "no advisory copy, no recommendations" (Paul, 2026-08-11) contradicts paragraph 3 ("Persuasive approach") existing at all. His 2026-08-31 rulings imply an amendment but it is unrecorded.
- Em-dashes: taste-skill bans them absolutely; the ratified template uses five.

## THE BUG CLASS THAT COST FOUR RESTARTS - check for this first next time

Every validator that COUNTS pattern matches and compares to a threshold will double-count overlapping patterns and reject compliant output. Three separate instances:

- **Superlative budget:** "among the highest in the chamber" matched two patterns, one claim ate two budget units.
- **Band-phrase reuse:** "well above most" also matches the separate entry "above most", so ONE compliant phrase tripped a `>1` threshold - **30 false rejections across 371 drafts**.
- **Novelty:** a 9-token reused run registered as 3 overlapping 5-grams, auto-clearing a `>=2` gate.
- Fix is span-merge before counting. For novelty, plain dedup is WRONG (lets long lifts through) - fire on two distinct runs OR one run >= 10 tokens.
- Related: **the system prompt was seeding phrases the validator then banned.** Scan the prompt against every ban regex mechanically; it had 3 self-inflicted matches.

## Other engineering that mattered

- **`claude-sonnet-5` runs adaptive extended thinking BY DEFAULT.** Without `"thinking": {"type": "disabled"}` the whole `max_tokens` budget goes to an empty thinking block and `content` has ZERO text blocks: silent empty string, HTTP 200, `stop_reason: max_tokens`.
- Precomputing bands in Python (not model judgment) is what stops medians rendering as deficits. But then the model uses the labels as VOCABULARY - frame them explicitly as calibration only.
- Unparenthesised regex alternation: `r'\bhis|her|their reputation\b'` parses as `\bhis` OR `her` OR `their reputation\b`. Failed 7/7 members before the fix.
- A soft content throttle ("pick a handful") does not throttle. The model overshot its stated ceiling by about 19 words until it became "exactly two per paragraph, six total".

## 2026-07-09 Fable narratives (source: moneyball-audio-narratives-2026-07-09)

- Two features shipped 2026-07-09 (branch claude/epic-aryabhata-7aa1e1, display-only, engine/ranks untouched - verified kernel 37/37, audit 63/64 with only the pre-existing electoral_plays staleness): the audio speaker-verification pipeline (recorded in [[2026-07-feature-audio-and-speech-lane]] / [[melange-audio-pipeline]]) and the narratives.
- **3-paragraph "Suggested approach" narratives** (`fec/b5_narratives.py` -> `member_narratives.json`, 533/533). Per member, a DE-IDENTIFIED measured profile (validated big5_v2 + behavioral dispositions + persona + `interaction_features` conversational dynamics + clean-audio eGeMAPS vocal descriptors) -> **Fable** writes P1 overall personality / P2 quirks-speech-landmines / P3 persuasive approach (matching-effect per personality-persuasion lit).
- **Fable REFUSES the influence-brief framing on about 74% of members** (safety classifier) -> automatic **Opus 4.8 fallback** (client-side, on `stop_reason=='refusal'`); Opus is cheaper so the bill came in under the all-Fable estimate.
- Wired into `make_member_desk.py` `psy_for()` -> `out['narrative']`, rendered in the tpl psych-view as the "Suggested approach" block (the old IIT-C octant note kept as "Quick read"). Verified rendering in-browser, 0 console errors. NOTE: the narrative renders inside the comp `if` block (all 533 have behavioral data so it fires for everyone). Related: `dashboard-preview-workflow`, `moneyball-receptivity-layer`.
- Audio inputs feeding the narratives: the verified clips (Haiku 4.5 verification, 395/445 members with >=180 s verified-clean audio, 142 wrong-member clips caught, 88 eGeMAPS v02 features, `b5_audio_cache.json`; audio feeds ONLY validation scripts, never the engine). Haiku >= Fable on that task (Fable over-rejected clean solo speeches): escalate to Sonnet, never Fable (see rule above).
- The ES cross-modal validation (+0.208 held-out, later caveated as gender-confounded) and the A- re-grade (2026-07-09) are recorded in [[2026-07-feature-audio-and-speech-lane]] because they describe the voice features, not the narratives.
