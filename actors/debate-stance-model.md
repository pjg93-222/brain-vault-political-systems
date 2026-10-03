---
type: actor
name: "Political DEBATE stance model"
aliases: ["debate_finetuned", "DEBATE + Lexicoder LSD"]
category: "tool"
description: "Stage 5 of the CU press scorer: fine-tuned Political DEBATE (mlburnham/Political_DEBATE_base_v1.0, NLI) supplies stance sign, Lexicoder LSD2015 supplies tone intensity; press_value = stance_sign x LSD intensity. Deployed over the full press corpus 2026-06-24."
repository: "C:\\Users\\pgoff\\OneDrive\\Desktop\\Draft Systems"
stack: "R 4.6.0 (run_stage5.R, stringi LSD, no quanteda) + Python 3.12 venv .venv_debate (CPU torch 2.12, transformers 5.12, stage5_debate.py sidecar); model mlburnham/Political_DEBATE_base_v1.0 fine-tuned to debate_finetuned/"
status: "active"
team: ""
criticality: "high"
pci: false
known_issues:
  - "CPU only (Intel integrated graphics, no CUDA): ~0.3 s/doc, base fine-tune ~1 hr/epoch; large fine-tune ~3h plus memory risk"
  - "Weak on implicit policy-anti stances zero-shot (oppose F1 0.08 base); fixed by fine-tune (0.78)"
  - "CFPB / anti-bank target-valence sign flips are not a DEBATE-lexicon problem (see two-hop-stance-decomposition); human_label overlay and later stance stacks cover them"
  - "The 497 overlaid releases cannot be used to evaluate DEBATE's own accuracy (they bypass the model); use ft_test.csv / measure_stage5.R"
  - "Stage 5 silently re-scores with the BASE model unless CU_S5_DEBATE_MODEL=debate_finetuned is set"
  - "ACU speaker-mode hypothesis branching (Phase 2 retrain) planned but blocked on the user finishing ACU-signal labels"
  - "DEBATE tone-labels on ACU trade digests produced mention noise (Warren); cured later by the press stack, not by DEBATE itself"
sources:
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Melange-Systems/memory/cu-signflip-directionality.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Melange-Systems\\memory\\cu-signflip-directionality.md", sha256: "a3c3dcd8629796ac6042805cd6db7bc5470be899f9524ad8500771730c17b455"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_moneyball_deploy.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_moneyball_deploy.md", sha256: "6ab1706f2edfe83b8d1eaff167caa5736b6fba651909d118ab21b2aa42999f93"}
  - {url: "file:///C:/Users/pgoff/.claude/projects/C--Users-pgoff-OneDrive-Desktop-Draft-Systems/memory/project_stance_sentiment_overhaul.md", type: "claude-memory", synced_at: "2026-10-03", path: "C:\\Users\\pgoff\\.claude\\projects\\C--Users-pgoff-OneDrive-Desktop-Draft-Systems\\memory\\project_stance_sentiment_overhaul.md", sha256: "990a30a6744244ca03cabb88df52a0d057efc8f6e91804833ce50bc6e36ba1a1"}
last_synced_at: ""
last_synced_sha: ""
updated_at: 2026-10-03
updated_by: "import@agent"
tags: ["type/actor", "status/active", "domain/data"]
---

# Political DEBATE stance model

> Fine-tuned Political DEBATE (NLI-style) stance classifier with Lexicoder LSD2015 tone, running on CPU; the Stage 5 scorer of the Draft Systems R press pipeline that replaced the hand-regex / graded scorer. Deployed over the full press corpus 2026-06-24.

## Details

| Field | Value |
|---|---|
| Repository | none (local project dir `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\`; mirrored outputs in `Melange Systems`) |
| Stack | R 4.6.0 (`run_stage5.R`, `stage5_lsd.R`, `parse_lsd.R`) + Python 3.12 venv `.venv_debate` (CPU torch 2.12, transformers 5.12) via the `stage5_debate.py` sidecar; model `mlburnham/Political_DEBATE_base_v1.0` (base, CPU-friendly; `--model` can swap to large) |
| Status | active |
| Criticality | high |
| PCI | no |
| Team | none |

## Dependencies

- Lives inside the R pipeline [[draft-systems-r-pipeline]] (step [3/3] of `run_cu_pipeline.R`; graceful skip without `.venv_debate`; knobs `CU_PIPE_SKIP_STAGE5`, `CU_S5_DEBATE_MODEL`). Folded into the project [[melange-systems]] (Draft Systems is an alias of it).
- Consumers: `cu_press_stance_tone.csv` / `cu_press_value_by_category[_wide].csv` (the Moneyball press-value inputs), `CU_Press_Stance_Tone.xlsx` (standalone deliverable, rebuilt by `make_standalone.py`), and later the press stack `press_stance_stack.py` (DEBATE is one of 5 readers and the fallback reader when a URL is unmatched in `build_media_blend.py`). See [[2026-06-feature-cu-stance-and-sentiment]].
- Depends on: Lexicoder Sentiment Dictionary LSD2015 (Soroka, downloaded from https://www.snsoroka.com/s/LSDaug2015.zip, parsed by `parse_lsd.R` to `lsd_dict.rds`); HF hub cached base + large DEBATE models (run offline, `HF_HUB_OFFLINE=1`, `TRANSFORMERS_OFFLINE=1`); the labeled set `cu_stance_label_set.csv`; the congress press scraper (`cu_press_release_scraper.R`) for the corpus ([[2026-06-feature-congress-r-scrapers]]); Claude API rater (`claude_stance.py`) was used only for pre-labels and the distillation reference.
- Conceptual layer above it: [[two-hop-stance-decomposition]] (stance hop vs valence hop; DEBATE is a stance-hop reader).

## Flows

- Corpus (scored CSV + body cache `pr_checkpoints/fulltext/<bg>.rds`) -> `run_stage5.R` -> (a) LSD tone via `lsd_tone()` on stringi, (b) DEBATE stance via the sidecar (R writes an input CSV, Python writes a stance CSV) -> aggregate `press_value = stance_sign(-1/0/+1) x LSD intensity(|net|/words)` -> `cu_press_stance_tone.csv` + `cu_press_value_by_category[_wide].csv`.
- Stance and tone remain separate audit columns AND aggregate into ONE downstream press measurable for the Moneyball. Recency decay stays, rewired to the new aggregate column. Legacy regex score kept as a parallel comparison column through the transition.
- Hybrid (originally built 2026-06-21): text-bearing releases (body >= 300 chars) get DEBATE stance x LSD intensity; text-less `billstatus:` sponsorship entries got the bill's known CU stance = sign(legacy score) x `CU_S5_BILL_WEIGHT` (0.03); column `stance_src` (bill|debate). That bill path became permanently dead code after the 2026-06-30 `billstatus:` removal (see History).

## Dev Commands

```bash
# R is NOT on PATH
"C:\Program Files\R\R-4.6.0\bin\Rscript.exe" run_retrain_human.R
#   fine-tunes on cu_stance_label_set.csv human_labels -> debate_finetuned/ ; default CU_FT_EPOCHS=3 ;
#   REWRITES cu_stance_label_set.csv `split` col (seed 42; labels preserved - back it up first);
#   writes cu_stance_accuracy_report.txt
CU_S5_DEBATE_MODEL=debate_finetuned Rscript run_stage5.R   # env var REQUIRED, else BASE model silently used
python make_standalone.py        # rebuilds CU_Press_Stance_Tone.xlsx (stage 5 does not write the xlsx)
# offline env for cached HF models
HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1
# Stage 5 knobs
CU_S5_LIMIT / CU_S5_BATCH / CU_S5_INTENSITY / CU_S5_SKIP_DEBATE=1 / CU_S5_DEBATE_MODEL / CU_S5_BILL_WEIGHT / CU_S5_BILL_OVERRIDE
# pipeline wrapper knobs
CU_PIPE_SKIP_COLLECT=1 ; CU_PIPE_FETCH_RESIDUAL ; CU_PIPE_SKIP_STAGE5 ; CU_PIPE_COSPONSORS/BILLSTATUS_ON (CU_PR_COSPONSORS)
Rscript validate_stage5.R sample N   # blind stratified labeling template cu_stance_validation_template.csv
Rscript validate_stage5.R score      # DEBATE-vs-human and regex-vs-human accuracy / macro-F1 / Cohen's kappa
Rscript sample_for_labeling.R ; python claude_stance.py ; python finetune_debate.py --labels cu_stance_label_set.csv ; Rscript measure_stage5.R ; Rscript run_accuracy_push.R
python stage5_debate.py --model <ft dir or large>
# kill a stalled deploy tree by PID (NOT a blanket Stop-Process by name, which kills the user's browser)
taskkill /F /T /PID <deploy.cmd pid>
# detached launch pattern (survives session close): PowerShell Start-Process -WindowStyle Hidden run_push.cmd
```

## Known Issues

- **CPU only.** The machine has Intel integrated graphics only, NO CUDA GPU (the user's "my GPU can handle it" referred to the collector's browser shards, not CUDA). ~0.3 s/doc (~1 h for 10k); base fine-tune ~1 h/epoch; large fine-tune ~3 h plus memory risk (fall back to base and report which).
- **quanteda is UNUSABLE on R 4.6.0**: it imports `RcppParallel`, which segfaults on load (base R / stringi / Rcpp / Matrix / fastmatch load fine; no Rtools installed to source-compile a fix). LSD is therefore implemented on stringi (`stage5_lsd.R`, `lsd_tone()` via 4 prebuilt alternation regexes, negation phrases matched and stripped first), 9.6 ms/doc.
- Zero-shot DEBATE is **weak on OPPOSE** (F1 0.35 in the first validation; 0.08 base on the 156 test) because it misses implicit policy-anti stances (CCCA / interchange: reads "fighting Wall Street banks", cannot infer CUs oppose it, calls it neutral). Fixed by fine-tuning.
- `CU_S5_DEBATE_MODEL` must be set or the retrain is wasted (base model silently re-scores).
- Retrains that run inside a session's background-task system get reaped (see Operational history); use the detached pattern.
- **"DEBATE neutral" != "DEBATE missed the bill stance"**; it also means "DEBATE correctly saw the release isn't ABOUT the bill" (reason the bill-sign override was rejected). Prose bill-matcher misreads recorded 2026-06-30: Gooden "interchange bill should be rejected" (read as supports; correct, leave it), Kennedy "Senate blocks Kennedy's [own] bill" (sponsor; `block\w*` cue misfired; per-release override), matcher oppose cues "against/block/defeat <BillName>"; `signal = stance × position`, `bill_signals`, and `bills_audit.csv` straggler audit planned (see [[two-hop-stance-decomposition]]).
- Mention noise: DEBATE tone-labels on ACU trade digests give multi-member digests incidental support (the Warren case); the cure was the press stack, not DEBATE.
- The 54 `billstatus:` rows still in `cu_stance_label_set.csv` (gold labels in the DEBATE retrain TRAIN split) were NOT touched on 2026-06-30 (flagged as follow-up, not addressed).
- The user's API key was pasted in chat twice (2026-06-21 and 2026-07-01); the user was advised to ROTATE it (console.anthropic.com). Key now lives in the project `.Renviron` (no key material is recorded here).

## Architecture and design (2026-06-21 overhaul)

- Per the user (2026-06-21) Stage 5 was split into two SEPARATED layers: **Stage 5a STANCE = Political DEBATE** (direction support/oppose/neutral toward credit unions) and **Stage 5b TONE = Lexicoder LSD** (how heated). It replaces the hand-regex `GEN_PRO_RX` / `GEN_ANTI_RX` and the graded `TONE_LEXICON` / `score_graded` "degree valuation".
- Plan: zero-shot DEBATE first (few-shot only if it underperforms); validate DEBATE stance vs a hand-coded set (accuracy / F1 / Cohen's kappa).
- Artifacts (project dir): `stage5_lsd.R`, `stage5_debate.py`, `parse_lsd.R`, `lsd_dict.rds` (LSD counts positive 1709, negative 2858, neg_positive 1721, neg_negative 2860, IDENTICAL to quanteda's `data_dictionary_LSD2015`), `lsd_raw/` (the .lc3 source), `.venv_debate/` (Python 3.12 installed via winget `Python.Python.3.12`), **`run_stage5.R`** (the ONE orchestrator: scored CSV + body cache -> LSD + DEBATE + aggregate -> `cu_press_stance_tone.csv` + `cu_press_value_by_category[_wide].csv`; knobs `CU_S5_LIMIT/BATCH/INTENSITY/SKIP_DEBATE`), **`validate_stage5.R`**.
- LSD validated (pro +4 / negated 0 / neutral 0). DEBATE validated on clear text: support 1.00 / oppose 0.99 / neutral 1.00 at ~0.3 s/doc on CPU.

## Validation and accuracy history

| Date | Event |
|---|---|
| 2026-06-21 | First-run smoke test on 15 releases plus corpus stats: only 41% of the 3,637 scored releases have body TEXT (1,504/3,637); the rest are `billstatus:` bill-sponsorship entries (no text, the cosponsor-rescued rows) plus americascreditunions.org / committee / news items whose bodies are not in the per-member `pr_checkpoints/fulltext/<bg>.rds` cache. Implication: HYBRID (DEBATE+LSD for text-bearing, bill signal for `billstatus:`). |
| 2026-06-21 | DEBATE returns mostly NEUTRAL on the corpus and is largely CORRECT: releases the regex flags are "tracked bill only" / "anti-big-bank" / tangential (Social Security, floods, homeownership) with no explicit CU stance. Real regex-vs-DEBATE disagreement, not a bug. |
| 2026-06-21 | Validation on 45 releases labelled by Claude as a human stand-in (stance toward CU INTERESTS): **DEBATE acc 0.667 / macro-F1 0.578 / kappa 0.339 vs regex acc 0.444 / F1 0.413 / kappa 0.167** (DEBATE beats the regex ~2:1 by kappa). DEBATE precise on neutral (F1 .77) and support (.62), does not over-flag; weakness = OPPOSE (F1 .35). Regex over-flags (21/32 of its neutrals wrongly scored +/-1 from tangential bill-name/tone matches) but catches policy-anti bills via the BILLS table (oppose F1 .67). Caveat: labels are Claude's reads (kappa 0.34 = "fair"); interpretation fork = EXPLICIT CU sentiment (what DEBATE measures) vs POLICY-INTEREST stance (what the Moneyball needs), bridged by the hybrid. |
| 2026-06-21 | Fold + accuracy push: `run_stage5.R` became step [3/3] of `run_cu_pipeline.R`. User target accuracy **88-90%**; confirmed plan: stance = POLICY-INTEREST via hybrid; Claude PRE-labels ~400, user corrects (train/test split); method = FINE-TUNE Political_DEBATE_large; plus Claude-API ensemble rater (final = fine-tuned DEBATE + bill-signal + Claude). Honest framing: 88-90% is near the human inter-coder ceiling, reachable ONLY via human-coded data plus fine-tune, not prompt tuning. Scripts: `sample_for_labeling.R` (active learning lowest-conf 60% + stratified 40% -> `cu_stance_label_set.csv`, train/test split, pre_label/human_label cols), `claude_stance.py` (domain-aware CU policy-interest rater; validated CCCA->oppose 0.95, CDFI->support 0.97, FEMA->neutral 0.99; anthropic SDK 0.111 in venv), `finetune_debate.py` (NLI-style fine-tune on the labeled train split), `measure_stage5.R` (accuracy report vs Claude reference), `run_accuracy_push.R` (ONE-command orchestrator: sample -> Claude pre-label -> fine-tune -> predict test -> report). User said "run everything, come back with the accuracy report" (NO human-correction step; Claude rater IS the reference annotator, so the number is distillation/agreement-vs-Claude, stated to user). Availability of the Claude rater was UNVERIFIED at write time (Bash classifier temporarily down). |
| 2026-06-22 | **RESULT: fine-tuned BASE DEBATE = 87.2% acc / macro-F1 0.833 / Cohen's kappa 0.771 vs the Claude reference on the 156-row held-out test**, essentially at the 88-90% target. Fine-tuning lifted base zero-shot (53% acc, oppose F1 **0.08**) to 87% (oppose F1 **0.78**; learned implicit policy-interest stances like CCCA = anti-CU); regex was 38%. Fine-tuned DEBATE ALONE slightly beats the bill-signal hybrid (87.2 vs 84.6), so the deployable system can be just the fine-tuned model. Artifacts preserved: base-ft model `debate_finetuned_base`, base report `cu_stance_accuracy_report_base.txt`. NEXT (user "yes to both"): (a) LARGE fine-tune the same detached way, push to 89-91%; (b) full-corpus re-score with the fine-tuned model then wire into the Moneyball Press layer (careful openpyxl edit, backup first). |
| 2026-06-22 | **Crash root cause**: the repeated ~15-minute crashes were NOT the user's machine (it was on and plugged in throughout; Claude wrongly blamed sleep and apologized). The FINE-TUNE step was being reaped by the session's background-task handling reacting to its `\r` progress-bar output (the base pass survived 50 min because it prints NEWLINE logs). FIX: `disable_tqdm=True` in `finetune_debate.py` (newline logs) plus run the push as a DETACHED Windows process via `run_push.cmd` + `Start-Process -WindowStyle Hidden` plus a newline-emitting watcher background task for completion notification. |
| 2026-06-22 | DELIVERABLE CHANGE: user wants the result as its OWN standalone Excel (NOT wired into the Moneyball model) -> `make_standalone.py` -> `CU_Press_Stance_Tone.xlsx` (3 sheets: per-member x category press_value matrix, per-release detail, About). FULL ROSTER (534) from `all_press_release_index.csv` (`--in_idx`); members with NO CU-relevant releases get all-zero rows (38 of them, real members like Hoyer/Nadler/Schweikert). EXCLUDE 4: territorial delegates Stacey Plaskett (VI), Aumua Radewagen (AS = "Aunuma"), Kimberlyn King-Hinds (MP = the user's "Kimberly"; NOT Kim Schrier, that was a wrong guess) plus the junk entry "Alan Armstrong" (OK/Senate, no such senator). KEPT delegates: Pablo Hernandez Rivera (PR), Eleanor Norton (DC), James Moylan (GU). -> **530 members**, every blank zero-filled. Final file must use the FINE-TUNED re-score after the large fine-tune lands; a DRAFT built from the weak base-pass data exists only for format preview. Sequence: base pass done -> `sample_for_labeling.R` -> `claude_stance.py` pre-labels -> USER corrects `human_label` -> fine-tune large -> ensemble -> measure on held-out test -> wire press_value into Moneyball. (Base pass on the BASE model over 3,637 was at ~976/3,637, ~38 min left, when written.) |
| 2026-06-24 | **DEPLOYED**: fine-tuned stance model (`debate_finetuned`, ~85% / kappa 0.76 on a MEMBER-GROUPED human-gold test) to the full pipeline via `run_cu_pipeline.R` with `CU_S5_DEBATE_MODEL=debate_finetuned`. Re-scored **3,701 CU-relevant releases** -> `cu_press_stance_tone.csv` + `cu_press_value_by_category[_wide].csv`. Fine-tuned mix: support 2,323 / neutral 1,151 / oppose 224 (vs the over-positive regex 2,910 / 662 / 126). |
| 2026-06-30 | Live production accuracy after the retrain/regeneration: ft = **0.839 / macro-F1 0.835 / kappa 0.760** (held-out n=87). Two other figures appear in the sources for the same test: "prior fine-tune baseline to beat: acc 0.851 / kappa 0.760" (the retrain target) and kappa 0.742 for the ft arm in the override A/B (ft acc 0.839 / kappa 0.742). Report `cu_stance_accuracy_report_LIVE_20260630.txt` (Draft + Melange). |
| 2026-07-01 | ACU SPEAKER-MODE planned (see below). |

## 2026-06-24 deploy: operational gotchas

1. **The non-JS parallel full-text fetch has NO per-member time cap** (`budget = Inf`; only the JS path caps at 600 s). A few slow members stall the residual fetch ~85% through. **Recovery: kill the deploy tree by PID** (`taskkill /F /T /PID <deploy.cmd pid>`; NOT a blanket `Stop-Process` by name, that kills the user's browser), **then restart cache-only** (`CU_PIPE_SKIP_COLLECT=1`, no `CU_PIPE_FETCH_RESIDUAL`): reuses the already-collected bodies and finishes in ~1 hr through committee/news/cosponsor/score plus the DEBATE re-score.
2. **Wayback CDX / archive.org rate-limits (429) then connection-blocks the IP (WinError 10060) under load.** The 3 CDX fns (`cdx_items`, `cdx_iqcms_docids`, `wayback_snapshot_url`) used to return NULL silently on any non-200, so the Durbin force-CDX backstop and the HFSC IQ-CMS committee fixes **silently no-op'd in the overnight deploy**. Fixed with a shared `cdx_get` retry-with-backoff helper, but a *sustained* IP block still needs hours to lift.
3. Coverage of the 5 gold gaps (see `project_congress_press_fallbacks`) after deploy: 3/5 recovered surgically via **LIVE** fetch (Collins plus both Durbins; no archive.org needed; one-off `recover_3.R` pattern: live fetch -> `lsd_tone` + `stage5_debate.py` -> append to stance_tone -> re-aggregate). The **2 HFSC-Dems Waters releases** (`documentsingle.aspx?DocumentID=413709/412791`, 403 live) still pending an archive.org cool-down. Linked: `project_stance_sentiment_overhaul`, `project_moneyball_integrated_scraper`.

## Standing rules and decisions recorded for this model

- Press classification stays the user's domain: `human_label` is the override column, never relabel (see `2026-06-working-agreement-change-control-and-decision-authority` for the rule; source `press-classification-user-domain`).
- Stance = fine-tuned Political DEBATE; tone = Lexicoder LSD2015; LSD parsed by `parse_lsd.R` (no quanteda).
- **Bill-sign override REJECTED + DISABLED 2026-06-30 (held-out test fails it).** Coded into `run_stage5.R` (backup `run_stage5.PRE-BILLOVERRIDE-20260630_165331.R`) with two guards (only when DEBATE is neutral/non-confident, protects Thune/Marshall/Gooden; member-prior exclusion, 12-member `MEMBER_PRIOR_ANTI_CU` list: Warren/Durbin/Blumenthal/Merkley/Himes/Lynch/Friedman plus the 5 confirmed). Kennedy per-release override runs BEFORE the general bill-sign override (the narrow fix only acts when `stance_sign==0`; first attempt had it after, the flawed matcher reading of "Senate blocks Kennedy's bill" locked in oppose). `sign()` returns double in R, wrap `as.integer()` or vapply type checks fail. Audit trail: `stance_src = "bill_override" / "manual_override"`. Full corpus: 478 bill_override + 1 manual_override fired; stance mix support 1041->1502, neutral 1148->669, oppose 199->217. The +11/0/0 was on the MIXED train+test+exclude pool (contaminated, 83% train). On the STRICT held-out test (n=87) the override REGRESSES: ft acc 0.839 / kappa 0.742 -> ft+override 0.770 / 0.630 (10 firings: 2 fix / 8 BREAK). Root cause: "DEBATE neutral" != "DEBATE missed the bill stance" (DEBATE correctly saw the release isn't ABOUT the bill; a tracked bill named once in a multi-topic roundup: Shaheen x4, Watson Coleman, Smith, Bennet, Liccardo were correctly neutral and got flipped wrong). Gated OFF behind `CU_S5_BILL_OVERRIDE` env (default off); Kennedy's narrow per-release fix KEPT (verified, not in test set). Needs an aboutness/prominence guard (bill in title / single-topic) before re-enabling; confidence LOW (only 10 test firings). **LESSON: validate on HELD-OUT only, never a pool that includes train; a metric move needs a mechanistic explanation, not just a number.** The override was a workaround for the unfinished retrain; finishing the retrain (teaches DEBATE the neutral boundary directly) is the better lever than an external rule second-guessing DEBATE's neutral calls. (Superseded: on the verifiable gold subset it had shown 11/11 correct, 0 wrong on the contaminated pool.)
- **HUMAN-LABEL OVERLAY (2026-06-30, DONE, the actually-good idea):** the user asked "don't I already have the data produced?" (correct catch). 497 of 552 hand-labeled releases overlap the live 2,388-release corpus and NOTHING was using `human_label` in production (58 of those 497 were silently wrong despite the answer already being known). Added a 3c overlay block to `run_stage5.R` (after 3b, before the hybrid aggregate) that reads `cu_stance_label_set.csv` and overwrites stance / stance_sign with `human_label` wherever valid; runs LAST so it beats DEBATE, the bill override and Kennedy's fix alike. `stance_src="human_label"` for audit. Verified: 497/497 now match exactly. The retrain (running detached, PIDs 9632/19000/48344/22620) was killed mid-epoch once this was identified as the better lever; `debate_finetuned/` untouched (save only happens at full completion, so the kill was safe, no partial-write risk). CAVEAT: the 497 overlaid releases can no longer be used to evaluate DEBATE's own accuracy (they bypass the model); `ft_test.csv` / `measure_stage5.R` remain the valid model-only accuracy check. Remaining ~1,891 releases still rely on DEBATE; retraining is back on the table for THOSE but no longer urgent (live accuracy 0.839 / kappa 0.742 already exceeds "good" thresholds per the user's explicit yes/no confirmation). Only 11 of the 479 overrides are gold-verified; the other ~468 are the same validated guards applied to unlabeled corpus rows (architecturally sound, not individually proven). Re-running used `CU_S5_SKIP_DEBATE=1` (reuses cached `cu_press_stance_raw.csv`), no need to re-run the ~80 min DEBATE pass to test override-only changes. `CU_Press_Stance_Tone.xlsx` rebuilt via `make_standalone.py` and copied to Melange Systems (old copy archived).
- **`billstatus:` removal (2026-06-30, DONE):** 1,310 of 3,698 scored releases were synthetic `billstatus:` cosponsorship rows (e.g. "X cosponsored Y Act") with dead-link placeholder URLs, generated by Stage 4e (`stage_bill_cosponsors()` in `cu_press_release_scraper.R` ~line 3973, toggle `CU_PR_COSPONSORS` / `BILLSTATUS_ON`). Moneyball's `make_member_desk.py` already excluded them independently ("fake articles with dead billstatus: links") but the standalone `CU_Press_Stance_Tone.xlsx` never did. Fix: filter `^billstatus:` at the top of `run_stage5.R` right after reading SCORED_CSV (backup `run_stage5.PRE-BILLSTATUS-20260630_152210.R`) -> 2,388 real releases remain. Side effects: 110 members have ZERO non-billstatus press releases (user confirmed OK, "representative data"); the OLD `use_bill` hybrid path is permanently dead code (all rows now get stance_src starting from "debate" before the override layer).
- **ACU SPEAKER-MODE (2026-07-01, PLANNED, plan doc `Draft Systems\ACU_SPEAKER_MODE_PLAN.md`):** the user's key reframe: ACU-authored press (`americascreditunions.org`, 816 rows / 243 members) is NOT noise to drop; it is ACU acting as an authoritative friend/foe labeler: ACU **endorsing** a member = pro-CU (support), ACU **railing against** a member = anti-CU (oppose). This fixes the original bug inside-out ("Advocacy win: Marshall won't offer amendment" = anti-CU foe signal, not the +0.03 it was, not dropped). `speaker_source` becomes 3 modes: member (two-hop target-aware) / ACU (ACU->member) / bill.
  - **Phase 1 (immediate, no retrain):** the human-label overlay already signs by URL, so labeling the ACU rows in `cu_stance_label_set.csv` fixes them directly.
  - **Phase 2 (retrain):** DEBATE is NLI, so branch the HYPOTHESIS by speaker_source (ACU rows: "advocacy group praising/criticizing this member") in `finetune_debate.py` + `stage5_debate.py` + add speaker_source at `run_stage5.R` ~l.87; no architecture change; generalizes to the ~800 unlabeled ACU rows.
  - **Phase 3:** relax `fec/apply_press_dedup.py` `_own()` to KEEP americascreditunions.org once signed (own-domain filter becomes a fallback, not the fix).
  - Validation gate: Marshall/Hawley ACU -> net negative, allies' electoral coverage -> positive, held-out acc >= 0.851. Keyword endorse/rail extraction is too crude (mislabels "fraud fight" pro-CU as anti), must be the NLI model, not rules. Blocked on: the user finishing the ACU-signal labels (`cu_stance_label_set_v3.xlsx`).

## Template location and re-run recipe

Where the label template lives: the CU press sentiment/stance R pipeline and its live data are in `C:\Users\pgoff\OneDrive\Desktop\Draft Systems\` (NOT in `Melange Systems`, which holds only Excel mirrors and scored outputs such as `CU_Press_Stance_Tone.xlsx` / `cu_press_releases_scored.xlsx`). The labeling template fed to R is `cu_stance_label_set.csv` (generated by `sample_for_labeling.R`, writes `text_snippet` plus a blank `human_label` column to fill support/oppose/neutral); consumed by `measure_stage5.R`, `run_retrain_human.R`, `run_accuracy_push.R`, `fulltext_backfill.R`, and passed to `finetune_debate.py --labels`. `cu_stance_label_set.xlsx` (copies in BOTH folders) is a human-review mirror (tabs "To Rework" / "Done (locked)"); R never reads it. Re-run steps are in Dev Commands above (CPU only, ~1 hr/epoch). Prior fine-tune baseline to beat: acc 0.851 / kappa 0.760 on the 87-row held-out test. See [[2026-06-feature-cu-stance-and-sentiment]] for the full template/coverage context.

## Related Actors

- [[draft-systems-r-pipeline]] - Draft Systems R code root: congress.gov, CU press, Census CD and Ballotpedia scrapers plus the DEBATE+LSD stance pipeline

## Related Topics

- [[2026-06-feature-congress-r-scrapers]] - June 2026 R scraper family in Draft Systems: congress.gov 17x3, CU press releases, Census CD, Ballotpedia, DEBATE stance
- [[2026-06-feature-cu-stance-and-sentiment]] - Press/tweet stance + tone scoring for CU alignment: DEBATE, two-hop stacks, CFPB recorrection, gated channels

## Related Projects

- [[melange-systems]] - Moneyball/Melange: CU legislative-influence model and dashboard for 533 members of Congress; absorbs Draft Systems; index note.

## Related Concepts

- [[two-hop-stance-decomposition]] - CU alignment = stance hop (speaker to target) x valence hop (target to CUs); the ceiling is the valence hop, fixed by a curated registry

## Notes

- Later (2026-07) the DEBATE reader became one of 5 readers in the press stack (registry x stance-hop, retrained composed, Opus flat, Fable flat, DEBATE); on the 760 gold frame DEBATE scored 0.796 (0.571 on the adversarial goldeval frame). Details in [[2026-06-feature-cu-stance-and-sentiment]].
