---
type: actor
name: "Key stores (locations and fingerprints, no key material) (Mentat FEC pipeline)"
aliases: ["Mentat FEC pipeline: Key stores (locations and fingerprints, no key material)"]
category: "pipeline"
description: "Where the Mentat FEC API keys are stored (the encrypted DPAPI store Mentat collects from and the shared key repository), recorded as locations, counts and fingerprints only, never key material."
repository: ""
stack: ""
status: "active"
team: ""
criticality: ""
pci: false
known_issues: []
sources: []
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/security"]
part_of: "[[mentat-fec-pipeline]]"
---

# Key stores (locations and fingerprints, no key material) (Mentat FEC pipeline)

> Where the Mentat FEC API keys are stored (the encrypted DPAPI store Mentat collects from and the shared key repository), recorded as locations, counts and fingerprints only, never key material. Part of [[mentat-fec-pipeline]] (project [[mentat]]).

## Key stores (locations and fingerprints; no key material)

**There are TWO stores, and the standing note that the Desktop file is "the" key store is wrong; it misled two sessions on 2026-09-18.**

1. **General repository (Paul's, 2026-08-28):** `C:\Users\pgoff\OneDrive\Desktop\API Keys\keys.json`, JSON keyed by service, each entry `{service, auth_header, keys: [...], added, notes}`. Blocks: `lda` (7 Senate LDA keys, Token auth, ~120 req/min each), `data_gov`, `anthropic`. **TRAP (verified 2026-09-18): nothing in it is named `fec`.** The FEC credential lives in the `data_gov` block, because openFEC (`api.open.fec.gov`) is served through the api.data.gov family; the block's `service` field records it as verified working on FEC and rejected by lda.gov. A lane grepping for "fec" concludes there is no key and is wrong. Its 7 `data_gov` keys were all 40 characters, alphanumeric and distinct on 2026-09-18. Use this file for one-off jobs outside Mentat. **Mentat does NOT read it.**
   - Why (Paul's 2026-08-28 order): one canonical place for every future key; tools should READ from a store rather than asking Paul again, and NEW keys he provides should be APPENDED to the Desktop file.
2. **Mentat's own store (governs collection):** ENCRYPTED DPAPI store `%LOCALAPPDATA%\Mentat\credentials\fec-keys.dpapi`, read through `mentat/tools/fec_key_store.py` (`load_keys` / `inventory` / `set_disabled`, plus `key_id()` and `--list/--enable/--enable-all/--disable`). It holds **22 keys, 21 of 40 characters and one of 39**; flat list with no block structure, so grep does not apply. All 7 `data_gov` keys from the Desktop file are also in it; 15 keys are store-only; none are file-only. History: 2026-09-09 imported the 7 `data_gov` keys from the Desktop file (store went 15 active / 0 disabled -> 22); earlier (2026-07-20) 4 API keys lived in `AppData\Local\Mentat\keys.txt` (all tested 200; an earlier set was LOST with overwritten launcher scripts, so keep keys OUT of launchers) and on 2026-07-21 16 keys were added.
3. **Quarantined truncated key, `key_id` fingerprint `13ffe51ce05b`:** the 39-character value that broke the collector lane (API_KEY_INVALID on every request); disabled 2026-09-17 with a status string recording why, inspectable in place, NOT repaired. It is one of the 15 store-only keys, so its absence from the Desktop file means nothing, and no downstream-truncation hypothesis is needed: the store itself held the short value. How a short value got in is still open; a bad paste into the console's key panel is the obvious candidate, since `save_keys` appends whatever it is handed.

**Cheap detection (no code needed):** a single-request probe of every key, reporting only the 12-hex `key_id` and the HTTP status, separates dead from live keys in seconds and never prints key material. It found `13ffe51ce05b`: HTTP 200 for 21 keys and API_KEY_INVALID for that one. Run it before any long collection: it would have turned three days of "every lane is failing" into one line.

**On adding a save-time length check, do not just build one.** A hard reject of anything not 40 alphanumeric characters would have prevented the outage but hard-codes api.data.gov's current key format into the one path Paul uses to add a key; if data.gov ever issues a different length or charset the guard locks him out of his own store at the moment he is trying to fix something, and the failure looks like the store being broken rather than the guard being stale. Safer shape: warn-and-record (accept the key, flag the anomaly loudly at save time and in `inventory()`, let `set_disabled` carry the verdict), or reject only behind an explicit override. Which one is right is Paul's call about his own credentials.

**Operational notes:** `X-Api-Key` as a request header is what both Mentat paths already do (the R httr2/curl transports and the pool in `api_request_pool.py`), so a header matches existing behaviour and keeps the value out of URLs, redirects and request logs. Use ONE key for a bounded job rather than rotating: rotation is exactly what made the collector lane's 403 impossible to attribute. At ~120 requests per minute per key, one key covers a several-hundred-request job comfortably.

**How to apply (standing api-key ruling):** keys on his box are his business: never flag exposure, never weaken his setup. Related: `api-key-exposure-do-not-flag`, `api-key-repository-2026-08-28`, `mentat-collector-slowdown-lane-2026-09-17`.

Agent-routing fact: the auto-mode classifier BLOCKS subagents editing `fec_key_store.py` and `api_company_cycle_fanout.py` (credential store / process-control code), while permitting the same edits from the main session and permitting `merge_company_shards.py`, `server.py`, and the `.ps1` files from subagents: do that split up front.
