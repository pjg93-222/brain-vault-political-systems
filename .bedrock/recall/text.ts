// Text processing shared by the recall index builder and the per-prompt scorer. Both sides MUST use the same functions:
// a term only matches when the prompt and the note reduce it to the same stem.

/** Words that carry no topic: English function words plus the filler of chat prompts ("please explain ..."). */
const STOP_LIST = `
a about above across after again against ago all almost along already also although always am among an and another any
anybody anyone anything anyway anywhere are aren around as ask asked asking at away back be became because become been
before began being below beside besides best better between beyond both but by can cannot cant could couldn did didn do
does doesn doing don done down during each either else elsewhere enough etc even ever every everyone everything exactly
few for from further get gets getting give given gives go goes going gone got gotten had hadn has hasn have haven having
he her here hers herself hi him himself his how however i if in instead into is isn it its itself just keep kind know
known knows last later least less let lets like likely ll look looked looking looks lot lots made make makes making many
may maybe me mean means might mine more most mostly much must my myself near need needed needs never next no nobody none
nor not nothing now of off often oh ok okay on once one ones only onto or other others otherwise our ours ourselves out
over own part per perhaps please put quite rather re really right said same say says see seem seemed seems seen shall
she should shouldn show showed shows since so some somebody someone something sometimes somewhat somewhere soon still
stuff such sure take taken takes tell tells than thank thanks that the their theirs them themselves then there these
they thing things think this those though through thus to together too took toward towards try trying under unless
until up upon us use used uses using ve very via want wanted wants was wasn way ways we well went were weren what
whatever when whenever where wherever whether which while who whoever whole whom whose why will with within without
won would wouldn yeah yep yes yet you your yours yourself yourselves
also again anyway basically actually literally simply quickly currently recently still
explain explained explaining describe describes summarize summarise remind reminder help helps helped helping
find check figure tried wonder wondering curious question questions answer
hello hey thx ty lgtm cool nice great awesome perfect fine good bad sounds sound go ahead proceed continue continued
yup nope alright alrighty agreed agree approve approved confirm confirmed done
`;

export const STOP: ReadonlySet<string> = new Set(STOP_LIST.split(/\s+/).filter(Boolean));

/**
 * Light English stemmer: plurals, -ing, -ed and a final -e, so "scrapers"/"scraper", "scraping"/"scraped"/"scrape" and
 * "updates"/"updated"/"update" meet. Deliberately small and predictable rather than linguistically complete.
 */
export function stem(w: string): string {
  if (w.length <= 3 || /^\d+$/.test(w)) return w;
  let s = w;
  if (s.endsWith("ies") && s.length > 4) s = s.slice(0, -3) + "y";
  else if (s.endsWith("sses")) s = s.slice(0, -2);
  else if (/(?:ch|sh|x|z)es$/.test(s)) s = s.slice(0, -2);
  else if (s.endsWith("s") && !/(?:ss|us|is|ys)$/.test(s)) s = s.slice(0, -1);
  if (s.length > 5 && s.endsWith("ing")) {
    s = s.slice(0, -3);
    if (/([b-df-hj-np-tv-z])\1$/.test(s) && !/(?:ll|ss|zz)$/.test(s)) s = s.slice(0, -1);
  } else if (s.length > 4 && s.endsWith("ed")) {
    s = s.slice(0, -2);
    if (/([b-df-hj-np-tv-z])\1$/.test(s) && !/(?:ll|ss|zz)$/.test(s)) s = s.slice(0, -1);
  }
  if (s.length > 4 && s.endsWith("e")) s = s.slice(0, -1);
  return s;
}

const WORD = /[\p{L}\p{N}]+/gu;
const stemCache = new Map<string, string | null>();

/**
 * Text -> stemmed terms, in order, stopwords removed. A token must be 2+ characters; a pure number needs 3+ digits
 * ("2026", "8806" are kept, "2" and "17" are dropped). Returns null-free terms only.
 */
export function terms(text: string): string[] {
  const out: string[] = [];
  const m = text.toLowerCase().match(WORD);
  if (!m) return out;
  for (const raw of m) {
    let t = stemCache.get(raw);
    if (t === undefined) {
      if (raw.length < 2 || (/^\d+$/.test(raw) && raw.length < 3) || raw.length > 40 || STOP.has(raw)) t = null;
      else {
        const s = stem(raw);
        t = STOP.has(s) ? null : s;
      }
      stemCache.set(raw, t);
    }
    if (t) out.push(t);
  }
  return out;
}

/** Plain-text form of markdown for indexing and summaries: wikilinks to their label, links/emphasis/code markers dropped. */
export function plainMarkdown(s: string): string {
  return s
    .replace(/!?\[\[([^\[\]\n]{0,300}?)\]\]/g, (_m, inner: string) => {
      const t = inner.replace(/\\\|/g, "|");
      const pipe = t.indexOf("|");
      return pipe >= 0 ? t.slice(pipe + 1) : t.split("#")[0].split("/").pop()!.replace(/\.md$/i, "");
    })
    .replace(/\[([^\]\n]{1,300})\]\([^)\n]{0,2000}\)/g, "$1") // bounded: a line of many "[" must stay linear
    .replace(/`+/g, "")
    .replace(/\*\*|__/g, "")
    .replace(/<!--[\s\S]{0,5000}?-->/g, " ");
}

/** Collapse to one line and cut to `max` characters at a word boundary, with "..." when cut. ASCII-only output. */
export function clip(s: string, max: number): string {
  const t = s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[ \s]+/g, " ")
    .trim();
  if (t.length <= max) return t;
  if (max <= 3) return t.slice(0, max);
  const cut = t.slice(0, max - 3);
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,;:.(\[-]+$/, "") + "...";
}
