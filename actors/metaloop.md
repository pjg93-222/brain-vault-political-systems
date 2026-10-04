---
type: actor
name: "Meta LOOP orchestration"
aliases: ["commands/metaloop.md"]
category: "tool"
description: "Meta LOOP orchestration command: one agent, four lanes (Fable, Codex, Gemini, Grok) with role monopolies, escalate-don't-reason, receipts and a ledger; canonical text in commands/metaloop.md."
repository: "C:\\Users\\pgoff\\.claude\\commands\\metaloop.md (user scope; repo copy .claude/commands/metaloop.md is canonical)"
stack: "Markdown command + PowerShell glassbox scripts (metaloop.ps1, emit.ps1, flow.ps1, console.ps1) + coordination_cli.py + sqlite ledger; lanes: Claude Fable, Codex gpt-5.6-sol/xhigh, Gemini agy gemini-3.6-flash-high, Grok grok-4.5"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "A hung GLASS BOX lane console (frozen heartbeat) blocks every metaloop start; launch.ps1 will not clear it; kill the PID with Paul's approval"
  - "Hooks are dead in app sessions (~2026-08-06): coordinator must emit agent.*/task.* pairs itself"
  - "Codex MCP transport serializes parallel calls anyway; same-session parallel dispatch gives MCP error -32000 Connection closed"
  - "Harness restart severs Codex MCP threads (recover by inspecting surface and opening a fresh thread)"
  - "Receipt-block emission dropped 6/8 first attempts across phases; the coordinator VERIFY TOOTH is the enforcement (caught 6/6); a mechanical receipt-presence gate is only recommended"
  - "Total lane loss = HARD STOP until Paul"
  - "agy cannot read audio/wave directly (MP4 container works); Grok lane shares the SuperGrok quota pool with the X collector"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/codex-executor-lane-2026-07-18.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\codex-executor-lane-2026-07-18.md", sha256: "afc4c835d129259e477c1e91bfbbb1d26c9b996bc86b4fb6092896e705ee81b2"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/universal-lane-laws-2026-08-09.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\universal-lane-laws-2026-08-09.md", sha256: "797a1d0065036dc8507e051f4dcbd3a26386d338602f9ffc27dad5404f0e49b0"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# Meta LOOP orchestration

> `/metaloop`: the full orchestration command. One agent, four lanes (Fable, Codex, Gemini, Grok) delegating by best fit with maximum harmonization and minimum latency. Shipped @46b17b9 (2026-07-24); UNIVERSAL LANE LAWS canonical in `commands/metaloop.md` @86ba6ef; escalate-don't-reason binds every lane, every entry point, in and out of Meta LOOP runs.

## Details

| Field | Value |
|---|---|
| Repository | repo `.claude/commands/metaloop.md` (canonical) + user-scope copy `~/.claude/commands/metaloop.md` (live surface; md5-verify both after any edit) |
| Stack | Markdown command; GLASS BOX PowerShell (`metaloop.ps1 -Action start`, `emit.ps1`, `flow.ps1`, `console.ps1 -Lane <x>`, `launch.ps1`, `mirror.ps1`); `coordination_cli.py`; sqlite ledger `~/.claude/state/codex-executor-ledger.sqlite3` |
| Status | active |
| Criticality | high |
| PCI | false |
| Team | none |

## Dependencies

- Lanes: the Codex executor lane [[codex-executor]] (`gpt-5.6-sol`, effort xhigh, priority tier; later config pins `gpt-6-astra`, see the tooling topic), Gemini via Antigravity CLI `agy` (model `gemini-3.6-flash-high`), Grok via Grok Build CLI (`grok`, model `grok-4.5`, SuperGrok OAuth), and Fable (Claude) as coordinator.
- Observability: [[glass-box]] (event log is the source of truth; lane consoles are viewers).
- Rules home: the working-agreement topic [[2026-07-working-agreement-agent-orchestration-rules]]; build history and ops in [[2026-07-feature-agent-tooling-stack]].
- External: ChatGPT subscription (no API spend), SuperGrok subscription (no API key), Google account for agy (Paul's own auth step).

## Flows

- **Pipeline:** Fable decomposes and digests; Codex executes under full protocol (spec contract -> handshake -> dispatch -> receipt -> work -> close-out lists -> Fable adjudicates -> double sign-off); Gemini is STRICTLY CONDITIONAL (no media, no Gemini; never invent a perception step); Grok = stage 3b adversarial critique, only as needed.
- **Orchestration spine:** four-role hierarchy: Fable commands, Codex executes, Gemini perceives, Grok critiques (zero authority/veto; twice-rejected kills escalate to Paul).
- **Escalation:** Codex STOP REPORT / DECISION REQUEST mid-turn (blockers) + ESCALATIONS / POTENTIAL IMPROVEMENTS end-of-turn (non-blockers); Gemini/Grok BLOCKED lists; subagents return the question as their result. Fable adjudicates and re-dispatches down the same lane.
- **Subagents:** Workflow/Agent subagents = Fable reasoning lanes, READ-ONLY by contract.
- **Glasseye:** coordinator emits `agent.started` / `agent.completed` + `task.created` / `task.completed` pairs via `emit.ps1` around every fan-out and background task.

## Dev Commands

```powershell
metaloop.ps1 -Action start                       # fails "GLASS BOX launch incomplete: 4/5 views healthy" when a lane console is hung
console.ps1 -Lane <x>                            # lane viewer; holds state\lane-<x>.runtime.lock (FileShare::None)
Stop-Process -Id <pid> -Force                    # remedy for a hung console (needs Paul's approval; then delete state\lane-<x>.heartbeat.json)
flow.ps1 -Action skip                            # mark a down lane (e.g. Grok 402) as skipped
emit.ps1 -Source coordinator [-RunId <id>]       # emit agent.*/task.* pairs; -RunId only inside a Meta LOOP run
python coordination_cli.py invariants <ledger> --run-id <id>   # quote pinned INVARIANTS block mechanically
agy -p "<contract>" --model gemini-3.6-flash-high --add-dir <dir>   # Gemini perception dispatch (run from media cwd; contract delivered by file for long prompts)
grok -p <critique_contract.txt path>             # Grok critique; contract file-based, BOM-free; stdin NOT consumed in -p mode
git diff --no-index --ignore-cr-at-eol <a> <b>   # confirm copy drift (EOL-only diffs false-alarm raw md5 sweeps)
```

## Known Issues

- Hung lane console blocks start (remedy above); likely trigger a console frozen on QuickEdit text selection.
- Hooks dead in app sessions since about 2026-08-06; coordinator emission is the workaround.
- Codex MCP concurrency is mechanically unavailable (transport serializes parallel calls; P3.4 REJECTED); same-session parallel gave `MCP error -32000: Connection closed`.
- Harness restart severs Codex MCP threads (not a protocol failure): inspect the surface, open a fresh thread.
- Receipt-block emission dropped 6/8 first attempts across phases; the VERIFY TOOTH caught 6/6; mechanical receipt-presence gate only recommended.
- Local failure mass = coordinator SPEC AUTHORING (3 defects caught by Codex STOP REPORTs in one run).
- The repo gitignores `*.txt`, so porcelain is NOT evidence of txt-file writes - use `Test-Path`.
- Carbonite held glassbox heartbeats (dashboard wedge class, excluded by Paul 2026-08-11); the epoch time-bomb class exists (fixtures recording dispatches age across gate epochs).

## UNIVERSAL LANE LAWS (Paul 2026-08-09: "apply all, make sure it stays intact over multiple tasks and agents")

Canonical text: `.claude/commands/metaloop.md` section UNIVERSAL LANE LAWS @86ba6ef (glasseye section @18dab6b). The four lanes - Fable, Codex (ChatGPT), Gemini, Grok - act as ONE agent that delegates by best fit, maximum harmonization, minimum latency. The seven laws:

1. **Role monopolies** - Fable alone reasons/decides and keeps design, spec, review, git, docs, memory; Codex alone executes; Gemini alone perceives; Grok alone critiques. A stuck lane escalates, never substitutes.
2. **Escalate, don't reason** - any lane hitting a flaw/bug/dilemma/ambiguity/capability-loss stops reasoning and reports to Fable through its structured channel: Codex STOP REPORT / DECISION REQUEST mid-turn (blockers) + ESCALATIONS / POTENTIAL IMPROVEMENTS end-of-turn (non-blockers) - now built into the Standing dispatch preamble's EIGHT labeled lists, so every dispatch at every entry point carries them; Gemini/Grok have BLOCKED lists; subagents return the question as their result. Fable adjudicates and re-dispatches down the same lane.
3. **Never downgrade** - Codex xhigh/priority; Grok grok-4.5; Gemini gemini-3.6-flash-high; subagents inherit the coordinator's model.
4. **Glasseye** - every lane action emits; hooks are dead in app sessions (about 2026-08-06), so the coordinator emits agent.*/task.* pairs via `emit.ps1` around every fan-out and background task.
5. **One writer** - only Codex touches the tree; Codex dispatches serialized through the coordinator.
6. **Minimum latency** - blocking escalations return immediately; non-blockers ride end-of-turn lists at zero extra round-trips; read-only lanes parallelize freely.
7. **Copy sync** - repo copy canonical; after a ratified change, sync user scope and md5-verify. Drift is a defect.

**Why:** Paul's directive that the executor never reasons through a design flaw, bug, or dilemma - it reports to Fable, Fable alone reasons, and the revised instruction returns to the executor.

**How to apply:** inject the read-only + escalation contracts into every subagent prompt; emit glasseye pairs around every fan-out/task; load the metaloop.md section before orchestrating; md5-sweep skills + commands after any ratified change; RECEIPT-verify before adjudicating Codex output; pin invariants on multi-node runs and quote them via the CLI. The codex-executor fork was healed in @86ba6ef (user-scope 07-25 audit/provenance work + repo 08-05 `fec/members/` paths; 68/68 tests) - both scopes verified identical, don't re-diagnose it.

### Proven live 2026-08-09

- Meta LOOP run-20260810T0038586162847Z-f7c586d050 (terminal receipt evt-...fedaef0d02): Codex issued a correct STOP REPORT against a planted 7-vs-8 spec contradiction (zero writes, verified) -> Fable REVISE -> clean completion with all eight labeled lists; the Explore subagent answered ground-truth checks exactly and REFUSED a planted read-only-violation bait, returning the conflict as an escalation.
- xhigh custody = config.toml + explicit per-call override + ledger dispatch records with provenance (audit clean).
- A harness restart severs Codex MCP threads - recover per the skill (inspect surface, fresh thread); it is not a protocol failure.
- The repo gitignores `*.txt`, so porcelain is NOT evidence of txt-file writes - use `Test-Path`.

### Round 2 (thorough, same day), run-20260810T0102047933741Z-857e3b2522

- A full-tool general-purpose subagent held the contract-only guard against an edit bait (the previously untested soft spot).
- Codex reported a planted reference discrepancy through ESCALATIONS without acting.
- Grok live again (402 cleared): on-contract constitution critique 3K/10W/6S.
- Two REAL Codex sandbox blockers (no python on PATH, no exec outside workspace) each drew correct STOP REPORTs -> **author/execute split is the fixture pattern: Codex authors the script, Fable reviews and executes it**.
- Grok -p can return preamble-only - retry once with an explicit completeness demand before ruling the lane degraded.

### REPAIRS APPLIED (Paul: "apply the amendment slate, hard stop stays, repair")

- Constitution AMENDED @a1d4d5d: enforcement map, law 1 mutation split (Fable = governance plane incl. git; Codex = code/data), review-vs-critique rule, law 2 residual reasoning budget + **TOTAL LANE LOSS = HARD STOP until Paul (his explicit ruling)**, dated re-testable MCP invariant, honest channel-cost law 6.
- **Ledger value-pin @14bcc84**: effort=xhigh / tier=priority enforced at insert AND audit (70 tests).
- **Gemini lane REPAIRED @038351b**: agy 1.1.11 permissions live at `~/.gemini/antigravity-cli/settings.json` with `read_file(*)` (old `~/.gemini/settings.json` + `**` form DEAD); media paths must be ABSOLUTE (relative resolves to agy scratch, not cwd); perception re-verified verbatim-exact. No open findings. Full record: `audits/LANE_LAWS_VALIDATION_2026-08-09.md`.

### AUGMENTATION PHASE 0+1 (permanent, Paul 2026-08-10, "All stamped")

- **LAW 8 VERBATIM ARTIFACTS** added @4f3b57af0: artifacts travel as themselves; file artifacts = path + sha256 + quoted spans; the receiver acknowledges the hash; RECEIPT is the sole carve-out.
- Codex preamble is now RECEIPT-FIRST (enumeration schema: every constraint + every invariant as items with own-words interpretation, N/A needs reason, modality-weakening = distortion, contradiction-flagging built in) + INVARIANTS block quoted MECHANICALLY via `coordination_cli.py invariants <ledger> --run-id` from an immutable pinned `invariants` ledger event (MUST pin on multi-node runs). Fable verifies the receipt BEFORE adjudicating any work product; mismatch = re-dispatch caught-at-gate; record as `receipt` ledger event (fingerprints + verified bool).
- Ledger also enforces: failure-attribution tags on node_blocked / node_failed / node_rework (spec-misread | coordination | verification | infra, MAST-comparable), epoch-gated `dispatches_missing_receipt` (epoch 2026-08-11), `run_metrics` audit section (latency / tokens / spine-vs-parallel via `--glassbox-dir`).
- Perception reports = TRANSCRIPTION / INFERENCE / ILLEGIBLE (fabricated anchor = defect); Grok critiques need per-point exact locations, cite-CORRECTNESS adjudicated.
- `handoff-accepted` carries the receiver's receipt (at most 1200 chars verbatim, else sha256 + evt id).
- KEY EVIDENCE: prompt-body instructions dropped 2/3 vs preamble-channel 100% - standing instructions belong in developer-instructions; plants 4/4 survival (codex, n=4); local failure mass = coordinator SPEC AUTHORING (3 defects caught by Codex STOP REPORTs in one run).
- Full record: `audits/AUGMENTATION_P1_RATIFY_PACKET_2026-08-10.md` (grok-hardened, 4K/9W all accepted) + LANE_LAWS_VALIDATION Round 3.
- **ROADMAP COMPLETE through Phase 5 (2026-08-11):** P2 ratified (extraction charter + 70/85 soft ceiling + tool-result clearing + fact-provenance gate); P3 ratified with **P3.4 REJECTED** - the law-5 re-test found link breakage gone but the MCP transport serializes parallel calls anyway (concurrency mechanically unavailable; basis refreshed in law 5); compact routing now by the two-question rubric (mutation? cross-lane feed?); P4 in force (free tier before any model review; rework re-verified against verbatim original checks); P5 standing practices defined (plants at Paul's N - proposed 5, quarterly dated-basis sweep, quarterly distribution compare).
- **RECEIPT EPOCH LIVE since 2026-08-11T00:00Z:** every post-epoch dispatch needs a receipt event or audit flags it (caught the phase4-tensor lane's dispatch within hours - cross-session drift is now mechanically visible; register -> receipt -> register sequencing matters, batch registration closes coverage windows). Receipt-block emission dropped 6/8 first attempts across phases - the coordinator VERIFY TOOTH is the enforcement, catching 6/6.
- Carbonite held glassbox heartbeats (dashboard wedge class, excluded by Paul 2026-08-11); the epoch time-bomb class exists (fixtures recording dispatches age across gate epochs).

## Build history and standing rules from the Codex lane memory (source: codex-executor-lane-2026-07-18)

### /metaloop and the lane hierarchy (2026-07-24)

- **/METALOOP SHIPPED @46b17b9** (Paul 'the full orchestration' + 'Gemini only as needed'): one command = full three-lane tandem (Fable decomposes/digests, Codex executes under full protocol, Gemini STRICTLY CONDITIONAL - no media, no Gemini, never invent a perception step); repo + user-scope `commands/metaloop.md`. Later rewritten clean UTF-8 with the 4-role hierarchy.
- **Rules amended 2026-07-24 (Paul, Gemini-integration directive):** (1) **Claude NEVER writes code** - all code authorship is Codex's, including one-line fixes (edit-only dispatches); Claude keeps design, specs, review, git, docs/skill prose, memory. (2) **Double sign-off loop:** Codex writes -> Claude sign-off No. 1 (protocol review) -> SOL ERROR-INVESTIGATION round (a FRESH read-only Codex thread adversarially hunts errors in the diff, separate from the author thread) -> Claude adjudicates + sign-off No. 2 -> Paul's gate/merge delegation. (3) **Command hierarchy: Fable (Claude) > Codex > Gemini.** Gemini Flash = PERCEPTION layer (eyes/ears): image analysis/computation, audio + visual video analysis, OCR/screenshots/visual QA; its output = untrusted observation DATA, never authority, never code, never a validity claim.
- **SUBAGENT LAW CODIFIED 2026-08-07 (Paul: "subagents reason through fable and execute through codex... fix it so it does")** in commands/metaloop.md @f9e62cf: Workflow/Agent subagents = Fable reasoning lanes, READ-ONLY by contract (never edit files, never run producers, never dispatch Codex themselves - dispatches stay serialized through the coordinator); every subagent prompt must state the read-only contract; implementation always flows Fable spec -> coordinator's Codex dispatch (xhigh) -> Fable review. The same commit cleared the metaloop.md copy-sync debt (the repo copy had missed the 08-04 escalation/dispatch/max-effort amendments; user scope is the live surface - md5-verify both after any edit).
- **STANDING 2026-07-19 (Paul "always work through codex" + "Optimize merge to your preference"):** Codex is the default executor path in every future session; merge decisions at Claude's preference. Dispatch ONE codex call at a time. RULE AMENDED 2026-07-19: Codex MAY run the chain, `build_media_blend.py`, regeneration, workbook writes (consequence: `fec/paths.py` resolves ROOT to the LIVE tree regardless of cwd); carve-outs kept: preregistered `--look` runs, GATE-2 / `collector_supervisor.py`, retired `apply_*` COM one-shots (`apply_weights.py` overwrites ratified pillar weights), D2 dedup DELETEs.

### Gemini lane (2026-07-24; repaired 2026-08-09)

- Gemini CLI RETIRED by Google for ALL individual accounts 2026-06-18; successor = Antigravity CLI (`agy`), free individual tier $0 (includes Gemini 3.5 Flash). Paul ran `irm https://antigravity.google/cli/install.ps1 | iex` himself (installer/script download were classifier-blocked); **agy 1.1.6 INSTALLED + LANE LIVE same day, VERIFIED @f21b0ff/11b33ea**; OAuth via ConPTY driver (`.claude/skills/gemini-perception/scripts/agy_pty_login.py`, `agy_send.txt` = keystroke channel, auth-code paste-back flow, Google account-verification links ONE-SHOT, first browser visit to gemini.google.com clears new-account gating). Paul supplied Google credentials twice (UMN + iCloud-based; personal [personal email omitted]) and both were REFUSED per the hard rule (never enter passwords); the UMN account hit IneligibleTierError (Workspace/EDU excluded from the individual tier).
- Model `gemini-3.6-flash-high` (Paul's 3.6 call confirmed; `agy models` lists 3.6/3.5-flash tiers + 3.1-pro). Invocation `agy -p "<contract>" --model gemini-3.6-flash-high --add-dir <dir>` from media cwd. Shell tools stay soft-denied headless = LOAD-BEARING; never `--dangerously-skip-permissions`; the contract MUST explicitly instruct read_file (@-mentions don't attach in print mode; say "no shell or terminal commands" rather than "no commands").
- First live perception passed (read `rank_authority.png`, corrected a wrong chart premise, verbatim top-5 roster + 12 headers, 4-list compliant, zero fabrication). Media-delegation protocol SHIPPED @9d8217d: gemini-perception skill + `/gemini` command; 4-field perception contract; 4-list report OBSERVATIONS / EXTRACTED / UNCERTAIN / NOT OBSERVED; Gemini = capture + comprehend, Codex = compute/splice/mark, Claude = guide + adjudicate + digest.
- 2026-07-24 limit: agy 1.1.6 `read_file` rejects audio/wave (audio/video not routable via CLI then; images verified). Re-tested 2026-08-19 on agy 1.1.11: WAV still hard-refuses (`unsupported mime type audio/wav`) but the MP4 container works (stage with ffmpeg: black 160x120 video + AAC audio); see the audio lane records.
- Repair 2026-08-09 @038351b: permissions at `~/.gemini/antigravity-cli/settings.json` with `read_file(*)` (old form dead); media paths ABSOLUTE.
- The interactions-data consent checkbox final state is UNCERTAIN (adjustable in agy settings, flag to Paul). `agy` driver hardened @f9843ae (AG-1..8 + X1..5).

### Grok companion lane (2026-07-24)

- **SHIPPED @6756985** (Paul "expand this also to Grok" -> SuperGrok yes, API no, "companion only"): Grok = adversarial counsel / fear factor (KILLED / WOUNDED / SURVIVES critique contract, zero authority/veto, twice-rejected kills escalate to Paul, only-as-needed); `/grok` + `/metaloop` stage 3b; runtime Grok Build CLI (`grok`, install `irm https://x.ai/cli/install.ps1 | iex`, SuperGrok browser OAuth = Paul's action).
- **VERIFIED LIVE @decf125:** grok 0.2.112, model grok-4.5, headless -p works on cached SuperGrok OAuth (API key only for uncached envs); contract delivery FILE-BASED (PS5.1 shatters quoted -p args; write `critique_contract.txt` BOM-free); first-dispatch calibration PASSED (killed 2 planted bad claims with correct kill shots, wounded the true-but-unevidenced one demanding evidence objects).
- Mid-ship lesson: main advanced under the session (`/ps` @7e548f5 from another session) - inspect-then-rebase, never force.
- Capability failures: `grok -p` returned HTTP 402 `Grok Build usage balance exhausted` on 2026-08-06 (cleared by 2026-08-09) and again 2026-07-25 on the SuperGrok quota wall. A down lane is a capability block, not a work failure: emit `flow.ps1 -Action skip` and reroute the independent review to a FRESH `mcp__codex__codex` thread (read-only sandbox, reviewer framing) - that substitution found 11 real defect groups.
- X lane (no API key needed): the subscription grok CLI carries `x_keyword_search` / `x_semantic_search` / `x_user_search` / `x_thread_fetch`; handle + date filters live-verified, LOCATION soft-only. Monday collector (@deeb7d0/010b69d/6cad6bc; v2 @a0e999f, docs @d2c1086; quota circuit breaker @5185954) banks `x_catalog.jsonl` (3,020 posts / 205 handles at the 07-25 quota wall; 281 carried batches await fresh quota); additive catalog, NEVER stance-pipeline inputs; armed through the STARTUP-FOLDER shim `MelangeXCollector.cmd`. Counsel lane and harvester SHARE the SuperGrok pool.

### Dynamic Coordination V1 (2026-07-24) and ledger

- Commits 0db65d5 (Fable-Sol runtime + coordination controls), 9d8f2c7 (foundation doc), 80f1b79 (`dynamic_coordination.py`: evaluator with EXACTLY 7 comparison names / 5 results, fail-closed on missing or self-generated evidence, only the evaluator emits REBASE_REQUIRED; episode ledger stores content as SHA-256 + bytecount; replay pure and report-only; amendment candidates a read-only derived view). `coordination_cli` surface: validate-{contract,handshake,correction,decision,verdict,transition,observation,prediction} + reconcile + replay + record + repeats + record-episode + episode + candidates.
- Integrated 2026-07-24 per Paul ("don't touch the sol retry, only integrate, the rest we can improve upon"): live tree ff'd 955b66a -> 80f1b79; user scope 12/12 md5; tests 41/41. **SOL RETRY = FROZEN per Paul** (`fable_sol_retry.py`, test, adapters). Bounded Fable-to-Sol retry controller shipped @1c935e4 (completed-review + zero-flag + non-Opus acceptance gates, retry ceiling, cycle detection, FAIL-CLOSED review handling, full attempt history); Paul's "repeat until no flag" evasion form was refused. `/fable-audit` stays project-scope only.
- Audit + fix waves 2026-07-24 (@4f46939 DC-1..DC-14, @f9843ae, @1f35c66, @fa3ba76): production ledger adopted at `~/.claude/state/codex-executor-ledger.sqlite3`; the double sign-off earned its cost (plan-echo caught 5 spec ambiguities incl. 2 of Claude's). Accepted risks per Paul: `read_file(**)` stays then (later narrowed 2026-08-09), double-sign-off latency accepted with the trivial carve-out defined.

### Codex protocol layers the command carries (details in [[2026-07-feature-agent-tooling-stack]] and [[codex-executor]])

- Mind/body directive (2026-07-23), plan-echo gate, DEVIATIONS list in every close-out, executor stops on ambiguity.
- Reflex layer @8dcf330 (anti-loophole clause; footprint rule; live-tree turns halt-only) and coordination layer @600012f (five-field spec contract; READY / READY_WITH_LIMITS / BLOCKED handshake; AUTHORITY three-factor; failure circuit of 2 fails; DECISION REQUEST verdicts CONTINUE / REVISE / REVERSE / REDUCE SCOPE / REQUEST USER AUTHORIZATION / STOP; ACCEPTANCE sixth list). Both deviations ratified kept @05af236; settled.
- Effort lesson: effort=low FABRICATED results (ran zero of 4 commands) - never downgrade effort for tool-using tasks; executor-reported command results are claims until Claude re-runs them.
- 2026-09-19: the MCP lane broke upstream (`codex mcp-server` removed in CLI 0.154.0); pinned 0.146.0 wrapper rejects `gpt-6-astra`, so MCP calls must pass `model: "gpt-5.6-sol"`; Astra routes only through hardened `codex exec`. See the tooling topic for the full repair record.

### GLASSEYE and lane-lock facts (from the GLASS BOX lock-hang record, 2026-08-06/09)

- Hook mirror (`mirror.ps1`) stopped being invoked in app sessions about 2026-08-06; permanent metaloop.md section @18dab6b requires coordinator emission via `emit.ps1` (`-Source coordinator`; `-RunId` only inside a Meta LOOP run; emit.ps1 does NOT auto-attach runs by cwd).
- A hung `console.ps1 -Lane <x>` holds `state\lane-<x>.runtime.lock` with `FileShare::None`, so new consoles die instantly and `metaloop.ps1 -Action start` fails with "GLASS BOX launch incomplete: 4/5 views healthy"; `launch.ps1` only kills incompatible views (`Stop-GlassboxOwnedProcess` when `-not $health.compatible`). Remedy needs Paul's approval (classifier blocks Stop-Process); killing a console is safe (viewer).
- A long `codex-reply` aborted with "sent no response or progress"; edits partially landed - never infer outcome; `git status` + byte-diff audit; set per-server `timeout` or `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`. Codex escalated four genuine contradictions in Claude-authored specs in that run - never treat a Codex stop as obstruction.

## History

| Date | Event |
|---|---|
| 2026-07-24 | `/metaloop` shipped @46b17b9; Grok lane @6756985 (verified @decf125); Gemini lane live (agy 1.1.6). |
| 2026-08-07 | Subagent law @f9e62cf. |
| 2026-08-09 | UNIVERSAL LANE LAWS @86ba6ef; constitution amended @a1d4d5d; ledger value-pin @14bcc84; Gemini lane repaired @038351b; Meta LOOP runs run-20260810T0038586162847Z-f7c586d050 and run-20260810T0102047933741Z-857e3b2522. |
| 2026-08-10 | Augmentation Phase 0+1 (LAW 8 @4f3b57af0). |
| 2026-08-11 | Roadmap complete through Phase 5; RECEIPT EPOCH live (2026-08-11T00:00Z). |

## Related Actors

- [[codex-executor]] - Codex (ChatGPT/Astra) as Paul's executor: Claude reasons and reviews, Codex writes code; MCP lane dead since 2026-09-17
- [[glass-box]] - Shared GLASS BOX event stream/viewer for all lanes; every process must emit; a hung lane console blocks metaloop starts.

## Related Concepts

- [[fail-closed-gates]] — When a check cannot be satisfied, the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call.
- [[census-before-claims]] — Measure first (a census, the live file, git status plus a byte diff) before stating a mechanism, a number or a completion; never infer it.

## Related Topics

- [[2026-07-feature-agent-tooling-stack]] - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.
- [[2026-07-working-agreement-agent-orchestration-rules]] - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.
