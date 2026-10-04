// Snapshot check: the numbers the vault had at the last deliberate update of SNAPSHOT (history: 74 notes / 260 links /
// 1468 mentions when the graph tooling was installed on 2026-10-03; 77 / 269 / 1501 with the capture and recall
// tooling, where the system notes index.md and log.md are excluded from the graph; 80 / 276 / 1522 after the first
// memory sync added 3 fleeting notes; 207 / 574 / 2082, pinned by the Phase 2 reorganisation's batch 6 (plan
// .bedrock/reorg/plan.md section 10 batch 6 step 9) from the page of its would-be-committed export: 204 curated notes
// after the 30 splits (119 parts) and the 8 new concepts, plus the 3 fleeting notes tracked in HEAD, which Phase 2 never
// stages; hook captures in the working tree are not counted; now 207 / 574 / 2083, re-pinned by fix round batch 7 from
// its own export: one more mention of moneyball-workbook in its lineage part, the logged decision 4(b) rewrite "(see
// superseded in [[moneyball-workbook]])", so that pair's weight went from 6 to 7). It proves that a change to the tooling did not change what
// the page shows. It is deliberately NOT run by the watcher: adding, removing or re-linking a note makes it fail, which is
// the point of a snapshot. When the vault has legitimately grown, update SNAPSHOT below (a Phase 2 fix round re-pins it
// from its own export).
// (verify.ts and the publish gate are the checks that stay valid for any vault.)
//   bun snapshot.ts [--file <page>]      exit code 0 = every assertion holds
import { readFileSync } from "node:fs";
import { DEFAULT_OUT, argValue } from "./common.ts";
import { gate, extractData } from "./checks.ts";

const SNAPSHOT = {
  nodes: 207,
  links: 574,
  mentions: 2083,
  types: { actor: 47, concept: 14, discussion: 6, person: 1, project: 4, topic: 132, team: 0, fleeting: 3, other: 0 } as Record<string, number>,
};

const FILE = argValue("--file") ?? DEFAULT_OUT;
const html = readFileSync(FILE, "utf8");
const data = extractData(html);
if (!data) {
  console.log("FAIL  graph data block missing or not valid JSON in", FILE);
  process.exit(1);
}

let bad = 0;
const check = (name: string, ok: boolean, detail: string) => {
  console.log((ok ? "PASS  " : "FAIL  ") + name.padEnd(40) + detail);
  if (!ok) bad++;
};
const eq = (name: string, want: number, got: number) => check(name, want === got, `expected ${want}, got ${got}`);

console.log("snapshot of", FILE);
const nodes: any[] = data.nodes;
const links: any[] = data.links;
eq("nodes", SNAPSHOT.nodes, nodes.length);
eq("links", SNAPSHOT.links, links.length);
eq("mentions (sum of link weights)", SNAPSHOT.mentions, links.reduce((a, l) => a + l.weight, 0));
const perType: Record<string, number> = {};
for (const n of nodes) perType[n.type] = (perType[n.type] ?? 0) + 1;
for (const [t, want] of Object.entries(SNAPSHOT.types)) eq("notes of type " + t, want, perType[t] ?? 0);

// the generic publish gate, plus leak counters that are only strict enough for a known vault
const g = gate(html);
check("publish gate (structure, leaks, CSP)", g.ok, g.ok ? "all checks pass" : g.failures.join("; "));
for (const w of g.where) console.log("      where:", w);
const count = (re: RegExp) => (html.match(re) ?? []).length;
eq("email-pattern matches", 0, count(/[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)+/g));
eq("'sha256' / 64-hex strings", 0, count(/sha-?256/gi) + count(/\b[0-9a-f]{64}\b/gi));
eq("any 32+ hex run", 0, count(/\b[0-9a-f]{32,}\b/gi));
eq("'sources' key", 0, count(/"sources"/g));
eq("'.claude' / drive path / \\Users\\", 0, count(/\.claude/gi) + count(/[A-Za-z]:\\/g) + count(/[\\/]Users[\\/]/gi));
eq("'pgoff'", 0, count(/pgoff/gi));
eq("file:// URLs", 0, count(/file:\/\//gi));

console.log(bad ? `\nSNAPSHOT FAILED (${bad} assertion(s))` : "\nSNAPSHOT OK");
process.exit(bad ? 1 : 0);
