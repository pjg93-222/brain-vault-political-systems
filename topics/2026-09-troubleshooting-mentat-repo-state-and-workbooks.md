---
type: topic
title: "Mentat repo state and workbooks"
aliases: ["Mentat repo state and workbooks"]
category: "troubleshooting"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[mentat-console]]"
  - "[[mentat-fec-pipeline]]"
objective: "Record the state of the Mentat code tree and its workbooks as of 2026-10-03: the 2026-09-18/19 uncommitted-tree reconcile (HEAD had been broken in 12 places), the 2026-10-02/03 push to a GitHub migration branch (PR still unopened), the 2026-09-14/15 Tableau-shaped companion Data workbook lane, and the 2026-09-18 console startup hang (unbounded subprocess timeout)."
created_at: 2026-09-14
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-github-migration-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-github-migration-2026-10-02.md", sha256: "6f79da7a4bd449fca5c98a6db61acb2bf2750b62c21c903f17cd8ae2d2d12774"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-uncommitted-reconcile-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-uncommitted-reconcile-2026-09-18.md", sha256: "a35561613ba5e4bd3ee27565ed8e97717aa311f7d0c0d9ac708dd549b1a3cf3b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-console-startup-hang-2026-09-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-console-startup-hang-2026-09-18.md", sha256: "64f937877616a1ec94000d791831999bba8f53fab41a80e28b8a26a2dce04a9d"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-tidy-workbook-lane-2026-09-14.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-tidy-workbook-lane-2026-09-14.md", sha256: "677e56dbeec24480b98de0f8d6e355e198c46cbc0c12604b717e6c5ded4b5a5f"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/troubleshooting"]
---

# Mentat repo state and workbooks

> Troubleshooting record for the [[mentat]] code tree (`C:\Users\pgoff\Mentat`, branch `codex/mentat-crypto`) and its workbooks: the reconcile of 273 dirty entries into 36 commits (HEAD had been broken in 12 places the working tree masked), the GitHub migration branch pushed 2026-10-02/03 with the PR still unopened, the Tableau-shaped companion Data workbook lane, and the [[mentat-console]] startup hang caused by an unbounded subprocess timeout. Pipeline-side items are in [[mentat-fec-pipeline]].

## Context

- Code lives in `C:\Users\pgoff\Mentat` (checkout; `mentat\` is the project, `PROJECT` in `server.py` is `<checkout>/mentat`, NOT the checkout root), a sibling git worktree of the Melange repo on branch `codex/mentat-crypto`. Work was done mostly from Melange worktree sessions, whose Edit/Write tools refuse `C:\Users\pgoff\Mentat` (hence bytes-level Python scripts, exact-once replacement).
- Four lanes feed this topic, in date order: (1) tidy workbook lane 2026-09-14/15 (worktree `mentat-excel-tableau-format-8ac097`); (2) reconcile 2026-09-18/19 (worktree `mentat-uncommitted-reconcile-4089f1`); (3) console startup hang 2026-09-18; (4) GitHub migration 2026-10-02/03.
- Change control: apply = Paul's (`ask-before-substantive-changes`); commit authority for the reconcile lane was explicitly given by Paul ("Keep going, finish all of this / all of it" three times); that authority was for that lane only. Brain decisions referenced: DE-012, DE-022, DE-029, DE-032, DE-033, DE-034, DE-035, D-040, D-049, D-050, D-061.
- Related memories (not vault entities): `mentat-github-migration-2026-10-02`, `mentat-uncommitted-reconcile-2026-09-18`, `mentat-console-startup-hang-2026-09-18`, `mentat-tidy-workbook-lane-2026-09-14`, `repo-mirror-2026-08-11`, `live-tree-eol-census-2026-09-19`, `committed-vs-live-drift-2026-09-13`, `verify-dont-infer-completion-2026-08-04`, `xref-contradictions-not-ambiguity-2026-09-17`, `mentat-ui-cleanup-lane-2026-09-17`, `review-in-fable-directive-2026-09-16`, `scout-census-traps-2026-09-13`, `mentat-collector-slowdown-lane-2026-09-17`, `mentat-failings-lane-s6-2026-09-17`, `mentat-chart-studio-2026-09`, `mentat-system-debug-lane-2026-09-13`, `mentat-pipeline-2026-07-18`, `ask-before-substantive-changes`.

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| [[mentat-fec-pipeline]] | Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat |

## Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## History

| Date | Event |
|---|---|
| 2026-09-14 | Paul (`/ecc:design-system`): the published `Credit Union Industry Spending Overview.xlsx` is hard for the Tableau-esque Chart Studio because it is wide; redesign the workbook generator for Tableau-shaped output. Rulings via AskUserQuestion: companion `<Industry> Industry Spending Data.xlsx` per industry; scope = mock + proposal + draft patches. |
| 2026-09-14/15 | Mock workbook built from the real CU cache by the real draft writer (22 sheets, 469,226 rows, 97/97 checks); 12+3 patches drafted. Opus subagents killed three times by the ACCOUNT session limit; resumed via SendMessage after each reset. |
| 2026-09-15 | Paul: "Apply the patches and run the Crypto dry run", then "Scratch-copy run without a ruling", "Include-list of categorical columns": all 15 patches APPLIED uncommitted; scratch dry run exit 0, 90/90 checks. Evening: "Commit the remaining 14 files" -> commit `bd5dc8ea18a1641f3e08116f0d666fa98ba8750f` (10 clean files, +4,115/-0); P6a already inside Paul's Ride-1 commit `a4b3c8e2e` (13:40). Cleanup: 13 lane backups + 516 MB dry-run scratch deleted. |
| 2026-09-18 | Paul: "there are a bunch of uncommitted files in the Mentat system, go over all of them reconcile, and commit that shit, also if there is unfinished work, I know there is, finish it." Reconcile first pass: 28 commits `1d4524048`..`755680241`. Same day: console startup hang diagnosed and fixed (`0ad366e01`, `aa8a3f884`). |
| 2026-09-19 | Second pass (8 commits `193337707`..`a6c3129d8`), then close-out ("Finish the still-open items and push to the mirror"): final HEAD `59a87a70b`, 38 commits; mirror sha-identical for `codex/mentat-crypto` and `main`. |
| 2026-10-02/03 | Live Mentat tree pushed to github.com/pjg93-222/Melange (private) on `claude/mentat-migration-onto-main`, tip `28c27a47` (19 plumbing-built commits on origin main `ce213058`); PR to main still unopened ("we can do it later"). |

## Decisions

- **Companion workbook, not a rewrite (Paul, 2026-09-14):** a companion `<Industry> Industry Spending Data.xlsx` per industry; the Overview + Node/COM chain stays untouched; lane scope = mock + proposal + draft patches; apply = Paul's.
- **Apply + dry run (Paul, 2026-09-15):** apply the 15 patches; run the Crypto dry run as a scratch-copy run without waiting for a ruling; W9 multi-value check becomes an INCLUDE-LIST of 33 categorical headers (`MULTIVALUE_CHECKED_HEADERS`).
- **Commit scope (Paul, 2026-09-15 evening):** "Commit the remaining 14 files"; where a clean ours-only split was impossible for four files, "commit the 10 clean files now"; the four deferred files (P2, P5, P6c, P7b) stay applied but uncommitted until the other lane commits. CLEANUP ruling: the 13 lane backups and the dry-run scratch folder deleted; the 117 other lanes' `.bak` files untouched.
- **Reconcile authority (Paul, 2026-09-18):** reconcile and commit everything, finish unfinished work ("Keep going, finish all of this / all of it" x3, including after the agent said it was writing the accounting fix up rather than changing it); lane-only authority.
- **Filing-version identity rule D-049 (2026-09-19):** `count_latest` by default per D-040's principle (index VERSION 4 / PAS2 parser "5"); the one judgement call worth $182K flips with one constant per side (`AMBIGUOUS_VERSION_POLICY`, `FEC_PAS2_AMBIGUOUS_VERSION_POLICY`). Brain D-049 states Paul has not read the ruling record and that it is reversed, not defended, if he rules otherwise.
- **"Remove the N charts strip, keep the Board" (Paul ruling):** the older "N charts" split strip RETIRED in `2b1a62dea` (brain D-061); the agent had asked instead of removing it.
- **GitHub migration (2026-10-02):** push a Mentat-only branch on origin's main `ce213058` (never the worktree's own branch); open the PR and any history rewrite are deferred / Paul's decisions.
- **Console fix (2026-09-18):** serve `'unknown'` while the git sha resolves in the background (safe: `app.js:436` falls back to `code_sha256`; D-029's restart gate compares `code_sha256`, never the git sha).
- ~~Mock/proposal-only lane scope (apply = Paul's)~~ (2026-09-14) - superseded 2026-09-15 by Paul's "Apply the patches and run the Crypto dry run"; kept because it explains why the packet and `.bak` files existed.
- ~~Rollback of the four deferred uncommitted files via `.bak` copies (`<file>.bak-20260914-tidy`, `<file>.bak-20260915-fix1`)~~ (2026-09-15) - the backups were deleted in the 2026-09-15 evening cleanup; rollback is now `git apply -R <P2|P5|P6c|P7b>` from the packet (`audits\mentat_tidy_workbook_20260914\patches`).
- ~~`git update-index --force-remove` as an index rollback~~ (considered 2026-09-18) - WRONG: it marks the path deleted vs HEAD; correct = capture HEAD's blob+mode first, roll back with `git update-index --cacheinfo <mode>,<HEAD sha>,<path>`.

## Next Steps

- [ ] Open the PR for `claude/mentat-migration-onto-main` (base `claude/melange-math-eval-skill-18e907`). `gh` is NOT installed and Claude in Chrome was not connected, so Paul must open it or connect Chrome. Offer this FIRST next session; regenerate the body (`pr-body.md`, drafted in the session scratchpad, may be gone) from the commit messages.
- [ ] Decide whether to delete or keep the partial ref `claude/mentat-github-migration-b06195` on origin (`6f76c3415`, 548 commits).
- [ ] Publishing the full local history needs `filter-repo` or LFS (origin main shares NO history with the local repo; 28 blobs over 100 MB under `audits/legfix5`): a history rewrite is Paul's decision.
- [ ] Paul rebuilds workbooks himself (the first rebuild reparses PAS2 ~3 min and is the first since 2026-09-10 with real Conditional estimates).
- [ ] Console UI does not expose the two xref switches; console serves the new client at once but drops `board` on save until the launcher restarts `server.py`.
- [ ] Tidy proposal section 7 open items for Paul: cache-hit rerun policy; 6th arg vs env var; Data book in the picker; `funding_cohorts` +2 fields; `recipient_locations` grain; `Transfer Paths` cap; console follow-ups (% of total, `keys?` regex, verified source on the Data book); bridge flag punctuation.
- [ ] Deferred tidy patches still applied but uncommitted: P2 exporter hook, P5 orchestrator step, P6c reader split-name rule, P7b its test; commit after the other lane commits (HEAD is inert without P5, so nothing half-runs).
- [x] Receipt-evidence gate (`fec_assert_receipt_evidence`, `collect.R:136`): on 2026-09-15 it refused ANY unresolved row (Crypto 80, Credit Union 4) pending Paul's ruling to extend `non_giving_exact_descriptions` / `non_giving_exact_pattern`; by the 2026-09-19 reconcile it refuses NOTHING at HEAD (`7d364883e`), so the tidy orchestrator run is unblocked (see the dry-run section).
- [ ] `test_industry_routes.py:445` was an unconditional skipTest that could never run (pre-existing, flagged); fixed in `c2822afd6` (runs read-only against the smallest real workbook, skips in a clean checkout).

## GitHub migration (2026-10-02/03; source `mentat-github-migration-2026-10-02`, modified 2026-10-03)

- On 2026-10-02/03 the live Mentat tree (`C:\Users\pgoff\Mentat\mentat`, plus `.claude/launch.mentat.json` and a vendored snapshot of `~/.claude/plugins` at `.claude/vendored-plugins`) was pushed to github.com/pjg93-222/Melange (private) on branch `claude/mentat-migration-onto-main`, tip `28c27a47`. It is 19 plumbing-built commits on origin's main `ce213058`. `mentat/state` is included. Files over 50 MB and `.cache` stay local, listed in `mentat/EXCLUDED_FROM_GIT.md`. Verification passed (file lists identical, blob spot-checks match, remote equals tip).
- **PENDING, Paul said "we can do it later":**
  - Open the PR (base `claude/melange-math-eval-skill-18e907`). `gh` is NOT installed and Claude in Chrome was not connected, so Paul must open it or connect Chrome. The body was drafted in the session scratchpad as `pr-body.md`, which may be gone; regenerate it from the commit messages if needed.
  - Delete or keep the partial ref `claude/mentat-github-migration-b06195` on origin (`6f76c3415`, 548 commits).
  - Publishing full local history: origin main shares NO history with the local repo, and the local history has 28 blobs over 100 MB under `audits/legfix5`. Publishing it would need `filter-repo` or LFS, and a history rewrite is Paul's decision.
- **Why:** pushes of the full history 500'd (3 GB single merge `af1160dd8`). The Mentat-only branch on `ce213058` avoided both the size and the unrelated-history problems.
- **How to apply:** next session, offer to open the PR first. Never push from the worktree's own branch (it carries the oversized history). Pack files are read-only on Windows, so Remove-Item needs `-Force`. Related: `repo-mirror-2026-08-11`, `live-tree-eol-census-2026-09-19`.

## Uncommitted-tree reconcile (2026-09-18/19; source `mentat-uncommitted-reconcile-2026-09-18`, modified 2026-09-19)

Summary: Mentat checkout reconciled 2026-09-18/19: 273 dirty entries -> clean in 36 commits (`1d4524048`..`a6c3129d8` on `codex/mentat-crypto`); HEAD had been broken in 12 places the working tree masked; second pass on Paul's "finish all of it": the transfer index had NEVER been built at v3 (Conditional estimates = 0.00 for nine days), filing-version identity rule D-049 applied, Chart Studio Board built, xref offline fallback, 14 input registers versioned; bare clean export 150/150.

Paul (2026-09-18): "there are a bunch of uncommitted files in the Mentat system, go over all of them reconcile, and commit that shit, also if there is unfinished work, I know there is, finish it." After the agent listed six open items as his, he answered "Keep going, finish all of this / all of it" THREE times (including after the agent said it was writing the accounting fix up rather than changing it), so the agent finished them. That authority was for this lane only; `ask-before-substantive-changes` stands elsewhere. Worktree `mentat-uncommitted-reconcile-4089f1`; code in `C:\Users\pgoff\Mentat` on `codex/mentat-crypto`, base `39e5e7dd6`, final HEAD `a6c3129d8` (later `59a87a70b`), `git status` empty.

**First pass (28 commits `1d4524048`..`755680241`):**

- 37 modified + ~60 untracked source/test files, 3 docs, packets, 197 `outputs/` notes. Nothing deleted: 167 dated `*.bak-*`, `.tmp/`, `reports/*`, `mentat/state/`, bulk extracts, `node_modules` are IGNORED (a root `git add` would have staged 37,918 files).
- The working tree was what ran, and HEAD was broken without it in 12 places: exporter sourcing untracked `R/state_destinations.R`; 4 launchers importing untracked `report_directory.psm1`; `crypto_workbook_builder.mjs` importing untracked `read_report_payload.mjs`; `/api/comparison` 500 since `97eaa7581`; nine JS modules reading an `accounting` payload only uncommitted `report_insights.py` produced (every read `|| {}`-guarded so refusals silently never fired); and others (the source lists these as "..."). Cause: whole-file / hunk-exact commits took sources and left tests + siblings behind.
- **Why / How to apply:** a green suite in a dirty tree proves nothing about HEAD. Prove with `git -c core.autocrlf=false -c core.eol=lf archive <sha> mentat audits/.../contracts | tar -x` (plain `git archive` emits CRLF for LF blobs here; hash every file against `git cat-file blob`), run every suite there, classify EXPORT-ONLY / BOTH / FLAKE. Progression of the bare export: 90/147 -> 137/147 (force-tracking the 7 KB `fec_receipt_rules.json` alone) -> **150/150** at `a6c3129d8` with nothing supplied. Six visible skips remain (no FEC bulk folders / no `.cache`; plus `test_industry_routes.py:445`, an unconditional skipTest that can never run: pre-existing, flagged).

**Second pass (8 commits `193337707`..`a6c3129d8`):**

- **Filing versions.** Measuring the 2026-09-10 rule found NO v3 transfer index had ever been built: R refuses any index but the current version, nothing rebuilds a stale one, `refresh_fec_sources.py` has no production caller, so every report build since 2026-09-10 published Conditional Non-opposition/Opposition/Estimate as 0.00 behind a `warn` (brain DE-034).
  - Then the rule itself: `committee|report_type|transaction_id` is NOT an identity (filers reuse line labels such as `SE.5`, `SB22.n`), so unrelated transactions collided and were all withheld, and one row blacklisted its committee: $152.5M clean edges blocked / 119 committees, $52.6M unresolved, $7.63M out of counted PAS2 (DE-033).
  - Identity rule built as a scratch patch, measured, reviewed inline (the agent caught that the leftover "ambiguous" class was still reused labels a year apart, so candidate versions must agree on amount OR date), APPLIED `12a880dc9` = index VERSION 4 / PAS2 parser "5", default `count_latest` per D-040's principle; blacklist -> $0, unresolved -> $325,734, $7.62M PAS2 returns, zero double counts on six ledgers + 1.62M PAS2 keys; rebuilt index lands on the 2026-09-08 v2 counts almost exactly.
  - The one judgement call is worth $182K and flips with one constant per side (`AMBIGUOUS_VERSION_POLICY`, `FEC_PAS2_AMBIGUOUS_VERSION_POLICY`). Brain D-049 says plainly Paul has not read the ruling record and that it is reversed, not defended, if he rules otherwise. Packet `audits/mentat_filing_versions_20260919`.
  - Agent's evidence-based correction to the spec that the agent accepted: rows repeated INSIDE one filing are 826/827 byte-identical re-loads (one $1.48M transfer five times), so count once.
- **Board** `3eeb99e00`: Canvas mode 1|2|4 tiles, contract `studio_api v2` (`board` written only for 2/4 tiles, v1 views byte-identical). Three INDEPENDENT live verification passes against a real console found six defects no stubbed suite could see: pager redrew the hidden canvas under a wrong label; map-in-tile compared the wrong revision counter; Undo discarded the board; Cancel left tile requests flying; stale cross-source tile cache; refresh blanked tiles while Cancel claimed otherwise. Lesson: a builder's green suites + stub fixtures (`has_more:false`) hide exactly the state bugs a render-state refactor creates; always buy the adversarial live pass. Coexists with the older "N charts" split strip (flagged, not removed). Console serves the new client at once but drops `board` on save until the launcher restarts `server.py`.
- **Xref plumbing** `f8908029a` (D-050): switches reach every launcher + worker spec; online failure -> one offline retry -> `cross_reference_mode=offline_fallback`. The agent's review caught the first version returning the mode from a PowerShell function that also ran python, so the receipt field became an array and the lines left the build log; fix = `[ref]`, proven on real redirected child processes (DE-035). The everyday rate limit was never fatal; what escaped were key-store, budget-DB-lock and cache-read errors.
- Other commits: `193337707` 14 hand-curated `mentat/inputs` registers versioned after a writer census (no code rewrites them; no secrets); `236a42058` actionable "FEC bulk sources not installed" error + hermetic console tests; `a539d1ff1` `refresh_fec_sources.py --filing-header-directory`; `1533eef7f` three suites off the real report folder; the receipt-evidence gate refuses NOTHING at HEAD (`7d364883e`) so the tidy orchestrator run is unblocked; tidy proposal section 7 stands on as-built defaults.

**Close-out (Paul: "Finish the still-open items and push to the mirror"), final HEAD `59a87a70b`, 38 commits:**

- `c2822afd6`: last two suites on a temp report root + the never-running acceptance test (`test_industry_routes.py`) now runs read-only against the smallest real workbook (11-20 s here, skips in a clean checkout).
- `59a87a70b`: replaced index records (info files only; the 1.1 GB edge files are regenerable) under `mentat/.cache/transfer-index-backups-20260919`.
- Mirror verified sha-identical for `codex/mentat-crypto` and `main` (a peer session had just added a post-commit hook that pushes to the mirror, so the agent's push was already up to date).
- **Still open:** Paul rebuilds workbooks himself (first rebuild reparses PAS2 ~3 min and is the first since 2026-09-10 with real Conditional estimates); console UI does not expose the two xref switches; the older "N charts" split strip: the agent asked instead of removing it, Paul ruled "Remove the N charts strip, keep the Board" -> RETIRED `2b1a62dea` (brain D-061; `chart-comparison.js` deleted, `studioPane` = retired/ignored/preserved key, `url_scope` v4, CSP back to `frame-ancestors 'none'`, independent live pass clean, chart sits 60-102 px higher); `mentat/state/accepted-report-sources` + `cross-reference` are durable state, not cache.

**Process lessons:**

- Edit/Write refuse `C:\Users\pgoff\Mentat` from a Melange worktree session -> bytes-level Python scripts, exact-once replacement.
- One commit-driver script (NUL pathspec, `git commit -F`, ASCII messages, per-group add+commit) landed 36 commits on a shared index with no sweep-in; secret scan negative-controlled with a planted key.
- ripgrep and `git status` honour `.gitignore` (an agent read an ignore rule as deletion, DE-032).
- Subagent background jobs kept running after the agent's turn ended this time; a main-session bounded waiter (`until` loop on a marker file, then finalize) is the reliable way to collect them.
- GateGuard wants four facts on first touch of every new file, scratch files included, and re-arms per session turn.
- A Haiku scout misread a stale ownership table; Opus architects with disjoint file lists + red-first + negative controls were reliable, and resuming the SAME agent via SendMessage for review fixes kept context and cost down.
- Related: `committed-vs-live-drift-2026-09-13`, `verify-dont-infer-completion-2026-08-04`, `xref-contradictions-not-ambiguity-2026-09-17`, `mentat-ui-cleanup-lane-2026-09-17`, `mentat-tidy-workbook-lane-2026-09-14`, `review-in-fable-directive-2026-09-16`, `scout-census-traps-2026-09-13`.

## Console startup hang (2026-09-18; source `mentat-console-startup-hang-2026-09-18`, COMMITTED `0ad366e01` + `aa8a3f884`; the [[mentat-console]])

- **Cause.** The Mentat console hung at startup because `/api/session?light=1` never answered: `build_status()` -> `git_sha_cached()` (`@lru_cache`) -> `git_sha()` ran `subprocess.run(['git','rev-parse','--short','HEAD'], capture_output=True, timeout=10)` on the HTTP request thread, in a linked worktree whose gitdir is under OneDrive.
- **Two independent defects, both measured 2026-09-18 with a negative control:**
  - `subprocess.run(capture_output=True, timeout=N)` is NOT a bounded call. On timeout it re-enters `communicate()` to drain and blocks forever joining pipe-reader threads of a child that will not die. Measured **10.11 s for a 1 s timeout** vs 1.03 s for `Popen` + stdout to a real file. Unbounded against a `git.exe` wedged on OneDrive placeholder I/O.
  - `@lru_cache` does NOT serialise concurrent callers: **8 lookups for 8 callers**, so one page load spawned two git children. It is never a single-flight guard.
- **Fix (3 parts, `mentat/app/server.py`, COMMITTED `0ad366e01`):** pure-Python `git_sha_from_gitdir()` (walks ancestors for `.git`, follows the `gitdir:` pointer, HEAD/commondir/loose-ref/packed-refs, 0.0000 s vs 0.42 s for git); `git_sha()` kept as fallback but `Popen` + `tempfile.TemporaryFile` + `wait(timeout)` + `kill()`, never `communicate()`; `git_sha_cached()` = non-blocking single-flight daemon-thread resolver returning `'unknown'` until resolved. Request path measured **0.016 s with the lookup blocked 30 s**. Tests `mentat/tests/test_console_build_stamp.py` 16/16, `test_collection_console.py` 37/37, `test_contribution_http.py` 22/22.
- **`PROJECT` in `server.py` is `<checkout>/mentat`, NOT the checkout root** (`parents[1]`). `PROJECT/'.git'` does not exist; the old subprocess only worked because git searches upward from cwd. Any direct reader of git metadata must walk ancestors or it is dead code. The agent's first spec got this wrong and the architect caught it.
- Serving `'unknown'` is safe: `app.js:436` already falls back to `code_sha256`, and D-029's restart gate compares `on_disk_code_sha256_now` vs `code_sha256`, never the git sha.
- **S6 broke three browser suites, far past "stale values": FIXED and COMMITTED `aa8a3f884`.** `487589584` **created** `mentat/app/evidence.js` and moved the evidence pane out of `app.js`; **14 element ids** the console smoke test drove no longer exist in `index.html`. So the failures were propositions about code that had left the file, not stale strings. Rule applied: **per-assertion census, never aggregate**: each deleted assertion is (a) asserted elsewhere, (b) behaviour S6 removed, or (c) still shipped and asserted nowhere -> **re-home it, never drop it**. 12 landed in (c), including the XSS one (`<img src=x onerror=alert(1)>`): `render()` writes the drawer via `innerHTML`, so `escapeHtml` is the only guard. Re-homes go into `test_evidence_panes_browser.cjs` as **additions only** (+126/-0) so its 28 existing steps stay byte-identical; every re-homed figure was measured against a live console, not ported on faith.
- `test_app_lazy_startup_browser.cjs` test 1 was narrowed, not retargeted: its claims were **false**, not stale. `start()` is bound to `mentat:view` with no view check and `app.js` dispatches on every view change, so the first navigation to ANY view fetches catalog + evidence together, and a source change requests `/api/evidence?id=<id>`, not the `/api/evidence` the test counted. Also fixed a real race: the 3 s `setInterval(poll)` at `app.js:406` refetches the mocked `/api/run?*` and can land after `render(stoppedRun)`, putting `'ready'` back.
- **`git update-index --force-remove` is the WRONG index rollback** (it marks the path deleted vs HEAD). Correct: capture HEAD's blob+mode first, roll back with `git update-index --cacheinfo <mode>,<HEAD sha>,<path>`. Also: `... | Select-Object -First 1` on a native command poisons `$LASTEXITCODE` (terminates the pipeline), which aborted a staging script mid-flight.
- Related: `mentat-collector-slowdown-lane-2026-09-17` (its `DIAGNOSIS.md` holds the original thread dump), `committed-vs-live-drift-2026-09-13`, `mentat-failings-lane-s6-2026-09-17`.

## Tableau-shaped companion Data workbook lane (2026-09-14/15; source `mentat-tidy-workbook-lane-2026-09-14`, modified 2026-09-15; the [[mentat-fec-pipeline]] workbook generator)

Summary: Mentat Tableau-shaped companion Data workbook lane: Paul chose companion file + mock/proposal/patches scope; mock BUILT from the real CU cache by the real draft writer (22 sheets, 469k rows, 97/97 checks incl. SQL vs source DB), 12+3 patches drafted UNAPPLIED at the time (`git apply --check` clean, R 51/51, Py 58); openpyxl `write_only` needs `<dimension>` or console opens take 418 s; Opus subagents die on the account session limit (resume via SendMessage after reset).

Paul (2026-09-14, `/ecc:design-system`): the published `Credit Union Industry Spending Overview.xlsx` is hard for the Tableau-esque Chart Studio because it is wide; redesign the Mentat workbook generator for Tableau-shaped output "while still preserving individual PAC's, giving amounts, and all the wondrous aspects captured in scraped FEC data"; deliver a mock workbook and the proposed changes. Worktree `mentat-excel-tableau-format-8ac097`; all outputs in that session's scratchpad `tidy\` (proposal, `STAGING_CONTRACT.md`, laneA mock + receipt, laneB patches + `APPLY_ORDER` + receipt, verifyA/verifyB). NOTHING applied in `C:\Users\pgoff\Mentat` at that point; nothing written into `Mentat Complete Files` (the console globs it, so a mock there would become a bogus industry).

**Rulings (Paul, AskUserQuestion 2026-09-14):** companion `<Industry> Industry Spending Data.xlsx` per industry (Overview + Node/COM chain untouched); lane scope = mock + proposal + draft patches (apply = Paul's, per `ask-before-substantive-changes`).

**Diagnosis (measured):**

- Overview = 3 merged banner rows + spacer, header row 5 (6 on Master Overview, 4 on cycle sheets); Master Overview 83 cols (88 in the Sept builder) = 14 five-column channel/tier blocks, THREE cycle tables stacked with Total/Average rows; tiers pivoted in Company List K-N and Recipient List U-X; `Section`-polymorphic Summary/View sheets; ISO-text dates, `0` sentinels, `;` multi-values; ~347k structured-ref formulas (cached values only).
- Reader hard-codes shape (`report_insights.py:244-281` View/Scope/Section drop, `graph_data.py:70` header 5). Same lint: mock 0 findings, Overview 89.

**Design:** static values, header row 1, one ListObject per sheet, tall (cycle/tier/category/party as rows), one measure per column, real dates, real booleans, IDs as text (`sub_id` 19 digits), no `%`/rank columns, bridge sheets instead of `;` cells, `About` sheet carrying the literal `Source DB SHA-256: <hex>` (what `contribution_data._workbook_source` scans), `Data Quality` sheet with build-time checks whose expectations come from OTHER sources (SQL over `mentat.db`, payload expected totals, Overview finalizer `cycle_totals`) per DE-012, per-cycle split above `MENTAT_DATA_SPLIT_ROWS` (=console cap 50,000; names `<Sheet> <cycle>`, never a bare cycle label). Grain pin: `Contributions` = accepted rows in supported cycles (CU 28,960 / Banking 602,125), incl. excluded-from-analysis rows with flags.

**Architecture:** R exporter writes a staging SQLite (`R/tidy_stage.R`, 6th positional arg) between `export_phase("payload_assembled")` and `write_payload_json` -> `enrich_downstream.py --staging` adds the 7 Python tables -> new `tools/build_tidy_workbook.py` (openpyxl write_only) writes the book after `sourceGuard check`, published before `sourceGuard accept`. Header vocabulary chosen for the reader's regexes (`Amount`/`Analysis Amount`, `Giving`, `Gift Count`, `Distinct Contributors` = non-summable via `distinct`, `Contributor ZIP`, `Committee Type` vs `... Code`).

**Built + verified:**

- Mock from the REAL CU cache (`.cache/industry-report/credit_union/industry_data-f9e956354525acb0.json`, 225 MB, streamed; source DB `.cache/repair-20260908-databases/credit_union.db`): 22 sheets, 469,226 rows, 33.3 MB, sha256 `f7349527...`, 97/97 writer checks (W7 = 30 cycle x company rows recomputed by SQL from the DB, to the cent); negative control (+$1 on one receipt -> exit 2, nothing written, 6 checks fire, W7 correctly stays green); reader proof with the console's own `worksheet_data` (header 1, types, summability, zero auto-filtered rows).
- Lane B: 12 patches (+2528/-7) all `git apply --check` clean individually and together against the dirty live tree, R test 51 checks x2 identical, Python 58 OK (51 pre-existing still pass; 7 new fail unpatched), PS parse 0 errors, guard test negative-controlled; verifier 10/10. Addendum in flight at write time: D2 key fix in P1, P6c reader prefix match, P8/P8b packaging the writer.

**Contract amendments made by the agent:** `downstream_activity` key + `candidate` (92 colliding groups on real data: payee name variants under one `candidate_id`); `Ownership Status` etc. are prose, exempt from the `;` rule; every write-only sheet part must carry `<dimension>`.

**Findings worth keeping:**

1. openpyxl `write_only=True` emits NO `<dimension>`; the console's read-only `load_workbook` then iterparses the whole sheetData on EVERY request (418 s on the 33 MB mock; 0.03 s after pinning). Any future write-only producer must pin it.
2. `data.table(key = ...)` silently swallows a column named `key` (reserved arg); build with `as.data.table(list(...))`.
3. The finalizer receipt (`cycle_totals`) is STDOUT JSON captured into `$formulaReceiptObject`, persisted only inside `workbook_manifest_all_cycles.json` (`formula_receipt.cycle_totals`); `finalizer_data.json` holds the R-side expectation, NOT the Excel-computed totals.
4. `report_source_guard.py` lives in `tools/`, not `app/`.
5. `Transfer Paths` exceeds the console cap even per cycle (68k/124k/63k): Tableau-only unless capped.
6. Per-cycle split names defeat `report_insights.py:268-269` exact-name non-summable list (P6c).
7. The Sept-8 CU cache carries only 34 of 56 raw_export columns (pre-widening projection): 19 mock columns blank, production path fills them.

**Process lessons:** the shared `STAGING_CONTRACT.md` with EXAMPLE ROWS worked: two architects built R and Python halves independently and the verifier's contract read was 8/8 (the 2026-09-13 string-vs-dict trap did not recur). Opus subagents were killed twice by the ACCOUNT session limit ("You've hit your session limit - resets 9:50pm / 2:50am"); `PROGRESS.md`-after-every-step discipline preserved all work, and `SendMessage` to the dead agent after the reset resumed it with context intact. GateGuard fact-forcing hook fires on the first Bash and on each first-touch Write/Edit: state the facts in the reply text and retry.

**APPLIED + DRY-RUN 2026-09-15 (Paul: "Apply the patches and run the Crypto dry run", later "Scratch-copy run without a ruling", "Include-list of categorical columns"):**

- All 15 patches APPLIED to `C:\Users\pgoff\Mentat` (backups `<file>.bak-20260914-tidy`; two test targets were untracked so `??`; `app/server.py` is SHARED with another live lane's `'chip'` edit: roll back that file with `git apply -R P6a`, never the `.bak`), UNCOMMITTED (Paul's commit). Tests in the tree: R 56/0, Python 70 OK (73 after the fix), PS guard PASS.
- The orchestrator dry run could NOT run: the uncommitted receipt-evidence gate (`fec_assert_receipt_evidence`, `collect.R:136`, ruleset `inputs\fec_receipt_rules.json`) refuses ANY unresolved row. On the hydrated `.cache\receipt-metadata-repair-20260910\<industry>\mentat.db` (the real input set; row counts match the accepted pointers exactly) Crypto = 80 rows, Credit Union = 4 (two "DUPLICATE TRANSACTION SENT IN ERROR" returns, one "VOTER FILE PURCHASE AT FAIR MARKET VALUE", one $2.08 F3/15 row with no description). Paul's ruling extends `non_giving_exact_descriptions` / `non_giving_exact_pattern`.
- Also: the production tree the accepted baselines were built from is gone (`report_source_guard prepare` may refuse); `-OutputDirectory <scratch>` THROWS (conflicts with the authoritative dir): the isolation lever is `$env:MENTAT_REPORT_DIRECTORY`; `sourceGuard accept` ADVANCES the accepted-source pointer even for a scratch run (back up + restore).
- **TRAP:** `MENTAT_INDUSTRY` is a GLOBAL R VARIABLE defaulting to "Crypto" (`collect.R:1`, `fec_api.R:1`, `report.R:1`), and the exporter takes the industry as its 5th POSITIONAL arg: `Sys.setenv()` does nothing, and a preflight that only sets the env var silently queries Crypto (vacuous zero).
- **Scratch run:** hydrated CU DB copied, the 4 rows deleted in the COPY only ($3,012.57; the resulting book is NOT a valid artifact), gate 0 unresolved; exporter 269 s exit 0 with 9/9 guards incl. `[PASS] tidy_reconciliation` on 67,165 rows (closes the never-run D2 key question); enrich 3.9 s; the Overview build is impossible by hand (`@oai/artifact-tool` unresolvable outside the orchestrator) so W6 skips.
- The writer first REFUSED (exit 2) on two W9 false positives (Receipt Type "JFC TRANSFER ...; 2021 AGGREGATE", committee name "MADISON PAC; THE"). Paul ruled W9 into an INCLUDE-LIST of 33 categorical headers (`MULTIVALUE_CHECKED_HEADERS`; fix in tree with `.bak-20260915-fix1`, lint mirrored, tests 13 OK, packet P8/P8b regenerated). Re-run exit 0 in 150 s: 17 sheets, 84,588 rows, 90/90 checks (1 informational skip), W7 30/30 to the cent, lint 0, reader 5/5, lineage = scratch DB sha `7c5179ea...`, Data Quality 120 rows from writer/enrichment/r_guard.
- State: `Mentat Complete Files` untouched, pointers never advanced, no cache stores, no console touched. Receipt: scratchpad `tidy\dryrun\DRYRUN_RECEIPT.md`; packet updated in both trees. Opus architects died THREE times on the account session limit (resets 21:50 / 02:50 / 17:50); each time `SendMessage` after the reset resumed with context intact.
- **NOTE:** P6a (`app/server.py` catalog regex + `kind`) is ALREADY COMMITTED on `codex/mentat-crypto`, carried inside Paul's Ride-1 commit `a4b3c8e2e` (13:40 on 2026-09-15, "Fix Ride 1 findings...") because that lane committed the shared file. The other 14 patch targets (8 ` M` + 6 `??`) remained uncommitted until Paul's "Commit the remaining 14 files" (2026-09-15 evening). A clean ours-only split was IMPOSSIBLE for four files (`report_insights.py`: the whole `worksheet_accounting` function is another lane's UNCOMMITTED work and P6c sits inside it; `test_report_insights.py`; `build_industry_report.ps1`; `export_crypto_spending_data.R` whose module list also names the other lane's untracked `state_destinations.R`), so Paul ruled "commit the 10 clean files now" -> commit `bd5dc8ea18a1641f3e08116f0d666fa98ba8750f` (10 files, +4,115/-0; `fec_beneficiary.R` and `enrich_downstream.py` staged as HEAD+ours via a three-way `git merge-file` with the `.bak` as base and `git apply --cached`; their foreign remainders +21/-8 and +19/-6 stay unstaged).
- **DEFERRED, still applied in the working tree and uncommitted at that time:** P2 exporter hook, P5 orchestrator step, P6c reader split-name rule, P7b its test; commit them after the other lane commits (HEAD is inert without P5, so nothing half-runs). **TRAP:** HEAD blobs are LF (`core.autocrlf=true`) while `git apply` wrote CRLF working files and the `.bak` copies are LF: merge in LF space or every line duplicates.
- **CLEANUP (Paul, 2026-09-15 evening):** the 13 lane backups (`*.bak-20260914-tidy`, `*.bak-20260915-fix1`) and the dry-run scratch folder (516 MB) are DELETED; the 117 other lanes' `.bak` files untouched. Rollback for the four deferred uncommitted files is now `git apply -R <P2|P5|P6c|P7b>` from the packet (`audits\mentat_tidy_workbook_20260914\patches`), no `.bak` route.
- **Open for Paul (proposal section 7):** cache-hit rerun policy; 6th arg vs env var; Data book in the picker; `funding_cohorts` +2 fields; `recipient_locations` grain; `Transfer Paths` cap; console follow-ups (% of total, `keys?` regex, verified source on the Data book); bridge flag punctuation.
- Related: `mentat-chart-studio-2026-09`, `mentat-system-debug-lane-2026-09-13`, `mentat-pipeline-2026-07-18`, `ask-before-substantive-changes`, `verify-dont-infer-completion-2026-08-04`.

## Contradictions noted and how they were resolved

- Tidy lane: the 2026-09-14 "NOTHING applied" scope vs the 2026-09-15 "APPLIED" state: newest wins (applied, 10 files committed in `bd5dc8ea1...`, 4 deferred); the older state is kept in the Decisions bullets.
- Receipt-evidence gate: on 2026-09-15 it refused any unresolved row (blocked the dry run); by 2026-09-19 it refuses nothing at HEAD (`7d364883e`): newest wins, earlier behaviour kept in the dry-run section.
- The `git_sha` fix commit hashes (`0ad366e01`, `aa8a3f884`) and the 38-commit final HEAD `59a87a70b` are later than the "36 commits, `a6c3129d8`" headline of the reconcile summary; both are kept (36 commits at `a6c3129d8`, 38 after the close-out).
