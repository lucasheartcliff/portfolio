import { useTranslation } from 'next-i18next';
import React from 'react';

import { ACCENT, ACCENT_B, Glass, Reveal, SectionLabel, Tag } from './atoms';

const DiagramPipeline = ({
  accent,
  accentB,
}: {
  accent: string;
  accentB: string;
}) => (
  <svg viewBox="0 0 320 128" className="h-full w-full">
    <defs>
      <linearGradient id="dp1" x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.8" />
        <stop offset="1" stopColor={accentB} stopOpacity="0.8" />
      </linearGradient>
    </defs>
    {[20, 60, 100].map((y, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <g key={i}>
        <circle cx="30" cy={y + 8} r="3" fill={accent} />
        <path
          d={`M 35 ${y + 8} Q 110 ${y + 8} 150 64`}
          stroke={`${accent}55`}
          strokeWidth="1"
          fill="none"
        />
      </g>
    ))}
    <rect
      x="142"
      y="52"
      width="36"
      height="24"
      rx="4"
      fill="url(#dp1)"
      opacity="0.7"
    />
    <path
      d="M 178 64 L 230 30"
      stroke={`${accentB}88`}
      strokeWidth="1.2"
      fill="none"
    />
    <path
      d="M 178 64 L 230 64"
      stroke={`${accentB}88`}
      strokeWidth="1.2"
      fill="none"
    />
    <path
      d="M 178 64 L 230 98"
      stroke={`${accentB}88`}
      strokeWidth="1.2"
      fill="none"
    />
    {[30, 64, 98].map((y, i) => (
      <rect
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        x="230"
        y={y - 8}
        width="60"
        height="16"
        rx="3"
        fill="rgba(255,255,255,0.06)"
        stroke={`${accentB}44`}
      />
    ))}
    <circle r="2.5" fill={accent}>
      <animateMotion
        dur="3s"
        repeatCount="indefinite"
        path="M 30 28 Q 110 28 150 64 L 230 64"
      />
    </circle>
  </svg>
);

const DiagramEntities = ({
  accent,
  accentB,
}: {
  accent: string;
  accentB: string;
}) => (
  <svg viewBox="0 0 320 128" className="h-full w-full">
    {Array.from({ length: 7 }).map((_, i) => {
      const angle = (i / 7) * Math.PI * 2;
      const cx = 160 + Math.cos(angle) * 44;
      const cy = 64 + Math.sin(angle) * 36;
      return (
        // eslint-disable-next-line react/no-array-index-key
        <g key={i}>
          <line
            x1="160"
            y1="64"
            x2={cx}
            y2={cy}
            stroke={`${accent}44`}
            strokeWidth="0.8"
          />
          <rect
            x={cx - 12}
            y={cy - 6}
            width="24"
            height="12"
            rx="2"
            fill="rgba(255,255,255,0.05)"
            stroke={`${accentB}55`}
          />
        </g>
      );
    })}
    <circle
      cx="160"
      cy="64"
      r="14"
      fill={`${accent}22`}
      stroke={accent}
      strokeWidth="1.2"
    />
    <text
      x="160"
      y="68"
      textAnchor="middle"
      fontSize="9"
      fill={accent}
      fontFamily="monospace"
    >
      core
    </text>
  </svg>
);

const DiagramLicense = ({
  accent,
  accentB,
}: {
  accent: string;
  accentB: string;
}) => (
  <svg viewBox="0 0 320 128" className="h-full w-full">
    {/* padlock — the access gate */}
    <g transform="translate(34, 28)">
      <path
        d="M14 32 V22 a18 18 0 0 1 36 0 V32"
        fill="none"
        stroke={accent}
        strokeWidth="3"
      />
      <rect
        x="4"
        y="32"
        width="56"
        height="46"
        rx="8"
        fill={`${accent}22`}
        stroke={accent}
        strokeWidth="1.5"
      />
      <circle cx="32" cy="52" r="5" fill={accent} />
      <rect x="30" y="55" width="4" height="13" rx="2" fill={accent} />
    </g>

    {/* plan-gated features: two granted, one locked */}
    {(
      [
        [22, true],
        [52, true],
        [82, false],
      ] as [number, boolean][]
    ).map(([y, granted]) => {
      const c = granted ? accent : '#64748b';
      return (
        <g key={y}>
          <line
            x1="96"
            y1={y + 9}
            x2="150"
            y2={y + 9}
            stroke={`${granted ? accent : accentB}55`}
            strokeWidth="1"
          />
          <rect
            x="150"
            y={y}
            width="138"
            height="18"
            rx="4"
            fill="rgba(255,255,255,0.04)"
            stroke={`${granted ? accentB : c}55`}
          />
          {granted ? (
            <path
              d={`M158 ${y + 9} l4 4 l8 -9`}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <g>
              <rect
                x="158"
                y={y + 6}
                width="9"
                height="8"
                rx="1.5"
                fill="none"
                stroke={c}
                strokeWidth="1.3"
              />
              <path
                d={`M160 ${y + 6} v-2 a2.5 2.5 0 0 1 5 0 v2`}
                fill="none"
                stroke={c}
                strokeWidth="1.3"
              />
            </g>
          )}
          <rect
            x="176"
            y={y + 6}
            width={granted ? 96 : 70}
            height="6"
            rx="3"
            fill={`${c}66`}
          />
        </g>
      );
    })}
  </svg>
);

const ArchCard = ({
  tag,
  title,
  body,
  tech,
  accent,
  diagram,
}: {
  tag: string;
  title: string;
  body: string;
  tech: string[];
  accent: string;
  diagram: React.ReactNode;
}) => (
  <Glass className="group flex h-full flex-col p-5">
    <div
      className="relative mb-4 h-32 overflow-hidden rounded-lg"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      {diagram}
    </div>
    <div
      className="mb-2 font-mono text-[10.5px] tracking-[0.18em]"
      style={{ color: accent }}
    >
      {tag}
    </div>
    <div className="mb-2 font-display text-lg tracking-tight text-slate-100">
      {title}
    </div>
    <div className="mb-4 flex-1 text-[13px] leading-relaxed text-slate-400">
      {body}
    </div>
    <div className="flex flex-wrap gap-1.5">
      {tech.map((tt) => (
        <Tag key={tt} accent={accent}>
          {tt}
        </Tag>
      ))}
    </div>
  </Glass>
);

interface Props {
  accent?: string;
  accentB?: string;
}

export default function ArchitectureSection({
  accent = ACCENT,
  accentB = ACCENT_B,
}: Props) {
  const { t } = useTranslation('common');
  return (
    <section id="architecture" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionLabel num="01" label={t('arch.label')} accent={accent} />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-4 max-w-3xl font-display text-3xl tracking-[-0.02em] text-slate-100 sm:text-5xl">
            {t('arch.title1')}{' '}
            <span
              style={{
                background: `linear-gradient(120deg, ${accent}, ${accentB})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('arch.title2')}
            </span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-slate-400">
            {t('arch.body')}
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <Reveal delay={180}>
            <ArchCard
              tag={t('arch.card1.tag')}
              title={t('arch.card1.title')}
              body={t('arch.card1.body')}
              tech={['Kafka', 'Spring Boot', 'PostgreSQL', 'K8s']}
              accent={accent}
              diagram={<DiagramPipeline accent={accent} accentB={accentB} />}
            />
          </Reveal>
          <Reveal delay={260}>
            <ArchCard
              tag={t('arch.card2.tag')}
              title={t('arch.card2.title')}
              body={t('arch.card2.body')}
              tech={['DDD', 'JPA/Hibernate', 'PostgreSQL', 'Java']}
              accent={accentB}
              diagram={<DiagramEntities accent={accent} accentB={accentB} />}
            />
          </Reveal>
          <Reveal delay={340}>
            <ArchCard
              tag={t('arch.card3.tag')}
              title={t('arch.card3.title')}
              body={t('arch.card3.body')}
              tech={['Microservices', 'Spring', 'Docker', 'OAuth2']}
              accent={accent}
              diagram={<DiagramLicense accent={accent} accentB={accentB} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
