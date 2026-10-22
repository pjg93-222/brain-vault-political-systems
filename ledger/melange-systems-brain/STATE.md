---
type: "ledger"
brain: "melange-systems-brain"
id: "STATE"
kind: "state"
title: "melange-systems-brain STATE"
date: "2026-10-22"
status: ""
superseded_by: ""
brain_commit: "48edac6b95836d733322e75d5b97cc82da6760e5"
entry_sha256: "9ce0c3b6ee5c7878c0b06ecd32d5646dac01caa9066e139c8178ded11387e11b"
generated: true
generated_sha256: "9ffc066c6516d14e32cbde113b00a7c615fc70e84e51ffc896981c60f27c5e4a"
aliases: ["melange-systems STATE"]
---
> Generated from melange-systems-brain/STATE.md at 48edac6; do not edit — change the brain via brainctl.

# STATE — Melange Systems
> Last verified: 2026-10-22 18:56
> Verified by: E2E lane 18:15 block as reported by the orchestrator (not re-observed); Terrier voter profile record as reported by the orchestrator brief (2026-10-21), not re-observed; everything else carried from the 2026-10-20 block and the agent roster lane record
> NOTE: keep the stamp above a bare date-time on its own line (flush writes it). The parser defect is FIXED in Project Brain d9100b8 + 026ca95 (2026-10-20):
> brainctl and brainlink `parse_state` accept a leading `YYYY-MM-DD[ HH:MM[:SS]]` prefix with a trailing annotation, and boot/status name which case failed
> (missing / unparseable / future-dated). Annotations still live on the Verified by line, not on the stamp.

Declarative, present-tense, rewritten often. This file answers: *where is the
project right now?* Delete anything that stops being true. Narrative history
belongs in git, not here. This is the single staleness authority.

## Current position
- TERRIER VOTER PROFILE 2026-10-21 (Claude Fable 5.1 session started by the Melange debug-roster lane; record taken from the orchestrator brief, the cited commits, paths and counts are as reported there and NOT re-observed by this record): a client asked Paul for walk lists on a new street set with "the opposite of Crank" (supportive D, U, persuadable R); Paul: "It needs to be an option within the app, in the meantime use this" (Downloads\Portland OR OR.05 Streets.xlsx). "Crank" is not a Terrier profile: zero hits in the Geo repo, vault and sources; it is Jeff Crank, R, CO-05. Terrier had registration (svi_party_registration) feeding candidate support s in tools/support.py:32-46 but no party-mix selector; the four street presets only rank streets. BUILT: Geo PR #13 https://github.com/[private — see knowledge vault]/pull/13, branch feat/coalition-profile off main ea0c826 (the shipped lineage per Paul's 2026-10-21 ruling), worktree Documents\Terrier\worktrees\coalition-profile, 9 commits to fd23f87. A `profile` query key (all | coalition) on the walk list, street plan, door trim and saved list; 'all' is byte-identical (tested). Coalition = own-party s>=SUPPORT_MIN, or registration not D/R (U, L, G, W, O, blank), or other-major-party PERSUADE_MIN<=s<=PERSUADE_MAX, defined from the candidate party so an R candidate mirrors; constants tools/field_labels.py:105-107 = 2/3, 1/3, 2/3 are placeholders "pending Paul's ruling". Districts whose candidate is not D or R offer only 'all'. The frontend "Voter profile" select is carried in the page address and the saved list, and printed on the summary, PDF cover and Summary.csv. Verification: Opus review 4 low items fixed; clean-checkout verifier: backend 1275 tests with the same 40 named pre-existing failures as main (missing gitignored co-cd005 zip, pyarrow, desktop principal DB, golden-digest test already red on main), tsc clean, frontend 331/331, no PII in commits; CodeRabbit 1 thread fixed and resolved; CI green; MERGED into Geo main as ec79b73 on 2026-10-22 on Paul's direct word ("Actually merge") with the placeholder thresholds and every unaffiliated registrant kept; not yet in a shipped Terrier release (the deployment-readiness lane owns the next build). The live path was exercised on a worktree server :8790 with the live stores read-only (live 8767/8775/8777 untouched; none had a listener that evening): SE 131st Ct 38 voters under Everyone vs 34 under the profile. Proof and per-group CSVs (PII, outside git): Documents\Terrier\outputs\walk-lists-or05-happy-valley-20261021\. COVERAGE: only 4 of the 59 distinct requested Happy Valley street names exist in the OR-05 store; Census TIGERweb puts the sampled rest (including SE Plover Dr) in CD-3; profile proof on the 60 matched people: Everyone 60, this profile 54, mirror R-candidate profile 34. OPEN FOR PAUL (decisions list in the PR body, not blocking): (a) the three thresholds; (b) keep every U/minor-party registrant or only s>=1/3; (c) OR-03 voter file purchase and a new district store (55 names need it); (d) retuning the thresholds after merge. Pre-existing, out of scope: the CSV street matcher ignores the city column (same-name streets in other cities match); the golden-digest test is red on main; CodeRabbit docstring-coverage advisory 41% vs 80%.
- QUEUE CLEAR-OUT CLOSED 2026-10-12: the 2026-10-10/11/12 campaign is closed; changes, end state and the final Needs-Paul list (6 items) are in Melange audits/decisions_20261011/FINAL_REPORT.md, decisions addendum in DECISIONS.md there (Melange b5b7bda25).
- PRESS LEDGER 2026-10-12: press ledger rebuilt from replay (Melange 656fb3a84, schema v4: live ledger refuses foreign roots + replays on seal mismatch; was missing 09-13 via a pytest fixture fold and held a pre-drain 10-11 seal); 10-11 intake still REJECTED, 135/497 blocking = M000312 streak 2/3; ~~McGovern expected to clear on 10-18 weekly (if listed again for streak 3/3, or drained, and no new untombstoned rows)~~ — corrected 2026-10-12: that is the INTAKE's condition; the weekly never reaches the intake while the R walk exits 3 (refresh_press_delta.R:990 exits 3 on any pending body, tombstoned or not; weekly_refresh.py:446 is hard and step() aborts on any non-zero exit, :320/:341). With the press-PARTIAL fix (built 2026-10-12 on branch fix/weekly-press-partial, lands with integration round 2) 10-18 passes press only if every pending row of its run is excused: H001068/H001104/J000294 member-tombstoned, M000312 at 3/3 if pending again; any other member blocks (M001176 380 and M001224 67 URLs held at streak 1; the 10-11 weekly's own 600 s run left 99 of 1137 unexcused, outputs/press_drain_20261011.log line 3). The receipt's other two errors are the same 135 rows: a read-only replay of 10-11 passes every count/hash check in audit_collection.py:1077-1106; ~~but audit_collection also flags pending rows in failed_bodies as lacking an exhausted retry receipt (separate blocker)~~ — fixed 2026-10-12 in Melange 35af3ca60: the failed-bodies check honours the 3-run tombstone excuse (press_pending_tombstones.excused_by); read-only replay of 10-11: both gates name the same 135 rows, all M000312 (streak 2/3)
- SECURITY BASELINE 2026-10-10: read-only audit (no Django; stdlib http.server only) → Paul-approved P1-P9 landed (Melange 6de7ed180 on main; Mentat codex/mentat-crypto 23d33bfe8), gap fixes (Melange 16b214d38 SSRF _is_public; Mentat 95646bcbf R non-ASCII URL rejection); dashboard password rotated to a random temp password stored at %LOCALAPPDATA%\Melange\dashboard_password.txt, deploy/index.html re-locked (not yet uploaded to Netlify); adversarial campaign ~7,300 cases, 0 bypasses. Follow-ups in flight 2026-10-10: research pickle guards, type=password field, untrack data/money/Moneyball_email.zip. Controls recorded as [[ledger/melange-systems-brain/D-140|D-140]]. Brain redaction: the probe-lock password literal was replaced in STATE.md and its 2026-09-05 .bak; older brain commits and the GitMirror still contain it (history rewrite = Paul's call; ~~open~~ — decided 2026-10-11, [[ledger/melange-systems-brain/D-148|D-148]]: no rewrite, repo private).
- RESEARCH VAULT (2026-10-09, new): Obsidian vault `C:/Users/pgoff/Documents/research`, registered in Bedrock as `research` (brain stays default); local git only, 419854b, no remote; PDFs, extracted text, PDF markup and pipeline state are git-ignored. Holds Paul's annotated bibliographies verbatim (annotations/), 167 paper notes (28 added 2026-10-10 from approved open-access downloads and a web scan) + 4 sector-growth research notes (notes/), 20 system hubs (127 components, 609 paper-to-component bearings), 14 theme syntheses, framework.md. Bearing status is VERIFIED / VERIFIED-SOFTENED / UNVERIFIED per [[ledger/melange-systems-brain/DE-062|DE-062]] (117 items adversarially checked, 3 claims refuted). Remaining missing works are mostly paywalled (list in missing.md and _work/missing_sources.md; Rongkuan 2024, Oropeza 2024 and Peng 2022 not found online); 21 components have no literature (Terrier imputation weakest). The vault links into the brain vault by obsidian:// URIs; the brain vault does not link back yet.
- GIVING BY CYCLE (2026-10-07/08, forecast lane; ~~[[ledger/melange-systems-brain/D-113|D-113]] to [[ledger/melange-systems-brain/D-119|D-119]]~~ — superseded 2026-10-08: [[ledger/melange-systems-brain/D-113|D-113]] to [[ledger/melange-systems-brain/D-121|D-121]], with [[ledger/melange-systems-brain/D-119|D-119]] and [[ledger/melange-systems-brain/D-120|D-120]] themselves superseded by [[ledger/melange-systems-brain/D-121|D-121]] (source: DECISIONS.md [[ledger/melange-systems-brain/D-119|D-119]] to [[ledger/melange-systems-brain/D-121|D-121]]); ~~[[ledger/melange-systems-brain/D-113|D-113]] to [[ledger/melange-systems-brain/D-121|D-121]]~~ — superseded 2026-10-09: [[ledger/melange-systems-brain/D-113|D-113]] to [[ledger/melange-systems-brain/D-128|D-128]] (source: DECISIONS.md [[ledger/melange-systems-brain/D-125|D-125]] to [[ledger/melange-systems-brain/D-128|D-128]], read 2026-10-09); only this bullet verified, 2026-10-08): ~~everything below is LIVE on console 8806 and UNCOMMITTED in C:\Users\pgoff\Mentat (branch codex/mentat-crypto, HEAD f340dc84e)~~ — superseded 2026-10-08: ~~everything below is LIVE on the console served on port 8807 and COMMITTED and PUSHED on branch codex/mentat-crypto of C:\Users\pgoff\Mentat (origin/codex/mentat-crypto = 3aea84195): forecast commits 47b05d88d, 8e3a85c10 and 4235704dd, test fixes 0be3d3862 and e829576bb, geo test isolation 3aea84195 (source: git -C C:\Users\pgoff\Mentat log --oneline -20 and git status -sb, read 2026-10-08)~~ — superseded 2026-10-09: everything below is LIVE on console 8806 (restarted 2026-10-09 02:56, pid 63180) and COMMITTED and PUSHED on branch codex/mentat-crypto of C:\Users\pgoff\Mentat (origin/codex/mentat-crypto = 111c417e7, which contains every commit named here): Telecom general giving and company PACs 6acedee5d and 20d6e532f; the lobbying Melange card b54728386 with a wording fix in cde5eb4c0; the model-availability calendar fix d28db1234; the Telecom party split on the pooled share models 6d03e4b4d; nominal dollars by default 1855e6511 (the same push carried 37704505e, Telecom extraction prep). The 2026-10-08 commits 47b05d88d, 8e3a85c10, 4235704dd, 0be3d3862, e829576bb and 3aea84195 remain in its history (source: git -C C:\Users\pgoff\Mentat log codex/mentat-crypto and rev-parse origin/codex/mentat-crypto, read 2026-10-09; CHANGES.md entries 24 to 29). The full record is C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\FORECAST_OVERNIGHT_2026-10-07\CHANGES.md (~~entries 1-14; entry 14, the presidential uplift, stopped at step 1 with nothing applied~~ — superseded 2026-10-08: ~~entries 1-20; entry 15 applied the presidential factors ([[ledger/melange-systems-brain/D-121|D-121]]), entry 16 restarted the console, entries 17 to 20 committed and pushed and fixed two failing tests and a geo test isolation~~ — superseded 2026-10-09: entries 1-29 (entries 21 to 29 cover PR #12 merged, the credit-union party split, the Telecom forecast, the lobbying Melange card, the calendar fix, the Telecom party split with nominal dollars by default, and the 8806 restarts; entry 30 is being added by another agent), with blind results in its blind\RESULTS.md and blind\panel_RESULTS.md (source: those files, the pointer file and the 8806 listener, read 2026-10-08).
  - Layout and inputs: Board A layout (one chart with an assumptions rail, a party split, everything else in one Methods fold); growth inputs default to IBIS industry values and the forecast recalculates as you type ([[ledger/melange-systems-brain/D-114|D-114]]).
  - Cycle model: the cycle-aware 50/50 model is published. ~~Pointer giving-models-current.json -> bundle d516dba6… (refit-20261007-d861bf29-79211caa154e), switched 2026-10-07T17:38:26Z~~ — superseded 2026-10-09: pointer giving-models-current.json -> bundle b9f03e7b… (refit-20261009-e1ba2513-74f0e0a24143; previous refit-20261008-d861bf29-1cda1631d7d7), switched 2026-10-09T04:02:30Z (source: C:\Users\pgoff\Mentat\mentat\app\data\giving-models-current.json, read 2026-10-09) ([[ledger/melange-systems-brain/D-113|D-113]]: PAC spec adopted, Senate presidential term kept, growth through the 50/50). A stale-page guard (the growth_basis marker) makes the server answer an old page with HTTP 400.
  - Company PACs: the open cycle 2025-26 uses the PAC panel's nowcast R8 (O + (1 - s) x B), with no 50/50, and replaces the [[ledger/melange-systems-brain/D-099|D-099]] BLEND for company PACs ([[ledger/melange-systems-brain/D-116|D-116]]; general giving keeps the 50/50). Credit unions' company-PAC measure uses the panel's 16-PAC cohort ([[ledger/melange-systems-brain/D-117|D-117]]). ~~A presidential-cycle uplift for 2027-28 company PACs is being built ([[ledger/melange-systems-brain/D-118|D-118]], Paul's rule; CHANGES.md entry 14).~~ — superseded 2026-10-08 (later the same day): CHANGES.md entry 14 stopped at step 1 and applied nothing. The national all-PAC presidential/midterm ratio is u = 0.9812 in real 2025 dollars (all three pairs below 1; nominal 1.0295), so the data give no size for [[ledger/melange-systems-brain/D-118|D-118]]'s ruled sign; the break-even for 2027-28 to exceed 2025-26 is 1.0853. The calculator is unchanged (banks company PACs 2027-28 $5.44M); step 2 was specified and waited for Paul's size or basis (source: CHANGES.md entry 14, read 2026-10-08). Update 2026-10-08 13:31: Paul then ruled +9% (u = 1.09; [[ledger/melange-systems-brain/D-119|D-119]], "use +9% and restart 8806"); ~~the build (CHANGES.md entry 15) had not landed and 8806 was still pid 27944 (started 12:36), so the +9% is not live yet~~ — superseded 2026-10-08: the presidential-cycle factors are LIVE and COMMITTED. [[ledger/melange-systems-brain/D-120|D-120]] (x1.80 for company PACs) was ruled and then superseded by [[ledger/melange-systems-brain/D-121|D-121]], so the final factors are general giving x1.8635 both ways (OpenSecrets total election cost: presidential average $12.56bn vs midterm average $6.74bn; the midterm step is divided and the presidential step multiplied, in place of the fitted phi_gen 0.738) and company PACs x1.09 on the 2027-28 step ([[ledger/melange-systems-brain/D-118|D-118]], [[ledger/melange-systems-brain/D-121|D-121]]). The code is GENERAL_UPLIFT_FACTOR and PAC_UPLIFT_FACTOR in mentat/app/giving_forecast.py, first committed in Mentat 8e3a85c10 (absent at 47b05d88d, present at 8e3a85c10 and at HEAD 3aea84195; later commit 7f13e9247 touches the file for the lobbying nowcast and Telecom, not for these factors) (source: git -C C:\Users\pgoff\Mentat show <commit>:mentat/app/giving_forecast.py, DECISIONS.md [[ledger/melange-systems-brain/D-121|D-121]] and CHANGES.md entry 15, read 2026-10-08).
  - Banks at the defaults, 2025 dollars (entries 10 and 12; ~~unchanged by entry 14~~): ~~general giving $13.9M (2025-26) and $22.9M (2027-28); company PACs $6.06M and $5.44M~~ — superseded 2026-10-08: with the [[ledger/melange-systems-brain/D-121|D-121]] factors (entry 15), banks general giving $14.47M (2025-26) and $21.15M (2027-28); banks company PACs $6.06M and $6.08M. Credit unions: general giving $0.44M and $0.68M; company PACs (the 16-PAC cohort) $2.55M and $2.56M. P&C general giving $4.65M and $7.13M (source: CHANGES.md entry 16 verification on the new build, read 2026-10-08; its raw figures are banks general $14.471M / $21.151M, banks PACs $6.055M / $6.081M, credit-union general $0.438M / $0.684M, PACs $2.549M / $2.560M, P&C general $4.646M / $7.130M).
  - Blind scores (chronological backtest, 2018-2024): the panel nowcast passes 19 of 20 sector x cut cells; P&C month 12 (89.36) fails the bar. The 50/50 overlay lowered the blind score in 12 of 16 comparisons. Banks company PACs at month 18: panel nowcast 97.8, BLEND 90.2.
  - 8806 restarts: 2026-10-07 14:10 (pid 32372) and 15:19 (pid 58720); 2026-10-08 11:46 (pid 65296) and 12:36 (pid 27944, ~~the current listener~~ — superseded 2026-10-08: pid 27944 no longer exists; the entry-15 build was served on port 8807 from 14:31:48 (pid 33356) because 8806 did not release its port (CHANGES.md entry 16), and the console is ~~served on 8807~~ — superseded 2026-10-09: served on 8806 (restarted 2026-10-09 02:56, see the 2026-10-09 sub-bullet below). As read at 19:2x both ports listen, each with a process started 18:56:08 from the same server.py (8806 pid 73124, 8807 pid 69696), and both return a 249,895-byte /api/forecast/catalog; whether the 8806 process holds the same build was not compared further, and the coordinator's brief treats 8806 as stale until Paul closes it) (source: netstat, Get-CimInstance Win32_Process and a curl of /api/forecast/catalog on both ports, read 2026-10-08).
  - Open for Paul: ~~the [[ledger/melange-systems-brain/D-118|D-118]] uplift size or basis and~~ (ruled +9%, [[ledger/melange-systems-brain/D-119|D-119]]; ~~+9%~~ — superseded 2026-10-08: final [[ledger/melange-systems-brain/D-121|D-121]], general giving x1.8635 and company PACs x1.09, live) ~~real vs nominal dollars (Open questions)~~ — superseded 2026-10-09: nominal by default ([[ledger/melange-systems-brain/D-127|D-127]]); ~~merge the vault PR that carries these decisions (PR #12, open)~~ — superseded 2026-10-09: PR #12 merged 2026-10-08T23:35:20Z (gh pr view 12; CHANGES.md entry 21); ~~close the stale console on port 8806~~ — superseded 2026-10-09: 8806 is the live console (restarted 02:56, pid 63180); ~~commit the Mentat tree (nothing is committed)~~ — superseded 2026-10-08: committed and pushed (see the head of this bullet).
  - 2026-10-09 (Telecom, nominal default and the lobbying card; source: CHANGES.md entries 24 to 29, DECISIONS.md [[ledger/melange-systems-brain/D-125|D-125]] to [[ledger/melange-systems-brain/D-128|D-128]], git log of codex/mentat-crypto and gh pr view 12, read 2026-10-09): Telecom general giving and Telecom company PACs are live in the forecast (6acedee5d, 20d6e532f); company PACs use the panel's 8-PAC Telecom cohort ([[ledger/melange-systems-brain/D-126|D-126]], panel nowcast R8, presidential uplift x1.09). Telecom's party split is scored on the pooled share models (6d03e4b4d; [[ledger/melange-systems-brain/D-125|D-125]], Paul: "1. Lets keep it uniform, do A"); the B09 recipient capture is not built, because the coordinator judged the result not weird. Giving by cycle charts show nominal dollars by default, with a 2025-dollars toggle (1855e6511; [[ledger/melange-systems-brain/D-127|D-127]], Paul: "4. Align"). The forecast's lobbying chart is Melange's stacked LDA card with projected years (b54728386; wording fix cde5eb4c0). The model-availability check compares dates in one calendar, so a late-evening refit is usable the same day (d28db1234; [[ledger/melange-systems-brain/D-128|D-128]], Paul: "6. Fix"; no as-of fallback, Paul: "5. Not needed"). Console 8806 was restarted 2026-10-09 02:56 (pid 63180) and serves the live calculator; the pointer is refit-20261009-e1ba2513-74f0e0a24143 (switched 2026-10-09T04:02:30Z). The same push also carried 37704505e (Telecom extraction prep).
- TELECOM INDUSTRY (2026-10-07, telecom lane; [[ledger/melange-systems-brain/D-110|D-110]], [[ledger/melange-systems-brain/D-111|D-111]], [[ledger/melange-systems-brain/D-112|D-112]]): telecom is a full Melange industry treated exactly like fintech.
  - Code LANDED on LIVE main 904077797 (from b07ce4896 by update-ref; 38 files; other lanes' uncommitted work verified unchanged; not pushed). It adds: the LDA roster (17 families), its own network side, att_telecom, the telecom_primary class at 0.15, tier and champions boards, crown law, a Mentat Telecom workbook compact-schema ingest on the opposition side, UI labels, 3 promotions (H.R.1672|117, S.1023|117, H.R.2201|117) and 4 association anchors (H.R.3557|118, H.R.2289|119, S.3587|117, S.4821|118), giving tags 648.
  - The Robocalls Act bills stay shared: their text puts duties on callers.
  - DATA LANDED 2026-10-07 evening. Lanes, GovInfo bill refresh (481/481, receipt PASS; [[ledger/melange-systems-brain/DE-068|DE-068]]) and chain ran; commits c692eddb1 (interactions budget 16 MiB, [[ledger/melange-systems-brain/DE-069|DE-069]]) and 8c5490f88 (tags 648, anchor memberships 171); not pushed.
    - Paid API classification blocked: Anthropic credits exhausted on all keys. Per Paul ("You do not need API for this, you can use Haiku"), 22,847 position items were labelled by Claude Code Haiku subagents (kim_llm4 question, 166 batches) and ingested as variant kim_llm4, model "claude-haiku-4-5 via Claude Code subagent (no API)".
    - Pilot vs API: 92.7% agreement, kappa 0.25. Haiku calls bare bill listings Monitor where the API said Support; the new rows are 97.9% Monitor.
    - Telecom: Industry card 2025 $139.4M; tier board 6/31/48 (7 primary acts); champions 50/0/0.
    - CU effect: one champion seat changed (Lummis out, Hickenlooper in) and 4 tier changes. The contest index moved for all 533 (telecom counted as CU-opposing attention, as fintech is).
    - ranks_python: 220/533 moved, ALL from the GovInfo refresh (Leg pillar only); parity CLEAN.
    - OPEN for Paul:
      - make_email_package fails: the all-in-one zip is 310,800 B over its 14 MiB email cap. audit_full is 574/1, red only on that.
      - sentinel_admissions goes stale 2026-10-08 ~16:09 EDT. The refresh needs LLM credits or --no-llm.
      - Approve or revert the [delegated] choices in CHANGELOG.md.
      - The 45 Mentat prep proposals.
    - Log: Melange audits/telecom_industry_20261007/RUNLOG.md and CHANGELOG.md.
    - FINISHED 2026-10-08 16:17. Email fix 20fdf37b5. Sentinel freshness window widened 8 to 10 days in 0896c9ba7: TEMPORARY per [[ledger/melange-systems-brain/D-122|D-122]], REVERT after the next successful refresh_sentinel_admissions --no-llm, because uscode.house.gov was under maintenance. Chain completed. Post-chain manifest plus audit_full: 575/0, ALL MODULES CLEAN. Commits not pushed. This supersedes the OPEN email-cap and sentinel-deadline items above.
  - Backup of the lda_rebuild derived folder: %LOCALAPPDATA%\Melange\lda_rebuild_backups\derived_20261007_111834.
  - Mentat extraction prep workbook: Desktop\Mentat Complete Files\Telecom Extraction Prep 2026-10-07.xlsx (45 proposals await Paul).
  - sentinel_admissions.json expires 2026-10-08 about 16:09 EDT unless the chain or a refresh runs before then.
- COMPETITIVENESS MULTIPLIER (2026-10-05/06, [[ledger/melange-systems-brain/D-104|D-104]]): LIVE and COMMITTED on main 86742061c (dial off) and 59986b0ff (default ON). c = 1 + exp(-max(lean,0)/5) from Cook 2026 PVI (House) and Paul's state PVI (Senate), applied as effective dollars on both money legs; COMPET_MULT=0 reverts byte-for-byte. 2026-10-06 full chain with the dial on: all steps ran; audit_full 564/7, all A2/A2b inventory sentinels; compute_pillars with COMPET_MULT=0 = shipped-authority parity CLEAN, so c moves no rank (the 220 rank movers vs the 10-01 snapshot are new inputs); optimizer certificate_valid true, conversion_reachable false, $2.5M spent; dashboard bundle carries cmult for 533. Kernel 274/1 (pre-existing test_publication_crown_guard). Spread: 87 members at c>=1.5, 44 at 2.0, 4 at 1.0 (Kiley, PR delegate, Calvert, Doggett), mean 1.24. Candidate delta (on vs off, same inputs): 134 allocation movers, $57k shifted; audits/competitiveness_c_20261005/. House district boundaries VERIFIED by Paul 2026-10-06 (commit ef74e3add: boundary flag dropped, c unchanged 533/533; chain rerun from build_competitiveness: rank delta 0/533, audit 564/7, optimizer stamps the new artifact sha). Mentat money wiring plan committed ed455bcef (audits/mentat_money_wiring_20261006/MENTAT_TO_MELANGE_WIRING.md, design only). ~~OPEN: the code review was Sonnet-only~~ (superseded 2026-10-11: Opus second review done with the [[ledger/melange-systems-brain/D-107|D-107]] build, Melange 03be7ff38).
- PEOPLE-NETWORK LATENCY (2026-10-02 to 10-04, people-network latency lane): LANDED and COMMITTED on LIVE main 3366a7840 and 4a81d5022 (mirror current); audit packet in audits/staffer_route_latency_20261004. Four landings: landing_v2 (2026-10-03 14:59, 8841 restart), landing_v3_ids (16:24, no restart), landing_v4 (2026-10-04 03:17, restart to PID 36412) and landing_v4_1 (2026-10-04 14:33, restart to PID 66688). Live panels found the following. Typeahead: people p95 91 ms (was 8.4 s); offices max 98 ms (was 41 s). Route memory growth per request at most 0.43 GB, typically under 30 MB (was +10.5 GB). Cold routes about 3x faster: JUDICIARY route 1 12.8 s (was 39.2 s). Warm routes 0.1-3 s; Gordon to Casca 1.0 s (was 25.3 s). The first route after a restart is 2.8 s (was 40 s). Every compared path was identical. Decisions [[ledger/melange-systems-brain/D-082|D-082]] to [[ledger/melange-systems-brain/D-087|D-087]] cover the tie rule, the identifier rule, the identity loop, the unreachable messages, office coverage and the speed-round scope. v4.1 LANDED 2026-10-04 14:33 (PID 66688) and COMMITTED on LIVE main 4a81d5022: no startup garbage collection, no index rebuild when a router swap lands mid-search, directory-mode left-out wording, explanation equal to message. OPEN: sidecar idle CPU is about 19% of one core with no client, one thread with kernel time above user time (cause not established); two LOW items from the v4.1 check are deferred to the next restart (a narrow window in which a publish can skip the post-swap collection, and a doc overstatement about what a released router stores); directory-only searches are not prewarmed (first one 8.4 s). Code branches: claude/staffer-route-latency-20261002, claude/staffer-search-ids-followup-20261003, claude/staffer-route-v4-20261003 (79ef9f1b7).
- QME FULL-CHAIN RETRY + 10-01 RULINGS (2026-10-01, math-evaluation lane, worktree melange-math-eval-skill-18e907; from the retry report and its independent verifier, workflow wf_5c713a80-fff): 2026-10-01 09:09–09:55Z full chain retry (bare run_pipeline.py) ran 79/79: 76 OK, build_descriptive_speech tolerated, build_district_industry optional skip, audit_full 553/17 (rc 1, [[ledger/melange-systems-brain/DE-044|DE-044]] shape); no native crash. LIVE is one vintage on 09-27 money (congestion 8e9e29ec) and admissions 08eab127: ranks cde36ac1 (scores identical to step 3), honors 149591bd restored (Blended 027b716d), alias/source-to-dashboard PASS, email zip cd210dd6. Kernel 261/3 (standing). Publication verifier INCOMPLETE: tolerated step + collection receipt c0d29f11 FAIL ≠ PENDING; bindings PASS. Movers vs 09-20: 393 (245 leg percentile, 19 own admissions, 9 bill/membership, 102 press, 18 displacement). Also: the verifier's audit section was not reached, and by audit_failure_gate.py's logic 10 of the 17 audit names fall outside its patterns. The 17 are 2 standing reds plus 15 A2/A2b reds from the 2026-09-18 system_manifest inventory. LIVE main 3e0621922 = mirror, nothing staged. The 09-27 money goes stale at 2026-10-05T10:29:36Z. Before this, attempt 1 (08:08–08:30Z) halted at step 28, build_media_blend.py, on a python.exe 0xc000070a native crash that wrote nothing; the ~35 such python crashes since 09-29 are unexplained. The mixed-direction holds [[ledger/melange-systems-brain/D-075|D-075]]/[[ledger/melange-systems-brain/D-076|D-076]] are landed (LIVE 15977a0fa, 862478165, 3e0621922; [[ledger/melange-systems-brain/DE-054|DE-054]], [[ledger/melange-systems-brain/DE-055|DE-055]]); hold-retry priority stays at the default. Paul's 10-01 rulings, all PENDING EXECUTION except [[ledger/melange-systems-brain/D-080|D-080]], which was executed (see its Outcome): ROI matches the backend's real positive peer maximum ([[ledger/melange-systems-brain/D-077|D-077]]); qualified publication sign-off ([[ledger/melange-systems-brain/D-078|D-078]]); manifest rebuild + re-audit ([[ledger/melange-systems-brain/D-079|D-079]]); 8841 started once with the MelangeStafferLiveSidecar task kept disabled ([[ledger/melange-systems-brain/D-080|D-080]]); the chain's system_manifest.json and Moneyball_email.zip writes acknowledged ([[ledger/melange-systems-brain/D-081|D-081]]). Verifier corrections: 126 members' raw press changed (the report said 125); capture.py's git reads refreshed LIVE .git/index at 09:55:45Z (no content change); 8841 was free by about 10:40Z. This supersedes the 09-30 QME bullet's pending full chain and 8841 restart.
- QUANT MODEL EVALUATION / FIX ROUND (2026-09-30, math-evaluation lane; only this bullet verified): skill merged as c13f3a5d4 and linked into user skills. F1 shared optimizer stance gate and F4 desk metrics landed LIVE b488a99fe; leakage copy-on-write fix 9a6816a9d and N19 fix f94d72e6a landed. Paul's F1-F6 rulings are now recorded in [[ledger/melange-systems-brain/D-070|D-070]] through [[ledger/melange-systems-brain/D-074|D-074]], with [[ledger/melange-systems-brain/DE-051|DE-051]] through [[ledger/melange-systems-brain/DE-053|DE-053]]. N19 published PASS at 20:09:17Z (15 include / 12 exclude / 14 holds, zero errors). Membership sidecar PASS at 20:33:36Z is hash-bound to the current repository, but its refresh receipt publication remains PENDING at this checkpoint. The user authorized moving every process and the full data plane, including donor records, to the supplied pod; the recovered runtime is at /dev/shm/melange with /workspace/melange-venv/bin/python. Pod QME tests: 175 passed, 2 skipped, reported by the coordinator; this does not establish full-chain or parity completion. Full publication chain, production artifact verification, kernel/audit gates, output reconciliation and the authorized 8841 restart remain pending in the coordinator's lane. Never restart Mentat 8806 or stop the pod. F5 official evidence refresh completed 2026-09-30T21:44:18Z: all 468 frozen canonical bill IDs, 15 GovInfo type sitemaps, 6,284 dated cosponsorship events, zero errors; withdrawn events retained. Independent ZIP/XML replay confirms source identity, hashes, every event row and the original 511-member eligibility. There are 73 post-freeze events in 72 eligible members, below the unchanged minimum of 150. The current-roster count of 77 uses a different denominator. The frozen raw-row criterion is still affected by role-duplication cleanup, and H2's tier construction changed after the freeze; no new association, criterion substitution or look consumption occurred. The candidate archive is outside production. Prior archive_diff.json's title-based claim of 125 dropped bills was refuted: both archives contain the same 468 canonical IDs. Evidence on pod: /workspace/f5-check/F5_POD_RESULT.txt, criterion_receipt_v2.json, independent_final_receipt.json and official-refresh-20260930T214102Z/. Local preserved packet: matching Temp/claude session scratchpad/f6apply/f5-pod-evidence-20260930.tar.gz (2,256,246 bytes; pod SHA-256 11e7e8782af84cb9e2d7b29e7506d9a9259f88693663bb675cb867e5cdbe0b74).
- QME F6 RECORD OF PRIOR RESEARCH AND INSTALLATION (2026-09-30, scope limited to the cited artifacts): the adopted skill's references/sources.md lines 499-516 and references/regulatory.md retain the prior research's SR 26-2 / predecessor supersession, lda.gov migration and terms, AO 2021-05 distinctions, and CRA status with dates and applicability qualifiers. This recovery records that existing research; it did not reverify legal authorities, and these notes are not a legal determination. Read the register and its official URLs before making a current legal claim. The original install receipts under the matching session scratchpad/install record five requested Python packages plus 16 dependencies and eight requested R packages plus 10 dependencies, with existing versions unchanged; bs4 and matplotlib became importable in production. These are installation side effects, not engine-validation evidence. [[ledger/melange-systems-brain/D-006|D-006]] permits direct brain writes, while managed CLAUDE.md and BOOT still say draft for Paul; the explicit F6 apply approval governs this lane without changing either general text.
- MENTAT GIVING FORECAST (2026-09-30, forecast lane, worktree forecasting-model-audit-5603f2): Audit fixes to the Giving Forecast and the Insights forecast are applied and committed as Mentat 7287dbb50 ("Record the Giving Forecast and the Insights forecast fixes"). Two further sets are applied to the live Mentat checkout but ~~not yet committed~~ — superseded 2026-10-05: both are committed, the console clean-up as 56519c628 (2026-09-30T21:38:45Z) and the Sector Growth Study source as 04e2391e5 (2026-09-30T21:42:08Z) (source: git -C C:\Users\pgoff\Mentat log; drift-forecast.md F14): the console clean-up (the naive Insights "Forecasts" card hidden behind a per-browser setting; Chart Studio's transform labelled "Same-phase baseline") and the Sector Growth Study backtest (models 2a/2b, DESCRIPTIVE origins below the year-level residual-df gate, sector-equal MAE and MASE). The v2 forecast is being built on branch claude/forecast-build-20260930 in C:\Users\pgoff\Mentat-wt\forecast-build: an R refit pipeline that rebuilds the v1 bundle exactly from raw inputs (mentat/forecast/refit), data feeds (mentat/forecast/ingest), a Mentat anchor snapshot (mentat/forecast/anchors), shared JSON contracts (mentat/forecast/contracts) and the v2 console. ~~v2 is not yet published; landing into codex/mentat-crypto is pending.~~ — superseded 2026-10-05: v2 was PUBLISHED 2026-09-30T21:53:03Z (the pointer mentat/app/data/giving-models-current.json switches to refit-20260930-377f7324-c3f221343515 and ~~has not changed since~~ — superseded 2026-10-08: the pointer was switched again 2026-10-07T17:38:26Z to bundle d516dba6… (refit-20261007-d861bf29-79211caa154e, the cycle-aware 50/50 model, [[ledger/melange-systems-brain/D-113|D-113]]; previous kept as 7bc7bcf1…) (source: C:\Users\pgoff\Mentat\mentat\app\data\giving-models-current.json, read 2026-10-08); the v2 build described above is that publication) and landed in codex/mentat-crypto as e48c25b42 'Publish audited forecast v2 with immutable versions and explicit waivers' at 2026-09-30T21:57:13Z (source: the pointer file's switched_at_utc, read 2026-10-05; git -C C:\Users\pgoff\Mentat log -1 e48c25b42; drift-forecast.md F13). The 2020 contribution cycle never landed (four industries failed, Telecom stopped partway, Banking never ran; diagnosis in progress).
- MENTAT GIVING FORECAST, 2026-10-01 LANDING (still-true items from BRAIN_DRAFTS_2026-10-01.md section 1b, applied 2026-10-05 by the record-repair lane on Paul's approval; only this bullet verified; files under C:\melange-data\forecast-redesign-20260930\ unless a path says otherwise): the published model is intact: rebuilt from its 121 pinned raw inputs, all 5,082 numbers in the bundle agree within 3.3e-12 relative (source: reconcile\INTEGRITY_LEDGER.md:27-28 and row A2), and ~~the live pointer is still refit-20260930-377f7324-c3f221343515~~ — superseded 2026-10-08: the live pointer is now refit-20261007-d861bf29-79211caa154e (bundle d516dba6…, switched 2026-10-07T17:38:26Z; see [[ledger/melange-systems-brain/D-113|D-113]] and the GIVING BY CYCLE bullet above) (source: C:\Users\pgoff\Mentat\mentat\app\data\giving-models-current.json, read 2026-10-05 and again 2026-10-08). The F2 "Giving by cycle" view went live 2026-10-01T10:58:25Z (source: f2build\apply_f2_receipts\apply_20261001T105825Z.json) and, with the 10-01 fixes, is committed as Mentat f340dc84e 'Land the forecast integrity fixes and the Giving by cycle view' on codex/mentat-crypto, 2026-10-01 13:18 -04:00 (source: git -C C:\Users\pgoff\Mentat log -1 f340dc84e). The independent post-apply check passed: Python 181 run / 0 failed / 4 skipped, R 2,542 expectations / 0 failed / 0 errors, parity GREEN, JS 24/24 (source: apply20261001\review\final\REVIEW.md:10-11). The credit-union bands are narrow for Mentat's CU series (source: reconcile\INTEGRITY_LEDGER.md:71; ~~the model has not been refit since~~ — superseded 2026-10-08: the model was refit and published 2026-10-07 as refit-20261007-d861bf29-79211caa154e; whether the credit-union bands are still narrow was not re-checked, and credit unions' company-PAC measure is now the panel's 16-PAC cohort, [[ledger/melange-systems-brain/D-117|D-117]]). Optional hardening N1 (LOW: a lone-surrogate escape in a waiver-registry text field makes /api/forecast/catalog fail) is open: mentat/app/giving_forecast.py has no surrogate guard at f340dc84e (source: apply20261001\review\calc\round2\REVIEW.md:10 and :101; git show f340dc84e:mentat/app/giving_forecast.py, read 2026-10-05).
- MENTAT PAC GIVING FORECAST ACCURACY (2026-10-05, accuracy lane; only this bullet verified): attempt 3 (all sectors, method v6) was scored once (SCORE6B, FIRST_LOOK, lock engaged; REVIEW6 ACCEPT_WITH_NOTES) as a development result: banks and SchoolsFirst RESCORE; P&C, credit arms and telecom FIRST_LOOK_DEV; only telecom meets the E1 bar in every product; nothing certifies; HOLD unchanged. Current state: C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\HANDOFF_PAC_ACCURACY_2026-10-05.md (supersedes HANDOFF_PAC_ACCURACY_2026-10-04.md, which stays the attempt-2 record). Report (same link, version 3; sections 12 v5 RESCORE, 13 all sectors v6, 14 schedule): https://claude.ai/artifact/FatsU6m8xyePv2QnTTdyCx. Records: [[ledger/melange-systems-brain/D-088|D-088]] (rulings E1-E18), [[ledger/melange-systems-brain/D-100|D-100]] (attempt 2), [[ledger/melange-systems-brain/D-101|D-101]] (v6 method, results, rulings E19-E24, schedule), [[ledger/melange-systems-brain/DE-066|DE-066]] (ORIGIN from giving history alone), [[ledger/melange-systems-brain/D-099|D-099]] (the blend). Scheduled: score-pac-live-freeze-2026 2027-03-08 09:00 (its SKILL.md now scores the v3, v4, v5 and v6 2026 lines, read 2026-10-05) and seven pac-2028-* jobs 2027-02-08 to 2029-03-08. CODE FREEZE 2027-01-31: any change to the attempt-3 code after it ends the clean 2028 series. (source: the handoff sections 4, 6, 7; C:/melange-data/forecast-redesign-20261001-review/accuracy-refinement20261002/attempt3-allsector-20261004/receipts/REVIEW6.md and SCORE6B_RESULT.md; C:\Users\pgoff\.claude\scheduled-tasks\ directory listing and score-pac-live-freeze-2026\SKILL.md.)
- DAILY-REFRESH CLOCK FLAKE CLOSED (2026-09-20, Codex): Fix 203a69812 is on LIVE main (now a7a11b5df), mirror current. One-second slack covers all four verified_completion() lower bounds: ISO started_at and three file timestamps. Python 3.12 float/microsecond rounding and Python 3.13+ precise-clock/coarse-file skew are both covered. 30/30 normal and 40/40 amplified 56-test runs; 3,000/3,000 replayed launches each on 3.12 and 3.14; 97 related tests. LIVE kernel: 247 passed / 2 FAILED, daily-refresh suite clean; the standing reds remain test_bill_collision_guards and test_make_staffer_network_html. The older 243/4 kernel entry's "one flake" was test_press_baseline_fold, not daily refresh. The kernel overlapped the parallel refresh-tick landing; the 153 affected tests passed again on stable a7a11b5df. Scheduled tasks remain Disabled; W1/W2/W3 are outside this lane. [[ledger/melange-systems-brain/D-063|D-063]], [[ledger/melange-systems-brain/DE-046|DE-046]]. Evidence: C:\Users\pgoff\Documents\Codex\2026-09-20\temp-claude-c-users-pgoff-onedrive\outputs\flake-validation; original investigation: C:\Users\pgoff\AppData\Local\Temp\claude\C--Users-pgoff-OneDrive-Desktop-Melange-Systems--claude-worktrees-busy-kapitsa-3272db\fb2333e3-5291-496d-a7ad-6aa0c3419c2b\scratchpad\flake.
- FULL CHAIN BLOCKED AT STEP 3 + DAILY-REFRESH SMOKE RESULT (2026-09-19 evening, daily-refresh lane, session 92c2b25c; read-only findings plus one byte-exact repair, NOTHING else applied): the chain's intake gate `fec/audit_collection.py:448-456` (in place since 2026-09-01) REJECTS the interview corpus with "4 exact duplicate interview-turn groups". All four pairs were created at 2026-09-19T15:38:17 by the laundry-list lane's Paul-approved N12 v2 truncate-only migration (`speeches_turn_split_ledger`, tool `interview-turn-bleed-v2-truncate-only`): truncating the bled tail made a row byte-identical to a sibling with the same member/date/package. Rowid pairs: 193060/193063 (Schumer 2019-03-26 CNN; both truncated, originals differed), 190575/190576 (Grassley 2018-09-04 Fox; 190575 truncated), 189055/189056 (Gillibrand 2019-01-15 CNN; 189056 truncated), 103937/103939 (Tim Scott 2023-04-16 MTP; 103939 truncated). Nobody saw it because the refresh unit and that lane's chain run start `--from verify_collector_roster_updates.py` (step 11) and never execute steps 1-10 ([[ledger/melange-systems-brain/DE-045|DE-045]]). CONSEQUENCE: every FULL chain run halts at step 3 until this is resolved - the daily wrapper with media, the smoke, and the Sunday 06:00 weekly refresh's terminal FULL PIPELINE step. The fix is Paul's or the N12 lane's (options: delete the four redundant duplicate rows under the same ledger discipline; restore those five truncated rows from the ledger; or make the migration skip a truncation that would collide); the gate itself must not be loosened (C-025). SMOKE HISTORY (wrapper `refresh_congress_pipeline.py --smoke`, zero model calls each time): 09-13 17:00 collection PASS, chain died at step 17 on the Codex `extract_cu_bluesky.py` change, which was reverted to HEAD on Paul's ruling 09-13 23:00; 09-14 00:24 collection PASS, bluesky gold bound 15/15, chain passed step 17 and ran 46 min into `member_reference_layer.py --rebuild`, then run_pipeline.py was terminated externally (exit 0xFFFFFFFF, no power event logged, actor unknown); 09-19 18:40 (PID 81136, run dir audits/congress_pipeline/20260919T224030Z) collection PASS (admissions 381 s with `--limit 1 --no-llm`, media 1,227 s with the press lane parked), chain REJECTED at step 3 as above after 604 s. So the scheduler-owned process itself (lock, wake lock, per-step logs, status file, glassbox events, smoke mode, no-LLM admissions, PARTIAL parking, discovery defer, atomic-write retry) is proven; a complete chain PASS through the wrapper is still UNPROVEN and is blocked by three conditions outside this lane: the interview duplicates, the standing un-ratified audit reds ([[ledger/melange-systems-brain/DE-044|DE-044]]), and the 2026-09-21T03:41:10Z admissions freshness deadline (N19). REPAIR DONE 19:23 local: the smoke's `repository` step had rewritten `bill_repository_live.json` (sha 4f55cbc7...) and the early chain stop left `data/legislation/official_membership_movements.json` bound to the previous sha fdb12754... (the [[ledger/melange-systems-brain/DE-043|DE-043]] state: OM.load raises, desk and archive builders die). Restored byte-exact from the run's own before-snapshot: `bill_repository_live.json` fdb12754... and `data/engine/congress_bill_refresh_receipt.json` d8f1522a...; `official_membership_movements.load('.')` PASS, 5,704 facts; the smoke-written copies are kept in the session scratchpad `backup_smoke_20260919`. Workbook untouched (honors binding still 1f1bacbc...). Left as the smoke wrote them, and TRUE regardless of it: `data/engine/collection_intake_receipt.json` status REJECTED; plus ordinary collection outputs (social_media.db crec/chrg/bluesky rows, Social Master.xlsx, Quorum Processed.xlsx, big5 / disposition / member_reference artifacts). WRAPPER DEFECTS FOUND, NOT FIXED (the session is worktree-bound and the edit guard refuses live-tree writes; presented to Paul): W1 no rollback - any chain stop before step 11 leaves the fetched repository unbound from the sidecar, so with the intake gate red EVERY daily run would break the desk; the fix is for the wrapper to restore the repository file and fetch receipt from its own before-snapshot when the chain fails before `verify_collector_roster_updates.py` completes. W2 `fec/daily_refresh.py` has no per-day attempt cap: on a day that cannot reach PASS the hourly retry task reruns the multi-hour chain forever (16 attempts on 09-13). W3 `fec/legislation/open_congress_pipeline_monitor.ps1` passes `$watcher` and `$Root` to Start-Process unquoted; both contain the space in "Melange Systems", so the new window dies instantly - wrap each in quotes; the watcher itself works and was opened directly. The subsystem is now COMMITTED (live-tree reconcile 2026-09-19); both daily tasks are Disabled; AppXSvc (svchost) was again holding 50 GB of commit on 09-19 (67.6 GB on 09-13 killed a smoke with MemoryError) and needs an elevated restart.
- CHAIN DEADLINES + 2026-09-19 REFRESH (laundry-list lane, packet audits/laundry_list_closeout_20260918, DECISIONS_FOR_PAUL.md last section): NEXT FAIL-CLOSED DATE 2026-09-21T03:41:10Z - data/legislation/sentinel_admissions.json (oldest per-bill decision 2026-09-13T03:41:10Z, 8-day window, fec/legislation/sentinel_admissions.py:24,:33,:45) makes build_archive_legislative.py raise at import, which stops the chain and the desk; refreshing it is a PAID claude-cli step and is NOT authorized - Paul's spend + model ruling (N19). The 2026-09-22 membership deadline is RETIRED: on Paul's 'refresh the membership file' the free unit `python fec\legislation\update_bill_repository.py --rebuild-dashboard` ran 2026-09-19 15:46-16:13 local (473 bills refreshed, all 67 chain steps ran); data/legislation/official_membership_movements.json is PASS, checked_at 2026-09-19T19:46:30Z, hash-bound to the refreshed repository, NEW EXPIRY 2026-09-27T19:46:30Z. Never refresh the repository without the chain ([[ledger/melange-systems-brain/DE-043|DE-043]]); exit 1 / publication FAIL from that command only reflects standing audit reds ([[ledger/melange-systems-brain/DE-044|DE-044]]). THAT RUN MOVED 279 OF 533 RANKS (max 68: Wied 366->434 on one adverse Interchange cosponsorship, H.R.7035, topic weight 2.0) from 21 new cosponsor links and 3 action changes; only the legislative pillar changed, 151 movers by displacement only, nothing lost (receipts measRefresh). AUDIT 559 passed / 9 FAILED: the seven standing reds (data/engine/pillar_inputs_snapshot.json vintage over 14 days since 2026-09-17, audit_full.py:815; personal-texture; five A2/A2b manifest checks) plus two new - 'champions threat boards fresh vs live crown set' (one row, Pete Sessions, bank: champions_v2.py at run_pipeline.py:215 runs BEFORE make_member_desk.py at :285 and by design reads the PREVIOUS cycle's desk bundle (run_pipeline.py:223-225), so any change in the top 13 reddens it until the next chain; the free clear `python fec\run_pipeline.py --from champions_v2.py` (18 steps, zero LLM) was NOT run - Paul's GO; N17). THE PRIMACY BOARD MOVED IN THAT RUN (N18, rank_honors generations 049fbd78 -> 6df55c40): Sessions seat 15 -> 13 = tier 1, Meuser 13 -> 14 = tier 2, Moreno tier 0 -> 3 (seat 211 -> 80), Ryan tier 3 -> 0 (seat 85 -> 181), 416 of 533 seats changed occupant, seats 1-12 identical; none of the four had any change in his own evidence - factor_ranked shrinks members under 15 agenda credits toward a roster-wide baseline (primacy_factors.py:438-457), so other members' new credits move them while fully evidenced members stand still; Sessions leads Meuser by 0.0018 and holds seat 13 while the baseline stays above 0.474393 (live 0.482222); the factor/grade split is UNKNOWN because the before versions of data/engine/primacy_factors.json, data/engine/per_area_grade.json and member_desk_bundle.json were overwritten uncopied - COPY THOSE THREE BEFORE ANY REFRESH; lobby-champions.html still shows Sessions as the top bank threat while the desk and Moneyball.html show him crowned and 'A2b mirror.melange sentinels unchanged' (the mirror repacked; build_system_manifest.py is not a chain step). Later date: 2027-01-03 data/members/formal_visibility_roles.json valid_until (compute_pillars.py:126 fatal). The MoneyballCongressRefresh scheduled task is still Disabled.
- LIVE-TREE EOL CENSUS + LINE-WISE CUTTER (2026-09-19, worktree vibrant-sammet-a549a5, Claude Fable 5.1): a spawned task reported ONE bare-LF line in LIVE fec/audit/dashboard_integrity.py that made a string-replacement patch anchor fail while a normalised hash said 'no drift'. READ-ONLY CENSUS, three snapshots as main moved under it (776ce0d3a, 333cafbf3, 35521f9aa): that file had 88 bare-LF lines in 11 hunk-shaped runs (the landing's merge then rewrote it uniform CRLF); at 35521f9aa 2,892 tracked text files are 949 pure CRLF / 1,622 pure LF / 312 MIXED (279 code) / 9 without a terminator; all 312 are content-identical to HEAD with pure-LF blobs, so every mix is working-tree-only; the one in-scope file differing from HEAD is data/system/system_manifest.json; 216 of the mixed files were last written 2026-08-04/05 (the reorg window - a last-write date, not an origin); untracked 28,464 text files, 93.1% pure LF, 78 MIXED, 741 OneDrive placeholders skipped unread. An independent byte recount matched 15 of 15. LAB (git 2.54.0.windows.1, throwaway repos): a live-only mix is invisible to diff, hash-object and blame; `git status` flags size against the index, not content; a working-tree normalisation would create 1,934 phantom ` M` rows; `* text=auto eol=crlf` fixes nothing and overrides [[ledger/melange-systems-brain/D-048|D-048]]'s export flags; a plain `git apply` of an LF-only file-patch rewrites the whole file as CRLF. APPLIED on Paul's 'Reconcile those loose ends and apply': fec/tools/live_patch.py + fec/tests/infra/test_live_patch.py (92 tests) + the run_tests.py registration, commit 423820d76, fast-forwarded into LIVE main from 35521f9aa with every precondition checked (no lock, nothing staged, three paths clean). KERNEL in LIVE at 423820d76: 243 passed / 4 FAILED in 31.9 min, the new suite green in the runner (`test_live_patch suite clean`; 92 of 92 when run alone from LIVE). The four reds: the two the laundry-list landing already carried (test_bill_collision_guards - backups\bill_directions.PRE-LEGFIX3.csv is missing; test_make_staffer_network_html - unrecognised verdict); test_staffer_network_section, red ONLY because its producer child for case v6-groups-real-role sat 14 minutes with no CPU and no I/O (the test's subprocess.run has no timeout) and this lane killed that one child so the run could finish - diagnosed the same day: the child froze inside `import scipy` (reached through build_staffer_network_section.py:69 -> fec/staffer_network/member_context.py:10) while the Windows loader was bringing up SciPy's BLAS/LAPACK extension modules and a second OpenBLAS thread pool (numpy.libs and scipy.libs each ship one) - pinned by matching the frozen process's I/O counters (946 reads, 9.2 MB) against an instrumented healthy run, which passes that exact count at scipy.linalg._fblas/_flapack; NOT reproduced in 88 launches (load-dependent: producers were running 6x slower than idle at that minute), native frame not determined, most probable cause a loader-lock race in OpenBLAS thread-pool start-up; the case name is irrelevant (the freeze is before any fixture is read); pre-existing and not this lane's (it touched neither suite nor producer). PRODUCTION IS EXPOSED: fec/run_pipeline.py:621 and fec/tests/run_tests.py:900 launch children with no timeout, as does the test (since 57f993316, 2026-09-07), so one frozen child stalls a chain or kernel run silently and forever. APPLIED on Paul's 'add the timeout to the staffer test' (99caafa95, fast-forwarded into LIVE main from abb448a27, mirror current): fec/tests/surfaces/test_staffer_network_section.py launches the producer with Popen + real temp files + wait(180 s) + kill ([[ledger/melange-systems-brain/DE-026|DE-026]] shape), a timeout is its own named failure ('producer finished within 180 s', pid and arguments) so it cannot pass for a refusal a case expects, and main() records an exception and still prints the 'N passed, M failed' tail; healthy path 210 passed / 0 failed in the worktree and in LIVE, and with the timeout forced to 0.05 s on every launch, on the 6th and on the 22nd (the 09-19 case) the suite ended in 0.2 s, 58 s and 73 s with a named failure and a parseable tail (0/3, 209/2, 206/3). THE TWO LAUNCHERS ARE BOUNDED TOO, on Paul's 'add the timeouts to run_pipeline and run_tests too' and 'land it when the architect is done' (624e593eb, fast-forwarded into LIVE main from 99caafa95 with no chain or refresh process running, mirror current): fec/bounded_subprocess.py is the one shared launcher - Popen with both streams on real temp files, wait(timeout), and on overrun a kill of the process TREE (taskkill /F /T, itself bounded), never subprocess.run(capture_output=True, timeout=...) ([[ledger/melange-systems-brain/DE-026|DE-026]]); any other exception during the wait (a Ctrl-C on a console chain run) also kills the tree before it propagates, because the unwinding releases .pipeline_run.lock and an orphaned step would keep writing while a second chain may start. Bounds are constants sized from measurement, no new env dial: a chain step 10800 s, 2.6x the slowest step on record (4,148.7 s, personal_texture_layer.py, 677 recorded step-runs of 78 steps in the Glass Box pipeline.step stream); a kernel suite 1800 s, more than a whole healthy kernel run; on Windows 8+ the wait does not count time asleep. A timeout returns 124 with a note naming pid and arguments in stderr, the step line and the Glass Box summary; 124 is not the tolerated code 2, so a timed-out step halts the chain through the existing failure path even inside TOLERANT_STEPS and the lock is released. Design Fable, code an Opus architect, reviewed inline (the interrupt-parity gap was the review finding). test_bounded_subprocess 19/19 (synthetic children; drives run_pipeline.main() against a fake sleeping step with lock, preflight and Glass Box stubbed; pins the run_tests.py wiring as text; a parent-only kill left the grandchild's heartbeat growing in the negative control). KERNEL IN LIVE at 624e593eb through the new launcher: 246 passed / 2 FAILED in 7.6 min - exactly the two baseline reds (test_bill_collision_guards, test_make_staffer_network_html), so the earlier 243/4 was the stall plus one flake. NOT RUN: the real chain (first real use is Paul's next chain run). NOT CHANGED: fec/weekly_refresh.py's own step launcher (:279 communicate(timeout=), :312 an unbounded proc.wait() after its kill), and its whole-chain bound of 7200 s (:464) sits below the 261.6 min the chain has once taken; per-producer atomicity under a kill is unaudited (artifacts are written temp+replace, but a producer with several outputs is not transactional); import scipy lazily in member_context.py (every fixture and any run without a member network builds a 0x0 matrix and needs none of it); OPENBLAS_NUM_THREADS=1 for the producer. Evidence: session scratchpad staffer_hang\; and test_press_baseline_fold (errors=1 inside the kernel, 21 of 21 OK re-run alone minutes later: a flake under load, suite unchanged since 2026-08-30). Without the stall and the flake the expected figure is 245 / 2. The mirror was pushed on Paul's word: main 423820d76, 293 of 293 local branches present and current, tags 3 of 3, no force. Nothing in LIVE was EOL-normalised and no .gitattributes was added. Brain: [[ledger/melange-systems-brain/D-060|D-060]], the dead end beside it, three CONSTRAINTS bullets, the [[ledger/melange-systems-brain/D-048|D-048]] caveat. OPEN: fec/tests/infra/test_process_liveness.py exists but no runner registers it (found in passing, not touched); [[ledger/melange-systems-brain/DE-040|DE-040]]'s in-repo/outside-repo reading was not reproducible and is left as its lane wrote it; existing packet cutters (audits/laundry_list_closeout_20260918/fix*/) are history and were not rewritten. Records: session scratchpad eol_census\ (snapshots A/B/C, compare_abc.txt, index_stat_vs_disk.csv) and eol_lab\ (results.json, results_e9.json); memory live-tree-eol-census-2026-09-19; Glass Box run_id eol-census-apply-20260919.
- LAUNDRY-LIST CLOSE-OUT + LANDING (2026-09-18/19, worktree unfinished-work-handoff-a3bbad; packet audits/laundry_list_closeout_20260918 on main): the 2026-07-16 handoff's 'NOTHING has been applied' was SUPERSEDED the night it was written (391a4a8b5, merged e58a807da; AUDIT_COMPLETION_REPORT_2026-07-16.md) and its band item by [[ledger/melange-systems-brain/D-031|D-031]]; HANDOFF_LAUNDRY_LIST_2026-07-16.md now carries a SUPERSEDED annotation and every claim is reconciled with receipts in the packet's LEDGER.md. Six fixes were built test-first, reviewed inline and LANDED 2026-09-19 on Paul's 'GO on all your recommendations' then 'land it' ([[ledger/melange-systems-brain/D-052|D-052]]..[[ledger/melange-systems-brain/D-057|D-057]]): live main 776ce0d3a -> 333cafbf3 -> 109249aaa, the two producer hooks committed by the reconcile lane as da32d3016. PROTOCOL IN LIVE: kernel 237/2 -> 244/2 (the same two pre-existing reds); chain --from build_archive_legislative.py, 31 min, 65 steps OK; ranks 2 of 533 moved ONE place (Ogles 39->38, Sessions 38->39), fully explained by [[ledger/melange-systems-brain/D-055|D-055]]; audit 563/5 -> 561/7, the two new reds being system_manifest sentinels for files that run regenerated (bank_anchor_reconciliation.json, per_area_grade.json) - data/system/system_manifest.json was not rebuilt and not hand-edited, so they stay red until its own lane rebuilds it. OPEN FOR PAUL (packet DECISIONS_FOR_PAUL.md, FIXES_AND_LANDING.md): R2/R3 reference-layer scoring model and the paid --score pass (19,618 of 36,148 contexts unscored; 19,537 of 19,793 cache rows record no model); N12 DONE 2026-09-19 as version 2, TRUNCATE-ONLY ([[ledger/melange-systems-brain/D-062|D-062]]), on Paul's 'GO on the truncate-only v2': independently graded (cut precision 90 of 90, 935 of 935 cut tags real), APPLIED to LIVE social_media.db (5,477 INTERVIEW rows truncated, 807 skipped including every gold-bound and credit-union row, 0 inserted, 13 of 13 checks against backups\social_media.PRE-TURNSPLIT-20260919.db; `migrate_interview_turn_bleed.py --restore --db <path>` is byte-exact from the table speeches_turn_split_ledger) and LANDED on main ce0dc5b21 (kernel 247 passed / 2 FAILED, the same two pre-existing reds; collector dial IV_TURN_TAGS=2, the collector only INSERTs so a re-fetch cannot rewrite a protected row); the interview stance channel is byte-identical, so no rank input moved; reference edges 8,010 -> 7,884 as the mis-attributed mentions left; v1's split-and-insert shape stays rejected ([[ledger/melange-systems-brain/DE-042|DE-042]]); no raw transcript archive exists; N13 the Risch 2020-02-23 gold interview item scores Chris Wallace's voice-over; N14 measured 2026-09-19, NOT mechanical: the engine scores press_stance_final.csv plus overrides while the desk displays the sheet label, 33 of 57 still differ after both override steps, and Paul's two label files conflict on 4 of them - his ruling (packet DECISIONS_FOR_PAUL.md); N15 CLOSED 2026-09-19, no defect (all 23 are role-supersessions, 0 withdrawals; the desk shows the official role on all 6,130 bill rows); N6 PERS parity drift (no-stance 0.45 vs Ally 0.40 under an 'Ally parity' ratification); N3, N7, R8, R9, A6, D6. WITHDRAWN on evidence: N5 ([[ledger/melange-systems-brain/DE-037|DE-037]]). Method dead ends: [[ledger/melange-systems-brain/DE-038|DE-038]]..[[ledger/melange-systems-brain/DE-040|DE-040]].
- LIVE-TREE RECONCILE (2026-09-19, worktree objective-booth-56caf1, Claude Fable 5.1): the Melange LIVE tree's uncommitted drift is committed. On Paul's word (he answered the presented inventory, plan and twelve rulings with "Do whatever is most optical, there should be no caps") 35 whole-file commits `d97e775ae`..`a19c796d2` landed on main on top of the laundry-list landing `109249aaa`: fec/paths.py staffer-storage roots; process liveness / pipeline lock / failure gate (main's `os.kill(pid, 0)` liveness probe TERMINATES the probed process on Windows - the fix had lived only in the working tree since 2026-09-08); the four chain producers main's CHAIN named but git never carried (`apply_fec_money_refresh.py`, `build_vote_category.py`, `build_member_longform_turn_features.py`, `regenerate_member_profiles.py` - `run_pipeline.py:452-453` validates producers at import, so a clean checkout died before step 1); long-form audio; the daily-refresh subsystem; press collector repair and press-stream supplement; the audio candidate gate; legislative-effectiveness shadow modules; staffer reconciliation and the live sidecar; the 2026-09-14 code-review apply in ten commits by review lane; audit_full.py; the desktop launcher; both research packages (source only); lane records; the system-manifest PRODUCER; two SKILL.md edits; and the laundry-list lane's five hook paths in one commit at its request (`da32d3016`). MEASURED: `git status` 498 -> 279 entries, modified 149 -> 11, untracked source under fec/ 264 -> 0; chain producers untracked 4 -> 0 of 80, and 1,658 tracked .py blobs compile from git objects except the pre-existing `fec/stance/api_stance_layer.py` IndentationError (line 35, both trees); an independent re-census of the new HEAD took the references a clean checkout cannot resolve from 248 to 28 - every remaining row names the generated 59.7 MB `cu-member-desk-profiles.js` payload - after it caught one gap this lane had introduced (three fec/speech tools importing an untracked audits/ script; closed in `a19c796d2`). FINDINGS THAT OVERTURN RECORDS: the close-out packet's "part of the modified count is CRLF-only" was false (0 of 149; all 147 text files functional, +7,453/-2,281); the live tree was AHEAD of HEAD in all 1,341 changed regions (0 behind, 0 diverged), so whole-file commits reverted nothing; the 71-file one-minute batch of 2026-09-14T05:58Z was the five-lane code-review apply (90 of 90 patches per that session's transcript; byte-exact pre-images in gitignored backups/code_review_20260913; packet only at commit `77959ae74`) and it was NOT class-A-only - 22 class-B (Paul-gated) patches fully present, 5 partial, 2 class-E full, 2 partial; the "bluesky pair breaks chain step 17" note in the DAILY REFRESH bullet is stale (`extract_cu_bluesky.py` equals HEAD; only `tweet_collector.py`'s verified-handle filter remained, now committed). RECORDED, NOT RATIFIED ([[ledger/melange-systems-brain/D-051|D-051]]) - still Paul's: R1 the class-B/E code-review content; R2 the 2026-09-08 rule that imputes industry money on `industry_money_missing()` instead of `receipts == 0` in flip_model / budget_frontier / per_topic_flip / salience_shock (output-affecting; the commit also drops the comment recording the FEC re-verification behind the old rule); R3 audit_full's "exactly 644 classified acts" re-pinned to "644 baseline plus evidence-backed admissions" (live data stands at 653 desk acts). HELD OUT ON PURPOSE, still modified in LIVE: 7 `collector_sentinels/*.done`, `data/money/Moneyball_email.zip`, `data/stance/own_source_stance_model.joblib`, `data/system/system_manifest.json` (regenerated 2026-09-18, not committed: generated), `fec/liwc/behavior_calibrated.json.candidate`. OPEN FOR PAUL beyond R1-R3: whether to untrack those runtime/generated files; the 10 MB `congress-legislators` YAML pair under data/staffer_network/reference that committed engine code reads (`per_area_grade.py:104`, `build_rank_honors.py:39`) - left as a named data-plane input; ignore rules for outputs/, tmp/ and the audit evidence stores (not done; 46,843 untracked files remain, none of them fec/ source); about 900 untracked lane scripts and evidence copies under audits/ (592 of them in label_correction_20260913) - unsorted; `tmp/patch_senate_population_dashboard.py:22` and `tmp/promote_dashboard_adjustments.py:17` import `_atomic_copy`, which the live `update_bill_repository.py` no longer defines (broken in both trees); the mirror push. Every commit was checked to hold exactly its group's paths, leave them clean and leave nothing staged, and each emitted to the Glass Box stream (run_id live-tree-reconcile-20260919). Brain [[ledger/melange-systems-brain/D-051|D-051]], [[ledger/melange-systems-brain/DE-036|DE-036]]. Records: the commit messages; the session scratchpad packet census\{A,B,B2,C,D,PLAN}; memory melange-live-tree-reconcile-2026-09-19.
- MENTAT RECONCILE, SECOND PASS (2026-09-19, worktree mentat-uncommitted-reconcile-4089f1; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): Paul answered the first pass's six open items with "Keep going, finish all of this" (three times), so all six were worked and eight more commits landed, `193337707`..`a6c3129d8`; `git status` is empty again. (1) FILING VERSIONS. Measuring the rule committed as `a63fabefd` found first that NO VERSION 3 transfer index had ever been built: the three indexes under the active FEC source (mentat/.cache/repair-20260908-inputs) were VERSION 2 from 09-08, R/fec_transfer_graph.R refuses anything but the current version, so every report build since the rule was written on 09-10 published its Conditional Non-opposition / Opposition / Estimate columns as 0.00 behind a `warn`, with no export guard covering it; direct attribution was unaffected. Nothing rebuilds a stale index and refresh_fec_sources.py has no production caller. The index was built and published that night. The measurement then showed the rule itself was wrong: committee|report_type|transaction_id is not an identity, because filers reuse a line label as the transaction id (`SE.5` on every Schedule E row, `SB22.n` every year), so unrelated transactions collided and were all withheld, and one ambiguous row blacklisted its whole committee. Cost on the real files: $152,497,610 of clean transfer edges blocked across 119 committees, $52,615,213 held unresolved, and $7,631,886 removed from the counted committee-to-candidate total. Filing headers cannot fix a key collision. The identity rule ([[ledger/melange-systems-brain/D-049|D-049]]) was built and measured as a patch in a scratch export, reviewed inline (the class that remained "ambiguous" was still reused labels a year apart; the test became: candidate versions must agree on the amount OR the date), and APPLIED as `12a880dc9` on Paul's repeated instruction: transfer index VERSION 4, PAS2 parser "5", default count_latest. Measured: counted transfer dollars $9,761,520,102 -> $9,839,756,394, blacklist losses -> $0, unresolved -> $325,734, blocked committees -> 0; $7,621,886 of the PAS2 dollars return; no identity counted more often than any one filing showed it, on all six ledgers and 1,624,835 PAS2 keys. The rebuilt VERSION 4 index lands almost exactly on the 09-08 VERSION 2 counts (2022: 2,794 superseded or duplicate rows both times; 1,597,614 current against 1,597,613), with 1 / 0 / 3 genuinely ambiguous groups. The one judgement call (withhold or count the latest) is worth $65,000 of transfers and $117,349 of PAS2 and flips with one constant on each side. Revert = one `git revert` and an index rebuild; the VERSION 2 and 3 published files are kept in the session scratchpad. Packet audits/mentat_filing_versions_20260919 (V3_MEASURE_REPORT, MEASUREMENT, RULING_REQUEST, the patch as cut, the kit and every result file). No workbook was rebuilt and no database touched: rebuilding is Paul's. (2) CROSS-REFERENCE SWITCHES (`f8908029a`): -CrossReferenceMaxRequests and -CrossReferenceOffline now travel through every launcher and the worker spec; an online cross-reference that fails is retried once offline and the build continues with cross_reference_mode = offline_fallback in its receipt ([[ledger/melange-systems-brain/D-050|D-050]]). The everyday rate limit was never fatal (cross_reference_store.py already records 403/429/5xx as recovery failures); what escaped were a key-store failure, a locked budget database and an unreadable cache entry. Fable's review caught that the first version returned the mode from a PowerShell function that also ran python, so the receipt field became an array of python's stdout and the lines vanished from the build log; fixed by passing the mode by reference and proven against real redirected child processes ([[ledger/melange-systems-brain/DE-035|DE-035]]). `a539d1ff1` gives refresh_fec_sources.py --filing-header-directory. (3) The receipt-evidence gate refuses NOTHING at HEAD (Crypto 0, Credit Union 0; `7d364883e` changed it, and the code before it refuses 65 and 1 on the same rows), so a real tidy orchestrator run is no longer blocked; the tidy proposal's section 7 items stand on their as-built defaults. (4) CHART STUDIO BOARD built and committed `3eeb99e00` (19 files, +4,208/-183): Canvas mode shows 1, 2 or 4 sheets of one view, each tile with its own title, scope and reconciliation line; contract studio_api.json v2 (`board` = {tiles, slots}, written only for 2 or 4 tiles, v1 views byte-identical); Console.save_view refuses a malformed board with 400. Three independent live verification passes against a real console reproduced the contract exactly and found six defects no stubbed suite could see (pager redrawing the hidden canvas under a wrong label, a map in a tile never drawing, one Undo discarding the board, Cancel leaving tile requests flying, a stale cross-source tile cache, a refresh blanking every tile while Cancel claimed otherwise); all fixed, tiles are reconciled in place. The running console serves the new client at once but drops the `board` key on save until the launcher restarts it. It coexists with the older "N charts" split strip. (5) Fourteen hand-curated registers and rosters under mentat/inputs are versioned (`193337707`): a writer census found no tracked code that rewrites them and no sensitive content; active_fec_sources.json and the bulk folders stay out. `236a42058`: a checkout without the FEC bulk snapshots now fails with an actionable message, and the console tests no longer need them. `1533eef7f`: three more browser suites stopped opening the real report folder. VERIFIED: a byte-faithful BARE export of `a6c3129d8` (356 of 356 files hash-match their blobs; nothing supplied - no register, no bulk folder, no cache, no state) runs all 150 test files green: 73 Python, 40 Node, 25 R, 6 PowerShell, 6 app suites; EXPORT-ONLY 0, pre-existing reds 0, flakes 0 (the first pass measured 90 of 147 bare). Six steps skip visibly in a bare export: the R-ingest console test and two real-master smoke tests (no FEC bulk folders), the panes suite's two saved-snapshot steps (no mentat/.cache), and tests/test_industry_routes.py:445, an unconditional skipTest that cannot run anywhere and predates this lane. Every R source(), JS import and HTML asset resolves. The live tree's `git status` stayed empty throughout. STILL OPEN: Paul re-runs the launcher (new server.py for the Board, graph_data.py, report_insights.py) and rebuilds workbooks himself - the first rebuild reparses PAS2 once (about 3 minutes) and is the first since 09-10 to carry real Conditional estimates; the console does not expose the two cross-reference switches; mentat/state/accepted-report-sources and mentat/state/cross-reference are durable state, not cache. CLOSED LATER ON 2026-09-19, on Paul's "Finish the still-open items and push to the mirror": the last two suites run on a temporary report root and the acceptance test that could never run now runs read-only against a real workbook, skipping visibly in a clean checkout (`c2822afd6`); the replaced VERSION 2 and 3 index records live under mentat/.cache/transfer-index-backups-20260919 (`59a87a70b`); codex/mentat-crypto and main are on the mirror at `59a87a70b`, verified sha-identical (38 commits since `39e5e7dd6`). RULED AND DONE: Paul then ruled "Remove the N charts strip, keep the Board"; the split-view strip is retired in `2b1a62dea` ([[ledger/melange-systems-brain/D-061|D-061]]): app/chart-comparison.js deleted, linked filters, independent panes and the three-chart layout go with it, an old ?studioPane= link opens the ordinary studio (url_scope.json v4: retired, ignored, preserved), every response carries frame-ancestors 'none' again, 27 of 27 suites green, and an independent live pass found no defect (old persisted pane state does not trap the reader; nothing stored is deleted). At 1440x900 Builder went 47 -> 41 controls and the chart 613 -> 553 px from the top; Canvas 440 -> 338 px; Board 2 506 -> 404 px. Mirror verified at `2b1a62dea`. Brain [[ledger/melange-systems-brain/D-049|D-049]], [[ledger/melange-systems-brain/D-050|D-050]], [[ledger/melange-systems-brain/DE-033|DE-033]], [[ledger/melange-systems-brain/DE-034|DE-034]], [[ledger/melange-systems-brain/DE-035|DE-035]].
- MENTAT UNCOMMITTED RECONCILE (2026-09-18, worktree mentat-uncommitted-reconcile-4089f1; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): on Paul's order ("go over all of them reconcile, and commit ... if there is unfinished work ... finish it") the checkout went from 273 dirty entries to an EMPTY `git status` in 28 feature-scoped commits `1d4524048`..`755680241` on top of `39e5e7dd6`: 37 modified and about 60 untracked source and test files, three docs, the lane packets and 197 outputs/ lane notes. NOTHING WAS DELETED: the 167 dated `*.bak-*` copies, `.tmp/`, `reports/*`, `mentat/state/`, the raw-contribution extracts and ndjson dumps under outputs/, and node_modules are now IGNORED (a root-level `git add` would have staged 37,918 files / 1.3 GB); `mentat/config/report-directory.json` and `mentat/inputs/fec_receipt_rules.json` (ruleset 5, byte-identical to the xref packet's v5 snapshot) are tracked past the ignore rules. THE FINDING: the working tree was what ran (today's cross-reference run evidence holds the then-uncommitted paths.R byte-for-byte; MENTAT.exe was built the same minute as the uncommitted Launcher.cs) and HEAD was broken without it in twelve places: the exporter sourced untracked R/state_destinations.R; four launchers imported untracked tools/report_directory.psm1; recheck_attribution.py shelled to an untracked R script; crypto_workbook_builder.mjs imported untracked read_report_payload.mjs; comparison_data.py read report['people'], which only the uncommitted graph_data.py produced, so /api/comparison answered 500 on any clean checkout since `97eaa7581`; nine client modules read `accounting`, which only the uncommitted report_insights.py produced, every read guarded with `|| {}`, so every unsafe-total refusal silently never fired; tidy_stage.R read transfer_records with no committed producer; console chrome selectors lived only in the uncommitted style.css; the browser fixture did not accept the committed server's summary(include_archived); and three committed tests were red against committed code. Cause: whole-file and hunk-exact commits took sources and left their tests and sibling files behind. UNFINISHED WORK FINISHED: singleflight_cache gained a bounded wait (SINGLEFLIGHT_WAIT_SECONDS 120, then the waiter reads for itself as plain lru_cache would; only the leader removes its token; negative-controlled); test_startup_performance.py was red because its stub lacked the build-identity fields `5c5aa6bfe` made the launcher require, so the launcher timed out and each run leaked a console (now green in about 4 s, teardown stops what it started); test_evidence_map_browser.cjs rewrote a TRACKED receipt PNG on every run (now only under MENTAT_EVIDENCE_MAP_SCREENSHOT; both re-rendered PNGs restored, not committed); `var(--ink)` was undefined in the console's stylesheets; the empty-candidate label read `Unresolved candidate ()`; README and METHODOLOGY described a Cross-reference tab with totals and now state the [[ledger/melange-systems-brain/D-040|D-040]]/[[ledger/melange-systems-brain/D-043|D-043]] rule and the no-totals tab; the tidy packet marks all fifteen patches landed (P6c and P7b rode inside `825ac3b12`). Then a clean export found eight red suites, all TEST or CONTRACT defects, none in the application: four Chart Studio suites `965103db4` never swept (scope chips, "Change data", the data-source panel no longer folds; the worksheet guard's real assertions had never been reached and now pass), contracts/url_scope.json at version 3 against a scope.test.js asserting 2 with one example in the negative controls' envelope (`491570a0b` never re-ran the suite), the panes suite's step 29 requiring gitignored mentat/.cache/pac-evidence, the briefing-tray suite expecting the UTC date where the application names files by the local day (red every evening), and export wording `f64316daa` changed. VERIFIED: a byte-faithful export of `755680241` (git archive with autocrlf off; 339 of 339 files hash-match their blobs) runs all 147 test files green - 72 Python, 39 Node, 25 R, 5 PowerShell, 6 app suites - with EXPORT-ONLY 0 and pre-existing reds 0; 137 of the 147 pass with no gitignored input supplied at all (90 before `17f7bf313`), and the other ten need only named registers under mentat/inputs. The panes suite skips two of its 32 steps in a clean export (no saved snapshot there) and runs all 32 live. The live tree's `git status` stayed empty and all 20 top-level mentat/inputs files kept their hashes through both verification runs. Secret scan over all 353 files committed in the first pass: 0 hits, scanner negative-controlled. RULINGS MADE IN LANE, each reversible: Launcher.cs committed because source must match the shipped binary and [[ledger/melange-systems-brain/D-029|D-029]]'s restart flow needs every launch to reach Start-MentatApp.ps1; the contribution-studio tests committed because they test shipped code (whether that unlinked page stays is a separate call); S2_commit_receipt.md committed despite its own "untracked by design" line, since a commit receipt cannot sit inside its own commit; the 33 MB tidy mock workbook stays out of git with its receipt tracked. OPEN FOR PAUL [all six worked on 2026-09-19 - see MENTAT RECONCILE, SECOND PASS]: (1) filing-version v3 (`a63fabefd`) excludes EVERY competing version of a transaction as "Unresolved filing relationship" and refresh_fec_sources.py builds the base transfer index with no header evidence - METHODOLOGY v5's design, but the opposite instinct from [[ledger/melange-systems-brain/D-040|D-040]]; the v2 indexes showed 48 to 2,794 superseded rows per cycle, so the exposure is small but unmeasured under v3; (2) every report build makes up to 100 live FEC requests and a failed cross-reference fails the build, and no caller passes -CrossReferenceOffline or -CrossReferenceMaxRequests; (3) the receipt-evidence ruling that blocks a real tidy orchestrator run (Crypto 80 rows, Credit Union 4) and the tidy proposal's section 7; (4) the Chart Studio Board is still unbuilt (contract v2 drafted in a scratchpad, unapplied); (5) the small text registers under mentat/inputs (overrides, aliases) are unversioned, and some change with every run; (6) mentat/state/accepted-report-sources and mentat/state/cross-reference are durable state, not cache. Console 8806 was never restarted by this lane; Paul re-runs the launcher to pick up graph_data.py, report_insights.py and style.css as committed. Brain [[ledger/melange-systems-brain/D-048|D-048]], [[ledger/melange-systems-brain/DE-031|DE-031]], [[ledger/melange-systems-brain/DE-032|DE-032]]. Records: the commit messages themselves, audits/mentat_tidy_workbook_20260914 (status notes), memory mentat-uncommitted-reconcile-2026-09-18.
- MENTAT CONSOLE STARTUP HANG (2026-09-18; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): FIXED and COMMITTED as `0ad366e01` (the server fix plus mentat/tests/test_console_build_stamp.py; 2 files, +526/-9) and `aa8a3f884` (three browser suites realigned; 3 files, +175/-63). THE FAULT: `/api/session?light=1` could never answer on a checkout whose gitdir sits under OneDrive. `build_status()` called `git_sha_cached()`, an `@lru_cache` wrapper around `subprocess.run(['git','rev-parse','--short','HEAD'], capture_output=True, timeout=10)` on the request thread, and two defects stacked - `subprocess.run` re-enters `communicate()` when its timeout fires and blocks forever joining the pipe-reader threads of a child that will not die, and `@lru_cache` does not serialise concurrent callers, so one page load raced two request threads into the lookup. `init()` in `app.js` never resolved and the console window hung at startup. THE FIX, three parts in `mentat/app/server.py`: `git_sha_from_gitdir()` (:203) reads the revision from Git's own files - walks up to the first ancestor holding `.git`, follows the `gitdir:` pointer a linked worktree leaves there, then HEAD / commondir / loose ref / packed-refs - and spawns nothing; `git_sha()` (:279) survives as the fallback but sends stdout to a `tempfile.TemporaryFile()` rather than a pipe and bounds itself with `Popen` + `wait(timeout)` + `kill()`, never calling `communicate()`; `git_sha_cached()` (:336) is now a non-blocking single-flight resolver where one daemon thread does the lookup under a lock and the request path returns `'unknown'` at once. MEASURED: the route answers in 0.016 s with the lookup blocked for 30 s; the direct reader answers `b9fe34d02` in 0.0000 s where `git rev-parse --short HEAD` takes 0.42 s; the old plumbing waited 10.11 s for a 1 s timeout where the new waits 1.03 s; eight concurrent callers produced eight lookups before and one now. LIVE REPRODUCTION: in an isolated copy of the tree the browser test times out at startup against the old file, deterministically over three runs and with two live `git rev-parse` children observed, and gets past startup against the new one. TESTS: test_console_build_stamp.py 16/16 (new), test_collection_console.py 37/37, test_contribution_http.py 22/22, test_console_browser.cjs exit 0, test_evidence_panes_browser.cjs 30/30, test_app_lazy_startup_browser.cjs 3/3. Brain [[ledger/melange-systems-brain/D-045|D-045]] (the stamp is display-only; `PROJECT` is `<checkout>/mentat`, not the checkout root), [[ledger/melange-systems-brain/DE-026|DE-026]] (a `subprocess.run` timeout bounds the wait, not the drain), [[ledger/melange-systems-brain/DE-027|DE-027]] (`--force-remove` is not a staging rollback). LIVE CONSTRAINT for anyone working in C:\Users\pgoff\Mentat: HEAD moved three times during this lane (`215ddf85c` -> `d62498cb1` the PAC geocode lane -> `7fa9c8a4b` the xref lane -> this lane's two) and four sessions share that worktree's index, so a patch or staging plan must be re-read immediately before staging. OPEN ITEM FOR THE PAC EVIDENCE / S6 LANE, not this one: S6 made the evidence pane load on the first navigation to ANY view - `start()` is bound to `mentat:view` with no view check (`mentat/app/evidence.js:1504`) and `app.js:47` dispatches that on every view change, fetching `/api/evidence-csv` and `/api/evidence` together (`evidence.js:255-256`); the pre-S6 test asserted the opposite. Probably deliberate, since the single Source select must list snapshots up front, but the console is no longer lazy about evidence.
- MENTAT UI CLEAN-UP (UI1) (2026-09-17, worktree multi-industry-snapshot-support-7c95a9; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): Graph and Chart Studio redesign BUILT and COMMITTED `965103db4` (four suites it never swept were repaired in `56b264052`); its patch record is patches/UI1_graph_studio_cleanup.patch (16 files, +1,854/-142, cut as bytes per [[ledger/melange-systems-brain/DE-025|DE-025]], `git apply --cached --check` clean against HEAD a9ed5c236; launcher on 8806 after). Paul's brief: "ease of use, conciseness, symmetry, de-cluttering, and depth of visualization"; four full-fidelity HTML mockups in the ACU theme (Higgsfield was unusable, see below) and his pick "Graph B, Chart Studio A, the C Board can be used for multiple charts together". BUILT: Graph one header line (five selects, Reset, gold "Open in Chart Studio", overflow menu), the repeated scope sentence and the global "Rows per chart" input removed, four Overview panels in one shared chrome each with its own Top N / View all / Export, share-of-scope on every bar, party dots (the payload already carries `candidate['party']`), company sparklines across the latest 5 registered cycles, employee level as one stacked bar; Chart Studio five chrome rows -> two (one segmented Builder|Company overview|Canvas, one grouped toolbar with gold Show Me, Export, Views, one "Add to briefing"), equal 280|flex|280 columns, the h2 no longer reads "Chart Studio", Show Me exists once (in the Inspector; the toolbar button opens that disclosure - the popover was ruled out), one Inspector scrollbar. MEASURED: Chart Studio 66 -> 47 visible controls, canvas top 787 -> 613px at 1440x900 and 805 -> 645px at 1280x800, Fit select full-column -> 119px, Inspector scroll containers 2 -> 1; Graph Overview 26 -> 32 like-for-like because option B shows four panels where there were two. DECISIONS: Top N slices client-side, sends no request and never enters the URL (`/api/graph` has no row-count parameter and `limit` is reserved by [[ledger/melange-systems-brain/D-039|D-039]]); the candidates denominator follows the candidate view (`totals.direct` for Direct contributions, the shown rows for Downstream PAC activity and Conditional estimates, which otherwise printed 201%); sparklines are one request per cycle cached by full query string, drawn only with 3+ cycles, panel paints first; `#studio-status` stays out of the canvas footer because `#studio-grid` is hidden in Company overview and on the Data Source tab. NOT BUILT, deferred with Paul's ruling standing: the Board (Canvas mode as 1, 2 or 4 sheet tiles) and `Split by` small multiples; the Board's contract v2 is drafted and UNAPPLIED in the session scratchpad (`studio_api_v2.py`: optional top-level `board` {tiles, slots}, 3 examples, 6 negative controls) and applying it reddens the python contract suite until `Console.save_view` whitelists and validates `board`. TESTS: node 178/178; new tests/test_ui_cleanup_browser.cjs 12/12 (617 lines); test_navigation_scope_browser 13/13 so the S5 URL vocabulary is intact; test_studio_industry_browser 10/10; studio wording 10/10; ride1, canvas-only, chart-builder, copy-print, click-to-add and graph-lazy-tables all exit 0. KNOWN NOT MET: the four Overview panels need scrolling at 1440x900 with the design's own default Top N of 10 (measured #view-graph 1328px; they fit at 5). REDS NOT THIS LANE'S, each with a negative control on pre-change bytes: test_console_browser.cjs in the PAC evidence block, plus 1 python failure and 2 errors (test_contribution_semantics.py is an untracked foreign test; launcher and startup-performance reproduce unmodified). CONCURRENCY: three lanes edited mentat/app/index.html and mentat/app/workspace.css at the same time, so the patch is hunk-exact by content classification - index.html 6 of 7 hunks and workspace.css 3 of 7, the rest left to the PAC evidence lane, which also confirmed its app.js `activateSavedEvidence` reference is retired. Records: audits/mentat_failings_20260915/UI_CLEANUP_DESIGN_2026-09-17.md (census, critique, plan, the multiple-charts section, build result), UI_CLEANUP_MOCKUPS_2026-09-17.html, receipts/UI1_* (baseline, before/after screenshots at both widths, control counts, foreign-lane state, test output); session file ~/.claude/session-data/2026-09-17-mentat-ui-cleanup-session.tmp. Next: the Board build (contract v2 first, then Canvas-mode tiles, normalizeBoard, the save_view/get_view hunk, "Add board to briefing").
- MENTAT XREF STORED-TEXT FIDELITY (2026-09-18, worktree evidence-csv-fetch-streaming-8bedff; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): COMMITTED `39e5e7dd6` (3 files, +258/-0: receipt `banking_text_census.txt`, REVIEW.md section 13, a HANDOFF.md section). THE QUESTION: [[ledger/melange-systems-brain/D-043|D-043]] makes stored employer and contributor text financially material, because a truncated or substituted employer stops matching the company while still naming something, silently converting a counted row into an excluded one. THE ANSWER, by exact census of all 29,816 Banking exclusions rather than by sample: maximum exposure to a truncation fault is 112 rows / $4,823.06, 0.0148% of $32,538,668.49, zero such rows on the corporate side, and no field-width cliff (employer maxes at 38 characters, contributor name at 106). A bounded live check of all six truncation-consistent classes plus a 20-row CITIZENS control found 0 faults, 0 verdict changes and 0 amendment disqualifications across 41 rows (47 requests including shape proof, seed 20260918, 300 authorised). PROVED REQUEST SHAPE: `/v1/schedules/schedule_a/?committee_id=&two_year_transaction_period=&image_number=` then match `sub_id`; filtering on `sub_id` alone returns HTTP 400. The commission holds `CITIB`, `CITIBA`, `CITIBAN` and `CITIGROU` verbatim under file_number 1552533, so the most truncation-like class is filer abbreviation, not collector damage. TWO PREMISES FALSIFIED FROM DATA: the excluded set is TWO populations (22,472 `contributions` rows carrying `contributor_employer` plus 7,356 `corporate_giving` rows carrying `contributor_name`, 12 ids shared), and `scraped_at`/`load_date` show the text was captured 2021-2024 with only 1,322 rows in 2026, so it was NOT captured by any 09-09/10 code path - that run merged already-collected rows, corroborating its own recovery receipt. Banking's ten lane databases are named by absolute path in its receipt and ALL TEN ARE DELETED, which is why the question needed live API calls at all; the archive code first executed five days after Banking collected. THE EXCLUSIONS ARE CORRECT: every row carries `matched_variant` "Citi" and `company_match_reason` `squashed_prefix_unverified_remainder` over a coherent directory of real, different institutions (CITIZENS BUSINESS BANK 7,282 rows, CITIZENS BANK 4,530, END CITIZENS UNITED $4,138,380.34, a state citizens' campaign $4,314,166.93, Independent Community Bankers of America, Target's and PepsiCo's citizens funds). WORDING LIMIT, binding on any write-up: this establishes what the stored text is, what the rule does with it, and the maximum money truncation could move - NOT that stored text matches what the commission holds beyond the 41 rows fetched. See [[ledger/melange-systems-brain/DE-028|DE-028]] and [[ledger/melange-systems-brain/DE-029|DE-029]].
- MENTAT XREF CONTRADICTION-TEXT LANE (2026-09-17/18, worktree evidence-csv-fetch-streaming-8bedff; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): Paul read the dwarfed cross-reference tab and ruled it "way too strict" - "Just because it is missing info does not mean it should be excluded; we are focusing on contradictions, not ambiguity" - naming the two buckets he calls inevitabilities (donor not matched to a listed company, 36,241 rows / $37,940,955.71 held at $0; memo entry without a proven parent receipt, 19,529 / $8,522,419.98). [[ledger/melange-systems-brain/D-040|D-040]] had already landed the general rule as `c62cc6eb6`; this lane settled what a contradiction IS. RULED and COMMITTED `627300bc9` (32 files, +3,189/-18): the row's own text decides. Text naming another identifiable organisation excludes the row (`attribution_contradicted_by_text`); text naming the company or a verified alias counts it with a flag (`company_named_unverified`); blank or non-naming text counts and flags as before; a recipient route (recipient is the company's dated PAC, or the FEC committee master's connected-organisation field resolves to the company) and a role route (advisor, consultant, contractor, trustee, partner, counsel, board; NOT plain director, NOT retired) upgrade status only. Brain [[ledger/melange-systems-brain/D-043|D-043]]. MEASURED (Banking 20260918T030844, 650 s, vs 20260913T074303): observed original giving $72,103,655.70 to $77,054,485.76, unverified funding $1,657,168.13 to $5,808,336.42, PAC activity and baseline unchanged, review queue 76,197 rows / $49.93M to 46,156 / $16.99M; all 36,241 held rows accounted for (29,816 excluded as contradicted / $32,538,668.49, 6,266 released with a flag, 159 non-giving); Fintech re-ran the same way (20260917T190836, 369 s); four-file suite 113 passed. THE FINDING: $29.3M of the $32.5M excluded is one upstream failure, the matcher reading `CITIZENS` as the `CITI` prefix and booking End Citizens United, Citizens Bank, Citizens Business Bank, Citizens Financial Group, Target and PepsiCo citizens funds as Citibank money. Packet audits/mentat_xref_logic_20260917/ (BRIEF, STEP2_REPORT, REVIEW sections 1-9, HANDOFF, 24 receipts, patches/xref_contradiction_text.patch); session file ~/.claude/session-data/2026-09-18-mentat-xref-contradiction-text-session.tmp. CAVEAT recorded in REVIEW 5f: observed giving still sits above the published $54,762,844.05 workbook total and did before this change; the before/after pair spans four other commits, so the row-level trace is the clean measure. Process lessons: a long run started from a subagent's background shell dies when that agent's turn ends (the first Banking re-run died mid-verify with no exit line while Fintech's ended exit=0) - start long runs from the main session; the git index in C:\Users\pgoff\Mentat is SHARED across sessions, a staging guard's `git reset` cleared another lane's staged list (no content lost, owners notified), so stage and commit atomically with `git commit --only -- <paths>`. Open: the register additions for the companies' own PACs (in progress in this lane), amendment de-duplication, and a reconciliation test against openFEC /totals.
- MENTAT CROSS-REFERENCE + WORKBOOK LANE (2026-09-17, worktree mentat-xref-spreadsheet-review-3f1ff0; code in C:\Users\pgoff\Mentat on codex/mentat-crypto; a peer S3 session committing concurrently): four-voice council (packet audits/mentat_xref_workbook_review_20260917/) found the cross-reference does NOT minimize against the workbook (Banking $72,103,655.70 vs the published $54,762,844.05, +$17.3M from retained memo/transfer/earmark legs; its -$61.4M is against an unpublished $133.5M baseline) and is not an independent check (1.6% FEC-verified). Paul ruled [[ledger/melange-systems-brain/D-040|D-040]]. COMMITTED on his "Commit": `d78265927` dwarfed tab (digest.json per run; no total-like key; live-checked), `bd1bfd60a` worksheet-mode guards (Fact Type = Recipient / View = Industry pills only when the value exists, committee-activity captions, Data workbook first; browser test 3/3 on the real Banking book), `937ea01f5` tidy P5 rebased onto HEAD (P6c/P7b wait for the worksheet_accounting lane's commit), `00c3700d6` report.R street-column tolerance (every rebuild had been aborting on `no such column: contributor_street_1`), `f0181e523` packet. LANDED and COMMITTED: engine rework c62cc6eb6 and export-gate rework 7d364883e (Paul: fixes only, no regeneration from a lane; he reruns and rebuilds himself): the engine rework (REVIEW attribution counts with an unverified flag, REJECTED stays excluded; relative outliers; ledger replay + offline rerun of Banking/Fintech) and the export-gate rework (unresolved roles count with receipt_role_unverified; ruleset v5 adds the contradiction patterns from the ruling table; F13 inaugural donations count; disclosure memos excluded only when a matching line-11 row proves the repeat). Workbook facts of record: three cycle-sheet schemas across the 8 published books (raw 35-col Community Banks/Credit Union/Crypto/Fintech; fact 18-col Credit Arms/P&C; compact 12-col Banking/Telecom); 7 of 8 books are July; no companion Data book or Detail sheets published anywhere; the console's worksheet reader already drops Recipient List's Company view, and Downstream Activity exceeds its 50,000-row cap. Receipt-gate refusals under ruleset v4: 948 rows / $192.0M (Banking 593 / $1.80M, not the 2,070 of 09-12; Crypto 80 / $187.5M). Next: land the two reworks, Paul restarts 8806, rebuilds Credit Union first then the rest, Banking last with the worksheet-cap check on its companion.
- MENTAT FAILINGS S5 (2026-09-17, worktree multi-industry-snapshot-support-7c95a9; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): navigation and linking (Area D) COMMITTED on Paul's order as `a7e09ed8c` (14 files, +2,506/-16; the HANDOFF S5 section had already landed inside S3e's whole-file `522e3ad31`; the `/scope.js` STATIC_ASSETS line landed inside S3d's `a565216bf`). Design and reasoning by Fable, code by the Opus architect per Paul's directive; rulings A(ii) Candidate view select visible once a report is chosen and `mode=activity` linkable, no new tab; B graph_data.py and fec_beneficiary.R untouched (foreign uncommitted hunks); C history.replaceState only. SHAPE: the hash names the tab, the query string carries the scope - `industry` (S4 label), `company`, `cycle` (end year), `mode` (direct|activity|estimates), `direction`, `tier`, `funding`, `category`, `recipient`, `saved` (32-hex view id); `studioPane` unchanged; `evidence`, `id`, `committee`, `offset`, `limit` reserved for S6; defaults absent from the URL, unknown keys preserved. New `mentat/app/scope.js` (read/write/parse/serialize/href/subscribe, `mentat:scope` event); Graph restores from the URL after the catalog loads and writes on every control change (permalink company/cycle/tier ride with the first request because their options come from the response); Chart Studio follows `industry`, carries company/cycle as pills through applyGraphScope, opens `saved=`, writes `industry` on pick and `saved` on save/open; Cross-reference fetches `/api/cross-reference?industry=<label>` (S4 route) and its status says 'Newest run for X' / 'Latest run' / 'No cross-reference run for X'. Contract contracts/url_scope.json v1 (7 examples, 6 negative controls) asserted by app/tests/scope.test.js and a 13-step Playwright pass tests/test_navigation_scope_browser.cjs. Fable review found three defects the tests could not see, each fixed with a step that failed first: `latest=1` overrode a permalink's cycle on first load (now sent only when no cycle is named); `saved=` outlived edits so a reload re-opened the saved view over them (first edit after open/save now drops it; the permalink still re-opens); empty industry answer read 'Latest run'. The S0 known-red in test_console_browser.cjs (:188 then :196) was a race - the assertion ran before /api/runs returned - closed with the file's waitForFunction idiom. Tests: node 121 -> 151/151; navigation 13/13; baseline browser tests green; python 54 OK unaffected. User-visible: permalinks/reload/tab switches keep industry, company, cycle and mode; Cross-reference follows the URL's industry (newest run for it or its empty state, said in the status line). Known limits: Chart Studio does not write company/cycle back when a carried pill is removed; a first load naming no cycle still lands on the newest cycle with none in the URL; no cross-tab sync. Console 8806 verified current (pid 53184, assets 9350a964…, code ba9d6c22…) and serving /scope.js. Next: S6 (two-pane comparison) against the HANDOFF S5 URL vocabulary and S3's pane state model.
- DISK LANE (2026-09-18, worktree clear-storage-space-d8b0a5, Claude Fable 5.1): C: free 10.2 -> 186.1 GB at 19:30 local. About 212 GB was cleared; two session worktrees created while the lane ran took 36 GB back (mentat-uncommitted-reconcile-4089f1, since slimmed, and unfinished-work-handoff-a3bbad). No worktree, branch, scratchpad or tabled-lane file was removed. Paul's orders, in sequence: "You need to clear 200 gigabytes on this computer. There are certain branches that have been tabled, such as the friendship network, audio, lobbying inference, among other things that should be saved ... regenerate the scratchpads that were deleted"; then, declining three deletions I offered, "Look at the main state of the program, and then compare irrelevant files for both mentat and melange other than what I have specified as off limits"; then "fucking clean house". ZERO-LOSS LEVER, 119.2 GB: `extensions.worktreeConfig` was already true, so `git -C <tree> sparse-checkout set --no-cone '/*' '!/audits/legfix5/'` drops a worktree's tracked 17.5 GB legfix5 checkout in 16-19 s, leaves `git status` identical outside legfix5, and is undone by `git -C <tree> sparse-checkout disable`. Applied to seven trees: this session's, the Mentat-lane trees charming-chatterjee-d81c90, pac-evidence-filters-724237, evidence-csv-fetch-streaming-8bedff and mentat-uncommitted-reconcile-4089f1, and the two tabled trees, whose uncommitted work was compared before and after and is untouched (mentat-systems-production-file-53552c 29/29 entries, Codex 4f35 36/36). NOT applied to the Melange-lane trees amazing-lewin-409893, melange-members-section-fixes-6613db and unfinished-work-handoff-a3bbad, because 123 files under `fec/` read `audits/legfix5`. Also removed `storga-6c490a` (7.43 GB), an aborted `git worktree add` with no `.git`, after `git hash-object` over all 38,595 of its files matched main for 38,594 (the miss is the 2.57 GB packet the checkout died inside). PROGRAM-IRRELEVANT FILES, 86.0 GB, each on Paul's word and each read from the running program's code: six roster-runtime copies of the FEC bulk inputs (35.97 GB; `server.py:1041-1053` re-copies them on any launch or resume; the canonical source `.cache\repair-20260908-inputs`, named by `inputs\active_fec_sources.json`, is kept); `ledger.sqlite` in seven superseded or unselectable Banking cross-reference runs (23.67 GB; the console reads only the newest run per industry, `cross_reference_data.py:283-309` and `contribution_data.py:393-411`; the reports and digests of every run stay; baseline `20260913T074303`, measured-after `20260918T030844` and current `20260918T183722` keep their ledgers, hash-verified against their reports before anything was deleted; every Banking run shares db sha `4abdea581b`, so a ledger re-derives in about 11 minutes); dead console cache generations (10.38 GB: 31 older contribution-analytics indexes keeping the newest per workbook, 8 build leftovers, 536 query-cache view files whose recorded source stamp no longer matches); 83 copies of generated dashboards of 20 MB and up inside `audits\label_correction_20260913`, `audits\self_update_20260908\production_before` and `audits\congress_pipeline` (6.57 GB; receipts, workbooks, logs and data files stay, and congress runs `20260914T042414Z` and `20260913T210003Z` stay whole); `audits\self_update_20260908\stage`, `.git\lost-found`, `orphan\snapshots` except its one tracked file, 33 git `tmp_obj` garbage files (6.54 GB); the `.git\codex-worktree-backups` bundle (2.95 GB; all three of its heads verified identical to local branches first; `claude/wizardly-wilbur-e2d1a0` and `claude/melange-data-expansion-958236` are NOT on the mirror). VERIFIED AFTER: main `776ce0d3a`, git garbage 0, console 8806 session / cross-reference (Banking selects `20260918T183722`, Fintech `20260917T190836`) / snapshots all 200, staffer sidecar 8841 200. SCRATCHPADS: the fourteen deleted on 09-18 were regenerated from the session transcripts (2,392 authored files, 12.5 MB, 13 roots each with a README and a manifest); 1,004 shell-produced paths and 409 subagent edits of scratch copies are listed in the manifests, not reconstructed; the 64.9 GB Mentat state copy was not re-copied. DECLINED BY PAUL, untouched: the 43.15 GB `temp_console_old_code\state` duplicate inside the charming-chatterjee scratchpad, slimming mentat-failings-lane-a615fa, `C:\tmp\clone_probe`. REMAINING LEVERS, Paul's: slimming the three Melange-lane trees once their sessions end (52.5 GB), a reboot for the 84.5 GB pagefile, `powercfg /h off` for hiberfil 12.6 GB. STRUCTURAL, unchanged: every new session worktree costs 18 GB because `audits/legfix5` is tracked, and two appeared during this lane; the durable fixes are a post-checkout hook that applies the sparse pattern to new session worktrees, or untracking legfix5. Tools and both census CSVs: `C:\Users\pgoff\worktree_retirements\tools_20260918\`.
- DISK LANE (2026-09-16, worktree clear-storage-space-5b4a81, Claude Fable 5.1): C: free had fallen 228 GB (09-15 evening) -> 6.5 GB. Cause of the drop was NOT fully measured (every parallel directory walk times out on this box; sequential walks found: session scratchpads under AppData\Local\Temp\claude 82.2 GB, of which the closed tidy-workbook session holds 64.9 GB / 23,703 files; Mentat tree 70.8 GB with mentat\state 36.7 and mentat\.cache 29.7; four new worktrees since 09-15 at 18.2 GB each; pagefile.sys 68.1 GB). Paul ruled "Show me the list and just remove the finished worktrees", then "Don't remove the lane coordination worktree", then "Keep the scratchpads". Removed four worktrees that were clean (git status, --ignored, and 0 commits ahead of main all verified immediately before each removal), with idle sessions: mentat-excel-tableau-format-8ac097, mentat-system-failings-c5d7d4, mentat-system-debug-5be715, contributor-street-columns-0a1726. Branches kept. C: free 6.5 -> 79.5 GB. Each top folder remains as a 0-byte stub held by another process (known OneDrive/handle behaviour since 09-11). KEPT by rule: mentat-failings-lane-a615fa (lane coordination - Paul), the three worktrees with running sessions (evidence-csv-fetch-streaming-8bedff, melange-members-section-fixes-6613db, multi-industry-snapshot-support-7c95a9), mentat-systems-production-file-53552c (unmerged, 29 untracked), melange-coalition-builder-design-7babbe (0.1 GB), Codex 4f35, the Mentat tree, and this session's own clear-storage-space-5b4a81 (18.2 GB, clean; removable only from outside it). Remaining levers are Paul's: reboot (pagefile 68.1 GB shrinks), `powercfg /h off` elevated (hiberfil 12.6 GB), and removing clear-storage-space-5b4a81 after this session closes. [superseded by the 2026-09-18 DISK LANE bullet]
- MENTAT FAILINGS S4 (2026-09-16, worktree multi-industry-snapshot-support-7c95a9; code in C:\Users\pgoff\Mentat on codex/mentat-crypto): cross-industry addressing COMMITTED on Paul's order as `8377b5e77` (35 files, +8,351/-127, staged hunk-exact from patches/S4_cross_industry_contract.patch), `9262614c2` (HANDOFF ledger + patch) and `b13d09018` (Fable review fix: a fresh worksheet sheet no longer carries an empty industry key, which had made every report-worksheet view fail to save). PREMISE CORRECTED: the console never had an industry global - `server.py main()` takes port/data-root/keys/rscript/read-only only, one process already served all 8 published snapshots, and the dataset id IS the industry label (`contribution_data.py:186`). S4 unified the selector: `industry` (published label; the `contribution_data._slug` UNDERSCORE form such as `credit_union` also accepted; label always echoed) on contributions session/catalog/geography/query/records, graph/comparison, cross-reference (`?industry=` the only query key allowed; `selected_by` pointer|industry) and the new `GET /api/snapshots` (registry wrapping `_sources()`; `build_stamp` = sha256 of workbook|companion|database|payload hashes joined by newline; names only, never an absolute path; null stamp only on an unreadable workbook); `dataset` stays a legacy alias; the resolution rule is industry, else dataset, disagreement 400, neither = legacy; saved views persist `source.industry` + `sheets[].sources[] = [{industry, dataset, label}]` and list `industries[]`; Contributor Detail street columns applied per S2 decision 7 (DIMENSIONS reorder employer, occupation, street_1, street_2, city, state, zip5; VERSION 3; builder A5:M; report.R grain gains street; `_sources()` skips Excel `~$` lock files and tolerates unreadable books). Contracts snapshot_registry v2, contributions_api v2, studio_api v1, raw_contribution_columns v2 were written before code and are asserted against the PRODUCERS in both suites with negative controls ([[ledger/melange-systems-brain/DE-021|DE-021]] method); the fixture caught a live client/server mismatch (JS parser refused the null stamp) and the viewSourceRecord whitelist was the unenumerated producer dropping `industry`. Reviews: python 2 HIGH/1 MED/2 LOW, typescript 1 HIGH/2 MED/2 LOW, code-reviewer 1 MED/1 LOW, Fable 1 HIGH/3 LOW - all fixed but two LOWs recorded (cross-reference pointer path echoes `industry` only if `_report()` keeps `scope`; `validate_entry` 55 lines). Tests: python 118 OK (1 skipped), node 121/121, Playwright real-client 10/10, R PASS (test_spending_detail_frames 8 cells -> 9, folded 5 -> 6); independent sweep found two node reds NOT S4's (a load flake; S3's test_evidence_csv_browser step 14 pins a message 21c9cab6d retired - S3 session notified). Acceptance on the real 8 snapshots complete (receipts/S4_acceptance_rerun.txt): distinct dataset/industry/build_stamp per industry, exact 400 on disagreement, two-industry view round-trips on disk, stamps identical across three fresh processes. Costs measured: registry 3.15 s cold / 73 ms warm, deliberately not memoized; VERSION 3 invalidated the analytics caches and Banking's 707 MB index took ~38 min behind the single global build lock (`_build_gate`) - Banking and Credit Union are rebuilt, the other six build on first query; POST query/records still scan `_sources()` twice (accepted). Console 8806 restarted on `b13d09018` (code 5f7da2d1…, assets a326f370…) and read stale again minutes later because the S3 lane wrote uncommitted server.py/evidence edits at 23:10 - S3's restart, not S4's. Three non-owned test files carry one-assertion S4 edits (test_contribution_http.py, test_console_delivery.py, test_spending_detail_frames.R fixture) recorded for their owners. The UI has NO writer for `sheet.sources[]` yet - S5's picker. Records: audits/mentat_failings_20260915/ (S4_DESIGN.md, HANDOFF S4 section from line 747 with the S5 parameter names, receipts/S4_*.txt, receipts/S4_code_review_fable.md, patches/S4_cross_industry_contract.patch); session file ~/.claude/session-data/2026-09-16-mentat-failings-s4-session.tmp. Process lessons: Sonnet executors refuse writes under C:\Users\pgoff\Mentat from a Melange worktree session ([[ledger/melange-systems-brain/DE-022|DE-022]]); a Haiku verifier skipped its polling and exact-payload instructions and the acceptance run had to be redone; Paul's standing directive from this lane: "When possible it needs to go faster." Next: S5 (navigation and linking) against the HANDOFF S4 parameter names; Paul restarts 8802/8808 if up.
- CODE REVIEW, FIVE LANES (2026-09-13, worktree melange-systems-code-review-859518, read-only, NOTHING APPLIED): 141 finding rows across behavioral / long-form audio / webscraping / demographics / staff list, adversarially verified (112 confirmed, 17 refuted or partly refuted, 12 patches revised as v2; classes A 52 safe-as-set / B 35 Paul-gated / C 5 withdrawn / D 37 report-only / E 12 revised), then rechecked against the live tree. SYSTEMIC: (1) the committed tree cannot run its own kernel runner, audit harness, desk producer or weekly refresh because test_email_package_variant, fec/engine/pillar_policy.py, fec/members/wikipedia_biographies.py and staffer_live/index.html exist only in the live tree (untracked); 53 cited files differ in content between HEAD and live; 8 findings are fixed only in live. (2) The kernel gate reaches 105 of 265 tracked suites; 92 are unreachable in both trees; three registered suites are red (test_combined_staffer_section after the 2026-09-07 link relocation; test_staffer_surface_import_modes because a stray %TEMP%\inspect.py shadows the stdlib; test_descriptive_contract_and_surfaces). (3) Confirmed IN-CHAIN period-2 oscillation of primacy factors via the collector-roster sidecar and member_desk_bundle.json (desk path; [[ledger/melange-systems-brain/DE-016|DE-016]]'s standalone guard is the wrong shape; fix = cumulative membership source for the desk, Paul's call). (4) Pillar weights disagree across change-control law 14 (30/25/40/5), ranks_python.json (45/10/40/5 since 09-03) and live-only pillar_policy.py (45/10/40/5, a fail-closed desk gate via dashboard_integrity.postflight). Packet: audits/code_review_20260913/ in the review worktree (REVIEW_REPORT_2026-09-13.md, FINDINGS_INDEX.md, 106 v1 + 14 v2 patches incl. two .live.patch rebases, censuses, verifier and live-recheck reports). Next: Paul rules on the weights and on a commit pass of the live tree; then class A applied to the LIVE tree with the .live.patch variants; then kernel + audit_full measured in the live tree. **[2026-10-11, decisions F: S-1 closed (F-2); S-2 census guard + drain landed Melange 7d57fb209 (178 registered, 22 on BACKLOG with reasons); S-3 closed by [[ledger/melange-systems-brain/D-146|D-146]]; S-5 closed by [[ledger/melange-systems-brain/D-141|D-141]], docs fixed 751f002f5; [[ledger/melange-systems-brain/D-051|D-051]] R1/R3 ratified [[ledger/melange-systems-brain/D-143|D-143]]/[[ledger/melange-systems-brain/D-144|D-144]].]**
- DAILY REFRESH REPAIR + CODEX BURN (2026-09-13, Fable session, live tree; COMMITTED 2026-09-19 by the live-tree reconcile - current state is in the 2026-09-19 FULL CHAIN BLOCKED bullet at the top of this section): Codex thread 01a098ce (23:29 local 09-12 → 10:58 09-13) built the Windows-scheduled congress refresh (fec/daily_refresh.py + fec/legislation/refresh_congress_pipeline.py + tasks MoneyballCongressRefresh / MoneyballDailyRefreshRetry) and then burned the ENTIRE weekly Codex quota supervising it: 542 empty 30 s write_stdin polls + 280 wait_agent blocks over 11 h, ×4 spawned agents, +27 auto_review guardian threads = 673,856,790 tokens across 32 rollouts; usage_limit_exceeded, window reopens 2026-09-19 23:50. No external loop re-invoked Codex; the Python never calls Codex. Three Codex heartbeat automations exist, all PAUSED (finish-staffer-lda-reconciliation is FREQ=MINUTELY). The job itself could never finish: thirteen attempts on 09-13 (state file), every one FAILED/BUSY/INTERRUPTED, retry task firing hourly (ExecutionTimeLimit PT0S). Repairs landed (160 pytest tests across 4 suites now registered in run_tests.py _LANE_PYTEST; independently verified 3 passes): press collector exit 3 (by-design PARTIAL, refresh_press_delta.R:843; pending_body_urls 2,200 under JS_MEMBER_BUDGET 600, fold OFF) is now PARTIAL not FAIL and the press_intake/press_feed/press_baseline_fold steps plus all_intake are PARKED (SKIPPED_PARTIAL) because build_press_engine_feed.py:99-101 (ratified partial-run rejection, UNTOUCHED) refuses incomplete generations; discovery browser-launch failure (Playwright launchPersistentContext 180 s timeout, NOT the Cloudflare cooldown, so the GovInfo fallback never fires) is retried once after 300 s then DEFERRED (deferred_steps) and the day continues; calibration budget 120 → 900 s; --smoke (skip discovery, admissions --limit 1 --no-llm --no-install, media crec/chrg/bluesky only, full run_pipeline.py) and --no-llm (carry forward old decisions with OLD fingerprint, never seal a hold); glassbox emit() gains current/total, wrapper emits refresh.snapshot/refresh.heartbeat and writes data/engine/congress_pipeline_live.log; before-snapshot hashes the two 98 MB dashboards (11 min → 0.4 s); watcher fec/legislation/watch_congress_pipeline.ps1 + open_congress_pipeline_monitor.ps1; exit-75 reasons. SMOKE RUN 20260913T210003Z (PID 81500, 17:00 local): calibration 0.6 s, discovery skipped, admissions 451 s with ZERO model calls, votes 4 s, repository 24 s, billstatus 5 s, media 1,620 s PASS (press lane skipped, all_intake parked, 13 derived steps ran), then run_pipeline.py FAILED at step 17 speech_stance_stack.py → own_source_stance_model.py:326 "bluesky gold labels no longer bind to source rows" (5 ids). ROOT CAUSE (verified): fec/stance/extract_cu_bluesky.py carries an UNCOMMITTED change from the Codex session (mtime 04:29:51Z) that swapped the UNVERIFIED guard from post text to the handle registry (verified_bluesky_handle in tweet_collector.py:101-104, also uncommitted); four House members (W000822, W000788, L000602, K000402; also S001200) carry "[UNVERIFIED — confirm]" handle tags, so the extract now drops their posts and data/stance/bluesky_cu.csv went 15 → 10 rows at 21:09:48Z — the smoke run was merely the FIRST execution of that extractor (no earlier run today reached the derived lane). The same step passed in the 03:52Z chain. A full production run reproduces the failure (the extract reads the cumulative posts table with no window; ids are md5(bioguide|date|text), nothing re-hashed). NOTHING was touched: no gold labels, no gate, no members row, no revert. Known-good backup that binds all 5 ids: audits/self_update_20260908/production_before/data/stance/bluesky_cu.csv (15 rows, 2026-08-29) — a stopgap only, because the next derived-lane run rewrites the file. Also: the auto-mode classifier BLOCKED taskkill + Disable-ScheduledTask, so no task was disabled; a scheduler-launched run took .pipeline_run.lock the same second as the first smoke launch. Untracked-and-modified today by the Codex session, still uncommitted: fec/audit_collection.py and fec/collect/build_press_engine_feed.py show git diffs (mtimes 07:29 / 08:50 local) that this lane did not make. Evidence: audits/congress_pipeline/20260913T210003Z/, data/engine/daily_refresh_state.json, memory codex-overnight-poll-loop-burn-2026-09-13. ADDENDUM 21:36 local: the scheduler's own 22:42Z run died on `PermissionError WinError 5` replacing data/engine/congress_pipeline_status.json (writer lost a race with a reader; the watcher polled it with Get-Content). Fixed: `fec/lane_file_io.py` gains `replace_atomic()` (40 attempts, 50–250 ms jittered backoff, retries WinError 5/32/33; the old private loop was 8 attempts and PermissionError only, which is why it still bit) and all three daily writers plus `atomic_write_bytes()` route through it (~20 producers become strictly more tolerant); watcher reads with FileShare ReadWrite|Delete. New suite fec/tests/infra/test_atomic_replace_retry.py (15 tests) registered; 175 tests green across 5 suites. Positive control: 200 publishes under a live 1 s watcher poll, 0 failures. Pre-existing rot found, NOT fixed: fec/tests/infra/test_lane_atomic_write_concurrency.py and test_ndjson_bom_tolerance.py (both unregistered) fail on the pre-2026-08-04-reorg path of build_accepted_legislation_generation.py; a third copy of the replace-retry loop lives in fec/speech/source_media_recovery.py:842. Scheduler evidence of independence: retries fired 17:39 (BUSY, smoke held lock), 18:39 (the WinError 5 failure), 19:39 (PID 84820: calibration OK, discovery failed twice → DEFERRED by the new logic, admissions running) with no AI in the launch or supervision path.
- MENTAT SYSTEM DEBUG (2026-09-13, worktree mentat-system-debug-1f368e; Mentat sibling tree C:\Users\pgoff\Mentat, branch codex/mentat-crypto, dirty): read-only LOGIC audit on Paul's order ("not the data itself but the logic behind the code"); nothing in the Mentat tree edited; packet at C:\Users\pgoff\Mentat\audits\mentat_system_debug_20260913\ (XREF_LOGIC_AUDIT.md, STUDIO_DIAGNOSIS.md, four .patch files, eight draft PNGs). (1) CROSS-REFERENCE vs GRAPH: the "$37M unattributed" Paul reads is the `company attribution unresolved` row of the Records-needing-review table on run 20260913T074303 (36,241 rows / $37,940,955.71), NOT `unverified_funding` ($1,657,168.13). Those rows are zeroed by `exclude()` (mentat/tools/cross_reference_engine.py:120-128 via :264-272) and sit outside every total; the Graph's ~$12M is net giving of `include_in_analysis == 'Yes'` workbook rows (mentat/app/graph_data.py:188) for the latest cycle only (`graph.js:60 &latest=1`, `graph_data.py:317-318`), while the cross-reference reads every DB row for the industry (run_cross_reference.py:56) across cycles 2022+2024+2026. Different universes plus cycle scope; fan-out double counting REFUTED for that number; the label is bare snake_case because the key is missing from the `reasons` map (mentat/app/cross-reference.js:19-32). Independent verifier: 6 MATCH / 1 PARTIAL / 0 MISMATCH. Side findings NOT fixed: `corporate_giving` structurally $0 (verified_company_affiliations.json carries only connected_pac records); memo legs with no proven parent retained inside the $72.1M "Observed original giving" (19,529 / $8,522,419.98). No per-cycle breakdown exists in report.json (producer change needed at run_cross_reference.py:312-313). (2) CHART STUDIO: split view fails for two reasons — server.py:1119 sends `frame-ancestors 'none'` so the same-origin pane iframes (`/?studioPane=B`) are blocked (Chrome shows "refused to connect"), and Paul's consoles on 8802/8803/8804/8808 predate the 2026-09-13 01:31 server.py edit so their frozen static allow-list 404s chart-comparison.js (restart required); "no way back" = the persisted `.studio-options-hidden` class (chart-studio.css:49) plus a top-level `?studioPane=` page with all navigation hidden (chart-comparison.js:16-19); Analytics = 5 of 7 items are no-ops or errors on the default Verified-contributions source (chart-studio.js:314, contribution-charts.js has no `references` reader, chart-studio-contributions.js:73-81 throws without a time dimension); Graph "Create chart" only switches views (chart-studio.js:1394-1400) though a hidden dataset hand-off already exists at :237 — import IS possible, so redesign as "Open in Chart Studio" carrying industry/company/cycle as filter pills. UPDATE later 2026-09-13 on Paul's "Apply the four patches, go with A plus the D inspector ... C multi view for a single company as its own mode ... give it a test ride ... filters, measures, data types": the four patches are APPLIED (byte-exact, backups `<file>.bak-20260913`) and the redesign is BUILT by an architect in eight files (index.html, chart-studio.js, chart-studio-core.js, chart-studio.css, chart-comparison.js, chart-studio-contributions.js, chart-math.js, tests; backups `<file>.bak-20260913-redesign`; server.py untouched beyond the CSP patch) - header scope chip + "Builder | Canvas only" restore control, 1/2/3/4-chart toolbar, three-column layout, Inspector with Marks/Analytics/Filters tabs, filter popover (member checklist, include/exclude, ranges), engine-limited aggregation menu + political-money presets, Treat as Dimension/Measure (worksheet; verified refuses with reason), Date part (fixed after the ride found it missing: menu had gated on a runtime isTime flag), in-page Company overview (four preset cards, company picker, Open in builder), failed-facet negative cache. Core suite 61 -> 77 / 0. Independent verifier 8/8 on the receipt + re-check after the Date-part fix. TEST RIDE on a fresh read-only 8812 instance: 20/20 script steps pass; cold load = 1 query (the "~160-request storm" did not reproduce on the new bundle - it was a load-time transient, not a bug to chase), pane B renders inside the 2-chart grid, no new console errors. STILL UNCOMMITTED in C:\Users\pgoff\Mentat (Paul's commit); Paul's consoles on 8802/8803/8804/8808 predate the server.py edit and must be RESTARTED then hard-reloaded to see any of it. Known limits: overview "Recipient categories" is vertical bars (verified renderer has no horizontal bar), party split stands in for employee level, "Is not one of" caps near 38 members, Canvas-only does not persist across reload (returns to Builder), command palette skipped. Higgsfield: round 1 (A/B/C/D, minimalist palette) then round 2 in the console theme (v2A, v2A-split, v2C, v2D); Paul chose A + D inspector + C as a company mode. Records: audits/mentat_system_debug_20260913/ in the Mentat tree + the session scratchpad receipt. COMMITTED late 2026-09-13 on Paul's "Looks great, proceed" / "commit this in the Mentat tree", explicit paths only, branch codex/mentat-crypto: `2906980d1` (Chart Studio rebuild, 9 files + the packet), `97eaa758` (35 console modules index.html/server.py already depended on, transitive imports walked), `e666f95e5` (pac_evidence.py helpers). PROVEN: a clean temp worktree of e666f95e5 boots the console read-only and serves `/`, all 27 assets, session, catalog (8 datasets) and cross-reference (all 200); queries answer a clean 400 without the gitignored analytics cache, by design. Still uncommitted: contribution-studio.* (separate feature), lane test files, 17 modified tracked app files from other lanes, .bak-*. [SUPERSEDED 2026-09-18: all of it is committed and the dated backups are ignored - see MENTAT UNCOMMITTED RECONCILE] Consoles 8802/8803/8804/8808 still need a restart. MENTAT POCKET (iPhone version, Paul: "make an app version ... for the iPhone ... send it to pgoff22@icloud.com"): delivered as a private artifact page https://claude.ai/code/artifact/f61099b4-7f29-40f9-b8ee-10c7f7ce5fd9 (Add to Home Screen; icon + manifest as supporting files) plus the single 166 KB HTML file; snapshot of all 8 industries × 10 companies × 3 cycles (216 queries, integrity zero-delta, render harness 1,056 scopes); no mail connector in the session so the email was not sent; native iOS impossible here (no Mac, no Apple Developer account, phone cannot reach the local server). Sources archived under audits/mentat_system_debug_20260913/pocket/ (untracked). Disk: C: free measured 34.9 GB at 2026-09-13 21:50 local, contradicting the 105 GB recorded after the 09-13 retirements; cause unexamined. [superseded by the 2026-09-16 DISK LANE bullet]
- **MENTAT USABILITY LANE (2026-09-14, worktrees mentat-system-debug-1f368e then -5be715; code in C:\Users\pgoff\Mentat\mentat\app, branch codex/mentat-crypto, dirty):** plan `C:\Users\pgoff\.claude\plans\the-mentat-chart-system-breezy-wilkinson.md`, Paul: "Execute the plan end to end". Lane F (F0 cycle carry, F1 build stamp + stale guard + POST /api/restart, F2 click-to-add, F3 data source always findable, F4 reconciliation strip + Graph footnote + cross-reference relabel, F5 wording, F6 Canvas-only keeps Export) and lane E (E0 compose/rasterize split, E1 copy image, E2 print, E3 PowerPoint via vendored PptxGenJS 4.0.1 sha256 4fb9eac5…f8, E4 briefing tray, E5 saved views on disk, E6 pocket publish job) are BUILT with receipts under `audits/mentat_system_debug_20260913/lanes/{F1,Fclient,Eserver,Eclient}`. A live integration pass on a writable console found three defects the per-lane unit tests could not see (client/server contract drift: `source`/`provenance` string vs dict), plus a leaked test worker, a false "restarting" answer, and a cold-load reconciliation strip. Fix lane `lanes/fix1` (2026-09-14 evening, backups `*.bak-20260914-fix1`) closed D1, D2, D3, D5, D6, A3, then an independent integrity review found one HIGH (a second `/api/studio/views` producer, `migrateStoredViews`, still sent a string and swallowed the 400) and four MEDIUM/LOW items; all applied in round 2: Graph's run chooser now exists once (`MentatGraphRun` in graph.js) and the strip calls it; producer-side contract test with a shared fixture `studio-contract-examples.json` (negative control: string `source` fails 3 tests); saved_at reader fix (server writes seconds). Totals: node 101/0, browser .cjs 34/0, python 58 tests 3/3 rounds clean. Renders R1–R4 archived in the packet `prompts/renders`. Round 3 (Paul: "IF outstanding items, fix ELSE commit"): atomic_json + briefing SVG write retry (0/20 paired failures, was 3/20); strip sends `latest=1` when no cycle is carried and a `cycle` reason explains the gap — this exposed that the rounds 1–2 "Agree · All cycles" evidence was false (Graph was pinned to 2026); transient banner. COMMITTED 2026-09-14 night on codex/mentat-crypto: `ed64743` base commit of eight files at their pre-lane backup content (the uncommitted 09-11/12 Chart Studio work the lane built on; hunk-only staging was proven impossible, 3/18 hunks), `215faa9` the usability lane (47 files), `9b14e1d` `.gitattributes` pin for the vendored bundle + the three contribution-studio files server.py already routed + round-3 test (a clean checkout of `215faa9` alone had a CRLF-converted bundle and three 404s), `5937875` packet records (110 files, 37.4 MB). Clean-checkout proof of `9b14e1d`: node 108/0, python 58 OK, 36/36 routes 200. The 55-file other-lane drift (mentat/R, tools, tests) stays uncommitted. [SUPERSEDED 2026-09-18: all of it is committed and the dated backups are ignored - see MENTAT UNCOMMITTED RECONCILE] Paul's consoles 8802/8803/8804/8808 still predate every server.py edit since 09-13 01:31 and must be restarted (the F1 launcher now restarts an IDLE stale server on the same port). Ride 1 (32-step checklist artifact b48a8aef) and Ride 2 NOT run; the 13:29 ticks were a page run-through and were cleared. OPEN for Paul: (a) the three rulings the plan lists before Ride 1 (money-label wording; worksheet group limit 40 vs 60; slide-template wording / shared briefing tray); (b) `atomic_json` has no retry — `os.replace` WinError 5 on index.json measured 2 failures / 20 paired runs of test_studio_views + test_studio_briefing, 0/10 alone (pre-existing); (c) strip omits `latest=1` while Graph's first paint sends it (pre-existing wording risk); (d) app.js "Console already current" banner stays visible with a live Restart button (UX call); (e) one `.gitignore` negation line added so the shared fixture is committable. WORDING PASS 2026-09-15 on Paul's rule "simple to read, no slop": 95 of the 491 lane strings rewritten, group limit unified at 60, slide template unchanged, contribution-studio page (unlinked) left as is; tests node 108/0, browser 34/0, python 58 OK; committed `f64316daa` in the Mentat tree (record: audits/mentat_system_debug_20260913/lanes/wording_20260914/); rows 85/86 carry a leading "the Graph view" because the wording test requires lowercase reason tails; the three pre-ride rulings are thereby closed (labels stand, limit 60, slide text stands). Still Paul's: restart consoles 8806/8802/8803/8804/8808, Ride 1, Ride 2. RIDE 1 RUN 2026-09-15 on Paul's console 8806 (the only Mentat console; 8841 is the staffer sidecar): 29 pass, 17 unrecorded, 27 and 32 fail; Paul confirmed the results stand. Launcher gate defect fixed `5c5aa6bfe` (a console was judged current on Python code alone, so an interface-only commit left a Reload banner no reload could clear; now both build pairs). Findings `a4b3c8e2e`: step 17 = Graph-first walk silently dropped the carried scope (applyGraphScope consumed pendingScope before its guard); step 27 = server dropped the briefing `chip` (reloaded cards printed hashes) and the fixed drawer covered the Classic builder; step 32 not reproducible on a clean console (7 runs). `1b8499147`: briefing added_at read as seconds; step 27 checklist says Duplicate sheet. Tests node 109/0, browser 36/0, python 61 OK. Ride 1 v2 page: https://claude.ai/artifact/YJvfQjCMiHB6CXU9aZCqn8. 8806 restarted on 1b8499147. Next: Paul retests 17 and 27, then Ride 2.
- MENTAT CHART STUDIO (2026-09-12, worktree mentat-chart-studio-bugs-bb0e92; code in the Mentat sibling tree C:\Users\pgoff\Mentat\mentat\app, branch codex/mentat-crypto): two commits landed on top of the v1 `090879ad8`. (1) `108e407db` "Fix Chart Studio P1 bugs and widen field granularity" (7 files, +800/-51): the ten P1 review bugs — cross-series/non-sum/histogram grand-total suppression with an on-chart note, per-worksheet session key (was the workbook digest), sort locked on line/area/temporal views, double-click sheet rename, three drag-and-drop pill-loss/off-by-one fixes, Subject filter for time transforms — PLUS the fields-lane chart-side work (top-N + "Other" fold replacing the hard 60-group throw; "Show identifier fields" reveal; split of "; "-joined multi-value cells) and two CHART_STUDIO_*.md docs in mentat/app; core suite 54/54. (2) `b44fcef7a` "Add fine-grain Recipient Detail and Contributor Detail worksheets" (7 files, +785/-0): option A's writer — two static-value worksheets built from their OWN payload keys (immune to MENTAT_COMPACT_RAW / MENTAT_FORMULA_FACTS stripping), row cap MENTAT_DETAIL_ROW_CAP=45,000 with a reconciling "Other (n rows folded)" fold per (cycle, company), guard `mentat_guard_detail_reconciliation`, FEC committee-type/designation labels. A was ENTANGLED with 3-4 other lanes' uncommitted hunks in 5 of its 7 files, so it was isolated by staging ONLY A's hunks — `git apply --cached` of a context-anchored A-only patch + `git add` of the 2 pure-A files — never `add -A`; an independent verifier PASSED it (staged blobs compile via node --check / py_compile, 0 foreign markers staged, working tree's ~88 other-lane files untouched). LESSON: `git apply --cached --unidiff-zero` silently misplaces pure-insertion hunks after earlier hunks are dropped and `--check` passes anyway — use context-anchored patches and prove the staged blob with node --check. STILL UNCOMMITTED in that tree: every other lane's work + all .bak-* + node_modules. [SUPERSEDED 2026-09-18: all of it is committed and the dated backups are ignored - see MENTAT UNCOMMITTED RECONCILE] The Banking workbook REBUILD that surfaces the two new sheets in the console is the separate data-side step and is Paul's — its in-flight status (and a correction that the Banking pre-flight "0 unresolved rows" was VACUOUS, real count 2,070) lives in the brain-adjacent memory `mentat-chart-studio-fields-lane-2026-09-12` / `mentat-chart-studio-review-2026-09-11`.
- STAFFER RELATIONSHIP EVIDENCE (2026-09-08): a further user-authorized identity/math audit is live on port 8841 (PID 34020, Moneyball_Redesign.html). Full fixed-input comparison withdrew 12 compound-surname-conflicting display aliases, added none, and retains all 24 affected source profiles separately pending fuller identity evidence; this is not a claim that they are different humans. Automatic aliases 5,872 -> 5,860, visible network rows 127,914 -> 127,926. The v8 spine/graph pins and source counts are unchanged. Missing installed payroll evidence fails closed across generations. Routes distinguish daily intervals, modeled report cores, uncertain presence windows and shared background; shared lobbying activity no longer supplies employment points. Scores do not measure familiarity. Model-version changes invalidate live revisions/caches. Intern exclusions remain 52,107 and current-staff count 14,216. Validation: 199 targeted tests; Astra independent review PASS with 95 tests; 32 new boundary checks also pass against the proposed committed modules; three live route probes unchanged in path/cost. Evidence: Melange audits/staffer_relationship_evidence_20260908/ADJUDICATION.md and completion_receipt.json. Only this scope was reverified; prior 15 classified global audit failures are not closed by this result.
- 2026-09-06 20:21Z-~21:00Z: a PEER SESSION (worktree graph-consolidation-identity-d8d358, session 64640612-01db-4167-b6ee-bff273b9cfb6) ran a full `run_pipeline.py` chain against the LIVE tree, not the scheduler. It executed step 11 `verify_collector_roster_updates.py` at 20:30:09Z (202 accepted, 20 queued, 5015 already present, 910 unresolved) and step 12 `sync_sentinel_bill_ledger.py` at 20:30:12Z, PASS at 20:32:04Z. Effects: collector_roster_updates.ndjson 3 -> 202 rows (b81f1b75 -> c1d108ee), collector_roster_pending.ndjson unchanged at 20 rows but rehashed (49e1e02f -> bc0b3cac), sentinel_verified_membership_history.ndjson 199 -> 205 rows (c4107a8c -> 59c3807a), verified_interaction_rows 204 -> 210, ledger_rows_excluding_header 18,828 -> 18,834, current_delta binding RE-ESTABLISHED at c1d108ee, both roster files now stamping today's repository sha c3af8298. `discovery_candidates` 18,579 and `discovery_pending_review` 14,031 are UNCHANGED. The 2026-09-05 baselines for these five files no longer exist on disk. OPEN: the step-12 receipt records status PASS alongside `artifact_process_exit: 0xc0000409` (STATUS_STACK_BUFFER_OVERRUN) - whether the gate inspects that exit code is unexamined. The chain did NOT stop after step 12: it ran a full downstream cascade to roughly 21:00Z (narratives, dashboard_data.json, lobby surfaces, staffer_network_section.json, member_desk_bundle.json at 20:58:47Z, Moneyball.html at 20:58:52Z, audit_full temp artifacts 20:59:59Z and 21:00:29Z). HAZARD FOUND 2026-09-06 21:05Z and recorded as [[ledger/melange-systems-brain/DE-016|DE-016]]: re-running `verify_collector_roster_updates.py` standalone AFTER that cascade collapses the accepted delta 202 -> 3 and breaks the step-12 `current_delta` binding, because `make_member_desk.py:2034` folds this producer's output into `member_desk_bundle.json`, which is the producer's own next-cycle input. The govinfo lane hit this live under backup and ROLLED BACK: all five in-scope files were restored to the chain's 20:30:09Z state (content and mtimes), `current_delta` binding re-verified HOLDING at c1d108ee, `sentinel_verified_membership_history.ndjson` never touched at 59c3807a. OPEN for Paul: whether step 11 needs a guard against standalone invocation, since nothing currently prevents an operator or task from running it.
- SUNDAY 2026-09-06 06:00 WEEKLY REFRESH DIED. MoneyballWeeklyRefresh Last Result 1073807364 = 0x40010004 = STATUS_CONTROL_C_EXIT; last log line 06:46:53 ("Wikipedia biographies (full roster)" OK), nothing after, ~46 minutes of runtime. It died in the COLLECTOR phase, which sits above the chain, so chain steps 1-2 never ran from the scheduler. `data/engine/weekly_refresh_status.json` is STALE, frozen at `"last_outcome": "RUNNING"` / `"last_start": "2026-09-06 06:00:01"` with no live process behind it - anything trusting that field is being misled. Next scheduled run 2026-09-13 06:00.
- GOVINFO CANDIDATES REVIEW (2026-09-06, branch claude/govinfo-candidates-review-98f805): the "22 new discovery candidates" of SENTINEL_LANE_COORDINATION_2026-09-04.md:71/:80 are REAL and materialized - 18,579 (congress_advanced_current, sha 7a9bd69d) minus 18,557 (07-25 audit snapshot, sha debb8a20) = 22, confirmed by two independent routes with 0 removals. CORRECTION OF RECORD: the +22 is a discovery SOURCE SWITCH, not incremental detection; sync_sentinel_bill_ledger.py:945-947 is a stateless full rebuild with no prior-run state, and the doc's "18,806 expected" at :60 is a human projection, not a computed value. Adjudication PROPOSED NOT APPLIED at audits/govinfo_candidates_20260906/proposed_decisions.ndjson (sha 87164cca, 14 exclude / 6 hold_visible_non_scoring / 2 upsert; ALL rows scoring_eligible false and ultimate_direction null, since integrate_greenlit_legislation_culling.py:380-390 derives eligibility from direction and direction is Paul's stance call). Rule fixed BEFORE member resolution per [[ledger/melange-systems-brain/D-005|D-005]]: Gate A negative screen over OFFICIAL GovInfo XML (14), Gate B L3 operative text (2 - 119:hr:10082 and 119:hr:10230, both amending the FCU Act in their titles), Gate C centering test (5), Gate D procedural vehicle (1 - 119:sres:817). 119:hr:10017 anti-CBDC is HELD not excluded despite zero CU terms, because [[ledger/melange-systems-brain/D-002|D-002]] priced its siblings H.R.1919/S.1124 at 0.15. Member relationships RESOLVED: 102 distinct members (21 sponsors, 86 cosponsors, 5 both; 69R/33D), 102/102 resolve to the 533 roster, cosponsor counts agree 22/22 against BILLSTATUS, zero withdrawals. STRUCTURAL, re-tested live against the 20:30Z chain output: no edge from these 22 can ever be created - verify_collector_roster_updates.py:521 iterates only keys already in bill_repository_live.json, so absent keys are never visited and yield NO row, accepted or queued; `bill_not_in_ledger_universe` fires for the OPPOSITE condition and is marked unreachable at :528. "VISIBLY NON-SCORING" IS HALF-SATISFIABLE: non-scoring is structural (sync_sentinel_bill_ledger.py:945-965 hardcodes scoring_eligible False) but the 1,184 held_visible_non_scoring rows have NO RENDERER anywhere in fec/, run_pipeline.py, or either template. LEDGER NOT UPDATED: legislation_adjudication_ledger.ndjson is GENERATED by integrate_greenlit_legislation_culling.py:517-530 and promoted by promote_greenlit_primacy_integration.py:61-62, and has not been written since 2026-07-28, which is why all 22 are structurally unadjudicated and that population keeps growing. Receipt: audits/govinfo_candidates_20260906/RECONCILIATION_RECEIPT_2026-09-06.md plus its 20:32Z addendum. New dead end recorded: [[ledger/melange-systems-brain/DE-015|DE-015]].
- Live tree HEAD measured 2026-09-01 evening: main at ade12ee22 "Speech corpus: document measurements and data map" (speech-corpus commits after 022c3c728; the 022c3c728 narrative below is history). Mirror state NOT re-measured 2026-09-01. Live-tree working state: the ENTIRE staffer-network build is untracked (see Active workstream).
- Live tree is ON MAIN at `022c3c728` "Exclude volatile git bookkeeping from manifest sentinels"
  (measured 2026-08-27 ~15:30-16:15 UTC). This line had gone THIRTEEN DAYS and four commits stale at
  `846d90ae3`; the arc chain since is `846d90ae3 -> ... -> 41656d2d8 -> baab05ba3 -> dfb47fc6b ->
  022c3c728`. `022c3c728` is an AMEND of `5c49caafc` (same parent, same author date, committer date
  7m48s later) which added `data/system/system_manifest.json` to the commit; `5c49caafc` is now
  UNREFERENCED, on no branch, reachable only from two reflog entries, and a pruning `git gc` destroys it.
- MIRROR IS CURRENT at `022c3c728`, pushed 2026-08-27 11:42:18 (branch) / 11:42:19 (main) local;
  `rev-list --count main` = 839, ancestry complete. Record ref MTIMES alongside shas when reporting
  mirror state: a census taken between the 11:25:56 commit and the 11:42 push reported "nothing pushed
  since Phase 0", which was true at measurement and false seventeen minutes later.
- Live-tree working state: 27 dirty entries, NONE under `data/system/`, `fec/audit/`, `fec/tests/` or
  `audits/`. The manifest is tracked and clean against HEAD.
- GATE BASELINE, measured in the LIVE TREE 2026-09-05 12:12-12:54 local (bill-lobbying lane, full chain on Paul's order): step 2 intake gate ACCEPTED in 333 s (press retry pass complete, audio_supply clean); steps 1-43 OK; step 31 `compute_pillars --write` rewrote ranks_python.json BYTE-IDENTICAL (0/533 moved, 0 scores changed, ab_weights 45/10/40/5 unchanged - the 09-03 out-of-lane weight set, still unconfirmed); step 44 `build_dashboard_bundle.py` FAILED: contract check at :81 - `member_narrative_evidence_v4.json` basis_sha256 (09-04 16:10) no longer matches `data/members/profile_basis_v2.json` (rewritten 09-05 03:05 by another lane); steps 45-63 (forecast refresh, surfaces, audit_full) NOT reached; audit figure stands at 573/6 from 09-04. compute_pillars warns: ROLE REGISTRY EXPIRES IN 120 DAYS (2027-01-03) - CHAIN WILL FATAL HERE.
- GATE BASELINE, measured in the LIVE TREE 2026-09-04 evening (bill-lobbying lane, after applying A+B): kernel 175 passed / 2 FAILED - `audit_stale_imports` (42 bare-import findings across 21 try/except sites in 15 files, all `fec/surfaces/staffer_*.py` plus `install_staffer_live.py`) and `test_primacy_tier` (the standing frozen-board pin mismatch, Paul's call since 2026-08-11); `audit_full` 573 passed / 6 FAILED - V-1 vote-lean staleness, legfix5 culling, press refresh feed (the REJECTED `press_refresh_20260904` intake), audio manifest partition (longform collection running), A2b glassbox.events sentinel churn, and personal-texture-vs-desk 480/480 mismatch (UNDETERMINED; both producers modified today by other lanes; see the RUN record). `[FCST] cosponsor_forecast_freshness` OK. `[SYS]` agreement 330 checks / 1 failed (the glassbox churn). UPDATE 2026-09-06: `audit_stale_imports` CLOSED - fix applied in the main tree, regression suite `fec/tests/surfaces/test_staffer_surface_import_modes.py` applied and registered at `fec/tests/run_tests.py:418`; kernel now 182 passed / 1 FAILED (up from 181 passed / 1 FAILED), sole failure the pre-existing, unrelated `test_primacy_tier :: test_frozen_board_fixture_matches_all_533_members`. All uncommitted in the main tree.
- GATE BASELINE, measured in the LIVE TREE (worktree figures are not gate figures — CONSTRAINTS): at
  `dfb47fc6b`, kernel 162 passed / 0 FAILED (exit 0, 841s) and `audit_full` 563 passed / 5 FAILED with
  `[SYS]` 333 checks / 3 failed. The three `[SYS]` failures are the always-red defect [[ledger/melange-systems-brain/DE-011|DE-011]] and are
  what `022c3c728` fixes. The other two are the standing pre-existing pair (vote_category_lean V-1
  staleness; legfix5 culling promotion state). NOT re-measured at `022c3c728` — that is the next lane's
  first job, and until it is run the post-fix gate figure is UNVERIFIED.
- The Paul-ratified UI simplification is merged (`07e7dd270`) and DEPLOYED — all 9 surfaces rebuilt.
  Per-page selections: industry landing B, champions B, bills A, forecast A, screen A, dashboard B
  (renames only), desk unchanged plus a new Responsiveness section; filings unchanged.
- The CU tensor repricing is merged (`3fb70961c`) and deployed through the full 36-step chain.
  `ranks_python.json` rank map moved 0/533; `PRIMACY_CU_TENSOR=0` reverts byte-identically.
- Board today: Tier 1 ends 11 Sherman / 12 Vargas / 13 Rounds. Huizenga is Tier 2 #15, Cortez Masto
  Tier 2 #17 — both ratified.
- Gates: kernel tests 153/0 (post-merge, live tree, 2026-08-13); `test_primacy_tier` 83/83; `audit_full` 202 passed / 1 FAILED, that one
  being the pre-existing Paul-gated legfix5 culling item.
- The findings-examination framework is ADOPTED ([[ledger/melange-systems-brain/D-007|D-007]]). Branch `claude/hallucination-detection-framework-a09593`
  carries: adoption `288c631c7`, propagation sweep `236e2a7c4`, sweep adjudication `827b9791b`, the
  causal-claims lint merge `8ed2acb05` (26-test kernel suite, registered in run_tests.py), and the
  build-out record `03dbc290d`. MERGED TO MAIN `8cdd18003` 2026-08-13 and pushed to the mirror; kernel gate in the live tree: 153 passed / 0 FAILED.
- Box tooling (2026-08-14): poppler 25.07.0 (`pdftoppm` et al.) installed per-user via winget
  (`oschwartz10612.Poppler`, SHA256-verified) and on the user PATH via its `poppler-25.07.0\Library\bin`.
  Claude Code's Read tool renders PDF pages only in sessions STARTED after the install (PATH is captured
  at session launch); render verified against a Downloads PDF. The 2026-08-14 PDF fan-out blocker
  (PyMuPDF text-only workaround) is cleared for new sessions. Revert: `winget uninstall oschwartz10612.Poppler`.
- MIRROR IS COMPLETE as of 2026-08-18 (Paul-ordered: "push the mirror", then "Everything"). All 174
  local branches AND all 3 tags now exist on the `mirror` remote (GitMirrors/melange-systems.git),
  verified branch-by-branch as present AND current (174 local == 174 remote, zero behind, zero missing).
  Before this only `main` and one working branch were mirrored, so ~170 branches lived on the OneDrive
  tree alone -- including the historically stranded ones (magical-booth-f272da, clever-elbakyan-15fa11,
  beautiful-hermann-20a94c, compassionate-ellis-d8f98a), the ACTIVE codex/c1-2026-collector and
  claude/melange-research-integration-a31e20 lanes, and snapshot/chatgpt-wip-2026-07-15. Tags newly
  pushed: pre-reorg-20260804, pre-fixall-20260804, pre-legislation-fold-20260804. Same pass also carried
  the 2 unmirrored main commits from the identity-resolver lane (main 7959f05a6 on both sides).
  SCOPE: this makes git-tracked work no longer single-disk. It does NOT cover the glassbox runtime,
  which stays UNTRACKED and therefore still exists in exactly one place (see Open questions) --
  do not read "mirror is complete" as covering it.
- Speech lane 2026-08-25 (session on branch `claude/melange-speech-recognition-cfa049`): the N
  stable-vocal-signature prereg was AMENDED pre-look on Paul's word (G2 140->113, commit
  `213bd6e64`) and the one look CONSUMED — MISS on all four bars (r=-0.0016, perm-p .511, n=110;
  commit `8bf113948`); audio timing/energy LEVEL -> N is CLOSED ([[ledger/melange-systems-brain/DE-008|DE-008]]). B3 confirmed the
  channels carry C/E-flavoured signal, not N. C-consistency draft prereg (`fa87d18cb`) failed its
  G1 diagnostic same day (composite split-half .23 vs .50 bar; volume-consistency dead, pause-only
  variant DIAGNOSTIC-GATED on >=6 episodes/half; [[ledger/melange-systems-brain/DE-009|DE-009]]). Sunday-show venue CERTIFIED for the core
  channels (pause SB@5 .882, volume .764, n=17). Panel-agreement analysis: insider x academic
  agreement by trait = A .489, E .465, N .437, O .310, C .155 (n~106) — two-panel gold feasibility
  tracks inter-panel agreement, making N the one unclaimed trait where a two-panel anchor is
  criterion-feasible; the gold N estimate is carried ~entirely by pink_observer (insider r .374
  dominant+strict-discriminant; ablation without it collapses to .131). Paul's directive
  2026-08-25: audio pivots to DESCRIPTIVE measurement of its own characteristics (triggers, speech
  habits, agreement/disagreement signals) — profile pilot running over NPR (677 eps) + WJ (1,101
  clips w/ stimulus anchors) + Sunday corpora, display-only, no engine consumer ([[ledger/melange-systems-brain/D-013|D-013]]). Also:
  coop_v2 data refresh ratified by Paul and promoted (r=.998 vs June values, ranks 0/533 unchanged,
  kernel 160/160; audit 231 pass/3 fail — two pre-existing + V-1 vote-lean staleness legitimately
  surfaced by the bills-archive refresh `congress_bills_archive_20260825_115305.xlsx`, which kept
  the bill universe frozen and preserved per-section rows). CNN collector budget/census mechanism
  landed default-inert in `fetch_interviews.py`; activation + F1/F2 audit-check fixes are a
  pending decision package (another lane holds an uncommitted `weekly_refresh.py` edit — coordinate
  before touching). Profile pilot v1 DELIVERED 2026-08-25: 188 members profiled, 175 cards (33 with
  landmine blocks) at `outputs/speech_reaction_profiles_20260825/`; WJ featurizer v1 anchoring defect
  found+fixed (+217 min recovered member speech), 232 cross-family duplicate turns deduped
  value-blind; reaction channel display-only (cross-family r=.20, warning embedded in all outputs);
  consumed N-look record UNAFFECTED by either data fix (NPR-only subset independently zero). Pooled
  per-member values snapshot the in-progress Sunday corpus — final assembly re-run pends Sunday
  segmentation completion.
- SENTINEL COLLECTORS REPAIR (2026-09-01/02): the press/hearing collector repair that existed only as uncommitted live-tree edits is now on branch `claude/sentinel-collectors-progress-f7de7d` (`7e1cb0e66` repair, `dbdac0ca1` partial-run rejection, `8d21605bc` hearing feed producer + corpus provenance, `6004fbf91` progress record + evidence). Gates in the worktree: wiring 73/1 skip, fold 21, hearing feed 18, py_compile, diff --check. Staging rehearsal against the real dated runs: 0828/0830/0831/0901 ACCEPTED, 0829 partial (never promotable), cumulative candidate = dedup union (294/294/22,243), active − candidate = 0, live tree unchanged. PRODUCTION HOLD INTACT: both schedulers Disabled, PRESS_BASELINE_FOLD=0, DASHBOARD_PASSWORD_FILE unset. The live feed receipt is REJECTED by the repaired press_stream.py until the cumulative candidate is promoted. Runbook: SENTINEL_COLLECTORS_PROGRESS_20260901.md on the branch. UNMERGED; the live tree carries the same files uncommitted plus other lanes' hunks (narratives v2, speech profile, staffer network).

## Active workstream
- **MEMBERS SECTION CONSISTENCY LANE (2026-09-14 → 09-17).** Packet diagnosis scored 9.00/10 PASS on iteration 3 of 15 (`gan-harness/build-report.md`); round-2 rulings at `audits/members_section_20260914/rulings-round2.md`, Paul: "You are good to go ahead, just trouble shoot" (`phase2/AUTHORIZATION.md`). Landed on `main`: six commits `e3e5ece7c`..`4d0359110` (HEAD `f605a71bf`→`4d0359110`, 41 file-entries, no `git add -A`/stash/rebase/reset) shipping [[ledger/melange-systems-brain/D-031|D-031]] (unified stance ladder), [[ledger/melange-systems-brain/D-033|D-033]] (votes as concrete action), [[ledger/melange-systems-brain/D-032|D-032]] (primacy board `per_area_v1`, supersedes [[ledger/melange-systems-brain/D-028|D-028]]), [[ledger/melange-systems-brain/D-035|D-035]] (Demographic Potential = footprint), [[ledger/melange-systems-brain/D-034|D-034]] (score every social post), [[ledger/melange-systems-brain/D-037|D-037]] (Responsiveness section behind a dial), plus kernel registration of all six Phase-2 suites — kernel `231 passed, 2 FAILED` (both pre-existing: `test_bill_collision_guards` missing backup CSV, `test_make_staffer_network_html` unrecognised verdict). Committee registry ([[ledger/melange-systems-brain/D-036|D-036]]) applied straight to the live workbook and independently verified: 64 new + 49 appended Committee Data rows for 113 members across six bodies, `Rank & Allocation` lookup extended 360→420, workbook MD5-verified before/after. Everything so far is display/engine-input only — **no chain run** — so `ranks_python.json` (md5 `77c357f2ad8d4501a8ea33f7c8b67a9e`) is still the pre-lane board and AUTHORITY STALE for 454 members; full-body audit stands at 546 passed/19 FAILED (10 of the 19 are the system-manifest drift gate). Pre-change honors generation archived: `C:\Users\pgoff\worktree_retirements\20260915_honors_lane_backup.zip` (63 entries, verified, no CRC failures).
  The chain run (next step, **MOVES RANKS**) must confirm: the honors generation actually publishes under rule G (blocked pre-lane by two stale source-hash contracts — cleared by `per_category_stance.py` and `build_vote_category.py --publish`, both due chain steps); AUTHORITY STALE clears for the 454 members; the demographic-potential and system-manifest audit checks go green once `member_desk_bundle.json` regenerates under the new dials; and a rank-delta review explains the movement ([[ledger/melange-systems-brain/D-032|D-032]] alone already measures 55 tier changes; [[ledger/melange-systems-brain/D-034|D-034]] and [[ledger/melange-systems-brain/D-035|D-035]] both still need their chain-run numbers).
  Open rulings for Paul: (1) `LEADERSHIP_KINDS = ('legislative','letter')` ([[ledger/melange-systems-brain/D-033|D-033]]) — ratify or reverse the coordinator's bounded call that votes alone cannot tip an overall opposition label; (2) real tiers for the six new committee bodies ([[ledger/melange-systems-brain/D-036|D-036]]), replacing the `[Moderately]` placeholder; (3) the moneyball-change-control/config-and-flags skill corpus (S-5) still documents pillar weights **30/25/40/5** in 7 of 11 tracked hits while code and the live `ranks_python.json` have carried **45/10/40/5** since before this lane (e.g. `.claude/skills/moneyball-config-and-flags/SKILL.md:228`) — a skill-corpus doc fix, Paul's to authorize, not this lane's to silently edit; (4) press as a fourth honors action kind needs its own immutable press-evidence artifact and chain step before it can bind safely (`evidence/d1-d7-implementation.md` §11) — not built; (5) two pre-existing, kernel-**unregistered** suites are failing and are not this lane's: `fec/tests/infra/test_pipeline_producer_scope.py` (`regenerate_descriptive_profiles.py` missing from the `CHAIN` literal) and `fec/tests/infra/test_audit_completion_20260716.py` (3 of 35, live-artifact drift against frozen expectations). **[2026-10-11: (1) ratified [[ledger/melange-systems-brain/D-145|D-145]]; (3) closed [[ledger/melange-systems-brain/D-141|D-141]], docs fixed Melange 751f002f5; (5) both still red alone, on the census BACKLOG (7d57fb209).]**
- CU PUBLICATIONS INVENTORY FOR SS (opened 2026-09-12, Paul: "Start collecting the CU publications for the SS inventory"): purpose = bill-level inventory of whole CU-sector publications so the substance term (C=1/S=5/SS=10) can be calibrated by distinct-publication mention frequency (plan section 4; SS never fired in the shadow: 3 verified bill links of 1,301 member-excerpt publications). Access facts measured 2026-09-12: americascreditunions.org serves plain requests and its robots allow crawling EXCEPT `Disallow: /*?page=`, which covers its own sitemap pages and every paginated listing (so its archive is reachable only through already-known article URLs; the press cache holds 2,481 ACU article URLs 2024-01..2026-08); americanbanker.com/creditunions open with a 10 s crawl-delay and sitemaps back to 2023; ncua.gov open (regulator family, kept separate); cutimes.com and cuinsight.com return 403 to every non-browser client (policy block, not bypassed); cutoday.info robots `Disallow: /` for all but named search engines (excluded). Bootstrap inventory run `cupub-inventory-20260912`: 903 URLs (AB 601 spanning 2023-01-03..2026-09-10; NCUA 288; ACU 14), 55 requests, zero 403/429/CAPTCHA, receipted at %LOCALAPPDATA%\Melange\cu_publications\inventory_20260912\. Body collection run `cupub-bodies-20260912` launched detached the same day (ACU known URLs + AB + NCUA; robots-checked, 3 s pacing, 10 s AB; bodies + bill-reference pass; receipts under bodies_20260912\. Existing local corpus for reference: press_text_cache.jsonl 2,481 docs (35.9% login-walled, bodies 97.7% truncated per the 07-24 audit) and 291 refresh full texts; none usable to assert zero coverage. Production collector = Codex work after 2026-09-17 (contract drafted: audits/legislative_effectiveness_shadow_20260911/COLLECTOR_CONTRACT_CU_PUBLICATIONS_2026-09-12.md). Paul's calls: licensing or permission for CU Times / CUInsight / CU Today (the trade-journalism panel is otherwise American Banker only); whether ACU member-only content (login-walled) is in scope; whether NCUA counts toward CU-sector significance or stays a separate family.
- LEGISLATIVE EFFECTIVENESS SHADOW (2026-09-10 -> 09-11): Paul commissioned in Codex Desktop a plan (`research/LEGISLATIVE_IMPACT_EFFECTIVENESS_IMPLEMENTATION_PLAN_2026-09-10.md`, now in the live tree) and then its execution ("execute the implementation plan, then show me the diff"). The implementation lives ONLY in the Codex worktree `C:\Users\pgoff\.codex\worktrees\f149\Melange Systems`: baseline-carryover commit `d68ddcda6` on live main `2f11d9490`, plus an uncommitted implementation of 11 modified tracked files (+193/-18) and 37 untracked files (9 modules, 6 unittest suites = 77 tests, shadow outputs 887 MB). Codex died on `usage_limit_exceeded` at 04:07Z 09-11 (quota returns 2026-09-17 13:16) before writing the validation report or presenting the diff; its final `--verify-reproducible` run completed on disk unread. Claude closed it out 09-11 read-only: independent re-run 46/50 outputs byte-identical (4 timestamp-only logs), Codex's audit PASS on both generations, inputs 20/20 and code 14/14 frozen, live tree untouched and still normalized-identical to the baseline, Leg% refactor value-identical 533/533 to `ranks_python.json`, baseline allocation replay byte-identical to production `per_topic_alloc.json` / `per_topic_coalition.json`. Shadow findings (118th, as-of 2026-09-06, H=180 illustrative): 352/533 members ranked; Spearman legacy Leg% vs results-only 0.498, vs 70/30 composite 0.719; `realized_results_v1` board changes 131/533 tiers, unseats 57 seated members incl. all 13 Tier-1, 182 members results-unavailable or gate-failed; FLIP replay moves $40.3M member-topic dollars against a $38.0M topic budget sum. SS never assigned (thresholds not adopted; 3 verified bill links of 1,301 publications). Record: `audits/LEGISLATIVE_EFFECTIVENESS_SHADOW_VALIDATION_2026-09-11.md` + packet `audits/legislative_effectiveness_shadow_20260911/` (both in f149). NOT DONE: run_tests.py registration of the six suites (contract validated, ledger run-id legeff-runtests-20260911; MCP Codex blocked by the health check "stdin is not a terminal"; config.toml now pins gpt-6-astra/ultra); apply to the live tree; kernel + audit_full re-measure in the live tree; plan section 8 activation decisions (all Paul's). UPDATE 2026-09-12 ~00:20 ET: Paul ordered "Fully implement the new parameters" and "Do it for me"; the 26 lane files are now IN THE LIVE TREE (26/26 sha256 match, +15 files, backups of the 11 originals at backups/legislative_effectiveness_20260912/ with manifest; the copy needed three tries - a PowerShell case-insensitive variable clash in the script, a wrapped paste, and the auto-mode classifier refusing every agent/relay/combined form of the copy, allowing only the plain -File invocation). Live gates after apply: six new suites 77/77; ranks_python.json, primacy_factors.json, industry_tiers.json, member_desk_bundle.json byte-unchanged; kernel 187 passed / 4 FAILED (00:13 ET; first attempt stalled 15+ min at the CHRG-attribution section on OneDrive cloud-only placeholders - ReparsePoint=True on data/stance and social_media.db - then a second run completed). Of the 4: three NOT this lane - say-do "missing evidence source fails OPEN" (identical with the pre-apply moneyball_core.py; cap_uncorroborated treats _CORR={} like a member with no evidence), test_bill_collision_guards (backups/bill_directions.PRE-LEGFIX3.csv missing), test_staffer_surface_import_modes (inspect AttributeErrors in four staffer surfaces); ONE caused by this lane - test_run_legislation_pillars_and_ranks: fec/legislation/run_legislation_pillars_and_ranks.py pins six compute_pillars source literals and the lane's Leg% refactor replaced legp=percentrank(Ov,O[m]) with legislative_percentiles(O,mode='legacy') (value-identical 533/533); the wrapper is NOT on the chain (run_pipeline.py:120 calls compute_pillars.py --write directly), so Sunday's weekly is unaffected; re-pinning that literal is Paul's ratification and Codex's edit. test_primacy_tier now PASSES (was the standing failure on 09-07). Candidate outputs materialized off-tree at %LOCALAPPDATA%/Melange/legislative_effectiveness/shadow_20260912/ (generation exit 0, verify 766,568 checks, four reporting_ranks_*.json, industry_tiers_realized_results_v1.json with the same 13 Tier-1 names, primacy sidecar, four replays). Production dials still OFF (PRIMACY_BOARD, EFFECTIVENESS_* env unset); nothing lobbyists read has changed. Record + packet also copied to live audits/.
- STAFFER DASHBOARD SECTION + CANONICAL Moneyball.html (2026-09-04 evening -> 09-05 ~02:45 ET, session melange-audio-integration-9c7c56; Paul: "Finish this up, and regenerate the dashboard with all the self-healing features and the new network integrated into the moneyball dashboard as its own section", "resume the crawler and keep going. FINISH IT UP", "run the finishing chain yourself, I approve the review layers"). ALL work in the LIVE tree, no git (Paul's 09-01 rule), every edited file backed up under backups/staffer_section_20260904/. SHIPPED: (1) Moneyball.html canonical = the project build at MB_ROOT (make_combined.py:386); the Desktop copies (09-02 vintage, no writer, nothing the project build lacked) are now <1 KB redirect stubs preserving ?m=/?coal=, originals in backups/desktop_copies_20260904/ with MANIFEST.json; both member URLs verified to land on one file (audits/MONEYBALL_HTML_CANONICALIZATION_2026-09-04.md). (2) Staffer network as the FOURTH surface of Moneyball.html (#app-staffer, gotoStaffer, ?v=staffer&s=<Name>): producer fec/surfaces/build_staffer_network_section.py -> data/engine/staffer_network_section.json (4,123,040 B, receipt-gated on the v4 verification PASS, input hashes bound, deterministic, 102 tests, registered in run_tests.py = kernel +1 suite), page fec/surfaces/make_staffer_network_html.py + templates/make_staffer_network_html_00.tpl -> staffer-network.html (all ids stf-, one style + one script, zero external loads; the 8841 sidecar is only feature-detected with a no-cors fetch; 35 tests), make_combined.py merges it (46 tests), dashboard header link "Staffer network", run_pipeline.py steps before make_member_desk (producer called with --max-bytes 5000000), audit_full.py [STAFF] block (3 checks, all OK). Independent verification: recounts for C000880/P000145/S001176 equal the JSON; zero-overlap REJECTED pairs 16,001,459 shown on the surface; browser render of all four routes PASS, console clean; ranks_python.json untouched. The other lane's inject_navigation hook (external script load from 127.0.0.1:8841/staffer-live/launch.js) is a no-op now (peer session confirmed no dependency). (3) Politico crawl kept alive: atomic_json rename retry (WinError 5/32) in politico_profile_crawl_playwright.py; watchdog politico_crawl_watchdog.ps1 rewritten as a 10-minute-staleness backstop with other-supervisor detection (self-test 11/11) but LEFT PARKED because the operator's own runner is healthy and the crawl was 17,886/18,618 at 02:35 ET; finishing chain runner audits/staffer_network/finish_staffer_social_network_chain.py (27 tests, 15 resolved steps: verify --require-complete -> report -> bridge primary+twin+verify -> network v5 primary+twin+verify -> reconciliation doc -> section refresh -> make_combined chain tail) relaunched --wait --execute (PID 58536, 02:32 ET) after its stale-halt-file gate was fixed. REGRESSION FOUND + FIX IN FLIGHT: the fourth surface pushed the emailed all-in-one zip to 14,808,817 B vs the 14 MiB budget, halting the chain at make_email_package before audit_full; fix = make_combined also emits a three-surface Moneyball_Email.html that the packager zips as Moneyball.html (Paul may instead raise the budget if he wants the staffer surface emailed). Read-only audit_full at 22:55 ET: 574 passed / 8 FAILED, none from this lane (standing V-1 + culling pair, two [SYS] manifest items, media-blend press hashes, personal-texture 480 mismatches, press refresh sources/intake, email packages).
- BILL-LOBBYING REGRESSION LANE (2026-09-04, evening; branch claude/bill-lobbying-regression-d38c1e, worktree employment-tenure-adjudication-e27de8): the forecaster Paul calls "the linear regression" is `fec/lobbying/cosponsor_forecast.py`, already ridge-logistic; lobbying is bill SELECTION, not a predictor. A (weekly BILLSTATUS-119 bulk refresh, `fec/legislation/refresh_billstatus_bulk.py`) and B (hash-gated `fec/lobbying/refresh_cosponsor_forecast.py` chain step at position 56, immediately before its first consumer `make_lobby_network_html.py`, plus `audit_full` check `cosponsor_forecast_freshness`) are APPLIED to the live tree UNCOMMITTED (7 files: 3 new + 4 insert-only hunks in run_pipeline.py, weekly_refresh.py, audit_full.py, run_tests.py; 24 kernel tests). Both dials ON at user scope (`BILLSTATUS_BULK_REFRESH=1`, `COSPONSOR_FORECAST_REFRESH=1`, setx); rollback = unset them. MoneyballWeeklyRefresh is ENABLED (re-enabled today by the sentinel-finish lane), next run Sat 2026-09-06 06:00. First live run: A pulled 8/8 changed zips in 37 s; B RAN 768 s on them; 119th panel 790 -> 815 bills, positives 18,048 -> 18,817, AP 0.2386; all 12 verified post-snapshot joins now actual=1 (0 remain); sidecar bills_with_forecast 304 -> 306; ranks and dashboard_data byte-identical. The "Chance they sign on" grid lives on lobby-forecast.html (1,928 bills, top 10 per bill). Dry run 2026-09-04 proved determinism (scores byte-identical on unchanged inputs); same-input weeks cost ~7 s. `build_system_manifest.py` is NOT a chain step and takes ~29 min; any zip refresh needs a manifest rebuild before the [SYS] gate is clean (rebuilt twice today; manifest modified on disk, uncommitted). Full chain runs are BLOCKED at step 2: `audit_collection` REJECTS `outputs/press_refresh_20260904` (62 press-delta bodies without an exhausted-retry receipt) - the press lane's gate, untouched; the tail ran via `--from refresh_cosponsor_forecast`. C-ledger coupling options 1-3 and the departed-member policy remain Paul's (design record decisions 2-6). UPDATE 2026-09-05: the press intake rejection cleared on its own (the run's live-network retry pass finished 09-04 18:24 with a valid exhausted-retry receipt for all 63 bodies; re-run of step 2 at 22:56 ACCEPTED; passed again inside the 09-05 full chain). The full chain now stops at step 44 `build_dashboard_bundle.py` on the narratives lane's stale `member_narrative_evidence_v4.json` basis hash vs `profile_basis_v2.json` (rewritten 09-05 03:05); nothing this lane produces feeds that step, and it runs before position 56. Ranks byte-identical through step 31. Finish path: that lane re-runs `build_member_narrative_ledger.py`, then `run_pipeline.py --from build_dashboard_bundle`; Sunday's weekly (2026-09-06 06:00) stops at the same step until then. Records: audits/COSPONSOR_FORECAST_SELF_UPDATE_2026-09-04.md, audits/COSPONSOR_FORECAST_REFRESH_RUN_2026-09-04.md (sections 6a and 8 carry the 09-05 result).
- STAFFER NETWORK EMPLOYMENT LANE (2026-08-30 -> 09-01): the full build lives UNTRACKED in the live tree (fec/staffer_network 26 modules + 70 schemas; audits/staffer_network 72 scripts + ~1.5 GB generations; data/staffer_network 150+ reviews; off-repo store C:\Users\pgoff\AppData\Local\Melange\staffer_network) - single-disk, mirror does not cover it; only the 08-29 design/metrics docs are committed (claude/melange-data-expansion-958236). Fable DATA adjudication 2026-09-01: data/staffer_network/reviews/STAFFER_NETWORK_EMPLOYMENT_TENURE_DATA_ADJUDICATION_20260901.md (sha256 11658f129cc512d4e34928e78a2a7a1de58047256bd3b1cf61f464b77f4fff94; copy in Downloads). Verdicts: employment tenure NOT ESTABLISHED for any of 25,340 sealed LDA IDs under the lane's own contract; v3 overlay = state of record (4,996 bounded provisional episodes / 1,186 people, all blocked, 5 gates OPEN); v5 promotion prototype (18,815 episodes / 2,672 people) ruled NOT CANONICAL - three gates REMOVED not met, 0 of 2,672 identity + 1,371 container decision IDs resolve, receipt binds no inputs, v3 quarantine fields dropped by schema copy, 13,840 Senate observation-split episodes promoted while all 6,953 Senate match rows carry promotion_gate BLOCKED_PENDING_IDENTITY_AND_EMPLOYMENT_REVIEW, 1,486 promoted people had zero v3 provisional episodes (1,478 Senate-split-only, 8 authenticated-profile-only; confirmed by two methods), 147 episodes carry 2-3 conflicting decisions; complete-lifetime attestation 0/25,340 and structurally unreachable (only a LegiStorm checkpoint can bind provenance; LegiStorm ~zero data); A5c pre-2009 House backfile CLOSED as BLOCKED_PARTIAL_RECOVERY (1 of 52 quarters, [[ledger/melange-systems-brain/DE-014|DE-014]]); Meta LOOP BLOCKED stands (exit conditions E1-E7 in the doc). NEW FINDING: House SOD 2016Q1-2026Q1 payroll match lane (11,788 rows, 3,355 people) was never consumed by A4/v3/v5; all 3,355 are P3 so the partition is not overstated, the overlay is blind to them. TRAP: two unrelated P0/P1/P2 vocabularies - employment-LOOKUP (LDA text) 6,527/2,957/15,856 vs acquisition PRIORITY (evidence completeness) 11,643/4,843/1,741/7,113 after A9; the math doc's 16,486 / 18,227 = A9 P0+P1 / P0+P1+P2. Decision menu T-1..T-7 open (v5 disposition; D-Q5 gold owner; D-Q2 LegiStorm; D-Q1 Politico; E6 overlay rebuild; attestation producer as .candidate; math-doc addendum). Paul 2026-09-01 evening: asked whether more (partial) confirmations are extractable from on-disk evidence - a rule-based confirmation-ladder measurement (name uniqueness, office corroboration vs covered-position text, chronology consistency, multi-source overlap, observed tenure bounds) is IN PROGRESS, read-only.
- STAFFER SORTING LANE (2026-09-06): rulings [[ledger/melange-systems-brain/D-018|D-018]]..[[ledger/melange-systems-brain/D-022|D-022]] applied. Stage plan: 0 registry + inactive list ‖ 1 name standard + blind gold + re-key delta → 2 spine v7 re-key with id map → 3 social network v6 (persons only in the operator; containers/organisations as grouping layers; sidecar tiers as edge strength) → 4 sidecar v3 with spine ids + LDA status label table in Paul's vocabulary → 5 people index person-only and source-scoped, Groups tab (offices, organisations), current-first, rebuild and ship → 6 commit code/tests/docs, generations ignored. Status at write time: stages 0 and 1 running in agents; nothing re-keyed, nothing deleted, nothing committed.
  Progress 2026-09-07 ~04:30 ET (all LIVE-tree, uncommitted, backups in backups/staffer_sorting_20260907/): Stage 0 DONE — registry built (store was 24.8 GB / 315 dirs); Paul ran delete_inactive_generations.py --execute: 81 dirs / 8.78 GB removed, 13 kept by the stricter re-check, C: ~105 GB free. Stage 1 DONE — fec/staffer_network/name_standard.py (nickname classes v2, 479 entries), blind Sonnet gold 300 rows: all_parts 96.1% on high-confidence rows, 0 label defects; v1.1 ruled (bare V = middle initial; house_csv surname particles; Senate job-title fragments stripped; parentheticals are nicknames only when a single capitalised non-role word; display never renders nicknames). Stage 2 — spine v7 first build PASS (twin identical, verifier 36/36; 17,351 keys changed, 3 merges, spine_id_map_v6_to_v7); being rebuilt in place under v1.1 with merged-person span UNION and a same-period co-occurrence merge guard. Stage 3 — build_staffer_social_network.py reworked: PERSONS-ONLY operator, uniform restart, co_tenure the only operator layer, containers/organisations/policy areas as grouping artifacts prefixed staffer_social_*, office_diversity replaces bridging_diversity, --spine-id-map; fixture suite 103/0; 2,000-person dry run twin-identical; full build ≈ 11 min, ≈ 4.7M edges — NOT yet run. A writer outside this session added CO_TENURE_EXCLUDED_CONTAINER_KINDS = {'admin'} ('administrative payroll headers are not workplaces'; 54 admin containers = 70.8% of v5 co-tenure pairs) — preserved; the same ruling applied to Groups scope (admin out). Stage 4 — sidecar v3 (v7 spine ids on the 18,206 person-office records by office-anchored name_key; tiers untouched, INV-5 identical) in development. Stage 5 — 8841 sidecar: people index 684,929 → 185,799 persons-only rows (0 organisations/containers/policy areas; 306k unlinked LittleSis persons dropped; routable 180,022 unchanged); /api/staffer-groups-index + Groups tab; fec/staffer_network/lda_status_labels.py joins 25,340/25,340 (NO_RECORD 21,431 / LIKELY 2,327 / CONFIRMED 1,582); CORRECTION: R0 means registrant on file but uncorroborated, so every lobbyist reads 'Employer on file: <registrant>' with the corroboration phrase in a fold — 'Employer not on file' retired; PAUL MUST RESTART task MelangeStafferLiveSidecar for 8841 to serve the new routes. Static page: build_staffer_groups_section.py + template _01 (default _00 byte-identical), display_name_for() via the name standard, current-day trim (offices only with current staff, earlier staff as a count, organisations capped 12) to fit the 5 MB pin, HON:<bioguide> offices named from the ledger's own strings, banned-word scan exempts data values; preview on 127.0.0.1:8806, nothing deployed. Kernel 186/1 (only the standing test_primacy_tier pin). OPEN for Paul: lobbyist names on the page (LDA corpus receipt says privacy_class restricted-machine-local; LDA filings are public); whether the outside writer is his other session (one writer per file from here). Consumers that break on a v6 generation (fix before repoint): build_staffer_network_section.py:405-408 (bridging_diversity_exploratory), :899 + finish_staffer_social_network_chain.py:1519-1523 (ranking_controls), build_staffer_groups_section.py:437-438 (containers from node_scores).
  Progress 2026-09-07 ~17:15 ET: spine v7 DONE and verified (primary/twin byte-identical, verifier 46/46; 144,690 people; 3 merges applied — one by day-level disjoint dates, two Senate no-day-dates; 3 spans unioned; 25 delta residuals within the 102 allowance; LDA/Quorum link counts unchanged; spans carry observed_periods + contiguous_runs). Name standard v1.1.1 (bare V = initial, particles, glued annotations, nickname-content rule, post-nominals): high-confidence agreement 99.6%, payroll family 97.0%, 135 module tests. Landed and green: SHARED EMPLOYEE out of top_staff, 'Same payroll office, same time' relabel with office name/size, POSSIBLE_ONLY edges filtered at the snapshot read (332/332); social builder persons-only with stint union from contiguous runs and admin containers excluded from co-tenure (140/0); naming law retained-audit rule; artifacts prefixed staffer_social_*; Groups payload split into offices (4.13 MB) and organisations (3.52 MB) under the 5 MB pin; admin out of Groups; office cap 60 binds on 37 committees (to 250 in deploy). Running: full social v6 build on v7, sidecar v3 (spine links), organisations rule per [[ledger/melange-systems-brain/D-023|D-023]]. Next: deploy pass (repoint v6/v7/v3, wire Groups producers into run_pipeline, _01 page default, combined page, audit + kernel, sidecar tests, deploy record), Paul restarts 8841, then commit code/tests/docs (schemas need a !fec/staffer_network/schemas/*.json ignore exception). Three Claude process exits today killed running builders each time; all state is on disk and in receipts; the 8841 sidecar is up (watchdog probe flaps were BELOW_NORMAL priority, Paul's one-line fix).
- CONTAINERIZATION / SYSTEM MANIFEST is the live arc (2026-08-25 -> present) and had never been named in
  this section despite being the largest body of work in the log. Phase 0 shipped the manifest producer
  + `[SYS]` agreement gate; the gate then went always-red on its own landing commit and was fixed at the
  root ([[ledger/melange-systems-brain/DE-011|DE-011]]). Open: gate re-measurement at `022c3c728`, [[ledger/melange-systems-brain/D-015|D-015]], the :960 duplicate-candidate defect,
  and four Paul-gated calls — all itemized under Next action.
- Framework lane CLOSED (2026-08-13): all three candidates built.
- GLASSEYE override SHIPPED and verified 2026-08-14, UNCOMMITTED. Glassbox runtime 4.2.0 gains
  fanout.ps1 (derives fan-outs from session transcripts), agentwatch.ps1 (live watcher, now a required
  health role so a run cannot start with it down), and a terminal gate in metaloop.ps1 that refuses a
  finish receipt whose fan-out coverage is unverifiable. Verified by positive control, idempotency,
  kind routing, and a negative control proving finish blocks while fail still closes. See [[ledger/melange-systems-brain/D-008|D-008]].
- The metaloop.md change is MERGED to main (`4f5b2ec55`, observed in git 2026-08-14 afternoon —
  this consumed the previous Next action). Whether the glassbox-runtime version-control question
  was resolved alongside it is NOT verified here; the Open question below stands until someone
  confirms.
- Research-integration lane (2026-08-14, RECONCILED): five uploaded papers (FOLAR / Zhan-Cai TWD
  consensus / BICAM / CampaignView / SNGDM survey) were examined by TWO independent same-day lanes
  (a31e20: root RESEARCH_INTEGRATION_2026-08-14.md @208111500; 062ce9:
  audits/RESEARCH_INTEGRATION_2026-08-14.md @c8ea5805a) which converged on the core slate without
  contact. Paul directed reconciliation: a31e20 merged into 062ce9 @38fd659f1; operative record is
  now RESEARCH_INTEGRATION_UNIFIED_2026-08-14.md (unified F/E/B/C/S + B0/M1 slate; conflict
  resolutions incl. E1 CONDITIONAL on Paul's '-'-ontology ruling and S1 admitted battery-first;
  8-item decision menu, section 5) plus RESEARCH_INTEGRATION_EFFECTIVENESS_2026-08-14.md (living
  scorecard: guardrails G1-G7, program measures PR1-PR8, per-item dated baselines + draft bars that
  lock only inside preregs), both @b943eb59d on claude/melange-research-integration-062ce9,
  mirror-pushed, unmerged. Both source records stay frozen as written. TIME-BOXED item: the 2026
  campaign-site collection window closes at the November 2026 election. Grounding observations
  carried: MEM_N COUNTED 2026-08-17 (Paul said Proceed): MEM=472 via load_corpus() verbatim (grown from
  456 at the 2026-07-09 lock), MEM_N=260, raw reactivity_z 270/533 -- the >=250 N-route gate is MET,
  so the successor N prereg is LOCKABLE; locking and the look remain Paul-gated. F1 FOL-CoT valence
  prereg drafted UNLOCKED (stance_valence_folcot_prereg.md, canonical after the 2026-08-17 dedup); outcome_snapshot_2026-07-04.json at
  data\engine\, scoreable ~2026-09-02. RULINGS 2026-08-14 (later same day): menu items 1-7 APPROVED by Paul (item 6 read affirmative - see [[ledger/melange-systems-brain/D-010|D-010]] interpretation note); MEM_N COUNTED = 260 >= gate 250, N-ROUTE DATA GATE MET (MEM grew 456->472; raw reactivity 270/533); M1/F2/B0 tooling LANDED @6d5303774 (6 files = 3 tools + 3 test files, 45/45 tests, flag-gated OFF, consumed by nothing) via metaloop run-20260814T1552374698259Z-b00ea83fd1; the C1-2026 runbook, F1 prereg DRAFT, and unified-doc section-7 rulings appendix are COMMITTED @3254eced8 and mirror-pushed (Paul-directed 2026-08-14 after the change-report review found them uncommitted-only in the worktree; files committed byte-identical to what the metaloop run wrote; review lane also re-ran the suite itself: 45 passed); Codex adversarial second-review round DEFERRED to the pre-merge gate (recorded); Mentat confirmed EXTERNAL repo at C:\Users\pgoff\Mentat; Codex sandbox cannot launch interpreters on this box (both sandboxes) - coordinator runs all verification. CONSOLIDATED 2026-08-17: peaceful-ardinghelli merged into
  claude/melange-research-integration-062ce9 @78e458fe8, duplicates deduped @c2f2bf496 (canonical:
  fec/tools/b0_bicam_arrival_audit.py + CAMPAIGN_SITE_COLLECTION_2026_RUNBOOK.md +
  stance_valence_folcot_prereg.md, deltas folded); E3+S3 structure probes RUN, both DIE FREE with
  mechanisms recorded (S3 overlap = coverage artifact; E3 degenerate on sparse network -- adverse
  prior for any S1 prereg); B0 residual (per-congress strata reporting, non-bill labeling) rides the
  deferred Codex second-review round; BICAM ACQUIRED 2026-08-17 (Paul chat-approved): 6 zips sha256 6/6 MATCH, snapshot off-repo at
  C:\melange-data\bicam_snapshot, consumed by nothing. B0 arrival audit RUN (reports + findings
  committed, audits/bicam_arrival_20260817/ @f3e821f11): RUN 2 after normalization fixes
  (@4445ae5cc, 22/22 tests): pre-119th bills join 319/319 (100%), pre-119th text agreement 98.65%
  (n=11,474, above bar on the honest stratum), cosponsors PASS byte-perfect 1,288/1,288 (n=304).
  CORRECTED finding (Paul challenged, sustained in part): members = EARLY-118TH VINTAGE (17
  118th term rows vs ~550/congress; freshmen absent by exact bioguide) while bills carry a
  131-bill 119th early-January sliver -- mixed-vintage public drop, data-last-updated 1/25/2025;
  B2 freshman use blocked pending BICAM refresh; 173 universe acts are standalone amendments
  (component not downloaded); per-stratum bar recalibration -> review round. FORECAST COLLINEARITY AUDIT run at
  Paul's direction (@ca2159d3c, audits/FORECAST_COLLINEARITY_2026-08-17.md, read-only):
  engine-stack scope; susc/edge/susc_mult identity rho=1.000; security double-entry in
  pressure_mult; bpf x coop_v2 +0.888 double-count; stance-coverage x breadth -0.851 coupling;
  confounder register (party->susc chain headline, gender via communion, volume->visibility
  +0.70) with named controls (within-party mandatory for any forecast-vs-outcome read);
  five Paul-gated model observations incl. the flip_model docstring-vs-cpf_pressure
  divergence; RETIRED trait-features route (413185090) recorded with its verbatim successor
  predicate (DeltaAP >= +0.010 plant) -- audit outputs are controls, not feature license. FIVE OBSERVATIONS RULED at Paul's direction
  (audits/MODEL_OBSERVATIONS_RULINGS_2026-08-17.md): (a) susc triple-identity FIXED behavior-neutral
  (single SUSC_GAINS dial, bit-exact proof 212,007 points, merge-gate byte-match checklist);
  (b) security double-entry KEPT AS DESIGNED; (c) bpf/coop double-count RECORDED; (d) pm-cancellation
  documented; (e) stale bridge/sqrt docstrings corrected, code untouched. Zero behavior change;
  rank-moving candidates remain individually Paul-gated. MERGED TO MAIN @c6e1c679b 2026-08-17
  (Paul-ordered gate run): kernel 154/0, member_receptivity A==ORIGINAL==B byte-identical, ranks
  byte-identical, tools 48/48, dashboard regenerated with dashboard_data.json + bipartisan.json
  byte-identical, mirror pushed (branch + main). audit_full 201/2: both FAILs pre-existing/time-
  driven (legfix5 gated + pillar-snapshot >14d staleness tripwire -- cure is a full chain run,
  Paul's cadence). Codex second-review debt CARRIED PAST THE GATE on Paul's merge order, still
  open. The research-integration lane is now ON MAIN. FULL CHAIN run 2026-08-17 (Paul-ordered): all
  steps green, rank delta lawful (5 movers/533, max 2), bipartisan converged, workbook col G +
  media blend written. STALENESS TRIPWIRE STILL FIRING BY DESIGN: O/E/F formula caches die on
  openpyxl saves and revive only via human Excel open+save (522-rank guard); snapshot stamped
  2026-07-29. TRIPWIRE CLEARED 2026-08-17 12:14 (Paul-ordered): workbook saved via Excel COM full rebuild
  (backup kept), compute_pillars --write re-stamped the snapshot from LIVE cells, ranks
  BYTE-IDENTICAL (the fallback had preserved the basis -- guard worked), audit_full restored to
  202/1 (legfix5 gated item only). C1-2026 COLLECTION LANE AUTHORIZED by Paul 2026-08-17: collector
  build dispatched via the Codex-executor protocol per the runbook; n=10 smoke gates Sweep 1; window
  closes at the November election. COLLECTOR BUILT 2026-08-17 via the full Codex protocol
  (run c1-2026-collector-20260817: contract w/ INV-1..8 pinned, build, adversarial review = 18
  findings/6 blockers, 15 adjudicated fixes incl. delay floor + redirect robots + SWEEP_APPROVED
  marker gate; finding 7 REJECTED as roster-assembly duty; 2 missing-RECEIPT reworks logged);
  coordinator verification compile OK + 17/17 pytest + 17/17 unittest; committed c75d468dd +
  57d841daf on codex/c1-2026-collector (unmerged). Smoke-roster recon (10 verified certified
  nominees) dispatched; SMOKE RAN CLEAN 6/6 on the pinned criteria 2026-08-17 (8/10 collected, both misses site-side;
  provenance 46/46; min gap 2.13s; zero robots violations); roster 10/10 verified incl. 7/7 bioguide
  MATCH vs congestion.json, NC-11 excluded per drop-never-guess. SWEEP_APPROVED created under
  Paul-DELEGATED authority (his in-chat conditional 2026-08-17); collector MERGED to main
  13df44998 + FIX-16 8e72cff3f (bare-import gate catch, owned as a coordinator gate-sequencing
  miss); final gates stale-imports 1/0 + KERNEL 154/0 + ranks byte-identical, mirror pushed.
  Sweep 1 remains late-September per runbook (full certified roster assembly first). Intermittent
  runner flake (suites pass solo, aggregate flickers, pre-dates merge) DIAGNOSED 2026-08-17
  afternoon (report committed d104d3ade on claude/amazing-cray-1e3a27,
  audits/RUNNER_FLAKE_DIAGNOSIS_2026-08-17.md): probe_shards errors=1 CAPTURED — WinError 5 on the
  unprotected staging-DIRECTORY rename at build_legislation_identifier_probe_shards.py:846 racing
  the real-time scanner (solo 1/30 quiet-box; OS probe 20k trials: replace-denial 0.29%/cycle,
  re-replace shape only; pending-delete/unlink windows 0/20k). All three original suspects
  ELIMINATED (runner is sequential; env inherited; no time logic in either suite).
  review_batches failures=1 NOT captured after 430 suite + 2,000 method + 13 aggregate runs:
  structural wall — the suite is byte-deterministic, Defender's content-keyed verdict cache stops
  scanning unchanged bytes, and the cache flushes only on signature updates (01:50/08:25 that
  day), so the morning regime (post-update + chain/OneDrive/Excel ambient) is unmanufacturable
  without touching Defender (prohibited). Retry test's real os.replace = leading candidate site by
  elimination — but that site measured 0 natural hits in 8,000 unique-content iterations (idle and
  under churn), so it is sufficient-but-uncorroborated and NO fix is proposed for it. FIX APPLIED
  2026-08-17 evening on Paul's explicit instruction (commit 299b4cdda on
  claude/amazing-cray-1e3a27, two files): retry loops on the staging-directory rename +
  atomic_write_json replace, ratified atomic_write shape, fail-closed preserved, no test touched.
  Verified: injected-transient absorbed + FAIL-CLOSED negative controls both sites; the SHIPPED
  consolidation test survives 3 injected dir-rename denials; suite 4/4; 60x solo loop 0 failures vs
  the 1-in-30 pre-fix baseline; audit_stale_imports 1/0. The live tree carries the identical bytes
  (sha256 verified) as an UNCOMMITTED working-tree change — deliberately NOT committed to main,
  since the instruction was to apply, not commit; merge the branch to make it permanent.
  SECOND MECHANISM FOUND, unrelated to file locks, captured naturally by the armed
  RUNTESTS_DUMP_DIR trap on the post-fix gate (153/1): test_legislation_base_network fails its
  byte-idempotence assertion (test line 372) because openpyxl's save_workbook() OVERWRITES
  workbook.properties.modified with the save-time clock (openpyxl/writer/excel.py:292), silently
  defeating the producer's pin at build_legislation_base_network.py:896. Only docProps/core.xml
  differs between two runs; all other zip members and every ZIP entry header are byte-identical.
  Reproduced deterministically: the shipped test PASSES when both producer runs land in one
  wall-clock second, FAILS when forced across a boundary, traceback identical to the natural
  capture. P(fail) ~ (gap between the two saves)/1s — fits ~1 in 21 aggregate runs today and the
  recorded 2/3 on 2026-08-05, and makes it a strong candidate for the unnamed third failure in
  Paul's 151/3 run. FIX PROPOSED ONLY (Paul's gate): (a) normalize core.xml after save [preferred],
  (b) re-assert modified post-save, (c) hoist normalization into moneyball_core.save_workbook_atomic
  so every workbook writer becomes byte-reproducible [largest value, largest blast radius,
  rank-adjacent]. Weakening the byte-idempotence assertion is EXPLICITLY REJECTED (change-control
  law 7; the assertion encodes the @f17dc2c idempotency milestone). openpyxl mechanism RULED OUT for
  review_batches (no workbook; triage timestamps derive from source manifests, generated_at nulled).
  STANDING RECOMMENDATION, now self-justifying: arm RUNTESTS_DUMP_DIR on every gate run — the
  base_network mechanism was found only because it was armed on a routine post-fix gate.
  BASE_NETWORK RATE MEASURED: 9 failures / 200 shipped-test runs = 4.5% (mean 161ms/test), matching
  both the mechanism's prediction (gap between the two saves / 1s) and the observed field rate
  (1 failure in ~21 aggregate runs today). So UNTIL FIXED the kernel gate reads 153/1 instead of
  154/0 about 1 run in 22 on this box, worse under load — do not read a lone 153/1 as a regression.
  The real fix is ~2 lines inside the EXISTING _canonicalize_xlsx helper
  (build_legislation_base_network.py:861-877, called at 900), which already pins every ZIP entry
  stamp but copies member CONTENT verbatim; normalize docProps/core.xml's dcterms:modified there.
  ADVERSARIAL AUDIT of review_batches (23 agents): 150 assertions enumerated, 6 candidate sites,
  ZERO survived a 3-lens refutation panel — all refuted at the PRECONDITION, never the code path
  (the unittest-semantics lens could NOT refute line 60). Directional: review_batches' real cause
  probably lies OUTSIDE the file-lock family, as base_network's did. review_batches reproduction
  campaign CLOSED 2026-08-18 with 0 hits everywhere: 430 subprocess suite runs + 2,000 retry-method
  runs + 8,000 unique-byte site iterations + 2,400 in-process executions (all 6 tests x 400 under
  churn) + ~27 aggregate gates. No fix proposed for it; the armed trap is the capture path.
  BASE_NETWORK FIX APPLIED 2026-08-18 on Paul's instruction (option (a)): three constants beside
  FIXED_ZIP_TIME (pinned doc timestamp DERIVED from it, so no third 1980 literal can drift) plus a
  4-line core.xml normalization inside the existing _canonicalize_xlsx loop; re/datetime already
  imported; substitution is a no-op if the element is absent; write_workbook's 895-896 pin
  deliberately untouched. VERIFIED: the forced-straddle case that was a DETERMINISTIC failure now
  PASSES (decisive control), flake-rate harness 9/200 (4.5%) -> 0/200 (0.0%), suite solo all PASS,
  py_compile clean; FULL KERNEL GATE 156 passed / 0 FAILED. GATE COUNT 154->156 EXPLAINED (not
  waved): another lane merged claude/holistic-network-config-60c11c into main at 22:50 (08d536b3a);
  its 4f0722ba0 "MEA-8 registration" appends test_holistic_base + test_holistic_config to
  _LANE_MODULES. The 153/1 gate predates that merge, the 156/0 postdates it; both are correct for
  their tree. NOTE THE SHARED-TREE HAZARD: that lane is actively committing to main in the live
  tree while my two fixes sit there UNCOMMITTED — merging claude/amazing-cray-1e3a27 is what makes
  them safe. SCOPE CHECK: base_network is the ONLY xlsx producer with both a canonicalizer
  and a byte-idempotence test; build_holistic_base:240, build_multilayer_network:153,
  build_audit_workbook:270, add_judiciary_seats:105, build_social_master:84, process_quorum:165 all
  save without canonicalizing, so their artifacts are equally non-reproducible — latent gap, no test
  asserts it, no gate flicker; option (c) (hoist into a shared helper) would close it, ungated.
  MERGED TO MAIN @ddce3accc 2026-08-18 (Paul-ordered "merge and push everything") and MIRROR-PUSHED
  (mirror main == local main; branch claude/amazing-cray-1e3a27 also on the mirror, so the work is
  no longer single-disk). First merge attempt FAILED SAFELY on .git/index.lock held by a concurrent
  lane — HEAD unchanged, nothing half-applied, lock NOT force-removed; retried after release.
  FULL CHAIN RUN 2026-08-18 02:24-02:38 (Paul-ordered), guarded to wait for 45s of box quiet because
  another lane was running its own gate + engine diagnostics: 13.7 min, every step OK, audit_full
  202 passed / 1 FAILED = the SAME pre-existing Paul-gated legfix5 culling item ("culling surface
  reports the hash-bound production promotion state"), so the gate is at its documented baseline.
  Surfaces regenerated: Moneyball Dashboard.html, cu-member-desk.html (40.5MB), Moneyball.html
  (43.8MB), dashboard_data.json, ranks_python.json, category_stance.json.
  RANK DELTA 2/533 — Catherine Cortez Masto 17->18 and Young Kim 18->17 (an adjacent swap), driven
  by press_pillar drift across 185 members at ~1e-7 magnitude. NOT ATTRIBUTABLE TO THE TWO FIXES,
  proven structurally: NEITHER changed module (build_legislation_base_network,
  build_legislation_identifier_probe_shards) appears in run_pipeline.py's CHAIN, so the pipeline
  never executes them. The honest provenance is that the rank baseline was captured 21:13, BEFORE
  the other lane's holistic-network merge 08d536b3a at 22:50, which this 02:24 chain then
  incorporated — i.e. changed network inputs plus the documented bipartisan.json two-run
  convergence edge. NOTE for the board: these ranks_python ranks are NOT the primacy-board seats;
  the "Cortez Masto Tier 2 #17" line elsewhere in this file is factor_ranked and a different number.
  2026 primary upsets noted by recon (Crenshaw and Gonzales LOST primaries): 2024-cycle incumbency
  assumptions must be re-derived, relevant to the 120th rollover campaign. QUEUE STRETCH 2026-08-17
  (Paul: complete remaining items): review debt DISCHARGED (M1/F2/B0 adversarial round, 16 findings,
  D3 merge-blocking on default paths, tools stay flag-gated OFF, fix dispatch next); F1 freeze
  artifacts committed + sha256-pinned in a ready-to-lock addendum (lock = Paul); E1 prereg DRAFTED
  (queued behind F1 per [[ledger/melange-systems-brain/D-009|D-009]]); BICAM follow-ups committed (per-stratum bar PROPOSAL for Paul,
  maintainer email DRAFT unsent, 162 residual gaps = 118th late-session tail); roster tranche-1
  LANDED: 168 rows = 84 districts x 2 exactly, 84D/84R, zero exclusions, 65/65 bioguides MATCH,
  162 campaign urls; committed source_data/campaign_sites_2026/roster_tranche1_20260817.csv.
  Remaining tranches per runbook (completed-primary states next; FL/AK/WY/MA/NH/RI/DE September).
  M1/F2/B0 FIX ROUND MERGED @0fc190cd1 (Paul-ordered): 15 fixes + 4 review amendments, two
  independent rounds, 66/66 tests, kernel 154/0, ranks byte-identical; fail-closed bars restored
  (the two fail-open designs were coordinator spec defects, owned); executor STOP REPORT caught a
  coordinator mis-rooted verification -- source-hash-beside-logs practice adopted; recurring
  missing-RECEIPT pattern flagged to the amendment channel. Tools stay flag-gated OFF; next BICAM
  re-audit can run on the FIXED defaults. BICAM RUN 3 executed on the fixed defaults
  (Paul-ordered): D3 proven, native strata supersede run-2 sidecar arithmetic (pre-119th bills
  322/322 = 100%), AMEND-2 veto fired on the 3 damaged receipts (fail-closed live-proven),
  cosponsors IDENTITY-perfect (symdiff 0 across 304 acts / 1,288 entries). [[ledger/melange-systems-brain/D-011|D-011]] RATIFIED and IMPLEMENTED @a42674d56 (two review rounds;
  empty-stratum fail-opens closed; 37 B0 tests): RUN 4 under d011-stratum-v1 = act PASS (first of
  the arc, pre-119th 100%), roster FAIL (intended currency signal), text FAIL solely on the
  retained 3-receipt veto (0.9865 clears 0.95 once legfix5 repairs the receipts), cosponsors
  identity-perfect. Open BICAM items: legfix5 3-receipt repair (their lane), maintainer email
  (Paul sends), amendments component (Paul-gated download + future contract). Runner-flake diagnosis still running in Paul-started
  separate session -- fold in on completion. Outcome-snapshot scoring SCHEDULED locally
  for 2026-09-02 09:00 ET (task outcome-snapshot-scoring-20260902). Three damaged legfix5 receipts found (119:hr:2393/2397/2401,
  1330B binary each) -> legfix5 lane to adjudicate.
- NEW-SESSION HANDOFF (2026-08-17, Paul: "Start those, new session"). States of the five items:
  (1) F1 PREREG LOCKED @5534eedd2 -- method frozen, seeds/probe-rules pinned, fresh-gold sampling
  window OPEN per fec/stance/folcot_gold_sampling_rule_v1.txt, look UNSPENT; next = gated look
  script authored per methodology, gold accrues from the post-lock stream, Paul adjudicates labels.
  (2) E1: BUILD the mask-and-recover harness + four baselines + battery per
  stance_e1_imputation_prereg.md (executor lane, tests), THEN fill its LOCK block for Paul.
  (3) Maintainer email: draft in audits/bicam_arrival_20260817/FOLLOWUPS_2026-08-17.md section 2;
  no send capability box-side -- Paul pastes and sends.
  (4) Amendments component: DOWNLOADED 6.41GB in 1:52, sha256 pin MATCH
  (2b2660041df3...); extraction to C:\melange-data\bicam_snapshot\extracted\bicam_amendments
  COMPLETE: 9 CSVs, amendments_texts.csv = 28.6GB raw; SCHEMA INVENTORIED (FOLLOWUPS section
  4a carries headers + the key-normalization map samdtN-C/hamdtN-C). Next: THEN the amendments-integration contract (executor lane) that
  arms the [[ledger/melange-systems-brain/D-011|D-011]] amendments stratum -- written against the REAL schema, never before.
  (5) legfix5 three-receipt repair: DIAGNOSIS COMPLETE -- receipts AND bodies corrupt for
  119:hr:2393/2397/2401 (one write window), reconstruction impossible, direct congress.gov fetch
  403-blocked; ONLY route = the legfix5 lane httr cookie-replay machinery
  (fec/harvest_congress_text_httr.R) re-fetching the three targets under that lane contract.
  On repair: B0 run 5 flips text_presence to PASS (pre-119th 0.9865 > 0.95, veto clears).
  ALSO IN FLIGHT: Paul-started runner-flake diagnosis session (fold in on completion);
  09-02 outcome scoring armed; roster tranches + Sweep 1 per runbook.
- QUEUE EXECUTED (2026-08-17 evening, Paul: "execute the items que'd"; session 055f12e9). All three
  executable items DONE, live main @c4c557d00, mirror pushed:
  (a) legfix5 3-receipt repair COMPLETE: damaged trio quarantined w/ sha256 damage record (healthy
  receipt size is ALSO 1330 bytes -- size never distinguishes damage), re-fetched via httr
  cookie-replay (scratch-profile Chrome + cf_clearance auto-issued on a bill-text page; 3/3 HTTP
  200), bodies title-verified, evidence chain committed @c4c557d00.
  (b) B0 amendments stratum ARMED via full executor protocol (run b0-amdt-arming-20260817:
  plan-only round -> 4 STOP-REPORT rulings -> build 49/49 tests -> adversarial review 3 findings ->
  2 accepted fixed + 1 rejected recorded -> golden-pinned v1 byte-identity -> signoff; merged).
  BICAM RUN 5 @ba4f19853: AMEND-2 veto CLEARED, pre-119th text 0.9859 PASS-stratum, cosponsors
  identity-perfect, roster FAIL = intended signal; armed amendments FAIL HONESTLY on vintage
  (act 57/173 -- component has NO 119th amendments, 0/108; text 71.4%) -- same currency story as
  members/bills, feeds the maintainer-email question, NOT a join defect (zero found).
  (c) E1 harness BUILT + MERGED flag-gated (41 tests, look double-gated in code) and the
  READY-TO-LOCK ADDENDUM is COMMITTED @4a5504ee4: 7/7 input pins sha256 at @ba4f19853, mechanical
  derivation rules, seeds 424242/565656/787878 + battery 313131 (disjoint from F1).
  PAUL'S ONE OPEN LOCK CHOICE: edge-layer roster -- (a) cosponsorship-only, (b) + co_appearance
  as committee/hearing proxy, or (c) hold for a donor-overlap FEC export. Then sign the LOCK block.
  Runner-flake diagnosis FOLDED IN (their lane, report d104d3ade): retry-loop fix + RUNTESTS_DUMP_DIR
  arming remain Paul-gated -- not applied by this lane.
## Next action
UPDATED 2026-10-21 20:50 CDT (record taken from the orchestrator brief relayed by the chain session; see the AGENT ROSTER LANE block in the Deployment lane section): (a) Paul rules on the PAUL_DECISION_PACKET themes (audits/agent_roster_20261021/) and the Terrier thresholds, tools/field_labels.py:105-107; (b) the E2E lane relaunches (attempt 8) after the classifier quota reset, after 2026-10-22 18:00 CDT, with Paul's chat OK for the exact shape; (c) the briefs-v3 lane lands 0bedf256c properly with a champions_v2-tolerant tier. This line supersedes the stale items below only where they conflict; the STALE FLAG still applies to the rest.
STALE FLAG 2026-10-20: this block is 2026-10-11 vintage and is not the current starting position. Newer lanes (2026-10-12 through 2026-10-20 blocks in the Deployment lane section) supersede much of it. Re-verify any item against those blocks before acting.
REWRITTEN 2026-10-11 by the queue clear-out (decisions [[ledger/melange-systems-brain/D-148|D-148]]..[[ledger/melange-systems-brain/D-161|D-161]]; record audits/decisions_20261011/DECISIONS.md in Melange). Rule: every line names a date and an owner; anything older than 14 days without a date check is presumed stale and re-verified before acting. The previous block (2026-08-27..09-19 backlog, nearly all closed by [[ledger/melange-systems-brain/D-159|D-159]]) is archived verbatim at ARCHIVE/STATE_next-action_pre-2026-10-11.md.

1. HEAVY LANE (Claude; one heavy step at a time; start only after weekly_refresh.py from the 2026-10-11 06:00 MoneyballWeeklyRefresh has exited; check Get-Process python first). Specs in the Melange session scratchpad heavy_queue\*.md.
   a. Competitiveness ([[ledger/melange-systems-brain/D-106|D-106]]/[[ledger/melange-systems-brain/D-107|D-107]], 03be7ff38): refresh sentinel admissions ([[ledger/melange-systems-brain/D-122|D-122]] window), then run_pipeline --from build_competitiveness.py + audit_full.
   b. G-REBUILD ([[ledger/melange-systems-brain/D-158|D-158]]): govinfo billstatus119 re-pull, holistic BASE/NBASE/AUG/NORM, sector diagnostic, per-config layouts, bundle. Gates: ranks_python.json byte-identical; bipartisan.json differs only by the 71 CU_IDENTITY_FIX values; MEA-1/2 meet the D8 criterion.
   c. RE-1 board regeneration ([[ledger/melange-systems-brain/D-154|D-154]]); re-pin test_primacy_tier exactly.
   d. PERS_NONE 0.40 ([[ledger/melange-systems-brain/D-142|D-142]]) propagates through the chain run; report movers.
   e. SEC-e ([[ledger/melange-systems-brain/D-148|D-148]]): desk rebuild -> re-lock -> verify (rank delta 0/533) -> hand deploy\index.html to Paul for the Netlify upload. [SUPERSEDED 2026-10-12 by [[ledger/melange-systems-brain/D-171|D-171]]: the Netlify upload carries the INVITED build only, after the governance rows are ruled; do NOT upload the current full deploy\index.html (see the Deployment lane WARNING).]
   f. Push lane commits by cherry-pick to an origin branch + PR, never main ([[ledger/melange-systems-brain/D-139|D-139]]).
2. PRESS ([[ledger/melange-systems-brain/D-159|D-159]] BK-DR-d, 2026-10-11): background drain (CU_PR_JS_MEMBER_BUDGET=3600) waits for weekly_refresh.py to exit -> audit_collection --scope press -> build_press_engine_feed (log outputs\press_drain_20261011.log); then the fold composition test in a scratch root (fold stays OFF unless row sets are identical).
3. MENTAT (2026-10-11): 2020 re-collection chain v4 (Fintech, P&C, Credit Arms, CU; ~20 h) -> link 2020 into books 04/08 + run_all.R + claims update; then the Banking tidy export (RAM-heavy). Money blend stays BLOCKED ([[ledger/melange-systems-brain/D-149|D-149]]) until gate 1 passes; classify the 2025-26 gaps over $500.
4. QUEUED SMALL EDITS (Claude, 2026-10-11): ~~CM-3 relabel + test ([[ledger/melange-systems-brain/D-153|D-153]]); RE-2 comment + kernel test + docs ([[ledger/melange-systems-brain/D-155|D-155]]);~~ FC-2 COVERAGE RECORD addendum + scheduled task f5-coverage-recount for 2027-01-20 ([[ledger/melange-systems-brain/D-151|D-151]]); ~~BK-T7, BK-R5, BK-L5 annotations; F-8 untrack collector_sentinels/*.done; SEC-c commit the retrained stance joblib with its sidecar; F-3 census guard commit;~~ then the [[ledger/melange-systems-brain/D-157|D-157]] held items one at a time; [[ledger/melange-systems-brain/D-158|D-158]] follow-ups (Menendez legislative-pillar census; 98 CU placeholder-link bills); BK-C1 hearings_seq rebuild (attended, alone). — updated 2026-10-20: DONE CM-3 (939403cc8), RE-2 (79bae036d), BK-T7 (b5dd36c7a), BK-R5 (1057aeead), BK-L5 (f2550610c), all on Melange local main ed64156ff and published in PR #20 (code paths only; docs and skills are private); F-8 was already done (64ac65303), SEC-c done (2fb836989), F-3 census guard done (7d57fb209). REMAINING: FC-2 addendum + f5-coverage-recount task, [[ledger/melange-systems-brain/D-157|D-157]] held items, [[ledger/melange-systems-brain/D-158|D-158]] Menendez census (the CU placeholder-bill item is only a count to reconcile, 98 vs 111; the backfill is done, a3097a849), BK-C1 rebuild, CM-3 chain-run gates; all listed in Melange audits/small_tooling_20261020/PAUL_DECISIONS.md. — updated 2026-10-20 ([[ledger/melange-systems-brain/D-157|D-157]] held items lane, [[ledger/melange-systems-brain/D-268|D-268]]): the [[ledger/melange-systems-brain/D-157|D-157]] held items F-13, F-14, F-15, F-17, F-18, F-20 and F-22 are DONE in source (PR #25, OPEN); still held: F-12, F-16, F-19, F-10 (Paul's), F-21 (no change); see the [[ledger/melange-systems-brain/D-157|D-157]] HELD ITEMS LANE block.
5. Revert [[ledger/melange-systems-brain/D-122|D-122]]'s temporary sentinel freshness widening (fec/legislation/sentinel_admissions.py max_age_days 10 -> 8) after the next successful refresh_sentinel_admissions.
6. Check the first MentatNightlyAnchors run (2026-10-11 03:30) log under %LOCALAPPDATA%\Mentat\logs\scheduled\; once Melange's sweep passes 2026-10-20 the nightly build moves every sector to Q3 ([[ledger/melange-systems-brain/D-130|D-130]]).
7. Weekly refresh: ~~MoneyballWeeklyRefresh returned 1 on 2026-10-04; check the 2026-10-11 run.~~ — corrected 2026-10-12: returned 1 on 09-20, 09-27, 10-04 and 10-11, each 'HARD FAILURE at press delta refresh — step exited 3' (data/engine/weekly_refresh.log:787-788, 813-814, 841-842, 867-868); last COMPLETE 2026-07-19 (log:170). Cause: weekly_refresh.py:446 is hard and step() aborts on any non-zero exit, while refresh_press_delta.R exits 3 on any pending body (:843, :990), including rows the intake excuses under Paul's 2026-09-19 three-run rule ([[ledger/melange-systems-brain/D-159|D-159]]). Fix (Claude, 2026-10-12, under Paul's 'keep going, don't wait on me'): weekly_refresh.py only — step(partial=) + _press_partial_excused via build_press_engine_feed.inspect_run on the run the step sealed; fails closed to the legacy abort; branch fix/weekly-press-partial, lands with integration round 2. Independently, 10-18 stops at 'prepare dashboard deployment' (:510) while DASHBOARD_PASSWORD_FILE is unset (user and machine scope, read 2026-10-12; Phase 0 item 3), and CU_PR_JS_MEMBER_BUDGET ([[ledger/melange-systems-brain/D-159|D-159]] knob) is unset, so the 600 s budget applies. The tick-runner cutover (audits/refresh_tick_20260919/PROGRESS_AND_NEXT_STEPS.md section 6.3) awaits Paul; its design lets discover_run audit an older press run.

Waiting on Paul only (barred for Claude or reserved by a standing Paul rule; exact commands in audits/decisions_20261011/DECISIONS.md "Needs Paul"): Calvert/SchoolsFirst collector patch OK (money rule; [[ledger/melange-systems-brain/D-149|D-149]]); McClintock $2,500 counting ruling ([[ledger/melange-systems-brain/D-149|D-149]]); SEC-a elevated RunLevel command; GitHub 2FA confirmation; Carbonite folder selection + 3 restore-drill files (SEC-d); Netlify upload (SEC-e); RunPod network volume deletion (OP-1, irreversible); label items (F-10 4-item conflict, N13 Risch row, fresh F1 gold n >= 150); optional Fast Startup off, OneDrive pinning of data/, Anthropic spend limit, Mentat H3 total correction.

## Deployment lane (opened 2026-10-12)
Opened 2026-10-12 by Claude on Paul's approval of the plan (2026-10-11). Verified 2026-10-12 against the plan file and DECISIONS.md [[ledger/melange-systems-brain/D-164|D-164]]..[[ledger/melange-systems-brain/D-172|D-172]] only; no live repo, host or account was inspected. Nothing outward has happened yet: no push to GitHub, no Netlify publish, no VPS, no Cloudflare setup, no invites. Update 2026-10-12 (landing): the build is now on Melange main 9a905befe (see the STATUS block below); the sentence above still holds, because the only push was the local bare mirror (source: git ls-remote mirror refs/heads/main, read 2026-10-12).
- STATUS 2026-10-12, AUTOMATIC PROPAGATION AND COMPUTE LANES (Claude, rulings records lane; where this bullet and a line below disagree, this bullet is newer): Paul ruled two more things on 2026-10-12. [[ledger/melange-systems-brain/D-183|D-183]] (automatic propagation: any committed change on Melange main, Mentat codex/mentat-crypto or the Terrier release branch triggers, after a quiet period, an automatic release; only images whose inputs changed are rebuilt, all image digests (apps and compute) are signed on the laptop into one platform manifest that the VPS updater and the laptop's compute wrappers both follow, GitHub releases are published, idle Mentat consoles restart through the [[ledger/melange-systems-brain/D-029|D-029]] idle-stale mechanism, Netlify updates only when the invited build changed and governance is ruled ([[ledger/melange-systems-brain/D-171|D-171]]), and finished refreshes trigger data releases through the existing gates; gates still fail closed and a failure stops propagation and alerts; scheduling is a Task Scheduler task Paul approves when registered; reversal is release.py auto --pause or a return to manual). [[ledger/melange-systems-brain/D-183|D-183]] amends [[ledger/melange-systems-brain/D-168|D-168]]'s manual-v1 clause, so the "automatic data release after the weekly refresh" clause of the GO-LIVE GATE line below no longer applies. [[ledger/melange-systems-brain/D-184|D-184]] (Paul's "Ok to merge": compute/mentat-jobs into codex/mentat-crypto, the per-change OK his Mentat-edit rule requires; compute/artifact-tool-mentat merges when its lane finishes under the same OK). [[ledger/melange-systems-brain/D-179|D-179]] is confirmed: Paul chose "Login" (the CLI login is mounted read-only into the container; known risk: a token refresh inside the container can rotate the refresh token and require a one-time `claude /login` on Windows). ~~HOST STATE: Docker Desktop is installed but WSL is not yet active (needs the post-install reboot)~~ — superseded 2026-10-12: WSL 3.0.1 installed, Docker engine running (see block below); the Terrier Windows-only roads variance check came back byte-identical (no variance). COMPUTE LANES: done: XL (compute/libreoffice), COL (compute/collectors), M-IMG (compute/mentat-image), M-JOBS (compute/mentat-jobs, merging); running: MEL and AT. ~~PENDING PAUL RULINGS: (1) the PPM snapshot of 2026-06-19 (15 package mismatches) versus per-package pins; (2) the LibreOffice gate items: the presync two-copy hash gate, PERCENTRANK, the AVERAGE allowlist, and the stale formula count (98,726 to 98,269); (3) the Chrome/congress lane: keep the host tool or use GovInfo; (4) the key-file mount scope.~~ (source: git branch -vv and git branch --merged codex/mentat-crypto in C:\Users\pgoff\Mentat, read 2026-10-12: codex/mentat-crypto at 902285f8a, compute/mentat-jobs at 9a4bd547b and compute/artifact-tool-mentat at e85684ac5, no compute/* branch merged yet, so the M-JOBS merge was still in progress at record time; Paul's answers, the Docker and WSL state, the Terrier variance result, the lane statuses and the pending-ruling list are from the orchestrator's brief and were not checked here.)
  2026-10-12 evening (Claude):
  - Docker works on the laptop: WSL 3.0.1 installed 18:24 CDT (elevated wsl --install --no-distribution; Paul approved the UAC prompt; no reboot needed, Virtual Machine Platform was already on). Docker Desktop 4.95.0 is a per-user install at %LOCALAPPDATA%\Programs\DockerDesktop; engine 29.8.2. Earlier "restarts" were Fast Startup shutdowns (Kernel-Boot 27, boot type 0x1); last cold boot 2026-10-07 12:34.
  - MEL (compute/melange-chain): all six deliverables done; review LAND-AFTER-FIXES — opposition-prior default roster path restored to the live-tree literal via to_host (money-adjacent, behavior identical); ~~run_pipeline.py hunks deferred as Part B because the live tree holds another lane's uncommitted run_pipeline.py/run_tests.py work; fixes in progress~~ — superseded 2026-10-13: Part B landed on Melange main as 70f3e5b0c ([[ledger/melange-systems-brain/D-189|D-189]]), and MEL's review-fix commit e196ed5c9 is on main (source: git merge-base --is-ancestor and the main reflog, read 2026-10-13).
  - Integration-1 (mentat-image + libreoffice + artifact-tool + collectors): ops tests 648 passed; waits for the daily Congress pipeline lock before landing, then the kernel suite.
  - Implementation choices decided by Claude 2026-10-12 under Paul's "keep going, don't wait on me" (Paul may overrule): (1) the Mentat R image installs the exact Windows versions of all 214 packages (per-package dated PPM binaries; CI mismatch allowance 15 -> 0) instead of a snapshot date; (2) the visible-Chrome congress.gov cookie lane stays a manual host tool, not containerized; switching its transport to GovInfo stays Paul's option because it changes a data source; (3) containers get least-privilege mounts: no %LOCALAPPDATA%\Melange root mount, dashboard_password.txt and lda_rebuild never visible, replay mounts /melange read-only; ~~the Mentat compose change is prepared as a diff for Paul's per-change OK~~ — superseded 2026-10-13: approved and applied as Mentat 2a03aa9b1 ([[ledger/melange-systems-brain/D-193|D-193]]), so the anchors job mounts two lda_rebuild/derived files read-only and "lda_rebuild never visible" above no longer holds for those two files; (4) [[ledger/melange-systems-brain/D-177|D-177]]'s "a few ULP" is implemented as ~~at most 4 ULP on continuous cells that feed nothing discrete~~ — superseded 2026-10-13: at most 4 ULP stays the general parity limit; for workbook formula comparison [[ledger/melange-systems-brain/D-196|D-196]] allows at most 1024 ULP on continuous numeric cells, only when every rank, percentile and threshold matches exactly in the same run (the 16-ULP C29 allowance of [[ledger/melange-systems-brain/D-191|D-191]] is kept in code and is redundant under it), max reported; (5) R-8: text outputs are compared byte-identical (explicit CRLF writes), no EOL normalization.
  - PENDING PAUL: ~~the LibreOffice bundle (presync two-copy hash gate, a legfix5 per-change OK; PERCENTRANK, with a real LibreOffice 25.2.3 probe pending; AVERAGE missing from the allowlist for 'Coalition Profiles'!C29; stale FORMULA_CACHE_EXPECTED_FORMULA_COUNT 98,726 vs live 98,269)~~ — superseded 2026-10-12: ruled, Excel confirmed values unchanged ([[ledger/melange-systems-brain/D-191|D-191]]); ~~R-6 orchestrator choice~~ — superseded 2026-10-12: Paul ruled Option A ([[ledger/melange-systems-brain/D-187|D-187]]); CU_PR_JS_MEMBER_BUDGET for the weekly; DASHBOARD_PASSWORD_FILE; Task Scheduler registration for auto-release ([[ledger/melange-systems-brain/D-183|D-183]]); ~~the Mentat mount-scope diff~~ — superseded 2026-10-12: approved and applied as Mentat 2a03aa9b1 ([[ledger/melange-systems-brain/D-193|D-193]]); GovInfo swap (optional).
  2026-10-13 (Claude, rulings records lane; where this block and any other line disagree, this block is newer):
  - Landings on main today: 81a80d988 (integration-2), 70f3e5b0c (Part B, [[ledger/melange-systems-brain/D-189|D-189]]), f50f3aaee (integration-3: orchestrator engine switch), 9e7681bbd (kernel tripwire fixes), 1140d6a4e (workbook table sync, [[ledger/melange-systems-brain/D-195|D-195]]), 09125d450 (rank-gated tolerance, [[ledger/melange-systems-brain/D-196|D-196]]), d36616b49 (forceFullCalc strip, [[ledger/melange-systems-brain/D-197|D-197]]), e7eee4543 (a refused rank-gated run names its discrete cells), af9128f21 (ops tests stop pinning engines.json as all windows), 958cc51af (engines.json office = container). All ten are ancestors of main and reached it between 00:43 and 14:25 CDT.
  - Cutovers: office = container (LibreOffice recalculation; ops/compute/engines.json at 958cc51af, set by cutover.py from PASS evidence). Evidence, written by one xl_equivalence compare run under the rank-gated rule ([[ledger/melange-systems-brain/D-196|D-196]]): audits/compute_parity/office_equivalence.json EQUIVALENT (98,269 formulas compared, 94,978 exact, 3,291 continuous cells within 1024 ULP with 256 the most seen, 6,407 discrete cells exact) and office_rank_check.json PASS (533/533 member ranks exact on Blended Model!T3:T535, and the second rank column Y3:Y535 533/533). Fallback: python ops/compute/cutover.py set office windows, or MELANGE_ENGINE_OFFICE=windows for one run. Chain and collect are still windows.
  - Terrier (Documents\Terrier\outputs\cu-geography-v3, branch claude/walk-list, tip bd319d5 at the read): full-chain parity PASS 17/17 (roads, street, contacts, shown, scores) with every negative control detected, under the FTS5 shadow-table rule ([[ledger/melange-systems-brain/D-198|D-198]]; db17ac4, cba5e34). The production store build runs in the containers through tools/compute_build.py (cba5e34, bd319d5; [[ledger/melange-systems-brain/D-188|D-188]]), with TERRIER_COMPUTE=windows as the fallback. ~~The _build runners and the remaining steps are being containerized.~~ — superseded 2026-10-13 evening: see the evening block below ([[ledger/melange-systems-brain/D-202|D-202]]).
  - Mentat: anchors, refit-detect, pocket-build and refit-parity each PASS on 3 snapshots on the local image. Parity fixes e6a5e8f4d are live on codex/mentat-crypto (fast-forwarded 00:54). The replay layer is built on branch compute/replay b2ae18d22 (not yet merged); pac-evidence snapshot S1 passed R0/A1/A2 with money fingerprints equal. The CI digest is pending the release.
  - Kernel suite: 510 passed / 4 FAILED. The 4 are stale data from the failed 2026-10-12 daily Congress run (audits/congress_pipeline/20261012T234756Z), which died at speech_stance_stack.py. Cause: bluesky gold labels x1eaa34cd8927 and xc40cc6e75c95 no longer bind to source rows after data/stance/bluesky_cu.csv was rewritten 2026-10-12 22:46. ~~Paul's ruling is needed (gold labels are Paul's domain).~~ — superseded 2026-10-13 evening: Paul ruled, [[ledger/melange-systems-brain/D-200|D-200]] (landed f244d207f). The honors and per-area grade staleness follows from that run. The daily retry task MoneyballDailyRefreshRetry is disabled and not yet re-enabled ([[ledger/melange-systems-brain/D-199|D-199]]); it would fail again until this is resolved.
  - Live workbook (Moneyball Main Version - Blended.xlsx): table metadata repaired at about 11:15 (3 table parts plus the B16:F16 header cells; PRE-TABLEFIX-20261013_111528 backup; Excel opens it again; [[ledger/melange-systems-brain/D-195|D-195]]), then PERCENTRANK rewritten to form A, TRUNC(PERCENTRANK(range,x,15),5), in place at about 11:53 (3,159 formulas; PRE-PERCENTRANK-TRUNC-20261013_115355 backup; [[ledger/melange-systems-brain/D-191|D-191]]). Excel before/after equivalent across all 98,269 cells. The presync freshness check passes with LibreOffice receipts. Excel recalculates the live workbook in about 25 s with the forceFullCalc strip ([[ledger/melange-systems-brain/D-197|D-197]]), instead of hanging 900 s.
  - Docker and WSL: Docker Desktop Resource Saver is OFF. %USERPROFILE%\.wslconfig: memory=12GB, processors=6, swap=8GB (the file also sets autoMemoryReclaim=dropCache under [experimental]). WSL auto-updated 3.0.1 -> 3.0.3 overnight; that update and the idle-stop caused two engine outages.
  - Paul's login: GHCR login done 2026-10-13 (read:packages).
  2026-10-13 evening (Claude, rulings records lane; where this block and the 2026-10-13 block above disagree, this block is newer):
  - Rulings: [[ledger/melange-systems-brain/D-200|D-200]] (Paul retired the two Bluesky gold labels x1eaa34cd8927 and xc40cc6e75c95, Bonnie Watson Coleman; landed Melange main f244d207f; gold binds again, 526 trainable; ~~the daily retry task stays disabled, [[ledger/melange-systems-brain/D-199|D-199]], until a daily refresh passes~~ (superseded 2026-10-15 by [[ledger/melange-systems-brain/D-216|D-216]]: the retry task stays retired and refresh_tick.py replaces it)), [[ledger/melange-systems-brain/D-201|D-201]] ("Lighter" proof standard for the remaining parity work: one Windows reference run plus one container run, key outputs compared exactly, volatile fields masked, copies deleted after comparison; amends the procedure of [[ledger/melange-systems-brain/D-177|D-177]] and [[ledger/melange-systems-brain/D-190|D-190]]), [[ledger/melange-systems-brain/D-202|D-202]] (Terrier bundle byte-identical through a canonical ring start, fcb0d69; bundle parity PASS).
  - Brainlink: the hook budget changed 20 -> 90 s (hook_budget_seconds in Project Brain\brainlink\config.local.json) and the Stop hook timeout 30 -> 120 s (~\.claude\settings.json); the session-start load is green.
  - Terrier: containerized steps PASS (walk, ingest, extend, density, bundle) on top of roads, street, contacts, shown and scores; the _build runners are edited (backups .bak-20261013 and .bak-20261013b); import, prepare_geography and the server steps stay on the host; TERRIER_COMPUTE=windows is the fallback. Live checkout tip fcb0d69, not pushed.
  - Office cut-over is done (958cc51af; see the 2026-10-13 block above). Chain and collect are still windows.
  - Melange chain: BLOCKED on relocatability. The design is audits/deploy_20261011/CHAIN_RELOCATABILITY_DESIGN.md (patches P1-P7 and 7 items needing Paul's OK). It is run under the [[ledger/melange-systems-brain/D-201|D-201]] lighter proof.
  - Image release: still in progress (release 2026.10.13.2 had red CI; the fix and release .3 are pending). Until the official images exist the office phase has no image and fails closed, which is non-gating.
  - Handoff: audits/deploy_20261011/HANDOFF_2026-10-13.md, with Paul's priority docket.
  - NOT checked (from the orchestrator's brief): that the session-start load is green and Paul's rulings and wording; the Terrier parity runs; the image release state.
  2026-10-14 (Claude, ops-skills and state records lane; where this block and the 2026-10-13 blocks above disagree, this block is newer):
  - Terrier a543e82 on claude/walk-list (Documents\Terrier\outputs\cu-geography-v3, committed 2026-10-14 13:22 CDT, touching tools/co_baseline.py and tools/test_co_baseline.py): co_baseline.frozen_check named an unbound variable, so any frozen-hash mismatch raised a NameError instead of naming the mismatched row-framework file; fixed, with a regression test. Not pushed: no remote-tracking ref (origin is https://github.com/[private — see knowledge vault].git) contains it, and only the local branch claude/walk-list does (source: git log -1, git for-each-ref --contains a543e82 and git remote -v, read 2026-10-14). The tools suite result (485 passed) is from the orchestrator's brief, not re-run.
  - Melange 6df9422a6 (on main): ops skills added under .claude/skills: ops-shared (accuracy, chain-of-command, efficiency, host, records), melange-chain-compute, mentat-compute-and-money and terrier-compute; each of the three lane skills carries a read-only scripts\check-state.ps1 (21 files, +1,341 lines; source: git show --stat 6df9422a6, read 2026-10-14).
  - ~~Docker is DOWN as of 2026-10-14 about 13:30 CDT (read from the orchestrator's brief; not re-observed at that time): a non-admin `docker desktop start` failed with "Docker Desktop is still starting: context deadline exceeded" and the npipe dockerDesktopLinuxEngine was missing. At 14:17 a bounded read-only probe found the pipe \\.\pipe\dockerDesktopLinuxEngine present, but `docker info` gave no answer in 15 s, so the engine is still not serving. The admin restart is Paul's; the exact command is in .claude\skills\ops-shared\host.md. C: free was 28.7 GB at the first read and 28.1 GB at the second (Get-PSDrive C), below the 30 GB floor for heavy work. Everything that needs a container waits on Docker: chain parity side B, the collectors replay, Mentat money collection B, the Mentat official-image streak, and the Docker prune.~~ (superseded 2026-10-15: Docker is up after the admin restart and the C: free space is about 48.5 GB; [[ledger/melange-systems-brain/D-215|D-215]].) Supersedes the .wslconfig line of the 2026-10-13 Docker and WSL bullet above: it now reads memory=32GB, processors=8, swap=56GB with autoMemoryReclaim=dropCache, and the backup .wslconfig.bak-20261014 exists (Paul's change, [[ledger/melange-systems-brain/D-206|D-206]]; source: the file, read 2026-10-14).
  - OPEN QUESTIONS FOR PAUL, from the ops-skills review (none is ruled): ~~(a) [[ledger/melange-systems-brain/D-201|D-201]] sets one Windows run plus one container run, but ops/compute/chain_parity.py compare takes --a1 and --a2 as required arguments (lines 815-816; cmd_compare builds A1 and A2 at line 710 and the noise-floor gate compares their changed path sets at lines 405-408), and the Mentat replay judge needs A1 and A2 for its noise mask (mentat/tools/replay_parity.py line 8, mentat/COMPUTE.md line 147). How should one Windows run satisfy a compare that needs two (for example a second Windows run of the same side, or a ruling that waives the noise-floor gate)?~~ (resolved 2026-10-18 by [[ledger/melange-systems-brain/D-242|D-242]]: one Windows run is both A1 and A2) (b) Evidence file name: ops/compute/cutover.py line 71 reads audits\compute_parity\chain_parity.json for the chain, while the 10-14 handoff says chain_equivalence.json; the code is what a cutover will read, so chain_parity.json is the name to produce unless Paul wants cutover.py changed. (c) Uncommitted live edits in the Melange tree besides fec/run_pipeline.py: fec/pipeline_lock.py and ops/tests/test_compute_engine.py show as modified (fec/compute_engine.py is clean at HEAD, so it is not one of them); owner unknown. [[ledger/melange-systems-brain/D-207|D-207]] ruled that run_pipeline.py is Paul's to commit, but says nothing about the other two (source: git status --short, read 2026-10-14).
  2026-10-15 (Claude, 2026-10-15 rulings records lane; facts below come from the orchestrator brief and were NOT re-observed by this lane; where this block and the blocks above disagree, this block is newer):
  - Rulings recorded today (Paul in chat, 2026-10-15): [[ledger/melange-systems-brain/D-208|D-208]] (press backlog and daily-media PASS-over-partial are bugs; daily media reports PARTIAL), [[ledger/melange-systems-brain/D-209|D-209]] (press flows every run; amends the [[ledger/melange-systems-brain/D-159|D-159]] DR-d veto), [[ledger/melange-systems-brain/D-210|D-210]] (press cumulative feed: latest accepted run wins; ranks may shift), [[ledger/melange-systems-brain/D-211|D-211]] (classifier spend and stop semantics), [[ledger/melange-systems-brain/D-212|D-212]] (tiered degrade, transactional chain), [[ledger/melange-systems-brain/D-213|D-213]] (watchdog alerts), [[ledger/melange-systems-brain/D-214|D-214]] ([[ledger/melange-systems-brain/D-203|D-203]] item 7 hold released), [[ledger/melange-systems-brain/D-215|D-215]] (Docker admin restart, prune and vhdx compaction executed), [[ledger/melange-systems-brain/D-216|D-216]] (refresh_tick.py is the single scheduled orchestrator; reverses [[ledger/melange-systems-brain/D-187|D-187]]). Dead end [[ledger/melange-systems-brain/DE-070|DE-070]] (deferral-streak tombstone as the dead-URL rule).
  - Scheduled tasks (Task Scheduler, read for the orchestrator brief): MoneyballCongressRefresh is Ready and enabled (not Disabled). MelangeStanceRetrain20261017 (the [[ledger/melange-systems-brain/D-204|D-204]] one-time retrain, due 2026-10-17 12:00) and MelangeAutoRelease are NOT FOUND, so the [[ledger/melange-systems-brain/D-204|D-204]] retrain will not run unless the task is re-created. MoneyballCollectorSupervisor has been disabled since 2026-09-01, so its GATE-1 can never pass.
  - Draft Systems R producers that feed ranks have never been scheduled: the congress_member_scraper cosponsor network (vintage 2026-06-25), the Stage 5 DEBATE+LSD cu_press_stance_tone.csv (vintage 2026-06-30), and Ballotpedia/MEDSL (vintage 2026-06-18). They sit outside this repo (Desktop\Draft Systems).
  - ~~Self-healing build in progress, UNCOMMITTED in the Melange working tree: P0 status-write hygiene plus weekly discovery deferral, P1 tick orchestrator plus failure classes plus source_freshness.json, P2 transactional chain plus labelled degrade, P4 watchdog.~~ (superseded 2026-10-18: COMMITTED on Melange main; each of these SHAs is an ancestor of main: P0 c28ebe1ed (2026-10-16 00:19 -0500, "Congress pipeline: status-marker writes can no longer kill a run (self-healing P0)"), P1 3cb213fd6 (2026-10-15 22:48 -0500, tick runner as the single orchestrator, failure classes, tiered degrade; [[ledger/melange-systems-brain/D-216|D-216]], [[ledger/melange-systems-brain/D-212|D-212]]), P2 75aa077fa (2026-10-15 21:59 -0500, transactional chain, labelled freshness degrade, gold-orphan policy; [[ledger/melange-systems-brain/D-212|D-212]]), P4 c6b9494d6 (2026-10-15 23:52 -0500) and dcaa3b083 (2026-10-16 00:08 -0500), both "Self-healing P4: stdlib watchdog with Windows toast alerts ([[ledger/melange-systems-brain/D-213|D-213]])" with the same four-file stat. No P3 commit was found; whether a P3 phase was planned was not checked. Source: git log -1 --format='%h %ci %s' on each SHA and git merge-base --is-ancestor <sha> main, read 2026-10-18. Not checked: whether anything of the build is still uncommitted in the live tree, or whether the commits are pushed ([[ledger/melange-systems-brain/D-139|D-139]]: Melange main is not pushed).)
  - Docker is up and C: has about 48.5 GB free ([[ledger/melange-systems-brain/D-215|D-215]]: vhdx 33.55 to 19.79 GB; 6 pinned compute images, VPS app images and parity builds kept). This supersedes the Docker-is-down bullet above.
  - NOT checked by this lane: any of the task states, the producer vintages, the build contents, or the disk figure.
  2026-10-18 (Claude, 2026-10-18 rulings records lane; facts come from the orchestrator brief except where a source is named; where this block and the blocks above disagree, this block is newer):
  - Rulings recorded today (Paul in chat, 2026-10-18): [[ledger/melange-systems-brain/D-241|D-241]] (Terrier is one app, no per-district limits), [[ledger/melange-systems-brain/D-242|D-242]] (parity proof standard: one Windows run is both A1 and A2; resolves open question (a) above), [[ledger/melange-systems-brain/D-243|D-243]] (Task Scheduler authority for the Docker-gap work, each change once its gate passes), [[ledger/melange-systems-brain/D-244|D-244]] (collector containers get the FEC key from a launcher-side wrapper that writes it for one run; Paul reviews the wrapper code first), [[ledger/melange-systems-brain/D-245|D-245]] (Mentat parity streak: commit freeze on codex/mentat-crypto, and three repeat runs count for the pinned-input refit parity), [[ledger/melange-systems-brain/D-246|D-246]] (Mentat refit-parity environment differences accepted as explained; 15 PPM package versions ratified), [[ledger/melange-systems-brain/D-247|D-247]] (Terrier OR-05 and CT-01 store-build parity uses the [[ledger/melange-systems-brain/D-242|D-242]] standard), [[ledger/melange-systems-brain/D-248|D-248]] (one-time approval below), [[ledger/melange-systems-brain/D-249|D-249]] (amends [[ledger/melange-systems-brain/D-246|D-246]]: the R version text in the refit receipt's G0 detail and review/gates.json also counts as an explained difference).
  - PENDING ONE-TIME APPROVAL ([[ledger/melange-systems-brain/D-248|D-248]]): Claude may fast-forward the live Melange main to claude/docker-coverage once the weekly refresh that started 2026-10-18 06:00 has finished, only when no refresh or pipeline is running and the live tree has no modified tracked files; nothing is pushed. As read 2026-10-18 (git, read-only): claude/docker-coverage is at 91ab39f75, 7 commits ahead of main, but main (a1640d69c, 2026-10-18 07:56) is not an ancestor of it, so the fast-forward is not possible as things stand and a merge or rebase is not covered by the approval. Not observed: the weekly refresh state, running pipelines, or the live tree's modified files.
  - FINDING AGAINST [[ledger/melange-systems-brain/D-246|D-246]]'s PREMISE (a finding, not a ruling; the code was read 2026-10-18, the run result is from the orchestrator brief and was not re-observed): [[ledger/melange-systems-brain/D-246|D-246]] accepts the pre-existing failure of test-19-parity-environment.R:17 as what makes the Windows refit parity run exit 1. But the run fails its own gate G2 with "1466 expectations, 3 failed, 0 errors". rf_parity_suite (mentat/forecast/refit/R/rf_parity.R:28) filters the suite to ^(01|02|03|04|05|06|07|08|08b|10)-, so test-19-parity-environment.R is not in that suite, and it runs testthat with reporter = "silent" (rf_parity.R:38), which names no failing test. So the 3 failures are in suite files 01-08, 08b or 10, not in test-19, and they remain unexplained until a verbose run on Windows identifies them. [[ledger/melange-systems-brain/D-246|D-246]]'s acceptance of test-19 line 17 does not cover them. Not checked: whether test-19 also fails when run on its own, or what the 3 failures are.
  2026-10-19 (wave 1 intake: refresh failures; Claude, wave 1 intake records lane; facts only, no causes or rulings; each bullet was re-observed read-only on 2026-10-19 from the source it names unless it says otherwise; where this block and the blocks above disagree, this block is newer):
  - WEEKLY 2026-10-18 HARD FAILURE at step 'press engine feed' (exit 1; data/engine/weekly_refresh.log:896-898, 19:04:09). The logged traceback tail is OSError: [Errno 22] Invalid argument at fec/stance/press_stage5.py:132 (handle.read(1024 * 1024) inside model_dir_sha256, :124-135), reading a file in the model directory; the log does not name the file. The press delta refresh before it passed ('OK 37621s', sealed outputs/press_refresh_20261018, :894) and so did the press intake audit (:895), unlike the four earlier Sundays (09-20, 09-27, 10-04, 10-11), each 'HARD FAILURE at press delta refresh' (:788, :814, :842, :868). The last 'WEEKLY REFRESH COMPLETE' line is 2026-07-19 (:170). MoneyballWeeklyRefresh: Last Run Time 2026-10-18 06:00:00, Last Result 1, Status Ready, Next Run Time 2026-10-25 06:00:00 (source: schtasks /query /tn MoneyballWeeklyRefresh /v /fo list, read 2026-10-19). Cause not diagnosed; a OneDrive cloud-only file in the model folder is an unconfirmed hypothesis from the brief, not tested.
  - WEEKLY 2026-10-18 soft failures, both continued past: 'interviews: MS NOW TIMEOUT after 3600s - continuing' with the process tree killed (pid 70452; log :889-890), and 'interviews: Washington Journal (21d) !!' after 168 s, 'RuntimeError: cspan_scrape.R failed with exit 1' at fec/collect/refresh_cspan_wj.py:49 (log :891-892). Soft by design: Melange 0e2f34f43 (2026-10-16, an ancestor of HEAD 11db3ad91) makes non-hard step failures reported, never gates (_soft_fail, fec/weekly_refresh.py:322-326, read 2026-10-19).
  - NEXT STOP AFTER PRESS, predicted from code and environment, not run: fec/weekly_refresh.py:575 runs 'prepare dashboard deployment' (surfaces/publish_dashboard.py, hard=True, no --password-file argument); publish_dashboard.py:39 raises 'DASHBOARD_PASSWORD_FILE or --password-file is required' when the value is empty, and :132 takes it from the environment. DASHBOARD_PASSWORD_FILE is unset at User scope, at Machine scope and in the current process ([Environment]::GetEnvironmentVariable, read 2026-10-19). The ':510' reference in Next action 7 is now :575.
  - DAILY congress pipeline FAILED at admissions on 2026-10-16 and 2026-10-18 (audits/congress_pipeline/<run>/receipt.json: status FAILED, error 'RuntimeError: admissions failed with exit 1'; run ids are UTC). Run 20261016T205304Z: discovery DEFERRED after two failures (rc 1, rc 1), admissions rc 1 after 5,584 s, with four TimeoutExpired lines in admissions.log, each 'timed out after 480 seconds'. Run 20261018T083539Z: discovery rc 0, admissions rc 1 after 440 s; the one error is hr:8295 TimeoutExpired on the claude.exe classifier call, 'timed out after 480 seconds' (admissions.log:93). Both admissions summaries read status FAIL, admitted_bills 13, memberships 43; errors 4 and deferred 13943 on 10-16, errors 1 and deferred 13944 on 10-18. The deferrals in both logs are 'SourceUnavailable: official statute service ...' (HTTP Error 500, maintenance or temporary format). [[ledger/melange-systems-brain/D-212|D-212]] (2026-10-15) says the system never halts as a whole and serves last-good, labelled; both runs ended with status FAILED (not compared further with the code).
  - DAILY 2026-10-19 run 20261019T185758Z (started 13:57:59 local) FAILED in the media step: returncode 1073807364 (0x40010004) after 1,721.69 s, child_pid 14824, completed_at 2026-10-19T21:37:12Z (16:37:12 local); receipt error 'RuntimeError: media failed with exit 1073807364'. calibration, discovery (first attempt rc 1, retry rc 0, 5,012.52 s), admissions (rc 0, 132 s), votes, repository and billstatus all returned 0. The receipt's rollback field is 'verified' and rollback_membership_load reads 'ValueError: official membership movements refer to a different repository' (the same line is in the 10-16 and 10-18 receipts). data/engine/daily_media_refresh_receipt.json (mtime 16:34 local) still reads status RUNNING, owner_pid 14824, last heartbeat 2026-10-19T21:34:58Z, sources crec through fox PASS and nothing after fox; pid 14824 no longer exists. The brief says the kill came around a reboot; not confirmed: LastBootUpTime is 2026-10-15 12:56:50, and the System log has no event with Id 12, 13, 27, 41, 42, 107, 109, 1074, 6005, 6006 or 6008 between 15:30 and 18:30, but it has Winlogon 7002 (user logoff notification) at 16:37:24 and 16:56:04, each followed by 7001 (logon) at 16:37:35 and 16:56:11 (read 2026-10-19).
  - Further run 20261019T215644Z (started 21:56:44Z = 16:56:44 local, owner_pid 20992) was RUNNING when read at 18:31 local (data/engine/congress_pipeline_status.json: active_step discovery, calibration rc 0, heartbeat 2026-10-19T23:31:43Z, child_pid 48732). congress_pipeline_live.log: the first discovery attempt ended 'exit 1; one retry in 300s' at 4,791.2 s (23:16:51Z) and the retry was at 521.6 s at 23:30:35Z. The first attempt's discovery.log ends 'FallbackError: official fetch failed: https://www.govinfo.gov/bulkdata/BILLSTATUS/119/hr/BILLSTATUS-119hr1768.xml: ... SSL: UNEXPECTED_EOF_WHILE_READING' (fec/legislation/govinfo_discovery_fallback.py:238); discovery.retry.log says the Congress.gov verification cooldown is active and the GovInfo pending-only fallback is running. No receipt.json in the run folder yet. This is a snapshot; it will change.
  - From the brief, not re-observed: a diagnosis lane was opened 2026-10-19 (wave 1; provenance in audits/wave1_20261019/); fixes are pending Paul's go.
  2026-10-19 (Claude, pipeline-health lane; source: Paul's chat rulings [[ledger/melange-systems-brain/D-251|D-251]] and [[ledger/melange-systems-brain/D-252|D-252]] and the orchestrator's brief; NOT re-observed by the lane that wrote this block, and the Last verified stamp is deliberately not advanced for it):
  - FINDINGS: no congress pipeline run has fully passed since 2026-10-12; the weekly refresh has ended in HARD_FAILURE on five Sundays. Root causes found: (1) OneDrive online-only Stage 5 weights (OSError Errno 22 at press_stage5.py:132; fixed operationally by [[ledger/melange-systems-brain/D-252|D-252]]); (2) a rollback crash on permanent membership drift left by the 2026-10-16 run, which died without a handler; (3) admissions FAILs from classifier timeouts ([[ledger/melange-systems-brain/D-251|D-251]]); (4) MS NOW re-walking its 215-page archive each run, causing the 3600 s timeouts; (5) WJ: an R error is swallowed and its cause is unconfirmed (a manual run passed).
  - FIXES on Melange branch fix/pipeline-health-20261019: 7 fix commits plus test commit 706a9be5b, rebased on main 11db3ad91. PR pjg93-222/Melange#15 is open (filtered export; CodeRabbit threads resolved). LANDING on live main is PENDING the exit of the 2026-10-19 16:56 daily run (run 20261019T215644Z).
  - OPEN FOLLOW-UPS for Paul: per-key repeat-timeout hold ([[ledger/melange-systems-brain/D-251|D-251]] reversal); the is_error non-quota envelope still FAILs; MS NOW resume cursor plus key-set digest; WJ cspan_scrape.R tryCatch retry; membership heal (roster verify) if still drifted after the next chain; disk (C: about 16 GB free; worktrees C:\Users\pgoff\wt\melange-wave1 and C:\Users\pgoff\wt\melange-wave1-adm wrote about 31 GB of duplicated legfix5 audit data on 2026-10-19); CollectorSupervisor disabled since 2026-09-01 (stale lock); StafferLiveSidecar disabled since 2026-09-30; brainlink-daily refused with 0x800710E0.
  2026-10-20 (Claude, pipeline-health lane; facts below observed by this lane via git/commands unless noted):
  - LANDED: live Melange main fast-forwarded to a787d3cc0 (fix/pipeline-health-20261019 rebased onto 57165fc85; 16 commits: the six root-cause fixes plus follow-ups: refined systemic guard (>=2 non-timeout failures or >=3 all-timeout), is_error non-quota envelope deferred, per-key hold after 3 consecutive classifier deferrals, MS NOW date-cursor resume plus key-set/id superset guard, WJ cspan_scrape.R js_retry, cspan R test kept out of the public export). collector_sentinels/*.done are untracked and ignored (16 files preserved on disk). Another session committed ae83ae15a on top afterwards.
  - PR pjg93-222/Melange#15: publish head 115870056; all CodeRabbit threads resolved; open, mergeable. A wave-1 session is stacking a PR on #15 ([[ledger/melange-systems-brain/DE-043|DE-043]] Fix A: media before repository/billstatus; weekly rollback on hard abort; per-step weekly logs; watch status INTERRUPTED).
  - 2026-10-19 22:32 unexpected shutdown (Kernel-Power 41/6008) killed the daily run in its media step; the repository had advanced; no handler ran; status JSON stale RUNNING; .pipeline_run.lock holds dead pid 20992.
  - Membership sidecar HEALED 2026-10-20 by roster-verify only (4 outputs, backups *.pre-heal-20261019); now bound to live repo hash 08870bad64f5...; load OK.
  - Verification on live main: 326 targeted tests and 17 release-export tests pass. Kernel suite run_tests.py ABORTS at [flip_model] (run_tests.py:209 -> moneyball_core.py:149): competitiveness artifact stale, because data/money/cook_pvi_2026/cook_pvi_2026_districts.csv was rewritten 2026-10-17 13:52 after competitiveness_c.json was built 2026-10-13. build_competitiveness.py is a chain step (run_pipeline.py:88), so the next chain run rebuilds it (the c multiplier may move ranks; that is the expected [[ledger/melange-systems-brain/D-104|D-104]] refresh); not run by this lane.
  - Disk: C: 14.8 -> 85.5 GB free by sparse-excluding audits/legfix5 from 4 idle worktrees (platform-installer, ecstatic-morse-1e4ca8, intelligent-cohen-993154, ReleaseLanes\melange-integration); reversible with sparse-checkout disable. Left for Paul: wt\melange-wave1 (+adm) active, wt-desktop-ci inside a scratchpad, Codex mentat-audit 35 GB, Terrier cu-geography outputs 31 GB, C:\ReleaseAcceptance 13 GB, installers 12 GB.
  - OPEN for Paul (from PR #15 decisions): the classifier-unavailable hold re-enters the billed hold-retry pool; deferral counts advance only on installed runs; mixed rc1+timeout is not systemic; MS NOW before= resume verified live in scratch only.
  2026-10-20 (wave 1 landed: refresh resilience; Claude, wave 1 landed records lane; each bullet was re-observed read-only on 2026-10-20 from the source it names unless it says otherwise; where this block and the blocks above disagree, this block is newer):
  - LANDED on live Melange main: fast-forward ae83ae15a..a4a484595 (reflog: merge claude/wave1-delta-land2, Fast-forward, 2026-10-20 00:34:08 -0500; ae83ae15a is an ancestor), 11 commits, 10 files ([[ledger/melange-systems-brain/DE-043|DE-043]]): fec/weekly_refresh.py, fec/bounded_subprocess.py, fec/legislation/refresh_congress_pipeline.py, fec/legislation/watch_congress_pipeline.ps1, fec/legislation/CONGRESS_PIPELINE.md, fec/DAILY_REFRESH.md and four test files (fec/tests/infra/test_bounded_subprocess.py, fec/tests/infra/test_weekly_discovery_deferral.py, fec/tests/legislation/test_refresh_congress_pipeline.py, ops/tests/test_compute_engine.py). Main has moved on since (tip e5a3ffb88 at the read; a4a484595 is its ancestor).
  - FIX A (refresh_congress_pipeline.steps(), refresh_congress_pipeline.py:138 at a4a484595): media now runs BEFORE repository and billstatus (media is hours long and killable; the fetch and the chain's verify_collector_roster_updates.py, which rebinds the membership sidecar, are one unit). Residual unbound window (a hard kill there still strands the binding): the repository step after its write, billstatus, and in media/smoke mode the ~12 chain steps before verify_collector_roster_updates (calibration_guard .. receptivity_layer). Cost (fec/DAILY_REFRESH.md:57-61): behavior_panel.py and behavioral_dispositions.py now read the PREVIOUS run's bill_repository_live.json, a one-run lag; a cosponsor added since the previous fetch is judged unverified for that run (the row drops from both steps), so receptivity_layer values can shift slightly for one run.
  - FIX B (fec/weekly_refresh.py at a4a484595): before the repository step it snapshots bill_repository_live.json and congress_bill_refresh_receipt.json to audits/weekly_refresh/<stamp>/before/ (rollback armed only when the repository copy exists, :495-514); _hard_abort calls rollback_unbound_repository (:327-347) and logs restored / verified / unhealable_drift / unrecognised label plus a membership-load line (abort status and exit code unchanged); before/ is removed on COMPLETE (:524-525). PER-STEP LOGS: bounded_subprocess.run_bounded(log_path) persists argv, outcome and both streams, including on a timeout kill; weekly writes audits/weekly_refresh/<stamp>/<slug>.log and sets PYTHONUNBUFFERED=1 for host-path children (:367-384). WATCHER: watch_congress_pipeline.ps1 shows INTERRUPTED for a dead or recycled owner pid (:133-142).
  - PUBLISHED as PR pjg93-222/Melange#16 (https://github.com/pjg93-222/Melange/pull/16; open, not draft, MERGEABLE, 13 files, +657/-32): filtered export, publish commit 7bc9b668e on publish/wave1-delta-20261020, base claude/pipeline-health-20261019 (PR #15, head 115870056, open), so #15 merges first. Source: local claude/wave1-delta 255614003 (on main as a4a484595). Per ReleasePublish PUBLISH_RECEIPT.md section AB: gitleaks 8.30.1 clean beyond the 4 known false positives (cook_pvi.py:38, compet_reciprocity_look.py:44, make_member_desk_00.tpl:666, test_lock_dashboard.py:19), FILTER_REPORT.txt Addendum 23, 365 source tests passed (not re-run by this lane).
  - ~~CODERABBIT on PR #16: the status was PENDING at the start of this lane's read and SUCCESS when re-read; one review (2026-10-20 05:39Z) with 2 Minor inline comments, no replies or resolutions yet: (1) fec/weekly_refresh.py ~325-328 - track whether the process holds the writer lease and call rollback_unbound_repository only when a before-image exists and the lease is held (else skip and keep the before-image); (2) FILTER_REPORT.txt:616 - the blob-equality sentence must name fec/network/build_holistic_base.py and build_holistic_normalized.py as the two exceptions. Not triaged by this lane.~~ - resolved 2026-10-20 (0 threads)
  - SUPERSEDED AND DROPPED (local branches, never published; the rationale is from the orchestrator brief, not re-observed): claude/wave1-admissions-timeout (0ab1da8e2), claude/wave1-msnow-incremental (320541e0f) and the rollback-label part of claude/wave1-receipt-truth (5eadc274c) - PR #15 / [[ledger/melange-systems-brain/D-251|D-251]] / [[ledger/melange-systems-brain/D-252|D-252]] cover them. Re-observed: all three exist as local branches and none is among the 19 branch names on the pjg93-222/Melange remote. The receipt says the watcher and doc commits of receipt-truth were picked into wave1-delta.
  - OPS 2026-10-19 (re-observed): Draft Systems\debate_finetuned (C:\Users\pgoff\OneDrive\Desktop\Draft Systems) carries attributes A R P; all 5 files (746,053,491 bytes) have the pinned bit and none has the unpinned, offline or recall bit (attrib +P -U /S /D, [[ledger/melange-systems-brain/D-252|D-252]]). User env var DASHBOARD_PASSWORD_FILE = C:\Users\pgoff\AppData\Local\Melange\dashboard_password.txt (= %LOCALAPPDATA%\Melange\dashboard_password.txt; path only: the file exists, its contents were not read; Machine scope unset). The 2026-10-19 NEXT STOP bullet above found that variable unset; 'prepare dashboard deployment' was not re-run.
  - DAILY RUN 20261019T215644Z (started 16:56:44 local, owner_pid 20992) was killed in media by the 2026-10-19 unexpected shutdown: no receipt.json in the run dir; data/engine/congress_pipeline_status.json still reads RUNNING (active_step media, child_pid 74380, heartbeat 22:42:51 local, file mtime 22:42:53); pid 20992 is not alive; .pipeline_run.lock still holds pid 20992. Steps ran in the old order: calibration, discovery (after a retry), admissions, votes, repository (482 refreshed, 0 failed, updated_at 19:44 local), billstatus, then media (media.log's last entry: bluesky PASS 21:49 local; msnow and washington_journal FAIL before it). System log: Kernel-General 12 system start 22:47:24, Kernel-Power 41 at 22:47:29, EventLog 6008 at 22:47:44 naming the previous shutdown as 10:32:58 PM; the heartbeat is later than that time, so the stop fell between 22:42:53 and the 22:47:24 restart. The membership heal was done by another session (pipeline-health block above; not re-observed here).
  - TASK SCHEDULER (Get-ScheduledTask, 2026-10-20): MoneyballCongressRefresh Ready and MoneyballWeeklyRefresh Ready, both Principal LogonType Interactive, RunLevel Limited, user pgoff; MoneyballDailyRefreshRetry Disabled. The earlier 2026-10-19 daily kill (run 20261019T185758Z, rc 0x40010004, 16:37:12 local) coincides with System-log Winlogon 7002 logoff notification 16:37:24, 7001 logon notification 16:37:35 and ReleaseTest user-hive activity 16:37:38-48; which session changed is not determined by this read (PR #16's body calls it a sign-out).
  - OPEN for Paul (decisions, not done; PR #16's body lists the same three): (1) refresh tasks die on Windows sign-out/reboot - Task Scheduler logon type (Interactive today); a crash or reboot also stops a run whatever the logon type, which Fix A/B only bound; (2) the live Netlify desk predates 2026-10-10 and the 10-12 invited build (lock d7b1ed44...) was never uploaded (governance pending; Netlify site id unset - from the brief, not re-observed; no NETLIFY* environment variable exists at User or Machine scope); (3) accept the one-run behavioral lag from Fix A. Ranked list: Melange audits/wave1_20261019/PAUL_DECISIONS.md (untracked, not committed).
  - PR #16 merged into origin main as c2786637d; follow-up PR #17 (restore_failed label, admissions mixed-outage guard; addendum 27/AF) merged as fc74822df; public main matches live main for this lane; lane closed.
- STATUS 2026-10-12, LATER RULINGS AND IMAGES (Claude, rulings records lane; where this bullet and a line below disagree, this bullet is newer): DECISIONS.md [[ledger/melange-systems-brain/D-176|D-176]] to [[ledger/melange-systems-brain/D-181|D-181]] record Paul's later 2026-10-12 rulings: [[ledger/melange-systems-brain/D-176|D-176]] (30-day security-gate exceptions for 53 gitleaks false positives), [[ledger/melange-systems-brain/D-177|D-177]] (equivalence standard for containerized compute is content-level for workbooks and SQLite stores; ranks_python.json, dashboard_data.json, bipartisan.json and the Terrier bundle zip stay byte-identical; amends [[ledger/melange-systems-brain/D-173|D-173]]'s "byte-identical" wording), [[ledger/melange-systems-brain/D-178|D-178]] (replace @oai/artifact-tool with openpyxl in the 3 Melange chain steps and Mentat's Overview workbook builder, behind a switch, proven content-identical on Windows first), [[ledger/melange-systems-brain/D-179|D-179]] (the claude CLI runs inside the compute container; the login is a read-only mounted secret, never in an image or CI), [[ledger/melange-systems-brain/D-180|D-180]] (collectors proven by replaying Windows-recorded responses before they run live), [[ledger/melange-systems-brain/D-181|D-181]] (Debian 13 bases pinned by digest; the images stage fails only on fixable HIGH/CRITICAL; amends [[ledger/melange-systems-brain/D-169|D-169]] for that stage). The three app images are built and pushed to private GHCR (melange-desk sha256:e533ff8f…, mentat-console sha256:89600c96…, terrier-web sha256:16d40c0c…); the release kit is pending the trixie / scan-policy change ([[ledger/melange-systems-brain/D-181|D-181]]); the Docker Desktop install (Paul) gates the compute parity work ([[ledger/melange-systems-brain/D-173|D-173]], [[ledger/melange-systems-brain/D-175|D-175]]). (source: Paul's answers, the image digests and the push to GHCR are from the orchestrator's brief and were not checked here; the digests are the truncated forms given.)
- STATUS 2026-10-12, CONTAINERIZATION RULINGS (Claude, containerization-rulings records lane; where this bullet and a line below disagree, this bullet is newer): Paul ruled three things on 2026-10-12: [[ledger/melange-systems-brain/D-173|D-173]] (everything containerized: build and run the three app images now, then containerize compute in lanes, Terrier store builds, then the Mentat R/Python pipeline, then the Melange chain and collectors, each proving byte-identical outputs (ranks, desk data, workbooks) against the Windows host before it replaces it; amends [[ledger/melange-systems-brain/D-165|D-165]]); [[ledger/melange-systems-brain/D-174|D-174]] (Excel recalculation replaced by LibreOffice headless inside the containers; resolves the CONSTRAINTS item on Excel in Linux containers; every recalculated output proven identical or every difference explained and accepted by Paul, and the 533 member ranks verified, before cut-over; fallback if differences cannot be eliminated: keep the Excel steps on Windows); [[ledger/melange-systems-brain/D-175|D-175]] (images built in GitHub, apps on the VPS, compute containers on this laptop under Docker Desktop, which Paul installs). This lifts the "compute-plane containers (v1 Layer 2)" clause of the GO-LIVE GATE line below and changes LANES item 5 below (Docker is now installed on the laptop to run compute; CI still builds every image). Docker Desktop needs about 20 to 30 GB free on C:; the orchestrator's brief gave C: about 8.4 GB free, and a read at record time showed 51.5 GB free (Get-PSDrive C), so re-measure before installing. MENTAT LANDED: deploy/mentat-hosted (tip 8499e6e8a) was fast-forwarded into C:\Users\pgoff\Mentat (branch codex/mentat-crypto, HEAD now 8499e6e8a) at 2026-10-12 10:33 by another session, so READY-NOT-LANDED item (1) below is landed for Mentat (Terrier item (2) is unchanged by this bullet). The one-time analytical-index rebuild that landing forces is waiting for the running Cycle-2020 collection to finish and for disk headroom (C: about 8.4 GB free per the brief), and the 8806 console still runs the old code until Paul restarts it. (source: git reflog and git log in C:\Users\pgoff\Mentat and Get-PSDrive C, read 2026-10-12; Paul's three answers, the Cycle-2020 collection still running, the 8806 console running old code and the 8.4 GB figure are from the orchestrator's brief and were not checked.)
- STATUS 2026-10-12, LANDING (Claude, deployment landing lane; Melange main 9a905befe; where this block and a line below disagree, this block is newer):
  - LANDED on Melange main (9a905befe, a fast-forward of deploy/fix2 from 0f9880a0e; the previous landing 0f9880a0e had the kernel suite at 514 passed / 0 FAILED; fix2 touches only ops/ and fec/surfaces/make_invited_build.py, so the full kernel suite was not re-run, and the kernel registration census gave 4 passed; mirror main = 9a905befe through the post-merge hook; the live tree's dirty list was byte-identical before and after): ops/ release tooling (release.py plan/run/resume/status, export, signing, restic data push, the Netlify API flow, and the governance, census and security gates); ops/security_gate.py; ops/vps/* (updater, cloud-init, systemd units, host scripts); compose and Dockerfiles and CI workflows (actions pinned by SHA, image digests pinned, hashed Linux locks; the workflows are staged under ops/github/workflows); ops/kit; the RUNBOOK, VPS, RELEASE, DESK and SECURITY_GATE docs; fec/access_gate.py (sha256 dc7ef050…58d, identical in all three repos); fec/surfaces/desk_server.py and make_invited_build.py; ops/governance/invited_profile.json (still pending); ops/deploy_desk.py (parallel session, [[ledger/melange-systems-brain/D-171|D-171]]); the governance matrix and the use-agreement template under audits/deploy_20261011/.
  - ~~READY, NOT LANDED (each needs Paul's per-change OK): (1) Mentat deploy/mentat-hosted tip 8499e6e8a in C:\Users\pgoff\Mentat: hosted read-only mode, GET/POST allowlists, donor-level gating via MENTAT_DONOR_ROW_EMAILS, individual-donor aggregation in /api/flow, person-subject removal in /api/comparison, summary-sheet name redaction, portable index tokens; landing = `git -C C:\Users\pgoff\Mentat merge --ff-only deploy/mentat-hosted`, and it forces a one-time analytical-index rebuild of about 2-3 GB. (2) Terrier deploy/terrier-hosted tip cb16c1d (or the current tip) in C:\Users\pgoff\Documents\Terrier\outputs\cu-geography-v3: the local launchers do not run migrate, and migrations 0003 and 0004 are pending on all three accounts DBs; landing = stop the servers, back up the three accounts.sqlite3 files, ff-merge, run manage.py migrate per district (commands in the deployment report).~~ — superseded 2026-10-13: both landed. (1) Mentat: deploy/mentat-hosted (8499e6e8a) was fast-forwarded into codex/mentat-crypto on 2026-10-12 at 10:33 (already recorded in the CONTAINERIZATION RULINGS bullet above). (2) Terrier: landed on 2026-10-12 on Paul's ruling ([[ledger/melange-systems-brain/D-192|D-192]]), fast-forwarded to 28eda29 at 21:57 and to 4b45eb9 at 22:19 ([[ledger/melange-systems-brain/D-192|D-192]] records the migrations and the backups); the checkout has moved on since (tip bd319d5 on claude/walk-list at the read). (source: git reflogs in C:\Users\pgoff\Mentat and the Terrier live checkout, read 2026-10-13.)
  - CLAUDE DEFAULTS PENDING PAUL'S GOVERNANCE RULING (recorded in code and docs; Claude's defaults, not rulings): the field-manager group (empty) can build walk lists on the server; unlisted Mentat viewers get individual donors aggregated and person-level fields refused; summary sheets are redacted; Terrier phones, contacts and scores are closed; there is no per-list assignment within a district; AuditEvent stores voter keys (retention pending).
  - RELEASE BLOCKERS (by design; the gates refuse): the weekly refresh is at HARD_FAILURE at the press delta (four Sundays, 2026-09-20 to 10-11; cause and fix in Next action 7; next stop after press is 'prepare dashboard deployment' until DASHBOARD_PASSWORD_FILE is set); dirty fec/ paths in the live tree; the invited build is not yet built into outputs/invited_build and the governance rows are unruled (the profile is pending); the serve-set census is pending; and the Phase 0 Paul actions (gitleaks, restic and cloudflared installs, ssh-agent, the GitHub repo and PAT, the domain and Cloudflare Zero Trust, the Netlify site id and token, the VPS, Healthchecks, SEC-a, the SEC-d drill).
  - CLOUD-INIT SIZE: ops/vps/cloud-init.yaml is 32,537 of 32,768 bytes (231 bytes of headroom), so any growth in the updater needs trimming. The POSIX-only VPS tests run first in Linux CI (source: wc -c on the live file, read 2026-10-12; the CI ordering is from the brief).
- PLAN (Paul approved 2026-10-11; approval is the go-ahead to record the rulings and build Phases 1-4): C:\Users\pgoff\.claude\plans\we-are-going-to-dapper-sunrise.md. Rulings: [[ledger/melange-systems-brain/D-164|D-164]] audience and governance gate; [[ledger/melange-systems-brain/D-165|D-165]] hosting topology; [[ledger/melange-systems-brain/D-166|D-166]] Cloudflare Tunnel + Access; [[ledger/melange-systems-brain/D-167|D-167]] source-only platform repo (amends [[ledger/melange-systems-brain/D-148|D-148]] "shared"); [[ledger/melange-systems-brain/D-168|D-168]] release channel and four package types; [[ledger/melange-systems-brain/D-169|D-169]] fail-closed security gate (extends [[ledger/melange-systems-brain/D-096|D-096]]); [[ledger/melange-systems-brain/D-170|D-170]] VPS encryption and go-live gates; [[ledger/melange-systems-brain/D-171|D-171]] Netlify desk; [[ledger/melange-systems-brain/D-172|D-172]] serve images on the latest Python 3.12 patch (Claude's, approved in the plan). Lane memory: deployment-lane-2026-10-11.md.
- NETLIFY SUPERSESSION (2026-10-12): Paul's earlier "yes, upload to Netlify" ([[ledger/melange-systems-brain/D-148|D-148]] SEC-e; Next action 1e) is superseded by [[ledger/melange-systems-brain/D-171|D-171]]. The desk is deployed by API to the existing site (draft, verify hashes, publish), with the password rotated first and old deploys deleted after the first verified new one. The first publish still needs Paul's yes at the time. Read Next action 1e with [[ledger/melange-systems-brain/D-171|D-171]].
- LANES (Claude, 2026-10-12; each in its own worktree; Sonnet 5.5 executors build, an Opus architect reviews access_gate, the Terrier authz, the lock changes and the updater, a verifier checks; merge locally when green; Melange main is never pushed, [[ledger/melange-systems-brain/D-139|D-139]]; live servers 8806, 8841 and Terrier restart only when Paul restarts them; no running chain is touched; one heavy job at a time): status 2026-10-12: lanes 1 to 6 are LANDED on Melange main 9a905befe (lane 3 on b0a958740 earlier), lanes 7 and 8 are ~~READY, NOT LANDED~~ — superseded 2026-10-13: lane 7 (Mentat) landed 2026-10-12 at 10:33 and lane 8 (Terrier) landed 2026-10-12 ([[ledger/melange-systems-brain/D-192|D-192]]) (see STATUS; source: git on the live tree, Mentat and Terrier branch tips, read 2026-10-12).
  1. Access gate (Phase 2 shared rule): access_gate.py, one stdlib copy each in fec/, mentat/app/ and Terrier server/research/; local default behavior stays byte-for-byte unchanged.
  2. Security gate (Phase 1, Lane S, off Melange main): ops/security_gate.py {export|images|packages|all}, plus hashed Linux locks per image (closes OPS-2 for deployed code).
  3. Governance (Phase 1, Lane S): audits/deploy_20261011/GOVERNANCE_MATRIX.md, not yet written [SUPERSEDED 2026-10-12: written on deploy/governance b0a958740; see the GOVERNANCE MATRIX bullet below]; Paul rules each row; it gates go-live, not the build.
  4. Release (Phase 4, Lane R, off Melange main): ops/release.py, plumbing export to C:\Users\pgoff\PlatformRelease\melange-platform.git, signed manifest, restic snapshots, the Netlify API flow, and the packages.
  5. VPS, containers and CI (Phases 3-4, Lane R): ops/docker, ops/compose.yaml, release.yml and deps.yml, ops/vps updater and cloud-init.yaml. CI is the only image builder; Docker is never needed on the laptop.
  6. Desk (Phase 2, Lane D, off Melange main): fec/surfaces/desk_server.py plus an invited-build profile in make_combined.py; no engine change, so the rank delta must be 0/533.
  7. Mentat hosted (Phase 2, Lane M, off codex/mentat-crypto in C:\Users\pgoff\Mentat): ALLOWED_HOSTS and BIND_HOST, --read-only required under Access, export and evidence routes refused for invitees, MENTAT_STATE_WRITE_ROOT for writable state.
  8. Terrier hosted (Phase 2, Lane T, off claude/walk-list in Documents\Terrier\outputs\cu-geography-v3): AccessJwtMiddleware, CU_DEPLOYMENT=hosted baked into the image, person-level routes opened only for each district's invited staff, state volume separate from snapshots.
- PHASE 0, WAITING ON PAUL ONLY (barred for Claude; Claude never sees a credential value; run in parallel with the build, in this order where it matters):
  1. Elevated PowerShell: SEC-a sentinel RunLevel fix (H-2); enable the ssh-agent service; install restic, cloudflared and gitleaks from their official releases.
  2. Carbonite (SEC-d): add C:\melange-data, %LOCALAPPDATA%\Melange (minus the password file), the Terrier data dir and C:\Users\pgoff\PlatformRelease; run the 3-file restore drill.
  3. Desk password: rotate it with the one command Claude provides (Claude never sees the value); set the DASHBOARD_PASSWORD_FILE user env var (this fixes the hard step at weekly_refresh.py:510).
  4. GitHub: security-key or passkey 2FA; review Settings > Applications for all-repos apps; create the empty private pjg93-222/melange-platform; create a classic PAT with read:packages for the VPS.
  5. Domain: own or buy one, turn on registrar 2FA and lock, and move the nameservers to Cloudflare.
  6. Cloudflare Zero Trust: account 2FA and a Free org; email OTP plus MFA; the groups and Access apps of [[ledger/melange-systems-brain/D-166|D-166]]; the tunnel with every route set to Protect with Access; svc-push, svc-status and a logs API token in Windows Credential Manager; cache bypass, HSTS and tunnel notifications.
  7. Netlify: provide the site ID and create a PAT entered into the DPAPI prompt; delete old deploys after the first verified new one.
  8. VPS: account, 2FA and payment; server and volume in a US region; provider firewall deny-all inbound and provider backups off; paste ops/vps/cloud-init.yaml; set a break-glass console password kept on paper; paste the tunnel token and the GHCR PAT.
  9. Healthchecks.io dead-man switch with phone alerts.
  10. Invites last: invitees sign the use agreement (Claude drafts the template; not legal advice), then Paul invites them (a Cloudflare group, plus manage.py invite per Terrier district).
- BLOCKERS TO THE FIRST DATA RELEASE (2026-10-12, from the plan; ops/release.py refuses until both clear, which is correct per [[ledger/melange-systems-brain/DE-031|DE-031]]):
  a. ~~The 2026-10-11 weekly refresh failed. The plan says at press delta; [[ledger/melange-systems-brain/D-162|D-162]] records the sentinel-admissions step failing on House Code outages. The two accounts are not reconciled and the cause is not triaged; triage per the debugging playbook.~~ — reconciled 2026-10-12 (read-only, log + code): both are true. The only hard abort was press delta refresh, step exited 3, status=PARTIAL pending_body_urls=1137 (weekly_refresh.log:866-868). The sentinel step (log:849) and bill repository (log:853) failed earlier but are soft, deferred steps (weekly_refresh.py:376-379, 388-392) that abort only at 'deferred collection prerequisites' (:453-455) after press; [[ledger/melange-systems-brain/D-162|D-162]] fixed that path (sentinel_admissions.json reinstalled 2026-10-13T00:05Z, 12 carried). Press cause and fix: Next action 7.
  b. About 66 dirty fec/ paths in the live tree (the plan's count, not re-checked here) must land or be parked by their owning lanes.
- GO-LIVE GATE: [[ledger/melange-systems-brain/D-170|D-170]] (SEC-a closed, SEC-d drill passed, matrix rows ruled, security gate green, Access and app-JWT negative tests, runbooks, use agreements). Not in this build, Paul-gated: hosting the live staffer console (32 GB server plus 8841 read-only work), compute-plane containers (v1 Layer 2), and an automatic data release after the weekly refresh ([[ledger/melange-systems-brain/D-168|D-168]]).
- GOVERNANCE MATRIX (2026-10-12, ~~branch deploy/governance b0a958740~~ — superseded 2026-10-12: LANDED on Melange main, b0a958740 is an ancestor of 9a905befe and the three files are tracked at HEAD; source: git merge-base --is-ancestor and git ls-tree, read 2026-10-12): audits/deploy_20261011/GOVERNANCE_MATRIX.md (66 unruled rows), ops/governance/invited_profile.json ("pending": true), audits/deploy_20261011/USE_AGREEMENT_TEMPLATE.md (template; counsel to review; not legal advice). Paul rules every row; it gates go-live ([[ledger/melange-systems-brain/D-170|D-170]]), not the build. Open questions: Q1 lobbyist names (split: names-as-filed vs our revolving-door labels); Q2 OpenSecrets permission scope for invitees; Q3 [private — see knowledge vault] terms for OR/CT + US-only; Q4 contacts route + walk-list phones vs O-9 "never strip"; Q5 workbooks in reader downloads (v1: none; never Mentat receipt workbooks).
- WARNING (2026-10-12): deploy\index.html (built 2026-10-11 23:38) is a FULL four-surface build, not an invited build; under [[ledger/melange-systems-brain/D-171|D-171]] it must NOT be uploaded to Netlify. The staffer Groups panel in Moneyball.html embeds 15,699 lobbyist names (2,341 with our "former Hill staff" labels; 11,021 contract-filer names) from an LDA corpus whose receipt says publication_enabled:false / restricted-machine-local; build_staffer_groups_section.py:587,1672,1834 copies the tag but never enforces it. Whatever is live on Netlify now may carry it (unverified). Paul decides on the live deploy (rotation/deletion are his actions per [[ledger/melange-systems-brain/D-171|D-171]]).
- OTHER GOVERNANCE FINDS (2026-10-12; for the Mentat and Terrier hosted lanes): Mentat read-only mode can still read arbitrary files/folders (server.py:3323-3326) and serves donor workbooks/sheets on GET without the token (server.py:3010-3012), so hosted mode must refuse both; the tracked Mentat Pocket template contains a data snapshot (119,605 chars, 2026-09-14) and must not ride the source export; Terrier dispositions lack recorded_by (models.py:36-57) and walk lists download as CSV up to 10,000 voters, so hosted mode must add recorded_by/audit and disable bulk CSV; local file paths leak into four page data blocks (the invited profile drops them).
- ACCESS GATE REVIEW (2026-10-12, Opus): verdict SHIP-WITH-FIXES. Findings: H1 enforcement keyed on env, not the actual bind; M1 per-method gating; M2 Django META header names; L1 future-dated JWKS; L2 non-canonical base64. ~~Fixes in progress on deploy/access-gate.~~ — superseded 2026-10-12: access_gate landed on Melange main 9a905befe (fec/access_gate.py sha256 dc7ef050…58d, the same copy as Mentat deploy/mentat-hosted and Terrier deploy/terrier-hosted by their first 20 hex digits); whether each of H1, M1, M2, L1 and L2 is fixed in that copy was not re-checked (source: sha256sum and git show, read 2026-10-12).
- 2026-10-13 to 2026-10-20 (fec debug sweep CLOSED; Claude, sweep closeout records lane; from the orchestrator brief, not re-observed). Handoff: audits/fec_sweep_20261013/HANDOFF.md; ranked decisions: PAUL_DECISIONS.md there and the PR #14 body.
  - DONE: every fec folder swept; source commits on local main; per-folder reports fec_*.md in audits/fec_sweep_20261013/. Public PR #14 merged into pjg93-222/Melange main as 5f68fa2e5 (merge commit); receipts C:\Users\pgoff\ReleasePublish\PUBLISH_RECEIPT.md sections Z, AC, AE, AG, AH, AI. Earlier folders went through PR #12 (c597d22aa).
  - NOT PUBLISHED: fec/research is committed locally only; the export filter excludes it and its 6 dependent tests.
  - OPEN for Paul: (1) hash-bound research challengers files edited by 066a12c20 (revert or accept); (2) 3 gate receipts pin old fec\audit_*.py paths (re-mint); (3) 3 audit files held uncommitted for hash pins; (4) Johnson/Scalise review provenance and the WJ shorter-capture rule; (5) paid-API items: f2, legacy classifiers, classify_bill_positions; (6) forecast_ledger L395 freeze write.
  - LOOSE ENDS: 2 uncommitted tests from another session in fec/tests/legislation/test_audit_legfix5_artifact_gaps.py; 18 speech tests need live data absent from the export; 2 speech tests import an unpublished audits/ package; run_chamber_degrees blocked by the sealed v6 run.
  - TOOL: .claude/workflows/folder-debug.js is the reusable pipeline; hold list now covers files bound to sealed manifests; land step commits matching test updates.
  2026-10-20 (Claude, E2E lane started; source: the orchestrator's brief for this brain update and Paul's 2026-10-20 chat instruction; NOT re-observed by the lane that wrote this block, and the Last verified stamp is deliberately not advanced for it):
  - E2E LANE STARTED 2026-10-20 (Claude session local_6ad43510-da3d-4de6-80f2-7220aae7d617; branch fix/e2e-20261020; decisions [[ledger/melange-systems-brain/D-253|D-253]] to [[ledger/melange-systems-brain/D-266|D-266]] record the lane's implementation choices, decided by Claude under delegated authority, not Paul rulings). Goal per Paul: resolve every open item and run an end-to-end test with the rank delta observed.
  - [[ledger/melange-systems-brain/D-211|D-211]] supersedes this file's older N19 'paid admissions not authorized' note: paid admissions are authorized within the [[ledger/melange-systems-brain/D-211|D-211]] budget (48 paid calls per day).
  - [[ledger/melange-systems-brain/D-122|D-122]]'s reversal condition is met: admissions PASSed at 2026-10-20T00:42Z (from the brief). Lane F reverts sentinel_admissions.py max_age_days from 10 to 8; not yet done at the time of this note.
  SMALL TOOLING LANE 2026-10-20 (Claude, small tooling lane; source: the orchestrator's brief, with the SHAs, PR #20 state, cloud-init size and lock file re-observed read-only; see Verified by):
  - cloud-init.yaml 32,537 -> 31,580 bytes (comments only; payload byte-identical); the size test keeps >= 512 bytes under the 32 KiB user-data cap (Melange cfde79c9e, 17ad4ebb0).
  - brainctl Last-verified parser fixed (Project Brain d9100b8, 026ca95); see the header NOTE.
  - brainlink hook stop records failure when a stage fails (exit > 1 or partial/failed status) instead of "ok"; check exit 1 (drift found) is not a stage failure; lock contention emits blocked (Project Brain 618dce9, 0892bff; [[ledger/melange-systems-brain/D-267|D-267]]). The Project Brain repo has only the local mirror remote.
  - fec/compute_engine.py bounded subprocess is already re-landed in 83b8af25a (2026-10-16) with tests; audits/fec_sweep_20261013/fec_root.md:22-24 "Blocked" is stale.
  - Published: pjg93-222/Melange PR #20 (publish commit 406569c12 on publish/small-tooling-20261020), OPEN, not merged; local main = ed64156ff. Not yet run in the containerized app.
  - INCIDENT: the RE-2 kernel run (run_tests.py from a worktree with MONEYBALL_ROOT = live root) retrained and rewrote the live stance model via fec/tests/stance/test_speech_channel.py:105-108 -> speech_stance_stack.main() -> load_or_train(); weights byte-identical, only the stored fingerprint changed (input_fingerprint hashes the code-root registry path). The two tracked files were restored to HEAD (sha 792054d2). Rule until fixed: do not run the full kernel with MONEYBALL_ROOT pointing at the live root. The fix is a follow-up (give the test a temp root; make the fingerprint location-independent).
  - .pipeline_run.lock (pid 20992, 2026-10-19 16:56) looks stale; the process is gone.
  [[ledger/melange-systems-brain/D-157|D-157]] HELD ITEMS LANE 2026-10-20 (Claude, [[ledger/melange-systems-brain/D-157|D-157]] held items lane; source: the orchestrator's brief, with the branch tip, merge ancestry, local main and PR #25 state re-observed read-only; see Verified by; [[ledger/melange-systems-brain/D-268|D-268]]):
  - DONE IN SOURCE, published as pjg93-222/Melange PR #25 (https://github.com/pjg93-222/Melange/pull/25), OPEN, CodeRabbit-clean with all 6 threads resolved (from the brief). Private branch d157-residual-20261020, tip 08a383da4, includes a merge of local main 77af80941. Local main fast-forward is PENDING: a live refresh_congress_pipeline run was in progress, so main was not fast-forwarded ([[ledger/melange-systems-brain/D-266|D-266]] shape: only while no refresh or chain is running).
  - Items: F-13 (verify export retired); F-14 (press and media pillar disclosure on the desk press panel and the dashboard note); F-15 (frontier leverage mode forwarded plus caption); F-17 (sna_layout.py moved to fec/attic); F-18 (dashboard re-click deselects); F-20 (champions_v2 and industry_tiers take crowns from the active rank_honors generation, fail closed; boards record honors_generation); F-22 (IV_NAME_MATCH dial default full, refusal ledger data/members/interview_surname_refusals.ndjson; the census is a bound, 7,430 exposure-flagged rows). F-3 census guard is done (7d57fb209); [[ledger/melange-systems-brain/D-157|D-157]]'s 'in flight' wording is stale.
  - Rank effect none (Opus review found no rank producer reading the changed outputs). NOT LANDED IN THE APP: needs a chain run plus app rebuild and restart (Paul).
  - Implementation choices ([[ledger/melange-systems-brain/D-268|D-268]], not Paul rulings): industry_tiers' CU board tier and position now also come from the active generation (same values, single crown source); IV_NAME_MATCH=full means turns refused on fetched pages are recoverable only through the refusal ledger plus an iv_fetch_log reset.
  - WAITING FOR PAUL (Melange audits/d157_residual_20261020/PAUL_DECISIONS.md): landing the display items in the app plus the rank_delta and audit_full acceptance after that chain run; F-20's manual --from resume needs a fresh build_rank_honors --publish; F-22 re-adjudication of flagged existing rows; F-12, F-16, F-19 (model, data and live-audit runs); F-10 (the label-file conflict is Paul's); F-21 no change (known sensitivity); CodeRabbit's industry_tiers realized_results_v1 shadow-branch finding (a tier/board question); whether the F-14 dashboard note should also show on phones or per issue (display design).

  E2E LANE STATUS 2026-10-22 18:15 (Claude, E2E lane record; source: the orchestrator's brief of 2026-10-22, RANK_DELTA_REPORT.md and desk_check_attempt9/README.txt under audits/e2e_20261020, run dir audits/congress_pipeline/20261022T180457Z, decisions [[ledger/melange-systems-brain/D-287|D-287]] to [[ledger/melange-systems-brain/D-289|D-289]] and [[ledger/melange-systems-brain/DE-079|DE-079]]; times CDT; NOT re-observed by the lane that wrote this block; where this block and the 02:35 block below disagree, this block is newer):
  - GOAL (Paul): one proven full run, congress.gov to the Melange dashboard, with the rank delta observed and every new item listed. STATUS: PROVEN for the chain and the delta (committed at 535, delta attributed); NOT PROVEN as a clean PASS receipt (terminal audit_full.py failed, so the receipt says FAILED and there is no rank_changes.json).
  - Attempt 9: 10-22 13:04:57, pid 35200, live main head f45c49c55, stub classifier + --admission-limit 1, one-run MELANGE_CHAIN_TXN_MIN_FREE_GB=22, run dir 20261022T180457Z. Congress steps PASS (admissions PASS 25 bills, 140 memberships, 0 calls). The chain ran ALL steps and the transaction COMMITTED (moneyball-pipeline-20261022T182349, 1326 files). Only audit_full.py failed: 540 passed, 38 FAILED (9 gated, 6 expected at 535, 23 new). 533 restore point: C:\melange-data\chain_txn\20261022T182358771683Z-pipeline-20261022T182349 ([[ledger/melange-systems-brain/D-287|D-287]]).
  - WHAT IS LIVE: the 535 vintage. ranks_python.json sha d1717098... (535 members), dashboard_data.json 3c5561e5..., member_desk_bundle.json a56e3380...; staffer_live/approved consistent (65 people-days, catalog 535). Desk check (audits/e2e_20261020/desk_check_attempt9): 535 of 535 members, freshness 2026-10-22T15:00:57, arrivals render Insufficient evidence. Decision: keep LIVE on the 535 vintage pending Paul.
  - RANK DELTA (RANK_DELTA_REPORT.md, replay EXACT 535/535; [[ledger/melange-systems-brain/D-288|D-288]]): 460 rank movers = 349 bill/vote/press/media inflow + 109 roster + 2 tool-flagged S1 (Bilirakis 253 to 227, Van Orden 351 to 327, H.R.4167 cosponsor joins 2026-10-13) adjudicated by the overseer as inflow, UNEXPLAINED 0 (Paul may overrule). Money ATTRIBUTED off the rank path, zero movers; competitiveness ATTRIBUTED, zero continuing change. New items: 11 bills (484 to 495), 75 (bill, member, role) rows (11 sponsorships, 64 cosponsorships), admitted 14 to 25, memberships 45 to 140, votes 0, press_stance 2668 to 2746, speech 317 to 400, hearing 808 to 809. Arrivals Wahab #523, D. Graham #528, Blair #470; Lindsey Graham out (was #461). Young Kim 32 to 23, Titus 89 to 85.
  - TOOL FIX: attribute.py wb_extract now reads workbook row geometry dynamically (the hard-coded 533 rows produced 456 false S1); poisoned cache deleted; selftest T10 added. audit_full still has latent 533 pins (:1454 roster_n==533) ([[ledger/melange-systems-brain/DE-079|DE-079]]).
  - LANDED on live main today: 064190e9f (rmtree), 14f26ce2f (merge of 77731ea21: audit_full tolerates roster arrivals/departed in six checks, B1 dial by label, manifest excludes coalition_pricing). Not pushed.
  - DISK ([[ledger/melange-systems-brain/D-289|D-289]]): under Paul's 12:00 'Clear the space necessary' this lane freed about 8.4 GB (duplicate [private — see knowledge vault] CSV + repack zip 2 GB, rolled-back chain_txn_archive 20261021T044021 1.38 GB, 31 old session scratch folders about 5 GB); attrib +U on audits/legfix5 freed nothing (reverse: attrib -U /S /D). The Codex module-data lane released about 30 GB and the deployment-readiness session 5.3 GB on their own.
  - AUDIT RESIDUALS (23 new failures, pre-tolerance list): Young Kim [[ledger/melange-systems-brain/D-031|D-031]] seat; Openness ONE_PANEL to EXTERNAL_GOLD_ANCHORED promotion (unregistered); B1 dial shift (fixed); longform artifact 47 d > 21 d; speech profiles empty (longform turn-features bound to the re-downloaded Scalise WAV, needs a longform re-bind); personal-texture precision 6244 < 6545; collection_intake_receipt REJECTED; 6 A2b repo.* staleness; 7 A2b mdata.* from the 10-17 audio/bicam deletions (data loss: axe 54 to 3, youtube 104 to 8, npr 678 to 201, wj 1243 to 735, bicam 46 GB to 6.8 GB). Kernel run_tests.py and standalone audit_full.py on the live vintage were running at the time of this record; RESULTS NOT YET RECORDED.
  - DAILY JOBS: MoneyballCongressRefresh (first use, Interactive logon); MoneyballDailyRefreshRetry DISABLED; MoneyballWeeklyRefresh Sundays 06:00 (10-18 was HARD_FAILURE, press engine feed); MelangeRefreshTick not registered (gated on media). Paul, relayed via the deployment-readiness session: 'It should be fully functional'.
  - DECISIONS PENDING (Paul): 1 keep or restore the 535 vintage; 2 Young Kim [[ledger/melange-systems-brain/D-031|D-031]] seat; 3 Openness promotion; 4 data-loss re-baseline; 5 classifier quota option a/b/c; 6 [[ledger/melange-systems-brain/DE-078|DE-078]] approved/ inside the transaction; 7 disk discipline; 8 longform re-bind; then the carried items in Desktop Melange-Handoff-2026-10-22.md. Attempt 10 only after rulings.

  E2E LANE STATUS 2026-10-22 02:35 (Claude, E2E lane record; source: the orchestrator's brief of 2026-10-22, run dir audits/congress_pipeline/20261022T051230Z, Paul's chat as reported there, decisions [[ledger/melange-systems-brain/D-285|D-285]] and [[ledger/melange-systems-brain/D-286|D-286]] and [[ledger/melange-systems-brain/DE-078|DE-078]]; times CDT; where this block and the 2026-10-21 21:15 block below disagree, this block is newer):
  - GOAL (Paul): one proven full run, congress.gov to the Melange dashboard, with the rank delta observed and every new item listed. STATUS: STILL NOT PROVEN. ranks_python.json, dashboard_data.json and member_desk_bundle.json are still the 2026-10-11 versions; the attempt 8 chain transaction rolled back to the before-image.
  - Attempt 8: 10-22 00:12:30, pid 88400, live main head 881c642dd, env MELANGE_CLASSIFIER_COMMAND=<python.exe> (stub) and MELANGE_CHAIN_TXN_MIN_FREE_GB=28 for this one run, run dir 20261022T051230Z. Launched after Paul wrote "Get it done" at 00:06 while the classifier CLI still returned 429 ([[ledger/melange-systems-brain/D-285|D-285]]; earlier that evening his explicit answer had been to relaunch after the reset). Congress steps PASS (admissions PASS: 25 include reused, 1 deferred 119:hr:8839 SourceUnavailable, 0 classifier calls; sentinel_admissions.json now d930fa1d..., same 25 bills and 140 memberships, processed 26). The chain ran 65 of 68 slice steps in 97 min: compute_pillars 535, efficiency_layers 532 (R1 worked). Tolerated failures: build_member_longform_turn_features --if-current (audio input_hash_mismatch, WAVs rewritten 10-20), build_member_narrative_ledger (follows), regenerate_member_profiles --activate (535 roster mismatch, expected). FAILED at CHAIN[77] sync_live_dashboard_alias.py -> build_clean_workspace.py:619 people_days() shutil.rmtree PermissionError WinError 5 on the OneDrive read-only folder fec/surfaces/staffer_live/approved/data/people-days. Chain transaction ROLLED_BACK: restored 92, removed 13, 0 unrestorable; the three rank artifacts are back to the before-image; money binding intact ([[ledger/melange-systems-brain/D-286|D-286]], [[ledger/melange-systems-brain/DE-078|DE-078]]).
  - FIX landed on live main 064190e9f (local only, not pushed): fec/surfaces/build_clean_workspace.py remove_tree with a chmod-and-retry onexc; test in fec/tests/surfaces/test_clean_workspace_loading.py (9 passed).
  - OPEN DESIGN GAP: fec/surfaces/staffer_live/approved/ is written outside the chain transaction. It now holds attempt 8's partial 535 build (catalog 535, arrivals ranked 523/528/470, people-days empty) while clean_workspace_current() still says current. Attempt 9's CHAIN[77] rewrites it; until then do not serve or publish from it.
  - NOT EXERCISED after CHAIN[77]: make_email_package.py (tolerant), audit_source_to_dashboard.py with check_alias=True, audit_full.py (expected failure :1451 interview_antagonism 322; latent pin :1457).
  - DISK BLOCK: C: free 32.7 GB at launch, 16.8 GB at 02:20, 15.7 GB at 02:32, falling about 0.18 GB/min. Growth is C:\Users\pgoff\Documents\Codex\2026-10-21\hey-x20\work (19.6 GB; module-data-publication .bin readback copies, observations.ndjson 1.43 GB) plus ~/.codex/thread_history_1.sqlite 1.5 GB; about 10 GB of the drop is unlocated. Nothing safely deletable was found; the Codex lane is Paul's. Attempt 9 is BLOCKED until C: free is at least 33 GB. A 16 h disk waiter is armed. Both peer sessions (local_12f9e41d, local_8054da4a) were released from the hold and told.
  - NEXT: attempt 9 via <prep>\launch_attempt9.ps1 (in e2e-prep) once free >= 33 GB. Use the real classifier if the CLI answers, else the stub shape ([[ledger/melange-systems-brain/D-285|D-285]] reversal: quota restored, next run uses the real classifier). The plan's retry cap (2 after attempt 6) is exceeded by attempt 8; Paul has not been recorded as extending it. Recipe and Paul's list: Desktop Melange-Handoff-2026-10-22.md.
  - FOR PAUL'S LIST (new): Codex hey-x20 lane disk use; staffer_live/approved outside the chain transaction; make_member_desk.py:2627-2628 maps None invested to 0 for the 3 arrivals (display-only eff_value; an Opus note, a possible no-neutral-default conflict, not examined further here).

  E2E LANE STATUS 2026-10-21 21:15 (Claude, E2E lane record; source: the orchestrator's brief, the handoff 2026-10-21 12:15, the plan c-users-pgoff-onedrive-desktop-melange-stateful-wand, git log 204795023..ad1b23621, audits/e2e_20261020 (launch.txt and the attempt logs), receipts under audits/congress_pipeline, and the sweep adjudication in side-session-notes/local_6ad43510/e2e-prep/sweep_attempt6_pre; ruling attributions are Paul's chat as reported by the orchestrator, decisions [[ledger/melange-systems-brain/D-275|D-275]] to [[ledger/melange-systems-brain/D-284|D-284]] and [[ledger/melange-systems-brain/DE-073|DE-073]] to [[ledger/melange-systems-brain/DE-077|DE-077]]; where this block and the 2026-10-20 23:00 block below disagree, this block is newer):
  - GOAL (Paul): one proven full run, congress.gov to the Melange dashboard, with the rank delta observed and every new item listed. STATUS: NOT PROVEN. ranks_python.json, dashboard_data.json and member_desk_bundle.json are still the 2026-10-11 versions; every failed run rolled back.
  - Attempts (CDT; head at launch):
    - 3: 10-20 23:00 (chain 10-21 01:00 to 01:52), 77af80941. FAIL at the competitiveness provenance check (Cook PVI CSV flipped CRLF to LF on 10-17); partial rollback. Bytes restored (734cd7b24, 24f947a7c), .gitattributes -text.
    - 4: 10-21 09:17, 21770411c. FAIL at make_member_desk.py:976 _district_briefs_for (missing=3 extras=1, briefs keyed to 533); rollback clean. Arrivals withheld, departed dropped.
    - 5: 10-21 10:57, 204795023. FAIL at build_primacy_surfaces --engine-inputs-only, tier_util.py:549, no primacy factor for Aisha Wahab; rollback clean. Circular factor contract ([[ledger/melange-systems-brain/DE-074|DE-074]]); F1 withhold (e347e0bb6, e47a232fe). Run dir 20261021T155707Z (keep).
    - 6: 10-21 17:58:53, pid 89668, 14c082633. FAIL before any chain step: all 7 congress steps PASS at 535 (admissions PASS, 25 bills, 140 memberships, 44 paid calls), then the chain refused to start at its 30 GB disk floor (C: 14.3 GB free, before-image 1.38 GB); wrapper rollback restored. Cause: C: fell from 49.5 to 13 GB in 3 h (18.3 GB non-sparse worktree Melange-wt\port-invite-client-20261021 from the deployment-readiness session, 10.5 GB of Codex Terrier test-set zips under Documents\Codex\2026-10-21\hey-x20\work, about 3 GB speech-lane output); the deployment session removed its worktree and a 3.6 GB build folder (about 22 GB back). Fix ad1b23621: chain_transaction.preflight, so refresh_congress_pipeline.py checks the floor at launch (165 tests green). Run dir 20261021T225854Z ([[ledger/melange-systems-brain/D-283|D-283]], [[ledger/melange-systems-brain/DE-076|DE-076]]).
    - 7: 10-21 20:22:33, pid 11112, ad1b23621, env MELANGE_CHAIN_TXN_MIN_FREE_GB=26 for this one run. Calibration, roster (NO_CHANGE), discovery PASS; admissions FAILED after 66 s on 119:hr:8918 CLASSIFIER_QUOTA_EXHAUSTED (HTTP 429, weekly limit, resets 6pm America/Chicago). A quota stop is FAIL by design (refresh_sentinel_admissions.py:1149-1150; the [[ledger/melange-systems-brain/D-251|D-251]] timeout deferral covers non-quota only; pinned by test_sentinel_classifier_budget.py:264). Rollback verified, live tree consistent, attempt 6's PASS admissions generation (sha cd1e5737...) remains installed, 10-18 money binding intact (congestion sha 6c2efab5...). No code fix. Run dir 20261022T012234Z ([[ledger/melange-systems-brain/D-284|D-284]], [[ledger/melange-systems-brain/DE-077|DE-077]]).
  - NEXT: relaunch (attempt 8) after the classifier weekly quota resets (inferred from the message: 2026-10-22 18:00 CDT), without the 26 GB override unless disk is still tight, needing Paul's chat OK for the exact shape. The plan allowed at most 2 more attempts after attempt 6 failed; attempt 7 was the first (environmental cause) and attempt 8 would be the last, so Paul should confirm whether the cap still stands. Recipe: Desktop Melange-Handoff-2026-10-22.md.
  - NOT USED, needs Paul (open question below): a zero-paid-call route. MELANGE_CLASSIFIER_COMMAND set to a program that exits non-zero without quota text, with refresh_congress_pipeline.py --admission-limit 1; the one new key defers as classifier unavailable, admissions PASS, the generation installs. It circumvents the [[ledger/melange-systems-brain/D-251|D-251]] quota-versus-unavailable distinction. Checked and not available: --admission-limit 0 (argparse rejects), MELANGE_SENTINEL_CALL_BUDGET=0 (not allowed), --smoke (pays through the media reference step).
  - QUIET WINDOW: sessions local_12f9e41d (deployment readiness) and local_8054da4a (system debugging) held live-tree writes from about 17:55 to about 21:10 CDT and were released with chain done. A relaunch needs a fresh window.
  - Landed on live main 2026-10-21 (local only; origin is PUBLIC and was not pushed from the repo): roster 533 to 535 ([[ledger/melange-systems-brain/D-275|D-275]]), competitiveness rebuilt and Cook PVI bytes restored ([[ledger/melange-systems-brain/D-276|D-276]]), social corpus corrected ([[ledger/melange-systems-brain/D-277|D-277]]), F1 primacy withhold e347e0bb6 and e47a232fe ([[ledger/melange-systems-brain/D-278|D-278]]), R1 efficiency coverage withhold ac54ed93d ([[ledger/melange-systems-brain/D-279|D-279]]), R2 money drift tolerance 76dd6e6df and 10b2490cd with the binding test 29fef00c5 and merge dece91a78 ([[ledger/melange-systems-brain/D-280|D-280]]), E3 audit tolerance 5947c5574 ([[ledger/melange-systems-brain/D-281|D-281]]), launch preflight ad1b23621. The uncommitted Codex make_member_desk.py is set aside ([[ledger/melange-systems-brain/D-282|D-282]]). "R1" in the sweep adjudication means the efficiency coverage blocker; the [[ledger/melange-systems-brain/D-251|D-251]] admissions timeout ruling is a different R1.
  - Inputs applied before the next launch: 2026-10-18 FEC money refresh APPLIED at 535 (Paul; standalone about 17:5x CDT on 10-21 under the pipeline lock): 24 mapping ids added, 3 arrivals withheld at zero money, 1 departed dropped, 535 rows with 485 changed, receipts bind, backups in audits/e2e_20261020/before_attempt6_money/. Known gap: about 83k dollars across 22 ids predates their mapping. The Codex desk copy set aside with Paul's OK.
  - Residual first-run risks (the chain has never run past the pipeline step at 535, so F1, R1 and R2 are still unexercised): ENGINE[3] after tier_util.py:2746, ENGINE[4] and ENGINE[5]; build_rank_honors.py:118 needs every arrival seated; b5_gold_multitrait display weights shift at 535 (O becomes EXTERNAL_GOLD_ANCHORED, A gains cross_party_cooperation 0.3; display only). The static sweep adjudicated 579 unexercised-surface rows as 551 OK, 27 expected-withhold, 1 RAISE (R1); R2 was found outside the sweep.
  - Expected at 535 (classify as expected, not regressions): narrative-ledger cooperation coverage frozen 300/301 and profiles frozen 529 ratified plus 4 pending (speech summaries and v2/v3 briefs WITHHELD, desk falls back to v2); test_descriptive_profiles 4 failures; test_chain_parity 1 pre-existing citation-drift failure; audit_postrefresh_behavior_stance_semantics, run_legislation_presync_audit.py:735, greenlit primacy fixtures and sealed legfix5 receipts pinned to 533; the final desk primacy board seats the 3 arrivals at the zero-act baseline (can shift others' tierrank by insertion; roster-driven).
  - After a PASS: attribute.py --run-dir (never while the pipeline is live) and audits/e2e_20261020/RANK_DELTA_REPORT.md with input classes roster 533 to 535, competitiveness rebuild, social corpus correction, money refresh at 535, bill/vote inflow (anything else is an S1 finding) and a NEW ITEMS section; desk check at Moneyball.html (subtitle Members of Congress, N=535) with a screenshot of three movers; run_tests.py and audit_full.py (known failures only); publish_dashboard.py. Then tell the two holding sessions chain done.
  - Public repo state (read for the brief, not re-observed by this record): PRs #18, #25, #26, #29 open (other lanes); 9 CodeRabbit threads all resolved; #32 to #39 merged 2026-10-21 (desktop and Terrier). Press (fix/e2e-press-20261020 at 204e139fc, [[ledger/melange-systems-brain/D-271|D-271]]) and letters (fix/e2e-letters-20261020 at d9d094402, [[ledger/melange-systems-brain/D-272|D-272]]) branches stay held until a PASS, then go through C:\Users\pgoff\ReleasePublish\melange (never push from the repo). MelangeRefreshTick only after media passes ([[ledger/melange-systems-brain/D-265|D-265]], [[ledger/melange-systems-brain/D-273|D-273]]).
  - Ownerless work from the deleted sessions ([[ledger/melange-systems-brain/DE-073|DE-073]]): re-freeze of 533 baselines, 3 new district briefs, Lindsey Graham brief to departed history, basis CSV to 535, [[ledger/melange-systems-brain/D-157|D-157]] PR 25 fast-forward, Axe and podcast media-gate rulings. The sweep table and ADJUDICATION still live only in a scratch notes folder; archive them into audits/e2e_20261020/sweep_attempt6/.
  - Constraints in force: no live-tree writes during a chain; one heavy job on the box; C: was 34 GB free when this block was written, against a 30 GB chain floor and 32 GB relaunch precondition; 376 dirty files in the live tree at 18:44 (49 tracked-modified plus 327 untracked), with a patch only for the 49 (before_attempt6_snapshot/uncommitted.patch); eight commits to ops/desktop/Terrier packaging reached live main on 10-21 (bdf6e0c92 to 14c082633) from an unidentified committer, all authored as Paul Goff; workbook_publications.json was hand-repaired by a prior lane (hash 1b9854fe vs 0ddb4059, copy in C:\melange-data\e2e_20261021_repairs\) with no brain record; 7 stale .git\worktrees entries (git worktree prune --dry-run lists them; not pruned).

  E2E LANE STATUS 2026-10-20 23:00 (Claude, E2E lane, session local_6ad43510-da3d-4de6-80f2-7220aae7d617; source: the orchestrator's brief for this brain update; NOT re-observed by the lane that wrote this block, and the Last verified stamp is deliberately not advanced for it; decisions [[ledger/melange-systems-brain/D-269|D-269]] to [[ledger/melange-systems-brain/D-273|D-273]] and [[ledger/melange-systems-brain/DE-071|DE-071]], all decided by Claude under delegated authority, NOT Paul rulings):
  - Fixes landed on live main: 8a641d9ab, then 77af80941. pjg93-222/Melange PR #22 merged (f39ca5a40).
  - E2E attempt 1 (20261020T200207Z) FAILED at admissions on bill 119:hr:10082; fixed ([[ledger/melange-systems-brain/D-269|D-269]]).
  - E2E attempt 2 (20261020T224638Z): admissions PASS (20 admitted, was 14; 61 memberships, was 45; GovInfo 377 sections; 12 source-switch reuses, [[ledger/melange-systems-brain/D-270|D-270]]); votes PASS; media: all 12 collectors PASS, press PARTIAL (non-fatal), all_intake FAIL on deleted audio ([[ledger/melange-systems-brain/D-273|D-273]], [[ledger/melange-systems-brain/DE-071|DE-071]]); rollback verified.
  - The daily cap for 2026-10-20 is used.
  - WAITING FOR PAUL: a non-media attempt 3, and the media blocker (restore phases P7 axe and P8 houselive in C:/melange-data/longform_restore_20261020/restore_audio.py).
  - Press branch fix/e2e-press-20261020 @ 204e139fc and letters branch fix/e2e-letters-20261020 @ d9d094402 are ready, NOT landed ([[ledger/melange-systems-brain/D-271|D-271]], [[ledger/melange-systems-brain/D-272|D-272]]).

  DESKTOP PASSWORD-ONCE LANE 2026-10-21 (Claude, desktop release lane; source: the orchestrator's brief for this brain update, NOT re-observed by the lane that wrote this block, and the Last verified stamp is deliberately not advanced for it; [[ledger/melange-systems-brain/D-274|D-274]] and [[ledger/melange-systems-brain/DE-072|DE-072]], decided by Claude under Paul's request, NOT separate Paul rulings):
  - Paul asked (2026-10-21) to remove the Terrier owner password and make Melange and Mentat a one-time verification per computer: "Finish it up, Fable oversees."
  - Melange PR #27 merged into origin/main as 9c1c94890: a device-trust record (access-device credential scope) bound to grantId plus deviceId; the password is asked once per computer; Lock workspace forgets the computer. CodeRabbit's one valid finding (a revoked-approval race in lock) was fixed in 1eca83442. Independent security review: safe to ship; remote clients still need approval; server side unchanged.
  - Desktop release 1.0.10 (ledger sequence 6) published 2026-10-21 for Melange (target 9c1c94890) and Mentat (target d3c058fca), client commit 59fc562cb; the runtime bootstrap helper native_credentials.py was refreshed; inject.cjs precedent; signed and verified. Release folder Documents\Desktop-Installers-2026-10-21, runbook RUNBOOK-1.0.10.md. Note: 1.0.8 and 1.0.9 had already shipped on 2026-10-20.
  - TERRIER HELD at 1.0.9. Geo PR #2 (505c2d7a) merged the passwordless-owner change into claude/walk-list, but the shipped Terrier runtime's server code is the Geo main lineage (78c45b710 = desktop-preview-v1.0.7; main tip ff7dee3), which diverged from walk-list (merge-base a290240; main 35 ahead, walk-list 2 ahead). walk-list lacks desktop_owner.py; main's lineage uses the D2 owner-password-store design with bootstrap desktop_backend.py from Melange branch tooling/terrier-1.0.6 (blob cf75ec3e, not on main). ops/release_config.json says terrier_ref claude/walk-list while releases record Geo main: three Terrier source designators are in use ([[ledger/melange-systems-brain/DE-072|DE-072]]).
  - Terrier 1.0.9 owner launch is likely broken: the shipped bootstrap desktop_backend.py:392-393 refuses --legacy-owner without --owner-root, and origin/main runtime.cjs:53 passes only --legacy-owner. Paul's local-main commit cc5f286b9 (2026-10-20 23:01) fixes it, and an unpublished signed Terrier 1.0.10 built from it sits in Documents\Desktop-Installers-2026-10-20\dist-1.0.10\terrier (its latest.yml hash does not match the signed exe). cc5f286b9 is not on origin.
  - Not applied: CodeRabbit's design suggestion to durably revoke the device record when Lock's credential delete fails (declined for now; adopting it is Paul's call).

  AGENT ROSTER LANE (Fable overseer / Opus manager / Sonnet coder) 2026-10-21 20:50 CDT (Claude, record taken from the orchestrator brief relayed by the chain session; the cited commits, paths and ids are as reported there and NOT re-observed by this record; where this block and the E2E LANE STATUS 2026-10-21 21:15 block above disagree, this block is newer):
  - Roster commits 6390bc611 and 168c4fefa on local main, NOT pushed: audits/agent_roster_20261021/ (STATE_2026-10-21.md, REMAINING_ITEMS.md, AGENT_ROSTER.md, PAUL_DECISION_PACKET.md with 119 held sweep items in ten themes) and .claude/agents/{overseer,manager,coder}.md (force-added past the .claude/* ignore). Source: brief; commit ids.
  - Desktop HANDOFF.md and HANDOFF_wave1_refresh_resilience_2026-10-21.md are marked superseded. Corrections recorded there: the sweep closed 2026-10-20; the forecast_ledger cosponsor fix is 76e2a857b; the MS NOW cursor, the WJ retry and the admissions hold all landed; PR #25 is OPEN, not merged; PR #23 is not on local main; local main and origin/main share no merge-base. Source: brief.
  - Daily congress_pipeline: five FAILED runs on 2026-10-20 and 2026-10-21 were each diagnosed and fixed by the E2E lane (2ce09188d; 734cd7b24 + 24f947a7c; 256c60c21; e347e0bb6 + e47a232fe). Media is blocked by the all_intake FAIL per [[ledger/melange-systems-brain/D-273|D-273]] until the P7/P8 audio restore. Source: brief; commit ids.
  - Sixth cause confirmed: the uncommitted briefs-v3 copy of make_member_desk.py (0bedf256c) wrote tier=None, and fec/lobbying/champions_v2.py:675-677 would halt on it. Paul ruled it set aside under audits/e2e_20261020/before_attempt6/set_aside/. Source: brief; champions_v2.py:675-677.
  - Attempt 6 (run 20261021T225854Z): the 7 congress steps PASS at 535, then the chain refused at its 30 GB disk floor. Attempt 7 (run 20261022T012234Z): FAILED at admissions on the classifier weekly 429 quota, by design (refresh_sentinel_admissions.py:1149-1150). Next launch is after 2026-10-22 18:00 CDT. Live main is ad1b23621. Source: brief; run ids; refresh_sentinel_admissions.py:1149-1150.
  - Terrier: PR [private — see knowledge vault]#13 is open (feat/coalition-profile, 9 commits, CodeRabbit 1 thread resolved). Rulings for Paul: thresholds at tools/field_labels.py:105-107 (2/3, 1/3, 2/3); keep all U/minor-party regardless of score; OR-03 voter file purchase (55 of 59 Happy Valley streets lie outside OR-05). Source: brief; tools/field_labels.py:105-107.
  - Open for Paul: brain contradictions [[ledger/melange-systems-brain/D-251|D-251]] systemic-guard text vs the STATE refined guard, and [[ledger/melange-systems-brain/D-253|D-253]] ACTIVE vs STATE "open for Paul"; the three wave-1 decisions in audits/wave1_20261019/PAUL_DECISIONS.md; the E2E lane's hand-repair of workbook_publications.json is not recorded in the brain. Source: brief; audits/wave1_20261019/PAUL_DECISIONS.md.
  - Next action: Paul rules on the decision packet themes and the Terrier thresholds; the E2E lane relaunches after the quota reset; the briefs-v3 lane lands 0bedf256c properly with a champions_v2-tolerant tier. Source: brief.

## Open questions
- OPEN (Paul; added 2026-10-21, [[ledger/melange-systems-brain/D-284|D-284]], [[ledger/melange-systems-brain/DE-077|DE-077]]): the stub-classifier shape. The classifier weekly quota blocks admissions until about 2026-10-22 18:00 CDT. A zero-paid-call route exists (MELANGE_CLASSIFIER_COMMAND set to a program that exits non-zero without quota text, plus refresh_congress_pipeline.py --admission-limit 1, so the one new key defers as classifier unavailable) but it circumvents the [[ledger/melange-systems-brain/D-251|D-251]] quota-versus-unavailable distinction. Rule: wait for the reset, allow the stub for E2E only, or change how a quota stop is treated. Also needed: whether the one-run MELANGE_CHAIN_TXN_MIN_FREE_GB=26 override used for attempt 7 was acceptable, and confirmation of the attempt cap.
- OPEN (Paul; added 2026-10-21, [[ledger/melange-systems-brain/DE-076|DE-076]]): disk deletions. Relaunch wants 32 GB free on C: (chain floor 30 GB). Candidates that need his word: Documents\Codex\...\mentat-audit (35 GB), Terrier cu-geography (never cu-geography-v3), C:\ReleaseAcceptance, the installers folders, the 10.5 GB Codex Terrier test-set zips under Documents\Codex\2026-10-21\hey-x20\work. Sparse-excluding audits/legfix5 found nothing safely reclaimable (only .codex\worktrees\49f9, locked and dirty, and .claude\worktrees\elastic-chatelet-663a31, dirty, have it checked out, 3.5 GB each).
- OPEN (Paul; added 2026-10-21, [[ledger/melange-systems-brain/D-274|D-274]], [[ledger/melange-systems-brain/DE-072|DE-072]]): which Terrier code lineage is canonical, Geo main (the D2 owner-password-store design the releases ship from) or claude/walk-list? The answer lets the passwordless-owner change be re-applied on the shipped lineage and Terrier 1.0.10 be built with cc5f286b9 (until then Terrier stays at 1.0.9, whose owner launch is likely broken).
- The ENTIRE glassbox runtime is UNTRACKED. common.ps1, metaloop.ps1, flow.ps1, launch.ps1, health.ps1,
  mirror.ps1, console.ps1, dashboard.ps1, fanout.ps1 and agentwatch.ps1 exist only at
  C:\Users\pgoff\.claude\glassbox with no git history and no backup beyond *.bak-* files beside them.
  Everything built 2026-08-14 sits in exactly one place on one disk. OPEN: whether to version-control
  it and where - it is user-scope tooling used across projects, so the Melange repo may be the wrong home.
- The hook mirror is dead and undiagnosed ([[ledger/melange-systems-brain/DE-005|DE-005]]). The override routes around it; it does not fix it.
  A sentinel-gated payload capture sits inert in mirror.ps1, re-armed by creating glassbox\hookcap\ARM.
- Change-report review (2026-08-14, review lane) found two committed defects on the research branch at
  9648ec443. (a) [CLOSED 2026-10-11, decided by Claude under Paul's delegation: correction row appended, Melange 6687e54af; [[ledger/melange-systems-brain/D-161|D-161]]] ~~OPEN, Paul-gated~~: the effectiveness sheet's measurement log has the PR7/MEM_N row and the
  M1/F2/B0-builds row concatenated on ONE physical line (a `||` join — malformed as a markdown table; the
  sheet's own convention says corrections are new rows, never edits). (b) HEALED @3254eced8: the rulings
  row's "section 7" evidence pointer no longer dangles — the appendix is committed. Also: the PDF report's
  "five rows" count is 4 logical rows at the branch tip, and its "four new commits today" undercounts
  (8 brain commits dated 2026-08-14). MEM_N=260 itself was NOT re-derived by the review (triply-recorded
  consistently; ledger fact event exists; re-derivation queued as read-only work).


- (Both BARR escalations RESOLVED 2026-08-14, commit 35fd317db. The presentation limit itself was then
  LIFTED, commit 8447c853c: the double check found the 27-row registry and per-vehicle flags already
  shipped by the responsiveness lane and consumed by fec/engine/responsiveness_layers.py; the honest
  Barr rate is now stated in BARR — 0/7 post-117, 2/13 across 117-119, engine-derived, digest-pinned.
  Deliberately unchanged, recorded in BARR's fifth block: scope.committee on CUTAX (inert + would break
  the artifact digest pin), and in-group-normal vehicles staying in the engine denominator by design.)
- A naive five-family wording lint over `audits/*.md` measured ~88% false positives on 34 adjudicated
  samples. ABSOLUTES is the largest family and the hardest to automate (licensed and defective uses
  share one surface form); CAUSAL VERBS is the cheapest and has a ready-made regression answer key.
  DECIDED on this evidence: built narrow, causal verbs only.
- The L4 rung can assign `cu_primary` weight 1.0 from registry presence alone, without the operative text
  the spec's L3 rung requires. Three acts sit there: `H.R.1|119` (a ten-title reconciliation omnibus with
  ZERO credit-union terms in any collected version) and the TAILOR pair `H.R.3380|119` / `S.427|119`
  (NCUA named as one of five agencies). Blast radius is small — H.R.1 has 1 holder and demoting it moves
  nothing; demoting the TAILOR pair moves 2 members and would return Huizenga to Tier 1. Deliberately NOT
  acted on.
- Cortez Masto's Tier 2 seat is accepted, but her dilution traces to four acts (S.1045|118, S.1790|118,
  S.4050|119 clawback, S.2669|118 DAAMLA) that contain zero credit-union references, carry no ACU position,
  and reached the universe via a `defense_credit_union_issues` keyword match — a military-credit-union
  query returning bank-executive clawback bills. Class audit found no systematic bias ([[ledger/melange-systems-brain/DE-002|DE-002]]); she is an
  individual outlier.
- Young Kim's ratified rank pin still fails on its own terms; accepted, not fixed.
- Two acts in the association-anchor set have NO bill text in the content-addressed store
  (`H.R.1822|119`, `S.838|119`, the ACRE Act pair) — they were classified from BILLSTATUS metadata only.
- OPEN (Paul; forecast/PAC; added 2026-10-05 by the brainlink migration from drift-forecast.md section 3, recorded as a QUESTION, not a fact): drift question 3 [CLOSED 2026-10-07: Paul answered (a) yes (b) keep Senate term (c) the 50/50 (d) publish; see [[ledger/melange-systems-brain/D-113|D-113]]] (source: drift-forecast.md section 3 item 3; C:\melange-data\forecast-redesign-20260930\HANDOFF_FORECAST_2026-10-01_EOD.md:35-48). Are the four 2026-10-01 rebuild decisions still open: (a) adopt the PAC spec despite auto's leave-one-election-out conflict, (b) keep the Senate presidential-year term (Paul's phase ruling) although the evidence says it hurts in every industry, (c) drop the growth term (the evidence) or keep it, (d) publish the candidate; or were they overtaken by attempts 1/2/v5? ~~Nothing from the rebuild is published (phase20261001\refit\REPORT.md:1; the live pointer is still refit-20260930-377f7324-c3f221343515)~~ — superseded 2026-10-08: the cycle-aware rebuild was published 2026-10-07T17:38:26Z (pointer giving-models-current.json -> bundle d516dba6…, refit-20261007-d861bf29-79211caa154e; [[ledger/melange-systems-brain/D-113|D-113]]) and is live on 8806 (source: the pointer file, read 2026-10-08; CHANGES.md entry 3a); see [[ledger/melange-systems-brain/D-092|D-092]].
- OPEN (Paul; forecast/PAC; added 2026-10-05 by the brainlink migration from drift-forecast.md section 3, recorded as a QUESTION, not a fact): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: [[ledger/melange-systems-brain/D-088|D-088]] fixes metric A, the scored elections and the bar; [[ledger/melange-systems-brain/D-157|D-157]]] drift question 4 (source: drift-forecast.md section 3 item 4; Mentat Complete Files\DIAGNOSTIC_BANKING_ACCURACY_2026-10-04.md). Which banking accuracy number is canonical: the 10-01 style (month 18, unweighted, leave-one-out) or the attempt-2 style (dollar-weighted, time-valid, 2016-2024)? Should 2016 stay scored, and does the 90 bar cover ORIGIN and month 12? ([[ledger/melange-systems-brain/D-088|D-088]] records 2026-10-04 rulings E1, E5, E6, E8 and E10 that appear to touch these points; whether they close the question is Paul's call.)
- OPEN (Paul; forecast/PAC; added 2026-10-05 by the brainlink migration from drift-forecast.md section 3, recorded as a QUESTION, not a fact): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: overtaken by the 09-30 build plan, [[ledger/melange-systems-brain/D-089|D-089]]..[[ledger/melange-systems-brain/D-101|D-101]] and [[ledger/melange-systems-brain/D-113|D-113]]..[[ledger/melange-systems-brain/D-121|D-121]]; [[ledger/melange-systems-brain/D-157|D-157]]] drift question 5 (source: drift-forecast.md section 3 item 5; vault projects/forecast-redesign.md and memory forecast-audit-lane-2026-09-29 still list it as awaiting Paul). What is the status of the methodology list A-L from the 2026-09-29 audit? No ruling was found, but the 09-29/09-30 transcripts were not searched exhaustively.
- OPEN (Paul; forecast/PAC; added 2026-10-05 by the brainlink migration from drift-forecast.md section 3, recorded as a QUESTION, not a fact): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: [[ledger/melange-systems-brain/D-088|D-088]] E3/E4; [[ledger/melange-systems-brain/D-157|D-157]]] drift question 7 (source: drift-forecast.md section 3 item 7; asked 2026-10-01T19:31:26Z, C:\melange-data\forecast-redesign-20260930\pace_test\industries\RESULTS.md). Is the P&C/auto PAC-roster question answered, or superseded by attempt-2 ruling B2 (strict own-PAC cohort)? ([[ledger/melange-systems-brain/D-088|D-088]] records E3 'The mentat governs it' and E4 P&C 'Open for development'; whether that closes it is Paul's call.)
- OPEN (Paul; forecast/PAC; added 2026-10-05 by the brainlink migration from drift-forecast.md section 3, recorded as a QUESTION, not a fact): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: [[ledger/melange-systems-brain/D-100|D-100]] C2, [[ledger/melange-systems-brain/D-088|D-088]] D8 + pas226, [[ledger/melange-systems-brain/D-101|D-101]] E20/E22; [[ledger/melange-systems-brain/D-157|D-157]]] drift question 8 (source: drift-forecast.md section 3 item 8; memory pac-accuracy-attempt2-lane-2026-10-03 C2 and pac-accuracy-six-year-lookback-directive-2026-10-03 D8, E12, E20, E22). Is the scope of each download authorisation as read: the 2026-10-01 'Yes' (FEC pas212/214/216, fetched 13:58Z, C:\melange-data\forecast-redesign-20260930\pace_test\DOWNLOADS.md), attempt 2's 'no-downloads stands' (C2, 2026-10-03), and the 2026-10-04 D8 / E12 / E20 / E22 authorisations?
- ~~OPEN (Paul; added 2026-10-05 by the brainlink migration; F28 of drift-forecast.md, recorded but NOT executed): Is the Claude scheduled task score-pac-live-freeze-2026 (enabled, fires 2027-03-08T14:00Z) to gain the D6 v5 scoring line? Paul ruled D6 YES on 2026-10-04, but the task's SKILL.md (modified 2026-10-03 15:21 ET) scores only v3 and V4_1 and attempt2-20261003T003312Z\v5\live\SCORING_PLAN_2026_V5.json is not wired in (source: Mentat Complete Files\HANDOFF_PAC_ACCURACY_2026-10-04.md:55).~~ - superseded 2026-10-05: the task's SKILL.md now scores v3, v4, v5 and attempt 3's v6 lines (Parts A and B; rulings D6 and E21), and the handoff section 6 lists it that way (source: C:\Users\pgoff\.claude\scheduled-tasks\score-pac-live-freeze-2026\SKILL.md read 2026-10-05; C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\HANDOFF_PAC_ACCURACY_2026-10-05.md section 6). The March 2027 run itself is untested.
- OPEN (Paul; forecast; added 2026-10-05 by the record-repair lane, recorded as a QUESTION, not a fact): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: both tasks created, MentatNightlyAnchors 03:30 and MentatRefitWatcher 04:00; [[ledger/melange-systems-brain/D-151|D-151]]] should the nightly anchor and refit-watcher scheduled tasks be created now? Paul OK'd them on 2026-09-30 as "create AFTER landing", and the integrity continuation says to ask him again in chat before registering (source: C:\melange-data\forecast-redesign-20260930\CONTINUATION_FORECAST_INTEGRITY_2026-10-01.md:160; vault projects/forecast-redesign.md:251). The fixes landed 2026-10-01 (f340dc84e), and as of 2026-10-05 neither task exists (source: Windows Task Scheduler query 2026-10-05, no anchor/refit/giving/mentat task among 209; Claude scheduled-tasks list 2026-10-05, none for anchors or refit).
- OPEN (Paul; added 2026-10-05 by the record-repair lane, recorded as a QUESTION, not a fact): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: adopted by use, scorecard dropped, monthly audit kept; [[ledger/melange-systems-brain/D-157|D-157]]] Where, if anywhere, should the EVALUATION.md pilot run now that pilot-brain is retired? The pilot (5-10 scorecarded sessions plus kill criteria) never started in pilot-brain, and this brain's EVALUATION.md is unchanged since its init commit fb96d9c (source: [[ledger/melange-systems-brain/D-103|D-103]]; stale-state verification 2026-10-05, pilot-brain question P2; git log -- EVALUATION.md).
- [CLOSED 2026-10-11, decided by Claude under Paul's delegation: MW-1..MW-6 ruled, blend BLOCKED after gate 1 failed; [[ledger/melange-systems-brain/D-149|D-149]]] Mentat money wiring (plan ed455bcef): side map (Fintech/Credit Arms/Banking), channel weights (employee tiers, IEs, leadership PACs), cycle window, Mentat freshness rule, blend vs clean switch, reconciliation tolerance. (Paul)
- [CLOSED 2026-10-11, decided by Claude under Paul's delegation: prereg retired without a look ([[ledger/melange-systems-brain/D-152|D-152]]); Opus review done ([[ledger/melange-systems-brain/D-153|D-153]])] Competitiveness multiplier ([[ledger/melange-systems-brain/D-104|D-104]]): should the reciprocity hypothesis get a preregistered outcome test (does money given in close races predict later alignment more than money in safe seats)? Should an Opus second review run after 2026-10-08? (Paul)
- COMPET_MULT RULINGS 2026-10-07 ([[ledger/melange-systems-brain/D-107|D-107]], supersedes [[ledger/melange-systems-brain/D-106|D-106]]): R1 Fouirnaies-Hall term neutral when the dial is on (retiree 0.60 kept); R2 Kiley R; R3/R4 ballot overrides only for Calvert CA-40 and Wasserman Schultz FL-20, non-runners keep redrawn row; Doggett current-seat 2025 PVI; R5 Sanders/King D; R6 LEV=0 forces fac=1; R7 provenance. LANDED 2026-10-11: COMMITTED on Melange main 03be7ff38 (not pushed); Opus second review done (one fail-closed tightening added: the kernel validator now refuses a ballot_override on a non-override join). Live c: Kiley 2.0, Calvert CA-40 1.301194, Wasserman Schultz FL-20 1.018316, Doggett TX-37 2025 1.005517, Al Green/J. Johnson/Cohen/Fields/Owens 2.0, only the PR delegate at 1.0. Gates: ranks 0/533 on the 2026-10-07 post-ruling chain run (compute_pillars reads only press_matrix + dump_atomic, so c/R1 cannot reach a rank); dial-on engine reruns (per_topic_flip, lt_priming, both frontiers, optimize, salience) reproduce the live artifacts byte-for-byte; dial-off HEAD-vs-new code byte-identical except the R6 leverage_source key on both frontier files; audit_full R1/R7 checks OK; lane pytest 43/43; kernel 287/2 (test_per_area_board, test_refresh_tick, both unrelated). NOT DONE: the 2026-10-11 chain rerun and the full audit stop on a stale sentinel_admissions generation (2026-10-01, outside the 10-day window, [[ledger/melange-systems-brain/D-122|D-122]]) at verify_collector_roster_updates / audit_full:2099, unrelated to COMPET_MULT; rerun the chain from build_competitiveness after the admissions refresh. Residual (not ruled): the kernel re-checks the three Cook-package CSV hashes, not the Voteview CSV / PROVENANCE.json / congestion hashes also in the header (roster drift is caught by roster_sha256). Bystanders/net_lean: unscaled ([[ledger/melange-systems-brain/D-108|D-108]]). ~~STILL OPEN: PR + DC delegates unasked.~~ [CLOSED 2026-10-11, decided by Claude under Paul's delegation: PR c = 1, DC D+44 ratified; R7 Cook-CSV check accepted; [[ledger/melange-systems-brain/D-153|D-153]]]
- ~~OPEN (Paul; forecast; added 2026-10-08 by the records-repair lane, recorded as a QUESTION, not a fact): [[ledger/melange-systems-brain/D-092|D-092]] says projections are shown in nominal dollars by default, but the Giving by cycle page shows real 2025 dollars ([[ledger/melange-systems-brain/D-114|D-114]], CHANGES.md entries 1 and 10). Nominal was an agent recommendation that Paul never answered (2026-10-01; HANDOFF_FORECAST_2026-10-01_EOD.md:37 lists 'nominal default' among the owner rulings built in, but the Paul quotes in [[ledger/melange-systems-brain/D-092|D-092]] cover the inflation input, not the dollar basis). Which basis should the page show by default: real 2025 dollars or nominal? (Paul)~~ — superseded 2026-10-09: CLOSED by [[ledger/melange-systems-brain/D-127|D-127]], nominal dollars by default with a 2025-dollars toggle (Paul, 2026-10-09: "4. Align"; source: DECISIONS.md [[ledger/melange-systems-brain/D-127|D-127]])
- OPEN (Paul; forecast; added 2026-10-08 by the records-repair lane from CHANGES.md entry 14, recorded as a QUESTION, not a fact): [[ledger/melange-systems-brain/D-118|D-118]] uplift size [CLOSED 2026-10-08: Paul ruled +9% (u = 1.09), "use +9% and restart 8806"; ~~see [[ledger/melange-systems-brain/D-119|D-119]]~~ — superseded 2026-10-08: see [[ledger/melange-systems-brain/D-121|D-121]], the final answer ([[ledger/melange-systems-brain/D-119|D-119]] was superseded by [[ledger/melange-systems-brain/D-120|D-120]], then [[ledger/melange-systems-brain/D-120|D-120]] by [[ledger/melange-systems-brain/D-121|D-121]]): company PACs x1.09 and general giving x1.8635, both live and committed (Mentat 8e3a85c10; source: DECISIONS.md [[ledger/melange-systems-brain/D-119|D-119]] to [[ledger/melange-systems-brain/D-121|D-121]])]. [[ledger/melange-systems-brain/D-118|D-118]] rules that a presidential cycle always projects higher than the preceding midterm and that company PACs 2027-28 get an uplift, but the data do not show one in real dollars: the national all-PAC ratio of a presidential cycle to its preceding midterm is u = 0.9812 (2016/2014 0.9969, 2020/2018 0.9640, 2024/2022 0.9829; nominal geometric mean 1.0295; no definition of PAC gives u > 1), and 2027-28 only rises above 2025-26 when u exceeds 1.0853. What size or basis should the uplift take (a ruled number, nominal dollars, or another population)? Entry 14 applied nothing; step 2 is ready once a size is ruled. (Paul)
- OPEN (Mentat console; added 2026-10-08 by the Mentat records lane from the Chart Studio members() and figure-strip session, recorded as an open item, not a fact or a ruling; see [[ledger/melange-systems-brain/D-123|D-123]]): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: fixed, Mentat 3a7b43f0c; [[ledger/melange-systems-brain/D-161|D-161]]] Chart Studio's filter checklist overflow note counts values that do not match the search while a search is active (it reads "1381 more values" when the search matches 1). Pre-existing quirk, seen while checking Select all on Downstream Activity 2024, Candidate (1382 values); unfixed and outside [[ledger/melange-systems-brain/D-123|D-123]].
- OPEN (Mentat console; added 2026-10-08 by the Mentat records lane, recorded as an open item, not a fact or a ruling; see [[ledger/melange-systems-brain/D-123|D-123]]): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: cached, Mentat af6ac59ab; [[ledger/melange-systems-brain/D-161|D-161]]] members() in mentat/app/chart-studio.js rescans data.rows on every call; memoise it if large worksheets lag (a 20,000-string column sorts in about 50 ms). The verified-mode facet is still capped at limit 100000.
- OPEN (Mentat console; added 2026-10-08 by the Mentat records lane, recorded as an open item, not a fact or a ruling; see [[ledger/melange-systems-brain/D-123|D-123]]): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: #evidence-add removed, Mentat 1b3e0a6d2; [[ledger/melange-systems-brain/D-161|D-161]]] Graph's "Create chart" (#graph-open-builder) now opens Chart Studio, so the classic chart dialog (#chart-image) is reachable only through Advanced comparison's "Open chart & export". #evidence-add / .evidence-picker-data is hidden and nothing unhides it (possibly dead UI; not confirmed).
- OPEN (Paul; security; added 2026-10-10 by the security-record lane, recorded as a QUESTION, not a ruling; see [[ledger/melange-systems-brain/D-140|D-140]]): [DECIDED 2026-10-11, [[ledger/melange-systems-brain/D-148|D-148]]: RunLevel Limited; STILL OPEN for Paul to run the elevated command] (a) The ClaudeSystemSentinel scheduled task runs HighestAvailable on a user-writable script; Paul must change that himself (not done by any lane).
- OPEN (Paul; security; added 2026-10-10, QUESTION; see [[ledger/melange-systems-brain/D-140|D-140]]): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: no rewrite, repo verified private; password half closes on the SEC-e upload; Paul confirms 2FA; [[ledger/melange-systems-brain/D-148|D-148]]] (b) Rewrite git history to purge the unlocked data/money/Moneyball_email.zip from origin? Also covers the older brain commits and mirror that still hold the redacted probe-lock literal.
- OPEN (Paul; security; added 2026-10-10, QUESTION; see [[ledger/melange-systems-brain/D-140|D-140]]): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: 26 sidecars stamped; retrained joblib commit queued; [[ledger/melange-systems-brain/D-148|D-148]]] (c) Stamp sha256 sidecars for the stance-model joblib files so the unpickle guard stops warning (absent sidecar = warn only).
- OPEN (Paul; security; added 2026-10-10, QUESTION; see [[ledger/melange-systems-brain/D-140|D-140]]): [DECIDED 2026-10-11, [[ledger/melange-systems-brain/D-148|D-148]]: Carbonite + restore drill; STILL OPEN for Paul's folder selection] (d) Which data backup target should be used.
- OPEN (Paul; security; added 2026-10-10, QUESTION; see [[ledger/melange-systems-brain/D-140|D-140]]): [DECIDED 2026-10-11, [[ledger/melange-systems-brain/D-148|D-148]]: rebuild -> re-lock -> verify (Claude, heavy lane) -> Paul uploads] (e) Run the desk rebuild so the XSS fixes reach the shipped dashboard (deploy/index.html was only re-locked, not rebuilt; not yet uploaded to Netlify).
- OPEN (Paul; security; added 2026-10-10, QUESTION; see [[ledger/melange-systems-brain/D-140|D-140]]): [CLOSED 2026-10-11, decided by Claude under Paul's delegation: kept, Codex sandbox SID, password file isolated; [[ledger/melange-systems-brain/D-148|D-148]]] (f) The AppContainer full-control ACE on %LOCALAPPDATA%\Melange: keep or remove?
- OPEN (Paul; money; added 2026-10-11 by the queue clear-out, [[ledger/melange-systems-brain/D-149|D-149]]): apply the Calvert/SchoolsFirst committee-ID second pass in Mentat's collector (patch + R test in the clear-out session scratchpad mentat_patch\; git apply --check clean on codex/mentat-crypto 9cfdc2e29)? It adds 5 receipts / $10,300 across 3 cycles. Reserved by the money-collection rule (per-change OK), not by the delegation.
- OPEN (Paul; money; added 2026-10-11, [[ledger/melange-systems-brain/D-149|D-149]]): [CLOSED 2026-10-11, Paul confirmed the flag; [[ledger/melange-systems-brain/D-163|D-163]]: voids net against their own original, FEC_VOID_NET=1; McClintock 2025-26 stays $2,500 = recipient] McClintock $2,500, a PAC-reported check his committee never received (voided -$2,500, May 2025). Melange's FEC side counts payer-reported disbursements: keep that, or net out voided checks?
- OPEN (Paul; money; added 2026-10-11, [[ledger/melange-systems-brain/D-163|D-163]]): payer-side netting cannot fix McClintock in both cycles (his committee received 1 of 3 SchoolsFirst checks; one void). Undated voids tie-break in-cycle. Want recipient-side (Schedule A) confirmation of PAC checks, or FIFO for undated voids? Corrected money lands only at the next refresh_fec_money run (heavy queue Voids.md).
- OPEN (Paul; infra; added 2026-10-11, [[ledger/melange-systems-brain/D-148|D-148]]): delete the old RunPod /workspace network volume and terminate stopped pods (irreversible; command in the decisions record); confirm GitHub 2FA for pjg93-222.
- OPEN (Claude; money; added 2026-10-11, [[ledger/melange-systems-brain/D-149|D-149]]): classify the 2025-26 reconciliation gaps over $500 (aggregate -40.3%) before the money blend can resume.
- OPEN (research; added 2026-10-11, [[ledger/melange-systems-brain/D-159|D-159]]): E1 imputation prereg is held for redesign (inputs cannot carry its bars); no look, no lock.
- OPEN (Paul; holistic network; added 2026-10-11, G-REBUILD follow-up): [CLOSED 2026-10-12, decided by Claude under Paul's delegation: [[ledger/melange-systems-brain/D-185|D-185]]. Verdict stays BREACH; accepted as a known residual for raw `holistic` (vintage AUG_20261011, display-only, published: False); no WSCALE/cap; threshold unchanged; any use of holistic kernel p as a decision input must pass D8 literally (today only `holistic_norm`) or go to Paul] the D8 no-WSCALE criterion (G_holistic_network.md D8, fixed before the run) is BREACHED on `holistic`. The tail above p=0.9 is 3 pairs (4.6e-05 of 65,242: Biggs-Crane, Biggs-Roy, Sullivan-Murkowski) where the criterion requires 0; median dp is 0.0094 (passes, <=0.1). `holistic_norm` passes both limbs (0 pairs, dp 0.001). The 08-17 baseline already had 2 pairs (3.2e-05 of 62,996) but was recorded as "zero mass". The ruling sets no remedy, so the threshold was NOT moved; finding recorded in the decision file. Paul decides: (a) keep no WSCALE and re-pin the tail limb as a mass bar, or (b) a holistic-only WSCALE or concave cap (a kernel-scale change). Published ranks move 0/533 either way (exploratory config).

## Pointers
- Repo root: `C:\Users\pgoff\OneDrive\Desktop\Melange Systems` (live tree, on main).
- Examination framework: `audits/HALLUCINATION_DETECTION_FRAMEWORK_2026-08-13.md` (six passes, seven
  classes, honest teeth inventory). Its worked corpus is the CORRECTION OF RECORD blocks in
  `audits/BARR_CU_COURTSHIP_BATTERY_2026-08-11.md` and
  `audits/CROSS_INDUSTRY_BACKFIRE_ANALYSIS_2026-08-11.md`.
- Primacy engine: `fec/engine/primacy_factors.py`; board assembly `fec/tier_util.py`;
  industry boards `fec/lobbying/industry_tiers.py`.
- Relevance x valence tensor: `data/lobbying/industry_axes.ndjson` (31 rows). CU column is consumed by the
  primacy engine only where a declared position would otherwise have floored the weight.
- Act universe: `bill_beneficiary_tags.ndjson` (644 rows). ACU source of record:
  `source_data/legislation/Moneyball_ACU_Search_Outline.docx` -> `acu_legislation_search_registry.json`.
- Surfaces: `Moneyball Dashboard.html`, `cu-member-desk.html`, `lobby-*.html`, combined `Moneyball.html`.
- Pre-deploy backups of all 9 surfaces: `backups/pre-ui-simplify-20260811/`.
- Design docs: `INDUSTRY_AXES_DESIGN.md`; `audits/primacy_shadow_20260728/PRIMACY_IMPLEMENTATION_SPEC_2026-07-28.md`
  (the nine-level authority ladder).

<!-- appended 2026-08-17 by the holistic-network lane (peaceful-poitras worktree; pure additive append) -->
- HOLISTIC NETWORK LANE (2026-08-17, Meta LOOP run-20260817T2000020568738Z-e6b14b9356): design guide for
  the second, all-bills network configuration DELIVERED and committed b99c52589 on
  claude/holistic-network-analysis-config-dc9e36 (HOLISTIC_NETWORK_DESIGN_2026-08-17.md + 13-page PDF;
  sha256 md bf15821d / pdf 79cc8d72). Paul RULED D1 mid-run: regular co-sponsorship INCLUDED at role
  weight 0.2 (original 1.0; the CU graph keeps its 0.5 - external scraper untouched). Load-bearing
  findings: CU scoping lives in EXTERNAL collection universes (17 congress.gov CU templates; CU press
  CSV; Quorum boolean query) so holistic = sourcing + parallel builder, never a filter flip; the
  orig/regular distinction is discarded at the AUG builder (fix = WOriginal/WRegular subtotal schema on
  the BASE vintage); a second network must fail the congress_cosponsor_network_* glob entirely
  (holistic_network_BASE_/AUG_ family + NET_CONFIG dial gating BOTH loaders, the augmenter base-pick,
  and the bundle builder). Guide survived a 4-lane review (21 findings folded) + Grok critique (6 KILLED
  / 12 WOUNDED, all adjudicated-accept). Decision menu D2-D12 OPEN: D3+D6 unblock Phase 1-2, D10 gates
  Phase 3; candidate sources = local BILLSTATUS archive census first, BICAM cross-check (117-118 only),
  govinfo bulk fill. Design only - zero engine/data changes.


<!-- appended 2026-08-17 by the holistic-eval-framework session (worktree holistic-network-config-60c11c; pure additive append; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- HOLISTIC EVAL FRAMEWORK (2026-08-17): acceptance framework for the holistic-network v1 FIRST DRAFT authored at
  audits/HOLISTIC_NETWORK_V1_EVAL_FRAMEWORK_2026-08-17.md (sha256 2C4EBBFF1B23, 185 lines; sits UNCOMMITTED in the
  holistic-network-config-60c11c worktree pending Paul). 51 bars in 10 strata over gates G0-G5, mirroring [[ledger/melange-systems-brain/D-011|D-011]]
  (BINDING vs REPORT-ONLY strata with mechanical arming conditions, fail-closed BLOCKED-never-passes); sufficiency
  rule = all gates PASS + adversarial round dispositioned; ALL numeric thresholds PROPOSED, binding only via a dated
  FREEZE ADDENDUM after Paul rules D3+D6 (D10 before Gate 3) and BEFORE Phase-2 code. G0 partially executed this
  session: 9/9 sampled guide anchors verified EXACT against live code; ONE guide wording defect found (guide 6.7
  "worktrees don't isolate the data plane" contradicts CONSTRAINTS + fec/paths.py:7-8 - the worktree data plane is
  EMPTY; operative rule "verify in the live tree" identical in all sources, so no halt; frozen guide not edited,
  framework is the living-plane correction). Bars BEYOND the guide's own QA sketch: MC-sufficiency re-check under
  NET_CONFIG=holistic (MEA-7 - the 100%-overlap record is CU-vintage), layer-presence manifest vs the augmenter's
  print-and-continue missing-input skip (PAR-5), xlsx canonical-content-hash determinism excluding the build stamp
  (COR-7), mechanical repo-wide selection-surface census superseding any remembered loader list (ISO-1), clean-shell
  law noting run_tests.py:166 w<=10 binds the shell-selected graph (ENV-2).
<!-- appended 2026-08-17 by the holistic-eval-framework session, part 2 (Gate 0 executed; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- HOLISTIC EVAL GATE 0 EXECUTED (2026-08-17, same session as the framework): verdict PASS with 3 findings,
  record at audits/holistic_v1_eval/RECORD.md, committed c7dbfbe75 + 40c75220f on claude/holistic-network-config-60c11c
  (framework + record + freeze-addendum template + ENV-4 receipts; merge = Paul). DOC-1: 18/18 sampled guide anchors
  EXACT, zero content misses (3 bare-filename path imprecisions, one +/-2-line drift). LOAD-BEARING CENSUS FINDING:
  repo grep finds 9+ LIVE mtime-selectors on congress_cosponsor_network_* (press_hcoi:87, press_engagement:71,
  stance_dynamics:89 all newest-ANY; behavior_panel:66, persona_homophily:28 non-AUG; bundle has TWO globs :77/:100;
  plus attic + 2 audit surfaces) - the guide's four-surface list UNDERCOUNTS but its naming-rule conclusion is
  REINFORCED (holistic family must fail the glob; ISO-1/ISO-2 are census-based). Bonus precedent: legislation lane
  ships FIXED_ZIP_TIME deterministic xlsx (build_legislation_base_network.py:111) - adopted into COR-7. ENV-4
  baseline ARMED: 18 live artifacts sha256'd (7 base + 8 AUG + ranks/dashboard/bipartisan, live head 56f1f84c7) +
  533-board dump; recapture rule at G3. Negative claims verified: no network.json anywhere; no network builder reads
  bill_beneficiary_tags. TRAP RECORDED: repo .gitignore lines 6/8 ignore ALL *.json/*.csv - eval receipts need
  git add -f (legfix2 precedent). G1-G5 BLOCKED by design until Paul rules D3+D6 (D10 before G3) and signs the
  freeze addendum (template in the record dir; anchor-sample pin already MET 18/18).
<!-- appended 2026-08-17 by the holistic-eval-framework session, part 3 (execution-home directive + Gate 1 census; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- HOLISTIC LANE EXECUTION HOME (Paul directive 2026-08-17 in-chat): everything executes in worktree
  holistic-network-config-60c11c / branch claude/holistic-network-config-60c11c. ENV-1/ENV-5 re-pinned in the
  eval RECORD (amendment section): holistic artifacts are born in the worktree data plane = physically invisible
  to the 9+ production globbers until merge; live-tree contact limited to baseline reads, parity-input copies
  INTO the worktree, and merge-time CU-invariance proofs. Design guide pulled into the branch BLOB-IDENTICAL
  (e729e772cf; STATE's bf15821d pin named the pre-commit LF bytes - pin the blob OID next time).
- HOLISTIC GATE 1 CENSUS EXECUTED (2026-08-17, committed e9f31cfb9): local BILLSTATUS archive
  (%LOCALAPPDATA%\Melange\lda_rebuild\raw, 2026-08-01 pull) is COMPLETE BY CONSTRUCTION for 117-118 - gap=0 on
  all 16 congress x type strata (sequential numbering, max=files) - and 99.86 pct for the 119th at vintage
  (22/16,052 missing, hr+s only, reserved-number-consistent). BICAM cross-agrees 117-118 within 0.04-0.17 pct
  (known -33 late-session 118 tail); BICAM 119th = 131 rows, SRC-2 enforced by data. UNIVERSE = 55,195 measures
  117-119 (guide's ~48k estimate LOW). New: BICAM congress-misassignment strays (117/hr max 11,200 vs true
  9,709) -> COR-4 keys on bill_id. Official congress.gov cross-check QUEUED (congress.gov + govtrack bot-wall
  non-interactive fetch; challenge NOT bypassed; for closed congresses the check is a formality by the
  construction argument). SOURCING MEMO in the record dir puts D6 (ladder: BILLSTATUS primary, BICAM cross-check
  117-118 only, govinfo = 119th refresh, scraper moot) + sub-questions (a)-(d) in front of Paul ON MEASUREMENTS.
  D6 is now ruleable; D3 + freeze-addendum pins remain the Phase-2 unblock.
<!-- appended 2026-08-17 by the holistic-eval session, part 4 (Run-all execution; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- HOLISTIC V1 FIRST DRAFT BUILT + EVALUATED (Paul 'Run all' 2026-08-17, freeze addendum w/ [[ledger/melange-systems-brain/D-010|D-010]]-style interpretation note; all in-branch, live tree untouched): BASE 93,952 directed edges (533/533, 0 isolates, 0 parse fails, COR-7 deterministic, COR-2 identity exact) + NET_CONFIG dial (ISO battery 17/17, fail-closed, CU byte-identical) + holistic AUG 62,996 pairs 44.4% density (HCoI vacuity CONFIRMED +0, co-appearance +198 NOT vacuous, D2 fixed-per-episode transform). MEASURED: D8 tail trigger FIRED (tail>0.5 ratio 5.04x vs 2x pin) but median healthy (dp 0.0069) and ZERO saturation >0.9 -> session recommends NO WSCALE, Paul rules; MEA-3 clear (median regular share 0.232). COR-3 FAILED FOR REAL: dominance premise unsound for accruing bills (C grows 6/25->8/1, 405/1,874 small-deficit violations, signature classified) - evaluator defect owned, vintage-aware re-pin = Paul. Routes: CU graph 0 recruitments at 300k cap vs holistic live whip chains (Cruz->Cornyn p=.85) - the holistic layer's point, demonstrated. DEBTS at merge gate: PRO-1 adversarial round, ISO-4 live byte-identity + rank gate, MEA-8 registration, MEA-6/7 reruns. Record + ledgers committed on claude/holistic-network-config-60c11c.
<!-- appended 2026-08-17 by the holistic-eval-framework session, part 4 (review window + downstream update; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- HOLISTIC REVIEW WINDOW COMPLETE (2026-08-17 late, committed 31445a250 atop fc70ec4ae): the run-all
  first draft was RE-VERIFIED per verify-dont-infer, not trusted from its commit message - COR-1 27/27,
  ISO 17/17 (dual-config in one process: holistic 62,996 pairs / CU 2,555 of 141,778), COR-2 all rows,
  COR-7 determinism ACROSS INVOCATIONS (cold rebuild reproduced BASE row-hash 1d190ab4d9a5; only drift =
  manifest built_utc line), MEA reproduces (D8 FIRED tail 5.043x BUT zero mass >0.9 + median dp 0.0069 ->
  NO-WSCALE recommendation stands, ruling Paul's; MEA-3 0.232 clear; HCoI vacuity exactly 0 per D10;
  co-appearance +198). PATH-4 CLOSED: JS-mirror parity max dp 0.000e+00 exact, both configs (125,992
  holistic + 5,110 CU directed checks; path4_parity.py re-implements tpl:414-417, non-circular).
  BASE->AUG chain IDEMPOTENT (refresh canonical-identical ce9c74af6a3d); COR-9 name assert observed
  firing LIVE on a bad temp name. PATH-3 BLOCKED(worktree-inputs): first missing =
  legislation_culling_receipt.json -> completes at merge from live tree via DASH_OUT. OPEN ON PAUL:
  COR-3 re-pin (vintage-drift premise defect; FAIL stands at 77.96% vs 99.5%), D8 WSCALE ruling,
  merge-gate debts (PRO-1 adversarial round, ISO-4 live byte-identity + rank gate, MEA-8 registration,
  PATH-3 bundle). CU configuration untouched and default throughout; branch unmerged.
<!-- appended 2026-08-17/18 by the holistic-network lane (merge gate; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- HOLISTIC NETWORK CONFIGURATION **MERGED TO MAIN @08d536b3a** (Paul: "commit and merge"). A SECOND
  network configuration beside the CU one, additive and default-off. WHAT LANDED: build_holistic_base.py
  (BILLSTATUS 117-119, all 8 bill types, 93,952 directed edges, 533/533 members, 0 isolates, WOriginal/
  WRegular subtotals so a role re-ruling is a recompute not a re-collection); NET_CONFIG dial in
  moneyball_core gating BOTH loaders w/ config-keyed caches + fail-closed selection; augmenter
  parameterized + co-appearance layer; 2 suites registered in the kernel gate; full eval record under
  audits/holistic_v1_eval/. NOT landed: the .xlsx artifacts (gitignored data plane) -- NET_CONFIG=holistic
  FAILS CLOSED on main until they are deployed, verified live. Artifacts live in the worktree
  C:\...\worktrees\holistic-network-config-60c11c (BASE+AUG+manifests, data/holistic/ caches 21MB).
- POST-MERGE GATES ALL GREEN: kernel **156/0** (154 baseline + 2 new suites); ISO-4 **all five production
  artifacts BYTE-IDENTICAL** to the pre-merge baseline (ranks/dashboard/bipartisan/category_stance/
  member_receptivity); live-tree fail-closed verified; test_holistic_base 34/0 and test_holistic_config
  22 passed/1 skipped IN THE LIVE TREE (real assertions, not a vacuous skip).
- CU SAFETY PROVEN BEHAVIORALLY (not by reading the diff): main's moneyball_core and main's augmenter were
  EXECUTED head-to-head vs the branch versions on identical inputs, default env. Loaders -> identical
  adjacency hashes (undirected 43f1de6c89b425aa, directed 21402979d182c17d), same selection, same cache
  keys. Augmenter -> identical Edges (2,895 rows d422b078081da289) + Provenance + byte-identical stdout.
  METHOD LESSON: the first parity attempt staged main's module under a Git-Bash /tmp path that native
  Windows Python cannot resolve, so BOTH runs silently loaded the NEW module and "passed" -- caught by the
  probe printing its own __file__; the rerun asserts on module identity. Any old-vs-new parity harness on
  this box MUST assert which module actually loaded.
- PRO-1 ADVERSARIAL ROUND (5 lenses + refutation-biased verification, run BEFORE the merge per the freeze
  addendum): 32 findings, 9 refuted-tested, 2 refuted, 7 surviving, 0 merge-blocking. CU path confirmed
  inert by the lens whose only job was to break it; what it caught was holes in the TEST NET. 8 defects
  FIXED with regressions, chief among them: **the config battery self-retired into a scored PASS on every
  tree but the build worktree** (pinned artifacts are gitignored -> the kernel gate would have reported
  green while running ZERO contamination assertions). Restructured into TIER A (always runs, synthetic
  sandbox plants, no real artifact needed) + TIER B (any vintage, no filename pins). ALSO FIXED: ISO-3 was
  a stdout grep of a line printed BEFORE layer folding -> now the specified content-hash control
  comparison; directed-cache isolation tested key MEMBERSHIP (true even when clobbered) -> now identity+
  content across a round trip; duplicate cosponsor items double-counted one member as two ties of two
  roles and inflated C (9 collapsed, 410,411->410,406 ties); COR-5 divided by all bills instead of
  tie-capable (23.7/14.0/1.2 -> 29.5/17.2/1.5 pct); PAR-5/PAR-6/COR-9 write side had zero coverage behind
  recorded verdicts; manifest pinned unread zips + no self-hash + no extension check; PATH-4 tested Python
  against Python -> now also verifies the shipped JS text. 4 record claims CORRECTED (withdrawn and
  re-earned, not carried).
- **OPEN, PAUL-GATED (raised, not decided):** (A) **D6-b re-open -- the SUCCESS multiplier is nearly
  inert.** latestAction is the LAST action, not the high-water mark, so a bill that passed its origin
  chamber then died across the Capitol scores SUCCESS=1.0. Measured 117-119: PASSED_RE fires on
  latestAction for 1,083/55,195 bills (2.0%) vs on some <actions> item for 5,019 (9.1%); 2,652 of 37,076
  tie-contributing bills affected, 39,390 of 410,406 ties, ~+14.9% tie-weight if scored. The builder is
  FAITHFUL to the ruling (CU scraper reads the same field) -- fixing it is a SPEC CHANGE that breaks CU
  parity. (B) **D2 re-open -- co-appearance transform + calibration.** The ruled Fink-style transform was
  NOT IMPLEMENTABLE from the shipped input (co_appearance.json carries no per-member appearance volume);
  the code uses the guide's other sanctioned option (fixed per-episode weight). COAP_CAP=0.5 is 4.2x the
  HCoI cap it claims to mirror -- all 198 admitted co-appearance edges outrank a third of genuine
  cosponsorship ties. Options: lower to ~0.12, emit volume + implement Fink, or ratify. Rebuild = minutes.
- RULED THIS ARC: D8 = **NO WSCALE** (tail ratio 5.043x fired but zero mass above p=0.9, median dp 0.0069).
  COR-3 RE-PINNED to COR-3v2 and DISPOSITIONED: presence 100% (1,866 direct + 8 root-caused), aggregate
  mass 4.26x PASS, per-edge dominance -> REPORT-ONLY. **SIDE FINDING FOR THE CU LANE: the production CU
  graph misattributes Senator Jerry Moran's (M000934) sponsorships to Representative Nathaniel Moran
  (M001226)** -- ambiguous-surname failure in the external R scraper; Nathaniel carries 9 out-edges incl.
  Jerry's Senate ties, Jerry only 3. Flagged, deliberately NOT fixed in this lane.
- CENSUS FACT (Gate 1): local BILLSTATUS archive is COMPLETE BY CONSTRUCTION for 117-118 (gap=0 on all 16
  congress x type strata) and 99.86% for the 119th at its 2026-08-01 vintage; universe = 55,195 measures
  (the design guide's ~48k estimate was low). BICAM 119th = 131 rows, unusable; cross-checks 117-118 only.
- DEBTS CARRIED PAST THE MERGE (recorded, not waived): audit_full holistic schema-guard section; PATH-3
  holistic dashboard bundle; MEA-6/7 (kb_benchmark, mc_stability_check) under NET_CONFIG=holistic -- all
  want the live tree's full data plane, so they run after artifact deployment. Deploying the two .xlsx to
  the live root is the one open operational choice; isolation is proven (22 live-tree assertions) and
  revert is deleting two files.

<!-- appended 2026-08-18 by the holistic-network lane (collision census + correction of record; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **CORRECTION 2026-08-18 (supersedes the Moran claim in the entry above and in commits 4f0722ba0 /
  3a39f5454 / 08d536b3a, which are frozen):** the CU-graph misattribution is **MENENDEZ, not MORAN**.
  `M001226` is **Robert Menendez** (House, NJ-08) — NOT Nathaniel Moran (who is `M001224`). Verified
  against congestion.json AND the CU workbook's own From_label column. Real mechanism: **full-name
  collision ACROSS THE ROSTER BOUNDARY** — Sen. Robert Menendez (`M000639`, NJ, departed 2024, ABSENT
  from the 533) sponsored 232 bills in 117-118; the CU scrape credits them to his son the Representative.
  Per-edge proof vs BILLSTATUS: for all 8 targets, bills sponsored by Menendez-senator / by
  Menendez-representative = 77/0, 21/0, 20/0, 35/0, 4/0, 9/0, 58/0, 11/0. The Representative sponsored
  ZERO bills with any of them. METHOD ERROR that produced the wrong claim, recorded: a "which sponsors
  have >=6 of these 8 as cosponsors" query returned Jerry Moran with 3 bills and that co-occurrence was
  read as causation — those 8 senators are a common cosponsor bloc and the true top sponsors by that
  measure are E000295/P000145/G000386/W000790, with Moran outside the top eight. Never read a
  co-occurrence pattern as an attribution; the correct test is per-edge and restricted to the candidate.
- **COLLISION CENSUS (Paul-directed 2026-08-18), complete with denominators:** full display-name
  collisions WITHIN the 533 = **0**. Surname collisions within the roster = **29 surnames / 78 members**,
  13 of them cross-chamber (Collins, Cruz, Johnson, Kelly, Kennedy, Kim, Lee, McCormick, Moran, Murphy,
  Peters, Scott, Smith) — any first-name-blind matcher collides on these. Roster member sharing
  first+last name with a NON-ROSTER sponsor in the 117-119 universe = **exactly 1 (Robert Menendez)**,
  and it is **exploited 1-of-1**: all 9 of `M001226`'s CU out-edges (weight 4.077) are unsupported by
  BILLSTATUS, vs his true 89 out / 182 in. Blast radius in the SHIPPED production AUG: 14 of 2,895 pairs
  (0.48%), 0.58% of total edge weight. CU roster-internal edges unsupported by BILLSTATUS repo-wide =
  **8 of 1,874 (0.43%), every one a Menendez edge** — the misattribution is CONFINED to this one member.
  **LOAD-BEARING LESSON: the within-roster census returns ZERO and would have declared the graph clean.
  The defect lives in the pair the roster CANNOT SEE — a departed member colliding with a sitting one.
  Any identity guard must be checked against the HISTORICAL member universe, not just the current 533.**
  Relevant to the 120th rollover: freshmen sharing a name with a departing member are the same class.
- Holistic-configuration numbers are UNAFFECTED by the correction: COR-3v2 presence still 1,866/1,874
  with all 8 root-caused (to the corrected cause), aggregate mass 4.26x, and the holistic builder —
  bioguide-native — carries Menendez correctly. Only the ATTRIBUTION of the cause was wrong.

<!-- appended 2026-08-18 by the holistic-network lane (artifact deployment; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- HOLISTIC ARTIFACTS DEPLOYED TO THE LIVE TREE (Paul-authorized 2026-08-18) @ab4af2f34: BASE (6.08MB) +
  AUG (3.29MB) + the 3 bill caches (21MB), each sha256-identical to source, copied temp-then-atomic-rename.
  BASE verified against the manifest's output_canonical_rows_sha256 (e5630b802c5495d8). NET_CONFIG=holistic
  is now LIVE on main (62,996 pairs / 93,952 directed edges). CONTAMINATION PROOFS RE-RUN IN THE LIVE TREE
  with both families at the production root: engine loader still AUG20260802, directed still 2026-06-25
  base, weekly-refresh augmenter still bases CU, ranks/dashboard/bipartisan BYTE-IDENTICAL, kernel 156/0.
  Config battery 22+1skip -> **38/0/0** (TIER B armed); identity_collision_census.py now runs with no env
  vars. REVERT = delete the two xlsx + data/holistic/ (fails closed again; manifests stay tracked).
- **TWO UNINTENDED PRODUCTION WRITES BY THE SESSION, both remediated, both from the same root cause --
  running a producer without first reading what it writes:** (1) demonstrating the augmenter base-pick with
  AUG_OUT UNSET wrote a real congress_cosponsor_network_AUG20260818.xlsx, which as newest AUG every
  production loader would have selected; content verified identical to the shipped AUG20260802 (2,895 rows,
  d422b078081da289) then removed, loaders verified restored. (2) kb_benchmark run under NET_CONFIG=holistic
  described as "KB_OUT redirected" -- THAT DIAL DOES NOT EXIST -- overwrote data/network/kb_benchmark.json
  with holistic numbers; restored by re-running under default config (a fresh CU run, NOT a byte
  restoration; the file is a chain-unconsumed diagnostic). PRACTICE ADOPTED: read a producer's write
  targets before running it. It paid immediately -- build_dashboard_bundle writes bipartisan.json as well
  as the bundle, which ISO-7/D12 bar the holistic graph from feeding; DASH_OUT redirects both.
- **PATH-3 REMAINS OPEN (a "closed" claim was made then CORRECTED same-day):** the bundle produced under
  NET_CONFIG=holistic has 2,555 drawn edges vs the holistic AUG's 62,996, and its engine.adj is an
  IDENTICAL edge set to production's -- the display graph is CU. Root cause: build_dashboard_bundle.py:77
  (display graph) and :100 (BP source) use their OWN hardcoded congress_cosponsor_network_* globs, never
  the config-keyed load_network(). The Gate-0 ISO-1 census had flagged exactly these two sites; they were
  never wired because D7 deferred the bundle. WHAT MISLED: flip_model.py:52 calls MC.load_network() at
  MODULE level, so importing it under holistic prints the holistic banner while the bundle stays CU --
  A BANNER IS NOT EVIDENCE OF WHAT AN ARTIFACT CONTAINS. Rest of bundle uncontaminated (pmult/emult/dmult/
  bpf 0-of-533 different; they come from files, not the graph). A holistic bundle needs those two globs
  config-keyed = a code change under D7's deferred branch = Paul's gate.
- MEA-6 CLOSED (report-only): kb_benchmark clean on holistic -- spectral radius ~19.07, delta 0.0446,
  KB-vs-legislative rho +0.464, KB-vs-allocation +0.225 (n=533). LABELED OBSERVATION, not a validated
  claim: the CU-recorded allocator reading ANTI-correlates (-0.21, 2026-07-04, by design) while holistic is
  POSITIVE -- qualitative structural difference worth a look; per HON-3 the two are NOT a comparable delta.
- **MEA-7 CLOSED, PASS:** mc_stability under holistic = 100% Jaccard set-overlap at 5x MC budget, 98%
  across two different RNG seeds, first 2/4/6 picks identical. MC=20+CRN is NOT draw-overfit on a graph
  ~25x denser than CU. This was a REAL open question (the recorded validation is CU-vintage; guide 6.2
  named density as exactly where a fixed MC budget could fail). No MC dial change warranted for holistic.
- STANDING LESSON from three corrections in this arc (Menendez attribution, surname under-specification,
  PATH-3): every one was caught by reading an artifact's own contents and comparing a count against a
  number already known -- none by a tool reporting failure. Exit status and banners are not verification.

<!-- appended 2026-08-18 by the identity-collision lane (Paul: "Fire, commit, and merge"; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **IDENTITY FIXES MERGED TO MAIN @7959f05a6** (Paul-ordered remediation of the 2026-08-18 collision
  findings). Kernel **158/0** (156 + 2 new suites); mirror pushed.
  (1) **fec/members/member_identity.py Resolver REWRITTEN.** It carried the "fail-closed" name with THREE
  fail-open paths, each proven by executing it on the live 533: (a) first-initial narrowing compared a BARE
  SURNAME's own initial against candidates' first names -> Johnson=Julie Johnson, Lee=Laurel Lee,
  Jackson=Jonathan Jackson, Meeks=Miller-Meeks (Moran/Smith/Scott refused only BY ACCIDENT — no twin's
  first name started with that letter); (b) unique-surname match with NO first-name check absorbed
  non-roster people — Michael Barr->Andy Barr (the exact case extract_cu_hearings.py's docstring claims it
  mitigates), John Smith->Jason Smith, Travis Hill->French Hill; (c) raw "Last, First" tried BEFORE
  reordering returned a DIFFERENT member for **23 of 533** — Masto, Catherine Cortez->Alexandria
  Ocasio-Cortez; Clyburn, James->John James; Reed, Jack->Brian Jack. NEW RULE: a query carrying a first
  name must agree on BOTH names (initial + prefix forms accepted, ambiguity refuses); a bare surname
  resolves ONLY if unique in the roster. DELIBERATELY KEPT: roster-unique bare surname still resolves
  (452/452) — the legitimate "Chairman Barr" case.
  (2) **fec/collect/fetch_hearings_seq.py Senate-first guess FIXED.** resolve() now scopes by package id
  (hhrg/shrg) and UNIONS chambers for joint/unknown, requiring uniqueness — the rule the sibling
  fetch_congressional_record.py already used behind the comment "never restore the legacy Senate-first
  guess", never propagated. MORAN in a House hearing now = Nathaniel Moran; no-chamber now REFUSES.
  **SCOPE, not overclaimed: fixes FUTURE collection only.** The 65,912 cross-chamber turns already in
  hearings_seq.db stay misattributed until that corpus is re-derived — separate, network-bound, Paul-gated.
- **BLAST RADIUS MEASURED BEFORE MERGING (this is what made it safe to merge):** old vs new Resolver over
  every name-keyed production artifact — archive_leg.json (516 keys), ranks_python (533), member_receptivity
  (533), bipartisan (533), category_stance (533), electoral_history (502), plus 532 distinct
  speeches.member — **3,149 strings, ZERO resolution changes, zero newly-unresolved.** Every stored name is
  already canonical, so the fixes are behaviour-neutral on current data and close the door on future
  contamination. The four pre-existing inline toy assertions still hold.
- **NEW KERNEL SUITES (the reason this survived undetected):** test_member_identity_roster (34 checks) and
  test_hearings_chamber_scope (13) build on the REAL 533 roster and are registered in run_tests.py. Every
  assertion FAILS against the pre-fix code. The old inline assertions used a 3-NAME TOY ROSTER in which
  none of the three failure modes is reachable — a guard tested only on data that cannot express its
  failure is not a guard. **LAW: any identity/matching guard must be tested on the real roster.**
- **RANK OBSERVATION, NOT ATTRIBUTED, FOR PAUL:** vs the 2026-08-17 Gate-0 board baseline, ranks moved
  **2/533 — Catherine Cortez Masto 17->18 and Young Kim 18->17 (a swap)** — with 441 score drifts (normal
  chain churn). NOT attributable to these merges: both are code-only and measured behaviour-neutral, and
  the identity merge landed ~8h AFTER the artifacts were written. The live-root write sequence
  (member_receptivity 02:24:47 -> category_stance 02:26:02 -> ranks_python 02:26:15 -> dashboard_data +
  bipartisan 02:31:05) has the SHAPE OF A CHAIN RUN that this session never invoked; source not
  established, and I did not attempt to "fix" it. **Both movers are exactly the pair named in the
  known-open primacy-tier item** (test_primacy_tier ratified pins vs live bundle, Cortez Masto/Huizenga/
  Kim) — so this lands in already-Paul-gated territory.
- STILL OPEN from the findings, deliberately NOT fixed: **electoral_history.json identity swaps** (Adelita
  Grijalva holding her late father Raul's 2016-2024 elections; Mary Miller carrying Max Miller's Ohio
  record, Max ABSENT entirely) — needs the builder re-derived on bioguides, and **congestion.json does not
  populate a usable state field** (reads '?'), so the state disambiguation that builder relies on cannot
  work from that source. That is a design question, not a patch. Also open: press_engagement_layer.py:36
  builds its ambiguity set from ~385 press authors rather than the 533 roster.

<!-- appended 2026-08-18 by the identity lane (Paul: "Fix electoral_history too"; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **ELECTORAL_HISTORY IDENTITY SWAPS FIXED, MERGED @161dadf26.** data/money/electoral_history.json
  rebuilt from source with the fixed Resolver: **502 -> 520 members**. FIVE swaps corrected, each
  verified: Adelita Grijalva held her late father RAUL's 2016-2024 elections -> now correctly ABSENT
  (old resolve('Raul Grijalva') returned 'Adelita Grijalva'); Mary Miller state OH (Max's) -> IL +
  her own 2020/2022; Max Miller ABSENT -> present OH; Barry Moore UT (Blake's) -> AL; Blake Moore
  ABSENT -> UT; Danny Davis NC (Donald's) -> IL; Donald Davis ABSENT -> NC. 21 added, 3 dropped ALL
  CORRECTLY (Grijalva/Menefee/Gallagher won 2025 specials; the shipped records were other people's).
  BACKUP/REVERT: backups/electoral_history_20260818/electoral_history.PRE_IDENTITY_FIX.json
  (sha 1b89ea5217db6d96); deployed sha b6fdb16a236cf0c6.
- **THE REBUILD EXPOSED TWO DEFECTS IN MY OWN RESOLVER FIX that no unit suite could reach — both
  needed REAL SOURCE DATA.** (1) TOO STRICT: literal first-name agreement DROPPED SITTING MEMBERS
  because the FEC books use common names (Bernie Sanders, Jack Reed, Jim Risch, Maggie Hassan, Lou
  Correa, Greg Steube). Fixed by lifting process_quorum.py's FIRST_EQUIV nickname table into the
  SHARED resolver so every caller gets it, not one lane. (2) TOO PERMISSIVE: trying every given
  token at once let a MIDDLE INITIAL match a different candidate's first name — 'Bennie G. Thompson'
  matched Bennie AND Glenn Thompson, 'Susan M. Collins' matched Susan AND Mike — refusing members
  never in doubt. Fixed with FIRST-TOKEN PRECEDENCE (later tokens consulted only if the first
  matches nothing, so 'J. French Hill' still resolves on 'french').
  **LAW: a resolver change is not verified until it has been run against the real source corpora.
  The 43-check unit suite was green through BOTH of these.**
- **MEMBER_ALIASES map added with a deliberately HIGH EVIDENCE BAR and exactly ONE entry:**
  rick->eric crawford (AR-01; serves and appears on all ballots as Rick). **Surname+state+chamber
  agreement was TESTED as an alias basis and REJECTED — mostly false positives**, because
  challengers and predecessors share a state with the member who beat or succeeded them: Eddie
  Bernice Johnson vs Julie Johnson (TX, successor), David Scott vs Austin Scott (GA), Rodney Davis
  vs Danny Davis (IL), Doug Collins vs Mike Collins (GA), Raul vs Adelita Grijalva (AZ). Tests
  assert every one of those KEEPS REFUSING. Never widen the alias map on state agreement alone.
- BUILDER HARDENED (fec/engine/build_electoral_history.py): ELECTORAL_HISTORY_OUT dial (the path was
  HARDCODED — there was no way to run it without overwriting production), bioguide map passed to the
  Resolver, unresolved source names counted+printed instead of silently dropped, a no-state guard
  (the Miller defect's shape; now 0), and loud failure on a missing FEC book. FEC source books live
  in ~/Downloads, NOT source_data/electoral — pass ELECTORAL_SOURCE_DIR.
- DOWNSTREAM MEASURED, not assumed: behavior_panel.py reads this for ONE covariate,
  vote_share_last. Coverage 499 -> 519 members; Grijalva correctly loses it; 7 values change, all
  swap corrections (Mary Miller 51.10->99.50, Danny Davis 49.50->83.30, Barry Moore 63.10->78.40).
  **The artifact write alone does NOT move ranks — that materialises at the NEXT CHAIN RUN, on
  Paul's cadence, and was deliberately not triggered.**
- Identity suite now 57 checks (from 34), all on the real 533 roster; hearings suite 13. Kernel gate
  count unchanged at 158 suites.

<!-- appended 2026-08-18 by the holistic lane (Paul: dashboard toggle; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **LIVE DASHBOARD HOLISTIC TOGGLE SHIPPED @c004b556b + DEPLOYED.** Paul ruled 2026-08-18 that the
  main dashboard needs an on/off toggle reconfiguring the network to the holistic level — this
  **SUPERSEDES D7(i)** ("engines + labeled preview only, no live-dashboard exposure") and **CLOSES
  PATH-3**. Control is a `seg` pair (Credit union / All bills) sitting between Layout and Layers.
- SIZE MEASURED BEFORE DESIGNING (Paul asked for the measurement first): holistic adjacency
  serializes to **1,012 KB**, bundle **481 KB -> 1,498 KB (3.1x)**, shipped html 594 KB -> 1,613 KB.
  **Shipped UNPRUNED.** Pruning at w>=0.2 would have halved it (29,203 of 62,996 pairs) but would
  silently change every cascade/path/centrality result the toggle produces — a methodology change
  disguised as an optimization. The desk is already 27MB, so size was never the binding constraint.
- BUNDLE (build_dashboard_bundle.py): emits `engine.adj_holistic` (62,996 pairs), `edges_holistic`
  + `elay_holistic` (top-420 drawn subset w/ per-edge layer provenance; mix 369 c / 51 m), and a
  `holistic` meta block carrying per-layer scope labels + the cu-scoped bpf caveat. **ADDITIVE AND
  ABSENT BY DEFAULT** — no holistic artifact at root = block emits nothing. PROVEN: stripping the
  four new keys reproduces the production bundle EXACTLY.
- TEMPLATE: ADJ/PEBASE made rebuildable (`let`, `buildPEBASE()`); `setNetConfig()` swaps adjacency +
  drawn edges + layer codes, rebuilds the kernel, then calls `configureIssueNetwork()` — the SAME
  path a domain change uses — so cascade, pathfinder, PageRank, Katz and budget-recruit ALL follow
  the switch rather than a subset. **Node POSITIONS deliberately FIXED** across the switch: same
  members in the same places, different ties = controlled comparison, not a re-shuffle.
- VERIFIED IN-BROWSER on the SHIPPED live file: CU 2,555 pairs / meanDeg 9.59 vs holistic 62,996 /
  meanDeg 236.38; drawn edges + layer codes both swap; centrality leaders move (Katz Andy Barr ->
  Amy Klobuchar; PageRank Tom Emmer -> Eleanor Norton); **round trip returns byte-identically to
  CU**; zero console errors. Standing on-screen note states cosponsorship is all-bills while press/
  committee-affinity/social stay CU-scoped and cross-party damping keeps the CU bipartisan prior.
- DEPLOY: dashboard_data.json 51d80bd->3903118, Moneyball Dashboard.html 3f9d8ed->d62b378.
  **bipartisan.json and ranks_python.json BYTE-IDENTICAL** (ISO-7/D12 bar held through a bundle
  rebuild). Backups: backups/dashboard_toggle_20260818/*.PRE_TOGGLE.*
- **THIRD UNINTENDED PRODUCTION WRITE THIS SESSION, and the pattern is now explicit: I keep GUESSING
  env-var names.** make_dashboard_html.py takes `DASHBOARD_HTML_OUT`, not `DASH_HTML_OUT` (which I
  assumed by analogy with DASH_OUT), so the preview build overwrote the live dashboard. Caught
  immediately, restored by rebuilding from main's template + the live bundle (594 KB, 0 netseg, 0
  adj_holistic), then redone with the name READ FROM THE SOURCE. Prior two: augmenter with AUG_OUT
  unset; kb_benchmark described as "KB_OUT redirected" when no such dial exists. **LAW: read a
  producer's actual output dial out of its source before running it — never infer the name.**

<!-- appended 2026-08-18 by the holistic lane (normalized config; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **NORMALIZED ALL-BILLS CONFIG BUILT + VERIFIED, COMMITTED bfe31ca65 on
  claude/keen-davinci-155178, PUSHED TO MIRROR — MERGE TO MAIN BLOCKED** by an environment lock
  (see the lock entry below). Third config `holistic_norm`: chamber-equalized + per-member
  tie-mass cap, media admission relaxed, third dashboard toggle wired and browser-verified.
- **WHY: the raw all-bills graph measured ACTIVITY, not POSITION.** Spearman(Katz, raw tie
  volume) = **+0.845** vs CU's +0.247, and **Eleanor Norton — a NON-VOTING DC DELEGATE — topped
  holistic PageRank**. A member who cannot vote leading an influence ranking is prima facie proof
  the metric counts paperwork.
- **TWO PROPOSALS MEASURED AND REJECTED — do not re-propose:**
  (1) **Dropping regular cosponsorship** (Paul's initial instinct). Regular is only **12.3%** of
  edge weight at the ruled 1.0/0.2 dials, and original ties OUTNUMBER regular (WOriginal 46,408
  vs WRegular 32,621). The volume artifact comes from ORIGINAL cosponsorship — prolific members
  are prolific at both. The 0.2 dial already does that job.
  (2) **Per-edge volume normalization.** association sqrt(Out*In) → Katz~vol +0.552; row-stochastic
  → +0.477; no volume norm at all → +0.604. **Katz SUMS over edges, so a member with 5,000
  down-weighted ties still has 5,000 of them.** You cannot divide a degree artifact out one edge
  at a time. HOLISTIC_VOLUME_NORM ships defaulted OFF.
- **MY OWN FIRST BUILD "PASSED" AT +0.011 BECAUSE THE METRIC WAS BROKEN.** Directed +
  volume-normalized gave rho(P)=0.048 and **max/median = 3e27**, top-8 alphabetically clustered
  W–Y = a ranking with no spread. **LAW: an acceptance test can pass on a degenerate measurement;
  check conditioning (rho, max/median) BEFORE believing an improvement.**
- **WHAT WORKS: capping the SUM.** Per-member tie-mass cap at 1.5x the median (both in- and
  out-mass; 145/165 members capped). MEASURED **mid-build**: Eleanor Norton #15 → #149 (CU #178).
  **THESE KATZ FIGURES ARE MID-BUILD CAPTURES AND DO NOT RECONCILE** — the builder docstring records
  #1 → #37 for the same cap, and an independent recomputation on the shipped artifacts gives
  #73 → #362; they were each taken at a different stage (pre/post media relaxation and NBASE
  regeneration) and the ad-hoc harness is gone. **AUTHORITATIVE, because it is measured on the
  DEPLOYED surface and reproducible there: PageRank ranks Norton #1 of 533 raw all-bills, #197
  normalized, #78 CU.** Raw top-3 = Norton / Fitzpatrick / Jayapal; normalized = Booker /
  Blumenthal / Higgins. OPEN (minor): re-derive a single canonical Katz figure via a shipped
  harness so the Katz record stops carrying three numbers;
  max/median 3.56 → 1.59; rho(P) 19.08 → 4.88 (well conditioned). Katz~vol settles +0.504 and
  that is EXPECTED — the bulk correlation is carried by the broad middle where volume and
  connectedness genuinely coincide; the cap fixes the extremes, where the nonsense lived.
  **Norton's rank and max/median are the honest instruments; the bulk correlation is not.**
- **CHAMBER NORMALIZATION** equalizes measured TIE STRENGTH (Senate/Senate ran ~7.5x heavier than
  House/House purely from a 100- vs 433-seat pool). It deliberately does **NOT** force the
  centrality OUTCOME to parity — residual senators ~0.41x House median Katz (was recorded here as 0.37x; corrected to the builder docstring, the source of record) is a real structural
  fact (the House is a denser cosponsoring body); forcing 1.0 would be choosing the answer.
- **MEDIA ADMISSION RELAXED (D10 fork):** tied pairs take max(cosponsor, media); HCoI's SEPARATE
  isolates-only gate lifted for holistic configs — it was independently vacuous (**0 edges** on an
  all-bills base). HCoI 0 → 857; media-bearing pairs 1.50% → 2.84%. Still modest because the press
  and social corpora are CU-scoped: the relaxation removes an artificial block, it cannot
  manufacture uncollected coverage. CU keeps the original rule (MEDIA_ADMIT dial).
- Artifacts: holistic_network_NBASE_20260818.xlsx + _NORM_20260818.xlsx (live root, gitignored).
  NORM stays DIRECTED for pathfinding/IM; the bundle symmetrizes only for the display/centrality
  read. Dashboard third button "All bills · normalized" verified in-browser (PageRank top moves
  Eleanor Norton → Cory Booker; Katz top → Glenn Grothman; round trip byte-clean).
- **INDEX LOCK RESOLVED; MERGE COMPLETE @5f20525d9** (banner correction @d57aaa5df; mirror in sync).
  **CORRECTION OF RECORD — the earlier attribution in this file was WRONG.** The lock was NOT held by
  another lane's `codex` process (PID 1876). It was held by **TWO OF MY OWN hung `git.exe` merge
  processes (PIDs 51468 / 46536)**, started by this lane ~32 minutes earlier and never reaped;
  identified by enumerating `Win32_Process` command lines rather than inferring from what happened
  to be running. Killing them left no `MERGE_HEAD`/`MERGE_MSG`/`MERGE_MODE`, proving no partial
  merge state, so the orphaned `.git/index.lock` was removed rather than forced through.
  **LESSON: "another process holds it" is a hypothesis, not a diagnosis — enumerate the holder
  before deciding whether restraint or cleanup is correct.** Restraint against another lane's work
  was right in principle and wrong on the facts; the cost was a 32-minute stall.
- **POST-MERGE GATES GREEN:** kernel **158/0**; `audit_full` **202/1** where the 1 is the KNOWN
  pre-existing culling-surface item (matches the recorded 202/1 baseline — not a regression).
  Three-way dashboard toggle deployed and verified live.
- **PER-CONFIG NODE LAYOUTS MERGED @b9ff46982** (Paul: "Option 1, with the animated transition").
  Paul noticed the dots never moved when toggling networks — correct: `DATA.x/y` was a spring layout
  of the CU graph ONLY, with no per-config variants, so the spatial story was always the CU story
  even under an all-bills banner. Each config now ships its own force layout; the field animates
  600 ms between them.
  **THE HARD PART WAS THE COORDINATE FRAME, NOT THE ANIMATION — this generalizes to any visual
  comparison of two computed embeddings.** A force layout is rotation/reflection invariant and
  `spring_layout` ends with `rescale_layout()`, normalizing every layout to max|coord|=1 about its
  OWN centroid; the existing scaler then min/max-stretches each axis independently into [40,960].
  Three independent gauge freedoms. Rendering them naively animates gauge as if it were structure:
  **measured, naive = median shift 224 canvas units (corr with CU 0.45/0.39) vs shipped 75
  (0.58/0.69) — two thirds of the naive movement is frame artifact.** Fix = warm-start each layout
  from the published CU canvas (solver lands in the NEAREST minimum, so displacement means "this is
  how far the new ties pull this member") + Procrustes-align back onto CU (reflection ALLOWED — a
  force layout has no handedness) + NO per-layout rescaler. k scaled by the cube root of the
  mean-weight ratio, from the FR energy's invariance under (A,k)->(cA, c^(1/3)k).
  **The controlled-comparison property Paul had is PRESERVED — by the shared frame, not by freezing.**
  Committee layout deliberately EXEMPT (coords come from workbook membership; anchor labels are drawn
  at fixed points, so moving members would slide them off their own labels).
- **LATENT BUG REPAIRED as a side effect:** in area layout `setNetConfig` rebuilt PE but never
  respaced, so `draw()` weighted lines by the NEW kernel while positions held the PREVIOUS config's
  spectral embedding — while `#layoutnote` asserted both visualize the same weights. Median position
  move on a config switch: **0 before, 374 now.**
- **COPY DISCIPLINE — the recurring defect class, now twice in two days.** The fixed-position
  rationale was asserted in FIVE places, two of them user-visible (the #netseg tooltip, and
  HOL_META['note'] which ships INSIDE dashboard_data.json). All rewritten in the same commit.
  **LAW: when you reverse a design choice, grep for every place that EXPLAINS it, not just the code
  that implements it.**
- Gates: kernel **158/0**, audit_full **202/1** (known culling item), rebuild **bit-identical**,
  producer gates (negative control median>40, frame control r_x>0.45 and span!=920) all pass;
  browser gates driven on a synthetic clock — exact landing on all three configs (residual 0),
  committee inert, fast-click advances exactly one epoch per click. Party structure is STRONGER in
  the new layouts (1-NN same-party .936 holistic / .908 norm vs .783 CU): the movement is signal.
- **RENDER CONFIRMED BY PAUL 2026-08-18 ("It rendered") -- this open item is CLOSED.** The
  contraction-toward-centre look was accepted as shipped; the isotropic-inflation alternative was
  NOT needed. Retained below because the VERIFICATION LIMIT is permanent and will recur:
- **HARNESS LIMIT (standing):** the rendered appearance could not be verified by me. The Claude_Browser pane does not
  composite — `visibilityState` stays 'hidden' even after fronting, rAF fires ZERO frames, and
  screenshots are refused — so an rAF tween freezes at frame 0 and CORRECT CODE PRESENTS AS "the
  feature does nothing". Cost five debugging rounds before I ran the one-step check (count rAF
  frames). Logic verified on a synthetic clock; smoothness and look are not. The aligned layouts
  occupy the central ~45% of the canvas ("the field contracts toward the centre") — honest, since
  CU's 920 span is pinned by 15 outlier isolates, but a design call. One-line alternative available:
  isotropic inflation matching CU's 2/98-percentile radius, costs nothing in information.
- **SECTOR DIAGNOSTICS SHIPPED @005b1999b** (`fec/network/build_sector_diagnostic.py`). Paul ruled:
  crypto as a diagnostic, **fintech DROPPED**, community banks **rescoped to bank regulation**.
  Kernel 158/0, audit 202/1 (known culling item), outputs bit-identical across runs.
- **THE FINDING TO CARRY FORWARD: what makes the CU network possible is an ADJUDICATED BILL
  UNIVERSE, not code.** 17 hand-authored congress.gov full-text search templates (in the EXTERNAL R
  scraper under Desktop\Draft Systems, NOT this repo) plus a 36-row curated false-positive drop
  list, yielding 286 sponsored bills, built over months. **Any "do the same thing for sector X" ask
  is a request to author and adjudicate a new universe.** Lead with that before estimating.
- **THE GATE FOR ANY FUTURE PROPOSED NETWORK: dyad overlap against the PUBLISHED CU graph.** Size
  and coverage do not tell you whether a graph is a new view; overlap does. Computed by the producer
  into every manifest. Crypto: 444 dyads, **62.8% ALREADY IN CU**, jaccard 0.103 -- largely a
  relational subset of what is already published, which is what settles it as diagnostic-only.
  Bank regulation: 4,742 dyads, **76.1% NOVEL, 97.0% roster coverage** -- genuinely independent and
  ~2x CU's 2,555. **OPEN FOR PAUL: bank-reg may deserve more than diagnostic status. Flagged, not
  taken.** It is still weaker in the tail (p_max 0.264 / 139 dyads at p>=0.10 vs CU 0.5198 / 252).
- **AUDIT-ONLY IS ENFORCED, NOT ASSERTED.** No NET_CONFIG value, no dashboard. `assert_output_name`
  refuses the `congress_cosponsor_network_*` family (19 call sites across 17 files), refuses
  `holistic_network_*`, refuses named production artifacts, requires a `sector_diagnostic_` prefix,
  confines output to audits//tmp/, and re-validates DERIVED paths (the manifest path was initially
  a free pass -- caught by comparing against build_legislation_base_network.py:99-276, which is the
  stronger in-repo precedent and uses `fullmatch`). Seven negative controls verified.
- **UNIVERSE METHODS:** crypto = display-title screen ONLY, because **0 of 1,072 CRS subject terms
  match crypto/digital-asset/blockchain/token/ledger/stablecoin**; used strictly as a [[ledger/melange-systems-brain/DE-001|DE-001]]
  NEGATIVE screen (candidates, never labels). Added `digital commodity` + `BITCOIN` on measurement
  (+8 of 15 recall misses, no FP); **REJECTED a branded-act regex** -- 25/26 recall but 184 bills
  and ~50 false positives from "Clarity Act" alone. Bank-reg = CRS subject terms (Tier B) with
  **`Currency` deliberately EXCLUDED** (CRS home for digital-currency bills, 96 of 161 unique to it
  -- keeping it would silently re-import the crypto scope just separated).
- **FINTECH IS NOT A LEGISLATIVE OBJECT.** 36 bills; largest edge contributor was the Faster
  Payments to Veterans' Survivors Act, a VA benefits bill. It exists as an LDA client roster, not an
  agenda. No collection fixes it. Do not re-propose.
- **"THE LOBBYVIEW POSITIONS DATASET" DOES NOT EXIST** -- Paul named it as the source and it had to
  be walked back. The MIT bulk export's `bills.csv` is declared-but-absent (`collect_lobbyview.py:160`,
  manifest `present:false`), leaving issue-area codes and an org->member->COUNT table, never which
  bills. The Kim Harvard Dataverse CSV is the only org->bill->stance object (279,104 rows) and covers
  **congresses 111-117 ONLY** against a 117/118/119 base -- fatal for crypto, an 118th/119th
  phenomenon; its classifier has bank and credit_union and **no crypto or fintech side**. The join is
  clean (100% in-window); the WINDOW is the problem. `INDUSTRY_AXES_DESIGN.md:104-107` already said so.
- **THREE OF MY OWN REPORTED NUMBERS DID NOT REPRODUCE and were corrected before shipping:** crypto
  119 bills not 133; CBDC family **16.4% of edge mass not 69%** (32-variant sweep maxes at 50.7%, so
  69% was unreachable) -- my "crypto fails on structure" verdict had rested on it; CU universe 286
  bills not 371. The real crypto weakness is **emptiness, not concentration**: only 78 of 127
  screened bills contribute a tie. **LAW: a scouted number is a lead, not a measurement -- reproduce
  it before it reaches a verdict, an artifact, or Paul.**
- **CONSTRUCTION LAW: stars, never cliques.** Pairing every member on a bill turns a 165-cosponsor
  bill into a 165-clique; it inflated one scout's crypto count 39x (450 -> 14,021). Any sector pair
  count must be star-construction to compare against CU's 2,555. `assemble()`/`bill_factor()` are
  imported VERBATIM from build_holistic_base rather than reimplemented.
- **FIVE NETWORKS NOW SHIP.** `NET_CONFIG` = cu | holistic | holistic_norm | **bank_reg** | **crypto**.
  Paul ruled 2026-08-18: crypto diagnostic, fintech DROPPED, community banks RESCOPED to bank
  regulation -- then, same day, **promote both to full networks** (@94ae92bc5). Kernel 159/0,
  audit_full 202/1 (known culling item). Diagnostics @232fb5dc6, guard hardening @005b1999b,
  latent-defect closes @eac247776.
- **THE FINDING THAT OUTLIVES THIS LANE: what makes the CU network possible is not code, it is an
  ADJUDICATED BILL UNIVERSE** -- 17 hand-authored congress.gov full-text search templates in the
  EXTERNAL R scraper (`Desktop\Draft Systems`, not this repo) plus a 36-row curated false-positive
  drop list, yielding 286 sponsored bills, built over months. **"Do the same thing for sector X" is
  a request to author and adjudicate a new bill universe, not to run a producer.** Say that first.
- **THE GATE FOR ANY FUTURE PROPOSED NETWORK: dyad overlap against the PUBLISHED CU graph.** Size
  and member coverage do not tell you whether a graph is a new view; overlap does. Crypto is 62.8%
  already-in-CU (444 dyads); bank_reg is 76.1% NOVEL at 97% roster coverage (4,742 dyads, ~2x CU).
  The producer writes this into every manifest.
- **FINTECH DROPPED ON EVIDENCE, do not re-propose:** 36 bills by title screen, and the largest edge
  contributor was the *Faster Payments to Veterans' Survivors Act*, a VA benefits bill. Fintech is an
  LDA client roster, not a legislative agenda. No collection fixes it.
- **PAUL PROMOTED CRYPTO OVER MY RECOMMENDATION.** I had argued against on evidence (62.8% of its
  ties already in CU, p_max 0.23 vs CU 0.52, 23 dyads at p>=0.10 vs 252). He had the numbers and
  ruled. **I did not re-argue -- I made the SURFACE carry the objection.** Each sector banner is
  GENERATED from the producer's measured meta, never restated by hand, and states the universe
  method, that press/committee/social/co-appearance layers are NOT applied, the engine floor against
  CU, and the isolated-member count. Crypto says plainly that **233 of 533 members have no tie and
  engine output for them is uninformative**. **That is the pattern when a ruling runs ahead of the
  evidence: build it, and put the evidence where the reader sees it.**
- **REGISTRY, NOT MORE TERNARIES.** `moneyball_core.NETWORKS` holds per-config facts once; the
  census warned 3 configs already meant ~15 hardcoded sites and four N-way ternaries, which is how
  the normalized config came to fabricate its provenance string. `symmetrize` is DECLARED per config
  (not derivable from the name). Tests are registry-driven so a future config cannot skip its accept
  assertion. CU verified byte-unchanged at 2,555 dyads. Sector layouts now fail PER CONFIG (the
  holistic pair shares one try block -- one bad graph cleared both).
- **"THE LOBBYVIEW POSITIONS DATASET" DOES NOT EXIST** and the trade-association route is closed.
  The MIT bulk export's `bills.csv` is declared-but-absent, leaving issue-area codes and an
  org->member->COUNT table (never which bills). The Kim Harvard Dataverse CSV is the only
  org->bill->stance object on the box -- **congresses 111-117 ONLY** against a 117/118/119
  cosponsorship base, fatal for crypto (a 118th/119th phenomenon), and its classifier has no crypto
  or fintech side at all. The join is clean; the WINDOW is the problem.
- **TWO LATENT DEFECTS CLOSED, neither caused by this work:** (1) `run_tests.py` called
  `load_network()` UNSCOPED, so `NET_CONFIG=crypto python run_tests.py` graded the crypto graph and
  reported a PASS -- a gate silently testing something other than what it claims; now pinned to CU
  and negative-controlled. (2) `LYON` had no `p` key so co-appearance edges were skipped silently.
  **I reported (2) as actively hiding edges; it was NOT** -- shipped elay_holistic is {c:369, m:51},
  zero affected. Latent only. I passed on a scout's claim without checking the emitted codes.
- **LESSON, repeated three times this lane: a scouted number is a LEAD, not a measurement.** Crypto
  was 119 bills not 133; the CBDC family 16.4% of edge mass not 69%; the CU universe 286 bills not
  371. Reproduce before it reaches a verdict, an artifact, or Paul.
- **HUB CONCENTRATION DISCLOSED ON THE SECTOR SURFACES @d4bee058e.** Verifying the promoted crypto
  network surfaced the fact that explains it: **crypto is one giant star — Tom Emmer degree 167 vs
  second-place 25, 19.1% of all edge weight**, from a single CBDC bill with ~167 cosponsors. The
  banner stated aggregate weakness but not that; a reader told "444 member pairs" pictures a graph,
  not one member holding a fifth of it. Now measured in the producer manifest AND independently
  recomputed in the bundle (different data structures, **verified to agree exactly**), and the
  banner is generated from the measurement so it cannot drift.
  Threshold `hub_degree >= 3x second` DISCRIMINATES: crypto flags DOMINATED, **bank_reg does not**
  (Davidson 201 vs 181, 1.8% of weight — healthy). The causal clause shipped in the copy was
  VERIFIED first: seeded by descending degree crypto reaches 33, 7, 6, 5, 5, 3 while **CU does not
  collapse — French Hill at degree 90 out-reaches Emmer at 171 (121 vs 114)**.
  Kernel **159/0**, audit_full 202/1 (known culling item). Crypto engines confirmed working:
  cascade/recruit/flip all run, isolated-member seeds degrade correctly instead of crashing,
  recruit returns face-valid rosters (crypto Emmer/Lummis/Khanna/Merkley; bank_reg Emmer/Jack Reed/
  French Hill/Andy Barr). **LESSON REPEATED TWICE THIS SESSION: my probe was wrong, not the code —
  I guessed engine signatures and reported false failures. Read the signature from source first.**
- **SECTOR CLEANUP @188187398.** (a) `norm` token alias RETIRED — every JS token now equals its
  NET_CONFIG value, bundle keys renamed to match. **My stated blocker was fictional:** I claimed
  renaming would break `path4_parity.py` because it greps literal JS strings; it greps three KERNEL
  FORMULA lines and its only two "norm" hits are `os.path.normpath`. Asserted without reading.
  (b) **Augmenter split-brain the promotion CREATED** — `moneyball_core` at five configs vs a
  hardcoded three-tuple in `build_multilayer_network`, so sector configs died with a message saying
  the value was invalid. Now registry-driven and refuses sectors WITH the reason (media corpora are
  CU-scoped); that refusal is the basis for the "COSPONSORSHIP ONLY" banner.
  (c) **THIRD unintended production write this session — `import == execution`.** Importing the
  augmenter to test its guard wrote holistic_network_AUG_20260819.xlsx (content-identical to the
  reviewed file, sha a437dd6d, but newest-by-mtime had already displaced it in selection). Moved to
  backups/accidental_20260819/, not deleted; selection restored. **Three occurrences = resolutions
  do not work, so the fix is structural: NET_VALIDATE_ONLY=1 exits after the verdict, writes
  nothing.** Its own negative control then caught that the early exit sat ABOVE the sector refusal.
  Kernel 159/0, audit 202/1. Five configs verified live, no console errors.
- **PATH-4 KERNEL MIRROR: ALL FIVE CONFIGS, AND IT NOW RUNS @a04a17625.** The guard that
  `moneyball_core.build_P` and the dashboard JS compute the same p was (a) **never invoked** — it
  predates the `test_*.py` discovery glob — and (b) covered two configs with a blanket `n >= 1000`
  edge bar, which **crypto (888 edges) would have failed for being SMALL rather than wrong**.
  Registered by explicit path (kernel 159 → **160**); bar replaced with a COMPLETENESS assertion
  (every directed edge loaded must be checked — strictly stronger, density-neutral); registry-driven
  so a new config cannot skip it. **The mirror holds EXACTLY on all five: cu 5,110, holistic
  127,414, holistic_norm 63,707, bank_reg 9,484, crypto 888 — all at max|dp| 0.000e+00.**
  Negative-controlled both directions (perturbed DCROSS → 5/6 fail, exit 1; simulated template drift
  → caught). Kernel 160/0, audit 202/1.
- **CONFIG AUDIT + DIAL CATALOG @48560ae4f.** `fec/audit/**` had ZERO NET_CONFIG references while
  five networks shipped; 31 artifact-only checks added (**audit_full 202 → 233**, same known culling
  failure). **In BOTH halves the drift-detector was itself broken:** (a) my new family-separation
  check asserted the picked filename `startswith` the glob's own prefix — tautologically true, could
  never fail; a negative control caught it (8 planted defects, 7 detected, 1 missed) and it is now
  tied to published provenance. (b) The dial catalog's own refresh command
  `Get-ChildItem fec\*.py, fec\tests\*.py` matched **14 of 638 files** after the 2026-08 reorg, so
  anyone following it re-confirmed a 13-dial world; repaired it finds **467 read sites vs 16**.
  **LAW: when a catalog has drifted, repair the tool meant to catch the drift FIRST.**
  Census: 239 dials / 443 sites / 169 files, catalog documents 96 — the ~140 gap is now stated in
  the catalog itself. Producer defects fixed: a false "registry-driven" comment over a hardcoded
  tuple, PINNED CU comparators rendered into the sector banners, and CU carrying no provenance.
  **PRECISION TRAP worth remembering: comparing CU at round-4 when the bundle stores round-3 shows
  2,214/2,555 spurious mismatches and reads as catastrophic drift.** Kernel 160/0.

<!-- appended 2026-08-23 by the email-package lane (worktree intelligent-grothendieck-2171e7; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- EMAIL-SAFE PACKAGE BUILDER BUILT + VERIFIED, committed 778f6abc8 on
  claude/melange-email-compartmentalized-8809c0 (atop main 6540cc731), mirror-pushed, UNMERGED --
  merge/deploy = Paul. Paul asked for "a compartmentalized version of the melange system that can be
  sent over emails". MEASURED: Moneyball.html 46.05MB / cu-member-desk.html 40.55MB raw exceed every
  provider cap (Gmail 25 / Outlook + iCloud 20MB on the ENCODED message, x1.37 base64), but all 8
  standalone surfaces are fully self-contained (0 fetch/XHR, verified) and cross-linked by relative
  filename, and they DEFLATE HARD: whole family = ONE 12.5MB zip; all-in-one Moneyball.html = 10.44MB
  zip. fec/surfaces/make_email_package.py packages the DEPLOYED surfaces byte-identical (zero
  transformation, so [[ledger/melange-systems-brain/DE-004|DE-004]] is never engaged and packaged numbers ARE the deployed numbers) into
  FFD-packed deterministic zip parts (FIXED_ZIP_TIME precedent) under EMAIL_MAX_MB (default 14; at 10
  the family splits 9.98+2.52; under ~9.3 it REFUSES -- the desk deflate floor), each part carrying a
  README + sha256 of every file, plus a manifest. Not a chain step; consumed by nothing; writes only
  EMAIL_PACKAGE_OUT. VERIFIED: round-trip 9/9 sha256 byte-identical to deployed; zips byte-identical
  across runs; 5MB negative control fired (exit 1); py_compile clean; kernel gate LIVE TREE 160/0.
  A worktree gate run read 152/8 -- DIAGNOSED, not waved: all 8 are the documented
  worktree-data-plane artifact (e.g. test_bill_collision_guards dies on the worktree's absent
  gitignored data\legislation\bill_directions.csv); the live-tree discriminating run is the verdict.
  Built packages sit at <worktree>\outputs\email_package\ (untracked). OPEN FOR PAUL: (a) part budget
  -- 14 default clears Gmail/Outlook/iCloud; hard 10MB corporate caps still work today (2 parts) but
  the desk's 9.2MB deflate floor grows with the desk (27->40.5MB in ~5 weeks), and any budget under
  it needs the DESK-SPLIT extension (D.members payload subsetting; members = 34.7 of 40.5MB -- design
  scoped, deliberately NOT built, gated); (b) family vs all-in-one vs both; (c) whether
  "compartmentalized" also meant SEALED (lock_dashboard-style AES) or content-stripped need-to-know
  lite -- the gzip-inside-AES envelope makes a locked all-in-one ~14MB (vs ~61MB with today's
  lock_dashboard, whose base64-of-ciphertext does not compress), but in-browser file:// decrypt is
  UNVERIFIED in-harness (browser pane renders local files as static data: snapshots -- new harness
  limit observed); 10-second Paul probe at <worktree>\tmp\probe_locked.html, password [REDACTED 2026-10-10 — password rotated; see %LOCALAPPDATA%\Melange\dashboard_password.txt].
  fec/[private — see knowledge vault] still ABSENT -> no box-side send capability (activation stays TABLED per Paul
  2026-08-09; noted here only because this lane is the email lane). Dials to register in
  moneyball-config-and-flags on merge: EMAIL_MAX_MB / EMAIL_PACKAGE_MODE / EMAIL_PACKAGE_OUT.
- ADDENDUM 2026-08-23 (same lane): Paul said "Give me the folder" -> packages EMITTED to the live
  tree at outputs\email_package\ (both zips + manifest, sha256-verified byte-identical to the
  worktree-built set; new dir, clobbered nothing). Branch still unmerged; other gates still open.

<!-- appended 2026-08-24 by the UI-improvements lane (worktree infallible-chebyshev-c1f6cd; pure additive append; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- UI TASTE AUDIT RUN 2026-08-24 (read-only, options presented to Paul, ZERO edits): the 2026-08
  retheme + simplification hold up; findings are at the edges. VERIFIED DEFECT, not taste: the
  locked front door is STALE AND OFF-LAW — root index.html is a 2026-06-29 lock build (5.5MB,
  June-vintage payload) and deploy\index.html is 2026-07-16 (25.5MB), both predating the retheme,
  the UI simplification, and ~2 months of data; the lock template itself (fec/surfaces/
  lock_dashboard.py WRAP, lines 23-26) still ships the old GitHub-dark theme (#0d1117/#1f6feb) and
  VISIBLE "Moneyball Dashboard"/"Moneyball — locked" text, contrary to the 2026-08-06 visible-
  text=Melange ruling (CONSTRAINTS: Audience). Re-lock = Paul's action (password prints to
  console). Also measured: the dashboard + desk templates lag the lobby family's platform baseline
  (no color-scheme:dark, no prefers-reduced-motion in either tpl; dashboard seg buttons have no
  hover state; desk ranked-table headers not sticky); desk carries off-token gold chrome
  (#d4a017/#eab308 staff-star UI; .pinbtn #fbbf24 is SPLIT-ROLE — also TIERCOL tier-1). Options
  menu with Paul; any colour work is bound by the split-role census + CVD + per-surface contrast
  law. Harness re-confirmation: browser pane still does not composite (screenshots refused);
  audit was code-level + accessibility-tree.

<!-- appended 2026-08-24 by the UI-improvements lane (part 2: compact core built; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- COMPACT-CORE MOCKUPS BUILT + VERIFIED 2026-08-24, ALL IN SCRATCHPAD, ZERO repo/live-tree edits
  (Paul ruled "option B" on the lock door, then asked for compact + wow + animated across the
  network, member profiles and lobbying profiles). MEASURED CHROME, not estimated, at 1280x720:
  dashboard 221px -> 88px (canvas 72% -> 88% of viewport); lobby 164px -> 48px (first data section
  pulled up 88px, bar now sticky); desk header 160px + ranked-table headers made sticky.
  Dashboard bar wrapped to 161px because NINE control groups / 37 seg buttons render permanently;
  the six that govern HOW the graph draws (Mode/Posture/Color/Tier/Layout/Layers) move into a
  View-options popover by MOVING the existing DOM nodes, so every handler survives -- engine
  self-check still reads flip 2.10 = py 2.10 in the patched file.
- LOAD-BEARING MEASUREMENT: the 41MB member desk is 99% ONE payload script (42,394,902 of
  42,983,257 chars); CSS is 20KB, DOM only 12,446 nodes, forced layout 0.1ms, load 2.0s. The desk's
  weight is DATA AT REST, not render cost -- so animation there is affordable. This retires the
  main standing objection to animating the desk.
- TWO REAL BUGS FOUND BY VERIFYING RATHER THAN INFERRING. (1) A <head>-injected enhancement script
  silently no-ops: body does not exist yet, every getElementById returns null, and the whole feature
  reports success while doing nothing -- must defer to DOMContentLoaded. (2) CANVAS LATCH: resize()
  sizes the canvas FROM #netwrap (tpl:264), and a grid item defaults to min-height:auto, so wrapper
  and canvas ratchet each other larger on every resize -- measured 978 -> 980 -> 981px inside a
  712px row, overflowing the viewport. Fix = #netwrap{min-height:0;height:100%}; overflow:hidden
  was tried first and REJECTED as a clipping risk that cannot be visually confirmed in-harness.
- SPLIT-ROLE COLOUR LAW SATISFIED MECHANICALLY (not asserted): colour-multiset diff of each mockup
  vs its deployed original shows ZERO literals REMOVED on all three surfaces, additions confined to
  the ratified warm palette, and ZERO data-role literals with changed counts. Desk additionally
  proven by byte-identity: stripping the 1,013-char injected block reproduces the deployed 41MB file
  sha256-exact.
- ADOPTED THIS SESSION AS THE WOW/LAW ARBITER -- "THE ASSERTION TEST", derived by re-reading the
  originating session (0a757a0d) rather than from memory: gallery 1 was rejected for COPY ("fancy
  pitches... recommendations"), gallery 2 was fully law-compliant and STILL rejected ("These look
  awful") because it was skeletal, gallery 3 was accepted at full fidelity. So RANKINGS-AND-DATA-ONLY
  governs ASSERTION, not craft; raising fidelity is what won selection. Paul separately ratified
  motion post-law ("Option 1, with the animated transition", b9ff46982). The rule: every visual
  property is either CHROME (constant across its class) or ENCODES: property = f(field) with a stated
  monotone rule -- nothing in between; one quantity one channel; fold-never-drop; and for motion,
  truth-in-tween / caused-by / static-equivalence. Prohibits count-up numerals, load staggers on data
  rows, ambient loops, glow bound to a score, auto-tour. PROPOSED, NOT RATIFIED -- Paul's call.
- PRE-EXISTING FINDING (measured, NOT caused by this lane): 2 of 9 .honesty blocks on lobby-network
  sit INSIDE <details> (the year-filter resolver note and the bank-tier units note) -- identical
  counts in the untouched deployed page. Both live inside the bank-tier fold Paul ratified 2026-08-11.
- CORRECTION OF RECORD: this lane earlier told Paul the lobby "Melange · ..." title separator was an
  inconsistency against an em-dash convention. WRONG -- all six lobby-family pages use · and all three
  dashboard-family pages use —; it is a family convention. That Option-2 item is WITHDRAWN. The real
  outlier stands: index.html is the only surface whose visible title still says "Moneyball".
- HARNESS LIMIT RE-CONFIRMED, now with a second failure mode: the browser pane not only refuses
  screenshots, it HANGS (30s timeouts) on the 41MB desk and on any probe that forces repeated
  full-canvas redraws. Static verification (curl status, colour-multiset diff, sha256 byte-identity)
  is strictly more reliable here than DOM probing, and was used for the load-bearing claims.

<!-- appended 2026-08-24 by the UI-improvements lane (part 3: fan-out adjudicated; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- DESIGN FAN-OUT ADJUDICATED 2026-08-24 (9 agents, 8 done, 1 FAILED: the "rail + bento" direction
  died on a 403 auth error and NEVER produced a spec, so the judges compared TWO directions, not
  three -- do not read the verdict as a three-way result). Judges scored COMMAND BAR 8/8/8 vs
  CANVAS-FIRST 6/10 on brief-fit, law-compliance and buildability.
- THE FAN-OUT CAUGHT A REAL DEFECT IN THIS LANE'S OWN MOCKUP, which is why it was worth running:
  **`id=netwrap` is DUPLICATED in the dashboard template** -- tpl:121 is the Network control span
  in the bar, tpl:152 is the canvas wrapper. So `getElementById('netwrap')` returns the BAR SPAN,
  and a `#netwrap{...}` rule silently styles a bar control too. This lane's earlier "the wrapper is
  24px" reading was the bar span, not the wrapper; the mockup now tags the real wrapper from
  `cv.parentElement` and keys on `.mel-netwrap`. Proven live: `cv.parentElement !== getElementById('netwrap')`.
  PRODUCER HAZARD for any future fix: renaming the bar span requires updating the getElementById at
  tpl:1269 or the Network config control never appears.
- SECOND SELF-CAUGHT REGRESSION, same class as the first: moving the wrapper height into a
  JS-added class meant the canvas needed a re-measure, dispatched inside requestAnimationFrame --
  and rAF fires ZERO frames in this harness (and is throttled in background tabs), so the canvas
  sat stale at 340px = 47% of viewport. Every deferred re-measure or tween now RACES rAF against a
  timer and hard-clears. LAW: on this box, never let rAF be the only path to a correctness step.
- VERIFIED WIN ADOPTED FROM THE FAN-OUT (reproduced independently before adopting, per the
  scouted-number law): **the lobby `.hero` is a LAYOUT BUG, not a design choice.** `.hero` (:3253)
  and `.hero-stats` (:3256) are display:grid but `grid-template-columns` is declared ONLY inside
  `@media(max-width:900px)` (:3356), so above 900px both collapse to ONE column and the three
  coverage figures stack. `.stat{border-right}` (:3257) proves row intent. MEASURED: hero 262px ->
  67px; combined with the 48px bar, first data section **443px -> 159px, 39% of the viewport
  reclaimed**, with all 9 nav routes, all 9 honesty blocks and the figures 2,961/8,364/97 intact.
  Affects five lobby pages.
- ALSO VERIFIED, NOT CLAIMED AS A WIN: tpl:92 `:where(button,select,input,a,.tgt,.oa) :focus-visible`
  carries a stray descendant combinator, so the intended ring never lands on the row. Repaired in
  the mockup BUT the template has **zero `tabindex` occurrences**, so .tgt/.oa cannot take focus at
  all -- the repair is PREPARATORY, not a shipped accessibility gain. Making it operative is a
  producer behaviour change and was deliberately not done.
- LANDMINE RECORDED: `make_member_desk_00.tpl:6` defines `--blue:#D2A63C` -- a token NAMED blue
  holding GOLD. Any re-tokenisation pass that trusts the name detonates.
- COUNTERINTUITIVE MEASUREMENT worth keeping: a full-bleed floating-panel dashboard is NOT
  automatically bigger. `fit()` (tpl:265) is `min(W,H)/1000*0.96`, so the SMALLER dimension binds;
  floating side rails inset width to 688 and node scale lands at +7.5% -- BELOW the flat-console
  layout's +12.1%. The immersive layout only wins after the user collapses the rails (+28.6%).
  The "+38.3%" figure proposed in one direction is arithmetically unreachable (needs h=800, which
  the 44px bar forbids).
- SCOPE CORRECTION for any future UI lane: this is **8 pages / 5 producers**, not 3 surfaces --
  `make_lobby_interactions_html.py` HAND-DUPLICATES the header CSS (:561,:656) and markup
  (:673-674). And `make_combined.py:133` uses re.search, so it reads only the FIRST <style> of the
  dashboard and desk: a second appended <style> block is SILENTLY DISCARDED from Moneyball.html.
  That is why the demo path is injection, not producer edits.

<!-- appended 2026-08-24 by the UI-improvements lane (part 4: Variant B built + latency measured; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- PAUL RULED: Variant B ("the live instrument") + the animated work; new asks = reduce latency,
  keep compacting. B MOCKUPS BUILT AND VERIFIED, still scratchpad-only, zero repo/live-tree edits.
  Dashboard: canvas is the ground under a fixed 44px glass bar; #bar/#left/#right float as
  94%-opaque glass (DERIVED contrast floor: alpha .86 fails AA against the brightest node fill);
  rail-aware fit() override keeps the 1000-unit box and 0.96 factor so every inter-member ratio is
  unchanged; collapsing all three rails measured +32.6% node scale, byte-exact reversible
  (cam.s 0.4461 -> 0.5914 -> 0.4461). Desk: slide-over profile VERIFIED live - ranked board stays
  visible beneath, scrollY preserved (900 -> 900 across open), Esc/scrim close, print flatten
  present. Engine self-check green everywhere; zero console errors; split-role colour proof clean.
- LATENCY MEASURED, one result NEGATIVE and recorded as such:
  (a) The 40.6MB desk's payload EVAL is 46ms - parsing was never the bottleneck; transfer+tokenize
  of the bytes dominate (~1.8s to interactive).
  (b) DEAD END - JSON.parse-wrapping the payload: 300ms vs 46ms eval, 6.5x SLOWER (V8's object-
  literal fast path beats string re-parse at 42MB). Do not re-propose; receipt = the paired
  __tD0/__tD1 instrumentation in mock-live-desk vs mock-fast-desk.
  (c) WHAT WORKS - SPLIT PAYLOAD: members carries 35.3MB of which articles=15.9MB + personal/
  industry/responsiveness_cu/psy/bills/refs/staffdir etc are PROFILE-ONLY; renderRanked and all
  its helpers touch NONE of them (audited per-function; the two apparent hits were extractor
  overshoot - stanceAt/stanceBadge are one-liners). Deferring those 14 fields + bill_lobbying to a
  sibling async script: board file 40.6 -> 2.97MB, INTERACTIVE AT 442ms vs 1768 (4x), profiles
  merge in 1ms on arrival, early member click queues and opens on landing. PROVEN LOSSLESS:
  light+heavy reunion is sha256-canonical-identical to the deployed payload; all 298 hex-looking
  tokens that left the main file (bioguide ids, #CBDC hashtags - NOT colours) are present in the
  profiles file. COST: desk becomes TWO files - a deployment-contract change aligned with the
  email lane's gated DESK-SPLIT design - so it is Paul's decision, presented as a decision mockup.
- HARNESS NOTE: the pane transferred the 39MB profiles file in 156.6s (curl: 0.16s) - hidden-tab
  network throttling; two 300s navigation hangs cleared only by closing every 40MB tab. Real-world
  timing of the split is disk-speed; the 442ms board number is the meaningful one.
- Fan-out CSS spec adopted with adaptations; my escaping first draft had a doubled-backslash bug
  (would have produced a broken 42MB string) - caught by the byte-identity round-trip check before
  any browser load. The round-trip proof is the gate for ANY payload re-representation.

<!-- appended 2026-08-24 by the UI-improvements lane (part 5: B v2 after Paul's over-optimized ruling; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- PAUL RULED on the B mockups: "over optimized" (the v1 dashboard's floating nine-group rack +
  three header Hide-buttons showed the machinery) BUT "Love the latency fix" (the split-payload
  desk stands). LIVE DASHBOARD REBUILT AS v2: ONE 44px glass bar total (glyph + "Melange" +
  Issue/Network/Find + one View button + nav), the six view groups behind the View sheet, rails
  collapsing from chevrons on their OWN edges, NO rack. MEASURED: v2's DEFAULT node scale
  (cam.s 0.5914) equals v1's best everything-collapsed state - the gain became the default and the
  controls disappeared. At 720-height viewports min(W,H) is height-bound, so rail chevrons reclaim
  unobstructed map area rather than node scale; scale gains from collapsing appear only when width
  binds. One-bar overflow was REAL (1496px of content in a 1280px bar) - fixed by trimming the
  in-bar brand to glyph + "Melange" (COPY TRIM, needs ratification at apply time; full name stays
  in <title>) + capping the Issue select at 190px; verified scrollWidth == clientWidth == 1280.
  Colour-law clean, engine self-check green.
- Gallery updated per [[ledger/melange-systems-brain/DE-004|DE-004]]: the "+32.6% on collapse" line was v1-specific and no longer
  described the linked page - swept, not left standing. Split desk is now the flagship
  member-profiles link (live-desk single-file kept as the compare).

<!-- appended 2026-08-24 by the UI-improvements lane (part 4: Variant B built + latency measured; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- VARIANT B ("LIVE INSTRUMENT") MOCKUPS BUILT + VERIFIED 2026-08-24, scratchpad only, producers
  untouched. Paul ruled: B + the animated work; then "reduce latency" + "keep going compact/sleek".
  DASHBOARD (v2 shell, one 44px glass bar): canvas edge-to-edge 1280x676 (was 794x579), default
  node scale +12.7% vs deployed (s .5555 -> .6259); Issue/Network/Find in the bar, six view groups
  behind one View sheet, rails collapse from edge chevrons; engine self-check green; RAIL COLLAPSE
  DOES NOT CHANGE SCALE AT 1280x720 - height binds in min(W,H) with no rack, confirming the
  synthesis physics; collapse buys unobstructed map, not scale. DESK: slide-over profile verified
  end-to-end (ranked list stays visible, scroll position survives openMember's scrollTo(0,0),
  Esc + scrim close, print flatten present); FLIP motion retained.
- LATENCY, MEASURED: desk payload EVAL is 46ms - parse was never the bottleneck; transfer+tokenize
  of 40.6MB is. SPLIT-DESK prototype: profile-only member fields (articles 15.9MB, personal, psy,
  bills, refs, staffdir, ... 14 fields) + bill_lobbying deferred to a sibling async script ->
  board file 40.6MB -> 2.97MB, BOARD INTERACTIVE AT 442ms vs 1768ms, merge 1ms, open-before-merge
  queues with a true status note. PROVEN: reunion sha256-identical to the original payload;
  renderRanked + all its helpers touch ZERO deferred fields (helper audit; first grep showed
  staffdir false-positives from an overshooting extractor - read the functions before believing a
  regex). COST: desk becomes TWO files - deployment-contract change, Paul's ruling required
  (rhymes with the email lane's gated DESK-SPLIT design).
- FOURTH DUPLICATE-ID BITE, new mechanism - SPECIFICITY: #netwrap{position:relative} (tpl:45, an
  ID selector) outranks any injected class regardless of source order, so the canvas wrapper
  stayed content-sized and re-latched at 340px after a 0x0 pane phase. Fix: #main > .mel-canvas
  (1-1-0 beats 1-0-0). The netwrap id rename at apply time kills this whole class of defect.
- SESSION-HANDOFF LESSON: a prior incarnation of this lane had already iterated the builder to a
  BETTER v2 dashboard shell (13:42, after my context's last read) - one bar, no rack, chevrons.
  Verified DISK-WINS before touching anything; v2 kept, my stale v1 not restored. The v2 build
  also embeds a COPY TRIM (header wordmark -> "Melange", full name stays in <title>) explicitly
  flagged for Paul's ratification at apply time.
- COMPACT CORE EXTENDED to the full 8-page surface: all six lobby-family pages (incl. the
  hand-duplicated interactions page) now carry the 48px sticky bar + hero repair; champions
  verified live (48px, 9 routes). Split-role colour proof re-run over ALL new pairs: zero
  removals, zero data-role changes; the split-desk "removed colours" were bioguide IDs and
  fragment anchors false-matching the hex regex, all 298 proven present in the profiles file.
- GALLERY REBUILT (scratchpad uiprev/mockups.html, 15 links all HTTP 200): B variants, latency
  table incl. the JSON.parse negative result, compact table, apply-time remainder list.

<!-- appended 2026-08-24 by the UI-improvements lane (part 5: Paul's live review, three fixes; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- PAUL'S REAL-BROWSER REVIEW 2026-08-24 RULED: (a) the engine self-check readout in the Live
  dashboard "needs fixing"; (b) the lobby attention-table header was "obscuring a member";
  (c) the Live (Variant B) DASHBOARD "kinda made it worse" - while the Live DESK + the 442ms
  split-board latency were liked. Treat as a per-surface selection signal: dashboard leans
  CONSOLE (the judges' 8/10), desk stays LIVE. Gallery reframed accordingly; both dashboard
  candidates remain up for the formal pick.
- DEFECT (b) ROOT-CAUSED, INJECTED BY THIS LANE: every lobby .tablewrap{overflow:auto} (:3281)
  is its OWN scroll container, so the producer's thead top:0 (:3284) was already correct; my
  blanket `thead th{top:48px}` floated the sticky header 48px INTO the wrap, covering the first
  visible member row. FIX = delete the override (verified back to top:0 live). LAW worth keeping:
  a sticky offset is only meaningful relative to the element's ACTUAL scroll container - never
  set one globally when wraps create their own.
- DEFECT (a) FIXED: the prior iteration had moved #engchk into the map field (left:268px) with a
  glass box. Restored to the template's quiet 10px translucent chip, docked right of the right
  rail via --mel-R (rail-aware: follows collapse 334->54px), never in the map field. Legend keeps
  rail-aware centering but lost the glass restyle. A diagnostic receipt should whisper.
- All rebuilt + re-verified: lobby thead top:0, engchk clear of rails + quiet, canvas/scale
  unchanged (676px, +12.7%). Gallery updated; 15 links HTTP 200.

<!-- appended 2026-08-24 by the UI-improvements lane (part 6: THE APPLY; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- UI APPLY EXECUTED (Paul verbatim: "Console for dashboard, Live for desk, apply it all").
  Commit 775b21af2 on claude/melange-ui-improvements-fe55cb, FAST-FORWARD MERGED to main in the
  live tree (6540cc731 -> 775b21af2). Seven files: dashboard tpl (Console shell: 44px header+bar,
  View popover holding Mode/Posture/Color/Tier/Layout/Layers; netcfg id-rename KILLS the
  duplicate-netwrap defect class; focus ring repaired AND made operative via tabindex+key
  activation; RMQ tween guard dur=1), desk tpl (Live: slide-over + scrim + Esc + print flatten;
  FLIP with rAF-starvation race; sticky thead >=1000px via overflow-x:clip; density pass;
  DSPLIT/PROFILES_TAG placeholders), make_member_desk.py (DESK_SPLIT dial, default 1, =0 =
  byte-equivalent monolith revert - PROVEN: reunion == monolith with exactly ONE differing path,
  freshness.generated_at; bundle json stays FULL for consumers), make_combined.py (inlines
  cu-member-desk-profiles.js after the desk IIFE; fails loudly on a half-split input; Moneyball.html
  stays ONE file), both lobby producers (48px sticky bar + hero repair + deliberate NO-thead-offset
  with the incident note inline), lock_dashboard.py (B2 Melange door; decrypt JS byte-identical;
  re-lock = Paul's password action, still pending).
- DEPLOYED to the live root in enforced order (dashboard -> lobby-network -> interactions -> desk
  -> combined LAST, staleness guard active): desk now ships SPLIT (cu-member-desk.html 3.0MB +
  cu-member-desk-profiles.js 38.5MB; board interactive 615ms in-harness); Moneyball.html 46.0MB
  ONE file with profiles inlined (verified: members_heavy present, hook x2 - an earlier probe
  looked for the exact string "Merge(" and false-alarmed on the =function definition; count the
  bare hook name). Backups: backups/pre-console-live-20260824/ (9 surfaces + ranks md5).
  RANKS BYTE-IDENTICAL pre/post (md5 37598fe31cba... both sides). Kernel gate running at write
  time (>10 min on a box carrying another lane's 10 npr_segment shards - identified per-PID
  before merging, none touch this repo's artifacts). audit_full queued behind it (serial, law 5).
- DIAL REGISTRATION DEBT, deliberate: .claude/skills/moneyball-config-and-flags/SKILL.md has
  ANOTHER LANE'S uncommitted edits in the live tree, so DESK_SPLIT is NOT yet in the catalog
  (never-clobber). Registration rides the commit body + this entry until that lane lands.
- Two build-time defects caught by asserts/compile, both mine: (a) inserting "+ mdprof" before an
  adjacent string literal broke Python implicit concatenation (needed a trailing +); (b) a
  bash-heredoc fix attempt halved its own backslashes and could not match - the shell-heredoc law
  held; fixed via a written script file.

<!-- appended 2026-08-24 by the UI-improvements lane (part 7: gates closed; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- UI APPLY GATES CLOSED: kernel **160 passed / 0 FAILED**; ranks_python.json **byte-identical**
  pre/post (md5 37598fe31cba both sides, checked twice - standalone and inside the gate run);
  audit_full **232 passed / 2 FAILED**, BOTH pre-existing: (1) the known Paul-gated legfix5
  culling item; (2) 'own-source channel inputs within 28 days of the corpus' - DIAGNOSED, not
  waved: social_media.db refreshed 2026-08-23 06:53 (before this lane's first live write) while
  hearings_cu/interviews_cu/bluesky_cu CSVs date 07-15/16 -> 38d behind; the tripwire armed on
  yesterday's corpus refresh; cure = the extraction run on Paul's 3-week cadence; zero collector
  code in this diff. MIRROR PUSHED (main 6540cc731->775b21af2 + the branch).
- OPEN ON PAUL after this apply: (a) re-run lock_dashboard.py to refresh the June-stale locked
  index.html onto the new B2 door (password prints to console; deploy/ copy included); (b) judge
  animation SMOOTHNESS in a real browser (harness cannot composite - logic verified, feel is
  his); (c) DESK_SPLIT catalog registration once the other lane's uncommitted
  moneyball-config-and-flags edit lands; (d) the email-package lane should note the desk is now
  TWO files (cu-member-desk.html + cu-member-desk-profiles.js) for its zip manifest.

<!-- appended 2026-08-24 by the UI-improvements lane (part 8: front door re-locked; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- FRONT DOOR RE-LOCKED (Paul: "Re-run the lock with the same password"): lock_dashboard.py run in
  the live tree with the DEPLOY.md-recorded password -> deploy/index.html 61.4MB (the fresh 46MB
  Moneyball.html under the new B2 Melange door), and the STALE JUNE-29 ROOT index.html REPLACED
  with the same build (backup: backups/pre-console-live-20260824/index.PRE_RELOCK.html). PROVEN
  closed-loop in Python: PBKDF2(250k)+AESGCM decrypt with that password reproduces the deployed
  Moneyball.html sha256-exact. The Option-1 stale-off-law front door finding (part 1 of this
  lane's arc) is now fully CLOSED: current data, Melange-visible text, animated door, same
  password. The UI apply arc is COMPLETE; remaining opens are only (a) Paul judging motion feel,
  (b) DESK_SPLIT catalog registration behind the other lane's uncommitted skill edit, (c) the
  email-package lane noting the two-file desk.

<!-- appended 2026-08-25 by the containerization lane (worktree melange-containerization-55a7d3; proposal only; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- CONTAINERIZATION PROPOSAL DELIVERED 2026-08-25 (Paul's ask: containerize + secure the whole system,
  accessible yet guarded). PROPOSAL ONLY, zero applies, zero live-tree writes. Record:
  audits/CONTAINERIZATION_PROPOSAL_2026-08-25.md committed on claude/melange-containerization-55a7d3
  (unmerged, mirror-pushed) + a published artifact for Paul. Shape: 5 layers - (1) machine-readable
  system manifest with an audit_full agreement check; (2) melange-engine OCI image (python 3.12.10
  pinned, data plane MOUNTED never baked; MONEYBALL_ROOT already makes the code container-ready;
  Excel COM / cookie-replay / OneDrive / glassbox stay host-side, enumerated; acceptance = ranks
  byte-identical container-vs-host; egress allowlist is the new security gain); (3) tiered vault:
  SOURCE (Draft Systems adjudicated universe, Quorum exports, votes CSV, social_media.db, workbook,
  gold) / SNAPSHOT (BICAM zips not the 44.7GiB extraction; ~20GiB audio cold once) / DERIVED (not
  archived - the chain is the restore route) / OPS (glassbox 12 ps1 194KB version-controlled at last,
  own-repo recommended); (4) secrets findings REPORTING-ONLY per the standing API-key ruling: both
  key files inside the OneDrive tree, 5 scripts open anthropic_key.txt directly, deploy/DEPLOY.md
  carries the lock password in plaintext (lines 8+22) AND is git-tracked + mirrored - proposed fix =
  migrate keys off-sync, rotate, re-lock, all gated; (5) quarterly restore drill with a
  corrupt-one-byte fail-closed negative control. MEASURED: pack 3.39GiB / 198 local branches (mirror
  full-push was at 174 - drift needs a re-push policy); backups 2.9GiB + tmp/orphan 1.4GiB = triage
  list; melange-data audio ~20GiB + BICAM extracted ~44.7GiB. Six decision points for Paul (OCI vs
  lockfile-only [recommend OCI], vault destination + what backs GitMirrors, secrets migration,
  glassbox home, xlsx canonicalizer hoist, triage). UNKNOWNS flagged not asserted (proposal section 8):
  db paths, Mentat-remote reading, lda_rebuild size vs census, GitMirrors backing, X-collector trigger.

<!-- appended 2026-08-25 by the containerization lane (refresh-agent fix arc; Paul: "augment and fix the refresh agents"; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- REFRESH-AGENT FIX + AUGMENT EXECUTED 2026-08-25 (Paul-ordered APPLY). ROOT CAUSES diagnosed before fixing:
  (1) weekly refresh had not COMPLETED since 2026-07-19 - 07-26/08-02/08-23 all hard-aborted at the terminal
  audit step (audit_full sys.exit(1) -> run_pipeline exit 1 -> hard abort) and failed SILENTLY
  ([private — see knowledge vault] absent, still Paul's step). (2) The three CU channel extractors
  (fec\stance\extract_cu_{hearings,interviews,bluesky}.py) are ORPHANED - no runner anywhere - so their
  CSVs aged 38d and tripped the 28-day audit tripwire. (3) monday_x_collector.py died at startup every run
  since 08-10 on the pre-reorg legislators_social_media.json root path (last_success_utc null).
  (4) artifact_freshness.py DEPS predated the reorg - 6 phantom MISSING.
  FIXES (live tree carries identical bytes UNCOMMITTED per the amazing-cray precedent; committed on
  claude/melange-containerization-55a7d3, mirror-pushed; merge = Paul): weekly_refresh.py gains a
  FAIL-CLOSED tolerance gate (allowlist = exactly the culling check name; ast.literal_eval parse + tally
  cross-check; novel failures still abort; own-source and roles names deliberately excluded), a chain-tail
  guard (textual CHAIN parse; tolerance refused unless audit_full.py is the LAST chain step - the one
  invariant tolerance depends on), glassbox emission via shipped surfaces/glassbox_emit.py + atomic
  data\engine\weekly_refresh_status.json marker, and the three extractors wired as tolerant steps between
  the interview collectors and big5_traits. X collector: _resolve_repo_path (data\stance first, legacy
  fallback), user-scope twin synced. artifact_freshness.py: 9 paths remapped, runs 0 MISSING.
  VERIFIED: 26/26 gate negative controls, 3/3 chain-tail guard controls, AST ordering checks, independent
  verifier pass. Scheduled task ALREADY had StartWhenAvailable+WakeToRun (no-op write declined); the 08-16
  no-start matches the NPU BSOD window; TaskScheduler Operational log is DISABLED (enabling = Paul option).
  CSVs regenerated same day (hearings 775->790 passages; 7 backups under backups\). AUDIT 230/4, all four
  documented: culling (known gated), sidecar-identity + transcript-appendix (TRANSIENT
  fresh-extract-over-stale-stack state, self-heals at the next chain run), vote_category_lean staleness.
  V-1 VOTE-LEAN REFRESH BLOCKED AT PAUL'S STEP: votes\cu_rollcall_votes_clean.csv is an external
  manually-cleaned export with NO in-repo producer; the official-rollcall lane is contractually barred from
  writing production vote_category_lean.json; the frozen artifact predates the 07-09 producer fixes (9/17
  categories, both ANTI categories absent) so a real refresh WILL move Path V / per_category_stance - a
  rank-delta gate is required when the CSV lands. UNTIL THEN the vote-lean check keeps failing honestly and
  WILL ABORT the 08-30 Sunday refresh (deliberately not allowlisted; mtime-touching refused). Backup
  vote_category_lean.PRE-V1-20260825.json kept although nothing mutated.

<!-- appended 2026-08-25 by the containerization lane (refresh arc part 2: two ratifications + two live runs; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- REFRESH ARC PART 2, 2026-08-25 evening. TWO PAUL RATIFICATIONS (both via the in-session interactive
  approval UI, recorded here because the approval lives in the session, not in the code): (a) the V-1
  vote-lean audit check ADDED to weekly_refresh's KNOWN_GATED_FAILURES - the audit check is UNTOUCHED and
  keeps failing visibly; UN-GATE when votes\cu_rollcall_votes_clean.csv lands and V-1 runs (rank-delta gate
  required then); (b) ADJUDICATED_RETIRED ledger in fec\stance\own_source_stance_model.py retiring exactly
  three gold ids.
- V-1 REMAINS BLOCKED AT PAUL'S STEP and this is now fully diagnosed: vote_by_category.py's only roll-call
  input is an EXTERNAL manually-cleaned export with no in-repo producer; the official-rollcall lane is
  CONTRACTUALLY BARRED from writing production vote_category_lean.json (fec\OFFICIAL_ROLLCALL_SOURCE_
  CONTRACT.md:36-38). The frozen artifact PREDATES the 2026-07-09 producer fixes (V-2/V-3/V-4): it covers
  9 of 17 categories and BOTH ANTI categories are absent - the exact footprint of the V-2 last-write-wins
  clobber. So a real V-1 refresh is NOT cosmetic: it feeds per_category_stance -> compute_pillars and the
  say-do Path V, and WILL move ranks/tiers. Also measured: the staleness is AGE-ONLY - the Jun-24 and
  Aug-25 bills archives produce IDENTICAL bill2cat mappings (468 bills), so nothing has drifted on the
  bill side. mtime-touching to clear the flag was REFUSED.
- GOLD-BINDING FAILURE FOUND, DIAGNOSED, ADJUDICATED (the deepest finding of the arc). Wiring the three
  orphaned CU extractors into the refresh caused the FIRST re-extract since 2026-07-15, which orphaned
  hand gold: x3d57678f72eb (B001282 Barr 2022-04-27) + xc9c69e3250ca (W000812 Wagner 2025-02-05), both
  gold_stance=SUPPORT, and x0ed867384910 (S001200 Soto 2025-07-25, neutral, a literal I-4 highway
  interchange post). MECHANISM PROVEN, not inferred: passages are BYTE-IDENTICAL in social_media.db and
  the ids reproduce exactly; they are dropped by extract_cu_*'s drop_nocat gate because
  media_rules._category_matches - a precision guard added 2026-07-16 22:02 in commit 391a4a8b5, HOURS
  AFTER both the CSV vintage and the gold freeze - vetoes CU-Bank Competitive Dynamics on "community
  bank" text lacking CU/big-bank context, and vetoes road-sense Interchange. Counterfactual against the
  pre-guard module routes all three cleanly. A ~40-day-LATENT code change, materialized by the first
  re-extract. CENSUS: 3 blocking orphans across 2 channels (hearing 2, bluesky 1); interview 0; speech's
  2 were already covered by the sanctioned retired_precision_orphan path. The error message names only
  the FIRST channel to raise, so bluesky was invisible until the census - fixing hearing alone would have
  re-raised immediately. LOAD-BEARING: the sanctioned path could NOT have released the hearing rows even
  extended by channel - they are DIRECTIONAL gold and its contract is "directional gold remains
  fail-loud"; that is why Paul ruled a per-id ledger instead of relaxing the guard.
- LEDGER DESIGN (Paul chose it over three alternatives incl. a router carve-out and a full revert):
  in-code ADJUDICATED_RETIRED dict (git-tracked, survives fresh clones), channel-matched, loud per-row
  skip log, rows NEVER trained on, every other id STILL fail-loud, and a stale-entry notice if a retired
  id ever binds again. Controls: 4 required + 2 adversarial (a hearing ledger id planted in the bluesky
  queue still BLOCKS - the channel match is load-bearing; a deleted gold row stays silent rather than
  falsely claiming "binds again"). OPEN RISK RECORDED, not fixed: input_fingerprint() hashes data files
  only, so a future ledger-only edit will NOT invalidate own_source_stance_model.joblib - pre-existing,
  but the ledger makes it more reachable. Folding the ledger into the fingerprint forces a retrain and
  is Paul's call.
- TWO LIVE REFRESH RUNS, both instructive, neither reaching the tolerance gate:
  RUN 1 (15:43-16:52) died 62s into FULL PIPELINE on the gold guard - and PROVED the fail-closed design:
  _audit_failures logged "not a readable audit failure report ... abort stands", i.e. a PRODUCER CRASH
  WAS NOT LAUNDERED into a tolerated audit dissent. Ranks byte-unchanged.
  RUN 2 (20:57-22:44) cleared the gold guard (both stance stacks completed; 44 of 48 chain steps) and
  died on the WRAPPER's 3000s timeout, 90 seconds from done, killing make_member_desk mid-flight. That
  left a PUBLISHED-BUT-UNAUDITED PARTIAL STATE: ranks + workbook + dashboard rewritten, desk built by a
  NESTED subprocess inside build_primacy_surfaces.py and therefore missing 5 lobbying inputs that ran
  AFTER it, Moneyball.html stale at 14:13, audit never run. CAUSE was capacity, not code: ~2.5 of 8 cores
  saturated all evening by another lane's three sunday_segment whisper shards (reference layer 356s
  historical -> 437s -> 900s TIMEOUT).
- HEALED by running the chain directly (idempotent, no wrapper timeout, rebuilds desk after its inputs and
  combined last, ends in the audit). The desk needed 147s - 3.5x the 42s the wrapper had left, which is
  the proof the timeout alone caused the abort. VERIFIED MTIME ORDER (live-tree Get-Item, 2026-08-25
  local): industry_tiers.json 23:15:30.771 -> org_mentions\mentions.json 23:18:11.170 ->
  bill_lobbying_sidecar.json 23:18:57.367 -> cu-member-desk.html 23:21:23.771 (desk now built AFTER all
  three lobbying inputs it reads, healing the inversion) -> Moneyball.html 23:21:27.417, the newest
  artifact of the whole run.
  FULL PIPELINE timeout RAISED 3000 -> 7200s (hung-chain protection kept, finish-line kill removed).
  AUDIT VERDICT: FULL-BODY AUDIT — 232 passed, 2 FAILED. FAILURES:
  ['vote_category_lean.json fresh vs bills archive (manual frozen input; see V-1)', 'culling surface
  reports the hash-bound production promotion state'] - both are the two documented, expected items;
  the tally line was captured via a standalone re-run of audit_full.py (read-only-safe, law 8) against
  the unchanged post-chain artifacts, since the live chain's own audit step only had its last stdout
  line (the FAILURES list) captured by glassbox - the two FAILURES lists match exactly.
- RANK ACCOUNTING (enumerated, never waved): the healing chain reproduced the 22:03 rank file
  BYTE-IDENTICALLY (0 movers; the chain's own guard printed "official rank authority byte-identical" -
  two independent witnesses, determinism intact). Versus the 13:09 PRE-refresh vintage the day moved
  107/533, of which 105 are +/-1 or +/-2 ordinal churn (426 unchanged); only TWO are substantive:
  RAPHAEL WARNOCK 313->297 (-16), consistent with tonight's CNN ingest of +13 of his turns, and BARRY
  LOUDERMILK 29->26 (-3). Data-driven, not defects - but Warnock is the one for Paul's eye.
- STILL OPEN AFTER THIS ARC: (1) the TOLERANCE PATH ITSELF IS UNPROVEN LIVE - neither run reached the
  audit tail through the wrapper, so "KNOWN Paul-gated audit items - refresh continues" and the
  chain-tail guard have only control-harness evidence; the 08-30 Sunday run is the real test. (2) V-1
  needs Paul's CSV. (3) The ledger/fingerprint gap. (4) fec\[private — see knowledge vault] still absent - glassbox
  events + the status marker now carry refresh health instead. (5) The three exemption log lines are
  STRUCTURALLY UNCAPTURABLE in the refresh log (step() and run_pipeline both keep only the last stdout
  line) - verified by substitute evidence instead; worth knowing before anyone hunts for them.

<!-- appended 2026-08-25 by the containerization lane (refresh arc part 2 amendment; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- AMENDMENT (same session, Paul: "raise the reference layer timeout too"): the reference-layer rebuild
  step in weekly_refresh.py raised 900 -> 2400s, closing the second half of the timeout finding. Its
  900s cap fired during run 2 under the same contention that killed FULL PIPELINE, and because NO AUDIT
  CHECK COVERS member_references.json freshness, the resulting staleness was SILENT - the 232/2 audit
  read green while the desk and dashboard consumed a 16:51 reference vintage. The artifact itself is
  still stale as of this entry: re-running member_reference_layer.py --rebuild is cheap and cache-only
  but propagating it means another chain pass, so it stays PAUL-GATED. Timeout set now visible in one
  place: collectors 3000, reference layer 2400, FULL PIPELINE 7200. Committed on
  claude/melange-containerization-55a7d3, mirror-pushed, live tree carries identical bytes uncommitted.

<!-- appended 2026-08-26 by the containerization lane (reference-layer rebuild + propagation; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- REFERENCE-LAYER REBUILD + PROPAGATION EXECUTED (Paul-ordered, 2026-08-26 01:03-01:38). Rebuild
  01:03:19-01:12:01 (522s, exit 0), then a full chain 01:13:28-01:37:59 (24m31s, 48 steps, one
  documented skip = build_district_industry on the absent LODES panel). AUDIT 232 passed / 2 FAILED --
  the same two documented items (vote-lean + culling). member_references.json 16:51:37 -> 01:12:01
  (sha D44B44E2.. -> 86CCAE8A..); backup backups\member_references.PRE-REBUILD-20260826.json.
  MTIME INVERSION CLEARED: member_references 01:12:01 < dashboard_data 01:25:36 < industry_tiers
  01:28:28 < org_mentions 01:31:59 < sidecar 01:32:36 < profiles.js + desk 01:34:45 < Moneyball.html
  01:34:48 -- every consumer now postdates the reference layer.
- **--rebuild PROVEN $0 AT SOURCE (do not re-litigate; the weekly-refresh comment is accurate):**
  fec\members\member_reference_layer.py gates the API-key load, the anthropic import AND the client
  construction behind `if not REBUILD` (:190-196); `todo = [] if REBUILD else [...]` (:225); the whole
  ThreadPoolExecutor sits behind `if todo:` (:246), so work()'s client.messages.create (:238) is
  unreachable. moneyball_core imports no HTTP library. Banner prints "REBUILD (cache-only, $0)".
  Single write target: member_references.json via dump_atomic (:286-289) -- the cache file is opened
  append-only INSIDE the `if todo:` branch, so a rebuild cannot touch it. Dials: REF_DYAD_CAP=4,
  REF_WORKERS=8 (scored path only).
- **THE RANK SWAP WAS THE CALENDAR, NOT THE DATA -- THE LESSON THAT OUTLIVES THIS RUN.** Ranks moved
  2/533: Jon Ossoff 331->330 and Mark Messmer 330->331 (md5 ab215461ebb5bebb8798a6b15c65510a). The
  reference layer is CAUSALLY EXCLUDED: none of the 15 chain steps up to and including compute_pillars
  (the rank authority writer) reads member_references.json -- its only consumers are
  build_dashboard_bundle.py:182 (step 29), make_member_desk.py:220 (step 47) and audit_full.py:914, all
  DOWNSTREAM of the rank write. Real cause: fec\stance\build_media_blend.py:37 `TODAY=date.today()`,
  :92 `age=(TODAY-date)/365.25`, :100 `decay=0.5**(age/HL)` -- the 23:04 chain ran with TODAY=2026-08-25
  and this one with 2026-08-26. PROOF: 187 of 10,680 numeric 'Press Release - Raw' cells changed while
  every source corpus is byte-unchanged (social_media.db 08-23, WAL 21:08:44, press CSV 06-30, Quorum
  xlsx 07-14), the sheet's own stamp cell flipped 08-25 -> 08-26, and the two prior chain-start workbook
  backups (both TODAY=08-25) differ in EXACTLY ONE CELL, the stamp string. The pair sits on the
  7th-smallest of 532 adjacent score gaps (margin 7.58e-06), and press is the only term that can move
  them (their leg/dem pcts are quantized to 1/532 = 0.00188 steps, inf is 0.0 for both; pcts.press is a
  global rescale, identical 1.28374 ratio for both). **STANDING CONSEQUENCE: any two chain runs that
  STRADDLE MIDNIGHT will churn near-tied adjacent ranks. Never read that as a regression -- check the
  media-blend stamp cell first.**
- **THE PROPAGATION'S CONTENT PAYLOAD WAS NIL, stated honestly:** the rebuild's ONLY delta was
  n_raw 23970 -> 23971 (one edge, Mark Pocan -> Tammy Baldwin 3->4, from the 16 new CNN/PBS turns);
  edges 7972, members 520, speakers 495, targets 502, n_scored/pos/neg/neu ALL unchanged. Neither
  surface reads n_raw (make_member_desk.py:227 packs net/n_scored/pos/neg/quote;
  build_dashboard_bundle.py:185 gates n_scored>=2 and uses net; n_raw appears ZERO times in the 39MB
  profiles.js). So the repair is real in VINTAGE terms and empty in CONTENT terms -- the surface byte
  changes came from the press-decay rollover and the rank swap. Worth knowing before anyone bills a
  future rebuild as a data refresh.
- **OPEN DRIFT FOR PAUL (the finding the rebuild exposed): 2,434 of 20,186 target contexts (12%) are
  UNSCORED and count in n_raw only, and the Fable valence cache is dated 2026-07-07.** Every rebuild
  since has re-aggregated a July scoring pass over a corpus that keeps growing. Closing it requires
  `--score`, which is PAID and stays manual -- Paul's authorization, not a maintenance run.
- CORRECTION OF RECORD: the stale 16:51:37 member_references.json was the 15:43 refresh's SUCCESSFUL
  product ("reference layer (rebuild) OK 437s"); it was the 20:57 refresh whose step logged
  "TIMEOUT after 900s -- continuing" at 21:54 and never rewrote it. Also confirmed at source that NO
  audit check covers this artifact's freshness: audit_full.py:914-918 is schema+floors only and :908
  says so deliberately -- which is why the 232/2 audit read green over a stale reference layer.
- METHOD CAVEAT for anyone repeating the workbook comparison: openpyxl `data_only=True` reads None for
  formula cells, so 'Press Release - Normalized' (16.7% populated), 'Rank & Allocation' (28.7%) and
  'Blended Model' (3.8%) compare VACUOUSLY. The conclusions above rest only on genuinely populated
  sheets. Also recommend snapshotting the whole ranks_python.json (not just the rank map) before any
  future propagation, so pillar values can be diffed directly instead of reconstructed from backups.

<!-- appended 2026-08-26 by the containerization lane (MERGE TO MAIN; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **CONTAINERIZATION + REFRESH-AGENT ARC MERGED TO MAIN @41656d2d8** (Paul: "merge the branch to
  main"). FAST-FORWARD from 775b21af2 -- main had zero commits the branch lacked -- so no merge commit
  exists and `main` now IS the branch tip. Mirror pushed (ls-remote == local main). FOUR commits landed:
  the containerization proposal (0bc1bdeb5), the refresh-agent fix batch (f65515d12), the vote-lean
  allowlist + adjudicated gold ledger (23b66f17b), and the reference-layer timeout raise (41656d2d8).
  FIVE files: audits/CONTAINERIZATION_PROPOSAL_2026-08-25.md (new), fec/weekly_refresh.py,
  fec/stance/own_source_stance_model.py, .claude/skills/grok-companion/scripts/monday_x_collector.py,
  .claude/skills/moneyball-diagnostics-and-tooling/scripts/artifact_freshness.py.
  POST-MERGE GATES: **kernel 160 passed / 0 FAILED**; ranks_python.json md5 ab215461eb.. UNCHANGED
  before and after (a merge runs no producer -- verified, not assumed); py_compile clean on all four
  scripts; the proposal doc lands at 12,723 bytes / valid UTF-8.
  SHARED-TREE SAFETY HELD: the merge's complete changed-file set (5) was enumerated BEFORE merging and
  proven to have ZERO intersection with the other lanes' uncommitted work in the live tree; a
  programmatic before/after `git status --porcelain` diff showed ONLY the four expected removals (now
  committed) and zero additions -- all 11 other-lane modified entries and all 15 untracked entries
  survived. Only this arc's four paths were stashed (dropped after the gates passed); the 4
  pre-existing stashes were untouched; no lock file was ever removed.
- **TRAP RECORDED -- NEVER COMPARE A WORKTREE sha256 AGAINST `git show <rev>:<path>` OUTPUT ON THIS
  BOX.** The merge's byte-identity pre-check mismatched on ALL FOUR files and the literal instruction
  was to HALT. It was a FALSE alarm: `core.autocrlf=true` with NO .gitattributes means the worktree is
  CRLF while the blob is LF, so the two hashes CANNOT match even when the content is identical.
  Proven identical three independent ways instead: each worktree sha256 equalled its expected value;
  CRLF/bare-LF counts were exactly complementary (weekly_refresh.py: worktree 333 CRLF / 0 LF, blob
  0 CRLF / 333 LF); the blob rendered THROUGH the checkout filter was byte-for-byte equal to the
  worktree; and `git diff <rev> -- <paths>` was empty. **The correct identity test across the git
  boundary is `git diff` or a line-ending-normalized comparison -- a raw hash comparison produces a
  guaranteed false STOP.** This will recur on every future merge-verification of this repo.
- STANDING STATE AFTER THE MERGE: main carries the fixed refresh agents (fail-closed tolerance gate
  with the culling + vote-lean allowlist entries, chain-tail guard, glassbox emission + status marker,
  the three formerly-orphaned CU extractors, timeouts collectors 3000 / reference layer 2400 /
  FULL PIPELINE 7200), the adjudicated gold-retirement ledger, the repaired X collector paths, and the
  repaired freshness diagnostic. OPEN, unchanged by the merge: (1) the TOLERANCE PATH IS STILL UNPROVEN
  LIVE -- the 08-30 Sunday run is its first real test; (2) V-1 waits on Paul's
  votes\cu_rollcall_votes_clean.csv (rank-delta gate required when it lands); (3) the reference layer's
  12% unscored drift needs a PAID --score pass, Paul's authorization; (4) fec\[private — see knowledge vault] still
  absent so the refresh still cannot email -- glassbox events + the status marker carry health instead.

<!-- appended 2026-08-26 by the containerization lane (full mirror sync; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **FULL MIRROR SYNC EXECUTED (Paul: "push the mirror") -- 200 of 200 local branches and 3 of 3 tags now
  PRESENT AND CURRENT on the mirror.** Before: 200 local vs 181 mirror branches, i.e. **19 branches
  existed on the OneDrive tree ALONE** -- the drift since the 2026-08-18 full push (174 then). Pushed
  all 19 as explicit refspecs, no --force, no deletes, zero rejections; confirming `--all` and `--tags`
  sweeps then both returned "Everything up-to-date". Classification before the push was clean:
  181 current, 19 missing, **0 behind, 0 diverged, 0 mirror-ahead, 0 mirror-only**; all 3 tags already
  matched on both tag object and peeled commit.
  RECOVERED FROM SINGLE-DISK by this push, notably: **claude/melange-speech-recognition-cfa049** (the
  active speech lane, 860 commits -- the deepest history in the set), claude/holistic-normalized,
  claude/per-config-network-layouts, claude/sector-diagnostics, and
  claude/mentat-systems-production-file-53552c (sitting at the main tip). The rest are
  smaller/experimental lanes.
  VERIFIED AT OBJECT LEVEL, not just ref level (the 08-18 precedent's standard): each of the 19 new
  tips was walked INSIDE the mirror with `git rev-list --count` and resolves its complete ancestry
  there (781-860 commits each, 0 failures) -- the refs are not dangling. mirror refs/heads/main ==
  local main == 41656d2d8.
  SCOPE UNCHANGED FROM 08-18: this covers git-tracked work only. The glassbox runtime is still
  UNTRACKED and therefore still single-disk, and the off-repo data stores (C:\melange-data ~65GB,
  %LOCALAPPDATA%\Melange lda_rebuild 3.4GB + lobbyview 1.1GB) are not git objects at all -- they are
  exactly what Layer 3 of the containerization proposal exists to cover. Do not read "mirror is
  complete" as covering them.
- **INCIDENT, self-caused and recorded: a stale .git\index.lock.** A read-only
  `git status --porcelain` in the live tree hit a 2-minute tool timeout during a OneDrive re-scan and
  was killed, stranding a ZERO-BYTE .git\index.lock (11:40:06). It blocks no reads but blocks every
  git WRITE in the shared live tree -- i.e. it would have broken the next lane to try a commit.
  Diagnosed per the recorded law (enumerate the holder, never infer): no git process running,
  zero-length file, no MERGE_HEAD/rebase state. **STANDING NOTE: `git status` on this OneDrive-backed
  tree can exceed a 2-minute tool timeout, and a killed status leaves an index.lock behind. Prefer a
  generous timeout for git commands here, and check for an orphaned lock after any killed git call.**

<!-- appended 2026-08-26 by the containerization lane (stale-lock + object-garbage cleanup; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- STALE GIT FILES CLEARED (Paul: "clear both locks and the tmp_obj remnants"). Six files removed from
  the live tree's .git after four gates each (staleness, no-handle, no partial-operation state,
  backed-up-first): .git\info\sparse-checkout.lock (2026-08-10), .git\objects\maintenance.lock
  (2026-07-13), and four interrupted-write remnants .git\objects\{3e,c6,d8,ff}\tmp_obj_* (925,696 /
  294 / 1,017 / 9,934 bytes, aged 119h-698h). Originals preserved at
  backups\git_stale_locks_20260826\ (gitignored), MD5-verified byte-identical before removal.
  AFTER: garbage 0 / size-garbage 0, store otherwise identical (count 2174, in-pack 73268, packs 2,
  size-pack 3.39 GiB), recursive *.lock sweep under .git returns NONE, HEAD unchanged at 41656d2d8 on
  main, git status still 27 entries with every other lane's work intact. Untouched and still open:
  prune-packable 83 (needs gc/prune, deliberately barred from that pass).
- **TWO PRACTICE LESSONS FROM THIS CLEANUP, both worth more than the cleanup itself:**
  (1) **`git --no-optional-locks status` is the correct way to read status on this tree.** It makes git
  decline to take index.lock AT ALL, so even a killed or timed-out call CANNOT strand one -- it removes
  today's failure mode structurally instead of relying on a generous timeout. Adopt it for every
  read-only status check in this OneDrive-backed repo.
  (2) **An exclusive-open handle probe MUST request FileAccess.Read, never ReadWrite, on git object
  files.** Git writes loose-object temp files ReadOnly (0444), so a ReadWrite probe returns
  UnauthorizedAccessException -- which reads as "another process holds this file" but is actually a
  PERMISSIONS denial. That false HELD verdict would have blocked this cleanup entirely on all four
  tmp_obj files. Unwrap the inner exception (UnauthorizedAccessException = permissions, IOException =
  genuine sharing violation) before concluding anything holds a file.
- STALL RECORDED, cause PLAUSIBLE NOT PROVEN: the first cleanup agent tripped a 600s no-progress
  watchdog at the words "Creating the backup now" and died. It had in fact COMPLETED the backup and
  removed nothing, and stranded no lock -- state was clean on arrival of the recovery agent. Likely
  mechanism: three of the four tmp_obj files carried the ReparsePoint attribute (OneDrive
  files-on-demand placeholders) and copying a dehydrated placeholder forces a cloud hydration that can
  block for minutes; the one file WITHOUT the attribute afterwards is the 925KB one the copy hydrated.
  Not instrumented, so treat as explanation rather than finding. **OPERATIONAL RULE: copy files out of
  this OneDrive tree ONE AT A TIME with progress reporting, never as a batch recursive copy, or a
  watchdog will kill the agent mid-operation.**
- CORRECTION OF RECORD: this tree has **35 worktrees** (34 linked + main), not the 25 cited earlier in
  this session's reporting. Reconcile if any procedure keys on that count.

<!-- appended 2026-08-26 by the containerization lane (bill-repository regression fixed; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **DESK BILL-REPOSITORY TAB FIXED** (Paul reported it; traced, repaired, deployed, merged). SYMPTOM: the
  member desk's "Bill repository" tab rendered "0 of 0 matching bills" and its Congress dropdown held only
  "All Congresses", while 464 bills should show. NOT data loss -- member_desk_bundle.json (5,899 bill rows)
  and lobby-bills.html (2,961 rows) were healthy throughout, and per-member bill lists inside profiles kept
  working (they read m.bills behind the __profilesReady guard).
  ROOT CAUSE, a RENDERING-ORDER regression from DESK_SPLIT @775b21af2 (2026-08-24, the UI apply):
  HEAVY_MEMBER_FIELDS moved 'bills' into the async cu-member-desk-profiles.js payload, but
  make_member_desk_00.tpl:1478 built the index SYNCHRONOUSLY at module scope into a `const`, so it ran while
  every member.bills was undefined -> BILLS=[] permanently; the merge hook (:2294-2301) delivered the data
  and never recomputed. The UI lane's own verification claim was scoped to renderRanked's helpers, and
  buildBillRepository is module-scope init for a DIFFERENT view -- that is the exact blind spot.
  FIX (template only, producers never hand-edited): BILLS/BILL_BY_KEY -> `let`; rebuildBillRepository()
  recomputes, repopulates #billcongress preserving a still-valid selection, re-renders only if the bills
  view is visible; merge hook calls it after D.bill_lobbying is set. Module-scope build unchanged so
  DESK_SPLIT=0 is untouched.
- **THE VERIFICATION METHOD IS THE REUSABLE PART** (this harness cannot composite, refuses screenshots, and
  hangs on the 40MB desk -- so pixels were never provable): extract the functions from the EMITTED bytes,
  not the template, stub the DOM, and drive the real split sequence. Post-fix real payload **0 at init ->
  464 after merge**, dropdown 1 -> 4 options. **NEGATIVE CONTROL on the PRE-FIX emitted bytes: 0 -> 0**,
  dropdown stuck at 1 -- reproducing Paul's exact symptom, which is what proves the harness exercises the
  real path rather than a convenient stub. Monolith DESK_SPLIT=0: 464 at init, output_semantic_sha256
  IDENTICAL (only input_fingerprint/generated_at move, by design per dashboard_integrity.py:442).
  Moneyball.html ordering verified BY BYTE OFFSET (index 8743364 < rebuild 8743745 < hook 8816305 < call
  8816964) and its real inlined call site drives 0 -> 464. ranks md5 ab215461eb BOTH SIDES. Both HTML files
  grew by exactly 836 bytes (same delta) and profiles.js is BYTE-IDENTICAL to its backup -- no data moved.
  Backups: backups\pre-billfix-20260826\.
- **COVERAGE GAP THAT LET THIS SHIP, recorded for Phase 1:** fec\audit\dashboard_integrity.py validates the
  BUNDLE, not the rendered page -- it reports `status: pass, bills: 5899` while the page shows zero. A green
  audit and an empty tab are structurally compatible. DESK_SPLIT deferred **14 fields**, not just bills, so
  other views may carry the same latent fault; only 'bills' was traced. An audit that asserts against
  rendered HTML is the real fix and is NOT built.
- SEPARATE FINDING, deliberately NOT acted on: `bill_repository_live.json` is ABSENT and ships as an empty
  stub (make_member_desk.py:169-175). It is only a title/summary ENRICHMENT overlay -- restoring it would
  NOT have fixed the tab, and doing so would have been treating the wrong symptom. Its producer
  (fec\legislation\update_bill_repository.py) needs headless Chrome/Playwright. Also stale, flagged as a
  lead not a fact: our_bill_repository_join.csv (2026-08-06) sat out the 08-26 rebuild.
- CRLF TRAP HIT AGAIN, second time today: the fix agent's first pre-fix comparison was invalid because
  `git show` emits LF while the worktree is CRLF; it discarded the result and reconstructed the pre-fix
  template byte-exactly by reverse-applying the edit, proving it by sha256 match. **The trap is now
  2-for-2 on catching sessions that compare across the git boundary -- see the earlier entry.**

<!-- appended 2026-08-26 by the containerization lane (second frozen-index defect; class closed; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **SECOND FROZEN-INDEX DEFECT FOUND AND FIXED -- the desk STAFF INDEX.** Found by SWEEPING for the
  signature of the bill-repository bug rather than waiting for a user report, which is the point:
  `STFIDX` (make_member_desk_00.tpl:475-476) was built at module scope over `m.staffdir`, a
  DESK_SPLIT-deferred field, and frozen in a `const` the merge hook never rebuilt -- indexing **0 of
  5,773 staffers** for the life of every page load. **Worse than the bills case: that one was a race
  the merge could in principle have won; this one NEVER healed.** Live consequences: the per-member
  staffer filter box made typing ANY character hide EVERY staffer card (search haystack always ''),
  the "In contact" view permanently read "No meetings set up yet" regardless of meetings marked, and
  the first click on a baked-starred staffer was a no-op. Fixed @dbf9e61a06883d3441e555da0a86c7403307240a with the same shape as the
  bills repair: `let` + rebuildStaffIndex() at module scope and in __melangeProfileMerge, re-rendering
  the contact view only when visible.
- **THE CLASS IS NOW CLOSED, and that is a measured claim not a hope.** A complete enumeration of every
  module-scope derived constant in the desk template found **11 of them, exactly 2 touching deferred
  fields**: BILLS/BILL_BY_KEY and STFIDX. The other 9 read only light-payload fields (name, committees,
  party, chamber, roi, D.adj, and lazily-filled caches). Of the 14 deferred fields, 12 are read ONLY
  from member-panel builders behind openMember's `__profilesReady` guard (which correctly stashes
  `__pendingOpen` and replays it), and three apparently-unguarded sites (relatedPress /
  relatedAnecdotes / billCard) are safe BY CONSTRUCTION -- they iterate BILLS, which is empty until the
  merge. renderRanked, the default view, touches no deferred field, so the UI lane's original audit
  claim holds as far as it went.
- EVIDENCE METHOD, reused and now proven twice: extract from the EMITTED bytes, stub the DOM, drive the
  real split sequence, and REQUIRE a negative control. Post-fix real payload **0 -> 5,773**; negative
  control **0 -> 0**; monolith 5,773 at init; `output_semantic_sha256` IDENTICAL across live-pre-fix /
  post-fix-split / post-fix-monolith (stronger than it sounds: output_hash covers the bundle minus
  integrity+freshness, so it proves both that the edit did not perturb the data path and that inputs
  had not drifted). ranks md5 ab215461eb both sides; profiles.js byte-identical to backup. Backups:
  backups\pre-stffix-20260826\. **NEAT TRAP-AVOIDANCE worth copying: the negative control needed no
  reconstruction because the DEPLOYED file WAS the pre-fix artifact -- which sidesteps the
  `git show` LF-vs-CRLF trap entirely.**
- **STILL OPEN, recorded not fixed:** (1) the profiles `<script async>` (make_member_desk.py:2349) has
  NO onerror and NO timeout -- if that 39MB fetch ever fails, `__profilesReady` stays false forever, no
  member profile opens, and the page sits on "Profile data is still arriving" indefinitely. Inferred
  from source, not observed. (2) `dashboard_integrity.py` still validates the BUNDLE, not the RENDERED
  page -- it reported `status: pass, bills: 5899` throughout the months the tab showed zero. Both
  frozen-index bugs were structurally invisible to every existing gate; an audit asserting against
  rendered HTML remains UNBUILT and is the real fix for this whole class.

<!-- appended 2026-08-27 by the containerization lane (rendered-surface audit; requirements gap; proposal v2; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **RENDERED-SURFACE AUDIT SHIPPED @baab05ba39a9a1246797f3e52eae77b5080accd9** -- the structural answer to the defect class that produced
  BOTH desk regressions. `fec/audit/audit_rendered_desk.py` + `rendered_desk_probe.mjs` (node) EXECUTE the
  shipped artifacts: extract the app script from cu-member-desk.html, stub a DOM, run module-scope init,
  then invoke the REAL merge hook with the REAL 39MB profiles payload. **ANTI-VACUITY PROPERTY: expected
  counts are derived from member_desk_bundle.json -- a DIFFERENT source than the page -- so the check
  cannot agree with itself.** That is precisely how dashboard_integrity.py stayed green for days: it
  consulted only the bundle. Live: **15 assertions, 0 failed, 3.1s**; BILLS 0 -> 464, STFIDX 0 -> 5,773,
  hook call order observed by patching the page's own functions. **7/7 negative controls fire**, incl. an
  unregistered index over a deferred field (2 detectors) and a ranked-board read of a deferred field
  (the half of the class with NO count attached). Degenerate bundle -> CONTRACT fail; unsplit artifact ->
  SKIP-with-reason, never a false pass. Kernel gate **161/0** (+1). Registered in run_tests.py; NOT yet
  wired into audit_full.
- **DESIGN LESSON, and it inverts the coordinator's own spec:** the brief specified a STATIC enumeration of
  module-scope structures built over D.members, seeded from a known-safe list. **That design would have
  caught NEITHER real defect** -- `let BILLS=[],BILL_BY_KEY={}` and `let STFIDX={}` mention neither M nor
  D.members nor any deferred field; they are filled by module-scope CALLS to builders defined elsewhere, so
  a seeded static scan is blind to that exact shape. The agent kept the enumeration as reported METADATA
  and made the ASSERTIONS execution-based instead: deferred-field read discipline, a 287-binding value
  differential vs the monolith, and a rendered-board differential. **No maintained allowlist, and controls
  C3/C6 prove it on defects registered nowhere.** Also self-caught: the readout function was itself
  touching m.bills/m.staffdir while counting them, polluting the merge-phase read set and MASKING one
  assertion -- muted, after which C1/C2 each trip FOUR independent detectors.
- KNOWN LIMITS, recorded not waved: A6's monolith is RECONSTRUCTED from shipped bytes (a producer-built
  DESK_SPLIT=0 artifact would be a deployment-class action, not an audit) and is labelled
  `monolith_source: reconstructed`; a structure held in a closure inside a module-scope block is not
  enumerable (A5b still catches it if it reads a deferred field the hook does not rebuild); A5d covers the
  `#rows` board only, the other views being hidden at load and covered by the index assertions. Bundle/page
  coupling is DISCRIMINATED, not assumed: A2b failing = artifact drift, A2b passing + A2 failing = rebuild
  defect.
- **REQUIREMENTS DECLARATION GAP CLOSED** (same commit). `cryptography` is imported at
  fec/surfaces/lock_dashboard.py:10 and was declared in NO requirements.txt on ANY branch -- a fresh clone
  or container image fails the first time anyone locks a dashboard. Added with `pytest` (required by TEN
  registered suites since 2026-08-04, declared nowhere) and `joblib` (module-level import; already
  transitive via scikit-learn, added for manifest honesty). Sweep of 565 files: 7/7 declared entries really
  used, 0 dead, **17 used-but-undeclared, only 3 added**. **THE DISCRIMINATOR WAS SYNTACTIC IMPORT
  CONTEXT:** all nine heavy ML packages (torch, transformers, sentence-transformers, speechbrain,
  faster-whisper, opensmile, pdfplumber, pypdf, imageio-ffmpeg) have ZERO module-level imports -- every
  site is inside a function or try-block, corroborating the file header's "intentionally excluded".
  **pywin32 DELIBERATELY NOT ADDED: 12 module-level imports make it look like the biggest gap, but it has
  no Linux wheels and would BREAK the container build this whole effort exists to enable** -- if ever
  wanted it needs `; sys_platform == "win32"`. Paul's call.
- **TWO LIVE BUGS FOUND IN PASSING, neither fixed, neither caused by this work:** (1) `python-docx` is
  imported at module level by fec/legislation/build_legislation_search_registry.py:21 and is NOT INSTALLED
  -- that script and a collect-lane test are broken RIGHT NOW; not added to requirements because the file
  pins to installed versions and there is nothing installed to pin to. (2) **fec/stance/api_stance_layer.py
  carries a COMMITTED SyntaxError** (line 34 `if ...:` followed by an unindented statement) since
  b00df3d0e -- the file cannot be imported or run at all.
- SKILL DRIFT RECORDED (not edited -- another lane holds uncommitted edits in the skills tree):
  moneyball-build-and-env SKILL.md files `cryptography` in a tier OUTSIDE the canonical manifest, which is
  what let the gap persist -- a misclassification, not a plain omission; it claims "no pins exist anywhere"
  while the file pins everything with `==`; pytest appears in NO tier; and its cited preflight line numbers
  have drifted (CANONICAL_DEPENDENCIES now at fec/run_pipeline.py:193-200). The invariant
  `requirements.txt` superset-of `CANONICAL_DEPENDENCIES` holds before and after.
- **PROPOSAL V2 WRITTEN** (same commit): audits/CONTAINERIZATION_PROPOSAL_V2_2026-08-27.md SUPERSEDES the
  2026-08-25 v1 per the FROZEN VINTAGE rule (v1 stands as written; corrections come by supersession, never
  in-place). It carries the census corrections -- mirror is ON-BOX, Mentat is worktree #34 not an external
  repo, lda_rebuild is 320x larger than recorded -- and re-orders the plan: **Layer 3's first job is no
  longer "build a vault", it is GET ONE COPY OFF THIS MACHINE.**

<!-- appended 2026-08-27 by the containerization lane (Phase 0 manifest + gate landed; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **CONTAINERIZATION PHASE 0 COMPLETE @dfb47fc6b.** `fec/audit/build_system_manifest.py` emits
  `data/system/system_manifest.json` (schema melange-system-manifest-v1, force-added since *.json is
  gitignored -- legfix2 precedent, and the gate's contract REQUIRES a committed expectation). 80 stores /
  6 roots / 164.9 GiB, everything measured at run time. `single_disk` is DERIVED from OneDrive-root
  resolution, never authored.
- **THE HEADLINE, computed rather than estimated: 25 of 65 counted stores have NO off-box replica
  (91.6 GiB). The 2026-08-26 rescue covers 12 (43.0 GiB). ELEVEN STORES / 46.9 GiB EXIST ONLY ON DISK 0 --
  and the two irreplaceability>=3 among them are `mirror.melange` and `mirror.glassbox`, THE BARE MIRRORS
  THEMSELVES.** We backed up the data and not the thing that looked like the backup. Durable backups
  anywhere: **0**.
- **PAUL RULED "use the narrower scope":** hash_always covers ONLY material git does not protect. Encoded
  as a SECOND refusal ordered AFTER the scale envelope, so a store too big to hash still reports `scale`
  and keeps its sentinel evidence. Tracked-ness MEASURED via one cached `git ls-files -z` per root, never
  declared. Refuses to `hash_never` NOT `sentinel_files` -- a sentinel set includes the NEWEST file, which
  is exactly what a commit changes. **16 -> 8 hash_always stores, 280 -> 8 files, 2.79 MiB.**
- **THE RULING'S PREDICTION HELD, which is the evidence it was right:** the three A2b/A4 failures that
  fired when a concurrent lane wrote into fec/audit and fec/tests are now STRUCTURALLY impossible -- those
  stores carry neither hashes nor sentinels. Four tracked stores DECLARE hash_always and are refused every
  run, deliberately: the refusal is the standing record that git stands behind them. Sharpest pair:
  `Moneyball_ACU_Search_Outline.docx` tracked -> refused, while `acu_legislation_search_registry.json`
  derived from it is untracked -> keeps its hash. Git-unavailable HONOURS the declaration (both branches
  controlled): where git cannot be asked, git protects nothing, so refusing would strip the only integrity
  evidence on precisely the hosts lacking git.
- GATE: `[SYS]` in audit_full.py, **333 checks / 0 failed**; audit_full **566 passed / 2 FAILED** (the known
  vote-lean + culling pair) as measured in the worktree copy. Kernel **162/0** live. **28 planted-defect
  controls**, each asserting the specific check name AND detail fragments naming both sides, each first
  proving its fixture clean. **BOTH GUARDS SABOTAGED during verification and confirmed red for the right
  reason, then restored byte-identical.**
- **CORRECTION TO THE LINE ABOVE (2026-08-27, same lane; appended, the original stands as written).**
  The "**566 passed / 2 FAILED** ... as measured in the worktree copy" reading did NOT hold in the LIVE tree.
  Measured live at dfb47fc6b: **563 passed / 5 FAILED**, `[SYS]` **333 checks / 3 failed**. The worktree copy
  agreed with itself because it describes the worktree; the live tree had just taken the very commit and push
  the manifest was pinned against. Root cause and the corrected live tally are in the appended block below.

- **OPERATIONAL TRAP, will bite the next lane:** `paths.py` resolves ROOT from `__file__`, so running the
  producer from a worktree DESCRIBES THE WORKTREE and writes into the worktree's data/system/. Always
  invoke as `MONEYBALL_ROOT="<live tree>" python fec/audit/build_system_manifest.py`.
- RESIDUAL, not fixed: `repo.fec_code` and `repo.audits` use `sentinel_files` whose newest-file sentinels
  are today's own landings -- A2b re-checks RECORDED sentinel paths, so it only fails if one of those
  specific files is rewritten or deleted. Same class as the hash_always problem, narrower.
- ALSO SURFACED, not encoded: four load-bearing artifacts have NO in-repo producer
  (`data/engine/congestion.json`, `bill_beneficiary_tags.ndjson`, `data/lobbying/industry_axes.ndjson`,
  BASE `congress_cosponsor_network_20260625_205554.xlsx`); four dead congestion-family strays sit in `fec/`
  with no producer OR consumer; `hearings_wit.db` (465 MiB) is orphaned in the main tree, its producer and
  only reader living in the unmerged worktree melange-coalition-builder-design-7babbe.

<!-- appended 2026-08-27 by the containerization lane (the [SYS] gate corrected; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **THE PHASE-0 GATE WENT RED ON ITS OWN LANDING COMMIT.** Measured in the LIVE tree at dfb47fc6b:
  audit_full **563 passed / 5 FAILED**, `[SYS]` **333 checks / 3 failed** -- `A2b repo.git sentinels
  unchanged`, `A2 mirror.melange file_count within tolerance`, `A2b mirror.melange sentinels unchanged`.
  Not a data defect. The sentinel picker takes the NEWEST file in a store, and inside a git directory the
  newest file is BY CONSTRUCTION whatever the last commit or push just wrote -- so it chose `.git/index` for
  `repo.git` and `refs/heads/main` for `mirror.melange`, and marked both `content_stable: true`.
- **PROVEN BYTE-EXACTLY, not inferred:** `mirror.melange`'s sentinel is the 41-byte `refs/heads/main`, and the
  recorded sha256 is the sha256 of the PRE-PUSH ref (`baab05ba3...\n`) while disk carried the post-push one
  (`dfb47fc6b...\n`). **The "disagreement" WAS the Phase-0 push.** Same story on the other two: `.git/index`
  8,371,954 -> 8,372,431 bytes (the commit rewrote it), and `mirror.melange` file_count 86 -> 100, the +14
  objects that push added.
- **THIS IS THE ALWAYS-RED TWIN OF THE NEVER-FAILS FAILURE MODE.** The repo has shipped two checks that could
  not fail, and the whole anti-vacuity contract exists because of them. A gate that goes red after every
  ordinary commit is the same defect wearing the opposite sign: it stops being read, so it stops being
  evidence. Regenerating the manifest would have deferred it exactly one commit, so it was fixed at the root.
- **THE FIX @022c3c728** (`fec/audit/build_system_manifest.py` + `fec/audit/system_manifest_check.py`):
  git bookkeeping is disqualified from sentinel DUTY by a PREDICATE, not a filename list -- a path counts only
  when it resolves inside a git directory (the store IS one, or the path passes through a `.git` component),
  and is then the index, the `*_HEAD` pointers, `packed-refs`, `refs/**`, `logs/**`, rebase/bisect/worktrees/
  modules state, a `*.lock`, or a cache git regenerates. Git-directory-ness is MEASURED from the filesystem
  shape (`HEAD` + `objects/` + `refs/`), never declared. **Object files stay eligible on purpose:** a loose
  object or a pack is named by the hash of its own contents, so it cannot change without changing its name --
  the exact immutability a sentinel needs. Inside a git directory the newest-file sentinel is dropped, the
  same reasoning the registry already applies to tracked code. `content_stable` is now DERIVED from that same
  predicate rather than authored, so a volatile path can never again reach the manifest claiming stable bytes.
- **AND THE COUNT ASSERTION FOR GIT STORES WAS THE WRONG EXPECTATION, NOT AN INCONVENIENT ONE.** A git repo
  exists in order to change -- a commit writes loose objects, a push writes more, a `gc` deletes thousands at
  once -- so a file_count tolerance band there is a false positive by construction. It is replaced IN THE SAME
  SLOT (the section still emits exactly 333 checks) by what a mirror can honestly promise and an emptied one
  cannot: **it still holds a populated git object store.** Existence, coarse size_class and the
  content-addressed sentinels are untouched, and routing is FAIL-CLOSED -- the manifest flag and a live
  re-observation must both agree, so a hand-edited manifest cannot buy the relaxation for a data store.
  **Nothing outside git bookkeeping moved:** A1/A2/A4/A5/A6 keep their strength for every real store, and the
  regenerated manifest still carries **8 hash_always stores and 5 policy refusals**, the identical scope.
- **CONTROLS 28 -> 42, and they exist to prove the exclusion is not a blanket off switch.** The discriminators
  are the point: the identical tree with identical sizes and mtimes, measured as NOT a git directory, still
  yields `index` as a sentinel; a non-git file named `index` is still hashed and still FAILS A2b on a
  one-byte flip; an emptied object store still fails as the ONLY verdict that moves; the same +14-file drift
  on a non-git store still fails its count band; a bookkeeping sentinel is refused even when its bytes match;
  and the producer's and checker's copies of the predicate (the checker may never import the producer) are
  held against each other over 35 shapes.
- **CORRECTED LIVE TALLY @022c3c728:** audit_full **566 passed / 2 FAILED** -- and the two are the known pair,
  `vote_category_lean.json` staleness and the Paul-gated culling promotion state. `[SYS]` **333 checks / 0
  failed, 5 skipped, 0 notices.** Kernel **162 passed / 0 FAILED**. Merged to main, mirror main and branch
  both at 022c3c728, ranks md5 `ab215461ebb5bebb8798a6b15c65510a` unchanged, all 27 other-lane uncommitted
  entries intact.
- **CRLF TRAP, cost one full 16-minute producer run and will bite anyone who copies files across the worktree
  boundary:** `core.autocrlf=true` with no `.gitattributes`, so working-tree files are CRLF while a file
  `cp`-ed from a worktree is LF. `repo.fec_code`'s newest-file sentinel is a source file, so the manifest
  recorded the LF size (69,461) and the merge then rewrote the file as CRLF (74,692) -- a fresh A2b failure.
  The order that works: commit the sources, let `git checkout <branch> -- <paths>` write the CANONICAL form
  into the live tree, THEN regenerate the manifest, then amend the manifest into the commit. Verify with
  `git diff --no-index --ignore-cr-at-eol`, never a raw sha256 across the boundary.
- **RESIDUAL, unchanged and deliberately out of scope:** `repo.fec_code` and `repo.audits` still take
  newest-file sentinels, so a commit that touches one of those RECORDED paths still falsifies A2b. Narrower
  than the git case (it fails only if that specific file moves, not on every commit) but the same family; it
  is Paul's call whether to extend the rule. Also accepted knowingly: `git gc` can retire a pack, which A2b
  would report -- infrequent, and a real change to the store, unlike a commit. And `.git` is at 17,970 files
  against the gate's 20,000-file re-walk limit; when it crosses, `A2 repo.git` becomes a SKIP with a stated
  reason and `[SYS]` drops from 333 checks to 332.

<!-- appended 2026-08-27 by the system-manifest correction lane (worktree infallible-chebyshev-c1f6cd;
     metaloop run-20260827T1547112491116Z-eb9f3ab787; [[ledger/melange-systems-brain/D-006|D-006]]). Every item below carries its ledger
     trigger-key under task-slug `sysmanifest-correction` in the coordination ledger. -->
- **ADJUSTMENT LOG — the arc reviewed against measurement.** Paul: "go over the changes made in here and
  reference the memory brain, correct and adjust with a record of said adjustments and why." Seven
  adjustments, each recorded as a ledger `fact`/`decision` event before being written here.
- **ADJ-001 RETRACTED, COORDINATOR ERROR.** This lane first reported that all three git stores were left
  with ZERO sentinels and that the two bare mirrors had lost all integrity evidence. **That was false.**
  The per-store field is `sentinels`; `sentinel_files` is only a VALUE of `integrity_policy`. An ad-hoc
  probe queried the non-existent key, got `None`, and printed 0. The coordinator then put that wrong key
  into a second agent's prompt and read its echo back as independent corroboration — a confirmation loop
  of its own making, the exact class the findings-examination framework ([[ledger/melange-systems-brain/D-007|D-007]]) exists to catch. TRUE
  NUMBERS: `repo.git` 4->3, `mirror.melange` 4->3, `mirror.glassbox` 4->3, each dropping exactly its
  bookkeeping row and keeping all three content-addressed rows. The fix did what its design claimed.
  PRACTICE: verify a field NAME against the artifact before building a finding on its absence.
- **ADJ-003 mirror status corrected.** "Nothing pushed since Phase 0" was measured inside the window
  11:25:56 (amend) -> 11:42:18 (push) and became false 17 minutes later. Staleness, not error — but it
  was reported WITHOUT a measurement timestamp, and that is the defect. A negative existence claim about
  a mutable remote is only ever "not as of <time>". Recorded in Current position.
- **ADJ-004 THE REAL FINDING, which the retracted alarm was standing in front of: `repo.git` now carries
  ZERO HASH-VERIFIABLE sentinels.** Not zero sentinels — zero HASHED ones. Its three survivors (3.25 GB
  pack, 398 MB pack, 209 MB lost-found blob) all exceed the 8 MiB cap and record `sha256: null`, so A2b
  can compare only size and mtime. `mirror.melange` went 2 hashed -> 1; `mirror.glassbox` 4 -> 3.
  BOTH HALVES ARE TRUE AND THE BRAIN MUST SAY BOTH: evidence QUALITY went up (the removed hashes were
  guaranteed false positives — `index` changes every commit) while evidence COVERAGE went to zero for
  repo.git. The existing line "content-addressed sentinels are untouched" is true of the PREDICATE and
  misleading about the EFFECT; read it with this. Ruled by Paul -> **[[ledger/melange-systems-brain/D-015|D-015]]**.
- **ADJ-005 GOVERNANCE COLLISION RESOLVED.** CONSTRAINTS said worktree runs fail "regardless of
  MONEYBALL_ROOT"; a STATE entry said "always invoke as MONEYBALL_ROOT=<live tree>". Under BOOT rule 7
  (CONSTRAINTS > STATE) a booting session was required to HALT. Both were half right and neither said
  which half. CONSTRAINTS is now amended with the distinction: the env var rescues `paths.py` consumers
  and cannot rescue the 131 `fec/tests` modules that self-resolve from `__file__`.
- **ADJ-006 THE BRAIN'S OWN STALENESS AUTHORITY HAS BEEN DEAD SINCE 2026-08-25.** `brainctl.py:558-570`
  parses the stamp with `strptime`, which demands a full-string match, so the trailing annotation
  `(speech lane update, ...)` threw ValueError; `flush_env` returned None and `:398-399` collapsed
  None/future/missing into one unactionable warning. Every session since booted into an unconditional
  distrust instruction and — judging by eleven arc entries appended after it — every one ignored it. This
  is the SAME "it stops being read, so it stops being evidence" pathology the arc diagnosed for the
  always-red `[SYS]` gate, in this file, on the same day. Worked around here (bare-date stamp); the
  parser defect is OPEN in the separate Project Brain repo.
- **ADJ-007 -> [[ledger/melange-systems-brain/DE-012|DE-012]].** The Phase-0 gate figure recorded as "333/0, audit_full 566/2" was a
  self-describing artifact validated in the tree that produced it. Live tree: 333/3, 563/5. The same lane
  had shipped the rendered-surface audit 24 hours earlier whose headline property is that it CANNOT agree
  with itself. Promoted to CONSTRAINTS as a general law and to DEADENDS as [[ledger/melange-systems-brain/DE-012|DE-012]].
- **NEW DEFECT FOUND, orthogonal to everything above and PREDATING it:** `build_system_manifest.py:960`
  appends the newest file to the candidate list without testing membership in the largest-by-size list.
  When newest == largest the duplicate consumes a `[:SENTINEL_COUNT]` slot at :1066 and is collapsed by
  the `seen` dedup at :1082, costing exactly one sentinel row. Same-store control on `mdata.bicam_zips`:
  8 candidates containing `bicam_amendments.zip` twice -> 2 sentinels; the identical list deduped -> 3,
  recovering `bicam_hearings.zip` (1,832,389,891 B). Manifest-wide the partition is exact — 6 stores
  under `min(4, file_count)`: 3 git stores at n=3 (intended, [[ledger/melange-systems-brain/DE-011|DE-011]]) and `mdata.bicam_zips` /
  `mdata.bicam_extracted` / `mdata.residual` at n=2 (this defect). Ruled out by measurement: `_TOP_KEEP`
  streaming (ground-truth walk loses nothing), `excludes`, `SENTINEL_EXCLUDE` (filtered zero candidates),
  budget/cap, and the git change. NOTHING asserts a minimum sentinel count, so it is silent. NOT FIXED.
- **`.git/lost-found` CENSUS, and the blind spot it exposes:** 17,174 files / 2,549,209,018 B, a single
  `git fsck --lost-found` dump on 2026-07-27 (39-second mtime span, untouched since) = **95.57% of
  repo.git's file_count** and 39.57% of its bytes. It appears in NO exclusion constant in either file, so
  one of its blobs holds repo.git's third sentinel. If that directory were deleted — ordinary cleanup —
  A2b FAILS on "not a file" while **A2 still PASSES**, because [[ledger/melange-systems-brain/DE-010|DE-010]]'s replacement deliberately stops
  asserting file_count for a git store. So a 95.57% collapse in repo.git's file count is invisible to A2,
  and the only thing that would notice is an accidental sentinel pointing at July's recovery scratch.
  Recorded as a KNOWN GAP under [[ledger/melange-systems-brain/DE-010|DE-010]]. Paul-gated.
- **OPERATIONAL, with a fresh receipt:** `git worktree add` on this OneDrive tree ran past the 120s tool
  timeout, checked out 5,413 of ~40,000 files, never reached the target files, and stranded
  `.git/worktrees/<name>/index.lock` plus a `locked` marker. The cleanup script's own guard then refused
  to remove the lock because a `git.exe` was alive — correct behaviour, recorded as the pattern to copy.
  Prefer fast-forwarding an EXISTING worktree. Promoted to CONSTRAINTS.
- **PROMOTED THIS PASS** (Paul ruled corrections + promotion, no archiving): CONSTRAINTS gains the
  amended worktree/MONEYBALL_ROOT rule, the self-describing-artifact law, OneDrive-is-not-a-backup, the
  git-timeout/stranded-lock hazard, and the autocrlf comparison rule. DECISIONS gains **[[ledger/melange-systems-brain/D-014|D-014]]** (narrow
  hashing scope, with its pre-ruling 16/280 figures marked UNVERIFIABLE and its four-vs-five refusal
  inconsistency resolved) and **[[ledger/melange-systems-brain/D-015|D-015]]** (raise the sentinel hash cap for git stores). DEADENDS gains
  **[[ledger/melange-systems-brain/DE-010|DE-010]]**, **[[ledger/melange-systems-brain/DE-011|DE-011]]**, **[[ledger/melange-systems-brain/DE-012|DE-012]]**. STATE's declarative head was rewritten after thirteen days.
- **NOT DONE, deliberately:** STATE.md remains ~1,900 lines against `COMPACTION_WARN_LINES = 500` and the
  compaction warning will keep firing. Paul chose corrections + promotion WITHOUT archiving. The
  declarative head going thirteen days stale is a symptom of that length; recording it here so the next
  reader knows the warning is expected rather than unnoticed.

<!-- appended 2026-08-27 by the containerization Layer 2 lane (worktree infallible-chebyshev-c1f6cd;
     metaloop run-20260827T2049415311942Z-70c7f4b9d6; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **GLASSEYE FAN-OUT CLOSE CONDITION FIXED AND LIVE.** `fanout.ps1` sha256
  `137283d366d7f487a686748e6041a20e98821ebe897214e68b554dbc233c6cfd` (was `8a3b2203...`), agentwatch
  restarted on pid 60076, 6/6 views healthy. Mechanism and ruling in **[[ledger/melange-systems-brain/DE-013|DE-013]]** / **[[ledger/melange-systems-brain/D-017|D-017]]**. Verified by a
  12/12 fixture battery WITH a negative control in which the original code fails AC-1 on the same
  fixture, a clean PowerShell 5.1 parse, and live end-to-end evidence: four backgrounded dispatches now
  classified `bg=True` with real durations 1459159 / 1674432 / 955021 / 494073 ms matching their
  task-notification `<duration_ms>` exactly, where every one had been `-1` and closed in under a second.
  THE FINGERPRINT TRIPWIRE PROVED ITSELF: immediately after placement `health.ps1` reported agentwatch
  `compatible=False` while the other five roles stayed True — `common.ps1:462-466` refusing to run
  changed derivation logic under a stale watcher. Full runtime backup at the session scratchpad plus
  `.bak-20260827T210637Z` beside the file; the runtime is still UNTRACKED and its version-control home
  is still open.
- **METALOOP §3 AMENDED AND COMMITTED @a5166d166** — a named stage per dispatched node, and
  `stage-complete` only on an adjudicated result. See **[[ledger/melange-systems-brain/D-016|D-016]]**. Law-7 copy-sync verified in-session:
  repo canonical and `~/.claude/commands/metaloop.md` both md5 `1a175076bd4c45217a6445bac7aab38f`.
- **CONTAINERIZATION LAYER 2 — DISCOVERY COMPLETE, BUILD NOT STARTED.** Three census nodes landed. The
  headline INVERTS the proposal's premise: **pywin32 is not the blocker** (30 sites, zero on-chain) and
  the chain is **network-free** (zero collectors) — both promoted to CONSTRAINTS. The real blockers are:
  * `%LOCALAPPDATA%` — ~21 on-chain sites. `audit_full.py:1680` is a bare `os.environ['LOCALAPPDATA']`
    subscript, not in a try, on a branch verified reachable: a CERTAIN KeyError on Linux that takes down
    the final chain step. `coalition_pricing.py:71` uses `os.path.expandvars('%LOCALAPPDATA%\\Melange')`,
    which POSIX expandvars does not expand — it returns the literal string as a path, silently.
  * THREE CHAIN STEPS WRITE OUTSIDE THE REPO into `%LOCALAPPDATA%\Melange\lda_rebuild\derived\`
    (`contest_screen`, `champions_v2`, `org_mentions`). All three take `--out`, but their CONSUMERS
    hard-code the same `_derived_dir()`, so redirecting one without the other breaks the chain.
  * 231 Windows backslash path literals across 22 of the 48 steps, including two load-bearing MODULE
    LOADS (`optimize.py:20`, `salience_shock.py:42-43`) that would fail to resolve at all.
  * A fresh clone — which is what an image build is — gets roughly 20 of ~200 chain inputs. Tracked
    payload is 31 MB against a 6.1 GB `.git`. The first hard failure is step 2,
    `coop_v2_candidate.py:56`, `max()` on an empty glob.
  * BYTE-IDENTITY LANDMINE: `build_media_blend.py:37` is `TODAY=datetime.date.today()`, a
    date-dependent decay BY DESIGN. Two runs on different calendar days differ for a reason that is not
    the container's fault. `ranks_python.json` and `dashboard_data.json` are both timestamp-free and ARE
    the correct acceptance pair (v1:45-47 already names them).
  * The prior Layer 2 design (v1:68-83) is RATIFIED by v2:153-159 and needs no redesign — it already
    specifies `python:3.12-slim` pinned to 3.12.10, freeze-pinned requirements, a tagged-SHA checkout
    with `core.autocrlf=false`, and the data plane mounted not baked.
  * OPEN AND UNANSWERED IN BOTH PROPOSALS: does "the data plane" mean `live_tree` only, or all six
    manifest roots? `MONEYBALL_ROOT` relocates one and `MONEYBALL_DRAFT` a second; the other four
    (92.25 GiB) have no env seam — `C:\melange-data` is a hardcoded literal and `local_melange` resolves
    through `os.environ['LOCALAPPDATA']` in ~40 modules including engine code. One env var versus four
    relocations, and a code edit either way.
- DEBT CLEARED this session: mirror pushed `022c3c728 -> a5166d166` and verified in sync; the stranded
  `cxwt-sysman-sentinels` worktree, its 4.3-hour-old 0-byte `index.lock`, its `locked` marker and its
  branch are all removed (branch carried 0 commits not on main; no `git.exe` was alive). A separate
  stale `index.lock` had blocked EVERY git write to the live tree for 4.3 hours earlier in the day.
- STILL OWED from the parked manifest run (`run-20260827T1547112491116Z-eb9f3ab787`): [[ledger/melange-systems-brain/D-015|D-015]]'s cost
  measurement, the live-tree gate re-measurement at `022c3c728`, the manifest regeneration (APPLY,
  Paul-gated), and a commit of the two verified-but-uncommitted fixes on
  `claude/system-manifest-config-a94b55`.

<!-- appended 2026-08-28 by the contact-inference extraction lane (worktree mentat-systems-production-file-53552c,
     branch claude/contact-inference-extraction-e4c881; metaloop run-20260828T0421211456636Z-101ac9dfe4; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- CONTACT-INFERENCE EXTRACTION LANE OPENED (Paul 2026-08-28: "Design and execute the augmented extraction code, the
  old code can be phased out and trashed, once complete run through the validation framework and re-evaluate").
  Governing docs CONTACT_INFERENCE_{DESIGN,EVALUATION}.md (Paul's Downloads, 2026-08-28) copied verbatim into
  fec/lobbying/ on the branch (commit rides the build); build spec = audits/contact_extraction_20260828/
  BUILD_SPEC_2026-08-28.md (sha256 8C1D44A5F4.., twice amended on adjudicated findings). Deliverables in scope:
  fec/lobbying/{contact_name_extraction,lobbyist_associations,validate_contact_extraction}.py + two registered test
  suites. OUT of scope by pinned invariant: fusion/channel builders, G1/G2/G5, any surface change, THE LOOK (E1 and
  G1-G6 stay Paul's).
- DISCOVERY (2 read-only subagents, all facts ledgered under task-slug contact-inference-extraction): NO in-repo
  member-name extraction over LDA text exists - the honorific extractor behind the docs' 4,549/1,034,711 numbers is
  the N5 PROTOTYPE in the speech-lane session scratchpad, never committed. "Old code to trash" ADJUDICATED = that
  prototype, retired BY RECORD: pinned read-only under audits/contact_extraction_20260828/retired_prototype/ (7
  files; n5 artifact sha256 AEE16F3841B8..1590D byte-exact vs glassbox evt-20260827T2141095228400Z). NOTHING in-repo
  deleted - build_dyad_bill_sets, the lobby_interactions ledger and verify_against_network stay untouched per H1.
  Paul may overrule at the report.
- DATA PLANE verified byte-exact vs N5: 21,599 files / 2,327,796,001 B; dedupe-basis counts EXACT (539,782 filings /
  88 dup rows / 1,034,711 activities / 746,549 covered_position populated / 19,306 distinct / 236 gov-entities over
  2,856,049 occ). M4 IS A ROSTER JOIN, NOT A REGEX (walk <=4 capitalized tokens after the honorific, keep the longest
  surname-tail span, 1-token fallback unless stopword) - regex-only proxies miss by +10. Two defect classes the new
  extractor fixes: "Representative Designation" 208 (fallback FP) and "Senator Elizabeth" 137 (given-name truncation
  on failed surname join). EVAL-DOC DEFECT recorded, not edited: its "137 was unsourced and is retracted" line is
  WRONG - 137 is the recovered artifact's span frequency; 152/146 is the plain-substring basis; ruling = dual-basis
  reconciliation (M4-span authoritative, substring reported), correction rides the battery report + amendment
  proposal. The 448,696/60.1% covered_position share stays method-unrecorded (UNREPRODUCED; variants bracket
  58.6-62.0%); the new producer defines its heuristic precisely.
- CODEX LANE INFRA INCIDENT, diagnosed to the byte: the Codex auto-update at 00:04 left the RUNNING MCP server (8/21
  build, dir 0a771e1f19ef3b2d) without its codex-code-mode-host.exe - every command spawn failed os error 2.
  Fails-twice honored; both BLOCKED receipts were clean (15/15 tags) and are ledgered with node_blocked
  attribution=infra. RECOVERY = the protocol's headless path: codex exec on the complete new install
  (d664d99528113e03, v0.150.0-alpha.12.2), config pins verified gpt-5.6-sol/xhigh/priority. STANDING NOTE for every
  future lane: after a Codex auto-update, the already-running MCP server stays pinned to the deleted version until
  the harness session restarts - headless codex exec is the bridge; and exec-level flags (-C/-s/-o) must come BEFORE
  the `resume` subcommand or clap rejects them.
- ROUND 0b (plan-only, read-only) worked exactly as designed: 3/3 doc hashes verified, environment verified
  (glassbox emitter = fec/surfaces/glassbox_emit.py emit()), and CON-7 fired a STOP REPORT on 3 REAL spec defects
  (Senator-Elizabeth basis contradiction; "pinned22" under-specified - the builder holds TWO distinct 22-item
  sources, 22 trade associations vs 22 pinned companies; prototype file naming). All three adjudicated + ledgered;
  in_finance_scope = 4 flags mirroring the builder's real admission channels (name_pattern / sector_roster /
  pinned_association / pinned_company, consumed builder symbols recorded in the summary). BUILD ROUND 1 IN FLIGHT at
  entry time (plan+build combined in one turn - logged coordinator deviation after the infra incident cost two
  rounds; full diff review, coordinator-run A1-A9 acceptance, and the independent adversarial round are unchanged).
  Worktree adaptation also ledgered: N4 executes in the lane worktree, not a fresh codex/* worktree (git worktree
  add on this OneDrive tree is the recorded stranded-lock hazard).

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (worktree hmm-melange-analysis-6f6786; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- COLLECTOR-SENTINEL INVENTORY DELIVERED (Paul: "create a Markdown that details all the collector sentinels
  ... every single one"). audits/COLLECTOR_SENTINELS_INVENTORY_2026-08-28.md committed 6f1bedb22 on
  claude/collector-sentinels-inventory-895b67, mirror-pushed, UNMERGED (merge = Paul). Read-only lane; zero
  behavior changes. Covers: the collector_sentinels/<leg>.done completion system (16-leg roster at
  fetch_interviews.py:1130; sentinels written success-only at :1132-1136; supervisor reads :235-236; NOTHING
  ever resets them - a fresh clone arrives with the 7 tracked sentinels already "done"), the supervisor's
  gates and state files, SWEEP_APPROVED, monday_x_collector state.json, weekly_refresh_status.json, the
  Congress.gov .mjs run manifests, the tweet_collector 'none-found' DB sentinel, per-collector resume
  checkpoints, and the system-manifest sentinel_files stores over the collector data plane (brain-recorded
  defects restated, not re-adjudicated). All file:line claims verified 11/11 by an independent pass.
- LIVE-STATE OBSERVATIONS from the inventory (measured 2026-08-28, read-only, nothing changed):
  (1) the MoneyballCollectorSupervisor scheduled task DOES NOT EXIST (schtasks query: not found) while the
  live data/stance/collector_targets.json configures {fox, cnn-deep}, BOTH fully sentineled today, and
  neither gate1.done nor gate2.done exists - so the supervisor's GATE-1/GATE-2 currently have NO RUNNER;
  either the legs ran unsupervised or the task was removed out-of-band (self-unregister fires only after
  gate2.done, which is absent). Whether those gates matter for this sweep is Paul's call.
  (2) Live collector_sentinels/ holds 14 of 16 possible sentinels, ALL contents dated 2026-08-28 (a sweep
  completed today); only aei.done and nprfeed.done have never existed; the 7 git-tracked files are
  uncommitted rewrites of the committed 2026-08-02 vintage.
  (3) weekly_refresh_status.json still reads last_outcome=HARD_FAILURE from the 08-25 run-2 wrapper timeout -
  the healing chain ran outside the wrapper, so the marker moves next on the 08-30 Sunday run (consistent
  with the recorded refresh arc, noted so nobody reads it as a fresh failure).

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (merge; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- COLLECTOR-SENTINEL INVENTORY **MERGED TO MAIN @6f1bedb22** (Paul: "Merge the branch to main").
  FAST-FORWARD from a5166d166 (merge-base == live main, so no merge commit); mirror main pushed and
  verified in sync (ls-remote == local == 6f1bedb22). Doc-only merge - one new file, 430 lines, no
  producer runs. SHARED-TREE SAFETY HELD: the branch's changed-file set (1 new file, absent from the
  live tree) had zero intersection with other lanes' work; git status porcelain before/after the merge
  is IDENTICAL (39 entries), no index.lock existed before or after. The inventory lane is now closed;
  its live-state observations (supervisor task absent / gates runnerless; 14/16 sentinels dated
  2026-08-28; refresh marker at the 08-25 HARD_FAILURE verdict) remain open observations for Paul.

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (supervisor re-registration; Paul-ordered; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **MoneyballCollectorSupervisor RE-REGISTERED AND THE GATES ARE RUNNING** (Paul: "Re-register the
  supervisor task so the gates run"). No in-repo registration command exists (the task was originally
  registered out-of-band; the supervisor carries only the self-DELETE at :277-283), so it was recreated
  from the docstring's pinned design: Register-ScheduledTask, action
  `C:\Users\pgoff\AppData\Local\Programs\Python\Python312\python.exe "<live tree>\fec\collect\collector_supervisor.py"`,
  trigger every 10 min (RepetitionDuration 3650d - [TimeSpan]::MaxValue serializes to a duration Task
  Scheduler REJECTS on this box, P99999999DT..., a PS 5.1 trap worth remembering), StartWhenAvailable +
  WakeToRun + battery-tolerant. The script self-inserts fec/ on sys.path from its own __file__ (:2), so
  the TASK MUST POINT AT THE LIVE TREE'S COPY - paths.py then resolves ROOT from the script location and
  working directory is not load-bearing.
- OBSERVED SEQUENCE, all from the supervisor's own log: first tick 02:25:23 read "2 targets, 1 done
  (fox), 1 pending" and RELAUNCHED cnn-deep detached; the resumable leg found its 2019-01..2024-02 range
  already complete in iv_fetch_log and wrote cnn-deep.done at 02:25:31 (5s later, no repeated paid work);
  next tick 02:26:22 read "2 done, 0 pending" and entered **GATE-1 (free refresh + audit)**. GATE-2
  (big5 re-score behind B5_GATE_CAP=$200 fail-closed, C retest freshness-gated, reference behind
  REF_GATE_CAP=$100, desks, audit) follows in the same tick; the task self-unregisters after gate2.done.
- CORRECTION OF RECORD vs this lane's earlier entry: "BOTH fully sentineled" was a stale read -
  cnn-deep.done was ABSENT at the 02:25:23 tick (the supervisor is the authoritative witness) and exists
  only since 02:25:31. Also: ALL 16 sentinels now exist (aei.done and nprfeed.done included, contradicting
  the "never existed" read) - mtimes show a full 15-leg sweep ran 00:57-01:48 tonight, so the earlier
  reads were mid-sweep snapshots. A sentinel census taken while a sweep is running is only ever
  "as of <time>".
- **RISK FLAGGED FOR PAUL, not acted on:** the supervisor caps its weekly_refresh gate step at 6000s
  (:148) while the 08-25 full refresh measured ~107 min (20:57-22:44) - over the cap. On timeout the
  gate logs `!! TIMEOUT` and CONTINUES to audit_full (July precedent: reference --score timed out and
  GATE-2 continued; gate1.done is written unconditionally at :150), so a too-slow refresh here reproduces
  the 08-25 published-but-unaudited partial-state shape, with the immediate audit_full step as the
  detector. Raising the supervisor's 6000s cap to match the 7200s pipeline raise is a code change =
  Paul's gate.

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (gate caps removed; user-ratified; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **SUPERVISOR GATE-STEP TIME CAPS REMOVED, user-ratified (Paul verbatim 2026-08-28: "There should be no
  cap"), MERGED TO MAIN @f14fd6429** (fast-forward 6f1bedb22 -> f14fd6429; mirror main + branch in sync;
  live-tree porcelain identical before/after; the target file had zero uncommitted other-lane edits).
  All ten gate_step/spend_guard caps in fec/collect/collector_supervisor.py now route through
  `GATE_TIMEOUT = float(os.environ.get('GATE_STEP_TIMEOUT','0')) or None` - default None = UNCAPPED.
  Revert switch: `GATE_STEP_TIMEOUT=<seconds>` restores a uniform cap (env-dial convention, no git
  revert). DELIBERATELY UNCHANGED: leg wedge detection (STALL_SECONDS, progress-based), the fail-closed
  spend caps B5_GATE_CAP/$200 + REF_GATE_CAP/$100 (money, not time - Paul's ruling read as the time cap
  he was answering; if he meant spend too, that is a separate explicit change), and internal plumbing
  timeouts (CIM 60s / sqlite 30s / taskkill 30s / schtasks 60s). Verification: py_compile clean +
  call-site grep; NO chain run (supervisor is not a chain step, and GATE-1 was live - law 5).
- ACCEPTED RESIDUAL, stated at ruling time: a genuinely hung gate step now runs until killed by hand,
  and the tick's heartbeat lock holds later ticks off while it hangs - visibility is
  collector_supervisor.log + the per-leg .out files. TIMING NOTE: the tick running at merge time
  (GATE-1 entered 02:26:22) imported the OLD code and finishes under the old caps; the first uncapped
  execution is the next gate firing after this landed (e.g. a GATE-2 retry tick, or any future sweep).
  Dial registration debt: GATE_STEP_TIMEOUT belongs in moneyball-config-and-flags - the skills tree
  still carries another lane's uncommitted edits (standing never-clobber), so registration rides this
  entry + the commit body until that lands.

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (spend caps lifted; user-ratified; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **SUPERVISOR SPEND CAPS LIFTED, user-ratified (Paul verbatim 2026-08-28: "Lift the spend caps too"),
  MERGED TO MAIN @e22ab3e7d** (fast-forward f14fd6429 -> e22ab3e7d; mirror main + branch in sync;
  live porcelain identical before/after). B5_GATE_CAP and REF_GATE_CAP call-site defaults go
  '200'/'100' -> 'inf' - GATE-2's dollar ceilings no longer block. KEPT: the two-phase structure
  (the dry run still executes and logs `est ~$X` before --go - it also proves the script runs) and
  the fail-closed unparseable-estimate guard (protects against a broken dry run, not a large number).
  Verified: `float('inf')` parses and `est > inf` is never true; py_compile clean. Revert switch:
  set B5_GATE_CAP / REF_GATE_CAP to a dollar figure. Together with @f14fd6429 the supervisor's gates
  now run with NO time caps and NO spend ceilings, both by Paul's explicit same-day rulings; the only
  remaining gate protections are the fail-closed estimate parse, the big5 artifact-freshness abort
  (no stale-data look), and the required-final-steps condition on gate2.done. First uncapped
  evaluation = the next GATE-2 attempt (each tick is a fresh process; the in-flight tick carries the
  old code). Dial-catalog registration for GATE_STEP_TIMEOUT + the new cap defaults still rides this
  entry (skills tree carries another lane's uncommitted edits).

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (GATE-1 timeout incident; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **GATE-1 TIMEOUT INCIDENT 2026-08-28 04:26 - the exact failure the same-night cap removal exists to
  prevent, fired once more by the in-flight old-code tick.** Sequence, all measured: the 02:26:22 tick
  (old code, weekly_refresh capped 6000s) killed weekly_refresh at 04:26:42 after **7220s wall** (~20 min
  past nominal - the monotonic deadline slid, sleep-skew suspected, unproven), landing MID-CHAIN
  (run_pipeline had started 04:16:58, desk building since 04:23). audit_full then failed in **0 seconds**
  (instant nonzero exit, empty output; contention with the still-running chain suspected, unproven), and
  the old unconditional write stamped gate1.done with "audit clean=False" - a done-flag on a dirty gate.
  GATE-2 opened 04:26:43 and its big5 dry estimate is running under THIS tick's old $200 cap.
- **WHY THE STATE SELF-HEALS: the orphaned chain survived.** subprocess kill reaches only the direct
  child, so run_pipeline (pid 10372) kept running with its whole subtree and will finish through its OWN
  terminal audit_full - the run gets built and audited by the chain itself, independent of the
  supervisor's wrong bookkeeping. And gate2.done is CONDITIONAL on GATE-2's required steps incl. its
  audit_full (the C-1 fix), so a bad end-state withholds gate2.done and the next tick retries - on the
  NEW uncapped code (@f14fd6429 + @e22ab3e7d). The dirty gate1.done means GATE-1 never re-fires this
  sweep; acceptable because the chain completes the same work.
- Slow pre-chain phase explained by measurement: the contact-inference lane's lobbyist_associations.py
  build has been saturating CPU since 02:53 (3,440+ CPU-s; relaunched again 04:28) - the same
  contention class as the 08-25 whisper-shard incident. NOT touched (another lane's live work).
- RESIDUAL DEFECT the cap removal does NOT fix, now twice-observed: **GATE-1 writes gate1.done
  unconditionally** (collector_supervisor.py:150 old numbering) even when its steps fail - the same
  class the C-1 fix closed for GATE-2. With gates now uncapped this write path matters less (steps
  stop dying at timers), but a crashed refresh still stamps the flag. Fix = mirror the C-1 conditional
  onto GATE-1; Paul-gated, not applied.

<!-- appended 2026-08-28 by the contact-inference extraction lane (part 2: build complete; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- CONTACT-INFERENCE AUGMENTED EXTRACTION BUILT, FIVE-LAYER VERIFIED, COMMITTED ON THE BRANCH (metaloop
  run-20260828T0421211456636Z-101ac9dfe4 closed with a verified terminal receipt). WHAT SHIPPED on
  claude/contact-inference-extraction-e4c881: fec/lobbying/{contact_name_extraction, lobbyist_associations,
  validate_contact_extraction}.py + two suites registered in run_tests.py (worktree suite counts 55/0 + 30/0;
  live-tree kernel gate NOT run this lane - registration adds 2 suites at next live gate), the two governing docs
  committed VERBATIM into fec/lobbying/, and the full audit record under audits/contact_extraction_20260828/
  (spec + 2 reviews + grok critique + battery report + samples + retired prototype pins + validation record +
  remeasurement addendum). Codex lane ran HEADLESS the whole build (MCP server stale after the 00:04 auto-update).
- FIVE REVIEW LAYERS EACH CAUGHT A DISJOINT DEFECT CLASS - the lesson that outlives the lane: free gates
  (compile/tests/denominators/determinism) were green over 2 blockers + 13 majors; the first-pass review caught
  code-level defects (circular baseline, forbidden mechanism, dead cue layer, same-process determinism tests);
  execution caught an assumed-schema crash; the pinned-prototype reconciliation caught that THE OLD ARTIFACT
  ITSELF was defective (the .mjs COMMITTEE_GATE silently under-counted committees - gated replica reproduces
  8,594/12,570/12,527 exactly, ungated truth is 12,674/17,231/16,581); GROK caught the class nothing else could
  see - production text as language + the producer-eval interface (possessive apostrophe unresolving members,
  bill-title parentheticals polluting TARGET-staff 5,194->831, office forms landing in the discard class,
  false mechanism notes, missing lob_id org key). All 26+14 findings adjudicated in the coordination ledger.
- FINAL NUMBERS (all composed from the artifacts by compose_records.py, [[ledger/melange-systems-brain/DE-012|DE-012]]-proof): denominators exact
  (539,782 filings / 88 dups / 1,034,711 activities / 746,549 covered positions / 19,306 distinct); 37,444 spans
  over 16,581 candidate activities; classes TM 9,875 / TS 831 / SPONSOR 7,363 / VENUE 17,231 / FP 221 /
  UNRESOLVED 1,923; adjacent-congress collision refusals 108 (reason-coded, counted); byte-identical
  cross-process determinism both producers; battery 35/35.
- GATE E1 INPUTS RE-MEASURED (no look taken; E1/G1-G6 remain Paul's): in-scope resolved TARGET spans = 30 vs the
  eval's >=600/>=40 bars -> E1-a (in-scope-only) is a MEASURED power NO-GO, no longer a projection. E1-b
  (corpus-wide mechanism validation) pool = 10,706 resolved target spans across 2,104 candidate orgs on the new
  builder-resolved lob_id key - ~2.4x richer than the doc's 4,549-activity lead. Five eval-doc amendment
  proposals sit in audits/contact_extraction_20260828/CONTACT_INFERENCE_REMEASUREMENT_2026-08-28.md (incl. the
  Senator-Elizabeth dual-basis correction - the doc's "137 unsourced" line is wrong, 137 is the verified span
  basis - and re-pointing VENUE sanity refs to ungated counts). Adjudication samples (full + blind pairs, seed
  616161) await Paul's G3 read.
- STANDING NOTES FOR FUTURE LANES: (1) after a Codex auto-update the running MCP server stays pinned to the
  deleted install until session restart - headless codex exec on the new version dir is the bridge; exec-level
  flags go BEFORE the resume subcommand. (2) The ledger's receipt structure check rejects markdown-backticked
  tags - record via a labeled backtick-normalized copy with the true reply's sha in the payload. (3) grok -p may
  return intent-preamble instead of work on the first call - re-dispatch demanding the finished critique in a
  single reply. (4) M2's p_employment(l,y) no-look-ahead guard is CONSUMER-side: receipts carry filing_year;
  any future fusion consumer must filter filing_year <= y, and first_disclosure is left-censored at the 2021
  corpus edge.

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (sentinel deletion + restoration; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **TWELVE COLLECTOR SENTINELS DELETED BY AN OUTSIDE ACTOR, THEN RESTORED ON PAUL'S ORDER** ("restore
  the sentinals"). Between 04:37 and 08:36 the collector_sentinels/ directory went 16 -> 2 files
  (only cnn.done + cnn-deep.done survived); the inventory proves NO in-repo code deletes sentinels, so
  the deleter was a launcher/human session or OneDrive sync - source UNRESOLVED. Effect: fox read
  pending, the supervisor looped "RELAUNCHED fox detached" every tick from 08:36 (each pass completing
  with 0 member turns yet fox.done never reappearing - repeat deletion or _sentinel()'s silent
  `except: pass` at fetch_interviews.py:1136), and the GATES WERE BLOCKED (run only at 0 pending)
  while the submitted $118.57 big5 batch sat uncollected (PEND aborts are no-double-spend by design).
  RESTORED 12:02:16: fox.done BYTE-EXACT to its recorded content (2026-08-28T01:27:10.737351), 13
  others reconstructed to the second from observed pre-deletion mtimes - all 16 legs genuinely
  completed in the 00:57-02:25 sweep, so this restores a true record. Sentinel contents stay
  UNCOMMITTED (runtime state; the 2026-08-02 committed vintage stands).
- Ops record for the whole supervisor arc (re-registration, cap removals, GATE-1 incident, batch
  status, watch items, Paul-gated follow-ups incl. the GATE-1 unconditional done-flag and the
  _sentinel silent-except): **audits/COLLECTOR_SUPERVISOR_ACTIONS_2026-08-28.md @7e4122188**, merged
  to main, mirror in sync. If sentinels vanish AGAIN, that settles the deletion question in favor of
  an active deleter - re-diagnose then (Paul: "Not necessary if they are abiding by the python code").

<!-- appended 2026-08-28 by the collector-sentinels inventory lane (big5 batch diagnosis + RUN2 roll-up; [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **BIG5 BATCH DIAGNOSED: NEVER SUBMITTED, $0 SPENT.** Every GATE-2 `--go` since 04:35 crashed at the
  unguarded submission call (`big5_llm.py:270` `client.messages.batches.create`, no try/except): the PEND
  file a successful submission always writes (`big5_llm_batch_opus.json`, :264/:271-272) does not exist,
  and big5_llm_opus.json + the score cache are byte-untouched since 2026-07-07. The traceback lands on
  stderr, which `gate_step` discards (only the last stdout line survives) - so the failure was invisible
  in the supervisor log for eight hours. The "$118.57 proceeding" lines were ESTIMATES only. GATE-2 loops
  harmlessly (~1-11 min/attempt, zero spend) but cannot converge. **DECISION PENDING WITH PAUL** (options
  presented: loud-error patch at :270 [recommended], controlled one-shot with stderr captured once the box
  quiets, or his own console run; account credit + key validity checkable without any run). Diagnostics
  HELD per law 5: a manual `run_pipeline.py --from per_category_stance` (not a supervisor path) started
  12:39:38 in the live tree. Full done/next roll-up:
  **audits/COLLECTOR_SUPERVISOR_ACTIONS_2026-08-28_RUN2.md @7d773302c**, merged, mirror in sync. New
  Paul-gated fix candidates recorded there: big5_llm.py:270 exception handling; gate_step stderr
  discard; GATE-1 unconditional done-flag; _sentinel() silent except.

<!-- appended 2026-08-28 by the collector-supervisor review lane (worktree collector-supervisor-actions-review-1a8864; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **SUPERVISOR ARC NIGHT SHIFT: peer lane owns the repair; this lane reviewed.** Paul's evening directive
  ("Check what is going on with these files... fix as you see fit") landed on TWO lanes: the ACTIVE
  fervent-mendeleev-1c9dc5 session had already applied a 13-file uncommitted repair in the LIVE tree
  (~14:10-18:50; its record = COLLECTOR_SUPERVISOR_ACTIONS_20260828_RUN3.md, uncommitted in the main
  tree). This lane confirmed the four RUN2 defects at HEAD 7d773302c, then STOOD DOWN from editing
  (never-clobber) and delivered a read-only review + runtime diagnosis instead — record committed as
  audits/COLLECTOR_SUPERVISOR_CODE_REVIEW_2026-08-28.md on branch
  claude/collector-supervisor-actions-review-1a8864 (UNMERGED, mirror-pushed; merge = Paul or the peer's
  close-out). Load-bearing findings handed to the peer, acknowledged by it in cross-session messages:
  (1) HIGH fox-sentinel dispatch regression (live fetch_interviews.py calls _sentinel() only on the cnn
  branch — fox completes sentinel-less, relaunch loop now structural); (2) HIGH GATE-2 cannot converge
  (requires audit_full returncode 0, but audit_full exits 1 on the standing Paul-gated V-1 + legfix5
  items — once the big5 400 is fixed GATE-2 becomes a spending loop under the 'inf' caps; needs GATE-1's
  KNOWN_GATED_FAILURES tolerance FIRST); (3) the GATE-1 loop root cause was the peer's own fail-closed
  bill-repository contract firing on the never-produced bill_repository_live.json — RESOLVED INLINE at
  23:00:58 when the 22:06 refresh produced it ("GovInfo BILLSTATUS: 464 refreshed, 0 failed", first ever);
  (4) mirroring GATE-2's audit_full-returncode conditional onto GATE-1 (the RUN2 fix-3 sketch) would
  DEADLOCK — the tolerance ladder lives in weekly_refresh.py:124-168, not audit_full; (5) big5 400 still
  root-cause-unknown (big5_traits.py success is NOT evidence — different program; next real test = next
  GATE-2 re-score firing; full error body still persisted nowhere). Paul-side unchanged: iCloud SMTP
  creds, account/key check if the 400 is account-shaped, fox sweep-design call, dial-registration debt.

<!-- appended 2026-08-29 by the collector-supervisor review lane (deleter re-diagnosis; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- **SENTINEL DELETER SOLVED — it was a Codex reviewer's QUARANTINE, and the files still exist.** Paul-ordered
  re-diagnosis (2026-08-29) closed both deletion events. (a) The 08-29 13:16-13:26 fox.done deletion was PAUL
  HIMSELF — a deliberate live fire test directed by the fervent-mendeleev lane (it stamped all 16 sentinel
  mtimes to 01:12 at 13:16:01 — those mtimes are test artifacts, not evidence — was twice permission-blocked
  from deleting, and handed Paul the command). Test PASSED: tick fired fox 13:26, leg self-committed fox.done
  13:30:48 under the fixed dispatch. (b) The 08-28 mass deletion: TRUE WINDOW 07:16:23-07:26:23 (RUN2's
  "04:37-08:36" and "twelve sentinels" are both wrong — 14 deleted / 2 spared; frozen-vintage, corrected here),
  and the actor is PROVEN: the Codex N4 "adversarial review" agent of metaloop run
  run-20260828T0436464194035Z-65299375bd ran a guarded pwsh MOVE at 07:19:15 EDT (rollout
  rollout-2026-08-28T00-36-01-01a046a7-4210..., event 6863) quarantining the .done files to
  **outputs\quarantine\legacy_false_sentinels_20260828\** — where all 14 sit today with original timestamps
  (physically confirmed 08-29). No malice, no OneDrive, no in-repo deleter (hardened census: no deleting code
  in ANY file of any scanned type, all 18 worktrees, gitignored included). There was never an ACTIVE deleter:
  the all-day relaunch loop was the missing-write defect (then-live fetch_interviews dropped _sentinel from
  all legs but cnn — since fixed). The 12:02 hand-restoration recovered files that still existed in quarantine;
  byte-check against originals is available if wanted. PROCESS LESSON: a Codex-lane shell action in the live
  tree emitted zero glassbox telemetry — everything-must-emit was bypassed by an agent shell command.
- Same-day supervisor state: SENTINEL_FRESH_S timed-freshness dial live since 13:24:47 (default 7d, stale =
  PENDING + refire, never deletes; Paul's ruling "sentinels fire on a timed basis"); review flags accepted by
  the owning lane: per-target refire backoff planned (weekly-expiry hazard), loud-fail wrapper on the
  UNTRACKED audit_failure_gate.py import (commit of the 13-file repair = Paul's gate, escalated), wiring-test
  suite fix in flight. GATE-2/big5-400 capture still pending (watcher armed in the review lane).

<!-- appended 2026-08-29 by the staffer-expansion lane (worktree melange-data-expansion-958236; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- STAFFER NETWORK EXPANSION lane OPENED (2026-08-29, Paul-directed): design draft + metrics doc committed on
  claude/melange-data-expansion-958236 (STAFFER_NETWORK_EXPANSION_DESIGN_2026-08-29.md +
  STAFFER_NETWORK_METRICS_2026-08-29.md). DRAFT ONLY - zero code/data/engine changes; 9-item decision menu
  (D-Q1..D-Q9) awaits Paul. Channels LIVE-VERIFIED same day: Politico Pro directory 18,618 staffers
  (member+committee filter; profile = employment history w/ month ranges + education w/ degree/major; Paul
  logged in himself, session drove the authenticated tab - credential-entry stays barred), House SOD CSVs
  2009Q3+ (fields byte-verified; ProPublica mirror 2009Q3-2020Q1 carries BIOGUIDE_ID), LDA API MOVED to
  lda.gov (301 from lda.senate.gov; covered_position confirmed per-lobbyist-per-filing; 120/min keyed),
  LittleSis relationships.json.gz profiled (1,880,491 records; Position 368,995 w/ 9.6% dual-dated;
  Education 44,673; CC BY-SA), Senate Secretary reports PDF-only Apr 2011+. OpenSecrets rev-door has NO
  machine path (API discontinued 2025-04-15). Existing in-repo asset: staffdir = Quorum export, 5,773
  current staffers, no history/education (producer fec/members/build_staff_directory.py) - the lane
  EXTENDS it. Load-bearing new dependency: historic bioguide roster (legislators-historical/voteview) for
  alumni stints under former members. Influence-language stays BARRED on revolving-door edges (LD-2
  circularity + FEC-LDA R3 precedents).

<!-- appended 2026-08-29 by the staffer-expansion lane (scope ruling folded; direct commit per [[ledger/melange-systems-brain/D-006|D-006]]) -->
- STAFFER LANE SCOPE RULED by Paul 2026-08-29: NOT a new website/surface/product — an additional LAYER for
  the engine and the social-network analysis; deliverables are methods, computation, and extraction only.
  Both lane docs REDONE to v2 (commit 00196e1af on claude/melange-data-expansion-958236): product framing
  removed, INTEGRATION section added — staffer_network_* artifact family named to FAIL every existing
  selection glob (holistic ISO precedent), STAFF_NET dial {off|analysis|engine} default OFF, engine
  consumers enumerated (influence multiplex, bipartisan/bridge, coalition; receptivity EXCLUDED) and each
  arming individually Paul-gated under the CONSTRAINTS rank-moving verification order. New gates: I-10a
  isolation (dial off => ranks byte-identical + glob census) and I-10b arming protocol; I-15 influence-
  language lint. All v1 channel/extraction/math content carried forward unchanged.


## 2026-09-01 member-narratives semantic repair lane (Claude close-out, worktree caveman-feature-toggle-3a6ecd)
- The 533 member approach briefs (member_narratives_v2.json, repo root) were regenerated with claude-sonnet-5
  plus a separate Sonnet semantic reviewer, then passed through a deterministic scope sanitizer
  (fec/members/sanitize_member_narratives_v2.py, Codex), deduped (91 briefs, Paul-ordered), merged and
  ACTIVATED. Installed sha256 1d391430d182f4128fbf9fe71d7559f7f720629ae8a4f62f02e20ed52a1c3409; semantic
  receipt at data/members/member_narratives_v2_semantic_receipt.json binds it (active_artifact_sha256,
  evidence_sha256, basis 1e14d1dd...); backup member_narratives_v2.pre_semantic_repair_20260901.json.
- Desk REBUILT 2026-09-01 23:49 local after a Paul-ordered bill-refresh re-run (464/464 PASS): 533 narratives
  rendered, 0 withheld, prose byte-identical to source. Record: audits/MEMBER_NARRATIVES_SEMANTIC_REPAIR_20260901.md.
- OPEN: audit_full.py crashes at :484 on the press-refresh receipt gate (uncommitted fec/press_stream.py, press
  lane) so the full audit has not run since; the focused test pins 268/143/125 against the pre-repair artifact
  and now fails by design (282); all six narrative pipeline files plus the test are UNTRACKED; API credit
  balance hit zero 17:51 local (about 114 USD spent on the lane); Paul asked to rotate the Anthropic key.
- Meta LOOP: Codex runs ce753a937d, bdb09df27c, eccfac97a9 closed as run.blocked (recover) on Paul's order;
  Claude-lane work emitted without a run id (the auto-mode classifier refused metaloop start and every fec
  script launch from the session; Paul launched generation, the session ran merge/activate/desk/audit).
- Paul directives this lane: no git commands (session-wide, me and agents); plain checklist review, not adversarial.


## Staffer spine verification update — 2026-09-08 (identity scope only)
The verified identity release is hill_personnel_spine_20260908_v8_primary, with matching twin and verification directories under Melange audits/staffer_network. PASS 50/50, zero failures, seven byte-identical files; 144,692 records, 204,699 spans, 1,351,415 observations conserved. Targeted tests: 213 plus 48,308 parser subtests. Release receipt and checked maps are in spine_identity_adjudication_20260908. Review queues: 3,605 Senate annotated-title groups involving 5,513 IDs; 57 suffix-conflict records; 87 suspect name parses. These are review candidates, not promoted identities. The concurrent ranking task acknowledged and independently hash-checked the release (17 verification bindings and 11 release-source bindings), and owns rebuilding and verifying staffer_social_network_20260908_v8_math_* with the direct native v6-to-v8 map. Graph/surface selector migration is not part of the completed identity release and must follow that graph verification. This subsection verifies only the identity work; it does not refresh unrelated STATE claims or the global Last verified stamp.

Post-commit dependency review found the live payroll-identity selector still pointed at a native-v6 bundle. Astra rebuilt its evidence from v8 source-row ownership into payroll_identity_20260908_v8_primary and an identical twin: 425,825 episodes, 135,039 people, 231 record pairs, and all 1,351,415 admitted rows conserved. Independent receipt PASS with 13 bindings, Cooper/Wood separation checks, unchanged LDA-only user assertions, and no canonical promotions. The ranking lane completed the coordinated v8 graph, payroll-identity and dashboard cutover in Melange commit 07155928e04e51dc9f344f832acddb9dc44e8025. Completion status is COMPLETE_LIVE_V8_VERIFIED: 120 cutover tests pass; all 144,692 payroll IDs are accounted for; both split pairs remain separate; the service is ready with no errors; and all four data islands plus the authorized Moneyball_Redesign.html response are verified. The 15 broader audit failures are classified as pre-cutover email-package and historical-manifest issues, not cutover regressions. Evidence: audits/STAFFER_PAYROLL_IDENTITY_V8_MIGRATION_2026-09-08.md and audits/staffer_ranking_math_20260908/completion_receipt.json.
