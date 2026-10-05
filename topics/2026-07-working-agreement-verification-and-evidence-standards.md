---
type: topic
title: "Verification and evidence standards"
aliases: ["Verification and evidence standards"]
category: "working-agreement"
status: "open"
people:
  - "[[paul-goff]]"
actors:
  - "claude-code-harness"
objective: "Standing feedback rules on how agents must verify and evidence claims before telling Paul anything: completion is proven by artifact, mechanism claims need a census or counterfactual, existence claims need a repo-wide search, scouts fabricate and are verified adversarially, spawned-task premises and line numbers are checked against the committed tree, established context is re-read from memory, and two standing research corrections (Danish elite Big Five data exists; the Agreeableness validation search stays open until Paul says stop)."
created_at: 2026-07-09
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/receipt-line-pins-vs-live-tree-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\receipt-line-pins-vs-live-tree-2026-09-18.md", sha256: "a93396fc6bd5d4cc9a1e248fcb6613f4d1b087fdb274366af24734af56fec4b4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/scout-census-traps-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\scout-census-traps-2026-09-13.md", sha256: "a414d9293a4147a775318f22c9b73ef8c43716750b593a1143aa76716e4579c4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/spawned-task-premise-may-be-stale-2026-09-14.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\spawned-task-premise-may-be-stale-2026-09-14.md", sha256: "d611c5b1e3a2644d0ea76b47ef56b61d6b76df08c0cc63cdebe4cd02a3ee5e0a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/audio-lane-verification-lessons-2026-09-07.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\audio-lane-verification-lessons-2026-09-07.md", sha256: "51b04a40fd7e6d728012dc145e10d1ecfcf77c340ef8e343a43110a507037f88"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/examination-lane-lessons-2026-08-14.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\examination-lane-lessons-2026-08-14.md", sha256: "57a6e9946ab3abd6c60736cf7da639f5f526d7ee57229822dd7f0fbead11eb3d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/hallucination-framework-lane-2026-08-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\hallucination-framework-lane-2026-08-13.md", sha256: "308e66f8f40161777e4045bcdace8648c2a4337d7159037ae29533636675de29"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/verify-dont-infer-completion-2026-08-04.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\verify-dont-infer-completion-2026-08-04.md", sha256: "4010399667f253b0ec2c4f93e3b468a672734427e4539cac33cda0abbb00fa2e"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/a-validation-open-search-2026-07-12.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\a-validation-open-search-2026-07-12.md", sha256: "b9e7efb3af47eef88592706728626b29e3511718f2a40a62cf7c3cb4a94e3225"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/danish-external-criterion-2026-07-12.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\danish-external-criterion-2026-07-12.md", sha256: "8b29888b5a4e1c8216fe4d84642e157bf41c7b058725f8a86a8b3e53980455c2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/dont-drop-context-anchor-memory.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\dont-drop-context-anchor-memory.md", sha256: "19a63a8ec0ebf3f48eaecd7f010a31adc7cb4cf0f9aa196e6ed7cea6e151b6ad"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/topic", "status/open", "domain/agent-ops", "category/working-agreement"]
---

# Verification and evidence standards

> Working agreement (feedback rules from Paul, 2026-07-09 to 2026-09-18, mostly after agents were measured wrong): never infer completion, demand a census before repeating a mechanism claim, search the whole repo before saying something is absent, treat scout output as a claim, pin citations to HEAD, and re-read memory before asserting what was decided.

## Context

- Paul's repeated corrections of agent claims in the Melange / Moneyball / Mentat work produced these rules. Each rule below is a bullet with its **Why** (the measured incident) and **How to apply**.
- Newest source in this topic: 2026-09-18 (`receipt-line-pins-vs-live-tree-2026-09-18`). Oldest: 2026-07-09 (`dont-drop-context-anchor-memory`).
- The rules were learned in the audio/speech lane (Audio and speech lane), the personality / Big Five psychometrics work (Personality psychometrics (Big Five)), the Melange audits and code-review fan-outs (Melange audits and code reviews) and delegated sessions in the Claude Code harness; the person they protect from wrong claims is [[paul-goff]].
- Related memories (not vault entities): `verify-dont-infer-completion-2026-08-04`, `dont-drop-context-anchor-memory`, `examination-lane-lessons-2026-08-14`, `audio-lane-verification-lessons-2026-09-07`, `scout-census-traps-2026-09-13`, `spawned-task-premise-may-be-stale-2026-09-14`, `receipt-line-pins-vs-live-tree-2026-09-18`, `a-validation-open-search-2026-07-12`, `danish-external-criterion-2026-07-12`, `hallucination-framework-lane-2026-08-13`, `committed-vs-live-drift-2026-09-13`, `code-review-five-lanes-2026-09-13`, `members-section-consistency-lane-2026-09-15`, `audio-complementary-layers-lane-2026-09-07`, `psych-audit-2026-07-09`, `moneyball-big5-campaign`, `moneyball-receptivity-layer`, `n-slot-reanchor-2026-07-11`, `reorg-phase0-tripwires-2026-08-04`, `glassbox-everything-rule-2026-07-27`, `live-tree-branch-state-2026-07-14`, `codex-executor-lane-2026-07-18`.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| Claude Code harness | Harness traps: MEMORY.md loading contract, heredoc mangling, SendMessage duplicates, GateGuard amend block, poppler PATH. |

## Related Concepts

- [[census-before-claims]] — rules R1 and R2 of this agreement: never infer completion, and demand a census before repeating a mechanism claim
- [[settled-findings-stay-settled]] — R7 anchors every claim to the recorded state instead of contradicting it; R9 is the counterpart: the Agreeableness validation search that Paul reopened is not bound by the old closures

## Related Topics

- Audio and speech lane - Speech/audio lane: no shipped ASR, off-chain fail-closed, N audio route closed; audio layers complementary; four false mechanism claims.
- Personality psychometrics (Big Five) - Big Five psychometrics for Congress members: instruments, pre-registered looks, Senate-gold anchoring, N/A slots; O/C/E valid, A- grade.
- Melange audits and code reviews - Melange audit runs, guardrails, 09-13 five-lane code review, hallucination framework (D-007), provenance census, laundry-list close-out

## History

| Date | Event |
|---|---|
| 2026-07-08/09 | Paul, repeatedly and angrily: "DON'T FUCKING FORGET THE CONTEXT" / "you keep making mistakes, reset." Rule `dont-drop-context-anchor-memory` written 2026-07-09 (after the agent graded the psychology instrument off raw Pink LLM scores and said "only C is validated"). |
| 2026-07-12 | Paul, angrily, orders an open-ended search for a better Agreeableness (A) validation ("Stop this settling bullshit..."); round 1 of the search run the same day, with a MAJOR REVERSAL (Pink vs Blue validity is trait-dependent). |
| 2026-07-12 | Danish external-criterion correction: external elite politician self-report Big Five data exists (Denmark/Europe); the claim "no external N criterion / elites can't self-report" was US-Congress-specific and wrong as a universal claim. |
| 2026-08-04 | Four verification failure modes measured (background-session completion is not evidence, substring search matches the fix comment, a crashing assertion masks later ones, a crying-wolf tripwire). |
| 2026-08-13/14 | Findings-examination framework lane (D-007 adopted); errors the agent made in that lane recorded as `examination-lane-lessons-2026-08-14` (written 2026-08-14). |
| 2026-09-07 | Audio lane: four confident wrong agent claims measured FALSE; three had been repeated to Paul (`audio-lane-verification-lessons-2026-09-07`, modified 2026-09-08). |
| 2026-09-13 | Review fan-out lane: Haiku scouts fabricate repo maps, wrong tree parsed, slow census, declined follow-ups (`scout-census-traps-2026-09-13`, extended 2026-09-15 with three more from the 2026-09-15 members-section lane). |
| 2026-09-14 | Spawned-task premise found stale (STAFFA-8 increment already existed on the review-branch tip). |
| 2026-09-18 | Paul rules that a `file:line` citation inside committed source pins to COMMITTED source, not the live tree; landed as `a84842eb7` on `claude/amazing-lewin-409893`. |

## Decisions

Standing rulings and their justifications (the full rule text, with **Why** and **How to apply**, is in the Rules sections below):

- Completion is proven by the specific artifact each job was supposed to change, never by a notification or a model having watched it finish (2026-08-04). Justification: this codebase fails by omission, not exception; a check that cannot fail is worse than none.
- A mechanism claim ("X is dropped because Y", "this branch fires") is not evidence until someone counts the rows that take it or flips the constant (2026-09-07). Justification: four such claims were measured false in one lane and three were repeated to Paul.
- Existence claims need a repo-wide search for distinctive content strings, and prose searches run over joined text (2026-08-14).
- Scout output is a claim: existence and size claims come from scripts; every scout NOT FOUND is disproved with one listing before it reaches a packet; an adversarial verifier always runs before findings reach Paul (2026-09-13/15).
- Before editing any spawned-task finding, grep the review branch tip for the fix and run the named test there (2026-09-14).
- A `file:line` cite inside committed source is verified with `git show HEAD:<path>`, never the working copy (2026-09-18, Paul's ruling).
- Before any claim about what is validated / decided / measured, re-read the relevant memory and anchor to it (2026-07-09). Never say "5/5" unqualified; never say "no external criterion exists" flatly.
- Never argue with Paul's recollection of a figure without checking transcripts first (2026-10-04; `pac-accuracy-six-year-lookback-directive-2026-10-03`, diagnostic revision 2). In that memory, revision 1 had called the banks 95% figure post hoc and never told to Paul, and Paul WAS told on 2026-10-01 14:42 ET.
- The Agreeableness validation search is open until Paul says stop; the kill-ledger "closures" do not bind it (2026-07-12).
- ~~"ES routes exhausted / no gold-standard N criterion" as a universal statement (`psych-audit-2026-07-09` framing)~~ (2026-07-09) - superseded 2026-07-12 by the Danish correction: "none for US Congress; European self-report exists and transfers at the method level"; kept because it explains older psych-audit text.
- ~~"A routes exhausted, never propose" (line in `psych-audit-2026-07-09`)~~ (2026-07-09) - superseded 2026-07-12 for THIS search only, under Paul's explicit direction.
- ~~"Pink is noise / keep Blue drop Pink" (global recommendation)~~ (2026-07-12 earlier) - RETRACTED the same day by the MAJOR REVERSAL: validity is trait-dependent (Pink wins O and C, Blue wins E and ES, A ties); kept because it explains the earlier recommendation.

## Next Steps

- [ ] Before presenting any finding to Paul: run the adversarial verifier pass and disprove every scout NOT FOUND with a listing.
- [ ] Before editing a `file:line` receipt: `git show HEAD:<path> | wc -l` and `git show HEAD:<path> | grep -n "<call>"`, then sweep EVERY citation in the block.
- [ ] Continue the open-ended Agreeableness validation search until Paul says stop (next lever: a non-O-halo'd behavioral A criterion; see the A-validation section).
- [ ] Before claiming a Danish-data correlation is or is not runnable, check the outcome of workflow `wf_cf13e766` (Schumacher-Zettler OSF? named vs anonymized? Folketing speech linkage?).
- [ ] The text-N vs behavioral `reactivity_z` criterion is a legitimate open N route but needs a NEW preregistration before any look.

## Rules

### R1. Verify, do not infer completion (`verify-dont-infer-completion-2026-08-04`, measured 2026-08-04)

Four verification failure modes, each measured on 2026-08-04, not hypothesised.

- **A background session's completion notification is NOT evidence its work landed.** All three sessions (`task_0e7a1f0a`, `task_48dc0270`, `task_a5776fa0`) had exited having landed nothing. Always verify against the specific artifact each was supposed to change.
- **Plain substring search matches the COMMENT that documents a fix.** This produced three false "defect still live" reports in a row. `Math.max(0.1,add)` and `NOT rcost/add**2` both live in the rationale comment explaining that the guard was removed. Strip `//` line-comments before searching a generated surface for a code-level defect (do not cut on `://`). Same class as the earlier `-SimpleMatch`-with-regex-alternation bug: search strings must be shaped like the target language, not the language you were thinking in (a Python-shaped `c<avg` will not find JS's `rcost(u,i)/add<avg`).
- **A crashing assertion conceals every assertion after it.** Fixing a stale `build()` call in `test_lobbyview_network.py` surfaced a second failure below it that had not executed in an unknown number of runs. An early hard failure is not one defect, it is an unknown number.
- **A tripwire that cries wolf reproduces the omission it guards against.** An audit reported `district_employers/financial/hmda.json` as "read by nothing"; all three were false, with 10-11 readers each. Cause: readers call a loader helper with a bare filename (`_optional_L('district_hmda.json')`) instead of constructing a path, so static reader-detection was blind. Negative-control every gate: the freshness audit was run against 5 deliberate corruptions and had to catch all 5.
- **Why:** this codebase fails by omission, not exception. A check that cannot fail, or that fails wrongly, is worse than none because it manufactures false confidence.
- **How to apply:** assert PRESENT AND CORRECT, never that nothing raised. Prove a new gate can fail before trusting that it passed. When mutating live artifacts to test a gate, take a byte-hash first and restore in a `finally`, then verify the hash matches.
- Related: `reorg-phase0-tripwires-2026-08-04`, `dont-drop-context-anchor-memory`, `glassbox-everything-rule-2026-07-27`.

### R2. Demand a census before repeating a mechanism claim (`audio-lane-verification-lessons-2026-09-07`, Paul-facing lesson 2026-09-07)

In the 2026-09-07 audio lane (`audio-complementary-layers-lane-2026-09-07`; see Audio and speech lane) four separate agent claims were confidently stated and later measured FALSE. The agent repeated three of them to Paul before they were checked.

1. "Members are dropped when `nonfloor_exact_windows_total == 0`." False. Measured 2x2: 156 members with zero non-floor windows ARE in the descriptive artifact. The real discriminator is presence in the accepted clip manifest.
2. "Chip Roy loses a verbatim quote to the composer budget." False. The branch is unreachable: 0 of 529 composed members trip it; `build_rows` at 250 vs 100000 gives zero differences. A fix was recommended to Paul for a defect that did not exist.
3. "Line-ending churn will conflict with other lanes." False. `core.autocrlf=true`, no `.gitattributes`; `git diff --numstat` is identical with and without `--ignore-cr-at-eol`. Paul was warned about a non-issue.
4. "The promotion markers are load-bearing." False. The agent's own evidence showed all three readers are test files asserting a written literal. No production code branches on `profile_effect`.

Also: population counts 334/93 were wrong (actual 332/95), and a first-draft regression test drew its expectation from the artifact it was validating, so a replanted bug passed it.

- **Why:** every one of these was a claim about MECHANISM ("X is dropped because Y", "this branch fires") stated without a census or a negative control. Mechanism claims are exactly where plausible reasoning survives unchecked, because the code genuinely contains the branch being described; it just never executes.
- **How to apply:** before repeating an agent's mechanism claim to Paul, demand the census or the counterfactual: how many rows actually satisfy the predicate, and does flipping the constant change the output? "This code path causes X" is not evidence until someone counts the rows that take it. Same family as `examination-lane-lessons-2026-08-14` (existence claims need repo-wide grep) and `verify-dont-infer-completion-2026-08-04`.
- **Corollary that DID work:** the audit gate built this lane was validated with one negative control (pre-fix state -> FAIL x3) plus four planted defects, each failing only its own check. That is the standard to hold agents to.

### R3. Examination-lane lessons (`examination-lane-lessons-2026-08-14`; errors the agent made or nearly made in the 2026-08-13/14 framework lane, each caught by the process)

1. **Existence claims need a repo-wide search, not the first artifact that fits.** The agent reported the "27-row registry" as unbuilt after finding only the 10-row `e2_flagship_takeup.json` in the BARR audit dir. Paul's "first double check" order caught it: the real registry (`data/lobbying/industry_ask_registry.ndjson`, exactly 27 rows) plus a full consuming engine already existed from a parallel lane. **Why:** the agent stopped at the first artifact consistent with the story, a C5 provenance failure under its own framework. **How to apply:** before asserting any artifact/capability is absent, grep the repo for its distinctive content strings (a vehicle ID, a phrase), not just its expected directory.
2. **Wrapped phrases defeat line-oriented search (hit twice in one lane).** The second wrong-count site ("three / 'Ally' areas" wrapped across a line break) survived the agent's own propagation sweep because grep saw nothing; same class as the E13 joined-literal incident the coverage guard was built for. **How to apply:** every prose-claim search runs over joined text (join intra-paragraph newlines first); a line-level null result on prose is not evidence of absence.
3. **Check what the critic could actually read before adjudicating cite kills.** Three Grok points across two rounds were rejected on cite-correctness for one shared cause: the critique contract barred the critic from the evidence (commit messages in round 1; a different reviewer pair in round 2) and it scored verbatim quotes as misquotes against the wrong source. Its own BLOCKED list declared the scope gap each time. **How to apply:** adjudication step one is scope reconstruction (what could this critic see?) and every rejection gets its reason recorded; a kill can be right about wording and wrong about provenance.
4. **Codex never commits; the coordinator must commit on the `codex/*` branch BEFORE merging.** The agent merged an uncommitted codex branch and got "Already up to date" (the branch pointer sat at base; the work was uncommitted in the worktree). Also: a killed `git worktree add` leaves an `index.lock` AND an "initializing" worktree lock (`git worktree unlock` first); the 41k-file checkout needs background + 10-minute timeout; the sandbox denies python execution, so author/execute split is standard (Codex authors, Claude runs); a revision-round reply missing its leading RECEIPT is re-demanded verbatim and logged as rework (enforced once, worked).
5. **PowerShell 5.1 traps that cost real rounds this lane:** `git commit -m @'...'@` with embedded double quotes shatters into pathspecs, so always `-F <msgfile>`; multi-line JSON as a native-command argument word-splits, so write a temp file and read it in python; `Set-Content -Encoding utf8` writes a BOM, so use `[IO.File]::WriteAllText($path, $text, (New-Object Text.UTF8Encoding($false)))`; a here-string replacement that throws mid-loop aborts the WHOLE write (match-count-verify each pair, expect exact indentation).
6. **A delta guard firing is not always a violation.** The controlled numeric-delta assert fired on "15." vs "15" (tokenizer trailing-period artifact). Right response: diagnose, normalize, re-prove; never widen the authorization or wave it through.
7. **Lesson 1 recurred within the hour of writing it.** During the worktree sweep the agent transcribed leaf names onto an assumed `Temp\claude` directory; five trees actually lived in `C:/tmp` and `Documents/Codex/`. The clean-only re-verification at the true path is what made it harmless. Writing a lesson down is not the same as applying it; mechanical guards (re-verify at point of action) are what actually hold.
8. **Redundancy is provable, so prove it before deleting unexamined dirs.** `git hash-object --stdin-paths` over a dir's files piped to `git cat-file --batch-check`: bytes already in the object database = redundant copy; unknown bytes get eyeballed (in the sweep they were all `__pycache__`/`.pyc`, `settings.local.json`, locks). This turned "delete 28 unexamined dirs on a 5-dir sample" into a proof. Same family as the input-purity byte-match recipe.

Links in the source: `hallucination-framework-lane-2026-08-13`, `codex-executor-lane-2026-07-18`, `verify-dont-infer-completion-2026-08-04`, `live-tree-branch-state-2026-07-14`.

### R4. Scout and census traps (`scout-census-traps-2026-09-13`, lessons from the 2026-09-13 review fan-out; items 5-7 from the 2026-09-15 members-section lane)

Four failure modes seen in one session (2026-09-13), each with the fix that worked:

1. **Fabricated repo map.** A Haiku scout returned a five-lane file table with invented class names (`InterviewFetcher`, `DistrictIndustrializer`) and repeated LOC values (834, 756, 1456 many times). A 60-line `ast.parse` census script (never importing repo code) gave the real map in one call. Rule: existence and size claims come from scripts, not from model summaries (extends `examination-lane-lessons-2026-08-14`).
2. **Wrong tree parsed.** The test-registration scout cited `run_tests.py` line numbers about 130 higher than three reviewers because its Read tool opened the LIVE tree's copy (730 lines, uncommitted additions) instead of the worktree's (580). Rule: every census must print the absolute path, line count and `git hash-object` of the file it parsed, and compare to `git rev-parse HEAD:<path>`.
3. **Slow census plus placeholder turns.** A per-file drift census (2-3 git calls per path against the OneDrive-backed live tree) ran 30+ minutes; the Haiku scout ended four turns with "waiting, will report" and no results; scouts also end turns with "standing by" placeholders (the `verify-dont-infer-completion-2026-08-04` shape). A batched rewrite (one `git ls-tree -r HEAD`, one `git ls-files`, one `git hash-object --stdin-paths`) finished in seconds. Rule: batch git; never poll a stalled scout, replace it.
4. **Follow-up messages declined.** A Sonnet executor completed its original 11-item brief but declined seven SendMessage follow-ups as "coordinator-styled messages that escalated scope", including read-only live-tree reads. That was correct behaviour under the instruction-source boundary. Rule: put the whole job in the initial brief; if scope grows, dispatch a fresh agent with a complete self-contained brief rather than messaging.

Also: patch files written by several lanes lacked `diff --git` headers (only `--- a/` and `+++ b/`); manifest tooling must parse both forms. And the adversarial verification pass was not optional: of 141 finding rows, 17 were refuted or partly refuted and 12 patches were defective (one crashed with a TypeError, one was a no-op, one reversed a correct filter), all of which the reviewers had marked "confirmed".

Three more from the 2026-09-15 members-section lane (gan-build run as a read-only packet loop):

5. **Fabricated NOT FOUND.** Haiku scouts reported NOT FOUND for 20 memory files that existed (a one-line `ls` disproved it), for `ranks_python.json` (two other agents read it the same hour), and for brain entries DE-001/DE-015 (the scout grepped the code repo; the brain lives at `Project Brain\brains\melange-systems-brain`). Rule: a NOT FOUND from a scout is a claim, not a fact: disprove it with one listing before it reaches a packet, and name the brain path in every brief that cites decision IDs.
6. **Nested spawning despite "no sub-agents".** Two scouts spawned their own scouts, returned "interim" text, and the real result arrived later as a separate task notification under a different id. Rule: treat an "interim/waiting" return as incomplete, harvest the nested notification, and paste it into the next agent's brief rather than re-running.
7. **Evidence-file contract + adversarial evaluator works.** Each agent wrote `evidence/<point>.md` with TREE file:line quotes; an Opus composer wrote the packet from evidence only ("NOT IN EVIDENCE" where absent); a code-only evaluator spot-checked 28 claims and caught 5 wrong ones (two fake NOT FOUNDs, three miscounted numbers) before Paul saw them. Session-limit kills (HTTP 429) are recoverable: `SendMessage` to the dead agent id after the reset resumes it with context; an agent that was not actually killed just treats the message as a reminder.

- **How to apply (for any review or census fan-out in this repo):** (a) census with scripts and print provenance, (b) batch git against the live tree, (c) brief agents completely up front, (d) always run an adversarial verifier before presenting findings to Paul, (e) disprove every scout NOT FOUND with a listing, (f) harvest nested-agent notifications instead of re-running. Related: `audio-lane-verification-lessons-2026-09-07`, `code-review-five-lanes-2026-09-13`, `members-section-consistency-lane-2026-09-15`.

### R5. A spawned task's premise may be stale (`spawned-task-premise-may-be-stale-2026-09-14`, 2026-09-14)

- **Incident (2026-09-14):** a spawned task asked for the STAFFA-8 `co_tenure_pairs_skipped_excluded_container` increment in `fec/staffer_network/employment_promotion.py::_groups_and_edges`, claiming `test_chamber_wide_container_group_emitted_without_co_tenure_edge` failed with 0. At the review branch tip `claude/melange-systems-code-review-859518` (77959ae74) the increment already existed (commit 5ca3a2288 at 00:29:56, 75 seconds after the test commit f5e42f0ea at 00:28:41) and the file's suite passed 6/6. The fresh session worktree was on main (2f11d9490), which had neither the test nor any STAFFA-8 code.
- **Residual at the tip, not applied:** comments at lines 481-484 and 707-708 plus packet `audits/code_review_20260913/patches_v2/REVISIONS.md` and `STAFFA-4.v2.patch` still say the counter "stays 0 today" and log "Ran 5 tests".
- **Why:** the review session writes spawned prompts from its live working tree and then commits the fix itself moments later, so the prompt outlives the bug. Implementing it blindly on the tip would have double-incremented the counter. The 2026-09-13 packet's lane fixes ARE committed on the review branch (9 commits ahead of main, unmerged), so "nothing applied" in `code-review-five-lanes-2026-09-13` means not on main, not "no commits exist".
- **How to apply:** for any spawned finding from the 2026-09-13 packet, first `git grep` the review branch tip for the fix and run the named test there; edit only if it really fails. A session worktree branch with no commits of its own (`git log main..HEAD` empty) can be repointed with `git checkout -B <branch> <tip>` and restored the same way; never `git stash`. Related: `verify-dont-infer-completion-2026-08-04`, `scout-census-traps-2026-09-13`, `committed-vs-live-drift-2026-09-13`.

### R6. Line numbers cited in committed source pin to HEAD (`receipt-line-pins-vs-live-tree-2026-09-18`, Paul's ruling 2026-09-18)

- **Ruling:** Paul ruled on 2026-09-18 that a `file:line` citation living inside committed source pins to COMMITTED source, not the live tree. The `repo.workbook` producer text in `fec/audit/build_system_manifest.py` cited `build_media_blend.py:479`; at HEAD that file is 467 lines with `save_workbook_atomic` at `:466`. 479 was read off the live tree's dirty working copy (480 lines, 13 lines of unlanded work). History: `:451` was right until `a0c45a709` moved it to `:466`, so the correct re-pin was 451->466, not 451->479. Landed as `a84842eb7` on `claude/amazing-lewin-409893`.
- **Why:** a receipt verified against one machine's scratch state describes that scratch state, not the repository, and it silently rots for everyone else. This is the same defect class the commit it corrected was written to fix, which is how it slipped through twice.
- **How to apply:** before editing ANY `file:line` inside `build_system_manifest.py` (or any other committed receipt), verify with `git show HEAD:<path> | wc -l` and `git show HEAD:<path> | grep -n "<call>"`. Never read the number out of the working copy. Sweep EVERY citation in the block, not just the ones you were asked about (per `dont-drop-context-anchor-memory` and the brain's DE-004, fixing a headline without sweeping the body).
- **Two session traps found the same day:** (1) the ECC GateGuard `pre:bash:gateguard-fact-force` hook refuses `git commit --amend` even after the facts are presented, three attempts: do not fight it, and do not disable the gate to push a cosmetic change through; get the message right the FIRST time. (2) A delegated `fable-baton:executor` subagent will REWRITE the `Co-Authored-By:` trailer to its own model name (Sonnet 5) instead of the session's (Opus 5): state in the delegation prompt that the trailer is verbatim and not to be second-guessed.
- Related: `verify-dont-infer-completion-2026-08-04`, `spawned-task-premise-may-be-stale-2026-09-14`, `committed-vs-live-drift-2026-09-13`.

### R7. Do not drop context: anchor claims to memory before speaking (`dont-drop-context-anchor-memory`, 2026-07-08/09)

- Paul, repeatedly and angrily (2026-07-08/09): "DON'T FUCKING FORGET THE CONTEXT" / "you keep making mistakes, reset."
- **Why:** across a long session the agent contradicted earlier-established facts. The worst instance: it graded the psychology instrument off the raw **Pink LLM trait scores** (weak, display-only) and told him "only C is validated," when the established, memory-recorded state is that the behavior-calibrated **big5_v2** instrument validates **A / C / E / O** (right-signed held-out at the lexical ceiling) with **ES the one outstanding trait** and **no audio required**. Reversing a settled result made him lose trust. The agent also flip-flopped on the A-ES "halo" (chasing a benign shared-method correlation) and on whether text can measure C (it can: Empath->diligence +.24).
- **How to apply:** before making ANY claim about what is validated / decided / measured, re-read the relevant memory (especially `moneyball-big5-campaign`, `moneyball-receptivity-layer`) and anchor to it. Always distinguish **big5_v2** (the validated behavior-calibrated instrument) from **Pink raw LLM scores** (display-only, weak, cross-loaded). Do not re-derive or re-litigate settled results under time pressure. When unsure what was established, say "let me check memory" and check; never guess and reverse a turn later. See also `fable-paragraphs-only` (the model-tiering rule in `2026-07-working-agreement-agent-orchestration-rules`).
- **Ledger anchors for recurring mis-recalled claims** (verified in git 2026-07-09; cite these receipts, correct gently, do not fold):
  - "5/5 passed / N and A passed the matrix" is FALSE. The one behavior-anchored instrument look (@34bf7e4, methods section 17) = **3/5: O/C/E diagonal-dominant; A +.183 valid-NOT-dominant; ES +.149 (0.001 under bar)**. Nothing was ever 5/5.
  - "A passed using audio" is FALSE, opposite recorded twice: audio-pilot audio-A INVALID (+.129 < null +.165, section 14); faithful-audio **A -.043 p=.69** (`big5_audio_faithful_prereg.md:62`). What DID pass via audio = **E p=.030 + ES p=.017** (faithful-audio @2c7a539; the ES leg later gender-confounded @34bf7e4). The real A pass is TEXT-side: Pink-A->cooperation partial r=+.100 p=.034 controlling ES (section 15) + v2-A +.14 held-out. Likely conflation source.
  - Legitimate open N route (pre-authorized in `psych-audit-2026-07-09` round-3: "Did NOT compute text-N × cutoff - that's a look; prereg if ever wanted"): text-N vs behavioral `reactivity_z` criterion, new prereg required. ES's OTHER routes stay closed (Vote Smart pull = user-gated).

### R8. Danish external criterion: external elite self-report data EXISTS (`danish-external-criterion-2026-07-12`, 2026-07-12)

- Source description: "CORRECTION - external elite self-report politician-personality data EXISTS (Denmark/Europe); my "no external N criterion / elites can't self-report" was US-Congress-specific and wrong as a universal claim".
- Paul (frustrated) pointed to Danish articles he had given the agent as an external criterion after it claimed twice that "no external N criterion exists / self-report is impossible for political elites." He was right; the agent was wrong on the general claim.
- **The correction (durable):** external elite politician self-report Big Five / HEXACO data EXISTS, routinely, in European parliaments. It is *US Congress specifically* that lacks it (US culture + nonresponse-is-N-correlated), not political elites universally. Concretely:
  - **Norgaard & Klemmensen (2019)**, *J. Personality* 87(2):267-275: NEO PI-R, **N=60 Danish MPs**, incl. Neuroticism. MPs higher on E/C/O than voters.
  - **Schumacher & Zettler (2019)**, *PAID* 141:173-181, "House of Cards or West Wing?": Brief HEXACO, **N=24 Danish politicians**, incl. Emotionality/Emotional-Stability. Politicians score higher on all Big Five incl. ES.
  - **Polipers systematic review** (Lechner, Aichholzer, Birkenmaier & Bluemke 2025, "Mapping the Political Personality," v0.1, GESIS) codes **~20** politician-personality studies: **16 self-report (PS-R), 4 expert-rated (EXR)**; countries US6/UK5/DE2/BE2/DK2/IL1/IT1/CA1. PDF: `~/Downloads/Lechner et al. (2025) - Polipers - v0.1.pdf`; full text dumped to scratchpad `polipers_full.txt`.
- **Why it matters:** SUPERSEDES the `psych-audit-2026-07-09` "ES routes exhausted / no gold-standard N criterion" framing as a universal statement. Re-opens external validation via **cross-national method-transfer** (apply the text method to named European politicians' speech, correlate vs their self-report).
- **Key caveat (cuts both ways):** elite self-report INFLATES emotional stability / desirable traits (social desirability; Schumacher & Zettler), so even the "gold" self-report criterion is biased for N/ES; a behavioral/text measure may be *less* biased, not more.
- **Convergence already found (agent's data):** Polipers independently derived N-facets "Pessimism & Doubt" + "Poise & Composure" (neg-emotion/volatility under stress), which MATCH the agent's affective-N facets (pessimism/anxiety/depression/volatility). The 4 facets cohere as one N domain: **Cronbach alpha .911, 1st PC = 79%, mean inter-facet r .72** (n=469). Split-half of the promoted measure **r_sb .907** (n=446 full sample, 95% CI .881-.928; a salvaged n=141 partial had read .931), so the `n-slot-reanchor-2026-07-11` measure is highly stable, not just internally consistent.
- **How to apply:** never again say "no external criterion exists" flatly; say "none for US Congress; European self-report exists and transfers at the method level." Obtainability of the Danish data for an actual correlation was being chased in workflow `wf_cf13e766` (Schumacher-Zettler OSF? named vs anonymized? Folketing speech linkage?); check that outcome before claiming a correlation is or is not runnable. Relates to `psych-audit-2026-07-09`, `dont-drop-context-anchor-memory`. Domain home for the Big Five work: Personality psychometrics (Big Five).

### R9. Keep the A-validation search open (`a-validation-open-search-2026-07-12`, Paul's STANDING directive 2026-07-12)

- Paul, 2026-07-12, angrily: "Stop this settling bullshit... You are going to look for a better validation of A, review the fucking corpus. You will look until I tell you to stop looking."
- **Why:** the agent repeatedly "settled": cited the kill-ledger, called A routes CLOSED (assent MISS, NPAT underpowered), recommended keeping the status quo, and stopped. Paul reads that as giving up. He is directing NEW, open-ended research on Agreeableness and it runs until HE ends it, not until a documented "closed" is hit.
- **How to apply:**
  - The A-route "closures" in the kill-ledger (`psych-audit-2026-07-09`, `big5_methods.md` section 18) do NOT bind this search; Paul (repo owner) explicitly reopened it. Do not reflexively re-close.
  - Actually review the corpus language (INTERVIEW/CREC/CHRG in `social_media.db`) for genuine-agreeableness markers; test candidate criteria/constructions; keep generating avenues.
  - Keep going across turns; only stop on Paul's word.
- **Factual anchors (do NOT overclaim, Law 12):** current honest A state = "criterion-valid, NOT discriminant" (`big5_methods.md:389,430`): A predicts the cooperation criterion (Pink-A partial r +.10 controlling ES; supervised +.183 perm-p .0004). The "5/5" Paul remembers = **reliability 5/5** (all traits split-half solid, A .80/.60) and **known-groups 5/5** (party signs all consistent incl. A). The **discriminant/diagonal-dominance was 3/5 = O/C/E only**; A's halo (O-A r=.865 in Blue v2; A-ES .653 in Pink) is the discriminant failure. So "we had 5/5" is TRUE for reliability + known-groups, NOT for discriminant. Never say "5/5" unqualified.
- **PROGRESS (2026-07-12, round 1 of the open search):** built a purpose-designed genuine-warmth LLM instrument (5 facets: consideration/graciousness/warmth-to-nonallies/empathy/non-contempt; openness and extraversion rated separately to partial out), scored 2 independent ways on 177 RKH/NPAT-overlap members.
  - RESULT: inter-method reliability r=**.936** (the construct IS reliably recoverable, unlike big5-A which is incoherent with communion/antag), face-valid (Al Green 74, Andy Harris 34, Barr 37, Schiff 40-contempt-to-opponents), and distinct from big5-A (r=.13).
  - BUT external convergence still weak: vs RKH-A +.087 (holistic +.12), vs NPAT-A +.11; resid-on-O vs RKH-A = **+.061** (big5-A resid-O was +.029: marginally better, still null at n=146).
  - Diagnosis: the instrument works; the CRITERION is the problem. RKH-A and NPAT-A are themselves O-halo'd (NPAT-A x NPAT-O = +.35; big5-O predicts RKH-A +.138 >= big5-A's +.135). Parallel to affective-N: a clean measure need not converge with a contaminated benchmark.
  - NEXT: find a non-O-halo'd A criterion (behavioral: reporter-cordiality, credit-to-opponents, casework-empathy counts from corpus; NOT cosponsorship).
  - Also: PINK (`big5_llm_opus`) is uncorrelated with Blue (v2) at member level on EVERY trait (O r=-.044, A +.23, C +.16, E +.03, N +.06), with 53% opposite-sign on O; the dashboard "overlap=✓agreement" framing is FALSE.
- **MAJOR REVERSAL (2026-07-12, verified 3 ways): "Pink is noise / keep Blue drop Pink" was WRONG; validity is TRAIT-DEPENDENT.** External RKH convergence (human-anchored, n~147): O Pink +.111 / Blue -.03; C Pink +.174 / Blue +.046; E Pink +.044 / Blue +.123; A +.121 / +.128 tie; ES Pink +.041 / Blue +.233. **Pink wins O and C; Blue wins E and ES; A tie.**
  - On OPENNESS specifically, THREE independent signals agree Pink > Blue: (1) blind text O-adjudication of 100 serious disagreements sided Pink 42 vs Blue 14, HIGH-confidence 12-0 Pink; (2) Pink-O converges external RKH-O +.111 vs Blue -.03; (3) blind reader also converges RKH-O +.088.
  - Face-valid: McClintock/Cotton/Crenshaw/Todd Young read high-O in text, Pink says high, Blue says LOW: Blue is wrong.
  - MECHANISM: Blue's behavior-calibration DEGRADES O and C (no good behavioral proxy) vs raw Pink LLM item-read. So do NOT globally drop either; the earlier "drop Pink keep Blue" recommendation is RETRACTED.
  - Significance caveat: only Pink-C +.174 and Blue-ES +.233 are individually significant at n~147; Pink-O +.111 is ns alone but corroborated by blind adjudication.
- **Levers to try:** `agency_communion.json` (communion ~ warmth, could decorrelate O-A by construction; section 15 lines 319-320 flagged this); a "genuine warmth vs performed courtesy" acting-vs-actuality cut analogous to affective-N/antagonism-v3; alternative behavioral A criteria beyond cosponsorship (gratitude/credit-giving, yielding, casework); RKH lifeAgree external (n=147). Supersedes the "A routes exhausted, never propose" line in `psych-audit-2026-07-09` for THIS search only, under Paul's direction.

### R10. Findings-examination framework lane (`hallucination-framework-lane-2026-08-13`, project record 2026-08-13/14; feeds Melange audits and code reviews)

The standards above were formalised in a framework lane. Paul ordered a hallucination/error-identification framework for the forecast-findings analyses, then ruled ADOPT, then had every follow-on built. All merged to main, mirror-pushed at every gate: `8cdd18003` -> `b52a2a582` -> `6e27bcb2c`. What exists now:

1. **`audits/HALLUCINATION_DETECTION_FRAMEWORK_2026-08-13.md` is ADOPTED, in force** (brain D-007). Six-pass examination (numbers / words-both-directions / independence-by-layer / strata / capability / time), seven error classes, GROUNDING RULE (every class anchored to a verbatim repo instance + pointer), honest teeth inventory (section 7 says plainly which teeth are mechanical vs procedural). Its worked corpus = the CORRECTION OF RECORD blocks in `BARR_CU_COURTSHIP_BATTERY` and `CROSS_INDUSTRY_BACKFIRE_ANALYSIS` (five blocks in BARR now, append-only, never retro-edited).
2. **Causal-claims lint** `fec/tests/docs/test_findings_causal_claims.py`, registered in `run_tests.py` (kernel = 153 suites, verified 153/0 in live tree twice). Banner-gated: scans only `audits/*.md` whose first 60 lines carry EXPLORATORY / "no causal claims" / "nothing here is causal" (currently BARR, CROSS, D9). Joined-block matching, structural exemptions, 22-fixture answer key where every exemption test bears a live trigger. **DELIBERATELY NARROW: causal verbs only.** The feasibility census measured ~88% naive false positives across the five wording families; ABSOLUTES is unautomatable (licensed and defective uses share one surface form: "All 12 archived models reproduce" vs "NO BACKFIRE SIGNAL ON ANY TEST"). Never extend the lint to other families without new evidence; that was Paul's explicit narrow-scope selection.
3. **Brain follow-through** (`melange-systems-brain`): D-007 adopt decision (reversal condition: a defect reaches Paul in a doc that RECORDS a completed six-pass exam), DE-004 headline-only-correction dead end, CONSTRAINTS "Claims" group (basis-clause rule; pooled-with-split rule), `skills/examine-a-findings-document.md` (the six passes as a cold-runnable procedure).
4. **Correction procedure now standard** (used 3x this lane): numeric-token multiset proof over the whole file vs the committed baseline: NO NUMBER CHANGED proven, or when Paul authorizes number changes, a CONTROLLED delta asserted to equal exactly the authorized token set; propagation sweep over JOINED text for every restatement (DE-004); examined-and-left-alone recorded so the sweep is auditable; escalations for anything number-changing.
5. **BARR endgame:** both escalations fixed by ruling (three-Ally -> two at both sites after C2 re-derivation; 0/15 withdrawn), then the presentation limit LIFTED (fifth block): the honest engine-derived rate is now published, **Barr 0/7 post-117, 2/13 across 117-119**.

**Load-bearing couplings discovered:**

- `data/engine/responsiveness_layers.json` is **sha256-pinned to `data/lobbying/industry_ask_registry.ndjson`** (27 rows: 7 letters + 20 bills) via `receipts.registry_sha256`. ANY registry byte-change breaks the pin and forces a producer rerun = deployment cycle. Do not touch the registry for inert fields (the CUTAX `scope.committee` no-op is recorded in BARR's fifth block).
- `fec/engine/responsiveness_layers.py` `compute_take_up`: unscored status OR any committee scope key => excluded from denominator; eligibility = Voteview congress-time service + chamber match + party match; blank chamber = bicameral; **in-group-normal vehicles stay in the denominator BY DESIGN** (peer-comparison normalization). E2's prose exclusions were a single-member absolute reading; do not "fix".
- The registry's frozen spec vintage in `audits/responsiveness_build_2026-08-11/` is never edited.
- Links in the source: `universal-lane-laws-2026-08-09` (see `2026-07-working-agreement-agent-orchestration-rules`), `examination-lane-lessons-2026-08-14`, `verify-dont-infer-completion-2026-08-04`.
