---
type: fleeting
title: "Code review five lanes (2026-09-13)"
aliases: ["code-review-five-lanes-2026-09-13"]
source: "session"
captured_at: 2026-10-11
created_at: 2026-10-11
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[2026-07-troubleshooting-melange-audits-and-reviews]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/code-review-five-lanes-2026-09-13.md", type: "claude-memory", synced_at: "2026-10-11", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\code-review-five-lanes-2026-09-13.md", sha256: "d49fe0f63db712db14de11391e47efd3e357488a38c61f57825f90a96380e824"}
updated_at: 2026-10-11
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Code review five lanes (2026-09-13)

> Five-lane code review 2026-09-13 (behavioral, long-form audio, webscraping, demographics, staff list) — packet at audits/code_review_20260913 in worktree melange-systems-code-review-859518; 141 finding rows, 112 confirmed, NOTHING APPLIED (ask-first); three systemic findings and a pillar-weights dis

## Content

**UPDATE 2026-09-19 (verified by hunk match, see `melange-live-tree-reconcile-2026-09-19`): the "UNAPPLIED" statements below are STALE.** The review session applied 90/90 patches to the LIVE tree on 2026-09-14T05:58Z (71 files rewritten in one minute; byte-exact pre-images of 94 files in gitignored `backups\code_review_20260913\`, taken 02:42Z). Present in LIVE, uncommitted: class A 30 full / 2 partial / 20 absent; class B (Paul-gated) 22 full / 5 partial; class E (needs revision) 2 full / 2 partial; class C 0 of 3. The packet is no longer in any worktree - read it from commit `77959ae74` (retired branch `claude/melange-systems-code-review-859518`). Paul's authorising words for the apply were not found.

Review of the COMMITTED tree at HEAD 2f11d9490 (read-only worktree), 2026-09-13. Nine Opus review lanes, nine adversarial verifiers, five live-tree rechecks, three mechanical censuses. Packet: `audits/code_review_20260913/` in the review worktree (also scratchpad `packet/`): REVIEW_REPORT_2026-09-13.md, FINDINGS_INDEX.md/.json, reports/, census/, combine/, patches/ (106 v1), patches_v2/ (revisions + live-rebased variants). All patches UNAPPLIED; worktree clean throughout.

Results: 141 finding rows; verifier classes A 52 (safe as a set) / B 35 (Paul-gated) / C 5 (withdrawn) / D 37 (report-only) / E 12 (patch needed revision, v2 produced). 17 refuted or partly refuted by verifiers (list in FINDINGS_INDEX.md), which is why the adversarial pass is mandatory.

Systemic findings (S-1..S-5 in the report):
- S-1 Committed tree is not self-contained: `run_tests.py:386` registers `test_email_package_variant` (untracked, so the committed runner crashes at import); `audit_full.py:107`, `dashboard_integrity.py:9` and via it `make_member_desk.py:28` import live-only `fec/engine/pillar_policy.py`; `weekly_refresh.py:353` needs live-only `wikipedia_biographies.py`; `staffer_live/index.html` gitignored. 53 cited files differ in content between HEAD and live; 8 findings fixed only in live. See `committed-vs-live-drift-2026-09-13`.
- S-2 Kernel gate reaches 105 of 265 tracked suites; 92 unreachable in both trees (all 3 demographics, all 11 speech, 9 collect, 8 staffer_network, 15 surfaces, more). Red registered suites: test_combined_staffer_section (3 stale assertions after link relocation 57f993316), test_staffer_surface_import_modes (stray `%TEMP%\inspect.py` shadows stdlib), test_descriptive_contract_and_surfaces (2 stale).
- S-3 Confirmed IN-CHAIN period-2 oscillation of primacy factors: `verify_collector_roster_updates.py` regenerates the sidecar whole against a bundle that already absorbed it; `primacy_factors.py:449/:357` scores from that bundle. DE-016's "standalone guard" is the wrong shape. Fix = cumulative membership source for the desk (Paul's architecture call).
- S-4 Brain-rule deviations: D-019 count missing in employment_promotion (STAFFA-4); POSSIBLE_ONLY snapshot filter exists only in live (STAFFB-1); chamber-wide cliques (STAFFA-8); WJ dedupe keeps v1 vs CONSTRAINTS "keep longer" (AUDIOA-10); truncated-surname EXACT keys vs D-025 (STAFFC-6).
- S-5 Pillar weights: law 14 says 30/25/40/5; ranks_python.json 45/10/40/5 since 09-03; live-only pillar_policy.py encodes 45/10/40/5 and is a fail-closed desk gate. RULED 2026-10-11 (decision F-1, audits/decisions_20261011/F_residual.md): 45/10/40/5 is Paul's 2026-09-03 directive; docs fixed.

**How to apply:** Do not re-review these lanes; start from the packet. Sequence proposed to Paul: (1) rule on S-5 and a commit pass of the live tree; (2) delete `%TEMP%\inspect.py`, fix the 3 stale assertions; (3) apply class A to the LIVE tree using `.live.patch` variants where HEAD patches fail (run_tests.py, SCRAPEB-10b), then kernel + audit_full in live; (4) rule on class B; (5) design items (SCRAPEB-1 first). Related: `ask-before-substantive-changes`, `scout-census-traps-2026-09-13`.

## Possible Connections

- [[2026-07-troubleshooting-melange-audits-and-reviews]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-11 from the Claude Code memory file `code-review-five-lanes-2026-09-13.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[2026-07-troubleshooting-melange-audits-and-reviews]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
