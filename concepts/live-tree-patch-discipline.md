---
type: concept
name: "Live-tree patch discipline"
aliases: ["live_patch.py patch rule"]
description: "The Melange live tree changes only through one line-wise patch cut with fec/tools/live_patch.py and applied with core.autocrlf=false; never check out or merge into LIVE, and APPLY is Paul's."
related_to: []
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/platform"]
---

# Live-tree patch discipline

> The Melange live tree changes only through one line-wise patch cut with `fec/tools/live_patch.py` and applied with `core.autocrlf=false`; never check out or merge into LIVE, and APPLY is Paul's.

## Description

The canonical Melange checkout ("LIVE") is not an ordinary working tree: it can sit on another session's branch, it holds live-only files that committed code imports, and its line endings differ from the committed blobs, so a checkout or merge into it would normalise line endings across files nobody meant to touch. The 2026-09-19 reconcile and its line-ending census produced the rule and the tool: work lands on a branch or worktree, and LIVE receives one patch cut against its own bytes by the line-wise cutter `fec/tools/live_patch.py`, applied with `git -c core.autocrlf=false apply`, never normalising LIVE. The cutter classifies each file (exit 0 identical bytes, 1 line-ending-only drift, 2 content drift), so a patch carries content changes only.

Applying the patch, and restarting a live service such as the 8841 sidecar after it, is Paul's action; a lane delivers the patch and stops.

## Key Characteristics

- One patch per lane, cut against LIVE bytes with `fec/tools/live_patch.py`; never a checkout, merge or whole-file copy into LIVE.
- Apply with `core.autocrlf=false` (the system default is `autocrlf=true`); never normalise LIVE's line endings.
- The cutter's exit code separates identical bytes, line-ending-only drift and content drift.
- APPLY and any restart are Paul's; the agent cuts and verifies the patch.
- Cut patches as bytes: a cutter that goes through a text console mangles non-ASCII bytes.

## Where it Applies

- [[2026-07-troubleshooting-melange-live-tree-git-drift]] — the record of LIVE's branch drift, the 2026-09-19 reconcile and the line-ending census that produced the cutter
- [[2026-09-feature-staffer-network-surfaces]] — the route-latency lane lands as ONE patch cut with the cutter; APPLY and the 8841 restart are Paul's
- [[melange-fec-pipeline]] — owns `fec/tools/live_patch.py` and the safe apply recipe under system `autocrlf=true`
- [[staffer-live-sidecar]] — sidecar changes reach LIVE as one cut patch; APPLY and the restart are Paul's
- [[melange-systems]] — the project whose canonical live tree the rule protects

## Evidence

Other notes that use the rule, by title (plain text, so their link budgets are unchanged):

- Melange audits and code reviews: a drifted LIVE target gets a new pure helper on the branch and the producer hook as a patch cut against LIVE bytes.
- UI redesign boards (Melange and Mentat) and Mentat console: the graph-quirks lane reached LIVE sources and served copies through `live_patch.py`.
- Mentat failings lanes and PAC evidence: cut patches as bytes (a cp1252 console mangled every non-ASCII byte).
- Mentat console UI, Mentat repo state and workbooks, Mentat FEC pipeline: Mentat's tree uses the same line-ending-safe `git -c core.autocrlf=false` handling when proving HEAD.
