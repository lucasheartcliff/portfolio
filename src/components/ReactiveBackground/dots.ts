export type Rgb = [number, number, number];

export interface Bucket {
  /** Precomputed `rgb(r,g,b)` fill; alpha is applied via `globalAlpha`. */
  color: string;
  /** Breathing phase shared by every dot in the bucket. */
  phase: number;
  dots: { x: number; y: number; r: number }[];
}

export const COLOR_BUCKETS = 12;
export const PHASE_BUCKETS = 8;

const REFERENCE_AREA = 1920 * 1080;

/**
 * Grid spacing in px. `density` is a spacing, so the dot count grows with
 * viewport area; past 1080p the spacing is stretched by sqrt(area ratio) so
 * the count stays roughly constant. Narrow viewports keep a 32px minimum.
 */
export const effectiveDensity = (
  density: number,
  w: number,
  h: number
): number => {
  const base = w < 640 ? Math.max(density, 32) : density;
  return base * Math.max(1, Math.sqrt((w * h) / REFERENCE_AREA));
};

/**
 * Groups the dot grid into (colour x phase) buckets so each frame needs one
 * fill per bucket instead of one path, colour string and fill per dot.
 * Colours depend only on `x / w`, so they are resolved once here.
 */
export const buildBuckets = (
  w: number,
  h: number,
  spacing: number,
  from: Rgb,
  to: Rgb,
  random: () => number = Math.random
): Bucket[] => {
  const cols = Math.ceil(w / spacing) + 2;
  const rows = Math.ceil(h / spacing) + 2;
  const buckets = new Map<number, Bucket>();

  for (let i = 0; i < cols; i += 1) {
    const x = i * spacing;
    const colorIdx = Math.min(
      COLOR_BUCKETS - 1,
      Math.max(0, Math.floor((x / w) * COLOR_BUCKETS))
    );
    const tx = (colorIdx + 0.5) / COLOR_BUCKETS;
    const mix = (k: 0 | 1 | 2) => Math.round(from[k] * (1 - tx) + to[k] * tx);
    for (let j = 0; j < rows; j += 1) {
      const phaseIdx = Math.floor(random() * PHASE_BUCKETS) % PHASE_BUCKETS;
      const key = colorIdx * PHASE_BUCKETS + phaseIdx;
      let bucket = buckets.get(key);
      if (!bucket) {
        bucket = {
          color: `rgb(${mix(0)},${mix(1)},${mix(2)})`,
          phase: ((phaseIdx + 0.5) / PHASE_BUCKETS) * Math.PI * 2,
          dots: [],
        };
        buckets.set(key, bucket);
      }
      bucket.dots.push({ x, y: j * spacing, r: 0.9 + random() * 0.4 });
    }
  }
  return Array.from(buckets.values());
};
