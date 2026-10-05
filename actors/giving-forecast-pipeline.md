---
type: actor
name: "Giving Forecast pipeline (contracts and refit)"
aliases: ["Giving Forecast refit", "giving-models-v2 bundle"]
category: "pipeline"
description: "The Giving Forecast's R refit pipeline and its two JSON contracts (model bundle v2, anchor snapshot v1): rebuilds models from 121 pinned inputs, gates G0-G9, publishes immutable versions behind a pointer."
repository: "C:\\Users\\pgoff\\Mentat (mentat/forecast/refit, mentat/forecast/contracts, mentat/forecast/anchors)"
stack: "R 4.6.0 (Rscript; vendored clubSandwich 0.7.0 and sandwich 3.1-3), Python consumer and validator (mentat/app/giving_forecast.py, contract.py), JSON Schema keyword subset, Glass Box events"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "Three House-share G6 cells (banks, credit unions, auto) published under Paul's explicit waiver of 2026-09-30, plus a pre-existing quiet banks-lobbying waiver"
  - "G9 warns that the log-lobbying refit (MAE 4.050) does not beat the naive baseline (3.936)"
  - "Local console restart and Windows scheduled-task registration stay dormant under the owner's pod-only instruction (as of 2026-09-30)"
sources: []
doc_sources:
  - path: "C:\\Users\\pgoff\\Mentat\\mentat\\forecast\\contracts\\README.md"
    sha256: "b8729f09aa93f3be8575d6458e80630a56358efa120dffcaa1691f40af928210"
    as_of: "2026-10-01"
  - path: "C:\\Users\\pgoff\\Mentat\\mentat\\forecast\\refit\\README.md"
    sha256: "d6fc72d2b730d899cb1d9fbb77f663503e8fa2776458f0c2119af1a6bd13591a"
    as_of: "2026-09-30"
  - path: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain\\brains\\melange-systems-brain\\DECISIONS.md"
    sha256: "ae67fa84e2d8fb05364ce264b4c9e5a3c31bec5c1c9f6620229ddf08c7f21f34"
    as_of: "2026-10-05"
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-05
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Giving Forecast pipeline (contracts and refit)

> The R refit pipeline that rebuilds the Giving Forecast models from pinned raw inputs, and the two JSON contracts that carry its output and Mentat's own levels to the console calculator, with gated, immutable, pointer-switched publishing.

> [!info] Source and status
> Summary of `mentat/forecast/contracts/README.md` (last committed 2026-10-01) and `mentat/forecast/refit/README.md` (last committed 2026-09-30) in the Mentat repo. Rulings and project state live in [[forecast-redesign]]; this note records the mechanics.

## Details

| Field | Value |
|---|---|
| Repository | Mentat repo: `mentat/forecast/refit` (R), `mentat/forecast/contracts`, `mentat/forecast/anchors` |
| Stack | R 4.6.0 with a vendored package library; Python consumer `mentat/app/giving_forecast.py` |
| Status | active; v2 bundle published on the RunPod pod on 2026-09-30 after explicit waivers |
| Team | none |

## Dependencies

- Feeds the calculator in [[mentat-console]] (`mentat/app/giving_forecast.py`), which refuses a bundle whose anchor contract it does not implement and refuses projection when anchors are missing or stale.
- Reads 121 sha256-pinned inputs listed in `registry/inputs.json` (OpenSecrets captures, FEC candidate masters, IBISWorld, CPI, control and LobbyView workbooks, market files, and Codex design files as parity references only); each file is copied into a raw vault keyed by its hash, so a Downloads or Temp clean-up cannot break a refit.

## Flows

- **Two contracts, one schema each.** The model bundle v2 (producer `rf_bundle.R`) and the anchor snapshot v1 (producer `build_giving_anchors.py`, read-only over Mentat) each have one JSON Schema, one example and 16 shared negative controls that must fail; the R and Python validators implement the same keyword subset, and cross-field rules live in code (`check_model_invariants`, `check_anchor_invariants`). The convention follows brain dead end DE-021; see [[contract-fixture-discipline]].
- **What the calculator applies.** PAC: a relative (log) change on Mentat's previous-cycle level, shown twice (the roster PACs' own giving to candidates, and general giving). Partisan share: a percentage-point change on Mentat's previous-cycle R share, on employee and PAC bases. Lobbying: `lobby_model.log_refit` as a relative change on the latest complete year's Melange LDA level, with outside-firm income and in-house expenses kept side by side, never summed. Seats are evidence only (`calculator: false`).
- **Slope and anchor rules.** Each industry's applied slope comes from an automatic choice among pooled (R0), own (R1) and partially pooled DerSimonian-Laird (R2) slopes; the share anchor is chosen per industry and chamber, and same-phase replaces the default previous-cycle anchor only when it wins by at least 5% in both backtest designs (brain D-065). Owner rulings of 2026-09-30 deviate from SPEC 3.12 in five named ways, including Polymarket Jan-Jun 2026 as the primary control input.
- **Anchors exclude non-giving.** Since the owner ruling of 2026-10-01, anchor levels leave out receipts the accounting engine buckets as non-giving (interest, refunds, insurance claims, loans), while the full funding split is kept; the console refuses an anchor whose workbook hash differs from the published workbook.
- **Refit run.** Gates G0 environment, G1 inputs, G2 parity, G3 panels, G4 sample adequacy (warn), G5 stability (hold), G6 hard backtest gate (no existing industry's leave-one-election-out MAE may exceed the published calculator's), G7 bundle schema (fail), G8 consumer smoke (hold if no calculator), G9 beats naive (warn). Decision: any FAIL, else any HOLD, else PUBLISH. Publishing writes immutable `versions/<sha256>/` files and switches `giving-models-current.json` atomically; v1 stays for rollback, and the publisher makes no git commit.
- **Refit agent.** `--mode detect` scans Mentat's report directory read-only and queues unknown industries; an industry missing inputs ends as `WAITING_FOR_DATA` (exit 0), not a failure; `--rollback <model_version>` restores a version (brain D-068).

## Dev Commands

```bash
Rscript run_refit.R --mode parity          # rebuild and compare; never publishes
Rscript run_refit.R --mode detect          # read-only scan for new industries
Rscript run_refit.R --mode refit [--industry <id>] [--publish auto|never]
Rscript run_refit.R --rollback <model_version>
Rscript tests/testthat.R                   # parity suite
```

## Known Issues

- The 2026-09-30 pod refit was held at first because House-share MAE rose for banks (1.053 to 1.550), credit unions (1.522 to 1.836) and auto (1.338 to 1.766); Paul authorized "Waive these three cells and publish", and every other G6 cell keeps the no-degradation rule.
- G9 warns that the log-lobbying refit does not beat naive (MAE 4.050 against 3.936); G4 warns that auto lobbying is withheld.
- Parallel runs are bit-identical to serial runs on one platform; across platforms results agree to about 1e-13, so bundles are compared with tolerances, never byte equality.

## Related Projects

- [[forecast-redesign]] — the project that owns the rulings, waivers and model state this pipeline implements.
