---
type: actor
name: "Runbook: production runs, collection rules and reconciliation (Mentat FEC pipeline)"
aliases: ["Mentat FEC pipeline: Runbook: production runs, collection rules and reconciliation", "Mentat R pipeline runbook"]
category: "pipeline"
description: "How the Mentat R pipeline is run and kept correct (README of 2026-09-26): resilient industry runner, mentat.R flags, adding an industry, API collection rules, cross-reference before export, source and dollar reconciliation."
repository: ""
stack: ""
status: "active"
team: ""
criticality: ""
pci: false
known_issues: []
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\Mentat\\mentat\\README.md"
    sha256: "efcc9830061dc0215c260c7c2b07e839e3e1e5609f0fdd5ae73f915ad23f8df9"
    as_of: "2026-09-26"
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/actor", "status/active", "domain/data"]
part_of: "[[mentat-fec-pipeline]]"
---

# Runbook: production runs, collection rules and reconciliation (Mentat FEC pipeline)

> How the Mentat R pipeline is run and kept correct: the resilient industry runner for production collection, the entry-point flags, data-driven industry onboarding, the API collection rules, cross-reference before every export, and the source and dollar reconciliation that guards publication. Part of [[mentat-fec-pipeline]] (project [[mentat]]).

> [!info] Source and status
> Summary of `mentat/README.md` in the Mentat repo (last committed 2026-09-26). The governing accounting standard is `mentat/METHODOLOGY.md` (Mentat FEC accounting methodology). The README's API-key line is a placeholder; no key material is recorded here.

## Entry point and production runs

- `mentat.R` is the single entry point: it ingests the registers, collects FEC Schedule A receipts, reconciles the Crypto acceptance fixture and writes the spending and QA reports.
- Production collection uses the resilient runner `tools/parallel/Start-MentatResilientIndustryReports.ps1` (`-Industries <name> -NoCache`; omit `-Industries` for every roster industry). It gives each active lane its own API key and SQLite shard, retries a failed R lane in a fresh process, splits unresolved work into company-cycle processes before the gated merge, and writes fanout, coverage, warehouse, generator and timing receipts under `.cache/resilient-industry-runs/`. The older `Start-MentatIndustryReports.ps1` now delegates to it; serial Chrome collection needs `-LegacySerialCollection`.
- Direct `Rscript mentat.R` is for focused development and diagnostics. Flags: `--cycles`, `--data-root`, `--engine=api|chrome`, `--concurrency`, `--skip-scrape` (ingest, fixture reconciliation and reporting without a browser or API call), `--phase2-names` / `--skip-phase2-names`, `--resume-after`, `--retag-only`, `--help`; environment equivalents include `MENTAT_ENGINE` (default `api`), `MENTAT_CONCURRENCY` (default 8), `MENTAT_DATA_ROOT` (default `%LOCALAPPDATA%/Mentat`) and `MENTAT_RESCUE_CAP` (default 50).
- Requirements: Windows with R 4.6.0, the listed R packages, a registered openFEC key in the environment (never printed or persisted), and no report workbook open in Excel during replacement. Final reports live in the configured report directory (`config/report-directory.json`), never substituted from Downloads or caches.

## Adding an industry

Add a worksheet to `inputs/Company Name.xlsx` (sheet name = industry; one company block per blank-line-separated section; `NOT ` prefixes exclusions), run the offline readiness check `tools/validate_industry_coverage.py` (fail-closed `ready` receipt), then run the resilient runner with the new name. No script-maintained industry list exists.

## Collection rules

- API engine: `/v1/schedules/schedule_a/`, 100 rows per request, descending receipt date, openFEC keyset cursors; an exact, stable `pagination.count` is required, partial or cyclic cursors are rejected, concurrency adapts down after a 429, `Retry-After` is honored up to 120 seconds, and a persistent 1,000-request hourly budget is shared across processes.
- Every roster spelling is searched literally; completed work carries its request and attribution-input contract, so changed contracts cannot resume. Broad queries that time out are split into exhaustive date windows with the same terms.
- Organizations and company-name contributors go to `Sheet4` as `CORPORATE`, never into the employee tiers; this is a grouping, not proof of treasury funding. Transaction role comes from form, line and transaction evidence; missing role evidence keeps a provisional, flagged amount rather than a zero.

## Cross-reference and reconciliation

- The report builder runs the cross-reference process before every workbook export, including cache hits; a row loses its amount only where evidence contradicts it, and receipt size never excludes a row. Each run saves its accounting under `state/cross-reference/<run-id>/`; `tools/run_cross_reference.py` runs it on a quiescent database (default at most 100 new requests, `--offline` for saved evidence only). An online failure retries once offline and records `cross_reference_mode: offline_fallback`.
- Before export, every scoped FEC source ID and its financial facts are compared with the last accepted source; missing or changed facts block publication with a source-change ledger, and the accepted pointer advances only after the workbook is installed.
- `state/accepted-report-sources/` is durable comparison state: back it up with the source databases, and never erase it to force a smaller report through.
- Workbook: `Sheet4` is the single A:G fact table behind every Stats formula; 527 and 501(c) recipients are kept but marked `EXCLUDED_527_501C` and left out of totals; CSV writes are UTF-8 with BOM and atomic.

## Tests

R fixture tests (`tests/test_*.R`) and PowerShell runtime guards make no network calls; one console test skips its ingest case unless the official bulk FEC snapshots are present.
