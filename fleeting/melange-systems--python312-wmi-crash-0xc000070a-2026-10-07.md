---
type: fleeting
title: "Python312 wmi crash 0xc000070a (2026-10-07)"
aliases: ["python312-wmi-crash-0xc000070a-2026-10-07"]
source: "session"
captured_at: 2026-10-24
created_at: 2026-10-24
status: "raw"
promoted_to: ""
project: "melange-systems"
memory_type: "project"
updates:
  - "[[lg-gram-workstation]]"
  - "[[2026-07-incident-workstation-stability]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/python312-wmi-crash-0xc000070a-2026-10-07.md", type: "claude-memory", synced_at: "2026-10-24", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\python312-wmi-crash-0xc000070a-2026-10-07.md", sha256: "89965bea62f825232cc3f16c3aa2e93ab588d1463c5f5512919386837c268b57"}
updated_at: 2026-10-24
updated_by: "brain-sync@hook"
tags: ["type/fleeting", "status/raw"]
---

# Python312 wmi crash 0xc000070a (2026-10-07)

> Python 3.12 processes importing pandas or scipy crash with 0xC000070A (exit 3221227274) under heavy load - platform/_wmi timeout + stray handle; not claude-obsidian

## Content

Python 3.12 processes (C:\Users\pgoff\AppData\Local\Programs\Python\Python312 3.12.10, and Codex's bundled 3.12.14, which is Terrier's work\.venv base) die with 0xC000070A, STATUS_THREADPOOL_HANDLE_EXCEPTION, in ntdll at offset 0xc87a4. That is exit code 3221227274, and stderr is empty. First seen 2026-09-12; 166 in the 14 days before 10-06 (90 on 10-01); 52 on the night of 10-06/07.

Diagnosis (about 70%, investigated 2026-10-07): `import pandas` and `import scipy.stats` call platform.machine(), which on 3.12 runs a WMI query in a _wmi.pyd helper thread. Under heavy CPU load the query times out (WMI log shows 0x80041032 cancelled); the abandoned helper later SetEvent/CloseHandle's through a stale pointer (CPython PC/_wmimodule.cpp). The process then dies in random.seed/os.urandom (bcrypt). The exact closed handle is unproven. The 9/9 Windows update may have enabled it. Ruled out: claude-obsidian (Python 3.14, zero crashes), AppXSvc, scheduled tasks. McAfee's DLL is present in all crashes but not in the stacks (low).

Victims: Melange chain steps (build_media_blend.py, build_vote_category.py; the chain exits 1 with empty stderr), test_lda_rebuild.py, and Terrier run_phase3.py and its pandas probes.

FIX A APPLIED 2026-10-07 (Paul approved): `Lib\sitecustomize.py` in BOTH 3.12 bases (Python312, and the Codex runtime ...\codex-runtimes\codex-primary-runtime\dependencies\python), sha256 80b4b9c6...; it covers every venv built on them (Melange .venv-politico, Terrier work\.venv, .venv-20261007, model-study). It sets platform._wmi_query to raise OSError, so platform falls back to sys.getwindowsversion() and `cmd /c ver`; platform values were identical before and after. Only `python -S` skips it (no launcher uses -S). A Codex update can replace its runtime: re-apply by copying the same file to <new base>\Lib\sitecustomize.py, then check that `python -c "import platform; print(platform._wmi_query.__name__)"` prints _wmi_disabled. Roll back by deleting both files and the .pyc. Evidence: under load, 0/90 crashes patched vs 19/30 bypassed (that stress run happened before Paul banned stress tests; never repeat it). Patch body:
```python
try:
    import platform as _platform
    if hasattr(_platform, "_wmi_query"):
        def _wmi_disabled(*args, **kwargs):
            raise OSError("WMI query disabled by sitecustomize (0xC000070A workaround)")
        _platform._wmi_query = _wmi_disabled
    del _platform
except Exception:
    pass
```
Not covered: other WMI users (one fastprox.dll 0xc0000409 crash was seen).

**Why:** a pipeline step that dies with an empty stderr and exit 3221227274 looks like a code bug but isn't.
**How to apply:** on exit 3221227274, rerun once and reduce concurrent pandas-heavy jobs; don't debug the step's code. A per-process workaround is to set `platform._wmi_query` to raise OSError before importing pandas. A machine-wide fix (sitecustomize in the 3.12 installs) is Paul's call. Side note: claude-obsidian's python3 hooks take 2.3-6.7 s against a 5 s limit (54 Stop hooks cancelled): harmless noise.

Related: `claude-obsidian-readonly-install-2026-10-06`, `appxsvc-leak-pythonmanager-2026-09-23`, `terrier-multidistrict-lane-2026-10-06`.

Index hook moved here from MEMORY.md when the index was compacted (2026-10-24): pandas WMI timeout;FIXED sitecustomize;re-apply after Codex update

## Possible Connections

- [[lg-gram-workstation]] — holds an earlier version of this memory file; this note carries the newer text
- [[2026-07-incident-workstation-stability]] — holds an earlier version of this memory file; this note carries the newer text

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-24 from the Claude Code memory file `python312-wmi-crash-0xc000070a-2026-10-07.md` of project `melange-systems` (memory type: project). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. Changed source: an earlier version of this file was imported into [[lg-gram-workstation]], [[2026-07-incident-workstation-stability]], and those notes were not modified. To promote, fold what is new into them with `/bedrock:preserve`, then set `status: promoted` and `promoted_to` here.
