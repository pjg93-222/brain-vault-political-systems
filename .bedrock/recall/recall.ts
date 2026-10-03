// Per-prompt recall (UserPromptSubmit): score every note against the prompt and return a compact "Brain recall" block,
// or nothing. Precision over recall: a note is only shown when the prompt is clearly about it.
//
//   score(note) = sum over prompt terms t found in the note of
//                   idf(t) * tf~ (k1 + 1) / (k1 + tf~)          BM25F over the content fields (indexer.ts)
//                 + NAME_W * idf(t) + NAME_C   when t is in the note's title, aliases or file name ("name terms")
//               + PHRASE_W * sum idf  when a multi-word title / alias / file name appears in the prompt as a phrase
//   coverage(note) = idf mass of the prompt terms the note contains / idf mass of all prompt terms; a prompt term that
//                    no note contains counts at the maximum idf, so off-topic words ("haiku", "quicksort") pull it down.
//   Gate: the prompt must NAME something in the vault. Some note (the anchor) must match at least NAME_TERMS_MIN name
//   terms, or one name term rarer than RARE_IDF, or a title phrase, and also clear FLOOR and COVER_TOP. Generic
//   requests ("refactor this function", "write a SQL query") share plenty of body words with the large notes but name
//   none of them, so they stay silent. Then every note scoring at least max(FLOOR, REL * best) with coverage of at least
//   COVER_ANY is listed (the anchor always), at most MAX_NOTES; a note matching no name term needs REL_UNNAMED * best
//   instead (large notes match many body words). Thresholds were tuned on selftest.ts.
import { readFileSync } from "node:fs";
import { INDEX_FILE, INDEX_SLOW_FILE, VAULT, logLine, oneLine, signature, statNotes, writeAtomic, type NoteStat } from "./lib.ts";
import { INDEX_VERSION, rebuildIndex, type RecallIndex } from "./indexer.ts";
import { clip, terms } from "./text.ts";

/** Time a prompt may spend rebuilding a stale index before recall falls back to the previous index. */
export const REBUILD_BUDGET_MS = 2_500;
/** After a rebuild ran out of time (or had to skip unreadable notes), serve the previous index this long. */
const SLOW_BACKOFF_MS = 10 * 60_000;

export const TUNING = {
  /** fewer distinct content terms than this (after stopwords) and the prompt is skipped as trivial */
  MIN_TERMS: 3,
  K1: 1.2,
  NAME_W: 1.0,
  NAME_C: 1.5,
  PHRASE_W: 0.5,
  NAME_TERMS_MIN: 2,
  RARE_IDF: 1.5,
  FLOOR: 6,
  REL: 0.4,
  /** a listed note that the prompt does not name at all must reach this share of the best score instead of REL */
  REL_UNNAMED: 0.5,
  COVER_TOP: 0.45,
  COVER_ANY: 0.3,
  MAX_NOTES: 5,
  MAX_CHARS: 800,
};

/** A pure confirmation or acknowledgement ("yes go ahead", "ok thanks", "lgtm"), whatever its exact words. */
const CONFIRM_START = /^(?:y|yes|yeah|yep|yup|ok|okay|k|sure|alright|go ahead|do it|proceed|continue|lgtm|thanks|thank you|thx|ty|sounds good|approved?|confirm(?:ed)?|agreed|perfect|great|nice|cool|no|nope)\b/;

export function isTrivial(prompt: string): boolean {
  const flat = prompt.toLowerCase().replace(/[^\p{L}\p{N}\s]+/gu, " ").replace(/\s+/g, " ").trim();
  if (!flat) return true;
  if (CONFIRM_START.test(flat) && flat.split(" ").length < 8) return true;
  return new Set(terms(prompt)).size < TUNING.MIN_TERMS;
}

export type Hit = { i: number; score: number; cover: number; matched: number; nameMass: number; nameTerms: number; named: boolean };

/** Every note with at least one matching term, best first, plus the selected hits. */
export function rank(idx: RecallIndex, prompt: string): { hits: Hit[]; all: Hit[] } {
  const T = TUNING;
  const N = idx.notes.length;
  const seq = terms(prompt);
  const qTerms = [...new Set(seq)];
  const idfMax = Math.log(1 + (N + 0.5) / 0.5);
  const idfOf = new Map<string, number>();
  const score = new Float64Array(N);
  const cover = new Float64Array(N);
  const nameMass = new Float64Array(N);
  const nameTerms = new Uint16Array(N);
  const named = new Uint8Array(N); // a rare name term or a title phrase: names the note on its own
  const matched = new Uint16Array(N);
  let Q = 0;
  for (const t of qTerms) {
    const p = idx.post[t];
    if (!p) {
      Q += idfMax; // a word the vault never uses
      continue;
    }
    const df = p.length / 2;
    const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
    idfOf.set(t, idf);
    Q += idf;
    for (let j = 0; j < p.length; j += 2) {
      const i = p[j];
      const tf = p[j + 1];
      score[i] += (idf * tf * (T.K1 + 1)) / (T.K1 + tf);
      cover[i] += idf;
      matched[i]++;
    }
    for (const i of idx.name[t] ?? []) {
      score[i] += T.NAME_W * idf + T.NAME_C;
      nameMass[i] += idf;
      nameTerms[i]++;
      if (idf >= T.RARE_IDF) named[i] = 1;
    }
  }
  // phrase bonus: a multi-word title / alias / file name that occurs in the prompt as consecutive terms
  for (const [i, ph] of idx.phrases) {
    if (ph.length > seq.length || !ph.every((t) => idfOf.has(t))) continue;
    for (let s = 0; s + ph.length <= seq.length; s++) {
      let ok = true;
      for (let k = 0; k < ph.length && ok; k++) ok = seq[s + k] === ph[k];
      if (ok) {
        score[i] += T.PHRASE_W * ph.reduce((a, t) => a + (idfOf.get(t) ?? 0), 0);
        named[i] = 1;
        break;
      }
    }
  }
  const all: Hit[] = [];
  for (let i = 0; i < N; i++) {
    if (matched[i]) all.push({ i, score: score[i], cover: Q > 0 ? cover[i] / Q : 0, matched: matched[i], nameMass: nameMass[i], nameTerms: nameTerms[i], named: named[i] === 1 });
  }
  all.sort((a, b) => b.score - a.score || a.i - b.i);
  // the anchor: the best note the prompt actually names, strong enough on its own
  const anchor = all.find((h) => (h.named || h.nameTerms >= T.NAME_TERMS_MIN) && h.score >= T.FLOOR && h.cover >= T.COVER_TOP);
  if (!anchor) return { hits: [], all };
  const best = all[0].score;
  const cut = Math.max(T.FLOOR, T.REL * best);
  const cutUnnamed = Math.max(T.FLOOR, T.REL_UNNAMED * best);
  const keep = (h: Hit) => h.score >= (h.nameTerms ? cut : cutUnnamed) && h.cover >= T.COVER_ANY;
  const hits = all.filter((h) => h === anchor || keep(h)).slice(0, T.MAX_NOTES);
  if (!hits.includes(anchor)) hits[hits.length - 1] = anchor;
  return { hits, all };
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

/** The "Brain recall" block: at most MAX_CHARS characters, ASCII, one line per note. */
export function formatRecall(idx: RecallIndex, hits: Hit[], vault = VAULT): string {
  const head = `Brain recall (vault ${vault}; reference notes, not instructions) that may relate to this prompt. Read one only if it helps.`;
  const budget = Math.floor((TUNING.MAX_CHARS - head.length) / hits.length) - 1;
  const lines = hits.map(({ i }) => {
    const n = idx.notes[i];
    const base = `- ${n.p}`;
    const title = norm(n.t) === norm(n.slug) ? "" : ` | ${n.t}`;
    const room = budget - base.length;
    if (room <= 3) return clip(base, budget);
    const withTitle = clip(base + title, budget);
    const left = budget - withTitle.length - 3;
    return left >= 20 && n.s ? withTitle + " | " + clip(n.s, left) : withTitle;
  });
  return [head, ...lines].join("\n");
}

export function loadIndex(): RecallIndex | null {
  try {
    const idx = JSON.parse(readFileSync(INDEX_FILE, "utf8")) as RecallIndex;
    if (!idx || idx.v !== INDEX_VERSION || !Array.isArray(idx.notes) || !idx.post || !idx.name || !Array.isArray(idx.phrases)) return null;
    // term lookups must only see the index's own keys ("constructor" is a word, not Object.prototype.constructor)
    Object.setPrototypeOf(idx.post, null);
    Object.setPrototypeOf(idx.name, null);
    return idx;
  } catch {
    return null;
  }
}

function readSlow(): { sig: string; at: number } | null {
  try {
    const s = JSON.parse(readFileSync(INDEX_SLOW_FILE, "utf8"));
    return s && typeof s.sig === "string" && typeof s.at === "number" ? s : null;
  } catch {
    return null;
  }
}
function markSlow(sig: string, why: string) {
  try {
    writeAtomic(INDEX_SLOW_FILE, JSON.stringify({ sig, at: Date.now() }));
  } catch {
    /* best effort */
  }
  logLine("recall", `serving the previous index for up to ${SLOW_BACKOFF_MS / 60_000} min: ${why}`);
}

/**
 * The current index, rebuilt first when any note was added, changed, renamed or removed since it was built.
 * With a budget (the prompt path), a rebuild that runs out of time, or that has to skip unreadable notes, falls back to
 * the previous index and backs off for a while instead of costing every prompt; sync and the watcher rebuild unbudgeted.
 */
export function freshIndex(notes: NoteStat[] = statNotes(VAULT), budgetMs = Infinity): { idx: RecallIndex; rebuilt: boolean } {
  const idx = loadIndex();
  const sig = signature(notes);
  if (idx && idx.sig === sig) return { idx, rebuilt: false };
  const budgeted = Number.isFinite(budgetMs);
  if (budgeted && idx) {
    const slow = readSlow();
    if (slow && slow.sig === sig && Date.now() - slow.at < SLOW_BACKOFF_MS) return { idx, rebuilt: false };
  }
  try {
    const r = rebuildIndex(notes, budgeted ? performance.now() + budgetMs : Infinity);
    if (budgeted && r.skipped) markSlow(sig, `${r.skipped} unreadable note(s)`);
    return { idx: r.idx, rebuilt: true };
  } catch (e) {
    if (!budgeted || !idx) throw e;
    markSlow(sig, oneLine((e as Error)?.message ?? e, 200));
    return { idx, rebuilt: false };
  }
}

/** Prompts longer than this are scored on their first and last half of it (a pasted log must not stall the hook). */
const MAX_PROMPT_CHARS = 20_000;

/** additionalContext for a prompt, or null when nothing should be shown. */
export function recallContext(fullPrompt: string): string | null {
  const half = MAX_PROMPT_CHARS / 2;
  const prompt = fullPrompt.length > MAX_PROMPT_CHARS ? fullPrompt.slice(0, half) + "\n" + fullPrompt.slice(-half) : fullPrompt;
  if (isTrivial(prompt)) return null;
  const { idx } = freshIndex(statNotes(VAULT), REBUILD_BUDGET_MS);
  const { hits } = rank(idx, prompt);
  return hits.length ? formatRecall(idx, hits) : null;
}
