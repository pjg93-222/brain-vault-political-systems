# Core-docs import 2026-10-04 recall pins (procedure P, plan Appendix B; Owner decision 13)

Decided on the would-be-committed export (the staged tree checked out to a short path, then `BRAIN_VAULT=<export> bun .bedrock/recall/selftest.ts --verbose`, after the export's check.ts). Recall code is untouched. No title, alias or summary was edited to fix a pin. The summaries edited in this commit are `concepts/say-do-gate` (the owner-ruled in-place correction, reworded by the independent review) and the new note `concepts/behavior-qualified-recognition` (review fix B-1); neither edit was made for a pin.

| Pin | Prompt (short) | Before | After | Moved heading | Rule | Ranks on the export |
|---|---|---|---|---|---|---|
| 17 | cosponsor and sector networks | `topics/2026-06-feature-cosponsor-and-sector-networks.md` | `topics/2026-06-feature-cosponsor-and-sector-networks-sector-networks.md` | none moved: the hub's `## Context` (the overview) stays in the hub | P2b: the expected note (the hub) is unchanged by the import and fell from rank 3 to rank 4, because its family part `-june-network-plan`, also unchanged, now leads it by 0.0018 (13.8072 against 13.8054; at HEAD the hub led by 0.0316); no new note is among the five hits, so there is nothing new to retitle. The pin moves within E's family to the part that ranks 1 and holds the build of the bank_reg and crypto sector networks | 1 `-sector-networks` 14.22, 2 `-layer-toggles-and-configs` 13.94, 3 `-june-network-plan` 13.81, 4 the hub 13.81, 5 `-member-relationships` 13.53 |

Why it moved: at HEAD `7db615c` the hub led its fourth-ranked part by 0.03 (13.52 against 13.49), as the batch-6 margin note for pin 17 recorded. The import adds 17 notes and edits 34, which changes the corpus statistics: all five family scores rose by about 0.3 and the two closest swapped. The hub and its family parts other than `-member-relationships` (which gained the v3 math section) were not edited.

Pin 11 is kept: `concepts/exclude-on-contradiction-not-ambiguity.md` ranks 2 (25.3172) behind the `-cross-verification` part (25.3181), a lead of 0.0009 that went the other way at HEAD (25.0426 against 25.0417) and that batches 6 and 7 recorded as rank 2. P2: the expected note is in the top 3, so the pin stays (the Appendix B P2b forecast).

Alternative not taken for pin 17: P2 with A = E also allows an alias on the hub (an existing note may only gain aliases). That would edit a curated note outside the drafted import, so the pin was moved instead. To reverse: restore the hub as pin 17 in `ON_TOPIC` and add the alias.

Every other pin keeps its note at the rank it had at HEAD: pins 1-10 rank 1, 12 `moneyball-workbook` rank 2, 13-16 rank 1, 18 `higgsfield-connector` rank 2, 19-22 rank 1. Selftest on the export: on-topic 22/22 (expected note in the top 3), off-topic 22/22 silent, end to end through the hook process 12/12.
