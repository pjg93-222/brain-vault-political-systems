---
type: topic
title: "Agent orchestration and model tiering rules"
aliases: ["Agent orchestration and model tiering rules"]
category: "working-agreement"
status: "open"
people:
  - "[[paul-goff]]"
actors:
  - "claude-code-harness"
  - "[[codex-executor]]"
  - "glass-box"
  - "[[metaloop]]"
  - "runpod-pod"
objective: "Standing feedback rules on how agents are orchestrated and which models do what: two model-tiering rules with separate scopes (pipeline API calls vs agent coding/orchestration), inline review, pacing, ultracode scope, universal lane laws, GLASS BOX emission, RunPod pod usage, no AI supervision of long jobs, SendMessage hazards, and networked Codex for ambiguous company identities."
created_at: 2026-07-09
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reasoning-in-fable-code-in-opus-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reasoning-in-fable-code-in-opus-2026-09-16.md", sha256: "6c9b10f5ad8186c055f428afec788c227e42a5760704dcb101c4e649a9b77a00"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pod-for-memory-heavy-tasks-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pod-for-memory-heavy-tasks-2026-09-30.md", sha256: "6576d3b038381faafae20d7fd2fa7a0d9c8fcd6684fda4ce768fc0f22bbe9388"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/sendmessage-workflow-agent-duplicates-2026-09-24.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\sendmessage-workflow-agent-duplicates-2026-09-24.md", sha256: "19c341994124a526ee1d0facc683ce13bea8a2144ec1bebfc21fb2ab7b82ae79"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/go-faster-directive-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\go-faster-directive-2026-09-16.md", sha256: "45050191db65b876f6eccf01b2cb7ec1ccb5799f9e2fa51c6d4913f5248ea80c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/review-in-fable-directive-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\review-in-fable-directive-2026-09-16.md", sha256: "e8e62bd28855c703d79ee0050d8434f5b897646d481d2c1cf82d5b086c5aead8"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/codex-overnight-poll-loop-burn-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\codex-overnight-poll-loop-burn-2026-09-13.md", sha256: "f4674518cac30842e12c700511711b0e769e6f69c91a3b784592b5413423dc5e"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/ultracode-orchestration-standing-2026-08-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\ultracode-orchestration-standing-2026-08-18.md", sha256: "922b5c2304b4f9513f6d580beb5a7b271a4509c30a7c8fd8a5182bff341a5685"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/universal-lane-laws-2026-08-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\universal-lane-laws-2026-08-09.md", sha256: "797a1d0065036dc8507e051f4dcbd3a26386d338602f9ffc27dad5404f0e49b0"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/glassbox-everything-rule-2026-07-27.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\glassbox-everything-rule-2026-07-27.md", sha256: "d803cdacd32e6f6d3fbac015ed401fa5898e1bf27a82dafa6d237bad6a85b787"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/codex-web-research-for-company-ambiguity.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\codex-web-research-for-company-ambiguity.md", sha256: "ab3b471b15379353c6b6c8d004188016132018717f196f4a91b196091e559739"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/fable-paragraphs-only.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\fable-paragraphs-only.md", sha256: "608516924b815a01ab65ca51db3c117932f1ba61d1873c84b605fd038aa58ff4"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-03-35774e/memory/windows-hook-shell-git-bash.md", type: "claude-memory", synced_at: "2026-10-04", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-006ff0a7-6dcc-4dda-b723-6b48b4193c76-c655b422-2b14-405c-8ced-bbf2cd9c6822-scratch-2026-10-03-35774e\\memory\\windows-hook-shell-git-bash.md", sha256: "a239f75054598a3e26fa33f532b3a325b6501c3277add53d25908a2055522138"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/work-in-parallel-no-waiting-2026-10-08.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\work-in-parallel-no-waiting-2026-10-08.md", sha256: "27b0a55f7dc90de655561300c07c442fa513773357f6784e0cd5598e280b7451"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-09-e85ae3/memory/model-tiering-code-read-reason.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-AppData-Roaming-Claude-scratch-workspaces-598863e3-c9bb-4c63-b007-0dd957c20364-bbac54bf-6633-4cf3-b205-e25dba48458c-scratch-2026-10-09-e85ae3\\memory\\model-tiering-code-read-reason.md", sha256: "146a3b0165655bf43cbe3a3acf2bac082d61eedf5a00f5fc0524cb6223cbc999"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/topic", "status/open", "domain/agent-ops", "category/working-agreement"]
---

# Agent orchestration and model tiering rules

> Working agreement (feedback rules from Paul, 2026-07-09 to 2026-10-01): which model does what, how lanes are orchestrated, what must emit to the GLASS BOX, when RAM-heavy work moves to the pod, and which orchestration moves waste money or duplicate writers. Newest rule wins inside each scope; older versions are kept as dated struck-through bullets.

## Parts

- [[2026-07-working-agreement-agent-orchestration-rules-lane-laws-and-long-jobs]] — Standing orchestration rules other than model tiering, review, pace and the pod: ultracode for orchestration only, the universal lane laws, GLASS BOX emission, never supervising a long job from an AI turn, never messaging a running workflow agent, and networked Codex for ambiguous company identity.

## Context

- Two model-tiering rules coexist because they govern different things. **Scope (a), pipeline API calls** (what the Melange pipeline sends to the Anthropic API): Fable only for the 533 per-member narrative paragraphs, Haiku 4.5 everywhere else by default, escalate to Sonnet 5 (never back to Fable) if Haiku is remarkably worse. Source: `fable-paragraphs-only` (2026-07-09). **Scope (b), agent coding and orchestration** (which model the sessions and subagents run): newest rule governs, and as of 2026-10-01 code is written in Sonnet 5.5 at effort xhigh while Opus only reasons, designs, reviews and verifies; the earlier versions are dated bullets below. Newest wins only inside each scope; (a) is not superseded by (b).
- Correction 2026-10-10 (memory `reasoning-in-fable-code-in-opus-2026-09-16`, last modified 2026-10-09): the "as of 2026-10-01" rule in the previous bullet is no longer the newest. Since 2026-10-07 scope (b) is a three-tier rule: reasoning, design, review and judgment in Opus 5.5 (the session model); code building in Sonnet 5.5; classification, document creation and extraction in Haiku. Since the evening of 2026-10-09 adversarial verify passes also run on Haiku. Details are in the Decisions and the scope (b) section.
- Names used in the sources: the "session model" was called Fable in mid-September (Paul: "all reasoning is done in Fable"); by 2026-09-24 the session ran Opus 5.5 ("Reasoning stays in Opus"). The sub-rules below keep the source wording.
- The rules touch the Claude Code harness (session settings, workflows, SendMessage, the GateGuard hook), the [[codex-executor]] lane and the [[metaloop]] orchestration (UNIVERSAL LANE LAWS), the GLASS BOX event stream event stream, and the RunPod math pod. The narrative paragraphs rule originates in the work behind Member approach briefs and narratives; the poll-loop burn relates to Refresh automation reliability. All rules are Paul's ([[paul-goff]]).
- Related memories (not vault entities): `reasoning-in-fable-code-in-opus-2026-09-16`, `pod-for-memory-heavy-tasks-2026-09-30`, `sendmessage-workflow-agent-duplicates-2026-09-24`, `go-faster-directive-2026-09-16`, `review-in-fable-directive-2026-09-16`, `codex-overnight-poll-loop-burn-2026-09-13`, `ultracode-orchestration-standing-2026-08-18`, `universal-lane-laws-2026-08-09`, `glassbox-everything-rule-2026-07-27`, `codex-web-research-for-company-ambiguity`, `fable-paragraphs-only`, `mentat-failings-lane-s4-2026-09-16`, `ui-finalize-after-reboot-2026-09-23`, `luna-stratified-scaling-review-2026-09-29`, `codex-executor-lane-2026-07-18`, `glassbox-lane-lock-hang-2026-08-06`, `moneyball-big5-campaign`, `legfix5-recollection-lane-2026-07-27`, `desk-media-footprint-2026-07-16`, `mentat-roster-and-culling-rules-2026-07-19`, `ask-before-substantive-changes`, `press-classification-user-domain`, `scout-census-traps-2026-09-13`.

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| Claude Code harness | Harness traps: MEMORY.md loading contract, heredoc mangling, SendMessage duplicates, GateGuard amend block, poppler PATH. |
| [[codex-executor]] | Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17 |
| GLASS BOX event stream | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| [[metaloop]] | /metaloop (shipped @46b17b9): Fable decomposes/reviews, Codex executes, Gemini perceives, Grok critiques; UNIVERSAL LANE LAWS @86ba6ef. |
| RunPod math pod | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

## Related Topics

- Member approach briefs and narratives - Per-member Suggested-approach briefs (Fable 533 calls; Sonnet lane): Tier 2 style, acoustics in, no percentiles, validator traps.
- Refresh automation reliability - Weekly Melange refresh has not completed since 2026-07-19; audit, rulings, tick-runner redesign, daily-chain blockers, Codex poll-loop burn

## History

| Date | Event |
|---|---|
| 2026-07-09 | Paul, "stated firmly ... all caps": Fable only for the per-member paragraphs (~533 calls), Haiku 4.5 for everything else; escalate to Sonnet 5, not Fable. Trigger: a Fable call per audio clip (~3,000 clips, ~$120-200). |
| 2026-07-19 | Paul: "if you are ever ambigous on a company just check via codex on the internet." (company-identity ambiguity rule). |
| 2026-07-27 | Paul's STANDING RULE: everything runs through the Glass Box. Triggered by two invisible-work failures the same day. |
| 2026-08-09 | UNIVERSAL LANE LAWS (one agent, four lanes): Paul "apply all, make sure it stays intact over multiple tasks and agents"; canonical text in `.claude/commands/metaloop.md` at `86ba6ef`; proven live the same day; repairs, augmentation Phases 0+1 (2026-08-10) and roadmap through Phase 5 (2026-08-11). |
| 2026-08-18 | Paul's STANDING ruling: ultracode overrides the "do not use workflows/AgentTool unless requested" session line, for orchestration only. |
| 2026-09-12/13 | Codex thread `01a098ce-d021-7d42-9383-5affc2a0bdfb` burned the whole weekly Codex quota babysitting a job (2026-09-12 23:29 to 2026-09-13 10:58 local). Repair lane the afternoon of 2026-09-13. |
| 2026-09-16 | Paul at the start of lane S5: reasoning in Fable, code in Opus or Fable. Same day: "When possible it needs to go faster." and "You should review in Fable." |
| 2026-09-24 | Session running Opus 5.5: Paul "Reasoning stays in Opus". Same day: SendMessage to running workflow subagents found to spawn duplicates (session 5ab381bb, r5 fix run). |
| 2026-09-30 | Paul: RAM/memory-heavy tasks go to the Pod, "go hard on it". Same evening superseded for the CU-geography row-ranking lane: "Move on out of the pod". |
| 2026-10-01 | CU-geography session: "Reason in Opus, Code in Sonnet 5.5"; later "Opus should only reason". Forecast integrity lane: "you should be coding only in Sonnet 5.5". |
| 2026-10-07 | Telecom vs CU lobbying session (Opus 5.5): Paul's three-tier rule, "Model Usage: 1. Reasoning: Opus 5.5 2. Code Building: Sonnet 5.5 3. Classification, Document Creation, and Extraction: Haiku 5.5". |
| 2026-10-08 | Terrier build: Paul, "Nothing should be waiting on each other, keep going and work in parallel." |
| 2026-10-09 | Forecasting-section session: Paul reaffirmed "Code in Sonnet, extract in Haiku, reason in Opus"; the environment now lists Haiku 5.5. Terrier walk-list session (scratch workspace): route coding to Sonnet 5.5, reading, extraction and discovery to Haiku 5.5, reasoning, diagnosis and review to Opus 5.5, the "fast" variants of each. Evening, research-vault session: adversarial verify passes move to Haiku 5.5. |

## Decisions

Current rules (newest wins within scope), then superseded versions as dated struck-through bullets. Full rule text, **Why** and **How to apply** are in the Rules sections below and in [[2026-07-working-agreement-agent-orchestration-rules-lane-laws-and-long-jobs]].

- **Model tiering, scope (a) pipeline API calls (2026-07-09, still in force):** Fable (`claude-fable-5`) only for the ~533 per-member "Suggested approach" paragraphs; every other LLM step uses Haiku 4.5 (`claude-haiku-4-5`); escalate a mechanical task to Sonnet 5 (`claude-sonnet-5`) only if Haiku does remarkably worse, never back to Fable. Justification: cost discipline ($50/1M out for Fable).
- **Model tiering, scope (b) agent coding/orchestration (current, 2026-10-07, extended 2026-10-09):** three tiers, Paul verbatim 2026-10-07: "Model Usage: 1. Reasoning: Opus 5.5 2. Code Building: Sonnet 5.5 3. Classification, Document Creation, and Extraction: Haiku 5.5". Reasoning, design, review and judgment stay in the session model (Opus 5.5); code building (any script, module, edit, test or analysis code) goes to Sonnet 5.5 agents (model 'sonnet'); classification (tagging entities and rows), document creation (briefs, rosters, extraction documents) and data extraction (pulling or aggregating data from existing files) go to Haiku agents (model 'haiku'). Reaffirmed 2026-10-09 ("Code in Sonnet, extract in Haiku, reason in Opus"). From the evening of 2026-10-09, adversarial verify passes (re-checking a claim against source text and code) also run on Haiku; Opus keeps reasoning, relating and synthesis. Justification: Paul's own words; full text in the scope (b) section.
- **Model tiering, scope (b), the 2026-10-01 version (superseded 2026-10-07 where they differ: extraction, classification and document work, and from 2026-10-09 verify passes, now go to Haiku; the Sonnet coding half still stands):** code, including analysis and backtest code, is written in Sonnet 5.5 at effort xhigh (workflow opts model 'sonnet', effort 'xhigh'); Opus only reasons, designs, analyses, reviews and verifies by reading/running checks; set the model explicitly on build agents; tell every executor in its FIRST prompt to write all code itself and not spawn Opus coders. Justification: Paul's own words ("Reason in Opus, Code in Sonnet 5.5"; "Opus should only reason"; "you should be coding only in Sonnet 5.5").
  - ~~Design and all reasoning in Fable, inline; code always in Opus (the `fable-baton:architect`) or Fable; never Sonnet executors, never Haiku, for code~~ (2026-09-16) - the code half superseded for builds 2026-10-01 (and extended to analysis/backtest code the same day); kept because it explains the S4/S5-era lane artifacts.
  - ~~"Reasoning is done in Fable"; offer a model switch~~ (2026-09-16) - modified 2026-09-24: when the session model is Opus, design/reasoning/review stay in the session model and the agent must not ask Paul to switch to Fable.
  - ~~Implementation flows Fable spec -> coordinator's Codex dispatch (xhigh) -> Fable review; only Codex touches the tree (law 5 "one writer")~~ (2026-08-09/2026-08-18) - apparently superseded for agent coding by the 2026-09-16 Opus-architect rule and then the 2026-10-01 Sonnet rule (an inferred ordering; no source states the supersession in so many words). Still the canonical text of the UNIVERSAL LANE LAWS in `commands/metaloop.md`; see Contradictions below.
- **Review (2026-09-16):** code reviews are done inline by the session model, not delegated to reviewer subagents; delegate only mechanical validation runs. Overrides the fable-baton delegation policy for review work.
- **Pacing (2026-09-16):** "When possible it needs to go faster."; six concrete time-sink fixes below.
- **No waiting chains (2026-10-08):** "Nothing should be waiting on each other, keep going and work in parallel." Code lanes merge as soon as their own gates pass; later steps tolerate missing pieces; only CPU/RAM-heavy steps take turns on the laptop. Rule text below.
- **Ultracode (2026-08-18):** when ON it overrides the "no workflows/AgentTool unless requested" line; ORCHESTRATION only; the ask-first APPLY gate and the subagent read-only contract still bind.
- **Lane laws (2026-08-09, amended through 2026-08-11):** seven laws plus LAW 8 (VERBATIM ARTIFACTS, 2026-08-10); TOTAL LANE LOSS = HARD STOP until Paul.
- **GLASS BOX (2026-07-27):** every process emits to `C:\Users\pgoff\.claude\glassbox\events`; nothing runs invisibly.
- **Pod rule, newest (2026-09-30 evening):** "Move on out of the pod" for the CU-geography row-ranking lane (built and tested locally); ask Paul before using any pod again; "never stop or terminate the pod without Paul" still stands. CU-geography lane works locally and asks before using the pod.
  - ~~"For tasks pertaining to Memory and RAM, shift over to the Pod, and go hard on it, meaning memory and Ram on there are not a constraint"~~ (2026-09-30, earlier the same day) - superseded for the CU-geography row-ranking lane by "Move on out of the pod" the same evening; the general approved-data-scope, detached-launch and never-stop rules were not retracted. Kept because it explains the pod addresses and the Luna modelling rounds.
- **Long jobs (2026-09-13):** never supervise a long-running job from an AI turn; launch detached and use one background wait; no Codex heartbeat automations as a scheduler.
- **SendMessage (2026-09-24):** never SendMessage a running workflow subagent (it resumes a duplicate that writes the same files).
- **Company ambiguity (2026-07-19):** dispatch Codex with network access to research; do not guess, do not default to asking Paul.

## Next Steps

- [ ] For any pod use after 2026-09-30: ask Paul first (the earlier "go hard on the pod" order no longer covers the CU-geography lane).
- [ ] Put the write path and model/coding instructions (write all code yourself; Sonnet; no Opus coders) in the FIRST prompt of every build agent.
- [ ] Flag, do not flip, the three PAUSED Codex heartbeat automations if any becomes ACTIVE (see rule 8 in [[2026-07-working-agreement-agent-orchestration-rules-lane-laws-and-long-jobs]]).
- [ ] Paul's open call from the poll-loop repair lane: admissions `transport claude-cli`, press backlog budget/fold, committing the untracked subsystem, retry task `ExecutionTimeLimit PT0S` (listed under rule 8 in [[2026-07-working-agreement-agent-orchestration-rules-lane-laws-and-long-jobs]]).

## Rules

### Model tiering scope (a): pipeline API calls (`fable-paragraphs-only`, Paul 2026-07-09)

- **Rule:** HARD cost rule. **Fable (`claude-fable-5`, $50/1M out) is ONLY for the per-member "Suggested approach" narrative paragraphs**, one call per member (~533 total). **Every other LLM step in the pipeline uses Haiku 4.5** (`claude-haiku-4-5`, ~10x cheaper). Mechanical tasks (audio-clip speaker verification from captions, classification, extraction, labeling) are Haiku, NEVER Fable. Paul stated it firmly, all caps, 2026-07-09.
- **Why:** Paul caught the agent firing a Fable call per audio clip (~3,000 clips, about $120-200) for a mechanical "is X the solo speaker?" classification. That is a fortune for a task Haiku does equally well. Fable's quality only earns its price on the generative narrative task, and even then it is one call per member, never per-item in an inner loop.
- **How to apply:** before ANY `messages.create`, ask "is this generating the member narrative paragraphs?" If no, use `claude-haiku-4-5`. Never default to Fable for per-item loops. Per-clip / per-row / per-item work is always the cheap model. Context: `moneyball-big5-campaign`; the paragraphs themselves are the member approach briefs (Member approach briefs and narratives).
- **Escalation rule (Paul, 2026-07-09):** if Haiku does *remarkably worse* than Fable on a mechanical task (validate by head-to-head agreement on a sample, adjudicating disagreements against the actual transcript), escalate that task to **Sonnet 5** (`claude-sonnet-5`), NOT back to Fable. Order for mechanical work: Haiku -> Sonnet if needed. Fable stays paragraphs-only regardless.

### Model tiering scope (b): agent coding and orchestration (`reasoning-in-fable-code-in-opus-2026-09-16`, file created 2026-09-16, last modified 2026-10-01)

Version history (newest governs). The memory was modified again on 2026-10-09; the three bullets dated 2026-10-07 and 2026-10-09 were added on 2026-10-10 and govern where they differ from the 2026-10-01 bullets.

- **UPDATE 2026-10-09 evening (research-vault session), VERIFICATION moves to Haiku:** mid-run Paul asked "Why are these being verified in opus? they should be verified in haiku 5.5 which is faster, don't kill those ones let them finish on the one they are currently on, the rest should be haiku". So adversarial verify passes (re-check a claim against source text and code) run on model 'haiku'; Opus keeps reasoning, relating and synthesis. Changing tiers mid-run: never kill in-flight agents; drain them, then route the remainder. He also wants maximum parallelism ("as fast as this computer can handle"); the sharding mechanics are in the research vault project note (Build record and lessons).
- **UPDATE 2026-10-09 (forecasting-section session):** Paul reaffirmed it: "Code in Sonnet, extract in Haiku, reason in Opus". The environment now lists Haiku 5.5 (`claude-haiku-5-5`), and model 'haiku' is the extraction tier (this supersedes the 2026-10-07 remark below that no Haiku 5.5 exists). The same day, in a Terrier walk-list session (scratch workspace `scratch-2026-10-09-e85ae3`, memory `model-tiering-code-read-reason`), the user routed subagent work by kind: coding and implementation in Sonnet 5.5, reading, extraction and discovery in Haiku 5.5, reasoning, diagnosis and review in Opus 5.5, asking for the "fast" variants of each, to cut cost and latency. How to apply there: pass `model: "sonnet"` for executor-style coding agents, `model: "haiku"` for scout and extract agents, `model: "opus"` for diagnosis, design and review. Fast mode is a session toggle (`/fast`) and cannot be set per subagent; say so if it matters.
- **UPDATE 2026-10-07 (telecom vs CU lobbying session, running Opus 5.5), CURRENT THREE-TIER RULE, supersedes the bullets below where they differ:** Paul, verbatim: "Model Usage: 1. Reasoning: Opus 5.5 2. Code Building: Sonnet 5.5 3. Classification, Document Creation, and Extraction: Haiku 5.5".
  - Reasoning, design, review, judgment: the session model (Opus 5.5).
  - Code building (any script, module, edit, test, analysis code): Sonnet 5.5 agents (model 'sonnet').
  - Classification (tagging entities and rows), document creation (briefs, rosters, extraction documents) and data extraction (pulling or aggregating data from existing files): Haiku agents (model 'haiku'). ~~There is no Haiku 5.5; the newest Haiku is 4.5, and model 'haiku' resolves to it. The agent told Paul this on 2026-10-07 and he still asked for "Haiku 5.5, Extra", so use 'haiku'.~~ Superseded 2026-10-09: the environment now lists Haiku 5.5 (see the bullet above).
  - This lifts the old "never Haiku" bar for extraction and document work only. Code still goes to Sonnet. Verify Haiku output before reporting it (`scout-census-traps-2026-09-13`): on 2026-10-07 a Haiku extraction run computed an outside-firm-income column wrongly.
- **CURRENT, 2026-10-01 (forecast integrity lane)** (no longer the newest version: see the 2026-10-07 and 2026-10-09 bullets above; its Sonnet coding rule still stands): Paul: "you should be coding only in Sonnet 5.5". This covers ANALYSIS and backtest code too, not just builds: an executor that cites the old "never Sonnet" rule and hands code to Opus sub-agents is violating it. Opus = reasoning, design, review, verification by reading/running checks only. Tell every executor in its FIRST prompt: write all code yourself (Sonnet); do not spawn Opus coders.
- **2026-10-01 (CU-geography session, running Opus 5.5), SUPERSEDES the code rule for builds:** Paul's opening parameter was "Reason in Opus, Code in Sonnet 5.5". Later he asked: "Are we using Sonnet 5.5 on extra to build? Opus should only reason". So now: build and code agents run on Sonnet 5.5 at effort xhigh (workflow opts model 'sonnet', effort 'xhigh'). Opus handles only reasoning, design, analysis, review and judgment. The agent had let workflow agents inherit Opus; always set the model explicitly on build agents.
- **2026-09-24 UPDATE (graph-ui-quirks session, running Opus 5.5):** the agent noted that his rule says reasoning in Fable and offered a model switch; Paul answered "Reasoning stays in Opus". So when the session model is Opus, design/reasoning/review stay in the session model: do not ask him to switch to Fable. (The code rule at that date was unchanged: Opus architect or the session model, never Sonnet executors or Haiku, for code; superseded by the 2026-10-01 bullets above.)
- ~~**2026-09-16 (start of S5 of the mentat-failings lane), original rule.** Paul: "Make sure you design the route of implementation with Fable and all reasoning is done in Fable, code should always be in Opus or Fable."~~ Original **Why:** in S4, Sonnet executors twice refused the write path and had to be re-dispatched (DE-022), a Haiku verifier skipped its polling and payload instructions, and three subagent reviews missed a live 400 that the Fable review caught. Reasoning and design delegated downward cost time and quality; only the Opus architect delivered code without incident. Original **How to apply:**
  - ~~Design, phase plan, trade-offs, rulings, reviews, and every judgment call: the session model (Fable), inline. Never delegate a design or an analysis to a subagent.~~ (reasoning half: still true in spirit, see the 2026-09-24 and 2026-10-01 bullets.)
  - ~~Code (new modules, edits, tests, fixes): the Opus architect (`fable-baton:architect`) with the full brief and the write path in its FIRST prompt, or Fable itself for small or high-risk edits. Never Sonnet executors, never Haiku, for code.~~ (superseded 2026-10-01.)
  - Haiku scouts may still GATHER facts (read files, run read-only greps and git queries) because that is not reasoning; verify their census adversarially (`scout-census-traps-2026-09-13`) and never let them draw conclusions.
  - Verification runs that need judgment (acceptance polling, exact payloads) go to Opus or Fable; Haiku only for pure read-and-report checks.
- Related: `review-in-fable-directive-2026-09-16`, `go-faster-directive-2026-09-16`, `mentat-failings-lane-s4-2026-09-16`.

### Review in the session model (`review-in-fable-directive-2026-09-16`, Paul 2026-09-16)

- Paul, 2026-09-16, when a delegated /ecc:code-review was launched on the S4 commits: "You should review in Fable."
- **Why:** in the S4 lane the python-reviewer, typescript-reviewer and code-reviewer subagents all passed the committed code, and 118 tests were green, yet every report-worksheet saved view was failing with a 400 (`createSheet()` defaulted `industry: ''`, which the new save gate rightly refuses). The Fable review found it in minutes by probing the real route with a fresh worksheet sheet instead of trusting the fixtures. Subagent reviews check the diff against the checklist; the session model reads the diff against the whole intent and reproduces.
- **How to apply:** when Paul asks for a review, or invokes /ecc:code-review, do the review inline as the session model: read the diff of the actual change set (a commit range if already committed, not `git diff HEAD` which returns other lanes' drift), reproduce suspected defects against the real server or builder, run the validation suites, write the report into the lane packet, and fix what is found. Delegate only the mechanical validation runs. This overrides the fable-baton delegation policy for review work. Related: `go-faster-directive-2026-09-16`, `mentat-failings-lane-s4-2026-09-16`.

### Go faster (`go-faster-directive-2026-09-16`, Paul 2026-09-16, end of the S4 lane, about 3.5 hours from brief to patch)

- Paul: "When possible it needs to go faster."
- **Why:** the S4 lane lost roughly an hour to avoidable round trips: two Sonnet executors refused writes under `C:\Users\pgoff\Mentat` and had to be re-dispatched (then a scratch copy had to be built); a Haiku acceptance verifier ignored its polling and exact-payload instructions and the run had to be redone; three review passes (python, typescript, code-review) ran serially with a fix pass after each; the patch was cut once and then had to be regenerated after another session moved HEAD.
- **How to apply (concrete, in order of payoff):**
  1. Write-path in the FIRST dispatch prompt, never mid-task: for Mentat work from a Melange worktree, either use the Opus architect (writes via python scripts from the scratchpad without objection) or give Sonnet executors the scratch-copy method up front (`mentat-failings-lane-s4-2026-09-16`). A mid-task "workaround" message reads as injection and costs a full re-dispatch.
  2. One combined review pass (python + typescript + security in one architect brief) and one fix pass, not three serial pairs. Run the independent sweep IN PARALLEL with the review, not after the fixes; re-run only the suites a fix touched.
  3. Verification tiers: use Sonnet/Opus for acceptance runs that need polling or exact payloads; Haiku only for pure read-and-report checks.
  4. Cut the patch exactly once, last, after `git log -1` confirms HEAD; other sessions commit on the same branch during a lane.
  5. Skip the boot-output `head -300` mistake: save the brain boot to a file and grep sections.
  6. Long data builds (analytics cache materialization after a VERSION bump) are wall-clock costs: start them first (a scratch console query) so they overlap with review, and never sit on them.

### Nothing waits on anything else (`work-in-parallel-no-waiting-2026-10-08`, Paul 2026-10-08)

- Paul, 2026-10-08 (Terrier build): "Nothing should be waiting on each other, keep going and work in parallel." He asked after seeing finished lanes sit idle behind a long data runner (a "don't merge while run_*.ps1 is alive" rule) and a slow, RAM-starved draws step.
- **Why:** waiting chains turned minutes of work into hours; Paul measures progress by things landing.
- **How to apply:** let code lanes merge as soon as their own gates pass (rebase on whatever landed); make later steps tolerate missing pieces (fail soft, rerun later) instead of blocking; a data runner picks up merged code at its next step or is simply rerun. Still keep one heavy data process at a time on the laptop (`never-stress-test-the-machine-2026-10-07`, in the workstation stability incident topic): only CPU/RAM-heavy steps take turns; merges, tests and planning never wait. Related: `terrier-multidistrict-lane-2026-10-06`, `go-faster-directive-2026-09-16`.

### RAM/memory-heavy work goes to the pod (`pod-for-memory-heavy-tasks-2026-09-30`, Paul 2026-09-30; the RunPod math pod actor)

- Paul, 2026-09-30, verbatim: "For tasks pertaining to Memory and RAM, shift over to the Pod, and go hard on it, meaning memory and Ram on there are not a constraint".
- The pod then in use: H200 141 GB, 192 cores, ~2 TB RAM, `/workspace` volume; SSH `root@103.196.86.181 -p 57215 -i ~/.ssh/id_ed25519` (key location only). It runs any job limited by RAM or memory: model training, grids, large in-memory joins, bootstrap batteries. Do not downsample or cap memory there. Parallelise across fields and cores, and keep data in RAM.
- **SUPERSEDED for the CU-geography row-ranking lane, 2026-09-30 evening.** Paul said, verbatim: "Move on out of the pod". The ranking framework is built and tested locally.
  - The pod at that time was `root@81.27.69.177 -p 36669`. It was shared with another session (`/workspace/forecast`), and its container was capped at ~48 CPUs, ~468 GiB RAM and 30 GB disk.
  - Nothing from that lane was uploaded to it.
  - Ask Paul before using any pod again. (Current rule: the CU-geography lane works locally and asks before using the pod; the "never stop the pod" rule below still stands.)
- **Why:** the local laptop (8 cores, 31.5 GB) was the bottleneck for the Luna modelling rounds, and Paul would rather pay for pod hours than wait.
- **How to apply (still standing items):**
  - Only data Paul has approved may go to the pod. On 2026-09-30 that was the DE-IDENTIFIED Luna model inputs: no names, emails, addresses or IDs.
  - The raw source CSV and the full completed export stay local, so export, verify and publish of published files remain local.
  - Launch pod jobs detached and wait on one background notification; never poll from your turns.
  - **Never stop or terminate the pod without Paul.**
  - The pod bills hourly, so do not leave it running idle work.
- Related: `luna-stratified-scaling-review-2026-09-29`, `codex-overnight-poll-loop-burn-2026-09-13`.

## Contradictions noted and how they were resolved

- Model tiering for agent coding: 2026-08 (Codex alone writes; Fable reviews) vs 2026-09-16 (Opus architect or Fable writes code, never Sonnet/Haiku) vs 2026-09-24 (reasoning stays in Opus when the session is Opus) vs 2026-10-01 (code only in Sonnet 5.5 xhigh; Opus only reasons/reviews) vs 2026-10-07 (three tiers: Opus reasons, Sonnet codes, Haiku classifies, writes documents and extracts; added 2026-10-10) vs 2026-10-09 evening (adversarial verify passes on Haiku; added 2026-10-10). Resolution: newest wins for agent coding/orchestration; older versions kept as dated struck-through bullets in the Decisions and model-tiering sections. Pipeline API model selection (Fable paragraphs only, Haiku elsewhere) is a separate scope and is unchanged.
- Pod usage: 2026-09-30 "go hard on the pod" vs 2026-09-30 evening "Move on out of the pod" (CU-geography lane works locally and asks before using the pod); "never stop or terminate the pod without Paul" still stands.
- Review: the fable-baton delegation policy (delegate to reviewer subagents) is overridden by the 2026-09-16 inline-review directive; the 2026-10-01 rule keeps review with Opus (the session model).
