# Phase 2 plan: organize the brain

Status: REVISION 4 (after santa round 3: both reviewers passed every criterion except one shared blocking issue, batch 6's
gate order, fixed here; the owner approved applying the round-3 fixes and starting the batches). Every round-3 issue is
fixed or declined with a reason in the Revision 4 changelog at the end. Plan only: nothing in the vault was edited to write
it. Committed by batch 1 (Owner decision 6).
Branch `brain-reorg-2026-10-03`, HEAD `e2077ed` (batch 0). Revision 1 written 2026-10-03 21:00-22:00 -04:00; revision 2
22:15-22:37; revision 3 2026-10-03 23:10 to 2026-10-04 00:03; revision 4 edited in place 2026-10-04 03:20 to 03:46 -04:00.
Inputs: `phase2-baseline.md/.json` (scratchpad), `.bedrock/reorg/check.ts`, `.bedrock/graph/*`, `.bedrock/recall/*`,
vault `CLAUDE.md`, Bedrock 1.2.0 plugin (`CLAUDE.md`, `entities/`, `templates/`, `skills/preserve`, `skills/healthcheck`),
reviews `santa-r1-A.md` to `santa-r3-B.md`. The binding Owner decisions 1-16 are the last section of this file; every
section cites them by number.

Conventions used throughout:
- 1 KB = 1024 bytes (as `check.ts`). Sizes are file bytes on disk, as `check.ts` measures them. 12 notes have mixed
  CRLF/LF endings on disk (git stores LF: `.gitattributes eol=lf`); every tool writes LF, which can only shrink a note,
  and conserve.ts ignores CR.
- "Note", "mention", "link" mean exactly what `graph/extract.ts buildGraph` and `check.ts` mean: a mention is one wikilink
  occurrence (frontmatter minus `sources:`, plus body) that resolves to another note; a directed link A->B exists when A
  has at least one mention of B; the graph's "links" are unordered pairs. `index.md`, `log.md`, `CLAUDE.md`, `_template.md`
  and hidden folders are not notes. All link budgets below count distinct directed targets (`outgoingLinks` in check.ts).
- `V` = `C:/Users/pgoff/Documents/brain` (all commands run from `V` in Git Bash). `SP` = the executor's scratchpad.
  `PSP` = the planner's scratchpad, which holds the prototypes batch 1 starts from:
  `C:/Users/pgoff/AppData/Local/Temp/claude/C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-03-35774e/e964f2da-e5b5-430b-809e-f172ed0d7f45/scratchpad`
  (`plan/verify-plan.ts`, `hc.ts`, `alias.ts`, `fixture-test.ts`, `plan/split-fingerprints.txt`). It is session storage: if
  it is gone, batch 1 rebuilds the tools from Appendix A and the fingerprints from Appendix D.
- "Part" = a note created by a split (it carries `part_of`). "Family" = a split hub plus its parts.
- Owner decision 4 governs note text (body lines, which conserve.ts checks line by line). Frontmatter follows decisions 9
  and 13: the plan edits only aliases (the alias fix of 8 #11, and alias additions for recall), domain tags (9.2),
  `updated_at` and `updated_by`, `part_of`, the link fields the link model trims (C2), and `sources:` (hubs keep every
  pair). No frontmatter key is deleted (conserve.ts frontmatter rule), every removed value is recorded in its batch's commit
  body, and the titles and summaries (`title`/`name`, `description`, the tagline blockquote) of existing notes are never
  edited; new notes (parts, concepts) get their own. New lines that rewrite no existing line are decision 4(c) text: the
  hub `## Parts` list, part headers and S1 pointer lines, Map sections (including the existing `## Related *` sections
  demoted one level under `## Map`, section 5), and the reciprocal lines of the link model (C5, C6, R1-R3: new `## Related
  Concepts` lines in trimmed leaves, D, K and S10 lines in parts). conserve.ts passes them because no base line disappears.
- "Fleeting note" = any file in `fleeting/` except `_template.md`, present now or captured later. All of them are out of
  scope and stay untouched as intake, "awaiting organization" (Owner decision 1, section 7); check.ts exempts them from
  checks a, b, c and d and reports them separately in every gate (decisions 10 and 14). "Curated note" = every other note.
- Rounds: plan-review rounds (santa r1, r2, ...) do not count toward the 10-round cap. The cap covers the 6 batch rounds,
  fix rounds and the 2 final reviews.

---------------------------------------------------------------------------------------------------------------------

## 1. Summary and target end-state numbers

The vault is 77 curated notes plus a live `fleeting/` intake (6 notes at 21:50, 3 of them untracked) with 30 notes over
50 KB, a person hub that links 50 notes, 32 of 41 leaves over the 3-link budget (leaves link 3-10 targets), 2 double-tagged
notes and one alias collision. Fleeting notes are out of scope (Owner decisions 1, 10 and 14): every one, present now or
captured later, stays in `fleeting/` untouched and is reported separately in every gate. The plan runs 6 batches (1 tooling, 1 alias fix and domain tags,
1 link pass, 3 split passes) and keeps 4 rounds for the final reviews and fixes. Every batch is gated by `check.ts`, a
text-conservation check, the scripted healthcheck, graph verify and the recall selftest on the committed export, and ends
in one local commit (never pushed, Owner decision 7) made by a helper that stages explicit paths only, in a throwaway index,
and never touches hook output.

| Metric | Baseline 20:24 | Plan time 21:50 | Target at the end of batch 6 (committed tree) |
|---|---|---|---|
| Notes | 80 (77 curated + 3 fleeting) | 83 (77 + 6 fleeting) | **204 curated** (actors 47 = 25 + 22 parts; concepts 14 = 6 + 8; discussions 6; people 1; projects 4; topics 132 = 35 + 97 parts; teams 0). Fleeting notes are untouched: the committed tree keeps the 3 fleeting notes tracked in HEAD (Phase 2 never stages a fleeting path); the working tree has whatever the hook wrote. Pinned in `snapshot.ts` at batch 6 |
| Notes over 50 KB / with `size_reason` | 30 / 0 | 30 / 0 | **0 / 0** among curated notes (largest part ~44 KB, the B9 methodology lane; largest hub ~48 KB, A8, which keeps its wiring history under decision 15; melange-systems ~35 KB); fleeting notes exempt from the size check (Owner decision 1) |
| Links / directed / mentions | 276 / 545 / 1522 | 282 / 551 / 1534 (21:10) | estimate 600-720 / 1,200-1,450 / 1,700-2,400 (not a target: exact values pinned in `snapshot.ts` at batch 6) |
| Unresolved / one-way / zero-incoming (fleeting notes exempt from all three, Owner decisions 1 and 10) | 0 / 0 / 0 | 0 / 0 / 0 (the 16 one-way links and 6 zero-incoming notes are all fleeting) | **0 / 0 / 0** among curated notes; fleeting notes listed separately by check.ts in every gate (decision 14) |
| Leaves over budget (more than 3 links besides home project and family links) | 32 of 41 leaves | same | **0 of 160 leaves** (check `i`) |
| `people/paul-goff` outgoing links | 50 | 50 | **14** |
| Sources invariant (213 baseline pairs) | 0 missing | 0 missing (212 exact + 1 by a newer sha) | **0 missing** among the 210 pairs a curated note holds; the 3 pairs held only by fleeting notes F1-F3 are reported, not enforced (decision 14). Hubs keep every pair of a split note; fleeting notes keep their own pairs (no batch touches them) |
| Domain tags (curated) | 75 one, 2 two, 0 none | same | **204 with exactly one allowed tag** (check `g`); fleeting notes stay untagged |
| Slug/title/alias collisions (non-fleeting) | 2 | 2 | **0** (check `k`) |
| Project maps | 0 | 0 | **4** (`## Map` in every project) |
| Concepts | 6 | 6 | **14** |
| index.md / graph verify / recall selftest | current / PASS / PASS | current / PASS / PASS | current / PASS / PASS (selftest decided on the committed export); snapshot pinned to the batch-6 tree |

Correction to the baseline: item g says "79 notes carry exactly one domain tag". 79 is the number of tag uses: 75 notes
carry one tag, `actors/brain-graph` and `actors/brain-vault-political-systems` carry two, and the fleeting notes none.

---------------------------------------------------------------------------------------------------------------------

## 2. Size limit choice

Counts over each threshold (77 curated notes; fleeting notes are all under 12 KB):

| Threshold | Notes over | By folder |
|---|---|---|
| 30 KB (30,720 B) | 40 | topics 30, actors 8, concepts 1, projects 1 |
| 40 KB (40,960 B) | **33** | topics 24, actors 7, projects 1, concepts 1 |
| 50 KB (51,200 B) | **30** | topics 22, actors 7, projects 1 |
| 60 KB (61,440 B) | 23 | topics 18, actors 5 |

Decision rule: 40 KB unless more than 24 notes exceed 40 KB. 33 exceed it, so **the limit is 50 KB**. Consequences:
- 30 notes are split (section 3). 3 notes sit between 40 and 50 KB and stay whole, with contingent split outlines in 3.3:
  `topics/2026-07-working-agreement-agent-orchestration-rules` 50,125 B (98% of the limit; ~50,053 B after batch-3
  conversions), `concepts/single-look-holdout-discipline` 47,161 B (~47.6 KB after batch 3), and
  `topics/2026-07-working-agreement-verification-and-evidence-standards` 45,998 B.
- `check.ts` default `--size-limit` becomes 50 (batch 1), so "`check.ts --strict` passes" means the 50 KB rule. The size
  check applies to every curated note; fleeting notes are exempt and listed with their sizes (Owner decision 1).
- **No `size_reason` is granted.** No over-limit note is an irreducible reference: every one has natural `##`/`###`
  sub-topics, and the largest indivisible units (psychometrics "Record 1", 38.7 KB with no subheadings; the B9 primacy
  methodology lane, 42.7 KB kept whole on purpose, see B9) fit in one part.

---------------------------------------------------------------------------------------------------------------------

## 3. Splits

### 3.1 Split rules

- S1 Cuts fall only on `##` or `###` heading boundaries. A part is one sub-topic; parts never paraphrase: every moved line
  is byte-identical except wikilinks converted by the link rules (4.4) and positional references rewritten under S10
  (Owner decision 4). Heading levels are not changed. When a part takes some `###` children of a `##` section, the `##`
  heading line (and its own text) goes to the first such part and the later parts start with a verbatim copy of that `##`
  heading line; when the note's "Hub keeps" names the `##`, its own text stays in the hub and every part that takes one of
  its children starts with the heading copy.
  **Governing text (Owner decisions 8 and 11).** A governing text is a line or section that corrects, supersedes or
  overrides a statement made elsewhere in the same note: a correction, a "newest wins" note, a superseding decision, a
  contradiction note, a READ BEFORE warning, a RESOLVED note, a "do not use" or "replaced by" note. Its governed statements
  are the statements it overrides that are not marked where they stand (struck through, or labelled superseded / corrected
  / history / prior / reverted on their own line): the statements it names (quotes, cites by line, date or section, or
  covers with "all sections above"), and, for a "newest wins" or "current state" note, the dated log it governs. A struck
  claim carrying its superseding clause on the same line (the Decisions lists) and a correction that quotes the claim it
  corrects are self-contained. Rules (decision 11):
  1. Same note (11a), the default: a governing text and every statement it governs sit in the same note. The tables regroup
     parts for this (a part may pass the 45 KB target, never 50 KB), or keep both in the hub (C1 keeps the LobbyView
     contradiction note and the FEC section it corrects; A8 keeps its wiring history with "Current state (newest wins)",
     decision 15).
  2. Pointer line (11b), only where rule 1 would need a note over 50 KB, or where an owner ruling keeps the correction in
     the hub (B6, B10). Each governed part then carries an explicit pointer line in its header (S5) that names what is
     corrected and links the note holding the correction; there is no generic pointer. Cases at plan time:
     - B2: Record 1 line 162 is governed by Record 4 (hub) and hub Decisions line 113 (Records 1 + 4 = 50.4 KB; hub +
       Record 1 = 68 KB); every record part is governed by the hub's "Where the program stands (newest wins)" (hub + all
       records = 138 KB).
     - B5: the hub's `## Superseded guidance: Excel COM as the write path` (line 473, "all sections above") governs the COM
       steps at line 188 (`-lineage-and-phases`) and lines 418 and 422 (`-scenario-tools-and-calibration`; line 364 is
       marked in place); hub + both parts = ~74.5 KB.
     - B6 (owner ruling): History's `### Decisions and superseded rules` governs lines 209, 222, 224 and 232 of
       `-lineage-and-june-audit` (four-bucket min-max weights, the 1/rank weighting with its $10k cap, the June COM recalc,
       the 0.35/0.65 influence blend, Electoral Integrity 0.05).
     - B10 (owner ruling): the newest-wins note in the hub's own text of `## July 2026 audit-run history` governs both run
       parts.
     A4's and C2's hub correction lists are self-contained and their claims are corrected where they stand (rule 1 holds,
     both round-3 reviews checked); A9's and A10's newest-wins notes govern claims that are struck or labelled in place, or
     whose newest figure sits in the same part.
  The Revision 3 changelog records the scan of all 30 notes (every marker line, its destination and its result). Before
  every split batch the G-split gate repeats it: `verify-plan.ts --s1` lists every marker line and `--s1-cross` lists every
  struck hub claim whose distinctive tokens recur unmarked in a part (candidates, not verdicts); the executor signs each off
  against rules 1-2, and a case that needs neither rule-1 regrouping nor an allowed pointer stops the batch for a table
  amendment.
- S2 The original note stays at its path and slug and becomes the hub. It keeps: its whole frontmatter (all `sources:`),
  everything before its first `##` (H1, tagline blockquote and any preamble line, e.g. mentat-fec-pipeline's "Code root"
  line), its template "summary layer" (topics: Context, People Involved, Actors Involved, Related *, History, Decisions, Next
  Steps; actors: Details, Dependencies, Flows, Dev Commands, Known Issues, Related *, Discussions; projects: Overview intro,
  Status, Action Items, Blockers, Focal Points, Map (batch 3, section 5), Related *, Discussions) plus the cross-cutting
  sections named per note below.
  It gains `## Parts` immediately before its first `##` heading (after the blockquote and any preamble line, so A2's
  "Code root" line stays above it): one line per part, `- [[<part>]] — <part summary sentence>`, in table order.
- S3 Parts live in the parent's folder and have the parent's `type`, except parts of `projects/melange-systems`, which are
  `topics/` notes of type topic (Bedrock: projects are index notes and "detail should be in a topic").
- S4 Part slug: `<parent-slug>-<suffix>` (the suffixes below); project parts use topic naming (listed). Part frontmatter is
  the vault `_template.md` of its folder with every key present, plus `part_of: "[[<parent>]]"`. Title (`title` for topics,
  `name` for actors): `<table title> (<parent short name>)`, part title first so recall and index.md show it before
  clipping; parent short name = the parent's title up to its first " (" or ":" (project parts: the table title alone).
  `aliases: ["<parent title>: <table title>"]`. `sources: []` (the hub keeps every pair; check `j` enforces part pairs subset
  of parent pairs); `people: []`, `actors: []`; no template placeholder survives (actor parts copy the parent's `team: ""`,
  never the template's `"[[squad-name]]"`, so check `b` sees no placeholder link); status, category, created_at copied from
  the parent; tags = the parent's type/status/category tags plus one domain tag (the parent's unless 9.3 says otherwise).
  Project parts take topic tags instead: `type/topic`, `status/completed` (dated records of 2026-06), `category/feature` or
  `category/troubleshooting` per their slug, and `domain/data`. `updated_at` = batch date; `updated_by: "reorg@agent"`
  (decision 13). Actor parts set `description:`;
  topic parts put the summary as the first sentence of the blockquote (`firstSentence()` feeds index.md and recall).
- S5 Part body: `# <title>`, then `> <summary sentence>. Part of [[<parent>]] (project [[<home project>]]).`, then the moved
  sections. Project parts write `Part of [[melange-systems]].` (parent = project). A part governed under S1 rule 2 adds one
  pointer line per governing section right after the header line, naming what is corrected and linking the note that holds
  the correction, with the section named in plain text (the vault uses no `[[x#h]]` anchors), e.g.
  `> Correction kept in [[moneyball-workbook]] (History, "Decisions and superseded rules"): the four-bucket min-max weights,
  the 1/rank inverse weighting with its $10k cap, the June Excel COM recalc, the 0.35/0.65 influence blend and the Electoral
  Integrity weight 0.05 recorded here are superseded.`
  B2's record parts carry `> Newest wins: the program's current state is kept in
  [[2026-07-feature-personality-psychometrics]] (Context, "Where the program stands"); where a record differs, that summary
  governs.`, and Record 1's part adds the Record 4 / Decisions pointer for the Miller & Sutherland exclusion. These lines are
  new part-header text (decision 4(c)); no existing line changes. No other part gets a pointer unless the S1 sign-off finds
  another case that rule 2 allows.
- S6 Home project of a part = its parent's home project, except where the table says otherwise.
- S7 Sizes: part target under 45 KB, hard refusal at 50 KB (split.ts); hub target under 25 KB (exceptions: melange-systems
  ~35 KB because of its Map; A8 ~48 KB, B2 ~30 KB, C1 ~28 KB and B6 ~26 KB because they keep governing sections under S1
  and decision 15; A8 stays under 50 KB, and check `a` re-measures it at every gate). Sizes below are approximate
  (outline bytes + ~1.3 KB part overhead; hubs + ~150 B per Parts line); verify-plan.ts recomputes them from the current
  files at every split gate (G-split, 11.2) and warns on any part or hub at or over 45 KB.
- S8 The only text that may disappear in a split is an exact duplicate created by the split itself; each such line goes
  in the batch allowlist with its reason. None is expected.
- S9 Link selection for hubs and parts follows 4.3; the hub links listed below are the explicit choice for each split hub.
- S10 Positional references (Owner decision 4b).
  Detection: `split.ts --plan` flags every positional reference in moved or kept text whose referent may end up in a
  different note of the family: the words "above", "below", "earlier", "later", "previous", "preceding", "following",
  "next", "the table", "the list", "this section", "this table" and similar, and every "see ..." reference to a section or
  labelled item ("see Press facts corrected", "see Decisions", "see the 2026-09-17 contradiction rule"). The trigger set is
  wide on purpose (verify-plan `--positional` finds 524 positional trigger lines and 95 more "(see ...)" references in the
  30 notes; reviewer A counted 657 with a wider set), so the batch budget assumes dozens of rewrites per split batch.
  Resolver: split.ts marks a flag automatically only when the reference names its referent, that is, its words or a quoted
  bold label match exactly one `##`/`###` heading or `**label**` of the source note (case-insensitive, wikilinks normalised
  as C1), or it is "the table/list above/below" with that table or list in the same section. Every other flag (a bare
  "above", "earlier" or "later", or a phrase that matches several headings or none) is marked "ask", and the executor
  resolves it from the text. An ambiguous flag is never marked "same note", and the executor signs off every automatic mark
  too. Matcher fixtures for split.ts (batch 4):
  - C4 Decisions line 87 "(see Ledger corrections)" -> `### LEDGER CORRECTIONS` in `-n-audio-route-and-measurements`;
  - moneyball-workbook line 224 "the reverse-engineered (Membership+Leadership)/2 scoring above" -> "ask" (the referent is
    `## Committee Data scoring` in the sibling part, not the nearest heading);
  - moneyball-workbook line 100 "(see consult rule)" -> "ask" (it names a bullet, not a heading);
  - data-collection line 396 "(L3 later shipped 2026-08-07, see above)" -> "ask" (the referent is in
    `-lobbyview-org-mentions-and-efficiency`).
  Marks and rewrites: a flagged reference whose referent moved to another note is rewritten under decision 4(b) as an
  explicit link. The positional word(s) become "in [[note]]", or "in [[a]], [[b]] and [[c]]" when the referent spans several
  notes, and every other word stays (e.g. "see the Chart Studio section above" -> "see the Chart Studio section in
  [[mentat-console-chart-studio-and-system-debug]]"; "see the clique section below" -> "see the clique section in
  [[2026-09-feature-staffer-network-data-and-math-sna-math-and-clique-lane]]"; "(see Press facts corrected)" -> "(see
  Press facts corrected in [[2026-08-incident-refresh-automation-reliability-weekly-refresh-and-tick-runner]])"; a referent
  still in the same note in the same direction keeps its word: "below and in [[a]]"). A flag whose referent stays in the
  same note (an automatic mark that names it, or the executor's decision) is marked "same note", and a "see ..." phrase
  that names something outside the family (a memory file, another note, a URL) is marked "external"; neither is edited.
  Log: `.bedrock/reorg/ledger/batch-N-positional.md` (note, line, old, new, referent note, or "same note"/"external") and
  `batch-N-allow.txt` (`old => new`, so conserve.ts accepts it). Gate: zero unresolved flags ("ask" counts as unresolved);
  `split.ts --apply` refuses while any flag has neither a rewrite nor a "same note" or "external" mark, and G-post re-runs
  the detection on the written notes. Each sibling link created this way is a family link (4.1), and R3 adds the back-link.
- S11 A part in an earlier batch whose counterpart (K9, K10) is created in a later batch keeps at most 2 other links in its
  spec, so the later K link fits within 3.

### 3.2 Split table (30 notes, 119 parts)

Columns: part suffix (slug = parent slug + suffix, unless a full slug is given) | table title (S4 builds the full title) |
headings moved, in order (quoted by their unique leading words) | ~KB. `size_reason`: **no** for every hub and part.
Sha256 and byte fingerprints of the 30 notes at plan time are in Appendix D (the G-split gate compares against them).

#### Batch 4 (splits A): Mentat, agent tooling, infra - 10 notes, 39 parts

**A1 `topics/2026-07-bugfix-mentat-collection-and-attribution`** (145.8 KB -> hub ~18.5 KB + 7). Home `mentat`.
Hub keeps the summary layer. Hub links: `exclude-on-contradiction-not-ambiguity`, `mentat-fec-pipeline` (the xref council discussion moves to `-cross-verification`, D5).

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-standing-rules` | Standing rules (money code, roster, shared checkout, zero-row crash) | `## Standing rules (feedback memories)` | 9 |
| `-july-build-and-ship` | July 2026 pipeline build and ship | `## July 2026 pipeline build, ship and hardening` + own text + `### Integration to main` ... `### OPEN POLICY CALL FOR PAUL` | 23 |
| `-july-hardening` | July 2026 hardening and the load-bearing review findings | `### Master-corruption defects re-tested` ... `### Load-bearing review findings` | 17.5 |
| `-audit-r12-trade-association` | 2026-07-27 audit, R12 reconciliation and the trade-association $0 fix | `## Full-codebase audit, 2026-07-27`, `## R12 reconciliation`, `## Trade-association $0 gap` | 22 (pin 1) |
| `-september-collector-lanes` | September 2026 collector lanes and the two API-key stores | `## Worker scaling lane`, `## Collector "every lane failing`, `## Two API-key stores` | 16 |
| `-cross-verification` | Contradictions-not-ambiguity rule and the xref vs workbook review | `## Cross-verification: contradictions`, `## Cross-reference vs workbook review` | 14 (D5) |
| `-system-debug-lane` | System-debug lane (2026-09-13 to 09-15) | `## System-debug lane` | 35 (domain frontend) |

**A2 `actors/mentat-fec-pipeline`** (110.7 KB -> hub ~24 KB + 5). Home `mentat`. Hub keeps the summary layer plus `## Pipeline design and standing rules`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-key-stores` | Key stores (locations and fingerprints, no key material) | `## Key stores` | 6 (domain security) |
| `-history-build-and-ship` | History: build and ship (07-18 to 07-24) | `## History: build and shipping` + `### Timeline` ... `### Parallelism ceiling + worker-shard audit` | 21 |
| `-history-hardening` | History: hardening (07-22 to 07-23) | `### Master-corruption defects re-tested` ... `### Round-2 shipped + benchmark passed` | 16 |
| `-history-audit-r12` | History: 2026-07-27 audit, trade-association fix and R12 | `## History: 2026-07-27 audit` | 20 |
| `-history-september-lanes` | History: September 2026 lanes | `## History: September 2026 lanes` | 31.5 |

**A3 `actors/mentat-console`** (96.1 KB -> hub ~19 KB + 4). Home `mentat`. Hub keeps the summary layer plus `## Architecture and standing facts`, `## History`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-chart-studio-and-system-debug` | Chart Studio and the 2026-09-13 system-debug lane | `## Chart Studio (tab) and the 2026-09-13 system-debug lane` (one `###`, no deeper cut) | 35.5 |
| `-startup-and-polish-lanes` | Startup hang fix and the polish, load-time and graph-quirks lanes (09-18 to 09-25) | `## Startup hang fix`, `## Polish lane (2026-09-19), load-time lane` | 10 |
| `-redesign-boards` | Redesign boards (2026-09-21/22) | `## Redesign boards (2026-09-21/22` | 20.5 |
| `-pac-map-viz-lane` | PAC map and downstream viz lane (09-25 to 09-27) | `## PAC map and downstream viz lane` | 17 |

**A4 `topics/2026-09-feature-mentat-failings-pac-evidence`** (71.1 KB -> hub ~16.5 KB + 4). Home `mentat`. Hub keeps the summary layer plus `## Corrections and superseded statements`. Hub links: `mentat-console`, `mentat-fec-pipeline`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-street-columns-addressing-navigation` | S2 street columns, S4 cross-industry addressing, S5 navigation | `## S2:`, `## S4:`, `## S5:` | 14.5 |
| `-pac-evidence-ingestion` | S3 PAC evidence ingestion | `## S3:` | 13.5 (domain data) |
| `-pac-evidence-readers` | PAC evidence readers: S6 panes, S7 committee categories, S8 district map | `## S6:`, `## S7:`, `## S8:` | 14.5 |
| `-pac-map-viz-lane` | PAC map downstream audit and viz lane (09-25 to 09-27) | `## PAC map downstream audit and viz lane` | 17.5 |

**A5 `topics/2026-09-feature-mentat-console-ui`** (63.5 KB -> hub ~15 KB + 3). Home `mentat`. Hub keeps the summary layer plus `## Exact-spelling notes`. Hub links: `mentat-console`, `higgsfield-connector`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-chart-studio` | Chart Studio v1, review fixes and the fields lane (09-11/12) | `## Chart Studio v1`, `## Chart Studio review and P1 fixes`, `## Chart Studio fields lane` | 21 |
| `-cleanup-and-polish` | UI clean-up UI1 and the polish lane (09-17 to 09-19) | `## UI clean-up lane UI1`, `## Polish lane` | 15.5 |
| `-load-time-and-graph-quirks` | Load-time and FEC-link lane, graph quirks (09-24) | `## Load-time and FEC-link lane`, `## Graph UI quirks + colouring lane` | 16.5 |

**A6 `topics/2026-09-feature-ui-redesign-boards`** (63.9 KB -> hub ~16.5 KB + 3). Home `melange-systems` (part 1 home `mentat`). Hub links: `higgsfield-connector`, `melange-dashboard`, `mentat-console` (the `mentat` project link becomes plain text; the Mentat part carries Mentat's map row).

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-mentat-console-boards` | Mentat console boards (09-21/22) | `## Mentat console redesign boards` | 19.5 (home mentat) |
| `-melange-boards-and-build` | Melange boards and build lane (09-22/23) | `## Melange redesign boards`, `## Melange build lane` | 13 |
| `-finalize-reconcile-graph-quirks` | UI finalize, review reconcile and graph quirks (09-23 to 09-25) | `## UI finalize after reboot`, `## UI review reconcile`, `## Graph UI quirks and colouring lane` | 19.5 (K10, S11) |

**A7 `topics/2026-07-feature-agent-tooling-stack`** (78.6 KB -> hub ~16 KB + 7). Home `melange-systems`. Hub links: `codex-executor`, `metaloop`, `glass-box`. Each part keeps the actor its section is about (rule 4.3).

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-codex-executor-lane` | Codex executor lane record | `## Codex executor lane` | 35 |
| `-quant-model-evaluation-lane` | quant-model-evaluation skill lane (2026-09-30) | `## quant-model-evaluation skill lane` | 10.5 |
| `-skill-library-lane` | Moneyball skill library lane | `## Moneyball skill library` | 8 |
| `-runpod-sessions` | RunPod Claude sessions | `## RunPod Claude sessions` | 5.5 (domain infra) |
| `-higgsfield-account-trap` | Higgsfield connector account trap | `## Higgsfield connector account trap` | 4 |
| `-project-brain-toolkit` | Project Brain toolkit | `## Project Brain toolkit` | 6 |
| `-glass-box-lock-hang` | GLASS BOX lane-lock hang and Grok balance | `## GLASS BOX lane-lock hang` | 4 |

**A8 `actors/codex-executor`** (53.9 KB -> hub ~48 KB + 1). Home `melange-systems`. Hub keeps the summary layer plus `## Current state`, `## Role split and standing rules` (pin 8 answer stays in the hub) and `## Wiring history and superseded statements` (decision 15: the wiring history stays with the "Current state (newest wins)" text that governs it, S1 rule 1). The hub must stay under 50 KB: ~47.6 KB at plan time with its Parts line, so link-model lines added in batches 3-6 have ~2.4 KB of room; check `a` re-measures it at every gate, and a batch that would take it to 50 KB stops and escalates to the owner.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-incidents` | Overnight poll-loop burn and the legislative shadow-lane failure | `## Incident: Codex overnight poll-loop burn`, `## Legislative-effectiveness shadow lane: how Codex built it and died` | 8 |

**A9 `topics/2026-08-incident-refresh-automation-reliability`** (59.2 KB -> hub ~14.5 KB + 3). Home `melange-systems`. Hub keeps the summary layer plus `## Reference data`. Hub links: `melange-refresh-scheduler`, `fail-closed-gates`, `glass-box`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-weekly-refresh-and-tick-runner` | Weekly refresh: measured state, orchestrator, tick runner and the inactive email | `## Measured state 2026-09-19`, `## Sandbox test run`, `## Orchestrator build state`, `## RULED 2026-09-19`, `## Press facts corrected`, `## Tick runner built + reviewed`, `## Weekly refresh email: not active` | 31 |
| `-daily-refresh-closeout-and-flakes` | Daily congress refresh close-out and the suite flake lane | `## Daily congress refresh: close-out`, `## Daily-refresh suite flake lane` | 10.5 |
| `-codex-poll-loop-burn` | Codex overnight poll-loop burn (2026-09-12/13) | `## Codex overnight poll-loop burn` | 7.5 (domain platform) |

**A10 `topics/2026-08-incident-workstation-disk-and-backup`** (55.7 KB -> hub ~21 KB + 2). Home `melange-systems`. Hub keeps the summary layer plus `## Mirror state`, `## Left for Paul`, `## Never touch list`. Hub links: `melange-repo-mirror`, `lg-gram-workstation`, `census-before-claims` (pin 9 stays on the hub).

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-backup-gap-and-census` | Backup coverage gap and the 2026-09-11 census | `## Backup coverage gap`, `## Census 2026-09-11` | 9 |
| `-clearances-and-retirements` | Disk clearances and worktree retirements (09-11 to 09-18) | `## Clearance 2026-09-11`, `## Retirement 2026-09-13`, `## Retirement 2026-09-15`, `## Clearance 2026-09-16`, `## Brain updates (disk lane)`, `## Second clearance`, `## Third clearance` | 29.5 |

#### Batch 5 (splits B): Melange model and scoring - 10 notes, 44 parts

**B1 `topics/2026-06-feature-congress-r-scrapers`** (165.7 KB -> hub ~23.5 KB + 8). Home `melange-systems`. Hub keeps the summary layer plus `## R / RStudio working environment`, `## Reference data`. Hub links: `draft-systems-r-pipeline`, `debate-stance-model`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-member-scraper` | congress.gov member scraper | `## congress.gov member scraper` | 15 |
| `-legislative-score-17x3` | Integrated 17-topic x 3-role legislative scraper | `## Integrated 17-topic x 3-role scraper` | 17 |
| `-cu-press-scraper` | CU press-release scraper and its coverage chain | `## CU press-release scraper`, `## Press scraper: fallback chain, third-party sources and coverage work` + own text + `### 5-step fallback chain` ... `### GRIND COMPLETE` | 30 (pin 2) |
| `-press-collector-pipeline` | Press text collector and one-command pipeline | `### Text-collection anti-stall hardening` ... `### Validity verdict + signal-prioritized collection` | 19 |
| `-press-discovery-and-attribution-fixes` | Press discovery, recency and attribution fixes | `### DISCOVERY-truncation fixes` ... `### Stage-5 scoring parallelized` | 20 |
| `-graded-scoring-and-audits` | Graded press scoring, hidden coalitions and audits | `## Graded scoring, coalitions and audits` | 21 |
| `-stage5-debate-lsd` | Stage 5 overhaul: DEBATE stance + LSD tone | `## Stage 5 overhaul` | 17 |
| `-census-and-ballotpedia` | Census CD and Ballotpedia CU-influence scrapers | `## Census CD scraper`, `## Ballotpedia 119th CU-influence scraper` | 14 |

**B2 `topics/2026-07-feature-personality-psychometrics`** (138.0 KB -> hub ~30 KB + 4). Home `melange-systems`. Hub keeps the summary layer plus `## Reading guide to the records below` (pin 3 expected to stay on the hub: Context holds the method) and `## Record 4:` (its withdrawal of the Miller & Sutherland exclusion governs Record 1's file line 162; Records 1 + 4 would be 50.4 KB and hub + Record 1 about 68 KB, so S1 rule 2 applies and Record 1's part carries the pointer line, S5). Every record part also carries the newest-wins pointer line to the hub's "Where the program stands (newest wins)" (S1 rule 2: hub + all records = 138 KB). Hub links: `melange-audio-pipeline`, `single-look-holdout-discipline`, `gold-set-validation`. Records keep their own headings. Records 2, 3 and 5 share one part (S1 rule 1): Record 3's "Honest correction" (file line 275) corrects Record 2's round-3 "Stress battery ALL GREEN" (line 230), and Record 5 (lines 315, 317) supersedes Record 2's "reactivity_z = N-slot" and Record 3's "genuine NEW N-slot" (line 269).

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-record-1-big5-campaign` | Record 1: Big 5 accuracy campaign (07-04 to 07-08) | `## Record 1:` (no subheadings: cannot be cut further) | 40 |
| `-audit-dependability-and-n-reanchor` | Records 2, 3 and 5: psych framework audit, disposition dependability and the N-slot re-anchor (07-09 to 08-14) | `## Record 2:`, `## Record 3:`, `## Record 5:` | 41.5 (S1) |
| `-external-criteria-and-open-a-search` | Record 6: external criteria for N (RKH, the Danish correction) and the open A search (07-12) | `## Record 6:` | 14.5 |
| `-senate-gold-desert-fill-and-a-anchoring` | Records 7-10: Senate gold template, desert fill, gold-anchored A and E, cooperation probe (07-16 to 07-18) | `## Record 7:`, `## Record 8:`, `## Record 9:`, `## Record 10:` | 18 |

**B3 `topics/2026-06-feature-cu-stance-and-sentiment`** (95.2 KB -> hub ~20.5 KB + 4). Home `melange-systems`. Hub links: `two-hop-stance-decomposition`, `debate-stance-model`, `gold-set-validation`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-stance-stack-design-and-accuracy` | Stance-stack design and accuracy | `## Sign-flip directionality`, `## Data audit 2026-07-01 and the stance-stack design`, `## Two-hop stance stacks`, `## lt_priming stance-integrity gates`, `## Kim position-classification benchmark` | 34.5 |
| `-june-stage5-template-and-cfpb-split` | Stage 5 deploy, labeling template and the CFPB directional split (June) | `## Template location and re-run recipe`, `## CFPB directional split in the workbook`, `## Stage 5 overhaul and deploy` | 7 |
| `-july-recorrection-channels-incidents` | CFPB re-correction, coverage, channels and press-fix incidents (07-15/16) | `## CFPB sentiment re-correction`, `## Coverage: what is scored`, `## Channels built 2026-07-15`, `## Press-fix incidents` | 20.5 |
| `-press-and-social-display` | Press and social display, ops lessons and shipped state (07-19) | `## Press and social display` | 19 |

**B4 `topics/2026-07-feature-legislative-pillar-acu-review`** (105.4 KB -> hub ~18 KB + 5). Home `melange-systems`. Hub keeps the summary layer plus `## Open questions`. Hub links: `2026-07-27-acu-outline-north-star-rulings` (D1), `codex-executor`, `sentinel-collectors`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-letters-and-legfix-1-4` | Letters integration and legfix 1-4 (07-17 to 07-25) | `## Pillar integration of the 7 letters`, `## Legislative data-plane audit`, `## Fix bundle SHIPPED`, `## LEGFIX2 expansion`, `## Tier-1 wiring DEPLOYED LIVE`, `## legfix4 residue close-out` | 22.5 |
| `-legfix5-full-text-and-culling` | legfix5: six-year full text, GovInfo lane and culling engine (07-27) | `## legfix5 full-text collection`, `## legfix5 GovInfo official-text lane`, `## Acu-outline rulings carried into this lane` | 24.5 |
| `-effectiveness-shadow-lane` | Legislative-effectiveness (Volden-Wiseman) shadow lane (09-10 to 09-12) | `## Legislative-effectiveness` | 14.5 |
| `-cosponsor-forecaster` | Bill-lobbying regression lane: the cosponsor forecaster (09-04) | `## Bill-lobbying regression lane` | 11 |
| `-bill-plane-and-media-stance` | Corpus census, bill-plane audit and press media-stance display | `## Corpus coverage census (2026-07-10)`, `## Bill-plane audit and press media-stance display` | 23 |

**B5 `topics/2026-06-feature-moneyball-excel-model-build`** (96.5 KB -> hub ~24 KB + 4). Home `melange-systems`. Hub keeps the summary layer plus `## Consult rule`, `## Weights ledger`, `## Superseded guidance`, `## Source sessions`, `## Verbatim formula spellings` (its source descriptions stay with the source sections, as in B6 and B8). Hub links: `moneyball-workbook`, `four-pillar-percentile-blend`, `draft-systems-r-pipeline`. S1 rule 2: the hub's Superseded guidance (file line 473, "all sections above") governs the June COM steps in `-lineage-and-phases` (line 188) and `-scenario-tools-and-calibration` (lines 418, 422; line 364 is marked in place); hub + both parts would be ~74.5 KB, so both parts carry the pointer line (S5), and "all sections above" is an S10 rewrite.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-lineage-and-phases` | Workbook lineage and phases A-C (06-18 to 06-22) | `## Workbook lineage and file inventory`, `## Phase A`, `## Phase B`, `## Phase C` | 17 |
| `-scoring-refinements-and-audits` | Press alignment, CFPB split, committee scoring and the June 25 audits | `## Press raw alignment`, `## CFPB directional split`, `## Relevance-tiered committee influence scoring`, `## Presentation audit and the percentile-rank 4-pillar blend`, `## Blended workbook audit` | 14.5 |
| `-category-stance-3d` | Category Stance 3D sheet (06-26) | `## Category Stance 3D sheet` | 13 |
| `-scenario-tools-and-calibration` | Scenario-tool pre-flight, engine build and empirical calibration (06-26/27) | `## Scenario-tool pre-flight and engine build`, `## Empirical calibration` | 33.5 |

**B6 `actors/moneyball-workbook`** (56.7 KB -> hub ~26 KB + 2). Home `melange-systems`. Hub keeps the summary layer plus `## Pillar weights and score formula` (pin 12 answer stays in the hub), `## History` and `## Source memory descriptions` (as B5 and B8 keep their source sections). Owner ruling (decision 11): History, with its `### Decisions and superseded rules`, stays in the hub. It governs the hub's pillar table and Dev Commands (same note) and the lineage part's four-bucket min-max weights, "1/rank inverse weighting, $10k cap", June COM recalc, 0.35/0.65 influence blend and Electoral Integrity 0.05 (file lines 209, 222, 224, 232), so `-lineage-and-june-audit` carries the S1 rule-2 pointer line (S5); the "(table above)" line no longer crosses notes, and History's "(below)" pointer to the Sub Layer surgery becomes an S10 rewrite.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-rules-scoring-and-sublayer-surgery` | Standing rules, committee-data scoring and the Sub Layer surgery | `## Committee Data scoring`, `## Standing rules`, `## Sub Layer surgery` | 14.5 |
| `-lineage-and-june-audit` | Model lineage, files and the June 25 audit | `## Model lineage and files`, `## Audit and delivery of the Blended workbook` | 19.5 |

**B7 `actors/draft-systems-r-pipeline`** (63.3 KB -> hub ~21 KB + 3). Home `melange-systems`. Hub keeps the summary layer plus `## Standing rules`, `## History (dated)`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-layout-and-knobs` | Where things live, script inventory and environment knobs | `## Where things live`, `## Script inventory`, `## Environment variables and knobs` | 8 |
| `-architecture` | Architecture of the six scrapers and stages | `## Architecture 1:`, `## Architecture 2:`, `## Architecture 3:`, `## Architecture 4:`, `## Architecture 5:`, `## Architecture 6:` | 25 |
| `-code-catalogue` | Code-level catalogue: markup, incidents and verified measurements | `## Code-level catalogue` | 14 |

**B8 `topics/2026-07-feature-influence-engine-internals`** (86.3 KB -> hub ~17 KB + 5). Home `melange-systems`. Hub keeps the summary layer plus `## Weights ledger`, `## Source sessions`. Hub links: `2026-07-30-coalition-builder-redesign-session` (D2), `say-do-gate`, `single-look-holdout-discipline`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-salience-sna-wave` | Six-paper salience and press-SNA wave (07-01) | `## 2026-07-01: six-paper salience / SNA wave` | 14.5 |
| `-receptivity-layer` | Receptivity layer (07-02 to 07-08) | `## Receptivity layer` | 24.5 |
| `-gate2-and-say-do` | GATE-2, C retest, improvement rounds, say-do gate and pillar weights | `## 2026-07-07/08: GATE-2` | 13 |
| `-chatgpt-lane-and-sublayer-surgery` | ChatGPT lane landing and the Sub Layer surgery (07-16/17) | `## 2026-07-16: ChatGPT`, `## 2026-07-16/17: Sub Layer off-by-one surgery` | 8 |
| `-coalition-builder` | Coalition-builder redesign and implementation (07-30 to 08-01) | `## 2026-07-30 to 2026-08-01: coalition-builder` | 16.5 |

**B9 `topics/2026-07-feature-primacy-and-industry-tier-boards`** (125.9 KB -> hub ~20 KB + 4). Home `melange-systems`. Hub keeps the summary layer plus `## Reference data: 2026-07-16 ChatGPT lane landing`. Hub links: `melange-dashboard`, `four-pillar-percentile-blend`. The methodology lane stays one part (S1): its "newest wins" contradictions, the live-board reversal and its why/how-to-apply govern the method and the redesign rejection.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-primacy-factor-drift-crown` | Factor-only primacy board, tier drift trace and champion crown law | `## Primacy board scores on the factor alone`, `## Primacy tier drift trace`, `## Champion crown law` | 27.5 |
| `-industry-boards-build` | Industry-tab interactions and the per-industry boards build (08-03 to 08-10) | `## Industry-tab interactions`, `## Per-industry tier boards` + own text + `### Deploy @d07eaea` ... `### Paul ratified the boards and ordered uniformity` | 19.5 (K9, S11) |
| `-industry-boards-tensor` | Per-industry boards: tensor cells, case studies and the responsiveness surface (08-10/11) | `### Tensor phase-3 recon` ... `### Responsiveness surface shipped` | 21.5 |
| `-methodology-lane` | Primacy-board methodology lane (2026-09-19/20) | `## Primacy-board methodology lane` | 44 |

**B10 `topics/2026-07-troubleshooting-melange-audits-and-reviews`** (108.2 KB -> hub ~20 KB + 5). Home `melange-systems`. Hub keeps the summary layer plus `## Pillar weights, three sets`, `## Open questions and unresolved items` and the own text of `## July 2026 audit-run history` (owner ruling, decision 11: its "newest-wins applied only where one run explicitly supersedes another" governs runs 1-5 in two parts, and both run parts carry the S1 rule-2 pointer line, S5; both start with the heading copy). Hub links: `melange-fec-pipeline`, `settled-findings-stay-settled`, `four-pillar-percentile-blend`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-guardrails` | Guardrails for any autonomous audit or review run | `## Guardrails for any autonomous audit/review run` | 10 (domain agent-ops) |
| `-july-runs-1-3` | July 2026 audit runs 1-3 and the deep audit (07-01 to 07-03) | `### Run 2026-07-01` ... `### Run-3 audit 2026-07-03` | 25.5 |
| `-july-runs-4-5-and-integrity` | July 2026 runs 4-5, data-integrity, network/vote and run-through audits (07-04 to 07-10) | `### Run-4 audit` ... `### Extensive audit + true run-through` | 30.5 |
| `-data-integrity-and-provenance` | Data-integrity audit (07-01) and the data-rules provenance census (07-10) | `## Data-integrity audit 2026-07-01`, `## Data-rules provenance census` | 10 |
| `-later-reviews` | Hallucination framework, five-lane code review and laundry-list close-out | `## Findings-examination (hallucination) framework lane`, `## Five-lane code review`, `## Laundry-list close-out` | 18.5 |

#### Batch 6 (splits C): Melange data, networks, surfaces, infra, project - 10 notes, 36 parts

**C1 `topics/2026-07-feature-data-collection-lanes`** (133.9 KB -> hub ~28 KB + 6). Home `melange-systems`. Hub keeps the summary layer plus the own text of `## LobbyView / LDA integration lane` (its "Contradiction note (kept, newest wins)" and the lane's Basics) and `## FEC-as-precognition lane` (S1: the note corrects the hub's History row, file line 84, and that section's "rode along in the same merge" line, file line 185; S1 rule 1: the note and both facts share the hub; the three LobbyView parts start with the heading copy). Hub links: `lobbyview-collector`, `sentinel-collectors`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-collection-scope` | Corpus census, demographic expansion A-H and the five-paper research integration | `## Corpus coverage census (2026-07-10)`, `## Demographic expansion A-H`, `## Research-integration lane, five papers` | 12.5 |
| `-lobbyview-org-mentions-and-efficiency` | LobbyView lane: org-mention measurement, industry-family UI, efficiency layers (08-07/08) | `### ORG-MENTIONS AUDIT` ... `### CU-set ruling and the round-4 overnight run` | 12 |
| `-lobbyview-lda-rebuild-and-bridge` | LobbyView lane: LDA rebuild, datasets and the FEC x LDA bridge looks (07-31 to 08-01) | `### POSITIONS DATASET ACQUIRED` ... `### FEC-bridge design (proposed` | 16.5 |
| `-lobbyview-looks-and-scale-upgrade` | LobbyView lane: five-lane pass, contest and territorial looks, scale upgrade (08-05/06) | `### FIVE-LANE PASS` ... `### SCALE UPGRADE C4+A1+B1+C1 SHIPPED` | 27.5 |
| `-contact-inference` | Contact-inference extraction lane (08-28/29) | `## Contact-inference extraction lane` | 25 |
| `-sentinel-lanes` | Sentinel lanes: press/hearing repair, bill ingestion, system manifest (09) | `## Sentinel collectors lane`, `## Sentinel workbook bill ingestion lane`, `## System manifest sentinel lane` | 21.5 |

**C2 `topics/2026-09-feature-staffer-network-data-and-math`** (92.9 KB -> hub ~18 KB + 4). Home `melange-systems`. Hub keeps the summary layer plus `## Contradictions and corrections`. Hub links: `2026-09-06-staffer-sorting-rulings` (D4), `concurrent-service-overlap-edge-rule`; D3 (`2026-09-03-staffer-network-architecture`) is retargeted at this split to `-tenure-adjudication-and-architecture`, the part that carries the architecture and overlap rulings (C4, 4.7). (Worked example 4.8c.)

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-tenure-adjudication-and-architecture` | Employment-tenure adjudication and the architecture/overlap rulings (09-01 to 09-03) | `## Employment-tenure data adjudication`, `## Architecture and overlap rulings` | 26 |
| `-sorting-lane` | Sorting lane: rulings, facts and state log (09-06 to 09-08) | `## Sorting lane` | 29.5 |
| `-sna-math-and-clique-lane` | SNA math audit and the co-tenure clique lane (09-05 to 09-07) | `## SNA math audit`, `## Co-tenure clique lane` | 16 |
| `-stale-imports-and-v7-spine` | Stale imports and the v6-to-v7 spine repoint (09-06/07) | `## Stale-imports lane`, `## v6-to-v7 spine repoint closeout` | 9.5 |

**C3 `topics/2026-06-feature-cosponsor-and-sector-networks`** (70.8 KB -> hub ~18 KB + 4). Home `melange-systems`. Hub keeps the summary layer plus `## Pillar weights as they appear`. Hub links: `melange-dashboard`, `lobbyview-collector` (pin 17 expected to stay on the hub).

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-june-network-plan` | June co-sponsor network plan: phases 1-3, vote edges, committee-only vector (06-25/26) | `## Phase 1`, `## Phase 2 -`, `## Phase 2.5a`, `## Vote edges`, `## Legislative refresh TRIED and REVERSED`, `## Influence vector made COMMITTEE-ONLY`, `## Congestion layer`, `## Phase 3` | 19 |
| `-layer-toggles-and-configs` | Layer toggles and the three network configurations (07-04 to 08-18) | `## Layer toggles`, `## Three network configurations` | 12.5 |
| `-sector-networks` | Sector networks bank_reg and crypto, and the circular lobbied-member link (08-18/19) | `## Sector networks`, `## "Lobbied member" link is circular` | 20 |
| `-member-relationships` | Member personal relationships model (09-10 to 09-12) | `## Member personal relationships model` | 7 |

**C4 `topics/2026-07-feature-audio-and-speech-lane`** (71.5 KB -> hub ~18.5 KB + 3). Home `melange-systems`. Hub keeps the summary layer plus `## State at a glance`, `## PAUL'S RULINGS 2026-08-21`. Hub links: `melange-audio-pipeline`, `single-look-holdout-discipline`, `fail-closed-gates`. S1 rule 1: the N audio route's "WHISPER DECODE DEFECT + CORRECTED VENUE NUMBERS ... READ BEFORE QUOTING ANY FILLER RATE" and "NPR AUDIO IS EDITED CLEAN" sections correct the filler rates and venue figures of the measurements and ASR sections, so the three sections share one part.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-july-foundations` | Speaker verification, ES cross-modal validation, narratives and the Senate gold design (07-09 to 07-16) | `## Audio speaker verification`, `## 3-paragraph "Suggested approach" narratives`, `## Senate gold and the audio identity design` | 16.5 |
| `-n-audio-route-and-measurements` | The N audio route (G1, G2, the look), its venue, reliability and identity measurements, and the Whisper, C-SPAN and Gemini facts (08-20 to 08-25) | `## The N audio route`, `## Venue, reliability and identity measurements`, `## Whisper, C-SPAN and Gemini facts` | 33.5 (S1) |
| `-complementary-layers-and-lessons` | Complementary layers lane and verification lessons (09-07) | `## Complementary layers lane`, `## Verification lessons` | 7.5 |

**C5 `actors/melange-dashboard`** (76.6 KB -> hub ~20.5 KB + 4). Home `melange-systems`. Hub keeps the summary layer plus `## Standing design laws and Paul's rulings` (load-bearing for every surface part, as A2, A8 and B7 keep their standing rules in the hub).

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-artifact-family-and-surfaces` | Artifact family and surfaces | `## Artifact family and surfaces` | 11 |
| `-preview-and-desk-rules` | Preview and verification workflow, desk media and desk template rules | `## Preview and verification workflow`, `## Desk media footprint`, `## Desk template rules learned`, `## Dashboard-fixes verification and publication state` | 13 |
| `-june-capstone` | June 2026 capstone dashboard: spec and engine (06-26/27) | `## June 2026 capstone dashboard` | 21 |
| `-v2-redesign-overlay` | v2 redesign overlay and finalize (09-22 to 09-25) | `## v2 redesign overlay and finalize` | 16.5 (K10) |

**C6 `topics/2026-06-feature-melange-dashboard-ui-evolution`** (75.5 KB -> hub ~14.5 KB + 4). Home `melange-systems`. Hub links: `melange-dashboard`, `influence-vs-alignment-axes`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-capstone-to-desk-media` | Capstone, member desk, network features and desk media (06-26 to 07-16) | `## June 2026 capstone and member desk`, `## Network features shipped`, `## Frank Lucas electoral 'defend' resolution`, `## Desk media footprint` | 9 |
| `-august-redesigns` | Industry tab round 2, black/gold retheme, simplification and preview workflow (08) | `## Industry-tab UI round 2`, `## Black/gold retheme`, `## UI simplification`, `## Dashboard preview workflow` | 22 (K9) |
| `-plain-language-and-fixes` | Plain-language pass, staffer surface pointer and fixes verification (08-31 to 09-05) | `## Plain-language pass`, `## Staffer surface lane and canonicalization`, `## Dashboard-fixes verification lane` | 14.5 |
| `-members-section-lane` | Members Section consistency lane (09-14 to 09-18) | `## Members Section consistency lane` | 21.5 |

**C7 `actors/melange-fec-pipeline`** (72.7 KB -> hub ~20.5 KB + 3). Home `melange-systems`. Hub keeps the summary layer plus `## History`, `## Decisions`, `## Next Steps`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-architecture` | Architecture | `## Architecture` | 15 |
| `-reorganization` | Reorganization: REORG COMPLETE @a05a8e4 (2026-08-05) | `## Reorganization` | 16.5 |
| `-live-tree-drift-and-eol` | Live tree vs committed drift and the line-ending census (09-13 to 09-19) | `## Live tree vs committed tree`, `## Line-ending census` | 25 (domain platform) |

**C8 `topics/2026-07-troubleshooting-melange-live-tree-git-drift`** (51.5 KB -> hub ~12 KB + 2). Home `melange-systems`. Hub links: `melange-repo-mirror`, `melange-fec-pipeline`, `live-tree-patch-discipline`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-branch-state-and-mirror` | Live tree branch state and the off-box mirror | `## Off-box git mirror`, `## Live tree branch state` | 19 |
| `-drift-reconcile-eol` | Committed vs live drift, the 09-19 reconcile and the line-ending census | `## Reconcile 2026-09-19`, `## Committed vs live drift`, `## Line-ending census and the shared patch cutter` | 24 |

**C9 `topics/2026-07-rfc-melange-architecture-system-of-record`** (51.5 KB -> hub ~14.5 KB + 3). Home `melange-systems`. Hub links: `zero-rank-delta-verification`, `melange-fec-pipeline`, `moneyball-workbook`.

| Suffix | Title | Headings moved | KB |
|---|---|---|---|
| `-refactor-and-inversion` | July refactor and the system-of-record inversion | `## Refactor of 2026-07-02`, `## Phase 2: system of record inverted`, `## Audit S2 remedies`, `## Roadmap No. 9 Phase 1`, `## Staff directory + desk CRM`, `## Audit runbook + weekly automation` | 10.5 |
| `-model-config-and-committee-formula` | Final model configuration and the committee-pillar formula | `## Final model configuration`, `## Committee-pillar scoring formula` | 12 |
| `-reorg-and-manifest` | REORG phases, tripwires and lessons; the system manifest lane (08-04 to 09-06) | `## REORG: phases, tripwires and lessons`, `## System manifest + sentinel lane` | 19 |

**C10 `projects/melange-systems`** (58.3 KB -> hub ~35 KB with its Map + 3 topic parts). Hub keeps the Overview heading and its first paragraph plus `### User working style` (a standing rule for the project), Status, Action Items, Blockers, `## Where knowledge lives (index)`, `## Open items from audits (consolidated)`, Focal Points and the Related sections (under `## Map`, section 5). Parts are `topics/`, type topic, `part_of: "[[melange-systems]]"`:

| Full slug | Title | Headings moved | KB |
|---|---|---|---|
| `2026-06-feature-melange-model-facts` | Melange model facts: pipeline, Blended Model, pillar weights, member desk | `### Pipeline`, `### The model` (with its two level-4 subsections), `### Member desk + SNA features` (three children of the Overview section) | 8.7 |
| `2026-06-feature-melange-scenario-model-build` | Melange scenario model build (2026-06-26) | `## Timeline of the source facts`, `## Pre-flight pass`, `## Budget/dial what-if tool`, `## Electoral model`, `## Step 2:`, `## Step 3:`, `## Step-3 finish + REORG`, `## Scenario runner built`, `## Flip-channel wiring`, `## Diminishing-returns reconciliation` | 20.5 |
| `2026-06-troubleshooting-melange-model-audits` | Melange model audits of 2026-06-26 | `## Brutal internal audit`, `## Independent adversarial audit`, `## Second independent audit`, `## FEC data-quality assessment` | 12 |

Totals: 39 + 44 + 36 = **119 parts** (97 topic parts incl. 3 project parts, 22 actor parts). verify-plan.ts recomputes exact
bytes per part from the current files; split.ts refuses anything at or over 50 KB.

### 3.3 Contingent splits (not executed unless the note exceeds 50 KB at a gate)

| Note | Trigger | Hub keeps | Parts |
|---|---|---|---|
| `topics/2026-07-working-agreement-agent-orchestration-rules` (50,125 B) | over 51,200 B | summary layer + `## Contradictions noted` (~17 KB) | `-model-tiering-review-pace` (`###` scope a, scope b, review, go faster, ultracode; 12.5), `-lane-laws-glass-box-pod` (`###` universal lane laws, GLASS BOX, pod; 13.5), `-supervision-duplicates-identity` (`###` never supervise, SendMessage duplicates, company identity; 10) |
| `concepts/single-look-holdout-discipline` (47,161 B, ~47.6 KB after batch 3) | over 51,200 B | Description, Key Characteristics, Look ledger, Where it Applies (~9 KB) | `-case-1-moneyball-gate2` (13.5), `-cases-2-3-n-slot-and-gold-template` (12.5), `-cases-4-5-luna-and-pac` (14.5) |
| `topics/2026-07-working-agreement-verification-and-evidence-standards` (45,998 B) | over 51,200 B | summary layer (~13 KB) | `-r1-r4-completion-census-scouts` (14.5), `-r5-r7-premises-pins-anchoring` (8), `-r8-r10-criteria-and-examination` (13.5) |

---------------------------------------------------------------------------------------------------------------------

## 4. Link model and trimming rules

### 4.1 Roles, structural links and the budget

- Hubs: every note in `projects/`, `concepts/`, `actors/`, `people/`, `teams/` that has no `part_of`. No cap; every link
  must be real (the target is about the hub's subject) and bidirectional.
- Leaves: every note in `topics/` or `discussions/`, and every note with `part_of` (parts in `actors/` included).
- Structural links of a leaf (exempt from the budget): one link to a `projects/` note (its home project) and its family
  links: the link to its `part_of` parent, the links to its own parts (a split hub), and links to sibling parts (same
  `part_of`; created only by S10 positional rewrites).
- Budget (check `i`): for a leaf, `others = |outgoing targets| - |family links| - min(1, project links left)`; `others <= 3`.
  A second project link counts as an "other".
- Project-less leaves (no project link: the 4 working agreements `communication`, `tooling-traps`, `orchestration-rules`,
  `verification`, plus `2026-07-incident-workstation-stability` and `2026-10-feature-brain-vault-setup`) spend one of their 3
  on their home hub (`paul-goff`, `lg-gram-workstation`, `brain-vault-political-systems` respectively).
- Bidirectional (check `c`): for every directed A->B there is B->A; only pairs with a fleeting note at either end are exempt
  and listed separately (Owner decision 1, section 7). No batch creates a link to or from a fleeting note.
- `hub: true` frontmatter is **not** added: no Bedrock template (plugin or vault copy) defines a `hub` key; Bedrock assigns the
  Zettelkasten role by directory (permanent / bridge / index / fleeting) and `/bedrock:preserve` creates notes from the
  templates, so a hand-added flag would be missing on every future note. check.ts derives hub/leaf from directory + `part_of`.

### 4.2 The selection rule

"Link only where A changes how you see B": keep a link when the target explains the note's subject (the system it is
about, the method it applies, the ruling it implements, the record it continues), not when it is merely mentioned. Leaf to
leaf links are kept only for the named relations in 4.7 (a discussion and the record of its topic; counterpart parts that
record the same event from two angles) and for S10 family links. All other topic-to-topic "Related Topics" links go: they
are the "see also" dumps the vault rules ban. Paul is kept only where he is the subject (his projects, focal-point systems,
the working agreements that define how to work with him).

### 4.3 Deterministic choice for split hubs and parts

The hub link lists in 3.2 are explicit. For each part, split.ts proposes, and the spec records, at most 3 "others" (2 for
the S11 parts), taken in this order from targets wikilinked in the part's moved text: (1) its named relations from 4.7,
(2) concepts, by first occurrence, (3) actors, by mention count in the part then first occurrence; other projects and other
leaves are never chosen. The executor may replace a proposed link only by editing the spec before `--apply` (the spec is
committed).

### 4.4 Conversion rules (a dropped link becomes plain text)

- C1 Body: `[[x|y]]` -> `y`; `[[x]]` -> the title of x (`title`, else `name`, else the slug). Nothing else on the line changes.
- C2 Frontmatter arrays: `"[[x]]"` -> `"x"` (the key and the value stay; Bedrock "never delete fields" holds).
- C3 `sources:` is never edited (hubs keep every pair; parts start with `sources: []`). `part_of` is never converted.
- C4 Retarget: a kept relation may point at a part instead of its parent only by keeping the old display text:
  `[[part|<old display text or old title>]]` (body) or `"[[part]]"` (frontmatter). Used for D3 (the staffer-architecture
  discussion's links to the C2 hub become links to `-tenure-adjudication-and-architecture`), D5 (the xref discussion's links
  to the A1 hub become links to `-cross-verification`) and for K pairs whose moved text links the counterpart's parent.
- C5 Reciprocal lines (format per receiving section; sections created before `## Related Topics`, or at the end, if
  missing): an actor, person or team receiving a link from a topic, part or discussion adds `- [[x]] — <summary>` to
  `## Related Topics` (from a discussion: `## Discussions`); a concept receiving one adds it to `## Where it Applies`; a
  topic, part or discussion receiving a named-relation or K-pair link adds it to its `## Related Topics`; a project receives a
  Map row (section 5 formats). A concept wired into a leaf adds `- [[concept]] — <why>` to the leaf's `## Related Concepts`;
  an actor, concept or project linked from a new concept adds the reciprocal line to its own `## Related Concepts` (a
  project: its Map's `### Related Concepts`).
- C6 Map back-links: every concept or actor that receives a project Map row links back to that project: a concept adds
  `- [[project]] — <summary>` to `## Where it Applies`, an actor to `## Related Projects`. Six such back-links are new in
  batch 3 and are listed in keep.json (section 5).
- The Bedrock rules "never remove existing wikilinks" and "append-only bodies" are superseded for this vault by its own
  CLAUDE.md "2-3 selective links" rule (CLAUDE.md is the vault-specific layer); content safety is enforced by conserve.ts
  instead: converted links keep their display text, split text moves verbatim.

### 4.5 Reconciliation (R-sweep, run after every link or split change)

- R1 A leaf L keeps hub H (within budget): H must link L (add the C5 line if missing).
- R2 A note links leaf L but L does not keep it: convert that link to plain text (C1/C2).
- R3 Named leaf pairs (4.7), K pairs and S10 sibling links: both sides link (add the C5 line if missing).
- R4 Every project Map row has its C6 back-link.
- R5 Repeat until check.ts reports 0 one-way links among curated notes (pairs with a fleeting end are exempt); any one-way
  link left is a spec error, not a reason to add an unplanned link.

### 4.6 people/paul-goff: 50 -> 14

Keep (all already reciprocal): projects `cu-geography`, `forecast-redesign`, `melange-systems`, `mentat`; focal points
`draft-systems-r-pipeline`, `lg-gram-workstation`, `mentat-fec-pipeline`, `brain-vault-political-systems`, `brain-graph`;
working agreements `2026-06-working-agreement-change-control-and-decision-authority`,
`2026-06-working-agreement-communication-and-presentation-style`, `2026-06-working-agreement-tooling-and-environment-traps`,
`2026-07-working-agreement-agent-orchestration-rules`, `2026-07-working-agreement-verification-and-evidence-standards`.
Drop (C1 in Paul's note; R2 in the other note): the other 30 Active Topics, the 6 Discussions, and the body links in "Working
environment" (`congress-r-scrapers`), "Two API-key stores" (`mentat-collection`), "Decision authority" (`mentat-collection`,
`xref-council-review`, `repo-state`). The 36 dropped notes lose `"[[paul-goff]]"` in `people:`/`related_people:` (C2) and the
`[[paul-goff]]` cells of People Involved / Participants tables (C1 -> "Paul Goff"). Gate: Paul's `outgoingLinks` = 14.

### 4.7 Explicit link lists (batch 3) and named relations

Non-split leaves (19). "Home" is structural; "Others" are the 3-or-fewer kept links; everything else is converted.

| Leaf | Home | Others |
|---|---|---|
| `topics/2026-06-working-agreement-change-control-and-decision-authority` | melange-systems | paul-goff, mentat, moneyball-workbook |
| `topics/2026-06-working-agreement-communication-and-presentation-style` | (none) | paul-goff, trend-over-significance |
| `topics/2026-06-working-agreement-tooling-and-environment-traps` | (none) | paul-goff, claude-code-harness |
| `topics/2026-07-working-agreement-agent-orchestration-rules` | (none) | paul-goff, codex-executor, metaloop |
| `topics/2026-07-working-agreement-verification-and-evidence-standards` | (none) | paul-goff, census-before-claims, settled-findings-stay-settled |
| `topics/2026-07-feature-member-approach-briefs` | melange-systems | melange-audio-pipeline |
| `topics/2026-07-incident-workstation-stability` | (none) | lg-gram-workstation, claude-code-harness |
| `topics/2026-09-feature-cu-geography-luna-and-row-framework` | cu-geography | runpod-pod, quant-model-evaluation-skill, single-look-holdout-discipline |
| `topics/2026-09-feature-forecast-giving-redesign` | forecast-redesign | 2026-10-03-pac-accuracy-attempt2-rulings (D6), single-look-holdout-discipline, mentat-console |
| `topics/2026-09-feature-sector-growth-study` | forecast-redesign | trend-over-significance, mentat-fec-pipeline, mentat |
| `topics/2026-09-feature-staffer-network-surfaces` | melange-systems | staffer-live-sidecar, melange-dashboard, live-tree-patch-discipline |
| `topics/2026-09-troubleshooting-mentat-repo-state-and-workbooks` | mentat | mentat-console, mentat-fec-pipeline |
| `topics/2026-10-feature-brain-vault-setup` | (none) | brain-vault-political-systems, brain-graph, claude-code-harness |
| `discussions/2026-07-27-acu-outline-north-star-rulings` | melange-systems | legislative-pillar hub (D1); + its legfix5 part in batch 5 |
| `discussions/2026-07-30-coalition-builder-redesign-session` | melange-systems | influence-engine hub (D2), melange-dashboard; + its coalition-builder part in batch 5 |
| `discussions/2026-09-03-staffer-network-architecture` | melange-systems | staffer-data hub until batch 6, then its `-tenure-adjudication-and-architecture` part (D3, C4 retarget: the part carries the architecture and overlap rulings), staffer-live-sidecar, concurrent-service-overlap-edge-rule |
| `discussions/2026-09-06-staffer-sorting-rulings` | melange-systems | staffer-data hub (D4); + its sorting-lane part in batch 6 |
| `discussions/2026-09-17-mentat-xref-council-review` | mentat | mentat-collection hub until batch 4, then its `-cross-verification` part (D5, C4 retarget), mentat-console, exclude-on-contradiction-not-ambiguity |
| `discussions/2026-10-03-pac-accuracy-attempt2-rulings` | forecast-redesign | forecast-giving topic (D6), single-look-holdout-discipline |

The 22 topics waiting for a split are not trimmed in batch 3 except: their Paul links (4.6), R2 on links to the 19 leaves
above that do not keep them, and the concept lines wired in 6. Their full trim happens at their split (3.2 hub lists + 4.3).

Named relations (the only leaf-to-leaf links that survive besides S10 family links): D1-D6 above, 11 counterpart part
pairs (K1-K11) and the optional candidates K12-K25 below. Where a part's moved text links its counterpart's parent, that
link is retargeted to the counterpart (C4); otherwise the K link is a C5 line in each side's `## Related Topics`.

| # | Pair | Batch created |
|---|---|---|
| K1 | `mentat-fec-pipeline-history-build-and-ship` <-> `2026-07-bugfix-mentat-collection-and-attribution-july-build-and-ship` | 4 |
| K2 | `mentat-fec-pipeline-history-hardening` <-> `...-july-hardening` | 4 |
| K3 | `mentat-fec-pipeline-history-audit-r12` <-> `...-audit-r12-trade-association` | 4 |
| K4 | `mentat-fec-pipeline-history-september-lanes` <-> `...-september-collector-lanes` | 4 |
| K5 | `mentat-console-chart-studio-and-system-debug` <-> `...-system-debug-lane` | 4 |
| K6 | `mentat-console-redesign-boards` <-> `2026-09-feature-ui-redesign-boards-mentat-console-boards` | 4 |
| K7 | `mentat-console-pac-map-viz-lane` <-> `2026-09-feature-mentat-failings-pac-evidence-pac-map-viz-lane` | 4 |
| K8 | `codex-executor-incidents` <-> `2026-08-incident-refresh-automation-reliability-codex-poll-loop-burn` | 4 |
| K9 | `2026-07-feature-primacy-and-industry-tier-boards-industry-boards-build` <-> `2026-06-feature-melange-dashboard-ui-evolution-august-redesigns` | 6 (S11 slot reserved in batch 5) |
| K10 | `melange-dashboard-v2-redesign-overlay` <-> `2026-09-feature-ui-redesign-boards-finalize-reconcile-graph-quirks` | 6 (S11 slot reserved in batch 4) |
| K11 | `melange-fec-pipeline-live-tree-drift-and-eol` <-> `2026-07-troubleshooting-melange-live-tree-git-drift-drift-reconcile-eol` | 6 |

Candidate counterpart pairs (optional; round-3 review A-N12). A candidate becomes a K link only when split.ts finds both
(1) evidence that the two parts record the same event: their moved text names the same memory file (a backticked name
ending in a date) or the same session id, and (2) a free "other" slot on both sides after the planned keep lists, so no
planned link is dropped (a pair across batches also needs the earlier part to have at most 2 planned others, as in S11).
`split.ts --plan` reports each candidate as created or skipped, with the reason; a skipped candidate leaves the text as it
is.

| # | Candidate pair (event) | Batches |
|---|---|---|
| K12 | `mentat-console-startup-and-polish-lanes` <-> `2026-09-feature-mentat-console-ui-load-time-and-graph-quirks` (graph-quirks lane, session 6cce0269) | 4 |
| K13 | `2026-09-feature-mentat-console-ui-load-time-and-graph-quirks` <-> `2026-09-feature-ui-redesign-boards-finalize-reconcile-graph-quirks` (same lane) | 4 |
| K14 | `mentat-console-startup-and-polish-lanes` <-> `2026-09-feature-ui-redesign-boards-finalize-reconcile-graph-quirks` (same lane) | 4 |
| K15 | `mentat-console-chart-studio-and-system-debug` <-> `2026-09-feature-mentat-console-ui-chart-studio` (Chart Studio) | 4 |
| K16 | `codex-executor-incidents` <-> `2026-07-feature-legislative-pillar-acu-review-effectiveness-shadow-lane` (effectiveness shadow lane) | 4 -> 5 |
| K17 | `2026-07-feature-legislative-pillar-acu-review-bill-plane-and-media-stance` <-> `2026-07-feature-data-collection-lanes-collection-scope` (2026-07-10 corpus census) | 5 -> 6 |
| K18 | `moneyball-workbook-rules-scoring-and-sublayer-surgery` <-> `2026-07-feature-influence-engine-internals-chatgpt-lane-and-sublayer-surgery` (Sub Layer surgery) | 5 |
| K19 | `2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits` <-> `moneyball-workbook-lineage-and-june-audit` (June 25 Blended audit) | 5 |
| K20 | `2026-06-feature-congress-r-scrapers-stage5-debate-lsd` <-> `2026-06-feature-cu-stance-and-sentiment-june-stage5-template-and-cfpb-split` (Stage 5 overhaul) | 5 |
| K21 | `2026-06-feature-cu-stance-and-sentiment-june-stage5-template-and-cfpb-split` <-> `2026-06-feature-moneyball-excel-model-build-scoring-refinements-and-audits` (CFPB directional split) | 5 |
| K22 | `melange-dashboard-june-capstone` <-> `2026-06-feature-melange-dashboard-ui-evolution-capstone-to-desk-media` (June capstone and desk media) | 6 |
| K23 | `melange-fec-pipeline-reorganization` <-> `2026-07-rfc-melange-architecture-system-of-record-reorg-and-manifest` (REORG) | 6 |
| K24 | `2026-07-feature-data-collection-lanes-sentinel-lanes` <-> `2026-07-rfc-melange-architecture-system-of-record-reorg-and-manifest` (system-manifest sentinel lane) | 6 |
| K25 | `2026-06-feature-moneyball-excel-model-build-scenario-tools-and-calibration` <-> `2026-06-troubleshooting-melange-model-audits` (June 26 audits) | 5 -> 6 |

### 4.8 Worked examples (real notes, plan-time state)

**(a) Leaf, not split: `topics/2026-09-feature-staffer-network-surfaces`.** Now 4 targets: `staffer-live-sidecar` (fm
`actors` + 4 body), `melange-dashboard` (fm + 2), `paul-goff` (fm `people` + People Involved row), `melange-systems` (2).
After batch 3: home `melange-systems`; others `staffer-live-sidecar` (the surface is the sidecar: its routing, memory blow-up
and 8841 restart make the lane readable), `melange-dashboard` (the network is its fourth surface, `#app-staffer`),
`live-tree-patch-discipline` (new; the lane lands as ONE patch cut with `live_patch.py`, APPLY and restart are Paul's).
Edits: `people: ["paul-goff"]`; row `| Paul Goff | ... |`; new `## Related Concepts` line. Reciprocity: sidecar and dashboard
already link it; the new concept lists it; melange-systems' Map row exists; Paul's line becomes plain text. Budget 3.
Its fleeting capture (the people-network route latency lane) stays in `fleeting/`, untouched (Owner decision 1).

**(b) Hub trim: `people/paul-goff`** (4.6): 50 -> 14. Section edits: `## Active Topics` keeps 5 links (the working
agreements), 30 lines become `- <title> - <summary>`; `## Discussions` 6 lines become plain; `## Projects`, `## Focal Points`
unchanged; 5 prose links (4 targets) become titles. 36 notes edit their Paul cells (C1/C2). Paul's frontmatter is unchanged
except its domain tag (9.2).

**(c) Split family: `topics/2026-09-feature-staffer-network-data-and-math`** (C2). Hub: home `melange-systems`, 4 parts
(structural), others = D4 sorting discussion, `concurrent-service-overlap-edge-rule` (D3 moves to the part that carries
its rulings; the hub's mention of the architecture discussion becomes plain text by R2); `staffer-live-sidecar` becomes
plain text in the hub (`actors: ["staffer-live-sidecar"]`, Actors Involved row). Parts:
`-tenure-adjudication-and-architecture` keeps the overlap concept (linked in "Architecture and overlap rulings") and D3 (the
architecture discussion's links to the hub are retargeted here, C4); `-sorting-lane` keeps D4 and gets the S10
sibling link to `-sna-math-and-clique-lane` ("see the clique section below"), which links back; `-sna-math-and-clique-lane`
keeps the overlap concept (co-tenure clique section); `-stale-imports-and-v7-spine` has only its two structural links. R1:
the concept adds `## Where it Applies` lines for the two parts; the sorting discussion adds `- [[...-sorting-lane]]` (its
others become hub + part = 2); the architecture discussion's links to the hub are retargeted to the tenure part (C4; its
others stay 3: that part, the sidecar, the concept); melange-systems' Map adds 4 part rows. R2: the sidecar's `## Related
Topics` line for the hub and the hub's mention of the architecture discussion become plain text. All budgets <= 3 (sibling
links are family links); check `c` = 0.

---------------------------------------------------------------------------------------------------------------------

## 5. Project maps

Format (batch 3, every project): a `## Map` heading followed by the project's existing Related sections demoted one level
(`### Related Topics`, `### Discussions`, `### Related Actors`, `### Related Concepts`, `### Related Projects`; heading text
unchanged, rows unchanged), opened by one sentence: "Every note of this project by type, one line each; parts follow their
parent." Row format per section: Related Topics and Related Actors are tables, so new rows are `| [[slug]] | <summary, at
most 100 characters> |`; Related Concepts, Discussions and Related Projects are bullet lists, so new lines are
`- [[slug]] - <summary>`. In the split batches each part gets a row right after its parent in the same section format:
`| [[part]] | part: <summary, at most 60 characters> |` (topic and actor parts are table rows). melange-systems keeps `## Where
knowledge lives (index)` as is; mentat keeps `## Related work areas (topics)`. Every concept or actor listed in a Map links
back (C6).

| Project | Topics (rows) | Discussions | Actors | Concepts | Part rows added in batches 4-6 | Size after |
|---|---|---|---|---|---|---|
| `melange-systems` | 22 existing (incl. agent-tooling, workstation-disk, change-control) | acu-outline, coalition-builder, staffer-architecture, staffer-sorting | 16 existing | influence-vs-alignment-axes + zero-rank-delta-verification, two-hop-stance-decomposition, concurrent-service-overlap-edge-rule, single-look-holdout-discipline, four-pillar-percentile-blend, say-do-gate, gold-set-validation, live-tree-patch-discipline, fail-closed-gates, settled-findings-stay-settled | 95 (82 topic parts incl. its own 3, 13 actor parts) | ~35 KB |
| `mentat` | mentat-collection, mentat-console-ui, mentat-failings, repo-state, sector-growth (cross), change-control (cross) | xref-council-review | mentat-console, mentat-fec-pipeline, runpod-pod | exclude-on-contradiction-not-ambiguity, settled-findings-stay-settled | 24 (15 topic parts incl. the ui-redesign Mentat part, 9 actor parts) | ~23 KB |
| `forecast-redesign` | forecast-giving, sector-growth | pac-accuracy-attempt2-rulings | glass-box, mentat-console, runpod-pod | single-look-holdout-discipline, trend-over-significance | 0 | ~27 KB |
| `cu-geography` | luna-and-row-framework | - | runpod-pod, quant-model-evaluation-skill | single-look-holdout-discipline | 0 | ~18 KB |

C6 back-links new in batch 3 for existing concepts (the new concepts get theirs at creation, section 6), all in keep.json
`concepts.<slug>.projects`: `zero-rank-delta-verification`, `two-hop-stance-decomposition`,
`concurrent-service-overlap-edge-rule` and `single-look-holdout-discipline` -> `melange-systems`;
`exclude-on-contradiction-not-ambiguity` -> `mentat`; `single-look-holdout-discipline` -> `forecast-redesign`. Six lines,
each `- [[project]] — <summary>` under the concept's `## Where it Applies`; with them check `c` stays at 0 after the Maps.

Notes in no project Map (13), with the hub that gives them their incoming link: the 4 project-less working agreements ->
`paul-goff`; `2026-07-incident-workstation-stability` -> `lg-gram-workstation`; `2026-10-feature-brain-vault-setup` ->
`brain-vault-political-systems`; hubs `brain-graph`, `brain-vault-political-systems`, `lg-gram-workstation` (all linked from
Paul), `claude-code-harness`, `metaloop` (linked from actors and working agreements), `census-before-claims` (verification
agreement, workstation-disk hub, actors), `paul-goff` (all projects). No new project note is created (Owner decision 2).

---------------------------------------------------------------------------------------------------------------------

## 6. Concept promotions (8)

Criteria: durable method, principle or pattern; genuine use in at least 3 notes across at least 2 folders (matches on
link-description echo lines such as `- [[x]] - summary` and in Related sections were excluded); not an existing concept;
not the title subject of an existing note (a concept that duplicates one note's subject fragments it). Line numbers are
body-relative (counted after the frontmatter; e.g. melange-refresh-scheduler "L4" is file line 35) and plan-time; every
quoted phrase was re-checked to exist. Each concept note: concept template, `sources: []`, `related_to: []` (the template's
`"[[entity-name]]"` placeholder is never copied, so check `b` sees no placeholder link), `updated_by: "reorg@agent"`,
sections Description, Key Characteristics, Where it Applies (links = the "Links" column, all reciprocal), Evidence (the other
notes as plain titles).

| Concept slug (domain) | Definition | Evidence (notes, folders, phrases) | Links created (batch 3) |
|---|---|---|---|
| `fail-closed-gates` (platform) | When a check cannot be satisfied the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call | 22 notes, 4 folders. refresh-automation L70 "gates are DELIBERATE fail-closed rulings and loosening is Paul's call"; melange-refresh-scheduler L4 "fail-closed, zero AI"; melange-audio-pipeline L4 "off-chain and fail-closed"; audio lane L4 "fail-closed at 0 accepted clips"; lobbyview-collector L11 "fail-closed guards"; metaloop L135 "fail-closed on missing or self-generated evidence"; codex-executor L167 "FAIL-CLOSED review handling"; legislative L184 "fail-closed title matcher"; coalition-builder discussion L56 "three fail-closed mirrors"; single-look L127 "AND-rule fail-closed" | leaves: refresh-automation, audio lane; actors: codex-executor, metaloop, melange-refresh-scheduler, melange-audio-pipeline, lobbyview-collector, sentinel-collectors; project: melange-systems |
| `live-tree-patch-discipline` (platform) | The Melange live tree changes only through one line-wise patch cut with `fec/tools/live_patch.py`, applied with `core.autocrlf=false`; never checkout or merge into LIVE (EOL rewrite); APPLY is Paul's | 16 notes, 2 folders. melange-fec-pipeline L4 "line-wise patch cutter `fec/tools/live_patch.py`"; live-tree topic L4 "apply with `-c core.autocrlf=false`, never normalise LIVE"; staffer-live-sidecar L59 "cuts ONE patch; APPLY and the 8841 restart are Paul's"; staffer-surfaces L63 "cut ONE patch with `fec/tools/live_patch.py`"; audits L467 "has the cutter"; mentat-console-ui L136, repo-state L87 "core.autocrlf=false" | leaves: live-tree topic, staffer-surfaces; actors: melange-fec-pipeline, staffer-live-sidecar; project: melange-systems (melange-repo-mirror dropped in Revision 3: its only mentions of the cutter are link-description echo lines, which the criteria exclude) |
| `gold-set-validation` (research) | A measure is trusted only after scoring against a fixed, independently labelled, owner-ruled gold set kept blind to the pipeline | 14 notes, 4 folders. psychometrics L21 "Gold-anchored ... ACTIVE_EXTERNAL_GOLD_ANCHORED"; data-collection L85 "runs blind to gold labels"; cu-stance L90 "more gold labels on bill-naming releases"; audio L44 "Two-panel Senate gold verdicts"; two-hop L43 "PMI on gold human_labels"; single-look L111 "golden template"; staffer-architecture discussion L43 "I-4 (gold set) still gate arming"; debate-stance-model L64 "gold labels in the DEBATE retrain TRAIN split" | leaves: psychometrics, cu-stance; actor: debate-stance-model; concepts: two-hop-stance-decomposition, single-look-holdout-discipline; project: melange-systems |
| `census-before-claims` (agent-ops) | Measure (census, live file, `git status` + byte diff) before stating a mechanism, number or completion; never infer | 11 notes, 3 folders. verification agreement L4 "never infer completion, demand a census before repeating a mechanism claim"; workstation-disk L7 "Re-run the census before quoting any number"; lg-gram L119 "re-run the census before quoting them"; melange-fec-pipeline L264 "run the batched drift census first"; glass-box L64, metaloop L150, agent-tooling L377 "Never infer the outcome"; audio L125; mentat-failings L104 "verify, don't infer"; paul-goff L9 | leaves: verification agreement, workstation-disk; actors: lg-gram-workstation, glass-box, metaloop, melange-fec-pipeline |
| `four-pillar-percentile-blend` (data) | Moneyball rank = weighted blend of committee, legislative, press and demographic percentile ranks; three weight sets exist and only Paul ratifies; read the live set | 21 notes, 4 folders. moneyball-workbook L4 "canonical output of the 4-pillar percentile-rank blend"; excel build L47 "percentile-rank 4-pillar blend"; audits L12 "Pillar weights ... exist in THREE sets"; melange-systems L28 "Pillar weights: all three sets (resolution 3)"; influence-vs-alignment L24; primacy L10 "NOT ranks_python.json (the four-pillar rank)"; cosponsor L16; sentinel-collectors L54 | leaves: excel build, primacy, audits; actors: moneyball-workbook, melange-fec-pipeline; concept: influence-vs-alignment-axes; project: melange-systems |
| `settled-findings-stay-settled` (agent-ops) | A finding refuted by measurement or ruled intentional is recorded once (binding refuted list, "do not re-flag") and not re-litigated | 10 notes, 3 folders. audits L10 "binding refuted lists ... (do not re-flag)"; mentat-collection L458 and mentat-fec-pipeline L316 "do not re-litigate"; primacy L100 "do NOT re-flag it"; lobbyview-collector L82; single-look L76; orchestration L119; staffer-data L294; legislative L133; influence L73 | leaves: verification agreement, audits; actors: mentat-fec-pipeline, lobbyview-collector; projects: melange-systems, mentat |
| `say-do-gate` (research) | A member is Champion/Defender only if stated stance is backed by authored or original-cosponsored action (Rule A cap) | 6 notes, 3 folders. influence L4 "GATE-2 and say-do gate"; legislative L60 "satisfies say-do Champion A-path"; single-look L70 "Say-do gate LANDED @18ce3b3"; coalition-builder discussion L54 "PRE-say-do-gate"; cu-stance L118 "say-do calibration"; primacy L469 "ratified say-do Rule A" | leaf: influence; concept: influence-vs-alignment-axes; project: melange-systems |
| `trend-over-significance` (research) | Report sign, size and fold consistency before p-values, as real R `summary(lm())` output | 8 notes, 4 folders. communication L4 "trend over significance"; sector-growth L4 "reported trend-first"; forecast-giving L112 and forecast-redesign L124 "lead with sign/size/fold consistency"; quant-model-evaluation-skill L24, single-look L184, luna L13, agent-tooling L262 cite `trend-over-significance-2026-09-26` | leaves: communication, sector-growth; actor: quant-model-evaluation-skill; project: forecast-redesign |

Why census-before-claims and four-pillar pass the "title subject" test that rank-authority fails: the verification agreement
is a list of ten rules (census is R2 of R1-R10) and the principle recurs in 10 notes outside it; moneyball-workbook is the
workbook artifact, and the blend method is one of its sections and recurs in 20 other notes. rank-authority is the title
subject of `topics/2026-07-rfc-melange-architecture-system-of-record`. `four-pillar-percentile-blend` is written as a
pointer concept: it states the method, the three-sets fact and the ratification rule, and names where the live weights are
read (`moneyball-workbook` `## Pillar weights and score formula`), but restates no weight values, so it does not become a
seventh copy of the weight sets (B5 and B8 ledgers, B6, B10 and C3 hubs, a C9 part).

Considered and not promoted: `rank-authority` / system of record (13 notes, but the title subject of the rfc topic: a concept
would fragment it), byte-identity gate (44 notes; already covered by `zero-rank-delta-verification`), council review (hits mix
other senses such as "FHLBanks Council" with a tool workflow), off-chain layers (2 genuine notes), pre-registration (covered
by `single-look-holdout-discipline`).

---------------------------------------------------------------------------------------------------------------------

## 7. Fleeting notes (out of scope, Owner decisions 1, 10 and 14)

Every file in `fleeting/` except `_template.md`, present now or captured later, stays untouched as intake ("awaiting
organization"). A later, separate pass organizes them. What that means for each batch and gate:
- No batch edits, deletes, moves, renames or stages a fleeting path. No manifest lists one, commit.ts refuses one (A.3), and
  G-commit checks that the commit holds none. No curated note gains a link to a fleeting note or a `sources:` pair from one.
- In every gate (working tree, export, committed tree; decision 14), check.ts exempts every fleeting note from checks a
  (size), b (unresolved links, decision 10), c (one-way, for a pair with a fleeting note at either end) and d (no incoming
  link), and lists the fleeting notes in their own "awaiting organization" block with size, outgoing targets, unresolved
  links and incoming count. Checks g and k cover curated notes only; h and j apply to every note. Check f enforces a
  baseline `sources` pair only if a curated note held it in the baseline: the 3 pairs held only by fleeting notes F1-F3 are
  reported, not enforced, even if a capture is dismissed mid-phase (decision 14; A.1). An incoming link from a fleeting note
  never counts for a curated note in check d.
- healthcheck.ts reports fleeting notes in their own block: a fleeting orphan or a dangling link in a fleeting note never
  fails and never blocks STOP (decision 10); captures are never edited (A.4).
- conserve.ts ignores `fleeting/` on both sides (A.2): the hook may rewrite or remove a fleeting note at any time.
- The recall selftest decides on the committed export (11.2). Its fleeting notes are the 3 tracked in HEAD (F1-F3 below,
  committed before Phase 2), which Phase 2 never stages, so hook captures cannot change a gate result.
- The 6 notes present at 21:50 stay as they are, with the overlaps they carry: the pac-accuracy discussion vs its captures
  (8 #9), and `projects/mentat`, whose frontmatter blocker, Status table and blocker 1 (file line 115) still say the PR to
  main is unopened while F1 records it opened (F1's own tagline and body also disagree). Nothing is edited (Owner decisions
  1 and 4); both go into `.bedrock/reorg/stale-statements.md` (decisions 12 and 16, batch 6 step 9) for the later pass.

| # | Fleeting note at 21:50 (tracked?) | Memory source |
|---|---|---|
| F1 | `melange-systems--mentat-github-migration-2026-10-02` (tracked; working copy re-captured) | `mentat-github-migration-2026-10-02.md` |
| F2 | `melange-systems--pac-accuracy-attempt2-lane-2026-10-03` (tracked) | `pac-accuracy-attempt2-lane-2026-10-03.md` |
| F3 | `melange-systems--people-network-route-latency-lane-2026-10-02` (tracked; working copy re-captured) | `people-network-route-latency-lane-2026-10-02.md` |
| F4 | `melange-systems--repo-mirror-2026-08-11` (untracked) | `repo-mirror-2026-08-11.md` |
| F5 | `melange-systems--pac-accuracy-six-year-lookback-directive-2026-10-03` (untracked) | `pac-accuracy-six-year-lookback-directive-2026-10-03.md` |
| F6 | `scratch-2026-10-03-35774e--windows-hook-shell-git-bash` (untracked) | `windows-hook-shell-git-bash.md` |

---------------------------------------------------------------------------------------------------------------------

## 8. Alias fix and the 11 ambiguous overlaps

| # | Case | Decision | Done in |
|---|---|---|---|
| 1 | projects/forecast-redesign vs its topic | KEEP both: index/status note vs dated record (14 verbatim lines, 8.7%; not split-created, so not removable). Map row links them | 3 |
| 2 | projects/cu-geography vs luna topic | KEEP both, same reasoning (9.7% verbatim) | 3 |
| 3 | projects/melange-systems vs excel-model-build | KEEP. 0% verbatim (paraphrased accounts of 2026-06-26 from different memory files). The project's detail sections move to its own topic parts (C10), not into the excel topic | 6 |
| 4 | actors/mentat-fec-pipeline vs mentat-collection topic | KEEP both families (10.5% verbatim); counterpart parts K1-K4 (+K5) link the same events across system and bugfix record | 4 |
| 5 | coalition-builder discussion inside influence-engine | KEEP: design session vs implementation record (4.0% verbatim); D2 links the discussion to the hub and to the coalition-builder part | 5 |
| 6 | skill-library, quant-model-evaluation, codex-executor actors inside agent-tooling | KEEP: each actor is the system, the topic part is its lane record; each A7 part links its actor | 4 |
| 7 | exclude-on-contradiction concept inside mentat-collection; staffer-sorting discussion inside staffer-data | KEEP: the A1 hub keeps the concept link and `-cross-verification` links the xref discussion (D5); D4 links the sorting discussion to the sorting-lane part | 4, 6 |
| 8 | mentat-console and ui-redesign-boards, 5 identical paragraphs | KEEP: the paragraphs land in `mentat-console-redesign-boards` and `...-ui-redesign-boards-mentat-console-boards`, linked by K6; they predate the split, so S8 does not allow removing them | 4 |
| 9 | pac-accuracy discussion vs pac-accuracy fleeting captures (F2, F5) | OUT OF SCOPE: the captures stay untouched in `fleeting/` (Owner decision 1); the later fleeting pass decides. The discussion only gets its batch-3 link trim (D6) | - |
| 10 | melange-fec-pipeline vs mentat-fec-pipeline | KEEP: different systems (Python `fec/` vs R+API); names and aliases distinct | - |
| 11 | alias collision in projects/mentat | FIX: `aliases: ["Mentat FEC pipeline", "Mentat console"]` -> `["Mentat project", "FEC contributions intelligence"]`. The two old values are the names of `actors/mentat-fec-pipeline` and `actors/mentat-console`; they made the healthcheck's alias rule credit those links to the project. The `aliases` key stays (Bedrock "never delete fields"); the removed values are listed in the batch 2 commit body and log line | 2 |

---------------------------------------------------------------------------------------------------------------------

## 9. Domain tags

9.1 Rubric (added to the CLAUDE.md Domains bullets; check `g` enforces exactly one allowed tag per curated note):
backend = pipeline and server code structure; frontend = product UIs Paul reads (Melange dashboard, Mentat console);
infra = workstation, scheduling, disks, backups, pods, mirrors; data = collection, ETL, datasets, scoring artifacts;
platform = tooling agents and developers run on (git practice, Claude Code harness, Codex lane, skills, connectors, this vault);
security = credentials and key handling; research = methodology, validation, models of behaviour; agent-ops = rules and
practice for operating agents (working agreements, review discipline, the owner's standing instructions to agents).

9.2 Changes to existing notes (batch 2; non-domain tags untouched):
- `actors/brain-graph`: `domain/frontend` + `domain/agent-ops` -> `domain/platform` (internal vault tooling, not a product UI).
- `actors/brain-vault-political-systems`: `domain/agent-ops` + `domain/platform` -> `domain/platform`.
- `topics/2026-10-feature-brain-vault-setup`: `domain/agent-ops` -> `domain/platform` (same family; matches `project-brain`).
- `people/paul-goff`: `domain/data` -> `domain/agent-ops` (his note is his identity rule, environment, key stores and decision
  authority: standing instructions to agents; `data` fits no 9.1 definition).
All other 73 tagged notes fit the rubric and keep their tag.

9.3 New notes: parts inherit the parent's tag except `-system-debug-lane` (frontend), `mentat-fec-pipeline-key-stores`
(security: first use of the allowed `domain/security`), `-pac-evidence-ingestion` (data), `-runpod-sessions` (infra),
`-codex-poll-loop-burn` (platform), audits `-guardrails` (agent-ops), `melange-fec-pipeline-live-tree-drift-and-eol`
(platform); the three project parts take `domain/data` (S4). Concepts: as in section 6. Fleeting notes stay untagged;
check `g` covers curated notes only (Owner decision 1).

---------------------------------------------------------------------------------------------------------------------

## 10. Batch schedule

| Batch | Scope | Notes touched / created | Round |
|---|---|---|---|
| 1 | Tooling + rules: check.ts amendments, conserve.ts, commit.ts, healthcheck.ts, verify-plan.ts, tests, pending-splits list, CLAUDE.md; commits plan.md (Owner decision 6) | 0 notes; ~12 files, ~1,100-1,400 lines TS | R1 |
| 2 | Alias fix (8 #11) and 4 domain tags (9.2). Kept as its own small round rather than merged into batch 3, so batch numbers, manifests and the K/pin tables stay stable; the round budget still has 2 reserve rounds | 5 notes edited | R2 |
| 3 | Link model on all unsplit notes, Paul 50 -> 14, 8 concepts, 4 project maps, 6 C6 back-links (relink.ts) | ~80 edited, 8 created | R3 |
| 4 | Splits A (10 notes -> 39 parts) (split.ts); pins 1, 8, 9 | ~30 edited, 39 created | R4 |
| 5 | Splits B (10 notes -> 44 parts); pins 2, 3, 12 | ~35 edited, 44 created | R5 |
| 6 | Splits C (10 notes -> 36 parts); pin 17; snapshot pins; `stale-statements.md`; commit, then the STOP gate on the new HEAD | ~35 edited, 36 notes and `stale-statements.md` created | R6 |
| - | Final adversarial review #1 (+ fix) | as needed | R7 |
| - | Final adversarial review #2 (+ fix); STOP when two consecutive reviews pass | as needed | R8 |
| - | Reserve for a failed review, its fix and re-review | as needed | R9-R10 |

Plan-review rounds (santa r1, r2, r3, ...) are outside this count.

Common to every batch: start with G-pre, end with G-post and the commit (section 11). Never `git add -A`, `git commit -a`,
`git stash`, `git checkout -- <file>`, `git restore` on log.md, index.md or any fleeting path, or `git reset --hard`. **Never
push** (Owner decision 7): no `git push`, `git fetch`, `git pull` or other remote command in any batch, fix round or rollback,
whatever `.bedrock/config.json` says (its `git.strategy: commit-push-pr` is ignored during Phase 2); batches commit locally on
`brain-reorg-2026-10-03` only, and the orchestrator pushes the branch and opens the single PR after STOP. No batch edits,
moves, deletes or stages a fleeting path (Owner decision 1). All note writes are atomic (temp file + rename, as
`recall/lib.ts writeAtomic`). Every touched note gets `updated_at` (batch date) and `updated_by: "reorg@agent"`. Each batch
writes `.bedrock/reorg/ledger/batch-N-paths.txt` (its manifest: every created, modified and deleted path, including the
manifest itself, its `batch-N-allow.txt` (conserve allowlist: `old => new` for S10 rewrites, `old` for exact split
duplicates; expected empty otherwise), spec JSONs, `batch-N-positional.md` and `batch-N-pins.md` when present, and plan.md
when the batch amends it; never log.md, index.md or a fleeting path). Rollback commands: section 12 (pre-commit: working
files only, the real index was never written; post-commit: `commit.ts --rollback`). Fix rounds (batches 7, 8, ...) follow
the same protocol with `REQ=a,b,c,d,f,g,h,i,j,k` and no pending file, and run the STOP gate (11.3) after their commit.

**Batch 1** - commit "reorg batch 1: fleeting exemption, 50 KB limit and reorg gates in check.ts; conserve, commit, healthcheck and verify-plan tools; note rules in CLAUDE.md; the reviewed plan"
1. G-pre; `BASE_1=$(git rev-parse HEAD)` (expect e2077ed). The only non-hook dirty path allowed is `?? .bedrock/reorg/plan.md`.
2. check.ts (Appendix A.1): default limit 50; fleeting notes exempt from a, b, c and d and listed separately, and check f's
   fleeting-only pairs reported (Owner decisions 1, 10 and 14); `g` strict; new `i`, `j`, `k` (k ported from
   `PSP/alias.ts`); `--pending-splits`; `--require`. Extend the fixture test (`PSP/fixture-test.ts`) into
   `.bedrock/reorg/check.test.ts` (synthetic vaults in `os.tmpdir()`), covering every new rule with a passing and a failing
   fixture; keep the buildGraph cross-check.
3. Write `.bedrock/reorg/conserve.ts` (A.2), `.bedrock/reorg/commit.ts` (A.3, with a fixture test that a failed pre-commit
   step leaves `.git/index` byte-identical), `.bedrock/reorg/healthcheck.ts` (A.4, port of the read-only baseline script
   `PSP/hc.ts`) and `.bedrock/reorg/verify-plan.ts` (A.8, `PSP/plan/verify-plan.ts` generalised to vault-relative paths),
   each with fixture tests in `check.test.ts` or a sibling (if `PSP` is gone, the tools are written from Appendix A).
4. Write `.bedrock/reorg/spec/pending-splits.txt` with the 30 paths of 3.2 and `.bedrock/reorg/spec/split-fingerprints.txt`
   with the 30 lines of Appendix D (re-measured: any line that differs from Appendix D is reported in the batch body).
5. CLAUDE.md: Appendix C text (note rules, domain rubric, fleeting-notes rule, healthcheck "clean", tooling commands, the
   commit and never-push rules).
6. Manifest: the files of steps 2-5, `.bedrock/reorg/plan.md`, `batch-1-paths.txt`, `batch-1-allow.txt`. The commit body
   records `sha256(plan.md)` of the reviewed revision.
7. `bun .bedrock/reorg/check.test.ts` all pass; G-post with `REQ=a,b,c,d,f,h,j` and the pending file (g and k fail until
   batch 2, i until batch 3: expected, reported).
8. Commit via commit.ts: local only, never pushed (Owner decision 7).
9. Rollback (section 12). Before the commit: the section 12 loop with N=1 (CLAUDE.md and `.bedrock/reorg/check.ts` come
   back from BASE_1; the new tools, tests and spec files are deleted; `.bedrock/reorg/plan.md` stays on disk; the real index
   was never written). After the commit: `commit.ts --rollback --batch 1 --base $BASE_1 ...` (plan.md leaves the tree, as
   `git rm --cached` would, and stays on disk; commit.ts deletes its own file last and reports it if Windows refuses).

**Batch 2** - commit "reorg batch 2: fix the Mentat alias collision and 4 domain tags"
1. G-pre; `BASE_2`.
2. Alias fix (8 #11) in `projects/mentat`; domain tags (9.2) in `actors/brain-graph`, `actors/brain-vault-political-systems`,
   `topics/2026-10-feature-brain-vault-setup` and `people/paul-goff`. No other line of these notes changes; no fleeting path
   is touched (Owner decision 1). Manifest: the 5 notes, `batch-2-paths.txt`, `batch-2-allow.txt` (empty).
3. G-post with `REQ=a,b,c,d,f,g,h,j,k` and the pending file (i fails until batch 3: expected, reported); G-split for the 30
   pending notes (11.2): verify-plan reports no problems (expected: no pending note changed).
4. Commit via commit.ts: local only, never pushed (Owner decision 7).
5. Rollback (section 12). Before the commit: the section 12 loop with N=2 (the 5 notes come back from BASE_2; the manifest
   and allow file are deleted; the real index was never written). After the commit: `commit.ts --rollback --batch 2 --base
   $BASE_2 ...`.

**Batch 3** - commit "reorg batch 3: link model (2-3 selective links), people/paul-goff 50 to 14 links, 8 concepts, project maps"
1. G-pre; `BASE_3`.
2. Write `.bedrock/reorg/relink.ts` (A.5) + fixture test.
3. Write `.bedrock/reorg/spec/keep.json` from 4.6, 4.7 (incl. D1-D6), section 6 links and the six C6 back-links (section 5).
4. Create the 8 concept notes (section 6 outline).
5. `bun .bedrock/reorg/relink.ts --spec .bedrock/reorg/spec/keep.json --pending .bedrock/reorg/spec/pending-splits.txt
   --dry-run > "$SP/b3-plan.txt"` (`--pending` limits the 22 pending topics to their Paul links, R2 and the section-6 concept
   lines, 4.7); check counts: Paul 14,
   each of the 19 leaves within budget, every planned R1 insertion lands in the right section, 6 C6 lines, no planned edit
   to a fleeting path.
6. `--apply`, then `--maps` (section 5 wrappers, missing rows, C6 back-links), then `--reconcile` until 0 one-way links
   among curated notes (each with the same `--pending` file).
7. Recall pins: procedure P (Appendix B; concepts may outrank pins 6, 11, 12, 19).
8. G-post with `REQ=a,b,c,d,f,g,h,i,j,k` and the pending file; assert Paul `outgoingLinks == 14`; G-split.
9. Commit via commit.ts: local only, never pushed (Owner decision 7). Size: ~90 files.
10. Rollback (section 12). Before the commit: the section 12 loop with N=3 (every edited note comes back from BASE_3; the 8
   concepts, relink.ts, keep.json and the batch files are deleted; the real index was never written). After the commit:
   `commit.ts --rollback --batch 3 --base $BASE_3 ...`, once batches 4-6 are rolled back, newest first.

**Batches 4, 5, 6** - commits "reorg batch 4: split 10 Mentat, agent-tooling and infra notes into 39 parts",
"reorg batch 5: split 10 Melange model and scoring notes into 44 parts",
"reorg batch 6: split 10 Melange data, network, surface and project notes into 36 parts; pin the snapshot; list stale statements"
1. G-pre; `BASE_N`; **G-split for the batch's 10 notes** (11.2): verify-plan reports no problems against the current files;
   any note whose `##`/`###` headings changed since 3.2 (summary-layer changes made by batch 3 do not count: a new `##
   Related Concepts`, and the project `## Map` with its demoted `### Related *` sections, which the hub keeps under S2), or
   whose recomputed part sizes moved more than 2 KB or crossed 45 KB, gets its table regenerated into its spec JSON and
   appended to plan.md "Amendments" (plan.md joins the manifest; verify-plan reads the latest table per id) before anything
   else runs. `verify-plan.ts --s1` lists every governing-marker line with its destination and `--s1-cross` every struck hub
   claim with unmarked token hits in a part; the executor signs each one off against S1 rules 1-2 (decision 11) in the
   batch body, and a case that needs neither rule-1 regrouping nor an allowed rule-2 pointer stops the batch for a table
   amendment.
2. Batch 4 only: write `.bedrock/reorg/split.ts` (A.7) + fixture test (including the S10 matcher fixtures of S10).
3. Write `.bedrock/reorg/spec/splits/<parent-slug>.json` for the batch's 10 notes from 3.2 or its amendment (exact heading
   lines copied from the files; part keep lists from 4.3 and S11; named relations and K candidates from 4.7; the S1 rule-2
   pointer lines of S5 for B2, B5, B6 and B10, plus any the sign-off adds).
4. `bun .bedrock/reorg/split.ts --spec <file> --plan` for each: every section assigned exactly once, sizes, proposed links,
   K candidates created or skipped, every S10 flag (detection rule) with its proposed rewrite, "same note" mark or "ask",
   R1/R2 effects. Fix the spec, never the note, until the plan is clean and no S10 flag is unresolved.
5. `--apply` for each (writes parts, hub `## Parts`, pointer lines, Map rows, S10 rewrites and their log, manifest lines;
   refuses while an S10 flag is unresolved), then `relink.ts --reconcile`.
6. Remove the batch's notes from `pending-splits.txt` (batch 6: delete the file).
7. Recall pins: procedure P.
8. G-post (11.2) on the batch's `commit.ts --export` tree, like every batch: batches 4-5 with `REQ=a,b,c,d,f,g,h,i,j,k` and
   the pending file; batch 6 with the same `REQ` and no pending file (step 6 deleted it, so every check runs in full). In
   batch 6, once step 9 has pinned the counts, step 8 also checks the snapshot on that export:
   `bun .bedrock/graph/build.ts --vault "$X" --out "$X/page.html" && bun .bedrock/graph/snapshot.ts --file "$X/page.html"`.
9. Batch 6 only, from the step-8 export: build its page and read the counts (`build.ts --vault "$X" --out
   "$X/page.html"`); set `SNAPSHOT` in `.bedrock/graph/snapshot.ts` to those nodes, links, mentions and per-type counts
   (expected types: actor 47, concept 14, discussion 6, person 1, project 4, topic 132, team 0, fleeting = the fleeting
   notes tracked in HEAD, 3 at plan time, which Phase 2 never stages); update its header comment. Write
   `.bedrock/reorg/stale-statements.md` (decisions 12 and 16): one row per stale statement that predates Phase 2 and falls
   outside the split work, with note (post-split path), section, the statement (short quote), why it is stale (the note or
   record that supersedes it) and who found it; at least C10's model-facts part "Workbook writes go through Excel COM"
   (file line 109 at plan time; superseded 2026-07-02 per C9 hub line 36 and C7 hub line 389), `projects/mentat` blocker 1
   (line 115), its frontmatter blocker and Status row vs F1, F1's own tagline vs its body, and every statement the S1
   sign-offs of batches 4-6 classed as stale and pre-existing. Add both files to the manifest and re-run step 8, now with
   the snapshot check.
10. Commit via commit.ts: local only, never pushed (Owner decision 7). Sizes: batch 4 ~73 files (~700 KB moved), batch 5
   ~85 files (~930 KB), batch 6 ~77 files (~640 KB).
11. Batch 6 only: run the STOP gate (11.3) on the new HEAD. If it fails, either roll the batch back (`commit.ts --rollback
   --batch 6 --base $BASE_6 ...`) and redo it from G-pre, or run a fix round (batch 7) with the full batch protocol; never
   amend the batch-6 commit.
12. Rollback (section 12). Before the commit: the section 12 loop with the batch's N (the hubs and every other edited note
   come back from BASE_N; the parts, split specs and batch files are deleted, and in batch 4 split.ts; the real index was
   never written). After the commit: `commit.ts --rollback --batch N --base $BASE_N ...`, newest batch first; batch 6 also
   restores `snapshot.ts` and the pending-splits file and removes `stale-statements.md` this way, since all three are in its
   manifest.

---------------------------------------------------------------------------------------------------------------------

## 11. Invariants and gates

### 11.1 Invariants after every batch

| Invariant | Enforced by |
|---|---|
| Sources: 0 missing among baseline pairs a curated note held; the 3 pairs held only by fleeting notes are reported, not enforced (decision 14); hubs keep every pair; part pairs subset of parent pairs | check `f`; conserve.ts per-note pair superset; check `j` |
| 0 unresolved links, 0 one-way links and 0 notes without incoming links among curated notes; fleeting notes exempt from b, c and d and listed separately in every gate (decisions 1, 10 and 14) | checks `b`, `c`, `d` |
| No fleeting path edited, deleted, moved or staged by any batch | commit.ts refusal (A.3); manifests; G-commit (`git show --stat HEAD` holds no `fleeting/` path) |
| Leaves within budget (pending-split topics reported, not failed, until their batch) | check `i` |
| No curated note over 50 KB except pending-split notes; no `size_reason`; fleeting notes exempt and listed (Owner decision 1); A8's hub under 50 KB (decision 15) | check `a` |
| Exactly one allowed domain tag on every curated note; no name collisions; split families intact | checks `g`, `k`, `j` |
| index.md byte-identical to the generator | check `h` (after `hook.ts index`; on the export before the selftest touches it) |
| No note text lost (verbatim moves, plain-text conversions, logged S10 rewrites, allowlisted exact duplicates) | conserve.ts |
| Split tables match the current notes, and every governing-marker line and cross candidate is signed off against S1 (decision 11), before every split batch | G-split (`verify-plan.ts`, `--s1`, `--s1-cross`) |
| Zero unresolved S10 flags in a split batch ("ask" counts as unresolved) | `split.ts --plan/--apply`; G-post re-detection |
| Graph page builds and passes the publish gate; in batch 6 and every fix round, the snapshot matches the export's page before the commit | `build.ts` + `verify.ts`; `snapshot.ts --file` (section 10 step 8) |
| Healthcheck clean: setup OK; 0 orphans and 0 dangling among curated notes; fleeting notes reported separately and never failing (decision 10); graphify-out MISSING = not used by this vault and old content reported only (Owner decision 3) | healthcheck.ts |
| Recall selftest passes on the committed export; pin changes justified and within decision 13 | `BRAIN_VAULT=<export> selftest.ts`; `batch-N-pins.md` |
| One local commit per batch: explicit paths, "reorg batch N: ...", one log.md line, hook output untouched, real index untouched until the commit succeeds, nothing pushed (Owner decision 7) | commit.ts; G-commit |
| The final batch commits `.bedrock/reorg/stale-statements.md` (decision 16) | section 10 batch 6 step 9; 11.3 |

### 11.2 Commands

G-pre (start of every batch):
```
V=C:/Users/pgoff/Documents/brain; cd "$V"
test "$(git branch --show-current)" = brain-reorg-2026-10-03
BASE_N=$(git rev-parse HEAD)
git diff --cached --quiet  # the real index holds nothing staged (commit.ts never leaves anything there)
git status --porcelain     # dirty paths may only be hook output: fleeting/*, log.md, index.md (batch 1 also: ?? .bedrock/reorg/plan.md)
```
G-split (end of batch 2, start of batches 4-6; `ONLY` = the batch's ids, e.g. A1,...,A10):
```
bun .bedrock/reorg/verify-plan.ts --fingerprints .bedrock/reorg/spec/split-fingerprints.txt [--only $ONLY] --s1 --s1-cross --json "$SP/gsplit-bN.json"
```
(no problems required; `split-fingerprints.txt` is Appendix D, written in batch 1; a CHANGED note is re-checked for heading
changes and size drift, and regenerated as in section 10; `--s1` and `--s1-cross` print the S1 sign-off lists.)
G-post (before the commit; `REQ` from section 10; `MSG` and `LOG` are the batch's commit message and log text; `WHEN` is
set once, so the export's log.md blob equals the committed one):
```
WHEN=$(date "+%Y-%m-%d %H:%M %z")
bun .bedrock/recall/hook.ts index
bun .bedrock/reorg/check.ts --strict --require $REQ --pending-splits .bedrock/reorg/spec/pending-splits.txt --json "$SP/gate-bN.json"
bun .bedrock/reorg/conserve.ts --base $BASE_N --allow .bedrock/reorg/ledger/batch-N-allow.txt
bun .bedrock/reorg/healthcheck.ts --strict
bun .bedrock/graph/build.ts && bun .bedrock/graph/verify.ts
X=$(cygpath -m "$(mktemp -d)")
bun .bedrock/reorg/commit.ts --batch N --expect-head $BASE_N --paths-file .bedrock/reorg/ledger/batch-N-paths.txt \
  --message "$MSG" --log "$LOG" --when "$WHEN" --export "$X"   # throwaway index; the real index is not written
bun .bedrock/reorg/check.ts --vault "$X" --strict --require $REQ --pending-splits "$X/.bedrock/reorg/spec/pending-splits.txt"
#   (runs before the selftest, which rewrites "$X/index.md"; batch 6 and fix rounds then add, once SNAPSHOT is pinned:)
#   bun .bedrock/graph/build.ts --vault "$X" --out "$X/page.html" && bun .bedrock/graph/snapshot.ts --file "$X/page.html"
BRAIN_VAULT="$X" bun .bedrock/recall/selftest.ts      # deciding run: the would-be-committed tree, no hook output
bun .bedrock/recall/selftest.ts                        # working tree: informational (fleeting notes and hook output may differ)
git diff --cached --quiet                              # still nothing staged in the real index
```
If check `h` fails because the hook wrote a fleeting note after `hook.ts index`, re-run both lines. The pending-split flag is
dropped once the file is gone (batch 6 and fix rounds). A failure anywhere here is rolled back with the pre-commit commands
of section 12.
Commit and G-commit:
```
bun .bedrock/reorg/commit.ts --batch N --expect-head $BASE_N --paths-file .bedrock/reorg/ledger/batch-N-paths.txt \
  --message "$MSG" --body-file "$SP/bN-body.txt" --log "$LOG" --when "$WHEN"
git show --stat HEAD               # the manifest + log.md (+ index.md when its content changed); no fleeting/ path
git diff --cached --quiet          # the real index matches the new HEAD
git status --porcelain             # only hook output left
```
No push follows: the branch stays local until the orchestrator pushes it after STOP (Owner decision 7).

### 11.3 STOP gate (runs only on a committed HEAD: after batch 6's commit, section 10 step 11, then after every fix round's commit)

```
bun .bedrock/recall/hook.ts index
bun .bedrock/reorg/check.ts --strict                         # a b c d f g h i j k, no pending file: the STOP criterion
bun .bedrock/reorg/conserve.ts --base e2077ed $(for f in .bedrock/reorg/ledger/batch-*-allow.txt; do printf -- '--allow %s ' "$f"; done)
bun .bedrock/reorg/healthcheck.ts --strict                   # then run /bedrock:healthcheck (read-only) once and compare
bun .bedrock/graph/build.ts && bun .bedrock/graph/verify.ts
git cat-file -e HEAD:.bedrock/reorg/stale-statements.md      # decision 16: the list is committed
X=$(cygpath -m "$(mktemp -d)"); git archive HEAD | tar -x -C "$X"
bun .bedrock/reorg/check.ts --vault "$X" --strict            # before the selftest, which rewrites "$X/index.md"
bun .bedrock/graph/build.ts --vault "$X" --out "$X/page.html" && bun .bedrock/graph/snapshot.ts --file "$X/page.html"
BRAIN_VAULT="$X" bun .bedrock/recall/selftest.ts
```
STOP when all pass on the working tree and the committed tree, and two consecutive final adversarial reviews pass. The gate
never runs before a commit: batch 6 runs G-post with the snapshot check on its export first (section 10 steps 8-9), commits,
and only then runs this gate on the new HEAD (step 11); a failure is handled by `commit.ts --rollback --batch 6` or a fix
round. A final-review fix round runs as the next batch number (7, 8, ...) with the full batch protocol (G-pre, manifest,
G-post with `REQ=a,b,c,d,f,g,h,i,j,k` and no pending file, commit.ts, never push); when it changes any count it re-pins
`snapshot.ts` from its own export exactly as batch 6 step 9 and checks it in its G-post, and when it finds more stale
pre-existing statements it updates `stale-statements.md`; this gate then runs on its new HEAD. After STOP the orchestrator
pushes the branch and opens the single PR, whose description summarizes `stale-statements.md` (decisions 7 and 16). The
healthcheck's 15-day "old content" rule is reported, never failed (Owner decision 3), so notes untouched since 2026-10-03
do not block a STOP after 2026-10-19.

---------------------------------------------------------------------------------------------------------------------

## 12. Risks and rollback

| Risk | Exposure | Mitigation |
|---|---|---|
| Hook writes fleeting/, log.md, index.md mid-batch (seen four times while planning: 20:55, 20:56, 21:09, 21:34) | certain | commit.ts stages only the manifest and refuses any fleeting path; builds index.md from the staged tree; appends the batch log line to the working file only after a successful commit (O_APPEND) and stages HEAD's log.md + that line; forbids the git commands listed in section 10; the selftest decides on the export |
| A failed G-post or commit leaves staged paths, an `AD` state or a stray log line in the real index | removed by design | commit.ts stages, builds index.md and log.md and exports in a throwaway index (`GIT_INDEX_FILE`, seeded from HEAD); the real index is written only by `git reset -q -- <committed paths>` after the branch ref moved; G-pre and G-post assert `git diff --cached --quiet`; batch-1 fixture test proves `.git/index` is byte-identical after a failed run (A.3) |
| A gate runs on the wrong tree (round 3: batch 6's STOP gate archived HEAD before the batch-6 commit existed) | removed by design | G-post always runs on the batch's `commit.ts --export` tree, batch 6 included, with the snapshot check on that export; 11.3 runs only on a committed HEAD (batch 6 step 11 and after every fix round's commit) |
| A8's hub (~47.6 KB, decision 15) reaches 50 KB as batches 3-6 add reciprocal lines | low | check `a` at every gate; the batch stops and escalates to the owner (decision 15 forbids both moving the wiring history out and passing 50 KB) |
| The branch moves between export and commit (another session commits) | low | commit.ts re-checks HEAD and moves the branch with `git update-ref <ref> <new> <expect-head>`, which fails atomically if the branch moved; the batch then restarts at G-pre |
| An accidental push publishes an unreviewed batch | low | never-push rule in every batch step list, in section 10, in CLAUDE.md and in commit.ts (no remote command; `.bedrock/config.json` `git.strategy` ignored); the orchestrator pushes after STOP (Owner decision 7) |
| A capture holds an unresolved link, or the owner dismisses (deletes) a capture mid-phase | possible | decisions 10 and 14: check b exempts fleeting notes and lists their unresolved links; check f reports, never enforces, the 3 baseline pairs held only by fleeting notes; neither blocks a gate or STOP; captures are never edited |
| Hook reads a half-written note and captures a duplicate | low | atomic writes only; a duplicate capture whose (path, sha) a curated note holds is harmless and stays in `fleeting/` as awaiting organization |
| Split loses or rewrites text | medium | split.ts assigns every section exactly once and refuses otherwise; conserve.ts line multiset (independent of split.ts); S10 rewrites logged and allowlisted |
| Split separates a correction or newest-wins note from the text it governs | medium | S1 rules 1-2 (Owner decisions 8, 11 and 15); the 30-note marker scan in the Revision 3 changelog; `verify-plan --s1` and `--s1-cross` sign-off at every split gate; explicit pointer lines only for the rule-2 cases (S5) |
| A positional or section-name reference points at text now in another note | certain (524 trigger lines) | S10 detection on every moved or kept line; the resolver marks automatically only references that name their referent and marks everything else "ask" (never "same note" when ambiguous); explicit `[[note]]` rewrites logged and allowlisted; gate: zero unresolved flags |
| Split tables go stale after batch 3 edits pending notes | certain for batch 3 (links); batch 2 edits no pending note | G-split before every split batch (verify-plan.ts against current files; regenerate on heading or size change) |
| One-way links after a split or a Map row | medium | R-sweep; C6 back-links; check `c` |
| Recall pins or off-topic prompts change with 127 new notes (BM25 statistics shift) | medium | procedure P on the committed export; fixes only through the titles, aliases and summaries of new notes and alias additions to existing ones (decision 13); recall code untouched; escalate if a threshold change is needed |
| Notes near the limit grow later (A8 hub ~47.6 KB under decision 15, orchestration ~49 KB, single-look ~47.6 KB, B9 methodology part ~44 KB, B2 and C4 S1 parts ~41.5 and ~33.5 KB, melange-systems hub ~35 KB) | medium | gate `a` every batch; contingent splits 3.3 |
| Tool bugs (7 tools: check.ts changed; conserve, commit, healthcheck, verify-plan, relink, split new) | medium | fixture tests; check.ts keeps its buildGraph cross-check; conserve.ts independent of the transformers; dry-run/plan before apply |
| Bedrock skills later re-add links or merge content against the link model | low | CLAUDE.md precedence text; checks `i` and `c` catch regressions |
| A future re-import from `.bedrock/import-manifest.json` would upsert pre-split full text into hubs | out of scope | flagged in CLAUDE.md; re-import tooling must become split-aware |
| Graph page leak gate trips on new summary text (paths, hex) | low | build strips paths/emails in taglines; verify.ts in every gate |

Rollback (commands from `V`; `M` = a copy of the batch manifest, `cp .bedrock/reorg/ledger/batch-N-paths.txt "$SP/M-N.txt"`
made before anything is removed):
- Batch fails before its commit (any G-post or commit step): commit.ts wrote only its throwaway index, so the real index
  needs nothing. Restore working files only:
  ```
  while read -r p; do
    if git cat-file -e "$BASE_N:$p" 2>/dev/null; then git restore --source="$BASE_N" --worktree -- "$p"
    elif [ "$p" != .bedrock/reorg/plan.md ]; then rm -f -- "$p"; fi
  done < "$SP/M-N.txt"
  git diff --cached --quiet && git status --porcelain     # nothing staged; only hook output left
  ```
  The manifest never holds log.md, index.md or a fleeting path, so they are never touched; `.bedrock/reorg/plan.md` is
  never deleted (it predates batch 1). Then fix and restart the batch at G-pre.
- Batch already committed: `bun .bedrock/reorg/commit.ts --rollback --batch N --base "$BASE_N" --expect-head "$(git
  rev-parse HEAD)" --paths-file "$SP/M-N.txt" --message "reorg rollback of batch N" --log "rollback of batch N | <notes>"`
  (A.3: builds the rollback commit in a throwaway index, then restores the working files as above and syncs the real index
  for those paths; a new log line is added and the batch's own line stays: log.md is append-only). Batch 1:
  `.bedrock/reorg/plan.md` leaves the tree (as `git rm --cached` would) and stays on disk, untracked again. Later batches
  roll back first, newest first. Nothing is pushed, so a rollback never needs a force-push.
- Whole phase: abandon the branch (main is untouched at `d6d71dc`, and nothing was pushed); before switching, copy
  uncommitted hook output (fleeting notes, log.md tail) so it is not lost.

---------------------------------------------------------------------------------------------------------------------

## Appendix A. Tool specifications

A.0 Common to every tool below: no tool runs `git push`, `git fetch`, `git pull` or any other remote command, and none reads
or acts on `.bedrock/config.json`'s `git.strategy` (Owner decision 7: never push during Phase 2; the orchestrator pushes
after STOP). No tool writes, moves, deletes or stages a path under `fleeting/` (Owner decision 1).

A.1 `check.ts` amendments (batch 1)
- Default `--size-limit` 50. `STRICT_CHECKS` = a, b, c, d, f, g, h, i, j, k. `--require <letters>` selects which strict
  checks decide the exit code (default: all). `--pending-splits <file>`: listed notes are "pending split" for a and i.
- Fleeting (top folder `fleeting/`; Owner decisions 1, 10 and 14, applied the same way in every gate and on every tree
  check.ts runs on): every fleeting note is exempt from a (size), b (unresolved links), c (a one-way pair with a fleeting
  note at either end) and d (no incoming link), and is listed in an "awaiting organization" block with its size, outgoing
  targets, unresolved links and incoming count; none of these ever fails a run. g and k consider curated notes only; h and
  j apply to every note. In d an incoming link from a fleeting note does not count (a curated note needs a curated incoming
  link). There is no freeze file and no check `l`.
- f (sources invariant, decision 14): a baseline pair is enforced only if some curated note held it in
  `sources-baseline.json`; it passes when a current curated note holds it (exactly, or by a newer sha of the same path, as
  today). A pair whose baseline holders were all fleeting notes (3 today: the F1-F3 captures) is reported in the fleeting
  block and never fails, whether or not a fleeting note still holds it.
- g: fail when a curated note has zero or several `domain/*` tags or one not in the CLAUDE.md list.
- i: leaf budget as 4.1 (family links, including sibling parts, are structural); report note, others count, the targets.
- j: every `part_of` holds exactly one wikilink to an existing curated note P; P has no `part_of`; P links the part; the
  part's (path, sha256) pairs are a subset of P's.
- k: slug (date prefix removed), title/name and aliases normalised to `[a-z0-9]`, length >= 4; fail on any key shared by two
  different curated notes (port of the baseline `alias.ts`).
- JSON gains `fleeting`, `budget`, `families`, `collisions`; the human summary prints each new block.

A.2 `conserve.ts --base <commit> [--allow <file>]... [--staged]`
- Reads every curated note at `<base>` (`git ls-tree`, `git show`) and in the working tree (or the index with `--staged`).
  Notes under `fleeting/` are ignored on both sides (Owner decision 1: no batch touches them, and the hook may rewrite or
  remove them at any time); G-commit separately proves that no fleeting path was committed.
- Body lines only; skip blank lines; strip trailing spaces and CR; heading lines compared without the `#` run; wikilinks
  normalised with C1 (titles from the base tree, falling back to the current tree); internal whitespace collapsed.
- Multiset rule: every normalised base line must occur at least as often across all current curated notes. Allow-file
  entries: `old` (an exact split duplicate) or `old => new` (an S10 rewrite: accepted only if `new` exists in the current
  tree).
- Frontmatter rule: for every note in both trees, no base key is missing and base `sources` pairs are a subset of current ones.
- Prints missing lines with their base note; allowlisted ones separately; exit 1 on any failure.

A.3 `commit.ts --batch N --expect-head <sha> --paths-file <f> --message <m> --log <text> --when <time> [--body-file <f>] [--export <dir>] [--rollback --base <sha>]`
- Refuses: wrong branch; HEAD != expect-head; directory or glob paths; log.md or index.md in the list; any path under
  `fleeting/` (Owner decision 1); a real index with staged changes (`git diff --cached --quiet` fails). It runs no remote
  command and ignores `.bedrock/config.json` `git.strategy` (A.0).
- Throwaway index: every staging step runs with `GIT_INDEX_FILE=<tmp>/index`, seeded by `git read-tree HEAD`. The real
  `.git/index` is not written before the branch ref has moved, so a failure at any earlier point (verification, export,
  selftest, checks, the commit itself) leaves it byte-identical and a pre-commit rollback restores working files only.
- Stages each manifest path into the throwaway index: `git add -- <path>` for a file on disk, `git rm --cached --quiet --
  <path>` for a path in HEAD that is gone; refuses a path in neither. Then verifies `git diff --cached --name-only
  --no-renames` (same index) == manifest.
- index.md: `git checkout-index -a --prefix=<tmp>/tree/` from the throwaway index, generates
  `catalogText(buildIndexData(statNotes(<tmp>/tree)))`, stores it with `git hash-object -w` and stages it with
  `git update-index --cacheinfo 100644,<blob>,index.md` (throwaway index).
- log.md: builds `HEAD:log.md` + `- <when> | reorg-batch-N | <what happened> | <notes touched>` as a blob and stages it the
  same way; `--when` (`YYYY-MM-DD HH:MM ±HHMM`, set once per batch in G-post) makes the export's blob and the committed blob
  identical. index.md is staged only when its generated content differs from HEAD's (G-commit expects the manifest, log.md
  and, when changed, index.md).
- `--export <dir>`: after the steps above, `git checkout-index -a --prefix=<dir>/` from the throwaway index (the
  would-be-committed tree with its index.md and log.md blobs), deletes the throwaway index and exits: no commit, no append,
  real index untouched. G-post passes the same `--message`, `--log` and `--when` as the commit, so the exported log.md blob
  equals the committed one.
- Commit: re-checks HEAD == expect-head; under the throwaway index `tree=$(git write-tree)` and `commit=$(git commit-tree
  $tree -p <expect-head> -F <message, body and the trailer Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>>)`;
  then `git update-ref -m "reorg batch N" refs/heads/brain-reorg-2026-10-03 $commit <expect-head>`, which fails atomically
  if the branch moved. Only after that: `git reset -q -- <committed paths> index.md log.md` syncs the real index to the
  new HEAD for exactly those paths, the batch line is appended to the working log.md (newline-safe O_APPEND, never a
  rewrite), and the throwaway index is deleted. Prints the sha and `git status --porcelain`.
- `--rollback --base <BASE_N>` (after batch N was committed): throwaway index from HEAD; every manifest path that exists
  in BASE_N gets BASE_N's blob, every other manifest path is removed; index.md and log.md (the rollback line) as above;
  commit and real-index sync as above with message "reorg rollback of batch N"; then the working files: `git restore
  --source=HEAD --worktree --` for the restored paths, removed paths deleted from disk except `.bedrock/reorg/plan.md`
  (batch 1: it leaves the tree and stays on disk, untracked again).
- A fixture test (batch 1) runs a failing `--export` and a failing commit against a temporary repository and asserts that
  `.git/index` is byte-identical afterwards and that nothing was pushed (the fixture has no remote).

A.4 `healthcheck.ts [--strict] [--date YYYY-MM-DD]`: the baseline's read-only port of `/bedrock:healthcheck` (vault
resolution, Phase 1 scan, checks 1-5). Fleeting notes are reported in their own block: a fleeting orphan or a dangling
link in a fleeting note never fails and never blocks STOP (decisions 10 and 14); captures are never edited. Inbound links
from fleeting notes never rescue a curated note from orphan status. `--strict` exits 1 on any curated orphan or dangling
note or a setup issue. Old content (check 5) and graphify-out MISSING are reported, never failed (Owner decision 3).

A.5 `relink.ts --spec <keep.json> --pending <pending-splits.txt> (--dry-run | --apply | --maps | --reconcile)`
- keep.json: `{ leaves: { <rel>: { home, keep[] } }, paul: [], named: [[a,b]...], concepts: { <slug>: { leaves[], hubs[], projects[] } } }`
  (existing concepts appear with `projects` for their C6 back-links).
- Applies C1-C6 and R1-R5 to curated notes only; touches only notes that change; atomic writes; appends every touched path
  to the batch manifest; `--dry-run` prints per note the conversions, insertions and resulting out-links; `--reconcile`
  loops on check.ts output.
- `--pending`: a listed note (a topic waiting for its split) is only touched as 4.7 allows in batch 3: its Paul links (4.6),
  R2 on links to the 19 leaves that do not keep them, and the section-6 concept lines; everything else waits for its split
  (3.2 hub lists + 4.3). Without the file, relink.ts refuses to run in batch 3.

A.6 (removed in Revision 3: `fleetdiff.ts` is not built, because fleeting notes are out of scope.)

A.7 `split.ts --spec <splits/x.json> (--plan | --apply)`
- Spec: parent path, home project, hub-kept heading lines, hub link list, parts (slug, folder, type, table title, summary,
  domain, home, heading lines in order, keep list), named relations, K candidates (4.7), S10 rewrites, and the S1 rule-2
  pointer lines (S5) each part carries, if any.
- Matches headings on text with wikilinks normalised; fails unless every `##`/`###` section of the parent is kept or moved
  exactly once; refuses a part or hub at or over 50 KB; builds titles and aliases by S4; writes parts (S4-S5, with the
  spec's pointer lines), the hub (`## Parts` before the first `##`), Map rows; applies the link lists with C1-C2; creates
  each K candidate only when the 4.7 evidence and free-slot rules hold, and reports the rest; enforces the S11 reservation;
  atomic writes; manifest lines.
- S1: prints every governing-marker line with its destination and the cross candidates (the `verify-plan --s1` and
  `--s1-cross` listings) in `--plan`.
- S10: `--plan` flags every positional or section-name reference whose referent lands in another note (S10 detection
  rule), with the referent it can name or "ask"; it marks a flag automatically only when the reference names its referent
  (S10 resolver) and never marks an ambiguous flag "same note"; `--apply` writes the spec's rewrites and their log, and
  refuses while any flag has neither a rewrite nor a "same note" mark. G-post re-runs the detection on the written notes.
  The S10 matcher fixtures are part of its test.

A.8 `verify-plan.ts [--plan <file>] [--vault <dir>] [--fingerprints <file>] [--only <ids>] [--json <file>] [--s1] [--s1-cross] [--positional]`:
read-only; parses 3.2 and any "Amendments" tables, using the latest table per note id (so an appended amendment replaces
the original instead of being read twice); checks every `##`/`###` section of each split note is kept or moved exactly
once (a `##` named in "Hub keeps" keeps its own text in the hub while its `###` children move; the summary layer of S2,
including a project's `## Map` and its demoted `### Related *` sections, stays in the hub); recomputes hub and part sizes
from the current bytes (warns at 45 KB, fails at 50 KB, hubs counted with ~150 B per Parts line); prints each note's sha256 and heading list
and, with `--fingerprints`, which notes changed since Appendix D; checks the totals and slug uniqueness. `--s1` lists every
governing-marker line (correction, newest wins, superseded, supersedes, READ BEFORE, contradiction, RESOLVED, "do not use",
"replaced by") with its file line, section and destination, plus per-note HUB/PART counts; `--positional` lists the S10
trigger lines with their destination; `--s1-cross` lists every struck hub claim whose distinctive tokens (backticked
names, long quotes, decimals, amounts) recur in a part line that is not marked in place (candidates for the S1 sign-off,
not verdicts). The prototype is `PSP/plan/verify-plan.ts`: "no problems" on revision 4, 119 parts, 399 marker lines.

## Appendix B. Recall pins: procedure P and forecast

P1 After the batch's edits, export the would-be-committed tree (`commit.ts --export "$X"`) and run
`BRAIN_VAULT="$X" bun .bedrock/recall/selftest.ts --verbose`: this run decides (no hook output in it). The working-tree run is
informational: a failure there caused only by fleeting notes or other hook output is logged, not fixed.
Allowed fixes (decision 13): a note created in Phase 2 (a part or a concept) may have its title, aliases and summary edited;
an existing note, split hubs included, may only gain aliases; the titles and summaries of existing notes are never edited.
Recall code is never edited.
P2 For each pin whose expected note E changed in the batch, let A be the note that now holds the answer section below (E
itself, a part of E's family, or a concept created in the batch). If A ranks in the top 3, set the pin to A (keep it when
A = E). Otherwise use an allowed fix on A (an alias if A is an existing note; title, aliases or summary if A is new),
re-run, and escalate to the owner if it still fails.
P2b A pin whose note E did not change but drops out of the top 3 because a new note N outranks it: if N is in E's family
(its S4 title and alias carry E's short name by design), apply P2 and re-pin within the family to the note that holds the
answer; otherwise edit N's title, aliases or summary (N is new) so it stops outranking E, without restating E's name, or add
an alias to E. Never re-pin to a note outside E's family.
P3 Off-topic prompts must stay silent; fix by editing the offending note's title, aliases or summary only if it is new, and
escalate if the offender is an existing note.
P4 Record each change with the moved heading in `.bedrock/reorg/ledger/batch-N-pins.md` and the commit body;
`.bedrock/recall/selftest.ts` joins the manifest. Five pins point at split hubs (3, 8, 9, 12, 17); their answer sections stay
in the hubs, so P2b is the likely path there.

| Pin | Prompt (short) | Now | Batch | Answer section after | Likely pin |
|---|---|---|---|---|---|
| 1 | Mentat trade association $0, attribution fix | mentat-collection topic | 4 | `## Trade-association $0 gap` in `-audit-r12-trade-association` | that part |
| 2 | congress scraper press-release fallbacks | congress topic | 5 | `### 5-step fallback chain` in `-cu-press-scraper` | that part (P2; draft-systems-r-pipeline already outranks the topic, 17.5 vs 16.6) |
| 3 | how psychometrics scores are computed | psychometrics topic | 5 | hub Context | unchanged |
| 4 | PAC attempt 2 rulings | pac-accuracy discussion | 3 | link trim only (D6); its fleeting captures stay untouched | unchanged |
| 5 | brain graph watcher | brain-graph | - | unchanged note; no competing new note | unchanged |
| 8 | when to delegate to Codex | codex-executor | 4 | hub `## Role split and standing rules`; A7 `-codex-executor-lane` ("Codex executor lane record") and A8 `-incidents` carry "Codex executor" in their S4 titles and compete (P2b) | unchanged expected; the A7 part is the likeliest outranker |
| 9 | workstation disk and backup incident | workstation-disk topic | 4 | hub | unchanged |
| 10 | staffer sidecar live data | staffer-live-sidecar | 3 | link trim and R1 lines only | unchanged |
| 11, 21 | contradictions-not-ambiguity rule; xref council decision | concept; xref discussion | 4 | A1 `-cross-verification` competes (P2b) | unchanged expected |
| 12 | workbook blends four pillars | moneyball-workbook | 3, 5 | hub `## Pillar weights and score formula`; new concept `four-pillar-percentile-blend` may rank 1 | unchanged or concept (P2) |
| 14 | metaloop four lanes | metaloop | 4 | agent-tooling `-codex-executor-lane` mentions metaloop (P2b) | unchanged expected |
| 17 | cosponsor and sector networks | cosponsor topic | 6 | hub | unchanged |
| 20 | Luna row framework structure | luna topic | - | unchanged note; not split | unchanged |
| 6, 19 | concept prompts | existing concepts | 3 | new concepts compete | unchanged expected |
| 7, 13, 18 | RunPod pod; GLASS BOX lanes; Higgsfield account trap | runpod-pod; glass-box; higgsfield-connector | 4 | agent-tooling parts `-runpod-sessions`, `-glass-box-lock-hang`, `-higgsfield-account-trap` compete (P2b) | unchanged expected |
| 15 | LobbyView collector bulk exports | lobbyview-collector | 6 | the C1 hub (it now keeps the LobbyView "Basics" paragraph, S1) and three data-collection LobbyView parts compete (P2b) | unchanged expected |
| 16 | staffer sorting rulings | staffer-sorting discussion | 6 | `-sorting-lane` part competes (P2b) | unchanged expected |
| 22 | weekly refresh scheduler | melange-refresh-scheduler | 4 | `-weekly-refresh-and-tick-runner` part competes (P2b) | unchanged expected |

## Appendix C. CLAUDE.md text (batch 1)

Under "## Note rules", replace the "2-3 selective links" bullet and add:
- **Size limit 50 KB** (1 KB = 1024 bytes; `check.ts` default; applies to every curated note, not to `fleeting/`). A larger
  note is split along its sub-topics: the original stays as a short hub (summary sections plus `## Parts`) and keeps every
  `sources:` entry; each part carries `part_of: "[[hub]]"`, opens with "Part of [[hub]]", and holds moved text verbatim;
  positional words ("above", "below") and section-name references that would point across a part boundary are rewritten as
  a wikilink to the note now holding the referent. A correction, "newest wins" note or superseding decision stays in the
  same note as the text it governs; only where that would pass 50 KB, or where the owner ruled it, does the governed part
  carry an explicit pointer line to the correction instead. `size_reason:` only for irreducible references (none today).
- **Titles and summaries.** The titles and summaries of existing notes are never edited; aliases may be added to help
  recall. New notes (parts, concepts) get their own titles and summaries.
- **Hubs and leaves.** Hubs (`projects/`, `concepts/`, `actors/`, `people/`, `teams/`) have no link cap, but every link must be
  real. Leaves (`topics/`, `discussions/`, every note with `part_of`) keep their home project, their family links (split
  parent, parts, sibling parts) and at most 3 other links, chosen where A changes how you see B. Every link is
  bidirectional. A dropped link becomes plain text (`[[x|y]]` -> y, `[[x]]` -> x's title; frontmatter `"[[x]]"` -> `"x"`); this
  replaces Bedrock's "never remove wikilinks" in this vault, and `bun .bedrock/reorg/conserve.ts` proves no text was lost.
- **Project maps.** Each project's `## Map` lists its notes by type with a one-line summary; parts follow their parent; every
  concept or actor in a Map links back to the project.
Under "## Domains", append the 9.1 definition to each existing bullet (keep the backticked tag first).
Under "## Capture and recall", add: "Fleeting notes are intake awaiting organization. The Phase 2 reorganisation leaves every
one untouched (no edit, delete, move or staging); `check.ts` exempts them from the size, unresolved-link, one-way and
no-incoming checks in every gate and lists them separately, a `sources` pair held only by fleeting notes is reported, not
enforced, and an incoming link from a fleeting note never counts for a curated note. They are organized in a later,
separate pass."
New section "## Reorganisation tooling": the commands of 11.2-11.3, the healthcheck "clean" definition (graphify-out is not
used: the graph is `.bedrock/graph` + `brain-graph.html`; old content is reported only; fleeting notes are reported
separately), the list of stale pre-existing statements (`.bedrock/reorg/stale-statements.md`, written by the final batch),
and the commit rules: commit through `bun .bedrock/reorg/commit.ts` only (explicit paths, a throwaway index,
never a fleeting path, never hook output); commits stay local, so never run `git push`, `git fetch` or `git pull` during the
reorganisation, whatever `.bedrock/config.json` says; the orchestrator pushes the branch and opens the PR after STOP.

## Appendix D. Fingerprints at plan time (for G-split)

Written by batch 1 to `.bedrock/reorg/spec/split-fingerprints.txt` (`<sha256 first 12> <bytes> <rel>`); verify-plan.ts
`--fingerprints` reports every note that changed since. Batch 3 changes all 22 pending topics (links), so CHANGED is expected
from then on; the gate's pass condition is "no coverage problem, no size refusal", and a CHANGED note with new, renamed or
removed headings is regenerated (summary-layer headings that batch 3 adds, such as `## Related Concepts`, do not count: the
hub keeps them by S2, as does the project `## Map` with its demoted `### Related *` sections). All 30 fingerprints still matched the vault when Revision 4 was finished.

```
5a3b38963bca 149264 topics/2026-07-bugfix-mentat-collection-and-attribution
2c4cb9abf365 113329 actors/mentat-fec-pipeline
72f86ff0141d 98439 actors/mentat-console
b7dbf783055a 72769 topics/2026-09-feature-mentat-failings-pac-evidence
51449e02e0cf 65011 topics/2026-09-feature-mentat-console-ui
e5e5cbbab39e 65438 topics/2026-09-feature-ui-redesign-boards
573ccdbd5f88 80492 topics/2026-07-feature-agent-tooling-stack
6567ad25c1ca 55234 actors/codex-executor
516502e4e6cc 60669 topics/2026-08-incident-refresh-automation-reliability
4a5284d612bd 57015 topics/2026-08-incident-workstation-disk-and-backup
8b0313608e00 169631 topics/2026-06-feature-congress-r-scrapers
09e5020880e1 141289 topics/2026-07-feature-personality-psychometrics
46b1845dbc65 97492 topics/2026-06-feature-cu-stance-and-sentiment
a078acdb22e3 107900 topics/2026-07-feature-legislative-pillar-acu-review
d700fc6b9fe8 98790 topics/2026-06-feature-moneyball-excel-model-build
df700f54d2fb 58074 actors/moneyball-workbook
cddef29fb7fc 64863 actors/draft-systems-r-pipeline
aa5a57e9f933 88420 topics/2026-07-feature-influence-engine-internals
ccbf3c9aebc1 128873 topics/2026-07-feature-primacy-and-industry-tier-boards
2ab4a18874e6 110753 topics/2026-07-troubleshooting-melange-audits-and-reviews
ee78d73242f6 137149 topics/2026-07-feature-data-collection-lanes
56a94addd3e8 95092 topics/2026-09-feature-staffer-network-data-and-math
4eb8f1c37c29 72452 topics/2026-06-feature-cosponsor-and-sector-networks
25e7ae2c6c46 73181 topics/2026-07-feature-audio-and-speech-lane
a341121a3290 78481 actors/melange-dashboard
7def8a3a95ce 77303 topics/2026-06-feature-melange-dashboard-ui-evolution
78ce209ecb71 74399 actors/melange-fec-pipeline
17eb450cde6c 52773 topics/2026-07-troubleshooting-melange-live-tree-git-drift
e15e1bbe9d5a 52736 topics/2026-07-rfc-melange-architecture-system-of-record
3c69975cea7c 59714 projects/melange-systems
```

---------------------------------------------------------------------------------------------------------------------

## Revision 2 changelog

Every issue ID from `santa-r1-A.md` (A-) and `santa-r1-B.md` (B-), with its fix or the reason it was declined. Section
references point into revision 2. Kept as history: the rows about fleeting integration (A-B1, A-B3, A-B4, B-B1 to B-B3,
B-N13 and the fleeting parts of A-N2, A-N4 and A-N5) describe machinery that Revision 3 removed (Owner decision 1); the
Revision 3 changelog below is current.

| ID | Issue | Fix |
|---|---|---|
| A-B1 | Batch 2 scope contradicts Owner decision 1 | 7.1 freeze file `.bedrock/reorg/fleeting-freeze.json` written at batch-2 G-pre; 7.2 placement rows F1-F6 for all 6 notes present; 7.3 rule for any other note, including new-source notes and the new-curated-note case; A.6 `fleetdiff --targets`; A.3 ledger-only deletion of untracked notes; 7.4 step 7 sync assertion for every frozen source; counts recomputed (section 1, 7.2 sizes, 10 batch-2 row, snapshot types) and re-checked at the freeze; 7.6 and A.1 narrow the exemption to post-freeze captures and add check `l`; (d) F4 puts repo-mirror's blocks in the mirror actor, so A10 and C8 are not edited, and the G-split gate regenerates any pending note that does change |
| A-B2 | plan.md not committed with batch 1 (decision 6) | Status line; 10 batch 1 steps 1 and 6 (manifest lists `.bedrock/reorg/plan.md`; commit body records its sha256; commit message names it); 11.2 G-pre accepts `?? .bedrock/reorg/plan.md` in batch 1 only |
| A-B3 | Fleeting ledger incomplete and unverified (decision 4) | 7.4 steps 1 and 4 (byte copy; a row for every non-blank body line, title and tagline included); A.2 fleeting-ledger checks 1-7 (copy hash, exact one-to-one rows, DROPPED whitelist, verbatim block presence in the named target's family, pair in every MERGED target, memory file with sha S, note gone); the blanket skip is removed |
| A-B4 | Batch-2 rollback relies on a re-capture sync never performs | 7.5 (restore from the `.orig.md` byte copies, then `sync --dry-run` 0 dismissed; documents the `-2` sibling effect); 12 rollback points to 7.5; A.3 `--staged-only` for the rollback commit |
| A-B5 | B9 cuts the coupled methodology lane | B9 `-methodology-lane` is one part (44.0 KB by verify-plan); S1 governing-section rule; totals updated (124 parts with the A-N7 change) |
| A-N1 | Old content vs decision 3 | A.4 (reported, never failed); 11.1; 11.3 closing note |
| A-N2 | Check `a` exemption broader than decision 1 | 2 consequences; 7.6; A.1 (a, b, f, h, j apply to every note) |
| A-N3 | K9/K10 cross batches; where leaf-to-leaf lines go | S11 slot reservation (also marked in A6, B9 and 4.7); C5 says named-relation and K lines go to `## Related Topics` |
| A-N4 | Duplicate log line from `commit.ts --export` | A.3 (the working-file append happens only after `git commit` succeeds; `--export` never appends) |
| A-N5 | Selftest vs uncommitted hook notes | 11.2 G-post (`BRAIN_VAULT=<export>` run decides; working-tree run informational); 11.3; Appendix B P1 |
| A-N6 | Re-pin gap in P2 | Appendix B P2 (pin moves to the note that holds the answer when it is in the top 3); pin 2 row |
| A-N7 | B6 splits coupled sections | B6: standing rules and History in one part; `## Source memory descriptions` stays in the hub; 2 parts |
| A-N8 | A1 part titles misstate date ranges | A1 `-july-build-and-ship` and `-july-hardening` titles; the same check corrected A2's two history titles (07-18 to 07-24; 07-22 to 07-23) |
| A-N9 | S2 omits preamble text | S2 (everything before the first `##` stays in the hub); verify-plan counts it in the hub |
| A-N10 | Wrong tags on C10 parts | S4 project-part tags; 9.3 |
| A-N11 | C5 gap for Map concepts | C6; 5 (the six back-links, in keep.json); R4 |
| A-N12 | Part titles clipped in recall | S4 (title = table title first, parent short name in parentheses; full parent title in the alias) |
| A-N13 | Round accounting | Conventions "Rounds"; 10 (plan-review rounds outside the count) |
| A-N14 | Nits: "3 new pairs" loose; paul-goff `domain/data`; D5 could link `-cross-verification` | Section 1 sources row (2 baseline pairs move, 4 are new); 9.2 paul-goff -> `domain/agent-ops`; D5 retargeted to A1 `-cross-verification` (A1, 4.7, 8 #7, C4) |
| B-B1 | Fleeting scope; batch 2 cannot integrate the notes present | As A-B1. The freeze file follows the coordinator's path (`.bedrock/reorg/fleeting-freeze.json`, not `ledger/fleeting-frozen.txt`); untracked frozen paths stay in the manifest and commit.ts skips them as ledger-only deletions (coordinator's rule), instead of being kept out of the manifest; the pin-4 forecast reflects F5 |
| B-B2 | Ledger never verified; window classifier marks new text PRESENT | A.6 (block-level verbatim matching only, no windows); A.2 checks 1-7; 7.4 (byte copy, rows for H1 and tagline, DROPPED whitelist, memory-file check) |
| B-B3 | Rollback cannot restore deleted fleeting notes | 7.5 (byte copies; index back to the BASE_2 blob for tracked notes) |
| B-B4 | Map rows to existing concepts become one-way links | C6; R4; 5 (six back-links listed); A.5 keep.json `concepts.<slug>.projects` |
| B-B5 | plan.md never committed in batch 1 | As A-B2 |
| B-N1 | Old content vs decision 3 | As A-N1 |
| B-N2 | Recall gate stability with fleeting notes in recall | As A-N5 |
| B-N3 | Positional references orphaned by splits | S10: rewritten as explicit wikilinks to the note holding the referent (the coordinator's rule, rather than the review's plain-text pointer); logged in `batch-N-positional.md`; `old => new` allowlist entries in A.2; sibling links are family links in 4.1 and A.1; the 4 confirmed cases are listed in S10 |
| B-N4 | Coupling in B6, B9, C10 | B6 (A-N7), B9 (A-B5); C10 keeps `### User working style` in the hub |
| B-N5 | Where a named-pair line goes; K text links the counterpart's parent | C5 (`## Related Topics`); C4 retarget for K pairs; note above the K table |
| B-N6 | Promotion criteria applied unevenly | Declined to drop census-before-claims and four-pillar: 6 adds the "title subject" criterion and a paragraph showing why both pass it (census is one rule of ten in its agreement and recurs in 10 other notes; the blend is one section of the workbook actor and recurs in 20 other notes) while rank-authority fails it |
| B-N7 | Evidence line numbers are body-relative | 6 criteria paragraph says so, with an example |
| B-N8 | Tool count | 12 risk row: 8 tools (check.ts changed; 7 new including verify-plan.ts) |
| B-N9 | Map row format per section | 5 (tables for Related Topics/Actors, bullets for Concepts/Discussions/Projects; part rows) |
| B-N10 | Manifest must contain its own files | 10 common rules (paths file, allow file, spec JSONs, ledgers, positional and pins logs, plan.md when amended) |
| B-N11 | Round counting rule | As A-N13 |
| B-N12 | Appendix B omits pins 5, 14, 20, 21; `-cross-verification` competes for 11 and 21 | Appendix B rows 5, 14, 20 and 11/21 |
| B-N13 | mentat annotations are new prose | F1 labels them as new prose: no ledger rows, no pair |
| Coordinator 7 | Batch 2 edits notes that are split later; regenerate split tables before batches 4-6 | G-split gate (11.2): at the end of batch 2 and before batches 4, 5 and 6; `verify-plan.ts --fingerprints` against Appendix D; a note with changed headings or size drift is regenerated into its spec and a plan.md "Amendments" entry before the batch runs (10 batches 2 and 4-6; A.8) |

Other changes in this revision: single-look-holdout-discipline no longer receives F2 sentences (each block now goes to
exactly one target), so it stays at ~47.6 KB; part counts are 124 (A 40, B 46, C 38) and end-state notes 209; the
scratchpad `verify-plan.ts` now prints sha256 fingerprints, checks the stated totals and reports "no problems" on this
revision.

## Revision 3 changelog

Edited in place from revision 2 (backup of the revision-2 bytes: `<SP>/plan/plan-r2-backup.md`). Every issue ID from
`santa-r2-A.md` (A-) and `santa-r2-B.md` (B-) is mapped to **fixed**, **obsolete** (made moot by the Revision 3 descoping,
Owner decision 1) or **declined**, with the reason. Section references point into this revision.

| ID | Issue | Status | Where / reason |
|---|---|---|---|
| A-B1 | Decision 7 (integration heading) not implemented | obsolete | No fleeting content is integrated (decision 1); decision 7 is now the never-push rule. Section 7 rewritten; the 7.2 heading format, F-placements and CLAUDE.md integration text are gone |
| A-B2 | Decision 4 proofs checked only after the deletion; memory file may change | obsolete | No fleeting note is deleted; decision 4 is now "content is never deleted". Ledgers, byte copies and memory-file checks removed (A.2) |
| A-B3 | C4 and B6 split a correction from what it governs | fixed | C4: `-n-audio-route-and-measurements` (33.7 KB) holds the N audio route with the measurement and ASR sections its corrections govern. B6: the hub keeps `## History` (25.7 KB), part `-rules-scoring-and-sublayer-surgery` (14.3 KB); "(table above)" no longer crosses notes; History's "(below)" is an S10 rewrite (3.2) |
| A-B4 | `commit.ts --export` stages into the real index, so a pre-commit rollback leaves it dirty | fixed | A.3: export and commit are built in a throwaway index (`GIT_INDEX_FILE`, seeded by `git read-tree HEAD`); commit via `commit-tree` + atomic `update-ref`; the real index is synced only after the ref moved; G-pre and G-post assert `git diff --cached --quiet`; fixture test; pre-commit rollback restores working files only (12, each batch's rollback step) |
| A-B5 | commit.ts could commit a post-freeze capture at a frozen path | obsolete | No frozen paths exist. Residual guard: commit.ts refuses any `fleeting/` path and G-commit checks the commit holds none (A.3, 11.1, 11.2) |
| A-N1 | S10 coverage understated | fixed | S10 is now a detection rule over every moved or kept line (positional words and section-name references), 524 trigger lines measured, batch budget for dozens of rewrites, gate: zero unresolved flags; sibling links get R3 back-links (S10, A.7, 11.1) |
| A-N2 | Memory files can disappear | obsolete | No ledger or memory-file proof remains |
| A-N3 | Base blob vs working copy of tracked fleeting notes | obsolete | No fleeting note is deleted; conserve.ts ignores `fleeting/` (A.2) |
| A-N4 | Batch-1 rollback deletes the working plan.md | fixed | The pre-commit loop never deletes `.bedrock/reorg/plan.md`; `commit.ts --rollback` takes it out of the tree and leaves it on disk, the `git rm --cached` effect (12; batch 1 step 9) |
| A-N5 | No never-push rule | fixed | Owner decision 7 in section 10 (common rules and every batch's commit step), 11.1, 11.2, 12, A.0, A.3 and Appendix C |
| A-N6 | Stale decision references (brain-vault option, header) | fixed | Section 5 cites decision 2 and offers no brain-vault option; the header points to Owner decisions 1-8 |
| A-N7 | Snapshot after fix rounds | fixed | 11.3: a fix round is the next batch number and re-pins `snapshot.ts` from its own export before the STOP gate |
| A-N8 | `## Parts` placement above A2's preamble line | fixed | S2: `## Parts` goes immediately before the first `##` |
| A-N9 | Ledger grouping; missing restore copy | obsolete | No ledger |
| A-N10 | PRESENT blocks in pending notes | obsolete | No fleeting blocks are placed anywhere |
| A-N11 | verify-plan does not check hub sizes | fixed | verify-plan warns at 45 KB and fails at 50 KB for hubs, counting ~150 B per Parts line (S7, A.8); largest hubs: melange-systems ~35 KB with its Map, B2 29.3 KB, C1 27.5 KB, B6 25.7 KB |
| A-N12 | Oversized captures would fail check a | obsolete | Owner decision 1 exempts fleeting notes from check a (A.1) |
| A-N13 | Borderline governance (A8, C5) | fixed | C5: the hub keeps `## Standing design laws and Paul's rulings` (hub 20.3 KB; part `-artifact-family-and-surfaces` 11.1 KB). A8 kept as is: its wiring history marks each superseded item where it stands, which S1 accepts ("marked where they stand") |
| A-N14 | Status-line time vs file time | fixed | Header: revision 2 22:15-22:37 (the file's mtime); revision 3 2026-10-03 23:10 to 2026-10-04 00:03 |
| B-BL1 | Decision 7 not implemented; F1's mentat prose breaks conserve | obsolete | No integration. The F1 prose and the projects/mentat "(RESOLVED ...)" blocker edit are removed; projects/mentat changes only in its `aliases` (8 #11); the stale blocker is recorded for the later fleeting pass (section 7) |
| B-BL2 | B10, C1, C4 separate governing text | fixed | B10: the hub keeps the own text of `## July 2026 audit-run history`. C1: the hub keeps the LobbyView own text (contradiction note, Basics) and `## FEC-as-precognition lane`, so the note and the "rode along" line it corrects (file line 185) share the hub; 6 parts. C4: as A-B3. The review's G-split suggestion is adopted: `verify-plan --s1` lists every marker line for the executor's sign-off (S1, 10, 11.2) |
| B-BL3 | Batch-2 concurrency (dismissals, re-captures, hook output committed) | obsolete | Batch 2 touches no fleeting path; commit.ts refuses fleeting paths |
| B-BL4 | fleetdiff/conserve block model breaks on F3 | obsolete | fleetdiff is not built (A.6); conserve ignores `fleeting/` |
| B-N1 | G-post `--export` lacks `--message`/`--log` (and `--allow-fleeting`) | fixed | 11.2 passes `$MSG` and `$LOG` to the export, so its log.md blob equals the commit's; `--allow-fleeting` no longer exists |
| B-N2 | Restore copy in 7.4 step 5 never taken | obsolete | 7.4 removed |
| B-N3 | Global ", N dismissed" count in the step-7 assertion | obsolete | The `sync --dry-run` assertion is removed |
| B-N4 | Template placeholders become unresolved links | fixed | S4: actor parts copy the parent's `team: ""` (all 7 actor parents have it); section 6: concepts get `related_to: []` |
| B-N5 | S10 known-case list incomplete (melange-systems L363, B5 L473, B10 L151) | fixed | The list is replaced by the detection rule, which flags all three; B10 L151 now stays in the hub and points at two run parts |
| B-N6 | four-pillar restates weights; live-tree-patch -> melange-repo-mirror unsupported | fixed | Section 6: `four-pillar-percentile-blend` is a pointer concept that restates no weight values; the melange-repo-mirror link is dropped (only link-description echo lines mention the cutter) |
| B-N7 | C5 design laws and B5 formula spellings in parts | fixed | C5 as A-N13; B5's hub keeps `## Verbatim formula spellings` (hub 23.7 KB; `-lineage-and-phases` 17.2 KB) |
| B-N8 | Base-blob lines of tracked fleeting notes unproven | obsolete | No fleeting note is deleted |
| B-N9 | No push/pull/fetch ban; batch-1 rollback deletes tracked plan.md | fixed | As A-N5 and A-N4 |
| B-N10 | Oversized captures; G-split regenerates for `## Related Concepts`; brain-vault option | fixed | Captures: decision 1 exempts them from check a. G-split: summary-layer headings added by batch 3 do not count as heading changes (10 batches 4-6 step 1, Appendix D). brain-vault: as A-N6 |
| B-N11 | F1 tagline contradicts its body | obsolete | F1 is untouched in Phase 2; recorded in section 7 for the later fleeting pass |

Coordinator requirements: (1) fleeting machinery removed everywhere (sections 1, 2, 4.1, 4.4 C3, 4.5 R5, 4.8a, 7, 8 #9, 9,
10, 11, 12, A.0-A.6, Appendix B pins 4 and 10, Appendix C) and every count recomputed; (2) S1 fixed in B10, C1, C4, B6 and the
30-note scan below, which found one more violation (B2); (3) throwaway index (A.3) with every batch's rollback step and
section 12 updated; (4) S10 detection rule and zero-flag gate; (5) never-push rule in every batch step list and A.0/A.3;
(6) batch 2 is tiny (5 notes) but stays its own round: merging it into batch 3 would renumber every batch, manifest, K row
and pin row for a one-round gain, and the budget already has R9-R10 in reserve (declined, with this reason); (7) this
changelog, and `verify-plan.ts` re-run: "no problems", 120 parts (A 40, B 44, C 36; 97 topic parts incl. 3 project parts,
23 actor parts), 0 slug clashes, all 30 fingerprints unchanged, 399 marker lines.

Recomputed counts: 120 parts; 205 curated notes at the end (actors 48, concepts 14, discussions 6, people 1, projects 4,
topics 132); 161 leaves; melange-systems Map part rows 96 (82 topic, 14 actor) and mentat 24; snapshot topic count 132 and
fleeting count = the fleeting notes tracked in HEAD (3); 128 new notes for the recall forecast; 7 tools.

**S1 scan (Owner decision 8).** Method: `verify-plan.ts --s1` on the revision-3 tables lists 399 lines holding a marker
(correction, newest wins, superseded, supersedes, READ BEFORE, contradiction, RESOLVED in capitals, "do not use", "replaced
by") with file line, section and destination (output `<SP>/plan/s1-r3.txt`). Each line was read in context and classed as
local (the governing text and every statement it governs share a note), self-contained (a struck claim with its superseding
clause, or a correction quoting its claim), marked in place (the governed statement is struck or labelled where it stands),
or hub-governed (rule 2, with the S5 pointer clause). Counts are HUB / PART lines after the Revision 3 tables; line numbers
are file lines.

| Note | Lines (hub/part) | Result |
|---|---|---|
| A1 mentat-collection | 11/17 | compliant. `-standing-rules` L159/L171 qualify the rules; the conduit rule they supersede (`-july-hardening` L392) is marked in place "[later superseded ...]"; L491 FRAMING CORRECTION quotes the claim; `-cross-verification` L608-L635 use the rule's own name |
| A2 mentat-fec-pipeline | 4/8 | compliant. "API lane superseded Chrome-scrape" (L213, L236): the Chrome engine line in the hub (L172) is marked "later superseded by the API lane"; L356 self-contained |
| A3 mentat-console | 0/1 | compliant (L267 is a peer agreement); no pointer clause |
| A4 mentat-failings | 5/4 | compliant. Hub keeps `## Corrections and superseded statements`; L164 premise correction self-contained; the S3 caps (L120, L126) local |
| A5 mentat-console-ui | 2/2 | compliant. L214 "superseded above" refers to the newer state (L213) in the same `###` |
| A6 ui-redesign-boards | 4/1 | compliant (L162 concerns CSS rules, not note text) |
| A7 agent-tooling | 4/18 | compliant. Codex-lane markers local (L229 governs L154 in the same part; hub L99 self-contained); L400 "How to apply - SUPERSEDED" local |
| A8 codex-executor | 3/9 | compliant. Hub `## Current state (newest wins)` governs the wiring history, whose superseded items are marked in place (L185, L186) |
| A9 refresh-automation | 3/5 | compliant. `## Press facts corrected` (L221) and every claim it corrects (L157 struck, L189, L225-L236) are in `-weekly-refresh-and-tick-runner`; hub L93 self-contained |
| A10 workstation-disk | 5/4 | compliant. Census figures labelled "free-space figures superseded" in place (L150, L152) |
| B1 congress-r-scrapers | 11/19 | compliant. Recency-decay RE-RESTORED and [HISTORY, superseded] in one `###` (L416, L418); prior 17x3 designs labelled PRIOR/SUPERSEDED next to the current one (L202-L244); hub Decisions self-contained |
| B2 psychometrics | 11/15 | **fixed (found by this scan).** Record 3 L275 "Honest correction" corrects Record 2 L230 ("Stress battery ALL GREEN"); Record 5 L315/L317 supersede Record 2 L230 and Record 3 L269: Records 2, 3 and 5 now share `-audit-dependability-and-n-reanchor` (41.4 KB). Record 4 L291/L309 withdraw the Miller & Sutherland exclusion stated in Record 1 L162; Records 1 + 4 would be 50.4 KB (51,618 B, over the limit), so Record 4 stays in the hub (rule 2; hub 29.3 KB). Record 6's RKH and Danish corrections quote the claims they correct. 6 parts -> 4 |
| B3 cu-stance | 8/15 | compliant. The CFPB re-correction (L127-L148) corrects the 07-07 neutral pin, struck in the hub (L99) and marked in the History row (L87); crown = Ally floor (L307) and the immunity it supersedes (L309) share `-press-and-social-display`; L221 local |
| B4 legislative-pillar | 7/12 | compliant. "Corrections to earlier records" (L304-L306) quote the claims; champion immunity superseded (L474, L480) local |
| B5 excel-model-build | 14/6 | compliant. Hub keeps `## Superseded guidance`; the amplifier at L487 is labelled "(superseded 2026-06-27)" and now sits in the hub with `## Verbatim formula spellings` |
| B6 moneyball-workbook | 12/3 | **fixed (coordinator).** History with `### Decisions and superseded rules` in the hub. Standing rules L159 ("apply_stance_guard.py is SUPERSEDED") also governs hub Dev Commands L94, which History L193 covers in the hub; the lineage part's statements (L209, L224) are governed from the hub, so that part carries the pointer clause |
| B7 draft-systems-r-pipeline | 2/7 | compliant. Superseded scripts and prior designs labelled in place (L158, L159, L201, L212) |
| B8 influence-engine | 2/9 | compliant. "Original 2026-07-02 build (provenance; superseded in part ...)" (L174) and "v4 (superseded)" (L201) labelled in place |
| B9 primacy-boards | 5/15 | compliant. Methodology lane whole (L451, L452, L595); "Original branch record (superseded by the deploy above)" (L272) with its deploy in the same part; the floor statements (L187-L199) and "tensor cells replace the floor" (L202) share `-primacy-factor-drift-crown` |
| B10 audits-and-reviews | 6/17 | **fixed (coordinator).** The newest-wins own text (L151) is in the hub. Run-to-run resolutions are local: each run numbers its own findings (Run-4's S2-01/S2-02 at L268/L269 are resolved by Run-4n L295 in the same part); the "8 code fixes" line (L331) is corrected in the same part (L309) and in hub History (L76); the five-lane "UNAPPLIED" is corrected in the same part (L447) |
| C1 data-collection-lanes | 3/4 | **fixed (coordinator).** Contradiction note L225 and Basics L227 (own text) stay in the hub with the FEC-as-precognition section (governed line L185) and History L84; contact-inference L467 local. 7 parts -> 6 |
| C2 staffer-data | 4/7 | compliant. Hub keeps `## Contradictions and corrections` (L441-L450); sorting-lane corrections (L148, L156, L207) govern that lane's own state log; L313 "supersedes every earlier coverage figure": the earlier figures are in the same part and struck in the hub (L445); L370 quotes the prediction it corrects |
| C3 cosponsor-networks | 8/6 | compliant. "SUPERSEDED SAME DAY" (L247) local; hub Decisions self-contained; `## Pillar weights as they appear` in the hub |
| C4 audio-and-speech | 6/13 | **fixed (coordinator).** Decode-defect and NPR corrections (L192, L197) now share a part with the filler rates and venue figures they correct; Ledger corrections (L179-L183) quote their claims (hub L87 struck); "SUPERSEDING UPDATE" (L348) local. 4 parts -> 3 |
| C5 melange-dashboard | 0/1 | compliant (L270 local); design laws now kept in the hub (A-N13); no pointer clause |
| C6 dashboard-ui-evolution | 6/6 | compliant. Taste correction (L254) local and struck in the hub (L100); members lane local |
| C7 melange-fec-pipeline | 2/8 | compliant. L193 struck in place; L224 quotes the claim; "supersedes 'nothing committed'" (L305) names a phrase found nowhere else |
| C8 live-tree-git-drift | 1/6 | compliant. L222 "CORRECTION to the DATA claim in the 2026-07-14 entry" governs L228 in the same part; hub L85 struck |
| C9 rfc-system-of-record | 3/6 | compliant. "Superseded how-to (kept for history)" struck in place (L218-L220); L247 quotes the claim |
| C10 melange-systems | 0/3 | compliant for the split (L137, L266 local; no pointer clause). Observation: the model-facts part (L109) still states the June "workbook writes go through Excel COM" rule, superseded 2026-07-02 in other notes (C9 hub L36, C7 hub L389). The correction never lived in melange-systems, so no split separates it; it stays as is (decision 4) and is listed for the owner |

Other changes in this revision: the frontmatter-metadata reading of decision 4 is stated in the Conventions; part titles and
sizes of the changed tables come from verify-plan; `verify-plan.ts` gained per-note HUB/PART counts under `--s1`.

## Revision 4 changelog

Edited in place from revision 3 (backup of the revision-3 bytes: `PSP/plan/plan-r3-backup.md`). Both round-3 reviews passed
every criterion except one shared blocking issue (A-B1 = B-B1). Every round-3 issue ID from `santa-r3-A.md` (A-) and
`santa-r3-B.md` (B-) is listed with its status and where the fix lives; none is declined. The Owner decisions section is kept
as it was (items 1-12) and items 13-16 are appended verbatim.

| ID | Issue | Status | Where / reason |
|---|---|---|---|
| A-B1 | Batch 6 ran the STOP gate (11.3, which archives HEAD) before its own commit, so the gate tested the batch-5 tree and looped | fixed | Section 10 batches 4-6: step 8 is G-post (11.2) on the batch's `commit.ts --export` tree, batch 6 with `REQ=a,b,c,d,f,g,h,i,j,k` and no pending file, plus the snapshot check on that export once step 9 has pinned the counts; step 10 commits; new step 11 runs 11.3 on the new HEAD, and a failure goes to `commit.ts --rollback --batch 6` or fix batch 7; step 12 is the rollback. 11.3's heading and text say it runs only on a committed HEAD; 11.1 and a section 12 risk row record the order |
| B-B1 | Same issue as A-B1 | fixed | As A-B1 |
| A-N1 | Decision 10 vs check b on fleeting notes | fixed | A.1 exempts fleeting notes from b (and a, c, d) in every gate and lists their unresolved links; section 7, 11.1, the section 12 risk row, A.4, Appendix C, Conventions and section 1 say the same; nothing escalates |
| A-N2 | Decision 11 vs S1 rules 2-3 and the generic S5 pointer; B2 needs a specific pointer | fixed | S1 rules rewritten as decision 11: rule 1 same note (default), rule 2 pointer lines only where rule 1 would pass 50 KB or the owner ruled (B6, B10). The generic pointer is gone; S5 defines explicit pointer lines naming what is corrected and linking the note that holds the correction. Rule-2 cases at plan time: B2 (all record parts, newest-wins; Record 1's part also names Record 4's withdrawal), B5, B6, B10 (3.2 texts updated) |
| A-N3 | A8 compliant only under the heading-label reading | fixed (decision 15) | A8's hub keeps `## Wiring history and superseded statements` with the "Current state (newest wins)" it is governed by: hub 47.6 KB with its Parts line (verify-plan), one part `-incidents` (7.7 KB). Counts recomputed below; a risk row and check `a` watch the hub's ~2.4 KB margin |
| A-N4 | No step produces decision 12's report | fixed (decision 16) | Batch 6 step 9 writes `.bedrock/reorg/stale-statements.md` (format and the known entries: C10 model-facts COM rule, projects/mentat blocker vs F1, F1's tagline vs body, plus the S1 sign-off finds); step 10 commits it; 11.3 checks it is in HEAD; the PR summarizes it |
| A-N5 | `updated_by` not covered by decision 9 | fixed (decision 13) | Conventions and S4 cite decision 13 |
| A-N6 | The export's check h ran after the selftest rewrote `X/index.md` | fixed | 11.2 and 11.3 run `check.ts --vault "$X"` before the selftest |
| A-N7 | Fix rounds had no `REQ` | fixed | Section 10 common rules and 11.3: `REQ=a,b,c,d,f,g,h,i,j,k`, no pending file, STOP gate after the commit |
| A-N8 | Section-name detection only in prose; C4 line 87 missed | fixed | S10 resolver and matcher (heading words or a bold label, "see ..." phrases) with split.ts fixtures, C4 line 87 first; A.7; the prototype's `--positional` now also lists 95 "(see ...)" references |
| A-N9 | Recall forecast gaps: pin 8 competitors, P2b vs S4 family names, pins at split hubs | fixed | Appendix B: pin 8 names A7 `-codex-executor-lane` and A8 `-incidents`; P2b handles an outranking note inside E's family by re-pinning within the family; P4 notes the five split-hub pins (3, 8, 9, 12, 17) |
| A-N10 | Fleeting-only source pairs would fail check f if a capture is dismissed | fixed (decision 14) | A.1 check f enforces a baseline pair only if a curated note held it; the 3 fleeting-only pairs are reported (sections 1, 7, 11.1, 12) |
| A-N11 | Prototypes live in the planner's scratchpad | fixed | Conventions define `PSP` with its absolute path, list the prototypes and give the rebuild fallback; A.8 |
| A-N12 | Counterpart pairs missing | fixed (as optional candidates) | 4.7 adds K12-K25 (the reviewer's events), created by split.ts only when both parts' text names the same memory file or session and both have a free "other" slot, so no planned link is displaced; skips are reported |
| A-N13 | D3 does not link the part that carries its rulings | fixed | D3 is retargeted to C2 `-tenure-adjudication-and-architecture` at batch 6 (4.4 C4, the 4.7 D3 row, the C2 hub link list, worked example 4.8c) |
| A-N14 | Decision 4(c) does not literally name the reciprocal lines | fixed | Conventions: hub Parts lists, part headers and pointer lines, Map sections (including the demoted `## Related *` sections) and the link model's reciprocal lines are new lines under 4(c); conserve passes because no base line disappears |
| B-N1 | Check b on fleeting notes contradicts decision 10 | fixed | As A-N1 |
| B-N2 | Check f depends on 3 pairs held only by tracked fleeting notes | fixed (decision 14) | As A-N10 |
| B-N3 | Appendix B P2 can edit existing notes' titles and summaries | fixed (decision 13) | Appendix B "Allowed fixes": existing notes, split hubs included, only gain aliases; new notes may have title, aliases and summary edited; P3 escalates an existing offender |
| B-N4 | The S10 resolver can mark a cross-part referent "same note" | fixed | S10: automatic marks only when the reference names its referent; everything else is "ask"; an ambiguous flag is never "same note"; the executor signs off automatic marks; fixtures for moneyball-workbook lines 224 and 100 and data-collection line 396 |
| B-N5 | S1 rules 1 and 3 lack decision 11's restriction | fixed | As A-N2; the batches 4-6 step 1 sign-off cites decision 11 and adds `--s1-cross` |
| B-N6 | relink.ts has no pending-splits input | fixed | A.5 `--pending <file>` (refuses to run in batch 3 without it); batch 3 steps 5-6 |
| B-N7 | verify-plan reads an amended table twice; Map demotion status | fixed | The prototype keeps the latest table per id and treats a project's `## Map` (with its demoted `### Related *`) as summary layer; A.8, batches 4-6 step 1, Appendix D |
| B-N8 | Decision 12 has no step | fixed (decision 16) | As A-N4 |
| B-N9 | Nits: header "1-8"; `updated_by`; G-commit index.md wording; log timestamp; `--no-renames`; S5 pointer target; Map demotion | fixed | Header says decisions 1-16; decision 13 covers `updated_by`; G-commit expects the manifest, log.md and index.md only when changed (A.3 stages it only then); `--when` is set once in G-post so the export and commit log blobs match (A.3, 11.2); `--no-renames` on the manifest check (A.3); pointer lines name the section in plain text and link its note (S5; the vault uses no anchors); the Map demotion is 4(c) (Conventions) |

Coordinator requirements: (1) batch 6 reordered and 11.3 updated (A-B1); (2) decisions 10 and 14 applied in every gate,
including check f's sources rule (A.1, 7, 11.1, 12, A.4, Appendix C); (3) S1 rule text follows decision 11, the generic
pointer route is removed, and decision 15 is applied to A8 with its split row and counts; (4) decision 16's step is batch 6
step 9, committed in step 10 and checked in 11.3; (5) Appendix B P2, P2b and P3 follow decision 13; (6) the S10 resolver
flags any reference it is unsure of, and an ambiguous flag is never "same note"; (7) relink.ts `--pending`, the verify-plan
latest-table rule, the remaining nits, and the header now reads "decisions 1-16"; (8) this changelog, and `verify-plan.ts`
re-run.

Recomputed counts (A8 now 1 part instead of 2): 119 parts (A 39, B 44, C 36; 97 topic parts incl. 3 project parts, 22
actor parts); 204 curated notes at the end (actors 47 = 25 + 22, concepts 14, discussions 6, people 1, projects 4, topics
132 = 35 + 97); 160 leaves; melange-systems Map part rows 95 (82 topic, 13 actor) and mentat 24; snapshot types actor 47,
concept 14, discussion 6, person 1, project 4, topic 132, team 0, fleeting = the 3 tracked in HEAD; 127 new notes; 7 tools.
Batch 4 creates 39 parts.

verify-plan (prototype at `PSP/plan/verify-plan.ts`, revision 4): "no problems"; 119 parts; 0 slug duplicates or clashes;
all 30 fingerprints unchanged; one warning, A8's hub at 47.6 KB (over the 45 KB target, under 50 KB, decision 15); 399 S1
marker lines (A8 now 12 hub / 0 part lines); 524 positional trigger lines and 95 "(see ...)" references; `--s1-cross` lists
227 candidates, mostly numeric or generic-word token matches (sampled: B1 line 123's graded-score lines stay true as a
parallel column; B3 line 99's hits are the re-correction itself; B6's lineage hits are inside the B6 rule-2 pointer), kept
as a sign-off aid for the executor, not as verdicts.

## Owner decisions (2026-10-03, binding for all batches; Revision 3)
1. Fleeting notes are OUT of Phase 2 scope. Every note in fleeting/, now and later, stays untouched as intake ("awaiting organization"). No batch edits, deletes, moves, or stages a fleeting path. check.ts exempts all of fleeting/ from the one-way (c), zero-incoming (d), and size (a) criteria and reports those notes separately. Fleeting notes will be organized in a later, separate pass.
2. No new `projects/brain-vault` index. Project-less notes take incoming links from actors or people/paul-goff.
3. Healthcheck scope: a missing graphify-out is N/A, because this vault uses .bedrock/graph. The 15-day "old content" rule is informational.
4. Content is never deleted. Splits move text verbatim. The only allowed wording changes are:
   (a) wikilinks converted to plain text by link trimming;
   (b) positional references that would cross parts after a split, rewritten as explicit [[part]] links, each one logged;
   (c) new hub summaries, Map sections, and part headers or frontmatter.
   Existing lines are never otherwise rewritten.
5. Accepted: the 50 KB size limit, hub/leaf roles from folder plus `part_of` (no `hub: true`), and the extra strict checks in check.ts.
6. plan.md is committed with batch 1, together with the tooling.
7. Never push during Phase 2; ignore `.bedrock/config.json`'s commit-push-pr setting. Batches commit locally on the branch only. The orchestrator pushes the branch and opens the single PR after STOP.
8. Rule S1: a correction, "newest wins" note, or superseding decision always stays in the same note as the text it governs. This holds even if it pushes a part over the 45 KB target, but never over 50 KB.
9. Frontmatter: decision 4 governs body text only. Frontmatter metadata may be edited where the plan requires it: aliases (the alias fix), domain tags, updated_at, part_of, relation/link fields trimmed by the link model, and `sources:`. Hubs keep every pair; parts may list subsets. Never remove a sources pair from the vault.
10. The fleeting exemption also covers check b (unresolved links). Broken links in fleeting notes are reported separately and never block STOP. Captures are never edited.
11. S1 is satisfied in either of two ways:
    (a) the correction stays in the same note as the text it governs; or
    (b) the governed part's header carries an explicit pointer line linking to the correction, which decision 4(c) allows.
    Option (b) applies only where keeping them together would exceed 50 KB, or where an owner ruling keeps the correction in the hub (B6, B10).
12. Stale statements that predate this work and fall outside the split work (for example, C10's June Excel COM rule) are out of Phase 2 scope. List them in the final report for a later pass.
13. Decision 9 also allows `updated_by` edits and alias additions; aliases may be added to support recall. The titles and summaries of existing notes are never edited. New hubs and parts get their own.
14. Fleeting notes: decision 10 applies in every gate. Sources-invariant pairs held only by fleeting notes are reported, not enforced.
15. A8: the wiring history stays in the hub, together with the text it governs. The hub stays under 50 KB.
16. The final batch writes `.bedrock/reorg/stale-statements.md`, listing the stale statements that predate this work (decision 12), and commits it. The PR summarizes it.
