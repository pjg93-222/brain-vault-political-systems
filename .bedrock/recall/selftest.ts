// Self-test for the capture/recall hook. Read-only on the vault apart from refreshing the derived recall index (and
// index.md when notes changed); every sync it runs is a --dry-run unless --timing is given and nothing is pending.
//
//   bun .bedrock/recall/selftest.ts               payload smoke tests + recall quality table
//   bun .bedrock/recall/selftest.ts --timing      ... plus the median of 5 runs for recall and for a no-op sync
//   bun .bedrock/recall/selftest.ts --verbose     ... plus the scores behind every recall decision
//
// Exit code 0 when every check passes. Run it after changing recall.ts, text.ts or indexer.ts (thresholds were tuned on
// the prompts below: each on-topic prompt must list its note in the top 3, each off-topic prompt must print nothing).
// The length limits (session-start <= 400, recall <= 800) hold at the real vault path (REAL_VAULT in recall.ts) and are
// measured there, so a copy of the vault at any other path, however long, passes or fails exactly as the real vault does.
import { join } from "node:path";
import { RECALL_DIR, VAULT } from "./lib.ts";
import { formatRecall, freshIndex, isTrivial, rank, REAL_VAULT, TUNING } from "./recall.ts";
import { terms } from "./text.ts";
import { sessionContext } from "./hook.ts";

const HOOK = join(RECALL_DIR, "hook.ts");
/** Hook output as it reads with the vault at REAL_VAULT: the length limits are measured on this. */
const atRealVault = (s: string, vault = VAULT) => s.split(vault).join(REAL_VAULT);
const lengthDetail = (s: string, vault = VAULT) => {
  const real = atRealVault(s, vault).length;
  return `${real} chars at the real vault path${real === s.length ? "" : ` (${s.length} at this ${vault.length}-char path)`}`;
};
const verbose = process.argv.includes("--verbose");
const timing = process.argv.includes("--timing");
let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
  if (!ok) failures++;
};

// --------------------------------------------------------------------------------------------------------- prompts
export const ON_TOPIC: [string, string][] = [
  ["Why did the Mentat collector count trade association donations as $0, and how did we fix the attribution?", "topics/2026-07-bugfix-mentat-collection-and-attribution-audit-r12-trade-association.md"],
  ["The congress R scraper keeps failing on member press release pages; what fallbacks did we set up?", "topics/2026-06-feature-congress-r-scrapers-cu-press-scraper.md"],
  ["How are the personality psychometrics scores computed for members of Congress?", "topics/2026-07-feature-personality-psychometrics.md"],
  ["What did Paul rule about PAC accuracy in attempt 2?", "discussions/2026-10-03-pac-accuracy-attempt2-rulings.md"],
  ["Is the brain graph watcher running, and how does it rebuild the graph page?", "actors/brain-graph.md"],
  ["Remind me of the single-look holdout discipline before I evaluate the forecast model again", "concepts/single-look-holdout-discipline.md"],
  ["How do I start a RunPod pod for memory-heavy Claude sessions?", "actors/runpod-pod.md"],
  ["When should work be delegated to the Codex executor lane instead of written by Claude?", "actors/codex-executor.md"],
  ["What happened with the workstation disk space and backup incident?", "topics/2026-08-incident-workstation-disk-and-backup.md"],
  ["How does the staffer network sidecar serve live data to the dashboard?", "actors/staffer-live-sidecar.md"],
  ["What's the rule about excluding rows only on contradiction, not ambiguity, in the cross-reference?", "concepts/exclude-on-contradiction-not-ambiguity.md"],
  ["How does the Moneyball workbook blend the four pillars into a rank?", "actors/moneyball-workbook.md"],
  ["Remind me how GLASS BOX streams events from each lane", "actors/glass-box.md"],
  ["What does the metaloop command do with its four lanes?", "actors/metaloop.md"],
  ["How does the LobbyView collector ingest the bulk exports?", "actors/lobbyview-collector.md"],
  ["What were the rulings in the staffer sorting discussion?", "discussions/2026-09-06-staffer-sorting-rulings.md"],
  ["How did we build the cosponsor network and the sector network?", "topics/2026-06-feature-cosponsor-and-sector-networks-sector-networks.md"],
  ["What's the trap with which account the Higgsfield connector is bound to?", "actors/higgsfield-connector.md"],
  ["Explain the two-hop stance decomposition again", "concepts/two-hop-stance-decomposition.md"],
  ["How is the Luna row framework for CU geography structured?", "topics/2026-09-feature-cu-geography-luna-and-row-framework.md"],
  ["What did the council decide in the Mentat xref review?", "discussions/2026-09-17-mentat-xref-council-review.md"],
  ["How does the weekly refresh scheduler for Melange run?", "actors/melange-refresh-scheduler.md"],
];

export const OFF_TOPIC: string[] = [
  "write a haiku about autumn",
  "what is 2+2",
  "yes go ahead",
  "thanks, that looks good",
  "explain how quicksort works in python",
  "what's the capital of France?",
  "Write a SQL query that finds duplicate emails in a users table",
  "Can you recommend a good recipe for banana bread with walnuts and cinnamon?",
  "How do I center a div with CSS flexbox?",
  "I'm planning a trip to Japan next spring for two weeks. Which cities should I visit, what's the best way to get around by train, and how much should I budget per day for food and lodging?",
  "Refactor this TypeScript function to use async/await instead of promise chains and add error handling",
  "What are the main differences between PostgreSQL and MySQL for a small web app?",
  "How do I write a unit test for a React component that fetches data?",
  "Generate a bash script that backs up my photos folder every night",
  "Explain the difference between TCP and UDP",
  "What's a good name for a golden retriever puppy?",
  "Summarize the plot of Hamlet in three sentences",
  "Convert this JSON object into a YAML file with comments",
  "How do I set up a Python virtual environment on Windows?",
  "Write a cover letter for a data analyst job application",
  "Why is my git rebase failing with merge conflicts?",
  "What's the time complexity of binary search?",
];

// --------------------------------------------------------------------------------------------------------- helpers
const base = { session_id: "selftest-0000", transcript_path: join(RECALL_DIR, "selftest.jsonl"), cwd: "C:\\Users\\pgoff\\Mentat", permission_mode: "default" };
const payload = {
  sessionStart: { ...base, hook_event_name: "SessionStart", source: "startup", model: "claude-opus-5-5" },
  prompt: (prompt: string) => ({ ...base, hook_event_name: "UserPromptSubmit", prompt }),
  stop: { ...base, hook_event_name: "Stop", stop_hook_active: false },
  sessionEnd: { ...base, hook_event_name: "SessionEnd", reason: "prompt_input_exit" },
};

type Run = { code: number | null; out: string; err: string; ms: number };
function runHook(args: string[], stdin: string | null): Run {
  const t0 = performance.now();
  const r = Bun.spawnSync([process.execPath, HOOK, ...args], {
    stdin: stdin === null ? "ignore" : new TextEncoder().encode(stdin),
    stdout: "pipe",
    stderr: "pipe",
    windowsHide: true,
    timeout: 60_000,
  });
  return { code: r.exitCode, out: r.stdout.toString(), err: r.stderr.toString(), ms: performance.now() - t0 };
}
const json = (s: string): any => {
  try {
    return JSON.parse(s);
  } catch {
    return undefined;
  }
};
const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

// ------------------------------------------------------------------------------------------- 1. payload smoke tests
console.log("== 1. payloads piped to every subcommand ==");
{
  const r = runHook(["session-start"], JSON.stringify(payload.sessionStart));
  const ctx = json(r.out)?.hookSpecificOutput?.additionalContext ?? "";
  check("session-start: exit 0, SessionStart additionalContext <= 400 chars at the real vault path", r.code === 0 && json(r.out)?.hookSpecificOutput?.hookEventName === "SessionStart" && ctx.length > 0 && atRealVault(ctx).length <= 400, lengthDetail(ctx));
  for (const must of [VAULT, "/bedrock:ask", "/bedrock:preserve", "fleeting/", "index.md", "Brain recall"]) check(`session-start mentions ${must === VAULT ? "this vault's path" : must}`, ctx.includes(must));
}
{
  const [p, want] = ON_TOPIC[0];
  const r = runHook(["recall"], JSON.stringify(payload.prompt(p)));
  const o = json(r.out)?.hookSpecificOutput;
  const ctx: string = o?.additionalContext ?? "";
  check("recall (on-topic): exit 0, UserPromptSubmit additionalContext <= 800 chars at the real vault path, lists its note", r.code === 0 && o?.hookEventName === "UserPromptSubmit" && atRealVault(ctx).length <= 800 && ctx.includes(want), lengthDetail(ctx));
  if (verbose && o) console.log(o.additionalContext.replace(/^/gm, "      "));
}
for (const [label, stdin] of [
  ["off-topic prompt", JSON.stringify(payload.prompt("write a haiku about autumn"))],
  ["confirmation", JSON.stringify(payload.prompt("yes go ahead"))],
  ["malformed JSON", "{not json"],
  ["empty stdin", ""],
  ["no prompt field", JSON.stringify({ ...base, hook_event_name: "UserPromptSubmit" })],
] as const) {
  const r = runHook(["recall"], stdin);
  check(`recall (${label}): exit 0, no output`, r.code === 0 && r.out.trim() === "", r.out.trim().slice(0, 80));
}
{
  const big = "Mentat collection and attribution. " + "lorem ipsum dolor sit amet ".repeat(4000);
  const r = runHook(["recall"], JSON.stringify(payload.prompt(big)));
  check("recall (108 KB prompt): exit 0, valid or empty output, under 4 s", r.code === 0 && (r.out.trim() === "" || json(r.out) !== undefined) && r.ms < 4000, `${Math.round(r.ms)} ms`);
}
for (const [label, p] of [
  ["Stop", payload.stop],
  ["SessionEnd", payload.sessionEnd],
] as const) {
  const r = runHook(["sync", "--dry-run"], JSON.stringify(p));
  const o = r.out.trim() ? json(r.out) : {};
  check(`sync --dry-run (${label} payload): exit 0, no output or a systemMessage`, r.code === 0 && o !== undefined && (r.out.trim() === "" || typeof o.systemMessage === "string"), r.out.trim().slice(0, 120));
}
{
  const r = runHook(["sync", "--dry-run"], null);
  check("sync --dry-run (manual): exit 0, readable report", r.code === 0 && /^brain sync \(dry run/.test(r.out), r.out.split("\n")[0]);
  console.log("      " + r.out.trim().split("\n").join("\n      "));
}
{
  const r = runHook(["index"], null);
  check("index: exit 0, 'index ok'", r.code === 0 && r.out.startsWith("index ok"), r.out.trim());
}
{
  const r = runHook(["no-such-subcommand"], "{}");
  check("unknown subcommand: exit 0, nothing on stdout", r.code === 0 && r.out.trim() === "");
}

// ----------------------------------------------------------------------------------------------- 2. recall quality
console.log("\n== 2. recall quality ==");
console.log(`tuning: ${JSON.stringify(TUNING)}`);
const { idx } = freshIndex();
console.log("| # | prompt | expected note | listed | rank | result |");
console.log("|---|---|---|---|---|---|");
let onOk = 0;
ON_TOPIC.forEach(([p, want], k) => {
  const hits = isTrivial(p) ? [] : rank(idx, p).hits;
  const r = hits.findIndex((h) => idx.notes[h.i].p === want);
  const ok = r >= 0 && r < 3;
  if (ok) onOk++;
  console.log(`| ${k + 1} | ${p.slice(0, 70)} | ${want} | ${hits.length} | ${r + 1 || "-"} | ${ok ? "PASS" : "FAIL"} |`);
});
let offOk = 0;
OFF_TOPIC.forEach((p, k) => {
  const trivial = isTrivial(p);
  const hits = trivial ? [] : rank(idx, p).hits;
  if (!hits.length) offOk++;
  console.log(`| ${ON_TOPIC.length + k + 1} | ${p.slice(0, 70)} | (none) | ${hits.length} | ${trivial ? "trivial" : "-"} | ${hits.length ? "FAIL: " + idx.notes[hits[0].i].p : "PASS"} |`);
});
check(`on-topic: expected note in the top 3`, onOk === ON_TOPIC.length, `${onOk}/${ON_TOPIC.length}`);
check(`off-topic: no output`, offOk === OFF_TOPIC.length, `${offOk}/${OFF_TOPIC.length}`);
// end to end through the hook process for the first six of each
let e2e = 0;
for (const [p, want] of ON_TOPIC.slice(0, 6)) if ((json(runHook(["recall"], JSON.stringify(payload.prompt(p))).out)?.hookSpecificOutput?.additionalContext ?? "").includes(want)) e2e++;
for (const p of OFF_TOPIC.slice(0, 6)) if (runHook(["recall"], JSON.stringify(payload.prompt(p))).out.trim() === "") e2e++;
check("end to end through the hook process (6 on-topic + 6 off-topic)", e2e === 12, `${e2e}/12`);

// ------------------------------------------------------------------ 3. length limits do not depend on the vault path
// The formatting only prints the vault path (it never opens it), so synthetic paths stand in for real copies: the real
// vault path, a short one and one of 255 characters (a deep temp export). Apart from the path, the session-start context
// and every on-topic recall block must be the same at all three, and the limits must hold at the real vault path.
console.log("\n== 3. length limits do not depend on the vault path ==");
{
  const paths = [REAL_VAULT, "D:\\v", "C:\\" + "deep-export-folder\\".repeat(13) + "vault"];
  const ss = paths.map((v) => sessionContext(v));
  check("session-start: the same context at every vault path apart from the path", ss.every((s, k) => atRealVault(s, paths[k]) === ss[0]), paths.map((v, k) => `${v.length}-char path ${ss[k].length} chars`).join(", "));
  check("session-start: <= 400 chars at the real vault path", ss[0].length <= 400, `${ss[0].length} chars`);
  let n = 0, same = 0, listed = 0, within = 0, longest = 0;
  for (const [p, want] of ON_TOPIC) {
    const hits = isTrivial(p) ? [] : rank(idx, p).hits;
    if (!hits.some((h) => idx.notes[h.i].p === want)) continue; // a recall-quality failure, reported in section 2
    n++;
    const blocks = paths.map((v) => formatRecall(idx, hits, v));
    if (blocks.every((b, k) => atRealVault(b, paths[k]) === blocks[0])) same++;
    if (blocks.every((b) => b.includes(want))) listed++;
    if (blocks[0].length <= TUNING.MAX_CHARS) within++;
    longest = Math.max(longest, blocks[0].length);
  }
  check("recall: the same note lines at every vault path apart from the path", n > 0 && same === n, `${same}/${n} on-topic blocks`);
  check("recall: the expected note is listed at every vault path", listed === n, `${listed}/${n}`);
  check(`recall: <= ${TUNING.MAX_CHARS} chars at the real vault path`, within === n, `${within}/${n}, longest ${longest} chars`);
}

if (verbose) {
  for (const p of [...ON_TOPIC.map(([p]) => p), ...OFF_TOPIC]) {
    if (isTrivial(p)) continue;
    const { hits, all } = rank(idx, p);
    const q = [...new Set(terms(p))];
    console.log(`\n${p.slice(0, 100)}`);
    for (const h of all.slice(0, 5)) {
      const nt = q.filter((t) => (idx.name[t] ?? []).includes(h.i));
      console.log(`  ${hits.includes(h) ? "*" : " "} ${h.score.toFixed(2).padStart(6)} cover ${h.cover.toFixed(2)} name ${h.nameTerms}${h.named ? "!" : " "} ${idx.notes[h.i].p} [${nt.join(",")}]`);
    }
  }
}

// --------------------------------------------------------------------------------------------------------- 4. timing
if (timing) {
  console.log("\n== 4. timing (wall clock of the whole hook process, median of 5) ==");
  const rec: number[] = [];
  for (let k = 0; k < 5; k++) rec.push(runHook(["recall"], JSON.stringify(payload.prompt(ON_TOPIC[k][0]))).ms);
  check("recall median under 300 ms", median(rec) < 300, `median ${Math.round(median(rec))} ms; runs ${rec.map(Math.round).join(", ")}`);
  const dry = runHook(["sync", "--dry-run"], null).out;
  if (/would write 0 note/.test(dry)) {
    const syn: number[] = [];
    for (let k = 0; k < 5; k++) syn.push(runHook(["sync"], JSON.stringify(payload.stop)).ms);
    check("no-op sync median under 300 ms", median(syn) < 300, `median ${Math.round(median(syn))} ms; runs ${syn.map(Math.round).join(", ")}`);
  } else console.log("SKIP  no-op sync timing: memory files are pending, so a sync would write notes (run it after a sync)");
}

console.log(failures ? `\nSELFTEST FAILED (${failures})` : "\nSELFTEST OK");
process.exit(failures ? 1 : 0);
