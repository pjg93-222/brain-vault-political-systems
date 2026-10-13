---
type: "ledger"
brain: "melange-systems-brain"
id: "CONSTRAINTS"
kind: "constraints"
title: "melange-systems-brain CONSTRAINTS"
date: ""
status: ""
superseded_by: ""
brain_commit: "768ae2579f50bbc5e466839c9e910d067942218b"
entry_sha256: "c303f1e9ce12f05a6760e0dd3ecebb6a06c0d862b9893aa265ed7dd3a1ed5f3f"
generated: true
generated_sha256: "1b3e7587e78a617d3dc6f0c4a89e6f3620600f8f7fcfa620e7bf563e52ff4b08"
aliases: ["melange-systems CONSTRAINTS"]
---
> Generated from melange-systems-brain/CONSTRAINTS.md at 768ae25; do not edit — change the brain via brainctl.

# CONSTRAINTS — Melange Systems

Invariants: facts about the data, definitions, tooling, audience, or explicit
prohibitions that hold for the life of the project. Each constraint must end
with its source in parentheses, such as `(client contract §4)` or
`(observed in data 2026-06)`. A constraint without a source is an assumption
wearing a costume.

Group them so a cold reader can scan fast:

## Data
- The CU primacy factor is a SHARE, not a sum. An act off the CU axis does not score zero — it DILUTES,
  entering the denominator at full role weight and the numerator at its class weight. Adding acts to the
  classified universe therefore moves every holder's score without any member changing behaviour.
  (source: fec/engine/primacy_factors.py compute(); traced 2026-08-11)
- Class weights: cu_primary 1.0, shared 0.5, bank_primary / crypto_primary / fintech 0.15, offtopic 0.0,
  oppose -1.0, ACU letters 0.60. `shared` at 0.5 sits at the roster baseline and is score-neutral by
  construction. (source: fec/engine/primacy_factors.py:24-32; PRIMACY_IMPLEMENTATION_SPEC_2026-07-28.md:292)
- The primacy board ranks on `factor_ranked` only — the pillar percentiles in ranks_python.json do not
  enter it. (source: fec/tier_util.py legislative_press_tiers; verified 2026-08-11)
- `acu_position` originates in ACU's own outline docx (`Moneyball_ACU_Search_Outline.docx`, sha256-pinned)
  via `acu_legislation_search_registry.json`; 55 of 55 registry position rows reconcile with the tag file.
  (source: fec/legislation/build_legislation_search_registry.py; reconciled 2026-08-12)
- WJ clip-family pad convention (2026-08-25): `C:\melange-data\wj_audio\turns\` clips (July scrape, 751)
  are UNPADDED — manifest `start` IS the member-turn offset and the member begins at t=0; only
  `turns_v2\` clips carry the ~20s stimulus pad (manifest schemas B/C). Any featurizer must anchor
  PER FAMILY, and any per-turn analysis must DEDUPE the 232 turns captured in both families (rule: keep
  the longer-duration capture — value-blind). Raw layer outputs/wj_features_20260825/wj_features.jsonl;
  deduped habits input wj_features_dedup.jsonl. (source: 751/751 manifest-vs-turns.csv offset equality;
  60 matched v1/v2 clip pairs cross-correlate at median lag 20.00s, corr~1.000; observed 2026-08-25)
- OpenSecrets' terms (last modified 2025-11-07) prohibit automated access without written permission
  and use of site materials for machine learning or automated decision-making without prior written
  permission; site content is licensed CC BY-NC-SA. Paul states he holds explicit permission
  (2026-09-30). (source: opensecrets.org terms fetched 2026-09-30, lines 284, 288, 370; saved in the
  forecast lane scratchpad feeds_spec\recon\terms.txt)
- Mentat's receipt system does not capture industry PACs' own giving to candidates; the FEC pas2
  files under mentat\.cache\repair-20260908-inputs\fec_beneficiary hold it (2022 and 2026 editions
  2026-09-06, 2024 edition 2026-03-08). (source: forecast Phase 2 addendum section F, 2026-09-30)
- Mentat workbook Analysis Amounts include receipts that the FEC filings record as other receipts (interest),
  refunds, loans and insurance claims; Mentat's accounting engine buckets them non_giving
  (mentat/tools/cross_reference_engine.py:344-350). Examples: SchoolsFirst FCU to Katie Porter's committees,
  $110,478.54 (2021-22) and $159,041.47 (2023-24), Form 3 line 15, memo INTEREST; U.S. Bank to the 2024
  convention host committee, $190,706 (2024), Form 4 line 19A; Progressive to Fetterman for PA, $65,679,
  "COVERED LOSS CLAIM". Any consumer that sums included receipts without a funding-source filter counts them
  as giving (Graph totals; Chart Studio's included-receipts basis; enrich_downstream funding cohorts; the
  sector-growth-study panel, which keeps every funding source by Paul's "Keep those receipts",
  sector_growth_study/code/R/sgs_panel.R:635). Amended per [[ledger/melange-systems-brain/D-090|D-090]]: the forecast anchors no longer count them;
  they leave out every funding source named in mentat/forecast/anchors/mentat_sources.py
  FORECAST_EXCLUDED_FUNDING_SOURCES (frozenset({'non_giving'}), line 23) and report the excluded amounts beside
  the results. (source: forecast integrity reconciliation,
  C:\melange-data\forecast-redesign-20260930\reconcile\PART_CALC.md D.1-D.3 and 10.1-10.2, 2026-10-01; code
  lines re-read at Mentat f340dc84e on 2026-10-05; drafted 2026-10-01 in BRAIN_DRAFTS_2026-10-01.md section 4;
  applied 2026-10-05 on Paul's approval, anchors clause amended per [[ledger/melange-systems-brain/D-090|D-090]])

## Definitions
- CENTERING TEST (Paul, 2026-08-12): "Is the bill centered around an industry, where we have provisions —
  or vice versa." Centered elsewhere with CU provisions → shared or an adjudicated cell. Centered elsewhere
  with no CU provisions → cross-industry at most. (source: Paul, session 2026-08-12)
- A declared ACU position is evidence of INTEREST, not of BENEFIT. It floors weight only where the act
  independently survives the operative-text test. (source: PRIMACY_IMPLEMENTATION_SPEC_2026-07-28.md:377;
  ratified in practice 2026-08-12)
- Promotion to `cu_primary` requires OPERATIVE TEXT — amends the Federal Credit Union Act, concerns NCUA,
  or an explicit CU title. (source: PRIMACY_IMPLEMENTATION_SPEC_2026-07-28.md:19, the L3 rung)

## Tooling
- Verification order for any rank-moving change: baseline hashes and the full board captured first →
  independent adversarial review of the DRAFT → revert dial proves byte-identity → mirror reproduces the
  live board before any counterfactual is trusted → enumerate every mover. (source: session 2026-08-12,
  where that review round caught 5 MAJOR defects)
- `fec/tests/lobbying/test_industry_valence.py` is NOT registered in `fec/tests/run_tests.py`; the kernel
  gate does not exercise the tensor contracts. Run it explicitly after any tensor change.
  (source: observed 2026-08-12)
- `fec/tests/fixtures/FIXTURE_expected_board.csv` is gitignored — the "frozen" board fixture is a local
  artifact, absent from a fresh clone. Regenerate only with `fec/attic/update_primacy_fixture.py`, and only
  after an authorized integration. (source: observed 2026-08-12; the tool's own docstring)
- Worktrees isolate the DATA plane. Verify in the live tree. AMENDED 2026-08-27 to say which half
  MONEYBALL_ROOT rescues, because the original text and a STATE entry gave opposite instructions and a
  booting session was required to halt on the contradiction:
  * `fec/paths.py:8` reads `ROOT=os.environ.get('MONEYBALL_ROOT', <dirname of __file__>/..)`, so
    MONEYBALL_ROOT DOES override for every paths.py consumer -- `build_system_manifest.py` included.
    Set it, or the producer describes the worktree and writes into the worktree's `data/system/`.
  * It CANNOT rescue modules that self-resolve. 131 files under `fec/tests` reference `__file__`;
    `test_bill_collision_guards.py:13-14` computes ROOT from `__file__` and never consults the env var.
    `data/engine/congestion.json` is untracked and gitignored (`.gitignore:6` `*.json`), so it exists
    only in the live tree and `run_tests.py` dies in ~2s with FileNotFoundError from a worktree.
    Forcing MONEYBALL_ROOT yields a MISLEADING 154 passed / 8 FAILED where all 8 are data-plane
    absence, not defects.
  * THEREFORE: the kernel gate and `audit_full` are LIVE-TREE ONLY. A gate figure measured in a
    worktree is not a gate figure. Measured exception: the `test_system_manifest_check` suite is
    worktree-safe.
  (source: fec/paths.py; observed 2026-08-12; amended from measurement 2026-08-27)
- A SELF-DESCRIBING ARTIFACT MAY NEVER BE VALIDATED IN THE TREE THAT PRODUCED IT. The check must draw
  its expectation from a different source than the thing it checks, or it cannot fail. The system
  manifest describes whichever tree the producer ran in, so `[SYS]` measured in that worktree reported
  333/0 and 566/2 where the live tree reported 333/3 and 563/5. The positive model is the
  rendered-surface audit, whose expected counts come from `member_desk_bundle.json` -- a different
  source than the page -- "so the check cannot agree with itself". Scoping a measurement honestly
  ("as measured in the worktree copy") does NOT rescue it; run it somewhere it can fail.
  (source: [[ledger/melange-systems-brain/DE-012|DE-012]]; measured 2026-08-27)
- OneDrive sync is NOT a backup. A delete or a corruption propagates to it, and no other backup target
  is configured on this host, so `durable_backup` is false system-wide and the manifest's
  `durable_backup_stores` count is 0 by structure rather than by oversight. Never read "replicated to
  OneDrive" as "backed up". (source: system manifest `durable_backup_basis`; 2026-08-27)
- `git status` and `git worktree add` on the OneDrive-backed live tree can exceed a 2-minute tool
  timeout, and a killed invocation strands a lock. MEASURED 2026-08-27: `git worktree add` ran past
  120s, checked out 5,413 of ~40,000 files, left `.git/worktrees/<name>/index.lock` plus a `locked`
  marker, and never checked out the target files. Prefer fast-forwarding an EXISTING worktree over
  creating a new one. Never remove a stranded lock while any `git.exe` is alive.
  (source: measured 2026-08-27; earlier incident 2026-08-26)
- `core.autocrlf=true` with no `.gitattributes`: NEVER compare a raw sha256 across the git/worktree
  boundary. The blob is LF, the working file is CRLF, and the byte-size delta equals the line count.
  Worked example: the committed manifest blob is 229,687 B against a 235,879 B working file and
  `git status` correctly reports clean. Normalize before comparing, or compare `git hash-object`.
  (source: cost one 16-minute producer run; recorded twice as incident before being made a rule)
- LIVE WORKING FILES ARE NOT UNIFORMLY CRLF; the bullet above describes only what `git checkout`
  writes. CENSUS 2026-09-19 at main `35521f9aa` (2,892 tracked code/markup/config/data-text files;
  non-code under audits/legfix5 and non-code over 5 MB excluded): 949 pure CRLF, 1,622 pure LF,
  312 MIXED (279 code; fec/legislation 64, fec/tests 40, fec/members 39), 9 with no terminator.
  Every MIXED file's blob is pure LF, so each mix exists only in the working tree that produced it
  and a fresh checkout renders uniform CRLF; the only blobs carrying CR are four `.patch` files
  stored `-text` on purpose (audits/laundry_list_closeout_20260918/.gitattributes). Untracked:
  28,464 text files, 93.1% pure LF, 78 MIXED, 11 UTF-16, 741 OneDrive placeholders (not read).
  Never assume a terminator, and never report 'the whole file is CRLF except line N' from a spot
  check (the file first reported that way had 88 bare-LF lines). Count first:
  `python fec/tools/live_patch.py eol <file>`.
  (source: scratchpad eol_census snapshots A/B/C, independent recount 15 of 15; [[ledger/melange-systems-brain/D-060|D-060]])
- `git status` IS NOT A CONTENT JUDGEMENT ON A FILE WHOSE SIZE MOVED. MEASURED 2026-09-19 (git
  2.54.0.windows.1): when a tracked file's on-disk size differs from the non-zero size the index
  recorded, `git status` reports ` M` without comparing content, while `git diff` prints nothing
  and `git hash-object` returns the blob's own sha; the flag is sticky, `git update-index
  --refresh` refuses it (`needs update`) and only `git add` clears it. When the sizes match git
  compares content through the autocrlf filter. It fires in both directions (a bare LF introduced,
  or a mixed file normalised to CRLF). In LIVE the index sizes equalled the working sizes for all
  2,892 files that day (0 phantom ` M`); an LF-to-CRLF normalisation would have produced 1,934.
  (source: scratchpad eol_lab E1/E1B with a same-size negative control; index_stat_vs_disk.csv)
- `core.autocrlf=true` LIVES IN THE SYSTEM GITCONFIG (`C:/Program Files/Git/etc/gitconfig`; global
  unset), so it is in force even in a directory outside every repository, `git apply` included: a
  file-patch whose old lines are all bare LF is applied by renormalising and the WHOLE file comes
  back CRLF, rc 0. Apply live-bytes patches with `git -c core.autocrlf=false apply`. A committed
  `eol=` attribute overrides `-c core.autocrlf=false -c core.eol=lf` in `git archive` (measured:
  `* text=auto eol=crlf` exported CRLF; `* text=auto` alone exported LF) - see [[ledger/melange-systems-brain/D-048|D-048]]'s caveat.
  (source: scratchpad eol_lab E3, E9)
- THE WORKBOOK'S FORMULA CACHE CANNOT BE REVIVED WITHOUT EXCEL, AND EVERY openpyxl SAVE DESTROYS IT.
  `fec/engine/compute_pillars.py:34` loads the workbook `data_only=True`, which reads Excel's CACHED
  formula results — populated only by Excel opening and recalculating the file. Chain step 18
  (`sync_stance_g.py:29`) saves via openpyxl every run, which kills the cache. The fallback ladder is
  `compute_pillars.py:73-100`: snapshot -> cache-alive backup workbook -> `FATAL: no O/E/F source`.
  CONSEQUENCE FOR ANY LINUX CONTAINER: there is no Excel, so the cache can never be revived and the
  chain runs permanently in degraded snapshot mode, printing "view cache dead", at roughly 3x runtime.
  That is a design decision to take deliberately, not a defect to discover mid-build.
  (source: measured 2026-08-27 Layer 2 census; corroborates the existing 522-rank guard note)
  2026-10-12: decided by [[ledger/melange-systems-brain/D-174|D-174]] (LibreOffice); a 2026-10-12 design trace found Excel is no longer on
  the rank path since 2026-09-08 (live_legislative_pillar=true; compute_pillars recomputes in Python
  from typed cells), so the 'degraded snapshot mode ~3x' clause no longer describes the chain — see
  scratchpad design COMPUTE_CONTAINERS_DESIGN.md (to be committed under audits/deploy_20261011/).
  (source: [[ledger/melange-systems-brain/D-174|D-174]]; the design trace is from the orchestrator's brief, not re-run here; only the
  compute_pillars.py:74 branch on live_legislative_pillar was re-read at record time.)
- THE PIPELINE CHAIN IS NETWORK-FREE. All 48 CHAIN steps plus the 5 hidden sub-steps of
  `build_primacy_surfaces.py` classify as 41 ENGINE / 6 SURFACE / 1 hybrid and ZERO COLLECTOR: none of
  the 29 modules importing `requests`/`httpx`/`urllib.request` is a chain step. `weekly_refresh.py`
  runs collectors ABOVE the chain (`:262-297`), which is the cleanest in-repo statement of the
  boundary. Two near-misses that are NOT network: `org_mentions.py:24` imports `urllib.parse` for
  parsing only, and `personal_texture_layer.py` can reach the Anthropic API but the chained
  `--refresh-local` invocation `sys.exit(0)`s at `:336` before that branch.
  (source: measured 2026-08-27 by static import analysis over all 48 steps)
- pywin32 / Excel COM IS NOT ON THE CHAIN. 30 `import win32com.client` sites exist repo-wide (12 live
  tree, 9 attic, 7 tmp, 2 audits copies) and ZERO are reachable from `run_pipeline.py`. The chain's
  workbook access is openpyxl only. `fec/surfaces/write_im_sheet.py` sits in a chain directory but is
  referenced only in DOCSTRINGS of `build_im_allocation.py:12,19`. Supersedes the standing assumption
  that pywin32 is the containerization blocker — it is not; `%LOCALAPPDATA%` and Windows path
  literals are. (source: measured 2026-08-27, 806 tracked .py scanned, on-chain set derived by AST)

- `cwd` on a glassbox event is the EMITTING PROCESS's working directory, not the session's,
  whenever the emitter passed no explicit -Cwd: Write-GlassboxEvent substitutes
  (Get-Location).Path when Cwd is empty. 373 of the 514 claude-hook events resolve to
  C:\Users\pgoff\AppData\Local\melange_x_collector - the X collector's directory, not a Claude
  worktree. Never read that field as "which session emitted this".
  (source: glassbox/common.ps1 Write-GlassboxEvent lines 394-396; measured 2026-08-14)
- FROZEN VINTAGE: files under `audits/` are dated records, preserved as written. A claim inside one
  that is later superseded is NOT corrected in place - it stands as what was believed and measured on
  its date. Corrections live in the LIVING plane (commands, skills, this brain), which supersedes it.
  Consequence to watch: a living doc that DELEGATES a standing practice to a frozen audit keeps
  pointing at that audit's original basis. `.claude/commands/metaloop.md` does exactly this for the
  Phase 5 standing practices in `audits/LANE_LAWS_VALIDATION_2026-08-09.md`, whose quarterly
  dated-basis sweep still names the ~2026-08-06 hook observation superseded by [[ledger/melange-systems-brain/DE-005|DE-005]].
  (source: Paul ruling 2026-08-14)
- Mentat's repo-wide `*.json` and `*.csv` ignore silently drops new folders' schemas and fixtures; a
  new folder needs its own `!*.json` / `!*.csv` rules. (source: forecast build commits e85db9328 and
  the refit .gitignore, 2026-09-30)
- R on the RunPod pod (ATLAS BLAS) and Windows R (reference BLAS) differ by up to 2.8e-14 on lm
  results; cross-platform parity checks must use tolerances, never byte equality. (source: pod
  verification of the Phase 4 parity run, 2026-09-30)

## Audience
- The surfaces are read by working lobbyists, not analysts. Pages show rankings and data — no advisory
  copy, no pitch framing, no recommendations. (source: Paul, 2026-08-11)
- Filenames stay "Moneyball"; visible text is "Melange". (source: Paul ruling 2026-08-06)

## Claims
- Every figure shipped in a findings document or surface note names its window
  and denominator in the same sentence or an adjacent named receipt; a bare
  percentage is a defect regardless of whether it is true. (source: [[ledger/melange-systems-brain/D-007|D-007]] /
  framework PASS 1a; the stale-23% incident, Melange commit 23affda4b)
- A pooled coefficient over a named fault line — party, chamber, sector — is
  quoted only with its strata visible or an explicit UNSTRATIFIED label;
  opposite-signed strata whose interaction survives correction deprecate the
  pooled number outright. (source: [[ledger/melange-systems-brain/D-007|D-007]] / framework PASS 4a; the D9 refit,
  Melange commits 0996be7de and 286f2c8e9)
## Never do
- Never weaken a test, audit assertion, floor, or count to make a change pass. Re-pinning to an explicitly
  ratified state is the only permitted change, and it requires Paul. (source: moneyball-change-control law 7)
- Never read a tag row's `authority` or `rationale` as provenance for its `acu_position` — those fields
  describe how the CLASS was decided. Go to the registry and the outline docx.
  (source: [[ledger/melange-systems-brain/DE-003|DE-003]]; this produced a wrong conclusion once)
- Never derive CU relevance from mention density. (source: [[ledger/melange-systems-brain/DE-001|DE-001]])
- Never choose a relevance value, threshold, or pin because it restores or removes a particular member's
  seat. If evidence is ambiguous, the finding is "ambiguous" and the disposition goes to Paul.
  (source: session 2026-08-12 pre-registered framework)
- Never reprice acts one at a time in response to whichever member was last investigated — that selects
  fixes by proximity and turns the board into a record of what was examined. (source: [[ledger/melange-systems-brain/D-005|D-005]])
