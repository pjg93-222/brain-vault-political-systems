# Batch 7 recall pins (procedure P, plan Appendix B; Owner decision 13)

Decided on the would-be-committed export (`commit.ts --export`, then `BRAIN_VAULT=<export> bun .bedrock/recall/selftest.ts --verbose`, after the export's check.ts). Recall code is untouched. Batch 7 changed no title, alias or summary of a pre-existing note (decision 13); it changed the summaries of 16 parts, the descriptions of 4 concepts and the titles and aliases of 4 parts, all new notes of Phase 2. The pins whose competing notes changed were re-read on the export:

| Pin | Prompt (short) | Expected note | Changed in batch 7 | Ranks on the export | Result |
|---|---|---|---|---|---|
| 8 | Codex executor lane delegation | `actors/codex-executor.md` | A8 `-incidents` title and summary; the hub's two echo lines | 1 `codex-executor` 14.21, 2 A7 `-codex-executor-lane` 12.32, 3 A8 `-incidents` 11.62 | unchanged (rank 1, as in batch 6) |
| 12 | Moneyball workbook four-pillar blend | `actors/moneyball-workbook.md` | the `four-pillar-percentile-blend` description and body; the `-lineage-and-june-audit` pointer and one rewrite; the model-facts summary | 1 `four-pillar-percentile-blend` 17.87, 2 `moneyball-workbook` 15.88, 3 `-lineage-and-june-audit` 14.47, 4 model facts 14.32 | unchanged (rank 2, as in batch 6) |
| 13 | GLASS BOX streams | `actors/glass-box.md` | the GLASS BOX part summary and the actor's echo line | 1 `glass-box` 22.57, 2 the lock-hang part 14.16 | unchanged (rank 1) |
| 15 | LobbyView collector bulk exports | `actors/lobbyview-collector.md` | the bridge-rounds part summary and its echo line | 1 `lobbyview-collector` 21.51, 2 the LDA-rebuild-and-bridge part 12.97, 3 the data-collection hub 12.81 | unchanged (rank 1) |
| 17 | cosponsor and sector networks | `topics/2026-06-feature-cosponsor-and-sector-networks.md` | nothing in its family | 1 `-sector-networks` 14.00, 2 `-layer-toggles-and-configs` 13.72, 3 the hub 13.63, 4 `-june-network-plan` 13.60 | unchanged (rank 3; the four scores equal batch 6's) |
| 18 | Higgsfield connector account trap | `actors/higgsfield-connector.md` | the account-trap part summary and the actor's two echo lines | 1 the account-trap part 27.37, 2 `higgsfield-connector` 24.22 | unchanged (rank 2, as in batch 6) |

Every other pin keeps its note at the rank batch 6 recorded. Selftest on the export: on-topic 22/22 (expected note in the top 3), off-topic 22/22 silent, end to end through the hook process 12/12.
