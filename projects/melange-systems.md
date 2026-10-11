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
  - "Workbook write collisions: a parallel 'other session' writing the same workbook once reverted a committee-fix COM write; workbook edits must be sequenced with other sessions (COM-era rule, as the Blockers section notes: the COM write path was retired on 2026-07-02/03 by Phase 2's NO COM anywhere; whether non-COM workbook writes still need sequencing is not recorded)"
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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/people-network-route-latency-lane-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\people-network-route-latency-lane-2026-10-02.md", sha256: "a8b23c592aa5a712c63c4cb8c3f20e85fd6a62f588f7459770fb0a71f1056656"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# Melange Systems (Moneyball CU-influence model)

> Moneyball (visible name Melange) is a credit-union legislative-influence model and dashboard over the 533 members of Congress: one deliverable, `Melange Systems/Moneyball.html`, generated from the Blended workbook by a Python pipeline. Alias "Draft Systems" (predecessor root): the project began in Draft Systems and its code root there is the actor [[draft-systems-r-pipeline]].

## Parts

- [[2026-06-feature-melange-model-facts]] — Melange model facts: the regeneration pipeline, the Blended Model and its pillar decisions, and the member desk and SNA features as recorded in June 2026, with the three pillar-weight sets of 2026-06-29 (historical), 2026-07-07 (last ratified) and 2026-09-03 (live but unratified).
- [[2026-06-feature-melange-scenario-model-build]] — The Melange scenario model build of 2026-06-26: the source timeline, the pre-flight pass, the budget what-if tool, the electoral model, money response and pathfinding, the step-3 finish with the reorg, the scenario runner, flip channels and the diminishing-returns reconciliation.
- [[2026-06-troubleshooting-melange-model-audits]] — The Melange model audits of 2026-06-26: the brutal internal audit, two independent adversarial audits with their fixes, and the FEC data-quality assessment with the HIGH-3 reversal.

## Overview

- **What it is:** a credit-union (CU) legislative-influence dashboard. ONE deliverable: `Melange Systems/Moneyball.html` (SNA cosponsorship network + per-member "member desk", dark theme, merged by `make_combined.py`). The map of every file, the pipeline and the live config lives in **`Melange Systems/INDEX.md`**: read it first.
- **Source of truth:** `Moneyball Main Version - Blended.xlsx` (see [[moneyball-workbook]]). Everything is regenerated from it after any workbook change.
- **Scope of the 533:** the clean 533-member set is used everywhere (member-set consistency verified 2026-06-26: 533 in all files; archive_leg covers 511, 22 members have no bills).
- **Naming:** visible text is "Melange"; the `Moneyball.html` / `Moneyball Dashboard.html` file names stayed Moneyball (later ruling recorded in [[2026-06-feature-melange-dashboard-ui-evolution]]).
- **Provenance of the home:** June 2026 work ran in `Draft Systems` (R scrapers plus the Excel model). On 2026-06-26 the canonical home was reorganized to `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\` (see Reorg in [[2026-06-feature-melange-scenario-model-build]]); `Draft Systems` was left intact because it holds irreplaceable raw data and models.

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

## Open items from audits (consolidated)

M1, M2, M3, M4 (pushed), M5, L4 (see the list in [[2026-06-troubleshooting-melange-model-audits]]); MEDIUM-1, LOW-1, LOW-3, LOW-4 (documented, low); the replace/contest plays' aggregate D lean (about 30D/14R) optics question; step 3 items "incremental D* Lite replanning" and "live Moneyball-sheet tab" beyond the sheet_sync fingerprint diff; the scenario runner is one-shot.

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
| [[2026-06-feature-cosponsor-and-sector-networks-june-network-plan]] | part: The June 2026 co-sponsor network plan of 06-25/26… |
| [[2026-06-feature-cosponsor-and-sector-networks-layer-toggles-and-configs]] | part: Network layer toggles with the signed reference and… |
| [[2026-06-feature-cosponsor-and-sector-networks-sector-networks]] | part: The bank_reg and crypto sector networks of 2026-08-18/19… |
| [[2026-06-feature-cosponsor-and-sector-networks-member-relationships]] | part: The member personal relationships model lane of 2026-09-10… |
| [[2026-06-feature-cu-stance-and-sentiment]] | Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels |
| [[2026-06-feature-cu-stance-and-sentiment-stance-stack-design-and-accuracy]] | part: How the CU stance stack was designed and made accurate… |
| [[2026-06-feature-cu-stance-and-sentiment-june-stage5-template-and-cfpb-split]] | part: June 2026 stance work: the labeling template and re-run… |
| [[2026-06-feature-cu-stance-and-sentiment-july-recorrection-channels-incidents]] | part: CU sentiment work of 2026-07-15/16: the CFPB sentiment… |
| [[2026-06-feature-cu-stance-and-sentiment-press-and-social-display]] | part: Press and social display of 2026-07-19: graded press and… |
| [[2026-06-feature-melange-dashboard-ui-evolution]] | Melange dashboard UI history: capstone, member desk, retheme, simplification, plain-language pass, Members Section lane. |
| [[2026-06-feature-melange-dashboard-ui-evolution-capstone-to-desk-media]] | part: Dashboard UI from the June 2026 capstone and member desk… |
| [[2026-06-feature-melange-dashboard-ui-evolution-august-redesigns]] | part: Dashboard UI in August 2026: the industry-tab round 2, the… |
| [[2026-06-feature-melange-dashboard-ui-evolution-plain-language-and-fixes]] | part: The plain-language pass of 2026-08-31 to 09-01 with Paul's… |
| [[2026-06-feature-melange-dashboard-ui-evolution-members-section-lane]] | part: The Members Section consistency lane of 2026-09-14 to… |
| [[2026-06-feature-moneyball-excel-model-build]] | June 2026 build of the 533-member Moneyball workbook: four buckets, percentile-rank blend, calibration, scenario tooling |
| [[2026-06-feature-moneyball-excel-model-build-lineage-and-phases]] | part: Workbook lineage and file inventory and the June 2026… |
| [[2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits]] | part: Scoring refinements of 2026-06-24/25: press raw alignment… |
| [[2026-06-feature-moneyball-excel-model-build-category-stance-3d]] | part: The Category Stance 3D sheet of the Moneyball workbook… |
| [[2026-06-feature-moneyball-excel-model-build-scenario-tools-and-calibration]] | part: The scenario tools of 2026-06-26/27: the pre-flight audit… |
| [[2026-06-working-agreement-change-control-and-decision-authority]] | Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code. |
| [[2026-07-feature-agent-tooling-stack]] | Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap. |
| [[2026-07-feature-agent-tooling-stack-codex-executor-lane]] | part: The Codex executor lane record: how Claude and Codex were… |
| [[2026-07-feature-agent-tooling-stack-quant-model-evaluation-lane]] | part: The quant-model-evaluation skill lane of 2026-09-30 to… |
| [[2026-07-feature-agent-tooling-stack-skill-library-lane]] | part: The Moneyball skill library: how the repo skills were… |
| [[2026-07-feature-agent-tooling-stack-runpod-sessions]] | part: Running Claude sessions on the RunPod pod: Paul's rulings… |
| [[2026-07-feature-agent-tooling-stack-higgsfield-account-trap]] | part: The Higgsfield connector account trap: the connector bound… |
| [[2026-07-feature-agent-tooling-stack-project-brain-toolkit]] | part: The Project Brain toolkit: durable per-project memory for… |
| [[2026-07-feature-agent-tooling-stack-glass-box-lock-hang]] | part: The GLASS BOX lane-lock hang that blocked metaloop starts… |
| [[2026-07-feature-audio-and-speech-lane]] | Speech/audio lane: no shipped ASR, off-chain fail-closed, N audio route closed; audio layers complementary; four false mechanism claims. |
| [[2026-07-feature-audio-and-speech-lane-july-foundations]] | part: The July 2026 audio foundations: speaker verification and… |
| [[2026-07-feature-audio-and-speech-lane-n-audio-route-and-measurements]] | part: The N audio route of 2026-08-21 to 08-25 from the ES… |
| [[2026-07-feature-audio-and-speech-lane-complementary-layers-and-lessons]] | part: The complementary layers lane of 2026-09-07 and its… |
| [[2026-07-feature-audio-and-speech-lane-corpus-data-guide]] | part: How to read the Congress speech and audio corpus as of… |
| [[2026-07-feature-data-collection-lanes]] | Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills |
| [[2026-07-feature-data-collection-lanes-collection-scope]] | part: Melange data-collection scope: the corpus coverage census… |
| [[2026-07-feature-data-collection-lanes-lobbyview-org-mentions-and-efficiency]] | part: The LobbyView lane of 2026-08-07/08: the org-mentions… |
| [[2026-07-feature-data-collection-lanes-lobbyview-lda-rebuild-and-bridge]] | part: The LobbyView lane of 2026-07-31 to 08-01: the positions… |
| [[2026-07-feature-data-collection-lanes-lobbyview-looks-and-scale-upgrade]] | part: The LobbyView lane of 2026-08-05/06: the five-lane pass… |
| [[2026-07-feature-data-collection-lanes-contact-inference]] | part: The contact-inference extraction lane of 2026-08-28/29… |
| [[2026-07-feature-data-collection-lanes-sentinel-lanes]] | part: The September 2026 sentinel lanes: the press and hearing… |
| [[2026-07-feature-data-collection-lanes-contact-inference-design-and-evaluation]] | part: The design and the evaluation plan for a… |
| [[2026-07-feature-influence-engine-internals]] | July 2026 influence-engine layers: salience/SNA, receptivity (PERSONA_W 0.30), GATE-2 and say-do gate, sub-layer fix, coalition builder |
| [[2026-07-feature-influence-engine-internals-salience-sna-wave]] | part: The six-paper salience and press-SNA wave of 2026-07-01 in… |
| [[2026-07-feature-influence-engine-internals-receptivity-layer]] | part: The receptivity layer of the influence engine (2026-07-02… |
| [[2026-07-feature-influence-engine-internals-gate2-and-say-do]] | part: GATE-2 of 2026-07-07/08 in the influence engine, the C… |
| [[2026-07-feature-influence-engine-internals-chatgpt-lane-and-sublayer-surgery]] | part: The ChatGPT laundry-list lane landing of 2026-07-16 and… |
| [[2026-07-feature-influence-engine-internals-coalition-builder]] | part: The coalition-builder redesign and implementation of… |
| [[2026-07-feature-influence-engine-internals-competitiveness-multiplier]] | part: The competitiveness multiplier lane of 2026-10-05 to 10-07:… |
| [[2026-07-feature-legislative-pillar-acu-review]] | Legislative pillar of Melange: legfix history, legfix5 19-category ACU review, effectiveness shadow lane, lobbying forecast |
| [[2026-07-feature-legislative-pillar-acu-review-letters-and-legfix-1-4]] | part: The legislative pillar from 2026-07-17 to 07-25… |
| [[2026-07-feature-legislative-pillar-acu-review-legfix5-full-text-and-culling]] | part: legfix5 of 2026-07-27: the six-year full-text collection… |
| [[2026-07-feature-legislative-pillar-acu-review-effectiveness-shadow-lane]] | part: The legislative-effectiveness shadow lane of 2026-09-10 to… |
| [[2026-07-feature-legislative-pillar-acu-review-cosponsor-forecaster]] | part: The bill-lobbying regression lane of 2026-09-04: Paul's… |
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
| [[2026-07-feature-primacy-and-industry-tier-boards-telecom-industry]] | part: The telecom lane of 2026-10-07: a telecom vs credit-union… |
| [[2026-07-rfc-melange-architecture-system-of-record]] | Melange refactor, Phase 2 inversion (ranks_python.json authority, NO COM), REORG @a05a8e4, config, manifest mechanics |
| [[2026-07-rfc-melange-architecture-system-of-record-refactor-and-inversion]] | part: The July 2026 refactor and the inversion of the system of… |
| [[2026-07-rfc-melange-architecture-system-of-record-model-config-and-committee-formula]] | part: The final Moneyball model configuration as of 2026-06-30… |
| [[2026-07-rfc-melange-architecture-system-of-record-reorg-and-manifest]] | part: The REORG phases, tripwires and lessons of 2026-08-04/05… |
| [[2026-07-troubleshooting-melange-audits-and-reviews]] | Melange audit runs, guardrails, 09-13 five-lane code review, hallucination framework (D-007), provenance census, laundry-list close-out |
| [[2026-07-troubleshooting-melange-audits-and-reviews-guardrails]] | part: Guardrails for any autonomous Melange audit or review run… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-1-3]] | part: The Melange audit runs of 2026-07-01 to 07-03: run 1, run… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-july-runs-4-5-and-integrity]] | part: The Melange audit runs of 2026-07-04 to 07-10: run 4, runs… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-data-integrity-and-provenance]] | part: The data-integrity audit of 2026-07-01 on the bills… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-later-reviews]] | part: Melange reviews of August and September 2026: the… |
| [[2026-07-troubleshooting-melange-audits-and-reviews-security-baseline]] | part: The read-only security audit of the Melange and Mentat… |
| [[2026-07-troubleshooting-melange-live-tree-git-drift]] | Melange live tree vs git: branch drift, live-only files, 35-commit reconcile, EOL census, live_patch.py cutter, off-box mirror |
| [[2026-07-troubleshooting-melange-live-tree-git-drift-branch-state-and-mirror]] | part: The off-box git mirror of the Melange repository and the… |
| [[2026-07-troubleshooting-melange-live-tree-git-drift-drift-reconcile-eol]] | part: Committed versus live drift of 2026-09-13, the reconcile… |
| [[2026-08-incident-refresh-automation-reliability]] | Weekly Melange refresh has not completed since 2026-07-19; audit, rulings, tick-runner redesign, daily-chain blockers, Codex poll-loop burn |
| [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]] | part: The weekly Melange refresh as of 2026-09-19: measured… |
| [[2026-08-incident-refresh-automation-reliability-daily-refresh-closeout-and-flakes]] | part: The daily congress refresh close-out of 2026-09-19 and the… |
| [[2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn]] | part: The Codex overnight poll-loop burn of 2026-09-12/13 as… |
| [[2026-08-incident-workstation-disk-and-backup]] | C: filled by repo worktrees, cleared repeatedly (185.9 GB free on 2026-09-18); OneDrive stalled since 08-11; backup gaps |
| [[2026-08-incident-workstation-disk-and-backup-backup-gap-and-census]] | part: The workstation backup coverage gap measured on 2026-09-07… |
| [[2026-08-incident-workstation-disk-and-backup-clearances-and-retirements]] | part: The disk clearances and worktree retirements of 2026-09-11… |
| [[2026-09-feature-cosponsor-first-signature-forecast-experiments]] | The 2026-09-05 research series that forecast which of 377 continuing members would make a first… |
| [[2026-09-feature-staffer-network-data-and-math]] | Staffer network lane 2026-09-01..08: adjudication, architecture, math audit, sorting rulings, clique fix, v7 spine and v6 ship. |
| [[2026-09-feature-staffer-network-data-and-math-tenure-adjudication-and-architecture]] | part: The employment-tenure data adjudication of 2026-09-01 to… |
| [[2026-09-feature-staffer-network-data-and-math-sorting-lane]] | part: The staffer sorting lane of 2026-09-06 to 09-08: its… |
| [[2026-09-feature-staffer-network-data-and-math-sna-math-and-clique-lane]] | part: The SNA math audit of 2026-09-05 and the co-tenure clique… |
| [[2026-09-feature-staffer-network-data-and-math-stale-imports-and-v7-spine]] | part: The stale-imports lane of 2026-09-06 and the closeout of… |
| [[2026-09-feature-staffer-network-data-and-math-duration-ranking-and-v8-cutover]] | part: The staffer co-tenure ranking contract implemented and… |
| [[2026-09-feature-staffer-network-data-and-math-successor-design-and-release-gates]] | part: The 2026-09-08 successor design for the staffer network… |
| [[2026-09-feature-staffer-network-surfaces]] | Staffer network surfaces: live sidecar on 8841, fourth Moneyball.html surface (#app-staffer), page redesign variant C, route-latency lane. |
| [[2026-09-feature-ui-redesign-boards]] | Sept 2026 redesign: Higgsfield boards for Mentat and Melange, overlay-first builds, finalize/reconcile rounds, graph quirks. |
| [[2026-09-feature-ui-redesign-boards-melange-boards-and-build]] | part: The Melange dashboard redesign boards of 2026-09-22 and… |
| [[2026-09-feature-ui-redesign-boards-finalize-reconcile-graph-quirks]] | part: The UI finalize after the reboot (2026-09-23 to 09-25)… |
| [[2026-06-feature-melange-model-facts]] | part: Melange model facts: the regeneration pipeline, the… |
| [[2026-06-feature-melange-scenario-model-build]] | part: The Melange scenario model build of 2026-06-26: the source… |
| [[2026-06-troubleshooting-melange-model-audits]] | part: The Melange model audits of 2026-06-26: the brutal… |

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
| [[melange-dashboard-artifact-family-and-surfaces]] | part: The Melange dashboard artifact family and its surfaces… |
| [[melange-dashboard-preview-and-desk-rules]] | part: The dashboard preview and verification workflow, the desk… |
| [[melange-dashboard-june-capstone]] | part: The June 2026 capstone dashboard spec and engine of… |
| [[melange-dashboard-v2-redesign-overlay]] | part: The v2 redesign overlay of the Melange dashboard and its… |
| [[melange-fec-pipeline]] | Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch |
| [[melange-fec-pipeline-architecture]] | part: Architecture of the Melange fec/ pipeline: paths and the… |
| [[melange-fec-pipeline-reorganization]] | part: The REORG of the Melange fec/ pipeline, completed at… |
| [[melange-fec-pipeline-live-tree-drift-and-eol]] | part: Live tree versus committed tree drift of the fec/… |
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
- [[live-tree-patch-discipline]] - Changes to a drifted Melange live tree go in as one line-wise patch cut against LIVE bytes with fec/tools/live_patch.py, applied with core.autocrlf=false, never normalising LIVE: no merge or checkout (D-060); applying needs Paul's go.
- [[gold-set-validation]] - A measure earns trust by scoring against a fixed, independently labelled, owner-ruled gold set held out from the pipeline under test.
- [[four-pillar-percentile-blend]] - The Moneyball rank is a weighted blend of four pillar scores (committee/influence, legislative, press, demographic), built as percentile ranks on 2026-06-25, with the committee/influence pillar moved to raw/max on 2026-06-30 and press to signed raw/max on 2026-07-01; resolution 3 records three weight sets (historical, last ratified, live but unratified), only Paul ratifies one, and the live set is read where it is kept.
- [[settled-findings-stay-settled]] - A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, and is not re-litigated unless Paul reopens it or new evidence meets the reopen condition recorded with the settlement.
- [[say-do-gate]] - A Champion or Defender cell in the category-stance matrix stands only if the stated stance is backed by a recorded action there: an authored or original-cosponsored bill (Path A) or a CU-aligned final-passage vote (Path V); otherwise Ally.
- [[zero-rank-delta-verification]] - Behavior-preserving changes must leave ranks_python.json byte-identical: kernel tests, full chain, rank delta ZERO, audit clean
- [[two-hop-stance-decomposition]] - CU alignment = stance hop (speaker to target) x valence hop (target to CUs); the ceiling is the valence hop, fixed by a curated registry
- [[concurrent-service-overlap-edge-rule]] - Staffer social-network edge rule: a person-person edge needs real concurrent service in one container; sequence is trajectory, not an edge.
- [[single-look-holdout-discipline]] - A holdout or optimization look is spent once: pre-register the gate, never re-run a consumed look, never burn a holdout on a dead model
- [[single-look-holdout-discipline-look-ledger]] - part: Dated ledger of the looks and holdout uses that the…
- [[single-look-holdout-discipline-case-1-moneyball-gate2]] - part: Case 1 of the single-look discipline, the Moneyball…
- [[single-look-holdout-discipline-cases-2-3-n-slot-and-gold-template]] - part: Cases 2 and 3 of the single-look discipline: the N-slot…
- [[single-look-holdout-discipline-cases-4-5-luna-and-pac]] - part: Cases 4 and 5 of the single-look discipline: the Luna…
- [[stance-pipeline-integrity-contract]] - The 2026-07-15 production contract for Melange stance labels: one fixed ten-band scale for every domain, bounded exceptional rounding, General CU allocation, the A/V say-do rule, fail-closed identity joins and regeneration checks.
- [[demographic-potential-method]] - The district and state market score behind the desk's Demographic Potential label: v2.1 growth room (2026-07-25 doc, eight judgmental weights), replaced as default on 2026-09-16 by v3.0 credit-union footprint.
- [[behavior-qualified-recognition]] - Recognition labels: rule-G field honors from signed accepted actions (default since 2026-09-16) and a primacy-board standing whose top 13 with qualifying action hold the Champion crown; desk and dashboard show the analytic overall band.
- [[boot-protocol-evaluation-framework]] - The governing (v2, 2026-08-11) framework for the Project Brain external-memory protocol: entry schemas, supersession, staleness and compaction rules, a per-session scorecard, four integrity audits and pre-committed kill criteria.

### Discussions

- [[2026-07-27-acu-outline-north-star-rulings]] - Paul's 2026-07-27 rulings: ACU Search Outline docx is the 19-category review north star; letters mandatory; amendments count half
- [[2026-07-30-coalition-builder-redesign-session]] - 2026-07-30 design session: static-substrate/dynamic-eval verdict, 8 positions with critic verdicts, merge-main precondition
- [[2026-08-29-politico-pro-access-and-permission-rulings]] - Two 2026-08-29 records on the Politico Pro staff directory: a terms-based ruling prohibited automated extraction; a supplement on Paul's attested permission letter authorized a rate-limited, contact-free crawl, kept off for canonical use.
- [[2026-09-03-staffer-network-architecture]] - Paul's 2026-09-03 ant-colony ruling: staffer network = own social network beneath members; member graph kept; OVERLAP is the only edge rule.
- [[2026-09-06-staffer-sorting-rulings]] - Paul's nine 2026-09-06 staffer sorting rulings: name standard + spine re-key, Groups tab, LDA plain labels, git lifted for this lane.
- [[2026-09-08-staffer-spine-identity-adjudication]] - The 2026-09-08 adjudication, on Paul's instruction, of the staffer spine identity audit: bounded name repairs plus a fail-closed merge guard instead of automatic merging; title matches are review candidates only; v8 spine verified 50/50.
- [[2026-09-20-primacy-diagnostic-adoption]] - Paul ratified the primacy diagnostic CLASS_DOCK_PRESS_GRADE_ALL with within-chamber seating on 2026-09-20: a beneficiary-weighted legislative grade and CU-weighted press from a fixed 7,413-item ledger; PRIMACY_METHOD=legacy rolls it back.

### Related Projects

- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.

## Research evidence

The literature behind this system lives in the research vault: [[research-vault]]. Evidence hubs: [moneyball-rank-pillars](obsidian://open?vault=research&file=systems%2Fmoneyball-rank-pillars) · [melange-influence-engine](obsidian://open?vault=research&file=systems%2Fmelange-influence-engine) · [melange-pathfinding](obsidian://open?vault=research&file=systems%2Fmelange-pathfinding) · [melange-sna](obsidian://open?vault=research&file=systems%2Fmelange-sna) · [melange-allocation](obsidian://open?vault=research&file=systems%2Fmelange-allocation) · [melange-stance](obsidian://open?vault=research&file=systems%2Fmelange-stance) · [melange-psychometrics](obsidian://open?vault=research&file=systems%2Fmelange-psychometrics) · [melange-lobbying](obsidian://open?vault=research&file=systems%2Fmelange-lobbying).
