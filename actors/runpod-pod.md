---
type: actor
name: "RunPod math pod"
aliases: ["Runpod pod"]
category: "infra"
description: "RunPod H200 pod (first pod 192 CPU / ~2 TB RAM; current math pod root@81.27.69.177:36669) used for memory/RAM-heavy tasks and Claude sessions; current math pod has full-data authorization; never stop the pod; ask Paul before using any pod for the CU-geography lane."
repository: ""
stack: "RunPod pod (Ubuntu 24.04, H200 141 GB, 192 CPU, ~2 TB RAM), /workspace network volume, tmux, git archive snapshot, Python venv, SSH"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "NEVER stop or terminate the pod without Paul; do not nag about stopping it (Paul 2026-09-30: 'Does not matter')"
  - "Pod bills hourly ($3.59-4.59/hr for the H200): do not leave it running idle work; pod/volume cleanup is Paul's"
  - "/workspace network volume REFUSES chmod/chown/utime; container disk is wiped on restart; after a restart run /workspace/bootstrap.sh"
  - "SSH to the pod timed out at ~20:00 on 2026-09-30 (pod stopped or restarted)"
  - "The pod's CLAUDE.local.md line 'stop it in the RunPod console' is stale; fix at the next pod visit"
  - "The runpod MCP plugin (plugin:runpod) needs Paul's OAuth authorization before any agent can check pod state or stop the pod"
  - "Pod copy is NEVER authoritative; secret handling is not blanket-authorized by the full-data ruling"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/pod-for-memory-heavy-tasks-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\pod-for-memory-heavy-tasks-2026-09-30.md", sha256: "6576d3b038381faafae20d7fd2fa7a0d9c8fcd6684fda4ce768fc0f22bbe9388"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/runpod-claude-sessions-2026-09-30.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\runpod-claude-sessions-2026-09-30.md", sha256: "6a09c28c943b3f3c6207c49a2e825ec5adf4d752204a958334f2aeaac16b9260"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/infra"]
---

# RunPod math pod

> RunPod GPU/high-RAM pod used for memory-heavy tasks within approved data scope; the current math pod has full-data authorization; login via browser capture + `ssh -L`; never stop the pod; pod and volume cleanup is Paul's.

## Details

| Field | Value |
|---|---|
| Repository | none (RunPod-hosted pod; code root on the pod `/workspace/melange` is a `git archive`, never authoritative) |
| Stack | Ubuntu 24.04; H200 141 GB; 192 CPU; ~2 TB RAM; `/workspace` network volume; tmux; Python venvs; Claude Code on the pod |
| Status | active |
| Criticality | medium |
| PCI | no |
| Team | none |

## Dependencies

- Used by (vault): [[2026-09-feature-cu-geography-luna-and-row-framework]] / [[cu-geography]] (Luna round 3 ran here with a de-identified upload), Forecast audit, giving-view redesign and PAC accuracy / [[forecast-redesign]] (forecasting model audit lane at `/workspace/forecast`), [[mentat]] (do not restart Mentat 8806), Agent orchestration and model tiering rules (the pod rules), [[2026-07-feature-agent-tooling-stack]] (the runpod plugin and pod sessions).
- Depends on: RunPod platform (billing hourly), SSH key `C:\Users\pgoff\.ssh\id_ed25519` (path only), the RunPod MCP plugin (`plugin:runpod`, needs Paul's OAuth sign-in), Claude Code credentials persisted in `/workspace/claude-home`.
- Other lanes sharing the pod: "LUNA geography project review" and "Forecasting model audit and integration" (`/workspace/forecast`). Paul confirmed on 2026-09-30 "Those sessions are good": their outputs are not this lane's concern, so do not pull or clean them.
- Related memory notes: `pod-for-memory-heavy-tasks-2026-09-30`, `runpod-claude-sessions-2026-09-30`, `luna-stratified-scaling-review-2026-09-29`, `codex-overnight-poll-loop-burn-2026-09-13`, `quant-model-evaluation-skill-lane-2026-09-30`, `ask-before-substantive-changes`, `live-tree-branch-state-2026-07-14`.

## Flows

- **Launching work:** launch pod jobs detached and wait on one background notification; never poll from your turns.
- **Login without the terminal (Paul hated the paste flow):** respawn the tmux pane with `BROWSER=/root/capture-url.sh` (plus the `/usr/local/bin/xdg-open` wrapper) so Claude writes its localhost-callback OAuth URL to `/workspace/login-url.txt`; open `ssh -N -L <port>:127.0.0.1:<port>` from Windows; Paul clicks the URL and approves in his browser; the callback lands through the tunnel. Never type auth codes for him.
- **Attach:** Paul attaches with `ssh -t ... "tmux attach -t claude"`.
- **Patches back to Windows:** the git DB lives on container disk (`--separate-git-dir=/root/melange.git`) because `/workspace` refuses chmod; a post-commit hook exports every pod commit to `/workspace/pod-patches/<UTC>-<sha>.patch`, which land on Windows with the house cutter. Pod copy is NEVER authoritative.
- **After a restart:** run `/workspace/bootstrap.sh` (rebuilds everything).
- **Data scope:** only data Paul has approved may go to the pod (see Standing rules and History).

## Dev Commands

```bash
# first pod (direct TCP; supports scp); the ssh.runpod.io proxy is interactive only
ssh root@103.196.86.181 -p 57215 -i ~/.ssh/id_ed25519
ssh -t root@103.196.86.181 -p 57215 -i ~/.ssh/id_ed25519 "tmux attach -t claude"

# current math pod (Paul's 2026-09-30 ruling); tree /dev/shm/melange
ssh root@81.27.69.177 -p 36669
# Python on the math pod: /workspace/melange-venv/bin/python

# login tunnel (from Windows): port is the localhost-callback port Claude prints
ssh -N -L <port>:127.0.0.1:<port> root@<pod> -p <sshport>
# on the pod: BROWSER=/root/capture-url.sh  (writes the OAuth URL to /workspace/login-url.txt)

# rebuild after restart
/workspace/bootstrap.sh

# tar onto /workspace must use these flags (set -e scripts die on the permission warnings)
tar ... --no-same-owner --no-same-permissions -m

# git DB on container disk
git ... --separate-git-dir=/root/melange.git
```

## Known Issues

- NEVER stop or terminate the pod without Paul; don't nag about stopping it (Paul answered "Does not matter" to the stop reminder on 2026-09-30).
- The pod bills hourly (H200 $3.59-4.59/hr): don't leave it running idle work.
- `/workspace` network volume persists but REFUSES chmod/chown/utime; the 30 GB container disk is wiped on restart.
- At about 20:00 on 2026-09-30, SSH to the pod timed out (the pod was stopped or restarted). `/workspace` persists; after a restart, run `/workspace/bootstrap.sh`.
- Stale line in the pod's `CLAUDE.local.md`: "stop it in the RunPod console"; fix it at the next pod visit.
- The RunPod MCP plugin (`plugin:runpod`) needs Paul's authorization before any agent can check pod state or stop the pod (it was never signed in; `needs_auth`).
- Open (Paul's action): confirm in the Runpod console that the Luna-lane pod is terminated, and delete the `/workspace` network volume that held the de-identified upload plus ~707 MB of non-chosen models (it bills until deleted). Note the tension with "never stop the pod": the standing rule is that the AGENT never stops/terminates it; cleanup is Paul's.
- Secret handling is not blanket-authorized by the full-data ruling (no secrets copied: default none, per-secret OK required).

## Standing rules (current)

- **Never stop or terminate the pod without Paul** (resolution 5: still stands). Keep the H200 ($3.59-4.59/hr); Paul's rulings: "Claude sessions there".
- **"Move on out of the pod"** (Paul, 2026-09-30 evening) SUPERSEDES "go hard on the pod": for the CU-geography row-ranking lane, work locally and ask Paul before using any pod again. The ranking framework is built and tested locally; nothing from that lane was uploaded to the pod. Paul also said "Bring everything out with it"; Codex was already running the full recovery to `C:\Users\pgoff\Melange-Pod-Recovery\20260930` (32 parts, 38.7 GB raw, with disk guards; C: had ~33 GB free); the duplicate copy by the CU lane was stood down (that recovery belongs to the other lane).
- Current math-pod authorization (Paul, 2026-09-30): "ordered every process to the newly supplied pod and explicitly allowed the entire data plane, including donor records." The code-only restriction and old address/layout below describe the first pod and must not govern this authorized math run.
- Only data Paul has approved may go to the pod. On 2026-09-30 for the Luna lane that was the DE-IDENTIFIED model inputs (no names, emails, addresses or IDs; Paul said "Yes" to the de-identified upload and "All of it, get it done" to round 3). The raw source CSV and the full completed export stay local; export, verify and publish of published files remain local.
- Preserve other lanes; do not restart Mentat 8806.
- The coordinator owns transfer completeness, production execution and output reconciliation; none is certified by the memory note.

## Pod inventory

### Current math pod (superseding checkpoint 2026-09-30)
- SSH: `root@81.27.69.177` port 36669; tree `/dev/shm/melange`; Python `/workspace/melange-venv/bin/python`.
- Shared with another session (`/workspace/forecast`); container capped at ~48 CPUs, ~468 GiB RAM and 30 GB disk (as of the 2026-09-30 evening note).
- F5 criterion-only refresh completed at `/workspace/f5-check`, with all 468 frozen bills and independent source replay.

### Historical first pod (Paul's, set up 2026-09-30)
- `ssh root@103.196.86.181 -p 57215 -i ~/.ssh/id_ed25519` (direct TCP; supports scp). Ubuntu 24.04, 192 CPU, 2 TB RAM, H200 (141 GB), 30 GB container disk (wiped on restart), `/workspace` network volume (persists; REFUSES chmod/chown/utime). Shared with the forecasting lane (`/workspace/forecast`).
- Then-current restriction: CODE ONLY, no Melange data (donor PII) synced; no secrets copied (default none, per-secret OK required). (Superseded for the math run by the full-data authorization above.)
- SSH key generated at `C:\Users\pgoff\.ssh\id_ed25519` (fingerprint SHA256:2SYMVs..., no passphrase); the ssh.runpod.io proxy is interactive only.

### Layout (first pod)
- `/workspace/melange` = `git archive` of 61e16e28b minus 88 files >20 MB (audits/legfix5 packets etc.), 43,268 files; `.snapshot_base` holds the base sha. `CLAUDE.local.md` there points brain boot at `/workspace/brain` and forbids running the chain on Linux (340/1,396 fec files Windows-coupled).
- Git DB on container disk (`--separate-git-dir=/root/melange.git`); a post-commit hook exports every pod commit to `/workspace/pod-patches/<UTC>-<sha>.patch`.
- Claude home: `/root/.claude` -> `/workspace/claude-home` (credentials persist); `CLAUDE_CONFIG_DIR=/workspace/claude-home`; Python `/opt/venv`; `/workspace/bootstrap.sh` rebuilds all after a restart; tmux config `/workspace/tmux.conf` (status off).
- Tar onto `/workspace` must use `--no-same-owner --no-same-permissions -m`; `set -e` scripts die on the permission warnings.

## Decisions

- Pod rule, newest: "Move on out of the pod" (Paul, 2026-09-30 evening); for CU-geography row ranking work locally and ask before using any pod. "Never stop the pod" still stands.
- ~~"For tasks pertaining to Memory and RAM, shift over to the Pod, and go hard on it, meaning memory and Ram on there are not a constraint"~~ (Paul, 2026-09-30, verbatim) - superseded for the CU-geography row-ranking lane the same evening by "Move on out of the pod"; kept because it explains the earlier pod usage (Luna round 3, F5 refresh). The earlier rule: the pod (H200 141 GB, 192 cores, ~2 TB RAM, `/workspace` volume; SSH `root@103.196.86.181 -p 57215 -i ~/.ssh/id_ed25519`) runs any job limited by RAM or memory: model training, grids, large in-memory joins, bootstrap batteries; don't downsample or cap memory there; parallelise across fields and cores and keep data in RAM.
  - **Why:** the local laptop (8 cores, 31.5 GB) was the bottleneck for the Luna modelling rounds, and Paul would rather pay for pod hours than wait.
  - **How to apply:** only Paul-approved data (on 2026-09-30: DE-IDENTIFIED Luna model inputs); raw source CSV and full completed export stay local; launch detached and wait on one background notification; never stop/terminate the pod without Paul; the pod bills hourly, so don't leave it running idle work.
- ~~Pod is code only; no Melange data (donor PII) synced; no secrets copied~~ (first pod, 2026-09-30) - superseded 2026-09-30 for the math run by Paul's full-data authorization on the new pod (including donor records); secrets still need per-secret OK.
- Luna lane: Paul said "drop the pod" on 2026-09-30; the pod was already unreachable over SSH (timeout), so the lane could not terminate it itself; everything needed is saved locally (results, 8 chosen models, predictions, pod-raw, upload pack, published export); only the non-chosen candidate models (~707 MB) are lost if the volume is gone; the de-identified data may still sit in Runpod storage if `/workspace` was a network volume.
- Login method: browser capture URL + `ssh -L` tunnel (Paul hated the paste flow); never type auth codes for him.
- Pod/volume cleanup is Paul's.

## History

| Date | Event |
|---|---|
| 2026-09-30 | First pod set up (Paul's): H200, `root@103.196.86.181 -p 57215`; runpod@runpod plugin installed but MCP needs OAuth; SSH key generated |
| 2026-09-30 | Luna round 3 run on the pod with a 69 MB de-identified upload (Paul: "Yes" to de-identified upload; "All of it, get it done") |
| 2026-09-30 | Paul: "For tasks pertaining to Memory and RAM, shift over to the Pod, and go hard on it" (23:31Z note); later superseded for CU row ranking |
| 2026-09-30 | Paul: "Claude sessions there"; keep the H200; NEVER stop the pod; "Does not matter" to the stop reminder |
| 2026-09-30 | Paul: "drop the pod" (Luna lane); pod unreachable by SSH (timeout) |
| 2026-09-30 ~20:00 | SSH timed out (pod stopped or restarted); `/workspace` persists; run bootstrap.sh after restart |
| 2026-09-30 | Newly supplied math pod `root@81.27.69.177 -p 36669`: Paul ordered every process there and allowed the whole data plane; F5 refresh at `/workspace/f5-check` (468 frozen bills) |
| 2026-09-30 evening | Paul: "Move on out of the pod" and "Bring everything out with it"; Codex ran full recovery to `C:\Users\pgoff\Melange-Pod-Recovery\20260930` |
| 2026-09-30 | Paul confirmed "Those sessions are good" about the other lanes' sessions on the pod |

## Next Steps / open

- Paul to confirm pod terminated and delete the `/workspace` volume (his action; the agent never stops the pod).
- Fix the stale `CLAUDE.local.md` line ("stop it in the RunPod console") at the next pod visit.
- Authorize the RunPod MCP plugin (needs Paul's OAuth) if pod state checks are wanted.

## Related Topics

- [[2026-07-feature-agent-tooling-stack]] - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.
- Agent orchestration and model tiering rules - Orchestration rules: model tiering by scope, inline review, lane laws, GLASS BOX for everything, pod for RAM work, no poll-supervision.
- [[2026-09-feature-cu-geography-luna-and-row-framework]] - CU-geography: Luna RF/KNN review closed 09-30 (section 30 GPU model current) plus the 491,308-row framework in Paul's four groups (P0/P1).
- Forecast audit, giving-view redesign and PAC accuracy - Forecast audit (09-29), F2 'Giving by cycle' redesign with validity checks, integrity reconciliation, and PAC accuracy attempt 2 (HOLD).

## Related Projects

- [[cu-geography]] - Codex-run CU geography lane: Luna RF/KNN model (closed 09-30) and 491,308-row ranking framework in Paul's four groups.
- [[forecast-redesign]] - Mentat forecasting program: 09-29 model audit, F2 'Giving by cycle' redesign with integrity reconciliation, PAC accuracy attempt 2 (HOLD).
- [[mentat]] - R+API pipeline plus local Python console collecting FEC contributions for Paul's company roster into workbooks.
