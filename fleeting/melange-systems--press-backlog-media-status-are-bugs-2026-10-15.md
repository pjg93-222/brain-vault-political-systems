---
type: fleeting
title: "Press backlog media status are bugs (2026-10-15)"
aliases: ["press-backlog-media-status-are-bugs-2026-10-15"]
source: "session"
captured_at: 2026-10-15
created_at: 2026-10-15
status: "promoted"
promoted_to: "obsidian://open?vault=linked&file=knowledge%2Fcuration%2Frefresh-and-data-integrity"
project: "melange-systems"
memory_type: "feedback"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/press-backlog-media-status-are-bugs-2026-10-15.md", type: "claude-memory", synced_at: "2026-10-15", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\press-backlog-media-status-are-bugs-2026-10-15.md", sha256: "f28e3554ca35dea5cc5b89a0014c2e0909a98376f6636c9b4230eadb4d91ca20"}
updated_at: 2026-10-15
updated_by: "codex/intake-curation"
tags: ["type/fleeting", "status/raw"]
curated_at: "2026-10-16"
---

# Press backlog media status are bugs (2026-10-15)

> Paul ruled 2026-10-15 — press backlog never draining and daily media top-level PASS despite partial press are BUGS, not design

## Content

Paul's ruling 2026-10-15: the press backlog (October press never promoted; intake rejected PENDING_BODY_ATTEMPTS) and daily_media_refresh.py reporting top-level PASS while press was PARTIAL and intake/feed/fold were parked are NOT by design. Fix them.

**Why:** I wrongly cited DE-020 as making them "by design". DE-020 only forbids treating press PARTIAL exit 3 as a FATAL daily failure (retry storm, re-spent CLI calls). It does not license a PASS label over partial work, nor a backlog that never drains.

**Follow-up rulings same day (Paul):** "there should never be a backlog, it should be flowing always" — press must promote incrementally every run (pending URLs carried forward, not blocking); three-run tombstone only retires dead URLs. Also: raise the classifier spend limit "with diminishing returns and cost efficiency in mind"; rebuild honors + per-area grade; restamp the stale source-hash pins; Docker admin restart approved. Later same day (AskUserQuestion): spend cap = interactive + $150 (Paul sets it at claude.ai/settings/usage; pipeline per-run call cap sized to push the 119th backlog over months); MoneyballCongressRefresh may be disabled during the full-chain rebuild then re-enabled; press recency_weight = LATEST run wins (model input; ranks may shift).

**How to apply:** truthful status (e.g. top-level PARTIAL) that stays non-fatal and non-retrying; catch-up anchor must not advance past unfinished work; backlog must drain under existing gates (three-run tombstone rule, fold OFF until composition test, D-159). Don't call an operational defect "by design" without a DECISIONS entry that says so. Related: `dont-be-jumpy-removing-money-2026-09-26`, `ask-before-substantive-changes`.

## Possible Connections

- none found yet

## Capture Context

Captured by the brain capture hook (`.bedrock/recall/hook.ts sync`, run on Stop and SessionEnd) on 2026-10-15 from the Claude Code memory file `press-backlog-media-status-are-bugs-2026-10-15.md` of project `melange-systems` (memory type: feedback). The text above is the memory file verbatim, except that headings are demoted two levels and memory-name references are written as code. To dismiss this capture, set `status: archived` or delete the note; a deleted note comes back only when the memory file changes. New source: no curated note holds this memory file yet. To promote, turn it into a permanent or bridge note with `/bedrock:preserve` (or merge it into an existing one), then set `status: promoted` and `promoted_to` here.
