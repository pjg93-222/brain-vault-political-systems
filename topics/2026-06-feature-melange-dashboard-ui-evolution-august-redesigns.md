---
type: topic
title: "Industry tab round 2, black/gold retheme, simplification and preview workflow (08) (Melange dashboard UI evolution)"
aliases: ["Melange dashboard UI evolution: Industry tab round 2, black/gold retheme, simplification and preview workflow (08)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-06-27
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/frontend", "category/feature"]
part_of: "[[2026-06-feature-melange-dashboard-ui-evolution]]"
---

# Industry tab round 2, black/gold retheme, simplification and preview workflow (08) (Melange dashboard UI evolution)

> Dashboard UI in August 2026: the industry-tab round 2, the black and gold retheme, the rankings-and-data-only simplification and the preview workflow. Part of [[2026-06-feature-melange-dashboard-ui-evolution]] (project [[melange-systems]]).

## Industry-tab UI round 2 (2026-08-03)

Paul's 2026-08-03 request on the industry page: a tab back to the main dashboard; a cultivate/maintain/disengage indicator per (industry, member) and (org, member); and a click-through from a member to every interaction sorted by year with date, filing lobbyist, bill, position, and notes. Built UNCOMMITTED on `claude/industry-network-ui-23cabd`. Also feeds Primacy and industry tier boards.

**Two decisions Paul made at the gate (AskUserQuestion, 2026-08-03):**
- POSITION -> "Both — ship column now, classify later." The column ships wired and empty; running `classify_bill_positions.py` is a SEPARATE gated step he had not authorized then.
- POSTURE WORDING -> "Ship both — one badge, a toggle for wording", **defaulting to HIS wording** (Cultivating / Maintaining / Disengaging), neutral wording (Rising / Steady / Falling) behind the toggle.

**THE MEASURED FACT that shapes feature 3: the LD-2 form has no position field.** 0 of 24,819 in-scope activity records carry any position key. So "position taken by lobbyist" has no disclosed source: it is the disclosure regime, not a collection gap. Never quietly fill this column; the honest substitute is the lobbyist's verbatim description, which the ledger carries on every row. `position` / `position_basis='not_disclosed'` is the wired-but-empty slot.

**New files (all UNCOMMITTED on `claude/industry-network-ui-23cabd`):**
- `fec/lobby_interactions.py`: per-activity ledger producer. Reuses `build_network_2021_rebuild` for attribution + bill resolution + sponsor map, so it agrees with the shipped network BY CONSTRUCTION. `verify_against_network` is a HARD GATE that refuses to write on any dyad disagreement; it passed **EXACT on all 78,244 dyads**. Output -> `%LOCALAPPDATA%\Melange\lda_rebuild\derived\interactions\`.
- `fec/lobby_posture.py`: the posture rule. Complete-year windows only (2024-25 vs 2022-23), 25% band, 3-bill evidence floor; the 2026 partial year is EXCLUDED from the trend (including it manufactures a decline everywhere) and enters only to rescue dormant -> returning. Dials `LOBBY_POSTURE_BAND` / `LOBBY_POSTURE_MIN`.
- `fec/make_lobby_interactions_html.py`: the `lobby-interactions.html` surface, `?sector=<sector>&b=<bioguide>`.
- `fec/tests/test_lobby_interactions.py`: 24 tests, all green.

**Numbers worth not re-deriving:** 24,819 in-scope activities 2021-2026; 7,210 cite a bill (29%); 32,561 ledger rows = exactly the bill index's `sum(n_activities)` (independent cross-check); 4,031 distinct notes; 40,307 bill-member rows. Ledger build about 25 min (the BILLSTATUS sponsor-map load with `include_forecast_metadata=True` dominates).

**Size is the binding constraint on these pages.** Industry page guard is 5 MB and HEAD already built to 4.50 MB on current data: the additions cost +136 KB (4.64 MB, 93% of budget). The interactions page needed its own 6 MB guard and index-compression to fit at 5.05 MB: posture verdicts ship as `[stateIdx, recent, prior, partial, delta]` with the words in one shared table (carrying the derivation sentence per row cost 3.4 MB), and channel / period / covered-positions / entities / notes are interned. If either page grows again, shard by sector rather than raising the guard silently.

**Both builders are run MANUALLY** (no chain script invokes them). From the worktree, needs `MONEYBALL_ROOT` pointed at the main tree because `bills_audit.csv` is gitignored and not in worktree checkouts. `fec/deploy_lobby_pages.ps1` now wraps all of it.

**THE 2026-08-03 DEPLOY FAILURE: the lesson.** I built both pages into a scratchpad preview dir, verified them there, and told Paul where they were. He opened his own tree and saw nothing: `lobby-network.html` was still the Aug 2 build with **zero outbound links of any kind**. Then the "rebuild" command I handed him (`python fec/make_lobby_interactions_html.py`) was a file-not-found, because that file only existed in the worktree. **Building is not delivering. Deploy to the artifact the user actually opens, then verify THERE.** Contributing cause since fixed: the interactions builder defaulted `--out` to a derived staging dir while its sibling defaulted to MB_ROOT (a builder that prints success while the page nobody can see stays stale). Both now default to the live tree.

**POSITION CLASSIFICATION (Paul authorized "Run the haiku API" 2026-08-03):**
- `fec/lobby_position_items.py` -> 22,660 work items (2,721 duplicate content-hashes collapsed), all bills present in BILLSTATUS. Reuses the SHIPPED `work_items_from_payload`, so the prompt and title resolution are the validated ones; only FORMALLY CITED bills get items, so title-only ledger rows stay `not_disclosed` by design.
- **FEWSHOT IS REFUSED, NOT UNUSED.** All 5 cached exemplars in `raw/positions/exemplars.json` collide with this corpus on (lob_id, bill) (they are all one org's 117th-Congress bills), so the classifier's own leakage guard fires. Correct guard. Shipped ZEROSHOT instead: costs 0.5pp on the validated three-class primary (0.9419 vs 0.9466) and is leakage-free.
- **`--workers 8` HANGS.** Dies at about 405 items with all 8 sockets established-but-silent; each worker then burns 90s timeout x 6 retries. The API was verifiably fine throughout (0.6s/call, 10k req/min limit, nothing throttled), so it is a client concurrency fault, not rate limiting. **`--workers 4` is stable at 3.34 items/s (about 201/min, about 110 min for the full corpus).** The manifest checkpoints every item so a kill/restart resumes losslessly.
- **Only the THREE-CLASS collapse may be displayed.** Five-class agreement is 0.479 zeroshot and Amend F1 is 0.00: not a distinction this classifier can make. The badge shows Support/Oppose/Engage; the raw five-class guess lives in the tooltip. Every inferred row wears an INFERRED tag: Support F1 0.548, Oppose F1 0.492 on n=30, against 0.971 for the majority Engage class that carries the 94.2% headline. Never let that headline travel alone.

**Pre-existing test failures, NOT mine (verified identical on HEAD by stashing):** `test_bill_collision_guards` 25/3, `test_bug_report_regressions` 62/2 (README says "84 kernel", test wants "64 kernel"; govinfo `X-Api-Key` header), `test_lobbyview_network` (fixture passes a .json path as data_root). Don't re-diagnose these as regressions from this work. Related memories: `melange-coalition-builder-redesign-2026-07-30`, `lobbyview-integration-2026-07-31`, `ask-before-substantive-changes`.

## Black/gold retheme (2026-08-06)

Run `run-20260806T0546149493947Z-228d657998`. **COMMITTED @82f3f6c and MERGED TO MAIN @08aa584** (2026-08-06), artifacts **DEPLOYED** (the memory description still said UNCOMMITTED on `claude/dashboard-color-ui-design-596440`; the body is newer and wins). Paul opened every gate ("apply it... then regenerate", "Commit", "open the PR and merge to main"). No remote is configured on this repo and gh is absent: a PR is impossible; the local merge in the `cxwt-main-merge` worktree (where main is checked out) is the PR-equivalent, consistent with every prior lane. Main had diverged (+e779727 scale upgrade); file sets were disjoint, merge-tree dry run showed zero conflicts, and the deployed artifacts needed no re-regeneration because e779727 touched only data-layer scripts whose outputs were already in the live data when the surfaces were built.

- Paul's ruling 2026-08-06: the `Moneyball.html` / `Moneyball Dashboard.html` file names STAY; visible text is Melange everywhere; do not re-propose renaming the files.
- **How the deploy was done:** the live tree sat on a DIFFERENT branch (`claude/cfpb-sentiment-recorrection`) and the worktree had no `dashboard_data.json` / `ranks_python.json` (inputs live only in the live tree), so the WORKTREE's producers were run with `MONEYBALL_ROOT` set to the live tree: worktree code, live data, live outputs. The five deployed `.html` files are **untracked** by git, so the live working copy stays clean and the other branch undisturbed. Verified clean after.
- Build order enforced by `make_combined.py`: dashboard -> lobby-network -> lobby-interactions -> **member desk** -> combined LAST. The desk staleness guard (`dashboard_exclusion_reconciliation.json` mtime vs `cu-member-desk.html`) was left ACTIVE; never set `COMBINED_STALE_OK=1`. Backup of the pre-retheme artifacts: `backups\pre-melange-retheme-20260806-133237`.
- **THE SPLIT-ROLE COLOUR LAW** (full table in [[melange-dashboard]]): a hex is chrome or data by its *occurrence*; confirmed split-role `#58a6ff`, `#1f6feb`, `#fbbf24`, `#fff` and the greys `#8b949e #9ca3af #9098a4 #94a3b8 #6e7681 #7d8694 #e6edf3 #3a414b` (mapping four distinct greys onto one token collapsed STCOL T and N into the same colour). `rgba()`/`rgb()` literals exist too (54 of them, 28 distinct); an rgba inherits its base hex's status. Verification (`scratchpad/final_audit.py`): UTF-8 decode of HEAD and worktree, non-ASCII inventory (mojibake), colour multiset diff where every delta is an authorised chrome substitution, byte-compare of `STCOL PTCOL TIERCOL TRK_COL PILL INDUSTRY_FAMILY BILL_LOBBY_SECTOR_COLORS`. Final: 732 authorised deltas, **0 data-colour deltas, 8/8 structures identical**.
- Contrast checked against every surface: `--faint:#8D8673` (4.83 on bg) failed AA at 3.65 on `--panel-hover`; corrected to `#9D9784` (worst 4.53); 36 raw literals still carried the old value after the token update.
- CVD (`scratchpad/cvd_check.py`): gold chrome NOT more confusable with data than the old blue (deltas -0.8 deuteranopia, -0.3 protanopia); the OLD blue chrome sat dE 9.0 from the *Democrat* party blue, gold moves the nearest collision off a party colour.
- Binding rule: **gold is never a small saturated mark**; borders use `#433317` / `#564019`; defuses `#c2862a` (pillar demographic) at dE 3.0 from `#BB8525`.
- Font: no webfont embedded (surfaces self-contained, near a page-size ceiling); stack `"Century Gothic","Tw Cen MT",Futura,"Avenir Next","Segoe UI"` (both Century Gothic and Tw Cen MT installed on this box); chrome only, `#mname` and dynamic industry/organization/member `h2`s excluded via `:not()`.
- **Mentat glyph APPLIED 2026-08-06, Paul approved:** viewBox `0 0 128 208`, path `M108 20 L64 64 L28 104 L64 144 L20 188 M64 64 L100 104 L64 144`, fill none, stroke `#EECD5C`, miter join, miterlimit 6; stroke-width 18-19 at wordmark size, **24 at favicon size**; favicon is a self-contained data URI with `%23` for `#`. Lobby branding also changed to Melange.
- SETTLED: `.sbar i` keeps its blue -> green gradient (an indicator, not chrome: fills quantitative score bars).
- NOTE: the live tree's branch (`claude/cfpb-sentiment-recorrection` @ e779727) then sat behind main's merge tip 08aa584: harmless (deployed artifacts already match merged code), but a future rebuild FROM THE LIVE TREE'S OWN CHECKOUT would use pre-retheme templates until that branch is fast-forwarded or switched. Index-line update (2026-08-19 compaction): the cfpb branch and main were SYNCHRONIZED at **@3881f1d** (the lane-law series merged 2026-08-09); before that commit the two diverged on templates. See also memory `glassbox-lane-lock-hang-2026-08-06`, `ask-before-substantive-changes`.

## UI simplification, rankings-and-data-only (2026-08-11)

Meta LOOP run `run-20260811T1607328631720Z-dd8808773e` (terminal receipt `evt-...2a003fa179`). Paul's task: simplify the dashboard UI for a working lobbyist, "multiple designs for everything, every page, I select which for each, and then we commit."

**PAUL'S DESIGN LAW (2026-08-11, second gallery rejection): "None of these should be fancy pitches, not direct recommendations, all they should be showing is rankings and data."** No advocacy voice, no "with us/against us", no likelihood words, no advisory copy, no recommendation columns: structural simplification only (dedup, caps, folds, plain labels). ALSO: skeletal mockups rejected: he needs FULL-FIDELITY pages (real CSS, real payload data, working links, current page as clickable baseline; the side-panel render strips JS, so variant navigation must be plain hrefs, never JS tabs).

**Ratified selections (ledger fact `paul-selections`):**

| Page | Selection | Detail |
|---|---|---|
| industry landing | B | attention capped 25 + show-all, mentions 10 + show-all, bioguide IDs out of display, "2026 change (partial)", bank-tier machinery folded |
| champions | B | six per-chamber tables merged into champions + threats tables, Both/House/Senate toggle, tier pills joined by bioguide from tier-board rows, mixed/tier-board/intensity in folds, bundle sha to footer, rows expandable, Issues into expansion |
| bills | A | Years-active into expansion, 50-cap + show-all |
| forecast | A | picker + ranking first, metrics + verdict folded, base-rate context removed, whole-% probabilities |
| screen | A | 6 cols, member desk links with bioguide-shape guard `/^[A-Z]\d{6}$/`, share/stability + bill overflow in expansions, rho/p receipts folded |
| filings | CURRENT | no change |
| dashboard | B | 4 renames only: subtitle "stance and influence by policy issue", "Group by policy area", "citation links", "joint appearances" |
| desk | CURRENT + Responsiveness | the Engagement & receptivity block (suscRows + READS + quick-read, tpl 860-880) moved verbatim out of psychHTML's right column into its own `section('Responsiveness','resp',respHTML(m))` between Behavior and Legislative actions |

**State: SHIPPED.** @4e0783cf3 (`codex/ui-simplify`) -> @11a2326b1 (session branch `claude/dashboard-ui-redesign-2b5dc6`) -> MERGED TO MAIN @07e7dd270 and DEPLOYED 2026-08-11 about 20:45-20:51 (Paul: "Merge to main and deploy chain"). (The memory description says "NOT yet on main, NOT deployed", written before the merge; the body is newer and wins.) All 9 live surfaces rebuilt from the live tree in chain-enforced order (dashboard -> lobby-network -> lobby-interactions -> desk -> combined LAST; staleness guard left ACTIVE). Deploy run `run-20260812T0018393544201Z-d16ec20470` (terminal receipt `evt-...7a28cb6945`).

**MERGE CONFLICT, the pattern to expect:** main had moved (+4 commits) with a parallel lane's **CU RESPONSIVENESS TAKE-UP SURFACE** (d16625a1c: ask-registry ledger, `responsiveness_layers` producer at `data/engine/responsiveness_layers.json`, desk panel, MLN CU chips + note, chain step after primacy). One conflict, in the tier-board note line: they appended `${responsivenessNote}`, I removed the "Uniform clean method (bundle ...)" sentence (moved to footer). **Resolution = UNION of both intents**, verified live afterwards (note tail carries their responsiveness sentence; bundle sentence appears exactly once, in the footer). Two features now both say "responsiveness" on the desk: MINE = the Responsiveness section (engagement/receptivity reads); THEIRS = ask take-up (answered/eligible chips). They do not collide: main never touched the desk tpl; their panel is bundle/python-side.

**DEPLOY VERIFICATION RECIPE (reusable):**
1. Backup all 9 artifacts first (`backups/pre-ui-simplify-20260811/`).
2. `ranks_python.json` md5 before/after (surface producers never write it; stayed d73a1d5a...).
3. **The desk producer DOES rewrite `member_desk_bundle.json`** (`make_member_desk.py:2317`), so gate on content, not md5: extract the bundle from old vs new `cu-member-desk.html` via the tpl's `__BUNDLE__` pre/post anchors and diff: result was ZERO member-field deltas across 533 members, only `freshness.generated_at` + `integrity.validation.input_fingerprint`, and **that fingerprint BY DESIGN includes `make_member_desk_00.tpl` (`fec/audit/dashboard_integrity.py:442`)**, so editing the template MUST change it.
4. Confirm the other lane's payload survived (85 CU rows with answered/eligible, Padilla 7/11, identical pre/post). NOTE: the JSON file is dumped BEFORE efficiency_layers keys are added to the in-memory bundle, so JSON-file-vs-HTML-embed comparisons are apples-to-oranges: always compare HTML embed to HTML embed.

**BLOCKER CLEARED: pre-reorg stray shadows, second occurrence.** Six untracked stale files (5 tests at `fec/tests/*.py` + `fec/templates/make_member_desk_00.tpl`) shadowed canonical paths and made the unique-basename guard refuse EVERY kernel-test and chain run. All were older + smaller than their canonical twins. Moved intact to `fec/_quarantine_prereorg_strays_20260811/` (restorable, another lane's property). They surface ONE AT A TIME: enumerate all duplicates up front with `find fec/tests -name "test_*.py" | xargs -n1 basename | sort | uniq -d`.

**OPEN FINDING FOR PAUL (pre-existing, NOT from this work): kernel `test_primacy_tier` 2 failures: the live desk bundle violates ratified `legislative_press_tiers` pins.** Catherine Cortez Masto pinned T1 rank<=13 -> now T2 rank 19; Bill Huizenga pinned (2,16) -> now (1,12); Young Kim pinned rank 14 -> now 18. Proven pre-existing: the bundle (13:35) and `industry_tiers.json` (13:03) predate my merge by about 7h, my merge touched zero data/engine files, the failing tests import none of my files, and the drift is already present in the PRE-deploy deployed artifacts. Tier membership is Paul's domain: awaiting his adjudication. (Distinct from the industry/uniform-clean-v1 board, which is unchanged.)

**Load-bearing implementation facts:** (1) `test_lda_rebuild.py` is a DISPLAY-PIN suite: ratified display changes require updating its pins (14 assertions updated + the module's test REGISTRY list at about 10507 references function names; a rename without a registry update = import-time NameError); 243/243 green after. (2) The family builder's `between()` slicing has frozen OPENING markers AND closing delimiters: the intensity fold changed the champions closing sequence, requiring the line-3955 delimiter string update (`</div></details></section>`). (3) Champions v2 rows carry tier only for credit_union (sanitized); non-CU tier pills join via `DATA.championsV2.industry_tiers.industries[sector].rows` by bioguide. (4) `memberLink(name,id,flag)`: id null bypasses the name===bioguide guard; unresolved members ship name=bioguide, hence the shape guard. (5) Desk render-verify WITHOUT running `make_member_desk.py`: extract the live page's payload between the tpl's pre/post `__BUNDLE__` anchor strings and re-inject into the new tpl, serve scratchpad, `?m=<name>` (the 42MB page is slow in a hidden pane: wait 10s+ before probing). (6) Dashboard verify: tpl.replace `__DATA__` with the live `dashboard_data.json`; the engine self-check stayed green (flip 2.17 = py 2.17). (7) Colour-law check on a code MOVE: diff colour literals must appear in balanced +/- pairs; builder colour multiset 112 occurrences + TIER_COLORS hash unchanged.

**Lane lessons:** Codex issued 5 valid STOP REPORTs across the run: 3 were MY spec defects (memberLink signature, (former) rendering, AC count vs pre-existing occurrence): coordinator spec authoring is still the dominant failure mass. A Codex MCP call that idle-times-out (6044s) can STILL complete on disk later: the C2 "ghost session" applied its edits AFTER my post-timeout clean-check; the retry thread caught the drift. Recovery = verify the diff yourself against the contract, close the retry thread, record the receipt with honest provenance. The C3 reply omitted its RECEIPT (caught at gate, corrected on-thread): the ledger's structural receipt validation rejects paraphrased receipt files (verbatim RECEIPT block + INV enumeration required). Sandbox: python execution DENIED in worktrees (not just writes), so per-increment compile converts to Fable-external end-of-run compile (Option-2 batching). The adversarial second review earned its cost: 2 real defects (unresolved-member links, cap-state leak on org-driven sector switch via `openOrganization` line about 3572) found after 243/243 tests were green.

Residue: temp worktree `C:\Users\pgoff\AppData\Local\Temp\claude\cxwt-ui-simplify` undeletable (open handle, Permission denied post-merge): disposable, branch `codex/ui-simplify` retained (merged). Mockup gallery + verify builds live in the session scratchpad (ephemeral). Related memories: `industry-tier-recreation-2026-08-09`, `melange-ui-retheme-2026-08-06`, `industry-tab-interactions-2026-08-03`, `universal-lane-laws-2026-08-09`.

## Dashboard preview workflow (2026-08-18; reference)

The UI lives entirely in `fec/templates/make_dashboard_html_00.tpl`; the audit checks only `dashboard_data.json`, NOT the tpl/HTML. Safe preview: scratchpad builder (`tpl.replace('__DATA__', json.dumps(...))`), `python -m http.server 8899 --bind 127.0.0.1`; **SAFE PREVIEW PORT = 8802** (8801 is Paul's: never bind it). The claude-in-chrome `navigate` prepends `https://` (file:// breaks). **2026-08-18 trap:** in the Claude_Browser pane rAF fires ZERO frames (visibilityState 'hidden', stays hidden after fronting; screenshots refuse), so working animation code looks like "the feature does nothing": five rounds wasted. Run the ONE-STEP DIAGNOSTIC first (`f===0` after about 700 ms => harness, not code); better fix = stub `requestAnimationFrame` and drive a synthetic clock (`fn(base+99999)`), restoring rAF in a `finally`; it verifies LOGIC only, so say so. The in-page `engine ✓ flip X = py Y` self-check must stay green. Full text in [[melange-dashboard]].

## Related Topics

- [[2026-07-feature-primacy-and-industry-tier-boards-industry-boards-build]] — Industry-tab interactions of 2026-08-03 and the per-industry tier boards build of 2026-08-09/10, from the deploy and the valence fix to the BNPL, bank, CU-axis and association-anchor work and Paul's uniformity ruling.
