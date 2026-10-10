---
type: fleeting
title: "Reasoning in fable code in opus (2026-09-16)"
aliases: ["reasoning-in-fable-code-in-opus-2026-09-16"]
source: "session"
captured_at: 2026-10-07
created_at: 2026-10-07
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "feedback"
updates:
  - "[[2026-07-working-agreement-agent-orchestration-rules]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reasoning-in-fable-code-in-opus-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-09", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reasoning-in-fable-code-in-opus-2026-09-16.md", sha256: "6c9b10f5ad8186c055f428afec788c227e42a5760704dcb101c4e649a9b77a00"}
updated_at: 2026-10-09
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Reasoning in fable code in opus (2026-09-16)

> Paul 2026-09-16 at the start of S5 - "design the route of implementation with Fable and all reasoning is done in Fable, code should always be in Opus or Fable"; model tiering rule for lanes

## Content

Paul, 2026-09-16, when S5 of the mentat-failings lane started:
"Make sure you design the route of implementation with Fable and all reasoning is done
in Fable, code should always be in Opus or Fable."

**Why:** In S4, Sonnet executors twice refused the write path and had to be re-dispatched
(DE-022), a Haiku verifier skipped its polling and payload instructions, and three
subagent reviews missed a live 400 that the Fable review caught. Reasoning and design
delegated downward cost time and quality; only the Opus architect delivered code
without incident.

**How to apply:**
- Design, phase plan, trade-offs, rulings, reviews, and every judgment call: the session
  model (Fable), inline. Never delegate a design or an analysis to a subagent.
- Code (new modules, edits, tests, fixes): the Opus architect (`fable-baton:architect`)
  with the full brief and the write path in its FIRST prompt, or Fable itself for small
  or high-risk edits. Never Sonnet executors, never Haiku, for code.
- Haiku scouts may still GATHER facts (read files, run read-only greps and git queries)
  because that is not reasoning; verify their census adversarially
  (`scout-census-traps-2026-09-13`) and never let them draw conclusions.
- Verification runs that need judgment (acceptance polling, exact payloads) go to Opus or
  Fable; Haiku only for pure read-and-report checks.
**UPDATE 2026-09-24 (graph-ui-quirks session, running Opus 5.5):** I noted that his rule says
reasoning in Fable and offered a model switch; Paul answered "Reasoning stays in Opus". So when
the session model is Opus, design/reasoning/review stay in the session model — do not ask him
to switch to Fable. The code rule is unchanged: Opus architect (or the session model), never
Sonnet executors or Haiku, for code.
**UPDATE 2026-10-01 (CU-geography session, running Opus 5.5) — SUPERSEDES the code rule for builds:**
- Paul's opening parameter was "Reason in Opus, Code in Sonnet 5.5". Later he asked: "Are we using Sonnet 5.5 on extra to build? Opus should only reason".
- So now: build and code agents run on Sonnet 5.5 at effort xhigh (workflow opts model 'sonnet', effort 'xhigh'). Opus handles only reasoning, design, analysis, review and judgment.
- I had let workflow agents inherit Opus. Always set the model explicitly on build agents.
**UPDATE 2026-10-01 (forecast integrity lane):** Paul: "you should be coding only in Sonnet 5.5". This covers
ANALYSIS and backtest code too, not just builds: an executor that cites the old "never Sonnet" rule and hands
code to Opus sub-agents is violating it. Opus = reasoning, design, review, verification by reading/running
checks only. Tell every executor in its FIRST prompt: write all code yourself (Sonnet); do not spawn Opus coders.
**UPDATE 2026-10-07 (telecom vs CU lobbying session, running Opus 5.5) — CURRENT THREE-TIER RULE, supersedes the above where they differ:**
Paul, verbatim: "Model Usage: 1. Reasoning: Opus 5.5 2. Code Building: Sonnet 5.5 3. Classification, Document Creation, and Extraction: Haiku 5.5".
- Reasoning, design, review, judgment: the session model (Opus 5.5).
- Code building (any script, module, edit, test, analysis code): Sonnet 5.5 agents (model 'sonnet').
- Classification (tagging entities and rows), document creation (briefs, rosters, extraction documents) and data extraction (pulling or aggregating data from existing files): Haiku agents (model 'haiku'). There is no Haiku 5.5; the newest Haiku is 4.5, and model 'haiku' resolves to it. I told Paul this on 2026-10-07 and he still asked for "Haiku 5.5, Extra", so use 'haiku'.
- This lifts the old "never Haiku" bar for extraction and document work only. Code still goes to Sonnet. Verify Haiku output before reporting it (`scout-census-traps-2026-09-13`): on 2026-10-07 a Haiku extraction run computed an outside-firm-income column wrongly.
**UPDATE 2026-10-09 (forecasting-section session):** Paul reaffirmed it: "Code in Sonnet, extract in Haiku, reason in Opus". ~~There is no Haiku 5.5~~ — superseded 2026-10-09: the environment now lists Haiku 5.5 (claude-haiku-5-5), and model 'haiku' is the extraction tier.
**UPDATE 2026-10-09 evening (research-vault session) — VERIFICATION moves to Haiku:** mid-run Paul asked "Why are these being verified in opus? they should be verified in haiku 5.5 which is faster, don't kill those ones let them finish on the one they are currently on, the rest should be haiku". So adversarial verify passes (re-check a claim against source text and code) run on model 'haiku'; Opus keeps reasoning/relating/synthesis. Changing tiers mid-run: never kill in-flight agents; drain them, then route the remainder. He also wants maximum parallelism ("as fast as this computer can handle") — see `research-vault-lane-2026-10-09` for the sharding mechanics.
Related: `review-in-fable-directive-2026-09-16`, `go-faster-directive-2026-09-16`,
`mentat-failings-lane-s4-2026-09-16`.

## Possible Connections

- [[2026-07-working-agreement-agent-orchestration-rules]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-09 from the Claude Code memory file `reasoning-in-fable-code-in-opus-2026-09-16.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-07-working-agreement-agent-orchestration-rules]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
