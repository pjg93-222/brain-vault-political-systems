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
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Draft Systems R pipeline

> The `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\` folder: R/chromote/rvest scrapers and a Python DEBATE sidecar that feed the Moneyball CU-influence model ([[melange-systems]], where "Draft Systems" is folded in as an alias). It holds the congress.gov member scraper, the CU press-release scraper with its fallback chain and fast collector, the Stage 5 stance/tone pipeline, the Census CD scraper and the Ballotpedia CU-influence scraper, plus ~3.4 GB of raw data and models (e.g. `debate_finetuned`).

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\` (local folder, no git remote recorded) |
| Stack | R 4.6.0 at `C:\Program Files\R\R-4.6.0\bin\Rscript.exe` (not on PATH), chromote/rvest/httr/future, Python 3.12 `.venv_debate` (CPU torch + transformers), openpyxl, igraph |
| Status | active (June 2026 build; deployed `debate_finetuned` 2026-06-24; template location recorded 2026-06-30) |
| Criticality | high (sole source of the model's legislative, press, Census and Ballotpedia layers) |
| PCI | no |
| Team | none |

Sibling folder: `Melange Systems` holds only Excel mirrors and scored outputs (`CU_Press_Stance_Tone.xlsx`, `cu_press_releases_scored.xlsx`); the live R pipeline and data are NOT there (see Where things live).

## Dependencies

- **Upstream data sources:** congress.gov advanced search (Cloudflare-protected; ~5 requests/s sustained cap) and member bill pages; member `.house.gov`/`.senate.gov` press sites; govinfo BILLSTATUS XML (`https://www.govinfo.gov/bulkdata/BILLSTATUS/119/{s,hr,sjres,hjres}/BILLSTATUS-119{type}{num}.xml`); America's Credit Unions news archive (sitemap); archive.org Wayback CDX; `https://unitedstates.github.io/congress-legislators/legislators-current.csv` (roster; NOT theunitedstates.io, NOT raw.githubusercontent), `committee-membership-current.yaml` and the congress-legislators JSON; Census Bureau API (needs `CENSUS_API_KEY`); MIT Election Lab (MEDSL) files on Harvard Dataverse; Ballotpedia (AWS WAF); House CMO list (`119th_Congress_CMO_List_Feb2026.docx`); LSD2015 dictionary (https://www.snsoroka.com/s/LSDaug2015.zip); HuggingFace `mlburnham/Political_DEBATE_base_v1.0` (and large); Anthropic API (`claude_stance.py` rater).
- **Downstream:** the Moneyball model workbook "Moneyball Main Version - Presentation.xlsx" (sheet "Legislative Score - Raw", Table1, rows 3-535; Press layer; Sub Layer AW:BA for Ballotpedia output) - project [[melange-systems]]; the FEC side of the model is the separate [[melange-fec-pipeline]]. Press-value outputs are delivered as a standalone Excel (`CU_Press_Stance_Tone.xlsx`) and not wired into the model (decision 2026-06-22).
- **Local tooling:** Chrome (real headful for Cloudflare, headless for chromote lanes), Excel (locks outputs), OneDrive (locks outputs), Python 3.12 via winget, HF hub cache (offline mode).
- **Related notes:** the model-centric stance view is in [[2026-06-feature-cu-stance-and-sentiment]] and [[debate-stance-model]]; the Excel model build is in [[2026-06-feature-moneyball-excel-model-build]]; the full June 2026 history and every audit round is in [[2026-06-feature-congress-r-scrapers]]; environment traps in [[2026-06-working-agreement-tooling-and-environment-traps]]. Owner/user: [[paul-goff]].

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

## Where things live

- **Code root:** `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\` (R at `C:\Program Files\R\R-4.6.0\bin\Rscript.exe`; `.Renviron` with `CENSUS_API_KEY` at `C:\Users\pgoff\OneDrive\Documents\.Renviron`, which is what `path.expand("~")` resolves to; the project also has its own `.Renviron` for the Claude rater key).
- The CU press **sentiment/stance** R pipeline and its live data are in Draft Systems, NOT in `Melange Systems` (which holds only Excel mirrors + scored outputs like `CU_Press_Stance_Tone.xlsx` / `cu_press_releases_scored.xlsx`). (Recorded 2026-06-30, `cu-sentiment-template-location`.)
- **The labeling template fed to R = `cu_stance_label_set.csv`** (Draft Systems). Generated by `sample_for_labeling.R` (writes `text_snippet` + a blank `human_label` column to fill: support/oppose/neutral). Consumed by `measure_stage5.R`, `run_retrain_human.R`, `run_accuracy_push.R`, `fulltext_backfill.R`, and passed to `finetune_debate.py --labels`.
- `cu_stance_label_set.xlsx` (copies in BOTH folders) is a human-review **mirror** (tabs "To Rework" / "Done (locked)"); R never reads it. Its `split` column (train/test/batch2) differs from the CSV's (train/test/exclude) even though both hold the same 552 rows + identical labels (164 pre_label != human_label).
- Press classification stays the user's domain - `human_label` is the override column; never relabel. Related: `press-classification-user-domain`, `moneyball-model-config`.
- Checkpoints: `pr_checkpoints/` (roster_v2.rds, discovery, index, `fulltext/<bg>.rds`, `CMTE_*.rds`), `congress_scrape_checkpoint.rds` (+ `.bak_*`, e.g. `.bak_20260623_131614`), `congress_cosponsor_checkpoint.rds`, `moneyball_progress.rds` (old integrated script), `bp119_checkpoint.rds`, `cf_session.rds`, `roster_119_names.rds` (pinned order), `collector_plan.rds`, `collector_shard_i.{log,pid,hb,done}`, `collector_residual.csv`.

## Script inventory

| Script / file | Purpose |
|---|---|
| `congress_member_scraper.R` | Current home of the integrated 17 sections x 3 roles scraper (self-locating, checkpointed, 3 stages) |
| `congress_search_urls.R` | The 17 verbatim `*_url_parts` chunk vectors (sheet order) |
| `congress_member_scraper_examination_query_backup.R` | Old query variant preserved verbatim (examination/supervision/CTR/SAR, `original-cosponsor`) |
| `congress_scraper_looped.R` | Superseded 2026-06-22 "simple" looped variant |
| `congress_moneyball_integrated.R` | Superseded 2026-06-21 per-member 17-topic scraper |
| `check_url.R`, `expected_url.txt`, `offline_checks.R` | URL/template verification |
| `legscore_current_raw.csv` | Python snapshot (openpyxl on a temp copy) of the Legislative Score - Raw sheet |
| `cu_press_release_scraper.R` | 5-stage press scraper (+4c committees, 4d news, 4e cosponsors) and Stage 5 scorer/outputs (~4.3k lines) |
| `cu_text_collector.R`, `run_cu_pipeline.R` | Fast async collector; one-command driver |
| `manual_cu_news.csv`, `member_x_handles.csv`, `members_searched.csv`, `member_coverage_audit.csv`, `bill_sponsorship_coverage.csv` | Third-party/manual inputs and coverage artifacts |
| `run_stage5.R`, `stage5_lsd.R`, `stage5_debate.py`, `parse_lsd.R`, `lsd_dict.rds`, `lsd_raw/`, `.venv_debate/`, `validate_stage5.R` | Stage 5 stance/tone |
| `sample_for_labeling.R`, `claude_stance.py`, `finetune_debate.py`, `measure_stage5.R`, `run_accuracy_push.R`, `run_push.cmd`, `run_retrain_human.R`, `fulltext_backfill.R`, `make_standalone.py`, `recover_3.R` | Labeling, fine-tune, accuracy and standalone-Excel tooling |
| `census_cd_scraper.R`, `_robustness.R`, `_verify_names.R` | Census |
| `ballotpedia_119th_cu_scraper.R`, `_parse_cmo_docx.R`, `_cmo_feb2026_officers.csv`, `cu_caucus_members.csv`, `manual_cu_caucus_members.csv`, `_bp119_selftest.R`, `_bp119_committee_test.R`, `medsl_house.csv` | Ballotpedia |
| `debate_finetuned/`, `debate_finetuned_base`, `cu_stance_accuracy_report.txt`, `cu_stance_accuracy_report_base.txt` | Models and reports |
| `test_cu_scoring_offline.R`, `eval_cu_scoring.R`, `robust_cu_check.R`, `audit_live_run.R`, `verify_live_outputs.R`, `regen_outputs_offline.R`, `coverage_audit.R`, `maint_audit.R`, `maint_clean.R`, `refresh_truncated_indexes.R` | Harnesses and maintenance utilities |

## Environment variables and knobs

| Variable / constant | Meaning |
|---|---|
| `CU_TC_PROCS` | collector worker processes (default 6, raised to 8 on 2026-06-19; 12 used 2026-06-20) |
| `CU_TC_TOTAL_CON` / `HOST_CON` / `CHUNK` (1500) / `FLUSH` (8000) / `LIMIT` | collector tuning (`TOTAL_CON` 24 -> 40; gentle recovery uses total_con 8, host_con 2) |
| `CU_TC_CAP` | signal-prioritized cap per member (default 1000; 0 = full fetch); `CU_TC_CAP_MIN=300` absolute orchestrator cap in minutes |
| `CU_TC_ONLY` | comma-separated bioguide allowlist for targeted re-fetch |
| `CU_TC_SHARD` | "i/n" worker role; `CU_CKPT_DIR` alt store |
| `CU_TC_NO_CHROMOTE` | collector's own chromote kill switch (independent of the scraper's) |
| `CU_TC_WATCHDOG_MIN` (10) / `CU_TC_MAX_RESPAWN` (2) | per-shard stall watchdog |
| `CU_PR_WORKERS` | `FUTURE_WORKERS` (default 24 for Stage 4; 4-6 in the pipeline step 2) |
| `CU_PR_FT_DELAY` | `FULLTEXT_DELAY`, default 0.15s (Wayback/discovery/index stay 0.5s `POLITE_DELAY`) |
| `CU_PR_OFFLINE`, `CU_PR_SKIP_FETCH`, `CU_PR_NO_CHROMOTE`, `CU_PR_NO_AUTORUN` | scraper switches (offline scoring, no fetch, no chromote, source without running) |
| `CU_PR_NEWS` / `CU_PR_COSPONSORS` / `CU_PR_COMMITTEES` | toggle Stage 4d / 4e / 4c (FALSE disables) |
| `CU_PR_NEWS_MAX` | `NEWS_MAX_ITEMS` (400 -> 3000) |
| `CU_PR_DECAY_HALFLIFE` | `DECAY_HALFLIFE_YEARS`, default 2y; 0/Inf/NA disables |
| `CU_PIPE_SKIP_COLLECT`, `CU_PIPE_COLLECT_ONLY`, `CU_PIPE_FETCH_RESIDUAL`, `CU_PIPE_SKIP_STAGE5` | `run_cu_pipeline.R` knobs |
| `CU_S5_DEBATE_MODEL` | model dir for Stage 5 (REQUIRED for the fine-tuned model) |
| `CU_S5_LIMIT` / `BATCH` / `INTENSITY` / `SKIP_DEBATE` / `BILL_WEIGHT` (0.03) | `run_stage5.R` knobs |
| `CU_FT_EPOCHS` | fine-tune epochs, default 3 |
| `X_BEARER_TOKEN` | optional X/Twitter API v2 ingestion (`ingest_tweets_api`) |
| `CENSUS_API_KEY`, `ANTHROPIC_API_KEY`, `DATAVERSE_TOKEN` | credentials (names only) |
| `HF_HUB_OFFLINE=1`, `TRANSFORMERS_OFFLINE=1` | offline model use |

Note on the command block above: invocation forms for the harness and maintenance scripts are inferred from their script names (the sources record the scripts and their purpose, not always the exact command line); the env-var, pipeline, Stage 5, Ballotpedia and kill commands are recorded verbatim.

## Architecture 1: congress.gov member scraper (`congress_member_scraper.R`)

- Multi-layer R scraper for congress.gov using chromote (to bypass 403), user-agent rotation (later replaced by one consistent `CHROME_UA`, Chrome 148), randomized back-off and `future`/`future.apply` parallelism. Switch variable = the MEMBER (`original-cosponsor` value in an advanced-search query), not page number. Purpose: legislative activity (insurance/data-privacy/financial-services bills) per member across congresses 119/118/117/116.
- **Pipeline stages:** Stage 1 = per-(section,role) passes (`$passes`, 51 + `$scrape_complete`); Stage 2 = bill summaries (`$summaries_done`/`$bills`, Stage 2.2 fills `Congress` from DetailLink, one re-harvest + retry round via `fetch_summary_round`); Stage 3 = cosponsor SNA edges (separate `congress_cosponsor_checkpoint.rds`). Original outputs `Bills_Individual` and `Members_Statistics` (Bill Count facet `#innerbox_congress .count`).
- **Fetch layer:** `FETCH_MODE` `"http"` (default) / `"browser"`; `harvest_cf_session()` (`Network$getAllCookies` -> `cf_session.rds`); parallel `httr::GET` with `plan(multisession, workers=HTTP_WORKERS=6)`; `fetch_html_http()` returns parsed HTML / `"CHALLENGED"` / NULL (any status >= 400 = CHALLENGED; since 2026-06-24 retries timeout/stalled-conn/429/5xx/empty with exp backoff+jitter, `HTTP_MAX_TRIES=3`, `HTTP_TIMEOUT_S=45`, honors Retry-After; 403 -> CHALLENGED re-harvest); the `cf=` session is passed explicitly to workers; challenged members -> re-harvest -> retry -> sequential browser fallback in the main process; `BROWSER_MODE` `"remote"` (default, real headful Chrome via `launch_scrape_chrome()` with `--remote-debugging-port=9222 --user-data-dir=%USERPROFILE%\chrome_scrape_profile`) / `"headless"`; `apply_stealth`, `wait_past_cloudflare` (one `Runtime$evaluate` per poll; evaluate errors -> NA, keep polling); chromote `default_timeout` = `CHROMOTE_TIMEOUT` (120) with `Page$navigate(url, wait_=FALSE)`.
- **Query rule:** URL built from the verbatim encoded link in short chunks joined by `paste0(collapse="")`, only `__MEMBER__` swapped via `sub(..., fixed=TRUE)`; assembled URL 6922 chars ("Ann+Wagner"; template decodes to valid JSON with 3 blocks and 31 keyword conditions, 6942 chars); `build_member_url()` `stop()`s if the placeholder is missing; name encoding `gsub("%20","+",URLencode(enc2utf8(trimws(name)),reserved=TRUE))`. Never rebuild with jsonlite (RStudio console truncates one-line input at ~4096 chars; JSON rebuild gave zero results).
- **Roster:** `get_roster_119()` (536 names from `legislators-current.csv`), official `full_name`-derived names (first non-initial given-name token + `last_name`; "(Nick)" parentheticals stripped), `MEMBER_NAME_OVERRIDES`, `get_pinned_roster()` -> `roster_119_names.rds` (radix sort; superseded by the 533-name sheet roster in the integrated version), `USE_FULL_ROSTER <- TRUE`, hard `stop()` on empty roster, `reconcile_roster()` (`CHECK_ROSTER=TRUE`) and `ACCENT_ASCII_FALLBACK`.
- **Parsers:** `parse_result_node` (`li.expanded` only), `parse_single_bill_page` (one-hit redirect layout; `is_bill_detail_page()` = `h1.legDetail, #summarySelector, #bill-summary`; backup selectors `tr:nth-child(1) a`, `tr:nth-child(2) td`, `li:nth-child(6) a`, `.last`, `strong`, `a ~ a + a`, `#summarySelector a:nth-child(1)`, summary `div#bill-summary > p`), `extract_bill_summary`; cosponsor count from `a[href*='cosponsors']`; status from `<p class="hide_fromsighted">This bill has the status X</p>` (Introduced, Passed House, Became Law, Passed Senate, Resolving Differences, Agreed to in House) with `classify_last_action()` fallback; `member_agg` AvgCosponsors NaN -> 0; success rates per session (`session_rates`); `Bills$Congress` backfill.
- **Integrated design (CURRENT since 2026-06-22):** `source()`s `congress_search_urls.R`; `SECTION_REGISTRY` of 17 `*_url_parts`; loop section -> 3 ROLES -> members; `apply_role()` swaps `%22field%22%3A%22sponsor%22` to `cosponsor`/`original-cosponsor` (asserts exactly 1 token); `DECAY_PER_CONGRESS=0.8` on the 3 count columns only (weighted sum of 0.8^age per bill); self-locating via `get_script_dir()` + `setwd()`; checkpoint `RESUME<-TRUE` -> `congress_scrape_checkpoint.rds` after each of 51 passes; `MAX_CHALLENGED_BEFORE_ABORT=40` (2026-06-23); guardrail 1 (`scrape_complete` lock, `ROLE_KEYS`) and guardrail 2 (`n_fallback` no-regression) (2026-06-24).
- **Outputs:** one workbook `Moneyball_Legislative_Score_<ts>.xlsx`, tabs `Legislative Score - Raw` (138 cols: Name, District/State, 17x8; row 2 = exact Weight row; headers/weights embedded verbatim from "Moneyball Main Version - Presentation.xlsx", python-verified byte-exact; `LEGIS_HEADERS`/`WEIGHTS` truncated to 138, previously 143 with 5 committee/leadership/caucus cols) + `All Interactions` + `Sponsor` / `Original Co-sponsor` / `Co-sponsor`. Per-section col 6 "Success Rate" = `round(mean(SponsorSuccess, OrigCosponsorSuccess),1)` on displayed rates (~3/9129 cells differ 0.1 by R half-to-even vs Excel half-up). District/State via `get_roster_meta_119()` (sen -> state; rep -> "Congressional District N (119th Congress), <State>"). Date = Congress only. Regeneration is OFFLINE-FAST via the SKIP_SCRAPE path once 51/51 passes are cached.
- **Stage 3 cosponsor SNA (`RUN_COSPONSOR_EDGES`, default FALSE then TRUE):** directed sponsor -> cosponsor weighted graph: original cosponsor (trailing `*`) 1.0, regular 0.5, summed per sponsor's bills; nodes keyed by bioguide (`get_member_bioguide()`, `[A-Z][0-9]{6}` from `/member/` href); cosponsors page = DetailLink+`/cosponsors` read from `#main a` filtered to `/member/`, `*` read from the parent cell (`xml2::xml_parent`); igraph weighted in/out strength, in/out degree, closeness+betweenness (weights=1/Weight), eigenvector, pagerank; output `congress_cosponsor_network_<ts>.xlsx` (Edges + Centrality); live: 388 sponsored bills, 2359 edges, 635 nodes, 1941 original ties; NULL/timeout results not cached.
- **Roster facts:** 533 legscore names = 531 voting members (0 missing, verified 2026-06-22) + Eleanor Norton (DC) + Pablo Hernández Rivera (PR), both to be KEPT; AS/GU/MP/VI intentionally absent; no territory-exclusion code. Accented names URL-encode correctly (`Pablo+Hern%C3%A1ndez+Rivera`).
- **Query variants:** disk (older) = examination/supervision/CTR/SAR terms, `original-cosponsor`, 3 subjects; pasted = credit union capital terms (supplement/secondary/subordinated debt/PCA), `sponsor`, 4 subjects (+Housing); later a single phrase "Credit Card Competition Act". Diff the URL block before overwriting; user iterates by swapping `raw_url_parts`.
- **Prior designs (superseded):** `congress_moneyball_integrated.R` (2026-06-21; per-member; 8 topic batches `TOPIC_BATCHES`/`BATCH_PAUSE` 45-90s, `MAX_RETRIES=5`, `RETRY_BACKOFF=30` cap 240, `SITE_COOLDOWN` 180s when >40% fail, `TARGET_RPS=5` with `HTTP_WORKERS=6` because 8/s got 429/503 on ~65%, `DECAY_PER_CONGRESS=0.5`, parallel `fetch_cosponsors_df`/`parse_cosponsors_page`, `validate_original()`, `is_site_error_html`, `FailedFetches`, `ZeroHitMembers`, `RunConfig`, `LegScore_Raw_PASTE` paste C3:EH535, `moneyball_progress.rds`, `progressr` bars; offsets +0..+7 per topic at col `C + 8*(t-1)`) and `congress_scraper_looped.R` (2026-06-22; 51 cols, `DECAY_PER_CONGRESS=1.0`). Fixed there: `length(ra)==1 &&` guard for numeric(0) Retry-After, `isTRUE()` around grepl, `inherits(a,"xml_missing")`.
- **Verbatim table "Maps to Legislative Score - Raw":** Excel Table `Table1`, 533 member rows 3-535, names col A; topic *t* starts at col `C + 8*(t-1)`; +0 Sponsor count, +1 Sponsor avg cosponsors, +2 Orig co-sponsor count, +3 Orig co avg, +4 co-sponsorship count, +5 Success Rate (`=mean(+6,+7)`), +6 Sponsor success %, +7 Orig co-sponsor success %.

## Architecture 2: CU press-release scraper (`cu_press_release_scraper.R`)

- **Scope:** every 119th-Congress member's own .house.gov/.senate.gov site (plain httr + Chrome UA, no Cloudflare machinery) back to the date floor (`as.Date("2020-01-01")` originally, `as.Date("2022-01-01")` since 2026-06-21), scored toward credit unions per `C:\Users\pgoff\Downloads\Moneyball_ACU_Search_Outline.docx`.
- **Stages (checkpointed in `pr_checkpoints/`):** roster (`roster_v2.rds`, keeps first/last/nickname) -> discovery (homepage "press" links + CMS paths, `HOUSE_PATHS_FIRST`/`SENATE_PATHS_FIRST`, pagination qpage0/qpage1/PageNum_rs/path-page via `infer_pagination`; Coverage sheet; `MANUAL_PRESS_URLS`) -> index crawl (title/date/url; date from <=4 anchor ancestors; `MAX_INDEX_PAGES=220`, `MAX_PAGES_UNDATED=40`; 2-miss skip tolerance `misses>=3`) -> Stage 4 full text (`FULLTEXT_MODE` "topical"/"all"; `TOPIC_TIER` core/broad default broad) -> Stage 5 scoring. Additive stages: 4c committee newsrooms (`COMMITTEE_SOURCES`, 14 sources, `COMMITTEE_MAX_ITEMS=80`), 4d `stage_news`, 4e `stage_bill_cosponsors`.
- **Scoring:** generic tone words in CU-mention sentences + weighted pro/anti-CU phrases + stance x position on `BILLS` (53 bills; names match any congress, 119th numbers only for releases >= 2025-01-03; default stance SUPPORT unless a narrow oppose-cue; `BILLS$ambiguous` + `FINANCE_CONTEXT_RX`; `BILL_CATEGORY` must cover every bill; `ALL_BILLS_NAME_RX`/`ALL_BILLS_NUM_RX` pre-filter); `NEUTRAL_BAND=2`; `norm_bill_refs()`; explicit `%m/%d/%y`; stance ladder oppose > `SUPPORT_CUES_RX` > `NEUTRAL_BILL_CUES_RX` > default support; oppose cues judged on mention sentences only; attack verbs only adjacent to the bill name; proximity gap `[^.!?,]{0,25}`; bill numbers case-sensitive with `(?<!['’])`; `CU_TERMS_RX` "credit[- ]union"; `DATE_RX` lookarounds; `PRESS_PATH_RX` additions (`/20\d{2}/\d{2}/`, `[?&]id=`, IQ-CMS `/public/index.cfm/{press-releases,pressreleases,news-releases}`, news releases/announcements, `/category/press-release`, `/media-center`, singular `/release/`, `/chairmans-news|/ranking-members-news`); `\b` on every GEN_PRO_RX/GEN_ANTI_RX stem; `anti_bank_pro` guard; graded layer (`TONE_LEXICON`, `weighted_tone()`, `GRADED_CUTS=c(1,2,3.5,5.5,8)`, `GRADED_STRONG_CAP=0.6`, `AMPLIFY_FACTOR` 1.25, DOWNTONERS 0.75, `score_graded`/`score_label`/`negativity_label`/`polarity`/`pos_weight`/`neg_weight`, `member_lean`/`member_stance`/`member_negativity`); `detect_coalitions` (`COALITION_LEAN_WEIGHT=3.0`, `COALITION_MIN_LEAN=0.05`, `COALITION_MIN_MEMBERS=6`, `COALITION_MIN_SIGNAL=2`, Ward.D2, Euclidean); recency decay (`recency_weight`, `wmean`, `DECAY_HALFLIFE_YEARS`).
- **Categories:** `CATEGORIES` df = 19 Layer-2 categories under 7 Layer-1 groups + "General Credit Union" fallback (`term_rx` `"$^"`); taxonomy of 20 columns includes "Telephone Consumer Protection Act" (0 releases) and "CU-Bank Competitive Dynamics"; conglomerate counts a release once, category nets once per touched category.
- **Outputs:** `cu_press_releases_scored.xlsx` (Scored Releases, Member Summary, Member x Category (net), Member x Category (count), Category Detail, Coverage, Member x Category (graded net), Coalition Members, Coalition Profiles; "Net by Category" tab first) + `cu_press_releases_scored.csv` + `cu_press_releases_category_scores.csv` + standalone `cu_net_scores_by_category.xlsx` ("Net by Category": Member, State, District ("Senate" / "At-Large" / number), 20 categories each with a `(n)` volume twin, Cumulative Net, Total Releases, Sum of Category Nets = 46 cols) + `all_press_release_index.csv`. `MEMBER_FILTER` = the user's 537-name list verbatim (`apply_member_filter()` rewrites `members$member` to the list spelling, keeps `roster_name`; `NICK_EQUIV`, `FILTER_NAME_OVERRIDES`; 537/537 matched). `safe_write()` timestamp fallback. `regen_outputs_offline.R` re-runs Stage 5 + outputs from checkpoints (excludes committees).
- **Maintenance guards:** `is_junk_url()`, `is_junk_body()` (`JUNK_BODY_RX` incl. "JavaScript must be enabled"), `is_junk_title`/`JUNK_TITLE_RX`, `clean_index_title()`, `split_title_overflow()`, `attr_date()`, byte-identical within-member body dedup, `full <- full[!duplicated(full$url),]`, `retry_failed_checkpoints()` (re-discover failed/empty/`scheme=="none"`/truncated), `auto_archive_fallback(org)` (cdx -> sitemap -> wpjson), sitemap completion (`SITEMAP_COMPLETE_MAXPAGES`=2), `.cu_score_row`/`.cu_score_chunk` top-level scorer, parallel scoring (`FUTURE_WORKERS*3` chunks, gated `FUTURE_WORKERS>1 && n>4000`, serial fallback).
- **Fallback chain (MANUAL_PRESS_URLS and auto-fallback):** static -> `wpjson` (`/wp-json/wp/v2/posts`) -> `sitemap` -> chromote (`js_render=TRUE`) -> `cdx` (Wayback); Stage 4 for cdx/js requires body AND date (soft-404 guard) and falls back per URL static -> chromote -> `wayback_snapshot_url()`; `cdx_get` retry-with-backoff helper for `cdx_items`, `cdx_iqcms_docids`, `wayback_snapshot_url`. Families: Indigov (cloaked sitemaps; Wayback only), Dean (`?id=GUID`), WordPress (Clarke 2,367 releases via wp-json; brownley).
- **Known site specifics:** Tim Scott S001184 20 -> 2,999 releases; Guthrie (HFSC chair), Cornyn, Murkowski, Padilla, Young among 38 truncated; Cantwell C000127 6,106, Lankford 3,649, Thune 2,983; Timmons T000480 Dojo shell (`documentsingle.aspx?DocumentID=N` holds real articles); cruz.senate.gov wraps date+title+body in one `<a>`; king.senate.gov date only in `meta[name='date']`; Ernst date 2026-06-05 body 2688 chars after fix; Senate Finance committee page not extractable.
- **Third-party/news (4d):** `NEWS_SOURCES` (ACU `/news-media` via sitemap, CU Today), `manual_cu_news.csv` (4 seeded examples), `ingest_tweets_api` (gated on `X_BEARER_TOKEN` + `member_x_handles.csv`), `members_in_text` with `HONORIFIC_RX` and adjacent `\bfirst\s+surname\b` full-name rule, rows `url=realurl#bioguide`, `thirdparty_rows`. **Cosponsors (4e):** govinfo BILLSTATUS XML, 1,205 signals / 412 members -> 1,309 / 420 after 53 bills; `bill_sponsorship_coverage.csv` columns member,bioguide,bill,nums,role,acu_position,cu_signal; synthesized body "X (co)sponsored the <Bill> (<nums>)."; sponsorship deliberately also counts in the press layer. Bills added: Community Bank Relief Act (S3849), FIRTEA (HR3230), Small LENDER Act (HR941), Advancing Mentor-Protégé Program for Small Financial Institutions Act (HR3709), Rural Credit Access Act (HR7338), GUARD Financial Data Act (HR8398), SECURE Data Act (HR8413), TAG Program (HR8075), SAFE Guidance Act (HR4460), TRUST Act (HR4478), REVIEW Act (HR6544, with `(?<!Congressional )` lookbehind), Private Insurance Parity Act (S4808), NFIP Extension Act (HR5577/S2946), 21st Century ROAD to Housing Act (HR6644). Ruled out: HR6933 (old number of HR4167), CEASE Act HR2987, Secure Payments Act HR7531, HR1 reconciliation (MONITOR), Main Street Capital Access Act HR6955. Tracked-bill positions confirmed: Anti-CBDC HR1919, CLARITY HR3633, GENIUS S919, STABLE HR2392 (+1) vs Credit Card Competition Act (-1; S3623/HR7035).
- **Committee newsrooms (4c):** Senate Banking, HFSC maj/min, Ways & Means, Senate Commerce, Energy & Commerce, House Small Business, Senate Aging (sitemap, 1673 slugs), JEC, House Science, Senate Small Business (`sbc.senate.gov/public/`), House Oversight (`oversight.house.gov/release/`), Senate Veterans (`veterans.senate.gov/newsroom`), Senate Finance (partial); `attribute_statement_to_member`, `stage_committees()` (`CMTE_*.rds`), `COMMITTEE_SOURCES_ON` FALSE when `CU_PR_OFFLINE` or `CU_PR_COMMITTEES=FALSE`.

## Architecture 3: fast collector and one-command driver

- **`cu_text_collector.R`:** parse-bound problem (~62ms/page = ~16 pages/s/core; later ~30ms typical) solved by sharding members across N worker processes, each with an async libcurl multi pool (HTTP/2, multiplex), reusing `extract_release` (sourced with `CU_PR_NO_AUTORUN=1`) and writing the same `pr_checkpoints/fulltext/<bg>.rds` (url,title_detail,date_detail,body). Shards balanced by URL count via `collector_plan.rds` (greedy, deterministic, auto-unlinked at end). Fresh `new_pool()` per chunk (`CHUNK=1500`; a persistent pool crashes past ~3-4k transfers on Windows) with `rm(pool);gc(FALSE)`. Retries only transient (libcurl `fail` + 5xx); 4xx and empty-200 are permanent `miss`. Gentle recovery (<=3 passes, `total_con=8 host_con=2 robust=TRUE`, `forbid_reuse`, 5s cool-down) then chromote 403 lane (own Chrome per worker, `tc_js_fetch` polls body.innerText until >400 chars and stable, ~3.2s max; bounded by chromote `default_timeout`, not `setTimeLimit`; 0.5 s/url). `TC_CHROMOTE` gate with log line `[shard N] chromote gate: enabled=… | M blocked(403) urls queued`; `Sys.unsetenv("CU_PR_NO_CHROMOTE")` unless `CU_TC_NO_CHROMOTE` set. Orchestrator reads `.hb`/`.done` sentinels (written via `writeLines`, `write_hb()` every 200 bodies / 10 chromote urls), 20-min idle guard on body progress, per-shard watchdog (`collector_shard_i.pid`, `kill_shard`/`spawn_shard`, `taskkill /F /T /PID`), writes `collector_residual.csv`, `CU_TC_CAP` stratified collection (always fetch `TOPIC_CORE_RX` titles; `read_index` carries title). Measured: 6 cores ~47min, 8 ~36min; real run ~30min @6 cores; RAM ~450MB/worker (6 procs ~3GB). Coverage 254,477/293,935 = 86.6% before fixes, ~97-98% projected after (~5.1k genuine 404). Self-locates via `--file=`.
- **`run_cu_pipeline.R`:** `system2(wait=TRUE)` subprocesses, env inherited 3 levels deep; `[1/3]` collector, `[2/3]` scraper (`CU_PR_SKIP_FETCH=1`, `CU_PR_NO_CHROMOTE=1`, `CU_PR_WORKERS=4` in the original fast design), `[3/3]` `run_stage5.R` (graceful skip without `.venv_debate`); self-locates (setwd to its own `--file=`/`ofile` dir). End-to-end ~30min collect + ~10-30min score.
- **Throughput facts:** 286,335 indexed releases for the "all" sweep (mean 533/member, max 6,366, 64 members >1,000), ~0.96s/article cold; 8w/0.5s ~ 12.4h; 16w ~ 4.5h, 24w ~ 3.0h, 32w ~ 2.3h; per-host rate <2 req/s; member-sharding deliberately not done.
- **Stage-4 JS lane in the main scraper:** `JS_NAV_TIMEOUT<-25` (`setTimeLimit(elapsed=,transient=TRUE)` + `options(chromote.timeout=)`, `JS_SESSION_DEAD` handler), `JS_MEMBER_BUDGET<-600`s (js only), `CKPT_EVERY<-25` (`flush_ck`), heartbeat `JS [k/n] bg: N urls -> M bodies (Ns)`; 42 sequential JS members by design.

## Architecture 4: Stage 5 stance and tone

- `run_stage5.R` (orchestrator): scored CSV + body cache -> LSD tone + DEBATE stance + aggregate -> `cu_press_stance_tone.csv` + `cu_press_value_by_category[_wide].csv`; hybrid: body >= 300 chars -> DEBATE stance x LSD intensity, text-less `billstatus:` rows -> sign(legacy score) x `CU_S5_BILL_WEIGHT` (0.03), column `stance_src` (bill|debate); `press_value = stance_sign(-1/0/+1) x LSD intensity(|net|/words)`.
- LSD2015 parsed by `parse_lsd.R` -> `lsd_dict.rds` (positive 1709, negative 2858, neg_positive 1721, neg_negative 2860); `lsd_tone()` in `stage5_lsd.R` on stringi (4 alternation regexes, negations first; 9.6 ms/doc). quanteda unusable (RcppParallel segfault, no Rtools).
- `stage5_debate.py` sidecar (R writes input CSV -> python -> stance CSV), model `mlburnham/Political_DEBATE_base_v1.0` (`--model` swaps to large), CPU only (Intel integrated graphics, no CUDA), ~0.3 s/doc.
- Fine-tune: `finetune_debate.py` (NLI-style; `disable_tqdm=True`), `claude_stance.py` Claude rater (CCCA -> oppose 0.95, CDFI -> support 0.97, FEMA -> neutral 0.99; anthropic SDK 0.111), `measure_stage5.R`, `run_accuracy_push.R`; results: zero-shot 0.667 acc / F1 0.578 / kappa 0.339 on 45 Claude-labeled releases vs regex 0.444 / 0.413 / 0.167; fine-tuned base 87.2% acc / F1 0.833 / kappa 0.771 on a 156-row held-out test (oppose F1 0.08 -> 0.78; regex 38%; zero-shot 53%); deployed `debate_finetuned` ~85% / kappa 0.76 on member-grouped human-gold, re-scoring 3,701 releases (support 2,323 / neutral 1,151 / oppose 224 vs regex 2,910 / 662 / 126); prior baseline to beat 0.851 / 0.760 on 87 rows. Corpus stats 2026-06-21: only 41% of 3637 scored releases (1504) have body text.
- Standalone Excel: `make_standalone.py` -> `CU_Press_Stance_Tone.xlsx` (3 sheets: per-member x category press_value, per-release detail, About); full roster 534 from `all_press_release_index.csv` minus 4 excluded (Stacey Plaskett VI, Aumua Radewagen AS, Kimberlyn King-Hinds MP, junk "Alan Armstrong") = 530 members, 38 all-zero (Hoyer, Nadler, Schweikert...); kept delegates Hernández Rivera (PR), Eleanor Norton (DC), James Moylan (GU).
- Deploy gotchas (2026-06-24): non-JS parallel full-text fetch `budget = Inf` stalls ~85%; kill by PID then restart cache-only (`CU_PIPE_SKIP_COLLECT=1`, no `CU_PIPE_FETCH_RESIDUAL`, ~1 hr); `recover_3.R` pattern for the 5 gold gaps (3/5 recovered live: Collins + both Durbins; 2 Waters releases `documentsingle.aspx?DocumentID=413709/412791` pending).

## Architecture 5: Census CD scraper (`census_cd_scraper.R`)

- `census_cd_scraper.R` (httr/jsonlite/writexl) writes `Congressional_District_Census_Data.xlsx`: `State_and_CD` + `Variable_Dictionary`; `build_metrics(level)` for "cd" and "state" stacked, not joined: 52 state rows (both Senators) + 437 CD rows (Representative) = 489 x 37 cols; `Geography_Level`; 25 metric columns. Uses the Census API (ag-grid scraping selectors rejected); key `CENSUS_API_KEY` in `C:\Users\pgoff\OneDrive\Documents\.Renviron`.
- Facts: `C25027` discontinued after 2012 -> `B25027` "35-64" = sum `_004E.._007E`; CBP `/2020/cbp` `ESTAB` by CD (some NA); 2024 ACS 1-year = 119th boundaries vs 2020 CBP 116th; throttle returns HTML, non-`[` body retried with backoff; roster CSV `https://unitedstates.github.io/congress-legislators/legislators-current.csv`; join by USPS state + district int (CD "00"/"98" -> 0); blank `full_name` (CA-01, NJ-11) fall back to first+last; ~4 vacant seats -> "Vacant / no seated member"; DC/PR no senators; `B08126_024E` = drove alone Finance/insurance/real estate as % of `_001E` (user's nth-child(23) = `_023E` Information; `_009E` for finance-all-modes); lock-resilient write; validators `_robustness.R` (27 checks), `_verify_names.R`.

## Architecture 6: Ballotpedia CU-influence scraper (`ballotpedia_119th_cu_scraper.R`)

- 3-sheet Excel `Ballotpedia_119th_CU_Influence_<stamp>.xlsx` (Members: Member, Party, Chamber, State, District, Election_Average, Years_Served, Committee_Positions, Committee_Leadership, Caucus_Positions, Caucus_Leadership, Party_Leadership; Detail; Reference); final 20260618_010531. Feeds the model's Sub Layer AW:BA.
- Data: roster/tenure from the @unitedstates JSON (`years_served_since_2020`, `PREFER_BALLOTPEDIA_TENURE`); committees from `committee-membership-current.yaml` (709 raw / 682 CU-relevant over ~230 members; `COMMITTEE_SOURCE`, `COUNT_EX_OFFICIO <- FALSE`, `CU_COMMITTEE_PATTERNS`); elections `ELECTION_SOURCE <- "medsl"` (Senate datafile 13887039, House 13592823 guestbook-gated, `DATAVERSE_TOKEN` or manual `1976-2024-house.tab` -> `medsl_house.csv` via `.adopt_manual_medsl()`, `.clean_medsl` sniffs delimiter and aggregates fusion tickets; House 423/437, Senate 100/100); `weighted_electoral_avg()` over 2016/2018/2020/2022/2024 with 2018 x2 (`POWER_PARTY<-"Republican"`, `cycle_weight()`), `add_senate_combined()`; Ballotpedia only via chromote (AWS WAF; `ALLOW_BROWSER <- TRUE`; aws-waf-token cookie; ~2s).
- Scoring: `cu_committee_positions` (+1 per seat), `cu_committee_leadership_score` (Chair 1.0 / Ranking 0.8 / Vice Chair 0.6 / Vice Ranking 0.4 / Member 0.2), `cu_caucus_leadership_count`/`_score` (leadership only: Chair 1.0, Co-Chair/Vice Chair 0.8, members 0; superseded 1.0/0.75/0.5), party leadership (Speaker & Pro Tempore 1.0 / Maj Ldr 0.8 / Min Ldr 0.6 / Maj Whip 0.4 / Min Whip 0.2) matched by `bioguide` column in `PARTY_LEADERSHIP` (fix 2026-06-18, five "Johnson"s). 13-caucus `CU_CAUCUSES` list, officers from the Feb 2026 CMO list (494 caucuses, `_parse_cmo_docx.R` -> `_cmo_feb2026_officers.csv`), `cu_caucus_members.csv` 38 officer rows (113 with Army caucus roster from `armycaucus-carter.house.gov/members`, ~77 members); full rosters gated at LegiStorm Pro; matching `score_caucuses_for` / `.name_refers_to` / `.tok_eq` / `.NICK_GROUPS`, `.ascii` diacritic stripping; all 38 leaders resolve except David Scott (GA) and Mikie Sherrill (NJ Gov).

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

## Code-level catalogue: markup, incidents and verified measurements

The narrative of each audit round lives in [[2026-06-feature-congress-r-scrapers]]; this catalogue keeps the code-level facts a maintainer needs next to the code root.

### congress.gov markup and parser facts
- Result row: `li.expanded` only (a hidden `li.compact` duplicate follows); `.result-heading a` (bill no.), `.result-title`, `.result-item` spans (Sponsor / Committees / Latest Action), `.result-item.result-tracker`; node selectors `.result-title + .result-item a:nth-child(2)` (Sponsor), `.result-item:nth-child(5)` (Committee).
- Cosponsor count text `<strong>Cosponsors:</strong> (<a href=".../cosponsors...">42</a>)` parsed via `html_nodes(bill,"a[href*='cosponsors']")`; the old `gsub("\\D","",cosLine)` glued the Introduced date into the count; fallback regex `Cosponsors:\\s*\\(\\s*[0-9]+`; default 0. Short status from `sub(".*has the status","",...)`; fallback `classify_last_action()` maps the raw "Latest Action:" text. `member_agg` uses `ifelse(all(is.na(CosponsorCount)),0,round(mean(...,na.rm=TRUE),2))`.
- Cloudflare symptom: every page title `"Just a moment..."` -> zero nodes; `plan(multisession, workers=4)` and the mismatched `user_agents` rotation were replaced by `plan(sequential)` + one `CHROME_UA`; `init_browser()` attaches `Chromote$new(ChromeRemote$new(...))`; `FETCH_MODE <- "browser"` is the fallback if `validate_http()` fails.
- Single-result redirect: user report "who only interacted with one piece of legislation"; fixed 2026-06-10. Removed debug dumps (`debug_url.txt`, `debug_*.html`, `validate_http.html`, `debug_member()`, `result_selectors`), `mem_used()` (pryr not loaded), `wait_for_results`; clipboard lines moved into `if (RUN_FULL)`; browser detail scraping reuses `fetch_rendered_html`; error-proof wrapper `scrape_member_overview` around `scrape_member_overview_impl`; `scrape_detail_page`, `fetch_page(`.
- Naming: "James McGovern" miscalled ("James P. McGovern" official, nickname "Jim McGovern" returns nothing); 33 of 536 miscalled; 536 unique names verified. Pinned roster uses `sort(method="radix")`, clipboard block `Members[match(members, Members$Member), ]` (no locale `order(`), anchor `Members_sorted$Member`.
- Accented-name failure message: `read_html` "'' does not exist in current working directory" = empty server response (8 members). Zero-results placeholder bug: `%22_MEMBER_%22` vs `__MEMBER__`.
- Transient flakiness that auto-recovers: HTTP/2 "Stream error"/"Timeout"; the "cannot open the connection" error was an Excel/OneDrive CSV lock. Integrated-scraper strings: "Operation timed out after 45011ms with 3575 bytes" (fixed by retry/backoff), "technical difficulties" page (`is_site_error_html`; can arrive HTTP 200), "missing value where TRUE/FALSE needed" (the `numeric(0)` Retry-After bug), chromote 0.5.1 "timed out waiting for response to command Page.navigate", `handlers("txtprogressbar")`.
- User phrases: role distinction "just go down the list" (looped pivot), full SNA graph "not there yet", "Moneyball ACU" outline, "I only want these members" (MEMBER_FILTER), Roster names "Shelley Capito" (sans Moore) / "Analilia Mejia" / "Moore Capito" -> "capito".
- Integrated-scraper identifiers retained for reference: `scrape_sponsor`, `scrape_cosponsor`, `SPLIT_ORIGINAL_COSPONSOR`, `fetch_cosponsors_page`, `original_cosponsored_bills`, `build_url`, `moneyball_legscore_<ts>.xlsx`, `Moneyball_Legislative_Score_Raw_<ts>.xlsx`, `congress_bills_archive_<ts>.xlsx` (All Bills + per-section sheets).

### Press scraper regex and scoring traps (code-level)
- `norm_bill_refs()` examples "S. 110", "H.R. 507", "x.J. Res. N"; two-digit year parse "25" as year 25 AD; pro "exempt" lookbehind `(?<!tax-)(?<!tax )`; anti verb `\b` ("DefEND credit union tax status" matched "end…CU…tax"); gratitude proximity narrowed 80 -> 40 chars; held-out failures: education "AFFORD Act", "fight/stood against <Bill>", "Liquidity BackSTOP" flipped a CLF cosponsorship, "refuses to support", "05/06/25Senator" date concat, `news[-_ ]releases?|announcements?` (Klobuchar), "carve-out" removed from GEN_PRO, LPF "between/with…CU" anti vs "for CU" pro; round 2: "N-evada"/`evad\w+`, "ap-praisal"/`prais\w+`, "Welch Slams Big Credit Card Companies...", "Democrats' opposition to the GENIUS Act", "Blockchain Regulatory Clarity Act" vs `(Digital Asset Market )?CLARITY Act` (Securities Clarity Act, `(?<!Securities )(?<!Regulatory )`), "Cramer's 2019 reauthorization" vs TRAPS S.2019, `block\w*`, `\boppos\w+`; category tags dropped: "budget reconciliation", bare "military", "LPF for merchants", bare "housing"; "Continue Reading about" prefix; "Congressional Review Act" vs REVIEW Act ("Protecting Access to Credit for Small Businesses Act" S2486 = Scott No. 37).
- Category/scoring functions: `detect_categories(`, `score_release(`, `explode_categories(`, `stage_outputs(`, `build_net_by_category(` (anchored on the FULL filtered roster, not `scored`; "Cumulative Net" 0 can mean "no releases" or "balanced high volume", e.g. Maxine Waters CumNet 0 / TotRel 6), net columns per category `<Category>` and `<Category> (n)`.
- Counts and rates: eval corpus 50 docs (15/12/13/10); band 3 -> 0.72; throughput 222 -> 166 -> 129 docs/sec; held-out baseline 0.667 acc / 0.844 relevance; first live run 190,782 releases / 432 members, 403 scored (386 after impostor guard = 232+/134n/20-), 104/537 discovery failures; round 2: 504/537 discovered, 227,698 indexed, 472 scored = 270+/173n/29-, Durbin -16 / Welch -12 / Vargas +54 / Emmer +34 (Emmer 15 rows, 13 impostors; net 50 -> 34), 794 king.senate.gov rows undated, 4.2% NA dates, 9 zero-word_count rows; round 3: 230,866 indexed, 14.5% undated, 12,009 topical candidates (5.2% title-pass), 2,247 (18.7%) unfetched, 159 members scored, 73 single-release members (median 2), 378/537 all-zero, GENIUS 67 rows (14%) with 51 evidence-free, evidence tiers 61% / 22% / 12% / 8%, net xlsx ties CSV (241 net / 472 releases); first live run 533 discovery/index checkpoints and 374 fulltext; 16.1% undated rows in the first audit, 48 members `scheme="none"`; Murray stopped ~p27; Hawley (2024-10).
- Uniformity fixes: the "initial + goes-by-middle-name" pattern, e.g. "J. French Hill" ("initial + goes-by-middle-name": Hill, Steube, Correa, Griffith) matched by every name token; sheet formal names ("Richard J. Durbin", 'Robert C. "Bobby" Scott') rewritten to list spelling; writexl uses INLINE strings (inspect xlsx by zip+XML parse).
- Scorer-related code identifiers: `res_js <- lapply(seq_bgs`, `stage_fulltext`, `fetch_html_js`, `fetch_member_fulltext`, `read_html`, `stage_index`, `stage_score`, `score_bill_signals`, `crawl_member_index`, `discover_member`, `crawl_news_source`, `extract_index_items`, `sitemap_items(org)` (with `lastmod` sorted desc), `match_one_member` (lowercase BEFORE the case-sensitive `[^a-z…]` split: "Katie" -> "atie"), `idx$uniq`, `<title>`, `future.packages`, `TOPIC_BROAD_EXTRA_RX`, `CHECKPOINT_DIR`.

### Collector and coverage incident catalogue
- Measured: 273k bodies remaining (13.5k cached of 286,335); parse ~4.7h for 273k on one core; network ~12.7 url/s per host; 6.9 GB free RAM at the time; 90% network-wait; biggest member 6,366 x 0.96 ~ 1.7h; ~70-80 url/s/shard.
- Crash: shards died after "3000/5998"; full shard (5,998 urls) completes in 2.6 min after the per-chunk pool fix (measured safe >3300 transfers). Probe: 40 missing urls, 38 HTTP-403.
- Coverage audit: 254,477/293,935 = 86.6%; gap 39.5k = 28.8k throttle victims + 3.9k 403 (recoverable 32.7k; ~5.1k genuine 404); orchestrator abandoned at 20 polls x 30s with ~14.5k 403s unfetched; smoke shard main 160 ok -> recover 185 -> 209 -> 233 (+73, +46%); probe 22/24 returned full static bodies; Cantwell C000127 6,106 urls at 0%.
- Leak incident: 8-shard run 37.6 min; scored 272,252 vs prior 272,638; CU-relevant 3,821 vs 3,806; ~15.4k blocked-403 URLs; `blk=0(recovered 0)`; before-fix `recovered 0/126 (0.0s fail)` and `0.0 s/url fail`; after-fix `recovered 74/74 fail 0`, `enabled=TRUE`; code: `HAVE_CHROMOTE`, `js_session()` `if(!HAVE_CHROMOTE) return(NULL)`, `TC_CHROMOTE <- requireNamespace(chromote) && !nzchar(CU_TC_NO_CHROMOTE)`, `.tc_js`, `tc_js_new`, `tc_js_fetch`, `acc$n_ok`, `acc$miss`, `collect()`, `on_block`, `run_all`, `mk_handle`; chromote tail ~30-100 min across 8 workers at ~1-3s/blocked page; run `idle guard IDLE_MIN=20`; `s0+CHUNK>n` flush trigger (main pass flushes only at shard end).
- Validity verdict numbers: P(CU-relevant | CU-term title) 0.825 vs generic 0.0089; captured 2,410; imputed missing ~265 (~10%), title-identifiable ~9-138, body-only ~0.9% over 28.7k pages; missing CU-signal 9.6% (D) vs 10.2% (R); coverage D 92.5% / R 87%; Senate 83% vs House 96%; 29 members <50% coverage, 28 rescued; 138 uncached `TOPIC_CORE_RX` pages; `CU_TC_CAP` sizes 500 -> 8.1k (~34m), 1000 -> 14.0k (~30-58m), 1500 -> 16.9k; chromote errors "Operation was interrupted"/"Execution halted"; 117/117 recovered at 0.5 s/url.
- Discovery truncation: Scott `scheme=pagenum`, `n_items_p1=20`, "load more" AJAX ignoring `?page=`/`PageNum_rs=`, `crawl_rows <= n_items_p1+2`, `<= SITEMAP_COMPLETE_MAXPAGES`, `<domain>/sitemap.xml` -> `press_releases-sitemap*.xml`, `/media-center/press-releases/`; ~line 1292 archive-fallback only for `none`/NA; ACU `/news-media/news/` 2,309 URLs (2,307 bodies; ~745 legislation-slug articles; 314 members with ACU mentions, 192 own press, 412 cosponsorship, 489 covered, 48 zero-coverage; 2,351 crawl items; acu3 @ pos 7, acu1 @ 1450); `nrow>=3` guard passed on 4 featured links; index 290,778 -> 250,420 at the 2022 floor; BILLS-table line refs (verified mid-grind): HR4544 line 1514, CCCA line 1495.
- Attribution incident: Banks 319, Strong 281, Timmons 258, Simpson 210, Hill 201, Wesley Hunt 141; ACU titles "Nussle...", "FedNow...", "Q4 GDP report"; honorific cases "Capitol Hill"/"community banks" -> none, "Rep. Hill"/"Sen. Banks"/"Tim Scott" attribute, "Sen. Scott" ambiguous -> none; re-scored 5594 -> 4059; Banks 319 -> 109, Timmons 258 -> 257 (231 "Join My Email List" rows of 235 bodies; 552-char shell; "Javascript must be enabled for the correct page display..."; 2019 "opens district offices" page; Dojo URL `.../dijit/dijit/dojo/dojo/dom-construct`; "Examination & Supervision" tag via the SMART Act "Supervisory Modifications for Appropriate Risk-based Testing"; DocumentID=492 title "Timmons Bill to Rollback Regulatory Burdens..." date 2026-05-12 body 2662 chars; 180 slugs "distinct shells: 1", 178x duplication; "Read More" teaser "modernize the examination process for well-managed community banks and credit unions"; user chose "fix his site scraping").
- Parallel scoring: 5,200-row synthetic 4,644 == 4,644; 2.31 MB export vs 113 globals; `future.globals.maxSize` 500 MB; `globals::globalsOf(.cu_score_chunk, recursive=TRUE)`; shard 10 of 12 = 23 bot-blocked members (B001303 560 urls; 3,278 urls total; chromote ~40% productive); parse rule: keep `x<-if(c)a else b` on one line; error text "Execution halted"; user phrase "revert to having the guard-dog and year filter"; earlier "we are re-winding"; "newer releases given more prominence"; "NO SHORT CUTS… NEVER STOP"; "silently stall"; "missing cu_text_collector.R (run from project dir)".
- Pipeline text: `[1/2] cu_text_collector.R`, `[2/2] cu_press_release_scraper.R`, outputs `cu_press_releases_scored.{csv,xlsx}`; setting `delay=` arg on `fetch_html`; `setTimeLimit(JS_NAV_TIMEOUT)` in the first chromote lane; `options(chromote.timeout=JS_NAV_TIMEOUT)`; `done<-setdiff(urls,done)`; `break`; stripping `<script>/<style>/<svg>` gave ZERO speedup (do not retry); user-confirmed 24 workers ~ 6GB (8-core / 31.5GB box; 32 OK with apps closed, 16 to share).

### Ballotpedia and Census code-level facts
- Ballotpedia names: `SKIP_ELECTIONS <- TRUE`, `COMMITTEE_SOURCE <- "ballotpedia"`, `electoral_avg_state_combined`, `party_caucus_for()`, removed flag `USE_CHROME_FALLBACK`, `build_medsl_index()`, `medsl_member_elections()`, Senate download `?format=original`, `aggregate()` for fusion tickets (Josh Riley NY-19 2024 = 170k Dem + 23k Working Families of 377k; ~5% vs ~50%), `.name_tokens`, caucus subsite pattern `<name>-<chair>.house.gov`, workbook `Ballotpedia_119th_CU_Influence_20260618_010531.xlsx`, Ballotpedia tenure option "Assumed office", "Party in power" weighting, caucus matcher cases "French Hill" -> roster "J. French Hill", "John Joyce" != "David Joyce", Barrasso = 0.4 Maj Whip, "Luján" == "LUJAN" via `.ascii` (iconv//TRANSLIT).
- Census names: source path `C:/Users/pgoff/OneDrive/Desktop/Draft Systems/census_cd_scraper.R`; rejected selectors `.ag-row-hover`, `.ag-row-position-absolute:nth-child(N)`; keyless redirect `missing_key.html`; row N -> variable `_0NN`; "means of transport to work BY INDUSTRY"; user's "transportation" metric corrected to finance: "Car/truck/van drove alone: Finance, insurance & real estate" (literal nth-child(23) = "drove alone: Information"); column `District_Code` blank on State rows; call `for=congressional district:*` / `in=state:*`.
- Environment: `library`/`plan` stubbing technique for offline tests; `VAR=x prog` form only in Git Bash.

## Related Actors

- [[debate-stance-model]] - Fine-tuned Political DEBATE NLI stance model (CPU) plus Lexicoder LSD tone; replaced the regex scorer in Stage 5 of the CU press pipeline
- [[melange-fec-pipeline]] - Melange Systems fec/ Python pipeline: paths.py, moneyball_core, run_pipeline chain, compute_pillars rank authority, kernel tests, live_patch

## Related Topics

- [[2026-06-feature-congress-r-scrapers]] - June 2026 R scraper family in Draft Systems: congress.gov 17x3, CU press releases, Census CD, Ballotpedia, DEBATE stance
- [[2026-06-feature-cu-stance-and-sentiment]] - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- [[2026-06-feature-moneyball-excel-model-build]] - June 2026 build of the 533-member Moneyball workbook: four buckets, percentile-rank blend, calibration, scenario tooling
- [[2026-06-working-agreement-tooling-and-environment-traps]] - Feedback rules for tool/shell traps: heredoc mangling, MEMORY.md loading contract, visible PowerShell, congress.gov URL kept verbatim.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related People

- [[paul-goff]] - Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11.
