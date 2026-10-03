# Brain — CLAUDE.md

> This vault is powered by the [Bedrock plugin](https://github.com/iurykrieger/claude-bedrock).
> Plugin-level instructions (entity types, writing rules, tags, git workflow) are loaded automatically.
> This file describes what is specific to THIS vault.

## Purpose

Personal engineering brain: consolidates Claude Code memory files from all projects (systems, projects, decisions, working preferences) into one linked knowledge base.

## Language

All content in this vault is written in **English (en-US)**.
When creating or updating entities, use English for all text content.
Frontmatter keys remain in English. Technical terms in English are acceptable.

## Domains

This vault uses the following domain tags:

- `domain/backend`
- `domain/frontend`
- `domain/infra`
- `domain/data`
- `domain/platform`
- `domain/security`
- `domain/research`
- `domain/agent-ops`

When creating entities, use `domain/<name>` tags from this list.
New domains can be added as the vault grows.

## Quick Reference

| Action | Skill |
|---|---|
| Search and query the vault | `/bedrock:ask` |
| Ingest external sources (Confluence, Google Docs, GitHub repositories, remote URLs, and any docling-supported file format — DOCX, PPTX, XLSX, PDF, HTML, EPUB, images, and more) | `/bedrock:teach` |
| Create or update entities manually | `/bedrock:preserve` |
| Deduplicate and check vault health | `/bedrock:compress` |
| Re-sync entities with external sources | `/bedrock:sync` |

## Import provenance

Entities imported from Claude Code memory files list each source in `sources:` as `{path, sha256}`. Re-imports upsert by source path; never duplicate.
