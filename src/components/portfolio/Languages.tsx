import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';

import { ACCENT, Glass, Reveal, SectionLabel } from './atoms';

export interface LanguageDatum {
  name: string;
  hours: number;
  color: string;
}

const formatHours = (h: number) => {
  const yrs = h / (40 * 52);
  if (yrs >= 1) return `${yrs.toFixed(1)} yr`;
  const mo = h / (40 * 4.33);
  return `${mo.toFixed(0)} mo`;
};

const DonutChart = ({
  data,
  animate,
  hovered,
  setHovered,
}: {
  data: LanguageDatum[];
  animate: boolean;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) => {
  const { t } = useTranslation('common');
  const total = data.reduce((s, l) => s + l.hours, 0) || 1;
  const r = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="14"
        />
        {data.map((l, i) => {
          const frac = l.hours / total;
          const dash = animate ? frac * c : 0;
          const isHovered = hovered === i;
          const isDim = hovered !== null && !isHovered;
          const seg = (
            <circle
              key={l.name}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke={l.color}
              strokeWidth={isHovered ? 17 : 14}
              strokeDasharray={`${dash} ${c}`}
              strokeDashoffset={-offset * c}
              transform="rotate(-90 70 70)"
              style={{
                transition:
                  'stroke-dasharray 1.2s cubic-bezier(.2,.7,.2,1), stroke-width 0.2s, opacity 0.25s',
                transitionDelay: `${i * 80}ms`,
                opacity: isDim ? 0.25 : 1,
                cursor: 'pointer',
                filter: isHovered ? `drop-shadow(0 0 8px ${l.color})` : 'none',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          );
          offset += frac;
          return seg;
        })}
        <text
          x="70"
          y="66"
          textAnchor="middle"
          className="font-mono"
          fontSize="9"
          fill="#64748b"
        >
          {hovered !== null ? data[hovered]!.name : t('lang.byLang')}
        </text>
        <text
          x="70"
          y="80"
          textAnchor="middle"
          className="font-display"
          fontSize="14"
          fill="#e2e8f0"
          style={{ fontWeight: 600 }}
        >
          {hovered !== null
            ? `${((data[hovered]!.hours / total) * 100).toFixed(1)}%`
            : `${data.length}`}
        </text>
      </svg>
      <div className="flex flex-col gap-1 text-[11px]">
        {data.slice(0, 5).map((l, i) => (
          <div
            key={l.name}
            className="flex cursor-pointer items-center gap-2"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            role="presentation"
            style={{
              opacity: hovered !== null && hovered !== i ? 0.4 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: l.color }}
            />
            <span className="text-slate-400">{l.name}</span>
            <span className="ml-auto font-mono text-slate-500">
              {((l.hours / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface Props {
  data: LanguageDatum[];
  error?: boolean;
  accent?: string;
  accentB?: string;
}

export default function LanguagesSection({
  data,
  error = false,
  accent = ACCENT,
}: Props) {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setAnimate(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [data.length]);

  if (!data.length && !error) return null;

  if (error) {
    return (
      <section id="languages" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <SectionLabel num="03" label={t('lang.label')} accent={accent} />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mb-12 max-w-xl font-display text-3xl tracking-[-0.02em] text-slate-100 sm:text-5xl">
              {t('lang.title')}
            </h2>
          </Reveal>
          <Glass className="p-6 text-center text-[13px] text-slate-400">
            {t('lang.error', {
              defaultValue: "Couldn't load language stats right now.",
            })}
          </Glass>
        </div>
      </section>
    );
  }

  const max = Math.max(...data.map((l) => l.hours));
  const total = data.reduce((s, l) => s + l.hours, 0);
  const summary = t('lang.summary')
    .replace('{y}', (total / (40 * 52)).toFixed(1))
    .replace('{n}', String(data.length));

  return (
    <section id="languages" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionLabel num="03" label={t('lang.label')} accent={accent} />
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl tracking-[-0.02em] text-slate-100 sm:text-5xl">
              {t('lang.title')}
            </h2>
            <div className="flex items-center gap-2 font-mono text-[12px] text-slate-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {t('lang.tracked')}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div ref={ref}>
            <Glass className="p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
                <div className="flex flex-col gap-2.5">
                  {data.map((l, i) => {
                    const pct = (l.hours / max) * 100;
                    const isHovered = hovered === i;
                    const isDim = hovered !== null && !isHovered;
                    return (
                      <div
                        key={l.name}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        role="presentation"
                        style={{
                          opacity: isDim ? 0.4 : 1,
                          transition: 'opacity 0.25s',
                        }}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{
                                background: l.color,
                                boxShadow: `0 0 8px ${l.color}`,
                              }}
                            />
                            <span className="text-[13px] font-medium tracking-tight text-slate-200">
                              {l.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-[11px]">
                            <span className="text-slate-500">
                              {Math.round(l.hours).toLocaleString()}h
                            </span>
                            <span className="min-w-[3.5em] text-right text-slate-300">
                              {formatHours(l.hours)}
                            </span>
                          </div>
                        </div>
                        <div
                          className="relative h-1.5 overflow-hidden rounded-full"
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        >
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: animate ? `${pct}%` : '0%',
                              background: `linear-gradient(90deg, ${l.color}cc, ${l.color})`,
                              boxShadow: `0 0 14px ${l.color}66`,
                              transition: `width 1.2s cubic-bezier(.2,.7,.2,1) ${
                                i * 80
                              }ms`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <div className="mb-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                      {t('lang.total')}
                    </div>
                    <div className="font-display text-[44px] leading-none tracking-[-0.03em] text-slate-100">
                      {Math.round(total).toLocaleString()}
                      <span className="ml-2 font-mono text-[18px] text-slate-500">
                        {t('lang.hours')}
                      </span>
                    </div>
                    <div className="mt-2 text-[13px] text-slate-400">
                      {summary}
                    </div>
                  </div>

                  <DonutChart
                    data={data}
                    animate={animate}
                    hovered={hovered}
                    setHovered={setHovered}
                  />
                </div>
              </div>
            </Glass>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
