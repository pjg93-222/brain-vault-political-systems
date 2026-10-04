---
type: concept
name: "Contract-fixture discipline"
aliases: ["Shared contract fixtures", "DE-021 contract rule"]
description: "A shape crossing a lane or process boundary is fixed by one JSON example file every suite imports, asserted against every producer, with a negative control that must fail; prose is never a contract (brain DE-021)."
related_to:
  - "[[giving-forecast-pipeline]]"
  - "[[mentat-console-chart-studio-and-system-debug]]"
  - "[[mentat]]"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\Mentat\\audits\\mentat_failings_20260915\\contracts\\README.md"
    sha256: "c890a19c8eec5db2db55cd76dd74b41ec114ef4f8d4545abf07fc084c6ad4cf3"
    as_of: "2026-09-26"
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/concept", "domain/platform"]
---

# Contract-fixture discipline

> A shape that crosses a lane, process or session boundary is defined by one JSON file of example payloads that every test suite imports, asserted against every producer, with a negative control that must fail; prose agreements never count as a contract.

> [!info] Source and status
> Summary of `audits/mentat_failings_20260915/contracts/README.md` (Mentat repo, written for the Mentat failings lane of 2026-09-15, last committed 2026-09-26). It operationalizes brain dead end DE-021 (2026-09-14), which it quotes verbatim.

## Description

**Why (DE-021, 2026-09-14).** The Chart Studio saved-views and briefing-tray write path was split across a client lane and a server lane that agreed the `source`/`provenance` shape only in prose. The client sent strings, the server demanded objects, each side's unit tests passed against its own reading, and only a real-client run on a writable console exposed it: no view reached disk. A second producer slipped past the first fix because the shared fixture tested readers, not producers. Each of the three failures maps to one rule below.

**When a contract is required.** Before writing code that introduces or changes an `/api/*` request or response shape, a URL scheme (query names, deep links), an export's column order or set, a status vocabulary crossing a process boundary, or any on-disk JSON another session's code reads. If two sessions touch the same shape, the contract lands before either edits code.

**The rules.**
1. **One file, imported by both suites.** One kebab-case JSON file per contract with `contract`, `version`, `owner`, `produced_by` (every producer, found by grepping for every writer), `consumed_by`, an orientation-only `description`, normative `examples` and a mandatory non-empty `negative_controls`. Python, Node and R suites read the same file from disk; no embedded or translated copies.
2. **Assert against producers.** For each producer, a test invokes the real producer (function, route or export) and checks its actual output against the example shape; for each consumer, a test feeds every example to the real consumer.
3. **A negative control must fail.** Every contract test feeds each negative payload to the same assertion and requires rejection; a passing negative control is a red test. The receipt records producers asserted, consumers asserted and the negative-control result.
4. **Real-client pass on write paths.** The owning session runs the real console on a scratch port in writable mode and pastes the artifact that reached disk into its receipt; Paul's console port is never used.
5. **Changing a contract.** Edit the JSON and bump `version`, expect red in both suites, change code until green with the negative control still failing, record the bump and the test output, and name every consuming session in the handoff.

**Where it was applied.** The lane's index lists, among others, contracts for raw contribution columns, the snapshot registry, the contributions API, the Chart Studio API, the console URL scope and the evidence-geo map payload (v4, 2026-09-25). The Giving Forecast later used the same pattern for its model bundle and anchor snapshot, with one schema, one example and shared negative controls per document.

## Key Characteristics

- The examples are the contract; prose is orientation only.
- Producers, not readers, are what the assertion must reach.
- A test that cannot fail does not count.

## Where it Applies

- [[mentat-console-chart-studio-and-system-debug]] — the Chart Studio write path whose prose-only contract failed (DE-021) and the lane that followed.
- [[giving-forecast-pipeline]] — the model bundle v2 and anchor snapshot v1 contracts, a worked implementation.
- [[mentat]] — every Mentat lane that changes a cross-boundary shape.
