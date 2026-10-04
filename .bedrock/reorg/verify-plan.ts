// READ-ONLY gate for the split tables in .bedrock/reorg/plan.md (plan A.8; the G-split gate of section 11.2), generalised
// from the planner's prototype: every default path is relative to the vault this file lives in (or --vault), so nothing
// is tied to a drive letter or a user name.
//   bun .bedrock/reorg/verify-plan.ts [--plan <plan.md>] [--vault <dir>] [--fingerprints <file>] [--only <A1,B9,...>]
//                                     [--json <file>] [--s1] [--s1-cross] [--positional]
// The split tables are those of section 3.2 plus any appended "Amendments" tables in the same "**<id> `<path>`**" format;
// the latest table per note id wins, so an amendment replaces the original instead of being read twice. A project's
// "## Map" (with its demoted "### Related *" sections) is part of the summary layer the hub keeps.
// For every split note:
//   - every ## section (and every ### child of a ## that the table cuts at ### level) is kept by the hub or moved by
//     exactly one part (the hub keeps the template summary layer, everything before the first ##, and the sections the
//     note's description line names in backticks; a backticked `### x` there keeps that child in the hub);
//   - exact part and hub sizes from the current bytes (+1.3 KB part overhead); parts and hubs at or over 45 KB are
//     warned, at or over 50 KB fail;
//   - the note's sha256 and its ## / ### heading list; with --fingerprints <file> ("<sha12> <bytes> <rel>" per line) it
//     reports which notes changed since the plan was written (the pre-split gate);
//   - --s1: every line holding an S1 governing marker (correction, newest wins, superseded, supersedes, READ BEFORE,
//     contradiction, RESOLVED, "do not use", "replaced by") with its file line, section and destination (hub or part);
//   - --s1-cross: every struck (~~...~~) hub claim whose distinctive tokens (backticked names, long quotes, decimals,
//     amounts) recur in a part line that is not marked in place: candidates for the S1 sign-off, not verdicts;
//   - --positional: every line holding a positional trigger (above, below, earlier, later, previous, following, "the
//     table", "this section", ...) with its destination, plus "(see ...)" section-name references, for the S10 review;
//   - totals: parts per batch and overall, compared with the "Totals:" line of the plan; slug duplicates and clashes.
// Exit 1 on any coverage problem, size refusal or total mismatch. Writes nothing unless --json is given.
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { listNotes, splitFrontmatter } from "../graph/extract.ts";

const argv = process.argv.slice(2);
const VALUE_FLAGS = ["--plan", "--vault", "--fingerprints", "--only", "--json"];
const BOOL_FLAGS = ["--s1", "--s1-cross", "--positional", "--help", "-h"];
const USAGE = "usage: bun .bedrock/reorg/verify-plan.ts [--plan <plan.md>] [--vault <dir>] [--fingerprints <file>] [--only <A1,B9,...>] [--json <file>] [--s1] [--s1-cross] [--positional]";
for (let i = 0; i < argv.length; i++) {
  if (VALUE_FLAGS.includes(argv[i])) {
    if (i + 1 >= argv.length || argv[i + 1].startsWith("--")) { console.error(`verify-plan.ts: ${argv[i]} needs a value\n${USAGE}`); process.exit(1); }
    i++;
  } else if (!BOOL_FLAGS.includes(argv[i])) { console.error(`verify-plan.ts: unknown argument ${argv[i]}\n${USAGE}`); process.exit(1); }
}
if (argv.includes("--help") || argv.includes("-h")) { console.log(USAGE); process.exit(0); }
const arg = (n: string) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const V = resolve(arg("--vault") ?? resolve(import.meta.dir, "..", "..")).replace(/\\/g, "/").replace(/\/?$/, "/");
for (const f of ["--plan", "--fingerprints"]) if (arg(f) && !existsSync(arg(f)!)) { console.error(`verify-plan.ts: ${f} ${arg(f)} does not exist`); process.exit(1); }
const PLAN = arg("--plan") ?? V + ".bedrock/reorg/plan.md";
const only = arg("--only")?.split(",");
const wantS1 = argv.includes("--s1");
const wantPos = argv.includes("--positional");
const wantCross = argv.includes("--s1-cross");
const plan = readFileSync(PLAN, "utf8").replace(/\r\n/g, "\n");
const enc = new TextEncoder();
const B = (s: string) => enc.encode(s).length;
const KB = 1024;
const norm = (s: string) => s.replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, "$2").replace(/`/g, "").replace(/\s+/g, " ").trim().toLowerCase();
const fingerprints = new Map<string, string>();
if (arg("--fingerprints")) for (const l of readFileSync(arg("--fingerprints")!, "utf8").split(/\r?\n/)) { const [sha, , rel] = l.trim().split(/\s+/); if (rel) fingerprints.set(rel, sha); }
// the coordinator's markers: RESOLVED only in capitals (lower-case "resolved" is ordinary prose), the rest in any case
const S1_RE = /\bRESOLVED\b/;
const S1_RE_CI = /\bcorrections?\b|newest[- ]wins|\bsuperseded\b|\bsupersedes\b|\bread before\b|\bcontradictions?\b|\bdo not use\b|\breplaced by\b/i;
const SEE_RE = /\(see (?!above|below|earlier|later)[^)]{3,60}\)/i;
const POS_RE = /\b(above|below|earlier|later|previous(ly)?|following|preceding|aforementioned)\b|\bthe (table|list|section|sub-?section)\b|\bthis (section|table|list)\b|\bsee (the )?(next|last)\b/i;

const SUMMARY: Record<string, RegExp> = {
  topic: /^(context|people involved|actors involved|related .*|history|decisions|next steps)$/i,
  actor: /^(details|dependencies|flows|dev commands|known issues|related .*|discussions)$/i,
  project: /^(overview|status|action items|blockers|focal points|map|related .*|discussions|where knowledge lives \(index\)|open items from audits \(consolidated\))$/i,
};

type Child = { text: string; start: number; end: number; l0: number; l1: number };
type Sec = { text: string; start: number; end: number; own: number; l0: number; ownEnd: number; l1: number; children: Child[] };
function sections(body: string) {
  const lines = body.split("\n");
  const offs: number[] = [];
  let off = 0, fence = false;
  const heads: { level: number; text: string; line: number }[] = [];
  lines.forEach((l, i) => {
    offs.push(off);
    if (/^\s*(```|~~~)/.test(l)) fence = !fence;
    const m = !fence && l.match(/^(#{1,6})\s+(.*)$/);
    if (m) heads.push({ level: m[1].length, text: m[2].trim(), line: i });
    off += B(l) + 1;
  });
  offs.push(off);
  const secs: Sec[] = [];
  for (let k = 0; k < heads.length; k++) {
    if (heads[k].level !== 2) continue;
    let j = k + 1;
    while (j < heads.length && heads[j].level > 2) j++;
    const endLine = j < heads.length ? heads[j].line : lines.length;
    const firstChild = heads.slice(k + 1, j).find((x) => x.level === 3);
    const ownEnd = firstChild ? firstChild.line : endLine;
    const s: Sec = { text: heads[k].text, start: offs[heads[k].line], end: offs[endLine], own: offs[ownEnd] - offs[heads[k].line], l0: heads[k].line, ownEnd, l1: endLine, children: [] };
    for (let c = k + 1; c < j; c++) {
      if (heads[c].level !== 3) continue;
      let e = c + 1;
      while (e < j && heads[e].level > 3) e++;
      const ce = e < j ? heads[e].line : endLine;
      s.children.push({ text: heads[c].text, start: offs[heads[c].line], end: offs[ce], l0: heads[c].line, l1: ce });
    }
    secs.push(s);
  }
  const firstH2 = heads.find((h) => h.level === 2);
  return { lines, secs, preBytes: firstH2 ? offs[firstH2.line] : off, preLines: firstH2 ? firstH2.line : lines.length, headings: heads.filter((h) => h.level <= 3).map((h) => "#".repeat(h.level) + " " + h.text) };
}

const blockRe = /\*\*([ABC]\d+) `([^`]+)`\*\*([^\n]*)\n([\s\S]*?)(?=\n\*\*[ABC]\d+ `|\n#### |\nTotals:|\n## |$(?![\s\S]))/g;
let m: RegExpExecArray | null;
const perBatch: Record<string, number> = {};
let totalParts = 0, topicParts = 0, actorParts = 0;
const allSlugs = new Set(listNotes(V.replace(/\/$/, "")).map((n) => n.slug));
const newSlugs: string[] = [];
const problems: string[] = [];
const warnings: string[] = [];
const rows: string[] = [];
const s1out: string[] = [];
const posout: string[] = [];
const crossOut: string[] = [];
const seeout: string[] = [];
const json: any[] = [];
const latest = new Map<string, RegExpExecArray>();
while ((m = blockRe.exec(plan))) latest.set(m[1], m); // a later block with the same id (an amendment) wins; order of first appearance kept
for (const mm of latest.values()) {
  const [, id, rel, headLine, rest] = mm;
  if (only && !only.includes(id)) continue;
  const path = V + rel + ".md";
  if (!existsSync(path)) { problems.push(`${id}: missing note ${rel}`); continue; }
  const rawBytes = readFileSync(path);
  const sha12 = createHash("sha256").update(rawBytes).digest("hex").slice(0, 12);
  const raw = rawBytes.toString("utf8");
  const { body } = splitFrontmatter(raw);
  const fmLineCount = raw.replace(/\r\n/g, "\n").split("\n").length - body.replace(/\r\n/g, "\n").split("\n").length;
  const fmBytes = rawBytes.length - B(body);
  const type = rel.startsWith("actors/") ? "actor" : rel.startsWith("projects/") ? "project" : "topic";
  const { lines, secs, preBytes, preLines, headings } = sections(body.replace(/\r\n/g, "\n"));
  const pre = rest.split("\n| ")[0] + headLine;
  const keptExtra = [...pre.matchAll(/`##\s+([^`]+)`/g)].map((x) => norm(x[1]));
  const keptChildren = [...pre.matchAll(/`###\s+([^`]+)`/g)].map((x) => norm(x[1]));
  const tableRows = rest.split("\n").filter((l) => l.startsWith("| ") && !/^\| (Suffix|Full slug)/.test(l) && !l.startsWith("|---"));
  const assigned = new Map<string, string[]>();
  const partBytes: Record<string, number> = {};
  const parent = rel.split("/").pop()!;
  const batch = id[0];
  for (const r of tableRows) {
    const cells = r.split(" | ");
    const suffix = cells[0].replace(/^\|\s*/, "").replace(/`/g, "").trim();
    const slug = suffix.startsWith("-") ? parent + suffix : suffix;
    newSlugs.push(slug);
    totalParts++;
    perBatch[batch] = (perBatch[batch] ?? 0) + 1;
    if (rel.startsWith("actors/")) actorParts++; else topicParts++;
    partBytes[slug] = 0;
    const toks = [...(cells[2] ?? "").matchAll(/`(#{2,3})\s+([^`]+)`|(\.\.\.)|(own text)/g)];
    for (let t = 0; t < toks.length; t++) {
      const tk = toks[t];
      if (tk[3] || tk[4]) continue;
      const want = norm(tk[2]);
      if (tk[1].length === 2) {
        const hits = secs.filter((s) => norm(s.text).startsWith(want));
        if (hits.length !== 1) { problems.push(`${id} ${slug}: "## ${tk[2]}" matched ${hits.length} sections`); continue; }
        const s = hits[0];
        const next = toks[t + 1];
        const partial = next && (next[4] || (next[1] && next[1].length === 3));
        const key = (partial ? "2own|" : "2|") + norm(s.text);
        assigned.set(key, [...(assigned.get(key) ?? []), slug]);
        partBytes[slug] += partial ? s.own : s.end - s.start;
      } else {
        const owners = secs.filter((s) => s.children.some((c) => norm(c.text).startsWith(want)));
        if (owners.length !== 1) { problems.push(`${id} ${slug}: "### ${tk[2]}" matched ${owners.length} parents`); continue; }
        const owner = owners[0];
        const idx = owner.children.findIndex((c) => norm(c.text).startsWith(want));
        let endIdx = idx;
        if (toks[t + 1]?.[3]) {
          const endWant = norm(toks[t + 2][2]);
          endIdx = owner.children.findIndex((c) => norm(c.text).startsWith(endWant));
          if (endIdx < idx) problems.push(`${id} ${slug}: bad range ${tk[2]} .. ${toks[t + 2][2]}`);
          t += 2;
        }
        for (let c = idx; c <= endIdx; c++) {
          const key = "3|" + norm(owner.text) + "|" + norm(owner.children[c].text);
          assigned.set(key, [...(assigned.get(key) ?? []), slug]);
          partBytes[slug] += owner.children[c].end - owner.children[c].start;
        }
      }
    }
  }
  // destination of every body line
  const dest: string[] = new Array(lines.length).fill("hub");
  const setDest = (a: number, b: number, d: string) => { for (let i = a; i < b; i++) dest[i] = d; };
  let hubBytes = fmBytes + preBytes;
  const isKept = (s: Sec) => SUMMARY[type].test(s.text.trim()) || keptExtra.some((k) => norm(s.text).startsWith(k));
  for (const s of secs) {
    const whole = assigned.get("2|" + norm(s.text)) ?? [];
    const own = assigned.get("2own|" + norm(s.text)) ?? [];
    const kids = s.children.map((c) => assigned.get("3|" + norm(s.text) + "|" + norm(c.text)) ?? []);
    const kidsAssigned = kids.filter((k) => k.length).length;
    if (whole.length > 1) problems.push(`${id}: "## ${s.text}" moved by ${whole.join(", ")}`);
    if (whole.length === 1) { if (isKept(s)) problems.push(`${id}: "## ${s.text}" is both kept and moved`); setDest(s.l0, s.l1, whole[0]); continue; }
    if (own.length || kidsAssigned) {
      if (isKept(s)) { hubBytes += s.own; if (own.length) problems.push(`${id}: own text of kept "## ${s.text}" also moved`); }
      else if (own.length !== 1) problems.push(`${id}: own text of "## ${s.text}" assigned ${own.length}x`);
      else setDest(s.l0, s.ownEnd, own[0]);
      kids.forEach((k, i) => {
        const c = s.children[i];
        if (k.length > 1) problems.push(`${id}: "### ${c.text}" assigned ${k.length}x`);
        if (k.length === 1) setDest(c.l0, c.l1, k[0]);
        if (k.length === 0) {
          if (keptChildren.some((kc) => norm(c.text).startsWith(kc))) hubBytes += c.end - c.start;
          else problems.push(`${id}: "### ${c.text}" neither kept nor moved`);
        }
      });
      continue;
    }
    if (isKept(s)) { hubBytes += s.end - s.start; continue; }
    problems.push(`${id}: "## ${s.text.slice(0, 70)}" neither kept nor moved`);
  }
  for (const [slug, b] of Object.entries(partBytes)) {
    const kb = (b + 1300) / KB;
    if (kb >= 50) problems.push(`${id} ${slug}: ${kb.toFixed(1)} KB is at or over the 50 KB limit`);
    else if (kb >= 45) warnings.push(`${id} ${slug}: ${kb.toFixed(1)} KB is over the 45 KB part target`);
  }
  const hubKB = (hubBytes + 150 * Object.keys(partBytes).length) / KB;
  if (hubKB >= 50) problems.push(`${id} hub: ${hubKB.toFixed(1)} KB (with its Parts list) is at or over 50 KB`);
  else if (hubKB >= 45) warnings.push(`${id} hub: ${hubKB.toFixed(1)} KB is over 45 KB`);
  // section label of a body line
  const where = (i: number) => {
    const s = secs.find((x) => i >= x.l0 && i < x.l1);
    if (!s) return "(preamble)";
    const c = s.children.find((x) => i >= x.l0 && i < x.l1);
    return "## " + s.text.slice(0, 48) + (c ? " > ### " + c.text.slice(0, 40) : "");
  };
  const shortDest = (d: string) => (d === "hub" ? "HUB" : d.startsWith(parent) ? d.slice(parent.length) : d);
  if (wantS1 || wantPos) {
    let fence = false;
    lines.forEach((l, i) => {
      if (/^\s*(```|~~~)/.test(l)) fence = !fence;
      const fileLine = i + 1 + fmLineCount;
      if (wantS1 && (S1_RE.test(l) || S1_RE_CI.test(l))) s1out.push(`${id.padEnd(4)} L${String(fileLine).padEnd(4)} ${shortDest(dest[i]).padEnd(40)} ${where(i).padEnd(95)} | ${l.trim().slice(0, 150)}`);
      if (wantPos && SEE_RE.test(l) && !POS_RE.test(l)) seeout.push(`${id.padEnd(4)} L${String(fileLine).padEnd(4)} ${shortDest(dest[i]).padEnd(40)} | ${l.trim().slice(0, 160)}`);
      if (wantPos && POS_RE.test(l)) posout.push(`${id.padEnd(4)} L${String(fileLine).padEnd(4)} ${shortDest(dest[i]).padEnd(40)} | ${l.trim().slice(0, 160)}`);
    });
  }
  if (wantCross) {
    // S1 cross check (decision 11): every struck claim kept in the hub vs unmarked occurrences of its distinctive tokens in
    // parts. A hit is a candidate governed statement for the executor's sign-off, not a verdict.
    const MARKED = /~~|superseded|supersedes|corrected|correction|history|prior|reverted|retracted|withdrawn|overturned|stale|was wrong|no longer/i;
    lines.forEach((l, i) => {
      if (dest[i] !== "hub" || !l.includes("~~")) return;
      const struck = [...l.matchAll(/~~(.+?)~~/g)].map((x) => x[1]);
      const toks = new Set<string>();
      for (const s of struck) {
        for (const t of s.matchAll(/`([^`]{4,})`/g)) toks.add(t[1]);
        for (const t of s.matchAll(/"([^"]{12,})"/g)) toks.add(t[1]);
        for (const t of s.matchAll(/(?<![\w.])(\$?\d[\d,]*\.\d+%?|\$\d[\d,.]*[kKmM]?|\d{2,}(?:\.\d+)?%|\d{3,}(?:,\d{3})+)(?![\w])/g)) toks.add(t[1]);
      }
      if (!toks.size) return;
      const fileLine = i + 1 + fmLineCount;
      lines.forEach((m, j) => {
        if (dest[j] === "hub") return;
        const hit = [...toks].filter((t) => m.includes(t));
        if (!hit.length || MARKED.test(m)) return;
        crossOut.push(`${id.padEnd(4)} hub L${fileLine} -> ${shortDest(dest[j])} L${j + 1 + fmLineCount} [${hit.join(" | ").slice(0, 60)}] | ${m.trim().slice(0, 110)}`);
      });
    });
  }
  const fp = fingerprints.get(rel);
  const changed = fp ? (fp === sha12 ? "unchanged" : "CHANGED") : "-";
  rows.push(`${id.padEnd(4)} ${rel.padEnd(68)} ${sha12} ${changed.padEnd(9)} ${(rawBytes.length / KB).toFixed(1).padStart(6)} KB -> hub ${(hubBytes / KB).toFixed(1).padStart(5)} KB | ${Object.keys(partBytes).length} parts: ` + Object.entries(partBytes).map(([s, b]) => `${s.startsWith(parent) ? s.slice(parent.length) : s}=${((b + 1300) / KB).toFixed(1)}`).join(" "));
  json.push({ id, rel, sha12, changed, bytes: rawBytes.length, hubBytes, headings, parts: partBytes });
}
console.log(rows.join("\n"));
const stated = plan.match(/Totals:[^\n]*?\*\*(\d+) parts\*\*/);
console.log(`\nparts: ${totalParts} (A ${perBatch.A ?? 0}, B ${perBatch.B ?? 0}, C ${perBatch.C ?? 0}; topic-folder parts incl. project parts ${topicParts}, actor parts ${actorParts})` + (stated ? `; plan states ${stated[1]}` : ""));
if (!only && stated && +stated[1] !== totalParts) problems.push(`Totals line says ${stated[1]} parts, tables hold ${totalParts}`);
const dup = newSlugs.filter((s, i) => newSlugs.indexOf(s) !== i);
const clash = newSlugs.filter((s) => allSlugs.has(s));
console.log(`new slugs: ${newSlugs.length}, duplicates: ${dup.length ? dup.join(",") : 0}, clashes with existing notes: ${clash.length ? clash.join(",") : 0}`);
if (dup.length || clash.length) problems.push("slug duplicates or clashes");
if (fingerprints.size) console.log(`changed since the plan's fingerprints: ${json.filter((j) => j.changed === "CHANGED").map((j) => j.id).join(", ") || "none"}`);
if (wantS1) {
  // per-note HUB/PART counts (marker lines that stay in the hub vs move to a part), for the S1 sign-off (decision 11)
  const cnt = new Map<string, { hub: number; part: number }>();
  for (const l of s1out) {
    const [id, , d] = l.split(/\s+/);
    const c = cnt.get(id) ?? { hub: 0, part: 0 };
    if (d === "HUB") c.hub++; else c.part++;
    cnt.set(id, c);
  }
  const noPointer = [...cnt].filter(([, c]) => c.hub === 0).map(([id]) => id);
  console.log(`\nS1 marker lines (${s1out.length}); HUB/PART per note: ` + [...cnt].map(([id, c]) => `${id} ${c.hub}/${c.part}`).join(", ") + `; notes with no HUB marker line: ${noPointer.join(", ") || "none"}\n` + s1out.join("\n"));
}
if (wantPos) console.log(`\npositional trigger lines (${posout.length}):\n` + posout.join("\n") + `\n\nsection-name references "(see ...)" without a positional word (${seeout.length}):\n` + seeout.join("\n"));
if (wantCross) console.log(`\nS1 cross candidates: struck hub claims with unmarked token hits in parts (${crossOut.length}):\n` + crossOut.join("\n"));
if (arg("--json")) writeFileSync(arg("--json")!, JSON.stringify(json, null, 1));
if (warnings.length) console.log(`\nwarnings (${warnings.length}):\n` + warnings.join("\n"));
console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n` + problems.join("\n") : "\nno problems");
process.exit(problems.length ? 1 : 0);
