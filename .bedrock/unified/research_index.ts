// Read-only research intake for Claude recall. Reuse the established vault secret scanner.
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync, renameSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { scanSecrets } from '../recall/secrets.ts';

const root = resolve(process.argv[2]);
const output = resolve(process.argv[3]);
const notes: any[] = [];
const withheld: string[] = [];
function walk(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) { walk(abs); continue; }
    if (!entry.name.endsWith('.md') || ['CLAUDE.md', 'log.md'].includes(entry.name)) continue;
    const text = readFileSync(abs, 'utf8');
    const rel = relative(root, abs).replaceAll('\\', '/');
    if (scanSecrets(text).length) { withheld.push(rel); continue; }
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    let fm: any = {};
    try { fm = match ? Bun.YAML.parse(match[1]) || {} : {}; } catch { /* use heading */ }
    const body = text.slice(match?.[0].length || 0);
    const title = String(fm.title || fm.name || body.match(/^#\s+(.+)$/m)?.[1] || entry.name.slice(0, -3)).replace(/[\r\n]/g, ' ');
    // Index locally; hook returns only title and absolute path, never research excerpts.
    notes.push({rel, title, terms: (title + ' ' + rel + ' ' + JSON.stringify(fm) + ' ' + body.slice(0, 16000)).toLowerCase().match(/[a-z0-9]+/g) || []});
  }
}
walk(root);
mkdirSync(resolve(output, '..'), { recursive: true });
const tmp = output + '.tmp-' + process.pid;
writeFileSync(tmp, JSON.stringify({version: 1, built: Date.now(), root, notes, withheld}), 'utf8');
renameSync(tmp, output);
console.log(JSON.stringify({indexed: notes.length, withheld: withheld.length}));
