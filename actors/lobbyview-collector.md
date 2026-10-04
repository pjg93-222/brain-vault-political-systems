---
type: actor
name: "LobbyView LDA collector"
aliases: ["LobbyView"]
category: "collector"
description: "Collector that ingests the MIT LobbyView bulk exports (clients, issues, reports, network) into finance-classified derived artifacts for the Melange lobbying surfaces; committed @a126952 on codex/lobbyview-ingest, not merged to main."
repository: ""
stack: "Python (fec/collect_lobbyview.py, fec/lobbying/*), MIT LobbyView bulk CSV exports (vintage 2024-10-25), LDA API (lda.gov), fail-closed guards"
status: "active"
team: ""
criticality: "medium"
pci: false
known_issues:
  - "Committed @a126952 on codex/lobbyview-ingest but NOT merged to main (merge is Paul's gate)"
  - "LobbyView naics is entity-linkage metadata, not an industry classifier: names decisive, NAICS suggestive only"
  - "Coverage cliff is soft: max_finance_joined_filing_year = 2022; network linkage dies after 2021 (2022 = 2,101 rows)"
  - "Still missing as bulk: texts (issue_text) and bills tables"
  - "LobbyView REST API is 100 requests/day, 100 rows/request, 10k rows/day: surgical lookups only"
  - "Lobbied-member link in interaction_bill_members.csv is DERIVED from cosponsorship, so any lobbied-to-joined correlation is an identity"
  - "Adversary sets are candidate status awaiting Paul's ratification"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/lobbying-member-link-is-circular-2026-08-19.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\lobbying-member-link-is-circular-2026-08-19.md", sha256: "a3b0c09adac890102ab3a88b17a2f8347e7775612945d2b72c01a73541e5338b"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/lobbyview-integration-2026-07-31.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\lobbyview-integration-2026-07-31.md", sha256: "8db2654b3fc68f058893ecc2d793e462b00f9470fe85c29134fc6c7eefc50283"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# LobbyView LDA collector

> `fec/collect_lobbyview.py` ingests the MIT LobbyView (In Song Kim) bulk exports of Lobbying Disclosure Act data into finance-classified derived artifacts; committed @a126952 on `codex/lobbyview-ingest`, NOT merged to main (merge is Paul's gate).

## Details

| Field | Value |
|---|---|
| Repository | none dedicated; part of the Melange repo (`fec/collect_lobbyview.py`); branch `codex/lobbyview-ingest` @a126952 (user-ratified: "get those reports squared away and built in ... gentle and friendly") |
| Stack | Python collector with fail-closed guards; inputs = LobbyView bulk CSVs (vintage 2024-10-25); outputs = 7 derived files |
| Status | Active; committed, unmerged |
| Criticality | Medium |
| PCI | No |
| Team | none |

## Dependencies

- **Upstream data:** MIT LobbyView bulk exports - clients + issues + reports (vintage 2024-10-25, v2024.10.01+ series, STRICTLY INCOMPATIBLE with pre-Oct-2024 releases; `lob_id` supersedes deprecated `client_uuid`, no crosswalk exists) plus the network table. Raw staged and MD5-verified against Paul's zips at `%LOCALAPPDATA%\Melange\lobbyview\raw`; citation/version provenance under `raw\provenance`. Never use the deprecated v2021 legacy zip (incompatible identifiers).
- **Outputs:** canonical derived artifacts at `%LOCALAPPDATA%\Melange\lobbyview\derived` (7 files; `lobbyview_manifest.json` outputs md5 map is the authority, never file presence; derived files include `reports_finance` and `clients_classified`). Raw LobbyView full export (2024-10-25) in `%LOCALAPPDATA%\Melange\lobbyview\raw`: `reports.csv` 383 MB, `clients.csv` (NAICS), `issues.csv`, `network.csv`; coverage per `collect_lobbyview.py`: reports through 2023 plus a 2024 sliver.
- **Downstream consumers:** the lobbying family pages (`lobby-network.html` and siblings), `fec/lobbying/org_mentions.py`, `fec/lobbying/sector_spend.py`, the LDA rebuild (`fec/collect_lda_filings.py`, `fec/build_network_2021_rebuild.py`), the sector-growth study (lobbying input, see below), and the FEC bridge looks. Lane context: [[2026-07-feature-data-collection-lanes]]; owning project [[melange-systems]]; cosponsor and sector network analysis in [[2026-06-feature-cosponsor-and-sector-networks]].
- **External:** lda.gov Senate LDA API (domain moved: `lda.senate.gov` serves HTML with HTTP 200 - fail-loud caught it); `LDA_API_KEY` at `%LOCALAPPDATA%\Melange\lda_rebuild\lda_api_key.txt` (location only); Harvard Dataverse positions dataset doi:10.7910/DVN/D0QWM2.

## Flows

1. Inventory raw CSVs (clients, issues, reports, network) with md5 checks against provenance.
2. Classify clients (name rules RULE_VERSION v2; two-tier confidence) and side-classify reports.
3. Join issue-coded finance reports to clients; write 7 derived artifacts plus manifest (outputs md5 map).
4. Downstream: network repository (member-years), org-mention measurement, dashboards, LDA rebuild comparison.

## Dev Commands

Only flags and script names are recorded in the sources (no full command lines); listed as recorded:

```bash
# collector script (committed @a126952 on codex/lobbyview-ingest)
fec/collect_lobbyview.py
# LDA filings collector modes
fec/collect_lda_filings.py --worklist finance_2021_2024_filings_worklist.json
fec/collect_lda_filings.py --sweep-year <year>        # full-year pagination, LDA_API_KEY-ready (env var)
# network rebuild
fec/build_network_2021_rebuild.py --full-scope --emit-quarterly --emit-bill-index
# bridge look pre-flight mode
--simulate
# unit suites recorded: test_lda_rebuild (172/0, later 174/0, 175/0), test_lobby_interactions
```

## Known Issues

- Not merged to main (`codex/lobbyview-ingest` @a126952); merge is Paul's gate. (An older FEC-lane note said it "rode along" in the a425952 merge; the newer LobbyView note, last modified 2026-08-12, says unmerged - newest wins.)
- NAICS unreliable (below); finance name-rule sets EXCLUDE most fintech/crypto (they classify as `other`) so the union-worklist pattern (finance union pinned) is required.
- Coverage cliff: issue-coded lane trustworthy through 2021 (+ the 2022 sliver); network linkage collapses after 2021.
- Missing bulk tables: `issue_text` (texts), bills (collector inventories them as WAITING).
- API is 100 requests/day: surgical lookups only.
- The lobbied-member link is circular (below).

## Classification: NAICS is not an industry classifier

**THE material finding (standing): LobbyView `naics` is entity-linkage metadata, NOT an industry classifier** - the codebook confirms zero provenance (one sentence, no linked dataset). Names decisive; NAICS suggestive only; 5221 to financial_other never bank. Two-tier confidence: HIGH = unambiguous name token (53 banks, 50 CUs); LOW = generic `\bBANK\b` or NAICS-only (191 banks) = review queue. Build adversary sets from HIGH only; sets remain candidate status awaiting Paul's ratification.

**USER-RATIFIED CU-set membership (Paul verbatim 2026-07-31):** "state leagues are credit unions, same with cuso's don't over think that" - state credit-union leagues AND CUSOs classify as credit_union; encode directly in the CU name rules/overrides; do NOT put these two in any review queue.

**Regex lessons (RULE_VERSION v2):**
- `\bCREDIT UNIONS?\b` - the plural `S?` is REQUIRED; a singular-only anchor silently dropped NAFCU-spelled-out, WOCCU, League of Southeastern CUs, Natl Fed of CDCUs (caught only by the output-equivalence hash check, not by review).
- `MAJOR_BANK_RE` needs `\b(?:...)\b` (TRUIST vs ALTRUIST).
- `\bCUNA\b` alone is a false-positive generator (CUNA DEL MAR LP = PE firm); require CUNA MUTUAL.
- Verify any classifier edit by hash-diffing the classified CSV, not by eyeballing the regex.
- 2026-08-05 bank guard tightening (Paul: "lets tighten up the banks"): `\bBANKS?\b` generic instrument guarded by a pluralized noncommercial class (+TISSUE/DIAPER/DATA), `multilateral_development_bank` (BRIGHT LINE: development/policy banks OUT, commercial foreign banks IN - MUFG/Habib/Bakai stay), `nonbank_name_collision` (Katz Banks Kumin both vintages, Christopher AND Banks - & normalizes to AND). Roster 372 to 361 (bank 143 to 132). Fintech/CU exclude tables remain EMPTY.

## Receipts (canonical, reproduced 3x, CSVs byte-identical)

- clients 48,527; issues 2,559,161 to 322,473 finance-coded reports; reports 1,690,362 to 318,533 finance-joined; dup uuids 0; blank `lob_id` 1; unknown `lob_id` 17,336 (cross-table vintage mismatch, side = other); finance_unmatched 3,940; `n_amendment_rows` 91,820; `duplicate_natural_keys` 215,174 (coarse-key collisions - registrations/terminations/no-activity share the key; NOT amendment double-counting; the export is latest-version-only per codebook, 120,166 keys have >1 NON-amendment rows proving the key is coarse).
- ABA $228M vs CUNA $93M, ~10:1 bank:CU.
- **Coverage cliff is SOFT:** `max_finance_joined_filing_year` = 2022 (a sliver of 2022 issue-coded; collapse after 2021; reports-only through 2023 + 2024 sliver).
- Amount semantics: self-filer = expense, hired firm = gross income, rounded to nearest $10k; H/Q period codes COEXIST ~2008-2012.

## Fail-closed guards (all fixture-proven exit 2, zero artifacts)

- Empty/unmatched `LOBBYVIEW_CODES`.
- **Zero finance JOINS (vintage-mismatch tripwire - the issue-side guard alone was insufficient, S1 from the adversarial round).**
- Duplicate `lob_id`; negative or >1e10 amounts; malformed booleans (true/false/empty only - empty is common and legit); mid-run input drift (md5 recheck precedes joined-CSV promotion).
- Accepted residuals (documented in the commit, do not re-flag): per-file symlink isolation bypass, late-exception mixed-generation outputs (manifest md5 contract mitigates), inventory TOCTOU, mid-file BOM rows.

## API facts (lobbyview.org/data-download/api, fetched 2026-07-31)

- REST API = 100 requests/day, 100 rows/request, 10k rows/day - surgical lookups ONLY, never bulk refresh.
- Public endpoints: legislators, bills, clients, reports, issues, **networks (client_uuid x legislator BIOGUIDE id x year - THE member link)**, texts. PRIVATE (by emailing the LobbyView data contact; contact email omitted): `quarter_level_networks`, `bill_client_networks`.
- The dlthub "source" page = auto-generated scaffold, NOT a real connector - rejected; plain requests if an API lane is ever built. The official `lobbyview` PyPI wrapper is pre-release v0.0.6.
- **Still missing as bulk: texts (`issue_text`), bills, network (network later acquired, below)** - Paul should check the logged-in Explore Datasets page for those zips or contact the data team for quota/private access. The collector inventories them as WAITING.

## Network table acquired (2026-07-31, late session)

- Paul logged into lobbyview.org himself (Claude never touched credentials - a password appeared in chat, Paul advised to ROTATE it); Claude drove his Chrome via the Chrome lane to download `network_codebook.zip` (56.4 MB) from `/data-download/datasets/network_data`, extracted `network.csv` (571,056,869 bytes, md5 f8867b71c875a1f758f4d962407ade49) + `network_codebook.pdf` into raw. Vintage PROVEN identical to the 2024-10-25 bundle: the zip's `version.pdf` md5 == the on-disk provenance md5 (059E6A47...).
- Schema: `lob_id, bioguide_id, year, n_bills` - `n_bills` = bills SPONSORED by that member which the client's filings lobbied; an absent dyad MEANS zero and dyads disappear/reappear across years, so YoY aggregation MUST zero-fill, never treat as missing.
- Full-file receipts: 10,937,756 rows; years 2000-2022 (SAME cliff family as issue codes - network YoY runs only through 2022, FEC stays the sole fresh signal after; 42-month lead intact); 1,390 distinct bioguides (historical incl.); 16,003 distinct `lob_id`s; sum `n_bills` 81,340,354.
- Collector re-run: manifest `network` present:true processed:false (inventory-only, FUTURE_TABLE), data_rows + md5 match an independent scan; data CSVs byte-identical pre/post, JSON outputs re-hash per run (embedded provenance - expected).
- Network repository later SHIPPED (2026-08-01): the collector processes 10.9M dyads to 63,991 member-years @9d0b39a/@6448b03 (blank-bioguide 458 rows receipted-skipped, FEC unattributed convention); `lobby-network.html` deployed to live root; review sheet 573 finance rows awaiting Paul's ratification.
- Network edges = sponsor + ALL COSPONSORS of each lobbied bill (proven set-identical, BECU 2021: 181 edges = HR1996's 1+180 people) - the construction discovery of the LDA rebuild lane; the label "sponsored" needs "sponsored or cosponsored".

## Positions dataset (acquired 2026-08-01)

- Paul-supplied paper (Kim/Kim/Jeong/Oh/In-Song-Kim, PNAS draft 2025-04, "Measuring Interest Group Positions on Legislation"): 279,104 positions x 12,032 SIGs x 42,475 bills, 111th-117th (2009-2022), keyed by `lob_id`; labels Support/Oppose/Amend/Monitor/Engage; LLM stage validated ~96% vs humans, GNN stage ~78%; at `%LOCALAPPDATA%\Melange\lda_rebuild\raw\positions` (5 components incl. `human_validation`); replication code github.com/hikoseon12/lobbying-position.
- Coverage truth: pinned fintech/crypto 22 have 56 positions over 14 years, ONE directional (BECU 1 Support); directional positions live with TRADE ASSOCIATIONS (CUNA 174S/12O, NAFCU 168S/23O, Michigan CU League 23S/8O; ICBA 215S/15O, ABA 178S/20O, MBA 128S; finance sector total 1,753 directional).
- Full lane narrative (bridge rounds 1-3, rebuild, org-mentions, champions, looks) lives in [[2026-07-feature-data-collection-lanes]].

## FEC bridge status (summary)

FEC x LDA bridge: round 1 VOID-FOR-COVERAGE (2026-08-01); round 2 look consumed @c9fc43a UNCORROBORATED p=.098 (pooled Spearman +0.259, N=52); round 3 look consumed @36afda8/@4fddaa7 UNCORROBORATED and decisive (raw rho +0.153 member-blocked p=.0146; four-control partial -0.0002). The 2023-2026 window on this instrument is CLOSED; FEC exposure is never presented as a lobbying predictor; successor prereg only on a new LobbyView vintage extending network coverage past 2022.

## Lobbied-member link is circular (2026-08-19)

LD-2 filings **never name a member.** `interaction_ledger.csv` (44,496 rows) has zero member-identifying columns; `government_entities` names chambers and agencies only ("HOUSE OF REPRESENTATIVES" and "SENATE" as a pair, CFPB, Treasury).

- The member link is MANUFACTURED by joining a lobbied bill to that bill's sponsor/cosponsor roster. `interaction_bill_members.csv` = 45,498 rows, `role` takes exactly two values: cosponsor 42,549 / sponsor 2,949, **zero rows with any other role**. `lobby_interactions.py:4` states it: "did this organization lobby a bill this member sponsored or cosponsored".
- **CONSEQUENCE: P(joined | lobbied) = 1 by construction.** A member cannot appear as lobbied on a bill they declined to join - the data cannot express the negative case. So NO correlation between "was lobbied" and "joined the bill" is evidence about influence. Paul asked about exactly this on 2026-08-19 believing a significant relationship had been found; the number may well exist but cannot carry that meaning.
- **Why:** the join is the definition, so the two variables are not independent.
- **How to apply:** if anyone reports a lobbying-to-cosponsorship relationship, first ask which side of the join the "lobbied" variable came from. Corroborates the FEC x LDA R3 result (raw rho +0.153 p=.0146 but four-control partial -0.0002, tier UNCORROBORATED, predictor language BARRED by fixed prereg wording; a different control set on that window is explicitly NOT a successor).
- TRAP: the frozen `cosponsor_join` forecast (265,396 predictions, unscored, resolvable NOW - hash changed) resolves its outcome against `interaction_bill_members.csv`. Scoring it and writing it up as "predicted who joins lobbied bills" would be circular framing, though the predictions themselves use no lobbying features. See `moneyball-architecture`.

## Use in the sector growth study (2026-09-25/26)

The sector-growth study links LobbyView as lobbying data (see the sector growth x political spending study (`2026-09-feature-sector-growth-study`)): full export (2024-10-25) with `reports.csv` 383 MB, `clients.csv` (NAICS), `issues.csv`, `network.csv`; derived files in `..\lobbyview\derived` (`reports_finance`, `clients_classified`); LobbyView has one `amount` column. Paul's ruling: LobbyView runs its full span for every sector (the 2013-2022 banks/CUs-only limit was reversed).

## Related Concepts

- [[fail-closed-gates]] — When a check cannot be satisfied, the system blocks or emits nothing rather than a guessed output; loosening a gate is Paul's call.
- [[settled-findings-stay-settled]] — A finding refuted by measurement or ruled intentional by Paul is recorded once, in a binding refuted list or a do-not-re-flag note, and is not re-litigated unless Paul reopens it.

## Related Topics

- [[2026-06-feature-cosponsor-and-sector-networks]] - Moneyball network layer: co-sponsor plan (Jun), toggles + signed layers (Jul), five NET_CONFIG networks (Aug), relationships model (Sep).
- [[2026-07-feature-data-collection-lanes]] - Melange data-collection lanes: demographics, FEC precognition, LobbyView/LDA, contact inference, Sentinel press/hearing and bills
- [[2026-07-feature-data-collection-lanes-lobbyview-lda-rebuild-and-bridge]] — The LobbyView lane of 2026-07-31 to 08-01: the positions dataset and network table acquired, the LDA rebuild, the FEC-bridge design, and the three FEC by LDA bridge rounds with their consumed looks.
- [[2026-07-feature-data-collection-lanes-contact-inference]] — The contact-inference extraction lane of 2026-08-28/29: the bullseye ruling and gold-set examination, blind dev-gold rounds, the look ledger, the constituency campaign, the G3 adjudication with the committee-proxy clarification, and the overnight autonomy run.
- [[2026-06-feature-cosponsor-and-sector-networks-sector-networks]] — The bank_reg and crypto sector networks of 2026-08-18/19, promoted to full networks the same day, and the finding that the lobbied-member link is circular.

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.
