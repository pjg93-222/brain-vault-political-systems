---
type: concept
name: "Two-hop stance decomposition"
aliases: ["stance hop vs valence hop"]
description: "Decomposition of CU-alignment scoring into a stance hop (member toward a target) and a valence hop (target good/bad for credit unions); the valence hop (0.689 vs stance 0.915) is the accuracy bottleneck and is fixed with a curated per-target valence registry, not more model spend."
related_to:
  - "[[2026-06-feature-cu-stance-and-sentiment]]"
  - "[[debate-stance-model]]"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/moneyball-stance-decomposition.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\moneyball-stance-decomposition.md", sha256: "7f9b966172345c4606ba4d3e1366846e48edcf9c2580c21e44589b22430e2e1c"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-signflip-directionality.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-signflip-directionality.md", sha256: "a3c3dcd8629796ac6042805cd6db7bc5470be899f9524ad8500771730c17b455"}
updated_at: 2026-10-04
updated_by: "reorg@agent"
tags: ["type/concept", "domain/research"]
---

# Two-hop stance decomposition

> CU alignment of a statement = stance of the speaker toward a TARGET (hop 1) composed with the valence of that target for credit unions (hop 2); measured 2026-07-04, the accuracy ceiling sits in the valence hop (0.689) not the stance hop (0.915).

## Description

The flat label `cu_alignment` (does this statement make the member pro-CU or anti-CU?) entangles two different judgments:

1. **STANCE hop** - the member's stance toward the target (support / oppose / neutral / unrelated). Fields stored by the API layer: `gold/api_stance_toward_target`.
2. **VALENCE hop** - is the target good or bad for credit unions (+1 / 0 / -1). Field: `gold/api_target_cu_valence`. Example: the CFPB, interchange, the Credit Card Competition Act (CCCA), 1071 and the ILC loophole are anti-CU-valenced targets; Field of Membership (FOM), Member Business Lending (MBL) relief, CDFI, CU tax status, charter modernization, NCUA budget/share insurance, mortgage lending and payments are pro-CU-valenced targets.

Composition: `cu_alignment = stance x valence`. So "eliminate / defund / rein in the CFPB" (oppose a -1 target) = pro-CU (support), and "save / protect / defend the CFPB" (support a -1 target) = anti-CU (oppose). This is the mechanism behind the CFPB sign-flip errors recorded in [[2026-06-feature-cu-stance-and-sentiment]] (the legacy `ANTI-BANK (pro-CU)` heuristic and the LSD/legacy scorer read the surface verbs with the wrong sign). The model of the stance hop is the [[debate-stance-model]] (NLI) plus later stack readers.

## Key Characteristics

- **Measured on the 400 tweet golds (2026-07-04, user "we can break 80%", Opus-mode):**
  - STANCE hop, model: **0.915** (essentially solved).
  - VALENCE hop, model: **0.689** (THE bottleneck). Confusion: the model systematically fails PRO-CU targets, calling 57/128 gold +1 targets "neutral" and 23 "negative". It knows CFPB/interchange are anti-CU (0.78 on negatives) but cannot know FOM-expansion / MBL-relief / reg-tailoring are PRO-CU (institutional knowledge a general model lacks).
  - `compose(model_stance, ORACLE_valence)` = **0.872 acc / 0.808 F1**: the proven ceiling, breaks 80%.
  - `compose(model_stance, gold_stance-consistency)` = **0.947**: validates the composition logic and label internal consistency.
- **Honest negative: 5 auto-registry variants tested, ALL below the flat baseline 0.677:** coarse-14-topic 0.559; fine per-target leave-one-out 0.464 (238 distinct targets in 400 tweets = too sparse); directional+fallback 0.604; curated-14 0.559; seed-registry+fallback 0.489. **Per-target valence CANNOT be keyword-automated**: it is specific (238 distinct targets, 1.7 tweets each) and flips by action direction in ways regex mis-catches (`rein_flips` double-counts the stance language). Coarse registries mislabel the within-topic flips (CFPB-expand -1 vs CFPB-reform +1: 149 vs 34 in the 184 CFPB tweets).
- **BREAKTHROUGH (@449ec19, same 2026-07-04 session): registry DERIVED FROM THE USER'S OWN `gold_target_cu_valence` judgments**, honest 5-fold CV (derive on train folds, score held-out): two-hop compose = **0.782 acc / 0.754 F1** (+10.5 over flat 0.677; > trained classical 0.737; consensus tier with classical = 0.914 on 64%). `cu_valence_registry.json` v2 = 11 derived entries (CBDC +1, junk-fees -1, CFPB direction-split, stablecoin +1, ...). 5 families skipped (thin/inconsistent, flat fallback): interchange (his golds split 0/-1, needs direction-split), big_banks (genuinely contextual), cu_tax (his golds say mentions mostly neutral 15:5), defense_cu, reg_relief. **1.8 pts from the user's 80% target; remaining gap = his 5-question review of skipped families plus registry maintenance as new targets emerge.** Harness: `derive_valence_registry.py` (`--write`). DON'T hand-tune match phrases against the same 400 golds beyond this (eval-overfit).
- **Wired into production (@0ad4848 + audit fix @e5451dd, user-ratified):** `build_media_blend` per-tweet stance = stack labels; see [[2026-06-feature-cu-stance-and-sentiment]] for the full wiring record.

## Path to 0.87 (two options presented to the user, DON'T auto-spend)

1. **CURATED specific-target registry** - the `cu_valence_registry.json` seed exists (14 entries, force-tracked); needs extension to the actual distinct policy targets (CBDC, GENIUS/stablecoin, junk-fees, specific bills; `apply_two_hop_stance.py --uncovered` ranks them). Institutional-knowledge curation, one-time plus maintained. FREE but labor.
2. **FOCUSED isolated valence pass** - ask the model ONE question "is [specific target] good/bad for CUs" decoupled from stance/attribution, given the priors. UNTESTED. ~$1.20 for the 238 distinct tweet targets. Worth a cost-gated pilot per the pilot-before-spend rule.

## Label-schema recommendation (the user's real question "types of labels... good variance")

Stop labeling flat `cu_alignment`. Label the two hops separately: `stance_toward_target` (model pre-fills at 0.915, cheap verify, cleaner class balance) plus the specific target (registry key). Maintain the target-to-valence registry as a separate first-class curated artifact. The flat label entangles a well-separated stance signal with poorly-known valence, and the oppose-skew (52% on tweets) IS that entanglement (CU policy is mostly adversarial, so valence is mostly -1). Research backs two-stage decoupling: arXiv 2023.acl-long.560 (TSE), MDPI 2076-3417/15/21/11784 (two-stage fine-tune); neutral/none is the known-hardest class (garbage-collector).

## Earlier evidence: the 2026-07-01 sign-flip analysis (source `cu-signflip-directionality`)

The 10 support-to-oppose **sign-flips** in `cu_stance_label_set` (pre_label vs human_label; the qualitatively worst errors, they put a member on the wrong side) decomposed into 3 causes:

- **~6 = CFPB target-valence directionality.** Per the user's labels the CFPB is an **anti-CU-valenced target**: "eliminate / defund / rein-in CFPB" = pro-CU (**support**), "save / protect / defend CFPB" = anti-CU (**oppose**). Examples: Keith Self (eliminate CFPB funding, support), Hagerty/Nussle (fund CFPB via appropriations, support), Pressley / Danny Davis / Vargas / Barragan (defend CFPB, oppose).
- **~3 = member/actor political priors**: Jesus Garcia (anti-bank / Close the ILC Loophole), Durbin (interchange). Anti-bank does not equal pro-CU for these consumer-advocate members. **A lexicon will not fix these; they need a member-level stance prior.**
- **1 = bill-table sign error**: Andy Barr "1071 Repeal Act" (a `billstatus:` entry, not prose); repeal is pro-CU but was mapped oppose. (Later found to be a stale pre_label, not a live bill-table error; 1071 Repeal is +1 in the current table.)

**Auto-typing results** (PMI on gold human_labels; v2 = sentence-level direction + "protect X from/against TARGET" flip), data-derived valences:

- ANTI-CU / **inverse** (flip the sign): CFPB (64% inverse in v2; only 41% with release-level v1), interchange/Durbin, 1071, ILC loophole, Credit Card & Consumer-Fee Mandates, CU-Bank Competitive Dynamics.
- PRO-CU / **proportional** (no flip): Field of Membership, Member Business Lending, CDFI, CU Tax Status, Charter Modernization, NCUA Budget/Share Insurance, Mortgage Lending, Payments.
- Residual CFPB mis-tags = "soft restraint" bills (transparency / accountability / cost-benefit / fund-via-appropriations, e.g. the Hagerty case) whose verbs read positive; add those as shrink/restraint cues. Fraud Prevention came out inverse but uncertain (needs eyeball).
- Companion valence rules confirmed 2026-07-01: Big Banks knocking = anti-CU EXCEPT housing, which is pro-CU; CFPB going-after = pro-CU / defending = anti-CU; CCCA / rate-cap support = anti-CU.

**Direction-aware lexicon idea:** the user adapted Park, Lee & Cho 2025, "Automatic construction of direction-aware sentiment lexicon using direction-dependent words" (Language Resources & Evaluation 59:843-869; `~/Downloads/s10579-024-09737-9.pdf`). Thesis: a word's polarity flips via a directional word ("cost" is negative but "cost **decrease**" is positive); each term = (directional word, direction-dependent word). CU analogue: directional verb x CU-valenced target. In stage 5 LSD sets magnitude only and sign comes from DEBATE or the bill table, so a direction-aware lexicon would supply or override sign for known targets like CFPB.

**Dry-run result: a naive (target x verb) override CHURNS and is not viable.** A generic rule over whole text fixed only 4/10 flips and on the full gold set made 46 sign-changes = **3 good / 43 bad**. Bottleneck: direction-by-verb-count fails on "defending CFPB" releases that DESCRIBE the attack ("Trump's efforts to dismantle/defund the CFPB") with shrink verbs, so Pressley/Davis/Vargas regress; adding soft-restraint cues to catch Hagerty made it worse elsewhere. Pivot: high-precision, low-recall (named bills/rules plus title/headline-level only, like the paper's headline domain), or use as a DEBATE *feature* instead of a hard override. This sign-flip analysis predicted the later finding that errors are "dominated by CFPB target-valence".

**Bill side was already direction-aware** (answers the user's question "are the other bills dealt with?"): `cfpb_bill_directions.csv` (Direction: Reduce = +1 pro-CU / Expand = -1 anti-CU / Neutral = 0) plus a curated `BILLS` table in `cu_press_release_scraper.R` (~line 1642: Credit Card Competition Act -1, 1071 Repeal +1, a bill-to-category map and an `ambiguous` set). The prose bill-matcher `score_bill_signals` (~line 2600) matches ~60 tracked bills by name/number and detects stance toward the named bill (`signal = stance × position`, sponsor/critic-aware), stored in the `bill_signals` column of `cu_press_releases_scored.csv`. Validation: 93% precision vs gold on 187 bill-naming releases, but as a blanket override = 0 good / 3 bad plus 14 errors; the 14 split into matcher stance-detection failures on coalition/amendment framing (e.g. "America's Credit Unions joins to oppose the CCCA" read as supports) and member priors (Warren/Durbin/Blumenthal/Merkley anti-CU even on pro-CU GENIUS/housing bills). Oppose cues in the matcher include "against/block/defeat <BillName>"; further misreads: Gooden "interchange bill should be rejected" read as supports (user: Gooden = correct, leave it), Kennedy "Senate blocks Kennedy's [own] bill" read as opposes (he is the sponsor; the `block\w*` cue misfired), Thune opposing an amendment. Plan: extend the high-precision named-bill matcher to prose; audit BILLS / `bills_audit.csv` for stragglers; end deliverable = regenerate `CU_Press_Stance_Tone.xlsx` tabs via `make_standalone.py` after a trustworthy re-score. Why a bill-sign override was later rejected: "DEBATE neutral" is not "DEBATE missed the bill stance"; DEBATE correctly saw the release isn't ABOUT the bill (tracked bill named once in a multi-topic roundup); see [[debate-stance-model]].

## Where it Applies

- [[debate-stance-model]] - Fine-tuned Political DEBATE NLI stance model (CPU) plus Lexicoder LSD tone; replaced the regex scorer in Stage 5 of the CU press pipeline
- [[2026-06-feature-cu-stance-and-sentiment]] - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels
- [[melange-systems]] — Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Where the hop split shows up in the pipeline

- Stance hop readers: the fine-tuned [[debate-stance-model]], the classical and API readers stacked in `tweet_stance_stack.py` / `press_stance_stack.py`.
- Valence hop: `cu_valence_registry.json` (user-owned, first-class curated artifact; derived entries v2 plus the 14-entry seed); registry maintenance tool `derive_valence_registry.py`.
- Tools: `fec/apply_two_hop_stance.py` (`--eval`, `--uncovered`), `fec/train_tweet_stance.py` (supervised on 399 golds = 0.737 CV, the current free best, `stance_clf_tweets.pkl`).
- Scratchpad diagnostics from the session: confusion_diag, valence_registry_test, valence_knowledge.
- Related memory: `cu-signflip-directionality` (predicted this: "sign-flips dominated by CFPB target-valence"), `moneyball-data-audit-2026-07-01` (S1-S5 valence-registry plan, now empirically justified).

## Related Concepts

- [[gold-set-validation]] — A measure is trusted only after it scores against a fixed, independently labelled, owner-ruled gold set that the pipeline under test never sees.
