# perf-lab

A/B benchmark of animated-background approaches (issue #83, follow-up to #79).
Standalone: it has its own `package.json` and is **not** part of the site build.

## What it compares

Every variant is mounted in the same page shell (long scrollable content, a
fixed `backdrop-filter` nav, the same readability overlay) and measured with the
same frame-timing sampler (`requestAnimationFrame` deltas while idle and while
wheel-scrolling).

| Variant | What it is |
|---|---|
| `a0-main-current` | What `main` shipped: blurred, animated orbs + 30fps canvas loop |
| `a1-static-pr78` | PR #78: static orbs, dot grid painted once |
| `b1-custom-css` | Custom: orbs drift with transform-only CSS, no blur |
| `b2-custom-webgl` | Custom: one fragment shader for orbs + dot grid, 1x pixel ratio |
| `l1-tsparticles` | tsParticles (slim); orbs stay static CSS |
| `l2-paper-mesh`, `l2b-paper-mesh-dpr1` | `@paper-design/shaders` MeshGradient, default and `minPixelRatio: 1` |
| `l3-neat` | `@firecms/neat` (note: MIT + Commons Clause) |
| `l4-gradient-gl` | `gradient-gl` |
| `none` | No background (floor) |

## Run

Requires Node from `.tool-versions` at the repo root (`asdf install`).

```sh
cd perf-lab
npm ci
npx playwright install chromium firefox webkit   # WebKit also needs: sudo npx playwright install-deps webkit
npm run build                                     # bundles every variant into dist/
BROWSERS=chromium,firefox,webkit npm run bench
```

### Environment variables

| Variable | Default | Meaning |
|---|---|---|
| `BROWSERS` | `chromium,firefox` | Comma-separated engines |
| `VARIANTS` | all | Comma-separated variant names |
| `REPEATS` | `3` | Runs per (browser, variant); the median is reported |
| `IDLE_MS` / `SCROLL_MS` | `5000` / `4000` | Sampling windows |
| `OUT` | unset | Write the JSON report to this path |
| `SHOTS` | unset | Directory for one screenshot per (browser, variant) |

Variants are interleaved inside each repeat so slow host drift affects all of
them equally.

## Reading the results

- Headless browsers render in **software**, so WebGL variants are distorted the
  most. Compare variants by ratio; do not read absolute fps. Confirm the final
  choice on a machine with a GPU.
- Playwright's WebKit on Linux is not the real Safari.
- The library variants look different from the site (more saturated gradients);
  the numbers compare rendering cost, not aesthetics.
- Differences of a few fps in the 4 s scroll window are within noise.

Recorded runs are in `results/` (JSON + text). Screenshots are not committed.

## Related

- Issue #83, #79; PR #78 (static background).
- The single-page ablation harness for the real site lives in `e2e/perf/`
  on the #79 branches.
