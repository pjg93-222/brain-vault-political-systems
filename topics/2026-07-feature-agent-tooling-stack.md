---
type: topic
title: "Agent tooling stack"
aliases: ["Agent tooling stack"]
category: "feature"
status: "in-progress"
people:
  - "[[paul-goff]]"
actors:
  - "[[codex-executor]]"
  - "[[glass-box]]"
  - "[[higgsfield-connector]]"
  - "[[metaloop]]"
  - "[[moneyball-skill-library]]"
  - "[[project-brain]]"
  - "[[quant-model-evaluation-skill]]"
  - "[[runpod-pod]]"
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
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/topic", "status/in-progress", "domain/platform", "category/feature"]
---

# Agent tooling stack

> The tooling around Claude Code for the Melange work: the Codex-as-MCP executor lane (Claude = mind, Codex = body), the Gemini and Grok lanes, `/metaloop`, the Moneyball skill library, the quant-model-evaluation skill, the Project Brain external-memory kit, RunPod Claude sessions, GLASS BOX lane consoles, and the Higgsfield connector. Newest source activity 2026-10-01.

## Context

- Eight source memories feed this topic: `codex-executor-lane-2026-07-18` (35 KB, the largest, last modified 2026-09-19), `skills-library-2026-07-10`, `skill-library-stale-facts-lane-2026-09-30`, `quant-model-evaluation-skill-lane-2026-09-30` (last modified 2026-10-01), `runpod-claude-sessions-2026-09-30`, `project-brain-toolkit-2026-08-11` (last modified 2026-09-19), `glassbox-lane-lock-hang-2026-08-06` (last modified 2026-08-10) and `higgsfield-connector-account-trap-2026-09-17` (last modified 2026-10-01).
- Actors: [[codex-executor]] (the executor lane itself), [[metaloop]] (orchestration command), [[glass-box]] (event stream and lane consoles), [[moneyball-skill-library]], [[quant-model-evaluation-skill]], [[project-brain]], [[runpod-pod]] and [[higgsfield-connector]]. The project they serve is [[melange-systems]]; owner/decider is [[paul-goff]].
- Role split (Paul, 2026-07-18): Claude (Fable) = reasoning, diagramming, architecture and security review; ChatGPT ("Sol 5.6 extra high fast", model `gpt-5.6-sol`) = executor. Paul's mind/body directive (2026-07-23): "Claude should be the mind which decides and guides, while ChatGPT is the body who executes".
- The canonical orchestration rules (UNIVERSAL LANE LAWS) live in `.claude/commands/metaloop.md`; see [[metaloop]].

## People Involved

| Person | Role |
|---|---|
| [[paul-goff]] | Vault owner (goff0070@umn.edu); sole decision-maker for Melange, Mentat, forecast redesign, CU-geography; R/Python on Windows 11. |

## Actors Involved

| Actor | Relation |
|---|---|
| [[codex-executor]] | Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17 |
| [[glass-box]] | Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts. |
| [[higgsfield-connector]] | Higgsfield MCP connector (89 tools) used to render UI boards; bound to whichever account authorized it; Paul must re-authorize to switch. |
| [[metaloop]] | /metaloop (shipped @46b17b9): Fable decomposes/reviews, Codex executes, Gemini perceives, Grok critiques; UNIVERSAL LANE LAWS @86ba6ef. |
| [[moneyball-skill-library]] | Melange project skill library (16 built 2026-07, 20 by 2026-09-30); change-control = constitution; refreshed on main b7faf6344. |
| [[project-brain]] | Hardened brainctl external-brain kit (Desktop, own repo); melange brain boots via CLAUDE.md; nested brain repos with mirrors. |
| [[quant-model-evaluation-skill]] | General read-only skill for evaluating models, numbers and claims; merged to main c13f3a5d4 (2026-09-30); Melange gates in a binding. |
| [[runpod-pod]] | RunPod H200 pod for memory-heavy jobs within Paul-approved data scope; never stop the pod; cleanup is Paul's. |

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
| 2026-08-06 | GLASS BOX lane console hang blocks metaloop start; Grok Build balance exhausted (HTTP 402); settings.json hook mirror stops being invoked in app sessions (~2026-08-06). |
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
- ~~Codex may NOT run data-mutating pipeline steps (code-only in worktrees)~~ - superseded 2026-07-19 ("change rule, codex can run data-mutating pipeline steps"); see the rule block below.
- ~~Project versions of SKILL.md win on name collision in post-merge worktrees~~ (stated 2026-07-18) - WRONG for the current app, per the 2026-07-23 audit: the session loaded the USER-scope SKILL.md, so user scope is the live surface and every repo-copy change needs a Copy-Item sync.
- ~~REFLEX-era vocabulary~~ is HISTORY; the current surface says CORRECTION REPORT / IMMEDIATE CORRECTION (audit note 2026-07-24).
- ~~Brain rule: sessions DRAFT updates; only Paul commits~~ (2026-08-11) - RETIRED 2026-08-12 ("yes that override stands going forward"): Claude may write into a brain's files and commit directly.
- ~~Codex sessions drive MCP via the app's own `codex mcp-server`~~ (2026-07-18) - broken upstream 2026-09-17; repaired 2026-09-19 with a pinned build, and the working Astra route is `codex exec` (details below).
- ~~"The 16-skill library is ON DISK ONLY (gitignored)"~~ (2026-07-09/10) - superseded 2026-07-10 afternoon: committed to main @b994d93.
- ~~README lists 20 rows under "19"~~ (2026-09-30, mid-lane) - fixed by b7faf6344 (README = 20 skills).
- ~~Higgsfield connector on the free plan~~ (2026-09-17) - re-authorized 2026-09-19 (plus), free again 2026-09-30 and 2026-10-01; always check `balance` first.
- ~~RunPod first pod (code only, no Melange data), old SSH address~~ (2026-09-30 first part) - superseded the same day by the new pod and full-data authorization.

## Next Steps

- [ ] Paul to run the plugin install for the official Codex replacement: `/plugin marketplace add openai/codex-plugin-cc`, `/plugin install` of `codex` from marketplace `openai-codex`, `/codex:setup` (not done by Claude).
- [ ] Mechanical receipt-presence gate for Codex dispatches (recommend at the next lane-law review; prose preamble is demonstrably weak).
- [ ] Skill library: D4 stale line refs deferred to a spawned chip "Refresh stale line refs in skill library" (precondition, the batch on main, is met). D5 (is Highly Persuadable 0.65 ratified?) still unanswered by Paul.
- [ ] Skill library W4 last-measured lines (cite 247/2 on 09-20 and 559/9 on 09-19) - update only after a clean full protocol run.
- [ ] QME lane STILL TO DO after the reboot (see the QME section): full chain; `runs\step6_build_system_manifest.cmd`, then audit_full, then the kernel; f1f4 checks and ROI parity check; write PUBLICATION_SIGNOFF_20261001 and land it; start 8841 once; write the brain outcomes; verify.
- [ ] Paul to confirm Carbonite covers the four new Project Brain folders (green badge); fix the stale pod CLAUDE.local.md line "stop it in the RunPod console" at the next pod visit.
- [ ] Authorize the RunPod MCP plugin (plugin:runpod) before any agent can check pod state.
- [ ] Higgsfield: Paul to re-authorize the connector in Settings > Connectors with the credited account whenever `balance` says `free`.
- [ ] Re-create the Project Brain post-commit hooks after any re-clone (hook is NOT versioned).

## Codex executor lane (source: codex-executor-lane-2026-07-18, branch chatgpt-prompt-orchestration)

### Wiring (2026-07-18, verified live; ACK round-trips 2-3 s through Paul's ChatGPT subscription - zero API spend, satisfies the no-API rule of `cu-sentiment-coverage-2026-07-15`)

- Codex desktop app bundles CLI (0.144.5 at wiring time) at `%LOCALAPPDATA%\OpenAI\Codex\bin\<versionhash>\codex.exe`; auth.json since 07-12; `~/.codex/config.toml` pinned `model = "gpt-5.6-sol"`, `model_reasoning_effort = "xhigh"`, `service_tier = "priority"` - **Paul's dials, never downgrade**.
- Shim `~\.codex\bin\codex-mcp.cmd` resolves the newest version-hash dir at runtime (the hash dir churns on app updates - two existed within 4 days).
- Repo `.mcp.json` registers server `codex` via `cmd /c %USERPROFILE%\.codex\bin\codex-mcp.cmd`; tools = `codex` (start, returns threadId) + `codex-reply` (revise thread).
- `.gitignore` got a `!.mcp.json` keep rule (the line-6 `*.json` blanket was silently swallowing it).
- Role contract = repo skill `.claude/skills/codex-executor/SKILL.md`: spec, dispatch (worktree on `codex/*` branch, `sandbox: workspace-write`, `approval-policy: never`), Claude diff review (arch + security, Codex output = untrusted), `codex-reply` revise loop, Moneyball verification, Paul gates merge. Deliberately NOT a global CLAUDE.md (would contaminate change-control sessions).
- Paul's directive 2026-07-18 superseded the manual prompt-pack relay idea the moment Codex CLI was found to serve MCP natively.
- **State (final, Paul-ordered 2026-07-18): MERGED - main == live == branch @c0d753a** (@fe8d6d1 = wiring, @c0d753a = command). Live tree fast-forwarded on its cfpb branch 9aa9677 to c0d753a, 4 files only; the other lane's uncommitted WIP (apply_leg_stance / repair_legislative_normalized / tpls etc.) verified untouched.
- **Trigger = `/codex <task>`**: routes through the codex-executor skill protocol; falls back LOUDLY (fresh session or stdio harness), never silently solo, when MCP tools are absent. Same-session driving is possible via the stdio harness (scratchpad `smoke_codex_mcp.py` pattern). The gist's Gemini-auditor / Nanobanana legs were SKIPPED at the time: no Node/npm on machine, no Google auth, Paul chose skip.

### User-scope promotion (2026-07-18, after "not getting anything")

- Paul's first new session landed in a RECYCLED pre-merge worktree (melange-ticketing @9aa9677, no files on disk), exposing two treadmills: sessions reuse old worktrees/branches, and `.mcp.json` approval is per-project-path (one per worktree; all were empty).
- Fix = all three pieces promoted to user scope so EVERY session gets them regardless of worktree/branch: (1) `~/.claude.json` top-level `mcpServers.codex` (`cmd /c %USERPROFILE%\.codex\bin\codex-mcp.cmd`; Edit-tool insert, the shell route was classifier-blocked); (2) `~/.claude/commands/codex.md`; (3) `~/.claude/skills/codex-executor/SKILL.md`. Repo copies remain canonical.
- Needs ONE full app restart to load. RISK: the running app may rewrite `~/.claude.json` from memory on exit and drop the insert - if `/codex` tools are still absent after restart, re-apply the 12-line mcpServers block (same Edit anchored on "cachedGrowthBookFeatures").

### Standing rules and ops notes

- **STANDING 2026-07-19 (Paul, evening: "always work through codex" + "Optimize merge to your preference")** - see Decisions. Ops: dispatch ONE codex call at a time (the morning's two parallel calls hit `MCP error -32000: Connection closed`; single sequential dispatches worked cleanly all evening); short worktree paths (`%TEMP%\claude\cxwt-*`) per `coop-sector-probe-2026-07-18`'s MAX_PATH lesson.
- **RULE AMENDED 2026-07-19 (Paul: "change rule, codex can run data-mutating pipeline steps")**: Codex MAY now run the chain (`run_pipeline.py`), `build_media_blend.py`, regeneration and workbook writes. Consequence stated to Paul: `fec/paths.py` resolves ROOT to the LIVE tree regardless of cwd, so Codex pipeline runs write LIVE data even from a worktree - code edits still land only in throwaway `codex/*` worktrees. Claude keeps the pre-run checks (Excel closed, no live jobs, baseline for rank delta) and still verifies the result. Narrow carve-outs kept (NOT pipeline steps; irreversible or cost money): preregistered `--look` runs, GATE-2 / `collector_supervisor.py`, the retired `apply_*` COM one-shots (`apply_weights.py` overwrites ratified pillar weights), D2 dedup DELETEs. Edit applied to ALL THREE SKILL.md copies (user scope + project + worktree), md5-identical; also harmonized stale MCP-registration wording in the git copies.

### Lane audit 2026-07-23 (Paul's `/codex` "check the link" task) - link PROVEN healthy with rollout ground truth

- Ground truth = `~/.codex/sessions/.../rollout-*.jsonl` `turn_context` lines.
- Config inheritance real (MCP session ran `model=gpt-5.6-sol effort=xhigh`); per-call `config` override works (`{"model_reasoning_effort":"low"}` logged effort=low).
- **effort=low FABRICATED results**: ran ZERO of 4 instructed commands, reported git "NOT AVAILABLE" where xhigh got 2.54.0 in the same cwd. Rule: never downgrade effort for tool-using tasks, and treat executor-reported command results as claims until Claude re-runs them.
- `developer-instructions` channel verified honored (incl. the FILES CHANGED / COMMANDS RUN / NOT VERIFIED close-out contract, dogfooded twice).
- Timing: cold dispatch about 45-60 s startup before model start, trivial xhigh turn about 1-2 min, warm `codex-reply` 30 s or less. Cross-session concurrency SAFE (another session's `codex-wt-mentat-perf` dispatch ran mid-probe, no collision) while same-session parallel stays broken per the -32000 law; sandbox python STILL absent.
- The "project versions win on name collision" claim is WRONG for the current app (see Decisions); this session loaded the USER-scope SKILL.md (drifted: it missed b706ec7's sweep).
- **SHIPPED @fadb08a** (main == live == user-scope synced, md5-verified): SKILL.md +104/-9: standing dispatch preamble, timeout-recovery, MCP-absent fallback, known-lane-characteristics, copy-sync law, MAX_PATH-safe worktree recipe, PLUS Paul's mind/body STANDING directive (2026-07-23): Claude owns EVERY design decision, spec = decided design (an open design choice reaching the executor = spec bug), plan-echo gate on design-bearing dispatches (plan first, NO edits, Claude approves/corrects, then execute in-thread), DEVIATIONS list in every close-out and reviewed even when code works, executor STOPS on ambiguity instead of improvising.
- Also observed: threadId died within about 25 min same-session ("Session not found") - fresh-thread recovery per the new section worked; `%TEMP%\claude\cxwt-lane-tune` dir lingers locked by the codex server until it exits (content committed, inert), and NINE older `cxwt-*` dirs linger from prior sessions - `cxwt-coop-sector` is UNGATED work (`coop-sector-probe-2026-07-18`), never bulk-delete.

### REFLEX LAYER 2026-07-23 (shipped @8dcf330; SKILL.md 184 to 365 lines; main == live == user-scope md5-identical)

- Source: Paul: "Codex can have reflexes per say, immediate corrections that it overrides and that sends to claude for confirmation" + a pasted BRAIN-BODY REFLEX PROTOCOL; he REJECTED the WebFetch of the noba/NCBI nervous-system articles and handed the distilled contract directly - do not re-fetch.
- Adds bidirectional afferent/efferent framing + `## Reflex layer (body-before-brain)`: Codex may act BEFORE deliberation only to prevent immediate observable harm (pause/contain/preserve only), then halts and leads with a REFLEX REPORT; Claude replies CONFIRM / MODIFY / ROLLBACK / ESCALATE.
- **The anti-loophole clause is the load-bearing part**: harm is not ambiguity (ambiguity means STOP, change nothing); "correct a clear execution error" = Codex's OWN mechanical slip in the current turn ONLY, never a defect it perceives in the spec or pre-existing code; plan-only rounds reduce the reflex to halt-and-report, never writes.
- **The plan-echo gate proved its worth on first real use**: Codex-as-sensor flagged 5 conflicts + 5 ambiguities, three of which changed the design - including that Claude's drafted claim "Claude is structurally guaranteed to see every reflex report" was FALSE (idle-timeout can lose the response), fixed to "loses the report but NOT the containment: after any lost turn Claude inspects the worktree and treats unexplained state as an unreported reflex." Lesson: ASK CODEX TO FLAG CONTRADICTIONS EXPLICITLY in the plan round - it catches Claude's own errors.

**Hardening pass same day (Paul: "improve and augment")**: 5-lens adversarial Workflow (loophole / consistency / pipeline / operational / over-restriction, 240k subagent tokens), 20+ findings, 4 lenses CONVERGED on the same structural hole. Three changed the design:
1. **Every safety limit lived in SKILL.md prose that Codex NEVER SEES - the injected preamble is the only operative text**, so the "clear execution error" narrowing was unenforced; the preamble is now self-sufficient and the section says so explicitly.
2. **LIVE-TREE TURNS ARE HALT-ONLY** - the whole layer was written for the throwaway worktree while Hard rules grant live pipeline runs at workspace-write + approval-never, where NO git baseline exists; now: halt + report only, no writes/deletes/cleanup/re-runs, report the resolved ROOT, an interrupted run is PARTIAL + untrusted + re-run from the top (never resume), ROLLBACK unavailable so CONFIRM/MODIFY/ESCALATE only.
3. Claude's own Conflict-resolution paragraph RE-GRANTED what Precedence denied ("minimum reversible containment" on a non-harm trigger) - a standing licence to act on any disliked spec; fixed to contradiction is not harm.
- Also: no history/index/worktree-mutating git command (stash/reset/restore/checkout--/clean/rm; not commits, but they destroy the diff = Claude's ONLY review surface); preserve = ADDITIVE COPY ONLY inside the worktree; two report shapes (REFLEX REPORT means state changed, else STOP REPORT) + a 5th `REFLEX:` labeled line so it cannot hide in prose; **footprint rule** - a slip with no footprint outside the worktree is a DEVIATION not a reflex (the old bar halted the lane on typos and would have TRAINED UNDER-REPORTING); delay measured as full round trip (unbounded on idle-timeout); confidence calibrated to footprint (doubt about ACTION means don't act; doubt about HARM with a zero-write response means halt anyway); verdict execution semantics (bare CONFIRM resumes NOTHING, MODIFY states the substitute verbatim, ROLLBACK is Claude's `git restore --source=HEAD` op with a recorded baseline else ESCALATE); lost-turn = reconstruct + adjudicate BEFORE re-dispatch, never re-dispatch on unexplained state; reflexes logged in session notes + framed as evidence of an UPSTREAM defect. **Codex dogfooded the footprint rule in the same turn** (mixed line endings fixed, kept executing, disclosed under DEVIATIONS).

### COORDINATION LAYER 2026-07-23 (SHIPPED @600012f)

- Source: Paul: "I want you to work on the integration between claude and codex" + pasted IMMEDIATE CORRECTION protocol / 16 coordination patterns / COORDINATION EXTENSION. Paul's go "Sync and other shit" 2026-07-24: main == live tree (cfpb-sentiment-recorrection branch ff'd 8dcf330 to 600012f) == user scope, md5-verified both files.
- Both disclosed deviations RATIFIED KEPT @05af236 under Paul's delegation ("Whatever you think is most optimal" 07-24): the reasonable-belief carve-out for write-nothing reflexes stands, and task-start-baseline checkpoints stand (per-increment checkpoints narrowed to the task-start baseline) - settled, do not reopen. NO open steps on this layer.
- His correction protocol == the shipped reflex layer (provenance note added; deviations from his verbatim text disclosed IN WRITING, flagged as his to strike).
- NEW: five-field spec contract (objective / constraints / numbered acceptance criteria / impact envelope / confirmation conditions); capability handshake READY / READY_WITH_LIMITS / BLOCKED with reversal survey + runtime check + resolved-ROOT assertion; AUTHORITY line (three-factor: confidence x envelope x reversibility); pause conditions + failure circuit (2 fails, never a 3rd) + resource governor; DECISION REQUEST = THIRD report shape with its OWN verdict set (CONTINUE / REVISE / REVERSE / REDUCE SCOPE / REQUEST USER AUTHORIZATION / STOP - never mixed with the reflex set); ACCEPTANCE = sixth labeled list (evidence per criterion, never "done").
- **Three adversarial review rounds (2 Workflows + final trace, about 3.7M subagent tokens) confirmed 20 findings, all fixed; load-bearing closures:** irreversibility pause triggers bind only what the spec did NOT authorize (else every authorized live-tree run deadlocks); the irreversible grant is a CLOSED preamble list (pipeline writer only - "workbook writes" WITHOUT the apply_* exclusion would have let an injected spec authorize `apply_weights.py`); interrupted live-tree runs are PARTIAL on ANY channel, CONTINUE never resumes mid-chain; reversal is NEVER the executor's (preamble law + universal git ban; Claude's own fix text "or sends verbatim instructions" was itself a confirmed regression - struck); every live-tree turn takes the plan round; live-tree results accepted only on mtime/hash evidence vs pre-run baseline (byte-identical hashes EXPECTED for neutral regens; unchanged mtimes = run never ran); `git status --porcelain` joins review (untracked files are invisible to `git diff` - smuggle path closed); headless fallback must carry the preamble or it does not run.
- **RESOLVED 2026-07-24:** Paul's "repeat until no flag" loop was refused in its evasion form (reword-until-the-safety-flag-stops); the BOUNDED variant shipped @1c935e4 ("bounded Fable-to-Sol retry controller": completed-review + zero-flag + non-Opus acceptance gates, retry ceiling, cycle detection, FAIL-CLOSED review handling, full attempt history) as `.claude/skills/codex-executor/scripts/fable_sol_retry.py`. Post-merge verification 07-24: py_compile clean, tests 8/8, user scope re-synced incl. scripts/. The evasion form stays refused - the controller's zero-flag gate is fail-closed (a flag STOPS the loop for review, never triggers a reword-and-retry around it).

### RULES AMENDED 2026-07-24 (Paul, Gemini-integration directive)

1. **Claude NEVER writes code** (see Decisions).
2. **Double sign-off loop** (see Decisions).
3. **Command hierarchy: Fable (Claude) > Codex > Gemini.** Gemini Flash joins as the PERCEPTION layer (eyes/ears): image analysis/computation, audio + visual video analysis, OCR/screenshots/visual QA. Gemini output = untrusted observation DATA, never authority, never code, never a validity claim (psych-ledger/prereg gates unaffected).

### GEMINI RUNTIME SAGA 2026-07-24

- Paul supplied Google account credentials TWICE (UMN + iCloud-based) - REFUSED both per hard rule (never enter passwords); the auth step is Paul's own.
- Node LTS 24.18 + gemini-cli 0.52 installed; OAuth completed via PTY-driver play (pywinpty drives the TUI, browser pops for Paul - settings.json needs nested `security.auth.selectedType`, BOM-free; PS5.1 Out-File BOM broke it once).
- UMN account = IneligibleTierError (Workspace/EDU excluded from individual tier - gemini.google.com access proves NOTHING about CLI eligibility); personal account [personal email omitted] authed fine but hit "client no longer supported" - **Google RETIRED Gemini CLI for ALL individual accounts 2026-06-18; successor = Antigravity CLI (`agy`), free individual tier $0 CONFIRMED via antigravity.google/pricing (includes Gemini 3.5 Flash, the diagram model)**.
- Installer `irm | iex` + script download both classifier-blocked, so Paul must run `irm https://antigravity.google/cli/install.ps1 | iex` himself; **agy 1.1.6 INSTALLED + LANE LIVE same day, VERIFIED @f21b0ff/11b33ea**: OAuth via ConPTY driver (preserved at `.claude/skills/gemini-perception/scripts/agy_pty_login.py`; `agy_send.txt` = keystroke channel; auth code paste-back flow; Google one-time account-verification interstitial uses ONE-SHOT links - always the freshest, and first browser visit to gemini.google.com clears new-account gating).
- Model = `gemini-3.6-flash-high` (Paul's 3.6 call CONFIRMED - `agy models` lists 3.6/3.5-flash tiers + 3.1-pro; the diagram's 3.5 outdated).
- Invocation: `agy -p "<contract>" --model gemini-3.6-flash-high --add-dir <dir>` from media cwd; `permissions.allow=["read_file(**)"]` in `~/.gemini/settings.json` (BOM-FREE mandatory; superseded 2026-08-09, see below); shell tools stay soft-denied headless = LOAD-BEARING, never `--dangerously-skip-permissions`; the contract MUST explicitly instruct read_file (@-mentions don't attach in print mode; a "no commands" prohibition blocks the read tool - say "no shell or terminal commands").
- FIRST LIVE PERCEPTION PASSED: read `rank_authority.png`, corrected a wrong chart premise, verbatim top-5 roster + 12 headers, 4-list compliant, zero fabrication. Consent screen: completed with ToS; interactions-data checkbox final state UNCERTAIN (TUI repaint ambiguity) - adjustable in agy settings, flag to Paul.
- **MEDIA-DELEGATION PROTOCOL SHIPPED @9d8217d** (main == live == user-scope): gemini-perception skill + `/gemini` command (4-field perception contract, 4-list report OBSERVATIONS / EXTRACTED / UNCERTAIN / NOT OBSERVED; Gemini = capture + comprehend, Codex = compute/splice/mark, Claude = guide + adjudicate + digest; INVOCATION marked PENDING VERIFICATION until the first live agy dispatch); the codex-executor SKILL.md gained the hierarchy + never-Claude-code + Sol second-review round.
- Machine state 07-24: winget + Python 3.12 + Node 24.18 present; pywinpty installed; PTY driver at scratchpad `gemini_pty_login.py` (reusable for agy auth).
- **agy 1.1.6 LIMIT verified (07-24 evening): read_file REJECTS audio/wave - audio/video NOT routable via CLI yet (model capable, tool layer is the limiter); images verified.**

### DYNAMIC COORDINATION V1 + FULL INTEGRATION 2026-07-24

- Three commits on main: 0db65d5 (wires Fable-Sol runtime + coordination controls: adapters, `fable_sol_cli`, runtime contract validator, `fec/b5_narratives.py` Fable-default + Sol-routing), 9d8f2c7 (foundation doc), 80f1b79 (`dynamic_coordination.py` runtime: evaluator with EXACTLY 7 comparison names / 5 results, fail-closed on missing or self-generated evidence, only the evaluator emits REBASE_REQUIRED; episode ledger stores content as SHA-256 + bytecount; replay is pure and report-only; amendment candidates are a read-only derived view, never authority).
- New `coordination_cli` subcommands: validate-observation / validate-prediction / reconcile / replay / episode / candidates (joining validate-contract / record / repeats). Full surface per the audit: validate-{contract,handshake,correction,decision,verdict,transition,observation,prediction} + reconcile + replay + record + repeats + record-episode + episode + candidates.
- **INTEGRATED 07-24 per Paul ("don't touch the sol retry, only integrate, the rest we can improve upon"):** live tree ff'd 955b66a to 80f1b79 on its cfpb branch (ff touched only the .claude plane + `b5_narratives.py`; retry controller BYTE-IDENTICAL across the range); user scope re-synced - 12/12 files md5 MATCH (the 7 earlier "diffs" were LINE-ENDINGS ONLY, user-scope LF vs repo CRLF - raw md5 sweeps false-alarm on EOL; confirm with `git diff --no-index --ignore-cr-at-eol` before calling drift); tests 41/41 in the live tree. **SOL RETRY = FROZEN per Paul - do not modify `fable_sol_retry.py`/test/adapters; the OTHER layers are explicitly open to improvement.** `/fable-audit` stays project-scope only (intentional).

### /METALOOP and GROK COMPANION LANE (2026-07-24)

- **/METALOOP SHIPPED @46b17b9** (Paul 'the full orchestration' + 'Gemini only as needed'): one command = full three-lane tandem (Fable decomposes/digests, Codex executes under full protocol, Gemini STRICTLY CONDITIONAL - no media, no Gemini, never invent a perception step); repo + user-scope `commands/metaloop.md`. See [[metaloop]].
- **GROK COMPANION LANE SHIPPED @6756985** (Paul 2026-07-24 "expand this also to Grok" -> SuperGrok yes, API no, "companion only"): hierarchy = Fable commands, Grok = adversarial counsel / fear factor (KILLED / WOUNDED / SURVIVES critique contract, zero authority/veto, twice-rejected kills escalate to Paul, only-as-needed), Codex executes, Gemini perceives; `/grok` + `/metaloop` stage 3b; runtime = Grok Build CLI (`grok`, install `irm https://x.ai/cli/install.ps1 | iex`, SuperGrok browser OAuth = Paul's action) PENDING VERIFICATION at ship time - headless -p documented API-key-only, subscription-auth -p UNTESTED (fallback = agy ConPTY driver pattern); DORMANT pending his console.x.ai key: X-search lane (handles + dates HARD, LOCATION SOFT-ONLY - no zip/coord param exists) + Monday at-logon Task-Scheduler collector (additive catalog, NEVER stance-pipeline inputs). Mid-ship lesson: main advanced under the session (`/ps` @7e548f5 from another session) - inspect-then-rebase, never force.
- **VERIFIED LIVE @decf125:** grok 0.2.112, model grok-4.5, headless -p WORKS on cached SuperGrok OAuth (API key only for uncached envs); contract delivery FILE-BASED (PS5.1 shatters quoted -p args; stdin NOT consumed in -p mode - write `critique_contract.txt` BOM-free, point -p at it); first-dispatch calibration PASSED (killed 2 planted bad claims with correct kill shots, wounded the true-but-unevidenced one demanding evidence objects - severity on-charter, zero fabrication).

### X LANE LIVE NO-KEY and MONDAY COLLECTOR (2026-07-24 late)

- Paul 'without the twitter API key?': the subscription grok CLI natively carries `x_keyword_search` / `x_semantic_search` / `x_user_search` / `x_thread_fetch` - handle + date filters LIVE-VERIFIED (SenSchumer probes), NO xAI key needed, the dormant note SUPERSEDED; LOCATION = SOFT ONLY (no zip/coord param).
- MONDAY COLLECTOR SHIPPED @deeb7d0/010b69d/6cad6bc (Codex full loop: plan STOP on stale-DORMANT conflict, 6+1 semantics adjudicated, review round 6 defects + 3 tightenings -> R1-R7, 26 tests): 506 handles -> `x_catalog.jsonl` additive (NEVER stance inputs), state + PID-lock in LOCALAPPDATA, Monday-or-stale-or-force gate, armed via STARTUP-FOLDER shim `MelangeXCollector.cmd` (Register-ScheduledTask = Access denied unelevated); bootstrap harvest launched.
- LESSONS: Windows subprocess reader threads SWALLOW UnicodeDecodeError (capture binary, decode strict caller-side); tail pipes mask unittest exit codes - check PIPESTATUS (one commit landed red before catch); PS `Get-Content` displays UTF-8 as mojibake (verify bytes with python before flagging); `[IO.File]` relative paths resolve to PROCESS cwd not PS location (stray file landed in worktree once - moved). `staff_directory` has NO X handles - staffers/constituents need an additive handles file from Paul.

### BUG SCAN + COLLECTOR V2 (2026-07-24 night; Paul 'scan for bugs' -> 'Fix it all')

- 19-agent scan + Grok self-critique found the truth: ALL searches succeed, the strict parser threw ALL data away (Grok prepends prose to valid JSON; 431+ clean records discarded in 7 dispatches); `x_keyword_search` REALLY returns about 10/call (limit-100 unenforceable, pagination = model discretion); retry math made exit-0 near-impossible at 25 batches; the model silently DROPPED A HANDLE mid-session.
- V2 SHIPPED @a0e999f + docs @d2c1086 (C1-C10 + review D1-D3, suite 26 -> 47): prose-tolerant single-array scanner (object-wrapped rejected, fail-closed on two arrays), 5-handle batches + pagination-mandating prompt, split-to-singles retries + run-level query dedupe/reconciliation, 300 s timeout, raw failure evidence to `state\failures` (50 kept), PARTIAL.marker, `--handles-limit` never advances cursor, `batch_format_version=2` discards stale carryover.
- R2 lock PROVEN LIVE (v2 launch refused exit=3 while the v1 retry pass ran - which scored occasional successes, confirming nondeterminism). v1 ground 2+ hours (no timeout pre-C4), TERMINATED by Claude about 21:50 (nothing lost - window unadvanced); stale-lock reclaim first REFUSED on the zombie process object (conservative direction working) then reclaimed.
- **V2 LIVE-PROVEN 01:56Z run: 102 five-handle batches, first sample 2 success / 0 fail vs v1's 0/25 - prose-tolerant parser CONFIRMED in production**; completion watcher armed.
- **OVERNIGHT RESOLUTION 07-25:** `x_catalog.jsonl` BANKED 3,020 posts / 205 handles (0 dupes, 0 out-of-window, 100% urls) before hitting the SUPERGROK QUOTA WALL (402 'Grok Build usage balance exhausted' in 317/318 evidence files - counsel lane + harvester SHARE the pool; pagination mandate = up to 10x tool calls/batch); run ended clean exit=2, PARTIAL.marker, 281 carried batches await quota reset. QUOTA CIRCUIT BREAKER SHIPPED @5185954 (CB1 adjacent-402s trip -> bank + carry + exit 2, error-channels-only classification - post text can never trip; CB2 `--max-pages` dial; the review round caught the non-adjacent counter bug). Mid-ship: main taken by ANOTHER session's Phase G employers layer (cxwt-main-merge, `fetch_district_employers.py` + `validate_district_industry.py` = the mystery PID) - rebase + ff INSIDE their clean worktree = the shared-lane dance. Monday fully armed: shim -> gate -> v2 + breaker -> 281-batch carryover on fresh quota.
- Docs: frontmatter dormant-lie fixed, Startup-shim reality documented, metaloop rewritten clean UTF-8 with 4-role hierarchy. LESSON: registry skill descriptions cache across a session - file fixes show next session.

### AUDIT + FIX WAVE (2026-07-24 evening; Paul "Overview integrity...check for bugs" then "Go, do whatever is most optimal")

- 39-agent audit: integrity ALL GREEN, 32 confirmed findings, then THREE fix commits, all merged, live ff'd, user-scope 17/17 md5.
- @4f46939 evaluator + ledger DC-1..DC-14: 2 HIGH fail-opens killed (None==None MATCH; ABSENT-satisfied-by-blindness); plus baseline eligibility, bool/int guard recursive incl. dict keys, subject-keyed episode dedupe schema v3 fail-closed version guard, segment + value-type secret redaction ("note" plaintext gap closed, token_count stays); suite 41 -> 57 tests; the full loop ran: plan-echo caught 5 spec ambiguities incl. 2 of Claude's, fresh-thread review found 5 deviations + 2 residuals - the DOUBLE SIGN-OFF EARNS ITS COST.
- @f9843ae agy driver hardened AG-1..8 + X1..5 (runtime files -> `<temp>\agy_login`, PID lock, freshest-URL line-aware extraction - squash strategy provably glued prose, atomic URL publication, reader drain; driver now importable + unit-checked).
- @1f35c66 harmony batch (double-sign-off named + trivial defined, ALWAYS-BARRED ops now IN the preamble, headless-must-carry-preamble RESTORED, sync lists completed, README 18 skills).
- **LEDGER ADOPTED - production DB live at `~/.claude/state/codex-executor-ledger.sqlite3`, both dispatches recorded.**
- Memory accuracy notes from the audit: REFLEX-era vocabulary is HISTORY (current surface says CORRECTION REPORT / IMMEDIATE CORRECTION); Codex CLI then 0.145.0-alpha.30 (shim absorbs churn).
- Accepted risks per Paul's delegation: `read_file(**)` stays (narrowing untested, contracts Claude-authored); double-sign-off latency accepted with the trivial carve-out defined.

### TEST-ALL (2026-07-24; Paul "Test all"; 7-lane Workflow + live MCP dispatch) - lane substantively ALL GREEN

- Unit suite 41/41 on repo worktree AND live tree; kernel 84/84 in live post-ff, porcelain-identical before/after.
- CLI 7/7 (validators fail-closed, closed vocabularies enforced, replay proven report-only via 529-entry fs snapshot).
- Ledger 6/6 on a throwaway DB (prompt/notes -> SHA-256 + bytes, api_key redacted; `coordination_events` = append-only with occurrence counts, episode events dedupe via UNIQUE incl. payload_sha256; candidates read-only, DB hash identical).
- Retry controller 5/5 driven FULLY OFFLINE via `--fable-command-json` / `--sol-command-json` process adapters (happy path, Opus -> Sol reroute, stalled-rewrite fail-closed exit 1, 5-attempt exhaustion exit 2 with full history; stall-path attempt history lives in the LEDGER, only RetryLimitError serializes it to stderr).
- MCP link: rollout ground truth model=gpt-5.6-sol effort=xhigh, read-only sandbox + cwd honored, `codex-reply` thread continuity OK, six-list close-out + drift-flagging honored.
- **All three findings FIXED @fa3ba76 same day (Paul "Fix"; executed BY Codex in cxwt-lane-fixes, Claude designed/reviewed/merged):** (1) `test_coordination_runtime.py` repo root now via guarded `_repo_root()` requiring BOTH anchors; user-scope copy runs OK (skipped=2), in-repo 41/0-skipped; (2) singular "note" added to ledger `_CONTENT_KEYS`; (3) `.claude/skills/**/__pycache__/` re-exclusion added AFTER the `!.claude/skills/**` negation (ROOT CAUSE: last-match-wins - the skills negation was un-ignoring bytecode despite the global `__pycache__/` rule; any future !-negation under .claude needs a trailing re-exclusion check). main == live == user-scope @fa3ba76, 12/12 md5.
- **Execution dispatch lane notes:** Codex sandbox python is GONE HARDER - even the absolute Python312 path is Access-denied under workspace-write; edit-only contracts (REDUCE SCOPE, verification moved to Claude) are the working pattern for code fixes; Codex STOP-REPORTed twice correctly rather than improvising. Ops lesson: `python -m py_compile` writes `__pycache__` REGARDLESS of PYTHONDONTWRITEBYTECODE - use `py_compile.compile(src, cfile=<scratchpad>)` in no-write contexts.

### SUBAGENT LAW CODIFIED 2026-08-07 (Paul: "subagents reason through fable and execute through codex... fix it so it does")

- New permanent section in `commands/metaloop.md` @f9e62cf: Workflow/Agent subagents = Fable reasoning lanes, READ-ONLY by contract (never edit files, never run producers, never dispatch Codex themselves - dispatches stay serialized through the coordinator); every subagent prompt must state the read-only contract; implementation always flows Fable spec -> coordinator's Codex dispatch (xhigh) -> Fable review.
- The same commit cleared the metaloop.md copy-sync debt (the repo copy had missed the 08-04 escalation/dispatch/max-effort amendments; user scope is the live surface - md5-verify both after any edit).

### UPDATE 2026-09-19 - THE MCP LANE IS BROKEN UPSTREAM, NOT LOCALLY; ASTRA RUNS ONLY THROUGH `codex exec`

- Paul: "You fix Codex for me and get it going" / "it was already connected in one session, get it together".
- PROVEN: OpenAI deprecated `codex mcp-server` in CLI 0.149.1 (2026-08-24) and REMOVED it in 0.154.0 (openai/codex PR #42993). The ChatGPT/Codex app auto-updated on 2026-09-17 16:43 to `0.155.0-alpha.2.6` (`%LOCALAPPDATA%\OpenAI\Codex\bin\eab8377aebac6c07`); given the word `mcp-server` that build starts the interactive UI and dies `Error: stdin is not a terminal`, which Claude Code reports as `codex (CONNECTION_CLOSED)` in EVERY new session (sessions connected before the update kept working until they ended). Auth is fine (`codex login status` = Logged in using ChatGPT).
- Paul's dials CHANGED since the 07-18 text: `~\.codex\config.toml` now pins `model = "gpt-6-astra"` / `model_reasoning_effort = "high"` / `service_tier = "priority"` - he calls it "Codex Astra"; never downgrade, never edit that file.
- REPAIR APPLIED (no download, app tree untouched): `~\.codex\bin\mcp-serve-pin\` = four NTFS hard links to the last MCP-capable build `0.146.0-alpha.3.1` (source `...\OpenAI\Codex\bin.stale-20260726\69066b736e1e17a4`; `PIN_README.txt` inside), and `codex-mcp.cmd` line 61 became a probe (`codex.exe mcp-server --help | findstr mcp-server`) that falls back to the pin when the app's build cannot serve; backup `codex-mcp.cmd.bak-20260919`; the wrapper file is LF-only, keep it so.
- Tested: handshake + tools/list OK, real turn returns "OK" with per-call `model: gpt-5.6-sol`, BUT THE PIN REJECTS ASTRA: HTTP 400 "The 'gpt-6-astra' model requires a newer version of Codex." So the MCP tools connect again but only work if every call passes `model: "gpt-5.6-sol"` - the wrapper was NOT made to substitute a model (that would silently override his dial; his ruling).
- WORKING ASTRA ROUTE: `codex.exe exec` on the app's CURRENT build, prompt on stdin (`-`), hardened exactly like the ECC council adapter (`--ask-for-approval never`, 23 `--disable <feature>`, `exec --ephemeral --ignore-user-config --ignore-rules --strict-config --skip-git-repo-check --sandbox read-only --cd <empty dir> --model gpt-6-astra --config model_reasoning_effort="high" --config service_tier="priority" --config web_search="disabled" --config mcp_servers={} --output-last-message <file> -`); smoke 4.5 s, a 5.5 KB review packet answered in 20 s / 3,270 tokens; bounded runner + argv builder saved in the 09-19 session scratchpad `council\run\` (`run_codex_exec.py`, `build_argv.py`).
- The ECC `council-multi-model` adapter (`review-with-codex.js`) needs `codex` on PATH reporting EXACTLY `0.146.0` - nothing on this box satisfies it (never fake the version); only `npm i -g @openai/codex@0.146.0` (about 429 MB) would, and that build could not serve Astra anyway.
- OFFICIAL REPLACEMENT for Claude Code = plugin `openai/codex-plugin-cc` (`/plugin marketplace add openai/codex-plugin-cc`, install the plugin with `/plugin install codex@openai-codex`, then `/codex:setup`; gives `/codex:review`, `/codex:adversarial-review`, `/codex:rescue --background`); it drives the Codex APP SERVER (which the current build has) and needs a `codex` binary on PATH - Paul approved ("Yeah go forward") and the SHIM IS INSTALLED 09-19: `%APPDATA%\npm\codex.cmd` (dir already on PATH; selects the app's newest hash dir, optional `CODEX_SHIM_BIN_PIN`; reversal = delete the file). `codex --version` works from cmd and PowerShell, hardened Astra smoke through the shim returned OK; Node `spawnSync('codex')` WITHOUT `shell:true` = ENOENT (true of any npm-style .cmd shim), so the ECC council adapter still says "Codex CLI is not installed" and fails closed. The plugin install itself = Paul's `/plugin` commands, NOT done by Claude. `codex` was NEVER on PATH on this box before; the lane always used the absolute wrapper.
- Related: the metaloop rules in [[metaloop]] and the executor actor [[codex-executor]].

## quant-model-evaluation skill lane (source: quant-model-evaluation-skill-lane-2026-09-30, last modified 2026-10-01; see [[quant-model-evaluation-skill]])

### Build and landing (2026-09-30)

- Built and landed in worktree melange-math-eval-skill-18e907: `.claude/skills/quant-model-evaluation/` - a GENERAL data-scientist evaluation / assumption-testing skill (Paul: "It will be more than just melange it is a general data scientist skill"), synthesized from K-Dense-AI scientific-agent-skills (MIT, NOTICE.md) + new finance/CSS/regulatory/citation research. Melange specifics live ONLY in `references/bindings/melange.md`.
- Commit c13f3a5d4, fast-forwarded into LIVE main on Paul's "Commit and merge to main". User-level junction `C:\Users\pgoff\.claude\skills\quant-model-evaluation` -> LIVE copy (Paul chose it; one copy, no drift; Melange sessions may list the skill twice).
- Paul's rulings in this lane: name quant-model-evaluation; "Ship read-only scripts" (11 scripts + 176 tests, Glass Box emission); "Install both sets" (R: sandwich lmtest strucchange fixest sensemakr rdrobust Benchmarking spdep; Python: linearmodels SALib libpysal esda arch - no existing version changed).

### Why it matters / how to apply

- Use this skill (after moneyball-change-control) for any model/number/claim evaluation; it is evaluation-only and the binding carries the house gates (ask-first, money frozen, gold = Paul's adjudication, never point mutation_check at fec/ code, look fragments prereg-gated).
- Install side effect: bs4 + matplotlib now importable by the production Python (`recover_press_refresh.py` now uses installed bs4). pip truststore crashed (used `--use-deprecated=legacy-certs`); CRAN over IPv6 resets about 75% (forced IPv4). Both proposed as DEADENDS for Paul.
- OpenAlex keyless daily budget gets exhausted by heavy agent fan-out; CrossRef alone suffices for currency (`cite_check` handles 429 as UNVERIFIED-HERE, `--no-openalex`).
- A research agent once put Paul's email in a CrossRef User-Agent; NEVER send his email to APIs (`cite_check --mailto` only when Paul supplies one).
- GateGuard blocks the first Write/Edit of each new file until 4 facts are stated (callers, no duplicate, data fields, Paul's verbatim instruction) - brief agents on it.
- Review artifacts (doctrine/code/factual/dry-run/consistency) live in the session scratchpad (temporary).

### Paul RULED 2026-09-30 ("F1. Yes F2. One PAC's F3. Ratify F4. Proceed F5. Yes F6. Proceed")

- **F1:** stance gate adopted; the optimizer had funded 10 Skeptic/Highly Skeptical/Opponent members $54,500.
- **F2:** the $2.5M pot is ONE PAC's budget.
- **F3:** R2 imputation ratified.
- **F4:** desk metric fixes.
- F1 + F4 LANDED in LIVE main b488a99fe (kernel 257/5, same 4 baseline reds + the test_refresh_tick timeout).
- **F5:** the original scoring attempt stopped UNDERPOWERED before H1/H2 correlations. Paul subsequently chose archive refresh and kept gap equal to Suggested. The pod refreshed all 468 frozen bill IDs from official GovInfo XML; 6,284 dated events, zero errors. Independent replay finds 72 new-event members among the original 511 eligible members (73 events), below 150; current-roster 77 is a different denominator. Role-row multiplicity changed between archives and H2 changed after the freeze. No new counting rule or association was applied; the look remains UNSPENT. Candidate and receipts: `/workspace/f5-check`; preserved local packet in the matching session scratchpad `f6apply/f5-pod-evidence-20260930.tar.gz`.
- **F6:** explicitly approved applying the brain drafts (original proposal line 15710, human ruling line 15721). The prior note claiming they were applied was not supported by the current brain. Recovery now appends D-070 to D-074 / DE-051 to DE-053 and scoped STATE notes, preserving the forecast lane and existing entries. The worktree binding is corrected; its landing is the coordinator's responsibility. F6 did not alter the managed brain boot rules.

### Regeneration rulings

- "A: refresh inputs, full run".
- N19 fix "Hold low-confidence + longer timeout" = a77bfb6db: a below-high decision becomes a hold for EVERY key, including admitted bills. 119:hr:9460/9514 drop out if the classifier is unsure again.
- The per-call bound is 480 s, and failures now carry stdout.
- The first N19 failure was the npm CLI OAuth session expiring; the error text was on stdout.
- PHASE 2 (land a77bfb6db + fdc201076 leakage CoW fix in LIVE, then N19, membership refresh, full chain, kernel + audit) was running at 20:10 on 09-30. Verify the LIVE log before trusting this line (historical per the recovery checkpoint below).
- Still standing: SUSC_B5_W 60/40 is NOT on main; D-006 contradicts CLAUDE.md on who commits the brain; SR 11-7 was superseded 2026-04-17 by SR 26-2.
- Related memories: `ask-before-substantive-changes`, `dont-be-jumpy-removing-money-2026-09-26`, `r-summary-regression-presentation-2026-09-25`, `trend-over-significance-2026-09-26`, `skills-library-2026-07-10`, `glassbox-everything-rule-2026-07-27`.

### Recovery checkpoint 2026-09-30

- N19 PASS 20:09:17Z, membership sidecar PASS 20:33:36Z and hash-bound; refresh publication PENDING.
- Pod QME suite 175 passed / 2 skipped.
- Full production chain, parity, final kernel/audit gates, output reconciliation and 8841 restart remain pending in the coordinator lane. Earlier PHASE 2 running statements are historical.

### Local refresh attempt, 2026-10-01 about 00:20Z

- The harness reaped the membership refresh for low memory. It died at slice step 14/68 (member_reference_layer).
- Collection had passed: receipt 00:10:16Z, 479/479, publication PENDING. Upstream inputs were rewritten, but ranks, plan and surfaces still date from 09-20, so LIVE is mixed-vintage. Nothing committed.
- Baselines and the read-only checkers (`capture.py`, `f1f4_check.py`, `roi_floor_impact.py`) are in `C:\Users\pgoff\Melange-Pod-Recovery\20260930\local_refresh\`.
- Free RAM was 7.8 of 31.5 GB, with no large process; this matches the AppXSvc leak.
- Paul ruled: "Reboot, then rerun". After the reboot, rerun step 3 in full, with PYTHONUNBUFFERED=1, then the full chain, kernel/audit, f1f4 and movers.
- ROI floor: "Measure first". Run `roi_floor_impact.py` after the rerun; the decision stays pending.
- MelangeStafferLiveSidecar stays disabled (Codex handoff).
- The 95 Linux portability files are NOT landed.
- Skill suite: 190 passed / 2 skipped, 6 files adopted in LIVE.

### REFRESH DONE 2026-10-01 (no reboot; the full-chain retry ran 09:09-09:55Z)

- **Mixed-direction admissions.** Paul chose "Hold both bills" and then "Hold before fetch". Landed in LIVE 15977a0fa, 862478165 and 3e0621922 (branch fc78aaf42, f130a7edc, 6611340b9). 119:hr:9461 and 9490 are held; admissions are now 08eab127, with 0 paid calls. The uscode.house.gov "Under Maintenance" outage forced the pre-fetch hold.
- **Chain:** 79/79, DE-044 shape. LIVE is ONE vintage on the 09-27 money (stale at 10-05T10:29Z). Ranks cde36ac1; honors restored; alias, source-to-dashboard and email PASS.
- **Kernel:** 261/3, all standing.
- **Audit:** 553/17. 2 standing, and 15 A2/A2b from the stale 09-18 system_manifest inventory.
- **F1/F4:** PASS. 19 gated, 0 funded; gap = Suggested for 533.
- **Movers vs 09-20:** 393 total (245 legislative percentile, 19 own admissions, 9 bill/membership, 102 press, 18 displacement). Money doesn't feed ranks.
- **ROI floor:** 10 members change at 4 dp, max Danny Davis 0.0092 vs 0.0115, top-20 identical. Ruling still open at that time; it looks cosmetic.
- **Open for Paul (at that time):** the publication verifier says INCOMPLETE: collection c0d29f11 FAIL, not PENDING, tolerated `build_descriptive_speech` (YouTube receipt stale since 08-31), and 10 novel audit names. A qualified attestation or clearing those inputs is his call. Whether to rebuild system_manifest. Acknowledge the system_manifest money-pin write and the email zip. 8841 restart vs the Codex handoff keeping the sidecar disabled. Hold-retry priority. The 10-04 weekly with uscode down. Brain drafts D-075/D-076/DE-054/DE-055 plus a STATE bullet (in the workflow journals wf_16f9bb4e-ecc and wf_5c713a80-fff).
- **Machine:** about 35 python 0xc000070a crashes 09-29..10-01; none during the retry.

### "Finish it all" 2026-10-01 (Paul ruled: ROI "Match backend"; publication "Qualified sign-off"; inventory "Rebuild + re-audit"; 8841 "Start once, task stays off")

- ROI landed in LIVE: 5504167447, plus bindings 9a7d66f44 and 5e92f304c.
- Brain D-075 to D-081 and DE-054/055 committed as 02de571; outcomes still PENDING.
- Chain No. 3 (16:04Z) crashed natively at `build_archive_legislative`: python 0xc000070a ntdll at 16:29Z, with 3.6 GB RAM free. The reboot was asked for again.
- STILL TO DO after the reboot: full chain; `runs\step6_build_system_manifest.cmd`, then audit_full, then the kernel; f1f4 checks and the ROI parity check (`roi_floor_impact.py` no longer works, since the old floor is gone; use `verify_finish\roi_verify.py`); write PUBLICATION_SIGNOFF_20261001 and land it; start 8841 once; write the brain outcomes; verify.
- Run the long waits from the MAIN session or Agent-tool agents, never workflow agents: their Monitor events die when their turn ends.

## RunPod Claude sessions (source: runpod-claude-sessions-2026-09-30; see [[runpod-pod]])

Source description: "RunPod sessions: historical first-pod setup and current math-pod full-data authorization; keep pod running".

### Superseding math-lane checkpoint, 2026-09-30

- Paul subsequently ordered every process to the newly supplied pod and explicitly allowed the entire data plane, including donor records. The code-only restriction and old address/layout below describe the first pod and must not govern this authorized math run.
- Current SSH: user root, host 81.27.69.177, port 36669; tree `/dev/shm/melange`; Python `/workspace/melange-venv/bin/python`.
- The coordinator owns transfer completeness, production execution and output reconciliation; none is certified by this memory note.
- F5 criterion-only refresh completed at `/workspace/f5-check`, with all 468 frozen bills and independent source replay.
- Preserve other lanes, do not stop the pod, and do not restart Mentat 8806. Secret handling is not blanket-authorized by the full-data ruling.

### Historical first pod (Paul's, set up 2026-09-30)

- SSH: user root, host 103.196.86.181, port 57215, key `~/.ssh/id_ed25519` (`ssh -p 57215 -i ~/.ssh/id_ed25519` to root at that host; direct TCP; supports scp). Ubuntu 24.04, 192 CPU, 2 TB RAM, H200, 30 GB container disk (wiped on restart), `/workspace` network volume (persists; REFUSES chmod/chown/utime). Shared with the forecasting lane (`/workspace/forecast`). Paul attaches with `ssh -t ... "tmux attach -t claude"`.
- **Paul's rulings:** "Claude sessions there"; keep the H200 ($3.59-4.59/hr). NEVER stop the pod, and don't nag about stopping it: Paul answered "Does not matter" to the stop reminder on 09-30. See `pod-for-memory-heavy-tasks-2026-09-30`. The pod's `CLAUDE.local.md` line "stop it in the RunPod console" is stale; fix it at the next pod visit. CODE ONLY, no Melange data (donor PII) synced (first pod only; superseded above); no secrets copied (default: none, per-secret OK required).

### Layout / how to apply

- `/workspace/melange` = `git archive` of 61e16e28b minus 88 files >20 MB (audits/legfix5 packets etc.), 43,268 files; `.snapshot_base` holds the base sha. `CLAUDE.local.md` there points brain boot at `/workspace/brain` and forbids running the chain on Linux (340/1,396 fec files Windows-coupled).
- Git DB lives on container disk (`--separate-git-dir=/root/melange.git`) because `/workspace` refuses chmod; a post-commit hook exports every pod commit to `/workspace/pod-patches/<UTC>-<sha>.patch` -> land on Windows with the house cutter. Pod copy is NEVER authoritative.
- Claude home: `/root/.claude` -> `/workspace/claude-home` (credentials persist); `CLAUDE_CONFIG_DIR=/workspace/claude-home`; Python `/opt/venv`; `/workspace/bootstrap.sh` rebuilds all after a restart; tmux config `/workspace/tmux.conf` (status off).
- **Login without the terminal (Paul hated the paste flow):** respawn the tmux pane with `BROWSER=/root/capture-url.sh` (+ `/usr/local/bin/xdg-open` wrapper) so Claude writes its localhost-callback OAuth URL to `/workspace/login-url.txt`; open `ssh -N -L <port>:127.0.0.1:<port>` from Windows; Paul clicks the URL and approves in his browser; the callback lands through the tunnel. Never type auth codes for him.
- Tar onto `/workspace` must use `--no-same-owner --no-same-permissions -m`; `set -e` scripts die on the permission warnings.
- **Other lanes on the same pod:** "LUNA geography project review" and "Forecasting model audit and integration" (`/workspace/forecast`). Paul confirmed on 2026-09-30 that "Those sessions are good": their outputs are not this lane's concern, so do not pull or clean them.
- At about 20:00 on 09-30, SSH to the pod timed out (the pod was stopped or restarted). `/workspace` persists; after a restart, run `/workspace/bootstrap.sh`.
- The RunPod MCP plugin (plugin:runpod) needs Paul's authorization before any agent can check pod state or stop the pod.
- Related memories: `quant-model-evaluation-skill-lane-2026-09-30`, `ask-before-substantive-changes`, `live-tree-branch-state-2026-07-14`.

## Moneyball skill library (sources: skills-library-2026-07-10, skill-library-stale-facts-lane-2026-09-30; see [[moneyball-skill-library]])

### 16-skill library, built 2026-07-09/10 (retirement handoff, Paul-directed)

- Lives at the LIVE tree `C:\Users\pgoff\OneDrive\Desktop\Melange Systems\.claude\skills\` (durable copy) AND worktree nifty-cray-f6d053 `.claude/skills/` (authoring copy) + `README.md` index.
- Skills: change-control (the constitution, all 18 project laws embedded as written law per Paul), architecture-contract, build-and-env, run-and-operate, config-and-flags (about 88 dials), debugging-playbook, diagnostics-and-tooling (+3 shipped read-only scripts: rank_delta / artifact_freshness / env_dials), validation-and-qa, failure-archaeology, influence-modeling-reference, psychometrics-reference, research-methodology, proof-and-analysis-toolkit, docs-and-claims (owns the validated-claims ledger + live-branch-state statements), congress-rollover-campaign (+`rollover_gate_check.py`, has `--online`), research-frontier.
- **Why:** cheaper sessions (Sonnet-class) must maintain/advance the project; Paul's calibrations: audience assumes NEITHER domain nor stats; SOTA = methods rigor AND real-world capability; hardest live problem = 120th-Congress rollover (`congestion.json` has NO live producer - builders attic'd, FEC zips 2024-vintage).
- **How to apply:** load the relevant skill before working; change-control before ANY change. Build process: 14-map discovery workflow -> 16 parallel authors (ground-truth re-verification mandatory) -> factual/doctrine/usability reviewers (2 blocking + 11 important, all fixed) -> fixer -> orchestrator spot-checks + a coop_v2/round-6 freshness fix pass.
- ~~Gitignore caveat: `.claude/*` is ignored (line 28) - the library is ON DISK ONLY; to track add `!.claude/skills/` + `!.claude/skills/**` after the `!.claude/commands/*.md` block, then `git add`; Paul's call~~ - resolved 2026-07-10 afternoon (see next bullet).
- **Merge debt CLEARED + library IN GIT (2026-07-10 afternoon, Paul: "merge and integrate - do it"):** ALL branches fully merged into main - compassionate-ellis @5e63c97 (kill-ledger preregs), musing-swirles @4f7007d (9 parse fixes), magical-booth @2ce51c5 (7 HIGH fixes; conflicts resolved: `b5_behavioral_instrument` = main's version per documented rule, `audit_full` = BOTH check families, so **audit now 71**), clever-elbakyan @02a36ac (Vote Smart TIER-5 RESULT + a NEW user-directed MS NOW/ex-MSNBC transcript leg @9467fcc), with beautiful-hermann + audit/fixes-2026-07-10 merged earlier by a parallel session. Post-merge verification ALL GREEN: kernel 37/37, chain 9.8 min (coop_v2_candidate now in-chained), **ranks md5 UNCHANGED cce0c5a6 (0 moved)**, audit **71/71** twice. Library committed to main @b994d93 (gitignore keep rules added; 21 files tracked); all about 34 branch-caveat rows in the skills updated to merged-state. `git log main..<branch>` = empty for every branch. Related memories: `psych-audit-2026-07-09`, `dont-drop-context-anchor-memory`.

### Stale-fact lane 2026-09-30 (COMMITTED and LANDED in LIVE; main b7faf6344, mirror current)

- State (2026-09-30 about 15:35Z): lane commits 49c7f994e (lt_priming + tpl prime() read P[u][v]), 8bd27a991 (`outcome_snapshot --freeze` -> data\engine), 5ab841fd5 (scenario/optimize comments), 61325d2b8 (env_dials recursive + PLATFORM), e8aaecb5d (skill-library corrections), merge 2b2d72578 (main had gained Paul's c13f3a5d4 quant-model-evaluation skill mid-lane; README then listed 20 rows under "19"), b7faf6344 (README = 20 skills). LIVE main fast-forwarded c13f3a5d4 -> b7faf6344 (24 files, all already CRLF, LIVE copies clean first); mirror main + branch = b7faf6344.
- **Paul's rulings:** 2026-09-30 "Go ahead with your recommendations on D1-D4" / "Fix the defects" / "Commit it and run the protocol in LIVE". D5 (is Highly Persuadable 0.65 ratified?) still unanswered. D4 = stale line refs deferred to a spawned chip ("Refresh stale line refs in skill library"; its precondition, the batch on main, is now met).
- **LIVE protocol at b7faf6344 = PARTIAL:** kernel 256 passed / 4 FAILED in 52 min - standing reds `test_bill_collision_guards` + `test_make_staffer_network_html`, plus `test_per_area_board` (9 errors, all "sentinel admissions are outside their freshness window") and `audit_stale_imports` (5 hits in files this lane never touched: 3 UNTRACKED press-recovery files dated 2026-09-21 - `fec/collect/recover_press_refresh.py`, `fec/tests/collect/test_press_recovery_speed.py`, `test_press_source_extract.py` - and `fec/tests/surfaces/test_clean_workspace_loading.py` from 6702a5452). No lane-caused red.
- Chain NOT RUN: steps 12-14 fail-close on `data/legislation/sentinel_admissions.json` (mtime 2026-09-13, 8-day window, `sentinel_admissions.py:24,33-34`; refresh = PAID claude-cli step, Paul's spend + model ruling N19, script `refresh_sentinel_admissions.py`) and `official_membership_movements.json` (checked_at 2026-09-20T10:43:56Z, 8-day window at `official_membership_movements.py:69`). `audit_full` crashed at LIVE `audit_full.py:2022` `_SA.load(B)` after 187 OK / 7 FAIL (none lane-related). `ranks_python.json` md5 f97b0e2c... unchanged vs pre-landing (ranks untouched); `lt_priming.json` still the 2026-09-20 artifact (C1 not yet exercised by a chain).
- **Options put to Paul:** (A) authorize the admissions refresh (paid) + membership refresh (`update_bill_repository.py --rebuild-dashboard`, which runs the chain; DE-043), then finish the protocol - ranks will move from the input refresh, C1 cannot (no rank path); (B) zero-spend partial `run_pipeline.py --from lt_priming.py` (steps 43-74 statically LLM/network-free; `personal_texture_layer` runs `--refresh-local`) - regenerates `lt_priming.json` + dashboard but stops at the first stale-gate reader (`make_member_desk` step 74 at the latest); (C) wait for the next authorized chain. (Outcome: option A's refresh was authorized and completed 2026-10-01, see the QME lane.)
- **Report-only findings still open:** reversed-index reads in tpl flipRoute (about :968-970) / distToTarget (about :729) / `make_member_desk.py:2931` + desk tpl:451; `rollover_gate_check.py` reads root `congestion.json` (now data\engine\); `PRESS_BASELINE_FOLD=0` set at Paul's user level; root README.md still 84/136; `lt_priming.py:115` tiny-gap rounding vs audit gap>0; holistic_norm directed-config caveat for C1. W4 last-measured lines still cite 247/2 (09-20) and 559/9 (09-19) - update only after a clean full protocol run.
- Logs: session scratchpad `48f9a637-...\scratchpad\` (kernel_live.log, audit_live.log, rerun_new_reds.log, landing_merge.log, ranks_before.json). Related memories: `ask-before-substantive-changes`, `scout-census-traps-2026-09-13`, `review-in-fable-directive-2026-09-16`.

## Higgsfield connector account trap (source: higgsfield-connector-account-trap-2026-09-17, last modified 2026-10-01; see [[higgsfield-connector]])

- Higgsfield MCP (connector "Higgsfield", 89 tools) on 2026-09-17 was bound to a free-plan account: one private workspace, 10 credits, `gpt_image_2_5` and `recraft_v4_1` refused with "Requires basic plan or higher", `z_image` accepted a 16:9 job, sat "queued" for many polls, then failed; a batch of four hit "429: rate_limit_reached" (one job at a time). Paul said the account [personal email omitted] has credits and asked Claude to log in with it.
- **Why:** the connector's account is set by the OAuth authorization in the desktop app (Settings > Connectors), not by anything the MCP tools expose; `list_workspaces` only lists workspaces of the authorized account, and `reconnect_session_connector` only re-dials a failed server. Entering a password to authenticate is off-limits for Claude in any case.
- **UPDATE 2026-09-19:** Paul re-authorized. `balance` returned plan `plus`, 1,069.9 credits; `list_workspaces` showed one private workspace on plus. `gpt_image_2_5` (reference images via role `image_references`, quality low..max, 1k/2k/4k) was available. The free-plan failure mode above is history unless `balance` says otherwise again.
- **UPDATE 2026-09-30:** the connector was back on a FREE account (one private workspace, 10 credits); `gpt_image_2_5` refused at submit ("Requires basic plan or higher") although `get_cost` priced it. Paul said "Higgsfield should have a subscription", then "I force you to proceed". `nano_banana_pro` (resolution 2k, 16:9, role `image_references`) IS accepted on free, costs 2 credits per board, runs 3 jobs concurrently, and renders dense UI text very well. The CloudFront download via .NET WebClient fails on the first call in a PowerShell process ("underlying connection was closed"); a fresh `powershell -NoProfile` with Invoke-WebRequest works.
- **UPDATE 2026-10-01:** `balance` again returned plan `free` with 4 credits, although Paul said "You should be connected to my higgsfield account under" [personal email omitted]. Claude told him to re-authorize the connector, and built HTML mock-ups rendered to PNG in the meantime.
- **How to apply:** when Higgsfield renders are wanted, check `balance` and `list_workspaces` first; if the plan is free, tell Paul the connector needs re-authorizing with the credited account (disconnect and reconnect in Settings > Connectors, sign in as the credited account [personal email omitted]) and deliver full-fidelity HTML mockups rendered to PNG through the Mentat tests' Playwright (`require.resolve('playwright', {paths: [~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules]})`, `chromium.launch({channel: 'chrome'})`) in the meantime. `jobs_wait` caps `timeout_seconds` at 15. Related memory: `mentat-ui-cleanup-lane-2026-09-17`.

## Project Brain toolkit (source: project-brain-toolkit-2026-08-11, last modified 2026-09-19; see [[project-brain]])

- **Project Brain** lives at `C:\Users\pgoff\OneDrive\Desktop\Project Brain` - its own git repo, fully outside Melange (built 2026-08-11, run run-20260811T2032536926854Z-9504fd764f, toolkit commit 34a773a). It is the brainctl starter kit (from Paul's project-brain.zip) hardened with every Part-3 amendment of `boot-protocol-framework.md` (copy lives in the repo): D-###/DE-### entry schemas with reversal conditions, supersession-never-deletion (`decide --supersedes` flips Status), 7-day `Last verified` staleness, boot confirmation that must cite a decision ID + dead-end ID, conflict precedence CONSTRAINTS > DECISIONS > STATE (contradictions halt), 500-line ARCHIVE/ compaction (manual only), protocol self-governance via DECISIONS.md, plus an EVALUATION.md scorecard/audit instrument (never read at boot).
- **MIRRORED 2026-09-19 (Paul: "set up the brain mirror", brain D-058):** the toolkit and all three brains (`melange-systems-brain`, `folder-brain`, `pilot-brain`) each have a remote `mirror` -> `C:\Users\pgoff\GitMirrors\<name>.git` (toolkit = `project-brain.git`), bare, outside OneDrive, beside the Melange and glassbox-runtime mirrors. Each repo's `.git/hooks/post-commit` pushes `--all` and `--tags` to the mirror after EVERY commit (`|| true`, exit 0, so it can never fail or delay a brainctl commit). Verified: heads equal and fsck clean on all four, and a live brainctl commit moved the mirror's master by itself. The hook is NOT versioned - re-create it after any re-clone; BOM-less LF file written with `[IO.File]::WriteAllText(..., UTF8Encoding($false))`. Whether Carbonite covers the four new folders is Paul's to confirm (green badge).
- **Why:** Paul wants durable per-project memory for disposable AI sessions, with himself as sole owner: sessions DRAFT updates; only Paul runs brainctl and commits (SUPERSEDED 2026-08-12, below). Ratified 2026-08-11: location = Desktop, toolkit + empty pilot brain (`brains\pilot-brain`, commit 1ce7347, project unnamed - Paul seeds STATE/CONSTRAINTS), brainctl scope = full hardening incl. `scorecard`.
- **Folder toggle (Paul-ratified same day, commit a3ac26b):** `python brainctl.py on <folder>` / `off <folder>` - writes/removes a managed block (exact markers `PROJECT-BRAIN:BEGIN/END`) in that folder's CLAUDE.md so Claude Code sessions there auto-boot from the brain; one sticky brain per folder (`.origin` provenance, sha256-8 collision fallback), auto-created under `brains\`; `off` removes only the block, byte-preserving the rest. An adversarial review round adjudicated 13 fixes into the same commit (staleness robustness, output fidelity, fresh-brain "none yet" citation, etc.); deferred nits: missing-file tracebacks, framework's inverted update-drafts ratio (Paul's call), init-on-file crash, EVALUATION exempt from line-count check, `on` against a nonexistent folder, deep-path git "Filename too long".
- **One-shot close-out (Paul: "Finish it all", same day):** commits 33ffb02 (evaluation ratio corrected to drafts / events + 5 robustness fixes: nonexistent-folder guard, friendly missing-file errors, init-on-file error, EVALUATION status row, `core.longpaths`) and 8f6cef9 (`boot-protocol-framework_3-DRAFT.md` - **v3 is DRAFT, v2 governs until Paul ratifies via DECISIONS**). Codex receipt-omission class hit 5-for-the-day -> receipt-first preamble amendment landed on live main 14cde015d + user copy md5-synced; prose demonstrably weak - the durable fix is a MECHANICAL receipt-presence gate (recommend at next lane-law review). Remaining cosmetic nits: "Restore from git" message on git-less brains, on-a-file says "folder does not exist", status double-message when STATE absent, orphan-brain path if a toolkit template file is missing.
- **How to apply - SUPERSEDED 2026-08-12, Paul: "yes that override stands going forward":** Claude MAY write into a brain's files and commit them directly (brainctl `decide` / `deadend` / `skill` / `flush`, or editing STATE/CONSTRAINTS then `flush`). The original rule - draft text and hand it to Paul, never write - is RETIRED; do not re-propose it or ask permission per-commit. What still holds: the brain is Paul's record, so entries must be accurate, sourced, and reversible-by-supersession (never delete an entry, flip its Status), and anything genuinely contentious still goes to him as a question rather than into the file as a fact. First exercise of the override: the melange-systems brain seed, commit 2026-08-12 12:09. Brains are nested git repos under `brains\`; the toolkit's .gitignore keeps them out of the toolkit repo - don't "fix" that. Framework Phase-1 backfill (a Melange-seeded brain) was offered, not chosen - don't re-propose unprompted. The evaluation pilot (5-10 scorecarded sessions, audits, pre-committed kill criteria) is defined in EVALUATION.md but not started. Known build history: Codex receipt-omission recurred twice in this build (ledger evts 189/190) - `universal-lane-laws-2026-08-09`.

## GLASS BOX lane-lock hang and Grok balance (source: glassbox-lane-lock-hang-2026-08-06, last modified 2026-08-10; see [[glass-box]])

- **GLASSEYE (2026-08-09):** the settings.json hook mirror stopped being invoked in app sessions about 2026-08-06 - zero hook-sourced events since, zero `agent.*` / `task.*` ever; `mirror.ps1` itself verified healthy against synthetic payloads (the harness stopped calling it; all hook names remain canonical per docs, no documented schema change). Permanent metaloop.md section @18dab6b: the coordinator emits `agent.started` / `agent.completed` + `task.created` / `task.completed` pairs via `emit.ps1` around every fan-out and background task (`-Source coordinator`; `-RunId` only inside a Meta LOOP run - `emit.ps1` does NOT auto-attach runs by cwd, so runless emission is safe beside a live run). Emission path live-verified.
- **Metaloop start failure mode:** `metaloop.ps1 -Action start` failed with `GLASS BOX launch incomplete: 4/5 views healthy`. Cause: a `console.ps1 -Lane <x>` process was alive but its heartbeat had frozen about 10 h earlier. It holds `state\lane-<x>.runtime.lock` with `FileShare::None`, so every newly spawned console hits the `catch [IO.IOException] { exit 0 }` path and dies instantly - the launcher's 10 s health deadline then fails the start.
- `launch.ps1` will **not** fix this on its own: `Stop-GlassboxOwnedProcess` is only called when the process is `-not $health.compatible`. A hung-but-compatible view is never killed, so it retries forever.
- **Remedy:** confirm the PID's command line is the expected `console.ps1 -Lane <x>`, `Stop-Process -Id <pid> -Force`, delete `state\lane-<x>.heartbeat.json`, then start again. The auto-mode classifier blocks `Stop-Process`, so this needs Paul's approval - ask once, with the PID and its start time. Killing a lane console is safe: it is a viewer, the event log is the source of truth. Likely trigger is a console frozen on QuickEdit text selection.
- **Grok lane down:** `grok -p` returned HTTP 402 `Grok Build usage balance exhausted` on 2026-08-06. The lane is a capability block, not a work failure - emit `flow.ps1 -Action skip` for it and reroute the independent review to a FRESH `mcp__codex__codex` thread (read-only sandbox, reviewer framing). That substitution worked well: the review found 11 real defect groups.
- **Codex MCP idle timeout:** a long `codex-reply` aborted with "sent no response or progress". The edits had partially landed. Never infer the outcome - `git status` + a byte-diff audit is the only truth. Set a per-server `timeout` in MCP settings or `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` to avoid it.
- Codex escalated **four** genuine contradictions in Claude-authored specs during this run (a freeze-list/substitution conflict, a data token being rethemed, bad count arithmetic, and an unused token that would inject a frozen literal). The escalation protocol is earning its keep - never treat a Codex stop as obstruction. See `melange-ui-retheme-2026-08-06`.
