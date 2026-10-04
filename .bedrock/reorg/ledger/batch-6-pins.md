# Batch 6 recall pins (procedure P, plan Appendix B; Owner decision 13)

Decided on the would-be-committed export (`commit.ts --export`, then `BRAIN_VAULT=<export> bun .bedrock/recall/selftest.ts --verbose`, after the export's check.ts). Recall code is untouched; no title, alias or summary of an existing note was edited, and no pin changed, so `.bedrock/recall/selftest.ts` is not in the batch.

| Pin | Prompt (short) | Expected note | Changed in batch 6 | Ranks on the export | Rule | Result |
|---|---|---|---|---|---|---|
| 15 | LobbyView collector bulk exports | `actors/lobbyview-collector.md` | R1 lines only (3 parts link it) | 1 `lobbyview-collector` 21.59, 2 `2026-07-feature-data-collection-lanes-lobbyview-lda-rebuild-and-bridge` 13.04, 3 the data-collection hub 12.88 | P2b forecast (the C1 hub and its LobbyView parts compete): the expected note keeps rank 1 | unchanged |
| 16 | staffer sorting rulings | `discussions/2026-09-06-staffer-sorting-rulings.md` | D4 line only | 1 the discussion 15.22, 2 `2026-09-feature-staffer-network-data-and-math-sorting-lane` 12.78, 3 the staffer-data hub 11.64 | P2b forecast (the sorting-lane part competes): the expected note keeps rank 1 | unchanged |
| 17 | cosponsor and sector networks | `topics/2026-06-feature-cosponsor-and-sector-networks.md` | split (C3) | 1 `-sector-networks` 14.00, 2 `-layer-toggles-and-configs` 13.72, 3 the hub 13.63, 4 `-june-network-plan` 13.60 | P2: the answer section (the hub's Context, as Appendix B forecast) stays in the hub, which ranks 3, so the pin stays (A = E) | unchanged |

Every other pin keeps its note in the top 3 on the export: pin 1 rank 1, 2 rank 1, 3 rank 1, 4 rank 1, 5 rank 1, 6 rank 1, 7 rank 1, 8 `codex-executor` rank 1 (A7 `-codex-executor-lane` 2, A8 `-incidents` 3), 9 rank 1, 10 rank 1, 11 rank 2, 12 `moneyball-workbook` rank 2 (the concept `four-pillar-percentile-blend` 1, the new C10 part `2026-06-feature-melange-model-facts` 3), 13 rank 1, 14 rank 1, 18 rank 2, 19 rank 1, 20 rank 1, 21 rank 1, 22 rank 1. Selftest summary on the export: on-topic 22/22 (expected note in the top 3), off-topic 22/22 silent, end to end through the hook process 12/12.

Margin note for pin 17: the hub leads its fourth-ranked part by 0.03, and recall is deterministic for a fixed tree, so the STOP gate's run on the committed HEAD reproduces this ranking.
