---
type: discussion
title: "Terrier rulings 2026-10-06"
aliases: ["Terrier rulings 2026-10-06", "Terrier O-1..O-13 answers", "Terrier FLEXIBLE ruling"]
date: 2026-10-06
summary: "Paul's rulings of 2026-10-06 for the Terrier multi-district lane (OR-05 Bynum and CT-01 Bronin added to Colorado CD-05): the system must be FLEXIBLE with config and toggles over hard-coding, the Terrier brain exists only as vault notes, race mode is a per-district primary/general toggle, plus his answers O-1 to O-13 on support model, vote codes, imputation, preset names, personal-data handling, party codes, scoring layers, industries and source extraction."
conclusions:
  - "Ruling 1 (2026-10-06): the system is FLEXIBLE. Districts, industries, candidate per district, layer combinations and ROI weights are configuration, not code. The printed walk list gets an optional scores toggle defaulting to raw. Luna is copied into a versioned per-district stage; the locked original is untouched."
  - "Ruling 2 (2026-10-06): the Terrier brain exists only as notes in this vault (projects/terrier plus this discussion), subordinate to and subsumed by the vault, not a separate Project Brain."
  - "Ruling 3 (2026-10-06): primary versus general race mode is a per-district toggle ('on flex'); Bronin's race status is never hard-coded."
  - "O-9 (2026-10-06): never strip personal data; all data always shown; run locally on the full data; no de-identified pod run."
  - "O-5, O-7 and O-10 (2026-10-06): Paul confirmed the agent readings recorded below."
  - "O-11 and O-12 (2026-10-06): numeric partisan and support layers stay in the overall score; there is no second industry (only CUA)."
action_items:
  - "Terrier build lane: build to these rulings, config-first, with Colorado CD-05 outputs byte-identical by default (owner: Terrier build lane)."
  - "Define any further industries beyond CUA when wanted; the config supports them (owner: Paul)."
  - "Answer O-4b (uncertainty ranges on imputed values) if wanted; default stays off (owner: Paul)."
related_topics: []
related_actors: []
related_people: []
related_projects:
  - "[[terrier]]"
related_teams: []
source: "session"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/terrier-multidistrict-lane-2026-10-06.md", type: "claude-memory", synced_at: "2026-10-06", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\terrier-multidistrict-lane-2026-10-06.md", sha256: "9b1e08dfc4f878aea497548c35073cfa84c10e7c05555659691103445070e52d"}
updated_at: 2026-10-06
updated_by: "preserve@agent"
tags: ["type/discussion", "domain/data"]
---

# Terrier rulings 2026-10-06

> Paul's three rulings and his answers O-1 to O-13 for the Terrier multi-district lane, given in the 2026-10-06 coordinator session: a flexible, config-first system for OR-05, CT-01 and Colorado CD-05, with the Terrier brain kept only in this vault.

## Context

- The lane adds Oregon OR-05 (Janelle Bynum, 562,563 rows) and Connecticut CT-01 (Luke Bronin, 458,372 rows) to the live Colorado CD-05 app; both files use the same 622-column statara schema as Colorado, and about 9-15% of their rows have blank `sci_*` values from unmatched consumer-file records, as in Colorado. Project note: [[terrier]].
- The open-decision list O-1..O-13 lived only in an earlier chat (no document on disk). The answers below are Paul's, as recorded in the coordinator's memory file of 2026-10-06; the readings marked "agent reading" are the agent's interpretation, and Paul confirmed O-5, O-7 and O-10 the same day. Paul rejected jargon-heavy open items (O-7, O-10, O-12), so open items are explained in plain words.
- These rulings are Paul Goff's. They do not change the locked Colorado Luna code, the Colorado outputs (byte-identical by default) or the Melange brain.

## Participants

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Terrier. |

## Conclusions

### The three rulings

1. **FLEXIBLE, config-first.** The system must be flexible: configuration and toggles over hard-coding. Districts, industries, the candidate per district, layer combinations and ROI weights are all configurable. The printed walk list gets an optional scores toggle that defaults to raw (this keeps the earlier "raw data only" decision as the default). The Luna model is copied into a versioned per-district stage; the locked original is untouched.
2. **The brain is vault-only.** The Terrier brain exists only as a subordinate of, and subsumed by, this Obsidian vault: vault-native project notes (`projects/terrier`, this discussion), not a separate Project Brain. Nothing for Terrier is created under the Project Brain folder and brainlink configuration is not touched.
3. **Race mode is a per-district toggle.** Primary versus general mode is a toggle per district ("on flex"); never hard-code Bronin's race status.

### The O-1..O-13 answers

- **O-1.** "Ideology position" means party membership (Bronin = his party). The support model switches between general and primary per district; primary is not hidden.
- **O-1b.** No door-result calibration.
- **O-2.** Race mode is a toggle (on or off), per district.
- **O-3.** Get the real Oregon and Connecticut mail-ballot and absentee vote codes; no "n/a" column. (Oregon is all vote-by-mail.)
- **O-4 and O-4b.** "Imputation" means filling the missing measured values (the blank `sci_*` values from unmatched consumer-file records) with the Luna RF/KNN model; it has nothing to do with other industries. Uncertainty ranges: not answered, so the default stays off.
- **O-5.** "Same as 5": missing geo-audit values are imputed by the model too, with no "Not audited" label. Paul confirmed this reading on 2026-10-06.
- **O-6.** Preset names approved: "Mixed-support streets", "Supporter turnout", "Voter identification".
- **O-7.** Paul did not understand the question. Agent reading, confirmed by Paul 2026-10-06: the copied Luna code checks for Colorado's exact row count and file hash, so the copy must take per-district values. Covered by the FLEXIBLE ruling; the locked original is untouched.
- **O-8.** No 12-hour Colorado rerun. Imputation is applying the model, not a 12-hour job; a run that long means something is wrong.
- **O-9.** Never strip personal data. All data always shown. Run locally on the full data; no de-identified pod run. This supersedes the earlier "pod only, de-identified" note for this lane.
- **O-10.** Lumping party W (Working Families) into "other" "makes no sense": show every party code as itself (agent reading, confirmed by Paul 2026-10-06).
- **O-11.** The numeric partisan and support layers are kept in the overall score.
- **O-12.** There is no second industry; the question is dropped. Only Credit Union Alignment (CUA) exists; the config supports more when Paul defines them.
- **O-13.** Yes: extract the two source zips to `Downloads\terrier-sources\`.

### Dead ends

None are named in the Terrier sources, so no dead-end note was written. (The Luna lane's one brain dead end, DE-047, is recorded in the Melange brain and summarized on the cu-geography project note.)

## Action Items

- [ ] Build config-first to these rulings; Colorado CD-05 outputs stay byte-identical by default — owner: Terrier build lane
- [ ] Define any further industries beyond CUA when wanted — owner: Paul Goff
- [ ] Decide whether imputed values need uncertainty ranges (O-4b, default off) — owner: Paul Goff

## Related Projects

- [[terrier]]
