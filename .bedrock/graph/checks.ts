// The publish gate: independent checks on the BUILT page. It does not import the extractor.
// build.ts runs it on the temporary file before that file may replace the live page; verify.ts and snapshot.ts run it on
// the live page. It holds for any vault: no fixed counts live here (those are in snapshot.ts).
import { createHash } from "node:crypto";

export const D3_URL = "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js";
export const CDN_ORIGIN = "https://cdnjs.cloudflare.com";
export const TYPE_KEYS = ["actor", "concept", "discussion", "person", "project", "topic", "team", "fleeting", "other"];
/** the exact key set of a node object: anything else (sources, sha256, email, path ...) is a leak */
export const NODE_KEYS = ["id", "dir", "type", "title", "status", "domains", "category", "updated", "tagline", "degree"];

/** Privacy / leak patterns, run over the final bytes of the page. */
export const LEAK_GUARDS: [string, RegExp][] = [
  ["email address", /[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)+/],
  ["sha256", /sha-?256/i],
  ["64-char hex", /\b[0-9a-f]{64}\b/i],
  ["file:// url", /file:\/\//i],
  [".claude path", /\.claude/i],
  ["windows drive path", /[A-Za-z]:\\/],
  ["users path", /[\\/]Users[\\/]/i],
  ['"sources" key', /"sources"/],
  ["@ other than CSS @media", /@(?!media\b)/],
];

const DATA_RE = /<script type="application\/json" id="graph-data">\n([\s\S]*?)\n<\/script>/;

/** The embedded graph data, or null when the block is missing or not valid JSON. */
export function extractData(html: string): any | null {
  const m = html.match(DATA_RE);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

/** Every http(s) URL in the page, de-duplicated. */
export function pageUrls(html: string): string[] {
  return [...new Set((html.match(/https?:\/\/[^\s"'<>)]+/g) ?? []).map((u) => u.replace(/;$/, "")))];
}

/** The script-src directive of the page's CSP meta tag ("" when there is none). */
export function scriptSrcOf(html: string): string {
  const csp = (html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/) ?? [])[1] ?? "";
  return csp.split(";").map((d) => d.trim()).find((d) => d.startsWith("script-src ")) ?? "";
}

/** The text of every executable inline <script> (the JSON data block has a type attribute, so it is not one). */
export function inlineScripts(html: string): string[] {
  return [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
}

export const sha384Source = (text: string) => "'sha384-" + createHash("sha384").update(text, "utf8").digest("base64") + "'";

/**
 * Which note and field trip a leak guard (never prints the matched text). Used to make a failed publish actionable:
 * "note X, field tagline" is enough to go and fix it.
 */
export function locateLeaks(nodes: any[], limit = 6): string[] {
  const where: string[] = [];
  outer: for (const n of nodes) {
    const fields: [string, string][] = [
      ["id", String(n.id)],
      ["dir", String(n.dir)],
      ["title", String(n.title)],
      ["tagline", String(n.tagline)],
      ["status", String(n.status ?? "")],
      ["category", String(n.category ?? "")],
      ["updated", String(n.updated ?? "")],
      ["domains", Array.isArray(n.domains) ? n.domains.join(",") : ""],
    ];
    for (const [field, value] of fields)
      for (const [name, re] of LEAK_GUARDS)
        if (re.test(value)) {
          where.push(`note "${String(n.id).replace(/[^\x20-\x7e]/g, "?").slice(0, 80)}" field ${field}: ${name}`);
          if (where.length >= limit) break outer;
        }
  }
  return where;
}

export type GateResult = {
  ok: boolean;
  failures: string[];
  /** for privacy-guard failures: the notes/fields responsible, when they can be found in the data */
  where: string[];
  nodes: number;
  links: number;
  mentions: number;
};

/** Structure, privacy, network and CSP checks on the final page text. Pure: no I/O. */
export function gate(html: string): GateResult {
  const failures: string[] = [];
  const fail = (m: string) => failures.push(m);
  let nNodes = 0;
  let nLinks = 0;
  let nMentions = 0;
  let nodesForWhere: any[] = [];

  // ---- document shape ----
  if (!/^<!doctype html>\n<html lang="en" data-theme="dark">/i.test(html)) fail('document must start with <!doctype html> and <html lang="en" data-theme="dark">');
  if (!html.trimEnd().endsWith("</html>")) fail("document is cut off (it does not end with </html>)");

  // ---- embedded data: parses, is internally consistent, carries only the expected keys ----
  const data = extractData(html);
  if (!data || typeof data !== "object" || !Array.isArray(data.nodes) || !Array.isArray(data.links) || typeof data.meta !== "object" || !data.meta) {
    fail("graph data is missing or is not valid JSON with meta/nodes/links");
  } else {
    const nodes: any[] = data.nodes;
    const links: any[] = data.links;
    nodesForWhere = nodes;
    nNodes = nodes.length;
    nLinks = links.length;
    const want = NODE_KEYS.join(",");
    const badShape = nodes.filter(
      (n) =>
        !n ||
        Object.keys(n).join(",") !== want ||
        typeof n.id !== "string" ||
        !n.id ||
        typeof n.dir !== "string" ||
        !TYPE_KEYS.includes(n.type) ||
        typeof n.title !== "string" ||
        !n.title ||
        !(n.status === null || typeof n.status === "string") ||
        !Array.isArray(n.domains) ||
        !n.domains.every((d: unknown) => typeof d === "string") ||
        !(n.category === null || typeof n.category === "string") ||
        !(n.updated === null || typeof n.updated === "string") ||
        typeof n.tagline !== "string" ||
        !Number.isInteger(n.degree) ||
        n.degree < 0,
    );
    if (badShape.length) fail(`${badShape.length} node(s) have an unexpected shape or key set (first: ${JSON.stringify(String(badShape[0]?.id ?? "?")).slice(0, 80)})`);
    const ids = new Set(nodes.map((n) => n?.id));
    if (ids.size !== nodes.length) fail("duplicate node ids");
    const nb = new Map<string, Set<string>>(nodes.map((n) => [n?.id, new Set<string>()]));
    const pairs = new Set<string>();
    let dangling = 0;
    let selfLinks = 0;
    let dupPairs = 0;
    let badWeights = 0;
    for (const l of links) {
      if (!ids.has(l?.source) || !ids.has(l?.target)) {
        dangling++;
        continue;
      }
      if (l.source === l.target) selfLinks++;
      if (!Number.isInteger(l.weight) || l.weight < 1) badWeights++;
      else nMentions += l.weight;
      const k = [l.source, l.target].sort().join("\u0000");
      if (pairs.has(k)) dupPairs++;
      pairs.add(k);
      nb.get(l.source)!.add(l.target);
      nb.get(l.target)!.add(l.source);
    }
    if (dangling) fail(`${dangling} link(s) point at a missing note`);
    if (selfLinks) fail(`${selfLinks} self link(s)`);
    if (dupPairs) fail(`${dupPairs} duplicated undirected link pair(s)`);
    if (badWeights) fail(`${badWeights} link(s) with a non-positive or non-integer weight`);
    const badDegree = nodes.filter((n) => n && nb.has(n.id) && n.degree !== nb.get(n.id)!.size).length;
    if (badDegree) fail(`${badDegree} node(s) whose degree is not their number of distinct neighbours`);
    // meta must agree with the arrays it summarises
    const m = data.meta;
    if (m.notes !== nodes.length || m.links !== links.length || m.mentions !== nMentions) fail("meta counts (notes/links/mentions) disagree with the data");
    const perType: Record<string, number> = {};
    for (const n of nodes) perType[n?.type] = (perType[n?.type] ?? 0) + 1;
    const metaTypes = m.types && typeof m.types === "object" ? (m.types as Record<string, number>) : {};
    const typeKeys = new Set([...Object.keys(perType), ...Object.keys(metaTypes)]);
    for (const t of typeKeys) if ((perType[t] ?? 0) !== (metaTypes[t] ?? 0)) fail(`meta.types.${t} disagrees with the nodes`);
  }

  // ---- privacy guards on the final bytes ----
  const tripped = LEAK_GUARDS.filter(([, re]) => re.test(html)).map(([name]) => name);
  for (const name of tripped) fail("privacy guard: " + name);
  const where = tripped.length ? locateLeaks(nodesForWhere) : [];

  // ---- network: the only URLs are the pinned D3 script and its CDN origin ----
  const urls = pageUrls(html);
  if (!urls.includes(D3_URL) || urls.some((u) => u !== D3_URL && u !== CDN_ORIGIN)) fail("unexpected URLs in the page: " + JSON.stringify(urls.filter((u) => u !== D3_URL && u !== CDN_ORIGIN)).slice(0, 200));

  // ---- CSP: every executable inline script is pinned by hash, no unsafe-inline / unsafe-eval ----
  const scriptSrc = scriptSrcOf(html);
  const inline = inlineScripts(html);
  if (!scriptSrc) fail("CSP script-src directive is missing");
  if (/unsafe-/.test(scriptSrc)) fail("CSP script-src allows unsafe-inline or unsafe-eval");
  if (inline.length !== 2) fail(`expected exactly 2 executable inline scripts, found ${inline.length}`);
  inline.forEach((s, i) => {
    if (!scriptSrc.includes(sha384Source(s))) fail(`CSP script-src does not pin inline script #${i + 1} (its hash does not match the bytes in the page)`);
  });

  return { ok: failures.length === 0, failures, where, nodes: nNodes, links: nLinks, mentions: nMentions };
}
