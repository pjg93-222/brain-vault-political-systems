---
type: topic
title: "Agent tooling stack"
aliases: ["Agent tooling stack"]
category: "feature"
status: "in-progress"
people:
  - "paul-goff"
actors:
  - "[[codex-executor]]"
  - "[[glass-box]]"
  - "higgsfield-connector"
  - "[[metaloop]]"
  - "moneyball-skill-library"
  - "project-brain"
  - "quant-model-evaluation-skill"
  - "runpod-pod"
objective: "Record the state, standing rules, rulings and traps of Paul's agent tooling stack (Codex executor lane and metaloop orchestration, the 16-to-20 skill library and its stale-fact refresh, the quant-model-evaluation skill, Project Brain, RunPod Claude sessions, GLASS BOX lane-lock hang, Higgsfield connector account trap) so later sessions do not re-diagnose or re-propose settled items."
created_at: 2026-07-10
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/higgsfield-connector-account-trap-2026-09-17.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\higgsfield-connector-account-trap-2026-09-17.md", sha256: "4c6586f59c0b0e0ae0f9998b191e3c8427740f26941607e9c706683b1c88d102"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/quant-model-evaluation-skill-lane-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\quant-model-evaluation-skill-lane-2026-09-30.md", sha256: "4a3dbc28397c5529127d6a1943bdedc8e9d6ea1607f1e586168e6d095be4f34f"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/runpod-claude-sessions-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\runpod-claude-sessions-2026-09-30.md", sha256: "6a09c28c943b3f3c6207c49a2e825ec5adf4d752204a958334f2aeaac16b9260"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/skill-library-stale-facts-lane-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\skill-library-stale-facts-lane-2026-09-30.md", sha256: "968157b79dc19a455f99b02d216a70f1103481e87b842c22aa3fb778e3333469"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/codex-executor-lane-2026-07-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\codex-executor-lane-2026-07-18.md", sha256: "afc4c835d129259e477c1e91bfbbb1d26c9b996bc86b4fb6092896e705ee81b2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/project-brain-toolkit-2026-08-11.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\project-brain-toolkit-2026-08-11.md", sha256: "426022161f53e4a6aecc7d7472449fde76a6aad9c364e0bff2ad7449ba129f02"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/glassbox-lane-lock-hang-2026-08-06.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\glassbox-lane-lock-hang-2026-08-06.md", sha256: "931cdc0deb8e18dce2c3b3f12415d5baca4fcfb57bf79d0e98089dd5fee3092b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/skills-library-2026-07-10.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\skills-library-2026-07-10.md", sha256: "c0b2ca636cff6d9f41c8574737ca7e3c699a94ccba1742e0eedc57b231eb8b2d"}
updated_at: 2026-10-04
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/feature"]
---

# Agent tooling stack

> The tooling around Claude Code for the Melange work: the Codex-as-MCP executor lane (Claude = mind, Codex = body), the Gemini and Grok lanes, `/metaloop`, the Moneyball skill library, the quant-model-evaluation skill, the Project Brain external-memory kit, RunPod Claude sessions, GLASS BOX lane consoles, and the Higgsfield connector. Newest source activity 2026-10-01.

## Parts

- [[2026-07-feature-agent-tooling-stack-codex-executor-lane]] — The Codex executor lane record: how Claude and Codex were wired, the injected-preamble finding, the Gemini and Grok lanes, Paul's amended rules and the integration history.
- [[2026-07-feature-agent-tooling-stack-quant-model-evaluation-lane]] — The quant-model-evaluation skill lane of 2026-09-30 to 10-01: Paul's rulings on F1 to F6, the N19 hold fix, the leakage fix and the production chain left pending.
- [[2026-07-feature-agent-tooling-stack-skill-library-lane]] — The Moneyball skill library: how the repo skills were built, merged into git and audited for stale facts.
- [[2026-07-feature-agent-tooling-stack-runpod-sessions]] — Running Claude sessions on the RunPod pod: Paul's rulings on the H200, the data scope he allowed and the never-stop rule.
- [[2026-07-feature-agent-tooling-stack-higgsfield-account-trap]] — The Higgsfield connector account trap: the connector bound to a free account, re-authorized by Paul on the plus plan on 2026-09-19, then back on a free account on 2026-09-30 and 2026-10-01.
- [[2026-07-feature-agent-tooling-stack-project-brain-toolkit]] — The Project Brain toolkit: durable per-project memory for disposable AI sessions, where since Paul's 2026-08-12 override (brain D-006) Claude may run brainctl and commit brain entries directly; the draft-only rule is retired.
- [[2026-07-feature-agent-tooling-stack-glass-box-lock-hang]] — The GLASS BOX lane-lock hang that blocked metaloop starts, and the Grok lane taken down on 2026-08-06 by an exhausted Grok Build usage balance.

## Context

- Eight source memories feed this topic: `codex-executor-lane-2026-07-18` (35 KB, the largest, last modified 2026-09-19), `skills-library-2026-07-10`, `skill-library-stale-facts-lane-2026-09-30`, `quant-model-evaluation-skill-lane-2026-09-30` (last modified 2026-10-01), `runpod-claude-sessions-2026-09-30`, `project-brain-toolkit-2026-08-11` (last modified 2026-09-19), `glassbox-lane-lock-hang-2026-08-06` (last modified 2026-08-10) and `higgsfield-connector-account-trap-2026-09-17` (last modified 2026-10-01).
- Actors: [[codex-executor]] (the executor lane itself), [[metaloop]] (orchestration command), [[glass-box]] (event stream and lane consoles), Moneyball skill library, quant-model-evaluation skill, Project Brain toolkit, RunPod math pod and Higgsfield connector. The project they serve is [[melange-systems]]; owner/decider is Paul Goff.
- Role split (Paul, 2026-07-18): Claude (Fable) = reasoning, diagramming, architecture and security review; ChatGPT ("Sol 5.6 extra high fast", model `gpt-5.6-sol`) = executor. Paul's mind/body directive (2026-07-23): "Claude should be the mind which decides and guides, while ChatGPT is the body who executes".
- The canonical orchestration rules (UNIVERSAL LANE LAWS) live in `.claude/commands/metaloop.md`; see [[metaloop]].

## People Involved

| Person | Role |
|---|---|
| Paul Goff | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[codex-executor]] | Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17 |
| [[glass-box]] | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| Higgsfield connector | Higgsfield MCP connector (89 tools) used to render UI boards; bound to whichever account authorized it; Paul must re-authorize to switch. |
| [[metaloop]] | /metaloop (shipped @46b17b9): Fable decomposes/reviews, Codex executes, Gemini perceives, Grok critiques; UNIVERSAL LANE LAWS @86ba6ef. |
| Moneyball skill library | Melange project skill library (16 built 2026-07, 20 by 2026-09-30); change-control = constitution; refreshed on main b7faf6344. |
| Project Brain toolkit | Hardened brainctl external-brain kit (Desktop, own repo); melange brain boots via CLAUDE.md; nested brain repos with mirrors. |
| quant-model-evaluation skill | General read-only skill for evaluating models, numbers and claims; merged to main c13f3a5d4 (2026-09-30); Melange gates in a binding. |
| RunPod math pod | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## History

| Date | Event |
|---|---|
| 2026-07-09/10 | 16-skill Moneyball library built (retirement handoff, Paul-directed) at the LIVE tree `.claude\skills\` and worktree nifty-cray-f6d053. |
| 2026-07-10 (afternoon) | Paul: "merge and integrate - do it". All branches merged into main; library committed to main @b994d93 (gitignore keep rules added; 21 files tracked). |
| 2026-07-18 | Codex-as-MCP executor lane wired; MERGED, main == live == branch @c0d753a (@fe8d6d1 = wiring, @c0d753a = command). User-scope promotion same day. |
| 2026-07-19 | STANDING: "always work through codex" + "Optimize merge to your preference". RULE AMENDED: "change rule, codex can run data-mutating pipeline steps". |
| 2026-07-23 | Lane audit (/codex "check the link"); SKILL.md shipped @fadb08a; REFLEX LAYER shipped @8dcf330; hardening pass; COORDINATION LAYER shipped @600012f (Paul's go "Sync and other shit" 2026-07-24). |
| 2026-07-24 | Rules amended (Claude never writes code; double sign-off; hierarchy Fable > Codex > Gemini); Gemini runtime saga; agy 1.1.6 lane live; media-delegation protocol @9d8217d; Dynamic Coordination V1 (0db65d5, 9d8f2c7, 80f1b79); `/metaloop` shipped @46b17b9; Grok companion lane @6756985, verified @decf125; X lane no-key; Monday collector @deeb7d0/010b69d/6cad6bc; bug scan + collector v2 @a0e999f/@d2c1086; audit + fix wave @4f46939/@f9843ae/@1f35c66; test-all; @fa3ba76; bounded retry controller @1c935e4. |
| 2026-07-25 | Overnight resolution: x_catalog.jsonl banked 3,020 posts / 205 handles; SuperGrok quota wall; quota circuit breaker @5185954. |
| 2026-08-06 | GLASS BOX lane console hang blocks metaloop start; Grok Build balance exhausted (HTTP 402); settings.json hook mirror stops being invoked in app sessions (~2026-08-06); corrected 2026-10-03: the hooks were called but their commands failed, dead from about 2026-08-02, because hook commands run through Git Bash, which stripped the backslashes of their unquoted Windows paths (GLASS BOX). |
| 2026-08-07 | SUBAGENT LAW codified in commands/metaloop.md @f9e62cf. |
| 2026-08-09 | UNIVERSAL LANE LAWS canonical in commands/metaloop.md @86ba6ef (glasseye section @18dab6b); constitution amended @a1d4d5d; ledger value-pin @14bcc84; Gemini lane repaired @038351b. |
| 2026-08-10 | AUGMENTATION PHASE 0+1 (LAW 8 VERBATIM ARTIFACTS @4f3b57af0). |
| 2026-08-11 | Roadmap complete through Phase 5; RECEIPT EPOCH live (2026-08-11T00:00Z). Project Brain toolkit built (run run-20260811T2032536926854Z-9504fd764f, commit 34a773a); folder toggle a3ac26b; close-out 33ffb02 and 8f6cef9. |
| 2026-08-12 | Paul: "yes that override stands going forward" (brain direct-commit override, brain D-006); first exercise = melange-systems brain seed commit 2026-08-12 12:09. |
| 2026-08-24 | OpenAI deprecated `codex mcp-server` in CLI 0.149.1. |
| 2026-09-17 | ChatGPT/Codex app auto-updated 16:43 to `0.155.0-alpha.2.6`, breaking the MCP lane (`CONNECTION_CLOSED`); Higgsfield connector found bound to a FREE-plan account. |
| 2026-09-19 | Codex MCP lane repaired via pinned 0.146.0 build + wrapper probe; `codex.cmd` shim installed; Higgsfield connector re-authorized (plan `plus`, 1,069.9 credits); Project Brain mirrors set up (brain D-058). |
| 2026-09-30 | QME skill built + merged to main c13f3a5d4; skill-library stale-fact lane landed on LIVE main b7faf6344; RunPod: first pod set up (code only), then Paul ordered every process to a newly supplied pod and allowed the entire data plane (math lane); SSH to the pod timed out about 20:00; Higgsfield back on FREE. |
| 2026-10-01 | QME lane: REFRESH DONE and "Finish it all" rulings; Higgsfield again `free` with 4 credits. |

## Decisions

- **Codex is the default executor** (Paul 2026-07-19): the Codex lane is the DEFAULT path for implementation work in every future session, not just on `/codex`; merge decisions sit at Claude's preference (present receipts; merging verified work needs no per-merge ask). Scoring/stance/user-gated items stay at Paul's gate.
- **Claude NEVER writes code** (Paul 2026-07-24): all code authorship is Codex's, including one-line fixes (edit-only dispatches). Claude keeps design, specs, review, git, docs/skill prose, memory.
- **Double sign-off loop** (2026-07-24): Codex writes, Claude sign-off No. 1 (protocol review), SOL ERROR-INVESTIGATION round (a FRESH read-only Codex thread adversarially hunts errors in the diff, separate from the author thread), Claude adjudicates + sign-off No. 2, then Paul's gate/merge delegation.
- **Command hierarchy: Fable (Claude) > Codex > Gemini** (2026-07-24); Grok = adversarial counsel with zero authority.
- ~~Codex may NOT run data-mutating pipeline steps (code-only in worktrees)~~ - superseded 2026-07-19 ("change rule, codex can run data-mutating pipeline steps"); see the rule block in [[2026-07-feature-agent-tooling-stack-codex-executor-lane]].
- ~~Project versions of SKILL.md win on name collision in post-merge worktrees~~ (stated 2026-07-18) - WRONG for the current app, per the 2026-07-23 audit: the session loaded the USER-scope SKILL.md, so user scope is the live surface and every repo-copy change needs a Copy-Item sync.
- ~~REFLEX-era vocabulary~~ is HISTORY; the current surface says CORRECTION REPORT / IMMEDIATE CORRECTION (audit note 2026-07-24).
- ~~Brain rule: sessions DRAFT updates; only Paul commits~~ (2026-08-11) - RETIRED 2026-08-12 ("yes that override stands going forward"): Claude may write into a brain's files and commit directly.
- ~~Codex sessions drive MCP via the app's own `codex mcp-server`~~ (2026-07-18) - broken upstream 2026-09-17; repaired 2026-09-19 with a pinned build, and the working Astra route is `codex exec` (details in [[2026-07-feature-agent-tooling-stack-codex-executor-lane]]).
- ~~"The 16-skill library is ON DISK ONLY (gitignored)"~~ (2026-07-09/10) - superseded 2026-07-10 afternoon: committed to main @b994d93.
- ~~README lists 20 rows under "19"~~ (2026-09-30, mid-lane) - fixed by b7faf6344 (README = 20 skills).
- ~~Higgsfield connector on the free plan~~ (2026-09-17) - re-authorized 2026-09-19 (plus), free again 2026-09-30 and 2026-10-01; always check `balance` first.
- ~~RunPod first pod (code only, no Melange data), old SSH address~~ (2026-09-30 first part) - superseded the same day by the new pod and full-data authorization.

## Next Steps

- [ ] Paul to run the plugin install for the official Codex replacement: `/plugin marketplace add openai/codex-plugin-cc`, `/plugin install` of `codex` from marketplace `openai-codex`, `/codex:setup` (not done by Claude).
- [ ] Mechanical receipt-presence gate for Codex dispatches (recommend at the next lane-law review; prose preamble is demonstrably weak).
- [ ] Skill library: D4 stale line refs deferred to a spawned chip "Refresh stale line refs in skill library" (precondition, the batch on main, is met). D5 (is Highly Persuadable 0.65 ratified?) still unanswered by Paul.
- [ ] Skill library W4 last-measured lines (cite 247/2 on 09-20 and 559/9 on 09-19) - update only after a clean full protocol run.
- [ ] QME lane STILL TO DO after the reboot (see the QME section in [[2026-07-feature-agent-tooling-stack-quant-model-evaluation-lane]]): full chain; `runs\step6_build_system_manifest.cmd`, then audit_full, then the kernel; f1f4 checks and ROI parity check; write PUBLICATION_SIGNOFF_20261001 and land it; start 8841 once; write the brain outcomes; verify.
- [ ] Paul to confirm Carbonite covers the four new Project Brain folders (green badge); fix the stale pod CLAUDE.local.md line "stop it in the RunPod console" at the next pod visit.
- [ ] Authorize the RunPod MCP plugin (plugin:runpod) before any agent can check pod state.
- [ ] Higgsfield: Paul to re-authorize the connector in Settings > Connectors with the credited account whenever `balance` says `free`.
- [ ] Re-create the Project Brain post-commit hooks after any re-clone (hook is NOT versioned).
