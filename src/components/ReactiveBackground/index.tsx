import React, { useEffect, useRef } from 'react';

import type { Bucket, Rgb } from './dots';
import { buildBuckets, effectiveDensity } from './dots';

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

    // Static render: the old "breathing" sine (1.2 rad/s) was nearly
    // imperceptible but cost a full-viewport clear + fills every 33ms forever,
    // and every canvas repaint made Firefox re-blend the layers beneath it.
    // Per-bucket phase offsets are kept, so the grid still has varied alpha.
    const draw = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      bucketsRef.current.forEach(({ bucket, path }) => {
        const breathe = Math.sin(bucket.phase) * 0.5 + 0.5;
        ctx.globalAlpha = Math.min(
          1,
          BASE_ALPHA * dim * (0.55 + breathe * 0.45)
        );
        ctx.fillStyle = bucket.color;
        ctx.fill(path);
      });
      ctx.globalAlpha = 1;
    };

    const onResize = () => {
      resize();
      draw();
    };

    resize();
    draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
      data-testid="ambient-orbs"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/*
      No opacity on this wrapper: group opacity forces a single offscreen
      surface for all three orbs, so intensity * dim is folded into
      each orb's gradient alpha and the noise layer instead.
      No filter: blur() and no will-change: both forced Firefox to rasterize
      and retain large offscreen surfaces for these 45-60vw fixed orbs and
      re-blend them under every repaint. The radial-gradient falloff already
      provides the softness. The orbs are static: even blur-free, the
      infinite translate keyframes cost ~4x idle fps on Firefox (11 vs 47).
    */}
      <div
        className="absolute rounded-full"
        style={{
          width: '55vw',
          height: '55vw',
          top: '-15vw',
          left: '-10vw',
          background: `radial-gradient(circle at 30% 30%, ${orbFill(
            palette[0]!
          )}, transparent 72%)`,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          top: '20vh',
          right: '-20vw',
          background: `radial-gradient(circle at 50% 50%, ${orbFill(
            palette[1]!
          )}, transparent 72%)`,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          bottom: '-15vw',
          left: '20vw',
          background: `radial-gradient(circle at 50% 50%, ${orbFill(
            palette[2]!
          )}, transparent 72%)`,
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

/** Fixed animated background: ambient orbs + static dot grid + readability overlay. */
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
