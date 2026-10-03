// Builds brain-graph.html (beside the vault, never inside it) from the vault + template/style/app sources and publishes it
// atomically: the page is written to a temporary file next to the output, checked by the gate in checks.ts, and only then
// renamed over the live page. If anything fails the previous page is left untouched and the reason is reported.
// READ-ONLY on the vault.
//
//   bun build.ts                              normal build (this is exactly what the watcher runs)
//   bun build.ts --vault <dir> --out <file>   test build of another vault; --vault always needs --out
//
// The last line printed is "BUILD_RESULT {json}" so the watcher can read the outcome. Exit code 0 = published, 1 = not.
import { readFileSync, writeFileSync, renameSync, unlinkSync, statSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve, dirname, basename, sep } from "node:path";
import { buildGraph, DIR_TYPE, ALL_TYPES, OTHER, INCLUDE_ROOT_NOTES } from "./extract.ts";
import { GRAPH_DIR, VAULT, DEFAULT_OUT, argValue, oneLine } from "./common.ts";
import { gate, pageUrls, scriptSrcOf } from "./checks.ts";

const started = performance.now();

class GateFailure extends Error {
  constructor(
    message: string,
    readonly where: string[],
  ) {
    super(message);
  }
}

/** rename over the live page; a browser or scanner holding the old file open for a moment is retried briefly */
function replaceFile(from: string, to: string) {
  let last: unknown;
  for (let i = 0; i < 10; i++) {
    try {
      renameSync(from, to);
      return;
    } catch (e: any) {
      last = e;
      if (!["EPERM", "EBUSY", "EACCES"].includes(e?.code)) break;
      Bun.sleepSync(150);
    }
  }
  throw last;
}

/** leftovers of a build that was killed mid-way: <out>.tmp-<pid> files older than an hour */
function sweepStaleTemps(out: string) {
  const prefix = basename(out) + ".tmp-";
  try {
    for (const f of readdirSync(dirname(out))) {
      if (!f.startsWith(prefix) || !/^\d+$/.test(f.slice(prefix.length))) continue;
      const p = join(dirname(out), f);
      if (Date.now() - statSync(p).mtimeMs > 3_600_000) unlinkSync(p);
    }
  } catch {
    /* best effort */
  }
}

function build() {
  const vaultArg = argValue("--vault");
  const outArg = argValue("--out");
  if (vaultArg && !outArg) throw new Error("--vault needs --out as well (a test build must never write to the live page)");
  const vault = resolve(vaultArg ?? VAULT);
  const OUT = resolve(outArg ?? DEFAULT_OUT);
  const lc = (p: string) => p.toLowerCase();
  if (lc(OUT) === lc(vault) || lc(OUT).startsWith(lc(vault).endsWith(sep) ? lc(vault) : lc(vault) + sep)) throw new Error("refusing to write inside the vault");

  const { nodes, links, stats, warnings, notices } = buildGraph(vault, { rootNotes: INCLUDE_ROOT_NOTES });
  for (const w of warnings) console.warn("warning:", w);
  if (notices.length) console.log("notices:", notices.length, "(first:", notices.slice(0, 3).join(" | ") + ")");

  // ---- data sanity (the gate re-checks the same things on the finished page) ----
  const knownTypes = new Set(ALL_TYPES);
  for (const n of nodes) if (!knownTypes.has(n.type)) throw new Error("unknown type " + n.type + " for " + n.id);
  const ids = new Set(nodes.map((n) => n.id));
  if (ids.size !== nodes.length) throw new Error("duplicate ids");
  const nb = new Map<string, Set<string>>(nodes.map((n) => [n.id, new Set()]));
  const seen = new Set<string>();
  for (const l of links) {
    if (!ids.has(l.source) || !ids.has(l.target)) throw new Error("dangling link " + l.source + " -> " + l.target);
    if (l.source === l.target) throw new Error("self link " + l.source);
    const k = [l.source, l.target].sort().join("\u0000");
    if (seen.has(k)) throw new Error("duplicate undirected pair " + k);
    seen.add(k);
    nb.get(l.source)!.add(l.target);
    nb.get(l.target)!.add(l.source);
  }
  for (const n of nodes) if (n.degree !== nb.get(n.id)!.size) throw new Error("degree mismatch " + n.id);
  const weightSum = links.reduce((a, l) => a + l.weight, 0);
  if (weightSum !== stats.occurrences - stats.unresolved - stats.selfLinks) throw new Error("weight sum != resolved mention count");

  const typeCounts: Record<string, number> = {};
  for (const t of Object.values(DIR_TYPE)) typeCounts[t] = nodes.filter((n) => n.type === t).length;
  const others = nodes.filter((n) => n.type === OTHER).length;
  if (others > 0) typeCounts[OTHER] = others; // listed only when there is one, like its legend chip
  const meta = {
    vault: "brain",
    generated: new Date().toISOString().slice(0, 10),
    notes: nodes.length,
    links: links.length,
    mentions: weightSum,
    types: typeCounts,
  };

  // ---- serialise: one node / link per line so the file stays greppable ----
  const esc = (s: string) =>
    s.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  const out: string[] = [];
  out.push('{"meta":' + JSON.stringify(meta) + ",");
  out.push('"nodes":[');
  nodes.forEach((n, i) => out.push(JSON.stringify(n) + (i < nodes.length - 1 ? "," : "")));
  out.push("],");
  out.push('"links":[');
  links.forEach((l, i) => out.push(JSON.stringify(l) + (i < links.length - 1 ? "," : "")));
  out.push("]}");
  const json = esc(out.join("\n"));
  JSON.parse(json); // must round-trip

  // ---- assemble ----
  const DARK = [
    "color-scheme: dark;",
    "--page: #0d0d0d;",
    "--surface: #1a1a19;",
    "--ink: #ffffff;",
    "--ink-2: #c3c2b7;",
    "--muted: #898781;",
    "--grid: #2c2c2a;",
    "--axis: #383835;",
    "--hair: rgba(255, 255, 255, 0.1);",
    "--wash: rgba(255, 255, 255, 0.07);",
    "--wash-2: rgba(255, 255, 255, 0.13);",
    "--edge: #c3c2b7;",
    "--edge-o: 0.24;",
    "--edge-hl: #ffffff;",
    "--shadow: 0 10px 30px rgba(0, 0, 0, 0.55), 0 1px 3px rgba(0, 0, 0, 0.5);",
  ]
    .map((l) => "    " + l)
    .join("\n");

  const css = readFileSync(join(GRAPH_DIR, "style.css"), "utf8").replaceAll("/*__DARK_TOKENS__*/", DARK);
  const js = readFileSync(join(GRAPH_DIR, "app.js"), "utf8");
  if (/<\/script/i.test(js)) throw new Error("app.js contains a closing script tag");
  if (/<\/style/i.test(css)) throw new Error("style.css contains a closing style tag");

  let html = readFileSync(join(GRAPH_DIR, "template.html"), "utf8");
  for (const ph of ["/*__STYLE__*/", "/*__DATA__*/", "/*__SCRIPT__*/"]) if (!html.includes(ph)) throw new Error("template placeholder missing " + ph);
  html = html.replace("/*__STYLE__*/", () => css.trimEnd()).replace("/*__DATA__*/", () => json).replace("/*__SCRIPT__*/", () => js.trimEnd());
  html = html.replace(/\r\n/g, "\n");

  // ---- CSP: pin every inline script by hash instead of allowing 'unsafe-inline' ----
  // The page has exactly two executable inline scripts: the theme bootstrap in <head> and the app. The browser hashes
  // the element's text exactly as it appears between the tags, so hash the final bytes. SHA-384 is used on purpose:
  // the output must never contain the string "sha256" (that is reserved for the vault's source hashes, which stay out).
  // (The JSON data block is type="application/json": it is data, not executed, so CSP does not apply to it.)
  const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (inlineScripts.length !== 2) throw new Error("expected exactly 2 inline <script> blocks, found " + inlineScripts.length);
  if ((html.match(/__SCRIPT_HASHES__/g) ?? []).length !== 1) throw new Error("CSP hash placeholder must appear exactly once");
  const scriptHashes = inlineScripts.map((s) => "'sha384-" + createHash("sha384").update(s, "utf8").digest("base64") + "'");
  html = html.replace("__SCRIPT_HASHES__", () => scriptHashes.join(" "));

  // ---- structural guards for the dark-by-default theme ----
  if (!/^<!doctype html>\n<html lang="en" data-theme="dark">/i.test(html)) throw new Error('<html> must ship data-theme="dark"');
  const bootAt = html.indexOf("<script>");
  if (bootAt < 0 || bootAt > html.indexOf("<style>")) throw new Error("theme bootstrap script must come before the <style> block");
  if (!html.slice(bootAt, html.indexOf("</script>", bootAt)).includes("getItem")) throw new Error("first inline script is not the theme bootstrap");
  const scriptSrc = scriptSrcOf(html);
  if (/unsafe-inline|unsafe-eval/.test(scriptSrc)) throw new Error("script-src must not allow unsafe-inline/unsafe-eval: " + scriptSrc);
  for (const h of scriptHashes) if (!scriptSrc.includes(h)) throw new Error("CSP script-src is missing " + h);
  if (!/:root\[data-theme="dark"\]\s*\{[^}]*--surface:\s*#1a1a19/.test(html)) throw new Error('dark token set missing under :root[data-theme="dark"]');
  if (!/:root,\s*:root\[data-theme="light"\]\s*\{[^}]*--surface:\s*#fcfcfb/.test(html)) throw new Error('light token set missing under :root[data-theme="light"]');
  if (!/--t-other:\s*#[0-9a-fA-F]{6}/.test(html)) throw new Error('the "other" type colour token is missing');
  if (!/<button id="theme"/.test(html)) throw new Error("theme toggle button missing");

  // ---- publish: temp file next to the output -> gate on what is on disk -> rename over the live page ----
  sweepStaleTemps(OUT);
  const tmp = OUT + ".tmp-" + process.pid;
  try {
    writeFileSync(tmp, html, { encoding: "utf8" });
    const onDisk = readFileSync(tmp, "utf8");
    if (onDisk !== html) throw new Error("the temporary file does not read back identically");
    const g = gate(onDisk);
    if (!g.ok) throw new GateFailure("privacy/integrity gate failed: " + g.failures.join("; "), g.where);
    replaceFile(tmp, OUT);
  } catch (e) {
    try {
      unlinkSync(tmp);
    } catch {
      /* already gone */
    }
    throw e;
  }

  const bytes = statSync(OUT).size;
  console.log("wrote", OUT, bytes, "bytes");
  console.log("notes", nodes.length, "links", links.length, "mentions", weightSum);
  console.log("types", JSON.stringify(typeCounts));
  console.log("urls in file:", JSON.stringify(pageUrls(html)));
  console.log("CSP script-src:", scriptSrc.replace(/sha384-[A-Za-z0-9+/=]+/g, (m) => m.slice(0, 14) + "..."));
  return {
    ok: true as const,
    out: OUT,
    bytes,
    notes: nodes.length,
    links: links.length,
    mentions: weightSum,
    types: typeCounts,
    warnings: warnings.slice(0, 50),
    notices: notices.length,
    ms: Math.round(performance.now() - started),
  };
}

let result: Record<string, unknown>;
try {
  result = build();
} catch (e) {
  const reason = oneLine((e as Error)?.message ?? e, 600);
  console.error("BUILD FAILED, the previous page was left in place:", reason);
  if (e instanceof GateFailure) for (const w of e.where) console.error("  where:", w);
  result = { ok: false, reason, where: e instanceof GateFailure ? e.where : [], ms: Math.round(performance.now() - started) };
}
console.log("BUILD_RESULT " + JSON.stringify(result));
process.exit(result.ok ? 0 : 1);
