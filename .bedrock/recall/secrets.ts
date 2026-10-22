// Secret patterns, checked on every memory file before its text is copied into the vault. A hit skips the file and
// warns. Every pattern is specific: the 2026-10-03 import saw 89 false positives from a loose `sk-` match inside
// kebab-case slugs ("task-board", "risk-based"), so a key prefix must start a token and be followed by a key-like body,
// and an assignment only counts when its value is a literal (not a variable, a call, an attribute or a placeholder).
// Hits are reported by pattern name and line only; the matched text is never logged or printed.

type Pattern = { name: string; re: RegExp; accept?: (m: RegExpExecArray, text: string) => boolean };

/** A random-looking key body: some run between separators is 16+ characters with both letters and digits. Kebab-case
 *  slugs and dates ("sk-2026-10-03-standup-notes") only have short runs. */
const keyLike = (body: string) => body.split(/[-_.]/).some((s) => s.length >= 16 && /\d/.test(s) && /[A-Za-z]/.test(s));

/** Values that stand in for a secret rather than being one. */
const PLACEHOLDER =
  /^(?:\*+|x{3,}|\.{3,}|-+|redacted|placeholder|changeme|change[_-]?me|example|sample|dummy|demo[_-]?key|none|null|nil|true|false|undefined|empty|todo|tbd|password|passwd|secret|your[_-].*|my[_-].*|<.*>|\[.*\]|\{.*\}|\$\{.*\}|%\w*%?|os\.environ.*|process\.env.*|sys\.getenv.*|getenv.*|env[.:].*|keyring.*|secrets?\..*|config\..*|settings\..*)$/i;

/** Strong enough to be a credential: a digit, mixed case or a symbol, and not an ENV_VAR_NAME. */
const strong = (v: string) => (/\d/.test(v) || (/[a-z]/.test(v) && /[A-Z]/.test(v)) || /[!@#$^&*+=?~]/.test(v)) && !/^[A-Z][A-Z0-9_]*$/.test(v);

/** A quoted literal that is not a placeholder, a template or a variable name. */
const quotedLiteral = (v: string) => v.length > 0 && !PLACEHOLDER.test(v) && !/[{}$%<>]/.test(v) && strong(v);

/** An unquoted literal: not an attribute, call or index expression, and strong, so `password=policy`,
 *  `secret = self.secret`, `password=args.password`, `password = getpass.getpass()` and `PASSWORD=MY_ENV_VAR` do not count. */
const bareLiteral = (v: string, next: string) => !PLACEHOLDER.test(v) && !/[.([]/.test(v) && next !== "(" && next !== "[" && strong(v);

/** An identifier naming a secret, with any prefix: password, DB_PASSWORD, MYSQL_ROOT_PASSWORD, client_secret,
 *  AWS_SECRET_ACCESS_KEY, api_key, x-api-key, access_token, auth_token. Prefix and suffix are bounded (linear matching). */
const KEY = String.raw`[A-Za-z0-9_.-]{0,40}(?:password|passwd|secret|api[_-]?key|apikey|access[_-]?token|auth[_-]?token)[A-Za-z0-9_]{0,40}`;

const assignment = (m: RegExpExecArray, text: string) => {
  const quoted = m[2] ?? m[3];
  if (quoted !== undefined) return quotedLiteral(quoted);
  const bare = m[4] ?? "";
  return bare.length > 0 && bareLiteral(bare, text[m.index + m[0].length] ?? "");
};

export const SECRET_PATTERNS: Pattern[] = [
  // keys and tokens with a known prefix
  { name: "Anthropic API key (sk-ant-)", re: /(?<![A-Za-z0-9_-])sk-ant-[A-Za-z0-9_-]{20,}/g, accept: (m) => keyLike(m[0].slice(7)) },
  { name: "API key (sk-)", re: /(?<![A-Za-z0-9_-])sk-(?!ant-)(?:proj-|svcacct-|admin-)?[A-Za-z0-9_-]{20,}/g, accept: (m) => keyLike(m[0].slice(3)) },
  { name: "Stripe key (sk_live_/rk_live_/whsec_)", re: /(?<![A-Za-z0-9])(?:(?:sk|rk)_live_[A-Za-z0-9]{20,}|whsec_[A-Za-z0-9]{24,})/g },
  { name: "GitHub token (ghp_/gho_/ghu_/ghs_/ghr_)", re: /(?<![A-Za-z0-9_])gh[pousr]_[A-Za-z0-9]{30,}/g },
  { name: "GitHub token (github_pat_)", re: /(?<![A-Za-z0-9_])github_pat_[A-Za-z0-9_]{22,}/g },
  { name: "GitLab token (glpat-)", re: /(?<![A-Za-z0-9_])glpat-[A-Za-z0-9_-]{20,}/g },
  { name: "Hugging Face token (hf_)", re: /(?<![A-Za-z0-9_])hf_[A-Za-z]{30,}/g },
  { name: "npm token (npm_)", re: /(?<![A-Za-z0-9_])npm_[A-Za-z0-9]{36,}/g },
  { name: "AWS access key id (AKIA/ASIA)", re: /(?<![A-Za-z0-9])(?:AKIA|ASIA)[0-9A-Z]{16}(?![A-Za-z0-9])/g },
  { name: "Slack token (xox?-)", re: /(?<![A-Za-z0-9])xox[abprs]-[A-Za-z0-9-]{10,}/g },
  { name: "Google API key (AIza)", re: /(?<![A-Za-z0-9])AIza[0-9A-Za-z_-]{35}/g },
  { name: "SendGrid key (SG.)", re: /(?<![A-Za-z0-9])SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}/g },
  { name: "JSON web token", re: /(?<![A-Za-z0-9_-])eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g },
  { name: "private key block (PEM/PGP)", re: /-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY(?: BLOCK)?-----/g },
  // credentials in headers and URLs
  { name: "Authorization header (Bearer/Basic)", re: /\bauthorization["']?\s*[:=]\s*["']?(?:bearer|basic|token)\s+[A-Za-z0-9._~+/=-]{16,}/gi },
  { name: "bearer token", re: /\bbearer\s+([A-Za-z0-9._~+/-]{30,})/gi, accept: (m) => keyLike(m[1]) },
  {
    name: "credentials in a URL (user:password@)",
    re: /\b[a-z][a-z0-9+.-]{1,20}:\/\/[^\s/:@"'<>]{1,100}:([^\s/@"'<>]{3,100})@[A-Za-z0-9.-]{3,}/gi,
    accept: (m) => quotedLiteral(m[1]),
  },
  // assignments with a literal value
  {
    name: "password/secret assignment",
    re: new RegExp(String.raw`(?<![A-Za-z0-9])(${KEY})\s*:?=\s*(?:"([^"\s]{4,200})"|'([^'\s]{4,200})'|([^\s"'\x60$<{(%[][^\s"'\x60;,)\]]{5,200}))`, "gi"),
    accept: assignment,
  },
  {
    name: "password/secret value (quoted key: value)",
    re: new RegExp(String.raw`(?<![A-Za-z0-9])["']?(${KEY})["']?\s*:\s*(?:"([^"\s]{6,200})"|'([^'\s]{6,200})')`, "gi"),
    accept: assignment,
  },
];

export type SecretHit = { pattern: string; line: number };

/** Every secret-pattern hit in `text` (pattern name and 1-based line; never the matched text). */
export function scanSecrets(text: string): SecretHit[] {
  const breaks: number[] = [];
  for (let i = text.indexOf("\n"); i >= 0; i = text.indexOf("\n", i + 1)) breaks.push(i);
  const lineOf = (pos: number) => {
    let lo = 0;
    let hi = breaks.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (breaks[mid] < pos) lo = mid + 1;
      else hi = mid;
    }
    return lo + 1;
  };
  const hits: SecretHit[] = [];
  for (const p of SECRET_PATTERNS) {
    p.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = p.re.exec(text))) {
      if (!p.accept || p.accept(m, text)) hits.push({ pattern: p.name, line: lineOf(m.index) });
      if (m[0].length === 0) p.re.lastIndex++;
    }
  }
  return hits;
}

// ----------------------------------------------------------------------------------------------- private patterns
// Capture-time redaction. The vault is public; Paul's private items (university mail, tunnel and pod endpoints, a vendor
// name, credential-file names, ...) must not be copied into fleeting/. The pattern list holds those private values, so it
// lives in the git-ignored .bedrock/recall/private-patterns.json: {"literal": [[text, replacement]], "regex": [[pattern,
// replacement]]}, applied case-insensitively, literals first, in file order (the same rules and order as the history
// scrub's replacements.txt). The hook redacts memory text before writing a fleeting note and skips a memory whose file name
// or `name:` matches a pattern (a note about a private subject); the memory file itself is never touched.
export type Redactor = { text: (s: string) => string; blocks: (s: string) => boolean };

export function compileRedactor(cfg: { literal?: [string, string][]; regex?: [string, string][] }): Redactor {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const rules: [RegExp, string][] = [
    ...(cfg.literal ?? []).map(([o, n]) => [new RegExp(esc(o), "gi"), n] as [RegExp, string]),
    ...(cfg.regex ?? []).map(([p, n]) => [new RegExp(p, "gi"), n] as [RegExp, string]),
  ];
  const text = (s: string) => rules.reduce((t, [re, n]) => t.replace(re, () => n), s);
  return { text, blocks: (s) => text(s) !== s };
}
