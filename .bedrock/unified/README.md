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

Windows scheduled task `vaultlink-sync` should call `pythonw unified.py sync` at logon and every 30 minutes, with an interactive least-privilege principal, one instance, and a 15-minute limit. This wraps the existing inbox importer rather than introducing a second competing intake.

## Git boundaries

Only this integration code belongs to the brain repository. Generated aggregate pages are reproducible workspace files. Never stage junctions as a second copy of either repository. Existing curated-note PR workflow and generated-memory direct-upload policy remain authoritative. Original research binaries retain their existing local-only policy.

The one-time old-copy audit compared all Markdown file bytes and paths: the test copy had no unique note paths/content; the development worktree also had no unique note paths/content. Their differing versions were preserved outside the active aggregate. This is not a claim that their wording is interchangeable. Counts in the recovery section record that audit, not a continuously repeated deletion policy.
