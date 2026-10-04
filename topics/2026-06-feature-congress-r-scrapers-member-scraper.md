---
type: topic
title: "congress.gov member scraper (Congress R scrapers)"
aliases: ["Congress R scrapers: congress.gov member scraper"]
category: "feature"
status: "completed"
people: []
actors: []
objective: ""
created_at: 2026-06-03
sources: []
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/completed", "domain/data", "category/feature"]
part_of: "[[2026-06-feature-congress-r-scrapers]]"
---

# congress.gov member scraper (Congress R scrapers)

> The congress.gov member scraper of 2026-06-02 to 06-10: purpose and outputs, result-row markup, the Cloudflare bypass and cookie-replay fast path, official-name roster rules, the pinned roster order, the bug-audit fixes and the chunked verbatim-URL rule. Part of [[2026-06-feature-congress-r-scrapers]] (project [[melange-systems]]).

## congress.gov member scraper (`congress_member_scraper.R`)

### Purpose and outputs
Main project in the directory: a multi-layer R web scraper for congress.gov. Uses chromote (to bypass 403), user-agent rotation, randomized back-off, and `future`/`future.apply` parallelism. The original scraped a single search across many page numbers; it was re-oriented so the switch variable is the MEMBER OF CONGRESS (the `original-cosponsor` value in an advanced-search query). Purpose (the Why): measuring legislative activity (insurance/data-privacy/financial-services bills) per individual member across congresses 119/118/117/116.

Two original outputs: `Bills_Individual` (one row per bill) and `Members_Statistics` (one row per member, including the summed Bill Count facet `#innerbox_congress .count`). New per-bill nodes: Title `.result-title`, Sponsor `.result-title + .result-item a:nth-child(2)`, Committee `.result-item:nth-child(5)`, Last Action, Cosponsor count.

### Result-row markup (confirmed from dumped HTML, 2026-06-02)
- Each bill is `li.expanded` (a hidden `li.compact` duplicate follows - scrape only `li.expanded`). Inside: `.result-heading a` (bill no.), `.result-title`, then `.result-item` spans for Sponsor / Committees / Latest Action, plus `.result-item.result-tracker`.
- **Cosponsor count** = TEXT of the cosponsors link: `<strong>Cosponsors:</strong> (<a href=".../cosponsors...">42</a>)`. Parse via `html_nodes(bill,"a[href*='cosponsors']")` -> integer. The old `gsub("\\D","",cosLine)` glued the Introduced date onto the count -> values in the thousands (fixed). Fallback regex `Cosponsors:\\s*\\(\\s*[0-9]+`; default 0.
- **Last Action -> short status:** congress.gov tracker carries it as `<p class="hide_fromsighted">This bill has the status X</p>` where X is exactly the wanted label. Observed values across the full roster: Introduced, Passed House, Became Law, Passed Senate, Resolving Differences, Agreed to in House. Extract with `sub(".*has the status","",...)`; fallback `classify_last_action()` keyword-maps the raw "Latest Action:" text.
- **AvgCosponsors NaN -> 0:** `mean()` of an all-NA group is NaN; `member_agg` now uses `ifelse(all(is.na(CosponsorCount)),0,round(mean(...,na.rm=TRUE),2))`, and the Members `left_join` coalesces NA/NaN AvgCosponsors and NA TotalCosponsors to 0.

### Whole-roster scale and the cookie-replay fast path (2026-06-02)
- `FETCH_MODE` (`"http"` default / `"browser"`): http harvests Cloudflare cookies + UA once from the real browser (`harvest_cf_session()` -> `Network$getAllCookies`, saved to `cf_session.rds`), then fetches every page with parallel `httr::GET` (no render) via `plan(multisession, workers=HTTP_WORKERS=6)`. `fetch_html_http()` returns parsed HTML, `"CHALLENGED"`, or NULL. `fetch_page()` dispatches http -> browser.
- The harvested session is threaded as an explicit `cf=` argument through `scrape_member_overview`/`scrape_detail_page`/`fetch_page`/`fetch_html_http` so it serializes to future workers (default-arg globals are not reliably exported).
- Driver: harvest once -> parallel http in rounds; members returning status `"challenged"` get the cookie re-harvested and retried; any still challenged fall back to the browser sequentially in the MAIN process (workers cannot reach the browser).
- Known risk (as written 2026-06-02): `cf_clearance` may be TLS-fingerprint-bound, so httr replay can be re-challenged; `validate_http()` (run once) tells you if the fast path works; if not, set `FETCH_MODE <- "browser"`. UNVERIFIED at the time - then VERIFIED by the first full 119th roster run (see Rules: no Cloudflare challenges, 536 members, 1773 bill rows).
- Roster: `get_roster_119()` pulls current House+Senate (536 names) from `https://unitedstates.github.io/congress-legislators/legislators-current.csv` (NOT theunitedstates.io - that redirects to HTML; NOT raw.githubusercontent - 404). Gate with `USE_FULL_ROSTER <- TRUE`. Added `library(httr)`.

### Root cause of zero nodes = Cloudflare, bypass applied 2026-06-02
Diagnostics showed every page returned `title = "Just a moment..."` (Cloudflare interstitial) - NOT a URL or selector bug. URL construction is proven byte-identical (6922 chars; see Rules). The browser layer was rewritten:
- Replaced the mismatched multi-engine `user_agents` rotation (a bot signal) + `plan(multisession, workers=4)` with `BROWSER_MODE` (`"remote"` default / `"headless"`), a single consistent `CHROME_UA` (Chrome 148), and `plan(sequential)`.
- New functions: `launch_scrape_chrome()` (system2-launches real headful Chrome with `--remote-debugging-port=9222 --user-data-dir=%USERPROFILE%\chrome_scrape_profile`), `init_browser()` (attaches chromote default object via `Chromote$new(ChromeRemote$new(...))`), `apply_stealth(session)` (masks webdriver/chrome/languages/plugins; UA override only in headless mode), `wait_past_cloudflare(session)` (polls title/challenge DOM until cleared).
- `fetch_rendered_html` and `scrape_detail_page` now call `apply_stealth`; `fetch_rendered_html` waits past Cloudflare before reading DOM. `debug_member` and both `RUN_FULL` driver blocks call `init_browser()`. Removed the `mem_used()` line (pryr not loaded, was crashing). File parse-checked OK under Rscript.
- **Workflow (remote mode):** `launch_scrape_chrome()` (opens real Chrome - solve any captcha by hand ONCE, cookie persists in the profile), `validate_http()` to confirm the cookie-replay path, then source with `RUN_FULL <- TRUE`.

### Roster naming (fixed 2026-06-10; user: "James McGovern" miscalled)
The old nickname-first logic miscalled 33 of 536 members. congress.gov uses the OFFICIAL bioguide name = the CSV's `full_name` column, NOT the CSV `nickname` (bioguide says "James P. McGovern" though nickname is "Jim"; a "Jim McGovern" sponsor search returns nothing). It cuts both ways: some official names ARE nicknames (Chuck Edwards, Nikki Budzinski, Gabe Vasquez, Nick LaLota, Val Hoyle, Greg Casar). Rule now: first non-initial given-name token of `full_name` (after stripping "quoted"/(paren) nicknames, initials, suffixes, surname tokens) + `last_name` column. Other corrections: Bernie -> Bernard Sanders, Chuck -> Charles Schumer, Bobby -> Robert Scott, Buddy -> Earl Carter, Rick -> Eric Crawford, Hal -> Harold Rogers, Hank -> Henry Johnson, Chuy -> Jesús García, Mónica -> Monica De La Cruz. The `MEMBER_NAME_OVERRIDES` named vector (defined above the function) is the manual escape hatch for future mismatches; duplicates across members now emit a warning (currently zero collisions). Verified offline against the cached CSV: 536 unique names, all spot names correct, override hook works.

### 2026-06-10 restructure: single-result layout fix
User reported bills missed for members "who only interacted with one piece of legislation": a ONE-HIT advanced search REDIRECTS straight to the bill detail page (no `li.expanded` at all). Fixed in `congress_member_scraper.R` with `is_bill_detail_page()` (`h1.legDetail, #summarySelector, #bill-summary`) + `parse_single_bill_page()` using user-supplied backup selectors: `tr:nth-child(1) a` sponsor, `tr:nth-child(2) td` committee, `li:nth-child(6) a` cosponsor tab text, `.last` last action (hidden "has the status" text tried first), `strong` title (h1 fallback), `a ~ a + a` legislative session, `#summarySelector a:nth-child(1)` href = detail link (canonical-link fallback); summary taken in place from `div#bill-summary > p`. `.last`/`strong`/`li:nth-child(6)` are UNVERIFIED against live bill pages but every one is fallback-guarded. Bills gained an integer `Congress` column (single-result parser sets it; Stage 2.2 fills the rest from DetailLink). Parser verified offline against synthetic detail-page HTML (all fields correct).

Same pass: removed ALL debug-file generation (`debug_url.txt`, `debug_*.html`, `validate_http.html` dumps, `debug_member()`, 8-candidate `result_selectors` probe); `wait_for_results`/`wait_past_cloudflare` now use ONE `Runtime$evaluate` per poll; Stage 2 fetches only rows with missing summaries and deduplicates DetailLinks; browser-mode detail scraping reuses `fetch_rendered_html` (bespoke chromote block deleted); clipboard lines moved inside `if (RUN_FULL)`. Parse-checked OK.

### Pinned roster order (2026-06-10)
User pastes the clipboard columns from multiple runs/query-variants side-by-side into one spreadsheet, so every run MUST emit the identical vertical member sequence. `get_pinned_roster()`: the first run sorts the roster with locale-independent `sort(method="radix")` and saves to `roster_119_names.rds`; later runs reuse that file verbatim (immune to roster-CSV churn). Deleting the cache (or editing `MEMBER_NAME_OVERRIDES`, which requires deleting it) changes the order - the user must then re-anchor the spreadsheet. The clipboard block orders via `Members[match(members, Members$Member), ]` (no locale `order()`) and first copies `Members_sorted$Member` as the anchor name column. Verified offline (pin survives a changed source; `match()` restores pinned order from a shuffled frame). (Later replaced by the direct full-sheet writer in the integrated scraper: the 533-name pinned roster and clipboard workflow were dropped.)

### Bug-audit pass (2026-06-10, user-approved fixes 1-7)
1. `Bills$Congress` now backfilled on the frame itself from the DetailLink regex before `session_rates` (was only computed inside the local pipeline; export had NA Congress).
2. HTTP-mode fetch failure on ANY page (not just page 1) sets status "challenged" so partial pagination is retried, not shipped.
3. `scrape_detail_page` returns "CHALLENGED" distinctly and Stage 2.2 does ONE re-harvest + retry round for challenged links (`fetch_summary_round` helper), warning with a count if any remain.
4. `fetch_html_http` treats ANY status >= 400 as "CHALLENGED" (was 403-only; 429/5xx error pages parsed as zero results).
5. Hard `stop()` after the `members` assignment when the roster is empty.
6. `wait_past_cloudflare` evaluate-errors map to NA and keep polling (was error -> "cleared").
7. `scrape_member_overview` is now an error-proof tryCatch wrapper around `scrape_member_overview_impl` returning empty + "challenged" (one member error no longer kills a parallel round).
User DECLINED fallback tightening (#8 `classify_last_action` passed.*house cross-match, #9 first-`<strong>`-anywhere title risk, #10 `li.expanded` fallback runs before the detail-page check) and the stale "terms (all OR)" comment fix - do not re-apply without asking. The query in the file was then a SINGLE phrase "Credit Card Competition Act" (user swapped it again; subject-area blocks removed).

### Query-variant warning
The user's pasted "current" code and the old disk file held DIFFERENT queries. Disk (older): examination/supervision/CTR/SAR terms, switch field `original-cosponsor`, 3 subjects. Pasted (now in `congress_member_scraper.R`): credit union CAPITAL terms (supplement/secondary/subordinated debt/PCA), switch field `sponsor`, 4 subjects (+Housing). The old variant is preserved verbatim in `congress_member_scraper_examination_query_backup.R` - the user appears to iterate queries by swapping `raw_url_parts`, so always diff the URL block before overwriting.

### Rules: chunked verbatim URL, no JSON (feedback recorded 2026-06-03)
Rule: for the congress.gov advanced-search scraper, build the results URL from the user's EXACT known-good encoded link, stored as a character vector of short chunks and reassembled with `paste0(collapse = "")`. Only the cosponsor name varies - via a `__MEMBER__` placeholder swapped with `sub(..., fixed = TRUE)`.
- **Why:** the user reported two failures: (1) rebuilding the `raw=` query from JSON (`jsonlite::toJSON` + custom encoder) "does not seem to work" - it produced a run with zero results; (2) the RStudio **console** truncates any single input line (~4096 chars), so a one-line ~6,900-char URL literal gets silently cut off and is "rendered useless." Chunked `paste0` dodges both: no long physical line, and no JSON round-trip that could fail to reproduce the exact query.
- **How to apply:** whenever editing the query for the congress scraper, keep the chunked verbatim approach. Each chunk decodes to one `{"op":...,"inputs":{...}}` condition; conditions after the first start with `%2C`. Verified offline: assembled URL is 6942 chars, decodes to valid JSON with 3 blocks and 31 keyword conditions. Do not reintroduce jsonlite for URL building.
- **Placeholder gotcha (fixed 2026-06-02):** the encoded placeholder in the original-cosponsor chunk and the `sub()` pattern in `build_member_url()` MUST be byte-identical. A run produced zero results because the chunk had `%22_MEMBER_%22` (single underscores) while `sub("__MEMBER__", ..., fixed=TRUE)` looked for double underscores - so `sub` matched nothing and every URL carried the literal placeholder as the cosponsor value. Canonical token is `__MEMBER__` (double). `build_member_url()` now `stop()`s if the template lacks `__MEMBER__`, so this cannot fail silently again. `check_url.R` confirms the assembled+substituted URL == `expected_url.txt` (6922 chars, "Ann+Wagner") - run it after any URL/placeholder edit.
- **Accented-name encoding (fixed 2026-06-02):** first full 119th-roster run: the HTTP cookie-replay path WORKED (no Cloudflare challenges; 536 members, 1773 bill rows), but 8 members with non-ASCII names (André Carson, Ben Luján, Linda Sánchez, Nydia Velázquez, Nanette Barragán, Chuy García, Mónica De La Cruz, Pablo José Hernández Rivera) failed with `read_html` "'' does not exist in current working directory" = empty server response. Cause: `build_member_url` only did space -> '+', sending raw multibyte bytes -> malformed URL. Fix: `gsub("%20","+",URLencode(enc2utf8(trimws(name)),reserved=TRUE))` (e-acute -> %C3%A9, space -> +, hyphen/ASCII untouched; "Ann Wagner" -> "Ann+Wagner" still byte-identical). Also `get_roster_119` now strips "(Nick)" parentheticals (CSV first_name "James (Jim)" -> "James Moylan"). Transient HTTP/2 "Stream error"/"Timeout" are normal flakiness and auto-recover on the driver's retry rounds.
