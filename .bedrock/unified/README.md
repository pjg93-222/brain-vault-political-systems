# Combined Obsidian workspace

`unified.py` adds grouped navigation and research recall to the existing combined `linked` vault. Brain and research remain independent canonical repositories joined by Windows junctions. Their original paths, source history, Claude memory capture, and upload rules are unchanged.

## Commands

```powershell
python .bedrock/unified/unified.py refresh
python .bedrock/unified/unified.py sync
python -m unittest discover -s .bedrock/unified -p "test_*.py"
```

`refresh` builds Home, Library, Connections, a consolidation review, an operating guide, and the aggregate CLAUDE contract. Every generated file link must resolve before navigation is written. Navigation collapses exact SHA-256 duplicate contents. Source files, annotations, old versions, and different same-name notes are never removed. Templates and processing directories are excluded. Different same-name notes are listed for review and linked by full namespace.

`sync` runs the existing `vaultlink/vault_sync.py` intake and bridge builder before refresh. A failed or timed-out intake still allows navigation to refresh, but the command retains a failed exit status. Logs, the inventory, the research index, locks, and failure state live under ignored `cache/`.

`research_index.ts` uses the existing Bedrock secret scanner; a note with a hit is omitted. The research-only Claude recall hook reads the prebuilt cache, returns at most three titles and absolute paths, and does not read whole notes during a prompt. Existing engineering recall remains responsible for brain content. New/changed memory capture still flows to the original brain `fleeting/` folder.

## Claude integration

Install additional command hooks in the user's existing settings, preserving every unrelated hook:

- SessionStart: `python unified.py hook session-start`
- UserPromptSubmit: `python unified.py hook recall`
- Stop / SessionEnd: `pythonw unified.py hook refresh`

The refresh hook launches a hidden detached worker, throttled to once per minute and protected by an exclusive lock. It performs no inbox intake or Git operations. Errors are saved to `cache/last-error.txt` and the next SessionStart points to that file.

Windows scheduled task `vaultlink-sync` should call `pythonw unified.py sync` at logon and every 30 minutes, with an interactive least-privilege principal, normal process priority (Task Scheduler priority 5), one instance, and a 15-minute limit. The default below-normal priority can starve on a busy workstation and cause Git timeouts. This wraps the existing inbox importer rather than introducing a second competing intake.

## Git boundaries

Only this integration code belongs to the brain repository. Generated aggregate pages are reproducible workspace files. Never stage junctions as a second copy of either repository. Existing curated-note PR workflow and generated-memory direct-upload policy remain authoritative. Original research binaries retain their existing local-only policy.

The one-time old-copy audit compared all Markdown file bytes and paths: the test copy had no unique note paths/content; the development worktree also had no unique note paths/content. Their differing versions were preserved outside the active aggregate. This is not a claim that their wording is interchangeable. Counts in the recovery section record that audit, not a continuously repeated deletion policy.

## Private connected sources

`sources.py run --publish --refresh` reads research intake, named Claude project memory files, completed Codex final answers, existing native Codex memory summaries, and committed documentation from configured local repositories. It writes to `Documents/knowledge-private`, joined as `linked/knowledge`. This collection must use a verified **private** GitHub repository; publication fails closed if privacy cannot be confirmed. Existing brain and research repositories retain their histories and workflows.

Codex SQLite connections are read-only. The adapter follows explicit completed final-answer pointers, excludes subagent histories, and never reads reasoning or tool streams. The latest completed answer updates one card per main chat. These captures are source-reported outcomes, not independently verified state. The adapter checks the schema and reports failure if it changes.

Project documents come from committed HEAD blobs, deduplicated by repository identity and relative path. Blob caches avoid rereading unchanged files. Claude memories already represented by matching source path and hash in curated brain notes are linked rather than imported again. Document byte hashes and conservative exact bibliographic title matches reuse existing canonical research notes. Distinct editions and different text are retained.

The source scanner reuses Bedrock secret patterns before writing any new or changed capture. Scanner changes invalidate the scan cache. This is pattern detection, not a guarantee that all sensitive information is removed; all connected captures remain private. Original binaries and full extraction caches remain local and ignored. PDFs use local PyMuPDF extraction; optional local Tesseract language data enables resumable bounded OCR. OCR stays explicitly unverified.

Stable source ids update existing cards. Generated fingerprints and the local manifest protect hand-edited cards; changed sources behind edited cards or curated guides appear in `Review queue.md`. Automatic imports never rewrite authored synthesis. Repeated imports do not create new dated copies. `Curation rules.json` supplies reviewed title/category overrides. Metadata-only promotions keep original intake bodies and titles intact.

Windows task `vault-knowledge-sources` calls `pythonw sources.py run --publish --refresh` at logon and every five minutes, interactive least privilege, hidden, priority 5, IgnoreNew, 15-minute limit. Existing `vaultlink-sync` continues its 30-minute research intake job. Separate source and navigation locks prevent overlapping writers. A successful source run records `.integration/last-run.json`; failures record `last-error.txt` and are surfaced at Claude SessionStart. Offline or push failures retain local captures/commits for a later run.

Codex's global AGENTS managed block points to the same workspace and `sources.py recall --query "terms"`. Claude's existing recall hook combines research and private indexes, returning at most three paths/titles. Neither system treats historical saved instructions as fresh user authorization. There is no unsupported Codex hook or native memory database modification; scheduled polling captures completed outcomes.

Dependencies: Python 3.12+, PyYAML, PyMuPDF (pypdf fallback), Bun, Git, GitHub CLI authentication; optional `eng.traineddata` for local OCR. This integration is specific to the Windows workstation's local schemas and configured source roots.

### Durable OCR comparison

Private `OCR reviews.json` maps original SHA-256 values to reviewed text under `transcriptions/`, recording transcript hashes, complete/partial status, checked/source page-or-image counts, review date, and unresolved locations. Both are tracked in the private collection. `research_records` verifies the current original bytes and transcript hash before applying a correction; a missing, changed, escaped, or incomplete review cannot clear an item. Complete review becomes `ocr-reviewed`; partial review remains queued with precise unresolved locations. Duplicate originals still retain their own pending review entries, even when their corrected text shares one canonical card.

Review validates extraction fidelity only. Source claims and coursework answers remain `UNVERIFIED`; no facts, answers, or deployment status are certified by comparing a transcript. Source cards link the full transcript and the private review record. Original uncorrected OCR remains in the ignored extraction cache; clearing that cache does not discard tracked corrections. A changed transcript also flags a hand-edited card even when the original-file version has not changed.
