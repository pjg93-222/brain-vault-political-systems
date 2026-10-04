---
type: actor
name: "June 2026 capstone dashboard: spec and engine (06-26/27) (Melange dashboard)"
aliases: ["Melange dashboard (Moneyball.html): June 2026 capstone dashboard: spec and engine (06-26/27)"]
category: "dashboard"
description: "The June 2026 capstone dashboard spec and engine of 06-26/27: the live engine and pathfinders, the head-to-head and cheapest-flip batch, research-grounded pathfinder and budget modes, the realism pass, the active-ask chain-hold and the July network viz requests."
repository: ""
stack: ""
status: "active"
team: ""
criticality: ""
pci: false
known_issues: []
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/frontend"]
part_of: "[[melange-dashboard]]"
---

# June 2026 capstone dashboard: spec and engine (06-26/27) (Melange dashboard)

> The June 2026 capstone dashboard spec and engine of 06-26/27: the live engine and pathfinders, the head-to-head and cheapest-flip batch, research-grounded pathfinder and budget modes, the realism pass, the active-ask chain-hold and the July network viz requests. Part of [[melange-dashboard]] (project [[melange-systems]]).

## June 2026 capstone dashboard: spec and engine (2026-06-26/27)

Built 2026-06-26 after the full audit as the LAST roadmap item of the model ([[melange-systems]]). Two scripts in `Melange Systems/fec/`; output the standalone file `Melange Systems/Moneyball Dashboard.html` (opened in a browser; about 111 KB at first, data embedded).

- **`build_dashboard_bundle.py`** -> `dashboard_data.json` (columnar, minified). Keys: issues(18), name/x/y/party/gen/rank/nl/bp/cf/stance (533 each), edges (top 420), flip/coal (per-issue alloc dicts), stats (18). Extended with `play` (per-member electoral char c=contest / d=defend / n=none), `epval`, `frontier` (per-issue nested budget-frontier path [b,spread,seedIdx,type], 17 of 18: CFPB Reach shares CFPB), `opt` (optimizer alloc/base/final/conv). Side effect: also writes `bipartisan.json` (recompute, stable). Needs networkx (spring_layout seed=7).
- **`make_dashboard_html.py`** -> `Moneyball Dashboard.html`. PRESERVES the original spec exactly (dark `#0d1117` GitHub theme; header; bar = Issue dropdown / Mode Coalition|Flip / Color / Find; 3-col grid = left stats+money / center force-layout canvas / right Top targets; hover tooltip with rank+bipartisan+confidence; legend; zoom/pan). ADDED in the same design language: (1) **budget-frontier slider** (the spec'd "live lookup of precomputed path" that was missing): coalition mode, % of each topic's max budget, drives funded seeds from frontier.path, shows spread base -> cur + seed entry order in Top targets; (2) **Electoral** as a 4th Color mode (contest = orange / defend = cyan / none = dim from `play`); (3) **Adaptive optimizer card** (left, bottom): base -> final winnability, top 8 cross-topic allocations, conversions green-dotted, click to fly-to.
- **Regenerate:** run `build_dashboard_bundle.py` then `make_dashboard_html.py` (needs `per_topic_alloc.json`, `per_topic_coalition.json`, `budget_frontier.json` all-topics, `optimize_result.json`, `electoral_plays.json`, `confidence.json`, `category_stance.json` current).
- Verified the data layer in Python (slider monotonic, seeds in marginal order, fallback for null frontier, optimizer/flip/electoral resolve) + script structurally balanced. NOT browser-rendered at that time (no node/playwright/browser in the agent env): open the file to confirm visually.

### Live engine + pathfinders (2026-06-26)

The dashboard embeds a faithful in-browser port of the models (user chose "live in-browser" over a server/presets), so the two pathfinders + scenario generator work with no backend.

- `build_dashboard_bundle.py` bakes an `engine` block (imports flip_model as the source of truth): full adjacency (1874 edges, not just the 420 drawn), per-member cu/ind/rcp (receipts floor)/sco/nlraw/bpf, eng matrix (18 issues x 533), constants (WM/WP/HALFF/BASE/BETA/smax/MAXSHIFT/HALF/DTHRESH/BSCALE/CEDGE/MC/SEED), PERS, THETA, and `refflip` (Python baseline winnability per issue for an on-screen self-check).
- `make_dashboard_html.py` JS engine: `flipModel` (rebuilds cpf, edge prob P=(w*cpf)/(w*cpf+4), nA/nB, pflip, tgt -> winnability), `prime` (lt_priming port: theta-pressure gap, recruit cheap neighbors, close residual with money), `spread` (competitive cascade with splitmix64 edge-keyed CRN matching scenario.py; bystanders rolled deterministically per (it,member): edge draws match Python, bystander RNG differs so absolute spread is indicative, delta is clean).
- UI: click any node (or a target/optimizer/recruit chip) -> MEMBER PANEL: stance/overall/party/bipartisan/conf/electoral; **Flip this member** (priming recipe: gap, $ money + recruit neighbors); **Scenario** (live CU $ / competitor $ sliders -> winnability delta this-issue + all-issues + net-lean shift + defection warning, all exact closed-form; "Run coalition cascade" button -> spread delta). `engchk` badge bottom-right shows live flip-total vs Python ref.
- VALIDATED: the ported flip model reproduces Python refflip to max diff 0.0513 across all 18 issues (bundle rounding only), FAITHFUL. Priming output sane (Van Hollen $50k, Warren $153k+10 recruits on Interchange). Could NOT browser-render in the agent env; the engchk badge is the user's on-screen confirmation. The 3 asks now answered IN the dashboard: max legislative support = budget-frontier slider; flip a member = priming panel; scenario = live money sliders + cascade.

### Head-to-head + cheapest-flip batch (2026-06-26)

- **Head-to-head** (member panel, under the scenario sliders): a CU-pull vs industry-pull tug-of-war bar (green/red) + live flip-odds %, plus a BREAK-EVEN line: the CU $ needed to restore the member's baseline flip-odds against the current competitor spend ("cannot offset" when q>=1). Closed form: solve a(CU)/(a(CU)+b(comp))=pfbase for CU via the capacity-aware money term. Validated (Van Hollen Interchange: 23% base -> 6% under $100k competitor -> $11k CU restores; the saturating curve means $500k competitor only needs $15k).
- **Cheapest to flip** (Targets-panel toggle `rtog`: Allocation | Cheapest to flip): runs `cheapestFlips(issue,16)` = prime() over all members sorted by $, shows the cheapest tip-ins + total $ to flip them, and rings them purple on the network (`flipHi`). Answers "flip the cheapest N members on this issue."
- Dashboard now 216 KB, structurally clean (balanced, DATA parses); the engine check badge is the on-screen check.

### Feedback fixes (2026-06-26)

- **Contest primary-vs-general bug:** I had HARDCODED "contest (primary)" for every contest in the dashboard. Data was always correct: `electoral_plays.json` computes route='primary' or 'general' per member (43 primary / 10 general; generals are the competitive seats: Fetterman/Tillis/Baldwin/Budd). Fixed: bundle `play` now encodes c=contest-primary, g=contest-general, d=defend, n=none; ELCOL adds g (fuchsia `#d946ef`), PLAYLBL shows the real route in tooltip + member panel; the Electoral color legend lists primary/general/defend/none separately ("general its own category": interpreted the user's "general its own tab" as separating general-election contests in the Electoral view; flagged for confirmation).
- **Node sizing:** radOf capped (`min(sqrt(a)*0.8,7)`) + large nodes (r>4.5) drawn at 0.78 alpha so outsized-influence nodes stop obscuring smaller ones.
- **Cascade -> CO-SPONSOR PATHFINDER:** removed the "Run coalition cascade" button (showed no change for money-only scenarios, so it looked broken). Replaced with the multi-objective pathfinder the user actually wanted: from ONE seed (selected member) toward an optional key-persuadable target. `buildRoute` lays the highest-probability path seed -> target first (max-product Dijkstra `distToTarget`, guaranteeing reach if connected), then `grow()` adds co-sponsor spread (recruitability PE x onward-reach log(deg) x target-proximity). Draws the recruitment tree (green edges + dots, green seed ring, gold target ring), reports "N co-sponsors recruited · reached target yes/no". Validated in Python: connected tree, reaches connected targets (Roger Williams -> French Hill/Perez/Van Hollen all reached at 30 recruits). The network is cross-chamber-connected. Dashboard 220 KB; code parens/braces balanced (the -2 `()` was inside strings/comments, harmless); flip self-check still faithful.

### Pathfinder v2: sponsor -> target (2026-06-26)

Reframed per user: a bill SPONSOR (seed) reaches a TARGET, building co-sponsors along the way.

- `buildPath(sponsor,target)`: the OPTIMAL max-product recruitment chain (trace argmax PE[cur][v]*distToTarget[v]) -> natural length (3-4 members typically, NOT the old fixed 30). Per-hop $ = CEDGE/max(0.05,edge_prob) (harder asks cost more), cumulative total. Lists the PEOPLE on the path + $ per hop in pathout.
- `cascadeReach(path)`: the INFLUENCE CASCADE: seed the recruited chain as pro co-sponsors, run the competitive IC (spread()) -> about N total co-sponsors reached (variable, the "build influence along the way").
- Draws the chain (thick green path + dots, green sponsor ring, gold target ring). UI: "bill sponsor X → reach target". Validated: paths vary by distance, reach connected targets, $ sane (Williams -> Hill 3 mbrs $109k; Barr -> Van Hollen 4 mbrs $373k).
- NEXT (user wants to "explore other modes along the way"): candidate modes to offer: multi-target (reach several persuadables), cheapest-path-to-majority, defend-a-sponsor, budget-constrained path, head-to-head route vs a competitor's. Dashboard 221 KB, code balanced.

### Research-grounded pathfinder modes (2026-06-26)

The user supplied 12 papers (read in order via PyMuPDF text extraction to scratchpad; `01_identity-signaling` is image-only / 9 chars so inferred from its homophily-signaling topic). Key grounding:

- **04 Sotoudeh-Porter-Krishnagopal** "Network measure of cosponsorship influence on bill passage": influence (network structure), NOT cosponsor COUNT, predicts passage, so the path should be the most-reliable INFLUENCE chain.
- **06 Aref-Neal** "Hidden coalitions via optimal signed-network partition (BLP, globally optimal)": the gold standard for "mathematically impenetrable"; the hidden 3rd coalition = highly-effective legislators, grounding multi-target.
- **09 Furnas-LaPira-Hertel-Fernandez-Drutman-Kosar** survey experiment: staff act on CO-PARTISAN, district-relevant INFORMATION more than money; everything reported at 95% CI ± MOE, so estimates carry quantified reliability, not guarantees.
- **02 Bakker** partisan cues are real (not ignorance); **07 Huneeus-Kim** lobbying causally distorts (geo-proximity instrument); **08 Bacik et al.** lobbying-network dynamics; **03 Azaiez-Mandel** EC lobby hypergraph; **05 Harrison et al.** lobbying-record data mining. Plus upstream Bharathi-Kempe / Golovin-Krause.
- **PRINCIPLE:** every estimate = a PROVABLY-OPTIMAL quantity carrying an EXACT reliability. Path = max-product (the single most-reliable chain, Dijkstra on -log p); `pathReliability` = Π edge-probs = P(every ask holds), the provable max, honest and modest (Crapo -> Van Hollen best = 4.9%), NOT "bill passes".
- **MODES built** (toggle in pathfinder; path-to-majority SCRAPPED per user "insane"): (1) Sponsor -> target = optimal chain + reliability% + per-hop $/prob + people + influence cascade; (2) Best sponsor = rank pro members by reliability/cost of their chain to a target (paper 04); (3) Multi-target = shared recruitment tree to several targets, coverage X/N + per-target reliability (paper 06). The grounding footnote cites the papers in-UI. Validated in Python. Dashboard 226 KB, balanced. HEAD-TO-HEAD route (CU vs industry counter-chain) still available to add next.

### GCOMB-grounded budget mode + more research (2026-06-26)

The user added GCOMB (Manchanda et al., NeurIPS'20, arXiv:1903.03332) "first and foremost" + 5 local papers (lobbying-coalitions review / Pritoni, empirical-lobbying / Bombardini-Trebbi annurev, lobbying-networks / Kim-Kunisky, committees-network / Porter-Mucha-Newman PNAS 2005, + a cosponsorship duplicate). GCOMB fetched via ar5iv.

- GCOMB takeaway for our SMALL graph: skip the GCN/Q-learning ML (it only MATCHES greedy: 0.998 vs 0.99 vs 1.0 optimal); keep the transferable ideas: (1) lazy/CELF greedy = (1-1/e) guarantee, (2) PRUNE to non-trivial-degree candidates, (3) LOCALITY: count only NEWLY-covered members (loc(v,S)=|N(v)\∪N(u)|) so co-located recruits aren't redundant.
- Built **Budget mode** (4th pathfinder toggle: Path|Best|Multi|Budget): `budgetRecruit(sponsor,nSeeds)` = cost-bounded MAX-COVERAGE greedy over the cosponsor network; cov[v]=1-Π(1-p) over recruiters; marginal = newly-covered (GCOMB locality); pruned by degree; input = budget $k -> nSeeds=$k*1000/CEDGE. Output: diversified recruit set + expected reach (coverage). Validated: marginals DIMINISH (13.7 -> 11.7 -> 9.0 -> ...) = submodular / (1-1/e); the set is cross-network diverse (Vargas/Emmer/Merkley/Barr). Grounding footnote cites GCOMB + Porter-Mucha-Newman + Kim-Kunisky.
- Network/community grounding: Porter-Mucha-Newman (committee community structure), Kim-Kunisky (latent lobbying communities): the cosponsor network has real community structure the pathfinder exploits. Dashboard 229 KB, balanced, all 4 modes validated in Python.

### Realism + grounding pass (2026-06-26)

- **Honest grounding stance:** the machinery is well-grounded METHODOLOGICALLY (Sotoudeh-Porter-Krishnagopal influence, Aref-Neal coalitions, Porter-Mucha-Newman committees, Kim-Kunisky lobbying communities, GCOMB budget-IM, Bharathi-Kempe cascade). EMPIRICAL grounding is PARTIAL: only a few give calibratable effect sizes (Furnas: info>money & capped; Bakker: cue receptivity; Bombardini-Trebbi & Huneeus-Kim: small/capped lobbying returns). The model's numbers are reasonable defaults, NOT fitted. To use the papers properly = CALIBRATE not cite: bound $ by FEC + small measured returns, make reliability (relationship/info) the lever, weight co-partisan. Told the user this directly.
- **Realistic spending (FEC):** replaced cost=CEDGE/prob (exploded to $200k/hop) with `recruitCost(p)=1000+9000*(1-p)` in [$1k,$10k]: PAC -> candidate FEC cap about $5k/election, $10k/cycle; difficulty now shows in RELIABILITY not dollars (Furnas: money capped, info is the lever). Barr -> Van Hollen now $26k total vs old $200k/person.
- **Overall CU stance = 19th selectable ISSUE** (toggleable like Interchange): `build_dashboard_bundle` appends it: stance = gen (R&A col7) tier, eng = mean per-issue, flip/coal = aggregate per member, frontier=null, refflip=0 (engchk shows "aggregate layer"). stance string width 18 -> 19.
- **SYSTEM SHOCKS** (scenario panel "System shocks" subsection): (1) members drop out (comma-sep input) -> `dropped` set; tracePath/spread/budgetRecruit skip them; the path REROUTES (drop Banks -> Barr -> Rutherford -> Menendez -> Van Hollen), red X on map; (2) executive branch toggle none/opposes/supports -> `execMode` factor in spread bystander mobilization (oppose 1.6x = exec cue mobilizes opposition per Bakker + Furnas veto-point; support 0.6x). `applyShocks()` re-runs the active pathfinder under the shock.
- ALSO (from the prior GCOMB turn, confirmed wired despite an 'internal error' message): 4th pathfinder mode BUDGET = GCOMB-grounded (1-1/e) max-coverage greedy with locality (`budgetRecruit`). Footnote cites GCOMB/Porter/Kim/Aref/Furnas. Dashboard 240 KB, parens/braces/divs balanced, 19 issues, engchk faithful per-issue.

### Path "reliability" -> active-ask chain-hold (2026-06-27)

The old path reliability = product of PASSIVE-diffusion edge-probs across hops compounded to absurd lows (0.1% for a 4-hop chain), indefensible to a boss. Replaced with ACTIVE-recruitment ask success: `activeP(p)=p/(p+(1-p)*ASKM)`, ASKM=0.07 = a constant ODDS-RATIO shift (odds(activeP)=odds(p)/ASKM, about 14x), mathematically a valid logistic/log-odds update (monotone, bounded, rank-preserving). HONEST CAVEAT (told the user, per `feedback_never_appease`): the odds-shift FORM is rigorous but the 14x MAGNITUDE is an unestimated dial tuned to a plausible range (no study pins active-vs-passive recruitment lift). Display = `chainHold` = product of activeP = P(every ask lands first-try, no reroute): the HONEST whole-chain floor (about 17% for the example), NOT the flattering geometric mean (about 55%) which is only per-hop-typical. Shows "Whole chain holds X% · weakest ask Y%" + per-hop activeP, applied consistently to path/best/multi modes (best ranks by chainHold). Budget mode is a coverage SET (no chain). `pathReliability` kept only internally. ASKM env-dialable.

### Network viz requests shipped (2026-07-04/05)

Paul's two requests (2026-07-04 ~01:20, built after the corpora settled): layer toggles on the SNA viz and a signed cross-media REFERENCE layer. Cosponsor/sector network detail: Cosponsor and sector networks.

1. **Layer toggles:** `build_multilayer_network.py` writes provenance per edge ('social', 'cosponsor+social', etc.) into the AUG xlsx; `dashboard_data.json` 'edges' formerly dropped provenance -> plumbed through `build_dashboard_bundle` into the edges array; layer checkboxes in the dashboard template's network panel (same pattern as the existing issue filters). Layers: cosponsorship, X/Twitter mentions, retweets, committee co-membership.
2. **Signed cross-media REFERENCE layer ("who references whom, positively or negatively"):** new analyzer `member_reference_layer.py`: scan the speeches table (CREC + CHRG + INTERVIEW, 20M+ words, full text) + press titles + tweet RT/mentions for roster-member references in another member's OWN speech; extract context windows; valence each via the Fable API (cost-gated: probe mention volume first, cap contexts per dyad about 5); output signed directed edges {a,b,source,n,valence}, a toggleable layer + desk relationship panel. This supersedes/absorbs the earlier dyadic-warmth probe (which found the signal real but starved at 434 tweet mentions and fooled lexically; the full speech corpus + Fable valence fixes both). Attribution discipline: QA2-hardened name resolution (first-name compatibility, accent transliteration, no unique-surname guessing).
3. **AUTHORIZED 2026-07-04 01:35 ("Once created, go ahead with it. Once you get everything done audit")**: `--score --go` pre-approved when the probe lands (sequence after tweets/persona if cost > headroom; $230 balance, about $185 committed); dashboard wiring (toggles + signed reference edges) after the overnight pipeline's last rebuild; then a FULL CLOSING AUDIT (kernel + audit_full + pipeline + 0/533 + new-artifact sanity: api_press_stance, api_tweet_stance, member_references) before the morning report.
4. **DESK RELATIONSHIP PANEL (same day, verified: Khanna -> Massie +1 n=9 with quote, Graham -0.4, Collins -1 red; inbound column too):** `make_member_desk.py` packs `refs` {out[:8], in[:8], quotes on top-4 out} into each member record; tpl `relHTML` renders "Cross-media references — makes / receives" inside the Relational accordion. Desk 5650KB.
5. **BOTH SHIPPED 2026-07-04 (verified in browser, no console errors):** `build_dashboard_bundle.py` now emits `elay` (420-char per-drawn-edge provenance code from the AUG Provenance sheet: c/s/h/e/m; top-420 mix was c=337 s=1 e=17 m=65) + `refs` (1,437 signed dyads from `member_references.json`, n_scored>=2, [ia,ib,net,n]); the dashboard tpl has a LAYERS checkbox bar (cosponsor/social/committee/engagement/references±, refs default OFF); refs draw green (net>+0.15) / red (net<-0.15) / grey, alpha by evidence count, under the node dots, in both layouts. Bundle 218KB. The pipeline reruns bundle+html on next run; the changes are in the live-tree scripts so they persist.
6. **CO-APPEARANCE LAYER SHIPPED 2026-07-05 @a693ae0 (user: "if they appear in public with someone"):** `fec/co_appearance_layer.py` -> `co_appearance.json`: undirected pairs who each gave a SUBSTANTIAL appearance (>=4 turns OR >=200 words; without the floor 86% of member-episode rows are played soundbite clips, giving leadership clip-montage false pairs, Jeffries<->Johnson 176 -> 7) in the same segment-merged interview episode; >8-member episodes skipped as events; CHRG excluded. 1,151 pairs / 605 bipartisan (52%) / 111 repeat drawn at n>=2; face-valid: Khanna<->Massie 5, Mace<->Khanna 4. Viz toggle 'appeared together' (violet = cross-party, teal = same; bundle key `coap`). `weekly_refresh` now rebuilds co_appearance + reference --rebuild (free) every week. The reference layer was re-scored over the CBS-grown corpus the same night (467 new windows, $2.80): 4,358 substantive edges (3,289+/618-), 1,641 dyads drawn. INTERVIEW mentions were ALWAYS scanned (`extract()` has no source filter).
7. **Press question OPEN:** the user asked "should we add this to the press?"; the recommendation given (interviews as a first-party stance SOURCE lane, not blended into third-party press coverage); awaiting his call before touching stance inputs (his domain). Related memory: `moneyball-receptivity-layer` (the homophily gate re-run could use signed reference edges as the better compat input).
