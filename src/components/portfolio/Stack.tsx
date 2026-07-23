import { useTranslation } from 'next-i18next';
import React from 'react';

import { ACCENT, ACCENT_B, Glass, Reveal, SectionLabel } from './atoms';

const stackData: Record<string, string[]> = {
  Backend: ['Java', 'Spring Boot', 'Node.js', 'Python', 'Kotlin', 'Rust'],
  Frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript'],
  'Data & Messaging': ['PostgreSQL', 'Redis', 'Kafka', 'RabbitMQ'],
  'Cloud & Infra': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux', 'Nginx'],
};

const stackIcons: Record<string, React.ReactNode> = {
  Backend: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  ),
  Frontend: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M8 21h8" />
    </svg>
  ),
  'Data & Messaging': (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  ),
  'Cloud & Infra': (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M17 18a4 4 0 0 0 0-8 6 6 0 0 0-11.8 1A4 4 0 0 0 6 18z" />
    </svg>
  ),
};

const stackCatKeys: Record<string, string> = {
  Backend: 'stack.cat.backend',
  Frontend: 'stack.cat.frontend',
  'Data & Messaging': 'stack.cat.data',
  'Cloud & Infra': 'stack.cat.cloud',
};

interface Props {
  accent?: string;
  accentB?: string;
}

export default function StackSection({
  accent = ACCENT,
  accentB = ACCENT_B,
}: Props) {
  const { t } = useTranslation('common');
  return (
    <section id="stack" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionLabel num="02" label={t('stack.label')} accent={accent} />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-4 font-display text-3xl tracking-[-0.02em] text-fg sm:text-5xl">
            {t('stack.title')}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-muted">
            {t('stack.body')}
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(stackData).map(([cat, items], i) => (
            <Reveal key={cat} delay={180 + i * 70}>
              <Glass className="h-full p-5">
                <div
                  className="mb-4 flex items-center gap-2.5"
                  style={{ color: i % 2 === 0 ? accent : accentB }}
                >
                  {stackIcons[cat]}
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em]">
                    {t(stackCatKeys[cat] as string)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md px-2.5 py-1 text-[12px] text-fg"
                      style={{
                        background: 'var(--chip-bg)',
                        border: '1px solid var(--chip-border)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <Glass className="mt-6 grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-4">
            {(
              [
                ['9+', t('stack.metric.years')],
                ['100+', t('stack.metric.entities')],
                ['12+', t('stack.metric.services')],
                ['99.97%', t('stack.metric.sla')],
              ] as [string, string][]
            ).map(([n, l], i) => (
              <div key={l} className="bg-chip p-6 text-center">
                <div
                  className="mb-1 font-display text-4xl tracking-tight"
                  style={{
                    background:
                      i % 2 === 0
                        ? `linear-gradient(120deg, ${accent}, ${accentB})`
                        : `linear-gradient(120deg, ${accentB}, ${accent})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {n}
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-widest text-faint">
                  {l}
                </div>
              </div>
            ))}
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
