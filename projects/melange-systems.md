---
type: project
name: "Melange Systems (Moneyball CU-influence model)"
aliases: ["Moneyball", "Melange", "Draft Systems (predecessor root)"]
description: "Moneyball / Melange: a credit-union legislative-influence model (Blended workbook -> Python engines -> single Moneyball.html deliverable). Began June 2026 in Draft Systems (alias 'Draft Systems'); canonical home moved 2026-06-26 to OneDrive Desktop 'Melange Systems'. This is the index project: it holds the project-defining model facts and points to the topics, actors and discussions where the detail lives."
status: "active"
deadline: ""
progress: "Pre-flight, scenario tooling and audits done 2026-06-26 (audit_full 31/31, canonical home Melange Systems); model, desk and dashboard pipeline established by 2026-06-29. Later work (stance, psychometrics, boards, networks, audio, collection lanes, refresh automation, UI redesign) is tracked in the linked topics."
blockers:
  - "Pillar weights: 45/10/40/5 is LIVE in ranks_python.json but UNRATIFIED (code-review S-5 awaits Paul's ruling); the last ratified set is 30/25/40/5 (2026-07-07)"
  - "Workbook write collisions: a parallel 'other session' writing the same workbook once reverted a committee-fix COM write; workbook edits must be sequenced with other sessions"
  - "Open modeling knobs M1-M5 and L4 from the 2026-06-26 adversarial audit are the user's call (see Open items from audits)"
action_items:
  - description: "Rule on code-review S-5: ratify or reject the live pillar weights 45/10/40/5 (last ratified 30/25/40/5, 2026-07-07)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Decide on open modeling knob M1 (defection over-sensitive; tune DTHRESH/MAXSHIFT)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Sensitivity-test M5 (the no-position PERS=0.55 default drives 59.8% of cells)"
    status: "todo"
    deadline: ""
    owner: "Claude"
  - description: "Decide M3 (CFPB-Reach block 145 dropped from flip channel) and L4 (document or unify the diffusion kernel across modules)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Decide whether to actively balance the partisan optics of the replace/contest plays entering the frontier (aggregate leans D, about 30D/14R)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Apply _sm edge-keyed draws to any further budget_frontier.py path where per-topic deltas matter (done for budget_frontier.py and per_topic_coalition.py by HIGH-1)"
    status: "done"
    deadline: ""
    owner: "Claude"
  - description: "Push regenerated im_allocation.json to the workbook IM sheet via write_im_sheet.py (done 2026-06-26, backup PRE-IM-20260626.xlsx)"
    status: "done"
    deadline: "2026-06-26"
    owner: "Claude"
focal_points:
  - "[[paul-goff]]"
related_topics:
  - "[[2026-06-feature-congress-r-scrapers]]"
  - "[[2026-06-feature-cosponsor-and-sector-networks]]"
  - "[[2026-06-feature-cu-stance-and-sentiment]]"
  - "[[2026-06-feature-melange-dashboard-ui-evolution]]"
  - "[[2026-06-feature-moneyball-excel-model-build]]"
  - "[[2026-06-working-agreement-change-control-and-decision-authority]]"
  - "[[2026-07-feature-agent-tooling-stack]]"
  - "[[2026-07-feature-audio-and-speech-lane]]"
  - "[[2026-07-feature-data-collection-lanes]]"
  - "[[2026-07-feature-influence-engine-internals]]"
  - "[[2026-07-feature-legislative-pillar-acu-review]]"
  - "[[2026-07-feature-member-approach-briefs]]"
  - "[[2026-07-feature-personality-psychometrics]]"
  - "[[2026-07-feature-primacy-and-industry-tier-boards]]"
  - "[[2026-07-rfc-melange-architecture-system-of-record]]"
  - "[[2026-07-troubleshooting-melange-audits-and-reviews]]"
  - "[[2026-07-troubleshooting-melange-live-tree-git-drift]]"
  - "[[2026-08-incident-refresh-automation-reliability]]"
  - "[[2026-08-incident-workstation-disk-and-backup]]"
  - "[[2026-09-feature-staffer-network-data-and-math]]"
  - "[[2026-09-feature-staffer-network-surfaces]]"
  - "[[2026-09-feature-ui-redesign-boards]]"
related_actors:
  - "[[codex-executor]]"
  - "[[debate-stance-model]]"
  - "[[draft-systems-r-pipeline]]"
  - "[[higgsfield-connector]]"
  - "[[lobbyview-collector]]"
  - "[[melange-audio-pipeline]]"
  - "[[melange-dashboard]]"
  - "[[melange-fec-pipeline]]"
  - "[[melange-refresh-scheduler]]"
  - "[[melange-repo-mirror]]"
  - "[[moneyball-skill-library]]"
  - "[[moneyball-workbook]]"
  - "[[project-brain]]"
  - "[[quant-model-evaluation-skill]]"
  - "[[sentinel-collectors]]"
  - "[[staffer-live-sidecar]]"
related_teams: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_member_desk_integration.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_member_desk_integration.md", sha256: "77b0312aa6bcd56f96361ddcdb9e881aafc90eae83297e75efeadeccfda060e2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_scenario_prep.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_scenario_prep.md", sha256: "0807b23ec2688652c69dff061882d9c68fcb518a7c6c18682a8f910964d23a35"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# Melange Systems (Moneyball CU-influence model)

> Moneyball (visible name Melange) is a credit-union legislative-influence model and dashboard over the 533 members of Congress: one deliverable, `Melange Systems/Moneyball.html`, generated from the Blended workbook by a Python pipeline. Alias "Draft Systems" (predecessor root): the project began in Draft Systems and its code root there is the actor [[draft-systems-r-pipeline]].

## Overview

- **What it is:** a credit-union (CU) legislative-influence dashboard. ONE deliverable: `Melange Systems/Moneyball.html` (SNA cosponsorship network + per-member "member desk", dark theme, merged by `make_combined.py`). The map of every file, the pipeline and the live config lives in **`Melange Systems/INDEX.md`**: read it first.
- **Source of truth:** `Moneyball Main Version - Blended.xlsx` (see [[moneyball-workbook]]). Everything is regenerated from it after any workbook change.
- **Scope of the 533:** the clean 533-member set is used everywhere (member-set consistency verified 2026-06-26: 533 in all files; archive_leg covers 511, 22 members have no bills).
- **Naming:** visible text is "Melange"; the `Moneyball.html` / `Moneyball Dashboard.html` file names stayed Moneyball (later ruling recorded in [[2026-06-feature-melange-dashboard-ui-evolution]]).
- **Provenance of the home:** June 2026 work ran in `Draft Systems` (R scrapers plus the Excel model). On 2026-06-26 the canonical home was reorganized to `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\` (see Reorg below); `Draft Systems` was left intact because it holds irreplaceable raw data and models.

### Pipeline (all in `Melange Systems/fec/`)

Source of truth = `Moneyball Main Version - Blended.xlsx`. Regenerate after any workbook change, IN ORDER: `build_dashboard_bundle.py` -> `make_dashboard_html.py` + `make_member_desk.py` -> `make_combined.py`.

- **Workbook writes go through Excel COM (win32com)** so formulas/tables recalc (openpyxl drops cached values). Excel must be CLOSED. Every model edit backs up to `backups/*.PRE-*.xlsx` first; restore + regenerate to revert. (Later superseded: the newest standing rule is "NO COM anywhere"; this COM-write rule is the older version, kept because it explains the 2026-06 backups and scripts. See [[2026-06-working-agreement-change-control-and-decision-authority]] for the working agreements.)
- `congress_cosponsor_network_*.xlsx` is **globbed (latest by mtime)** by `build_dashboard_bundle.py` and flip_model: DON'T move it.
- Generators write HTML with `const DATA=__DATA__` / `__BUNDLE__`; the combined file wraps each app's JS in its own IIFE, so in the preview `DATA` isn't global: drive controls via the DOM.
- Preview browser has a 0x0 viewport (network-canvas screenshots fail): verify with `preview_eval`, not screenshots. NFC-normalize accented names for joins.
- Surface actor: [[melange-dashboard]]. FEC pipeline actor: [[melange-fec-pipeline]].

### The model (Blended Model sheet)

Score = weighted blend of 4 pillar PERCENTILES (`AB2:AB5` weights). Pillars: **Press%** (col9), **Legislative%** (col16, weighted by `AB2`), **Influence/committee%** (col18, approximately Committee% since centrality weight=0, `AB4`), **Demo%** (col13, `AB5`). Rank = RANK(Score). The member-desk score reproduces exactly: `AB2·Leg% + AB3·Press% + AB4·Cmte% + AB5·Demo%` (so the AB order is Legislative, Press, Committee/Influence, Demographic).

#### Pillar weights: all three sets (resolution 3)

| Weights | Date | Status | Notes |
|---|---|---|---|
| `.40/.30/.20/.10` (Committee/Influence 0.40, Legislative 0.30, Press 0.20, Demo 0.10) | 2026-06-29 | HISTORICAL | Set by `apply_weights.py`; this is what `project_member_desk_integration` called "CURRENT weights = committee-weighted" |
| `30/25/40/5` | ratified 2026-07-07 | LAST RATIFIED | Constitution text and brain record still say this |
| `45/10/40/5` | live in `ranks_python.json` (`ab_weights`, `pillar_policy.py:11-16`) since 2026-09-03 | LIVE BUT UNRATIFIED | Code-review S-5 awaits Paul's ruling; moved 520/533 ranks vs the 08-26 baseline |

Order of the 4 numbers in the two newer sets follows `AB2:AB5` (Legislative, Press, Committee/Influence, Demo): 45/10/40/5 = Leg 45, Press 10, Committee 40, Demo 5 (45/10 is about 81.8/18.2 of the leg+press share). Details of the later weight history are in [[2026-07-feature-influence-engine-internals]] and [[2026-07-troubleshooting-melange-audits-and-reviews]].

- **Why committee-weighted at .40/.30/.20/.10 (2026-06-29):** press at 0.40 was an over-weighted **tone/visibility proxy** (press_value = LSD tone intensity x direction x topic-weight) that mis-ranked the real power players. Example: Tim Scott (Banking leader + Defender, committee 1.00) sat at No. 18 because his 47 measured CU articles scored about 0 press_value on low-weight topics. Committee = the truthful structural-CU-power signal, and committee-weighting suppresses active *opponents* (they lack CU committee power) where leg/press didn't. Tim Scott moved to about No. 3.
- **KEY PRINCIPLE (cost many rounds): rank = INFLUENCE; per-category stance = ALIGNMENT. Two separate axes** (see [[influence-vs-alignment-axes]]). A high-activity OPPONENT (e.g. AOC, Welch: prolific consumer-finance cosponsors, anti-CU) will rank decently on influence; that is fine: the stance layer is the friend/foe filter, and the optimizer won't fund opponents. Do NOT make the rank pure-influence-led as the ONLY view (user: "that does not reveal underdogs"): the **Moneyball point is undervaluation**. Underdogs surface in the SEPARATE undervaluation/efficiency view (Intrinsic/Visibility/Undervaluation/Underdog-rank columns + the optimizer), which the influence-weighted rank does not erase.

#### Pillar details and decisions

- **Press:** real CU press releases only (LSD tone x stance direction x per-category weight; Interchange/CU-Tax/Credit-Card weight 1, rest 0.05). The 1,310 `billstatus:` rows (synthetic "X cosponsored Y" one-liners) are DE-DUPED out of the pillar (`apply_press_dedup.py`) AND hidden from the display. About 319 members have 0 press, but press is only 0.20 weight (at that date) so the sparsity barely matters. (`apply_press_redup.py` re-adds them if ever wanted.)
- **Legislative:** STANCE-GATED / directional (`apply_leg_stance.py` -> Blended col4 = per-topic Sponsor+Co-Sponsorship activity x per-category stance sign [SM: Champion/Defender +1 ... Opponent -1] x importance). Active opponents go negative (AOC/Welch/Marshall sink); active allies stay positive. Earlier this churned when leg was a big driver, but committee 0.40 now anchors the board so it is well-behaved. (`apply_legstance_undo.py` reverts col4 to the un-gated `='Rank & Allocation'!D{r}` formula.)
- **Committee/Influence pillar:** `Blended Model!R` (col18, Influence%) = **committee_raw / MAX(committee_raw)** (`apply_committee_fix.py`), NOT the old double-percentile: percentile flattened a backbencher (score 2.5) to the 90th %ile next to chairs, so prolific juniors (Byron Donalds) ranked top-10. The normalized raw score distinguishes leadership: Crapo No. 1 (Banking+Finance+JCT), Tim Scott No. 2; Donalds No. 8 -> No. 14. Source = `Committee Data` relevance-tiered seats (Highly/Moderately/Slightly -> score; Small Business unified to Moderately).
- **Press DISPLAY corrections:** the DEBATE sentiment model (see [[debate-stance-model]]) mislabels articles (reads "prohibit"/"disapproval" as anti-CU). `press_stance_overrides.json` (match by url/title_contains, stance=support|oppose|neutral) -> `make_member_desk` applies it to the DISPLAY (`_press_corr`). Pillar/rank correction needs the upstream press_value re-flowed.
- **WORKBOOK COLLISION (warning):** a parallel "other session" writes the same workbook and reverted a committee-fix COM write once (re-saved an older copy). Workbook edits (weights/pillars via COM) must be SEQUENCED with the other session, or they get clobbered. Generator-side changes (overrides, the .py edits) are safe from this.
- **Stance:** per-category Champion -> Opponent 10-tier ladder + **Defender** (champion on a defensive flagship); overall = importance-weighted aggregate of the per-category tiers (`category_stance.json` matrix). Scoring detail: [[2026-06-feature-cu-stance-and-sentiment]].

### Member desk + SNA features

- **Member desk:** General page (overall rank/stance/legislative radar/pillar bars/invested=FEC/electoral-vuln $), plus sections Staff, Bio, Relational, **Committee positions** (full seats with relevance badges), Demographics (PERCENTILE-normalized radar; min-max crushed it), Psychometrics (see [[2026-07-feature-personality-psychometrics]]), Legislative actions (DEDUPED: one row per (bill,congress), most-specific role, area tags), Press & social media (graded-sentiment filter, billstatus hidden).
- **Efficiency view** = Golovin-Krause optimizer (`optimize.py`, $500 increments, $10k FEC per-member cap). Coalition builder (see [[2026-07-30-coalition-builder-redesign-session]]).
- **SNA network:** **committee-cluster layout toggle** (Porter et al. 2005 normalized-interlock spring layout, Cosponsorship<->Committees in `make_dashboard_html`; stable `crc32` jitter seed). Bidirectional navigation with the member desk. Network detail: [[2026-06-feature-cosponsor-and-sector-networks]].

### User working style (critical)

Run everything myself (scripts, rebuilds, recalcs): the user sets metrics/thresholds. Give unvarnished assessments, own mistakes plainly, don't appease. Weights/multipliers are the user's to set, but when delegated ("make the decisions"), make the truthful call and apply it. Verify every change with real numbers; don't claim done without proof. Related rules recorded as memories: `feedback_never_appease`, `feedback_run_everything`, `feedback_ask_before_changes`, `feedback_consult_multipliers_thresholds`. The current form of these working agreements lives in [[2026-06-working-agreement-change-control-and-decision-authority]]; person profile: [[paul-goff]].

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none recorded |
| Progress | Pre-flight (2026-06-26), reorg to Melange Systems, 31/31 audits, model + desk + dashboard pipeline (2026-06-29); later lanes in linked topics |

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Rule on code-review S-5: ratify or reject live weights 45/10/40/5 | todo | none | [[paul-goff]] |
| Decide open knob M1 (defection over-sensitive; DTHRESH/MAXSHIFT) | todo | none | [[paul-goff]] |
| Sensitivity-test M5 (PERS=0.55 default drives 59.8% of cells) | todo | none | Claude |
| Decide M3 (CFPB-Reach block 145) and L4 (diffusion kernel docs/unify) | todo | none | [[paul-goff]] |
| Decide on balancing partisan optics of contest plays in the frontier | todo | none | [[paul-goff]] |
| Port `_sm` edge-keyed draws to budget_frontier.py / per_topic_coalition.py | done | none | Claude |
| Push regenerated im_allocation.json to workbook IM sheet (write_im_sheet.py) | done | 2026-06-26 | Claude |

> Action items are defined in the frontmatter (`action_items` field) to enable Dataview queries. The table above is a visualization for readability.

**Dataview query — pending items for this project:**

```dataview
TABLE WITHOUT ID
  item.description AS "Item",
  item.status AS "Status",
  item.deadline AS "Deadline",
  item.owner AS "Owner"
FROM "projects"
WHERE file.name = this.file.name
FLATTEN action_items AS item
WHERE item.status != "done"
SORT item.deadline ASC
```

## Blockers

- Pillar weights 45/10/40/5 are LIVE in `ranks_python.json` since 2026-09-03 but UNRATIFIED; code-review S-5 awaits Paul's ruling. The last ratified set is 30/25/40/5 (2026-07-07). The historical set is `.40/.30/.20/.10` (2026-06-29).
- Workbook COM-write collisions with a parallel session (older rule; the newest rule is "NO COM anywhere").
- Open model knobs listed in "Open items from audits" in the second half of this page.

## Where knowledge lives (index)

This project note is an index: curation, not repetition. Pointers by theme.

**Model, workbook and data foundation**
- Excel build of the model in June 2026: [[2026-06-feature-moneyball-excel-model-build]]; the workbook itself: [[moneyball-workbook]].
- R scrapers that fed the original corpora (Draft Systems era): [[2026-06-feature-congress-r-scrapers]], code root actor [[draft-systems-r-pipeline]].
- FEC money and the Python pipeline under `fec/`: [[melange-fec-pipeline]]; influence engine internals: [[2026-07-feature-influence-engine-internals]]; architecture and system of record: [[2026-07-rfc-melange-architecture-system-of-record]].
- Sibling project on FEC contributions intelligence: [[mentat]]. Skill library: [[moneyball-skill-library]]; model-evaluation skill: [[quant-model-evaluation-skill]]; agent toolkit: [[project-brain]].

**Scoring and boards**
- Stance and sentiment: [[2026-06-feature-cu-stance-and-sentiment]] with the stance model [[debate-stance-model]]; Big Five psychometrics: [[2026-07-feature-personality-psychometrics]].
- Legislative pillar and ACU review: [[2026-07-feature-legislative-pillar-acu-review]]; ACU north-star rulings: [[2026-07-27-acu-outline-north-star-rulings]].
- Primacy and industry tier boards: [[2026-07-feature-primacy-and-industry-tier-boards]]; member approach briefs: [[2026-07-feature-member-approach-briefs]].
- The two axes concept (influence versus alignment): [[influence-vs-alignment-axes]].

**Networks and surfaces**
- Cosponsor and sector networks: [[2026-06-feature-cosponsor-and-sector-networks]]; staffer network: [[2026-09-03-staffer-network-architecture]], [[2026-09-06-staffer-sorting-rulings]], [[2026-09-feature-staffer-network-data-and-math]], [[2026-09-feature-staffer-network-surfaces]], sidecar [[staffer-live-sidecar]].
- Dashboard (Moneyball.html) as an actor: [[melange-dashboard]]; its UI history: [[2026-06-feature-melange-dashboard-ui-evolution]], [[2026-09-feature-ui-redesign-boards]], [[2026-07-30-coalition-builder-redesign-session]].

**Collection, audio and automation**
- Data-collection lanes: [[2026-07-feature-data-collection-lanes]] with [[lobbyview-collector]] and [[sentinel-collectors]]; audio and speech: [[2026-07-feature-audio-and-speech-lane]], [[melange-audio-pipeline]]; media generation connector: [[higgsfield-connector]].
- Refresh automation: [[2026-08-incident-refresh-automation-reliability]], [[melange-refresh-scheduler]]; workstation: [[2026-08-incident-workstation-disk-and-backup]]; repo mirror: [[melange-repo-mirror]]; live-tree git drift: [[2026-07-troubleshooting-melange-live-tree-git-drift]].

**Quality and agent working practice**
- Audits and code reviews: [[2026-07-troubleshooting-melange-audits-and-reviews]]; agent tooling stack: [[2026-07-feature-agent-tooling-stack]] with [[codex-executor]]; working agreement on change control: [[2026-06-working-agreement-change-control-and-decision-authority]].

## Timeline of the source facts

| Date | Event |
|---|---|
| 2026-06-26 | Pre-flight fixes, scenario tooling, two independent adversarial audits, FEC data-quality assessment and HIGH-3 reversal; reorg to `Melange Systems` (details below) |
| 2026-06-27 | Source memory `project_moneyball_scenario_prep` last written (it records the 2026-06-26 work) |
| 2026-06-29 | Source memory `project_member_desk_integration`: model, pillar weights `.40/.30/.20/.10` (historical), desk and SNA features, pipeline order |
| 2026-07-07 | Pillar weights 30/25/40/5 ratified (LAST RATIFIED) |
| 2026-09-03 | Pillar weights 45/10/40/5 live in `ranks_python.json` (LIVE BUT UNRATIFIED; S-5 awaits Paul) |

## Pre-flight pass before scenario tools (2026-06-26)

Pre-flight pass before implementing scenario tools (budget/dial what-ifs + defection/money shocks). All in `fec/`. 22/22 integrity throughout.

**Core-model audit (frozen-sheet gap depth):** the Durbin-class frozen `Legislative Score - Normalized` gap did NOT corrupt the overall Rank & Allocation **stances**: they are press-anchored. Validated: Marshall & Reed have POSITIVE raw legislative (bipartisan cosponsorships) yet are correctly **Opponent** via press; ZERO members are Champion/Ally with strongly-negative press; Durbin Opponent. Frozen-leg (R&A col D) vs naive archive-sum: corr 0.08, 43 sign flips; but the naive archive sum is ALSO wrong (artifact: Durbin sums +26 from bipartisan bills). So **do NOT reconcile the core model to a naive archive**: it would be worse. Damage was contained to the per-category layer (already fixed). Decision: no risky refresh; the corrected per-category layer is the category-level truth, overall stances reliable.

**COALITION DETERMINISM BUG (big one):** `per_topic_coalition.py` was non-deterministic even at fixed `random.seed`: two same-seed runs differed $12.6M. Cause: cascade frontier built from **sets** (`dict.fromkeys(Aseeds,...)`), and Python per-process **hash randomization** varies set iteration order, so random draws were consumed in different order. Fix: `sorted(Aseeds)/sorted(Bseeds)` in cascade (line ~35) + **Common Random Numbers** (`random.seed(1000003*SEED+it)` per MC iteration in `spread()`, so base and every `spread({n})` share draws, so marginal isolates the true effect) + `SEED`/`MC` now env-configurable. Now same-seed = byte-identical ($0). **Scenario protocol: always run baseline + perturbed at the SAME seed, so deltas are exact with zero MC noise.** Residual cross-seed variance (about $13M between seed99/199 at MC=20) is baseline-credibility only (which seed picked), irrelevant to same-seed deltas; bump MC or seed-ensemble later if the baseline itself needs to be less arbitrary. `per_topic_flip` is already deterministic (greedy LT, no MC).

**Infra built:**
- `make_baseline.py` -> freezes current outputs to `Draft Systems/baseline/` + manifest (seed/MC/budget).
- `scenario_diff.py <cur> <base>` -> top per-member $ movers across topics.
- `data_confidence.py` -> `confidence.json` (0-100 per-member coverage: leg breadth 50 + press 30 + votes 20); 36 low-conf members, 22 with ZERO archive bills, single-pillar cats = CDFI (press-only) / TCPA (leg-only), votes cover only about 3 cats. Reports $50k cap saturation per topic (binding hard: Data Privacy 23/31, CU Capital 4/4). Confidence is surfaced in dashboard hover (`cf` field).

## Budget/dial what-if tool

Framed as "cautiously expand while retaining the core coalition." `budget_frontier.py` = **CELF lazy-greedy nested frontier**: pro champions are the free core, then add seeds by leverage-weighted marginal-spread-per-$ (deterministic cascade with CRN + sorted frontier), recording the path (budget -> spread), seed entry order, and the diminishing-returns **knee**. Nested by construction ($500K inside $1M inside $2M, so the core is retained). Validated on Interchange: core 11 (base 48) -> +45 seeds, knee $1.85M. The budget slider = live lookup of the precomputed path.

## Electoral model (user decisions)

- `build_electoral.py` -> `electoral.json` = competitiveness `1-security` from Ballotpedia `Election_Average` (Golden/Ossoff/Warnock most competitive, Schiff/Padilla safe; 503/533 matched). User chose **leverage-only** (no durability discount) and **directional**: agreeable -> support incumbent (defend), hostile -> support challenger (replace). `build_electoral_plays.py` -> `electoral_plays.json`.
- **NON-PARTISAN is a hard requirement (user: CUs stay non-partisan, don't bias against Democrats).** The data showed a real skew (D 17% hostile vs R 10%) AND mislabels (Warnock = Skeptic off just -0.16 press, not an adversary). Fixes keep the core stance model (real positions) and fix the ACTION layer: (1) **replace gated on OVERALL Opponent only** (drop Skeptic, so Warnock falls out); (2) **PRIMARY route** = replace a hostile incumbent with a friendlier SAME-PARTY member, benchmarked on **same-party average** (targets intra-party outliers, works in safe seats, never shifts party balance); cross-party "general" route kept as flagged partisan option. Result party-balanced **31 D / 22 R replace**, Hawley now "primary a friendlier R" not "fund a D". Defend (Champion/Defender/Ally, vs cross-party loss, x competitiveness) = 309, both parties.
- **Frontier integration (toggleable ELECTORAL mode):** `budget_frontier.py --electoral` (or env ELECTORAL=1) adds replace plays into the CELF greedy: a funded replace **converts that Opponent anti -> pro in the same cascade** (`spread()` does `anti-set(extra)`), so it is valued in the same spread units as a coalition seed, x REPFAC=0.6 (primary-win feasibility). Validated Interchange: coalition 112 -> electoral 142 (15 replace seeds enter, both parties: Merkley/Reed/Durbin/Tran D, Hamadeh/Budd/Thune R). Outputs `budget_frontier.json` (coalition) + `budget_frontier_electoral.json` with `defend_overview`. Dials: REPFAC, LELEV, LEV, MAXSEEDS, all env.
- **DEFEND folded into greedy + AUDIT (roadmap step 1, done):** defend is now a real cost-line, not a separate overview. Model: a competitive at-risk ally (pro on issue, EP defend, comp>=0.4) is only PROBABILISTICALLY pro in the baseline (held with probability 1-comp); defending forces them to hold, so marginal = expected spread recovered. Two-set CELF (S = coalition/replace additions, D = defended); `spread(extra,defended)` discounts at-risk allies. `audit_frontier.py` caught 3 real bugs, all fixed: (1) Allies double-listed in coalition+defend pools, so the coalition candidate pool = Neutrals only; (2) congestion `bx` draw broke CRN (only rolled for unseeded members, so adding a seed shifted the RNG sequence), now rolls for every member then filters; (3) display non-monotonicity (MC cascade-divergence noise CRN can't cancel), so path 'spread' is clamped non-decreasing, true `cur` kept for marginals. Re-audit **11/11 pass** (monotonic, submodular-tolerant, types, base-discount, party-balance, knee, nested).
- **Honest residual:** replace plays entering the frontier lean D (about 30D/14R) because adversaries cluster on contested issues (interchange/rate-caps); primary framing keeps each play non-partisan but the aggregate tilts D; open whether to actively balance optics.
- **Diminishing-returns status at that point:** flip = sqrt(money) yes; coalition = across-seed (submodular + cap + knee) yes but NOT within-seed (binary to cap); industry/bank congestion soft-capped 0.9, not smooth: a real per-$ response curve for BOTH CU + competitor money was to be added in roadmap step 2 (money shocks).
- **ROADMAP:** step 2 = defections + money shocks DONE; step 3 = scenario running under the two models (needs refresher); the dashboard LAST after everything is verified.
- **STEP 1 close:** "replace" -> "contest" rename (sed excluding errors='replace' / .replace()); re-audit 11/11 clean. Play type is now `contest` everywhere (electoral_plays.json, frontier files, audit).


## Step 2: money-response + defection mechanic (DONE)

`money_response.py`. User chose a **saturation-aware curve** and **money-triggered AND manual defections**.

- Key correction: the `saturation` field is PAC$ divided by receipts (<1% for most, e.g. Daines 0.82%), so it adds little; **receipts (capacity)** does the "flush member barely moves" work.
- Model: `shift_lean(m,source,amount)= ±MAXSHIFT·(r/(r+HALF))`, r = amount/max(receipts, 200k floor); concave, so diminishing returns, capacity-aware. Validated: $100k moves Daines (+9.2) / Golden (+4.5) / GluesenkampPerez (+3.1) by receipts size; Golden $250k -> +9.6 vs $500k -> +15.5 (concave).
- `defection(m,dlean)`: if |dlean| >= DTHRESH=15 and the member is persuadable (NOT Champion/Defender/Opponent), drag stance toward the money by int(|dlean|/DTHRESH) tiers along ORDER. comp +$250k defects Ally -> Neutral etc. Dials MAXSHIFT=40, HALF=0.10, DTHRESH=15.
- Watch: low/under-reported-receipt members hit the $200k floor, so they are maximally movable (data artifact). Other variables maybe to add: current-lean asymmetry (pulling back a captured member costs more), incumbency/seniority, chamber.
- NOT yet wired into the net_lean recompute -> flip/coalition re-run at that point (that is step 3, scenario running).

## Step 3: pathfinding from 2 papers (user attached, in Downloads)

1. RELINK / Closed-Network-IM CIKM25 = edge-activation influence maximization under a per-node out-degree budget (each member whips at most k colleagues); maps to co-sponsor campaigns.
2. Multi-Objective Path-Based D* Lite (MOPBD*) = incremental multi-objective shortest-path (reuse search when edge costs change, so real-time; Pareto over conflicting objectives).

User decisions: co-sponsor route = **Pareto multi-objective** (co-sponsors / money / risk, risk = cascade-failure probability); sheet connection = **incremental D* Lite** (edit a cell, replan only the affected slice; win32com available, no xlwings/watchdog).

**Co-sponsor route finder BUILT + validated** (`cosponsor_route.py`): seeds = champions, edge-activation greedy (tree-reach spread, edge cost = CEDGE/p so weak ties cost more), out-degree K=5, Pareto front via risk-aversion lambda sweep. Fixed a value-inversion bug (added positive-value guard `if -nval<=0: break`). Validated: Mortgage max-spread $419k / +5.6 / risk 0.59 vs low-risk $33k / +1.2 / risk 0.39 (distinct Pareto points); **Interchange has NO reliable routes** (champions weakly tied, all p about 0.10, so don't run a co-sponsor campaign there). LT-priming + sheet-sync + MC-upgrade + full audit + reorg were then DONE (next section). Caveat: tree-reach spread is first-order/conservative (ignores cascade reinforcement); it could be upgraded to MC cascade. Remaining step 3 at that time: LT-priming calc; incremental D* Lite replanning; live Moneyball-sheet tab (COM write-back + cell-change replan). Audits still clean (22/22 + 11/11).

**Bridge toggle:** `per_topic_flip.py --bridge` (or env BRIDGE=1) applies a direct bridge target-value boost `tgt*(1+GAMMA*bp)`, GAMMA=1.2, writes a separate `per_topic_alloc_bridge.json`. OFF by default. Gentle tilt (Mortgage $-wt bipartisan 23.9% -> 24.3%, gainers Cassidy/Kustoff/Cramer). Related memory: `project_category_stance_3d` (the bipartisanship metric + cross-party cascade amplifier, negligible effect, kept as a decision aid).

## Step-3 finish + REORG (2026-06-26; order: LT-priming, sheet, MC, audit, reorg)

- `lt_priming.py` -> `lt_priming.json`: per-target LT flip recipe, cheapest balance of network pressure (recruit which neighbors, each adds P[u][v]) + direct money (diminishing). theta by tier + net_lean resistance. Validated Mortgage: low-gap = money-only, Cassidy gap 1.15 = pressure (recruit Kennedy/Warren/Ossoff).
- `sheet_sync.py`: writes a `Melange - Live` tab to the workbook via COM (win32com), + **D*-Lite incremental**: md5 fingerprint per topic (stances + net_lean); diff vs `sheet_sync_snapshot.json`, so only CHANGED topics are flagged for recompute (validated: 0 on no-op, exactly 1 on a single Interchange edit).
- `cosponsor_route.py` MC upgrade: `MCMODE=1 MC=40` recomputes route reach via IC cascade on the induced subgraph (captures reinforcement) vs the default fast tree-reach. Validated higher + compounding ($75k tree 2.1 -> MC 2.8). CRN-deterministic.
- `audit_full.py`: consolidates integrity (22) + frontier (11) + new module checks (money concavity/capacity, electoral gating + balance, stance sanity, route Pareto + MC>=tree + determinism, priming validity) = **18/18 ALL CLEAN**. (3 initial fails were audit-script bugs: over-strict Durbin-CreditCard assertion [he is Skeptic now, not Opponent], route-front regex missing multi-space.)
- **REORG: canonical home is now `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\`** (189MB, self-contained, README.md maps it). Selective copy of working materials (fec/ 48 scripts, 26 json, 47 xlsx incl. workbook, votes/ members, baseline/, research/ 2 papers, dashboard). Paths updated (Draft Systems -> Melange Systems; workbook/dashboard now under Melange Systems). Verified 18/18 from the new location. **`Draft Systems` left INTACT** (NOT deleted): it holds 3.4GB raw/models (debate_finetuned safetensors 1.4GB, FEC itpas2.txt, press indexes) that are irreplaceable and only needed to regenerate base data; it is in OneDrive, so a full copy/delete was avoided. Future work: use `Melange Systems\fec` (the harness still resets cwd to Draft Systems, so cd to Melange). The user may clean up Draft Systems' redundant working-file duplicates at will.

## Brutal internal audit (2026-06-26, from canonical Melange Systems)

- **BUG FOUND + FIXED:** `money_response.py` defection `ORDER` list mixed taxonomies: it used per-category tier names (Defender / Highly Persuadable / True Neutral / Lean Skeptic) but operates on OVERALL stances (Champion / Ally / Neutral / Skeptic / Opponent / Unengaged). Result: 111 members defected to an invalid "Lean Skeptic" overall tier; 39 Unengaged could never defect. Fixed: ORDER=['Champion','Ally','Neutral','Skeptic','Opponent'], COMMITTED={'Champion','Opponent'}, Unengaged -> Neutral. Now only valid tiers.
- **Weak self-check fixed:** the audit_full defection check was a tautology (`... or True`); replaced with a real validity check. audit_full now **19/19**.
- **False alarm resolved:** the electoral primary value re-derivation mismatched, but the stored value is CORRECT: primary intentionally omits competitiveness (primaries aren't gated by general margin); my re-derivation wrongly added comp.
- **Clean (verified):** money-model invariants (pcts -> 100, net_lean = cu_adj - industry_adj, industry_adj = banks + finserv, 0 violations); member-set consistency (533 all files, archive_leg 511 = 22 no-bills); stance scores in [-1,1], no all-champ/all-opp; frontier monotonic + no degenerate + seed-accounting exact; electoral security in [0,1], leverage in [1,1.6]; bipartisan in [3,62]; route edge-prob in [0.008,0.613]; coalition determinism byte-identical; 0 NaN/Inf in all JSON; all 146 LT-priming recipes close their gap; route Pareto 0 dominated points.
- **Data-quality flags (not bugs):** 63 members (12%) have zero PAC-money (mostly legit PAC-refusers e.g. AOC; 14 unmatched in FEC with receipts=0); 18 members <= $200k receipts hit the money_response floor and so are max-movable; net_lean=None leaks into 2 VIZ scripts only (assemble_viz, sna_layout), not the model.
- **DOES IT RUN SCENARIOS? NO end-to-end runner.** Pieces existed (money_response computes shift + defection; scenario_diff compares; make_baseline freezes; sheet_sync detects changed topics) but NOTHING applied a shock, propagated net_lean, regenerated data, re-ran flip/coalition and diffed in one command. The missing piece = a scenario runner (OFFERED to build; built next).

## Scenario runner built + 2nd reorg bug found (2026-06-26)

- **Reorg bug found + fixed:** the Melange reorg sed silently FAILED on the workbook path: 34 scripts still pointed at `Desktop\Moneyball Main Version` (worked only because the Desktop original lingered). Fixed all 34 via python str.replace; they now point at `Desktop\Melange Systems\Moneyball Main Version`; the workbook copy IS in Melange; 19/19 against it. Melange is now truly self-contained.
- **Research corpus** (the user's library in Downloads, about 10 relevant): RELINK (closed-net edge-IM), MOPBD* (D*-Lite incremental multi-objective), **Adaptive Submodularity (Golovin-Krause, appears 3x)** = adaptive policy / observe-then-decide + lazy greedy guarantee, **Competitive IM (Bharathi-Kempe-Salek)** = viral-competitive, the foundation of our A/B cascade, Cosponsorship -> bill-passage (Sotoudeh-Porter-Krishnagopal 2406.19554), Lobbying-network dynamics (Bacik / In Song Kim 2503.11745), Signed-network coalitions (Aref-Neal x2, our hidden-coalition basis), IM-algo empirical (s41598-026 CELF++/RIS/IMM).
- **`scenario.py`** (end-to-end, grounded): `--money "Member:cu|comp:amount" --defect Member --stance "Member:Issue:Tier"`. Applies moves, then money_response shift_lean + defection (comp raises ind/B-pressure; defection = general disposition shift across the member's movable per-issue tiers via CTORD), then computes competitive-cascade CU spread per topic baseline vs scenario (deterministic CRN + sorted, MC=40), and reports per-topic + net influence delta + defections. `budget_frontier` got CONGEST/CATSTANCE env-overrides so scenarios can feed perturbed state. Validated: comp $300k Grijalva + $500k Golden + cu $200k Tim Scott -> both Dems defect (Ally -> Skeptic/Neutral), Scott absorbs, net -4.8 co-sponsors; deterministic. audit_full now **22/22** (added scenario end-to-end + determinism + sign checks).
- **HONEST LIMITATIONS:** (1) CU spends only act via conversion/defection: no gradual winnability in the coalition cascade (that is the FLIP model); a non-converting CU spend shows about 0 effect. (2) The 18 low-receipt floor members (incl. Grijalva) defect too easily (the receipts-floor artifact). (3) The runner is ONE-SHOT (apply, observe); the ADAPTIVE optimizer (Golovin-Krause: greedily CHOOSE the moves to maximize influence under budget, observing realized defections) is the natural next layer, NOT built at that point.

## Flip-channel wiring + adaptive optimizer (2026-06-26)

- **`flip_model.py`** (shared, faithful to per_topic_flip): `pflip(cu,ind,nA,nB,..)=a/(a+b)`, a = WM√(cu+1)/scale + WP·nA/mAt, b = WM√(ind+1)/scale + WP·nB/mBt; `flip_value(cat,MAT,cu,ind)=Σ tgt·pflip`; topic_setup cached per stance. Imported by scenario + optimize.
- `scenario.py` now reports BOTH channels: COALITION (cascade, camp/defection-driven) AND **FLIP (winnability, money-driven)**. CU spends finally register: gradual, diminishing (Wicker +$25k -> +0.040 ... +$400k -> +0.113). Validated: a comp shock drops both (coalition -4.8, flip -0.37 for Golden $500k); CU spends raise flip net.
- **`optimize.py`** = ADAPTIVE OPTIMIZER grounded in Golovin-Krause Adaptive Submodularity: lazy/CELF greedy allocates CU budget to maximize Σ flip_value (submodular √-curve, (1-1/e) guarantee). ADAPTIVE = when a member's cumulative CU crosses their money_response defection threshold they CONVERT (stance -> pro), we observe it, clear the cache, rebuild marginals, re-optimize. $2M -> +39.82 expected flips; 3 conversions (Patronis/Walkinshaw/Moody). Writes `optimize_result.json` (frontier + alloc + conversions). Deterministic.
- **HONEST CAVEAT:** the optimizer spreads THIN ($25k x about 80 members): math-optimal under the flip √-curve (first dollar everywhere > second dollar anywhere; money effect modest vs network proximity), but practically you would concentrate; no diminishing-returns knee within $2M. Conversions reflect the receipts-floor artifact (low-receipt members convert at $25k). Could add a min-chunk/concentration constraint or capacity-aware (money_response) money in pflip to reconcile the two diminishing-returns curves (flip √ vs money_response receipts-saturating).
- **audit_full now 26/26** (added flip-channel + optimizer runs/monotone/deterministic checks; fixed 2 stale regex from the renamed NET output: not system bugs).

## Diminishing-returns reconciliation + concentration (2026-06-26)

- Replaced the flip model's absolute-√ money term with a **capacity-aware saturating curve** (Michaelis-Menten): `a = WM*(cu+1)/((cu+1)+HALFF*R) + WP*nA/mAt` (HALFF=0.10, R = receipts floored 200k) in BOTH `flip_model.py` AND `per_topic_flip.py`: the same receipts-relative form as money_response, so the system now has ONE consistent diminishing-returns model (a $X check moves a big-receipts member less). Regenerated `per_topic_alloc.json`. Baseline winnability shifted 202.88 -> 215.92 (new curve).
- **Optimizer concentration:** min-chunk `INC=$100k` (a PAC doesn't micro-allocate $25k) + per-member cap `PMAX=$300k`. Now allocates about 20 members at $100k (realistic) vs the old $25k x 80 thin spread. Honest trade-off surfaced: the $25k spread gave +40.8 winnability (math-optimal but assumes $25k effective everywhere), $100k chunks give +17.3 (realistic/concentrated). INC/PMAX are dials. Conversions still fire (Hoeven/Hickenlooper convert at $100k, improve 10-12 issues).
- audit_full **26/26** clean after the change.
- **SYSTEM STATE at that point:** stance (3D) -> flip (LT, capacity-aware) + coalition (competitive IC) + electoral (contest/defend) + routes (RELINK Pareto) + priming (LT) + money-response (defections) + scenario runner (both models) + adaptive optimizer (Golovin-Krause), all in Melange Systems, 26/26. Only the DASHBOARD UI remained (the roadmap's last item; see [[2026-06-feature-melange-dashboard-ui-evolution]] and [[melange-dashboard]]).

## Independent adversarial audit + fixes (2026-06-26, separate cold agent)

Spawned a cold general-purpose agent (no investment in the code) to brutally re-audit. It found REAL bugs the self-written audits were structurally blind to (the "26/26" only checked NET aggregates + headline signs). The agent ALSO verified the core spine is genuinely sound: pflip identical across modules 1360/1360; money_response <-> flip reconciliation real (same Michaelis-Menten); CELF lazy-greedy provably correct = exhaustive; determinism byte-identical; structure 533/range(3,536) clean; lt_priming 146/146; Pareto 0 violations.

- **H1 (FIXED):** the optimizer scored WINNING a member as a LOSS: shift_pro lowers their PERS, which lowers flip_value, so the conversion delta was negative. Fix: `won` set + `secured` accumulator in optimize.py; a conversion banks m's flip at certainty (Σtgt) into `secured` and removes m from the flippable pool. Path now MONOTONE (0 drops, verified).
- **H2 (FIXED):** scenario per-topic rows were below the MC noise floor (std about 0.75-1.05 vs 0.3 threshold), giving impossible "competitor money helped CU" signs. Root cause: the cascade drew `random.random()` in activation order, so changing one member desynced the whole stream (CRN failure). Fix: splitmix64 `_sm(it,u,v)` edge-keyed draws, i.e. true CRN, so baseline vs scenario differ ONLY by the real perturbation. The comp shock is now clean: coalition -3.2, only same-sign rows. (budget_frontier.py had the same latent order-dependence, patched there only by non-monotone clamping; fixed later by HIGH-1.)
- **H3 (FIXED, later REVERSED, see below):** members with NO FEC data had ind=0, so b about 0 and pflip about 1 ("missing" misread as "no industry opposition"); 11 of 63 ranked top-50 winnability, inflating the base (215.92). Fix: impute the industry baseline (median of members WITH data) for zero-`total` members in flip_model.py + per_topic_flip.py; `fm.nodata` flags them. Base now realistic 186.50; 0 data-less in top-20. CAUGHT a follow-on: the scenario flip channel mixed imputed `fm.ind0` (baseline) with raw local `ind` (scenario), so the comp shock showed +28 winnability; fixed via `ind_flip = fm.ind0 + (ind-ind0_raw)` (one footing).
- **L3 (FIXED):** per_topic_flip.py had no `__name__` guard, so importing it overwrote per_topic_alloc.json. Wrapped main(). **L1 (FIXED):** removed dead `moneyscale` (flip_model + per_topic_flip).
- audit_full now **29/29** (added: comp-shock flip-channel sign, optimizer path-monotone, no-data-not-top-20).
- **STILL OPEN (modeling knobs / presentation, user's call):**
  - M1: defection over-sensitive (35% convert on one $100k; tune DTHRESH/MAXSHIFT).
  - M2: the overall-spectrum step count is applied to per-category CTORD (direction right, magnitude a simplification).
  - M3: CFPB-Reach block 145 dropped from the flip channel (17 vs 18 grain; stance still combined-correct, only the eng signal omits 145).
  - M4: stale `im_allocation.json` (old im_allocate.py, no Defender) still in the workbook IM sheet: regenerate or remove (later pushed, see FEC section).
  - M5: `—` / no-position PERS=0.55 drives 59.8% of cells (sensitivity-test).
  - L4: the diffusion kernel is cpf-amplified in coalition/scenario but not in cosponsor_route/lt_priming (document or unify).

## Second independent audit (math + formula article + data integrity) + fixes (2026-06-26)

A second cold agent (opus) wrote `MATHEMATICAL_SPECIFICATION.md` (every formula, 30+ constants with values/units/sources, worked pflip example, research citations), independently re-audited the math, and checked data integrity. VERDICT: "core mathematics is sound and the data is clean": pflip identical across modules, CELF == exhaustive greedy, path monotone, Pareto non-dominated, all 148 priming recipes close, money curve reconciles, clean 533-member set everywhere, BLOCKCAT identical across 4 modules. It found NO wrong-output / wrong-sign / out-of-range bugs in core scoring. Real findings (all now FIXED):

- **HIGH-1 (FIXED):** my scenario.py edge-keyed CRN (`_sm` splitmix64) was NOT in budget_frontier.py / per_topic_coalition.py: they still drew random.random() in activation order (residual marginal noise about 0.01-0.1 at MC=20). Ported `_sm` + `cascade(...,it)` into both. The audit now guards it (budget_frontier single-topic determinism check).
- **HIGH-2 (FIXED):** receipts=0/null floored to $200k made a $100k chunk look like 50% of fundraising, so instant conversion (34 members, 18 no-data). `money_response.receipts()` now imputes the MEDIAN receipts ($2.28M) for no-data members. Instant-convert on $100k: 35% -> 2.3%.
- **HIGH-3 (FIXED at that point, then REVERSED, see next section):** the H3 imputation only fired for total=0; 43 members had a FEC record but ind=0 (zero captured bank/finserv), 6 ranked top-20 winnability. Extended imputation to EVERY ind=0 member (median industry money), `ind_imputed` set, env-tunable IMPUTE_IND0=0 to trust raw zeros. Conservative (only lowers inflated winnability). Base winnability 171.76 -> 154.57.
- **MEDIUM-2 (FIXED):** the optimizer knee was always the full budget (thin spread keeps marginals flat); it now reports "no diminishing-returns knee within budget" honestly instead of implying a knee at $2M.
- **LOW-2 (FIXED):** stale README "18 passed" -> 29 (now 31).
- **STILL OPEN (documented, low):** MEDIUM-1 the optimizer banks conversion `contrib=Σtgt` at pre-conversion PERS, not champion weight (net jump small + positive, monotonicity intact; defensible "bank what you converted"); LOW-1 per_category_stance defl `<neg> and 2.0` idiom brittle; LOW-3 41 network-isolated members (5 PRO seed but spread nowhere: coverage limit, correct behavior); LOW-4 bpf[n] vs bpf.get (latent, bpf 533/533 so not live).
- audit_full now **31/31** (added ind=0-imputation-applied + frontier-CRN-determinism checks).
- NOTE: the workbook IM sheet should be refreshed via `write_im_sheet.py` (COM, needs Excel closed) to push the regenerated `im_allocation.json`; the JSON is consistent (G2 passes) but the on-sheet cells lag until pushed (pushed next).

## FEC data-quality assessment + HIGH-3 reversal (2026-06-26)

Pushed the workbook IM sheet (`write_im_sheet.py` via COM, 533x22, backup `PRE-IM-20260626.xlsx`). Then assessed FEC data quality and re-verified suspect members on FEC per the examined industries.

- **FEC method** (`full_congestion.py`): industry money = FEC bulk `itpas2.txt` (PAC -> candidate, types 24K/24Z) aggregated from a HARDCODED set of 33 major industry PAC committee IDs (BANKS=23: ABA/Citi/Wells/JPM/BofA/PNC/USBancorp/ICBA/TD/Regions/Truist; FINSERV=10: AFSA/Amex/CapOne/Visa/MC/Discover/Ally/Synchrony), joined name -> bioguide -> FEC-candidate via `legislators.csv`; receipts from `weball24.txt`. Source files (122MB itpas2.txt, cm.txt, weball24, legislators.csv) are present in fec/. (Later FEC pipeline: [[melange-fec-pipeline]].)
- **GAP TEST** (scratch `fec_verify.py`): for the 43 total>0 / ind=0 suspects, scanned ALL their 24K/24Z PAC money named via cm.txt. RESULT: ind=0 is **VERIFIED REAL**, not a tracking gap. 80% of all 533 have tracked industry money (the list works broadly). The 43 are 39D/4R, many no-corporate-PAC (Tlaib $86k total PAC). Their "untracked industry" money is almost entirely INSURANCE PACs (life/health/crop/P&C: a different industry) + false positives (END CITIZENS UNITED matched "citi"); genuine untracked bank/finserv is negligible (Bread Financial $5k, FSI $5k).
- **THEREFORE REVERSED HIGH-3:** my ind=0 imputation FABRICATED bank opposition these members verifiably don't have. The trigger was corrected to **receipts=0** (no FEC fundraising record at all = truly blind: 18 new/special-election winners like Grijalva/Moody). The 91 members who raised money but show ind=0 are TRUSTED (real zero = "not captured by the banking industry", a legit signal). The old total=0 trigger wrongly imputed 49 genuine no-PAC members. Env IMPUTE_IND0=0 disables. Base winnability 154.57 -> 191.46 (real zeros correctly un-depressed); 0 blind members in top-50; top targets sane (Tim Scott / Andy Biggs / Ro Khanna). The audit_full check was rewritten to "impute only no-FEC-record; trust verified-real zeros", **31/31**. Updated `MATHEMATICAL_SPECIFICATION.md` sec 4.3 + the data-integrity table.
- **DATA-QUALITY VERDICT:** the FEC industry-money method is sound; `ind` measures "money from the 33 major bank/finserv PACs" (a curated competitor signal, not all-industry). ind=0 = not funded by major banks (real). Only the 18 receipts=0 members are genuinely data-blind. Caveat for the user: `ind` excludes INSURANCE and minor/regional finance PACs by design.

## Open items from audits (consolidated)

M1, M2, M3, M4 (pushed), M5, L4 (see the list above); MEDIUM-1, LOW-1, LOW-3, LOW-4 (documented, low); the replace/contest plays' aggregate D lean (about 30D/14R) optics question; step 3 items "incremental D* Lite replanning" and "live Moneyball-sheet tab" beyond the sheet_sync fingerprint diff; the scenario runner is one-shot.


## Focal Points

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Map

Every note of this project by type, one line each; parts follow their parent.

### Related Topics

| Topic | Relation |
|---|---|
| [[2026-06-feature-congress-r-scrapers]] | June 2026 R scraper family in Draft Systems: congress.gov 17x3, CU press releases, Census CD, Ballotpedia, DEBATE stance |
| [[2026-06-feature-congress-r-scrapers-member-scraper]] | part: The congress.gov member scraper of 2026-06-02 to 06-10… |
| [[2026-06-feature-congress-r-scrapers-legislative-score-17x3]] | part: The integrated 17-topic by 3-role scraper behind the… |
| [[2026-06-feature-congress-r-scrapers-cu-press-scraper]] | part: The CU press-release scraper from its 2026-06-10 start… |
| [[2026-06-feature-congress-r-scrapers-press-collector-pipeline]] | part: The press text collector and one-command pipeline of… |
| [[2026-06-feature-congress-r-scrapers-press-discovery-and-attribution-fixes]] | part: Press scraper fixes of 2026-06-20/21: discovery truncation… |
| [[2026-06-feature-congress-r-scrapers-graded-scoring-and-audits]] | part: Graded press scoring of 2026-06-14 to 06-21: the graded… |
| [[2026-06-feature-congress-r-scrapers-stage5-debate-lsd]] | part: The Stage 5 overhaul of 2026-06-21 to 06-24 that replaced… |
| [[2026-06-feature-congress-r-scrapers-census-and-ballotpedia]] | part: The Census congressional-district scraper of 2026-06-16… |
| [[2026-06-feature-cosponsor-and-sector-networks]] | Moneyball network layer: co-sponsor plan (Jun), toggles + signed layers (Jul), five NET_CONFIG networks (Aug), relationships model (Sep). |
| [[2026-06-feature-cu-stance-and-sentiment]] | Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels |
| [[2026-06-feature-cu-stance-and-sentiment-stance-stack-design-and-accuracy]] | part: How the CU stance stack was designed and made accurate… |
| [[2026-06-feature-cu-stance-and-sentiment-june-stage5-template-and-cfpb-split]] | part: June 2026 stance work: the labeling template and re-run… |
| [[2026-06-feature-cu-stance-and-sentiment-july-recorrection-channels-incidents]] | part: CU sentiment work of 2026-07-15/16: the CFPB sentiment… |
| [[2026-06-feature-cu-stance-and-sentiment-press-and-social-display]] | part: Press and social display of 2026-07-19: graded press and… |
| [[2026-06-feature-melange-dashboard-ui-evolution]] | Melange dashboard UI history: capstone, member desk, retheme, simplification, plain-language pass, Members Section lane. |
| [[2026-06-feature-moneyball-excel-model-build]] | June 2026 build of the 533-member Moneyball workbook: four buckets, percentile-rank blend, calibration, scenario tooling |
| [[2026-06-feature-moneyball-excel-model-build-lineage-and-phases]] | part: Workbook lineage and file inventory and the June 2026… |
| [[2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits]] | part: Scoring refinements of 2026-06-24/25: press raw alignment… |
| [[2026-06-feature-moneyball-excel-model-build-category-stance-3d]] | part: The Category Stance 3D sheet of the Moneyball workbook… |
| [[2026-06-feature-moneyball-excel-model-build-scenario-tools-and-calibration]] | part: The scenario tools of 2026-06-26/27: the pre-flight audit… |
| [[2026-06-working-agreement-change-control-and-decision-authority]] | Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code. |
| [[2026-07-feature-agent-tooling-stack]] | Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap. |
| [[2026-07-feature-agent-tooling-stack-codex-executor-lane]] | part: The Codex executor lane record: how Claude and Codex were… |
| [[2026-07-feature-agent-tooling-stack-quant-model-evaluation-lane]] | part: The quant-model-evaluation skill lane of 2026-09-30… |
| [[2026-07-feature-agent-tooling-stack-skill-library-lane]] | part: The Moneyball skill library: how the repo skills were… |
| [[2026-07-feature-agent-tooling-stack-runpod-sessions]] | part: Running Claude sessions on the RunPod pod: Paul's rulings… |
| [[2026-07-feature-agent-tooling-stack-higgsfield-account-trap]] | part: The Higgsfield connector account trap: the connector bound… |
| [[2026-07-feature-agent-tooling-stack-project-brain-toolkit]] | part: The Project Brain toolkit: durable per-project memory for… |
| [[2026-07-feature-agent-tooling-stack-glass-box-lock-hang]] | part: The GLASS BOX lane-lock hang that blocked metaloop starts… |
| [[2026-07-feature-audio-and-speech-lane]] | Speech/audio lane: no shipped ASR, off-chain fail-closed, N audio route closed; audio layers complementary; four false mechanism claims. |
| [[2026-07-feature-data-collection-lanes]] | Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills |
| [[2026-07-feature-influence-engine-internals]] | July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder |
| [[2026-07-feature-influence-engine-internals-salience-sna-wave]] | part: The six-paper salience and press-SNA wave of 2026-07-01 in… |
| [[2026-07-feature-influence-engine-internals-receptivity-layer]] | part: The receptivity layer of the influence engine (2026-07-02… |
| [[2026-07-feature-influence-engine-internals-gate2-and-say-do]] | part: GATE-2 of 2026-07-07/08 in the influence engine, the C… |
| [[2026-07-feature-influence-engine-internals-chatgpt-lane-and-sublayer-surgery]] | part: The ChatGPT laundry-list lane landing of 2026-07-16 and… |
| [[2026-07-feature-influence-engine-internals-coalition-builder]] | part: The coalition-builder redesign and implementation of… |
| [[2026-07-feature-legislative-pillar-acu-review]] | Legislative pillar of Melange: legfix history, legfix5 19-category ACU review, effectiveness shadow lane, lobbying forecast |
| [[2026-07-feature-legislative-pillar-acu-review-letters-and-legfix-1-4]] | part: The legislative pillar from 2026-07-17 to 07-25… |
| [[2026-07-feature-legislative-pillar-acu-review-legfix5-full-text-and-culling]] | part: legfix5 of 2026-07-27: the six-year full-text collection… |
| [[2026-07-feature-legislative-pillar-acu-review-effectiveness-shadow-lane]] | part: The legislative-effectiveness shadow lane of 2026-09-10 to… |
| [[2026-07-feature-legislative-pillar-acu-review-cosponsor-forecaster]] | part: The bill-lobbying regression lane of 2026-09-04: making… |
| [[2026-07-feature-legislative-pillar-acu-review-bill-plane-and-media-stance]] | part: The 2026-07-10 corpus census and the bill-plane audit and… |
| [[2026-07-feature-member-approach-briefs]] | Per-member Suggested-approach briefs (Fable 533 calls; Sonnet lane): Tier 2 style, acoustics in, no percentiles, validator traps. |
| [[2026-07-feature-personality-psychometrics]] | Big Five psychometrics for Congress members: instruments, pre-registered looks, Senate-gold anchoring, N/A slots; O/C/E valid, A- grade. |
| [[2026-07-feature-personality-psychometrics-record-1-big5-campaign]] | part: Record 1 of the Big Five program: the accuracy campaign of… |
| [[2026-07-feature-personality-psychometrics-audit-dependability-and-n-reanchor]] | part: Records 2, 3 and 5 of the Big Five program: the psych… |
| [[2026-07-feature-personality-psychometrics-external-criteria-and-open-a-search]] | part: Record 6 of the Big Five program (2026-07-12): the RKH… |
| [[2026-07-feature-personality-psychometrics-senate-gold-desert-fill-and-a-anchoring]] | part: Records 7 to 10 of the Big Five program (2026-07-16 to… |
| [[2026-07-feature-primacy-and-industry-tier-boards]] | Primacy tier board (factor-only purity, drift, 09-19 methodology lane) plus per-industry tier boards, valence/tensor, champion crown law |
| [[2026-07-feature-primacy-and-industry-tier-boards-primacy-factor-drift-crown]] | part: The factor-only primacy board ruled on 2026-07-29 with its… |
| [[2026-07-feature-primacy-and-industry-tier-boards-industry-boards-build]] | part: Industry-tab interactions of 2026-08-03 and the… |
| [[2026-07-feature-primacy-and-industry-tier-boards-industry-boards-tensor]] | part: The per-industry boards tensor work of 2026-08-10/11: the… |
| [[2026-07-feature-primacy-and-industry-tier-boards-methodology-lane]] | part: The primacy-board methodology lane of 2026-09-19/20: the… |
| [[2026-07-rfc-melange-architecture-system-of-record]] | Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics |
| [[2026-07-troubleshooting-melange-audits-and-reviews]] | Melange audit runs, guardrails, 09-13 five-lane code review, hallucination framework (D-007), provenance census, laundry-list close-out |
| [[2026-07-troubleshooting-melange-audits-and-reviews-guardrails]] | part: Guardrails for any autonomous Melange audit or review run… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-1-3]] | part: The Melange audit runs of 2026-07-01 to 07-03: run 1, run… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-4-5-and-integrity]] | part: The Melange audit runs of 2026-07-04 to 07-10: run 4, runs… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-data-integrity-and-provenance]] | part: The data-integrity audit of 2026-07-01 on the bills… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-later-reviews]] | part: Melange reviews of August and September 2026: the… |
| [[2026-07-troubleshooting-melange-live-tree-git-drift]] | Melange live tree vs git: branch drift, live-only files, 35-commit reconcile, EOL census, live_patch.py cutter, off-box mirror |
| [[2026-08-incident-refresh-automation-reliability]] | Weekly Melange refresh has not completed since 2026-07-19; audit, rulings, tick-runner redesign, daily-chain blockers, Codex poll-loop burn |
| [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]] | part: The weekly Melange refresh as of 2026-09-19: measured… |
| [[2026-08-incident-refresh-automation-reliability-daily-refresh-closeout-and-flakes]] | part: The daily congress refresh close-out of 2026-09-19 and the… |
| [[2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn]] | part: The Codex overnight poll-loop burn of 2026-09-12/13 as… |
| [[2026-08-incident-workstation-disk-and-backup]] | C: filled by repo worktrees, cleared repeatedly (185.9 GB free on 2026-09-18); OneDrive stalled since 08-11; backup gaps |
| [[2026-08-incident-workstation-disk-and-backup-backup-gap-and-census]] | part: The workstation backup coverage gap measured on 2026-09-07… |
| [[2026-08-incident-workstation-disk-and-backup-clearances-and-retirements]] | part: The disk clearances and worktree retirements of 2026-09-11… |
| [[2026-09-feature-staffer-network-data-and-math]] | Staffer network lane 2026-09-01..08: adjudication, architecture, math audit, sorting rulings, clique fix, v7 spine and v6 ship. |
| [[2026-09-feature-staffer-network-surfaces]] | Staffer network surfaces: live sidecar on 8841, fourth Moneyball.html surface (#app-staffer), page redesign variant C, route-latency lane. |
| [[2026-09-feature-ui-redesign-boards]] | Sept 2026 redesign: Higgsfield boards for Mentat and Melange, overlay-first builds, finalize/reconcile rounds, graph quirks. |
| [[2026-09-feature-ui-redesign-boards-melange-boards-and-build]] | part: The Melange dashboard redesign boards of 2026-09-22 and… |
| [[2026-09-feature-ui-redesign-boards-finalize-reconcile-graph-quirks]] | part: The UI finalize after the reboot (2026-09-23 to 09-25)… |

### Related Actors

| Actor | Relation |
|---|---|
| [[codex-executor]] | Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17 |
| [[codex-executor-incidents]] | part: Two Codex incidents: the overnight poll-loop burn of… |
| [[debate-stance-model]] | Fine-tuned Political DEBATE NLI stance model (CPU) plus Lexicoder LSD tone; replaced the regex scorer in Stage 5 of the CU press pipeline |
| [[draft-systems-r-pipeline]] | Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline |
| [[draft-systems-r-pipeline-layout-and-knobs]] | part: Where the Draft Systems R pipeline lives on disk, its… |
| [[draft-systems-r-pipeline-architecture]] | part: Architecture of the six Draft Systems R scrapers and… |
| [[draft-systems-r-pipeline-code-catalogue]] | part: Code-level catalogue of the Draft Systems R pipeline… |
| [[higgsfield-connector]] | Higgsfield MCP connector (89 tools) used to render UI boards; bound to whichever account authorized it; Paul must re-authorize to switch. |
| [[lobbyview-collector]] | LobbyView LDA bulk-export collector (fec/collect_lobbyview.py @a126952, unmerged); NAICS unreliable, names decisive; 100 req/day API |
| [[melange-audio-pipeline]] | Audio speaker verification + speech layers: faster-whisper pinned, unused; off-chain fail-closed; layers complementary; feeds narratives. |
| [[melange-dashboard]] | Moneyball.html: the single Melange dashboard deliverable (network, member desk, industry boards, staffer network). |
| [[melange-fec-pipeline]] | Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch |
| [[melange-refresh-scheduler]] | Unattended Melange refresh jobs: weekly refresh, congress daily chain, report email; weekly not COMPLETE since 2026-07-19 |
| [[melange-repo-mirror]] | Off-box bare git mirror (remote mirror, Carbonite-covered) of Melange Systems; all branches+tags, hook auto-push since 2026-09-19 |
| [[moneyball-skill-library]] | Melange project skill library (16 built 2026-07, 20 by 2026-09-30); change-control = constitution; refreshed on main b7faf6344. |
| [[moneyball-workbook]] | Excel CU-influence model: 4-pillar percentile-rank blend over 533 members; now a VIEW of ranks_python.json (the rank authority). |
| [[moneyball-workbook-rules-scoring-and-sublayer-surgery]] | part: Standing rules of the Moneyball Blended workbook, the… |
| [[moneyball-workbook-lineage-and-june-audit]] | part: The Moneyball model lineage and files from 2026-06-18 to… |
| [[project-brain]] | Hardened brainctl external-brain kit (Desktop, own repo); melange brain boots via CLAUDE.md; nested brain repos with mirrors. |
| [[quant-model-evaluation-skill]] | General read-only skill for evaluating models, numbers and claims; merged to main c13f3a5d4 (2026-09-30); Melange gates in a binding. |
| [[sentinel-collectors]] | Sentinel press/hearing collectors and bill ingestion feeding the Melange workbook; promotion and scheduler re-enable are Paul-gated |
| [[staffer-live-sidecar]] | Local sidecar on 127.0.0.1:8841: people-only staffer graph, Dijkstra office routes, self-healing identity loop; Codex-built. |

### Related Concepts

- [[influence-vs-alignment-axes]] - Modeling principle: rank = INFLUENCE, per-category stance = ALIGNMENT; two separate axes, underdogs surface in a separate efficiency view.
- [[fail-closed-gates]] - When a check cannot be satisfied, the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call.
- [[live-tree-patch-discipline]] - The Melange live tree changes only through one line-wise patch cut with fec/tools/live_patch.py and applied with core.autocrlf=false; never check out or merge into LIVE, and APPLY is Paul's.
- [[gold-set-validation]] - A measure is trusted only after it scores against a fixed, independently labelled, owner-ruled gold set that the pipeline under test never sees.
- [[four-pillar-percentile-blend]] - The Moneyball rank is a weighted blend of four pillar percentile ranks (committee/influence, legislative, press, demographic); three weight sets are on record, only Paul ratifies one, and the live set is read where it is kept.
- [[settled-findings-stay-settled]] - A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, and is not re-litigated unless Paul reopens it.
- [[say-do-gate]] - A member is shown as Champion or Defender in a category only if the stated stance is backed by authored or original-cosponsored action there (Rule A cap); otherwise the cell displays Ally.
- [[zero-rank-delta-verification]] - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean
- [[two-hop-stance-decomposition]] - CU alignment = stance hop (speaker to target) x valence hop (target to CUs); the ceiling is the valence hop, fixed by a curated registry
- [[concurrent-service-overlap-edge-rule]] - Staffer social-network edge rule: a person-person edge needs real concurrent service in one container; sequence is trajectory, not an edge.
- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model

### Discussions

- [[2026-07-27-acu-outline-north-star-rulings]] - Paul's 2026-07-27 rulings: ACU Search Outline docx is the 19-category review north star; letters mandatory; amendments count half
- [[2026-07-30-coalition-builder-redesign-session]] - 2026-07-30 design session: static-substrate/dynamic-eval verdict, 8 positions with critic verdicts, merge-main precondition
- [[2026-09-03-staffer-network-architecture]] - Paul's 2026-09-03 ant-colony ruling: staffer network = own social network beneath members; member graph kept; OVERLAP is the only edge rule.
- [[2026-09-06-staffer-sorting-rulings]] - Paul's nine 2026-09-06 staffer sorting rulings: name standard + spine re-key, Groups tab, LDA plain labels, git lifted for this lane.

### Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.
