import { readFileSync, writeFileSync } from 'node:fs';
import { scanSecrets } from '../recall/secrets.ts';
const input = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const result = input.map((row: any) => ({id: row.id, hits: scanSecrets(row.text)}));
writeFileSync(process.argv[3], JSON.stringify(result), 'utf8');
console.log(JSON.stringify({scanned: result.length, withheld: result.filter((r: any) => r.hits.length).length}));
