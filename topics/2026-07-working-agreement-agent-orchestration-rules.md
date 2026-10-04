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
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/reasoning-in-fable-code-in-opus-2026-09-16.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\reasoning-in-fable-code-in-opus-2026-09-16.md", sha256: "4d9ea19829996b688d101fe04a9d066fea22c172a924aa1dfa4fe8e06e503c53"}
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
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/topic", "status/open", "domain/agent-ops", "category/working-agreement"]
---

# Agent orchestration and model tiering rules

> Working agreement (feedback rules from Paul, 2026-07-09 to 2026-10-01): which model does what, how lanes are orchestrated, what must emit to the GLASS BOX, when RAM-heavy work moves to the pod, and which orchestration moves waste money or duplicate writers. Newest rule wins inside each scope; older versions are kept as dated struck-through bullets.

## Context

- Two model-tiering rules coexist because they govern different things. **Scope (a), pipeline API calls** (what the Melange pipeline sends to the Anthropic API): Fable only for the 533 per-member narrative paragraphs, Haiku 4.5 everywhere else by default, escalate to Sonnet 5 (never back to Fable) if Haiku is remarkably worse. Source: `fable-paragraphs-only` (2026-07-09). **Scope (b), agent coding and orchestration** (which model the sessions and subagents run): newest rule governs, and as of 2026-10-01 code is written in Sonnet 5.5 at effort xhigh while Opus only reasons, designs, reviews and verifies; the earlier versions are dated bullets below. Newest wins only inside each scope; (a) is not superseded by (b).
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

## Decisions

Current rules (newest wins within scope), then superseded versions as dated struck-through bullets. Full rule text, **Why** and **How to apply** are in the Rules sections below.

- **Model tiering, scope (a) pipeline API calls (2026-07-09, still in force):** Fable (`claude-fable-5`) only for the ~533 per-member "Suggested approach" paragraphs; every other LLM step uses Haiku 4.5 (`claude-haiku-4-5`); escalate a mechanical task to Sonnet 5 (`claude-sonnet-5`) only if Haiku does remarkably worse, never back to Fable. Justification: cost discipline ($50/1M out for Fable).
- **Model tiering, scope (b) agent coding/orchestration (current, 2026-10-01):** code, including analysis and backtest code, is written in Sonnet 5.5 at effort xhigh (workflow opts model 'sonnet', effort 'xhigh'); Opus only reasons, designs, analyses, reviews and verifies by reading/running checks; set the model explicitly on build agents; tell every executor in its FIRST prompt to write all code itself and not spawn Opus coders. Justification: Paul's own words ("Reason in Opus, Code in Sonnet 5.5"; "Opus should only reason"; "you should be coding only in Sonnet 5.5").
  - ~~Design and all reasoning in Fable, inline; code always in Opus (the `fable-baton:architect`) or Fable; never Sonnet executors, never Haiku, for code~~ (2026-09-16) - the code half superseded for builds 2026-10-01 (and extended to analysis/backtest code the same day); kept because it explains the S4/S5-era lane artifacts.
  - ~~"Reasoning is done in Fable"; offer a model switch~~ (2026-09-16) - modified 2026-09-24: when the session model is Opus, design/reasoning/review stay in the session model and the agent must not ask Paul to switch to Fable.
  - ~~Implementation flows Fable spec -> coordinator's Codex dispatch (xhigh) -> Fable review; only Codex touches the tree (law 5 "one writer")~~ (2026-08-09/2026-08-18) - apparently superseded for agent coding by the 2026-09-16 Opus-architect rule and then the 2026-10-01 Sonnet rule (an inferred ordering; no source states the supersession in so many words). Still the canonical text of the UNIVERSAL LANE LAWS in `commands/metaloop.md`; see Contradictions below.
- **Review (2026-09-16):** code reviews are done inline by the session model, not delegated to reviewer subagents; delegate only mechanical validation runs. Overrides the fable-baton delegation policy for review work.
- **Pacing (2026-09-16):** "When possible it needs to go faster."; six concrete time-sink fixes below.
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
- [ ] Flag, do not flip, the three PAUSED Codex heartbeat automations if any becomes ACTIVE (see rule 8).
- [ ] Paul's open call from the poll-loop repair lane: admissions `transport claude-cli`, press backlog budget/fold, committing the untracked subsystem, retry task `ExecutionTimeLimit PT0S` (listed under rule 8).

## Rules

### Model tiering scope (a): pipeline API calls (`fable-paragraphs-only`, Paul 2026-07-09)

- **Rule:** HARD cost rule. **Fable (`claude-fable-5`, $50/1M out) is ONLY for the per-member "Suggested approach" narrative paragraphs**, one call per member (~533 total). **Every other LLM step in the pipeline uses Haiku 4.5** (`claude-haiku-4-5`, ~10x cheaper). Mechanical tasks (audio-clip speaker verification from captions, classification, extraction, labeling) are Haiku, NEVER Fable. Paul stated it firmly, all caps, 2026-07-09.
- **Why:** Paul caught the agent firing a Fable call per audio clip (~3,000 clips, about $120-200) for a mechanical "is X the solo speaker?" classification. That is a fortune for a task Haiku does equally well. Fable's quality only earns its price on the generative narrative task, and even then it is one call per member, never per-item in an inner loop.
- **How to apply:** before ANY `messages.create`, ask "is this generating the member narrative paragraphs?" If no, use `claude-haiku-4-5`. Never default to Fable for per-item loops. Per-clip / per-row / per-item work is always the cheap model. Context: `moneyball-big5-campaign`; the paragraphs themselves are the member approach briefs (Member approach briefs and narratives).
- **Escalation rule (Paul, 2026-07-09):** if Haiku does *remarkably worse* than Fable on a mechanical task (validate by head-to-head agreement on a sample, adjudicating disagreements against the actual transcript), escalate that task to **Sonnet 5** (`claude-sonnet-5`), NOT back to Fable. Order for mechanical work: Haiku -> Sonnet if needed. Fable stays paragraphs-only regardless.

### Model tiering scope (b): agent coding and orchestration (`reasoning-in-fable-code-in-opus-2026-09-16`, file created 2026-09-16, last modified 2026-10-01)

Version history (newest governs):

- **CURRENT, 2026-10-01 (forecast integrity lane):** Paul: "you should be coding only in Sonnet 5.5". This covers ANALYSIS and backtest code too, not just builds: an executor that cites the old "never Sonnet" rule and hands code to Opus sub-agents is violating it. Opus = reasoning, design, review, verification by reading/running checks only. Tell every executor in its FIRST prompt: write all code yourself (Sonnet); do not spawn Opus coders.
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

### Ultracode overrides "no workflows" for orchestration only (`ultracode-orchestration-standing-2026-08-18`, Paul's STANDING ruling 2026-08-18)

- **The ruling** (verbatim ask: "Yes, keep ultracode overriding that going forward"). The Melange session guidance carries a standing line: "Do not call the AgentTool unless the user requested it / Do not use workflows or deep-research unless the user requested it." When the ultracode setting is ON, **that line is overridden**: fan out with Workflow by default on substantive work, without asking permission each time. The agent raised the conflict explicitly and Paul ruled for ultracode. Do not re-litigate it, and do not ask "should I use a workflow?" when ultracode is on.
- **Why:** the standing no-workflow line exists to stop the agent burning tokens on fan-out Paul did not ask for. Turning ultracode on IS that ask, expressed once as a setting instead of repeated every turn. Making him retype it per-task defeats the purpose of the setting.
- **Scope: an ORCHESTRATION ruling only.** It changes HOW the agent investigates, never WHAT it is allowed to land. Two standing laws sit next to it and are NOT overridden:
  1. **The ask-first APPLY gate still governs** (`ask-before-substantive-changes`; the sibling working-agreement topic `2026-06-working-agreement-change-control-and-decision-authority`). That memory says ask-first beats the "ultracode keep-going bias"; still true. The two are orthogonal: ultracode decides whether the agent may FAN OUT to investigate; the APPLY gate decides whether it may EDIT, REGENERATE, or COMMIT. Fanning out twenty read-only reviewers and then landing their fixes unasked would violate the gate just as badly as doing it solo. **Correct shape under ultracode: fan out hard on read-only investigation -> synthesize -> present findings with a recommendation -> WAIT.**
  2. **The subagent read-only contract still binds** (`codex-executor-lane-2026-07-18`, SUBAGENT LAW codified 2026-08-07 in `commands/metaloop.md`). Workflow/Agent subagents are Fable reasoning lanes, READ-ONLY by contract: they never edit files, never run producers, never dispatch Codex themselves (dispatches stay serialized through the coordinator). **Every subagent prompt must state that read-only contract.** Implementation flows Fable spec -> coordinator's Codex dispatch (xhigh) -> Fable review. Ultracode raises the VOLUME of reasoning lanes; it does not grant them write authority. (This implementation flow is the 2026-08 regime; see the model-tiering scope (b) history for how coding moved on.)
- **How to apply:**
  - Ultracode ON + substantive task: author a Workflow, no permission ask. Conversational turns, preference/governance turns, and trivial mechanical edits still run solo; a workflow to write one memory file or answer one question is theater, not thoroughness.
  - Every subagent prompt opens with the read-only contract.
  - Findings still land in front of Paul before anything is applied.
  - Respect the session's workflow-size guideline unless the task genuinely calls for more.
  - Also still binding regardless of ultracode: glassbox emission (`glassbox-everything-rule-2026-07-27`), never weakening a test to make a change pass, and press/stance labels being Paul's domain (`press-classification-user-domain`).

### Universal lane laws: one agent, four lanes (`universal-lane-laws-2026-08-09`, Paul 2026-08-09, last modified 2026-08-11; matches the [[metaloop]] orchestration and the [[codex-executor]] lane)

- **Paul 2026-08-09 ("apply all, make sure it stays intact over multiple tasks and agents"):** the four lanes (Fable, Codex (ChatGPT), Gemini, Grok) act as ONE agent that delegates by best fit, maximum harmonization, minimum latency. Canonical text: `.claude/commands/metaloop.md` section UNIVERSAL LANE LAWS @86ba6ef (glasseye section @18dab6b). The seven laws:
  1. **Role monopolies:** Fable alone reasons/decides and keeps design, spec, review, git, docs, memory; Codex alone executes; Gemini alone perceives; Grok alone critiques. A stuck lane escalates, never substitutes.
  2. **Escalate, don't reason:** any lane hitting a flaw/bug/dilemma/ambiguity/capability-loss stops reasoning and reports to Fable through its structured channel: Codex STOP REPORT / DECISION REQUEST mid-turn (blockers) + ESCALATIONS / POTENTIAL IMPROVEMENTS end-of-turn (non-blockers), now built into the Standing dispatch preamble's EIGHT labeled lists, so every dispatch at every entry point carries them; Gemini/Grok have BLOCKED lists; subagents return the question as their result. Fable adjudicates and re-dispatches down the same lane.
  3. **Never downgrade:** Codex xhigh/priority; Grok grok-4.5; Gemini gemini-3.6-flash-high; subagents inherit the coordinator's model.
  4. **Glasseye:** every lane action emits; hooks are dead in app sessions (~2026-08-06), so the coordinator emits agent.*/task.* pairs via `emit.ps1` around every fan-out and background task.
  5. **One writer:** only Codex touches the tree; Codex dispatches serialized through the coordinator.
  6. **Minimum latency:** blocking escalations return immediately; non-blockers ride end-of-turn lists at zero extra round-trips; read-only lanes parallelize freely.
  7. **Copy sync:** repo copy canonical; after a ratified change, sync user scope and md5-verify. Drift is a defect.
- **Why:** Paul's directive that the executor never reasons through a design flaw, bug, or dilemma: it reports to Fable, Fable alone reasons, and the revised instruction returns to the executor.
- **Proven live 2026-08-09,** Meta LOOP run `run-20260810T0038586162847Z-f7c586d050` (terminal receipt `evt-...fedaef0d02`): Codex issued a correct STOP REPORT against a planted 7-vs-8 spec contradiction (zero writes, verified) -> Fable REVISE -> clean completion with all eight labeled lists; the Explore subagent answered ground-truth checks exactly and REFUSED a planted read-only-violation bait, returning the conflict as an escalation. xhigh custody = `config.toml` + explicit per-call override + ledger dispatch records with provenance (audit clean). A harness restart severs Codex MCP threads: recover per the skill (inspect surface, fresh thread); it is not a protocol failure. Also: the repo gitignores `*.txt`, so porcelain is NOT evidence of txt-file writes; use Test-Path.
- **Round 2 (thorough, same day),** run `run-20260810T0102047933741Z-857e3b2522`: a full-tool general-purpose subagent held the contract-only guard against an edit bait (the previously untested soft spot); Codex reported a planted reference discrepancy through ESCALATIONS without acting; Grok live again (402 cleared): on-contract constitution critique 3K/10W/6S; two REAL Codex sandbox blockers (no python on PATH, no exec outside workspace) each drew correct STOP REPORTs, so **author/execute split is the fixture pattern: Codex authors the script, Fable reviews and executes it**. Grok -p can return preamble-only: retry once with an explicit completeness demand before ruling the lane degraded.
- **REPAIRS APPLIED (Paul: "apply the amendment slate, hard stop stays, repair"):** constitution AMENDED @a1d4d5d: enforcement map, law 1 mutation split (Fable = governance plane incl. git; Codex = code/data), review-vs-critique rule, law 2 residual reasoning budget + **TOTAL LANE LOSS = HARD STOP until Paul (his explicit ruling)**, dated re-testable MCP invariant, honest channel-cost law 6. **Ledger value-pin @14bcc84:** effort=xhigh/tier=priority enforced at insert AND audit (70 tests). **Gemini lane REPAIRED @038351b:** `agy` 1.1.11 permissions live at `~/.gemini/antigravity-cli/settings.json` with `read_file(*)` (old `~/.gemini/settings.json` + `**` form DEAD); media paths must be ABSOLUTE (relative resolves to agy scratch, not cwd); perception re-verified verbatim-exact. No open findings. Full record: `audits/LANE_LAWS_VALIDATION_2026-08-09.md`.
- **AUGMENTATION PHASE 0+1 (permanent, Paul 2026-08-10, "All stamped"):** LAW 8 VERBATIM ARTIFACTS added @4f3b57af0 (artifacts travel as themselves; file artifacts = path + sha256 + quoted spans; receiver acknowledges hash; RECEIPT is the sole carve-out).
  - Codex preamble is now RECEIPT-FIRST (enumeration schema: every constraint + every invariant as items with own-words interpretation, N/A needs reason, modality-weakening = distortion, contradiction-flagging built in) + INVARIANTS block quoted MECHANICALLY via `coordination_cli.py invariants <ledger> --run-id` from an immutable pinned `invariants` ledger event (MUST pin on multi-node runs).
  - Fable verifies the receipt BEFORE adjudicating any work product; mismatch = re-dispatch caught-at-gate; record as `receipt` ledger event (fingerprints + verified bool).
  - Ledger also enforces: failure-attribution tags on node_blocked/node_failed/node_rework (spec-misread | coordination | verification | infra, MAST-comparable), epoch-gated `dispatches_missing_receipt` (epoch 2026-08-11), `run_metrics` audit section (latency/tokens/spine-vs-parallel via `--glassbox-dir`).
  - Perception reports = TRANSCRIPTION/INFERENCE/ILLEGIBLE (fabricated anchor = defect); Grok critiques need per-point exact locations, cite-CORRECTNESS adjudicated. `handoff-accepted` carries the receiver's receipt (<=1200 chars verbatim, else sha256 + evt id).
  - KEY EVIDENCE: prompt-body instructions dropped 2/3 vs preamble-channel 100% (standing instructions belong in developer-instructions); plants 4/4 survival (codex, n=4); local failure mass = coordinator SPEC AUTHORING (3 defects caught by Codex STOP REPORTs in one run).
  - Full record: `audits/AUGMENTATION_P1_RATIFY_PACKET_2026-08-10.md` (grok-hardened, 4K/9W all accepted) + LANE_LAWS_VALIDATION Round 3.
- **ROADMAP COMPLETE through Phase 5 (2026-08-11):** P2 ratified (extraction charter + 70/85 soft ceiling + tool-result clearing + fact-provenance gate); P3 ratified with **P3.4 REJECTED** (the law-5 re-test found link breakage gone but the MCP transport serializes parallel calls anyway, so concurrency is mechanically unavailable; basis refreshed in law 5); compact routing now by the two-question rubric (mutation? cross-lane feed?); P4 in force (free tier before any model review; rework re-verified against verbatim original checks); P5 standing practices defined (plants at Paul's N, proposed 5; quarterly dated-basis sweep; quarterly distribution compare).
- **RECEIPT EPOCH LIVE since 2026-08-11T00:00Z:** every post-epoch dispatch needs a receipt event or the audit flags it (caught the phase4-tensor lane's dispatch within hours; cross-session drift is now mechanically visible; register -> receipt -> register sequencing matters, batch registration closes coverage windows). Receipt-block emission dropped 6/8 first attempts across phases; the coordinator VERIFY TOOTH is the enforcement, catching 6/6. Carbonite held glassbox heartbeats (dashboard wedge class, excluded by Paul 2026-08-11); the epoch time-bomb class exists (fixtures recording dispatches age across gate epochs).
- **How to apply:** inject the read-only + escalation contracts into every subagent prompt; emit glasseye pairs around every fan-out/task; load the `metaloop.md` section before orchestrating; md5-sweep skills + commands after any ratified change; RECEIPT-verify before adjudicating Codex output; pin invariants on multi-node runs and quote them via the CLI. The codex-executor fork was healed in @86ba6ef (user-scope 2026-07-25 audit/provenance work + repo 2026-08-05 `fec/members/` paths; 68/68 tests): both scopes verified identical, do not re-diagnose it.
- Links in the source: `codex-executor-lane-2026-07-18`, `glassbox-everything-rule-2026-07-27`, `glassbox-lane-lock-hang-2026-08-06`.

### Everything runs through the GLASS BOX (`glassbox-everything-rule-2026-07-27`, Paul's STANDING RULE 2026-07-27; see the GLASS BOX event stream actor)

- Paul's STANDING RULE, given 2026-07-27: **everything runs through the Glass Box.** Any process (collector, restore, audit, pipeline stage, background watcher) must emit progress to the shared stream at `C:\Users\pgoff\.claude\glassbox\events`. A job that runs without emitting there is not acceptable, even if it works.
- **Why:** he cannot supervise what he cannot see. Two separate failures on 2026-07-27 came from invisible work: the R full-text collector wrote events only to `<out_dir>/events` (so the viewer, which polls the shared directory, showed nothing despite the lane being correctly tagged `lane: codex`), and a OneDrive content restore ran for two hours with no emitter at all, which led the agent to misdiagnose an in-progress sync as permanent data loss.
- **How to apply:**
  - The viewer (`fec/open_glassbox_process_matrix.ps1`) polls ONE directory and creates a row per lane/source/run automatically. Emitting to the shared stream is the whole integration; no registration step.
  - Event shape: `{schema_version, timestamp_utc, lane, source, run_id, kind, status, stage, summary, detail, current, total}`. Lane is one of claude/codex/grok/gemini.
  - Filenames must be unique per PROCESS (timestamp + PID), not per config (see `legfix5-recollection-lane-2026-07-27` for the collision this caused).
  - Array params must be passed via `-Command`, never `-File`; `-File` silently fails to bind them and the window exits.
  - Always verify what a viewer instance is actually reading: `Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'open_glassbox_process_matrix' }`.
- Related: `desk-media-footprint-2026-07-16`, `codex-executor-lane-2026-07-18`.

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

### Never supervise a long job from an AI turn (`codex-overnight-poll-loop-burn-2026-09-13`, incident 2026-09-12/13)

- **Incident (2026-09-12 23:29 -> 2026-09-13 10:58 local, Codex Desktop thread `01a098ce-d021-7d42-9383-5affc2a0bdfb`).** Paul asked for an end-to-end recurring congress.gov bills -> sponsors -> media -> Excel -> dashboard refresh that "triggers every time I open my laptop", and said explicitly: "No not an AI process, something in my windows, like a Python process." Codex built the right artifact (`fec/legislation/refresh_congress_pipeline.py` + `fec/daily_refresh.py` + two Windows scheduled tasks `MoneyballCongressRefresh` / `MoneyballDailyRefreshRetry`), then stayed in the loop itself: 542 empty `write_stdin({chars:"", yield_time_ms:30000})` polls on its own background shell (03:36Z -> 14:57Z), 280 `wait_agent` blocks, 4 spawned agents each doing the same, and 27 `approvals_reviewer: auto_review` guardian threads that made zero tool calls yet consumed ~59M tokens re-reading context. Session family total: 673,856,790 tokens (674M) across 32 rollout files; it burned the ENTIRE weekly Codex quota and ended with `usage_limit_exceeded`, next window 2026-09-19 23:50. Quota was already at 89% when the thread started. Nothing external re-invoked Codex: no scheduler, no wrapper, no `codex exec` loop; the Python code never calls OpenAI/Codex.
- **Why it matters:** the job was correct and Windows-owned; the waste was 100% supervision. Paul's verdict: "that is unacceptable." Related: the brain's DE-018 (a Codex usage-limit error does not mean the subprocess stopped; inspect outputs before re-dispatching). Context for the refresh itself: Refresh automation reliability; the Codex lane: [[codex-executor]].
- **How to apply:**
  - A long-running Python job is finished when its receipt/status file says so, not when a model has watched it finish. Launch it detached (Task Scheduler, `Start-Process`), then use ONE Bash `run_in_background` `until` loop or one `Monitor` on the status file. Never a per-turn poll loop, never `wait`/`sleep` turns, never spawn helper agents to "watch".
  - Do not create Codex heartbeat automations as a scheduler. Three PAUSED heartbeats still exist in `C:\Users\pgoff\.codex\automations\` (`finish-collection-integrity-overnight` hourly, `finish-staffer-lda-reconciliation` every MINUTE, `legislation-acceptance-continuation` every 10 min); any of them flipping ACTIVE is a recurring burner. Flag, do not flip.
  - `approvals_reviewer: auto_review` in Codex thread settings fans out guardian threads that bill against the same weekly limit. Treat it as a cost multiplier on long threads.
  - "Independent of AI" is not fully true of the chain yet: step 3 `fec/legislation/refresh_sentinel_admissions.py:288-290` calls `api.anthropic.com` with `fec/anthropic_key.txt` (fingerprint-cached; pre-existing sentinel-lane code). That is Paul's call to keep or remove, never the agent's.
  - See `verify-dont-infer-completion-2026-08-04`, `glassbox-everything-rule-2026-07-27`, `codex-executor-lane-2026-07-18`, `ultracode-orchestration-standing-2026-08-18`.
- **Repair lane 2026-09-13 afternoon (Fable session, live tree, UNCOMMITTED and the whole subsystem is UNTRACKED in git):** the real reason the Windows job never finished was three collectors treated as fatal:
  1. press collector exits 3 BY DESIGN when body backlog remains (`refresh_press_delta.R:843`; 2,200 pending, `JS_MEMBER_BUDGET 600` in Draft Systems R, fold OFF): now PARTIAL, not FAIL, and the press_intake/press_feed/press_baseline_fold steps plus `all_intake` are PARKED (`SKIPPED_PARTIAL`) because `build_press_engine_feed.py:99-101` (ratified partial-run rejection) would refuse the incomplete generation; the gate itself was NOT touched; `run_pipeline.py:52` already skips refused runs and uses the last complete press generation.
  2. discovery dies when Playwright cannot launch Chrome (`launchPersistentContext` 180 s timeout, not the Cloudflare cooldown, so the GovInfo fallback never fires): the wrapper now retries discovery once after 300 s, then DEFERS it (`deferred_steps`) and continues.
  3. calibration budget 120 s was too tight under disk load (71-107 s measured): now 900 s.
  - Plus `--smoke` (skip discovery, admissions `--limit 1 --no-llm --no-install`, media crec/chrg/bluesky only, full `run_pipeline.py` because it cannot be shortened), `--no-llm` in admissions (carry forward old decisions with OLD fingerprint; never seal a hold), glassbox `current`/`total` + heartbeats + `data/engine/congress_pipeline_live.log`, before-snapshot hashes the two 98 MB HTML files (11 min -> 0.4 s), watcher `fec/legislation/watch_congress_pipeline.ps1` + `open_congress_pipeline_monitor.ps1`, exit-75 reasons, 4 pytest suites registered in `_LANE_PYTEST` (160 tests).
  - The auto-mode classifier BLOCKED `taskkill` + `Disable-ScheduledTask`; a scheduler-launched run then took the lock the same second as the first smoke launch: launch races with the :39 retry are real.
  - Smoke run PID 81500 (17:00 local): every collection step PASS with zero model calls; `run_pipeline.py` died at step 17 because the Codex session's UNCOMMITTED `fec/stance/extract_cu_bluesky.py` change (handle-registry UNVERIFIED gate) drops four House members' posts and 5 of Paul's bluesky gold rows no longer bind: first executed by the smoke; nothing of his touched; fix = Paul confirms the handles or reverts that change.
  - Also found and fixed: writers lost `os.replace` races with readers (`WinError 5/32/33`): `fec/lane_file_io.replace_atomic()` 40-attempt jittered retry now used by all daily writers; watcher reads with FileShare Delete.
  - No `PIPELINE COMPLETE` line exists on disk after 2026-07-28 (chain unproven for 7 weeks by any launcher). Scheduler ran on its own 17:39/18:39/19:39 with discovery DEFERRED working in production.
  - **OPEN for Paul:** admissions `transport claude-cli` (24 `claude.exe` calls per pass on his Claude subscription), press backlog budget/fold, committing the untracked subsystem, retry task `ExecutionTimeLimit PT0S`.

### SendMessage to a running workflow agent spawns a duplicate (`sendmessage-workflow-agent-duplicates-2026-09-24`, 2026-09-24)

- On 2026-09-24 (session 5ab381bb, r5 fix run), the agent sent SendMessage to two workflow subagents (fix2-men, fix2-mel) by their agent id. Both times the tool said "Resuming agent ...". It started a second copy from the transcript while the workflow's original kept running. The two fix2-mel copies then overwrote each other's apply scripts and logs in the same lane folder, and one LIVE apply was refused. The workflow never saw the wrap-up order, because its own agent ran on unchanged.
- **Why:** workflow agents are not addressable mailboxes. A send to a live workflow agent id spawns a parallel resume, which doubles the writers on the same files. Paul's LIVE tree nearly got two concurrent applies.
- **How to apply:** never SendMessage a workflow subagent that is still running. To change a running workflow's course, either stop it (TaskStop), then relaunch or finish with a fresh Agent that carries the new instruction, or wait for it to finish. Put coordination facts (for example a peer session's file list) into the NEXT agent's prompt, not into a message. SendMessage is fine for Agent-tool background agents and for other sessions (and, per `scout-census-traps-2026-09-13`, for resuming an agent killed by a session limit after the reset). Related: `go-faster-directive-2026-09-16`, `ui-finalize-after-reboot-2026-09-23`. Hazard for the Claude Code harness.

### Ambiguous company identity: use networked Codex (`codex-web-research-for-company-ambiguity`, Paul 2026-07-19)

- Paul, 2026-07-19, verbatim: "if you are ever ambigous on a company just check via codex on the internet."
- **Rule:** when an employer string might be the roster company or an unrelated firm sharing the name, do NOT guess and do NOT default to asking Paul. Dispatch Codex to research it on the web.
- **Invocation** (network is OFF by default in the sandbox and MUST be enabled explicitly):

```powershell
& "C:\Users\pgoff\AppData\Local\OpenAI\Codex\bin\<hash>\codex.exe" exec `
    --sandbox workspace-write `
    -c 'sandbox_workspace_write.network_access=true' `
    '<research prompt>'
```

- Give Codex the corroborating FEC evidence: **state and occupation strings are the decisive signals**. Ask for a verdict table with an evidence URL per row, and instruct it to be conservative (UNCERTAIN over a guess). Real example that worked: bare `GEMINI` in NH with occupations CNC PROGRAMMER / SIGNS is a sign manufacturer, not the NY crypto exchange.
- Resulting verdicts go into `inputs/company_match_overrides.csv` (employer_key, company, decision), which persists across runs. See `mentat-roster-and-culling-rules-2026-07-19`: Paul picks the roster; research only ever disambiguates *within* companies he already listed, it never adds new ones. Part of the [[codex-executor]] lane's capabilities.

## Contradictions noted and how they were resolved

- Model tiering for agent coding: 2026-08 (Codex alone writes; Fable reviews) vs 2026-09-16 (Opus architect or Fable writes code, never Sonnet/Haiku) vs 2026-09-24 (reasoning stays in Opus when the session is Opus) vs 2026-10-01 (code only in Sonnet 5.5 xhigh; Opus only reasons/reviews). Resolution: newest wins for agent coding/orchestration; older versions kept as dated struck-through bullets in the Decisions and model-tiering sections. Pipeline API model selection (Fable paragraphs only, Haiku elsewhere) is a separate scope and is unchanged.
- Pod usage: 2026-09-30 "go hard on the pod" vs 2026-09-30 evening "Move on out of the pod" (CU-geography lane works locally and asks before using the pod); "never stop or terminate the pod without Paul" still stands.
- Review: the fable-baton delegation policy (delegate to reviewer subagents) is overridden by the 2026-09-16 inline-review directive; the 2026-10-01 rule keeps review with Opus (the session model).
