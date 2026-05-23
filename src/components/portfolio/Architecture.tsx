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
    <text
      x="160"
      y="68"
      textAnchor="middle"
      fontSize="9"
      fill="#0b1020"
      fontFamily="monospace"
      fontWeight="600"
    >
      KAFKA
    </text>
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

const DiagramTenants = ({
  accent,
  accentB,
}: {
  accent: string;
  accentB: string;
}) => (
  <svg viewBox="0 0 320 128" className="h-full w-full">
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${30 + i * 90}, 20)`}>
        <rect
          width="70"
          height="88"
          rx="6"
          fill="rgba(255,255,255,0.03)"
          stroke={`${accentB}33`}
        />
        <text
          x="35"
          y="14"
          textAnchor="middle"
          fontSize="8"
          fill="#94a3b8"
          fontFamily="monospace"
        >
          tenant_{i + 1}
        </text>
        {[28, 44, 60, 76].map((y, j) => (
          <rect
            // eslint-disable-next-line react/no-array-index-key
            key={j}
            x="8"
            y={y}
            width="54"
            height="8"
            rx="2"
            fill={j === 0 ? accent : `${accentB}55`}
            opacity={j === 0 ? 0.8 : 0.4}
          />
        ))}
      </g>
    ))}
  </svg>
);

const FullTopology = ({
  accent,
  accentB,
}: {
  accent: string;
  accentB: string;
}) => (
  <div className="overflow-x-auto">
    <svg
      viewBox="0 0 1100 360"
      className="h-auto w-full min-w-[700px]"
      style={{ maxHeight: 360 }}
    >
      <defs>
        <linearGradient id="tgrad1" x1="0" x2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={accentB} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {['EDGE', 'GATEWAY', 'SERVICES', 'DATA'].map((lane, i) => (
        <g key={lane}>
          <text
            x="20"
            y={70 + i * 80}
            fontSize="10"
            fontFamily="monospace"
            fill="#475569"
            letterSpacing="2"
          >
            {lane}
          </text>
          <line
            x1="100"
            y1={66 + i * 80}
            x2="1080"
            y2={66 + i * 80}
            stroke="rgba(255,255,255,0.04)"
          />
        </g>
      ))}

      {[200, 400, 600, 800, 950].map((x, i) => {
        let gwX = 720;
        if (x < 500) gwX = 380;
        else if (x < 700) gwX = 540;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <g key={i}>
            <circle
              cx={x}
              cy="66"
              r="6"
              fill="rgba(255,255,255,0.04)"
              stroke={`${accent}aa`}
              strokeWidth="1"
            />
          <text
            x={x}
            y="50"
            textAnchor="middle"
            fontSize="9"
            fill="#94a3b8"
            fontFamily="monospace"
          >
            {['web', 'mobile', 'iot', 'partners', 'internal'][i]}
          </text>
            <line
              x1={x}
              y1="72"
              x2={gwX}
              y2="140"
              stroke={`${accent}33`}
              strokeWidth="1"
            />
          </g>
        );
      })}

      {(
        [
          [380, 'API GW'],
          [540, 'AUTH'],
          [720, 'EVENT BUS'],
          [880, 'OBSERV'],
        ] as [number, string][]
      ).map(([x, label]) => (
        <g key={label}>
          <rect
            x={x - 50}
            y="130"
            width="100"
            height="24"
            rx="6"
            fill="rgba(255,255,255,0.04)"
            stroke={`${accentB}66`}
          />
          <text
            x={x}
            y="146"
            textAnchor="middle"
            fontSize="9.5"
            fill="#cbd5e1"
            fontFamily="monospace"
          >
            {label}
          </text>
          <line
            x1={x}
            y1="154"
            x2={x}
            y2="200"
            stroke={`${accentB}44`}
            strokeWidth="1"
          />
        </g>
      ))}

      {(
        [
          [200, 'users-svc'],
          [340, 'wells-svc'],
          [480, 'license-svc'],
          [620, 'risk-advisor'],
          [760, 'campaign-planner'],
          [900, 'extractor'],
        ] as [number, string][]
      ).map(([x, label]) => (
        <g key={label}>
          <rect
            x={x - 60}
            y="210"
            width="120"
            height="28"
            rx="6"
            fill="url(#tgrad1)"
            opacity="0.16"
            stroke={`${accent}88`}
          />
          <text
            x={x}
            y="228"
            textAnchor="middle"
            fontSize="10"
            fill="#e2e8f0"
            fontFamily="monospace"
          >
            {label}
          </text>
          <line
            x1={x}
            y1="238"
            x2={x % 200 < 100 ? 240 : 800}
            y2="290"
            stroke={`${accent}33`}
            strokeWidth="1"
          />
        </g>
      ))}

      {(
        [
          [240, 'Postgres', 'primary'],
          [460, 'Redis', 'cache'],
          [680, 'S3', 'blobs'],
          [900, 'Kafka', 'events'],
        ] as [number, string, string][]
      ).map(([x, label, sub]) => (
        <g key={label}>
          <ellipse
            cx={x}
            cy="305"
            rx="60"
            ry="14"
            fill="rgba(255,255,255,0.04)"
            stroke={`${accentB}66`}
          />
          <text
            x={x}
            y="303"
            textAnchor="middle"
            fontSize="10"
            fill="#e2e8f0"
            fontFamily="monospace"
          >
            {label}
          </text>
          <text
            x={x}
            y="316"
            textAnchor="middle"
            fontSize="8"
            fill="#64748b"
            fontFamily="monospace"
          >
            {sub}
          </text>
        </g>
      ))}

      <circle r="3" fill={accent} filter="url(#glow)">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path="M 200 66 L 380 142 L 480 224 L 460 305"
        />
      </circle>
      <circle r="3" fill={accentB} filter="url(#glow)">
        <animateMotion
          dur="7s"
          begin="1s"
          repeatCount="indefinite"
          path="M 600 66 L 720 142 L 760 224 L 900 305"
        />
      </circle>
    </svg>
  </div>
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
                WebkitBackgroundClip: 'text',
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
              diagram={<DiagramTenants accent={accent} accentB={accentB} />}
            />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <Glass className="mt-6 overflow-hidden p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                {t('arch.topology')}
              </div>
              <div className="flex gap-2 font-mono text-[11px]">
                <Tag accent={accent}>edge</Tag>
                <Tag accent={accent}>compute</Tag>
                <Tag accent={accentB}>data</Tag>
              </div>
            </div>
            <FullTopology accent={accent} accentB={accentB} />
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
