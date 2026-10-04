# Batch 5 recall pins (procedure P, plan Appendix B; Owner decision 13)

Decided on the would-be-committed export (`commit.ts --export`, then `BRAIN_VAULT=<export> bun .bedrock/recall/selftest.ts --verbose`). Recall code is untouched; no title, alias or summary of an existing note was edited.

| Pin | Prompt (short) | Before | After | Moved heading | Rule | Ranks on the export |
|---|---|---|---|---|---|---|
| 2 | congress scraper press-release fallbacks | `topics/2026-06-feature-congress-r-scrapers.md` | `topics/2026-06-feature-congress-r-scrapers-cu-press-scraper.md` | `### 5-step fallback chain for MANUAL_PRESS_URLS members (added 2026-06-12)` (with the rest of `## Press scraper: fallback chain, third-party sources and coverage work` through `### GRIND COMPLETE`) moved from the hub to the `-cu-press-scraper` part | P2: the expected note was split; the note that now holds the answer section ranks 1 (the hub drops out of the top 5), so the pin moves to it (the Appendix B forecast) | 1 part 22.34, 2 `-press-discovery-and-attribution-fixes` 19.16, 3 `-press-collector-pipeline` 18.98 |

Every other pin is unchanged. Pins at batch-5 split hubs keep their hubs, whose answer sections stay there: pin 3 psychometrics hub rank 1 (Context holds the method; the record parts follow at 2 and 3), pin 12 `moneyball-workbook` rank 2 (`## Pillar weights and score formula` stays in the hub; the concept `four-pillar-percentile-blend` ranks 1, as Appendix B forecast, and the lineage part ranks 3), so P2 keeps both pins. Pins 1, 4-11 and 13-22 keep their notes in the top 3 (pin 8 `codex-executor` rank 1, pin 18 `higgsfield-connector` rank 2). Off-topic prompts: 22 of 22 silent.

Note on the deciding run: the first selftest on a freshly written export can lose its first hook call to the cold recall index (hook.log "index rebuild ran out of time"), the batch-4 observation; in G-post the export's check.ts reads every note first, and the deciding selftest runs after it.
