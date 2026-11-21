import React, { useEffect, useRef } from 'react';

import { Bucket, buildBuckets, effectiveDensity, Rgb } from './dots';

interface DotGridProps {
  accent?: string;
  accentB?: string;
  density?: number;
  dim?: number;
}

const BASE_ALPHA = 0.24;

const hexToRgb = (h: string): Rgb => {
  const s = h.replace('#', '');
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
};

const ReactiveDotGrid = ({
  accent = '#1d6df7',
  accentB = '#8b5cf6',
  density = 28,
  dim = 1,
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const bucketsRef = useRef<{ bucket: Bucket; path: Path2D }[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return undefined;
    const ctx = cvs.getContext('2d');
    if (!ctx) return undefined;

    const dotA = hexToRgb(accent);
    const dotB = hexToRgb(accentB);

    const buildDots = () => {
      const { w, h } = sizeRef.current;
      bucketsRef.current = buildBuckets(
        w,
        h,
        effectiveDensity(density, w, h),
        dotA,
        dotB
      ).map((bucket) => {
        const path = new Path2D();
        bucket.dots.forEach((d) => {
          path.moveTo(d.x + d.r, d.y);
          path.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        });
        return { bucket, path };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cvs.clientWidth;
      const h = cvs.clientHeight;
      cvs.width = Math.floor(w * dpr);
      cvs.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h, dpr };
      buildDots();
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (time: number) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      bucketsRef.current.forEach(({ bucket, path }) => {
        const breathe = Math.sin(time * 1.2 + bucket.phase) * 0.5 + 0.5;
        ctx.globalAlpha = Math.min(
          1,
          BASE_ALPHA * dim * (0.55 + breathe * 0.45)
        );
        ctx.fillStyle = bucket.color;
        ctx.fill(path);
      });
      ctx.globalAlpha = 1;
    };

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      // Static render only: respects the user's preference and skips the
      // render loop entirely rather than just holding it at a low rate.
      draw(0);
      return () => window.removeEventListener('resize', resize);
    }

    // The breathing effect is a slow sine wave — redrawing the dot grid at a
    // throttled ~30fps instead of a full 60fps halves this loop's main-thread
    // cost (canvas 2D drawing isn't compositor-offloaded like CSS transforms
    // are) without a perceptible difference, which matters most while
    // scrolling: this fixed, full-viewport canvas competes with the
    // browser's scroll work on the same thread every frame it redraws.
    const FRAME_INTERVAL = 1000 / 30;
    let lastDraw = 0;
    const tick = (t: number) => {
      if (t - lastDraw >= FRAME_INTERVAL) {
        lastDraw = t;
        draw(t * 0.001);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [accent, accentB, density, dim]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    />
  );
};

interface OrbsProps {
  palette?: string[];
  intensity?: number;
  dim?: number;
}

const AmbientOrbs = ({
  palette = ['#1d6df7', '#8b5cf6', '#8b5cf6'],
  intensity = 0.55,
  dim = 1,
}: OrbsProps) => {
  const k = intensity * dim;
  const orbFill = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${((0x55 / 255) * k).toFixed(3)})`;
  };
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/*
      No opacity on this wrapper: group opacity forces a single offscreen
      surface for all three blurred orbs, so intensity * dim is folded into
      each orb's gradient alpha and the noise layer instead.
      will-change promotes each orb to its own compositor layer up front
      instead of on first transform (avoiding a jank spike when the
      animation starts), and the blur radii are deliberately kept modest:
      filter: blur() forces the browser to rasterize a bitmap larger than
      the element's own bounds, and these are large (45-60vw), fixed-position,
      continuously-animated elements — the single most expensive combination
      to keep composited every frame, on Firefox in particular.
    */}
      <div
        className="orb-anim-1 absolute rounded-full"
        style={{
          width: '55vw',
          height: '55vw',
          top: '-15vw',
          left: '-10vw',
          background: `radial-gradient(circle at 30% 30%, ${orbFill(
            palette[0]!
          )}, transparent 65%)`,
          filter: 'blur(45px)',
          willChange: 'transform',
        }}
      />
      <div
        className="orb-anim-2 absolute rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          top: '20vh',
          right: '-20vw',
          background: `radial-gradient(circle at 50% 50%, ${orbFill(
            palette[1]!
          )}, transparent 65%)`,
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />
      <div
        className="orb-anim-3 absolute rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          bottom: '-15vw',
          left: '20vw',
          background: `radial-gradient(circle at 50% 50%, ${orbFill(
            palette[2]!
          )}, transparent 65%)`,
          filter: 'blur(45px)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.04 * k,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};

interface Props {
  accent?: string;
  accentB?: string;
  density?: number;
  intensity?: number;
  dim?: number;
}

/** Fixed animated background: ambient orbs + breathing dot grid + readability overlay. */
export default function ReactiveBackground({
  accent = '#1d6df7',
  accentB = '#8b5cf6',
  density = 28,
  intensity = 0.55,
  dim = 1,
}: Props) {
  return (
    <>
      <AmbientOrbs
        palette={[accent, accentB, '#8b5cf6']}
        intensity={intensity}
        dim={dim}
      />
      <ReactiveDotGrid
        accent={accent}
        accentB={accentB}
        density={density}
        dim={dim}
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse at top, transparent 0%, var(--bg-base) 100%)',
          opacity: 0.85,
        }}
      />
    </>
  );
}
