// Independent verification of the BUILT page (it does not import the extractor): prints a full report and ends with the
// publish gate from checks.ts, exiting 1 if the gate fails. No fixed counts live here; the pinned note / link counts are
// a separate check in snapshot.ts, so this one stays valid as the vault grows.
//   bun verify.ts [--file <page>]      (default: brain-graph.html beside the vault)
import { readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { DEFAULT_OUT, argValue } from "./common.ts";
import { gate } from "./checks.ts";

const FILE = argValue("--file") ?? DEFAULT_OUT;
const html = readFileSync(FILE, "utf8");
const line = (...a: unknown[]) => console.log(...a);

line("== file ==");
line("path:", FILE);
line("size:", statSync(FILE).size, "bytes (" + (statSync(FILE).size / 1024).toFixed(1) + " KiB); lines:", html.split("\n").length);

// ---------- 1. embedded JSON parses; counts ----------
line("\n== embedded JSON ==");
const m = html.match(/<script type="application\/json" id="graph-data">\n([\s\S]*?)\n<\/script>/);
if (!m) throw new Error("graph-data script block not found");
const data = JSON.parse(m[1]);
const nodes = data.nodes as any[];
const links = data.links as any[];
line("JSON.parse OK. nodes:", nodes.length, " links (undirected pairs):", links.length, " total mentions:", links.reduce((a, l) => a + l.weight, 0));
const perType: Record<string, number> = {};
for (const n of nodes) perType[n.type] = (perType[n.type] ?? 0) + 1;
line("per-type (from nodes):", JSON.stringify(perType));
line("per-type (from meta):  ", JSON.stringify(data.meta.types));
line("node keys:", nodes[0] ? Object.keys(nodes[0]).join(",") : "(no notes)");
const ids = new Set(nodes.map((n) => n.id));
line("unique ids:", ids.size, "| dangling link endpoints:", links.filter((l) => !ids.has(l.source) || !ids.has(l.target)).length, "| self links:", links.filter((l) => l.source === l.target).length);
const pairKeys = new Set(links.map((l) => [l.source, l.target].sort().join("|")));
line("distinct undirected pairs:", pairKeys.size, "(must equal link count)");
// degree = number of distinct neighbours, recomputed from links
const nb = new Map<string, Set<string>>(nodes.map((n) => [n.id, new Set()]));
for (const l of links) { nb.get(l.source)!.add(l.target); nb.get(l.target)!.add(l.source); }
line("stored degree == recomputed distinct neighbours for all nodes:", nodes.every((n) => n.degree === nb.get(n.id)!.size));
const w = links.map((l) => l.weight);
line("weight min/max:", Math.min(...w), Math.max(...w));
line("forbidden keys present in node objects (sources/sha256/email/path):", nodes.some((n) => "sources" in n || "sha256" in n || "email" in n || "path" in n));
line("nodes missing tagline:", nodes.filter((n) => !n.tagline).length, "| max tagline length:", Math.max(...nodes.map((n) => n.tagline.length)));

// ---------- 2. top 10 by degree ----------
line("\n== top 10 by degree ==");
const top = [...nodes].sort((a, b) => b.degree - a.degree || a.title.localeCompare(b.title)).slice(0, 10);
top.forEach((n, i) => line(String(i + 1).padStart(2) + ".", String(n.degree).padStart(3), n.type.padEnd(8), n.title, " [" + n.id + "]"));

// ---------- 3. privacy greps on the final bytes ----------
line("\n== privacy / network greps on the HTML ==");
const count = (re: RegExp) => (html.match(re) ?? []).length;
const lineCount = (re: RegExp) => html.split("\n").filter((l) => re.test(l)).length;
line("lines containing '@' (what `rg -c '@'` reports):", lineCount(/@/));
const atLines = html.split("\n").map((l, i) => [i + 1, l] as const).filter(([, l]) => l.includes("@"));
for (const [i, l] of atLines) line("   line", i + ":", l.trim().slice(0, 90));
line("occurrences of '@' that are NOT the CSS '@media' at-rule:", count(/@(?!media\b)/g));
line("email-pattern matches:", count(/[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)+/g));
line("'sha256' (any case):", count(/sha-?256/gi), "| 64-hex strings:", count(/\b[0-9a-f]{64}\b/gi), "| any 32+ hex run:", count(/\b[0-9a-f]{32,}\b/gi));
line("'\"sources\"' JSON key:", count(/"sources"/g), "| the word 'sources' in any form:", count(/sources/gi));
line("file:// URLs:", count(/file:\/\//gi), "| '.claude':", count(/\.claude/gi), "| drive paths (X:\\):", count(/[A-Za-z]:\\/g), "| '\\Users\\' or '/Users/':", count(/[\\/]Users[\\/]/gi), "| 'pgoff':", count(/pgoff/gi));
const urls = [...new Set(html.match(/https?:\/\/[^\s"'<>)]+/g) ?? [])];
line("distinct http(s) URLs in file:", JSON.stringify(urls));
line("<script src=...> tags:", JSON.stringify([...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map((x) => x[1])));
line("<link>/<img>/<iframe>/@import/url( / fetch( / XMLHttpRequest / WebSocket / sendBeacon / import(:",
  count(/<link\b/gi), count(/<img\b/gi), count(/<iframe\b/gi), count(/@import/gi), count(/url\(/gi), count(/\bfetch\(/g), count(/XMLHttpRequest/g), count(/WebSocket/g), count(/sendBeacon/g), count(/\bimport\(/g));
line("link tags found:", JSON.stringify([...html.matchAll(/<link\b[^>]*>/gi)].map((x) => x[0])));
line("CSP meta:", (html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/) ?? [])[1]);

// ---------- 4. well-formedness: tag balance with a purpose-built tokenizer ----------
line("\n== well-formedness ==");
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
function balance(src: string) {
  const stack: { tag: string; line: number }[] = [];
  const errors: string[] = [];
  const lower = src.toLowerCase();
  let i = 0, tags = 0, opens = 0;
  const lineAt = (p: number) => src.slice(0, p).split("\n").length;
  while (i < src.length) {
    const lt = src.indexOf("<", i);
    if (lt < 0) break;
    if (src.startsWith("<!--", lt)) { const e = src.indexOf("-->", lt + 4); if (e < 0) { errors.push("unterminated comment"); break; } i = e + 3; continue; }
    if (src.startsWith("<!", lt)) { i = src.indexOf(">", lt) + 1; continue; }
    const mm = /^<(\/?)([A-Za-z][A-Za-z0-9-]*)/.exec(src.slice(lt, lt + 80));
    if (!mm) { i = lt + 1; continue; }
    let j = lt + mm[0].length, q = "";
    while (j < src.length) { const ch = src[j]; if (q) { if (ch === q) q = ""; } else if (ch === '"' || ch === "'") q = ch; else if (ch === ">") break; j++; }
    const raw = src.slice(lt, j + 1);
    const name = mm[2].toLowerCase();
    tags++;
    if (mm[1]) {
      const top = stack.pop();
      if (!top || top.tag !== name) errors.push(`mismatched </${name}> at line ${lineAt(lt)} (innermost open: ${top ? top.tag + "@" + top.line : "none"})`);
      i = j + 1;
      continue;
    }
    opens++;
    i = j + 1;
    if (VOID.has(name) || raw.endsWith("/>")) continue;
    stack.push({ tag: name, line: lineAt(lt) });
    if (name === "script" || name === "style") {
      const close = lower.indexOf("</" + name, i);
      if (close < 0) { errors.push("unclosed <" + name + ">"); break; }
      i = close;
    }
  }
  for (const s of stack) errors.push(`unclosed <${s.tag}> opened at line ${s.line}`);
  return { tags, opens, errors };
}
const b = balance(html);
line("tag tokens:", b.tags, "(start tags:", b.opens + ")", "| balance errors:", b.errors.length);
for (const e of b.errors.slice(0, 10)) line("  ", e);
line("doctype:", /^<!doctype html>/i.test(html), "| <html lang + data-theme>:", /<html lang="en" data-theme="dark">/.test(html), "| <title>:", (html.match(/<title>([^<]*)<\/title>/) ?? [])[1], "| viewport meta:", /name="viewport"/.test(html));

// cross-check the tokenizer against Bun's built-in streaming HTML parser (lol-html): element counts must agree.
// lol-html parses <noscript> content as text (scripting-enabled semantics) while the tokenizer sees its tags,
// so compare both on the document with the <noscript> block removed, and report the raw counts too.
const countRewriter = async (src: string) => {
  let elements = 0, endTags = 0;
  await new HTMLRewriter()
    .on("*", {
      element(el) {
        elements++;
        try { el.onEndTag(() => { endTags++; }); } catch { /* void elements have no end tag */ }
      },
    })
    .transform(new Response(src))
    .text();
  return { elements, endTags };
};
const raw = await countRewriter(html);
line("HTMLRewriter (raw): elements", raw.elements, "| end tags seen", raw.endTags, "| tokenizer start tags", b.opens, "| difference", b.opens - raw.elements);
const noNoscript = html.replace(/<noscript>[\s\S]*?<\/noscript>/g, "");
const b2 = balance(noNoscript);
const rw2 = await countRewriter(noNoscript);
line("without <noscript>: tokenizer start tags", b2.opens, "== HTMLRewriter elements", rw2.elements, "->", b2.opens === rw2.elements, "| balance errors:", b2.errors.length);
line("<noscript> block contains", (html.match(/<noscript>([\s\S]*?)<\/noscript>/) ?? [])[1]);

// ---------- 5. theme + layout tokens present ----------
line("\n== theming ==");
const tokenNames = (block: string) => new Set([...block.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const lightBlock = (html.match(/:root,\s*:root\[data-theme="light"\]\s*\{([^}]*)\}/) ?? [])[1] ?? "";
const darkBlock = (html.match(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/) ?? [])[1] ?? "";
const mediaBlock = (html.match(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{([^}]*)\}/) ?? [])[1] ?? "";
const lightTokens = tokenNames(lightBlock), darkTokens = tokenNames(darkBlock), mediaTokens = tokenNames(mediaBlock);
const swapped = [...lightTokens].filter((t) => !t.startsWith("--t-")); // everything except the fixed type colours
line("light set under ':root, :root[data-theme=\"light\"]':", lightTokens.size, "tokens | dark set under ':root[data-theme=\"dark\"]':", darkTokens.size, "tokens | prefers-color-scheme block:", mediaTokens.size, "tokens");
line("dark set carries every non-type token of the light set:", swapped.every((t) => darkTokens.has(t)), "| media block identical to the dark scope:", [...darkTokens].every((t) => mediaTokens.has(t)) && darkTokens.size === mediaTokens.size,
  "| dark scope defines color-scheme: dark:", /color-scheme:\s*dark/.test(darkBlock));
line("type colours are NOT redefined in dark (identical in both themes):", ![...darkTokens].some((t) => t.startsWith("--t-")));
line("prefers-color-scheme media query guarded by :not([data-theme=\"light\"]):", mediaBlock.length > 0, "| explicit light scope present:", /:root\[data-theme="light"\]/.test(html), "| explicit dark scope present:", /:root\[data-theme="dark"\]/.test(html));
line("explicit body background:", /body\s*\{[^}]*background:\s*var\(--page\)/.test(html));

// ---------- 5b. dark by default, bootstrap, toggle, storage, CSP ----------
line("\n== dark default / toggle / storage / CSP ==");
const headEnd = html.indexOf("</head>");
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => ({ text: m[1], at: m.index! }));
line("executable inline <script> blocks:", inlineScripts.length, "| first one is inside <head> and before <style>:", inlineScripts[0].at < headEnd && inlineScripts[0].at < html.indexOf("<style>"));
const boot = inlineScripts[0].text;
line("bootstrap: defaults to 'dark':", /var t = 'dark'/.test(boot), "| reads the stored value:", /getItem\('brain-graph-theme'\)/.test(boot), "| accepts only 'light'/'dark':", /s === 'light' \|\| s === 'dark'/.test(boot), "| sets data-theme on <html>:", /documentElement\.setAttribute\('data-theme', t\)/.test(boot), "| does not consult prefers-color-scheme / matchMedia:", !/matchMedia|prefers-color-scheme/.test(boot));
const lsAll = html.match(/localStorage/g) ?? [];
const lsGuarded = html.match(/try\s*\{[^{}]*localStorage[^{}]*\}\s*catch\s*\(/g) ?? [];
line("localStorage references:", lsAll.length, "| each inside try { } catch:", lsGuarded.length, "->", lsAll.length === lsGuarded.length && lsAll.length > 0, "| sessionStorage/IndexedDB/cookie used:", /sessionStorage|indexedDB|document\.cookie/.test(html));
line("toggle button:", (html.match(/<button id="theme"[^>]*>/) ?? [])[0]);
line("toggle writes under key 'brain-graph-theme' and keeps aria-label in sync:", /localStorage\.setItem\(THEME_KEY, t\)/.test(html) && /const THEME_KEY = 'brain-graph-theme'/.test(html), "|", /setAttribute\('aria-label', 'Switch to '/.test(html));
const cspMeta = (html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/) ?? [])[1] ?? "";
const scriptSrc = cspMeta.split(";").map((d) => d.trim()).find((d) => d.startsWith("script-src ")) ?? "";
line("CSP script-src:", scriptSrc.replace(/(sha384-.{8})[A-Za-z0-9+/=]+/g, "$1..."));
const hashOk = inlineScripts.map((sc) => scriptSrc.includes("'sha384-" + createHash("sha384").update(sc.text, "utf8").digest("base64") + "'"));
line("independently recomputed SHA-384 of each inline script is in script-src:", JSON.stringify(hashOk), "| 'unsafe-inline'/'unsafe-eval' in script-src:", /unsafe-/.test(scriptSrc));
line("the string 'sha256' anywhere in the file:", (html.match(/sha-?256/gi) ?? []).length, "| 64-hex runs:", (html.match(/\b[0-9a-f]{64}\b/gi) ?? []).length);
const types = ["actor", "person", "team", "topic", "discussion", "project", "fleeting", "concept", "other"];
const want: Record<string, string> = { actor: "#4a90d9", person: "#50c878", team: "#e8913a", topic: "#9b59b6", discussion: "#f1c40f", project: "#e74c3c", fleeting: "#95a5a6", concept: "#1abc9c", other: "#757575" };
line("type colour tokens:", types.map((t) => t + "=" + (html.match(new RegExp("--t-" + t + ":\\s*(#[0-9a-fA-F]{6})")) ?? [])[1]).join(" "));
line("all nine (eight entity types + 'other') match the spec:", types.every((t) => (html.match(new RegExp("--t-" + t + ":\\s*(#[0-9a-fA-F]{6})")) ?? [])[1]?.toLowerCase() === want[t]));
const otherCount = nodes.filter((n) => n.type === "other").length;
const chipsInCode = /key: 'other', shape: 'octagon'/.test(html);
line("'other' notes:", otherCount, "| 'other' defined in the app (shown as a legend chip only when > 0):", chipsInCode);

// ---------- 6. the publish gate (the same checks build.ts runs before it replaces the live page) ----------
line("\n== publish gate (checks.ts) ==");
const g = gate(html);
line(g.ok ? "PASS" : "FAIL", "| nodes", g.nodes, "| links", g.links, "| mentions", g.mentions);
for (const f of g.failures) line("  FAIL:", f);
for (const w of g.where) line("  where:", w);
process.exit(g.ok ? 0 : 1);
