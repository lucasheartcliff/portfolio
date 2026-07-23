import React, { useEffect, useRef } from 'react';

interface DotGridProps {
  accent?: string;
  accentB?: string;
  density?: number;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  phase: number;
  base: number;
}

const hexToRgb = (h: string): [number, number, number] => {
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
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const dotsRef = useRef<Dot[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return undefined;
    const ctx = cvs.getContext('2d');
    if (!ctx) return undefined;

    const dotA = hexToRgb(accent);
    const dotB = hexToRgb(accentB);

    const effDensity = Math.max(
      density,
      window.innerWidth < 640 ? 32 : density
    );

    const buildDots = () => {
      const { w, h } = sizeRef.current;
      const cols = Math.ceil(w / effDensity) + 2;
      const rows = Math.ceil(h / effDensity) + 2;
      const dots: Dot[] = [];
      for (let i = 0; i < cols; i += 1) {
        for (let j = 0; j < rows; j += 1) {
          dots.push({
            x: i * effDensity,
            y: j * effDensity,
            r: 0.9 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
            base: 0.18 + Math.random() * 0.12,
          });
        }
      }
      dotsRef.current = dots;
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
      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i]!;
        const breathe = Math.sin(time * 1.2 + d.phase) * 0.5 + 0.5;
        const tx = d.x / w;
        const r = Math.round(dotA[0] * (1 - tx) + dotB[0] * tx);
        const g = Math.round(dotA[1] * (1 - tx) + dotB[1] * tx);
        const b = Math.round(dotA[2] * (1 - tx) + dotB[2] * tx);
        const a = d.base * (0.55 + breathe * 0.45);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a)})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
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

    // The breathing effect is a slow sine wave — redrawing ~1300+ dots at a
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
  }, [accent, accentB, density]);

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
}

const AmbientOrbs = ({
  palette = ['#1d6df7', '#8b5cf6', '#8b5cf6'],
  intensity = 0.55,
}: OrbsProps) => (
  <div
    className="pointer-events-none fixed inset-0 overflow-hidden"
    style={{ zIndex: 0, opacity: intensity }}
  >
    {/*
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
        background: `radial-gradient(circle at 30% 30%, ${palette[0]}55, transparent 65%)`,
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
        background: `radial-gradient(circle at 50% 50%, ${palette[1]}55, transparent 65%)`,
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
        background: `radial-gradient(circle at 50% 50%, ${palette[2]}55, transparent 65%)`,
        filter: 'blur(45px)',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        opacity: 0.04,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }}
    />
  </div>
);

interface Props {
  accent?: string;
  accentB?: string;
  density?: number;
  intensity?: number;
}

/** Fixed animated background: ambient orbs + breathing dot grid + readability overlay. */
export default function ReactiveBackground({
  accent = '#1d6df7',
  accentB = '#8b5cf6',
  density = 28,
  intensity = 0.55,
}: Props) {
  return (
    <>
      <AmbientOrbs
        palette={[accent, accentB, '#8b5cf6']}
        intensity={intensity}
      />
      <ReactiveDotGrid accent={accent} accentB={accentB} density={density} />
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
