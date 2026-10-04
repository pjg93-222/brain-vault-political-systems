---
type: concept
name: "Live-tree patch discipline"
aliases: ["live_patch.py patch rule"]
description: "Changes to a drifted Melange live tree go in as one line-wise patch cut against LIVE bytes with fec/tools/live_patch.py, applied with core.autocrlf=false, never normalising LIVE: no merge or checkout (D-060); applying needs Paul's go."
related_to: []
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/people-network-route-latency-lane-2026-10-02.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\people-network-route-latency-lane-2026-10-02.md", sha256: "a8b23c592aa5a712c63c4cb8c3f20e85fd6a62f588f7459770fb0a71f1056656"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/concept", "domain/platform"]
---

# Live-tree patch discipline

> Changes to a drifted Melange live tree go in as one line-wise patch cut against LIVE bytes with `fec/tools/live_patch.py`, applied with `core.autocrlf=false`, never normalising LIVE: no merge or checkout (D-060); applying needs Paul's go.

## Description

The canonical Melange checkout ("LIVE") is not an ordinary working tree: it can sit on another session's branch, it holds live-only files that committed code imports, and its line endings differ from the committed blobs, so a checkout or merge that rewrites a file normalises that whole file's line endings, including lines nobody meant to touch. The 2026-09-19 line-ending census produced the rule and the tool: work lands on a branch or worktree, and a drifted LIVE target receives one patch cut against its own bytes by the line-wise cutter `fec/tools/live_patch.py`, applied with `git -c core.autocrlf=false apply`, never normalising LIVE. The cutter classifies each file (exit 0 identical bytes, 1 line-ending-only drift, 2 content drift), so a patch carries content changes only.

Applying the patch, and restarting a live service such as the 8841 sidecar after it, needs Paul's explicit go; in the staffer sidecar lanes both are his own actions. Correction (2026-10-03/04, source `people-network-route-latency-lane-2026-10-02`): in the route-latency lane Paul gave that go in advance for `landing_v2`, `landing_v3_ids` and `landing_v4`, conditional on an independent Opus check ("stop, apply, start once the check passes"; "apply v3 once the check passes too"; "land v4 once the check passes"), and the stop, apply and restart then followed once the check had passed (`landing_v2` applied 2026-10-03 14:59, 8841 Ready 15:02); `landing_v4_1` was recorded as needing an Opus check and Paul's OK for its restart, and landed on 2026-10-04.

## Key Characteristics

- One patch per lane, cut against LIVE bytes with `fec/tools/live_patch.py` from anchor-matched edits, never a whole-file copy over LIVE's drifted files. Precedent (2026-10-03/04, source `people-network-route-latency-lane-2026-10-02`): in the route-latency lane, on Paul's rulings for each landing, several patches were landed in turn, each applied only after an independent Opus check passed; the lane landed four (`landing_v2`, then `landing_v3_ids` cut against the `landing_v2` post-images, `landing_v4` and `landing_v4_1`).
- Never merge or check out a branch into LIVE, because a checkout rewrites line endings (D-060, as restated in the route-latency lane's commit ruling of 2026-10-03; source `people-network-route-latency-lane-2026-10-02`). In the route-latency lane, on Paul's commit ruling of 2026-10-03, the lane committed its own files on LIVE main with `git add` on their exact paths and left other lanes' uncommitted LIVE changes alone. This replaces the earlier advice to check, before a merge into LIVE, that no path the merge touches is dirty.
- Apply with `core.autocrlf=false` (the system default is `autocrlf=true`); never normalise LIVE's line endings.
- The cutter's exit code separates identical bytes, line-ending-only drift and content drift.
- APPLY and any restart need Paul's explicit go; the agent cuts and verifies the patch. Paul may give that go in advance for a landing, conditional on an independent check passing (route-latency lane, 2026-10-03/04).
- Cut patches as bytes: a cutter that goes through a text console mangles non-ASCII bytes.

## Where it Applies

- [[2026-07-troubleshooting-melange-live-tree-git-drift]] — the record of LIVE's branch drift, the 2026-09-19 reconcile and the line-ending census that produced the cutter
- [[2026-09-feature-staffer-network-surfaces]] — the route-latency lane landed four patches on Paul's per-landing rulings (2026-10-03/04), each after an independent Opus check, and committed its own files on LIVE main by exact paths
- [[melange-fec-pipeline]] — owns `fec/tools/live_patch.py` and the safe apply recipe under system `autocrlf=true`
- [[staffer-live-sidecar]] — sidecar changes reach LIVE as cut patches, one per landing; APPLY and the restart need Paul's go, which he gave per landing in the route-latency lane (2026-10-03/04)
- [[melange-systems]] — the project whose canonical live tree the rule protects

## Evidence

Other notes that use the rule, by title (plain text, so their link budgets are unchanged):

- Melange audits and code reviews: a drifted LIVE target gets a new pure helper on the branch and the producer hook as a patch cut against LIVE bytes.
- UI redesign boards (Melange and Mentat) and Mentat console: the graph-quirks lane reached LIVE sources and served copies through `live_patch.py`.
- Mentat failings lanes and PAC evidence: cut patches as bytes (a cp1252 console mangled every non-ASCII byte).
- Mentat console UI, Mentat repo state and workbooks, Mentat FEC pipeline: Mentat's tree uses the same line-ending-safe `git -c core.autocrlf=false` handling when proving HEAD.
