---
type: topic
title: "Employment-tenure adjudication and the architecture/overlap rulings (09-01 to 09-03) (Staffer network data and math)"
aliases: ["Staffer network data and math: Employment-tenure adjudication and the architecture/overlap rulings (09-01 to 09-03)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-09-01
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-09-feature-staffer-network-data-and-math]]"
---

# Employment-tenure adjudication and the architecture/overlap rulings (09-01 to 09-03) (Staffer network data and math)

> The employment-tenure data adjudication of 2026-09-01 to 09-03, from the verdict and Paul's rulings to the play queue and the authoritative coverage metric, with the architecture and overlap rulings carried into the lane. Part of [[2026-09-feature-staffer-network-data-and-math]] (project [[melange-systems]]).

## Employment-tenure data adjudication (Fable, 2026-09-01 to 2026-09-03)

Source memory `staffer-network-employment-tenure-adjudication-2026-09-01` (session `b4908000-b7b6-4df6-92e9-96e07c3b29bc`, last modified 2026-09-03). Related: `contact-inference-extraction-lane-2026-08-28` (sibling lane, same identity-resolution problem class), `lobbying-member-link-is-circular-2026-08-19` (language bar on LDA-derived edges), `ask-before-substantive-changes` (why nothing was run or promoted), `universal-lane-laws-2026-08-09`.

### Verdict (2026-09-01 evening)

Fable's verdict document: `STAFFER_NETWORK_EMPLOYMENT_TENURE_DATA_ADJUDICATION_20260901.md` (session scratchpad; copied to `data/staffer_network/reviews/` and Downloads once verified). Core rulings:

- Employment tenure NOT ESTABLISHED for any of 25,340 sealed LDA IDs under the lane's own contract.
- v3 overlay (4,996 bounded provisional episodes / 1,186 people, all blocked) is the state of record.
- **v5 promotion prototype (18,815 episodes / 2,672 people, three gates REMOVED including the Fable/Opus adversarial pass) ruled NOT CANONICAL:** dangling decision IDs (0 of 2,672 identity / 1,371 container decision IDs resolve), unbound inputs, schema laundering of v3 rows, 13,840 Senate observation-split episodes promoted while every Senate match row carries `promotion_gate: BLOCKED_PENDING_IDENTITY_AND_EMPLOYMENT_REVIEW`, 1,486 promoted people had zero v3 provisional episodes.
- Complete-lifetime attestation 0/25,340 and structurally unreachable (only a LegiStorm checkpoint can bind provenance; LegiStorm has ~zero data).
- A5c pre-2009 House backfile CLOSED as `BLOCKED_PARTIAL_RECOVERY` (1 of 52 quarters).
- Meta LOOP `BLOCKED` stands with exit conditions E1-E7.

### Why it matters / traps

- **Two unrelated "P" vocabularies.** Employment-LOOKUP queue P0/P1/P2 = 6,527/2,957/15,856 (LDA covered-position TEXT: government-term hit / other text / no text). Acquisition PRIORITY queue P0..P3 = 11,643/4,843/1,741/7,113 after A9 (cross-source evidence completeness; P3 = residue where only adjudication remains, NOT the hard cases). The math doc's 16,486 / 18,227 = A9 P0+P1 / P0+P1+P2. Never conflate.
- **House 2016Q1-2026Q1 payroll match lane (11,788 rows, 3,355 people) was NOT an input to v3** (`house_payroll_rows_conserved: 32103` = the 2009Q3-2015Q4 lane only), so the priority partition and v5 do not see it; P0 = 11,643 is an upper bound.
- `BLOCKED_PARTIAL_RECOVERY` and `A5c` are prose-only: no script emits or tests them.
- Politico-Quorum pilot: 2,643 strict candidates, 200 model-reviewed (two AI reviewers, 100/100 agreement), 0 human gold: uncalibrated; holdout quarantined.
- Bulk adjudication `reviewer_kind` is the schema constant `RULE`; a HUMAN decision is representable only on the LegiStorm capture lane.
- The lane's own "Precise next stages" (implementation diagnostic lines 682-725) define finishing as stage 3 (adjudicate the 7,113 P3 people) + stage 8 (binding completeness audit); both need Paul's rulings (I-4 gold owner = D-Q5, unanswered; D-Q2 LegiStorm).

### Decision menu handed to Paul (T-1..T-7)

v5 disposition (keep immutable prototype, recommended); D-Q5 gold-set owner; D-Q2 LegiStorm; D-Q1 Politico crawl; authorise folding House 2016-2026 into a new immutable overlay + partition rebuild (recommended, zero promotion); authorise an attestation producer + registry constructor as `.candidate`; amend the math doc's 09-01 addendum in the living copy.

### Confirmation ladder (same evening; Paul: "are you sure we cannot extract more confirmations, even partial?")

YES, measured. Rule tiers L1 observed -> L2 name-unique (strict one-to-one) -> L3 office-corroborated by the filer's own covered_position text -> L4 chronology-consistent -> L5 multi-source; S split-clean (Senate); R registrant-side dated.

- Yield: House both lanes 1,137 people at L4 (2,131 person-office spans, median 8 quarters, 78.9% contiguous) vs v3's all-or-nothing rule (326 qualifying 2009-2015 people left REVIEW_REQUIRED; 858 qualifying 2016-2026 people never adjudicated); Senate 640 at L4, 470 with clean runs vs v3's 125 rows.
- Filer text names a member for 5,516 people, 2,535 resolve to one bioguide, 2,161 corroborated by a payroll office naming the same member.
- A6: 2,525 of 3,090 blocked prose near-candidates have resolvable office + explicit start/end years in ONE string (blocked by two universal design gates, not content).
- 9,388 people in >= 2 independent sets, 4,236 in >= 3; LD-203 same-year employer = LDA registrant for 22,715/22,754; 4,199 people with an ordered Hill->registrant pair (1,821 overlap at year grain = down-tier signal).
- LAWFUL HOME: math doc section 3 admits strict one-to-one review candidates to an EXPLORATORY tier; P3's own instruction is "independent anchors". Doc of record: `STAFFER_NETWORK_CONFIRMATION_LADDER_20260901.md` (reviews dir + Downloads; scripts + JSON tallies in `reviews\confirmation_ladder_20260901\`).
- Proposed build = tiered corroboration sidecar (T-8) + whether the exploratory temporal tier runs (T-9); precision UNMEASURED until the I-4 gold sample (stratify by tier).
- Two rule defects found + fixed mid-run (em-dash `—Con.` row-continuation artifact in House office strings; middle-initial punctuation splitting one tenure into two spans).
- H1 chronology = 100% consistent by WINDOW ARTIFACT (LDA 2021-2026 vs payroll 2009-2015), not signal.
- Paul's 2026-09-01 directive (other session): NO git from the assistant or agents; plain review, not adversarial, when he says something seems fine.

### PAUL RULED 2026-09-01 ~23:50 ET (verbatim intent)

"Build the tiered sidecar, T-8 approved, exploratory tier too. It can be tiered in the directional strength of the edge weight and eigen vector."

So T-8 (tiered corroboration sidecar) and T-9 (exploratory temporal tier) are APPROVED; the confirmation tier enters the mathematics as an edge-weight strength factor (co-tenure: weakest endpoint; revolving door: directed member->organization, Hill tier x registrant tier) and the component-local eigenvector + PageRank run on the tier-weighted operator and at tier thresholds L2/L3/L4. Spec of record: `TIERED_SIDECAR_SPEC_20260902.md` (INV-1..INV-12: zero canonical promotion, immutable twin generations, inputs hash-bound, conservation 25,340, exact reproduction of the ladder counts, strict-bioguide, language law, exploratory-only with `primary_weights_emitted: 0`, reviewed `network_math.py` reused not reimplemented, tier strengths are UNTESTED DIALS {L2 .25, L3 .50, L4 .75, L5 1.0; R0 .25, R1 .50, R2 1.0} with +/-50% sweep, glassbox, NO git). Build run id `run-20260902T035500000000Z-t1e4d5c8`. Still Paul's: T-2 (I-4 gold owner), dial freeze (D-Q3), T-1 v5 disposition, T-3/T-4.

### PAUL'S SOURCE DIRECTIVE (2026-09-02 ~00:30 ET, verbatim intent)

The employment-history corpus draws from THREE source families:
1. Congressional expenditure reports: House Statement of Disbursements (quarterly) + Senate Report of the Secretary (semiannual): exact salary, titles, office assignments, dates of service.
2. LDA filings (have): covered official positions within the preceding 20 years.
3. Personal Financial Disclosures (Ethics in Government Act; members + senior staff; entry/annual/departure): outside earned income, board affiliations, prior positions.

Fields to cover: board affiliations, prior positions held, payroll, how long each position was held. Archive link to exhaust: https://www.house.gov/the-house-explained/open-government/statement-of-disbursements/archive. Paul: "Go over every single document this site has, get every single member, track and hunt": every member office (e.g. `2025 HON. KEVIN KILEY` block) and every staffer row under PERSONNEL COMPENSATION (payee, service dates, title, quarterly amount), tracked across quarters. Gold fixture supplied by Paul: Kiley 2025Q2, 15 personnel rows, total 282,805.54. Running as workflow `house-sod-track-and-hunt` (wf_88dc73d0-a3c; census -> methods (CSV/PDF/tracking/Senate+PFD) -> ledger build -> adversarial verify -> doc `HOUSE_SOD_TRACK_AND_HUNT_20260902.md` in scratch `sod_hunt\`). Also in flight: Bright Data LinkedIn collector (`collect_employment_histories_brightdata.py`, dry-run only; no key on the box; Paul supplies key + rules on LinkedIn as a source; the lane's own scraper policy skipped LinkedIn/search engines). Current staffers (Quorum 5,773) have NO employment histories on disk and were never joined to payroll.

### PAUL 2026-09-02 ~01:10 ET: "Continue, lets get this shit all connected."

Ruling = build the CONNECTION SPINE (Part C): one Hill personnel spine from ALL House SOD staffers (every quarter, every member office, bioguide-keyed) + ALL Senate Secretary-report staffers (233,009 accepted rows, 30 periods) -> person_key + tenure spans + titles; join (a) the 25,340 LDA lobbyists via the existing match lanes + tiered sidecar tiers, (b) the 5,773 current Quorum staffers by name within their member office (gives them their Hill history for the first time), (c) members by bioguide roster, (d) registrant employers (LDA association / LD-203); then the exploratory temporal tier runs over the WHOLE spine (co-tenure among all staffers, not just LDA-matched). Spine tiers for non-LDA staffers: S1 single-office name identity, S2 cross-office name-only link (REVIEW). Order of landing: Part A sidecar -> Part B rulings (strict envelope revolving test; identifier values exempt from language grep; per-container record tier for edge strength; tier-weighted person-container membership layer so bridging is defined) -> Part B live run -> SOD workflow House ledger -> Part C spec + build -> Part B v2 over the spine. Nothing canonical; all REVIEW_REQUIRED; no git.

### State at the 2026-09-02 ~02:40 ET rate-limit wall (Sonnet + Opus session limit, resets 5:50am ET)

- DONE: Part A v1 sidecar (`tiered_corroboration_sidecar_20260902_v1_{primary,twin,verification}`, PASS, INV-5 34/34 exact, receipt sha adee9cfb…); Part B code + four rulings applied (45/45 tests; builder `build_exploratory_temporal_tier.py` sha cc541eeb…); Bright Data collector (21 tests, dry-run 31,113 queue, needs key + dataset ids); SOD workflow CENSUS (67/67 archive periods on disk 2009Q3-2026Q1; only 2026Q2 current-page missing; 155 listed files, 67 downloaded, 82 covered by another format; ProPublica mirror 2009Q3-2018Q1) + four METHOD docs in scratch `sod_hunt\`.
- KILLED MID-FLIGHT: (1) Part A v2 nickname/term-window executor: builder/verifier/test files MID-EDIT (compile OK, 41 pass/1 fail/7 errors), `data\staffer_network\reference\first_name_nicknames_v1.json` written (8,788 B), NO v2 generation; v1 intact. (2) Part C architect: `build_hill_personnel_spine.py` (102,823 B) + `verify_hill_personnel_spine.py` (75,315 B) + 6 schemas written, TEST FILE MISSING, never run. (3) SOD workflow wf_88dc73d0-a3c: `build_house_personnel_ledger.py` written but no output; verdicts/critic/doc failed; RESUME with `resumeFromRunId` (census + methods replay from cache). Haiku verifier mis-pathed (falsely reported v1 dirs + nickname JSON missing): re-check Haiku path claims inline. Part B LIVE RUN on v1 started inline ~02:45 ET (log `scratchpad\partB_live_v1.log`).

### Not a Part A defect: the misdiagnosis, corrected 2026-09-02 ~04:00 ET

Part A's person `max_tier` is the tier recomputed over the UNION of that person's lanes (the ladder's own semantics, pinned by INV-5), so a record tier can legitimately EXCEED its person's tier (33 people; e.g. lda:lobbyist:104352 = L4 in the 2009-2015 lane, L3 on the union because the 2016-2026 lane is chronology-inconsistent). Do NOT "fix" Part A to max-over-records: that would break INV-5's 1,137 House / 640 Senate L4 counts. THE REAL BUG was Part B's assumption (stated in a verifier comment) that "a record's tier can never exceed that person's max_tier": at threshold L4 a membership edge cleared the floor by its RECORD tier while its person node was absent -> KeyError. FIX (applied inline to both Part B files): node presence stays gated on the summary tier; a membership edge whose person or container is not a node at that threshold is SKIPPED, not fatal, in builder `operator_inputs()` and in the verifier's threshold rerun; the disagreement is reported as `person_tier_differs_from_max_record_tier`. Part B also needed a loader fix for Part A's NESTED `registrants[]` per-person shape (expand to per-pair rows).

### Built and verified 2026-09-02 (all live, all twin-verified, nothing canonical)

- **Part A v1 + v2** `tiered_corroboration_sidecar_20260902_v{1,2}_{primary,twin,verification}`: 18,206 person-office records / 25,340 summaries / 1,974 A6 episodes / 25,340 registrant rows; verifier PASS 32 assertions, zero row mismatches; 50 tests. v2 = nickname table (188 entries, `data\staffer_network\reference\first_name_nicknames_v1.json`) + term-window chamber rule: unresolved offices 1,864 -> 1,002 (-862), 606 resolved by term window, 33 honest `TERM_WINDOW_MISMATCH`, **SENATOR BILL NELSON -> N000032 on 33 records** (Ben Nelson stays N000180). INV-5 IDENTICAL v1 to v2 (all 34 rows): resolution never touches tiers (proved by an empty-roster invariance test).
- **Part B v1** `exploratory_temporal_tier_20260902_v1_*`: 73,268 edges, 14,415 node scores; co-tenure 42,087 GUARANTEED / 12,523 POSSIBLE_ONLY / 43,606 ZERO_OVERLAP; revolving paths 7,601 GUARANTEED / 1,343 POSSIBLE_ONLY / 156 WRONG_ORDER / 0 INTERVAL_BLOCKED; 12,482 membership edges; verifier PASS `failures: []`; twin byte-identical. Strict envelope-end ordering costs 193 paths vs the core-end variant (7,601 vs 7,794); both reported. Dial sweep is near-inert BY CONSTRUCTION (layer row-normalisation makes uniform scaling rank-preserving): Spearman 1.0 at -50%, 0.9985 at +50% where the 1.0 clamp bites. **A 1.0 there is an operator property, NOT dial robustness.**
- **House personnel ledger v1** `house_personnel_ledger_20260902_v1_*`: CSV era 2016Q1-2026Q1, **41 quarters, zero parse failures, 681,177 personnel observations, 96,451 tenure spans, 35,455 member-quarters, 60,143 distinct staffers, 789 member bioguides**, HON resolution 95.06%, reconciliation 38,506 RECONCILED / 33 MULTI_SUBTOTAL; **Kiley 2025Q2 gold check PASS** (Paul's pasted block reproduced exactly); verifier PASS, twin byte-identical.
- House verifier FIRST FAIL was a FALSE POSITIVE: its source-text scan flagged the builder's own `canonical_promotions_zero: True` (a line ASSERTING the invariant). Zero data rows ever failed. Fixed by excluding assertion-shaped names (`_zero`/`_none`/`_absent`) from the scan; the row invariant was never weakened.
- SOD census: **67 of 67 archive periods on disk (2009Q3-2026Q1), zero gaps**; only 2026Q2 missing (current page, not archive); 4 method docs written (CSV, PDF, tracking, Senate+PFD) in `scratchpad\sod_hunt\`.
- Bright Data collector `collect_employment_histories_brightdata.py`: 21 tests, dry-run plans 31,113 people (25,340 LDA + 5,773 staffers), 99.996% have a discovery hint. BLOCKED on Paul: no Bright Data key in keys.json, and the `gd_` dataset ids must come from `GET https://api.brightdata.com/datasets/list`; the collector REFUSES to guess them.

### PAUL'S PENDING DESIGN TASK: REMIND HIM (2026-09-02)

Verbatim intent: "if they are shared for the social network that means they are tied to multiple members, once we get the data collected remind me to design the layering of the networks, the idea is that staffers are nested underneath and in-between members." So: once collection is done, RAISE the network-layering design with him. The shared-employee class is the concrete hook: 7,605 House staffers are legitimately paid by MANY member offices at once (caucus/shared staff, e.g. Krystal Kaai CAPAC ExecDir across 28 offices at $1,000 each in 2020Q4; Kathryn Doherty 35 offices 2017Q2). Those people ARE the "in-between members" layer; single-office staffers are the "nested underneath" layer. (Paul's 2026-09-03 ant-colony ruling answered this: see [[2026-09-03-staffer-network-architecture]].)

### IDENTITY RULING (Paul, 2026-09-02)

"Split the same-name collisions apart... the staffer names always appear directly below the members. The documents list them: Member, staffers of the member, misc expenses." The SOD document structure scopes each staffer row to the member above it, so A NAME IS AN IDENTITY ONLY WITHIN AN OFFICE; cross-office identity must be evidenced. Measured over the v1 ledger (11,723 names in >1 office): **SHARED_EMPLOYEE 7,605** (every same-quarter multi-office quarter carries `shared_employee_flag`: one person, many members), **SEQUENTIAL_ONLY 3,934** (career-move candidates), **MID_QUARTER_MOVE 161** (same quarter, two offices, service-date ranges DISJOINT at day level = one person switching jobs, typically CHIEF ADMIN OFCR -> member office), **TRUE_COLLISION 23** (day-level service-date overlap, not shared = must split). MY EARLIER WARNING THAT 11,713 "career moves" CARRIED COLLISION RISK WAS OVERSTATED: the real split set is 23 of 60,136 people. THE DISCRIMINATOR IS DAY-LEVEL SERVICE DATES, NOT QUARTER OVERLAP. Trap hit: reading a nonexistent span field (`shared_employee_ever`) gave a false 0, which made 7,741 people look like collisions; the real flag is `shared_employee_flag` on the OBSERVATION rows.

### PAUL'S STANDING AUTHORIZATION 2026-09-02 late (verbatim)

"I am going to the gym, keep working until we reach at least 95%, if you don't keep thinking, keep progressing, and keep going." Target = 95% of the REACHABLE set (6,867 LDA people with a legislative covered position dated in-window), i.e. 6,524; held at authorization = 3,217 (46.9%). This OVERRIDES the usual present-and-wait gate FOR THIS WORK ONLY: keep building candidate-plane generations without pausing for approval. It does NOT authorize canonical promotion: every row stays REVIEW_REQUIRED, promotion counters pinned 0, no dial freeze, no publication.

### Play queue (run in order, measure after each; stop only at >= 95% or when plays are exhausted)

1. **Declaration-directed matching** (workflow `wf_9b2b5598-03f`, running): search each unlinked person's name INSIDE the office they themselves declared; 3,229 targets (2,746 name a member, 990 a committee). Candidate pool collapses from 122,342 payee keys to one office, so collisions evaporate. GATED ON A FALSE-POSITIVE CONTROL: same search in offices they did NOT declare, size/chamber-matched; a class whose control rate approaches its declared rate carries NO evidence and must not be promoted. Build the generation only if the control validates.
2. **A6 prose release**: 2,525 near-candidates already carry a resolvable member/committee AND explicit start+end years in ONE string; blocked only by two UNIVERSAL design gates (`DATE_RANGE_NOT_LINKED_TO_SPECIFIC_EPISODE`, `ROLE_EMPLOYER_BOUNDARY_NOT_ADJUDICATED`), not by content. A stricter same-string binding rule releases them at year precision, single-author.
3. **Undated legislative declarers** (5,003; in-window share inferred 87.5%, never observed): declaration-directed search works without dates; the largest untouched pool.
4. **Committee spelling folding**: the declared-office resolver's residue; fold the distinct committee spellings in the corpora.
5. **Surname-only cases** (345 staffers / equivalent LDA): resolvable ONLY inside a declared office, never globally.

IRREDUCIBLE FLOOR (stated rather than hidden in a residual): the original claim was unpaid interns, detailees, fellows and contractors never appear on a disbursement line; and the reachable set itself has upward bias (Senate 2009-2011Q1 and House 2009Q1-Q2 score in-window but sit outside every corpus). 95% may be unattainable: measure and decompose the residual by cause rather than arguing. (The intern claim was later found FALSE; see below.)

### Authoritative coverage metric + ceiling (2026-09-03; supersedes every earlier coverage figure)

- Metric code of record: `scratchpad\metric\metric.py`; RCR = |COVERED intersect REACHABLE| / |REACHABLE|; re-run it after every play instead of re-deriving. REACHABLE = 6,867 by the ceiling classifier (a later independent pass measured 6,634 under a stated rule; both are defensible, report which).
- **RAW RCR 56.87% (3,905/6,867), NOT the 46.9% first reported** (that used the raw name-match lanes as numerator: too loose AND blind to the resolution route). After D1 conversions: 60.21%. **FLOOR-CORRECTED HONEST FIGURE: 52.03%, interval 48.7-53.0%** (measured false-positive floor 8.24%, pooled 57/692 across three negative controls). PUBLISH THE FLOOR-CORRECTED NUMBER WITH THE FLOOR ATTACHED, never 56.87% bare.
- **HARD CAP 80.03%, measured, not estimated:** 1,325 of 6,634 reachable people have NO name match of ANY class anywhere in either payroll corpus (a property of the name, not of where we looked). **95% IS UNATTAINABLE from the corpora on disk.** Perfect adjudication of every R3 tie -> 62.68%; every R3+R4 candidate -> 79.41%. At the stricter corroborated definition, 95% needs +3,899 people. The only route past ~63% is a corpus starting before 2009Q3 (House) / 2011Q2 (Senate): at least 232 unresolvable-member declarations name members who left before our window (Bayh, Specter, Frist, Hagel). **THAT MAKES D-Q2 (LegiStorm licence) THE DECISION THAT ACTUALLY MOVES COVERAGE.**
- **What "COVERED" actually measures (the finding that most limits every claim):** the predicate fires at 61.9% on people who explicitly filed "None", against a name-coincidence exposure of 7.26%. Coverage is substantially measuring NAME PRESENCE in the corpus, not employment. 87% of the numerator rests on name-only matching; corroborated-only coverage is 38.23%, office-and-period corroborated 4.46%.
- **Declaration-directed matching: the structural law, do not re-litigate:** searching a name inside its self-declared office CANNOT FIND NEW NAMES, only disambiguate names the global search already found (0 exact-class hits across 1,385 rows of the R4+NOT_FOUND strata; every office payee set is a subset of the same 122,342-key universe). The entire inversion produced 2 genuinely new people. Its value is CONFIDENCE: D1 status FPR measured against a paired control arm at 0.235% (upper 0.849%), 2 false D1s in 2,783 searches. FIRST_INITIAL excluded entirely (FPR 6.98%, upper 20.4%).
- **MY CLAIM THAT INTERNS/DETAILEES/FELLOWS "NEVER APPEAR ON A DISBURSEMENT LINE" IS FALSE:** 46.7% of House people carry an INTERN title. The real effect is an ERA BREAK: the 2019 House paid-intern allowance moved intern share 5.91% (2009-2018) -> 29.40% (2019-2025), implying ~20% pre-2019 capture. Structurally-unreachable class is 170-243, not the large bucket asserted.

### Session mechanics learned (adjudication session)

Opus 5 session limit hit mid-lane (architect agent terminated after delivering); scouts/executors (Haiku/Sonnet) carried the measurement. Glassbox emitter = `C:\Users\pgoff\.claude\glassbox\emit.ps1` via hashtable splatting (`& emit.ps1 @p`); Status ValidateSet is `queued|running|completed|failed|blocked|skipped|waiting|info` (no `ok`); no top-level current/total — put them in `MetadataJson`. Read-only measurement over 40 MB `.ndjson.gz` ledgers is fine when streamed from a .py file in the scratchpad.

## Architecture and overlap rulings (2026-09-03), as carried in this lane

Full text: [[2026-09-03-staffer-network-architecture]] and [[concurrent-service-overlap-edge-rule]]. Lane-relevant facts:

- Guiding docs `STAFFER_NETWORK_EXPANSION_DESIGN_20260829.md` and `STAFFER_NETWORK_METRICS_20260829.md` (Downloads; 2026-08-31 revisions of 2026-08-29 drafts).
- Architecture: the staffer network is its own social network a layer BELOW congress members, not a member-member projection; members are attachment points; no member-member edges computed here. Cosponsorship/media member graphs (~535 nodes; published CU config, BASE/AUG/NBASE/NORM, bank_reg/crypto diagnostics) KEPT independent ("KEEP THIS" x2).
- Do not import `Â` into staffer weights (design section 6.4 `w_x = kappa_x * Â(m_i,m_j) * O^gamma * delta(Delta)` would double-count cosponsorship, contaminate the D-Q7 comparability bar, same failure class as LD-2 circularity). Layers combine at analysis time in the multiplex.
- Education dropped ("Fuck the education, if we have it, nice cherry on top"): `w_edu` kept at alpha=0; C-8b no longer a blocker; D-Q3 and I-4 still gate arming.
- `exploratory_temporal_tier_20260902_v1` IS this architecture (14,415 person nodes, 73,268 weighted time-scoped edges, layers `co_tenure` / `revolving` / `membership`, verification PASS); defect = POPULATION (fed from the LDA sidecar's 18,206 person-office records, never payroll; ~1/10 of the people held: House ledger 77,666; spine 141,241). Rebuild over the full payroll population = the work.
- PARTIAL_NULL eigenvector at L3/L4 (L2 converged) is probably diagnostic of FRAGMENTATION; compute centrality per connected component and report component sizes ("how many separate colonies").
- Edge rule weights: guaranteed overlap duration x container proximity kappa (same personal office 1.00, committee same side 0.75, side unknown 0.60, opposite side 0.40, leadership 0.75, admin/officer 0.50); union intervals before intersection; report zero-overlap rejected count.
