---
type: fleeting
title: "Fec no internal request limit (2026-10-15)"
aliases: ["fec-no-internal-request-limit-2026-10-15"]
source: "session"
captured_at: 2026-10-15
created_at: 2026-10-15
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fec-no-internal-request-limit-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-15", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fec-no-internal-request-limit-2026-10-15.md", sha256: "89133fa52575a2310752e1ab6e6370dc01078d56e5fab1fbe7230f98a4383f16"}
updated_at: 2026-10-15
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Fec no internal request limit (2026-10-15)

> Paul 2026-10-15 — FEC collection runs at the full ceiling (21 keys x 1,000/hr) every time; no self-imposed cap; NEVER email FEC

## Content

Paul, 2026-10-15, verbatim: "there should be no request limit, whatever makes it move the fastest". Then, on whether to email FEC for a higher limit: "We are not fucking emailing the FEC". And: "I would love to really jack it up to the limit however, you said 21,000 requests and hour, it should be going as high as it can every time".

**Why:** collection speed is the priority. Self-throttling and serial collectors waste the allowance he already has.

**How to apply:**
- FEC API work runs at the full ceiling continuously: every key in parallel, each at FEC's 1,000/hour, so about 21,000/hour across the 21 keys. Keep enough requests in flight to saturate it.
- Back off only on 429 or X-RateLimit-Remaining=0, and only on that key.
- Report the achieved rate.
- Prefer bulk files where they replace many calls; the download needs his OK.
- Never suggest contacting FEC for a higher limit.
- The crawler lane owns the D067 ledger and D071 workers; relay to it rather than editing its closure. Related: `mentat-sankey-zoom-lane-2026-10-15`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-15 from the Claude Code memory file `fec-no-internal-request-limit-2026-10-15.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
