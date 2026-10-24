---
type: fleeting
title: "Staffer social network overlap rule (2026-09-03)"
aliases: ["staffer-social-network-overlap-rule-2026-09-03"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[concurrent-service-overlap-edge-rule]]"
  - "[[2026-09-03-staffer-network-architecture]]"
  - "[[2026-09-feature-staffer-network-data-and-math]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/staffer-social-network-overlap-rule-2026-09-03.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\staffer-social-network-overlap-rule-2026-09-03.md", sha256: "56dca194ab0a6ebf17fc456d19f97bcac7b7c85471f8144f0912a3c84d92b9c8"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Staffer social network overlap rule (2026-09-03)

> OVERLAP is the edge rule for the staffer social network — no person-person edge without actual concurrent service; sequence is trajectory, not friendship

## Content

Paul, 2026-09-03, emphatic and repeated ("REMEMBER, OVERLAP"): in the staffer social
network, **a person-to-person edge requires actual temporal overlap in the same container.**

- **Concurrent co-tenure IS the edge, and it is the strong one.** His words: "if they are
  working together at the same time, they are pretty close; that's an immediate
  connection." Weight by guaranteed overlap duration × container proximity κ (design §6.2:
  same personal office 1.00, committee same side 0.75, side unknown 0.60, opposite side
  0.40, leadership 0.75, admin/officer 0.50).
- **Non-overlapping same-office pairs get NO edge.** If A left in 2015 and B arrived in
  2018 they never met. That is not a weak tie — it is not a tie.
- **Sequence is a property of a person's TRAJECTORY, not a person-person edge.** Person p
  served office A then office B: real data, kept, emitted as ordered stints plus derived
  directed office→office moves. It is the institutional pathway (Paul's "tunnel" in his
  ant-colony framing), never a claim that two strangers know each other.

**Why:** emitting edges for non-overlapping same-office pairs fabricates relationships that
never existed, and inflates density enormously — every office becomes a clique across its
entire history, producing a graph that looks rich and is fiction.

**How to apply:** union intervals before intersection (duplicate payroll rows and
overlapping quarterly observations must not inflate co-tenure; union shared calendars again
across containers so simultaneous multi-office assignments don't double count). Always
report the count of same-office pairs REJECTED for zero overlap — if that count is zero,
the overlap test is not firing. Alumni who never overlapped may be connected in reality via
introductions, but that is an INFERENCE and belongs only in a separate exploratory tier,
never merged with observed edges — the same discipline that keeps predicted employment out
of `employment_episodes`.

Architecture this sits inside: `staffer-social-network-architecture-2026-09-03`.
Lane state: `staffer-network-employment-tenure-adjudication-2026-09-01`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): no person-edge w/o concurrent svc

## Possible Connections

- [[concurrent-service-overlap-edge-rule]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-09-03-staffer-network-architecture]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-09-feature-staffer-network-data-and-math]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `staffer-social-network-overlap-rule-2026-09-03.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[concurrent-service-overlap-edge-rule]], [[2026-09-03-staffer-network-architecture]], [[2026-09-feature-staffer-network-data-and-math]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
