---
type: topic
title: "Congress R scrapers"
aliases: ["Congress R scrapers"]
category: "feature"
status: "completed"
people:
  - "paul-goff"
actors:
  - "[[debate-stance-model]]"
  - "[[draft-systems-r-pipeline]]"
objective: "Build, audit and harden the R scraper family in Draft Systems that feeds the Moneyball CU-influence model: the congress.gov member scraper (17 topics x 3 roles), the CU press-release scraper with its fallback chain and collector, the graded then DEBATE/LSD stance and tone scoring, the Census congressional-district scraper and the Ballotpedia CU-influence scraper."
created_at: 2026-06-03
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_deploy.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_deploy.md", sha256: "6ab1706f2edfe83b8d1eaff167caa5736b6fba651909d118ab21b2aa42999f93"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_integrated_scraper.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_integrated_scraper.md", sha256: "d847e0292c9860eb9d32f7823af6e865f4bbc2b410053565d3a6365711b7a020"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_stance_sentiment_overhaul.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_stance_sentiment_overhaul.md", sha256: "990a30a6744244ca03cabb88df52a0d057efc8f6e91804833ce50bc6e36ba1a1"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_congress_press_fallbacks.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_congress_press_fallbacks.md", sha256: "2832fbdbe8c81c8cf658448b7e52f8c281aeadd424425c221b77e64518698a95"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/user_r_environment.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\user_r_environment.md", sha256: "4b3db963331292e353d1e0be4ac6e238a7f81e451bc60a806719c97d3963316f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_ballotpedia_cu_influence.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_ballotpedia_cu_influence.md", sha256: "286dd88b0fb65098724a2d920d12b56a48305ebe4e89f359730cb62b760d4067"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_congress_graded_scoring.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_congress_graded_scoring.md", sha256: "ee66047d5bd254e2e1632dd18d679294ba4bf2e642f4baacb73ea4c52cbdae94"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_census_cd_scraper.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_census_cd_scraper.md", sha256: "b208715d9746b5d2afba36b8b43722d042fd65338c139e1ef51362840bb35855"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_congress_scraper.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_congress_scraper.md", sha256: "cee61c688ca2e469d0d63a8331f106f4c24f41f05d2ca11236bdf8619b5289ae"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/feedback_congress_url_no_json.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\feedback_congress_url_no_json.md", sha256: "f748020965e473c03ac4133372c594ffbf3ba95b47d04a9c01f7f1d1d5f3a379"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/data", "category/feature"]
---

# Congress R scrapers

> Everything built in June 2026 inside `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\` (code root: [[draft-systems-r-pipeline]]) to produce the congress.gov legislative counts, press-release sentiment, Census and Ballotpedia inputs of the Moneyball CU-influence model ([[melange-systems]]), from the first chromote prototype (2026-06-02) to the fine-tuned DEBATE deploy (2026-06-24).

## Parts

- [[2026-06-feature-congress-r-scrapers-member-scraper]] — The congress.gov member scraper of 2026-06-02 to 06-10: purpose and outputs, result-row markup, the Cloudflare bypass and cookie-replay fast path, official-name roster rules, the pinned roster order, the bug-audit fixes and the chunked verbatim-URL rule.
- [[2026-06-feature-congress-r-scrapers-legislative-score-17x3]] — The integrated 17-topic by 3-role scraper behind the Moneyball Legislative Score: its 2026-06-22 design inside the member scraper, the stability guard, the cosponsor SNA edges, the June 24 refinements and guardrails, and the two superseded approaches.
- [[2026-06-feature-congress-r-scrapers-cu-press-scraper]] — The CU press-release scraper from its 2026-06-10 start through the June 12 audits, plus the five-step fallback chain, archive and third-party sources, bill-sponsorship coverage, the ACU harvest and the per-member web grind of 2026-06-18.
- [[2026-06-feature-congress-r-scrapers-press-collector-pipeline]] — The press text collector and one-command pipeline of 2026-06-18/19: anti-stall hardening, the fast analyzer, the combined driver, throughput tuning, the collector crash fix, the chromote 403 lane and coverage bugs, and the validity verdict.
- [[2026-06-feature-congress-r-scrapers-press-discovery-and-attribution-fixes]] — Press scraper fixes of 2026-06-20/21: discovery truncation and sitemap completion, the recency-decay reversals, the news-attribution surname guard, parallel-scoring capture, the collector stall watchdog and parallel Stage-5 scoring.
- [[2026-06-feature-congress-r-scrapers-graded-scoring-and-audits]] — Graded press scoring of 2026-06-14 to 06-21: the graded scale, lean-aware hidden coalitions, the audit passes on tail compression, crypto orientation, matching breadth, big-bank and anti-CU detection, the date-parse bug and the graded member by category sheet.
- [[2026-06-feature-congress-r-scrapers-stage5-debate-lsd]] — The Stage 5 overhaul of 2026-06-21 to 06-24 that replaced regex scoring with Political DEBATE stance and Lexicoder LSD tone: design, environment constraints, validation, the fine-tuned base model, the deliverable change and the full-corpus deploy.
- [[2026-06-feature-congress-r-scrapers-census-and-ballotpedia]] — The Census congressional-district scraper of 2026-06-16 and the Ballotpedia 119th-Congress CU-influence scraper of 2026-06-17/18: their metrics, the Ballotpedia locked design and its status after the live double-check of 2026-06-17/18.

## Context

Paul Goff (Paul Goff) builds the Moneyball credit-union influence model; its legislative, press, institutional and demographic layers need per-member data for the 119th Congress (about 537 members). This topic holds the full June 2026 history of the R scrapers that produce that data. It was assembled from ten memory files: `project_congress_scraper`, `feedback_congress_url_no_json`, `project_congress_graded_scoring`, `project_congress_press_fallbacks`, `project_census_cd_scraper`, `project_ballotpedia_cu_influence`, `project_moneyball_integrated_scraper`, `project_stance_sentiment_overhaul`, `project_moneyball_deploy`, `user_r_environment`.

Components (all in Draft Systems, `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\`):

| Component | File | Role |
|---|---|---|
| congress.gov member scraper (and integrated 17x3 scorer) | `congress_member_scraper.R` + `congress_search_urls.R` | Per-member advanced-search scrape over Cloudflare, now looping 17 topics x 3 roles into "Legislative Score - Raw" |
| CU press-release scraper | `cu_press_release_scraper.R` | Scrapes every member's own site, scores releases toward credit unions, fallback chain for JS-shell sites |
| Fast text collector | `cu_text_collector.R` | Multi-process async body fetcher feeding the same `pr_checkpoints/fulltext/<bg>.rds` cache |
| One-command driver | `run_cu_pipeline.R` | collector -> scraper -> Stage 5 (DEBATE + LSD) |
| Stage 5 stance and tone | `run_stage5.R`, `stage5_lsd.R`, `stage5_debate.py`, `parse_lsd.R` | Political DEBATE stance x Lexicoder LSD tone (see CU stance and sentiment scoring and [[debate-stance-model]]) |
| Census CD scraper | `census_cd_scraper.R` | ACS + CBP metrics for 437 districts plus states |
| Ballotpedia CU-influence scraper | `ballotpedia_119th_cu_scraper.R` | Years served, electoral average, committee/caucus/party scores |

Related traps: the shell, console and environment gotchas collected in Tooling and environment traps (PowerShell env-var syntax, RStudio 4096-char line truncation, Rscript not on PATH).

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[debate-stance-model]] | Fine-tuned Political DEBATE NLI stance model (CPU) plus Lexicoder LSD tone; replaced the regex scorer in Stage 5 of the CU press pipeline |
| [[draft-systems-r-pipeline]] | Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Topics

- CU stance and sentiment scoring - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- Tooling and environment traps - Feedback rules for tool/shell traps: heredoc mangling, MEMORY.md loading contract, visible PowerShell, congress.gov URL kept verbatim.

## History

| Date | Event |
|---|---|
| 2026-06-02 | congress.gov scraper re-oriented so the member is the switch variable; markup confirmed from dumped HTML; Cloudflare found to be the cause of zero nodes ("Just a moment..."); browser layer rewritten (`BROWSER_MODE`, real headful Chrome, `apply_stealth`, `wait_past_cloudflare`); whole-roster cookie-replay HTTP fast path added; `%22_MEMBER_%22` vs `__MEMBER__` placeholder bug fixed; accented-name URL encoding fixed; first full 119th run: cookie replay worked, 536 members, 1773 bill rows |
| 2026-06-03 | Feedback rule recorded: build the congress.gov query from the verbatim encoded URL in chunks, never from JSON (see Rules in [[2026-06-feature-congress-r-scrapers-member-scraper]]) |
| 2026-06-10 | Roster naming fixed (official bioguide name, not nickname); single-result redirect layout handled; debug-file generation removed; pinned roster order added; bug-audit pass fixes 1-7; second scraper `cu_press_release_scraper.R` added |
| 2026-06-11 | Press scraper accuracy/efficiency tuning (`eval_cu_scoring.R`, NEUTRAL_BAND=2); 537-name `MEMBER_FILTER`; 19+1 category layer; minimalist net-by-category sheet; first live run and uniformity fixes; scale expansion of the net sheet (24 -> 46 columns) |
| 2026-06-12 | Fallback chain added for MANUAL_PRESS_URLS members (wp-json, sitemap, chromote, Wayback CDX); held-out robustness audit; live-run audit (190,782 releases / 432 members indexed, 403 scored); audit round 2 (504/537 discovered, 227,698 indexed, 472 scored); round 3 metrics audit |
| 2026-06-14 | Press scorer augmented with a graded 0.2-step scale, intensity lexicon, valence shifters, strong-tier anchor cap and lean-aware hidden-coalition clustering; unaligned separation in audit pass 2 |
| 2026-06-15 | Member-level stance rollup; crypto/stablecoin orientation validated (audit pass 3); bill aliases and broadened categories (pass 4); anti-big-bank = pro-CU and committee newsrooms (pass 5); anti-CU phrases (pass 6); `extract_release` date-parse abort fixed (pass 7); exhaustive graded Member x Category sheet |
| 2026-06-16 | Census CD scraper written (`census_cd_scraper.R`) |
| 2026-06-17 | Ballotpedia scorer restructured into 3 separate metrics; AWS WAF behaviour found; chromote used for Ballotpedia; MEDSL chosen for elections; caucus full-membership research |
| 2026-06-18 | MEDSL election integration completed (House file manually downloaded); `party_caucus_for()` Johnson bug fixed; third-party news stage 4d and bill-cosponsor stage 4e added; ACU archive harvest; exhaustive hand grind of all 537 members (zero new bills); text-collection anti-stall hardening; `cu_text_collector.R` and `run_cu_pipeline.R` created; throughput tuning; auto archive fallback coverage fix |
| 2026-06-19 | Collector crash fixed (fresh pool per chunk); chromote 403 lane and three coverage bugs fixed; `CU_PR_NO_CHROMOTE` env leak found and fixed; validity verdict on missing data; signal-prioritized collection `CU_TC_CAP`; default `CU_TC_PROCS` raised 6 -> 8 |
| 2026-06-20 | Discovery-truncation fix via sitemap completion (Tim Scott 20 -> 2,999); ACU news sitemap fix (4 -> 2,351 items); `is_junk_url()` guard; stage_score many-to-many dedup fix; recency decay added then reverted ("we are re-winding"); per-shard stall watchdog; Stage-5 scoring parallelized; REVIEW Act false match fixed |
| 2026-06-21 | Year filter and decay RE-RESTORED; news attribution common-word-surname bug fixed; parallel-scoring `full`-capture bug fixed; `CU_TC_ONLY` added; `congress_moneyball_integrated.R` built; Stage 5 overhaul to DEBATE + LSD started; DEBATE validation on 45 releases; accuracy-push scripts written; Claude rater validated |
| 2026-06-22 | Fine-tuned base DEBATE: 87.2% acc / macro-F1 0.833 / kappa 0.771; deliverable changed to a standalone Excel; integrated logic moved into `congress_member_scraper.R` (CURRENT home); roster verified (531 voting + 2 delegates) |
| 2026-06-23 | `MAX_CHALLENGED_BEFORE_ABORT=40` stability guard; Stage 3 cosponsor SNA edges appended |
| 2026-06-24 | Main scrape complete (51/51 passes); one-workbook output, 138 columns; retry/backoff fix; Stage 3 confirmed on the live site; stage decoupling and two guardrails; fine-tuned `debate_finetuned` deployed to the full corpus (3,701 CU-relevant releases) |

## Decisions

- **Member is the switch variable** (2026-06-02): re-orient the congress.gov scraper from page number to member of congress (the `original-cosponsor` value in an advanced-search query). In the integrated scraper the user again rejected a per-topic design ("keep the member as the switch").
- **Verbatim chunked URL, no JSON round-trip** (2026-06-03 rule): see Rules in [[2026-06-feature-congress-r-scrapers-member-scraper]].
- **Cookie replay HTTP fast path** (2026-06-02): harvest Cloudflare cookies once from a real browser, fetch with parallel `httr::GET`; browser fallback for challenged members.
- **Official bioguide names** (2026-06-10): query with the CSV `full_name`-derived name, not the nickname.
- **User DECLINED** fallback tightening #8, #9, #10 and the stale "terms (all OR)" comment fix (2026-06-10): do not re-apply without asking.
- **NEUTRAL_BAND=2** (2026-06-11): band sweep 1 -> 0.96 acc, 2 -> 1.00 (chosen), 3 -> 0.72.
- **Anti-big-bank counts as pro-CU** (2026-06-15, user agreed on condition it is sorted correctly and does not dilute the anti-CU signal).
- **Sponsorship also counts in the press layer** (2026-06-18): intentional overlap with the Legislative layer; watch combined weighting.
- **Reintroductions and reposts are both fine** (2026-06-15, user): the URL-only dedup (same member+title at 2 URLs/dates, 5 live cases) is intentionally left as-is.
- **Ballotpedia roster/committees from @unitedstates JSON/YAML, elections from MEDSL** (2026-06-17/18).
- **Do not run the monolith `cu_press_release_scraper.R` directly with `FULLTEXT_MODE="all"`**; use `run_cu_pipeline.R` (2026-06-19).
- **Stage 5 = stance (Political DEBATE) separated from tone (Lexicoder LSD)** (2026-06-21), `press_value = stance_sign(-1/0/+1) x LSD intensity(|net|/words)`.
- **Standalone Excel deliverable, not wired into the Moneyball model** (2026-06-22): `CU_Press_Stance_Tone.xlsx` via `make_standalone.py`.
- **Keep territorial delegates Eleanor Norton (DC) and Pablo Hernández Rivera (PR)** in the legislative roster (2026-06-22, user); no territory-exclusion code.
- **Decay of the integrated scraper = `DECAY_PER_CONGRESS=0.8` on the 3 count columns only** (2026-06-22, user's explicit call).
- Superseded decisions (kept as history):
  - ~~Year filter and recency decay removed (`DATE_FLOOR` back to `as.Date("2020-01-01")`, decay code deleted, tests back to 172/172)~~ (2026-06-20, user: "we are re-winding") - superseded 2026-06-21 when the user reversed course ("revert to having the guard-dog and year filter"): `DATE_FLOOR <- as.Date("2022-01-01")` and all decay code re-applied, tests 179/179.
  - ~~`DECAY_PER_CONGRESS=0.5` (119=1, 118=.5, 117=.25) applied to all COUNT columns~~ (2026-06-21, `congress_moneyball_integrated.R`) - superseded 2026-06-22 by 0.8 on the 3 count columns only.
  - ~~Pivot to the SIMPLE `congress_scraper_looped.R` with each role as its own verbatim URL vector, default `DECAY_PER_CONGRESS=1.0`~~ (2026-06-22) - superseded the same day: the user asked to modify `congress_member_scraper.R` itself, roles are a field-token swap after all.
  - ~~Roles are NOT a token swap (congress.gov generates structurally different raw-JSON per role)~~ (2026-06-22 pivot) - superseded by `apply_role()` field-token swap (confirmed `original-cosponsor` against `congress_member_scraper_examination_query_backup.R`).
  - ~~Caucus scoring Chair 1.0 / Co-Chair (or Vice Chair) 0.75 / Member 0.5 (CSV approach, Army roster rows counted)~~ (2026-06-17) - superseded the same day by leadership-only scoring (Chair 1.0, Co-Chair/Vice Chair 0.8, rank-and-file 0).
  - ~~Ballotpedia used for committees (HTML scraping) and elections~~ - superseded by the YAML committees (`COMMITTEE_SOURCE`) and MEDSL elections (`ELECTION_SOURCE <- "medsl"`); `COMMITTEE_SOURCE <- "ballotpedia"` and `ELECTION_SOURCE="ballotpedia"` kept as legacy switches.
  - ~~Original `Wayback`-less discovery for MANUAL_PRESS_URLS only~~ - superseded 2026-06-18 by `auto_archive_fallback(org)` for auto-discovered members too.
  - ~~`CU_TC_PROCS` default 6~~ - raised to 8 on 2026-06-19 (user request); a 12-worker run was also used on 2026-06-20/21.
  - ~~Orchestrator abandoned workers on a 10-min stall read from stdout logs~~ (2026-06-19 bug) - replaced by `.hb`/`.done` sentinels, a 20-min idle guard (`CU_TC_CAP_MIN=300` absolute cap) and on 2026-06-20 by a per-shard watchdog.
  - ~~Per-topic grouping (drop `__MEMBER__`, group by sponsor)~~ - the user rejected it; kept per-member.
  - ~~Stage 5 regex `GEN_PRO_RX`/`GEN_ANTI_RX` + graded `TONE_LEXICON`/`score_graded` as the primary score~~ (to 2026-06-21) - replaced by DEBATE + LSD; the legacy score stays as a parallel comparison column.
  - ~~Plain-name Chuck/Bernie/Jim nickname rosters~~ (to 2026-06-10) - replaced by official-name rule.

## Next Steps

- [ ] Verify `field=cosponsor` live behavior of the role swap (offline-clean only as of 2026-06-22); the integrated 51-pass run itself completed 2026-06-24.
- [ ] Build a fresh adversarial scoring set before the next lexicon change (all eval corpora are in-sample, noted 2026-06-12).
- [ ] Re-crawl the ~21 previously-truncated members' indexes at the 2020 floor if the 2020-2021 releases are wanted (caveat from the 2026-06-20 revert; moot if the 2022 floor stays).
- [ ] Capture Timmons's distinct `documentsingle.aspx?DocumentID=N` releases by re-crawling his index (known residual, not done).
- [ ] Optional: dedicated IQ-CMS body selector (senate.gov IQ-CMS pages fall back to whole-page `<body>`, 2026-06-15).
- [ ] Optional: parallelize JS members across a chromote-session pool; fix 59 members with all-NA index dates (Sullivan 800 items 0 dates); flush the collector main pass per chunk.
- [ ] Optional: flatten `weighted_tone` triple loop and the `fetch_member_fulltext` `flush_ck` O(n squared) re-bind (noted, not fixed).
- [ ] Pending archive.org cool-down: the 2 HFSC-Dems Waters releases (`documentsingle.aspx?DocumentID=413709/412791`, 403 live) not yet recovered (2026-06-24).
- [ ] Full SNA graph later (user: "not there yet"); user may expand/override the 45 validation labels or hand-code a few hundred.
- [ ] Wire `cu_press_value_by_category` into the Moneyball Main Version Press layer only if the user reverses the 2026-06-22 standalone decision (careful openpyxl edit, backup first).

## R / RStudio working environment (user_r_environment, 2026-06-21)

The user develops in **R / RStudio on Windows 11**. R 4.6.0 is installed at `C:\Program Files\R\R-4.6.0\bin\Rscript.exe` (not on the bash PATH; reachable from PowerShell via the call operator `&`). They build web scrapers using chromote, rvest, dplyr, future/future.apply, progressr, writexl, clipr.
- **How to apply:** for offline checks (syntax/parse, pure-function logic), run `Rscript.exe` directly - e.g. parse with `invisible(parse('file.R'))`, or stub `library`/`plan` then `source()` to test helpers without network/chromote. Do NOT fire off the live scraper from the assistant side: it needs Chrome + network and hits congress.gov (rate-limit risk) - hand that to the user to run in RStudio. Keep RStudio-console limitations in mind (long single-line input is truncated ~4096 chars).
- **Shell-syntax gotcha (give the user the RIGHT form):** their default shell is **PowerShell**, NOT bash. The bash env-var prefix `CU_TC_PROCS=12 Rscript x.R` does NOT work in PowerShell (it errors / silently fails to set the var). PowerShell: `$env:CU_TC_PROCS=12; $env:CU_PR_WORKERS=6; Rscript "C:\...\x.R"`. RStudio console: `Sys.setenv(CU_TC_PROCS="12"); source("C:/.../x.R")` (system2 children inherit the session env). Only use `VAR=x prog` syntax when put in Git Bash. Also: scripts that reference sibling files by relative name must run from the project dir - `run_cu_pipeline.R` now self-locates (setwd to its own `--file=` dir) so launch cwd no longer matters; the bare scraper/collector still expect the project dir as cwd (the collector later also self-locates, 2026-06-21).

## Reference data (counts and thresholds, quick lookup)

| Item | Value |
|---|---|
| congress.gov URL | assembled 6922 chars ("Ann+Wagner"), template 6942 chars, 3 blocks, 31 keyword conditions |
| First full 119th run (2026-06-02) | 536 members, 1773 bill rows, 8 accented-name failures |
| Roster legscore | 533 names (531 voting + Eleanor Norton + Pablo Hernández Rivera); output sheet 138 cols |
| Integrated passes | 17 sections x 3 roles = 51; 388 sponsored bills; 2359 edges / 635 nodes / 1941 original ties |
| Decay | `DECAY_PER_CONGRESS=0.8` (3 counts only); press `DECAY_HALFLIFE_YEARS` 2y; `DATE_FLOOR` 2022-01-01 |
| Press scraper | `NEUTRAL_BAND=2`, `MAX_INDEX_PAGES=220`, `MAX_PAGES_UNDATED=40`, `GRADED_CUTS=c(1,2,3.5,5.5,8)`, `GRADED_STRONG_CAP=0.6`, `COALITION_LEAN_WEIGHT=3.0`, `COALITION_MIN_LEAN=0.05`, `COALITION_MIN_MEMBERS=6`, `COALITION_MIN_SIGNAL=2`, `COMMITTEE_MAX_ITEMS=80`, `NEWS_MAX_ITEMS=3000`, `JS_NAV_TIMEOUT=25`, `JS_MEMBER_BUDGET=600`, `CKPT_EVERY=25`, `FULLTEXT_DELAY=0.15`, `POLITE_DELAY=0.5` |
| Tracked bills (`BILLS`) | 53 (ACU outline 40 + ACU news 6 + markup grind 7) |
| Index / scoring snapshots | 190,782 (2026-06-12 first live) -> 227,698 -> 230,866 indexed; 286,335 "all" sweep; 293,935 collector coverage base (86.6% first audit); 290,778 -> 250,420 @2022 floor; 272,252 scored vs 3,821 CU-relevant (2026-06-19) |
| Offline test counts | 27 -> 68/71 -> 92 -> 151 -> 171 -> 172 -> 179 (current 179/179) |
| DEBATE | zero-shot 0.667 acc (45 labels) -> fine-tuned base 87.2% acc / F1 0.833 / kappa 0.771 (156-row test) -> deployed `debate_finetuned` ~85% / kappa 0.76 on member-grouped gold; 3,701 releases: support 2,323 / neutral 1,151 / oppose 224 |
| Census | 489 rows x 37 cols = 52 state + 437 CD; 25 metric columns; ACS 2024 1-yr; CBP 2020 |
| Ballotpedia | 537 members; 709 raw / 682 CU-relevant committee memberships over ~230 members; 38 caucus officer rows (113 with Army roster); MEDSL House 423/437, Senate 100/100 |
