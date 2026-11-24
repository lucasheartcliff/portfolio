/**
 * A/B benchmark of background approaches (#83).
 *
 * Interleaves variants (variant inside repeat) so slow host drift hits every
 * variant equally, and reports the median run per (browser, variant).
 *
 * Env: BROWSERS=chromium,firefox,webkit  VARIANTS=a,b  REPEATS=3
 *      IDLE_MS=5000 SCROLL_MS=4000  OUT=results.json  SHOTS=dir
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { chromium, firefox, webkit } from '@playwright/test';

const ENGINES = { chromium, firefox, webkit };
const VIEWPORT = { width: 1920, height: 1080 };
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const sizes = JSON.parse(readFileSync('dist/sizes.json', 'utf8'));
const allVariants = Object.keys(sizes);
const variants = (process.env.VARIANTS || allVariants.join(',')).split(',');
const browsers = (process.env.BROWSERS || 'chromium,firefox').split(',');
const repeats = Number(process.env.REPEATS || 3);
const idleMs = Number(process.env.IDLE_MS || 5000);
const scrollMs = Number(process.env.SCROLL_MS || 4000);

const server = createServer((req, res) => {
  const f = join('dist', req.url.split('?')[0].replace(/^\//, '') || 'index.html');
  if (!existsSync(f)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'text/plain' }).end(readFileSync(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const summarise = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const q = (p) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return { fps: +(1000 / (s.reduce((a, b) => a + b, 0) / s.length)).toFixed(1), p50: +q(0.5).toFixed(1), p95: +q(0.95).toFixed(1), jank100: s.filter((d) => d > 100).length };
};

async function sample(page, ms, scroll) {
  await page.evaluate((dur) => {
    window.perfDeltas = []; window.perfDone = false;
    let last = performance.now(); const end = last + dur;
    const tick = (t) => { window.perfDeltas.push(t - last); last = t; if (t < end) requestAnimationFrame(tick); else window.perfDone = true; };
    requestAnimationFrame(tick);
  }, ms);
  if (scroll) {
    for (let i = 0; i < Math.floor(ms / 100); i += 1) {
      await page.mouse.wheel(0, i % 20 < 10 ? 240 : -240);
      await page.waitForTimeout(90);
    }
  }
  await page.waitForFunction(() => window.perfDone === true, null, { timeout: ms + 20000, polling: 100 });
  return summarise(await page.evaluate(() => window.perfDeltas.slice(1)));
}

const results = {};
const errors = {};
const launched = {};
for (const b of browsers) launched[b] = await ENGINES[b].launch({ headless: true });

for (let r = 0; r < repeats; r += 1) {
  for (const v of variants) {
    for (const b of browsers) {
      const ctx = await launched[b].newContext({ viewport: VIEWPORT });
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
      try {
        await page.goto(`${base}/${v}.html`, { waitUntil: 'load' });
        await page.waitForFunction(() => window.perfReady === true, null, { timeout: 15000, polling: 100 });
        await page.waitForTimeout(1500);
        if (r === 0 && process.env.SHOTS) {
          mkdirSync(process.env.SHOTS, { recursive: true });
          await page.screenshot({ path: join(process.env.SHOTS, `${b}-${v}.png`) });
        }
        const idle = await sample(page, idleMs, false);
        const scroll = await sample(page, scrollMs, true);
        (results[`${b}|${v}`] ||= []).push({ idle, scroll });
      } catch (e) {
        errs.push(`RUN FAILED: ${e.message.split('\n')[0]}`);
      }
      if (errs.length) errors[`${b}|${v}`] = [...new Set([...(errors[`${b}|${v}`] || []), ...errs])].slice(0, 3);
      await ctx.close();
    }
  }
  console.error(`repeat ${r + 1}/${repeats} done`);
}
for (const b of browsers) await launched[b].close();
server.close();

const median = (runs) => [...runs].sort((a, b) => a.idle.fps - b.idle.fps)[Math.floor(runs.length / 2)];
const report = { viewport: VIEWPORT, repeats, idleMs, scrollMs, versions: Object.fromEntries(browsers.map((b) => [b, launched[b].version()])), sizes, errors, results: {} };
for (const [k, runs] of Object.entries(results)) report.results[k] = median(runs);
if (process.env.OUT) writeFileSync(process.env.OUT, `${JSON.stringify(report, null, 2)}\n`);

const f = (r) => (r ? `${String(r.idle.fps).padStart(5)} / ${String(r.idle.p50).padStart(5)}  |  ${String(r.scroll.fps).padStart(5)} / ${String(r.scroll.p50).padStart(5)}` : '        n/a        ');
console.log(`variant`.padEnd(22) + browsers.map((b) => b.padEnd(32)).join('') + 'gzipKB');
console.log(''.padEnd(22) + browsers.map(() => 'idle fps/p50 | scroll fps/p50   '.padEnd(32)).join(''));
for (const v of variants) {
  console.log(v.padEnd(22) + browsers.map((b) => f(report.results[`${b}|${v}`]).padEnd(32)).join('') + (sizes[v].gzip / 1024).toFixed(1));
}
if (Object.keys(errors).length) console.log('\nerrors:', JSON.stringify(errors, null, 1));
