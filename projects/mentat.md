---
type: project
name: "Mentat (FEC contributions intelligence)"
aliases: ["Mentat project", "FEC contributions intelligence"]
description: "Mentat: R+API pipeline collecting FEC contributions for a Paul-defined company roster across industries (Banking, Crypto, Fintech, P&C, Farmers, Telecom, Credit Union, Community Banks, Credit Arms, trade associations) into workbooks, plus a local Python console (Chart Studio, Graph, Insights, PAC evidence panes and district map). Pushed to GitHub branch claude/mentat-migration-onto-main (PR opened and merged 2026-10-03). Money/receipt-counting code is frozen by Paul's ruling."
status: "active"
deadline: ""
progress: "Pipeline shipped (7 industries ready; workbooks built and rebuilt); console, Chart Studio and PAC-evidence lanes ongoing; live tree pushed to GitHub branch claude/mentat-migration-onto-main (tip 28c27a47) on 2026-10-02/03, then opened as Melange PR #2 and merged 2026-10-03 at Paul's request (merge commit 54433266); v5 corrected Fintech workbook awaits Paul's deploy call."
blockers:
  - "Resolved 2026-10-03 (was: PR to main unopened; gh is NOT installed and Claude in Chrome was not connected, so Paul must open it or connect Chrome; Paul deferred: 'we can do it later'): Paul signed in to GitHub in the built-in browser, the PR was opened there as Melange PR #2 and merged at his request."
  - "Full local history is unpublishable as-is: origin main shares NO history with the local repo and the local history has 28 blobs over 100 MB under audits/legfix5; publishing needs filter-repo or LFS, and a history rewrite is Paul's decision. Correction 2026-10-18 (ledger D-167, 2026-10-11): closed; local history is never pushed and source reaches GitHub only as history-free exports."
  - "Telecom workbook blocked by a V8 string cap (payload 591,338,574 bytes vs max string 536,870,888) until the export is made cycle-aware (as of 2026-07-27)."
  - "Roster-identity and alias calls (acronym-variant collisions, FCU-variant expansion, 63 proposed aliases) need Paul's yes under his strict-names rule."
action_items:
  - description: "Offer to open the PR (base claude/melange-math-eval-skill-18e907) for branch claude/mentat-migration-onto-main; regenerate the body from the commit messages if pr-body.md is gone. Done 2026-10-03: opened as Melange PR #2 and merged at Paul's request (merge commit 54433266)."
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Decide whether to delete or keep the partial ref claude/mentat-github-migration-b06195 on origin (6f76c3415, 548 commits). Done 2026-10-03: deleted on origin at Paul's request; still kept as a local branch and on remote mirror."
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Decide whether to publish the full local history (needs filter-repo or LFS for 28 blobs over 100 MB under audits/legfix5; history rewrite is Paul's call); closed 2026-10-11 by D-167, which keeps local history unpublished"
    status: "done"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Deploy call on v5 corrected Fintech workbook in mentat/.cache/bench-20260723-output (data, not git)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Yes/no on FCU-variant expansion and proposed_new_aliases.csv (63 items, $5.97M evidence) under the strict-names rule"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
  - description: "Policy call on the pagination-shortfall guard (rejects the whole unit on a 1-row shortfall; 12 ca units uncollected)"
    status: "todo"
    deadline: ""
    owner: "[[paul-goff]]"
focal_points:
  - "[[paul-goff]]"
related_topics:
  - "[[2026-06-working-agreement-change-control-and-decision-authority]]"
  - "[[2026-07-bugfix-mentat-collection-and-attribution]]"
  - "2026-09-feature-forecast-giving-redesign"
  - "[[2026-09-feature-mentat-console-ui]]"
  - "[[2026-09-feature-mentat-failings-pac-evidence]]"
  - "[[2026-09-feature-sector-growth-study]]"
  - "2026-09-feature-ui-redesign-boards"
  - "[[2026-09-troubleshooting-mentat-repo-state-and-workbooks]]"
related_actors:
  - "[[mentat-console]]"
  - "[[mentat-fec-pipeline]]"
  - "[[runpod-pod]]"
related_teams: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-github-migration-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-github-migration-2026-10-02.md", sha256: "17257cc0da77ca1ef08b574851ed88d92f6435ea7c07e452d2235ba48b3e66cc"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-pipeline-2026-07-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-pipeline-2026-07-18.md", sha256: "f07cac2aa2afe08f016bfa228378c23eecb8737ad19d2d8c0e5ce82e22e7290a"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/mentat-downstream-architecture-first-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-30", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\mentat-downstream-architecture-first-2026-10-15.md", sha256: "6764cb8e21a36899a2bd6884e4c29c1b3bd921efea86940e85ada11ff5eb69cd"}
updated_at: 2026-10-30
updated_by: "preserve@agent"
tags: ["type/project", "status/active", "domain/data"]
---

# Mentat (FEC contributions intelligence)

> [!danger] Mandatory desktop release gate — 2026-10-22
> Before any Windows release or update, apply [[mandatory-desktop-release-signing]]. Every application-owned native binary must use the approved publisher certificate; verify the complete final installer payload and distributed SHA-256. Missing, invalid or unexpected signatures block publication.

> Paul's FEC contributions-intelligence project: an R+API collection pipeline for a Paul-defined company roster, workbook generation, and a local Python console (Chart Studio, Graph, Insights, PAC evidence panes, district map). Distinct from Moneyball/Melange. Money and receipt-counting code is frozen by Paul's ruling.

Dated correction (2026-10-04, fleeting pass; source `mentat-github-migration-2026-10-02`): the "(PR unopened)" in this note's description predates 2026-10-03, when the PR was opened (Melange PR #2) and merged at Paul's request; see GitHub migration.

## Overview

- **What it is:** an R pipeline (originally headless-Chrome scraping, superseded for scale by the OpenFEC API lane) collecting fec.gov individual contributions by employer for a roster of companies Paul lists, classifying donors (Chiefs / Middle / Employees) and recipients (company PAC, trade association, leadership PAC, Super PAC, Carey +/- lean), then producing quarter-over-quarter Excel analysis. Industries: Crypto, Credit Union, Community Banks, P&C Insurance, Credit Arms (the original 5), Telecom (separate workbook), Fintech (added 2026-07-23), plus Banking, Farmers and trade-association views in later work. Roster-driven industry discovery found 7 industries including Fintech, all ready (2026-07-23).
- **Where it lives:** `C:\Users\pgoff\Mentat` (branch `codex/mentat-crypto`; code in `C:\Users\pgoff\Mentat\mentat`, console in `C:\Users\pgoff\Mentat\mentat\app`). Deliverables under `C:\Users\pgoff\Mentat\reports`. Master DB: `C:\Users\pgoff\AppData\Local\Mentat\master\mentat.db` (306k rows at 2026-07-20). The Claude-app container redirect for the DB of the first crypto run: `C:\Users\pgoff\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Local\Mentat` (Paul's RStudio runs get real AppData). Rscript needs `R_LIBS_USER=C:/Users/pgoff/AppData/Local/R/win-library/4.6`; R = `C:\Program Files\R\R-4.6.0\bin\Rscript.exe` (not on bash PATH).
- **Systems:** collection and report generation are [[mentat-fec-pipeline]]; the local web console is [[mentat-console]]; the RunPod math pod ([[runpod-pod]]) is linked to this project in the vault but none of the Mentat sources assigned here describe a role for it.
- **Owner and sole decision-maker:** [[paul-goff]]. Standing rules: the roster is ONLY the companies he lists; raw sheets show every FEC row; money-collection and receipt-counting code is never changed on inference ("The mentat money collection system is fucking perfect, don't change it", 2026-09-27); changes need his explicit per-change approval, see [[2026-06-working-agreement-change-control-and-decision-authority]].
- **Sibling projects:** [[melange-systems]] (Moneyball CU-influence model; Mentat is distinct from it and has zero path overlap, all 65 merged files are `mentat/`-scoped) and [[forecast-redesign]] (Mentat giving forecasts).

## Status

| Field | Value |
|---|---|
| Status | active |
| Deadline | none recorded |
| Progress | Pipeline shipped and repeatedly rebuilt; console and PAC-evidence lanes ongoing; GitHub push of the live tree done 2026-10-02/03; PR to main opened and merged 2026-10-03 (Melange PR #2). |

**Current state.** As of 2026-10-25, Mentat desktop 1.0.17 is the Latest desktop release (published 2026-10-25, sequence 11), built from the Mentat source main. Mentat 1.0.16 and 1.0.14 (both 2026-10-22) preceded it. Source publication: the first Mentat repository publish PR (merged 2026-10-19) and the 1.0.6 desktop PR (merged 2026-10-20) are merged; the open Mentat PRs are the desktop workflow retirement and the invite-code access change. The sankey focus-zoom, unfold and pin commits are on the origin codex/mentat-crypto branch (confirmed as ancestors of the origin tip on 2026-10-25). The collector batch03 has been suspended since the 2026-10-15 ruling; no record of resumption was found, and the live process was not checked. The downstream collector release commits are in history, but the restart-order ruling is still open.

**Keep distinct.** The 2026-10-03 "PR #2 merged" entries in this note refer to the Melange repository's migration PR, not to the Mentat repository's PR #2 (which is the 1.0.6 desktop PR, merged 2026-10-20). Do not merge the two.

> **Convention:** The project status reflects a management decision. The action items below help infer the actual state, but do not derive the status automatically. Examples: if all items are `done`, the project is likely `completed`; if any item is `blocked`, consider updating the project status to `blocked`.

## Action Items

| Item | Status | Deadline | Owner |
|---|---|---|---|
| Offer to open the PR (base claude/melange-math-eval-skill-18e907) for claude/mentat-migration-onto-main (done 2026-10-03: PR #2 opened and merged) | done | | [[paul-goff]] |
| Delete or keep partial ref claude/mentat-github-migration-b06195 on origin (done 2026-10-03: deleted on origin; kept locally and on mirror) | done | | [[paul-goff]] |
| Decide on publishing full local history (filter-repo or LFS) | done (2026-10-11, D-167) | | [[paul-goff]] |
| Deploy call on v5 corrected Fintech workbook (.cache/bench-20260723-output) | todo | | [[paul-goff]] |
| Yes/no on FCU-variant expansion and 63 proposed aliases | todo | | [[paul-goff]] |
| Policy call on pagination-shortfall guard | todo | | [[paul-goff]] |

Correction 2026-10-18 (evidence: ledger D-167, 2026-10-11): closed. D-167 rules that source reaches GitHub only as history-free, source-only exports and that local history is never pushed, so the full local history is not published and no filter-repo or LFS rewrite is needed for it.

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

- ~~PR to main unopened (Paul deferred); `gh` is NOT installed and Claude in Chrome was not connected (2026-10-02/03).~~ Resolved 2026-10-03: Paul signed in to GitHub in the built-in browser, the PR was opened there (Melange PR #2) and merged at his request (merge commit `54433266`); `gh` is still not installed.
- Full local history unpublishable as-is (28 blobs over 100 MB under `audits/legfix5`; origin main shares no history with local); a history rewrite is Paul's decision.
  - Correction 2026-10-18 (evidence: ledger D-167, 2026-10-11): closed. D-167 rules that source reaches GitHub only as history-free, source-only exports and that local history is never pushed, so the full local history is not published and no filter-repo or LFS rewrite is needed for it.
- Telecom workbook: V8 512 MB string cap (as of 2026-07-27; no later source assigned here records it as resolved).
- Roster-identity calls awaiting Paul (alias collisions, FCU variants).

## GitHub migration (2026-10-02/03, source: `mentat-github-migration-2026-10-02`)

- On 2026-10-02/03 the live Mentat tree (`C:\Users\pgoff\Mentat\mentat`, plus `.claude/launch.mentat.json` and a vendored snapshot of `~/.claude/plugins` at `.claude/vendored-plugins`) was pushed to `github.com/pjg93-222/Melange` (private) on branch **`claude/mentat-migration-onto-main`**, tip `28c27a47`. It is 19 plumbing-built commits on origin's main `ce213058`. `mentat/state` is included. Files over 50 MB and `.cache` stay local, listed in `mentat/EXCLUDED_FROM_GIT.md`. Verification passed (file lists identical, blob spot-checks match, remote equals tip).
- **PENDING, Paul said "we can do it later":**
  - Open the PR (base `claude/melange-math-eval-skill-18e907`). `gh` is NOT installed and Claude in Chrome was not connected, so Paul must open it or connect Chrome. The body was drafted in the session scratchpad as `pr-body.md`, which may be gone; regenerate it from the commit messages if needed. Done 2026-10-03 (see the **Update 2026-10-03** bullet).
  - Delete or keep the partial ref `claude/mentat-github-migration-b06195` on origin (`6f76c3415`, 548 commits). Done 2026-10-03: deleted on origin.
  - Publishing full local history: origin main shares NO history with the local repo, and the local history has 28 blobs over 100 MB under `audits/legfix5`. Publishing would need filter-repo or LFS, and a history rewrite is Paul's decision.
- **Update 2026-10-03** (newer version of the source memory): the PR was opened from the built-in browser after Paul signed in to GitHub there (Melange PR #2) and merged at his request (merge commit `54433266`, the 19 commits kept). The head branch was then deleted on origin; at Paul's request so were `claude/melange-math-eval-skill-18e907-4d54uu` (backed up first to remote `mirror` as `backup/melange-math-eval-skill-18e907-4d54uu`, now its only copy) and the partial ref `claude/mentat-github-migration-b06195`. Still pending: publishing the full local history (Paul's decision). Details in the repo-state topic.
- **Why:** pushes of the full history 500'd (3 GB single merge `af1160dd8`). The Mentat-only branch on `ce213058` avoided both the size and the unrelated-history problems.
- **How to apply:** next session, offer to open the PR first. Never push from the worktree's own branch (it carries the oversized history). Pack files are read-only on Windows, so `Remove-Item` needs `-Force`. Related memory notes: `repo-mirror-2026-08-11`, `live-tree-eol-census-2026-09-19`. (The "offer to open the PR first" step is superseded: the PR was opened and merged on 2026-10-03.)
- Repo-state topic: [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]].

## Founding decisions (Paul, 2026-07-18)

- **Engine** = headless Chrome (chromote; NOT bulk files, NOT the API). He was offered both with volume math and chose the browser. (Later superseded in practice: on 2026-07-20 the API lane superseded Chrome-scrape for scale.)
- **Cycles** = 2021 onward (2021-22, 2023-24, 2025-26 partial).
- **527s and 501c's EXCLUDED.** The missing category workbook is at `C:\Users\pgoff\OneDrive\Documents\Super PAC, 527, Carey, 501c.xlsx` (sheets 2021-2022 / 2023-2024; View C/L/X = lean; x-marks = category; the "^J" in his link = mangled commas).
- **Output template:** `OneDrive\Documents\Credit Union Cross Industry Spending.xlsx`: sheet-per-industry raw extract `Name|Recipient|Date|Amount|(CSZ|Employer|Occupation)`. Its Crypto sheet holds **1,189 hand-extracted rows through 2026-05-31 = the ACCEPTANCE FIXTURE** (pipeline crypto output must reconcile against it before graduating). Sheet1 = industry asset denominators ($T, sourced) for cross-industry $/assets normalization; **"ABS issuers" ruled OUT of scope** (Paul 2026-07-18). Sheet2 CEO names feed the known-executives Chief-tier register.
- **Build order:** Phase 0 roster approval, then collector, then **Crypto first** (fixture reconciliation = graduation gate), then the other 4 industries, then Phase 3 after PAC-register approval, then 4-5. The spec had NO open questions left.
- **Roster rules (2026-07-19):** the roster is ONLY the companies he lists; raw sheets show every row, no culling. Detail in [[2026-07-bugfix-mentat-collection-and-attribution]].
- Spec: `mentat/MENTAT_SEQUENCING_v2.md` (melange-ticketing-module-2f8aad worktree, branch claude/pipeline-generation-review-89167f at the time, uncommitted). Source zip `Downloads/Mentat-20260718T072249Z-1-001.zip` has `Company Name.xlsx` (variant blocks; Crypto sheet = columns, others = rows; annotations are rules not search terms), 2 leadership-PAC CSVs (2021-22, 2023-24 only), `Trade Associations.docx`. 10 defaults adopted awaiting veto (roll-ups, match ladder, VP to Employees in banks quirk, View X = no lean, etc.), listed at the bottom of the spec doc.

## Timeline

| Date | Event |
|---|---|
| 2026-07-18 | Founding decisions above; R pipeline built (Codex draft ~3.4k lines via /codex lane after sandbox repair, then 5 Claude inline fixes); live crypto run reconciles 1,181/1,189 fixture rows (99.33%). Code+worktree at `C:\Users\pgoff\Mentat` (branch codex/mentat-crypto). |
| 2026-07-18 (evening) | Review + fix batch R1: 12-agent adversarial review, 26 findings, 7 majors confirmed; Codex dispatch #2 applied M1-M6. |
| 2026-07-19 | Roster and no-culling rules from Paul; zero-row scalar-assign crash class found. |
| 2026-07-20 | SHIPPED: "Mentat Master Workbook.xlsx" (5 industries, 655 sheets) + "Mentat Telecom Workbook.xlsx" (separate file by Paul's order, 123 sheets); alias-gap and PAC audit; 16,932 rows reclassified. |
| 2026-07-21/22 | Parallelism ceiling, worker-shard audit, phase-2 root causes, fleet halt; override registry and lineage reconciliation; version control of `AppData\Local\Mentat\bulk\` (@5299fc2). |
| 2026-07-23 | Fintech added (7 industries); Fintech ordeal diagnosed; perf round-2 at Paul's gate, then shipped and benchmark passed (V5 clean 18.33 min from-scratch Fintech e2e). |
| 2026-07-24 | Integrated to main: merge `@955b66a` (Paul: "The two unrelated branches, complete those, and integrate"). |
| 2026-07-27 | Full audit (six agents), R12 reconciliation, trade-association $0 defect solved. |
| 2026-09-09 | Worker-scaling lane. |
| 2026-09-13 to 2026-09-15 | System-debug lane: Chart Studio rebuild, usability lanes F/E/fix1, wording pass. |
| 2026-09-17/18 | Cross-reference council review; contradictions-not-ambiguity rework (`627300bc9`); collector slowdown root cause (truncated key `13ffe51ce05b`). |
| 2026-09-26/27 | Money-rule changes (`0ce240d9e`, `504d2cfd1`) reverted in `7a31f8ae2` after Paul's objection; money collection frozen. |
| 2026-10-02/03 | GitHub push of the live tree (branch claude/mentat-migration-onto-main, tip 28c27a47). |
| 2026-10-03 | Melange PR #2 opened and merged into claude/melange-math-eval-skill-18e907 (merge commit 54433266); the migration branch, claude/melange-math-eval-skill-18e907-4d54uu and the partial ref deleted on origin. |
| 2026-10-05 | PAC-to-candidate giving forecast accuracy, attempt 3 (all sectors, v6) built and scored once in the Mentat accuracy work (scratch tree outside the repo, HOLD); the handoff is `C:\Users\pgoff\OneDrive\Desktop\Mentat Complete Files\HANDOFF_PAC_ACCURACY_2026-10-05.md`; the program is [[forecast-redesign]]. A Mentat-side fix for the E18 PAC coverage gap is open, and money-collection code stays frozen. |
| 2026-10-26 | Desktop signing: installed application binaries are signed with the project's self-signed release certificate, and the workstation's application-control rule allows the apps only from the Downloads folder. The findings do not say which Mentat binaries are in the census; the dated update is in the signing contract, which this project already applies. |

Detailed per-lane history, numbers and traps: [[2026-07-bugfix-mentat-collection-and-attribution]].

## Related work areas (topics)

- Console UI: [[2026-09-feature-mentat-console-ui]]; failings lanes and PAC evidence: [[2026-09-feature-mentat-failings-pac-evidence]]; forecast and giving-view redesign: Forecast audit, giving-view redesign and PAC accuracy; sector growth study: [[2026-09-feature-sector-growth-study]]; UI redesign boards: UI redesign boards (Melange and Mentat); cross-reference review: [[2026-09-17-mentat-xref-council-review]].


## Focal Points

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner; sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Map

Every note of this project by type, one line each; parts follow their parent.

### Related Topics

| Topic | Relation |
|---|---|
| [[2026-06-working-agreement-change-control-and-decision-authority]] | Who decides: ask before unrequested or substantive changes; Paul owns weights, labels, exam scope, roster and Mentat money code. |
| [[2026-07-bugfix-mentat-collection-and-attribution]] | Mentat collection and attribution history, Jul-Sep 2026: audits, key outage, review bucket, xref rule, frozen money code. |
| [[2026-07-bugfix-mentat-collection-and-attribution-standing-rules]] | part: Paul's standing feedback rules for Mentat collection… |
| [[2026-07-bugfix-mentat-collection-and-attribution-july-build-and-ship]] | part: How the Mentat FEC pipeline was defined, built, reviewed… |
| [[2026-07-bugfix-mentat-collection-and-attribution-july-hardening]] | part: The July 2026 hardening of the Mentat pipeline (07-22/23)… |
| [[2026-07-bugfix-mentat-collection-and-attribution-audit-r12-trade-association]] | part: The six-agent Mentat audit of 2026-07-27, the R12… |
| [[2026-07-bugfix-mentat-collection-and-attribution-september-collector-lanes]] | part: The September 2026 Mentat collector lanes: worker scaling… |
| [[2026-07-bugfix-mentat-collection-and-attribution-cross-verification]] | part: The contradictions-not-ambiguity rule for Mentat… |
| [[2026-07-bugfix-mentat-collection-and-attribution-system-debug-lane]] | part: The Mentat system-debug lane of 2026-09-13 to 09-15: the… |
| Forecast audit, giving-view redesign and PAC accuracy | Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD). |
| [[2026-09-feature-mentat-console-ui]] | Mentat console UI lanes 2026-09-11..25: Chart Studio, clean-up, polish, load-time/FEC links, Graph and pie quirks. |
| [[2026-09-feature-mentat-console-ui-chart-studio]] | part: Chart Studio v1 on the Mentat console (2026-09-11), its… |
| [[2026-09-feature-mentat-console-ui-cleanup-and-polish]] | part: The Mentat console UI clean-up lane UI1 (2026-09-17) and… |
| [[2026-09-feature-mentat-console-ui-load-time-and-graph-quirks]] | part: The Mentat console load-time and FEC-link lane and the… |
| [[2026-09-feature-mentat-console-ui-figure-export-and-worksheet-cache]] | part: The Mentat console lane of 2026-10-08: one-click figure… |
| [[2026-09-feature-mentat-failings-pac-evidence]] | Mentat failings lanes S2-S8 (street columns, PAC evidence, industry addressing, URL scope, panes, categories, map) + PAC map audit. |
| [[2026-09-feature-mentat-failings-pac-evidence-street-columns-addressing-navigation]] | part: Mentat failings lanes S2, S4 and S5 of 2026-09-16/17… |
| [[2026-09-feature-mentat-failings-pac-evidence-pac-evidence-ingestion]] | part: Mentat failings lane S3 of 2026-09-16/17: ingesting PAC… |
| [[2026-09-feature-mentat-failings-pac-evidence-pac-evidence-readers]] | part: Mentat failings lanes S6 to S8 of 2026-09-17/18: the PAC… |
| [[2026-09-feature-mentat-failings-pac-evidence-pac-map-viz-lane]] | part: The PAC map downstream audit and visualisation lane of… |
| [[2026-09-feature-sector-growth-study]] | Sector growth vs political spending regression study on Mentat data: Paul's 25 Sep rulings, R pipeline, trend-first reporting |
| UI redesign boards (Melange and Mentat) | Sept 2026 redesign: Higgsfield boards for Mentat and Melange, overlay-first builds, finalize/reconcile rounds, graph quirks. |
| [[2026-09-feature-ui-redesign-boards-mentat-console-boards]] | part: The Mentat console redesign boards of 2026-09-21/22: two… |
| [[2026-09-troubleshooting-mentat-repo-state-and-workbooks]] | Mentat tree reconciled (273 dirty -> 36 commits), GitHub branch pushed (PR merged 2026-10-03), tidy Data workbook, console hang fix. |
| [[2026-10-feature-installer-free-desktop-zip-migration]] | Shared signed ZIP client with separate Mentat backend/profile; one-time migration, exact candidate and remaining acceptance gates. |

### Related Actors

| Actor | Relation |
|---|---|
| [[mentat-console]] | Local Python web console for Mentat: Chart Studio, Graph, Insights, PAC evidence and maps; Paul on 8806, read-only 8812. |
| [[mentat-console-chart-studio-and-system-debug]] | part: The Chart Studio tab of the Mentat console and the… |
| [[mentat-console-startup-and-polish-lanes]] | part: The Mentat console startup hang fix of 2026-09-18 and… |
| [[mentat-console-redesign-boards]] | part: The Mentat console redesign boards of 2026-09-21/22: the… |
| [[mentat-console-pac-map-viz-lane]] | part: The PAC map and downstream visualisation lane on the… |
| [[mentat-fec-pipeline]] | Mentat's R + Python FEC collector and Excel workbook builder (API pool over a DPAPI key store); 7 industries; code at C:\Users\pgoff\Mentat |
| [[mentat-fec-pipeline-key-stores]] | part: Where the Mentat FEC API keys are stored (the encrypted… |
| [[mentat-fec-pipeline-history-build-and-ship]] | part: History of the Mentat FEC pipeline from the 2026-07-18… |
| [[mentat-fec-pipeline-history-hardening]] | part: History of the Mentat FEC pipeline hardening on… |
| [[mentat-fec-pipeline-history-audit-r12]] | part: History of the six-agent audit of 2026-07-27, the… |
| [[mentat-fec-pipeline-history-september-lanes]] | part: History of the Mentat FEC pipeline lanes of September… |
| [[mentat-fec-pipeline-runbook]] | part: How the Mentat R pipeline is run and kept correct (README… |
| [[runpod-pod]] | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

### Related Concepts

- [[mandatory-desktop-release-signing]] — Required certificate, complete native signature census, preserved vendor signatures and verified final bytes before release.
- [[settled-findings-stay-settled]] - A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, and is not re-litigated unless Paul reopens it or new evidence meets the reopen condition recorded with the settlement.
- [[exclude-on-contradiction-not-ambiguity]] - Brain D-040: exclude a row only when its own evidence contradicts the attribution; missing or ambiguous info is flagged, not excluded.
- [[mentat-fec-accounting-methodology]] - Mentat's accounting standard (version 5, 2026-09-12): six steps from Define to Verify and report; original employee and corporate giving counted once, PAC outgoing separate; four accuracy measures, never one percentage.
- [[pac-cash-proportional-attribution]] - Mentat's rule for modeling company-funded PAC spending (2026-09-08): each payment takes the company's share of labeled cash just before it, transfers move balances instead of creating gifts, unverifiable inputs withhold it.
- [[contract-fixture-discipline]] - A shape crossing a lane or process boundary is fixed by one JSON example file every suite imports, asserted against every producer, with a negative control that must fail; prose is never a contract (brain DE-021).

### Discussions

- [[2026-09-17-mentat-xref-council-review]] - 2026-09-17 council: cross-reference does not minimise vs workbook (Banking $72.1M vs $54.8M); Paul ruled it redundant and kept it dwarfed.

### Related Projects

- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Research evidence

The literature behind this system lives in the research vault: [[research-vault]]. Evidence hubs: [mentat-fec-attribution](obsidian://open?vault=research&file=systems%2Fmentat-fec-attribution) · [mentat-giving-forecast](obsidian://open?vault=research&file=systems%2Fmentat-giving-forecast) · [mentat-sector-growth-study](obsidian://open?vault=research&file=systems%2Fmentat-sector-growth-study).

Update 2026-10-30: On 2026-10-15 Paul put Mentat downstream spending collection on hold in favour of finishing the architecture: no new live batches until he says, and one integrated, reviewed collector release (origin-storage growth fix, then concurrency and crash recovery, then totals and candidate-to-committee mapping) applied to production by Paul himself.
