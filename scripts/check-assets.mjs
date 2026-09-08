// Production asset audit: verifies every local asset referenced in src/ actually exists.
// Run with: npm run audit:assets
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const PUB = join(ROOT, "public");

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const refs = new Set();
for (const f of walk(SRC)) {
  const s = readFileSync(f, "utf8");
  for (const m of s.matchAll(/["'](\/(?:images|favicon\.svg|[^"']*?\.(?:jpg|jpeg|png|webp|svg|ico)))[\"']/g)) {
    refs.add(m[1]);
  }
}

let failed = 0;
for (const r of [...refs].sort()) {
  const ok = existsSync(join(PUB, r.replace(/^\//, "")));
  console.log(ok ? `  OK   ${r}` : `  MISSING ${r}`);
  if (!ok) failed++;
}
console.log(failed === 0 ? `\nAll ${refs.size} referenced assets exist.` : `\n${failed} missing asset(s)!`);
process.exit(failed === 0 ? 0 : 1);
