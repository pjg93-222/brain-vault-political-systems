---
type: topic
title: "Stale imports and the v6-to-v7 spine repoint (09-06/07) (Staffer network data and math)"
aliases: ["Staffer network data and math: Stale imports and the v6-to-v7 spine repoint (09-06/07)"]
category: "feature"
status: "in-progress"
people: []
actors: []
objective: ""
created_at: 2026-09-01
sources: []
updated_at: 2026-10-04
updated_by: "teach@agent"
tags: ["type/topic", "status/in-progress", "domain/data", "category/feature"]
part_of: "[[2026-09-feature-staffer-network-data-and-math]]"
---

# Stale imports and the v6-to-v7 spine repoint (09-06/07) (Staffer network data and math)

> The stale-imports lane of 2026-09-06 and the closeout of the v6-to-v7 spine repoint on 2026-09-07. Part of [[2026-09-feature-staffer-network-data-and-math]] (project [[melange-systems]]).

## Stale-imports lane (2026-09-06)

Source memory `staffer-stale-imports-lane-2026-09-06` (session `778ab9be-d108-415e-a2e0-bbb305a26f15`, last modified 2026-09-06). Lane worktree: `claude/staffer-network-stale-imports-2e9e82`.

- **The defect.** `fec/audit/audit_stale_imports.py` reported **42 bare-import findings across 21 try/except sites in 15 files** (all `fec/surfaces/staffer_*.py` plus `install_staffer_live.py`). Every one was the `except ImportError:` arm of a `try: from .staffer_x import Y` pair, the direct-script-execution fallback. The figure recorded in the brain's `STATE.md` ("10 bare imports") undercounted; the true count is 42.
- **The fix idiom** (0 `# stale-ok:` pragmas): in the `except ImportError:` arm, insert the repo root on `sys.path` behind a membership guard, then import package-qualified:

```python
except ImportError:  # direct script execution: no package context
    import os as _bootstrap_os, sys as _bootstrap_sys
    _bootstrap_root = _bootstrap_os.path.dirname(_bootstrap_os.path.dirname(
        _bootstrap_os.path.dirname(_bootstrap_os.path.abspath(__file__))))
    if _bootstrap_root not in _bootstrap_sys.path:
        _bootstrap_sys.path.insert(0, _bootstrap_root)
    from fec.surfaces.staffer_identity_auto import normalized, name_parts
```

- `fec/` and `fec/surfaces/` have **no `__init__.py`**: they are PEP 420 namespace packages, and `fec.surfaces.X` resolves anyway (proven, not assumed). The membership guard is mandatory, not cosmetic: four sites are deferred in-function imports in hot paths (`staffer_live_service.py:489` in identity prepare, `staffer_routing.py:374` inside `route()` on a threaded HTTP server) where an unguarded `insert(0, …)` would grow `sys.path` without bound. Several of these files carry **mixed CRLF/LF** line endings, so edit line-by-line preserving each line's own terminator.
- **Cross-lane write (the important part).** LIVE was already fixed at 15:54:07 on 2026-09-06 by a *different* session (worktree `politico-crawl-monitoring-e05497`, branch `claude/staffer-network-consolidation-429f0d`), with a verified pre-edit backup at `Melange Systems\backups\staffer_stale_imports_20260906\` and **no record document**. Transcript timestamps prove the direction: this lane authored the idiom at 15:09:49, that session read this worktree's in-flight file at 15:17:10 (`head -30` of the worktree path) and re-emitted the same idiom into LIVE 37 minutes later, its script docstring calling it "the established sys.path bootstrap", a string that existed in zero committed files. The two versions are content-identical; `staffer_live_service.py` differs only by six line terminators, which will trip any byte-match/hash gate comparing LIVE to the worktree.
- **How that happened, and the guard:** the live root *contains* `.claude/worktrees/`, so an agent told to "derive the house pattern from non-offending files in this directory" and left to recurse from the live root ingests other lanes' uncommitted work as if it were convention. Pattern-derivation sweeps must be pinned to `git grep HEAD` or `--exclude-dir=.claude`.
- **State at close: CLOSED 2026-09-06.** LIVE carries both the fix and the regression coverage. Paul gated the apply in chat ("apply the test file and registration line to LIVE"); `fec/tests/surfaces/test_staffer_surface_import_modes.py` (10 checks: package-mode import, script-mode subprocess with only `fec/surfaces` on the path, lane-scoped audit guard) plus its registration at `fec/tests/run_tests.py:418` are now in LIVE, uncommitted. Backup + authored manifest at `backups/staffer_import_regression_20260906/` (gitignored; it names this lane as author, unlike the earlier staffer backup). LIVE's `run_tests.py` also carries **+44 uncommitted lines from another lane** in the same `_LANE_MODULES` tuple around 336-390; the registration was appended at the END of the tuple, additive, `git diff --stat` = 46 insertions / 1 deletion (the deletion is the old tuple-closing line gaining a comma). LIVE kernel after apply: **182 passed, 1 FAILED** (was 181/1), the +1 being this suite, which appears in the run as `OK test_staffer_surface_import_modes suite clean` (proof the registration resolves). `audit_stale_imports` reports `OK … suite clean`.
- **The worktree cannot run the kernel suite.** `run_tests.py` dies at line 185 in `cpf_pressure` (`TypeError: 'in <string>' requires string as left operand, not NoneType`) because the worktree's `data/` lacks the engine/party artifacts: all 533 members resolve to party `None`. Registration is at line 553, execution at 563, so **`audit_stale_imports` is never reached in a worktree run**; any "worktree kernel is green/red" claim about this check is unfounded. LIVE's kernel suite is the only meaningful measurement: **181 passed, 1 FAILED**, the failure being `test_primacy_tier :: test_frozen_board_fixture_matches_all_533_members` (frozen-board tie-order drift, 'Pete Stauber' vs 'Mike Lee' at index 99), unrelated to staffer work.
- Related memories: `staffer-dashboard-section-lane-2026-09-04`, `staffer-live-sidecar-2026-09-04`, `live-tree-branch-state-2026-07-14`, `verify-dont-infer-completion-2026-08-04`.

## v6-to-v7 spine repoint closeout (2026-09-07)

Source memory `staffer-v7-repoint-closeout-2026-09-07` (session `b0437c0a-8183-41cb-a889-edac71e52ba7`, last modified 2026-09-08). Commit `86750d822` on main in the LIVE tree finished the `hill_personnel_spine_20260903_v6_primary` -> `..._20260907_v7_primary` repoint (`fec/surfaces/staffer_payroll_identity.py:53`, `fec/tests/staffer_network/test_staffer_name_standard.py:63`) and fixed `fec/surfaces/repin_staffer_live.py:49` + `:24`, which defaulted to `staffer_social_network_20260904_v5_primary`, a generation that has NEVER existed on disk. Four files, staged by explicit path only.

Three durable facts this cost real time to establish:

1. **`fec/surfaces/test_repin_staffer_live.py` is NOT registered in `fec/tests/run_tests.py`.** That runner selects by explicit lane (`:363-364`: an unregistered suite is never invoked), so nothing in the kernel gate ever ran it. That is exactly why the dead `20260904_v5` default and its mirrored expectation at `test_repin_staffer_live.py:223` survived the whole re-key untouched. Registering it is change-control and therefore Paul's call, still OPEN. Any future `DEFAULT_GENERATION` bump goes stale the same silent way.
2. **A stale `.pyc` reading "wrong" is usually the WRONG `.pyc`.** pytest imports test modules through its assertion-rewriting hook and reads `<mod>.cpython-312-pytest-<ver>.pyc`, never the plain `<mod>.cpython-312.pyc`. Both sit in the same `__pycache__`. The plain one can be days stale and CPython simply rejects it. Check the pytest-suffixed file, and validate the header against the source with `importlib._bootstrap_external._validate_timestamp_pyc`, before concluding a suite ran against old code. To settle it for real: run with `PYTHONDONTWRITEBYTECODE=1 python -B` plus `PYTHONPYCACHEPREFIX` pointed at a scratch dir, and prove which file was opened with a `sys.addaudithook` probe.
3. **A spine repoint fails SILENTLY, not loudly.** Both spine generations stay on disk, so `@unittest.skipUnless(SPINE.is_file(), ...)` passes either way, and `_reconstruct_from_payee_key` reads `payee_key` with `.get()`, so v7's extra `first_class`/`suffix` keys going missing under a stale v6 pin produces a PASS, not a crash. Nothing in the suite asserts which generation it read.

Also: `cp -p` preserves the source mtime, so a `.pre` backup made minutes ago can be invisible to `find backups/ -mmin -90`. The `HHMMSS` in the backup filename is the reliable creation signal; its mtime is not.

Still open after this commit: `audits/staffer_network/test_finish_staffer_social_network_chain.py:82-83` pins the v6 spine under a foreign `C:\melange\` root; `generation_registry_20260906.{json,md}` still names v6 ACTIVE / newest_of_family and predates v7.

Related memories: `staffer-sorting-lane-2026-09-06`, `staffer-stale-imports-lane-2026-09-06`, `staffer-live-sidecar-2026-09-04`, `verify-dont-infer-completion-2026-08-04`, `live-tree-branch-state-2026-07-14`.

Superseded 2026-09-08 (dated, 2026-10-04 document import): the v7 spine was replaced by the verified v8 spine; see [[2026-09-08-staffer-spine-identity-adjudication]].
