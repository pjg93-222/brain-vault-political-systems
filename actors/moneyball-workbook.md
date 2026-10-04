---
type: actor
name: "Moneyball Blended workbook"
aliases: ["Moneyball Main Version - Blended.xlsx", "Blended Model"]
category: "tool"
description: "Excel model 'Moneyball Main Version - Blended.xlsx': a 4-pillar percentile-rank blend (committee/legislative/press/demographic) over 533 members with a funded top 133 sharing $2.0M; Committee Data holds static values (committee formula reverse-engineered, validated 288/288, no builder script); Sub Layer formulas feed the legislative efficiency; since Phase 2 the workbook is a self-refreshing VIEW of ranks_python.json (the rank authority)."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Melange Systems"
stack: "Excel workbook (.xlsx, 25+ sheets) edited through openpyxl; Python fec/ engine (compute_pillars.py, run_pipeline.py); June 2026 edits via Excel COM (win32com, retired); R scrapers upstream"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "openpyxl saves STRIP cached formula values; open in Excel to recalc (workbook writers set fullCalcOnLoad)"
  - "Pillar weights: three sets on record (.40/.30/.20/.10 historical 2026-06-29; 30/25/40/5 LAST RATIFIED 2026-07-07; 45/10/40/5 LIVE BUT UNRATIFIED since 2026-09-03; S-5 awaits Paul)"
  - "Topic Weights sheet is stale/decorative (weights are hardcoded in formulas)"
  - "Committee re-weight (chair/ranking x1.5, Small Business to Highly) was done by hand in Excel, not scripted (as of 2026-07-01)"
  - "Legislative Score - Normalized is a FROZEN CURATED snapshot: never refresh it"
  - "Centrality gap: 39/533 members absent from the network fall back to committee%"
  - "OneDrive/Excel save collision can truncate the workbook (2026-07-02 incident, recovered from newest BACKUP)"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sublayer-surgery-2026-07-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sublayer-surgery-2026-07-17.md", sha256: "9f165d2f3d53c188074a75a1fa16f3b6eff9021fae80183fb72a1fb771998cf7"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-model-config.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-model-config.md", sha256: "c03f7392e0186530056021fc752ad16ceccc0d652f6af1457ed31447e9527056"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-committee-scoring.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-committee-scoring.md", sha256: "1355480b1a6f9efc6320bbd4af506e14182257013cfb1237170fa29f75b8368c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/feedback_spreadsheet_consult_on_errors.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\feedback_spreadsheet_consult_on_errors.md", sha256: "e50698ba4021471028863e377112b4ee713300a959508e674f0bfa093cfd07a5"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_blended_audit.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_blended_audit.md", sha256: "6d69eda275039e1db26fe8b48a1f7f083b03564f2256821ca68903d9c0ef4eea"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_presentation_audit.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_presentation_audit.md", sha256: "22c59f496f4c19149f5a99f72aac1ae93c8245dd7332f31976e39698414ae68e"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_model.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_model.md", sha256: "65b55eb6397fb71ac07d19b63535dcc7c974494aaaa39aae953b1412a07da3de"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Moneyball Blended workbook

> `Moneyball Main Version - Blended.xlsx` (alias "Blended Model"): the Excel model of the [[melange-systems]] credit-union (CU) legislative-influence score and $2.0M allocation across 533 members. Its Blended Model sheet is the canonical output of the 4-pillar percentile-rank blend; after Phase 2 (2026-07-02) it is a VIEW refreshed from `ranks_python.json`, not the system of record.

## Parts

- [[moneyball-workbook-rules-scoring-and-sublayer-surgery]] — Standing rules of the Moneyball Blended workbook, the committee-data scoring reference of 2026-07-01 and the Sub Layer off-by-one surgery of 2026-07-16/17 that fixed the ranks.
- [[moneyball-workbook-lineage-and-june-audit]] — The Moneyball model lineage and files from 2026-06-18 to 06-22, and the audit and delivery of the Blended workbook on 2026-06-25.

## Details

| Field | Value |
|---|---|
| Repository | none (workbook at `C:\Users\pgoff\OneDrive\Desktop\Melange Systems`, engine in `fec/`; the 2026-06-21 working files lived on `C:\Users\pgoff\OneDrive\Desktop` and in Downloads) |
| Stack | Excel workbook (25 sheets at 2026-06-25 audit, 533 members) + openpyxl writers + Python engine; June 2026 edits via Excel COM (win32com); R scrapers upstream |
| Status | active (a VIEW since Phase 2; rank authority = `ranks_python.json`) |
| Criticality | high |
| PCI | no |
| Team | none |

## Dependencies

- **Depends on (upstream):**
  - `ranks_python.json`, produced by `compute_pillars --write` (the rank authority; `fec/compute_pillars.py` reproduces the whole rank chain, parity 533/533) in [[melange-fec-pipeline]].
  - Press source of truth `Draft Systems\cu_press_stance_tone.csv`; `category_stance.json` and the `Category Stance` sheet; the Ballotpedia 119th CU Influence output `Ballotpedia_119th_CU_Influence_20260618_010531.xlsx`; Wikipedia 119th-Congress committee rosters; roster `legislators-current.csv` (`unitedstates.github.io/congress-legislators/`); `congress_centrality_*.xlsx` (cosponsor network, see [[melange-systems]]); R scrapers (`congress_member_scraper.R`, `ballotpedia_119th_cu_scraper.R`).
- **Depended on by (downstream):** [[melange-dashboard]] (`Moneyball.html`) and the member desk, via the engine reading `MC.scores()`/`ranks()`; the `Rank & Allocation` -> `Blended Model` -> `Coalition Profiles` chain inside the workbook.
- Related decisions and engine internals live in Influence engine internals (Sub Layer surgery), [[2026-07-rfc-melange-architecture-system-of-record]] (system-of-record inversion), [[2026-06-feature-moneyball-excel-model-build]] (June build) and [[2026-06-working-agreement-change-control-and-decision-authority]] (consult before changing model logic); concept pages [[influence-vs-alignment-axes]] and [[zero-rank-delta-verification]].

## Flows

- `Committee Data`!B -> `Rank & Allocation`!E (`=IFERROR(INDEX('Committee Data'!$B$2:$B$320,MATCH(name,...)),0)`) -> `Blended Model`!E -> col L Committee% / col Q Influence pillar -> col R Influence% -> Score. Recomputing B auto-propagates to Score/Rank (live formulas; edit only Committee Data, then recalc).
- Blended scoring (2026-06-25 audit): raw pillars (Press, Legislative, Committee, Demographic from `Rank & Allocation` C/D/E/F; Efficiency from `Primary Layer`!E; Centrality from `Centrality`!C) -> PERCENTRANK each -> Leg pillar = .7*agenda% + .3*eff% and Influence = .35*committee% + .65*centrality% (each re-PERCENTRANKed) -> Score -> RANK -> fund top 133 proportional from $2.0M. The double-rank on Leg/Influence is intentional (re-uniformizes pillars). Later the influence sub-weights changed to committee-only (see weights).
- Cascade (original 2026-06-21 description): Legislative Score Raw to Normalized and Press Release Raw to Normalized and Demographic Raw to Normalized feed the **Sub Layer**, which feeds the **Primary Layer** (11 weighted dimensions), which feeds **Rank & Allocation** Score (`SUMPRODUCT(Table6 dims × Primary weights)`) and Rank (`RANK.EQ`). Each Sub Layer policy dimension = `legislative_part + press_part`; legislative sub-weights (Legislative Normalized row 2) summed ~0.7, press weight (Press Normalized row 535) was a flat 0.3. Sub Layer demographic cols V:AF are **hardcoded** (not formulas), so demographic fixes must be written there too.
- Phase 2 (2026-07-02): `ranks_python.json` is THE rank authority; engines read `MC.scores()`/`ranks()`; workbook = self-refreshing VIEW (all writers set `fullCalcOnLoad`); **NO COM anywhere**.

## Dev Commands

Commands recorded in the sources (several are historical, see Standing rules in [[moneyball-workbook-rules-scoring-and-sublayer-surgery]] and History for what was retired):

```bash
# Canonical regen chain (kernel then pipeline), expect 48/48 (06-30 note); later audits 52+ checks
python fec/tests/run_tests.py
python fec/run_pipeline.py            # --recalc is a retired no-op since Phase 2
# Sub Layer repair (2026-07-17, fec/repair_sublayer_references.py)
python fec/repair_sublayer_references.py --plan    # full 9,061-cell audit
python fec/repair_sublayer_references.py --apply   # backup PRE-SUBLAYER-REPAIR-20260717_010907.xlsx + rewrite
# Committee scoring validator + scorer (session scratchpad, 2026-06-30)
python cmte_validate.py
# Committee / stance / weights scripts named in the sources (fec/)
python fec/apply_committee_fix.py   # CMTEFIX (applied live 2026-06-30)
python fec/apply_press_dedup.py     # own-domain attribution filter
python fec/apply_raw_max_norm.py    # press+committee raw/max
python fec/apply_leg_stance.py      # leg-stance gating ON 2026-06-30 eve
python fec/apply_alloc_cap.py       # NOT applied (cap config exists only in the 6/30-final backup line)
```

```powershell
# HISTORICAL (June 2026, retired by Phase 2 "NO COM anywhere"): recalc via Excel COM
New-Object -ComObject Excel.Application; $xl.CalculateFull()
# OneDrive-safe recalc that worked (2026-06-21): recalc on a LOCAL copy outside OneDrive
Copy-Item $src $env:TEMP\mb_work.xlsx; <COM recalc temp>; Copy-Item temp $src
```

Other named scripts (June): `Downloads/repair_moneyball.py` (2026-06-18 second pass, reproducible), `Downloads/merge_committee_caucus.py` (2026-06-18), `fec/sync_stance_clean.py` + `fec/apply_stance_guard.py` (hard-guarded/SUPERSEDED), `fec/make_dashboard_html.py` (live-what-if sliders cusl/cosl), `fec/make_member_desk.py`.

## Known Issues

- openpyxl `load_workbook(F)` (data_only=False) + `.save()` **strips ALL cached formula values** workbook-wide: after any openpyxl edit the workbook must be opened in Excel to recalc; to READ rank/score either recalc first or compute from the static composite columns (C/D/E/F survive; formula cols K/L/M don't). Phase 2 resolved this by making `ranks_python.json` the authority and the workbook a view.
- `Topic Weights` sheet is stale/decorative: weights are hardcoded in the formulas, not read from it. Legislative matches EXCEPT CFPB (sheet shows unified 0.3; live model uses split CFPB Restrain +0.5 / CFPB Reach(-) -1.0, see `project_cfpb_directional_split`). Press column (0.02-0.30) did NOT match live press weights at the 2026-06-25 audit (binary: Interchange/Tax/Credit-Card = 1.0, all others = 0.05, in `Press Release - Normalized` row 535); later (2026-07-02) the row-535 weights were re-tiered by user ratification (see Standing rules in [[moneyball-workbook-rules-scoring-and-sublayer-surgery]]).
- Credit Card & Consumer-Fee Mandates co-sponsor sub-weight = 0 (`Legislative Score - Normalized`!DG2) vs 0.0714 for all 17 other topics. Possibly intentional: ask before changing (see consult rule in [[moneyball-workbook-rules-scoring-and-sublayer-surgery]]).
- Legacy min-max Score/Rank/Allocation (cols K/L/M) still lives on first tab `Rank & Allocation` and disagrees sharply (legacy surfaces Crapo/Warren/Waters/Markey; Blended surfaces Williams/Barr/Timmons). Blended only uses R&A's raw C/D/E/F. Consider hiding K/L/M or reordering tabs.
- Centrality gap: 39/533 members absent from network (incl. Scalise, Schweikert; mostly leadership: Scalise/Hoyer/Jordan/Clyburn) so centrality% falls back to committee%. 494 rows use `IFERROR(PERCENTRANK,...,L#)`; the 39 have H blanked + N hardcoded `=L#` (static fallback, fragile to re-sort/new data).
- `Sub Layer - Raw` is a misnomer (data is 0-1 normalized). Bloc 2 holds 217/533; 117 members unclustered so Coalition Profiles alloc totals ~$1.866M (excludes unclustered).
- Committee re-weight (chair/ranking x1.5, SB to Highly) was done by hand in Excel, NOT yet scripted (GAP noted 2026-07-01). 245/533 have no Committee Data row (the sheet holds ~288 rows A1:E~289).
- OneDrive/Excel save collision: on 2026-07-02 an Excel-save/OneDrive collision TRUNCATED the workbook to 2.2MB after "recalc ok"; recovery = restore newest `BACKUP-*.xlsx` (always created before writes) and rerun. `run_pipeline.py`'s recalc (before retirement) now zip-validates the workbook + retries once.
- `Legislative Score - Normalized` is a FROZEN CURATED snapshot (see 2026-06-25 refresh failure in the network topic): never refresh it from activity.
- Spec drift: `MATHEMATICAL_SPECIFICATION.md` was a full calibration BEHIND the code all session; always check constants against the live `fec/*.py`, NOT the spec (refreshed 2026-06-29; audit notes 5.A/7.A resolved).
- Data-source gaps (2026-06-21): Marshall's credit-card press mis-scored +0.9 (co-author read pro-CU; scraper stance error; his articles absent from the 192-member Articles sheet); credit-card & TCPA co-sponsor legislative columns are dead `[1]!` external links (data lost); David Scott (D-GA) + N.Mariana delegate not in the 533 list; tax committees (Ways&Means/Finance) not yet added.

## Pillar weights and score formula (all sets on record; READ LIVE, do not trust a doc)

Score weights live in `Blended Model` labels col AA / values col AB (AB2 leg, AB3 press, AB4 influence/committee, AB5 demo; AB12 committee sub-weight = 1, AB13 centrality sub-weight = 0). The weight choice is the user's domain: do NOT relabel a set as "wrong" (see `press-classification-user-domain`).

| Weights | Date | Status / source |
|---|---|---|
| Original model: Press 0.40 / Leg 0.20 / Committee 0.35 / Demo 0.05 | 2026-06-21 (four-bucket) | historical; the user first said 40/40/15/5, moved excess leg to committee |
| Legislative 0.40 / Influence 0.30 / Press 0.20 / Demographic 0.10 | 2026-06-25 | first Blended delivery, historical (superseded same day) |
| **Legislative 0.20 / Press 0.40 / Influence 0.35 / Demographic 0.05** | 2026-06-25 (AB2/AB3/AB4/AB5) | user confirmed "really accurate"; historical |
| `.40/.30/.20/.10` | 2026-06-29 | **historical** |
| Press 0.20 / Committee 0.40 / Legislative 0.30 / Demo 0.10 (the "mid/late 6/29" set as written in this source) | 2026-06-29 | historical (oscillated all session) |
| Press 0.40 / Committee 0.35 / Leg 0.20 / Demo 0.05 | 2026-06-30 afternoon | historical |
| Press 0.30 / Committee·Influence 0.40 / Legislative 0.25 / Demo 0.05 | 2026-06-30 evening | LIVE then (historical now) |
| **`30/25/40/5`** (leg .30 / press .25 / inf .40 / demo .05 per `moneyball-2026-07-07-gate2-round1`, typed cells AB2-5, backup PRE-WEIGHTS-20260707) | **ratified 2026-07-07** | **LAST RATIFIED** (law 14) |
| **`45/10/40/5`** | live in `ranks_python.json` (`ab_weights`) since 2026-09-03 | **LIVE BUT UNRATIFIED**; code-review S-5 awaits Paul's ruling; never let the newest read as ratified. `fec/engine/pillar_policy.py` (live-only) encodes 45/10/40/5 as a fail-closed desk gate |

The AB slot order for the last two sets follows `AB2:AB5` (leg, press, influence, demo); the `.40/.30/.20/.10` label order is as recorded (not remapped to pillars here).

Sub-weights over time: Legislative pillar = 0.7*agenda topic-signed (`R&A` col D) + 0.3*Legislative Efficiency (`Primary Layer` col E). Influence = 0.35*Committee Data prestige + 0.65*network centrality at delivery 2026-06-25; **changed to committee-only 2026-06-25** (AB12 0.35 to 1.0, AB13 0.65 to 0.0; reasons in the network topic: centrality is direction-blind). Effective shares at the 2026-06-25 final: Press 47% / Influence 38% / Legislative 15%. Percentile-rank at the same weights only correlates 0.58 with the original min-max and still drops adversarial Banking senators (Cantwell #468, Warren #300) because the legislative pillar is topic-SIGNED. Key lesson (2026-06-25): weights were NOT what made the original "feel right": it was min-max letting committee dominate (52% via the Crapo outlier); centrality + percentile-rank un-gates networked no-committee members while keeping press/committee leading; the original `Rank & Allocation` was left intact for A/B.

Min-max distortion finding (2026-06-25 Presentation audit): Score = 0.40 Press + 0.20 Leg + 0.35 Committee + 0.05 Demo, but the effective variance share was Press 40% / Leg 6% / **Committee 52%** / Demo 2%. One outlier sets each scale (Crapo committee 9.175; Gooden press -1.915 flattens everyone to ~0.9). Committee is a near-gate: 132/133 funded hold a seat; 244/400 unfunded have committee=0.

Undervaluation lens (added 2026-06-25): Intrinsic (0.5 Leg% + 0.5 Centrality%) minus Visibility (0.5 Press% + 0.5 Committee%) = "underdog" rank.

## History

| Date | Event |
|---|---|
| 2026-06-18 | Second-pass repairs of `Moneyball (version 2 - corrected).xlsx` in place (script `Downloads/repair_moneyball.py`); committee/caucus rebuild (`merge_committee_caucus.py`). First pass earlier: 3 bugs fixed, 50/50 legislative/press reweight. |
| 2026-06-21 | Main Version identified as the user's preferred lineage; ACTIVE working file `C:\Users\pgoff\OneDrive\Desktop\Moneyball Main Version.xlsx` (14 sheets); Coalition Profiles enriched; FOUR-BUCKET REDESIGN session 2: `...Moneyball Main Version - FIXED.xlsx` (backup `...BACKUP 20260621-214805.xlsx`). |
| 2026-06-22 | Agenda re-weighting: all 19 topics re-tiered to America's Credit Unions' 2026 advocacy agenda; `Topic Weights` control sheet and `Ranking Chart` landing sheet added. |
| 2026-06-25 | Presentation audit; Blended workbook delivered (`Centrality` + `Blended Model` sheets); Blended audit (25 sheets, 533 members); final weights confirmed by user. |
| 2026-06-30 | State: user rewound to the 6/29 10AM version, then rebuilt with the bug-fixes; leg-stance gating ON; committee reproduced 288/288. |
| 2026-07-01 | Press own-domain attribution fix; committee scoring reference note. |
| 2026-07-02 | Press-pillar category weights tiered (user-ratified); PERS_NONE 0.45 ratified; Excel-save/OneDrive collision TRUNCATED the workbook to 2.2MB (recovered from `BACKUP-*.xlsx`). **Phase 2: system of record inverted, NO COM anywhere** (below). |
| 2026-07-07 | Pillar weights changed by user to leg .30 / press .25 / inf .40 / demo .05 (ratified; AB2-5; backup PRE-WEIGHTS-20260707). |
| 2026-07-16/17 | Sub Layer off-by-one discovered and repaired (in [[moneyball-workbook-rules-scoring-and-sublayer-surgery]]); guard batch @a3174bc. |
| 2026-09-03 | `ranks_python.json` `ab_weights` become 45/10/40/5 (LIVE BUT UNRATIFIED; S-5 awaits Paul). |

### Decisions and superseded rules

- **Phase 2 (2026-07-02, commits 23c48ea + fd9f3d6, user sign-off): SYSTEM OF RECORD INVERTED.** `ranks_python.json` = THE rank authority (`compute_pillars --write`; engines read `MC.scores()`/`ranks()`); workbook = self-refreshing VIEW (all writers set `fullCalcOnLoad`); **NO COM anywhere** (`sync_stance_g` rewritten openpyxl; RECALC step deleted; `--recalc` = retired no-op). Why: openpyxl saves strip cached formula values, which is the dragon COM-recalc had been papering over; typed cells survive (R&A names + col G, AB dials, Press Raw, row-535 weights), formula cells' cached values do not. Resolution: O/E/F via `pillar_inputs_snapshot.json` (refreshed while cache alive; fallback when dead; auto-bootstrap from newest cache-alive `backups/` copy); roster from R&A col A; chain = authority BEFORE cache-killing sync; `audit.py` view-aware. VERIFIED: snapshot-mode ranks == baseline EXACT 0/533, pipeline end-to-end no-COM (~19 min on cache-dead workbook), audit 52/52, kernel 30/30. (Provenance: summarized from the `moneyball-architecture` memory, another entity's source; stated here because it supersedes the June COM guidance.)
- ~~June Excel-COM write guidance: workbook edits go through Excel COM (win32com), require Excel CLOSED (open workbook locks the file, PermissionError); regen = `run_pipeline.py --recalc`; recalc via `New-Object -ComObject Excel.Application; $xl.CalculateFull()`; recalc on a LOCAL copy outside OneDrive; force-killing a headless Excel orphan can trigger autorecover that silently rolls back the openpyxl write~~ (2026-06-21 to 2026-07-02) - superseded 2026-07-02 by Phase 2 "NO COM anywhere"; kept because it explains the June backups, the OneDrive race analysis and the 2026-07-02 truncation incident. Note: the 2026-07-17 Sub Layer repair is described in its source as "backup + rewrite, COM recalc, chain", a one-off manual recalc, not a pipeline COM step.
- ~~Pillar weight sets before 2026-07-07~~ (table above) - superseded 2026-07-07 by 30/25/40/5 (last ratified); that set is itself followed by the LIVE BUT UNRATIFIED 45/10/40/5 since 2026-09-03.
- ~~Min-max normalization of all four buckets~~ (2026-06-21 FIXED file) - superseded 2026-06-25 by percentile-rank (PERCENTRANK) 4-pillar Blended Model.
- ~~Score press-gating of the legislative bucket (col D = leg_volume × sign(press_lean))~~ (2026-06-21 first FIXED version) - REMOVED later the same session: the user flagged it as imposed bias (a bias audit: 457/533 members have near-zero press, so gating by press sign was noise; overfit to push Durbin down); replaced with intrinsic topic-direction (interchange −2.0 and credit-card-mandate −3.0 leg weights, those press topics up-weighted to 0.30 each).
- ~~Influence = 0.35 committee + 0.65 centrality~~ (2026-06-25) - superseded the same day by committee-only (AB12=1.0, AB13=0.0).
- ~~Press% = percentile-rank~~ (before 2026-07-01) - superseded 2026-07-01 by signed `=C3/MAX($C$3:$C$535)`.
- ~~Flat press category weights of 0.05 (row 535)~~ (before 2026-07-02) - superseded 2026-07-02 by tiered literals.
- ~~Allocation: 1/rank inverse weighting, $10k cap, only ~$834k of the $2M distributes, top ~25% funded~~ (user's intentional design as of 2026-06-18, "do NOT fix") - superseded 2026-06-21 by the FIXED file: full $2M distributed score-proportional among top 133, no cap; the cap/top-250 config re-appeared only in the 6/30-final backup line and was NOT kept (2026-06-30 eve live = uncapped).
- ~~`apply_stance_guard.py` / `sync_stance_clean.py` as active steps~~ - hard-guarded (`sys.exit` at top) and SUPERSEDED by the matrix aggregate.
- ~~Electoral Integrity weight 0.05~~ (v1 weights) - set to **0** (user's choice) because its raw 36-119 scale dominated and scrambled ranks (made Zoe Lofgren, clearly anti-CU, land at rank 107); kept at 0.
- ~~Legislative sheet refresh~~ (2026-06-25) - reversed (restored from backup); never refresh the curated sheet.

## Source memory descriptions (verbatim, for traceability)

- `moneyball-model-config`: "Moneyball CU-influence model — final config, key files, COM/lock gotcha, and the spec-is-stale lesson" (2026-07-02).
- `moneyball-committee-scoring` (reference, 2026-07-01): "Moneyball committee-pillar scoring formula (reverse-engineered, validated 288/288) — there is NO builder script; values are static in Committee Data".
- `feedback_spreadsheet_consult_on_errors` (2026-06-25): "When something looks like an error in the model spreadsheet, consult the user before treating it as a bug or "fixing" it."
- `project_moneyball_blended_audit` (2026-06-25): "Audit of "Moneyball Main Version - Blended.xlsx" — Blended Model is canonical; Topic Weights sheet is stale; legacy R&A ranking still on first tab."
- `project_moneyball_presentation_audit` (2026-06-25): "Audit of "Moneyball Main Version - Presentation.xlsx" + decision to move final score to percentile-rank, committee 0.20, hierarchical 4-pillar/Primary-Layer blend." (The "committee 0.20" wording is the memory's own description; the delivered/final weights are the ones in the weights table above.)
- `project_moneyball_model` (2026-06-22): "Moneyball CU-influence scoring/allocation Excel model — architecture, integrity bugs, and the 2026-06-21 four-bucket redesign (FIXED file)."
- `sublayer-surgery-2026-07-17` (2026-07-17/18): the "rank fix" memory summarized in [[moneyball-workbook-rules-scoring-and-sublayer-surgery]].

## Related Actors

- [[melange-dashboard]] - Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network).
- [[melange-fec-pipeline]] - Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch

## Related Topics

- [[2026-06-feature-moneyball-excel-model-build]] - June 2026 build of the 533-member Moneyball workbook: four buckets, percentile-rank blend, calibration, scenario tooling
- [[2026-06-working-agreement-change-control-and-decision-authority]] - Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code.
- Influence engine internals - July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder
- [[2026-07-rfc-melange-architecture-system-of-record]] - Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics
- [[2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits]] — Scoring refinements of 2026-06-24/25: press raw alignment, the CFPB directional split, relevance-tiered committee influence scoring, the presentation audit with the percentile-rank 4-pillar blend, and the Blended workbook audit.
- [[melange-fec-pipeline-architecture]] — Architecture of the Melange fec/ pipeline: paths and the shared kernel after the 2026-07-02 refactor, the audit guardrails, the inverted system of record, the staff directory and desk CRM, and the audit runbook with weekly automation.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[influence-vs-alignment-axes]] - Modeling principle: rank = INFLUENCE, per-category stance = ALIGNMENT; two separate axes, underdogs surface in a separate efficiency view.
- [[zero-rank-delta-verification]] - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean
- [[four-pillar-percentile-blend]] — The Moneyball rank is a weighted blend of four pillar scores (committee/influence, legislative, press, demographic), built as percentile ranks on 2026-06-25, with the committee/influence pillar moved to raw/max on 2026-06-30 and press to signed raw/max on 2026-07-01; resolution 3 records three weight sets (historical, last ratified, live but unratified), only Paul ratifies one, and the live set is read where it is kept.
