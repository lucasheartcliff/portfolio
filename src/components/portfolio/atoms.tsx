import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';

export const ACCENT = '#1d6df7';
export const ACCENT_B = '#8b5cf6';

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export const Glass = ({ className = '', children, ...rest }: GlassProps) => (
  <div className={`glass-card ${className}`} {...rest}>
    {children}
  </div>
);

export const Tag = ({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: string;
}) => (
  <span
    className="inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-medium tracking-wide"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      color: 'rgba(226,232,240,0.85)',
    }}
  >
    <span
      className="mr-2 inline-block h-1 w-1 rounded-full"
      style={{ background: accent || ACCENT }}
    />
    {children}
  </span>
);

export const SectionLabel = ({
  num,
  label,
  accent = ACCENT,
}: {
  num: string;
  label: string;
  accent?: string;
}) => (
  <div className="mb-6 flex items-center gap-3">
    <span
      className="font-mono text-xs uppercase tracking-[0.2em]"
      style={{ color: accent }}
    >
      {num}
    </span>
    <span className="h-px w-12" style={{ background: `${accent}88` }} />
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
      {label}
    </span>
  </div>
);

export const Reveal = ({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
        opacity: shown ? 1 : 0,
        transition: `all 0.9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/** Renders a translation string, turning {b}…{/b} markers into <strong>. */
export const Trans = ({ k }: { k: string }) => {
  const { t } = useTranslation('common');
  const raw = t(k);
  const parts = raw.split(/(\{b\}.*?\{\/b\})/g).map((seg, i) => {
    const m = seg.match(/^\{b\}(.*)\{\/b\}$/);
    if (m)
      return (
        // eslint-disable-next-line react/no-array-index-key
        <strong key={i} className="font-medium text-slate-100">
          {m[1]}
        </strong>
      );
    // eslint-disable-next-line react/no-array-index-key
    return <React.Fragment key={i}>{seg}</React.Fragment>;
  });
  return <>{parts}</>;
};
