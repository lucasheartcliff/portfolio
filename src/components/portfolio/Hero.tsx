import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import { ACCENT, ACCENT_B, Glass, Reveal, Trans } from './atoms';

const RotatingRole = ({ accent }: { accent: string }) => {
  const { t } = useTranslation('common');
  const roles = [t('role.0'), t('role.1'), t('role.2'), t('role.3')];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative h-[1.4em] overflow-hidden font-mono text-base sm:text-lg">
      {roles.map((r, i) => (
        <div
          key={r}
          className="absolute inset-0 flex items-center"
          style={{
            transform: `translateY(${(i - idx) * 100}%)`,
            transition: 'transform 0.7s cubic-bezier(.7,0,.2,1)',
            color: accent,
          }}
        >
          <span className="mr-2 opacity-60">{`>`}</span>
          {r}
          <span
            className="ml-1 inline-block h-[1em] w-2 align-middle"
            style={{
              background: accent,
              animation: 'blink 1s steps(2) infinite',
            }}
          />
        </div>
      ))}
    </div>
  );
};

const Metric = ({
  label,
  value,
  pct,
  accent,
}: {
  label: string;
  value: string;
  pct: number;
  accent: string;
}) => (
  <div>
    <div className="mb-1 flex justify-between">
      <span className="text-[10px] text-faint">{label}</span>
      <span className="text-[10px] text-fg">{value}</span>
    </div>
    <div className="h-1 overflow-hidden rounded-full bg-chip">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(100, pct)}%`,
          background: `linear-gradient(90deg, ${accent}, ${accent}99)`,
        }}
      />
    </div>
  </div>
);

const HeroPanel = ({
  accent,
  accentB,
}: {
  accent: string;
  accentB: string;
}) => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((x) => x + 1), 1100);
    return () => clearInterval(i);
  }, []);
  const cpu = 38 + Math.sin(tick / 2) * 10;
  const mem = 62 + Math.cos(tick / 3) * 8;
  const rps = Math.round(1240 + Math.sin(tick) * 220);

  return (
    <Glass className="relative p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-[10.5px] tracking-wider text-faint">
          ~/system-status.sh
        </span>
      </div>

      <div className="font-mono text-[11.5px] leading-[1.85] text-soft">
        <div>
          <span className="text-faint">$</span> uptime
        </div>
        <div className="pl-3 text-muted">→ 9y 4mo · 99.97% SLA</div>
        <div className="mt-2">
          <span className="text-faint">$</span> services --status
        </div>
        <div className="mt-1 flex flex-col gap-1 pl-3">
          {[
            ['api-gateway', 'healthy'],
            ['auth-service', 'healthy'],
            ['data-pipeline', 'healthy'],
            ['risk-advisor', 'healthy'],
          ].map(([s, st]) => (
            <div key={s} className="flex items-center justify-between">
              <span className="text-muted">{s}</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }}
                />
                <span
                  className="text-[10.5px]"
                  style={{ color: 'var(--success-text)' }}
                >
                  {st}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 border-t border-hairline pt-3">
          <Metric
            label="CPU"
            value={`${cpu.toFixed(0)}%`}
            pct={cpu}
            accent={accent}
          />
          <Metric
            label="MEM"
            value={`${mem.toFixed(0)}%`}
            pct={mem}
            accent={accentB}
          />
          <Metric
            label="RPS"
            value={rps.toLocaleString()}
            pct={(rps / 2000) * 100}
            accent={accent}
          />
        </div>

        <div className="mt-3 text-[10.5px] text-faint">
          <span style={{ color: accent }}>▍</span> Building scalable systems @
          Intelie
        </div>
      </div>
    </Glass>
  );
};

interface Props {
  accent?: string;
  accentB?: string;
  username?: string;
}

export default function Hero({
  accent = ACCENT,
  accentB = ACCENT_B,
  username = 'lucasheartcliff',
}: Props) {
  const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center pb-16 pt-28 sm:pb-20 sm:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <Reveal>
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}
            >
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: '#10b981' }}
              >
                <span
                  className="absolute inset-0 animate-ping rounded-full"
                  style={{ background: '#10b981', opacity: 0.6 }}
                />
              </span>
              <span
                className="text-[12px] tracking-wide"
                style={{ color: 'var(--success-text)' }}
              >
                {t('hero.available')}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[clamp(40px,11vw,104px)] font-semibold leading-[0.95] tracking-[-0.03em]">
              <span className="block text-fg">{t('hero.line1')}</span>
              <span
                className="-mb-[0.12em] block pb-[0.12em]"
                style={{
                  background: `linear-gradient(120deg, ${accent}, ${accentB})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('hero.line2')}
              </span>
              <span className="block text-fg">{t('hero.line3')}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 max-w-xl">
              <RotatingRole accent={accent} />
              <p className="mt-5 text-[15.5px] leading-relaxed text-soft">
                <Trans k="hero.bio" />
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="rounded-xl px-5 py-3 text-[13.5px] font-medium transition-all"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accentB})`,
                  color: '#0b1020',
                  boxShadow: `0 10px 40px ${accent}33`,
                }}
              >
                {t('hero.viewProjects')}
              </a>
              <a
                href={`${router.basePath}/assets/pdfs/CV ATS Model.pdf`}
                download="Lucas_Morais_Resume.pdf"
                className="glass-btn rounded-xl px-5 py-3 text-[13.5px] font-medium text-fg transition-all"
              >
                {t('hero.downloadCV')}
              </a>
              <div className="ml-2 flex items-center gap-3 text-muted">
                <a
                  href={`https://github.com/${username}`}
                  className="transition hover:text-fg"
                  aria-label="GitHub"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                  </svg>
                </a>
                <a
                  href={`https://linkedin.com/in/${username}`}
                  className="transition hover:text-fg"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-14a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM20 19h-3v-5.7c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="transition hover:text-fg"
                  aria-label="Email"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320} y={32}>
          <HeroPanel accent={accent} accentB={accentB} />
        </Reveal>
      </div>

      <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-widest text-faint sm:flex">
        <span>{t('hero.scroll')}</span>
        <div className="h-10 w-px bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
