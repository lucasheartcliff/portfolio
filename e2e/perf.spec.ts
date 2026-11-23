import { expect, test } from '@playwright/test';

// Guards against the perpetual background repaint that left the home page at
// ~7 fps idle on Firefox desktop (#79). Frame time is measured from
// requestAnimationFrame deltas on the production build.
test.use({ viewport: { width: 1920, height: 1080 } });

const MAX_IDLE_P50_MS = 20;

test('home page idles at a healthy frame time', async ({ page }) => {
  await page.goto('/en/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  const deltas = await page.evaluate(
    () =>
      new Promise<number[]>((resolve) => {
        const out: number[] = [];
        let last = performance.now();
        const end = last + 3000;
        const tick = (t: number) => {
          out.push(t - last);
          last = t;
          if (t < end) requestAnimationFrame(tick);
          else resolve(out.slice(1));
        };
        requestAnimationFrame(tick);
      })
  );

  const sorted = [...deltas].sort((a, b) => a - b);
  const p50 = sorted[Math.floor(sorted.length * 0.5)]!;
  expect(p50).toBeLessThanOrEqual(MAX_IDLE_P50_MS);
});
