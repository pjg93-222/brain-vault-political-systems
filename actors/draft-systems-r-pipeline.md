---
type: actor
name: "Draft Systems R pipeline"
aliases: ["Draft Systems", "congress_member_scraper.R"]
category: "pipeline"
description: "Local R (and Python sidecar) code and data root at C:\\Users\\pgoff\\OneDrive\\Desktop\\Draft Systems that produces the Moneyball CU-influence model's legislative, press-sentiment, Census and Ballotpedia inputs for the 119th Congress."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Draft Systems"
stack: "R 4.6.0 (chromote, rvest, httr, jsonlite, dplyr, future/future.apply, progressr, writexl, clipr, igraph, readxl, stringi, xml2, text2vec optional) on Windows 11; Python 3.12 venv .venv_debate (CPU torch 2.12, transformers 5.12, anthropic 0.111); openpyxl for Excel snapshots"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "congress.gov `field=cosponsor` role-swap live behavior still UNVERIFIED (offline-clean only, as of 2026-06-22)"
  - "~3.4 GB of raw data and models live in the folder; Excel/OneDrive locks make writes fall back to timestamped files"
  - "Wayback CDX / archive.org 429 then IP block (WinError 10060) under load; 2 HFSC-Dems Waters releases still pending (2026-06-24)"
  - "quanteda unusable on R 4.6.0 (RcppParallel segfaults on load); no Rtools"
  - "No CUDA GPU: DEBATE fine-tune is CPU-only (~1 hr/epoch base)"
  - "Non-JS parallel full-text fetch has no per-member time cap (budget = Inf) and can stall at ~85%"
  - "59 members have all-NA index dates; Timmons distinct releases not captured; IQ-CMS pages lack a body selector"
  - "Pre-existing quirks left alone: Legislative Score - Normalized formulas reference the row above; cdfi_fund_url_parts decodes to an unclosed JSON array"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-sentiment-template-location.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-sentiment-template-location.md", sha256: "8973640817f243c384c213c1ec60a2d913de304d5882a76db12b7e51f58da3e6"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_integrated_scraper.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_integrated_scraper.md", sha256: "d847e0292c9860eb9d32f7823af6e865f4bbc2b410053565d3a6365711b7a020"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_congress_press_fallbacks.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_congress_press_fallbacks.md", sha256: "2832fbdbe8c81c8cf658448b7e52f8c281aeadd424425c221b77e64518698a95"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/user_r_environment.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\user_r_environment.md", sha256: "4b3db963331292e353d1e0be4ac6e238a7f81e451bc60a806719c97d3963316f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_ballotpedia_cu_influence.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_ballotpedia_cu_influence.md", sha256: "286dd88b0fb65098724a2d920d12b56a48305ebe4e89f359730cb62b760d4067"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_census_cd_scraper.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_census_cd_scraper.md", sha256: "b208715d9746b5d2afba36b8b43722d042fd65338c139e1ef51362840bb35855"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_congress_scraper.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_congress_scraper.md", sha256: "cee61c688ca2e469d0d63a8331f106f4c24f41f05d2ca11236bdf8619b5289ae"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Draft Systems R pipeline

> The `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\` folder: R/chromote/rvest scrapers and a Python DEBATE sidecar that feed the Moneyball CU-influence model ([[melange-systems]], where "Draft Systems" is folded in as an alias). It holds the congress.gov member scraper, the CU press-release scraper with its fallback chain and fast collector, the Stage 5 stance/tone pipeline, the Census CD scraper and the Ballotpedia CU-influence scraper, plus ~3.4 GB of raw data and models (e.g. `debate_finetuned`).

## Parts

- [[draft-systems-r-pipeline-layout-and-knobs]] — Where the Draft Systems R pipeline lives on disk, its script inventory, and its environment variables and knobs.
- [[draft-systems-r-pipeline-architecture]] — Architecture of the six Draft Systems R scrapers and stages: the congress.gov member scraper, the CU press-release scraper, the fast collector and driver, Stage 5 stance and tone, and the Census and Ballotpedia scrapers.
- [[draft-systems-r-pipeline-code-catalogue]] — Code-level catalogue of the Draft Systems R pipeline: congress.gov markup and parser facts, press-scraper regex and scoring traps, the collector and coverage incident catalogue, and Ballotpedia and Census code facts.

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\` (local folder, no git remote recorded) |
| Stack | R 4.6.0 at `C:\Program Files\R\R-4.6.0\bin\Rscript.exe` (not on PATH), chromote/rvest/httr/future, Python 3.12 `.venv_debate` (CPU torch + transformers), openpyxl, igraph |
| Status | active (June 2026 build; deployed `debate_finetuned` 2026-06-24; template location recorded 2026-06-30) |
| Criticality | high (sole source of the model's legislative, press, Census and Ballotpedia layers) |
| PCI | no |
| Team | none |

Sibling folder: `Melange Systems` holds only Excel mirrors and scored outputs (`CU_Press_Stance_Tone.xlsx`, `cu_press_releases_scored.xlsx`); the live R pipeline and data are NOT there (see Where things live in [[draft-systems-r-pipeline-layout-and-knobs]]).

## Dependencies

- **Upstream data sources:** congress.gov advanced search (Cloudflare-protected; ~5 requests/s sustained cap) and member bill pages; member `.house.gov`/`.senate.gov` press sites; govinfo BILLSTATUS XML (`https://www.govinfo.gov/bulkdata/BILLSTATUS/119/{s,hr,sjres,hjres}/BILLSTATUS-119{type}{num}.xml`); America's Credit Unions news archive (sitemap); archive.org Wayback CDX; `https://unitedstates.github.io/congress-legislators/legislators-current.csv` (roster; NOT theunitedstates.io, NOT raw.githubusercontent), `committee-membership-current.yaml` and the congress-legislators JSON; Census Bureau API (needs `CENSUS_API_KEY`); MIT Election Lab (MEDSL) files on Harvard Dataverse; Ballotpedia (AWS WAF); House CMO list (`119th_Congress_CMO_List_Feb2026.docx`); LSD2015 dictionary (https://www.snsoroka.com/s/LSDaug2015.zip); HuggingFace `mlburnham/Political_DEBATE_base_v1.0` (and large); Anthropic API (`claude_stance.py` rater).
- **Downstream:** the Moneyball model workbook "Moneyball Main Version - Presentation.xlsx" (sheet "Legislative Score - Raw", Table1, rows 3-535; Press layer; Sub Layer AW:BA for Ballotpedia output) - project [[melange-systems]]; the FEC side of the model is the separate [[melange-fec-pipeline]]. Press-value outputs are delivered as a standalone Excel (`CU_Press_Stance_Tone.xlsx`) and not wired into the model (decision 2026-06-22).
- **Local tooling:** Chrome (real headful for Cloudflare, headless for chromote lanes), Excel (locks outputs), OneDrive (locks outputs), Python 3.12 via winget, HF hub cache (offline mode).
- **Related notes:** the model-centric stance view is in CU stance and sentiment scoring and [[debate-stance-model]]; the Excel model build is in [[2026-06-feature-moneyball-excel-model-build]]; the full June 2026 history and every audit round is in [[2026-06-feature-congress-r-scrapers]]; environment traps in Tooling and environment traps. Owner/user: [[paul-goff]].

## Flows

- congress.gov roster + 17 `*_url_parts` templates -> `congress_member_scraper.R` (17 sections x 3 roles x all members) -> `Moneyball_Legislative_Score_<ts>.xlsx` (Legislative Score - Raw, 138 cols) -> pasted into the Moneyball workbook.
- congress.gov bill cosponsor pages (Stage 3) -> `congress_cosponsor_network_<ts>.xlsx` (directed sponsor -> cosponsor graph, igraph centrality).
- member sites / committee newsrooms / ACU news / govinfo BILLSTATUS -> `cu_text_collector.R` (bodies into `pr_checkpoints/fulltext/<bg>.rds`) -> `cu_press_release_scraper.R` (index, score, categories, coalitions) -> `run_stage5.R` (DEBATE + LSD) -> `cu_press_stance_tone.csv` + `cu_press_value_by_category[_wide].csv` -> `make_standalone.py` -> `CU_Press_Stance_Tone.xlsx`.
- Census API + congress-legislators CSV -> `census_cd_scraper.R` -> `Congressional_District_Census_Data.xlsx`.
- congress-legislators JSON/YAML + MEDSL + CMO officers CSV -> `ballotpedia_119th_cu_scraper.R` -> `Ballotpedia_119th_CU_Influence_<stamp>.xlsx`.
- `sample_for_labeling.R` -> `cu_stance_label_set.csv` (human_label) -> `run_retrain_human.R` / `finetune_debate.py --labels` -> `debate_finetuned/` -> `CU_S5_DEBATE_MODEL=debate_finetuned Rscript run_stage5.R`.

## Dev Commands

```bash
# R lives at C:\Program Files\R\R-4.6.0\bin\Rscript.exe (NOT on PATH); from PowerShell use the call operator
& "C:\Program Files\R\R-4.6.0\bin\Rscript.exe" file.R
# offline syntax check / helper testing (never fire the live scraper from the assistant side)
Rscript.exe -e "invisible(parse('file.R'))"

# env vars: PowerShell form (bash form `CU_TC_PROCS=12 Rscript x.R` does NOT work in PowerShell)
$env:CU_TC_PROCS=12; $env:CU_PR_WORKERS=6; Rscript "C:\...\x.R"
# RStudio console form (system2 children inherit the session env)
Sys.setenv(CU_TC_PROCS="12"); source("C:/.../x.R")

# congress.gov member scraper (remote mode workflow)
launch_scrape_chrome()                 # real headful Chrome, solve captcha once
validate_http()                        # confirm cookie-replay path
RUN_FULL <- TRUE; source("congress_member_scraper.R")
validate_original("<bill detail link>")  # confirm original-cosponsor markup live
Rscript check_url.R                    # assembled URL must equal expected_url.txt (6922 chars, "Ann+Wagner")
Rscript offline_checks.R               # templates/JSON/decay/columns/CSV

# press pipeline (ONE command; do NOT run cu_press_release_scraper.R directly with FULLTEXT_MODE="all")
Rscript run_cu_pipeline.R
CU_TC_PROCS=6 CU_PR_WORKERS=6 Rscript run_cu_pipeline.R      # best 6-worker run (bash-style, see PowerShell form above)
CU_PIPE_FETCH_RESIDUAL=1 Rscript run_cu_pipeline.R           # obsolete after 2026-06-19 (redundant double chromote)
CU_PIPE_SKIP_COLLECT=1 Rscript run_cu_pipeline.R             # re-score from cache (cache-only restart)
CU_PIPE_COLLECT_ONLY=1 Rscript run_cu_pipeline.R             # stop after collect
CU_PR_OFFLINE=1 Rscript cu_press_release_scraper.R           # score from cache, no network (skips news+cosponsor)
Rscript cu_text_collector.R                                  # orchestrator (launches CU_TC_PROCS workers)
Rscript cu_text_collector.R <i> <n>                          # one worker shard
CU_TC_ONLY="B001303,..." CU_TC_CAP=0 CU_TC_PROCS=8 Rscript cu_text_collector.R   # targeted member re-fetch
CU_TC_ONLY=T000480 CU_TC_CAP=0 CU_TC_PROCS=1                 # Timmons re-fetch (after clearing T000480.rds)
Rscript regen_outputs_offline.R                              # rebuild outputs from checkpoints (no scrape)
Rscript coverage_audit.R                                     # coverage verifier
Rscript maint_audit.R ; Rscript maint_clean.R                # fulltext trash audit / junk-body removal
Rscript refresh_truncated_indexes.R                          # one-time sitemap expansion of 38 truncated indexes
Rscript test_cu_scoring_offline.R                            # 179/179 PASS (CU_PR_NO_AUTORUN=1 to source without running)
Rscript eval_cu_scoring.R ; Rscript robust_cu_check.R ; Rscript audit_live_run.R ; Rscript verify_live_outputs.R

# Stage 5 (stance + tone)
CU_S5_DEBATE_MODEL=debate_finetuned Rscript run_stage5.R     # env var REQUIRED, else base model silently used
Rscript run_retrain_human.R                                  # fine-tune on cu_stance_label_set.csv (back it up first; rewrites split col)
python make_standalone.py                                    # rebuild CU_Press_Stance_Tone.xlsx
Rscript validate_stage5.R sample N                           # blind stratified labeling template
Rscript validate_stage5.R score                              # DEBATE-vs-human, regex-vs-human accuracy/F1/kappa
Rscript run_accuracy_push.R                                  # sample -> Claude pre-label -> fine-tune -> predict test -> report
pip install anthropic                                        # needed for claude_stance.py (ANTHROPIC_API_KEY in project .Renviron)
# offline HF: HF_HUB_OFFLINE=1  TRANSFORMERS_OFFLINE=1

# Ballotpedia
SKIP_ELECTIONS <<- TRUE; run_scrape(resume=FALSE)            # 537-row table in ~1 min, then delete bp119_checkpoint.rds
Rscript _bp119_selftest.R ; Rscript _bp119_committee_test.R

# Census validators (auto-pick newest Congressional_District_Census_Data*.xlsx)
Rscript _robustness.R ; Rscript _verify_names.R

# safe process kills (never blanket-kill the user's browser)
taskkill /F /T /PID <deploy.cmd pid>
Get-Process Rscript | Stop-Process -Force    # + tree-kill only chrome.exe whose CommandLine has --headless and NOT --type=
Start-Process -WindowStyle Hidden run_push.cmd   # detached Windows process for the fine-tune push
```

## Known Issues

- **Role swap unverified live:** `field=cosponsor` behavior of `apply_role()` was offline-clean only on 2026-06-22 (the 51-pass scrape nevertheless completed 2026-06-24 and Stage 3's `*` detection works: 1941 original ties).
- **Cloudflare/AWS WAF:** congress.gov challenges everything without cookie replay; Ballotpedia is behind AWS WAF (HTTP 202 `x-amzn-waf-action: challenge` stub, not Cloudflare); gov WAFs throttle the hot collector pass; some sites are fully JS-rendered shells (Ritchie Torres; Indigov family).
- **Silent-failure traps recorded:** `CU_PR_NO_CHROMOTE` leaking into the collector environment (fixed with per-component switch); future-exported closures capturing a 2 GB `full` frame (silent serial fallback); CDX helpers returning NULL on non-200 (fixed with `cdx_get`); `suppressWarnings(as.Date(...))` not catching errors; a 503 without Retry-After producing `numeric(0)` in `if`; stdout-log buffering misread as "no progress".
- **Open data gaps:** TCPA category has 0 CU-relevant releases (coverage reality); 14 House members NA in MEDSL (5 territory delegates + ~9 2025 special-election/appointees); 59 members with all-NA index dates; IQ-CMS pages lack a body selector; `weighted_tone` triple loop and `flush_ck` O(n squared) not optimized.
- **Eval corpora are in-sample:** every 1.000 score is a regression gate, not a field-accuracy estimate; build a fresh adversarial set before the next lexicon change.
- **Excel/OneDrive locks:** outputs open in Excel are LOCKED; `safe_write()` emits timestamped fallbacks (`cu_press_releases_scored_HHMMSS.xlsx`; stale in-place files exist: `scored.xlsx` 484 rows, `all_press_release_index.csv` 227,698 as of 2026-06-12); the Census workbook falls back to a timestamped copy on "Permission denied".
- **API key hygiene:** a live API key was pasted in chat during the accuracy push (2026-06-21) and the user was advised to rotate it; keys live only in project `.Renviron` files (key material not recorded).

## Standing rules (recorded as rules for this system)

- **Chunked verbatim congress.gov URL; never JSON.** Why: JSON rebuild produced zero results and RStudio truncates ~4096-char lines. How to apply: keep chunked `paste0`, verify with `check_url.R` after any placeholder/URL edit.
- **Run the pipeline, not the monolith.** Why: serial per-member httr with `FULLTEXT_MODE="all"` is the 10h trap. How to apply: `Rscript run_cu_pipeline.R`.
- **Give each component its own env switch.** Why: `CU_PR_NO_CHROMOTE` leaked into the collector and silently disabled chromote. How to apply: collector uses `CU_TC_NO_CHROMOTE`.
- **Define worker functions at top level.** Why: closures in a frame holding `full` exceeded `future.globals.maxSize` (500 MB) and silently ran serial.
- **Never blanket-kill by name.** Why: `Stop-Process` by name kills the user's browser. How to apply: `taskkill /F /T /PID <pid>` or tree-kill only headless Chrome roots.
- **Do not hand the live scraper to the assistant side.** Why: needs Chrome + network and rate-limit risk on congress.gov. How to apply: parse-check offline with Rscript; the user runs live in RStudio; use the PowerShell env-var form.
- **Fine-tuned model env var REQUIRED** (`CU_S5_DEBATE_MODEL=debate_finetuned`), else Stage 5 silently rescored with the base model.
- **Back up `cu_stance_label_set.csv` before retraining** (the retrain rewrites its `split` column, seed 42).
- **User declined** `classify_last_action` cross-match tightening, first-`<strong>` title risk, `li.expanded` fallback ordering and the "terms (all OR)" comment fix (2026-06-10): do not re-apply without asking.
- **Reintroductions and reposts both count** (URL-only dedup intentionally left).
- **Press classification is the user's domain**; `human_label` overrides, never relabel.

## History (dated)

| Date | Event |
|---|---|
| 2026-06-02 | Cloudflare bypass, cookie-replay fast path, 536-member first run (1773 bill rows), placeholder and accent fixes |
| 2026-06-10 | Official-name roster, single-result layout, pinned roster, bug-audit fixes 1-7, press scraper created |
| 2026-06-11 | `MEMBER_FILTER` 537 names, categories, net-by-category sheet (24 -> 46 cols), first live run |
| 2026-06-12 | Fallback chain, audits rounds 1-3 (190,782 -> 227,698 -> 230,866 indexed) |
| 2026-06-14/15 | Graded scoring, coalitions, committee newsrooms, anti-big-bank, 7 audit passes |
| 2026-06-16 | Census scraper |
| 2026-06-17/18 | Ballotpedia restructure, MEDSL, party-leadership bioguide fix, news/cosponsor stages, ACU harvest, 537-member hand grind (0 new bills), collector and pipeline created |
| 2026-06-19 | Collector crash/coverage fixes, `CU_PR_NO_CHROMOTE` leak fix, validity verdict, `CU_TC_CAP`, procs 6 -> 8 |
| 2026-06-20 | Sitemap completion, ACU news fix, junk guards, dedup fix, decay added then reverted, watchdog, parallel scoring, REVIEW Act fix |
| 2026-06-21 | Year filter + decay re-restored (2022 floor), news attribution fix, capture-bug fix, `CU_TC_ONLY`, DEBATE/LSD overhaul, 45-label validation, accuracy-push scripts; `congress_moneyball_integrated.R` built |
| 2026-06-22 | Fine-tuned base DEBATE 87.2%; standalone Excel decision; integrated logic into `congress_member_scraper.R`; looped pivot (superseded) |
| 2026-06-23 | `MAX_CHALLENGED_BEFORE_ABORT=40`; Stage 3 SNA edges |
| 2026-06-24 | 51/51 passes, 138-col single workbook, retry/backoff, stage decoupling + guardrails, `debate_finetuned` deployed to 3,701 releases |
| 2026-06-30 | Template location recorded: `cu_stance_label_set.csv` in Draft Systems (552 rows) |

Superseded items kept for context: ~~year filter + decay removed (2026-06-20 "we are re-winding")~~ -> re-restored 2026-06-21; ~~`DECAY_PER_CONGRESS=0.5` all counts~~ -> 0.8 on 3 counts (2026-06-22); ~~roles as separate verbatim URL vectors~~ -> field-token swap; ~~caucus Chair 1.0/Co-Chair 0.75/Member 0.5~~ -> leadership-only; ~~`CU_TC_PROCS` 6~~ -> 8; ~~stdout-log stall guard~~ -> `.hb` sentinels + per-shard watchdog.

## Related Actors

- [[debate-stance-model]] - Fine-tuned Political DEBATE NLI stance model (CPU) plus Lexicoder LSD tone; replaced the regex scorer in Stage 5 of the CU press pipeline
- [[melange-fec-pipeline]] - Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch

## Related Topics

- [[2026-06-feature-congress-r-scrapers]] - June 2026 R scraper family in Draft Systems: congress.gov 17x3, CU press releases, Census CD, Ballotpedia, DEBATE stance
- CU stance and sentiment scoring - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- [[2026-06-feature-moneyball-excel-model-build]] - June 2026 build of the 533-member Moneyball workbook: four buckets, percentile-rank blend, calibration, scenario tooling
- Tooling and environment traps - Feedback rules for tool/shell traps: heredoc mangling, MEMORY.md loading contract, visible PowerShell, congress.gov URL kept verbatim.
- [[2026-06-feature-cu-stance-and-sentiment-june-stage5-template-and-cfpb-split]] — June 2026 stance work: the labeling template and re-run recipe, the CFPB directional split in the workbook, and the Stage 5 overhaul and deploy.
- [[2026-06-feature-moneyball-excel-model-build-scenario-tools-and-calibration]] — The scenario tools of 2026-06-26/27: the pre-flight audit and engine build (coalition determinism, what-if and electoral models, money response, pathfinding, scenario runner, optimizer, independent audits, FEC data quality) and the empirical calibration.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related People

- [[paul-goff]] - Vault owner (336621699+pjg93-222@users.noreply.github.com); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11.
