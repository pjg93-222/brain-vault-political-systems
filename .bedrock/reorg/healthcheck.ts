// READ-ONLY port of the Bedrock /bedrock:healthcheck skill (plugin skills/healthcheck/SKILL.md) for the Phase 2
// reorganisation (plan A.4): vault resolution, the Phase 1 scan and checks 1-5, with the vault's own rules on top.
// It writes nothing but --json.
//
//   bun .bedrock/reorg/healthcheck.ts [--strict] [--date YYYY-MM-DD] [--vault <dir|name>] [--plugin <dir>] [--json <file>]
//
//   --vault    a vault directory, or a vault name from the plugin registry (vaults.json). Without it the skill's order
//              applies: the registered vault that contains the current directory, then the registry's default vault,
//              then (no usable registry) the vault this file lives in
//   --plugin   the Bedrock plugin directory (entity definitions, manifest, registry); default $BEDROCK_PLUGIN_DIR, else the
//              newest ~/.claude/plugins/cache/*/bedrock/<version> holding .claude-plugin/plugin.json
//   --date     the local calendar date for check 5 (default: today)
//   --strict   exit 1 on any curated orphan, any curated dangling note or any setup issue
//
// The checks follow the skill: 1 graphify-out, 2 setup (entity folders, their _template.md, the plugin's entity
// definitions and manifest), 3 orphans (no inbound wikilink from another entity; a wikilink to one of an entity's aliases,
// in slug form, counts), 4 dangling (an orphan with no outbound wikilink and no frontmatter relation), 5 old content
// (updated_at more than 15 days before --date). Wikilinks are bare names, as the skill parses them.
// This vault's rules on top (Owner decisions 1, 3, 10 and 14):
//   - fleeting notes (fleeting/) are reported in their own block: a fleeting orphan, a fleeting dangling note or a broken
//     link in a fleeting note never fails and never blocks STOP; captures are never edited;
//   - an inbound link from a fleeting note never rescues a curated note from orphan status;
//   - graphify-out is not used by this vault (its graph is .bedrock/graph + brain-graph.html): check 1 is reported only;
//   - old content (check 5) is reported, never failed.
// "Clean" (the gate): setup OK, 0 orphans and 0 dangling notes among curated notes.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";

const THIS_VAULT = resolve(import.meta.dir, "..", "..");
const DIRS = ["actors", "people", "teams", "concepts", "topics", "discussions", "projects", "fleeting"];
const ENTITY_DEFS = ["actor.md", "person.md", "team.md", "concept.md", "topic.md", "discussion.md", "project.md", "fleeting.md"];
const OLD_DAYS = 15;
const STALE_GRAPH_DAYS = 30;
const SYSTEM_TARGETS = new Set(["index", "log", "claude"]);
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

// ---------------------------------------------------------------------------------------------------------------------
// plugin and vault resolution

function newestPlugin(): string | null {
  const env = process.env.BEDROCK_PLUGIN_DIR;
  if (env) return resolve(env);
  const cache = join(homedir(), ".claude", "plugins", "cache");
  const found: { dir: string; version: number[] }[] = [];
  try {
    for (const market of readdirSync(cache)) {
      const b = join(cache, market, "bedrock");
      if (!existsSync(b)) continue;
      for (const ver of readdirSync(b)) {
        const dir = join(b, ver);
        if (existsSync(join(dir, ".claude-plugin", "plugin.json"))) found.push({ dir, version: ver.split(/[.-]/).map((x) => Number(x) || 0) });
      }
    }
  } catch {
    return null;
  }
  found.sort((x, y) => {
    for (let i = 0; i < Math.max(x.version.length, y.version.length); i++) if ((x.version[i] ?? 0) !== (y.version[i] ?? 0)) return (y.version[i] ?? 0) - (x.version[i] ?? 0);
    return cmp(x.dir, y.dir);
  });
  return found[0]?.dir ?? null;
}

type Registry = { vaults: { name: string; path: string; default?: boolean }[] };
function readRegistry(plugin: string | null): Registry | null {
  if (!plugin) return null;
  try {
    const r = JSON.parse(readFileSync(join(plugin, "vaults.json"), "utf8"));
    return r && Array.isArray(r.vaults) ? r : null;
  } catch {
    return null;
  }
}
const normPath = (p: string) => resolve(p).replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();

export function resolveVault(arg: string | null, plugin: string | null, cwd = process.cwd()): { vault: string; how: string } {
  const reg = readRegistry(plugin);
  if (arg) {
    if (existsSync(arg) && statSync(arg).isDirectory()) return { vault: resolve(arg), how: "--vault <dir>" };
    const hit = reg?.vaults.find((v) => v.name === arg);
    if (!hit) throw new Error(`Vault \`${arg}\` is neither a directory nor registered in the plugin's vaults.json.`);
    return { vault: resolve(hit.path), how: `--vault ${arg} (registry)` };
  }
  if (reg) {
    const c = normPath(cwd);
    const inside = reg.vaults.filter((v) => c === normPath(v.path) || c.startsWith(normPath(v.path) + "/")).sort((x, y) => normPath(y.path).length - normPath(x.path).length);
    if (inside.length) return { vault: resolve(inside[0].path), how: `current directory is inside registered vault "${inside[0].name}"` };
    const def = reg.vaults.find((v) => v.default);
    if (def) return { vault: resolve(def.path), how: `registry default vault "${def.name}"` };
  }
  return { vault: THIS_VAULT, how: "the vault this tool lives in (no usable plugin registry)" };
}

// ---------------------------------------------------------------------------------------------------------------------
// Phase 1: scan

type Ent = {
  id: string; // dir/slug
  slug: string;
  dir: string;
  fleeting: boolean;
  aliases: string[];
  updatedAt: string | null;
  outbound: Set<string>;
  hasFmRelations: boolean;
  fmOk: boolean;
};
const WL = /\[\[([^\]]+)\]\]/g;
const bare = (t: string) => t.split("|")[0].split("#")[0].trim();
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function enumerate(vault: string) {
  const files: { dir: string; abs: string; file: string }[] = [];
  const missingDirs: string[] = [];
  const missingTemplates: string[] = [];
  const isEntity = (name: string) => name.endsWith(".md") && !name.startsWith(".") && name !== "_template.md" && name !== "_template_node.md";
  for (const d of DIRS) {
    const abs = join(vault, d);
    if (!existsSync(abs) || !statSync(abs).isDirectory()) {
      missingDirs.push(d);
      continue;
    }
    if (!existsSync(join(abs, "_template.md"))) missingTemplates.push(d);
    for (const e of readdirSync(abs, { withFileTypes: true })) {
      if (e.isFile() && isEntity(e.name)) files.push({ dir: d, abs: join(abs, e.name), file: e.name });
      // actors may also be folder entities: actors/<x>/*.md and code entities actors/<x>/nodes/*.md
      if (d === "actors" && e.isDirectory() && !e.name.startsWith(".")) {
        const sub = join(abs, e.name);
        for (const f of readdirSync(sub, { withFileTypes: true })) {
          if (f.isFile() && isEntity(f.name)) files.push({ dir: d, abs: join(sub, f.name), file: f.name });
          if (f.isDirectory() && f.name === "nodes") for (const g of readdirSync(join(sub, f.name), { withFileTypes: true })) if (g.isFile() && isEntity(g.name)) files.push({ dir: d, abs: join(sub, f.name, g.name), file: g.name });
        }
      }
    }
  }
  return { files, missingDirs, missingTemplates };
}

function readEntities(files: { dir: string; abs: string; file: string }[]) {
  const ents: Ent[] = [];
  const readErrors: string[] = [];
  for (const f of files) {
    let raw: string;
    try {
      raw = readFileSync(f.abs, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
    } catch {
      readErrors.push(f.dir + "/" + f.file);
      continue;
    }
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    let y: Record<string, unknown> = {};
    let fmOk = !m; // no frontmatter at all: nothing to parse
    let body = raw;
    if (m) {
      body = m[2];
      try {
        const p: unknown = Bun.YAML.parse(m[1]);
        if (p == null || (typeof p === "object" && !Array.isArray(p))) {
          y = (p ?? {}) as Record<string, unknown>;
          fmOk = true;
        }
      } catch {
        fmOk = false;
      }
    }
    const slug = f.file.replace(/\.md$/, "");
    const outbound = new Set<string>();
    let hasFm = false;
    if (fmOk)
      for (const [k, v] of Object.entries(y)) {
        if (k === "sources" || !Array.isArray(v)) continue;
        for (const item of v)
          if (typeof item === "string")
            for (const w of item.matchAll(WL)) {
              outbound.add(bare(w[1]));
              hasFm = true;
            }
      }
    for (const w of body.matchAll(WL)) outbound.add(bare(w[1]));
    const ua = y.updated_at;
    const updatedAt = ua instanceof Date && !Number.isNaN(ua.getTime()) ? ua.toISOString().slice(0, 10) : typeof ua === "string" ? ua.slice(0, 10) : typeof ua === "number" ? String(ua) : null;
    ents.push({
      id: f.dir + "/" + slug,
      slug,
      dir: f.dir,
      fleeting: f.dir === "fleeting",
      aliases: fmOk && Array.isArray(y.aliases) ? y.aliases.map(String) : [],
      updatedAt,
      outbound,
      hasFmRelations: hasFm,
      fmOk,
    });
  }
  return { ents, readErrors };
}

// ---------------------------------------------------------------------------------------------------------------------
// Phase 2: checks

export type HcOptions = { vault: string; how: string; plugin: string | null; date: string };

export function healthcheck(o: HcOptions) {
  const { vault, plugin } = o;
  const { files, missingDirs, missingTemplates } = enumerate(vault);
  const { ents, readErrors } = readEntities(files);
  const slugs = new Set(ents.map((e) => e.slug));

  // inbound: from other entities by slug, else by one of the target's aliases in slug form (the skill's alias rule)
  const inboundFrom = (e: Ent, from: Ent[]) => {
    const aliasSlugs = e.aliases.map(slugify).filter((a) => a && a !== e.slug);
    const direct: string[] = [];
    const viaAlias: { from: string; alias: string }[] = [];
    for (const o2 of from) {
      if (o2.id === e.id) continue;
      if (o2.outbound.has(e.slug)) direct.push(o2.id);
      else {
        const hit = aliasSlugs.find((a) => [...o2.outbound].some((w) => slugify(w) === a));
        if (hit) viaAlias.push({ from: o2.id, alias: hit });
      }
    }
    return { direct, viaAlias };
  };
  const curated = ents.filter((e) => !e.fleeting);
  const fleeting = ents.filter((e) => e.fleeting);

  // check 3 and 4 for curated notes: only curated inbound links count (Owner decisions 1, 10 and 14)
  const orphans: { id: string; type: string; inboundFromFleeting: number }[] = [];
  const aliasOnly: { target: string; alias: string; from: string }[] = [];
  for (const e of curated) {
    const inC = inboundFrom(e, curated);
    for (const v of inC.viaAlias) aliasOnly.push({ target: e.id, alias: v.alias, from: v.from });
    if (inC.direct.length + inC.viaAlias.length === 0) {
      const inF = inboundFrom(e, fleeting);
      orphans.push({ id: e.id, type: e.dir, inboundFromFleeting: inF.direct.length + inF.viaAlias.length });
    }
  }
  const dangling = orphans.filter((x) => {
    const e = ents.find((y) => y.id === x.id)!;
    return e.outbound.size === 0 && !e.hasFmRelations;
  });

  // the fleeting block: everything reported, nothing failing
  const fleetingItems = fleeting.map((e) => {
    const inAll = inboundFrom(e, ents);
    const inbound = inAll.direct.length + inAll.viaAlias.length;
    const broken = [...e.outbound].filter((w) => {
      const last = w.split("/").pop()!.replace(/\.md$/i, "");
      return !slugs.has(last) && !SYSTEM_TARGETS.has(last.toLowerCase());
    });
    return { id: e.id, inbound, outbound: e.outbound.size, orphan: inbound === 0, dangling: inbound === 0 && e.outbound.size === 0 && !e.hasFmRelations, brokenLinks: broken.sort(cmp) };
  });

  // check 5: old content (reported only)
  const day = (s: string) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) / 86400000;
  const old: { id: string; type: string; updated_at: string; age_days: number }[] = [];
  let noUpdated = 0;
  for (const e of ents) {
    if (!e.fmOk || !e.updatedAt || !/^\d{4}-\d{2}-\d{2}$/.test(e.updatedAt)) {
      noUpdated++;
      continue;
    }
    const age = day(o.date) - day(e.updatedAt);
    if (age > OLD_DAYS) old.push({ id: e.id, type: e.dir, updated_at: e.updatedAt, age_days: age });
  }
  old.sort((x, y) => y.age_days - x.age_days || cmp(x.id, y.id));

  // check 1: graphify-out (not used by this vault: reported only)
  const g1 = join(vault, "graphify-out");
  let graphify: { status: string; details: string; nodes: number };
  if (!existsSync(g1)) graphify = { status: "MISSING", details: "graphify-out/ not found: N/A, this vault's graph is .bedrock/graph + brain-graph.html (Owner decision 3)", nodes: 0 };
  else if (!existsSync(join(g1, "graph.json"))) graphify = { status: "MISSING", details: "graph.json not found in graphify-out/ (not used by this vault)", nodes: 0 };
  else {
    try {
      const g = JSON.parse(readFileSync(join(g1, "graph.json"), "utf8"));
      const nodes: any[] = Array.isArray(g?.nodes) ? g.nodes : [];
      const days = (Date.now() - statSync(join(g1, "graph.json")).mtimeMs) / 86400000;
      graphify = { status: days > STALE_GRAPH_DAYS ? "WARN" : "OK", details: `${nodes.length} nodes (${nodes.filter((n) => n?.file_type === "code").length} code)${days > STALE_GRAPH_DAYS ? ", stale (>30 days)" : ""}`, nodes: nodes.length };
    } catch {
      graphify = { status: "WARN", details: "graph.json exists but is not valid JSON", nodes: 0 };
    }
  }

  // check 2: setup
  let pluginManifest = "NOT FOUND";
  let missingDefs: string[] = [...ENTITY_DEFS];
  if (plugin && existsSync(plugin)) {
    missingDefs = ENTITY_DEFS.filter((f) => !existsSync(join(plugin, "entities", f)));
    try {
      JSON.parse(readFileSync(join(plugin, ".claude-plugin", "plugin.json"), "utf8"));
      pluginManifest = "VALID";
    } catch {
      pluginManifest = "INVALID";
    }
  }
  const setupIssues = [
    ...missingDirs.map((d) => `missing directory ${d}/`),
    ...missingTemplates.map((d) => `missing ${d}/_template.md`),
    ...(plugin && existsSync(plugin) ? missingDefs.map((f) => `missing entity definition ${f}`) : ["plugin directory not accessible"]),
    ...(plugin && existsSync(plugin) && pluginManifest !== "VALID" ? [`plugin manifest ${pluginManifest}`] : []),
  ];

  const count = (xs: string[]) => xs.reduce((m: Record<string, number>, k) => ((m[k] = (m[k] ?? 0) + 1), m), {});
  const clean = setupIssues.length === 0 && orphans.length === 0 && dangling.length === 0;
  return {
    tool: ".bedrock/reorg/healthcheck.ts",
    date: o.date,
    vault,
    resolvedBy: o.how,
    plugin,
    scan: { entities: ents.length, curated: curated.length, fleeting: fleeting.length, perDir: count(ents.map((e) => e.dir)), readErrors, frontmatterUnparsed: ents.filter((e) => !e.fmOk).map((e) => e.id), noUpdatedAt: noUpdated },
    check1_graphify: { ...graphify, reportedOnly: true },
    check2_setup: { status: setupIssues.length ? "WARN" : "OK", issues: setupIssues, missingDirs, missingTemplates, missingEntityDefinitions: plugin && existsSync(plugin) ? missingDefs : null, pluginManifest },
    check3_orphans: { status: orphans.length ? "WARN" : "OK", count: orphans.length, items: orphans, byType: count(orphans.map((x) => x.type)), aliasOnlyInbound: aliasOnly },
    check4_dangling: { status: dangling.length ? "WARN" : "OK", count: dangling.length, items: dangling },
    check5_old: { status: old.length ? "WARN" : "OK", thresholdDays: OLD_DAYS, count: old.length, items: old, reportedOnly: true },
    fleeting: {
      notes: fleetingItems.length,
      orphans: fleetingItems.filter((x) => x.orphan).length,
      dangling: fleetingItems.filter((x) => x.dangling).length,
      brokenLinks: fleetingItems.reduce((a, x) => a + x.brokenLinks.length, 0),
      items: fleetingItems,
    },
    clean,
  };
}

export function render(r: ReturnType<typeof healthcheck>): string {
  const L: string[] = [];
  L.push(`## healthcheck (port of /bedrock:healthcheck) - ${r.vault} (${r.resolvedBy}) - date ${r.date}`);
  L.push(`plugin: ${r.plugin ?? "(not found)"}`);
  L.push(`scan: ${r.scan.entities} entities (${r.scan.curated} curated, ${r.scan.fleeting} fleeting): ${Object.entries(r.scan.perDir).map(([d, n]) => `${d} ${n}`).join(", ")}${r.scan.readErrors.length ? `; ${r.scan.readErrors.length} skipped (read errors)` : ""}${r.scan.frontmatterUnparsed.length ? `; frontmatter unparsed: ${r.scan.frontmatterUnparsed.join(", ")}` : ""}`);
  L.push("");
  L.push("| Check | Status | Count | Details |");
  L.push("|---|---|---|---|");
  L.push(`| graphify-out | ${r.check1_graphify.status} | ${r.check1_graphify.nodes} nodes | ${r.check1_graphify.details} (reported only) |`);
  L.push(`| Setup | ${r.check2_setup.status} | ${r.check2_setup.issues.length} issues | ${r.check2_setup.issues.join("; ") || "All directories, templates, definitions, and manifest verified."} |`);
  L.push(`| Orphan entities (curated) | ${r.check3_orphans.status} | ${r.check3_orphans.count} orphans | ${r.check3_orphans.items.map((x) => x.id).join(", ") || "-"} |`);
  L.push(`| Dangling content (curated) | ${r.check4_dangling.status} | ${r.check4_dangling.count} dangling | ${r.check4_dangling.items.map((x) => x.id).join(", ") || "-"} |`);
  L.push(`| Old content (>${r.check5_old.thresholdDays}d) | ${r.check5_old.status} | ${r.check5_old.count} stale | ${r.check5_old.items[0] ? `oldest ${r.check5_old.items[0].id} (${r.check5_old.items[0].age_days} days)` : "-"} (reported only) |`);
  for (const x of r.check3_orphans.items) if (x.inboundFromFleeting) L.push(`  orphan ${x.id}: its ${x.inboundFromFleeting} inbound link(s) come from fleeting notes only, which never count`);
  if (r.check3_orphans.aliasOnlyInbound.length) L.push(`  inbound credited through an alias (the skill's alias rule): ${r.check3_orphans.aliasOnlyInbound.map((x) => `${x.from} -> ${x.target} via "${x.alias}"`).join("; ")}`);
  L.push("");
  L.push(`fleeting notes (awaiting organization; reported, never failing): ${r.fleeting.notes}; orphans ${r.fleeting.orphans}, dangling ${r.fleeting.dangling}, broken links ${r.fleeting.brokenLinks}`);
  for (const x of r.fleeting.items) L.push(`  ${x.id}: inbound ${x.inbound}, outbound ${x.outbound}${x.orphan ? ", orphan" : ""}${x.dangling ? ", dangling" : ""}${x.brokenLinks.length ? `, broken: ${x.brokenLinks.map((b) => `[[${b}]]`).join(", ")}` : ""}`);
  L.push("");
  L.push(r.clean ? "healthcheck: CLEAN (setup OK; 0 orphans and 0 dangling among curated notes)" : "healthcheck: NOT CLEAN");
  return L.join("\n");
}

function localDate(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const USAGE = "usage: bun .bedrock/reorg/healthcheck.ts [--strict] [--date YYYY-MM-DD] [--vault <dir|name>] [--plugin <dir>] [--json <file>]";

if (import.meta.main) {
  const argv = process.argv.slice(2);
  try {
    let strict = false;
    let date = localDate();
    let vaultArg: string | null = null;
    let pluginArg: string | null = null;
    let json: string | null = null;
    let help = false;
    for (let i = 0; i < argv.length; i++) {
      const a = argv[i];
      const [name, inline] = a.startsWith("--") && a.includes("=") ? [a.slice(0, a.indexOf("=")), a.slice(a.indexOf("=") + 1)] : [a, undefined];
      const value = () => {
        if (inline !== undefined) return inline;
        if (i + 1 >= argv.length || argv[i + 1].startsWith("--")) throw new Error(`${name} needs a value`);
        return argv[++i];
      };
      if (name === "--strict") strict = true;
      else if (name === "--date") date = value();
      else if (name === "--vault") vaultArg = value();
      else if (name === "--plugin") pluginArg = resolve(value());
      else if (name === "--json") json = resolve(value());
      else if (name === "--help" || name === "-h") help = true;
      else throw new Error(`unknown argument ${a}`);
    }
    if (help) console.log(USAGE);
    else {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`--date must be YYYY-MM-DD, got "${date}"`);
      const plugin = pluginArg ?? newestPlugin();
      const { vault, how } = resolveVault(vaultArg, plugin);
      if (!existsSync(vault)) throw new Error(`Vault path \`${vault}\` does not exist on disk.`);
      const r = healthcheck({ vault, how, plugin, date });
      console.log(render(r));
      if (json) {
        mkdirSync(dirname(json), { recursive: true });
        writeFileSync(json, JSON.stringify(r, null, 2) + "\n");
      }
      process.exitCode = strict && !r.clean ? 1 : 0;
    }
  } catch (e) {
    console.error("healthcheck.ts: " + ((e as Error)?.message ?? e));
    console.error(USAGE);
    process.exitCode = argv.includes("--strict") ? 1 : 0;
  }
}
