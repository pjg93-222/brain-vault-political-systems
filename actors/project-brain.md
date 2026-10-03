---
type: actor
name: "Project Brain toolkit"
aliases: ["Project Brain", "melange brain"]
category: "tool"
description: "Project Brain toolkit: Paul's hardened brainctl starter kit giving disposable AI sessions durable per-project memory (STATE/CONSTRAINTS/DECISIONS/DEADENDS), outside the Melange repo, with nested brain repos and post-commit mirrors."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Project Brain"
stack: "Python brainctl.py (brainctl starter kit) + markdown brain files, git (toolkit repo + nested brain repos under brains\\), bare mirrors in C:\\Users\\pgoff\\GitMirrors"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "boot-protocol-framework_3-DRAFT.md: v3 is DRAFT, v2 governs until Paul ratifies via DECISIONS"
  - "Post-commit mirror hooks are NOT versioned; re-create after any re-clone"
  - "Mechanical receipt-presence gate for Codex dispatches still only recommended"
  - "Cosmetic nits: Restore from git message on git-less brains; on-a-file says folder does not exist; status double-message when STATE absent; orphan-brain path if a toolkit template file is missing"
  - "Evaluation pilot (5-10 scorecarded sessions) defined in EVALUATION.md but not started"
  - "Carbonite coverage of the four new mirror folders unconfirmed (Paul to check green badge)"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/project-brain-toolkit-2026-08-11.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\project-brain-toolkit-2026-08-11.md", sha256: "426022161f53e4a6aecc7d7472449fde76a6aad9c364e0bff2ad7449ba129f02"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "preserve@agent"
tags: ["type/actor", "status/active", "domain/platform"]
---

# Project Brain toolkit

> The brainctl starter kit (from Paul's project-brain.zip), hardened with every Part-3 amendment of `boot-protocol-framework.md`, living at `C:\Users\pgoff\OneDrive\Desktop\Project Brain` as its own git repo fully outside Melange. The melange-systems brain is seeded and boots via CLAUDE.md; brains record decisions D-### and dead ends DE-###.

## Details

| Field | Value |
|---|---|
| Repository | `C:\Users\pgoff\OneDrive\Desktop\Project Brain` (own git repo, fully outside Melange; built 2026-08-11, run run-20260811T2032536926854Z-9504fd764f, toolkit commit 34a773a) |
| Stack | brainctl (`python brainctl.py ...`), markdown brain files, nested git repos under `brains\` |
| Status | active |
| Criticality | medium |
| PCI | false |
| Team | none |

## Dependencies

- Serves [[melange-systems]] (the `melange-systems-brain` is seeded and boots via CLAUDE.md) and the parent topic [[2026-07-feature-agent-tooling-stack]].
- Depends on: the framework document `boot-protocol-framework.md` (copy lives in the repo), git, Python, the mirror bare repos at `C:\Users\pgoff\GitMirrors\<name>.git` (outside OneDrive, beside the Melange and glassbox-runtime mirrors), and OneDrive/Carbonite for backup (Carbonite coverage of the four new folders is Paul's to confirm).
- Codex lane coupling: the Codex receipt-omission class (5-for-the-day on 2026-08-11) led to the receipt-first preamble amendment; related memory `universal-lane-laws-2026-08-09`.

## Flows

- **What the hardening adds:** D-###/DE-### entry schemas with reversal conditions; supersession-never-deletion (`decide --supersedes` flips Status); 7-day `Last verified` staleness; boot confirmation that must cite a decision ID + dead-end ID; conflict precedence CONSTRAINTS > DECISIONS > STATE (contradictions halt); 500-line ARCHIVE/ compaction (manual only); protocol self-governance via DECISIONS.md; plus an EVALUATION.md scorecard/audit instrument (never read at boot).
- **Folder toggle (Paul-ratified 2026-08-11, commit a3ac26b):** `python brainctl.py on <folder>` / `off <folder>` writes/removes a managed block (exact markers `PROJECT-BRAIN:BEGIN/END`) in that folder's CLAUDE.md so Claude Code sessions there auto-boot from the brain; one sticky brain per folder (`.origin` provenance, sha256-8 collision fallback), auto-created under `brains\`; `off` removes only the block, byte-preserving the rest.
- **Writing to a brain (current rule, from 2026-08-12):** Claude may write into a brain's files and commit directly (brainctl `decide` / `deadend` / `skill` / `flush`, or editing STATE/CONSTRAINTS then `flush`). Entries must be accurate, sourced and reversible-by-supersession (never delete an entry, flip its Status); anything genuinely contentious goes to Paul as a question rather than into the file as a fact.
- **Mirroring (2026-09-19):** after every commit, each repo's `.git/hooks/post-commit` pushes `--all` and `--tags` to its `mirror` remote (`|| true`, exit 0, so it can never fail or delay a brainctl commit).

## Dev Commands

```bash
python brainctl.py on <folder>      # write managed PROJECT-BRAIN:BEGIN/END block into the folder's CLAUDE.md
python brainctl.py off <folder>     # remove only the managed block
# brainctl subcommands named in the sources: decide (with --supersedes), deadend, skill, flush, scorecard
# Hook write recipe (BOM-less LF): [IO.File]::WriteAllText(..., UTF8Encoding($false))
```

## Known Issues

- `boot-protocol-framework_3-DRAFT.md` (commit 8f6cef9): **v3 is DRAFT, v2 governs until Paul ratifies via DECISIONS.**
- The post-commit mirror hook is NOT versioned - re-create it after any re-clone (BOM-less LF file written with `[IO.File]::WriteAllText(..., UTF8Encoding($false))`).
- Codex receipt-omission class hit 5-for-the-day (2026-08-11) and recurred twice in this build (ledger evts 189/190): the receipt-first preamble amendment landed on live main 14cde015d + user copy md5-synced, but prose is demonstrably weak; the durable fix is a MECHANICAL receipt-presence gate (recommend at next lane-law review).
- An adversarial review round adjudicated 13 fixes into a3ac26b (staleness robustness, output fidelity, fresh-brain "none yet" citation, etc.). Deferred nits from that round: missing-file tracebacks, the framework's inverted update-drafts ratio (Paul's call), init-on-file crash, EVALUATION exempt from line-count check, `on` against a nonexistent folder, deep-path git "Filename too long". The same-day close-out commit 33ffb02 (see History) then corrected the evaluation ratio and added the nonexistent-folder guard, friendly missing-file errors, the init-on-file error, an EVALUATION status row and `core.longpaths`; the cosmetic nits below remain.
- Remaining cosmetic nits after the close-out: "Restore from git" message on git-less brains, on-a-file says "folder does not exist", status double-message when STATE absent, orphan-brain path if a toolkit template file is missing.
- The evaluation pilot (5-10 scorecarded sessions, audits, pre-committed kill criteria) is defined in EVALUATION.md but not started.
- Whether Carbonite covers the four new folders is Paul's to confirm (green badge).

## Standing rules and decisions

- **Why Project Brain exists:** Paul wants durable per-project memory for disposable AI sessions, with himself as sole owner.
- **Ratified 2026-08-11:** location = Desktop; toolkit + empty pilot brain (`brains\pilot-brain`, commit 1ce7347, project unnamed - Paul seeds STATE/CONSTRAINTS); brainctl scope = full hardening incl. `scorecard`.
- ~~Original rule (2026-08-11): sessions DRAFT updates; only Paul runs brainctl and commits - draft text and hand it to Paul, never write.~~ **SUPERSEDED 2026-08-12, Paul: "yes that override stands going forward" (brain D-006).** The original rule is RETIRED; do not re-propose it or ask permission per-commit. First exercise of the override: the melange-systems brain seed, commit 2026-08-12 12:09. (Still-standing contradiction noted in the QME lane: D-006 contradicts CLAUDE.md on who commits the brain.)
- Brains are nested git repos under `brains\`; the toolkit's .gitignore keeps them out of the toolkit repo - don't "fix" that.
- Framework Phase-1 backfill (a Melange-seeded brain) was offered, not chosen - don't re-propose unprompted.

## History

| Date | Event |
|---|---|
| 2026-08-11 | Built (run run-20260811T2032536926854Z-9504fd764f, toolkit commit 34a773a); pilot brain commit 1ce7347; folder toggle a3ac26b with 13 adjudicated review fixes. |
| 2026-08-11 | One-shot close-out (Paul: "Finish it all"): 33ffb02 (evaluation ratio corrected to drafts / events + 5 robustness fixes: nonexistent-folder guard, friendly missing-file errors, init-on-file error, EVALUATION status row, `core.longpaths`) and 8f6cef9 (`boot-protocol-framework_3-DRAFT.md`). Receipt-first preamble amendment on live main 14cde015d. |
| 2026-08-12 | Direct-commit override stands ("yes that override stands going forward"); melange-systems brain seed commit 12:09. |
| 2026-09-19 | MIRRORED (Paul: "set up the brain mirror", brain D-058): the toolkit and all three brains (`melange-systems-brain`, `folder-brain`, `pilot-brain`) each have remote `mirror` -> `C:\Users\pgoff\GitMirrors\<name>.git` (toolkit = `project-brain.git`), bare, outside OneDrive. Verified: heads equal and fsck clean on all four, and a live brainctl commit moved the mirror's master by itself. |
| 2026-09-30 / 2026-10-01 | QME lane appends brain entries: D-070 to D-074 / DE-051 to DE-053 (F6 recovery), D-075 to D-081 and DE-054/055 committed as 02de571 (outcomes PENDING). |

## Related Actors

- [[brain-vault-political-systems]] - Separate Obsidian + Bedrock knowledge vault (not the brainctl toolkit); the two "brain" systems are distinct

## Related Topics

- [[2026-07-feature-agent-tooling-stack]] - Codex executor lane, Gemini/Grok lanes, skill library, QME skill, Project Brain, RunPod sessions, GLASS BOX lock hang, Higgsfield trap.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
