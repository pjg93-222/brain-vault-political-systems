# Batch 8 fix round: settled-findings reopen wording, LIVE pointer to D-060

Follow-up to batches 7 and 7b (plan section 11.3: a fix round runs the full batch protocol; Owner decisions 4(c), 7 and 13). Base `8f677e1`. Both fixes touch Phase 2 text only: the settled-findings concept and live-tree-patch-discipline were created in batch 3 (neither exists at `e2077ed`), and the four other notes hold their settled-findings lines only since batch 3 (no `settled-findings-stay-settled` mention at `e2077ed`). 7 lines in 6 notes, one line per hunk. No wikilink was added or removed. No frontmatter key changed except the text of the concept's `description` (`updated_at` and `updated_by` were already 2026-10-04 and `reorg@agent` in all 6 notes).

## Fix 1: both reopen routes in the six settled-findings summary lines

Reference, `concepts/settled-findings-stay-settled` line 29 (corrected in batch 7, L-S3-11 in `batch-7-fixes.md`): "Paul can reopen a settled question, and so can new evidence that meets the reopen condition recorded with the settlement (new data, a new basis); a search Paul reopened is not bound by the earlier closures."

The evidence cited for it in L-S3-11, re-read for this round:
- `topics/2026-07-feature-influence-engine-internals` line 98: "Reopens only on a construct-appropriate failure: a multi-rater panel to B&L standards (3+ raters, codebook, consensus) failing to converge." A reopen condition recorded with the ruling.
- the same note, line 107: "never reopen without a new genre/data"; line 112: "never re-propose without new basis".
- `topics/2026-07-working-agreement-verification-and-evidence-standards` line 205: "do NOT bind this search; Paul (repo owner) explicitly reopened it." Paul's own route.

Six lines still said only "unless Paul reopens it". One wording replaces it in all six, using line 29's own words for the second route:

- old tail (all six): `... and is not re-litigated unless Paul reopens it.`
- new tail (all six): `... and is not re-litigated unless Paul reopens it or new evidence meets the reopen condition recorded with the settlement.`

The draft wording said "recorded with the finding"; line 29 says "recorded with the settlement", so "settlement" is used. Line 29's parenthetical examples ("new data, a new basis") and its clause about a search Paul reopened are not copied: they are examples and a consequence, not part of the two routes, so the six lines state the two routes and add no claim.

| id | note:line | kind | line prefix (unchanged) |
|---|---|---|---|
| F1-a | concepts/settled-findings-stay-settled:5 | frontmatter `description` (closing quote kept) | `description: "A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, ` |
| F1-b | concepts/settled-findings-stay-settled:15 | tagline | `> A finding refuted ... do-not-re-flag note, ` |
| F1-c | actors/lobbyview-collector:156 | Related Concepts line (C5 echo) | `- [[settled-findings-stay-settled]] — A finding refuted ... do-not-re-flag note, ` |
| F1-d | actors/mentat-fec-pipeline:188 | Related Concepts line (C5 echo) | as F1-c |
| F1-e | projects/melange-systems:351 | Map concept row | `- [[settled-findings-stay-settled]] - A finding refuted ... do-not-re-flag note, ` |
| F1-f | projects/mentat:223 | Map concept row | as F1-e |

Map rows and "re-clip". `relink.ts` clips only table rows (`TABLE_SUMMARY_MAX`, topic and actor parts); a concept row is a bullet in `### Related Concepts` (`mapSectionFor` returns "Related Concepts") and carries the full summary, as `projects/melange-systems` lines 346-355 did after batch 7. Checked with the tool's own functions (`harvestSummaries`, `summaryOf`, `mapSectionFor`): the summary it generates equals the new `description`, the tagline, the two C5 lines and both Map bullets, character for character, so a later `relink.ts --maps` or `--reconcile` regenerates the same lines (the harvest picks the most frequent echo text of a note, and all four copies now agree). `clip(summary, 100)` would have cut the row to 93 characters and made it differ from the generated one, so no clip is applied.

## Fix 2: pointer from the dirty-path bullet to the pending caution

`concepts/live-tree-patch-discipline` line 25 says to check that no path is dirty before any merge into LIVE. Batch 7b added the closing `## Pending newer capture` section (the 2026-10-03 capture: "**Never** merge or check out a branch into LIVE, because a checkout rewrites EOLs (D-060)") but left the bullet unmarked, so a reader of the bullet alone reads the merge as allowed.

- old: `... never a whole-file copy over LIVE's drifted files; before any merge into LIVE, check that no path it touches is dirty.`
- new: `... never a whole-file copy over LIVE's drifted files; before any merge into LIVE, check that no path it touches is dirty (but see "Pending newer capture" at the end of this note: D-060, 2026-10-03, forbids merging or checking out a branch into LIVE).`

Plain text only: no wikilink and no heading link (the section name is quoted in plain text; the vault uses no anchors), so check b, the graph counts and the link tooling are untouched. The pointer states only what the section says (D-060, the capture's date, the prohibition); the bullet's own wording and the section stay as batch 7b left them. Reconciling the bullet with the capture is still the later fleeting pass. The note does not become a split family member, so S10 detection does not apply to the word "see".

## Not changed

- Line 29 of the concept and every other line of the six notes (`git diff HEAD`: 7 insertions, 7 deletions, one line each).
- Lines about reopening that are not the summary sentence: the concept's lines 21 and 33 and `topics/2026-07-working-agreement-verification-and-evidence-standards` line 55 (the R9 echo). They say something else and are outside the six.
- No title or name, no alias, no earlier allow file, spec JSON, `keep.json`, `plan.md`, `CLAUDE.md` or `snapshot.ts` (no link changed, so the graph counts stay 207 / 574 / 2083 on the export).
- `index.md` is regenerated by `hook.ts index` and staged by `commit.ts` (line 68 carries the new description); `log.md` gets the batch line from `commit.ts`. Neither is in the manifest. No fleeting path was edited, staged or moved.

## Ledger files

- `batch-8-allow.txt`: 6 entries, old (at `8f677e1`) => new, for the 6 changed body lines (F1-b to F1-f and F2). The two identical pairs (F1-c and F1-d, F1-e and F1-f) need two entries each, since an entry covers one missing occurrence. The frontmatter line F1-a is not listed: `conserve.ts` compares body lines, and its frontmatter rule checks keys and `sources:` only (batch 7 likewise listed 113 body lines for 126 changed lines).
- `batch-8-paths.txt`: 9 paths (6 notes, this file, the allow file and the manifest).
