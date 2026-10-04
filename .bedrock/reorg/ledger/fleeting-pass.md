# Fleeting pass 2026-10-04: ledger

Branch `fleeting-pass-2026-10-04`, cut from `main` at `20710e2` (the merged Phase 2 reorganisation). The owner asked for this
pass; Phase 2 deferred it. Freeze record: `.bedrock/reorg/ledger/fleeting-pass-freeze.json` (6 notes, each with the sha256 of
its bytes and its source memory file `{path, sha256}`; all 6 memory files matched their captures at freeze time). Only the frozen
notes are processed; a fleeting note that arrives or changes after the freeze stays in `fleeting/` (none had arrived when this
ledger was written; the final check is in "Gates").

Line numbers: `F1:30` is line 30 of the frozen fleeting note F1 (the bytes recorded in the freeze file). `file:line` elsewhere
is the line in the tree this pass commits.

## How the pass applied the vault rules

- **Placement.** An update capture went to its `updates:` targets, narrowed to the note that holds the topic most specifically;
  the other targets got only short dated corrections where the capture supersedes them. The two new-source captures went into
  existing notes on the same topic (vault precedent: the import put feedback memories into the lane topic and the working
  agreements). No new note was created, so no Map row and no new link were needed.
- **No double paste.** Where the import had pasted one memory into two notes (Mentat migration: project and repo-state topic;
  route-latency lane: sidecar actor and surfaces topic), the new detail went into one note and the other got a dated summary line
  that names the detailed note in plain text.
- **No new wikilinks.** References to other notes added in this pass are plain text, so link budgets do not move. The only new
  wikilink mentions are the two `owner: [[paul-goff]]` cells of the new S6 MAJOR-2 action item in `projects/forecast-redesign.md`
  (frontmatter and table), the project's own convention; that pair was already linked.
- **Summaries.** The titles and summaries of existing notes are never edited (vault CLAUDE.md). Where a summary is stale (the
  Mentat project `description`, the repo-state topic's tagline) a dated correction paragraph follows the tagline instead; it sits
  after a blank line, so neither the index summary (first paragraph) nor the graph tagline (first `>` line) changes. The one
  summary edited is the Phase 2 concept `live-tree-patch-discipline`, whose summary the fix rounds already corrected (batches
  7 and 8); it changed in every copy (description, tagline, three echo lines), at 234 characters (the index clips at 240).
- **Append-only bodies.** Topics, concepts, discussions and projects keep every old line; a superseded line gets a dated note next
  to it or is struck through with a dated "Resolved" note; a resolved checkbox becomes `[x]` with a dated note. Actor frontmatter
  `known_issues` items were rewritten in place (Bedrock: actors may be modified), each saying what changed. Discussions got
  action-item progress only (Bedrock: a discussion is never given a new subject).
- **Provenance.** `sources:` entries upsert by path (vault rule "Re-imports upsert by source path; never duplicate"; no note
  lists a path twice): a note holding an older sha256 of the memory file got its entry updated to the captured sha256 and
  `synced_at: "2026-10-04"`; a note without the path got a new entry in the hook's own format. Where a part received content its
  hub got the pair too (check j: a part's pairs must be a subset of its hub's). Every touched note got `updated_at: 2026-10-04`
  and `updated_by: "preserve@agent"`.

## Provenance (`sources:` entries written)

| Capture | Memory file, captured sha256 | Notes (action) |
|---|---|---|
| F1 | `mentat-github-migration-2026-10-02.md` `1df4b9e5` | `topics/2026-09-troubleshooting-mentat-repo-state-and-workbooks.md`, `projects/mentat.md` (upserted from `6f79da7a`); `people/paul-goff.md`, `actors/mentat-console.md`, `actors/mentat-fec-pipeline.md` (added) |
| F2 | `people-network-route-latency-lane-2026-10-02.md` `a8b23c59` | `actors/staffer-live-sidecar.md`, `topics/2026-09-feature-staffer-network-surfaces.md` (upserted from `6cb20aaf`); `concepts/live-tree-patch-discipline.md`, `projects/melange-systems.md`, `actors/melange-fec-pipeline.md`, `topics/2026-07-troubleshooting-melange-audits-and-reviews-later-reviews.md`, `actors/melange-dashboard.md`, `discussions/2026-09-06-staffer-sorting-rulings.md` (added); `topics/2026-07-troubleshooting-melange-audits-and-reviews.md` (added: hub of the `-later-reviews` part, check j) |
| F3 | `pac-accuracy-attempt2-lane-2026-10-03.md` `10cf0f21` | `topics/2026-09-feature-forecast-giving-redesign.md`, `discussions/2026-10-03-pac-accuracy-attempt2-rulings.md`, `concepts/single-look-holdout-discipline.md` (upserted from `e86a3ffa`); `projects/forecast-redesign.md` (added) |
| F4 | `pac-accuracy-six-year-lookback-directive-2026-10-03.md` `048c6464` | `topics/2026-09-feature-forecast-giving-redesign.md`, `projects/forecast-redesign.md`, `concepts/single-look-holdout-discipline.md` (added) |
| F5 | `repo-mirror-2026-08-11.md` `7cfbd6eb` | `actors/melange-repo-mirror.md`, `topics/2026-08-incident-workstation-disk-and-backup.md` (upserted from `d344e91e`). `topics/2026-07-troubleshooting-melange-live-tree-git-drift.md` keeps `d344e91e`: it received nothing (see "Considered, unchanged") |
| F6 | `windows-hook-shell-git-bash.md` `a239f750` (project `scratch-2026-10-03-35774e`) | `topics/2026-06-working-agreement-tooling-and-environment-traps.md`, `actors/glass-box.md`, `actors/claude-code-harness.md` (added) |

## Per-note placement

Abbreviations: T = `topics/2026-09-troubleshooting-mentat-repo-state-and-workbooks.md`, PM = `projects/mentat.md`,
SC = `actors/staffer-live-sidecar.md`, SN = `topics/2026-09-feature-staffer-network-surfaces.md`,
LT = `concepts/live-tree-patch-discipline.md`, FR = `topics/2026-09-feature-forecast-giving-redesign.md`,
DR = `discussions/2026-10-03-pac-accuracy-attempt2-rulings.md`, SL = `concepts/single-look-holdout-discipline.md`,
PF = `projects/forecast-redesign.md`, MR = `actors/melange-repo-mirror.md`,
DB = `topics/2026-08-incident-workstation-disk-and-backup.md`, TR = `topics/2026-06-working-agreement-tooling-and-environment-traps.md`,
GB = `actors/glass-box.md`, CH = `actors/claude-code-harness.md`.

### F1 `fleeting/melange-systems--mentat-github-migration-2026-10-02.md` (tracked; hook-modified since HEAD; sha256 `67629d3c`)

| Block | Content | Destination |
|---|---|---|
| F1:1-20 | frontmatter | dropped: hook boilerplate (its `sources` pair went to the receiving notes; its `updates:` list chose the targets) |
| F1:22 | title | dropped: hook boilerplate |
| F1:24 | tagline ("PR to main still unopened") | already present at PM:5 and T:26; its "still unopened" is superseded by F1:30 (reconciliations R1-R20) and was not carried over as current |
| F1:26 | `## Content` heading | dropped: hook boilerplate |
| F1:28 | the push of 2026-10-02/03 (branch, tip, 19 commits, exclusions, verification) | already present at T:94 and PM:124 |
| F1:30 | PR #2 opened from the built-in browser after Paul signed in, merged at his request (merge `54433266`), head branch deleted, no CI, `gh` not installed; `-4d54uu` backed up to `mirror` and deleted on origin, local copy deleted; origin now one branch | T:99 and T:100 (full text), T:64 (History row); PM:129 (short update) and PM:161 (Timeline); people/paul-goff.md:86 |
| F1:32-33 | STILL PENDING; partial ref `b06195` deleted on origin, kept locally and on `mirror` | T:100, T:83, T:97; PM:19-20, PM:92, PM:127 |
| F1:34 | publishing the full local history (filter-repo or LFS; Paul's decision) | already present at T:98 and PM:128; restated as still pending at T:101 |
| F1:36 | Why (500s; 3 GB merge) | already present at T:102 and PM:130 |
| F1:38 | How to apply (offer to open the PR first; never push from the worktree's branch; pack files need `-Force`) | already present at T:103 and PM:131; the first step is superseded by F1:30 (R10, R18) |
| F1:40-43 | Possible Connections | dropped: hook boilerplate |
| F1:45-47 | Capture Context | dropped: hook boilerplate |

### F2 `fleeting/melange-systems--people-network-route-latency-lane-2026-10-02.md` (tracked; hook-modified since HEAD; sha256 `2e100161`)

| Block | Content | Destination |
|---|---|---|
| F2:1-20, 22, 26 | frontmatter, title, `## Content` heading | dropped: hook boilerplate |
| F2:24 | tagline (one-directional Dijkstra, full scope, WP-A/WP-B) | already present at SC:144-146 and SN:162 |
| F2:28-29 | lane opening (2026-10-02) | already present at SC:140 and SN:33 |
| F2:31-44 | Diagnosis | already present at SC:142-149 and SN:158-161 |
| F2:46-51 | Paul's rulings 2026-10-02 | already present at SC:151-156 and SN:162 |
| F2:53-59 | Paul's rulings 2026-10-03 | already present at SC:158-164 and SN:163 |
| F2:61-77 | landing ruling ("stop, apply, start once the check passes"), `landing_v2` patch and order, `landing_v3_ids` follow-up, `landing_v2` applied 14:59:02 | SC:178, SC:179, SC:180; SC:136 (restarts); SN:64 (History); SN:79 (Decisions); LT:22, LT:26 (concept) |
| F2:79-84 | unreachable message ruling | SC:181; SN:64, SN:79 |
| F2:86-98 | `landing_v3_ids` applied 16:24:41; next-round rulings; committee names; branches | SC:180, SC:182, SC:183, SC:184; SN:64, SN:79 |
| F2:100-105 | commit ruling: exact paths on LIVE main; never merge or check out a branch into LIVE (D-060) | SC:186; LT:27 (rule); SN:79; SN:171 |
| F2:107-119 | brain drafts applied (`686044f`), the post-landing brain update list, DE-056, DE-057 | SC:187, SC:188, SC:189 |
| F2:121-134 | v4.1 done 2026-10-04 (landed 14:33, PID 66688, LIVE main `4a81d5022`, brain `81f6c997d`; panel; lane closed except open items) | SC:192, SC:193, SC:194; SC:18-19 and SC:105-106 (open items); SN:65 |
| F2:136-144 | v4 done 2026-10-04 (03:17:32, PID 36412, panel, LIVE main `3366a7840`; v4.1 plan; idle CPU 18%) | SC:191, SC:192; SC:136; SN:65 |
| F2:146-149 | v4 landing ruling ("land v4 once the check passes") | SC:190 |
| F2:151-155 | record browser stays first-committee-only; committee names commit `6a198d600` | SC:185, SC:183; SN:79 |
| F2:157-163 | Build layout (WP-A, WP-B, shared file, WP-C, untracked People page) | already present at SC:166-171, SC:111, SN:164 |
| F2:165 | Why | already present at SC:174 and SN:165 |
| F2:167-170 | How to apply (one patch; APPLY and restart Paul's; memory guard) | already present at SC:172 and SN:166; superseded by F2:61-149 (R40, R43) |
| F2:172 | related memory names | already present at SN:34 |
| F2:174-177, 179-181 | Possible Connections, Capture Context | dropped: hook boilerplate |
| (whole capture) | scheduled task stays disabled (D-080), from F2:68 | SC:14, SC:50, SC:90, SC:101; SN:147; actors/melange-dashboard.md:120; discussions/2026-09-06-staffer-sorting-rulings.md:19 and :114 |

### F3 `fleeting/melange-systems--pac-accuracy-attempt2-lane-2026-10-03.md` (tracked; unchanged since HEAD; sha256 `e8efad86`)

| Block | Content | Destination |
|---|---|---|
| F3:1-21, 23, 27 | frontmatter, title, `## Content` heading | dropped: hook boilerplate |
| F3:25 | tagline | already present at DR:45 and SL:219 |
| F3:29 | attempt 2 root and coordinator brief | already present at DR:42-43, FR:221, SL:221 |
| F3:31 | state ~04:20 UTC, S2 gate BLOCKED, S2B launched | already present at DR:86-87 and FR:222 |
| F3:33-36 | B1-B3 | already present at DR:68-70 and FR:223 |
| F3:38 | S2B done, gate HELD | already present at DR:89 and FR:224 |
| F3:39-42 | C1, C2, S2C launched | already present at DR:71-73 and FR:225 |
| F3:44 | FINISHED ~08:45 UTC: stage chain, results (banks, SchoolsFirst), UT-X SEALED_NOT_SCORED, LIVE_FREEZE 2026 and the 2027-03-08 scoring task, S6 MAJOR-2 | FR:227, FR:228, FR:229, FR:230 (full text); FR:91 (History); FR:129-131 (Next Steps); DR:92 (stage row) and DR:16-19, DR:77-80 (action-item progress); SL:67, SL:69 (Look ledger), SL:234 (outcome); PF:8, PF:10, PF:28-36, PF:93, PF:104-106, PF:131, PF:191 |
| F3:46 | v4 branch: rulings D1-D3, stage chain, v4 worse (m15 92.33 -> 86.38), v3 the record, March 2027 job scores v3 and V4_1, report republished; launch long stages detached | FR:231 (full text), FR:115 (Decisions), FR:92 (History), FR:256 (Traps); SL:68 (Look ledger); PF:192, PF:207 |
| F3:48 | Why | already present at DR:110, SL:232, FR:226 |
| F3:49 | How to apply | already present at DR:111, SL:233, FR:226 |
| F3:51-55, 57-59 | Possible Connections, Capture Context | dropped: hook boilerplate |

### F4 `fleeting/melange-systems--pac-accuracy-six-year-lookback-directive-2026-10-03.md` (untracked, new source; sha256 `4f7f080f`)

Placed in the existing note on the same topic, `FR` (its title covers PAC accuracy; it holds attempt 2 and its rulings), as the
new section FR:233 "Six-year lookback directive and v5 rulings".

| Block | Content | Destination |
|---|---|---|
| F4:1-17, 19, 23 | frontmatter, title, `## Content` heading | dropped: hook boilerplate |
| F4:21 | tagline (memory description) | FR:235 |
| F4:25 | Paul's verbatim directive, 2026-10-03 | FR:237 |
| F4:27-29 | never propose older history; methodology within 6 years; v4 a regression, v3 the record | FR:238, FR:239, FR:240; FR:116 (Decisions) |
| F4:31 | Why (v4 worse, 2010 outlier) | FR:241 |
| F4:33 | ruled the same day: ROLLING (3 prior cycles), backtests still run, v3 must trim, March 2027 job scores v3 and v4 | FR:242; FR:92 (History); PF:207 |
| F4:35 | v5 rulings 2026-10-04 (D1, D3/D4, D6, D8; coordinator defaults D2, D5, D7, D9) | FR:243; FR:93 (History), FR:132 (Next Steps); PF:8, PF:13, PF:40, PF:107, PF:134, PF:193, PF:207; SL:69-70 (Look ledger) |
| F4:37 | How to apply | FR:244 |
| F4:39-41, 43-45 | Possible Connections ("none found yet"), Capture Context | dropped: hook boilerplate |

### F5 `fleeting/melange-systems--repo-mirror-2026-08-11.md` (untracked, changed source; sha256 `23099737`)

| Block | Content | Destination |
|---|---|---|
| F5:1-21, 23, 27 | frontmatter, title, `## Content` heading | dropped: hook boilerplate |
| F5:25 | tagline | already present at MR:39 |
| F5:29-34 | off-box mirror set up 2026-08-11 | already present at MR:50 and MR:121 |
| F5:36-41 | Why (OneDrive dehydration is not corruption) | already present at MR:105-107 |
| F5:43-54 | full mirror 2026-08-18; scope limit | already present at MR:122 and MR:99 |
| F5:56 | full mirror 2026-09-19; brain mirror; melange hooks (D-059) | already present at MR:125-126 and MR:129-138 |
| F5:58 | full mirror 2026-10-03: `--all` + `--tags`, never `--mirror`, 27 new, 339 of 339, tags 3/3, `main` `3248a6a02`; three mirror-only refs; worktree branches drift | MR:127 (History), MR:21-23 (known issues), MR:76 (Dev Commands), MR:100-103 (Known Issues), MR:115 (standing rule); DB:109 (mirror summary), DB:115 |
| F5:60-64 | How to apply | already present at MR:109-114 |
| F5:66 | links | already present at MR:58 |
| F5:68-72, 74-76 | Possible Connections, Capture Context | dropped: hook boilerplate |

### F6 `fleeting/scratch-2026-10-03-35774e--windows-hook-shell-git-bash.md` (untracked, new source; sha256 `6e4efd0c`)

Placed in the existing note on the same topic, `TR` (the working agreement of shell and harness traps, which already held the Glass
Box hook installation record), as Rule 6 plus an extension of Rule 1; the Glass Box side went to `GB` and a pointer to `CH`.

| Block | Content | Destination |
|---|---|---|
| F6:1-17, 19, 23 | frontmatter, title, `## Content` heading | dropped: hook boilerplate |
| F6:21 | tagline | TR:122 (Rule 6 heading) |
| F6:25 | hooks run through Git Bash; forward slashes; the 16 glassbox hooks dead ~2026-08-02 to 2026-10-03; backup file; hot reload ~46 s | TR:123, TR:124; TR:65 (History), TR:144 (rig correction); GB:16, GB:92, GB:121, GB:130, GB:132; CH:20, CH:94, CH:178 |
| F6:27 | reviving the hooks restarts glassbox retention (5000 newest, ~5 min) | GB:93 |
| F6:29 | the Bash tool collapses `\\` to `\` in command text, even in single quotes; `printf '\134'`, `\` | TR:78 (Rule 1 extension); CH:21, CH:95 |
| F6:31 | Why (silent async failures; two agents' false zero counts) | TR:125; the false zero counts at TR:78 |
| F6:32 | How to apply (forward slashes; `jq -j ... \| tr -d '\r'`, then `bash -c "$cmd"`) | TR:126 |
| F6:34-38, 40-42 | Possible Connections (keyword matches), Capture Context | dropped: hook boilerplate |

## Reconciliation edits (old -> new, with evidence)

Quotes are shortened with "…". Evidence is the frozen capture line.

| # | Where | Old | New | Evidence |
|---|---|---|---|---|
| R1 | PM:8 `progress` | "…, PR to main still unopened (Paul deferred); v5 corrected Fintech…" | "…, then opened as Melange PR #2 and merged 2026-10-03 at Paul's request (merge commit 54433266); v5 corrected Fintech…" | F1:30 |
| R2 | PM:10 `blockers` 1 | "PR to main unopened: gh is NOT installed and Claude in Chrome was not connected, … (Paul deferred: 'we can do it later')." | "Resolved 2026-10-03 (was: PR to main unopened; …): Paul signed in to GitHub in the built-in browser, the PR was opened there as Melange PR #2 and merged at his request." | F1:30 |
| R3 | PM:15-16 action item | "Offer to open the PR …", status `todo` | same text + "Done 2026-10-03: opened as Melange PR #2 and merged …", status `done` | F1:30 |
| R4 | PM:19-20 action item | "Decide whether to delete or keep the partial ref …", status `todo` | same text + "Done 2026-10-03: deleted on origin at Paul's request; still kept as a local branch and on remote mirror.", status `done` | F1:33 |
| R5 | PM:5 `description` ("…(PR unopened)…") | unchanged (a summary) | dated correction paragraph after the tagline, PM:67 | F1:30 |
| R6 | PM:83 Status, Progress | "…GitHub push of the live tree done 2026-10-02/03, PR to main unopened." | "…done 2026-10-02/03; PR to main opened and merged 2026-10-03 (Melange PR #2)." | F1:30 |
| R7 | PM:91-92 Action Items table | both rows `todo` | both rows `done`, with "(done 2026-10-03: …)" | F1:30, F1:33 |
| R8 | PM:117 Blockers | "- PR to main unopened (Paul deferred); `gh` is NOT installed and Claude in Chrome was not connected (2026-10-02/03)." | struck through + "Resolved 2026-10-03: … PR #2 … merged … (merge commit `54433266`); `gh` is still not installed." | F1:30 |
| R9 | PM:126-127 PENDING items | open PR; partial ref decision | each kept + "Done 2026-10-03 (next bullet)." / "Done 2026-10-03: deleted on origin." | F1:30, F1:33 |
| R10 | PM:131 How to apply | "next session, offer to open the PR first. …" | kept + "(The "offer to open the PR first" step is superseded: the PR was opened and merged on 2026-10-03.)" | F1:30 |
| R11 | PM:206 Map row (repo-state topic) | "GitHub branch pushed (PR unopened)" | "GitHub branch pushed (PR merged 2026-10-03)" | F1:30 |
| R12 | T:12 `objective` | "…GitHub migration branch (PR still unopened), …" | "…GitHub migration branch (PR still unopened at the time; opened and merged 2026-10-03), …" | F1:30 |
| R13 | T:26 tagline ("…with the PR still unopened…") | unchanged (the summary) | dated correction paragraph after it, T:28 | F1:30 |
| R14 | T:63 History 2026-10-02/03 | "…PR to main still unopened ("we can do it later")." | kept + "; superseded by the next row." and the new 2026-10-03 row T:64 | F1:30 |
| R15 | T:74 Decisions, GitHub migration | "…open the PR and any history rewrite are deferred / Paul's decisions." | kept + "2026-10-03: at Paul's request the PR was opened and merged (Melange PR #2, merge commit `54433266`); the history rewrite is still his decision." | F1:30, F1:34 |
| R16 | T:82-83 Next Steps | `[ ]` open the PR; `[ ]` partial-ref decision | `[x]` both, with dated "Done 2026-10-03" notes | F1:30, F1:33 |
| R17 | T:96-97 PENDING items | open PR; partial ref decision | each kept + "Done 2026-10-03 (next bullets)." / "Done 2026-10-03: deleted on origin." | F1:30, F1:33 |
| R18 | T:103 How to apply | "next session, offer to open the PR first. …" | kept + the same supersession note as R10 | F1:30 |
| R19 | people/paul-goff.md:86 | "Mentat GitHub migration (2026-10-02): PR to main deferred by Paul ("we can do it later"); …" | kept + "On 2026-10-03 he signed in to GitHub in the built-in browser himself and had the PR (#2) opened and merged." | F1:30 |
| R20 | people/paul-goff.md:139, actors/mentat-console.md:171, actors/mentat-fec-pipeline.md:179 (link descriptions of the repo-state topic) | "GitHub branch pushed (PR unopened)" | "GitHub branch pushed (PR merged 2026-10-03)" | F1:30 |
| R21 | LT:5 `description` and LT:16 tagline | "…with fec/tools/live_patch.py and applied with core.autocrlf=false, never normalising LIVE; applying needs Paul's go." | "…with fec/tools/live_patch.py, applied with core.autocrlf=false, never normalising LIVE: no merge or checkout (D-060); applying needs Paul's go." | F2:104 |
| R22 | echo lines: projects/melange-systems.md:349, actors/melange-fec-pipeline.md:212, SC:212 | the old LT description | the new LT description (R21) | F2:104 |
| R23 | LT:22 | "…needs Paul's explicit go; in the staffer sidecar lanes both are his own actions." | kept + "Correction (2026-10-03/04, …): in the route-latency lane Paul gave that go in advance for each landing, conditional on an independent Opus check (…), and the stop, apply and restart then followed once the check had passed (…)" | F2:61-76, F2:73, F2:146-149 |
| R24 | LT:26-27 (HEAD LT:25) | "- One patch per lane, …; before any merge into LIVE, check that no path it touches is dirty (but see "Pending newer capture" at the end of this note: D-060, 2026-10-03, …)." | LT:26 "One patch per lane, … Exception (2026-10-03/04, …): when Paul rules each landing, a lane may land several patches in turn, each applied only after an independent Opus check passes; the route-latency lane landed four (…)." and LT:27 "Never merge or check out a branch into LIVE, because a checkout rewrites line endings (D-060, …). A lane commits its own files on LIVE main with `git add` on their exact paths … This replaces the earlier advice to check, before a merge into LIVE, that no path the merge touches is dirty." | F2:104 (D-060, exact paths); F2:61-77, F2:86-93, F2:121-149 (four landings) |
| R25 | LT:30 (HEAD LT:28) | "APPLY and any restart need Paul's explicit go; the agent cuts and verifies the patch." | kept + "Paul may give that go in advance for a landing, conditional on an independent check passing (route-latency lane, 2026-10-03/04)." | F2:61, F2:73, F2:146 |
| R26 | LT:36 (HEAD LT:34), Where it Applies | "…the route-latency lane lands as ONE patch cut with the cutter; APPLY and the 8841 restart are Paul's" | "…the route-latency lane landed four patches on Paul's per-landing rulings (2026-10-03/04), each after an independent Opus check, and committed its own files on LIVE main by exact paths" | F2:61-149 |
| R27 | LT:38 (HEAD LT:36), Where it Applies | "…sidecar changes reach LIVE as one cut patch; APPLY and the restart are Paul's" | "…sidecar changes reach LIVE as cut patches, one per landing; APPLY and the restart need Paul's go, which he gave per landing in the route-latency lane (2026-10-03/04)" | F2:61-149 |
| R28 | LT, HEAD LT:48-50 `## Pending newer capture` | the caution quoting D-060 and pointing at the fleeting note | removed: its rule is now LT:27 (and the batch-8 pointer in the old bullet went with R24) | F2:104 |
| R29 | SN:171 Related Concepts (echo) | "…the latency lane lands as ONE patch cut with fec/tools/live_patch.py; APPLY and the 8841 restart are Paul's" | "…the latency lane landed four patches on Paul's per-landing rulings (2026-10-03/04), each after an independent Opus check, and committed its own files on LIVE main by exact paths, never by merging a branch into LIVE (D-060)" | F2:61-149, F2:104 |
| R30 | topics/2026-07-troubleshooting-melange-audits-and-reviews-later-reviews.md:89-90 (lessons kept) | "…Before promising a merge run `git -C <LIVE> status --porcelain -- <paths>`: one dirty path blocks it …" and "…then `merge --ff-only` in LIVE." | new :91 "Correction 2026-10-03 (D-060 …): never merge or check out a branch into LIVE … The merge into LIVE in the two preceding lessons … no longer applies: the change reaches LIVE as a patch cut against LIVE bytes, and the lane commits its own files on LIVE main with `git add` on their exact paths." | F2:104 |
| R31 | SC:14 `known_issues` | "Dies on reboot / hard reboot; autostart is only the watchdog scheduled task MelangeStafferLiveSidecar (logon +2 min and every 30 min)" | "…; its only autostart, the watchdog scheduled task … , stays disabled (brain D-080, as of 2026-10-03), so a restart is the server.json PID stop plus start_staffer_live.ps1" | F2:68 |
| R32 | SC:15 `known_issues` | "…(2026-10-02 measurement); latency fix lane in progress" | "…(2026-10-02 measurement); the latency lane landed four patches on 2026-10-03/04 and closed on 2026-10-04 with open items, and no post-landing memory figure is recorded" | F2:121-144 |
| R33 | SC:17 `known_issues` | "Typeahead slow: people p95 8.4 s, office search max 41 s" | "… (2026-10-02, before the landings); directory-mode searches are still not prewarmed (the first one took 8.4 s on 2026-10-04)" | F2:132 |
| R34 | SC:50 Details, Listener | "`127.0.0.1:8841`, no autostart except the watchdog task; server PID recorded in …" | "…, no autostart except the watchdog task, which stays disabled (brain D-080, as of 2026-10-03); server PID recorded in … (PID 66688 after the 2026-10-04 14:33 restart)" | F2:68, F2:123 |
| R35 | SC:89-90 and SC:94-96 Dev Commands (commands kept) | watchdog command; "python fec/tools/live_patch.py    # cuts ONE patch; APPLY and the 8841 restart are Paul's" | dated comments: "# 2026-10-03: the task stays disabled (brain D-080); …" and "# 2026-10-03/04: the lane landed one patch per landing …" | F2:68, F2:61-149 |
| R36 | SC:101 Known Issues | "…Autostart exists only via the watchdog task (below)." | kept + "As of 2026-10-03 that task stays disabled (brain D-080; …), so nothing restarts the sidecar after a reboot." | F2:68 |
| R37 | SC:104 Known Issues | "Typeahead slow: people p95 8.4 s; office search max 41 s. …" | kept + "These are the 2026-10-02 figures, before the landings; after them, directory-mode searches are still not prewarmed …" | F2:132 |
| R38 | SC:172 "Next:" plan (kept) | "…cut ONE patch …; APPLY and the 8841 restart are Paul's; then run the live panel …" | new sub-bullet SC:173 "Done and superseded 2026-10-03/04 …: the lane landed four patches instead of one, each after an independent Opus check, on Paul's per-landing go …" | F2:61-149 |
| R39 | SN:88 Next Steps | `[ ]` "Latency lane: merge WP-A and WP-B, …; APPLY and the 8841 restart are Paul's; …" | `[x]` + "Done 2026-10-03/04, as four landings instead of one patch (…), each after an independent Opus check on Paul's per-landing go; the lane closed 2026-10-04 except open items" | F2:61-149 |
| R40 | SN:147 (live sidecar surface) | "Autostart LIVE 2026-09-05 (Paul-ordered): scheduled task … ; it never stops anything." | kept + "As of 2026-10-03 the task stays disabled (brain D-080; …)." | F2:68 |
| R41 | SN:166 How to apply (kept) | "…cut ONE patch …; APPLY and the 8841 restart are Paul's; …" | new SN:167 "Superseded 2026-10-03/04 (newer version of the same memory file): the lane landed four patches on Paul's per-landing go, each after an independent Opus check, and committed its files on LIVE main by exact paths; …" | F2:61-149, F2:100-105 |
| R42 | actors/melange-dashboard.md:120 | "…the 8841 restart chain is scheduled task `MelangeStafferLiveSidecar` -> watchdog -> `start_staffer_live.ps1`; …" | kept + "(correction 2026-10-03, …: the task stays disabled per brain D-080, and the route-latency landings restarted 8841 by stopping the `server.json` PID and running `start_staffer_live.ps1` directly)" | F2:66-68 |
| R43 | discussions/2026-09-06-staffer-sorting-rulings.md:19 (`action_items`) and :114 (open item kept) | "Paul to restart task MelangeStafferLiveSidecar when the sidecar code changes …" | each kept + dated progress: "the task stays disabled (brain D-080); a code change goes live by stopping the server.json PID and running start_staffer_live.ps1" | F2:66-68 |
| R44 | PF:8 `progress` | "As of 2026-10-03: …; PAC accuracy attempt 2 on HOLD at S2C narrow repair -> v3 freeze -> one Opus verifier gate, UT-X sealed." | "As of 2026-10-04: …; PAC accuracy attempt 2 finished 2026-10-03 (goal not met, HOLD unchanged, UT-X sealed and not scored; v3 is the record, the v4 history branch a regression); Paul's six-year rolling lookback directive (2026-10-03) and v5 rulings (2026-10-04) shape the next attempt." | F3:44, F3:46, F4:25-35 |
| R45 | PF:10 `blockers` 1 | "PAC accuracy attempt 2: S3 needs Paul's explicit OK plus a fresh gate on the v2 freeze; UT-X is single-shot and stays SEALED (C1, 2026-10-03)." | "PAC accuracy attempt 2: UT-X is single-shot and stays SEALED (C1, 2026-10-03); opening it needs a new owner ruling. Resolved part (was: S3 needs …): on 2026-10-03, after the S2C gate PASS, S3 ran dev-only, one pass, on Paul's 'finish'." | F3:44 |
| R46 | PF:13 `blockers` 4 and PF:134 body | "Pace backtest waits on Paul's OK to download FEC pas212/214/216 (no-downloads stands)." | kept + "2026-10-04: Paul's v5 ruling D8 authorises the FEC downloads needed to prepare 2028 as the first clean test." (whether D8 also covers the pace backtest is not recorded, so the blocker stays) | F4:35 |
| R47 | PF:28-29 and PF:32-33 action items | S2C item `in_progress`; S3/UT-X item `blocked` | both `done`, each with a dated note (S2C gate PASS; S3 dev-only one pass on Paul's "finish"; UT-X SEALED_NOT_SCORED, opening it still needs a new owner ruling) | F3:44 |
| R48 | PF:93 Status, Progress; PF:104-105 Action Items table | "…PAC accuracy attempt 2 HOLD at S2C -> v3 freeze -> one Opus verifier gate; UT-X sealed"; rows `in_progress`, `blocked` | as R44; rows `done` with dated notes | F3:44, F3:46, F4 |
| R49 | PF:131 Blockers | "PAC accuracy attempt 2: S3 needs Paul's explicit OK and a fresh gate on the v2 freeze; UT-X is single-shot and SEALED (C1)." | struck through + "Resolved 2026-10-03 (…): after the S2C gate PASS, S3 ran dev-only, one pass, on Paul's "finish"; the attempt finished ~08:45 UTC with UT-X still single-shot, SEALED and not scored." | F3:44 |
| R50 | FR:129 Next Steps | `[ ]` "PAC accuracy attempt 2: finish S2C narrow repair -> v3 freeze -> ONE Opus verifier gate; …" | `[x]` + "Done 2026-10-03: the S2C gate PASSED, S3 ran dev-only (one pass) on Paul's "finish", and the attempt finished ~08:45 UTC" | F3:44 |
| R51 | DR:16, DR:17, DR:19 `action_items`; DR:77, DR:78, DR:80 body | S3 rule, S2C item, UT-X item (open) | dated progress on each; S3 and S2C items `[x]`; the UT-X item stays open ("the single shot is still unspent") | F3:44 |
| R52 | SL:67 Look ledger, 2026-10-03 row | "…sealed for the attempt (ruling C1); S3 dev-only" | kept + "; after the S2C gate PASS, S3 ran one dev-only pass and the attempt ended ~08:45 UTC with UT-X SEALED_NOT_SCORED (unspent)" | F3:44 |
| R53 | MR:21 `known_issues` | "The mirror holds 2 branches that no longer exist locally (left alone); claude/wizardly-wilbur-e2d1a0 and claude/melange-data-expansion-958236 are NOT on the mirror" | "As of 2026-10-03 the mirror holds 3 refs that no longer exist locally (left alone): … ; every local branch (339 of 339) is present and current. This replaces the older item: …" | F5:58 |
| R54 | MR:100 Known Issues | "2 branches exist on the mirror that no longer exist locally (left alone)." | kept + "As of 2026-10-03 there are 3 such refs: …, the ONLY copy of 4 QME commits …" | F5:58 |
| R55 | MR:101 Known Issues | "As of 2026-09-18 two local branches are NOT on the mirror: …" | kept + "Superseded: the full refreshes of 2026-09-19 (292 of 292) and 2026-10-03 (339 of 339) verified every local branch present and current on the mirror." | F5:56, F5:58 |
| R56 | MR:73 Dev Commands comment | "# Full mirror (Paul-ordered 2026-08-18 and 2026-09-19), no force" | "# Full mirror (Paul-ordered 2026-08-18, 2026-09-19 and 2026-10-03), no force" | F5:58 |
| R57 | DB:115 Next Steps | `[ ]` "Mirror the two branches not on the mirror: …" | `[x]` + "Resolved: the full refreshes of 2026-09-19 (292 of 292) and 2026-10-03 (339 of 339) verified every local branch present and current on the mirror …" | F5:56, F5:58 |
| R58 | GB:16 `known_issues` | "settings.json hook mirror stopped being invoked in app sessions ~2026-08-06 (…); coordinator must emit agent.*/task.* pairs itself" | kept + "Correction 2026-10-03: the 16 mirror.ps1 hooks were dead from about 2026-08-02 because hook commands run through Git Bash, which stripped the backslashes of their unquoted Windows paths; fixed 2026-10-03 with forward slashes" | F6:25 |
| R59 | GB:91 GLASSEYE (kept: "the harness stopped calling it") | — | new sub-bullet GB:92 "Correction 2026-10-03 (…): the harness did call the hooks; their commands failed. …" | F6:25, F6:31 |
| R60 | GB:121 full-visibility architecture | "…(b) harness-enforced PostToolUse mirrors across ALL sessions/projects." | kept + "(Part (b) was dead from about 2026-08-02 to 2026-10-03; see the GLASSEYE correction.)" | F6:25 |
| R61 | GB:130 Timeline 2026-08-06 | "Hook mirror stops being invoked in app sessions (found 2026-08-09, GLASSEYE)" | kept + "; corrected 2026-10-03: dead from about 2026-08-02, a Git Bash path failure, not a harness change" | F6:25 |
| R62 | TR:143 "HOOKS INSTALLED + PROVEN 2026-07-24 23:42 … harness-enforced PostToolUse mirrors across ALL sessions/projects" (kept) | — | new TR:144 "CORRECTION 2026-10-03 (…; supersedes "harness-enforced PostToolUse mirrors across ALL sessions/projects" for the period): these `mirror.ps1` hooks were dead from about 2026-08-02 until 2026-10-03, …" | F6:25 |

Inference flagged: R23 says "the stop, apply and restart then followed once the check had passed" without naming who ran them; the
capture records Paul's instruction ("stop, apply, start once the check passes") and the exact stop and start times, which reads as
the lane doing it, but it never says so outright.

## Stale statements resolved

`.bedrock/reorg/stale-statements.md` gained a Status column. Rows 4-10 are marked RESOLVED by this pass (rows 4-9 by R1-R20;
row 10 because the capture was organized, its body carried and its stale tagline and "How to apply" not carried as current, and
the note deleted). Rows 1-3 and 11-13 stay open: no frozen capture bears on them.

## Considered, unchanged

- `topics/2026-07-troubleshooting-melange-live-tree-git-drift.md` and its parts (an F5 `updates:` target): they hold the mirror
  record as dated history (setup, the 08-18 and 09-19 refreshes) with "see also" pointers to the mirror actor; F5:58 supersedes no
  statement there, so the family keeps `d344e91e`. Its concept echo line (`:60`, "never through a checkout that normalises its line
  endings") already agrees with D-060.
- The "PAC accuracy attempt 2 (HOLD)" link descriptions in seven notes stay true (HOLD is unchanged).
- Dated history about past merges into LIVE (for example the 2026-09-19 fast-forward of `423820d76`, the 2026-09-30 fast-forward
  of `c13f3a5d4`, `actors/melange-refresh-scheduler.md:101` "done 2026-08-09") records events, not rules, and is unchanged.
- `topics/2026-07-feature-agent-tooling-stack-quant-model-evaluation-lane.md:73` ("MelangeStafferLiveSidecar stays disabled")
  already agrees with D-080.
- The concept's Evidence line on Melange audits and code reviews (LT:45) describes the patch route, which still holds.
- F6's suggested connection `2026-08-incident-workstation-disk-and-backup` was a keyword match with no bearing; not used.

## Deletions

After the rows above were complete: `git rm` of F1, F2 and F3 (tracked); F4, F5 and F6 (never tracked) removed from disk. The
hook records a deleted note it wrote as a dismissed version; every frozen version is also held by curated notes now, so none is
captured again.

## Gates (2026-10-04, after the deletions)

Working tree:

- `bun .bedrock/recall/hook.ts index`: index ok, 204 notes, 13835 terms (index.md was already current).
- `bun .bedrock/reorg/check.ts --strict`: a b c d f g h i j k all ok. 204 notes (204 curated, 0 fleeting), 567 links, 2064
  mentions, 0 unresolved, 0 one-way, 0 without a curated incoming link; f: 0 enforced baseline pairs missing (3 are held by a newer
  sha256 of the same path: the upserted F1, F2 and F3 entries); i: 0 leaves over budget; j: 119 parts in 30 families, 0 problems.
- `bun .bedrock/reorg/healthcheck.ts --strict`: CLEAN (setup OK; 0 orphans and 0 dangling among curated notes; 0 fleeting notes).
- `bun .bedrock/recall/hook.ts sync --dry-run`: 212 memory files, 212 already in the vault, 0 new, 0 changed.
- `bun .bedrock/graph/build.ts && bun .bedrock/graph/verify.ts`: 204 notes, 567 links, 2064 mentions; publish gate PASS.
- `bun .bedrock/recall/selftest.ts`: SELFTEST OK (informational run).

Would-be-committed tree (`git write-tree` of exactly the 32 staged paths, `git archive` into a `mktemp -d` path):

- `check.ts --vault <export> --strict`: all ok, same numbers.
- `build.ts --vault <export>`, `verify.ts`, `snapshot.ts --file <page>`: PASS; SNAPSHOT OK at the new pins.
- `BRAIN_VAULT=<export> hook.ts sync --dry-run`: 212 memory files, 212 already in the vault, 0 new, 0 changed: the committed
  tree alone holds every captured version.
- `BRAIN_VAULT=<export> selftest.ts --verbose`, after warming the export's index with `hook.ts index` (on a fresh export the
  first on-topic recall runs out of time rebuilding the index; the HEAD baseline showed the same cold start and passed on the
  second run): SELFTEST OK; on-topic 22/22, off-topic 22/22, end to end 12/12. Pins 4, 9, 10, 13 and 16, whose notes this pass
  edited, still rank 1 as at HEAD, so no selftest pin changed and `.bedrock/recall/selftest.ts` is untouched.

Snapshot re-pin (`.bedrock/graph/snapshot.ts`, the documented procedure: pinned from the would-be-committed export, history in
its header comment): 207 / 574 / 2083 with 3 fleeting notes -> 204 / 567 / 2064 with 0. A node and link-weight diff of the HEAD
export's page against the new page shows exactly: 3 nodes removed (F1, F2, F3, the fleeting notes tracked in HEAD); 7 links
removed, each of weight 3 (their pairs with the notes they updated: each named its targets in `updates:`, Possible Connections
and Capture Context), so -21 mentions; one weight change, forecast-redesign <-> paul-goff 12 -> 14 (+2, the owner cells of the
new S6 MAJOR-2 action item in the frontmatter and the table). Net -19 mentions; no other node, link or weight changed.

Later arrivals: none. The freeze was rechecked before the deletions (six notes and their memory files unchanged, nothing new in
`fleeting/`) and the memory files again before the commit.
