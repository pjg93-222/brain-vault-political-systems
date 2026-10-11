---
type: topic
title: "Telecom as a full industry (2026-10-07) (Primacy and industry tier boards)"
aliases: ["Primacy and industry tier boards: Telecom as a full industry (2026-10-07)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-10-10
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/telecom-industry-lane-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\telecom-industry-lane-2026-10-07.md", sha256: "f1866b3d81567206a0f5d8b9c56ff888f5c864bc4f21b5d351ab09454e28ae39"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-07-feature-primacy-and-industry-tier-boards]]"
---

# Telecom as a full industry (2026-10-07) (Primacy and industry tier boards)

> The telecom lane of 2026-10-07: a telecom vs credit-union lobbying and political-money comparison, Paul's ruling to integrate Telecom into the Industry tab exactly like fintech (brain D-110, superseding D-109), the landing, the Haiku position labelling and the known risks. Part of [[2026-07-feature-primacy-and-industry-tier-boards]] (project [[melange-systems]]).

## Telecom industry lane (memory `telecom-industry-lane-2026-10-07`)

- Started 2026-10-07. A colleague of Paul's asked for telecom vs credit-union lobbying and political-money figures. The request is CONFIDENTIAL ("hold this close"): never put the legislation it concerns in the brain, commits, GitHub, artifacts or documents. (This note records the figures and the build only; the subject of the request is deliberately not written here.)
- **Comparison (DONE, delivered in chat):**
  - Federal LDA, OpenSecrets-style totals: telecom $102.7M vs CU $7.4M in 2025 (14x).
  - 2025 lobbyists 526 vs 81; covered positions 196 vs 25.
  - PAC giving to House and Senate candidates, 2024: about 3:1.
  - Sources: the full LDA sweep (539,782 filings, 2021 to 2026 Q2), read by the scratchpad script `lda/lda_sector_compare.py` (session e8b05314...). LobbyView cross-check: within 1% (telecom) and 4% (CU). Mentat Telecom and Credit Union workbooks.
  - Index file: `audits/staffer_live_runtime/lda_activity_v2.sqlite`. It holds IDs only: no names, no amounts.
- **Paul's rulings:** federal scope. Telecom is integrated into the Industry tab "Other Industries": "Full boards, treat it exactly like fintech" (brain D-110 supersedes D-109). A Telecom document prepped for Mentat extraction: DONE at `Desktop\Mentat Complete Files\Telecom Extraction Prep 2026-10-07.xlsx`. Its roster validator passes; 45 proposals await Paul's decisions; R6 duplicates the OPTIMUM line.
- **LANDED 2026-10-07 (supersedes the build state below):**
  - Code: `904077797`. Then `c692eddb1` (interactions budget 16 MiB) and `8c5490f88` (tags 648, anchor memberships 171). Not pushed.
  - Anthropic API credits were exhausted on all keys. Per Paul ("you can use Haiku"), 22,847 position items were labelled by Claude Code Haiku SUBAGENTS: scratchpad `agentclass/` (prepare, ingest, INSTRUCTIONS, 166 batches), ingested as variant `kim_llm4`. Pilot vs API: kappa 0.25; Haiku is more literal, calling bare bill listings Monitor.
  - A new anchor needs `update_bill_repository.py --rebuild-dashboard` (DE-068).
  - 220 rank moves come from the GovInfo refresh, not telecom.
  - OPEN for Paul (as of 2026-10-07): the email zip is 311 KB over its 14 MiB cap; `sentinel_admissions` goes stale 10-08 16:09 EDT; the [delegated] items in `audits/telecom_industry_20261007/CHANGELOG.md`.
- **Build state (historical, before the landing):** a Sonnet worktree executor was editing code (roster with 17 families, own network side 'telecom', class telecom_primary at 0.15, champions/tiers/UI, collect_fec_spending compact-schema adapter, tests); nothing had landed. A Haiku agent was proposing telecom_primary retags from the 644-act CU universe; its output went to the scratchpad `telecom_tags/proposals.csv` and needed Paul's approval.
- **Known risks (see the fintech-trace map):** retagging shared to telecom_primary moves CU tiers and display ranks but not ranks_python; the crown law's cross-sector strip lets a telecom THREAT board remove non-crown CU champions; the efficiency_layers adversary set; `lobby-interactions.html` is at 7.69 MB of its 8 MiB cap; champions boards need a paid position-classification run on telecom org-bill pairs; audit_full pins 644 tags; `sentinel_admissions.json` expires about 2026-10-09; the data lanes (sector_spend, network rebuild `--full-scope --emit-bill-index`, lobby_interactions, position join, org_stance_priors, member_congress_panel) run outside the chain against `%LOCALAPPDATA%\Melange\lda_rebuild`; back that up first.
- **How to apply:** landing and the live data lanes are Paul's go (`ask-before-substantive-changes`); model tiers per `reasoning-in-fable-code-in-opus-2026-09-16` (the orchestration rules working agreement). Related memories: `industry-tier-recreation-2026-08-09`, `champion-crown-law-2026-08-09`, `sector-networks-2026-08-18`, `lobbyview-integration-2026-07-31`.
