/* eslint-disable import/no-extraneous-dependencies, no-console, no-await-in-loop, no-restricted-syntax -- CLI script: runs must be sequential so they don't compete for CPU, and it reports to stdout */
/**
 * Firefox frame-timing harness (issue #79).
 *
 * Measures requestAnimationFrame deltas while the page is idle and while it is
 * wheel-scrolled, in headless Firefox at 1920x1080, against a running
 * production server. Each variant runs REPEATS times and the median run (by
 * idle fps) is reported so a one-off stall cannot skew the result.
 *
 * Headless Firefox renders in software, so absolute numbers are worse than on a
 * GPU desktop. Compare variants by ratio, never against a fixed fps.
 *
 * Usage:
 *   npm run build && npm run start &
 *   node e2e/perf/firefox-frame-timing.mjs [baseUrl] [path]
 *
 * Environment:
 *   VARIANTS   comma-separated variant names (default: all)
 *   REPEATS    runs per variant (default 3)
 *   IDLE_MS    idle sampling window (default 5000)
 *   SCROLL_MS  scroll sampling window (default 4000)
 *   OUT        write the JSON report to this path
 *   MAX_IDLE_P50_MS  exit 1 when the baseline idle p50 exceeds this (CI gate)
 */
import { writeFileSync } from 'node:fs';
import { firefox } from '@playwright/test';

const VIEWPORT = { width: 1920, height: 1080 };
// The three orbs. On the #78 branch they are the children of
// `[data-testid="ambient-orbs"]` (the last child is the noise layer); on older
// builds that still animate them (e.g. `main` before #79) they carry
// `.orb-anim-*` classes.
const ORB_LAYER = '[data-testid="ambient-orbs"]';
const ORBS = `${ORB_LAYER}>div:not(:last-child),.orb-anim-1,.orb-anim-2,.orb-anim-3`;

const css = (content) => (page) => page.addStyleTag({ content });

/**
 * Stops the page's own requestAnimationFrame loops (the dot-grid canvas) by
 * replacing rAF with a no-op. Removing the canvas node is not enough: the
 * React loop keeps drawing ~1300 dots into the detached canvas on the main
 * thread. The sampler keeps the real rAF as `perfRaf`.
 */
const stopPageRaf = (page) =>
  page.evaluate(() => {
    window.perfRaf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = () => 0;
  });

const all =
  (...steps) =>
  async (page) => {
    for (const step of steps) await step(page);
  };

const ORBS_STILL = css(`${ORBS}{animation:none!important}`);
const ORBS_STILL_NO_BLUR = css(
  `${ORBS}{animation:none!important;filter:none!important}`
);
const NO_BACKDROP = css(
  '.glass-card,.glass-btn,.glass-nav{backdrop-filter:none!important}'
);

/** Runtime ablations used to attribute cost to individual layers. */
export const VARIANTS = {
  baseline: {},
  'reduced-motion': { reducedMotion: true },
  'orbs-hidden': css(`${ORB_LAYER},${ORBS}{display:none!important}`),
  'orbs-no-animation': ORBS_STILL,
  'orbs-no-blur': css(`${ORBS}{filter:none!important}`),
  'canvas-loop-stopped': stopPageRaf,
  'nav-no-backdrop-filter': css('.glass-nav{backdrop-filter:none!important}'),
  'cards-no-backdrop-filter': css(
    '.glass-card,.glass-btn{backdrop-filter:none!important}'
  ),
  // Candidate fixes for the background: stop the canvas loop, then keep only
  // one of the two orb costs (animation or blur).
  'canvas-stopped-orbs-animated-no-blur': all(
    css(`${ORBS}{filter:none!important}`),
    stopPageRaf
  ),
  'canvas-stopped-orbs-still-blurred': all(ORBS_STILL, stopPageRaf),
  // Full-viewport feTurbulence noise layer that sits next to the orbs.
  'noise-hidden': css(
    `${ORB_LAYER}>div:last-child,.orb-anim-3 + div{display:none!important}`
  ),
  // What `prefers-reduced-motion: reduce` does in the app: static orbs (CSS)
  // and a canvas that draws once. Should match 'reduced-motion'.
  'reduced-motion-equivalent': all(ORBS_STILL, stopPageRaf),
  // Split `reduced-motion` into its two halves to see which one matters.
  // Only the canvas takes the static path (JS matchMedia says "reduce", the
  // CSS media query does not match, so the orbs keep animating).
  'reduced-motion-canvas-only': {
    initScript: () => {
      const orig = window.matchMedia.bind(window);
      window.matchMedia = (q) =>
        q.includes('prefers-reduced-motion')
          ? { ...orig(q), matches: true }
          : orig(q);
    },
  },
  // Only the CSS half: real reduced-motion emulation, but the orb animations
  // are forced back on.
  'reduced-motion-orbs-animated': {
    reducedMotion: true,
    apply: css(
      '.orb-anim-1{animation:orbA 22s ease-in-out infinite!important}.orb-anim-2{animation:orbB 28s ease-in-out infinite!important}.orb-anim-3{animation:orbC 24s ease-in-out infinite!important}'
    ),
  },
  // No single layer explains the jank, so ablate the continuous-animation
  // sources together, then add the backdrop-filters on top.
  'background-static': all(ORBS_STILL_NO_BLUR, stopPageRaf),
  'no-backdrop-filter-no-animation': all(
    NO_BACKDROP,
    ORBS_STILL_NO_BLUR,
    stopPageRaf
  ),
};

/**
 * Summarises frame deltas.
 * @param {number[]} deltas frame-to-frame durations in ms
 * @returns {{frames:number,fps:number,p50:number,p95:number,max:number,jank50:number,jank100:number}}
 */
export function summarise(deltas) {
  const sorted = [...deltas].sort((a, b) => a - b);
  const q = (p) =>
    sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
  const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
  return {
    frames: sorted.length,
    fps: +(1000 / mean).toFixed(1),
    p50: +q(0.5).toFixed(1),
    p95: +q(0.95).toFixed(1),
    max: +sorted[sorted.length - 1].toFixed(1),
    jank50: sorted.filter((d) => d > 50).length,
    jank100: sorted.filter((d) => d > 100).length,
  };
}

async function sample(page, ms, scroll) {
  await page.evaluate((duration) => {
    window.perfDeltas = [];
    window.perfDone = false;
    let last = performance.now();
    const end = last + duration;
    const raf = (window.perfRaf || window.requestAnimationFrame).bind(window);
    const tick = (t) => {
      window.perfDeltas.push(t - last);
      last = t;
      if (t < end) raf(tick);
      else window.perfDone = true;
    };
    raf(tick);
  }, ms);

  if (scroll) {
    const steps = Math.floor(ms / 100);
    for (let i = 0; i < steps; i += 1) {
      // Alternate direction so the page keeps scrolling through real content.
      await page.mouse.wheel(0, i % 20 < 10 ? 240 : -240);
      await page.waitForTimeout(90);
    }
  }
  await page.waitForFunction(() => window.perfDone === true, null, {
    // Default polling uses the page's rAF, which stopPageRaf replaces.
    polling: 100,
    timeout: ms + 20000,
  });
  return page.evaluate(() => window.perfDeltas.slice(1));
}

async function measureOnce(browser, url, name, variant, idleMs, scrollMs) {
  const config = typeof variant === 'function' ? { apply: variant } : variant;
  const context = await browser.newContext({
    viewport: VIEWPORT,
    reducedMotion: config.reducedMotion ? 'reduce' : 'no-preference',
  });
  try {
    if (config.initScript) await context.addInitScript(config.initScript);
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    if (config.apply) await config.apply(page);
    await page.waitForTimeout(500);
    const idle = summarise(await sample(page, idleMs, false));
    const scroll = summarise(await sample(page, scrollMs, true));
    return { idle, scroll };
  } finally {
    await context.close();
  }
}

const fmt = (label, s) =>
  `${label.padEnd(34)} fps ${String(s.fps).padStart(5)}  p50 ${String(
    s.p50
  ).padStart(6)}ms  p95 ${String(s.p95).padStart(6)}ms  >100ms ${String(
    s.jank100
  ).padStart(3)}`;

async function main() {
  const base = process.argv[2] || 'http://localhost:3000';
  const path = process.argv[3] || '/en/';
  const repeats = Number(process.env.REPEATS || 3);
  const idleMs = Number(process.env.IDLE_MS || 5000);
  const scrollMs = Number(process.env.SCROLL_MS || 4000);
  const names = (process.env.VARIANTS || Object.keys(VARIANTS).join(','))
    .split(',')
    .map((n) => n.trim());
  const unknown = names.filter((n) => !(n in VARIANTS));
  if (unknown.length)
    throw new Error(`Unknown variants: ${unknown.join(', ')}`);

  const browser = await firefox.launch({ headless: true });
  const report = {
    firefox: browser.version(),
    viewport: VIEWPORT,
    url: base + path,
    repeats,
    results: [],
  };
  console.log(
    `Firefox ${report.firefox} | ${VIEWPORT.width}x${VIEWPORT.height} | ${report.url} | x${repeats}\n`
  );

  try {
    for (const name of names) {
      const runs = [];
      for (let i = 0; i < repeats; i += 1) {
        runs.push(
          await measureOnce(
            browser,
            base + path,
            name,
            VARIANTS[name],
            idleMs,
            scrollMs
          )
        );
      }
      runs.sort((a, b) => a.idle.fps - b.idle.fps);
      const median = runs[Math.floor(runs.length / 2)];
      report.results.push({ variant: name, ...median });
      console.log(fmt(`IDLE   ${name}`, median.idle));
      console.log(fmt(`SCROLL ${name}`, median.scroll));
    }
  } finally {
    await browser.close();
  }

  if (process.env.OUT)
    writeFileSync(process.env.OUT, `${JSON.stringify(report, null, 2)}\n`);

  const limit = Number(process.env.MAX_IDLE_P50_MS || 0);
  const baseline = report.results.find((r) => r.variant === 'baseline');
  if (limit && baseline && baseline.idle.p50 > limit) {
    console.error(
      `\nFAIL: baseline idle p50 ${baseline.idle.p50}ms > ${limit}ms`
    );
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
