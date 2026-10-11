---
type: topic
title: "Security baseline audit and fixes (2026-10-10) (Melange audits and code reviews)"
aliases: ["Melange audits and code reviews: Security baseline audit and fixes (2026-10-10)"]
category: "troubleshooting"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-10-10
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/security-baseline-lane-2026-10-10.md", type: "claude-memory", synced_at: "2026-10-10", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\security-baseline-lane-2026-10-10.md", sha256: "8dd9ab87391d2cea00a64fb7d185cb4ad64ca88cc45e5add55e26b64d653bdf5"}
updated_at: 2026-10-10
updated_by: "preserve@agent"
tags: ["type/topic", "status/in-progress", "domain/security", "category/troubleshooting"]
part_of: "[[2026-07-troubleshooting-melange-audits-and-reviews]]"
---

# Security baseline audit and fixes (2026-10-10) (Melange audits and code reviews)

> The read-only security audit of the Melange and Mentat servers on 2026-10-10, Paul's approval of fixes P1-P9, what landed in each repo, the adversarial campaign and its gap fixes, and the items left for Paul. Part of [[2026-07-troubleshooting-melange-audits-and-reviews]] (project [[melange-systems]]).

## Security baseline lane, 2026-10-10 (memory `security-baseline-lane-2026-10-10`; brain D-140)

- **Audit:** a read-only audit on 2026-10-10 found no Django or any web framework: all servers are stdlib `http.server`, so Django and DRF checks do not apply. Paul approved P1-P9 ("Approve, put these in"). Built in sparse worktrees under `C:\Users\pgoff\worktrees\` (branches `security/baseline-a`, `-b`, `-mentat`), Opus-reviewed, then landed:
  - Melange: commit `6de7ed180` on main, path-limited to 29 files, line endings preserved via the scratchpad script `land_sec.py`. Not pushed to origin.
  - Mentat: fast-forward of `codex/mentat-crypto` to `23d33bfe8`. Side effect: 5 files with mixed line endings became pure CRLF.
- **Landed:** loopback bind on the preview server, `.gitignore` narrow adds, member-desk XSS fixes (esc quotes, safeUrl http(s)-only, povOf allowlist, data:-only file links), SMTP certificate verification, Claude CLI lockdown, Host allowlist on 8841/8823/8876, sha256 sidecar before unpickling (absent sidecar = warn and load), public-only press fetch, Mentat formula guard, ffmpeg protocol whitelist, FEC export URL https-only.
- **Gap fixes after the adversarial campaign** (about 7,300 cases, 0 bypasses): SSRF `_is_public` with NAT64/6to4 decode landed as Melange `16b214d38`; R non-ASCII URL rejection landed as Mentat `95646bcbf`. The harness lives in the scratchpad folder `sectest/`.
- **Follow-ups 2026-10-10:** research pickle guards `23ed9b836` (`universe_verify.py` skipped because sealed hashes pin it), type=password plus re-lock `963cf59ef`, zip untracked `abec38cd4`. Gotcha: `git rm --cached X` followed by `git commit -- X` RE-STAGES X, so commit with no pathspec. 8841 restarted (PID 38776); 8823 and 8876 were not running.
- **Pushed:** Mentat `codex/mentat-crypto` to `95646bcbf`; the Melange fixes as the cherry-picked branch `origin/security/baseline-2026-10-10` (local main shares no ancestor with origin, so never push main). No PR opened. Brain D-140 is recorded.
- **Why https-only:** the FEC export host was relaxed to https-only because no evidence of the real host was found. openFEC returns presigned S3 URLs, so pinning fec.gov would have broken exports.
- **How to apply:** fixes in the running servers and the shipped desk take effect only after Paul restarts 8841/8823/8876 and approves a desk rebuild.
- **Done 2026-10-10:** a random temporary dashboard password was generated and stored in a local file under `%LOCALAPPDATA%\Melange\` (location only; the value is not recorded here); `deploy/index.html` re-locked (148 MB, crypto verified 24/25, the only fail being a type=text field); DEPLOY.md scrubbed; NOT uploaded to Netlify; rollback in the scratchpad folder `relock_backup_20261010`.
- **Still open and Paul's to decide:** the tracked unlocked `data/money/Moneyball_email.zip` (check repo visibility, then untrack, possibly rewrite history); the elevated ClaudeSystemSentinel task running a user-writable script; password literals in the brain STATE.md (two line locations named in the memory); stamping the stance sidecars; data backups; renv.lock; a pip-audit run. New standalone tests are not registered in `run_tests.py`. Kernel after landing: 276/1, the one failure being a stale `sentinel_admissions.json`, unrelated.
- Related memories: `api-key-exposure-do-not-flag`, `ask-before-substantive-changes`, `live-tree-eol-census-2026-09-19`.
