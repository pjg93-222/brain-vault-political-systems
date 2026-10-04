# Batch 4 recall pins (procedure P, plan Appendix B; Owner decision 13)

Decided on the would-be-committed export (`commit.ts --export`, then `BRAIN_VAULT=<export> bun .bedrock/recall/selftest.ts --verbose`). Recall code is untouched; no title, alias or summary of an existing note was edited.

| Pin | Prompt (short) | Before | After | Moved heading | Rule | Ranks on the export |
|---|---|---|---|---|---|---|
| 1 | Mentat trade association $0, attribution fix | `topics/2026-07-bugfix-mentat-collection-and-attribution.md` | `topics/2026-07-bugfix-mentat-collection-and-attribution-audit-r12-trade-association.md` | `## Trade-association $0 gap = the "~$163k Candidate swap"` moved from the hub to the `-audit-r12-trade-association` part | P2: the expected note was split; the note that now holds the answer section ranks 1 (the hub ranks 3), so the pin moves to it (the Appendix B forecast) | 1 part 22.55, 2 `mentat-fec-pipeline-history-audit-r12` 19.70, 3 hub 15.20 |

Every other pin is unchanged. Pins at split hubs keep their hubs (8 `codex-executor` rank 1: Role split stays in the hub; 9 workstation disk rank 1). The competing parts forecast in Appendix B rank below the expected note or beside it inside the top 3: pin 7 `runpod-pod` 1 (`-runpod-sessions` 2), pin 13 `glass-box` 1 (`-glass-box-lock-hang` 2), pin 14 `metaloop` 1, pin 18 `higgsfield-connector` 2 (`-higgsfield-account-trap` 1; the expected note is unsplit, keeps its answer and stays in the top 3, so P2 keeps the pin and P2b does not apply), pin 11 the concept 1 (`-cross-verification` 2), pin 21 the xref discussion 1 (`-cross-verification` 2), pin 22 `melange-refresh-scheduler` 1. Off-topic prompts: 22 of 22 silent.
